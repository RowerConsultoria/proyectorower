// ============================================================
// Proyecto Rower — Edge Function: asistente
// Chat conversacional sobre todo el corpus del proyecto (entrevistas,
// síntesis, línea de tiempo, archivos) y sus documentos de Fase 1 y Fase 2
// (manual de procesos, circuito, arquitectura de IA, estructura To-Be). Claude Opus 4.8 con streaming,
// prompt caching (la síntesis completa viaja SIEMPRE en el contexto
// cacheado) y herramientas de consulta contra Supabase.
//
// Entrada:  POST { mensajes: [{ rol: "user"|"assistant", contenido: string }] }
// Salida:   SSE — data: {"t":"delta","x":"…"} | {"t":"tool","nombre","detalle"}
//                 | {"t":"fin","uso":{…}} | {"t":"error","x":"…"}
//
// Deploy:  supabase functions deploy asistente          (CON verify_jwt)
// Secreto: ANTHROPIC_API_KEY (compartido con extraer-entrevista)
// 🔒 Exige sesión de Supabase Auth (ver _shared/acceso.ts): el corpus que
//    consulta es material sensible y cada llamada gasta cuota de Anthropic.
// ============================================================

import { identificar, noAutorizado } from "../_shared/acceso.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MODELO = "claude-opus-4-8";
const MAX_TOKENS = 16000;        // incluye el razonamiento adaptativo
const MAX_ITERACIONES = 10;      // vueltas del bucle de herramientas
const MAX_MENSAJES = 40;         // cota sobre el historial recibido
const PARTE_CHARS = 28000;       // tamaño de cada parte de leer_entrevista y leer_documento

const SB_URL = Deno.env.get("SUPABASE_URL")!;
const SB_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// ---------- Conocimiento (síntesis) con caché en memoria del worker ----------
let cacheSintesis: { texto: string; ts: number } | null = null;

async function sintesis(): Promise<string> {
  if (cacheSintesis && Date.now() - cacheSintesis.ts < 5 * 60_000) return cacheSintesis.texto;
  const filas = await sb(`/rest/v1/conocimiento?select=clave,titulo,contenido&activo=eq.true&order=clave`);
  const texto = (filas as Array<{ clave: string; titulo: string; contenido: string }>)
    .map((f) => `<documento clave="${f.clave}" titulo="${f.titulo}">\n${f.contenido}\n</documento>`)
    .join("\n\n");
  cacheSintesis = { texto, ts: Date.now() };
  return texto;
}

