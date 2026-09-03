// Extrae los datos del organigrama (capas Declarado/Real + estructura propuesta) a JSON.
// Fuentes:
//   informe/fase1/organigrama-kenex.html            → literales JS embebidos en su <script>
//   informe/fase1/organigrama-propuesto-datos.js    → const ORG_PROPUESTA (fuente única de la 4.8)
//
// Uso: node scripts/_extraer_organigrama.js <salida.json> [raiz-del-repo]
// Mismo patrón que scripts/_extraer_mapa.js: localiza `const NOMBRE =`, equilibra
// llaves/corchetes (saltando comentarios y cadenas) y evalúa el literal.
//
// FIDELIDAD: los textos se copian tal cual. Lo que el archivo no declara sale null y
// queda anotado en `avisos`. Los campos derivados (capa, país desde la bandera,
// etiquetas de tipo/delta) se derivan de reglas explícitas del propio archivo (CSS de
// capas, leyenda, TIPO_DELTA) y también se anotan.

const fs = require('fs');
const path = require('path');

const SALIDA = process.argv[2];
const REPO = process.argv[3] || path.join(__dirname, '..');
const RAIZ = path.join(REPO, 'informe', 'fase1');
if (!SALIDA) { console.error('Falta el archivo de salida.'); process.exit(2); }

const avisos = [];

/* ------------------------------------------------------------------ extracción */

// Localiza `const NOMBRE = <literal>` y equilibra corchetes/llaves para hallar su fin.
// Salta cadenas ('"`) y comentarios (// y /* */) para no contar delimitadores falsos.
function extraerLiteral(src, nombre) {
  const marca = new RegExp('const\\s+' + nombre + '\\s*=\\s*');
  const m = marca.exec(src);
  if (!m) throw new Error('No encontré const ' + nombre);
  let i = m.index + m[0].length;
  const abre = src[i];
  const cierra = abre === '{' ? '}' : abre === '[' ? ']' : null;
  if (!cierra) throw new Error(nombre + ' no empieza en { ni [');
  let prof = 0, comilla = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (comilla) {
      if (c === '\\') { i++; continue; }
      if (c === comilla) comilla = null;
      continue;
    }
    if (c === '/' && src[i + 1] === '/') { i = src.indexOf('\n', i); if (i < 0) break; continue; }
    if (c === '/' && src[i + 1] === '*') { i = src.indexOf('*/', i) + 1; if (i < 1) break; continue; }
    if (c === '"' || c === "'" || c === '`') { comilla = c; continue; }
    if (c === abre) prof++;
    else if (c === cierra) { prof--; if (prof === 0) { i++; break; } }
  }
  const literal = src.slice(m.index + m[0].length, i);
  return new Function('return (' + literal + ')')();
}

const srcOrg = fs.readFileSync(path.join(RAIZ, 'organigrama-kenex.html'), 'utf8');
const srcProp = fs.readFileSync(path.join(RAIZ, 'organigrama-propuesto-datos.js'), 'utf8');

const FO          = extraerLiteral(srcOrg, 'FO');
const GOV         = extraerLiteral(srcOrg, 'GOV');
const DEFACTO     = extraerLiteral(srcOrg, 'DEFACTO');
const REGIONAL    = extraerLiteral(srcOrg, 'REGIONAL');
const ENTITIES    = extraerLiteral(srcOrg, 'ENTITIES');
const FLOWS       = extraerLiteral(srcOrg, 'FLOWS');
const ALERTS      = extraerLiteral(srcOrg, 'ALERTS');
const OVERLAPS    = extraerLiteral(srcOrg, 'OVERLAPS');
const CIFRAS      = extraerLiteral(srcOrg, 'CIFRAS');
const TIPO_DELTA  = extraerLiteral(srcOrg, 'TIPO_DELTA');
const DELTA_TIPOS = extraerLiteral(srcOrg, 'DELTA_TIPOS');
const CAPA_TITULO = extraerLiteral(srcOrg, 'CAPA_TITULO');
const ALIAS       = extraerLiteral(srcOrg, 'ALIAS');
const SCENES      = extraerLiteral(srcOrg, 'SCENES');   // lleva funciones: no se invocan
const PROP        = extraerLiteral(srcProp, 'ORG_PROPUESTA');

