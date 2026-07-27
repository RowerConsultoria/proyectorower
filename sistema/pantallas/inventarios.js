/* ============================================================================
   EL SISTEMA — Módulo: inventarios                      · Fase 27 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   Las existencias del grupo, separadas por fin de la logística: una cosa es el
   FLUJO físico (recibir, ubicar, despachar — módulo logística) y otra es el
   ESTADO de lo que hay (cuánto, dónde, en qué salud — este módulo).

   Tres pestañas:
   · por almacén — los almacenes PROPIOS, con ocupación, dueño y semáforo
   · salud y rebalanceo — la pantalla de la fase 14, intacta (inventario.js)
   · en mar — lo ya comprado que todavía no está, cuadrando con la torre

   ⚠️ FUENTE ÚNICA: ninguna cifra nace aquí. El stock sale de operacion.js vía
   saludInventario() —la misma función que usa la pantalla de salud— y lo del
   mar sale de lineasEmbarque()/valorEmbarque(), las mismas de la torre de
   tránsitos. Si esta pantalla y aquéllas divergieran, sería un defecto — y hay
   una comprobación que lo busca.
   ============================================================================ */

window.PANTALLAS = window.PANTALLAS || {};

const _alm = { abierto: null };

/* Umbral del semáforo de ocupación. Presentación, no regla de negocio: no
   gobierna ninguna acción — solo cómo se lee la barra. */
const OCUPACION = { ajustada: 0.70, limite: 0.90 };

function estadoOcupacion(pct) {
  if (pct >= OCUPACION.limite) return { r: 'al límite', clase: 'e-riesgo' };
  if (pct >= OCUPACION.ajustada) return { r: 'ajustada', clase: 'e-alerta' };
  return { r: 'holgada', clase: 'e-ok' };
}

/* Las tres pestañas del módulo, compartidas por sus pantallas. */
function pestInventarios(activa) {
  const t = [
    ['alm', '#/inventarios', 'por almacén'],
    ['salud', '#/inventarios/salud', 'salud y rebalanceo'],
    ['mar', '#/inventarios/enmar', 'en mar'],
    ['dist', '#/inventarios/distribuido', 'distribuido'],
  ];
  return `<div class="fila gap-8" data-pest-inv>` + t.map(([k, h, r]) =>
    `<button class="btn btn-mini ${k === activa ? 'btn-suave' : 'btn-fantasma'}" data-ir="${h}">${r}</button>`
  ).join('') + `</div>`;
}
function wirePestInventarios(lienzo) {
  lienzo.querySelectorAll('[data-pest-inv] [data-ir]')
    .forEach(b => { b.onclick = () => { location.hash = b.dataset.ir; }; });
}

/** Nombre y señas de una ubicación, resueltos contra red.js — nunca copiados. */
function senasAlmacen(id) {
  if (id === 'ZLC') return { nombre: CENTRAL.nombre, lugar: CENTRAL.sede, tipo: 'central' };
  const f = FRENTES.find(x => x.id === id);
  return { nombre: f.almacen, lugar: `${f.pais} · ${f.nombre}`, tipo: 'frente propio' };
}

/* ------------------------------------------------ pantalla: por almacén ---- */

