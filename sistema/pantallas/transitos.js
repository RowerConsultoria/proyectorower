/* ============================================================================
   EL SISTEMA — Pantalla: torre de tránsitos            · Fase 11 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   Un embarque no es un estado: es un recorrido de dos o tres meses en el que
   la mercancía ya está comprada y pagada pero todavía no existe para nadie.
   Aquí se ve entero, y con él la pieza que hoy se pierde: los DOCUMENTOS.

   El caso que la pantalla existe para resolver: cuando falta la factura del
   flete, el costo en destino no se puede cerrar — y sin costo en destino ni
   el valor del inventario ni el margen de la siguiente compra valen nada.
   El sistema redacta el reclamo; lo envía una persona.
   ============================================================================ */

window.PANTALLAS = window.PANTALLAS || {};

const _tr = { abierto: null };

const RUTA = ['producción', 'listo', 'embarcado', 'en tránsito', 'arribo', 'recepción', 'disponible'];
/* El dato semilla nombra la etapa; aquí se sitúa en el recorrido completo. */
const _POS = { 'producción': 0, 'listo': 1, 'embarcado': 2, 'en tránsito': 3, 'arribo': 4, 'en recepción': 5, 'disponible': 6 };

const DOCS = [
  { k: 'shippingAdvice', r: 'aviso de embarque' },
  { k: 'acn', r: 'ACN' },
  { k: 'facturaNaviera', r: 'factura de flete' },
  { k: 'costeo', r: 'costeo en destino' },
];

/* Qué referencias trae cada embarque. Las CAJAS del embarque se reparten
   entre las referencias de esa fábrica en proporción a su demanda, y se pasan
   a unidades con las unidades por caja de cada producto. Así ningún embarque
   queda vacío y las cifras cuadran con el manifiesto. */
function lineasDe(t) {
  const esCasio = t.prov.startsWith('Casio');
  const fab = FABRICAS.find(f => f.nombre === t.prov);
  const cand = CATALOGO.filter(p => esCasio ? p.marca === 'Casio' : (fab && p.fabrica === fab.id));
  if (!cand.length) return [];

  const pesos = cand.map(p => Math.max(1, demandaSaneada(p.sku).mensual));
  const suma = pesos.reduce((a, b) => a + b, 0);

  return cand.map((p, i) => {
    const cajas = Math.round(t.cajas * pesos[i] / suma);
    return { p, cajas, u: cajas * (p.uxc || 20) };
  }).filter(x => x.u > 0).sort((a, b) => b.u - a.u);
}

function valorDe(t) {
  return lineasDe(t).reduce((a, x) => a + x.u * x.p.pvp * 0.40, 0);
}

