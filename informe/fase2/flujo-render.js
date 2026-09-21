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
  var LANE_H = 132;     // alto de carril (da sitio al rombo más alto)
  var NODE_W = 158;     // ancho de caja de tarea
  var NODE_H = 56;
  var DIAM = 62;        // lado MÍNIMO del rombo de decisión; crece con su texto
  var ROMBO_CAR = 13;   // caracteres por línea dentro del rombo
  var ROMBO_LIN = 4;    // líneas que admite antes de recortar
  var ROMBO_W = 180;    // ancho máximo, para no invadir la columna vecina
  var ROMBO_H = 118;
  var EVT = 34;         // diámetro de evento
  var PAD_L = 190;      // margen izquierdo (rótulos de carril)
  var PAD_T = 34;

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // parte un texto en <= 2-3 líneas para caber en la caja
  function lineas(txt, max, tope) {
    max = max || 22;
    tope = tope || 3;
    var pals = String(txt).split(/\s+/), out = [], cur = "";
    pals.forEach(function (p) {
      if ((cur + " " + p).trim().length > max && cur) { out.push(cur); cur = p; }
      else cur = (cur ? cur + " " : "") + p;
    });
    if (cur) out.push(cur);
    // Lo que no cabe se marca. Cortar en seco hace desaparecer texto sin que nadie
    // lo note, que es lo que pasaba con las preguntas largas de los rombos.
    if (out.length > tope) {
      out = out.slice(0, tope);
      out[tope - 1] = out[tope - 1].replace(/\s*\S*$/, "") + "\u2026";
    }
    return out;
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
      var cy = baseY + (ord - (total - 1) / 2) * 74;
      pos[n.id] = { x: cx, y: cy, col: ci, lane: li };
    });

    var w = PAD_L + (maxC + 1) * COL_W + 30;
    var h = PAD_T + flujo.carriles.length * LANE_H + 20;
    return { pos: pos, w: w, h: h, maxC: maxC, carrilIdx: carrilIdx, idx: idx };
  }

  // Dimensiona el rombo con su pregunta. En un rombo el rectángulo inscrito mide
  // la mitad de cada diagonal: para que quepa un texto de w x h hacen falta
  // diagonales de 2w y 2h. Con un rombo fijo, todo texto que pase de dos palabras
  // se sale por los cuatro lados.
  function medidaRombo(n) {
    if (n._rls) return;
    n._rls = lineas(n.n, ROMBO_CAR, ROMBO_LIN);
    var anchoT = Math.max.apply(null, n._rls.map(function (t) { return t.length * 6.3; }));
    n._rw = Math.max(DIAM, Math.min(ROMBO_W, 2 * anchoT + 18));
    n._rh = Math.max(DIAM, Math.min(ROMBO_H, 2 * n._rls.length * 12 + 16));
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
      medidaRombo(n);
      var dx = n._rw / 2, dy = n._rh / 2;
      out += '<path class="' + cls + '" d="M' + p.x + ',' + (p.y - dy) + ' L' + (p.x + dx) + ',' + p.y +
        ' L' + p.x + ',' + (p.y + dy) + ' L' + (p.x - dx) + ',' + p.y + ' Z"><title>' + esc(n.n) + '</title></path>';
      n._rls.forEach(function (t, i, a) {
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

  // Reparte las salidas etiquetadas de cada nodo entre sus vértices: la primera
  // por la derecha y las demás por arriba o por abajo, según adonde vayan; si a un
  // lado le tocan varias, se escalonan. Sin esto dos ramas salen por el mismo
  // punto y sus etiquetas no se pueden atribuir: el rombo parece tener una sola
  // salida aunque las dos estén dibujadas.
  function ramasDecision(flujo, L) {
    var porNodo = {}, out = [];
    flujo.aristas.forEach(function (e, i) {
      out[i] = null;
      if (!e.etq) return;
      (porNodo[e.de] = porNodo[e.de] || []).push(i);
    });
    Object.keys(porNodo).forEach(function (id) {
      var a = L.pos[id], usados = { arriba: 0, abajo: 0 };
      porNodo[id].forEach(function (idx, n) {
        if (n === 0) { out[idx] = { lado: "der", k: 0 }; return; }
        var b = L.pos[flujo.aristas[idx].a];
        var lado = (b && a && b.y < a.y) ? "arriba" : "abajo";
        out[idx] = { lado: lado, k: usados[lado]++ };
      });
    });
    return out;
  }

  function aristaSVG(e, L, rama) {
    var a = L.pos[e.de], b = L.pos[e.a];
    if (!a || !b) return "";
    var na = L.idx[e.de], nb = L.idx[e.a];
    var ax = a.x + anchoNodo(na) / 2, bx = b.x - anchoNodo(nb) / 2;
    var d, etqP;
    // Rama que no sale por la derecha: usa el vértice de arriba o el de abajo, con
    // su escalón si a ese lado le tocó más de una.
    if (rama && rama.lado !== "der" && b.col > a.col) {
      var sube = rama.lado === "arriba";
      var ey = sube ? a.y - altoNodo(na) / 2 : a.y + altoNodo(na) / 2;
      var sep = 24 + rama.k * 34;
      var y1 = sube ? ey - sep : ey + sep;
      d = "M" + a.x + "," + ey + " V" + y1 + " H" + (bx - 14) + " V" + b.y + " H" + bx;
      etqP = { x: a.x + 22, y: y1 + (sube ? -7 : 15) };
      var etq2 = '<text class="fx-etq" x="' + etqP.x + '" y="' + etqP.y + '" text-anchor="middle">' + esc(e.etq) + '</text>';
      return '<path class="fx-arista" d="' + d + '" marker-end="url(#fxflecha)"/>' + etq2;
    }
    if (b.col > a.col) {
      // ¿hay un nodo en medio y a la misma altura? La recta lo atravesaría, y la
      // rama larga de un rombo se vería como si no saliera de él.
      // El trazado lleva dos tramos horizontales, uno a la altura de salida y otro
      // a la de llegada. Basta con que un nodo intermedio estorbe UNO de los dos
      // para que la rama lo atraviese y su flecha quede tapada detrás de la caja.
      var choca = false;
      Object.keys(L.pos).forEach(function (id) {
        if (id === e.de || id === e.a) return;
        var p = L.pos[id];
        if (p.col <= a.col || p.col >= b.col) return;
        // El trazado son tres tramos: sale en horizontal a la altura de salida,
        // baja o sube en vertical por el centro, y entra en horizontal a la de
        // llegada. Un nodo intermedio puede estorbar cualquiera de los tres, y el
        // vertical es el que se escapaba: un nodo en un carril de en medio queda
        // justo sobre esa bajada.
        var cerca = Math.abs(p.y - a.y) < 34 || Math.abs(p.y - b.y) < 34;
        var enMedio = p.y > Math.min(a.y, b.y) && p.y < Math.max(a.y, b.y);
        if (cerca || enMedio) choca = true;
      });
      if (choca) {
        var yr = Math.min(a.y, b.y) - 40;  // rodea por encima de las dos alturas
        d = "M" + ax + "," + a.y + " h10 V" + yr + " H" + (bx - 10) + " V" + b.y + " H" + bx;
      } else {
        var midx = (ax + bx) / 2;
        d = "M" + ax + "," + a.y + " H" + midx + " V" + b.y + " H" + bx;
      }
      // La etiqueta se ancla SIEMPRE a la salida del nodo, también cuando la rama
      // rodea: si viaja con el trazado acaba a dos carriles de su propio rombo.
      etqP = { x: ax + 26, y: a.y - 8 };
    } else if (b.col === a.col) {
      // mismo nivel, distinto carril
      d = "M" + a.x + "," + (a.y + altoNodo(na) / 2) + " V" + (b.y - altoNodo(nb) / 2);
      etqP = { x: a.x + 22 + (rama ? rama.k : 0) * 48, y: a.y + altoNodo(na) / 2 + 16 };
    } else {
      // retorno (loop-back): sale por abajo, va a la izquierda, sube
      var y0 = a.y + altoNodo(na) / 2 + 16;
      d = "M" + a.x + "," + (a.y + altoNodo(na) / 2) + " V" + y0 +
        " H" + (b.x - anchoNodo(nb) / 2 - 24) + " V" + b.y + " H" + (b.x - anchoNodo(nb) / 2);
      etqP = { x: a.x + 22 + (rama ? rama.k : 0) * 48, y: y0 - 6 };
    }
    var etq = e.etq ? '<text class="fx-etq" x="' + etqP.x + '" y="' + etqP.y + '" text-anchor="middle">' + esc(e.etq) + '</text>' : "";
    return '<path class="fx-arista" d="' + d + '" marker-end="url(#fxflecha)"/>' + etq;
  }

  function anchoNodo(n) { if (n.tipo === "decision") { medidaRombo(n); return n._rw; } return n.tipo === "inicio" || n.tipo === "fin" ? EVT : NODE_W; }
  function altoNodo(n) { if (n.tipo === "decision") { medidaRombo(n); return n._rh; } return n.tipo === "inicio" || n.tipo === "fin" ? EVT : NODE_H; }
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

    var ramas = ramasDecision(flujo, L);
    flujo.aristas.forEach(function (e, i) { s += aristaSVG(e, L, ramas[i]); });
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
