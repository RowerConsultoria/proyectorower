/* ============================================================================
   PORTAL DEL CLIENTE                                    · Fase 32 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   La otra cara del portal de reporte de la fase 17: allí se ve, desde dentro,
   lo que los frentes suben; aquí se ve desde el lado del cliente.

   Cinco pestañas: comprar · preventa · mis pedidos · reportar ventas · mi
   cuenta. Y tres cosas que el prototipo defiende y aquí se ven de frente:

   · el crédito BLOQUEA con motivo escrito, nunca en silencio;
   · la precedencia en escasez es una escalera PUBLICADA, no un algoritmo
     oculto: el cliente ve en qué peldaño entra su preventa y por qué;
   · lo que el cliente reporta es lo que determina cómo de bien vemos su
     inventario — la banda de la fase 28, dicha a su dueño.

   ⚠️ FUENTE ÚNICA: precios de CATALOGO, crédito de red.js, disponible del
   mismo `disponible()`/`atp()` del núcleo, reparto del turno, reporte de
   reportes.js. Aquí no nace ninguna cifra.
   ============================================================================ */

const _c = {
  pest: 'comprar',
  cliente: 'CR',
  busca: '',
  marca: 'todas',
  carro: {},          // sku → unidades
  hecho: null,        // el pedido recién confirmado
  subido: false,      // el reporte de ventas ya subido en esta sesión
  tema: localStorage.getItem('kx.tema') || 'oscuro',
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const n = v => Math.round(v || 0).toLocaleString('es-VE');
const esc = t => String(t).replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));

function devuelveFoco(el) {
  if (!el) return;
  el.focus();
  if (el.type === 'number') return;
  try { el.setSelectionRange(el.value.length, el.value.length); } catch (e) {}
}

const yo = () => FRENTES.find(f => f.id === _c.cliente);

/* Su moneda, para leer su negocio como lo lee él. La central factura en USD
   —regla de la arquitectura: ninguna cifra sin moneda y sin tasa fechada—. */
const miMoneda = () => MONEDA_FRENTE[_c.cliente] || 'USD';

/* En qué peldaño de la ESCALERA entra lo que este cliente aparta. No es una
   cortesía: es la política publicada del reparto en escasez, y verla es lo que
   convierte «no me alcanzó» en «me alcanzó según esta regla». */
function miPeldano() {
  const f = yo();
  if (f.tipo === 'propio' || f.tipo === 'socio') return ESCALERA.find(e => e.clave === 'nominal');
  return ESCALERA.find(e => e.clave === 'ciclo');
}

/* ── el carrito ── */
const carroLineas = () => Object.entries(_c.carro)
  .filter(([, u]) => u > 0)
  .map(([sku, u]) => ({ p: CATALOGO.find(x => x.sku === sku), u }))
  .filter(x => x.p);
const carroTotalUSD = () => carroLineas().reduce((a, x) => a + valorMayoreo(x.p, x.u), 0);
const carroUnidades = () => carroLineas().reduce((a, x) => a + x.u, 0);

/* ══════════════════════════════════════════════════════ pintar ══════════ */

function pinta() {
  pintaCabecera();
  pintaPestanas();
  const l = $('#p-lienzo');
  ({ comprar: pintaComprar, preventa: pintaPreventa, pedidos: pintaPedidos,
     reportar: pintaReportar, cuenta: pintaCuenta })[_c.pest](l);
}

function pintaCabecera() {
  const sel = $('#cliente');
  if (!sel.options.length) {
    sel.innerHTML = FRENTES.map(f =>
      `<option value="${f.id}">${esc(f.nombre)} · ${esc(f.pais)}</option>`).join('');
  }
  sel.value = _c.cliente;
  const f = yo();
  const pct = Math.round(f.saldo / f.credito * 100);
  $('#p-yo').innerHTML = `<b>${esc(f.nombre)}</b>${esc(f.pais)} ·
    crédito disponible: ${dinero(f.credito - f.saldo)} de ${dinero(f.credito)} (${100 - pct} %)`;
}

function pintaPestanas() {
  const P = [
    ['comprar', 'comprar', carroUnidades() ? carroLineas().length : ''],
    ['preventa', 'preventa', TRANSITOS.length],
    ['pedidos', 'mis pedidos', PEDIDOS.filter(x => x.frente === _c.cliente).length],
    ['reportar', 'reportar ventas', ''],
    ['cuenta', 'mi cuenta', ''],
  ];
  $('#p-pest').innerHTML = P.map(([k, r, c]) =>
    `<button class="${k === _c.pest ? 'on' : ''}" data-pest="${k}">${r}${
      c !== '' ? `<span class="cuenta">${c}</span>` : ''}</button>`).join('');
  $$('#p-pest [data-pest]').forEach(b => {
    b.onclick = () => { _c.pest = b.dataset.pest; _c.hecho = null; pinta(); };
  });
}

