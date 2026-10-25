// ============================================================
// Proyecto Rower — Edge Function agente: la estructura organizativa To-Be
//
// El agente no reescribe los ~70 KB de ESTRUCTURA_TOBE: propone OPERACIONES
// (agregar, modificar, mover, quitar, fijar) que esta función aplica sobre la
// estructura vigente, valida y resume en frases. Las unidades, comités y consejos
// se localizan por su `id`; el resto del objeto (premisas, pendientes, capas,
// países, títulos), por ruta.
// La forma del objeto es la de informe/fase2/estructura-tobe-datos.js, que pinta
// informe/fase2/estructura-render.js.
// ============================================================

export type Op = { op: string; [k: string]: unknown };

const LISTAS = ["GOBIERNO", "CONSEJOS", "STAFF", "DIRECCIONES", "COMITES"] as const;
const RAICES_FIJAR = ["corte", "titulo", "bajada", "rotuloStaff", "NIVELES", "PAISES", "ESTADOS", "NOTA_AMPLIADO",
  "FUNCIONAMIENTO", "CAPAS", "PATRON", "PRINCIPIOS", "CAMBIOS", "PENDIENTES"];
const ID = /^[a-z0-9][a-z0-9-]{0,39}$/;
// Claves que no se aceptan en ningún nivel: tocarían el prototipo de los objetos.
const PROHIBIDAS = new Set(["__proto__", "constructor", "prototype"]);

/** Rechaza cualquier objeto que traiga, a cualquier profundidad, una clave prohibida. */
function sinClavesProhibidas(x: unknown, donde: string, prof = 0): void {
  if (prof > 12 || !x || typeof x !== "object") return;
  for (const k of Object.keys(x as object)) {
    if (PROHIBIDAS.has(k)) throw new Error(`${donde}: la clave «${k}» no está permitida.`);
    sinClavesProhibidas((x as any)[k], donde, prof + 1);
  }
}

type Lugar = { obj: any; lista: any[] | null; indice: number; padre: string; tipo: "unidad" | "comite" | "consejo" | "gobierno" | "ceo" };

/** Todas las unidades, comités y consejos con su lista y su padre. */
export function indice(E: any): Map<string, Lugar> {
  const m = new Map<string, Lugar>();
  if (E?.CEO?.id) m.set(E.CEO.id, { obj: E.CEO, lista: null, indice: -1, padre: "", tipo: "ceo" });
  const rec = (lista: any[], padre: string) => {
    (lista ?? []).forEach((u, i) => {
      if (!u || typeof u !== "object") return;
      if (typeof u.id === "string") m.set(u.id, { obj: u, lista, indice: i, padre, tipo: "unidad" });
      if (Array.isArray(u.hijos)) rec(u.hijos, u.id);
    });
  };
  (E?.GOBIERNO ?? []).forEach((u: any, i: number) => m.set(u.id, { obj: u, lista: E.GOBIERNO, indice: i, padre: "GOBIERNO", tipo: "gobierno" }));
  (E?.CONSEJOS ?? []).forEach((u: any, i: number) => m.set(u.id, { obj: u, lista: E.CONSEJOS, indice: i, padre: "CONSEJOS", tipo: "consejo" }));
  (E?.COMITES ?? []).forEach((u: any, i: number) => m.set(u.id, { obj: u, lista: E.COMITES, indice: i, padre: "COMITES", tipo: "comite" }));
  rec(E?.STAFF ?? [], "STAFF");
  rec(E?.DIRECCIONES ?? [], "DIRECCIONES");
  return m;
}

const nombre = (u: any) => (u && typeof u.n === "string" ? `«${u.n}»` : "(sin nombre)");

