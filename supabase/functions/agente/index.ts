// ============================================================
// Proyecto Rower — Edge Function: agente
// El Agente IA flotante del manual de Fase 2 (Claude Managed Agents).
//
// El agente (definido en scripts/agente/definicion.mjs) vive en Anthropic: allí
// corre su bucle y se guarda la conversación. Esta función es el puente entre
// el navegador y esa sesión:
//   · comprueba la sesión de Supabase y que la cuenta pueda usar el agente
//     (mi_agente(): interruptor general + comité o interruptor por cuenta);
//   · abre o retoma la sesión de Managed Agents de la cuenta;
//   · ejecuta las herramientas propias del agente CON EL JWT DE QUIEN ESCRIBE,
//     así que el agente ve exactamente lo que esa cuenta puede ver (RLS);
//   · retiene «proponer_flujo» hasta que la persona pulse Aplicar o Descartar.
//     Aplicar inserta la versión en flujos_tobe con su sesión: la RLS exige
//     puede_usar_agente() y el trigger firma la versión a su nombre.
//
// Entrada: POST { accion, … }
//   estado              → JSON { puede, sesion, titulo, mensajes[], ocupado }   (la conversación abierta)
//   conversaciones      → JSON { conversaciones[] }   (todas las de la cuenta, la más reciente primero)
//   abrir {session_id}  → JSON como «estado», y esa pasa a ser la abierta
//   nueva               → JSON { ok }   (cierra la abierta en el chat; no la borra: sigue en la lista)
//   enviar  {texto, pagina, session_id?}   → SSE   (sin session_id abre una conversación nueva)
//   resolver {propuesta_id, aprobar, motivo?} → SSE (en la conversación de la propuesta)
//   seguir  {session_id}                   → SSE   (retoma un turno que siguió corriendo)
// SSE: data: {"t": sesion|titulo|inicio|delta|mensaje|herramienta|propuesta|aplicado|conflicto|descartada|ocupada|seguir|fin|error, …}
//      (propuesta y aplicado llevan tipo: "flujo" o "estructura")
//
// Una sola llamada atiende una conversación a la vez (cerrojo `bombeando_hasta`): dos pestañas
// no ejecutan dos veces la misma herramienta. Un flujo lo publica SOLO esta función, con la
// clave de servicio, tras validarlo; ninguna sesión puede insertar en flujos_tobe.
//
// Deploy:   npx supabase functions deploy agente --project-ref <ref>   (CON verify_jwt)
// Secretos: ANTHROPIC_API_KEY · AGENTE_ID · AGENTE_ENTORNO_ID · SITIO_URL
// ============================================================

import Anthropic from "npm:@anthropic-ai/sdk@1.3.0";
import JSON5 from "npm:json5@2.2.3";
import { identificar, noAutorizado } from "../_shared/acceso.ts";
import { aplicar as aplicarOps, indice as indiceEstructura, resumen as resumenEstructura, validar as validarEstructura } from "./estructura.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SB_URL = Deno.env.get("SUPABASE_URL")!;
const SB_SERVICIO = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SB_ANON = Deno.env.get("SUPABASE_ANON_KEY")!;
const AGENTE_ID = Deno.env.get("AGENTE_ID")!;
const ENTORNO_ID = Deno.env.get("AGENTE_ENTORNO_ID")!;
const SITIO = (Deno.env.get("SITIO_URL") ?? "https://proyectorower.rower.workers.dev").replace(/\/$/, "");

const PRESUPUESTO_CENTAVOS = "1000";   // tope de gasto por conversación: USD 10
const TURNO_MS = 120_000;             // la función corta antes del límite de Supabase; el navegador pide «seguir»
const PARTE_CHARS = 28_000;

const client = new Anthropic({ apiKey: Deno.env.get("ANTHROPIC_API_KEY")! });

// ---------- Supabase: con la sesión de quien escribe, o con la clave de servicio ----------
// estructura: la cuenta tiene además el interruptor «Puede cambiar la estructura».
type Ctx = { jwt: string; id: string; nombre: string; rol: string; estructura: boolean };

async function sb(path: string, init: RequestInit & { jwt?: string } = {}): Promise<any> {
  const { jwt, ...resto } = init;
  const r = await fetch(`${SB_URL}${path}`, {
    ...resto,
    headers: {
      apikey: jwt ? SB_ANON : SB_SERVICIO,
      Authorization: `Bearer ${jwt ?? SB_SERVICIO}`,
      "Content-Type": "application/json",
      ...(resto.headers ?? {}),
    },
  });
  const t = await r.text();
  let d: any = null;
  try { d = t ? JSON.parse(t) : null; } catch { d = t; }
  if (!r.ok) throw new Error((d && (d.message || d.hint)) || `Supabase ${r.status}`);
  return d;
}
const rpc = (fn: string, body: unknown, jwt?: string) =>
  sb(`/rest/v1/rpc/${fn}`, { method: "POST", body: JSON.stringify(body ?? {}), jwt });

// ---------- El manual publicado (To-Be, As-Is e índice), con caché en el worker ----------
let cacheManual: { ts: number; tobe: any; asis: any; datos: any; estructura: any } | null = null;

// Los .js de datos son `window.X = {…};` con claves sin comillas: se leen como JSON5, NUNCA se
// ejecutan (esta función tiene la clave de servicio; ejecutar lo publicado sería darle el control
// a quien pueda publicar en el sitio).
async function cargarJs(archivo: string, global: string): Promise<any> {
  const r = await fetch(`${SITIO}/informe/fase2/${archivo}`);
  if (!r.ok) throw new Error(`No pude leer ${archivo} del sitio (${r.status}).`);
  const t = await r.text();
  const i = t.indexOf(`window.${global}`), a = t.indexOf("=", i) + 1, b = t.lastIndexOf("}") + 1;
  if (i < 0 || a <= 0 || b <= a) throw new Error(`${archivo} no tiene la forma esperada.`);
  return JSON5.parse(t.slice(a, b));
}

// Caché corta: tras publicar un cambio del archivo, las versiones de la plataforma se comparan
// enseguida contra el archivo nuevo (regla de `archivo`).
async function manual() {
  if (cacheManual && Date.now() - cacheManual.ts < 3 * 60_000) return cacheManual;
  const [tobe, asis, datos] = await Promise.all([
    cargarJs("manual-contenido.js", "MANUAL_CONTENIDO"),
    cargarJs("manual-asis.js", "MANUAL_ASIS"),
    cargarJs("manual-procesos-datos.js", "MANUAL_FASE2"),
  ]);
  // La estructura va aparte: si su archivo no se puede leer, no se caen las herramientas de procesos.
  const estructura = await cargarJs("estructura-tobe-datos.js", "ESTRUCTURA_TOBE").catch(() => null);
  cacheManual = { ts: Date.now(), tobe, asis, datos, estructura };
  return cacheManual;
}

function prefijo(cod: string) { return String(cod).split(".")[0]; }

