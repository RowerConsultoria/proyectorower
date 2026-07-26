/* ============================================================================
   EL SISTEMA — Pantalla: panel de compras            · Fase 6 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   La entrada al módulo. Ninguna cifra de esta pantalla está escrita a mano:
   todas salen del turno de noche del núcleo de agentes. Si cambia una regla
   de negocio, la pantalla cambia sola.

   Cuatro bloques, en el orden en que se miran:
     1. la cinta del turno — qué se hizo mientras nadie miraba
     2. el reloj del ciclo — dónde estamos del mes y cuánto queda
     3. el estado de los cuatro frentes de compra
     4. la bandeja de firma y las alertas, que ya traen su acción preparada
   ============================================================================ */

window.PANTALLAS = window.PANTALLAS || {};

const _fmt = v => Math.round(v || 0).toLocaleString('es-VE');
const _mUSD = v => (v >= 1e6 ? (v / 1e6).toFixed(2) + ' M' : _fmt(v)) + ' USD';

/* Referencias cuya cobertura no alcanza a cubrir el tránsito: van a quebrar
   antes de que llegue la próxima reposición. */
function quiebreProyectado() {
  return CATALOGO.map(p => {
    const d = demandaSaneada(p.sku);
    const cob = d.mensual ? (STOCK_HUB[p.sku] || 0) / d.mensual : 99;
    return { p, cob, mensual: d.mensual, meses: p.leadDias / 30 };
  }).filter(x => x.mensual > 0 && x.cob < x.meses).sort((a, b) => a.cob - b.cob);
}

/* Referencias de la marca propia por debajo de su punto de reorden,
   agrupadas por fábrica: el pedido mínimo es POR FÁBRICA, no por producto. */
/* Se mide con EL MISMO cálculo que usa su mesa —completarMOQ— y no con un
   criterio propio del panel. Tener dos formas de contar lo mismo hacía que el
   panel dijera 10 referencias en 6 fábricas y la mesa 7 fábricas: dos cifras
   ciertas que nadie puede conciliar, y de las que en una sala se pregunta
   siempre por la que no cuadra. */
function cubittBajoReorden() {
  const porFab = {};
  for (const f of FABRICAS) {
    const b = completarMOQ(f.id);
    if (!b.hayNecesidad) continue;
    porFab[f.id] = b.skus.filter(p => (b.base[p.sku] || 0) > 0);
  }
  return porFab;
}

