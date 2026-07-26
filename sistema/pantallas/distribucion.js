/* ============================================================================
   EL SISTEMA — Pantalla: reparto a los frentes         · Fase 12 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   La pantalla que más criterio tácito captura de toda la casa. Repartir es
   fácil cuando sobra; el trabajo está en decidir QUIÉN CEDE cuando falta.

   Por eso la escalera de precedencia no está escondida en el código: se
   publica en la propia pantalla, con su versión y su dueño. Es una política
   aprobada, no un algoritmo — y ésa es la diferencia entre un reparto que un
   frente puede discutir y uno que solo puede sufrir.

   Todo ajuste humano exige MOTIVO de una lista corta, y la pantalla muestra
   en el acto a quién se le quita lo que se le da a otro. Nada se mueve sin
   que se vea de dónde sale.
   ============================================================================ */

window.PANTALLAS = window.PANTALLAS || {};

const _dist = { abierto: null, ajustes: {}, motivos: {} };

const MOTIVOS_REPARTO = [
  'compromiso con un cliente',
  'lanzamiento o campaña',
  'apertura de punto de venta',
  'corrección de un reparto anterior',
  'riesgo de crédito del frente',
  'otro',
];

/**
 * El reparto efectivo = lo que calculó el motor MÁS los ajustes humanos.
 *
 * Con dos reglas que la primera versión no tenía y sin las cuales la pantalla
 * miente: el total asignado de una referencia NUNCA puede pasar de las
 * unidades que hay, y cualquier ajuste tiene que verse arriba en el acto.
 * Un tope que solo está escrito en el texto no es un tope.
 */
function repartoEfectivo(d) {
  const asig = {};          // asig[sku][frente] = unidades
  const tope = {};          // tope[sku] = unidades disponibles
  const pedido = {};        // pedido[frente][sku] = unidades pedidas

  for (const [fid, x] of Object.entries(d.porFrente)) {
    for (const l of x.lineas) {
      (asig[l.sku] = asig[l.sku] || {})[fid] = l.recibe;
      (pedido[fid] = pedido[fid] || {})[l.sku] = l.pide;
      tope[l.sku] = (tope[l.sku] ?? 0) + l.recibe;   // lo servido por el motor
    }
  }
  /* en las escasas el tope real es la existencia, no lo que el motor sirvió */
  for (const e of d.escasos) tope[e.sku] = e.hay;

  const recortes = [];
  for (const [clave, valor] of Object.entries(_dist.ajustes)) {
    const [sku, fid] = clave.split('|');
    if (!asig[sku] || asig[sku][fid] === undefined) continue;
    const otros = Object.entries(asig[sku]).reduce((a, [k, v]) => a + (k === fid ? 0 : v), 0);
    const margen = Math.max(0, (tope[sku] ?? 0) - otros);
    const pide = (pedido[fid] || {})[sku] ?? valor;
    const final = Math.min(valor, margen, pide);
    if (final !== valor) recortes.push({ sku, fid, pedido: valor, aplicado: final, margen, pide });
    asig[sku][fid] = final;
  }

  const porFrente = {};
  for (const [sku, porF] of Object.entries(asig)) {
    for (const [fid, u] of Object.entries(porF)) {
      const f = porFrente[fid] = porFrente[fid] || { pide: 0, recibe: 0 };
      f.recibe += u;
    }
  }
  for (const [fid, x] of Object.entries(d.porFrente)) {
    (porFrente[fid] = porFrente[fid] || { pide: 0, recibe: 0 }).pide = x.pide;
  }
  return { asig, tope, porFrente, recortes };
}