function fichaMapa(datos: any, cod: string) {
  for (const m of datos?.macros ?? []) for (const p of m.procesos ?? []) if (p.codigo === cod) return { macro: m, proceso: p };
  return null;
}

// El mismo cálculo que huellaDe() del manual (sin las claves «_»): dice sobre qué versión del To-Be se trabajó.
function huella(obj: unknown) {
  const s = JSON.stringify(obj ?? {}, (k, v) => (k.charAt(0) === "_" ? undefined : v));
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(16) + "-" + s.length;
}

/** El To-Be del proceso con el flujo vigente de la plataforma encima, como lo pinta el manual. */
async function tobeVigente(cod: string, ctx: Ctx) {
  const M = await manual();
  const orig = M.tobe?.[prefijo(cod)]?.procesos?.[cod];
  if (!orig) return null;
  const filas = await sb(`/rest/v1/v_flujos_vigentes?proceso=eq.${encodeURIComponent(cod)}&select=*`, { jwt: ctx.jwt });
  // Si el archivo cambió después de publicar la versión (el equipo incorporó cambios al repo),
  // manda el archivo: la versión de la plataforma ya no se aplica. Igual que cargarFlujos() del manual.
  const v = filas?.[0] && (!filas[0].archivo || filas[0].archivo === huella(orig)) ? filas[0] : null;
  const proc = v ? { ...orig, flujo: v.flujo } : orig;
  // ultima: la última versión publicada, se aplique o no; viaja como base_version al publicar.
  return { proc, orig, vigente: v, archivoCambio: !!filas?.[0] && !v, ultima: (filas?.[0]?.version as number) ?? 0 };
}

/** La estructura vigente: la última versión de la plataforma si se publicó sobre el archivo actual. */
async function estructuraVigente(ctx: Ctx) {
  const M = await manual();
  if (!M.estructura) throw new Error("No pude leer estructura-tobe-datos.js del sitio.");
  const filas = await sb(`/rest/v1/v_estructura_vigente?select=*`, { jwt: ctx.jwt });
  const f = filas?.[0];
  const v = f && (!f.archivo || f.archivo === huella(M.estructura)) ? f : null;
  return { datos: v ? v.datos : M.estructura, orig: M.estructura, vigente: v, archivoCambio: !!f && !v, ultima: (f?.version as number) ?? 0 };
}

// ---------- Validación de un flujo propuesto (mismas reglas que verificar-diagramas-fase2.js) ----------
// Diccionarios sin prototipo: un id como "constructor" o "toString" no puede colarse.
const TIPOS = ["inicio", "tarea", "decision", "fin"];
const esTexto = (x: unknown, max: number) => typeof x === "string" && x.trim().length > 0 && x.length <= max;

function validarFlujo(f: any): string[] {
  const err: string[] = [];
  if (JSON.stringify(f ?? {}).length > 200_000) return ["El flujo es demasiado grande."];
  const acts = Array.isArray(f?.actividades) ? f.actividades : null;
  const d = f?.diagrama;
  const carriles = Array.isArray(d?.carriles) ? d.carriles : null;
  const nodos = Array.isArray(d?.nodos) ? d.nodos : null;
  const aristas = Array.isArray(d?.aristas) ? d.aristas : null;
  if (!acts || !acts.length) err.push("La lista de actividades está vacía o no es una lista.");
  if (!carriles || !nodos || !aristas) { err.push("El diagrama necesita las listas carriles, nodos y aristas."); return err; }
  if (acts && acts.length > 80) err.push("Más de 80 actividades.");
  if (nodos.length > 150 || aristas.length > 300 || carriles.length > 20) err.push("El diagrama pasa del tamaño máximo (150 nodos, 300 aristas, 20 carriles).");

  const idsA = new Set<string>();
  (acts ?? []).forEach((a: any, i: number) => {
    if (!esTexto(a?.id, 20) || !esTexto(a?.rol, 200) || !esTexto(a?.texto, 1500)) { err.push(`La actividad ${i + 1} necesita id (≤20), rol y texto como texto.`); return; }
    if (idsA.has(a.id)) err.push(`El id de actividad "${a.id}" está repetido.`);
    idsA.add(a.id);
  });
  if (carriles.some((c: unknown) => !esTexto(c, 200))) err.push("Todo carril es un texto no vacío.");
  const carr = new Set<string>(carriles.filter((c: unknown) => typeof c === "string"));
  if (carr.size !== carriles.length) err.push("Hay carriles repetidos.");
  const roles = new Set<string>((acts ?? []).map((a: any) => a?.rol).filter((r: unknown) => typeof r === "string"));
  roles.forEach((r) => { if (!carr.has(r)) err.push(`ROL SIN CARRIL: "${r}" ejecuta una actividad pero no tiene carril.`); });
  carr.forEach((c) => { if (!roles.has(c)) err.push(`CARRIL SIN ROL: "${c}" tiene carril pero ninguna actividad.`); });

  const tipo = new Map<string, string>();
  nodos.forEach((n: any, i: number) => {
    if (!esTexto(n?.id, 30)) { err.push(`El nodo ${i + 1} no tiene un id de texto.`); return; }
    if (tipo.has(n.id)) err.push(`El id de nodo "${n.id}" está repetido.`);
    if (!TIPOS.includes(n.tipo)) err.push(`El nodo "${n.id}" tiene un tipo inválido: usa inicio, tarea, decision o fin.`);
    tipo.set(n.id, TIPOS.includes(n.tipo) ? n.tipo : "tarea");
    if (!carr.has(n.carril)) err.push(`El nodo "${n.id}" está en un carril que no existe.`);
    if (!esTexto(n.n, 90)) err.push(`El nodo "${n.id}" no tiene texto o pasa de 90 caracteres.`);
    if (n.sistemas !== undefined && (!Array.isArray(n.sistemas) || n.sistemas.some((x: unknown) => !esTexto(x, 60)))) {
      err.push(`"sistemas" del nodo "${n.id}" tiene que ser una lista de textos.`);
    }
  });
  const inicios = [...tipo.values()].filter((t) => t === "inicio").length;
  if (inicios !== 1) err.push(`Tiene que haber exactamente un nodo de inicio (hay ${inicios}).`);
  if (![...tipo.values()].includes("fin")) err.push("No hay ningún nodo de fin.");

  const sal = new Map<string, any[]>(), ent = new Map<string, number>();
  tipo.forEach((_, id) => { sal.set(id, []); ent.set(id, 0); });
  aristas.forEach((a: any) => {
    if (typeof a?.de !== "string" || typeof a?.a !== "string" || !tipo.has(a.de) || !tipo.has(a.a)) {
      err.push(`La arista ${String(a?.de)} → ${String(a?.a)} usa un nodo que no existe.`); return;
    }
    if (a.etq !== undefined && !esTexto(a.etq, 40)) err.push(`La etiqueta de ${a.de} → ${a.a} tiene que ser un texto corto.`);
    if (a.de === a.a) err.push(`La arista ${a.de} → ${a.a} vuelve al mismo nodo.`);
    sal.get(a.de)!.push(a); ent.set(a.a, ent.get(a.a)! + 1);
  });
  tipo.forEach((t, id) => {
    const s = sal.get(id)!;
    if (t !== "fin" && !s.length) err.push(`NODO COLGANTE: "${id}" no tiene salida.`);
    if (t === "fin" && s.length) err.push(`El nodo de fin "${id}" tiene salidas.`);
    if (t === "inicio" && ent.get(id)) err.push(`El inicio "${id}" tiene flechas de entrada.`);
    if (t === "decision") {
      if (s.length < 2) err.push(`La decisión "${id}" tiene menos de dos salidas.`);
      if (s.some((a) => !a.etq)) err.push(`Alguna salida de la decisión "${id}" no tiene etiqueta.`);
    }
  });
  // Ciclos (DFS) y alcance desde el inicio.
  const color = new Map<string, number>();
  const visita = (u: string, pila: string[]): void => {
    color.set(u, 1); pila.push(u);
    for (const a of sal.get(u) ?? []) {
      if (color.get(a.a) === 1) err.push(`CICLO: ${[...pila, a.a].join(" → ")}. Un reproceso se dibuja como rama que termina o se reincorpora más adelante.`);
      else if (!color.get(a.a)) visita(a.a, pila);
    }
    pila.pop(); color.set(u, 2);
  };
  const ini = [...tipo.entries()].find(([, t]) => t === "inicio");
  if (ini) visita(ini[0], []);
  tipo.forEach((_, id) => { if (!color.get(id)) err.push(`El nodo "${id}" no se alcanza desde el inicio.`); });
  return [...new Set(err)].slice(0, 40);
}

