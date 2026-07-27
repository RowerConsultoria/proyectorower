/* ============================================================================
   EL SISTEMA — Módulo: clientes                         · Fase 29 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   La cartera completa de la red —propios, socio, operador, clientes y
   franquicia— con lo que hace falta para DECIDIR sobre cada uno: crédito,
   venta, inventario (medido o estimado, fase 28), pedidos, promociones, y las
   recomendaciones de impulso que la IA dejó preparadas en el turno (K-01).

   Dos pantallas:
   · la cartera — regiones → países → clientes, con la ficha completa al abrir
   · la torre de control — qué preparó la IA por cliente, por urgencia

   ⚠️ FUENTE ÚNICA: crédito y canal salen de red.js; venta y pedidos de
   operacion.js; el inventario estimado de inventarioDistribuido() (fase 28);
   las recomendaciones de recomendacionesCartera() — las MISMAS que anota el
   agente K-01 en el turno. Aquí no nace ninguna cifra.
   ============================================================================ */

window.PANTALLAS = window.PANTALLAS || {};

const _cli = { abierto: null, aplicadas: {} };

function pestClientes(activa) {
  const t = [
    ['cartera', '#/clientes', 'la cartera'],
    ['torre', '#/clientes/torre', 'torre de control IA'],
  ];
  return `<div class="fila gap-8" data-pest-cli>` + t.map(([k, h, r]) =>
    `<button class="btn btn-mini ${k === activa ? 'btn-suave' : 'btn-fantasma'}" data-ir="${h}">${r}</button>`
  ).join('') + `</div>`;
}
function wirePestClientes(lienzo) {
  lienzo.querySelectorAll('[data-pest-cli] [data-ir]')
    .forEach(b => { b.onclick = () => { location.hash = b.dataset.ir; }; });
}

const TIPO_CLI = { propio: 'frente propio', socio: 'socio', operador: 'operador',
                   cliente: 'cliente mayor', franquicia: 'franquicia' };

/* la recomendación pintada, compartida por la ficha y la torre. Cada una
   declara su ámbito de firma: es lo que la comprobación exige. */
function pintaRec(r, n) {
  if (r.alerta) {
    return `<div class="fila gap-8" data-rec data-ambito="" style="align-items:center">
      <span class="marca-estado e-riesgo"><i class="punto"></i>crédito: ${r.texto}</span>
      <span class="apunte tenue">${r.motivo} · aviso a gerencia comercial, sin acción automática</span>
    </div>`;
  }
  const k = r.frente + '|' + r.tipo + '|' + (r.p ? r.p.sku : '');
  const hecha = _cli.aplicadas[k];
  const ROTULO = { reposicion: 'anticipar en el reparto', impulso: 'preparar promoción', promocion: 'preparar promoción' };
  const CHIP = { reposicion: 'e-riesgo', impulso: 'e-alerta', promocion: 'e-alerta' };
  return `<div class="fila gap-8" data-rec data-ambito="${r.ambito}" style="align-items:center;flex-wrap:wrap">
    <span class="marca-estado ${CHIP[r.tipo]}"><i class="punto"></i>${r.texto}</span>
    <span class="apunte tenue">${r.motivo}</span>
    ${hecha
      ? '<span class="marca-estado e-ok">preparada · en la bandeja</span>'
      : `<button class="btn btn-suave btn-mini" data-aplica="${k}" data-firma="${r.ambito}">${ROTULO[r.tipo]}</button>`}
  </div>`;
}

/* aplicar una recomendación = anotarla en la bitácora, como todo lo demás */
function aplicaRec(r, lienzo, repinta) {
  const n = v => Math.round(v || 0).toLocaleString('es-VE');
  const f = FRENTES.find(x => x.id === r.frente);
  const k = r.frente + '|' + r.tipo + '|' + (r.p ? r.p.sku : '');
  _cli.aplicadas[k] = true;
  anota({
    accion: r.tipo === 'reposicion'
      ? 'K-03 · anticipar una reposición en el próximo reparto'
      : 'K-02 · preparar una promoción para un frente de la cartera',
    agente: 'impulsor de cartera', modulo: 'clientes',
    dispara: `${r.texto} — ${r.motivo}`,
    salida: r.tipo === 'reposicion'
      ? `${r.p.nombre} queda apuntada para la mesa del reparto de ${f.nombre} · no mueve nada hasta el reparto`
      : `propuesta de promoción de ${r.p.nombre} para ${f.nombre} en la bandeja de gerencia comercial · no se publica sin su firma`,
    ejes: { perimetro: 'interno', reversibilidad: 'clic', radio: 'borrador', dinero: 'ninguno', reloj: 'alcanza' },
    cruza: r.tipo === 'reposicion' ? 'distribucion' : 'comercial',
    reglas: ['coberturaObjetivo', 'sobrestockDesde'],
  });
  setTimeout(repinta, 600);
}