window.PANTALLAS['inventarios'] = function (lienzo) {
  const n = v => Math.round(v || 0).toLocaleString('es-VE');
  const s = saludInventario();

  /* todo se agrega desde las filas de salud: la MISMA verdad que esa pestaña */
  const por = {};
  for (const u of s.ubicaciones) por[u.id] = { u: 0, valor: 0, refs: 0, filas: [], clases: {} };
  for (const f of s.filas) {
    const c = por[f.ubicacion.id];
    c.u += f.u; c.valor += f.valor; c.refs++;
    c.filas.push(f);
    if (f.clase !== 'sano') c.clases[f.clase] = (c.clases[f.clase] || 0) + 1;
  }

  const totU = Object.values(por).reduce((a, c) => a + c.u, 0);
  const totV = Object.values(por).reduce((a, c) => a + c.valor, 0);
  const refsConStock = new Set(s.filas.map(f => f.p.sku)).size;
  const enMarU = TRANSITOS.reduce((a, t) => a + lineasEmbarque(t).reduce((x, y) => x + y.u, 0), 0);

  const CHIP_CLASE = {
    quiebre: ['quiebre', 'e-riesgo'], sobrestock: ['sobrestock', 'e-alerta'], parado: ['parado', 'e-neutro'],
  };

  lienzo.innerHTML = `
    <div class="lienzo-cab fila-sep">
      <div>
        <div class="sobretitulo">operación · inventarios</div>
        <div class="titulo-seccion" style="margin-top:4px">por almacén</div>
      </div>
      ${pestInventarios('alm')}
    </div>

    <div class="cinta" style="margin-bottom:20px">
      <span class="orbe hecho"></span><span class="hora">${HOY.hora}</span>
      <div class="crece">consolidé las existencias de <b>${s.ubicaciones.length} almacenes propios</b>:
        <b>${n(totU)} unidades</b> en piso y <b>${n(enMarU)}</b> más en mar rumbo a Colón.
        Cada almacén con su dueño, su ocupación y lo que pide atención</div>
    </div>

    <div class="rejilla rejilla-4" style="margin-bottom:22px">
      <div class="tarjeta"><div class="kpi"><div class="rotulo">unidades en almacenes propios</div>
        <div class="valor" id="inv-tot-u">${n(totU)}</div>
        <div class="pie">${s.ubicaciones.length} almacenes · solo lo propio</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">valor estimado</div>
        <div class="valor" id="inv-tot-v">${n(totV)}</div>
        <div class="pie">USD, costo estimado</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">referencias con existencia</div>
        <div class="valor">${n(refsConStock)}</div>
        <div class="pie">de ${CATALOGO.length} en el catálogo</div></div></div>
      <div class="tarjeta pulsable" data-ir-mar><div class="kpi"><div class="rotulo">unidades en mar, rumbo a Colón</div>
        <div class="valor" id="inv-enmar-u">${n(enMarU)}</div>
        <div class="pie">ya comprado, todavía no vendible →</div></div></div>
    </div>

    <div class="pila gap-12" id="lista-alm"></div>

    <p class="apunte tenue mt-24" style="max-width:840px;line-height:1.55">
      Aquí solo lo <b>propio</b>: lo que está en casa del socio y de los clientes es de ellos.
      Su inventario se <b>estima</b> desde lo que se les despachó y lo que reportan vender —
      esa visual global vive en la pestaña <a href="#/inventarios/distribuido">distribuido</a>.
    </p>`;

  const caja = lienzo.querySelector('#lista-alm');

  function pinta() {
    caja.innerHTML = s.ubicaciones.map(ub => {
      const c = por[ub.id];
      const ficha = fichaAlmacen(ub.id);
      const senas = senasAlmacen(ub.id);
      const pct = c.u / ficha.capacidadU;
      const est = estadoOcupacion(pct);
      const abierto = _alm.abierto === ub.id;
      const top = [...c.filas].sort((a, b) => b.u - a.u).slice(0, 3);
      const m2 = ficha.m2 ?? CENTRAL.m2;

      /* la central, además: si llegara HOY todo lo del mar, ¿cabría? */
      const conMar = ub.id === 'ZLC' ? (c.u + TRANSITOS.reduce((a, t) =>
        a + lineasEmbarque(t).reduce((x, y) => x + y.u, 0), 0)) / ficha.capacidadU : null;

      return `<div class="panel" data-alm="${ub.id}" data-u="${c.u}">
        <div class="fila-sep" style="cursor:pointer" data-abre="${ub.id}">
          <div>
            <div class="fila gap-8">
              <b style="font-size:14px">${senas.nombre}</b>
              <span class="marca-estado e-neutro">${senas.tipo}</span>
              <span class="marca-estado ${est.clase}"><i class="punto"></i>ocupación ${est.r}</span>
            </div>
            <div class="apunte tenue mt-8">${senas.lugar} · ${n(m2)} m² ·
              dueño: <b>${ficha.dueno}</b></div>
          </div>
          <div class="fila gap-24" style="text-align:right">
            <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">unidades</div>
              <div class="cifra-media alm-u">${n(c.u)}</div></div>
            <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">valor USD</div>
              <div class="cifra-media">${n(c.valor)}</div></div>
            <span class="apunte tenue" style="align-self:center">${abierto ? '▾' : '▸'}</span>
          </div>
        </div>

        <div class="fila gap-8 mt-16" style="align-items:center">
          <div class="barra crece" title="${Math.round(pct * 100)} % de ${n(ficha.capacidadU)} u">
            <span style="width:${Math.min(100, Math.round(pct * 100))}%;background:var(--${est.clase === 'e-ok' ? 'ok' : est.clase === 'e-alerta' ? 'alerta' : 'riesgo'})"></span>
          </div>
          <span class="apunte tenue" style="flex:none">${Math.round(pct * 100)} % de ${n(ficha.capacidadU)} u</span>
        </div>
        ${conMar !== null ? `<div class="apunte tenue mt-8">con lo que viene en mar llegaría al
          <b>${Math.round(conMar * 100)} %</b> — el plan de descarga y el reparto liberan piso antes de la llegada</div>` : ''}

        <div class="fila gap-8 mt-16" style="flex-wrap:wrap">
          ${Object.entries(c.clases).map(([k, v]) =>
            `<span class="marca-estado ${CHIP_CLASE[k][1]}">${v} en ${CHIP_CLASE[k][0]}</span>`).join('')}
          <span class="apunte tenue" style="align-self:center">· ${c.refs} referencias con existencia ·
            top: ${top.map(f => `${f.p.nombre} (${n(f.u)} u)`).join(' · ')}</span>
        </div>

        ${abierto ? `
        <table class="tabla mt-16">
          <thead><tr><th>referencia</th><th>línea</th><th class="num">unidades</th>
            <th class="num">valor USD</th><th>estado</th></tr></thead>
          <tbody>
            ${[...c.filas].sort((a, b) => b.valor - a.valor).slice(0, 10).map(f => `
            <tr>
              <td><b>${f.p.nombre}</b> <span class="apunte tenue mono">${f.p.sku}</span></td>
              <td class="apunte">${f.p.linea}</td>
              <td class="num">${n(f.u)}</td>
              <td class="num">${n(f.valor)}</td>
              <td>${f.clase === 'sano' ? '<span class="marca-estado e-ok">sano</span>'
                : `<span class="marca-estado ${CHIP_CLASE[f.clase][1]}">${CHIP_CLASE[f.clase][0]}</span>`}</td>
            </tr>`).join('')}
          </tbody>
        </table>
        <div class="apunte tenue mt-8">las 10 de más valor — el detalle accionable completo vive en
          <a href="#/inventarios/salud">salud y rebalanceo</a></div>` : ''}
      </div>`;
    }).join('');

    caja.querySelectorAll('[data-abre]').forEach(e => {
      e.onclick = () => {
        _alm.abierto = _alm.abierto === e.dataset.abre ? null : e.dataset.abre;
        pinta();
      };
    });
  }

  pinta();
  wirePestInventarios(lienzo);
  const mar = lienzo.querySelector('[data-ir-mar]');
  if (mar) mar.onclick = () => { location.hash = '#/inventarios/enmar'; };
};

