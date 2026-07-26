/* ============================================================================
   LA TORRE — Modelo de la arquitectura de IA          · Fase 1 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   FUENTE ÚNICA de todo lo que la página dibuja. Ni una etiqueta ni una cifra
   escrita a mano en el HTML: si algo cambia, se cambia aquí y cambia en el
   dibujo, en los paneles y en el recorrido guiado a la vez.

   La regla que ordena este archivo: **cada raíz declara qué se rompe si
   falta**. Un diagrama de arquitectura que solo dice qué hay cada caja es un
   dibujo; uno que dice qué se cae sin ella es un argumento.

   ⚠️ Material interno del equipo consultor.
   ============================================================================ */

/* ══════════════════════════════════════════ LOS NIVELES DE LA TORRE

   Los nombres reutilizan el vocabulario ya publicado en la s12 del informe,
   para que la torre se lea como un zoom del mismo modelo y no como una
   segunda arquitectura que compite con la primera.                          */

const NIVELES = [
  {
    id: 'ingesta', n: 1,
    nombre: 'Ingesta',
    capa: 'el sistema nervioso',
    lema: 'recibe, valida el formato, y sella hora y origen',
    hace: [
      'Recibe por conector en vivo, por portal o por captura en el sistema.',
      'Valida que el archivo tenga la forma declarada — no que el dato sea cierto: eso es del piso de arriba.',
      'Sella cada registro con su hora y su origen, que es lo que después permite responder «¿de dónde salió esta cifra?».',
    ],
    /* Lo que aquí NO se hace, dicho a propósito: es donde un diagrama de
       arquitectura suele prometer de más. */
    noHace: 'No interpreta ni corrige. Un dato que entra mal, entra mal — y por eso existe el cedazo.',
    agentes: [
      { nombre: 'consolidador de venta', nivel: 2, que: 'junta la venta de los diez frentes y separa el cero por falta de existencia del cero por falta de demanda' },
    ],
  },
  {
    id: 'cimiento', n: 2,
    nombre: 'El dato certificado',
    capa: 'la fuente de la verdad',
    lema: 'una sola verdad de qué producto es, cuánto se vendió y a qué tasa',
    hace: [
      'Catálogo canónico: un producto, un identificador, y la lista de todos los nombres con que cada frente lo llama.',
      'Reglas de negocio con dueño, fecha y versión — esto no lo decide la máquina, lo decide una política.',
      'Tasas de cambio con su fecha y su fuente: no existe cifra sin moneda y sin tasa fechada.',
      'Demanda saneada: los meses en quiebre no se promedian como cero, porque eso hundiría la compra.',
    ],
    noHace: 'No decide nada. Solo garantiza que lo que decida el piso de arriba esté sumando peras con peras.',
    agentes: [
      { nombre: 'resolutor de alias', nivel: 2, que: 'reconcilia los nombres nuevos contra el catálogo por encima del 95 % de confianza' },
      { nombre: 'árbitro', nivel: 1, que: 'dictamina cuando dos pretensiones quieren las mismas unidades, y sube la decisión un nivel' },
    ],
  },
  {
    id: 'inteligencia', n: 3,
    nombre: 'Inteligencia',
    capa: 'el valor visible',
    lema: 'comprar contra lo que se vendió, no contra lo que se recuerda',
    hace: [
      'Reportería con una sola cifra por pregunta, y cada cifra con la pantalla donde se decide.',
      'Pronóstico de demanda por referencia y por frente, con la cobertura objetivo que fija compras.',
      'Propuesta de compra y de reposición, descontando lo que ya viene en camino.',
      'Reparto en escasez por una escalera de precedencia publicada, a prorrata dentro de cada escalón.',
      'Salud de inventario: qué está parado, qué sobra y qué se traslada en vez de comprarse.',
    ],
    noHace: 'No compra, no reparte y no despacha por su cuenta: prepara la decisión y la sube.',
    agentes: [
      { nombre: 'preparador de la mesa', nivel: 2, que: 'arma la mesa de compra del mes con su propuesta de cantidad y su porqué' },
      { nombre: 'sustitución por existencia', nivel: 3, que: 'recorta la compra de lo que ya existe parado en otro frente' },
      { nombre: 'repartidor', nivel: 3, que: 'reparte la mercancía y resuelve la escasez por la escalera' },
      { nombre: 'precalificador', nivel: 3, que: 'pasa en lote lo que cumple crédito, rotación y margen; sube solo la excepción' },
      { nombre: 'rebalanceo', nivel: 3, que: 'propone mover existencia parada a donde falta' },
    ],
  },
  {
    id: 'decision', n: 4,
    nombre: 'La decisión',
    capa: 'donde la gente lo vive',
    lema: 'nada sale de Kenex sin que una persona firme',
    hace: [
      'La bandeja de firma de cada rol, con lo que el agente dejó preparado y su porqué delante.',
      'El ámbito de firma por rol: un botón que este rol no puede firmar aparece apagado, nunca escondido.',
      'La bitácora, que se añade y no se corrige: deshacer emite el movimiento inverso y enlaza el par.',
      'El freno, que detiene a todos los agentes de una vez y deja rastro de quién lo accionó.',
    ],
    noHace: 'No hay excepción posible en el perímetro externo: escribir a un proveedor, a una naviera o a un cliente queda siempre redactado y nunca enviado solo.',
    agentes: [
      { nombre: 'redactor de la orden', nivel: 1, que: 'redacta la orden al proveedor en la plantilla aprobada — redactada, nunca enviada' },
      { nombre: 'perseguidor de documentos', nivel: 1, que: 'redacta el reclamo de la factura de flete que falta' },
    ],
  },
];

