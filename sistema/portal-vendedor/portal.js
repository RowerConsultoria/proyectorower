/* ============================================================================
   PORTAL DEL VENDEDOR                                   · Fase 31 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   Para el comercial de mayoreo de Kenex: qué puede prometer HOY sin mentir, y
   cómo amarrar unidades de un contenedor que todavía está en el mar.

   La pieza central es el DISPONIBLE A PROMETER (ATP):

       ATP = libre en Colón  +  libre en cada embarque en camino
       libre = físico − lo que ya está amarrado (por el turno o por un vendedor)

   ⚠️ FUENTE ÚNICA, y esta vez con consecuencia: el portal NO tiene su propio
   libro de existencias. Pide al mismo `disponible()` del núcleo que usa la
   mesa de compra, el reparto y la IA — y sus reservas se guardan para que el
   aplicativo interno las vea al abrirse. Si el portal tuviera su propia copia,
   dos vendedores podrían prometer el mismo contenedor.
   ============================================================================ */

const _p = {
  pest: 'catalogo',
  cliente: 'CR',
  busca: '',
  marca: 'todas',
  abierta: null,        // sku con el cajón de reserva abierto
  origen: null,         // 'ZLC' o el id de un embarque
  cantidad: 0,
  tema: localStorage.getItem('kx.tema') || 'oscuro',
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const n = v => Math.round(v || 0).toLocaleString('es-VE');
const esc = t => String(t).replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));

/* Devolver el cursor tras repintar. ⚠️ `setSelectionRange` NO existe en un
   input `type=number` —lanza excepción— y el repintado del catálogo pasa por
   aquí en cada tecla: sin el guard, escribir una cantidad llenaba la consola
   de errores mientras la pantalla parecía funcionar. */
function devuelveFoco(el) {
  if (!el) return;
  el.focus();
  if (el.type === 'number') return;
  try { el.setSelectionRange(el.value.length, el.value.length); } catch (e) {}
}

/* quién soy: un ROL, nunca una persona — la regla del prototipo entero */
const YO = { rol: 'vendedor de mayoreo', equipo: 'Kenex Trading · Zona Libre de Colón' };

const clienteActivo = () => FRENTES.find(f => f.id === _p.cliente);

/* ── el modelo del portal: una fila por referencia vendible ──────────────── */
function catalogo() {
  return CATALOGO
    .filter(p => _p.marca === 'todas' || p.marca === _p.marca)
    .filter(p => {
      if (!_p.busca) return true;
      const q = _p.busca.toLowerCase();
      return (p.nombre + ' ' + p.ref + ' ' + p.sku + ' ' + p.linea).toLowerCase().includes(q);
    })
    .map(p => ({ p, ...atp(p.sku) }))
    .sort((a, b) => b.total - a.total);
}

/* los embarques que traen esta referencia, con lo libre de cada uno */
function embarquesCon(sku) {
  return TRANSITOS
    .map(t => ({ t, libre: disponible(sku, t.id), total: unidadesEnEmbarque(sku, t.id) }))
    .filter(x => x.total > 0);
}

/* mis reservas: las del portal, no las que tomó el turno para los pedidos */
function misReservas() {
  return reservasDelPortal();
}

/* ══════════════════════════════════════════════════════ pintar ══════════ */

function pinta() {
  pintaCabecera();
  pintaPestanas();
  const l = $('#p-lienzo');
  if (_p.pest === 'catalogo') pintaCatalogo(l);
  else if (_p.pest === 'mar') pintaMar(l);
  else pintaReservas(l);
}

function pintaCabecera() {
  const sel = $('#cliente');
  if (!sel.options.length) {
    sel.innerHTML = FRENTES.map(f =>
      `<option value="${f.id}">${esc(f.nombre)} · ${esc(f.pais)}</option>`).join('');
  }
  sel.value = _p.cliente;
  const f = clienteActivo();
  $('#p-yo').innerHTML = `<b>${esc(YO.rol)}</b>${esc(YO.equipo)} ·
    crédito disponible del cliente: ${n(f.credito - f.saldo)} USD`;
}

