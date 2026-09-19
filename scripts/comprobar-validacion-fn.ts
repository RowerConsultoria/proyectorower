// ============================================================
// Proyecto Rower — comprobaciones de la Edge Function `validacion`
//
// Hermana de `comprobar-ficha.ts` y con el mismo truco: en vez de hablar con
// Supabase le pone a la función un `fetch` falso con datos en memoria, le
// captura el handler y le habla por HTTP. Sin credenciales.
//
// Cubre las tres muertes del token —revocado, vencido, titular de baja— y,
// sobre todo, que **no se pierda lo que escribe un gerente**: la validación se
// guarda igual que la ficha de perfil (el cliente manda el objeto entero y el
// servidor lo reemplaza), así que corre los mismos riesgos que allí costaron
// 73 periodos borrados y 48 fichas mal contadas.
//
// Correr:  deno test --allow-env --allow-read scripts/comprobar-validacion-fn.ts
//
// Se puede apuntar a otra copia con VALIDACION_TS, para comprobar que estas
// pruebas SÍ fallan contra una versión anterior:
//   git show HEAD:supabase/functions/validacion/index.ts > /tmp/antes.ts
//   VALIDACION_TS="file:///tmp/antes.ts" deno test --allow-env --allow-read …
// ============================================================

const RUTA = Deno.env.get("VALIDACION_TS") ??
  new URL("../supabase/functions/validacion/index.ts", import.meta.url).href;

Deno.env.set("SUPABASE_URL", "https://falso.supabase.co");
Deno.env.set("SUPABASE_SERVICE_ROLE_KEY", "clave-de-servicio-falsa");

const AYER = new Date(Date.now() - 86400e3).toISOString();
const MANANA = new Date(Date.now() + 86400e3).toISOString();

type Fila = Record<string, unknown>;

let personal: Fila[];
let tokens: Fila[];
let procesos: Fila[];
let asignaciones: Fila[];
let validaciones: Fila[];

function sembrar() {
  personal = [
    { id: "p-ana", nombre: "Ana Rojas", pais: "Panamá", entidad: "Kenex", area: "Ventas", cargo: "Gerente", gerente_id: null, activo: true },
    { id: "p-luis", nombre: "Luis Pérez", pais: "Panamá", entidad: "Kenex", area: "Ventas", cargo: "Supervisor", gerente_id: "p-ana", activo: true },
    { id: "p-jose", nombre: "José Silva", pais: "Venezuela", entidad: "Deltadir", area: "Finanzas", cargo: "Contralor", gerente_id: null, activo: false },
  ];
  tokens = [
    { id: "t1", token: "tk-ana", tipo: "individual", persona_id: "p-ana", expira_en: MANANA, revocado: false, usos: 0 },
    { id: "t2", token: "tk-ana-ger", tipo: "gerente", persona_id: "p-ana", expira_en: MANANA, revocado: false, usos: 0 },
    { id: "t3", token: "tk-jose", tipo: "individual", persona_id: "p-jose", expira_en: MANANA, revocado: false, usos: 0 },
    { id: "t4", token: "tk-revocado", tipo: "individual", persona_id: "p-ana", expira_en: MANANA, revocado: true, usos: 0 },
    { id: "t5", token: "tk-vencido", tipo: "individual", persona_id: "p-ana", expira_en: AYER, revocado: false, usos: 0 },
  ];
  procesos = [
    { codigo: "9.1", macro: "9", macro_nombre: "Ventas Retail", nombre: "Apertura de tienda", madurez: "media", orden: 1, contenido: { x: 1 } },
    { codigo: "9.2", macro: "9", macro_nombre: "Ventas Retail", nombre: "Cierre de caja", madurez: "alta", orden: 2, contenido: { x: 2 } },
    { codigo: "3.1", macro: "3", macro_nombre: "Finanzas", nombre: "Pago a proveedores", madurez: "baja", orden: 3, contenido: { x: 3 } },
  ];
  asignaciones = [
    { id: "a1", proceso: "9.1", persona_id: "p-ana", origen: "confirmado" },
    { id: "a2", proceso: "9.2", persona_id: "p-ana", origen: "auto" },      // propuesta: NO abre nada
    { id: "a3", proceso: "3.1", persona_id: "p-luis", origen: "manual" },
    { id: "a4", proceso: "9.1", persona_id: "p-jose", origen: "confirmado" },
  ];
  validaciones = [];
}

