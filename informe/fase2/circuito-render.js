// Motor del módulo «Circuito del negocio» (#/circuito) del manual de Fase 2.
// Pinta window.CIRCUITO (circuito-datos.js) dentro de <section id="circuito">:
// barra propia, mapa SVG con carriles, estaciones, trombos y aprobaciones, y un
// panel que entra desde la derecha a media pantalla con el detalle de la
// estación. Las clases van con prefijo `cx-` y los estilos viven en
// informe-fase2.html, con los tokens de estilo/app.css.
//
// Desde el 30-sep también pinta, si el dato las trae: las columnas de etapa de los
// carriles de venta (`via.columnas`), la pasarela de mercadeo (`via.mercadeo`, con
// su botón para ocultarla), la capa Sistemas en tres colores (`trasp` por estación y
// `sistemasColor`), el código fijo de cada trombo y los `alias` de ids viejos.
//
// API: CircuitoRender.montar(section) · .abrir(id) · .cerrar()
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var C = null, host = null, svg = null, drawer = null, dbody = null, cuerpo = null;
  var nodos = {}, actual = null, capa = "proceso", montado = false;
  var RANK = {alta:3, media:2, baja:1};

  function esc(s){ return String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function refs(s){ return esc(s).replace(/\s*\[([^\]]+)\]/g, ' <span class="cx-ref">$1</span>'); }
  function el(tag, attrs, padre){
    var n = document.createElementNS(NS, tag);
    for(var k in attrs) n.setAttribute(k, attrs[k]);
    if(padre) padre.appendChild(n);
    return n;
  }
  function maxSev(tr){ var m = "baja"; tr.forEach(function(x){ if(RANK[x.s] > RANK[m]) m = x.s; }); return m; }

  // Nombre y existencia de As-Is de cada proceso, leídos del propio manual.
  function procInfo(cod){
    var D = window.MANUAL_FASE2, A = window.MANUAL_ASIS || {};
    var pref = String(cod).split(".")[0], n = "";
    if(D) D.macros.forEach(function(m){ if(m.prefijo === pref) m.procesos.forEach(function(p){ if(p.codigo === cod) n = p.n; }); });
    var asis = !!(A[pref] && A[pref].procesos && A[pref].procesos[cod]);
    return {n:n, asis:asis};
  }

  var LS_CAPA = "rower.fase2.circuito.capa";
  function leerCapa(){ try{ return localStorage.getItem(LS_CAPA) || "proceso"; }catch(e){ return "proceso"; } }
  function guardarCapa(v){ try{ localStorage.setItem(LS_CAPA, v); }catch(e){} }

  // ---------------------------------------------------------------- montaje
  function montar(section){
    if(montado) return;
    C = window.CIRCUITO; host = section;
    if(!C){ host.innerHTML = '<div class="f2-nada">No se encontraron los datos del circuito.</div>'; return; }
    montado = true;
    capa = leerCapa();

    var totTr = 0, altos = 0, aprob = 0, bucles = 0, tr = {ofi:0, lim:0, ext:0, inf:0};
    C.estaciones.forEach(function(s){
      totTr += s.trombos.length;
      altos += s.trombos.filter(function(t){ return t.s === "alta"; }).length;
      if(s.aprob) aprob++;
      if(["loop","acc","exit"].indexOf(s.lane) >= 0) bucles++;
      if(s.trasp){ tr.ofi += s.trasp.ofi; tr.lim += s.trasp.lim; tr.ext += s.trasp.ext; tr.inf += s.trasp.inf; }
    });
    var totTrasp = tr.ofi + tr.ext + tr.inf;
    var pInf = totTrasp ? Math.round(100 * tr.inf / totTrasp) : 0;
    var pFuera = totTrasp ? Math.round(100 * (tr.inf + tr.ext) / totTrasp) : 0;
    var viewBox = (C.via && C.via.viewBox) || "86 10 1250 830";

    host.innerHTML =
      '<div class="mp-bar">' +
        '<a class="mp-btn" href="#/">‹ Índice</a>' +
        '<div class="mp-tit">Circuito del negocio · cómo opera hoy</div>' +
        '<div class="mp-sp"></div>' +
        '<div class="cx-seg" role="group" aria-label="Capa del circuito">' +
          '<button type="button" data-capa="proceso">Proceso</button>' +
          '<button type="button" data-capa="sis">Sistemas</button>' +
          '<button type="button" data-capa="gente">Personas</button>' +
        '</div>' +
        '<button type="button" class="mp-btn on" id="cxHaz" aria-pressed="true">Trombos</button>' +
        '<button type="button" class="mp-btn on" id="cxApr" aria-pressed="true">Aprobaciones</button>' +
        (C.via && C.via.mercadeo ? '<button type="button" class="mp-btn on" id="cxMkBtn" aria-pressed="true">Mercadeo</button>' : '') +
      '</div>' +
      '<div class="cx-cuerpo" id="cxCuerpo">' +
        '<div class="cx-scroll" id="cxScroll"><div class="cx-wrap">' +
          '<div class="f2-kicker">Fase 2 · versión As-Is · corte ' + esc(C.meta.corte) + '</div>' +
          '<h1 class="f2-h1">circuito del negocio</h1>' +
          '<p class="f2-lead">Así opera Grupo Kenex hoy, desde que se evalúa un producto hasta que se cobra la venta. La vía se abre en dos carriles por marca durante la compra, se une en la Zona Libre de Colón, se abre en cuatro carriles por canal para vender y vuelve a unirse en el cobro. Cada estación se construyó con lo que contaron las personas en las ' + esc(C.meta.entrevistas) + ' entrevistas del levantamiento, y cada dato lleva su fuente.</p>' +
          '<div class="cx-stats">' +
            stat(C.estaciones.length - bucles, "estaciones en la vía, más " + bucles + " bucles y accesos") +
            stat(totTr, "trombos detectados, " + altos + " de impacto alto") +
            stat(aprob, "puntos donde el flujo espera una aprobación de la dirección") +
            (totTrasp ? stat(pInf + " %", "de los traspasos de información viaja por Excel, correo, WhatsApp, WeChat, de palabra o en papel") : stat("2 + 4", "carriles: por marca en la compra, por canal en la venta")) +
          '</div>' +
          '<div class="cx-tramos" aria-label="Tramos del circuito">' +
            '<span><b>1–4</b>Compra</span><i>→</i><span><b>5–7</b>Hub Panamá</span><i>→</i>' +
            '<span><b>8–12</b>Venta por canal</span><i>→</i><span><b>13–17</b>Dinero</span><i>→</i><span><b>1</b>vuelve al plan</span>' +
          '</div>' +
          '<figure class="cx-fig">' +
            '<div class="cx-mapa"><svg id="cxSvg" viewBox="' + esc(viewBox) + '" role="group" aria-labelledby="cxCap">' +
              '<defs>' +
                '<marker id="cx-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="cx-punta" d="M0,0 L10,5 L0,10 z"/></marker>' +
                '<pattern id="cx-rayas" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="#ffffff"/><rect width="3" height="6" fill="#C53C2C"/></pattern>' +
              '</defs>' +
              '<g id="cxCols"></g><g id="cxVias"></g><g id="cxExtras"></g><g id="cxMk"></g><g id="cxEst"></g><g id="cxMkNudos"></g>' +
            '</svg></div>' +
            '<figcaption id="cxCap">El circuito se recorre en el sentido de las agujas del reloj. Arriba se compra, a la derecha está el hub de Panamá, abajo se vende y a la izquierda corre el dinero hasta que el sell-out vuelve al plan. En la venta cada columna es una etapa y vale lo mismo en los cuatro carriles: 8 pedido y liberación, 9 despacho, 10 llegada; las tiendas siguen con 11 venta y 12 caja. Toca una estación para abrir su detalle.</figcaption>' +
          '</figure>' +
          '<p class="cx-sisnota" id="cxSisNota" hidden>En esta capa cada estación muestra por dónde viaja su información: en azul lo que pasa por Odoo, Lark o EBS; en violeta, las plataformas externas como Cashea, Shopify o la banca; en naranja, Excel, correo, WhatsApp, WeChat, lo que se dice de palabra y el papel. De los ' + totTrasp + ' puntos donde la información cambia de manos, el ' + pInf + ' % viaja por esos canales informales y el ' + pFuera + ' % corre fuera de Odoo, Lark y EBS. La cifra cuenta traspasos, no volumen de transacciones.</p>' +
          leyenda() +
          '<section class="cx-bloque"><h2 class="cx-h2">Recorrido en orden</h2>' +
            '<p class="cx-sub">Las mismas estaciones del mapa, leídas de corrido. El número indica la etapa: en la venta, el mismo número es la misma etapa en los cuatro carriles. La letra indica el carril cuando la vía se abre.</p>' +
            '<div class="cx-ruta" id="cxRuta"></div></section>' +
          '<section class="cx-bloque"><h2 class="cx-h2">Qué tan firme es cada tramo</h2>' +
            '<p class="cx-sub">Sólida: varias entrevistas coinciden. Parcial: hay evidencia pero faltan piezas, que se completan en la validación.</p>' +
            '<div class="f2-tabla-wrap"><table class="f2-tabla cx-cob"><thead><tr><th>Tramo</th><th>Estaciones</th><th>Cobertura</th><th>Por completar</th></tr></thead><tbody id="cxCob"></tbody></table></div></section>' +
          '<section class="cx-cols">' +
            '<div class="cx-tarjeta"><h3>Preguntas para la validación</h3><ol id="cxPreg"></ol></div>' +
            '<div class="cx-tarjeta"><h3>Cifras que hay que confirmar</h3><ul id="cxCifras"></ul></div>' +
          '</section>' +
          '<section class="cx-bloque"><h2 class="cx-h2">Cómo se construyó</h2>' +
            '<p class="cx-prosa">Se leyeron completas las ' + esc(C.meta.entrevistas) + ' entrevistas y sesiones del levantamiento, en doce lotes temáticos y con un mismo esquema de diecinueve tramos, desde la planificación de la demanda hasta el reporte de sell-out. Cada afirmación conserva el código de la entrevista de la que sale. Las cifras son las que dieron los entrevistados y se confirman en la validación.</p>' +
            '<p class="cx-prosa">Este es el circuito tal como opera hoy. La capa de proceso muestra el departamento que opera cada estación; la de sistemas y la de personas recorren el mismo circuito con otra mirada. Los procesos que toca cada estación enlazan a su manual, en versión As-Is y To-Be.</p>' +
          '</section>' +
        '</div></div>' +
        '<aside class="cx-drawer" id="cxDrawer" aria-label="Detalle de la estación" aria-hidden="true">' +
          '<header class="cx-dhead"><span class="cx-dcod" id="cxDcod"></span><div class="cx-dtit"><div class="cx-dtramo" id="cxDtramo"></div><h2 id="cxDtit"></h2></div>' +
          '<button type="button" class="cx-dx" id="cxDx" aria-label="Cerrar el detalle">✕</button></header>' +
          '<div class="cx-dbody" id="cxDbody"></div>' +
        '</aside>' +
      '</div>';

    svg = host.querySelector("#cxSvg");
    drawer = host.querySelector("#cxDrawer");
    dbody = host.querySelector("#cxDbody");
    cuerpo = host.querySelector("#cxCuerpo");

    pintarVias();
    pintarEstaciones();
    pintarRuta();
    pintarTablas();
    aplicarCapa();

    host.querySelectorAll(".cx-seg button").forEach(function(b){
      b.addEventListener("click", function(){ capa = b.getAttribute("data-capa"); guardarCapa(capa); aplicarCapa(); });
    });
    alternar("#cxHaz", "cx-sin-haz");
    alternar("#cxApr", "cx-sin-apr");
    if(host.querySelector("#cxMkBtn")) alternar("#cxMkBtn", "cx-sin-mk");
    host.querySelector("#cxDx").addEventListener("click", function(){ cerrar(true); });
    document.addEventListener("keydown", function(e){
      if(e.key === "Escape" && !host.hidden && drawer.classList.contains("abierto")) cerrar(true);
    });
  }

  function stat(n, t){ return '<div class="cx-stat"><b>' + esc(n) + '</b><span>' + esc(t) + '</span></div>'; }

  function leyenda(){
    return '<div class="cx-leyenda" aria-label="Leyenda">' +
      '<span><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" class="cx-ley-anillo"/></svg>Evidencia sólida</span>' +
      '<span><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" class="cx-ley-anillo parcial"/></svg>Evidencia parcial</span>' +
      '<span><svg width="20" height="18" viewBox="0 0 20 18" aria-hidden="true"><path d="M10,2 L18,16 L2,16 Z" class="cx-ley-haz"/></svg>Trombo: cuello de botella (el número es cuántos)</span>' +
      '<span><svg width="22" height="12" viewBox="0 0 22 12" aria-hidden="true"><rect x="1" y="3" width="20" height="6" fill="url(#cx-rayas)" stroke="#C53C2C"/></svg>Aprobación: el flujo espera a la dirección</span>' +
      '<span><svg width="38" height="10" viewBox="0 0 38 10" aria-hidden="true"><line x1="2" y1="5" x2="36" y2="5" class="cx-info"/></svg>Flujo de información, no de mercancía</span>' +
      (C.via && C.via.mercadeo ?
        '<span><svg width="38" height="14" viewBox="0 0 38 14" aria-hidden="true"><line x1="4" y1="7" x2="34" y2="7" class="cx-mk-cinta"/><line x1="4" y1="7" x2="34" y2="7" class="cx-mk-hueco"/></svg>Pasarela de mercadeo: <b class="cx-mkpas">L</b> lanzamiento · <b class="cx-mkpas">P</b> promoción · <b class="cx-mkpas">C</b> co-marketing</span>' : '') +
      '<span class="cx-ley-sis"><i class="cx-cuadro ofi"></i>Odoo, Lark o EBS</span>' +
      '<span class="cx-ley-sis"><i class="cx-cuadro ext"></i>Plataforma externa</span>' +
      '<span class="cx-ley-sis"><i class="cx-cuadro inf"></i>Excel, correo, WhatsApp, WeChat, palabra o papel</span>' +
    '</div>';
  }

  // Parte un título en dos líneas, sin cortar palabras.
  function partir(t, max){
    if(!max || t.length <= max) return [t];
    var pal = t.split(" "), a = "", b = "";
    pal.forEach(function(p){
      var prueba = a ? a + " " + p : p;
      if(!b && prueba.length <= max) a = prueba; else b = b ? b + " " + p : p;
    });
    return b ? [a, b] : [a];
  }

  // Categoría de una herramienta: ofi · lim · ext · sc · inf (se busca sin el paréntesis).
  function colorSis(n){
    var M = C.sistemasColor || {};
    var b = String(n).replace(/\s*\(.*$/, "").trim();
    return M[n] || M[b] || "";
  }
  function familia(cat){ return cat === "lim" ? "ofi" : cat === "sc" ? "ext" : cat; }

  function alternar(sel, clase){
    var b = host.querySelector(sel);
    b.addEventListener("click", function(){
      var on = b.getAttribute("aria-pressed") === "true";
      b.setAttribute("aria-pressed", on ? "false" : "true");
      b.classList.toggle("on", !on);
      svg.classList.toggle(clase, on);
    });
  }

  // ---------------------------------------------------------------- dibujo
  function pintarVias(){
    var V = C.via, vias = svg.querySelector("#cxVias"), extras = svg.querySelector("#cxExtras");
    V.pits.forEach(function(d){ el("path", {d:d, "class":"cx-pit-borde"}, vias); });
    V.pits.forEach(function(d){ el("path", {d:d, "class":"cx-pit"}, vias); });
    V.pits.forEach(function(d){ el("path", {d:d, "class":"cx-pit-marca"}, vias); });
    V.roads.forEach(function(d){ el("path", {d:d, "class":"cx-borde"}, vias); });
    V.roads.forEach(function(d){ el("path", {d:d, "class":"cx-asfalto"}, vias); });
    V.roads.forEach(function(d){ el("path", {d:d, "class":"cx-marca"}, vias); });
    V.flechas.forEach(function(p){ el("polyline", {points:p, "class":"cx-flecha"}, vias); });
    V.pintado.forEach(function(x){
      var w = x[0].length * 9 + 14;
      el("rect", {x:x[1] - w/2, y:x[2] - 8, width:w, height:16, "class":"cx-pintado-fondo"}, vias);
      el("text", {x:x[1], y:x[2] + 4, "text-anchor":"middle", "class":"cx-pintado"}, vias).textContent = x[0];
    });
    V.info.forEach(function(i){
      var a = {d:i.d, "class":"cx-info"}; if(i.arrow) a["marker-end"] = "url(#cx-arr)";
      el("path", a, extras);
    });
    V.notas.forEach(function(n){ el("text", {x:n[1], y:n[2], "text-anchor":n[3], "class":"cx-nota"}, extras).textContent = n[0]; });

    // columnas de etapa de los carriles de venta: guía vertical y rótulo al pie
    if(V.columnas){
      var K = V.columnas, cols = svg.querySelector("#cxCols");
      K.cols.forEach(function(c){
        el("line", {x1:c[0], y1:K.y0, x2:c[0], y2:K.y1, "class":"cx-guia"}, cols);
        el("text", {x:c[0], y:K.yn, "text-anchor":"middle", "class":"cx-col-n"}, cols).textContent = c[1];
        el("text", {x:c[0], y:K.yt, "text-anchor":"middle", "class":"cx-col-t"}, cols).textContent = c[2];
      });
    }
    if(V.mercadeo) pintarMercadeo(V.mercadeo);
  }

  // Pasarela de mercadeo: una cinta que nace en la compra, pasa por la estación de
  // mercadeo y cruza los carriles de venta; hilos punteados hasta las estaciones que
  // toca y un nudo con el tipo de toque (L, P o C) que abre esa estación.
  function pintarMercadeo(M){
    var capaMk = svg.querySelector("#cxMk"), nudos = svg.querySelector("#cxMkNudos");
    M.cinta.forEach(function(d){ el("path", {d:d, "class":"cx-mk-aire"}, capaMk); });
    M.cinta.forEach(function(d){ el("path", {d:d, "class":"cx-mk-cinta"}, capaMk); });
    M.cinta.forEach(function(d){ el("path", {d:d, "class":"cx-mk-hueco"}, capaMk); });
    M.hilos.forEach(function(d){ el("path", {d:d, "class":"cx-mk-hilo"}, capaMk); });
    var porId = {};
    C.estaciones.forEach(function(s){ porId[s.id] = s; });
    M.nudos.forEach(function(n){
      var ests = n[2].map(function(id){ return porId[id]; }).filter(function(s){ return s && s.mk; });
      if(!ests.length) return;
      var tipo = ests[0].mk.tipo, w = Math.max(18, 8 + tipo.length * 6.2);
      var g = el("g", {"class":"cx-mk-pas", tabindex:"0", role:"button",
        "aria-label":"Mercadeo en " + ests.map(function(s){ return s.id + " " + s.t; }).join(" y ")}, nudos);
      el("title", {}, g).textContent = ests.map(function(s){ return s.id + " · " + s.t + ": " + s.mk.t; }).join("\n");
      el("rect", {x:n[0] - w/2, y:n[1] - 9, width:w, height:18, rx:9}, g);
      el("text", {x:n[0], y:n[1] + 3.4, "text-anchor":"middle"}, g).textContent = tipo;
      var ir = function(){ abrir(ests[0].id, true); };
      g.addEventListener("click", ir);
      g.addEventListener("keydown", function(e){ if(e.key === "Enter" || e.key === " "){ e.preventDefault(); ir(); } });
    });
  }

  var OFF = {r:[26,0], l:[-26,0], d:[0,26], u:[0,-26]};
  function pintarEstaciones(){
    var g0 = svg.querySelector("#cxEst");
    C.estaciones.forEach(function(s){
      var g = el("g", {"class":"cx-st " + (s.ev === "parcial" ? "parcial" : "solida"), tabindex:"0", role:"button",
        "aria-label": s.id + ". " + s.t + ". " + s.trombos.length + " trombos"}, g0);
      // aprobación: antes de la estación, en el sentido de la marcha
      if(s.aprob){
        var o = OFF[s.dir], ax = s.x - o[0], ay = s.y - o[1];
        if(s.id === "MK"){ ax = s.x; ay = s.y - 26; }
        if(s.id === "PV"){ ax = s.x - 26; ay = s.y - 2; }
        var ag = el("g", {"class":"cx-apr"}, g);
        if(s.dir === "r" || s.dir === "l") el("rect", {x:ax - 3, y:ay - 15, width:6, height:30, fill:"url(#cx-rayas)"}, ag);
        else el("rect", {x:ax - 15, y:ay - 3, width:30, height:6, fill:"url(#cx-rayas)"}, ag);
      }
      // trombos: después de la estación
      if(s.trombos.length){
        var h = s.hz || OFF[s.dir], hx = s.x + h[0], hy = s.y + h[1];
        var hg = el("g", {"class":"cx-haz " + (maxSev(s.trombos) === "alta" ? "alta" : "media")}, g);
        el("path", {d:"M" + hx + "," + (hy - 9) + " L" + (hx + 9) + "," + (hy + 7) + " L" + (hx - 9) + "," + (hy + 7) + " Z"}, hg);
        el("text", {x:hx, y:hy + 5, "text-anchor":"middle"}, hg).textContent = s.trombos.length;
      }
      el("circle", {cx:s.x, cy:s.y, r:21, "class":"cx-halo"}, g);
      el("circle", {cx:s.x, cy:s.y, r:13, "class":"cx-anillo"}, g);
      if(s.trasp) dona(s, g);
      el("text", {x:s.x, y:s.y + 3.4, "text-anchor":"middle", "class":"cx-cod"}, g).textContent = s.id;
      // el título puede ir en dos líneas; el subtítulo de la capa va por encima del
      // título cuando el rótulo está arriba y por debajo en los demás casos
      var lineas = partir(s.t, s.wrap), n = lineas.length, PASO = 13;
      var lx = s.x, ly = s.y, anc = "middle", y2;
      if(s.lab === "above"){ ly = s.y - 22 - (n - 1) * PASO; y2 = ly - 14; }
      else {
        if(s.lab === "below"){ ly = s.y + 32; }
        else if(s.lab === "right"){ lx = s.x + (s.lx || 22); ly = s.y + 4; anc = "start"; }
        else if(s.lab === "left"){ lx = s.x - 22; ly = s.y + 4; anc = "end"; }
        else if(s.lab === "custom"){ lx = s.lxy[0]; ly = s.lxy[1]; anc = s.lxy[2]; }
        y2 = ly + (n - 1) * PASO + 14;
      }
      lineas.forEach(function(txt, i){
        el("text", {x:lx, y:ly + i * PASO, "text-anchor":anc, "class":"cx-lbl"}, g).textContent = txt;
      });
      var t2 = el("text", {x:lx, y:y2, "text-anchor":anc, "class":"cx-lbl2"}, g);
      nodos[s.id] = {g:g, t2:t2};
      g.addEventListener("click", function(){ abrir(s.id, true); });
      g.addEventListener("keydown", function(e){ if(e.key === "Enter" || e.key === " "){ e.preventDefault(); abrir(s.id, true); } });
    });
  }

  // Anillo de tres colores para la capa Sistemas: la proporción de traspasos de la
  // estación que viaja por Odoo/Lark/EBS, por plataformas externas y por canales informales.
  function dona(s, g){
    var r = 13, L = 2 * Math.PI * r, t = s.trasp, tot = t.ofi + t.ext + t.inf, ac = 0;
    if(!tot) return;
    var d = el("g", {"class":"cx-dona", transform:"rotate(-90 " + s.x + " " + s.y + ")"}, g);
    [["ofi", t.ofi], ["ext", t.ext], ["inf", t.inf]].forEach(function(p){
      if(!p[1]) return;
      var largo = L * p[1] / tot;
      el("circle", {cx:s.x, cy:s.y, r:r, "class":"cx-don " + p[0],
        "stroke-dasharray":largo.toFixed(2) + " " + (L - largo).toFixed(2), "stroke-dashoffset":(-ac).toFixed(2)}, d);
      ac += largo;
    });
  }

  function aplicarCapa(){
    host.querySelectorAll(".cx-seg button").forEach(function(b){ b.setAttribute("aria-pressed", b.getAttribute("data-capa") === capa ? "true" : "false"); });
    svg.classList.toggle("cx-capa-sis", capa === "sis");
    host.classList.toggle("cx-en-sis", capa === "sis");
    var nota = host.querySelector("#cxSisNota");
    if(nota) nota.hidden = capa !== "sis" || !C.estaciones.some(function(s){ return s.trasp; });
    C.estaciones.forEach(function(s){
      var t2 = nodos[s.id].t2;
      while(t2.firstChild) t2.removeChild(t2.firstChild);
      if(capa === "sis" && C.sistemasColor){
        // cada canal en el color de su categoría
        s.sis.split(" · ").forEach(function(tok, i){
          if(i) el("tspan", {"class":"cx-tk sep"}, t2).textContent = " · ";
          el("tspan", {"class":"cx-tk " + familia(colorSis(tok))}, t2).textContent = tok;
        });
      } else {
        t2.textContent = capa === "sis" ? s.sis : capa === "gente" ? s.gente : s.depto;
      }
    });
  }

  function pintarRuta(){
    var ruta = host.querySelector("#cxRuta");
    C.grupos.forEach(function(gn){
      var box = document.createElement("div"); box.className = "cx-rgrupo";
      box.innerHTML = '<h3>' + esc(gn) + '</h3>';
      C.estaciones.filter(function(s){ return s.grp === gn; }).forEach(function(s){
        var b = document.createElement("button");
        b.type = "button"; b.className = "cx-item"; b.setAttribute("data-id", s.id);
        b.innerHTML = '<span class="c">' + esc(s.id) + '</span><span><span class="t">' + esc(s.t) + '</span><span class="d">' +
          esc(s.depto) + ' · ' + esc(C.carriles[s.lane]) + '</span></span><span class="n ' + maxSev(s.trombos) + '">' + s.trombos.length + ' ▲</span>';
        b.addEventListener("click", function(){ abrir(s.id, true); });
        box.appendChild(b);
      });
      ruta.appendChild(box);
    });
  }

  function pintarTablas(){
    host.querySelector("#cxCob").innerHTML = C.cobertura.map(function(r){
      return '<tr><td class="cx-td-cod">' + esc(r[0]) + '</td><td><b>' + esc(r[1]) + '</b><br><span class="cx-ref">' + esc(r[2]) + '</span></td>' +
        '<td><span class="cx-cov ' + r[3] + '"><i></i>' + (r[3] === "solida" ? "Sólida" : "Parcial") + '</span></td><td>' + esc(r[4] || "—") + '</td></tr>';
    }).join("");
    host.querySelector("#cxPreg").innerHTML = C.preguntas.map(function(p){ return '<li>' + esc(p) + '</li>'; }).join("");
    host.querySelector("#cxCifras").innerHTML = C.cifrasConfirmar.map(function(p){ return '<li>' + esc(p) + '</li>'; }).join("");
  }

  // ---------------------------------------------------------------- panel
  function lista(items, ordenada){
    var tag = ordenada ? "ol" : "ul";
    return '<' + tag + '>' + items.map(function(i){ return '<li>' + refs(i) + '</li>'; }).join("") + '</' + tag + '>';
  }
  function chips(items){ return '<div class="cx-chips">' + items.map(function(p){ return '<span class="cx-chip">' + esc(p) + '</span>'; }).join("") + '</div>'; }
  function chipsSis(items){
    return '<div class="cx-chips">' + items.map(function(p){
      var c = familia(colorSis(p));
      return '<span class="cx-chip' + (c ? ' sis-' + c : '') + '">' + esc(p) + '</span>';
    }).join("") + '</div>';
  }
  function plural(n, uno, varios){ return n + " " + (n === 1 ? uno : varios); }
  function traspasos(t){
    var tot = t.ofi + t.ext + t.inf;
    if(!tot) return "";
    var barra = [["ofi", t.ofi], ["ext", t.ext], ["inf", t.inf]].filter(function(p){ return p[1]; })
      .map(function(p){ return '<i class="' + p[0] + '" style="flex:' + p[1] + '"></i>'; }).join("");
    var partes = [];
    if(t.ofi) partes.push(plural(t.ofi, "por Odoo, Lark o EBS", "por Odoo, Lark o EBS") + (t.lim ? " (" + plural(t.lim, "en un chat o calendario de Lark", "en chats o calendarios de Lark") + ")" : ""));
    if(t.ext) partes.push(plural(t.ext, "por una plataforma externa", "por plataformas externas") + (t.sc ? " (" + plural(t.sc, "se teclea a mano", "se teclean a mano") + ")" : ""));
    if(t.inf) partes.push(plural(t.inf, "por un canal informal", "por canales informales"));
    return '<section><h3>Por dónde viaja la información</h3><div class="cx-tbar" aria-hidden="true">' + barra + '</div>' +
      '<p class="cx-tdesc">' + plural(tot, "traspaso", "traspasos") + ' de información en esta estación: ' + esc(partes.join(", ")) + '.</p></section>';
  }
  function seccionMercadeo(s){
    var h = "";
    if(s.mk) h += '<section><h3>Mercadeo en esta estación</h3><p class="cx-mkp"><b class="cx-mkpas">' + esc(s.mk.tipo) + '</b> ' +
      esc(s.mk.t) + ' <span class="cx-ref">' + esc(s.mk.ev) + '</span></p></section>';
    if(s.id === "MK"){
      var toques = C.estaciones.filter(function(x){ return x.mk; });
      if(toques.length) h += '<section><h3>Dónde entra en el circuito</h3><ul class="cx-mklista">' + toques.map(function(x){
        return '<li><button type="button" data-ir="' + esc(x.id) + '"><code>' + esc(x.id) + '</code><b class="cx-mkpas">' + esc(x.mk.tipo) + '</b><span>' + esc(x.t) + '</span></button></li>';
      }).join("") + '</ul></section>';
    }
    return h;
  }

  function pintarPanel(s){
    host.querySelector("#cxDcod").textContent = s.id;
    host.querySelector("#cxDtramo").textContent = C.carriles[s.lane] + " · " + s.tramo;
    host.querySelector("#cxDtit").textContent = s.t;
    var tr = s.trombos.slice().sort(function(a, b){ return RANK[b.s] - RANK[a.s]; });
    var deptos = s.depto.split(" · ");
    var h = '<div class="cx-chips"><span class="cx-chip ev-' + s.ev + '">' + (s.ev === "solida" ? "Evidencia sólida" : "Evidencia parcial") + '</span>' +
            '<span class="cx-chip">' + s.trombos.length + ' trombos</span></div>';
    h += '<section><h3>Qué pasa hoy</h3><p class="cx-hoy">' + esc(s.hoy) + '</p></section>';
    h += '<section><h3>Paso a paso</h3>' + lista(s.pasos, true) + '</section>';
    if(s.variantes) h += '<section><h3>Dónde se abre la vía</h3><p>' + esc(s.variantes) + '</p></section>';
    h += '<section><h3>Trombos</h3><ul class="cx-trombos">' + tr.map(function(x){
      return '<li><span class="cx-sev ' + x.s + '">' + x.s + '</span><span>' + (x.id ? '<span class="cx-tid">' + esc(x.id) + '</span>' : '') +
        esc(x.t) + ' <span class="cx-ref">' + esc(x.ev) + '</span></span></li>';
    }).join("") + '</ul></section>';
    h += seccionMercadeo(s);
    if(s.aprob) h += '<section><h3>Aprobación</h3><div class="cx-aprob"><svg width="30" height="10" viewBox="0 0 30 10" aria-hidden="true"><rect x="1" y="2" width="28" height="6" fill="url(#cx-rayas)" stroke="#C53C2C"/></svg><span>' + esc(s.aprob) + '</span></div></section>';
    if(s.confirmar) h += '<section><h3>Por confirmar en la validación</h3><div class="cx-confirmar">' + esc(s.confirmar) + '</div></section>';
    if(s.cifras && s.cifras.length) h += '<section><h3>Cifras que se dieron</h3>' + lista(s.cifras, false) + '</section>';
    h += '<div class="cx-tres">' +
      '<section><h3>Departamentos</h3>' + chips(deptos) + '</section>' +
      '<section><h3>Personas</h3>' + chips(s.personas) + '</section>' +
      '<section><h3>Sistemas</h3>' + chipsSis(s.sistemas) + '</section>' +
    '</div>';
    if(s.trasp) h += traspasos(s.trasp);
    h += '<section><h3>Procesos del manual</h3><ul class="cx-procs">' + s.proc.map(function(c){
      var p = procInfo(c);
      return '<li><code>' + esc(c) + '</code><span>' + esc(p.n) + '</span><span class="cx-plinks">' +
        (p.asis ? '<a href="#/asis/' + esc(c) + '">As-Is</a>' : '') + '<a href="#/tobe/' + esc(c) + '">To-Be</a></span></li>';
    }).join("") + '</ul></section>';
    h += '<section><h3>Fuentes</h3><p class="cx-src">' + esc(s.src) + '</p></section>';
    dbody.innerHTML = h;
    dbody.scrollTop = 0;
    dbody.querySelectorAll("[data-ir]").forEach(function(b){
      b.addEventListener("click", function(){ abrir(b.getAttribute("data-ir"), true); });
    });
  }

  function abrir(id, desdeClic){
    // ids que la renumeración del 30-sep dejó sin estación: llevan a la nueva
    var nuevo = C && C.alias && C.alias[id];
    if(nuevo){
      id = nuevo;
      try{ history.replaceState(null, "", "#/circuito/" + encodeURIComponent(id)); }catch(e){}
    }
    var s = C && C.estaciones.filter(function(x){ return x.id === id; })[0];
    if(!s) return;
    actual = id;
    C.estaciones.forEach(function(x){ nodos[x.id].g.classList.toggle("on", x.id === id); });
    host.querySelectorAll(".cx-item").forEach(function(i){ i.setAttribute("aria-current", i.getAttribute("data-id") === id ? "true" : "false"); });
    pintarPanel(s);
    drawer.classList.add("abierto"); drawer.setAttribute("aria-hidden", "false");
    cuerpo.classList.add("con-panel");
    if(desdeClic){
      try{ history.replaceState(null, "", "#/circuito/" + encodeURIComponent(id)); }catch(e){}
      // en pantalla estrecha el panel tapa el mapa: se lleva el foco a él
      host.querySelector("#cxDx").focus({preventScroll:true});
    }
  }

  function cerrar(desdeUsuario){
    if(!drawer) return;
    var previo = actual;
    actual = null;
    drawer.classList.remove("abierto"); drawer.setAttribute("aria-hidden", "true");
    cuerpo.classList.remove("con-panel");
    C.estaciones.forEach(function(x){ nodos[x.id].g.classList.remove("on"); });
    host.querySelectorAll(".cx-item").forEach(function(i){ i.setAttribute("aria-current", "false"); });
    if(desdeUsuario){
      try{ history.replaceState(null, "", "#/circuito"); }catch(e){}
      if(previo && nodos[previo]) nodos[previo].g.focus({preventScroll:true});
    }
  }

  window.CircuitoRender = { montar: montar, abrir: function(id){ abrir(id, false); }, cerrar: function(){ cerrar(false); } };
})();
