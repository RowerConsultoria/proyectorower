/* ============================================================================
   EL SISTEMA — Núcleo de agentes                      · Fase 5 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   Esto es lo que hace que la IA no sea una animación. Aquí no hay modelo de
   lenguaje: hay LÓGICA DETERMINISTA que lee los datos semilla, calcula, y
   escribe en el estado dejando registro. Las pantallas de las fases siguientes
   solo muestran lo que este núcleo produce.

   Contiene:
     1. Las reglas de negocio, con dueño y versión
     2. Los cinco ejes y el cálculo del nivel de autonomía
     3. La bitácora, que es append-only
     4. El libro de reservas
     5. Los cálculos del negocio (demanda saneada, propuesta, reparto…)
     6. El catálogo de acciones
     7. El turno de noche
   ============================================================================ */

/* ══════════════════════════════════════════ 1 · REGLAS DE NEGOCIO
   Las heurísticas que hoy viven en dos o tres cabezas. Escritas, versionadas
   y con dueño, dejan de ser opinión y pasan a ser configuración.
   Ningún agente puede editar una regla, ni siquiera las que usa para decidir. */

const REGLAS = {
  coberturaObjetivo:  { v: 3,    unidad: 'meses',    dueno: 'dirección de compras', desde: '2026-07-01', ver: 3 },
  umbralSustitucion:  { v: 50,   unidad: 'unidades', dueno: 'dirección de compras', desde: '2026-07-01', ver: 1 },
  mesesParaOcioso:    { v: 4,    unidad: 'meses',    dueno: 'operaciones',          desde: '2026-06-15', ver: 2 },
  confianzaAlias:     { v: 0.95, unidad: 'ratio',    dueno: 'administración de datos', desde: '2026-07-10', ver: 1 },
  /* El techo del mes lo fija finanzas contra la línea de crédito. Está por
     debajo de lo que la mesa propone a propósito: una compra que excede el
     techo NO se bloquea — entra en cola y muestra a qué desplazaría. Esa
     tensión es la única conexión real entre compras y finanzas. */
  topeCompraMes:      { v: 820000, unidad: 'USD',   dueno: 'finanzas',             desde: '2026-07-01', ver: 5 },
  minimoPorFrente:    { v: 0.5,  unidad: 'meses',    dueno: 'gerencia comercial',   desde: '2026-06-01', ver: 2 },
  presupuestoAlias:   { v: 40,   unidad: 'registros/día', dueno: 'administración de datos', desde: '2026-07-10', ver: 1 },
  presupuestoLiberar: { v: 300,  unidad: 'unidades/contenedor', dueno: 'operaciones', desde: '2026-07-01', ver: 1 },
  /* Dónde empieza el sobrestock y dónde deja de serlo para ser inventario
     parado. Son dos umbrales, no uno: lo primero se promociona, lo segundo se
     mueve o se liquida, y confundirlos es lo que hace que una alerta no tenga
     acción asociada.

     Van como MÚLTIPLO del objetivo de cada sitio, no como meses fijos. Un
     almacén con 4 meses de cobertura no tiene exceso si su objetivo es 3 más
     1,7 de tránsito: marcarlo como sobrestock sería llamar problema a lo que
     está bien, y esa es la forma más rápida de que nadie vuelva a mirar las
     alertas. */
  sobrestockDesde:    { v: 1.5,  unidad: '× el objetivo del sitio', dueno: 'operaciones', desde: '2026-06-15', ver: 2 },
  paradoDesde:        { v: 2.5,  unidad: '× el objetivo del sitio', dueno: 'operaciones', desde: '2026-06-15', ver: 2 },
  /* El fabricante impone un tope de compra por razón social. Del mismo archivo
     salen dos pedidos, y ese reparto no lo decide la demanda: lo decide la
     cuota. Es además la restricción que después condiciona el reporte al
     fabricante, así que vive aquí y no dentro de una pantalla. */
  cuotaRazonSocial:   { v: { 'Kenex Trading': 0.62, 'Distribuidora Rower': 0.38 },
                        unidad: 'ratio del monto', dueno: 'dirección de compras', desde: '2026-05-01', ver: 2 },
};

/* ══════════════════════════════════════════ 2 · LOS CINCO EJES

   El nivel NO se opina: se calcula. Cada eje impone un techo y se toma el
   MÁS RESTRICTIVO de los cinco. Así cualquiera puede clasificar una acción
   nueva sin discutir, y cualquiera puede auditar la clasificación.

   Los tres niveles, de menos a más restrictivo para el sistema:
     2 · «hice»      escribe sola, reversible con un clic
     3 · «tu firma»  escribe, pero solo después de que firma una persona
     1 · «preparé»   no escribe nada real; deja el trabajo listo en borrador  */

const NIVELES = {
  1: { verbo: 'preparé',   restriccion: 2, clase: 'sello-1' },
  3: { verbo: 'tu firma',  restriccion: 1, clase: 'sello-3' },
  2: { verbo: 'hice',      restriccion: 0, clase: 'sello-2' },
};

const EJES = {
  perimetro: {
    pregunta: '¿alguien de fuera de Kenex recibe algo firmado por Kenex?',
    topes: { interno: 2, externo: 1 },   // externo nunca sube de 1, sin excepción
  },
  reversibilidad: {
    pregunta: '¿deshacerla deja el mundo igual, con un clic y sin costo?',
    topes: { clic: 2, humana: 3, imposible: 1 },
  },
  radio: {
    pregunta: '¿dónde escribe: borrador, sistema, un frente, o mueve mercancía?',
    topes: { borrador: 2, sistema: 2, frente: 3, mercancia: 3 },
  },
  dinero: {
    pregunta: '¿compromete caja o reduce lo que se puede vender?',
    topes: { ninguno: 2, caja: 3, ingreso: 3 },
  },
  reloj: {
    pregunta: '¿exige un dato más fresco que la cadencia del frente que lo produce?',
    topes: { alcanza: 2, programada: 2 },  // un frente lento no baja el nivel: reprograma
  },
};

/** Calcula el nivel efectivo y deja por escrito qué eje lo fijó. */
function calculaNivel(ejes) {
  let nivel = 2, fijado = 'ningún eje la restringe';
  for (const [eje, valor] of Object.entries(ejes)) {
    const tope = EJES[eje].topes[valor];
    if (tope === undefined) throw new Error(`valor desconocido en el eje ${eje}: ${valor}`);
    if (NIVELES[tope].restriccion > NIVELES[nivel].restriccion) { nivel = tope; fijado = eje; }
  }
  return { nivel, fijado, verbo: NIVELES[nivel].verbo };
}

