// ============================================================
// Proyecto Rower — Edge Function: asistente
// Chat conversacional sobre todo el corpus del proyecto (entrevistas,
// síntesis, línea de tiempo, archivos). Claude Opus 4.8 con streaming,
// prompt caching (la síntesis completa viaja SIEMPRE en el contexto
// cacheado) y herramientas de consulta contra Supabase.
//
// Entrada:  POST { mensajes: [{ rol: "user"|"assistant", contenido: string }] }
// Salida:   SSE — data: {"t":"delta","x":"…"} | {"t":"tool","nombre","detalle"}
//                 | {"t":"fin","uso":{…}} | {"t":"error","x":"…"}
//
// Deploy:  supabase functions deploy asistente --no-verify-jwt
// Secreto: ANTHROPIC_API_KEY (compartido con extraer-entrevista)
// ⚠️ TRANSITORIO: --no-verify-jwt mientras el panel no tenga login.
// ============================================================

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MODELO = "claude-opus-4-8";
const MAX_TOKENS = 8192;
const MAX_ITERACIONES = 8;       // vueltas del bucle de herramientas
const MAX_MENSAJES = 40;         // cota sobre el historial recibido
const PARTE_CHARS = 28000;       // tamaño de cada parte de leer_entrevista

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
      "Busca pasajes textuales en las transcripciones de entrevistas Y en el contenido extraído de los archivos/insumos (búsqueda léxica en español). " +
      "Úsala cuando necesites citas exactas, verificar quién dijo algo, cifras de un archivo, o detalle que no esté en la síntesis. " +
      "Usa 2-4 palabras clave concretas (nombres, sistemas, temas); admite \"frases entre comillas\".",
    input_schema: {
      type: "object",
      properties: {
        consulta: { type: "string", description: "Palabras clave, p. ej. 'exactitud inventario' o 'Mercately piloto'." },
        codigo: { type: ["string", "null"], description: "Limitar a una entrevista (p. ej. 'E-03'); null para buscar en todas." },
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
        codigo: { type: "string", description: "Código de la entrevista: E-01 … E-24, 'E-06 pt.1', 'E-06 pt.2'." },
        parte: { type: "integer", description: "Número de parte (desde 1). Por defecto 1." },
      },
      required: ["codigo"],
    },
  },
  {
    name: "linea_tiempo",
    description:
      "Consulta la bitácora del proyecto (148 eventos: entrevistas, reuniones internas, hitos, entregables, decisiones, visitas).",
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
      if (!filas.length) return `No existe la entrevista '${input.codigo}'. Códigos válidos: E-01…E-24 (E-06 en pt.1/pt.2).`;
      const e = filas[0];
      const texto = e.dialogo || e.transcripcion || "";
      const partes = Math.max(1, Math.ceil(texto.length / PARTE_CHARS));
      const p = Math.min(Math.max(Number(input.parte ?? 1), 1), partes);
      const trozo = texto.slice((p - 1) * PARTE_CHARS, p * PARTE_CHARS);
      return `Entrevista ${e.codigo} — ${e.entrevistado} (${e.cargo ?? "s/c"}, ${e.fecha ?? "s/f"}) — parte ${p} de ${partes}:\n\n${trozo}`;
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
const INSTRUCCIONES = `Eres el Asistente IA del Proyecto Rower: la consultoría de optimización organizacional y adopción de IA que Consultores UCAB realiza para Grupo Kenex (Casio representada + Cubitt marca propia; opera en Venezuela, Panamá, Colombia, Costa Rica, Guatemala y EE.UU.). Fase 1 = diagnóstico; el informe se presenta a la Junta Directiva el 24-jul-2026.

Tus usuarios son la Junta Directiva de Kenex y el equipo consultor. Respondes SIEMPRE en español, con estilo ejecutivo: primero la respuesta directa, luego el detalle que la sustenta. Formatea con markdown ligero (negritas, listas cortas).

Tu conocimiento:
1. En tu contexto tienes la SÍNTESIS COMPLETA del corpus (resúmenes por documento + hechos destilados): las entrevistas E-01–E-24, minutas internas, la propuesta comercial, el código de cultura, organigramas y las escalas salariales 2026. La mayoría de preguntas se responden desde aquí.
2. El corpus CRECE: cada entrevista o archivo nuevo que el equipo carga se indexa automáticamente y te llega como documento adicional ("entrevista-…" / "archivo-…") y como fragmentos buscables. Si un documento de tu contexto cubre algo que la síntesis base no menciona, es material nuevo: úsalo con la misma confianza.
3. Herramientas: buscar_pasajes (citas textuales en transcripciones y archivos), leer_entrevista (contexto amplio de una entrevista), linea_tiempo (bitácora del proyecto) y listar_archivos (inventario de insumos).

Reglas:
- Fundamenta todo en el corpus. Si algo no está, dilo claramente; NO inventes datos, cifras ni citas.
- Cita la fuente entre corchetes cuando afirmes algo específico: [E-03], [Propuesta], [Escala salarial], [Minuta 29-jun].
- Cuando pidan citas textuales o "qué dijo X", usa buscar_pasajes antes de responder.
- Convenciones: "Kenex" con una sola n; Cubitt, Lark, Odoo, Rower (corrige errores de dictado del corpus: Kuwait→Cubitt, LARQ→Lark, ODU→Odoo).
- Temas sensibles de personas (desempeños, tensiones, salarios): trátalos con profesionalismo y tacto, sin ocultar información — tus usuarios son los dueños del negocio y el equipo consultor.
- Los "S1/S2/S3" de las transcripciones son turnos de habla; deduce quién habla por el contexto y el campo entrevistado.
- Responde solo con tu respuesta final; no narres tu proceso ni tus búsquedas.`;

// ---------- Llamada a Anthropic con streaming ----------
interface BloqueAcc {
  type: string;
  text?: string;
  id?: string;
  name?: string;
  inputJson?: string;
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

  const contenido = bloques.filter(Boolean).map((b) =>
    b.type === "tool_use"
      ? { type: "tool_use", id: b.id, name: b.name, input: b.inputJson ? JSON.parse(b.inputJson) : {} }
      : { type: "text", text: b.text ?? "" }
  ).filter((b) => b.type === "tool_use" || (b as { text: string }).text !== "");
  return { contenido, stop, uso };
}

// ---------- Servidor ----------
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);

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
