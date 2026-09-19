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
// El token muere por tres vías, y las tres se comprueban en CADA llamada:
// revocado, vencido (45 días) o su titular dado de baja del censo
// (`personal.activo = false`). Ver puerta().
//
// Escritura NO destructiva (19-sep-2026): el formulario manda la ficha entera
// en cada guardado, así que un campo que no se pintó viajaba como "" y borraba
// lo que había. Ver fundirFicha(): un valor vacío jamás pisa uno guardado, y
// `guardar` no degrada una ficha ya entregada.
//
// Comprobaciones (sin credenciales, con un `fetch` falso):
//   deno test --allow-env --allow-read scripts/comprobar-ficha.ts
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

const MSG_INVALIDO = "Este enlace no es válido o ya expiró.";
const MSG_INACTIVA = "Este enlace ya no está activo: la persona que lo recibió " +
  "salió del censo. Si crees que es un error, avisa a quien te lo compartió.";

/** O el token vigente, o la respuesta con la que se rechaza al llamante. */
type Puerta = { t: Token } | { rechazo: Response };

/**
 * La única puerta de la función. Valida en CADA llamada que el token exista,
 * no esté revocado, no esté vencido y que **su titular siga activo en el
 * censo** — así revocar o dar de baja surte efecto de inmediato, incluso con
 * la página ya abierta y a medio llenar.
 *
 * ⚠️ Lo de `activo` vive aquí y no en cada acción a propósito: si el guardia
 * se repitiera en las cuatro, la quinta que alguien añada nacería abierta. Por
 * lo mismo devuelve la Response de rechazo en vez de un booleano: no hay forma
 * de quedarse con el token sin haber atendido antes el rechazo.
 *
 * Cuesta una consulta más por llamada — búsqueda por clave primaria, al lado
 * de las 2-3 que ya hace cada acción —. Se podría ahorrar embebiendo
 * `personal` en el select del token, pero eso ata la puerta a que PostgREST
 * resuelva la relación por nombre, y un fallo ahí cierra la ficha para todo el
 * mundo: no vale el riesgo por un viaje.
 */
