/* ============================================================================
   ESTRUCTURA ORGANIZATIVA TO-BE — FUENTE ÚNICA (Fase 2, ruta #/estructura)
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   Sale de la sesión de trabajo del equipo consultor del 26-sep-2026
   (Clemencia Abad, Gabriel Montiel, Josué Bonilla) y del boceto en papel de esa
   sesión, contrastados con el borrador de la sección 4.8 del informe de Fase 1
   (informe/fase1/organigrama-propuesto-datos.js) y con sus siete principios.
   Ajustada con los acuerdos de la sesión con la Presidencia del 05-oct-2026
   (Bernardo y Ricardo Roizental, María Elvira Sabal): la compra pasa a
   Compras y Cadena de Suministro, Desarrollo de Producto a la antigua Investigación y Desarrollo, que pasa a llamarse Innovación y Desarrollo de Productos,
   Proyectos (PMO) sale de Desarrollo Corporativo y pasa a ser dirección de staff, Finanzas gana una gerencia corporativa, y el
   Consejo de Familia va con los comités, como instancia de cogobierno.
   Revisión del 07-oct-2026: Gobierno de IA sale de la dirección de tecnología y
   pasa a ser unidad de la Presidencia, sobre su línea y del lado opuesto a la
   Consultoría Jurídica (lado:'izq'); la dirección queda como Tecnología,
   Gobernanza y Riesgo, sin gerencia corporativa ni coordinaciones: las
   gerencias de TI de cada país le reportan directo. Kenex USA deja Compras y
   Cadena de Suministro y cuelga de la línea de Innovación y Desarrollo de
   Productos, con nivel de gerencia corporativa.
   Revisión del 08-oct-2026: Kenex USA deja de ser unidad. Estados Unidos (US)
   entra como país de alcance parcial: Isabella Roizental queda como gerencia
   país de Operaciones y Logística y de E-commerce, la gerencia país nueva
   (VE: Jesmir Flores). La gerencia de unidad de negocio E-commerce pasa a Clara
   Arosemena, que sustituyó a Patrick Corujo en septiembre (SC-06, SC-13), y
   Patrick queda en una nueva gerencia de unidad de negocio de Postventa.

   Lo pinta estructura-render.js. Editar la estructura = editar SOLO este
   archivo: el dibujo, el panel de detalle y las premisas se derivan de aquí.

   Esquema de un nodo:
     id · n (denominación) · nivel ('n2' gerencia corporativa | 'n3' país)
     ocupante: {nombre, estado, nota}            — unidad de una sola cabeza
     paises:   {PA|VE|CO|US: {nombre, estado, cargo}} — unidad que se replica por país
     funciones: [...]  · interna: [...] (lo que cuelga dentro, sin dibujar)
     nota: texto de diseño · hijos: [...] (solo gerencias corporativas)
   Estados del ocupante: ver ESTADOS.

   ⚠ Convenciones del informe: «Kenex» con una sola n; nada de salarios,
   nóminas ni sensibilidades de la discusión interna — esto lo lee la Junta.
   Los nombres se escriben como figuran en el censo de personal (Supabase).
   ============================================================================ */
