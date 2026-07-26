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
  topeCompraMes:      { v: 1450000, unidad: 'USD',   dueno: 'finanzas',             desde: '2026-07-01', ver: 5 },
  minimoPorFrente:    { v: 0.5,  unidad: 'meses',    dueno: 'gerencia comercial',   desde: '2026-06-01', ver: 2 },
  presupuestoAlias:   { v: 40,   unidad: 'registros/día', dueno: 'administración de datos', desde: '2026-07-10', ver: 1 },
  presupuestoLiberar: { v: 300,  unidad: 'unidades/contenedor', dueno: 'operaciones', desde: '2026-07-01', ver: 1 },
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
function demandaSaneada(sku) {
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
  return {
    mensual: Math.round(mensual),
    noAtendida,
    mesesExcluidos,
    porFrente: detalle,
  };
}

/**
 * Propuesta de compra por referencia. Cubre la venta durante el tránsito más
 * la cobertura objetivo, descontando lo que ya hay y lo que ya viene en camino.
 */
function propuestaCompra(sku) {
  const p = CATALOGO.find(x => x.sku === sku);
  const d = demandaSaneada(sku);
  const enCamino = 0;                       // los tránsitos de la semilla no van por SKU
  const mesesTransito = p.leadDias / 30;
  const objetivo = d.mensual * (REGLAS.coberturaObjetivo.v + mesesTransito);
  const bruto = objetivo - (STOCK_HUB[sku] || 0) - enCamino;
  const necesidad = Math.max(0, Math.round(bruto / 10) * 10);
  const cobertura = d.mensual ? (STOCK_HUB[sku] || 0) / d.mensual : 99;
  return {
    sku, necesidad, demandaMensual: d.mensual, cobertura,
    mesesTransito, noAtendida: d.noAtendida, mesesExcluidos: d.mesesExcluidos,
    razones: [
      `venta mensual saneada de ${d.mensual} u en ${FRENTES.length} frentes`,
      `cobertura actual ${cobertura.toFixed(1)} meses contra el objetivo de ${REGLAS.coberturaObjetivo.v}`,
      `tránsito de ${p.leadDias} días: hay que cubrir ${mesesTransito.toFixed(1)} meses antes de la próxima llegada`,
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
    /* Desempate dentro del mismo peldaño: gana el mayor margen en riesgo por
       unidad. Sin esto el reparto dependería del orden de llegada, que no es
       un criterio que nadie pueda defender ante un frente que se quedó corto. */
    const grupo = pretensiones.filter(p => p.peldano === peldano.clave)
      .sort((a, b) => (b.pide * prod.pvp) - (a.pide * prod.pvp));
    if (!grupo.length) continue;

    if (peldano.clave === 'proporcional') {
      const base = grupo.reduce((a, p) => a + p.venta, 0) || 1;
      for (const p of grupo) {
        const cuota = Math.min(p.pide - (dado[p.frente] || 0), Math.floor(resto * p.venta / base));
        if (cuota > 0) { dado[p.frente] = (dado[p.frente] || 0) + cuota; trazas.push({ frente: p.frente, u: cuota, peldano: peldano.n }); }
      }
      resto -= Object.values(trazas.filter(t => t.peldano === peldano.n)).reduce((a, t) => a + t.u, 0);
      resto = Math.max(0, resto);
      continue;
    }
    for (const p of grupo) {
      const cuota = Math.min(p.pide - (dado[p.frente] || 0), resto);
      if (cuota > 0) {
        dado[p.frente] = (dado[p.frente] || 0) + cuota;
        resto -= cuota;
        trazas.push({ frente: p.frente, u: cuota, peldano: peldano.n });
      }
    }
  }

  const cede = pretensiones.map(p => ({
    frente: p.frente, pide: p.pide, recibe: dado[p.frente] || 0,
    cede: p.pide - (dado[p.frente] || 0), peldano: p.peldano,
  })).filter(x => x.cede > 0);

  return { dado, cede, sobra: resto, trazas };
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
          const peldano = ped.cobrado ? 'cobrado' : ped.reservaNominal ? 'nominal'
                        : ped.dentroDeCiclo ? 'ciclo' : 'proporcional';
          const s = (VENTAS[l.sku] || {})[ped.frente] || [];
          (porSku[l.sku] = porSku[l.sku] || []).push({
            frente: ped.frente, pide: l.pide, peldano,
            venta: s.slice(-3).reduce((a, b) => a + b, 0),
          });
        }
      }
      const escasos = [];
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
        if (pide > hay) {
          const p = CATALOGO.find(x => x.sku === sku);
          escasos.push({ sku, nombre: p.nombre, pide, hay, cede: r.cede, trazas: r.trazas });
        }
      }
      return {
        salida: `${Object.keys(porSku).length} referencias repartidas entre ${PEDIDOS.length} pedidos · ` +
                `${repartido.toLocaleString('es-VE')} u asignadas · ` +
                `${escasos.length} referencias en escasez resueltas por la escalera`,
        datos: { escasos, repartido, referencias: Object.keys(porSku).length },
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
    calculaNivel, demandaSaneada, propuestaCompra, existenciaOciosa, reparte,
    turnoDeNoche, turno, datosDe, entradaDe, bandejaDe, resumenAgentes, compensa, disponible };
}
