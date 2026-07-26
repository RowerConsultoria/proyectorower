/* ============================================================================
   EL SISTEMA — Dirección                               · Fase 19 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   La pantalla de la audiencia real de la demo. Y la única del sistema donde
   la IA NO es un actor: aquí solo hay lectura.

   Tres cosas, en este orden:
     1. El ciclo completo con el estado de cada eslabón. La Junta no necesita
        ver veinte tableros: necesita ver dónde está atascado el negocio.
     2. Los números del mes, cada uno con la pantalla donde se decide.
     3. Qué hizo el sistema anoche y con qué permiso — incluido el contador
        que más pesa: comunicaciones externas enviadas sin firma humana.

   La barra de consulta es estrictamente de lectura y responde con cifras que
   ya están calculadas. No es un chatbot: un cuadro de «pregúntame lo que
   quieras» encima de un tablero es una promesa que el sistema no puede
   cumplir, y es el primer sitio donde se rompe la credibilidad.
   ============================================================================ */

window.PANTALLAS = window.PANTALLAS || {};

const _dir = { respuesta: null };

/* Preguntas que la dirección hace de verdad, respondidas con lo que el sistema
   ya sabe. Cada una dice de dónde sale y a qué pantalla ir. */
const CONSULTAS = [
  {
    q: '¿cuánto vamos a comprar este mes y contra qué techo?',
    r: () => {
      const m = datosDe('C-01') || { monto: 0 };
      const t = REGLAS.topeCompraMes.v, e = m.monto - t;
      return `${Math.round(m.monto).toLocaleString('es-VE')} USD contra un techo de ` +
             `${t.toLocaleString('es-VE')} — ${e > 0 ? `lo excede en ${Math.round(e).toLocaleString('es-VE')} USD` : `queda ${Math.round(-e).toLocaleString('es-VE')} de margen`}.`;
    },
    ir: '#/compras/cierre', dice: 'la mesa de compra y el cierre del pedido',
  },
  {
    q: '¿qué se dejó de vender por no tener existencia?',
    r: () => {
      const d = datosDe('X-01') || { porFrente: {} };
      let u = 0;
      for (const x of Object.values(d.porFrente)) for (const l of x.lineas) u += Math.max(0, l.pide - l.recibe);
      return `${u.toLocaleString('es-VE')} unidades del corte. Ninguna se borró: vuelven a la mesa de compra del mes siguiente.`;
    },
    ir: '#/comercial/demanda', dice: 'la demanda no atendida',
  },
  {
    q: '¿cuánto inventario tenemos parado?',
    r: () => {
      const s = saludInventario();
      const p = s.porClase.parado || { valor: 0, filas: 0 };
      const r = propuestasRebalanceo();
      return `${Math.round(p.valor).toLocaleString('es-VE')} USD en ${p.filas} líneas sin una venta en ` +
             `${REGLAS.mesesParaOcioso.v} meses. Hay ${r.length} traslados preparados que desbloquean ` +
             `${Math.round(r.reduce((a, x) => a + x.ventaDesbloqueada, 0)).toLocaleString('es-VE')} USD de venta.`;
    },
    ir: '#/logistica/inventario', dice: 'la salud del inventario',
  },
  {
    q: '¿qué frentes reportan tarde y cuánto nos cuesta?',
    r: () => {
      const D = { 'evento': 0, 'cada 4 h': 0.2, 'diaria': 1, 'semanal': 7, 'quincenal': 15, 'mensual': 30 };
      const pT = FRENTES.reduce((a, f) => a + f.peso, 0);
      const lentos = FRENTES.filter(f => (D[f.cadencia] ?? 15) >= 7);
      const pct = lentos.reduce((a, f) => a + f.peso, 0) / pT * 100;
      return `${lentos.length} frentes reportan una vez por semana o menos veces, y son el ${pct.toFixed(0)} % ` +
             `de la venta. Adelantarlos es una decisión económica, no de sistemas.`;
    },
    ir: '#/frentes/conectores', dice: 'el mapa de conectores',
  },
  {
    q: '¿el sistema le ha escrito a alguien de fuera por su cuenta?',
    r: () => {
      const r = resumenAgentes();
      return `No. ${r.externas} acciones tocaron el perímetro externo y las ${r.externas} quedaron en ` +
             `nivel 1: redactadas, nunca enviadas. Enviadas sin firma humana: ${r.enviadasSinFirmaHumana}.`;
    },
    ir: '#/agentes', dice: 'la sala de agentes',
  },
];