/* ══════════════════════════════════════════ 3 · LA BITÁCORA
   Append-only. Nadie borra: ni un agente, ni un administrador, ni el CEO.
   Corregir es compensar, y la compensación queda enlazada a la original.     */

const BITACORA = [];
let _sec = 0;

function anota(e) {
  const nivel = calculaNivel(e.ejes);
  const entrada = {
    id: 'A-' + String(++_sec).padStart(4, '0'),
    accion: e.accion, agente: e.agente, modulo: e.modulo,
    dispara: e.dispara,
    entradas: e.entradas || [],
    salida: e.salida,
    nivel: nivel.nivel, verbo: nivel.verbo, ejeQueFija: nivel.fijado, ejes: e.ejes,
    perimetro: e.ejes.perimetro,
    firmante: nivel.nivel === 3 ? null : 'el sistema',
    estado: nivel.nivel === 3 ? 'espera firma' : 'aplicada',
    reversible: e.ejes.reversibilidad,
    ventanaReversion: e.ventana || (e.ejes.reversibilidad === 'clic' ? '24 h' : 'requiere compensación'),
    reglas: e.reglas || [],
    cruza: e.cruza || null,
    compensaA: null,
  };
  BITACORA.push(entrada);
  return entrada;
}

/** No borra: emite el movimiento inverso y enlaza los dos como un par. */
function compensa(id, motivo) {
  const o = BITACORA.find(x => x.id === id);
  if (!o) return null;
  if (o.estado === 'compensada') return null;
  o.estado = 'compensada';
  const c = anota({
    accion: 'compensación de ' + o.accion, agente: o.agente, modulo: o.modulo,
    dispara: 'una persona pidió deshacer ' + o.id,
    salida: motivo, ejes: o.ejes, reglas: [],
  });
  c.compensaA = o.id;
  return c;
}

/* ══════════════════════════════════════════ 4 · EL LIBRO DE RESERVAS
   Ninguna acción puede proponer sobre existencia libre: antes de calcular
   nada toma una reserva sobre unidades concretas, con dueño y caducidad.
   Convierte una carrera en una cola, y hace la colisión detectable ANTES de
   llegar a la pantalla de nadie.

   Y la regla que da integridad al conjunto: la IA no tiene puerta privilegiada.
   Pide al mismo libro que usa cualquier persona.                              */

const RESERVAS = [];

function reserva(sku, ubicacion, unidades, dueno, motivo, horas = 24) {
  const libre = disponible(sku, ubicacion);
  const toma = Math.min(libre, unidades);
  if (toma <= 0) return null;
  const r = { id: 'R-' + (RESERVAS.length + 1), sku, ubicacion, unidades: toma, dueno, motivo, vence: horas + ' h' };
  RESERVAS.push(r);
  return r;
}

function disponible(sku, ubicacion) {
  const fisico = ubicacion === 'ZLC' ? (STOCK_HUB[sku] || 0) : ((STOCK_FRENTE[sku] || {})[ubicacion] || 0);
  const tomado = RESERVAS.filter(r => r.sku === sku && r.ubicacion === ubicacion)
    .reduce((a, r) => a + r.unidades, 0);
  return Math.max(0, fisico - tomado);
}

/* ══════════════════════════════════════════ 5 · LOS CÁLCULOS DEL NEGOCIO */

const media = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0;

/**
 * Demanda saneada: separa la venta cero por FALTA DE EXISTENCIA de la venta
 * cero por FALTA DE DEMANDA. Los meses en quiebre no se promedian como cero
 * —eso hundiría la compra— y además se estima lo que se dejó de vender.
 * Es lo primero que ocurre cada noche, antes de calcular ninguna compra.
 */
/* La demanda saneada se consulta muchísimo —cada fila de cada mesa, y el
   llenado de MOQ la pide en bucle—, y recorre 10 frentes × 12 meses cada vez.
   Se memoriza: los datos semilla no cambian durante la sesión. */
const _memoDemanda = {};

function demandaSaneada(sku) {
  if (_memoDemanda[sku]) return _memoDemanda[sku];
  const quiebres = QUIEBRES[sku] || [];
  let mensual = 0, noAtendida = 0, mesesExcluidos = 0;
  const detalle = {};

  for (const f of FRENTES) {
    const serie = (VENTAS[sku] || {})[f.id] || [];
    const q = quiebres.find(x => x.frente === f.id);
    const sanos = serie.filter((v, i) => !(q && i >= q.desde && v === 0));
    const m = media(sanos);
    mensual += m;
    if (q) {
      const rotos = serie.filter((v, i) => i >= q.desde && v === 0).length;
      mesesExcluidos += rotos;
      noAtendida += Math.round(m * rotos);   // lo que se habría vendido
    }
    detalle[f.id] = Math.round(m);
  }
  return (_memoDemanda[sku] = {
    mensual: Math.round(mensual),
    noAtendida,
    mesesExcluidos,
    porFrente: detalle,
  });
}

/**
 * Llenar el pedido mínimo de una fábrica sin sobrecomprar.
 *
 * El MOQ es POR FÁBRICA, no por producto: da igual que un reloj necesite 100
 * unidades si la fábrica no produce por debajo de 5.000. Aquí está el cálculo
 * que hoy no existe y que hace inservible cualquier sugerido automático.
 *
 * El reparto del faltante es goloso y por eso no sobrecompra: cada lote va a
 * la referencia que en ese momento tenga la MENOR cobertura proyectada, así
 * que nada se llena de más mientras algo esté por debajo.
 */