/* Los tres niveles de autonomía, con el verbo con que se leen. Es la misma
   gramática del prototipo: se lee como una frase, no como un permiso. */
const AUTONOMIA = {
  1: { verbo: 'preparé', que: 'lo dejó listo y no tiene efecto hasta que alguien lo toma' },
  2: { verbo: 'hice',    que: 'escritura interna y reversible, con aviso' },
  3: { verbo: 'tu firma', que: 'no se aplica sin una persona' },
};

/* ══════════════════════════════════════════ LAS RAÍCES

   Los doce sitios donde nace el dato. `via` dice cómo entra; `cadencia`, cada
   cuánto; `dueno`, quién responde por ella. Y `rompe` es la columna que
   convierte el dibujo en argumento.

   `hoy` describe cómo llega hoy — sin señalar a ninguna persona, que es
   condición de todo lo cliente-facing de este proyecto.                     */

const VIAS = {
  odoo:    { rotulo: 'conector en vivo', detalle: 'lectura y escritura contra el Odoo del país' },
  portal:  { rotulo: 'portal de reporte', detalle: 'cada frente carga su propio Excel y el sistema lo normaliza' },
  sistema: { rotulo: 'nace en el sistema', detalle: 'se captura aquí; no viene de ningún otro sitio' },
  externa: { rotulo: 'fuente externa', detalle: 'la produce un tercero y entra fechada' },
};