function pintaPestanas() {
  const mias = misReservas().length;
  const P = [
    ['catalogo', 'catálogo vendible', ''],
    ['mar', 'lo que viene en mar', TRANSITOS.length],
    ['reservas', 'mis reservas', mias || ''],
  ];
  $('#p-pest').innerHTML = P.map(([k, r, c]) =>
    `<button class="${k === _p.pest ? 'on' : ''}" data-pest="${k}">${r}${
      c !== '' ? `<span class="cuenta">${c}</span>` : ''}</button>`).join('');
  $$('#p-pest [data-pest]').forEach(b => {
    b.onclick = () => { _p.pest = b.dataset.pest; _p.abierta = null; pinta(); };
  });
}

/* ─────────────────────────────────────────────── pestaña: catálogo ─────── */

function pintaCatalogo(l) {
  const filas = catalogo();
  const conAlgo = filas.filter(x => x.total > 0);
  const totHub = filas.reduce((a, x) => a + x.hub, 0);
  const totMar = filas.reduce((a, x) => a + x.enMar, 0);
  const f = clienteActivo();

  l.innerHTML = `
    <div class="fila-sep" style="margin-bottom:18px;flex-wrap:wrap;gap:12px">
      <div>
        <div class="sobretitulo">disponible a prometer</div>
        <div class="titulo-seccion" style="margin-top:4px">qué puedo vender hoy</div>
      </div>
      <div class="fila gap-8" style="flex-wrap:wrap">
        <input class="p-cant" style="width:210px;text-align:left" id="busca"
          placeholder="buscar referencia…" value="${esc(_p.busca)}">
        ${['todas', 'Casio', 'Cubitt'].map(m =>
          `<button class="btn btn-mini ${_p.marca === m ? 'btn-suave' : 'btn-fantasma'}"
            data-marca="${m}">${m === 'todas' ? 'ambas marcas' : m}</button>`).join('')}
      </div>
    </div>

    <div class="cinta" style="margin-bottom:20px">
      <span class="orbe hecho"></span><span class="hora">${HOY.hora}</span>
      <div class="crece">puedo prometer <b>${n(totHub + totMar)} unidades</b> de
        <b>${conAlgo.length} referencias</b>: ${n(totHub)} libres en Colón y ${n(totMar)} en camino.
        Lo que ya está amarrado —por un pedido de anoche o por otro vendedor— no aparece aquí</div>
    </div>

    <div class="rejilla rejilla-4" style="margin-bottom:22px">
      <div class="tarjeta"><div class="kpi"><div class="rotulo">puedo prometer · u</div>
        <div class="valor" id="k-atp">${n(totHub + totMar)}</div>
        <div class="pie">libre en Colón + libre en mar</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">libre en Colón · u</div>
        <div class="valor" id="k-hub">${n(totHub)}</div>
        <div class="pie">se despacha ya</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">libre en mar · u</div>
        <div class="valor" id="k-mar">${n(totMar)}</div>
        <div class="pie">${TRANSITOS.length} embarques en camino</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">crédito del cliente · USD</div>
        <div class="valor">${n(f.credito - f.saldo)}</div>
        <div class="pie">${esc(f.nombre)} · ${Math.round(f.saldo / f.credito * 100)} % consumido</div></div></div>
    </div>

    <div class="p-scroll">
      <table class="tabla">
        <thead><tr>
          <th>referencia</th><th class="num">en Colón</th><th class="num">en mar</th>
          <th class="num">puedo prometer</th><th></th>
        </tr></thead>
        <tbody id="cuerpo"></tbody>
      </table>
    </div>

    <p class="apunte tenue mt-24" style="max-width:860px;line-height:1.55">
      <b>Puedo prometer</b> no es «cuánto hay»: es cuánto hay <b>menos lo que ya está amarrado</b>.
      El portal pregunta al mismo libro de reservas que usan la mesa de compra, el reparto y la IA —
      por eso dos vendedores no pueden prometer el mismo contenedor.
    </p>`;

  const cuerpo = $('#cuerpo', l);
  cuerpo.innerHTML = filas.map(x => {
    const abierta = _p.abierta === x.p.sku;
    return `<tr data-sku="${x.p.sku}">
        <td>
          <div class="p-ref">
            <img src="../img/${x.p.img}" alt="" loading="lazy">
            <div><div class="n">${esc(x.p.nombre)}</div>
              <div class="s">${esc(x.p.marca)} · ${esc(x.p.ref)}</div></div>
          </div>
        </td>
        <td class="num p-hub">${n(x.hub)}</td>
        <td class="num p-mar">${n(x.enMar)}</td>
        <td class="num"><span class="p-atp ${x.total ? '' : 'cero'}">${n(x.total)}</span></td>
        <td style="text-align:right">
          ${x.total
            ? `<button class="btn ${abierta ? 'btn-suave' : 'btn-fantasma'} btn-mini" data-abre="${x.p.sku}">
                 ${abierta ? 'cerrar' : 'reservar'}</button>`
            : '<span class="apunte tenue">todo amarrado</span>'}
        </td>
      </tr>
      ${abierta ? `<tr><td colspan="5" style="padding-top:0">${cajonReserva(x)}</td></tr>` : ''}`;
  }).join('');

  /* filtros */
  const b = $('#busca', l);
  b.oninput = () => {
    _p.busca = b.value; _p.abierta = null;
    pintaCatalogo(l);
    devuelveFoco($('#busca', l));
  };
  $$('[data-marca]', l).forEach(x => {
    x.onclick = () => { _p.marca = x.dataset.marca; _p.abierta = null; pintaCatalogo(l); };
  });
  $$('[data-abre]', l).forEach(x => {
    x.onclick = () => {
      const sku = x.dataset.abre;
      if (_p.abierta === sku) { _p.abierta = null; }
      else {
        _p.abierta = sku;
        const a = atp(sku);
        _p.origen = a.hub > 0 ? 'ZLC' : (embarquesCon(sku).find(e => e.libre > 0) || {}).t?.id || null;
        _p.cantidad = 0;
      }
      pintaCatalogo(l);
    };
  });
  cableaCajon(l);
}