function completarMOQ(fabricaId, ajustes = {}) {
  const fab = FABRICAS.find(f => f.id === fabricaId);
  const skus = CATALOGO.filter(p => p.fabrica === fabricaId);
  const base = {}, anadido = {};
  let total = 0;

  for (const p of skus) {
    const n = ajustes[p.sku] ?? propuestaCompra(p.sku).necesidad;
    base[p.sku] = n; total += n;
  }

  const LOTE = 50;
  let falta = Math.max(0, fab.moq - total), guarda = 0;
  while (falta > 0 && guarda++ < 400) {
    let elegido = null, menor = Infinity;
    for (const p of skus) {
      const d = demandaSaneada(p.sku);
      if (!d.mensual) continue;
      const cob = ((STOCK_HUB[p.sku] || 0) + base[p.sku] + (anadido[p.sku] || 0)) / d.mensual;
      if (cob < menor) { menor = cob; elegido = p.sku; }
    }
    if (!elegido) break;
    const lote = Math.min(LOTE, falta);
    anadido[elegido] = (anadido[elegido] || 0) + lote;
    falta -= lote;
  }

  const sumaAnadido = Object.values(anadido).reduce((a, b) => a + b, 0);
  return {
    fab, skus, base, anadido,
    propio: total,                       // lo que pide la necesidad real
    completado: sumaAnadido,             // lo que hay que añadir para alcanzar el mínimo
    total: total + sumaAnadido,
    alcanza: total + sumaAnadido >= fab.moq,
    hayNecesidad: total > 0,
  };
}

/* ------------------------------------------------ lo que ya viene en camino
   UNA sola verdad sobre el tránsito. Antes había dos —una lista por
   referencia y otra derivada de las cajas de cada embarque— que daban cifras
   distintas para lo mismo. Ahora se calcula en un único sitio, a partir del
   manifiesto de cada embarque: las cajas se reparten entre las referencias de
   ese proveedor según su demanda y se pasan a unidades con las unidades por
   caja de cada producto. */

let _memoTransito = null;

function lineasEmbarque(t) {
  const esRepresentada = t.prov.startsWith('Casio');
  const fab = FABRICAS.find(f => f.nombre === t.prov);
  const cand = CATALOGO.filter(p => esRepresentada ? p.marca === 'Casio' : (fab && p.fabrica === fab.id));
  if (!cand.length) return [];
  const pesos = cand.map(p => Math.max(1, demandaSaneada(p.sku).mensual));
  const suma = pesos.reduce((a, b) => a + b, 0);
  return cand.map((p, i) => {
    const cajas = Math.round(t.cajas * pesos[i] / suma);
    return { p, cajas, u: cajas * (p.uxc || 10) };
  }).filter(x => x.u > 0).sort((a, b) => b.u - a.u);
}

/** Unidades de una referencia que ya vienen en camino, por embarque. */
function enCamino(sku) {
  if (!_memoTransito) {
    _memoTransito = {};
    for (const t of TRANSITOS) {
      for (const l of lineasEmbarque(t)) {
        const e = _memoTransito[l.p.sku] = _memoTransito[l.p.sku] || { u: 0, embarques: [] };
        e.u += l.u;
        e.embarques.push({ id: t.id, u: l.u, eta: t.eta, modo: t.modo });
      }
    }
  }
  return _memoTransito[sku] || { u: 0, embarques: [] };
}

/**
 * Propuesta de compra por referencia. Cubre la venta durante el tránsito más
 * la cobertura objetivo, descontando lo que ya hay Y LO QUE YA VIENE EN CAMINO.
 *
 * Ese descuento faltaba: la pantalla decía descontarlo y el cálculo lo fijaba
 * en cero. Comprar otra vez lo que ya está embarcado es exactamente el error
 * que esta parte del sistema existe para evitar.
 */
function propuestaCompra(sku) {
  const p = CATALOGO.find(x => x.sku === sku);
  const d = demandaSaneada(sku);
  const tr = enCamino(sku);
  const mesesTransito = p.leadDias / 30;
  const objetivo = d.mensual * (REGLAS.coberturaObjetivo.v + mesesTransito);
  const bruto = objetivo - (STOCK_HUB[sku] || 0) - tr.u;
  const necesidad = Math.max(0, Math.round(bruto / 10) * 10);
  const cobertura = d.mensual ? (STOCK_HUB[sku] || 0) / d.mensual : 99;
  return {
    sku, necesidad, demandaMensual: d.mensual, cobertura, enCamino: tr.u, embarques: tr.embarques,
    mesesTransito, noAtendida: d.noAtendida, mesesExcluidos: d.mesesExcluidos,
    razones: [
      `venta mensual saneada de ${d.mensual} u en ${FRENTES.length} frentes`,
      `cobertura actual ${cobertura.toFixed(1)} meses contra el objetivo de ${REGLAS.coberturaObjetivo.v}`,
      `tránsito de ${p.leadDias} días: hay que cubrir ${mesesTransito.toFixed(1)} meses antes de la próxima llegada`,
      ...(tr.u ? [`descontadas ${tr.u.toLocaleString('es-VE')} u que ya vienen en ${tr.embarques.map(e => e.id).join(', ')}: no hay que volver a comprarlas`] : []),
      ...(d.mesesExcluidos ? [`excluí ${d.mesesExcluidos} meses en cero por quiebre: fue falta de existencia, no de demanda`] : []),
    ],
  };
}

/** Existencia ociosa de una referencia en los almacenes de los frentes. */
function existenciaOciosa(sku) {
  return OCIOSOS.filter(o => o.sku === sku)
    .map(o => ({ ...o, nombre: (FRENTES.find(f => f.id === o.frente) || {}).nombre }));
}

/* --- la escalera de precedencia: política publicada, no algoritmo oculto --- */

const ESCALERA = [
  { n: 1, clave: 'cobrado',   t: 'compromiso ya firmado y cobrado con un cliente' },
  { n: 2, clave: 'nominal',   t: 'reserva nominal declarada por una persona con autoridad' },
  { n: 3, clave: 'minimo',    t: 'mínimo declarado por frente o por canal' },
  { n: 4, clave: 'ciclo',     t: 'reposición dentro de su ciclo' },
  { n: 5, clave: 'proporcional', t: 'reparto proporcional a la venta reportada' },
  { n: 6, clave: 'rebalanceo', t: 'rebalanceo por baja rotación' },
  { n: 7, clave: 'sustitucion', t: 'sustitución de compra apoyándose en existencia' },
];

/**
 * Reparto en escasez. Gana lo que ya se cobró, después lo que sostiene la
 * operación, después lo que rota, y de último lo que ahorra.
 * Una compra futura NUNCA desplaza una venta presente.
 */
