// ============================================================
// Proyecto Rower — comprobaciones de la Edge Function `ficha`
//
// La única comprobación del repositorio que NO necesita credenciales: en vez
// de hablar con Supabase le pone a la función un `fetch` falso con un censo en
// memoria, le captura el handler y le habla por HTTP. Cubre sobre todo las tres
// muertes del token —revocado, vencido, titular dado de baja— porque un enlace
// que sigue vivo tras una baja deja llenar la ficha a quien ya salió de Kenex.
//
// Correr:  deno test --allow-env --allow-read scripts/comprobar-ficha.ts
// ============================================================

/* Se puede apuntar a otra copia con FICHA_TS — así se comprueba que estas
   pruebas SÍ fallan contra una versión anterior de la función:
     git show HEAD~1:supabase/functions/ficha/index.ts > /tmp/antes.ts
     FICHA_TS="file:///tmp/antes.ts" deno test --allow-env --allow-read scripts/comprobar-ficha.ts */
const RUTA = Deno.env.get("FICHA_TS") ??
  new URL("../supabase/functions/ficha/index.ts", import.meta.url).href;

Deno.env.set("SUPABASE_URL", "https://falso.supabase.co");
Deno.env.set("SUPABASE_SERVICE_ROLE_KEY", "clave-de-servicio-falsa");

// ---------- censo en memoria ----------
const AYER = new Date(Date.now() - 86400e3).toISOString();
const MANANA = new Date(Date.now() + 86400e3).toISOString();

type Fila = Record<string, unknown>;

let personal: Fila[];
let tokens: Fila[];
let fichas: Fila[];
let consultas: string[];
let escrituras: { url: string; metodo: string; cuerpo: unknown }[];

function sembrar() {
  personal = [
    { id: "p-ana", nombre: "Ana Rojas", pais: "Panamá", entidad: "Kenex", area: "Ventas", cargo: "Gerente", correo: "ana@k", gerente_id: null, activo: true },
    { id: "p-luis", nombre: "Luis Pérez", pais: "Panamá", entidad: "Kenex", area: "Ventas", cargo: "Vendedor", correo: "luis@k", gerente_id: "p-ana", activo: true },
    { id: "p-rosa", nombre: "Rosa Méndez", pais: "Panamá", entidad: "Kenex", area: "Ventas", cargo: "Vendedora", correo: "rosa@k", gerente_id: "p-ana", activo: false },
    { id: "p-jose", nombre: "José Silva", pais: "Venezuela", entidad: "Deltadir", area: "Finanzas", cargo: "Contralor", correo: "jose@d", gerente_id: null, activo: false },
  ];
  tokens = [
    { id: "t1", token: "tk-ana-ind", tipo: "individual", persona_id: "p-ana", expira_en: MANANA, revocado: false, usos: 0 },
    { id: "t2", token: "tk-ana-ger", tipo: "gerente", persona_id: "p-ana", expira_en: MANANA, revocado: false, usos: 0 },
    { id: "t3", token: "tk-jose-ind", tipo: "individual", persona_id: "p-jose", expira_en: MANANA, revocado: false, usos: 0 },
    { id: "t4", token: "tk-jose-ger", tipo: "gerente", persona_id: "p-jose", expira_en: MANANA, revocado: false, usos: 0 },
    { id: "t5", token: "tk-revocado", tipo: "individual", persona_id: "p-luis", expira_en: MANANA, revocado: true, usos: 0 },
    { id: "t6", token: "tk-vencido", tipo: "individual", persona_id: "p-luis", expira_en: AYER, revocado: false, usos: 0 },
  ];
  fichas = [];
  consultas = [];
  escrituras = [];
}

const FICHA_OK = {
  documento: "V-1", antiguedad_org: "5 años", nivel_educativo: "Universitario",
  cargo_actual: "Vendedor", area_sede: "Ventas / Colón",
  responsabilidades: ["Vender"],
  habilidades: { excel: "medio", odoo: "medio", lark: "básico", powerbi: "ninguno", ia: "básico" },
};

// ---------- fetch falso: enruta por URL, como PostgREST ----------
function valorFiltro(qs: URLSearchParams, campo: string): string | null {
  const v = qs.get(campo);
  return v ? v.replace(/^eq\./, "") : null;
}