/* el cajón: de dónde sale lo que amarro, cuántas unidades y qué pasa después */
function cajonReserva(x) {
  const embs = embarquesCon(x.p.sku);
  const f = clienteActivo();
  const tope = REGLAS.topeReservaVendedor.v;
  const pasa = _p.cantidad > tope;
  const libreOrigen = _p.origen ? disponible(x.p.sku, _p.origen) : 0;
  const excede = _p.cantidad > libreOrigen;

  return `<div class="p-cajon" data-cajon="${x.p.sku}">
    <div class="fila-sep" style="flex-wrap:wrap;gap:10px">
      <b style="font-size:13.5px">amarrar ${esc(x.p.nombre)} para ${esc(f.nombre)}</b>
      <span class="apunte tenue">tope sin firma: <b>${n(tope)} u</b> · regla de ${esc(REGLAS.topeReservaVendedor.dueno)}</span>
    </div>

    <div class="p-origen">
      ${x.hub > 0 ? `
      <label class="${_p.origen === 'ZLC' ? 'elegido' : ''}">
        <input type="radio" name="origen" value="ZLC" ${_p.origen === 'ZLC' ? 'checked' : ''}>
        <span class="d"><b>libre en Colón</b><small>se despacha en cuanto se confirme el pedido</small></span>
        <span class="u">${n(x.hub)} u</span>
      </label>` : ''}
      ${embs.map(e => `
      <label class="${_p.origen === e.t.id ? 'elegido' : ''} ${e.libre ? '' : 'sin-libre'}">
        <input type="radio" name="origen" value="${e.t.id}" ${_p.origen === e.t.id ? 'checked' : ''} ${e.libre ? '' : 'disabled'}>
        <span class="d"><b>${e.t.id} · llega ${esc(e.t.eta)}</b>
          <small>${esc(e.t.prov)} · ${esc(e.t.etapa)} · ${n(e.total - e.libre)} de ${n(e.total)} u ya amarradas</small></span>
        <span class="u">${n(e.libre)} u</span>
      </label>`).join('')}
    </div>

    <div class="fila gap-8" style="align-items:center;flex-wrap:wrap">
      <input class="p-cant" id="cant" type="number" min="1" max="${libreOrigen}"
        value="${_p.cantidad || ''}" placeholder="unidades">
      <span class="apunte tenue">de ${n(libreOrigen)} libres en este origen</span>
      <button class="btn ${pasa ? 'btn-humano' : 'btn-marca'} btn-mini" id="reservar"
        ${(!_p.cantidad || excede) ? 'disabled' : ''}>
        ${pasa ? 'preparar y pedir firma' : 'amarrar para el cliente'}</button>
      ${excede ? `<span class="apunte" style="color:var(--riesgo)">
        no hay ${n(_p.cantidad)} u libres en este origen</span>` : ''}
    </div>

    <div class="apunte tenue mt-8" style="max-width:760px">
      ${pasa
        ? `<b>Por encima de ${n(tope)} u la reserva no es suya:</b> queda amarrada y
           <b>espera la firma de ${esc(REGLAS.topeReservaVendedor.dueno)}</b> antes de poder prometérsela al cliente.
           Las unidades se apartan igual, para que nadie más las tome mientras se decide.`
        : `Hasta ${n(tope)} u la confirma usted: escritura interna, reversible con un clic, y con su
           nombre en la bitácora. <b>No es un pedido</b> — es mercancía apartada.`}
    </div>
  </div>`;
}

