// ============================================================
// Proyecto Rower — Edge Function: indexar
// Indexación automática del corpus para el Asistente IA. La disparan los
// triggers de Postgres (pg_net) cada vez que se carga una entrevista o un
// archivo — ver schema.sql sección 8. Hace tres cosas:
//   1. Extrae el texto: diálogo limpio de la transcripción (JSON del
//      transcriptor o markdown) o contenido del archivo (xlsx/pdf/docx/pptx/txt).
//   2. Lo trocea en `fragmentos` (búsqueda full-text en español).
//   3. Genera con Claude una síntesis y la guarda en `conocimiento`, con lo
//      que entra automáticamente al contexto del asistente (caché de 5 min).
//
// Entrada:  POST { tipo: "entrevista"|"archivo", id }   ← desde los triggers
//           POST { todo: true }                          ← backfill por lotes
// Deploy:   supabase functions deploy indexar --no-verify-jwt
// ============================================================

import * as XLSX from "npm:xlsx@0.18.5";
import JSZip from "npm:jszip@3.10.1";
import { extractText, getDocumentProxy } from "npm:unpdf";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MODELO = "claude-opus-4-8";
const OBJETIVO = 1600, SOLAPE = 200;      // troceo (mismos parámetros del corpus base)
const MAX_TEXTO = 300_000;                // cota sobre el texto extraído
const MAX_BYTES = 15 * 1024 * 1024;       // no descargar archivos de más de 15 MB
const LOTE_TODO = 3;                      // ítems por llamada en modo { todo: true }

const SB_URL = Deno.env.get("SUPABASE_URL")!;
const SB_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

async function sb(path: string, init?: RequestInit): Promise<Response> {
  const r = await fetch(`${SB_URL}${path}`, {
    ...init,
    headers: {
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!r.ok) throw new Error(`Supabase ${r.status} en ${path}: ${await r.text()}`);
  return r;
}
const sbJson = async (path: string, init?: RequestInit) => (await sb(path, init)).json();

// ---------- Extracción de diálogo (mismo criterio que el corpus base) ----------
function extraerDialogo(raw: string): string {
  const t = (raw ?? "").trim();
  if (t.startsWith("#")) return t;                     // markdown del transcriptor
  let datos: unknown = null;
  for (const candidato of [t, t.replace(/[\r\n]/g, "")]) {
    try { datos = JSON.parse(candidato); break; } catch { /* siguiente */ }
  }
  if (Array.isArray(datos)) {
    const lineas: string[] = [];
    let hablante: string | null = null, turno: string[] = [];
    for (const o of datos) {
      if (!o || typeof o !== "object" || !("sentence" in o)) continue;
      const reg = o as Record<string, unknown>;
      const s = String(reg.speaker_name ?? "?").replace("speaker ", "S");
      const frase = String(reg.sentence ?? "").trim();
      if (s !== hablante) {
        if (turno.length) lineas.push(`${hablante}: ${turno.join(" ")}`);
        hablante = s; turno = [];
      }
      if (frase) turno.push(frase);
    }
    if (turno.length) lineas.push(`${hablante}: ${turno.join(" ")}`);
    if (lineas.length) return lineas.join("\n");
  }
  const pares = [...t.matchAll(/"sentence"\s*:\s*"((?:[^"\\]|\\.)*)"/g)];  // rescate
  if (pares.length) {
    return pares.map((m) => { try { return JSON.parse(`"${m[1]}"`); } catch { return m[1]; } }).join("\n");
  }
  return t;
}

function trocear(texto: string): string[] {
  const trozos: string[] = [];
  let i = 0;
  const n = texto.length;
  while (i < n) {
    let fin = Math.min(i + OBJETIVO, n);
    if (fin < n) {
      const corte = Math.max(
        texto.lastIndexOf("\n", fin) > i + OBJETIVO / 2 ? texto.lastIndexOf("\n", fin) : -1,
        texto.lastIndexOf(". ", fin) > i + OBJETIVO / 2 ? texto.lastIndexOf(". ", fin) : -1,
      );
      if (corte > i) fin = corte + 1;
    }
    const trozo = texto.slice(i, fin).trim();
    if (trozo) trozos.push(trozo);
    if (fin >= n) break;
    i = Math.max(fin - SOLAPE, i + 1);
  }
  return trozos;
}

// ---------- Extracción de texto por tipo de archivo ----------
function xmlATexto(xml: string): string {
  return xml
    .replace(/<a:br\s*\/>|<w:br\s*\/>|<\/a:p>|<\/w:p>/g, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function extraerArchivo(nombre: string, buf: ArrayBuffer): Promise<string> {
  const ext = (nombre.split(".").pop() ?? "").toLowerCase();

  if (["txt", "md", "csv", "json"].includes(ext)) {
    return new TextDecoder("utf-8", { fatal: false }).decode(buf);
  }

  if (["xlsx", "xls"].includes(ext)) {
    const wb = XLSX.read(new Uint8Array(buf), { type: "array" });
    const partes: string[] = [];
    for (const hoja of wb.SheetNames) {
      const csv = XLSX.utils.sheet_to_csv(wb.Sheets[hoja], { blankrows: false });
      if (csv.trim()) partes.push(`=== Hoja: ${hoja} ===\n${csv}`);
    }
    return partes.join("\n\n");
  }

  if (ext === "pdf") {
    const doc = await getDocumentProxy(new Uint8Array(buf));
    const { text } = await extractText(doc, { mergePages: true });
    return String(text ?? "");
  }

  if (ext === "docx") {
    const zip = await JSZip.loadAsync(buf);
    const xml = await zip.file("word/document.xml")?.async("string");
    return xml ? xmlATexto(xml) : "";
  }

  if (ext === "pptx") {
    const zip = await JSZip.loadAsync(buf);
    const laminas = Object.keys(zip.files)
      .filter((f) => /^ppt\/slides\/slide\d+\.xml$/.test(f))
      .sort((a, b) => Number(a.match(/\d+/)![0]) - Number(b.match(/\d+/)![0]));
    const partes: string[] = [];
    for (const f of laminas) {
      const xml = await zip.file(f)!.async("string");
      const texto = xmlATexto(xml);
      if (texto) partes.push(`=== Lámina ${f.match(/\d+/)![0]} ===\n${texto}`);
    }
    return partes.join("\n\n");
  }

  return "";  // tipo no extraíble (imágenes, etc.): queda solo la metadata
}

// ---------- Síntesis con Claude ----------
async function sintetizar(titulo: string, contexto: string, texto: string): Promise<string | null> {
  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) return null;
  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: MODELO,
        max_tokens: 1500,
        output_config: { effort: "medium" },
        system:
          "Eres analista del equipo consultor de UCAB en el Proyecto Rower (consultoría de optimización organizacional y adopción de IA para Grupo Kenex: Casio representada + Cubitt propia; VE/PA/CO/CR/GT/US). " +
          "Produce una síntesis de HECHOS DUROS del documento que te den: nombres y roles, cifras, sistemas (Odoo, Lark…), procesos, decisiones, fechas y sensibilidades. " +
          "Formato: 8-14 viñetas '- ' densas y autocontenidas, en español, sin introducción ni cierre. " +
          "Convenciones: Kenex con una sola n; corrige errores de dictado (Kuwait→Cubitt, LARQ→Lark, ODU→Odoo, Raúl→Rower). No inventes: si el documento es tabular, reporta las cifras clave tal cual.",
        messages: [{
          role: "user",
          content: `${contexto}\n\n<documento titulo="${titulo}">\n${texto.slice(0, 150_000)}\n</documento>`,
        }],
      }),
    });
    if (!resp.ok) { console.error("Anthropic", resp.status, await resp.text()); return null; }
    const data = await resp.json();
    const bloque = (data.content ?? []).find((b: { type: string }) => b.type === "text");
    return bloque?.text ?? null;
  } catch (e) {
    console.error("sintetizar:", e);
    return null;
  }
}

