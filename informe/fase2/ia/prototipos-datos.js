/* Prototipos de IA — Fase 2.
 * Fuente de documento.html?d=prototipos (la pinta ia-doc.js). La Fase 1
 * comprometió un mínimo de tres prototipos funcionales. El primero es el
 * propio aplicativo del proyecto; los otros dos se eligen entre ocho
 * candidatos, cada uno con su maqueta de diseño (artefacto público) y su
 * puntaje en la matriz. Se edita a mano. */
window.IA_DOC = {
 "id": "prototipos",
 "titulo": "Prototipos de IA",
 "lede": "Los tres prototipos funcionales comprometidos: el primero está listo y opera; los otros dos se eligen entre ocho candidatos y cada uno resuelve una sola funcionalidad, con alcance acotado.",
 "estado": "borrador",
 "version": "0.3",
 "corte": "28-oct-2026",
 "secciones": [
  {
   "id": "compromiso",
   "num": "0",
   "titulo": "El compromiso",
   "estado": "borrador",
   "bloques": [
    "La Fase 1 comprometió para la Fase 2 **un mínimo de tres prototipos funcionales de IA**. Un prototipo funcional no es una maqueta: corre sobre datos reales de Kenex, cargados por archivo, con usuarios reales, y deja medir si sirve antes de convertirlo en un módulo completo.",
    "El primero, [[sec:p1|P1]], **está listo y opera** desde julio de 2026: es este mismo aplicativo. Los otros dos, P2 y P3, se eligen entre **ocho candidatos**. Cada uno resuelve **una funcionalidad concreta de un área** con los archivos que esa área ya produce (Excel, reportes, fotos, PDF), sin conectarse a Odoo, a EBS ni a ninguna otra plataforma. Al terminar queda funcionando dentro de esta misma plataforma, junto al informe, y es el punto de partida del módulo completo que le corresponde en la [[orbita:inicio|arquitectura propuesta]].",
    {
     "t": "tarjetas",
     "items": [
      {
       "titulo": "P1 · Este sistema",
       "x": "Conocimiento, informe, manual, estructura y agentes, con permisos por rol.",
       "chips": [
        "Listo · en operación"
       ]
      },
      {
       "titulo": "P2",
       "x": "Uno de los ocho candidatos, elegido con la [[sec:matriz|matriz]].",
       "chips": [
        "Por elegir"
       ]
      },
      {
       "titulo": "P3",
       "x": "Otro de los ocho candidatos.",
       "chips": [
        "Por elegir"
       ]
      }
     ]
    },
    {
     "t": "nota",
     "tipo": "limite",
     "titulo": "Qué es y qué no es un prototipo (P2 y P3)",
     "x": "Un prototipo resuelve **una sola funcionalidad** de un área. Sirve para comprobar con datos reales que la IA alivia esa tarea antes de invertir en el módulo completo. **No es el módulo ni el sistema completo.**",
     "items": [
      "**Alcance:** un país y un área, con los usuarios de esa área.",
      "**Tiempo:** dos semanas de construcción y dos semanas de pruebas con el área.",
      "**Datos:** reales, cargados por archivo (Excel, reporte, foto o PDF). Sin conexión ni API con Odoo, EBS, bancos ni otras plataformas.",
      "**No registra ni ejecuta en los sistemas de registro:** no postea, no paga, no aprueba. Una persona revisa y registra.",
      "**Ajustes:** dos rondas durante las pruebas. Lo que se pida más allá de la funcionalidad elegida se anota para el módulo completo, en su ola.",
      "**No incluye:** el módulo completo, otros países u otras áreas, conexiones entre sistemas, migración de históricos, reportes a medida ni aplicación móvil.",
      "**Al terminar:** queda funcionando en esta plataforma, junto al informe. Llevarlo a módulo completo es un paso aparte, con su propio alcance."
     ]
    },
    {
     "t": "nota",
     "titulo": "Las maquetas",
     "x": "Cada candidato tiene una maqueta de diseño con datos de ejemplo, enlazada en su sección. Muestra la pantalla principal tal como quedaría dentro del sistema."
    }
   ]
  },
  {
   "id": "p1",
   "num": "P1",
   "titulo": "Prototipo 1: listo y en operación",
   "estado": "borrador",
   "que": [
    "El aplicativo donde vive este informe es el primer prototipo, y **ya está listo**: una plataforma pequeña construida con la misma arquitectura que se propone para Kenex, que opera con usuarios reales desde julio de 2026.",
    "Reúne todo el conocimiento levantado en el proyecto —entrevistas, sesiones de trabajo, documentos del grupo, el diagnóstico, el manual de procesos, el circuito, la estructura y esta arquitectura— y permite consultarlo en lenguaje natural, con la fuente de cada respuesta.",
    "**Cómo se usa:** cada persona entra con su cuenta por una sola puerta y ve lo que su rol le permite. La Junta, la Presidencia y el equipo consultor leen el informe de la Fase 1 y el manual de la Fase 2. El comité valida el modelo To-Be proceso por proceso y, con el Agente IA, resuelve dudas y propone cambios al flujo y a la estructura. El equipo consultor carga entrevistas y documentos, que la plataforma indexa sola. Talento reparte las fichas de actualización de perfil por enlace, sin crear cuentas."
   ],
   "como": [
    {
     "t": "kpis",
     "items": [
      {
       "v": "95",
       "x": "entrevistas y sesiones cargadas e indexadas para el asistente"
      },
      {
       "v": "615",
       "x": "documentos de la Fase 2 consultables por código"
      },
      {
       "v": "469",
       "x": "personas activas en el censo, con fichas por enlace"
      },
      {
       "v": "6",
       "x": "funciones de servidor en operación"
      }
     ]
    },
    {
     "t": "tabla",
     "cab": [
      "Lo que está listo",
      "Qué hace",
      "Quién lo usa",
      "IA"
     ],
     "filas": [
      [
       "Informe de la Fase 1",
       "El diagnóstico navegable, con el organigrama, el mapa de procesos, la presentación y la torre de la arquitectura.",
       "La Junta, la Presidencia y el equipo consultor.",
       "—"
      ],
      [
       "Manual de procesos de la Fase 2",
       "Los 182 procesos en As-Is y To-Be, el circuito del negocio, la estructura To-Be y esta arquitectura con sus documentos.",
       "La Junta, la Presidencia y el equipo consultor.",
       "—"
      ],
      [
       "Validación del comité",
       "El comité valida el To-Be proceso por proceso, con notas escritas o dictadas por voz, historial de versiones y una secretaría técnica que consolida.",
       "El comité ejecutivo y la secretaría técnica.",
       "Dictado por voz del navegador; sin IA generativa."
      ],
      [
       "Agente IA del manual",
       "Responde dudas sobre el proceso que se está leyendo y propone cambios al flujo de actividades y a la estructura, que la persona aplica o descarta.",
       "Los integrantes del comité y las cuentas habilitadas.",
       "Claude, con las herramientas de la plataforma y los permisos de quien escribe."
      ],
      [
       "Asistente IA",
       "Responde preguntas sobre todo el conocimiento del proyecto, cita la fuente y lee el documento completo cuando hace falta.",
       "Las cuentas con acceso al panel.",
       "Claude por API, con la síntesis del conocimiento en caché y búsqueda de texto completo en español."
      ],
      [
       "Indexación automática",
       "Cada entrevista o archivo que se carga se extrae, se trocea y se resume solo, en segundos.",
       "Funciona sola al cargar.",
       "Claude resume y extrae."
      ],
      [
       "Extracción de entrevistas",
       "Convierte una transcripción en una ficha estructurada.",
       "El equipo consultor.",
       "Claude con salida estructurada."
      ],
      [
       "Acceso y permisos",
       "Una sola puerta de entrada; roles y permisos aplicados en la base de datos, no en la pantalla.",
       "Los administradores del proyecto.",
       "—"
      ],
      [
       "Censo y fichas",
       "Censo de personal y fichas de actualización por enlace, sin cuenta para quien la llena.",
       "Talento, y cada colaborador con su enlace.",
       "—"
      ]
     ]
    },
    "**Cómo encarna el triángulo:** la base de datos, la autenticación, los permisos por rol y las funciones de servidor corren en **Supabase**; el código vive en **GitHub** y cada cambio publicado pasa por el repositorio; el front se sirve desde **Cloudflare Workers**, la alternativa que el [[doc:tecnico/triangulo|documento técnico]] deja a decisión de Kenex frente a Vercel; y la IA es la **API de Anthropic** llamada desde el servidor, nunca desde el navegador.",
    {
     "t": "nota",
     "titulo": "Lo que P1 no demuestra",
     "x": "No lee Odoo ni EBS: trabaja sobre conocimiento del proyecto, no sobre transacciones. El espejo de los sistemas de registro es la primera obra de la Ola 1 de la plataforma; los candidatos a P2 y P3 que trabajan con archivos son el primer paso hacia él."
    }
   ],
   "intro": "Este mismo aplicativo, en uso desde julio de 2026, con una cuenta por persona y permisos por rol."
  },
  {
   "id": "matriz",
   "num": "M",
   "titulo": "Cómo se eligen",
   "estado": "borrador",
   "que": [
    "Ocho criterios, cada uno de 1 a 5. En riesgo, 5 significa riesgo bajo. La suma da un máximo de 40."
   ],
   "como": [
    {
     "t": "tabla",
     "cab": [
      "Criterio",
      "Qué mide"
     ],
     "filas": [
      [
       "Necesidad",
       "Cuánto y dónde lo pide la organización."
      ],
      [
       "Dirección",
       "La prioridad que le da la dirección del grupo."
      ],
      [
       "Usuario",
       "Hay un área y un usuario que lo usarían desde el primer día."
      ],
      [
       "Archivos",
       "Funciona solo con los archivos que el área ya produce, sin conectarse a Odoo ni a EBS."
      ],
      [
       "Alivio",
       "Horas, atraso o errores que quita desde el primer día."
      ],
      [
       "Plataforma",
       "Tiene su módulo en la órbita, en una ola temprana, y demo en el sistema."
      ],
      [
       "Riesgo",
       "Datos sensibles, dependencias y cambios en la forma de trabajar."
      ],
      [
       "Demostrable",
       "Se entiende en una demostración de diez minutos."
      ]
     ]
    },
    {
     "t": "h",
     "x": "La matriz"
    },
    {
     "t": "tabla",
     "cab": [
      "Candidato",
      "Total / 40",
      "Necesidad",
      "Dirección",
      "Usuario",
      "Archivos",
      "Alivio",
      "Plataforma",
      "Riesgo",
      "Demostrable"
     ],
     "num": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
     ],
     "filas": [
      [
       "Conciliación de ingresos",
       "36",
       "5",
       "4",
       "5",
       "5",
       "5",
       "5",
       "3",
       "4"
      ],
      [
       "Normalizador del sell-out",
       "32",
       "5",
       "3",
       "4",
       "4",
       "5",
       "5",
       "3",
       "3"
      ],
      [
       "Lectura del cierre",
       "31",
       "4",
       "5",
       "4",
       "3",
       "3",
       "5",
       "2",
       "5"
      ],
      [
       "Estudio de marca Cubitt",
       "30",
       "4",
       "2",
       "4",
       "5",
       "4",
       "3",
       "3",
       "5"
      ],
      [
       "Cartera y cobranza",
       "30",
       "4",
       "4",
       "4",
       "4",
       "4",
       "4",
       "3",
       "3"
      ],
      [
       "Expediente de garantías",
       "30",
       "4",
       "3",
       "4",
       "3",
       "4",
       "4",
       "3",
       "5"
      ],
      [
       "Ficha de oportunidad Cubitt",
       "29",
       "3",
       "3",
       "4",
       "4",
       "3",
       "4",
       "4",
       "4"
      ],
      [
       "Reclutamiento con IA",
       "23",
       "2",
       "1",
       "3",
       "5",
       "2",
       "3",
       "3",
       "4"
      ]
     ]
    },
    "Cada candidato se explica en su sección (C1 a C8), con el enlace a su maqueta de diseño.",
    {
     "t": "nota",
     "titulo": "Propuesta del equipo consultor",
     "x": "La puntuación es la lectura del equipo consultor sobre las entrevistas, los casos de uso y la órbita. La elección final es de Kenex."
    }
   ]
  },
  {
   "id": "conciliacion",
   "num": "C1",
   "titulo": "Conciliación de ingresos",
   "estado": "borrador",
   "intro": "Finanzas · Cashea y bancos en Venezuela, plataformas de venta en Colombia.",
   "que": [
    "Conciliar lo vendido por las plataformas de pago y de venta con lo que entra al banco y con lo que registra Odoo es hoy un trabajo de Excel, línea por línea, con semanas de atraso. Sin esa conciliación el cierre no se puede dar por bueno.",
    "El área sube los tres archivos tal como los tiene: el reporte del portal, el extracto del banco y la exportación de Odoo. La IA empareja las partidas, explica cada diferencia (comisiones, diferencial cambiario, órdenes duplicadas), propone el cliente probable de lo que entró sin identificar y deja el borrador del asiento. Contabilidad revisa y registra."
   ],
   "como": [
    {
     "t": "tabla",
     "filas": [
      [
       "Qué hace la IA",
       "Empareja, explica las diferencias y propone el borrador del asiento (nivel 2)."
      ],
      [
       "Quién firma",
       "Contabilidad revisa y registra en Odoo. La plataforma no escribe en Odoo."
      ],
      [
       "Insumo inicial",
       "Reporte del portal de Cashea o de cada plataforma, extracto bancario y exportación de Odoo."
      ],
      [
       "Quién lo usa",
       "Contabilidad y Tesorería del país elegido, con la Dirección de Finanzas. Venezuela y Colombia, cuando sea módulo completo."
      ],
      [
       "En la plataforma",
       "[[mod:m-conciliacion-de-plataformas|Conciliación de plataformas]] (Ola 2), al lado de [[mod:m-cartera-y-cobranza|Cartera y cobranza]]."
      ],
      [
       "Cómo se conecta después",
       "Conectores a las plataformas y a los bancos en lugar del archivo, y el espejo de Odoo en lugar de la exportación. Sus cifras conciliadas alimentan la lectura del cierre."
      ]
     ]
    },
    {
     "t": "nota",
     "tipo": "limite",
     "titulo": "Alcance de este prototipo",
     "x": "Dos semanas de construcción y dos de pruebas, con dos rondas de ajustes. El país se fija al elegirlo.",
     "items": [
      "**Un país y un área:** Contabilidad de un país con una plataforma y un banco; por ejemplo, Venezuela con Cashea.",
      "**Entra:** el reporte de la plataforma, el extracto del banco y la exportación de Odoo, por archivo.",
      "**Sale:** las partidas emparejadas, cada diferencia explicada y el borrador del asiento, que Contabilidad registra en Odoo.",
      "**Queda fuera:** los demás países, plataformas y bancos; la conexión a esas plataformas, a los bancos y a Odoo, y el registro automático del asiento."
     ]
    },
    "**Puntaje: 36 de 40.** [[url:https://claude.ai/artifact/Y4BMi9iZLgXJrikJN31cGh|Ver la maqueta de diseño]]"
   ]
  },
  {
   "id": "sellout",
   "num": "C2",
   "titulo": "Normalizador del sell-out",
   "estado": "borrador",
   "intro": "Ventas al mayor · los clientes reportan lo que venden, cada uno en su formato.",
   "que": [
    "Los clientes mayores informan su venta en decenas de formatos distintos, cada uno con sus propios códigos de producto, y hoy se reprocesan a mano. La venta real llega tarde e incompleta, y sin ella no se planifica bien la próxima compra: es el freno [[freno:20.1]], que detiene el circuito.",
    "El cliente o el vendedor sube el archivo tal como llega. La IA reconoce las columnas y guarda la plantilla de ese cliente, empareja cada código suyo con el producto del catálogo y deja a una persona lo que no reconoce. Sale una sola tabla de sell-out por cliente, tienda y producto."
   ],
   "como": [
    {
     "t": "tabla",
     "filas": [
      [
       "Qué hace la IA",
       "Reconoce el formato y lo normaliza; propone las equivalencias de códigos (nivel 2)."
      ],
      [
       "Quién firma",
       "Nadie: es dato de gestión. Las equivalencias dudosas las resuelve una persona."
      ],
      [
       "Insumo inicial",
       "Los archivos de los clientes y una exportación del maestro de productos."
      ],
      [
       "Quién lo usa",
       "Inteligencia de negocio, los KAM y los vendedores; después el pronóstico y mercadeo."
      ],
      [
       "En la plataforma",
       "[[mod:m-buzon-de-sell-out-de-clientes|Buzón de sell-out de clientes]] (Ola 1) y primer paso del [[mod:m-catalogo-unico|Catálogo único]]."
      ],
      [
       "Cómo se conecta después",
       "Portal de reporte para los clientes y catálogo único en lugar del maestro exportado. Alimenta el pronóstico, la calidad por lote y el mercadeo con datos."
      ]
     ]
    },
    {
     "t": "nota",
     "tipo": "limite",
     "titulo": "Alcance de este prototipo",
     "x": "Dos semanas de construcción y dos de pruebas, con dos rondas de ajustes. El país se fija al elegirlo.",
     "items": [
      "**Un país y un área:** Ventas al mayor de un país, con los clientes que ya reportan su venta.",
      "**Entra:** los archivos de esos clientes, en su formato, y una exportación del maestro de productos.",
      "**Sale:** el sell-out normalizado y las equivalencias de códigos propuestas, que una persona confirma.",
      "**Queda fuera:** el portal para que los clientes suban sus archivos solos, el catálogo único y el pronóstico."
     ]
    },
    "**Puntaje: 32 de 40.** [[url:https://claude.ai/artifact/PiuqgBPMjz6w39BkKzfScu|Ver la maqueta de diseño]]"
   ]
  },
  {
   "id": "cierre",
   "num": "C3",
   "titulo": "Lectura del cierre",
   "estado": "borrador",
   "intro": "Finanzas · el cierre de cada país en un tablero, explicado por la IA.",
   "que": [
    "Cada país cierra en su propio Excel y la dirección recibe las cifras por separado. Un consolidado del grupo pide antes saldos iniciales completos y la eliminación de las operaciones entre las empresas del grupo.",
    "Se suben los estados de resultados y balances que cada país ya produce. El tablero los pone lado a lado por país, por negocio y por unidad de negocio, con moneda y tasa fechada. La IA redacta qué pasó en el mes y responde preguntas en solo lectura, citando la línea del estado de donde sale cada cifra."
   ],
   "como": [
    {
     "t": "tabla",
     "filas": [
      [
       "Qué hace la IA",
       "Explica el mes y responde preguntas, en solo lectura (nivel 1)."
      ],
      [
       "Quién firma",
       "Nadie: es de gestión, no fiscal."
      ],
      [
       "Insumo inicial",
       "Los Excel de cierre de cada país."
      ],
      [
       "Quién lo usa",
       "La Dirección de Finanzas, el comité de finanzas y la Presidencia."
      ],
      [
       "En la plataforma",
       "[[mod:m-tablero-de-direccion|Tablero de dirección]] (Ola 3 por país, Ola 4 grupo)."
      ],
      [
       "Cómo se conecta después",
       "El espejo de Odoo de cada país en lugar del Excel, y el consolidado cuando estén los saldos iniciales y la eliminación entre empresas. Funciona mejor como segunda entrega de la conciliación."
      ]
     ]
    },
    {
     "t": "nota",
     "tipo": "limite",
     "titulo": "Alcance de este prototipo",
     "x": "Dos semanas de construcción y dos de pruebas, con dos rondas de ajustes. El país se fija al elegirlo.",
     "items": [
      "**Un país y un área:** Finanzas de un país, con su cierre mensual.",
      "**Entra:** el Excel de cierre de ese país.",
      "**Sale:** el tablero del mes y las respuestas de la IA, en solo lectura.",
      "**Queda fuera:** el consolidado del grupo, la eliminación entre empresas, el espejo de Odoo y todo lo fiscal."
     ]
    },
    "**Puntaje: 31 de 40.** [[url:https://claude.ai/artifact/3oA1j6WitN23thTAWf3WQz|Ver la maqueta de diseño]]"
   ]
  },
  {
   "id": "marca",
   "num": "C4",
   "titulo": "Estudio de marca Cubitt",
   "estado": "borrador",
   "intro": "Mercadeo · de la promoción al brief, a los textos por país y a la pieza.",
   "que": [
    "Cada mes se bajan varias promociones por país a diseño, con sus textos y sus precios, y se adaptan a cada mercado. Ese paso consume tiempo y deja pasar errores de precio o de versión.",
    "La identidad de Cubitt se carga como reglas: paleta, tipografía, tono y lo que la marca dice y no dice. Mercadeo carga la promoción y la IA arma el brief para diseño, los textos por país y por canal y las piezas base, y revisa que el precio, la vigencia y la versión de cada mercado sean los correctos. Mercadeo aprueba cada pieza."
   ],
   "como": [
    {
     "t": "tabla",
     "filas": [
      [
       "Qué hace la IA",
       "Arma el brief, los textos y las piezas base, y revisa precio y vigencia (nivel 1)."
      ],
      [
       "Quién firma",
       "Mercadeo aprueba cada pieza antes de publicarla."
      ],
      [
       "Insumo inicial",
       "El manual de marca, el banco de imágenes, la grilla mensual y el archivo de promociones y precios."
      ],
      [
       "Quién lo usa",
       "El equipo creativo central y el mercadeo del país elegido. Solo Cubitt: Casio trae su material cerrado."
      ],
      [
       "En la plataforma",
       "[[mod:m-piezas-y-etiquetas|Piezas y etiquetas]] (Ola 4) y [[mod:m-calendario-y-aprobaciones-de-campana|Calendario y aprobaciones de campaña]] (Ola 2)."
      ],
      [
       "Cómo se conecta después",
       "Con [[mod:m-mercadeo-con-datos|Mercadeo con datos]], el brief mira el inventario y empuja lo que hay; con las plataformas de pauta, mide el resultado de cada pieza."
      ]
     ]
    },
    {
     "t": "nota",
     "tipo": "limite",
     "titulo": "Alcance de este prototipo",
     "x": "Dos semanas de construcción y dos de pruebas, con dos rondas de ajustes. El país se fija al elegirlo.",
     "items": [
      "**Un país y un área:** Mercadeo de un país, una promoción a la vez.",
      "**Entra:** el manual de marca, el banco de imágenes, la grilla mensual y el archivo de promociones y precios.",
      "**Sale:** el brief, los textos y las piezas base, que Mercadeo aprueba.",
      "**Queda fuera:** publicar en redes o en plataformas de pauta, medir el resultado de cada pieza y los demás países."
     ]
    },
    "**Puntaje: 30 de 40.** [[url:https://claude.ai/artifact/2ksmbGpBMBXCto7oA4sxnL|Ver la maqueta de diseño]]"
   ]
  },
  {
   "id": "cartera",
   "num": "C5",
   "titulo": "Cartera y cobranza",
   "estado": "borrador",
   "intro": "Finanzas · cuentas por cobrar del mayor.",
   "que": [
    "Los pagos de los clientes mayores llegan por correo y por chat, en dólares y en bolívares, y aplicarlos a sus facturas se hace a mano. La cartera vencida se sigue en hojas que se arman cada día.",
    "La plataforma toma la exportación diaria de cuentas por cobrar y arma la cartera por antigüedad. La IA lee cada comprobante de pago, propone a qué facturas aplicarlo y ordena a quién llamar primero, con el porqué. Cuentas por cobrar valida."
   ],
   "como": [
    {
     "t": "tabla",
     "filas": [
      [
       "Qué hace la IA",
       "Lee el comprobante, propone su aplicación y prioriza la cobranza (nivel 1)."
      ],
      [
       "Quién firma",
       "Cuentas por cobrar valida cada pago."
      ],
      [
       "Insumo inicial",
       "La exportación diaria de cuentas por cobrar y los comprobantes que mandan los clientes."
      ],
      [
       "Quién lo usa",
       "Cuentas por cobrar y Ventas al mayor."
      ],
      [
       "En la plataforma",
       "[[mod:m-cartera-y-cobranza|Cartera y cobranza]] (Ola 2)."
      ],
      [
       "Cómo se conecta después",
       "Bancos y correo en lugar del archivo y la carga manual. Comparte insumos y usuarios con la conciliación, pero es un prototipo aparte: si se eligen los dos, uno es P2 y el otro P3."
      ]
     ]
    },
    {
     "t": "nota",
     "tipo": "limite",
     "titulo": "Alcance de este prototipo",
     "x": "Dos semanas de construcción y dos de pruebas, con dos rondas de ajustes. El país se fija al elegirlo.",
     "items": [
      "**Un país y un área:** Cuentas por cobrar del mayor en un país.",
      "**Entra:** la exportación diaria de cuentas por cobrar y los comprobantes que mandan los clientes, por archivo.",
      "**Sale:** la aplicación propuesta de cada pago y la lista priorizada de cobranza, que el área valida.",
      "**Queda fuera:** leer los bancos y el correo, registrar el pago en Odoo y escribirle al cliente."
     ]
    },
    "**Puntaje: 30 de 40.** [[url:https://claude.ai/artifact/WLgnv9HPaNWGnAayGijyWs|Ver la maqueta de diseño]]"
   ]
  },
  {
   "id": "garantias",
   "num": "C6",
   "titulo": "Expediente de garantías",
   "estado": "borrador",
   "intro": "Postventa · el caso de garantía a partir de las fotos.",
   "que": [
    "Cada caso de garantía se revisa a mano contra el manual de postventa: si está dentro del plazo, si el serial coincide, si aplica alguna exclusión. El resultado y el reporte a la fábrica se arman caso por caso.",
    "El técnico sube las fotos de la factura, del serial y del daño. La IA lee cada una, valida la elegibilidad contra el manual y propone el motivo y la resolución citando la regla. Marca cuando un lote repite la misma falla y prellena el reporte a la fábrica. El técnico confirma o corrige."
   ],
   "como": [
    {
     "t": "tabla",
     "filas": [
      [
       "Qué hace la IA",
       "Lee las fotos, valida contra el manual y propone la resolución (nivel 1)."
      ],
      [
       "Quién firma",
       "El técnico de postventa."
      ],
      [
       "Insumo inicial",
       "Las fotos del caso y el manual regional de postventa."
      ],
      [
       "Quién lo usa",
       "Postventa y servicio técnico; calidad, por lote."
      ],
      [
       "En la plataforma",
       "[[mod:m-expediente-unico-de-garantia|Expediente único de garantía]] (Ola 1)."
      ],
      [
       "Cómo se conecta después",
       "Con el catálogo y la serialización del producto, con el stock de reemplazos y con la calidad por lote."
      ]
     ]
    },
    {
     "t": "nota",
     "tipo": "limite",
     "titulo": "Alcance de este prototipo",
     "x": "Dos semanas de construcción y dos de pruebas, con dos rondas de ajustes. El país se fija al elegirlo.",
     "items": [
      "**Un país y un área:** Postventa de un país.",
      "**Entra:** las fotos del caso y el manual regional de postventa.",
      "**Sale:** el expediente del caso y la resolución propuesta, que decide el técnico.",
      "**Queda fuera:** la serialización del producto, el stock de reemplazos, la calidad por lote y la comunicación con el cliente."
     ]
    },
    "**Puntaje: 30 de 40.** [[url:https://claude.ai/artifact/Q5J9V81UuzGTCfAYdcj6cJ|Ver la maqueta de diseño]]"
   ]
  },
  {
   "id": "oportunidad",
   "num": "C7",
   "titulo": "Ficha de oportunidad Cubitt",
   "estado": "borrador",
   "intro": "Innovación y desarrollo de productos · cada idea con su ficha.",
   "que": [
    "Las ideas de producto se evalúan hoy por experiencia y sin registro común. La información que ayudaría a decidir existe en el grupo, pero dispersa: la venta de la categoría, el precio de la competencia, las fallas de los productos parecidos y las tendencias de temporada.",
    "Quien propone una idea la registra y la IA completa su ficha con esa información y propone variantes coherentes con la línea Cubitt. El comité de producto decide si pasa a muestra, y la IA levanta el acta y sigue cada muestra."
   ],
   "como": [
    {
     "t": "tabla",
     "filas": [
      [
       "Qué hace la IA",
       "Completa la ficha, propone variantes y levanta el acta (nivel 1)."
      ],
      [
       "Quién firma",
       "El comité de producto decide qué pasa a muestra y qué se aprueba."
      ],
      [
       "Insumo inicial",
       "El sell-out de la categoría, las garantías por modelo, los reportes de tendencias y el catálogo de la línea."
      ],
      [
       "Quién lo usa",
       "Innovación y Desarrollo de Productos y su comité."
      ],
      [
       "En la plataforma",
       "[[mod:m-embudo-de-oportunidades|Embudo de oportunidades]] y [[mod:m-muestras-y-pruebas|Muestras y pruebas]] (Ola 1)."
      ],
      [
       "Cómo se conecta después",
       "Con el sell-out normalizado y el catálogo único, y con las fábricas para el seguimiento de cada muestra."
      ]
     ]
    },
    {
     "t": "nota",
     "tipo": "limite",
     "titulo": "Alcance de este prototipo",
     "x": "Dos semanas de construcción y dos de pruebas, con dos rondas de ajustes. Es un área corporativa: la categoría se fija al elegirlo.",
     "items": [
      "**Un área:** Innovación y desarrollo de productos, con una categoría de la línea.",
      "**Entra:** el sell-out de la categoría, las garantías por modelo, los reportes de tendencias y el catálogo, por archivo.",
      "**Sale:** la ficha de cada idea, sus variantes y el acta del comité de producto.",
      "**Queda fuera:** el seguimiento de muestras con las fábricas y el sell-out normalizado de todo el grupo."
     ]
    },
    "**Puntaje: 29 de 40.** [[url:https://claude.ai/artifact/1JLTHY1UZyQLYRNTEKiJM3|Ver la maqueta de diseño]]"
   ]
  },
  {
   "id": "reclutamiento",
   "num": "C8",
   "titulo": "Reclutamiento con IA",
   "estado": "borrador",
   "intro": "Talento · vacantes, postulación y lectura de CV.",
   "que": [
    "La selección se hace sin una matriz común por cargo, y cada vacante se cubre con el criterio de quien la lleva.",
    "Talento abre la vacante desde la descripción del cargo y arma su matriz de evaluación. Los candidatos se postulan con su CV en un portal; la IA lee cada CV, lo compara con la matriz y ordena a los candidatos explicando el porqué. Nunca descarta sola: Talento revisa a todos y decide."
   ],
   "como": [
    {
     "t": "tabla",
     "filas": [
      [
       "Qué hace la IA",
       "Lee, resume y ordena los CV con criterios explícitos (nivel 1)."
      ],
      [
       "Quién firma",
       "Talento decide a quién entrevistar y a quién contratar."
      ],
      [
       "Insumo inicial",
       "La descripción del cargo y los CV que llegan por el portal."
      ],
      [
       "Quién lo usa",
       "Talento y el gerente que pide la vacante."
      ],
      [
       "En la plataforma",
       "[[mod:m-reclutamiento-y-lector-de-cv|Reclutamiento y lector de CV]] (Ola 3)."
      ],
      [
       "Cómo se conecta después",
       "Con las descripciones de cargo y el repositorio de fichas del colaborador. El aplicativo de evaluación de perfiles es además un entregable de la Fase 4."
      ]
     ]
    },
    {
     "t": "nota",
     "tipo": "limite",
     "titulo": "Alcance de este prototipo",
     "x": "Dos semanas de construcción y dos de pruebas, con dos rondas de ajustes. El país se fija al elegirlo.",
     "items": [
      "**Un país y un área:** Talento de un país, con sus vacantes abiertas.",
      "**Entra:** la descripción del cargo y los CV, por archivo.",
      "**Sale:** el resumen de cada CV y el orden propuesto con criterios explícitos; Talento decide a quién entrevistar.",
      "**Queda fuera:** publicar las vacantes, contactar a los candidatos y la evaluación de perfiles, que es entregable de la Fase 4."
     ]
    },
    "**Puntaje: 23 de 40.** [[url:https://claude.ai/artifact/DUcLc1su4ocWFrT1AMvu9t|Ver la maqueta de diseño]]"
   ]
  }
 ]
};
