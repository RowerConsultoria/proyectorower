/* ============================================================================
   EL SISTEMA — Mapa de frentes y conectores            · Fase 18 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   La topología completa en una pantalla: la central, los frentes, y qué viaja
   en cada dirección. Sube la venta, baja el cupo.

   La idea que sostiene el módulo: lo que cambia entre un frente y otro NO es
   la confianza en su dato — es EL RELOJ. Un frente que reporta cada quince
   días no es un frente sospechoso: es un frente con otra cadencia. Por eso su
   latencia se muestra como reloj de corte y nunca como advertencia.

   Y eso convierte una discusión de sistemas en una pregunta económica que la
   Junta sí puede decidir: mover este frente de mensual a semanal adelanta su
   señal veintitantos días — ¿cuánto vale eso en compra mejor dimensionada?
   ============================================================================ */

window.PANTALLAS = window.PANTALLAS || {};

const _con = { abierto: null };

/* Cuántos días de retraso arrastra la señal de cada frente. */
const DIAS_CADENCIA = {
  'evento': 0, 'cada 4 h': 0.2, 'diaria': 1, 'semanal': 7, 'quincenal': 15, 'mensual': 30,
};

/* El contrato de país: seis mensajes en cada sentido, siempre los mismos. */
const CONTRATO = {
  sube: [
    { m: 'venta facturada', d: 'lo que el frente vendió, por referencia' },
    { m: 'cobro aplicado', d: 'lo que se cobró y cuándo' },
    { m: 'existencia consumida', d: 'lo que salió al facturar' },
    { m: 'devolución recibida', d: 'lo que volvió y en qué estado' },
    { m: 'identidad fiscal del cliente', d: 'local por ley, la mantiene el frente' },
    { m: 'saldo y días de atraso', d: 'para el examen de crédito' },
  ],
  baja: [
    { m: 'catálogo y alias', d: 'el producto canónico y sus nombres' },
    { m: 'lista de precios', d: 'política regional, el frente no la edita' },
    { m: 'cupo asignado', d: 'lo que le tocó del reparto' },
    { m: 'pedido aprobado', d: 'solo cuando está listo para facturar' },
    { m: 'estado de despacho', d: 'campo que hoy no existe y el sistema le crea' },
    { m: 'reglas versionadas', d: 'con su dueño y su fecha' },
  ],
};