window.PANTALLAS['compras/transitos'] = function (lienzo) {
  const n = v => Math.round(v || 0).toLocaleString('es-VE');
  const sinFactura = TRANSITOS.filter(t => !t.docs.facturaNaviera);
  const sinCosteo = TRANSITOS.filter(t => !t.docs.costeo);
  const valorSinCerrar = sinCosteo.reduce((a, t) => a + valorDe(t), 0);
  const totU = TRANSITOS.reduce((a, t) => a + lineasDe(t).reduce((x, y) => x + y.u, 0), 0);
  const totV = TRANSITOS.reduce((a, t) => a + valorDe(t), 0);
  const reclamo = entradaDe('L-02');

  lienzo.innerHTML = `
    <div class="lienzo-cab fila-sep">
      <div>
        <div class="sobretitulo">compras · mercancía en camino</div>
        <div class="titulo-seccion" style="margin-top:4px">torre de tránsitos</div>
      </div>
      <button class="btn btn-fantasma btn-mini" id="volver">← panel</button>
    </div>

    <div class="cinta" style="margin-bottom:20px">
      <span class="orbe hecho"></span><span class="hora">${HOY.hora}</span>
      <div class="crece">${reclamo ? reclamo.salida : 'revisé los embarques en camino y su estado documental'}</div>
    </div>

    <div class="rejilla rejilla-4" style="margin-bottom:22px">
      <div class="tarjeta"><div class="kpi"><div class="rotulo">embarques en camino</div>
        <div class="valor">${TRANSITOS.length}</div>
        <div class="pie">${TRANSITOS.filter(t => t.modo === 'marítimo').length} marítimos ·
          ${TRANSITOS.filter(t => t.modo === 'aéreo').length} aéreo</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">unidades en tránsito</div>
        <div class="valor">${n(totU)}</div><div class="pie">ya compradas, todavía no vendibles</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">valor en camino</div>
        <div class="valor">${n(totV)}</div><div class="pie">USD, costo estimado</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">costo sin cerrar</div>
        <div class="valor" style="color:${valorSinCerrar ? 'var(--n3)' : 'inherit'}">${n(valorSinCerrar)}</div>
        <div class="pie">USD en ${sinCosteo.length} embarques sin costeo en destino</div></div></div>
    </div>

    ${sinFactura.length ? `
    <div class="bloqueo" style="margin-bottom:22px">
      <div class="fila-sep">
        <div class="fila gap-8"><span class="orbe orbe-mini"></span>
          <b style="font-size:13px">${sinFactura.length === 1 ? 'un embarque llegó' : sinFactura.length + ' embarques llegaron'} sin factura de flete</b></div>
        <span class="sello sello-externo">↗ sale de Kenex</span>
      </div>
      <div class="apunte mt-8" style="max-width:800px">
        ${sinFactura.map(t => `<b>${t.id}</b>`).join(' y ')} — sin ese documento
        <b>el costo en destino no se puede cerrar</b>, y sin costo en destino ni el valor del
        inventario ni el margen de la siguiente compra valen nada. Son
        <b>${n(sinFactura.reduce((a, t) => a + valorDe(t), 0))} USD</b> de mercancía cuyo costo real
        todavía no se conoce.
      </div>
      <div class="apunte tenue mt-8" style="font-size:11.5px">
        El reclamo está redactado en la plantilla de siempre y espera en la bandeja con el nombre de
        una persona como remitente. <b>El sistema no lo envía</b>: escribir a un tercero en nombre de
        Kenex tiene techo de nivel 1 sin excepción posible.
      </div>
      <div class="fila gap-8 mt-16">
        <button class="btn btn-humano btn-mini" id="ver-reclamo">revisar el reclamo y enviarlo</button>
        <button class="btn btn-fantasma btn-mini" id="escalar">escalar internamente</button>
      </div>
    </div>` : ''}

    <div class="rejilla" style="grid-template-columns:minmax(0,1fr) ${_tr.abierto ? '380px' : '0'};gap:20px;align-items:start">
      <div class="pila gap-12" id="lista-emb"></div>
      <div id="det-emb"></div>
    </div>

    <p class="apunte tenue mt-24" style="max-width:820px;line-height:1.55">
      La mercancía en tránsito es la que el sistema <b>descuenta de la propuesta de compra</b>: son
      unidades ya compradas que no hay que volver a pedir. Por eso esta pantalla y la mesa miran el
      mismo dato — y por eso un embarque que nadie registra se convierte, dos meses después, en una
      compra duplicada.
    </p>`;

  const caja = lienzo.querySelector('#lista-emb');

  function pinta() {
    caja.innerHTML = TRANSITOS.map(t => {
      const pos = _POS[t.etapa] ?? 3;
      const abierto = _tr.abierto === t.id;
      const lin = lineasDe(t);
      const faltan = DOCS.filter(d => !t.docs[d.k]);
      return `<div class="panel" data-e="${t.id}">
        <div class="fila-sep" style="cursor:pointer" data-t="${t.id}">
          <div>
            <div class="fila gap-8">
              <b style="font-size:14px" class="mono">${t.id}</b>
              <span class="marca-estado ${t.modo === 'aéreo' ? 'e-ok' : 'e-neutro'}">${t.modo}</span>
              ${!t.docs.facturaNaviera ? '<span class="marca-estado e-riesgo"><i class="punto"></i>sin factura de flete</span>' : ''}
            </div>
            <div class="apunte tenue mt-8">${t.prov} · ${t.origen} → Colón ·
              ${t.contenedores ? t.contenedores + ' contenedor' + (t.contenedores > 1 ? 'es' : '') + ' · ' : ''}${n(t.cajas)} cajas ·
              ${lin.length} referencias</div>
          </div>
          <div class="fila gap-24" style="text-align:right">
            <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">unidades</div>
              <div class="cifra-media">${n(lin.reduce((a, x) => a + x.u, 0))}</div></div>
            <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">llega</div>
              <div class="cifra-media">${t.eta}</div></div>
            <span class="apunte tenue" style="align-self:center">${abierto ? '▾' : '▸'}</span>
          </div>
        </div>

        <div class="ruta mt-16">
          ${RUTA.map((r, i) => `
            <div class="paso ${i < pos ? 'hecho' : i === pos ? 'aqui' : ''}">
              <span class="pt"></span><span class="et">${r}</span></div>
            ${i < RUTA.length - 1 ? `<div class="via ${i < pos ? 'hecho' : ''}"></div>` : ''}`).join('')}
        </div>

        <div class="docs mt-16">
          ${DOCS.map(d => `<span class="doc ${t.docs[d.k] ? 'si' : 'no'}"><i></i>${d.r}</span>`).join('')}
          ${faltan.length ? `<span class="apunte tenue" style="margin-left:auto">
            ${faltan.length} documento${faltan.length > 1 ? 's' : ''} pendiente${faltan.length > 1 ? 's' : ''}</span>` : ''}
        </div>
      </div>`;
    }).join('');

    caja.querySelectorAll('[data-t]').forEach(el => el.onclick = () => {
      _tr.abierto = _tr.abierto === el.dataset.t ? null : el.dataset.t;
      window.PANTALLAS['compras/transitos'](lienzo);
    });
  }

  function pintaDetalle() {
    const c = lienzo.querySelector('#det-emb');
    if (!_tr.abierto) { c.innerHTML = ''; return; }
    const t = TRANSITOS.find(x => x.id === _tr.abierto);
    if (!t) { c.innerHTML = ''; return; }
    const lin = lineasDe(t);
    const val = valorDe(t);

    c.innerHTML = `<div class="explica">
      <div class="fila-sep"><div class="sobretitulo">detalle del embarque</div>
        <button class="btn btn-fantasma btn-mini" id="cerrar-e">✕</button></div>
      <h4 class="mt-16 mono">${t.id}</h4>
      <div class="apunte tenue" style="margin-top:3px">${t.prov}</div>

      <ul class="razones">
        <li><b>Origen:</b> ${t.origen} → Zona Libre de Colón</li>
        <li><b>Modo:</b> ${t.modo}${t.contenedores ? ` · ${t.contenedores} contenedor${t.contenedores > 1 ? 'es' : ''}` : ''} · ${n(t.cajas)} cajas</li>
        <li><b>Llega:</b> ${t.eta} · lleva ${t.dias} días en camino</li>
        <li class="clave"><b>Valor estimado:</b> ${n(val)} USD en ${n(lin.reduce((a, x) => a + x.u, 0))} unidades</li>
        ${!t.docs.costeo ? `<li class="aviso">El <b>costeo en destino no está cerrado</b>: el valor de arriba
          es estimado y no sirve para calcular el margen de la siguiente compra.</li>` : ''}
      </ul>

      <hr class="sep">
      <div class="sobretitulo">documentos</div>
      <div class="pila gap-8 mt-12">
        ${DOCS.map(d => `<div class="fila-sep" style="font-size:12px">
          <span class="fila gap-8"><i style="width:8px;height:8px;border-radius:50%;flex:none;
            background:${t.docs[d.k] ? 'var(--ok)' : 'var(--riesgo)'}"></i>${d.r}</span>
          <span class="apunte tenue">${t.docs[d.k] ? 'recibido' : 'pendiente'}</span></div>`).join('')}
      </div>

      ${!t.docs.facturaNaviera ? `
      <div class="bloqueo mt-16">
        <div class="fila gap-8"><span class="orbe orbe-mini"></span>
          <b style="font-size:12.5px">reclamo preparado</b></div>
        <div class="apunte mt-8">Al agente aduanal, en la plantilla aprobada, con el detalle del
          embarque y los días transcurridos. <b>Sale con el nombre de una persona.</b></div>
        <div class="fila gap-8 mt-16">
          <span class="sello sello-externo">↗ sale de Kenex</span>
          <button class="btn btn-humano btn-mini" id="enviar-rec">revisar y enviar</button>
        </div>
      </div>` : ''}

      <hr class="sep">
      <div class="sobretitulo">qué trae</div>
      <div class="pila gap-8 mt-12">
        ${lin.slice(0, 7).map(x => `<div class="fila gap-8" style="font-size:12px">
          <img src="img/${x.p.img}" alt="" style="width:26px;height:26px;border-radius:8px;object-fit:cover;
               background:var(--panel-alto);border:1px solid var(--borde);flex:none">
          <span class="crece" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${x.p.nombre}</span>
          <b style="font-variant-numeric:tabular-nums">${n(x.u)}</b></div>`).join('')}
        ${lin.length > 7 ? `<div class="apunte tenue" style="font-size:11.5px">y ${lin.length - 7} referencias más</div>` : ''}
        ${!lin.length ? '<div class="apunte tenue">sin referencias asignadas en los datos semilla</div>' : ''}
      </div>
    </div>`;

    const x = c.querySelector('#cerrar-e');
    if (x) x.onclick = () => { _tr.abierto = null; window.PANTALLAS['compras/transitos'](lienzo); };
    const er = c.querySelector('#enviar-rec');
    if (er) er.onclick = () => alert(`Reclamo listo para enviar.\n\nEmbarque ${t.id} · ${t.prov}\n${t.dias} días desde el arribo sin factura de flete\n\nEn el sistema real sale con tu nombre como remitente.\nEl agente lo redacta; nunca lo envía.`);
  }

  lienzo.querySelector('#volver').onclick = () => { location.hash = '#/compras'; };
  const vr = lienzo.querySelector('#ver-reclamo');
  if (vr) vr.onclick = () => { _tr.abierto = sinFactura[0].id; window.PANTALLAS['compras/transitos'](lienzo); };
  const es = lienzo.querySelector('#escalar');
  if (es) es.onclick = () => { viajaEstela(['compras', 'logistica']); };

  pinta();
  pintaDetalle();
};
