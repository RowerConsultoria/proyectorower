// Extrae los procesos de Fase 2 a JSON, para la ronda de validación.
// Fuentes: informe/fase2/manual-procesos-datos.js  (el árbol: 20 macros / 182
// procesos, con la ficha del mapa v18) y manual-contenido.js (lo que el equipo
// ya redactó de verdad).
const fs = require('fs');
const path = require('path');

// Uso: node scripts/_extraer_fase2.js <salida.json> [raiz-del-repo]
// Lo invoca scripts/cargar-validacion.py; la raíz llega como argumento para
// que el guion sirva en cualquier máquina (sin rutas absolutas del autor).
const SALIDA = process.argv[2];
const REPO = process.argv[3] || path.join(__dirname, '..');
const RAIZ = path.join(REPO, 'informe', 'fase2');
if (!SALIDA) { console.error('Falta el archivo de salida.'); process.exit(2); }

function cargar(archivo, clave) {
  const src = fs.readFileSync(path.join(RAIZ, archivo), 'utf8');
  const sandbox = { window: {} };
  new Function('window', src)(sandbox.window);
  const v = sandbox.window[clave];
  if (!v) throw new Error(`No se pudo leer window.${clave} de ${archivo}`);
  return v;
}

const D = cargar('manual-procesos-datos.js', 'MANUAL_FASE2');
const C = cargar('manual-contenido.js', 'MANUAL_CONTENIDO');
if (!Array.isArray(D.macros)) throw new Error('MANUAL_FASE2.macros no es una lista');

// Un proceso «tiene contenido» cuando el equipo ya redactó su flujo de
// actividades. El resto de secciones puede venir del respaldo del mapa, pero
// sin flujo no hay nada que un gerente pueda validar de verdad.
function contenidoDe(macro, codigo) {
  const m = C[String(macro)];
  return (m && m.procesos) ? (m.procesos[codigo] || null) : null;
}

function redactado(macro, codigo) {
  const p = contenidoDe(macro, codigo);
  return !!(p && p.flujo && Array.isArray(p.flujo.actividades) && p.flujo.actividades.length);
}

const procesos = [];
let orden = 0;
for (const macro of D.macros) {
  for (const p of (macro.procesos || [])) {
    const mapa = p.mapa || {};
    const hay = redactado(macro.prefijo, p.codigo);
    procesos.push({
      codigo: p.codigo,
      macro: String(macro.prefijo),
      macro_nombre: macro.n,
      nombre: p.n,
      madurez: p.madurez || null,
      dueno_texto: (mapa.dueno || '').trim() || null,
      participantes: Array.isArray(mapa.participantes) ? mapa.participantes : [],
      tiene_contenido: hay,
      // El contenido viaja a Postgres para que la Edge Function pueda servir
      // SOLO el proceso del token. Si la página pública leyera los .js del
      // manual, un enlace de un gerente de Contabilidad enseñaría de paso los
      // 92 procesos redactados — el dato se cierra donde se cierra el resto.
      contenido: hay ? { ...contenidoDe(macro.prefijo, p.codigo), mapa } : null,
      orden: ++orden,
    });
  }
}

fs.writeFileSync(SALIDA, JSON.stringify({ procesos }, null, 1), 'utf8');
const conContenido = procesos.filter((p) => p.tiene_contenido).length;
const macros = new Set(procesos.filter((p) => p.tiene_contenido).map((p) => p.macro));
console.log(`${procesos.length} procesos · ${conContenido} redactados en ${macros.size} macroprocesos`);