// ---------- Reemplazo de fragmentos ----------
async function reemplazarFragmentos(codigo: string, etiqueta: string | null, texto: string) {
  const filas = trocear(texto).map((t, i) => ({
    codigo, entrevistado: etiqueta, orden: i + 1, contenido: t,
  }));
  await sb(`/rest/v1/fragmentos?codigo=eq.${encodeURIComponent(codigo)}`, { method: "DELETE" });
  for (let i = 0; i < filas.length; i += 200) {
    await sb(`/rest/v1/fragmentos`, {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify(filas.slice(i, i + 200)),
    });
  }
  return filas.length;
}

async function guardarConocimiento(clave: string, titulo: string, contenido: string) {
  await sb(`/rest/v1/conocimiento?on_conflict=clave`, {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify([{ clave, titulo, contenido, actualizado_en: new Date().toISOString() }]),
  });
}

// ---------- Indexadores ----------
async function indexarEntrevista(id: string): Promise<string> {
  const filas = await sbJson(
    `/rest/v1/entrevistas?id=eq.${encodeURIComponent(id)}&select=id,codigo,entrevistado,cargo,pais,fecha,transcripcion`,
  ) as Array<Record<string, string>>;
  if (!filas.length) return `entrevista ${id}: no existe`;
  const e = filas[0];
  if (!e.transcripcion || e.transcripcion.length < 50) return `entrevista ${e.codigo}: sin transcripción`;

  const dialogo = extraerDialogo(e.transcripcion).slice(0, MAX_TEXTO);
  const nFrag = await reemplazarFragmentos(e.codigo, e.entrevistado ?? null, dialogo);

  const sintesis = await sintetizar(
    `Entrevista ${e.codigo} — ${e.entrevistado ?? "?"}`,
    `Sintetiza esta entrevista de diagnóstico (entrevistado: ${e.entrevistado ?? "?"}, cargo: ${e.cargo ?? "?"}, país: ${e.pais ?? "?"}, fecha: ${e.fecha ?? "?"}). Los S1/S2/S3 son turnos de habla.`,
    dialogo,
  );
  if (sintesis) {
    await guardarConocimiento(
      `entrevista-${e.codigo}`,
      `Síntesis de la entrevista ${e.codigo} — ${e.entrevistado ?? "?"}`,
      `## ${e.codigo} — ${e.entrevistado ?? "?"} (${e.fecha ?? "s/f"})\n${sintesis}`,
    );
  }
  await sb(`/rest/v1/entrevistas?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ dialogo, indexado_en: new Date().toISOString() }),
  });
  return `entrevista ${e.codigo}: ${nFrag} fragmentos${sintesis ? " + síntesis" : " (síntesis falló)"}`;
}

async function indexarArchivo(id: string): Promise<string> {
  const filas = await sbJson(
    `/rest/v1/archivos?id=eq.${encodeURIComponent(id)}&select=id,nombre,descripcion,categoria,tipo,storage_path,size_bytes`,
  ) as Array<Record<string, unknown>>;
  if (!filas.length) return `archivo ${id}: no existe`;
  const a = filas[0] as { id: string; nombre: string; descripcion: string | null; categoria: string; storage_path: string; size_bytes: number };

  const marcarIndexado = () =>
    sb(`/rest/v1/archivos?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ indexado_en: new Date().toISOString() }),
    });

  if ((a.size_bytes ?? 0) > MAX_BYTES) { await marcarIndexado(); return `archivo ${a.nombre}: demasiado grande, solo metadata`; }

  let texto = "";
  try {
    const bin = await sb(`/storage/v1/object/insumos/${a.storage_path}`);
    texto = (await extraerArchivo(a.nombre, await bin.arrayBuffer())).slice(0, MAX_TEXTO).trim();
  } catch (e) {
    console.error(`extraccion ${a.nombre}:`, e);
  }
  if (!texto) { await marcarIndexado(); return `archivo ${a.nombre}: sin texto extraíble, solo metadata`; }

  const codigoFrag = a.nombre.length > 80 ? a.nombre.slice(0, 77) + "…" : a.nombre;
  const nFrag = await reemplazarFragmentos(codigoFrag, a.categoria ?? "archivo", texto);

  const sintesis = await sintetizar(
    a.nombre,
    `Sintetiza este archivo/insumo del proyecto (categoría: ${a.categoria ?? "?"}${a.descripcion ? `, descripción: ${a.descripcion}` : ""}).`,
    texto,
  );
  if (sintesis) {
    await guardarConocimiento(
      `archivo-${a.id}`,
      `Síntesis del archivo: ${a.nombre}`,
      `## Archivo: ${a.nombre} [${a.categoria ?? "general"}]\n${sintesis}`,
    );
  }
  await marcarIndexado();
  return `archivo ${a.nombre}: ${nFrag} fragmentos${sintesis ? " + síntesis" : " (síntesis falló)"}`;
}

