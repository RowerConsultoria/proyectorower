// ============================================================
// Proyecto Rower — Edge Function: validacion
// Puerta pública (SIN sesión de Supabase Auth) para que los gerentes dueños de
// cada proceso validen los manuales de Fase 2. La usa validar-procesos/index.html.
//
// Mismo precedente que `ficha`: el llamante no trae JWT ni credencial interna,
// el acceso lo da un token opaco de public.validacion_tokens, generado por el
// panel (módulo «Validación de procesos», permiso admin.validacion) y repartido
// a mano. Por eso NO usa _shared/acceso.ts — se valida el token contra la tabla
// con la clave de servicio y el cierre vive en el código.
//
// El token muere por tres vías, comprobadas en CADA llamada: revocado, vencido
// (45 días) o su titular dado de baja del censo (`personal.activo = false`).
//
// ⚠️ El ámbito son PROCESOS, no personas: un token solo alcanza aquellos donde
// su titular (o, si es de gerente, su equipo directo) figura como validador
// CONFIRMADO. Una propuesta sin confirmar (`origen='auto'`) no abre nada — es
// la misma regla que el panel: el emparejador propone, un humano decide.
//
// Entrada:  POST { accion, token, ... }
//   abrir    { token }                                   → { tipo, persona, procesos }
//   cargar   { token, proceso }                          → { proceso, validacion }
//   guardar  { token, proceso, veredictos, comentarios } → { ok: true }
//   enviar   { token, proceso, veredictos, comentarios } → { ok } | { error, faltan }
//
// Deploy:  supabase functions deploy validacion --no-verify-jwt --project-ref <ref>
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
  area: string | null; cargo: string | null; activo: boolean;
};
type Token = {
  id: string; token: string; tipo: "individual" | "gerente"; persona_id: string;
  expira_en: string; revocado: boolean; usos: number;
};

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

const MSG_INVALIDO = "Este enlace no es válido o ya expiró.";
const MSG_INACTIVA = "Este enlace ya no está activo: la persona que lo recibió " +
  "salió del censo. Si crees que es un error, avisa a quien te lo compartió.";

type Puerta = { t: Token } | { rechazo: Response };

/**
 * La única puerta de la función — misma forma que `puerta()` en `ficha`, y por
 * el mismo motivo: devuelve la Response de rechazo en vez de un booleano, para
 * que una acción nueva no pueda nacer abierta por olvidar el guardia.
 */
async function puerta(b: Record<string, unknown>): Promise<Puerta> {
  const token = String(b.token ?? "");
  const noVale = { rechazo: json({ error: MSG_INVALIDO }, 401) };
  if (!token) return noVale;

  const filas = await sbJson(
    `/rest/v1/validacion_tokens?token=eq.${encodeURIComponent(token)}&select=*`,
  ) as Token[];
  const t = filas[0];
  if (!t) return noVale;
  if (t.revocado) return noVale;
  if (new Date(t.expira_en).getTime() < Date.now()) return noVale;

  const titular = await sbJson(
    `/rest/v1/personal?id=eq.${t.persona_id}&select=activo`,
  ) as Array<{ activo: boolean }>;
  if (!titular.length || titular[0].activo === false) {
    return { rechazo: json({ error: MSG_INACTIVA }, 403) };
  }
  return { t };
}

async function marcarUso(t: Token): Promise<void> {
  await sb(`/rest/v1/validacion_tokens?id=eq.${t.id}`, {
    method: "PATCH",
    body: JSON.stringify({ usos: (t.usos || 0) + 1, ultimo_uso: new Date().toISOString() }),
  });
}

/** Las personas que este token representa (él, o él y su equipo directo). */
async function personasDelToken(t: Token): Promise<string[]> {
  if (t.tipo === "individual") return [t.persona_id];
  const reportes = await sbJson(
    `/rest/v1/personal?gerente_id=eq.${t.persona_id}&activo=eq.true&select=id`,
  ) as Array<{ id: string }>;
  return [t.persona_id, ...reportes.map((r) => r.id)];
}