window.PANTALLAS['frentes/conectores'] = function (lienzo) {
  const n = v => Math.round(v || 0).toLocaleString('es-VE');
  const enVivo = FRENTES.filter(f => f.via === 'odoo');
  const porArchivo = FRENTES.filter(f => f.via === 'portal');
  const pesoTotal = FRENTES.reduce((a, f) => a + f.peso, 0);

  /* PONDERADO por la venta de cada frente, que es lo que el rótulo promete.
     La media simple daba 8,3 días contra 4,1 reales: el doble, y hacía ver la
     situación peor de lo que es. Lo correcto pesa cada frente por lo que
     vende — un cliente pequeño que reporta mensual no retrasa la señal del
     grupo tanto como sugiere contarlo igual que Venezuela. */
  const retrasoMedio = FRENTES.reduce((a, f) => a + (DIAS_CADENCIA[f.cadencia] ?? 15) * f.peso, 0) / pesoTotal;

  /* Cuánta venta del grupo llega con retraso, y de cuánto. Es la cifra que
     convierte la cadencia en una decisión económica. */
  const conRetraso = FRENTES.filter(f => (DIAS_CADENCIA[f.cadencia] ?? 15) >= 7);
  const pesoRetrasado = conRetraso.reduce((a, f) => a + f.peso, 0) / pesoTotal;

  const detalle = _con.abierto ? FRENTES.find(f => f.id === _con.abierto) : null;

  lienzo.innerHTML = `
    <div class="lienzo-cab fila-sep">
      <div>
        <div class="sobretitulo">red de frentes</div>
        <div class="titulo-seccion" style="margin-top:4px">mapa de conectores</div>
      </div>
      <button class="btn btn-fantasma btn-mini" id="ir-portal">← portal de reporte</button>
    </div>

    <div class="cinta" style="margin-bottom:20px">
      <span class="orbe hecho"></span><span class="hora">${HOY.hora}</span>
      <div class="crece"><b>sube la venta, baja el cupo</b> — ${enVivo.length} frentes conectados por
        evento y ${porArchivo.length} por archivo, con un retraso medio de
        <b>${retrasoMedio.toFixed(1)} días</b> en la señal del grupo</div>
    </div>

    <div class="rejilla rejilla-4" style="margin-bottom:22px">
      <div class="tarjeta"><div class="kpi"><div class="rotulo">frentes conectados</div>
        <div class="valor">${FRENTES.length}</div>
        <div class="pie">${enVivo.length} en vivo · ${porArchivo.length} por archivo</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">retraso medio de la señal</div>
        <div class="valor">${retrasoMedio.toFixed(1)} d</div>
        <div class="pie">ponderado por la venta de cada frente</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">venta que llega con retraso</div>
        <div class="valor" style="color:var(--n3)">${(pesoRetrasado * 100).toFixed(0)} %</div>
        <div class="pie">${conRetraso.length} frentes reportan cada semana o menos</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">mensajes del contrato</div>
        <div class="valor">${CONTRATO.sube.length} <span class="tenue" style="font-size:15px;font-weight:400">/ ${CONTRATO.baja.length}</span></div>
        <div class="pie">los mismos para todos, suba o baje</div></div></div>
    </div>

    <!-- el mapa -->
    <div class="panel" style="margin-bottom:22px">
      <div class="fila-sep">
        <div class="sobretitulo">la topología</div>
        <span class="apunte tenue">el Odoo no es la arquitectura: es un enchufe · lo que define a un
          frente es cumplir el contrato</span>
      </div>

      <div class="mapa mt-24">
        <div class="mapa-col">
          <div class="sobretitulo" style="text-align:center;margin-bottom:12px">en vivo · por evento</div>
          ${enVivo.map(f => tarjetaFrente(f)).join('')}
        </div>

        <div class="mapa-centro">
          <div class="nucleo">
            <span class="orbe orbe-grande actuando"></span>
            <div style="font-weight:700;font-size:14px;margin-top:10px">${CENTRAL.nombre}</div>
            <div class="apunte tenue" style="font-size:11px">${CENTRAL.sede}</div>
            <div class="apunte tenue mt-8" style="font-size:11px">${CENTRAL.papel}</div>
          </div>
          <div class="flechas">
            <div class="flecha sube"><span>↑ sube la venta</span></div>
            <div class="flecha baja"><span>↓ baja el cupo</span></div>
          </div>
        </div>

        <div class="mapa-col">
          <div class="sobretitulo" style="text-align:center;margin-bottom:12px">por archivo · portal</div>
          ${porArchivo.map(f => tarjetaFrente(f)).join('')}
        </div>
      </div>
    </div>

    <div class="rejilla" style="grid-template-columns:minmax(0,1fr) ${detalle ? '380px' : '0'};gap:20px;align-items:start">
      <!-- el contrato -->
      <div class="panel">
        <div class="sobretitulo">el contrato, mensaje por mensaje</div>
        <div class="apunte mt-8" style="max-width:760px">
          Son los mismos seis en cada sentido para todos los frentes. Lo que cambia es <b>cada
          cuánto viajan</b>, no cuáles son — y por eso un frente sin Odoo no pierde una sola
          funcionalidad: solo llega más tarde.
        </div>
        <div class="rejilla mt-16" style="grid-template-columns:1fr 1fr;gap:22px">
          <div>
            <div class="sobretitulo" style="color:var(--n2)">↑ lo que sube del frente</div>
            <div class="pila gap-8 mt-12">
              ${CONTRATO.sube.map(x => `<div style="font-size:12px">
                <b>${x.m}</b><div class="apunte tenue" style="font-size:11px">${x.d}</div></div>`).join('')}
            </div>
          </div>
          <div>
            <div class="sobretitulo" style="color:var(--n1)">↓ lo que baja de la central</div>
            <div class="pila gap-8 mt-12">
              ${CONTRATO.baja.map(x => `<div style="font-size:12px">
                <b>${x.m}</b><div class="apunte tenue" style="font-size:11px">${x.d}</div></div>`).join('')}
            </div>
          </div>
        </div>
      </div>
      <div id="det-con"></div>
    </div>

    <p class="apunte tenue mt-24" style="max-width:860px;line-height:1.55">
      La latencia de un frente se muestra como <b>reloj de corte</b>, igual que un banco muestra el
      suyo, y nunca como advertencia: un frente que reporta cada quince días no es sospechoso, es
      un frente con otra cadencia. Y así la conversación deja de ser de sistemas y pasa a ser
      económica — <b>¿cuánto vale adelantar la señal de este frente?</b>
    </p>`;

  /* La moneda en la que ese frente lee su propio negocio. El central le
     factura en USD —es un cliente mayor de la central—, pero su gerente,
     su Odoo y su Excel hablan en esto. Las dos cosas son ciertas a la vez. */
  /* Declaradas como función, no como const: `tarjetaFrente` se invoca desde la
     plantilla que está más arriba en el archivo, y una const aún no inicializada
     revienta ahí mismo. */
  function monedaDe(f) { return MONEDA_FRENTE[f.id] || 'USD'; }

  /* Solo se anota la tasa cuando hay conversión que hacer. Sellar «USD» con
     una tasa de 1 sería ruido con aire de rigor. */
  function tasaFrente(f) {
    const m = monedaDe(f);
    if (m === 'USD') return '';
    const t = tasaDe(m);
    return ` · <span class="${t.vencida ? 'texto-alerta' : ''}" title="1 USD = ${t.tasa.toLocaleString('es-VE')} ${m}, del ${t.desde} (${t.fuente})">tasa ${t.edad} d${t.vencida ? ' ⚠' : ''}</span>`;
  }

  function tarjetaFrente(f) {
    const dias = DIAS_CADENCIA[f.cadencia] ?? 15;
    const cuota = f.peso / pesoTotal;
    return `<div class="nodo ${_con.abierto === f.id ? 'sel' : ''}" data-f="${f.id}">
      <div class="fila-sep">
        <div style="min-width:0">
          <div class="fila gap-8"><b style="font-size:12.5px">${f.nombre}</b>
            <span class="via ${f.via === 'odoo' ? 'via-odoo' : 'via-portal'}">${f.via}</span></div>
          <div class="apunte tenue" style="font-size:10.5px;margin-top:3px">${f.pais} ·
            ${TIPOS_FRENTE[f.tipo].rotulo} · ${monedaDe(f)}${tasaFrente(f)}</div>
        </div>
        <div style="text-align:right;flex:none">
          <div class="corte">${f.corte}</div>
          <div class="apunte tenue" style="font-size:10px">${f.cadencia}</div>
        </div>
      </div>
      <div class="barra mt-8" style="height:4px">
        <span style="width:${(cuota * 100 / 0.3).toFixed(0)}%;background:${dias >= 7 ? 'var(--n3)' : 'var(--gradiente)'}"></span>
      </div>
    </div>`;
  }

  function pintaDetalle() {
    const c = lienzo.querySelector('#det-con');
    if (!detalle) { c.innerHTML = ''; return; }
    const f = detalle;
    const dias = DIAS_CADENCIA[f.cadencia] ?? 15;
    const cuota = f.peso / pesoTotal;
    const fmt = FORMATOS_PORTAL[f.id];
    /* La pregunta económica: adelantar la señal de este frente a semanal. */
    const gana = Math.max(0, dias - 7);
    const ventaMes = Math.round(CATALOGO.reduce((a, p) => a + demandaSaneada(p.sku).mensual, 0) * cuota);

    c.innerHTML = `<div class="explica">
      <div class="fila-sep"><div class="sobretitulo">conexión del frente</div>
        <button class="btn btn-fantasma btn-mini" id="cerrar-con">✕</button></div>
      <h4 class="mt-16">${f.nombre}</h4>
      <div class="apunte tenue" style="margin-top:3px">${f.pais} · ${TIPOS_FRENTE[f.tipo].rotulo}</div>
      ${f.nota ? `<div class="apunte mt-8">${f.nota}</div>` : ''}

      <ul class="razones">
        <li><b>Vía:</b> ${f.via === 'odoo'
          ? 'su Odoo, conectado por evento. La venta entra sola en menos de un minuto.'
          : `portal de reporte. Sube <span class="mono">${fmt ? fmt.archivo : 'su archivo'}</span> con sus propias columnas.`}</li>
        <li><b>Cadencia:</b> ${f.cadencia} · último corte ${f.corte}.</li>
        <li class="${dias >= 7 ? 'aviso' : 'clave'}"><b>Retraso de la señal:</b> ${dias} día${dias === 1 ? '' : 's'}.
          Su venta pesa el <b>${(cuota * 100).toFixed(0)} %</b> del grupo, unas
          <b>${n(ventaMes)} u/mes</b>.</li>
        <li><b>Moneda:</b> ${f.moneda}${f.moneda !== 'USD' ? ' — se convierte con la tasa del día, fechada' : ''}.</li>
        <li><b>Publicación:</b> ${f.politicaPublicacion === 'exacta'
          ? 'cantidad exacta' : 'por rango, como reserva de información'}.</li>
      </ul>

      ${gana ? `
      <div class="bloqueo mt-16">
        <div class="sobretitulo" style="color:var(--n3)">la pregunta económica</div>
        <div class="apunte mt-8">
          Pasar este frente de <b>${f.cadencia}</b> a <b>semanal</b> adelanta su señal
          <b>${gana} días</b>. Con ${n(ventaMes)} u/mes, eso es
          <b>${n(Math.round(ventaMes * gana / 30))} u</b> de venta que hoy se conoce tarde y llega a
          la mesa de compra cuando el pedido del mes ya salió.
        </div>
        <div class="apunte tenue mt-8" style="font-size:11.5px">
          No es una decisión de sistemas: es cuánto vale esa señal contra lo que cueste conectarlo.
        </div>
      </div>` : `
      <div class="apunte tenue mt-16" style="font-size:11.5px">
        Este frente ya reporta con la cadencia más rápida que necesita el ciclo de compra.
      </div>`}
    </div>`;
    const x = c.querySelector('#cerrar-con');
    if (x) x.onclick = () => { _con.abierto = null; window.PANTALLAS['frentes/conectores'](lienzo); };
  }

  lienzo.querySelectorAll('[data-f]').forEach(el => el.onclick = () => {
    _con.abierto = _con.abierto === el.dataset.f ? null : el.dataset.f;
    window.PANTALLAS['frentes/conectores'](lienzo);
  });
  lienzo.querySelector('#ir-portal').onclick = () => { location.hash = '#/frentes'; };

  pintaDetalle();
};