/**
 * Recorta las filas al `select=` pedido, como hace PostgREST.
 *
 * ⚠️ Esto NO estaba, y por eso las 13 pruebas pasaban mientras `abrir`
 * devolvía media ficha: el falso contestaba la fila entera pasara lo que
 * pasara. Si se quita, vuelve a haber un punto ciego del tamaño de un borrado
 * de datos en producción.
 */
function proyectar(filas: Fila[], select: string | null): Fila[] {
  if (!select || select === "*") return filas;
  const cols = select.split(",").map((c) => c.trim()).filter(Boolean);
  return filas.map((f) => Object.fromEntries(cols.filter((c) => c in f).map((c) => [c, f[c]])));
}

function respuesta(cuerpo: unknown, status = 200): Response {
  if (status === 204 || status === 304) return new Response(null, { status });
  return new Response(JSON.stringify(cuerpo), { status, headers: { "Content-Type": "application/json" } });
}

globalThis.fetch = ((entrada: string | URL | Request, init: RequestInit = {}) => {
  const url = new URL(String(entrada));
  const metodo = (init.method || "GET").toUpperCase();
  const qs = url.searchParams;
  const tabla = url.pathname.replace("/rest/v1/", "");

  if (metodo !== "GET") {
    escrituras.push({ url: url.pathname + "?" + qs.toString(), metodo, cuerpo: JSON.parse(String(init.body ?? "null")) });
    if (tabla === "fichas_tokens") {                       // marcarUso
      const id = valorFiltro(qs, "id");
      const t = tokens.find((x) => x.id === id);
      if (t) Object.assign(t, JSON.parse(String(init.body)));
      return Promise.resolve(respuesta(null, 204));
    }
    if (tabla === "fichas_perfil") {                       // upsertFicha
      const entradas = JSON.parse(String(init.body)) as Fila[];
      for (const e of entradas) {
        // El `check` de nivel_educativo rechaza la cadena vacía, igual que la
        // base real: escribir "" tiene que fallar aquí también.
        if (e.nivel_educativo === "") {
          return Promise.resolve(respuesta(
            { message: 'new row violates check constraint "fichas_perfil_nivel_educativo_check"' }, 400));
        }
        const prev = fichas.find((f) => f.persona_id === e.persona_id);
        if (prev) Object.assign(prev, e);
        else fichas.push({ estado: "pendiente", ...e });
      }
      return Promise.resolve(respuesta(null, 201));
    }
    return Promise.resolve(respuesta({ message: "tabla inesperada: " + tabla }, 400));
  }

  consultas.push(tabla + "?" + qs.toString());

  if (tabla === "fichas_tokens") {
    const tk = valorFiltro(qs, "token");
    return Promise.resolve(respuesta(tokens.filter((t) => t.token === tk)));
  }

  if (tabla === "personal") {
    let filas = personal.slice();
    const id = qs.get("id");
    if (id?.startsWith("eq.")) filas = filas.filter((p) => p.id === id.slice(3));
    if (id?.startsWith("in.")) {
      const ids = id.slice(4, -1).split(",");
      filas = filas.filter((p) => ids.includes(String(p.id)));
    }
    const ger = valorFiltro(qs, "gerente_id");
    if (ger) filas = filas.filter((p) => p.gerente_id === ger);
    if (qs.get("activo") === "eq.true") filas = filas.filter((p) => p.activo === true);
    return Promise.resolve(respuesta(proyectar(filas, qs.get("select"))));
  }

  if (tabla === "fichas_perfil") {
    let filas = fichas.slice();
    const pid = qs.get("persona_id");
    if (pid?.startsWith("eq.")) filas = filas.filter((f) => f.persona_id === pid.slice(3));
    if (pid?.startsWith("in.")) {
      const ids = pid.slice(4, -1).split(",");
      filas = filas.filter((f) => ids.includes(String(f.persona_id)));
    }
    return Promise.resolve(respuesta(proyectar(filas, qs.get("select"))));
  }

  return Promise.resolve(respuesta({ message: "ruta inesperada: " + url.pathname }, 404));
}) as typeof fetch;

// ---------- capturar el handler en vez de levantar el servidor ----------
let handler: ((req: Request) => Response | Promise<Response>) | null = null;
// deno-lint-ignore no-explicit-any
(Deno as any).serve = (h: (req: Request) => Response | Promise<Response>) => {
  handler = h;
  return { finished: Promise.resolve(), shutdown: () => Promise.resolve(), addr: { transport: "tcp", hostname: "0", port: 0 }, ref() {}, unref() {} };
};

