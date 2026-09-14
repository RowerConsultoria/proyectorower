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
const ruta = path.join(__dirname, "..", "informe", "fase2", "manual-contenido.js");

let src = fs.readFileSync(ruta, "utf8");
src = src.replace("window.MANUAL_CONTENIDO", "globalThis.MANUAL_CONTENIDO");
// eslint-disable-next-line no-eval
eval(src);

const contenido = globalThis.MANUAL_CONTENIDO;
const prefijos = soloPrefijo ? [soloPrefijo] : Object.keys(contenido);

let totalDiagramas = 0;
let problemas = 0;

for (const prefijo of prefijos) {
  const macro = contenido[prefijo];
  if (!macro) {
    console.error(`⚠️  No hay contenido para el macro "${prefijo}" en manual-contenido.js`);
    process.exitCode = 1;
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
        console.log(`${codigo} :: NODO COLGANTE "${id}" (${tipoDe[id]}) sin arista de salida`);
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
          console.log(`${codigo} :: CICLO detectado — ${pila.join(" → ")} → ${v}`);
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
