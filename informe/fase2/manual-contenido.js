// Contenido real de los manuales de «Fase 2 — Procesos» — piloto.
//
// Se llena macroproceso por macroproceso. HOY: macro 9 (Ventas Retail) —
// Contexto y Gobernanza a nivel de macroproceso, y el proceso 9.3
// (Reposición de tiendas y kioscos) completo como piloto de validación.
//
// Fuentes cruzadas: entrevistas E-47 María Eugenia (VE, F2), E-55 Handani
// (regional, F2), E-53 Blas García (PA, F2) — Insumos/Entrevistas_dialogo_
// limpio_agrupadas/Ventas Retail — + doc de Lark «Departamento de Ventas al
// Detal, jun-2026» (VE) + el flujograma de referencia
// Ventas_Retail_Proceso_9_3.bpmn (equipo consultor) + marcos de gestión de
// inventario/reposición de la disciplina de cadena de suministro (ASCM/APICS).
//
// Estado de este contenido: BORRADOR — pendiente de revisión del equipo.
// No editar a mano el árbol (eso sale de manual-procesos-datos.js); este
// archivo solo aporta el contenido de las secciones.

window.MANUAL_CONTENIDO = {
 "9": {
  "n0": {

   "introduccion": {
    "estado": "borrador",
    "proposito": "Este manual reúne cómo se opera hoy —y cómo debería operarse de forma homologada— la venta al detal de Grupo Kenex: las tiendas y kioscos propios de Casio y Cubitt en la región. Sirve como referencia única para que un país nuevo, una tienda nueva o una persona nueva en el cargo puedan operar bajo el mismo estándar, sin depender de que alguien \"lo sepa de memoria\".",
    "alcance": "Desde la planificación comercial y el pronóstico por tienda hasta el cierre de caja, el control de inventario y la garantía en el punto de venta. No incluye la venta mayorista (macro 8, Ventas Mayor) ni el canal de comercio electrónico (macro 10, Ventas Web), aunque los tres canales comparten catálogo e inventario y coordinan campañas y disponibilidad de producto.",
    "audiencia": [
     "Gerente Regional de Retail (LATAM)",
     "Gerente de Ventas al Detal por país",
     "Supervisores de tienda (Casio, Cubitt, Inventario)",
     "Gerente de Tienda y Subgerente",
     "Gerencia de Operaciones y Logística",
     "Talento Humano, Mercadeo y Visual Merchandising (co-responsables funcionales)",
     "Junta / Comité Directivo (seguimiento de forecast y P&L por tienda)"
    ]
   },

   "contexto": {
    "estado": "borrador",
    "ubicacion": "Ventas Retail es, junto con Ventas Mayor y Ventas Web, uno de los tres canales de venta de la cadena de valor operativa. Recibe la mercancía ya nacionalizada y asignada por Logística y Operaciones, y ejecuta el plan y las metas que fija Planeación Comercial, homologando con Gestión de Datos e Inteligencia de Negocio el pronóstico por tienda. Entrega a Contabilidad el cierre diario de caja de cada punto de venta y coordina con Talento Humano el gobierno operativo del personal de tienda (dotación, código de vestimenta, comisiones).\n\nEn el peso relativo del mapa es el canal con más puntos de contacto físico con el cliente final: solo en Venezuela opera 21 puntos entre tiendas y kioscos, con una plantilla de más de 130 personas en campo (gerentes, subgerentes, asesores, cajeras, relojeros y seguridad), y la región completa está migrando hacia una \"torre de control\" única que consolide ventas, inventario y forecast de todos los países y franquicias.",
    "duenos": [
     ["Regional", "Gerente Regional de Retail (LATAM)", "Homologa la estrategia entre países, aprueba el forecast regional y consolida indicadores en la torre de control."],
     ["País", "Gerente de Ventas al Detal (país)", "Ejecuta la estrategia local, aprueba pedidos de reposición sobre el umbral del país y decide transferencias entre tiendas."],
     ["Punto de operación", "Gerente de Tienda", "Ejecución diaria: caja, inventario, personal, garantías y cumplimiento del proceso en su punto de venta."]
    ],
    "entidades": [
     ["Distribuidora Rower C.A.", "Venezuela", "Operación propia", "21 puntos de venta (Casio 4 · Cubitt 9 · mixtas 2 en Caracas, 6 en el interior); responsabilidad de inventario descontada al personal de tienda ante faltante."],
     ["Cubitt Panamá", "Panamá", "Operación propia", "Piloto en curso: pedido generado directo desde el almacén central regional (Colón/Colombia) en vez del almacén local (Obarrio)."],
     ["Kenex Trading (regional)", "Colombia", "Sede de la Gerencia Regional de Retail", "Bodega central regional para el piloto de despacho directo a Panamá y otros países."],
     ["Importbel, S.A.", "Costa Rica", "Sociedad (socio)", "Alineado a los mismos cuadros de meta y KPI que la operación propia, bajo la misma \"torre de control\"."],
     ["Franquicias (Guatemala, Honduras, Nicaragua, República Dominicana)", "Centroamérica / Caribe", "Franquicia con fee de servicio", "Sistemas propios distintos (p. ej. Power BI de un operador logístico tercero); reportan por interfaz aparte hacia la torre de control regional."]
    ],
    "sistemas": [
     ["Odoo (ERP)", "Pedidos, traslados entre bodega y tienda, facturación, cierre de caja", "Reposición, transferencias, cierre de caja, garantías"],
     ["Lark", "Comunicación de campo cuando hay señal; ficha de necesidad del punto de venta", "Reposición, comunicación con gerentes de tienda"],
     ["WhatsApp", "Comunicación de campo de respaldo cuando Lark no está descargado o la señal falla", "Coordinación diaria, incidencias, aperturas"],
     ["Cuadro de KPI diario (Drive) → torre de control regional (en desarrollo)", "Ventas, tráfico, conversión, UPT/BPT por tienda y país", "Seguimiento comercial, forecast, comisiones"],
     ["Follow Up", "Herramienta de conteo de tráfico en el punto de venta: registra cuántos visitantes entran a la tienda y cuántos de ellos compran, para calcular la tasa de conversión", "Seguimiento comercial, esquema de comisiones"],
     ["WMS / dispositivo móvil (bodega)", "Preparación y despacho de pedidos de reposición", "Reposición"]
    ],
    "interfaces": [
     ["Compras y Abastecimiento / Logística y Operaciones", "Entrada", "Mercancía nacionalizada, asignada y despachada hacia cada punto de venta."],
     ["Planeación Comercial", "Entrada", "Metas de venta y forecast por tienda y por país."],
     ["Gestión de Datos e Inteligencia de Negocio", "Coordinación", "Pronóstico de demanda y consolidación de KPI en la torre de control."],
     ["Contabilidad", "Salida", "Cierre de caja diario por punto de venta; conciliación de valija de efectivo y documentos."],
     ["Gestión del Talento Humano", "Coordinación", "Dotación, código de vestimenta, esquema de comisiones e incentivos, selección de personal de tienda."],
     ["Gestión de Mercadeo y Comunicaciones", "Entrada", "Campañas, material POP y lanzamientos que impactan la exhibición y el pedido de reposición."],
     ["Gestión Legal y Cumplimiento", "Coordinación", "Patentes y permisología municipal por punto de venta; contratos de franquicia."]
    ]
   },

   "gobernanza": {
    "estado": "borrador",
    "actores": [
     ["Gerente Regional de Retail (LATAM)", "Regional", "Homologa estrategia, forecast y esquemas de comisión entre países; desarrolla la torre de control.", "Ajustes de forecast regional dentro de lo aprobado; incorporación de franquicias bajo el esquema homologado.", "Presupuesto y expansión (nuevas tiendas) escalan a la Junta / Comité Directivo."],
     ["Gerente de Ventas al Detal (país)", "País", "Ejecuta la estrategia local; aprueba reposición sobre el umbral del país; decide transferencias entre tiendas.", "Ajustes al sugerido de reposición; transferencias entre tiendas del mismo país.", "Pedidos que exceden el umbral local escalan al Gerente Regional; incidencias de transporte escalan a Operaciones y Logística."],
     ["Supervisor de tienda (Casio / Cubitt / Inventario)", "País — varios puntos", "Visitas, auditoría de instalaciones, capacitación, apoyo operativo en caja y atención.", "Llamados de atención verbales al personal de tienda; ajustes menores de inventario por diferencia de color.", "Reincidencias de personal y faltantes injustificados escalan al Gerente de Ventas al Detal."],
     ["Gerente de Tienda", "Punto de operación", "Ejecución diaria: caja, inventario, personal, garantías, cumplimiento del proceso de reposición.", "Aprobación de vacaciones sujeta a cobertura; primera instancia ante incidencias de personal.", "Faltantes de personal, incidencias reincidentes y desviaciones de meta escalan al Supervisor o al Gerente de Ventas al Detal."],
     ["Gestión del Talento Humano / Mercadeo / Visual Merchandising / TI / Logística", "Transversal", "Co-responsables funcionales en aperturas, remodelaciones, dotación y campañas.", "Dentro de su función (p. ej. distribución de dotación una vez aprobado el headcount).", "Decisiones que comprometen presupuesto o cronograma de apertura escalan al comité de apertura."]
    ],
    "comites": [
     ["Reunión semanal de gerentes de tienda (por país)", "Alinear operación de la semana: promociones, pendientes, novedades de sistema o personal.", "Semanal (lunes)", "Gerente de Ventas al Detal · Supervisores · Gerentes y Subgerentes de tienda", "Ajustes operativos de la semana", "Reportes fotográficos y de KPI de cada tienda", "Acuerdos operativos y tareas pendientes de la semana"],
     ["Cierre ejecutivo mensual (regional)", "Revisar el negocio a nivel regional: ventas, inventario, P&L por tienda, forecast.", "Mensual", "Gerente Regional de Retail · Junta / Comité Directivo (aprobador del presupuesto)", "Ajustes de forecast y presupuesto; continuidad de proyectos de expansión", "Consolidado de ventas, inventario y P&L por tienda y país", "Reporte a la Junta y forecast ajustado para el resto del ciclo"],
     ["Reunión de apertura o remodelación (por proyecto)", "Coordinar el montaje de una tienda nueva o la renovación de una existente.", "Semanal mientras dura el proyecto", "Gerente de Ventas al Detal · Visual Merchandising · Mercadeo · Supervisión · Arquitecto (proveedor externo) · Administración", "Aprobación del render final y del cronograma de montaje", "Presupuesto, plano del local, calendario de apertura", "Tienda lista para operar y acta de lecciones aprendidas (informal, no documentada hoy)"]
    ]
   },

   "marco": {
    "estado": "borrador",
    "principios": [
     "Una sola fuente regional de la verdad: la torre de control consolida ventas, inventario y KPI de todos los países y franquicias en un solo lugar, en vez de cuadros locales dispersos.",
     "Autopista común entre países: un mismo proceso de reposición, con parámetros locales (capacidad del punto, umbral de aprobación) en vez de flujos distintos por país.",
     "Decisiones basadas en datos, no en intuición: el pronóstico y el ajuste de metas parten del histórico de venta por tienda, no de la percepción individual.",
     "El personal de tienda es responsable del inventario de su punto de venta, incluidas las herramientas de trabajo."
    ],
    "politicas": [
     "Código de vestimenta y política de dotación regional — en desarrollo (borrador v1, Talento Humano), con headcount por talla y género para dimensionar la compra.",
     "Protocolo de servicio al cliente en tienda — desarrollado este año, con estándares de atención y experiencia del cliente; su gobierno pasó a Formación y Desarrollo.",
     "Procedimiento de pago de inventario por faltantes: verificado el faltante, se factura el producto con descuento de empleado y el monto se divide entre el personal de la sucursal (Venezuela)."
    ],
    "normativo": [
     "Patentes y permisología municipal por punto de venta (varía por país; en Venezuela la patente cambia según el surtido que vende cada tienda).",
     "Normativa laboral de turnos y horario por país (dimensiona la plantilla mínima por punto de venta)."
    ]
   },

   "agenda": {"estado": "pendiente"},
   "anexos": {"estado": "pendiente"}
  },

  "procesos": {
   "9.3": {

    "proposito": {
     "estado": "borrador",
     "texto": "Cubre la generación y ejecución del pedido periódico de mercancía hacia cada tienda o kiosco: desde el corte semanal de necesidad hasta que la mercancía queda cargada y disponible para la venta en el punto. Incluye el ajuste del sugerido por capacidad física y patrón de venta local, y —cuando el pedido excede el umbral de aprobación del país— la autorización adicional en el nivel regional. No incluye las transferencias puntuales entre tiendas ante una rotura de stock inmediata (proceso 9.4) ni la recepción de mercancía nueva en el centro de distribución, que pertenece a Logística y Operaciones (macro 7)."
    },

    "dueno": {
     "estado": "borrador",
     "notas": "El mapa base trae el campo «dueño» con una duplicación de generación (\"Gerente Comercial (País / Canal) al Detal (País) (País) (País) (VE)\") — se limpia aquí a su lectura correcta: el dueño por país es el Gerente de Ventas al Detal, con el Supervisor de Ventas como dueño operativo en Panamá."
    },

    "disparador": {"estado": "borrador"},

    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Analista de Logística", "texto": "En el corte semanal, la Analista de Logística genera el sugerido de reposición por tienda cruzando el inventario disponible y la venta reciente registrada en Odoo, y lo distribuye a cada punto de venta de la región para su revisión local."},
      {"id": "a2", "rol": "Supervisor de Ventas", "texto": "El Supervisor de Ventas ajusta el sugerido según la capacidad física del punto —tienda o kiosco— y el patrón de venta local, evitando enviar producto que el punto no puede exhibir o absorber en el ciclo (por ejemplo, un pedido puntual grande que no se repetirá)."},
      {"id": "a3", "rol": "Gerente de Tienda", "texto": "El Gerente de Tienda confirma la necesidad real del punto de venta, señalando faltantes que el sugerido no capturó, y comunica cualquier ajuste por la plataforma Lark antes de que se cierre el pedido de la semana."},
      {"id": "a4", "rol": "Gerente de Ventas al Detal (País)", "texto": "El Gerente de Ventas al Detal del país valida si el pedido consolidado excede el umbral de aprobación local: por debajo, el pedido sigue su curso regular; por encima, se eleva para aprobación en el nivel regional antes de que la bodega pueda tomarlo."},
      {"id": "a5", "rol": "Gerente de Operaciones y Logística", "texto": "Con el pedido aprobado, el Gerente de Operaciones y Logística programa el despacho dentro de la ventana semanal, coordinando el transporte hacia cada centro comercial y negociando con la seguridad del lugar el horario de ingreso."},
      {"id": "a6", "rol": "Auxiliar / Ayudante de Bodega y Tráfico", "texto": "El Auxiliar de Bodega y Tráfico prepara físicamente la mercancía por punto de venta y la despacha, generando la plantilla de traslado masiva en el sistema —WMS o dispositivo móvil— que respalda cada bulto entregado."},
      {"id": "a7", "rol": "Gerente de Tienda", "texto": "El Gerente de Tienda recibe la mercancía, verifica que coincida con lo facturado y confirma la recepción en Odoo; esa confirmación dispara la carga del traslado al inventario del punto, que queda disponible para la venta."}
     ],
     "diagrama": {
      "carriles": ["Analista de Logística", "Supervisor de Ventas", "Gerente de Tienda", "Gerente de Ventas al Detal (País)", "Gerente de Operaciones y Logística", "Auxiliar / Ayudante de Bodega y Tráfico"],
      "nodos": [
       {"id": "n0", "carril": "Analista de Logística", "tipo": "inicio", "n": "Corte semanal de reposición"},
       {"id": "n1", "carril": "Analista de Logística", "tipo": "tarea", "n": "Generar sugerido semanal por tienda", "sistemas": ["ERP Odoo"]},
       {"id": "n2", "carril": "Supervisor de Ventas", "tipo": "tarea", "n": "Ajustar sugerido por capacidad y patrón local"},
       {"id": "n3", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Confirmar necesidad del punto de venta", "sistemas": ["Plataforma Lark"]},
       {"id": "n4", "carril": "Gerente de Ventas al Detal (País)", "tipo": "decision", "n": "¿Excede umbral de aprobación local?"},
       {"id": "n4alt", "carril": "Gerente de Ventas al Detal (País)", "tipo": "tarea", "n": "Aprobar pedido en nivel regional"},
       {"id": "n5", "carril": "Gerente de Operaciones y Logística", "tipo": "tarea", "n": "Programar despacho en la ventana semanal", "sistemas": ["ERP Odoo"]},
       {"id": "n6", "carril": "Auxiliar / Ayudante de Bodega y Tráfico", "tipo": "tarea", "n": "Preparar y despachar la mercancía", "sistemas": ["WMS / dispositivo móvil"]},
       {"id": "n7", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Recibir y cargar al inventario del punto", "sistemas": ["ERP Odoo"]},
       {"id": "n8", "carril": "Gerente de Tienda", "tipo": "fin", "n": "Mercancía disponible para la venta"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n3"}, {"de": "n3", "a": "n4"},
       {"de": "n4", "a": "n5", "etq": "No"}, {"de": "n4", "a": "n4alt", "etq": "Sí"}, {"de": "n4alt", "a": "n6"},
       {"de": "n5", "a": "n6"}, {"de": "n6", "a": "n7"}, {"de": "n7", "a": "n8"}
      ]
     }
    },

    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Dependencia de una persona única para el sugerido regional", "El cálculo del sugerido de reposición de toda la región recae en una sola Analista de Logística, sin respaldo documentado.", "Alta", "Alto", "Documentar el criterio de cálculo del sugerido y entrenar una persona de respaldo."],
      ["Ajuste manual sin reglas escritas de capacidad por punto", "La capacidad de cada tienda o kiosco se ajusta \"a ojo\" por experiencia del Supervisor, no como dato maestro.", "Media", "Medio", "Catalogar la capacidad de cada punto de venta (tienda/kiosco) como dato maestro en Odoo."],
      ["Piloto de despacho directo sin proceso estabilizado (Panamá)", "El cambio a generar el pedido desde el almacén central agrega un paso de traslado y expuso demoras de transporte en la primera semana.", "Media", "Medio", "Medir el piloto durante 2–3 ciclos completos antes de decidir su continuidad, con criterio de costo de transporte y tiempo de disponibilidad."],
      ["Umbral de aprobación no escrito ni homologado entre países", "Cada país aplica un umbral informal distinto para escalar la aprobación a nivel regional; no hay una política documentada.", "Media", "Medio", "Definir y documentar el umbral de aprobación por país en la política de reposición."],
      ["Recepción sin verificación sistemática en algunos puntos", "La confirmación de que la mercancía recibida coincide con lo facturado depende de la disciplina del Gerente de Tienda, sin checklist obligatorio.", "Baja", "Medio", "Exigir conteo contra la lista de empaque antes de confirmar el traslado en el sistema."]
     ]
    },

    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Fill rate de reposición semanal", "Unidades despachadas dentro de la ventana ÷ unidades solicitadas en el sugerido ajustado", "Semanal", "Gerente de Operaciones y Logística", "≥ 95%"],
      ["Tiempo de ciclo del pedido", "Fecha de mercancía disponible en el punto − fecha de corte del sugerido", "Semanal", "Gerente de Ventas al Detal", "≤ 5 días hábiles"],
      ["Ajuste manual del sugerido", "Pedidos con cambio del Supervisor o Gerente de Tienda ÷ total de pedidos de la semana", "Semanal", "Analista de Logística", "Tendencia descendente"],
      ["Quiebres de stock en punto de venta", "SKU críticos sin disponibilidad en el punto ÷ SKU críticos del catálogo del punto", "Semanal", "Gerente de Ventas al Detal", "A validar con el equipo"]
     ]
    }
   }
  }
 }
};