// ---------- Servidor ----------
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);

  let body: { tipo?: string; id?: string; todo?: boolean };
  try { body = await req.json(); } catch { return json({ error: "Cuerpo inválido" }, 400); }

  try {
    if (body.todo) {
      const resultados: string[] = [];
      const entrevistas = await sbJson(
        `/rest/v1/entrevistas?indexado_en=is.null&transcripcion=not.is.null&select=id&limit=${LOTE_TODO}`,
      ) as Array<{ id: string }>;
      for (const e of entrevistas) resultados.push(await indexarEntrevista(e.id));
      const archivos = await sbJson(
        `/rest/v1/archivos?indexado_en=is.null&select=id&limit=${LOTE_TODO}`,
      ) as Array<{ id: string }>;
      for (const a of archivos) resultados.push(await indexarArchivo(a.id));

      const pe = (await sbJson(`/rest/v1/entrevistas?indexado_en=is.null&transcripcion=not.is.null&select=id`) as unknown[]).length;
      const pa = (await sbJson(`/rest/v1/archivos?indexado_en=is.null&select=id`) as unknown[]).length;
      return json({ resultados, pendientes: pe + pa });
    }

    if (body.tipo === "entrevista" && body.id) return json({ resultado: await indexarEntrevista(body.id) });
    if (body.tipo === "archivo" && body.id) return json({ resultado: await indexarArchivo(body.id) });
    return json({ error: "Se espera { tipo, id } o { todo: true }" }, 400);
  } catch (e) {
    console.error(e);
    return json({ error: String(e) }, 500);
  }
});

function json(obj: unknown, status = 200): Response {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...CORS, "content-type": "application/json" },
  });
}
