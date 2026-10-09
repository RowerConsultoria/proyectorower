/* Política de Adopción de IA — Fase 2.
 * Fuente única de documento.html?d=politica (la pinta ia-doc.js). Dos niveles:
 * la declaración (para firma de la Junta) y la norma operativa en artículos.
 * Es el documento que produce el proceso 5.1 (cuyo To-Be vive en el manual de
 * procesos y no se toca aquí). Usa los nombres de gobierno vigentes de
 * estructura-tobe-datos.js sin editarlo. Se edita a mano. */
window.IA_DOC = {
 "id": "politica",
 "titulo": "Política de adopción de IA",
 "lede": "Qué usos de la inteligencia artificial se aprueban en el grupo, con qué datos y con qué nivel de autonomía, y quién la gobierna.",
 "estado": "borrador",
 "version": "0.1",
 "corte": "09-oct-2026",
 "capas": {
  "que": "Qué establece",
  "como": "Cómo se cumple"
 },
 "secciones": [
  {
   "id": "declaracion",
   "num": "D",
   "titulo": "Declaración",
   "estado": "borrador",
   "bloques": [
    {
     "t": "nota",
     "tipo": "decision",
     "titulo": "Para firma de la Junta Directiva",
     "x": "Este es el nivel declarativo de la política: el compromiso del grupo, en una página. El nivel operativo, artículo por artículo, dice cómo se cumple."
    },
    "**Grupo Kenex reconoce que la inteligencia artificial ya está cambiando la forma en que se trabaja en cada una de sus empresas.** Hoy se usa de manera dispersa: con cuentas personales, sin reglas comunes sobre qué información se le entrega y sin una medida de su beneficio. El grupo decide adoptarla de forma ordenada, para hacer mejor su trabajo y no solo más rápido, y para que su uso proteja a sus clientes, a su gente y a su información.",
    {
     "t": "h",
     "x": "Principios"
    },
    {
     "t": "lista",
     "num": true,
     "items": [
      "**El dato antes que el agente.** Sin información de origen confiable, automatizar multiplica el error. Primero se ordena y certifica el dato; después se construye sobre él.",
      "**La IA propone; una persona decide y firma; todo deja rastro.** La palabra final sobre una decisión de negocio es humana, y cada acción de la IA queda registrada.",
      "**No hay adopción sin formación**, ni formación sin un caso de uso real.",
      "**Todo lo que se conecta a los sistemas del grupo pasa por Tecnología**, lo haya construido quien lo haya construido.",
      "**La información del grupo y de sus clientes se protege** según su sensibilidad, con cuentas corporativas y nunca personales.",
      "**Quien aprueba la IA no es quien la implanta.** El gobierno y la operación se separan.",
      "**La adopción es gradual y acompañada:** cada persona sabe qué se espera de ella y aprende a su ritmo."
     ]
    },
    {
     "t": "h",
     "x": "Compromisos"
    },
    {
     "t": "lista",
     "items": [
      "Gobernar la IA con una instancia que la apruebe y una que la opere, y rendir cuentas a la Junta Directiva.",
      "Formar a su gente antes de pedirle que use la IA, empezando por el liderazgo.",
      "Construir su uso sobre una [[doc:tecnico/leer|arquitectura de IA]] propia, sin depender de herramientas aisladas.",
      "Medir el beneficio de cada caso de uso y retirar lo que no lo dé.",
      "Cumplir la ley de protección de datos de cada país donde opera.",
      "Revisar esta política cada seis meses."
     ]
    },
    "Esta política se vincula con los valores y el código de ética del grupo: es parte de la cultura, no solo una norma técnica. Aplica a todas las empresas, áreas y personas del grupo, y a los terceros que trabajen con su información.",
    {
     "t": "tabla",
     "cab": [
      "Aprobada por",
      "Fecha",
      "Vigencia",
      "Próxima revisión"
     ],
     "filas": [
      [
       "Junta Directiva",
       "por aprobar",
       "desde su aprobación",
       "seis meses después"
      ]
     ]
    }
   ]
  },
  {
   "id": "gobierno",
   "num": "1",
   "titulo": "Gobierno de la IA",
   "estado": "borrador",
   "que": [
    "La IA se gobierna en tres planos: quien **aprueba** (qué usos, con qué datos, con qué autonomía), quien **implanta y opera** (las herramientas, los accesos, los agentes) y quien **usa**. La regla de fondo es que quien aprueba no es quien implanta: así ningún área se aprueba a sí misma.",
    "Hoy esa separación no existe. Las herramientas se contratan y se conectan área por área, y para conectarlas a Odoo se han entregado credenciales de administrador sin que Tecnología sepa quién accede a qué."
   ],
   "como": [
    {
     "t": "tabla",
     "cab": [
      "Instancia",
      "Qué le corresponde"
     ],
     "filas": [
      [
       "Junta Directiva",
       "Aprueba esta política, su presupuesto anual de licencias y plataforma, y la vincula con el código de ética. Recibe cada semestre el informe de uso, beneficios e incidentes."
      ],
      [
       "Comité de Gobierno del Dato e IA",
       "Prioriza y aprueba los casos de uso, fija el nivel de autonomía de cada uno y autoriza que un agente suba de nivel. Revisa la política antes de elevarla a la Junta."
      ],
      [
       "Gobierno de IA (unidad de la Presidencia)",
       "Redacta y mantiene la política y sus anexos, lleva el inventario de casos y herramientas, y vela por su cumplimiento. No construye ni opera."
      ],
      [
       "Dirección de Tecnología, Gobernanza y Riesgo",
       "Implanta y opera: plataforma, agentes, licencias, credenciales y protección de datos. Valida todo desarrollo antes de producción y presenta el registro de agentes, riesgos e incidentes."
      ],
      [
       "Tecnología de cada país",
       "Otorga y retira accesos con mínimo privilegio y atiende a los usuarios de su país."
      ],
      [
       "Consultoría Jurídica",
       "Valida el cumplimiento legal: datos personales, contratos con proveedores, propiedad intelectual."
      ],
      [
       "PMO",
       "Lleva la cartera de casos de uso y su avance."
      ],
      [
       "Dueños de proceso",
       "Proponen casos, responden por su beneficio y firman lo que la IA prepara en su proceso."
      ],
      [
       "Usuarios",
       "Usan la IA según esta política y reportan lo que no funciona."
      ]
     ]
    },
    "La matriz completa de responsabilidades está en el [[sec:anexos|anexo A]]. El proceso que produce y mantiene esta política es el [[proc:5.1]], y el que aprueba los casos de uso es el [[proc:5.2]]; ambos viven en el manual de procesos.",
    {
     "t": "nota",
     "titulo": "Nombres",
     "x": "El manual de procesos todavía asigna la redacción de la política a la Gerencia de Tecnología y nombra a un Comité de Inteligencia Artificial. Esta política usa los nombres vigentes de la estructura To-Be, que separan la redacción (Gobierno de IA) de la implantación (Tecnología, Gobernanza y Riesgo)."
    }
   ]
  },
  {
   "id": "datos",
   "num": "2",
   "titulo": "Clasificación de los datos",
   "estado": "borrador",
   "que": [
    "No toda la información es igual. Una ficha de producto publicada puede ir a cualquier herramienta; la lista de precios de un cliente, no; los datos de salud o el salario de una persona, casi nunca. La política clasifica la información en cuatro niveles y dice qué se puede hacer con IA en cada uno.",
    "Ya hubo un caso de un área que cargó toda su información de compras en una herramienta externa sin control. La clasificación existe para que eso no dependa del criterio de cada quien."
   ],
   "como": [
    {
     "t": "tabla",
     "cab": [
      "Nivel",
      "Qué incluye",
      "Con IA se puede"
     ],
     "filas": [
      [
       "Público",
       "Lo que el grupo ya publicó: catálogo, fichas técnicas, precios públicos, comunicados.",
       "Usarlo en cualquier herramienta autorizada."
      ],
      [
       "Interno",
       "Lo que circula dentro del grupo sin daño si se conoce fuera: procedimientos, manuales, actas no sensibles.",
       "Usarlo solo en herramientas corporativas autorizadas."
      ],
      [
       "Confidencial",
       "Lo que daña al grupo o a un socio si sale: precios y condiciones de clientes, costos, márgenes, inventario, contratos, información de fábricas y marcas representadas.",
       "Usarlo solo dentro de la plataforma del grupo o con licencias corporativas, en casos de uso aprobados. Nunca en herramientas gratuitas o personales."
      ],
      [
       "Restringido",
       "Datos personales de clientes, candidatos y colaboradores; salarios; datos de salud; información financiera no publicada; credenciales.",
       "Usarlo solo en casos de uso aprobados con evaluación de impacto, dentro de la plataforma. Las credenciales nunca se entregan a una IA."
      ]
     ]
    },
    "Quien tenga duda sobre el nivel de una información la trata como del nivel superior y consulta a Gobierno de IA. Cada dueño de proceso clasifica la información de su proceso; la tabla de referencia está en el [[sec:anexos|anexo B]]."
   ]
  },
  {
   "id": "herramientas",
   "num": "3",
   "titulo": "Herramientas y cuentas autorizadas",
   "estado": "borrador",
   "que": [
    "Hoy conviven licencias pagadas por la empresa, licencias pagadas por cada persona, tarjetas dedicadas a pagar servicios y cuentas con dominios distintos. Así no se puede saber quién usa qué ni con qué información, y lo que se construye no se puede conectar.",
    "La política reduce esto a una regla: **la IA se usa con cuentas corporativas y en herramientas autorizadas**. Lo que no está en la lista no se usa con información del grupo."
   ],
   "como": [
    {
     "t": "lista",
     "items": [
      "**Asistente de uso general:** las licencias corporativas de Claude, con cuentas del dominio del grupo, asignadas según el [[sec:licencias|artículo 8]].",
      "**Plataforma del grupo:** la IA que corre dentro de los módulos usa la API de Anthropic (y la de OpenAI solo para voz e imágenes) desde la plataforma, con las llaves en la bóveda y nunca en manos de un usuario. Ver el [[doc:tecnico/ia|documento técnico]].",
      "**Trabajo en equipo:** Lark sigue siendo el espacio de colaboración y el canal de avisos y de firma.",
      "**Lo que no se permite:** cuentas personales con información del grupo; herramientas gratuitas o extensiones del navegador con información interna o confidencial; conectar una herramienta a Odoo, Lark o cualquier sistema con credenciales personales o de administrador; compartir llaves de API."
     ]
    },
    "La lista vigente de herramientas autorizadas, con su nivel máximo de datos, está en el [[sec:anexos|anexo C]]. Gobierno de IA la mantiene; incluir una herramienta nueva requiere la evaluación de Tecnología, Gobernanza y Riesgo y, si toca datos personales, de Consultoría Jurídica.",
    {
     "t": "nota",
     "tipo": "alerta",
     "titulo": "Transición",
     "x": "En los 90 días siguientes a la aprobación, toda licencia o cuenta de IA pagada por una persona o con un dominio distinto se migra a una cuenta corporativa o se cancela, y lo construido sobre ella se registra en el inventario."
    }
   ]
  },
  {
   "id": "usos",
   "num": "4",
   "titulo": "Usos aceptables y prohibidos",
   "estado": "borrador",
   "que": [
    "La IA es buena para redactar, resumir, clasificar, comparar, explicar y preparar. Es mala para dar por cierto lo que no puede verificar, y se equivoca en cálculos contables y fiscales con una seguridad que engaña. La política dice qué se puede hacer libremente, qué necesita aprobación y qué no se hace."
   ],
   "como": [
    {
     "t": "tabla",
     "cab": [
      "Tipo de uso",
      "Ejemplos",
      "Regla"
     ],
     "filas": [
      [
       "Aceptable",
       "Redactar y corregir textos, resumir documentos y reuniones, preparar presentaciones, analizar información de nivel público o interno, explicar normas o procedimientos, apoyar el aprendizaje.",
       "Con herramientas autorizadas y la información permitida para su nivel. Quien usa revisa el resultado antes de usarlo."
      ],
      [
       "Requiere caso de uso aprobado",
       "Todo lo que use información confidencial o restringida de forma recurrente; todo lo que se conecte a un sistema del grupo; todo lo que actúe hacia clientes, candidatos o proveedores; todo agente.",
       "Pasa por el ciclo del [[proc:5.2]] y queda en el inventario."
      ],
      [
       "Prohibido",
       "Entregar credenciales a una IA; tomar con IA una decisión reservada a personas ([[sec:autonomia|artículo 5]]); presentar como propio y verificado un cálculo, un dato fiscal o una cifra sin revisarlo; generar contenido que suplante a una persona o a una marca; usar la IA para vigilar a colaboradores fuera de lo que la ley y esta política permiten; reconocer emociones de candidatos o colaboradores; puntuar socialmente a las personas; inferir atributos sensibles (salud, religión, orientación, afiliación) a partir de otros datos.",
       "No se hace. Es incumplimiento ([[sec:incumplimiento|artículo 16]])."
      ]
     ]
    },
    "**Revisión humana obligatoria.** Todo resultado de una IA que se use en una decisión, se envíe fuera del grupo o se registre en un sistema lo revisa una persona antes. Las cifras contables, fiscales y de inventario se comprueban contra su sistema de origen."
   ]
  },
  {
   "id": "autonomia",
   "num": "5",
   "titulo": "Autonomía y firma humana",
   "estado": "borrador",
   "que": [
    "Un agente de IA puede limitarse a preparar un borrador, actuar por su cuenta dentro de un margen acotado, o ejecutar algo importante solo después de que una persona firme. La política fija **una sola escala de autonomía** para todo el grupo, quién decide el nivel de cada agente y qué decisiones nunca se le delegan.",
    "La regla de fondo: el privilegio se gana con evidencia. Ningún agente empieza con más autonomía de la que su historial medido justifica."
   ],
   "como": [
    {
     "t": "tabla",
     "cab": [
      "Nivel",
      "Qué hace el agente",
      "Ejemplo"
     ],
     "filas": [
      [
       "1 · Prepara",
       "Deja un borrador; una persona lo revisa, lo corrige si hace falta y lo envía o lo registra.",
       "El copiloto de atención propone la respuesta; el asesor la envía."
      ],
      [
       "2 · Hace y avisa",
       "Ejecuta una acción acotada y reversible, avisa y deja rastro. Una persona puede deshacerla.",
       "Clasificar un reporte de sell-out y cargarlo; marcar una reserva vencida."
      ],
      [
       "3 · Decide con firma previa",
       "Prepara una acción de impacto que queda en espera hasta que firma la persona con autoridad; al firmarse, se ejecuta y queda en la bitácora.",
       "Liberar una reserva comprometida; enviar un pedido a una fábrica."
      ]
     ]
    },
    {
     "t": "h",
     "x": "Decisiones reservadas a personas"
    },
    {
     "t": "lista",
     "items": [
      "**Siempre las decide una persona:** comprar, pagar, aprobar un precio, contratar y desvincular, y todo asiento contable o documento fiscal.",
      "**Pagos, asientos y documentos fiscales:** la IA nunca los ejecuta. La plataforma no escribe nada de eso en los sistemas de registro: puede preparar el expediente, y la persona lo registra en su sistema.",
      "**Comprar, aprobar un precio, contratar y desvincular:** la IA puede prepararlas; la persona decide y firma. Si la plataforma las ejecuta, es solo después de esa firma, en el nivel 3.",
      "**Decisiones sobre personas o sobre crédito** (seleccionar, evaluar el desempeño, dar crédito): las toma una persona, con revisión humana significativa (ver la nota).",
      "**Hacia los clientes:** ninguna respuesta sale sin que la envíe una persona. El Comité puede autorizar, por canal y después de un piloto medido, que las respuestas solo informativas (estado de un pedido, horario, disponibilidad) salgan en nivel 2."
     ]
    },
    {
     "t": "nota",
     "titulo": "Revisión humana significativa",
     "x": "Cuando la IA interviene en una decisión sobre una persona —seleccionar, evaluar, dar crédito—, revisa quien tiene la autoridad y la formación para decidir: entiende en qué se basa el resultado, lo evalúa con la evidencia y puede apartarse de él; si se aparta o rechaza, registra el motivo. La IA nunca rechaza ni descarta de forma automática."
    },
    {
     "t": "h",
     "x": "Cómo sube de nivel un agente"
    },
    {
     "t": "pasos",
     "items": [
      {
       "t": "Historial medido",
       "x": "Al menos un ciclo completo de operación en su nivel actual, con la tasa de aciertos sin corrección y las correcciones registradas en la sala de agentes."
      },
      {
       "t": "Propuesta del dueño del proceso",
       "x": "Con la evidencia, el riesgo de equivocarse y cómo se deshace una acción."
      },
      {
       "t": "Evaluación de Tecnología, Gobernanza y Riesgo",
       "x": "Comprueba controles, rastro y freno."
      },
      {
       "t": "Aprobación del Comité de Gobierno del Dato e IA",
       "x": "Queda registrada con su fecha y su condición de revisión. El Comité puede bajar de nivel a cualquier agente en cualquier momento."
      }
     ]
    },
    "Todo agente tiene un **freno**: Tecnología, Gobernanza y Riesgo puede detenerlo de inmediato, y el freno general detiene a todos. Las equivalencias con las escalas usadas antes están en el [[sec:anexos|anexo E]]."
   ]
  },
  {
   "id": "casos",
   "num": "6",
   "titulo": "Aprobación de casos de uso",
   "estado": "borrador",
   "que": [
    "Hay muchas iniciativas de IA en marcha, nacidas en cada área: tableros, aplicaciones de garantías, herramientas de márgenes. El problema no es que existan, sino que nadie sabe cuáles hay, cuánto cuestan, qué datos tocan ni si dan resultado. Todo caso de uso, nuevo o ya construido, entra a un mismo inventario y pasa por el mismo ciclo."
   ],
   "como": [
    "El ciclo es el del proceso [[proc:5.2]]: registro, inventario y revisión de duplicidad, evaluación técnica y de riesgo, priorización y decisión del Comité, quién lo construye, construcción y prueba, validación antes de producción y medición del beneficio a los 90 días. Para la IA se agregan cinco condiciones:",
    {
     "t": "lista",
     "num": true,
     "items": [
      "Cada caso declara su **nivel de autonomía** y quién firma.",
      "Antes de operar corre un **piloto en paralelo** con un criterio de salida fijado de antemano.",
      "Cada cambio de instrucciones o de modelo pasa una **evaluación** con casos reales antes de llegar a producción.",
      "Su costo, aciertos, correcciones y quejas se **monitorean** cada mes.",
      "Si su métrica cae bajo el umbral dos meses seguidos, se **revisa o se retira** y se liberan sus accesos."
     ]
    },
    {
     "t": "nota",
     "tipo": "alerta",
     "titulo": "Casos de alto riesgo",
     "x": "Se tratan como de alto riesgo los casos que seleccionan o evalúan personas o deciden sobre crédito. Antes del piloto llevan una evaluación de impacto (privacidad, equidad y efectos sobre las personas) que firma el dueño del proceso y revisa Consultoría Jurídica; sus criterios no usan atributos protegidos ni indicadores indirectos de ellos, y se revisan periódicamente en busca de sesgo."
    },
    "El inventario priorizado de los casos propuestos está en [[doc:casos/top|Casos de uso de IA]]. El formulario de registro está en el [[sec:anexos|anexo D]].",
    {
     "t": "nota",
     "titulo": "Lo que ya existe",
     "x": "En los 90 días siguientes a la aprobación, cada área registra las herramientas de IA que ya construyó o usa. Las que cumplen la política siguen; las que no, se ajustan o se retiran con un plan."
    }
   ]
  },
  {
   "id": "desarrollo",
   "num": "7",
   "titulo": "Desarrollo por las áreas",
   "estado": "borrador",
   "que": [
    "Que las áreas construyan sus propias herramientas con IA es bueno: conocen su trabajo mejor que nadie. El riesgo aparece cuando lo construido se conecta a los sistemas del grupo con credenciales prestadas, sin respaldo y sin que nadie más sepa que existe. La política no prohíbe construir; pone una regla para conectar."
   ],
   "como": [
    {
     "t": "lista",
     "items": [
      "**Autoservicio:** un área puede construir con una herramienta autorizada lo que use solo dentro de su equipo, con información permitida para su nivel y sin conectarlo a ningún sistema.",
      "**Todo lo que se conecta pasa por Tecnología:** si lee o escribe en Odoo, Lark, EBS, la plataforma o cualquier sistema del grupo, se registra como caso de uso, lo evalúa Tecnología, Gobernanza y Riesgo y se le dan accesos propios con mínimo privilegio. Nunca credenciales de administrador ni de una persona.",
      "**El código es del grupo:** lo que se construye con información o sistemas del grupo vive en el repositorio del grupo, no en cuentas personales.",
      "**Validación antes de producción:** seguridad, datos, integración y efecto sobre contabilidad e inventario, sin importar quién lo construyó.",
      "**Seguridad y rastro:** todo lo que use IA trata la información de terceros como dato y nunca como instrucción, tiene el mínimo privilegio y topes de consumo, y registra modelo, versión de instrucciones, entrada, salida, costo y decisión humana. Antes de producción se revisa contra la lista de riesgos de seguridad de aplicaciones con IA de referencia ([[sec:anexos|anexo F]])."
     ]
    }
   ]
  },
  {
   "id": "licencias",
   "num": "8",
   "titulo": "Licencias",
   "estado": "borrador",
   "que": [
    "Una licencia de IA cuesta todos los meses, se use o no. La política asigna licencias por caso de uso y no por cargo, mide su uso y reasigna las que no se aprovechan. Así el presupuesto sigue al valor."
   ],
   "como": [
    {
     "t": "pasos",
     "items": [
      {
       "t": "Solicitud",
       "x": "El líder del equipo solicita la licencia con el caso de uso de cada persona y la información que va a usar."
      },
      {
       "t": "Evaluación y asignación",
       "x": "Tecnología, Gobernanza y Riesgo la evalúa contra la política, la asigna con cuenta corporativa y la registra en el inventario."
      },
      {
       "t": "Formación previa",
       "x": "La licencia se activa cuando la persona completó la formación básica ([[sec:formacion|artículo 9]])."
      },
      {
       "t": "Revisión trimestral",
       "x": "El líder de cada equipo, como dueño de la información de su área, revisa el uso real y propone reasignar las licencias que no se usan."
      },
      {
       "t": "Presupuesto anual",
       "x": "Lo aprueba la Junta con la política; se ajusta con el informe semestral de uso y beneficio."
      }
     ]
    }
   ]
  },
  {
   "id": "formacion",
   "num": "9",
   "titulo": "Formación obligatoria",
   "estado": "borrador",
   "que": [
    "No hay adopción sin formación. Quien usa IA sin saber cómo se equivoca, entrega información que no debía o deja de usarla al primer error. La formación va antes que la licencia y empieza por el liderazgo, porque la adopción viene de arriba hacia abajo."
   ],
   "como": [
    {
     "t": "tabla",
     "cab": [
      "Nivel",
      "Para quién",
      "Contenido mínimo"
     ],
     "filas": [
      [
       "Competencias básicas",
       "Toda persona antes de recibir una licencia",
       "Qué hace y qué no hace la IA, esta política, clasificación de datos, revisión del resultado, ejemplos de su área."
      ],
      [
       "Liderazgo",
       "Junta, Presidencia y direcciones",
       "Gobierno de la IA, lectura de casos y métricas, decisiones reservadas, riesgos."
      ],
      [
       "Por proceso",
       "Dueños y equipos de cada proceso con casos de uso",
       "Cómo se trabaja con el caso de uso de su proceso, cómo se firma y cómo se corrige."
      ],
      [
       "Técnica",
       "Equipo de plataforma y Tecnología",
       "Construcción, evaluación y operación de agentes sobre la arquitectura del grupo."
      ]
     ]
    },
    "El proceso que la organiza es el [[proc:5.3]]; la imparte Formación (Universidad Corporativa) con Tecnología. Esta política es contenido obligatorio de todos los niveles."
   ]
  },
  {
   "id": "datos-personales",
   "num": "10",
   "titulo": "Datos personales y cumplimiento",
   "estado": "borrador",
   "que": [
    "El grupo opera en países con reglas distintas sobre datos personales. Panamá, Colombia y Costa Rica tienen ley general, autoridad y plazos para avisar una brecha; Venezuela y Guatemala no tienen ley general, pero sí protecciones constitucionales; en Estados Unidos rigen las reglas de cada estado. Panamá, Colombia, Costa Rica, Guatemala y Venezuela no tienen todavía una ley específica de inteligencia artificial vigente, aunque hay proyectos en curso; en Estados Unidos, Florida no la tiene, aunque otros estados ya regulan su uso en la selección de personal.",
    "La política adopta en todo el grupo la regla más exigente que sea razonable, para que un mismo caso de uso funcione igual en todos los países: consentimiento informado y demostrable, uso limitado a la finalidad, conservación con fecha de borrado y una persona que decide cuando se trata de personas."
   ],
   "como": [
    {
     "t": "tabla",
     "cab": [
      "País",
      "Norma",
      "Consentimiento",
      "Aviso de brecha",
      "Autoridad"
     ],
     "filas": [
      [
       "Panamá",
       "Ley 81 de 2019 y Decreto Ejecutivo 285 de 2021",
       "Previo, informado, inequívoco y trazable; revocable",
       "De inmediato y en máximo 72 horas, a la autoridad y a los titulares",
       "ANTAI"
      ],
      [
       "Colombia",
       "Ley 1581 de 2012 y Decreto 1074 de 2015",
       "Previo, expreso e informado, con prueba; nunca por silencio",
       "15 días hábiles, a la SIC",
       "Superintendencia de Industria y Comercio"
      ],
      [
       "Costa Rica",
       "Ley 8968 y su reglamento",
       "Expreso y escrito",
       "5 días hábiles, al titular y a la autoridad",
       "PRODHAB"
      ],
      [
       "Venezuela",
       "Constitución (arts. 28 y 60) y jurisprudencia del Tribunal Supremo",
       "Previo, libre, informado e inequívoco, por criterio jurisprudencial",
       "Sin plazo legal",
       "Tribunales (hábeas data)"
      ],
      [
       "Guatemala",
       "Sin ley general; protección constitucional",
       "Sin requisito legal general",
       "Sin plazo legal",
       "—"
      ],
      [
       "Estados Unidos (Florida)",
       "Ley estatal de notificación de brechas",
       "No exigido en general",
       "30 días a los afectados",
       "Fiscalía del estado"
      ]
     ]
    },
    {
     "t": "h",
     "x": "Reglas para todo el grupo"
    },
    {
     "t": "lista",
     "items": [
      "**Consentimiento:** cuando un caso de uso trate datos personales con IA, se pide un consentimiento informado, que se pueda demostrar y retirar, con el estándar de Panamá y Colombia. En Costa Rica, además, expreso y escrito.",
      "**Aviso:** dice qué datos se usan, para qué, que interviene la IA, qué proveedor los procesa y en qué país, cuánto tiempo se conservan, cómo ejercer los derechos y cómo pedir que una persona revise.",
      "**Decisiones sobre personas:** nunca las toma solo la IA. En Panamá es un derecho expreso de la persona; en el grupo es regla en todos los países ([[sec:autonomia|artículo 5]]). Cuando se decide sobre una persona con apoyo de IA, se le puede explicar la lógica.",
      "**Evaluación de impacto:** todo caso de uso que trate datos personales con IA y pueda afectar a las personas —seleccionar, evaluar, dar crédito— pasa por una evaluación de impacto de privacidad antes del piloto, como pide la autoridad colombiana para la IA de alto riesgo.",
      "**Conservación:** cada caso fija su plazo y su borrado. Para los CVs de quien no fue seleccionado se propone 12 meses desde el cierre de la vacante, y hasta 24 meses solo con consentimiento aparte para un banco de talento; Consultoría Jurídica lo confirma por país.",
      "**Transferencias al exterior:** los proveedores de IA procesan los datos fuera del país; se cubren con el contrato de cada proveedor ([[sec:proveedores|artículo 14]]) y, cuando la ley lo pida, con consentimiento.",
      "**Minimización:** a la IA se le entrega solo lo necesario; cuando se pueda, sin nombre ni datos de contacto."
     ]
    },
    {
     "t": "nota",
     "tipo": "alerta",
     "titulo": "Validación jurídica",
     "x": "Este artículo resume investigación documental del 09-oct-2026; no es asesoría legal. Consultoría Jurídica lo valida antes de su aprobación y lo mantiene al día: hay proyectos de ley de IA en trámite en Panamá y Colombia, y la Red Iberoamericana de Protección de Datos actualizó sus estándares en 2026."
    }
   ]
  },
  {
   "id": "transparencia",
   "num": "11",
   "titulo": "Transparencia",
   "estado": "borrador",
   "que": [
    "Quien es afectado por una decisión o una comunicación en la que intervino la IA tiene derecho a saberlo. La transparencia también protege al grupo: evita la sorpresa y la desconfianza."
   ],
   "como": [
    {
     "t": "lista",
     "items": [
      "**Clientes:** cuando una conversación la atiende una persona con apoyo de IA, no hace falta avisarlo; si alguna vez responde un agente sin intervención humana (nivel 2 autorizado), el canal lo dice.",
      "**Candidatos:** antes de postularse se les informa que la IA ayuda a ordenar las postulaciones, que una persona decide y cómo pedir revisión humana.",
      "**Colaboradores:** se les informa qué casos de uso tocan su información o su trabajo, con qué fin y quién responde.",
      "**Contenido publicado:** lo que el grupo publica hecho con IA (textos, imágenes) lo revisa una persona antes, y no se presenta como fotografía o testimonio real lo que no lo es.",
      "**Explicación y revisión:** quien es afectado por una decisión en la que intervino la IA puede pedir que se le explique y que una persona la revise, por un canal conocido y con un plazo de respuesta."
     ]
    }
   ]
  },
  {
   "id": "propiedad",
   "num": "12",
   "titulo": "Propiedad intelectual y contenido generado",
   "estado": "borrador",
   "que": [
    "Lo que se produce con IA en el trabajo es del grupo, igual que cualquier otro trabajo. Pero la IA puede reproducir material de terceros, y el grupo maneja información que no es suya: la de las marcas que representa y la de sus fábricas."
   ],
   "como": [
    {
     "t": "lista",
     "items": [
      "Lo que se produce con IA en el ejercicio del trabajo es propiedad del grupo.",
      "No se carga en una herramienta de IA información de terceros entregada con reserva —documentación de marcas representadas, de fábricas o de socios— sin que su contrato lo permita.",
      "Las piezas de marca hechas con IA se revisan contra los lineamientos de la marca y no usan logotipos, imágenes ni nombres de terceros sin autorización.",
      "Consultoría Jurídica resuelve las dudas sobre derechos y licencias de uso."
     ]
    }
   ]
  },
  {
   "id": "incidentes",
   "num": "13",
   "titulo": "Incidentes de IA",
   "estado": "borrador",
   "que": [
    "Un incidente de IA es cualquier hecho en que la IA, o su uso, causa o pudo causar daño: información que salió a donde no debía, una respuesta equivocada que llegó a un cliente, un agente que hizo algo que no debía o una decisión injusta. Lo importante es reportarlo rápido, frenarlo y aprender."
   ],
   "como": [
    {
     "t": "pasos",
     "items": [
      {
       "t": "Reporte",
       "x": "Quien lo detecta lo reporta a Tecnología, Gobernanza y Riesgo en cuanto lo sabe, y siempre antes de 24 horas. Reportar a tiempo nunca se sanciona."
      },
      {
       "t": "Contención",
       "x": "Se detiene el agente o se suspende el acceso con el freno; si es necesario, el freno general."
      },
      {
       "t": "Evaluación",
       "x": "Qué pasó, a quién afecta, qué información salió. Si hay datos personales, Consultoría Jurídica activa los avisos legales: en Panamá de inmediato y en máximo 72 horas; en Costa Rica, 5 días hábiles; en Colombia, 15 días hábiles; en Florida, 30 días a los afectados ([[sec:datos-personales|artículo 10]])."
      },
      {
       "t": "Corrección y aprendizaje",
       "x": "Se corrige la causa, se agrega el caso a la evaluación del agente para que no se repita y se registra en el inventario."
      },
      {
       "t": "Informe",
       "x": "Los incidentes se presentan al Comité cada mes y a la Junta en el informe semestral."
      }
     ]
    },
    "Sigue el procedimiento general de incidentes del proceso [[proc:14.4]], con lo propio de la IA."
   ]
  },
  {
   "id": "proveedores",
   "num": "14",
   "titulo": "Proveedores de IA",
   "estado": "borrador",
   "que": [
    "Cuando el grupo usa la IA de un proveedor, le entrega información. La política exige que esa relación esté escrita en un contrato que proteja la información del grupo y de las personas: que el proveedor no la use para entrenar sus modelos, que la conserve el menor tiempo posible, que avise si hay una brecha y que se pueda auditar."
   ],
   "como": [
    {
     "t": "lista",
     "items": [
      "**Contrato y acuerdo de tratamiento de datos** con cada proveedor, firmado por una cuenta corporativa del grupo y revisado por Consultoría Jurídica. No se usa ningún proveedor bajo los términos de una cuenta personal.",
      "**Sin entrenamiento:** el proveedor no usa los datos del grupo para entrenar o mejorar sus modelos.",
      "**Retención limitada:** el menor plazo disponible; en casos con datos personales sensibles, retención cero cuando el proveedor la ofrezca y se apruebe, y nunca se guardan CVs ni datos personales en almacenamientos del proveedor (archivos, asistentes, bases vectoriales).",
      "**Brechas:** el proveedor avisa sin demora y en un plazo compatible con los plazos legales del grupo ([[sec:datos-personales|artículo 10]]).",
      "**Subencargados y auditoría:** lista publicada de subencargados, derecho a objetar los nuevos y evidencia de auditoría o certificación de seguridad.",
      "**Transferencias:** para los datos que salen de Panamá se usan las cláusulas modelo de la Red Iberoamericana, que la autoridad panameña admite sin autorización previa; Estados Unidos ya es país adecuado para Colombia.",
      "**Condiciones de uso del proveedor:** se cumplen; las de OpenAI, por ejemplo, exigen revisión humana en decisiones de empleo; las de Anthropic, por confirmar con sus términos."
     ]
    },
    {
     "t": "tabla",
     "cab": [
      "Proveedor",
      "Para qué",
      "Estado del contrato"
     ],
     "filas": [
      [
       "Anthropic (API y licencias Claude)",
       "Toda la IA de la plataforma y el uso asistencial",
       "Por formalizar a nombre del grupo; retención y acuerdo de tratamiento por verificar en el contrato"
      ],
      [
       "OpenAI (API)",
       "Solo voz e imágenes",
       "Su acuerdo de servicios incluye el de tratamiento de datos y no entrena con datos de la API; la retención cero requiere aprobación"
      ],
      [
       "Supabase, Vercel o Cloudflare, GitHub",
       "Plataforma, front y código",
       "Por formalizar a nombre del grupo; ver el [[doc:tecnico/triangulo|documento técnico]]"
      ]
     ]
    }
   ]
  },
  {
   "id": "revision",
   "num": "15",
   "titulo": "Revisión y vigencia",
   "estado": "borrador",
   "que": [
    "La IA cambia rápido: los modelos, los precios, las leyes y lo que el grupo aprende de su propio uso. La política se revisa con un ritmo fijo y cada vez que algo importante cambia."
   ],
   "como": [
    {
     "t": "lista",
     "items": [
      "**Cada seis meses**, Gobierno de IA revisa la política, el inventario de casos, licencias y accesos, y los incidentes; el Comité la revisa y la eleva a la Junta con el informe de uso y beneficio.",
      "**De forma extraordinaria**, ante un incidente grave, un cambio de ley o un cambio de proveedor.",
      "Cada versión queda registrada con su fecha, sus cambios y su aprobación."
     ]
    }
   ]
  },
  {
   "id": "incumplimiento",
   "num": "16",
   "titulo": "Incumplimiento",
   "estado": "borrador",
   "que": [
    "La política busca ordenar y proteger, no castigar. Pero sin consecuencias no hay política."
   ],
   "como": [
    {
     "t": "lista",
     "items": [
      "Ante un incumplimiento se suspende el acceso o la licencia involucrada mientras se evalúa.",
      "La primera respuesta es corregir y formar; la reincidencia o el daño grave se tratan según el reglamento interno y la ley laboral de cada país.",
      "Los terceros que incumplan responden según su contrato y su acuerdo de confidencialidad.",
      "Reportar un incidente propio a tiempo atenúa la responsabilidad."
     ]
    }
   ]
  },
  {
   "id": "anexos",
   "num": "A",
   "titulo": "Anexos",
   "estado": "borrador",
   "bloques": [
    {
     "t": "h",
     "x": "A. Matriz de responsabilidades"
    },
    {
     "t": "tabla",
     "cab": [
      "Actividad",
      "Junta",
      "Comité",
      "Gobierno de IA",
      "Tecnología, Gobernanza y Riesgo",
      "Jurídica",
      "Dueño del proceso"
     ],
     "filas": [
      [
       "Aprobar la política y el presupuesto",
       "A",
       "C",
       "R",
       "C",
       "C",
       "I"
      ],
      [
       "Mantener la política y el inventario",
       "I",
       "C",
       "A/R",
       "C",
       "C",
       "I"
      ],
      [
       "Aprobar un caso de uso y su nivel",
       "I",
       "A",
       "C",
       "C",
       "C",
       "R"
      ],
      [
       "Subir de nivel a un agente",
       "I",
       "A",
       "C",
       "R",
       "I",
       "R"
      ],
      [
       "Implantar y operar agentes y licencias",
       "I",
       "I",
       "C",
       "A/R",
       "I",
       "C"
      ],
      [
       "Evaluación de impacto de un caso con datos personales",
       "I",
       "A",
       "C",
       "C",
       "R",
       "R"
      ],
      [
       "Atender un incidente de IA",
       "I",
       "I",
       "C",
       "A/R",
       "R",
       "C"
      ],
      [
       "Informe semestral",
       "A",
       "R",
       "R",
       "C",
       "I",
       "C"
      ]
     ]
    },
    "R = responsable de hacerlo · A = aprueba y rinde cuentas · C = consultado · I = informado.",
    {
     "t": "h",
     "x": "B. Clasificación de los datos: ejemplos"
    },
    {
     "t": "tabla",
     "cab": [
      "Nivel",
      "Ejemplos"
     ],
     "filas": [
      [
       "Público",
       "Catálogo y fichas técnicas publicadas, precios de venta al público, comunicados, vacantes publicadas."
      ],
      [
       "Interno",
       "Manuales y procedimientos, organigramas sin datos personales, actas no sensibles, material de formación."
      ],
      [
       "Confidencial",
       "Listas de precios y condiciones por cliente, costos y márgenes, inventario y tránsito, pronósticos, contratos, información de marcas representadas y de fábricas, sell-out de clientes."
      ],
      [
       "Restringido",
       "Datos de contacto e identificación de clientes, candidatos y colaboradores; CVs; salarios y nómina; datos de salud; estados financieros no publicados; credenciales y llaves."
      ]
     ]
    },
    {
     "t": "h",
     "x": "C. Herramientas autorizadas"
    },
    {
     "t": "tabla",
     "cab": [
      "Herramienta",
      "Uso",
      "Nivel máximo de datos"
     ],
     "filas": [
      [
       "Licencias corporativas de Claude",
       "Asistente de uso general",
       "Confidencial, en casos de uso aprobados; nunca credenciales"
      ],
      [
       "Plataforma del grupo (API de Anthropic; OpenAI para voz e imágenes)",
       "IA dentro de los módulos",
       "Restringido, en casos aprobados con evaluación de impacto"
      ],
      [
       "Lark",
       "Colaboración, avisos y firma",
       "Según la clasificación vigente del grupo"
      ]
     ]
    },
    "Gobierno de IA mantiene esta lista. Una herramienta nueva entra después de la evaluación de Tecnología, Gobernanza y Riesgo y, si toca datos personales, de Consultoría Jurídica.",
    {
     "t": "h",
     "x": "D. Registro de un caso de uso"
    },
    {
     "t": "lista",
     "items": [
      "El problema y quién lo tiene.",
      "Qué haría la IA y en qué nivel de autonomía; quién firmaría.",
      "Qué datos usa y su nivel de clasificación; si toca datos personales.",
      "Quién lo usaría y con qué frecuencia.",
      "El beneficio esperado y cómo se mediría, con su línea base.",
      "La herramienta propuesta y si ya existe algo construido.",
      "Los sistemas a los que se conectaría."
     ]
    },
    {
     "t": "h",
     "x": "E. Equivalencias de las escalas de autonomía"
    },
    {
     "t": "tabla",
     "cab": [
      "Esta política",
      "Diagnóstico de la Fase 1",
      "La torre de datos (Fase 1)"
     ],
     "filas": [
      [
       "1 · Prepara",
       "Informar; recomendar o preparar, y la persona confirma",
       "Preparé"
      ],
      [
       "2 · Hace y avisa",
       "Escritura gobernada: autónoma, acotada y de bajo riesgo (conector a Odoo)",
       "Hice"
      ],
      [
       "3 · Decide con firma previa",
       "Decidir: reservado a la persona; el agente deja todo listo",
       "Tu firma"
      ]
     ]
    },
    {
     "t": "h",
     "x": "F. Marcos de referencia"
    },
    {
     "t": "tabla",
     "cab": [
      "Marco",
      "Qué toma esta política"
     ],
     "filas": [
      [
       "ISO/IEC 42001:2023 (sistema de gestión de IA)",
       "Política, roles, evaluación de riesgos e impacto, inventario, competencia, auditoría y revisión por la dirección."
      ],
      [
       "ISO/IEC 42005:2025 (evaluación de impacto)",
       "Cuándo y cómo se evalúa el impacto de un caso que afecta a personas."
      ],
      [
       "NIST AI RMF 1.0 y su perfil de IA generativa",
       "Gobernar, mapear, medir y gestionar; inventario, terceros, supervisión humana y desactivación."
      ],
      [
       "Principios de IA de la OCDE (2024)",
       "Principios, transparencia y poder anular o retirar cualquier sistema."
      ],
      [
       "Recomendación de la UNESCO sobre la ética de la IA",
       "La responsabilidad final siempre es humana; aviso y explicación a los afectados."
      ],
      [
       "Estándares Iberoamericanos de Protección de Datos (2026)",
       "Qué es una revisión humana significativa y cuándo hace falta evaluación de impacto."
      ],
      [
       "OWASP Top 10 para aplicaciones con modelos de lenguaje (2025)",
       "Seguridad de lo que se construye: instrucciones maliciosas, fuga de información, exceso de autonomía."
      ],
      [
       "Reglamento Europeo de IA (solo referencia)",
       "Qué usos se tratan como de alto riesgo: reclutamiento, evaluación de personas y crédito."
      ]
     ]
    },
    {
     "t": "h",
     "x": "G. Glosario"
    },
    {
     "t": "tabla",
     "cab": [
      "Término",
      "Significado en esta política"
     ],
     "filas": [
      [
       "Caso de uso",
       "Lo que hace la IA dentro de un proceso o un módulo, con un dueño y una métrica."
      ],
      [
       "Agente",
       "Un programa que usa IA para hacer una tarea dentro de la plataforma, con un nivel de autonomía fijado."
      ],
      [
       "Nivel de autonomía",
       "Cuánto puede hacer un agente sin una persona: prepara, hace y avisa, o decide con firma previa."
      ],
      [
       "Firma",
       "La aprobación registrada de la persona con autoridad antes de que algo se ejecute o salga del grupo. Es una aprobación interna, no una firma electrónica con validez legal."
      ],
      [
       "Freno",
       "El mecanismo para detener de inmediato un agente o a todos."
      ],
      [
       "Revisión humana significativa",
       "La de una persona con autoridad y formación que entiende el resultado, lo evalúa y puede apartarse de él con un motivo registrado."
      ],
      [
       "Evaluación de impacto",
       "El análisis previo de los efectos de un caso de uso sobre las personas y sus datos, con sus medidas."
      ],
      [
       "Retención cero",
       "Cuando el proveedor no conserva lo que se le envía después de responder."
      ]
     ]
    }
   ]
  }
 ]
};
