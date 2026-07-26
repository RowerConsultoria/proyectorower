/* ============================================================================
   EL SISTEMA — Pantalla: salud de inventario           · Fase 14 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   La respuesta a la frase del diagnóstico: «está bellísimo, ¿pero quién lo
   analiza, quién lo revisa, quién actúa?».

   Aquí NINGUNA alerta es una luz encendida. Cada línea llega con la acción ya
   preparada, sus unidades calculadas, su destinatario y las dos cifras sin las
   cuales no se puede decidir: cuánto cuesta hacerlo y cuánta venta desbloquea.
   Un tablero que solo colorea celdas traslada el trabajo a quien lo mira.
   ============================================================================ */

window.PANTALLAS = window.PANTALLAS || {};

const _inv = { clase: 'accionable', aplicadas: {} };

const CLASES = {
  quiebre:    { r: 'quiebre',    color: 'var(--riesgo)', accion: 'reponer' },
  sano:       { r: 'sano',       color: 'var(--ok)',     accion: null },
  sobrestock: { r: 'sobrestock', color: 'var(--alerta)', accion: 'promocionar' },
  parado:     { r: 'parado',     color: 'var(--tinta-tenue)', accion: 'mover o liquidar' },
};

/* A quién le llega cada acción. Una alerta sin destinatario no es una acción. */
const DESTINATARIO = {
  traslado: 'operaciones y logística',
  promocion: 'gerencia comercial',
  liquidacion: 'gerencia comercial',
  compra: 'dirección de compras',
};

