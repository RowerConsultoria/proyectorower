/* ============================================================================
   ESTRUCTURA ORGANIZATIVA TO-BE — FUENTE ÚNICA (Fase 2, ruta #/estructura)
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   Sale de la sesión de trabajo del equipo consultor del 26-sep-2026
   (Clemencia Abad, Gabriel Montiel, Josué Bonilla) y del boceto en papel de esa
   sesión, contrastados con el borrador de la sección 4.8 del informe de Fase 1
   (informe/fase1/organigrama-propuesto-datos.js) y con sus siete principios.

   Lo pinta estructura-render.js. Editar la estructura = editar SOLO este
   archivo: el dibujo, el panel de detalle y las premisas se derivan de aquí.

   Esquema de un nodo:
     id · n (denominación) · nivel ('n2' gerencia corporativa | 'n3' país)
     ocupante: {nombre, estado, nota}            — unidad de una sola cabeza
     paises:   {PA|VE|CO: {nombre, estado, cargo}} — unidad que se replica por país
     funciones: [...]  · interna: [...] (lo que cuelga dentro, sin dibujar)
     nota: texto de diseño · hijos: [...] (solo gerencias corporativas)
   Estados del ocupante: ver ESTADOS.

   ⚠ Convenciones del informe: «Kenex» con una sola n; nada de salarios,
   nóminas ni sensibilidades de la discusión interna — esto lo lee la Junta.
   Los nombres se escriben como figuran en el censo de personal (Supabase).
   ============================================================================ */