/**
 * Los procesos que este token puede validar: aquellos donde alguna de sus
 * personas figura como validador CONFIRMADO. Una propuesta del emparejador
 * (`origen='auto'`) no abre nada.
 */
async function procesosDelToken(t: Token): Promise<Map<string, string>> {
  const ids = await personasDelToken(t);
  const filas = await sbJson(
    `/rest/v1/procesos_validadores?persona_id=in.(${ids.join(",")})` +
      `&origen=neq.auto&select=proceso,persona_id`,
  ) as Array<{ proceso: string; persona_id: string }>;
  // proceso → la persona de este token que lo valida (la primera basta: el
  // token ya acota a quién representa).
  const m = new Map<string, string>();
  for (const f of filas) if (!m.has(f.proceso)) m.set(f.proceso, f.persona_id);
  return m;
}

/* ============================================================
   Acciones
   ============================================================ */

async function abrir(b: Record<string, unknown>): Promise<Response> {
  const p = await puerta(b);
  if ("rechazo" in p) return p.rechazo;
  const t = p.t;
  await marcarUso(t);

  const personas = await sbJson(
    `/rest/v1/personal?id=eq.${t.persona_id}&select=id,nombre,pais,entidad,area,cargo,activo`,
  ) as Persona[];
  const persona = personas[0];
  if (!persona) return json({ error: MSG_INACTIVA }, 403);

  const mapa = await procesosDelToken(t);
  if (!mapa.size) {
    return json({ tipo: t.tipo, persona, procesos: [] });
  }
  const codigos = [...mapa.keys()];
  // `contenido` NO viaja aquí: son 300 kB y la bandeja solo necesita el rótulo.
  const procesos = await sbJson(
    `/rest/v1/procesos_fase2?codigo=in.(${codigos.map(encodeURIComponent).join(",")})` +
      `&select=codigo,macro,macro_nombre,nombre,madurez,orden&order=orden`,
  ) as Array<Record<string, unknown>>;

  const hechas = await sbJson(
    `/rest/v1/validaciones?proceso=in.(${codigos.map(encodeURIComponent).join(",")})` +
      `&persona_id=in.(${[...new Set(mapa.values())].join(",")})&select=proceso,estado,veredictos,comentarios`,
  ) as Array<{ proceso: string; estado: string; comentarios: unknown[] }>;
  const porProceso = new Map(hechas.map((h) => [h.proceso, h]));

  return json({
    tipo: t.tipo,
    persona,
    procesos: procesos.map((pr) => {
      const v = porProceso.get(String(pr.codigo));
      return {
        ...pr,
        estado: v?.estado ?? "pendiente",
        comentarios: Array.isArray(v?.comentarios) ? v!.comentarios.length : 0,
      };
    }),
  });
}

async function cargar(b: Record<string, unknown>): Promise<Response> {
  const p = await puerta(b);
  if ("rechazo" in p) return p.rechazo;
  const t = p.t;
  const codigo = String(b.proceso ?? "");
  const mapa = await procesosDelToken(t);
  if (!mapa.has(codigo)) {
    return json({ error: "Ese proceso no está dentro de lo que este enlace permite validar." }, 403);
  }

  const filas = await sbJson(
    `/rest/v1/procesos_fase2?codigo=eq.${encodeURIComponent(codigo)}&select=*`,
  ) as Array<Record<string, unknown>>;
  if (!filas.length) return json({ error: "Ese proceso ya no existe." }, 404);

  const val = await sbJson(
    `/rest/v1/validaciones?proceso=eq.${encodeURIComponent(codigo)}` +
      `&persona_id=eq.${mapa.get(codigo)}&select=*`,
  ) as Array<Record<string, unknown>>;

  return json({ proceso: filas[0], validacion: val[0] ?? null });
}

const SECCIONES = ["proposito", "dueno", "disparador", "flujo", "riesgos", "indicadores"];

