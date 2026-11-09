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
// corporativa que tenga hijos propios (Ventas, Mercadeo). Si sus gerencias de unidad
// de negocio tienen gerencia país propia (Ventas), cada una ocupa su columna y la
// gerencia corporativa las abarca desde arriba (ramas()). Los hilos se trazan
// después de maquetar, midiendo las cajas: peine vertical por el margen
// izquierdo de cada subcolumna.
//
// Gerencias país y coordinaciones país: plegadas son una caja que resume los países
// (dibujada como una pila, una hoja por país); con «Por país» se abren en una caja por
// país, con su ocupante y debajo su equipo; donde no hay equipo, una línea que baja sin caja
// («equipo por desarrollar»). Las abiertas se recuerdan en rower.fase2.estructura (expandidas).
//
// Equipos (09-nov-2026): unidades nivel 'coord' con puesto:'coord|sup|ana|aux|ope': el cargo de
// hoy y cuántas personas lo ocupan. Cuelgan en árbol de su jefe (arbolDe) y heredan sus
// decisiones (listaDec).
// La rueda del mouse acerca y aleja; para moverse se arrastra.
//
// Consejos y comités: no se dibujan en el lienzo (al pie se perdían de vista). Van en
// un flotante desplegable fijo en la parte superior de la vista, que no se mueve con
// el pan/zoom. Los consejos (E.CONSEJOS) no tienen línea hacia la Presidencia.
//
// Vista «Capas» (#/estructura/capas): la lógica de conformación sin unidades
// ni ocupantes, para explicarla antes del organigrama. Sale de E.CAPAS.
//
// Panel de capas (09-nov-2026): acoplado a la izquierda del lienzo, dice en qué capa está
// quien recorre el mapa: la de la caja más cercana al centro de la pantalla. Se recalcula
// con cada movimiento de la cámara y, al pulsar una capa, la cámara va a ella. Se define
// aquí y no en el dato a propósito: tocar estructura-tobe-datos.js cambia su huella y deja
// sin efecto las versiones de la estructura publicadas en la plataforma.
//
// API: EstructuraRender.montar(section) · .abrir(id) · .premisas(pestaña) · .capas() · .cerrar() · .rehacer()
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var E = null, host = null, vp = null, world = null, lienzo = null, svg = null;
  var panel = null, pcuerpo = null, cogob = null, montado = false;
  var globales = false;   // los oyentes de document/window se ponen una sola vez, aunque se rehaga
  var leyOyente = false, leyActual = null;   // el de la leyenda, igual: apunta a la leyenda vigente
  var barObs = null;       // mide la barra: si se parte en dos filas, los flotantes bajan con ella
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
          // con atiende, la unidad recibe norma o servicio de esas gerencias de unidad de
          // negocio, pero su línea de mando sigue bajando de su gerencia corporativa
          // (modelo de red de Mercadeo, 29-oct-2026): atiende no dibuja línea
          ARISTAS.push({de:padre, a:h.id, tipo:h.enLinea ? "lateral-dir" : "linea"});
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
    // Gerencia corporativa que reporta directo a la Presidencia (nivel 'n2' en
    // DIRECCIONES): una sola columna, ella en la fila de las gerencias corporativas
    // con sus gerencias de unidad de negocio debajo, y sus gerencias país abajo.
    if(dr.nivel === "n2"){
      var g = {n2:[dr], n3:[]};
      (dr.hijos || []).forEach(function(k){ if(k.nivel !== "coord" && !k.enLinea) (k.nivel === "n3" ? g.n3 : g.n2).push(k); });
      return [g];
    }
    var out = [];
    (dr.hijos || []).forEach(function(h){
      if(h.enLinea) return;   // cuelga de la línea de la dirección, en su propia celda
      var rs = h.nivel === "n3" ? null : ramas(h);
      if(rs){
        // una columna por gerencia de unidad de negocio, con su gerencia país debajo;
        // la primera lleva la cabeza (la gerencia corporativa), que abarca todas
        var com = comunes(h);
        rs.forEach(function(g, i){
          out.push({n2:[], n3:(g.hijos || []).filter(function(k){ return k.nivel === "n3"; }), rama:g, cabeza:i === 0 ? h : null, span:rs.length,
                    comun:com.length ? com : null});
        });
        var resto = (h.hijos || []).filter(function(k){ return rs.indexOf(k) < 0 && com.indexOf(k) < 0 && k.nivel !== "coord" && !k.enLinea; });
        if(resto.length) out.push({n2:resto.filter(function(k){ return k.nivel !== "n3"; }), n3:resto.filter(function(k){ return k.nivel === "n3"; })});
        return;
      }
      var sc = h.nivel === "n3" ? {n2:[], n3:[h]} : {n2:[h], n3:[]};
      (h.nivel === "n3" ? [] : (h.hijos || [])).forEach(function(k){
        if(k.nivel === "coord" || k.enLinea) return;
        (k.nivel === "n3" ? sc.n3 : sc.n2).push(k);
      });
      out.push(sc);
    });
    if(!out.length) out.push({n2:[], n3:[]});
    return out;
  }

  // Gerencias de unidad de negocio que tienen gerencia país propia (en Ventas: la de
  // cada canal con la de cada país). Si las hay, la gerencia corporativa se abre en
  // columnas, una por rama, para que se lea que la gerencia país reporta a la de su
  // canal y no a la gerencia corporativa.
  // También se abre si una gerencia país suya recibe norma o servicio de esas
  // gerencias de unidad de negocio (atiende): en Mercadeo, la gerencia país va centrada
  // debajo de las tres, y su línea baja de la gerencia corporativa por el hueco entre
  // dos de ellas.
  // Desde el 06-nov-2026 también se abre en columnas la gerencia corporativa con dos o más
  // coordinaciones corporativas o gerencias de unidad de negocio sin gerencia país propia
  // (Compras, Mercadeo): las hermanas van lado a lado, no apiladas, y sus gerencias país
  // quedan centradas debajo, con la línea que baja de la gerencia corporativa.
  function conPais(h){
    return (h.hijos || []).filter(function(k){
      return k.nivel === "gun" && (k._conN3 || (k.hijos || []).some(function(x){ return x.nivel === "n3"; }));
    });
  }
  function hermanas(h){ return (h.hijos || []).filter(function(k){ return (k.nivel === "gun" || k.nivel === "ccorp") && !k.enLinea; }); }
  function conAtiende(h){ return (h.hijos || []).filter(function(k){ return k.nivel === "n3" && k.atiende && k.atiende.length; }); }
  function ramas(h){
    var gs = conPais(h);
    if(gs.length) return gs;
    gs = hermanas(h);
    return (gs.length >= 2 || (gs.length && conAtiende(h).length)) ? gs : null;
  }
  function comunes(h){
    if(conPais(h).length) return conAtiende(h);
    return ramas(h) ? (h.hijos || []).filter(function(k){ return k.nivel === "n3" && !k.enLinea; }) : [];
  }
  // Celda de la gerencia corporativa abierta en ramas: ella arriba, centrada sobre sus
  // columnas (subgrid), y cada gerencia de unidad de negocio en la suya.
  function celdaRamas(sc, k, fila, col){
    var cab = sc[k].cabeza, n = sc[k].span;
    var h = '<div class="eo-celda eo-c2 eo-ramas" style="grid-row:' + fila + ';grid-column:' + col + ' / span ' + n + '">' +
            '<div class="eo-rcab' + (lateral(cab).length ? ' eo-rcab-lat' : '') + '">' + caja(cab, "eo-c-n2 eo-c-jefe", tagNivel(cab)) + enLineaDir(cab) + '</div>';
    for(var i = 0; i < n; i++){
      var g = sc[k + i].rama;
      h += '<div class="eo-rama" style="grid-column:' + (i + 1) + '">' + caja(g, "eo-c-n2", tagNivel(g)) + arbolDe(g) + '</div>';
    }
    return h + '</div>';
  }

  // Unidades que cuelgan de la línea que baja de una dirección o de una gerencia
  // corporativa abierta en ramas (enLinea), a un costado
  function lateral(dr){ return (dr.hijos || []).filter(function(h){ return h.enLinea; }); }
  function enLineaDir(dr){
    var hs = lateral(dr);
    return hs.length ? '<div class="eo-dirlinea">' + hs.map(function(h){ return '<div class="eo-dlcol">' + caja(h, "eo-c-n2", tagNivel(h)) + arbolDe(h) + '</div>'; }).join("") + '</div>' : '';
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
    if(d.etiqueta !== undefined && d.nivel !== "staff") return d.etiqueta;
    if(d.nivel === "n2") return "Gerencia corporativa";
    if(d.nivel === "n3") return "Gerencia país";
    if(d.nivel === "coord") return "Coordinación país";
    if(d.nivel === "ccorp") return "Coordinación corporativa";
    if(d.nivel === "gun") return "Gerencia de unidad de negocio";
    if(d.nivel === "staff") return d.etiqueta !== undefined ? d.etiqueta : "Staff de la Presidencia";
    return "";
  }
  // decisiones por tomar (06-nov-2026): la caja lleva un distintivo rojo
  // Una caja de equipo (puesto) no lleva decisiones propias salvo que las tenga: hereda las de
  // la unidad de la que cuelga, que es quien decide cómo se arma ese equipo.
  function listaDec(d){
    if(!d) return [];
    if(d.decisiones && d.decisiones.length) return d.decisiones;
    var n = NODOS[d.id];
    if(n && n.d.puesto){ var p = NODOS[n.padre]; while(p){ if(p.d.decisiones && p.d.decisiones.length) return p.d.decisiones; p = NODOS[p.padre]; } }
    return [];
  }
  function decide(d){ return listaDec(d).length > 0; }
  // Aprobación (09-nov-2026): la aureola de la caja dice si esa parte de la estructura ya se
  // aprobó. Va por capa: las direcciones y las gerencias corporativas sí; lo que está debajo,
  // no. También están aprobadas las unidades de la Presidencia (Asistencia Ejecutiva y
  // Consultoría Jurídica). Las direcciones de RAMAS_SIN_APROBAR aún no, con todo lo que cuelga
  // de ellas. La Presidencia y la Junta no llevan aureola. Se define aquí y no en el dato para
  // no cambiar la huella de estructura-tobe-datos.js. Cuando se apruebe otra capa, se añade su
  // nivel a CAPAS_APROBADAS; cuando se apruebe una rama, se quita de RAMAS_SIN_APROBAR.
  var CAPAS_APROBADAS = ["n2"];
  var RAMAS_SIN_APROBAR = ["marca"];
  function aprobacion(d){
    var n = d && NODOS[d.id];
    if(!n) return "";
    if(!n.dir) return n.padre === E.CEO.id ? "si" : "";
    if(RAMAS_SIN_APROBAR.indexOf(n.dir) >= 0) return "no";
    return n.dir === d.id || CAPAS_APROBADAS.indexOf(d.nivel) >= 0 ? "si" : "no";
  }
  var TXT_APROB = {si:"Esta parte de la estructura ya está aprobada", no:"Esta parte de la estructura aún no está aprobada"};
  function claseAprob(d){ var a = aprobacion(d); return a ? " eo-ap-" + a : ""; }
  function marcaDecide(d){
    return decide(d) ? '<span class="eo-dec" title="' + esc(listaDec(d).join(" · ")) + '"><i aria-hidden="true">!</i>Decisión por tomar</span>' : '';
  }
  function caja(d, clase, extraTag){
    var a = aprobacion(d);
    var h = '<button type="button" class="eo-card ' + clase + (decide(d) ? ' eo-decide' : '') + claseAprob(d) + '" data-id="' + esc(d.id) + '" aria-haspopup="dialog"' + (a ? ' title="' + esc(TXT_APROB[a]) + '"' : '') + '>';
    h += marcaDecide(d);
    h += '<span class="eo-tag">' + esc(extraTag || "") + '</span>';
    h += '<span class="eo-ttl">' + esc(d.n) + '</span>';
    if(d.sub) h += '<span class="eo-sub">' + esc(d.sub) + '</span>';
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
    } else if(d.marcas){
      // un titular por marca, en filas como las de país
      h += '<span class="eo-paises eo-marcas">' + d.marcas.map(function(o){
        return '<span class="eo-pais eo-e-' + esc(o.estado) + '" title="' + esc(o.marca + " — " + o.nombre) + '">' +
               '<b class="eo-pcod eo-mcod">' + esc(o.marca) + '</b>' + punto(o.estado) +
               '<span class="eo-onom eo-ocup">' + esc(o.nombre) + '</span></span>';
      }).join("") + '</span>';
    } else if(d.ocupantes && d.ocupantes.length){
      h += d.ocupantes.map(lineaOcupante).join("");
    } else h += lineaOcupante(d.ocupante);
    return h + '</button>';
  }

  // Gerencia país con sus coordinaciones debajo, con sangría: es la única estructura
  // interna que se dibuja, para las unidades que deben existir con responsable propio.
  // Plegada: una caja que resume los países, con una pestaña para abrirla.
  // Abierta (EXP[id]): una caja por país, con su ocupante, sus coordinaciones y una
  // línea que baja sin caja: el equipo del país queda por desarrollar.
  var EXP = {};
  // Despliegue por niveles (29-oct-2026): de entrada solo se ve la Presidencia; cada unidad
  // con reportes lleva un botón que muestra (o vuelve a ocultar) su nivel siguiente.
  // DESP[id] = true: la unidad tiene desplegados sus reportes directos. No se guarda:
  // cada visita arranca desde la Presidencia, que es como se presenta.
  var DESP = {};
  var ANCHO_PAIS = 178, HUECO_PAIS = 12;
  function paisesDe(k){ return E.PAISES.filter(function(p){ return k.paises && k.paises[p.id]; }); }
  function anchoAbierta(k){ var n = paisesDe(k).length; return n * ANCHO_PAIS + (n - 1) * HUECO_PAIS; }
  function cajaPais(k){
    var ps = paisesDe(k), np = ps.length;
    var coords = (k.hijos || []).filter(function(x){ return x.nivel === "coord"; });
    if(EXP[k.id] && np) return cajaPaisAbierta(k, ps);
    var h = '<div class="eo-pwrap">' + caja(k, "eo-c-n3 eo-pila-" + Math.min(np, 4), "Gerencia país · " + np + (np === 1 ? " país" : " países")) +
            (np > 1 ? '<button type="button" class="eo-pexp" data-exp="' + esc(k.id) + '" aria-expanded="false" title="Ver una caja por país">' +
                      '<i aria-hidden="true">⊞</i>Por país</button>' : '') + '</div>';
    // Dos o más coordinaciones país (06-nov-2026, Mercadeo país): van en fila debajo de
    // la gerencia país, cada una con su línea desde ella, y no apiladas con sangría.
    // Debajo de cada una, su equipo en árbol (arbolDe).
    var fila = coords.length > 1;
    if(fila) h += '<div class="eo-pcoords">';
    coords.forEach(function(x){
      var px = paisesDe(x), item;
      if(x.puesto) item = caja(x, "eo-c-puesto", x.etiqueta || "") + arbolDe(x);
      else if(EXP[x.id] && px.length) item = cajaPaisAbierta(x, px, true);
      else item = '<div class="eo-pwrap eo-pwrap-coord">' + caja(x, "eo-c-n3 eo-c-coord eo-pila-" + Math.min(px.length, 4), x.etiqueta || "Coordinación país") +
           (px.length > 1 ? '<button type="button" class="eo-pexp" data-exp="' + esc(x.id) + '" aria-expanded="false" title="Ver una caja por país">' +
                            '<i aria-hidden="true">⊞</i>Por país</button>' : '') + '</div>' + arbolDe(x);
      h += fila ? '<div class="eo-eqcol">' + item + '</div>' : item;
    });
    if(fila) h += '</div>';
    return h;
  }
  // El equipo de una unidad (09-nov-2026): los cargos de hoy, cada uno con su caja, colgando de
  // quien corresponde. En el dato son unidades con puesto:'sup|ana|aux|ope|coord'.
  function arbolDe(n){
    var hs = (n.hijos || []).filter(function(x){ return x.puesto; });
    if(!hs.length) return "";
    return '<div class="eo-arbol">' + hs.map(function(x){
      return '<div class="eo-arbol-n">' + caja(x, "eo-c-puesto", x.etiqueta || "") + arbolDe(x) + '</div>';
    }).join("") + '</div>';
  }
  // Ancho que pide la fila de coordinaciones de una gerencia país plegada
  var ANCHO_COORD = 196, HUECO_COORD = 14;
  function anchoCoords(k){
    var cs = (k.hijos || []).filter(function(x){ return x.nivel === "coord"; });
    if(cs.length < 2 || EXP[k.id]) return 0;
    return cs.reduce(function(w, x){ return w + (EXP[x.id] && paisesDe(x).length ? anchoAbierta(x) : ANCHO_COORD); }, 0) + (cs.length - 1) * HUECO_COORD;
  }
  function cargoPais(o){ return o.cargo && o.cargo !== "Gerencia" ? o.cargo + " país" : "Gerencia país"; }
  // Una caja por país: la unidad y, debajo, su equipo en ese país, con más sangría a cada nivel.
  function cajaEnPais(x, pais, prof){
    var c = x.paises && x.paises[pais]; if(!c) return "";
    var mg = 26 + (prof - 1) * 14;
    var h = '<button type="button" class="eo-card eo-c-n3 eo-c-pp ' + (x.puesto ? 'eo-c-puesto' : 'eo-c-coord') + (decide(x) ? ' eo-decide' : '') + claseAprob(x) +
            '" style="margin-left:' + mg + 'px;width:calc(100% - ' + mg + 'px)" data-id="' + esc(x.id) + '" data-pais="' + esc(pais) + '" aria-haspopup="dialog">' +
            marcaDecide(x) + '<span class="eo-tag">' + esc(x.etiqueta || "Coordinación país") + '</span><span class="eo-ttl">' + esc(x.n) + '</span>' + lineaOcupante(c) + '</button>';
    (x.hijos || []).forEach(function(k){ if(k.nivel === "coord") h += cajaEnPais(k, pais, prof + 1); });
    return h;
  }
  function cajaPaisAbierta(k, ps, esCoord){
    var h = '<div class="eo-pexpand' + (esCoord ? ' eo-pexpand-coord' : '') + '" style="width:' + anchoAbierta(k) + 'px">' +
            '<button type="button" class="eo-pcab' + claseAprob(k) + '" data-exp="' + esc(k.id) + '" data-ancla="' + esc(k.id) + '" aria-expanded="true" title="Volver a una sola caja">' +
              '<b>' + esc(k.n) + '</b><span>' + ps.length + (esCoord ? ' coordinaciones país' : ' gerencias país') + '</span><i aria-hidden="true">⊟</i></button>' +
            '<div class="eo-pfila">';
    ps.forEach(function(p){
      var o = k.paises[p.id];
      h += '<div class="eo-pcol">' +
             '<button type="button" class="eo-card eo-c-n3 eo-c-pp' + (esCoord ? ' eo-c-pcoord' : '') + (decide(k) ? ' eo-decide' : '') + claseAprob(k) + '" data-id="' + esc(k.id) + '" data-pais="' + esc(p.id) + '" aria-haspopup="dialog" title="' + esc(p.n + " — " + o.nombre) + '">' +
               marcaDecide(k) +
               '<span class="eo-tag">' + esc(esCoord ? (k.etiqueta || "Coordinación país") : cargoPais(o)) + '</span>' +
               '<span class="eo-ttl">' + esc(k.n) + '</span>' +
               '<span class="eo-ppais"><b class="eo-pcod">' + esc(p.id) + '</b>' + esc(p.n) + '</span>' +
               lineaOcupante(o) +
             '</button>';
      var dentro = "";
      (k.hijos || []).forEach(function(x){ if(x.nivel === "coord") dentro += cajaEnPais(x, p.id, 1); });
      h += dentro || '<span class="eo-pstub" aria-hidden="true"></span><span class="eo-pstubtxt">equipo por desarrollar</span>';
      h += '</div>';
    });
    return h + '</div></div>';
  }
  function alternar(id, abrirla){
    var n = NODOS[id]; if(!n) return;
    var antes = n.el ? n.el.getBoundingClientRect() : null;
    EXP[id] = abrirla === undefined ? !EXP[id] : abrirla;
    if(!EXP[id]) delete EXP[id];
    var p = leerPref(); p.expandidas = Object.keys(EXP); guardarPref(p);
    remaquetar();
    // la unidad se queda donde estaba en la pantalla
    var ahora = n.el ? n.el.getBoundingClientRect() : null;
    if(antes && ahora){ cam.x += (antes.left + antes.width / 2) - (ahora.left + ahora.width / 2); cam.y += antes.top - ahora.top; aplicar(); }
    if(!panel.hidden && actual === id) abrir(id);
    actualizarTodas();
  }
  function remaquetar(){
    maquetar(); trazar();
    if(!panel.hidden && actual) marcar(actual);
  }
  function unidadesPais(){ return Object.keys(NODOS).filter(function(id){ var d = NODOS[id].d; return (d.nivel === "n3" || d.nivel === "coord") && !d.puesto && paisesDe(d).length > 1; }); }
  function actualizarTodas(){
    var b = host.querySelector("#eoExpTodas"); if(!b) return;
    var todas = unidadesPais(), abiertas = todas.filter(function(id){ return EXP[id]; }).length;
    b.setAttribute("aria-pressed", String(abiertas === todas.length));
    b.textContent = abiertas === todas.length ? "Contraer países" : "Abrir todos los países";
  }

  // --------------------------------------------------------------- montaje
  function montar(section){
    var datos = window.ESTRUCTURA_TOBE;
    if(!datos) return;
    host = section;
    // Si cambió la estructura (versión de la plataforma o vista previa), se rehace entero:
    // conservar el dibujo con datos nuevos mezclaría las dos versiones.
    if(montado && datos === E){ requestAnimationFrame(trazar); return; }
    E = datos;
    montado = false;
    montado = true;
    indexar();
    var pref = leerPref();

    var h = '';
    h += '<div class="mp-bar eo-bar">' +
           '<a class="mp-btn" href="#/">‹ Índice</a>' +
           '<div class="mp-tit">' + esc(E.titulo) + ' <span class="eo-corte">borrador · ' + esc(E.corte) + '</span></div>' +
           '<div class="mp-sp"></div>' +
           // «Capas y Funcionamiento» (29-oct-2026) reemplaza al botón «Capas»: la vista #/estructura/capas
           // sigue existiendo por su ruta, pero la barra lleva a la página de capas y modelos de funcionamiento
           '<a class="mp-btn" id="eoCapasBtn" href="estructura-funcionamiento.html">Capas y Funcionamiento</a>' +
           '<button class="mp-btn" id="eoNivBtn" aria-pressed="false" title="Mostrar todos los niveles, o volver a dejar solo la Presidencia">Desplegar todo</button>' +
           '<button class="mp-btn" id="eoLeyBtn" aria-pressed="true" aria-controls="eoLey">Leyenda</button>' +
           '<button class="mp-btn" id="eoOcup" aria-pressed="true">Ocupantes</button>' +
           '<button class="mp-btn" id="eoVac" aria-pressed="false">Resaltar abiertas</button>' +
           '<button class="mp-btn" id="eoExpTodas" aria-pressed="false">Abrir todos los países</button>' +
           '<a class="mp-btn eo-btn-prem" href="#/estructura/premisas">Premisas del diseño</a>' +
         '</div>';
    h += '<div class="eo-capas" id="eoCapas" hidden></div>';
    h += '<div class="eo-vp" id="eoVp"><div class="eo-world" id="eoWorld"><div class="eo-lienzo" id="eoLienzo"></div></div></div>';
    h += capasPanelHtml();
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

    (pref.expandidas || []).forEach(function(id){ if(NODOS[id]) EXP[id] = true; });
    maquetar();
    actualizarTodas();
    host.querySelector("#eoExpTodas").addEventListener("click", function(){
      var todas = unidadesPais(), abrir = todas.some(function(id){ return !EXP[id]; });
      EXP = {}; if(abrir) todas.forEach(function(id){ EXP[id] = true; });
      var p = leerPref(); p.expandidas = Object.keys(EXP); guardarPref(p);
      remaquetar(); ajustar(); actualizarTodas();
    });
    host.querySelector("#eoNivBtn").addEventListener("click", function(){
      if(todosDesplegados()) DESP = {};
      else Object.keys(NODOS).forEach(function(id){ if(reportes(id).length) DESP[id] = true; });
      remaquetar(); botonTodo(); ajustarVisible(true);
    });
    botonTodo();
    montarLeyenda(pref);
    montarCogob(pref);
    medirBarra();
    montarCapasPanel(pref);

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
      var nv = e.target.closest("[data-niv]");
      if(nv){ e.stopPropagation(); alternarNivel(nv.getAttribute("data-niv")); return; }
      var x = e.target.closest("[data-exp]");
      if(x){ alternar(x.getAttribute("data-exp")); return; }
      var c = e.target.closest(".eo-card,.eo-comite");
      if(c) location.hash = "#/estructura/" + encodeURIComponent(c.getAttribute("data-id"));
    });
    host.querySelector("#eoPx").addEventListener("click", function(){ location.hash = "#/estructura"; });
    pcuerpo.addEventListener("click", function(e){
      var x = e.target.closest("[data-exp]");
      if(x){ alternar(x.getAttribute("data-exp")); return; }
      var t = e.target.closest("[data-tab]");
      if(t){ location.hash = "#/estructura/premisas/" + t.getAttribute("data-tab"); }
    });
    if(!globales){
      globales = true;
      document.addEventListener("keydown", function(e){
        if(e.key === "Escape" && !host.hidden && !panel.hidden) location.hash = "#/estructura";
      });
      window.addEventListener("resize", function(){ if(!host.hidden) ajustar(); });
    }

    camara();
    requestAnimationFrame(function(){ trazar(); ajustarVisible(false, focoInicial); });
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
         '<span><i class="eo-lsw eo-sw-stub"></i>Línea sin caja: equipo por desarrollar</span>' +
         '<span><i class="eo-lsw eo-sw-ap-si"></i>Estructura aprobada</span>' +
         '<span><i class="eo-lsw eo-sw-ap-no"></i>Estructura aún sin aprobar</span>' +
         '<span><i class="eo-lsw eo-sw-dec"></i>Decisión por tomar</span>' +
         '</div>';
  }
  function montarLeyenda(pref){
    var ley = host.querySelector("#eoLey"), asa = host.querySelector("#eoLeyAsa"), btn = host.querySelector("#eoLeyBtn");
    var movida = !!pref.ley;   // quien la movió manda; si no, sigue la posición por defecto
    function ver(on){
      ley.hidden = !on; btn.setAttribute("aria-pressed", String(on));
      var p = leerPref(); p.leyOculta = !on; guardarPref(p);
      if(on) encajar();
    }
    // dentro de la vista, bajo la barra; nunca fuera de lo visible
    function encajar(){
      var bar = host.querySelector(".eo-bar"), top0 = bar ? bar.offsetHeight + 8 : 8;
      // el panel de capas ocupa el costado izquierdo: la leyenda no se mete debajo. Sin una
      // posición elegida va bajo la fila de «Consejos y comités», para no chocar a ningún ancho.
      var minX = (vp ? vp.offsetLeft : 0) + 8;
      if(!movida){ ley.style.left = ""; ley.style.top = ""; }
      var maxX = Math.max(minX, host.clientWidth - ley.offsetWidth - 8), maxY = Math.max(top0, host.clientHeight - ley.offsetHeight - 8);
      var x = Math.min(Math.max(minX, parseFloat(ley.style.left) || minX + 8), maxX);
      var y = Math.min(Math.max(top0, parseFloat(ley.style.top) || top0 + 46), maxY);
      ley.style.left = x + "px"; ley.style.top = y + "px";
    }
    if(pref.ley){ ley.style.left = pref.ley.x + "px"; ley.style.top = pref.ley.y + "px"; }
    ver(pref.leyOculta !== true);
    btn.addEventListener("click", function(){ ver(ley.hidden); });
    host.querySelector("#eoLeyX").addEventListener("click", function(){ ver(false); btn.focus(); });
    var arr = null;
    asa.addEventListener("pointerdown", function(e){
      if(e.target.closest("button")) return;
      arr = {x:e.clientX - ley.offsetLeft, y:e.clientY - ley.offsetTop}; movida = true;
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
      e.preventDefault(); movida = true; ley.style.left = (ley.offsetLeft + d[0]) + "px"; ley.style.top = (ley.offsetTop + d[1]) + "px"; encajar();
      var p = leerPref(); p.ley = {x:ley.offsetLeft, y:ley.offsetTop}; guardarPref(p);
    });
    leyActual = { ley: ley, encajar: encajar };
    if(!leyOyente){ leyOyente = true; window.addEventListener("resize", function(){ if(leyActual && !leyActual.ley.hidden) leyActual.encajar(); }); }
  }

  // La barra se parte en dos filas en pantallas angostas o cuando el manual le añade botones
  // (versión, tutorial). Su alto va a --eo-bar-h, que usan los flotantes, y la leyenda se reencaja.
  function medirBarra(){
    var bar = host.querySelector(".eo-bar"); if(!bar) return;
    function fijar(){
      host.style.setProperty("--eo-bar-h", bar.offsetHeight + "px");
      if(leyActual && !leyActual.ley.hidden) leyActual.encajar();
    }
    if(barObs) barObs.disconnect();
    if(window.ResizeObserver){ barObs = new ResizeObserver(fijar); barObs.observe(bar); }
    fijar();
  }

  // ------------------------------------------------------ panel de capas
  // Las capas tal como se ven de arriba abajo en el mapa, con los dos rótulos que el propio
  // lienzo usa. Son más que las siete de la vista «Capas» porque las cajas de coordinación
  // llevan ese rótulo y el panel tiene que coincidir con lo que dice la caja.
  var CN_GRUPOS = [
    {capas:["gobierno", "presidencia"]},
    {t:"Capa corporativa", capas:["n1", "n2", "gun", "ccorp"]},
    {t:"Capa país", capas:["n3", "coord"]},
    {t:"Equipos", capas:["sup", "ana", "aux", "ope", "equipos"]}
  ];
  var CN_PROPIAS = {
    ccorp:{n:"Coordinaciones corporativas", verbo:"Llevan una especialidad dentro de su gerencia"},
    coord:{n:"Coordinaciones y jefaturas", verbo:"Conducen cada función"},
    sup:{n:"Supervisores y especialistas", verbo:"Lideran un turno o una especialidad"},
    ana:{n:"Analistas", verbo:"Hacen el trabajo técnico y profesional"},
    aux:{n:"Auxiliares", verbo:"Apoyan y atienden: asesores, cajeros, asistentes"},
    ope:{n:"Operarios", verbo:"Hacen el trabajo físico"},
    equipos:{n:"Equipos por desarrollar", verbo:"Aún sin dibujar"}
  };
  var CN_SIN = "Aún no se ve en el mapa: despliégala con el botón + de las cajas.";
  var CN_SIN_EQUIPOS = "Se ve al abrir una unidad «Por país» donde ese país aún no tiene equipo dibujado.";
  var cnCajas = [], cnClave = null, cnPend = false;

  function capaInfo(id){
    if(CN_PROPIAS[id]) return CN_PROPIAS[id];
    var c = ((E.CAPAS && E.CAPAS.lista) || []).filter(function(x){ return x.id === id; })[0] || {};
    var nv = (E.NIVELES || []).filter(function(x){ return x.id === id; })[0];
    var FIJOS = {gobierno:"Gobierno", presidencia:"Presidencia", n1:"Direcciones corporativas", n2:"Gerencias corporativas",
                 gun:"Gerencias de unidad de negocio", n3:"Gerencias país", equipos:"Equipos"};
    return {n:c.n || (nv && nv.n) || FIJOS[id], verbo:c.verbo || ""};
  }
  // La capa de una unidad. La que va sobre la línea de su jefe se lee en la fila de él: es
  // donde está dibujada, y así el panel nunca salta hacia atrás al ir bajando.
  function capaDe(id){
    var n = NODOS[id]; if(!n || n.comite || n.consejo) return null;
    if(n.d.puesto) return n.d.puesto;
    if(n.gob) return "gobierno";
    if(id === E.CEO.id || !n.dir) return "presidencia";
    if(n.d.enLinea) return capaDe(n.padre);
    if(n.dir === id) return n.d.nivel === "n2" ? "n2" : "n1";
    return CN_GRUPOS.some(function(g){ return g.capas.indexOf(n.d.nivel) >= 0; }) ? n.d.nivel : null;
  }
  function capasPanelHtml(){
    var h = '<nav class="eo-cn" id="eoCn" aria-label="Capas de la estructura">' +
            '<div class="eo-cncab"><div class="eo-cnest" aria-live="off"><span class="eo-cnrot">Estás en</span>' +
            '<b id="eoCnNom"></b><span class="eo-cnverbo" id="eoCnVerbo"></span></div>' +
            '<button type="button" class="eo-cnx" id="eoCnX"></button></div><div class="eo-cnlista">';
    CN_GRUPOS.forEach(function(g){
      if(g.t) h += '<div class="eo-cngrupo">' + esc(g.t) + '</div>';
      g.capas.forEach(function(id){
        h += '<button type="button" class="eo-cnfila" data-capa="' + id + '"><i class="eo-cndot" aria-hidden="true"></i>' +
             '<span class="eo-cnnom">' + esc(capaInfo(id).n) + '</span></button>';
      });
    });
    return h + '</div></nav><div class="eo-cnchip" id="eoCnChip" aria-hidden="true"></div>';
  }
  function montarCapasPanel(pref){
    var x = host.querySelector("#eoCnX");
    cnCajas = []; cnClave = null;
    compactarCapas(pref.capasCompacto !== undefined ? pref.capasCompacto : !!(window.matchMedia && matchMedia("(max-width:820px)").matches));
    x.addEventListener("click", function(){
      var on = !host.classList.contains("eo-cn-compacto");
      compactarCapas(on);
      var p = leerPref(); p.capasCompacto = on; guardarPref(p);
      pedirCapas();
    });
    host.querySelector("#eoCn").addEventListener("click", function(e){
      var f = e.target.closest("[data-capa]");
      if(f && f.getAttribute("aria-disabled") !== "true") irACapa(f.getAttribute("data-capa"));
    });
  }
  // El mapa se queda donde está en la pantalla aunque el panel cambie de ancho.
  function compactarCapas(on){
    var antes = vp.getBoundingClientRect().left;
    host.classList.toggle("eo-cn-compacto", on);
    var x = host.querySelector("#eoCnX");
    x.textContent = on ? "›" : "‹";
    x.setAttribute("aria-expanded", String(!on));
    x.setAttribute("aria-label", on ? "Expandir el panel de capas" : "Contraer el panel de capas");
    x.title = x.getAttribute("aria-label");
    cam.x += antes - vp.getBoundingClientRect().left;
    aplicar();
    if(leyActual && !leyActual.ley.hidden) leyActual.encajar();
  }
  // Se mide al trazar, que es cuando cambia lo dibujado; moverse solo necesita la cámara.
  function medirCapas(){
    cnCajas = [];
    lienzo.querySelectorAll(".eo-card,[data-ancla],.eo-pstub").forEach(function(el){
      var capa = el.classList.contains("eo-pstub") ? "equipos" : capaDe(el.getAttribute("data-ancla") || el.getAttribute("data-id"));
      if(!capa) return;
      var b = caja2(el); b.capa = capa; cnCajas.push(b);
    });
    cnClave = null;
    pintarCapas();
  }
  function pedirCapas(){
    if(cnPend) return;
    cnPend = true;
    requestAnimationFrame(function(){ cnPend = false; pintarCapas(); });
  }
  // lo que deja libre la ficha, en coordenadas de la pantalla del mapa
  function vistaLibre(){
    var w = vp.clientWidth, h = vp.clientHeight;
    if(panel && !panel.hidden && panel.offsetWidth < w * .8) w -= panel.offsetWidth + 16;
    return {w:w, h:h};
  }
  function pintarCapas(){
    if(!host || host.hidden || !vp || !vp.clientWidth || !cnCajas.length) return;
    var v = vistaLibre(), s = cam.s;
    var x0 = -cam.x / s, x1 = (v.w - cam.x) / s, y0 = -cam.y / s, y1 = (v.h - cam.y) / s;
    var cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    var hay = {}, vista = {}, mejor = null, mejorV = null, cerca = null;
    cnCajas.forEach(function(b){
      hay[b.capa] = true;
      // manda la altura: se pregunta por qué tan abajo se está, no por qué columna. Una caja a la
      // altura del centro gana a la de la columna en que se está si esa queda más arriba.
      var dy = Math.max(0, b.y - cy, cy - (b.y + b.h)), dx = Math.max(0, b.x - cx, cx - (b.x + b.w)), d = dy * 50 + dx;
      if(!mejor || d < mejor.d) mejor = {capa:b.capa, d:d};
      if(b.x < x1 && b.x + b.w > x0 && b.y < y1 && b.y + b.h > y0){
        vista[b.capa] = true;
        if(!mejorV || d < mejorV.d) mejorV = {capa:b.capa, d:d};
        // en el hueco entre dos cajas de la columna en que se está, sigue contando esa columna:
        // si no, una caja de otra columna a esa altura hace parpadear el panel
        if(dx <= 130 && dy <= 44 && (!cerca || d < cerca.d)) cerca = {capa:b.capa, d:d};
      }
    });
    var actualCapa = (cerca || mejorV || mejor).capa;
    var clave = actualCapa + "|" + Object.keys(hay).sort().join() + "|" + Object.keys(vista).sort().join();
    if(clave === cnClave) return;
    cnClave = clave;
    host.querySelectorAll(".eo-cnfila").forEach(function(f){
      var id = f.getAttribute("data-capa"), sin = !hay[id], info = capaInfo(id);
      f.classList.toggle("es-actual", id === actualCapa);
      f.classList.toggle("es-vista", !!vista[id]);
      f.classList.toggle("es-sin", sin);
      if(id === actualCapa) f.setAttribute("aria-current", "true"); else f.removeAttribute("aria-current");
      f.setAttribute("aria-disabled", String(sin));
      f.title = sin ? info.n + ". " + (id === "equipos" ? CN_SIN_EQUIPOS : CN_SIN) : "Ir a " + info.n + (info.verbo ? ". " + info.verbo : "");
    });
    // en una pantalla baja la lista se desplaza para que la fila activa nunca quede fuera de vista
    var lista = host.querySelector(".eo-cnlista"), fa = host.querySelector(".eo-cnfila.es-actual");
    if(lista && fa){
      var lr = lista.getBoundingClientRect(), fr = fa.getBoundingClientRect();
      if(fr.bottom > lr.bottom) lista.scrollTop += fr.bottom - lr.bottom + 8;
      else if(fr.top < lr.top) lista.scrollTop -= lr.top - fr.top + 8;
    }
    var ac = capaInfo(actualCapa);
    host.querySelector("#eoCnNom").textContent = ac.n;
    host.querySelector("#eoCnVerbo").textContent = ac.verbo;
    host.querySelector("#eoCnChip").textContent = ac.n;
  }
  // Va a la caja de esa capa más cercana a la columna en que se está, a un tamaño legible.
  function irACapa(capa){
    var v = vistaLibre(), cx = (v.w / 2 - cam.x) / cam.s, cy = (v.h / 2 - cam.y) / cam.s, b = null, mejor = Infinity;
    cnCajas.forEach(function(k){
      if(k.capa !== capa) return;
      var d = Math.abs(k.x + k.w / 2 - cx) + Math.abs(k.y + k.h / 2 - cy) * .2;
      if(d < mejor){ mejor = d; b = k; }
    });
    if(!b) return;
    cam.s = Math.max(cam.s, .7);
    cam.x = v.w / 2 - (b.x + b.w / 2) * cam.s;
    cam.y = v.h / 2 - (b.y + b.h / 2) * cam.s;
    suavizarCamara();
    aplicar();
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
           '<span class="eo-cconv">Lidera y convoca: ' + esc(NODOS[k.lidera].d.n) + ' · ' + formato(k, "principal").length + ' en el principal · ' +
           formato(k, "ampliado").length + ' más en el ampliado</span></button>';
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

  // Lo que no está desplegado no se maqueta: la estructura crece a medida que se abre.
  // podar() copia el dato dejando solo lo visible; la gerencia de unidad de negocio con
  // gerencia país propia conserva la marca _conN3, para que su gerencia corporativa siga
  // abierta en ramas aunque la rama aún no esté desplegada.
  function podar(F){
    var c = {}; for(var k in F) c[k] = F[k];
    var abre = !!DESP[F.CEO.id];
    // abrir una unidad por país muestra su equipo completo en cada país
    function u(x, abierta){
      var y = {}; for(var k in x) y[k] = x[k];
      abierta = abierta || !!EXP[x.id];
      if(x.hijos){
        if(x.hijos.some(function(h){ return h.nivel === "n3"; })) y._conN3 = true;
        y.hijos = (DESP[x.id] || abierta) ? x.hijos.map(function(h){ return u(h, abierta); }) : [];
      }
      return y;
    }
    c.DIRECCIONES = abre ? F.DIRECCIONES.map(function(d){ return u(d, false); }) : [];
    c.STAFF = abre ? F.STAFF : [];
    c.GOBIERNO = abre ? F.GOBIERNO : [];
    return c;
  }
  var PREV = null;
  var focoInicial = null;   // la unidad que abrió la ruta: el primer encuadre va sobre ella   // unidades a la vista en la maquetación anterior: lo nuevo aparece con un fundido
  function maquetar(){
    var full = E; E = podar(full);
    try{ maquetarVisible(); } finally { E = full; }
    var ahora = {};
    Object.keys(NODOS).forEach(function(id){
      var el = NODOS[id].el; if(!el || !lienzo.contains(el)) return;
      ahora[id] = true;
      if(PREV && !PREV[id]) (el.closest(".eo-pexpand") || el.closest(".eo-pwrap") || el).classList.add("eo-aparece");
    });
    PREV = ahora;
  }
  function maquetarVisible(){
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
    var cuantas = function(d){ var n = 0, f = NODOS[d.id] ? NODOS[d.id].d : d; (function k(hs){ (hs || []).forEach(function(x){ if(x.puesto) return; n++; k(x.hijos); }); })(f.hijos); return n; };
    var mayor = STF.slice().sort(function(a, b){ return cuantas(b) - cuantas(a); })[0];
    STF = STF.filter(function(d){ return d !== mayor; }).concat(mayor ? [mayor] : []);
    var colsS = STF.map(subcolumnas), nS = 0;
    colsS.forEach(function(sc){ nS += sc.length; });
    var hueco = nS + 1, nIni = nS + 2, nFin = nIni + total;
    // Ancho de cada columna: el de siempre, salvo donde una gerencia país está abierta
    // por país y no cabe; esa columna (la última de su celda) se ensancha.
    var COL = parseFloat(getComputedStyle(host).getPropertyValue("--eo-col")) || 236, GAP = 14;
    var anchos = [];
    // sin nada desplegado la Presidencia va sola: el eje tiene que dar cabida a su caja
    var soloCima = !nS && !total;
    for(var ci = 1; ci < nFin; ci++) anchos[ci] = ci === hueco ? (soloCima ? 420 : 64) : COL;
    var pide = function(unidades, col, span){
      var w = 0;
      unidades.forEach(function(k){
        if(EXP[k.id] && paisesDe(k).length) w = Math.max(w, anchoAbierta(k) + 22);
        else if(anchoCoords(k)) w = Math.max(w, anchoCoords(k) + 22);
        else (k.hijos || []).forEach(function(x){ if(x.nivel === "coord" && EXP[x.id] && paisesDe(x).length) w = Math.max(w, anchoAbierta(x) + 22); });
      });
      var hay = 0; for(var i = 0; i < span; i++) hay += anchos[col + i]; hay += (span - 1) * GAP;
      if(w > hay) anchos[col + span - 1] += w - hay;
    };
    lienzo.style.gridTemplateColumns = "";

    var h = '';
    var R = {linea:2, tit:3, n1:4, n2:5, n3:6};
    // contenedores (detrás de todo): el del grupo, la banda corporativa (llena), la
    // banda país (rayada), el rótulo de cada una y el título del contenedor
    var plenos = E.PAISES.filter(function(p){ return !p.parcial; }).map(function(p){ return p.id; }).join(" · ");
    var parciales = E.PAISES.filter(function(p){ return p.parcial; }).map(function(p){ return p.id; });
    var rotPais = "se repite en " + plenos + (parciales.length ? ", y " + parciales.join(" · ") + " donde se nombra" : "");
    var contenedor = function(car, a, b){
      if(b <= a) return '';
      return '<div class="eo-grupo eo-g-' + car + '" style="grid-row:' + R.tit + ' / ' + (R.n3 + 1) + ';grid-column:' + a + ' / ' + b + '"></div>' +
             '<div class="eo-corp eo-g-' + car + '" style="grid-row:' + R.n1 + ' / ' + (R.n2 + 1) + ';grid-column:' + a + ' / ' + b + '"></div>' +
             '<div class="eo-paisz eo-g-' + car + '" style="grid-row:' + R.n3 + ';grid-column:' + a + ' / ' + b + '"></div>' +
             '<div class="eo-capatag eo-ct-corp eo-g-' + car + '" style="grid-row:' + R.n1 + ';grid-column:' + a + ' / ' + b + '"><span><b>Capa corporativa</b> · una sola vez para todo el grupo</span></div>' +
             '<div class="eo-capatag eo-ct-pais eo-g-' + car + '" style="grid-row:' + R.n3 + ';grid-column:' + a + ' / ' + b + '"><span><b>Capa país</b> · ' + esc(rotPais) + '</span></div>' +
             '<div class="eo-grupotit eo-g-' + car + '" style="grid-row:' + R.tit + ';grid-column:' + a + ' / ' + b + '">' +
               '<span>' + (car === "negocio" ? '<b>Unidades de negocio</b> · la cadena de valor' : '<b>Staff</b> · ' + esc(E.rotuloStaff || 'apoyo a la Presidencia')) + '</span>' +
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
    // sobre la línea de mando, antes de las direcciones: sale por un costado de la
    // línea central — a la derecha por omisión, a la izquierda con lado:'izq'
    var enLinea = E.STAFF.filter(function(s){ return s.enLinea; });
    if(enLinea.length){
      var deLado = function(izq){ return enLinea.filter(function(s){ return (s.lado === "izq") === izq; }).map(function(s){ return caja(s, "eo-c-staff", tagNivel(s)); }).join(""); };
      h += '<div class="eo-enlinea" style="grid-row:' + R.linea + ';grid-column:1 / ' + nFin + '">' +
             '<div class="eo-enl-izq">' + deLado(true) + '</div><div class="eo-enl-der">' + deLado(false) + '</div></div>';
    }

    // staff: cada dirección ocupa sus subcolumnas, como las unidades de negocio
    var cS = 1;
    STF.forEach(function(dr, i){
      var sc = colsS[i], c = cS;
      // una gerencia corporativa de staff no tiene caja en la fila de las direcciones
      if(dr.nivel !== "n2")
        h += '<div class="eo-celda eo-c1" style="grid-row:' + R.n1 + ';grid-column:' + c + ' / span ' + sc.length + '">' +
               caja(dr, "eo-c-dir eo-staff", "Staff · Dirección corporativa") + enLineaDir(dr) + '</div>';
      sc.forEach(function(s, k){
        h += '<div class="eo-celda eo-c2" style="grid-row:' + R.n2 + ';grid-column:' + (c + k) + '">' +
               s.n2.map(function(n, j){
                 if(n === dr) return caja(n, "eo-c-n2 eo-c-gstaff" + (n.hijos && n.hijos.length ? " eo-c-jefe" : ""), "Staff · Gerencia corporativa");
                 return caja(n, "eo-c-n2" + (n.nivel === "ccorp" ? " eo-c-ccorp" : "") + (j === 0 && n.hijos && n.hijos.length ? " eo-c-jefe" : ""), tagNivel(n)) + arbolDe(n);
               }).join("") + '</div>';
        pide(s.n3, c + k, 1);
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
             enLineaDir(dr) + '</div>';
      sc.forEach(function(s, k){
        if(s.rama){
          if(s.cabeza) h += celdaRamas(sc, k, R.n2, c + k);
        } else {
          h += '<div class="eo-celda eo-c2" style="grid-row:' + R.n2 + ';grid-column:' + (c + k) + '">';
          s.n2.forEach(function(n, j){
            var jefe = (j === 0 && n.hijos && n.hijos.length);
            h += caja(n, "eo-c-n2" + (n.nivel === "ccorp" ? " eo-c-ccorp" : "") + (jefe ? " eo-c-jefe" : ""), tagNivel(n)) + arbolDe(n);
          });
          h += '</div>';
        }
        if(s.comun){
          // gerencia país común a las ramas: una celda que las abarca, centrada debajo
          if(s.cabeza){
            pide(s.comun, c + k, s.span);
            h += '<div class="eo-celda eo-c3 eo-comun" style="grid-row:' + R.n3 + ';grid-column:' + (c + k) + ' / span ' + s.span + '">' +
                            s.comun.map(cajaPais).join("") + '</div>';
          }
        } else {
          pide(s.n3, c + k, 1);
          h += '<div class="eo-celda eo-c3" style="grid-row:' + R.n3 + ';grid-column:' + (c + k) + '">';
          s.n3.forEach(function(n){ h += cajaPais(n); });
          h += '</div>';
        }
      });
      c0 += sc.length;
    });

    lienzo.style.gridTemplateColumns = anchos.slice(1).map(function(w){ return w + "px"; }).join(" ");
    lienzo.innerHTML = h;
    svg = svgEl("svg", {"class":"eo-hilos", "aria-hidden":"true"});
    lienzo.insertBefore(svg, lienzo.firstChild);
    Object.keys(NODOS).forEach(function(id){ if(!NODOS[id].comite && !NODOS[id].consejo) NODOS[id].el = null; });
    // las cajas por país no son nodos: la unidad abierta se ancla en su cabecera
    lienzo.querySelectorAll(".eo-card:not([data-pais]),[data-ancla]").forEach(function(el){
      var id = el.getAttribute("data-ancla") || el.getAttribute("data-id"); if(NODOS[id]) NODOS[id].el = el;
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
    if(lin){
      var izq = lin.querySelector(".eo-enl-izq"), der = lin.querySelector(".eo-enl-der");
      izq.style.width = Math.max(0, Math.round(ejeX - caja2(lin).x - 56)) + "px";
      der.style.marginLeft = "0px";
      der.style.marginLeft = Math.round(ejeX + 56 - caja2(der).x) + "px";
    }
  }

  // ----------------------------------------------------------------- hilos
  function caja2(el){
    var x = 0, y = 0, n = el;
    while(n && n !== lienzo){ x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    return {x:x, y:y, w:el.offsetWidth, h:el.offsetHeight};
  }
  // Un nivel se lee como fila: todas las gerencias corporativas con la misma altura
  // de caja, y las gerencias de unidad de negocio de todas las ramas (Ventas,
  // Mercadeo) arrancando a la misma altura, aunque una gerencia corporativa lleve
  // una unidad sobre su línea que empuja sus ramas hacia abajo.
  function igualarNiveles(){
    var n2 = [].filter.call(lienzo.querySelectorAll(".eo-card:not([data-pais])"), function(el){
      var n = NODOS[el.getAttribute("data-id")]; return n && n.d.nivel === "n2";
    });
    n2.forEach(function(el){ el.style.minHeight = ""; });
    var alto = Math.max.apply(null, n2.map(function(el){ return el.offsetHeight; }).concat([0]));
    n2.forEach(function(el){ el.style.minHeight = alto + "px"; });
    var ramas = [].slice.call(lienzo.querySelectorAll(".eo-rama"));
    ramas.forEach(function(r){ r.style.marginTop = ""; });
    var tope = Math.max.apply(null, ramas.map(function(r){ return caja2(r).y; }).concat([0]));
    ramas.forEach(function(r){ var d = tope - caja2(r).y; if(d > 0) r.style.marginTop = d + "px"; });
  }
  // ---------------------------------------------------------- niveles
  function reportes(id){
    if(id === E.CEO.id) return E.DIRECCIONES.concat(E.STAFF);
    var n = NODOS[id]; return n && !n.comite && !n.consejo ? (n.d.hijos || []) : [];
  }
  function visible(id){
    if(id === E.CEO.id) return true;
    var n = NODOS[id]; if(!n) return false;
    if(n.gob) return !!DESP[E.CEO.id];          // la Junta aparece con el primer nivel
    if(n.comite || n.consejo || !n.padre) return true;
    return !!DESP[n.padre] && visible(n.padre);
  }
  // Abre la cadena de mando hasta una unidad: así una ficha enlazada siempre se ve
  function revelar(id){
    var n = NODOS[id];
    if(n && n.gob){ DESP[E.CEO.id] = true; return; }
    while(n && n.padre){ DESP[n.padre] = true; n = NODOS[n.padre]; }
  }
  function plegarDesde(id){ reportes(id).forEach(function(h){ delete DESP[h.id]; plegarDesde(h.id); }); }
  function alternarNivel(id){
    if(DESP[id]){ delete DESP[id]; plegarDesde(id); } else DESP[id] = true;
    remaquetar(); botonTodo(); ajustarVisible(true, id);
  }
  function todosDesplegados(){
    return Object.keys(NODOS).every(function(id){ return !reportes(id).length || DESP[id]; });
  }
  function botonTodo(){
    var b = host && host.querySelector("#eoNivBtn"); if(!b) return;
    var todo = todosDesplegados();
    b.textContent = todo ? "Plegar a la Presidencia" : "Desplegar todo";
    b.setAttribute("aria-pressed", todo);
  }
  function aplicarNiveles(){
    // la banda país de cada contenedor aparece cuando hay algo en ella
    ["staff", "negocio"].forEach(function(car){
      var hay = Object.keys(NODOS).some(function(id){
        var n = NODOS[id], d = n.d, el = n.el;
        if(!(d.nivel === "n3" || d.nivel === "coord") || !el || !lienzo.contains(el)) return false;
        var dr = E.DIRECCIONES.filter(function(x){ return x.id === n.dir; })[0];
        return dr && (dr.caracter === "staff") === (car === "staff");
      });
      lienzo.classList.toggle("eo-sin-pais-" + car, !hay);
    });
  }
  function botonesNivel(){
    var capa = lienzo.querySelector(".eo-niveles");
    if(!capa){ capa = document.createElement("div"); capa.className = "eo-niveles"; lienzo.appendChild(capa); }
    var h = "";
    Object.keys(NODOS).forEach(function(id){
      var el = NODOS[id].el, n = reportes(id).length;
      if(!el || !n || !lienzo.contains(el) || !visible(id)) return;
      var b = caja2(el), ab = !!DESP[id], nom = NODOS[id].d.n;
      h += '<button type="button" class="eo-nivbtn' + (ab ? ' abierto' : '') + '" data-niv="' + esc(id) + '" aria-expanded="' + ab + '"' +
           ' title="' + esc((ab ? "Ocultar los reportes de " : "Mostrar los reportes de ") + nom) + '"' +
           ' style="left:' + Math.round(b.x + b.w / 2) + 'px;top:' + Math.round(b.y + b.h) + 'px">' + (ab ? '−' : '+ ' + n) + '</button>';
    });
    capa.innerHTML = h;
  }
  function trazar(){
    if(!svg || host.hidden) return;
    igualarNiveles();
    aplicarNiveles();
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
    var cajas = DESP[E.CEO.id] ? E.DIRECCIONES.filter(function(d){ return NODOS[d.id].el; }).map(function(d){ return {car:d.caracter, b:caja2(NODOS[d.id].el)}; }) : [];
    var busY = cajas.length ? Math.min.apply(null, cajas.map(function(k){ return k.b.y; })) - 22 : 0;
    if(cajas.length) ruta("M" + sx + "," + (C.y + C.h) + " V" + busY, "eo-h-linea eo-h-bus");
    if(cajas.length) [["staff", "eo-h-linea eo-h-staff"], ["negocio", "eo-h-linea eo-h-negocio"]].forEach(function(g){
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
      if(!visible(a.de) || !visible(a.a)) return;
      var pa = caja2(A), pb = caja2(B);
      if(a.tipo === "punteada"){          // gobierno -> Presidencia
        var y = pa.y + pa.h / 2, x0 = pa.x + (pa.x < C.x ? pa.w : 0), x1 = pa.x < C.x ? C.x : C.x + C.w;
        ruta("M" + x0 + "," + y + " H" + x1, "eo-h-punteada");
        return;
      }
      if(a.tipo === "lateral"){           // Presidencia -> unidad sobre la línea, por un costado
        ruta("M" + sx + "," + (pb.y + pb.h / 2) + " H" + (pb.x > sx ? pb.x : pb.x + pb.w), "eo-h-punteada");
        return;
      }
      if(a.tipo === "staff"){
        var ys = pb.y + pb.h / 2;
        ruta("M" + (C.x + C.w) + "," + (C.y + C.h / 2) + " H" + ((C.x + C.w + pb.x) / 2) + " V" + ys + " H" + pb.x, "eo-h-punteada");
        return;
      }
      if(a.tipo === "lateral-dir"){       // dirección -> unidad sobre su línea, por un costado
        ruta("M" + (pa.x + pa.w / 2) + "," + (pb.y + pb.h / 2) + " H" + pb.x, "eo-h-linea");
        return;
      }
      if(a.tipo !== "linea") return;
      if(B.closest(".eo-pcoords") && NODOS[a.de].d.nivel === "n3"){
        // coordinaciones en fila: peine desde el centro de la gerencia país
        var qx = pa.x + pa.w / 2, qy = pb.y - 13, ux = pb.x + pb.w / 2;
        ruta("M" + qx + "," + (pa.y + pa.h) + " V" + qy + " H" + ux + " V" + pb.y, "eo-h-linea");
        return;
      }
      if(NODOS[a.a].d.puesto){
        // equipo en árbol: un riel por el margen izquierdo del jefe, que entra por el costado
        var rx = pa.x + 9, my = pb.y + pb.h / 2;
        ruta("M" + rx + "," + (pa.y + pa.h) + " V" + my + " H" + pb.x, "eo-h-linea");
        return;
      }
      if(NODOS[a.a].d.nivel === "coord" && !B.hasAttribute("data-ancla")){
        // la coordinación cuelga con sangría justo debajo: baja recta a su borde superior
        var kx = Math.max(pa.x, pb.x) + 28;
        ruta("M" + kx + "," + (pa.y + pa.h) + " V" + pb.y, "eo-h-linea");
        return;
      }
      var px = pa.x + pa.w / 2, y0 = pa.y + pa.h, y1 = y0 + 13, tx = pb.x + pb.w / 2;
      var lat = A.parentNode.querySelector(".eo-dirlinea");
      if(lat && (A.classList.contains("eo-c-dir") || A.parentNode.classList.contains("eo-rcab"))){ var cl = caja2(lat); y1 = cl.y + cl.h + 13; }
      if(!cruza(px, y1, tx, y1, [A, B]) && !cruza(tx, y1, tx, pb.y, [A, B])){
        ruta("M" + px + "," + y0 + " V" + y1 + " H" + tx + " V" + pb.y, "eo-h-linea");
        return;
      }
      // gerencia país común a las ramas (atiende): baja por el hueco entre las dos
      // gerencias de unidad de negocio más cercanas al centro, sin tocarlas
      if(B.closest(".eo-comun") && A.parentNode.classList.contains("eo-rcab")){
        var rs = [].map.call(A.parentNode.parentNode.querySelectorAll(".eo-rama > .eo-card"), caja2)
                   .sort(function(p, q){ return p.x - q.x; });
        var hueco = null;
        for(var i = 1; i < rs.length; i++){
          var mx = (rs[i - 1].x + rs[i - 1].w + rs[i].x) / 2;
          if(hueco === null || Math.abs(mx - tx) < Math.abs(hueco - tx)) hueco = mx;
        }
        if(hueco !== null){
          var yb = pb.y - 13;
          ruta("M" + px + "," + y0 + " V" + y1 + " H" + hueco + " V" + yb + " H" + tx + " V" + pb.y, "eo-h-linea");
          return;
        }
      }
      // riel al margen izquierdo de la subcolumna del hijo; entra por el hueco de encima
      var cc = caja2(B.parentNode), rail = cc.x + 10, ya = pb.y - 13;
      ruta("M" + px + "," + y0 + " V" + y1 + " H" + rail + " V" + ya + " H" + tx + " V" + pb.y, "eo-h-linea");
    });

    // Gerencia país abierta: de la cabecera baja un peine a la caja de cada país, y de
    // cada caja país a sus coordinaciones (con sangría, como en la caja plegada).
    lienzo.querySelectorAll(".eo-pexpand").forEach(function(bl){
      var cab = caja2(bl.querySelector(".eo-pcab")), hx = cab.x + cab.w / 2;
      var cols = bl.querySelectorAll(".eo-pcol");
      var tops = [].map.call(cols, function(col){ return caja2(col.querySelector(".eo-card")); });
      if(!tops.length) return;
      var by = tops[0].y - 13;
      var xs = tops.map(function(b){ return b.x + b.w / 2; });
      ruta("M" + hx + "," + (cab.y + cab.h) + " V" + by, "eo-h-linea");
      ruta("M" + Math.min.apply(null, xs.concat([hx])) + "," + by + " H" + Math.max.apply(null, xs.concat([hx])), "eo-h-linea");
      xs.forEach(function(x, i){ ruta("M" + x + "," + by + " V" + tops[i].y, "eo-h-linea"); });
      [].forEach.call(cols, function(col){
        var cs = col.querySelectorAll(".eo-card"); if(cs.length < 2) return;
        // cada caja cuelga de su jefe dentro de la columna de su país
        for(var i = 1; i < cs.length; i++){
          var nd = NODOS[cs[i].getAttribute("data-id")], jefe = null;
          for(var q = i - 1; q >= 0 && !jefe; q--) if(nd && cs[q].getAttribute("data-id") === nd.padre) jefe = cs[q];
          var g = caja2(jefe || cs[0]), b = caja2(cs[i]);
          ruta("M" + (g.x + 9) + "," + (g.y + g.h) + " V" + (b.y + b.h / 2) + " H" + b.x, "eo-h-linea");
        }
      });
    });
    botonesNivel();
    medirCapas();
  }
  function ruta(d, clase){ svgEl("path", {d:d, "class":clase}, svg); }

  // ---------------------------------------------------------------- cámara
  var arrastro = false;
  function aplicar(){ world.style.transform = "translate(" + cam.x + "px," + cam.y + "px) scale(" + cam.s + ")"; pedirCapas(); }
  function suavizarCamara(){
    if(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    world.style.transition = "transform .45s ease";
    clearTimeout(suavizarCamara.t); suavizarCamara.t = setTimeout(function(){ world.style.transition = ""; }, 500);
  }
  function ajustar(){
    var W = lienzo.scrollWidth, r = vp.getBoundingClientRect();
    cam.s = Math.max(.2, Math.min(1, (r.width - 32) / W));
    cam.x = Math.max(16, (r.width - W * cam.s) / 2); cam.y = 58;
    aplicar();
  }
  // Encuadra lo que está a la vista (como mucho a tamaño real), con un desplazamiento suave.
  // Si todo cabe a un tamaño legible, todo; si no, la unidad que se acaba de abrir con su
  // nivel nuevo: la cámara acompaña lo que se despliega en vez de alejarse sin fin.
  function ajustarVisible(suave, foco){
    var r = vp.getBoundingClientRect(), W = lienzo.scrollWidth, H = lienzo.scrollHeight;
    // con la ficha abierta, el encuadre va en la parte que el panel deja libre
    if(panel && !panel.hidden && panel.offsetWidth < r.width * .8) r = {width: r.width - panel.offsetWidth - 16, height: r.height};
    var sTodo = Math.min(1, (r.width - 48) / W, (r.height - 120) / H);
    var x0 = 0, y0 = 0, bw = W, bh = H;
    if(sTodo < .6 && foco && NODOS[foco] && NODOS[foco].el){
      // la unidad, su jefe (para no perder de dónde cuelga) y su nivel nuevo
      var jefe = NODOS[foco].padre && NODOS[NODOS[foco].padre] ? NODOS[NODOS[foco].padre].el : null;
      var bs = [NODOS[foco].el, jefe].concat(reportes(foco).map(function(h){ return NODOS[h.id] && NODOS[h.id].el; }))
                 .filter(Boolean).map(function(el){ return caja2(el.closest(".eo-pexpand") || el.closest(".eo-pwrap") || el); });
      x0 = Math.min.apply(null, bs.map(function(b){ return b.x; })) - 40; y0 = Math.min.apply(null, bs.map(function(b){ return b.y; })) - 40;
      bw = Math.max.apply(null, bs.map(function(b){ return b.x + b.w; })) + 40 - x0; bh = Math.max.apply(null, bs.map(function(b){ return b.y + b.h; })) + 40 - y0;
    }
    cam.s = Math.max(.25, Math.min(1, (r.width - 48) / bw, (r.height - 120) / bh));
    cam.x = (r.width - bw * cam.s) / 2 - x0 * cam.s; cam.y = 70 - y0 * cam.s;
    if(suave) suavizarCamara();
    aplicar();
  }
  function zoomEn(f, cx, cy){
    var s2 = Math.max(.15, Math.min(2.2, cam.s * f));
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
    // La rueda acerca y aleja alrededor del puntero (también el pellizco del trackpad);
    // para moverse por el organigrama se arrastra.
    vp.addEventListener("wheel", function(e){
      e.preventDefault();
      var r = vp.getBoundingClientRect();
      var dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      var f = Math.exp(-Math.max(-60, Math.min(60, dy)) * (e.ctrlKey ? 0.01 : 0.0025));
      zoomEn(f, e.clientX - r.left, e.clientY - r.top);
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
    pedirCapas();
  }
  var actual = null;
  // resalta la unidad y, si está abierta por país, sus cajas por país
  function marcar(id){
    lienzo.querySelectorAll('[data-id="' + id + '"],[data-ancla="' + id + '"]').forEach(function(x){ x.classList.add("eo-sel"); });
  }
  function cerrar(){
    if(!panel) return;
    actual = null;
    ocultarCapas();
    panel.hidden = true; host.classList.remove("eo-con-panel");
    lienzo.querySelectorAll(".eo-sel").forEach(function(x){ x.classList.remove("eo-sel"); });
    marcarCogob(null);
    pedirCapas();
  }
  function lista(arr){ return '<ul class="eo-lista">' + arr.map(function(x){ return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>'; }
  function pill(estado){ var e = E.ESTADOS[estado] || {n:estado}; return '<span class="eo-pill eo-e-' + esc(estado) + '">' + punto(estado) + esc(e.n) + '</span>'; }
  function enlace(id){ var n = NODOS[id]; return n ? '<a href="#/estructura/' + encodeURIComponent(id) + '">' + esc(n.d.n) + '</a>' : ''; }

  // Integrantes de un comité como ids de nodo, con '@direcciones' expandido.
  // formato(k, "principal" | "ampliado"): las unidades de ese formato, sin repetir las del principal.
  function formato(k, cual){
    var out = [];
    (k[cual] || []).forEach(function(x){
      if(x === "@direcciones") E.DIRECCIONES.forEach(function(d){ out.push(d.id); });
      else if(NODOS[x]) out.push(x);
    });
    if(cual === "ampliado"){ var p = formato(k, "principal"); out = out.filter(function(x){ return p.indexOf(x) < 0; }); }
    return out.filter(function(x, i){ return out.indexOf(x) === i; });
  }
  function miembros(k){ return formato(k, "principal").concat(formato(k, "ampliado")); }
  function htmlComite(k, conTitulo){
    var h = '';
    if(conTitulo) h += '<h4 class="eo-comh">' + enlace(k.id) + '</h4>';
    h += '<p>' + esc(k.proposito) + '</p>';
    if(k.funciones) h += lista(k.funciones);
    h += '<div class="eo-bloque"><h4>Lidera y convoca</h4><p>' + enlace(k.lidera) + '</p></div>';
    h += '<div class="eo-formato"><h4 class="eo-fmt">Comité principal <span>· ' + formato(k, "principal").length + ' unidades, en todas las sesiones</span></h4>' +
         htmlUnidades(k, formato(k, "principal")) + '</div>';
    var amp = formato(k, "ampliado");
    if(amp.length){
      h += '<div class="eo-formato eo-amp"><h4 class="eo-fmt">Comité ampliado <span>· se suman ' + amp.length + ' unidades</span></h4>' +
           (E.NOTA_AMPLIADO ? '<p class="eo-tenue">' + esc(E.NOTA_AMPLIADO) + '</p>' : '') + htmlUnidades(k, amp) + '</div>';
    }
    return h;
  }
  // Unidades de un formato, agrupadas por nivel.
  function htmlUnidades(k, m){
    var h = '';
    var grupos = [
      {t:"Unidades de la Presidencia", f:function(n){ return NODOS[n].d.nivel === "staff"; }},
      {t:"Direcciones corporativas", f:function(n){ return NODOS[n].d.nivel !== "n2" && E.DIRECCIONES.some(function(d){ return d.id === n; }); }},
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
    focoInicial = id;
    if(!visible(id)){ revelar(id); remaquetar(); botonTodo(); ajustarVisible(true, id); }
    lienzo.querySelectorAll(".eo-sel").forEach(function(x){ x.classList.remove("eo-sel"); });
    var d = n.d, h = '';
    actual = id;
    marcar(id);
    if(n.el) asomar(n.el);
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
    var tag = esDir ? (d.nivel === "n2" ? "Gerencia corporativa · staff" : d.caracter === "negocio" ? "Dirección corporativa · unidad de negocio" : "Dirección corporativa · staff")
                    : (id === E.CEO.id ? "Presidencia" : tagNivel(d));
    if(d.sub) h += '<p class="eo-sub">' + esc(d.sub) + '</p>';
    if(n.padre) h += '<div class="eo-reporta">Reporta a ' + enlace(n.padre) + '</div>';
    if(aprobacion(d)) h += '<div class="eo-aprob eo-aprob-' + aprobacion(d) + '"><i aria-hidden="true"></i>' + esc(TXT_APROB[aprobacion(d)]) + '</div>';
    if(decide(d)) h += '<div class="eo-bloque eo-decbloque"><h4>Decisión por tomar</h4>' + lista(listaDec(d)) +
                       '<p><a class="eo-declink" href="#/decisiones-estructura">Ver todas las decisiones pendientes de la estructura →</a></p></div>';

    if(d.ocupante){
      h += '<div class="eo-bloque"><h4>Ocupante</h4><div class="eo-ofila"><span class="eo-onomg">' + esc(d.ocupante.nombre) + '</span>' + pill(d.ocupante.estado) + '</div>' +
           (d.ocupante.nota ? '<p class="eo-tenue">' + esc(d.ocupante.nota) + '</p>' : '') + '</div>';
    }
    if(d.ocupantes && d.ocupantes.length){
      h += '<div class="eo-bloque"><h4>Ocupantes</h4>' + d.ocupantes.map(function(o){
        return '<div class="eo-ofila"><span class="eo-onomg">' + esc(o.nombre) + '</span>' + pill(o.estado) + '</div>' +
               (o.nota ? '<p class="eo-tenue">' + esc(o.nota) + '</p>' : '');
      }).join("") + '</div>';
    }
    if(d.marcas){
      h += '<div class="eo-bloque"><h4>Ocupante por marca</h4><table class="eo-tpais"><tbody>' + d.marcas.map(function(o){
        return '<tr><th>' + esc(o.marca) + '</th><td><span class="eo-onomg">' + esc(o.nombre) + '</span>' + pill(o.estado) +
               (o.nota ? '<p class="eo-tenue">' + esc(o.nota) + '</p>' : '') + '</td></tr>';
      }).join("") + '</tbody></table></div>';
    }
    if(d.paises){
      var abrible = (d.nivel === "n3" || d.nivel === "coord") && paisesDe(d).length > 1;
      h += '<div class="eo-bloque"><h4>Por país' + (abrible ? '<button type="button" class="eo-pexpbtn" data-exp="' + esc(id) + '" aria-pressed="' + !!EXP[id] + '">' +
             (EXP[id] ? '⊟ Volver a una caja' : '⊞ Ver una caja por país') + '</button>' : '') + '</h4><table class="eo-tpais"><tbody>';
      E.PAISES.forEach(function(p){
        var o = d.paises[p.id]; if(!o) return;
        h += '<tr><th>' + esc(p.n) + (o.cargo ? '<small>' + esc(o.cargo) + '</small>' : '') + '</th><td><span class="eo-onomg">' + esc(o.nombre) + '</span>' + pill(o.estado) +
             (o.nota ? '<p class="eo-tenue">' + esc(o.nota) + '</p>' : '') + '</td></tr>';
      });
      h += '</tbody></table></div>';
    }
    if(d.puesto) h += '<div class="eo-bloque"><p class="eo-tenue">Cargo de hoy y cuántas personas lo ocupan, según el censo y las fichas de personal. No es una plantilla aprobada.</p></div>';
    if(d.funciones && d.funciones.length) h += '<div class="eo-bloque"><h4>Qué hace</h4>' + lista(d.funciones) + '</div>';
    if(d.interna && d.interna.length) h += '<div class="eo-bloque"><h4>Dentro de la unidad</h4>' + lista(d.interna) + '</div>';
    // modelo: enlace a la página que explica cómo funciona la unidad; solo un .html de
    // esta carpeta, porque el dato también lo puede proponer el agente
    if(d.modelo && /^[a-z0-9-]+\.html(#[a-z0-9-]*)?$/i.test(d.modelo.href || ''))
      h += '<div class="eo-bloque eo-modelo"><h4>Modelo de funcionamiento</h4>' + (d.modelo.d ? '<p>' + esc(d.modelo.d) + '</p>' : '') +
           '<p><a class="btn btn-marca" href="' + esc(d.modelo.href) + '">' + esc(d.modelo.t || 'Ver el modelo') + ' →</a></p></div>';
    var hijos = d.hijos || (id === E.CEO.id ? E.DIRECCIONES.concat(E.STAFF) : null);
    if(hijos && hijos.length){
      h += '<div class="eo-bloque"><h4>' + (id === E.CEO.id ? 'Reportes directos' : 'Le reportan') + '</h4><ul class="eo-lista eo-hijos">' +
           hijos.map(function(k){ return '<li>' + enlace(k.id) + '</li>'; }).join("") + '</ul></div>';
    }
    if(d.atiende && d.atiende.length)
      h += '<div class="eo-bloque"><h4>Recibe norma o servicio de · sin línea de mando</h4><ul class="eo-lista eo-hijos">' +
           d.atiende.map(function(g){ return '<li>' + enlace(g) + '</li>'; }).join("") + '</ul></div>';
    var orienta = Object.keys(NODOS).filter(function(x){ var a = NODOS[x].d.atiende; return a && a.indexOf(id) >= 0; });
    if(orienta.length)
      h += '<div class="eo-bloque"><h4>Le da norma o servicio a · sin línea de mando</h4><ul class="eo-lista eo-hijos">' +
           orienta.map(function(x){ return '<li>' + enlace(x) + ' <span class="eo-tenue">· gerencia país</span></li>'; }).join("") + '</ul></div>';
    var lid = E.COMITES.filter(function(k){ return k.lidera === id; });
    if(lid.length) h += '<div class="eo-bloque"><h4>Lidera y convoca</h4><ul class="eo-lista eo-hijos">' + lid.map(function(k){ return '<li>' + enlace(k.id) + '</li>'; }).join("") + '</ul></div>';
    var par = E.COMITES.filter(function(k){ return k.lidera !== id && miembros(k).indexOf(id) >= 0; });
    if(par.length) h += '<div class="eo-bloque"><h4>Integra</h4><ul class="eo-lista eo-hijos">' + par.map(function(k){
      return '<li>' + enlace(k.id) + ' <span class="eo-tenue">· ' + (formato(k, "principal").indexOf(id) >= 0 ? 'principal' : 'ampliado') + '</span></li>';
    }).join("") + '</ul></div>';
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
    {id:"decisiones",     n:"Decisiones pendientes"}
  ];
  function premisas(tab){
    if(!montado) return;
    cerrar();
    if(tab === "pendientes") tab = "decisiones";   // pestaña fundida el 06-nov-2026
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
      h += '<p class="eo-tenue">Órganos de cogobierno, sin línea de mando. Los consejos son de la familia propietaria; los comités los lidera y convoca una dirección o una gerencia corporativa y reúnen a sus pares. Cada comité tiene un formato principal, de dos a cuatro unidades, y uno ampliado que suma a las demás según el tema.</p>';
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
    } else if(tab === "decisiones"){
      var conDec = Object.keys(NODOS).filter(function(x){ return !NODOS[x].comite && !NODOS[x].consejo && decide(NODOS[x].d); });
      h += '<p class="eo-tenue">Lo que el liderazgo tiene que decidir antes de dar la estructura por cerrada. Las de una unidad van marcadas en rojo en su caja; ' +
           'las generales no tienen una caja propia. El listado completo, con las posiciones por definir, está en el punto 1.2 del índice.</p>' +
           '<p><a class="btn btn-marca" href="#/decisiones-estructura">Ver el listado completo →</a></p>';
      h += '<h4 class="eo-dech">En las unidades · ' + conDec.length + '</h4>';
      conDec.forEach(function(x){ h += '<div class="eo-bloque eo-pend eo-decbloque"><h4>' + enlace(x) + '</h4>' + lista(NODOS[x].d.decisiones) + '</div>'; });
      h += '<h4 class="eo-dech">Generales · ' + E.PENDIENTES.length + '</h4>';
      E.PENDIENTES.forEach(function(p){ h += '<div class="eo-bloque eo-pend"><h4>' + esc(p.t) + '</h4><p>' + esc(p.d) + '</p></div>'; });
    }
    abrirPanel("Premisas del diseño", E.titulo, h);
  }

  // ----------------------------------------------------------------- capas
  // Esquemas abstractos: cajas sin nombre, salvo los códigos de país y los
  // escalones del patrón, que son parte de la lógica y no unidades.
  function cajas(n, clase){ var h = ''; for(var i = 0; i < n; i++) h += '<span class="eo-k-b ' + clase + '"></span>'; return h; }
  function esquema(c){
    var stf = E.DIRECCIONES.filter(function(d){ return d.caracter === "staff"; });
    var staff = stf.length, negocio = E.DIRECCIONES.length - staff;
    // el staff mezcla una dirección y gerencias corporativas: cada una con su caja
    var cajasStaff = function(lista){ return lista.map(function(d){ return '<span class="eo-k-b ' + (d.nivel === "n2" ? "eo-k-ger" : "eo-k-dir") + ' eo-k-staff"></span>'; }).join(""); };
    if(c.id === "gobierno")
      return '<div class="eo-k-fila">' + cajas(E.GOBIERNO.length, "eo-k-gob") + '</div>';
    if(c.id === "presidencia")
      return '<div class="eo-k-fila"><span class="eo-k-b eo-k-ceo"></span></div>' +
             '<div class="eo-k-fila eo-k-ejes"><div class="eo-k-grupo eo-k-gst">' + cajasStaff(stf.slice(0, Math.ceil(staff / 2))) + '</div>' +
               '<span class="eo-k-linea" aria-hidden="true"></span>' +
               '<div class="eo-k-grupo eo-k-gst">' + cajasStaff(stf.slice(Math.ceil(staff / 2))) + '</div></div>' +
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
      }); })([].concat.apply([], E.DIRECCIONES.map(function(d){ return d.nivel === "n2" ? [d] : (d.hijos || []); })));
      return '<div class="eo-k-fila">' + grupos.map(function(n){
               return '<div class="eo-k-grupo eo-k-gung"><span class="eo-k-b eo-k-ger"></span><div class="eo-k-fila eo-k-gunf">' + cajas(n, "eo-k-gun") + '</div></div>';
             }).join("") + '</div>' +
             '<div class="eo-k-fila eo-k-ley"><span>dentro de una gerencia corporativa · para todo el grupo</span></div>';
    }
    if(c.id === "n3")
      return '<div class="eo-k-fila">' + E.PAISES.filter(function(p){ return !p.parcial; }).map(function(p){
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
  }
  function ocultarCapas(){
    if(!host) return;
    var v = host.querySelector("#eoCapas"); if(!v || v.hidden) return;
    v.hidden = true; host.classList.remove("eo-modo-capas");
    requestAnimationFrame(trazar);
  }

  window.EstructuraRender = {
    montar: montar,
    abrir: abrir,
    premisas: premisas,
    capas: capas,
    cerrar: cerrar,
    retrazar: function(){ if(montado) trazar(); },
    // Vuelve a montar con lo que haya ahora en window.ESTRUCTURA_TOBE: lo usa el manual para
    // pintar la versión de la plataforma o la vista previa de una propuesta del agente.
    rehacer: function(){ if(!host) return; var h = host; montado = false; E = null; montar(h); }
  };
})();
