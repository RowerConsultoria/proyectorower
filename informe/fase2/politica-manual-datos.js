/* Política de uso del Manual de Procesos — fuente única de #/politica-manual
 * (sección 2.3 del menú del manual). La pinta vistaPolitica() de
 * informe-fase2.html; se edita a mano.
 *
 * Forma: declaración + artículos con dos capas (que · como) + anexos. Bloques:
 * un texto suelto es un párrafo; si no, {t:'h'|'lista'|'tabla'|'nota', ...}.
 * Marcado en línea: **negrita** y [[tipo:id|texto]] — proc (To-Be del proceso),
 * macro (manual del macroproceso), sec (otro artículo de esta política) y doc
 * (otro documento: se nombra, sin enlace).
 *
 * Cada artículo se apoya en un proceso del macroproceso 20 (Gestión de Procesos
 * y Mejora Continua): la política dice qué es obligatorio y quién responde; el
 * proceso, cómo se hace. Los roles se nombran por función y por unidad de la
 * estructura To-Be, no por el cargo del V4.
 */
window.POLITICA_MANUAL = {
  id: 'politica-manual',
  titulo: 'Política de uso del Manual de Procesos',
  lede: 'Qué valor tiene el Manual de Procesos de Grupo Kenex, quién responde por él y cómo se usa, se cambia, se verifica y se mejora.',
  estado: 'borrador',
  version: '0.1',
  corte: '30-oct-2026',
  capas: { que: 'Qué establece', como: 'Cómo se cumple' },
  secciones: [

    { id: 'declaracion', titulo: 'Declaración', estado: 'borrador', bloques: [
      { t: 'nota', tipo: 'decision', titulo: 'Para firma de la Junta Directiva',
        x: 'Este es el nivel declarativo de la política: el compromiso del grupo, en una página. El nivel operativo, artículo por artículo, dice cómo se cumple.' },
      '**Grupo Kenex adopta su Manual de Procesos como la forma oficial de describir cómo trabaja.** Hasta ahora, cada área ha organizado sus procesos con su propio criterio y en formatos distintos, y buena parte del conocimiento vive en la experiencia de las personas. El manual reúne ese conocimiento en una base común, para que el trabajo no dependa de quién lo hace, para que una persona nueva aprenda rápido y para que el grupo pueda crecer en nuevos países y negocios sin rehacer su forma de operar.',
      'Con esta política, el grupo se compromete a mantener el manual vigente, a usarlo como referencia en el trabajo diario, a verificar que la operación lo siga y a mejorarlo de forma continua.',
      { t: 'h', x: 'Principios' },
      { t: 'lista', num: true, items: [
        '**El manual es uno solo y está vivo.** Hay una sola versión vigente de cada proceso, en un solo lugar, y se actualiza cuando la operación cambia.',
        '**El manual describe el deber ser.** Documentar no es solo registrar lo que se hace hoy: es acordar la mejor forma de hacerlo y trabajar a partir de ella.',
        '**Cada proceso tiene un dueño.** Una persona responde por que su proceso esté documentado, se cumpla y mejore.',
        '**Un proceso no está instalado hasta que el equipo lo usa.** Publicar no basta: hace falta comunicar, formar e incorporarlo a la inducción.',
        '**Verificar sirve para corregir, no para sancionar.** Una desviación puede corregirse en la operación o puede mostrar que el estándar debe revisarse.',
        '**Quien propone un cambio no lo aprueba solo.** Todo cambio pasa por la validación del dueño y por una segunda instancia.',
      ] },
    ] },

    { id: 'objeto', num: 1, titulo: 'Objeto y alcance', estado: 'borrador',
      que: [
        'Esta política establece el valor del Manual de Procesos, las responsabilidades sobre él y las reglas para usarlo, documentarlo, publicarlo, cambiarlo, verificar su cumplimiento y mejorarlo.',
        'Aplica a **todos los procesos del mapa de procesos del grupo**, a todas sus empresas y a todos los países donde opera, y a todas las personas que trabajan en ellas o para ellas.',
      ],
      como: [
        { t: 'lista', items: [
          'Cubre el ciclo completo del manual: su gobierno, su documentación y validación, su publicación y control de cambios, su implantación, la verificación de su cumplimiento y su mejora. Cada etapa está descrita en el macroproceso [[macro:20|Gestión de Procesos y Mejora Continua]].',
          'No sustituye a las políticas propias de cada materia (contable, de talento, de IA u otras): el manual describe cómo se ejecutan los procesos; esas políticas, las reglas de fondo de cada materia. Si un proceso contradice una política vigente, manda la política y el proceso se corrige.',
          'Las operaciones de socios y franquicias se rigen por sus contratos; el manual les sirve de referencia cuando el contrato lo prevé.',
        ] },
      ] },

    { id: 'definiciones', num: 2, titulo: 'Definiciones', estado: 'borrador',
      que: [ 'Para esta política, los siguientes términos tienen el significado que se indica.' ],
      como: [
        { t: 'tabla', cab: ['Término', 'Significado'], filas: [
          ['Manual de Procesos', 'El conjunto de la documentación de los procesos del grupo, publicado en la plataforma del grupo. Incluye el mapa de procesos, el manual de cada macroproceso y la ficha de cada proceso.'],
          ['Mapa de procesos', 'La organización de todos los procesos del grupo en macroprocesos estratégicos, operativos y de soporte, con su código y su dueño.'],
          ['Macroproceso', 'Agrupación de procesos que responden a una misma función del negocio. Tiene su propio manual, con su contexto, su gobernanza y su agenda de mejora.'],
          ['Proceso', 'Conjunto de actividades con un propósito, un dueño, un disparador y un resultado. Su ficha contiene propósito y alcance, dueño y participantes, disparador y resultado, flujo de actividades con su flujograma, riesgos e indicadores.'],
          ['Versión deber ser (To-Be)', 'La forma acordada de ejecutar un proceso. Es el estándar que se cumple.'],
          ['Versión actual (As-Is)', 'La descripción de cómo se ejecutaba el proceso cuando se documentó. Es una referencia, no un estándar.'],
          ['Dueño del proceso', 'El cargo que responde por que su proceso esté documentado, se cumpla y mejore.'],
          ['Versión vigente', 'La última versión publicada y aprobada de un proceso. Es la única que se aplica.'],
          ['Desviación', 'Diferencia entre cómo se ejecuta un proceso y lo que su versión vigente establece.'],
          ['Excepción', 'Autorización temporal y documentada para ejecutar un proceso de forma distinta a su versión vigente.'],
          ['Cambio menor / cambio mayor', 'Un cambio menor corrige o aclara sin alterar quién hace qué ni los controles. Un cambio mayor altera actividades, responsables, controles, sistemas o la frontera con otro proceso.'],
        ] },
      ] },

    { id: 'valor', num: 3, titulo: 'Valor del manual y repositorio único', estado: 'borrador',
      que: [
        'La **versión deber ser publicada** de cada proceso es el estándar oficial del grupo para ejecutarlo. Prevalece sobre instructivos, guías, wikis o documentos locales que describan el mismo proceso.',
        'El manual vive en **un solo repositorio**: la sección Manual de Procesos de la plataforma del grupo. Lo que está fuera de ese repositorio no es parte del manual.',
      ],
      como: [
        { t: 'lista', items: [
          'La versión actual (As-Is) se conserva como referencia histórica y para medir el avance; no se usa como estándar.',
          'Los documentos que cada área haya elaborado por su cuenta se reconocen como insumo valioso: al documentar el proceso se revisan, se integran en el manual lo que aporten y, una vez publicado, se retiran o se marcan como superados. Ver [[proc:20.2]].',
          'Un documento local de apoyo (por ejemplo, un instructivo de una tarea) puede existir si el proceso lo prevé y remite a él; nunca puede contradecir al proceso.',
          'Una copia impresa o descargada es solo de consulta: la vigente es siempre la del repositorio.',
        ] },
      ] },

    { id: 'gobierno', num: 4, titulo: 'Gobierno del manual', estado: 'borrador',
      que: [
        'El manual se gobierna en tres planos: quien **aprueba**, quien **custodia y coordina** y quien **responde por cada proceso**. Ninguna unidad aprueba sola lo que ella misma propone.',
      ],
      como: [
        { t: 'tabla', cab: ['Instancia', 'Qué le corresponde'], filas: [
          ['Junta Directiva', 'Aprueba esta política, el mapa de procesos y sus cambios, y la publicación o modificación de los procesos críticos. Recibe el informe periódico del estado del manual.'],
          ['Comité de Calidad y Mejora Continua', 'Revisa las políticas y los manuales de la gestión corporativa, valida los cambios mayores antes de su aprobación, verifica los estándares de gestión y orienta las prácticas hacia las certificaciones de calidad. Lo lidera y convoca Desarrollo Corporativo.'],
          ['Dirección de Desarrollo Corporativo', 'Es la dueña del gobierno de los procesos y de la implantación de los manuales. Decide qué se documenta o se actualiza y en qué orden, aprueba los procesos que no son críticos y sus cambios mayores, prioriza las mejoras, autoriza compartir el manual fuera del grupo y responde ante la Presidencia por que los procesos publicados se apliquen.'],
          ['PMO', 'Apoya a la Dirección de Desarrollo Corporativo en la operación del manual: custodia el mapa de procesos y el repositorio en su contenido, coordina el levantamiento, la validación y la publicación, mide la adherencia, lleva la cartera de mejoras y aprueba los cambios menores.'],
          ['Dueños de proceso', 'Responden por su proceso: validan su documentación, solicitan sus cambios, deciden qué hacer con sus desviaciones y proponen sus mejoras.'],
          ['Tecnología, Gobernanza del Dato y Cumplimiento', 'Administra el repositorio como sistema: su disponibilidad, sus respaldos y sus permisos de acceso. Confirma que lo documentado sea coherente con los sistemas del grupo.'],
          ['Formación · Universidad Corporativa', 'Forma a los equipos en los procesos nuevos o modificados y los incorpora a la inducción.'],
          ['Comunicación institucional (Asistencia Ejecutiva a la Presidencia)', 'Comunica los procesos nuevos o modificados a la organización, con una sola voz.'],
          ['Gerentes y supervisores', 'Aplican el manual en su equipo, acompañan los cambios y facilitan la verificación de su cumplimiento.'],
          ['Todas las personas', 'Conocen y aplican los procesos de su trabajo en su versión vigente, y proponen mejoras.'],
        ] },
        'Todo proceso del mapa tiene un dueño asignado. Mientras un proceso no tenga dueño, responde por él quien dirige la unidad a la que pertenece. Ver [[proc:20.1]].',
      ] },

    { id: 'uso', num: 5, titulo: 'Uso obligatorio del manual', estado: 'borrador',
      que: [
        'Toda persona ejecuta los procesos de su trabajo según su **versión vigente**. Cuando no sabe cómo actuar, el manual es la primera consulta.',
      ],
      como: [
        { t: 'lista', items: [
          'Cada gerente se asegura de que su equipo conozca los procesos que le tocan y sepa dónde consultarlos.',
          'La inducción de toda persona que ingresa incluye los procesos de su cargo. Ver [[proc:20.6]].',
          'Las descripciones de cargo y los planes de formación remiten a los procesos del manual.',
          'Quien detecta que un proceso no se puede cumplir tal como está escrito lo informa a su dueño (ver el [[sec:adherencia|artículo 9]]); no lo cambia por su cuenta ni deja de cumplirlo sin una excepción autorizada.',
        ] },
      ] },

    { id: 'documentacion', num: 6, titulo: 'Documentación y validación de procesos', estado: 'borrador',
      que: [
        'Todo proceso se documenta con el **mismo método y el mismo contenido mínimo**, y se valida con su dueño y con las áreas que participan en él antes de publicarse.',
      ],
      como: [
        { t: 'lista', num: true, items: [
          '**Priorizar.** La Dirección de Desarrollo Corporativo decide qué proceso se documenta o se actualiza, a propuesta de la PMO y según la cola del mapa de procesos.',
          '**Levantar.** Se describe la operación real con quienes la ejecutan en cada país, y se recoge lo que el área ya tenga escrito.',
          '**Contrastar y diseñar.** Se compara con las buenas prácticas del sector y se diseña la versión deber ser.',
          '**Redactar.** Se documenta con el contenido mínimo del [[sec:anexos|anexo B]].',
          '**Validar.** El dueño del proceso y las áreas involucradas confirman que el proceso es correcto y ejecutable; Tecnología confirma que es coherente con los sistemas.',
          '**Aprobar.** Los procesos críticos los aprueba la Junta Directiva, previa revisión del Comité de Calidad y Mejora Continua. Los demás los aprueba la Dirección de Desarrollo Corporativo, con la validación del dueño y a propuesta de la PMO.',
        ] },
        'El detalle está en [[proc:20.2]]. Las observaciones de la validación quedan registradas en la plataforma con su autor y su respuesta.',
      ] },

    { id: 'publicacion', num: 7, titulo: 'Publicación, versiones y control de cambios', estado: 'borrador',
      que: [
        'Cada proceso tiene **una sola versión vigente**, con su número de versión y su fecha. Ningún proceso publicado se modifica sin una solicitud formal y su aprobación.',
      ],
      como: [
        { t: 'lista', items: [
          'Al publicar una versión nueva, la anterior queda como superada y se conserva en el historial del proceso, con la fecha y los cambios de cada versión.',
          'Un cambio lo solicita el dueño del proceso, o la PMO con su acuerdo, por el canal formal de la plataforma.',
          'Los **cambios menores** los aprueba la PMO con el visto bueno del dueño. Los **cambios mayores** siguen el mismo camino que la primera publicación ([[sec:documentacion|artículo 6]]). Ver el [[sec:anexos|anexo C]].',
          'Todo cambio se notifica a quienes participan en el proceso, y se actualiza el material de inducción cuando corresponde.',
          'Un cambio que afecta a otro proceso se coordina con su dueño antes de publicarse.',
        ] },
        'El detalle está en [[proc:20.3]].',
      ] },

    { id: 'mapa', num: 8, titulo: 'Gobierno del mapa de procesos', estado: 'borrador',
      que: [
        'El mapa de procesos es **único para todo el grupo**. Crear, fusionar, dividir o eliminar un macroproceso o un proceso, o cambiar su dueño, es un cambio del mapa y lo aprueba la Junta Directiva.',
      ],
      como: [
        { t: 'lista', items: [
          'Un cambio del mapa se origina en un cambio de estructura, la llegada de una empresa o un negocio nuevo, o una revisión de fronteras entre procesos.',
          'La PMO evalúa su efecto sobre los niveles, la nomenclatura y las fronteras; los dueños afectados lo revisan; Tecnología verifica su efecto en los sistemas.',
          'Los códigos de los procesos no se reutilizan: un proceso eliminado conserva su código en el historial.',
        ] },
        'El detalle está en [[proc:20.1]].',
      ] },

    { id: 'adherencia', num: 9, titulo: 'Cumplimiento, desviaciones y excepciones', estado: 'borrador',
      que: [
        'El grupo **verifica de forma periódica** que la operación siga los procesos publicados. La verificación busca corregir y aprender, no sancionar.',
      ],
      como: [
        { t: 'lista', items: [
          'La PMO define, con cada dueño, los puntos de control de su proceso, y programa revisiones periódicas y, cuando conviene, sorpresivas en cada país.',
          'Toda desviación se registra con su causa y se entrega al dueño del proceso, que decide si se corrige en la operación o si el estándar debe revisarse.',
          'Cuando un proceso no puede cumplirse temporalmente, su dueño puede autorizar una **excepción** por escrito, con su motivo, su alcance y su fecha de término. Una excepción que se repite es una señal de que el proceso debe revisarse.',
          'Las excepciones que tocan controles financieros, de inventario o de acceso requieren además la autorización de la unidad responsable de esos controles.',
        ] },
        'El detalle está en [[proc:20.5]].',
      ] },

    { id: 'mejora', num: 10, titulo: 'Mejora continua', estado: 'borrador',
      que: [
        'Cualquier persona puede **proponer una mejora** a un proceso. Las mejoras se evalúan, se priorizan, se ejecutan y se verifican, y su resultado se incorpora al manual.',
      ],
      como: [
        { t: 'lista', items: [
          'Las fuentes de una mejora son: el hallazgo de una revisión o auditoría, un problema reportado por el dueño, un indicador fuera de rango o la propuesta de un colaborador.',
          'La propuesta se presenta a la PMO, que evalúa su impacto y su esfuerzo; la Dirección de Desarrollo Corporativo la prioriza, y la PMO la planifica con el área.',
          'Al cierre se compara el resultado con la situación inicial, y la mejora implantada se publica como versión nueva del proceso ([[sec:publicacion|artículo 7]]).',
          'Cada macroproceso mantiene su agenda de mejora y brechas en el manual.',
        ] },
        'El detalle está en [[proc:20.4]].',
      ] },

    { id: 'implantacion', num: 11, titulo: 'Implantación, comunicación y formación', estado: 'borrador',
      que: [
        'Todo proceso nuevo o modificado que cambie la forma de trabajar de un equipo **se comunica, se enseña y se acompaña** hasta que queda instalado.',
      ],
      como: [
        { t: 'lista', items: [
          'La PMO identifica a qué equipos afecta el cambio y lo traslada a Formación y a la comunicación institucional.',
          'La comunicación institucional informa el cambio a los equipos afectados.',
          'Formación capacita a los equipos y actualiza la inducción.',
          'Los gerentes acompañan los primeros ciclos y reportan los ajustes que surjan.',
          'La Dirección de Desarrollo Corporativo confirma, con el seguimiento de la PMO, que tras los primeros ciclos el proceso quedó instalado.',
        ] },
        'El detalle está en [[proc:20.6]].',
      ] },

    { id: 'acceso', num: 12, titulo: 'Acceso y confidencialidad', estado: 'borrador',
      que: [
        'El manual es **información interna del grupo**. Se consulta con una cuenta personal y cada persona ve y hace lo que su rol le permite.',
      ],
      como: [
        { t: 'lista', items: [
          'Consultar el manual es un permiso de lectura; validar, anotar o proponer cambios son permisos distintos, que se asignan a quien le corresponde.',
          'Tecnología, Gobernanza del Dato y Cumplimiento otorga y retira los accesos, con el mínimo privilegio, a pedido de la unidad responsable.',
          'El manual no se comparte fuera del grupo sin autorización de la Dirección de Desarrollo Corporativo. Cuando un tercero (un proveedor, un auditor, un socio) necesita conocer un proceso, se le entrega solo lo necesario.',
          'Las cuentas de quienes dejan el grupo se desactivan el mismo día.',
        ] },
      ] },

    { id: 'ia', num: 13, titulo: 'Uso de inteligencia artificial sobre el manual', estado: 'borrador',
      que: [
        'La inteligencia artificial puede ayudar a consultar, explicar y redactar el manual, pero **ningún cambio lo publica la IA**: toda propuesta la revisa y la aplica una persona autorizada.',
      ],
      como: [
        { t: 'lista', items: [
          'El asistente del manual responde preguntas sobre los procesos y puede proponer cambios al flujo de actividades. Cada propuesta se muestra con sus diferencias y se aplica solo cuando una persona autorizada la acepta.',
          'Toda versión que nace de una propuesta de la IA queda registrada en el historial, igual que cualquier otra.',
          'Una respuesta de la IA no sustituye al manual: ante una diferencia, manda el proceso publicado.',
          'El uso de la IA sigue la [[doc:politica|Política de adopción de IA]] del grupo.',
        ] },
      ] },

    { id: 'revision', num: 14, titulo: 'Revisión y vigencia', estado: 'borrador',
      que: [
        'Esta política entra en vigor al ser aprobada por la Junta Directiva y se revisa con un ritmo fijo y cada vez que algo importante cambia.',
      ],
      como: [
        { t: 'lista', items: [
          '**Cada año**, la Dirección de Desarrollo Corporativo revisa la política y el estado del manual, con el apoyo de la PMO; el Comité de Calidad y Mejora Continua la revisa y la eleva a la Junta con el informe de adherencia y mejoras.',
          '**Cada proceso** se revisa al menos una vez al año con su dueño, aunque no haya cambiado.',
          '**De forma extraordinaria**, ante un cambio de estructura, la llegada de un negocio nuevo o un hallazgo crítico.',
          'Cada versión de la política queda registrada con su fecha, sus cambios y su aprobación.',
        ] },
      ] },

    { id: 'incumplimiento', num: 15, titulo: 'Incumplimiento', estado: 'borrador',
      que: [
        'La política busca ordenar y habilitar, no castigar. Pero un estándar que no se cumple deja de serlo.',
      ],
      como: [
        { t: 'lista', items: [
          'Una desviación detectada se trata primero como oportunidad de corrección ([[sec:adherencia|artículo 9]]).',
          'La desviación que se repite sin causa justificada, el cambio de un proceso por fuera del canal formal o la difusión no autorizada del manual se tratan según el reglamento interno de cada empresa.',
        ] },
      ] },

    { id: 'anexos', titulo: 'Anexos', estado: 'borrador', bloques: [
      { t: 'h', x: 'A. Matriz de responsabilidades' },
      'R: responsable de hacerlo · A: aprueba · C: es consultado · I: es informado.',
      { t: 'tabla', cab: ['Actividad', 'Junta', 'Comité de Calidad', 'Desarrollo Corporativo', 'PMO', 'Dueño del proceso', 'Tecnología', 'Formación'], filas: [
        ['Aprobar la política', 'A', 'C', 'R', 'C', 'I', 'I', 'I'],
        ['Mantener el mapa de procesos', 'A', 'C', 'R', 'C', 'C', 'C', 'I'],
        ['Documentar y validar un proceso', 'I', 'I', 'C', 'R', 'A', 'C', 'I'],
        ['Aprobar un proceso crítico', 'A', 'C', 'R', 'C', 'C', 'I', 'I'],
        ['Aprobar un cambio menor', '—', '—', 'I', 'A', 'R', 'I', 'I'],
        ['Aprobar un cambio mayor', 'A (críticos)', 'C', 'R · A (los demás)', 'C', 'R', 'C', 'I'],
        ['Publicar y versionar', '—', '—', 'I', 'A/R', 'C', 'C', 'I'],
        ['Verificar el cumplimiento', 'I', 'I', 'C', 'R', 'A', 'C', '—'],
        ['Autorizar una excepción', '—', '—', '—', 'I', 'A', 'C', '—'],
        ['Priorizar y ejecutar una mejora', 'I', 'C', 'A', 'R', 'R', 'C', 'I'],
        ['Implantar y formar', 'I', 'I', 'A', 'R', 'C', 'I', 'R'],
        ['Otorgar y retirar accesos', '—', '—', '—', 'C', 'I', 'A', '—'],
      ] },
      'En todos los casos, el cambio mayor pasa antes por la revisión del Comité de Calidad y Mejora Continua.',
      { t: 'h', x: 'B. Contenido mínimo de la documentación' },
      { t: 'tabla', cab: ['Nivel', 'Secciones'], filas: [
        ['Manual de cada macroproceso', 'Introducción · Contexto · Gobernanza · Marco de referencia · Procesos · Agenda de mejora y brechas · Anexos'],
        ['Ficha de cada proceso', 'Propósito y alcance · Dueño y participantes · Disparador, cadencia y resultado · Flujo de actividades con su flujograma · Matriz de riesgos · Indicadores'],
      ] },
      'Las secciones son las mismas para todos los procesos; lo que cambia es su contenido. Todo dato que no tenga sustento se marca como pendiente, no se inventa.',
      { t: 'h', x: 'C. Tipos de cambio' },
      { t: 'tabla', cab: ['Tipo', 'Ejemplos', 'Quién aprueba'], filas: [
        ['Menor', 'Corrección de redacción, aclaración de un paso, actualización de un nombre de cargo o de un formato, sin alterar quién hace qué.', 'PMO, con el visto bueno del dueño'],
        ['Mayor', 'Agregar, quitar o reordenar actividades; cambiar responsables, controles o sistemas; modificar un indicador o la frontera con otro proceso.', 'Como una primera publicación: Dirección de Desarrollo Corporativo, o Junta si el proceso es crítico, previa revisión del Comité'],
        ['Del mapa', 'Crear, fusionar, dividir o eliminar un macroproceso o un proceso, o cambiar su dueño.', 'Junta Directiva'],
      ] },
    ] },
  ],
};