/** Recorta al `select=` pedido, como PostgREST. Sin esto, el doble no prueba. */
function proyectar(filas: Fila[], select: string | null): Fila[] {
  if (!select || select === "*") return filas;
  const cols = select.split(",").map((c) => c.trim()).filter(Boolean);
  return filas.map((f) => Object.fromEntries(cols.filter((c) => c in f).map((c) => [c, f[c]])));
}

function respuesta(cuerpo: unknown, status = 200): Response {
  if (status === 204) return new Response(null, { status });
  return new Response(JSON.stringify(cuerpo), { status, headers: { "Content-Type": "application/json" } });
}

function enLista(qs: URLSearchParams, campo: string): string[] | null {
  const v = qs.get(campo);
  if (!v?.startsWith("in.")) return null;
  return v.slice(4, -1).split(",").map((x) => decodeURIComponent(x));
}

globalThis.fetch = ((entrada: string | URL | Request, init: RequestInit = {}) => {
  const url = new URL(String(entrada));
  const qs = url.searchParams;
  const tabla = url.pathname.replace("/rest/v1/", "");
  const metodo = (init.method || "GET").toUpperCase();

  if (metodo !== "GET") {
    if (tabla === "validacion_tokens") {
      const id = qs.get("id")?.replace("eq.", "");
      const t = tokens.find((x) => x.id === id);
      if (t) Object.assign(t, JSON.parse(String(init.body)));
      return Promise.resolve(respuesta(null, 204));
    }
    if (tabla === "validaciones") {
      for (const e of JSON.parse(String(init.body)) as Fila[]) {
        const prev = validaciones.find((v) => v.proceso === e.proceso && v.persona_id === e.persona_id);
        if (prev) Object.assign(prev, e);
        else validaciones.push({ estado: "pendiente", ...e });
      }
      return Promise.resolve(respuesta(null, 201));
    }
    return Promise.resolve(respuesta({ message: "tabla inesperada: " + tabla }, 400));
  }

  if (tabla === "validacion_tokens") {
    const tk = qs.get("token")?.replace("eq.", "");
    return Promise.resolve(respuesta(tokens.filter((t) => t.token === decodeURIComponent(tk ?? ""))));
  }
  if (tabla === "personal") {
    let f = personal.slice();
    const id = qs.get("id");
    if (id?.startsWith("eq.")) f = f.filter((p) => p.id === id.slice(3));
    const ids = enLista(qs, "id");
    if (ids) f = f.filter((p) => ids.includes(String(p.id)));
    const ger = qs.get("gerente_id")?.replace("eq.", "");
    if (ger) f = f.filter((p) => p.gerente_id === ger);
    if (qs.get("activo") === "eq.true") f = f.filter((p) => p.activo === true);
    return Promise.resolve(respuesta(proyectar(f, qs.get("select"))));
  }
  if (tabla === "procesos_validadores") {
    let f = asignaciones.slice();
    const ids = enLista(qs, "persona_id");
    if (ids) f = f.filter((a) => ids.includes(String(a.persona_id)));
    if (qs.get("origen") === "neq.auto") f = f.filter((a) => a.origen !== "auto");
    return Promise.resolve(respuesta(proyectar(f, qs.get("select"))));
  }
  if (tabla === "procesos_fase2") {
    let f = procesos.slice();
    const cod = qs.get("codigo");
    if (cod?.startsWith("eq.")) f = f.filter((p) => p.codigo === decodeURIComponent(cod.slice(3)));
    const cods = enLista(qs, "codigo");
    if (cods) f = f.filter((p) => cods.includes(String(p.codigo)));
    return Promise.resolve(respuesta(proyectar(f, qs.get("select"))));
  }
  if (tabla === "validaciones") {
    let f = validaciones.slice();
    const pr = qs.get("proceso");
    if (pr?.startsWith("eq.")) f = f.filter((v) => v.proceso === decodeURIComponent(pr.slice(3)));
    const prs = enLista(qs, "proceso");
    if (prs) f = f.filter((v) => prs.includes(String(v.proceso)));
    const pe = qs.get("persona_id");
    if (pe?.startsWith("eq.")) f = f.filter((v) => v.persona_id === pe.slice(3));
    const pes = enLista(qs, "persona_id");
    if (pes) f = f.filter((v) => pes.includes(String(v.persona_id)));
    return Promise.resolve(respuesta(proyectar(f, qs.get("select"))));
  }
  return Promise.resolve(respuesta({ message: "ruta inesperada: " + url.pathname }, 404));
}) as typeof fetch;