window.PANTALLAS['logistica/inventario'] = function (lienzo) {
  const n = v => Math.round(v || 0).toLocaleString('es-VE');
  const s = saludInventario();
  const rebal = propuestasRebalanceo();
  const total = Object.values(s.porClase).reduce((a, c) => a + c.valor, 0);
  const nm = u => u.frente || u.nombre;

  const parados = s.filas.filter(f => f.clase === 'parado').sort((a, b) => b.valor - a.valor);
  const sobre = s.filas.filter(f => f.clase === 'sobrestock').sort((a, b) => b.valor - a.valor);
  const quiebres = s.filas.filter(f => f.clase === 'quiebre').sort((a, b) => a.cobertura - b.cobertura);
  const inmovilizado = parados.reduce((a, f) => a + f.valor, 0);

  const desbloquea = rebal.reduce((a, x) => a + x.ventaDesbloqueada, 0);
  const cuesta = rebal.reduce((a, x) => a + x.costoTraslado, 0);
  const aplicadas = Object.keys(_inv.aplicadas).length;

  lienzo.innerHTML = `
    <div class="lienzo-cab fila-sep">
      <div>
        <div class="sobretitulo">operación · logística e inventarios</div>
        <div class="titulo-seccion" style="margin-top:4px">salud de inventario</div>
      </div>
      <button class="btn btn-fantasma btn-mini" id="ir-recepcion">← recepción</button>
    </div>

    <div class="cinta" style="margin-bottom:20px">
      <span class="orbe hecho"></span><span class="hora">${HOY.hora}</span>
      <div class="crece">revisé <b>${s.filas.length} líneas</b> de inventario en
        <b>${s.ubicaciones.length} ubicaciones</b> y preparé <b>${rebal.length} traslados</b>:
        cuestan <b>${n(cuesta)} USD</b> y desbloquean <b>${n(desbloquea)} USD</b> de venta.
        Cada uno con su destinatario</div>
      ${aplicadas ? `<span class="marca-estado e-ok"><i class="punto"></i>${aplicadas} aplicad${aplicadas > 1 ? 'os' : 'o'}</span>` : ''}
    </div>

    <div class="rejilla rejilla-4" style="margin-bottom:22px">
      <div class="tarjeta"><div class="kpi"><div class="rotulo">inventario inmovilizado</div>
        <div class="valor" style="color:${inmovilizado ? 'var(--n3)' : 'inherit'}">${n(inmovilizado)}</div>
        <div class="pie">USD sin una venta en ${REGLAS.mesesParaOcioso.v} meses</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">en quiebre</div>
        <div class="valor" style="color:var(--riesgo)">${quiebres.length}</div>
        <div class="pie">líneas por debajo de medio mes de cobertura</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">traslados preparados</div>
        <div class="valor texto-marca">${rebal.length}</div>
        <div class="pie">${n(rebal.reduce((a, x) => a + x.mover, 0))} unidades que ya existen</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">venta que desbloquean</div>
        <div class="valor">${n(desbloquea)}</div>
        <div class="pie">USD, por ${n(cuesta)} de traslado — ${(desbloquea / (cuesta || 1)).toFixed(0)}× lo que cuesta</div></div></div>
    </div>

    <!-- cómo está repartido el inventario -->
    <div class="panel" style="margin-bottom:22px">
      <div class="fila-sep">
        <div class="sobretitulo">dónde está el valor del inventario</div>
        <span class="apunte tenue">umbrales relativos al objetivo de cada sitio ·
          sobrestock desde ${REGLAS.sobrestockDesde.v}× · parado desde ${REGLAS.paradoDesde.v}× ·
          dueño: ${REGLAS.paradoDesde.dueno}</span>
      </div>
      <div class="barra mt-16" style="height:14px;display:flex;padding:0;overflow:hidden">
        ${['quiebre', 'sano', 'sobrestock', 'parado'].map(k => {
          const c = s.porClase[k]; if (!c) return '';
          return `<span title="${CLASES[k].r}: ${n(c.valor)} USD"
            style="width:${(c.valor / total * 100).toFixed(1)}%;background:${CLASES[k].color};border-radius:0"></span>`;
        }).join('')}
      </div>
      <div class="fila gap-24 mt-16" style="flex-wrap:wrap">
        ${['quiebre', 'sano', 'sobrestock', 'parado'].map(k => {
          const c = s.porClase[k]; if (!c) return '';
          return `<div class="fila gap-8" style="font-size:12px">
            <i style="width:10px;height:10px;border-radius:3px;background:${CLASES[k].color};flex:none"></i>
            <b>${CLASES[k].r}</b>
            <span class="tenue">${c.filas} líneas · ${n(c.valor)} USD · ${(c.valor / total * 100).toFixed(0)} %</span>
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- las acciones preparadas -->
    <div class="fila-sep" style="margin-bottom:12px">
      <div class="sobretitulo">acciones preparadas</div>
      <div class="fila gap-8" id="filtros-inv">
        ${[['accionable', 'con acción', rebal.length + parados.length + sobre.length],
           ['traslado', 'traslados', rebal.length],
           ['parado', 'parado', parados.length],
           ['sobrestock', 'sobrestock', sobre.length],
           ['quiebre', 'quiebre', quiebres.length]].map(([k, t, c]) =>
          `<span class="chip ${_inv.clase === k ? 'on' : ''}" data-c="${k}">${t} <span class="n">${c}</span></span>`).join('')}
      </div>
    </div>

    <div class="pila gap-12" id="acciones"></div>

    <p class="apunte tenue mt-24" style="max-width:840px;line-height:1.55">
      Cada línea trae <b>cuánto cuesta</b> y <b>cuánta venta desbloquea</b>, porque sin esas dos
      cifras una alerta no se puede decidir: solo mirar. Y trae destinatario, porque una alerta
      que no llega a nadie es la que produce la pregunta del diagnóstico —
      <i>«está bellísimo, ¿pero quién actúa?»</i>.
    </p>`;

  const caja = lienzo.querySelector('#acciones');

  function tarjetaTraslado(x, i) {
    const clave = 'T' + i;
    const hecha = _inv.aplicadas[clave];
    return `<div class="tarjeta">
      <div class="fila-sep">
        <div class="fila gap-12">
          <img src="img/${x.p.img}" alt="" style="width:40px;height:40px;border-radius:13px;object-fit:cover;
               background:var(--panel-alto);border:1px solid var(--borde)">
          <div>
            <div class="fila gap-8"><b style="font-size:13.5px">${x.p.nombre}</b>
              <span class="marca-estado e-neutro">traslado</span>
              ${hecha ? '<span class="marca-estado e-ok"><i class="punto"></i>aplicado</span>' : ''}</div>
            <div class="apunte tenue mt-8">
              <b>${n(x.mover)} u</b> de ${nm(x.origen.ubicacion)}
              <span style="color:var(--menta)">→</span> ${nm(x.destino.ubicacion)} ·
              allí quedan ${x.destino.cobertura.toFixed(1)} meses de cobertura y el objetivo es ${x.destino.objetivo.toFixed(1)}
            </div>
          </div>
        </div>
        <div class="fila gap-16" style="text-align:right">
          <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">cuesta</div>
            <div class="cifra-media">${n(x.costoTraslado)}</div></div>
          <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">desbloquea</div>
            <div class="cifra-media texto-marca">${n(x.ventaDesbloqueada)}</div></div>
        </div>
      </div>
      <div class="fila-sep mt-16">
        <span class="apunte tenue">para <b>${DESTINATARIO.traslado}</b> ·
          ${x.origen.quieto ? `sin una venta en ${REGLAS.mesesParaOcioso.v} meses en el origen`
                            : `el origen queda en ${((x.origen.u - x.mover) / (x.origen.mensual || 1)).toFixed(1)} meses`}</span>
        <div class="fila gap-8">
          <span class="sello sello-3"><i></i>tu firma</span>
          ${hecha ? '<span class="sello sello-2"><i></i>hice</span>'
                  : `<button class="btn btn-marca btn-mini" data-t="${clave}" data-i="${i}">aplicar el traslado</button>`}
        </div>
      </div>
    </div>`;
  }

  function tarjetaLinea(f, tipo) {
    const esParado = tipo === 'parado';
    const accion = esParado ? 'liquidar o mover' : 'promocionar';
    const dest = esParado ? DESTINATARIO.liquidacion : DESTINATARIO.promocion;
    return `<div class="tarjeta">
      <div class="fila-sep">
        <div class="fila gap-12">
          <img src="img/${f.p.img}" alt="" style="width:36px;height:36px;border-radius:12px;object-fit:cover;
               background:var(--panel-alto);border:1px solid var(--borde)">
          <div>
            <div class="fila gap-8"><b style="font-size:13px">${f.p.nombre}</b>
              <span class="marca-estado ${esParado ? 'e-neutro' : 'e-alerta'}"><i class="punto"></i>${CLASES[tipo].r}</span></div>
            <div class="apunte tenue mt-8">${n(f.u)} u en ${nm(f.ubicacion)} ·
              ${f.quieto ? `<b style="color:var(--n3)">sin una venta en ${REGLAS.mesesParaOcioso.v} meses</b>`
                         : `${f.cobertura.toFixed(1)} meses de cobertura contra un objetivo de ${f.objetivo.toFixed(1)}`}</div>
          </div>
        </div>
        <div style="text-align:right">
          <div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">inmovilizado</div>
          <div class="cifra-media">${n(f.valor)}</div>
        </div>
      </div>
      <div class="fila-sep mt-16">
        <span class="apunte tenue">para <b>${dest}</b></span>
        <div class="fila gap-8">
          <span class="sello sello-1"><i></i>preparé</span>
          <button class="btn btn-suave btn-mini">${accion}</button>
        </div>
      </div>
    </div>`;
  }

  function tarjetaQuiebre(f) {
    return `<div class="tarjeta">
      <div class="fila-sep">
        <div class="fila gap-12">
          <img src="img/${f.p.img}" alt="" style="width:36px;height:36px;border-radius:12px;object-fit:cover;
               background:var(--panel-alto);border:1px solid var(--borde)">
          <div>
            <div class="fila gap-8"><b style="font-size:13px">${f.p.nombre}</b>
              <span class="marca-estado e-riesgo"><i class="punto"></i>quiebre</span></div>
            <div class="apunte tenue mt-8">${n(f.u)} u en ${nm(f.ubicacion)} ·
              ${f.cobertura.toFixed(1)} meses · se agota en ${Math.round(f.cobertura * 30)} días</div>
          </div>
        </div>
        <div style="text-align:right">
          <div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">venta mensual</div>
          <div class="cifra-media">${n(f.mensual)}</div>
        </div>
      </div>
      <div class="fila-sep mt-16">
        <span class="apunte tenue">para <b>${DESTINATARIO.compra}</b> · la línea ya está en la mesa del mes</span>
        <button class="btn btn-suave btn-mini" data-mesa="1">ver en la mesa →</button>
      </div>
    </div>`;
  }

  function pinta() {
    let html = '';
    if (_inv.clase === 'accionable') {
      html = rebal.map(tarjetaTraslado).join('')
           + parados.map(f => tarjetaLinea(f, 'parado')).join('')
           + sobre.map(f => tarjetaLinea(f, 'sobrestock')).join('');
    } else if (_inv.clase === 'traslado') html = rebal.map(tarjetaTraslado).join('');
    else if (_inv.clase === 'parado') html = parados.map(f => tarjetaLinea(f, 'parado')).join('');
    else if (_inv.clase === 'sobrestock') html = sobre.map(f => tarjetaLinea(f, 'sobrestock')).join('');
    else html = quiebres.slice(0, 12).map(tarjetaQuiebre).join('');

    caja.innerHTML = html || '<div class="vacio"><div class="icono">◇</div>nada en esta categoría</div>';

    caja.querySelectorAll('[data-t]').forEach(b => b.onclick = () => {
      const x = rebal[+b.dataset.i];
      _inv.aplicadas[b.dataset.t] = true;
      /* Un traslado mueve mercancía de verdad: sale de un sitio y entra en otro.
         Si la pantalla dice que desbloquea venta, la existencia tiene que
         moverse — si no, es una animación. */
      if (x.origen.ubicacion.central) STOCK_HUB[x.sku] -= x.mover;
      else STOCK_FRENTE[x.sku][x.origen.ubicacion.id] -= x.mover;
      if (x.destino.ubicacion.central) STOCK_HUB[x.sku] = (STOCK_HUB[x.sku] || 0) + x.mover;
      else STOCK_FRENTE[x.sku][x.destino.ubicacion.id] += x.mover;

      anota({
        accion: 'L-05 · trasladar existencia parada a donde falta',
        agente: 'rebalanceo', modulo: 'logistica',
        dispara: `${x.p.nombre} sin rotación en ${nm(x.origen.ubicacion)} y en quiebre en ${nm(x.destino.ubicacion)}`,
        salida: `${n(x.mover)} u movidas de ${nm(x.origen.ubicacion)} a ${nm(x.destino.ubicacion)} · ` +
                `cuesta ${n(x.costoTraslado)} USD y desbloquea ${n(x.ventaDesbloqueada)} USD de venta`,
        ejes: { perimetro: 'interno', reversibilidad: 'humana', radio: 'mercancia', dinero: 'ninguno', reloj: 'alcanza' },
        cruza: 'comercial',
        reglas: ['sobrestockDesde', 'paradoDesde', 'mesesParaOcioso'],
      });
      viajaEstela(['logistica', 'comercial']);
      setTimeout(() => window.PANTALLAS['logistica/inventario'](lienzo), 800);
    });
    caja.querySelectorAll('[data-mesa]').forEach(b => b.onclick = () => { location.hash = '#/compras/casio'; });
  }

  lienzo.querySelectorAll('#filtros-inv .chip').forEach(c => c.onclick = () => {
    _inv.clase = c.dataset.c; window.PANTALLAS['logistica/inventario'](lienzo);
  });
  lienzo.querySelector('#ir-recepcion').onclick = () => { location.hash = '#/logistica'; };

  pinta();
};