function limpiarVeredictos(entrada: unknown): Record<string, string> {
  const v = (entrada && typeof entrada === "object") ? entrada as Record<string, unknown> : {};
  const limpio: Record<string, string> = {};
  for (const s of SECCIONES) {
    if (v[s] === "ok" || v[s] === "observaciones") limpio[s] = v[s] as string;
  }
  return limpio;
}

/** Solo se aceptan los campos que la página escribe; nada de texto libre suelto. */
function limpiarComentarios(entrada: unknown): Array<Record<string, unknown>> {
  if (!Array.isArray(entrada)) return [];
  return entrada
    .filter((c) => c && typeof c === "object")
    .map((c) => c as Record<string, unknown>)
    .filter((c) => typeof c.texto === "string" && c.texto.trim().length > 0)
    .slice(0, 200)
    .map((c) => ({
      seccion: SECCIONES.includes(String(c.seccion)) ? String(c.seccion) : null,
      ancla: c.ancla == null ? null : String(c.ancla).slice(0, 80),
      texto: String(c.texto).slice(0, 4000),
      creado_en: new Date().toISOString(),
    }));
}

async function upsert(codigo: string, personaId: string, campos: Record<string, unknown>) {
  await sbJson(`/rest/v1/validaciones?on_conflict=proceso,persona_id`, {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify([{ proceso: codigo, persona_id: personaId, ...campos }]),
  });
}

async function guardar(b: Record<string, unknown>): Promise<Response> {
  const p = await puerta(b);
  if ("rechazo" in p) return p.rechazo;
  const codigo = String(b.proceso ?? "");
  const mapa = await procesosDelToken(p.t);
  if (!mapa.has(codigo)) {
    return json({ error: "Ese proceso no está dentro de lo que este enlace permite validar." }, 403);
  }
  await upsert(codigo, mapa.get(codigo)!, {
    veredictos: limpiarVeredictos(b.veredictos),
    comentarios: limpiarComentarios(b.comentarios),
    estado: "en_progreso",
  });
  return json({ ok: true });
}

async function enviar(b: Record<string, unknown>): Promise<Response> {
  const p = await puerta(b);
  if ("rechazo" in p) return p.rechazo;
  const codigo = String(b.proceso ?? "");
  const mapa = await procesosDelToken(p.t);
  if (!mapa.has(codigo)) {
    return json({ error: "Ese proceso no está dentro de lo que este enlace permite validar." }, 403);
  }
  const veredictos = limpiarVeredictos(b.veredictos);
  const comentarios = limpiarComentarios(b.comentarios);

  // Marcar «con observaciones» sin decir cuáles deja al equipo sin nada que
  // corregir, así que ahí sí se exige el comentario.
  const faltan = Object.entries(veredictos)
    .filter(([s, v]) => v === "observaciones" && !comentarios.some((c) => c.seccion === s))
    .map(([s]) => s);
  if (faltan.length) {
    return json({
      error: "Marcaste secciones con observaciones pero no escribiste cuáles.",
      faltan,
    }, 400);
  }
  const sinResponder = SECCIONES.filter((s) => !veredictos[s]);
  if (sinResponder.length) {
    return json({ error: "Faltan secciones por responder.", faltan: sinResponder }, 400);
  }

  await upsert(codigo, mapa.get(codigo)!, {
    veredictos, comentarios, estado: "enviada", enviada_en: new Date().toISOString(),
  });
  return json({ ok: true });
}

/* ============================================================
   Entrada
   ============================================================ */

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Usa POST." }, 405);
  try {
    const body = await req.json() as Record<string, unknown>;
    switch (String(body.accion ?? "")) {
      case "abrir":   return await abrir(body);
      case "cargar":  return await cargar(body);
      case "guardar": return await guardar(body);
      case "enviar":  return await enviar(body);
      default:        return json({ error: "Acción desconocida." }, 400);
    }
  } catch (e) {
    // Mismo criterio que `ficha`: el texto del error vuelve al llamante. Es una
    // herramienta interna repartida por enlace, y sin esto un fallo en
    // producción solo se ve como «error» sin pista de dónde.
    console.error(e);
    return json({ error: String(e) }, 500);
  }
});