window.ESTRUCTURA_TOBE = {
  corte: '26-sep-2026',
  titulo: 'Estructura organizativa To-Be',
  bajada: 'Borrador del equipo consultor para validar con el liderazgo. Tres niveles: direcciones corporativas, gerencias corporativas y gerencias país. Lo corporativo fija la línea rectora; cada país la ejecuta con su marco normativo y sus recursos.',

  NIVELES: [
    {id:'n1', n:'Direcciones corporativas', d:'Una por gran función del grupo. Fijan la línea rectora, verifican y orientan; su operatividad debe ser baja.'},
    {id:'n2', n:'Gerencias corporativas',   d:'Nivel intermedio con alcance regional: especialidades que se gobiernan una sola vez para todo el grupo.'},
    {id:'n3', n:'Gerencias país',           d:'Espejo de la línea rectora en cada operación propia (Panamá, Venezuela, Colombia): ejecutan con el marco normativo y los recursos del país.'}
  ],

  PAISES: [
    {id:'PA', n:'Panamá'},
    {id:'VE', n:'Venezuela'},
    {id:'CO', n:'Colombia'}
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
      'Conduce el grupo con seis direcciones corporativas como reportes directos, dentro del tramo de 4 a 7 que fija el principio 3.',
      'Preside los órganos de cogobierno o delega su convocatoria en la dirección que corresponda.'
    ]
  },
  GOBIERNO: [
    {id:'junta',   n:'Junta Directiva', d:'Órgano de gobierno: aprueba el rumbo y recibe el cuadro de indicadores de las direcciones. No es línea de mando.'},
    {id:'holding', n:'Holding · grupo familiar propietario', d:'Instancia de los accionistas (hoy «Comité Ejecutivo»). Decide sobre la relación entre la familia y la empresa. No es línea de mando.'}
  ],
  STAFF: [
    {id:'comunicaciones', n:'Comunicaciones Internas', nivel:'staff',
     ocupante:{nombre:'Por definir', estado:'pordefinir'},
     funciones:[
       'Canal único de comunicación institucional hacia toda la organización.',
       'Recibe de cada dirección qué quiere comunicar (proyectos, talento, cambios) y lo emite con una sola voz.'
     ],
     nota:'Hoy no existe: cada área comunica lo suyo. Se ubica como staff de la Presidencia —no al nivel de las direcciones— porque sirve a todas y no gestiona un proceso propio.'}
  ],

  /* ------------------------------------------------------- las direcciones */
  DIRECCIONES: [
    {
      id:'id', n:'Investigación y Desarrollo', caracter:'negocio',
      ocupante:{nombre:'Alejandro Roizental', estado:'propuesto'},
      funciones:[
        'Donde empieza el negocio: identifica productos en las fábricas de Asia, negocia con los proveedores, aprueba muestras y emite las órdenes de compra.',
        'Tiene la decisión final sobre los productos nuevos y concentra toda la compra de producto, repuestos incluidos.',
        'Trabaja de la mano con Mercadeo (Desarrollo de Producto) y con Comercial en la decisión de la colección.'
      ],
      nota:'Hoy es una persona con figuras flotantes a su alrededor y sin departamento. La compra de producto está dispersa —los repuestos de una marca se compran desde otra área— y aquí se ordena. La compra interna de la organización (servicios, insumos) no entra: va a Finanzas y Negocios. El know-how no depende de la marca: la línea está abierta a marcas futuras.',
      hijos:[
        {id:'casio', n:'Línea Casio', nivel:'n2',
         ocupante:{nombre:'Roberto Roizental', estado:'propuesto'},
         funciones:['Compra de catálogo y de repuestos de la marca representada, con sus tiempos y su relación con la casa matriz.']},
        {id:'cubitt', n:'Línea Cubitt', nivel:'n2',
         ocupante:{nombre:'Vacante / Stephania Roizental', estado:'vacante', nota:'Sin ocupante: Alejandro Roizental va en la dirección corporativa. Stephania Roizental es la opción planteada para cubrirla.'},
         funciones:['Desarrollo de la marca propia: tendencias, proveedores, muestras, calidad a través de las garantías.']}
      ]
    },
    {
      id:'opl', n:'Operaciones y Logística', caracter:'negocio',
      ocupante:{nombre:'Fernando Alvarado', estado:'propuesto'},
      funciones:[
        'Dueño único de la promesa de entrega: importación, almacén principal y distribución a todos los países.',
        'Fija cómo debe funcionar una bodega y replica en las demás las prácticas que ya probó en Colón.',
        'Absorbe el control de inventario, que en julio era una dirección aparte.'
      ],
      nota:'La visión corporativa es de barco, almacén principal y distribución. En cada país hace falta una gerencia que atienda los permisos, la aduana y la bodega local: desde lo corporativo no se puede gobernar la bodega de otro país.',
      hijos:[
        {id:'oplpais', n:'Operaciones y Logística', nivel:'n3',
         paises:{
           PA:{nombre:'Fernando Alvarado', estado:'propuesto', cargo:'Gerencia', nota:'La lleva el mismo director corporativo, además de la dirección.'},
           VE:{nombre:'Elvis Badillo', estado:'propuesto', cargo:'Gerencia'},
           CO:{nombre:'Brayan Muñoz', estado:'actual', cargo:'Coordinación'}
         },
         funciones:['Operación de bodega, despacho e importación del país.'],
         interna:[
           'Jefatura de Despacho: bodega, movimiento y despacho, con supervisión de entrada y salida.',
           'Jefatura de Tráfico: la importación — contenedores, liquidaciones y permisos.',
           'Supervisores, operarios, ayudantes y choferes. Tres perfiles bastan: gerente, jefe o supervisor, operario.'
         ]}
      ]
    },
    {
      id:'comercial', n:'Comercial', caracter:'negocio',
      ocupante:{nombre:'Andrés Roizental', estado:'validar', nota:'La propuesta amplía el alcance del cargo que ya ejerce de hecho: la visión que une mercadeo y venta.'},
      funciones:[
        'Una sola cabeza para la venta y para la demanda que la produce: dirige Ventas y Mercadeo.',
        'Distribuye la venta en sus canales —tienda, mayor y comercio electrónico— y responde por el resultado de ambas marcas.'
      ],
      nota:'Cambio central frente a julio: Mercadeo deja de ser una gerencia aparte («Experiencia de Marcas») y entra bajo Comercial, porque hoy trabaja sin ver el impacto de sus campañas en la venta. Y la marca deja de partir la línea comercial: ventas se organiza por canal, y la separación por marca vive en Investigación y Desarrollo y en coordinaciones de mercadeo. Puede denominarse Vicepresidencia; lo decide el cliente.',
      hijos:[
        {id:'ventas', n:'Ventas', nivel:'n2',
         ocupante:{nombre:'Handani Mora', estado:'propuesto'},
         funciones:[
           'Línea rectora de todos los canales de venta y de la postventa.',
           'Su operatividad debe ser baja: hoy está absorbido por tareas de tienda —como formar a los encargados— que corresponden a las gerencias país.'
         ],
         hijos:[
           {id:'mayorcorp', n:'Ventas al Mayor · mercados sin operación propia', nivel:'n2',
            ocupante:{nombre:'Por definir', estado:'pordefinir'},
            funciones:[
              'Cartera de mayoristas de los países donde el grupo no opera (Centroamérica, Caribe y el resto de la región), consolidada y despachada desde Panamá.',
              'Fija la línea rectora de la venta al mayor para todo el grupo.'
            ],
            nota:'Se separa de la venta al mayor de cada país, que atiende a los mayoristas locales. La frontera entre las dos se acuerda con la Dirección Comercial.'},
           {id:'ecommerce', n:'E-commerce', nivel:'n2',
            ocupante:{nombre:'Patrick Corujo', estado:'propuesto'},
            funciones:['Página web y canales digitales de venta de todo el grupo. Uno solo para todos los países: no hace falta una gerencia web por país.']},
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
           {id:'postventa', n:'Postventa', nivel:'n3',
            paises:{
              PA:{nombre:'Por definir', estado:'pordefinir'},
              VE:{nombre:'Por definir', estado:'pordefinir'},
              CO:{nombre:'Por definir', estado:'pordefinir'}
            },
            funciones:[
              'Garantías, devoluciones y servicio técnico, con criterios comunes para todos los países.',
              'Queda bajo Ventas porque cada garantía o descuento que concede toca el margen de la venta.'
            ],
            interna:['Relojeros y técnicos: cada gerencia estructura su equipo.']}
         ]},
        {id:'mercadeo', n:'Mercadeo', nivel:'n2',
         ocupante:{nombre:'Vacante', estado:'vacante', nota:'Posición clave: la gerencia corporativa anterior dejó el cargo.'},
         funciones:[
           'La mente de la marca en todos los países: concepto, lineamientos, calendario de lanzamientos.',
           'Lleva personalmente la inteligencia de mercado (tendencias, estudios, reportería): es un proceso, no un área.',
           'Supervisa lo que se terceriza (diseño, contenido, redes) en vez de producirlo con plantilla propia.'
         ],
         nota:'Hoy mercadeo está sobredimensionado y la comunicación entre sus piezas —visual merchandising, contenido, desarrollo de producto— pasa por varias instancias a la vez. Se reordena en tres frentes. Donde los ritmos de Casio y Cubitt lo exijan, se separan coordinaciones por marca, no gerencias.',
         hijos:[
           {id:'experiencia', n:'Experiencia del Cliente', nivel:'n2',
            ocupante:{nombre:'Reyna Barraza', estado:'propuesto'},
            funciones:[
              'La experiencia en vivo del cliente en la tienda propia, en la del mayorista y en los eventos.',
              'Absorbe el visual merchandising: diseño y montaje de tienda con las normas de la marca, hoy separado de mercadeo.'
            ]},
           {id:'producto', n:'Desarrollo de Producto', nivel:'n2',
            ocupante:{nombre:'Vacante / Stephania Roizental', estado:'vacante', nota:'Stephania Roizental es la opción planteada para cubrirla.'},
            funciones:[
              'Ensambla el producto que compra Investigación y Desarrollo con el concepto de la marca: colores de temporada, lanzamientos, licencias con marcas.',
              'Crea los códigos de producto y avisa a comercial para abrir la preventa: es lo que desata los procesos de venta.'
            ],
            nota:'Hoy es una figura sin área que responde a varias instancias; aquí queda con una sola línea de reporte y en coordinación directa con Investigación y Desarrollo.'},
           {id:'digital', n:'Experiencia Digital', nivel:'n2',
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
      nota:'La denominación suma el desarrollo de negocios a las finanzas corporativas. La operación financiera vive en cada país.',
      hijos:[
        {id:'finpais', n:'Administración y Finanzas', nivel:'n3',
         paises:{
           PA:{nombre:'Vacante', estado:'vacante'},
           VE:{nombre:'Jaime González', estado:'propuesto', nota:'Puede cubrir más de un país mientras se completan las otras.'},
           CO:{nombre:'Vacante', estado:'vacante'}
         },
         funciones:['La operación financiera del país, con el marco fiscal local.'],
         interna:['Cuentas por pagar.', 'Cuentas por cobrar.', 'Tesorería y conciliación.', 'Asuntos fiscales.']}
      ]
    },
    {
      id:'desarrollo', n:'Desarrollo Corporativo', caracter:'staff',
      ocupante:{nombre:'María Elvira', estado:'propuesto', nota:'Se incorpora al grupo como responsable corporativa de talento.'},
      funciones:[
        'Gestiona la organización como socia del negocio: el talento, los proyectos, la formación, el soporte jurídico y los servicios que hacen funcionar a las operaciones.',
        'Lidera los procesos de cambio organizacional; es la dueña operativa de la implantación de los manuales de proceso.',
        'Lidera y convoca el Comité de Calidad y Mejora Continua.'
      ],
      nota:'En el boceto se llamó «Gestión Organizacional». La denominación busca sacar la función del encasillamiento administrativo de «Recursos Humanos» (nómina y trámite); su titular puede proponer el nombre definitivo. Reúne lo que en julio eran tres gerencias separadas: Talento Humano, PMO y Mantenimiento y Servicios.',
      hijos:[
        {id:'proyectos', n:'Proyectos (PMO)', nivel:'n2',
         ocupante:{nombre:'Ricardo Candanedo', estado:'propuesto'},
         funciones:[
           'Equipo nuclear de gerentes de proyecto que atiende a toda la corporación: aperturas de tienda, obras, proyectos de transformación.',
           'Distribuye la cartera según la demanda; en los picos subcontrata gerentes de proyecto por proyecto, con principio y fin.'
         ],
         nota:'Un solo perfil generalista, no dos alas fijas: un gerente de proyecto aborda un proyecto físico o uno de transformación, y así no quedan capacidades ociosas entre picos. No se replica por país.'},
        {id:'juridica', n:'Consultoría Jurídica', nivel:'n2',
         ocupante:{nombre:'Vacante', estado:'vacante', nota:'Hoy la cubre un asesor externo de la Junta Directiva.'},
         funciones:[
           'Una oficina corporativa con visión de todos los países: contratos con marcas y proveedores, gestión de los bufetes locales.',
           'Un responsable y su asistencia; el trabajo especializado por país se contrata.'
         ]},
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
         interna:['Coordinaciones híbridas, no una por subespecialidad: evitar áreas separadas de nómina, desarrollo y compensación.']},
        {id:'ti', n:'Tecnología de Información', nivel:'n3',
         paises:{
           PA:{nombre:'Mariela Castro', estado:'actual', cargo:'Gerencia'},
           VE:{nombre:'José Rafael Herrera', estado:'actual', cargo:'Coordinación'},
           CO:{nombre:'Vacante', estado:'vacante', cargo:'Coordinación'}
         },
         funciones:[
           'Redes, conexiones, equipos, sistemas y soporte de cada operación.',
           'Sigue los lineamientos que fija Gobierno de IA para que el dato fluya entre países.'
         ],
         nota:'No hay una dirección corporativa de tecnología: el grupo no es una empresa de tecnología. Lo que se gobierna una sola vez —el dato y la IA— sube a Gobierno de IA; la operación de TI queda en cada país. Donde la operación es menor (Colombia, y hoy Venezuela) basta una coordinación.'},
        {id:'ssgg', n:'Servicios Generales', nivel:'n3',
         paises:{
           PA:{nombre:'Por confirmar', estado:'pordefinir'},
           VE:{nombre:'Williams Porras', estado:'actual', cargo:'Jefatura'},
           CO:{nombre:'Por confirmar', estado:'pordefinir'}
         },
         funciones:['Mantenimiento de sedes, tiendas y bodegas, y los servicios que las sostienen.']}
      ]
    },
    {
      id:'ia', n:'Gobierno de IA', caracter:'staff',
      ocupante:{nombre:'Vacante', estado:'vacante', nota:'Perfil a contratar.'},
      funciones:[
        'Asegura que el dato fluya entre las áreas y los países, sin importar el sistema de cada uno.',
        'Integra a la organización la tecnología disponible y fija los lineamientos de uso de la IA.'
      ],
      nota:'No lleva la operación de TI: esa queda en las gerencias país bajo Desarrollo Corporativo. Es un perfil que se mueve entre el negocio y la tecnología, como el de Comercial entre la venta y el mercadeo. Es la unidad de gobierno de IA que el proyecto comprometió desde el arranque.'
    }
  ],

  /* ---------------------------------------------------- órganos de cogobierno */
  // Los integrantes son ids de nodo; '@direcciones'
  // significa todas las direcciones corporativas. Un id de gerencia país lo incluye
  // en cada uno de los países.
  COMITES: [
    {id:'c-cal', n:'Comité de Calidad y Mejora Continua', lidera:'desarrollo',
     proposito:'Instancia de cogobierno orientada a la revisión de las políticas y los manuales de la gestión corporativa.',
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
     integrantes:['desarrollo', 'id', 'opl', 'comercial', 'finanzas', 'ecommerce', 'digital', 'juridica', 'ti']},
    {id:'c-cultura', n:'Comité de Cultura Organizacional', lidera:'desarrollo',
     proposito:'Instancia de cogobierno que alinea la cultura interna con la promesa de las marcas.',
     funciones:[
       'Custodia los valores de la empresa familiar y los traduce en prácticas: incorporación, clima y orgullo de pertenencia.',
       'Hace de la formación el vehículo de la cultura, a través de la Universidad Corporativa.',
       'Conecta la experiencia del empleado con la experiencia del cliente: quien vive la marca por dentro la transmite por fuera.'
     ],
     integrantes:['desarrollo', 'comercial', 'formacion', 'mercadeo']},
    {id:'c-finanzas', n:'Comité de Finanzas y Riesgos', lidera:'finanzas',
     proposito:'Instancia ejecutiva de cogobierno sobre la caja y el riesgo del grupo. Prepara lo que sube a la Junta Directiva y al Comité de Finanzas del gobierno familiar, que se mantiene como instancia de gobierno.',
     funciones:[
       'Da seguimiento al presupuesto y al flujo de caja de todo el grupo.',
       'Gestiona las líneas de crédito y las inversiones.',
       'Da el visto bueno a los compromisos grandes, como las compras a fábrica.',
       'Revisa el crédito a clientes y la cobranza.',
       'Vigila el riesgo cambiario entre países: ninguna cifra sin moneda y sin tasa fechada.'
     ],
     integrantes:['finanzas', 'comercial', 'id', 'opl', 'desarrollo', 'finpais', 'juridica']},
    {id:'c-comercial', n:'Comité Comercial', lidera:'comercial',
     proposito:'Instancia de cogobierno que formaliza las decisiones de producto y de venta que hoy toma un grupo informal, sin formato ni registro.',
     funciones:[
       'Decide la colección y los colores de temporada con Investigación y Desarrollo.',
       'Fija el calendario de lanzamientos, sin saturar a mercadeo.',
       'Reparte el producto entre canales y países.'
     ],
     integrantes:['comercial', 'ventas', 'mercadeo', 'id']}
  ],

  /* --------------------------------------------------------- premisas */
  FUNCIONAMIENTO: [
    {t:'Lo corporativo fija la línea, el país la ejecuta',
     d:'Cada dirección corporativa dicta la línea rectora de su función para todo el grupo; la gerencia país es su espejo y la ejecuta con el marco normativo, los recursos y la operación de su país. Un corporativo recibe, verifica y orienta: si se hunde en la operación, deja de supervisar.'},
    {t:'La cadena de valor ordena las direcciones',
     d:'El negocio empieza con Investigación y Desarrollo, que compra; Operaciones y Logística lo trae y lo almacena; Comercial lo vende —en tienda, al mayor y por la web— y atiende la postventa; Finanzas y Negocios, desde el staff, cobra y consolida.'},
    {t:'Staff y unidades de negocio',
     d:'Investigación y Desarrollo, Operaciones y Logística y Comercial son las unidades de negocio: la razón de ser del grupo, bajo la línea de mando de la Presidencia y en el orden de la cadena de valor, de la compra a la postventa. Finanzas y Negocios, Desarrollo Corporativo y Gobierno de IA son staff: sostienen a las tres y apoyan a la Presidencia, así que no comparten nivel con ellas. Se ubican a los costados de la línea que baja de la Presidencia, por encima de las unidades de negocio.'},
    {t:'Equipos nucleares que se asignan por demanda',
     d:'Proyectos y Consultoría Jurídica no se replican por país: son un equipo central que se reparte según lo que pida la corporación, y que subcontrata en los picos.'},
    {t:'Cogobierno por comités',
     d:'Lo que atraviesa varias direcciones no se resuelve creando un área más, sino un comité que lidera y convoca una dirección con sus pares. Se formalizan cinco: Calidad y Mejora Continua, Gobierno del Dato e IA, Cultura Organizacional, Finanzas y Riesgos, y Comercial. Holding y Junta son gobierno, no línea de mando.'},
    {t:'Tercerizar lo que no es núcleo',
     d:'Diseño, contenido y redes se contratan; la gerencia corporativa se asegura de que el tercero funcione. Así el tamaño de mercadeo deja de crecer con cada campaña.'}
  ],

  /* La lógica de conformación, sin unidades ni ocupantes: la vista «Capas»
     (#/estructura/capas) se presenta antes que el organigrama. Las capas
     n1–n3 toman su descripción de NIVELES y suman aquí lo propio. */
  CAPAS: {
    titulo: 'Capas de la estructura',
    bajada: 'Antes de las unidades y de quién ocupa cada cargo, la lógica con que se compone la estructura: seis capas, de quien decide el rumbo a quien opera, y dos piezas que las cruzan.',
    ejes: {baja:'Línea rectora', sube:'Ejecución e indicadores'},
    lista: [
      {id:'gobierno', n:'Gobierno', verbo:'Decide el rumbo',
       d:'Accionistas y Junta Directiva. Aprueban el rumbo y reciben el cuadro de indicadores de las direcciones. Son gobierno, no línea de mando.'},
      {id:'presidencia', n:'Presidencia', verbo:'Conduce el grupo',
       d:'Una sola cabeza ejecutiva, con las direcciones corporativas como reportes directos en un tramo de 4 a 7. A los costados de su línea de mando, el staff: las direcciones de apoyo y Comunicaciones Internas, que sirven a toda la organización.'},
      {id:'n1', nivel:'n1', verbo:'Fijan la línea rectora', escalon:'Director(a) corporativo(a)',
       d:'Aquí están las unidades de negocio, en el orden de la cadena de valor. El staff no comparte esta capa: apoya desde los costados de la Presidencia, en la capa anterior.'},
      {id:'n2', nivel:'n2', verbo:'Gobiernan una especialidad', escalon:'Gerente corporativo(a)',
       d:'Solo existen donde una especialidad conviene llevarla una vez para todos los países.'},
      {id:'n3', nivel:'n3', verbo:'Ejecutan en cada país', escalon:'Gerente (país)',
       d:'Cada país reproduce el mismo espejo; abrir un país nuevo es replicarlo.'},
      {id:'equipos', n:'Equipos', verbo:'Operan', escalon:'De coordinador(a) a operario(a)',
       d:'Debajo de cada gerencia, los escalones de la estructura patrón, iguales en toda la organización. Cada unidad usa solo los que necesita.'}
    ],
    cruzan: [
      {n:'Comités de cogobierno',
       d:'Lo que atraviesa varias direcciones no crea un área más: lo resuelve un comité que lidera una dirección y convoca a sus pares.'},
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
     como:'Mercadeo se abre en tres frentes (experiencia del cliente, desarrollo de producto, experiencia digital) y Ventas se ordena por canal (tienda, mayor, comercio electrónico, postventa). Cada responsable deja de saltar entre tareas dispares.',
     tension:'Proyectos se diseña a propósito como un equipo generalista: la especialización está en el perfil de gerente de proyecto, no en el tipo de proyecto.'},
    {n:'Unidad de mando',
     como:'Cada gerencia país reporta en línea a una sola dirección corporativa. Las figuras que hoy responden a varias instancias —desarrollo de producto, contenido digital, visual merchandising— quedan dentro de Mercadeo con una sola línea de reporte.',
     tension:'Falta decidir si hay una dirección general por país y qué relación tiene con las gerencias país (ver Pendientes).'},
    {n:'Optimización del tramo de control',
     como:'La Presidencia pasa a seis direcciones corporativas y un staff, dentro del rango de 4 a 7.',
     tension:'Desarrollo Corporativo y Ventas concentran muchos reportes: tres frentes corporativos más tres gerencias en cada uno de tres países. Son las primeras a revisar si el tramo satura.'},
    {n:'Equilibrio entre autoridad y responsabilidad',
     como:'Comercial reúne venta y mercadeo: quien responde por el resultado controla también la demanda que lo produce. Postventa queda bajo Ventas: quien concede una garantía o un descuento responde por el margen.',
     tension:'La amplitud del cargo comercial exige un perfil muy completo, con visión regional de importación, marca y venta.'},
    {n:'Homogeneidad operativa',
     como:'Operaciones y Logística es el único dueño de la promesa de entrega: bodega, despacho, tráfico e inventario bajo una misma línea. Toda la compra de producto se concentra en Investigación y Desarrollo.',
     tension:'Desarrollo de Producto (en Mercadeo) e Investigación y Desarrollo trabajan sobre el mismo producto: se coordinan directamente, sin compartir línea de mando.'},
    {n:'Flexibilidad y adaptabilidad (híbrida)',
     como:'El modelo corporativo-país permite abrir un país nuevo replicando el espejo de gerencias. Las líneas de marca de Investigación y Desarrollo admiten marcas futuras, y mercadeo separa coordinaciones por marca solo cuando el ritmo lo exige.',
     tension:'Donde la operación es pequeña, la gerencia país se reduce a una coordinación, y eso debe quedar explícito en cada caso.'},
    {n:'Escalabilidad y canales claros',
     como:'Tres niveles de dirección antes de la coordinación y una estructura patrón de ocho escalones para toda la organización. La capa corporativa no duplica la operación del país.',
     tension:'Las gerencias corporativas dentro de otra gerencia corporativa (E-commerce bajo Ventas, los frentes de Mercadeo) añaden un escalón en Comercial.'}
  ],

  CAMBIOS: {
    conserva:[
      'Holding y Junta Directiva como gobierno —consulta y decisión—, no como línea de mando.',
      'Una capa corporativa rectora que se despliega en cada país.',
      'La distinción visual entre staff y unidades de negocio, ahora en niveles distintos: el staff a los costados de la línea de la Presidencia y el negocio debajo, en el orden de la cadena de valor.',
      'Los comités transversales como forma de cogobierno: el de excelencia tecnológica e IA de julio se formaliza como Comité de Gobierno del Dato e IA, el Comité Comercial se mantiene, y se suman los de Calidad y Mejora Continua, Cultura Organizacional y Finanzas y Riesgos.',
      'Experiencia del Cliente y Experiencia Digital como frentes de mercadeo.',
      'Una unidad de gobierno de la IA.'
    ],
    cambia:[
      {antes:'Tres niveles: Dirección Ejecutiva → Gerencias corporativas → Direcciones.',
       ahora:'Direcciones corporativas → Gerencias corporativas → Gerencias país.',
       porque:'La denominación sube un escalón para que el título refleje el alcance: quien gobierna una función para todo el grupo es dirección; quien la ejecuta en un país es gerencia.'},
      {antes:'Talento Humano, PMO y Mantenimiento y Servicios, cada una por su lado.',
       ahora:'Una sola Dirección de Desarrollo Corporativo.',
       porque:'Las tres existen para que la organización funcione. Juntas liberan el tramo de la Presidencia y dan a la función de talento un alcance estratégico.'},
      {antes:'Transformación Tecnológica y Soporte, con la TI y la IA juntas.',
       ahora:'Gobierno de IA como dirección corporativa, y TI como gerencia por país.',
       porque:'Lo que se gobierna una vez —el dato y la IA— sube; la operación de sistemas se queda cerca de cada país. El grupo no es una empresa de tecnología y no necesita un corporativo de TI.'},
      {antes:'Experiencia de Marcas como gerencia híbrida separada de Comercial.',
       ahora:'Mercadeo dentro de Comercial.',
       porque:'Mercadeo hoy no ve el efecto de su trabajo en la venta. Con una sola cabeza comercial, la demanda y la venta responden al mismo objetivo.'},
      {antes:'Direcciones Comerciales Casio y Cubitt, con las ventas colgando de las marcas.',
       ahora:'Ventas organizadas por canal; la marca se separa en Investigación y Desarrollo.',
       porque:'En la tienda y en el mayor la operación es la misma para las dos marcas. Donde la marca sí marca otro ritmo —la compra, el desarrollo, el calendario de mercadeo— se separa ahí.'},
      {antes:'Dirección de Servicio Técnico.',
       ahora:'Postventa por país, bajo Ventas.',
       porque:'Garantías, devoluciones y descuentos tocan el margen: tienen que verse desde la venta.'},
      {antes:'Dirección de Inventario, junto a la de Operaciones.',
       ahora:'Dentro de Operaciones y Logística.',
       porque:'Un solo doliente de la mercancía, desde que llega hasta que sale.'},
      {antes:'PMO con dos alas fijas (desarrollo de producto · transformación).',
       ahora:'Un equipo de gerentes de proyecto asignado por demanda.',
       porque:'El mismo perfil atiende las dos clases de proyecto, y así no quedan capacidades ociosas en un ala mientras la otra se satura.'},
      {antes:'Sin estas piezas.',
       ahora:'Finanzas y Negocios, Consultoría Jurídica, Formación y Comunicaciones Internas (staff).',
       porque:'Funciones que hoy se reparten entre personas sin cargo, asesores externos o nadie.'}
    ]
  },

  PENDIENTES: [
    {t:'Dirección Comercial', d:'Validar la propuesta con la Presidencia antes de presentarla al liderazgo.'},
    {t:'Gerencia corporativa de Mercadeo', d:'Vacante clave: definir perfil y titular.'},
    {t:'Línea Cubitt y Desarrollo de Producto', d:'Dos gerencias corporativas vacantes para las que se plantea a Stephania Roizental: decidir cuál de las dos cubre.'},
    {t:'Gobierno de IA', d:'Perfil a contratar; definir su perfil y su alcance frente a Desarrollo Corporativo.'},
    {t:'Dos comités de finanzas', d:'Deslindar el Comité de Finanzas y Riesgos (ejecutivo) del Comité de Finanzas del gobierno familiar, para que no decidan lo mismo dos veces.'},
    {t:'Ventas al mayor', d:'Trazar la frontera entre la cartera corporativa (países sin operación propia) y la de cada país, con quien encabece Comercial.'},
    {t:'Finanzas país', d:'Cubrir Panamá y Colombia, y decidir si una misma gerencia atiende más de un país mientras tanto.'},
    {t:'Gerencias país: denominación y cabeza', d:'Precisar si cada país tiene además una dirección general y cómo se relaciona con las gerencias país; y cuándo una gerencia país basta como coordinación.'},
    {t:'Denominaciones', d:'Nombre definitivo de Desarrollo Corporativo, y si la primera línea se llama Dirección o Vicepresidencia.'},
    {t:'Plantilla actual frente a la propuesta', d:'Cerrar con el comparativo de posiciones: cuántas hay hoy, cuántas pide la estructura, dónde sobran y dónde faltan.'}
  ]
};
