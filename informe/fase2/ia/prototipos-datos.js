/* Prototipos de IA — Fase 2.
 * Fuente de documento.html?d=prototipos (la pinta ia-doc.js). La Fase 1
 * comprometió un mínimo de tres prototipos funcionales. El primero es el
 * propio aplicativo del proyecto; los otros dos se eligen entre ocho
 * candidatos, cada uno con su maqueta de diseño (artefacto público) y su
 * puntaje en la matriz. Se edita a mano. */
window.IA_DOC = {
 "id": "prototipos",
 "titulo": "Prototipos de IA",
 "lede": "Los tres prototipos funcionales comprometidos: el primero ya opera; los otros dos se eligen entre ocho candidatos que amplían este mismo sistema.",
 "estado": "borrador",
 "version": "0.2",
 "corte": "25-oct-2026",
 "secciones": [
  {
   "id": "compromiso",
   "num": "0",
   "titulo": "El compromiso",
   "estado": "borrador",
   "bloques": [
    "La Fase 1 comprometió para la Fase 2 **un mínimo de tres prototipos funcionales de IA**. Un prototipo funcional no es una maqueta: corre sobre datos reales, con usuarios reales, y deja medir si sirve antes de escalarlo a toda la plataforma.",
    "El primero es este mismo sistema ([[sec:p1|P1]]), que ya opera: el manual, la estructura y los agentes que los leen y los cambian. Los otros dos se eligen entre **ocho candidatos**. Todos son **ampliaciones de esta plataforma**: arrancan con los archivos que el área ya produce (Excel, reportes, fotos, PDF), sin conectarse a Odoo ni a EBS; alivian una operación real desde el primer día, y tienen su módulo en la [[orbita:inicio|arquitectura propuesta]] para conectarse a los sistemas cuando llegue el espejo. Lo que se construya ahora es ya parte del futuro sistema Kenex.",
    {
     "t": "tarjetas",
     "items": [
      {
       "titulo": "P1 · Este sistema",
       "x": "Conocimiento, manual, estructura y agentes, con permisos por rol.",
       "chips": [
        "En operación"
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
     "titulo": "Las maquetas",
     "x": "Cada candidato tiene una maqueta de diseño con datos de ejemplo, enlazada en su sección. Muestra la pantalla principal tal como quedaría dentro del sistema."
    }
   ]
  },
  {
   "id": "p1",
   "num": "P1",
   "titulo": "El aplicativo del proyecto",
   "estado": "borrador",
   "que": [
    "El aplicativo donde vive este informe es, en sí mismo, el primer prototipo: una plataforma pequeña construida con la misma arquitectura que se propone para Kenex, que **ya opera** con usuarios reales desde julio de 2026.",
    "Reúne todo el conocimiento levantado en el proyecto —entrevistas, sesiones de trabajo, documentos del grupo, el diagnóstico, el manual de procesos, el circuito y esta arquitectura— y permite consultarlo en lenguaje natural, con la fuente de cada respuesta. Sobre esa base corren también la validación del modelo por el comité, el censo de personal y la recolección de fichas, cada uno con sus permisos."
   ],
   "como": [
    {
     "t": "kpis",
     "items": [
      {
       "v": "91",
       "x": "entrevistas y sesiones indexadas para el asistente"
      },
      {
       "v": "462",
       "x": "documentos de la Fase 2 consultables por código"
      },
      {
       "v": "436",
       "x": "personas en el censo, con fichas por enlace"
      },
      {
       "v": "5",
       "x": "funciones de servidor en operación"
      }
     ]
    },
    {
     "t": "tabla",
     "cab": [
      "Pieza",
      "Qué hace",
      "IA"
     ],
     "filas": [
      [
       "Asistente IA",
       "Responde preguntas sobre todo el conocimiento del proyecto, cita la fuente y lee el documento completo cuando hace falta.",
       "Claude por API, con la síntesis del conocimiento en caché y búsqueda de texto completo en español."
      ],
      [
       "Indexación automática",
       "Cada entrevista o archivo que se carga se extrae, se trocea y se resume solo, en segundos.",
       "Claude resume y extrae."
      ],
      [
       "Extracción de entrevistas",
       "Convierte una transcripción en una ficha estructurada.",
       "Claude con salida estructurada."
      ],
      [
       "Validación del comité",
       "El comité valida el modelo To-Be proceso por proceso, con notas escritas o dictadas por voz, y la secretaría técnica consolida.",
       "Dictado por voz del navegador; sin IA generativa."
      ],
      [
       "Acceso y permisos",
       "Una sola puerta de entrada; roles y permisos aplicados en la base de datos, no en la pantalla.",
       "—"
      ],
      [
       "Censo y fichas",
       "Censo de personal y fichas de actualización por enlace, sin cuenta para quien la llena.",
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
   ]
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
       "Contabilidad y Tesorería de Venezuela y Colombia, con la Dirección de Finanzas."
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
       "El equipo creativo central y el mercadeo de cada país. Solo Cubitt: Casio trae su material cerrado."
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
       "Bancos y correo en lugar del archivo y la carga manual. Comparte insumos y usuarios con la conciliación: puede entrar como módulo del mismo prototipo."
      ]
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
    "**Puntaje: 23 de 40.** [[url:https://claude.ai/artifact/DUcLc1su4ocWFrT1AMvu9t|Ver la maqueta de diseño]]"
   ]
  }
 ]
};