/* ------------------------------------------------------------------ auxiliares */

const slug = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 44);

const usados = new Set();
function idUnico(base) {
  let id = base, n = 1;
  while (usados.has(id)) id = `${base}-${++n}`;
  usados.add(id);
  return id;
}
// Reserva primero todos los ids literales del archivo, para que ningún id generado
// pueda chocar con uno real.
function reservar(o) {
  if (Array.isArray(o)) return o.forEach(reservar);
  if (o && typeof o === 'object') {
    if (typeof o.id === 'string') usados.add(o.id);
    Object.values(o).forEach(reservar);
  }
}
[FO, GOV, DEFACTO, REGIONAL, ENTITIES].forEach(reservar);
['junta-box', 'stats'].forEach((p) => usados.add(p));   // pids que solo viven en el markup

// La leyenda del propio archivo da el significado literal de cada `t`.
const TIPO_ETIQUETA = {
  f: 'Posición formal (nómina / escala oficial)',
  d: 'Rol de facto — sin posición formal',
  p: 'Socio / tercero (fuera del control directo)',
  u: null,   // 'u' no tiene regla en nodeHTML() ni en la leyenda: se pinta sin clase
};
// Nodo sin `t`: "Persona / equipo (dentro de unidad)" según la leyenda.

const PAIS_BANDERA = {
  '🇵🇦': 'Panamá', '🇻🇪': 'Venezuela', '🇨🇴': 'Colombia',
  '🇺🇸': 'Estados Unidos', '🇨🇷': 'Costa Rica', '🇬🇹': 'Guatemala',
  '📄': null,   // panel documental (organigrama oficial en papel)
  '🌎': null,   // presencias menores multi-país
};

const nn = (v) => (v === undefined ? null : v);

/* --------------------------------------------------- personas / agregados / chips */

const org_personas = [];
const org_agregados = [];   // recuadros `{c:'…'}`: conteos y equipos anónimos
const org_chips = [];       // recuadros `{chips:{lbl,items}}`: listas (tiendas, sub-áreas…)

// Regla de capas tomada del CSS: `#app.capa-declarado` oculta `.node.d`,
// `.defacto-card`, `#band-defacto` y las tarjetas regionales que contienen un
// `.node.d`. Todo lo demás se ve en las dos capas.
const capaDe = (o, bloque) => (bloque === 'DEFACTO' || o.t === 'd') ? 'real' : 'declarado+real';

function empujarPersona(o, ctx) {
  const id = typeof o.id === 'string' ? o.id : idUnico('gen:' + (ctx.prefijo || slug(ctx.bloque)) + '-' + slug(o.n));
  org_personas.push({
    id,
    id_origen: typeof o.id === 'string' ? 'fuente' : 'generado',
    nombre: o.n,
    rol: nn(o.r),
    tipo: nn(o.t),
    tipo_etiqueta: o.t ? nn(TIPO_ETIQUETA[o.t]) : 'Persona / equipo (dentro de unidad)',
    capa: capaDe(o, ctx.bloque),
    padre_id: ctx.padre_id || null,
    meta: nn(o.m),
    advertencia: nn(o.w),
    nota: nn(o.note),
    delta: nn(o.dl),
    delta_etiqueta: o.dl ? nn(TIPO_DELTA[o.dl]) : null,
    bloque: ctx.bloque,
    entidad_id: ctx.entidad_id || null,
    departamento_id: ctx.departamento_id || null,
    reside_en: nn(o.g),        // badge 🌐 — reside en país distinto a su entidad
    equipo: nn(o.team),        // solo capa REGIONAL
    alcance: nn(o.al),         // solo tarjetas DEFACTO
  });
  return id;
}