await import(RUTA);
if (!handler) throw new Error("la función no llamó a Deno.serve");

async function llamar(cuerpo: unknown): Promise<{ status: number; data: Record<string, unknown> }> {
  const r = await handler!(new Request("https://falso/ficha", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cuerpo),
  }));
  let data: Record<string, unknown> = {};
  try { data = await r.json(); } catch { /* sin cuerpo */ }
  return { status: r.status, data };
}

const MSG_INACTIVA = /salió del censo/;
const MSG_INVALIDO = /no es válido o ya expiró/;

// ============================================================
//  EL HUECO QUE SE CIERRA
// ============================================================
Deno.test("titular inactivo: las CUATRO acciones lo rechazan con 403", async () => {
  for (const accion of ["abrir", "cargar", "guardar", "completar"]) {
    sembrar();
    const { status, data } = await llamar({ accion, token: "tk-jose-ind", persona_id: "p-jose", ficha: FICHA_OK });
    if (status !== 403) throw new Error(`${accion}: esperaba 403, dio ${status}`);
    if (!MSG_INACTIVA.test(String(data.error))) throw new Error(`${accion}: mensaje inesperado -> ${data.error}`);
    if (escrituras.length) throw new Error(`${accion}: escribió algo estando de baja -> ${JSON.stringify(escrituras)}`);
  }
});

Deno.test("titular inactivo: no se le cuenta el uso (el panel no debe decir «abierto»)", async () => {
  sembrar();
  await llamar({ accion: "abrir", token: "tk-jose-ind" });
  const t = tokens.find((x) => x.token === "tk-jose-ind")!;
  if (t.usos !== 0 || t.ultimo_uso) throw new Error("marcó uso de un enlace muerto: " + JSON.stringify(t));
});

Deno.test("gerente inactivo: su enlace de EQUIPO también muere", async () => {
  sembrar();
  const { status, data } = await llamar({ accion: "abrir", token: "tk-jose-ger" });
  if (status !== 403 || !MSG_INACTIVA.test(String(data.error))) {
    throw new Error(`esperaba 403 de titular inactivo, dio ${status} ${data.error}`);
  }
});

Deno.test("titular inactivo: tampoco puede llenar la ficha de OTRO", async () => {
  sembrar();
  const { status } = await llamar({ accion: "guardar", token: "tk-jose-ger", persona_id: "p-luis", ficha: FICHA_OK });
  if (status !== 403) throw new Error("esperaba 403, dio " + status);
  if (fichas.length) throw new Error("escribió la ficha de otro estando de baja");
});

// ============================================================
//  LO QUE YA FUNCIONABA Y NO DEBE ROMPERSE
// ============================================================
Deno.test("token vigente de persona activa: abrir devuelve su ficha y cuenta el uso", async () => {
  sembrar();
  const { status, data } = await llamar({ accion: "abrir", token: "tk-ana-ind" });
  if (status !== 200) throw new Error("esperaba 200, dio " + status + " " + data.error);
  if (data.tipo !== "individual") throw new Error("tipo inesperado: " + data.tipo);
  if ((data.persona as Fila).nombre !== "Ana Rojas") throw new Error("persona inesperada");
  const t = tokens.find((x) => x.token === "tk-ana-ind")!;
  if (t.usos !== 1 || !t.ultimo_uso) throw new Error("no contó el uso: " + JSON.stringify(t));
});

Deno.test("enlace de equipo: el gerente ve solo a sus reportes ACTIVOS", async () => {
  sembrar();
  const { status, data } = await llamar({ accion: "abrir", token: "tk-ana-ger" });
  if (status !== 200) throw new Error("esperaba 200, dio " + status + " " + data.error);
  const equipo = data.equipo as Fila[];
  const nombres = equipo.map((p) => p.nombre).sort();
  if (JSON.stringify(nombres) !== JSON.stringify(["Luis Pérez"])) {
    throw new Error("el equipo debería ser solo Luis (Rosa está inactiva) -> " + JSON.stringify(nombres));
  }
});

Deno.test("enlace de equipo: puede llenar la ficha de un reporte activo", async () => {
  sembrar();
  const { status } = await llamar({ accion: "guardar", token: "tk-ana-ger", persona_id: "p-luis", ficha: FICHA_OK });
  if (status !== 200) throw new Error("esperaba 200, dio " + status);
  if (fichas.length !== 1 || fichas[0].estado !== "en_progreso") throw new Error("no guardó: " + JSON.stringify(fichas));
});

