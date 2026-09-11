// Motor de flujogramas de «Fase 2 — Procesos» (opción A: flujo-como-dato).
//
// Recibe el flujo de un proceso como datos estructurados —carriles por rol,
// nodos (inicio/tarea/decisión/fin) con los sistemas que tocan, y aristas con
// etiqueta opcional— y lo dibuja como BPMN con carriles en SVG, con layout
// propio por capas (sin librería). Sigue las 6 convenciones BPMN del prompt
// del equipo. Temeable por variables de estilo/app.css.
//
// window.FlujoRender.svg(flujo)  -> string SVG
// window.FlujoRender.montar(cont, flujo)  -> pinta en `cont` con botón de ampliar
//
// Esquema de `flujo`:
//   { carriles: ["Rol A", "Rol B", ...],
//     nodos: [ {id, carril, tipo:"inicio|tarea|decision|fin", n:"etiqueta", sistemas:["Odoo",...] } ],
//     aristas: [ {de:"id", a:"id", etq:"Sí"} ] }

(function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";
  var COL_W = 210;      // ancho de columna (paso del flujo)
  var LANE_H = 118;     // alto de carril
  var NODE_W = 158;     // ancho de caja de tarea
  var NODE_H = 56;
  var DIAM = 62;        // lado del rombo de decisión
  var EVT = 34;         // diámetro de evento
  var PAD_L = 190;      // margen izquierdo (rótulos de carril)
  var PAD_T = 34;

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // parte un texto en <= 2-3 líneas para caber en la caja
  function lineas(txt, max) {
    max = max || 22;
    var pals = String(txt).split(/\s+/), out = [], cur = "";
    pals.forEach(function (p) {
      if ((cur + " " + p).trim().length > max && cur) { out.push(cur); cur = p; }
      else cur = (cur ? cur + " " : "") + p;
    });
    if (cur) out.push(cur);
    return out.slice(0, 3);
  }

  // --- layout por capas: columna = camino más largo desde un inicio ---
  function disponer(flujo) {
    var idx = {};
    flujo.nodos.forEach(function (n) { idx[n.id] = n; });
    var sal = {}, ent = {};
    flujo.nodos.forEach(function (n) { sal[n.id] = []; ent[n.id] = []; });
    flujo.aristas.forEach(function (e) {
      if (sal[e.de]) sal[e.de].push(e.a);
      if (ent[e.a]) ent[e.a].push(e.de);
    });

    var col = {}, visto = {};
    function prof(id, guard) {
      if (col[id] != null) return col[id];
      if (guard[id]) return 0;               // corta ciclos (loop-back)
      guard[id] = true;
      var ins = ent[id].filter(function (d) { return !guard[d]; });
      var c = ins.length ? Math.max.apply(null, ins.map(function (d) { return prof(d, guard) + 1; })) : 0;
      guard[id] = false;
      col[id] = c;
      return c;
    }
    flujo.nodos.forEach(function (n) { prof(n.id, {}); });

    // normaliza columnas a enteros consecutivos
    var cols = flujo.nodos.map(function (n) { return col[n.id]; });
    var maxC = Math.max.apply(null, cols);

    var carrilIdx = {};
    flujo.carriles.forEach(function (c, i) { carrilIdx[c] = i; });

    // posición de cada nodo
    var pos = {};
    // reparte varios nodos en la misma celda (col,carril) verticalmente
    var celda = {};
    flujo.nodos.forEach(function (n) {
      var ci = col[n.id];
      var li = carrilIdx[n.carril] != null ? carrilIdx[n.carril] : 0;
      var k = ci + ":" + li;
      celda[k] = (celda[k] || 0) + 1;
    });
    var usoCelda = {};
    flujo.nodos.forEach(function (n) {
      var ci = col[n.id];
      var li = carrilIdx[n.carril] != null ? carrilIdx[n.carril] : 0;
      var k = ci + ":" + li;
      var total = celda[k], ord = (usoCelda[k] = (usoCelda[k] || 0) + 1) - 1;
      var cx = PAD_L + ci * COL_W + COL_W / 2;
      var baseY = PAD_T + li * LANE_H + LANE_H / 2;
      var cy = baseY + (ord - (total - 1) / 2) * 62;
      pos[n.id] = { x: cx, y: cy, col: ci, lane: li };
    });

    var w = PAD_L + (maxC + 1) * COL_W + 30;
    var h = PAD_T + flujo.carriles.length * LANE_H + 20;
    return { pos: pos, w: w, h: h, maxC: maxC, carrilIdx: carrilIdx, idx: idx };
  }

  function nodoSVG(n, p) {
    var cls = "fx-nodo fx-" + n.tipo;
    var out = "";
    if (n.tipo === "inicio" || n.tipo === "fin") {
      out += '<circle class="' + cls + '" cx="' + p.x + '" cy="' + p.y + '" r="' + EVT / 2 + '"/>';
      var ls = lineas(n.n, 20);
      ls.forEach(function (t, i) {
        out += '<text class="fx-evt-t" x="' + p.x + '" y="' + (p.y + EVT / 2 + 13 + i * 12) + '" text-anchor="middle">' + esc(t) + '</text>';
      });
    } else if (n.tipo === "decision") {
      var d = DIAM / 2;
      out += '<path class="' + cls + '" d="M' + p.x + ',' + (p.y - d) + ' L' + (p.x + d) + ',' + p.y +
        ' L' + p.x + ',' + (p.y + d) + ' L' + (p.x - d) + ',' + p.y + ' Z"/>';
      lineas(n.n, 16).forEach(function (t, i, a) {
        out += '<text class="fx-nodo-t" x="' + p.x + '" y="' + (p.y - (a.length - 1) * 6 + i * 12) + '" text-anchor="middle">' + esc(t) + '</text>';
      });
    } else {
      out += '<rect class="' + cls + '" x="' + (p.x - NODE_W / 2) + '" y="' + (p.y - NODE_H / 2) +
        '" width="' + NODE_W + '" height="' + NODE_H + '" rx="9"/>';
      lineas(n.n, 24).forEach(function (t, i, a) {
        out += '<text class="fx-nodo-t" x="' + p.x + '" y="' + (p.y - (a.length - 1) * 6 + i * 12) + '" text-anchor="middle">' + esc(t) + '</text>';
      });
      (n.sistemas || []).forEach(function (s, i) {
        var ty = p.y + NODE_H / 2 + 12 + i * 14;
        out += '<text class="fx-sis" x="' + p.x + '" y="' + ty + '" text-anchor="middle">' + esc(s) + '</text>';
      });
    }
    return out;
  }

  function aristaSVG(e, L) {
    var a = L.pos[e.de], b = L.pos[e.a];
    if (!a || !b) return "";
    var na = L.idx[e.de], nb = L.idx[e.a];
    var ax = a.x + anchoNodo(na) / 2, bx = b.x - anchoNodo(nb) / 2;
    var d;
    if (b.col > a.col) {
      var midx = (ax + bx) / 2;
      d = "M" + ax + "," + a.y + " H" + midx + " V" + b.y + " H" + bx;
    } else if (b.col === a.col) {
      // mismo nivel, distinto carril
      d = "M" + a.x + "," + (a.y + altoNodo(na) / 2) + " V" + (b.y - altoNodo(nb) / 2);
    } else {
      // retorno (loop-back): sale por abajo, va a la izquierda, sube
      var y0 = a.y + altoNodo(na) / 2 + 16;
      d = "M" + a.x + "," + (a.y + altoNodo(na) / 2) + " V" + y0 +
        " H" + (b.x - anchoNodo(nb) / 2 - 24) + " V" + b.y + " H" + (b.x - anchoNodo(nb) / 2);
    }
    var mid = puntoMedio(d);
    var etq = e.etq ? '<text class="fx-etq" x="' + mid.x + '" y="' + (mid.y - 5) + '" text-anchor="middle">' + esc(e.etq) + '</text>' : "";
    return '<path class="fx-arista" d="' + d + '" marker-end="url(#fxflecha)"/>' + etq;
  }

  function anchoNodo(n) { return n.tipo === "decision" ? DIAM : (n.tipo === "inicio" || n.tipo === "fin" ? EVT : NODE_W); }
  function altoNodo(n) { return n.tipo === "decision" ? DIAM : (n.tipo === "inicio" || n.tipo === "fin" ? EVT : NODE_H); }
  function puntoMedio(d) {
    var nums = d.match(/-?\d+(\.\d+)?/g).map(Number);
    // aproxima con el punto medio de la lista de coordenadas
    var xs = [], ys = [];
    for (var i = 0; i < nums.length - 1; i += 2) { xs.push(nums[i]); ys.push(nums[i + 1]); }
    return { x: xs[Math.floor(xs.length / 2)], y: ys[Math.floor(ys.length / 2)] };
  }

  function svg(flujo) {
    if (!flujo || !flujo.nodos || !flujo.nodos.length) return "";
    var L = disponer(flujo);
    var s = '<svg class="fx-svg" viewBox="0 0 ' + L.w + ' ' + L.h + '" width="' + L.w + '" height="' + L.h + '" xmlns="' + NS + '">';
    s += '<defs><marker id="fxflecha" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
      '<path d="M0,0 L10,5 L0,10 z" fill="var(--tinta-media)"/></marker></defs>';

    // carriles
    flujo.carriles.forEach(function (c, i) {
      var y = PAD_T + i * LANE_H;
      s += '<rect class="fx-lane" x="' + PAD_L + '" y="' + y + '" width="' + (L.w - PAD_L - 20) + '" height="' + LANE_H + '"/>';
      s += '<rect class="fx-lane-cab" x="' + (PAD_L - 150) + '" y="' + y + '" width="150" height="' + LANE_H + '"/>';
      lineas(c, 20).forEach(function (t, k, arr) {
        s += '<text class="fx-lane-t" x="' + (PAD_L - 75) + '" y="' + (y + LANE_H / 2 - (arr.length - 1) * 7 + k * 13) + '" text-anchor="middle">' + esc(t) + '</text>';
      });
    });

    flujo.aristas.forEach(function (e) { s += aristaSVG(e, L); });
    flujo.nodos.forEach(function (n) { s += nodoSVG(n, L.pos[n.id]); });
    s += "</svg>";
    return s;
  }

  function montar(cont, flujo, titulo) {
    var html = svg(flujo);
    if (!html) { cont.innerHTML = '<div class="f2-vacio">Flujograma pendiente.</div>'; return; }
    cont.innerHTML =
      '<div class="fx-marco">' +
      '<div class="fx-scroll">' + html + '</div>' +
      '<button class="fx-ampliar" type="button">⤢ Ampliar</button>' +
      '</div>';
    cont.querySelector(".fx-ampliar").addEventListener("click", function () {
      abrirLightbox(html, titulo || "Flujo de actividades");
    });
  }

  function abrirLightbox(html, titulo) {
    var ov = document.createElement("div");
    ov.className = "fx-lb";
    ov.innerHTML = '<div class="fx-lb-bar"><b>' + esc(titulo) + '</b><button type="button" class="fx-lb-x">✕</button></div>' +
      '<div class="fx-lb-vp"><div class="fx-lb-world">' + html + '</div></div>';
    document.body.appendChild(ov);
    var vp = ov.querySelector(".fx-lb-vp"), world = ov.querySelector(".fx-lb-world");
    var cam = { x: 20, y: 20, s: 1 };
    function ap() { world.style.transform = "translate(" + cam.x + "px," + cam.y + "px) scale(" + cam.s + ")"; }
    ap();
    vp.addEventListener("wheel", function (e) {
      e.preventDefault();
      var f = Math.pow(1.0015, -e.deltaY), ns = Math.min(3, Math.max(.2, cam.s * f)); f = ns / cam.s;
      cam.x = e.offsetX - (e.offsetX - cam.x) * f; cam.y = e.offsetY - (e.offsetY - cam.y) * f; cam.s = ns; ap();
    }, { passive: false });
    var drag = null;
    vp.addEventListener("pointerdown", function (e) { drag = { x: e.clientX, y: e.clientY }; vp.setPointerCapture(e.pointerId); });
    vp.addEventListener("pointermove", function (e) {
      if (!drag) return;
      cam.x += e.clientX - drag.x; cam.y += e.clientY - drag.y; drag = { x: e.clientX, y: e.clientY }; ap();
    });
    vp.addEventListener("pointerup", function () { drag = null; });
    function cerrar() { ov.remove(); document.removeEventListener("keydown", onk); }
    function onk(e) { if (e.key === "Escape") cerrar(); }
    ov.querySelector(".fx-lb-x").addEventListener("click", cerrar);
    document.addEventListener("keydown", onk);
  }

  window.FlujoRender = { svg: svg, montar: montar };
})();
