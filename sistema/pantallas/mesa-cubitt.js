/* ============================================================================
   EL SISTEMA — Pantalla: la mesa de la marca propia   · Fase 9 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   Se agrupa POR FÁBRICA, no por producto, porque el pedido mínimo es por
   fábrica. Da igual que una referencia necesite 200 unidades si la fábrica no
   produce por debajo de 5.000 — y ése es exactamente el motivo por el que un
   sugerido automático que no conoce el MOQ no sirve para nada.

   Lo que aporta el sistema aquí es el reparto del faltante: cada lote va a la
   referencia con MENOR cobertura proyectada en ese momento, así que se alcanza
   el mínimo sin llenar de más lo que ya está cubierto.
   ============================================================================ */

window.PANTALLAS = window.PANTALLAS || {};

const _cub = { ajustes: {}, abierta: null };

window.PANTALLAS['compras/cubitt'] = function (lienzo) {
  const n = v => Math.round(v || 0).toLocaleString('es-VE');
  const bloques = FABRICAS.map(f => completarMOQ(f.id, _cub.ajustes))
                          .filter(b => b.skus.length);

  const conPedido = bloques.filter(b => b.hayNecesidad);
  const totU = conPedido.reduce((a, b) => a + b.total, 0);
  const totUSD = conPedido.reduce((a, b) =>
    a + b.skus.reduce((x, p) => x + ((b.base[p.sku] || 0) + (b.anadido[p.sku] || 0)) * p.pvp * 0.38, 0), 0);
  const anticipo = totUSD * 0.30;
  const forzadas = conPedido.filter(b => b.completado > b.propio * 0.5);

  lienzo.innerHTML = `
    <div class="lienzo-cab fila-sep">
      <div>
        <div class="sobretitulo">compras · marca propia</div>
        <div class="titulo-seccion" style="margin-top:4px">mesa de compra · Cubitt</div>
      </div>
      <button class="btn btn-fantasma btn-mini" id="volver-panel">← panel</button>
    </div>

    <div class="cinta" style="margin-bottom:20px">
      <span class="orbe hecho"></span><span class="hora">${HOY.hora}</span>
      <div class="crece">agrupé por fábrica y llené los pedidos mínimos:
        <b>${conPedido.length} fábricas</b> con necesidad,
        <b>${n(conPedido.reduce((a, b) => a + b.completado, 0))} u</b> añadidas para alcanzar el mínimo,
        repartidas siempre en lo de menor cobertura</div>
    </div>

    <div class="rejilla rejilla-4" style="margin-bottom:22px">
      <div class="tarjeta"><div class="kpi"><div class="rotulo">fábricas con pedido</div>
        <div class="valor">${conPedido.length} <span class="tenue" style="font-size:15px;font-weight:400">/ ${bloques.length}</span></div>
        <div class="pie">el mínimo es por fábrica, no por producto</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">unidades</div>
        <div class="valor">${n(totU)}</div>
        <div class="pie">${n(conPedido.reduce((a, b) => a + b.propio, 0))} por necesidad ·
          ${n(conPedido.reduce((a, b) => a + b.completado, 0))} por el mínimo</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">monto estimado</div>
        <div class="valor">${(totUSD / 1e6).toFixed(2)} M</div><div class="pie">USD, costo estimado</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">anticipo al colocar</div>
        <div class="valor">${n(anticipo)}</div><div class="pie">USD · el 30 % del esquema 30 / 70</div></div></div>
    </div>

    ${forzadas.length ? `
    <div class="bloqueo" style="margin-bottom:22px">
      <div class="fila gap-8"><span class="orbe orbe-mini"></span>
        <b style="font-size:13px">en ${forzadas.length === 1 ? 'una fábrica' : forzadas.length + ' fábricas'} el mínimo manda más que la necesidad</b></div>
      <div class="apunte mt-8" style="max-width:760px">
        ${forzadas.map(b => `<b>${b.fab.nombre}</b>: la necesidad real son <b>${n(b.propio)} u</b>
          pero el pedido mínimo son <b>${n(b.fab.moq)} u</b>.`).join(' ')}
        Comprar el mínimo inmoviliza caja; no comprarlo deja la línea sin reposición durante
        <b>${forzadas[0].fab.leadDias} días</b>. <b>Es una decisión, no un cálculo</b>, y por eso
        el sistema la deja preparada y no la ejecuta.
      </div>
    </div>` : ''}

    <div class="pila gap-16" id="fabricas"></div>

    <p class="apunte tenue mt-24" style="max-width:820px;line-height:1.55">
      El faltante para alcanzar cada mínimo <b>no se reparte a partes iguales</b>: cada lote va a
      la referencia que en ese momento tenga la menor cobertura proyectada. Así se llega al mínimo
      sin llenar de más lo que ya estaba cubierto — que es la diferencia entre un pedido pensado
      y uno redondeado a ojo.
    </p>`;

  const caja = lienzo.querySelector('#fabricas');

  function pinta() {
    caja.innerHTML = bloques.map(b => {
      const abierta = _cub.abierta === b.fab.id;
      const pctNec = Math.min(100, b.propio / b.fab.moq * 100);
      const pctAdd = Math.min(100 - pctNec, b.completado / b.fab.moq * 100);
      const usd = b.skus.reduce((x, p) => x + ((b.base[p.sku] || 0) + (b.anadido[p.sku] || 0)) * p.pvp * 0.38, 0);

      return `<div class="panel" data-fab="${b.fab.id}">
        <div class="fila-sep" style="cursor:pointer" data-toggle="${b.fab.id}">
          <div>
            <div class="fila gap-8">
              <b style="font-size:14.5px">${b.fab.nombre}</b>
              ${b.fab.aereo ? '<span class="marca-estado e-neutro">apto aéreo</span>' : ''}
              ${!b.hayNecesidad ? '<span class="marca-estado e-ok"><i class="punto"></i>sin necesidad este ciclo</span>' : ''}
            </div>
            <div class="apunte tenue mt-8">${b.fab.familias.join(' · ')} ·
              mínimo ${n(b.fab.moq)} u · ${b.fab.leadDias} días · pago ${b.fab.pago} ·
              <span title="Cobertura objetivo del grupo más los meses de tránsito de esta fábrica">objetivo
              ${(REGLAS.coberturaObjetivo.v + b.fab.leadDias / 30).toFixed(1)} meses de cobertura</span></div>
          </div>
          <div class="fila gap-16">
            ${b.hayNecesidad ? `<div class="dato" style="text-align:right">
              <div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">total</div>
              <div class="cifra-media">${n(b.total)} <span class="tenue" style="font-size:12px;font-weight:400">u</span></div>
            </div>
            <div class="dato" style="text-align:right">
              <div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">monto</div>
              <div class="cifra-media">${n(usd)}</div>
            </div>` : ''}
            <span class="apunte tenue">${abierta ? '▾' : '▸'}</span>
          </div>
        </div>

        ${b.hayNecesidad ? `
        <div class="mt-16">
          <div class="barra" style="height:11px;display:flex;padding:0;overflow:hidden">
            <span style="width:${pctNec}%;background:var(--gradiente);border-radius:0"></span>
            <span style="width:${pctAdd}%;background:var(--n3);border-radius:0"></span>
          </div>
          <div class="fila-sep mt-8" style="font-size:11.5px">
            <span><span style="color:var(--menta)">■</span> necesidad ${n(b.propio)} u
              ${b.completado ? `· <span style="color:var(--n3)">■</span> para el mínimo ${n(b.completado)} u` : ''}</span>
            <span class="tenue">${b.alcanza ? `alcanza el mínimo de ${n(b.fab.moq)} u`
              : `faltan ${n(b.fab.moq - b.total)} u para poder pedir`}</span>
          </div>
        </div>` : ''}

        ${abierta ? `
        <div class="tabla-envoltura mt-16" style="max-height:none;border-radius:14px">
          <table class="tabla">
            <thead><tr>
              <th>producto</th><th class="num">disponible</th><th class="num">cobertura</th>
              <th class="num">necesidad</th><th class="num">para el mínimo</th>
              <th class="num">total</th><th class="num">tu cantidad</th>
            </tr></thead>
            <tbody>
              ${b.skus.map(p => {
                const d = demandaSaneada(p.sku);
                const cob = d.mensual ? (STOCK_HUB[p.sku] || 0) / d.mensual : 99;
                const nec = b.base[p.sku] || 0, add = b.anadido[p.sku] || 0;
                const tot = _cub.ajustes[p.sku] ?? (nec + add);
                return `<tr>
                  <td><div class="producto">
                    <img class="foto" src="img/${p.img}" alt="" loading="lazy">
                    <div class="txt"><div class="nom">${p.nombre}</div>
                      <div class="sub">${p.sku}</div></div>
                    ${p.recienGraduado ? '<span class="marca-estado e-ok" title="Recién graduado: la foto y la serie de venta son las de su equivalente hasta que tenga histórico propio"><i class="punto"></i>nuevo</span>' : ''}
                  </div></td>
                  <td class="num">${n(STOCK_HUB[p.sku])}</td>
                  <td class="num" style="color:${cob < 2 ? 'var(--n3)' : 'var(--tinta)'}">${cob.toFixed(1)} m</td>
                  <td class="num">${nec ? n(nec) : '<span class="tenue">—</span>'}</td>
                  <td class="num" style="color:${add ? 'var(--n3)' : 'inherit'}">${add ? '+' + n(add) : '<span class="tenue">—</span>'}</td>
                  <td class="num"><b>${n(nec + add)}</b></td>
                  <td class="num"><input class="entrada-humana" data-sku="${p.sku}" value="${n(tot)}"></td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
        <div class="fila gap-8 mt-16">
          <button class="btn btn-humano btn-mini" data-orden="${b.fab.id}">preparar la orden</button>
          <span class="sello sello-3"><i></i>tu firma</span>
          <span class="apunte tenue">anticipo del 30 % al colocar: ${n(usd * 0.30)} USD</span>
        </div>` : ''}
      </div>`;
    }).join('');

    caja.querySelectorAll('[data-toggle]').forEach(el => el.onclick = () => {
      _cub.abierta = _cub.abierta === el.dataset.toggle ? null : el.dataset.toggle;
      window.PANTALLAS['compras/cubitt'](lienzo);
    });
    caja.querySelectorAll('.entrada-humana').forEach(inp => inp.onchange = () => {
      _cub.ajustes[inp.dataset.sku] = parseInt(String(inp.value).replace(/\D/g, ''), 10) || 0;
      window.PANTALLAS['compras/cubitt'](lienzo);
    });
    caja.querySelectorAll('[data-orden]').forEach(b => b.onclick = () => {
      const bl = bloques.find(x => x.fab.id === b.dataset.orden);
      alert(`Orden preparada para ${bl.fab.nombre}.\n\n${n(bl.total)} unidades · mínimo ${n(bl.fab.moq)} u\nPago ${bl.fab.pago} · ${bl.fab.leadDias} días de producción y tránsito\n\nEl sistema deja el archivo listo; el correo a la fábrica lo envía una persona.`);
    });
  }

  lienzo.querySelector('#volver-panel').onclick = () => { location.hash = '#/compras'; };
  pinta();
};