Deno.test("enlace de equipo: NO puede llenar la de un reporte inactivo (fuera de ámbito)", async () => {
  sembrar();
  const { status, data } = await llamar({ accion: "guardar", token: "tk-ana-ger", persona_id: "p-rosa", ficha: FICHA_OK });
  if (status !== 403) throw new Error("esperaba 403, dio " + status);
  if (!/no está dentro de lo que este enlace permite/.test(String(data.error))) {
    throw new Error("mensaje inesperado: " + data.error);
  }
});

Deno.test("completar exige los mínimos y luego marca completada", async () => {
  sembrar();
  const flojo = await llamar({ accion: "completar", token: "tk-ana-ind", persona_id: "p-ana", ficha: { documento: "V-1" } });
  if (flojo.status !== 400 || !Array.isArray(flojo.data.faltan)) throw new Error("no validó los mínimos: " + JSON.stringify(flojo));
  const bien = await llamar({ accion: "completar", token: "tk-ana-ind", persona_id: "p-ana", ficha: FICHA_OK });
  if (bien.status !== 200) throw new Error("esperaba 200, dio " + bien.status + " " + bien.data.error);
  if (fichas[0].estado !== "completada") throw new Error("no marcó completada");
});

Deno.test("revocado, vencido, inexistente y vacío: 401 y sin pistas de más", async () => {
  for (const token of ["tk-revocado", "tk-vencido", "tk-que-no-existe", ""]) {
    sembrar();
    const { status, data } = await llamar({ accion: "abrir", token });
    if (status !== 401) throw new Error(`${token || "(vacío)"}: esperaba 401, dio ${status}`);
    if (!MSG_INVALIDO.test(String(data.error))) throw new Error(`${token}: mensaje inesperado -> ${data.error}`);
  }
});

Deno.test("sin token, la puerta no consulta nada", async () => {
  sembrar();
  await llamar({ accion: "abrir", token: "" });
  if (consultas.length) throw new Error("consultó con token vacío: " + JSON.stringify(consultas));
});

Deno.test("la puerta añade exactamente UNA consulta", async () => {
  sembrar();
  await llamar({ accion: "cargar", token: "tk-ana-ind", persona_id: "p-ana" });
  const deTokens = consultas.filter((c) => c.startsWith("fichas_tokens"));
  const deActivo = consultas.filter((c) => c.startsWith("personal?id=eq.") && c.includes("select=activo"));
  if (deTokens.length !== 1) throw new Error("consultas de token: " + deTokens.length);
  if (deActivo.length !== 1) throw new Error("consultas de activo: " + deActivo.length + " -> " + JSON.stringify(consultas));
});

Deno.test("acción desconocida y método no POST", async () => {
  sembrar();
  const raro = await llamar({ accion: "borrar-todo", token: "tk-ana-ind" });
  if (raro.status !== 400) throw new Error("esperaba 400, dio " + raro.status);
  const get = await handler!(new Request("https://falso/ficha", { method: "GET" }));
  if (get.status !== 405) throw new Error("esperaba 405, dio " + get.status);
});

// ============================================================
//  LOS CUATRO FALLOS DEL LLENADO (19-sep-2026)
//  Reportados desde Kenex: «guardas, vuelves a entrar y faltan datos» y «le
//  das completar y se queda en progreso». Medido en producción: 73 periodos
//  de posiciones anteriores borrados en 46 personas, y 48 fichas entregadas
//  que el panel contaba como pendientes.
//
//  El punto ciego que dejó pasar todo esto era del propio arnés: su `fetch`
//  falso ignoraba el `select=`, así que `abrir` podía devolver media ficha y
//  las 13 pruebas seguían en verde. Ver proyectar().
// ============================================================

/** Lo que manda leerFicha() de actualizacion-perfil/index.html, con todo lleno. */
const FICHA_LLENA: Fila = {
  documento: "V-123", antiguedad_org: "5 años", nivel_educativo: "universitario_titulado",
  otras_formaciones: "Diplomado en logística", titulo_obtenido: "Ing. Industrial", institucion: "UCAB",
  cargo_actual: "Gerente de Ventas", antiguedad_cargo: "2 años", area_sede: "Ventas / Colón",
  responsabilidades: ["Dirigir el equipo"],
  posiciones_previas: [{ cargo: "Vendedor", area: "Ventas", periodo: "2018 – 2021" }],
  habilidades: {
    excel: "avanzado", odoo: "intermedio", lark: "basico", powerbi: "basico", ia: "intermedio",
    otra: { nombre: "SAP", nivel: "basico" },
  },
};

