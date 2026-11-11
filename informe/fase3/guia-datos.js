/* Guía de lectura del Manual de Descripciones de Cargo — Fase 3 (Grupo Kenex · UCAB Consultores)
   Punto 1 del índice de la página de Fase 3 (#/guia[/<sección>]). Fuente única, editable a mano;
   la pinta descripciones-cargo.html. Explica qué es el manual, cómo se construyó, cómo se organiza y
   cómo se lee cada sección del formato. Reglas: sin nombres de personas; «Kenex» con una sola «n»;
   tono formal; la formalización como habilitación. Los ejemplos enlazan al piloto (#/c/<id>). */
window.GUIA_MANUAL = {
  titulo: 'Guía de lectura del manual',
  lead: 'Qué es el Manual de Descripciones de Cargo, cómo se construyó y cómo se lee cada parte de una descripción. Conviene leerla antes de entrar a la estructura patrón y a las descripciones.',

  secciones: [
    { id: 'proposito', titulo: 'Qué es el manual y para qué sirve',
      parrafos: [
        'El Manual de Descripciones de Cargo reúne, para cada cargo de la estructura To-Be de Grupo Kenex, lo que el cargo asegura, de qué procesos responde, qué perfil exige a quien lo ocupe y a qué riesgos lo expone. Es la referencia común para que cada persona sepa qué se espera de su puesto y para que la organización gestione su talento con un mismo criterio en todos los países.',
        'Cada descripción describe el cargo en su versión de **deber ser**: cómo debe funcionar en la estructura To-Be, no cómo lo ejerce hoy quien lo ocupa. Describe el puesto, no a la persona.'
      ],
      usos: [
        ['Selección', 'Define el perfil que se busca y las preguntas de la entrevista.'],
        ['Inducción', 'Le dice a quien llega qué se espera de él desde el primer día.'],
        ['Evaluación del desempeño', 'Da las responsabilidades y el nivel de competencias contra los que se evalúa.'],
        ['Formación y desarrollo', 'Muestra la brecha entre el perfil exigido y el de la persona, y el paso al escalón siguiente.'],
        ['Valoración de cargos y compensación', 'Ubica el cargo en su escalón y aporta los factores con que se gradúa.'],
        ['Gestión de la estructura', 'Ayuda a ver duplicidades, vacíos y cargos que sobran o que faltan.']
      ] },

    { id: 'construccion', titulo: 'Cómo se construyó',
      parrafos: ['El manual se desarrolló en dos fases, sobre los productos de la Fase 2 del proyecto.'],
      fases: [
        { t: 'Fase 1 · Diagnóstico y estructura patrón',
          d: 'Se revisaron los procesos, la estructura organizativa To-Be y el censo de personal, y se fijó la **estructura patrón de cargos**: los ocho escalones, del operario al director, con lo que cada uno exige saber, resolver y responder, y la experiencia que se estima para ocuparlo. Con ella se reclasifican los cargos.' },
        { t: 'Fase 2 · Elaboración de las descripciones',
          d: 'Se diseñó un formato común y se redactó cada descripción por familia de cargos, de arriba abajo, para que cada nivel se distinga del siguiente. Las fuentes son el manual de procesos To-Be (qué hace cada cargo en cada proceso), la estructura To-Be (a quién reporta y a quién supervisa), la estructura patrón (escalón, formación y experiencia), el diccionario de competencias, las fichas de talento de los ocupantes actuales —para contrastar, no para copiar— y las buenas prácticas de cargos similares en empresas de distribución.' }
      ],
      nota: 'Cada descripción nace como borrador y pasa por la validación del equipo antes de darse por definitiva.' },

    { id: 'organizacion', titulo: 'Cómo está organizado',
      items: [
        ['Una descripción por nombre de cargo', 'Si varias familias comparten un mismo nombre de cargo, como «Asistente de Gestión», la descripción es una sola, con una parte común y un apartado de **matices por unidad** donde cada familia dice lo propio.'],
        ['Agrupadas por familia', 'Una familia es el conjunto de cargos de un área de la estructura To-Be (por ejemplo, Servicios Generales u Operaciones y Logística). En el índice se recorren por familia.'],
        ['Cada cargo en un escalón', 'El escalón dice el nivel del cargo en la estructura patrón: Operario, Auxiliar, Analista I · II · III, Supervisor o Especialista, Coordinador, Gerente de unidad de negocio, Gerente o Director. El escalón fija la formación, la experiencia y el nivel de cargo, que dice qué competencias se exigen.'],
        ['El apellido', 'Cuando hace falta, el cargo toma como apellido el nivel de la estructura donde está la posición: corporativo o país. «Coordinador(a) País de Servicios Generales» es un coordinador cuya posición se repite en cada país. El escalón es el mismo; el apellido dice dónde se ejerce.'],
        ['El nombre lo pone la familia', 'El escalón es un nivel, no un nombre de cargo. Cada familia nombra sus cargos («Asesor(a) de Ventas», «Asistente de Gestión»), y dos nombres distintos pueden estar en un mismo escalón.']
      ] },

    { id: 'formato', titulo: 'El formato, sección por sección',
      parrafos: ['Toda descripción tiene las mismas partes, en el mismo orden. Esta es la guía para leer cada una. El ejemplo de cada ficha abre la parte correspondiente de una descripción del piloto.'],
      fichas: [
        { n: '·', t: 'Encabezado',
          que: 'La **denominación** del cargo, su **código**, la **unidad** de la estructura de la que depende y el **escalón** de la estructura patrón.',
          como: 'La denominación usa la forma inclusiva («Coordinador(a)») y, cuando aplica, el apellido corporativo o país. El código identifica la descripción y está por definir. La unidad es la gerencia, coordinación o dirección donde está la posición.',
          ej: ['Coordinador(a) País de Servicios Generales', 'coordinador-pais-servicios-generales'] },
        { n: 'I', t: 'Información del cargo/rol',
          que: '**Reporta a** (el superior inmediato, un solo cargo), **supervisa a** (los cargos que le reportan directamente, solo el primer nivel), el **diagrama de posición** y el **objetivo general**.',
          como: 'El diagrama muestra en tres filas al superior, al cargo descrito y a los cargos que supervisa; se dibuja solo a partir de «reporta a» y «supervisa a». El objetivo, en una o dos oraciones, dice qué asegura el cargo, cómo y para qué: es la razón de ser del puesto.',
          ej: ['Supervisor(a) de Servicios Generales', 'supervisor-servicios-generales', 's1'] },
        { n: 'II', t: 'Responsabilidad por procesos',
          que: 'Las responsabilidades del cargo, **agrupadas por el proceso** del manual de procesos To-Be al que pertenecen, más un grupo de «Otras responsabilidades del cargo» para lo que no es de un proceso (dirigir al equipo, controlar un presupuesto).',
          como: 'Cada responsabilidad empieza con un verbo en infinitivo y es una sola acción. El verbo dice el nivel: el de arriba define, autoriza y responde; el del medio organiza y verifica; el de abajo ejecuta y registra. Una responsabilidad no es un paso del flujo: agrupa los pasos que forman una misma obligación. La descripción cierra con una cláusula fija: realizar las demás actividades que asigne el superior inmediato.',
          ej: ['Coordinador(a) País de Servicios Generales', 'coordinador-pais-servicios-generales', 's2'] },
        { n: 'II', t: 'Matices por unidad',
          que: 'Solo en los cargos que comparten nombre entre familias. Después de las responsabilidades comunes, cada unidad tiene su apartado con lo que le es propio y su propia línea de reporte.',
          como: 'Lo común vale para todas las unidades; el matiz suma, no reemplaza. En el diagrama de posición, cada unidad lleva el suyo.',
          ej: ['Asistente de Gestión', 'asistente-de-gestion', 's2'] },
        { n: 'III', t: 'Perfil de competencias exigidas',
          que: '**Competencias genéricas**, las mismas para todos los cargos; **competencias específicas**, las del nivel de cargo al que pertenece su escalón; y **competencias técnicas**: formación, experiencia y habilidades y destrezas.',
          como: 'Cada competencia muestra **lo que exige el nivel de cargo**, sin números (ver «Cómo se leen las competencias»); su definición aparece al pasar el cursor. La formación y la experiencia las fija el escalón; la descripción solo precisa el área de estudio y el ámbito de la experiencia. Las habilidades nombran herramientas, métodos e idiomas, con su nivel.',
          ej: ['Asistente de Gestión', 'asistente-de-gestion', 's3'] },
        { n: 'IV', t: 'Información importante a considerar',
          que: 'Los **siete factores de responsabilidad** (dinero y bienes, equipos, gestión de procesos, personas, atención a clientes, información confidencial y resguardo de documentos), las **relaciones** internas y externas y el **marco normativo**.',
          como: 'Cada factor tiene una escala de grados y la descripción marca dónde cae el cargo (ver «Los siete factores»). Las relaciones nombran unidades, comités o tipos de actor externo, sin nombres de empresas. El marco normativo cita, en términos generales, las normas internas y la normativa vigente que rigen el cargo.',
          ej: ['Coordinador(a) País de Servicios Generales', 'coordinador-pais-servicios-generales', 's4'] },
        { n: 'V', t: 'Riesgos laborales asociados',
          que: 'Los tipos de riesgo a los que está expuesto el ocupante —de una lista fija de seis— y, para cada uno marcado, los riesgos probables.',
          como: 'Los riesgos se deciden por el **ambiente donde se trabaja** (oficina, tienda, bodega, taller, instalaciones), no por el nivel del cargo. Sirven para la inducción en seguridad y salud ocupacional y para planificar la prevención.',
          ej: ['Operario(a) de Servicios Generales', 'operario-servicios-generales', 's5'] },
        { n: '✎', t: 'Control del documento',
          que: 'Quién **elaboró**, **revisó** y **aprobó** la descripción, con su firma y la fecha.',
          como: 'Se completa en la validación. Mientras dice «Pendiente de validación», la descripción es un borrador. Las notas para la validación del equipo, al pie, recogen lo que falta decidir y no se imprimen.',
          ej: ['Operario(a) de Servicios Generales', 'operario-servicios-generales', 's6'] }
      ] },

    { id: 'competencias', titulo: 'Cómo se leen las competencias',
      parrafos: [
        'Las competencias son los comportamientos que el cargo exige para lograr sus resultados. Hay dos grupos: las **genéricas**, iguales para todos los cargos, porque expresan lo que Kenex espera de cualquier persona del grupo; y las **específicas**, que describen lo que exige trabajar en un nivel de cargo. Lo técnico de cada área no va aquí: va en las habilidades y destrezas.',
        'Las dos se ordenan por **nivel de cargo**. Hay cuatro, y cada uno agrupa escalones de la estructura patrón. Ninguna lleva número: lo que el cargo exige lo dice su nivel, y lo que distingue a dos escalones del mismo nivel lo da la estructura patrón (qué saben, qué resuelven, de qué responden y su experiencia).'
      ],
      // Las tablas y fichas de esta sección salen de meta (niveles_cargo, genericas, especificas, escala_evaluacion)
      // de descripciones-datos.js, para que la guía y las descripciones no puedan divergir.
      modelo: {
        niveles: 'Supervisor(a) y Especialista comparten escalón en la estructura patrón, pero no nivel de cargo: el supervisor dirige personas y va con el coordinador; el especialista es la autoridad de una materia y va con los analistas. El escalón sigue siendo el mismo para los dos.',
        genericas: 'Cada genérica tiene un descriptor por nivel de cargo, y el cargo exige el de su nivel. Un supervisor, por ejemplo, el de «Coordinación y supervisión» en las seis.',
        especificas: 'Cada nivel de cargo tiene sus competencias específicas, y aplican a todos sus escalones. Como ya pertenecen a un nivel, no llevan escala: tienen su definición y lo que se espera de quien ocupa el cargo.',
        escala: 'Para medir a una persona frente a lo que exige su cargo, en la evaluación del desempeño o en un plan de desarrollo, se usa una sola escala para todas las competencias. No va en la descripción de cargo.'
      },
      nota: 'Las competencias, sus definiciones y los descriptores salen del diccionario de competencias de la Fase 3, que valida el equipo de talento.' },

    { id: 'tecnicas', titulo: 'Formación, experiencia y habilidades',
      items: [
        ['Formación', 'Los conocimientos formales que exige el cargo, por nivel del sistema educativo (primaria, bachillerato, técnico medio, técnico superior, universitario, posgrado). El nivel lo fija el escalón; la descripción precisa el área de estudio y, si la hay, la alternativa (por ejemplo, formación técnica superior con más años de experiencia).'],
        ['Experiencia', 'Los años de práctica relacionada que se estiman para desempeñar el cargo con solvencia. Los fija el escalón —de 0 a 1 año en el operario a más de 15 en el director—; la descripción precisa en qué se adquiere.'],
        ['Habilidades y destrezas', 'Los conocimientos técnicos y las herramientas que el cargo usa (Odoo, Lark, hojas de cálculo, tableros de gestión, herramientas de IA), con su nivel, más los métodos e idiomas que exige.']
      ],
      tabla: { cols: ['Escalón', 'Experiencia estimada'], filas: [
        ['Operario(a)', '0 a 1 año'], ['Auxiliar', '6 meses a 2 años'], ['Analista I · II · III', '0 a 2 · 2 a 4 · 4 a 6 años'],
        ['Supervisor(a) · Especialista', '3 a 5 años · 6 a 10 años'], ['Coordinador(a)', '5 a 8 años, 1 o 2 conduciendo equipos'],
        ['Gerente de unidad de negocio', '8 a 12 años, con el canal en más de un país'], ['Gerente', '10 a 15 años, 5 o más dirigiendo áreas'], ['Director(a)', 'Más de 15 años, 5 o más en dirección'] ] },
      nota: 'La experiencia de cada escalón y lo que exige saber se detallan en la estructura patrón de cargos (punto 2 del índice).' },

    { id: 'factores', titulo: 'Los siete factores de responsabilidad',
      parrafos: ['Los factores de la Sección IV dicen de qué responde el cargo más allá de sus tareas: qué recursos maneja, a quién atiende y qué información custodia. Cada uno tiene grados de menor a mayor, y la descripción marca uno. Ningún factor queda en blanco: si no aplica, se marca «Ninguna» o «No».'],
      tabla: { cols: ['Factor', 'Qué mide', 'Grados, de menor a mayor'], filas: [
        ['Dinero y bienes', 'El manejo, la administración y la ejecución presupuestaria del dinero o los bienes del grupo.', 'Ninguna · Manejo general de bienes · Administración presupuestaria · Manejo financiero e inversiones'],
        ['Equipos', 'La obligación sobre máquinas, equipos y accesorios, según su complejidad y su costo.', 'Simple (equipos asignados al cargo o de apoyo) · Media (equipos de una unidad o coordinación) · Alta (equipos de un área o que impactan a toda la organización)'],
        ['Gestión de procesos', 'La participación del cargo en los procesos, con su alcance, su impacto y su complejidad.', 'Auxiliares · Profesionales (de apoyo) · De supervisión y coordinación · Gerenciales'],
        ['Personas', 'La supervisión de personas, según su alcance.', 'Ninguna · Un número determinado de personas · Un equipo responsable de una función · Equipos responsables de un subproceso · Equipos de un área o dirección'],
        ['Atención a clientes', 'La calidad del servicio que el cargo presta a clientes internos o externos.', 'Simple entrega · Esmero con el cliente · Atención especial · Excepcional'],
        ['Información confidencial', 'Si el cargo maneja información estratégica o confidencial.', 'No · Sí'],
        ['Resguardo de documentos', 'Si el cargo maneja documentos que debe custodiar.', 'No · Sí'] ] },
      nota: 'El factor «Personas» debe ser coherente con «Supervisa a» de la Sección I: un cargo que no supervisa a nadie marca «Ninguna».' },

    { id: 'riesgos', titulo: 'Los seis tipos de riesgo laboral',
      tabla: { cols: ['Tipo', 'Qué abarca'], filas: [
        ['Biológicos', 'Virus, bacterias u hongos por contacto con personas, objetos o instalaciones.'],
        ['Físicos', 'Elementos del lugar de trabajo: iluminación, temperatura, ruido, electricidad, caídas.'],
        ['Químicos', 'Sustancias que se inhalan o tocan: solventes, baterías, adhesivos, productos de limpieza.'],
        ['Mecánicos', 'Equipos, herramientas y cargas que pueden golpear, cortar, atrapar o caer.'],
        ['Psicosociales', 'Fatiga mental y emocional por la carga, el horario, el trato con terceros o la inseguridad.'],
        ['Disergonómicos', 'Trastornos musculoesqueléticos por posturas, esfuerzos y movimientos repetitivos.'] ] },
      nota: 'Dos cargos de escalones distintos que trabajan en el mismo ambiente comparten sus riesgos; uno de oficina y otro de bodega no, aunque estén en el mismo escalón.' },

    { id: 'vida', titulo: 'Ciclo de vida de una descripción',
      pasos: [
        ['Borrador', 'El equipo consultor redacta la descripción por familia y la publica en esta sección con el distintivo «Borrador para validación del equipo».'],
        ['Revisión', 'El equipo de talento y quien dirige la unidad la revisan: responsabilidades, perfil, factores y riesgos. Las notas de validación de cada descripción dicen qué conviene mirar.'],
        ['Aprobación', 'Quien corresponda la aprueba y se registran el elaborado, revisado y aprobado por, con fecha. Desde ahí es la versión vigente.'],
        ['Actualización', 'La descripción se revisa cuando cambian los procesos To-Be, la estructura o la estructura patrón, y al menos una vez al año. Cada cambio vuelve a pasar por revisión y aprobación.']
      ],
      nota: 'Quién elabora, revisa y aprueba las descripciones es una decisión pendiente del equipo.' },

    { id: 'glosario', titulo: 'Glosario',
      items: [
        ['Cargo', 'Conjunto de responsabilidades que la organización asigna a una o más posiciones con el mismo nombre.'],
        ['Posición', 'Cada puesto concreto de la estructura, que ocupa una persona. Un cargo puede tener varias posiciones.'],
        ['Familia de cargos', 'Los cargos de un área de la estructura To-Be, del escalón más alto al más bajo.'],
        ['Escalón', 'Nivel del cargo en la estructura patrón: Operario, Auxiliar, Analista I · II · III, Supervisor o Especialista, Coordinador, Gerente de unidad de negocio, Gerente o Director.'],
        ['Apellido', 'El nivel de la estructura donde está la posición —corporativo o país— que el cargo toma en su nombre cuando hace falta.'],
        ['Nivel de cargo', 'Grupo de escalones de la estructura patrón que comparten las mismas competencias específicas y el mismo descriptor de las genéricas. Hay cuatro.'],
        ['Deber ser', 'El cargo tal como debe funcionar en la estructura To-Be, distinto de cómo lo ejerce hoy su ocupante.'],
        ['Proceso To-Be', 'Proceso del manual de procesos de la Fase 2 en su versión propuesta. Las responsabilidades de cada cargo se agrupan por proceso.'],
        ['Matiz por unidad', 'Apartado de una descripción compartida con lo propio de una familia.'],
        ['Reclasificación', 'Ubicación de cada persona en el cargo y el escalón que le corresponden según la estructura patrón.']
      ] }
  ]
};
