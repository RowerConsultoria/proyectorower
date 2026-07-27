/* ============================================================================
   EL SISTEMA — El recorrido                       · Fases 21 y 33 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   Dieciocho paradas que cosen el ciclo entero, en cuatro actos:

     I   el dato antes que el agente — de dónde viene, con qué reloj, y por qué
         hay que certificarlo antes de calcular nada
     II  la compra — del candidato graduado al techo del mes con su firma
     III del mar al frente — lo que viene, lo que ya se vendió sin haber
         llegado, la recepción, el inventario propio y el reparto
     IV  la red — lo que está en casa del cliente, el mapa, la cartera, y el
         propio cliente pidiendo y reportando

   Tres decisiones de fondo:

   · Arranca en DIRECCIÓN, no en compras. Entrar por arriba y bajar a la
     operación cuenta la historia en el orden en que la Junta la piensa; entrar
     por compras y subir obliga a explicar antes de mostrar.

   · Ningún texto lleva cifras escritas a mano: cada parada las pide al núcleo
     al pintarse. Si mañana cambia una regla de negocio, el guion cambia solo
     y no puede quedar diciendo lo que el sistema ya no hace.

   · Los dos PORTALES son documentos aparte, y aun así son paradas del mismo
     recorrido: se abren en un panel dentro del sistema (`portal:` en vez de
     `ruta:`). Saltar a otra pestaña en mitad de una presentación pierde el
     hilo y no vuelve — y el ciclo no se entiende sin ver al vendedor
     prometiendo lo que está en el mar y al cliente reportando lo que vendió.
   ============================================================================ */

