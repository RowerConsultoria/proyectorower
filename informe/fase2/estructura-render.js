// Motor del módulo «Estructura organizativa To-Be» (#/estructura) del manual de Fase 2.
// Pinta window.ESTRUCTURA_TOBE (estructura-tobe-datos.js) dentro de
// <section id="estructura">: barra propia, lienzo con pan/zoom en tres bandas
// (direcciones corporativas · gerencias corporativas · gerencias país), hilos de
// reporte en SVG y un panel lateral con el detalle de cada unidad o con las
// premisas de diseño. Clases con prefijo `eo-`; los estilos viven en
// informe-fase2.html con los tokens de estilo/app.css.
//
// Maquetación: una rejilla CSS con una columna por «subcolumna». Cada dirección
// ocupa una subcolumna para sus hijos directos y una más por cada gerencia
// corporativa que tenga hijos propios (Ventas, Mercadeo). Los hilos se trazan
// después de maquetar, midiendo las cajas: peine vertical por el margen
// izquierdo de cada subcolumna.
//
// API: EstructuraRender.montar(section) · .abrir(id) · .premisas(pestaña) · .cerrar()
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var E = null, host = null, vp = null, world = null, lienzo = null, svg = null;
  var panel = null, pcuerpo = null, montado = false;
  var NODOS = {};          // id -> {d: dato, padre: id, dir: id de la dirección, el: caja}
  var ARISTAS = [];        // {de, a, tipo:'linea'|'punteada'|'bus'}
  var cam = {x:0, y:0, s:1};

  var LS = "rower.fase2.estructura";
  function leerPref(){ try{ return JSON.parse(localStorage.getItem(LS)) || {}; }catch(e){ return {}; } }
  function guardarPref(o){ try{ localStorage.setItem(LS, JSON.stringify(o)); }catch(e){} }

  function esc(s){ return String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function svgEl(tag, attrs, padre){
    var n = document.createElementNS(NS, tag);
    for(var k in attrs) n.setAttribute(k, attrs[k]);
    if(padre) padre.appendChild(n);
    return n;
  }

  // ---------------------------------------------------------- índice de nodos
  function indexar(){
    NODOS = {}; ARISTAS = [];
    NODOS[E.CEO.id] = {d:E.CEO, padre:null, dir:null};
    E.GOBIERNO.forEach(function(g){ NODOS[g.id] = {d:g, padre:null, dir:null, gob:true}; ARISTAS.push({de:g.id, a:E.CEO.id, tipo:"punteada"}); });
    E.STAFF.forEach(function(s){ NODOS[s.id] = {d:s, padre:E.CEO.id, dir:null}; ARISTAS.push({de:E.CEO.id, a:s.id, tipo:"staff"}); });
    E.DIRECCIONES.forEach(function(dr){
      NODOS[dr.id] = {d:dr, padre:E.CEO.id, dir:dr.id};
      ARISTAS.push({de:E.CEO.id, a:dr.id, tipo:"bus"});
      (function baja(padre, hijos){
        (hijos || []).forEach(function(h){
          NODOS[h.id] = {d:h, padre:padre, dir:dr.id};
          ARISTAS.push({de:padre, a:h.id, tipo:"linea"});
          baja(h.id, h.hijos);
        });
      })(dr.id, dr.hijos);
    });
    E.COMITES.forEach(function(c){ NODOS[c.id] = {d:c, padre:null, dir:null, comite:true}; });
  }

  // Subcolumnas de una dirección: [directos] + una por gerencia con hijos.
  function subcolumnas(dr){
    var directos = {n2:[], n3:[]}, extra = [];
    (dr.hijos || []).forEach(function(h){
      if(h.hijos && h.hijos.length){
        var sc = {n2:[h], n3:[]};
        h.hijos.forEach(function(k){ (k.nivel === "n3" ? sc.n3 : sc.n2).push(k); });
        extra.push(sc);
      } else (h.nivel === "n3" ? directos.n3 : directos.n2).push(h);
    });
    var out = [];
    if(directos.n2.length || directos.n3.length || !extra.length) out.push(directos);
    return out.concat(extra);
  }

  // ------------------------------------------------------------------ cajas
  function punto(estado){ return '<i class="eo-dot eo-e-' + esc(estado) + '" aria-hidden="true"></i>'; }
  function lineaOcupante(o){
    if(!o) return "";
    var nombre = o.nombre;
    return '<span class="eo-ocup eo-e-' + esc(o.estado) + '">' + punto(o.estado) +
           '<span class="eo-onom">' + esc(nombre) + '</span></span>';
  }
  var CORTO = {"Coordinación":"Coord.", "Jefatura":"Jef."};
  function tagNivel(d, esDir){
    if(esDir) return "Dirección corporativa";
    if(d.nivel === "n2") return "Gerencia corporativa";
    if(d.nivel === "n3") return "Gerencia país";
    if(d.nivel === "staff") return "Staff de la Presidencia";
    return "";
  }
  function caja(d, clase, extraTag){
    var h = '<button type="button" class="eo-card ' + clase + '" data-id="' + esc(d.id) + '" aria-haspopup="dialog">';
    h += '<span class="eo-tag">' + esc(extraTag || "") + '</span>';
    h += '<span class="eo-ttl">' + esc(d.n) + '</span>';
    if(d.paises){
      h += '<span class="eo-paises">';
      E.PAISES.forEach(function(p){
        var o = d.paises[p.id]; if(!o) return;
        h += '<span class="eo-pais eo-e-' + esc(o.estado) + '" title="' + esc(p.n + (o.cargo ? " · " + o.cargo : "") + " — " + o.nombre) + '">' +
               '<b class="eo-pcod">' + esc(p.id) + '</b>' + punto(o.estado) +
               '<span class="eo-onom eo-ocup">' + esc(o.nombre) + '</span>' +
               // En la caja el cargo va abreviado para no comerse el nombre; el panel lo da entero.
               (o.cargo && o.cargo !== "Gerencia" ? '<span class="eo-pcargo">' + esc(CORTO[o.cargo] || o.cargo) + '</span>' : '') +
             '</span>';
      });
      h += '</span>';
    } else h += lineaOcupante(d.ocupante);
    return h + '</button>';
  }

  // --------------------------------------------------------------- montaje
  function montar(section){
    E = window.ESTRUCTURA_TOBE;
    if(!E) return;
    host = section;
    if(montado){ requestAnimationFrame(trazar); return; }
    montado = true;
    indexar();
    var pref = leerPref();

    var h = '';
    h += '<div class="mp-bar eo-bar">' +
           '<a class="mp-btn" href="#/">‹ Índice</a>' +
           '<div class="mp-tit">' + esc(E.titulo) + ' <span class="eo-corte">borrador · ' + esc(E.corte) + '</span></div>' +
           '<div class="mp-sp"></div>' +
           '<button class="mp-btn" id="eoOcup" aria-pressed="true">Ocupantes</button>' +
           '<button class="mp-btn" id="eoVac" aria-pressed="false">Resaltar abiertas</button>' +
           '<a class="mp-btn eo-btn-prem" href="#/estructura/premisas">Premisas del diseño</a>' +
         '</div>';
    h += '<div class="eo-vp" id="eoVp"><div class="eo-world" id="eoWorld"><div class="eo-lienzo" id="eoLienzo"></div></div></div>';
    h += '<div class="mp-zoom eo-zoom">' +
           '<button id="eoZin" aria-label="Acercar">+</button>' +
           '<button id="eoZout" aria-label="Alejar">−</button>' +
           '<button id="eoZfit" aria-label="Ajustar al ancho">⤢</button>' +
         '</div>';
    h += '<aside class="eo-panel" id="eoPanel" aria-label="Detalle" hidden>' +
           '<header><div class="eo-ptag" id="eoPtag"></div><h3 id="eoPtit"></h3>' +
           '<button class="mp-dx" id="eoPx" aria-label="Cerrar">✕</button></header>' +
           '<div class="eo-pcuerpo" id="eoPcuerpo"></div>' +
         '</aside>';
    host.innerHTML = h;

    vp = host.querySelector("#eoVp"); world = host.querySelector("#eoWorld");
    lienzo = host.querySelector("#eoLienzo");
    panel = host.querySelector("#eoPanel"); pcuerpo = host.querySelector("#eoPcuerpo");

    maquetar();

    // preferencias de vista
    aplicarToggle("eoOcup", pref.ocupantes !== false, "eo-sinocup", true);
    aplicarToggle("eoVac", pref.abiertas === true, "eo-vac", false);
    host.querySelector("#eoOcup").addEventListener("click", function(){
      var on = this.getAttribute("aria-pressed") !== "true";
      aplicarToggle("eoOcup", on, "eo-sinocup", true); var p = leerPref(); p.ocupantes = on; guardarPref(p);
      requestAnimationFrame(trazar);
    });
    host.querySelector("#eoVac").addEventListener("click", function(){
      var on = this.getAttribute("aria-pressed") !== "true";
      aplicarToggle("eoVac", on, "eo-vac", false); var p = leerPref(); p.abiertas = on; guardarPref(p);
    });

    // clic en cajas
    lienzo.addEventListener("click", function(e){
      if(arrastro) return;
      var c = e.target.closest(".eo-card,.eo-comite");
      if(c) location.hash = "#/estructura/" + encodeURIComponent(c.getAttribute("data-id"));
    });
    host.querySelector("#eoPx").addEventListener("click", function(){ location.hash = "#/estructura"; });
    pcuerpo.addEventListener("click", function(e){
      var t = e.target.closest("[data-tab]");
      if(t){ location.hash = "#/estructura/premisas/" + t.getAttribute("data-tab"); }
    });
    document.addEventListener("keydown", function(e){
      if(e.key === "Escape" && !host.hidden && !panel.hidden) location.hash = "#/estructura";
    });

    camara();
    window.addEventListener("resize", function(){ if(!host.hidden) ajustar(); });
    requestAnimationFrame(function(){ trazar(); ajustar(); });
    // Las fuentes web cambian el alto de las cajas: volver a trazar al cargar.
    if(document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ trazar(); });
  }

  function aplicarToggle(id, on, clase, claseCuandoOff){
    host.querySelector("#" + id).setAttribute("aria-pressed", String(on));
    host.classList.toggle(clase, claseCuandoOff ? !on : on);
  }

  function maquetar(){
    var cols = [];   // por dirección: lista de subcolumnas
    var total = 0;
    E.DIRECCIONES.forEach(function(dr){ var sc = subcolumnas(dr); cols.push(sc); total += sc.length; });
    lienzo.style.gridTemplateColumns = "150px repeat(" + total + ", var(--eo-col))";

    var h = '';
    var bandas = [
      {fila:3, id:"n1"}, {fila:4, id:"n2"}, {fila:5, id:"n3"}
    ];
    // franjas y rótulos de banda
    bandas.forEach(function(b, i){
      var nv = E.NIVELES[i];
      h += '<div class="eo-franja eo-f-' + b.id + '" style="grid-row:' + b.fila + ';grid-column:1 / -1"></div>';
      h += '<div class="eo-rotulo" style="grid-row:' + b.fila + ';grid-column:1" title="' + esc(nv.d) + '">' +
             '<span class="eo-rnum">Nivel ' + (i + 1) + '</span><span class="eo-rnom">' + esc(nv.n) + '</span></div>';
    });

    // Columna de inicio de cada dirección y tramos contiguos de un mismo carácter:
    // staff a los costados, unidades de negocio al centro (principio del borrador de julio).
    var inicio = [], c0 = 2, grupos = [];
    E.DIRECCIONES.forEach(function(dr, i){
      inicio.push(c0);
      var g = grupos[grupos.length - 1];
      if(g && g.car === dr.caracter) g.fin = c0 + cols[i].length;
      else grupos.push({car:dr.caracter, ini:c0, fin:c0 + cols[i].length});
      c0 += cols[i].length;
    });
    var neg = grupos.filter(function(g){ return g.car === "negocio"; })[0] || {ini:2, fin:c0};

    // bloques de grupo (detrás de todo) y su rótulo
    grupos.forEach(function(g){
      h += '<div class="eo-grupo eo-g-' + g.car + '" style="grid-row:3 / 6;grid-column:' + g.ini + ' / ' + g.fin + '"></div>';
      h += '<div class="eo-grupotit eo-g-' + g.car + '" style="grid-row:2;grid-column:' + g.ini + ' / ' + g.fin + '">' +
             (g.car === "negocio" ? '<b>Unidades de negocio</b> · la cadena de valor' : '<b>Staff</b> · apoyo a la Presidencia') + '</div>';
    });

    // cima: gobierno · Presidencia · staff, centrada sobre las unidades de negocio
    h += '<div class="eo-cima" style="grid-row:1;grid-column:' + neg.ini + ' / ' + neg.fin + '">';
    h += '<div class="eo-gob">';
    E.GOBIERNO.forEach(function(g){ h += '<button type="button" class="eo-card eo-c-gob" data-id="' + esc(g.id) + '"><span class="eo-tag">Gobierno</span><span class="eo-ttl">' + esc(g.n) + '</span></button>'; });
    h += '</div>';
    h += caja(E.CEO, "eo-c-ceo", "Presidencia");
    h += '<div class="eo-staff">';
    E.STAFF.forEach(function(s){ h += caja(s, "eo-c-staff", "Staff de la Presidencia"); });
    h += '</div></div>';
    h += '<div class="eo-hueco" style="grid-row:2;grid-column:2 / -1"></div>';

    // direcciones y sus subcolumnas
    E.DIRECCIONES.forEach(function(dr, i){
      var sc = cols[i], c = inicio[i];
      h += '<div class="eo-celda eo-c1" style="grid-row:3;grid-column:' + c + ' / span ' + sc.length + '">' +
             caja(dr, "eo-c-dir eo-" + dr.caracter, (dr.caracter === "negocio" ? "Negocio" : "Staff") + " · Dirección corporativa") +
           '</div>';
      sc.forEach(function(s, k){
        h += '<div class="eo-celda eo-c2" style="grid-row:4;grid-column:' + (c + k) + '">';
        s.n2.forEach(function(n, j){
          var jefe = (j === 0 && n.hijos && n.hijos.length);
          h += caja(n, "eo-c-n2" + (jefe ? " eo-c-jefe" : ""), "Gerencia corporativa");
        });
        h += '</div>';
        h += '<div class="eo-celda eo-c3" style="grid-row:5;grid-column:' + (c + k) + '">';
        s.n3.forEach(function(n){ h += caja(n, "eo-c-n3", "Gerencia país · " + E.PAISES.length + " países"); });
        h += '</div>';
      });
    });

    // órganos de cogobierno, al pie: sin hilos que crucen el dibujo
    h += '<div class="eo-comites" style="grid-row:6;grid-column:2 / -1">' +
           '<div class="eo-comtit">Comités <span>· órganos de cogobierno: los lidera y convoca una dirección, sin línea de mando</span></div><div class="eo-comfila">';
    E.COMITES.forEach(function(k){
      h += '<button type="button" class="eo-comite" data-id="' + esc(k.id) + '"><span class="eo-ttl">' + esc(k.n) + '</span>' +
           '<span class="eo-cconv">Lidera y convoca: ' + esc(NODOS[k.lidera].d.n) + ' · ' + miembros(k).length + ' unidades integrantes</span></button>';
    });
    h += '</div></div>';

    // Leyenda dentro del lienzo, en el hueco libre de la cima: viaja con el
    // dibujo y no tapa ninguna caja (flotando sobre la vista sí las tapaba).
    h += '<div class="eo-leyenda"><b>Leyenda</b><div class="eo-lcol">';
    Object.keys(E.ESTADOS).forEach(function(k){
      h += '<span title="' + esc(E.ESTADOS[k].d) + '">' + punto(k) + esc(E.ESTADOS[k].n) + '</span>';
    });
    h += '</div><div class="eo-lcol">' +
         '<span><i class="eo-lsw eo-sw-neg"></i>Unidad de negocio</span>' +
         '<span><i class="eo-lsw eo-sw-staff"></i>Staff</span>' +
         '<span><i class="eo-lsw eo-sw-pun"></i>Gobierno y staff: sin mando</span>' +
         '</div></div>';

    lienzo.innerHTML = h;
    svg = svgEl("svg", {"class":"eo-hilos", "aria-hidden":"true"});
    lienzo.insertBefore(svg, lienzo.firstChild);
    lienzo.querySelectorAll(".eo-card").forEach(function(el){
      var id = el.getAttribute("data-id"); if(NODOS[id]) NODOS[id].el = el;
    });
  }

  // ----------------------------------------------------------------- hilos
  function caja2(el){
    var x = 0, y = 0, n = el;
    while(n && n !== lienzo){ x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    return {x:x, y:y, w:el.offsetWidth, h:el.offsetHeight};
  }
  function trazar(){
    if(!svg || host.hidden) return;
    var W = lienzo.scrollWidth, H = lienzo.scrollHeight;
    svg.setAttribute("width", W); svg.setAttribute("height", H);
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    while(svg.firstChild) svg.removeChild(svg.firstChild);
    var ceo = NODOS[E.CEO.id].el; if(!ceo) return;
    var C = caja2(ceo);
    var dirs = E.DIRECCIONES.map(function(d){ return caja2(NODOS[d.id].el); });
    // Dos líneas desde la Presidencia: el bus de las unidades de negocio baja
    // al centro; el staff sale de costado por una línea propia, más arriba.
    var busY = dirs[0].y - 24, stY = dirs[0].y - 48, sx = C.x + C.w / 2;
    ruta("M" + sx + "," + (C.y + C.h) + " V" + busY, "eo-h-linea eo-h-bus");
    ["negocio", "staff"].forEach(function(car){
      var y = car === "negocio" ? busY : stY, xs = [sx], ds = [];
      E.DIRECCIONES.forEach(function(d, i){ if(d.caracter === car){ var x = dirs[i].x + dirs[i].w / 2; xs.push(x); ds.push([x, dirs[i].y]); } });
      if(!ds.length) return;
      var izq = xs.filter(function(x){ return x <= sx; }), der = xs.filter(function(x){ return x >= sx; });
      var cl = "eo-h-linea eo-h-" + car;
      if(izq.length > 1) ruta("M" + sx + "," + y + " H" + Math.min.apply(null, izq), cl);
      if(der.length > 1) ruta("M" + sx + "," + y + " H" + Math.max.apply(null, der), cl);
      ds.forEach(function(p){ ruta("M" + p[0] + "," + y + " V" + p[1], cl); });
    });

    ARISTAS.forEach(function(a){
      var A = NODOS[a.de].el, B = NODOS[a.a].el; if(!A || !B) return;
      var pa = caja2(A), pb = caja2(B);
      if(a.tipo === "punteada"){          // gobierno -> Presidencia
        var y = pa.y + pa.h / 2, x0 = pa.x + (pa.x < C.x ? pa.w : 0), x1 = pa.x < C.x ? C.x : C.x + C.w;
        ruta("M" + x0 + "," + y + " H" + x1, "eo-h-punteada");
        return;
      }
      if(a.tipo === "staff"){
        var ys = pb.y + pb.h / 2;
        ruta("M" + (C.x + C.w) + "," + (C.y + C.h / 2) + " H" + ((C.x + C.w + pb.x) / 2) + " V" + ys + " H" + pb.x, "eo-h-punteada");
        return;
      }
      if(a.tipo !== "linea") return;
      // peine: bajo el padre, al margen izquierdo de la subcolumna del hijo
      var celda = B.parentNode, cc = caja2(celda);
      var rail = cc.x + 10, px = pa.x + pa.w / 2, y1 = pa.y + pa.h + 13, cy = pb.y + Math.min(pb.h / 2, 26);
      ruta("M" + px + "," + (pa.y + pa.h) + " V" + y1 + " H" + rail + " V" + cy + " H" + pb.x, "eo-h-linea");
    });
  }
  function ruta(d, clase){ svgEl("path", {d:d, "class":clase}, svg); }

  // ---------------------------------------------------------------- cámara
  var arrastro = false;
  function aplicar(){ world.style.transform = "translate(" + cam.x + "px," + cam.y + "px) scale(" + cam.s + ")"; }
  function ajustar(){
    var W = lienzo.scrollWidth, r = vp.getBoundingClientRect();
    cam.s = Math.max(.35, Math.min(1, (r.width - 32) / W));
    cam.x = Math.max(16, (r.width - W * cam.s) / 2); cam.y = 12;
    aplicar();
  }
  function zoomEn(f, cx, cy){
    var s2 = Math.max(.3, Math.min(1.8, cam.s * f));
    cam.x = cx - (cx - cam.x) * (s2 / cam.s); cam.y = cy - (cy - cam.y) * (s2 / cam.s); cam.s = s2; aplicar();
  }
  function camara(){
    var ini = null;
    vp.addEventListener("pointerdown", function(e){
      if(e.button !== 0) return;
      ini = {x:e.clientX, y:e.clientY, cx:cam.x, cy:cam.y, id:e.pointerId}; arrastro = false;
    });
    vp.addEventListener("pointermove", function(e){
      if(!ini) return;
      var dx = e.clientX - ini.x, dy = e.clientY - ini.y;
      if(!arrastro && Math.abs(dx) + Math.abs(dy) > 5){ arrastro = true; vp.setPointerCapture(ini.id); vp.classList.add("eo-arrastra"); }
      if(arrastro){ cam.x = ini.cx + dx; cam.y = ini.cy + dy; aplicar(); }
    });
    function fin(){ if(ini){ ini = null; vp.classList.remove("eo-arrastra"); setTimeout(function(){ arrastro = false; }, 0); } }
    vp.addEventListener("pointerup", fin); vp.addEventListener("pointercancel", fin);
    // Rueda desplaza (el organigrama es alto); con Ctrl o pellizco, acerca.
    vp.addEventListener("wheel", function(e){
      e.preventDefault();
      var r = vp.getBoundingClientRect();
      if(e.ctrlKey || e.metaKey) zoomEn(e.deltaY < 0 ? 1.1 : 1 / 1.1, e.clientX - r.left, e.clientY - r.top);
      else { cam.x -= e.deltaX; cam.y -= e.deltaY; aplicar(); }
    }, {passive:false});
    host.querySelector("#eoZin").addEventListener("click", function(){ var r = vp.getBoundingClientRect(); zoomEn(1.2, r.width / 2, r.height / 2); });
    host.querySelector("#eoZout").addEventListener("click", function(){ var r = vp.getBoundingClientRect(); zoomEn(1 / 1.2, r.width / 2, r.height / 2); });
    host.querySelector("#eoZfit").addEventListener("click", ajustar);
  }

  // ----------------------------------------------------------------- panel
  function abrirPanel(tag, titulo, html){
    host.querySelector("#eoPtag").textContent = tag;
    host.querySelector("#eoPtit").textContent = titulo;
    pcuerpo.innerHTML = html; pcuerpo.scrollTop = 0;
    panel.hidden = false; host.classList.add("eo-con-panel");
  }
  function cerrar(){
    if(!panel) return;
    panel.hidden = true; host.classList.remove("eo-con-panel");
    lienzo.querySelectorAll(".eo-sel").forEach(function(x){ x.classList.remove("eo-sel"); });
  }
  function lista(arr){ return '<ul class="eo-lista">' + arr.map(function(x){ return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>'; }
  function pill(estado){ var e = E.ESTADOS[estado] || {n:estado}; return '<span class="eo-pill eo-e-' + esc(estado) + '">' + punto(estado) + esc(e.n) + '</span>'; }
  function enlace(id){ var n = NODOS[id]; return n ? '<a href="#/estructura/' + encodeURIComponent(id) + '">' + esc(n.d.n) + '</a>' : ''; }

  // Integrantes de un comité como ids de nodo, con '@direcciones' expandido.
  function miembros(k){
    var out = [];
    (k.integrantes || []).forEach(function(x){
      if(x === "@direcciones") E.DIRECCIONES.forEach(function(d){ out.push(d.id); });
      else if(NODOS[x]) out.push(x);
    });
    return out;
  }
  function htmlComite(k, conTitulo){
    var m = miembros(k), h = '';
    if(conTitulo) h += '<h4 class="eo-comh">' + enlace(k.id) + '</h4>';
    h += '<p>' + esc(k.proposito) + '</p>';
    if(k.funciones) h += lista(k.funciones);
    h += '<div class="eo-bloque"><h4>Lidera y convoca</h4><p>' + enlace(k.lidera) + '</p></div>';
    var grupos = [
      {t:"Direcciones corporativas", f:function(n){ return E.DIRECCIONES.some(function(d){ return d.id === n; }); }},
      {t:"Gerencias corporativas", f:function(n){ return NODOS[n].d.nivel === "n2"; }},
      {t:"Gerencias país · en cada país", f:function(n){ return NODOS[n].d.nivel === "n3"; }}
    ];
    grupos.forEach(function(g){
      var ids = m.filter(g.f); if(!ids.length) return;
      h += '<div class="eo-bloque"><h4>' + g.t + '</h4><ul class="eo-lista eo-hijos">' + ids.map(function(n){
        var nd = NODOS[n], dir = nd.dir && nd.dir !== n ? ' <span class="eo-tenue">· ' + esc(NODOS[nd.dir].d.n) + '</span>' : '';
        return '<li>' + enlace(n) + dir + (n === k.lidera ? ' <span class="eo-pill">lidera</span>' : '') + '</li>';
      }).join("") + '</ul></div>';
    });
    return h;
  }

  function abrir(id){
    if(!montado) return;
    if(id === "premisas") return premisas();
    var n = NODOS[id]; if(!n) return cerrar();
    lienzo.querySelectorAll(".eo-sel").forEach(function(x){ x.classList.remove("eo-sel"); });
    var d = n.d, h = '';
    if(n.el){ n.el.classList.add("eo-sel"); asomar(n.el); }

    if(n.comite){
      // resalta en el dibujo a quien lo lidera y a quienes lo integran
      miembros(d).concat([d.lidera]).forEach(function(x){ var e = NODOS[x] && NODOS[x].el; if(e) e.classList.add("eo-sel"); });
      return abrirPanel("Comité · órgano de cogobierno", d.n, htmlComite(d, false));
    }
    if(n.gob){
      h += '<div class="eo-bloque"><p>' + esc(d.d) + '</p></div>';
      return abrirPanel("Gobierno", d.n, h);
    }

    var esDir = E.DIRECCIONES.some(function(x){ return x.id === id; });
    var tag = esDir ? (d.caracter === "negocio" ? "Dirección corporativa · unidad de negocio" : "Dirección corporativa · staff")
                    : (id === E.CEO.id ? "Presidencia" : tagNivel(d));
    if(n.padre) h += '<div class="eo-reporta">Reporta a ' + enlace(n.padre) + '</div>';

    if(d.ocupante){
      h += '<div class="eo-bloque"><h4>Ocupante</h4><div class="eo-ofila"><span class="eo-onomg">' + esc(d.ocupante.nombre) + '</span>' + pill(d.ocupante.estado) + '</div>' +
           (d.ocupante.nota ? '<p class="eo-tenue">' + esc(d.ocupante.nota) + '</p>' : '') + '</div>';
    }
    if(d.paises){
      h += '<div class="eo-bloque"><h4>Por país</h4><table class="eo-tpais"><tbody>';
      E.PAISES.forEach(function(p){
        var o = d.paises[p.id]; if(!o) return;
        h += '<tr><th>' + esc(p.n) + (o.cargo ? '<small>' + esc(o.cargo) + '</small>' : '') + '</th><td><span class="eo-onomg">' + esc(o.nombre) + '</span>' + pill(o.estado) +
             (o.nota ? '<p class="eo-tenue">' + esc(o.nota) + '</p>' : '') + '</td></tr>';
      });
      h += '</tbody></table></div>';
    }
    if(d.funciones && d.funciones.length) h += '<div class="eo-bloque"><h4>Qué hace</h4>' + lista(d.funciones) + '</div>';
    if(d.interna && d.interna.length) h += '<div class="eo-bloque"><h4>Dentro de la unidad</h4>' + lista(d.interna) + '</div>';
    var hijos = d.hijos || (id === E.CEO.id ? E.DIRECCIONES.concat(E.STAFF) : null);
    if(hijos && hijos.length){
      h += '<div class="eo-bloque"><h4>' + (id === E.CEO.id ? 'Reportes directos' : 'Le reportan') + '</h4><ul class="eo-lista eo-hijos">' +
           hijos.map(function(k){ return '<li>' + enlace(k.id) + '</li>'; }).join("") + '</ul></div>';
    }
    var lid = E.COMITES.filter(function(k){ return k.lidera === id; });
    if(lid.length) h += '<div class="eo-bloque"><h4>Lidera y convoca</h4><ul class="eo-lista eo-hijos">' + lid.map(function(k){ return '<li>' + enlace(k.id) + '</li>'; }).join("") + '</ul></div>';
    var par = E.COMITES.filter(function(k){ return k.lidera !== id && miembros(k).indexOf(id) >= 0; });
    if(par.length) h += '<div class="eo-bloque"><h4>Integra</h4><ul class="eo-lista eo-hijos">' + par.map(function(k){ return '<li>' + enlace(k.id) + '</li>'; }).join("") + '</ul></div>';
    if(d.nota) h += '<div class="eo-bloque eo-nota"><h4>Por qué así</h4><p>' + esc(d.nota) + '</p></div>';
    abrirPanel(tag, d.n, h);
  }

  // Lleva la caja a la vista si quedó detrás del panel o fuera de pantalla.
  function asomar(el){
    var r = el.getBoundingClientRect(), v = vp.getBoundingClientRect();
    var ancho = v.width - (window.innerWidth > 820 ? Math.min(440, v.width * .45) : 0);
    var alto = window.innerWidth > 820 ? v.height : v.height * .38;
    var dx = 0, dy = 0;
    if(r.right > v.left + ancho - 16) dx = (v.left + ancho - 16) - r.right;
    if(r.left + dx < v.left + 16) dx = (v.left + 16) - r.left;
    if(r.bottom > v.top + alto - 16) dy = (v.top + alto - 16) - r.bottom;
    if(r.top + dy < v.top + 16) dy = (v.top + 16) - r.top;
    if(dx || dy){ cam.x += dx; cam.y += dy; world.classList.add("eo-anima"); aplicar(); setTimeout(function(){ world.classList.remove("eo-anima"); }, 320); }
  }

  var TABS = [
    {id:"funcionamiento", n:"Cómo funciona"},
    {id:"principios",     n:"Siete principios"},
    {id:"comites",        n:"Comités"},
    {id:"julio",          n:"Frente al borrador de julio"},
    {id:"patron",         n:"Estructura patrón"},
    {id:"pendientes",     n:"Pendientes"}
  ];
  function premisas(tab){
    if(!montado) return;
    cerrar();
    tab = TABS.some(function(t){ return t.id === tab; }) ? tab : "funcionamiento";
    var h = '<p class="eo-bajada">' + esc(E.bajada) + '</p>';
    h += '<div class="eo-tabs" role="tablist">' + TABS.map(function(t){
      return '<button type="button" role="tab" data-tab="' + t.id + '" aria-selected="' + (t.id === tab) + '">' + esc(t.n) + '</button>';
    }).join("") + '</div>';
    if(tab === "funcionamiento"){
      E.FUNCIONAMIENTO.forEach(function(f){ h += '<div class="eo-bloque"><h4>' + esc(f.t) + '</h4><p>' + esc(f.d) + '</p></div>'; });
    } else if(tab === "principios"){
      h += '<p class="eo-tenue">Los siete principios de la sección 4.8 del informe de Fase 1, aplicados a esta propuesta: dónde se cumplen y dónde queda tensión.</p>';
      E.PRINCIPIOS.forEach(function(p, i){
        h += '<div class="eo-bloque eo-princ"><h4><span class="eo-pn">' + (i + 1) + '</span>' + esc(p.n) + '</h4>' +
             '<p><b>Cómo lo cumple.</b> ' + esc(p.como) + '</p><p class="eo-tension"><b>Tensión.</b> ' + esc(p.tension) + '</p></div>';
      });
    } else if(tab === "comites"){
      h += '<p class="eo-tenue">Órganos de cogobierno: los lidera y convoca una dirección corporativa y reúnen a sus pares, sin crear línea de mando.</p>';
      E.COMITES.forEach(function(k){ h += '<div class="eo-bloque eo-combloque">' + htmlComite(k, true) + '</div>'; });
    } else if(tab === "julio"){
      h += '<p class="eo-tenue">El borrador de la sección 4.8 se retoma con discernimiento: estas premisas se conservan y estas cambian.</p>';
      h += '<div class="eo-bloque"><h4>Se conserva</h4>' + lista(E.CAMBIOS.conserva) + '</div>';
      h += '<div class="eo-bloque"><h4>Cambia</h4>';
      E.CAMBIOS.cambia.forEach(function(c){
        h += '<div class="eo-cambio"><div class="eo-antes"><span>Julio</span>' + esc(c.antes) + '</div>' +
             '<div class="eo-ahora"><span>Ahora</span>' + esc(c.ahora) + '</div><p>' + esc(c.porque) + '</p></div>';
      });
      h += '</div>';
    } else if(tab === "patron"){
      h += '<p class="eo-tenue">La escalera de cargos común a toda la organización. Cada unidad usa solo los escalones que necesita: una bodega, por ejemplo, se sostiene con tres (gerente, jefe o supervisor, operario).</p>';
      h += '<ol class="eo-patron">' + E.PATRON.map(function(p){ return '<li>' + esc(p) + '</li>'; }).join("") + '</ol>';
    } else if(tab === "pendientes"){
      h += '<p class="eo-tenue">Lo que queda abierto para la validación con el liderazgo.</p>';
      E.PENDIENTES.forEach(function(p){ h += '<div class="eo-bloque eo-pend"><h4>' + esc(p.t) + '</h4><p>' + esc(p.d) + '</p></div>'; });
    }
    abrirPanel("Premisas del diseño", E.titulo, h);
  }

  window.EstructuraRender = {
    montar: montar,
    abrir: abrir,
    premisas: premisas,
    cerrar: cerrar,
    retrazar: function(){ if(montado) trazar(); }
  };
})();
