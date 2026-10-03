// Motor del módulo «Circuito del negocio» (#/circuito) del manual de Fase 2.
// Pinta window.CIRCUITO (circuito-datos.js) dentro de <section id="circuito"> como
// una vía de tren (03-oct-2026): línea troncal, ramales Mayor y Países, sub-ramales
// de tiendas, mayor local y web dentro de cada país, cambios de agujas, frenos,
// señales de paso, vías de retorno y la catenaria de mercadeo. Un clic abre la
// ficha de la estación en un panel que entra desde la derecha a media pantalla.
//
// Tres capas: Proceso (título de cada estación), Tripulación (jefe de estación) y
// Sistemas (reparto de la información entre Odoo/Lark/EBS, plataformas externas y
// sin sistema, con un panel de cuánto queda fuera). La capa elegida se guarda en
// `rower.fase2.circuito.capa`. La geometría vive en el dato (`via`); las clases
// llevan prefijo `cx-` y los estilos están en informe-fase2.html.
//
// API: CircuitoRender.montar(section) · .abrir(id) · .cerrar()
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var C = null, host = null, svg = null, drawer = null, dbody = null, cuerpo = null;
  var EST = {}, capa = "proceso", montado = false, actual = null;
  var gEst = null;
  var LS_CAPA = "rower.fase2.circuito.capa";

  var COLOR = {troncal:"--cx-troncal", cubitt:"--cx-cubitt", casio:"--cx-casio", mayor:"--cx-mayor", paises:"--cx-paises",
    tiendas:"--cx-tiendas", mayorlocal:"--cx-mayorlocal", web:"--cx-web", alimentacion:"--cx-web", retorno:"--cx-retorno",
    catenaria:"--cx-wire", independiente:"--cx-troncal", socio:"--cx-paises"};

  function esc(s){ return String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function refs(s){ return esc(s).replace(/\s*\[([^\]]+)\]/g, ' <span class="cx-ref">$1</span>'); }
  function el(tag, at, padre, txt){
    var n = document.createElementNS(NS, tag);
    for(var k in at) n.setAttribute(k, at[k]);
    if(txt != null) n.textContent = txt;
    if(padre) padre.appendChild(n);
    return n;
  }
  function col(r){ return "var(" + (COLOR[r] || COLOR.troncal) + ")"; }
  function partir(t, max, lim){
    var out = [], cur = "";
    String(t || "").split(/\s+/).forEach(function(w){
      if((cur + " " + w).trim().length > max && cur){ out.push(cur); cur = w; } else cur = (cur + " " + w).trim();
    });
    if(cur) out.push(cur);
    if(out.length > lim){ out = out.slice(0, lim); out[lim-1] = out[lim-1].replace(/[,.;:]?$/, "…"); }
    return out;
  }
  function cuenta(s){ var d = 0, l = 0; (s.frenos || []).forEach(function(f){ if(f.grado === "detiene") d++; else l++; }); return {d:d, l:l}; }

  // ---- sistemas
  function base(t){ return String(t).replace(/\s*\(.*\)\s*$/, ""); }
  function clase(t){
    var SC = C.sistemasColor || {}, b = base(t), k = SC[b];
    if(!k){ var lb = b.toLowerCase(); for(var x in SC){ if(x.toLowerCase() === lb){ k = SC[x]; break; } } }
    return k || "inf";
  }
  function grupoCl(k){ return (k === "ofi" || k === "lim") ? "ofi" : ((k === "ext" || k === "sc") ? "ext" : "inf"); }
  function reparto(lista){
    var T = {ofi:0, ext:0, inf:0, lim:0, sc:0};
    lista.forEach(function(s){ var t = s.trasp || {}; T.ofi += t.ofi||0; T.ext += t.ext||0; T.inf += t.inf||0; T.lim += t.lim||0; T.sc += t.sc||0; });
    T.tot = T.ofi + T.ext + T.inf; return T;
  }
  function pct(a, b){ return b ? Math.round(100 * a / b) : 0; }
  function barra(T){
    if(!T.tot) return '<div class="cx-barra"></div>';
    return '<div class="cx-barra" aria-hidden="true"><i style="width:' + (100*T.ofi/T.tot) + '%;background:var(--cx-s-ofi)"></i><i style="width:' + (100*T.ext/T.tot) + '%;background:var(--cx-s-ext)"></i><i style="width:' + (100*T.inf/T.tot) + '%;background:var(--cx-s-inf)"></i></div>';
  }

  // Nombre y existencia de As-Is de cada proceso, leídos del propio manual.
  function procInfo(cod){
    var D = window.MANUAL_FASE2, A = window.MANUAL_ASIS || {};
    var pref = String(cod).split(".")[0], n = "";
    if(D) D.macros.forEach(function(m){ if(m.prefijo === pref) m.procesos.forEach(function(p){ if(p.codigo === cod) n = p.n; }); });
    var asis = !!(A[pref] && A[pref].procesos && A[pref].procesos[cod]);
    return {n:n, asis:asis};
  }
  function leerCapa(){ try{ var v = localStorage.getItem(LS_CAPA); return (v === "sis" || v === "gente") ? v : "proceso"; }catch(e){ return "proceso"; } }
  function guardarCapa(v){ try{ localStorage.setItem(LS_CAPA, v); }catch(e){} }

  // ---------------------------------------------------------------- montaje
  function montar(section){
    if(montado) return;
    C = window.CIRCUITO; host = section;
    if(!C){ host.innerHTML = '<div class="f2-nada">No se encontraron los datos del circuito.</div>'; return; }
    montado = true;
    C.estaciones.forEach(function(s){ EST[s.id] = s; });
    capa = leerCapa();

    var est = 0, fr = 0, det = 0, sen = 0;
    C.estaciones.forEach(function(s){
      if(["retorno","catenaria","independiente","alimentacion"].indexOf(s.ramal) < 0) est++;
      var c = cuenta(s); fr += c.d + c.l; det += c.d; if(s.senal) sen++;
    });
    var T = reparto(C.estaciones);

    host.innerHTML =
      '<div class="mp-bar">' +
        '<a class="mp-btn" href="#/">‹ Índice</a>' +
        '<div class="mp-tit">Circuito del negocio · así corre hoy el tren</div>' +
        '<div class="mp-sp"></div>' +
        '<div class="cx-seg" role="group" aria-label="Capa del circuito">' +
          '<button type="button" data-capa="proceso">Proceso</button>' +
          '<button type="button" data-capa="gente">Tripulación</button>' +
          '<button type="button" data-capa="sis">Sistemas</button>' +
        '</div>' +
        '<button type="button" class="mp-btn on" id="cxFrenos" aria-pressed="true">Frenos</button>' +
        '<button type="button" class="mp-btn on" id="cxSenal" aria-pressed="true">Señales de paso</button>' +
        '<button type="button" class="mp-btn on" id="cxCat" aria-pressed="true">Catenaria</button>' +
      '</div>' +
      '<div class="cx-cuerpo" id="cxCuerpo">' +
        '<div class="cx-scroll" id="cxScroll"><div class="cx-wrap">' +
          '<div class="f2-kicker">Fase 2 · versión As-Is · corte ' + esc(C.meta.corte) + '</div>' +
          '<h1 class="f2-h1">así corre hoy el tren</h1>' +
          '<p class="f2-lead">El mapa muestra cómo fluye hoy la operación de todo el grupo, desde el plan de demanda hasta el cobro. La vía sale del plan, se abre en dos ramales de compra por marca y se une en la estación central de Zona Libre. Allí, el primer cambio de agujas reparte entre el ramal <b>Mayor</b>, que atiende a clientes terceros, y el ramal <b>Países</b>, que abastece a las operaciones propias. Dentro de cada país, un segundo cambio de agujas reparte entre tiendas, mayor local y web. Todos los ramales empalman en el cobro, y el sell-out vuelve al plan. Cada estación se construyó con lo que contaron las personas en las ' + esc(C.meta.entrevistas) + ' entrevistas del levantamiento, y cada dato lleva su fuente.</p>' +
          '<div class="cx-stats">' +
            stat(est, "estaciones en la vía, más " + (C.estaciones.length - est) + " de retorno, alimentación, catenaria y línea independiente") +
            stat(fr, "frenos detectados; " + det + " detienen el tren", "cx-stat-fr") +
            stat(sen, "señales de paso: estaciones donde el flujo espera una aprobación") +
            stat(pct(T.inf, T.tot) + " %", "de los traspasos de información no pasa por ningún sistema: Excel, correo, mensajería, papel o de palabra") +
            stat(2, "cambios de agujas: en el hub se elige entre Mayor y Países; en cada país, entre tiendas, mayor local y web") +
          '</div>' +
          '<section class="cx-sispanel" id="cxSisPanel" hidden aria-label="Sistemas en el flujo"></section>' +
          '<figure class="cx-fig">' +
            '<div class="cx-mapa"><svg id="cxSvg" viewBox="' + esc(C.via.viewBox) + '" role="group" aria-labelledby="cxCap"></svg></div>' +
            '<figcaption id="cxCap">Se recorre en el sentido de las agujas del reloj. Arriba se compra; a la derecha está la estación central; en el centro corren los ramales de venta; a la izquierda, el dinero sube hasta el plan. En la venta, cada columna es una etapa: el mismo número es la misma etapa en todos los ramales de su nivel. Toca una estación para abrir su ficha.</figcaption>' +
          '</figure>' +
          '<div class="cx-leyenda" id="cxLeyenda"></div>' +
          '<section class="cx-bloque"><h2 class="cx-h2">Recorrido en orden</h2>' +
            '<p class="cx-sub">Las mismas estaciones del mapa, leídas de corrido por tramo. El número indica la etapa; la letra, el ramal cuando la vía se abre. A la derecha, los frenos de cada estación: en rojo los que detienen el tren.</p>' +
            '<div class="cx-ruta" id="cxRuta"></div></section>' +
          '<section class="cx-bloque"><h2 class="cx-h2">Qué tan firme es cada tramo</h2>' +
            '<p class="cx-sub">Sólida: varias entrevistas coinciden. Parcial: hay evidencia, pero faltan piezas que se completan en la validación.</p>' +
            '<div class="f2-tabla-wrap"><table class="f2-tabla cx-cob"><thead><tr><th>Tramo</th><th>Estaciones</th><th>Cobertura</th><th>Por completar</th></tr></thead><tbody id="cxCob"></tbody></table></div></section>' +
          '<section class="cx-cols">' +
            '<div class="cx-tarjeta"><h3>Preguntas para la validación</h3><ol id="cxPreg"></ol></div>' +
            '<div class="cx-tarjeta"><h3>Cifras que hay que confirmar</h3><ul id="cxCifras"></ul></div>' +
          '</section>' +
          '<section class="cx-bloque"><h2 class="cx-h2">Cómo se construyó</h2>' +
            '<p class="cx-prosa">Se leyeron completas las ' + esc(C.meta.entrevistas) + ' entrevistas y sesiones del levantamiento, en doce lotes temáticos con un mismo esquema de diecinueve tramos, desde la planificación de la demanda hasta el reporte de sell-out. Cada afirmación conserva el código de la entrevista de la que sale. Las cifras son las que dieron los entrevistados y se confirman en la validación.</p>' +
            '<p class="cx-prosa">El circuito usa una sola analogía, la del tren: los frenos son los puntos donde el flujo se detiene o pierde velocidad; las señales de paso, los puntos donde espera una aprobación; la catenaria, el mercadeo que alimenta toda la línea. Los procesos que toca cada estación enlazan a su manual, en versión As-Is y To-Be.</p>' +
          '</section>' +
        '</div></div>' +
        '<aside class="cx-drawer" id="cxDrawer" aria-label="Ficha de la estación" aria-hidden="true">' +
          '<header class="cx-dhead"><span class="cx-dcod" id="cxDcod"></span><div class="cx-dtit"><div class="cx-dtramo" id="cxDtramo"></div><h2 id="cxDtit"></h2><div class="cx-ddep" id="cxDdep"></div></div>' +
          '<button type="button" class="cx-dx" id="cxDx" aria-label="Cerrar la ficha">✕</button></header>' +
          '<div class="cx-dbody" id="cxDbody"></div>' +
        '</aside>' +
      '</div>';

    svg = host.querySelector("#cxSvg");
    drawer = host.querySelector("#cxDrawer");
    dbody = host.querySelector("#cxDbody");
    cuerpo = host.querySelector("#cxCuerpo");

    pintarVia();
    pintarEstaciones();
    pintarLeyenda();
    pintarSisPanel();
    pintarRuta();
    pintarTablas();
    aplicarCapa();

    host.querySelectorAll(".cx-seg button").forEach(function(b){
      b.addEventListener("click", function(){ capa = b.getAttribute("data-capa"); guardarCapa(capa); aplicarCapa(); });
    });
    alternar("#cxFrenos", "cx-sin-frenos");
    alternar("#cxSenal", "cx-sin-senal");
    alternar("#cxCat", "cx-sin-cat");
    host.querySelector("#cxDx").addEventListener("click", function(){ cerrar(true); });
    document.addEventListener("keydown", function(e){
      if(e.key === "Escape" && !host.hidden && drawer.classList.contains("abierto")) cerrar(true);
    });
  }

  function stat(n, t, cls){ return '<div class="cx-stat' + (cls ? " " + cls : "") + '"><b>' + esc(n) + '</b><span>' + esc(t) + '</span></div>'; }
  function alternar(sel, cls){
    var b = host.querySelector(sel);
    b.addEventListener("click", function(){
      var on = b.getAttribute("aria-pressed") !== "true";
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.classList.toggle("on", on);
      svg.classList.toggle(cls, !on);
    });
  }
  function aplicarCapa(){
    host.querySelectorAll(".cx-seg button").forEach(function(b){ b.setAttribute("aria-pressed", b.getAttribute("data-capa") === capa ? "true" : "false"); });
    svg.classList.toggle("cx-capa-sis", capa === "sis");
    host.querySelector("#cxSisPanel").hidden = capa !== "sis";
    pintarEstaciones();
  }

  // ---------------------------------------------------------------- la vía
  function pintarVia(){
    var V = C.via;
    var gGuias = el("g", {}, svg), gLin = el("g", {}, svg), gCat = el("g", {"class":"cx-cat"}, svg), gRot = el("g", {}, svg);
    gEst = el("g", {}, svg);
    var gAg = el("g", {}, svg);
    V.columnas.forEach(function(c){
      el("line", {x1:c[0], y1:c[3], x2:c[0], y2:905, "class":"cx-guia"}, gGuias);
      el("text", {x:c[0], y:930, "text-anchor":"middle", "class":"cx-colnum"}, gGuias, c[1]);
      partir(c[2], 12, 2).forEach(function(ln, i){ el("text", {x:c[0], y:946 + i*13, "text-anchor":"middle", "class":"cx-colnom"}, gGuias, ln); });
    });
    el("text", {x:1075, y:984, "text-anchor":"middle", "class":"cx-nivel"}, gGuias, "NIVEL 1 · EN LA ESTACIÓN CENTRAL");
    el("text", {x:550, y:984, "text-anchor":"middle", "class":"cx-nivel"}, gGuias, "NIVEL 2 · DENTRO DE CADA PAÍS");
    V.lineas.forEach(function(l){ el("path", {d:l[1], "class":"cx-lin " + l[0]}, gLin); });
    // final del ramal del socio y origen de los retornos
    el("line", {x1:995, y1:574, x2:1015, y2:574, stroke:col("paises"), "stroke-width":3}, gLin);
    el("circle", {cx:V.origenRetorno[0], cy:V.origenRetorno[1], r:6, fill:"var(--panel)", stroke:col("retorno"), "stroke-width":2.5}, gLin);
    V.notas.forEach(function(n){ el("text", {x:n[1], y:n[2], "text-anchor":n[3], "class":"cx-etq cx-halo"}, gRot, n[0]); });
    V.rotulos.forEach(function(r){
      el("text", {x:r[1], y:r[2], "text-anchor":"middle", "class":"cx-rotulo cx-halo", fill:col(r[3])}, gRot, r[0]);
      if(r[4]) el("text", {x:r[1], y:r[2] + 14, "text-anchor":"middle", "class":"cx-rotulo-sub cx-halo"}, gRot, r[4]);
    });
    // catenaria: cable, postes y péndolas hacia las estaciones que toca
    var toca = C.estaciones.filter(function(s){ return s.catenaria && V.pos[s.id] && s.id !== "MK"; });
    var xs = toca.map(function(s){ return V.pos[s.id][0]; }).concat([V.pos.MK[0]]);
    var x0 = Math.min.apply(null, xs) - 20, x1 = Math.max.apply(null, xs) + 20, y = V.catenariaY;
    el("path", {d:"M" + x0 + "," + (y-3) + " L" + x1 + "," + (y-3), "class":"cx-wire"}, gCat);
    el("path", {d:"M" + x0 + "," + (y+3) + " L" + x1 + "," + (y+3), "class":"cx-wire"}, gCat);
    for(var x = x0; x <= x1; x += 80) el("line", {x1:x, y1:y-9, x2:x, y2:y+9, "class":"cx-poste"}, gCat);
    toca.forEach(function(s){ var p = V.pos[s.id]; el("line", {x1:p[0], y1:y+3, x2:p[0], y2:p[1] + (p[1] < y ? 10 : -10), "class":"cx-drop"}, gCat); });
    el("text", {x:x0 + 40, y:y - 14, "class":"cx-etq cx-halo"}, gCat, "catenaria · mercadeo alimenta la línea");
    // cambios de agujas
    V.agujas.forEach(function(a){
      var g = el("g", {"class":"cx-agujas"}, gAg), x = a[0], y = a[1];
      el("rect", {x:x-9, y:y-9, width:18, height:18, transform:"rotate(45 " + x + " " + y + ")"}, g);
      el("path", {d:"M" + (x-4) + "," + (y+3) + " L" + x + "," + (y-4) + " L" + (x+4) + "," + (y+3), fill:"none", stroke:"var(--cx-troncal)", "stroke-width":1.8}, g);
      el("text", {x:a[4], y:y-4, "text-anchor":a[5], "class":"cx-halo"}, g, a[2]);
      el("text", {x:a[4], y:y+10, "text-anchor":a[5], "class":"cx-halo"}, g, a[3]);
    });
  }

  function pintarEstaciones(){
    gEst.textContent = "";
    var V = C.via, grandes = {};
    V.grandes.forEach(function(i){ grandes[i] = 1; });
    C.estaciones.forEach(function(s){
      var p = V.pos[s.id]; if(!p) return;
      var x = p[0], y = p[1], lado = p[2], r0 = grandes[s.id] ? 10 : 8;
      var g = el("g", {"class":"cx-est" + (grandes[s.id] ? " grande" : "") + (s.id === actual ? " on" : ""), tabindex:0, role:"button", "data-id":s.id, "aria-label":s.id + " " + s.t}, gEst);
      if(capa === "sis"){
        var T = reparto([s]), RR = r0 + 1.5, partes = [["ofi",T.ofi],["ext",T.ext],["inf",T.inf]].filter(function(q){ return q[1] > 0; });
        el("circle", {cx:x, cy:y, r:RR + 1.5, "class":"cx-p", stroke:"var(--panel)", fill:"var(--borde)"}, g);
        if(partes.length === 1) el("circle", {cx:x, cy:y, r:RR, fill:"var(--cx-s-" + partes[0][0] + ")"}, g);
        else {
          var a0 = -Math.PI/2;
          partes.forEach(function(q){
            var a1 = a0 + 2*Math.PI*q[1]/T.tot, gr = (a1 - a0) > Math.PI ? 1 : 0;
            el("path", {d:"M" + x + "," + y + " L" + (x + RR*Math.cos(a0)).toFixed(2) + "," + (y + RR*Math.sin(a0)).toFixed(2) + " A" + RR + "," + RR + " 0 " + gr + " 1 " + (x + RR*Math.cos(a1)).toFixed(2) + "," + (y + RR*Math.sin(a1)).toFixed(2) + " Z", fill:"var(--cx-s-" + q[0] + ")"}, g);
            a0 = a1;
          });
        }
      } else {
        el("circle", {cx:x, cy:y, r:r0, "class":"cx-p", stroke:col(s.ramal), fill:"var(--cx-st)"}, g);
        if(s.id === "MK") el("circle", {cx:x, cy:y, r:3, fill:"var(--cx-wire)"}, g);
      }
      // rótulo
      var anchor = lado === "right" ? "start" : (lado === "left" ? "end" : "middle");
      var tx = lado === "right" ? x + 15 : (lado === "left" ? x - 16 : x);
      // tope de líneas bajo el código, para estaciones con poco aire (`via.maxLineas`)
      var tope = (V.maxLineas && V.maxLineas[s.id]) || 3;
      var bloque;
      if(capa === "sis"){
        var T2 = reparto([s]), vis = {}, herr = [];
        (s.senalizacion || []).forEach(function(h){ var b = base(h); if(vis[b.toLowerCase()]) return; vis[b.toLowerCase()] = 1; herr.push(b); });
        // en el mapa los nombres largos se recortan; la ficha los muestra completos
        var corto = function(h){ return h.length > 17 ? h.slice(0, 15).trim() + "…" : h; };
        var filas = [[]], largo = 0;
        herr.forEach(function(h){ if(largo + h.length > 19 && filas[filas.length-1].length){ filas.push([]); largo = 0; } filas[filas.length-1].push(h); largo += h.length + 3; });
        var maxF = Math.min(2, tope);
        if(filas.length > maxF){ filas = filas.slice(0, maxF); filas[maxF-1].push("…"); }
        bloque = [{t:s.id, c:"cx-cod", pct:T2.tot ? pct(T2.inf, T2.tot) + " %" : ""}].concat(filas.map(function(f){ return {herr:f}; }));
      } else {
        var lns = partir(capa === "gente" ? (s.jefe || "") : s.t, capa === "gente" ? 22 : 17, Math.min(capa === "gente" ? 2 : 3, tope));
        bloque = [{t:s.id, c:"cx-cod"}].concat(lns.map(function(t){ return {t:t, c:capa === "gente" ? "cx-gen" : "cx-tit"}; }));
      }
      var alto = bloque.length * 14;
      var y0 = lado === "above" ? y - 16 - alto + 11 : (lado === "below" ? y + 26 : y - alto/2 + 10);
      bloque.forEach(function(b, i){
        if(b.herr){
          var t = el("text", {x:tx, y:y0 + i*14, "text-anchor":anchor, "class":"cx-herrt cx-halo"}, g);
          b.herr.forEach(function(h, j){
            if(j) el("tspan", {fill:"var(--tinta-tenue)"}, t, " · ");
            el("tspan", {fill:h === "…" ? "var(--tinta-tenue)" : "var(--cx-s-" + grupoCl(clase(h)) + ")"}, t, h === "…" ? h : corto(h));
          });
        } else if(b.pct){
          var t2 = el("text", {x:tx, y:y0 + i*14, "text-anchor":anchor, "class":"cx-cod cx-halo"}, g, b.t + "  ");
          el("tspan", {"class":"cx-pct"}, t2, b.pct);
        } else el("text", {x:tx, y:y0 + i*14, "text-anchor":anchor, "class":b.c + " cx-halo"}, g, b.t);
      });
      // frenos
      var c = cuenta(s), n = c.d + c.l;
      if(n){
        var bx = lado === "left" ? x + 16 : (lado === "right" ? x - 17 : x + 13);
        var by = lado === "above" ? y + 15 : (lado === "right" ? y - 13 : y - 15);
        var bg = el("g", {"class":"cx-badge"}, g);
        el("title", {}, bg, (c.d ? c.d + " frenos que detienen el tren" : "") + (c.d && c.l ? " · " : "") + (c.l ? c.l + " que lo hacen ir lento" : ""));
        if(c.d){
          var pts = [];
          for(var i = 0; i < 8; i++){ var a = Math.PI/8 + i*Math.PI/4; pts.push((bx + 8*Math.cos(a)).toFixed(1) + "," + (by + 8*Math.sin(a)).toFixed(1)); }
          el("polygon", {points:pts.join(" "), fill:"var(--cx-detiene)"}, bg);
        } else {
          el("polygon", {points:bx + "," + (by-8) + " " + (bx+8.5) + "," + (by+6) + " " + (bx-8.5) + "," + (by+6), fill:"var(--cx-lento)"}, bg);
        }
        el("text", {x:bx, y:by + (c.d ? 3.4 : 4.2), "text-anchor":"middle", "class":c.d ? "" : "lento"}, bg, String(n));
      }
      // señal de paso
      if(s.senal){
        var sx = lado === "right" ? x - 17 : (lado === "left" ? x + 16 : x - 14), sy = lado === "above" ? y + 13 : ((lado === "right" || lado === "left") ? y + 5 : y - 21);
        var sg = el("g", {"class":"cx-senal"}, g);
        el("title", {}, sg, "Señal de paso: " + s.senal);
        el("line", {x1:sx, y1:sy+8, x2:sx, y2:sy+13, stroke:"var(--tinta)", "stroke-width":1.5}, sg);
        el("rect", {x:sx-3.5, y:sy-2, width:7, height:11, rx:2, fill:"var(--tinta)"}, sg);
        el("circle", {cx:sx, cy:sy+1.5, r:1.7, fill:"var(--cx-lento)"}, sg);
        el("circle", {cx:sx, cy:sy+5.6, r:1.7, fill:"var(--panel)"}, sg);
      }
      g.addEventListener("click", function(){ abrir(s.id, true); });
      g.addEventListener("keydown", function(e){ if(e.key === "Enter" || e.key === " "){ e.preventDefault(); abrir(s.id, true); } });
    });
  }

  // ---------------------------------------------------------------- leyenda y panel de sistemas
  function pintarLeyenda(){
    function sw(inner){ return '<svg width="34" height="18" viewBox="0 0 34 18" aria-hidden="true">' + inner + '</svg>'; }
    var items = [
      [sw('<path d="M2,9 L32,9" stroke="var(--cx-troncal)" stroke-width="6" stroke-linecap="round"/>'), "Línea troncal: plan, compra, estación central y dinero"],
      [sw('<path d="M2,9 L32,9" stroke="var(--cx-mayor)" stroke-width="6" stroke-linecap="round"/>'), "Ramal Mayor: clientes terceros servidos desde Zona Libre"],
      [sw('<path d="M2,9 L32,9" stroke="var(--cx-paises)" stroke-width="6" stroke-linecap="round"/>'), "Ramal Países: operaciones propias del grupo"],
      [sw('<path d="M2,5 L32,5" stroke="var(--cx-tiendas)" stroke-width="3.5"/><path d="M2,9 L32,9" stroke="var(--cx-mayorlocal)" stroke-width="3.5"/><path d="M2,13 L32,13" stroke="var(--cx-web)" stroke-width="3.5"/>'), "Sub-ramales de cada país: tiendas, mayor local y web"],
      [sw('<path d="M2,9 L32,9" stroke="var(--cx-retorno)" stroke-width="3" stroke-dasharray="7 5"/>'), "Vía de retorno: sell-out a Casio, postventa y devoluciones"],
      [sw('<path d="M2,6 L32,6 M2,11 L32,11" stroke="var(--cx-wire)" stroke-width="1.2"/><path d="M10,2 L10,15 M24,2 L24,15" stroke="var(--cx-wire)" stroke-width="1.3"/>'), "Catenaria: el mercadeo que alimenta la línea y las estaciones que toca"],
      [sw('<rect x="8" y="0" width="18" height="18" transform="rotate(45 17 9) translate(2.6 2.6) scale(.7)" fill="var(--panel)" stroke="var(--cx-troncal)" stroke-width="3"/>'), "Cambio de agujas: alguien decide a qué ramal va la mercancía"],
      [sw('<polygon points="10.7,2.6 15.3,2.6 18.4,5.7 18.4,10.3 15.3,13.4 10.7,13.4 7.6,10.3 7.6,5.7" fill="var(--cx-detiene)"/><polygon points="26,2 33,14 19,14" fill="var(--cx-lento)"/>'), "Frenos: rojo detiene el tren, ámbar lo hace ir lento"],
      [sw('<rect x="13" y="1" width="8" height="12" rx="2" fill="var(--tinta)"/><circle cx="17" cy="4.5" r="1.8" fill="var(--cx-lento)"/><circle cx="17" cy="9" r="1.8" fill="var(--panel)"/><line x1="17" y1="13" x2="17" y2="17" stroke="var(--tinta)" stroke-width="1.5"/>'), "Señal de paso: el flujo espera una aprobación"],
      [sw('<circle cx="17" cy="9" r="8" fill="var(--cx-s-inf)"/><path d="M17,9 L17,1 A8,8 0 0 1 24.6,11.5 Z" fill="var(--cx-s-ofi)"/><path d="M17,9 L24.6,11.5 A8,8 0 0 1 20,16.4 Z" fill="var(--cx-s-ext)"/>'), "Capa Sistemas: Odoo, Lark o EBS · plataforma externa · sin sistema; el % junto al código es la parte que opera sin sistema"]
    ];
    host.querySelector("#cxLeyenda").innerHTML = items.map(function(i){ return '<div>' + i[0] + '<span>' + i[1] + '</span></div>'; }).join("");
  }

  function pintarSisPanel(){
    var T = reparto(C.estaciones);
    var h = '<div class="cx-sis-cab">' +
      '<div class="cx-sis-big inf"><b>' + pct(T.inf, T.tot) + ' %</b><span>de la información que cambia de manos en el flujo no pasa por ningún sistema: viaja por Excel, correo, mensajería, papel o de palabra.</span></div>' +
      '<div class="cx-sis-big ext"><b>' + pct(T.inf + T.ext, T.tot) + ' %</b><span>queda fuera de los sistemas del grupo (Odoo, Lark y EBS) al sumar las plataformas externas, como Shopify, Cashea o la banca; ' + T.sc + ' de esos traspasos van por plataformas sin conexión con el grupo.</span></div>' +
      '<div class="cx-sis-big ofi"><b>' + pct(T.ofi, T.tot) + ' %</b><span>pasa por Odoo, Lark o EBS; ' + T.lim + ' de esos traspasos se resuelven por el chat o el calendario de Lark.</span></div>' +
    '</div>' + barra(T) +
    '<div class="cx-sis-cols"><div><h3>Por tramo · qué parte opera sin sistema</h3>' +
      C.grupos.map(function(g){
        var t = reparto(g[2].map(function(i){ return EST[i]; }).filter(Boolean));
        return '<div class="cx-tramo-sis"><span>' + esc(g[0].replace(" y línea independiente", "")) + '</span>' + barra(t) + '<em>' + pct(t.inf, t.tot) + ' % sin</em></div>';
      }).join("") +
    '</div><div class="cx-herr"><h3>Qué opera en el flujo</h3>';
    var cnt = {}, nom = {};
    C.estaciones.forEach(function(s){
      var vistos = {};
      (s.senalizacion || []).forEach(function(x){
        var b = base(x), k = b.toLowerCase();
        if(vistos[k]) return; vistos[k] = 1;
        cnt[k] = (cnt[k] || 0) + 1; if(!nom[k]) nom[k] = b.charAt(0).toUpperCase() + b.slice(1);
      });
    });
    [["ofi","Sistemas del grupo"],["ext","Plataformas externas"],["inf","Sin sistema"]].forEach(function(gr){
      var ks = Object.keys(cnt).filter(function(k){ return grupoCl(clase(nom[k])) === gr[0]; }).sort(function(a, b){ return cnt[b] - cnt[a]; });
      if(!ks.length) return;
      h += '<h4>' + gr[1] + '</h4><div class="cx-chips">' + ks.map(function(k){ return '<span class="cx-chip ' + gr[0] + '" title="opera en ' + cnt[k] + ' estaciones">' + esc(nom[k]) + '<b>' + cnt[k] + '</b></span>'; }).join("") + '</div>';
    });
    h += '<p class="cx-sisnota">El número junto a cada herramienta es la cantidad de estaciones en las que opera.</p></div></div>' +
      '<p class="cx-sisnota">Se cuentan traspasos de información, es decir, cada vez que un dato cambia de manos dentro de una estación; no es volumen de transacciones. En el mapa, cada estación muestra su reparto como un círculo en tres colores, sus herramientas y, junto a su código, qué parte de su información opera sin sistema.</p>';
    host.querySelector("#cxSisPanel").innerHTML = h;
  }

  // ---------------------------------------------------------------- recorrido y tablas
  function pintarRuta(){
    host.querySelector("#cxRuta").innerHTML = C.grupos.map(function(g){
      return '<div class="cx-rgrupo"><h3><i style="background:' + col(g[1]) + '"></i>' + esc(g[0]) + '</h3>' +
        g[2].filter(function(id){ return EST[id]; }).map(function(id){
          var s = EST[id], c = cuenta(s);
          return '<button type="button" class="cx-item" data-id="' + esc(id) + '" aria-current="false"><span class="c">' + esc(id) + '</span><span><span class="t">' + esc(s.t) + '</span><span class="d">' + esc(s.depto || "") + '</span></span>' +
            '<span class="n">' + (c.d ? '<b>' + c.d + '</b> · ' : '') + ((c.d + c.l) ? (c.d + c.l) + ' frenos' : '') + '</span></button>';
        }).join("") + '<p class="cx-rnota">' + esc(g[3]) + '</p></div>';
    }).join("");
    host.querySelectorAll("#cxRuta .cx-item").forEach(function(b){ b.addEventListener("click", function(){ abrir(b.getAttribute("data-id"), true); }); });
  }
  function pintarTablas(){
    host.querySelector("#cxCob").innerHTML = (C.cobertura || []).map(function(r){
      return '<tr><td>' + esc(r[0]) + ' · ' + esc(r[1]) + '</td><td class="cx-td-cod">' + esc(r[2]) + '</td><td><span class="cx-cov ' + esc(r[3]) + '"><i></i>' + (r[3] === "solida" ? "Sólida" : "Parcial") + '</span></td><td>' + esc(r[4] || "") + '</td></tr>';
    }).join("");
    host.querySelector("#cxPreg").innerHTML = (C.preguntas || []).map(function(p){ return '<li>' + esc(p) + '</li>'; }).join("");
    host.querySelector("#cxCifras").innerHTML = (C.cifrasConfirmar || []).map(function(p){ return '<li>' + esc(p) + '</li>'; }).join("");
  }

  // ---------------------------------------------------------------- ficha
  function sec(t, h){ return h ? '<section><h3>' + t + '</h3>' + h + '</section>' : ''; }
  function pintarPanel(s){
    var cod = host.querySelector("#cxDcod");
    cod.textContent = s.id;
    cod.style.background = col(s.ramal);
    cod.style.color = (s.ramal === "troncal" || s.ramal === "independiente" || s.ramal === "catenaria") ? "var(--panel)" : "#fff";
    host.querySelector("#cxDtramo").textContent = (C.ramales[s.ramal] || "") + (s.tramo ? " · " + s.tramo : "");
    host.querySelector("#cxDtit").textContent = s.t;
    host.querySelector("#cxDdep").innerHTML = esc(s.depto || "") + (s.ev ? ' <span class="cx-ev ' + esc(s.ev) + '">evidencia ' + (s.ev === "solida" ? "sólida" : "parcial") + '</span>' : '');
    var h = "";
    h += sec("Cómo funciona hoy", '<p>' + refs(s.hoy) + '</p>');
    h += sec("Recorrido", (s.pasos && s.pasos.length) ? '<ol>' + s.pasos.map(function(x){ return '<li>' + refs(x) + '</li>'; }).join("") + '</ol>' : "");
    h += sec("Variantes", s.variantes ? '<p>' + refs(s.variantes) + '</p>' : "");
    h += sec("Señal de paso", s.senal ? '<div class="cx-senal-box">' + refs(s.senal) + '</div>' : "");
    if(s.frenos && s.frenos.length){
      var fr = s.frenos.slice().sort(function(a, b){ return (a.grado === "detiene" ? 0 : 1) - (b.grado === "detiene" ? 0 : 1); });
      h += sec("Frenos", '<ul class="cx-frenos">' + fr.map(function(f){
        return '<li><span class="cx-grado ' + esc(f.grado) + '">' + (f.grado === "detiene" ? "detiene" : "lento") + '</span><div>' + refs(f.t) + ' <span class="cx-ref">' + esc(f.ev || "") + '</span><div class="cx-fid">' + esc(f.id) + (f.antes && f.antes !== f.id ? ' · antes ' + esc(f.antes) : '') + '</div></div></li>';
      }).join("") + '</ul>');
    }
    h += sec("Cifras", (s.cifras && s.cifras.length) ? '<ul>' + s.cifras.map(function(c){ return '<li>' + refs(c) + '</li>'; }).join("") + '</ul>' : "");
    if(s.catenaria) h += sec("Catenaria · toque de mercadeo", '<div class="cx-cat-box">' + refs(s.catenaria.t) + (s.catenaria.ev ? ' <span class="cx-ref">' + esc(s.catenaria.ev) + '</span>' : '') + '</div>');
    var T3 = reparto([s]), sisH = "";
    if(T3.tot) sisH += '<p><b class="cx-pct-b">' + pct(T3.inf, T3.tot) + ' %</b> de la información de esta estación opera sin sistema.</p>' + barra(T3) +
      '<p class="cx-src">De ' + T3.tot + ' traspasos de información: ' + T3.ofi + ' por Odoo, Lark o EBS · ' + T3.ext + ' por plataformas externas · ' + T3.inf + ' sin sistema.</p>';
    if(s.senalizacion && s.senalizacion.length){
      [["ofi","Sistemas del grupo"],["ext","Plataformas externas"],["inf","Sin sistema"]].forEach(function(gr){
        var xs = s.senalizacion.filter(function(x){ return grupoCl(clase(x)) === gr[0]; });
        if(xs.length) sisH += '<div class="cx-grupo-sis"><span class="cx-src">' + gr[1] + '</span><div class="cx-chips">' + xs.map(function(x){ return '<span class="cx-chip ' + gr[0] + '">' + esc(x) + '</span>'; }).join("") + '</div></div>';
      });
    }
    h += sec("Sistemas", sisH);
    h += sec("Tripulación", (s.tripulacion && s.tripulacion.length) ? '<ul>' + s.tripulacion.map(function(p){ return '<li>' + esc(p) + '</li>'; }).join("") + '</ul>' : "");
    if(s.proc && s.proc.length) h += sec("Procesos del manual", '<ul class="cx-procs">' + s.proc.map(function(c){
      var p = procInfo(c);
      return '<li><code>' + esc(c) + '</code><span>' + esc(p.n) + '</span><span class="cx-plinks">' +
        (p.asis ? '<a href="#/asis/' + esc(c) + '">As-Is</a>' : '') + '<a href="#/tobe/' + esc(c) + '">To-Be</a></span></li>';
    }).join("") + '</ul>');
    h += sec("Por confirmar en la validación", s.confirmar ? '<div class="cx-confirmar">' + refs(s.confirmar) + '</div>' : "");
    if(s.src) h += sec("Fuentes", '<p class="cx-src">' + esc(s.src) + '</p>');
    dbody.innerHTML = h;
    dbody.scrollTop = 0;
  }

  function marcar(id){
    gEst.querySelectorAll(".cx-est").forEach(function(g){ g.classList.toggle("on", g.getAttribute("data-id") === id); });
    host.querySelectorAll(".cx-item").forEach(function(i){ i.setAttribute("aria-current", i.getAttribute("data-id") === id ? "true" : "false"); });
  }

  function abrir(id, desdeClic){
    // rutas viejas (#/circuito/8c, #/circuito/13…) llevan a la estación que las reemplaza
    var nuevo = C && C.alias && C.alias[id];
    if(nuevo){
      id = nuevo;
      try{ history.replaceState(null, "", "#/circuito/" + encodeURIComponent(id)); }catch(e){}
    }
    var s = EST[id];
    if(!s) return;
    actual = id;
    marcar(id);
    pintarPanel(s);
    drawer.classList.add("abierto"); drawer.setAttribute("aria-hidden", "false");
    cuerpo.classList.add("con-panel");
    if(desdeClic){
      try{ history.replaceState(null, "", "#/circuito/" + encodeURIComponent(id)); }catch(e){}
      host.querySelector("#cxDx").focus({preventScroll:true});
    }
  }

  function cerrar(desdeUsuario){
    if(!drawer) return;
    var previo = actual;
    actual = null;
    drawer.classList.remove("abierto"); drawer.setAttribute("aria-hidden", "true");
    cuerpo.classList.remove("con-panel");
    marcar(null);
    if(desdeUsuario){
      try{ history.replaceState(null, "", "#/circuito"); }catch(e){}
      var g = previo && gEst.querySelector('.cx-est[data-id="' + previo + '"]');
      if(g) g.focus({preventScroll:true});
    }
  }

  window.CircuitoRender = { montar: montar, abrir: function(id){ abrir(id, false); }, cerrar: function(){ cerrar(false); } };
})();