const RECORRIDO = [
  /* ═══════════ I · el dato antes que el agente ═══════════ */
  {
    ruta: 'direccion', titulo: 'el negocio en una pantalla',
    foco: '.ciclo', estela: ['direccion'],
    texto: () => {
      const rep = datosDe('X-01') || { porFrente: {} };
      let pide = 0, rec = 0;
      for (const x of Object.values(rep.porFrente)) { pide += x.pide; rec += x.recibe; }
      const dem = CATALOGO.reduce((a, p) => a + demandaSaneada(p.sku).mensual, 0);
      return `Seis eslabones, y el ciclo se cierra sobre sí mismo. <b>${miles(dem)} u/mes</b> de
        demanda real y <b>${pide ? Math.round(rec / pide * 100) : 100} %</b> de servicio. Cada cifra
        lleva a la pantalla donde se decide: eso es la diferencia entre un informe y un sistema.`;
    },
  },
  {
    ruta: 'frentes/conectores', titulo: 'de dónde viene el dato, y con qué reloj',
    foco: '#det-con', estela: ['frentes'],
    texto: () => {
      const odoo = FRENTES.filter(f => f.via === 'odoo').length;
      const portal = FRENTES.length - odoo;
      const propioEnPortal = FRENTES.filter(f => f.via === 'portal' && f.tipo === 'propio').length;
      return `Todo empieza aquí. <b>${FRENTES.length} frentes</b>: ${odoo} con su Odoo conectado en
        vivo y ${portal} cargando su propio Excel por el portal${propioEnPortal ? ` —${propioEnPortal}
        de ellos propio, porque tener país propio no es lo mismo que tener Odoo—` : ''}. La latencia
        de cada uno no es una advertencia: es <b>el reloj de corte</b> que dice hasta cuándo se
        espera antes de calcular.`;
    },
  },
  {
    ruta: 'cimiento', titulo: 'el mismo producto, diez nombres distintos',
    foco: '#cim-filas', estela: ['frentes', 'cimiento'],
    texto: () => {
      const d = datosDe('N-02');
      return `Cada frente escribe la referencia a su manera. Anoche llegaron <b>${d.total} nombres
        nuevos</b> y el resolutor reconcilió <b>${d.resueltos}</b> por encima del
        ${Math.round(REGLAS.confianzaAlias.v * 100)} % de confianza. Los <b>${d.cola} restantes no se
        adivinan</b>: entran en cola con sus tres mejores candidatas. Sin esta pantalla, todo lo que
        viene después suma peras con manzanas.`;
    },
  },
  {
    ruta: 'comercial/demanda', titulo: 'lo que no se pudo vender no se borra',
    foco: '#cuerpo-dem', estela: ['comercial', 'compras'],
    texto: () => {
      const rep = datosDe('X-01') || { porFrente: {} };
      let u = 0;
      for (const x of Object.values(rep.porFrente)) for (const l of x.lineas) u += Math.max(0, l.pide - l.recibe);
      return `<b>${miles(u)} unidades</b> que se pidieron y no se pudieron atender. Hoy esas líneas
        se eliminan del pedido y desaparecen; aquí quedan registradas y <b>vuelven a la mesa de compra
        del mes siguiente</b>. Es la diferencia entre comprar contra lo que se vendió y comprar contra
        lo que se quiso comprar.`;
    },
  },

  /* ═══════════ II · la compra ═══════════ */
  {
    ruta: 'producto', titulo: 'nada se compra sin haber graduado',
    foco: '#embudo', estela: ['producto'],
    texto: () => {
      const listos = CANDIDATOS.filter(c => c.etapa === 'decision').length;
      const trabados = CANDIDATOS.filter(c => c.diasEnEtapa > 21 && !['graduado', 'descartado'].includes(c.etapa)).length;
      return `El embudo del candidato: muestra, prueba, decisión. <b>${listos} listos para decidir</b>
        y <b>${trabados} atascados más de tres semanas</b> —que es el dato que hoy no existe en
        ninguna parte—. Solo un producto graduado entra al catálogo, y solo lo del catálogo se
        puede comprar.`;
    },
  },
  {
    ruta: 'compras', titulo: 'la mesa ya está armada al llegar',
    foco: '#bandeja', estela: ['cimiento', 'compras'],
    texto: () => {
      const m = datosDe('C-01') || { conPropuesta: 0, monto: 0 };
      return `El turno corrió a las ${HOY.hora}. Cuando el equipo llega, la mesa tiene
        <b>${m.conPropuesta} referencias con propuesta</b> por <b>${miles(m.monto)} USD</b>, cada una
        con su porqué. Nadie empieza el día abriendo una hoja en blanco.`;
    },
  },
  {
    ruta: 'compras/casio', titulo: 'la propuesta, línea por línea',
    foco: '#mesa-filas', estela: ['compras'],
    texto: () => {
      const m = datosDe('C-01') || { conPropuesta: 0 };
      return `Cada línea trae la cantidad propuesta, la cobertura que deja y <b>el motivo</b>. Se
        puede ajustar a mano, pero el ajuste pide su razón — y queda. Un número sin porqué es lo que
        hace que dentro de tres meses nadie sepa por qué se compró eso.`;
    },
  },
  {
    ruta: 'compras/cierre', titulo: 'el techo del mes, y quién firma',
    foco: '#recortar', estela: ['compras'],
    texto: () => {
      const t = REGLAS.topeCompraMes.v;
      const m = datosDe('C-01') || { monto: 0 };
      const ex = m.monto - t;
      return `La propuesta suma <b>${miles(m.monto)} USD</b> contra un techo de
        <b>${miles(t)} USD</b>${ex > 0 ? ` — lo excede en <b>${miles(ex)}</b>` : ''}. El sistema
        <b>no recorta solo</b>: muestra a qué desplaza cada opción y espera una firma. Un techo que
        el software salta por su cuenta no es un techo.`;
    },
  },

  /* ═══════════ III · del mar al frente ═══════════ */
  {
    ruta: 'compras/transitos', titulo: 'lo que ya viene, antes de volver a comprar',
    foco: '#lista-emb', estela: ['compras', 'logistica'],
    texto: () => {
      const u = TRANSITOS.reduce((a, t) => a + lineasEmbarque(t).reduce((b, l) => b + l.u, 0), 0);
      const sinFactura = TRANSITOS.filter(t => !t.docs.facturaNaviera).length;
      return `<b>${TRANSITOS.length} embarques</b> y <b>${miles(u)} unidades</b> en camino, que la
        compra descuenta antes de proponer nada. <b>${sinFactura} llegan sin factura de flete</b>:
        el costo en destino no cierra hasta que aparezca, y el agente ya redactó el reclamo
        —redactado, no enviado—.`;
    },
  },
  {
    portal: 'vendedor', titulo: 'y se vende antes de que llegue',
    texto: () => {
      let hub = 0, mar = 0;
      for (const q of CATALOGO) { const a = atp(q.sku); hub += a.hub; mar += a.enMar; }
      return `El portal del vendedor. Puede prometer <b>${miles(hub + mar)} unidades</b>:
        <b>${miles(hub)}</b> libres en Colón y <b>${miles(mar)}</b> todavía en el mar. Amarrar
        unidades de un contenedor concreto <b>las quita del disponible de todos</b> —del sistema y de
        los demás vendedores— porque el portal pide al mismo libro de reservas. Dos vendedores no
        pueden prometer el mismo contenedor.`;
    },
  },
  {
    ruta: 'logistica', titulo: 'llega, y se recibe contra su embarque',
    foco: '#filas-rec', estela: ['logistica'],
    texto: () => {
      const r = datosDe('L-01') || null;
      return `El contenedor se recibe <b>contra lo que decía su manifiesto</b>, no contra lo que
        alguien recuerda. Lo que ya está ubicado <b>puede liberarse a la venta sin esperar</b> a que
        cierre el resto — y lo que está comprometido como preventa se amarra antes de liberar, para
        que no se venda dos veces.`;
    },
  },
  {
    ruta: 'inventarios', titulo: 'dónde está lo propio',
    foco: '#lista-alm', estela: ['logistica', 'inventarios'],
    texto: () => {
      const s = saludInventario();
      const u = s.filas.reduce((a, f) => a + f.u, 0);
      const enMar = TRANSITOS.reduce((a, t) => a + lineasEmbarque(t).reduce((b, l) => b + l.u, 0), 0);
      return `<b>${miles(u)} unidades</b> repartidas en <b>${s.ubicaciones.length} almacenes
        propios</b>, cada uno con su dueño, su ocupación y su semáforo. Y <b>${miles(enMar)}</b> más
        todavía en el mar: la central proyecta si cabrían al llegar. Un inventario que solo dice
        «cuánto hay» no deja tomar ninguna decisión de espacio.`;
    },
  },
  {
    ruta: 'distribucion', titulo: 'cuando no alcanza para todos',
    foco: '#escasos', estela: ['compras', 'distribucion'],
    texto: () => {
      const r = datosDe('X-01') || { escasos: [], repartido: 0 };
      return `<b>${miles(r.repartido)} unidades</b> repartidas y <b>${r.escasos.length} referencias
        en escasez</b>. El reparto no se negocia por teléfono: baja por una <b>escalera de precedencia
        publicada</b>, y dentro de un mismo escalón va a prorrata. Cada ajuste humano queda con su
        motivo, y el que ajusta ve a quién se lo quita.`;
    },
  },

  /* ═══════════ IV · la red ═══════════ */
  {
    ruta: 'inventarios/distribuido', titulo: 'y dónde está lo que ya no es nuestro',
    foco: '#dist-mundo', estela: ['inventarios', 'clientes'],
    texto: () => {
      const d = inventarioDistribuido();
      const propio = saludInventario().filas.reduce((a, f) => a + f.u, 0);
      return `Lo propio se mide; lo del cliente se <b>estima</b>: despachado menos reportado.
        <b>${miles(d.totales.estimado)} unidades</b> deberían estar hoy en sus manos, con
        <b>± ${miles(d.totales.banda)}</b> de incertidumbre por los reportes atrasados. Esa banda es
        la tesis del informe hecha número: <b>la calidad del reporte de cada quien decide qué tan
        bien le vemos el almacén</b>.`;
    },
  },
  {
    ruta: 'mapa', titulo: 'toda la red en una pantalla',
    estela: ['clientes', 'mapa'],
    texto: () => {
      const propio = saludInventario().filas.reduce((a, f) => a + f.u, 0);
      const est = inventarioDistribuido().totales.estimado;
      const rep = datosDe('X-01') || { porFrente: {} };
      const flujo = Object.values(rep.porFrente).reduce((a, x) => a + x.recibe, 0);
      return `<b>${ALMACENES.length + CLIENTES.length} puntos</b> sobre el mapa real:
        ${miles(propio)} unidades medidas en almacenes propios y ${miles(est)} estimadas en casa de
        clientes. Los arcos son el reparto de anoche —<b>${miles(flujo)} u</b> saliendo de Colón—.
        El borde de cada punto es su semáforo: en un cliente, <b>rojo no es «malo», es «lo vemos
        borroso»</b>.`;
    },
  },
  {
    ruta: 'clientes', titulo: 'la cartera, y lo que la IA deja preparado',
    foco: '#cli-cred', estela: ['clientes', 'comercial'],
    texto: () => {
      const recs = (datosDe('K-01') || { recs: [] }).recs;
      const prep = recs.filter(r => !r.alerta).length;
      const alertas = recs.filter(r => r.alerta).length;
      return `<b>${FRENTES.length} frentes</b> en la cartera, con su crédito, su venta y su
        inventario. El impulsor de cartera revisó los no propios y dejó <b>${prep}
        recomendaciones preparadas</b> —reposición anticipada, impulso de lo parado, promoción de lo
        sobrado— más <b>${alertas} alertas de crédito</b>. Ninguna toca nada sin una firma: la IA
        propone y una persona decide.`;
    },
  },
  {
    portal: 'cliente', titulo: 'el cliente pide, y reporta lo que vendió',
    texto: () => {
      const f = FRENTES.find(x => x.id === 'CR');
      const r = REPORTES.CR;
      const rec = r.filas.filter(x => x.resuelto).length;
      return `El portal del cliente. Pide con su <b>crédito disponible delante</b> —y si lo excede,
        el sistema lo <b>bloquea con el motivo escrito</b>, ni en silencio ni aprobando—; ve en qué
        <b>peldaño de la escalera</b> entra su preventa; y sube su venta en <b>su</b> Excel:
        ${r.filas.length} líneas, <b>${rec} reconocidas</b> solas. <b>Aquí se cierra el ciclo</b>:
        eso que acaba de subir es lo que alimenta la demanda del mes que viene.`;
    },
  },
  {
    ruta: 'agentes', titulo: 'y así se apaga',
    foco: '#freno-general', estela: ['agentes'],
    texto: () => {
      const r = resumenAgentes();
      return `Cada agente con su techo calculado y su interruptor. <b>${r.externas}
        acciones tocaron el perímetro externo y se enviaron
        ${r.enviadasSinFirmaHumana} sin firma humana</b> — no por calibración, sino porque ese techo
        no admite excepción. El freno detiene a todos de una vez, y también deja rastro.`;
    },
  },
];

