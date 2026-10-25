/* Perfil del Líder de Gobierno de IA — Fase 2.
 * Fuente de documento.html?d=perfil (la pinta ia-doc.js). Define el cargo de la
 * Gerencia Corporativa de Gobierno de IA de la estructura To-Be (hoy vacante):
 * qué gobierna, la red de constructores que dirige para hacer crecer el sistema
 * Kenex, sus competencias, requisitos e indicadores. Se edita a mano. */
window.IA_DOC = {
 "id": "perfil",
 "ceja": "Arquitectura de IA · Estructura organizativa To-Be",
 "titulo": "Líder de Gobierno de IA",
 "lede": "El perfil de quien ocupará la Gerencia Corporativa de Gobierno de IA, hoy vacante. Gobierna la adopción de la IA en todo el grupo y dirige a las personas de cualquier área que, con Claude Code y las reglas de esta arquitectura, hacen crecer el sistema Kenex según las prioridades del negocio.",
 "estado": "borrador",
 "version": "0.1",
 "corte": "25-oct-2026",
 "secciones": [
  {
   "id": "cargo",
   "num": "1",
   "titulo": "El cargo",
   "estado": "borrador",
   "bloques": [
    {"t": "tabla", "cab": ["Campo", "Detalle"], "filas": [
     ["Denominación", "Gerente Corporativo de Gobierno de IA. Como perfil profesional: Líder de Gobierno de IA (AI Governance Lead)."],
     ["Unidad", "Gobierno de IA, gerencia corporativa de staff de la capa corporativa."],
     ["Reporta a", "La Presidencia, directo."],
     ["Lidera", "El Comité de Gobierno del Dato e IA y la red de constructores del sistema Kenex: un equipo que dirige y gobierna aunque sus integrantes trabajen en otras áreas ([[sec:constructores|sección 4]])."],
     ["Alcance", "Todo el grupo: Panamá, Venezuela y Colombia, y Estados Unidos donde se nombra."],
     ["Ocupante", "Vacante. El perfil aún no existe en el grupo."]
    ]}
   ]
  },
  {
   "id": "proposito",
   "num": "2",
   "titulo": "Propósito",
   "estado": "borrador",
   "bloques": [
    "Gobernar la adopción de la inteligencia artificial en Kenex para que genere valor medible en los procesos sin poner en riesgo el dato, a los clientes ni a las personas. Articula la estrategia, la tecnología, el talento, los procesos y los controles, y asegura que cada uso de la IA responda a los objetivos del negocio.",
    "El cargo tiene dos frentes. El primero es el **gobierno**: la política, el inventario, los riesgos y el nivel de autonomía de cada agente. El segundo es el **crecimiento del sistema Kenex**: dirige a las personas de cualquier área que construyen las ampliaciones de la plataforma con Claude Code y las ordena según las prioridades del negocio y sus flujos transversales. Así, hacer crecer el sistema no recae solo en Tecnología.",
    "La función no es un proyecto temporal ni se reduce a Tecnología, a Recursos Humanos o a cumplimiento. Es una capacidad permanente del grupo, con mandato, equipo, servicios, presupuesto, decisiones, métricas y una rutina de operación. Su regla de fondo es la de todo el proyecto: **el dato antes que el agente**. Ningún agente trabaja sobre un dato sin certificar."
   ]
  },
  {
   "id": "lugar",
   "num": "3",
   "titulo": "Dónde se ubica",
   "estado": "borrador",
   "que": [
    "Reporta directo a la Presidencia, en la capa corporativa de staff, al lado de Tecnología, Gobernanza del Dato y Cumplimiento y sin depender de ella. La estructura lo explica así: **quien aprueba los usos de la IA no es quien los publica**. Gobierno de IA fija las reglas, prioriza y guía a quienes construyen; Tecnología, Gobernanza del Dato y Cumplimiento cuida la plataforma, revisa lo construido y lo pasa a producción."
   ],
   "como": [
    {"t": "tabla", "cab": ["Con quién", "Cómo se relaciona"], "filas": [
     ["Presidencia", "Le reporta. Patrocina la adopción y da peso a las decisiones del Comité ante las direcciones."],
     ["Junta Directiva", "Aprueba la política de adopción y el presupuesto de licencias y plataforma. Recibe cada semestre el informe de uso, beneficio e incidentes que Gobierno de IA prepara con el Comité."],
     ["Comité de Gobierno del Dato e IA", "Lo lidera y lo convoca. Formato principal: Gobierno de IA, Tecnología, Gobernanza del Dato y Cumplimiento, Finanzas y Comercial. Formato ampliado: Desarrollo Corporativo, Innovación y Desarrollo de Productos, Compras y Cadena de Suministro, E-commerce, Experiencia Digital, Consultoría Jurídica y Tecnología de Información."],
     ["Tecnología, Gobernanza del Dato y Cumplimiento", "Es dueña del repositorio, de producción, de las cuentas y de las llaves. Revisa y publica lo que construye la red, y su equipo de plataforma construye lo central. Le presenta el registro de agentes, sus riesgos y sus incidentes."],
     ["Direcciones y áreas del negocio", "Aportan sus entusiastas a la red de constructores: siguen en su área, pero en el trabajo de la red responden a Gobierno de IA. Ponen además el dueño de producto de cada ampliación."],
     ["PMO", "Lleva la cartera de casos de uso y su avance. Gobierno de IA decide con el Comité qué entra, con qué nivel de autonomía y quién lo construye."],
     ["Formación · Universidad Corporativa", "Imparte la formación general con Tecnología. Gobierno de IA fija qué debe saber cada rol y verifica que la formación vaya antes que la licencia."],
     ["Consultoría Jurídica", "Valida datos personales, contratos con proveedores y propiedad intelectual, y activa los avisos legales ante un incidente."],
     ["Dueños de proceso", "Proponen los casos, responden por su beneficio y firman lo que la IA prepara en su proceso."]
    ]}
   ]
  },
  {
   "id": "constructores",
   "num": "4",
   "titulo": "La red de constructores",
   "estado": "borrador",
   "intro": "Las personas de cualquier área que hacen crecer el sistema Kenex con Claude Code, guiadas por Gobierno de IA.",
   "que": [
    "En el grupo ya hay personas que construyen con IA por su cuenta: reportes con Claude en mercadeo, auxiliares contables, una aplicación de seguimiento de garantías, cruces de cientos de transacciones entre empresas. El inventario de la Fase 1 cuenta catorce aplicativos creados así ([[doc:casos/x-islas-de-ia|caso 54]]). Es talento que conoce su trabajo mejor que nadie, pero hoy construye aislado, con cuentas personales y sin que nadie más sepa qué existe.",
    "El Líder de Gobierno de IA reúne a esos entusiastas en una **red de constructores** y la dirige como su equipo. Sus integrantes siguen en su área, porque desde ahí conocen el trabajo, pero en lo que construyen para el sistema están **bajo el mando de Gobierno de IA**: responden a esta gerencia por una línea funcional, además de la que los une a su área. Gobierno de IA decide quién se suma, qué construye cada uno y en qué orden según las prioridades del negocio, con qué estándar y dentro de qué estructura, y evalúa su trabajo en la red. Así el crecimiento del sistema **no recae solo en Tecnología**, y Tecnología se concentra en lo que solo ella puede hacer: el espejo, los conectores, la seguridad y producción.",
    "La red construye con **Claude Code** y con las estructuras de esta arquitectura: el mismo repositorio, el mismo modelo de datos sobre el espejo, la misma sala de agentes y la misma escala de autonomía. Lo que hace no es una isla nueva sino una ampliación del sistema, ordenada por los flujos transversales del grupo, del plan de demanda al cobro, y no por la conveniencia de cada área."
   ],
   "como": [
    {"t": "h", "x": "Del pedido a producción"},
    {"t": "pasos", "items": [
     {"t": "Entra el pedido", "x": "Un área o un constructor registra la idea como caso de uso ([[proc:5.2]]). Gobierno de IA revisa si ya existe algo igual, a qué flujo transversal pertenece y en qué ola cae."},
     {"t": "Se prioriza y se asigna", "x": "El Comité decide con la cartera de la PMO, por valor, viabilidad y riesgo. Gobierno de IA asigna el trabajo a constructores de la red o al equipo de plataforma de Tecnología, según lo que toque."},
     {"t": "Se construye", "x": "El constructor trabaja con Claude Code en una rama del repositorio del grupo, sobre el modelo de datos del espejo y con datos de prueba. El dueño de producto del área escribe las reglas y acepta lo entregado."},
     {"t": "Se revisa y se publica", "x": "Tecnología, Gobernanza del Dato y Cumplimiento revisa el código, corre las pruebas y lo pasa a producción en la ventana nocturna ([[doc:tecnico/github|repositorio, pruebas y despliegue]]). Lo escrito con Claude Code pasa la misma revisión que lo escrito a mano."},
     {"t": "Se mide", "x": "A los 90 días se mide el beneficio. Lo que no rinde se revisa o se retira, y se liberan sus accesos."}
    ]},
    {"t": "h", "x": "Las reglas de la red"},
    {"t": "lista", "items": [
     "**Todo vive en el sistema Kenex.** Nada se conecta por fuera a Odoo, Lark, EBS ni a la plataforma ([[doc:politica/desarrollo|política, artículo 7]]). El código es del grupo y vive en su repositorio.",
     "**Nadie publica su propio trabajo.** Lo publica Tecnología después de la revisión y las pruebas.",
     "**Las prioridades son del negocio.** El orden lo fija el Comité sobre la cartera, no el entusiasmo de cada quien.",
     "**Ningún agente sube de nivel sin evidencia**, lo construya quien lo construya ([[doc:politica/autonomia|política, artículo 5]]).",
     "**El constructor se forma antes de construir:** la política, la arquitectura, el repositorio y Claude Code ([[doc:politica/formacion|nivel técnico de la formación]])."
    ]},
    {"t": "h", "x": "Quién hace qué"},
    {"t": "tabla", "cab": ["Rol", "Qué hace", "Qué no hace"], "filas": [
     ["Gobierno de IA", "Dirige la red como su equipo: decide quién se suma, forma a los constructores, les asigna el trabajo según las prioridades, evalúa su desempeño en la red, cuida el estándar y lleva el inventario de lo construido.", "No publica ni opera producción."],
     ["Constructores de la red", "Construyen ampliaciones con Claude Code dentro del repositorio y de la arquitectura, desde su área. En el trabajo de la red responden a Gobierno de IA.", "No conectan nada por fuera ni publican su propio trabajo."],
     ["Tecnología, Gobernanza del Dato y Cumplimiento", "Es dueña del repositorio, de producción, de las cuentas y de las llaves. Revisa, prueba y publica. Su equipo de plataforma construye lo central: el espejo, los conectores y la seguridad.", "No decide qué se construye primero."],
     ["Dueño de producto del área", "Escribe las reglas, acepta cada entrega y responde por el beneficio.", "No es un cargo nuevo."],
     ["Comité de Gobierno del Dato e IA", "Prioriza la cartera y aprueba cada uso de la IA y su nivel.", "No construye."],
     ["Área de origen del constructor", "Cede a la persona el tiempo acordado para la red y evalúa con Gobierno de IA su desempeño.", "No dirige el trabajo de la red."]
    ]}
   ]
  },
  {
   "id": "responsabilidades",
   "num": "5",
   "titulo": "Responsabilidades",
   "estado": "borrador",
   "bloques": [
    "Se ordenan en seis frentes. Cada uno nombra lo que el cargo asume en Kenex.",
    {"t": "tabla", "cab": ["Frente", "Qué asume"], "filas": [
     ["Estrategia y negocio", "Mantiene la cartera de casos de uso priorizada por valor, viabilidad y riesgo, por olas, con la tesis de valor de cada caso. Exige a cada uno su métrica, su línea base y su meta, y que el beneficio se mida a los 90 días. Propone a la Junta el presupuesto de licencias y plataforma con el retorno medido."],
     ["Tecnología y datos", "Conoce la arquitectura (Odoo de cada país y EBS abajo, el espejo y el dato certificado en el núcleo) lo bastante para juzgar si un caso es viable y para orientar a los constructores. Mantiene la lista de herramientas autorizadas con su nivel máximo de datos, define qué registra la ficha de cada agente y verifica que ningún agente use un dato sin certificar."],
     ["Personas y cultura", "Dirige el equipo de la red de constructores: decide quién entra, los forma y los mantiene activos. Fija las competencias por rol de los cuatro niveles de formación de la política, vela por que la formación vaya antes que la licencia y empiece por el liderazgo, y mide la adopción real con una red de multiplicadores, al menos uno por área."],
     ["Gobernanza y riesgos", "Redacta y mantiene la política de adopción y sus anexos, y la revisa cada seis meses. Propone al Comité el nivel de autonomía de cada agente (1 prepara · 2 hace y avisa · 3 decide con firma previa) y cuándo sube de nivel. Lleva el registro de riesgos y el inventario de casos, herramientas y agentes, exige evaluación de impacto a los casos de alto riesgo y sigue los incidentes de IA hasta su cierre."],
     ["Procesos y operaciones", "Dirige el ciclo de aprobación de casos del proceso [[proc:5.2]]. Ordena el crecimiento del sistema por los flujos transversales del grupo, no por áreas. Opera el catálogo de servicios de la gerencia (recepción de pedidos, asesoría, evaluación, acompañamiento, formación y supervisión) y sostiene la rutina: Comité mensual, revisión semestral y tablero."],
     ["Liderazgo transversal", "Conduce un Comité de pares de dirección y dirige un equipo cuyos integrantes trabajan en otras áreas: negocia con cada dirección el tiempo de su gente, influye en las prioridades y cierra acuerdos. Coordina entre áreas y entre países, y sostiene la conversación con la Presidencia y la Junta."]
    ]}
   ]
  },
  {
   "id": "competencias",
   "num": "6",
   "titulo": "Competencias",
   "estado": "borrador",
   "bloques": [
    "El nivel que se pide en cada frente al entrar y a los doce meses, en una escala de cuatro niveles: **N1** reconoce y explica · **N2** aplica con apoyo · **N3** diseña y justifica con autonomía · **N4** dirige, supervisa y mejora de forma sostenida.",
    {"t": "tabla", "cab": ["Frente", "Al ingresar", "A los 12 meses"], "filas": [
     ["Estrategia y negocio", "N2 · aplica con apoyo", "N3 · diseña con autonomía"],
     ["Tecnología y datos", "N3 · diseña con autonomía", "N4 · dirige y mejora"],
     ["Personas y cultura", "N2 · aplica con apoyo", "N3 · diseña con autonomía"],
     ["Gobernanza y riesgos", "N3 · diseña con autonomía", "N4 · dirige y mejora"],
     ["Procesos y operaciones", "N2 · aplica con apoyo", "N3 · diseña con autonomía"],
     ["Liderazgo transversal", "N3 · diseña con autonomía", "N4 · dirige y mejora"]
    ]},
    {"t": "nota", "titulo": "Propuesta", "x": "Los niveles son propuesta del equipo consultor. Tecnología y datos arranca en N3 porque el cargo orienta a quienes construyen: tiene que poder revisar lo que hace su red."}
   ]
  },
  {
   "id": "limites",
   "num": "7",
   "titulo": "Qué decide y qué no hace",
   "estado": "borrador",
   "bloques": [
    {"t": "h", "x": "Decide o responde"},
    {"t": "lista", "items": [
     "**Responde por** la política y su inventario: la matriz de la [[doc:politica/gobierno|política]] le da la A y la R.",
     "**Redacta** la política y el presupuesto que aprueba la Junta, y el informe semestral, con el Comité.",
     "**Propone** al Comité los casos, su nivel de autonomía y los cambios de nivel. El Comité los aprueba.",
     "**Dirige** la red de constructores: a quién se suma, qué construye cada uno y en qué orden.",
     "**Mantiene** la lista de herramientas autorizadas y la clasificación de referencia de los datos.",
     "**Pide** el freno de un agente cuando incumple la política."
    ]},
    {"t": "h", "x": "No hace"},
    {"t": "lista", "items": [
     "**No publica ni opera** producción, ni administra cuentas y llaves: eso es de Tecnología, Gobernanza del Dato y Cumplimiento.",
     "**No aprueba solo** lo que construye su red: lo aprueba el Comité y lo revisa Tecnología.",
     "**No lleva** la cartera de proyectos: es de la PMO.",
     "**No imparte** la formación general: es de la Universidad Corporativa con Tecnología. La de los constructores la diseña con Tecnología.",
     "**No decide** lo que la política reserva a las personas en cada proceso: comprar, pagar, aprobar un precio, contratar, desvincular, asientos contables y documentos fiscales."
    ]}
   ]
  },
  {
   "id": "requisitos",
   "num": "8",
   "titulo": "Requisitos de ingreso",
   "estado": "borrador",
   "bloques": [
    "Se ajustan a un grupo de distribución multipaís. No se exige ser desarrollador. Sí se exige construir con IA, porque el cargo dirige a quienes construyen.",
    {"t": "tabla", "cab": ["Requisito", "Qué se pide", "Tipo"], "filas": [
     ["Formación", "Título universitario en administración, ingeniería, economía, sistemas o afines. Posgrado deseable.", "Exigido"],
     ["Experiencia", "Al menos 8 años en gestión, estrategia, operaciones, transformación, tecnología, datos, riesgos, talento o consultoría. De ellos, al menos 3 conduciendo iniciativas entre áreas o entre países.", "Exigido"],
     ["Construir con IA", "Construye con Claude Code a nivel de prototipo y conoce el flujo de repositorio, revisión y pruebas. Tiene que poder leer y cuestionar lo que hace su red.", "Exigido"],
     ["Dirigir equipos distribuidos", "Ha dirigido equipos cuyos integrantes trabajaban en otras áreas o países, en estructuras matriciales.", "Exigido"],
     ["Gobierno y riesgo", "Conoce los marcos de referencia de gestión de la IA (ISO/IEC 42001 y NIST AI RMF) y la protección de datos personales de los países donde opera el grupo (Panamá, Colombia, Costa Rica y Florida).", "Exigido"],
     ["Idiomas", "Español. Inglés para leer normativa, documentación técnica y contratos de proveedores.", "Exigido"],
     ["Sector", "Experiencia en distribución, retail o comercio multipaís, y con un ERP como Odoo.", "Deseable"]
    ]},
    {"t": "nota", "titulo": "Propuesta", "x": "Los años de experiencia y los idiomas son propuesta del equipo consultor. Los fija la Presidencia al abrir la selección."}
   ]
  },
  {
   "id": "indicadores",
   "num": "9",
   "titulo": "Cómo se mide",
   "estado": "borrador",
   "bloques": [
    "Salen del macro 5 del manual, de la política de adopción y de la red de constructores. El cargo no ejecuta todo lo que miden, pero responde por que se cumplan.",
    {"t": "tabla", "cab": ["Indicador", "Cómo se calcula", "Meta", "Frecuencia", "Fuente"], "num": [2], "filas": [
     ["Casos en el inventario", "Desarrollos de IA en uso registrados ÷ desarrollos en uso detectados", "100 %", "Trimestral", "[[proc:5.2]]"],
     ["Autonomía declarada", "Casos en operación con nivel de autonomía y firmante declarados ÷ casos en operación", "100 %", "Trimestral", "[[doc:politica/autonomia|Política, art. 5]]"],
     ["Tiempo de decisión", "Días entre el registro de un caso y la decisión del Comité", "≤ 30 días", "Mensual", "[[proc:5.2]]"],
     ["Beneficio medido", "Casos con beneficio medido a los 90 días ÷ casos con más de 90 días en producción", "≥ 90 %", "Trimestral", "[[proc:5.2]]"],
     ["Red de constructores activa", "Constructores con al menos una entrega aceptada en el trimestre, por dirección", "≥ 1 por dirección a los 12 meses", "Trimestral", "Este perfil"],
     ["Ampliaciones en regla", "Ampliaciones de la red en producción con caso registrado, dueño de producto y revisión de Tecnología ÷ ampliaciones de la red en producción", "100 %", "Trimestral", "[[doc:politica/desarrollo|Política, art. 7]]"],
     ["Uso sostenido tras la formación", "Graduados con uso activo a 60 días ÷ graduados de la cohorte", "≥ 80 %", "Por cohorte", "[[proc:5.3]]"],
     ["Licencias en inventario", "Licencias de IA registradas ÷ licencias pagadas por el grupo", "100 %", "Trimestral", "[[proc:5.1]]"],
     ["Incidentes reportados a tiempo", "Incidentes de IA reportados antes de 24 horas ÷ incidentes de IA", "100 %", "Mensual", "[[doc:politica/incidentes|Política, art. 13]]"],
     ["Agentes sobre dato certificado", "Agentes en operación que solo leen dato certificado ÷ agentes en operación", "100 %", "Trimestral", "Estructura To-Be"],
     ["Revisión semestral", "Política, inventario e incidentes revisados y elevados a la Junta (sí o no)", "Sí", "Semestral", "[[doc:politica/revision|Política, art. 15]]"]
    ]}
   ]
  },
  {
   "id": "noventa",
   "num": "10",
   "titulo": "Los primeros 90 días",
   "estado": "borrador",
   "bloques": [
    "El plan de arranque, con lo que ya está construido en la Fase 2.",
    {"t": "pasos", "items": [
     {"t": "Días 1 a 30 · Levantar la línea base", "x": "Inventariar las licencias, las cuentas y los aplicativos que las áreas construyeron por su cuenta, y a quienes los construyeron: son el núcleo de la red. Conversar con cada integrante del Comité y con los dueños de proceso de la Ola 1. Leer esta arquitectura, la política y los casos priorizados.", "entregable": "Inventario inicial, línea base de uso y costo, y la lista de los primeros constructores."},
     {"t": "Días 31 a 60 · Poner en marcha el gobierno y la red", "x": "Constituir el Comité de Gobierno del Dato e IA con su carta de mandato y su calendario mensual. Llevar la política a la Junta, con la escala de autonomía, la lista de herramientas autorizadas y el registro de riesgos. Acordar con Tecnología la ficha de cada agente, el freno y cómo entra a revisión el trabajo de la red. Formar a la primera cohorte de constructores.", "entregable": "Política aprobada, Comité sesionando y red formada."},
     {"t": "Días 61 a 90 · Primeras ampliaciones", "x": "Primer ciclo de priorización con los casos de la Ola 1, como el [[mod:m-vigia-de-reservas|vigía de reservas]] y el [[mod:m-vigia-del-stage|vigía del stage]], con piloto en paralelo y criterio de salida. Asignar las primeras ampliaciones a la red. Plan de formación con la Universidad Corporativa, empezando por el liderazgo. Primer tablero de adopción, valor y riesgo.", "entregable": "Casos en piloto, primeras ampliaciones de la red en revisión y primer tablero."}
    ]}
   ]
  },
  {
   "id": "pendientes",
   "num": "11",
   "titulo": "Decisiones abiertas",
   "estado": "borrador",
   "bloques": [
    {"t": "lista", "items": [
     "**Contratar o formar.** El perfil no existe hoy en el grupo. La Presidencia decide si se contrata fuera o se forma a alguien de dentro.",
     "**El encaje de los constructores.** Cuánto tiempo dedica cada constructor a la red, cómo se dibuja su línea funcional hacia Gobierno de IA en el organigrama y cómo se evalúa junto con su área. Lo decide la Presidencia con las direcciones.",
     "**Equipo propio de la gerencia.** La propuesta inicial es el gerente y una persona de análisis para el inventario, las evaluaciones y el tablero, apoyados en la red. Se dimensiona con el volumen real de casos.",
     "**El documento técnico y la política ya hablan de quién construye.** La tabla de [[doc:tecnico/equipo|equipo y forma de trabajo]] pone toda la construcción en el equipo de plataforma de Tecnología, y la [[doc:politica/desarrollo|política]] solo prevé el autoservicio de cada área. Falta sumarles la red de constructores, sin cambiar la regla de que nadie publica su propio trabajo.",
     "**El macro 5 del manual quedó atrás de la estructura.** Los procesos [[proc:5.1]], [[proc:5.2]] y [[proc:5.3]] asignan la política a la Gerencia de Tecnología, el ciclo de casos a la PMO y la formación a los gerentes, y nombran un «Comité de Inteligencia Artificial». Hay que alinearlos.",
     "**Tramo de control de la Presidencia.** Con Gobierno de IA como gerencia de staff, la Presidencia tiene ocho reportes directos, uno por encima del rango de 4 a 7. Ya está en los pendientes de la estructura.",
     "**Denominación.** «Gerente Corporativo de Gobierno de IA» sigue la estructura. En el mercado el puesto también se anuncia como «Head of AI Governance» o «Responsable de Gobierno de IA»: es el mismo perfil."
    ]},
    {"t": "nota", "titulo": "Fuentes", "x": "La estructura organizativa To-Be (unidad Gobierno de IA y Comité de Gobierno del Dato e IA), la [[doc:politica/gobierno|política de adopción de IA]], el [[doc:tecnico/equipo|documento técnico]], el macro 5 del manual de procesos y los [[doc:casos/x-islas-de-ia|casos de uso priorizados]]."}
   ]
  }
 ]
};