window.ESTRUCTURA_TOBE = {
  corte: '08-oct-2026',
  titulo: 'Estructura organizativa To-Be',
  bajada: 'Borrador del equipo consultor para validar con el liderazgo. Tres niveles: direcciones corporativas, gerencias corporativas y gerencias país. Lo corporativo fija la línea rectora; cada país la ejecuta con su marco normativo y sus recursos.',
  // Rótulo del contenedor del staff (acuerdo del 05-oct: apoya al Comité Directivo, no solo a la Presidencia)
  rotuloStaff: 'apoyo al Comité Directivo',

  NIVELES: [
    {id:'n1', n:'Direcciones corporativas', d:'Una por gran función del grupo. Fijan la línea rectora, verifican y orientan; su operatividad debe ser baja.'},
    {id:'n2', n:'Gerencias corporativas',   d:'Nivel intermedio con alcance regional: especialidades que se gobiernan una sola vez para todo el grupo.'},
    {id:'n3', n:'Gerencias país',           d:'Espejo de la línea rectora en cada operación propia (Panamá, Venezuela, Colombia): ejecutan con el marco normativo y los recursos del país. Estados Unidos (Kenex USA) tiene solo las posiciones que su operación necesita.'}
  ],

  PAISES: [
    {id:'PA', n:'Panamá'},
    {id:'VE', n:'Venezuela'},
    {id:'CO', n:'Colombia'},
    // parcial: no replica el espejo completo; solo aparece donde una unidad la nombra
    {id:'US', n:'Estados Unidos', parcial:true}
  ],

  ESTADOS: {
    propuesto:  {n:'Ocupante propuesto',          d:'Persona que el equipo consultor propone para la posición.'},
    validar:    {n:'Propuesto · por validar',     d:'Propuesta que se conversa con la Presidencia antes de presentarla.'},
    actual:     {n:'Titular actual',              d:'Quien ocupa hoy el cargo equivalente según el censo de personal; la propuesta no lo cambia.'},
    vacante:    {n:'Vacante',                     d:'Posición que la estructura necesita y hoy no existe o no tiene titular.'},
    pordefinir: {n:'Por definir',                 d:'Posición con titular aún abierto a la validación.'}
  },

  /* ------------------------------------------------------------- la cima */
  CEO: {
    id:'ceo', n:'Presidencia · CEO',
    ocupante:{nombre:'Bernardo Roizental', estado:'actual'},
    funciones:[
      'Conduce el grupo con siete direcciones corporativas como reportes directos —tres unidades de negocio y cuatro de staff—, en el límite del tramo de 4 a 7 que fija el principio 3.',
      'Tiene como unidades propias la Asistencia Ejecutiva a la Presidencia, la Consultoría Jurídica y el Gobierno de IA.',
      'Preside los órganos de cogobierno o delega su convocatoria en la dirección que corresponda.'
    ]
  },
  GOBIERNO: [
    {id:'junta',    n:'Junta Directiva', d:'Órgano de gobierno: aprueba el rumbo y recibe el cuadro de indicadores de las direcciones. No es línea de mando.'},
  ],
  // Consejos: instancias de cogobierno de la familia propietaria. Sin línea hacia la
  // Presidencia: se muestran con los comités, en el flotante de cogobierno.
  CONSEJOS: [
    {id:'familia', n:'Consejo de Familia',
     proposito:'Instancia de cogobierno de la familia propietaria. Decide sobre la relación entre la familia y la empresa: quién entra a trabajar, con qué reglas y cómo se informa a la familia de la marcha del grupo.',
     integrantes:'Los cuatro hermanos de la familia propietaria.',
     nota:'No es línea de mando: no se conecta con la Presidencia ni con ninguna dirección. Por eso se muestra con los comités y no en la cima del organigrama.'}
  ],
  STAFF: [
    {id:'comunicaciones', n:'Asistencia Ejecutiva a la Presidencia', nivel:'staff', etiqueta:'Unidad de la Presidencia',
     ocupante:{nombre:'Carmela Iribarren', estado:'actual', nota:'Hoy es la asistente ejecutiva de la Presidencia.'},
     funciones:[
       'Asiste a la Presidencia en su agenda, su despacho y el seguimiento de sus decisiones con las direcciones.',
       'Entre los procesos que atiende están las comunicaciones corporativas: es el canal único de comunicación institucional hacia toda la organización.',
       'Recibe de cada dirección qué quiere comunicar (proyectos, talento, cambios) y lo emite con una sola voz.'
     ],
     nota:'Antes se llamaba Comunicaciones Internas. Va junto a la Presidencia —no al nivel de las direcciones— porque la asiste directamente y sirve a todas las áreas.'},
    {id:'juridica', n:'Consultoría Jurídica', nivel:'staff', etiqueta:'', enLinea:true,
     ocupante:{nombre:'Bernie Weininger', estado:'actual', nota:'Director de la Junta Directiva. Se suma un abogado contratado a tiempo parcial.'},
     funciones:[
       'Una oficina corporativa con visión de todos los países: contratos con marcas y proveedores, gestión de los bufetes locales.',
       'Un responsable y su asistencia; el trabajo especializado por país se contrata.'
     ],
     nota:'Depende directamente de la Presidencia y cuelga de su línea, antes de las direcciones corporativas: no depende de ninguna dirección. Ya está cubierta.'},
    // lado:'izq' — sobre la línea de la Presidencia, del lado opuesto a la Consultoría Jurídica
    {id:'ia', n:'Gobierno de IA', nivel:'staff', etiqueta:'', enLinea:true, lado:'izq',
     ocupante:{nombre:'Vacante', estado:'vacante', nota:'Posición a la que se aspira: el perfil de gobierno del dato y de la IA aún no existe en el grupo.'},
     funciones:[
       'Fija los lineamientos de uso de la IA en todo el grupo y la política que los recoge.',
       'Lidera y convoca el Comité de Gobierno del Dato e IA, que decide qué dato es oficial y quién responde por él.',
       'Aprueba, con ese comité, los usos de la IA en los procesos y el nivel de autonomía de cada uno.',
       'Vela por que ningún agente trabaje sobre un dato sin certificar: el dato antes que el agente.'
     ],
     nota:'Antes era la dirección corporativa Gobierno de IA y TI. Se separa de la tecnología y pasa a la Presidencia, sobre su línea y del lado opuesto a la Consultoría Jurídica: así quien aprueba los usos de la IA no es quien los implanta, que es la Dirección de Tecnología, Gobernanza y Riesgo. Es la unidad de gobierno de IA que el proyecto comprometió desde el arranque.'}
  ],

  /* ------------------------------------------------------- las direcciones */
  DIRECCIONES: [
    {
      id:'id', n:'Innovación y Desarrollo de Productos', caracter:'negocio',
      ocupante:{nombre:'Alejandro Roizental', estado:'propuesto'},
      funciones:[
        'Donde empieza el producto: estudia el mercado, identifica productos y fábricas, y desarrolla y aprueba las muestras.',
        'Hoy está focalizada en Cubitt, la marca propia. En Casio, marca representada, el producto lo define la casa matriz.',
        'El negocio puede abrir dentro de ella niveles de gerencia —corporativos o por país— para las marcas y los productos que vengan. Por eso su denominación no lleva el nombre de ninguna marca.',
        'Entrega a Compras y Cadena de Suministro lo que hay que comprar, y a Mercadeo el producto listo para lanzar: concepto, público y posicionamiento.',
        'Decide la colección con Comercial, en el Comité Comercial.'
      ],
      nota:'Antes se llamaba Investigación y Desarrollo. Ya no compra: la compra de producto pasa a Compras y Cadena de Suministro. A cambio reúne lo que hace nacer un producto: la innovación y el desarrollo. La denominación recoge la innovación que planteó María Elvira Sabal en la reunión del 05-oct y no se ata a Cubitt, porque la dirección debe poder acoger marcas y productos futuros.',
      hijos:[
        {id:'producto', n:'Inteligencia de Mercado y Desarrollo de Productos', nivel:'n2',
         ocupante:{nombre:'Stephania Roizental', estado:'propuesto', nota:'Hoy lleva el desarrollo de producto junto con Alejandro Roizental.'},
         funciones:[
           'Inteligencia de mercado: tendencias, investigación de mercado y estudios de consumidor en todos los países, para saber qué mercado acepta un producto antes de desarrollarlo.',
           'Desarrollo de productos: ensambla el producto con el concepto de la marca —colores de temporada, lanzamientos, licencias con marcas—.',
           'Crea los códigos de producto y avisa a Comercial para abrir la preventa: es lo que desata los procesos de venta.',
           'Comparte con Mercadeo a quién y cómo vender cada producto, y lleva sus hallazgos al Comité Comercial.'
         ],
         nota:'Reúne en una sola gerencia lo que el mercado pide y el producto que se desarrolla para responderle. Antes, el desarrollo de producto estaba bajo Mercadeo y la inteligencia de mercado era un proceso que llevaba en persona la gerencia de Mercadeo. Queda en Innovación y Desarrollo de Productos, como pidió la Presidencia en la reunión del 05-oct.'},
        {id:'innotec', n:'Innovación y Tecnología de Productos', nivel:'n2',
         ocupante:{nombre:'Vacante', estado:'vacante', nota:'Posición vacante. Equivale a lo que en las corporaciones se denomina CTO (director de tecnología).'},
         funciones:[
           'Equivale al CTO de las corporaciones: lleva la tecnología de los productos del grupo.',
           'Evalúa tecnologías, componentes y plataformas nuevas, y define las especificaciones técnicas de cada desarrollo.',
           'Patrocina los proyectos de innovación de producto, de la idea al piloto, que gestiona la PMO.'
         ],
         nota:'Su campo es la tecnología del producto, no la del grupo: la tecnología de información la lleva la Dirección de Tecnología, Gobernanza y Riesgo. Va en Innovación y Desarrollo de Productos porque ahí nace el producto y ahí se decide qué tecnología lleva.'}
      ]
    },
    {
      id:'opl', n:'Compras y Cadena de Suministro', caracter:'negocio',
      ocupante:{nombre:'Roberto Roizental', estado:'propuesto'},
      funciones:[
        'Dueño de la mercancía de punta a punta: compra a fábrica, importación, almacén principal y distribución a todos los países.',
        'Concentra toda la compra de producto de todas las marcas —Casio, Cubitt y las que vengan—, repuestos incluidos.',
        'Fija cómo debe funcionar una bodega y replica en las demás las prácticas que ya probó en Colón.'
      ],
      nota:'Comprar es el primer paso de la cadena, como en las empresas de consumo masivo y de retail: por eso la compra deja la antigua Investigación y Desarrollo y se une a la logística. Roberto Roizental, que hoy lleva la compra de Casio, encabeza la dirección; la operación logística queda en la gerencia corporativa de Operaciones y Logística. La compra interna de la organización (servicios, insumos) sigue en Finanzas y Negocios. La denominación deja a la vista que la compra es el primer paso de la cadena; en la reunión se había hablado de «Supply Chain» y de «Compras y Logística».',
      hijos:[
        {id:'compras', n:'Compras', nivel:'n2',
         ocupante:{nombre:'Por definir', estado:'pordefinir'},
         funciones:[
           'Compra estratégica de todas las marcas: la hoja de pedido y la asignación con Casio, las órdenes a fábrica de Cubitt y los repuestos.',
           'Negocia las condiciones y sigue cada orden hasta el embarque.'
         ],
         nota:'Separa la decisión de compra de la operación logística, dentro de la misma dirección. Tiene una coordinación por marca, porque Casio y Cubitt compran con ritmos y reglas distintos: la de Casio con la casa matriz, la de Cubitt con las fábricas.',
         hijos:[
           {id:'compcasio', n:'Compras Casio', nivel:'ccorp',
            ocupante:{nombre:'Por definir', estado:'pordefinir'},
            funciones:[
              'La compra de catálogo de Casio, marca representada: la hoja de pedido y la asignación que define la casa matriz.',
              'Los repuestos de la marca.',
              'Sigue cada orden hasta el embarque.'
            ]},
           {id:'compcubitt', n:'Compras Cubitt', nivel:'ccorp',
            ocupante:{nombre:'Por definir', estado:'pordefinir'},
            funciones:[
              'La compra de Cubitt, marca propia: las órdenes a las fábricas, con las muestras y especificaciones que aprueba Innovación y Desarrollo de Productos.',
              'Los repuestos de la marca.',
              'Sigue cada orden en producción y hasta el embarque.'
            ]}
         ]},
        {id:'oplcorp', n:'Operaciones y Logística', nivel:'n2',
         ocupante:{nombre:'Fernando Alvarado', estado:'propuesto'},
         funciones:[
           'Dueño único de la promesa de entrega: importación, almacén principal y distribución a todos los países.',
           'Absorbe el control de inventario, que en julio era una dirección aparte.'
         ],
         nota:'La visión corporativa es de barco, almacén principal y distribución. En cada país hace falta una gerencia que atienda los permisos, la aduana y la bodega local: desde lo corporativo no se puede gobernar la bodega de otro país.',
         hijos:[
           {id:'oplpais', n:'Operaciones y Logística', nivel:'n3',
            paises:{
              PA:{nombre:'Fernando Alvarado', estado:'propuesto', cargo:'Gerencia', nota:'La lleva el mismo gerente corporativo.'},
              VE:{nombre:'Elvis Badillo', estado:'propuesto', cargo:'Gerencia'},
              CO:{nombre:'Brayan Muñoz', estado:'actual', cargo:'Coordinación'},
              US:{nombre:'Isabella Roizental', estado:'propuesto', cargo:'Gerencia',
                  nota:'La operación de Kenex USA desde Miami: el almacén, los envíos a los almacenes de Amazon, las devoluciones y el servicio al cliente. Lleva siete años al frente sin una denominación formal de cargo; formalizarla le permite delegar lo operativo y crecer. Fuentes: E-30, E-06 y E-01.'}
            },
            funciones:['Operación de bodega, despacho e importación del país.'],
            interna:[
              'Jefatura de Despacho: bodega, movimiento y despacho, con supervisión de entrada y salida.',
              'Jefatura de Tráfico: la importación — contenedores, liquidaciones y permisos.',
              'Supervisores, operarios, ayudantes y choferes. Tres perfiles bastan: gerente, jefe o supervisor, operario.'
            ]}
         ]}
      ]
    },
    {
      id:'comercial', n:'Comercial', caracter:'negocio',
      ocupante:{nombre:'Andrés Roizental', estado:'propuesto', nota:'La propuesta formaliza el alcance que ya ejerce de hecho: la visión que une mercadeo y venta.'},
      funciones:[
        'Una sola cabeza para la venta y para la demanda que la produce: dirige Ventas y Mercadeo.',
        'Distribuye la venta en sus canales —tienda, mayor y comercio electrónico— y responde por el resultado de ambas marcas.',
        'Decide qué tiendas se abren; la PMO gestiona cada apertura.'
      ],
      nota:'Cambio central frente a julio: Mercadeo deja de ser una gerencia aparte («Experiencia de Marcas») y entra bajo Comercial, porque hoy trabaja sin ver el impacto de sus campañas en la venta. Se evaluó sacarlo de Comercial y quedó dentro. La marca deja de partir la línea comercial: ventas se organiza por canal, y la separación por marca vive en la compra, en el desarrollo de producto y en coordinaciones de mercadeo. Puede denominarse Vicepresidencia; lo decide el cliente.',
      hijos:[
        {id:'ventas', n:'Ventas', nivel:'n2',
         ocupante:{nombre:'Handani Mora', estado:'propuesto'},
         funciones:[
           'Línea rectora de todos los canales de venta y de la postventa.',
           'Su operatividad debe ser baja: hoy está absorbido por tareas de tienda —como formar a los encargados— que corresponden a las gerencias país.'
         ],
         hijos:[
           {id:'mayorcorp', n:'Ventas al Mayor', nivel:'gun',
            ocupante:{nombre:'Por definir', estado:'pordefinir'},
            funciones:[
              'Atiende los mercados sin operación propia.',
              'Cartera de mayoristas de los países donde el grupo no opera (Centroamérica, Caribe y el resto de la región), consolidada y despachada desde Panamá.',
              'Fija la línea rectora de la venta al mayor para todo el grupo.'
            ],
            nota:'Se separa de la venta al mayor de cada país, que atiende a los mayoristas locales. La frontera entre las dos se acuerda con la Dirección Comercial.'},
           {id:'ecommerce', n:'E-commerce', nivel:'gun',
            ocupante:{nombre:'Clara Arosemena', estado:'actual', nota:'Nombrada gerente regional de e-commerce en septiembre de 2026, en sustitución de Patrick Corujo, que pasa a soporte técnico y servicio al cliente. Venía de Mercadeo, donde lideraba la pauta digital. Fuentes: E-24, SC-06 y SC-13.'},
            funciones:[
              'Línea rectora de la página web y los canales digitales de venta de todo el grupo: web propia, marketplaces y ventas en vivo.',
              'Las gerencias de E-commerce de cada país ejecutan su línea.'
            ]},
           {id:'postventacorp', n:'Postventa', nivel:'gun',
            ocupante:{nombre:'Patrick Corujo', estado:'actual', nota:'Hoy es el gerente de soporte técnico y servicio al cliente; dejó E-commerce en septiembre de 2026 para concentrarse en esta área. Fuentes: E-24, SC-06 y E-58.'},
            funciones:[
              'Línea rectora de la postventa de todo el grupo: garantías, devoluciones, servicio técnico y atención al cliente, con criterios comunes para todos los países.',
              'Queda bajo Ventas porque cada garantía o descuento que concede toca el margen de la venta.'
            ],
            nota:'Separa la postventa del comercio electrónico, como se acordó al mover a Clara Arosemena a E-commerce. Las gerencias de Postventa de cada país ejecutan su línea.'},
           {id:'mayorpais', n:'Ventas al Mayor', nivel:'n3',
            paises:{
              PA:{nombre:'Edumar Escalona', estado:'actual'},
              VE:{nombre:'Andrés Márquez', estado:'actual'},
              CO:{nombre:'Santiago Ramírez', estado:'actual'}
            },
            funciones:['Mayoristas y cadenas del país donde el grupo tiene operación propia.']},
           {id:'retail', n:'Retail · tiendas', nivel:'n3',
            paises:{
              PA:{nombre:'Blas García', estado:'propuesto'},
              VE:{nombre:'Por definir', estado:'pordefinir'},
              CO:{nombre:'Por definir', estado:'pordefinir'}
            },
            funciones:['Las tiendas del país: encargados, vendedores, cajeros. Cada gerencia estructura su equipo de tienda.']},
           {id:'ecommercepais', n:'E-commerce', nivel:'n3',
            paises:{
              VE:{nombre:'Jesmir Flores', estado:'actual', nota:'Hoy es la gerente de Ventas Web de Venezuela. Fuentes: E-16 y E-41.'},
              US:{nombre:'Isabella Roizental', estado:'propuesto',
                  nota:'La venta en línea de Kenex USA, que hoy lleva sin una denominación formal de cargo: los marketplaces de Estados Unidos —unos quince, de Amazon a Whatnot— y la web propia, con Shopify, las ventas en vivo, las promociones y la publicidad con las agencias que apoyan Amazon y la web. Fuentes: E-30, E-06 y E-01.'}
            },
            funciones:['La venta en línea del país: web propia, marketplaces, validación de pagos y despacho de los pedidos web, con la línea de la gerencia de E-commerce.']},
           {id:'postventa', n:'Postventa', nivel:'n3',
            paises:{
              PA:{nombre:'Por definir', estado:'pordefinir'},
              VE:{nombre:'Por definir', estado:'pordefinir'},
              CO:{nombre:'Por definir', estado:'pordefinir'}
            },
            funciones:['Garantías, devoluciones, servicio técnico y atención al cliente del país, con los criterios que fija la gerencia de Postventa.'],
            interna:['Relojeros y técnicos: cada gerencia estructura su equipo.']}
         ]},
        {id:'mercadeo', n:'Mercadeo', nivel:'n2',
         ocupante:{nombre:'Vacante', estado:'vacante', nota:'Posición clave: la gerencia corporativa anterior dejó el cargo.'},
         funciones:[
           'La mente de la marca en todos los países: concepto, lineamientos, calendario de lanzamientos.',
           'Recibe de Innovación y Desarrollo de Productos el producto listo para lanzar y define cómo se vende: campaña, canal y mensaje.',
           'Mantiene en casa el diseño gráfico y el video, y supervisa lo que se terceriza: la producción de material y las productoras.'
         ],
         nota:'Hoy mercadeo está sobredimensionado y la comunicación entre sus piezas —visual merchandising, contenido, desarrollo de producto— pasa por varias instancias a la vez. Se reordena en dos frentes: Experiencia del Cliente y Experiencia Digital. Desarrollo de Producto y la inteligencia de mercado pasan a Innovación y Desarrollo de Productos. Donde los ritmos de Casio y Cubitt lo exijan, se separan coordinaciones por marca, no gerencias.',
         hijos:[
           {id:'experiencia', n:'Experiencia del Cliente', nivel:'gun',
            ocupante:{nombre:'Reyna Barraza', estado:'propuesto'},
            funciones:[
              'La experiencia en vivo del cliente en la tienda propia, en la del mayorista y en los eventos.',
              'Absorbe el visual merchandising: diseño y montaje de tienda con las normas de la marca, hoy separado de mercadeo.',
              'Trabaja con Desarrollo Corporativo la cultura de marca hacia dentro: el cliente interno también vive la marca.'
            ]},
           {id:'digital', n:'Experiencia Digital', nivel:'gun',
            ocupante:{nombre:'Anabel Roizental', estado:'propuesto'},
            funciones:['Contenido, redes sociales y página web de todas las marcas y países, con una alineación visual única; supervisa a los terceros que los producen.']},
           {id:'mercadeopais', n:'Mercadeo', nivel:'n3',
            paises:{
              PA:{nombre:'Por definir', estado:'pordefinir'},
              VE:{nombre:'Valentina Abreu', estado:'actual'},
              CO:{nombre:'Por definir', estado:'pordefinir', cargo:'Coordinación'}
            },
            funciones:['Ejecución local, con el lenguaje de cada país: campañas y activaciones.'],
            interna:[
              'Verificación de tienda y visual en sitio: aperturas y montajes según la norma de la marca.',
              'Trafficker de campañas.',
              'Activaciones presenciales y eventos.'
            ]}
         ]}
      ]
    },
    {
      id:'finanzas', n:'Finanzas y Negocios', caracter:'staff',
      ocupante:{nombre:'Ricardo Roizental', estado:'propuesto'},
      funciones:[
        'Consolida la información financiera de todo el grupo, todas las marcas y todos los países.',
        'Lleva la relación con los bancos, las líneas de crédito y la colocación de las inversiones.',
        'Desarrolla negocios nuevos para el grupo.',
        'Incluye las compras internas de la organización (no las de producto).'
      ],
      nota:'La denominación suma el desarrollo de negocios a las finanzas corporativas. La conducción financiera del día a día es de la gerencia corporativa de Finanzas, que responde por los países.',
      hijos:[
        {id:'fincorp', n:'Finanzas', nivel:'n2',
         ocupante:{nombre:'Jaime González', estado:'propuesto', nota:'Sube desde la gerencia de Administración y Finanzas de Venezuela.'},
         funciones:[
           'Conduce las finanzas de todo el grupo: presupuesto, flujo de caja, pagos a fábrica y cierre consolidado.',
           'Las gerencias país de Administración y Finanzas le reportan.',
           'Prepara para el Comité de Finanzas y Riesgos lo que sube a la Junta Directiva y a la Presidencia.'
         ],
         nota:'Su relación directa con la Junta Directiva y con la Presidencia se mantiene, y se dibuja en el funcionamiento —el Comité de Finanzas y Riesgos—, no en la línea de mando: el organigrama muestra de quién depende cada unidad, no con quién despacha.',
         hijos:[
           {id:'finpais', n:'Administración y Finanzas', nivel:'n3',
            paises:{
              PA:{nombre:'Vacante', estado:'vacante'},
              VE:{nombre:'Por definir', estado:'pordefinir', nota:'Jaime González, que la ocupaba, sube a la gerencia corporativa.'},
              CO:{nombre:'Vacante', estado:'vacante'}
            },
            funciones:[
              'La operación financiera del país, con el marco fiscal local.',
              'Los servicios generales que sostienen sedes, tiendas y bodegas, a través de su coordinación.'
            ],
            interna:['Cuentas por pagar.', 'Cuentas por cobrar.', 'Tesorería y conciliación.', 'Asuntos fiscales.'],
            hijos:[
              // Única unidad con estructura interna dibujada: debe existir, con responsables definidos.
              {id:'ssgg', n:'Servicios Generales', nivel:'coord',
               paises:{
                 PA:{nombre:'Por confirmar', estado:'pordefinir', cargo:'Coordinación'},
                 VE:{nombre:'Williams Porras', estado:'actual', cargo:'Coordinación', nota:'Hoy ejerce como jefatura de Servicios Generales.'},
                 CO:{nombre:'Por confirmar', estado:'pordefinir', cargo:'Coordinación'}
               },
               funciones:[
                 'Mantenimiento de sedes, tiendas y bodegas, y los servicios que las sostienen.',
                 'Coordina a los contratistas de mantenimiento y limpieza y verifica su trabajo.'
               ],
               nota:'Es la única unidad de la que se dibuja la estructura interna, para resaltar que debe existir en cada país con un responsable claramente definido. Hoy no es así: en Venezuela la sostiene una sola persona y en Panamá la cubre Recursos Humanos sin un cargo propio. Queda dentro de Administración y Finanzas, que ya lleva la compra interna y los pagos de esos servicios; se planteó llevarla a Operaciones y queda por decidir.'}
            ]}
         ]}
      ]
    },
    {
      id:'desarrollo', n:'Desarrollo Corporativo', caracter:'staff',
      ocupante:{nombre:'María Elvira Sabal', estado:'actual', nota:'Se incorporó al grupo el 05-oct-2026 como responsable corporativa de talento.'},
      funciones:[
        'Gestiona el talento de todo el grupo y de los negocios que se le sumen: estructura, cargos, formación y cultura.',
        'Lidera los procesos de cambio organizacional; es la dueña operativa de la implantación de los manuales de proceso.',
        'Lidera y convoca el Comité de Calidad y Mejora Continua.'
      ],
      nota:'La denominación busca sacar la función del encasillamiento administrativo de «Recursos Humanos» (nómina y trámite); su titular puede proponer el nombre definitivo. Su primer foco es transformar la gestión del talento: por eso la PMO, que en el borrador anterior le reportaba, pasa a ser una dirección aparte. Patrocina los proyectos de transformación organizacional, que gestiona la PMO.',
      hijos:[
        {id:'formacion', n:'Formación · Universidad Corporativa', nivel:'n2',
         ocupante:{nombre:'Lilibeth Olivar', estado:'actual', nota:'Incorporada recientemente como líder regional de formación y desarrollo; opera desde Colombia.'},
         funciones:['Formación y desarrollo de competencias de todo el grupo, con el programa de la Universidad Cubitt.']},
        {id:'rrhh', n:'Recursos Humanos', nivel:'n3',
         paises:{
           PA:{nombre:'Nuria Asbhy', estado:'actual'},
           VE:{nombre:'Evelia Manzo', estado:'actual'},
           CO:{nombre:'Vacante', estado:'vacante'}
         },
         funciones:['Gestión del talento con el marco laboral de cada país: el especialista local que la normativa exige.'],
         interna:['Coordinaciones híbridas, no una por subespecialidad: evitar áreas separadas de nómina, desarrollo y compensación.']}
      ]
    },
    {
      id:'tgr', n:'Tecnología, Gobernanza y Riesgo', caracter:'staff',
      ocupante:{nombre:'Mariela Castro', estado:'validar', nota:'Era la propuesta para la gerencia corporativa de Tecnología, Gobernanza y Riesgo, que se suprime. Hoy es gerente de TI de Panamá; su paso a la dirección queda por validar.'},
      funciones:[
        'Conduce la tecnología de información de todos los países: las gerencias país de TI le reportan directamente.',
        'Conduce la gobernanza, el riesgo y el cumplimiento de la tecnología: los controles de acceso y de seguridad de la información, la continuidad y los respaldos, las licencias y los contratos con proveedores, y la protección de datos de cada país.',
        'Los sistemas del grupo —el Odoo de cada país, EBS y Lark—, sus configuraciones y su integración, para que el dato fluya entre áreas y países.',
        'Los desarrollos internos y la conducción de los desarrolladores externos; homologa los procesos de TI entre países.',
        'Implanta y opera los agentes que aprueba el Comité de Gobierno del Dato e IA, y le presenta su registro, sus riesgos y sus incidentes.'
      ],
      nota:'Antes era Gobierno de IA y TI, con una gerencia corporativa de Tecnología, Gobernanza y Riesgo y dos coordinaciones corporativas (Datos e IA, Sistemas y Desarrollo). La dirección toma el nombre y el alcance de esa gerencia y se suprime el nivel intermedio: lo que hacían las coordinaciones queda en la dirección y las gerencias de TI de cada país le reportan directo. La aprobación de los usos de la IA queda fuera, en el Gobierno de IA de la Presidencia, para que quien implanta un sistema o un agente no sea también quien lo aprueba.',
      hijos:[
        {id:'ti', n:'Tecnología de Información', nivel:'n3',
         paises:{
           PA:{nombre:'Por definir', estado:'pordefinir', cargo:'Gerencia', nota:'Mariela Castro, que la ocupaba, se propone para la dirección corporativa.'},
           VE:{nombre:'José Rafael Herrera', estado:'actual', cargo:'Coordinación'},
           CO:{nombre:'Vacante', estado:'vacante', cargo:'Coordinación'}
         },
         funciones:[
           'Redes, conexiones, equipos, sistemas y soporte de cada operación.',
           'Ejecuta en su país los lineamientos y los controles que fija la dirección.'
         ],
         nota:'Reporta directo a la dirección, sin gerencia corporativa intermedia. Lo que se gobierna una sola vez sube a la dirección; la operación queda en cada país. Donde la operación es menor (Colombia, y hoy Venezuela) basta una coordinación.'}
      ]
    },
    {
      id:'pmo', n:'PMO', caracter:'staff',
      ocupante:{nombre:'Ricardo Candanedo', estado:'propuesto', nota:'Hoy encabeza la PMO.'},
      funciones:[
        'Gobierna la cartera de proyectos de todo el grupo y la presenta al Comité Directivo.',
        'Es la oficina de método: fija cómo se gestiona un proyecto en toda la organización.',
        'Rinde cuentas a la Presidencia y al Comité Directivo.'
      ],
      nota:'Dirección de staff, junto a Finanzas y Negocios, Desarrollo Corporativo y Tecnología, Gobernanza y Riesgo, como pidió la Presidencia en la reunión del 05-oct. Es una ubicación de transición: hoy la cartera incluye tareas que, con las áreas más maduras, pasarán a cada una. Más adelante podría reportar a Desarrollo Corporativo o convertirse en una gerencia de innovación.',
      hijos:[
        {id:'pmocorp', n:'PMO', nivel:'n2',
         ocupante:{nombre:'Arani González', estado:'propuesto', nota:'Hoy es gerente de proyectos de la PMO y lleva los proyectos de Venezuela.'},
         funciones:[
           'Equipo de gerentes de proyecto que atiende a toda la corporación: aperturas, remodelaciones y cierres de tienda; proyectos de innovación de producto; proyectos de transformación organizacional.',
           'En cada apertura coordina a quienes intervienen: Servicios Generales en la obra, Compras y Cadena de Suministro en la mercancía inicial y el mobiliario, Experiencia del Cliente en el montaje, TI en los sistemas y Recursos Humanos en el personal.',
           'Distribuye a los gerentes de proyecto según la demanda; en los picos subcontrata por proyecto, con principio y fin.'
         ],
         nota:'Un solo equipo generalista para todos los países, no una gerencia por país ni alas fijas por tipo de proyecto: así no quedan capacidades ociosas entre picos.'}
      ]
    }
  ],

  /* ---------------------------------------------------- órganos de cogobierno */
  // Los integrantes son ids de nodo; '@direcciones'
  // significa todas las direcciones corporativas. Un id de gerencia país lo incluye
  // en cada uno de los países.
  COMITES: [
    {id:'c-cal', n:'Comité de Calidad y Mejora Continua', lidera:'desarrollo',
     proposito:'Instancia de cogobierno orientada a la revisión de las políticas y los manuales de la gestión corporativa, con el cliente como fin último.',
     funciones:[
       'Revisa las políticas y los manuales de la gestión corporativa.',
       'Verifica los estándares de gestión y el cumplimiento de las mejores prácticas.',
       'Orienta esas prácticas hacia las certificaciones de calidad.'
     ],
     integrantes:['@direcciones', 'ventas', 'mercadeo', 'ti', 'rrhh', 'finpais']},
    {id:'c-dato', n:'Comité de Gobierno del Dato e IA', lidera:'ia',
     proposito:'Instancia de cogobierno que ordena el dato del grupo antes de ponerle agentes encima: el dato antes que el agente.',
     funciones:[
       'Decide qué dato es oficial y qué unidad responde por él.',
       'Fija los estándares de integración entre los sistemas de cada país para que el dato fluya.',
       'Aprueba los usos de IA en los procesos y el nivel de autonomía de cada uno.',
       'Vela por la privacidad, la protección de datos y la seguridad de la información.'
     ],
     integrantes:['desarrollo', 'id', 'opl', 'comercial', 'finanzas', 'ecommerce', 'digital', 'juridica', 'tgr', 'ti']},
    {id:'c-cultura', n:'Comité de Cultura Organizacional', lidera:'desarrollo',
     proposito:'Instancia de cogobierno que alinea la cultura interna con la promesa de las marcas.',
     funciones:[
       'Custodia los valores de la empresa familiar y los traduce en prácticas: incorporación, clima y orgullo de pertenencia.',
       'Hace de la formación el vehículo de la cultura, a través de la Universidad Corporativa.',
       'Conecta la experiencia del empleado con la experiencia del cliente: quien vive la marca por dentro la transmite por fuera.'
     ],
     integrantes:['desarrollo', 'comercial', 'formacion', 'mercadeo', 'experiencia', 'comunicaciones']},
    {id:'c-finanzas', n:'Comité de Finanzas y Riesgos', lidera:'finanzas',
     proposito:'Instancia ejecutiva de cogobierno sobre la caja y el riesgo del grupo. Prepara lo que sube a la Junta Directiva y al Comité de Finanzas del gobierno familiar, que se mantiene como instancia de gobierno.',
     funciones:[
       'Da seguimiento al presupuesto y al flujo de caja de todo el grupo.',
       'Gestiona las líneas de crédito y las inversiones.',
       'Da el visto bueno a los compromisos grandes, como las compras a fábrica.',
       'Revisa el crédito a clientes y la cobranza.',
       'Vigila el riesgo cambiario entre países: ninguna cifra sin moneda y sin tasa fechada.'
     ],
     integrantes:['finanzas', 'fincorp', 'comercial', 'id', 'opl', 'desarrollo', 'finpais', 'juridica']},
    {id:'c-comercial', n:'Comité Comercial', lidera:'comercial',
     proposito:'Instancia de cogobierno que formaliza las decisiones de producto y de venta que hoy toma un grupo informal, sin formato ni registro.',
     funciones:[
       'Decide la colección y los colores de temporada con Innovación y Desarrollo de Productos.',
       'Aprueba la compra a fábrica que compone Compras y Cadena de Suministro.',
       'Fija el calendario de lanzamientos, sin saturar a mercadeo.',
       'Reparte el producto entre canales y países.'
     ],
     integrantes:['comercial', 'ventas', 'mercadeo', 'producto', 'id', 'opl', 'compras']}
  ],

  /* --------------------------------------------------------- premisas */
  FUNCIONAMIENTO: [
    {t:'Lo corporativo fija la línea, el país la ejecuta',
     d:'Cada dirección corporativa dicta la línea rectora de su función para todo el grupo; la gerencia país es su espejo y la ejecuta con el marco normativo, los recursos y la operación de su país. Un corporativo recibe, verifica y orienta: si se hunde en la operación, deja de supervisar.'},
    {t:'La cadena de valor ordena las direcciones',
     d:'El negocio empieza con Innovación y Desarrollo de Productos, que estudia el mercado y desarrolla el producto; Compras y Cadena de Suministro lo compra, lo trae y lo almacena; Comercial lo vende —en tienda, al mayor y por la web— y atiende la postventa; Finanzas y Negocios, desde el staff, cobra y consolida.'},
    {t:'Staff y unidades de negocio',
     d:'Innovación y Desarrollo de Productos, Compras y Cadena de Suministro y Comercial son las unidades de negocio: la razón de ser del grupo, bajo la línea de mando de la Presidencia y en el orden de la cadena de valor, del producto a la postventa. Finanzas y Negocios, Desarrollo Corporativo, Tecnología, Gobernanza y Riesgo y la PMO son staff: sostienen a las tres y apoyan al Comité Directivo, sin mezclarse con ellas. La Asistencia Ejecutiva a la Presidencia, la Consultoría Jurídica y el Gobierno de IA son unidades de la propia Presidencia. En el organigrama cada grupo va en su contenedor: el staff a la izquierda de la línea que baja de la Presidencia y las unidades de negocio a la derecha; dentro de cada uno, un recuadro agrupa los niveles corporativos y debajo quedan las gerencias país.'},
    {t:'Equipos nucleares que se asignan por demanda',
     d:'La PMO y Consultoría Jurídica no se replican por país: son equipos centrales que se reparten según lo que pida la corporación, y que subcontratan en los picos.'},
    {t:'Cogobierno por comités',
     d:'Lo que atraviesa varias direcciones no se resuelve creando un área más, sino un comité que lidera y convoca una dirección con sus pares. Se formalizan cinco: Calidad y Mejora Continua, Gobierno del Dato e IA, Cultura Organizacional, Finanzas y Riesgos, y Comercial. A su lado está el Consejo de Familia, la instancia de cogobierno de la familia propietaria. La Junta Directiva es gobierno. Ninguno de ellos es línea de mando.'},
    {t:'Tercerizar lo que no es núcleo',
     d:'La producción de material y las productoras se contratan; el diseño gráfico y el video se quedan en casa, y la gerencia corporativa se asegura de que el tercero funcione. Así el tamaño de mercadeo deja de crecer con cada campaña.'}
  ],

  /* La lógica de conformación, sin unidades ni ocupantes: la vista «Capas»
     (#/estructura/capas) se presenta antes que el organigrama. Las capas
     n1–n3 toman su descripción de NIVELES y suman aquí lo propio. */
  CAPAS: {
    titulo: 'Capas de la estructura',
    bajada: 'Antes de las unidades y de quién ocupa cada cargo, la lógica con que se compone la estructura: siete capas, de quien decide el rumbo a quien opera, y dos piezas que las cruzan.',
    ejes: {baja:'Línea rectora', sube:'Ejecución e indicadores'},
    lista: [
      {id:'gobierno', n:'Gobierno', verbo:'Decide el rumbo',
       d:'La Junta Directiva. Aprueba el rumbo y recibe el cuadro de indicadores de las direcciones. Es gobierno, no línea de mando.'},
      {id:'presidencia', n:'Presidencia', verbo:'Conduce el grupo',
       d:'Una sola cabeza ejecutiva, con las direcciones corporativas como reportes directos en un tramo de 4 a 7. A su lado, la Asistencia Ejecutiva; sobre su línea, la Consultoría Jurídica a un lado y el Gobierno de IA al otro; y a los costados de la línea de mando, el staff: las direcciones de apoyo al Comité Directivo, que sirven a toda la organización.'},
      {id:'n1', nivel:'n1', verbo:'Fijan la línea rectora', escalon:'Director(a) corporativo(a)',
       d:'Aquí están las unidades de negocio, en el orden de la cadena de valor. El staff no comparte esta capa: apoya desde los costados de la Presidencia, en la capa anterior.'},
      {id:'n2', nivel:'n2', verbo:'Gobiernan una especialidad', escalon:'Gerente corporativo(a)',
       d:'Solo existen donde una especialidad conviene llevarla una vez para todos los países.'},
      {id:'gun', n:'Gerencias de unidad de negocio', verbo:'Llevan un canal o un frente', escalon:'Gerente de unidad de negocio',
       d:'Dentro de una gerencia corporativa del negocio, cada una lleva un canal de venta o un frente de mercadeo para todo el grupo. No se replican por país: la ejecución local sigue en las gerencias país.'},
      {id:'n3', nivel:'n3', verbo:'Ejecutan en cada país', escalon:'Gerente (país)',
       d:'Cada país reproduce el mismo espejo; abrir un país nuevo es replicarlo.'},
      {id:'equipos', n:'Equipos', verbo:'Operan', escalon:'De coordinador(a) a operario(a)',
       d:'Debajo de cada gerencia, los escalones de la estructura patrón, iguales en toda la organización. Cada unidad usa solo los que necesita.'}
    ],
    cruzan: [
      {n:'Consejos y comités de cogobierno',
       d:'Lo que atraviesa varias direcciones no crea un área más: lo resuelve un comité que lidera una dirección y convoca a sus pares. El Consejo de Familia acompaña a los comités como instancia de la familia propietaria, sin línea de mando.'},
      {n:'Equipos centrales por demanda',
       d:'Algunas especialidades no se replican por país. Un solo equipo se asigna según lo que pida la organización y se refuerza en los picos.'}
    ]
  },

  PATRON: [
    'Director(a) corporativo(a)',
    'Gerente corporativo(a)',
    'Gerente (país)',
    'Coordinador(a) / Jefe(a)',
    'Supervisor(a) / Especialista',
    'Analista III · II · I',
    'Auxiliar',
    'Operario(a)'
  ],

  PRINCIPIOS: [
    {n:'Especialización y división del trabajo',
     como:'Mercadeo se abre en dos frentes (experiencia del cliente, experiencia digital), Ventas se ordena por canal (tienda, mayor, comercio electrónico, postventa) y la compra se separa de la operación logística dentro de Compras y Cadena de Suministro. Cada responsable deja de saltar entre tareas dispares.',
     tension:'La PMO se diseña a propósito como un equipo generalista: la especialización está en el perfil de gerente de proyecto, no en el tipo de proyecto.'},
    {n:'Unidad de mando',
     como:'Cada gerencia país reporta en línea a una sola gerencia o dirección corporativa. Las figuras que hoy responden a varias instancias quedan con una sola línea de reporte: desarrollo de producto en Innovación y Desarrollo de Productos; contenido digital y visual merchandising en Mercadeo.',
     tension:'Falta decidir si hay una dirección general por país y qué relación tiene con las gerencias país (ver Pendientes).'},
    {n:'Optimización del tramo de control',
     como:'La Presidencia tiene siete direcciones corporativas —tres de negocio y cuatro de staff— y tres unidades de staff propias. Las direcciones quedan en el límite del rango de 4 a 7.',
     tension:'Con la PMO como dirección, el tramo de la Presidencia llega al máximo. Ventas concentra muchos reportes: dos frentes corporativos más tres gerencias en cada uno de tres países. Son los primeros a revisar si el tramo satura.'},
    {n:'Equilibrio entre autoridad y responsabilidad',
     como:'Comercial reúne venta y mercadeo: quien responde por el resultado controla también la demanda que lo produce. Postventa queda bajo Ventas: quien concede una garantía o un descuento responde por el margen. Quien compra responde también por que la mercancía llegue, y quien decide abrir una tienda, por que abra a tiempo.',
     tension:'La amplitud del cargo comercial exige un perfil muy completo, con visión regional de importación, marca y venta.'},
    {n:'Homogeneidad operativa',
     como:'Compras y Cadena de Suministro es el único dueño de la mercancía: compra, bodega, despacho, tráfico e inventario bajo una misma línea. Toda la compra de producto, de todas las marcas, se concentra ahí.',
     tension:'Innovación y Desarrollo de Productos decide qué producto y Compras y Cadena de Suministro lo compra: el traspaso entre los dos —qué, cuánto y cuándo— pasa por el Comité Comercial.'},
    {n:'Flexibilidad y adaptabilidad (híbrida)',
     como:'El modelo corporativo-país permite abrir un país nuevo replicando el espejo de gerencias. Compras y Cadena de Suministro compra cualquier marca con el mismo proceso, Innovación y Desarrollo de Productos puede abrir gerencias por marca o por producto, y mercadeo separa coordinaciones por marca solo cuando el ritmo lo exige.',
     tension:'Donde la operación es pequeña, la gerencia país se reduce a una coordinación, y eso debe quedar explícito en cada caso.'},
    {n:'Escalabilidad y canales claros',
     como:'Tres niveles de dirección antes de la coordinación y una estructura patrón de ocho escalones para toda la organización. La capa corporativa no duplica la operación del país.',
     tension:'Las gerencias de unidad de negocio dentro de Ventas (Ventas al Mayor, E-commerce, Postventa) y de Mercadeo (Experiencia del Cliente, Experiencia Digital) añaden un escalón en Comercial.'}
  ],

  CAMBIOS: {
    conserva:[
      'El gobierno —la Junta Directiva— como consulta y decisión, no como línea de mando.',
      'Una capa corporativa rectora que se despliega en cada país.',
      'La distinción visual entre staff y unidades de negocio, cada grupo en su contenedor: el staff a la izquierda de la línea de la Presidencia y el negocio a la derecha, en el orden de la cadena de valor, con sus niveles corporativos agrupados.',
      'Los comités transversales como forma de cogobierno: el de excelencia tecnológica e IA de julio se formaliza como Comité de Gobierno del Dato e IA, el Comité Comercial se mantiene, y se suman los de Calidad y Mejora Continua, Cultura Organizacional y Finanzas y Riesgos.',
      'Experiencia del Cliente y Experiencia Digital como frentes de mercadeo.',
      'Una unidad de gobierno de la IA.'
    ],
    cambia:[
      {antes:'Tres niveles: Dirección Ejecutiva → Gerencias corporativas → Direcciones.',
       ahora:'Direcciones corporativas → Gerencias corporativas → Gerencias país.',
       porque:'La denominación sube un escalón para que el título refleje el alcance: quien gobierna una función para todo el grupo es dirección; quien la ejecuta en un país es gerencia.'},
      {antes:'Talento Humano y PMO, cada una por su lado.',
       ahora:'Desarrollo Corporativo y PMO como dos direcciones de staff.',
       porque:'Desarrollo Corporativo da a la función de talento un alcance estratégico. La PMO queda aparte mientras esa función se transforma, para no dispersar su foco.'},
      {antes:'Transformación Tecnológica y Soporte, con la TI y la IA juntas.',
       ahora:'El Gobierno de IA como unidad de la Presidencia, sobre su línea; y Tecnología, Gobernanza y Riesgo como dirección corporativa, a la que reportan directo las gerencias de TI de cada país.',
       porque:'Quien aprueba los usos de la IA no es quien los implanta. La TI gana una cabeza regional que homologa sus procesos sin un nivel intermedio, y la operación de sistemas se queda cerca de cada país.'},
      {antes:'Experiencia de Marcas como gerencia híbrida separada de Comercial.',
       ahora:'Mercadeo dentro de Comercial.',
       porque:'Mercadeo hoy no ve el efecto de su trabajo en la venta. Con una sola cabeza comercial, la demanda y la venta responden al mismo objetivo.'},
      {antes:'Direcciones Comerciales Casio y Cubitt, con las ventas colgando de las marcas.',
       ahora:'Ventas organizadas por canal; la marca se separa en la compra y en el desarrollo de producto.',
       porque:'En la tienda y en el mayor la operación es la misma para las dos marcas. Donde la marca sí marca otro ritmo —la compra, el desarrollo, el calendario de mercadeo— se separa ahí.'},
      {antes:'La compra de producto repartida: cada marca compraba por su lado y los repuestos de una se compraban desde otra área.',
       ahora:'Toda la compra de producto en Compras y Cadena de Suministro, junto a la logística.',
       porque:'Comprar es el primer paso de la cadena: quien compra responde también por que la mercancía llegue.'},
      {antes:'Mantenimiento y Servicios como gerencia corporativa.',
       ahora:'Servicios Generales como coordinación de Administración y Finanzas en cada país.',
       porque:'El mantenimiento de sedes, tiendas y bodegas se resuelve en cada país, y es donde hoy falta un responsable. Al lado de quien compra y paga esos servicios, la función gana un dueño claro.'},
      {antes:'Dirección de Servicio Técnico.',
       ahora:'Postventa como gerencia de unidad de negocio bajo Ventas, con una gerencia por país.',
       porque:'Garantías, devoluciones y descuentos tocan el margen: tienen que verse desde la venta.'},
      {antes:'Dirección de Inventario, junto a la de Operaciones.',
       ahora:'Dentro de Operaciones y Logística.',
       porque:'Un solo doliente de la mercancía, desde que llega hasta que sale.'},
      {antes:'PMO con dos alas fijas (desarrollo de producto · transformación).',
       ahora:'Una dirección de PMO con un equipo de gerentes de proyecto asignado por demanda.',
       porque:'El mismo perfil atiende todas las clases de proyecto, y así no quedan capacidades ociosas en un ala mientras la otra se satura.'},
      {antes:'Sin estas piezas.',
       ahora:'Finanzas y Negocios con su gerencia corporativa de Finanzas, Consultoría Jurídica, Gobierno de IA, Formación y la Asistencia Ejecutiva a la Presidencia y el Consejo de Familia entre las instancias de cogobierno.',
       porque:'Funciones que hoy se reparten entre personas sin cargo, asesores externos o nadie, e instancias de la familia que existen pero no figuraban en la estructura.'}
    ]
  },

  PENDIENTES: [
    {t:'Gerencia corporativa de Compras', d:'Definir quién la ocupa, y quiénes llevan sus coordinaciones de Compras Casio y Compras Cubitt.'},
    {t:'Gerencias por marca en Innovación y Desarrollo de Productos', d:'Hoy la dirección trabaja para Cubitt. Cuando entre una marca o un producto nuevo, decidir si se abre una gerencia corporativa o una por país.'},
    {t:'Kenex USA', d:'Confirmar a Isabella Roizental en sus dos posiciones de Estados Unidos: las gerencias país de Operaciones y Logística y de E-commerce. Aclarar si en Estados Unidos se vende también Casio.'},
    {t:'Gerencia corporativa de Mercadeo', d:'Vacante clave: definir perfil y titular.'},
    {t:'Gobierno de IA y tecnología', d:'La unidad de Gobierno de IA, a contratar: definir su perfil. Confirmar a Mariela Castro en la Dirección de Tecnología, Gobernanza y Riesgo.'},
    {t:'PMO', d:'Confirmar a Ricardo Candanedo en la dirección y a Arani González en la gerencia corporativa.'},
    {t:'Innovación y Tecnología de Productos', d:'Vacante: definir el perfil de CTO de producto y si se contrata o se forma.'},
    {t:'Finanzas: línea y funcionamiento', d:'La gerencia corporativa de Finanzas depende de Finanzas y Negocios y despacha con la Junta y la Presidencia a través del Comité de Finanzas y Riesgos. Confirmar que así se lee.'},
    {t:'Dos comités de finanzas', d:'Deslindar el Comité de Finanzas y Riesgos (ejecutivo) del Comité de Finanzas del gobierno familiar, para que no decidan lo mismo dos veces.'},
    {t:'Servicios Generales', d:'Se planteó llevarla a Operaciones en cada país; hoy queda en Administración y Finanzas. Decidir.'},
    {t:'Calidad y Mejora Continua', d:'Se planteó una persona dedicada a partir de 2027, apoyada por Desarrollo Corporativo y la PMO. Hasta entonces la conduce el comité con el equipo actual.'},
    {t:'Ventas al mayor', d:'Trazar la frontera entre la cartera corporativa (países sin operación propia) y la de cada país, con quien encabece Comercial.'},
    {t:'Gerencias país por cubrir', d:'Administración y Finanzas en los tres países y TI en Panamá quedan abiertas al subir sus titulares a lo corporativo; decidir si alguien cubre más de un país mientras tanto.'},
    {t:'Gerencias país: denominación y cabeza', d:'Precisar si cada país tiene además una dirección general y cómo se relaciona con las gerencias país; y cuándo una gerencia país basta como coordinación.'},
    {t:'La familia en la estructura', d:'Para la reunión familiar del 23-oct, cada familiar que trabaja en el grupo debe verse en su caja. Falta revisar las posiciones de familiares que no ocupan una dirección ni una gerencia corporativa.'},
    {t:'Denominaciones', d:'Nombre definitivo de Desarrollo Corporativo, y si la primera línea se llama Dirección o Vicepresidencia.'},
    {t:'Plantilla actual frente a la propuesta', d:'Cerrar con el comparativo de posiciones: cuántas hay hoy, cuántas pide la estructura, dónde sobran y dónde faltan.'}
  ]
};