/* `plegada` = la barra reducida a su mínimo para poder explicar la pantalla
   sin que el guion estorbe. NO es cerrar el recorrido: el paso se conserva y
   se vuelve exactamente a donde se estaba. */
const _rec = { activo: false, paso: 0, fuera: false, plegada: false };
const miles = v => Math.round(v || 0).toLocaleString('es-VE');

/** Plegar y desplegar el guion. El paso NO se pierde: solo deja de leerse. */
function pliega(v) {
  _rec.plegada = v;
  pintaRecorrido();
  /* con un portal abierto, el panel recupera el alto que la barra suelta */
  if (typeof mideHuecoDelPortal === 'function') mideHuecoDelPortal();
}

/** Lo consulta el HUD para apartarse mientras el recorrido está en marcha. */
function recorridoActivo() { return _rec.activo; }
window.recorridoActivo = recorridoActivo;

function abreRecorrido() {
  /* si el recorrido se abre por su botón o por una comprobación con la
     portada aún puesta, la portada no puede quedarse tapando la escena */
  if (typeof cierraPortada === 'function') cierraPortada();
  _rec.activo = true;
  /* Arranca por dirección: entrar por arriba y bajar cuenta mejor la historia
     que entrar por compras y subir. */
  if (ESTADO.rol !== 'direccion') {
    ESTADO.rol = 'direccion';
    localStorage.setItem('kx.rol', 'direccion');
    const sel = $('#rol'); if (sel) sel.value = 'direccion';
  }
  document.body.classList.add('con-recorrido');
  vaAlPaso(0);
}