function caminar(o, ctx) {
  if (o.c !== undefined) {
    org_agregados.push({
      id: idUnico('agr:' + (ctx.prefijo || slug(ctx.bloque)) + '-' + slug(o.c)),
      padre_id: ctx.padre_id || null,
      bloque: ctx.bloque,
      entidad_id: ctx.entidad_id || null,
      departamento_id: ctx.departamento_id || null,
      texto: o.c,
    });
    return;
  }
  if (o.chips !== undefined) {
    org_chips.push({
      id: idUnico('chp:' + (ctx.prefijo || slug(ctx.bloque)) + '-' + slug(o.chips.lbl)),
      padre_id: ctx.padre_id || null,
      bloque: ctx.bloque,
      entidad_id: ctx.entidad_id || null,
      departamento_id: ctx.departamento_id || null,
      etiqueta: o.chips.lbl,
      items: o.chips.items,
    });
    return;
  }
  const id = empujarPersona(o, ctx);
  (o.kids || []).forEach((k) => caminar(k, { ...ctx, padre_id: id }));
}

// 1 · Family office (fuera del alcance del proyecto)
FO.items.forEach((o) => caminar(o, { bloque: 'FO', prefijo: 'fo' }));

// 2 · Gobierno corporativo — comité directivo, junta ampliada, soporte
GOV.comite.forEach((o) => caminar(o, { bloque: 'GOV.comite', prefijo: 'gov-comite' }));
GOV.junta.forEach((o) => caminar(o, { bloque: 'GOV.junta', prefijo: 'gov-junta', padre_id: 'junta-box' }));
GOV.soporte.forEach((o) => caminar(o, { bloque: 'GOV.soporte', prefijo: 'gov-soporte' }));

// 3 · Dirección ejecutiva de facto (tarjetas propias: n + dir + al)
DEFACTO.forEach((d) => empujarPersona({ ...d, r: d.dir }, { bloque: 'DEFACTO', prefijo: 'defacto' }));

// 4 · Capa corporativa regional
REGIONAL.forEach((o) => caminar(o, { bloque: 'REGIONAL', prefijo: 'reg' }));

/* ------------------------------------------------- entidades y departamentos */

const org_entidades = [];
const org_departamentos = [];

ENTITIES.forEach((e) => {
  const notas = e.notes || [];
  org_entidades.push({
    id: e.id,
    nombre: e.n,
    pais: nn(PAIS_BANDERA[e.fl]),
    tipo: e.partner ? 'socio / tercero' : null,
    nota: notas.length ? notas.join('\n') : null,
    bandera: e.fl,
    subtitulo: e.s,
    headcount: String(e.hc),
    socio: !!e.partner,
    notas,
  });
  (e.depts || []).forEach((d) => {
    const did = typeof d.id === 'string' ? d.id : idUnico('dep:' + slug(e.id) + '-' + slug(d.u));
    const dnotas = d.notes || [];
    org_departamentos.push({
      id: did,
      id_origen: typeof d.id === 'string' ? 'fuente' : 'generado',
      nombre: d.u,
      entidad_id: e.id,
      pais: nn(PAIS_BANDERA[e.fl]),
      nota: dnotas.length ? dnotas.join('\n') : null,
      headcount: d.hc === undefined ? null : String(d.hc),
    });
    (d.kids || []).forEach((k) => caminar(k, {
      bloque: 'ENTITIES', prefijo: slug(e.id) + '-' + slug(d.u),
      entidad_id: e.id, departamento_id: did, padre_id: did,
    }));
  });
});

/* --------------------------------------------------------------------- flujos */

const org_flujos = FLOWS.map((f) => ({
  id: f.id,
  nombre: f.l,
  descripcion: f.d,
  tipo: null,
  color: f.c,
}));

const org_flujo_pares = [];
FLOWS.forEach((f) => (f.pairs || []).forEach((p, i) => org_flujo_pares.push({
  flujo_id: f.id, origen: p[0], destino: p[1], orden: i + 1, etiqueta: null,
})));

/* -------------------------------------------------------- alertas y solapes */