/** La lista donde colgar `obj` bajo `padre`. GOBIERNO, CONSEJOS y COMITES solo reciben objetos de su clase. */
function listaDestino(E: any, padre: string, obj?: any): any[] {
  if (padre === "COMITES") {
    if (obj && (typeof obj.lidera !== "string" || !Array.isArray(obj.principal))) throw new Error("en COMITES solo van comités, con lidera y principal.");
    return E.COMITES;
  }
  if (padre === "GOBIERNO" || padre === "CONSEJOS") {
    if (obj && Array.isArray(obj.hijos) && obj.hijos.length) throw new Error(`en ${padre} no se dibujan unidades hijas.`);
    return E[padre];
  }
  if (padre === "STAFF" || padre === "DIRECCIONES") {
    if (obj && (typeof obj.lidera === "string" || "principal" in obj)) throw new Error("un comité va en COMITES, no entre las unidades.");
    return E[padre];
  }
  const l = indice(E).get(padre);
  if (!l || l.tipo !== "unidad" && l.tipo !== "ceo") throw new Error(`No existe la unidad «${padre}» para colgar la unidad.`);
  if (l.tipo === "ceo") throw new Error("Bajo la Presidencia van STAFF (sus unidades) o DIRECCIONES.");
  if (l.padre === "STAFF") throw new Error(`«${padre}» es una unidad de la Presidencia: el dibujo no muestra unidades hijas bajo ella.`);
  if (!Array.isArray(l.obj.hijos)) l.obj.hijos = [];
  return l.obj.hijos;
}

function insertar(lista: any[], obj: any, despues?: unknown) {
  if (despues === undefined || despues === "") { lista.push(obj); return; }
  if (despues === null) { lista.unshift(obj); return; }
  const i = lista.findIndex((x) => x?.id === despues);
  if (i < 0) throw new Error(`«despues_de» = «${String(despues)}» no está en esa lista.`);
  lista.splice(i + 1, 0, obj);
}

