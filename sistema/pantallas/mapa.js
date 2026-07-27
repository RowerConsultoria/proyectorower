/* ============================================================================
   EL SISTEMA — Módulo: mapa global                      · Fase 30 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   La visual ejecutiva: TODA la red sobre el mapa real — los 5 almacenes
   propios (◆, fase 27) y los 6 frentes de clientes (●, fase 28) — con el
   filtro por marca, los flujos del reparto de anoche como arcos con
   corriente, y el clic que abre la tarjeta con sus cifras y su ficha.

   ⚠️ FUENTE ÚNICA: las coordenadas salen de almacenes.js y clientes.js; las
   unidades de STOCK_HUB/STOCK_FRENTE; el semáforo del borde es el de las
   fases 27 (ocupación) y 28 (confianza de la estimación); los flujos, del
   reparto X-01 del turno. Aquí no nace ninguna cifra.

   El mapa vive de la red (tiles de Mapbox). Sin red, sin token o sin WebGL,
   cae a la lista por país — declarado, no escondido.
   ============================================================================ */

window.PANTALLAS = window.PANTALLAS || {};

const _mapa = { map: null, marca: 'ambas', flujos: true, obs: null };

/* ⚠️ `esc()` NO se redeclara aquí: ya es global (nucleo/app.js) y los scripts
   clásicos comparten ámbito — un `const` repetido tumba la página entera. Es
   el mismo tropiezo que `ETAPAS` en el portal del cliente. Se usa el global. */

/* ── el modelo de los puntos: 5 almacenes ◆ + 6 clientes ● ─────────────── */
function puntosMapa() {
  const dist = inventarioDistribuido();
  const puntos = [];

  const porMarca = id => {
    const r = { Casio: 0, Cubitt: 0 };
    for (const p of CATALOGO) {
      const u = id === 'ZLC' ? (STOCK_HUB[p.sku] || 0) : ((STOCK_FRENTE[p.sku] || {})[id] || 0);
      r[p.marca] = (r[p.marca] || 0) + u;
    }
    return r;
  };

  for (const a of ALMACENES) {
    const senas = senasAlmacen(a.id);
    const marcas = porMarca(a.id);
    const u = marcas.Casio + marcas.Cubitt;
    const est = estadoOcupacion(u / a.capacidadU);
    puntos.push({
      id: a.id, tipo: 'almacen', nombre: senas.nombre, lugar: senas.lugar,
      lat: a.lat, lon: a.lon, u, marcas, semaforo: est.clase, rotuloSem: 'ocupación ' + est.r,
      dueno: a.dueno,
    });
  }
  for (const c of dist.clientes) {
    const marcas = porMarca(c.f.id);
    puntos.push({
      id: c.f.id, tipo: 'cliente', nombre: c.f.nombre, lugar: c.f.pais + ' · ' + c.f.almacen,
      lat: fichaCliente(c.f.id).lat, lon: fichaCliente(c.f.id).lon,
      u: c.estimado, banda: c.banda, marcas, semaforo: c.confianza.clase,
      rotuloSem: 'estimación ' + c.confianza.r, cliente: c,
    });
  }
  return puntos;
}

/* la cifra que enseña un punto con el filtro puesto */
function uFiltrada(p, marca) {
  return marca === 'ambas' ? p.u : (p.marcas[marca] || 0);
}

/* ── un arco entre dos puntos, con comba: el lenguaje de la corriente ────── */
function arco(a, b, pasos = 32) {
  const puntos = [];
  /* bézier cuadrática: el punto de control se aparta perpendicular al vano,
     y la comba crece con la distancia — el arco de la bajada de la torre */
  const mx = (a.lon + b.lon) / 2, my = (a.lat + b.lat) / 2;
  const dx = b.lon - a.lon, dy = b.lat - a.lat;
  const px = mx - dy * 0.35, py = my + dx * 0.35 * 0.6;
  for (let i = 0; i <= pasos; i++) {
    const t = i / pasos;
    const lon = (1 - t) * (1 - t) * a.lon + 2 * (1 - t) * t * px + t * t * b.lon;
    const lat = (1 - t) * (1 - t) * a.lat + 2 * (1 - t) * t * py + t * t * b.lat;
    puntos.push([lon, lat]);
  }
  return puntos;
}

/* ------------------------------------------------------ pantalla: mapa ---- */