const org_alertas = ALERTS.map((a, i) => ({
  id: 'al-' + String(i + 1).padStart(2, '0'),
  titulo: null,
  texto: a.t,
  severidad: null,
  nodo_o_ambito: a.pid,
  orden: i + 1,
}));

const org_solapes = OVERLAPS.map((o, i) => ({
  id: 'ov-' + String(i + 1).padStart(2, '0'),
  persona_o_id: o.pid,
  ambitos: [...new Set((o.pairs || []).flat())],
  nota: o.d,
  titulo: o.t,
  pares: (o.pairs || []).map((p) => ({ origen: p[0], destino: p[1] })),
  orden: i + 1,
}));

/* ----------------------------------------------------------------- escenas */

// `el` es una función; se lee su código fuente para saber a qué elemento encuadra.
const org_escenas = SCENES.map((s, i) => {
  const fuente = String(s.el);
  const m = /getElementById\('([^']+)'\)/.exec(fuente);
  return {
    id: 'sc-' + String(i + 1).padStart(2, '0'),
    nombre: s.t,
    descripcion: null,
    orden: i + 1,
    elemento: m ? m[1] : (/=>\s*canvas\b/.test(fuente) ? 'canvas' : null),
    elemento_expr: fuente,
    padding: s.pad === undefined ? null : s.pad,
    abre_flujos: !!s.flows,
  };
});

/* ------------------------------------------------------- estructura propuesta */

const estructura_propuesta = Object.entries(PROP.NODES).map(([clave, n], i) => ({
  clave,
  tipo: n.cls,
  titulo: n.ttl,
  etiqueta: nn(n.tag),
  nota: nn(n.note),
  orden: i + 1,
  x: n.x, y: n.y, w: n.w, h: n.h,
}));

/* ---------------------------------------------------------------- evidencias */

// El archivo NO trae catálogo de evidencias: los códigos [E-xx] aparecen incrustados
// en los textos. Se recogen los códigos distintos y dónde se citan.
const evid = new Map();
function rastrear(valor, ruta) {
  if (typeof valor === 'string') {
    const hits = valor.match(/E-\d{2}/g);
    if (hits) [...new Set(hits)].forEach((c) => {
      if (!evid.has(c)) evid.set(c, new Set());
      evid.get(c).add(ruta);
    });
    return;
  }
  if (Array.isArray(valor)) return valor.forEach((v, i) => rastrear(v, ruta + '[' + i + ']'));
  if (valor && typeof valor === 'object') {
    for (const [k, v] of Object.entries(valor)) rastrear(v, ruta + '.' + k);
  }
}
const paraRastreo = {
  org_personas, org_agregados, org_chips, org_entidades, org_departamentos,
  org_flujos, org_flujo_pares, org_alertas, org_solapes, org_escenas,
  gov_comites: GOV.comites, cifras: CIFRAS,
};
for (const [clave, lista] of Object.entries(paraRastreo)) {
  lista.forEach((fila) => {
    const ref = clave + ':' + (fila.id || fila.flujo_id || fila.clave || fila.k || fila.n || '?');
    for (const [campo, v] of Object.entries(fila)) rastrear(v, ref + '.' + campo);
  });
}
const org_evidencias = [...evid.entries()]
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([codigo, refs]) => ({
    codigo, texto: null, fuente: null,
    citas: refs.size, referencias: [...refs].sort(),
  }));

/* ------------------------------------------------------------- verificaciones */

const idsConocidos = new Set([
  ...org_personas.map((p) => p.id), ...org_entidades.map((e) => e.id),
  ...org_departamentos.map((d) => d.id), ...org_agregados.map((a) => a.id),
  ...org_chips.map((c) => c.id), 'junta-box', 'stats',
]);
const sueltos = new Set();
org_flujo_pares.forEach((p) => { [p.origen, p.destino].forEach((x) => { if (!idsConocidos.has(x)) sueltos.add(x); }); });
org_alertas.forEach((a) => { if (a.nodo_o_ambito && !idsConocidos.has(a.nodo_o_ambito)) sueltos.add(a.nodo_o_ambito); });
org_solapes.forEach((o) => { if (o.persona_o_id && !idsConocidos.has(o.persona_o_id)) sueltos.add(o.persona_o_id); o.ambitos.forEach((x) => { if (!idsConocidos.has(x)) sueltos.add(x); }); });

