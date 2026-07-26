/* ============================================================================
   EL SISTEMA — Pantalla: cimiento (catálogo canónico)   · Fase 4 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   El catálogo es la raíz de todo el modelo: un producto no puede nacer seis
   veces. Cada referencia tiene su identificador canónico y su lista de alias
   —cómo la nombra cada frente, cada canal y el fabricante—, que es lo que
   permite que la venta de doce frentes se sume sobre el mismo producto.
   ============================================================================ */

window.PANTALLAS = window.PANTALLAS || {};

/* ------------------------------------------------------------------ ÚTILES */

const _n = v => (v ?? 0).toLocaleString('es-VE');
const _usd = v => '$' + (v ?? 0).toLocaleString('es-VE', { minimumFractionDigits: v % 1 ? 2 : 0, maximumFractionDigits: 2 });

/** Venta total de una referencia en los 12 meses, sumando todos los frentes. */
function serieTotal(sku) {
  const porFrente = VENTAS[sku] || {};
  const t = new Array(12).fill(0);
  for (const f in porFrente) porFrente[f].forEach((v, i) => t[i] += v);
  return t;
}

/** Sparkline en SVG. Los meses con quiebre se marcan aparte: la venta cero
    por falta de existencia no es lo mismo que la falta de demanda. */
function chispa(serie, quiebreDesde = -1, w = 96, h = 26) {
  const max = Math.max(...serie, 1);
  const paso = w / (serie.length - 1);
  const pts = serie.map((v, i) => `${(i * paso).toFixed(1)},${(h - (v / max) * (h - 4) - 2).toFixed(1)}`);
  const area = `M0,${h} L${pts.join(' L')} L${w},${h} Z`;
  const marcas = serie.map((v, i) => v === 0 && i >= quiebreDesde && quiebreDesde >= 0
    ? `<circle cx="${(i * paso).toFixed(1)}" cy="${h - 2}" r="2.4" fill="var(--riesgo)"/>` : '').join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true" style="display:block">
    <path d="${area}" fill="rgba(54,246,187,.10)"/>
    <polyline points="${pts.join(' ')}" fill="none" stroke="var(--menta)" stroke-width="1.6"
      stroke-linejoin="round" stroke-linecap="round"/>${marcas}</svg>`;
}

/* ------------------------------------------------------------------ ESTADO */

const _cim = { marca: 'todo', familia: 'todo', busca: '', abierto: null };

/* No toda regla es un número: la cuota por razón social es un reparto entre
   dos entidades. Formatearla como número daba «[object Object]» en la tabla
   —una regla ilegible es una regla que nadie puede discutir—. */
function _valorRegla(v) {
  if (typeof v === 'number') return v.toLocaleString('es-VE');
  if (v && typeof v === 'object') {
    return Object.entries(v)
      .map(([k, x]) => `${k} ${(x * 100).toFixed(0)} %`).join(' · ');
  }
  return String(v);
}

/* ----------------------------------------------------------------- PINTADO */

window.PANTALLAS.cimiento = function (lienzo) {
  const familias = [...new Set(CATALOGO.map(p => p.familia))];
  const alias = CATALOGO.reduce((a, p) => a + p.alias.length, 0);
  const _juego = monedasEnJuego();
  const _monedasUsadas = _juego.monedas;
  const _tasasVencidas = _juego.vencidas;

  lienzo.innerHTML = `
    <div class="lienzo-cab fila-sep">
      <div>
        <div class="sobretitulo">sistema</div>
        <div class="titulo-seccion" style="margin-top:4px">cimiento</div>
      </div>
      <input class="campo" id="cim-busca" style="width:280px" placeholder="referencia, nombre o alias…">
    </div>

    <div class="rejilla rejilla-4" style="margin-bottom:20px">
      <div class="tarjeta"><div class="kpi"><div class="rotulo">referencias canónicas</div>
        <div class="valor">${_n(CATALOGO.length)}</div>
        <div class="pie">${CATALOGO.filter(p => p.marca === 'Casio').length} Casio · ${CATALOGO.filter(p => p.marca === 'Cubitt').length} Cubitt</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">alias resueltos</div>
        <div class="valor">${_n(alias)}</div><div class="pie">nombres distintos para los mismos productos</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">frentes que reportan</div>
        <div class="valor">${FRENTES.length}</div>
        <div class="pie">${FRENTES.filter(f => f.via === 'odoo').length} por Odoo · ${FRENTES.filter(f => f.via === 'portal').length} por portal</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">en cola de excepciones</div>
        <div class="valor texto-marca">0</div><div class="pie">el turno de anoche las resolvió</div></div></div>
    </div>

    <div class="fila gap-8" style="flex-wrap:wrap;margin-bottom:16px" id="cim-filtros">
      <span class="chip ${_cim.marca === 'todo' ? 'on' : ''}" data-t="marca" data-v="todo">todo <span class="n">${CATALOGO.length}</span></span>
      <span class="chip ${_cim.marca === 'Casio' ? 'on' : ''}" data-t="marca" data-v="Casio">Casio <span class="n">${CATALOGO.filter(p => p.marca === 'Casio').length}</span></span>
      <span class="chip ${_cim.marca === 'Cubitt' ? 'on' : ''}" data-t="marca" data-v="Cubitt">Cubitt <span class="n">${CATALOGO.filter(p => p.marca === 'Cubitt').length}</span></span>
      <span style="width:10px"></span>
      ${familias.map(f => `<span class="chip ${_cim.familia === f ? 'on' : ''}" data-t="familia" data-v="${f}">${f}
        <span class="n">${CATALOGO.filter(p => p.familia === f).length}</span></span>`).join('')}
    </div>

    <div class="rejilla" style="grid-template-columns:minmax(0,1fr) ${_cim.abierto ? '380px' : '0'};align-items:start;gap:20px">
      <div class="tabla-envoltura" style="max-height:none">
        <table class="tabla">
          <thead><tr>
            <th>producto</th><th>ref. fabricante</th><th>línea</th>
            <th class="num">PVP</th><th class="num">existencia hub</th>
            <th>venta 12 m</th><th class="num">alias</th>
          </tr></thead>
          <tbody id="cim-filas"></tbody>
        </table>
      </div>
      <div id="cim-detalle"></div>
    </div>

    <p class="apunte tenue mt-16" style="max-width:760px;line-height:1.55">
      Referencias, nombres, líneas, precios de venta al público e imágenes provienen del catálogo
      <b>público</b> de las tiendas del grupo. <b>El identificador interno de la marca representada
      no coincide con la referencia del fabricante</b> —y esa diferencia es deliberada: es
      exactamente el problema que el catálogo canónico y su lista de alias resuelven. En la marca
      propia, ambos coinciden. Los puntos rojos en la serie marcan <b>quiebre</b>: venta cero por
      falta de existencia, no por falta de demanda.
    </p>

    <!-- las otras dos cosas canónicas: las reglas y las tasas -->
    <div class="rejilla mt-24" style="grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:20px;align-items:start">

      <div class="panel">
        <div class="fila-sep">
          <div class="sobretitulo">las reglas del negocio · ${Object.keys(REGLAS).length}</div>
          <span class="apunte tenue">cada una con dueño y versión</span>
        </div>
        <div class="apunte mt-8">
          Ninguna cifra del sistema sale de un algoritmo opaco: sale de una regla que <b>alguien
          firma</b> y que se puede cambiar sin tocar el programa. Por eso llevan dueño, fecha y
          número de versión — <b>esto no lo decide la máquina, lo decide una política</b>.
        </div>
        <div class="tabla-envoltura mt-16">
          <table class="tabla">
            <thead><tr><th>regla</th><th class="num">valor</th><th>dueño</th><th class="num">desde</th><th class="num">v</th></tr></thead>
            <tbody>
              ${Object.entries(REGLAS).map(([k, r]) => `
                <tr>
                  <td><b>${k}</b></td>
                  <td class="num">${_valorRegla(r.v)} <span class="tenue">${r.unidad}</span></td>
                  <td class="apunte tenue">${r.dueno}</td>
                  <td class="num apunte tenue">${r.desde}</td>
                  <td class="num">${r.ver}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="panel">
        <div class="fila-sep">
          <div class="sobretitulo">monedas y tasas</div>
          ${_tasasVencidas.length
            ? `<span class="marca-estado e-alerta"><i class="punto"></i>${_tasasVencidas.length} vencida${_tasasVencidas.length > 1 ? 's' : ''}</span>`
            : '<span class="marca-estado e-ok"><i class="punto"></i>al día</span>'}
        </div>
        <div class="apunte mt-8">
          <b>No existe cifra sin moneda y sin tasa fechada.</b> Una tasa sin fecha no es un dato,
          es una opinión. Pasados <b>${REGLAS.antiguedadMaximaTasa.v} días</b> —lo fija
          ${REGLAS.antiguedadMaximaTasa.dueno}— la cifra no se bloquea: se marca. En la operación
          se sigue trabajando con la tasa que hay mientras llega la nueva; lo que no puede pasar
          es no saber cuál se usó.
        </div>
        <div class="tabla-envoltura mt-16">
          <table class="tabla">
            <thead><tr><th>moneda</th><th class="num">por 1 USD</th><th class="num">del</th><th class="num">edad</th><th>fuente</th></tr></thead>
            <tbody>
              ${Object.keys(TASAS).map(m => {
                const t = tasaDe(m), usada = _monedasUsadas.includes(m);
                return `
                <tr class="${t.vencida ? 'fila-aviso' : ''}" style="${usada ? '' : 'opacity:.5'}">
                  <td><b>${m}</b> <span class="tenue">${MONEDAS[m].nombre}</span></td>
                  <td class="num">${m === 'USD' ? '—' : t.tasa.toLocaleString('es-VE')}</td>
                  <td class="num apunte tenue">${t.desde}</td>
                  <td class="num ${t.vencida ? 'texto-alerta' : ''}">${t.edad} d</td>
                  <td class="apunte tenue">${t.fuente}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
        ${_tasasVencidas.length ? `
          <div class="bloqueo mt-16">
            <b>${_tasasVencidas.map(t => t.moneda).join(', ')}</b> supera${_tasasVencidas.length > 1 ? 'n' : ''}
            los ${REGLAS.antiguedadMaximaTasa.v} días. Toda cifra convertida con
            ${_tasasVencidas.length > 1 ? 'esas tasas' : 'esa tasa'} aparece marcada en el resto del
            sistema, y sigue viéndose: ocultarla dejaría a quien decide sin el número y sin el aviso.
          </div>` : ''}
        <div class="apunte tenue mt-16" style="font-size:11.5px">
          Las monedas atenuadas no están en juego en la red actual. Panamá, Ecuador y El Salvador
          no aparecen porque su moneda de curso es el dólar: no hay conversión que hacer.
        </div>
      </div>
    </div>`;

  const filas = lienzo.querySelector('#cim-filas');

  function visibles() {
    const b = _cim.busca.toLowerCase().trim();
    return CATALOGO.filter(p =>
      (_cim.marca === 'todo' || p.marca === _cim.marca) &&
      (_cim.familia === 'todo' || p.familia === _cim.familia) &&
      (!b || p.nombre.toLowerCase().includes(b) || p.sku.toLowerCase().includes(b) ||
        p.ref.toLowerCase().includes(b) || p.alias.some(a => a.toLowerCase().includes(b))));
  }

  function pintaFilas() {
    const lista = visibles();
    filas.innerHTML = lista.map(p => {
      const s = serieTotal(p.sku);
      const q = (QUIEBRES[p.sku] || [])[0];
      return `<tr data-sku="${p.sku}" class="${_cim.abierto === p.sku ? 'marcada' : ''}" style="cursor:pointer">
        <td><div class="producto">
          <img class="foto" src="img/${p.img}" alt="" loading="lazy"
               onerror="this.outerHTML='&lt;div class=\\'marcador\\' style=\\'background:${p.hex}\\'&gt;${p.nombre.slice(0, 2).toUpperCase()}&lt;/div&gt;'">
          <div class="txt"><div class="nom">${p.nombre}</div><div class="sub">${p.sku}</div></div></div></td>
        <td class="col-sku">${p.marca === 'Cubitt' ? '<span class="tenue">= interno</span>' : p.ref}</td>
        <td><span class="marca-estado e-neutro">${p.linea}</span></td>
        <td class="num">${_usd(p.pvp)}</td>
        <td class="num">${_n(STOCK_HUB[p.sku])}</td>
        <td>${chispa(s, q ? q.desde : -1)}</td>
        <td class="num">${p.alias.length}</td>
      </tr>`;
    }).join('') || `<tr><td colspan="7"><div class="vacio"><div class="icono">◇</div>nada coincide con la búsqueda</div></td></tr>`;

    filas.querySelectorAll('tr[data-sku]').forEach(tr => tr.onclick = () => {
      _cim.abierto = _cim.abierto === tr.dataset.sku ? null : tr.dataset.sku;
      window.PANTALLAS.cimiento(lienzo);
    });
  }

  function pintaDetalle() {
    const caja = lienzo.querySelector('#cim-detalle');
    if (!_cim.abierto) { caja.innerHTML = ''; return; }
    const p = CATALOGO.find(x => x.sku === _cim.abierto);
    if (!p) { caja.innerHTML = ''; return; }
    const s = serieTotal(p.sku);
    const total = s.reduce((a, b) => a + b, 0);
    const ult3 = s.slice(-3).reduce((a, b) => a + b, 0) / 3;
    const cob = ult3 ? (STOCK_HUB[p.sku] / ult3) : 0;
    const q = QUIEBRES[p.sku] || [];
    const fab = p.fabrica ? FABRICAS.find(f => f.id === p.fabrica) : null;

    caja.innerHTML = `<div class="explica">
      <div class="fila-sep"><div class="sobretitulo">ficha canónica</div>
        <button class="btn btn-fantasma btn-mini" id="cim-cerrar">✕</button></div>
      <div class="fila gap-12 mt-16">
        <img src="img/${p.img}" alt="" style="width:64px;height:64px;border-radius:16px;object-fit:cover;
             background:var(--panel-alto);border:1px solid var(--borde)">
        <div><h4>${p.nombre}</h4>
          <div class="mono tenue" style="margin-top:3px">${p.sku}</div>
          <div class="fila gap-8 mt-8"><span class="marca-estado e-neutro">${p.marca}</span>
            <span class="marca-estado e-ok"><i class="punto"></i>${p.estado}</span></div></div>
      </div>
      <ul class="razones">
        <li><b>Referencia del fabricante:</b> ${p.marca === 'Cubitt' ? 'coincide con la interna (marca propia)' : p.ref}</li>
        <li><b>Familia y línea:</b> ${p.familia} · ${p.linea}</li>
        <li><b>Precio de venta al público:</b> ${_usd(p.pvp)}</li>
        ${fab ? `<li><b>Fábrica:</b> ${fab.nombre}<br>pedido mínimo <b>${_n(fab.moq)} u</b> · ${fab.leadDias} días · pago ${fab.pago}</li>`
              : `<li><b>Ciclo del proveedor:</b> mensual · tránsito 45–60 días</li>`}
        <li class="clave"><b>Existencia en la central:</b> ${_n(STOCK_HUB[p.sku])} u ·
          cobertura <b>${cob.toFixed(1)} meses</b> sobre la venta de los últimos tres</li>
        <li><b>Venta 12 meses:</b> ${_n(total)} u en ${FRENTES.length} frentes</li>
        ${q.length ? `<li class="aviso"><b>Quiebre detectado:</b> ${q.map(x => {
            const f = FRENTES.find(y => y.id === x.frente);
            return `${f ? f.nombre : x.frente}, desde ${MESES[x.desde]}`; }).join(' · ')}.
          Esos meses en cero <b>no se promedian</b> como demanda.</li>` : ''}
      </ul>
      <hr class="sep">
      <div class="sobretitulo">cómo lo nombra cada quien</div>
      <div class="fila gap-8 mt-8" style="flex-wrap:wrap">
        ${p.alias.map(a => `<span class="chip" style="cursor:default">${a}</span>`).join('')}
      </div>
      <hr class="sep">
      <div class="sobretitulo">venta por frente · 12 meses</div>
      <div class="pila gap-8 mt-8">
        ${FRENTES.map(f => {
          const serie = (VENTAS[p.sku] || {})[f.id] || [];
          const t = serie.reduce((a, b) => a + b, 0);
          return `<div class="fila gap-8" style="font-size:12px">
            <span style="width:118px;flex:none;color:var(--tinta-media)">${f.nombre}</span>
            <span class="via ${f.via === 'odoo' ? 'via-odoo' : 'via-portal'}">${f.via}</span>
            <span class="crece"></span>
            <b style="font-variant-numeric:tabular-nums">${_n(t)}</b></div>`;
        }).join('')}
      </div>
    </div>`;
    const x = caja.querySelector('#cim-cerrar');
    if (x) x.onclick = () => { _cim.abierto = null; window.PANTALLAS.cimiento(lienzo); };
  }

  lienzo.querySelectorAll('#cim-filtros .chip').forEach(c => c.onclick = () => {
    _cim[c.dataset.t] = _cim[c.dataset.t] === c.dataset.v ? 'todo' : c.dataset.v;
    if (c.dataset.t === 'marca' && c.dataset.v === 'todo') _cim.familia = 'todo';
    window.PANTALLAS.cimiento(lienzo);
  });

  const busca = lienzo.querySelector('#cim-busca');
  busca.value = _cim.busca;
  busca.oninput = () => { _cim.busca = busca.value; pintaFilas(); };

  pintaFilas();
  pintaDetalle();
};
