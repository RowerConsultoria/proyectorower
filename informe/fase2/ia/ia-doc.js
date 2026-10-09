/* Motor de los documentos de IA de la Fase 2.
 *
 * documento.html?d=<doc>#<sección> carga <doc>-datos.js (window.IA_DOC) y lo
 * pinta: cabecera, índice lateral y secciones. Cada sección trae una de tres
 * formas de contenido:
 *   - que / como: las dos capas («Qué es y por qué» · «Cómo se hace»); los
 *     rótulos los puede cambiar el documento en IA_DOC.capas;
 *   - bloques: contenido de una sola capa;
 *   - nada: se pinta «En redacción» con la intención de la sección.
 *
 * Bloques: un texto suelto es un párrafo; si no, {t:'p'|'h'|'lista'|'tabla'|
 * 'pasos'|'nota'|'codigo'|'fig'|'kpis'|'tarjetas'|'html', ...}. Ver pintarBloque().
 *
 * Marcado en línea (sobre el texto ya escapado): **negrita**, `código` y
 * referencias [[tipo:id|texto]] a la órbita (mod, sector, area), al manual
 * (proc → To-Be, asis, macro), al circuito (freno, est), a otro documento de
 * IA (doc: «politica/autonomia») o a la propia página (sec). url abre fuera;
 * orbita lleva a la órbita misma (el id se ignora: [[orbita:inicio|la órbita]]).
 *
 * Vive en el marco #aqMarco del manual: los enlaces cambian el hash del manual
 * (el enrutador del padre decide). Abierta sola, los enlaces llevan al manual.
 */
