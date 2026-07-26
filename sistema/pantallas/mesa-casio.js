/* ============================================================================
   EL SISTEMA — Pantalla: la mesa de compra            · Fase 7 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   La pantalla estrella. Sustituye el archivo de Excel que hoy se rehace desde
   cero todos los meses. Una fila por referencia, en el orden en que piensa
   quien compra: qué tengo, qué viene, qué se vendió, cuánto me dura, y solo
   entonces cuánto pedir.

   Dos reglas de diseño que la gobiernan:
     · La columna del agente propone. La columna humana SIEMPRE gana.
     · Cuando difieren, el sistema pide el MOTIVO — de una lista corta. Sin el
       porqué no se aprende criterio: solo se cuenta una diferencia.
   ============================================================================ */

window.PANTALLAS = window.PANTALLAS || {};

const MOTIVOS = [
  'compromiso con un frente',
  'lanzamiento o campaña',
  'estacionalidad conocida',
  'restricción del proveedor',
  'decisión de cobertura',
  'otro',
];

/* estado de la mesa, vive mientras dure la sesión */
const _mesa = { filtro: 'todo', abierta: null, ajustes: {}, motivos: {}, busca: '' };

function _filaDatos(p) {
  const prop = propuestaCompra(p.sku);
  const tr = enCamino(p.sku);
  const serie = FRENTES.reduce((acc, f) => {
    ((VENTAS[p.sku] || {})[f.id] || []).forEach((v, i) => acc[i] = (acc[i] || 0) + v);
    return acc;
  }, new Array(12).fill(0));
  const q = (QUIEBRES[p.sku] || [])[0];
  const sust = (datosDe('C-03') || { casos: [] }).casos.find(c => c.sku === p.sku);
  const humana = _mesa.ajustes[p.sku] ?? prop.necesidad;
  return { p, prop, tr, serie, q, sust, humana, delta: humana - prop.necesidad };
}

