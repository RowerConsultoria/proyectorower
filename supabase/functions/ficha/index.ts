// ============================================================
// Proyecto Rower — Edge Function: ficha
// Puerta pública (SIN sesión de Supabase Auth) para la ficha de actualización
// de perfil de personal (Fase 3). La usa actualizacion-perfil/index.html.
//
// A diferencia de las demás funciones, el llamante no trae JWT ni la
// credencial interna: el acceso lo da un token opaco de public.fichas_tokens,
// generado por el panel (módulo «Censo y enlaces», permiso admin.personal) y
// repartido manualmente. Por eso NO usa _shared/acceso.ts — se valida el
// token contra la tabla con la clave de servicio, siguiendo el mismo
// precedente que la función `indexar` (--no-verify-jwt, cierre en el código).
//
// Entrada:  POST { accion, token, ... }
//   abrir     { token }                          → { tipo, persona, equipo? }
//   cargar    { token, persona_id }               → { persona, ficha }
//   guardar   { token, persona_id, ficha }        → { ok: true }
//   completar { token, persona_id, ficha }        → { ok: true } | { error, faltan: [...] }
//
// Deploy:  supabase functions deploy ficha --no-verify-jwt --project-ref <ref>
// ============================================================

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SB_URL = Deno.env.get("SUPABASE_URL")!;
const SB_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

type Persona = {
  id: string; nombre: string; pais: string | null; entidad: string | null;
  area: string | null; cargo: string | null; correo: string | null;
  gerente_id: string | null; activo: boolean;
};
type Token = {
  id: string; token: string; tipo: "individual" | "gerente"; persona_id: string;
  expira_en: string; revocado: boolean; usos: number;
};
type Ficha = Record<string, unknown>;

function json(obj: unknown, status = 200): Response {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...CORS, "Content-Type": "application/json; charset=utf-8" },
  });
}

/** REST de Supabase con la clave de servicio (salta RLS por diseño). */
async function sb(ruta: string, init: RequestInit = {}): Promise<Response> {
  return await fetch(`${SB_URL}${ruta}`, {
    ...init,
    headers: {
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers as Record<string, string> | undefined),
    },
  });
}

async function sbJson(ruta: string, init: RequestInit = {}): Promise<unknown> {
  const r = await sb(ruta, init);
  const txt = await r.text();
  if (!r.ok) throw new Error(`Supabase ${r.status}: ${txt.slice(0, 300)}`);
  return txt.trim() ? JSON.parse(txt) : null;
}

/* ============================================================
   Token
   ============================================================ */

/** Valida el token en cada llamada (revocar surte efecto de inmediato). */
async function resolverToken(token: string): Promise<Token | null> {
  if (!token || typeof token !== "string") return null;
  const filas = await sbJson(
    `/rest/v1/fichas_tokens?token=eq.${encodeURIComponent(token)}&select=*`,
  ) as Token[];
  const t = filas[0];
  if (!t) return null;
  if (t.revocado) return null;
  if (new Date(t.expira_en).getTime() < Date.now()) return null;
  return t;
}

async function marcarUso(t: Token): Promise<void> {
  await sb(`/rest/v1/fichas_tokens?id=eq.${t.id}`, {
    method: "PATCH",
    body: JSON.stringify({ usos: (t.usos || 0) + 1, ultimo_uso: new Date().toISOString() }),
  });
}

/** El ámbito de personas que este token puede tocar. */
async function ambito(t: Token): Promise<string[]> {
  if (t.tipo === "individual") return [t.persona_id];
  const reportes = await sbJson(
    `/rest/v1/personal?gerente_id=eq.${t.persona_id}&activo=eq.true&select=id`,
  ) as Array<{ id: string }>;
  return [t.persona_id, ...reportes.map((r) => r.id)];
}

/* ============================================================
   Acciones
   ============================================================ */

async function abrir(b: Record<string, unknown>): Promise<Response> {
  const t = await resolverToken(String(b.token ?? ""));
  if (!t) return json({ error: "Este enlace no es válido o ya expiró." }, 401);
  await marcarUso(t);

  const idsAmbito = await ambito(t);
  const personas = await sbJson(
    `/rest/v1/personal?id=in.(${idsAmbito.join(",")})&select=id,nombre,pais,entidad,area,cargo,correo,gerente_id,activo`,
  ) as Persona[];
  const fichas = await sbJson(
    `/rest/v1/fichas_perfil?persona_id=in.(${idsAmbito.join(",")})&select=persona_id,estado,` +
      "documento,antiguedad_org,nivel_educativo,cargo_actual,area_sede,responsabilidades,habilidades",
  ) as Array<{ persona_id: string; estado: string } & Ficha>;
  const fichaPorPersona = new Map(fichas.map((f) => [f.persona_id, f]));

  const persona = personas.find((p) => p.id === t.persona_id) ?? null;
  if (!persona) return json({ error: "La persona de este enlace ya no está activa." }, 404);

  if (t.tipo === "individual") {
    return json({ tipo: "individual", persona, ficha: fichaPorPersona.get(persona.id) ?? null });
  }

  const equipo = personas
    .filter((p) => p.id !== t.persona_id)
    .map((p) => ({
      ...p,
      estado: fichaPorPersona.get(p.id)?.estado ?? "pendiente",
      completitud: pctCompletitud(fichaPorPersona.get(p.id)),
    }));
  return json({
    tipo: "gerente",
    persona,
    equipo,
    propia: { estado: fichaPorPersona.get(persona.id)?.estado ?? "pendiente" },
  });
}

