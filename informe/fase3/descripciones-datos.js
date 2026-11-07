/* Descripciones de cargo — Fase 3 (Grupo Kenex · UCAB Consultores)
   Fuente única de la sección «Fase 3» del aplicativo (informe/fase3/descripciones-cargo.html).
   Se edita a mano. Cada descripción sigue el «Esquema_Descripcion_de_Cargo» (v0.2, lista de cargos V5):
   encabezado, secciones I a V y pie. Lo automático no se guarda aquí: el diagrama de posición sale de
   reporta_a y supervisa_a, y la cláusula final, el texto de la Sección V y el pie los pone la página.
   Reglas: sin nombres de personas; «Kenex» con una sola «n»; tono formal; la formalización como
   habilitación. `familias` es el índice de las 26 familias del V5 con sus cargos (sin ocupantes). */
window.DESCRIPCIONES_CARGO = {
  meta: {
    version: 'Piloto · 06-nov-2026',
    lista: 'Catálogo de Cargos V5 (105 códigos, 97 descripciones)',
    estado: 'Borrador para validación del equipo',
    clausula: 'Realizar todas las demás actividades que le sean asignadas por su superior inmediato y faciliten el buen funcionamiento de la unidad.',
    intro_riesgos: 'La naturaleza de las responsabilidades asociadas a este cargo implica que el ocupante esté sujeto principalmente a los siguientes riesgos laborales:',
    genericas: ['Orientación al Cliente y al Servicio', 'Orientación a Resultados y Calidad', 'Alfabetización y Adopción de Inteligencia Artificial',
      'Colaboración y Trabajo en Equipo Multipaís', 'Compromiso Organizacional', 'Adaptabilidad y Aprendizaje Continuo'],
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
    { id: 'OPL', nombre: 'Operaciones y Logística', unidad: 'Operaciones y Logística', cargos: ['Gerente Corporativo(a) de Operaciones y Logística', 'Gerente País de Operaciones y Logística', 'Coordinador(a) / Jefe(a) de Logística', 'Supervisor(a) de Bodega', 'Analista de Logística II', 'Analista de Logística I', 'Auxiliar de Operaciones', 'Operario(a) de Operaciones'] },
    { id: 'SSG', nombre: 'Servicios Generales', unidad: 'Operaciones y Logística', piloto: true,
      cargos: ['Coordinador(a) de Servicios Generales II', 'Coordinador(a) de Servicios Generales I', 'Asistente de Gestión', 'Operario(a) de Servicios Generales'] },
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

    'coordinador-servicios-generales-ii': {
      denominacion: 'Coordinador(a) de Servicios Generales II',
      codigo: null, codigos_v5: ['SSG-35'], familias: ['SSG'],
      unidad: 'Servicios Generales · coordinación país dentro de Operaciones y Logística',
      estado: 'borrador', situacion: 'Con ocupantes hoy',
      reporta_a: 'Gerente País de Operaciones y Logística',
      supervisa_a: ['Coordinador(a) de Servicios Generales I', 'Asistente de Gestión', 'Operario(a) de Servicios Generales'],
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
      competencias: { tramo: 'Supervisión y coordinación', nivel: { genericas: 3, del_cargo: 4 },
        del_cargo: ['Planificación y organización', 'Dirección y desarrollo de equipos', 'Seguimiento y control', 'Toma de decisiones operativas'] },
      tecnicas: {
        formacion: 'Licenciado(a) o Ingeniero(a) en Administración, Ingeniería de Mantenimiento, Ingeniería Industrial o afines. Alternativa: Técnico Superior Universitario (TSU) en Electricidad, Mantenimiento o Administración, con 7 años de experiencia.',
        experiencia: '5 años en servicios generales, mantenimiento de instalaciones o administración de sedes.',
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
      notas: ['El manual To-Be asigna hoy las tareas de Servicios Generales al rol «Asistente Administrativo(a) / Servicios Generales». Aquí se reparten por nivel: la coordinación define, autoriza y verifica; el asistente y el operario ejecutan.',
        'El To-Be dibuja tres cajas de esta coordinación (PA, VE y CO); hoy hay un ocupante.']
    },

    'coordinador-servicios-generales-i': {
      denominacion: 'Coordinador(a) de Servicios Generales I',
      codigo: null, codigos_v5: ['SSG-30'], familias: ['SSG'],
      unidad: 'Servicios Generales · coordinación país dentro de Operaciones y Logística',
      estado: 'borrador', situacion: 'Nivel espejo, sin ocupantes hoy (nombre por validar)',
      reporta_a: 'Coordinador(a) de Servicios Generales II',
      supervisa_a: [],
      objetivo: 'Organizar y verificar la ejecución diaria de los servicios generales de una sede o de un frente asignado —mantenimiento, seguridad física, suministros o servicios contratados—, siguiendo los planes y las prioridades que fija la coordinación del país, para que cada solicitud se atienda a tiempo y quede registrada.',
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
          'Reportar a la coordinación del país el avance, los desvíos y los costos de los servicios de la sede asignada.',
          'Cumplir y hacer cumplir las normas de seguridad y salud ocupacional en las labores de servicios generales.'] }
      ],
      competencias: { tramo: 'Supervisión y coordinación', nivel: { genericas: 3, del_cargo: 3 },
        del_cargo: ['Planificación y organización', 'Dirección y desarrollo de equipos', 'Seguimiento y control', 'Toma de decisiones operativas'] },
      tecnicas: {
        formacion: 'Licenciado(a) o Ingeniero(a) en Administración, Ingeniería de Mantenimiento, Ingeniería Industrial o afines. Alternativa: Técnico Superior Universitario (TSU) en Electricidad, Mantenimiento o Administración, con 5 años de experiencia.',
        experiencia: '3 años en servicios generales, mantenimiento de instalaciones o administración de sedes.',
        habilidades: ['Mantenimiento eléctrico, de alumbrado y de sistemas de alarma', 'Supervisión de contratistas en sitio', 'Seguridad física y control de acceso',
          'Control de inventario de suministros', 'Odoo: intermedio', 'Excel y Lark: intermedio', 'Herramientas de IA: intermedio', 'Inglés básico (deseable)'] },
      especificas: { 'Dinero y bienes': 'Manejo general de bienes', 'Equipos': 'Simple (equipos asignados al cargo o de apoyo)',
        'Gestión de procesos': 'De supervisión y coordinación', 'Personas': 'Ninguna',
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
      notas: ['Nivel espejo del V5: no tiene ocupantes ni caja en el To-Be. Mientras no se active, nadie le reporta; si se activa, conviene decidir qué personal de la sede pasa a su cargo y ajustar el factor «Personas».',
        'El nombre del cargo está por validar.']
    },

    'asistente-de-gestion': {
      denominacion: 'Asistente de Gestión',
      codigo: null, codigos_v5: ['PRE-10', 'SSG-10', 'MAY-10', 'ECO-10', 'MKT-10', 'EXV-10', 'CRE-10', 'DCO-10'],
      familias: ['PRE', 'SSG', 'MAY', 'ECO', 'MKT', 'EXV', 'CRE', 'DCO'],
      unidad: 'Común a ocho unidades (ver matices por unidad)',
      estado: 'borrador', situacion: 'Con ocupantes hoy · descripción compartida',
      reporta_a: 'Coordinación de la unidad a la que pertenece',
      reporta_por_unidad: { 'Servicios Generales': 'Coordinador(a) de Servicios Generales II' },
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
        { unidad: 'Servicios Generales', codigos_v5: ['SSG-10'], reporta_a: 'Coordinador(a) de Servicios Generales II',
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
      competencias: { tramo: 'Apoyo y asistencial', nivel: { genericas: 1, del_cargo: 3 },
        del_cargo: ['Sentido de responsabilidad', 'Calidad y orden en el trabajo', 'Apego a normas y procedimientos'] },
      tecnicas: {
        formacion: 'Bachiller.',
        experiencia: '1 año en labores administrativas, de asistencia o de atención al público.',
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
      notas: ['Descripción común a ocho familias. En este piloto solo se redactaron los matices de Servicios Generales; los de las otras siete unidades se añaden al llegar a cada familia.',
        'Frente a la propuesta del archivo de insumos se subieron dos factores: «Información confidencial» a «Sí» (traslada documentos y valores) y «Atención a clientes» a «Esmero con el cliente» (recepción y atención de visitantes).',
        'La mensajería no figura en el manual para este cargo: el proceso «Mensajería, correspondencia y transporte administrativo» la asigna hoy al personal de bodega. Se incluyó porque es la función que ejercen sus ocupantes; validar con Operaciones y Logística.']
    },

    'operario-servicios-generales': {
      denominacion: 'Operario(a) de Servicios Generales',
      codigo: null, codigos_v5: ['SSG-05'], familias: ['SSG'],
      unidad: 'Servicios Generales · coordinación país dentro de Operaciones y Logística',
      estado: 'borrador', situacion: 'Con ocupantes hoy',
      reporta_a: 'Coordinador(a) de Servicios Generales II',
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
      competencias: { tramo: 'Apoyo y asistencial', nivel: { genericas: 1, del_cargo: 3 },
        del_cargo: ['Sentido de responsabilidad', 'Calidad y orden en el trabajo', 'Apego a normas y procedimientos'] },
      tecnicas: {
        formacion: 'Educación primaria completa; bachiller (deseable). Para las labores de vigilancia, la certificación que exija la normativa de cada país.',
        experiencia: 'Sin experiencia exigida; 6 meses en vigilancia, limpieza o mantenimiento (deseable).',
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
      notas: ['Sus ocupantes actuales ejercen la vigilancia. La descripción suma la limpieza y el mantenimiento menor porque la coordinación declara personal a su cargo en esas labores; validar si son de este cargo o de otro.',
        '«Resguardo de documentos» se subió a «Sí» frente a la propuesta: lleva el libro de novedades y los registros de acceso.']
    }
  }
};