/* --------------------------------------------------- pantalla: en mar ---- */

window.PANTALLAS['inventarios/enmar'] = function (lienzo) {
  const n = v => Math.round(v || 0).toLocaleString('es-VE');
  /* las MISMAS funciones que la torre de tránsitos: un solo cálculo, dos lentes */
  const totU = TRANSITOS.reduce((a, t) => a + lineasEmbarque(t).reduce((x, y) => x + y.u, 0), 0);
  const totV = TRANSITOS.reduce((a, t) => a + valorEmbarque(t), 0);
  const propioU = saludInventario().filas.reduce((a, f) => a + f.u, 0);
  const DOCS_R = { shippingAdvice: 'shipping advice', acn: 'ACN', facturaNaviera: 'factura de flete', costeo: 'costeo en destino' };

  lienzo.innerHTML = `
    <div class="lienzo-cab fila-sep">
      <div>
        <div class="sobretitulo">operación · inventarios</div>
        <div class="titulo-seccion" style="margin-top:4px">en mar</div>
      </div>
      ${pestInventarios('mar')}
    </div>

    <div class="cinta" style="margin-bottom:20px">
      <span class="orbe hecho"></span><span class="hora">${HOY.hora}</span>
      <div class="crece">sigo <b>${TRANSITOS.length} embarques</b> rumbo a Colón:
        <b>${n(totU)} unidades</b> ya compradas que la mesa descuenta para no pedirlas dos veces</div>
    </div>

    <div class="rejilla rejilla-4" style="margin-bottom:22px">
      <div class="tarjeta"><div class="kpi"><div class="rotulo">embarques en camino</div>
        <div class="valor">${TRANSITOS.length}</div>
        <div class="pie">${TRANSITOS.filter(t => t.modo === 'marítimo').length} marítimos ·
          ${TRANSITOS.filter(t => t.modo === 'aéreo').length} aéreo</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">unidades en mar</div>
        <div class="valor" id="mar-u">${n(totU)}</div>
        <div class="pie">nuestras, todavía no vendibles</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">valor en camino</div>
        <div class="valor">${n(totV)}</div><div class="pie">USD, costo estimado</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">contra lo que hay en piso</div>
        <div class="valor">${Math.round(totU / propioU * 100)} %</div>
        <div class="pie">del inventario propio actual</div></div></div>
    </div>

    <div class="pila gap-12">
      ${TRANSITOS.map(t => {
        const lin = lineasEmbarque(t);
        const u = lin.reduce((a, x) => a + x.u, 0);
        const faltan = Object.keys(DOCS_R).filter(k => !t.docs[k]);
        const top = [...lin].sort((a, b) => b.u - a.u).slice(0, 3);
        return `<div class="panel">
          <div class="fila-sep">
            <div>
              <div class="fila gap-8">
                <b style="font-size:14px" class="mono">${t.id}</b>
                <span class="marca-estado ${t.modo === 'aéreo' ? 'e-ok' : 'e-neutro'}">${t.modo}</span>
                <span class="marca-estado e-neutro">${t.etapa}</span>
                ${!t.docs.facturaNaviera
                  ? '<span class="marca-estado e-riesgo"><i class="punto"></i>sin factura de flete</span>' : ''}
              </div>
              <div class="apunte tenue mt-8">${t.prov} · ${t.origen} → Colón ·
                ${t.contenedores ? t.contenedores + ' contenedor' + (t.contenedores > 1 ? 'es' : '') + ' · ' : ''}${n(t.cajas)} cajas ·
                ${lin.length} referencias · top: ${top.map(x => `${x.p.nombre} (${n(x.u)} u)`).join(' · ')}</div>
            </div>
            <div class="fila gap-24" style="text-align:right">
              <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">unidades</div>
                <div class="cifra-media">${n(u)}</div></div>
              <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">valor USD</div>
                <div class="cifra-media">${n(valorEmbarque(t))}</div></div>
              <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">llega</div>
                <div class="cifra-media">${t.eta}</div></div>
            </div>
          </div>
          ${faltan.length ? `<div class="apunte tenue mt-8">documentos pendientes:
            ${faltan.map(k => DOCS_R[k]).join(' · ')}</div>` : ''}
        </div>`;
      }).join('')}
    </div>

    <div class="fila gap-8 mt-24">
      <button class="btn btn-suave btn-mini" id="ir-torre">abrir la torre de tránsitos →</button>
      <span class="apunte tenue" style="align-self:center">el estado documental y el reclamo viven allá;
        aquí, el lente de inventario: esto ya es nuestro y aún no está</span>
    </div>`;

  wirePestInventarios(lienzo);
  lienzo.querySelector('#ir-torre').onclick = () => { location.hash = '#/compras/transitos'; };
};