window.PANTALLAS['mapa'] = function (lienzo) {
  const n = v => Math.round(v || 0).toLocaleString('es-VE');
  const puntos = puntosMapa();
  const rep = datosDe('X-01') || { porFrente: {} };

  const medido = puntos.filter(p => p.tipo === 'almacen').reduce((a, p) => a + p.u, 0);
  const estimado = puntos.filter(p => p.tipo === 'cliente').reduce((a, p) => a + p.u, 0);
  const flujoU = Object.values(rep.porFrente).reduce((a, x) => a + x.recibe, 0);

  lienzo.innerHTML = `
    <div class="lienzo-cab fila-sep">
      <div>
        <div class="sobretitulo">red · mapa global</div>
        <div class="titulo-seccion" style="margin-top:4px">dónde está la red</div>
      </div>
      <div class="fila gap-8">
        <button class="btn btn-mini ${_mapa.marca === 'ambas' ? 'btn-suave' : 'btn-fantasma'}" data-marca="ambas">ambas marcas</button>
        <button class="btn btn-mini ${_mapa.marca === 'Casio' ? 'btn-suave' : 'btn-fantasma'}" data-marca="Casio">Casio</button>
        <button class="btn btn-mini ${_mapa.marca === 'Cubitt' ? 'btn-suave' : 'btn-fantasma'}" data-marca="Cubitt">Cubitt</button>
        <button class="btn btn-mini ${_mapa.flujos ? 'btn-suave' : 'btn-fantasma'}" id="mapa-flujos">⇄ flujos de anoche</button>
      </div>
    </div>

    <div class="cinta" style="margin-bottom:20px">
      <span class="orbe hecho"></span><span class="hora">${HOY.hora}</span>
      <div class="crece">dibujo la red completa: <b>${puntos.length} puntos</b> —
        ${n(medido)} u medidas en ${puntos.filter(p => p.tipo === 'almacen').length} almacenes propios y
        ${n(estimado)} u estimadas en ${puntos.filter(p => p.tipo === 'cliente').length} frentes —
        y el reparto de anoche movió <b>${n(flujoU)} u</b></div>
    </div>

    <div class="rejilla rejilla-4" style="margin-bottom:18px">
      <div class="tarjeta"><div class="kpi"><div class="rotulo">puntos en el mapa</div>
        <div class="valor" id="mapa-puntos">${puntos.length}</div>
        <div class="pie">◆ ${puntos.filter(p => p.tipo === 'almacen').length} almacenes ·
          ● ${puntos.filter(p => p.tipo === 'cliente').length} frentes</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">unidades medidas</div>
        <div class="valor">${n(medido)}</div><div class="pie">almacenes propios — fase 27</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">unidades estimadas</div>
        <div class="valor">${n(estimado)}</div><div class="pie">en casa de clientes — fase 28</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">flujos de anoche · u</div>
        <div class="valor">${n(flujoU)}</div><div class="pie">reparto X-01, de Colón a la red</div></div></div>
    </div>

    <div class="mapa-caja" id="mapa-caja">
      <div id="mapa-lienzo"></div>
      <div class="mapa-fallback" id="mapa-fallback" hidden>
        <div class="mapa-fallback-caja">
          <b>El mapa vive de la red, los datos no.</b>
          <p class="apunte tenue" style="margin:6px 0 14px">Sin conexión con Mapbox (red, token o WebGL),
            la misma red se lee aquí abajo — cada punto con sus cifras de verdad.</p>
          <table class="tabla">
            <thead><tr><th>punto</th><th>tipo</th><th class="num">unidades</th><th>estado</th></tr></thead>
            <tbody>
              ${puntos.map(p => `<tr data-fb="${p.id}">
                <td><b>${p.tipo === 'almacen' ? '◆' : '●'} ${p.nombre}</b>
                  <span class="apunte tenue">${p.lugar}</span></td>
                <td class="apunte">${p.tipo === 'almacen' ? 'almacén propio' : 'cliente'}</td>
                <td class="num">${n(p.u)}${p.banda ? ' ± ' + n(p.banda) : ''}</td>
                <td><span class="marca-estado ${p.semaforo}">${p.rotuloSem}</span></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <p class="apunte tenue mt-16" style="max-width:860px;line-height:1.55">
      El borde de cada punto es su semáforo: en los almacenes, la <b>ocupación</b> (fase 27);
      en los clientes, la <b>confianza de la estimación</b> (fase 28) — un punto rojo no es «malo»,
      es «lo vemos borroso». El filtro por marca recalcula cada cifra desde el inventario real.
      Las fichas completas viven en <a href="#/inventarios">inventarios</a> y
      <a href="#/clientes">clientes</a>.
    </p>`;

  /* ── filtros ── */
  lienzo.querySelectorAll('[data-marca]').forEach(b => {
    b.onclick = () => { _mapa.marca = b.dataset.marca; window.PANTALLAS['mapa'](lienzo); };
  });
  lienzo.querySelector('#mapa-flujos').onclick = () => {
    _mapa.flujos = !_mapa.flujos; window.PANTALLAS['mapa'](lienzo);
  };

  /* ── el mapa ── */
  const caeAFallback = () => {
    const f = lienzo.querySelector('#mapa-fallback');
    if (f) f.hidden = false;
    const m = lienzo.querySelector('#mapa-lienzo');
    if (m) m.style.display = 'none';
  };

  if (_mapa.map) { try { _mapa.map.remove(); } catch (e) {} _mapa.map = null; }
  if (_mapa.obs) { _mapa.obs.disconnect(); _mapa.obs = null; }
  clearInterval(_mapa.tictac);

  if (typeof mapboxgl === 'undefined' || !MAPA_CONFIG.token) { caeAFallback(); return; }

  let map;
  try {
    mapboxgl.accessToken = MAPA_CONFIG.token;
    map = new mapboxgl.Map({
      container: lienzo.querySelector('#mapa-lienzo'),
      style: MAPA_CONFIG.estilo[ESTADO.tema] || MAPA_CONFIG.estilo.oscuro,
      center: [-79, 12], zoom: 3.6, attributionControl: true,
    });
  } catch (e) { caeAFallback(); return; }
  _mapa.map = map;

  /* si en 8 s no cargó el estilo (sin red), se declara y se cae a la lista */
  const vigia = setTimeout(() => { if (!map._cargado) caeAFallback(); }, 8000);
  map.on('load', () => { map._cargado = true; clearTimeout(vigia); });
  map.on('error', e => {
    /* un tile suelto que falla no tumba el mapa; un estilo que no llega, sí */
    if (!map._cargado && e && e.error && /style|token|Unauthorized|Forbidden/i.test(String(e.error.message))) {
      clearTimeout(vigia); caeAFallback();
    }
  });

  map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

  /* los puntos, como marcadores DOM: se estilan con nuestro CSS y se filtran */
  const zlc = puntos.find(p => p.id === 'ZLC');
  for (const p of puntos) {
    const u = uFiltrada(p, _mapa.marca);
    if (_mapa.marca !== 'ambas' && !u) continue;   // esa marca no está en este punto
    const el = document.createElement('div');
    el.className = `mk mk-${p.tipo} ${p.semaforo}`;
    el.dataset.mk = p.id;
    el.innerHTML = `<span class="mk-punto">${p.tipo === 'almacen' ? '◆' : '●'}</span>
      <span class="mk-rotulo">${p.id === 'ZLC' ? 'Colón (hub)' : p.lugar.split(' · ')[0]} ·
        <b class="mk-u">${n(u)}</b> u${p.tipo === 'cliente' && _mapa.marca === 'ambas' ? ' ±' : ''}</span>`;
    el.onclick = ev => {
      ev.stopPropagation();
      new mapboxgl.Popup({ maxWidth: '340px', className: 'mapa-pop', offset: 14 })
        .setLngLat([p.lon, p.lat])
        .setHTML(tarjetaPunto(p, n))
        .addTo(map);
      setTimeout(() => {
        const b = document.querySelector('.mapa-pop [data-ir-ficha]');
        if (b) b.onclick = () => {
          /* Aterrizar EN el punto, no en su módulo: llevar a la lista genérica
             obligaba a buscar a mano lo que se acababa de pulsar en el mapa.
             Cada módulo ya sabe abrir una tarjeta concreta —`_cli.abierto` y
             `_alm.abierto`—, así que basta con dejarla marcada antes de ir. */
          if (p.tipo === 'cliente') { _cli.abierto = p.id; location.hash = '#/clientes'; }
          else { _alm.abierto = p.id; location.hash = '#/inventarios'; }
        };
      }, 60);
    };
    new mapboxgl.Marker({ element: el, anchor: 'bottom' }).setLngLat([p.lon, p.lat]).addTo(map);
  }

  /* encuadre a los puntos de verdad, no a un centro a ojo */
  const bounds = new mapboxgl.LngLatBounds();
  for (const p of puntos) bounds.extend([p.lon, p.lat]);
  map.fitBounds(bounds, { padding: 70, animate: false });

  /* ── los flujos del reparto de anoche, con la corriente de la torre ────── */
  const pintaFlujos = () => {
    if (!_mapa.flujos || !map._cargado) return;
    const lineas = [];
    for (const p of puntos) {
      if (p.id === 'ZLC') continue;
      const r = rep.porFrente[p.id];
      if (!r || !r.recibe) continue;
      lineas.push({
        type: 'Feature',
        properties: { u: r.recibe, ancho: 1 + Math.min(5, r.recibe / 900) },
        geometry: { type: 'LineString', coordinates: arco(zlc, p) },
      });
    }
    if (map.getSource('flujos')) { map.removeLayer('flujos'); map.removeSource('flujos'); }
    map.addSource('flujos', { type: 'geojson', data: { type: 'FeatureCollection', features: lineas } });
    map.addLayer({
      id: 'flujos', type: 'line', source: 'flujos',
      paint: {
        'line-color': '#36F6BB', 'line-opacity': 0.55,
        'line-width': ['get', 'ancho'],
        'line-dasharray': [0, 2, 1],
      },
    });
    /* la corriente: el guion viaja por el arco — el mismo lenguaje de la torre */
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const FASES = [[0, 2, 1], [0.5, 2, 0.5], [1, 2, 0], [0, 0.5, 1, 1.5], [0, 1, 1, 1], [0, 1.5, 1, 0.5]];
      let f = 0;
      clearInterval(_mapa.tictac);
      _mapa.tictac = setInterval(() => {
        if (!_mapa.map || !map.getLayer('flujos')) { clearInterval(_mapa.tictac); return; }
        f = (f + 1) % FASES.length;
        map.setPaintProperty('flujos', 'line-dasharray', FASES[f]);
      }, 180);
    }
  };
  map.on('load', pintaFlujos);

  /* el estilo sigue al tema: si cambian el tema con el mapa abierto, cambia */
  _mapa.obs = new MutationObserver(() => {
    const estilo = MAPA_CONFIG.estilo[document.documentElement.getAttribute('data-tema')] || MAPA_CONFIG.estilo.oscuro;
    map._cargado = false;
    map.setStyle(estilo);
    map.once('style.load', () => { map._cargado = true; pintaFlujos(); });
  });
  _mapa.obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-tema'] });
};

/* la tarjeta del punto: las cifras clave y el camino a su ficha */
function tarjetaPunto(p, n) {
  const pron = CATALOGO.reduce((a, q) => a + (demandaSaneada(q.sku).porFrente[p.id] || 0), 0);
  const f = FRENTES.find(x => x.id === p.id);
  return `
    <div class="pop-cab">
      <b>${p.tipo === 'almacen' ? '◆' : '●'} ${p.nombre}</b>
      <span class="marca-estado ${p.semaforo}">${p.rotuloSem}</span>
    </div>
    <div class="apunte tenue" style="margin:4px 0 10px">${p.lugar}${p.dueno ? ' · dueño: ' + p.dueno : ''}</div>
    <div class="pop-cifras">
      <div><span class="r">${p.tipo === 'almacen' ? 'unidades medidas' : 'estimadas'}</span>
        <b class="pop-u">${n(p.u)}</b>${p.banda ? ' ± ' + n(p.banda) : ''} u</div>
      <div><span class="r">Casio</span><b>${n(p.marcas.Casio)}</b> u</div>
      <div><span class="r">Cubitt</span><b>${n(p.marcas.Cubitt)}</b> u</div>
      ${p.id !== 'ZLC' ? `<div><span class="r">pronóstico</span><b>${n(pron)}</b> u/mes</div>` : ''}
      ${f && p.tipo === 'cliente' ? `<div><span class="r">crédito disp.</span><b>${n(f.credito - f.saldo)}</b> USD</div>` : ''}
    </div>
    <button class="btn btn-suave btn-mini" data-ir-ficha style="margin-top:10px">
      ${p.tipo === 'cliente'
        ? `abrir la ficha de ${esc(p.nombre)} →`
        : `abrir el inventario de ${esc(p.nombre)} →`}</button>`;
}
