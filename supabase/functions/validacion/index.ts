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
//   guardar  { token, proceso, veredictos, comentarios, base } → { ok: true }
//   enviar   { token, proceso, veredictos, comentarios, base } → { ok } | { error, faltan }
//
//   `base` es lo que la página CARGÓ. Deja al servidor distinguir «el gerente
//   borró esta observación» de «la página nunca la tuvo». Sin `base`, conserva.
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

/** Una fecha ISO utilizable, o null. */
function fechaValida(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const t = Date.parse(v);
  return Number.isFinite(t) ? new Date(t).toISOString() : null;
}

/**
 * Solo se aceptan los campos que la página escribe; nada de texto libre suelto.
 *
 * ⚠️ `creado_en` se CONSERVA si viene. Antes se ponía a `now()` en cada
 * guardado, así que la fecha de cada observación se perdía en cuanto el gerente
 * volvía a guardar — y esa fecha es la que dice cuándo se dijo algo, que en una
 * ronda de validación es justo lo que hay que poder demostrar.
 */
function limpiarComentarios(entrada: unknown): Array<Record<string, unknown>> {
  if (!Array.isArray(entrada)) return [];
  const ahora = new Date().toISOString();
  return entrada
    .filter((c) => c && typeof c === "object")
    .map((c) => c as Record<string, unknown>)
    .filter((c) => typeof c.texto === "string" && c.texto.trim().length > 0)
    .slice(0, 200)
    .map((c) => ({
      seccion: SECCIONES.includes(String(c.seccion)) ? String(c.seccion) : null,
      ancla: c.ancla == null ? null : String(c.ancla).slice(0, 80),
      texto: String(c.texto).slice(0, 4000),
      creado_en: fechaValida(c.creado_en) ?? ahora,
    }));
}

/** Identidad de un comentario: la sección y el punto al que se ancló. */
function claveComentario(c: Record<string, unknown>): string {
  return String(c.seccion ?? "") + "\u0000" + String(c.ancla ?? "");
}

/**
 * Funde lo que llega con lo que hay, para que un envío incompleto no borre.
 *
 * Misma lección que en `ficha`: el cliente manda el objeto entero y el servidor
 * lo reemplaza, así que cualquier fallo del navegador —o una carga a medias—
 * se lleva por delante lo ya escrito. Aquí no ha pasado todavía porque la
 * campaña no ha arrancado; se cierra antes de que arranque.
 *
 * `base` es lo que la página CARGÓ. Es lo que distingue «el gerente borró esta
 * observación» de «la página nunca la tuvo». Sin `base` se conserva todo.
 */
function fundirValidacion(
  veredictos: Record<string, string>,
  comentarios: Array<Record<string, unknown>>,
  previa: Record<string, unknown> | null,
  base: Record<string, unknown> | null,
): { veredictos: Record<string, string>; comentarios: Array<Record<string, unknown>> } {
  const vPrev = (previa?.veredictos && typeof previa.veredictos === "object")
    ? previa.veredictos as Record<string, string> : {};
  /* Los veredictos solo se superponen: la página no ofrece «quitar» un
     veredicto, únicamente cambiarlo entre ok y observaciones. */
  const vFin: Record<string, string> = { ...vPrev, ...veredictos };

  const cPrev = Array.isArray(previa?.comentarios)
    ? previa!.comentarios as Array<Record<string, unknown>> : [];
  const cBase = (base && Array.isArray(base.comentarios))
    ? base.comentarios as Array<Record<string, unknown>> : null;
  const enBase = cBase ? new Set(cBase.map(claveComentario)) : null;
  const llegan = new Map(comentarios.map((c) => [claveComentario(c), c]));

  const fin: Array<Record<string, unknown>> = [];
  for (const viejo of cPrev) {
    const k = claveComentario(viejo);
    const nuevo = llegan.get(k);
    if (nuevo) {
      // El mismo comentario, quizá con el texto corregido: se queda su fecha.
      fin.push({ ...nuevo, creado_en: fechaValida(viejo.creado_en) ?? nuevo.creado_en });
      llegan.delete(k);
    } else if (enBase && enBase.has(k)) {
      // La página lo tenía delante y ya no lo manda: lo borró el gerente.
    } else {
      // La página nunca lo vio (o no mandó `base`): no puede borrarlo.
      fin.push(viejo);
    }
  }
  for (const nuevo of llegan.values()) fin.push(nuevo);
  return { veredictos: vFin, comentarios: fin };
}

/** La validación que hay hoy, o null. */
async function validacionPrevia(codigo: string, personaId: string): Promise<Record<string, unknown> | null> {
  const filas = await sbJson(
    `/rest/v1/validaciones?proceso=eq.${encodeURIComponent(codigo)}&persona_id=eq.${personaId}&select=*`,
  ) as Array<Record<string, unknown>>;
  return filas[0] ?? null;
}

/** null cuando el llamante no mandó `base` (una pestaña con la página vieja). */
function limpiarBase(entrada: unknown): Record<string, unknown> | null {
  if (!entrada || typeof entrada !== "object") return null;
  const b = entrada as Record<string, unknown>;
  return {
    veredictos: limpiarVeredictos(b.veredictos),
    comentarios: Array.isArray(b.comentarios) ? b.comentarios : [],
  };
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
  const personaId = mapa.get(codigo)!;
  const previa = await validacionPrevia(codigo, personaId);
  const fundido = fundirValidacion(
    limpiarVeredictos(b.veredictos), limpiarComentarios(b.comentarios),
    previa, limpiarBase(b.base));
  /* Un guardado NUNCA devuelve a «en progreso» algo ya enviado. Es el mismo
     fallo que dejó 48 fichas de perfil entregadas contando como pendientes:
     `enviada_en` se quedaba puesto y el estado no. */
  const estado = previa?.estado === "enviada" ? "enviada" : "en_progreso";
  await upsert(codigo, personaId, { ...fundido, estado });
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
  const personaId = mapa.get(codigo)!;
  const previa = await validacionPrevia(codigo, personaId);
  /* Se valida lo FUNDIDO, no lo que llega: si la página mandó de menos, lo
     guardado sigue contando y no hay por qué rechazar el envío. */
  const { veredictos, comentarios } = fundirValidacion(
    limpiarVeredictos(b.veredictos), limpiarComentarios(b.comentarios),
    previa, limpiarBase(b.base));

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

  await upsert(codigo, personaId, {
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