function cierraRecorrido() {
  _rec.activo = false;
  cierraPortal();
  document.body.classList.remove('con-recorrido');
  quitaFoco();
  const caja = $('#recorrido'); if (caja) caja.hidden = true;
  pintaHud();
}

function quitaFoco() {
  $$('.foco-recorrido').forEach(e => e.classList.remove('foco-recorrido'));
}

/* El recorrido no manda sobre la navegación: quien presenta puede irse por su
   cuenta a cualquier pantalla, y hasta cambiar de rol. Lo que NO puede pasar
   es que la barra siga narrando una parada mientras se enseña otra cosa. Lo
   llama navega() en cada cambio de pantalla, y no navega —solo se entera—. */
function sincronizaRecorrido() {
  if (!_rec.activo) return;
  /* con un portal abierto, la pantalla del sistema que haya debajo no manda:
     la parada en curso es el portal, no lo que se ve detrás del panel */
  if (RECORRIDO[_rec.paso].portal) { _rec.fuera = false; pintaRecorrido(); return; }
  const aqui = ESTADO.llave;
  if (RECORRIDO[_rec.paso].ruta === aqui) { _rec.fuera = false; pintaRecorrido(); return; }
  const i = RECORRIDO.findIndex(p => p.ruta === aqui);
  if (i >= 0) { _rec.paso = i; _rec.fuera = false; }
  else { _rec.fuera = true; }
  pintaRecorrido();
}

