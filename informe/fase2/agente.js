/* ============================================================
   Rower · Agente IA flotante del manual de Fase 2 (25-oct-2026)
   ------------------------------------------------------------
   Botón flotante y panel de chat con el agente (Claude Managed Agents) que vive
   detrás de la Edge Function `agente`. Lo ve quien puede usarlo según
   mi_agente(): el interruptor general está encendido y la cuenta es del comité
   (validadores_tobe) o tiene el interruptor «Agente IA» del módulo Usuarios.

   El agente lee todo lo del proceso que la cuenta puede ver y solo cambia el
   flujo de actividades del To-Be: cada cambio llega como una tarjeta con la
   vista previa del flujograma y espera «Aplicar» o «Descartar». Aplicado, la
   página recarga los flujos de la plataforma (window.F2Manual.recargarFlujos).

   Depende de supabase/sesion.js (rowerSesion) y de flujo-render.js (vista previa).
   ============================================================ */
(function () {
  'use strict';
  var S = window.rowerSesion;
  if (!S || !S.viva || !S.viva()) return;

  var FN = S.url + '/functions/v1/agente';
  var LLAVE = 'rower.agente.abierto';
  var HERR = {
    ver_proceso: 'Leyendo el proceso', listar_procesos: 'Revisando el índice del manual', ver_validacion: 'Revisando la validación',
    buscar_pasajes: 'Buscando en el corpus', leer_documento: 'Leyendo un documento', leer_entrevista: 'Leyendo una entrevista',
    proponer_flujo: 'Preparando el flujo', ver_estructura: 'Leyendo la estructura', proponer_estructura: 'Preparando el cambio a la estructura'
  };

  // vista: 'chat' (la conversación abierta) o 'lista' (todas las de la cuenta).
  var st = { abierto: false, cargado: false, ocupado: false, msgs: [], estado: '', confirmarNueva: false,
             vista: 'chat', titulo: null, cerrada: false, recortada: false, convs: null,
             sesion: null,      // la conversación en pantalla: viaja en cada pedido (otra pestaña puede abrir otra)
             seguidas: 0,       // reintentos automáticos seguidos («seguir» / conversación ocupada)
             puedeEst: false }; // la cuenta tiene el interruptor «Estructura» (mi_agente)

  /* ---------- estilos ---------- */
  var CSS =
    '.ag-fab{position:fixed;right:20px;bottom:20px;z-index:400;display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 18px 0 14px;' +
      'border-radius:999px;border:0;background:var(--gradiente);color:var(--tinta-inversa);font:inherit;font-size:13px;font-weight:800;cursor:pointer;box-shadow:var(--sombra-alta)}' +
    '.ag-fab:focus-visible{outline:2px solid var(--cian);outline-offset:3px}' +
    '.ag-fab i{font-style:normal;font-size:16px}' +
    // En las vistas a pantalla completa, el zoom (+ − ⤢) ocupa la esquina inferior derecha: el botón se corre a su izquierda.
    'body:has(#estructura:not([hidden])) .ag-fab,body:has(#mapa:not([hidden])) .ag-fab,body:has(#circuito:not([hidden])) .ag-fab,body:has(#arquitectura:not([hidden])) .ag-fab{right:64px}' +
    '.ag-panel{position:fixed;right:16px;bottom:16px;top:76px;z-index:410;width:min(440px,calc(100vw - 32px));display:flex;flex-direction:column;' +
      'background:var(--panel);border:1px solid var(--borde);border-radius:20px;box-shadow:var(--sombra-alta);overflow:hidden}' +
    '.ag-panel[hidden],.ag-fab[hidden]{display:none}' +
    '.ag-cab{display:flex;align-items:center;gap:10px;padding:12px 12px 10px 16px;border-bottom:1px solid var(--borde)}' +
    '.ag-cab b{font-size:14px}.ag-cab small{display:block;font-size:11px;color:var(--tinta-tenue);margin-top:1px}' +
    '.ag-cab .ag-esp{flex:1}' +
    '.ag-ic{min-width:30px;height:30px;border-radius:999px;border:1px solid var(--borde);background:var(--panel);color:var(--tinta);font:inherit;font-size:12px;font-weight:650;cursor:pointer;padding:0 10px}' +
    '.ag-ic:hover{border-color:var(--tinta-tenue)}.ag-ic.ag-peligro{border-color:var(--riesgo);color:var(--riesgo)}' +
    '.ag-ctx{padding:6px 16px;font-size:11.5px;color:var(--tinta-media);background:var(--panel-alto);border-bottom:1px solid var(--borde)}' +
    '.ag-lista{flex:1;overflow:auto;padding:14px 14px 6px;display:flex;flex-direction:column;gap:10px;overscroll-behavior:contain}' +
    '.ag-vacio{font-size:12.5px;color:var(--tinta-media);line-height:1.55;padding:6px 2px}.ag-vacio ul{margin:6px 0 0;padding-left:18px}' +
    '.ag-vacio button{all:unset;cursor:pointer;color:var(--cian);font-weight:650}' +
    '.ag-m{max-width:100%;font-size:13px;line-height:1.55;overflow-wrap:anywhere}' +
    '.ag-u{align-self:flex-end;max-width:85%;background:color-mix(in srgb, var(--cian) 14%, var(--panel));border:1px solid color-mix(in srgb, var(--cian) 30%, transparent);' +
      'border-radius:14px 14px 4px 14px;padding:8px 11px;white-space:pre-wrap}' +
    '.ag-a{align-self:stretch}.ag-a p{margin:0 0 8px}.ag-a p:last-child{margin-bottom:0}.ag-a ul,.ag-a ol{margin:0 0 8px;padding-left:20px}' +
    '.ag-a code{font-family:var(--mono);font-size:11.5px;background:var(--panel-alto);border:1px solid var(--borde);border-radius:5px;padding:0 4px}' +
    '.ag-a pre{background:var(--panel-alto);border:1px solid var(--borde);border-radius:8px;padding:8px;overflow:auto;font-size:11.5px}' +
    '.ag-a table{border-collapse:collapse;font-size:12px;margin:0 0 8px;display:block;overflow:auto;max-width:100%}' +
    '.ag-a th,.ag-a td{border:1px solid var(--borde);padding:4px 6px;text-align:left;vertical-align:top}.ag-a th{background:var(--panel-alto)}' +
    '.ag-a h4{margin:6px 0 4px;font-size:13px}' +
    '.ag-estado{font-size:11.5px;color:var(--tinta-tenue);display:flex;align-items:center;gap:8px;padding:2px 2px 6px}' +
    '.ag-estado i{width:8px;height:8px;border-radius:50%;background:var(--cian);animation:agp 1s infinite alternate}' +
    '@keyframes agp{from{opacity:.25}to{opacity:1}}' +
    '.ag-err{font-size:12.5px;color:var(--riesgo);font-weight:650}' +
    '.ag-prop{border:1.5px solid color-mix(in srgb, var(--alerta) 55%, transparent);background:color-mix(in srgb, var(--alerta) 7%, var(--panel));border-radius:14px;padding:12px;display:flex;flex-direction:column;gap:8px}' +
    '.ag-prop.ag-ok{border-color:color-mix(in srgb, var(--ok) 50%, transparent);background:color-mix(in srgb, var(--ok) 7%, var(--panel))}' +
    '.ag-prop.ag-no{border-color:var(--borde);background:var(--panel-alto);opacity:.85}' +
    '.ag-prop-cab{display:flex;justify-content:space-between;gap:8px;align-items:baseline;flex-wrap:wrap}' +
    '.ag-prop-cab b{font-size:13px}.ag-prop-cab span{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--tinta-media)}' +
    '.ag-prop p{margin:0;font-size:12.5px;line-height:1.5;color:var(--tinta)}' +
    '.ag-dif{list-style:none;margin:0;padding:0;font-size:12px;display:flex;flex-direction:column;gap:3px}' +
    '.ag-dif li{display:grid;grid-template-columns:18px 1fr;gap:4px}.ag-dif b{font-family:var(--mono)}' +
    '.ag-dif .mas b{color:var(--ok)}.ag-dif .menos b{color:var(--riesgo)}.ag-dif .cambia b{color:var(--alerta)}' +
    '.ag-prev{max-height:260px;overflow:auto;border:1px solid var(--borde);border-radius:10px;background:var(--panel)}' +
    '.ag-prev .fx-marco{margin:0}' +
    '.ag-prop details{font-size:12px}.ag-prop summary{cursor:pointer;font-weight:650;color:var(--tinta-media)}' +
    '.ag-prop ol{margin:6px 0 0;padding-left:20px;display:flex;flex-direction:column;gap:4px}' +
    '.ag-acc{display:flex;gap:8px;flex-wrap:wrap;align-items:center}' +
    '.ag-btn{min-height:30px;padding:5px 14px;border-radius:999px;border:1px solid var(--borde);background:var(--panel);color:var(--tinta);font:inherit;font-size:12px;font-weight:700;cursor:pointer}' +
    '.ag-btn:disabled{opacity:.5;cursor:not-allowed}.ag-btn.ag-pri{background:var(--ok);border-color:var(--ok);color:var(--tinta-inversa)}' +
    '.ag-prop textarea{width:100%;min-height:52px;font:inherit;font-size:12.5px;color:var(--tinta);background:var(--panel);border:1px solid var(--borde);border-radius:8px;padding:6px 8px;resize:vertical}' +
    '.ag-pie{border-top:1px solid var(--borde);padding:10px 12px;display:flex;gap:8px;align-items:flex-end}' +
    '.ag-pie textarea{flex:1;min-height:40px;max-height:140px;resize:none;font:inherit;font-size:13px;line-height:1.45;color:var(--tinta);background:var(--panel-alto);' +
      'border:1px solid var(--borde);border-radius:12px;padding:9px 11px}' +
    '.ag-pie textarea:focus,.ag-prop textarea:focus{outline:2px solid var(--cian);outline-offset:1px}' +
    '.ag-enviar{height:40px;padding:0 16px;border-radius:12px;border:0;background:var(--gradiente);color:var(--tinta-inversa);font:inherit;font-size:13px;font-weight:800;cursor:pointer}' +
    '.ag-enviar:disabled{opacity:.5;cursor:not-allowed}' +
    '.ag-nota{font-size:11px;color:var(--tinta-tenue);padding:0 14px 8px}' +
    '.ag-cab small{max-width:240px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '.ag-ic.on{background:var(--panel-alto);border-color:var(--tinta-tenue)}' +
    '.ag-convs{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}' +
    '.ag-conv{all:unset;box-sizing:border-box;width:100%;cursor:pointer;display:flex;flex-direction:column;gap:3px;padding:10px 12px;border-radius:12px;border:1px solid var(--borde);background:var(--panel)}' +
    '.ag-conv:hover{border-color:var(--tinta-tenue)}.ag-conv:focus-visible{outline:2px solid var(--cian);outline-offset:1px}' +
    '.ag-conv b{font-size:13px;font-weight:650;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '.ag-conv span{font-size:11px;color:var(--tinta-tenue)}' +
    '.ag-conv.actual{border-color:var(--cian);background:color-mix(in srgb, var(--cian) 7%, var(--panel))}' +
    '.ag-lista-cab{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:4px}' +
    '.ag-lista-cab b{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--tinta-media)}' +
    '.ag-aviso{font-size:12px;color:var(--tinta-media);background:var(--panel-alto);border-radius:10px;padding:8px 10px}' +
    '@media (max-width:600px){.ag-panel{top:0;right:0;bottom:0;width:100vw;border-radius:0}.ag-fab{right:14px;bottom:14px}}' +
    '@media print{.ag-fab,.ag-panel{display:none!important}}';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- markdown mínimo (negritas, código, listas, tablas, títulos) ---------- */
  function enLinea(t) {
    return esc(t)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .replace(/\[([^\]]+)\]\((#\/[^)\s]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  }
  function md(txt) {
    var lin = String(txt || '').replace(/\r/g, '').split('\n'), out = [], i = 0;
    while (i < lin.length) {
      var l = lin[i];
      if (/^```/.test(l)) {
        var bl = []; i++;
        while (i < lin.length && !/^```/.test(lin[i])) bl.push(lin[i++]);
        i++; out.push('<pre>' + esc(bl.join('\n')) + '</pre>'); continue;
      }
      if (/^\s*\|/.test(l)) {
        var filas = [];
        while (i < lin.length && /^\s*\|/.test(lin[i])) filas.push(lin[i++]);
        var celdas = filas.filter(function (f) { return !/^\s*\|[\s:|-]+\|\s*$/.test(f); })
          .map(function (f) { return f.trim().replace(/^\||\|$/g, '').split('|').map(function (c) { return c.trim(); }); });
        out.push('<table>' + celdas.map(function (c, k) {
          return '<tr>' + c.map(function (x) { return (k ? '<td>' : '<th>') + enLinea(x) + (k ? '</td>' : '</th>'); }).join('') + '</tr>';
        }).join('') + '</table>');
        continue;
      }
      if (/^\s*([-*]|\d+\.)\s+/.test(l)) {
        var ord = /^\s*\d+\./.test(l), it = [];
        while (i < lin.length && /^\s*([-*]|\d+\.)\s+/.test(lin[i])) it.push(lin[i++].replace(/^\s*([-*]|\d+\.)\s+/, ''));
        out.push((ord ? '<ol>' : '<ul>') + it.map(function (x) { return '<li>' + enLinea(x) + '</li>'; }).join('') + (ord ? '</ol>' : '</ul>'));
        continue;
      }
      if (/^#{1,4}\s+/.test(l)) { out.push('<h4>' + enLinea(l.replace(/^#+\s+/, '')) + '</h4>'); i++; continue; }
      if (!l.trim()) { i++; continue; }
      var par = [];
      while (i < lin.length && lin[i].trim() && !/^(```|\s*\||\s*([-*]|\d+\.)\s+|#{1,4}\s)/.test(lin[i])) par.push(lin[i++]);
      out.push('<p>' + par.map(enLinea).join('<br>') + '</p>');
    }
    return out.join('');
  }

  /* ---------- contexto de la página ---------- */
  function pagina() {
    var h = location.hash || '#/', m = h.match(/^#\/(tobe|asis|p)\/(\d{1,2}\.\d{1,2})/), D = window.MANUAL_FASE2;
    if (m) {
      var cod = m[2], n = '';
      (D && D.macros || []).forEach(function (mm) { (mm.procesos || []).forEach(function (p) { if (p.codigo === cod) n = p.n; }); });
      return { ruta: h, proceso: cod, vista: m[1] === 'asis' ? 'asis' : 'tobe', titulo: n };
    }
    var es = h.match(/^#\/estructura(?:\/([^\/]+))?/);
    if (es) {
      var u = es[1] && !/^(premisas|capas)$/.test(es[1]) ? decodeURIComponent(es[1]) : '';
      return { ruta: h, vista: 'estructura', unidad: u, titulo: 'Estructura organizativa To-Be' };
    }
    var mm = h.match(/^#\/m\/(\d+)/);
    if (mm) return { ruta: h, titulo: 'macroproceso ' + mm[1] };
    return { ruta: h, titulo: document.title.replace(/ — Fase 2$/, '') };
  }
  function flujoActual(cod) {
    var C = window.MANUAL_CONTENIDO || {}, c = C[String(cod).split('.')[0]], p = c && c.procesos && c.procesos[cod];
    return (p && p.flujo) || null;
  }

  // La vista previa de una estructura se cierra cuando su propuesta deja de estar en juego.
  function cerrarPrevia() { if (window.F2Manual && window.F2Manual.salirPreviaEstructura) window.F2Manual.salirPreviaEstructura(); }

  /* ---------- red ---------- */
  function cabeceras() {
    return S.tokenVivo().then(function (jwt) {
      if (!jwt) throw new Error('Tu sesión venció. Vuelve a entrar.');
      return { Authorization: 'Bearer ' + jwt, apikey: S.clave, 'Content-Type': 'application/json' };
    });
  }
  function pedirJson(cuerpo) {
    return cabeceras().then(function (h) { return fetch(FN, { method: 'POST', headers: h, body: JSON.stringify(cuerpo) }); })
      .then(function (r) { return r.json().then(function (d) { if (!r.ok) throw new Error(d.error || ('Error ' + r.status)); return d; }); });
  }
  function pedirStream(cuerpo, alEvento) {
    return cabeceras().then(function (h) { return fetch(FN, { method: 'POST', headers: h, body: JSON.stringify(cuerpo) }); })
      .then(function (r) {
        if (!r.ok) return r.json().then(function (d) { throw new Error(d.error || ('Error ' + r.status)); });
        var lector = r.body.getReader(), dec = new TextDecoder(), buf = '';
        function leer() {
          return lector.read().then(function (x) {
            if (x.done) return;
            buf += dec.decode(x.value, { stream: true });
            var partes = buf.split('\n\n'); buf = partes.pop();
            partes.forEach(function (p) {
              var l = p.split('\n').filter(function (s) { return s.indexOf('data: ') === 0; }).map(function (s) { return s.slice(6); }).join('');
              if (l) { try { alEvento(JSON.parse(l)); } catch (e) { /* línea rota */ } }
            });
            return leer();
          });
        }
        return leer();
      });
  }

  /* ---------- DOM ---------- */
  var fab, panel, lista, entrada, btnEnviar, ctxEl, estadoEl;

  function montar() {
    var stl = document.createElement('style'); stl.textContent = CSS; document.head.appendChild(stl);
    fab = document.createElement('button');
    fab.type = 'button'; fab.className = 'ag-fab'; fab.id = 'agFab';
    fab.innerHTML = '<i aria-hidden="true">✦</i>Agente IA';
    fab.title = 'Pregúntale al agente o pídele cambios al flujo del To-Be';
    panel = document.createElement('section');
    panel.className = 'ag-panel'; panel.id = 'agPanel'; panel.hidden = true;
    panel.setAttribute('aria-label', 'Agente IA del manual');
    panel.innerHTML =
      '<div class="ag-cab"><div style="min-width:0"><b>Agente IA del manual</b><small id="agTitulo">Conversación nueva</small></div>' +
      '<span class="ag-esp"></span><button type="button" class="ag-ic" data-ag="lista" aria-pressed="false" title="Tus conversaciones guardadas">Conversaciones</button>' +
      '<button type="button" class="ag-ic" data-ag="nueva" title="Empezar una conversación nueva (la actual queda guardada)">Nueva</button>' +
      '<button type="button" class="ag-ic" data-ag="cerrar" aria-label="Cerrar el agente">✕</button></div>' +
      '<div class="ag-ctx" id="agCtx"></div>' +
      '<div class="ag-lista" id="agLista" aria-live="polite"></div>' +
      '<div class="ag-pie"><textarea id="agEntrada" rows="1" placeholder="Pregunta o pide un cambio al flujo…" aria-label="Mensaje para el agente"></textarea>' +
      '<button type="button" class="ag-enviar" id="agEnviar">Enviar</button></div>' +
      '<div class="ag-nota" id="agNota"></div>';
    document.body.appendChild(fab); document.body.appendChild(panel);
    lista = panel.querySelector('#agLista'); entrada = panel.querySelector('#agEntrada');
    btnEnviar = panel.querySelector('#agEnviar'); ctxEl = panel.querySelector('#agCtx');

    fab.addEventListener('click', function () { abrir(true); });
    panel.addEventListener('click', alClic);
    btnEnviar.addEventListener('click', enviar);
    entrada.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); enviar(); }
    });
    entrada.addEventListener('input', function () { entrada.style.height = 'auto'; entrada.style.height = Math.min(140, entrada.scrollHeight) + 'px'; });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && st.abierto) abrir(false); });
    window.addEventListener('hashchange', function () { pintarCtx(); if (!st.msgs.length && !st.estado && st.vista === 'chat') pintar(); else pintarTextos(); });
    var abiertoAntes = false;
    try { abiertoAntes = localStorage.getItem(LLAVE) === '1'; } catch (e) { /* sin almacenamiento */ }
    if (abiertoAntes) abrir(true);
  }

  function abrir(si) {
    st.abierto = si; panel.hidden = !si; fab.hidden = si;
    try { localStorage.setItem(LLAVE, si ? '1' : '0'); } catch (e) { /* sin almacenamiento */ }
    if (si) {
      pintarCtx();
      if (!st.cargado) cargar();
      setTimeout(function () { entrada.focus(); }, 50);
    } else { fab.focus(); }
  }

  function pintarCtx() {
    if (!ctxEl) return;
    var p = pagina();
    ctxEl.textContent = p.vista === 'estructura' ? 'Viendo: estructura organizativa To-Be' + (p.unidad ? ' · unidad ' + p.unidad : '')
      : p.proceso ? 'Viendo: ' + p.proceso + ' ' + (p.vista === 'asis' ? 'As-Is' : 'To-Be') + (p.titulo ? ' · ' + p.titulo : '') : 'Viendo: ' + (p.titulo || 'el manual');
  }

  // Lo que dice el chat vacío, el campo y la nota: en la estructura habla de la estructura.
  function textos() {
    if (pagina().vista === 'estructura') return {
      vacio: (st.puedeEst ? 'Pregúntame por la estructura organizativa, o pídeme cambiarla.' : 'Pregúntame por la estructura organizativa: unidades, ocupantes, comités y premisas.') + ' Por ejemplo:',
      ejemplos: ['¿De quién depende la gerencia de Mercadeo y en qué comités participa?', '¿Qué posiciones están vacantes o por definir?', '¿Qué pendientes tiene la estructura?'],
      campo: st.puedeEst ? 'Pregunta o pide un cambio a la estructura…' : 'Pregunta por la estructura…',
      nota: st.puedeEst ? 'Los cambios a la estructura se aplican solo cuando pulsas «Aplicar».' : 'Cambiar la estructura pide el permiso «Estructura» de tu cuenta; preguntar, no.'
    };
    return {
      vacio: 'Pregúntame por cualquier proceso, o pídeme cambiar su flujo de actividades. Por ejemplo:',
      ejemplos: ['¿Qué notas tiene el comité sobre este proceso?', '¿En qué se diferencia el To-Be del As-Is de este proceso?', 'Propón cómo cerrar la brecha de control que señala la nota más reciente.'],
      campo: 'Pregunta o pide un cambio al flujo…',
      nota: 'Los cambios al flujo se aplican solo cuando pulsas «Aplicar». Lo demás se anota en las notas de validación.'
    };
  }
  function pintarTextos() {
    if (!panel) return;
    var t = textos(), pend = st.msgs.some(function (m) { return m.tipo === 'propuesta' && m.estado === 'pendiente'; });
    entrada.placeholder = st.cerrada ? 'Conversación terminada' : pend ? 'Escribe qué ajustar (descarta la propuesta)…' : t.campo;
    panel.querySelector('#agNota').textContent = t.nota;
  }

  function cargar() {
    st.cargado = true;
    st.estado = 'Cargando la conversación…'; pintar();
    pedirJson({ accion: 'estado' }).then(function (d) {
      ponerConversacion(d);
      if (d.ocupado) correr({ accion: 'seguir' });
    }).catch(function (e) { st.estado = ''; st.msgs.push({ tipo: 'err', x: e.message }); pintar(); });
  }

  function ponerConversacion(d) {
    st.msgs = (d.mensajes || []).map(function (m) {
      return m.rol === 'propuesta' ? { tipo: 'propuesta', clase: m.tipo || 'flujo', id: m.id, proceso: m.proceso, resumen: m.resumen, estado: m.estado,
                                       motivo: m.motivo, flujo: m.flujo, cambios: m.cambios, datos: m.datos }
                                   : { tipo: m.rol === 'usuario' ? 'u' : 'a', x: m.x };
    });
    if (d.error) st.msgs.push({ tipo: 'err', x: 'No se pudo leer toda la conversación: ' + d.error });
    st.titulo = d.titulo || null; st.cerrada = !!d.cerrada; st.recortada = !!d.recortada; st.sesion = d.sesion || null;
    st.estado = ''; st.vista = 'chat';
    pintar();
  }

  /* ---------- la lista de conversaciones ---------- */
  function fechaCorta(t) {
    if (!t) return '';
    var d = new Date(t), hoy = new Date(), ayer = new Date(hoy.getTime() - 864e5);
    var hora = d.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' });
    if (d.toDateString() === hoy.toDateString()) return 'hoy · ' + hora;
    if (d.toDateString() === ayer.toDateString()) return 'ayer · ' + hora;
    return d.toLocaleDateString('es', { day: 'numeric', month: 'short' }) + ' · ' + hora;
  }

  function verLista() {
    st.vista = 'lista'; st.convs = null; pintar();
    pedirJson({ accion: 'conversaciones' }).then(function (d) { st.convs = d.conversaciones || []; pintar(); })
      .catch(function (e) { st.convs = []; st.msgs.push({ tipo: 'err', x: e.message }); st.vista = 'chat'; pintar(); });
  }

  function listaHtml() {
    var h = '<div class="ag-lista-cab"><b>Tus conversaciones</b><button type="button" class="ag-btn" data-ag="nueva-ya">+ Nueva</button></div>';
    if (!st.convs) return h + '<div class="ag-estado"><i aria-hidden="true"></i>Cargando…</div>';
    if (!st.convs.length) return h + '<div class="ag-vacio">Todavía no tienes conversaciones guardadas.</div>';
    return h + '<ul class="ag-convs">' + st.convs.map(function (c) {
      return '<li><button type="button" class="ag-conv' + (c.activa ? ' actual' : '') + '" data-ag="abrir" data-sid="' + esc(c.session_id) + '">' +
             '<b>' + esc(c.titulo || 'Conversación sin mensajes') + '</b>' +
             '<span>' + (c.activa ? 'Abierta ahora · ' : '') + 'última actividad ' + esc(fechaCorta(c.ultimo_uso)) + ' · empezó ' + esc(fechaCorta(c.creado_en)) + '</span></button></li>';
    }).join('') + '</ul><p class="ag-nota" style="padding:8px 0 0">Las conversaciones se guardan: puedes retomar cualquiera otro día desde aquí.</p>';
  }

  function abrirConversacion(sid) {
    cerrarPrevia();
    st.vista = 'chat'; st.msgs = []; st.estado = 'Abriendo la conversación…'; pintar();
    pedirJson({ accion: 'abrir', session_id: sid }).then(function (d) {
      ponerConversacion(d);
      if (d.ocupado && !d.cerrada) correr({ accion: 'seguir' });
    }).catch(function (e) { st.estado = ''; st.msgs.push({ tipo: 'err', x: e.message }); pintar(); });
  }

  /* ---------- pintar ---------- */
  function difActividades(antes, despues) {
    var a = {}, d = {}, out = [];
    ((antes && antes.actividades) || []).forEach(function (x) { a[x.id] = x; });
    ((despues && despues.actividades) || []).forEach(function (x) { d[x.id] = x; });
    ((despues && despues.actividades) || []).forEach(function (x) {
      if (!a[x.id]) out.push(['mas', '+', x.id + ' · ' + x.texto]);
      else if (a[x.id].texto !== x.texto || a[x.id].rol !== x.rol) out.push(['cambia', '~', x.id + ' · ' + x.texto]);
    });
    ((antes && antes.actividades) || []).forEach(function (x) { if (!d[x.id]) out.push(['menos', '−', x.id + ' · ' + x.texto]); });
    return out;
  }

  function tarjetaEstructura(m, k, est, cls, rot) {
    var h = '<div class="ag-prop' + cls + '" data-k="' + k + '"><div class="ag-prop-cab"><b>Cambio a la estructura organizativa</b><span>' + rot + '</span></div>' +
            '<p>' + esc(m.resumen) + '</p>';
    if ((m.cambios || []).length) h += '<ul class="ag-dif">' + m.cambios.map(function (c) { return '<li class="cambia"><b>•</b><span>' + esc(c) + '</span></li>'; }).join('') + '</ul>';
    if (est === 'pendiente' && m.datos) {
      h += '<div class="ag-acc"><button type="button" class="ag-btn" data-ag="previa" data-k="' + k + '">Ver vista previa</button></div>' +
           '<p class="ag-nota" style="padding:0">No cambian solos: los cargos que nombran los procesos del manual, «Capas y funcionamiento» ni el instructivo.</p>';
      if (m.descartando) {
        h += '<textarea data-ag-motivo="' + k + '" placeholder="Opcional: qué debería cambiar">' + esc(m.motivo || '') + '</textarea>' +
             '<div class="ag-acc"><button type="button" class="ag-btn" data-ag="descartar-ok" data-k="' + k + '"' + (st.ocupado ? ' disabled' : '') + '>Descartar</button>' +
             '<button type="button" class="ag-btn" data-ag="descartar-no" data-k="' + k + '">Volver</button></div>';
      } else {
        h += '<div class="ag-acc"><button type="button" class="ag-btn ag-pri" data-ag="aplicar" data-k="' + k + '"' + (st.ocupado || m.previaFallo ? ' disabled' : '') + '>Aplicar a la estructura</button>' +
             '<button type="button" class="ag-btn" data-ag="descartar" data-k="' + k + '"' + (st.ocupado ? ' disabled' : '') + '>Descartar</button></div>' +
             '<div class="ag-nota" style="padding:0">Si escribes otro mensaje, esta propuesta se descarta y el agente toma tu mensaje como respuesta.</div>';
      }
    } else if (est === 'rechazada' && m.motivo) {
      h += '<p class="ag-nota" style="padding:0">Motivo: ' + esc(m.motivo) + '</p>';
    } else if (est === 'aplicada') {
      h += '<div class="ag-acc"><a class="ag-btn" href="#/estructura">Ver la estructura</a></div>';
    }
    return h + '</div>';
  }

  function tarjeta(m, k) {
    var est = m.estado || 'pendiente';
    var cls = est === 'aplicada' ? ' ag-ok' : est === 'rechazada' ? ' ag-no' : '';
    var rot = est === 'aplicada' ? 'Aplicada' + (m.version ? ' · versión ' + m.version : '') : est === 'rechazada' ? 'Descartada' : 'Propuesta · espera tu decisión';
    if (m.clase === 'estructura') return tarjetaEstructura(m, k, est, cls, rot);
    var h = '<div class="ag-prop' + cls + '" data-k="' + k + '"><div class="ag-prop-cab"><b>Cambio al flujo de ' + esc(m.proceso) + '</b><span>' + rot + '</span></div>' +
            '<p>' + esc(m.resumen) + '</p>';
    if (est === 'pendiente' && m.flujo) {
      var dif = difActividades(flujoActual(m.proceso), m.flujo);
      if (dif.length) h += '<ul class="ag-dif">' + dif.map(function (x) { return '<li class="' + x[0] + '"><b>' + x[1] + '</b><span>' + esc(x[2]) + '</span></li>'; }).join('') + '</ul>';
      else h += '<p class="ag-nota" style="padding:0">Las actividades no cambian; cambia el flujograma.</p>';
      h += '<div class="ag-prev" id="agPrev-' + k + '"></div>' +
           '<details><summary>Ver las ' + m.flujo.actividades.length + ' actividades propuestas</summary><ol>' +
           m.flujo.actividades.map(function (a) { return '<li><b>' + esc(a.rol) + '.</b> ' + esc(a.texto) + '</li>'; }).join('') + '</ol></details>';
      if (m.descartando) {
        h += '<textarea data-ag-motivo="' + k + '" placeholder="Opcional: qué debería cambiar">' + esc(m.motivo || '') + '</textarea>' +
             '<div class="ag-acc"><button type="button" class="ag-btn" data-ag="descartar-ok" data-k="' + k + '"' + (st.ocupado ? ' disabled' : '') + '>Descartar</button>' +
             '<button type="button" class="ag-btn" data-ag="descartar-no" data-k="' + k + '">Volver</button></div>';
      } else {
        h += '<div class="ag-acc"><button type="button" class="ag-btn ag-pri" data-ag="aplicar" data-k="' + k + '"' + (st.ocupado ? ' disabled' : '') + '>Aplicar al manual</button>' +
             '<button type="button" class="ag-btn" data-ag="descartar" data-k="' + k + '"' + (st.ocupado ? ' disabled' : '') + '>Descartar</button></div>' +
             '<div class="ag-nota" style="padding:0">Si escribes otro mensaje, esta propuesta se descarta y el agente toma tu mensaje como respuesta.</div>';
      }
    } else if (est === 'rechazada' && m.motivo) {
      h += '<p class="ag-nota" style="padding:0">Motivo: ' + esc(m.motivo) + '</p>';
    } else if (est === 'aplicada') {
      h += '<div class="ag-acc"><a class="ag-btn" href="#/tobe/' + esc(m.proceso) + '/flujo">Ver el flujo de ' + esc(m.proceso) + '</a></div>';
    }
    return h + '</div>';
  }

  function pintar() {
    if (!lista) return;
    var tit = panel.querySelector('#agTitulo');
    tit.textContent = st.titulo || 'Conversación nueva'; tit.title = st.titulo || '';
    var bl = panel.querySelector('[data-ag="lista"]');
    bl.classList.toggle('on', st.vista === 'lista'); bl.setAttribute('aria-pressed', String(st.vista === 'lista'));
    bl.disabled = st.ocupado;
    if (st.vista === 'lista') {
      lista.innerHTML = listaHtml();
      btnEnviar.disabled = true; entrada.disabled = true;
      return;
    }
    entrada.disabled = st.cerrada;
    var cerca = lista.scrollHeight - lista.scrollTop - lista.clientHeight < 80;
    var h = '';
    if (st.recortada) h += '<div class="ag-aviso">Se muestran los últimos 200 mensajes de esta conversación.</div>';
    if (st.cerrada) h += '<div class="ag-aviso">Esta conversación ya terminó: puedes leerla, pero para seguir hay que empezar una nueva.</div>';
    if (!st.msgs.length && !st.estado) {
      var tx = textos();
      h = '<div class="ag-vacio">' + esc(tx.vacio) + '<ul>' + tx.ejemplos.map(function (e) {
        return '<li><button type="button" data-ag="ejemplo">' + esc(e) + '</button></li>'; }).join('') + '</ul></div>';
    }
    st.msgs.forEach(function (m, k) {
      if (m.tipo === 'u') h += '<div class="ag-m ag-u">' + esc(m.x) + '</div>';
      else if (m.tipo === 'a') h += '<div class="ag-m ag-a">' + md(m.x) + '</div>';
      else if (m.tipo === 'propuesta') h += tarjeta(m, k);
      else if (m.tipo === 'err') h += '<div class="ag-err" role="alert">' + esc(m.x) + '</div>';
    });
    if (st.estado) h += '<div class="ag-estado"><i aria-hidden="true"></i>' + esc(st.estado) + '</div>';
    lista.innerHTML = h;
    st.msgs.forEach(function (m, k) {
      var prev = m.tipo === 'propuesta' && m.clase !== 'estructura' && m.estado === 'pendiente' && m.flujo && lista.querySelector('#agPrev-' + k);
      if (prev && window.FlujoRender) window.FlujoRender.montar(prev, m.flujo.diagrama, 'Propuesta · ' + m.proceso);
    });
    btnEnviar.disabled = st.ocupado || st.cerrada;
    pintarTextos();
    var nueva = panel.querySelector('[data-ag="nueva"]');
    nueva.textContent = st.confirmarNueva ? '¿Empezar otra?' : 'Nueva';
    nueva.classList.toggle('ag-peligro', st.confirmarNueva);
    nueva.disabled = st.ocupado;
    if (cerca) lista.scrollTop = lista.scrollHeight;
  }

  /* ---------- turno ---------- */
  function ultimaAgente(id) {
    for (var i = st.msgs.length - 1; i >= 0; i--) if (st.msgs[i].tipo === 'a' && st.msgs[i].id === id) return st.msgs[i];
    return null;
  }
  function propuesta(id) {
    for (var i = st.msgs.length - 1; i >= 0; i--) if (st.msgs[i].tipo === 'propuesta' && st.msgs[i].id === id) return st.msgs[i];
    return null;
  }
  function pendiente() {
    for (var i = st.msgs.length - 1; i >= 0; i--) if (st.msgs[i].tipo === 'propuesta' && st.msgs[i].estado === 'pendiente') return st.msgs[i];
    return null;
  }

  function alEvento(ev) {
    if (ev.t === 'inicio') { st.msgs.push({ tipo: 'a', id: ev.id, x: '' }); st.estado = 'Escribiendo…'; }
    else if (ev.t === 'delta') { var a = ultimaAgente(ev.id); if (a) a.x += ev.x; }
    else if (ev.t === 'mensaje') {
      var b = ultimaAgente(ev.id);
      if (b) b.x = ev.x; else st.msgs.push({ tipo: 'a', id: ev.id, x: ev.x });
      st.estado = 'Pensando…';
    }
    else if (ev.t === 'pensando') st.estado = 'Pensando…';
    else if (ev.t === 'herramienta') st.estado = ev.corrigiendo ? 'Corrigiendo la propuesta…' : (HERR[ev.nombre] || 'Consultando') + (ev.codigo ? ' ' + ev.codigo : '') + '…';
    else if (ev.t === 'propuesta') {
      if (!st.msgs.some(function (m) { return m.tipo === 'propuesta' && m.id === ev.id; })) {
        st.msgs.push({ tipo: 'propuesta', clase: ev.tipo || 'flujo', id: ev.id, proceso: ev.proceso, resumen: ev.resumen, flujo: ev.flujo,
                       cambios: ev.cambios, datos: ev.datos, estado: 'pendiente' });
      }
      st.estado = '';
    }
    else if (ev.t === 'descartada') { var p = st.msgs.filter(function (m) { return m.id === ev.id; })[0]; if (p) p.estado = 'rechazada'; cerrarPrevia(); }
    else if (ev.t === 'sesion') st.sesion = ev.id;
    else if (ev.t === 'ocupada') { st.ocupada = true; st.estado = ev.x; }
    else if (ev.t === 'conflicto') {
      var c = propuesta(ev.id); if (c) { c.estado = 'rechazada'; c.motivo = ev.x; }
      cerrarPrevia();
      st.msgs.push({ tipo: 'err', x: ev.x });
    }
    else if (ev.t === 'aplicado') {
      var q = propuesta(ev.id) || pendiente(); if (q) { q.estado = 'aplicada'; q.version = ev.version; }
      if (window.F2Manual) {
        if (ev.tipo === 'estructura') { if (window.F2Manual.recargarEstructura) window.F2Manual.recargarEstructura(); }
        else if (window.F2Manual.recargarFlujos) window.F2Manual.recargarFlujos();
      }
      st.estado = 'Publicado. El agente confirma…';
    }
    else if (ev.t === 'aviso') st.estado = ev.x;
    else if (ev.t === 'error') st.msgs.push({ tipo: 'err', x: ev.x });
    else if (ev.t === 'seguir') st.seguir = true;
    else if (ev.t === 'fin') st.estado = '';
    else if (ev.t === 'titulo') st.titulo = ev.x;
    pintar();
  }

  function correr(cuerpo) {
    st.ocupado = true; st.seguir = false; st.ocupada = false; st.confirmarNueva = false;
    if (cuerpo.accion !== 'resolver' && st.sesion) cuerpo.session_id = st.sesion;
    if (!st.estado) st.estado = 'Pensando…';
    pintar();
    return pedirStream(cuerpo, alEvento).catch(function (e) {
      st.msgs.push({ tipo: 'err', x: e.message || String(e) });
    }).then(function () {
      st.ocupado = false;
      // Retomar solo: el turno siguió corriendo (la función corta a los 120 s) o la conversación
      // estaba ocupada en otra pestaña. Con tope, para no quedar dando vueltas.
      if ((st.seguir || st.ocupada) && st.sesion && st.seguidas < 15) {
        st.seguidas++;
        st.estado = st.ocupada ? 'La conversación está trabajando en otra pestaña; esperando…' : 'Sigue trabajando…';
        pintar();
        return new Promise(function (r) { setTimeout(r, st.ocupada ? 4000 : 500); }).then(function () { return correr({ accion: 'seguir' }); });
      }
      if (st.seguidas >= 15) st.msgs.push({ tipo: 'err', x: 'El agente sigue ocupado. Vuelve a abrir la conversación en un momento.' });
      st.seguidas = 0;
      if (!pendiente()) st.estado = '';
      pintar();
    });
  }

  function enviar() {
    var t = (entrada.value || '').trim();
    if (!t || st.ocupado || st.cerrada) return;
    entrada.value = ''; entrada.style.height = 'auto';
    var p = pendiente(); if (p) { p.estado = 'rechazada'; p.motivo = t; cerrarPrevia(); }
    st.msgs.push({ tipo: 'u', x: t });
    correr({ accion: 'enviar', texto: t, pagina: pagina() });
  }

  function alClic(e) {
    var b = e.target.closest && e.target.closest('[data-ag]'); if (!b) return;
    var acc = b.getAttribute('data-ag'), k = Number(b.getAttribute('data-k')), m = st.msgs[k];
    if (acc === 'cerrar') return abrir(false);
    if (acc === 'ejemplo') { entrada.value = b.textContent; return enviar(); }
    if (acc === 'lista') { if (st.ocupado) return; if (st.vista === 'lista') { st.vista = 'chat'; pintar(); } else verLista(); return; }
    if (acc === 'abrir') { abrirConversacion(b.getAttribute('data-sid')); return; }
    if (acc === 'nueva' || acc === 'nueva-ya') {
      if (st.ocupado) return;
      // La conversación actual no se pierde: queda en «Conversaciones». Sin mensajes, no hace falta confirmar.
      if (acc === 'nueva' && st.msgs.length && !st.confirmarNueva) { st.confirmarNueva = true; pintar(); return; }
      st.confirmarNueva = false;
      cerrarPrevia();
      pedirJson({ accion: 'nueva' }).then(function () {
        st.msgs = []; st.titulo = null; st.cerrada = false; st.recortada = false; st.sesion = null; st.vista = 'chat'; pintar(); entrada.focus();
      }).catch(function (er) { st.msgs.push({ tipo: 'err', x: er.message }); pintar(); });
      return;
    }
    if (!m || m.tipo !== 'propuesta' || st.ocupado) return;
    if (acc === 'previa') {
      if (window.F2Manual && window.F2Manual.previsualizarEstructura) {
        if (window.F2Manual.previsualizarEstructura(m.datos)) abrir(false);
        else { m.previaFallo = true; st.msgs.push({ tipo: 'err', x: 'La vista previa no se pudo dibujar: no la apliques. Pídele al agente que la revise.' }); pintar(); }
      }
      return;
    }
    if (acc === 'aplicar') { correr({ accion: 'resolver', propuesta_id: m.id, aprobar: true }); return; }
    if (acc === 'descartar') { m.descartando = true; pintar(); var ta = lista.querySelector('[data-ag-motivo="' + k + '"]'); if (ta) ta.focus(); return; }
    if (acc === 'descartar-no') { m.descartando = false; pintar(); return; }
    if (acc === 'descartar-ok') {
      var ta2 = lista.querySelector('[data-ag-motivo="' + k + '"]'), motivo = ta2 ? ta2.value.trim() : '';
      m.estado = 'rechazada'; m.motivo = motivo; m.descartando = false;
      cerrarPrevia();
      correr({ accion: 'resolver', propuesta_id: m.id, aprobar: false, motivo: motivo });
    }
  }

  // La barra de la vista previa de la estructura reabre el chat con «Volver a la propuesta».
  window.RowerAgente = { abrir: function () { if (panel) abrir(true); } };

  /* ---------- arranque: solo si la cuenta puede usar el agente ---------- */
  function iniciar() {
    cabeceras().then(function (h) {
      return fetch(S.url + '/rest/v1/rpc/mi_agente', { method: 'POST', headers: h, body: '{}' });
    }).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
      if (d && d.puede) { st.puedeEst = !!d.estructura; montar(); }
    }).catch(function () { /* sin agente */ });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