let handler: ((req: Request) => Response | Promise<Response>) | null = null;
// deno-lint-ignore no-explicit-any
(Deno as any).serve = (h: (req: Request) => Response | Promise<Response>) => {
  handler = h;
  return { finished: Promise.resolve(), shutdown: () => Promise.resolve(), addr: { transport: "tcp", hostname: "0", port: 0 }, ref() {}, unref() {} };
};

await import(RUTA);
if (!handler) throw new Error("la función no llamó a Deno.serve");

async function llamar(cuerpo: unknown): Promise<{ status: number; data: Record<string, unknown> }> {
  const r = await handler!(new Request("https://falso/validacion", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cuerpo),
  }));
  let data: Record<string, unknown> = {};
  try { data = await r.json(); } catch { /* sin cuerpo */ }
  return { status: r.status, data };
}

const TODAS = { proposito: "ok", dueno: "ok", disparador: "ok", flujo: "ok", riesgos: "ok", indicadores: "ok" };
function val() { return validaciones[0]; }
function coments() { return (val()?.comentarios ?? []) as Array<Record<string, unknown>>; }

// ============================================================
//  La puerta
// ============================================================
Deno.test("las tres muertes del token: revocado, vencido y titular de baja", async () => {
  sembrar();
  for (const [tk, esperado] of [["tk-revocado", 401], ["tk-vencido", 401], ["tk-que-no-existe", 401], ["", 401], ["tk-jose", 403]] as Array<[string, number]>) {
    const { status } = await llamar({ accion: "abrir", token: tk });
    if (status !== esperado) throw new Error(`${tk || "(vacío)"}: esperaba ${esperado}, dio ${status}`);
  }
});

Deno.test("una PROPUESTA del emparejador (origen=auto) no abre ningún proceso", async () => {
  sembrar();
  const { data } = await llamar({ accion: "abrir", token: "tk-ana" });
  const cods = (data.procesos as Fila[]).map((p) => p.codigo);
  if (JSON.stringify(cods) !== JSON.stringify(["9.1"])) {
    throw new Error("deberia ver solo 9.1 (9.2 es propuesta) -> " + JSON.stringify(cods));
  }
});

Deno.test("no se puede guardar un proceso fuera del enlace", async () => {
  sembrar();
  const { status } = await llamar({ accion: "guardar", token: "tk-ana", proceso: "3.1", veredictos: TODAS });
  if (status !== 403) throw new Error("esperaba 403, dio " + status);
  if (validaciones.length) throw new Error("escribio igualmente");
});