function wireRecs(lienzo, recs, repinta) {
  lienzo.querySelectorAll('[data-aplica]').forEach(b => {
    b.onclick = () => {
      const r = recs.find(x => (x.frente + '|' + x.tipo + '|' + (x.p ? x.p.sku : '')) === b.dataset.aplica);
      if (r) aplicaRec(r, lienzo, repinta);
    };
  });
}

/* ---------------------------------------------------- pantalla: cartera ---- */

window.PANTALLAS['clientes'] = function (lienzo) {
  const n = v => Math.round(v || 0).toLocaleString('es-VE');
  const dist = inventarioDistribuido();
  const salud = saludInventario();
  const recs = (datosDe('K-01') || { recs: [] }).recs;
  const k01 = entradaDe('K-01');
  const rep = datosDe('X-01') || { porFrente: {} };

  const ventaDe = id => {
    let v = 0;
    for (const sku in VENTAS) v += ((VENTAS[sku] || {})[id] || []).reduce((a, b) => a + b, 0);
    return v;
  };
  const medidoDe = id => salud.filas.filter(f => f.ubicacion.id === id).reduce((a, f) => a + f.u, 0);
  const distDe = id => dist.clientes.find(c => c.f.id === id) || null;
  const recsDe = id => recs.filter(r => r.frente === id);

  const totCred = FRENTES.reduce((a, f) => a + f.credito, 0);
  const totSaldo = FRENTES.reduce((a, f) => a + f.saldo, 0);
  const totVenta = FRENTES.reduce((a, f) => a + ventaDe(f.id), 0);

  const carta = f => {
    const d = distDe(f.id);
    const abierto = _cli.abierto === f.id;
    const rr = recsDe(f.id);
    const promos = promosDe(f.id);
    const venta = ventaDe(f.id);
    const pct = Math.round(f.saldo / f.credito * 100);
    const ped = PEDIDOS.filter(x => x.frente === f.id);
    const rf = rep.porFrente[f.id];
    const pron = CATALOGO.reduce((a, p) => a + (demandaSaneada(p.sku).porFrente[f.id] || 0), 0);

    return `<div class="panel" data-cli="${f.id}">
      <div class="fila-sep" style="cursor:pointer" data-abre-cli="${f.id}">
        <div>
          <div class="fila gap-8">
            <b style="font-size:14px">${f.nombre}</b>
            <span class="marca-estado e-neutro">${TIPO_CLI[f.tipo] || f.tipo}</span>
            ${d ? `<span class="marca-estado ${d.confianza.clase}">estimación ${d.confianza.r}</span>` : ''}
            ${f.atraso ? `<span class="marca-estado e-riesgo"><i class="punto"></i>atraso ${f.atraso} días</span>` : ''}
            ${rr.length ? `<span class="marca-estado e-alerta">${rr.length} ${rr.length === 1 ? 'recomendación' : 'recomendaciones'} IA</span>` : ''}
          </div>
          <div class="apunte tenue mt-8">${f.pais} · ${f.via === 'odoo' ? 'Odoo en vivo' : 'reporta por portal'} ·
            ${f.cadencia} · opera en ${f.moneda} · crédito en USD</div>
        </div>
        <div class="fila gap-24" style="text-align:right">
          <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">venta 12 m · u</div>
            <div class="cifra-media cli-venta">${n(venta)}</div></div>
          <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">disponible USD</div>
            <div class="cifra-media cli-disp">${n(f.credito - f.saldo)}</div></div>
          <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">inventario · u</div>
            <div class="cifra-media">${d ? `${n(d.estimado)} ±${n(d.banda)}` : n(medidoDe(f.id))}</div></div>
          <span class="apunte tenue" style="align-self:center">${abierto ? '▾' : '▸'}</span>
        </div>
      </div>

      <div class="fila gap-8 mt-16" style="align-items:center">
        <div class="barra crece ${pct >= 70 ? 'parcial' : ''}" title="crédito consumido">
          <span style="width:${Math.min(100, pct)}%"></span>
        </div>
        <span class="apunte tenue" style="flex:none">crédito: ${n(f.saldo)} de ${n(f.credito)} USD (${pct} %)</span>
      </div>

      ${abierto ? `
      <div class="rejilla rejilla-4 mt-16">
        <div class="tarjeta"><div class="kpi"><div class="rotulo">línea de crédito · USD</div>
          <div class="valor">${n(f.credito)}</div><div class="pie">límite otorgado</div></div></div>
        <div class="tarjeta"><div class="kpi"><div class="rotulo">consumido · USD</div>
          <div class="valor">${n(f.saldo)}</div><div class="pie">${pct} % del límite</div></div></div>
        <div class="tarjeta"><div class="kpi"><div class="rotulo">disponible · USD</div>
          <div class="valor">${n(f.credito - f.saldo)}</div><div class="pie">para pedir hoy</div></div></div>
        <div class="tarjeta"><div class="kpi"><div class="rotulo">atraso</div>
          <div class="valor" style="color:${f.atraso ? 'var(--riesgo)' : 'inherit'}">${f.atraso} d</div>
          <div class="pie">${f.atraso ? 'sobre su vencimiento' : 'al día'}</div></div></div>
      </div>

      <div class="rejilla rejilla-3 mt-16">
        <div class="tarjeta"><div class="kpi"><div class="rotulo">pedidos en el sistema</div>
          <div class="valor cli-ped">${ped.length}</div>
          <div class="pie">${ped.length ? `último ${ped[ped.length - 1].id} · ${ped[ped.length - 1].lineas.length} líneas ·
            ${n(ped[ped.length - 1].lineas.reduce((a, l) => a + l.pide, 0))} u` : 'sin pedidos este ciclo'}</div></div></div>
        <div class="tarjeta"><div class="kpi"><div class="rotulo">reparto de anoche · u</div>
          <div class="valor">${rf ? n(rf.recibe) : '0'}</div>
          <div class="pie">${rf ? `pidió ${n(rf.pide)} · servicio ${rf.pide ? Math.round(rf.recibe / rf.pide * 100) : 100} %` : 'no participó'}</div></div></div>
        <div class="tarjeta"><div class="kpi"><div class="rotulo">pronóstico · u/mes</div>
          <div class="valor">${n(pron)}</div>
          <div class="pie">demanda saneada · venta media ${n(venta / 12)} u</div></div></div>
      </div>

      ${d ? `<div class="apunte tenue mt-16">inventario estimado: <b>${n(d.estimado)} u</b>
        (banda ± ${n(d.banda)} · corte ${f.corte}) — la ecuación completa, en
        <a href="#/inventarios/distribuido">inventarios · distribuido</a></div>`
      : `<div class="apunte tenue mt-16">inventario medido: <b>${n(medidoDe(f.id))} u</b> en su almacén —
        el detalle vive en <a href="#/inventarios">inventarios · por almacén</a></div>`}

      ${promos.length ? `
      <div class="sobretitulo mt-16" style="margin-bottom:8px">promociones activas</div>
      <div class="fila gap-8" style="flex-wrap:wrap">
        ${promos.map(pr => {
          const p = CATALOGO.find(x => x.sku === pr.sku);
          return `<span class="marca-estado e-alerta">${p ? p.nombre : pr.sku} · −${pr.pct} % hasta el ${pr.hasta}</span>
            <span class="apunte tenue" style="align-self:center">${pr.motivo}</span>`;
        }).join('')}
      </div>` : ''}

      <div class="sobretitulo mt-16" style="margin-bottom:8px">la IA en este cliente</div>
      ${rr.length ? `<div class="pila gap-8">${rr.map(r => pintaRec(r, n)).join('')}</div>`
        : '<div class="apunte tenue">sin señales esta noche: cobertura y crédito dentro de sus reglas</div>'}
      ` : ''}
    </div>`;
  };

  function pinta() {
    lienzo.innerHTML = `
      <div class="lienzo-cab fila-sep">
        <div>
          <div class="sobretitulo">red · clientes</div>
          <div class="titulo-seccion" style="margin-top:4px">la cartera</div>
        </div>
        ${pestClientes('cartera')}
      </div>

      <div class="cinta" style="margin-bottom:20px">
        <span class="orbe hecho"></span><span class="hora">${HOY.hora}</span>
        <div class="crece">${k01 ? k01.salida : 'revisé la cartera'}</div>
      </div>

      <div class="rejilla rejilla-4" style="margin-bottom:22px">
        <div class="tarjeta"><div class="kpi"><div class="rotulo">frentes en la cartera</div>
          <div class="valor">${FRENTES.length}</div>
          <div class="pie">${FRENTES.filter(f => f.tipo === 'propio').length} propios · socio · operador ·
            ${FRENTES.filter(f => ['cliente', 'franquicia'].includes(f.tipo)).length} clientes y franquicia</div></div></div>
        <div class="tarjeta"><div class="kpi"><div class="rotulo">crédito otorgado · USD</div>
          <div class="valor" id="cli-cred">${n(totCred)}</div>
          <div class="pie">la línea de toda la red</div></div></div>
        <div class="tarjeta"><div class="kpi"><div class="rotulo">consumido · USD</div>
          <div class="valor" id="cli-saldo">${n(totSaldo)}</div>
          <div class="pie">${Math.round(totSaldo / totCred * 100)} % del límite</div></div></div>
        <div class="tarjeta"><div class="kpi"><div class="rotulo">venta reportada 12 m · u</div>
          <div class="valor" id="cli-venta-tot">${n(totVenta)}</div>
          <div class="pie">toda la red, sell-out</div></div></div>
      </div>

      <div class="sobretitulo" style="margin:26px 0 12px">frentes propios</div>
      <div class="pila gap-12">
        ${FRENTES.filter(f => f.tipo === 'propio').map(carta).join('')}
      </div>

      ${Object.entries(REGIONES).map(([rid, rnombre]) => {
        const del = FRENTES.filter(f => f.tipo !== 'propio' && (fichaCliente(f.id) || {}).region === rid);
        if (!del.length) return '';
        return `<div class="sobretitulo" style="margin:26px 0 12px">${rnombre}</div>
          <div class="pila gap-12">${del.map(carta).join('')}</div>`;
      }).join('')}

      <p class="apunte tenue mt-24" style="max-width:840px;line-height:1.55">
        Ningún dato de esta pantalla nace aquí: el crédito y el canal vienen de la red; la venta,
        del sell-out reportado; el inventario, de la fase 28. Lo que la IA recomienda lo dejó
        preparado el <b>impulsor de cartera</b> en el turno — está en la
        <a href="#/clientes/torre">torre de control</a> y en la <a href="#/agentes">sala de agentes</a>.
        La vista geográfica de esta misma red vive en el <a href="#/mapa">mapa global</a>.
      </p>`;

    lienzo.querySelectorAll('[data-abre-cli]').forEach(e => {
      e.onclick = () => {
        _cli.abierto = _cli.abierto === e.dataset.abreCli ? null : e.dataset.abreCli;
        pinta();
      };
    });
    wirePestClientes(lienzo);
    wireRecs(lienzo, recs, pinta);
  }

  pinta();
};