// ---------- Herramientas propias del agente ----------
async function ejecutar(nombre: string, input: any, ctx: Ctx): Promise<string> {
  try {
    const cod = String(input?.codigo ?? "").trim();
    if (nombre === "ver_proceso") {
      const M = await manual();
      const ficha = fichaMapa(M.datos, cod);
      if (!ficha) return `No existe el proceso "${cod}". Usa listar_procesos.`;
      const cab = { codigo: cod, nombre: ficha.proceso.n, macroproceso: `${ficha.macro.prefijo} ${ficha.macro.n}` };
      if (input?.version === "asis") {
        const a = M.asis?.[prefijo(cod)]?.procesos?.[cod];
        return a ? JSON.stringify({ ...cab, version: "As-Is", ...a }) : `El proceso ${cod} no tiene As-Is redactado.`;
      }
      const t = await tobeVigente(cod, ctx);
      if (!t) return `El proceso ${cod} no tiene To-Be redactado.`;
      if (input?.version_plataforma !== undefined && input?.version_plataforma !== null) {
        const n = Number(input.version_plataforma);
        if (n === 0) return JSON.stringify({ ...cab, version_flujo: "archivo original", flujo: t.orig.flujo });
        const f = await sb(`/rest/v1/flujos_tobe?proceso=eq.${encodeURIComponent(cod)}&version=eq.${n}&select=*`, { jwt: ctx.jwt });
        return f?.[0] ? JSON.stringify({ ...cab, version_flujo: n, autor: f[0].autor_nombre, fecha: f[0].creado_en, resumen: f[0].resumen, flujo: f[0].flujo })
                      : `No hay versión ${n} del flujo de ${cod} en la plataforma.`;
      }
      const flujoInfo = t.vigente
        ? { origen: "plataforma", version: t.vigente.version, autor: t.vigente.autor_nombre, fecha: t.vigente.creado_en, resumen: t.vigente.resumen }
        : { origen: "archivo del manual (sin cambios en la plataforma)" };
      return JSON.stringify({ ...cab, version: "To-Be", flujo_vigente: flujoInfo, ...t.proc });
    }

    if (nombre === "ver_estructura") {
      const t = await estructuraVigente(ctx);
      const E = t.datos;
      const origen = t.vigente
        ? `Versión ${t.vigente.version} de la plataforma (${t.vigente.autor_nombre}, ${String(t.vigente.creado_en).slice(0, 10)}: ${t.vigente.resumen})`
        : "El archivo del manual (sin cambios en la plataforma)";
      const permiso = ctx.estructura ? "Esta cuenta PUEDE proponer cambios a la estructura." : "Esta cuenta NO puede cambiar la estructura (le falta el interruptor «Puede cambiar la estructura»).";
      if (input?.unidad) {
        const l = indiceEstructura(E).get(String(input.unidad));
        if (!l) return `No existe la unidad «${input.unidad}». Usa ver_estructura sin argumentos para ver los ids.`;
        const comites = (E.COMITES ?? []).filter((c: any) => c.lidera === l.obj.id || (c.principal ?? []).includes(l.obj.id) || (c.ampliado ?? []).includes(l.obj.id))
          .map((c: any) => `${c.n} (${c.lidera === l.obj.id ? "lidera" : (c.principal ?? []).includes(l.obj.id) ? "principal" : "ampliado"})`);
        return JSON.stringify({ origen, cuelga_de: l.padre, comites, unidad: l.obj });
      }
      if (input?.seccion) {
        const sec = String(input.seccion);
        if (sec === "todo") return JSON.stringify({ origen, estructura: E });
        if (!(sec in E)) return `No hay una sección «${sec}». Secciones: ${Object.keys(E).join(", ")}.`;
        return JSON.stringify({ origen, [sec]: E[sec] });
      }
      return `${origen}. ${permiso}\n\n${resumenEstructura(E)}`;
    }

    if (nombre === "listar_procesos") {
      const M = await manual();
      const pref = input?.prefijo ? String(input.prefijo) : null;
      const filas: string[] = [];
      for (const m of M.datos?.macros ?? []) {
        if (pref && String(m.prefijo) !== pref) continue;
        filas.push(`## ${m.prefijo} ${m.n}`);
        for (const p of m.procesos ?? []) filas.push(`${p.codigo} · ${p.n}${p.mapa?.dueno ? ` — dueño: ${p.mapa.dueno}` : ""}`);
      }
      return filas.length ? filas.join("\n") : `No hay macroproceso "${pref}".`;
    }

    if (nombre === "ver_validacion") {
      const pc = encodeURIComponent(cod);
      const intento = async (f: () => Promise<any>) => { try { return await f(); } catch (e) { return { error: String((e as Error).message) }; } };
      const [estado, notas, actividad, versiones] = await Promise.all([
        intento(() => sb(`/rest/v1/v_estado_tobe?proceso=eq.${pc}&select=*`, { jwt: ctx.jwt })),
        intento(() => rpc("notas_publicadas_tobe", { p_proceso: cod }, ctx.jwt)),
        intento(() => sb(`/rest/v1/actividad_tobe?proceso=eq.${pc}&select=tipo,integrante,actor_nombre,detalle,creado_en&order=creado_en.desc&limit=60`, { jwt: ctx.jwt })),
        intento(() => sb(`/rest/v1/flujos_tobe?proceso=eq.${pc}&select=version,resumen,autor_nombre,creado_en,origen&order=version.desc`, { jwt: ctx.jwt })),
      ]);
      const notasCortas = Array.isArray(notas) ? notas.map((n: any) => ({
        autor: n.autor, seccion: n.seccion, tipo: n.tipo, actividad: n.ancla_id, n: n.ancla_n, sobre: n.ancla_texto,
        texto: n.texto, consulta_a: n.consulta_a, consulta_respuesta: n.consulta_respuesta,
        estado: n.estado, respuesta: n.respuesta, publicada: n.publicada_en,
      })) : notas;
      return JSON.stringify({ proceso: cod, estado: Array.isArray(estado) ? (estado[0] ?? "sin validaciones") : estado,
                              notas_publicadas: notasCortas, linea_de_tiempo: actividad, versiones_del_flujo: versiones });
    }

    if (nombre === "buscar_pasajes") {
      const filas = await rpc("buscar_fragmentos", { consulta: String(input?.consulta ?? ""), cod: input?.codigo || null, limite: 8 }, ctx.jwt);
      if (!filas?.length) return "Sin resultados (o la cuenta no tiene acceso al corpus). Prueba con otras palabras.";
      return filas.map((f: any) => `[${f.codigo} · ${f.entrevistado} · fragmento ${f.orden}]\n${f.contenido}`).join("\n\n---\n\n");
    }

    if (nombre === "leer_documento" || nombre === "leer_entrevista") {
      const doc = nombre === "leer_documento";
      const filas = doc
        ? await sb(`/rest/v1/fragmentos?codigo=eq.${encodeURIComponent(cod)}&activo=eq.true&select=entrevistado,contenido&order=orden`, { jwt: ctx.jwt })
        : await sb(`/rest/v1/entrevistas?codigo=eq.${encodeURIComponent(cod)}&select=codigo,entrevistado,cargo,fecha,dialogo`, { jwt: ctx.jwt });
      if (!filas?.length) return `No encontré "${cod}" o la cuenta no tiene acceso a ${doc ? "los documentos del corpus" : "las entrevistas"}.`;
      const texto = doc ? filas.map((f: any) => f.contenido).join("\n") : (filas[0].dialogo ?? "");
      const partes = Math.max(1, Math.ceil(texto.length / PARTE_CHARS));
      const p = Math.min(Math.max(Number(input?.parte ?? 1), 1), partes);
      return `${cod} — ${filas[0].entrevistado ?? ""} — parte ${p} de ${partes}:\n\n${texto.slice((p - 1) * PARTE_CHARS, p * PARTE_CHARS)}`;
    }
    return `Herramienta desconocida: ${nombre}`;
  } catch (e) {
    return `Error en ${nombre}: ${(e as Error).message}`;
  }
}