async function sb(path: string, init?: RequestInit): Promise<unknown> {
  const r = await fetch(`${SB_URL}${path}`, {
    ...init,
    headers: {
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!r.ok) throw new Error(`Supabase ${r.status}: ${await r.text()}`);
  return r.json();
}

// ---------- Herramientas ----------
const HERRAMIENTAS = [
  {
    name: "buscar_pasajes",
    description:
      "Busca pasajes textuales (búsqueda léxica en español) en: las transcripciones de entrevistas (E-xx, SC-xx), el contenido de los archivos/insumos, " +
      "y los documentos del proyecto: el manual de procesos de la Fase 2 (PROC-…, MACRO-…), el circuito del negocio (CIRC-…), la arquitectura de IA de la Fase 2 (ARQ-…), " +
      "la estructura To-Be y demás (DOC-…). Úsala para citas exactas, verificar quién dijo algo, cifras, o localizar en qué proceso o estación aparece un tema. " +
      "Usa 2-4 palabras clave concretas (nombres, sistemas, temas); admite \"frases entre comillas\".",
    input_schema: {
      type: "object",
      properties: {
        consulta: { type: "string", description: "Palabras clave, p. ej. 'exactitud inventario' o 'Mercately piloto'." },
        codigo: { type: ["string", "null"], description: "Limitar a una entrevista o documento (p. ej. 'E-03', 'SC-16', 'PROC-6.3-ASIS'); null para buscar en todo." },
      },
      required: ["consulta"],
    },
  },
  {
    name: "leer_entrevista",
    description:
      "Devuelve el diálogo completo de una entrevista, por partes (~28k caracteres). " +
      "Úsala para leer el contexto amplio alrededor de un tema; la respuesta indica cuántas partes hay.",
    input_schema: {
      type: "object",
      properties: {
        codigo: { type: "string", description: "Código de la entrevista: E-01 … E-70 ('E-06 pt.1', 'E-06 pt.2', '00') o SC-01 … SC-18 (sesiones sin código en origen)." },
        parte: { type: "integer", description: "Número de parte (desde 1). Por defecto 1." },
      },
      required: ["codigo"],
    },
  },
  {
    name: "leer_documento",
    description:
      "Devuelve COMPLETO un documento del proyecto, por partes (~28k caracteres). Úsala cuando pregunten por un proceso, una estación del circuito, " +
      "un módulo de la arquitectura o la estructura, para responder con el contenido real y no de memoria. Códigos: PROC-<proceso>-TOBE / PROC-<proceso>-ASIS " +
      "(p. ej. PROC-6.3-TOBE), MACRO-<prefijo> (N0 del macroproceso, p. ej. MACRO-8), CIRC-<estación> (p. ej. CIRC-11e), ARQ-<módulo> (p. ej. ARQ-m-espejo), " +
      "DOC-ESTRUCTURA, DOC-FUNCIONAMIENTO, DOC-MADUREZ, DOC-PRESENTACION, DOC-INSTRUCTIVO, DOC-INFORME, DOC-ARQUITECTURA, DOC-SISTEMA. " +
      "Si el código no existe, devuelve los códigos parecidos.",
    input_schema: {
      type: "object",
      properties: {
        codigo: { type: "string", description: "Código del documento, p. ej. 'PROC-6.3-ASIS' o 'CIRC-10b'." },
        parte: { type: "integer", description: "Número de parte (desde 1). Por defecto 1." },
      },
      required: ["codigo"],
    },
  },
  {
    name: "linea_tiempo",
    description:
      "Consulta la línea de tiempo del proyecto (eventos: entrevistas, reuniones internas, hitos, entregables, decisiones, visitas).",
    input_schema: {
      type: "object",
      properties: {
        texto: { type: ["string", "null"], description: "Filtro por texto en título/descripción; null para todos." },
        tipo: {
          type: ["string", "null"],
          enum: ["entrevista", "reunion_interna", "hito", "entregable", "analisis", "decision", "visita", null],
        },
        desde: { type: ["string", "null"], description: "Fecha ISO mínima (AAAA-MM-DD) o null." },
        hasta: { type: ["string", "null"], description: "Fecha ISO máxima (AAAA-MM-DD) o null." },
      },
      required: [],
    },
  },
  {
    name: "listar_archivos",
    description: "Lista los archivos/insumos cargados al proyecto (Excel de escalas salariales, organigramas, PPT, PDF) con su categoría y etiquetas.",
    input_schema: { type: "object", properties: {}, required: [] },
  },
];

async function ejecutarHerramienta(nombre: string, input: Record<string, unknown>): Promise<string> {
  try {
    if (nombre === "buscar_pasajes") {
      const filas = (await sb(`/rest/v1/rpc/buscar_fragmentos`, {
        method: "POST",
        body: JSON.stringify({ consulta: String(input.consulta ?? ""), cod: input.codigo ?? null, limite: 8 }),
      })) as Array<{ codigo: string; entrevistado: string; orden: number; contenido: string }>;
      if (!filas.length) return "Sin resultados. Prueba con menos palabras o sinónimos.";
      return filas
        .map((f) => `[${f.codigo} · ${f.entrevistado} · fragmento ${f.orden}]\n${f.contenido}`)
        .join("\n\n---\n\n");
    }

    if (nombre === "leer_entrevista") {
      const cod = encodeURIComponent(String(input.codigo ?? ""));
      const filas = (await sb(
        `/rest/v1/entrevistas?codigo=eq.${cod}&select=codigo,entrevistado,cargo,fecha,dialogo,transcripcion`,
      )) as Array<{ codigo: string; entrevistado: string; cargo: string; fecha: string; dialogo: string | null; transcripcion: string }>;
      if (!filas.length) return `No existe la entrevista '${input.codigo}'. Códigos válidos: E-01…E-70 (E-06 en pt.1/pt.2, '00') y SC-01…SC-18.`;
      const e = filas[0];
      const texto = e.dialogo || e.transcripcion || "";
      const partes = Math.max(1, Math.ceil(texto.length / PARTE_CHARS));
      const p = Math.min(Math.max(Number(input.parte ?? 1), 1), partes);
      const trozo = texto.slice((p - 1) * PARTE_CHARS, p * PARTE_CHARS);
      return `Entrevista ${e.codigo} — ${e.entrevistado} (${e.cargo ?? "s/c"}, ${e.fecha ?? "s/f"}) — parte ${p} de ${partes}:\n\n${trozo}`;
    }

    if (nombre === "leer_documento") {
      const cod = String(input.codigo ?? "").trim();
      const filas = (await sb(
        `/rest/v1/fragmentos?codigo=eq.${encodeURIComponent(cod)}&activo=eq.true&select=entrevistado,contenido&order=orden`,
      )) as Array<{ entrevistado: string; contenido: string }>;
      if (!filas.length) {
        const base = cod.replace(/-(TOBE|ASIS)$/i, "");
        const cerca = (await sb(
          `/rest/v1/fragmentos?codigo=ilike.${encodeURIComponent(base + "*")}&activo=eq.true&select=codigo&limit=400`,
        )) as Array<{ codigo: string }>;
        const unicos = [...new Set(cerca.map((f) => f.codigo))].slice(0, 30);
        return unicos.length
          ? `No existe el documento '${cod}'. Códigos parecidos: ${unicos.join(", ")}.`
          : `No existe el documento '${cod}'. Revisa el índice del manual (fase2-manual-indice) o usa buscar_pasajes.`;
      }
      // los trozos se suben sin solape (sincronizar-asistente.py), así que concatenados dan el documento íntegro
      const texto = filas.map((f) => f.contenido).join("\n");
      const partes = Math.max(1, Math.ceil(texto.length / PARTE_CHARS));
      const p = Math.min(Math.max(Number(input.parte ?? 1), 1), partes);
      return `${cod} — ${filas[0].entrevistado ?? ""} — parte ${p} de ${partes}:\n\n${texto.slice((p - 1) * PARTE_CHARS, p * PARTE_CHARS)}`;
    }

    if (nombre === "linea_tiempo") {
      const filtros: string[] = ["order=fecha", "limit=60", "select=fecha,titulo,descripcion,tipo,fuente"];
      if (input.tipo) filtros.push(`tipo=eq.${encodeURIComponent(String(input.tipo))}`);
      if (input.desde) filtros.push(`fecha=gte.${encodeURIComponent(String(input.desde))}`);
      if (input.hasta) filtros.push(`fecha=lte.${encodeURIComponent(String(input.hasta))}`);
      if (input.texto) {
        const t = encodeURIComponent(`%${String(input.texto)}%`);
        filtros.push(`or=(titulo.ilike.${t},descripcion.ilike.${t})`);
      }
      const filas = (await sb(`/rest/v1/eventos?${filtros.join("&")}`)) as Array<
        { fecha: string; titulo: string; descripcion: string; tipo: string; fuente: string }
      >;
      if (!filas.length) return "Sin eventos con esos filtros.";
      return filas.map((e) => `${e.fecha} · [${e.tipo}] ${e.titulo}${e.descripcion ? ` — ${e.descripcion}` : ""}`).join("\n");
    }

    if (nombre === "listar_archivos") {
      const filas = (await sb(
        `/rest/v1/archivos?select=nombre,descripcion,categoria,tipo,etiquetas&order=categoria,nombre`,
      )) as Array<{ nombre: string; descripcion: string; categoria: string; tipo: string; etiquetas: string[] }>;
      if (!filas.length) return "No hay archivos cargados.";
      return filas
        .map((a) => `[${a.categoria}] ${a.nombre}${a.descripcion ? ` — ${a.descripcion}` : ""}${a.etiquetas?.length ? ` (${a.etiquetas.join(", ")})` : ""}`)
        .join("\n");
    }

    return `Herramienta desconocida: ${nombre}`;
  } catch (e) {
    return `Error ejecutando ${nombre}: ${String(e)}`;
  }
}

// ---------- Prompt ----------
const INSTRUCCIONES = `Eres el Asistente IA del Proyecto Rower: la consultoría de optimización organizacional y adopción de IA que UCAB Consultores realiza para Grupo Kenex (Casio, marca representada, y Cubitt, marca propia; opera en Venezuela, Panamá, Colombia, Costa Rica, Guatemala y EE. UU.). El contrato tiene cuatro fases: F1 diagnóstico (informe presentado a la Junta el 24-jul-2026), F2 documentación de procesos y prototipos de IA (en validación: reunión con la Presidencia el 5-oct y presentación a la Junta el 9-oct-2026), F3 reestructuración de talento y F4 cierre.

Tus usuarios son la Junta Directiva de Kenex y el equipo consultor. Respondes SIEMPRE en español, con estilo ejecutivo: primero la respuesta directa, luego el detalle que la sustenta. Formatea con markdown ligero (negritas, listas cortas).

Tu conocimiento (en tu contexto):
1. La síntesis del corpus: resúmenes y hechos destilados de la base (18-jul) y una síntesis por cada entrevista o sesión posterior ("entrevista-E-xx", "entrevista-SC-xx") y por cada archivo cargado ("archivo-…"). El corpus crece solo: cada entrevista o archivo nuevo se indexa y te llega como documento adicional.
2. La Fase 1: el informe diagnóstico (informe-fase1), su arquitectura de IA de la sección 10 con «la torre» (arquitectura-ia) y el prototipo del sistema propio (sistema-prototipo).
3. La Fase 2 (documentos fase2-*): el panorama (entregables, validación, premisa de madurez documental, la presentación y el instructivo del comité), el índice de los 182 procesos del manual con sus dueños, la agenda de mejora de cada macroproceso, el circuito del negocio As-Is (vía de tren con sus frenos y sistemas), la arquitectura de IA propuesta («la órbita») y la estructura organizativa To-Be.

Herramientas:
- leer_documento: lee COMPLETO un proceso del manual (PROC-6.3-TOBE / PROC-6.3-ASIS), el N0 de un macroproceso (MACRO-6), una estación del circuito (CIRC-11e), un módulo de la arquitectura (ARQ-m-espejo) o un documento (DOC-ESTRUCTURA, DOC-PRESENTACION…). Úsala SIEMPRE que pregunten por el contenido de un proceso, una estación o un módulo: el índice dice qué existe, el documento dice qué dice.
- buscar_pasajes: citas textuales en entrevistas, archivos y documentos del proyecto; sirve para encontrar en qué proceso o estación aparece un tema.
- leer_entrevista: el diálogo completo de una entrevista o sesión (E-xx, SC-xx).
- linea_tiempo y listar_archivos: la cronología del proyecto y el inventario de insumos.

Reglas:
- Fundamenta todo en el corpus y en los documentos. Si algo no está, dilo claramente; NO inventes datos, cifras ni citas.
- Distingue SIEMPRE As-Is de To-Be: el As-Is describe cómo opera Kenex hoy (son hallazgos, con evidencia); el To-Be es la PROPUESTA del manual, no algo que exista. La arquitectura de IA y la estructura To-Be también son propuestas.
- Cita la fuente entre corchetes cuando afirmes algo específico: [E-03], [SC-16], [6.3 As-Is], [6.3 To-Be], [Macro 8], [Circuito 11e], [Arquitectura · Espejo], [Estructura To-Be], [Informe F1 · 7.5], [Propuesta], [Minuta 29-jun].
- En el circuito los puntos donde el flujo se detiene o pierde velocidad se llaman FRENOS (antes «trombos»): grado «detiene» o «lento».
- Convenciones: "Kenex" con una sola n; Cubitt, Lark, Odoo, Rower (corrige errores de dictado del corpus: Kuwait/Qubit→Cubitt, LARQ→Lark, ODU→Odoo).
- Temas sensibles de personas (desempeños, tensiones, salarios): trátalos con profesionalismo y tacto, sin ocultar información — tus usuarios son los dueños del negocio y el equipo consultor.
- Los "S1/S2/S3" de las transcripciones son turnos de habla; deduce quién habla por el contexto y el campo entrevistado.
- Responde solo con tu respuesta final. Antes de llamar a una herramienta NO escribas nada (ni «voy a leer…», ni «déjame buscar…»): llama la herramienta directamente; el texto que escribas se muestra tal cual al usuario.`;

// ---------- Llamada a Anthropic con streaming ----------
interface BloqueAcc {
  type: string;
  text?: string;
  id?: string;
  name?: string;
  inputJson?: string;
  thinking?: string;    // razonamiento adaptativo (Opus 4.8 lo devuelve vacío: display "omitted")
  signature?: string;   // hay que devolverlo intacto en el bucle de herramientas
  data?: string;        // redacted_thinking
}

async function llamarClaude(
  apiKey: string,
  system: unknown,
  mensajes: unknown[],
  emitir: (obj: unknown) => void,
): Promise<{ contenido: unknown[]; stop: string; uso: Record<string, unknown> }> {
  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODELO,
      max_tokens: MAX_TOKENS,
      stream: true,
      system,
      // Con el razonamiento apagado, Opus 4.8 «piensa en voz alta» en el texto visible
      // («Voy a leer…») aunque se le pida lo contrario; con adaptive razona aparte.
      thinking: { type: "adaptive" },
      tools: HERRAMIENTAS,
      cache_control: { type: "ephemeral" },   // auto-cachea el último bloque (historial)
      messages: mensajes,
    }),
  });
  if (!resp.ok) throw new Error(`Anthropic ${resp.status}: ${await resp.text()}`);

  const bloques: BloqueAcc[] = [];
  let stop = "end_turn";
  let uso: Record<string, unknown> = {};
  const decoder = new TextDecoder();
  const reader = resp.body!.getReader();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lineas = buffer.split("\n");
    buffer = lineas.pop() ?? "";
    for (const linea of lineas) {
      if (!linea.startsWith("data: ")) continue;
      let ev: any;
      try { ev = JSON.parse(linea.slice(6)); } catch { continue; }
      switch (ev.type) {
        case "content_block_start": {
          const b = ev.content_block;
          bloques[ev.index] =
            b.type === "tool_use"
              ? { type: "tool_use", id: b.id, name: b.name, inputJson: "" }
              : b.type === "thinking"
              ? { type: "thinking", thinking: b.thinking ?? "", signature: b.signature ?? "" }
              : b.type === "redacted_thinking"
              ? { type: "redacted_thinking", data: b.data }
              : { type: b.type, text: "" };
          break;
        }
        case "content_block_delta": {
          const acc = bloques[ev.index];
          if (!acc) break;
          if (ev.delta.type === "text_delta") {
            acc.text = (acc.text ?? "") + ev.delta.text;
            emitir({ t: "delta", x: ev.delta.text });
          } else if (ev.delta.type === "input_json_delta") {
            acc.inputJson = (acc.inputJson ?? "") + ev.delta.partial_json;
          } else if (ev.delta.type === "thinking_delta") {
            acc.thinking = (acc.thinking ?? "") + ev.delta.thinking;
          } else if (ev.delta.type === "signature_delta") {
            acc.signature = ev.delta.signature;
          }
          break;
        }
        case "message_delta":
          if (ev.delta?.stop_reason) stop = ev.delta.stop_reason;
          if (ev.usage) uso = { ...uso, ...ev.usage };
          break;
        case "message_start":
          if (ev.message?.usage) uso = { ...uso, ...ev.message.usage };
          break;
        case "error":
          throw new Error(`Stream de Anthropic: ${JSON.stringify(ev.error)}`);
      }
    }
  }

  // Los bloques de razonamiento vuelven tal cual (con su firma) en la siguiente vuelta del bucle.
  const contenido = bloques.filter(Boolean).map((b) =>
    b.type === "tool_use"
      ? { type: "tool_use", id: b.id, name: b.name, input: b.inputJson ? JSON.parse(b.inputJson) : {} }
      : b.type === "thinking"
      ? { type: "thinking", thinking: b.thinking ?? "", signature: b.signature ?? "" }
      : b.type === "redacted_thinking"
      ? { type: "redacted_thinking", data: b.data }
      : { type: "text", text: b.text ?? "" }
  ).filter((b) => b.type !== "text" || (b as { text: string }).text !== "");
  return { contenido, stop, uso };
}

