// ============================================================
// Proyecto Rower — Edge Function: extraer-entrevista
// Recibe el texto crudo de una entrevista (md/json/txt) y usa Claude
// para extraer los metadatos del formulario. La clave de Anthropic vive
// como secreto (ANTHROPIC_API_KEY) — NUNCA se expone al navegador.
//
// Deploy:  supabase functions deploy extraer-entrevista --no-verify-jwt
// Secreto: supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
// ============================================================

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const AREAS = ["gobierno", "estructura", "talento", "procesos", "tecnología", "cultura", "operaciones"];
const PAISES = ["Venezuela", "Panamá", "Colombia", "Costa Rica", "Guatemala", "EE.UU."];

const MODELO = "claude-opus-4-8";
const MAX_CHARS = 200000; // cota de seguridad sobre el tamaño del crudo

const SYSTEM = `Eres un asistente del equipo consultor de UCAB Consultores en el Proyecto Rower (consultoría para Grupo Kenex).
Tu tarea: leer la transcripción cruda de una entrevista y extraer sus metadatos, devolviéndolos con la herramienta guardar_metadatos.

Convenciones obligatorias del proyecto:
- "Kenex" SIEMPRE con una sola "n" (nunca "Kennex").
- Correcciones frecuentes de dictado por voz: "Kuwait" → Cubitt · "LARQ" → Lark · "ODU" → Odoo · "Raúl" → Rower.
- "area" debe ser exactamente uno de: gobierno, estructura, talento, procesos, tecnología, cultura, operaciones (elige el más representativo del contenido).
- "pais" debe ser exactamente uno de: Venezuela, Panamá, Colombia, Costa Rica, Guatemala, EE.UU.
- "fecha" en formato ISO (AAAA-MM-DD) si aparece en el texto; si no, null.
- "duracion_min" en minutos como entero si se puede inferir; si no, null.
- "etiquetas": 2 a 5 temas clave en minúscula (p. ej. "procesos", "odoo", "talento").
- "resumen": 2-3 frases neutrales y cliente-facing; sin nombres propios en hallazgos sensibles; sin datos de nóminas paralelas o pagos entre países.
- Si un dato no está en el texto, usa null (o [] para etiquetas). No inventes.`;

const TOOL = {
  name: "guardar_metadatos",
  description: "Guarda los metadatos extraídos de la entrevista transcrita.",
  input_schema: {
    type: "object",
    properties: {
      codigo: { type: ["string", "null"], description: "Código de la entrevista si aparece (p. ej. 'E-01'); si no, null." },
      entrevistado: { type: ["string", "null"], description: "Nombre de la persona entrevistada." },
      cargo: { type: ["string", "null"], description: "Cargo o rol del entrevistado." },
      area: { type: ["string", "null"], enum: [...AREAS, null], description: "Área temática principal." },
      pais: { type: ["string", "null"], enum: [...PAISES, null], description: "País del entrevistado / de la operación." },
      fecha: { type: ["string", "null"], description: "Fecha ISO AAAA-MM-DD o null." },
      entrevistador: { type: ["string", "null"], description: "Consultor que realizó la entrevista." },
      duracion_min: { type: ["integer", "null"], description: "Duración en minutos o null." },
      etiquetas: { type: "array", items: { type: "string" }, description: "2-5 temas clave en minúscula." },
      resumen: { type: ["string", "null"], description: "Resumen breve (2-3 frases), cliente-facing." },
    },
    required: ["codigo", "entrevistado", "cargo", "area", "pais", "fecha", "entrevistador", "duracion_min", "etiquetas", "resumen"],
  },
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  if (req.method !== "POST") {
    return json({ error: "Método no permitido" }, 405);
  }

  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) return json({ error: "ANTHROPIC_API_KEY no configurada en el servidor" }, 500);

  let contenido = "";
  try {
    const body = await req.json();
    contenido = String(body?.contenido ?? "").slice(0, MAX_CHARS);
  } catch {
    return json({ error: "Cuerpo inválido: se espera JSON { contenido }" }, 400);
  }
  if (!contenido.trim()) return json({ error: "El campo 'contenido' está vacío" }, 400);

  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODELO,
        max_tokens: 1024,
        system: SYSTEM,
        output_config: { effort: "low" },
        tools: [TOOL],
        tool_choice: { type: "tool", name: "guardar_metadatos" },
        messages: [
          {
            role: "user",
            content: `Extrae los metadatos de esta entrevista transcrita:\n\n<transcripcion>\n${contenido}\n</transcripcion>`,
          },
        ],
      }),
    });

    if (!resp.ok) {
      const detalle = await resp.text();
      return json({ error: "Error de la API de Anthropic", status: resp.status, detalle }, 502);
    }

    const data = await resp.json();
    const bloque = (data.content ?? []).find((b: any) => b.type === "tool_use");
    if (!bloque) return json({ error: "La IA no devolvió metadatos estructurados" }, 502);

    return json({ metadatos: bloque.input });
  } catch (e) {
    return json({ error: "Fallo llamando a la IA", detalle: String(e) }, 502);
  }
});

function json(obj: unknown, status = 200): Response {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...CORS, "content-type": "application/json" },
  });
}