/** Lo que el formulario reenvía tras repintarse con `vista`: los doce campos
    siempre, y cadena vacía en lo que no se haya pintado. */
function comoReenviaElFormulario(vista: Fila): Fila {
  const t = (v: unknown) => (typeof v === "string" ? v : "");
  return {
    documento: t(vista.documento), antiguedad_org: t(vista.antiguedad_org),
    nivel_educativo: t(vista.nivel_educativo), otras_formaciones: t(vista.otras_formaciones),
    titulo_obtenido: t(vista.titulo_obtenido), institucion: t(vista.institucion),
    cargo_actual: t(vista.cargo_actual), antiguedad_cargo: t(vista.antiguedad_cargo),
    area_sede: t(vista.area_sede),
    responsabilidades: Array.isArray(vista.responsabilidades) ? vista.responsabilidades : [],
    posiciones_previas: Array.isArray(vista.posiciones_previas) ? vista.posiciones_previas : [],
    habilidades: (vista.habilidades && typeof vista.habilidades === "object") ? vista.habilidades : {},
  };
}

Deno.test("FALLO 1: abrir devuelve la ficha ENTERA, no una lista corta de columnas", async () => {
  sembrar();
  await llamar({ accion: "guardar", token: "tk-ana-ind", persona_id: "p-ana", ficha: FICHA_LLENA });
  const { data } = await llamar({ accion: "abrir", token: "tk-ana-ind" });
  const vista = (data.ficha ?? {}) as Fila;
  const faltan = Object.keys(FICHA_LLENA).filter((k) => !(k in vista));
  if (faltan.length) throw new Error("abrir() no devolvió: " + faltan.join(", "));
});

Deno.test("FALLO 1: reentrar por enlace individual y reguardar NO borra nada", async () => {
  sembrar();
  await llamar({ accion: "guardar", token: "tk-ana-ind", persona_id: "p-ana", ficha: FICHA_LLENA });
  const { data } = await llamar({ accion: "abrir", token: "tk-ana-ind" });
  await llamar({
    accion: "guardar", token: "tk-ana-ind", persona_id: "p-ana",
    ficha: comoReenviaElFormulario((data.ficha ?? {}) as Fila),
  });
  const enBD = fichas[0];
  const rotos = Object.keys(FICHA_LLENA).filter((k) =>
    JSON.stringify(enBD[k]) !== JSON.stringify(FICHA_LLENA[k])
  );
  if (rotos.length) throw new Error("el reguardado destruyó: " + rotos.join(", "));
});

Deno.test("FALLO 1: un campo vacío nunca pisa uno ya guardado", async () => {
  sembrar();
  await llamar({ accion: "guardar", token: "tk-ana-ind", persona_id: "p-ana", ficha: FICHA_LLENA });
  await llamar({
    accion: "guardar", token: "tk-ana-ind", persona_id: "p-ana",
    ficha: { ...FICHA_LLENA, titulo_obtenido: "", institucion: "   ", antiguedad_cargo: "" },
  });
  const f = fichas[0];
  if (f.titulo_obtenido !== "Ing. Industrial") throw new Error("borró titulo_obtenido: " + JSON.stringify(f.titulo_obtenido));
  if (f.institucion !== "UCAB") throw new Error("borró institucion: " + JSON.stringify(f.institucion));
  if (f.antiguedad_cargo !== "2 años") throw new Error("borró antiguedad_cargo: " + JSON.stringify(f.antiguedad_cargo));
});

Deno.test("FALLO 2: el periodo de una posición anterior sobrevive a un reguardado en blanco", async () => {
  sembrar();
  await llamar({ accion: "guardar", token: "tk-ana-ind", persona_id: "p-ana", ficha: FICHA_LLENA });
  await llamar({
    accion: "guardar", token: "tk-ana-ind", persona_id: "p-ana",
    ficha: { ...FICHA_LLENA, posiciones_previas: [{ cargo: "Vendedor", area: "Ventas", periodo: "" }] },
  });
  const previas = fichas[0].posiciones_previas as Array<Record<string, string>>;
  if (previas[0].periodo !== "2018 – 2021") throw new Error("perdió el periodo: " + JSON.stringify(previas));
});

