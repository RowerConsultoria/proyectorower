/* ============================================================================
   EL SISTEMA — Pantalla: cierre del pedido            · Fase 8 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   El último paso antes de que una persona firme. Tres cosas que tienen que
   estar a la vista y hoy no lo están:

     1. El TECHO DEL MES contra la línea de crédito. Si la compra lo excede no
        se bloquea: entra en cola y se ve exactamente qué líneas quedan fuera
        y cuánto habría que ampliar. Es la única conexión con finanzas.
     2. El SPLIT POR RAZÓN SOCIAL. Del mismo archivo salen dos pedidos, y ese
        reparto es una restricción dura que hoy se resuelve a mano.
     3. El PERÍMETRO EXTERNO. Esto sale de Kenex: plantilla aprobada,
        destinatario a la vista y remitente con nombre. El agente redacta;
        el sobre lo firma una persona.

   El botón de enviar NO lleva gradiente. Es un botón humano, y esa diferencia
   se lee sin que nadie la explique.
   ============================================================================ */

window.PANTALLAS = window.PANTALLAS || {};

/* Cuánto pesa el frente de Venezuela en la demanda de una referencia. Sirve
   para decidir el orden en que se asignan las líneas a cada razón social:
   lo que Venezuela demanda más, se compra por su entidad primero. */
function cuotaVE(sku) {
  const v = VENTAS[sku] || {};
  const total = Object.values(v).reduce((a, s) => a + s.reduce((x, y) => x + y, 0), 0) || 1;
  return (v.VE || []).reduce((a, b) => a + b, 0) / total;
}

/**
 * El split por razón social NO lo decide la demanda: lo decide la CUOTA que
 * el fabricante impone a cada entidad. El sistema asigna las líneas
 * respetándola, empezando por las que más demanda Venezuela — que son las que
 * naturalmente le tocan a esa entidad — hasta llenar su cuota.
 */
function _lineasDelPedido() {
  const base = CATALOGO.filter(p => p.marca === 'Casio')
    .map(_filaDatos)
    .filter(f => f.humana > 0)
    .map(f => ({ ...f, costo: f.humana * f.p.pvp * 0.42, urgencia: f.prop.cobertura }));

  const total = base.reduce((a, l) => a + l.costo, 0);
  const topeRower = total * REGLAS.cuotaRazonSocial.v['Distribuidora Rower'];

  let acumRower = 0;
  [...base].sort((a, b) => cuotaVE(b.p.sku) - cuotaVE(a.p.sku)).forEach(l => {
    if (acumRower + l.costo <= topeRower) { l.razon = 'Distribuidora Rower'; acumRower += l.costo; }
    else { l.razon = 'Kenex Trading'; }
  });

  return base.sort((a, b) => a.urgencia - b.urgencia);   // menos cobertura, más urgente
}

function _csv(lineas, razon) {
  const filas = lineas.filter(l => l.razon === razon);
  const cab = ['ORDER SHEET', HOY.mes.toUpperCase() + ' ' + HOY.anio, razon].join(' · ');
  const cuerpo = [['MODEL', 'DESCRIPTION', 'QTY', 'INTERNAL REF'].join(',')]
    .concat(filas.map(l => [l.p.ref, '"' + l.p.nombre + '"', l.humana, l.p.sku].join(',')));
  return cab + '\n' + cuerpo.join('\n');
}

function _baja(nombre, texto) {
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(texto);
  a.download = nombre;
  a.click();
}

