/* ============================================================================
   EL SISTEMA — Pantalla: torre de bodega y recepción   · Fase 13 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   El problema que resuelve, dicho como se vive en la bodega: hasta que no baja
   y se ubica la ÚLTIMA caja de un contenedor, NADA de ese contenedor está
   disponible para vender — aunque el 99 % ya esté colocado. Con contenedores
   de 1.800 cajas y descargas de varios días, eso es mercancía comprada,
   pagada, físicamente presente y comercialmente inexistente.

   Aquí la liberación es POR REFERENCIA: en cuanto la última caja de un
   producto queda ubicada, ese producto se puede vender aunque el contenedor
   siga abierto. Con un candado — las preventas comprometidas se amarran
   primero, que es exactamente por lo que hoy la interfaz se mantiene manual.
   ============================================================================ */

window.PANTALLAS = window.PANTALLAS || {};

const _log = { liberadas: {}, abierta: null };

/* Etapas por las que pasa una línea dentro de la bodega. El conteo NO está
   escrito a mano: sale de las líneas de los pedidos de los frentes, repartidas
   de forma estable por su referencia y su destino. En un sistema donde nada
   más está inventado, cinco cifras inventadas se notan. */
const ETAPAS_BODEGA = ['recibo', 'piqueo', 'packing', 'stage', 'despacho'];

function lineasPorEtapa() {
  const cuenta = Object.fromEntries(ETAPAS_BODEGA.map(e => [e, 0]));
  for (const ped of PEDIDOS) {
    for (const l of ped.lineas) {
      let h = 0;
      for (const c of (l.sku + ped.frente)) h = (h * 31 + c.charCodeAt(0)) >>> 0;
      cuenta[ETAPAS_BODEGA[h % ETAPAS_BODEGA.length]]++;
    }
  }
  return cuenta;
}