/** Aplica las operaciones sobre una COPIA de la estructura. Devuelve la nueva y las frases del cambio. */
export function aplicar(base: any, ops: Op[]): { datos: any; cambios: string[] } {
  const E = structuredClone(base);
  const cambios: string[] = [];
  if (!Array.isArray(ops) || !ops.length) throw new Error("No hay operaciones.");
  if (ops.length > 60) throw new Error("Demasiadas operaciones en una sola propuesta (máximo 60).");
  ops.forEach((o, k) => {
    const n = k + 1;
    try {
      if (o.op === "agregar") {
        const u = o.unidad as any, padre = String(o.padre ?? "");
        if (!u || typeof u !== "object" || Array.isArray(u)) throw new Error("falta «unidad».");
        sinClavesProhibidas(u, "unidad");
        if (indice(E).has(u.id)) throw new Error(`ya existe el id «${u.id}».`);
        insertar(listaDestino(E, padre, u), u, o.despues_de);
        const p = indice(E).get(padre);
        cambios.push(`Agrega ${nombre(u)} ${p ? "bajo " + nombre(p.obj) : "en " + padre}.`);
      } else if (o.op === "modificar") {
        const l = indice(E).get(String(o.id ?? ""));
        if (!l) throw new Error(`no existe «${String(o.id)}».`);
        const c = o.cambios as Record<string, unknown>;
        if (!c || typeof c !== "object" || Array.isArray(c)) throw new Error("falta «cambios».");
        sinClavesProhibidas(c, "cambios");
        if ("id" in c) throw new Error("el id no se cambia: agrega una unidad nueva y quita la vieja.");
        if ("hijos" in c) throw new Error("las unidades hijas se cambian con agregar, mover o quitar.");
        const antes = nombre(l.obj);
        Object.entries(c).forEach(([k, v]) => { if (v === null) delete l.obj[k]; else l.obj[k] = v; });
        const campos = Object.keys(c).map((k) => ({ n: "nombre", ocupante: "ocupante", paises: "ocupantes por país", funciones: "funciones",
          nota: "nota", nivel: "nivel", caracter: "staff o negocio", interna: "estructura interna", marcas: "titulares por marca",
          lidera: "quién lidera", principal: "formato principal", ampliado: "formato ampliado", proposito: "propósito",
          integrantes: "integrantes", sub: "subtítulo", etiqueta: "etiqueta", enLinea: "posición en la línea", lado: "lado",
          atiende: "a quién atiende", d: "descripción" } as Record<string, string>)[k] ?? k);
        cambios.push(`Cambia en ${antes}: ${campos.join(", ")}${c.n ? ` (ahora ${nombre(l.obj)})` : ""}.`);
      } else if (o.op === "mover") {
        const id = String(o.id ?? ""), l = indice(E).get(id);
        if (!l || !l.lista) throw new Error(`no se puede mover «${id}».`);
        const padre = String(o.padre ?? l.padre);
        if (l.tipo !== "unidad" && padre !== l.padre) throw new Error(`${nombre(l.obj)} solo se reordena dentro de ${l.padre}.`);
        if (indice({ DIRECCIONES: [l.obj] }).has(padre)) throw new Error("una unidad no puede colgar de sí misma ni de sus hijas.");
        const destino = l.tipo === "unidad" ? listaDestino(E, padre, l.obj) : l.lista;
        l.lista.splice(l.indice, 1);
        insertar(destino, l.obj, o.despues_de);
        const p = indice(E).get(padre);
        cambios.push(padre === l.padre ? `Reordena ${nombre(l.obj)}.` : `Mueve ${nombre(l.obj)} ${p ? "bajo " + nombre(p.obj) : "a " + padre}.`);
      } else if (o.op === "quitar") {
        const id = String(o.id ?? ""), l = indice(E).get(id);
        if (!l || !l.lista) throw new Error(`no se puede quitar «${id}».`);
        if (Array.isArray(l.obj.hijos) && l.obj.hijos.length && o.con_hijos !== true) {
          throw new Error(`${nombre(l.obj)} tiene ${l.obj.hijos.length} unidades hijas: muévelas antes o usa con_hijos: true.`);
        }
        l.lista.splice(l.indice, 1);
        cambios.push(`Quita ${nombre(l.obj)}${l.obj.hijos?.length ? ` y sus ${l.obj.hijos.length} unidades hijas` : ""}.`);
      } else if (o.op === "fijar") {
        const ruta = String(o.ruta ?? "").split("/").filter(Boolean);
        if (!ruta.length || !RAICES_FIJAR.includes(ruta[0])) throw new Error(`«fijar» solo admite rutas que empiecen por ${RAICES_FIJAR.join(", ")}.`);
        if (ruta.some((x) => PROHIBIDAS.has(x))) throw new Error("la ruta tiene una clave no permitida.");
        sinClavesProhibidas(o.valor, "valor");
        let cur: any = E;
        for (const s of ruta.slice(0, -1)) {
          const k = Array.isArray(cur) ? Number(s) : s;
          if (!Object.hasOwn(cur, k) || cur[k] === null || typeof cur[k] !== "object") throw new Error(`la ruta «${ruta.join("/")}» no existe.`);
          cur = cur[k];
        }
        const ult = ruta[ruta.length - 1];
        if (Array.isArray(cur)) {
          const i = ult === "-" ? cur.length : Number(ult);
          if (!Number.isInteger(i) || i < 0 || i > cur.length) throw new Error(`índice inválido en «${ruta.join("/")}».`);
          if (o.valor === null) cur.splice(i, 1);
          else if (i === cur.length || o.insertar === true) cur.splice(i, 0, o.valor);
          else cur[i] = o.valor;
        } else if (o.valor === null) delete cur[ult]; else cur[ult] = o.valor;
        cambios.push(`${o.valor === null ? "Quita" : "Cambia"} ${ruta.join(" › ")}.`);
      } else {
        throw new Error(`operación desconocida «${String(o.op)}»: usa agregar, modificar, mover, quitar o fijar.`);
      }
    } catch (e) {
      throw new Error(`Operación ${n} (${String(o.op)}): ${(e as Error).message}`);
    }
  });
  return { datos: E, cambios };
}

const esTexto = (x: unknown, max = 4000) => typeof x === "string" && x.trim().length > 0 && x.length <= max;

