/* ============================================================================
   EL SISTEMA — Pantalla: fábricas y proveedores        · añadido a la fase 10
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   El MOQ, el lead time y el esquema de pago condicionan TODA la compra de la
   marca propia, y hasta ahora solo existían dentro de la mesa. Aquí tienen su
   sitio, junto a lo único que permite negociarlos: cómo se ha comportado cada
   fábrica.

   Cada ficha reúne lo que hoy está en cuatro cabezas distintas: qué produce,
   qué se le está comprando ahora, qué candidatos dependen de ella, qué viene
   en camino y si cumple lo que promete.
   ============================================================================ */

window.PANTALLAS = window.PANTALLAS || {};

const _fab = { abierta: null };

function _pct(v) { return (v * 100).toFixed(0) + ' %'; }

window.PANTALLAS.fabricas = function (lienzo) {
  const n = v => Math.round(v || 0).toLocaleString('es-VE');

  const fichas = FABRICAS.map(f => {
    const d = DESEMPENO[f.id] || {};
    const refs = CATALOGO.filter(p => p.fabrica === f.id);
    const cands = CANDIDATOS.filter(c => c.fabrica === f.id && !['descartado'].includes(c.etapa));
    const pedido = completarMOQ(f.id);
    const emb = TRANSITOS.filter(t => t.prov === f.nombre);
    const usd = pedido.skus.reduce((x, p) =>
      x + costoDe(p, (pedido.base[p.sku] || 0) + (pedido.anadido[p.sku] || 0)), 0);
    return { f, d, refs, cands, pedido, emb, usd };
  });

  /* El proveedor representado va aparte: no tiene pedido mínimo sino ciclo. */
  const casio = DESEMPENO['PRV-CASIO'];
  const refsCasio = CATALOGO.filter(p => p.marca === 'Casio');
  const asigMedia = casio.asignacion12m.reduce((a, b) => a + b, 0) / casio.asignacion12m.length;

  const enRiesgo = fichas.filter(x => (x.d.cumplePlazo ?? 1) < 0.7);
  const totalUSD = fichas.reduce((a, x) => a + (x.pedido.hayNecesidad ? x.usd : 0), 0);

  lienzo.innerHTML = `
    <div class="lienzo-cab fila-sep">
      <div>
        <div class="sobretitulo">operación</div>
        <div class="titulo-seccion" style="margin-top:4px">fábricas y proveedores</div>
      </div>
      <button class="btn btn-suave btn-mini" id="ir-cubitt">ir a la mesa de compra →</button>
    </div>

    <div class="cinta" style="margin-bottom:20px">
      <span class="orbe hecho"></span><span class="hora">${HOY.hora}</span>
      <div class="crece">crucé el pedido del mes con el historial de cada fábrica:
        <b>${fichas.filter(x => x.pedido.hayNecesidad).length}</b> con pedido abierto,
        <b>${n(totalUSD)} USD</b> comprometidos, y
        <b>${enRiesgo.length}</b> ${enRiesgo.length === 1 ? 'fábrica cumple' : 'fábricas cumplen'} el plazo
        menos del 70 % de las veces</div>
    </div>

    <div class="rejilla rejilla-4" style="margin-bottom:22px">
      <div class="tarjeta"><div class="kpi"><div class="rotulo">fábricas activas</div>
        <div class="valor">${FABRICAS.length}</div><div class="pie">marca propia</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">con pedido este ciclo</div>
        <div class="valor">${fichas.filter(x => x.pedido.hayNecesidad).length}</div>
        <div class="pie">${n(totalUSD)} USD comprometidos</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">cumplen mal el plazo</div>
        <div class="valor" style="color:${enRiesgo.length ? 'var(--n3)' : 'inherit'}">${enRiesgo.length}</div>
        <div class="pie">por debajo del 70 % de cumplimiento</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">candidatos en curso</div>
        <div class="valor">${CANDIDATOS.filter(c => !['graduado', 'descartado'].includes(c.etapa)).length}</div>
        <div class="pie">repartidos entre las fábricas</div></div></div>
    </div>

    <!-- el proveedor representado -->
    <div class="panel" style="margin-bottom:20px">
      <div class="fila-sep">
        <div>
          <div class="fila gap-8"><b style="font-size:14.5px">${PROVEEDOR_CASIO.nombre}</b>
            <span class="marca-estado e-neutro">proveedor representado</span>
            <span class="apunte tenue">desde ${casio.desde}</span></div>
          <div class="apunte tenue mt-8">${refsCasio.length} referencias ·
            ciclo ${PROVEEDOR_CASIO.ciclo} · tránsito ${PROVEEDOR_CASIO.transitoDias.join('–')} días ·
            <b>sin pedido mínimo</b></div>
        </div>
        <div class="fila gap-24" style="text-align:right">
          <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">cumple plazo</div>
            <div class="cifra-media">${_pct(casio.cumplePlazo)}</div></div>
          <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">asigna de lo pedido</div>
            <div class="cifra-media" style="color:var(--n3)">${_pct(asigMedia)}</div></div>
        </div>
      </div>
      <div class="apunte mt-16" style="max-width:820px">
        Aquí lo que condiciona la compra <b>no es el plazo, que lo cumple</b>: es qué proporción de
        lo pedido termina asignando. La media de los últimos doce ciclos es <b>${_pct(asigMedia)}</b>,
        y esa cifra es la que hace que la cantidad pedida y la cantidad necesaria no puedan ser la
        misma. Es el dato que hoy vive en la memoria de una persona.
      </div>
      <div class="fila gap-4 mt-16" style="align-items:flex-end;height:44px">
        ${casio.asignacion12m.map((v, i) => `<div title="${MESES[i]}: ${_pct(v)}"
          style="flex:1;height:${Math.max(12, (v - 0.16) / (0.34 - 0.16) * 100).toFixed(0)}%;border-radius:4px 4px 0 0;
                 background:${v < asigMedia ? 'var(--n3)' : 'var(--menta)'};opacity:.85"></div>`).join('')}
      </div>
      <div class="fila-sep mt-8" style="font-size:10.5px">
        <span class="tenue">${MESES[0]}</span>
        <span class="tenue">asignación por ciclo · media ${_pct(asigMedia)}</span>
        <span class="tenue">${MESES[11]}</span>
      </div>
    </div>

    <div class="sobretitulo" style="margin-bottom:12px">fábricas de la marca propia</div>
    <div class="pila gap-12" id="lista-fab"></div>

    <p class="apunte tenue mt-24" style="max-width:820px;line-height:1.55">
      El pedido mínimo y el plazo de cada fábrica no son un dato administrativo: son <b>lo que
      decide si un producto nuevo entra o no</b>, y lo que obliga a comprar de más cuando la
      necesidad no llega al mínimo. Tenerlos aquí, con el historial al lado, es lo que convierte
      una queja recurrente en una negociación con argumentos.
    </p>`;

  const caja = lienzo.querySelector('#lista-fab');

  function pinta() {
    caja.innerHTML = fichas.map(x => {
      const abierta = _fab.abierta === x.f.id;
      const malPlazo = (x.d.cumplePlazo ?? 1) < 0.7;
      return `<div class="panel" data-f="${x.f.id}">
        <div class="fila-sep" style="cursor:pointer" data-t="${x.f.id}">
          <div>
            <div class="fila gap-8">
              <b style="font-size:14px">${x.f.nombre}</b>
              ${x.f.aereo ? '<span class="marca-estado e-neutro">apto aéreo</span>' : ''}
              ${malPlazo ? '<span class="marca-estado e-alerta"><i class="punto"></i>cumple mal el plazo</span>' : ''}
              ${x.pedido.hayNecesidad ? '<span class="marca-estado e-ok"><i class="punto"></i>pedido abierto</span>' : ''}
            </div>
            <div class="apunte tenue mt-8">${x.f.familias.join(' · ')} ·
              ${x.refs.length} referencias · ${x.cands.length} candidatos ·
              relación desde ${x.d.desde ?? '—'}</div>
          </div>
          <div class="fila gap-24" style="text-align:right">
            <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">mínimo · u</div>
              <div class="cifra-media">${n(x.f.moq)}</div></div>
            <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">plazo</div>
              <div class="cifra-media">${x.f.leadDias} d</div></div>
            <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">cumple</div>
              <div class="cifra-media" style="color:${malPlazo ? 'var(--n3)' : 'var(--ok)'}">${_pct(x.d.cumplePlazo ?? 0)}</div></div>
            <span class="apunte tenue" style="align-self:center">${abierta ? '▾' : '▸'}</span>
          </div>
        </div>

        ${abierta ? `
        <hr class="sep">
        <div class="rejilla" style="grid-template-columns:1fr 1fr;gap:22px">

          <div>
            <div class="sobretitulo">cómo se comporta</div>
            <ul class="razones" style="margin-top:12px">
              <li><b>${x.d.ordenes12m ?? 0} órdenes</b> en los últimos doce meses.</li>
              <li class="${malPlazo ? 'aviso' : 'clave'}">Cumple el plazo el <b>${_pct(x.d.cumplePlazo ?? 0)}</b>
                de las veces, con una desviación media de <b>${x.d.diasDesvio ?? 0} días</b>
                sobre los ${x.f.leadDias} prometidos.</li>
              <li>${x.d.incidencias ?? 0} incidencia${(x.d.incidencias ?? 0) === 1 ? '' : 's'} de calidad ·
                nota <b>${(x.d.notaCalidad ?? 0).toFixed(1)}</b> sobre 5.</li>
              <li>Pago <b>${x.f.pago}</b>: el ${x.f.pago.split(' / ')[0]} % al colocar y el resto
                cuando la producción está lista.</li>
              ${x.d.nota ? `<li class="clave">${x.d.nota}</li>` : ''}
            </ul>

            ${x.emb.length ? `
            <div class="sobretitulo mt-24">en camino</div>
            ${x.emb.map(e => `<div class="fila-sep mt-8" style="font-size:12px">
              <span class="mono tenue">${e.id}</span>
              <span>${e.modo} · ${n(e.cajas)} cajas</span>
              <span class="marca-estado ${e.docs.facturaNaviera ? 'e-ok' : 'e-riesgo'}"><i class="punto"></i>${e.etapa}</span>
            </div>`).join('')}` : ''}
          </div>

          <div>
            <div class="sobretitulo">qué se le está comprando</div>
            ${x.pedido.hayNecesidad ? `
              <div class="fila-sep mt-12">
                <span class="cifra-media">${n(x.pedido.total)} <span class="tenue" style="font-size:12px;font-weight:400">u</span></span>
                <span class="apunte">${n(x.usd)} USD</span>
              </div>
              <div class="barra ${x.pedido.completado ? 'parcial' : ''} mt-8">
                <span style="width:${Math.min(100, x.pedido.total / x.f.moq * 100).toFixed(0)}%"></span></div>
              <div class="apunte tenue mt-8" style="font-size:11.5px">
                ${n(x.pedido.propio)} u por necesidad${x.pedido.completado
                  ? ` · <b style="color:var(--n3)">${n(x.pedido.completado)} u añadidas solo para alcanzar el mínimo</b>` : ''}
              </div>
              <button class="btn btn-suave btn-mini mt-16" data-mesa="${x.f.id}">ver en la mesa →</button>
            ` : '<div class="apunte tenue mt-12">sin necesidad de compra este ciclo</div>'}

            ${x.cands.length ? `
            <div class="sobretitulo mt-24">candidatos que dependen de esta fábrica</div>
            <div class="pila gap-8 mt-8">
              ${x.cands.map(c => `<div class="fila gap-8" style="font-size:12px">
                <span class="crece">${c.nombre}</span>
                <span class="marca-estado e-neutro">${ETAPAS.find(e => e.id === c.etapa).rotulo}</span>
              </div>`).join('')}
            </div>
            <button class="btn btn-fantasma btn-mini mt-16" data-prod="1">ir a desarrollo de producto →</button>` : ''}
          </div>
        </div>` : ''}
      </div>`;
    }).join('');

    caja.querySelectorAll('[data-t]').forEach(el => el.onclick = () => {
      _fab.abierta = _fab.abierta === el.dataset.t ? null : el.dataset.t;
      window.PANTALLAS.fabricas(lienzo);
    });
    caja.querySelectorAll('[data-mesa]').forEach(b => b.onclick = e => {
      e.stopPropagation(); viajaEstela(['fabricas', 'compras']);
      setTimeout(() => { location.hash = '#/compras/cubitt'; }, 700);
    });
    caja.querySelectorAll('[data-prod]').forEach(b => b.onclick = e => {
      e.stopPropagation(); location.hash = '#/producto';
    });
  }

  lienzo.querySelector('#ir-cubitt').onclick = () => { location.hash = '#/compras/cubitt'; };
  pinta();
};