async function cargar(b: Record<string, unknown>): Promise<Response> {
  const t = await resolverToken(String(b.token ?? ""));
  if (!t) return json({ error: "Este enlace no es válido o ya expiró." }, 401);
  const personaId = String(b.persona_id ?? "");
  const idsAmbito = await ambito(t);
  if (!idsAmbito.includes(personaId)) {
    return json({ error: "Esa persona no está dentro de lo que este enlace permite llenar." }, 403);
  }

  const personas = await sbJson(
    `/rest/v1/personal?id=eq.${personaId}&select=id,nombre,pais,entidad,area,cargo,correo`,
  ) as Persona[];
  if (!personas.length) return json({ error: "Esa persona ya no está activa." }, 404);

  const fichas = await sbJson(`/rest/v1/fichas_perfil?persona_id=eq.${personaId}&select=*`) as Ficha[];
  return json({ persona: personas[0], ficha: fichas[0] ?? null });
}

const CAMPOS_FICHA = [
  "documento", "antiguedad_org", "nivel_educativo", "otras_formaciones",
  "titulo_obtenido", "institucion", "cargo_actual", "antiguedad_cargo", "area_sede",
  "responsabilidades", "posiciones_previas", "habilidades",
];

function limpiarFicha(entrada: unknown): Record<string, unknown> {
  const f = (entrada && typeof entrada === "object") ? entrada as Record<string, unknown> : {};
  const limpio: Record<string, unknown> = {};
  for (const campo of CAMPOS_FICHA) {
    if (f[campo] !== undefined) limpio[campo] = f[campo];
  }
  return limpio;
}

async function upsertFicha(personaId: string, campos: Record<string, unknown>, quien: string): Promise<void> {
  await sbJson(`/rest/v1/fichas_perfil?on_conflict=persona_id`, {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify([{ persona_id: personaId, ...campos, llenada_por: quien || null }]),
  });
}

async function guardar(b: Record<string, unknown>): Promise<Response> {
  const t = await resolverToken(String(b.token ?? ""));
  if (!t) return json({ error: "Este enlace no es válido o ya expiró." }, 401);
  const personaId = String(b.persona_id ?? "");
  const idsAmbito = await ambito(t);
  if (!idsAmbito.includes(personaId)) {
    return json({ error: "Esa persona no está dentro de lo que este enlace permite llenar." }, 403);
  }

  const campos = limpiarFicha(b.ficha);
  await upsertFicha(personaId, { ...campos, estado: "en_progreso" }, String(b.llenada_por ?? "").trim());
  return json({ ok: true });
}

/** Los mínimos exigidos para marcar una ficha como completada. */
function faltantes(f: Record<string, unknown>): string[] {
  const falta: string[] = [];
  const texto = (v: unknown) => typeof v === "string" && v.trim().length > 0;
  if (!texto(f.documento)) falta.push("Documento de identidad");
  if (!texto(f.antiguedad_org)) falta.push("Antigüedad en la organización");
  if (!texto(f.nivel_educativo)) falta.push("Nivel educativo");
  if (!texto(f.cargo_actual)) falta.push("Cargo actual");
  if (!texto(f.area_sede)) falta.push("Área / sede");
  const resp = Array.isArray(f.responsabilidades) ? f.responsabilidades : [];
  if (!resp.some((r) => texto(r))) falta.push("Al menos una responsabilidad principal");
  const hab = (f.habilidades && typeof f.habilidades === "object") ? f.habilidades as Record<string, unknown> : {};
  for (const [clave, nombre] of [["excel", "Excel"], ["odoo", "Odoo"], ["lark", "Lark"], ["powerbi", "Power BI"], ["ia", "Inteligencia Artificial"]]) {
    if (!texto(hab[clave])) falta.push(`Nivel de ${nombre}`);
  }
  return falta;
}

async function completar(b: Record<string, unknown>): Promise<Response> {
  const t = await resolverToken(String(b.token ?? ""));
  if (!t) return json({ error: "Este enlace no es válido o ya expiró." }, 401);
  const personaId = String(b.persona_id ?? "");
  const idsAmbito = await ambito(t);
  if (!idsAmbito.includes(personaId)) {
    return json({ error: "Esa persona no está dentro de lo que este enlace permite llenar." }, 403);
  }

  const campos = limpiarFicha(b.ficha);
  const falta = faltantes(campos);
  if (falta.length) return json({ error: "Faltan campos obligatorios para completar la ficha.", faltan: falta }, 400);

  await upsertFicha(personaId, {
    ...campos, estado: "completada", enviada_en: new Date().toISOString(),
  }, String(b.llenada_por ?? "").trim());
  return json({ ok: true });
}

const TOTAL_MINIMOS = 11; // 5 campos + 1 responsabilidad + 5 niveles de hard skills

function pctCompletitud(f: ({ estado: string } & Ficha) | undefined): number {
  if (!f) return 0;
  if (f.estado === "completada") return 100;
  const falta = faltantes(f as Record<string, unknown>);
  return Math.round(((TOTAL_MINIMOS - falta.length) / TOTAL_MINIMOS) * 100);
}

/* ============================================================
   Servidor
   ============================================================ */
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Cuerpo inválido: se espera JSON { accion, token, … }" }, 400);
  }

  try {
    switch (String(body.accion ?? "")) {
      case "abrir":     return await abrir(body);
      case "cargar":    return await cargar(body);
      case "guardar":   return await guardar(body);
      case "completar": return await completar(body);
      default:
        return json({ error: "Acción desconocida. Se esperan: abrir, cargar, guardar, completar." }, 400);
    }
  } catch (e) {
    console.error(e);
    return json({ error: String(e) }, 500);
  }
});