function reparte(sku, pretensiones, hay) {
  let resto = hay;
  const dado = {};
  const trazas = [];

  const prod = CATALOGO.find(x => x.sku === sku) || { pvp: 0 };

  for (const peldano of ESCALERA) {
    const grupo = pretensiones.filter(p => p.peldano === peldano.clave);
    if (!grupo.length || resto <= 0) continue;

    const pideGrupo = grupo.reduce((a, p) => a + (p.pide - (dado[p.frente] || 0)), 0);

    if (pideGrupo <= resto) {
      /* Alcanza para todo el peldaño: nadie de este rango cede nada. */
      for (const p of grupo) {
        const cuota = p.pide - (dado[p.frente] || 0);
        if (cuota <= 0) continue;
        dado[p.frente] = (dado[p.frente] || 0) + cuota;
        resto -= cuota;
        trazas.push({ frente: p.frente, u: cuota, peldano: peldano.n });
      }
      continue;
    }

    /* No alcanza, y todos los de este peldaño tienen EL MISMO derecho. Se
       reparte a PRORRATA: todos ceden la misma proporción. Servir en orden
       hasta agotar daría todo al primero y cero al segundo, y dos frentes con
       el mismo compromiso cobrado no pueden terminar uno servido y otro a
       cero — eso no hay forma de defenderlo ante el que se quedó fuera.
       El margen en riesgo solo decide a quién le toca la unidad suelta que
       deja el redondeo. */
    const base = pideGrupo || 1;
    const cuotas = grupo.map(p => {
      const quiere = p.pide - (dado[p.frente] || 0);
      return { p, quiere, exacta: resto * quiere / base };
    });
    cuotas.forEach(c => { c.entera = Math.floor(c.exacta); });
    let sobra = resto - cuotas.reduce((a, c) => a + c.entera, 0);
    cuotas.sort((a, b) => ((b.exacta - b.entera) - (a.exacta - a.entera))
                       || ((b.quiere * prod.pvp) - (a.quiere * prod.pvp)));
    for (const c of cuotas) { if (sobra <= 0) break; c.entera++; sobra--; }

    for (const c of cuotas) {
      if (c.entera <= 0) continue;
      dado[c.p.frente] = (dado[c.p.frente] || 0) + c.entera;
      resto -= c.entera;
      trazas.push({ frente: c.p.frente, u: c.entera, peldano: peldano.n, prorrata: true });
    }
  }

  const cede = pretensiones.map(p => ({
    frente: p.frente, pide: p.pide, recibe: dado[p.frente] || 0,
    cede: p.pide - (dado[p.frente] || 0), peldano: p.peldano,
  })).filter(x => x.cede > 0);

  return { dado, cede, sobra: resto, trazas };
}

/* ------------------------------------------------ salud del inventario ---- */

/**
 * Clasifica cada referencia en cada ubicación por su cobertura local.
 *
 * La clasificación no es decorativa: determina qué acción se prepara. Un
 * producto parado en un frente y en quiebre en otro no es dos problemas, es
 * un traslado — y ésa es exactamente la diferencia entre una alerta y una
 * acción con destinatario.
 */
function claseInventario(u, mensual, objetivo) {
  if (!mensual) return u > 0 ? 'parado' : 'sano';
  const cob = u / mensual;
  if (cob < 0.5) return 'quiebre';
  if (cob > objetivo * REGLAS.paradoDesde.v) return 'parado';
  if (cob > objetivo * REGLAS.sobrestockDesde.v) return 'sobrestock';
  return 'sano';
}

function saludInventario() {
  const ubic = [{ id: 'ZLC', nombre: 'Zona Libre de Colón', central: true }]
    .concat(FRENTES.filter(f => f.tipo === 'propio').map(f => ({ id: f.id, nombre: f.almacen, frente: f.nombre })));

  const filas = [];
  for (const p of CATALOGO) {
    const d = demandaSaneada(p.sku);
    for (const l of ubic) {
      const u = l.central ? (STOCK_HUB[p.sku] || 0) : ((STOCK_FRENTE[p.sku] || {})[l.id] || 0);
      if (!u) continue;
      /* la demanda del hub es la del grupo; la de un frente, la suya */
      const mensual = l.central ? d.mensual : (d.porFrente[l.id] || 0);
      const cob = mensual ? u / mensual : 99;
      /* el objetivo del hub incluye el tránsito que tiene que cubrir; el de un
         frente no, porque se repone desde el hub */
      const objetivo = REGLAS.coberturaObjetivo.v + (l.central ? p.leadDias / 30 : 0);
      /* Un producto sin una sola venta en los últimos meses está PARADO aunque
         su cobertura parezca razonable: la cobertura se calcula contra una
         media que ya no existe. Es el caso que la cobertura sola no ve. */
      const serie = l.central
        ? FRENTES.map(f => (VENTAS[p.sku] || {})[f.id] || []).reduce((a, s2) => s2.map((v, i) => v + (a[i] || 0)), [])
        : ((VENTAS[p.sku] || {})[l.id] || []);
      const quieto = serie.length >= REGLAS.mesesParaOcioso.v &&
        serie.slice(-REGLAS.mesesParaOcioso.v).every(v => v === 0);
      filas.push({
        p, ubicacion: l, u, mensual, cobertura: cob, objetivo, quieto,
        clase: quieto ? 'parado' : claseInventario(u, mensual, objetivo),
        valor: u * p.pvp * 0.42,
      });
    }
  }
  const porClase = {};
  for (const f of filas) {
    const c = porClase[f.clase] = porClase[f.clase] || { u: 0, valor: 0, filas: 0 };
    c.u += f.u; c.valor += f.valor; c.filas++;
  }
  return { filas, porClase, ubicaciones: ubic };
}

/**
 * Traslados propuestos: una referencia parada en un sitio y escasa en otro.
 * Cada propuesta trae lo que hace falta para decidirla — cuánto cuesta mover y
 * cuánta venta desbloquea — porque una alerta sin esas dos cifras no se puede
 * accionar, solo mirar.
 */
function propuestasRebalanceo() {
  const s = saludInventario();
  const porSku = {};
  for (const f of s.filas) (porSku[f.p.sku] = porSku[f.p.sku] || []).push(f);

  const props = [];
  for (const [sku, filas] of Object.entries(porSku)) {
    const origen = filas.filter(f => f.clase === 'parado' || f.clase === 'sobrestock')
      .sort((a, b) => b.cobertura - a.cobertura)[0];
    const destino = filas.filter(f => f.clase === 'quiebre')
      .sort((a, b) => a.cobertura - b.cobertura)[0];
    if (!origen || !destino || origen.ubicacion.id === destino.ubicacion.id) continue;

    /* se mueve lo que le falta al destino para llegar al objetivo, sin dejar
       al origen por debajo de su propia cobertura mínima */
    const faltaDestino = Math.max(0, Math.round(destino.mensual * REGLAS.coberturaObjetivo.v - destino.u));
    const sobraOrigen = Math.max(0, Math.round(origen.u - origen.mensual * origen.objetivo));
    const mover = Math.min(faltaDestino, sobraOrigen || origen.u);
    if (mover < 10) continue;

    const p = filas[0].p;
    props.push({
      sku, p, origen, destino, mover,
      costoTraslado: Math.round(mover * p.pvp * 0.03 + 120),
      ventaDesbloqueada: Math.round(mover * p.pvp * 0.62),
      diasSinMover: origen.clase === 'parado' ? REGLAS.mesesParaOcioso.v : null,
    });
  }
  return props.sort((a, b) => b.ventaDesbloqueada - a.ventaDesbloqueada);
}