function cableaCajon(l) {
  $$('[name="origen"]', l).forEach(r => {
    r.onchange = () => { _p.origen = r.value; _p.cantidad = 0; pintaCatalogo(l); };
  });
  const c = $('#cant', l);
  if (c) {
    c.oninput = () => {
      _p.cantidad = parseInt(c.value, 10) || 0;
      pintaCatalogo(l);
      devuelveFoco($('#cant', l));
    };
  }
  const b = $('#reservar', l);
  if (b) b.onclick = () => { amarra(); pinta(); };
}

/* ── amarrar: pasa por el libro del núcleo y se guarda entre páginas ────── */
function amarra() {
  const sku = _p.abierta, u = _p.cantidad, origen = _p.origen;
  if (!sku || !u || !origen) return;
  const p = CATALOGO.find(x => x.sku === sku);
  const f = clienteActivo();
  const tope = REGLAS.topeReservaVendedor.v;
  const pideFirma = u > tope;

  const r = reserva(sku, origen, u, YO.rol, `venta a ${f.nombre}`);
  if (!r) return;
  r.ref = 'W-' + Date.now().toString(36);

  const donde = origen === 'ZLC' ? 'Colón' : origen;
  anota({
    accion: 'W-01 · amarrar mercancía para un cliente',
    agente: 'portal del vendedor', modulo: 'comercial',
    dispara: `${YO.rol} apartó existencia para ${f.nombre}`,
    salida: `${n(r.unidades)} u de ${p.nombre} amarradas en ${donde} para ${f.nombre}` +
            (pideFirma
              ? ` · por encima del tope de ${n(tope)} u: espera la firma de ${REGLAS.topeReservaVendedor.dueno}`
              : ' · dentro del tope del vendedor, confirmada'),
    ejes: {
      perimetro: 'interno',
      reversibilidad: 'clic',
      /* el eje que fija el nivel: por encima del tope, la reserva compromete
         más de lo que un vendedor decide solo */
      radio: pideFirma ? 'frente' : 'mercancia',
      dinero: 'ninguno', reloj: 'alcanza',
    },
    firmante: pideFirma ? null : YO.rol,
    cruza: 'comercial',
    reglas: ['topeReservaVendedor'],
  });

  guardaReservaDelPortal({
    ref: r.ref, sku, ubicacion: origen, unidades: r.unidades,
    dueno: YO.rol, motivo: `venta a ${f.nombre}`, cliente: f.nombre,
    firmante: pideFirma ? null : YO.rol, esperaFirma: pideFirma,
  });

  _p.abierta = null; _p.cantidad = 0;
}

/* ─────────────────────────────────────────────── pestaña: en mar ──────── */

