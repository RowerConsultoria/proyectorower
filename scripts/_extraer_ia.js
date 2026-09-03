// Extrae la arquitectura de IA (la torre) y las reglas del prototipo a JSON.
// Uso: node scripts/_extraer_ia.js <salida.json> [raiz-del-repo]
//
// Dos técnicas distintas a propósito:
//  · `arquitectura-datos.js` es dato puro y ya trae module.exports → require().
//  · `sistema/nucleo/agentes.js` es lógica viva que espera globales de
//    sistema/datos/*.js; requerirlo lo ejecutaría. Así que de ahí se extraen
//    los literales por equilibrio de llaves, SIN correr nada.
const fs = require('fs');
const path = require('path');

const SALIDA = process.argv[2];
const REPO = process.argv[3] || path.join(__dirname, '..');
if (!SALIDA) { console.error('Falta el archivo de salida.'); process.exit(2); }

// ---------------------------------------------------------------- la torre
const A = require(path.join(REPO, 'informe', 'fase1', 'arquitectura-datos.js'));

const ia_niveles = A.NIVELES.map((n) => ({
  id: n.id, n: n.n, nombre: n.nombre, capa: n.capa, lema: n.lema,
  que: n.que, no_hace: n.noHace,
}));

const ia_nivel_hace = A.NIVELES.flatMap((n) =>
  (n.hace || []).map((t, i) => ({ nivel_id: n.id, orden: i + 1, texto: t })));

const ia_agentes = A.NIVELES.flatMap((n) =>
  (n.agentes || []).map((a, i) => ({
    nivel_id: n.id, orden: i + 1, nombre: a.nombre,
    autonomia: a.nivel, que: a.que,
    // El verbo con que el agente reporta lo que hizo, según su autonomía.
    autonomia_verbo: (A.AUTONOMIA[a.nivel] || {}).verbo || null,
  })));

const ia_raices = A.RAICES.map((r, i) => ({
  id: r.id, orden: i + 1, nombre: r.nombre, dato: r.dato,
  via: r.via, via_rotulo: (A.VIAS[r.via] || {}).rotulo || null,
  cadencia: r.cadencia, dueno: r.dueno, nivel: r.nivel,
  hoy: r.hoy, rompe: r.rompe, grado: r.grado, ritmo: r.ritmo,
}));

const ia_bajadas = A.BAJADAS.map((b, i) => ({
  id: b.id, orden: i + 1, desde: b.desde, hacia: b.hacia, que: b.que, nota: b.nota,
}));

const ia_cedazo_criterios = (A.CEDAZO.criterios || []).map((t, i) => ({
  orden: i + 1, texto: t,
}));

const ia_vias = Object.entries(A.VIAS).map(([clave, v]) => ({
  clave, rotulo: v.rotulo, detalle: v.detalle,
}));

// ------------------------------------------------------- el prototipo
const srcAg = fs.readFileSync(path.join(REPO, 'sistema', 'nucleo', 'agentes.js'), 'utf8');

function literal(src, nombre) {
  const m = new RegExp('const\\s+' + nombre + '\\s*=\\s*').exec(src);
  if (!m) throw new Error('No encontré const ' + nombre);
  let i = m.index + m[0].length;
  const abre = src[i], cierra = abre === '{' ? '}' : ']';
  let prof = 0, q = null, linea = false, bloque = false;
  for (; i < src.length; i++) {
    const c = src[i], d = src[i + 1];
    if (linea) { if (c === '\n') linea = false; continue; }
    if (bloque) { if (c === '*' && d === '/') { bloque = false; i++; } continue; }
    if (q) {
      if (c === '\\') { i++; continue; }
      if (c === q) q = null;
      continue;
    }
    if (c === '/' && d === '/') { linea = true; i++; continue; }
    if (c === '/' && d === '*') { bloque = true; i++; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === abre) prof++;
    else if (c === cierra) { prof--; if (prof === 0) { i++; break; } }
  }
  return new Function('return (' + src.slice(m.index + m[0].length, i) + ')')();
}

const REGLAS = literal(srcAg, 'REGLAS');
const ESCALERA = literal(srcAg, 'ESCALERA');
const ACCIONES = literal(srcAg, 'ACCIONES');

const proto_reglas = Object.entries(REGLAS).map(([clave, r], i) => ({
  clave, orden: i + 1,
  valor: String(r.v), unidad: r.unidad,
  dueno: r.dueno, desde: r.desde, version: r.ver,
}));

const proto_escalera = ESCALERA.map((e) => ({ n: e.n, clave: e.clave, texto: e.t }));

// De ACCIONES solo la ficha declarativa: `corre()` es código, no dato.
const proto_acciones = Object.entries(ACCIONES).map(([clave, a], i) => ({
  clave, orden: i + 1, modulo: a.modulo, agente: a.agente, nombre: a.nombre,
  dispara: a.dispara, cruza: a.cruza,
  eje_perimetro: (a.ejes || {}).perimetro, eje_reversibilidad: (a.ejes || {}).reversibilidad,
  eje_radio: (a.ejes || {}).radio, eje_dinero: (a.ejes || {}).dinero,
  eje_reloj: (a.ejes || {}).reloj,
}));

const salida = {
  ia_niveles, ia_nivel_hace, ia_agentes, ia_raices, ia_bajadas,
  ia_cedazo_criterios, ia_vias, ia_cedazo: A.CEDAZO, ia_numeros: A.NUMEROS,
  proto_reglas, proto_escalera, proto_acciones,
};

fs.writeFileSync(SALIDA, JSON.stringify(salida, null, 1), 'utf8');
console.log(JSON.stringify(Object.fromEntries(
  Object.entries(salida).map(([k, v]) => [k, Array.isArray(v) ? v.length : 'objeto'])), null, 1));