function ocupanteValido(o: any, estados: Set<string>, donde: string, err: string[]) {
  if (o === undefined) return;
  if (!o || typeof o !== "object" || !esTexto(o.nombre, 200)) { err.push(`${donde}: el ocupante necesita «nombre».`); return; }
  if (o.estado !== undefined && !estados.has(o.estado)) err.push(`${donde}: estado de ocupante inválido («${o.estado}»); usa ${[...estados].join(", ")}.`);
}

const tipo = (x: unknown) => (Array.isArray(x) ? "lista" : x === null ? "null" : typeof x);

/** La raíz nueva tiene que conservar la forma de la del archivo: lo que el dibujo lee de ella. */
function mismaForma(nuevo: any, viejo: any, ruta: string, err: string[], prof = 0) {
  if (prof > 4 || viejo === undefined) return;
  if (tipo(nuevo) !== tipo(viejo)) { err.push(`${ruta} tiene que ser ${tipo(viejo)} (es ${tipo(nuevo)}).`); return; }
  if (Array.isArray(viejo)) {
    if (!viejo.length) return;
    const muestra = viejo[0];
    if (typeof muestra === "string") { if (nuevo.some((x: unknown) => typeof x !== "string")) err.push(`${ruta}: todos sus elementos son textos.`); return; }
    if (muestra && typeof muestra === "object" && !Array.isArray(muestra)) {
      // las claves que tienen TODOS los elementos del archivo son obligatorias
      const comunes = Object.keys(muestra).filter((k) => viejo.every((v: any) => v && Object.hasOwn(v, k)));
      nuevo.forEach((x: any, i: number) => {
        if (!x || typeof x !== "object" || Array.isArray(x)) { err.push(`${ruta}/${i} tiene que ser un objeto.`); return; }
        comunes.forEach((k) => { if (!Object.hasOwn(x, k)) err.push(`${ruta}/${i} necesita «${k}».`); else mismaForma(x[k], muestra[k], `${ruta}/${i}/${k}`, err, prof + 1); });
      });
    }
    return;
  }
  if (viejo && typeof viejo === "object") {
    Object.keys(viejo).forEach((k) => {
      if (!Object.hasOwn(nuevo, k)) err.push(`${ruta} necesita «${k}».`);
      else mismaForma(nuevo[k], viejo[k], `${ruta}/${k}`, err, prof + 1);
    });
  }
}