window.PANTALLAS.distribucion = function (lienzo) {
  const n = v => Math.round(v || 0).toLocaleString('es-VE');
  const d = datosDe('X-01') || { escasos: [], porFrente: {}, repartido: 0, referencias: 0 };
  const entrada = entradaDe('X-01');
  const nom = id => (FRENTES.find(f => f.id === id) || {}).nombre || id;

  const ef = repartoEfectivo(d);

  const frentes = FRENTES.map(f => {
    const x = ef.porFrente[f.id] || { pide: 0, recibe: 0 };
    return { f, ...x, cede: x.pide - x.recibe, servicio: x.pide ? x.recibe / x.pide : 1 };
  }).filter(x => x.pide > 0).sort((a, b) => a.servicio - b.servicio);

  const totalPide = frentes.reduce((a, x) => a + x.pide, 0);
  const totalRecibe = frentes.reduce((a, x) => a + x.recibe, 0);
  const ajustes = Object.keys(_dist.ajustes).length;

  lienzo.innerHTML = `
    <div class="lienzo-cab fila-sep">
      <div>
        <div class="sobretitulo">operación</div>
        <div class="titulo-seccion" style="margin-top:4px">distribución</div>
      </div>
      <div class="fila gap-8">
        <span class="marca-estado e-neutro"><i class="punto"></i>corte semanal</span>
        <span class="sello sello-3"><i></i>tu firma</span>
      </div>
    </div>

    <div class="cinta" style="margin-bottom:20px">
      <span class="orbe hecho"></span><span class="hora">${HOY.hora}</span>
      <div class="crece">${entrada ? entrada.salida : 'reparto pendiente de calcular'}</div>
      ${ajustes ? `<span class="marca-estado e-neutro"><i class="punto"></i>${ajustes} ajuste${ajustes > 1 ? 's' : ''} tuyo${ajustes > 1 ? 's' : ''}</span>` : ''}
    </div>

    <div class="rejilla rejilla-4" style="margin-bottom:22px">
      <div class="tarjeta"><div class="kpi"><div class="rotulo">frentes con pedido</div>
        <div class="valor">${frentes.length}</div><div class="pie">de ${FRENTES.length} en la red</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">unidades pedidas</div>
        <div class="valor">${n(totalPide)}</div><div class="pie">${d.referencias} referencias</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">nivel de servicio</div>
        <div class="valor" style="color:${totalRecibe / totalPide < 0.9 ? 'var(--n3)' : 'var(--ok)'}">${(totalRecibe / totalPide * 100).toFixed(0)} %</div>
        <div class="pie">${n(totalRecibe)} u asignadas</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">en escasez</div>
        <div class="valor" style="color:${d.escasos.length ? 'var(--n3)' : 'inherit'}">${d.escasos.length}</div>
        <div class="pie">referencias donde lo pedido supera lo que hay</div></div></div>
    </div>

    <!-- la política, publicada -->
    <div class="panel" style="margin-bottom:22px">
      <div class="fila-sep">
        <div class="sobretitulo">la escalera de precedencia</div>
        <span class="apunte tenue">política publicada · dueño: dirección de compras ·
          versión ${REGLAS.cuotaRazonSocial.ver} · vigente desde ${REGLAS.cuotaRazonSocial.desde} ·
          <b>no la decide un algoritmo</b></span>
      </div>
      <div class="apunte mt-8" style="max-width:840px">
        Cuando lo pedido supera lo que hay, <b>quién cede está decidido de antemano y por escrito</b>.
        En una frase: <b>gana lo que ya se cobró, después lo que sostiene la operación, después lo
        que rota, y de último lo que ahorra.</b> Una compra futura nunca desplaza una venta presente.
      </div>
      <div class="fila gap-8 mt-16" style="flex-wrap:wrap">
        ${ESCALERA.map(p => `<span class="chip" style="cursor:default">
          <b style="color:var(--menta)">${p.n}</b> ${p.t}</span>`).join('')}
      </div>
      <div class="apunte tenue mt-16" style="font-size:11.5px">
        <b>A igual peldaño, todos ceden la misma proporción.</b> Servir en orden hasta agotar
        dejaría al primero servido y al segundo a cero, y dos frentes con el mismo derecho no
        pueden acabar así — no hay forma de explicárselo al que se quedó fuera. El margen en
        riesgo solo decide a quién le toca la unidad suelta que deja el redondeo.
      </div>
    </div>

    <div>
        <!-- servicio por frente -->
        <div class="sobretitulo" style="margin-bottom:12px">qué recibe cada frente</div>
        <div class="tabla-envoltura" style="max-height:none;margin-bottom:22px">
          <table class="tabla">
            <thead><tr>
              <th>frente</th><th>vía</th><th class="num">pide</th><th class="num">recibe</th>
              <th class="num">cede</th><th>servicio</th>
            </tr></thead>
            <tbody>
              ${frentes.map(x => `<tr>
                <td><b>${x.f.nombre}</b><div class="apunte tenue" style="font-size:11px">${x.f.pais} · ${TIPOS_FRENTE[x.f.tipo].rotulo}</div></td>
                <td><span class="via ${x.f.via === 'odoo' ? 'via-odoo' : 'via-portal'}">${x.f.via}</span></td>
                <td class="num">${n(x.pide)}</td>
                <td class="num"><b>${n(x.recibe)}</b></td>
                <td class="num ${x.cede ? 'delta-neg' : 'tenue'}">${x.cede ? '−' + n(x.cede) : '—'}</td>
                <td style="min-width:130px">
                  <div class="barra ${x.servicio < 0.9 ? 'parcial' : ''}"><span style="width:${(x.servicio * 100).toFixed(0)}%"></span></div>
                  <div class="apunte tenue" style="font-size:10.5px;margin-top:3px">${(x.servicio * 100).toFixed(0)} %</div>
                </td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>

        <!-- la escasez, caso por caso -->
        <div class="sobretitulo" style="margin-bottom:12px">dónde falta, y quién cede</div>
        <div class="pila gap-12" id="escasos"></div>
    </div>

    <div class="barra-mesa">
      <div class="dato"><span class="r">asignado</span><span class="v">${n(totalRecibe)} u</span></div>
      <div class="dato"><span class="r">sin atender</span><span class="v" style="color:${totalPide - totalRecibe ? 'var(--n3)' : 'inherit'}">${n(totalPide - totalRecibe)} u</span></div>
      <div class="crece"></div>
      <span class="apunte tenue">lo que no se atiende queda registrado como demanda no atendida, no se borra</span>
      <button class="btn btn-humano" id="firmar" data-firma="reparto">firmar el reparto</button>
    </div>`;

  const caja = lienzo.querySelector('#escasos');

  function pintaEscasos() {
    caja.innerHTML = d.escasos.map(e => {
      const abierto = _dist.abierto === e.sku;
      return `<div class="panel" data-s="${e.sku}">
        <div class="fila-sep" style="cursor:pointer" data-t="${e.sku}">
          <div class="fila gap-12">
            <img src="img/${e.img}" alt="" style="width:38px;height:38px;border-radius:12px;object-fit:cover;
                 background:var(--panel-alto);border:1px solid var(--borde)">
            <div>
              <b style="font-size:13.5px">${e.nombre}</b>
              <div class="apunte tenue mt-8">piden <b>${n(e.pide)} u</b> · hay <b>${n(e.hay)} u</b> ·
                faltan <b style="color:var(--n3)">${n(e.pide - e.hay)} u</b></div>
              ${CAUSA_ESCASEZ[e.sku] ? `<div class="apunte mt-8" style="font-size:11.5px;color:var(--n3)">
                ⚠ ${CAUSA_ESCASEZ[e.sku].texto}</div>` : ''}
            </div>
          </div>
          <div class="fila gap-16">
            <div style="text-align:right"><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">frentes que ceden</div>
              <div class="cifra-media">${e.cede.length}</div></div>
            <span class="apunte tenue" style="align-self:center">${abierto ? '▾' : '▸'}</span>
          </div>
        </div>

        ${abierto ? `
        <hr class="sep">
        <div class="tabla-envoltura" style="max-height:none;border-radius:14px">
          <table class="tabla">
            <thead><tr><th>frente</th><th>peldaño</th><th class="num">pide</th>
              <th class="num">recibe</th><th class="num">cede</th><th>motivo del ajuste</th></tr></thead>
            <tbody>
              ${e.pretensiones.sort((a, b) => {
                const oa = ESCALERA.find(p => p.clave === a.peldano).n;
                const ob = ESCALERA.find(p => p.clave === b.peldano).n;
                return oa - ob;
              }).map(pr => {
                const pel = ESCALERA.find(p => p.clave === pr.peldano);
                const clave = e.sku + '|' + pr.frente;
                const rec = (ef.asig[e.sku] || {})[pr.frente] ?? pr.recibe;
                const cede = pr.pide - rec;
                const cambiado = rec !== pr.recibe;
                const recorte = ef.recortes.find(r => r.sku === e.sku && r.fid === pr.frente);
                return `<tr>
                  <td><b>${nom(pr.frente)}</b></td>
                  <td><span class="chip" style="cursor:default"><b style="color:var(--menta)">${pel.n}</b> ${pel.t}</span></td>
                  <td class="num">${n(pr.pide)}</td>
                  <td class="num"><input class="entrada-humana" data-k="${clave}" value="${n(rec)}"></td>
                  <td class="num ${cede ? 'delta-neg' : 'tenue'}">${cede ? '−' + n(cede) : '—'}
                    ${recorte ? `<div class="apunte" style="font-size:10px;color:var(--n3)">pediste ${n(recorte.pedido)}, solo hay ${n(recorte.margen)}</div>` : ''}</td>
                  <td>${cambiado
                    ? `<select class="motivo-fila ${_dist.motivos[clave] ? '' : 'pide'}" data-m="${clave}">
                         <option value="">${_dist.motivos[clave] ? '—' : '⚠ indica el motivo'}</option>
                         ${MOTIVOS_REPARTO.map(m => `<option ${_dist.motivos[clave] === m ? 'selected' : ''}>${m}</option>`).join('')}
                       </select>`
                    : '<span class="tenue">—</span>'}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
        ${(() => {
          /* Cuando un peldaño se lleva todo, los de abajo quedan a cero. Es la
             consecuencia de la política y hay que decirla, no dejar que la
             descubra en la sala quien vea a su frente con un cero al lado. */
          const porPel = {};
          e.pretensiones.forEach(p => {
            const k = ESCALERA.find(x => x.clave === p.peldano).n;
            porPel[k] = porPel[k] || { pide: 0, recibe: 0, t: ESCALERA.find(x => x.clave === p.peldano).t };
            porPel[k].pide += p.pide; porPel[k].recibe += p.recibe;
          });
          const vacios = Object.entries(porPel).filter(([, v]) => v.recibe === 0);
          const tope = Object.entries(porPel).filter(([, v]) => v.recibe > 0).sort((a, b) => a[0] - b[0])[0];
          if (!vacios.length || !tope) return '';
          return `<div class="apunte mt-16" style="font-size:11.5px;max-width:720px;color:var(--n3)">
            El peldaño <b>${tope[0]} — ${tope[1].t}</b> consumió las ${n(e.hay)} unidades disponibles,
            así que ${vacios.length === 1 ? 'el peldaño inferior queda' : 'los ' + vacios.length + ' peldaños inferiores quedan'}
            en cero. <b>Es la política funcionando</b>, no un fallo del reparto: nada le quita
            mercancía a quien ya compró. Si hay que romperlo, se rompe a mano y con motivo.</div>`;
        })()}
        <div class="apunte tenue mt-16" style="font-size:11.5px;max-width:700px">
          Si subes lo que recibe un frente, <b>sale de otro</b>: el total no puede pasar de las
          ${n(e.hay)} unidades que hay. Por eso el motivo es obligatorio — es lo único que después
          permite explicarle a quien cedió por qué le tocó a él.
        </div>` : ''}
      </div>`;
    }).join('') || '<div class="vacio"><div class="icono">◇</div>ninguna referencia en escasez este corte</div>';

    caja.querySelectorAll('[data-t]').forEach(el => el.onclick = () => {
      _dist.abierto = _dist.abierto === el.dataset.t ? null : el.dataset.t;
      window.PANTALLAS.distribucion(lienzo);
    });
    caja.querySelectorAll('.entrada-humana').forEach(inp => inp.onchange = () => {
      _dist.ajustes[inp.dataset.k] = parseInt(String(inp.value).replace(/\D/g, ''), 10) || 0;
      window.PANTALLAS.distribucion(lienzo);
    });
    caja.querySelectorAll('[data-m]').forEach(sel => sel.onchange = () => {
      _dist.motivos[sel.dataset.m] = sel.value;
      window.PANTALLAS.distribucion(lienzo);
    });
  }

  lienzo.querySelector('#firmar').onclick = () => {
    const faltan = Object.keys(_dist.ajustes).filter(k => !_dist.motivos[k]);
    if (faltan.length) {
      alert(`Faltan ${faltan.length} motivos por indicar.\n\nUn reparto sin motivo no se puede explicar al frente que cedió.`);
      return;
    }
    /* Firmar es una acción y como tal queda en la bitácora, con quién la firmó
       y cuántos ajustes humanos llevaba. */
    firmaReparto({
      frentes: frentes.length, asignado: totalRecibe, sinAtender: totalPide - totalRecibe,
      ajustes: Object.keys(_dist.ajustes).length,
      motivos: [...new Set(Object.values(_dist.motivos).filter(Boolean))],
    });
    /* la estela sale sola: la acción se anota con `cruza` (fase 22 · P3) */
    setTimeout(() => alert(`Reparto firmado.\n\n${n(totalRecibe)} u asignadas a ${frentes.length} frentes\n${n(totalPide - totalRecibe)} u quedan como demanda no atendida\n\nBaja a cada frente como asignación, y a los que tienen Odoo se les escribe la transferencia a su almacén.`), 1100);
  };

  pintaEscasos();
};