Deno.test("FALLO 2: pero si la persona cambia el cargo, se respeta lo que escribe", async () => {
  sembrar();
  await llamar({ accion: "guardar", token: "tk-ana-ind", persona_id: "p-ana", ficha: FICHA_LLENA });
  await llamar({
    accion: "guardar", token: "tk-ana-ind", persona_id: "p-ana",
    ficha: { ...FICHA_LLENA, posiciones_previas: [{ cargo: "Supervisor", area: "Bodega", periodo: "" }] },
  });
  const previas = fichas[0].posiciones_previas as Array<Record<string, string>>;
  if (previas.length !== 1 || previas[0].cargo !== "Supervisor" || previas[0].periodo !== "") {
    throw new Error("no respetó el cambio de cargo: " + JSON.stringify(previas));
  }
});

Deno.test("FALLO 3: un autoguardado posterior NO devuelve completada a en_progreso", async () => {
  sembrar();
  await llamar({ accion: "completar", token: "tk-ana-ind", persona_id: "p-ana", ficha: FICHA_LLENA });
  if (fichas[0].estado !== "completada") throw new Error("no completó");
  await llamar({ accion: "guardar", token: "tk-ana-ind", persona_id: "p-ana", ficha: FICHA_LLENA });
  if (fichas[0].estado !== "completada") throw new Error("el autoguardado la degradó a " + fichas[0].estado);
  if (!fichas[0].enviada_en) throw new Error("perdió enviada_en");
});

Deno.test("FALLO 4: guardar sin nivel educativo no revienta; escribe null, nunca cadena vacía", async () => {
  sembrar();
  const { status, data } = await llamar({
    accion: "guardar", token: "tk-ana-ind", persona_id: "p-ana",
    ficha: { ...FICHA_LLENA, nivel_educativo: "" },
  });
  if (status !== 200) throw new Error("el guardado falló con " + status + ": " + JSON.stringify(data));
  if (fichas[0].nivel_educativo !== null) {
    throw new Error("escribió " + JSON.stringify(fichas[0].nivel_educativo) + " en vez de null");
  }
  if (fichas[0].documento !== "V-123") throw new Error("se perdió el resto de la ficha");
});

Deno.test("FALLO 4: y una vez marcado, el nivel no se pierde al reguardar en blanco", async () => {
  sembrar();
  await llamar({ accion: "guardar", token: "tk-ana-ind", persona_id: "p-ana", ficha: FICHA_LLENA });
  await llamar({ accion: "guardar", token: "tk-ana-ind", persona_id: "p-ana", ficha: { ...FICHA_LLENA, nivel_educativo: "" } });
  if (fichas[0].nivel_educativo !== "universitario_titulado") {
    throw new Error("perdió el nivel: " + JSON.stringify(fichas[0].nivel_educativo));
  }
});

Deno.test("completar valida lo FUNDIDO: un blanco que ya estaba guardado no la rechaza", async () => {
  sembrar();
  await llamar({ accion: "guardar", token: "tk-ana-ind", persona_id: "p-ana", ficha: FICHA_LLENA });
  const { status, data } = await llamar({
    accion: "completar", token: "tk-ana-ind", persona_id: "p-ana",
    ficha: { ...FICHA_LLENA, documento: "", area_sede: "" },
  });
  if (status !== 200) throw new Error("rechazó una ficha que sí está completa: " + JSON.stringify(data));
  if (fichas[0].documento !== "V-123" || fichas[0].area_sede !== "Ventas / Colón") {
    throw new Error("completar borró campos: " + JSON.stringify(fichas[0]));
  }
});

Deno.test("una ficha nueva de cero sigue guardándose entera", async () => {
  sembrar();
  const { status } = await llamar({ accion: "guardar", token: "tk-ana-ind", persona_id: "p-ana", ficha: FICHA_LLENA });
  if (status !== 200) throw new Error("status " + status);
  const f = fichas[0];
  for (const k of Object.keys(FICHA_LLENA)) {
    if (JSON.stringify(f[k]) !== JSON.stringify(FICHA_LLENA[k])) {
      throw new Error(k + ": guardó " + JSON.stringify(f[k]) + " en vez de " + JSON.stringify(FICHA_LLENA[k]));
    }
  }
  if (f.estado !== "en_progreso") throw new Error("estado " + f.estado);
});
