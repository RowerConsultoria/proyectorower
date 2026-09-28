// Motor del módulo «Circuito del negocio» (#/circuito) del manual de Fase 2.
// Pinta window.CIRCUITO (circuito-datos.js) dentro de <section id="circuito">:
// barra propia, mapa SVG con carriles, estaciones, trombos y aprobaciones, y un
// panel que entra desde la derecha a media pantalla con el detalle de la
// estación. Las clases van con prefijo `cx-` y los estilos viven en
// informe-fase2.html, con los tokens de estilo/app.css.
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

    var totTr = 0, altos = 0, aprob = 0, bucles = 0;
    C.estaciones.forEach(function(s){
      totTr += s.trombos.length;
      altos += s.trombos.filter(function(t){ return t.s === "alta"; }).length;
      if(s.aprob) aprob++;
      if(["loop","acc","exit"].indexOf(s.lane) >= 0) bucles++;
    });

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
      '</div>' +
      '<div class="cx-cuerpo" id="cxCuerpo">' +
        '<div class="cx-scroll" id="cxScroll"><div class="cx-wrap">' +
          '<div class="f2-kicker">Fase 2 · versión As-Is · corte ' + esc(C.meta.corte) + '</div>' +
          '<h1 class="f2-h1">circuito del negocio</h1>' +
          '<p class="f2-lead">Así opera Grupo Kenex hoy, desde que se evalúa un producto hasta que se cobra la venta. La vía se abre en dos carriles por marca durante la compra, se une en la Zona Libre de Colón, se abre en cuatro carriles por canal para vender y vuelve a unirse en el cobro. Cada estación se construyó con lo que contaron las personas en las ' + esc(C.meta.entrevistas) + ' entrevistas del levantamiento, y cada dato lleva su fuente.</p>' +
          '<div class="cx-stats">' +
            stat(C.estaciones.length - bucles, "estaciones en la vía, más " + bucles + " bucles y accesos") +
            stat("2 + 4", "carriles: por marca en la compra, por canal en la venta") +
            stat(totTr, "trombos detectados, " + altos + " de impacto alto") +
            stat(aprob, "puntos donde el flujo espera una aprobación de la dirección") +
          '</div>' +
          '<div class="cx-tramos" aria-label="Tramos del circuito">' +
            '<span><b>1–4</b>Compra</span><i>→</i><span><b>5–7</b>Hub Panamá</span><i>→</i>' +
            '<span><b>8–10</b>Venta por canal</span><i>→</i><span><b>11–15</b>Dinero</span><i>→</i><span><b>1</b>vuelve al plan</span>' +
          '</div>' +
          '<figure class="cx-fig">' +
            '<div class="cx-mapa"><svg id="cxSvg" viewBox="86 10 1250 830" role="group" aria-labelledby="cxCap">' +
              '<defs>' +
                '<marker id="cx-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="cx-punta" d="M0,0 L10,5 L0,10 z"/></marker>' +
                '<pattern id="cx-rayas" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="#ffffff"/><rect width="3" height="6" fill="#C53C2C"/></pattern>' +
              '</defs>' +
              '<g id="cxVias"></g><g id="cxExtras"></g><g id="cxEst"></g>' +
            '</svg></div>' +
            '<figcaption id="cxCap">El circuito se recorre en el sentido de las agujas del reloj. Arriba se compra, a la derecha está el hub de Panamá, abajo se vende y a la izquierda corre el dinero hasta que el sell-out vuelve al plan. Toca una estación para abrir su detalle.</figcaption>' +
          '</figure>' +
          leyenda() +
          '<section class="cx-bloque"><h2 class="cx-h2">Recorrido en orden</h2>' +
            '<p class="cx-sub">Las mismas estaciones del mapa, leídas de corrido. El número indica la posición en la vía; la letra, el carril cuando la vía se abre.</p>' +
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
    '</div>';
  }

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
      el("text", {x:s.x, y:s.y + 3.4, "text-anchor":"middle", "class":"cx-cod"}, g).textContent = s.id;
      var lx = s.x, ly = s.y, anc = "middle", dy = 0;
      if(s.lab === "above"){ ly = s.y - 22; dy = -14; }
      else if(s.lab === "below"){ ly = s.y + 32; dy = 14; }
      else if(s.lab === "right"){ lx = s.x + (s.lx || 22); ly = s.y + 4; anc = "start"; dy = 14; }
      else if(s.lab === "left"){ lx = s.x - 22; ly = s.y + 4; anc = "end"; dy = 14; }
      else if(s.lab === "custom"){ lx = s.lxy[0]; ly = s.lxy[1]; anc = s.lxy[2]; dy = 14; }
      el("text", {x:lx, y:ly, "text-anchor":anc, "class":"cx-lbl"}, g).textContent = s.t;
      var t2 = el("text", {x:lx, y:ly + dy, "text-anchor":anc, "class":"cx-lbl2"}, g);
      nodos[s.id] = {g:g, t2:t2};
      g.addEventListener("click", function(){ abrir(s.id, true); });
      g.addEventListener("keydown", function(e){ if(e.key === "Enter" || e.key === " "){ e.preventDefault(); abrir(s.id, true); } });
    });
  }

  function aplicarCapa(){
    host.querySelectorAll(".cx-seg button").forEach(function(b){ b.setAttribute("aria-pressed", b.getAttribute("data-capa") === capa ? "true" : "false"); });
    C.estaciones.forEach(function(s){
      nodos[s.id].t2.textContent = capa === "sis" ? s.sis : capa === "gente" ? s.gente : s.depto;
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
      return '<li><span class="cx-sev ' + x.s + '">' + x.s + '</span><span>' + esc(x.t) + ' <span class="cx-ref">' + esc(x.ev) + '</span></span></li>';
    }).join("") + '</ul></section>';
    if(s.aprob) h += '<section><h3>Aprobación</h3><div class="cx-aprob"><svg width="30" height="10" viewBox="0 0 30 10" aria-hidden="true"><rect x="1" y="2" width="28" height="6" fill="url(#cx-rayas)" stroke="#C53C2C"/></svg><span>' + esc(s.aprob) + '</span></div></section>';
    if(s.confirmar) h += '<section><h3>Por confirmar en la validación</h3><div class="cx-confirmar">' + esc(s.confirmar) + '</div></section>';
    if(s.cifras && s.cifras.length) h += '<section><h3>Cifras que se dieron</h3>' + lista(s.cifras, false) + '</section>';
    h += '<div class="cx-tres">' +
      '<section><h3>Departamentos</h3>' + chips(deptos) + '</section>' +
      '<section><h3>Personas</h3>' + chips(s.personas) + '</section>' +
      '<section><h3>Sistemas</h3>' + chips(s.sistemas) + '</section>' +
    '</div>';
    h += '<section><h3>Procesos del manual</h3><ul class="cx-procs">' + s.proc.map(function(c){
      var p = procInfo(c);
      return '<li><code>' + esc(c) + '</code><span>' + esc(p.n) + '</span><span class="cx-plinks">' +
        (p.asis ? '<a href="#/asis/' + esc(c) + '">As-Is</a>' : '') + '<a href="#/tobe/' + esc(c) + '">To-Be</a></span></li>';
    }).join("") + '</ul></section>';
    h += '<section><h3>Fuentes</h3><p class="cx-src">' + esc(s.src) + '</p></section>';
    dbody.innerHTML = h;
    dbody.scrollTop = 0;
  }

  function abrir(id, desdeClic){
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
