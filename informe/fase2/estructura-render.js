// Motor del módulo «Estructura organizativa To-Be» (#/estructura) del manual de Fase 2.
// Pinta window.ESTRUCTURA_TOBE (estructura-tobe-datos.js) dentro de
// <section id="estructura">: barra propia, lienzo con pan/zoom con dos contenedores
// lado a lado —staff a la izquierda, unidades de negocio a la derecha—, hilos de
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
// Consejos y comités: no se dibujan en el lienzo (al pie se perdían de vista). Van en
// un flotante desplegable fijo en la parte superior de la vista, que no se mueve con
// el pan/zoom. Los consejos (E.CONSEJOS) no tienen línea hacia la Presidencia.
//
// Vista «Capas» (#/estructura/capas): la lógica de conformación sin unidades
// ni ocupantes, para explicarla antes del organigrama. Sale de E.CAPAS.
//
// API: EstructuraRender.montar(section) · .abrir(id) · .premisas(pestaña) · .capas() · .cerrar()
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var E = null, host = null, vp = null, world = null, lienzo = null, svg = null;
  var panel = null, pcuerpo = null, cogob = null, montado = false;
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
    // Unidades de la Presidencia: al costado de la Presidencia, o sobre su línea (enLinea)
    E.STAFF.forEach(function(s){ NODOS[s.id] = {d:s, padre:E.CEO.id, dir:null}; ARISTAS.push({de:E.CEO.id, a:s.id, tipo:s.enLinea ? "lateral" : "staff"}); });
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
    (E.CONSEJOS || []).forEach(function(c){ NODOS[c.id] = {d:c, padre:null, dir:null, consejo:true}; });
    E.COMITES.forEach(function(c){ NODOS[c.id] = {d:c, padre:null, dir:null, comite:true}; });
  }

  // Subcolumnas de una dirección, en el orden del dato: cada unidad que le reporta
  // directamente ocupa su propia columna, con sus dependientes debajo. Así las
  // unidades hermanas quedan lado a lado y al mismo nivel, cada una colgando de su
  // dirección, y nunca una debajo de otra como si dependiera de ella.
  function subcolumnas(dr){
    var out = [];
    (dr.hijos || []).forEach(function(h){
      var sc = h.nivel === "n3" ? {n2:[], n3:[h]} : {n2:[h], n3:[]};
      (h.nivel === "n3" ? [] : (h.hijos || [])).forEach(function(k){
        if(k.nivel === "coord") return;
        (k.nivel === "n3" ? sc.n3 : sc.n2).push(k);
      });
      out.push(sc);
    });
    if(!out.length) out.push({n2:[], n3:[]});
    return out;
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
    if(d.nivel === "coord") return "Coordinación país";
    if(d.nivel === "ccorp") return "Coordinación corporativa";
    if(d.nivel === "gun") return "Gerencia de unidad de negocio";
    if(d.nivel === "staff") return d.etiqueta !== undefined ? d.etiqueta : "Staff de la Presidencia";
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
               (o.cargo && o.cargo !== "Gerencia" && d.nivel !== "coord" ? '<span class="eo-pcargo">' + esc(CORTO[o.cargo] || o.cargo) + '</span>' : '') +
             '</span>';
      });
      h += '</span>';
    } else h += lineaOcupante(d.ocupante);
    return h + '</button>';
  }

  // Gerencia país con sus coordinaciones debajo, con sangría: es la única estructura
  // interna que se dibuja, para las unidades que deben existir con responsable propio.
  function cajaPais(k){
    var h = caja(k, "eo-c-n3", "Gerencia país · " + E.PAISES.length + " países");
    (k.hijos || []).filter(function(x){ return x.nivel === "coord"; }).forEach(function(x){
      h += caja(x, "eo-c-n3 eo-c-coord", "Coordinación país");
    });
    return h;
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
           '<a class="mp-btn" id="eoCapasBtn" href="#/estructura/capas" aria-pressed="false">Capas</a>' +
           '<button class="mp-btn" id="eoLeyBtn" aria-pressed="true" aria-controls="eoLey">Leyenda</button>' +
           '<button class="mp-btn" id="eoOcup" aria-pressed="true">Ocupantes</button>' +
           '<button class="mp-btn" id="eoVac" aria-pressed="false">Resaltar abiertas</button>' +
           '<a class="mp-btn eo-btn-prem" href="#/estructura/premisas">Premisas del diseño</a>' +
         '</div>';
    h += '<div class="eo-capas" id="eoCapas" hidden></div>';
    h += '<div class="eo-vp" id="eoVp"><div class="eo-world" id="eoWorld"><div class="eo-lienzo" id="eoLienzo"></div></div></div>';
    h += '<div class="mp-zoom eo-zoom">' +
           '<button id="eoZin" aria-label="Acercar">+</button>' +
           '<button id="eoZout" aria-label="Alejar">−</button>' +
           '<button id="eoZfit" aria-label="Ajustar al ancho">⤢</button>' +
         '</div>';
    h += '<div class="eo-leyenda eo-leyflot" id="eoLey" role="group" aria-label="Leyenda">' +
           '<div class="eo-leyasa" id="eoLeyAsa" tabindex="0" title="Arrastra para moverla (o usa las flechas)"><b>Leyenda</b>' +
           '<button type="button" class="eo-leyx" id="eoLeyX" aria-label="Ocultar la leyenda">✕</button></div>' +
           '<div class="eo-leycuerpo">' + leyendaHtml() + '</div></div>';
    h += '<div class="eo-cogob" id="eoCogob"></div>';
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
    montarLeyenda(pref);
    montarCogob(pref);

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

  // Leyenda: caja flotante sobre la vista, que se arrastra por su cabecera y se oculta.
  function leyendaHtml(){
    var h = '<div class="eo-lcol">';
    Object.keys(E.ESTADOS).forEach(function(k){
      h += '<span title="' + esc(E.ESTADOS[k].d) + '">' + punto(k) + esc(E.ESTADOS[k].n) + '</span>';
    });
    return h + '</div><div class="eo-lcol">' +
         '<span><i class="eo-lsw eo-sw-neg"></i>Unidad de negocio</span>' +
         '<span><i class="eo-lsw eo-sw-staff"></i>Staff</span>' +
         '<span><i class="eo-lsw eo-sw-pun"></i>Gobierno y staff: sin mando</span>' +
         '</div>';
  }
  function montarLeyenda(pref){
    var ley = host.querySelector("#eoLey"), asa = host.querySelector("#eoLeyAsa"), btn = host.querySelector("#eoLeyBtn");
    function ver(on){
      ley.hidden = !on; btn.setAttribute("aria-pressed", String(on));
      var p = leerPref(); p.leyOculta = !on; guardarPref(p);
      if(on) encajar();
    }
    // dentro de la vista, bajo la barra; nunca fuera de lo visible
    function encajar(){
      var bar = host.querySelector(".eo-bar"), top0 = bar ? bar.offsetHeight + 8 : 8;
      var maxX = Math.max(8, host.clientWidth - ley.offsetWidth - 8), maxY = Math.max(top0, host.clientHeight - ley.offsetHeight - 8);
      var x = Math.min(Math.max(8, parseFloat(ley.style.left) || 16), maxX);
      var y = Math.min(Math.max(top0, parseFloat(ley.style.top) || top0 + 8), maxY);
      ley.style.left = x + "px"; ley.style.top = y + "px";
    }
    if(pref.ley){ ley.style.left = pref.ley.x + "px"; ley.style.top = pref.ley.y + "px"; }
    ver(pref.leyOculta !== true);
    btn.addEventListener("click", function(){ ver(ley.hidden); });
    host.querySelector("#eoLeyX").addEventListener("click", function(){ ver(false); btn.focus(); });
    var arr = null;
    asa.addEventListener("pointerdown", function(e){
      if(e.target.closest("button")) return;
      arr = {x:e.clientX - ley.offsetLeft, y:e.clientY - ley.offsetTop};
      asa.setPointerCapture(e.pointerId); ley.classList.add("eo-ley-arrastra"); e.preventDefault();
    });
    asa.addEventListener("pointermove", function(e){
      if(!arr) return;
      ley.style.left = (e.clientX - arr.x) + "px"; ley.style.top = (e.clientY - arr.y) + "px"; encajar();
    });
    function soltar(){
      if(!arr) return; arr = null; ley.classList.remove("eo-ley-arrastra");
      var p = leerPref(); p.ley = {x:parseFloat(ley.style.left), y:parseFloat(ley.style.top)}; guardarPref(p);
    }
    asa.addEventListener("pointerup", soltar); asa.addEventListener("pointercancel", soltar);
    // con el teclado: flechas sobre la cabecera la mueven
    asa.addEventListener("keydown", function(e){
      var d = {ArrowLeft:[-20,0], ArrowRight:[20,0], ArrowUp:[0,-20], ArrowDown:[0,20]}[e.key]; if(!d) return;
      e.preventDefault(); ley.style.left = (ley.offsetLeft + d[0]) + "px"; ley.style.top = (ley.offsetTop + d[1]) + "px"; encajar();
      var p = leerPref(); p.ley = {x:ley.offsetLeft, y:ley.offsetTop}; guardarPref(p);
    });
    window.addEventListener("resize", function(){ if(!ley.hidden) encajar(); });
  }

  // Consejos y comités: flotante desplegable en la parte superior de la vista.
  function montarCogob(pref){
    cogob = host.querySelector("#eoCogob");
    var cons = E.CONSEJOS || [], n = cons.length + E.COMITES.length;
    var h = '<button type="button" class="eo-cogcab" id="eoCogCab" aria-expanded="false" aria-controls="eoCogCuerpo">' +
              '<b>Consejos y comités</b><span>' + n + ' instancias de cogobierno · sin línea de mando</span><i aria-hidden="true">▾</i></button>' +
            '<div class="eo-cogcuerpo" id="eoCogCuerpo" hidden>';
    if(cons.length){
      h += '<div class="eo-cogrupo"><h4>Consejos</h4><div class="eo-comfila">';
      cons.forEach(function(k){
        h += '<button type="button" class="eo-comite eo-consejo" data-id="' + esc(k.id) + '"><span class="eo-ttl">' + esc(k.n) + '</span>' +
             '<span class="eo-cconv">' + esc(k.integrantes || '') + '</span></button>';
      });
      h += '</div></div>';
    }
    h += '<div class="eo-cogrupo"><h4>Comités <span>· los lidera y convoca una dirección</span></h4><div class="eo-comfila">';
    E.COMITES.forEach(function(k){
      h += '<button type="button" class="eo-comite" data-id="' + esc(k.id) + '"><span class="eo-ttl">' + esc(k.n) + '</span>' +
           '<span class="eo-cconv">Lidera y convoca: ' + esc(NODOS[k.lidera].d.n) + ' · ' + miembros(k).length + ' unidades integrantes</span></button>';
    });
    h += '</div></div></div>';
    cogob.innerHTML = h;
    var cab = cogob.querySelector("#eoCogCab"), cuerpo = cogob.querySelector("#eoCogCuerpo");
    function abrirlo(on, guardar){
      cuerpo.hidden = !on; cab.setAttribute("aria-expanded", String(on)); cogob.classList.toggle("eo-cog-abierto", on);
      if(guardar){ var p = leerPref(); p.cogob = on; guardarPref(p); }
    }
    abrirlo(pref.cogob === true, false);
    cab.addEventListener("click", function(){ abrirlo(cuerpo.hidden, true); });
    cuerpo.addEventListener("click", function(e){
      var c = e.target.closest("[data-id]");
      if(c) location.hash = "#/estructura/" + encodeURIComponent(c.getAttribute("data-id"));
    });
  }
  function marcarCogob(id){
    if(!cogob) return;
    cogob.querySelectorAll("[data-id]").forEach(function(x){ x.classList.toggle("eo-sel", x.getAttribute("data-id") === id); });
  }

  function maquetar(){
    // Dos contenedores lado a lado, a la misma altura: el staff a la izquierda de la
    // línea que baja de la Presidencia y las unidades de negocio a la derecha, en el
    // orden de la cadena de valor. Dentro de cada contenedor, un recuadro agrupa los
    // niveles corporativos (direcciones y gerencias corporativas); debajo quedan las
    // gerencias país. Filas: 1 cima · 2 título del contenedor · 3 direcciones ·
    // 4 gerencias corporativas · 5 gerencias país · 6 comités.
    var NEG = E.DIRECCIONES.filter(function(d){ return d.caracter !== "staff"; });
    var STF = E.DIRECCIONES.filter(function(d){ return d.caracter === "staff"; });
    var cols = [], total = 0;   // por dirección de negocio: lista de subcolumnas
    NEG.forEach(function(dr){ var sc = subcolumnas(dr); cols.push(sc); total += sc.length; });
    // staff: una columna por dirección, en el orden del dato salvo la de más
    // dependencias, que va al final, junto a la línea de la Presidencia
    var cuantas = function(d){ var n = 0; (function k(hs){ (hs || []).forEach(function(x){ n++; k(x.hijos); }); })(d.hijos); return n; };
    var mayor = STF.slice().sort(function(a, b){ return cuantas(b) - cuantas(a); })[0];
    STF = STF.filter(function(d){ return d !== mayor; }).concat(mayor ? [mayor] : []);
    var colsS = STF.map(subcolumnas), nS = 0;
    colsS.forEach(function(sc){ nS += sc.length; });
    var hueco = nS + 1, nIni = nS + 2, nFin = nIni + total;
    lienzo.style.gridTemplateColumns = (nS ? "repeat(" + nS + ", var(--eo-col)) " : "") + "64px repeat(" + total + ", var(--eo-col))";

    var h = '';
    var R = {linea:2, tit:3, n1:4, n2:5, n3:6};
    // contenedores (detrás de todo): el del grupo, el recuadro corporativo y el título
    var contenedor = function(car, a, b){
      if(b <= a) return '';
      return '<div class="eo-grupo eo-g-' + car + '" style="grid-row:' + R.tit + ' / ' + (R.n3 + 1) + ';grid-column:' + a + ' / ' + b + '"></div>' +
             '<div class="eo-corp eo-g-' + car + '" style="grid-row:' + R.n1 + ' / ' + (R.n2 + 1) + ';grid-column:' + a + ' / ' + b + '"></div>' +
             '<div class="eo-grupotit eo-g-' + car + '" style="grid-row:' + R.tit + ';grid-column:' + a + ' / ' + b + '">' +
               '<span>' + (car === "negocio" ? '<b>Unidades de negocio</b> · la cadena de valor' : '<b>Staff</b> · ' + esc(E.rotuloStaff || 'apoyo a la Presidencia')) + '</span>' +
               '<span class="eo-gnota">recuadro: niveles corporativos · debajo: gerencias país</span>' +
             '</div>';
    };
    h += contenedor("staff", 1, hueco);
    h += contenedor("negocio", nIni, nFin);
    // marca del eje: la columna libre entre los dos contenedores, por donde baja la línea de mando
    h += '<div class="eo-eje" style="grid-row:1 / ' + (R.n3 + 1) + ';grid-column:' + hueco + '" aria-hidden="true"></div>';

    // cima: gobierno · Presidencia · staff de la Presidencia (se centra sobre el eje al final)
    h += '<div class="eo-cima" style="grid-row:1;grid-column:1 / ' + nFin + '">';
    h += '<div class="eo-gob">';
    E.GOBIERNO.forEach(function(g){ h += '<button type="button" class="eo-card eo-c-gob" data-id="' + esc(g.id) + '"><span class="eo-tag">Gobierno</span><span class="eo-ttl">' + esc(g.n) + '</span></button>'; });
    h += '</div>';
    h += caja(E.CEO, "eo-c-ceo", "Presidencia");
    h += '<div class="eo-staff">';
    E.STAFF.filter(function(s){ return !s.enLinea; }).forEach(function(s){ h += caja(s, "eo-c-staff", tagNivel(s)); });
    h += '</div></div>';
    // sobre la línea de mando, antes de las direcciones: sale por un costado de la línea central
    var enLinea = E.STAFF.filter(function(s){ return s.enLinea; });
    if(enLinea.length){
      h += '<div class="eo-enlinea" style="grid-row:' + R.linea + ';grid-column:1 / ' + nFin + '">';
      enLinea.forEach(function(s){ h += caja(s, "eo-c-staff", tagNivel(s)); });
      h += '</div>';
    }

    // staff: cada dirección ocupa sus subcolumnas, como las unidades de negocio
    var cS = 1;
    STF.forEach(function(dr, i){
      var sc = colsS[i], c = cS;
      h += '<div class="eo-celda eo-c1" style="grid-row:' + R.n1 + ';grid-column:' + c + ' / span ' + sc.length + '">' +
             caja(dr, "eo-c-dir eo-staff", "Staff · Dirección corporativa") + '</div>';
      sc.forEach(function(s, k){
        h += '<div class="eo-celda eo-c2" style="grid-row:' + R.n2 + ';grid-column:' + (c + k) + '">' +
               s.n2.map(function(n, j){ return caja(n, "eo-c-n2" + (n.nivel === "ccorp" ? " eo-c-ccorp" : "") + (j === 0 && n.hijos && n.hijos.length ? " eo-c-jefe" : ""), tagNivel(n)); }).join("") + '</div>';
        h += '<div class="eo-celda eo-c3" style="grid-row:' + R.n3 + ';grid-column:' + (c + k) + '">' +
               s.n3.map(cajaPais).join("") + '</div>';
      });
      cS += sc.length;
    });

    // unidades de negocio y sus subcolumnas
    var c0 = nIni;
    NEG.forEach(function(dr, i){
      var sc = cols[i], c = c0;
      h += '<div class="eo-celda eo-c1" style="grid-row:' + R.n1 + ';grid-column:' + c + ' / span ' + sc.length + '">' +
             caja(dr, "eo-c-dir eo-" + dr.caracter, (dr.caracter === "negocio" ? "Negocio" : "Staff") + " · Dirección corporativa") +
           '</div>';
      sc.forEach(function(s, k){
        h += '<div class="eo-celda eo-c2" style="grid-row:' + R.n2 + ';grid-column:' + (c + k) + '">';
        s.n2.forEach(function(n, j){
          var jefe = (j === 0 && n.hijos && n.hijos.length);
          h += caja(n, "eo-c-n2" + (n.nivel === "ccorp" ? " eo-c-ccorp" : "") + (jefe ? " eo-c-jefe" : ""), tagNivel(n));
        });
        h += '</div>';
        h += '<div class="eo-celda eo-c3" style="grid-row:' + R.n3 + ';grid-column:' + (c + k) + '">';
        s.n3.forEach(function(n){ h += cajaPais(n); });
        h += '</div>';
      });
      c0 += sc.length;
    });

    lienzo.innerHTML = h;
    svg = svgEl("svg", {"class":"eo-hilos", "aria-hidden":"true"});
    lienzo.insertBefore(svg, lienzo.firstChild);
    lienzo.querySelectorAll(".eo-card").forEach(function(el){
      var id = el.getAttribute("data-id"); if(NODOS[id]) NODOS[id].el = el;
    });
    centrarCima();
  }

  // La Presidencia se alinea con la columna libre entre los dos contenedores, para
  // que su línea baje entre el staff y el negocio. Se mide sin transformaciones
  // (offsets), que es como mide también el trazado de los hilos.
  function centrarCima(){
    var cima = lienzo.querySelector(".eo-cima"), eje = lienzo.querySelector(".eo-eje"), ceo = NODOS[E.CEO.id].el;
    if(!cima || !eje || !ceo) return;
    cima.style.justifyContent = "flex-start"; cima.style.paddingLeft = "0px";
    var ejeX = caja2(eje).x + eje.offsetWidth / 2;
    var c = caja2(ceo);
    cima.style.paddingLeft = Math.max(0, Math.round(ejeX - (c.x + c.w / 2))) + "px";
    // segunda pasada: corrige lo que haya movido el ajuste de línea de las cajas
    var c2 = caja2(ceo), d = ejeX - (c2.x + c2.w / 2);
    if(Math.abs(d) > 1) cima.style.paddingLeft = Math.max(0, parseFloat(cima.style.paddingLeft) + d) + "px";
    // las unidades sobre la línea, a un costado del eje
    var lin = lienzo.querySelector(".eo-enlinea");
    if(lin){ lin.style.paddingLeft = "0px"; lin.style.paddingLeft = Math.max(0, Math.round(ejeX - caja2(lin).x + 56)) + "px"; }
  }

  // ----------------------------------------------------------------- hilos
  function caja2(el){
    var x = 0, y = 0, n = el;
    while(n && n !== lienzo){ x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    return {x:x, y:y, w:el.offsetWidth, h:el.offsetHeight};
  }
  function trazar(){
    if(!svg || host.hidden) return;
    centrarCima();
    var W = lienzo.scrollWidth, H = lienzo.scrollHeight;
    svg.setAttribute("width", W); svg.setAttribute("height", H);
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    while(svg.firstChild) svg.removeChild(svg.firstChild);
    var ceo = NODOS[E.CEO.id].el; if(!ceo) return;
    var C = caja2(ceo);
    // La línea de mando baja de la Presidencia por la columna libre entre los dos
    // contenedores y se abre en un bus: a la izquierda el staff, a la derecha el negocio.
    var sx = C.x + C.w / 2;
    var cajas = E.DIRECCIONES.map(function(d){ return {car:d.caracter, b:caja2(NODOS[d.id].el)}; });
    var busY = Math.min.apply(null, cajas.map(function(k){ return k.b.y; })) - 22;
    ruta("M" + sx + "," + (C.y + C.h) + " V" + busY, "eo-h-linea eo-h-bus");
    [["staff", "eo-h-linea eo-h-staff"], ["negocio", "eo-h-linea eo-h-negocio"]].forEach(function(g){
      var de = cajas.filter(function(k){ return g[0] === "staff" ? k.car === "staff" : k.car !== "staff"; });
      if(!de.length) return;
      var xs = de.map(function(k){ return k.b.x + k.b.w / 2; });
      ruta("M" + Math.min.apply(null, xs.concat([sx])) + "," + busY + " H" + Math.max.apply(null, xs.concat([sx])), g[1]);
      de.forEach(function(k){ ruta("M" + (k.b.x + k.b.w / 2) + "," + busY + " V" + k.b.y, g[1]); });
    });

    // Toda unidad recibe su línea por arriba, en el centro de su borde superior.
    // Si el camino directo desde el padre cruza otra caja (hermanos apilados en la
    // misma columna), el tramo vertical va por el riel del margen de la columna y
    // entra a la caja por el hueco que tiene encima.
    var CAJAS = [];
    Object.keys(NODOS).forEach(function(id){ var el = NODOS[id].el; if(el && lienzo.contains(el)) CAJAS.push({el:el, b:caja2(el)}); });
    function cruza(x0, y0, x1, y1, fuera){
      var minX = Math.min(x0, x1), maxX = Math.max(x0, x1), minY = Math.min(y0, y1), maxY = Math.max(y0, y1);
      return CAJAS.some(function(k){
        if(fuera.indexOf(k.el) >= 0) return false;
        var b = k.b;
        return maxX >= b.x - 2 && minX <= b.x + b.w + 2 && maxY > b.y + 1 && minY < b.y + b.h - 1;
      });
    }

    ARISTAS.forEach(function(a){
      var A = NODOS[a.de].el, B = NODOS[a.a].el; if(!A || !B) return;
      var pa = caja2(A), pb = caja2(B);
      if(a.tipo === "punteada"){          // gobierno -> Presidencia
        var y = pa.y + pa.h / 2, x0 = pa.x + (pa.x < C.x ? pa.w : 0), x1 = pa.x < C.x ? C.x : C.x + C.w;
        ruta("M" + x0 + "," + y + " H" + x1, "eo-h-punteada");
        return;
      }
      if(a.tipo === "lateral"){           // Presidencia -> unidad sobre la línea, por un costado
        ruta("M" + sx + "," + (pb.y + pb.h / 2) + " H" + pb.x, "eo-h-punteada");
        return;
      }
      if(a.tipo === "staff"){
        var ys = pb.y + pb.h / 2;
        ruta("M" + (C.x + C.w) + "," + (C.y + C.h / 2) + " H" + ((C.x + C.w + pb.x) / 2) + " V" + ys + " H" + pb.x, "eo-h-punteada");
        return;
      }
      if(a.tipo !== "linea") return;
      if(NODOS[a.a].d.nivel === "coord"){
        // la coordinación cuelga con sangría justo debajo: baja recta a su borde superior
        var kx = Math.max(pa.x, pb.x) + 28;
        ruta("M" + kx + "," + (pa.y + pa.h) + " V" + pb.y, "eo-h-linea");
        return;
      }
      var px = pa.x + pa.w / 2, y0 = pa.y + pa.h, y1 = y0 + 13, tx = pb.x + pb.w / 2;
      if(!cruza(px, y1, tx, y1, [A, B]) && !cruza(tx, y1, tx, pb.y, [A, B])){
        ruta("M" + px + "," + y0 + " V" + y1 + " H" + tx + " V" + pb.y, "eo-h-linea");
        return;
      }
      // riel al margen izquierdo de la subcolumna del hijo; entra por el hueco de encima
      var cc = caja2(B.parentNode), rail = cc.x + 10, ya = pb.y - 13;
      ruta("M" + px + "," + y0 + " V" + y1 + " H" + rail + " V" + ya + " H" + tx + " V" + pb.y, "eo-h-linea");
    });
  }
  function ruta(d, clase){ svgEl("path", {d:d, "class":clase}, svg); }

  // ---------------------------------------------------------------- cámara
  var arrastro = false;
  function aplicar(){ world.style.transform = "translate(" + cam.x + "px," + cam.y + "px) scale(" + cam.s + ")"; }
  function ajustar(){
    var W = lienzo.scrollWidth, r = vp.getBoundingClientRect();
    cam.s = Math.max(.35, Math.min(1, (r.width - 32) / W));
    cam.x = Math.max(16, (r.width - W * cam.s) / 2); cam.y = 58;
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
    ocultarCapas();
    panel.hidden = true; host.classList.remove("eo-con-panel");
    lienzo.querySelectorAll(".eo-sel").forEach(function(x){ x.classList.remove("eo-sel"); });
    marcarCogob(null);
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
      {t:"Unidades de la Presidencia", f:function(n){ return NODOS[n].d.nivel === "staff"; }},
      {t:"Direcciones corporativas", f:function(n){ return E.DIRECCIONES.some(function(d){ return d.id === n; }); }},
      {t:"Gerencias corporativas", f:function(n){ return NODOS[n].d.nivel === "n2"; }},
      {t:"Gerencias de unidad de negocio", f:function(n){ return NODOS[n].d.nivel === "gun"; }},
      {t:"Coordinaciones corporativas", f:function(n){ return NODOS[n].d.nivel === "ccorp"; }},
      {t:"Gerencias país · en cada país", f:function(n){ return NODOS[n].d.nivel === "n3"; }},
      {t:"Coordinaciones país · en cada país", f:function(n){ return NODOS[n].d.nivel === "coord"; }}
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

  function htmlConsejo(k){
    var h = '<p>' + esc(k.proposito) + '</p>';
    if(k.integrantes) h += '<div class="eo-bloque"><h4>Integrantes</h4><p>' + esc(k.integrantes) + '</p></div>';
    if(k.nota) h += '<div class="eo-bloque eo-nota"><h4>Por qué así</h4><p>' + esc(k.nota) + '</p></div>';
    return h;
  }

  function abrir(id){
    if(!montado) return;
    if(id === "premisas") return premisas();
    if(id === "capas") return capas();
    ocultarCapas();
    var n = NODOS[id]; if(!n) return cerrar();
    lienzo.querySelectorAll(".eo-sel").forEach(function(x){ x.classList.remove("eo-sel"); });
    var d = n.d, h = '';
    if(n.el){ n.el.classList.add("eo-sel"); asomar(n.el); }
    marcarCogob(id);

    if(n.comite){
      // resalta en el dibujo a quien lo lidera y a quienes lo integran
      miembros(d).concat([d.lidera]).forEach(function(x){ var e = NODOS[x] && NODOS[x].el; if(e) e.classList.add("eo-sel"); });
      return abrirPanel("Comité · órgano de cogobierno", d.n, htmlComite(d, false));
    }
    if(n.consejo) return abrirPanel("Consejo · instancia de cogobierno", d.n, htmlConsejo(d));
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
    {id:"comites",        n:"Consejos y comités"},
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
      h += '<p class="eo-tenue">Órganos de cogobierno, sin línea de mando. Los consejos son de la familia propietaria; los comités los lidera y convoca una dirección corporativa y reúnen a sus pares.</p>';
      (E.CONSEJOS || []).forEach(function(k){ h += '<div class="eo-bloque eo-combloque"><h4 class="eo-comh">' + enlace(k.id) + '</h4>' + htmlConsejo(k) + '</div>'; });
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

  // ----------------------------------------------------------------- capas
  // Esquemas abstractos: cajas sin nombre, salvo los códigos de país y los
  // escalones del patrón, que son parte de la lógica y no unidades.
  function cajas(n, clase){ var h = ''; for(var i = 0; i < n; i++) h += '<span class="eo-k-b ' + clase + '"></span>'; return h; }
  function esquema(c){
    var staff = E.DIRECCIONES.filter(function(d){ return d.caracter === "staff"; }).length;
    var negocio = E.DIRECCIONES.length - staff;
    if(c.id === "gobierno")
      return '<div class="eo-k-fila">' + cajas(E.GOBIERNO.length, "eo-k-gob") + '</div>';
    if(c.id === "presidencia")
      return '<div class="eo-k-fila"><span class="eo-k-b eo-k-ceo"></span></div>' +
             '<div class="eo-k-fila eo-k-ejes"><div class="eo-k-grupo eo-k-gst">' + cajas(Math.ceil(staff / 2), "eo-k-dir eo-k-staff") + '</div>' +
               '<span class="eo-k-linea" aria-hidden="true"></span>' +
               '<div class="eo-k-grupo eo-k-gst">' + cajas(staff - Math.ceil(staff / 2), "eo-k-dir eo-k-staff") + '</div></div>' +
             '<div class="eo-k-fila eo-k-ley"><span>cabeza ejecutiva y, a los costados de su línea, el staff</span></div>';
    if(c.id === "n1")
      return '<div class="eo-k-fila">' +
               '<div class="eo-k-grupo eo-k-gneg">' + cajas(negocio, "eo-k-dir eo-k-neg") + '</div>' +
             '</div>' +
             '<div class="eo-k-fila eo-k-ley"><span class="eo-k-lneg">unidades de negocio · cadena de valor →</span></div>';
    if(c.id === "n2")
      return '<div class="eo-k-fila">' + E.DIRECCIONES.filter(function(d){ return d.caracter !== "staff"; }).map(function(){ return '<div class="eo-k-grupo eo-k-col">' + cajas(2, "eo-k-ger") + '</div>'; }).join("") + '</div>' +
             '<div class="eo-k-fila eo-k-ley"><span>alcance regional</span></div>';
    if(c.id === "gun"){
      // una gerencia corporativa por cada una que tenga gerencias de unidad de negocio dentro, con las suyas debajo
      var grupos = [];
      (function b(hs){ (hs || []).forEach(function(k){
        var n = (k.hijos || []).filter(function(x){ return x.nivel === "gun"; }).length;
        if(n) grupos.push(n);
        b(k.hijos);
      }); })([].concat.apply([], E.DIRECCIONES.map(function(d){ return d.hijos || []; })));
      return '<div class="eo-k-fila">' + grupos.map(function(n){
               return '<div class="eo-k-grupo eo-k-gung"><span class="eo-k-b eo-k-ger"></span><div class="eo-k-fila eo-k-gunf">' + cajas(n, "eo-k-gun") + '</div></div>';
             }).join("") + '</div>' +
             '<div class="eo-k-fila eo-k-ley"><span>dentro de una gerencia corporativa · para todo el grupo</span></div>';
    }
    if(c.id === "n3")
      return '<div class="eo-k-fila">' + E.PAISES.map(function(p){
               return '<div class="eo-k-pais"><span class="eo-k-pcod">' + esc(p.id) + '</span><div class="eo-k-fila">' + cajas(3, "eo-k-gp") + '</div></div>';
             }).join("") + '</div>' +
             '<div class="eo-k-fila eo-k-ley"><span>el mismo espejo en cada país</span></div>';
    if(c.id === "equipos")
      return '<ol class="eo-k-escalera">' + E.PATRON.slice(3).map(function(p){ return '<li>' + esc(p) + '</li>'; }).join("") + '</ol>';
    return '';
  }
  function capasHtml(){
    var K = E.CAPAS, nv = {};
    E.NIVELES.forEach(function(x){ nv[x.id] = x; });
    var h = '<div class="eo-k-int">';
    h += '<header class="eo-k-cab"><div class="eo-k-ceja">' + esc(E.titulo) + '</div><h2>' + esc(K.titulo) + '</h2><p>' + esc(K.bajada) + '</p></header>';
    h += '<div class="eo-k-pila" style="--eo-k-n:' + K.lista.length + '">';
    h += '<div class="eo-k-eje eo-k-baja" aria-hidden="true"><span>' + esc(K.ejes.baja) + '</span></div>';
    K.lista.forEach(function(c, i){
      var base = c.nivel ? nv[c.nivel] : null, nombre = base ? base.n : c.n;
      h += '<section class="eo-k-capa eo-k-c-' + esc(c.id) + '" style="grid-row:' + (i + 1) + '">' +
             '<div class="eo-k-rot"><span class="eo-k-num">Capa ' + (i + 1) + '</span><h3>' + esc(nombre) + '</h3>' +
               '<span class="eo-k-verbo">' + esc(c.verbo) + '</span>' +
               (c.escalon ? '<span class="eo-k-esc">' + esc(c.escalon) + '</span>' : '') + '</div>' +
             '<div class="eo-k-esq" aria-hidden="true">' + esquema(c) + '</div>' +
             '<p class="eo-k-d">' + (base ? esc(base.d) + ' ' : '') + esc(c.d) + '</p>' +
           '</section>';
    });
    h += '<div class="eo-k-eje eo-k-sube" aria-hidden="true"><span>' + esc(K.ejes.sube) + '</span></div>';
    h += '</div>';
    h += '<h3 class="eo-k-subt">Lo que cruza las capas</h3><div class="eo-k-cruzan">' +
           K.cruzan.map(function(x){ return '<div class="eo-k-cruza"><h4>' + esc(x.n) + '</h4><p>' + esc(x.d) + '</p></div>'; }).join("") + '</div>';
    h += '<p class="eo-k-pie"><a class="btn btn-marca" href="#/estructura">Ver la estructura con sus unidades →</a></p>';
    return h + '</div>';
  }
  function capas(){
    if(!montado || !E.CAPAS) return;
    cerrar();
    var v = host.querySelector("#eoCapas");
    if(!v.firstChild) v.innerHTML = capasHtml();
    v.hidden = false; v.scrollTop = 0;
    host.classList.add("eo-modo-capas");
    host.querySelector("#eoCapasBtn").setAttribute("aria-pressed", "true");
  }
  function ocultarCapas(){
    if(!host) return;
    var v = host.querySelector("#eoCapas"); if(!v || v.hidden) return;
    v.hidden = true; host.classList.remove("eo-modo-capas");
    host.querySelector("#eoCapasBtn").setAttribute("aria-pressed", "false");
    requestAnimationFrame(trazar);
  }

  window.EstructuraRender = {
    montar: montar,
    abrir: abrir,
    premisas: premisas,
    capas: capas,
    cerrar: cerrar,
    retrazar: function(){ if(montado) trazar(); }
  };
})();