/** Valida la estructura entera después de las operaciones. Devuelve los problemas (vacío = válida). */
export function validar(E: any, original: any): string[] {
  const err: string[] = [];
  if (JSON.stringify(E).length > 400_000) return ["La estructura pasa de 400 KB."];
  Object.keys(original).forEach((k) => { if (!(k in E)) err.push(`Falta la clave de primer nivel «${k}».`); });
  if (!E.CEO || !esTexto(E.CEO.n, 200)) err.push("La Presidencia (CEO) necesita nombre.");
  LISTAS.forEach((k) => { if (!Array.isArray(E[k])) err.push(`«${k}» tiene que ser una lista.`); });
  if (err.length) return err;
  RAICES_FIJAR.forEach((k) => mismaForma(E[k], original[k], k, err));
  if (err.length) return [...new Set(err)].slice(0, 40);
  const estados = new Set(Object.keys(E.ESTADOS ?? {}));
  const paises = new Set((E.PAISES ?? []).map((p: any) => p?.id));
  const nivelesOk = new Set(["n1", "n2", "n3", "ccorp", "coord", "gun", "staff", ...(E.NIVELES ?? []).map((x: any) => x?.id)]);
  const ids = new Map<string, number>();
  const unidades: any[] = [];
  const rec = (lista: any[], donde: string) => (lista ?? []).forEach((u, i) => {
    if (!u || typeof u !== "object" || Array.isArray(u)) { err.push(`${donde}[${i}] no es una unidad.`); return; }
    unidades.push(u);
    if (typeof u.id !== "string" || !ID.test(u.id)) err.push(`${donde}[${i}]: id inválido («${String(u.id)}»; minúsculas, números y guiones).`);
    ids.set(u.id, (ids.get(u.id) ?? 0) + 1);
    if (!esTexto(u.n, 200)) err.push(`«${u.id}» necesita nombre (n).`);
    if (u.nivel !== undefined && !nivelesOk.has(u.nivel)) err.push(`«${u.id}»: nivel inválido («${u.nivel}»).`);
    if (u.caracter !== undefined && !["staff", "negocio"].includes(u.caracter)) err.push(`«${u.id}»: caracter es staff o negocio.`);
    if (u.lado !== undefined && !["izq", "der"].includes(u.lado)) err.push(`«${u.id}»: lado es izq o der.`);
    if (u.enLinea !== undefined && typeof u.enLinea !== "boolean") err.push(`«${u.id}»: enLinea es true o false.`);
    ocupanteValido(u.ocupante, estados, `«${u.id}»`, err);
    if (u.paises !== undefined) {
      if (!u.paises || typeof u.paises !== "object" || Array.isArray(u.paises)) err.push(`«${u.id}»: paises es un objeto {PA: ocupante, …}.`);
      else Object.entries(u.paises).forEach(([p, o]) => {
        if (!paises.has(p)) err.push(`«${u.id}»: el país «${p}» no está en PAISES.`);
        ocupanteValido(o, estados, `«${u.id}» · ${p}`, err);
      });
    }
    ["funciones", "interna"].forEach((k) => {
      if (u[k] !== undefined && (!Array.isArray(u[k]) || u[k].some((x: unknown) => !esTexto(x)))) err.push(`«${u.id}»: ${k} es una lista de textos.`);
    });
    ["integrantes", "nota", "sub", "etiqueta", "proposito", "d"].forEach((k) => {
      if (u[k] !== undefined && (typeof u[k] !== "string" || u[k].length > 4000)) err.push(`«${u.id}»: ${k} es un texto.`);
    });
    if (u.marcas !== undefined && (!Array.isArray(u.marcas) || u.marcas.some((x: any) => !x || !esTexto(x.marca, 80)))) err.push(`«${u.id}»: marcas es una lista de {marca, nombre, estado}.`);
    if (u.hijos !== undefined && !Array.isArray(u.hijos)) err.push(`«${u.id}»: hijos es una lista.`);
    if (Array.isArray(u.hijos)) rec(u.hijos, u.id);
  });
  ids.set(E.CEO.id, (ids.get(E.CEO.id) ?? 0) + 1);
  // El dibujo indexa el primer nivel de GOBIERNO, CONSEJOS y STAFF, y el árbol entero de DIRECCIONES.
  ["GOBIERNO", "CONSEJOS", "STAFF"].forEach((k) => (E[k] ?? []).forEach((u: any) => {
    if (Array.isArray(u?.hijos) && u.hijos.length) err.push(`${nombre(u)} está en ${k}: el dibujo no muestra unidades hijas bajo ella.`);
  }));
  rec(E.GOBIERNO, "GOBIERNO"); rec(E.CONSEJOS, "CONSEJOS"); rec(E.STAFF, "STAFF"); rec(E.DIRECCIONES, "DIRECCIONES");
  // Las unidades que se dibujan como caja (pueden liderar comités y recibir «atiende»).
  const dibujadas = new Set<string>([E.CEO.id]);
  (E.STAFF ?? []).forEach((u: any) => dibujadas.add(u?.id));
  const baja = (l: any[]) => (l ?? []).forEach((u: any) => { dibujadas.add(u?.id); if (Array.isArray(u?.hijos)) baja(u.hijos); });
  baja(E.DIRECCIONES);
  E.COMITES.forEach((c: any, i: number) => {
    if (!c || typeof c.id !== "string" || !ID.test(c.id)) { err.push(`COMITES[${i}]: id inválido.`); return; }
    ids.set(c.id, (ids.get(c.id) ?? 0) + 1);
    if (!esTexto(c.n, 200)) err.push(`El comité «${c.id}» necesita nombre.`);
  });
  ids.forEach((n, id) => { if (n > 1) err.push(`El id «${id}» está repetido.`); });
  const existe = (id: unknown) => typeof id === "string" && ids.has(id);
  E.COMITES.forEach((c: any) => {
    if (typeof c?.lidera !== "string" || !dibujadas.has(c.lidera)) err.push(`El comité ${nombre(c)} necesita «lidera»: el id de una unidad de la estructura (es «${String(c?.lidera)}»).`);
    if (!Array.isArray(c?.principal)) err.push(`El comité ${nombre(c)} necesita «principal»: la lista de ids de su formato principal.`);
    ["principal", "ampliado"].forEach((k) => {
      if (c?.[k] === undefined) return;
      if (!Array.isArray(c[k])) { err.push(`El comité ${nombre(c)}: ${k} es una lista de ids.`); return; }
      c[k].filter((x: unknown) => x !== "@direcciones" && !existe(x))
        .forEach((x: unknown) => err.push(`El comité ${nombre(c)} nombra en ${k} a «${String(x)}», que no existe.`));
    });
  });
  unidades.forEach((u) => {
    if (u.atiende === undefined) return;
    if (!Array.isArray(u.atiende)) err.push(`«${u.id}»: atiende es una lista de ids.`);
    else u.atiende.filter((x: unknown) => typeof x !== "string" || !dibujadas.has(x))
      .forEach((x: unknown) => err.push(`«${u.id}» atiende a «${String(x)}», que no es una unidad de la estructura.`));
  });
  return [...new Set(err)].slice(0, 40);
}

