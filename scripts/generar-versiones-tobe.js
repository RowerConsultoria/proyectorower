/* Genera informe/fase2/manual-versiones.js: las versiones del To-Be de cada proceso.
 *
 *   node scripts/generar-versiones-tobe.js              escribe el archivo
 *   node scripts/generar-versiones-tobe.js --comprobar  sale con 1 si está desfasado
 *
 * Recorre el historial de git de informe/fase2/manual-contenido.js (el To-Be) y,
 * commit a commit, calcula la huella de cada proceso con el mismo algoritmo que
 * `vtHuella()` de informe-fase2.html. Una versión nueva de un proceso es un commit
 * en el que su huella cambia; se guarda qué secciones cambiaron. Las notas del
 * comité llevan la huella sobre la que se anotaron, así que la línea de tiempo del
 * proceso puede decir «se anotó sobre la versión del 4-oct» y «el To-Be cambió
 * después».
 *
 * Solo cuenta lo que está en git: volver a correrlo DESPUÉS de commitear un cambio
 * del manual, y commitear también el archivo generado. Si se olvida, la página
 * marca la versión vigente como «aún no registrada», y --comprobar lo detecta.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const RAIZ = path.join(__dirname, '..');
const FUENTE = 'informe/fase2/manual-contenido.js';
const SALIDA = path.join(RAIZ, 'informe', 'fase2', 'manual-versiones.js');
const SECCIONES = ['proposito', 'dueno', 'disparador', 'flujo', 'riesgos', 'indicadores'];

const orden = k => (SECCIONES.includes(k) ? SECCIONES.indexOf(k) : 99);

function git(args) {
  return execFileSync('git', args, { cwd: RAIZ, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

function cargar(texto) {
  const w = {};
  new Function('window', texto)(w);
  return w.MANUAL_CONTENIDO || {};
}

// El mismo cálculo que huellaDe() en la página: djb2 sobre el JSON del proceso + su largo,
// sin las claves que empiezan por «_» (maquetación que flujo-render.js guarda en los nodos).
function huella(obj) {
  const s = JSON.stringify(obj || {}, (k, v) => (k.charAt(0) === '_' ? undefined : v));
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(16) + '-' + s.length;
}

// Del más viejo al más nuevo. %x1f separa los campos: un asunto puede llevar «|».
const commits = git(['log', '--reverse', '--format=%H%x1f%cI%x1f%an%x1f%s', '--', FUENTE])
  .split('\n').filter(Boolean)
  .map(l => { const [h, fecha, autor, asunto] = l.split('\x1f'); return { h, fecha, autor, asunto }; });
if (!commits.length) { console.error('No hay historial de ' + FUENTE); process.exit(1); }

const ultimo = {};           // código → {huella, secciones: {sec: huella}}
const procesos = {};         // código → [[índice de commit, huella, [secciones que cambiaron]]]
const usados = [];           // commits que cambiaron al menos un proceso

commits.forEach(c => {
  let datos;
  try { datos = cargar(git(['show', c.h + ':' + FUENTE])); }
  catch (e) { console.warn('Se salta ' + c.h.slice(0, 7) + ': ' + e.message); return; }
  let idx = -1;
  Object.keys(datos).forEach(pref => {
    const procs = (datos[pref] && datos[pref].procesos) || {};
    Object.keys(procs).forEach(cod => {
      const p = procs[cod], hh = huella(p), antes = ultimo[cod];
      if (antes && antes.huella === hh) return;
      const secs = {};
      Object.keys(p || {}).forEach(k => { secs[k] = huella(p[k]); });
      let cambio;
      if (!antes) cambio = [];             // primera versión: no se compara con nada
      else {
        const claves = new Set(Object.keys(secs).concat(Object.keys(antes.secciones)));
        cambio = [...claves].filter(k => secs[k] !== antes.secciones[k])
          .map(k => SECCIONES.includes(k) ? k : 'otros')
          .filter((k, i, a) => a.indexOf(k) === i)
          .sort((a, b) => orden(a) - orden(b));
      }
      if (idx < 0) { idx = usados.length; usados.push(c); }
      (procesos[cod] = procesos[cod] || []).push([idx, hh, cambio]);
      ultimo[cod] = { huella: hh, secciones: secs };
    });
  });
});

const dato = {
  generado: 'node scripts/generar-versiones-tobe.js',
  // Sin asunto ni autor: el archivo lo descarga cualquier lector del manual y los mensajes de commit son internos.
  commits: usados.map(c => [c.fecha, c.h.slice(0, 7)]),
  procesos
};
const texto =
  '// GENERADO por `node scripts/generar-versiones-tobe.js` desde el historial de git de\n' +
  '// manual-contenido.js. No editar a mano: volver a correrlo tras commitear un cambio del To-Be.\n' +
  '// commits: [fecha, hash] · procesos: código → [[commit, huella, secciones que cambiaron]]\n' +
  'window.MANUAL_VERSIONES = ' + JSON.stringify(dato) + ';\n';

if (process.argv.includes('--comprobar')) {
  // El archivo escrito debe coincidir con lo que sale de git, y la última versión
  // de cada proceso con el To-Be que hay en disco.
  const actual = fs.existsSync(SALIDA) ? fs.readFileSync(SALIDA, 'utf8') : '';
  const disco = cargar(fs.readFileSync(path.join(RAIZ, FUENTE), 'utf8'));
  const sinRegistrar = [];
  Object.keys(disco).forEach(pref => Object.keys((disco[pref] && disco[pref].procesos) || {}).forEach(cod => {
    const v = procesos[cod];
    if (!v || v[v.length - 1][1] !== huella(disco[pref].procesos[cod])) sinRegistrar.push(cod);
  }));
  let mal = false;
  if (actual !== texto) { console.error('manual-versiones.js está desfasado del historial de git: vuelve a correr el generador.'); mal = true; }
  if (sinRegistrar.length) { console.error('To-Be en disco sin commitear o sin registrar (' + sinRegistrar.length + '): ' + sinRegistrar.slice(0, 12).join(', ') + (sinRegistrar.length > 12 ? '…' : '')); mal = true; }
  if (!mal) console.log('OK: ' + Object.keys(procesos).length + ' procesos, ' + usados.length + ' commits con cambios.');
  process.exit(mal ? 1 : 0);
}

fs.writeFileSync(SALIDA, texto);
const n = Object.values(procesos).reduce((s, v) => s + v.length, 0);
console.log('Escrito ' + path.relative(RAIZ, SALIDA) + ': ' + Object.keys(procesos).length + ' procesos, ' +
            n + ' versiones, ' + usados.length + ' de ' + commits.length + ' commits, ' + Math.round(texto.length / 1024) + ' KB.');