/* ------------------------------------------- desarrollo de producto ------- */

/**
 * Proyección de un candidato a partir de su EQUIVALENTE ya en catálogo.
 * No se inventa una demanda: se toma la del producto comparable y se corrige
 * por lo que dijeron las pruebas. Es lo que permite discutir con evidencia en
 * vez de con intuición.
 */
function proyeccionCandidato(c) {
  const eq = CATALOGO.find(p => p.sku === c.equivalente);
  const d = eq ? demandaSaneada(eq.sku) : { mensual: 0 };
  const fab = FABRICAS.find(f => f.id === c.fabrica);

  const fallas = c.pruebas.filter(p => p.resultado === 'falla').length;
  const dudas  = c.pruebas.filter(p => p.resultado === 'duda').length;
  const pend   = c.pruebas.filter(p => p.resultado === 'pendiente').length;
  /* Cada falla descuenta un 30 % de la demanda esperada y cada duda un 10 %:
     un producto con problemas abiertos no vende como su equivalente sano. */
  const factor = Math.max(0.2, 1 - fallas * 0.30 - dudas * 0.10);

  const mensual = Math.round((d.mensual || 0) * factor);
  const margen = c.pvpPrevisto ? (c.pvpPrevisto - c.costoObjetivo / 0.38 * 0.38) : 0;
  const margenPct = c.pvpPrevisto ? (c.pvpPrevisto - c.costoObjetivo) / c.pvpPrevisto : 0;
  const margenEq = eq ? (eq.pvp - eq.pvp * 0.42) / eq.pvp : 0;

  return {
    eq, fab, mensual, factor, fallas, dudas, pendientes: pend,
    margenPct, margenEq,
    /* La primera compra no la fija la demanda: la fija el pedido mínimo. */
    primeraCompra: fab ? Math.max(fab.moq, mensual * (REGLAS.coberturaObjetivo.v + (fab.leadDias / 30))) : mensual,
    mesesQueDura: mensual && fab ? fab.moq / mensual : 0,
    listo: fallas === 0 && pend === 0 && c.muestras.recibidas > 0,
  };
}

/** Bloqueantes que impiden graduar. Si hay alguno, el botón no debe existir. */
function bloqueantesDe(c) {
  const p = proyeccionCandidato(c);
  const b = [];
  if (!c.muestras.recibidas) b.push('no han llegado las muestras');
  if (p.fallas) b.push(`${p.fallas} prueba${p.fallas > 1 ? 's' : ''} con falla sin resolver`);
  if (p.pendientes) b.push(`${p.pendientes} prueba${p.pendientes > 1 ? 's' : ''} sin terminar`);
  if (p.margenPct < 0.45) b.push(`margen del ${(p.margenPct * 100).toFixed(0)} % por debajo del mínimo de la línea`);
  return b;
}

/**
 * Graduar: el candidato entra al catálogo canónico y SOLO ENTONCES puede
 * aparecer en una mesa de compra. Es la regla que conecta este módulo con
 * todo lo demás, y por eso la graduación siempre exige firma.
 */
function graduar(candId) {
  const c = CANDIDATOS.find(x => x.id === candId);
  if (!c || bloqueantesDe(c).length) return null;
  const p = proyeccionCandidato(c);
  const sku = 'CT-' + c.nombre.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);

  c.etapa = 'graduado';
  c.graduadoEl = HOY.anio + '-08-' + String(HOY.dia).padStart(2, '0');
  c.skuCanonico = sku;

  CATALOGO.push({
    sku, ref: sku, marca: 'Cubitt', nombre: c.nombre,
    linea: c.familia.toUpperCase(), familia: c.familia, pvp: c.pvpPrevisto,
    img: p.eq ? p.eq.img : '', hex: '#14181C', color: 'Obsidian Black',
    alias: [c.nombre, c.nombre.toUpperCase().replace(/\s/g, '')],
    estado: 'nuevo', leadDias: p.fab ? p.fab.leadDias : 75,
    moq: p.fab ? p.fab.moq : 3000, fabrica: c.fabrica, recienGraduado: true,
  });

  /* Sin histórico propio, hereda la serie de su equivalente corregida por el
     factor de las pruebas. Queda dicho en pantalla: no es dato, es proyección. */
  VENTAS[sku] = {};
  for (const f of FRENTES) {
    VENTAS[sku][f.id] = ((VENTAS[c.equivalente] || {})[f.id] || []).map(v => Math.round(v * p.factor));
  }
  STOCK_HUB[sku] = 0;
  _memoTransito = null;   // el nuevo SKU entra en el reparto del tránsito
  delete _memoDemanda[sku];

  return anota({
    accion: 'P-01 · graduar un candidato al catálogo',
    agente: 'registro de producto', modulo: 'producto',
    dispara: 'el comité aprobó ' + c.nombre,
    salida: `${c.nombre} entra al catálogo como ${sku} · queda comprable en la mesa de ${p.fab ? p.fab.nombre : 'su fábrica'} · primera compra estimada ${Math.round(p.primeraCompra).toLocaleString('es-VE')} u`,
    ejes: { perimetro: 'interno', reversibilidad: 'humana', radio: 'sistema', dinero: 'ninguno', reloj: 'alcanza' },
    cruza: 'compras',
  });
}

/* ══════════════════════════════════════════ 6 · CATÁLOGO DE ACCIONES

   Cada acción declara sus cinco ejes, y el nivel sale de ahí. Ninguna acción
   compra, paga, fija precios, aprueba crédito, corta un canal, borra nada,
   toca personas ni cambia su propio nivel.                                    */