// ---------- Las conversaciones de la cuenta ----------
/** La conversación abierta en el chat (la «activa»), si sigue viva. */
async function sesionActiva(ctx: Ctx): Promise<string | null> {
  const filas = await sb(`/rest/v1/agente_sesiones?perfil_id=eq.${ctx.id}&activa=eq.true&select=session_id&order=ultimo_uso.desc&limit=1`);
  if (!filas?.[0]) return null;
  try {
    const s = await client.beta.sessions.retrieve(filas[0].session_id);
    if (s.status !== "terminated" && !s.archived_at) return s.id;
  } catch { /* la sesión ya no existe */ }
  await sb(`/rest/v1/agente_sesiones?session_id=eq.${filas[0].session_id}`, { method: "PATCH", body: JSON.stringify({ activa: false }) });
  return null;
}

/** La conversación que el navegador tiene en pantalla: tiene que ser de la cuenta y seguir viva. */
async function sesionPedida(ctx: Ctx, sid: string): Promise<string> {
  const fila = (await sb(`/rest/v1/agente_sesiones?session_id=eq.${encodeURIComponent(sid)}&perfil_id=eq.${ctx.id}&select=session_id`))?.[0];
  if (!fila) throw new Error("Esa conversación no es tuya o ya no existe.");
  const s = await client.beta.sessions.retrieve(sid).catch(() => null);
  if (!s || s.status === "terminated" || s.archived_at) throw new Error("Esa conversación ya terminó. Empieza una nueva.");
  return sid;
}

async function marcarActiva(ctx: Ctx, sid: string) {
  await sb(`/rest/v1/agente_sesiones?perfil_id=eq.${ctx.id}&activa=eq.true&session_id=neq.${encodeURIComponent(sid)}`, { method: "PATCH", body: JSON.stringify({ activa: false }) });
  await sb(`/rest/v1/agente_sesiones?session_id=eq.${encodeURIComponent(sid)}`, { method: "PATCH", body: JSON.stringify({ activa: true, ultimo_uso: new Date().toISOString() }) });
}

async function sesionNueva(ctx: Ctx): Promise<string> {
  const s = await client.beta.sessions.create({
    agent: AGENTE_ID,
    environment_id: ENTORNO_ID,
    title: `Manual · ${ctx.nombre}`,
    metadata: { perfil_id: ctx.id },
    budget: { type: "limit", max_list_cost: { amount: PRESUPUESTO_CENTAVOS, currency: "USD" } },
  });
  await sb(`/rest/v1/agente_sesiones?perfil_id=eq.${ctx.id}&activa=eq.true`, { method: "PATCH", body: JSON.stringify({ activa: false }) });
  await sb(`/rest/v1/agente_sesiones`, { method: "POST", body: JSON.stringify({ perfil_id: ctx.id, session_id: s.id }) });
  return s.id;
}

/** Cerrojo: reserva la conversación para esta llamada. false si otra la está atendiendo. */
async function tomar(sid: string): Promise<boolean> {
  const ahora = new Date().toISOString(), hasta = new Date(Date.now() + TURNO_MS + 15_000).toISOString();
  const f = await sb(`/rest/v1/agente_sesiones?session_id=eq.${encodeURIComponent(sid)}&or=(bombeando_hasta.is.null,bombeando_hasta.lt.${encodeURIComponent(ahora)})`, {
    method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify({ bombeando_hasta: hasta, ultimo_uso: ahora }) });
  return !!f?.length;
}
const soltar = (sid: string) =>
  sb(`/rest/v1/agente_sesiones?session_id=eq.${encodeURIComponent(sid)}`, { method: "PATCH", body: JSON.stringify({ bombeando_hasta: null }) }).catch(() => {});

async function propuestaPendiente(sid: string) {
  const f = await sb(`/rest/v1/agente_propuestas?session_id=eq.${sid}&estado=eq.pendiente&select=*&order=creado_en.desc&limit=1`);
  return f?.[0] ?? null;
}

function textoDe(content: any[] | undefined) {
  return (content ?? []).filter((b) => b?.type === "text").map((b) => b.text).join("");
}