// ---------- Servidor ----------
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);

  if (!(await identificar(req))) return noAutorizado(CORS);

  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) return json({ error: "ANTHROPIC_API_KEY no configurada" }, 500);

  let entrada: Array<{ rol: string; contenido: string }>;
  try {
    const body = await req.json();
    entrada = (body?.mensajes ?? []).slice(-MAX_MENSAJES);
  } catch {
    return json({ error: "Cuerpo inválido: se espera JSON { mensajes: [...] }" }, 400);
  }
  if (!entrada.length || entrada[entrada.length - 1].rol !== "user") {
    return json({ error: "El último mensaje debe ser del usuario" }, 400);
  }

  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();
  const emitir = (obj: unknown) => writer.write(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`)).catch(() => {});

  (async () => {
    try {
      const docs = await sintesis();
      const system = [
        { type: "text", text: INSTRUCCIONES },
        {
          type: "text",
          text: `Síntesis del corpus del proyecto (tu conocimiento base):\n\n${docs}`,
          cache_control: { type: "ephemeral" },
        },
      ];
      const mensajes: unknown[] = entrada.map((m) => ({
        role: m.rol === "assistant" ? "assistant" : "user",
        content: String(m.contenido ?? ""),
      }));

      let usoTotal: Record<string, unknown> = {};
      for (let i = 0; i < MAX_ITERACIONES; i++) {
        const r = await llamarClaude(apiKey, system, mensajes, emitir);
        usoTotal = r.uso;
        if (r.stop !== "tool_use") break;

        mensajes.push({ role: "assistant", content: r.contenido });
        const llamadas = r.contenido.filter((b: any) => b.type === "tool_use") as Array<
          { id: string; name: string; input: Record<string, unknown> }
        >;
        const resultados = [];
        for (const c of llamadas) {
          emitir({ t: "tool", nombre: c.name, detalle: c.input?.consulta ?? c.input?.codigo ?? "" });
          const res = await ejecutarHerramienta(c.name, c.input ?? {});
          resultados.push({ type: "tool_result", tool_use_id: c.id, content: res });
        }
        mensajes.push({ role: "user", content: resultados });
      }
      emitir({ t: "fin", uso: usoTotal });
    } catch (e) {
      emitir({ t: "error", x: String(e) });
    } finally {
      try { await writer.close(); } catch { /* ya cerrado */ }
    }
  })();

  return new Response(stream.readable, {
    headers: { ...CORS, "content-type": "text/event-stream", "cache-control": "no-cache" },
  });
});

function json(obj: unknown, status = 200): Response {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...CORS, "content-type": "application/json" },
  });
}
