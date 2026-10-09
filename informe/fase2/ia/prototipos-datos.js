/* Prototipos de IA — Fase 2.
 * Fuente de documento.html?d=prototipos (la pinta ia-doc.js). La Fase 1
 * comprometió un mínimo de tres prototipos funcionales. El primero es el
 * propio aplicativo del proyecto; el segundo (reclutamiento con IA) y el
 * tercero (normalizador del sell-out) quedan diseñados y anotados aquí; su
 * construcción se decide aparte. Se edita a mano. */
window.IA_DOC = {
 "id": "prototipos",
 "titulo": "Prototipos de IA",
 "lede": "Los tres prototipos funcionales comprometidos: qué resuelve cada uno, cómo usa la IA y en qué estado está.",
 "estado": "borrador",
 "version": "0.1",
 "corte": "09-oct-2026",
 "secciones": [
  {
   "id": "compromiso",
   "num": "0",
   "titulo": "El compromiso",
   "estado": "borrador",
   "bloques": [
    "La Fase 1 comprometió para la Fase 2 **un mínimo de tres prototipos funcionales de IA**. Un prototipo funcional no es una maqueta: corre sobre datos reales, con usuarios reales, y deja medir si sirve antes de escalarlo a toda la plataforma.",
    "Los tres prototipos se eligieron con dos criterios: que demuestren piezas distintas de la [[orbita:inicio|arquitectura propuesta]] y que se construyan sobre el mismo triángulo —Supabase, el front y GitHub, con la API de Anthropic—, para que lo aprendido sirva después a la plataforma de Kenex.",
    {
     "t": "tarjetas",
     "items": [
      {
       "titulo": "P1 · El aplicativo del proyecto",
       "x": "Conocimiento, documentación y validación con IA, con permisos por rol.",
       "chips": [
        "En operación"
       ]
      },
      {
       "titulo": "P2 · Reclutamiento con IA",
       "x": "Vacantes, portal de postulación y lectura de CV contra una matriz de evaluación; una persona decide.",
       "chips": [
        "Diseñado"
       ]
      },
      {
       "titulo": "P3 · Normalizador del sell-out",
       "x": "Los reportes de venta de los clientes, en sus 41 formatos, en una sola tabla contra el catálogo.",
       "chips": [
        "Diseñado"
       ]
      }
     ]
    },
    {
     "t": "tabla",
     "cab": [
      "",
      "Qué demuestra de la arquitectura",
      "Tipo de IA",
      "Nivel de autonomía"
     ],
     "filas": [
      [
       "P1",
       "Base de conocimiento, búsqueda y respuesta con fuentes, permisos por rol en la base, documentación viva",
       "Responder y sintetizar sobre información propia",
       "1 · prepara"
      ],
      [
       "P2",
       "Portal externo, lectura de documentos, evaluación explicada, firma humana, datos personales",
       "Extraer y evaluar contra criterios explícitos",
       "1 · prepara; la persona decide"
      ],
      [
       "P3",
       "Ingesta de archivos de terceros, catálogo canónico con alias, cola de excepciones con dueño",
       "Reconocer estructuras y emparejar códigos",
       "2 · hace y avisa, con excepciones a una persona"
      ]
     ]
    },
    {
     "t": "nota",
     "titulo": "Estado",
     "x": "P1 está en operación. P2 y P3 quedan diseñados en esta página: alcance, flujo, piezas, lo que se necesita de Kenex y cómo se miden. Su construcción se programa con la dirección del proyecto."
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
     "x": "No lee Odoo ni EBS: trabaja sobre conocimiento del proyecto, no sobre transacciones. El espejo de los sistemas de registro es la primera obra de la Ola 1 de la plataforma, y P3 es el primer paso hacia él."
    }
   ]
  },
  {
   "id": "p2",
   "num": "P2",
   "titulo": "Reclutamiento con IA",
   "estado": "borrador",
   "que": [
    "Hoy la selección de personal en el grupo se hace sin un diccionario de competencias y con descripciones de cargo dispersas por país; cada vacante se cubre con el criterio de quien la lleva. P2 pone en marcha el módulo [[mod:m-reclutamiento-y-lector-de-cv|Reclutamiento y lector de CV]] de la órbita sobre el proceso [[proc:17.1]]: **vacantes abiertas, un portal donde los candidatos se postulan con su CV y una IA que lee cada CV y lo puntúa contra una matriz de evaluación del cargo, explicando el porqué**.",
    "La IA ordena y explica; **nunca descarta sola**. Una persona revisa, decide y firma. El prototipo es también la base del aplicativo de evaluación de perfiles previsto para la Fase 4."
   ],
   "como": [
    {
     "t": "pasos",
     "items": [
      {
       "t": "La vacante y su matriz",
       "x": "Talento Humano abre la vacante desde el cargo y arma su matriz: criterios excluyentes (cumple / no cumple) y criterios ponderados con anclas del 0 al 5 y pesos que suman 100. La matriz sale de las descripciones de cargo que ya existen por país."
      },
      {
       "t": "La publicación",
       "x": "La vacante se publica en un portal de empleo con la marca del grupo, fuera de la puerta de acceso del aplicativo."
      },
      {
       "t": "La postulación",
       "x": "El candidato llena sus datos, sube su CV (PDF o Word) y acepta el aviso de privacidad, que le dice que una IA ayuda a ordenar las postulaciones y que una persona decide. Recibe un código de seguimiento."
      },
      {
       "t": "La lectura y la evaluación",
       "x": "El servidor extrae el texto del CV y, en cola, la IA evalúa cada criterio con una nota y una **cita textual del CV como evidencia**. El puntaje lo calcula el servidor a partir de las notas, no la IA. Si una cita no aparece en el CV, la evaluación se marca para revisión."
      },
      {
       "t": "La revisión humana",
       "x": "El reclutador ve las postulaciones ordenadas, la ficha de cada una con la evidencia por criterio y decide: preseleccionar, entrevistar o descartar. Descartar exige un motivo."
      },
      {
       "t": "La medición",
       "x": "Tiempo de cribado por vacante, acuerdo entre la sugerencia de la IA y la decisión de la persona, y efectividad de la terna."
      }
     ]
    },
    {
     "t": "h",
     "x": "Lo que se construye"
    },
    {
     "t": "tabla",
     "cab": [
      "Pieza",
      "Qué es"
     ],
     "filas": [
      [
       "Base de datos",
       "Vacantes con su matriz versionada, candidatos, postulaciones, evaluaciones (una por versión de matriz y de instrucciones) y un registro de intentos para limitar abusos. Permiso propio de reclutamiento; todo cambio queda en el historial."
      ],
      [
       "Almacén de CVs",
       "Privado, solo PDF y Word de hasta 5 MB, con enlaces de lectura de vida corta. Nunca en el repositorio ni en el corpus del asistente."
      ],
      [
       "Función de postulación",
       "Pública y cerrada en su propio código: valida el archivo por su contenido real, filtra robots, limita intentos, extrae el texto y encola. No llama a la IA."
      ],
      [
       "Función de evaluación",
       "Solo para quien tiene el permiso: pide a la IA una salida estructurada, verifica las citas, calcula el puntaje, registra el costo y respeta un tope diario."
      ],
      [
       "Portal de empleo",
       "Lista de vacantes, detalle, formulario con CV y consentimiento, acuse con código."
      ],
      [
       "Módulo del panel",
       "Vacantes y editor de matrices; postulaciones con su ficha de evaluación; decisión con motivo; exportación."
      ]
     ]
    },
    {
     "t": "h",
     "x": "Salvaguardas"
    },
    {
     "t": "lista",
     "items": [
      "La evaluación **no ve** foto, edad, sexo, estado civil ni nacionalidad; los criterios de la matriz no pueden usarlos.",
      "El CV se trata como dato y nunca como instrucción: un texto escondido del tipo «ignora lo anterior» no cambia el puntaje.",
      "Consentimiento explícito con su versión, finalidad y plazo de conservación; los CVs de quien no fue seleccionado se borran al vencer ese plazo.",
      "El candidato puede pedir revisión humana de su postulación.",
      "El texto del aviso de privacidad lo valida Consultoría Jurídica según la ley de cada país ([[doc:politica/datos-personales|artículo 10 de la política]])."
     ]
    },
    {
     "t": "h",
     "x": "Lo que se necesita de Kenex"
    },
    {
     "t": "lista",
     "items": [
      "Dos o tres vacantes reales abiertas, con su descripción de cargo.",
      "Un dueño en Talento Humano que use el prototipo y valide las matrices.",
      "El país piloto y la marca con la que se publica el portal.",
      "El aviso de privacidad validado por Consultoría Jurídica."
     ]
    }
   ]
  },
  {
   "id": "p3",
   "num": "P3",
   "titulo": "Normalizador del sell-out",
   "estado": "borrador",
   "que": [
    "Los clientes del grupo reportan lo que venden en **41 formatos distintos**, cada uno con sus propios códigos de producto, y hoy se reprocesan a mano. El resultado llega tarde, incompleto, y los productos con códigos del cliente quedan fuera del análisis: es el freno [[freno:20.1]], que detiene el tren al final del ciclo, porque sin la venta real no se planifica bien la próxima compra.",
    "P3 pone en marcha el módulo [[mod:m-buzon-de-sell-out-de-clientes|Buzón de sell-out de clientes]] de la Ola 1: **el cliente o el vendedor sube el archivo tal como llega; la IA reconoce sus columnas y empareja cada código del cliente con el producto del catálogo; lo que no reconoce va a una persona**. Es el normalizador que la Fase 1 propuso para la primera ola y el primer paso del [[mod:m-catalogo-unico|catálogo único]] y del [[mod:m-pronostico-base|pronóstico]]."
   ],
   "como": [
    {
     "t": "pasos",
     "items": [
      {
       "t": "El archivo, tal cual",
       "x": "Se sube el reporte en su formato original (Excel o CSV) en un buzón por cliente. No se le pide al cliente que cambie su plantilla."
      },
      {
       "t": "El reconocimiento de la plantilla",
       "x": "La primera vez, la IA reconoce qué columna es el código, la descripción, la cantidad, el periodo y la tienda, y propone el mapeo; una persona lo confirma. El mapeo se guarda por cliente, así que la IA solo vuelve a intervenir si el formato cambia."
      },
      {
       "t": "El emparejamiento con el catálogo",
       "x": "Cada código del cliente se empareja con el producto canónico usando los alias ya conocidos; para los nuevos, la IA propone el producto con su grado de seguridad. Con 95 % o más se acepta y queda como alias; por debajo, va a la cola."
      },
      {
       "t": "La cola de excepciones",
       "x": "Una persona con dueño resuelve lo que la IA no reconoció; cada resolución enseña un alias nuevo."
      },
      {
       "t": "La tabla única",
       "x": "El resultado es la tabla de sell-out en el formato que el área de inteligencia de negocio ya usa como fuente, lista para vendedores, compras y el pronóstico."
      },
      {
       "t": "La medición",
       "x": "Durante dos o tres semanas corre en paralelo con el proceso actual, para comparar resultados."
      }
     ]
    },
    {
     "t": "tabla",
     "cab": [
      "Se mide",
      "Cómo"
     ],
     "filas": [
      [
       "Cobertura",
       "Porcentaje de las líneas reportadas que quedan emparejadas con un producto del catálogo."
      ],
      [
       "Acierto",
       "Porcentaje de emparejamientos automáticos que la persona no corrige."
      ],
      [
       "Tiempo",
       "Días desde que llega el reporte hasta que está en la tabla única, frente al proceso actual."
      ],
      [
       "Carga manual",
       "Horas de reproceso al mes frente a hoy."
      ]
     ]
    },
    {
     "t": "h",
     "x": "Lo que se necesita de Kenex"
    },
    {
     "t": "lista",
     "items": [
      "Dos o tres meses de reportes tal como llegaron y la tabla normalizada del mismo periodo, para comparar.",
      "Una exportación del maestro de productos y las equivalencias de códigos que ya se usan.",
      "La lista de clientes que reportan, con su responsable comercial.",
      "Un dueño en el área de inteligencia de negocio que opere la cola de excepciones."
     ]
    },
    {
     "t": "nota",
     "titulo": "Por qué este y no otro",
     "x": "Es uno de los casos que la Fase 1 propuso para la primera ola, resuelve un freno que detiene el tren y **puede operar sin las credenciales de Odoo**, que siguen pendientes: trabaja con archivos y con una exportación del maestro de productos. Abre el camino al pronóstico de demanda, que sí necesita la venta de Odoo."
    }
   ]
  }
 ]
};