Deno.test("el enlace de equipo alcanza los procesos de un reporte directo", async () => {
  sembrar();
  const { status } = await llamar({ accion: "guardar", token: "tk-ana-ger", proceso: "3.1", veredictos: { proposito: "ok" } });
  if (status !== 200) throw new Error("esperaba 200, dio " + status);
  if (val().persona_id !== "p-luis") throw new Error("se la atribuyo a otro: " + val().persona_id);
});

Deno.test("el contenido pesado no viaja en la bandeja", async () => {
  sembrar();
  const { data } = await llamar({ accion: "abrir", token: "tk-ana" });
  if ((data.procesos as Fila[]).some((p) => "contenido" in p)) {
    throw new Error("abrir() mando el contenido de los manuales a la bandeja");
  }
  const c = await llamar({ accion: "cargar", token: "tk-ana", proceso: "9.1" });
  if (!(c.data.proceso as Fila).contenido) throw new Error("cargar() deberia traer el contenido");
});

// ============================================================
//  Que no se pierda lo que escribe el gerente
// ============================================================
Deno.test("la fecha de una observación NO se reescribe al volver a guardar", async () => {
  sembrar();
  const c1 = { seccion: "flujo", ancla: "a3", texto: "la actividad 3 no es así" };
  await llamar({ accion: "guardar", token: "tk-ana", proceso: "9.1", veredictos: { flujo: "observaciones" }, comentarios: [c1] });
  const fecha = String(coments()[0].creado_en);
  await new Promise((r) => setTimeout(r, 15));
  await llamar({
    accion: "guardar", token: "tk-ana", proceso: "9.1",
    veredictos: { flujo: "observaciones" },
    comentarios: [{ ...c1, creado_en: fecha }],
    base: { veredictos: { flujo: "observaciones" }, comentarios: [{ ...c1, creado_en: fecha }] },
  });
  if (String(coments()[0].creado_en) !== fecha) {
    throw new Error(`la reescribio: ${fecha} -> ${coments()[0].creado_en}`);
  }
});

Deno.test("corregir el texto de una observación conserva su fecha original", async () => {
  sembrar();
  const c1 = { seccion: "riesgos", ancla: null, texto: "falta el riesgo de robo" };
  await llamar({ accion: "guardar", token: "tk-ana", proceso: "9.1", veredictos: {}, comentarios: [c1] });
  const fecha = String(coments()[0].creado_en);
  await llamar({
    accion: "guardar", token: "tk-ana", proceso: "9.1", veredictos: {},
    comentarios: [{ ...c1, texto: "falta el riesgo de robo y el de merma", creado_en: fecha }],
    base: { veredictos: {}, comentarios: [{ ...c1, creado_en: fecha }] },
  });
  if (coments().length !== 1) throw new Error("duplico: " + JSON.stringify(coments()));
  if (!String(coments()[0].texto).includes("merma")) throw new Error("no guardo la correccion");
  if (String(coments()[0].creado_en) !== fecha) throw new Error("perdio la fecha original");
});

Deno.test("un guardado que no trae comentarios NO borra los que había", async () => {
  sembrar();
  await llamar({
    accion: "guardar", token: "tk-ana", proceso: "9.1", veredictos: { flujo: "observaciones" },
    comentarios: [{ seccion: "flujo", ancla: "a3", texto: "algo importante" }],
  });
  await llamar({ accion: "guardar", token: "tk-ana", proceso: "9.1", veredictos: { proposito: "ok" } });
  if (coments().length !== 1) throw new Error("los borro: " + JSON.stringify(coments()));
  const v = val().veredictos as Record<string, string>;
  if (v.flujo !== "observaciones" || v.proposito !== "ok") {
    throw new Error("no fundio los veredictos: " + JSON.stringify(v));
  }
});