/* ────────────────────────────────────────────── pestaña: comprar ──────── */

function pintaComprar(l) {
  const f = yo();
  const disponibleCred = f.credito - f.saldo;
  const filas = CATALOGO
    .filter(p => _c.marca === 'todas' || p.marca === _c.marca)
    .filter(p => !_c.busca || (p.nombre + ' ' + p.ref + ' ' + p.sku)
      .toLowerCase().includes(_c.busca.toLowerCase()))
    .map(p => ({ p, ...atp(p.sku) }))
    .filter(x => x.total > 0)
    .sort((a, b) => b.total - a.total);

  const totalUSD = carroTotalUSD();
  const excede = totalUSD > disponibleCred;
  const mon = miMoneda();

  l.innerHTML = `
    ${_c.hecho ? tarjetaConfirmado() : ''}

    <div class="fila-sep" style="margin-bottom:18px;flex-wrap:wrap;gap:12px">
      <div>
        <div class="sobretitulo">catálogo</div>
        <div class="titulo-seccion" style="margin-top:4px">hacer un pedido</div>
      </div>
      <div class="fila gap-8" style="flex-wrap:wrap">
        <input class="p-cant" style="width:210px;text-align:left" id="busca"
          placeholder="buscar referencia…" value="${esc(_c.busca)}">
        ${['todas', 'Casio', 'Cubitt'].map(m =>
          `<button class="btn btn-mini ${_c.marca === m ? 'btn-suave' : 'btn-fantasma'}"
            data-marca="${m}">${m === 'todas' ? 'ambas marcas' : m}</button>`).join('')}
      </div>
    </div>

    <div class="cinta" style="margin-bottom:20px">
      <span class="orbe hecho"></span><span class="hora">${HOY.hora}</span>
      <div class="crece">tiene <b>${dinero(disponibleCred)}</b> de crédito disponible y
        <b>${n(filas.length)} referencias</b> con existencia para pedir hoy.
        Lo que ya está comprometido con otro cliente no aparece</div>
    </div>

    <div class="p-scroll">
      <table class="tabla">
        <thead><tr>
          <th>referencia</th><th class="num">precio · ${mon}</th>
          <th class="num">disponible · u</th><th class="num" style="width:120px">pedir</th>
        </tr></thead>
        <tbody>
          ${filas.map(x => {
            const precioUSD = valorMayoreo(x.p);
            const precioLocal = mon === 'USD' ? precioUSD : deUSD(precioUSD, mon).valor;
            return `<tr data-sku="${x.p.sku}">
              <td><div class="c-ref">
                <img src="../img/${x.p.img}" alt="" loading="lazy">
                <div><div class="n">${esc(x.p.nombre)}</div>
                  <div class="s">${esc(x.p.marca)} · ${esc(x.p.ref)}</div></div>
              </div></td>
              <td class="num c-precio">${dinero(precioLocal, mon)}</td>
              <td class="num"><span class="c-atp">${n(x.total)}</span>
                <div class="apunte tenue" style="font-size:10px">${n(x.hub)} ya · ${n(x.enMar)} en camino</div></td>
              <td class="num"><input class="p-cant c-cant" type="number" min="0" max="${x.total}"
                data-pedir="${x.p.sku}" value="${_c.carro[x.p.sku] || ''}" placeholder="0"></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>

    ${carroLineas().length ? `
    <div class="c-carro">
      <div class="fila-sep">
        <b style="font-size:13.5px">su pedido · ${n(carroUnidades())} u en ${carroLineas().length}
          ${carroLineas().length === 1 ? 'referencia' : 'referencias'}</b>
        <span class="apunte tenue">se factura en USD · su plaza opera en ${mon}</span>
      </div>
      <div class="lineas">
        ${carroLineas().map(x => `<div class="lin">
          <span class="crece">${esc(x.p.nombre)}</span>
          <span class="q">${n(x.u)} u</span>
          <span class="q">${dinero(valorMayoreo(x.p, x.u))}</span>
          <button class="x" data-quita="${x.p.sku}" title="quitar">✕</button>
        </div>`).join('')}
      </div>
      <div class="fila-sep" style="border-top:1px solid var(--borde);padding-top:12px">
        <div>
          <div class="apunte tenue">total del pedido</div>
          <div class="cifra-media" id="c-total">${dinero(totalUSD)}</div>
          ${mon !== 'USD' ? `<div class="apunte tenue">≈ ${dinero(deUSD(totalUSD, mon).valor, mon)}
            a la tasa del ${esc(tasaDe(mon).desde)}</div>` : ''}
        </div>
        <div style="text-align:right">
          <div class="apunte tenue">crédito disponible</div>
          <div class="cifra-media" style="color:${excede ? 'var(--riesgo)' : 'inherit'}">${dinero(disponibleCred)}</div>
        </div>
        <button class="btn btn-marca" id="confirmar" ${excede ? 'disabled' : ''}>confirmar el pedido</button>
      </div>

      ${excede ? `
      <div class="c-bloqueo" id="c-bloqueo">
        <b>Este pedido excede su línea de crédito en ${dinero(totalUSD - disponibleCred)}.</b>
        <div class="apunte" style="margin-top:5px">Su límite es ${dinero(f.credito)} y tiene
          ${dinero(f.saldo)} consumidos${f.atraso ? `, con <b>${f.atraso} días de atraso</b> sobre un vencimiento` : ''}.
          Puede quitar líneas, o hablar con su ejecutivo para revisar el límite —
          <b>el sistema no lo deja pasar en silencio ni lo aprueba solo</b>.</div>
      </div>` : ''}
    </div>` : ''}

    <p class="apunte tenue mt-24" style="max-width:860px;line-height:1.55">
      El <b>disponible</b> incluye lo que ya está en Colón y lo que viene en camino, descontando lo
      que otro cliente ya tiene apartado. Pedir de lo que viene en camino es una
      <a href="javascript:void(0)" data-ir-prev>preventa</a>: se sirve al llegar el contenedor y entra
      en la escalera de precedencia con su peldaño.
    </p>`;

  const b = $('#busca', l);
  b.oninput = () => { _c.busca = b.value; pintaComprar(l); devuelveFoco($('#busca', l)); };
  $$('[data-marca]', l).forEach(x => {
    x.onclick = () => { _c.marca = x.dataset.marca; pintaComprar(l); };
  });
  $$('[data-pedir]', l).forEach(inp => {
    inp.oninput = () => {
      const sku = inp.dataset.pedir;
      const max = atp(sku).total;
      const u = Math.max(0, Math.min(max, parseInt(inp.value, 10) || 0));
      _c.carro[sku] = u;
      if (!u) delete _c.carro[sku];
      pintaComprar(l);
      pintaPestanas();
      const nu = $(`[data-pedir="${sku}"]`, l);
      devuelveFoco(nu);
    };
  });
  $$('[data-quita]', l).forEach(x => {
    x.onclick = () => { delete _c.carro[x.dataset.quita]; pinta(); };
  });
  const c = $('#confirmar', l);
  if (c) c.onclick = () => { confirmaPedido(); pinta(); };
  const ip = $('[data-ir-prev]', l);
  if (ip) ip.onclick = () => { _c.pest = 'preventa'; pinta(); };
}

function tarjetaConfirmado() {
  const h = _c.hecho;
  return `<div class="panel" style="border-left:3px solid var(--menta);margin-bottom:20px">
    <div class="fila gap-8">
      <span class="orbe hecho"></span>
      <b style="font-size:14px">pedido ${esc(h.id)} recibido</b>
      <span class="marca-estado e-ok">${n(h.u)} u · ${dinero(h.usd)}</span>
    </div>
    <div class="apunte tenue mt-8" style="max-width:760px">${h.texto}</div>
  </div>`;
}

function confirmaPedido() {
  const f = yo();
  const lineas = carroLineas();
  if (!lineas.length) return;
  const usd = carroTotalUSD();
  if (usd > f.credito - f.saldo) return;   // el botón ya está apagado; cinturón y tirantes

  const u = carroUnidades();
  const pel = miPeldano();
  const deMar = lineas.filter(x => atp(x.p.sku).hub < x.u).length;
  const id = 'PED-' + HOY.anio + '-' + (200 + PEDIDOS.length);

  /* el pedido entra en el modelo, no en una variable de esta pantalla: la
     pestaña «mis pedidos» y el módulo comercial del aplicativo leen de ahí */
  PEDIDOS.push({
    id, frente: f.id, fecha: `${HOY.anio}-08-${HOY.dia}`,
    lineas: lineas.map(x => ({ sku: x.p.sku, pide: x.u })),
    cobrado: false, reservaNominal: pel.clave === 'nominal', dentroDeCiclo: true,
    delPortal: true,
  });

  anota({
    accion: 'Y-01 · pedido recibido por el portal del cliente',
    agente: 'portal del cliente', modulo: 'comercial',
    dispara: `${f.nombre} confirmó un pedido desde su portal`,
    salida: `${id} · ${n(u)} u en ${lineas.length} referencias por ${dinero(usd)} · ` +
            `dentro de su crédito disponible (${dinero(f.credito - f.saldo)}) · ` +
            `entra en la escalera en el peldaño ${pel.n}, «${pel.t}»`,
    /* «caja» y no un valor inventado: un pedido confirmado compromete la
       línea de crédito del cliente. El eje `dinero` solo admite
       ninguno · caja · ingreso — lo cazó la comprobación al primer intento. */
    ejes: { perimetro: 'interno', reversibilidad: 'humana', radio: 'frente', dinero: 'caja', reloj: 'alcanza' },
    cruza: 'comercial',
    reglas: ['coberturaObjetivo'],
  });

  _c.hecho = {
    id, u, usd,
    texto: `Entra en la escalera de precedencia en el <b>peldaño ${pel.n} — ${esc(pel.t)}</b>. ` +
      (deMar ? `<b>${deMar} ${deMar === 1 ? 'línea sale' : 'líneas salen'} de lo que viene en camino</b>: ` +
               'se sirve al llegar el contenedor. ' : '') +
      'Su ejecutivo lo ve en la bandeja de aprobación del sistema — ' +
      '<b>ningún pedido se aplica sin que una persona lo firme</b>.',
  };
  _c.carro = {};
}

/* ────────────────────────────────────────────── pestaña: preventa ─────── */

function pintaPreventa(l) {
  const pel = miPeldano();
  const f = yo();

  l.innerHTML = `
    <div class="fila-sep" style="margin-bottom:18px">
      <div>
        <div class="sobretitulo">lo que viene en camino</div>
        <div class="titulo-seccion" style="margin-top:4px">preventa</div>
      </div>
    </div>

    <div class="cinta" style="margin-bottom:20px">
      <span class="orbe hecho"></span><span class="hora">${HOY.hora}</span>
      <div class="crece">${TRANSITOS.length} contenedores en camino a Colón. Puede pedir de ellos
        <b>antes de que lleguen</b>: se le sirve al llegar, y su preventa entra en la escalera de
        precedencia en el <b>peldaño ${pel.n}</b></div>
    </div>

    <div class="panel" style="margin-bottom:20px">
      <b style="font-size:13.5px">la escalera de precedencia, publicada</b>
      <div class="apunte tenue mt-8" style="max-width:800px">Cuando no alcanza para todos, el reparto
        no lo decide nadie en el momento: lo decide esta escalera, que está escrita y es la misma para
        todos los clientes. <b>Usted entra en el peldaño ${pel.n}</b> por ser
        ${esc(f.tipo === 'propio' ? 'un frente propio' : f.tipo === 'socio' ? 'socio' : 'cliente de la red')}.</div>
      <div class="c-escalera">
        ${ESCALERA.map(e => `<div class="pel ${e.n === pel.n ? 'mio' : ''}" data-pel="${e.n}">
          <span class="n">${e.n}</span><span>${esc(e.t)}</span>
          ${e.n === pel.n ? '<span class="marca-estado e-ok" style="margin-left:auto">usted</span>' : ''}
        </div>`).join('')}
      </div>
    </div>

    <div class="pila gap-12">
      ${TRANSITOS.map(t => {
        const lin = lineasEmbarque(t);
        const libre = lin.reduce((a, x) => a + disponible(x.p.sku, t.id), 0);
        const total = lin.reduce((a, x) => a + x.u, 0);
        const pct = total ? Math.round((total - libre) / total * 100) : 0;
        const top = [...lin].sort((a, b) => disponible(b.p.sku, t.id) - disponible(a.p.sku, t.id)).slice(0, 4);
        return `<div class="panel" data-emb="${t.id}">
          <div class="fila-sep" style="flex-wrap:wrap;gap:10px">
            <div>
              <div class="fila gap-8">
                <b style="font-size:14px" class="mono">${esc(t.id)}</b>
                <span class="marca-estado ${t.modo === 'aéreo' ? 'e-ok' : 'e-neutro'}">${esc(t.modo)}</span>
                <span class="marca-estado e-neutro">${esc(t.etapa)}</span>
              </div>
              <div class="apunte tenue mt-8">${esc(t.origen)} → Colón · llega el <b>${esc(t.eta)}</b></div>
            </div>
            <div class="fila gap-24" style="text-align:right">
              <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">disponible · u</div>
                <div class="cifra-media emb-libre">${n(libre)}</div></div>
            </div>
          </div>
          <div class="p-amarre" style="display:flex;align-items:center;gap:10px;margin-top:10px">
            <div class="barra crece ${pct >= 70 ? 'parcial' : ''}"><span style="width:${pct}%"></span></div>
            <span class="apunte tenue" style="flex:none">${pct} % ya comprometido</span>
          </div>
          <div class="apunte tenue mt-8">disponible de este contenedor:
            ${top.map(x => `${esc(x.p.nombre)} (${n(disponible(x.p.sku, t.id))} u)`).join(' · ')}</div>
          <button class="btn btn-suave btn-mini mt-16" data-ir-comprar>pedir de este contenedor →</button>
        </div>`;
      }).join('')}
    </div>

    <p class="apunte tenue mt-24" style="max-width:860px;line-height:1.55">
      Una preventa <b>no es una promesa vaga</b>: aparta unidades de un contenedor concreto y esas
      unidades desaparecen del disponible de todos los demás. Por eso el porcentaje comprometido de
      cada contenedor sube en cuanto alguien —usted u otro cliente— aparta.
    </p>`;

  $$('[data-ir-comprar]', l).forEach(b => {
    b.onclick = () => { _c.pest = 'comprar'; pinta(); };
  });
}

/* ─────────────────────────────────────────── pestaña: mis pedidos ─────── */

/* ⚠️ `ETAPAS` ya existe como global en los datos del prototipo: dos scripts
   clásicos en la misma página comparten el ámbito global y un `const`
   repetido tumba la página entera. Los portales cargan el mismo núcleo que
   el aplicativo, así que todo lo suyo va con prefijo. */
const ETAPAS_PEDIDO = ['recibido', 'aprobado', 'preparado', 'despachado', 'entregado'];

function pintaPedidos(l) {
  const f = yo();
  const mios = PEDIDOS.filter(x => x.frente === _c.cliente);
  const rep = datosDe('X-01') || { porFrente: {} };
  const mio = rep.porFrente[_c.cliente];

  l.innerHTML = `
    <div class="fila-sep" style="margin-bottom:18px">
      <div>
        <div class="sobretitulo">historial y seguimiento</div>
        <div class="titulo-seccion" style="margin-top:4px">mis pedidos</div>
      </div>
    </div>

    ${mio ? `
    <div class="cinta" style="margin-bottom:20px">
      <span class="orbe hecho"></span><span class="hora">${HOY.hora}</span>
      <div class="crece">del reparto de anoche le corresponden <b>${n(mio.recibe)} u</b> de las
        <b>${n(mio.pide)} u</b> que pidió — un
        <b>${mio.pide ? Math.round(mio.recibe / mio.pide * 100) : 100} % de servicio</b>.
        ${mio.recibe < mio.pide
          ? 'Lo que no alcanzó no se borra: vuelve a la mesa del mes siguiente'
          : 'Se sirvió completo'}</div>
    </div>` : ''}

    <div class="pila gap-12">
      ${mios.length ? mios.map((ped, i) => {
        const u = ped.lineas.reduce((a, x) => a + x.pide, 0);
        const usd = ped.lineas.reduce((a, x) => {
          const p = CATALOGO.find(y => y.sku === x.sku);
          return a + (p ? valorMayoreo(p, x.pide) : 0);
        }, 0);
        /* la etapa avanza con la antigüedad del pedido: los del portal acaban
           de nacer, los del sistema llevan un día */
        const etapa = ped.delPortal ? 0 : Math.min(ETAPAS_PEDIDO.length - 1, 1 + (i % 3));
        return `<div class="panel" data-ped="${esc(ped.id)}">
          <div class="fila-sep" style="flex-wrap:wrap;gap:10px">
            <div>
              <div class="fila gap-8">
                <b style="font-size:14px" class="mono">${esc(ped.id)}</b>
                <span class="marca-estado ${etapa >= 3 ? 'e-ok' : 'e-neutro'}">${ETAPAS_PEDIDO[etapa]}</span>
                ${ped.delPortal ? '<span class="marca-estado e-alerta">pedido por este portal</span>' : ''}
                ${ped.cobrado ? '<span class="marca-estado e-ok">cobrado</span>' : ''}
              </div>
              <div class="apunte tenue mt-8">${esc(ped.fecha)} · ${ped.lineas.length} referencias</div>
            </div>
            <div class="fila gap-24" style="text-align:right">
              <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">unidades</div>
                <div class="cifra-media ped-u">${n(u)}</div></div>
              <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">valor</div>
                <div class="cifra-media">${dinero(usd)}</div></div>
            </div>
          </div>
          <div class="c-ruta">
            ${ETAPAS_PEDIDO.map((e, k) => `<div class="pa ${k < etapa ? 'ya' : ''} ${k === etapa ? 'ya aqui' : ''}">${e}</div>`).join('')}
          </div>
          <div class="apunte tenue mt-8">${ped.lineas.slice(0, 4).map(x => {
            const p = CATALOGO.find(y => y.sku === x.sku);
            return `${esc(p ? p.nombre : x.sku)} (${n(x.pide)} u)`;
          }).join(' · ')}${ped.lineas.length > 4 ? ` · +${ped.lineas.length - 4} más` : ''}</div>
        </div>`;
      }).join('') : `<div class="panel" style="text-align:center;padding:40px">
        <b style="font-size:14px">todavía no hay pedidos</b>
        <p class="apunte tenue" style="margin-top:8px">Su primer pedido aparecerá aquí con su seguimiento.</p>
      </div>`}
    </div>

    <p class="apunte tenue mt-24" style="max-width:860px;line-height:1.55">
      El seguimiento no es un correo que alguien recuerda mandar: es el estado real del pedido en el
      sistema. Y lo que se pidió y no se pudo servir <b>queda registrado</b> —no se borra la línea—,
      para que vuelva a la mesa de compra del mes siguiente.
    </p>`;
}

/* ──────────────────────────────────────── pestaña: reportar ventas ────── */

function pintaReportar(l) {
  const f = yo();
  const r = REPORTES[_c.cliente];
  const dist = inventarioDistribuido().clientes.find(c => c.f.id === _c.cliente);

  if (!r) {
    l.innerHTML = `
      <div class="fila-sep" style="margin-bottom:18px">
        <div><div class="sobretitulo">su venta</div>
          <div class="titulo-seccion" style="margin-top:4px">reportar ventas</div></div>
      </div>
      <div class="panel">
        <b style="font-size:14px">no hace falta: su sistema ya está conectado</b>
        <p class="apunte tenue" style="margin-top:8px;max-width:740px">${esc(f.nombre)} reporta por
          <b>${esc(f.via)}</b> con cadencia <b>${esc(f.cadencia)}</b> — su venta entra sola, en cuanto
          ocurre. Por eso su inventario se ve <b>sin banda de incertidumbre</b>: no hay días de venta
          que no hayamos visto todavía.</p>
      </div>`;
    return;
  }

  const total = r.filas.length;
  const reconocidas = r.filas.filter(x => x.resuelto).length;
  const cola = total - reconocidas;
  const u = r.filas.reduce((a, x) => a + x.cant, 0);

  l.innerHTML = `
    <div class="fila-sep" style="margin-bottom:18px">
      <div>
        <div class="sobretitulo">su venta</div>
        <div class="titulo-seccion" style="margin-top:4px">reportar ventas</div>
      </div>
    </div>

    <div class="cinta" style="margin-bottom:20px">
      <span class="orbe ${_c.subido ? 'hecho' : ''}"></span><span class="hora">${HOY.hora}</span>
      <div class="crece">${_c.subido
        ? `recibí <b>${esc(r.archivo)}</b>: ${total} líneas, <b>${reconocidas} reconocidas</b> solas y
           ${cola} en cola con sus candidatas`
        : `suba su archivo <b>tal como lo tiene</b> — con sus columnas y sus nombres.
           No hay que cambiar nada de su lado`}</div>
    </div>

    <div class="panel" style="margin-bottom:20px">
      <div class="fila-sep" style="flex-wrap:wrap;gap:12px">
        <div>
          <b style="font-size:13.5px">${esc(r.archivo)}</b>
          <div class="apunte tenue mt-8">${total} líneas · ${n(u)} unidades vendidas ·
            su formato de siempre</div>
        </div>
        <button class="btn ${_c.subido ? 'btn-fantasma' : 'btn-marca'}" id="subir"
          ${_c.subido ? 'disabled' : ''}>${_c.subido ? 'archivo recibido' : 'subir el archivo'}</button>
      </div>

      ${_c.subido ? `
      <div class="c-reco" title="${reconocidas} reconocidas de ${total}">
        <span class="ok" style="width:${Math.round(reconocidas / total * 100)}%"></span>
        <span class="cola" style="width:${Math.round(cola / total * 100)}%"></span>
      </div>
      <div class="fila gap-8" style="flex-wrap:wrap">
        <span class="marca-estado e-ok">${reconocidas} reconocidas por encima del
          ${Math.round(REGLAS.confianzaAlias.v * 100)} % de confianza</span>
        ${cola ? `<span class="marca-estado e-alerta"><i class="punto"></i>${cola} en cola con sus
          tres mejores candidatas</span>` : ''}
      </div>
      <div class="apunte tenue mt-16" style="max-width:800px">
        Lo que no se reconoce <b>no se adivina ni se descarta</b>: queda en una cola con un
        responsable, que decide. Es el mismo cedazo que protege todo lo que el sistema calcula
        después — un dato mal reconocido contamina la compra de tres meses.
      </div>
      <table class="tabla mt-16">
        <thead><tr><th>como viene en su archivo</th><th class="num">cant.</th><th>qué reconocimos</th></tr></thead>
        <tbody>
          ${r.filas.slice(0, 8).map(x => {
            const p = x.sku ? CATALOGO.find(y => y.sku === x.sku) : null;
            return `<tr>
              <td class="mono" style="font-size:12px">${esc(x.nombre)}</td>
              <td class="num">${n(x.cant)}</td>
              <td>${p ? `<b>${esc(p.nombre)}</b>`
                : '<span class="marca-estado e-alerta">en cola · esperando decisión</span>'}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>` : ''}
    </div>

    ${dist ? `
    <div class="panel">
      <b style="font-size:13.5px">por qué le pedimos esto</b>
      <div class="apunte tenue mt-8" style="max-width:820px">
        Con lo que nos despacharon y lo que usted reporta, estimamos que hoy tiene
        <b>${n(dist.estimado)} unidades</b>. Como su último corte es de
        <b>${esc(f.corte)}</b>, puede haber vendido hasta <b>${n(dist.banda)} u</b> que todavía no
        hemos visto: su inventario real está entre <b>${n(dist.estimado - dist.banda)}</b> y
        <b>${n(dist.estimado)}</b>.
      </div>
      <div class="fila gap-8 mt-16" style="flex-wrap:wrap;align-items:center">
        <span class="marca-estado ${dist.confianza.clase}"><i class="punto"></i>estimación ${dist.confianza.r}</span>
        <span class="apunte tenue">${dist.banda
          ? `reportar más seguido reduce esa banda — y con ella, el riesgo de que le llegue de menos
             en un reparto en escasez`
          : 'reporta al día: le vemos el inventario como si fuera nuestro'}</span>
      </div>
    </div>` : ''}`;

  const b = $('#subir', l);
  if (b) b.onclick = () => {
    _c.subido = true;
    anota({
      accion: 'Y-02 · el cliente subió su reporte de venta',
      agente: 'portal del cliente', modulo: 'frentes',
      dispara: `${f.nombre} subió ${r.archivo} desde su portal`,
      salida: `${total} líneas · ${reconocidas} reconocidas por encima del ` +
              `${Math.round(REGLAS.confianzaAlias.v * 100)} % de confianza · ` +
              `${cola} a la cola con sus tres mejores candidatas`,
      ejes: { perimetro: 'interno', reversibilidad: 'clic', radio: 'sistema', dinero: 'ninguno', reloj: 'alcanza' },
      firmante: f.nombre, cruza: 'cimiento',
      reglas: ['confianzaAlias'],
    });
    pinta();
  };
}

/* ────────────────────────────────────────────── pestaña: mi cuenta ────── */

function pintaCuenta(l) {
  const f = yo();
  const mon = miMoneda();
  const pct = Math.round(f.saldo / f.credito * 100);
  const promos = promosDe(_c.cliente);
  const dist = inventarioDistribuido().clientes.find(c => c.f.id === _c.cliente);
  const t = tasaDe(mon);

  l.innerHTML = `
    <div class="fila-sep" style="margin-bottom:18px">
      <div>
        <div class="sobretitulo">su relación con Kenex</div>
        <div class="titulo-seccion" style="margin-top:4px">mi cuenta</div>
      </div>
    </div>

    <div class="rejilla rejilla-4" style="margin-bottom:22px">
      <div class="tarjeta"><div class="kpi"><div class="rotulo">línea de crédito</div>
        <div class="valor" id="c-limite">${dinero(f.credito)}</div>
        <div class="pie">límite otorgado</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">consumido</div>
        <div class="valor">${dinero(f.saldo)}</div>
        <div class="pie">${pct} % del límite</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">disponible</div>
        <div class="valor" id="c-disp">${dinero(f.credito - f.saldo)}</div>
        <div class="pie">para pedir hoy</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">vencimientos</div>
        <div class="valor" style="color:${f.atraso ? 'var(--riesgo)' : 'inherit'}">${f.atraso} d</div>
        <div class="pie">${f.atraso ? 'de atraso sobre un vencimiento' : 'al día'}</div></div></div>
    </div>

    <div class="panel" style="margin-bottom:20px">
      <div class="fila-sep"><b style="font-size:13.5px">su crédito</b>
        <span class="apunte tenue">${100 - pct} % disponible</span></div>
      <div class="fila gap-8 mt-16" style="align-items:center">
        <div class="barra crece ${pct >= 70 ? 'parcial' : ''}"><span style="width:${Math.min(100, pct)}%"></span></div>
      </div>
      ${f.atraso ? `<div class="c-bloqueo" style="margin-top:14px">
        <b>Tiene ${f.atraso} días de atraso sobre un vencimiento.</b>
        <div class="apunte" style="margin-top:5px">Su límite sigue disponible, pero el atraso lo ve su
          ejecutivo y pesa cuando hay que decidir un reparto en escasez. Regularizarlo es lo que más
          rápido mejora su posición.</div>
      </div>` : ''}
      ${mon !== 'USD' ? `<div class="apunte tenue mt-16">Se le factura en <b>USD</b> y su plaza opera en
        <b>${esc(mon)}</b>. La tasa que usamos es la del <b>${esc(t.desde)}</b>${t.vencida
          ? ' — <b style="color:var(--alerta)">vencida</b>, así que las conversiones van marcadas'
          : ''}: ninguna cifra de este portal existe sin su moneda y su tasa fechada.</div>` : ''}
    </div>

    <div class="panel" style="margin-bottom:20px">
      <b style="font-size:13.5px">promociones activas para usted</b>
      ${promos.length ? `<div class="pila gap-8 mt-16">
        ${promos.map(pr => {
          const p = CATALOGO.find(x => x.sku === pr.sku);
          return `<div class="fila gap-8" style="align-items:center;flex-wrap:wrap" data-promo="${esc(pr.id)}">
            <span class="marca-estado e-alerta">−${pr.pct} %</span>
            <b style="font-size:13px">${esc(p ? p.nombre : pr.sku)}</b>
            <span class="apunte tenue">${esc(pr.tipo)} · del ${esc(pr.desde)} al ${esc(pr.hasta)}</span>
          </div>`;
        }).join('')}</div>`
        : '<div class="apunte tenue mt-8">no hay promociones activas en este momento</div>'}
    </div>

    ${dist ? `
    <div class="panel">
      <b style="font-size:13.5px">cómo le vemos el inventario</b>
      <div class="apunte tenue mt-8" style="max-width:820px">
        Le hemos despachado <b>${n(dist.despachado)} u</b> en doce meses y usted ha reportado vender
        <b>${n(dist.reportado)} u</b>. La diferencia —<b>${n(dist.estimado)} u</b>— es lo que estimamos
        que tiene hoy${dist.banda ? `, con un margen de <b>± ${n(dist.banda)} u</b> por los días desde
        su último corte` : ', sin margen de error: su reporte está al día'}.
      </div>
      <div class="fila gap-8 mt-16">
        <span class="marca-estado ${dist.confianza.clase}"><i class="punto"></i>estimación ${dist.confianza.r}</span>
        <a class="btn btn-fantasma btn-mini" href="javascript:void(0)" data-ir-rep>ver mi reporte →</a>
      </div>
    </div>` : ''}`;

  const ir = $('[data-ir-rep]', l);
  if (ir) ir.onclick = () => { _c.pest = 'reportar'; pinta(); };
}

/* ══════════════════════════════════════════════════════ arranque ════════ */

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.setAttribute('data-tema', _c.tema);
  const bt = $('#tema');
  const rotula = () => { bt.textContent = _c.tema === 'oscuro' ? '☾' : '☀'; };
  rotula();
  bt.onclick = () => {
    _c.tema = _c.tema === 'oscuro' ? 'claro' : 'oscuro';
    document.documentElement.setAttribute('data-tema', _c.tema);
    localStorage.setItem('kx.tema', _c.tema);
    rotula();
  };

  turno();

  $('#cliente').onchange = e => {
    _c.cliente = e.target.value;
    _c.carro = {}; _c.hecho = null; _c.subido = false;
    pinta();
  };
  pinta();
});