function pintaMar(l) {
  l.innerHTML = `
    <div class="fila-sep" style="margin-bottom:18px">
      <div>
        <div class="sobretitulo">mercancía en camino</div>
        <div class="titulo-seccion" style="margin-top:4px">lo que viene en mar</div>
      </div>
    </div>

    <div class="cinta" style="margin-bottom:20px">
      <span class="orbe hecho"></span><span class="hora">${HOY.hora}</span>
      <div class="crece">${TRANSITOS.length} embarques rumbo a Colón. Se puede vender
        <b>antes de que lleguen</b>: lo que amarre queda apartado de ese contenedor concreto</div>
    </div>

    <div class="pila gap-12">
      ${TRANSITOS.map(t => {
        const lin = lineasEmbarque(t);
        const total = lin.reduce((a, x) => a + x.u, 0);
        const libre = lin.reduce((a, x) => a + disponible(x.p.sku, t.id), 0);
        const pct = total ? Math.round((total - libre) / total * 100) : 0;
        return `<div class="panel" data-emb="${t.id}">
          <div class="fila-sep" style="flex-wrap:wrap;gap:10px">
            <div>
              <div class="fila gap-8">
                <b style="font-size:14px" class="mono">${t.id}</b>
                <span class="marca-estado ${t.modo === 'aéreo' ? 'e-ok' : 'e-neutro'}">${esc(t.modo)}</span>
                <span class="marca-estado e-neutro">${esc(t.etapa)}</span>
              </div>
              <div class="apunte tenue mt-8">${esc(t.prov)} · ${esc(t.origen)} → Colón ·
                ${lin.length} referencias</div>
            </div>
            <div class="fila gap-24" style="text-align:right">
              <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">trae · u</div>
                <div class="cifra-media">${n(total)}</div></div>
              <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">libre · u</div>
                <div class="cifra-media emb-libre">${n(libre)}</div></div>
              <div><div class="apunte tenue" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">llega</div>
                <div class="cifra-media">${esc(t.eta)}</div></div>
            </div>
          </div>
          <div class="p-amarre">
            <div class="barra ${pct >= 70 ? 'parcial' : ''}"><span style="width:${pct}%"></span></div>
            <span class="apunte tenue" style="flex:none">${pct} % amarrado</span>
          </div>
          <div class="apunte tenue mt-8">más vendible de este embarque:
            ${[...lin].sort((a, b) => disponible(b.p.sku, t.id) - disponible(a.p.sku, t.id))
              .slice(0, 3).map(x => `${esc(x.p.nombre)} (${n(disponible(x.p.sku, t.id))} u)`).join(' · ')}</div>
        </div>`;
      }).join('')}
    </div>

    <p class="apunte tenue mt-24" style="max-width:860px;line-height:1.55">
      Un contenedor con el 100 % amarrado ya está vendido y todavía no ha llegado. Ese porcentaje es
      el mismo que ve la mesa de compra: mercancía comprometida que no se puede volver a prometer.
    </p>`;
}

/* ─────────────────────────────────────────── pestaña: mis reservas ────── */