/* ── el panel de portal ────────────────────────────────────────────────────

   Un portal es otro documento. Para que siga siendo una parada del MISMO
   recorrido se abre dentro, en un panel, con la barra del guion por encima.
   Comparte origen, así que comparte `localStorage`: una reserva hecha ahí la
   ve el sistema al cerrarse el panel, que es justo lo que hay que enseñar. */
const PORTALES = {
  vendedor: { url: '../sistema/portal-vendedor/index.html', rotulo: 'Portal del vendedor' },
  cliente: { url: '../sistema/portal-cliente/index.html', rotulo: 'Portal del cliente' },
};

function abrePortal(clave) {
  const cfg = PORTALES[clave];
  if (!cfg) return;
  let caja = $('#portal-panel');
  if (!caja) {
    caja = document.createElement('div');
    caja.className = 'portal-panel';
    caja.id = 'portal-panel';
    caja.innerHTML = `
      <div class="pp-cab">
        <span class="orbe orbe-mini actuando"></span>
        <b id="pp-rotulo"></b>
        <span class="apunte tenue">— documento aparte, dentro del recorrido</span>
        <span class="crece"></span>
        <a class="btn btn-fantasma btn-mini" id="pp-nueva" target="_blank" rel="noopener">↗ abrir aparte</a>
        <button class="btn btn-fantasma btn-mini" id="pp-cierra">✕ cerrar</button>
      </div>
      <iframe id="pp-marco" title="Portal"></iframe>`;
    document.body.appendChild(caja);
    $('#pp-cierra', caja).onclick = () => cierraPortal();
  }
  $('#pp-rotulo', caja).textContent = cfg.rotulo;
  $('#pp-nueva', caja).href = cfg.url;
  const marco = $('#pp-marco', caja);
  if (marco.dataset.clave !== clave) { marco.src = cfg.url; marco.dataset.clave = clave; }
  document.body.classList.add('con-portal');
  caja.hidden = false;
  mideHuecoDelPortal();
}

/* La barra del guion crece o mengua con el texto de cada parada. El panel deja
   sitio para la barra REAL, medida, no para una altura escrita a ojo. */
