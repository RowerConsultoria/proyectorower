/* Descripciones de cargo — Fase 3 (Grupo Kenex · UCAB Consultores)
   Fuente única de la sección «Fase 3» del aplicativo (informe/fase3/descripciones-cargo.html).
   Se edita a mano. Cada descripción sigue el «Esquema_Descripcion_de_Cargo» (v0.2, lista de cargos V5):
   encabezado, secciones I a V y pie. Lo automático no se guarda aquí: el diagrama de posición sale de
   reporta_a y supervisa_a, y la cláusula final, el texto de la Sección V y el pie los pone la página.
   Reglas: sin nombres de personas; «Kenex» con una sola «n»; tono formal; la formalización como
   habilitación. `familias` es el índice de las 26 familias del V5 con sus cargos (sin ocupantes). */
window.DESCRIPCIONES_CARGO = {
  meta: {
    version: 'Piloto · 11-nov-2026',
    lista: 'Catálogo de Cargos V5 (105 códigos, 97 descripciones), sobre la escalera de la estructura patrón de cargos',
    // Modelo de competencias por nivel de cargo (11-nov-2026, propuesta simplificada). Cuatro niveles que agrupan los
    // escalones de la estructura patrón; Supervisor(a) y Especialista comparten escalón pero no nivel. Las genéricas tienen un
    // descriptor por nivel y el cargo exige el de su nivel; las específicas son las del nivel, sin escala, y aplican a
    // todos sus escalones. Competencias y definiciones del diccionario de la Fase 3, sin cambios. Lo lee también la guía.
    niveles_cargo: [
      { nombre: "Dirección y gerencia", escalones: ["Director(a)", "Gerente", "Gerente de unidad de negocio"] },
      { nombre: "Coordinación y supervisión", escalones: ["Coordinador(a)", "Supervisor(a)"] },
      { nombre: "Analistas y especialistas", escalones: ["Especialista", "Analista I", "Analista II", "Analista III"] },
      { nombre: "Apoyo y operación", escalones: ["Auxiliar", "Operario(a)"] }
    ],
    // Escalón de la estructura patrón (fuente de la verdad desde el 11-nov) → nivel de cargo
    escalones: {
      "Director(a)": "Dirección y gerencia",
      "Gerente": "Dirección y gerencia",
      "Gerente de unidad de negocio": "Dirección y gerencia",
      "Coordinador(a)": "Coordinación y supervisión",
      "Supervisor(a)": "Coordinación y supervisión",
      "Especialista": "Analistas y especialistas",
      "Analista I": "Analistas y especialistas",
      "Analista II": "Analistas y especialistas",
      "Analista III": "Analistas y especialistas",
      "Auxiliar": "Apoyo y operación",
      "Operario(a)": "Apoyo y operación"
    },
    // Genéricas: definición y descriptor por nivel de cargo (en el orden de niveles_cargo)
    genericas: [
      { nombre: "Orientación al Cliente y al Servicio", definicion: "Capacidad de identificar y responder a las necesidades de los clientes internos y externos, garantizando una experiencia de calidad, oportuna y coherente con la marca, en cualquier punto de contacto físico o digital.",
        por_nivel: {"Dirección y gerencia": "Define la estrategia de experiencia del cliente para su país o canal, integrando indicadores de satisfacción a la toma de decisiones de negocio. Representa a la organización en la resolución de casos de máxima sensibilidad. Promueve una cultura de servicio en toda la operación bajo su responsabilidad.", "Coordinación y supervisión": "Diseña o ajusta protocolos de servicio para su equipo o punto de atención con base en datos de satisfacción. Gestiona situaciones críticas o de alto impacto reputacional con autonomía. Forma a su equipo en estándares de experiencia del cliente.", "Analistas y especialistas": "Anticipa necesidades frecuentes del cliente y ajusta su atención según el contexto. Resuelve reclamos de complejidad media aplicando criterio dentro de los lineamientos. Retroalimenta a su equipo sobre patrones de insatisfacción detectados.", "Apoyo y operación": "Atiende con cortesía y sigue los protocolos de servicio establecidos. Responde consultas básicas del cliente de forma oportuna. Escala los casos que exceden su alcance sin generar demoras innecesarias."} },
      { nombre: "Orientación a Resultados y Calidad", definicion: "Capacidad de planificar, ejecutar y dar seguimiento al propio trabajo con foco en el cumplimiento de metas, estándares de calidad y plazos, gestionando los recursos disponibles de manera eficiente.",
        por_nivel: {"Dirección y gerencia": "Define los indicadores estratégicos de desempeño de su función o país y rinde cuentas de ellos ante la Dirección. Optimiza procesos completos para mejorar resultados de forma sostenida en el tiempo. Instala una cultura de disciplina de ejecución y medición en su organización.", "Coordinación y supervisión": "Establece metas y estándares de calidad para su equipo o proceso, alineados a los objetivos del área. Gestiona los recursos (tiempo, presupuesto, personas) para asegurar el cumplimiento colectivo. Interviene oportunamente ante desviaciones para corregir el rumbo.", "Analistas y especialistas": "Organiza su carga de trabajo priorizando lo urgente e importante sin supervisión constante. Identifica desviaciones frente a la meta y propone ajustes. Cumple indicadores individuales de forma sostenida.", "Apoyo y operación": "Cumple las tareas asignadas dentro del tiempo y estándar de calidad establecidos. Reporta avances y dificultades a su supervisor de forma oportuna. Verifica su propio trabajo antes de entregarlo."} },
      { nombre: "Alfabetización y Adopción de Inteligencia Artificial", definicion: "Capacidad de comprender el funcionamiento general de las herramientas de Inteligencia Artificial, aplicarlas de forma efectiva y responsable al propio trabajo, y evaluar críticamente sus resultados.",
        por_nivel: {"Dirección y gerencia": "Define la hoja de ruta de adopción de IA para su función o país, priorizando casos de uso por impacto y viabilidad. Participa en el gobierno de IA de la organización (ética, seguridad y uso responsable de datos). Mide y comunica el retorno de la adopción de IA en su ámbito de responsabilidad.", "Coordinación y supervisión": "Rediseña procesos de su equipo o área incorporando IA donde agrega valor real, distinguiendo qué requiere juicio humano. Evalúa críticamente la calidad, los sesgos y las limitaciones de los resultados generados por IA antes de que impacten decisiones. Forma a su equipo en el uso responsable de estas herramientas.", "Analistas y especialistas": "Formula instrucciones (prompts) efectivas para obtener resultados útiles de las herramientas de IA en su trabajo diario. Revisa y corrige los resultados generados por IA antes de utilizarlos. Identifica nuevas tareas de su rol que podrían apoyarse en IA.", "Apoyo y operación": "Comprende qué es la IA y qué tipo de tareas puede apoyar en su rol. Usa las herramientas de IA habilitadas por la organización para tareas puntuales, con supervisión. Sigue las políticas de uso responsable y confidencialidad de la información."} },
      { nombre: "Colaboración y Trabajo en Equipo Multipaís", definicion: "Capacidad de trabajar de forma efectiva con personas de distintas áreas, países y culturas dentro del grupo, compartiendo información y apoyando el logro de objetivos comunes por encima de los intereses individuales o locales.",
        por_nivel: {"Dirección y gerencia": "Construye alianzas estratégicas entre países y funciones para sostener iniciativas corporativas de alto impacto. Representa una visión de grupo por encima de la agenda de un solo país o área. Es referente en la integración de equipos multipaís y multicultural dentro de la organización.", "Coordinación y supervisión": "Lidera la coordinación de su equipo con otras áreas o países en proyectos o procesos compartidos. Gestiona constructivamente los conflictos que surgen entre equipos con intereses distintos. Promueve la estandarización de prácticas entre países cuando agrega valor al grupo.", "Analistas y especialistas": "Coordina su trabajo con otras áreas o países cuando el proceso lo requiere, sin necesidad de escalamiento. Aporta soluciones cuando surgen diferencias de criterio entre equipos. Documenta y comparte el conocimiento que puede ser útil para otras unidades del grupo.", "Apoyo y operación": "Comparte información relevante con su equipo de forma oportuna y clara. Colabora activamente en las tareas asignadas dentro de su equipo. Respeta las diferencias culturales y de estilo de trabajo entre países."} },
      { nombre: "Compromiso Organizacional", definicion: "Grado de identificación con la misión, los valores y los objetivos de la organización, expresado en un desempeño ético, responsable y consistente, incluso en ausencia de supervisión directa.",
        por_nivel: {"Dirección y gerencia": "Modela y sostiene la cultura organizacional en momentos de cambio o crisis. Diseña o valida políticas que refuerzan la ética y la transparencia del grupo. Es reconocido interna y externamente como garante de los valores de la organización.", "Coordinación y supervisión": "Toma decisiones difíciles priorizando el bienestar y la reputación de la organización sobre la conveniencia personal o de corto plazo. Promueve el cumplimiento normativo y ético dentro de su equipo. Es un referente de integridad ante situaciones ambiguas o de presión.", "Analistas y especialistas": "Muestra iniciativa para resolver problemas dentro de su ámbito sin esperar instrucciones. Actúa con transparencia y reporta de forma proactiva cualquier situación que ponga en riesgo a la organización. Mantiene la confidencialidad de la información sensible a la que tiene acceso.", "Apoyo y operación": "Actúa conforme a las normas y políticas de la organización. Cuida los recursos, la información y los activos de la empresa como propios. Cumple sus compromisos y horarios de forma responsable."} },
      { nombre: "Adaptabilidad y Aprendizaje Continuo", definicion: "Capacidad de ajustar el propio comportamiento, conocimientos y forma de trabajar frente a cambios en el entorno, la tecnología o la estrategia de la organización, y de aprender de forma autónoma y continua.",
        por_nivel: {"Dirección y gerencia": "Lidera procesos de transformación organizacional de alto impacto (nuevas tecnologías, modelos de negocio, estructuras). Construye en la organización una cultura de aprendizaje continuo y apertura al cambio. Anticipa tendencias del sector y prepara a la organización con suficiente antelación.", "Coordinación y supervisión": "Anticipa el impacto de los cambios del entorno (mercado, tecnología, estructura) en su equipo y prepara a las personas para afrontarlos. Impulsa la actualización de procesos y competencias de su equipo frente a nuevas exigencias. Convierte los errores en aprendizaje visible para su equipo.", "Analistas y especialistas": "Se adapta con rapidez a cambios de prioridad, herramientas o procesos sin afectar su desempeño. Busca de forma autónoma información o formación para cerrar brechas de conocimiento. Aplica aprendizajes de una situación a otra similar.", "Apoyo y operación": "Acepta cambios en sus tareas o herramientas de trabajo con actitud positiva. Aprende nuevos procedimientos cuando se le capacita. Pide ayuda o aclaración cuando enfrenta una situación nueva."} }
    ],
    // Específicas por nivel de cargo: definición y lo que se espera
    especificas: {
      "Dirección y gerencia": [
        { nombre: "Pensamiento estratégico", definicion: "Comprender el entorno y la estrategia del grupo y traducirlos en objetivos, prioridades y planes para su área o país.", espera: "Anticipa cambios del mercado y del entorno y ajusta los planes de su área o país." },
        { nombre: "Liderazgo y gestión de personas", definicion: "Conducir a los equipos hacia los objetivos, desarrollar líderes y sostener la cultura del grupo, incluso en el cambio.", espera: "Lidera procesos de cambio en su área y gestiona la resistencia." },
        { nombre: "Negociación e influencia", definicion: "Lograr acuerdos favorables con actores internos y externos y obtener apoyo para las iniciativas de su área.", espera: "Obtiene apoyo de la dirección y de otras áreas para iniciativas de su gerencia." },
        { nombre: "Visión de negocio y gestión de recursos", definicion: "Gestionar presupuesto, inventario y personas con criterio de rentabilidad, y medir el resultado con indicadores del negocio.", espera: "Toma decisiones de gasto e inversión con base en su retorno y su riesgo." }
      ],
      "Coordinación y supervisión": [
        { nombre: "Planificación y organización", definicion: "Fijar prioridades, asignar tareas y recursos y programar el trabajo del equipo para cumplir los objetivos en plazo.", espera: "Ajusta los planes ante cambios y equilibra la carga entre personas y turnos." },
        { nombre: "Dirección y desarrollo de equipos", definicion: "Guiar, motivar, formar y evaluar a las personas a su cargo para que cumplan y crezcan.", espera: "Evalúa el desempeño con criterios objetivos y define planes de desarrollo." },
        { nombre: "Seguimiento y control", definicion: "Verificar el avance y la calidad del trabajo con indicadores, detectar desvíos y corregirlos a tiempo.", espera: "Analiza la causa de los desvíos y aplica correctivos que evitan que se repitan." },
        { nombre: "Toma de decisiones operativas", definicion: "Decidir con oportunidad y criterio dentro de su autoridad, y escalar lo que la excede.", espera: "Decide en situaciones nuevas con información incompleta y asume sus consecuencias." }
      ],
      "Analistas y especialistas": [
        { nombre: "Análisis y solución de problemas", definicion: "Identificar las causas de un problema, evaluar alternativas y proponer o aplicar la mejor solución con base en datos.", espera: "Analiza problemas nuevos o con varias causas y propone alternativas con sus pros y contras." },
        { nombre: "Manejo y calidad de la información", definicion: "Registrar, ordenar, verificar y presentar la información de su trabajo de forma exacta, oportuna y útil para decidir.", espera: "Integra información de varias fuentes, detecta inconsistencias y las aclara." },
        { nombre: "Dominio técnico de su especialidad", definicion: "Conocer y aplicar los métodos, herramientas y normas propios de su especialidad, y mantenerlos al día.", espera: "Resuelve casos técnicos complejos y orienta a otros en su especialidad." },
        { nombre: "Comunicación efectiva", definicion: "Transmitir ideas, resultados y necesidades de forma clara y adecuada a quien recibe, por escrito y de forma oral.", espera: "Presenta análisis y propuestas a otras áreas y responde a sus objeciones." }
      ],
      "Apoyo y operación": [
        { nombre: "Sentido de responsabilidad", definicion: "Responder por las tareas, los recursos y la información que se le confían, y cumplir lo acordado en tiempo y forma.", espera: "Responde por los resultados y los recursos a su cargo, y anticipa los riesgos de su trabajo." },
        { nombre: "Calidad y orden en el trabajo", definicion: "Hacer el trabajo completo, exacto y ordenado a la primera, de forma que otros puedan continuarlo sin rehacerlo.", espera: "Detecta y corrige errores propios y ajenos antes de que pasen al siguiente paso." },
        { nombre: "Apego a normas y procedimientos", definicion: "Conocer y aplicar las normas, políticas y procedimientos que rigen su trabajo, incluidas las de seguridad.", espera: "Aplica las normas en situaciones poco habituales y consulta cuando no hay una regla clara." }
      ]
    },
    // Escala para evaluar a una persona frente a lo que exige su cargo (no va en la descripción)
    escala_evaluacion: [["No alcanza", "Muestra la competencia de forma ocasional o con apoyo constante; está lejos de lo que exige su cargo."], ["En desarrollo", "La muestra en las situaciones habituales, pero no todavía de forma consistente ni en las nuevas."], ["Cumple", "La muestra de forma consistente, tal como la describe su nivel de cargo."], ["Supera", "La muestra por encima de lo que exige su nivel y orienta a otros en ella."]],
    estado: 'Borrador para validación del equipo',
    clausula: 'Realizar todas las demás actividades que le sean asignadas por su superior inmediato y faciliten el buen funcionamiento de la unidad.',
    intro_riesgos: 'La naturaleza de las responsabilidades asociadas a este cargo implica que el ocupante esté sujeto principalmente a los siguientes riesgos laborales:',
    factores: ['Dinero y bienes', 'Equipos', 'Gestión de procesos', 'Personas', 'Atención a clientes', 'Información confidencial', 'Resguardo de documentos'],
    riesgos: ['Biológicos', 'Físicos', 'Químicos', 'Mecánicos', 'Psicosociales', 'Disergonómicos']
  },

  familias: [
    { id: 'PRE', nombre: 'Presidencia y Asistencia Ejecutiva', unidad: 'Presidencia', cargos: ['Presidente(a) · CEO', 'Asistente Ejecutivo(a) a la Presidencia', 'Asistente de Gestión'] },
    { id: 'JUR', nombre: 'Consultoría Jurídica', unidad: 'Presidencia', cargos: ['Consultor(a) Jurídico(a) Corporativo(a)'] },
    { id: 'DGP', nombre: 'Dirección General de País', unidad: 'Sin ubicación en el To-Be', cargos: ['Country'] },
    { id: 'IDP', nombre: 'Dirección de Innovación y Desarrollo de Productos', unidad: 'Innovación y Desarrollo de Productos', cargos: ['Director(a) Corporativo(a) de Innovación y Desarrollo de Productos'] },
    { id: 'PRD', nombre: 'Desarrollo y Calidad de Productos', unidad: 'Desarrollo y Calidad de Productos', cargos: ['Gerente Corporativo(a) de Desarrollo y Calidad de Productos', 'Especialista de Producto II', 'Especialista de Producto I'] },
    { id: 'INN', nombre: 'Innovación y Tecnología de Productos', unidad: 'Innovación y Tecnología de Productos', cargos: ['Gerente Corporativo(a) de Innovación y Tecnología de Productos'] },
    { id: 'CCS', nombre: 'Dirección de Compras y Cadena de Suministro', unidad: 'Compras y Cadena de Suministro', cargos: ['Director(a) Corporativo(a) de Compras y Cadena de Suministro'] },
    { id: 'CPR', nombre: 'Compras', unidad: 'Compras', cargos: ['Gerente Corporativo(a) de Compras', 'Coordinador(a) Corporativo(a) de Compras', 'Coordinador(a) de Compras II', 'Coordinador(a) de Compras I'] },
    { id: 'OPL', nombre: 'Operaciones y Logística', unidad: 'Operaciones y Logística', cargos: ['Gerente Corporativo(a) de Operaciones y Logística', 'Gerente País de Operaciones y Logística', 'Coordinador(a) de Logística', 'Supervisor(a) de Bodega', 'Analista de Logística II', 'Analista de Logística I', 'Auxiliar de Operaciones', 'Operario(a) de Operaciones'] },
    { id: 'SSG', nombre: 'Servicios Generales', unidad: 'Operaciones y Logística', piloto: true,
      cargos: ['Coordinador(a) País de Servicios Generales', 'Supervisor(a) de Servicios Generales', 'Asistente de Gestión', 'Operario(a) de Servicios Generales'] },
    { id: 'CMR', nombre: 'Dirección Comercial', unidad: 'Comercial', cargos: ['Director(a) Corporativo(a) Comercial'] },
    { id: 'VEN', nombre: 'Ventas (corporativa)', unidad: 'Ventas', cargos: ['Gerente Corporativo(a) de Ventas'] },
    { id: 'PDM', nombre: 'Planificación de la Demanda y Nuevos Mercados', unidad: 'Ventas', cargos: ['Coordinador(a) Corporativo(a) de Planificación de la Demanda y Nuevos Mercados'] },
    { id: 'MAY', nombre: 'Ventas al Mayor', unidad: 'Ventas', cargos: ['Gerente de Unidad de Negocio de Ventas al Mayor', 'Gerente País de Ventas al Mayor', 'Coordinador(a) Comercial', 'Líder Comercial', 'Ejecutivo Comercial II', 'Ejecutivo Comercial I', 'Asistente de Gestión'] },
    { id: 'RET', nombre: 'Retail · Tiendas', unidad: 'Ventas', cargos: ['Gerente de Unidad de Negocio de Retail', 'Gerente País de Retail', 'Gerente de Tienda / Coordinador(a) de Tiendas', 'Encargado(a) de Tienda / Sub Gerente', 'Asesor(a) de Ventas'] },
    { id: 'ECO', nombre: 'E-commerce', unidad: 'Ventas', cargos: ['Gerente de Unidad de Negocio de E-commerce', 'Gerente País de E-commerce', 'Especialista E-Commerce II', 'Especialista E-Commerce I', 'Asesor(a) de Ventas Web II', 'Asesor(a) de Ventas Web I', 'Asistente de Gestión'] },
    { id: 'PST', nombre: 'Postventa', unidad: 'Ventas', cargos: ['Gerente de Unidad de Negocio de Postventa', 'Gerente País de Postventa', 'Coordinador(a) de Postventa / Subgerente de Servicio', 'Especialista / Líder de Servicio', 'Especialista de Servicio II', 'Asesor(a) de Servicio / Soporte I', 'Relojero(a) / Técnico(a)', 'Asistente / Auxiliar de Gestión'] },
    { id: 'MKT', nombre: 'Mercadeo (corporativa y país)', unidad: 'Mercadeo', cargos: ['Gerente Corporativo(a) de Mercadeo', 'Gerente País de Mercadeo', 'Coordinador(a) de Mercadeo / Marca', 'Líder de Mercadeo', 'Especialista de Mercadeo II', 'Analista de Mercadeo / Creativo(a) Local I', 'Asistente de Gestión'] },
    { id: 'EXV', nombre: 'Experiencia del Cliente · Visual', unidad: 'Mercadeo', cargos: ['Gerente de Unidad de Negocio de Experiencia del Cliente · Visual', 'Brand Manager / Coordinador(a) Visual', 'Coordinador(a) Comercial I', 'Analista Comercial/Mercadeo II', 'Analista Comercial/Mercadeo I', 'Asistente de Gestión'] },
    { id: 'EXD', nombre: 'Experiencia Digital', unidad: 'Mercadeo', cargos: ['Gerente de Unidad de Negocio de Experiencia Digital', 'Especialista Digital II', 'Analista Digital I'] },
    { id: 'CRE', nombre: 'Creativa y Diseño', unidad: 'Mercadeo', cargos: ['Gerente de Unidad de Negocio de Creativa y Diseño', 'Líder Creativo(a) / de Arte', 'Coordinador(a) Creativo(a) I', 'Diseñador(a) II', 'Diseñador(a) I', 'Asistente de Gestión'] },
    { id: 'FIN', nombre: 'Finanzas (Administración y Finanzas)', unidad: 'Finanzas', cargos: ['Director(a) Corporativo(a) de Finanzas', 'Gerente País de Administración y Finanzas', 'Coordinador(a) Corporativo(a) de Planificación y Control Financiero', 'Coordinador(a) de Administración y Finanzas', 'Líder / Especialista de Administración y Finanzas', 'Analista de Administración y Finanzas II', 'Analista de Administración y Finanzas I', 'Asistente / Auxiliar de Gestión'] },
    { id: 'DCO', nombre: 'Desarrollo Corporativo (Talento y Formación)', unidad: 'Desarrollo Corporativo', cargos: ['Director(a) Corporativo(a) de Desarrollo Corporativo', 'Gerente País de Recursos Humanos', 'Coordinador(a) Corporativo(a) de Formación', 'Coordinador(a) de Recursos Humanos II', 'Coordinador(a) de Recursos Humanos I', 'Analista de Recursos Humanos II', 'Analista de Recursos Humanos I', 'Asistente de Gestión'] },
    { id: 'TEC', nombre: 'Tecnología, Gobernanza del Dato y Cumplimiento', unidad: 'Tecnología, Gobernanza del Dato y Cumplimiento', cargos: ['Gerente Corporativo(a) de Tecnología, Gobernanza del Dato y Cumplimiento', 'Coordinador(a) País de Tecnología de Información', 'Coordinador(a) de Tecnología y Sistemas / Soporte', 'Especialista de Tecnología y Sistemas II', 'Analista de Sistemas I'] },
    { id: 'GIA', nombre: 'Gobierno de IA', unidad: 'Gobierno de IA', cargos: ['Gerente Corporativo(a) de Gobierno de IA', 'Analista de Inteligencia de Negocio II', 'Analista de Inteligencia de Negocio I'] },
    { id: 'PMO', nombre: 'PMO', unidad: 'PMO', cargos: ['Gerente Corporativo(a) de la PMO', 'Gerente País de la PMO'] }
  ],

  descripciones: {

    'coordinador-pais-servicios-generales': {
      denominacion: 'Coordinador(a) País de Servicios Generales',
      escalon: 'Coordinador(a)', apellido: 'País',
      codigo: null, codigos_v5: ['SSG-35'], familias: ['SSG'],
      unidad: 'Servicios Generales · coordinación país dentro de Operaciones y Logística',
      estado: 'borrador', situacion: 'Con ocupantes hoy',
      reporta_a: 'Gerente País de Operaciones y Logística',
      supervisa_a: ['Supervisor(a) de Servicios Generales', 'Asistente de Gestión', 'Operario(a) de Servicios Generales'],
      objetivo: 'Asegurar que las sedes y los puntos de venta del país operen en condiciones seguras, funcionales y bien abastecidas, planificando y controlando el mantenimiento, la seguridad física, los suministros y los servicios contratados, con un registro de cada solicitud y de su costo, para que la operación comercial y administrativa no se detenga por fallas de infraestructura.',
      responsabilidades: [
        { proceso: 'Mantenimiento de infraestructura e instalaciones', items: [
          'Asegurar el plan anual de mantenimiento preventivo de las sedes y los puntos de venta del país —sistema eléctrico, alumbrado y centrales de alarma— y verificar su cumplimiento.',
          'Definir el registro único de solicitudes de mantenimiento, con su prioridad y su tiempo de respuesta, y verificar que cada solicitud se cierre.',
          'Decidir si una intervención se ejecuta con el personal interno o con un contratista, según su alcance y su riesgo.',
          'Mantener el inventario mínimo de repuestos y materiales del depósito de mantenimiento.',
          'Analizar las fallas recurrentes por sede y proponer a la gerencia país las correcciones de fondo.'] },
        { proceso: 'Seguridad física y control de acceso a las sedes', items: [
          'Asegurar las rutinas de apertura y cierre de las sedes y la custodia de llaves y claves de acceso, con registro de quién las tiene.',
          'Supervisar al personal de vigilancia propio y coordinar con las empresas de vigilancia y de monitoreo de alarmas.',
          'Coordinar la respuesta ante un incidente de seguridad y documentar cada evento con las acciones tomadas.',
          'Coordinar con Tecnología de Información la atención de los incidentes que dependen del circuito cerrado de televisión o de sistemas conectados a la red.'] },
        { proceso: 'Gestión de contratistas y proveedores de servicios generales', items: [
          'Mantener el registro de contratistas calificados por especialidad y evaluar su desempeño después de cada trabajo.',
          'Asegurar que cada contratación cuente con presupuestos comparables, priorizando la calidad y la durabilidad sobre el precio más bajo.',
          'Presentar cada contratación al aprobador que corresponda según el monto del gasto.',
          'Verificar la recepción conforme de cada trabajo antes de enviar la factura al trámite de pago.'] },
        { proceso: 'Gestión de la sede y relación con el arrendador o condominio', items: [
          'Representar a Servicios Generales ante la administración de los edificios y de los centros comerciales en las intervenciones que afectan las sedes.',
          'Escalar a la gerencia país las incidencias que comprometen la operación de una sede completa.',
          'Verificar que las obras del arrendador en una sede respeten la capacidad y las condiciones que requiere la operación.',
          'Llevar el registro de los contratos, cuotas y obligaciones de cada sede, y avisar sus vencimientos a Administración y Finanzas.'] },
        { proceso: 'Gestión de suministros de oficina y consumibles', items: [
          'Definir los niveles mínimos de reposición de insumos por sede y verificar periódicamente el inventario.',
          'Consolidar las necesidades de reposición de las sedes y tramitarlas según el procedimiento de compra local.'] },
        { proceso: 'Compra local de bienes y servicios por país', items: [
          'Validar las solicitudes de compra local de bienes y servicios generales antes de enviarlas a aprobación.',
          'Verificar que cada orden quede registrada en el sistema administrativo con su concepto y su proveedor.'] },
        { proceso: null, titulo: 'Otras responsabilidades del cargo', items: [
          'Planificar, asignar y supervisar el trabajo diario del personal de Servicios Generales del país.',
          'Formar y evaluar al equipo, y proponer las necesidades de personal y de contratación externa.',
          'Controlar el presupuesto de servicios generales del país y reportar su ejecución a la gerencia país.',
          'Velar por el cumplimiento de las normas de seguridad y salud ocupacional en las sedes, incluidos los equipos contra incendio.',
          'Coordinar con Recursos Humanos el apoyo logístico a los eventos internos y a las actividades de bienestar.'] }
      ],
      tecnicas: {
        formacion: 'Formación técnica superior o universitaria en Administración, Ingeniería de Mantenimiento, Ingeniería Industrial o afines, más la gestión de un área: planificación, presupuesto, indicadores y conducción de personas.',
        experiencia: '5 a 8 años en servicios generales, mantenimiento de instalaciones o administración de sedes, de ellos 1 o 2 conduciendo equipos.',
        habilidades: ['Mantenimiento eléctrico, de alumbrado y de sistemas de alarma (supervisión)', 'Gestión de contratistas, presupuestos y recepción de obras',
          'Seguridad física y control de acceso', 'Normas de seguridad y salud ocupacional y de prevención de incendios', 'Control de inventario de suministros',
          'Odoo: intermedio (solicitudes y órdenes de compra)', 'Excel y Lark: intermedio', 'Tableros de gestión: lectura e interpretación',
          'Herramientas de IA: intermedio', 'Inglés básico (deseable)'] },
      especificas: { 'Dinero y bienes': 'Manejo general de bienes', 'Equipos': 'Media (equipos de una unidad o coordinación)',
        'Gestión de procesos': 'De supervisión y coordinación', 'Personas': 'Un equipo responsable de una función',
        'Atención a clientes': 'Esmero con el cliente', 'Información confidencial': 'Sí', 'Resguardo de documentos': 'Sí' },
      relaciones: {
        internas: ['Gerencia país de Operaciones y Logística', 'Administración y Finanzas del país', 'Retail (gerencias de tienda)', 'Tecnología de Información del país', 'Recursos Humanos del país', 'Gerencias y áreas de la sede'],
        externas: ['Contratistas de electricidad, obra civil, alarmas y mantenimiento', 'Proveedores de insumos y servicios', 'Administración de edificios y centros comerciales', 'Empresas de vigilancia y de monitoreo de alarmas', 'Entes públicos para permisos de las sedes'] },
      marco_normativo: ['Manual de normas, políticas y procedimientos de Servicios Generales', 'Política de compras locales y de aprobación de gastos del grupo',
        'Normativa vigente de seguridad y salud ocupacional y de prevención de incendios de cada país', 'Reglamentos de condominio y contratos de arrendamiento de las sedes'],
      riesgos_laborales: {
        'Físicos': 'Iluminación y temperatura inadecuadas, cableado y equipos eléctricos, caídas al mismo nivel.',
        'Mecánicos': 'Mantenimiento menor de instalaciones, traslado de mobiliario, mensajería en vía pública.',
        'Psicosociales': 'Carga mental por plazos y cierres, trabajo continuo frente a pantalla.',
        'Disergonómicos': 'Posturas sedentarias prolongadas, uso continuo de teclado y ratón, fatiga visual.' },
      notas: ['Escalón Coordinador(a) de la estructura patrón, con apellido país: la posición se repite en PA, VE y CO (hoy hay un ocupante). Antes figuraba como «Coordinador(a) de Servicios Generales II» (nivel 35 del V5).',
        'El manual To-Be asigna hoy las tareas de Servicios Generales al rol «Asistente Administrativo(a) / Servicios Generales». Aquí se reparten por escalón: la coordinación define, autoriza y verifica; el supervisor organiza el trabajo diario donde existe; el asistente y el operario ejecutan.']
    },

    'supervisor-servicios-generales': {
      denominacion: 'Supervisor(a) de Servicios Generales',
      escalon: 'Supervisor(a)', apellido: null,
      codigo: null, codigos_v5: ['SSG-30'], familias: ['SSG'],
      unidad: 'Servicios Generales · coordinación país dentro de Operaciones y Logística',
      estado: 'borrador', situacion: 'Sin ocupantes hoy: se abre donde la sede o el turno lo justifican',
      reporta_a: 'Coordinador(a) País de Servicios Generales',
      supervisa_a: ['Operario(a) de Servicios Generales'],
      objetivo: 'Organizar y hacer cumplir el trabajo diario del personal de servicios generales de una sede o un turno —vigilancia, limpieza y mantenimiento menor—, siguiendo los planes y las prioridades que fija la coordinación del país, para que cada solicitud se atienda a tiempo, con seguridad y quede registrada.',
      responsabilidades: [
        { proceso: 'Mantenimiento de infraestructura e instalaciones', items: [
          'Organizar la ejecución del mantenimiento preventivo de la sede asignada según el plan del país.',
          'Recibir, clasificar y registrar las solicitudes de mantenimiento, y darles seguimiento hasta su cierre.',
          'Determinar si una falla es de competencia eléctrica o de alarma, o si corresponde a Tecnología de Información, y canalizarla.',
          'Verificar la disponibilidad de repuestos en el depósito y solicitar su reposición.'] },
        { proceso: 'Seguridad física y control de acceso a las sedes', items: [
          'Verificar que se cumplan las rutinas de apertura, cierre y custodia de llaves de la sede asignada.',
          'Atender y reportar los incidentes de seguridad de su competencia, y coordinar con la vigilancia del inmueble cuando se requiera.'] },
        { proceso: 'Gestión de contratistas y proveedores de servicios generales', items: [
          'Solicitar y comparar presupuestos de contratistas para las intervenciones de la sede.',
          'Supervisar en sitio la ejecución de los trabajos contratados y verificar que cumplan las especificaciones.'] },
        { proceso: 'Gestión de suministros de oficina y consumibles', items: [
          'Verificar el inventario de insumos de la sede y preparar las solicitudes de reposición.'] },
        { proceso: null, titulo: 'Otras responsabilidades del cargo', items: [
          'Asignar las tareas y los turnos del personal de su sede, reasignarlas cuando falta alguien y resolver las incidencias del día.',
          'Enseñar en el puesto, dar retroalimentación y reportar a la coordinación el desempeño de su equipo.',
          'Reportar a la coordinación del país el avance, los desvíos y los costos de los servicios de la sede asignada.',
          'Cumplir y hacer cumplir las normas de seguridad y salud ocupacional en las labores de servicios generales.'] }
      ],
      tecnicas: {
        formacion: 'Bachiller con formación técnica en electricidad, mantenimiento o seguridad; formación técnica superior (deseable). Se suma lo que el oficio no enseña: programar turnos, delegar, enseñar en el puesto y manejar conflictos.',
        experiencia: '3 a 5 años en mantenimiento, vigilancia o servicios generales, con dominio de la labor que supervisa.',
        habilidades: ['Programación de turnos y rutinas de trabajo', 'Mantenimiento eléctrico, de alumbrado y de sistemas de alarma', 'Supervisión de contratistas en sitio', 'Seguridad física y control de acceso',
          'Normas de seguridad y salud ocupacional', 'Odoo: básico', 'Excel y Lark: intermedio', 'Herramientas de IA: intermedio'] },
      especificas: { 'Dinero y bienes': 'Manejo general de bienes', 'Equipos': 'Media (equipos de una unidad o coordinación)',
        'Gestión de procesos': 'De supervisión y coordinación', 'Personas': 'Un número determinado de personas',
        'Atención a clientes': 'Esmero con el cliente', 'Información confidencial': 'Sí', 'Resguardo de documentos': 'Sí' },
      relaciones: {
        internas: ['Coordinación de Servicios Generales del país', 'Gerencias y áreas de la sede', 'Retail (gerencias de tienda)', 'Tecnología de Información del país'],
        externas: ['Contratistas de mantenimiento', 'Proveedores de insumos', 'Administración del edificio o centro comercial'] },
      marco_normativo: ['Manual de normas, políticas y procedimientos de Servicios Generales', 'Normativa vigente de seguridad y salud ocupacional y de prevención de incendios de cada país'],
      riesgos_laborales: {
        'Físicos': 'Iluminación y temperatura inadecuadas, cableado y equipos eléctricos, caídas al mismo nivel.',
        'Mecánicos': 'Mantenimiento menor de instalaciones, traslado de mobiliario, mensajería en vía pública.',
        'Psicosociales': 'Carga mental por plazos y cierres, trabajo continuo frente a pantalla.',
        'Disergonómicos': 'Posturas sedentarias prolongadas, uso continuo de teclado y ratón, fatiga visual.' },
      notas: ['Escalón Supervisor(a) de la estructura patrón: primera línea de mando de un turno o una sede. Sustituye al «Coordinador(a) de Servicios Generales I» del V5, porque la escalera no tiene dos grados de coordinador.',
        'Solo se abre donde la sede o el turno lo justifican: en un área pequeña basta la coordinación (regla de la estructura patrón: un escalón de mando existe si resuelve lo que el de abajo no puede). Donde no existe, los operarios reportan a la coordinación país.',
        'Hoy no tiene ocupantes ni caja en el To-Be.']
    },

    'asistente-de-gestion': {
      denominacion: 'Asistente de Gestión',
      escalon: 'Auxiliar', apellido: null,
      codigo: null, codigos_v5: ['PRE-10', 'SSG-10', 'MAY-10', 'ECO-10', 'MKT-10', 'EXV-10', 'CRE-10', 'DCO-10'],
      familias: ['PRE', 'SSG', 'MAY', 'ECO', 'MKT', 'EXV', 'CRE', 'DCO'],
      unidad: 'Común a ocho unidades (ver matices por unidad)',
      estado: 'borrador', situacion: 'Con ocupantes hoy · descripción compartida',
      reporta_a: 'Coordinación de la unidad a la que pertenece',
      reporta_por_unidad: { 'Servicios Generales': 'Coordinador(a) País de Servicios Generales' },
      supervisa_a: [],
      objetivo: 'Apoyar la gestión administrativa y operativa de su unidad, preparando, registrando y resguardando la información y los documentos, atendiendo las solicitudes internas y de terceros y dando seguimiento a los trámites, para que la unidad cumpla sus compromisos a tiempo y con orden.',
      responsabilidades: [
        { proceso: null, titulo: 'Gestión administrativa de la unidad', items: [
          'Preparar, registrar y archivar los documentos de la unidad en los formatos y sistemas establecidos.',
          'Registrar en los sistemas del grupo las solicitudes, órdenes y movimientos que le asigne su superior.',
          'Dar seguimiento a los trámites y pendientes de la unidad e informar su estado.',
          'Mantener el archivo físico y digital ordenado, con resguardo de la información confidencial.'] },
        { proceso: null, titulo: 'Atención y apoyo', items: [
          'Atender y canalizar las solicitudes internas y de terceros dirigidas a la unidad.',
          'Preparar la logística de las reuniones, eventos y viajes de la unidad.',
          'Controlar los suministros de la unidad y solicitar su reposición.'] }
      ],
      matices: [
        { unidad: 'Servicios Generales', codigos_v5: ['SSG-10'], reporta_a: 'Coordinador(a) País de Servicios Generales',
          responsabilidades: [
            { proceso: 'Mensajería, correspondencia y transporte administrativo', items: [
              'Recibir, registrar y distribuir la correspondencia y los documentos entre las sedes, bancos, entes públicos, clientes y proveedores, con constancia de entrega.',
              'Realizar los depósitos y los trámites bancarios que se le asignen, siguiendo el protocolo de seguridad para el traslado de valores.',
              'Mantener la reserva sobre la información de los documentos que traslada.'] },
            { proceso: 'Seguridad física y control de acceso a las sedes', items: [
              'Atender la recepción de la sede y la central telefónica, y orientar a los visitantes.',
              'Registrar el ingreso de visitantes y de paquetería según las normas de acceso de la sede.'] },
            { proceso: 'Gestión de suministros de oficina y consumibles', items: [
              'Llevar el inventario de insumos de la sede, entregar lo solicitado y avisar cuando un insumo llegue a su nivel mínimo.',
              'Recibir y descargar los insumos en el depósito de la sede.'] },
            { proceso: 'Compra local de bienes y servicios por país', items: [
              'Solicitar cotizaciones a los proveedores locales y verificar que el proveedor siga activo y sostenga el precio.',
              'Registrar en el sistema administrativo las órdenes aprobadas, con su concepto y su proveedor.'] },
            { proceso: 'Validación de ingresos y control del cierre de caja de punto de venta', items: [
              'Recibir la valija con el efectivo y los soportes que llegan desde las tiendas y entregarla a Administración y Finanzas con constancia.'] },
            { proceso: null, titulo: 'Otras de la unidad', items: [
              'Apoyar la tramitación de permisos y licencias operativas de las sedes.',
              'Organizar la logística de las actividades de bienestar del cronograma, bajo la coordinación de Recursos Humanos.'] }
          ] }
      ],
      tecnicas: {
        formacion: 'Secundaria completa (bachiller); formación técnica corta en administración o asistencia (deseable).',
        experiencia: '6 meses a 2 años en labores administrativas, de asistencia o de atención al público.',
        habilidades: ['Organización de archivos y documentación', 'Redacción de correspondencia básica', 'Atención al público y telefónica',
          'Odoo: básico (registro de solicitudes y órdenes)', 'Excel y Lark: básico', 'Herramientas de IA: básico'] },
      especificas: { 'Dinero y bienes': 'Manejo general de bienes', 'Equipos': 'Simple (equipos asignados al cargo o de apoyo)',
        'Gestión de procesos': 'Auxiliares', 'Personas': 'Ninguna',
        'Atención a clientes': 'Esmero con el cliente', 'Información confidencial': 'Sí', 'Resguardo de documentos': 'Sí' },
      relaciones: {
        internas: ['Coordinación y gerencia de su unidad', 'Administración y Finanzas del país', 'Áreas de la sede que atiende'],
        externas: ['Proveedores y clientes de la unidad', 'Bancos y entes públicos (en los trámites que se le asignen)', 'Visitantes'] },
      marco_normativo: ['Manual de normas, políticas y procedimientos de su unidad', 'Políticas del grupo sobre confidencialidad y manejo de documentos',
        'Normativa vigente de seguridad y salud ocupacional de cada país'],
      riesgos_laborales: {
        'Físicos': 'Iluminación y temperatura inadecuadas, cableado y equipos eléctricos, caídas al mismo nivel.',
        'Mecánicos': 'Mantenimiento menor de instalaciones, traslado de mobiliario, mensajería en vía pública.',
        'Psicosociales': 'Carga mental por plazos y cierres, trabajo continuo frente a pantalla.',
        'Disergonómicos': 'Posturas sedentarias prolongadas, uso continuo de teclado y ratón, fatiga visual.' },
      riesgos_nota: 'Riesgos de la unidad de Servicios Generales (SSG-10). Las demás unidades tomarán los suyos al redactarse.',
      notas: ['Escalón Auxiliar de la estructura patrón: sostiene el proceso con el registro, el trámite y la atención. El nombre «Asistente de Gestión» lo pone la familia; el escalón es el mismo en las ocho.',
        'Descripción común a ocho familias. En este piloto solo se redactaron los matices de Servicios Generales; los de las otras siete unidades se añaden al llegar a cada familia.',
        'Frente a la propuesta del archivo de insumos se subieron dos factores: «Información confidencial» a «Sí» (traslada documentos y valores) y «Atención a clientes» a «Esmero con el cliente» (recepción y atención de visitantes).',
        'La mensajería no figura en el manual para este cargo: el proceso «Mensajería, correspondencia y transporte administrativo» la asigna hoy al personal de bodega. Se incluyó porque es la función que ejercen sus ocupantes; validar con Operaciones y Logística.']
    },

    'operario-servicios-generales': {
      denominacion: 'Operario(a) de Servicios Generales',
      escalon: 'Operario(a)', apellido: null,
      codigo: null, codigos_v5: ['SSG-05'], familias: ['SSG'],
      unidad: 'Servicios Generales · coordinación país dentro de Operaciones y Logística',
      estado: 'borrador', situacion: 'Con ocupantes hoy',
      reporta_a: 'Coordinador(a) País de Servicios Generales',
      supervisa_a: [],
      objetivo: 'Ejecutar las labores físicas que mantienen las sedes seguras, limpias y en funcionamiento —vigilancia y control de acceso, limpieza y acondicionamiento de áreas, y mantenimiento menor—, siguiendo las rutinas y las normas de seguridad establecidas, para proteger a las personas, la mercancía y las instalaciones del grupo.',
      responsabilidades: [
        { proceso: 'Seguridad física y control de acceso a las sedes', items: [
          'Controlar el acceso de personas, vehículos y mercancía según las normas de la sede, y registrar cada ingreso y salida.',
          'Vigilar la mercancía en exhibición y en depósito, y reportar de inmediato cualquier novedad a quien corresponda.',
          'Verificar en sus rondas el funcionamiento de las alarmas, extintores, detectores y luces de emergencia, y reportar las fallas.',
          'Ejecutar la rutina de apertura y cierre de la sede cuando se le asigne.',
          'Llevar al día el libro de novedades de su turno.'] },
        { proceso: 'Despacho y última milla', items: [
          'Cotejar en la salida los precintos, las placas, la identidad del conductor y la carga contra la factura o la guía, y registrar la hora de salida.'] },
        { proceso: 'Mantenimiento de infraestructura e instalaciones', items: [
          'Ejecutar las reparaciones menores y el mantenimiento que se le asignen, con los materiales del depósito.',
          'Apoyar a los contratistas en sitio según las instrucciones de la coordinación.'] },
        { proceso: null, titulo: 'Otras responsabilidades del cargo', items: [
          'Ejecutar la limpieza y el acondicionamiento de las áreas de trabajo según el programa de la sede.',
          'Trasladar mobiliario y preparar los espacios para los eventos internos.',
          'Cumplir las normas de seguridad y usar los equipos de protección personal en cada labor.'] }
      ],
      tecnicas: {
        formacion: 'Oficio aprendido en el puesto o con formación técnica corta (electricidad básica, mantenimiento, vigilancia); educación primaria completa y bachiller (deseable). Para vigilancia, la certificación que exija la normativa de cada país.',
        experiencia: '0 a 1 año en vigilancia, limpieza o mantenimiento.',
        habilidades: ['Control de acceso y registro de novedades', 'Uso de extintores y respuesta básica ante emergencias', 'Mantenimiento menor (electricidad básica, alumbrado y mobiliario)',
          'Uso seguro de productos de limpieza', 'Herramientas de IA: básico'] },
      especificas: { 'Dinero y bienes': 'Manejo general de bienes', 'Equipos': 'Simple (equipos asignados al cargo o de apoyo)',
        'Gestión de procesos': 'Auxiliares', 'Personas': 'Ninguna',
        'Atención a clientes': 'Simple entrega', 'Información confidencial': 'No', 'Resguardo de documentos': 'Sí' },
      relaciones: {
        internas: ['Coordinación de Servicios Generales del país', 'Gerencias de tienda y responsables de la sede', 'Bodega y despacho'],
        externas: ['Visitantes y transportistas', 'Empresas de vigilancia y de monitoreo de alarmas', 'Contratistas en sitio'] },
      marco_normativo: ['Normas de seguridad y de acceso de cada sede', 'Normativa vigente de seguridad privada, de seguridad y salud ocupacional y de prevención de incendios de cada país'],
      riesgos_laborales: {
        'Biológicos': 'Contacto con público y visitantes en accesos; residuos y sanitarios en las labores de limpieza.',
        'Físicos': 'Trabajo a la intemperie, iluminación nocturna deficiente, riesgo eléctrico en el mantenimiento menor, caídas al mismo nivel.',
        'Químicos': 'Productos de limpieza y desinfección.',
        'Mecánicos': 'Herramientas manuales, uso de escaleras, golpes al trasladar mobiliario.',
        'Psicosociales': 'Riesgo de robo o agresión, turnos nocturnos y rotativos, estado de alerta prolongado.',
        'Disergonómicos': 'Bipedestación prolongada, levantamiento de cargas y posturas forzadas.' },
      notas: ['Escalón Operario(a) de la estructura patrón: trabaja sobre cosas (instalaciones, equipos, accesos) con métodos ya definidos, y ante lo que no encaja se detiene y avisa. Reporta a la coordinación país o, donde exista, al supervisor de su sede.',
        'Sus ocupantes actuales ejercen la vigilancia. La descripción suma la limpieza y el mantenimiento menor porque la coordinación declara personal a su cargo en esas labores; validar si son de este cargo o de otro.',
        '«Resguardo de documentos» se subió a «Sí» frente a la propuesta: lleva el libro de novedades y los registros de acceso.']
    }
  }
};