function pintaReservas(l) {
  const mias = misReservas();
  const u = mias.reduce((a, r) => a + r.unidades, 0);
  const esperan = mias.filter(r => r.esperaFirma).length;

  l.innerHTML = `
    <div class="fila-sep" style="margin-bottom:18px">
      <div>
        <div class="sobretitulo">lo que he apartado</div>
        <div class="titulo-seccion" style="margin-top:4px">mis reservas</div>
      </div>
      ${mias.length ? `<button class="btn btn-fantasma btn-mini" id="soltar-todas"
        title="Devolver todo al disponible — útil antes de presentar">soltar todas</button>` : ''}
    </div>

    ${mias.length ? `
    <div class="rejilla rejilla-3" style="margin-bottom:22px">
      <div class="tarjeta"><div class="kpi"><div class="rotulo">reservas activas</div>
        <div class="valor" id="k-reservas">${mias.length}</div>
        <div class="pie">apartadas del disponible de todos</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">unidades amarradas · u</div>
        <div class="valor" id="k-u">${n(u)}</div><div class="pie">no las puede prometer nadie más</div></div></div>
      <div class="tarjeta"><div class="kpi"><div class="rotulo">esperan firma</div>
        <div class="valor" style="color:${esperan ? 'var(--n3)' : 'inherit'}">${esperan}</div>
        <div class="pie">por encima del tope del vendedor</div></div></div>
    </div>

    <div class="p-scroll">
    <table class="tabla">
      <thead><tr><th>referencia</th><th>para</th><th>de dónde</th>
        <th class="num">unidades</th><th>estado</th><th></th></tr></thead>
      <tbody>
        ${mias.map(r => {
          const p = CATALOGO.find(x => x.sku === r.sku);
          return `<tr data-res="${r.ref}">
            <td><b>${esc(p ? p.nombre : r.sku)}</b>
              <span class="apunte tenue">${esc(p ? p.ref : '')}</span></td>
            <td>${esc(r.cliente)}</td>
            <td class="apunte">${r.ubicacion === 'ZLC' ? 'Colón' : esc(r.ubicacion)}</td>
            <td class="num">${n(r.unidades)}</td>
            <td>${r.esperaFirma
              ? '<span class="marca-estado e-alerta"><i class="punto"></i>espera firma</span>'
              : '<span class="marca-estado e-ok">confirmada</span>'}</td>
            <td style="text-align:right">
              <button class="btn btn-fantasma btn-mini" data-suelta="${r.ref}">soltar</button></td>
          </tr>`;
        }).join('')}
      </tbody>
    </table></div>` : `
    <div class="panel" style="text-align:center;padding:40px">
      <b style="font-size:14px">todavía no ha amarrado nada</b>
      <p class="apunte tenue" style="margin-top:8px">Cuando aparte mercancía para un cliente, aparecerá
        aquí — y desaparecerá del disponible de todos los demás.</p>
      <button class="btn btn-suave btn-mini mt-16" data-ir-cat>ir al catálogo →</button>
    </div>`}

    <p class="apunte tenue mt-24" style="max-width:860px;line-height:1.55">
      Soltar una reserva la deshace <b>del todo</b>: las unidades vuelven al disponible de la red y la
      bitácora guarda el par —lo que se amarró y lo que se soltó—, nunca se borra una por la otra.
      Estas reservas <b>las ve el sistema entero</b>: al abrir el aplicativo interno, esas unidades ya
      no están disponibles.
    </p>`;

  $$('[data-suelta]', l).forEach(b => {
    b.onclick = () => {
      const ref = b.dataset.suelta;
      const g = misReservas().find(x => x.ref === ref);
      if (!g) return;
      const i = RESERVAS.findIndex(x => x.ref === ref);
      if (i >= 0) RESERVAS.splice(i, 1);
      borraReservaDelPortal(ref);
      const p = CATALOGO.find(x => x.sku === g.sku);
      anota({
        accion: 'W-02 · soltar una reserva del portal',
        agente: 'portal del vendedor', modulo: 'comercial',
        dispara: `${YO.rol} soltó lo que había apartado para ${g.cliente}`,
        salida: `${n(g.unidades)} u de ${p ? p.nombre : g.sku} vuelven al disponible de la red`,
        ejes: { perimetro: 'interno', reversibilidad: 'clic', radio: 'mercancia', dinero: 'ninguno', reloj: 'alcanza' },
        firmante: YO.rol, cruza: 'comercial',
      });
      pinta();
    };
  });
  /* Salida de emergencia para la demo: las reservas viven entre páginas, así
     que unas cuantas olvidadas desplazan las cifras de TODO el sistema — y
     las del recorrido dejarían de cuadrar en mitad de una presentación. */
  const st = $('#soltar-todas', l);
  if (st) st.onclick = () => { $$('[data-suelta]', l).forEach(b => b.click()); };

  const ic = $('[data-ir-cat]', l);
  if (ic) ic.onclick = () => { _p.pest = 'catalogo'; pinta(); };
}

/* ══════════════════════════════════════════════════════ arranque ════════ */

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.setAttribute('data-tema', _p.tema);
  const bt = $('#tema');
  const rotula = () => { bt.textContent = _p.tema === 'oscuro' ? '☾' : '☀'; };
  rotula();
  bt.onclick = () => {
    _p.tema = _p.tema === 'oscuro' ? 'claro' : 'oscuro';
    document.documentElement.setAttribute('data-tema', _p.tema);
    localStorage.setItem('kx.tema', _p.tema);
    rotula();
  };

  /* el turno corre igual que en el aplicativo: el portal ve el mismo día */
  turno();

  $('#cliente').onchange = e => { _p.cliente = e.target.value; pinta(); };
  pinta();
});
