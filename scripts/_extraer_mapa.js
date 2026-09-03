// Extrae los datos del mapa de procesos (árbol + diccionarios) a JSON.
// Fuentes: informe/fase1/mapa-procesos-datos.js  y  informe/fase1/mapa-procesos-kenex.html
const fs = require('fs');
const path = require('path');

// Uso: node scripts/_extraer_mapa.js <salida.json> [raiz-del-repo]
// Lo invoca scripts/cargar-informe.py; la raíz llega como argumento para que
// el guion sirva en cualquier máquina (sin rutas absolutas del autor).
const SALIDA = process.argv[2];
const REPO = process.argv[3] || path.join(__dirname, '..');
const RAIZ = path.join(REPO, 'informe', 'fase1');
if (!SALIDA) { console.error('Falta el archivo de salida.'); process.exit(2); }

// --- 1. El árbol: window.MAPA_DATOS = { ... };
const srcDatos = fs.readFileSync(path.join(RAIZ, 'mapa-procesos-datos.js'), 'utf8');
const sandbox = { window: {} };
new Function('window', srcDatos)(sandbox.window);
const D = sandbox.window.MAPA_DATOS;
if (!D || !Array.isArray(D.macros)) throw new Error('No se pudo leer MAPA_DATOS');

// --- 2. Los diccionarios embebidos en el HTML del mapa
const srcHtml = fs.readFileSync(path.join(RAIZ, 'mapa-procesos-kenex.html'), 'utf8');

// Localiza `const NOMBRE = <literal>` y equilibra corchetes/llaves para hallar su fin.
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
    if (c === '"' || c === "'" || c === '`') { comilla = c; continue; }
    if (c === abre) prof++;
    else if (c === cierra) { prof--; if (prof === 0) { i++; break; } }
  }
  const literal = src.slice(m.index + m[0].length, i);
  return new Function('return (' + literal + ')')();
}

const ICONOS    = extraerLiteral(srcHtml, 'ICONOS');
const CORTOS    = extraerLiteral(srcHtml, 'CORTOS');
const SISTEMAS  = extraerLiteral(srcHtml, 'SISTEMAS');
const FRICCIONES= extraerLiteral(srcHtml, 'FRICCIONES');
const PRACTICAS = extraerLiteral(srcHtml, 'PRACTICAS');
const EDGES     = extraerLiteral(srcHtml, 'EDGES');
const EXTERNOS  = extraerLiteral(srcHtml, 'EXTERNOS');

// --- 3. Aplanado a filas
const CATEGORIAS = { e: 'estrategico', o: 'operativo', s: 'soporte' };

const macroprocesos = D.macros.map((m, i) => ({
  id: m.id,
  categoria: CATEGORIAS[m.cat] || m.cat,
  nombre: m.n,
  nombre_corto: CORTOS[m.id] || null,
  icono: ICONOS[m.id] || null,
  orden: i + 1,
}));

const procesos = [];
const procedimientos = [];
for (const m of D.macros) {
  (m.procesos || []).forEach((p, pi) => {
    const pid = `${m.id}.${pi + 1}`;
    procesos.push({ id: pid, macro_id: m.id, orden: pi + 1, nombre: p.n });
    (p.pr || []).forEach((pr, ri) => {
      procedimientos.push({
        id: `${pid}.${ri + 1}`,
        proceso_id: pid,
        orden: ri + 1,
        texto: pr.t,
        // El proyecto ya hace este deslinde editorialmente (cursiva azul = sugerido por UCAB)
        naturaleza: pr.sug ? 'propuesta_ucab' : 'levantado',
        fuente: 'mapa_v7',
      });
    });
  });
}

// Separa la referencia entre corchetes al final del texto: "... [6.2 · E-03]"
function partirRef(texto) {
  const m = /^(.*?)\s*\[([^\]]+)\]\s*$/s.exec(texto);
  return m ? { texto: m[1].trim(), referencia: m[2].trim() } : { texto: texto.trim(), referencia: null };
}

const aFilas = (dicc) => Object.entries(dicc).flatMap(([macro_id, lista]) =>
  lista.map((t, i) => ({ macro_id, orden: i + 1, ...partirRef(t) })));

const fricciones = aFilas(FRICCIONES);
const practicas = aFilas(PRACTICAS);

const macroproceso_sistemas = Object.entries(SISTEMAS).flatMap(([macro_id, lista]) =>
  lista.map((sistema) => ({ macro_id, sistema })));

const TIPO_ARISTA = { tr: 'troncal', cr: 'cruce_documentado', ext: 'externa' };
const cruces = EDGES.map((e, i) => ({
  orden: i + 1,
  origen: e.a,
  destino: e.b,
  tipo: TIPO_ARISTA[e.t] || e.t,
  etiqueta: e.l || null,
}));

const externos = EXTERNOS.map((e) => ({ id: e.id, nombre: e.n, icono: e.ic }));

const salida = {
  meta: D.meta,
  macroprocesos,
  procesos,
  procedimientos,
  fricciones,
  practicas,
  macroproceso_sistemas,
  cruces,
  externos,
};

fs.writeFileSync(SALIDA, JSON.stringify(salida, null, 1), 'utf8');
console.log(JSON.stringify({
  macroprocesos: macroprocesos.length,
  procesos: procesos.length,
  procedimientos: procedimientos.length,
  procedimientos_propuestos: procedimientos.filter(p => p.naturaleza === 'propuesta_ucab').length,
  procedimientos_levantados: procedimientos.filter(p => p.naturaleza === 'levantado').length,
  fricciones: fricciones.length,
  fricciones_con_ref: fricciones.filter(f => f.referencia).length,
  practicas: practicas.length,
  macroproceso_sistemas: macroproceso_sistemas.length,
  cruces: cruces.length,
  cruces_con_etiqueta: cruces.filter(c => c.etiqueta).length,
  macros_sin_procedimientos: D.macros.filter(m => !(m.procesos || []).some(p => (p.pr || []).length)).map(m => m.id),
}, null, 1));
