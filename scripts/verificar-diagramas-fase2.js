#!/usr/bin/env node
// Verifica que todos los flujogramas de manual-contenido.js sean grafos
// acíclicos, y que ningún nodo que no sea "fin" quede sin arista de salida.
// El motor de render (flujo-render.js) calcula la columna de cada nodo por
// el camino más largo desde el inicio — eso asume un grafo acíclico; un
// ciclo hace que un nodo se posicione mal y se monte sobre otro (bug real,
// encontrado y corregido en macro 8, ver BITACORA.md 2026-09-11).
//
// Uso:
//   node scripts/verificar-diagramas-fase2.js
//   node scripts/verificar-diagramas-fase2.js 11        (solo el macro 11)
//
// Sale con código 1 si encuentra algún ciclo o nodo colgante.

const fs = require("fs");
const path = require("path");

const soloPrefijo = process.argv[2] || null;

// Se revisan LAS DOS versiones: el To-Be (manual-contenido.js) y el As-Is
// (manual-asis.js). Hasta el 24-sep-2026 este guion solo miraba el To-Be, así
// que los flujogramas del As-Is quedaban sin ninguna comprobación de ciclos,
// nodos colgantes ni coherencia rol↔carril — justo los defectos que se pagaron
// caros en los macros 8 y 9.
function cargar(archivo, global) {
  const ruta = path.join(__dirname, "..", "informe", "fase2", archivo);
  if (!fs.existsSync(ruta)) return {};
  let src = fs.readFileSync(ruta, "utf8");
  src = src.replace("window." + global, "globalThis." + global);
  // eslint-disable-next-line no-eval
  eval(src);
  return globalThis[global] || {};
}

const versiones = [
  { etiqueta: "To-Be", contenido: cargar("manual-contenido.js", "MANUAL_CONTENIDO") },
  { etiqueta: "As-Is", contenido: cargar("manual-asis.js", "MANUAL_ASIS") },
];

let totalDiagramas = 0;
let problemas = 0;

for (const { etiqueta, contenido } of versiones) {
 const prefijos = soloPrefijo ? [soloPrefijo] : Object.keys(contenido);
 for (const prefijo of prefijos) {
  const macro = contenido[prefijo];
  if (!macro) {
    // Un macro sin As-Is no es un error: el As-Is se redacta proceso a proceso.
    if (etiqueta === "To-Be") {
      console.error(`⚠️  No hay contenido para el macro "${prefijo}" en manual-contenido.js`);
      process.exitCode = 1;
    }
    continue;
  }
  const procesos = macro.procesos || {};
  for (const codigo of Object.keys(procesos)) {
    const diagrama = procesos[codigo].flujo && procesos[codigo].flujo.diagrama;
    if (!diagrama) continue;
    totalDiagramas++;

    const nodos = diagrama.nodos.map((n) => n.id);
    const tipoDe = {};
    diagrama.nodos.forEach((n) => (tipoDe[n.id] = n.tipo));
    const adyacentes = {};
    nodos.forEach((id) => (adyacentes[id] = []));
    (diagrama.aristas || []).forEach((a) => {
      if (!adyacentes[a.de]) adyacentes[a.de] = [];
      adyacentes[a.de].push(a.a);
    });

    // 1) Nodo colgante: no es "fin" y no tiene ninguna arista de salida.
    for (const id of nodos) {
      if (tipoDe[id] !== "fin" && adyacentes[id].length === 0) {
        console.log(`[${etiqueta}] ${codigo} :: NODO COLGANTE "${id}" (${tipoDe[id]}) sin arista de salida`);
        problemas++;
      }
    }

    // 2) Ciclo: DFS con coloreado (blanco=0, gris=1, negro=2).
    const color = {};
    nodos.forEach((id) => (color[id] = 0));
    let cicloEncontrado = false;
    const pila = [];
    function dfs(u) {
      color[u] = 1;
      pila.push(u);
      for (const v of adyacentes[u] || []) {
        if (color[v] === 1) {
          cicloEncontrado = true;
          console.log(`[${etiqueta}] ${codigo} :: CICLO detectado — ${pila.join(" → ")} → ${v}`);
        } else if (color[v] === 0) {
          dfs(v);
        }
      }
      pila.pop();
      color[u] = 2;
    }
    nodos.forEach((id) => {
      if (color[id] === 0) dfs(id);
    });
    if (cicloEncontrado) problemas++;

    // 3) Coherencia entre la descripción del flujo y el flujograma: todo rol que
    // ejecuta una actividad tiene que tener su carril, y todo carril tiene que
    // ejecutar algo. Sin esto, un actor puede desaparecer del dibujo aunque el
    // texto lo nombre — y peor, su paso queda dibujado en el carril de otro, que
    // es como un control de aprobación acaba pareciendo ejecutado por la misma
    // persona a la que controla (encontrado en 6.4 el 2026-09-18).
    const actividades = (procesos[codigo].flujo && procesos[codigo].flujo.actividades) || [];
    const carriles = diagrama.carriles || [];
    if (actividades.length && carriles.length) {
      const roles = [...new Set(actividades.map((a) => a.rol).filter(Boolean))];
      roles
        .filter((r) => !carriles.includes(r))
        .forEach((r) => {
          console.log(`[${etiqueta}] ${codigo} :: ROL SIN CARRIL — "${r}" ejecuta una actividad del flujo pero no aparece en el flujograma`);
          problemas++;
        });
      carriles
        .filter((c) => !roles.includes(c))
        .forEach((c) => {
          console.log(`[${etiqueta}] ${codigo} :: CARRIL SIN ROL — "${c}" tiene carril en el flujograma pero ninguna actividad del flujo`);
          problemas++;
        });
    }
  }
 }
}

console.log(
  `\n${totalDiagramas} diagrama(s) revisado(s)${soloPrefijo ? ` (macro ${soloPrefijo})` : " (todo el archivo)"} — ${problemas} problema(s) encontrado(s).`
);

if (problemas > 0) {
  process.exitCode = 1;
} else {
  console.log("✅ Sin ciclos ni nodos colgantes.");
}