/* --------------------------------------------- pantalla: torre de control ---- */

window.PANTALLAS['clientes/torre'] = function (lienzo) {
  const n = v => Math.round(v || 0).toLocaleString('es-VE');
  const dist = inventarioDistribuido();
  const recs = (datosDe('K-01') || { recs: [] }).recs;
  const k01 = entradaDe('K-01');

  const cuenta = t => recs.filter(r => r.tipo === t).length;
  const alertas = recs.filter(r => r.alerta);
  const preparadas = recs.filter(r => !r.alerta);
  const aplicadas = Object.keys(_cli.aplicadas).length;
  const borrosas = dist.clientes.filter(c => c.confianza.r === 'borrosa').length;

  /* urgencia: primero el crédito con atraso, después quién más quiebres tiene */
  const orden = [...dist.clientes].sort((a, b) =>
    (b.f.atraso - a.f.atraso) || (b.quiebres.length - a.quiebres.length));

  function pinta() {
    lienzo.innerHTML = `
      <div class="lienzo-cab fila-sep">
        <div>
          <div class="sobretitulo">red · clientes</div>
          <div class="titulo-seccion" style="margin-top:4px">torre de control IA</div>
        </div>
        ${pestClientes('torre')}
      </div>

      <div class="cinta" style="margin-bottom:20px">
        <span class="orbe hecho"></span><span class="hora">${HOY.hora}</span>
        <div class="crece">${k01 ? k01.salida : 'revisé la cartera'}</div>
      </div>

      <div class="rejilla rejilla-4" style="margin-bottom:22px">
        <div class="tarjeta"><div class="kpi"><div class="rotulo">recomendaciones preparadas</div>
          <div class="valor" id="torre-prep">${preparadas.length}</div>
          <div class="pie">${cuenta('reposicion')} reposiciones · ${cuenta('impulso')} impulsos ·
            ${cuenta('promocion')} promociones</div></div></div>
        <div class="tarjeta"><div class="kpi"><div class="rotulo">llevadas a la bandeja</div>
          <div class="valor">${aplicadas}</div>
          <div class="pie">con la firma de quien las empujó</div></div></div>
        <div class="tarjeta"><div class="kpi"><div class="rotulo">alertas de crédito</div>
          <div class="valor" id="torre-alertas" style="color:${alertas.length ? 'var(--riesgo)' : 'inherit'}">${alertas.length}</div>
          <div class="pie">atrasos sobre vencimiento</div></div></div>
        <div class="tarjeta"><div class="kpi"><div class="rotulo">estimaciones borrosas</div>
          <div class="valor">${borrosas}</div>
          <div class="pie">frentes que reportan tarde — fase 28</div></div></div>
      </div>

      <div class="pila gap-12">
        ${orden.map(c => {
          const f = c.f;
          const rr = recs.filter(r => r.frente === f.id);
          if (!rr.length) return `<div class="panel">
            <div class="fila-sep">
              <div class="fila gap-8"><b style="font-size:14px">${f.nombre}</b>
                <span class="marca-estado e-neutro">${TIPO_CLI[f.tipo] || f.tipo}</span>
                <span class="marca-estado e-ok">sin señales</span></div>
              <button class="btn btn-fantasma btn-mini" data-ficha="${f.id}">ficha →</button>
            </div></div>`;
          return `<div class="panel" data-torre="${f.id}">
            <div class="fila-sep">
              <div class="fila gap-8">
                <b style="font-size:14px">${f.nombre}</b>
                <span class="marca-estado e-neutro">${TIPO_CLI[f.tipo] || f.tipo}</span>
                <span class="marca-estado ${c.confianza.clase}">estimación ${c.confianza.r}</span>
                ${f.atraso ? `<span class="marca-estado e-riesgo"><i class="punto"></i>atraso ${f.atraso} días</span>` : ''}
              </div>
              <button class="btn btn-fantasma btn-mini" data-ficha="${f.id}">ficha →</button>
            </div>
            <div class="pila gap-8 mt-16">${rr.map(r => pintaRec(r, n)).join('')}</div>
          </div>`;
        }).join('')}
      </div>

      <p class="apunte tenue mt-24" style="max-width:840px;line-height:1.55">
        La torre gobierna la cartera <b>no propia</b>. Los frentes propios se gobiernan donde está su
        acción: <a href="#/inventarios/salud">salud y rebalanceo</a>. Todo lo que se empuja desde aquí
        queda en la <a href="#/agentes">bitácora</a> con el nombre de quien lo empujó — la IA propone,
        una persona firma.
      </p>`;

    lienzo.querySelectorAll('[data-ficha]').forEach(b => {
      b.onclick = () => { _cli.abierto = b.dataset.ficha; location.hash = '#/clientes'; };
    });
    wirePestClientes(lienzo);
    wireRecs(lienzo, recs, pinta);
  }

  pinta();
};