Deno.test("pero borrar una observación A PROPÓSITO sí la quita", async () => {
  sembrar();
  const c1 = { seccion: "flujo", ancla: "a3", texto: "me equivoque al escribir esto" };
  await llamar({ accion: "guardar", token: "tk-ana", proceso: "9.1", veredictos: {}, comentarios: [c1] });
  const guardado = coments()[0];
  await llamar({
    accion: "guardar", token: "tk-ana", proceso: "9.1", veredictos: {},
    comentarios: [], base: { veredictos: {}, comentarios: [guardado] },
  });
  if (coments().length !== 0) throw new Error("no la quito: " + JSON.stringify(coments()));
});

Deno.test("un guardado posterior NO devuelve a «en progreso» algo ya enviado", async () => {
  sembrar();
  await llamar({ accion: "enviar", token: "tk-ana", proceso: "9.1", veredictos: TODAS, comentarios: [] });
  if (val().estado !== "enviada") throw new Error("no envio: " + val().estado);
  const enviadaEn = val().enviada_en;
  await llamar({ accion: "guardar", token: "tk-ana", proceso: "9.1", veredictos: TODAS, comentarios: [] });
  if (val().estado !== "enviada") throw new Error("lo degrado a " + val().estado);
  if (val().enviada_en !== enviadaEn) throw new Error("toco enviada_en");
});

Deno.test("enviar exige responder las 6 secciones y justificar las observaciones", async () => {
  sembrar();
  const flojo = await llamar({ accion: "enviar", token: "tk-ana", proceso: "9.1", veredictos: { proposito: "ok" }, comentarios: [] });
  if (flojo.status !== 400 || !Array.isArray(flojo.data.faltan)) {
    throw new Error("no exigio las 6 secciones: " + JSON.stringify(flojo));
  }
  const sinDecir = await llamar({
    accion: "enviar", token: "tk-ana", proceso: "9.1",
    veredictos: { ...TODAS, flujo: "observaciones" }, comentarios: [],
  });
  if (sinDecir.status !== 400) throw new Error("dejo marcar observaciones sin decir cuales");
});

Deno.test("enviar valida lo FUNDIDO: lo ya guardado cuenta", async () => {
  sembrar();
  await llamar({ accion: "guardar", token: "tk-ana", proceso: "9.1", veredictos: TODAS, comentarios: [] });
  // la pagina manda solo una seccion, pero las otras cinco estan guardadas
  const { status, data } = await llamar({
    accion: "enviar", token: "tk-ana", proceso: "9.1", veredictos: { proposito: "ok" }, comentarios: [],
  });
  if (status !== 200) throw new Error("rechazo una validacion completa: " + JSON.stringify(data));
  if (val().estado !== "enviada") throw new Error("no la marco enviada");
});

Deno.test("sin `base` (pestaña vieja en caché) no se puede borrar nada", async () => {
  sembrar();
  const c1 = { seccion: "flujo", ancla: "a3", texto: "no me borres" };
  await llamar({ accion: "guardar", token: "tk-ana", proceso: "9.1", veredictos: {}, comentarios: [c1] });
  await llamar({ accion: "guardar", token: "tk-ana", proceso: "9.1", veredictos: {}, comentarios: [] });
  if (coments().length !== 1) throw new Error("borro sin base: " + JSON.stringify(coments()));
});

Deno.test("añadir una observación nueva no pisa las que ya estaban", async () => {
  sembrar();
  const c1 = { seccion: "flujo", ancla: "a3", texto: "primera" };
  await llamar({ accion: "guardar", token: "tk-ana", proceso: "9.1", veredictos: {}, comentarios: [c1] });
  const g = coments()[0];
  const c2 = { seccion: "riesgos", ancla: null, texto: "segunda" };
  await llamar({
    accion: "guardar", token: "tk-ana", proceso: "9.1", veredictos: {},
    comentarios: [g, c2], base: { veredictos: {}, comentarios: [g] },
  });
  const textos = coments().map((c) => c.texto).sort();
  if (JSON.stringify(textos) !== JSON.stringify(["primera", "segunda"])) {
    throw new Error("no conservo las dos: " + JSON.stringify(coments()));
  }
});