function mideHuecoDelPortal() {
  const barra = $('#recorrido');
  if (!barra || barra.hidden) return;
  const alto = Math.round(barra.getBoundingClientRect().height) + 34;
  document.documentElement.style.setProperty('--hueco-recorrido', alto + 'px');
}

function cierraPortal() {
  const caja = $('#portal-panel');
  if (caja) caja.hidden = true;
  document.body.classList.remove('con-portal');
  /* Al volver del portal, el sistema tiene que ENTERARSE de lo que pasó allí:
     una reserva del vendedor cambió el disponible de todos. Se repinta la
     pantalla en curso en vez de dejarla con las cifras de antes. */
  if (typeof navega === 'function') navega();
}

function vaAlPaso(i) {
  if (!_rec.activo) return;
  _rec.fuera = false;
  _rec.paso = Math.max(0, Math.min(RECORRIDO.length - 1, i));
  const p = RECORRIDO[_rec.paso];
  quitaFoco();

  if (p.portal) {
    abrePortal(p.portal);
    pintaRecorrido();
    /* después de pintar: la barra ya tiene su alto definitivo */
    requestAnimationFrame(mideHuecoDelPortal);
    if (p.estela && typeof viajaEstela === 'function') viajaEstela(p.estela);
    return;
  }
  cierraPortal();
  location.hash = '#/' + p.ruta;
  /* El hash navega de forma asíncrona; se espera al repintado para poder
     buscar el ancla y lanzar la estela sobre el menú ya dibujado. */
  setTimeout(() => { pintaRecorrido(); aplicaFoco(p); }, 120);
}