const RAICES = [
  {
    id: 'venta-tienda', nombre: 'Venta de tienda',
    dato: 'el sell-out real, unidad por unidad, de los países con operación propia',
    via: 'odoo', cadencia: 'evento', dueno: 'operación de cada país', nivel: 'ingesta',
    hoy: 'cada país lo consolida por su cuenta y lo manda en una hoja distinta',
    rompe: 'sin ella la demanda del grupo es un recuerdo: se compra contra lo que alguien cree que se vendió',
    grado: 2,
  },
  {
    id: 'sell-out-portal', nombre: 'Sell-out de frentes sin Odoo',
    dato: 'la venta de franquicias, socios y clientes mayores en países no propios',
    via: 'portal', cadencia: 'quincenal a mensual', dueno: 'gerencia comercial', nivel: 'ingesta',
    hoy: 'llega por correo, con un formato distinto por frente y nombres de producto que no coinciden',
    rompe: 'siete de cada diez frentes desaparecen de la demanda, y la compra se calcula sobre la mitad del negocio',
    grado: 3,
  },
  {
    id: 'pedido-mayor', nombre: 'Pedido de venta al mayor',
    dato: 'lo que cada cliente mayor pide: referencia, cantidad y fecha',
    via: 'sistema', cadencia: 'evento', dueno: 'gerencia comercial', nivel: 'ingesta',
    hoy: 'se toma por mensajería y se transcribe a una hoja de cálculo',
    rompe: 'la línea que no se puede atender se borra, y con ella el rastro de que alguien la quiso',
    grado: 3,
  },
  {
    id: 'compra-internacional', nombre: 'Compra internacional',
    dato: 'qué se pidió a la marca representada y a cada fábrica, y contra qué techo',
    via: 'sistema', cadencia: 'mensual · el ciclo de compra', dueno: 'dirección de compras', nivel: 'ingesta',
    hoy: 'una hoja de cálculo que viaja por correo y de la que existen varias versiones a la vez',
    rompe: 'no hay forma de comparar lo que se pidió con lo que se recibió ni con lo que se vendió',
    grado: 3,
  },
  {
    id: 'recepcion', nombre: 'Recepción en Colón',
    dato: 'las unidades que de verdad llegaron y dónde quedaron ubicadas',
    via: 'sistema', cadencia: 'evento · por contenedor', dueno: 'operaciones', nivel: 'ingesta',
    hoy: 'conteo en papel que después alguien pasa a un archivo',
    rompe: 'la existencia del hub no existe como dato, y todo el reparto se vuelve una negociación',
    grado: 2,
  },
  {
    id: 'documentos', nombre: 'Documentos del embarque',
    dato: 'factura de la naviera, flete y gastos que forman el costo en destino',
    via: 'externa', cadencia: 'evento · con retraso', dueno: 'operaciones y finanzas', nivel: 'ingesta',
    hoy: 'llegan tarde y por correo; el costo se estima mientras tanto y casi nunca se corrige',
    rompe: 'el costo en destino no cierra — y sin costo cierto no hay margen cierto ni próxima compra defendible',
    grado: 3,
  },
  {
    id: 'traslados', nombre: 'Traslados y movimientos',
    dato: 'qué se movió entre almacenes, cuándo y por qué',
    via: 'sistema', cadencia: 'evento', dueno: 'operaciones', nivel: 'ingesta',
    hoy: 'se acuerda por teléfono y se registra después, si se registra',
    rompe: 'se compra afuera lo que ya se tiene parado adentro',
    grado: 2,
  },
  {
    id: 'producto', nombre: 'Desarrollo de producto',
    dato: 'candidatos, muestras, pruebas y la decisión de graduar al catálogo',
    via: 'sistema', cadencia: 'evento', dueno: 'desarrollo de producto', nivel: 'cimiento',
    hoy: 'vive en conversaciones y en muestras físicas; no hay registro de cuánto lleva parado un candidato',
    rompe: 'el catálogo crece sin criterio, y se compra lo que nunca se probó',
    grado: 3,
  },
  {
    id: 'fabricas', nombre: 'Fábricas y proveedores',
    dato: 'pedido mínimo, plazo, esquema de pago y si cumplen lo que prometen',
    via: 'sistema', cadencia: 'mensual', dueno: 'dirección de compras', nivel: 'cimiento',
    hoy: 'está en la cabeza de quien negocia; el incumplimiento se recuerda, no se mide',
    rompe: 'se negocia con una queja recurrente en vez de con un historial',
    grado: 2,
  },
  {
    id: 'tasas', nombre: 'Tasas de cambio',
    dato: 'la tasa de cada moneda, con su fecha y su fuente',
    via: 'externa', cadencia: 'diaria', dueno: 'finanzas', nivel: 'cimiento',
    hoy: 'se aplica la que cada quien tiene a mano, sin dejar constancia de cuál fue',
    rompe: 'ninguna cifra del grupo es comparable con otra, y nadie puede decir con qué tasa se calculó',
    grado: 3,
  },
  {
    id: 'credito', nombre: 'Crédito y saldo',
    dato: 'cupo, saldo y días de atraso de cada frente',
    via: 'odoo', cadencia: 'diaria', dueno: 'finanzas', nivel: 'cimiento',
    hoy: 'se consulta al momento de despachar, cuando ya se prometió',
    rompe: 'se despacha a quien no debería, y el examen de crédito llega tarde',
    grado: 2,
  },
  {
    id: 'reglas', nombre: 'Reglas de negocio',
    dato: 'cobertura objetivo, techo de compra, umbrales y cuotas — con dueño y versión',
    via: 'sistema', cadencia: 'cuando la cambia su dueño', dueno: 'cada función responsable', nivel: 'cimiento',
    hoy: 'no están escritas: son criterio personal, y cambian con quien esté ese día',
    rompe: 'las decisiones vuelven a depender de quién las tome, que es el hallazgo central del diagnóstico',
    grado: 3,
  },
];