window.PANTALLAS.direccion = function (lienzo) {
  const n = v => Math.round(v || 0).toLocaleString('es-VE');
  const r = resumenAgentes();
  const mesa = datosDe('C-01') || { monto: 0, conPropuesta: 0 };
  const rep = datosDe('X-01') || { porFrente: {}, escasos: [], repartido: 0 };
  const pre = datosDe('V-02') || { verde: [], excepcion: [] };
  const salud = saludInventario();
  const rebal = propuestasRebalanceo();

  const demandaMes = CATALOGO.reduce((a, p) => a + demandaSaneada(p.sku).mensual, 0);
  let pedido = 0, servido = 0;
  for (const x of Object.values(rep.porFrente)) { pedido += x.pide; servido += x.recibe; }
  const servicio = pedido ? servido / pedido : 1;
  const parado = (salud.porClase.parado || { valor: 0 }).valor;
  const sinAtender = pedido - servido;

  /* Los eslabones del ciclo, cada uno con su estado y su pantalla. */
  const ciclo = [
    { i: '✦', t: 'desarrollo de producto', v: `${CANDIDATOS.filter(c => c.etapa === 'decision').length} listos para decidir`,
      alerta: CANDIDATOS.filter(c => c.diasEnEtapa > 21 && !['graduado', 'descartado'].includes(c.etapa)).length,
      alertaT: 'atascados más de 3 semanas', ir: '#/producto' },
    { i: '▤', t: 'compra internacional', v: `${n(mesa.monto)} USD propuestos`,
      alerta: mesa.monto > REGLAS.topeCompraMes.v ? 1 : 0, alertaT: 'excede el techo del mes', ir: '#/compras' },
    { i: '▥', t: 'recepción en Colón', v: `${TRANSITOS.length} embarques en camino`,
      alerta: TRANSITOS.filter(t => !t.docs.facturaNaviera).length, alertaT: 'sin factura de flete', ir: '#/logistica' },
    { i: '⇄', t: 'reparto a los frentes', v: `${n(rep.repartido)} u asignadas`,
      alerta: rep.escasos.length, alertaT: 'referencias en escasez', ir: '#/distribucion' },
    { i: '▧', t: 'despacho y factura', v: `${pre.verde.length + pre.excepcion.length} pedidos del corte`,
      alerta: pre.excepcion.length, alertaT: 'excepciones por revisar', ir: '#/comercial' },
    { i: '◈', t: 'el frente vende y reporta', v: `${FRENTES.length} frentes conectados`,
      alerta: FRENTES.filter(f => ['quincenal', 'mensual'].includes(f.cadencia)).length,
      alertaT: 'reportan cada 15 días o más', ir: '#/frentes/conectores' },
  ];

  lienzo.innerHTML = `
    <div class="lienzo-cab fila-sep">
      <div>
        <div class="sobretitulo">el grupo · ${HOY.mes} ${HOY.anio}</div>
        <div class="titulo-seccion" style="margin-top:4px">dirección</div>
      </div>
      <span class="marca-estado e-neutro"><i class="punto"></i>solo lectura · aquí la IA no actúa</span>
    </div>

    <!-- el ciclo completo -->
    <div class="panel" style="margin-bottom:22px">
      <div class="fila-sep">
        <div class="sobretitulo">el ciclo, de punta a punta</div>
        <span class="apunte tenue">dónde está atascado el negocio, sin abrir veinte tableros</span>
      </div>
      <div class="ciclo mt-24">
        ${ciclo.map((e, i) => `
          <div class="eslabon ${e.alerta ? 'con-alerta' : ''}" data-ir="${e.ir}">
            <div class="ico">${e.i}</div>
            <div class="tt">${e.t}</div>
            <div class="vv">${e.v}</div>
            ${e.alerta ? `<div class="al">${e.alerta} ${e.alertaT}</div>` : '<div class="al ok">sin alertas</div>'}
          </div>
          ${i < ciclo.length - 1 ? '<div class="union"></div>' : ''}`).join('')}
      </div>
      <div class="apunte tenue mt-24" style="text-align:center">
        el ciclo se cierra sobre sí mismo: lo que el frente reporta es lo que alimenta la siguiente compra
      </div>
    </div>

    <!-- los números del mes -->
    <div class="rejilla rejilla-4" style="margin-bottom:22px">
      <div class="tarjeta pulsable" data-ir="#/cimiento"><div class="kpi">
        <div class="rotulo">demanda real del grupo</div>
        <div class="valor">${n(demandaMes)}</div>
        <div class="pie">u/mes · ${FRENTES.length} frentes, ${CATALOGO.length} referencias</div></div></div>
      <div class="tarjeta pulsable" data-ir="#/distribucion"><div class="kpi">
        <div class="rotulo">nivel de servicio</div>
        <div class="valor" style="color:${servicio < 0.9 ? 'var(--n3)' : 'var(--ok)'}">${(servicio * 100).toFixed(0)} %</div>
        <div class="pie">${n(sinAtender)} u que no se pudieron atender</div></div></div>
      <div class="tarjeta pulsable" data-ir="#/logistica/inventario"><div class="kpi">
        <div class="rotulo">inventario parado</div>
        <div class="valor" style="color:${parado ? 'var(--n3)' : 'inherit'}">${n(parado)}</div>
        <div class="pie">USD · ${rebal.length} traslados preparados</div></div></div>
      <div class="tarjeta pulsable" data-ir="#/compras/cierre"><div class="kpi">
        <div class="rotulo">compra del mes</div>
        <div class="valor">${(mesa.monto / 1e6).toFixed(2)} M</div>
        <div class="pie">USD contra un techo de ${(REGLAS.topeCompraMes.v / 1e6).toFixed(2)} M</div></div></div>
    </div>

    <div class="rejilla" style="grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:20px;align-items:start">

      <!-- la barra de consulta -->
      <div class="panel">
        <div class="fila-sep">
          <div class="sobretitulo">consulta</div>
          <span class="apunte tenue">estrictamente de lectura</span>
        </div>
        <div class="apunte mt-8">
          Responde con cifras que el sistema <b>ya tiene calculadas</b>, y dice de qué pantalla salen.
          No es un asistente al que se le pueda pedir cualquier cosa: <b>eso sería prometer algo que
          no puede cumplir</b>, y es el primer sitio donde se rompe la credibilidad.
        </div>
        <div class="pila gap-8 mt-16" id="consultas">
          ${CONSULTAS.map((c, i) => `<div class="consulta" data-q="${i}">${c.q}</div>`).join('')}
        </div>
        <div id="respuesta"></div>
      </div>

      <!-- qué hizo el sistema -->
      <div class="panel">
        <div class="fila-sep">
          <div class="sobretitulo">qué hizo el sistema anoche</div>
          <button class="btn btn-fantasma btn-mini" data-ir="#/agentes">la bitácora →</button>
        </div>
        <div class="rejilla mt-16" style="grid-template-columns:1fr 1fr;gap:12px">
          <div class="tarjeta" style="padding:14px 16px"><div class="kpi">
            <div class="rotulo">preparó</div><div class="valor" style="color:var(--n1)">${r.preparadas}</div>
            <div class="pie">borradores sin efecto hasta que alguien los toma</div></div></div>
          <div class="tarjeta" style="padding:14px 16px"><div class="kpi">
            <div class="rotulo">ejecutó y avisó</div><div class="valor" style="color:var(--n2)">${r.ejecutadas}</div>
            <div class="pie">escritura interna, reversible</div></div></div>
          <div class="tarjeta" style="padding:14px 16px"><div class="kpi">
            <div class="rotulo">espera firma</div><div class="valor" style="color:var(--n3)">${r.esperanFirma}</div>
            <div class="pie">no se aplica sin una persona</div></div></div>
          <div class="tarjeta" style="padding:14px 16px"><div class="kpi">
            <div class="rotulo">reservas tomadas</div><div class="valor">${r.reservas}</div>
            <div class="pie">sobre unidades concretas</div></div></div>
        </div>

        <div class="bloqueo mt-16" style="border-color:rgba(54,246,187,.4);background:rgba(54,246,187,.05)">
          <div class="fila-sep">
            <div>
              <div class="sobretitulo">comunicaciones fuera de Kenex</div>
              <div class="apunte mt-8">${r.externas} preparadas · <b>enviadas sin firma humana:</b></div>
            </div>
            <div class="cifra-grande texto-marca">${r.enviadasSinFirmaHumana}</div>
          </div>
          <div class="apunte tenue mt-8" style="font-size:11.5px">
            Escribir a un proveedor, a una naviera o a un cliente tiene techo de nivel 1
            <b>sin excepción posible y sin promoción</b>. No es una calibración: un correo enviado
            no se desenvía.
          </div>
        </div>
      </div>
    </div>

    <p class="apunte tenue mt-24" style="max-width:860px;line-height:1.55">
      Los cuatro números de arriba y los seis eslabones del ciclo salen del mismo sitio que las
      pantallas de operación: <b>no hay un tablero de dirección alimentado aparte</b>. Cada cifra
      lleva a la pantalla donde se decide, que es la diferencia entre un informe y un sistema.
    </p>`;

  lienzo.querySelectorAll('[data-ir]').forEach(el => el.onclick = () => { location.hash = el.dataset.ir; });

  lienzo.querySelectorAll('#consultas .consulta').forEach(el => el.onclick = () => {
    const c = CONSULTAS[+el.dataset.q];
    lienzo.querySelectorAll('#consultas .consulta').forEach(x => x.classList.remove('on'));
    el.classList.add('on');
    const caja = lienzo.querySelector('#respuesta');
    caja.innerHTML = `<div class="cinta mt-16">
      <span class="orbe hecho"></span>
      <div class="crece">${c.r()}</div>
    </div>
    <div class="fila gap-8 mt-8">
      <span class="apunte tenue">sale de ${c.dice}</span>
      <button class="btn btn-suave btn-mini" data-ver="${c.ir}">verlo →</button>
    </div>`;
    const bv = caja.querySelector('[data-ver]');
    if (bv) bv.onclick = () => { location.hash = bv.dataset.ver; };
  });
};