/* --------------------------------------- pantalla: distribuido (fase 28) ---
   Dónde está TODA la mercancía del grupo: lo propio, medido; lo del socio y
   los clientes, ESTIMADO desde lo despachado y lo reportado, con su banda de
   incertidumbre. La banda es la tesis del informe hecha número: la calidad
   del reporte de cada quien determina qué tan bien vemos su almacén.       */

window.PANTALLAS['inventarios/distribuido'] = function (lienzo) {
  const n = v => Math.round(v || 0).toLocaleString('es-VE');
  const dist = inventarioDistribuido();
  const propioU = saludInventario().filas.reduce((a, f) => a + f.u, 0);
  const t = dist.totales;
  const senales = dist.clientes.reduce((a, c) =>
    a + c.quiebres.length + c.sobrantes.length + c.paradas.length, 0);

  const TIPO = { socio: 'socio', operador: 'operador', cliente: 'cliente mayor', franquicia: 'franquicia' };

  lienzo.innerHTML = `
    <div class="lienzo-cab fila-sep">
      <div>
        <div class="sobretitulo">operación · inventarios</div>
        <div class="titulo-seccion" style="margin-top:4px">distribuido — dónde está todo</div>
      </div>
      ${pestInventarios('dist')}
    </div>

    <div class="cinta" style="margin-bottom:20px">
      <span class="orbe hecho"></span><span class="hora">${HOY.hora}</span>
      <div class="crece">estimé el almacén de <b>${dist.clientes.length} frentes no propios</b> desde
        lo despachado y lo reportado: <b>${n(t.estimado)} unidades</b> deberían estar en sus manos,
        con <b>± ${n(t.banda)}</b> de incertidumbre por reportes atrasados</div>
    </div>

    <div class="rejilla rejilla-4" style="margin-bottom:22px">
      <div class="tarjeta"><div class="kpi"><div class="rotulo">unidades del grupo en el mundo</div>
        <div class="valor" id="dist-mundo">${n(propioU + t.estimado)}</div>
        <div class="pie">${n(propioU)} medidas + ${n(t.estimado)} estimadas</div></div></div>
      <div class="tarjeta pulsable" data-ir-alm><div class="kpi"><div class="rotulo">unidades en almacenes propios</div>
        <div class="valor">${n(propioU)}</div>
        <div class="pie">medidas — ver por almacén →</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">unidades en casa de clientes</div>
        <div class="valor" id="dist-est">${n(t.estimado)}</div>
        <div class="pie">estimadas · despachado − reportado</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">unidades de incertidumbre</div>
        <div class="valor" id="dist-banda">± ${n(t.banda)}</div>
        <div class="pie">vendidas desde su último corte, aún sin ver</div></div></div>
    </div>

    ${Object.entries(REGIONES).map(([rid, rnombre]) => {
      const del = dist.clientes.filter(c => c.region === rid);
      if (!del.length) return '';
      return `<div class="sobretitulo" style="margin:26px 0 12px">${rnombre} ·
          ${n(del.reduce((a, c) => a + c.estimado, 0))} u estimadas</div>
        <div class="pila gap-12">
        ${del.map(c => {
          const f = c.f;
          const pctBanda = c.estimado ? Math.round(c.banda / c.estimado * 100) : 0;
          return `<div class="panel" data-cli="${f.id}">
            <div class="fila-sep">
              <div>
                <div class="fila gap-8">
                  <b style="font-size:14px">${f.nombre}</b>
                  <span class="marca-estado e-neutro">${TIPO[f.tipo] || f.tipo}</span>
                  <span class="marca-estado ${c.confianza.clase}"><i class="punto"></i>estimación ${c.confianza.r}</span>
                </div>
                <div class="apunte tenue mt-8">${f.pais} · almacén ${f.almacen} ·
                  reporta ${f.cadencia} por ${f.via} · corte ${f.corte}</div>
              </div>
              <div class="fila gap-24" style="text-align:right">
                <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">despachado 12 m · u</div>
                  <div class="cifra-media d-desp">${n(c.despachado)}</div></div>
                <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">reportan vendido · u</div>
                  <div class="cifra-media d-rep">${n(c.reportado)}</div></div>
                <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">deberían tener · u</div>
                  <div class="cifra-media d-est">${n(c.estimado)}</div></div>
              </div>
            </div>

            <div class="fila gap-8 mt-16" style="align-items:center">
              <div class="barra crece" title="cobertura estimada: ${c.cobertura.toFixed(1)} meses">
                <span style="width:${Math.min(100, Math.round(c.cobertura / (REGLAS.coberturaObjetivo.v * REGLAS.sobrestockDesde.v) * 100))}%"></span>
              </div>
              <span class="apunte tenue" style="flex:none">cobertura ${c.cobertura.toFixed(1)} meses ·
                banda <span class="d-banda">± ${n(c.banda)}</span> u${pctBanda ? ' (' + pctBanda + ' %)' : ''}</span>
            </div>
            ${c.banda ? `<div class="apunte tenue mt-8">pueden haber vendido hasta
              <b>${n(c.banda)} u</b> desde su corte de hace ${c.corteDias} día${c.corteDias > 1 ? 's' : ''}:
              su almacén real está entre <b>${n(c.estimado - c.banda)}</b> y <b>${n(c.estimado)}</b> u</div>` : ''}

            ${(c.quiebres.length || c.paradas.length || c.sobrantes.length) ? `
            <div class="fila gap-8 mt-16" style="flex-wrap:wrap;align-items:center">
              <span class="apunte tenue">la IA prepararía:</span>
              ${(() => {
                /* dos referencias distintas comparten nombre de familia (los
                   ClassWiz): sin el dedup salían dos chips idénticos seguidos
                   y se leía como glitch */
                const vistos = new Set();
                const unicos = c.quiebres.filter(x =>
                  vistos.has(x.p.nombre) ? false : (vistos.add(x.p.nombre), true)).slice(0, 2);
                return unicos.map(x =>
                  `<span class="marca-estado e-riesgo"><i class="punto"></i>reposición anticipada: ${x.p.nombre}</span>`).join('') +
                  (c.quiebres.length > unicos.length
                    ? `<span class="apunte tenue">+${c.quiebres.length - unicos.length} más en quiebre</span>` : '');
              })()}
              ${c.paradas.map(o =>
                `<span class="marca-estado e-alerta">impulso: ${n(o.u)} u paradas ${o.mesesQuieto} meses</span>`).join('')}
              ${c.sobrantes.slice(0, 1).map(x =>
                `<span class="marca-estado e-alerta">promoción: ${x.p.nombre} sobrado (${n(x.u)} u)</span>`).join('')}
            </div>` : ''}
          </div>`;
        }).join('')}
        </div>`;
    }).join('')}

    <p class="apunte tenue mt-24" style="max-width:860px;line-height:1.55">
      <b>La banda es la tesis del sistema hecha número.</b> Con conexión en vivo la banda es cero:
      su almacén se ve como el propio. Con un Excel cada tres semanas, la banda es lo vendido desde
      el corte — y decidir sobre ese frente es decidir a ciegas ese porcentaje. Las recomendaciones
      accionables, con su firma, llegan con el módulo de clientes (fase 29).
    </p>`;

  wirePestInventarios(lienzo);
  const alm = lienzo.querySelector('[data-ir-alm]');
  if (alm) alm.onclick = () => { location.hash = '#/inventarios'; };
};