/** Resumen compacto para el agente: el árbol con ocupantes, los comités y qué hay en las premisas. */
export function resumen(E: any): string {
  const lin: string[] = [];
  const oc = (o: any) => (o ? ` — ${o.nombre}${o.estado ? ` [${o.estado}]` : ""}` : "");
  const ps = (u: any) => (u.paises ? " · por país: " + Object.entries(u.paises).map(([p, o]: [string, any]) => `${p} ${o?.nombre ?? "?"}`).join(", ") : "");
  const rec = (lista: any[], nivel: number) => (lista ?? []).forEach((u) => {
    lin.push(`${"  ".repeat(nivel)}- ${u.id}: ${u.n}${u.nivel ? ` (${u.nivel})` : ""}${u.caracter ? ` {${u.caracter}}` : ""}${u.enLinea ? " [en línea]" : ""}${oc(u.ocupante)}${ps(u)}`);
    if (Array.isArray(u.hijos)) rec(u.hijos, nivel + 1);
  });
  lin.push(`# ${E.titulo} (corte ${E.corte})`);
  lin.push(`Presidencia — ${E.CEO.id}: ${E.CEO.n}${oc(E.CEO.ocupante)}`);
  lin.push("## Gobierno"); rec(E.GOBIERNO, 0);
  lin.push("## Consejos"); rec(E.CONSEJOS, 0);
  lin.push("## Unidades de la Presidencia (STAFF)"); rec(E.STAFF, 0);
  lin.push("## Direcciones y gerencias de staff (DIRECCIONES)"); rec(E.DIRECCIONES, 0);
  lin.push("## Comités");
  E.COMITES.forEach((c: any) => lin.push(`- ${c.id}: ${c.n} — lidera ${c.lidera}; principal: ${(c.principal ?? []).join(", ")}; ampliado: ${(c.ampliado ?? []).join(", ")}`));
  lin.push(`## Países: ${(E.PAISES ?? []).map((p: any) => `${p.id} ${p.n}${p.parcial ? " (parcial)" : ""}`).join(", ")}`);
  lin.push(`## Estados de ocupante: ${Object.keys(E.ESTADOS ?? {}).join(", ")}`);
  lin.push(`## Niveles: ${(E.NIVELES ?? []).map((x: any) => `${x.id} ${x.n}`).join(" · ")}`);
  lin.push(`## Otras claves (leer con seccion): ${RAICES_FIJAR.filter((k) => k in E).join(", ")}`);
  return lin.join("\n");
}