window.PANTALLAS.compras = function (lienzo, estado) {
  const t = turno();
  const mesa = datosDe('C-01') || { referencias: 0, conPropuesta: 0, monto: 0, props: [] };
  const sust = datosDe('C-03') || { casos: [], evita: 0 };
  const cinta = entradaDe('C-01');
  const techo = REGLAS.topeCompraMes.v;
  const exceso = mesa.monto - techo;
  const quiebres = quiebreProyectado();
  const porFab = cubittBajoReorden();
  const nFabricas = Object.keys(porFab).length;
  const nCubitt = Object.values(porFab).reduce((a, v) => a + v.length, 0);
  const sinFactura = TRANSITOS.filter(x => !x.docs.facturaNaviera);
  const diasAlCorte = 20 - HOY.dia;

  /* La bandeja sale del mismo helper que alimenta el contador del menú, para
     que no puedan discrepar. */
  const bandeja = bandejaDe('compras');

  lienzo.innerHTML = `
    <div class="lienzo-cab fila-sep">
      <div>
        <div class="sobretitulo">operación</div>
        <div class="titulo-seccion" style="margin-top:4px">compras</div>
      </div>
      <div class="fila gap-8">
        <span class="marca-estado e-neutro"><i class="punto"></i>${HOY.mes} ${HOY.anio}</span>
        <button class="btn btn-suave btn-mini" id="ir-mesa">abrir la mesa de compra →</button>
      </div>
    </div>

    <!-- 1 · la cinta del turno -->
    <div class="cinta" style="margin-bottom:20px">
      <span class="orbe hecho"></span>
      <span class="hora">${HOY.hora}</span>
      <div class="crece">${cinta ? cinta.salida.replace(/·/g, '·') : 'el turno no ha corrido'}</div>
      <button class="btn btn-fantasma btn-mini" id="ver-turno">ver el turno</button>
    </div>

    <!-- 2 · el reloj del ciclo -->
    <div class="panel" style="margin-bottom:20px">
      <div class="fila-sep">
        <div class="sobretitulo">ciclo de compra · ${HOY.mes}</div>
        <span class="apunte tenue" title="Secuencia propuesta, pendiente de confirmar con la dirección de compras">
          secuencia propuesta · por confirmar</span>
      </div>
      <div class="reloj mt-16">
        ${CICLO.map((h, i) => {
          const num = typeof h.dia === 'number' ? h.dia : null;
          const cls = num === null ? '' : num < HOY.dia ? 'pasado' : num === HOY.dia ? 'hoy' : '';
          const tramo = i < CICLO.length - 1
            ? `<div class="tramo ${num !== null && num < HOY.dia ? 'pasado' : ''}"></div>` : '';
          return `<div class="hito ${cls}"><span class="bolita"></span>
                    <span class="dia">${h.dia}</span><span class="que">${h.que}</span></div>${tramo}`;
        }).join('')}
      </div>
      <div class="sobretitulo mt-24" style="color:var(--n3)">
        faltan ${diasAlCorte} días para el corte del pedido
      </div>
    </div>

    <!-- 3 · el estado de los cuatro frentes de compra -->
    <div class="rejilla rejilla-4" style="margin-bottom:22px">

      <div class="tarjeta pulsable" data-va="mesa">
        <div class="fila-sep"><div class="sobretitulo">mesa de compra · Casio</div>
          <span class="sello sello-1"><i></i>preparé</span></div>
        <div class="cifra-grande mt-16">${_fmt(mesa.conPropuesta)}
          <span class="tenue" style="font-size:15px;font-weight:400">/ ${_fmt(mesa.referencias)}</span></div>
        <div class="apunte">referencias con propuesta de cantidad</div>
        <div class="apunte tenue mt-8">${_fmt(mesa.props.reduce((a, x) => a + x.necesidad, 0))} unidades</div>
      </div>

      <div class="tarjeta pulsable" data-va="techo">
        <div class="fila-sep"><div class="sobretitulo">techo del mes</div>
          ${exceso > 0 ? '<span class="marca-estado e-alerta"><i class="punto"></i>lo excede</span>'
                       : '<span class="marca-estado e-ok"><i class="punto"></i>dentro</span>'}</div>
        <div class="cifra-grande mt-16">${_mUSD(mesa.monto)}</div>
        <div class="apunte">contra un techo de ${_mUSD(techo)}</div>
        <div class="barra ${exceso > 0 ? 'parcial' : ''} mt-8">
          <span style="width:${Math.min(100, mesa.monto / techo * 100).toFixed(0)}%"></span></div>
        <div class="apunte tenue mt-8">${exceso > 0
          ? `excede en ${_mUSD(exceso)} · no se bloquea: entra en cola y muestra a qué desplaza`
          : 'queda margen contra la línea de crédito'}</div>
      </div>

      <div class="tarjeta pulsable" data-va="cubitt">
        <div class="fila-sep"><div class="sobretitulo">compra · Cubitt</div>
          <span class="sello sello-3"><i></i>tu firma</span></div>
        <div class="cifra-grande mt-16">${nCubitt}</div>
        <div class="apunte">referencias bajo el punto de reorden</div>
        <div class="apunte tenue mt-8">en ${nFabricas} fábricas · el pedido mínimo es por fábrica</div>
      </div>

      <div class="tarjeta pulsable" data-va="transitos">
        <div class="fila-sep"><div class="sobretitulo">tránsitos</div>
          ${sinFactura.length ? '<span class="marca-estado e-riesgo"><i class="punto"></i>documento</span>' : ''}</div>
        <div class="cifra-grande mt-16">${TRANSITOS.length}</div>
        <div class="apunte">embarques en camino</div>
        <div class="apunte tenue mt-8">${sinFactura.length
          ? `${sinFactura.length} sin factura de flete: su costo en destino no cierra`
          : 'todos con su documentación completa'}</div>
      </div>
    </div>

    <div class="rejilla" style="grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);align-items:start">

      <!-- 4 · la bandeja de firma -->
      <div>
        <div class="fila-sep" style="margin-bottom:12px">
          <div class="sobretitulo">esperan tu firma</div>
          <span class="apunte tenue">el agente hizo el trabajo; la decisión es tuya</span>
        </div>
        <div class="pila gap-12" id="bandeja">
          ${bandeja.map(e => {
            const ext = e.perimetro === 'externo';
            const sello = ext ? '<span class="sello sello-externo">↗ sale de Kenex</span>'
                              : `<span class="sello ${NIVELES[e.nivel].clase}"><i></i>${e.verbo}</span>`;
            /* El ámbito lo fija el módulo de la entrada: esta bandeja mezcla
               compras con distribución, y no es lo mismo firmar una que otra. */
            const amb = AMBITO_DE_MODULO[e.modulo] || 'compra';
            const boton = ext ? `<button class="btn btn-humano btn-mini" data-firma="${amb}">revisar y enviar</button>`
                              : `<button class="btn btn-marca btn-mini" data-firma="${amb}">revisar</button>`;
            return `<div class="firma ${ext ? '' : 'urge'}" data-id="${e.id}">
              <span class="orbe" style="margin-top:3px"></span>
              <div class="cuerpo">
                <div class="verbo">${e.accion.split(' · ')[1]}</div>
                <div class="detalle">${e.salida}</div>
              </div>
              <div class="acciones">${sello}${boton}</div>
            </div>`;
          }).join('') || (resumenAgentes().bloqueadas
            /* Una bandeja vacía por el freno NO es una bandeja limpia: decir
               «nada espera firma» con el sistema detenido sería mentir. */
            ? `<div class="vacio"><div class="icono">■</div>la bandeja está vacía porque el sistema
                 está detenido — ${resumenAgentes().bloqueadas} acciones bloqueadas, no resueltas</div>`
            : '<div class="vacio"><div class="icono">◇</div>nada espera firma</div>')}
        </div>
      </div>

      <!-- alertas que ya traen su acción preparada -->
      <div>
        <div class="fila-sep" style="margin-bottom:12px">
          <div class="sobretitulo">alertas con acción</div>
          <span class="apunte tenue">ninguna es una luz encendida sin destinatario</span>
        </div>
        <div class="pila gap-12">

          ${sust.casos.length ? `
          <div class="tarjeta">
            <div class="fila gap-8"><span class="orbe orbe-mini"></span>
              <b style="font-size:13px">ibas a comprar lo que ya tienes parado</b></div>
            <div class="apunte mt-8">
              <b>${sust.casos.length} líneas</b> recortadas ·
              <b>${_fmt(sust.casos.reduce((a, c) => a + c.traslada, 0))} u</b> que ya existen se trasladan
              en vez de comprarse · evita <b>${_mUSD(sust.evita)}</b> de compra.
            </div>
            <div class="pila gap-4 mt-8">
              ${sust.casos.slice(0, 3).map(c => `<div class="apunte tenue" style="font-size:11.5px">
                · ${c.nombre} — ${c.hay} u paradas en ${c.frente}, reservadas (${c.reserva})</div>`).join('')}
              ${sust.casos.length > 3 ? `<div class="apunte tenue" style="font-size:11.5px">· y ${sust.casos.length - 3} más</div>` : ''}
            </div>
            <div class="fila gap-8 mt-16">
              <button class="btn btn-marca btn-mini">ver el detalle</button>
              <span class="sello sello-3"><i></i>tu firma</span>
            </div>
          </div>` : ''}

          <div class="tarjeta">
            <div class="fila gap-8"><span class="orbe orbe-mini"></span>
              <b style="font-size:13px">quiebre proyectado antes de la próxima llegada</b></div>
            <div class="apunte mt-8">
              <b>${quiebres.length} referencias</b> con cobertura por debajo de su propio tránsito.
              Las líneas de compra ya están en la mesa.
            </div>
            <div class="pila gap-4 mt-8">
              ${quiebres.slice(0, 4).map(q => `<div class="fila gap-8" style="font-size:11.5px">
                <span class="crece tenue">· ${q.p.nombre}</span>
                <b style="color:var(--n3)">${q.cob.toFixed(1)} m</b>
                <span class="tenue">de ${q.meses.toFixed(1)} necesarios</span></div>`).join('')}
            </div>
            <div class="fila gap-8 mt-16">
              <button class="btn btn-suave btn-mini" id="ir-mesa-2">abrir la mesa</button>
            </div>
          </div>

          ${sinFactura.length ? `
          <div class="tarjeta">
            <div class="fila gap-8"><span class="orbe orbe-mini"></span>
              <b style="font-size:13px">el costo de estos embarques no cierra</b></div>
            <div class="apunte mt-8">
              ${sinFactura.map(t => t.id).join(' y ')} llegaron sin factura de flete.
              Sin ese documento, ni el valor del inventario ni el margen de la próxima compra valen.
            </div>
            <div class="fila gap-8 mt-16">
              <button class="btn btn-humano btn-mini">revisar el reclamo</button>
              <span class="sello sello-externo">↗ sale de Kenex</span>
            </div>
          </div>` : ''}

        </div>
      </div>
    </div>

    <p class="apunte tenue mt-24" style="max-width:820px;line-height:1.55">
      Ninguna cifra de esta pantalla está escrita a mano: todas salen del turno de noche del
      núcleo. ${exceso > 0
        ? `La propuesta de compra <b>excede el techo del mes en ${_mUSD(exceso)}</b> — y eso
           <b>no la bloquea</b>: entra en cola contra el techo y muestra a qué otra línea
           desplazaría.`
        : `La propuesta cabe dentro del techo del mes, con <b>${_mUSD(-exceso)}</b> de margen.`}
      Es la única conexión entre compras y finanzas, y tiene que existir o la mesa no es creíble
      para un director financiero.
    </p>`;

  /* --- comportamiento --- */
  const irMesa = () => { location.hash = '#/compras/casio'; };
  ['ir-mesa', 'ir-mesa-2'].forEach(id => { const b = lienzo.querySelector('#' + id); if (b) b.onclick = irMesa; });
  const vt = lienzo.querySelector('#ver-turno');
  if (vt) vt.onclick = () => { location.hash = '#/agentes'; };

  lienzo.querySelectorAll('.tarjeta[data-va]').forEach(c => c.onclick = () => {
    const destino = { mesa: '#/compras/casio', techo: '#/compras/casio', cubitt: '#/compras/cubitt', transitos: '#/compras/transitos' }[c.dataset.va];
    location.hash = destino;
  });
};