async function transcripcion(sid: string) {
  const evs: any[] = [];
  for await (const ev of client.beta.sessions.events.list(sid)) evs.push(ev);
  const props = await sb(`/rest/v1/agente_propuestas?session_id=eq.${sid}&select=id,tipo,proceso,resumen,estado,motivo,flujo,cambios`);
  // La estructura entera (~70 KB) solo viaja para la propuesta que espera decisión.
  for (const p of props ?? []) {
    if (p.tipo === "estructura" && p.estado === "pendiente") {
      p.datos = (await sb(`/rest/v1/agente_propuestas?id=eq.${encodeURIComponent(p.id)}&select=datos`))?.[0]?.datos;
    }
  }
  const porId: Record<string, any> = {};
  (props ?? []).forEach((p: any) => { porId[p.id] = p; });
  const out: any[] = [];
  for (const ev of evs) {
    if (ev.type === "user.message") out.push({ rol: "usuario", x: textoDe(ev.content) });
    else if (ev.type === "agent.message") out.push({ rol: "agente", x: textoDe(ev.content) });
    else if (ev.type === "agent.custom_tool_use" && (ev.name === "proponer_flujo" || ev.name === "proponer_estructura") && porId[ev.id]) {
      const p = porId[ev.id];
      out.push({ rol: "propuesta", tipo: p.tipo, id: p.id, proceso: p.proceso, resumen: p.resumen, estado: p.estado, motivo: p.motivo,
                 cambios: p.cambios ?? undefined, datos: p.datos ?? undefined,
                 flujo: p.estado === "pendiente" ? p.flujo : undefined });
    }
  }
  const ultimo = [...evs].reverse().find((e) => e.type?.startsWith("session.status_"));
  return { mensajes: out.slice(-200), recortada: out.length > 200, ocupado: ultimo?.type === "session.status_running" };
}

// ---------- El bombeo de eventos de un turno ----------
type Emit = (o: unknown) => void;
const resultado = (id: string, texto: string, error = false) => ({
  type: "user.custom_tool_result" as const, custom_tool_use_id: id, is_error: error,
  content: [{ type: "text" as const, text: texto }],
});

/** Atiende una llamada a herramienta. Devuelve "espera" si queda una propuesta en manos de la persona. */
async function atender(sid: string, ev: any, ctx: Ctx, emit: Emit): Promise<"ok" | "espera"> {
  if (ev.name !== "proponer_flujo" && ev.name !== "proponer_estructura") {
    emit({ t: "herramienta", nombre: ev.name, codigo: ev.input?.codigo ?? null });
    const r = await ejecutar(ev.name, ev.input, ctx);
    await client.beta.sessions.events.send(sid, { events: [resultado(ev.id, r, r.startsWith("Error en "))] });
    return "ok";
  }
  try {
    return ev.name === "proponer_estructura" ? await atenderEstructura(sid, ev, ctx, emit) : await atenderPropuesta(sid, ev, ctx, emit);
  } catch (e) {
    // Sin respuesta, la herramienta quedaría pendiente y bloquearía la conversación para siempre.
    await client.beta.sessions.events.send(sid, { events: [resultado(ev.id, `No se pudo procesar la propuesta: ${(e as Error).message}`, true)] });
    return "ok";
  }
}

const textoResuelta = (ya: any) => ya.estado === "aplicada"
  ? "Aplicado: la persona aplicó la propuesta."
  : `La persona descartó la propuesta.${ya.motivo ? " Dijo: «" + ya.motivo + "»" : ""}`;

/** Una propuesta de cambio a la estructura: aplica las operaciones, valida y la deja en manos de la persona. */
async function atenderEstructura(sid: string, ev: any, ctx: Ctx, emit: Emit): Promise<"ok" | "espera"> {
  const enviar = (texto: string, error = false) => client.beta.sessions.events.send(sid, { events: [resultado(ev.id, texto, error)] });
  const ya = (await sb(`/rest/v1/agente_propuestas?id=eq.${encodeURIComponent(ev.id)}&select=*`))?.[0];
  if (ya?.estado === "pendiente") {
    emit({ t: "propuesta", tipo: "estructura", id: ya.id, resumen: ya.resumen, cambios: ya.cambios ?? [], datos: ya.datos });
    return "espera";
  }
  if (ya) { await enviar(textoResuelta(ya)); return "ok"; }
  if (!ctx.estructura) {
    await enviar("Esta cuenta NO puede cambiar la estructura: le falta el interruptor «Puede cambiar la estructura» en el módulo Usuarios. " +
                 "Explícale a la persona qué cambiarías y sugiérele pedírselo a quien tenga ese permiso.", true);
    return "ok";
  }
  const t = await estructuraVigente(ctx);
  let r: { datos: any; cambios: string[] };
  try { r = aplicarOps(t.datos, ev.input?.operaciones); }
  catch (e) {
    emit({ t: "herramienta", nombre: "proponer_estructura", corrigiendo: true });
    await enviar(`La propuesta no se pudo aplicar y NO se mostró a la persona. ${(e as Error).message} Corrige y vuelve a proponer.`, true);
    return "ok";
  }
  const errores = validarEstructura(r.datos, t.orig);
  if (errores.length) {
    emit({ t: "herramienta", nombre: "proponer_estructura", corrigiendo: true });
    await enviar("La estructura resultante no pasó la validación y NO se mostró a la persona. Corrige y vuelve a proponer:\n- " + errores.join("\n- "), true);
    return "ok";
  }
  const resumen = String(ev.input?.resumen ?? "").trim().slice(0, 2000) || "Cambio de la estructura organizativa.";
  await sb(`/rest/v1/agente_propuestas`, { method: "POST", body: JSON.stringify({
    id: ev.id, session_id: sid, perfil_id: ctx.id, tipo: "estructura", datos: r.datos, operaciones: ev.input?.operaciones,
    cambios: r.cambios, resumen, base: huella(t.datos),
  }) });
  if (t.archivoCambio) emit({ t: "aviso", x: "El archivo de la estructura cambió después de la última versión de la plataforma: la propuesta parte del archivo." });
  emit({ t: "propuesta", tipo: "estructura", id: ev.id, resumen, cambios: r.cambios, datos: r.datos });
  return "espera";
}