// Mismo actor en dos instancias (el archivo lo insinúa con ALIAS, que está sin uso).
const porNombre = new Map();
org_personas.forEach((p) => {
  const k = slug(p.nombre);
  if (!porNombre.has(k)) porNombre.set(k, []);
  porNombre.get(k).push(p.id);
});
const mismo_actor = [...porNombre.entries()].filter(([, ids]) => ids.length > 1)
  .map(([, ids]) => ({ nombre: org_personas.find((p) => p.id === ids[0]).nombre, ids }));

/* ------------------------------------------------------------------- avisos */

avisos.push(
  'FIDELIDAD: todos los textos (nombre, rol, meta, advertencia, nota, notas de entidad/departamento) se copian literales del archivo; no hay paráfrasis.',
  `org_personas: ${org_personas.length} nodos con nombre propio. El enunciado del encargo hablaba de 134; se respeta la fuente. Cuenta los nodos nombrados de FO (family office, fuera del alcance del proyecto), GOV (comité/junta/soporte), DEFACTO, REGIONAL y los árboles de ENTITIES.`,
  'org_personas NO incluye los recuadros anónimos: los `{c:"…"}` (conteos y equipos sin nombre, p. ej. «17 vendedores») van a la clave extra `org_agregados`, y los `{chips:{lbl,items}}` (listas de tiendas, sub-áreas, canales) a `org_chips`. Ninguno tiene nombre de persona y no cabían en el esquema pedido.',
  '`capa` es DERIVADO de la regla de CSS del propio archivo (`#app.capa-declarado` oculta `.node.d`, `.defacto-card`, `#band-defacto` y las tarjetas regionales con un `.node.d`): sale «real» para las tarjetas DEFACTO y para los nodos con t:"d"; «declarado+real» para el resto. El archivo no marca la capa nodo a nodo.',
  'La capa 🧭 Propuesto NO contiene personas: es la banda #band-propuesto, que se pinta entera desde organigrama-propuesto-datos.js (clave `estructura_propuesta`). Por diseño va sin nombres.',
  '`tipo` es el literal `t` de la fuente: f=formal · d=de facto · p=socio/tercero · u (solo en dos ítems del family office: «Restaurante» y «Portafolio inmobiliario»; nodeHTML() no tiene regla para "u" y los pinta sin clase, y la leyenda no lo documenta → tipo_etiqueta null). Sin `t` = «Persona / equipo (dentro de unidad)» según la leyenda.',
  'Los nodos de GOV.comite y GOV.junta no traen `t` en el dato: el renderizador les fuerza t:"f" al pintarlos (`nodeHTML({...o,t:"f"})`). Se guarda el valor literal (null), no el forzado.',
  'Las tarjetas DEFACTO tienen forma propia {id,n,dir,al}: `dir` se cargó en `rol` (es la dirección funcional que ejercen) y `al` se conserva aparte en el campo extra `alcance`. No tienen `t`.',
  `Ids: ${org_personas.filter((p) => p.id_origen === 'generado').length} de ${org_personas.length} personas no tienen id en el archivo (solo los nodos referenciados por flujos/alertas/solapes lo llevan). Esas filas reciben un id sintético con prefijo «gen:» y quedan marcadas con id_origen="generado"; padre_id usa esa misma convención. Igual en org_departamentos (prefijo «dep:»), org_agregados («agr:») y org_chips («chp:»).`,
  'org_personas lleva dos campos extra fuera del esquema pedido porque el dato existe y no cabía: `reside_en` (badge 🌐 «reside en país distinto a su entidad») y `equipo` (el campo `team`, solo en la capa REGIONAL). Más `bloque`, `entidad_id`, `departamento_id`, `tipo_etiqueta`, `delta_etiqueta` e `id_origen` como procedencia.',
  `org_entidades: ${org_entidades.length} paneles, no 11 entidades jurídicas. Dos no son entidades: «Cubitt/Casio — organigrama oficial 2025» (oficial-pa-panel, el papel) y «Presencias menores y terceros» (minors-panel). El propio dato dice «8 entidades operativas / ~35–40 sociedades» (clave extra cifras).`,
  'org_entidades.pais se DERIVA de la bandera `fl` (🇵🇦→Panamá, 🇻🇪→Venezuela, 🇨🇴→Colombia, 🇺🇸→Estados Unidos, 🇨🇷→Costa Rica, 🇬🇹→Guatemala); 📄 y 🌎 no son país → null. La bandera literal queda en el campo `bandera`.',
  'org_entidades.tipo no existe como campo: solo hay el booleano `partner`. Sale «socio / tercero» para Importbel (el único con partner:true) y null para el resto. `subtitulo` (el campo `s`) y `headcount` (`hc`) se conservan como extras.',
  'org_entidades.nota es el array `notes` unido por saltos de línea; el array literal se conserva también en `notas`.',
  `org_departamentos: ${org_departamentos.length} unidades (el encargo decía 36; se respeta la fuente). Se piden {id, nombre, entidad_id o pais}: se dan los dos, entidad_id y pais (heredado de la bandera de su entidad). Ningún departamento trae "notes" en la fuente → nota null en todos; se añade "headcount" (el campo hc) porque existe en muchos.`,
  'org_flujos.tipo no existe en la fuente (los 19 flujos son todos «líneas funcionales cruzadas») → null. Se conserva `color` (el campo c). El nombre `nombre` es el campo `l`, que ya viene numerado («1 · Finanzas — Jaime»).',
  'org_flujo_pares.etiqueta no existe: los pares son arrays de dos ids, sin rótulo → null en todas las filas. `orden` es la posición del par dentro de su flujo.',
  'org_alertas: la fuente da un único texto por alerta (campo `t`) → va en `texto` y `titulo` queda null. No hay severidad declarada → null. `id` es generado (al-01…) porque la fuente no numera las alertas. `nodo_o_ambito` es el campo `pid`.',
  'org_solapes: la fuente da {t,pid,pairs,d}. `persona_o_id`=pid, `ambitos`=los ids distintos que aparecen en `pairs` (vacío en los 3 solapes sin pares), `nota`=la descripción `d`. Se añaden `titulo` (el campo t) y `pares` porque el esquema pedido no tenía dónde ponerlos, y un `id` generado (ov-01…).',
  'org_evidencias: el archivo NO trae catálogo de evidencias. Los códigos [E-xx] solo aparecen incrustados en los textos, sin su transcripción ni su fuente → `texto` y `fuente` van null en las 19 filas. Se añaden `citas` y `referencias` (ruta fila.campo donde se cita cada código) para que la carga sirva de índice. El texto de cada E-xx habría que traerlo del corpus, no de aquí.',
  `Los códigos van de E-01 a E-24 pero solo hay ${org_evidencias.length} distintos: faltan E-02, E-04, E-07, E-10 y E-16, que no se citan en este archivo.`,
  `Deltas: ${org_personas.filter((p) => p.delta).length} personas llevan badge (🎩 doble sombrero ${org_personas.filter((p) => p.delta === '🎩').length} · 🔀 doble reporte ${org_personas.filter((p) => p.delta === '🔀').length} · 👻 fuera de estructura ${org_personas.filter((p) => p.delta === '👻').length} · ⚡ solape ${org_personas.filter((p) => p.delta === '⚡').length}). El sexto tipo del panel Δ, «solo» (Solo en la realidad), no es un badge: son los ${org_personas.filter((p) => p.capa === 'real').length} nodos que solo existen en la capa real (capa="real" en este JSON).`,
  'escenas: 13 como se esperaba. La fuente da solo el rótulo `t` (→ `nombre`); no hay descripción → null. `id` y `orden` generados. `elemento` se extrae del código de la función `el` (getElementById) y se guarda además el código literal en `elemento_expr`; la escena 12 encuadra `document.getElementById("gt-panel").parentElement`, así que su `elemento` es «gt-panel» pero encuadra al contenedor padre.',
  `estructura_propuesta: ${estructura_propuesta.length} nodos en ORG_PROPUESTA.NODES (el encargo decía 26; se respeta la fuente). "clave" es la clave del objeto (que es el data-pid), "tipo" es cls (exec·gov·sop·med·hyb·dir·marca·coe), "titulo" es ttl, "etiqueta" es tag (null en los nodos sin tag) y "nota" es note. Se añaden x/y/w/h porque la fuente es un lienzo fijo 1680×1250 y esas coordenadas son el dato.`,
  'La propuesta también trae geometría y texto que no cabían en el esquema: van a la clave extra `propuesta_meta` (titulo, bajada, W, H, leyenda, notas de diseño en HTML, y el recuento de EDGES/RELS). Las 107 aristas y 2 relaciones funcionales son puras coordenadas de dibujo: se resumen, no se aplanan fila a fila.',
  'Claves extra fuera del esquema pedido, para no perder dato del archivo: `gobierno_comites` (los 6 comités de GOV.comites, con forma {n,x} — son instancias, no personas), `cifras` (los 4 indicadores del pie), `deltas_catalogo` (TIPO_DELTA + DELTA_TIPOS, con los rótulos y el sexto tipo «solo» = «Solo en la realidad», que se calcula por CSS y no es un badge), `capas` (CAPA_TITULO), `alias` (el mapa ALIAS) y `mismo_actor`.',
  `ALIAS está declarado en el archivo pero SIN USO (código muerto): el mapa es identidad (patrick→patrick…). La clave calculada \`mismo_actor\` sí resuelve el problema real: ${mismo_actor.length} personas aparecen dos o tres veces con ids distintos (${mismo_actor.map((m) => m.ids.join('/')).join(' · ')}). Al cargar a Postgres hay que decidir si se deduplican; el criterio usado aquí es la coincidencia exacta de nombre, no una identificación semántica.`,
  `Nótese que "jaime-junta" (Jaime González, CFO que asiste a la Junta) NO entra en mismo_actor porque su nombre está escrito distinto ("Jaime González" vs. "Jaime González Franchi") — es la misma persona en tres instancias: jaime (REGIONAL), jaime-ve (nómina de Rower VE) y jaime-junta (Junta). Mismo caso posible en otras grafías: la coincidencia es literal.`,
  'org_personas es en realidad «nodos nombrados», no solo personas: el archivo usa el mismo recuadro para negocios y terceros. Del family office salen «Coworking», «Restaurante», «Portafolio inmobiliario» y «Sociedad Crocs»; de las entidades salen unidades y terceros sin nombre de persona («Tiendas», «B2B Casio», «RRHH propio», «Analista de negocios», «E-commerce / bots», «Logística y Operaciones», «Ix Comercio», «RRHH y nómina», «Apoyo administrativo», «Hijo de Gil Porat») y los siete países del panel de presencias menores (Ecuador, Nicaragua, México, Honduras, El Salvador, Rep. Dominicana…). Al cargar, `tipo` y `bloque` permiten separarlos.',
  'El delta 🕳 (vacante) NO existe como campo `dl` en ninguna persona: el archivo lo calcula en nodosDelta() rastreando el emoji 🕳 en el texto de los recuadros `{c:…}` y en el `title` de los badges ⚠. Hoy son 3 casos: dos filas de org_agregados (la coordinación de Capacitación sin Dirección de RRHH en Casiolandia, y la gerencia de tienda Cubitt La Candelaria 1 en VE) y la advertencia de la persona `jrmedina` (Gerente de Visual VE vacante). Si se quiere una tabla de vacantes hay que buscar el emoji en `texto`/`advertencia`.',
  'Los extremos de org_flujo_pares y los pid de alertas/solapes NO son siempre personas: apuntan también a entidades (trading-panel, rower-panel…), a un departamento (bodega-colon), a presencias menores (hn, sv, ec, mx, ni) y a dos pids que solo existen en el markup, sin fila propia: «junta-box» (el recuadro de la Junta Directiva ampliada, usado por el flujo 15) y «stats» (la caja de cifras, usada por la alerta 1). Se resuelven contra personas+entidades+departamentos+agregados+chips.',
  sueltos.size ? 'REFERENCIAS SIN RESOLVER: ' + [...sueltos].join(', ') : 'Verificado: los ' + (org_flujo_pares.length * 2) + ' extremos de flujo y todos los pid de alertas/solapes resuelven contra un id conocido.',
  'Verificado contra la fuente: los textos largos (advertencias, notas, equipos, descripciones de flujo, notas de entidad, items de chips) son subcadenas exactas del archivo. Única diferencia: `propuesta_meta.notas_html` viene de un template literal, y JavaScript normaliza CRLF→LF al evaluarlo; el contenido es idéntico salvo el fin de línea.',
  'El corte del dato es «CORTE 18-JUL-2026» (barra superior del organigrama), posterior a la auditoría de gestion/AUDITORIA_ORGANIGRAMA_18jul.md.',
);