(function(){
  'use strict';
  var DOCS = { tecnico:1, politica:1, casos:1, prototipos:1 };
  var ESTADOS = { pendiente:'Pendiente', borrador:'Borrador', revision:'En revisión', validado:'Validado' };
  var params = new URLSearchParams(location.search);
  var DOC = (params.get('d') || '').toLowerCase();
  if(!DOCS[DOC]) DOC = 'tecnico';

  var enMarco = false;
  try{ enMarco = window.parent !== window && /informe-fase2\.html$/.test(window.parent.location.pathname); }catch(e){}

  function esc(s){
    return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  // Ruta del manual (hash) a la que lleva una referencia, o null si es externa.
  function ruta(tipo, id){
    switch(tipo){
      case 'orbita': return '#/arquitectura';
      case 'mod': case 'sector': case 'area': return '#/arquitectura/' + id;
      case 'proc': return '#/tobe/' + id;
      case 'asis': return '#/asis/' + id;
      case 'macro': return '#/m/' + id;
      case 'freno': return '#/circuito/' + id.replace(/\.[^.]*$/, '');
      case 'est': return '#/circuito/' + id;
      case 'doc': return '#/arquitectura/' + id;
      case 'sec': return '#/arquitectura/' + DOC + '/' + id;
    }
    return null;
  }

  function enlace(tipo, id, texto){
    if(tipo === 'url'){
      return '<a href="' + id + '" target="_blank" rel="noopener">' + (texto || id) + ' ↗</a>';
    }
    var r = ruta(tipo, id);
    if(!r) return texto || id;
    var href = tipo === 'sec' && !enMarco ? '#' + id : '../informe-fase2.html' + r;
    return '<a class="ref ' + tipo + '" href="' + href + '" data-ruta="' + r + '">' + (texto || id) + '</a>';
  }

  function linea(s){
    return esc(s)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[\[(\w+):([^\]|]+)(?:\|([^\]]+))?\]\]/g, function(_, t, id, txt){ return enlace(t, id.trim(), txt && txt.trim()); });
  }

  function pintarBloque(b){
    if(typeof b === 'string') return '<p>' + linea(b) + '</p>';
    switch(b.t){
      case 'p': return '<p>' + linea(b.x) + '</p>';
      case 'h': return '<h3>' + linea(b.x) + '</h3>';
      case 'lista':
        var tag = b.num ? 'ol class="lista"' : 'ul';
        return '<' + tag + '>' + b.items.map(function(i){ return '<li>' + linea(i) + '</li>'; }).join('') + '</' + tag.split(' ')[0] + '>';
      case 'tabla':
        var nums = b.num || [];
        var cls = function(i){ return nums.indexOf(i) >= 0 ? ' class="num"' : ''; };
        return '<div class="tabla-env"><table class="tabla">' +
          (b.cab ? '<thead><tr>' + b.cab.map(function(c, i){ return '<th' + cls(i) + '>' + linea(c) + '</th>'; }).join('') + '</tr></thead>' : '') +
          '<tbody>' + b.filas.map(function(f){
            return '<tr>' + f.map(function(c, i){ return '<td' + cls(i) + '>' + linea(c) + '</td>'; }).join('') + '</tr>';
          }).join('') + '</tbody></table></div>';
      case 'pasos':
        var campos = [['entregable','Entregable'],['como','Cómo'],['depende','Depende de'],['acepta','Se acepta cuando'],['rol','Quién'],['ver','Ver']];
        return '<ol class="pasos">' + b.items.map(function(p){
          var dl = campos.filter(function(c){ return p[c[0]]; }).map(function(c){
            var v = Array.isArray(p[c[0]]) ? p[c[0]].map(linea).join(' · ') : linea(p[c[0]]);
            return '<dt>' + c[1] + '</dt><dd>' + v + '</dd>';
          }).join('');
          return '<li class="paso"><p class="paso-t">' + linea(p.t) + '</p>' + (p.x ? '<p>' + linea(p.x) + '</p>' : '') +
            (dl ? '<dl>' + dl + '</dl>' : '') + '</li>';
        }).join('') + '</ol>';
      case 'nota':
        return '<div class="nota' + (b.tipo ? ' ' + esc(b.tipo) : '') + '">' +
          (b.titulo ? '<span class="nota-t">' + linea(b.titulo) + '</span>' : '') + linea(b.x) + '</div>';
      case 'codigo': return '<pre class="codigo">' + esc(b.x) + '</pre>';
      case 'fig': return '<figure class="fig">' + b.svg + (b.pie ? '<figcaption>' + linea(b.pie) + '</figcaption>' : '') + '</figure>';
      case 'kpis':
        return '<div class="kpis">' + b.items.map(function(k){ return '<div class="kpi"><b>' + esc(k.v) + '</b><span>' + linea(k.x) + '</span></div>'; }).join('') + '</div>';
      case 'tarjetas':
        return '<div class="tarjetas">' + b.items.map(function(k){
          return '<div class="tarjeta"><h4>' + linea(k.titulo) + '</h4>' + (k.x ? '<p>' + linea(k.x) + '</p>' : '') +
            (k.chips ? '<div class="iad-meta">' + k.chips.map(function(c){ return '<span class="chip">' + linea(c) + '</span>'; }).join('') + '</div>' : '') +
            '</div>';
        }).join('') + '</div>';
      case 'fichas':
        // Fichas desplegables: {titulo, chips:[], campos:[[rótulo, texto], …]}
        return '<div class="fichas">' + b.items.map(function(k){
          return '<details class="ficha"' + (k.id ? ' id="f-' + esc(k.id) + '"' : '') + '><summary><span class="ficha-t">' + linea(k.titulo) + '</span>' +
            (k.chips ? k.chips.map(function(c){ return '<span class="chip">' + linea(c) + '</span>'; }).join('') : '') + '</summary>' +
            '<dl>' + (k.campos || []).filter(function(c){ return c[1]; }).map(function(c){
              return '<dt>' + esc(c[0]) + '</dt><dd>' + linea(c[1]) + '</dd>';
            }).join('') + '</dl></details>';
        }).join('') + '</div>';
      case 'html': return b.x;
    }
    return '';
  }

  // Ayuda flotante de los gráficos: toda marca con data-tip (y foco de teclado).
  function ayudas(raiz){
    var tip = document.createElement('div');
    tip.className = 'tip no-imp'; tip.hidden = true; tip.setAttribute('role', 'tooltip');
    document.body.appendChild(tip);
    function mostrar(el, x, y){
      tip.textContent = el.getAttribute('data-tip'); tip.hidden = false;
      var w = tip.offsetWidth, h = tip.offsetHeight;
      tip.style.left = Math.max(8, Math.min(window.innerWidth - w - 8, x + 14)) + 'px';
      tip.style.top = Math.max(8, y - h - 12) + 'px';
    }
    raiz.querySelectorAll('[data-tip]').forEach(function(el){
      el.addEventListener('pointermove', function(e){ mostrar(el, e.clientX, e.clientY); });
      el.addEventListener('pointerleave', function(){ tip.hidden = true; });
      el.addEventListener('focus', function(){ var r = el.getBoundingClientRect(); mostrar(el, r.left + r.width / 2, r.top); });
      el.addEventListener('blur', function(){ tip.hidden = true; });
    });
  }
  function pintarBloques(l){ return (l || []).map(pintarBloque).join(''); }

  function chipEstado(e){ return '<span class="chip e-' + esc(e) + '">' + (ESTADOS[e] || esc(e)) + '</span>'; }

  function pintarSeccion(s, capas){
    var h = '<section class="iad-sec" id="sec-' + esc(s.id) + '" data-id="' + esc(s.id) + '">' +
      '<header class="iad-sec-cab">' + (s.num != null ? '<span class="num">' + esc(s.num) + '</span>' : '') +
      '<h2>' + linea(s.titulo) + '</h2>' + chipEstado(s.estado || 'pendiente') + '</header>';
    if(s.intro) h += '<p class="iad-intro">' + linea(s.intro) + '</p>';
    if(s.que || s.como){
      if(s.que) h += '<div class="capa que"><p class="capa-rot">' + esc(capas.que) + '</p>' + pintarBloques(s.que) + '</div>';
      if(s.como) h += '<div class="capa como"><p class="capa-rot">' + esc(capas.como) + '</p>' + pintarBloques(s.como) + '</div>';
    } else if(s.bloques){
      h += pintarBloques(s.bloques);
    } else {
      h += '<div class="pend"><b>En redacción.</b> ' + linea(s.intencion || '') + '</div>';
    }
    return h + '</section>';
  }

  function montar(D){
    var raiz = document.getElementById('iad');
    var capas = D.capas || { que:'Qué es y por qué', como:'Cómo se hace' };
    var secs = D.secciones || [];
    var redactadas = secs.filter(function(s){ return s.que || s.como || s.bloques; }).length;
    document.title = D.titulo + ' — Arquitectura de IA | Proyecto Rower';

    var h = '';
    if(!enMarco){
      h += '<div class="iad-fuera no-imp">Esta página es parte de la Arquitectura de IA del manual de la Fase 2.' +
        '<a class="btn" href="../informe-fase2.html#/arquitectura/' + DOC + '">Abrir en el manual</a></div>';
    }
    h += '<header class="iad-cab"><p class="ceja">' + esc(D.ceja || 'Arquitectura de IA · Fase 2') + '</p>' +
      '<h1>' + linea(D.titulo) + '</h1>' + (D.lede ? '<p class="iad-lede">' + linea(D.lede) + '</p>' : '') +
      '<div class="iad-meta">' + chipEstado(D.estado || 'borrador') +
      (D.version ? '<span class="chip">Versión ' + esc(D.version) + '</span>' : '') +
      (D.corte ? '<span class="chip">Corte ' + esc(D.corte) + '</span>' : '') +
      '<span class="chip">' + redactadas + ' de ' + secs.length + ' secciones redactadas</span>' +
      '<button type="button" class="btn no-imp" id="iadImprimir">Imprimir o guardar PDF</button></div></header>';
    h += '<nav class="iad-toc" aria-label="Índice"><p class="ceja">Índice</p><ol>' + secs.map(function(s){
      return '<li><a href="#' + esc(s.id) + '" data-id="' + esc(s.id) + '"><span class="num">' + esc(s.num != null ? s.num : '') + '</span>' +
        '<span>' + linea(s.titulo) + '</span><span class="pto e-' + esc(s.estado || 'pendiente') + '" title="' + (ESTADOS[s.estado || 'pendiente'] || '') + '"></span></a></li>';
    }).join('') + '</ol></nav>';
    h += '<main class="iad-cuerpo">' + secs.map(function(s){ return pintarSeccion(s, capas); }).join('') + '</main>';
    raiz.innerHTML = h;
    raiz.removeAttribute('aria-busy');

    document.getElementById('iadImprimir').addEventListener('click', function(){ window.print(); });
    ayudas(raiz);
    // Al imprimir salen todas las fichas abiertas; después vuelven a como estaban.
    var cerradas = [];
    window.addEventListener('beforeprint', function(){
      cerradas = [].slice.call(raiz.querySelectorAll('details:not([open])'));
      cerradas.forEach(function(d){ d.open = true; });
    });
    window.addEventListener('afterprint', function(){ cerradas.forEach(function(d){ d.open = false; }); cerradas = []; });

    // Índice: en el marco, la sección queda en el hash del manual (se puede enlazar).
    raiz.querySelector('.iad-toc').addEventListener('click', function(e){
      var a = e.target.closest('a[data-id]'); if(!a) return;
      e.preventDefault();
      var id = a.getAttribute('data-id');
      if(enMarco){ try{ window.parent.location.hash = '#/arquitectura/' + DOC + '/' + id; return; }catch(err){} }
      location.hash = id;
    });
    // Referencias: en el marco navega el manual; sola, sigue el enlace.
    raiz.addEventListener('click', function(e){
      var a = e.target.closest('a[data-ruta]'); if(!a || !enMarco) return;
      e.preventDefault();
      try{ window.parent.location.hash = a.getAttribute('data-ruta'); }catch(err){ location.href = a.href; }
    });

    // Índice activo según lo que se lee.
    var enlaces = {};
    raiz.querySelectorAll('.iad-toc a[data-id]').forEach(function(a){ enlaces[a.getAttribute('data-id')] = a; });
    if('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(ents){
        ents.forEach(function(en){
          if(!en.isIntersecting) return;
          Object.keys(enlaces).forEach(function(k){ enlaces[k].classList.toggle('on', k === en.target.getAttribute('data-id')); });
        });
      }, { rootMargin:'-15% 0px -70% 0px' });
      raiz.querySelectorAll('.iad-sec').forEach(function(s){ io.observe(s); });
    }

    function irA(){
      var id = decodeURIComponent((location.hash || '').replace(/^#/, ''));
      if(!id) return;
      var s = document.getElementById('sec-' + id);
      if(s){ s.scrollIntoView({ block:'start' }); return; }
      // una ficha por su id (p. ej. #/arquitectura/casos/<módulo>): se abre y se enfoca
      var f = document.getElementById('f-' + id);
      if(f){ f.open = true; f.scrollIntoView({ block:'start' }); var sm = f.querySelector('summary'); if(sm) sm.focus({ preventScroll:true }); }
    }
    window.addEventListener('hashchange', irA);
    irA();
  }

  window.IADoc = { montar:montar, linea:linea, esc:esc, doc:DOC };

  var sc = document.createElement('script');
  sc.src = DOC + '-datos.js';
  sc.onload = function(){
    if(window.IA_DOC) montar(window.IA_DOC);
    else document.getElementById('iad').textContent = 'El documento no trae contenido (' + DOC + '-datos.js).';
  };
  sc.onerror = function(){ document.getElementById('iad').textContent = 'No se pudo cargar ' + DOC + '-datos.js.'; };
  document.head.appendChild(sc);
})();