window.PANTALLAS.logistica = function (lienzo) {
  const n = v => Math.round(v || 0).toLocaleString('es-VE');
  const r = RECEPCION;
  if (!r || !r.lineas || !r.lineas.length) {
    lienzo.innerHTML = `<div class="lienzo-cab"><div class="sobretitulo">operación</div>
      <div class="titulo-seccion" style="margin-top:4px">logística e inventarios</div></div>
      <div class="vacio"><div class="icono">◇</div>ningún contenedor en recepción ahora mismo</div>`;
    return;
  }
  const emb = TRANSITOS.find(t => t.id === r.embarque);
  const ubicadas = r.lineas.reduce((a, l) => a + l.ubicadas, 0);
  const avance = ubicadas / r.cajasTotal;

  const lista = r.lineas.map(l => {
    const p = CATALOGO.find(x => x.sku === l.sku) || { nombre: l.sku, img: '', uxc: l.uxc };
    const completa = l.ubicadas >= l.cajas;
    const uUbicadas = l.ubicadas * l.uxc;
    return {
      l, p, completa, uUbicadas,
      libre: Math.max(0, uUbicadas - l.preventa),
      liberada: !!_log.liberadas[l.sku],
      pct: l.ubicadas / l.cajas,
    };
  });

  const liberables = lista.filter(x => x.completa && !x.liberada);
  const yaLiberadas = lista.filter(x => x.liberada);
  const uBloqueadas = lista.filter(x => !x.completa).reduce((a, x) => a + x.uUbicadas, 0);

  lienzo.innerHTML = `
    <div class="lienzo-cab fila-sep">
      <div>
        <div class="sobretitulo">operación</div>
        <div class="titulo-seccion" style="margin-top:4px">logística e inventarios</div>
      </div>
      <div class="fila gap-8">
        <span class="marca-estado e-neutro"><i class="punto"></i>Zona Libre de Colón</span>
        <button class="btn btn-suave btn-mini" id="ir-salud">salud de inventario →</button>
      </div>
    </div>

    <div class="cinta" style="margin-bottom:20px">
      <span class="orbe ${liberables.length ? 'actuando' : 'hecho'}"></span><span class="hora">${HOY.hora}</span>
      <div class="crece">${liberables.length
        ? `${liberables.length} referencia${liberables.length > 1 ? 's' : ''} del contenedor
           <b>${r.embarque}</b> ya tiene${liberables.length > 1 ? 'n' : ''} su última caja ubicada:
           <b>puede${liberables.length > 1 ? 'n' : ''} venderse sin esperar a que cierre el contenedor</b>`
        : `todo lo ubicado del contenedor <b>${r.embarque}</b> ya está liberado a la venta`}</div>
    </div>

    <div class="rejilla rejilla-4" style="margin-bottom:22px">
      <div class="tarjeta"><div class="kpi"><div class="rotulo">descarga del contenedor</div>
        <div class="valor">${(avance * 100).toFixed(0)} %</div>
        <div class="pie">${n(ubicadas)} de ${n(r.cajasTotal)} cajas ubicadas</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">listas para liberar</div>
        <div class="valor texto-marca">${liberables.length}</div>
        <div class="pie">con su última caja ya ubicada</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">bloqueadas por el resto</div>
        <div class="valor" style="color:${uBloqueadas ? 'var(--n3)' : 'inherit'}">${n(uBloqueadas)}</div>
        <div class="pie">unidades en el piso que hoy no se pueden vender</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">preventa comprometida</div>
        <div class="valor">${n(r.preventaTotal)}</div>
        <div class="pie">unidades que se amarran antes de liberar</div></div></div>
    </div>

    <!-- el contenedor en recepción -->
    <div class="panel" style="margin-bottom:22px">
      <div class="fila-sep">
        <div>
          <div class="fila gap-8"><b style="font-size:14.5px" class="mono">${r.embarque}</b>
            <span class="marca-estado e-neutro">en recepción</span></div>
          <div class="apunte tenue mt-8">${r.prov} · ${emb ? emb.origen : ''} → Colón ·
            ${n(r.cajasTotal)} cajas · ${r.lineas.length} referencias</div>
        </div>
        <div style="text-align:right">
          <div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">avance</div>
          <div class="cifra-media">${n(ubicadas)} / ${n(r.cajasTotal)}</div>
        </div>
      </div>
      <div class="barra ${avance < 1 ? 'parcial' : ''} mt-16" style="height:11px">
        <span style="width:${(avance * 100).toFixed(1)}%"></span></div>

      <div class="apunte mt-16" style="max-width:840px">
        <b>Hoy, hasta que no baja la última caja del contenedor, no se vende nada de él.</b>
        Con ${n(r.cajasTotal)} cajas y varios días de descarga, eso son
        <b>${n(uBloqueadas)} unidades</b> compradas, pagadas y en el piso que comercialmente no
        existen. La liberación por referencia rompe ese todo-o-nada.
      </div>

      <div class="tabla-envoltura mt-16" style="max-height:none;border-radius:14px">
        <table class="tabla">
          <thead><tr>
            <th>referencia</th><th style="min-width:150px">cajas ubicadas</th>
            <th class="num">unidades</th><th class="num">preventa</th>
            <th class="num">libre para vender</th><th>estado</th><th></th>
          </tr></thead>
          <tbody id="filas-rec"></tbody>
        </table>
      </div>
    </div>

    <!-- la bodega, por etapa -->
    <div class="panel">
      <div class="fila-sep">
        <div class="sobretitulo">líneas en la bodega</div>
        <span class="apunte tenue">de los pedidos de los frentes ya asignados</span>
      </div>
      <div class="fila gap-12 mt-16" style="align-items:stretch">
        ${(() => { const c = lineasPorEtapa(); return ETAPAS_BODEGA.map((e, i) => `
          <div class="tarjeta crece" style="padding:14px 16px">
            <div class="sobretitulo">${e}</div>
            <div class="cifra-grande mt-8">${c[e]}</div>
            <div class="apunte tenue">líneas</div>
          </div>
          ${i < ETAPAS_BODEGA.length - 1 ? '<span class="apunte tenue" style="align-self:center">→</span>' : ''}
        `).join(''); })()}
      </div>
    </div>

    <p class="apunte tenue mt-24" style="max-width:840px;line-height:1.55">
      La liberación por referencia lleva un candado, y es el mismo por el que hoy esta interfaz se
      mantiene <b>manual a propósito</b>: si se libera sin amarrar antes las preventas
      comprometidas, la mercancía queda libre y otro vendedor se la lleva antes de que quien la
      prevendió pueda confirmarla. Por eso el sistema <b>reserva la preventa primero</b> y solo
      libera el remanente — y por eso esta acción pide firma en vez de ejecutarse sola.
    </p>`;

  const cuerpo = lienzo.querySelector('#filas-rec');

  function pinta() {
    cuerpo.innerHTML = lista.map(x => `<tr class="${x.liberada ? 'marcada' : ''}">
      <td><div class="producto">
        <img class="foto" src="img/${x.p.img}" alt="" loading="lazy">
        <div class="txt"><div class="nom">${x.p.nombre}</div><div class="sub">${x.l.sku}</div></div>
      </div></td>
      <td>
        <div class="barra ${x.completa ? '' : 'parcial'}"><span style="width:${(x.pct * 100).toFixed(0)}%"></span></div>
        <div class="apunte tenue" style="font-size:10.5px;margin-top:3px">${n(x.l.ubicadas)} / ${n(x.l.cajas)} · ${x.l.uxc} u por caja</div>
      </td>
      <td class="num">${n(x.uUbicadas)}</td>
      <td class="num ${x.l.preventa ? '' : 'tenue'}">${x.l.preventa ? n(x.l.preventa) : '—'}</td>
      <td class="num"><b>${n(x.libre)}</b></td>
      <td>${x.liberada
        ? '<span class="marca-estado e-ok"><i class="punto"></i>liberada a la venta</span>'
        : x.completa
          ? '<span class="marca-estado e-alerta"><i class="punto"></i>lista, sin liberar</span>'
          : '<span class="marca-estado e-neutro"><i class="punto"></i>descargando</span>'}</td>
      <td>${x.completa && !x.liberada
        ? `<button class="btn btn-marca btn-mini" data-lib="${x.l.sku}">liberar</button>`
        : x.liberada ? '<span class="sello sello-2"><i></i>hice</span>' : '<span class="tenue">—</span>'}</td>
    </tr>`).join('');

    cuerpo.querySelectorAll('[data-lib]').forEach(b => b.onclick = () => {
      const sku = b.dataset.lib;
      const x = lista.find(y => y.l.sku === sku);
      /* Liberar no es marcar una casilla: las unidades ENTRAN a la existencia
         del hub y desde ese momento se pueden vender y reparten. Sin esto la
         acción decía «disponibles para la venta» y nada quedaba disponible. */
      _log.liberadas[sku] = true;
      STOCK_HUB[sku] = (STOCK_HUB[sku] || 0) + x.libre;
      if (x.l.preventa) reserva(sku, 'ZLC', x.l.preventa, 'preventa comprometida', 'amarrada antes de liberar');
      _memoTransito = null;
      /* Liberar es escritura interna reversible, pero además ESCRIBE en los
         recolectores de los frentes: por eso lleva presupuesto y se degrada
         sola si se pasa del tope por contenedor. */
      const supera = x.libre > REGLAS.presupuestoLiberar.v;
      anota({
        accion: 'L-01 · liberar una referencia sin cerrar el contenedor',
        agente: 'recepción', modulo: 'logistica',
        dispara: `se ubicó la última caja de ${x.p.nombre} en ${r.embarque}`,
        salida: `${n(x.libre)} u de ${x.p.nombre} entran a la existencia del hub y quedan vendibles sin esperar al contenedor` +
                (x.l.preventa ? ` · ${n(x.l.preventa)} u amarradas antes como preventa comprometida` : '') +
                (supera ? ` · supera el presupuesto de ${REGLAS.presupuestoLiberar.v} u por contenedor: pide firma` : ''),
        ejes: {
          perimetro: 'interno',
          reversibilidad: supera ? 'humana' : 'clic',
          radio: 'frente', dinero: 'ninguno', reloj: 'alcanza',
        },
        cruza: 'comercial',
        reglas: ['presupuestoLiberar'],
      });
      viajaEstela(['logistica', 'comercial']);
      setTimeout(() => window.PANTALLAS.logistica(lienzo), 700);
    });
  }

  const bs = lienzo.querySelector('#ir-salud');
  if (bs) bs.onclick = () => { location.hash = '#/logistica/inventario'; };

  pinta();
};