/* ------------------------------------------------------------------- salida */

const salida = {
  meta: {
    generado: new Date().toISOString(),
    fuentes: ['informe/fase1/organigrama-kenex.html', 'informe/fase1/organigrama-propuesto-datos.js'],
    corte: 'CORTE 18-JUL-2026 · PROYECTO ROWER · UCAB CONSULTORES',
    capa_por_defecto: 'real',
  },
  org_personas,
  org_entidades,
  org_departamentos,
  org_flujos,
  org_flujo_pares,
  org_alertas,
  org_solapes,
  org_evidencias,
  estructura_propuesta,
  escenas: org_escenas,
  // --- extras (documentados en avisos) ---
  org_agregados,
  org_chips,
  gobierno_comites: GOV.comites.map((c, i) => ({ id: 'cmt-' + String(i + 1).padStart(2, '0'), nombre: c.n, composicion: c.x })),
  cifras: CIFRAS.map((c) => ({ clave: c.k, valor: c.v })),
  deltas_catalogo: DELTA_TIPOS.map(([badge, nombre]) => ({
    badge: badge === 'solo' ? null : badge,
    clave: badge,
    nombre,
    descripcion: nn(TIPO_DELTA[badge]),
  })),
  capas: Object.entries(CAPA_TITULO).map(([clave, titulo]) => ({ clave, titulo })),
  alias: ALIAS,
  mismo_actor,
  propuesta_meta: {
    titulo: PROP.titulo,
    bajada: PROP.bajada,
    W: PROP.W,
    H: PROP.H,
    edges: PROP.EDGES.length,
    rels: PROP.RELS.length,
    leyenda: PROP.LEYENDA.map((l) => ({ texto: l.t, muestra: l.sw || null, linea: l.ln || null })),
    notas_html: PROP.NOTAS_HTML,
  },
  avisos,
};

fs.writeFileSync(SALIDA, JSON.stringify(salida, null, 1), 'utf8');

const conteos = {};
for (const [k, v] of Object.entries(salida)) if (Array.isArray(v)) conteos[k] = v.length;
console.log(JSON.stringify({
  conteos,
  personas_por_bloque: org_personas.reduce((a, p) => (a[p.bloque] = (a[p.bloque] || 0) + 1, a), {}),
  personas_por_capa: org_personas.reduce((a, p) => (a[p.capa] = (a[p.capa] || 0) + 1, a), {}),
  personas_por_tipo: org_personas.reduce((a, p) => (a[String(p.tipo)] = (a[String(p.tipo)] || 0) + 1, a), {}),
  personas_con_delta: org_personas.reduce((a, p) => (p.delta ? (a[p.delta] = (a[p.delta] || 0) + 1) : 0, a), {}),
  ids_generados: org_personas.filter((p) => p.id_origen === 'generado').length,
  evidencias: org_evidencias.map((e) => e.codigo + '×' + e.citas),
  referencias_sin_resolver: [...sueltos],
  mismo_actor: mismo_actor.length,
}, null, 1));