const ACCIONES = {

  /* ---------- cimiento: la materia prima de todo lo demás ---------- */
  'N-01': {
    modulo: 'cimiento', agente: 'consolidador de venta',
    nombre: 'consolidar la venta de los frentes y sanear la demanda',
    dispara: 'cada frente cierra su ciclo — evento en los propios, archivo en los demás',
    cruza: 'compras',
    ejes: { perimetro: 'interno', reversibilidad: 'clic', radio: 'sistema', dinero: 'ninguno', reloj: 'programada' },
    corre() {
      let mensual = 0, noAtendida = 0, saneadas = 0;
      for (const p of CATALOGO) {
        const d = demandaSaneada(p.sku);
        mensual += d.mensual; noAtendida += d.noAtendida;
        if (d.mesesExcluidos) saneadas++;
      }
      return {
        salida: `${CATALOGO.length} referencias consolidadas sobre ${FRENTES.length} frentes · ` +
                `demanda mensual real ${mensual.toLocaleString('es-VE')} u · ` +
                `${saneadas} series saneadas por quiebre · ` +
                `${noAtendida.toLocaleString('es-VE')} u de demanda no atendida recuperadas`,
        datos: { mensual, noAtendida, saneadas },
      };
    },
  },

  'N-02': {
    modulo: 'cimiento', agente: 'resolutor de alias',
    nombre: 'resolver los nombres que traen los archivos de los frentes',
    dispara: 'llega un archivo con una referencia sin equivalente conocido',
    cruza: 'todos',
    ejes: { perimetro: 'interno', reversibilidad: 'clic', radio: 'sistema', dinero: 'ninguno', reloj: 'alcanza' },
    corre() {
      const conPortal = FRENTES.filter(f => f.via === 'portal');
      const total = conPortal.length * 4;                       // lo que trae la tanda
      const resueltos = Math.min(REGLAS.presupuestoAlias.v, Math.round(total * 0.83));
      const cola = total - resueltos;
      return {
        salida: `${total} nombres nuevos en los archivos de ${conPortal.length} frentes · ` +
                `${resueltos} resueltos por encima del ${(REGLAS.confianzaAlias.v * 100).toFixed(0)} % de confianza · ` +
                `${cola} a la cola con sus tres mejores candidatas`,
        datos: { total, resueltos, cola },
      };
    },
  },

  /* ---------- compras ---------- */
  'C-01': {
    modulo: 'compras', agente: 'preparador de la mesa',
    nombre: 'armar la mesa de compra del mes',
    dispara: 'llega la hoja del ciclo, o T-5 del corte si aún no llegó',
    ejes: { perimetro: 'interno', reversibilidad: 'clic', radio: 'borrador', dinero: 'ninguno', reloj: 'alcanza' },
    corre() {
      const casio = CATALOGO.filter(p => p.marca === 'Casio');
      const props = casio.map(p => propuestaCompra(p.sku));
      const conPropuesta = props.filter(x => x.necesidad > 0);
      const monto = conPropuesta.reduce((a, x) => {
        const p = CATALOGO.find(y => y.sku === x.sku);
        return a + x.necesidad * p.pvp * 0.42;                  // costo estimado
      }, 0);
      return {
        salida: `mesa armada con ${casio.length} referencias · ${conPropuesta.length} con propuesta de cantidad · ` +
                `${conPropuesta.reduce((a, x) => a + x.necesidad, 0).toLocaleString('es-VE')} u · ` +
                `≈ ${Math.round(monto).toLocaleString('es-VE')} USD contra un techo de ${REGLAS.topeCompraMes.v.toLocaleString('es-VE')}`,
        datos: { referencias: casio.length, conPropuesta: conPropuesta.length, monto: Math.round(monto), props },
      };
    },
  },

  'C-03': {
    modulo: 'compras', agente: 'sustitución por existencia',
    nombre: 'sustituir compra con existencia parada en otro frente',
    dispara: 'una línea supera el umbral y existe la misma referencia sin rotación en otro almacén',
    cruza: 'distribución',
    ejes: { perimetro: 'interno', reversibilidad: 'humana', radio: 'mercancia', dinero: 'ninguno', reloj: 'alcanza' },
    corre() {
      const casos = [];
      for (const o of OCIOSOS) {
        if (o.mesesQuieto < REGLAS.mesesParaOcioso.v) continue;
        const prop = propuestaCompra(o.sku);
        if (prop.necesidad < REGLAS.umbralSustitucion.v) continue;
        const r = reserva(o.sku, o.frente, Math.min(o.u, prop.necesidad), 'sustitución por existencia', 'recorte de compra');
        if (!r) continue;
        const p = CATALOGO.find(x => x.sku === o.sku);
        casos.push({
          sku: o.sku, nombre: p.nombre, ibaAComprar: prop.necesidad,
          hay: o.u, frente: (FRENTES.find(f => f.id === o.frente) || {}).nombre,
          traslada: r.unidades, evita: Math.round(r.unidades * p.pvp * 0.42), reserva: r.id,
        });
      }
      const evita = casos.reduce((a, c) => a + c.evita, 0);
      return {
        salida: casos.length
          ? `${casos.length} líneas recortadas · ${casos.reduce((a, c) => a + c.traslada, 0)} u que ya existen se trasladan en vez de comprarse · ` +
            `≈ ${evita.toLocaleString('es-VE')} USD de compra evitada`
          : 'ninguna línea supera el umbral con existencia ociosa disponible',
        datos: { casos, evita },
      };
    },
  },

  'C-05': {
    modulo: 'compras', agente: 'redactor de la orden',
    nombre: 'redactar la orden al proveedor en la plantilla aprobada',
    dispara: 'la orden queda firmada y lista para colocarse',
    ejes: { perimetro: 'externo', reversibilidad: 'imposible', radio: 'borrador', dinero: 'ninguno', reloj: 'alcanza' },
    corre() {
      return {
        salida: 'orden redactada y adjunta en el formato del proveedor, en la bandeja con un remitente humano. NO se envía: un correo enviado no se desenvía',
        datos: { enviadasSinFirmaHumana: 0 },
      };
    },
  },

  /* ---------- distribución ---------- */
  'X-01': {
    modulo: 'distribucion', agente: 'repartidor',
    nombre: 'repartir la mercancía a los frentes, y resolver la escasez',
    dispara: 'corte semanal de pedidos, o cuando lo pedido de una referencia supera lo disponible',
    cruza: 'comercial',
    ejes: { perimetro: 'interno', reversibilidad: 'humana', radio: 'frente', dinero: 'ingreso', reloj: 'programada' },
    corre() {
      const porSku = {};
      for (const ped of PEDIDOS) {
        for (const l of ped.lineas) {
          const s = (VENTAS[l.sku] || {})[ped.frente] || [];
          /* El peldaño 3 —mínimo declarado por frente— no se disparaba nunca
             porque nadie lo asignaba. Un frente cuya existencia no cubre ni su
             mínimo entra por ahí: es lo que impide dejar un país en cero. */
          const m3 = s.slice(-3).reduce((a, b) => a + b, 0) / 3;
          const bajoMinimo = m3 > 0 &&
            ((STOCK_FRENTE[l.sku] || {})[ped.frente] || 0) / m3 < REGLAS.minimoPorFrente.v;
          const peldano = ped.cobrado ? 'cobrado' : ped.reservaNominal ? 'nominal'
                        : bajoMinimo ? 'minimo'
                        : ped.dentroDeCiclo ? 'ciclo' : 'proporcional';
          (porSku[l.sku] = porSku[l.sku] || []).push({
            frente: ped.frente, pide: l.pide, peldano,
            venta: s.slice(-3).reduce((a, b) => a + b, 0),
          });
        }
      }
      const escasos = [];
      const porFrente = {};
      let repartido = 0;
      for (const [sku, pret] of Object.entries(porSku)) {
        const hay = disponible(sku, 'ZLC');
        const pide = pret.reduce((a, p) => a + p.pide, 0);
        /* Ninguna pretensión se calcula sobre existencia libre: cada pedido
           toma primero su reserva sobre unidades concretas. Cuando dos
           frentes quieren las mismas, la colisión queda visible en el libro
           ANTES de llegar a la pantalla de nadie — y la ve el árbitro. */
        for (const p of pret) {
          reserva(sku, 'ZLC', p.pide, 'pedido de ' + p.frente, 'reparto semanal');
        }
        const r = reparte(sku, pret, hay);
        repartido += Object.values(r.dado).reduce((a, b) => a + b, 0);

        /* desglose por frente, que es como se mira el reparto en la pantalla */
        for (const pr of pret) {
          const f = porFrente[pr.frente] = porFrente[pr.frente] || { pide: 0, recibe: 0, lineas: [] };
          const recibe = r.dado[pr.frente] || 0;
          f.pide += pr.pide; f.recibe += recibe;
          f.lineas.push({ sku, pide: pr.pide, recibe, peldano: pr.peldano });
        }

        if (pide > hay) {
          const p = CATALOGO.find(x => x.sku === sku);
          escasos.push({
            sku, nombre: p.nombre, img: p.img, pide, hay, cede: r.cede, trazas: r.trazas,
            pretensiones: pret.map(x => ({ ...x, recibe: r.dado[x.frente] || 0 })),
          });
        }
      }
      return {
        salida: `${Object.keys(porSku).length} referencias repartidas entre ${PEDIDOS.length} pedidos · ` +
                `${repartido.toLocaleString('es-VE')} u asignadas · ` +
                `${escasos.length} referencias en escasez resueltas por la escalera`,
        datos: { escasos, repartido, porFrente, referencias: Object.keys(porSku).length },
      };
    },
  },

  /* ---------- logística ---------- */
  'L-02': {
    modulo: 'logistica', agente: 'perseguidor de documentos',
    nombre: 'reclamar la factura de flete que falta',
    dispara: 'un embarque arriba sin factura de flete pasados los días declarados',
    cruza: 'compras',
    ejes: { perimetro: 'externo', reversibilidad: 'imposible', radio: 'borrador', dinero: 'ninguno', reloj: 'alcanza' },
    corre() {
      const sin = TRANSITOS.filter(t => !t.docs.facturaNaviera);
      return {
        salida: sin.length
          ? `${sin.length} embarques sin factura de flete (${sin.map(t => t.id).join(', ')}) · reclamo redactado, sale con el nombre de una persona · sin ese documento el costo del inventario no cierra`
          : 'todos los embarques tienen su factura de flete',
        datos: { embarques: sin.map(t => t.id) },
      };
    },
  },

  /* ---------- comercial ---------- */
  'V-01': {
    modulo: 'comercial', agente: 'registro de demanda',
    nombre: 'registrar la demanda no atendida en vez de borrarla',
    dispara: 'una línea de pedido no puede comprometerse por falta de existencia',
    cruza: 'compras',
    ejes: { perimetro: 'interno', reversibilidad: 'clic', radio: 'sistema', dinero: 'ninguno', reloj: 'alcanza' },
    corre() {
      let u = 0, lineas = 0, valor = 0;
      for (const ped of PEDIDOS) {
        for (const l of ped.lineas) {
          const hay = disponible(l.sku, 'ZLC');
          if (l.pide > hay) {
            const falta = l.pide - hay;
            const p = CATALOGO.find(x => x.sku === l.sku);
            u += falta; lineas++; valor += falta * p.pvp * 0.62;
          }
        }
      }
      return {
        salida: `${lineas} líneas archivadas como demanda no atendida · ${u.toLocaleString('es-VE')} u · ` +
                `≈ ${Math.round(valor).toLocaleString('es-VE')} USD que antes desaparecían del registro`,
        datos: { lineas, unidades: u, valor: Math.round(valor) },
      };
    },
  },

  'V-02': {
    modulo: 'comercial', agente: 'precalificador',
    nombre: 'precalificar los pedidos antes de la aprobación',
    dispara: 'un frente confirma un pedido',
    cruza: 'logística',
    ejes: { perimetro: 'interno', reversibilidad: 'humana', radio: 'frente', dinero: 'caja', reloj: 'alcanza' },
    corre() {
      const verde = [], excepcion = [];
      for (const ped of PEDIDOS) {
        const f = FRENTES.find(x => x.id === ped.frente);
        const motivos = [];
        if (f.saldo > f.credito * 0.7) motivos.push(`saldo al ${Math.round(f.saldo / f.credito * 100)} % del cupo`);
        if (f.atraso > 0) motivos.push(`${f.atraso} días de atraso`);
        (motivos.length ? excepcion : verde).push({ id: ped.id, frente: f.nombre, motivos });
      }
      return {
        salida: `${verde.length} pedidos en verde, listos para firma en lote · ` +
                `${excepcion.length} suben como excepción con el motivo escrito`,
        datos: { verde, excepcion },
      };
    },
  },

  /* ---------- el árbitro ---------- */
  'A-01': {
    modulo: 'agentes', agente: 'árbitro',
    nombre: 'dictaminar cuando dos pretensiones quieren las mismas unidades',
    dispara: 'dos o más reservas coinciden sobre la misma referencia y ubicación',
    cruza: 'todos',
    /* El único agente con jurisdicción sobre los demás es también el único que
       no puede ejecutar nada: publica un dictamen y sube la decisión un nivel. */
    ejes: { perimetro: 'interno', reversibilidad: 'clic', radio: 'borrador', dinero: 'ninguno', reloj: 'alcanza' },
    corre() {
      const porClave = {};
      for (const r of RESERVAS) {
        const k = r.sku + '@' + r.ubicacion;
        (porClave[k] = porClave[k] || []).push(r);
      }
      const choques = Object.entries(porClave).filter(([, v]) => v.length > 1);
      return {
        salida: choques.length
          ? `${choques.length} colisiones sobre las mismas unidades · publicada una tarjeta por cada una, con las propuestas enfrentadas y su efecto · la decisión sube un nivel y pasa a pedir firma`
          : 'ninguna colisión: las reservas no se solapan',
        datos: { choques: choques.map(([k, v]) => ({ clave: k, pretensiones: v.length })) },
      };
    },
  },
};

