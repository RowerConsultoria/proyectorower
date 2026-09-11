// Contenido real de los manuales de «Fase 2 — Procesos».
//
// Macro 9 (Ventas Retail) — COMPLETO: los 18 procesos + Contexto, Gobernanza,
// Marco de referencia, Agenda de mejora y Anexos del macroproceso.
//
// Fuentes cruzadas: entrevistas E-47 María Eugenia (VE, F2), E-55 Handani
// (regional, F2), E-53 Blas García (PA, F2) — Insumos/Entrevistas_dialogo_
// limpio_agrupadas/Ventas Retail — + docs de Lark «Departamento de Ventas al
// Detal jun-2026» y «Procesos Visual Merchandising» (VE) + los flujogramas de
// referencia Ventas_Retail_Proceso_9_1/9_2/9_3.bpmn (equipo consultor) +
// marcos de gestión de inventario/reposición de la disciplina de cadena de
// suministro (ASCM/APICS). E-57 Carlos Meléndez y E-30 Isabella Roizental
// (agrupadas también bajo «Ventas Retail») resultaron más relevantes a Ventas
// Mayor y Ventas Web respectivamente — no se usaron aquí como fuente primaria;
// vale la pena revisar esa agrupación de carpeta con el equipo.
//
// Estado de este contenido: BORRADOR — pendiente de revisión del equipo.
// No editar a mano el árbol (eso sale de manual-procesos-datos.js); este
// archivo solo aporta el contenido de las secciones. Ver checklist de
// scripts/prompt-manual-fase2.md §10 antes de dar por cerrada una revisión.

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
     ["Follow Up", "Registra el tráfico de clientes en el punto de venta (cuántos entran y cuántos compran) para calcular la conversión — se referencia como una plataforma aparte a la que la tienda \"entra\" a consultar. ⚠️ Naturaleza exacta sin confirmar: no hay evidencia de si es una aplicación propia, un servicio de un tercero (p. ej. un contador de tráfico del centro comercial) o dónde se hospeda; validar con el equipo antes de la versión final.", "Seguimiento comercial, esquema de comisiones"],
     ["WMS / dispositivo móvil (bodega)", "Preparación y despacho de pedidos de reposición; conteo de inventarios selectivos con tablet", "Reposición, inventarios"]
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
     "Procedimiento de pago de inventario por faltantes: verificado el faltante, se factura el producto con descuento de empleado y el monto se divide entre el personal de la sucursal (Venezuela).",
     "Gestión de inventarios por fases: conteo físico selectivo semanal (dos conteos adicionales en meses de venta especial), conciliación y ajuste en la semana 3 del ciclo, e inventario general masivo de dos días en julio y enero (Venezuela).",
     "Auditoría y visitas de supervisión a tienda: revisión de instalaciones, cartelera fiscal, inventario y cumplimiento de horario; en desarrollo una auto-auditoría del gerente de tienda a nivel regional.",
     "Monitoreo de cámaras de seguridad en tienda a cargo de un proveedor externo, que notifica hallazgos irregulares — no hay monitoreo interno permanente de las cámaras.",
     "Manejo de efectivo: cobro y cuadre de caja en tienda, envío a tesorería por transporte con frecuencia fija por punto de venta (Venezuela: lunes, miércoles y viernes)."
    ],
    "normativo": [
     "Patentes y permisología municipal por punto de venta (varía por país; en Venezuela la patente cambia según el surtido que vende cada tienda).",
     "Normativa laboral de turnos y horario por país (dimensiona la plantilla mínima por punto de venta)."
    ]
   },

   "agenda": {
    "estado": "borrador",
    "nota": "Ningún proceso de Ventas Retail está clasificado como «to-be» en el mapa v18: los 18 procesos son as-is (9) o híbridos (9). No hay, por tanto, procesos completamente nuevos por implementar en este macroproceso — la agenda de mejora se concentra en formalizar los híbridos y cerrar las brechas de los vigentes.",
    "por_implementar": [],
    "por_formalizar": [
     ["9.2 Torre de control retail regional", "Todavía depende del cuadro manual de Drive y de queries hechas a mano por país.", "Completar el desarrollo y migrar cada país y franquicia a la torre en producción."],
     ["9.3 Reposición de tiendas y kioscos", "Piloto de despacho directo desde bodega central sin proceso estabilizado (Panamá).", "Medir 2-3 ciclos completos y decidir su continuidad con criterio de costo y tiempo de disponibilidad."],
     ["9.4 Transferencias entre tiendas", "Delegación reciente de la aprobación a gerentes de tienda (Venezuela) sin criterio escrito.", "Documentar el alcance y el límite de la delegación."],
     ["9.6 Operación diaria de tienda", "Protocolo de servicio al cliente en despliegue, no aplicado aún en todas las tiendas.", "Completar el despliegue regional y medir su cumplimiento en la supervisión."],
     ["9.10 Gestión de franquicias Cubitt", "Modelo de franquicia en construcción, sin trayectoria previa que validar.", "Tratar Nicaragua como piloto formal antes de replicar el contrato a nuevos mercados."],
     ["9.12 Auditoría de tienda y autoauditoría", "La autoauditoría por aplicación no está en producción.", "Priorizar su desarrollo y, mientras tanto, fijar una cadencia mínima manual."],
     ["9.14 Inventarios selectivos y general", "Venezuela cuenta de forma manual mientras Panamá ya usa tablet conectada al WMS.", "Evaluar llevar la práctica de Panamá a Venezuela."],
     ["9.16 Gestión operativa del personal", "No existe descriptor de cargo para las posiciones de tienda.", "Priorizarlas al desarrollar los descriptores de cargo pendientes, junto con Talento Humano."],
     ["9.17 Comisiones e incentivos", "Esquema homologado regional en diseño; cada país opera hoy con su esquema heredado.", "Lanzar el esquema homologado en el semestre previsto, tras validar su impacto en costos."]
    ],
    "brechas": [
     ["9.1 Planificación comercial y forecast", "Sin protocolo documentado de reajuste ante un evento disruptivo (p. ej. una calamidad país).", "Documentar el protocolo ya usado de facto (consulta a gerentes de país, aprobación de Junta)."],
     ["9.5 Cierre de caja diario", "Reportes redundantes entre el condensado por correo y el cuadro de Drive.", "Unificar en un solo reporte estándar — ya identificado como oportunidad por el propio equipo."],
     ["9.7 Supervisión y visitas a tienda", "Registro de la visita en papel, sin centralizar, en Venezuela.", "Migrar el acta de papel a un registro digital simple."],
     ["9.8 Apertura de tienda o kiosco", "No existe un manual de apertura escrito; el conocimiento vive en las personas.", "Documentar un checklist mínimo de apertura."],
     ["9.9 Remodelación de tienda", "Sin manual de remodelación ni criterio de priorización de la cola.", "Documentar el checklist mínimo una vez estabilizado el proceso de apertura."],
     ["9.11 Socios y partners regionales", "Renegociación reactiva, después de que la pérdida ya ocurrió (caso de la bodega en Guatemala).", "Fijar un umbral de alerta temprana en el P&L mensual."],
     ["9.13 Garantías y servicio postventa", "Dos sistemas de registro de garantías (Lark y Cisco en Venezuela) sin una sola fuente de verdad.", "Definir el sistema oficial por marca/país y documentar la migración del otro."],
     ["9.15 Manejo de efectivo", "Custodia de efectivo más de un día sin protocolo claro en puntos sin banco cercano.", "Documentar el protocolo de custodia y el monto máximo permitido."],
     ["9.18 Mantenimiento de infraestructura", "Toda la gestión de infraestructura de un país centralizada en una sola persona.", "Documentar contactos de proveedores y criterio de urgencia para no depender de una sola persona."]
    ]
   },

   "anexos": {
    "estado": "borrador",
    "glosario": [
     ["ACP", "Análisis de Conveniencia del Proyecto: estudio financiero de ventas, gastos, margen y payback que decide si abrir un local."],
     ["Autoauditoría", "Verificación que el propio gerente de tienda haría de su punto de venta, con fotos y pendientes — todavía en desarrollo."],
     ["Autopista común", "Principio de un mismo proceso estándar para toda la región, con parámetros locales en vez de flujos distintos por país."],
     ["BPT", "Indicador mencionado junto a UPT en el seguimiento comercial regional. ⚠️ Definición exacta sin confirmar con el equipo."],
     ["Conversión", "Porcentaje de visitantes de la tienda que terminan comprando (tráfico → venta)."],
     ["Fee", "Comisión que cobra el grupo a una franquicia o partner por el uso del modelo, la marca y las herramientas de gestión."],
     ["Fill rate", "Porcentaje de lo pedido en reposición que efectivamente se despacha dentro de la ventana de tiempo acordada."],
     ["Follow Up", "Herramienta de conteo de tráfico y conversión en tienda. ⚠️ Naturaleza exacta (app propia o servicio de tercero) sin confirmar."],
     ["Forecast", "Pronóstico de venta anual, mensualizado y bajado como meta individual por tienda."],
     ["Ojo clínico", "Expresión del equipo para el criterio experto —no escrito— con que el supervisor ajusta el sugerido de reposición."],
     ["Payback", "Tiempo que toma recuperar la inversión de abrir una tienda; el grupo exige que no exceda tres años."],
     ["P&L", "Estado de pérdidas y ganancias de una tienda, país o unidad de negocio."],
     ["PMO", "Oficina de gestión de proyectos que orquesta formalmente las aperturas y remodelaciones de tienda."],
     ["Sugerido de reposición", "Propuesta automática de qué reponer a cada tienda, generada desde inventario y venta reciente."],
     ["Ticket promedio", "Monto promedio que gasta un cliente por transacción."],
     ["Torre de control", "Tablero regional en desarrollo que consolidará ventas, inventario y KPI de todos los países, franquicias y socios."],
     ["Umbral de aprobación", "Monto o cantidad a partir del cual un pedido o transferencia necesita aprobación de un nivel superior."],
     ["UPT", "Unidades por transacción: cuántas piezas compra en promedio un cliente por visita."],
     ["VPT", "Indicador de venta por tienda mencionado en el seguimiento comercial regional. ⚠️ Uso exacto (venta total vs. venta por transacción) sin confirmar entre países."],
     ["WMS", "Sistema de gestión de bodega, usado también en tienda vía tablet para inventarios selectivos."]
    ],
    "raci": [
     ["9.1 Planificación comercial y forecast", "Gerente Regional de Retail", "Junta / Comité Directivo", "Planificador Financiero · Gerente de Ventas al Detal", "Gerente de Tienda"],
     ["9.2 Torre de control y KPI", "Analista de Sistemas / Datos", "Gerente Regional de Retail", "Gerente de Ventas al Detal · Supervisor de Ventas", "Junta / Comité Directivo"],
     ["9.3 Reposición de tiendas y kioscos", "Analista de Logística", "Gerente de Ventas al Detal (País)", "Supervisor de Ventas · Gerente de Tienda", "Gerente de Operaciones y Logística"],
     ["9.4 Transferencias entre tiendas", "Supervisor de Ventas", "Gerente de Ventas al Detal (País)", "Gerente de Tienda", "Auxiliar / Ayudante de Bodega y Tráfico"],
     ["9.5 Cierre de caja diario", "Gerente de Tienda", "Gerente de Ventas al Detal (País)", "—", "Gerente Regional de Retail"],
     ["9.6 Operación diaria de tienda", "Gerente de Tienda", "Gerente de Ventas al Detal (País)", "Supervisor de Ventas", "—"],
     ["9.7 Supervisión y visitas a tienda", "Supervisor de Ventas", "Gerente de Ventas al Detal (País)", "Gerente de Tienda", "Gerente Regional de Retail"],
     ["9.8 Apertura de tienda o kiosco", "Gerente de Proyectos (PMO)", "Gerente Regional de Retail", "Planificador Financiero · Arquitecto", "Junta / Comité Directivo"],
     ["9.9 Remodelación de tienda", "Coordinador(a) de Visual Merchandising", "Gerente Regional de Retail", "Arquitecto / Proveedor de Remodelación", "Gerente de Proyectos (PMO)"],
     ["9.10 Gestión de franquicias Cubitt", "Gerente Regional de Retail", "Junta / Comité Directivo", "Legal Corporativo · Planificador Financiero", "Gerente Regional de Visual Merchandising"],
     ["9.11 Socios y partners regionales", "Gerente Regional de Retail", "Gerente Regional de Retail", "Planificador Financiero · Analista de Sistemas / Datos", "Junta / Comité Directivo"],
     ["9.12 Auditoría y autoauditoría de tienda", "Gerente de Tienda", "Gerente Regional de Retail", "Gerente de Ventas al Detal (País)", "Supervisor de Ventas"],
     ["9.13 Garantías y servicio postventa", "Gerente de Tienda", "Gerente de Servicio Técnico", "Técnico(a) de Servicio / Relojero(a) · Especialista de Producto", "Cliente"],
     ["9.14 Inventarios selectivos y general", "Gerente de Tienda", "Supervisor de Ventas", "Supervisor(a) de Bodega / Despacho", "Gerente de Ventas al Detal (País)"],
     ["9.15 Manejo de efectivo", "Gerente de Tienda", "Coordinador(a) de Tesorería y Cobranzas", "Auxiliar / Ayudante de Bodega y Tráfico", "—"],
     ["9.16 Gestión operativa del personal", "Gerente de Tienda", "Supervisor de Ventas", "Coordinador(a) de Recursos Humanos", "Gerente Regional de Retail"],
     ["9.17 Comisiones e incentivos", "Analista de Recursos Humanos / Nómina", "Gerente Regional de Retail", "Planificador Financiero · Gerente de Tienda", "—"],
     ["9.18 Mantenimiento e incidencias", "Supervisor de Ventas", "Gerente de Ventas al Detal (País)", "Coordinador(a) de Sistemas · Contabilidad", "Administración del Centro Comercial"]
    ],
    "catalogo_sistemas": [
     ["Odoo (ERP)", "Pedidos, traslados, facturación, cierre de caja, inventarios", "9.3 · 9.4 · 9.5 · 9.13 · 9.14", "Coordinador(a) de Sistemas"],
     ["Lark", "Comunicación de campo, garantías Cubitt, reportería", "9.3 · 9.6 · 9.13 · 9.18", "Coordinador(a) de Sistemas"],
     ["WhatsApp", "Comunicación de respaldo en campo", "9.4 · 9.7 · 9.18", "Sin responsable formal"],
     ["Cuadro consolidado (Drive) / Torre de control (en desarrollo)", "KPI diario, forecast, consolidado regional", "9.1 · 9.2 · 9.5 · 9.11", "Gerente Regional de Retail"],
     ["Follow Up", "Tráfico y conversión — naturaleza exacta sin confirmar", "9.2 · 9.17", "Sin confirmar"],
     ["WMS", "Preparación de pedidos; inventarios con tablet", "9.3 · 9.14", "Coordinador(a) de Sistemas"],
     ["Cisco", "Registro paralelo de garantías (Venezuela)", "9.13", "Gerente de Servicio Técnico"]
    ],
    "interfaces_detalle": [
     ["Compras y Abastecimiento / Logística y Operaciones", "Entrega en bodega central, o directo al punto en el piloto de Panamá", "Mercancía asignada, lista de empaque"],
     ["Planeación Comercial", "Forecast anual aprobado por la Junta", "Meta de venta por tienda y por país"],
     ["Gestión de Datos e Inteligencia de Negocio", "Consolidación en la torre de control", "Pronóstico de demanda, KPI consolidados"],
     ["Contabilidad", "Cierre de caja diario", "Reporte condensado, comprobantes físicos, efectivo depositado"],
     ["Gestión del Talento Humano", "Circuito de nómina y dotación", "Novedades de personal, headcount por talla/género, incidencias disciplinarias"],
     ["Gestión de Mercadeo y Comunicaciones", "Lanzamiento de campaña", "Material POP, calendario de campaña"],
     ["Gestión Legal y Cumplimiento", "Contrato de franquicia o permiso de apertura", "Contrato estandarizado, permisos vigentes"]
    ],
    "docs_lark": [
     ["Departamento de Ventas al Detal (jun-2026)", "Venezuela", "Manuales de proceso, organigrama, KPI, procedimiento de faltantes", "9.1 · 9.6 · 9.7 · 9.14 · 9.16"],
     ["Procesos Visual Merchandising", "Venezuela", "Flujo operativo de VM, estructura, cuellos de botella", "9.9"],
     ["Pasos para etiquetas / inventario / movimiento / existencia en Odoo", "Venezuela", "Instructivos operativos de sistema — quedan de referencia, no se reproducen", "9.14"]
    ],
    "variaciones_pais": [
     ["Panamá", "Piloto de despacho directo desde bodega central (Colón) sin bodega intermedia.", "Prueba de eficiencia de transporte en curso, sin decisión definitiva todavía."],
     ["Panamá", "Un solo supervisor cubre toda la red de tiendas del país.", "El tamaño de la operación (11 puntos) permite concentrar el rol en una persona."],
     ["Venezuela", "Responsabilidad económica del faltante de inventario asignada al personal de la sucursal.", "Cultura operativa propia del país, no replicada documentalmente en los demás."],
     ["Venezuela", "Transporte de efectivo y documentos con frecuencia fija (lunes, miércoles y viernes).", "Estructura logística propia del país."],
     ["Costa Rica / Guatemala / Ecuador", "Operación bajo figura de socio o partner con fee, no propiedad plena.", "Relación comercial y societaria distinta a la de la operación propia."]
    ]
   }
  },

  "procesos": {

   "9.1": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre la construcción del pronóstico anual de venta retail —para operación propia, franquicias y socios—, su aprobación por la Junta y la bajada mensualizada a meta individual por tienda, incluido el reajuste ante eventos disruptivos. No incluye el diseño de la torre de control que consume este forecast (proceso 9.2) ni el cálculo de comisiones que se basa en el cumplimiento de la meta (proceso 9.17)."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Gerente Regional de Retail", "texto": "Inicia el ciclo anual definiendo los supuestos regionales: crecimiento esperado, aperturas planeadas y contexto macro por país."},
      {"id": "a2", "rol": "Analista de Sistemas / Datos", "texto": "Extrae y normaliza la venta histórica por tienda desde Odoo como base cuantitativa del pronóstico."},
      {"id": "a3", "rol": "Gerente de Ventas al Detal (País)", "texto": "Propone el ajuste por contexto local —evento del país, apertura prevista, estacionalidad— sobre la base regional."},
      {"id": "a4", "rol": "Planificador Financiero", "texto": "Valida que el forecast propuesto sea consistente con la restricción presupuestaria del grupo."},
      {"id": "a5", "rol": "Gerente Regional de Retail", "texto": "Consolida y mensualiza el forecast regional por tienda y por país para presentarlo a la Junta."},
      {"id": "a6", "rol": "Junta / Comité Directivo", "texto": "Aprueba el forecast o lo devuelve con observaciones al ciclo de planificación."},
      {"id": "a7", "rol": "Gerente de Ventas al Detal (País)", "texto": "Comunica por Lark la meta individual mensualizada a cada gerente de tienda, y el Gerente Regional presenta el avance mensual contra el forecast en la reunión ejecutiva."}
     ],
     "diagrama": {
      "carriles": ["Gerente Regional de Retail", "Analista de Sistemas / Datos", "Gerente de Ventas al Detal (País)", "Planificador Financiero", "Junta / Comité Directivo"],
      "nodos": [
       {"id": "n0", "carril": "Gerente Regional de Retail", "tipo": "inicio", "n": "Inicia el ciclo anual de planificación"},
       {"id": "n1", "carril": "Gerente Regional de Retail", "tipo": "tarea", "n": "Definir supuestos regionales del ciclo"},
       {"id": "n2", "carril": "Analista de Sistemas / Datos", "tipo": "tarea", "n": "Extraer y normalizar venta histórica por tienda", "sistemas": ["ERP Odoo"]},
       {"id": "n3", "carril": "Gerente de Ventas al Detal (País)", "tipo": "tarea", "n": "Proponer ajuste por contexto local", "sistemas": ["Cuadro consolidado (Drive)"]},
       {"id": "n4", "carril": "Planificador Financiero", "tipo": "tarea", "n": "Validar restricción financiera del forecast"},
       {"id": "n5", "carril": "Gerente Regional de Retail", "tipo": "tarea", "n": "Consolidar y mensualizar forecast regional"},
       {"id": "n6", "carril": "Junta / Comité Directivo", "tipo": "decision", "n": "¿Forecast aprobado?"},
       {"id": "n6alt", "carril": "Junta / Comité Directivo", "tipo": "tarea", "n": "Devolver observaciones al ciclo de planificación"},
       {"id": "n7", "carril": "Gerente de Ventas al Detal (País)", "tipo": "tarea", "n": "Comunicar meta individual a cada tienda", "sistemas": ["Plataforma Lark"]},
       {"id": "n8", "carril": "Gerente Regional de Retail", "tipo": "tarea", "n": "Presentar avance mensual contra forecast", "sistemas": ["Tablero regional retail"]},
       {"id": "n9", "carril": "Gerente Regional de Retail", "tipo": "fin", "n": "Forecast vigente y comunicado"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n3"}, {"de": "n3", "a": "n4"}, {"de": "n4", "a": "n5"}, {"de": "n5", "a": "n6"},
       {"de": "n6", "a": "n7", "etq": "Sí"}, {"de": "n6", "a": "n6alt", "etq": "No"}, {"de": "n6alt", "a": "n8"}, {"de": "n7", "a": "n8"}, {"de": "n8", "a": "n9"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Reajuste ante evento disruptivo sin protocolo documentado", "Ante una calamidad país (p. ej. un terremoto), el reajuste de forecast se hace ad-hoc, consultando gerentes de país de forma informal.", "Media", "Alto", "Documentar el protocolo de reajuste intermedio ya usado de facto."],
      ["Datos históricos heterogéneos entre países", "Sistemas distintos antes de la migración a Odoo dificultan comparar el histórico entre países.", "Media", "Medio", "Estandarizar el extracto histórico a medida que cada país completa su migración a Odoo."],
      ["Meta \"retadora pero alcanzable\" sin método de validación cruzada", "El nivel de reto de cada meta depende del juicio del Gerente Regional, sin un segundo método que la contraste.", "Baja", "Medio", "Validar el forecast contra al menos dos métodos (histórico y tendencia) antes de presentarlo a la Junta."],
      ["Franquicias y socios no siempre alineados al calendario de forecast", "Algunos partners no entregan su información en la misma ventana que la operación propia.", "Media", "Medio", "Homologar el calendario de forecast como condición del contrato de franquicia o socio."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Precisión del forecast", "Venta real ÷ venta pronosticada, por tienda y por mes", "Mensual", "Gerente Regional de Retail", "±10%"],
      ["Tiendas con meta comunicada antes del inicio del mes", "Tiendas notificadas a tiempo ÷ total de tiendas", "Mensual", "Gerente de Ventas al Detal", "100%"],
      ["Tiempo de aprobación del forecast por la Junta", "Fecha de aprobación − fecha de presentación", "Anual / por ciclo", "Gerente Regional de Retail", "≤ 2 semanas"]
     ]
    }
   },

   "9.2": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre el diseño y la operación del tablero que consolida los indicadores comerciales, de inventario y de personal de todos los países, franquicias y socios, desde el diligenciamiento diario en tienda hasta la lectura ejecutiva mensual a la Junta. No incluye la construcción del forecast en sí (proceso 9.1), que es uno de los insumos que la torre visualiza una vez aprobado.",
     "nota_estado": "Este proceso combina lo que ya opera —el diligenciamiento diario y las consultas a los ERP— con la torre de control regional, todavía en desarrollo, que reemplazará el cuadro consolidado manual por un tablero único."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Gerente de Tienda", "texto": "Al cierre de caja diario, diligencia manualmente la fila de su tienda en el cuadro consolidado del Drive —venta, unidades, transacciones— de forma deliberadamente manual, para que el gerente \"sienta el número\" del día."},
      {"id": "a2", "rol": "Supervisor de Ventas", "texto": "Verifica que todas las tiendas de su zona hayan cargado su fila antes del corte; si falta alguna, la persigue directamente por Lark o llamada."},
      {"id": "a3", "rol": "Analista de Sistemas / Datos", "texto": "Ejecuta consultas automáticas (queries) contra el ERP Odoo de cada país para traer venta, inventario y cobertura, sin depender de que todos usen el mismo sistema."},
      {"id": "a4", "rol": "Analista de Sistemas / Datos", "texto": "Consolida el diligenciamiento manual y las consultas automáticas en el tablero regional retail —la torre de control—, incluyendo franquicias y socios con acceso por query."},
      {"id": "a5", "rol": "Gerente de Ventas al Detal (País)", "texto": "Revisa el tablero y define la acción correctiva para cada tienda que queda rezagada frente a su meta o su conversión."},
      {"id": "a6", "rol": "Gerente Regional de Retail", "texto": "Presenta la lectura ejecutiva regional una vez al mes a la Junta, con el estado de cada país, marca y proyecto de expansión."}
     ],
     "diagrama": {
      "carriles": ["Gerente de Tienda", "Supervisor de Ventas", "Analista de Sistemas / Datos", "Gerente de Ventas al Detal (País)", "Gerente Regional de Retail"],
      "nodos": [
       {"id": "n0", "carril": "Gerente de Tienda", "tipo": "inicio", "n": "Cierre de caja diario en el punto de venta"},
       {"id": "n1", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Diligenciar fila diaria del punto de venta", "sistemas": ["Cuadro consolidado (Drive)"]},
       {"id": "n2", "carril": "Supervisor de Ventas", "tipo": "decision", "n": "¿Todas las tiendas cargaron su fila?"},
       {"id": "n2alt", "carril": "Supervisor de Ventas", "tipo": "tarea", "n": "Perseguir carga faltante del punto", "sistemas": ["Plataforma Lark"]},
       {"id": "n3", "carril": "Analista de Sistemas / Datos", "tipo": "tarea", "n": "Ejecutar consultas automáticas a los ERP", "sistemas": ["ERP Odoo"]},
       {"id": "n4", "carril": "Analista de Sistemas / Datos", "tipo": "tarea", "n": "Consolidar y publicar el tablero regional", "sistemas": ["Tablero regional retail"]},
       {"id": "n5", "carril": "Gerente de Ventas al Detal (País)", "tipo": "tarea", "n": "Definir acción correctiva por tienda rezagada"},
       {"id": "n6", "carril": "Gerente Regional de Retail", "tipo": "tarea", "n": "Presentar lectura ejecutiva regional"},
       {"id": "n7", "carril": "Gerente Regional de Retail", "tipo": "fin", "n": "Tablero publicado y acciones abiertas"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n3", "etq": "Sí"}, {"de": "n2", "a": "n2alt", "etq": "No"},
       {"de": "n2alt", "a": "n4"}, {"de": "n3", "a": "n4"}, {"de": "n4", "a": "n5"}, {"de": "n5", "a": "n6"}, {"de": "n6", "a": "n7"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Torre de control todavía no está en productivo", "El proceso sigue dependiendo del cuadro manual del Drive y de queries hechas a mano por país.", "Alta", "Medio", "Fijar fecha de paso a productivo y un plan de migración por país y franquicia."],
      ["Diligenciamiento manual depende de la disciplina de cada gerente", "Un dato mal cargado en el cierre diario se propaga a todo el consolidado regional.", "Media", "Medio", "Agregar validación automática de rango (montos y transacciones atípicas) al momento de cargar."],
      ["Franquicias con formato de entrega distinto", "Sistemas propios de terceros (p. ej. Power BI de un operador logístico) exigen normalización manual antes de consolidar.", "Media", "Medio", "Definir un formato mínimo de entrega exigible por contrato de franquicia."],
      ["Diseño y mantenimiento de la torre concentrado en una persona", "El desarrollo del tablero regional depende de una sola persona de analítica de datos.", "Media", "Alto", "Documentar el diseño de las queries y el tablero, y formar un respaldo."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Tiendas con fila diaria cargada a tiempo", "Tiendas que cargaron antes del corte ÷ total de tiendas", "Diaria", "Supervisor de Ventas", "100%"],
      ["Tiempo entre cierre de caja y publicación del tablero", "Hora de publicación del tablero − hora de cierre de caja", "Diaria / semanal", "Analista de Sistemas / Datos", "≤ 24 horas"],
      ["Cobertura de países y franquicias integrados a la torre", "Países/franquicias en la torre ÷ total de países/franquicias", "Mensual", "Gerente Regional de Retail", "Creciente hasta 100%"]
     ]
    }
   },

   "9.3": {

    "proposito": {
     "estado": "borrador",
     "texto": "Cubre la generación y ejecución del pedido periódico de mercancía hacia cada tienda o kiosco: desde el corte semanal de necesidad hasta que la mercancía queda cargada y disponible para la venta en el punto. Incluye el ajuste del sugerido por capacidad física y patrón de venta local, y —cuando el pedido excede el umbral de aprobación del país— la autorización adicional en el nivel regional. No incluye las transferencias puntuales entre tiendas ante una rotura de stock inmediata (proceso 9.4) ni la recepción de mercancía nueva en el centro de distribución, que pertenece a Logística y Operaciones (macro 7)."
    },

    "dueno": {
     "estado": "borrador"
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
   },

   "9.4": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre el movimiento de mercancía entre tiendas del mismo país para cerrar una venta urgente o rebalancear stock, incluidas las restricciones aduanales locales que aplican a algunos destinos. No incluye la reposición periódica desde bodega central (proceso 9.3) ni el traslado internacional entre países, que pertenece a Logística y Operaciones (macro 7).",
     "nota_estado": "En Venezuela, la autorización para este tipo de traslado se delegó recientemente a los gerentes de tienda cuando el movimiento es dentro del mismo centro comercial; fuera de esa red, la sigue aprobando la Gerente de Ventas al Detal."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Gerente de Tienda", "texto": "Detecta que un cliente pide un modelo o color que no tiene, y consulta en Odoo la disponibilidad en otro punto de venta cercano."},
      {"id": "a2", "rol": "Supervisor de Ventas", "texto": "Si el traslado cruza una restricción aduanal regional —como el caso de Margarita, que exige trámite ante el ente aduanal por impuesto de salida— gestiona el permiso antes de mover la mercancía."},
      {"id": "a3", "rol": "Supervisor de Ventas", "texto": "Autoriza el traslado y lo registra en Odoo; en Venezuela esta autorización está delegada al Gerente de Tienda cuando el movimiento es dentro del mismo centro comercial."},
      {"id": "a4", "rol": "Auxiliar / Ayudante de Bodega y Tráfico", "texto": "Prepara la mercancía y la entrega físicamente al punto de venta destino, priorizando el transporte que ya circula esa ruta cuando es posible."},
      {"id": "a5", "rol": "Gerente de Tienda", "texto": "El punto destino recibe la mercancía y confirma la carga al inventario, dejando el producto disponible para cerrar la venta que originó el traslado."}
     ],
     "diagrama": {
      "carriles": ["Gerente de Tienda", "Supervisor de Ventas", "Auxiliar / Ayudante de Bodega y Tráfico"],
      "nodos": [
       {"id": "n0", "carril": "Gerente de Tienda", "tipo": "inicio", "n": "Necesidad urgente de producto en un punto de venta"},
       {"id": "n1", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Detectar disponibilidad en otro punto de venta", "sistemas": ["ERP Odoo"]},
       {"id": "n2", "carril": "Supervisor de Ventas", "tipo": "decision", "n": "¿Requiere trámite aduanal (p. ej. Margarita)?"},
       {"id": "n2alt", "carril": "Supervisor de Ventas", "tipo": "tarea", "n": "Tramitar permiso de salida ante el ente aduanal"},
       {"id": "n3", "carril": "Supervisor de Ventas", "tipo": "tarea", "n": "Autorizar y registrar el traslado", "sistemas": ["ERP Odoo"]},
       {"id": "n4", "carril": "Auxiliar / Ayudante de Bodega y Tráfico", "tipo": "tarea", "n": "Preparar y entregar la mercancía al punto destino"},
       {"id": "n5", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Recibir y cargar al inventario del punto destino"},
       {"id": "n6", "carril": "Gerente de Tienda", "tipo": "fin", "n": "Venta cerrada con mercancía disponible en el destino"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n3", "etq": "No"}, {"de": "n2", "a": "n2alt", "etq": "Sí"},
       {"de": "n2alt", "a": "n3"}, {"de": "n3", "a": "n4"}, {"de": "n4", "a": "n5"}, {"de": "n5", "a": "n6"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Restricción aduanal descubierta en plena operación", "El trámite de Margarita se detectó operando, sin procedimiento documentado previo.", "Media", "Medio", "Documentar el trámite y el tiempo que toma como parte del proceso, no como excepción."],
      ["Delegación reciente sin criterio escrito", "La autorización delegada a gerentes de tienda (Venezuela) no tiene un criterio escrito de cuándo procede.", "Media", "Medio", "Definir por escrito el alcance de la delegación (mismo centro comercial, mismo país) y su límite."],
      ["Registro no siempre simultáneo al movimiento físico", "El traslado puede registrarse en Odoo después de que la mercancía ya se movió, descuadrando el inventario temporalmente.", "Media", "Medio", "Exigir el registro en Odoo antes de que la mercancía salga del punto de origen."],
      ["Dependencia del transporte regular de la ruta", "Sin el transporte que ya circula esa ruta, el traslado urgente puede tardar más de un día.", "Baja", "Bajo", "Acordar un canal de transporte urgente de respaldo (mensajería) para casos de venta comprometida."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Tiempo entre solicitud y disponibilidad en destino", "Hora de disponibilidad − hora de solicitud", "Por evento", "Supervisor de Ventas", "≤ 24h dentro del mismo centro comercial"],
      ["Traslados registrados en Odoo antes de la salida física", "Traslados registrados a tiempo ÷ total de traslados", "Semanal", "Supervisor de Ventas", "100%"],
      ["Transferencias por rebalanceo vs. por venta urgente", "Traslados por sobrestock ÷ total de traslados del mes", "Mensual", "Gerente de Ventas al Detal", "Referencia de gestión"]
     ]
    }
   },

   "9.5": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre el cuadre físico de caja al cierre diario de cada tienda y el diligenciamiento del reporte que alimenta el consolidado regional, incluida la revisión de anomalías antes de aceptar el cierre. No incluye la consolidación regional en el tablero de KPI en sí (proceso 9.2), que es donde este cierre diario se integra con el resto de las tiendas."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Gerente de Tienda", "texto": "Al cierre de operaciones, cuadra físicamente la caja del día —efectivo, tarjetas, transferencias y dólares en efectivo— contra lo facturado en Odoo."},
      {"id": "a2", "rol": "Gerente de Tienda", "texto": "Envía por correo el reporte condensado por línea de producto (relojería, audio, etc.) a la Gerencia de Ventas al Detal."},
      {"id": "a3", "rol": "Gerente de Tienda", "texto": "Diligencia a mano la fila del cuadro consolidado en Drive con venta, unidades y transacciones del día — deliberadamente manual, para que el gerente \"sienta\" el resultado en vez de que se cargue solo."},
      {"id": "a4", "rol": "Gerente de Ventas al Detal (País)", "texto": "Revisa el consolidado de todas las tiendas y, si encuentra un monto o una cantidad de facturas que no calza, indaga la causa con Sistemas antes de aceptar el cierre."},
      {"id": "a5", "rol": "Gerente de Ventas al Detal (País)", "texto": "Alimenta el cuadro histórico regional con el resultado del día, base del ticket promedio, la unidad por transacción y la comparación contra el mismo mes del año anterior."}
     ],
     "diagrama": {
      "carriles": ["Gerente de Tienda", "Gerente de Ventas al Detal (País)"],
      "nodos": [
       {"id": "n0", "carril": "Gerente de Tienda", "tipo": "inicio", "n": "Cierre de operaciones diarias del punto de venta"},
       {"id": "n1", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Cuadrar caja física", "sistemas": ["ERP Odoo"]},
       {"id": "n2", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Enviar reporte condensado por línea de producto"},
       {"id": "n3", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Diligenciar fila del cuadro consolidado", "sistemas": ["Cuadro consolidado (Drive)"]},
       {"id": "n4", "carril": "Gerente de Ventas al Detal (País)", "tipo": "decision", "n": "¿Monto o cantidad de facturas anormal?"},
       {"id": "n4alt", "carril": "Gerente de Ventas al Detal (País)", "tipo": "tarea", "n": "Revisar la causa con Sistemas antes de aceptar"},
       {"id": "n5", "carril": "Gerente de Ventas al Detal (País)", "tipo": "tarea", "n": "Alimentar el consolidado regional con el histórico del mes", "sistemas": ["Tablero regional retail"]},
       {"id": "n6", "carril": "Gerente de Ventas al Detal (País)", "tipo": "fin", "n": "Cierre cuadrado y disponible para la torre de control"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n3"}, {"de": "n3", "a": "n4"},
       {"de": "n4", "a": "n5", "etq": "No"}, {"de": "n4", "a": "n4alt", "etq": "Sí"}, {"de": "n4alt", "a": "n5"}, {"de": "n5", "a": "n6"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Diligenciamiento manual depende de la disciplina diaria", "Un día sin cargar rompe la serie histórica de la tienda.", "Media", "Medio", "Alerta cuando una tienda no carga su fila antes de una hora límite (ver también proceso 9.2)."],
      ["Anomalías de sistema sin causa obvia", "Cambios de precio en curso pueden dejar facturas \"en el aire\" que descuadran el cierre sin que el origen sea evidente.", "Media", "Medio", "Documentar como paso estándar el protocolo de diagnóstico ya usado (refrescar sesión, comparar sistema vs. etiqueta)."],
      ["Reportes redundantes entre el condensado y el cuadro de Drive", "El mismo dato se reporta dos veces por canales distintos, con retrabajo para quien los concilia.", "Media", "Bajo", "Unificar en un solo reporte estándar por tienda."],
      ["Cobertura del cierre sin responsable de respaldo definido", "Si el gerente de turno no está disponible a la hora del cierre, este se atrasa.", "Baja", "Medio", "Definir un responsable de respaldo por turno para el cierre de caja."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Tiendas con cierre diligenciado el mismo día", "Tiendas que cerraron a tiempo ÷ total de tiendas", "Diaria", "Gerente de Ventas al Detal", "100%"],
      ["Incidencias de cierre no cuadrado", "Cierres con diferencia sin explicar ÷ total de cierres del mes", "Mensual", "Gerente de Ventas al Detal", "Tendencia descendente"],
      ["Tiempo de resolución de una anomalía de cierre", "Hora de resolución − hora de detección", "Por evento", "Gerente de Ventas al Detal", "≤ 24 horas"]
     ]
    }
   },

   "9.6": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre la rutina diaria del punto de venta: apertura, atención al cliente bajo el protocolo de servicio, exhibición conforme al estándar de marca y cierre físico, incluido el primer filtro de cualquier incidencia. No incluye el detalle de los procesos que se activan cuando la incidencia excede la tienda —garantías (9.13), transferencias (9.4), mantenimiento (9.18)— ni la supervisión periódica externa (9.7).",
     "nota_estado": "La operación diaria combina prácticas ya consolidadas (apertura, atención, cierre) con el protocolo de servicio al cliente, que es una formalización reciente todavía en despliegue hacia todas las tiendas."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Encargado(a) de Tienda", "texto": "Al abrir, verifica que el sistema tenga la fecha y la tasa del día actualizadas y que la cartelera fiscal esté vigente y visible."},
      {"id": "a2", "rol": "Asesor(a) de Ventas - Tienda", "texto": "Revisa que la exhibición esté agrupada por línea de producto según el estándar —por ejemplo G-Shock, Edifice y BBG en Casio, o por familia en Cubitt—, con vitrinas y etiquetas limpias y correctas."},
      {"id": "a3", "rol": "Asesor(a) de Ventas - Tienda", "texto": "Atiende al cliente siguiendo el protocolo de servicio de la marca, cumpliendo uniforme, carnet y la normativa de uso del celular en piso de venta."},
      {"id": "a4", "rol": "Gerente de Tienda", "texto": "Cuando surge una incidencia que excede la atención normal —una garantía, una queja, un faltante detectado en el momento— la resuelve en tienda si puede, o la escala al proceso correspondiente."},
      {"id": "a5", "rol": "Gerente de Tienda", "texto": "Al cierre del horario comercial, asegura físicamente el punto de venta y confirma que quede en condiciones de abrir sin sobresaltos al día siguiente."}
     ],
     "diagrama": {
      "carriles": ["Encargado(a) de Tienda", "Asesor(a) de Ventas - Tienda", "Gerente de Tienda"],
      "nodos": [
       {"id": "n0", "carril": "Encargado(a) de Tienda", "tipo": "inicio", "n": "Apertura del horario comercial del centro comercial"},
       {"id": "n1", "carril": "Encargado(a) de Tienda", "tipo": "tarea", "n": "Verificar sistema, tasa del día y cartelera fiscal", "sistemas": ["ERP Odoo"]},
       {"id": "n2", "carril": "Asesor(a) de Ventas - Tienda", "tipo": "tarea", "n": "Revisar exhibición por línea y limpieza de vitrinas"},
       {"id": "n3", "carril": "Asesor(a) de Ventas - Tienda", "tipo": "tarea", "n": "Atender al cliente bajo el protocolo de servicio"},
       {"id": "n4", "carril": "Gerente de Tienda", "tipo": "decision", "n": "¿Incidencia excede la atención normal?"},
       {"id": "n4alt", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Escalar la incidencia al proceso correspondiente"},
       {"id": "n5", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Cerrar y asegurar físicamente el punto de venta"},
       {"id": "n6", "carril": "Gerente de Tienda", "tipo": "fin", "n": "Jornada cerrada conforme al estándar"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n3"}, {"de": "n3", "a": "n4"},
       {"de": "n4", "a": "n5", "etq": "No"}, {"de": "n4", "a": "n4alt", "etq": "Sí"}, {"de": "n4alt", "a": "n5"}, {"de": "n5", "a": "n6"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Cumplimiento del protocolo depende de la supervisión presencial", "Las cámaras no se monitorean en vivo, así que el cumplimiento diario no tiene verificación remota confiable.", "Media", "Medio", "Reforzar el monitoreo externo diario de cámaras como control complementario a la visita del supervisor."],
      ["Ausencia de personal deja el punto por debajo de la plantilla mínima", "Una ausencia sin cobertura inmediata afecta la atención del día.", "Media", "Medio", "Activar el protocolo de cobertura entre tiendas (proceso 9.16) apenas se detecta la ausencia."],
      ["Estándar de exhibición no homogéneo entre marca y país", "Casio, Cubitt y cada país tienen matices propios de exhibición, lo que dificulta auditar de forma uniforme.", "Media", "Bajo", "Consolidar el estándar de exhibición por marca en un solo documento visual de referencia."],
      ["Escalamiento informal de incidencias sin registro", "Una incidencia resuelta por llamada o mensaje directo no siempre queda registrada.", "Media", "Medio", "Registrar la incidencia en Lark aunque se resuelva de inmediato."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Cumplimiento del checklist de apertura", "Aperturas con checklist completo ÷ total de aperturas", "Diaria", "Gerente de Tienda", "100%"],
      ["Incidencias escaladas por tienda", "Incidencias escaladas en el mes por tienda", "Mensual", "Supervisor de Ventas", "Referencia de gestión"],
      ["Resultado de auditoría o visita de supervisión", "Hallazgos críticos por visita", "Mensual", "Gerente de Ventas al Detal", "Sin hallazgos críticos"]
     ]
    }
   },

   "9.7": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre el recorrido regular del supervisor por cada punto de venta para verificar el cumplimiento del estándar operativo y visual, y el registro y seguimiento de lo que encuentra. No incluye la autoauditoría del propio gerente de tienda ni la aplicación en desarrollo para gestionarla (proceso 9.12), que es un mecanismo complementario y no un sustituto de esta visita externa."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Supervisor de Ventas", "texto": "Programa la ruta semanal para cubrir todos los puntos de venta a su cargo, agrupando por cercanía geográfica para aprovechar el tiempo de traslado."},
      {"id": "a2", "rol": "Supervisor de Ventas", "texto": "En cada visita revisa exhibición, cumplimiento de uniforme y carnet, funcionamiento de sistemas y cámaras, y el estado general de la instalación."},
      {"id": "a3", "rol": "Supervisor de Ventas", "texto": "Cuando detecta una desviación del estándar, la corrige en el momento si es sencilla, o la deja como observación formal al Gerente de Tienda si requiere seguimiento."},
      {"id": "a4", "rol": "Supervisor de Ventas", "texto": "Acompaña al Gerente de Tienda en la resolución de lo pendiente, incluidas incidencias que el gerente escaló durante la semana."},
      {"id": "a5", "rol": "Supervisor de Ventas", "texto": "Registra la visita —hoy como acta en papel en Venezuela, por Lark en Panamá— con los hallazgos y las responsabilidades asignadas."},
      {"id": "a6", "rol": "Gerente de Ventas al Detal (País)", "texto": "Lleva los hallazgos relevantes a la reunión semanal de gerentes de tienda para que se conviertan en acuerdos operativos de la semana."}
     ],
     "diagrama": {
      "carriles": ["Supervisor de Ventas", "Gerente de Tienda", "Gerente de Ventas al Detal (País)"],
      "nodos": [
       {"id": "n0", "carril": "Supervisor de Ventas", "tipo": "inicio", "n": "Programación semanal de ruta de visitas"},
       {"id": "n1", "carril": "Supervisor de Ventas", "tipo": "tarea", "n": "Visitar el punto y revisar exhibición, uniforme y sistemas"},
       {"id": "n2", "carril": "Supervisor de Ventas", "tipo": "decision", "n": "¿Se detecta una desviación del estándar?"},
       {"id": "n2alt", "carril": "Supervisor de Ventas", "tipo": "tarea", "n": "Corregir en el momento o dejar observación"},
       {"id": "n3", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Recibir acompañamiento en la resolución"},
       {"id": "n4", "carril": "Supervisor de Ventas", "tipo": "tarea", "n": "Registrar la visita (acta en papel o por Lark)", "sistemas": ["Plataforma Lark"]},
       {"id": "n5", "carril": "Gerente de Ventas al Detal (País)", "tipo": "tarea", "n": "Llevar hallazgos a la reunión semanal de gerentes"},
       {"id": "n6", "carril": "Gerente de Ventas al Detal (País)", "tipo": "fin", "n": "Punto verificado, con hallazgos y seguimiento asignado"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n2alt", "etq": "Sí"}, {"de": "n2", "a": "n4", "etq": "No"},
       {"de": "n2alt", "a": "n3"}, {"de": "n3", "a": "n4"}, {"de": "n4", "a": "n5"}, {"de": "n5", "a": "n6"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Un solo supervisor cubre toda la red de un país", "El caso de Panamá (11 tiendas con un supervisor) deja sin cobertura de visita a toda la operación si esa persona falta.", "Media", "Alto", "Formar un respaldo cruzado (otro supervisor o el Gerente de Ventas al Detal) para semanas de ausencia."],
      ["Registro en papel sin centralizar", "El acta de visita en Venezuela no se compara en el tiempo, así que un hallazgo puede repetirse sin que se note el patrón.", "Alta", "Medio", "Migrar el acta de papel a un registro digital simple, aunque sea una plantilla de Lark."],
      ["Cobertura de interior menos frecuente que la urbana", "Tiendas alejadas se visitan con menor cadencia por costo y tiempo de traslado.", "Media", "Medio", "Fijar y documentar una cadencia mínima explícita para tiendas de interior, distinta de la semanal urbana."],
      ["Correcciones inmediatas sin registro", "Los hallazgos menores resueltos en el momento solo se recuerdan de palabra.", "Media", "Bajo", "Registrar incluso las correcciones inmediatas, aunque sea en una línea del acta."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Puntos de venta visitados según cadencia programada", "Visitas realizadas ÷ visitas programadas", "Semanal", "Gerente de Ventas al Detal", "100%"],
      ["Hallazgos recurrentes en 3 visitas consecutivas", "Hallazgos repetidos por tienda", "Mensual", "Supervisor de Ventas", "Tendencia descendente"],
      ["Tiempo entre el hallazgo y su cierre", "Fecha de cierre − fecha de hallazgo", "Por hallazgo", "Supervisor de Ventas", "≤ 1 semana"]
     ]
    }
   },

   "9.8": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre el ciclo completo de abrir una tienda o kiosco propio, desde la identificación del local y su análisis financiero hasta la inauguración y el cierre del proyecto en la PMO. No incluye la apertura de una franquicia (proceso 9.10), que sigue un contrato y un modelo distintos, ni la remodelación de un punto ya existente (proceso 9.9)."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Planificador Financiero", "texto": "Elabora el ACP (análisis de conveniencia del proyecto) con la proyección de ventas, gastos y margen del local candidato, bajo la regla de que el payback no exceda tres años."},
      {"id": "a2", "rol": "Gerente Regional de Retail", "texto": "Revisa el ACP; si el negocio no se sostiene, el local se descarta en este punto, antes de comprometer ningún gasto."},
      {"id": "a3", "rol": "Gerente Regional de Retail", "texto": "Aprueba la apertura y la formaliza como proyecto dentro de la PMO, con fecha objetivo y responsables asignados."},
      {"id": "a4", "rol": "Arquitecto (proveedor externo)", "texto": "Diseña el layout del local y lo somete a ronda de ajustes con Visual Merchandising y la operación local hasta que el render queda aprobado."},
      {"id": "a5", "rol": "Gerente de Proyectos (PMO)", "texto": "Gestiona los permisos que exige el local —alcaldía, bomberos, patente municipal, publicidad de fachada— en paralelo al montaje físico."},
      {"id": "a6", "rol": "Supervisor de Ventas", "texto": "Dimensiona la plantilla por turno respetando el límite legal de horas, y coordina con Recursos Humanos la selección del personal que va a operar la tienda desde el día uno."},
      {"id": "a7", "rol": "Coordinador(a) de Visual Merchandising", "texto": "Instala la exhibición, el mobiliario y los materiales de marca, y coordina con Sistemas la habilitación de POS, cámaras y conectividad."},
      {"id": "a8", "rol": "Gerente de Proyectos (PMO)", "texto": "Ejecuta la inauguración y cierra el proyecto en la PMO, dejando el ACP archivado como línea base para medir el payback real contra el proyectado."}
     ],
     "diagrama": {
      "carriles": ["Planificador Financiero", "Gerente Regional de Retail", "Arquitecto (proveedor externo)", "Gerente de Proyectos (PMO)", "Supervisor de Ventas", "Coordinador(a) de Visual Merchandising"],
      "nodos": [
       {"id": "n0", "carril": "Planificador Financiero", "tipo": "inicio", "n": "Oportunidad de local identificada"},
       {"id": "n1", "carril": "Planificador Financiero", "tipo": "tarea", "n": "Elaborar el ACP financiero"},
       {"id": "n2", "carril": "Gerente Regional de Retail", "tipo": "decision", "n": "¿El ACP resulta viable (payback ≤ 3 años)?"},
       {"id": "n2alt", "carril": "Gerente Regional de Retail", "tipo": "fin", "n": "Local descartado"},
       {"id": "n3", "carril": "Gerente Regional de Retail", "tipo": "tarea", "n": "Aprobar la apertura y abrir el proyecto en la PMO"},
       {"id": "n4", "carril": "Arquitecto (proveedor externo)", "tipo": "tarea", "n": "Diseñar el layout y ajustar en render"},
       {"id": "n5", "carril": "Gerente de Proyectos (PMO)", "tipo": "tarea", "n": "Gestionar permisos (alcaldía, bomberos, patente, publicidad)"},
       {"id": "n6", "carril": "Supervisor de Ventas", "tipo": "tarea", "n": "Definir plantilla por turno y contratar personal"},
       {"id": "n7", "carril": "Coordinador(a) de Visual Merchandising", "tipo": "tarea", "n": "Instalar visual, sistemas y cámaras"},
       {"id": "n8", "carril": "Gerente de Proyectos (PMO)", "tipo": "tarea", "n": "Ejecutar inauguración y cerrar el proyecto"},
       {"id": "n9", "carril": "Gerente de Proyectos (PMO)", "tipo": "fin", "n": "Tienda operativa, ACP archivado como línea base"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n2alt", "etq": "No"}, {"de": "n2", "a": "n3", "etq": "Sí"},
       {"de": "n3", "a": "n4"}, {"de": "n4", "a": "n5"}, {"de": "n5", "a": "n6"}, {"de": "n6", "a": "n7"}, {"de": "n7", "a": "n8"}, {"de": "n8", "a": "n9"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Cronograma depende de disponibilidad de personal entrenado", "Cuando coinciden varias aperturas, se resuelve moviendo gerentes experimentados entre países caso por caso.", "Media", "Medio", "Planificar el entrenamiento con antelación cuando hay más de una apertura en curso."],
      ["No existe manual de apertura escrito", "El conocimiento vive en las personas que ya han abierto varias tiendas.", "Alta", "Alto", "Documentar un checklist mínimo de apertura antes de delegarla a alguien sin esa experiencia."],
      ["Imprevistos de montaje sin registro de lecciones aprendidas", "Correcciones \"en caliente\" (nivel de piso, medidas) no quedan documentadas para la siguiente apertura.", "Alta", "Bajo", "Registrar por escrito cada imprevisto resuelto en montaje."],
      ["Coincidencia con eventos externos imprevistos", "Un caso real de apertura coincidió con un terremoto, sin plan de contingencia para el personal en entrenamiento.", "Baja", "Alto", "Prever un plan de contingencia mínimo para el personal nuevo durante la semana de apertura."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Payback real vs. proyectado en el ACP", "Payback real ÷ payback proyectado, a los 3 años", "Anual (al cumplirse el plazo)", "Gerente Regional de Retail", "Dentro de ±15% del ACP"],
      ["Tiempo de apertura desde aprobación hasta inauguración", "Fecha de inauguración − fecha de aprobación", "Por proyecto", "Gerente de Proyectos (PMO)", "Según cronograma aprobado"],
      ["Permisos vigentes al día de la inauguración", "Permisos obtenidos ÷ permisos requeridos", "Por proyecto", "Gerente de Proyectos (PMO)", "100%"]
     ]
    }
   },

   "9.9": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre la renovación planificada de un punto de venta existente —imagen, mobiliario o estructura— desde que se detecta la necesidad hasta el cierre del proyecto. No incluye la apertura de una tienda nueva (proceso 9.8), aunque comparte proveedor y criterios de estándar visual, ni la reparación puntual de una incidencia urgente de infraestructura (proceso 9.18)."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Gerente Regional de Retail", "texto": "Al detectar la necesidad de renovar —imagen envejecida, mobiliario dañado o un nuevo estándar de marca— la agrega a la cola de remodelaciones en vez de intervenir la misma tienda más de una vez."},
      {"id": "a2", "rol": "Gerente Regional de Retail", "texto": "Prioriza la cola según disponibilidad de material y proveedor, agrupando varias intervenciones de una misma tienda para hacerlas juntas."},
      {"id": "a3", "rol": "Coordinador(a) de Visual Merchandising", "texto": "Presenta la propuesta y el render de la intervención, coordinando con el mismo proveedor que suele ejecutar las aperturas."},
      {"id": "a4", "rol": "Gerente Regional de Retail", "texto": "Aprueba el presupuesto de la intervención antes de que el proveedor arranque el trabajo físico."},
      {"id": "a5", "rol": "Arquitecto / Proveedor de Remodelación", "texto": "Ejecuta la intervención —cambio de iluminación, paneles, mobiliario o reparación estructural— dentro de la ventana de tiempo acordada con el centro comercial."},
      {"id": "a6", "rol": "Gerente de Proyectos (PMO)", "texto": "Cierra el proyecto una vez entregada la tienda renovada y verificado que quedó conforme al estándar visual y funcional vigente."}
     ],
     "diagrama": {
      "carriles": ["Gerente Regional de Retail", "Coordinador(a) de Visual Merchandising", "Arquitecto / Proveedor de Remodelación", "Gerente de Proyectos (PMO)"],
      "nodos": [
       {"id": "n0", "carril": "Gerente Regional de Retail", "tipo": "inicio", "n": "Necesidad de renovación detectada"},
       {"id": "n1", "carril": "Gerente Regional de Retail", "tipo": "tarea", "n": "Agrupar la intervención en la cola de remodelaciones"},
       {"id": "n2", "carril": "Gerente Regional de Retail", "tipo": "decision", "n": "¿Material o proveedor disponible?"},
       {"id": "n2alt", "carril": "Gerente Regional de Retail", "tipo": "tarea", "n": "Mantener en cola hasta disponibilidad"},
       {"id": "n3", "carril": "Coordinador(a) de Visual Merchandising", "tipo": "tarea", "n": "Presentar propuesta y render de la intervención", "sistemas": ["Plataforma Lark"]},
       {"id": "n4", "carril": "Gerente Regional de Retail", "tipo": "tarea", "n": "Aprobar el presupuesto de la intervención"},
       {"id": "n5", "carril": "Arquitecto / Proveedor de Remodelación", "tipo": "tarea", "n": "Ejecutar la intervención"},
       {"id": "n6", "carril": "Gerente de Proyectos (PMO)", "tipo": "tarea", "n": "Cerrar el proyecto"},
       {"id": "n7", "carril": "Gerente de Proyectos (PMO)", "tipo": "fin", "n": "Tienda renovada bajo el nuevo estándar"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n2alt", "etq": "No"}, {"de": "n2", "a": "n3", "etq": "Sí"},
       {"de": "n2alt", "a": "n2"}, {"de": "n3", "a": "n4"}, {"de": "n4", "a": "n5"}, {"de": "n5", "a": "n6"}, {"de": "n6", "a": "n7"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Sin manual de remodelación escrito", "Cada intervención se coordina con el criterio informal de quien ya la ha hecho antes.", "Media", "Medio", "Documentar el checklist mínimo de remodelación una vez estabilizado el proceso de apertura (9.8)."],
      ["Cola sin criterio de priorización escrito", "Se prioriza \"cuando llegue el material\", sin una regla explícita.", "Media", "Bajo", "Definir un criterio simple de priorización (antigüedad, tráfico, urgencia del daño)."],
      ["Dependencia de un proveedor único", "El mismo proveedor que ejecuta las aperturas también hace las remodelaciones, sin alternativa si no está disponible.", "Baja", "Medio", "Calificar un segundo proveedor de respaldo para picos de demanda."],
      ["Intervención parcial deja imagen mixta", "La tienda puede quedar con parte renovada y parte antigua mientras se espera el resto del material.", "Media", "Bajo", "Comunicar al cliente y al personal el cronograma de finalización cuando la intervención queda incompleta."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Tiendas en cola vs. tiendas renovadas en el período", "Tiendas renovadas ÷ tiendas en cola", "Trimestral", "Gerente Regional de Retail", "Cola decreciente o estable"],
      ["Desviación de presupuesto ejecutado vs. aprobado", "Presupuesto ejecutado ÷ presupuesto aprobado", "Por proyecto", "Gerente de Proyectos (PMO)", "≤ 10%"],
      ["Tiempo en cola antes de iniciar la intervención", "Fecha de inicio − fecha de ingreso a la cola", "Por tienda", "Gerente Regional de Retail", "Referencia de gestión"]
     ]
    }
   },

   "9.10": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre el diseño y la operación del modelo de franquicia Cubitt —contrato, fee, reportería y auditoría— que el grupo construye desde cero, distinto del modelo de franquicia Casio que ya existía. No incluye la gestión de los socios y partners que operan bajo una figura distinta a la franquicia estándar (proceso 9.11)."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Gerente Regional de Retail", "texto": "Evalúa la oportunidad de un nuevo mercado y define el fee del contrato, homologado con los casos ya en curso (Nicaragua, Honduras, República Dominicana)."},
      {"id": "a2", "rol": "Legal Corporativo", "texto": "Redacta el contrato bajo el modelo estandarizado que el grupo está construyendo desde cero para Cubitt."},
      {"id": "a3", "rol": "Gerente Regional de Retail", "texto": "Define el protocolo de reportería obligatoria que la franquicia debe entregar para alimentar la torre de control regional."},
      {"id": "a4", "rol": "Gerente Regional de Visual Merchandising", "texto": "Transfiere las herramientas de gestión —cuadro de metas, Follow Up, estándar visual— para que la franquicia opere bajo el mismo sistema que la operación propia."},
      {"id": "a5", "rol": "Gerente Regional de Retail", "texto": "Verifica que la franquicia cumpla la reportería y el estándar acordado; si no, escala el incumplimiento y define un plan de corrección."},
      {"id": "a6", "rol": "Gerente Regional de Retail", "texto": "Ejecuta la auditoría integral anual de cumplimiento del contrato y del estándar de marca."}
     ],
     "diagrama": {
      "carriles": ["Gerente Regional de Retail", "Legal Corporativo", "Gerente Regional de Visual Merchandising"],
      "nodos": [
       {"id": "n0", "carril": "Gerente Regional de Retail", "tipo": "inicio", "n": "Interés de franquiciado potencial en un nuevo mercado"},
       {"id": "n1", "carril": "Gerente Regional de Retail", "tipo": "tarea", "n": "Evaluar la oportunidad y definir el fee"},
       {"id": "n2", "carril": "Legal Corporativo", "tipo": "tarea", "n": "Redactar el contrato bajo el modelo estandarizado"},
       {"id": "n3", "carril": "Gerente Regional de Retail", "tipo": "tarea", "n": "Definir el protocolo de reportería obligatoria", "sistemas": ["Tablero regional retail"]},
       {"id": "n4", "carril": "Gerente Regional de Visual Merchandising", "tipo": "tarea", "n": "Transferir herramientas de gestión"},
       {"id": "n5", "carril": "Gerente Regional de Retail", "tipo": "decision", "n": "¿Cumple reportería y estándar?"},
       {"id": "n5alt", "carril": "Gerente Regional de Retail", "tipo": "tarea", "n": "Escalar incumplimiento y definir plan de corrección"},
       {"id": "n6", "carril": "Gerente Regional de Retail", "tipo": "tarea", "n": "Ejecutar auditoría integral anual"},
       {"id": "n7", "carril": "Gerente Regional de Retail", "tipo": "fin", "n": "Franquicia operativa, reportando a la torre de control"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n3"}, {"de": "n3", "a": "n4"}, {"de": "n4", "a": "n5"},
       {"de": "n5", "a": "n6", "etq": "Sí"}, {"de": "n5", "a": "n5alt", "etq": "No"}, {"de": "n5alt", "a": "n6"}, {"de": "n6", "a": "n7"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Modelo en construcción sin trayectoria previa", "El contrato de franquicia Cubitt se está probando por primera vez en varios mercados a la vez.", "Alta", "Medio", "Tratar Nicaragua como piloto formal y documentar ajustes antes de replicar a nuevos mercados."],
      ["Reportería depende de compatibilidad con la torre de control", "Sin un formato exigido, la información de la franquicia se normaliza a mano.", "Media", "Medio", "Exigir por contrato un formato mínimo de entrega de datos."],
      ["Sin checkpoint intermedio entre la firma y la auditoría anual", "El primer año de una franquicia nueva pasa sin una revisión formal antes de la auditoría anual.", "Media", "Medio", "Agregar un checkpoint semestral ligero, sobre todo el primer año."],
      ["Transferencia de herramientas sin acompañamiento continuo", "El estándar de marca puede diluirse en el franquiciado sin seguimiento cercano.", "Baja", "Medio", "Definir una cadencia mínima de acompañamiento durante el primer año."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Franquicias reportando en formato compatible", "Franquicias con reportería compatible ÷ total de franquicias activas", "Mensual", "Gerente Regional de Retail", "100%"],
      ["Cumplimiento del estándar en la auditoría anual", "Hallazgos críticos por auditoría", "Anual", "Gerente Regional de Retail", "Sin hallazgos críticos"],
      ["Tiempo desde interés hasta firma del contrato", "Fecha de firma − fecha de interés", "Por caso", "Gerente Regional de Retail", "Referencia de gestión"]
     ]
    }
   },

   "9.11": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre la coordinación con las unidades retail que no son propiedad plena ni franquicia estándar —socios, operadores con fee, la boutique del aeropuerto— incluida la revisión de su P&L y la renegociación cuando corresponde. No incluye la gestión de las franquicias Cubitt bajo contrato estandarizado (proceso 9.10), que sigue un modelo contractual distinto."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Analista de Sistemas / Datos", "texto": "Consulta la información de venta e inventario de cada partner regional (Costa Rica, Guatemala, Ecuador, la boutique del aeropuerto de Panamá) por query, sin acceder directamente a sus sistemas."},
      {"id": "a2", "rol": "Planificador Financiero", "texto": "Revisa el P&L de cada tienda-partner al cierre del mes, comparándolo contra el mismo estándar de la operación propia."},
      {"id": "a3", "rol": "Gerente Regional de Retail", "texto": "Cuando una tienda-partner cierra en rojo, abre una renegociación comercial con el partner en vez de dejar que la pérdida se acumule."},
      {"id": "a4", "rol": "Gerente Regional de Visual Merchandising", "texto": "Traslada al partner los estándares regionales de gestión —metas, Follow Up, comisiones y visual— para que opere bajo el mismo sistema que la operación propia."}
     ],
     "diagrama": {
      "carriles": ["Analista de Sistemas / Datos", "Planificador Financiero", "Gerente Regional de Retail", "Gerente Regional de Visual Merchandising"],
      "nodos": [
       {"id": "n0", "carril": "Analista de Sistemas / Datos", "tipo": "inicio", "n": "Cierre mensual de P&L por tienda-partner"},
       {"id": "n1", "carril": "Analista de Sistemas / Datos", "tipo": "tarea", "n": "Consultar información del partner por query"},
       {"id": "n2", "carril": "Planificador Financiero", "tipo": "tarea", "n": "Revisar el P&L de cada tienda-partner"},
       {"id": "n3", "carril": "Gerente Regional de Retail", "tipo": "decision", "n": "¿La tienda-partner cierra en rojo?"},
       {"id": "n3alt", "carril": "Gerente Regional de Retail", "tipo": "tarea", "n": "Abrir renegociación comercial con el partner"},
       {"id": "n4", "carril": "Gerente Regional de Visual Merchandising", "tipo": "tarea", "n": "Aplicar los estándares regionales"},
       {"id": "n5", "carril": "Gerente Regional de Visual Merchandising", "tipo": "fin", "n": "P&L revisado, con acciones correctivas cuando aplica"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n3"}, {"de": "n3", "a": "n3alt", "etq": "Sí"},
       {"de": "n3", "a": "n4", "etq": "No"}, {"de": "n3alt", "a": "n4"}, {"de": "n4", "a": "n5"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Figuras legales distintas por partner", "Cada partner tiene su propia figura (socio 50/50, operador con fee, franquicia informal), sin un único procedimiento de acceso a datos.", "Alta", "Medio", "Documentar el mecanismo de consulta específico por partner como parte del acuerdo comercial."],
      ["Renegociación reactiva tras la pérdida", "Un cambio de operador logístico en Guatemala costó USD 12.000 en un mes y dejó la operación en rojo antes de renegociar.", "Media", "Alto", "Fijar un umbral de alerta temprana en el P&L mensual que dispare la revisión antes del cierre en rojo."],
      ["Adopción desigual de estándares regionales", "La antigüedad de la relación con cada partner influye en qué tanto adopta el estándar.", "Media", "Medio", "Incluir la adopción del estándar como parte de la revisión trimestral del acuerdo."],
      ["Escalamiento sin protocolo escrito", "La resolución de desviaciones depende de la relación personal del Gerente Regional con cada partner.", "Baja", "Medio", "Documentar el criterio de cuándo una desviación amerita renegociación formal."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Tiendas-partner en rojo vs. total", "Tiendas-partner en rojo ÷ total de tiendas-partner", "Mensual", "Planificador Financiero", "Tendencia descendente"],
      ["Tiempo entre alerta de P&L negativo y renegociación", "Fecha de apertura de renegociación − fecha de alerta", "Por caso", "Gerente Regional de Retail", "≤ 1 mes"],
      ["Partners con estándar regional completo", "Partners con metas, follow up, comisiones y visual homologados ÷ total de partners", "Trimestral", "Gerente Regional de Visual Merchandising", "Creciente hasta 100%"]
     ]
    }
   },

   "9.12": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre la verificación periódica del estándar operativo, visual y de mantenimiento de cada punto de venta, hoy como acta de visita del Gerente Regional y en desarrollo como autoauditoría digital del propio gerente de tienda. No incluye la visita semanal de supervisión de rutina (proceso 9.7), que es más frecuente y de menor alcance que esta auditoría.",
     "nota_estado": "La autoauditoría por aplicación todavía está en desarrollo; hoy el control real es el acta de visita en papel que deja el Gerente Regional de Retail al viajar al país."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Gerente de Tienda", "texto": "En la autoauditoría (to-be), sube fotos del estado de la tienda y marca en la aplicación el mantenimiento pendiente y las remodelaciones que ve necesarias."},
      {"id": "a2", "rol": "Gerente Regional de Retail", "texto": "En la auditoría externa (as-is), deja un acta de visita cuando viaja al país, con los hallazgos y las responsabilidades de seguimiento."},
      {"id": "a3", "rol": "Gerente de Ventas al Detal (País)", "texto": "Cuando la aplicación (una vez en producción) señale que una tienda excede el intervalo sin autoauditarse, alerta y programa la visita pendiente."},
      {"id": "a4", "rol": "Gerente de Ventas al Detal (País)", "texto": "Prioriza la cola de mantenimiento y remodelación con base en los hallazgos de ambas fuentes, alimentando los procesos 9.9 y 9.18."}
     ],
     "diagrama": {
      "carriles": ["Gerente de Tienda", "Gerente Regional de Retail", "Gerente de Ventas al Detal (País)"],
      "nodos": [
       {"id": "n0", "carril": "Gerente de Tienda", "tipo": "inicio", "n": "Programación mensual de autoauditoría / visita regional"},
       {"id": "n1", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Subir fotos y marcar pendientes en la aplicación", "sistemas": ["Aplicación de autoauditoría (en desarrollo)"]},
       {"id": "n2", "carril": "Gerente Regional de Retail", "tipo": "tarea", "n": "Dejar acta de visita al viajar al país"},
       {"id": "n3", "carril": "Gerente de Ventas al Detal (País)", "tipo": "decision", "n": "¿La tienda excede el intervalo sin auditar?"},
       {"id": "n3alt", "carril": "Gerente de Ventas al Detal (País)", "tipo": "tarea", "n": "Alertar y programar la visita pendiente"},
       {"id": "n4", "carril": "Gerente de Ventas al Detal (País)", "tipo": "tarea", "n": "Priorizar mantenimiento y remodelación según hallazgos"},
       {"id": "n5", "carril": "Gerente de Ventas al Detal (País)", "tipo": "fin", "n": "Cola de mantenimiento y remodelación actualizada"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n0", "a": "n2"}, {"de": "n1", "a": "n3"}, {"de": "n2", "a": "n3"},
       {"de": "n3", "a": "n3alt", "etq": "Sí"}, {"de": "n3", "a": "n4", "etq": "No"}, {"de": "n3alt", "a": "n4"}, {"de": "n4", "a": "n5"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Autoauditoría por aplicación no está en producción", "Hoy no hay alerta automática por intervalo excedido.", "Alta", "Medio", "Fijar una cadencia mínima manual (p. ej. trimestral) mientras la aplicación no esté lista."],
      ["Acta de visita en papel sin centralizar", "Un hallazgo repetido entre viajes puede pasar inadvertido.", "Alta", "Medio", "Migrar el acta a un registro digital simple antes de esperar la aplicación completa."],
      ["Cobertura de auditoría externa sin frecuencia garantizada", "Depende de cuándo viaja el Gerente Regional al país.", "Media", "Medio", "Complementar con las visitas del Supervisor de Ventas (proceso 9.7) como fuente adicional."],
      ["Autoauditoría vs. auditoría externa sin distinción clara", "El gerente puede depender de que \"vengan a verlo\" en vez de reportar proactivamente.", "Media", "Bajo", "Comunicar la autoauditoría como responsabilidad propia del gerente, no como sustituto de la visita externa."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Tiendas con autoauditoría dentro del intervalo", "Tiendas al día ÷ total de tiendas (una vez en producción)", "Mensual", "Gerente de Ventas al Detal", "100%"],
      ["Tiendas visitadas por el Gerente Regional en el período", "Tiendas visitadas ÷ total de la red", "Trimestral", "Gerente Regional de Retail", "Cobertura completa"],
      ["Hallazgos que pasan a cola de mantenimiento o remodelación", "Hallazgos convertidos en proyecto", "Mensual", "Gerente de Ventas al Detal", "Referencia de gestión"]
     ]
    }
   },

   "9.13": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre la recepción y resolución del reclamo de garantía en el punto de venta, con su ejecución diferenciada por marca —Casio con reporte a fábrica, Cubitt vía Servicio Técnico— hasta el ajuste de inventario. No incluye el diseño del protocolo de servicio general de atención al cliente (proceso 9.6), del que la garantía es un caso específico."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Cliente", "texto": "Presenta el reclamo de garantía en el punto de venta, incluso cuando compró en una tienda de un tercero que revende la marca."},
      {"id": "a2", "rol": "Gerente de Tienda", "texto": "Recibe el reclamo y decide, según la criticidad y lo que tenga disponible, si cambia el producto de inmediato o lo deriva."},
      {"id": "a3", "rol": "Gerente de Tienda", "texto": "Para una reparación menor de Casio la resuelve el relojero de la propia tienda; para el resto, la deriva a la relojera central o a Servicio Técnico según la marca."},
      {"id": "a4", "rol": "Técnico(a) de Servicio / Relojero(a)", "texto": "Repara o cambia el producto, y en Cubitt registra el caso en el flujo de Lark que administra Servicio Técnico, con ajuste mensual en la bodega central."},
      {"id": "a5", "rol": "Especialista de Producto / Proyecto", "texto": "Para Casio, reporta el número de serie del producto defectuoso a Casio Japón para tramitar la nota de crédito correspondiente."},
      {"id": "a6", "rol": "Gerente de Tienda", "texto": "Registra la garantía procesada (en Lark o en el sistema paralelo Cisco de Venezuela) y ajusta el inventario del punto de venta."}
     ],
     "diagrama": {
      "carriles": ["Cliente", "Gerente de Tienda", "Técnico(a) de Servicio / Relojero(a)", "Especialista de Producto / Proyecto"],
      "nodos": [
       {"id": "n0", "carril": "Cliente", "tipo": "inicio", "n": "Cliente presenta reclamo de garantía"},
       {"id": "n1", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Recibir el reclamo y decidir cambio o derivación"},
       {"id": "n2", "carril": "Gerente de Tienda", "tipo": "decision", "n": "¿Reparación menor que el relojero de tienda resuelve (Casio)?"},
       {"id": "n2alt", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Enviar a relojera central o Servicio Técnico", "sistemas": ["Plataforma Lark"]},
       {"id": "n3", "carril": "Técnico(a) de Servicio / Relojero(a)", "tipo": "tarea", "n": "Reparar o cambiar en tienda"},
       {"id": "n4", "carril": "Especialista de Producto / Proyecto", "tipo": "tarea", "n": "Reportar número de serie a Casio Japón para nota de crédito"},
       {"id": "n5", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Registrar la garantía y ajustar inventario", "sistemas": ["ERP Odoo"]},
       {"id": "n6", "carril": "Gerente de Tienda", "tipo": "fin", "n": "Cliente atendido; garantía registrada"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n3", "etq": "Sí"}, {"de": "n2", "a": "n2alt", "etq": "No"},
       {"de": "n2alt", "a": "n4"}, {"de": "n3", "a": "n5"}, {"de": "n4", "a": "n5"}, {"de": "n5", "a": "n6"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Dos sistemas de registro sin fuente única", "Lark (Cubitt vía Servicio Técnico) y Cisco (Venezuela) coexisten sin una sola fuente de verdad regional.", "Alta", "Medio", "Definir cuál es el sistema oficial por marca/país y documentar la migración del otro."],
      ["Criterio de cambio inmediato vs. derivación sin regla escrita", "La decisión depende de la experiencia del gerente, sin política documentada.", "Media", "Medio", "Documentar el criterio ya usado de facto (p. ej. compra reciente se cambia directo) como política."],
      ["Ajuste mensual en bodega central para Cubitt", "El inventario de garantías queda desactualizado hasta un mes.", "Media", "Bajo", "Evaluar un ciclo de ajuste más frecuente si el volumen de garantías lo justifica."],
      ["Reclamos de clientes de terceros sin trazabilidad de compra directa", "Complica decidir si aplica garantía sin un criterio documentado.", "Baja", "Medio", "Documentar el criterio ya usado (recibir y resolver como caso propio)."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Tiempo de resolución del reclamo en tienda", "Fecha de cierre − fecha de reclamo", "Por caso", "Gerente de Tienda", "Según criticidad (inmediato a 5 días)"],
      ["Garantías Casio con nota de crédito solicitada", "Notas de crédito solicitadas ÷ casos elegibles", "Mensual", "Especialista de Producto / Proyecto", "100%"],
      ["Producto con mayor incidencia de garantía", "Reclamos por SKU", "Mensual", "Gerente de Servicio Técnico", "Insumo para calidad y compras"]
     ]
    }
   },

   "9.14": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre el conteo físico selectivo semanal y el inventario general anual del punto de venta, con su conciliación y ajuste en el sistema. No incluye el inventario del centro de distribución regional, que pertenece a Logística y Operaciones (macro 7), ni el procedimiento de pago del faltante por parte del personal, que es una política transversal del macroproceso (ver Marco de referencia).",
     "nota_estado": "Panamá ya opera el conteo con tablet conectada al WMS; Venezuela lo hace de forma más manual y está adoptando esa práctica como referencia."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Gerente de Tienda", "texto": "Cada semana cuenta 2 o 3 líneas de producto (por ejemplo, hoy termos, mañana audífonos) con la tablet conectada al WMS, evitando el papel."},
      {"id": "a2", "rol": "Supervisor de Ventas", "texto": "Descarga el conteo capturado y lo compara de inmediato contra la existencia que marca el sistema, generando una existencia al día que no afecta la venta en curso."},
      {"id": "a3", "rol": "Supervisor de Ventas", "texto": "Si hay diferencia, la envía a la tienda para que el equipo la revise y ajuste al día siguiente."},
      {"id": "a4", "rol": "Supervisor(a) de Bodega / Despacho", "texto": "Aplica el ajuste final en el sistema una vez confirmada la diferencia, y en fechas comerciales fuertes coordina un conteo antes y otro después del evento."}
     ],
     "diagrama": {
      "carriles": ["Gerente de Tienda", "Supervisor de Ventas", "Supervisor(a) de Bodega / Despacho"],
      "nodos": [
       {"id": "n0", "carril": "Gerente de Tienda", "tipo": "inicio", "n": "Programación semanal de conteo por línea"},
       {"id": "n1", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Contar la línea de producto con tablet", "sistemas": ["WMS"]},
       {"id": "n2", "carril": "Supervisor de Ventas", "tipo": "tarea", "n": "Descargar y comparar contra existencia de sistema", "sistemas": ["ERP Odoo"]},
       {"id": "n3", "carril": "Supervisor de Ventas", "tipo": "decision", "n": "¿Hay diferencia entre conteo y sistema?"},
       {"id": "n3alt", "carril": "Supervisor de Ventas", "tipo": "tarea", "n": "Enviar diferencia a la tienda para ajuste"},
       {"id": "n4", "carril": "Supervisor(a) de Bodega / Despacho", "tipo": "tarea", "n": "Aplicar el ajuste final en el sistema"},
       {"id": "n5", "carril": "Supervisor(a) de Bodega / Despacho", "tipo": "fin", "n": "Inventario cuadrado y registrado"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n3"}, {"de": "n3", "a": "n3alt", "etq": "Sí"},
       {"de": "n3", "a": "n4", "etq": "No"}, {"de": "n3alt", "a": "n4"}, {"de": "n4", "a": "n5"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Venezuela cuenta de forma manual", "El proceso en Excel (gerente llena, pasa a la supervisora de inventario) es más lento y propenso a error que la tablet con WMS de Panamá.", "Alta", "Medio", "Evaluar llevar la práctica de tablet/WMS de Panamá a Venezuela."],
      ["Responsabilidad económica del faltante puede desincentivar el reporte honesto", "El personal asume el costo del faltante, lo que puede sesgar el reporte por temor a la sanción.", "Media", "Medio", "Distinguir con claridad, como ya se hace, entre diferencia de color (no es pérdida) y faltante real."],
      ["Conteo selectivo no cubre todo el catálogo entre inventarios generales", "El resto del catálogo queda ciego por semanas entre un inventario general y el siguiente.", "Media", "Bajo", "Rotar las líneas contadas para que todo el catálogo pase por conteo selectivo dentro del ciclo."],
      ["Ajuste final sin doble verificación", "Una sola persona aplica el ajuste, sin segunda revisión.", "Baja", "Medio", "Exigir doble verificación cuando el ajuste supere un monto o cantidad definida."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Cobertura del catálogo por conteo selectivo", "Líneas contadas en el ciclo ÷ líneas activas del catálogo", "Mensual", "Supervisor de Ventas", "100% de las líneas activas"],
      ["Diferencias injustificadas tras revisión (merma real)", "Faltantes confirmados ÷ total de diferencias detectadas", "Mensual", "Gerente de Ventas al Detal", "Tendencia descendente"],
      ["Tiempo entre el conteo y el ajuste en sistema", "Fecha de ajuste − fecha de conteo", "Por conteo", "Supervisor(a) de Bodega / Despacho", "≤ 1 día"]
     ]
    }
   },

   "9.15": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre la custodia y el depósito del efectivo de venta diaria de cada tienda hasta su conciliación en tesorería, incluida la variante por país según haya o no banco cercano al punto de venta. No incluye el cuadre de caja en sí (proceso 9.5), que es el paso previo que determina cuánto efectivo hay que depositar."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Gerente de Tienda", "texto": "Al cierre, separa el efectivo, las tarjetas y las transferencias del día conforme al cuadre de caja."},
      {"id": "a2", "rol": "Gerente de Tienda", "texto": "Si el punto de venta tiene banco propio en el centro comercial, deposita el efectivo directamente ese mismo día; si no, lo entrega bajo firma al mensajero o auxiliar autorizado."},
      {"id": "a3", "rol": "Auxiliar / Ayudante de Bodega y Tráfico", "texto": "Recoge el efectivo y lo deposita en la cuenta del grupo —en Venezuela con transporte de frecuencia fija; en el interior, por valija con la empresa que mejor cubra la ruta."},
      {"id": "a4", "rol": "Coordinador(a) de Tesorería y Cobranzas", "texto": "Recibe los documentos físicos (facturas, comprobantes) y los concilia contra lo efectivamente depositado."}
     ],
     "diagrama": {
      "carriles": ["Gerente de Tienda", "Auxiliar / Ayudante de Bodega y Tráfico", "Coordinador(a) de Tesorería y Cobranzas"],
      "nodos": [
       {"id": "n0", "carril": "Gerente de Tienda", "tipo": "inicio", "n": "Cierre de caja diario con efectivo consolidado"},
       {"id": "n1", "carril": "Gerente de Tienda", "tipo": "decision", "n": "¿Tiene banco propio en el centro comercial?"},
       {"id": "n1alt", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Depositar directamente en el banco del centro comercial"},
       {"id": "n2", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Entregar el efectivo al mensajero o auxiliar autorizado"},
       {"id": "n3", "carril": "Auxiliar / Ayudante de Bodega y Tráfico", "tipo": "tarea", "n": "Depositar el efectivo en la cuenta del grupo"},
       {"id": "n4", "carril": "Coordinador(a) de Tesorería y Cobranzas", "tipo": "tarea", "n": "Recibir y conciliar documentos contra lo depositado"},
       {"id": "n5", "carril": "Coordinador(a) de Tesorería y Cobranzas", "tipo": "fin", "n": "Efectivo depositado y conciliado"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n1alt", "etq": "Sí"}, {"de": "n1", "a": "n2", "etq": "No"},
       {"de": "n2", "a": "n3"}, {"de": "n3", "a": "n4"}, {"de": "n1alt", "a": "n4"}, {"de": "n4", "a": "n5"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Efectivo custodiado más de un día sin protocolo claro", "En puntos sin banco cercano, el efectivo puede quedar guardado sin un límite de monto o tiempo documentado.", "Media", "Alto", "Documentar el protocolo de custodia y el monto máximo permitido antes del siguiente retiro."],
      ["Transporte de frecuencia fija deja efectivo en tránsito", "En Venezuela, el ciclo lunes-miércoles-viernes puede dejar efectivo hasta dos días en tienda.", "Media", "Medio", "Evaluar si el riesgo justifica ajustar la frecuencia en las tiendas de mayor volumen."],
      ["Transferencias que no acreditan de inmediato", "La verificación manual antes de entregar el producto puede generar fricción con el cliente.", "Baja", "Bajo", "Mantener el protocolo ya usado documentado como política, no como excepción caso por caso."],
      ["Falla de POS sin plan de respaldo en todos los países", "No todos los países replican el esquema de doble banco/POS de Panamá.", "Baja", "Medio", "Replicar el esquema de respaldo de Panamá en el resto de los países."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Efectivo depositado el mismo día del cierre", "Depósitos el mismo día ÷ total de cierres", "Diaria", "Gerente de Tienda", "100% donde hay banco propio"],
      ["Tiempo entre cierre y conciliación en tesorería", "Fecha de conciliación − fecha de cierre", "Semanal", "Coordinador(a) de Tesorería y Cobranzas", "Según frecuencia de transporte del país"],
      ["Incidencias de descuadre depositado vs. declarado", "Descuadres detectados por mes", "Mensual", "Coordinador(a) de Tesorería y Cobranzas", "Tendencia descendente"]
     ]
    }
   },

   "9.16": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre la ejecución en primera línea del ciclo de personal de tienda —cobertura, permisos, disciplina, dotación e inducción— hasta que el circuito cierra con Recursos Humanos. No incluye el cálculo y pago de comisiones e incentivos (proceso 9.17) ni el descriptor de cargo formal, que es responsabilidad de Talento Humano a nivel de grupo."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Gerente de Tienda", "texto": "Ante una ausencia que necesita cobertura inmediata, la cubre con un movimiento de personal entre tiendas o con quien esté disponible, avisando al Supervisor."},
      {"id": "a2", "rol": "Gerente de Tienda", "texto": "Aprueba permisos y vacaciones verificando que la plantilla mínima quede cubierta antes de autorizar."},
      {"id": "a3", "rol": "Gerente de Tienda", "texto": "Ante una incidencia menor (uso de celular, incumplimiento de uniforme), resuelve en primera instancia con un llamado de atención verbal."},
      {"id": "a4", "rol": "Supervisor de Ventas", "texto": "Cuando la incidencia es reincidente y ya se agotaron los llamados informales, la escala a Recursos Humanos con el historial documentado."},
      {"id": "a5", "rol": "Gerente de Tienda", "texto": "Notifica a Recursos Humanos las novedades del personal para que el circuito cierre en la nómina formal."},
      {"id": "a6", "rol": "Coordinador(a) de Recursos Humanos", "texto": "Gestiona la dotación con el headcount por talla y género calculado a nivel regional, y coordina inducción y refrescamiento de normativa."}
     ],
     "diagrama": {
      "carriles": ["Gerente de Tienda", "Supervisor de Ventas", "Coordinador(a) de Recursos Humanos"],
      "nodos": [
       {"id": "n0", "carril": "Gerente de Tienda", "tipo": "inicio", "n": "Ausencia, incidencia o necesidad de personal detectada"},
       {"id": "n1", "carril": "Gerente de Tienda", "tipo": "decision", "n": "¿Requiere cobertura inmediata?"},
       {"id": "n1alt", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Cubrir con movimiento entre tiendas"},
       {"id": "n2", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Aprobar permiso o vacaciones verificando cobertura"},
       {"id": "n3", "carril": "Supervisor de Ventas", "tipo": "decision", "n": "¿Incidencia disciplinaria reincidente?"},
       {"id": "n3alt", "carril": "Supervisor de Ventas", "tipo": "tarea", "n": "Escalar a Recursos Humanos con el historial"},
       {"id": "n4", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Resolver en primera instancia (llamado de atención)"},
       {"id": "n5", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Notificar a Recursos Humanos", "sistemas": ["Plataforma Lark"]},
       {"id": "n6", "carril": "Coordinador(a) de Recursos Humanos", "tipo": "fin", "n": "Plantilla cubierta e incidencia cerrada"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n1alt", "etq": "Sí"}, {"de": "n1", "a": "n2", "etq": "No"}, {"de": "n1alt", "a": "n5"},
       {"de": "n2", "a": "n3"}, {"de": "n3", "a": "n3alt", "etq": "Sí"}, {"de": "n3", "a": "n4", "etq": "No"},
       {"de": "n3alt", "a": "n5"}, {"de": "n4", "a": "n5"}, {"de": "n5", "a": "n6"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Primera instancia disciplinaria sin umbral escrito", "Depende del criterio del Gerente de Tienda cuándo pasa de verbal a escrito.", "Media", "Medio", "Documentar el criterio ya usado de facto como parte de la política de personal."],
      ["Cobertura entre tiendas no siempre registrada", "Dificulta ver el patrón de rotación o de faltantes recurrentes.", "Media", "Bajo", "Registrar el movimiento de cobertura en Lark aunque se resuelva informalmente."],
      ["Headcount por talla y género recién calculado", "Si no se mantiene actualizado, la próxima compra de dotación vuelve a estimarse \"a ojo\".", "Media", "Medio", "Definir quién actualiza el headcount y con qué frecuencia."],
      ["Sin descriptor de cargo para posiciones de tienda", "Brecha general del negocio, no solo de retail.", "Alta", "Medio", "Priorizar los cargos de tienda al desarrollar los descriptores pendientes con Talento Humano."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Plantilla mínima cubierta por tienda y turno", "Turnos con plantilla mínima ÷ total de turnos", "Semanal", "Gerente de Tienda", "100%"],
      ["Incidencias disciplinarias escaladas a RRHH", "Incidencias escaladas por mes", "Mensual", "Coordinador(a) de Recursos Humanos", "Referencia de gestión"],
      ["Dotación entregada con acta firmada", "Entregas con acta ÷ total de entregas", "Por entrega", "Coordinador(a) de Recursos Humanos", "100%"]
     ]
    }
   },

   "9.17": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre el cálculo y pago mensual de comisiones e incentivos del personal de tienda, y el diseño del esquema homologado regional que sustituirá los esquemas heredados por país. No incluye la definición de las metas y KPI sobre los que se calcula la comisión (proceso 9.1 para el forecast, 9.2 para los KPI de la torre de control).",
     "nota_estado": "El esquema de comisiones homologado a nivel regional está en diseño, con lanzamiento previsto para fin de 2026; hasta entonces cada país sigue con su esquema heredado."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Analista de Recursos Humanos / Nómina", "texto": "Al cierre mensual, calcula la comisión de cada asesor y gerente bajo el esquema vigente del país, con base en venta y KPI de conversión del tablero regional."},
      {"id": "a2", "rol": "Gerente de Tienda", "texto": "Valida el cálculo contra la meta y el resultado real de conversión de su tienda antes de que pase a nómina."},
      {"id": "a3", "rol": "Analista de Recursos Humanos / Nómina", "texto": "Aplica el esquema heredado del país mientras el esquema homologado regional no esté vigente; una vez lanzado, aplica el nuevo esquema único."},
      {"id": "a4", "rol": "Analista de Recursos Humanos / Nómina", "texto": "Procesa el pago de comisiones e incentivos dentro de la nómina del mes."},
      {"id": "a5", "rol": "Gerente Regional de Retail", "texto": "Diseña y aprueba el esquema homologado regional, con el Planificador Financiero validando el impacto en costos antes de lanzarlo."}
     ],
     "diagrama": {
      "carriles": ["Analista de Recursos Humanos / Nómina", "Gerente de Tienda", "Gerente Regional de Retail"],
      "nodos": [
       {"id": "n0", "carril": "Analista de Recursos Humanos / Nómina", "tipo": "inicio", "n": "Cierre mensual de venta y KPI por tienda y asesor"},
       {"id": "n1", "carril": "Analista de Recursos Humanos / Nómina", "tipo": "tarea", "n": "Calcular la comisión bajo el esquema vigente", "sistemas": ["Tablero regional retail"]},
       {"id": "n2", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Validar el cálculo contra meta y conversión"},
       {"id": "n3", "carril": "Gerente Regional de Retail", "tipo": "decision", "n": "¿Aplica el esquema homologado regional?"},
       {"id": "n3alt", "carril": "Analista de Recursos Humanos / Nómina", "tipo": "tarea", "n": "Aplicar el esquema heredado del país"},
       {"id": "n4", "carril": "Analista de Recursos Humanos / Nómina", "tipo": "tarea", "n": "Procesar el pago en la nómina del mes"},
       {"id": "n5", "carril": "Analista de Recursos Humanos / Nómina", "tipo": "fin", "n": "Comisiones e incentivos pagados"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n3"}, {"de": "n3", "a": "n4", "etq": "Sí"},
       {"de": "n3", "a": "n3alt", "etq": "No"}, {"de": "n3alt", "a": "n4"}, {"de": "n4", "a": "n5"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Esquemas heredados distintos por país", "Genera percepción de inequidad entre asesores de distintos mercados.", "Media", "Medio", "Mantener el cronograma de homologación como prioridad visible del Gerente Regional de Retail."],
      ["KPI base todavía no consolidados al 100%", "El cálculo depende de KPI (conversión, UPT, VPT) que aún no están estables en la torre de control (9.2).", "Media", "Medio", "No lanzar el esquema homologado hasta que esos KPI estén estables."],
      ["Comparación de desempeño distorsionada entre países", "Sin el esquema homologado, comparar el desempeño comercial queda distorsionado por incentivos distintos.", "Media", "Bajo", "Documentar la diferencia de esquemas como variación legítima mientras dure la transición."],
      ["Impacto en costos no validado a fondo antes del lanzamiento", "El nuevo esquema homologado podría tener un costo distinto al estimado.", "Baja", "Alto", "Simular el esquema homologado contra el histórico de al menos un país antes de lanzarlo a toda la región."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Comisiones pagadas dentro del ciclo de nómina", "Pagos a tiempo ÷ total de pagos del mes", "Mensual", "Analista de Recursos Humanos / Nómina", "100%"],
      ["Países bajo el esquema homologado regional", "Países migrados ÷ total de países", "Mensual (desde el lanzamiento)", "Gerente Regional de Retail", "Creciente hasta 100%"],
      ["Impacto del esquema homologado en el costo de comisiones", "Costo nuevo esquema ÷ costo esquema heredado, por país al migrar", "Por país al migrar", "Planificador Financiero", "Dentro del presupuesto aprobado"]
     ]
    }
   },

   "9.18": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre la gestión de incidencias y trámites de infraestructura física del punto de venta —cuotas, permisos, cámaras, POS, daños— con el Supervisor de Ventas como puente entre la tienda y el resto de los departamentos. No incluye la remodelación planificada (proceso 9.9), que es una intervención programada y no una respuesta a una incidencia."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Gerente de Tienda", "texto": "Detecta la incidencia —falla de cámara, filtración, cuota que subió, orden de chequeo del centro comercial— y la reporta al Supervisor de Ventas, que centraliza este tipo de gestión."},
      {"id": "a2", "rol": "Supervisor de Ventas", "texto": "Si la incidencia es urgente (por ejemplo, una puerta que no cierra y deja la tienda expuesta de noche), resuelve de inmediato con un proveedor de confianza ya conocido."},
      {"id": "a3", "rol": "Supervisor de Ventas", "texto": "Para lo que no es urgente, coordina con Sistemas cuando es cámaras, POS o conectividad, o con Contabilidad cuando es una cuota o un pago a proveedor."},
      {"id": "a4", "rol": "Administración del Centro Comercial", "texto": "Notifica cambios (cuota extraordinaria, orden de chequeo, nueva disposición) que la tienda debe atender dentro de un plazo."},
      {"id": "a5", "rol": "Contabilidad", "texto": "Cierra la incidencia una vez pagado y facturado el proveedor, dejando la tienda al día con el centro comercial."}
     ],
     "diagrama": {
      "carriles": ["Gerente de Tienda", "Supervisor de Ventas", "Administración del Centro Comercial", "Contabilidad"],
      "nodos": [
       {"id": "n0", "carril": "Gerente de Tienda", "tipo": "inicio", "n": "Incidencia o notificación de infraestructura detectada"},
       {"id": "n1", "carril": "Gerente de Tienda", "tipo": "tarea", "n": "Reportar la incidencia al Supervisor"},
       {"id": "n2", "carril": "Supervisor de Ventas", "tipo": "decision", "n": "¿Es una incidencia urgente?"},
       {"id": "n2alt", "carril": "Supervisor de Ventas", "tipo": "tarea", "n": "Resolver de inmediato con proveedor de confianza"},
       {"id": "n3", "carril": "Supervisor de Ventas", "tipo": "tarea", "n": "Coordinar con Sistemas o Contabilidad"},
       {"id": "n4", "carril": "Administración del Centro Comercial", "tipo": "tarea", "n": "Notificar y coordinar con el centro comercial"},
       {"id": "n5", "carril": "Contabilidad", "tipo": "tarea", "n": "Cerrar la incidencia con el proveedor pagado y facturado"},
       {"id": "n6", "carril": "Contabilidad", "tipo": "fin", "n": "Infraestructura resuelta, al día con cuotas y permisos"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n2alt", "etq": "Sí"}, {"de": "n2", "a": "n3", "etq": "No"},
       {"de": "n2alt", "a": "n5"}, {"de": "n3", "a": "n4"}, {"de": "n4", "a": "n5"}, {"de": "n5", "a": "n6"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Gestión de infraestructura centralizada en una sola persona", "El Supervisor de Ventas es el único puente entre la tienda y el resto de los departamentos en su país.", "Alta", "Alto", "Documentar contactos de proveedores de confianza y criterio de urgencia para no depender de una sola persona."],
      ["Incidencias urgentes resueltas fuera de horario sin protocolo de reembolso", "No hay un límite de gasto ni aprobación posterior documentada para una emergencia.", "Media", "Medio", "Definir un límite de gasto que el Supervisor puede autorizar en emergencia, con reporte posterior."],
      ["Notificaciones del centro comercial sin registro centralizado", "Llegan por canales informales (correo, WhatsApp) sin repositorio por tienda.", "Media", "Bajo", "Centralizar las notificaciones del centro comercial en un solo repositorio por tienda (Lark)."],
      ["Dependencia de un solo proveedor de confianza por tipo de incidencia", "Sin alternativa si el proveedor habitual no está disponible.", "Baja", "Medio", "Calificar un segundo proveedor de respaldo para las categorías más frecuentes."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Tiempo de resolución de incidencia urgente", "Fecha de resolución − fecha de reporte", "Por caso", "Supervisor de Ventas", "Mismo día"],
      ["Cuotas y permisos del centro comercial al día", "Cuotas/permisos vigentes ÷ total exigido", "Mensual", "Contabilidad", "100%"],
      ["Incidencias de infraestructura por tienda", "Incidencias reportadas por tienda en el período", "Mensual", "Supervisor de Ventas", "Referencia de gestión"]
     ]
    }
   }

  }
 }
};