function aplicaFoco(p) {
  if (p.estela && typeof viajaEstela === 'function') viajaEstela(p.estela);
  if (!p.foco) return;
  const el = $(p.foco, $('.lienzo'));
  if (!el) return;
  /* Un id suele apuntar a algo pequeño; se resalta el panel que lo contiene
     para que se entienda de qué se está hablando. */
  const blanco = el.closest('.panel') || el;
  blanco.classList.add('foco-recorrido');
  blanco.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function pintaRecorrido() {
  const caja = $('#recorrido');
  if (!caja) return;
  caja.hidden = !_rec.activo;
  if (!_rec.activo) return;
  const p = RECORRIDO[_rec.paso], ultimo = _rec.paso === RECORRIDO.length - 1;

  /* Plegada: lo mínimo para saber dónde se está y poder seguir — el paso, el
     título, y las flechas. Quien presenta explica la pantalla sin que el guion
     le tape media vista, y despliega cuando quiere seguir leyéndolo. */
  if (_rec.plegada) {
    caja.className = 'recorrido plegada';
    caja.innerHTML = `
      <button class="btn btn-fantasma btn-mini" id="rec-despliega"
        title="Volver a abrir el guion (G)">▲</button>
      <span class="rec-num">${_rec.paso + 1} / ${RECORRIDO.length}</span>
      <span class="rec-tit">${esc(p.titulo)}</span>
      <span class="crece"></span>
      <div class="rec-mandos">
        <button class="btn btn-fantasma btn-mini" id="rec-atras" ${_rec.paso ? '' : 'disabled'}>←</button>
        <button class="btn ${ultimo ? 'btn-humano' : 'btn-marca'} btn-mini" id="rec-sigue">
          ${ultimo ? 'terminar' : '→'}</button>
        <button class="btn btn-fantasma btn-mini" id="rec-cierra" title="Salir (Esc)">✕</button>
      </div>`;
    $('#rec-despliega', caja).onclick = () => pliega(false);
    $('#rec-atras', caja).onclick = () => vaAlPaso(_rec.paso - 1);
    $('#rec-sigue', caja).onclick = () => ultimo ? cierraRecorrido() : vaAlPaso(_rec.paso + 1);
    $('#rec-cierra', caja).onclick = cierraRecorrido;
    pintaHud();
    if (typeof mideHuecoDelPortal === 'function') mideHuecoDelPortal();
    return;
  }
  caja.className = 'recorrido';

  /* Fuera de guion: se dice, y se ofrece volver. Antes la barra se quedaba
     narrando el paso 5 con «fábricas» en pantalla. */
  if (_rec.fuera) {
    caja.innerHTML = `
      <div class="rec-cuerpo">
        <div class="rec-cab">
          <span class="rec-num">${_rec.paso + 1} / ${RECORRIDO.length}</span>
          <span class="rec-tit">fuera del recorrido</span>
        </div>
        <div class="rec-txt">Esta pantalla no es una parada del guion. El recorrido sigue esperando
          en <b>${esc(p.titulo)}</b>.</div>
      </div>
      <div class="rec-mandos">
        <button class="btn btn-marca btn-mini" id="rec-vuelve">← volver al paso ${_rec.paso + 1}</button>
        <button class="btn btn-fantasma btn-mini" id="rec-cierra" title="Salir (Esc)">✕</button>
      </div>`;
    $('#rec-vuelve', caja).onclick = () => vaAlPaso(_rec.paso);
    $('#rec-cierra', caja).onclick = cierraRecorrido;
    pintaHud();
    return;
  }

  /* Si el guion de una parada falla al pedir sus cifras, la barra NO puede
     quedarse con el texto de la parada anterior: diría una cosa mientras la
     pantalla enseña otra, que es la peor forma de romperse en una sala. */
  let cuerpo;
  try { cuerpo = p.texto(); }
  catch (err) {
    console.error('recorrido · paso ' + (_rec.paso + 1), err);
    cuerpo = '<i>(esta parada no pudo leer sus cifras del núcleo)</i>';
  }

  caja.innerHTML = `
    <div class="rec-puntos">
      ${RECORRIDO.map((_, i) => `<span class="pt ${i === _rec.paso ? 'on' : ''} ${i < _rec.paso ? 'ya' : ''}"
        data-paso="${i}" title="paso ${i + 1}"></span>`).join('')}
    </div>
    <div class="rec-cuerpo">
      <div class="rec-cab">
        <span class="rec-num">${_rec.paso + 1} / ${RECORRIDO.length}</span>
        <span class="rec-tit">${esc(p.titulo)}</span>
      </div>
      <div class="rec-txt">${cuerpo}</div>
    </div>
    <div class="rec-mandos">
      <button class="btn btn-fantasma btn-mini" id="rec-pliega"
        title="Plegar el guion para explicar la pantalla (G)">▼</button>
      <button class="btn btn-fantasma btn-mini" id="rec-atras" ${_rec.paso ? '' : 'disabled'}>←</button>
      <button class="btn ${ultimo ? 'btn-humano' : 'btn-marca'} btn-mini" id="rec-sigue">
        ${ultimo ? 'terminar' : 'siguiente →'}
      </button>
      <button class="btn btn-fantasma btn-mini" id="rec-cierra" title="Salir (Esc)">✕</button>
    </div>`;

  $('#rec-pliega', caja).onclick = () => pliega(true);
  $('#rec-atras', caja).onclick = () => vaAlPaso(_rec.paso - 1);
  $('#rec-sigue', caja).onclick = () => ultimo ? cierraRecorrido() : vaAlPaso(_rec.paso + 1);
  $('#rec-cierra', caja).onclick = cierraRecorrido;
  $$('.pt', caja).forEach(e => e.onclick = () => vaAlPaso(+e.dataset.paso));
  pintaHud();
}

/* El recorrido se conduce con el teclado: en una sala, quien presenta no
   quiere estar buscando un botón con el ratón. */
document.addEventListener('keydown', e => {
  if (!_rec.activo) return;
  if (e.key === 'Escape') { cierraRecorrido(); }
  /* La tecla que más se usa presentando: plegar para hablar de la pantalla y
     desplegar para seguir. No se toma si se está escribiendo en un campo. */
  else if ((e.key === 'g' || e.key === 'G') && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
    e.preventDefault(); pliega(!_rec.plegada);
  }
  else if (e.key === 'ArrowRight') { e.preventDefault(); vaAlPaso(_rec.paso + 1); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); vaAlPaso(_rec.paso - 1); }
});