async function atenderPropuesta(sid: string, ev: any, ctx: Ctx, emit: Emit): Promise<"ok" | "espera"> {
  const ya = (await sb(`/rest/v1/agente_propuestas?id=eq.${encodeURIComponent(ev.id)}&select=*`))?.[0];
  if (ya?.estado === "pendiente") {
    emit({ t: "propuesta", id: ya.id, proceso: ya.proceso, resumen: ya.resumen, flujo: ya.flujo });
    return "espera";
  }
  if (ya) {   // ya resuelta pero sin resultado enviado (la función se cortó a medias)
    await client.beta.sessions.events.send(sid, { events: [resultado(ev.id, ya.estado === "aplicada"
      ? "Aplicado: la persona aplicó la propuesta." : `La persona descartó la propuesta.${ya.motivo ? " Dijo: «" + ya.motivo + "»" : ""}`)] });
    return "ok";
  }
  const cod = String(ev.input?.codigo ?? "").trim();
  const t = await tobeVigente(cod, ctx).catch(() => null);
  if (!t) {
    await client.beta.sessions.events.send(sid, { events: [resultado(ev.id, `El proceso "${cod}" no tiene To-Be en el manual.`, true)] });
    return "ok";
  }
  const flujo = { ...(t.proc.flujo ?? {}), actividades: ev.input?.actividades, diagrama: ev.input?.diagrama };
  const errores = validarFlujo(flujo);
  if (errores.length) {
    emit({ t: "herramienta", nombre: "proponer_flujo", codigo: cod, corrigiendo: true });
    await client.beta.sessions.events.send(sid, { events: [resultado(ev.id,
      "La propuesta no pasó la validación y NO se mostró a la persona. Corrige y vuelve a proponer:\n- " + errores.join("\n- "), true)] });
    return "ok";
  }
  const resumen = String(ev.input?.resumen ?? "").trim().slice(0, 2000) || "Cambio del flujo de actividades.";
  await sb(`/rest/v1/agente_propuestas`, { method: "POST", body: JSON.stringify({
    id: ev.id, session_id: sid, perfil_id: ctx.id, proceso: cod, flujo, resumen, base: huella(t.proc),
  }) });
  if (t.archivoCambio) emit({ t: "aviso", x: `El archivo del manual cambió después de la última versión de ${cod} en la plataforma: la propuesta parte del archivo.` });
  emit({ t: "propuesta", id: ev.id, proceso: cod, resumen, flujo });
  return "espera";
}

/**
 * Lleva un turno: abre el stream, atiende lo que quedó pendiente, manda lo que
 * trae `antes` (el mensaje o la respuesta a una propuesta) y reenvía los eventos
 * al navegador hasta que el agente termina, espera una decisión o se acaba el
 * tiempo de la función. `resuelve` es la propuesta que `antes` contesta.
 */
async function bombear(sid: string, ctx: Ctx, emit: Emit, antes?: () => Promise<void>, resuelve?: string) {
  const fin = Date.now() + TURNO_MS;
  // Primero el stream (no repite lo que pasó antes de abrirlo), luego la historia.
  const stream = await client.beta.sessions.events.stream(sid, { event_deltas: ["agent.message"] });
  const vistos = new Set<string>();
  const historia: any[] = [];
  for await (const ev of client.beta.sessions.events.list(sid)) { historia.push(ev); vistos.add(ev.id); }
  const contestadas = new Set(historia.filter((e) => e.type === "user.custom_tool_result").map((e) => e.custom_tool_use_id));
  const pendientes = historia.filter((e) => e.type === "agent.custom_tool_use" && !contestadas.has(e.id) && e.id !== resuelve);

  // Lo que quedó sin contestar (la función se cortó a medias) va antes que el mensaje nuevo:
  // con una herramienta pendiente, la sesión no acepta un user.message.
  for (const ev of pendientes) {
    if (await atender(sid, ev, ctx, emit) === "espera") { stream.controller.abort(); return; }
  }
  if (antes) await antes();
  if (!antes && !pendientes.length) {
    const ultimo = [...historia].reverse().find((e) => e.type?.startsWith("session.status_"));
    if (ultimo && ultimo.type !== "session.status_running" && ultimo.type !== "session.status_rescheduled") {
      emit({ t: "fin" }); stream.controller.abort(); return;
    }
  }

  const reloj = setTimeout(() => stream.controller.abort(), Math.max(1_000, fin - Date.now()));
  try {
    for await (const ev of stream as AsyncIterable<any>) {
      if (ev.type === "event_start") { if (ev.event?.type === "agent.message") emit({ t: "inicio", id: ev.event.id }); continue; }
      if (ev.type === "event_delta") { emit({ t: "delta", id: ev.event_id, x: ev.delta?.content?.text ?? "" }); continue; }
      if (ev.id && vistos.has(ev.id)) continue;
      if (ev.id) vistos.add(ev.id);
      switch (ev.type) {
        case "agent.message": emit({ t: "mensaje", id: ev.id, x: textoDe(ev.content) }); break;
        case "agent.thinking": emit({ t: "pensando" }); break;
        case "agent.custom_tool_use":
          if (await atender(sid, ev, ctx, emit) === "espera") return;
          break;
        case "session.error": emit({ t: "aviso", x: ev.error?.message ?? "Error del agente; reintentando." }); break;
        case "session.status_terminated":
          await sb(`/rest/v1/agente_sesiones?session_id=eq.${sid}`, { method: "PATCH", body: JSON.stringify({ activa: false }) });
          emit({ t: "fin", terminada: true }); return;
        case "session.status_idle": {
          const r = ev.stop_reason?.type;
          if (r === "requires_action") break;   // la atendemos con su agent.custom_tool_use
          if (r === "budget_reached") emit({ t: "error", x: "Esta conversación llegó a su tope de gasto (USD 10). Empieza una conversación nueva." });
          else if (r === "retries_exhausted") emit({ t: "error", x: "El agente no pudo completar el turno. Vuelve a intentarlo." });
          else if (r === "refusal") emit({ t: "error", x: "El agente no puede responder a eso." });
          emit({ t: "fin" }); return;
        }
      }
    }
  } catch (e) {
    if (Date.now() >= fin - 500) { emit({ t: "seguir" }); return; }
    throw e;
  } finally {
    clearTimeout(reloj);
    stream.controller.abort();
  }
  emit({ t: "seguir" });   // el stream se cerró sin terminar el turno: el navegador retoma
}

// ---------- Servidor ----------
function json(o: unknown, status = 200) {
  return new Response(JSON.stringify(o), { status, headers: { ...CORS, "Content-Type": "application/json; charset=utf-8" } });
}