/* ══════════════════════════════════════════ LO QUE BAJA

   La mitad que convierte la torre en sistema operativo. Sin esto sería un
   tablero: sube dato, salen gráficos, y nadie hace nada distinto el lunes.  */

const BAJADAS = [
  {
    id: 'orden-proveedor', desde: 'decision', hacia: 'compra-internacional',
    que: 'La orden de compra, en la plantilla que espera el proveedor',
    nota: 'Redactada por el agente, enviada por una persona. Sin excepción posible.',
  },
  {
    id: 'asignacion', desde: 'decision', hacia: 'venta-tienda',
    que: 'La asignación de mercancía, escrita en el Odoo de cada país propio',
    nota: 'La transferencia al almacén del frente se escribe sola; lo que se asignó lo firmó alguien.',
  },
  {
    id: 'disponibilidad', desde: 'decision', hacia: 'sell-out-portal',
    que: 'La disponibilidad publicada a cada socio',
    nota: 'En cantidad exacta o en rango, según la política acordada con ese frente.',
  },
  {
    id: 'pedido-confirmado', desde: 'decision', hacia: 'pedido-mayor',
    que: 'El pedido confirmado que baja al cliente mayor como orden lista para facturar',
    nota: 'Y consume su cupo de crédito en el acto, no cuando alguien se acuerde.',
  },
  {
    id: 'reclamo-flete', desde: 'decision', hacia: 'documentos',
    que: 'El reclamo del documento de flete que falta',
    nota: 'Redactado con el detalle del embarque. Sale con el nombre de una persona.',
  },
  {
    id: 'traslado-firmado', desde: 'decision', hacia: 'traslados',
    que: 'La orden de traslado entre almacenes',
    nota: 'Con lo que cuesta moverlo y la venta que desbloquea, para poder decidir con las dos cifras.',
  },
];

/* ══════════════════════════════════════════ EL CEDAZO

   Lo que no pasa de la ingesta al dato certificado. Es la pieza que impide
   que la torre sea propaganda.                                             */

const CEDAZO = {
  titulo: 'El cedazo',
  lema: 'lo que no se puede certificar no sube',
  criterios: [
    'Una referencia que no se reconoce contra el catálogo por encima del umbral de confianza.',
    'Un archivo cuyo formato no coincide con el declarado por ese frente.',
    'Una cifra en una moneda cuya tasa está vencida — sube, pero marcada.',
    'Un movimiento que pretende unidades ya reservadas por otro.',
  ],
  destino: 'Cola de excepciones, con sus tres mejores candidatas y un dueño que la resuelve.',
  nota: 'Una torre donde todo sube es propaganda. Que algo se quede abajo, con nombre y dueño, es lo que la hace creíble.',
};

/* ══════════════════════════════════════════ LOS CUATRO NÚMEROS

   Los que la Junta debe retener, y que el pie de la página repite.          */

const NUMEROS = [
  { v: '~400', r: 'personas en el grupo' },
  { v: '12', r: 'dependencias críticas de una sola persona' },
  { v: '22/104/260', r: 'procesos, procedimientos y tareas' },
  { v: '52', r: 'proyectos con 3 PM' },
];

/* disponible para la comprobación desde Node */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NIVELES, AUTONOMIA, VIAS, RAICES, BAJADAS, CEDAZO, NUMEROS };
}