window.PANTALLAS['compras/casio'] = function (lienzo) {
  const casio = CATALOGO.filter(p => p.marca === 'Casio');
  const filas = casio.map(_filaDatos);
  const techo = REGLAS.topeCompraMes.v;

  const pasa = f => {
    const b = _mesa.busca.toLowerCase().trim();
    if (b && !(f.p.nombre.toLowerCase().includes(b) || f.p.sku.toLowerCase().includes(b) ||
               f.p.ref.toLowerCase().includes(b))) return false;
    switch (_mesa.filtro) {
      case 'difiere':  return f.delta !== 0;
      case 'quiebre':  return f.prop.cobertura < f.prop.mesesTransito;
      case 'sobra':    return f.prop.cobertura > REGLAS.coberturaObjetivo.v * 1.6;
      case 'bloqueada':return !!f.sust;
      case 'saneada':  return f.prop.mesesExcluidos > 0;
      default:         return true;
    }
  };

  const visibles = filas.filter(pasa);
  const totU = filas.reduce((a, f) => a + f.humana, 0);
  const totUSD = filas.reduce((a, f) => a + f.humana * f.p.pvp * 0.42, 0);
  const nAjustes = Object.keys(_mesa.ajustes).length;

  lienzo.innerHTML = `
    <div class="lienzo-cab fila-sep">
      <div>
        <div class="sobretitulo">compras · ciclo de ${HOY.mes} ${HOY.anio}</div>
        <div class="titulo-seccion" style="margin-top:4px">mesa de compra · Casio</div>
      </div>
      <div class="fila gap-8">
        <button class="btn btn-fantasma btn-mini" id="volver">← panel</button>
        <input class="campo" id="mesa-busca" style="width:230px" placeholder="referencia o nombre…">
      </div>
    </div>

    <div class="cinta" style="margin-bottom:16px">
      <span class="orbe hecho"></span><span class="hora">${HOY.hora}</span>
      <div class="crece">armé esta mesa con <b>${casio.length} referencias</b>,
        calculé propuesta en <b>${filas.filter(f => f.prop.necesidad > 0).length}</b>,
        y aparté <b>${(datosDe('C-03') || { casos: [] }).casos.length} líneas</b> donde ibas a comprar
        algo que ya tienes parado en otro frente</div>
      ${nAjustes ? `<span class="marca-estado e-neutro"><i class="punto"></i>aprendí de ${nAjustes} ajustes tuyos</span>` : ''}
    </div>

    <div class="fila gap-8" style="flex-wrap:wrap;margin-bottom:14px" id="mesa-filtros">
      ${[['todo', 'todo', filas.length],
         ['difiere', 'difiere de tu cantidad', filas.filter(f => f.delta !== 0).length],
         ['quiebre', 'quiebre proyectado', filas.filter(f => f.prop.cobertura < f.prop.mesesTransito).length],
         ['sobra', 'sobrestock', filas.filter(f => f.prop.cobertura > REGLAS.coberturaObjetivo.v * 1.6).length],
         ['bloqueada', 'existe parado en otro frente', filas.filter(f => f.sust).length],
         ['saneada', 'serie saneada por quiebre', filas.filter(f => f.prop.mesesExcluidos > 0).length],
        ].map(([k, t, n]) => `<span class="chip ${_mesa.filtro === k ? 'on' : ''}" data-f="${k}">${t} <span class="n">${n}</span></span>`).join('')}
    </div>

    <div class="rejilla" style="grid-template-columns:minmax(0,1fr) ${_mesa.abierta ? '350px' : '0'};gap:18px;align-items:start">
      <div>
        <div class="tabla-envoltura ${_mesa.abierta ? 'mesa-estrecha' : ''}" style="max-height:62vh">
          <table class="tabla">
            <thead><tr>
              <th>producto</th><th>ref. fabricante</th>
              <th class="num">disponible</th><th class="num">en camino</th>
              <th>venta 12 m</th><th class="num">cobertura</th>
              <th class="num">propuesta</th><th class="num">tu cantidad</th>
              <th class="num">Δ</th><th>motivo</th>
            </tr></thead>
            <tbody id="mesa-filas"></tbody>
          </table>
        </div>

        <div class="barra-mesa">
          <div class="dato"><span class="r">unidades</span><span class="v" id="tot-u">${totU.toLocaleString('es-VE')}</span></div>
          <div class="dato"><span class="r">monto estimado</span><span class="v" id="tot-usd">${(totUSD / 1e6).toFixed(2)} M USD</span></div>
          <div class="dato" style="min-width:150px">
            <span class="r">techo del mes</span>
            <div class="barra ${totUSD > techo ? 'parcial' : ''}" style="margin-top:5px">
              <span id="barra-techo" style="width:${Math.min(100, totUSD / techo * 100).toFixed(0)}%"></span></div>
          </div>
          <div class="crece"></div>
          <span class="apunte tenue" id="aviso-techo">${totUSD > techo
            ? `excede el techo en ${Math.round(totUSD - techo).toLocaleString('es-VE')} USD`
            : `queda ${Math.round(techo - totUSD).toLocaleString('es-VE')} USD de margen`}</span>
          <button class="btn btn-humano" id="revisar" data-firma="compra">revisar antes de enviar →</button>
        </div>
      </div>

      <div id="mesa-detalle"></div>
    </div>`;

  const cuerpo = lienzo.querySelector('#mesa-filas');

  function pintaFilas() {
    cuerpo.innerHTML = visibles.map(f => {
      const cobColor = f.prop.cobertura < f.prop.mesesTransito ? 'var(--n3)'
                     : f.prop.cobertura > REGLAS.coberturaObjetivo.v * 1.6 ? 'var(--tinta-tenue)' : 'var(--tinta)';
      const uCamino = f.tr.u;
      const dcls = f.delta > 0 ? 'delta-pos' : f.delta < 0 ? 'delta-neg' : 'tenue';
      const motivoFalta = f.delta !== 0 && !_mesa.motivos[f.p.sku];
      return `<tr data-sku="${f.p.sku}" class="${_mesa.abierta === f.p.sku ? 'marcada' : ''}">
        <td>
          <div class="producto" style="cursor:pointer" data-abre="${f.p.sku}">
            <img class="foto" src="img/${f.p.img}" alt="" loading="lazy">
            <div class="txt"><div class="nom">${f.p.nombre}</div><div class="sub">${f.p.sku}</div></div>
            ${f.sust ? '<span class="marca-estado e-alerta" style="margin-left:4px"><i class="punto"></i></span>' : ''}
          </div>
        </td>
        <td class="col-sku">${f.p.ref}</td>
        <td class="num">${(STOCK_HUB[f.p.sku] || 0).toLocaleString('es-VE')}</td>
        <td class="num ${uCamino ? '' : 'tenue'}">${uCamino ? uCamino.toLocaleString('es-VE') : '—'}</td>
        <td>${chispa(f.serie, f.q ? f.q.desde : -1, 80, 22)}</td>
        <td class="num" style="color:${cobColor};font-weight:600">${f.prop.cobertura.toFixed(1)} m</td>
        <td class="num propuesta" data-abre="${f.p.sku}" style="cursor:pointer">
          <span class="valor">${f.prop.necesidad.toLocaleString('es-VE')} <span class="orbe orbe-mini"></span></span></td>
        <td class="num"><input class="entrada-humana" data-sku="${f.p.sku}" value="${f.humana.toLocaleString('es-VE')}"></td>
        <td class="num ${dcls}">${f.delta === 0 ? '—' : (f.delta > 0 ? '+' : '−') + Math.abs(f.delta).toLocaleString('es-VE')}</td>
        <td>${f.delta !== 0
          ? `<select class="motivo-fila ${motivoFalta ? 'pide' : ''}" data-motivo="${f.p.sku}">
               <option value="">${motivoFalta ? '⚠ indica el motivo' : '—'}</option>
               ${MOTIVOS.map(m => `<option ${_mesa.motivos[f.p.sku] === m ? 'selected' : ''}>${m}</option>`).join('')}
             </select>`
          : '<span class="tenue">—</span>'}</td>
      </tr>`;
    }).join('') || `<tr><td colspan="10"><div class="vacio"><div class="icono">◇</div>ninguna referencia con ese criterio</div></td></tr>`;

    cuerpo.querySelectorAll('[data-abre]').forEach(el => el.onclick = () => {
      _mesa.abierta = _mesa.abierta === el.dataset.abre ? null : el.dataset.abre;
      window.PANTALLAS['compras/casio'](lienzo);
    });
    cuerpo.querySelectorAll('.entrada-humana').forEach(inp => {
      inp.onchange = () => {
        const sku = inp.dataset.sku;
        const v = parseInt(String(inp.value).replace(/\D/g, ''), 10) || 0;
        _mesa.ajustes[sku] = v;
        window.PANTALLAS['compras/casio'](lienzo);
      };
    });
    cuerpo.querySelectorAll('[data-motivo]').forEach(sel => sel.onchange = () => {
      _mesa.motivos[sel.dataset.motivo] = sel.value;
      window.PANTALLAS['compras/casio'](lienzo);
    });
  }

  /* --- el panel del porqué: lo que hoy solo está en la cabeza de una persona --- */
  function pintaDetalle() {
    const caja = lienzo.querySelector('#mesa-detalle');
    if (!_mesa.abierta) { caja.innerHTML = ''; return; }
    const f = filas.find(x => x.p.sku === _mesa.abierta);
    if (!f) { caja.innerHTML = ''; return; }

    caja.innerHTML = `<div class="explica">
      <div class="fila-sep"><div class="sobretitulo">por qué propongo esto</div>
        <button class="btn btn-fantasma btn-mini" id="cerrar-det">✕</button></div>

      <div class="fila gap-12 mt-16">
        <img src="img/${f.p.img}" alt="" style="width:56px;height:56px;border-radius:14px;object-fit:cover;
             background:var(--panel-alto);border:1px solid var(--borde)">
        <div><h4>${f.p.nombre}</h4>
          <div class="mono tenue" style="margin-top:3px">${f.p.sku} · ${f.p.ref}</div></div>
      </div>

      <div class="fila gap-8 mt-16">
        <span class="cifra-media texto-marca">${f.prop.necesidad.toLocaleString('es-VE')}</span>
        <span class="apunte tenue">unidades propuestas</span>
      </div>

      <ul class="razones">
        ${f.prop.razones.map((r, i) => `<li class="${i === 3 ? 'aviso' : i === 1 ? 'clave' : ''}">${r}</li>`).join('')}
        ${f.tr.u ? `<li class="clave">Ya vienen <b>${f.tr.u.toLocaleString('es-VE')} u</b> en
          ${f.tr.embarques.map(e => `<b>${e.id}</b> (${e.modo}, llega ${e.eta})`).join(' y ')}.
          <b>Descontadas de la propuesta</b>: volver a comprarlas es el error que más caro sale.</li>` : ''}
      </ul>

      ${f.sust ? `
      <div class="bloqueo mt-16">
        <div class="fila gap-8"><span class="orbe orbe-mini"></span>
          <b style="font-size:12.5px">ibas a comprar lo que ya tienes</b></div>
        <div class="apunte mt-8">Hay <b>${f.sust.hay} unidades</b> de esta referencia sin rotación
          en <b>${f.sust.frente}</b>. Preparé el traslado de <b>${f.sust.traslada} u</b> que sustituye
          la compra y evita <b>${f.sust.evita.toLocaleString('es-VE')} USD</b>.</div>
        <div class="apunte tenue mt-8">reserva ${f.sust.reserva} tomada sobre esas unidades concretas</div>
        <div class="fila gap-8 mt-16">
          <button class="btn btn-marca btn-mini" id="aplicar-traslado" data-firma="traslado">aplicar el traslado</button>
          <button class="btn btn-fantasma btn-mini">comprar igual</button>
        </div>
      </div>` : ''}

      ${f.prop.mesesExcluidos ? `
      <div class="apunte tenue mt-16" style="font-size:11.5px;line-height:1.5">
        Si no hubiera excluido esos ${f.prop.mesesExcluidos} meses en cero, la venta media habría
        salido más baja y la propuesta habría sido <b>menor de la que necesitas</b>. Es el error
        que más caro sale: confundir «no se vendió» con «no había».
      </div>` : ''}

      <div class="fila gap-8 mt-24">
        <button class="btn btn-marca btn-mini" id="aceptar" data-firma="compra">aceptar</button>
        <button class="btn btn-suave btn-mini" id="ajustar">ajustar</button>
      </div>
    </div>`;

    const c = caja.querySelector('#cerrar-det');
    if (c) c.onclick = () => { _mesa.abierta = null; window.PANTALLAS['compras/casio'](lienzo); };
    const ac = caja.querySelector('#aceptar');
    if (ac) ac.onclick = () => { delete _mesa.ajustes[f.p.sku]; delete _mesa.motivos[f.p.sku]; _mesa.abierta = null; window.PANTALLAS['compras/casio'](lienzo); };
    const aj = caja.querySelector('#ajustar');
    if (aj) aj.onclick = () => { const i = cuerpo.querySelector(`.entrada-humana[data-sku="${f.p.sku}"]`); if (i) { i.focus(); i.select(); } };
    const at = caja.querySelector('#aplicar-traslado');
    if (at) at.onclick = () => {
      _mesa.ajustes[f.p.sku] = Math.max(0, f.prop.necesidad - f.sust.traslada);
      _mesa.motivos[f.p.sku] = 'decisión de cobertura';
      viajaEstela(['compras', 'distribucion', 'logistica']);
      window.PANTALLAS['compras/casio'](lienzo);
    };
  }

  lienzo.querySelectorAll('#mesa-filtros .chip').forEach(c => c.onclick = () => {
    _mesa.filtro = c.dataset.f; window.PANTALLAS['compras/casio'](lienzo);
  });
  const bus = lienzo.querySelector('#mesa-busca');
  bus.value = _mesa.busca;
  bus.oninput = () => { _mesa.busca = bus.value; window.PANTALLAS['compras/casio'](lienzo); };
  lienzo.querySelector('#volver').onclick = () => { location.hash = '#/compras'; };
  lienzo.querySelector('#revisar').onclick = () => {
    const faltan = Object.keys(_mesa.ajustes).filter(s => _mesa.ajustes[s] !== filas.find(f => f.p.sku === s).prop.necesidad && !_mesa.motivos[s]);
    if (faltan.length) {
      _mesa.filtro = 'difiere';
      window.PANTALLAS['compras/casio'](lienzo);
      alert(`Faltan ${faltan.length} motivos por indicar.\n\nSin el porqué del ajuste no se aprende criterio: solo se cuenta una diferencia.`);
    } else {
      location.hash = '#/compras/cierre';
    }
  };

  pintaFilas();
  pintaDetalle();
};