async function puerta(b: Record<string, unknown>): Promise<Puerta> {
  const token = String(b.token ?? "");
  const noVale = { rechazo: json({ error: MSG_INVALIDO }, 401) };
  if (!token) return noVale;

  const filas = await sbJson(
    `/rest/v1/fichas_tokens?token=eq.${encodeURIComponent(token)}&select=*`,
  ) as Token[];
  const t = filas[0];
  if (!t) return noVale;
  if (t.revocado) return noVale;
  if (new Date(t.expira_en).getTime() < Date.now()) return noVale;

  /* Dar de baja a alguien desde el panel ya revoca sus enlaces, así que lo
     normal es que este caso muera en el `t.revocado` de arriba. Esto lo cierra
     igual para lo que la revocación no alcanza: un `activo=false` puesto por
     SQL, por el importador, o por una versión del panel anterior a sep-2026.
     El titular es la persona del token: en un enlace de equipo, el gerente
     —sus reportes los filtra ambito() por su cuenta—. */
  const titular = await sbJson(
    `/rest/v1/personal?id=eq.${t.persona_id}&select=activo`,
  ) as Array<{ activo: boolean }>;
  if (!titular.length || titular[0].activo === false) {
    return { rechazo: json({ error: MSG_INACTIVA }, 403) };
  }

  return { t };
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
  const p = await puerta(b);
  if ("rechazo" in p) return p.rechazo;
  const t = p.t;
  await marcarUso(t);

  const idsAmbito = await ambito(t);
  const personas = await sbJson(
    `/rest/v1/personal?id=in.(${idsAmbito.join(",")})&select=id,nombre,pais,entidad,area,cargo,correo,gerente_id,activo`,
  ) as Persona[];
  /* `select=*` y no una lista de columnas: el formulario repinta la ficha con lo
     que devuelva esto y vuelve a guardarla ENTERA, así que una columna que no
     viaje aquí se reescribe vacía en el siguiente guardado. Con la lista corta
     que había antes (sin otras_formaciones, titulo_obtenido, institucion,
     antiguedad_cargo ni posiciones_previas) el enlace individual borraba esos
     cinco campos en cuanto la persona reentraba y tecleaba algo. */
  const fichas = await sbJson(
    `/rest/v1/fichas_perfil?persona_id=in.(${idsAmbito.join(",")})&select=*`,
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
  const p = await puerta(b);
  if ("rechazo" in p) return p.rechazo;
  const t = p.t;
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

const CAMPOS_TEXTO = [
  "documento", "antiguedad_org", "nivel_educativo", "otras_formaciones",
  "titulo_obtenido", "institucion", "cargo_actual", "antiguedad_cargo", "area_sede",
];
const CLAVES_SKILL = ["excel", "odoo", "lark", "powerbi", "ia"];

function limpiarFicha(entrada: unknown): Record<string, unknown> {
  const f = (entrada && typeof entrada === "object") ? entrada as Record<string, unknown> : {};
  const limpio: Record<string, unknown> = {};
  for (const campo of CAMPOS_FICHA) {
    if (f[campo] !== undefined) limpio[campo] = f[campo];
  }
  return limpio;
}

const txt = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

/**
 * Un valor que llega VACÍO nunca pisa uno ya guardado.
 *
 * El formulario manda siempre los doce campos, llenos o no, y reescribe la
 * ficha entera en cada guardado: cualquier campo que no se haya pintado bien
 * viaja como "" y borraba el dato. Pasó de verdad — 73 «periodos» de
 * posiciones anteriores desaparecieron así, y no había copia de la que
 * sacarlos. Aquí se cierra por el lado del servidor, para que un fallo del
 * navegador no vuelva a poder vaciar la base.
 *
 * ⚠️ El precio: desde aquí NO se puede dejar en blanco un campo que ya tenía
 * texto (hay que corregirlo con otro texto). Es deliberado: en una recogida de
 * datos, un borrado accidental cuesta mucho más que un borrado impedido. Para
 * vaciarlo de verdad está el panel, y todo cambio queda en
 * `fichas_perfil_historial`.
 *
 * Además nunca devuelve "" sino null: el `check` de `nivel_educativo` rechaza
 * la cadena vacía, y por eso un guardado hecho antes de marcar el nivel
 * reventaba entero (400) y el autoguardado se lo tragaba en silencio.
 */
function fundirFicha(
  entra: Record<string, unknown>,
  previa: Record<string, unknown> | null,
): Record<string, unknown> {
  const p = previa ?? {};
  const out: Record<string, unknown> = {};

  for (const c of CAMPOS_TEXTO) {
    if (!(c in entra) && !(c in p)) continue;
    out[c] = txt(entra[c]) || txt(p[c]) || null;
  }

  if ("responsabilidades" in entra || "responsabilidades" in p) {
    const e = (Array.isArray(entra.responsabilidades) ? entra.responsabilidades : [])
      .filter((r) => txt(r));
    const g = Array.isArray(p.responsabilidades) ? p.responsabilidades : [];
    out.responsabilidades = e.length ? e : g;
  }

  if ("posiciones_previas" in entra || "posiciones_previas" in p) {
    const g = (Array.isArray(p.posiciones_previas) ? p.posiciones_previas : []) as Record<string, unknown>[];
    const e = (Array.isArray(entra.posiciones_previas) ? entra.posiciones_previas : []) as Record<string, unknown>[];
    if (!e.length) {
      out.posiciones_previas = g;
    } else {
      /* Se emparejan por `cargo` y no por posición: así rellenar un hueco no
         puede resucitar la fila que la persona acaba de borrar ni mezclar dos
         puestos distintos. Si el cargo cambió, no hay a qué agarrarse y se
         respeta lo que llega. */
      out.posiciones_previas = e.map((it) => {
        const par = g.find((x) => txt(x.cargo) && txt(x.cargo).toLowerCase() === txt(it.cargo).toLowerCase());
        if (!par) return it;
        const fund: Record<string, unknown> = { ...it };
        for (const k of ["cargo", "area", "periodo"]) {
          if (!txt(fund[k]) && txt(par[k])) fund[k] = txt(par[k]);
        }
        return fund;
      });
    }
  }

  if ("habilidades" in entra || "habilidades" in p) {
    const ge = (p.habilidades && typeof p.habilidades === "object") ? p.habilidades as Record<string, unknown> : {};
    const ee = (entra.habilidades && typeof entra.habilidades === "object") ? entra.habilidades as Record<string, unknown> : {};
    const hab: Record<string, unknown> = { ...ge, ...ee };
    for (const k of CLAVES_SKILL) {
      const v = txt(ee[k]) || txt(ge[k]);
      if (v) hab[k] = v; else delete hab[k];
    }
    const otraE = (ee.otra && typeof ee.otra === "object") ? ee.otra as Record<string, unknown> : {};
    const otraG = (ge.otra && typeof ge.otra === "object") ? ge.otra as Record<string, unknown> : {};
    const otra = {
      nombre: txt(otraE.nombre) || txt(otraG.nombre),
      nivel: txt(otraE.nivel) || txt(otraG.nivel),
    };
    if (otra.nombre || otra.nivel) hab.otra = otra; else delete hab.otra;
    out.habilidades = hab;
  }

  return out;
}

/** La ficha que hay hoy, o null si aún no existe. */
async function fichaPrevia(personaId: string): Promise<Record<string, unknown> | null> {
  const filas = await sbJson(
    `/rest/v1/fichas_perfil?persona_id=eq.${personaId}&select=*`,
  ) as Record<string, unknown>[];
  return filas[0] ?? null;
}

async function upsertFicha(personaId: string, campos: Record<string, unknown>, quien: string): Promise<void> {
  const cuerpo: Record<string, unknown> = { persona_id: personaId, ...campos };
  /* `llenada_por` guarda un nombre de persona: si no llega ninguno, se deja el
     que hubiera en vez de borrarlo con null. */
  if (quien) cuerpo.llenada_por = quien;
  await sbJson(`/rest/v1/fichas_perfil?on_conflict=persona_id`, {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify([cuerpo]),
  });
}

async function guardar(b: Record<string, unknown>): Promise<Response> {
  const p = await puerta(b);
  if ("rechazo" in p) return p.rechazo;
  const t = p.t;
  const personaId = String(b.persona_id ?? "");
  const idsAmbito = await ambito(t);
  if (!idsAmbito.includes(personaId)) {
    return json({ error: "Esa persona no está dentro de lo que este enlace permite llenar." }, 403);
  }

  const previa = await fichaPrevia(personaId);
  const campos = fundirFicha(limpiarFicha(b.ficha), previa);
  /* Un guardado NUNCA degrada una ficha ya entregada. El formulario autoguarda
     2 s después de cada tecla, y ese autoguardado llegaba detrás del botón
     «Marcar como completada» y la devolvía a «en progreso»: 48 fichas quedaron
     así, entregadas y contadas como pendientes. Corregido también en el
     navegador (el temporizador ahora se cancela), pero el estado se defiende
     aquí porque aquí es donde se escribe. */
  const estado = previa?.estado === "completada" ? "completada" : "en_progreso";
  await upsertFicha(personaId, { ...campos, estado }, String(b.llenada_por ?? "").trim());
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
  const p = await puerta(b);
  if ("rechazo" in p) return p.rechazo;
  const t = p.t;
  const personaId = String(b.persona_id ?? "");
  const idsAmbito = await ambito(t);
  if (!idsAmbito.includes(personaId)) {
    return json({ error: "Esa persona no está dentro de lo que este enlace permite llenar." }, 403);
  }

  const previa = await fichaPrevia(personaId);
  /* Se valida lo FUNDIDO, no lo que llega: si el navegador mandó un campo en
     blanco que ya estaba guardado, la ficha sigue completa y no hay por qué
     rechazarla. */
  const campos = fundirFicha(limpiarFicha(b.ficha), previa);
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