// Lo que manda el navegador se sanea: viaja como contexto privilegiado (system.message) y no
// debe poder cambiar quién escribe ni colar instrucciones. Quién escribe sale de la sesión.
function contextoPagina(ctx: Ctx, pagina: any) {
  const limpio = (x: unknown, n: number) => String(x ?? "").replace(/[\u0000-\u001f«»\[\]]+/g, " ").replace(/\s+/g, " ").trim().slice(0, n);
  const proceso = /^\d{1,2}\.\d{1,2}$/.test(String(pagina?.proceso ?? "")) ? String(pagina.proceso) : "";
  const vista = pagina?.vista === "asis" ? "As-Is" : "To-Be";
  const titulo = limpio(pagina?.titulo, 120);
  const ruta = /^#\/[\w./-]{0,60}$/.test(String(pagina?.ruta ?? "")) ? String(pagina.ruta) : "";
  const unidad = /^[a-z0-9][a-z0-9-]{0,39}$/.test(String(pagina?.unidad ?? "")) ? String(pagina.unidad) : "";
  const donde = pagina?.vista === "estructura"
    ? `la estructura organizativa To-Be${unidad ? ` con la unidad «${unidad}» abierta` : ""}`
    : proceso ? `el ${vista} del proceso ${proceso}${titulo ? ` («${titulo}»)` : ""}` : (titulo ? `la página «${titulo}»` : "otra página del manual");
  return `Desde este mensaje escribe ${ctx.nombre}${ctx.rol ? ` (${ctx.rol})` : ""}. En el manual tiene abierto ${donde}${ruta ? ` [${ruta}]` : ""}. ` +
         `Si habla de «este proceso», se refiere a ese. Fecha: ${new Date().toISOString().slice(0, 10)}.`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);
  const quien = await identificar(req);
  if (!quien || quien.clase !== "usuario") return noAutorizado(CORS);
  const jwt = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "").trim();

  let acceso: any, perfil: any;
  try {
    [acceso, perfil] = await Promise.all([rpc("mi_agente", {}, jwt), rpc("mi_acceso", {}, jwt)]);
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
  if (!acceso?.puede) {
    return json({ error: acceso?.encendido === false ? "El agente está apagado para toda la plataforma." : "Tu cuenta no tiene el agente activado." }, 403);
  }
  const ctx: Ctx = { jwt, id: quien.id, nombre: perfil?.nombre || quien.correo, rol: perfil?.rol_nombre || "", estructura: !!acceso?.estructura };

  let body: any = {};
  try { body = await req.json(); } catch { /* vacío */ }
  const accion = String(body?.accion ?? "");

  try {
    if (accion === "estado") {
      const sid = await sesionActiva(ctx);
      if (!sid) return json({ puede: true, sesion: null, mensajes: [], ocupado: false });
      const fila = (await sb(`/rest/v1/agente_sesiones?session_id=eq.${sid}&select=titulo`))?.[0];
      return json({ puede: true, sesion: sid, titulo: fila?.titulo ?? null, ...(await transcripcion(sid)) });
    }
    if (accion === "conversaciones") {
      const filas = await sb(`/rest/v1/agente_sesiones?perfil_id=eq.${ctx.id}&select=session_id,titulo,activa,creado_en,ultimo_uso&order=ultimo_uso.desc&limit=60`);
      return json({ conversaciones: filas ?? [] });
    }
    if (accion === "abrir") {
      const sid = String(body.session_id ?? "");
      const fila = (await sb(`/rest/v1/agente_sesiones?session_id=eq.${encodeURIComponent(sid)}&perfil_id=eq.${ctx.id}&select=session_id,titulo`))?.[0];
      if (!fila) return json({ error: "Esa conversación no es tuya o ya no existe." }, 404);
      let cerrada = false;
      try {
        const s = await client.beta.sessions.retrieve(sid);
        cerrada = s.status === "terminated" || !!s.archived_at;
      } catch { cerrada = true; }
      // Una sola abierta por cuenta: la elegida. Una terminada se puede leer, no retomar, y no cambia la abierta.
      if (!cerrada) await marcarActiva(ctx, sid);
      let t: any = { mensajes: [], ocupado: false };
      try { t = await transcripcion(sid); } catch (e) { t.error = (e as Error).message; }
      return json({ puede: true, sesion: cerrada ? null : sid, titulo: fila.titulo, cerrada, ...t });
    }
    if (accion === "nueva") {
      await sb(`/rest/v1/agente_sesiones?perfil_id=eq.${ctx.id}&activa=eq.true`, { method: "PATCH", body: JSON.stringify({ activa: false }) });
      return json({ ok: true });
    }
    if (!["enviar", "resolver", "seguir"].includes(accion)) return json({ error: "Acción desconocida." }, 400);
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }

  const enc = new TextEncoder();
  const cuerpo = new ReadableStream({
    async start(ctrl) {
      const emit: Emit = (o) => { try { ctrl.enqueue(enc.encode(`data: ${JSON.stringify(o)}\n\n`)); } catch { /* cerrado */ } };
      let sid: string | null = null, tomada = false;
      try {
        // La propuesta manda su conversación; enviar y seguir, la que el navegador tiene en pantalla.
        let p: any = null;
        if (accion === "resolver") {
          p = (await sb(`/rest/v1/agente_propuestas?id=eq.${encodeURIComponent(String(body.propuesta_id))}&perfil_id=eq.${ctx.id}&select=*`))?.[0];
          if (!p) { emit({ t: "error", x: "Esa propuesta no existe." }); return; }
          sid = await sesionPedida(ctx, p.session_id);
        } else if (body.session_id) {
          sid = await sesionPedida(ctx, String(body.session_id));
        } else if (accion === "enviar") {
          sid = await sesionNueva(ctx);
        } else { emit({ t: "error", x: "No hay una conversación abierta." }); return; }

        if (!(tomada = await tomar(sid))) {
          emit({ t: "ocupada", x: "Esta conversación está trabajando en otra pestaña o ventana. Espera un momento." });
          return;
        }
        await marcarActiva(ctx, sid);
        emit({ t: "sesion", id: sid });

        if (accion === "seguir") { await bombear(sid, ctx, emit); return; }

        if (accion === "resolver") {
          // Reclamar la propuesta de forma atómica: un doble «Aplicar» no publica dos versiones.
          const motivo = body.aprobar ? null : (String(body.motivo ?? "").trim().slice(0, 2000) || null);
          const ahora = new Date().toISOString();
          const reclamada = await sb(`/rest/v1/agente_propuestas?id=eq.${encodeURIComponent(p.id)}&estado=eq.pendiente`, {
            method: "PATCH", headers: { Prefer: "return=representation" },
            body: JSON.stringify({ estado: body.aprobar ? "aplicada" : "rechazada", motivo, resuelto_en: ahora }) });
          if (!reclamada?.length) { emit({ t: "error", x: "Esa propuesta ya se resolvió." }); return; }
          const marcar = (o: unknown) => sb(`/rest/v1/agente_propuestas?id=eq.${encodeURIComponent(p.id)}`, { method: "PATCH", body: JSON.stringify(o) });
          let texto: string, error = false;
          if (body.aprobar && p.tipo === "estructura") {
            const t = await estructuraVigente(ctx).catch(() => null);
            if (!ctx.estructura) {
              await marcar({ estado: "rechazada", motivo: "La cuenta ya no puede cambiar la estructura." });
              emit({ t: "conflicto", id: p.id, x: "Tu cuenta ya no tiene el permiso para cambiar la estructura: no se publicó." });
              texto = "NO se publicó: la cuenta ya no tiene el interruptor «Puede cambiar la estructura»."; error = true;
            } else if (!t || huella(t.datos) !== p.base) {
              await marcar({ estado: "rechazada", motivo: "La estructura cambió después de la propuesta; no se publicó." });
              emit({ t: "conflicto", id: p.id, x: "La estructura cambió después de esta propuesta, así que no se publicó. El agente la rehace sobre la vigente." });
              texto = "NO se publicó: la estructura cambió después de tu propuesta (otra versión publicada o un cambio del archivo). " +
                      "Vuelve a leerla con ver_estructura y propón de nuevo sobre la vigente, conservando lo que la persona pidió.";
              error = true;
            } else {
              try {
                const v = await sb(`/rest/v1/estructura_tobe`, {
                  method: "POST", headers: { Prefer: "return=representation" },
                  body: JSON.stringify({ datos: p.datos, resumen: p.resumen, cambios: p.cambios ?? [], operaciones: p.operaciones,
                                         base: p.base, base_version: t.ultima, archivo: huella(t.orig), propuesta_id: p.id, autor: ctx.id }),
                });
                const ver = v?.[0]?.version;
                emit({ t: "aplicado", id: p.id, tipo: "estructura", version: ver });
                texto = `Aplicado: ${ctx.nombre} aplicó la propuesta. Quedó publicada como versión ${ver} de la estructura y el manual ya la muestra.`;
              } catch (e) {
                await marcar({ estado: "rechazada", motivo: `No se pudo publicar: ${(e as Error).message}`.slice(0, 2000) });
                const conflicto = /conflicto/.test((e as Error).message);
                texto = conflicto
                  ? "NO se publicó: alguien publicó otra versión mientras se aplicaba. Vuelve a leer lo vigente y propón de nuevo sobre eso."
                  : `No se pudo publicar: ${(e as Error).message}`;
                error = true;
                emit({ t: "conflicto", id: p.id, x: conflicto ? "Alguien publicó otra versión mientras se aplicaba: no se publicó. El agente la rehace sobre la vigente." : texto });
              }
            }
          } else if (body.aprobar) {
            const t = await tobeVigente(p.proceso, ctx).catch(() => null);
            if (!t || huella(t.proc) !== p.base) {
              // Otro publicó (o el manual cambió) después de la propuesta: aplicarla borraría ese cambio.
              await marcar({ estado: "rechazada", motivo: "El flujo cambió después de la propuesta; no se publicó." });
              emit({ t: "conflicto", id: p.id, x: `El flujo de ${p.proceso} cambió después de esta propuesta, así que no se publicó. El agente la rehace sobre el vigente.` });
              texto = `NO se publicó: el flujo de ${p.proceso} cambió después de tu propuesta (otra versión publicada o un cambio del manual). ` +
                      `Vuelve a leerlo con ver_proceso y propón de nuevo sobre el vigente, conservando lo que la persona pidió.`;
              error = true;
            } else {
              try {
                const v = await sb(`/rest/v1/flujos_tobe`, {
                  method: "POST", headers: { Prefer: "return=representation" },
                  body: JSON.stringify({ proceso: p.proceso, flujo: p.flujo, resumen: p.resumen, base: p.base, base_version: t.ultima,
                                         archivo: huella(t.orig), origen: "agente", propuesta_id: p.id, autor: ctx.id }),
                });
                const ver = v?.[0]?.version;
                await marcar({ flujo_id: v?.[0]?.id });
                emit({ t: "aplicado", id: p.id, proceso: p.proceso, version: ver });
                texto = `Aplicado: ${ctx.nombre} aplicó la propuesta. Quedó publicada como versión ${ver} del flujo de ${p.proceso} y el manual ya la muestra.`;
              } catch (e) {
                await marcar({ estado: "rechazada", motivo: `No se pudo publicar: ${(e as Error).message}`.slice(0, 2000) });
                const conflicto = /conflicto/.test((e as Error).message);
                texto = conflicto
                  ? "NO se publicó: alguien publicó otra versión mientras se aplicaba. Vuelve a leer lo vigente y propón de nuevo sobre eso."
                  : `No se pudo publicar: ${(e as Error).message}`;
                error = true;
                emit({ t: "conflicto", id: p.id, x: conflicto ? "Alguien publicó otra versión mientras se aplicaba: no se publicó. El agente la rehace sobre la vigente." : texto });
              }
            }
          } else {
            texto = `La persona descartó la propuesta y no cambió nada.${motivo ? ` Dijo: «${motivo}»` : " Pregúntale qué ajustar."}`;
          }
          await bombear(sid, ctx, emit, () => client.beta.sessions.events.send(sid!, { events: [resultado(p.id, texto, error)] }).then(() => {}), p.id);
          return;
        }

        // enviar
        const texto = String(body.texto ?? "").trim().slice(0, 8000);
        if (!texto) { emit({ t: "error", x: "El mensaje está vacío." }); return; }
        // La conversación toma por título el comienzo de su primer mensaje.
        const titulo = texto.replace(/\s+/g, " ").slice(0, 80) + (texto.length > 80 ? "…" : "");
        const conTitulo = await sb(`/rest/v1/agente_sesiones?session_id=eq.${sid}&titulo=is.null`, {
          method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify({ titulo }) });
        if (conTitulo?.length) emit({ t: "titulo", x: titulo });
        // El contexto de la página viaja solo cuando cambia: cada system.message queda para el resto de la sesión.
        const contexto = contextoPagina(ctx, body.pagina);
        const previo = (await sb(`/rest/v1/agente_sesiones?session_id=eq.${sid}&select=ultimo_contexto`))?.[0]?.ultimo_contexto;
        const sistema = contexto !== previo ? [{ type: "system.message" as const, content: [{ type: "text" as const, text: contexto }] }] : [];
        const guardarContexto = () => sb(`/rest/v1/agente_sesiones?session_id=eq.${sid}`, { method: "PATCH", body: JSON.stringify({ ultimo_contexto: contexto }) });
        const pend = await propuestaPendiente(sid);
        if (pend) {
          // Escribir con una propuesta abierta la descarta: el mensaje viaja como respuesta a la propuesta.
          const r = await sb(`/rest/v1/agente_propuestas?id=eq.${encodeURIComponent(pend.id)}&estado=eq.pendiente`, { method: "PATCH",
            headers: { Prefer: "return=representation" }, body: JSON.stringify({ estado: "rechazada", motivo: texto.slice(0, 2000), resuelto_en: new Date().toISOString() }) });
          if (r?.length) {
            emit({ t: "descartada", id: pend.id });
            await bombear(sid, ctx, emit, () => client.beta.sessions.events.send(sid!, { events: [
              resultado(pend.id, `La persona no aplicó la propuesta y, en su lugar, escribió: «${texto}»`), ...sistema,
            ] }).then(guardarContexto).then(() => {}), pend.id);
            return;
          }
        }
        await bombear(sid, ctx, emit, () => client.beta.sessions.events.send(sid!, { events: [
          { type: "user.message", content: [{ type: "text", text: texto }] }, ...sistema,
        ] }).then(guardarContexto).then(() => {}));
      } catch (e) {
        emit({ t: "error", x: (e as Error).message || String(e) });
      } finally {
        if (sid && tomada) await soltar(sid);
        try { ctrl.close(); } catch { /* ya cerrado */ }
      }
    },
  });
  return new Response(cuerpo, { headers: { ...CORS, "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache" } });
});