window.PANTALLAS['compras/cierre'] = function (lienzo) {
  const lineas = _lineasDelPedido();
  const techo = REGLAS.topeCompraMes.v;

  /* La cola contra el techo: se acumula por urgencia y se ve dónde cae el corte. */
  let acum = 0;
  lineas.forEach(l => { acum += l.costo; l.acumulado = acum; l.enCola = acum > techo; });
  const total = acum;
  const enCola = lineas.filter(l => l.enCola);
  const exceso = Math.max(0, total - techo);
  const totU = lineas.reduce((a, l) => a + l.humana, 0);

  /* Cuánta venta cubre esta compra: más útil que compararla con un mes anterior
     que nadie recuerda. */
  const demandaMes = CATALOGO.filter(p => p.marca === 'Casio')
    .reduce((a, p) => a + demandaSaneada(p.sku).mensual, 0);
  const mesesQueCompra = demandaMes ? totU / demandaMes : 0;

  const porLinea = {};
  for (const l of lineas) {
    const k = l.p.linea;
    porLinea[k] = porLinea[k] || { refs: 0, u: 0, usd: 0 };
    porLinea[k].refs++; porLinea[k].u += l.humana; porLinea[k].usd += l.costo;
  }
  const razones = ['Kenex Trading', 'Distribuidora Rower'].map(r => ({
    nombre: r,
    refs: lineas.filter(l => l.razon === r).length,
    u: lineas.filter(l => l.razon === r).reduce((a, l) => a + l.humana, 0),
    usd: lineas.filter(l => l.razon === r).reduce((a, l) => a + l.costo, 0),
  }));

  const n = v => Math.round(v).toLocaleString('es-VE');

  lienzo.innerHTML = `
    <div class="lienzo-cab fila-sep">
      <div>
        <div class="sobretitulo">compras · ciclo de ${HOY.mes} ${HOY.anio}</div>
        <div class="titulo-seccion" style="margin-top:4px">cierre del pedido</div>
      </div>
      <button class="btn btn-fantasma btn-mini" id="volver-mesa">← volver a la mesa</button>
    </div>

    <div class="rejilla rejilla-4" style="margin-bottom:20px">
      <div class="tarjeta"><div class="kpi"><div class="rotulo">unidades</div>
        <div class="valor">${n(totU)}</div><div class="pie">${lineas.length} referencias</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">monto estimado</div>
        <div class="valor">${(total / 1e6).toFixed(2)} M</div><div class="pie">USD, costo estimado</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">cobertura que añade</div>
        <div class="valor">+${mesesQueCompra.toFixed(1)} m</div>
        <div class="pie">de venta, sobre la existencia que ya hay</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">del techo del mes</div>
        <div class="valor" style="color:${total > techo ? 'var(--n3)' : 'var(--tinta)'}">${(total / techo * 100).toFixed(0)} %</div>
        <div class="pie">techo: ${n(techo)} USD</div></div></div>
    </div>

    <!-- el techo y la cola -->
    <div class="panel" style="margin-bottom:20px">
      <div class="fila-sep">
        <div class="sobretitulo">techo del mes contra la línea de crédito</div>
        <span class="apunte tenue">lo fija finanzas · versión ${REGLAS.topeCompraMes.ver}</span>
      </div>
      <div class="barra ${total > techo ? 'parcial' : ''} mt-16" style="height:12px">
        <span style="width:${Math.min(100, total / techo * 100).toFixed(1)}%"></span></div>
      <div class="fila-sep mt-8">
        <span class="apunte">${n(total)} USD comprometidos</span>
        <span class="apunte tenue">techo ${n(techo)} USD</span>
      </div>

      ${exceso > 0 ? `
      <div class="bloqueo mt-16">
        <div class="fila gap-8"><span class="orbe orbe-mini"></span>
          <b style="font-size:13px">la compra excede el techo en ${n(exceso)} USD</b></div>
        <div class="apunte mt-8">
          <b>No se bloquea.</b> Las líneas se ordenaron por urgencia —menos cobertura primero— y
          <b>${enCola.length} quedan en cola</b> por debajo del corte. Se puede recortar hasta el
          techo, o pedir a finanzas una ampliación de <b>${n(exceso)} USD</b>.
        </div>
        <div class="pila gap-4 mt-16">
          ${enCola.slice(0, 5).map(l => `<div class="fila gap-8" style="font-size:11.5px">
            <span class="crece tenue">· ${l.p.nombre}</span>
            <span class="tenue">${n(l.humana)} u</span>
            <b>${n(l.costo)} USD</b>
            <span style="color:var(--n3)">${l.urgencia.toFixed(1)} m de cobertura</span></div>`).join('')}
          ${enCola.length > 5 ? `<div class="apunte tenue" style="font-size:11.5px">· y ${enCola.length - 5} líneas más</div>` : ''}
        </div>
        <div class="fila gap-8 mt-16">
          <button class="btn btn-suave btn-mini" id="recortar">recortar hasta el techo</button>
          <button class="btn btn-suave btn-mini" id="ampliar">pedir ampliación a finanzas</button>
        </div>
      </div>` : `
      <div class="apunte tenue mt-16">La compra cabe dentro del techo, con ${n(techo - total)} USD de margen.</div>`}
    </div>

    <div class="rejilla" style="grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;margin-bottom:20px">

      <!-- resumen por línea -->
      <div class="panel">
        <div class="sobretitulo">por línea de producto</div>
        <div class="tabla-envoltura mt-16" style="max-height:280px;border-radius:14px">
          <table class="tabla">
            <thead><tr><th>línea</th><th class="num">refs.</th><th class="num">unidades</th><th class="num">USD</th></tr></thead>
            <tbody>${Object.entries(porLinea).sort((a, b) => b[1].usd - a[1].usd).map(([k, v]) =>
              `<tr><td><span class="marca-estado e-neutro">${k}</span></td>
                   <td class="num">${v.refs}</td><td class="num">${n(v.u)}</td>
                   <td class="num">${n(v.usd)}</td></tr>`).join('')}</tbody>
          </table>
        </div>
      </div>

      <!-- split por razón social -->
      <div class="panel">
        <div class="fila-sep"><div class="sobretitulo">del mismo archivo salen dos pedidos</div>
          <span class="apunte tenue">cuota · versión ${REGLAS.cuotaRazonSocial.ver}</span></div>
        <div class="apunte mt-8">El reparto <b>no lo decide la demanda: lo decide la cuota</b> que
          el fabricante impone a cada entidad. El sistema asigna las líneas respetándola, y es la
          misma restricción que después condiciona el reporte al fabricante.</div>
        <div class="pila gap-12 mt-16">
          ${razones.map(r => {
            const cuota = REGLAS.cuotaRazonSocial.v[r.nombre] || 0;
            const real = total ? r.usd / total : 0;
            return `<div class="tarjeta" style="padding:14px 16px">
            <div class="fila-sep"><b style="font-size:13px">${r.nombre}</b>
              <span class="apunte tenue">${r.refs} referencias</span></div>
            <div class="fila-sep mt-8">
              <span class="cifra-media">${n(r.u)} <span class="tenue" style="font-size:12px;font-weight:400">u</span></span>
              <span class="apunte">${n(r.usd)} USD</span></div>
            <div class="barra mt-8"><span style="width:${(real * 100).toFixed(0)}%"></span></div>
            <div class="fila-sep mt-8" style="font-size:11px">
              <span class="tenue">asignado <b>${(real * 100).toFixed(0)} %</b></span>
              <span class="tenue">cuota <b>${(cuota * 100).toFixed(0)} %</b></span></div>
          </div>`; }).join('')}
        </div>
      </div>
    </div>

    <!-- el archivo, y la firma humana -->
    <div class="panel">
      <div class="fila-sep">
        <div class="sobretitulo">el archivo, en el formato que espera el proveedor</div>
        <span class="sello sello-externo">↗ sale de Kenex</span>
      </div>

      <div class="tabla-envoltura mt-16" style="max-height:210px;border-radius:14px">
        <table class="tabla">
          <thead><tr><th>MODEL</th><th>DESCRIPTION</th><th class="num">QTY</th><th>INTERNAL REF</th><th>entidad</th></tr></thead>
          <tbody>${lineas.slice(0, 8).map(l => `<tr>
            <td class="col-sku">${l.p.ref}</td><td>${l.p.nombre}</td>
            <td class="num">${n(l.humana)}</td><td class="col-sku">${l.p.sku}</td>
            <td><span class="apunte tenue">${l.razon}</span></td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="apunte tenue mt-8">vista previa de 8 de ${lineas.length} líneas</div>

      <hr class="sep">

      <div class="rejilla" style="grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:24px">
        <div>
          <div class="fila gap-8"><span class="orbe"></span>
            <b style="font-size:13px">el sistema preparó el archivo · tú lo envías</b></div>
          <div class="apunte mt-8" style="max-width:560px">
            Esta acción sale de Kenex, así que tiene techo de nivel 1 <b>sin excepción posible</b>:
            plantilla aprobada, destinatario a la vista y remitente con nombre. Ninguna versión
            de este sistema envía un correo a un proveedor por su cuenta —
            <b>un correo enviado no se desenvía</b>.
          </div>
          <div class="fila gap-8 mt-16" style="font-size:12px">
            <span class="apunte tenue">para:</span>
            <span class="marca-estado e-neutro">Casio · América Latina</span>
            <span class="apunte tenue">de:</span>
            <span class="marca-estado e-neutro">dirección de compras</span>
            <span class="apunte tenue">plantilla:</span>
            <span class="mono tenue">order-sheet v4</span>
          </div>
        </div>
        <div class="fila gap-8">
          <button class="btn btn-suave" id="descargar">descargar el archivo</button>
          <button class="btn btn-humano" id="enviar">enviar pedido a Casio</button>
        </div>
      </div>
    </div>

    <p class="apunte tenue mt-24" style="max-width:820px;line-height:1.55">
      El botón de enviar <b>no lleva el gradiente de marca</b>, a propósito: el gradiente es lo
      que hace el sistema, y esto lo hace una persona. Esa diferencia recorre todas las pantallas
      y no hace falta explicarla en ninguna.
    </p>`;

  /* --- comportamiento --- */
  lienzo.querySelector('#volver-mesa').onclick = () => { location.hash = '#/compras/casio'; };

  const rec = lienzo.querySelector('#recortar');
  if (rec) rec.onclick = () => {
    enCola.forEach(l => { _mesa.ajustes[l.p.sku] = 0; _mesa.motivos[l.p.sku] = 'decisión de cobertura'; });
    window.PANTALLAS['compras/cierre'](lienzo);
  };
  const amp = lienzo.querySelector('#ampliar');
  if (amp) amp.onclick = () => {
    alert(`Solicitud preparada para finanzas.\n\nAmpliación pedida: ${n(exceso)} USD\nMotivo: ${enCola.length} líneas con cobertura por debajo de su tránsito.\n\nEl sistema prepara la solicitud; la firma es humana.`);
  };

  lienzo.querySelector('#descargar').onclick = () => {
    razones.filter(r => r.refs).forEach(r =>
      _baja(`order-sheet_${HOY.mes}_${r.nombre.replace(/\s+/g, '-')}.csv`, _csv(lineas, r.nombre)));
  };

  lienzo.querySelector('#enviar').onclick = () => {
    alert(`Pedido listo para enviar.\n\n${n(totU)} unidades · ${n(total)} USD\n${razones.filter(r => r.refs).map(r => `· ${r.nombre}: ${n(r.u)} u`).join('\n')}\n\nEn el sistema real, aquí firmas tú y el correo sale con tu nombre.\nEl agente no lo envía nunca.`);
  };
};
