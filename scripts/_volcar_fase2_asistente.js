// node scripts/_volcar_fase2_asistente.js  →  JSON por stdout
// Vuelca el dato de la Fase 2 tal como lo pinta el sitio, para que
// sincronizar-asistente.py arme con él el conocimiento del Asistente IA:
// el manual (To-Be y As-Is), el circuito, la estructura To-Be, la madurez
// documental, los funcionamientos y la arquitectura de IA (la órbita).
// Solo lee archivos del repositorio; no escribe nada.
const fs = require("fs"), path = require("path");
const F2 = path.join(__dirname, "..", "informe", "fase2");
global.window = {};
for (const f of ["manual-procesos-datos.js", "manual-contenido.js", "manual-asis.js",
                 "circuito-datos.js", "estructura-tobe-datos.js", "madurez-datos.js"]) {
  eval(fs.readFileSync(path.join(F2, f), "utf8"));
}

// literal de un bloque `var X = …;` dentro de un HTML, evaluado como JS
function literal(html, nombre) {
  const i = html.indexOf("var " + nombre + " =") >= 0 ? html.indexOf("var " + nombre + " =") : html.indexOf("var " + nombre + "=");
  if (i < 0) throw new Error("no encontré var " + nombre);
  const ini = html.indexOf(nombre, i) + nombre.length;
  const eq = html.indexOf("=", ini);
  let j = eq + 1, prof = 0, abierto = false, cad = null;
  for (; j < html.length; j++) {
    const c = html[j];
    if (cad) { if (c === "\\") { j++; continue; } if (c === cad) cad = null; continue; }
    if (c === '"' || c === "'" || c === "`") { cad = c; continue; }
    if (c === "{" || c === "[") { prof++; abierto = true; }
    else if (c === "}" || c === "]") { prof--; if (abierto && prof === 0) { j++; break; } }
  }
  return eval("(" + html.slice(eq + 1, j) + ")");
}

const func = fs.readFileSync(path.join(F2, "estructura-funcionamiento.html"), "utf8");
const arq = fs.readFileSync(path.join(F2, "arquitectura-ia.html"), "utf8");

process.stdout.write(JSON.stringify({
  mapa: window.MANUAL_FASE2,
  tobe: window.MANUAL_CONTENIDO,
  asis: window.MANUAL_ASIS,
  circuito: window.CIRCUITO,
  estructura: window.ESTRUCTURA_TOBE,
  madurez: window.MADUREZ,
  funcionamiento: { nodos: literal(func, "NODOS"), func: literal(func, "FUNC") },
  orbita: literal(arq, "D"),
}));
