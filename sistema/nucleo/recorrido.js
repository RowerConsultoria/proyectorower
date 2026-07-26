/* ============================================================================
   EL SISTEMA — El recorrido                             · Fase 21 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   Doce paradas que cosen el hilo completo: del producto nuevo al sell-out, al
   forecast, a la compra, al reparto, al despacho, y de vuelta al frente que
   vuelve a vender. Se sigue sin que nadie tenga que explicarlo.

   Dos decisiones de fondo:

   · Arranca en DIRECCIÓN, no en compras. Entrar por arriba y bajar a la
     operación cuenta la historia en el orden en que la Junta la piensa; entrar
     por compras y subir obliga a explicar antes de mostrar. (Cierra el
     pendiente P8 del plan.)

   · Ningún texto lleva cifras escritas a mano: cada parada las pide al núcleo
     al pintarse. Si mañana cambia una regla de negocio, el guion cambia solo
     y no puede quedar diciendo lo que el sistema ya no hace.
   ============================================================================ */

const RECORRIDO = [
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
    ruta: 'cimiento', titulo: 'el mismo producto, diez nombres distintos',
    foco: '#cim-filas', estela: ['frentes', 'cimiento'],
    texto: () => {
      /* Campos reales de N-02: total · resueltos · cola. Sin valores de
         respaldo: si un campo cambiara de nombre tiene que romperse a la vista,
         no seguir enseñando una cifra escrita a mano que parece calculada. */
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
  {
    ruta: 'compras', titulo: 'la mesa ya está armada al llegar',
    foco: '#bandeja', estela: ['cimiento', 'compras'],
    texto: () => {
      const m = datosDe('C-01') || { conPropuesta: 0, monto: 0 };
      return `El turno corrió a las ${HOY.hora}. Cuando el equipo llega, la mesa tiene
        <b>${m.conPropuesta} referencias con propuesta de cantidad</b> y su porqué escrito. El agente
        hizo el trabajo; la decisión sigue siendo de una persona, y por eso lo que espera firma está
        arriba y no escondido.`;
    },
  },
  {
    ruta: 'compras/casio', titulo: 'la propuesta, línea por línea',
    foco: '#mesa-filas', estela: ['compras'],
    texto: () => `Cada cantidad se abre y se explica: demanda saneada, cobertura objetivo de
      <b>${REGLAS.coberturaObjetivo.v} meses</b>, lo que ya viene en camino descontado, y el
      redondeo a caja. Nada es una caja negra —y cada regla que interviene lleva <b>dueño y
      versión</b>, porque esto no lo decide un algoritmo, lo decide una política.`,
  },
  {
    ruta: 'compras/cierre', titulo: 'el techo del mes, y quién firma',
    foco: '#recortar', estela: ['compras'],
    texto: () => {
      const m = datosDe('C-01') || { monto: 0 };
      const t = REGLAS.topeCompraMes.v, ex = m.monto - t;
      return `La propuesta suma <b>${miles(m.monto)} USD</b> contra un techo de
        <b>${miles(t)} USD</b>${ex > 0 ? ` — lo excede en <b>${miles(ex)}</b>` : ''}. El sistema
        <b>no recorta solo</b>: muestra a qué desplaza cada opción y espera una firma. Un techo que
        el software salta por su cuenta no es un techo.`;
    },
  },
  {
    ruta: 'compras/transitos', titulo: 'lo que ya viene, antes de volver a comprar',
    foco: '#lista-emb', estela: ['compras', 'logistica'],
    texto: () => {
      /* lineasEmbarque() se pide por embarque, no en global: el total sale de
         sumar el manifiesto de cada uno. */
      const u = TRANSITOS.reduce((a, t) => a + lineasEmbarque(t).reduce((b, l) => b + l.u, 0), 0);
      const sinFactura = TRANSITOS.filter(t => !t.docs.facturaNaviera).length;
      return `<b>${TRANSITOS.length} embarques</b> y <b>${miles(u)} unidades</b> en camino, que la
        compra descuenta antes de proponer nada. <b>${sinFactura} llegan sin factura de flete</b>:
        el costo en destino no cierra hasta que aparezca, y el agente ya redactó el reclamo
        —redactado, no enviado—.`;
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
  {
    ruta: 'comercial', titulo: 'el pedido sale, y la excepción sube',
    foco: '#pedidos', estela: ['distribucion', 'comercial'],
    texto: () => {
      const v = datosDe('V-02') || { verde: [], excepcion: [] };
      return `<b>${v.verde.length + v.excepcion.length} pedidos</b> del corte precalificados:
        <b>${v.verde.length} pasan en lote</b> y <b>${v.excepcion.length} suben como excepción</b>
        con el motivo delante. El trabajo de revisar uno por uno lo que no tiene nada raro es
        exactamente el trabajo que no debería hacer una persona.`;
    },
  },
  {
    ruta: 'frentes/conectores', titulo: 'y el frente vuelve a vender',
    foco: '#det-con', estela: ['comercial', 'frentes'],
    texto: () => {
      /* Se lee de `via`, que es como se conecta cada frente. Deducirlo de la
         cadencia daba 5 «en vivo» y colaba a un socio que reporta a diario. */
      const odoo = FRENTES.filter(f => f.via === 'odoo').length;
      const portal = FRENTES.length - odoo;
      const propioEnPortal = FRENTES.filter(f => f.via === 'portal' && f.tipo === 'propio').length;
      return `<b>${FRENTES.length} frentes</b>: ${odoo} con su Odoo conectado en vivo y ${portal}
        cargando su propio Excel por el portal${propioEnPortal ? ` —${propioEnPortal} de ellos propio,
        porque tener país propio no es lo mismo que tener Odoo—` : ''}. Lo que reportan alimenta la
        compra del mes siguiente: <b>el ciclo se cerró</b>. Y la latencia de cada uno no es una
        advertencia, es <b>el reloj de corte</b> que dice hasta cuándo se espera.`;
    },
  },
  {
    ruta: 'agentes', titulo: 'y así se apaga',
    foco: '#freno-general', estela: ['agentes'],
    texto: () => {
      const r = resumenAgentes();
      return `Diez agentes, cada uno con su techo calculado y su interruptor. <b>${r.externas}
        acciones tocaron el perímetro externo y se enviaron
        ${r.enviadasSinFirmaHumana} sin firma humana</b> — no por calibración, sino porque ese techo
        no admite excepción. El freno detiene a todos de una vez, y también deja rastro.`;
    },
  },
];

const _rec = { activo: false, paso: 0 };
const miles = v => Math.round(v || 0).toLocaleString('es-VE');

/** Lo consulta el HUD para apartarse mientras el recorrido está en marcha. */
function recorridoActivo() { return _rec.activo; }
window.recorridoActivo = recorridoActivo;

function abreRecorrido() {
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
  document.body.classList.remove('con-recorrido');
  quitaFoco();
  const caja = $('#recorrido'); if (caja) caja.hidden = true;
  pintaHud();
}

function quitaFoco() {
  $$('.foco-recorrido').forEach(e => e.classList.remove('foco-recorrido'));
}

function vaAlPaso(i) {
  if (!_rec.activo) return;
  _rec.paso = Math.max(0, Math.min(RECORRIDO.length - 1, i));
  const p = RECORRIDO[_rec.paso];
  quitaFoco();
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
      <button class="btn btn-fantasma btn-mini" id="rec-atras" ${_rec.paso ? '' : 'disabled'}>←</button>
      <button class="btn ${ultimo ? 'btn-humano' : 'btn-marca'} btn-mini" id="rec-sigue">
        ${ultimo ? 'terminar' : 'siguiente →'}
      </button>
      <button class="btn btn-fantasma btn-mini" id="rec-cierra" title="Salir (Esc)">✕</button>
    </div>`;

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
  else if (e.key === 'ArrowRight') { e.preventDefault(); vaAlPaso(_rec.paso + 1); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); vaAlPaso(_rec.paso - 1); }
});