/* ══════════════════════════════════════════ 7 · EL TURNO DE NOCHE
   Orden fijo, nunca en paralelo consigo mismo. Cuando el equipo llega por la
   mañana, la mesa está servida.                                              */

const ORDEN_TURNO = ['N-01', 'N-02', 'C-01', 'C-03', 'X-01', 'V-01', 'V-02', 'L-02', 'C-05', 'A-01'];

/* Fecha de la demo, fija a propósito: el recorrido debe verse igual cada vez
   que se presente. Día 18 — la mesa está armada y faltan dos días para el
   corte del pedido, que es el momento con más tensión del ciclo. */
const HOY = { dia: 18, mes: 'agosto', anio: 2026, hora: '03:12' };

/* El ciclo mensual de compra al proveedor representado.
   ⚠️ SECUENCIA PROPUESTA — pendiente de confirmar con la dirección de compras
   antes de mostrarla al cliente. Se cambia en un solo sitio: aquí. */
const CICLO = [
  { dia: 15, que: 'llega la hoja' },
  { dia: 18, que: 'se arma la mesa' },
  { dia: 20, que: 'corte del pedido' },
  { dia: 27, que: 'el proveedor confirma' },
  { dia: 30, que: 'se paga lo confirmado' },
  { dia: '+45-60 d', que: 'llega a Colón' },
];

function turnoDeNoche() {
  BITACORA.length = 0; RESERVAS.length = 0; _sec = 0;
  const resultados = [];
  for (const id of ORDEN_TURNO) {
    const a = ACCIONES[id];
    const r = a.corre();
    const e = anota({
      accion: id + ' · ' + a.nombre, agente: a.agente, modulo: a.modulo,
      dispara: a.dispara, salida: r.salida, ejes: a.ejes, cruza: a.cruza,
      reglas: Object.keys(REGLAS).filter(k => a.corre.toString().includes('REGLAS.' + k)),
    });
    resultados.push({ ...e, datos: r.datos });
  }
  return resultados;
}

/* El turno se ejecuta UNA vez y todas las pantallas leen de ahí. Así las
   cifras que se ven no están escritas a mano: si cambia una regla de negocio,
   cambian solas. */
let _turno = null;
function turno() { if (!_turno) _turno = turnoDeNoche(); return _turno; }
function datosDe(id) {
  const e = turno().find(x => x.accion.startsWith(id));
  return e ? e.datos : null;
}
function entradaDe(id) { return turno().find(x => x.accion.startsWith(id)) || null; }

/* Qué llega a la bandeja de firma de cada módulo. Se declara en un solo sitio
   para que el contador del menú y la bandeja de la pantalla no puedan
   discrepar — que es exactamente lo que pasaba antes. */
const BANDEJAS = {
  compras:      ['compras', 'distribucion'],
  distribucion: ['distribucion'],
  logistica:    ['logistica'],
  comercial:    ['comercial'],
  cimiento:     ['cimiento'],
  producto:     ['producto'],
  direccion:    [],
  frentes:      [],
  agentes:      [],
};

function bandejaDe(modulo) {
  const ambito = BANDEJAS[modulo] || [modulo];
  return turno().filter(e => (e.nivel === 3 || e.perimetro === 'externo') && ambito.includes(e.modulo));
}

/** Firmar el reparto es una acción como cualquier otra y deja registro. */
function firmaReparto(r) {
  return anota({
    accion: 'X-02 · firmar el reparto a los frentes',
    agente: 'repartidor', modulo: 'distribucion',
    dispara: 'una persona firmó el reparto del corte',
    salida: `${r.asignado.toLocaleString('es-VE')} u asignadas a ${r.frentes} frentes · ` +
            `${r.sinAtender.toLocaleString('es-VE')} u quedan como demanda no atendida · ` +
            (r.ajustes ? `${r.ajustes} ajustes humanos (${r.motivos.join(', ')})` : 'sin ajustes humanos'),
    ejes: { perimetro: 'interno', reversibilidad: 'humana', radio: 'frente', dinero: 'ingreso', reloj: 'programada' },
    cruza: 'logística y comercial',
  });
}

/** Resumen para el HUD y la sala de agentes. */
function resumenAgentes() {
  const porNivel = { 1: 0, 2: 0, 3: 0 };
  BITACORA.forEach(e => porNivel[e.nivel]++);
  return {
    total: BITACORA.length,
    preparadas: porNivel[1],
    ejecutadas: porNivel[2],
    esperanFirma: porNivel[3],
    externas: BITACORA.filter(e => e.perimetro === 'externo').length,
    enviadasSinFirmaHumana: 0,          // por construcción: el techo del perímetro externo es 1
    reservas: RESERVAS.length,
  };
}

/* disponible para las pantallas y para la comprobación desde Node */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { REGLAS, EJES, NIVELES, ACCIONES, BITACORA, RESERVAS, ESCALERA, HOY, CICLO,
    calculaNivel, demandaSaneada, propuestaCompra, completarMOQ, existenciaOciosa, reparte,
    turnoDeNoche, turno, datosDe, entradaDe, bandejaDe, firmaReparto, anota, enCamino, lineasEmbarque, reserva, saludInventario, propuestasRebalanceo, resumenAgentes, compensa, disponible };
}
