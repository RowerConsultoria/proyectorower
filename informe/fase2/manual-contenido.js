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
// Macro 6 (Compras y Abastecimiento) — COMPLETO: los 9 procesos + Contexto,
// Gobernanza, Marco de referencia, Agenda de mejora y Anexos. A diferencia de
// Ventas Retail, aquí SÍ hay procesos «to-be» (6.2, 6.8, 6.9) — el propio
// mapa v18 los rotula con fuente «Best practices CIPS/APQC PCF», porque hoy
// no operan en la organización.
//
// Fuentes cruzadas: entrevistas E-10 Vera Gavizón, E-08 Roberto Roizental,
// E-40 Jimena, E-59 Hugo/Itai (Costa Rica/Importbel) — Insumos/Entrevistas_
// dialogo_limpio_agrupadas/Compras — + marcos CIPS/APQC PCF citados por el
// propio mapa v18 para los procesos to-be. ⚠️ 6.7 (Gestión de reposición a
// punto de venta) documenta el lado analítico de Compras del mismo ciclo que
// 9.3 de Ventas Retail documenta desde el lado comercial — se cruzan a
// propósito en vez de duplicarse.
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
 },

 "6": {
  "n0": {

   "introduccion": {
    "estado": "borrador",
    "proposito": "Este manual reúne cómo se opera hoy —y cómo debería operarse de forma homologada— el abastecimiento de mercancía de Grupo Kenex: desde la planificación de demanda hasta la compra internacional a Casio y a las fábricas de Cubitt, la compra local de urgencia, la reposición entre el hub regional y cada país, y la reposición al punto de venta. Sirve como referencia única para que quien asuma el rol de compras en un país nuevo, o quien entre a suplir a quien hoy decide la compra de cada marca, pueda operar bajo el mismo criterio, sin depender de que \"alguien lo sepa de memoria\".",
    "alcance": "Desde la consolidación de demanda (S&OP) hasta la orden de compra confirmada, su seguimiento hasta el arribo al hub regional de Kenex Panamá, y la reposición desde ese hub hacia cada país y hacia el punto de venta. No incluye la nacionalización aduanera ni el despacho físico desde el hub (macro 7, Logística y Operaciones), aunque este manual documenta hasta el punto en que Compras entrega el pedido aprobado a Logística. Tampoco incluye el pronóstico de venta por tienda que usa como insumo (macro 2, Planeación Comercial) ni el ajuste comercial y la recepción en el punto de venta (macro 9, Ventas Retail, proceso 9.3), con el que este manual se cruza a propósito en el proceso 6.7.",
    "audiencia": [
     "Gerente Regional Comercial / Retail",
     "Gerente Regional de Marketing",
     "Coordinador(a) de Logística y Bodega",
     "Analista/Ejecutivo(a) Comercial (KAM Casio, Mayor)",
     "Asistente Administrativo(a) / Servicios Generales (por país)",
     "Planificador Financiero",
     "Gerencia de Contabilidad / Administración",
     "Junta / Comité Directivo (seguimiento de allocation y forecast de compra)"
    ]
   },

   "contexto": {
    "estado": "borrador",
    "ubicacion": "Compras y Abastecimiento es la bisagra entre la demanda que consolidan Planeación Comercial y los canales de venta, y la oferta que llega de las dos marcas del grupo: Casio, representada bajo cuota territorial exclusiva de la casa matriz japonesa, y Cubitt, marca propia fabricada en China. No existe hoy un departamento de compras formalmente estructurado: la compra internacional de cada marca la decide una sola persona con apoyo de un comité informal, sin backup documentado. Toda la mercancía —de ambas marcas y de todos los países— converge primero en la bodega central de Zona Libre de Colón, Panamá (5.000 m²), antes de redistribuirse a cada país; desde ahí también opera el pequeño almacén de Obarrio para el detal panameño, y aparte el almacén de Rower en Venezuela. La planificación de demanda se apoya en una reunión mensual de S&OP que cruza inventario, sell-in y sell-out por SKU/país/canal, y en un módulo de sugerido en Power BI que la gerencia comercial ajusta con criterio experto antes de confirmar la compra.",
    "duenos": [
     ["Estratégico / marca", "Gerente Regional Comercial / Retail (Casio) · Gerente Regional de Marketing (Cubitt, con comité colegiado)", "Decide qué y cuánto comprar de cada marca; sin backup formal documentado hoy."],
     ["Operativo regional", "Coordinador(a) de Logística y Bodega", "Dueño operativo de la planificación (S&OP), la reposición inter-compañía y a punto de venta, y del ciclo de vida del proveedor."],
     ["País", "Asistente Administrativo(a) / Servicios Generales (por país)", "Ejecuta la compra local de urgencia y la registra en el ERP de su país."]
    ],
    "entidades": [
     ["Distribuidora Rower C.A.", "Venezuela", "Operación propia", "Recibe reposición inter-compañía desde el hub de Panamá; también ejecuta compra local de urgencia (p. ej. proveedor Mundo)."],
     ["Kenex Panamá (hub regional)", "Panamá / Zona Libre de Colón", "Operación propia", "Bodega central de 5.000 m² que recibe TODA la mercancía Casio y Cubitt de la región antes de redistribuir; también almacén de Obarrio para el detal panameño."],
     ["Importbel, S.A.", "Costa Rica", "Sociedad (socio)", "Compra local de urgencia bajo la misma dinámica de allocation que el resto de los países."],
     ["Casio (casa matriz)", "Japón", "Marca representada", "Fija la cuota o allocation mensual por país; en meses recientes ha confirmado solo una fracción de lo solicitado."],
     ["Fábricas de Cubitt", "China", "Marca propia — sourcing", "Producción bajo pedido, coordinada en sitio por un enlace de sourcing; decisión aérea o marítima según urgencia."]
    ],
    "sistemas": [
     ["Odoo (ERP)", "Registro de compras locales por país; base para el sugerido de reposición", "Compra local, reposición inter-compañía, reposición a punto de venta"],
     ["Módulo de sugerido (Power BI)", "Modelo de sugerido de compra/reposición por SKU, con apoyo analítico de datos", "Planificación de demanda, compra Casio, reposición"],
     ["\"Archivo de compras\" (Excel)", "Reconciliación manual mensual entre lo pedido, lo confirmado por Casio y la venta real por país — descrito por el propio equipo como \"un rompecabezas de 5.000 piezas todos los meses\"", "Compra internacional Casio (PCI)"],
     ["Lark (tablero de producción/tránsito Cubitt)", "Seguimiento de órdenes Cubitt en producción y tránsito; muy reciente, en construcción", "Compra internacional Cubitt"],
     ["Lark (self-report)", "Registro de la planificación de reposición y lanzamientos por país", "Planificación de demanda, reposición"]
    ],
    "interfaces": [
     ["Planeación Comercial", "Entrada", "Forecast de venta y plan de negocio anual por país/marca que alimenta el sugerido de compra."],
     ["R&D y Desarrollo de Producto (Cubitt)", "Entrada", "Calendario de lanzamientos que dispara la compra internacional de nuevos SKU."],
     ["Logística y Operaciones", "Salida", "Pedido aprobado para nacionalización, recepción en el hub y despacho a cada país."],
     ["Ventas Retail / Ventas Mayor", "Coordinación", "Venta real (sell-out) y necesidad de reposición del punto de venta y del mayorista."],
     ["Administración y Finanzas / Contabilidad", "Coordinación", "Restricción presupuestaria de la compra; pago a proveedores y anticipos."],
     ["Gestión de Datos e Inteligencia de Negocio", "Coordinación", "Reportes que alimentan el sugerido de compra y reposición."]
    ]
   },

   "gobernanza": {
    "estado": "borrador",
    "actores": [
     ["Gerente Regional Comercial / Retail", "Regional — marca Casio", "Decide la compra internacional de Casio; participa en S&OP, en la aprobación de allocation y en el comité informal de Cubitt.", "Ajustes de cantidad dentro de la cuota confirmada; decisiones de allocation entre países.", "Sin backup documentado hoy — una ausencia detiene la decisión de compra Casio."],
     ["Gerente Regional de Marketing", "Regional — marca Cubitt", "Encabeza el comité informal de Cubitt; decide sourcing, muestras y modo de envío junto con el comité.", "Decisiones de producto y lanzamiento dentro del presupuesto aprobado.", "Compras que exceden el presupuesto de lanzamiento escalan a la Junta."],
     ["Coordinador(a) de Logística y Bodega", "Regional — operación", "Dueño operativo de la planificación de demanda, la reposición inter-compañía y a punto de venta, y de la homologación de proveedores.", "Ajuste del sugerido de reposición dentro del criterio experto ya validado.", "Cantidades finales de reposición inter-compañía escalan al Gerente Regional Comercial / Retail."],
     ["Asistente Administrativo(a) / Servicios Generales (país)", "País", "Ejecuta la compra local de urgencia y la registra en el ERP.", "Compras puntuales de bajo monto, dentro del criterio local.", "Compras que exceden el criterio local escalan al Country Manager."],
     ["Comité informal de compras Cubitt", "Regional — colegiado", "Revisa la necesidad, decide con la fábrica china y confirma el modo de envío.", "Decisión colegiada dentro del ciclo de lanzamiento.", "Sin backup formal si dos de sus integrantes no están disponibles a la vez."]
    ],
    "comites": [
     ["Reunión mensual de S&OP", "Consolidar inventario, sell-in, sell-out y forecast para producir el plan de suministro del mes.", "Mensual", "Coordinador(a) de Logística y Bodega · Gerente Regional Comercial / Retail · Gerente Regional de Marketing · Planificador Financiero · Analista de Sistemas / Datos", "Plan de suministro por SKU/país/canal", "Inventario, sell-in/sell-out, forecast, sugerido de Power BI", "Plan de suministro aprobado y propuesta de reposición"],
     ["Comité informal de compras Cubitt", "Decidir la compra internacional de la marca propia, sin estructura ni acta formal.", "Por evento (lanzamiento o necesidad)", "Gerente Regional de Marketing · Gerente Regional Comercial / Retail · Director(a) Ventas Regional Cubitt", "Decisión de compra, sourcing y modo de envío", "Necesidad detectada, disponibilidad de la fábrica, sell-in/sell-out", "Orden de compra Cubitt confirmada"],
     ["Comité de finanzas", "Revisar el flujo de caja y las compras pendientes de aprobación financiera.", "Quincenal", "Contabilidad · Junta · asesores externos", "Aprobación de pagos y anticipos a proveedores", "Estado de cuentas por pagar, compras en curso", "Pagos autorizados y prioridades de caja"]
    ]
   },

   "marco": {
    "estado": "borrador",
    "principios": [
     "Un solo hub regional: toda la mercancía —de ambas marcas y de todos los países— converge primero en el hub de Kenex Panamá antes de redistribuirse, para concentrar el control de inventario en un solo punto.",
     "Criterio experto sobre el sugerido del modelo: el sugerido de Power BI es un punto de partida, no una decisión; la gerencia comercial lo ajusta con el conocimiento del negocio antes de confirmar.",
     "Exclusividad territorial de Casio: la cuota que confirma la casa matriz por país es la restricción dura del ciclo de compra, no una referencia.",
     "Compra local de urgencia como excepción, no como regla: el país solo compra localmente lo que el hub regional no puede cubrir a tiempo."
    ],
    "politicas": [
     "Reporte mensual de PCI (Plan de Compra Internacional): reconciliación manual de lo pedido, lo confirmado por Casio y la venta real por país, hoy hecha en un archivo de compras propio.",
     "Ajuste manual del sugerido de compra y reposición: el modelo de Power BI genera un punto de partida; la gerencia comercial lo ajusta con criterio experto antes de confirmar cualquier compra.",
     "Clasificación Pareto A/B/C para la reposición a tienda: la reposición semanal prioriza los SKU por velocidad de venta, no por un criterio único de cantidad.",
     "Bandera amarilla de cobertura crítica: un SKU con menos de dos semanas de cobertura en tienda se marca como alerta y se revisa antes del quiebre.",
     "Decisión colegiada para la compra internacional de Cubitt: el comité informal de compras revisa la necesidad y decide en conjunto, en vez de que una sola persona decida por la marca propia.",
     "Aprobación de cantidades finales de reposición inter-compañía por la gerencia comercial: la cantidad final que sale del hub hacia cada país queda sujeta a una aprobación superior a la propuesta del planificador.",
     "Compra local como excepción, no como regla: el país solo compra localmente lo que el hub regional no puede cubrir a tiempo, y la aprueba el Country Manager."
    ],
    "normativo": [
     "Exclusividad territorial de Casio por país, definida por la casa matriz japonesa — no es una norma propia de Kenex, pero condiciona toda la compra de esa marca.",
     "Regulación aduanera y de importación de cada país (Venezuela, Panamá, Colombia, Costa Rica) sobre la mercancía que transita por el hub de Panamá y se redistribuye."
    ]
   },

   "agenda": {
    "estado": "borrador",
    "nota": "A diferencia de Ventas Retail, en Compras y Abastecimiento sí hay procesos clasificados como «to-be» en el mapa v18: 6.2 (Gestión del ciclo de vida del proveedor), 6.8 (Gobierno, política y control de compras) y 6.9 (Devoluciones y no conformidades a proveedor) no operan hoy como tales en la organización — su fuente es buena práctica de referencia (CIPS/APQC PCF), no evidencia de campo. El resto es 1 híbrido (6.1) y 5 as-is (6.3–6.7).",
    "por_implementar": [
     ["6.2 Gestión del ciclo de vida del proveedor (SRM)", "No existe hoy homologación ni evaluación periódica de proveedores; el riesgo de mono-proveedor de firmware de Cubitt ya se identificó sin proceso que lo mitigue.", "Priorizar la homologación de los proveedores críticos (firmware Cubitt, fábricas principales) antes de extenderla a todo el panel."],
     ["6.8 Gobierno, política y control de compras", "No existe un departamento de compras formalmente estructurado, ni política escrita, ni matriz de aprobación, ni KPI formalizados.", "Documentar primero la matriz de aprobación por monto y tipo de compra; la política completa y el tablero de KPI pueden seguir después."],
     ["6.9 Devoluciones y no conformidades a proveedor", "Devoluciones acumuladas sin política, y defectos de Cubitt sin trazabilidad.", "Definir primero el protocolo de detección y apertura de reclamo; la recuperación de costo puede formalizarse en un segundo momento."]
    ],
    "por_formalizar": [
     ["6.1 Planificación de demanda y S&OP", "El sugerido de Power BI y el ajuste experto de la gerencia comercial no están documentados como método; dependen del conocimiento de dos personas.", "Documentar el criterio de ajuste manual sobre el sugerido, para que no dependa solo de quien lo aplica hoy."]
    ],
    "brechas": [
     ["6.3 Compra internacional a marca representada (Casio)", "La reconciliación mensual (PCI) es enteramente manual y depende de una sola persona.", "Documentar el método de reconciliación y evaluar automatizar el cruce entre lo pedido, lo confirmado y lo vendido."],
     ["6.4 Compra internacional a marca propia (Cubitt)", "El comité de compras Cubitt es informal, sin acta ni criterio de decisión escrito.", "Documentar el criterio de decisión del comité y la responsabilidad de cada integrante."],
     ["6.5 Compra local por país (nacionales y de urgencia)", "Cada país compra localmente con su propio criterio, sin visibilidad regional consolidada.", "Definir un umbral y un reporte mínimo de compra local para visibilidad regional."],
     ["6.6 Gestión de reposición inter-compañía (país-hub)", "El llenado del contenedor entre el hub y cada país no se reporta sistemáticamente cuando un pedido no cabe completo; el problema se descubre por faltantes o discrepancias de aduana.", "Documentar y reportar de forma sistemática el ajuste por capacidad de contenedor antes del zarpe."],
     ["6.7 Gestión de reposición a punto de venta", "La meta de cobertura de inventario en tienda se fijó como un número único regional, sin considerar la capacidad física de los kioscos pequeños, y está en renegociación.", "Ajustar la meta de cobertura por tipo de punto de venta (tienda grande vs. kiosco) en vez de un número único regional."]
    ]
   },

   "anexos": {
    "estado": "borrador",
    "glosario": [
     ["Allocation", "Cuota o cantidad que la casa matriz de Casio confirma por país sobre lo solicitado; puede ser menor a lo pedido."],
     ["Archivo de compras", "Hoja de cálculo donde se reconcilia mensualmente lo pedido, lo confirmado por Casio y la venta real por país."],
     ["Bandera amarilla", "Alerta visual en la hoja de reposición cuando la cobertura de un SKU en tienda cae debajo de dos semanas."],
     ["Comité de compras Cubitt", "Grupo informal, sin acta, que decide la compra internacional de la marca propia."],
     ["Hub regional", "Bodega central de Kenex Panamá (Zona Libre de Colón) que recibe toda la mercancía antes de redistribuirla."],
     ["MOQ", "Cantidad mínima de pedido que exige una fábrica para producir o despachar un lote."],
     ["NCR", "Reporte de no conformidad: documento que registra un defecto o discrepancia con un proveedor."],
     ["Pareto A/B/C", "Clasificación de SKU por velocidad de venta, usada para priorizar la reposición a tienda."],
     ["PCI", "Plan de Compra Internacional: reconciliación mensual de lo pedido, confirmado y vendido para la marca Casio."],
     ["S&OP", "Sales & Operations Planning: reunión mensual que concilia inventario, venta y forecast en un plan único de suministro."],
     ["Sourcing", "Búsqueda y gestión de proveedores o fábricas, en este caso principalmente en China para Cubitt."],
     ["SRM", "Supplier Relationship Management: gestión del ciclo de vida y desempeño de proveedores."]
    ],
    "raci": [
     ["6.1 Planificación de demanda y S&OP", "Coordinador(a) de Logística y Bodega", "Gerente Regional Comercial / Retail", "Analista de Sistemas / Datos · Planificador Financiero", "Junta / Comité Directivo"],
     ["6.2 Gestión del ciclo de vida del proveedor (SRM)", "Coordinador(a) de Logística y Bodega", "Gerente Regional Comercial / Retail", "Gerente de Contabilidad / Administración", "Planificador Financiero"],
     ["6.3 Compra internacional a marca representada (Casio)", "Analista/Ejecutivo(a) Comercial (KAM Casio)", "Gerente Regional Comercial / Retail", "Coordinador(a) de Logística y Bodega", "Junta / Comité Directivo"],
     ["6.4 Compra internacional a marca propia (Cubitt)", "Sourcing en China", "Gerente Regional de Marketing", "Director(a) Ventas Regional Cubitt · Coordinador(a) de Logística y Bodega", "Gerente Regional Comercial / Retail"],
     ["6.5 Compra local por país (nacionales y de urgencia)", "Asistente Administrativo(a) / Servicios Generales", "Country Manager", "Coordinador(a) de Logística y Bodega", "—"],
     ["6.6 Gestión de reposición inter-compañía (país-hub)", "Coordinador(a) de Logística y Bodega", "Gerente Regional Comercial / Retail", "Coordinador(a) Comercial", "—"],
     ["6.7 Gestión de reposición a punto de venta", "Coordinador(a) de Logística y Bodega", "Gerente Regional Comercial / Retail", "Supervisor de Ventas · Analista/Ejecutivo(a) Comercial (Mayor)", "Gerente de Ventas al Detal (País)"],
     ["6.8 Gobierno, política y control de compras", "Coordinador(a) de Logística y Bodega", "Gerente Regional Comercial / Retail", "Planificador Financiero · Gerente de Contabilidad / Administración", "Junta / Comité Directivo"],
     ["6.9 Devoluciones y no conformidades a proveedor", "Coordinador(a) de Logística y Bodega", "Director(a) responsable de la marca", "Gerente de Contabilidad / Administración", "Gerente Regional Comercial / Retail"]
    ],
    "catalogo_sistemas": [
     ["Odoo (ERP)", "Registro de compra local; base de datos para el sugerido", "6.5 · 6.6 · 6.7", "Coordinador(a) de Sistemas"],
     ["Módulo de sugerido (Power BI)", "Modelo de sugerido de compra/reposición por SKU", "6.1 · 6.3 · 6.6 · 6.7", "Analista de Sistemas / Datos"],
     ["\"Archivo de compras\" (Excel)", "Reconciliación mensual PCI", "6.3", "Sin responsable formal — depende de una persona"],
     ["Lark (tablero de producción/tránsito Cubitt)", "Seguimiento de órdenes Cubitt", "6.4", "Coordinador(a) de Logística y Bodega"],
     ["Lark (self-report)", "Registro de planificación de reposición y lanzamientos", "6.1 · 6.6 · 6.7", "Coordinador(a) de Logística y Bodega"]
    ],
    "interfaces_detalle": [
     ["Planeación Comercial", "Entrega del forecast anual aprobado", "Forecast de venta por país/marca"],
     ["R&D y Desarrollo de Producto (Cubitt)", "Calendario de lanzamiento", "Especificación y fecha objetivo del nuevo SKU"],
     ["Logística y Operaciones", "Entrega del pedido aprobado", "Orden de compra confirmada, lista de empaque esperada"],
     ["Ventas Retail / Ventas Mayor", "Ciclo de reposición", "Venta real (sell-out), necesidad de reposición"],
     ["Administración y Finanzas / Contabilidad", "Aprobación de pago", "Restricción presupuestaria, anticipos a proveedor"]
    ],
    "docs_lark": [
     ["Levantamiento de Procesos de Compras (self-report)", "Regional", "Descripción de la planificación de reposición y compra de lanzamientos", "6.1 · 6.6 · 6.7"],
     ["Tablero de producción y tránsito Cubitt", "Regional", "Seguimiento de órdenes en fábrica y en tránsito", "6.4"]
    ],
    "variaciones_pais": [
     ["Panamá", "Único país con hub regional propio (Zona Libre de Colón) y almacén de detal aparte (Obarrio).", "Ubicación geográfica y rol de hub regional para toda la operación."],
     ["Costa Rica", "Operación bajo figura de socio (Importbel, S.A.), con la misma dinámica de allocation que la operación propia.", "Relación societaria distinta a la de la operación propia."],
     ["Venezuela", "Compra local de urgencia a proveedor identificado cuando el hub regional no cubre a tiempo.", "Restricciones propias de importación y de mercado del país."]
    ]
   }
  },

  "procesos": {

   "6.1": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre la consolidación mensual de inventario, sell-in y sell-out por SKU/país/canal, la generación del sugerido de compra y reposición en Power BI, su ajuste con criterio experto, y la validación cross-funcional en la reunión de S&OP que produce el plan de suministro del mes. No incluye la ejecución de la compra internacional en sí (procesos 6.3 y 6.4) ni la reposición física a cada país o punto de venta (procesos 6.6 y 6.7), que parten de este plan ya aprobado.",
     "nota_estado": "Este proceso combina un modelo analítico ya en producción —el sugerido en Power BI— con un ajuste manual por criterio experto que hoy no está documentado como método: depende de que cada responsable de marca lo aplique con su propio conocimiento del negocio."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Coordinador(a) de Logística y Bodega", "texto": "Inicia el ciclo mensual de S&OP al cierre del mes comercial, convocando a los participantes."},
      {"id": "a2", "rol": "Analista de Sistemas / Datos", "texto": "Ejecuta el módulo de sugerido en Power BI, cruzando inventario, sell-in y sell-out por SKU/país/canal."},
      {"id": "a3", "rol": "Gerente Regional Comercial / Retail", "texto": "Ajusta el sugerido con criterio experto para la marca Casio, considerando la cuota vigente y la venta reciente por país."},
      {"id": "a4", "rol": "Gerente Regional de Marketing", "texto": "Ajusta el sugerido con criterio experto para la marca Cubitt, considerando lanzamientos previstos y cobertura crítica."},
      {"id": "a5", "rol": "Planificador Financiero", "texto": "Valida que el plan de suministro propuesto sea consistente con la restricción presupuestaria del mes."},
      {"id": "a6", "rol": "Coordinador(a) de Logística y Bodega", "texto": "Consolida los ajustes y presenta el plan de suministro en la reunión mensual de S&OP para su aprobación."}
     ],
     "diagrama": {
      "carriles": ["Coordinador(a) de Logística y Bodega", "Analista de Sistemas / Datos", "Gerente Regional Comercial / Retail", "Gerente Regional de Marketing", "Planificador Financiero"],
      "nodos": [
       {"id": "n0", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "inicio", "n": "Cierre del mes comercial — inicia el ciclo de S&OP"},
       {"id": "n1", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "tarea", "n": "Convocar a los participantes de la reunión de S&OP"},
       {"id": "n2", "carril": "Analista de Sistemas / Datos", "tipo": "tarea", "n": "Ejecutar el módulo de sugerido", "sistemas": ["Módulo de sugerido (Power BI)"]},
       {"id": "n3", "carril": "Gerente Regional Comercial / Retail", "tipo": "tarea", "n": "Ajustar el sugerido de Casio con criterio experto"},
       {"id": "n4", "carril": "Gerente Regional de Marketing", "tipo": "tarea", "n": "Ajustar el sugerido de Cubitt con criterio experto"},
       {"id": "n5", "carril": "Planificador Financiero", "tipo": "tarea", "n": "Validar restricción presupuestaria del mes"},
       {"id": "n6", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "tarea", "n": "Consolidar ajustes y presentar el plan de suministro", "sistemas": ["Lark (self-report)"]},
       {"id": "n7", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "decision", "n": "¿Plan de suministro aprobado en S&OP?"},
       {"id": "n7alt", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "tarea", "n": "Ajustar plan y reprogramar aprobación"},
       {"id": "n8", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "fin", "n": "Plan de suministro del mes aprobado"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n3"}, {"de": "n3", "a": "n4"}, {"de": "n4", "a": "n5"}, {"de": "n5", "a": "n6"},
       {"de": "n6", "a": "n7"}, {"de": "n7", "a": "n8", "etq": "Sí"}, {"de": "n7", "a": "n7alt", "etq": "No"}, {"de": "n7alt", "a": "n6"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Ajuste manual sin método documentado", "El ajuste sobre el sugerido depende del criterio de dos personas, sin guía escrita.", "Media", "Alto", "Documentar el criterio de ajuste como guía escrita, con ejemplos de decisiones ya tomadas."],
      ["Modelo de Power BI concentrado en una persona", "El diseño y mantenimiento del módulo de sugerido depende de un solo especialista de datos.", "Media", "Alto", "Documentar el diseño del modelo y formar un respaldo en el equipo de datos."],
      ["Datos de sell-out heterogéneos entre países", "Los países en transición a Odoo todavía reportan venta real con formatos distintos.", "Media", "Medio", "Estandarizar el reporte de venta real por país a medida que avanza la migración a Odoo."],
      ["Meta de cobertura fijada sin considerar el tipo de punto de venta", "Un mandato regional de cobertura uniforme resultó físicamente imposible para los kioscos pequeños y está en renegociación.", "Media", "Medio", "Ajustar la meta de cobertura por tipo de punto de venta antes de fijarla como estándar regional."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Precisión del sugerido de compra/reposición", "Venta real ÷ sugerido ajustado, por SKU/país", "Mensual", "Analista de Sistemas / Datos", "±15%"],
      ["Plan de suministro aprobado a tiempo", "Fecha de aprobación en S&OP − fecha de cierre de mes", "Mensual", "Coordinador(a) de Logística y Bodega", "≤5 días hábiles"],
      ["Cobertura de inventario por SKU crítico", "Inventario disponible ÷ venta promedio semanal", "Semanal", "Coordinador(a) de Logística y Bodega", "Según clasificación Pareto A/B/C"]
     ]
    }
   },

   "6.2": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre la homologación de un proveedor nuevo, su contratación formal, la evaluación periódica de desempeño mediante scorecard, y la decisión de continuidad, renovación o baja. No incluye la ejecución de una orden de compra puntual a un proveedor ya homologado (procesos 6.3, 6.4 y 6.5), que se apoya en este proceso solo cuando hay evaluación o cambio de proveedor de fondo.",
     "nota_estado": "Este proceso es «to-be»: hoy no existe homologación ni evaluación formal de proveedores en Kenex. Se documenta con base en buena práctica de la disciplina de compras (CIPS/APQC PCF) y en una brecha concreta ya identificada — el riesgo de depender de un solo proveedor de firmware para Cubitt, sin evaluación ni plan de contingencia."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Coordinador(a) de Logística y Bodega", "texto": "Detecta la necesidad de homologar un proveedor nuevo o de evaluar uno vigente por vencimiento de contrato o ciclo programado."},
      {"id": "a2", "rol": "Coordinador(a) de Logística y Bodega", "texto": "Solicita y verifica la documentación legal y financiera básica del proveedor candidato."},
      {"id": "a3", "rol": "Gerente Regional Comercial / Retail", "texto": "Valida al proveedor estratégico —marca o volumen significativo— antes de avanzar."},
      {"id": "a4", "rol": "Gerente de Contabilidad / Administración", "texto": "Revisa las condiciones comerciales y de pago propuestas."},
      {"id": "a5", "rol": "Coordinador(a) de Logística y Bodega", "texto": "Aplica el scorecard de desempeño al proveedor vigente en su ciclo de evaluación."},
      {"id": "a6", "rol": "Gerente Regional Comercial / Retail", "texto": "Decide la continuidad, renovación o baja del proveedor con base en el scorecard."}
     ],
     "diagrama": {
      "carriles": ["Coordinador(a) de Logística y Bodega", "Gerente Regional Comercial / Retail", "Gerente de Contabilidad / Administración", "Planificador Financiero"],
      "nodos": [
       {"id": "n0", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "inicio", "n": "Detectar necesidad de homologación o de evaluación"},
       {"id": "n1", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "tarea", "n": "Solicitar y verificar documentación legal y financiera"},
       {"id": "n2", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "decision", "n": "¿Proveedor estratégico?"},
       {"id": "n2alt", "carril": "Gerente Regional Comercial / Retail", "tipo": "tarea", "n": "Validar al proveedor estratégico"},
       {"id": "n3", "carril": "Gerente de Contabilidad / Administración", "tipo": "tarea", "n": "Revisar condiciones comerciales y de pago"},
       {"id": "n4", "carril": "Planificador Financiero", "tipo": "tarea", "n": "Validar impacto presupuestario del contrato"},
       {"id": "n5", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "tarea", "n": "Aplicar scorecard de desempeño en el ciclo de evaluación"},
       {"id": "n6", "carril": "Gerente Regional Comercial / Retail", "tipo": "tarea", "n": "Decidir continuidad, renovación o baja del proveedor"},
       {"id": "n7", "carril": "Gerente Regional Comercial / Retail", "tipo": "fin", "n": "Proveedor homologado o evaluado, con decisión documentada"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n2alt", "etq": "Sí"}, {"de": "n2", "a": "n3", "etq": "No"},
       {"de": "n2alt", "a": "n3"}, {"de": "n3", "a": "n4"}, {"de": "n4", "a": "n5"}, {"de": "n5", "a": "n6"}, {"de": "n6", "a": "n7"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Sin homologación previa a la fecha", "Los proveedores actuales nunca pasaron por un proceso de homologación formal.", "Alta", "Alto", "Priorizar la homologación retroactiva de los proveedores críticos."],
      ["Mono-proveedor de firmware Cubitt sin evaluación de riesgo", "Un solo proveedor de firmware para la marca propia, sin plan de contingencia.", "Alta", "Alto", "Evaluar y calificar un segundo proveedor de firmware."],
      ["Scorecard sin criterios definidos", "No hay criterios de evaluación documentados para aplicar el primer scorecard.", "Media", "Medio", "Definir los criterios de evaluación antes de aplicar el primer scorecard."],
      ["Decisión de baja sin plan de transición", "Dar de baja a un proveedor sin un plan de transición al reemplazo puede interrumpir el suministro.", "Media", "Alto", "Exigir plan de transición a un nuevo proveedor antes de dar de baja al vigente."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Proveedores críticos homologados", "Homologados ÷ total de proveedores críticos identificados", "Trimestral", "Coordinador(a) de Logística y Bodega", "100% de los críticos"],
      ["Proveedores evaluados en el ciclo semestral", "Evaluados ÷ total de proveedores vigentes", "Semestral", "Coordinador(a) de Logística y Bodega", "100%"],
      ["Tiempo de homologación de un proveedor nuevo", "Fecha de aprobación − fecha de solicitud", "Por caso", "Coordinador(a) de Logística y Bodega", "Referencia a definir con el primer ciclo"]
     ]
    }
   },

   "6.3": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre la recepción de la cuota o allocation mensual que confirma la casa matriz de Casio, la validación de cantidades por país, la confirmación de la orden y su seguimiento hasta el arribo al hub de Kenex Panamá — incluida la reconciliación mensual (PCI) entre lo pedido, lo confirmado y lo vendido. No incluye la reposición desde el hub hacia cada país (proceso 6.6) ni hacia el punto de venta (proceso 6.7), que parten de la mercancía ya recibida aquí."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Gerente Regional Comercial / Retail", "texto": "Recibe la comunicación mensual de casa matriz Casio con la cuota o allocation asignada por país."},
      {"id": "a2", "rol": "Analista/Ejecutivo(a) Comercial (KAM Casio)", "texto": "Valida las cantidades asignadas contra lo solicitado y contra la venta reciente por país."},
      {"id": "a3", "rol": "Gerente Regional Comercial / Retail", "texto": "Confirma la orden de compra con la cuota efectivamente asignada."},
      {"id": "a4", "rol": "Coordinador(a) de Logística y Bodega", "texto": "Da seguimiento a la orden hasta su arribo al hub de Kenex Panamá."},
      {"id": "a5", "rol": "Analista/Ejecutivo(a) Comercial (KAM Casio)", "texto": "Actualiza el «archivo de compras» con lo confirmado por Casio en el mes."},
      {"id": "a6", "rol": "Gerente Regional Comercial / Retail", "texto": "Reconcilia mensualmente lo pedido, lo confirmado y la venta real por país en el reporte PCI."}
     ],
     "diagrama": {
      "carriles": ["Gerente Regional Comercial / Retail", "Analista/Ejecutivo(a) Comercial (KAM Casio)", "Coordinador(a) de Logística y Bodega"],
      "nodos": [
       {"id": "n0", "carril": "Gerente Regional Comercial / Retail", "tipo": "inicio", "n": "Recibir la asignación mensual de cuota Casio"},
       {"id": "n1", "carril": "Analista/Ejecutivo(a) Comercial (KAM Casio)", "tipo": "tarea", "n": "Validar cantidades asignadas contra lo solicitado y la venta reciente", "sistemas": ["\"Archivo de compras\" (Excel)"]},
       {"id": "n2", "carril": "Analista/Ejecutivo(a) Comercial (KAM Casio)", "tipo": "decision", "n": "¿Allocation cubre lo solicitado?"},
       {"id": "n2alt", "carril": "Gerente Regional Comercial / Retail", "tipo": "tarea", "n": "Priorizar países y SKU con la cuota reducida"},
       {"id": "n3", "carril": "Gerente Regional Comercial / Retail", "tipo": "tarea", "n": "Confirmar la orden de compra"},
       {"id": "n4", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "tarea", "n": "Dar seguimiento a la orden hasta el hub de Panamá"},
       {"id": "n5", "carril": "Analista/Ejecutivo(a) Comercial (KAM Casio)", "tipo": "tarea", "n": "Actualizar el archivo de compras con lo confirmado"},
       {"id": "n6", "carril": "Gerente Regional Comercial / Retail", "tipo": "tarea", "n": "Reconciliar el reporte PCI: pedido, confirmado y venta real"},
       {"id": "n7", "carril": "Gerente Regional Comercial / Retail", "tipo": "fin", "n": "Orden Casio recibida en el hub y PCI reconciliado"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n3", "etq": "Sí"}, {"de": "n2", "a": "n2alt", "etq": "No"},
       {"de": "n2alt", "a": "n3"}, {"de": "n3", "a": "n4"}, {"de": "n4", "a": "n5"}, {"de": "n5", "a": "n6"}, {"de": "n6", "a": "n7"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Allocation confirmada muy por debajo de lo solicitado", "En meses recientes, la casa matriz ha confirmado solo una fracción menor de la cuota pedida.", "Alta", "Alto", "Escalar a casa matriz con antelación y ajustar el plan de venta por país ante una reducción sostenida."],
      ["Reconciliación PCI enteramente manual y en una sola persona", "El cruce mensual entre pedido, confirmado y venta real depende de una sola persona.", "Alta", "Alto", "Documentar el método de reconciliación y formar un respaldo."],
      ["Priorización entre países sin criterio escrito ante escasez", "Cuando la cuota no cubre lo solicitado, la prioridad entre países se decide caso por caso.", "Media", "Alto", "Definir un criterio de priorización (por venta real o por compromiso ya firmado) antes de la próxima reducción."],
      ["Seguimiento del pedido hasta el hub sin visibilidad de contenedor", "No siempre se sabe si el pedido cupo completo en el envío hasta que llega o no llega.", "Media", "Medio", "Reportar sistemáticamente si el pedido no cabe completo en el envío (ver también proceso 6.6)."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Cumplimiento de la cuota confirmada", "Cuota confirmada ÷ cuota solicitada", "Mensual", "Gerente Regional Comercial / Retail", "Seguimiento de tendencia"],
      ["Tiempo de reconciliación PCI", "Días desde el cierre de mes hasta el reporte PCI cerrado", "Mensual", "Analista/Ejecutivo(a) Comercial (KAM Casio)", "≤5 días hábiles"],
      ["Órdenes Casio recibidas en el hub dentro de la ventana esperada", "Recibidas a tiempo ÷ total de órdenes del mes", "Mensual", "Coordinador(a) de Logística y Bodega", "≥90%"]
     ]
    }
   },

   "6.4": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre la decisión del comité informal de compras Cubitt ante una necesidad de lanzamiento o de cobertura, el sourcing con la fábrica en China, la gestión de muestras, la decisión de envío aéreo o marítimo, y la confirmación de la orden. No incluye la producción física en fábrica ni el desarrollo del producto en sí (macro 3, R&D y Desarrollo de Producto — Cubitt), que es anterior a este proceso."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Gerente Regional de Marketing", "texto": "Detecta la necesidad de compra: nuevo lanzamiento, cobertura crítica u oportunidad comercial."},
      {"id": "a2", "rol": "Director(a) Ventas Regional Cubitt", "texto": "Revisa la necesidad en el comité informal y decide avanzar con la fábrica seleccionada."},
      {"id": "a3", "rol": "Sourcing en China", "texto": "Coordina con la fábrica el sourcing, las muestras y el costo del lote."},
      {"id": "a4", "rol": "Gerente Regional de Marketing", "texto": "Aprueba la muestra y decide el modo de envío —aéreo o marítimo— según la urgencia."},
      {"id": "a5", "rol": "Gerente Regional de Marketing", "texto": "Confirma la orden de compra Cubitt con la fábrica y el modo de envío decidido."},
      {"id": "a6", "rol": "Coordinador(a) de Logística y Bodega", "texto": "Da seguimiento a la orden en producción y en tránsito hasta el hub de Kenex Panamá."}
     ],
     "diagrama": {
      "carriles": ["Gerente Regional de Marketing", "Director(a) Ventas Regional Cubitt", "Sourcing en China", "Coordinador(a) de Logística y Bodega"],
      "nodos": [
       {"id": "n0", "carril": "Gerente Regional de Marketing", "tipo": "inicio", "n": "Detectar necesidad de compra Cubitt"},
       {"id": "n1", "carril": "Director(a) Ventas Regional Cubitt", "tipo": "tarea", "n": "Revisar la necesidad en el comité informal"},
       {"id": "n2", "carril": "Director(a) Ventas Regional Cubitt", "tipo": "decision", "n": "¿El comité decide avanzar con la fábrica?"},
       {"id": "n2alt", "carril": "Director(a) Ventas Regional Cubitt", "tipo": "tarea", "n": "Descartar o posponer la necesidad"},
       {"id": "n3", "carril": "Sourcing en China", "tipo": "tarea", "n": "Coordinar sourcing y muestras con la fábrica"},
       {"id": "n4", "carril": "Gerente Regional de Marketing", "tipo": "tarea", "n": "Aprobar muestra y decidir modo de envío"},
       {"id": "n5", "carril": "Gerente Regional de Marketing", "tipo": "tarea", "n": "Confirmar la orden de compra Cubitt"},
       {"id": "n6", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "tarea", "n": "Dar seguimiento en producción y tránsito", "sistemas": ["Lark (tablero de producción/tránsito Cubitt)"]},
       {"id": "n7", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "fin", "n": "Orden Cubitt confirmada y en seguimiento hasta el hub"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n3", "etq": "Sí"}, {"de": "n2", "a": "n2alt", "etq": "No"},
       {"de": "n2alt", "a": "n7"}, {"de": "n3", "a": "n4"}, {"de": "n4", "a": "n5"}, {"de": "n5", "a": "n6"}, {"de": "n6", "a": "n7"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Comité informal sin acta ni criterio de decisión escrito", "La decisión de compra Cubitt se toma en conversación, sin registro ni criterio documentado.", "Media", "Alto", "Documentar el criterio de decisión y la responsabilidad de cada integrante del comité."],
      ["Sourcing concentrado en una sola persona en China", "El enlace de sourcing en fábrica es un solo punto de contacto, sin respaldo.", "Alta", "Alto", "Formar un respaldo o un segundo contacto de sourcing en la fábrica."],
      ["Tablero de tránsito Cubitt muy reciente, sin trayectoria", "El tablero de seguimiento en Lark es de reciente construcción y todavía sin historial de uso.", "Media", "Medio", "Dar seguimiento al tablero por 2-3 ciclos completos antes de tomarlo como fuente única."],
      ["Sin criterio documentado para decidir envío aéreo o marítimo", "La decisión de modo de envío se toma con criterio experto, sin regla escrita de costo/urgencia.", "Media", "Medio", "Documentar el criterio de urgencia y costo ya usado de facto."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Tiempo de ciclo de compra Cubitt", "Fecha de confirmación − fecha de detección de la necesidad", "Por orden", "Gerente Regional de Marketing", "Referencia de seguimiento"],
      ["Órdenes Cubitt con seguimiento activo en el tablero", "Órdenes en el tablero ÷ total de órdenes en curso", "Semanal", "Coordinador(a) de Logística y Bodega", "100%"],
      ["Proporción de envío aéreo vs. marítimo", "Envíos aéreos ÷ total de envíos del período", "Mensual", "Gerente Regional de Marketing", "Referencia de costo y urgencia"]
     ]
    }
   },

   "6.5": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre la detección de una necesidad puntual o de urgencia en el país que el hub regional no puede cubrir a tiempo, su aprobación local y el registro de la orden en el ERP del país. No incluye la compra internacional que normalmente cubre esa necesidad (procesos 6.3 y 6.4), de la que esta compra local es la excepción, no la regla."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Asistente Administrativo(a) / Servicios Generales", "texto": "Detecta la necesidad puntual o de urgencia no cubierta a tiempo por el hub regional."},
      {"id": "a2", "rol": "Asistente Administrativo(a) / Servicios Generales", "texto": "Identifica el proveedor local disponible y cotiza."},
      {"id": "a3", "rol": "Country Manager", "texto": "Aprueba la compra local dentro del criterio del país."},
      {"id": "a4", "rol": "Asistente Administrativo(a) / Servicios Generales", "texto": "Registra la orden de compra en el ERP local."},
      {"id": "a5", "rol": "Coordinador(a) de Logística y Bodega", "texto": "Da visibilidad regional a la compra local registrada, para el consolidado del país."}
     ],
     "diagrama": {
      "carriles": ["Asistente Administrativo(a) / Servicios Generales", "Country Manager", "Coordinador(a) de Logística y Bodega"],
      "nodos": [
       {"id": "n0", "carril": "Asistente Administrativo(a) / Servicios Generales", "tipo": "inicio", "n": "Detectar necesidad puntual o de urgencia en el país"},
       {"id": "n1", "carril": "Asistente Administrativo(a) / Servicios Generales", "tipo": "tarea", "n": "Identificar proveedor local disponible y cotizar"},
       {"id": "n2", "carril": "Country Manager", "tipo": "tarea", "n": "Aprobar la compra local"},
       {"id": "n3", "carril": "Country Manager", "tipo": "decision", "n": "¿Compra aprobada?"},
       {"id": "n3alt", "carril": "Asistente Administrativo(a) / Servicios Generales", "tipo": "tarea", "n": "Buscar proveedor alternativo o posponer la compra"},
       {"id": "n4", "carril": "Asistente Administrativo(a) / Servicios Generales", "tipo": "tarea", "n": "Registrar la orden en el ERP local", "sistemas": ["Odoo (ERP)"]},
       {"id": "n5", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "tarea", "n": "Dar visibilidad regional a la compra local"},
       {"id": "n6", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "fin", "n": "Compra local registrada y visible para el consolidado regional"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n3"}, {"de": "n3", "a": "n4", "etq": "Sí"}, {"de": "n3", "a": "n3alt", "etq": "No"},
       {"de": "n3alt", "a": "n1"}, {"de": "n4", "a": "n5"}, {"de": "n5", "a": "n6"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Sin visibilidad regional consolidada de la compra local", "Cada país compra localmente sin un reporte que la región pueda ver en conjunto.", "Media", "Medio", "Definir un reporte mínimo mensual de compra local por país."],
      ["Sin umbral definido de cuándo recurrir a compra local", "No hay un monto o criterio escrito que delimite la excepción frente al hub regional.", "Media", "Medio", "Definir el criterio y el monto máximo de la excepción."],
      ["Dependencia de un solo proveedor local por país", "Cada país suele tener un único proveedor local de confianza para la urgencia.", "Media", "Alto", "Calificar un segundo proveedor local de respaldo por país."],
      ["Compra local usada para cubrir una falla recurrente del hub, no una excepción real", "Si se repite con frecuencia en el mismo SKU, deja de ser una excepción.", "Baja", "Medio", "Monitorear la frecuencia de compra local por país como señal de alerta."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Compras locales de urgencia por país y por mes", "Conteo de órdenes de compra local por país", "Mensual", "Coordinador(a) de Logística y Bodega", "Referencia de seguimiento"],
      ["Monto de compra local ÷ monto de compra internacional del país", "Proporción sobre el total de compra del país", "Mensual", "Planificador Financiero", "Mantenerlo bajo — referencia de tendencia"],
      ["Tiempo de aprobación de la compra local", "Fecha de aprobación − fecha de solicitud", "Por caso", "Country Manager", "Mismo día"]
     ]
    }
   },

   "6.6": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre el armado del pedido de reposición mensual del país contra la disponibilidad del hub de Kenex Panamá, la validación operativa local, la aprobación de cantidades finales y la transferencia a Logística para preparación y despacho. No incluye la preparación física del pedido en bodega ni su despacho (macro 7, Logística y Operaciones), que empieza donde este proceso termina."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Coordinador(a) de Logística y Bodega", "texto": "Inicia el ciclo mensual de reposición del país con base en el sugerido de Power BI."},
      {"id": "a2", "rol": "Coordinador(a) de Logística y Bodega", "texto": "Valida operativamente el pedido contra la disponibilidad real del hub de Panamá."},
      {"id": "a3", "rol": "Gerente Regional Comercial / Retail", "texto": "Aprueba las cantidades finales de reposición."},
      {"id": "a4", "rol": "Coordinador(a) Comercial", "texto": "Realiza el handoff del pedido aprobado a Logística."},
      {"id": "a5", "rol": "Coordinador(a) de Logística y Bodega", "texto": "Da seguimiento al despacho hasta la confirmación de recepción en el país."}
     ],
     "diagrama": {
      "carriles": ["Coordinador(a) de Logística y Bodega", "Gerente Regional Comercial / Retail", "Coordinador(a) Comercial"],
      "nodos": [
       {"id": "n0", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "inicio", "n": "Iniciar el ciclo mensual de reposición del país"},
       {"id": "n1", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "tarea", "n": "Armar el pedido con base en el sugerido", "sistemas": ["Módulo de sugerido (Power BI)"]},
       {"id": "n2", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "tarea", "n": "Validar el pedido contra la disponibilidad real del hub"},
       {"id": "n3", "carril": "Gerente Regional Comercial / Retail", "tipo": "decision", "n": "¿Cantidades finales aprobadas?"},
       {"id": "n3alt", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "tarea", "n": "Ajustar el pedido y re-validar contra disponibilidad"},
       {"id": "n4", "carril": "Coordinador(a) Comercial", "tipo": "tarea", "n": "Realizar el handoff del pedido a Logística", "sistemas": ["Lark (self-report)"]},
       {"id": "n5", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "tarea", "n": "Dar seguimiento hasta la confirmación de recepción en el país"},
       {"id": "n6", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "fin", "n": "Pedido inter-compañía despachado y recibido en el país"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n3"}, {"de": "n3", "a": "n4", "etq": "Sí"}, {"de": "n3", "a": "n3alt", "etq": "No"},
       {"de": "n3alt", "a": "n2"}, {"de": "n4", "a": "n5"}, {"de": "n5", "a": "n6"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Ajuste por capacidad de contenedor sin reporte sistemático", "Cuando un pedido no cabe completo en el contenedor, hoy no se reporta de forma sistemática; se descubre al no llegar o por discrepancia de aduana.", "Alta", "Alto", "Documentar y reportar sistemáticamente el ajuste por capacidad de contenedor antes del zarpe."],
      ["Aprobación de cantidades finales concentrada en una persona", "La aprobación final de cada ciclo mensual depende de un solo responsable comercial.", "Media", "Alto", "Documentar el criterio de aprobación y formar un respaldo."],
      ["Discrepancias de aduana o faltantes descubiertos tarde", "La lista de empaque no siempre se cruza contra lo recibido antes de cerrar el ciclo.", "Media", "Alto", "Cruzar la lista de empaque contra lo recibido antes de cerrar cada ciclo mensual."],
      ["Meta de cobertura inter-compañía sin criterio diferenciado por país", "La meta de cobertura no distingue la rotación real de cada país.", "Baja", "Medio", "Revisar la meta de cobertura por país según su rotación real."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Fill rate del pedido inter-compañía", "Cantidad despachada ÷ cantidad pedida", "Mensual", "Coordinador(a) de Logística y Bodega", "≥90%"],
      ["Pedidos con ajuste por capacidad de contenedor reportado", "Reportados ÷ total de pedidos con ajuste real", "Mensual", "Coordinador(a) de Logística y Bodega", "100%"],
      ["Tiempo de aprobación de cantidades finales", "Fecha de aprobación − fecha de propuesta", "Mensual", "Gerente Regional Comercial / Retail", "≤3 días hábiles"]
     ]
    }
   },

   "6.7": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre el análisis de inventario y venta de tiendas y del mayorista local que hace el planificador de Compras para armar el pedido de reposición, y su transferencia a Logística local para despacho. Es la cara analítica de este ciclo; el ajuste por capacidad del punto, la aprobación comercial y la recepción en tienda están documentados como parte de Ventas Retail (proceso 9.3, Reposición de tiendas y kioscos) — evitar duplicar contenido entre ambos: aquí se documenta cómo se construye el pedido, allá cómo se ajusta, aprueba y recibe."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Coordinador(a) de Logística y Bodega", "texto": "Ejecuta semanalmente la clasificación Pareto A/B/C por velocidad de venta de cada tienda."},
      {"id": "a2", "rol": "Coordinador(a) de Logística y Bodega", "texto": "Calcula la cobertura de cada SKU contra la meta objetivo y marca con bandera amarilla la cobertura crítica (menos de dos semanas)."},
      {"id": "a3", "rol": "Supervisor de Ventas", "texto": "Revisa las banderas amarillas de su zona y confirma la necesidad real en el punto."},
      {"id": "a4", "rol": "Analista/Ejecutivo(a) Comercial (Mayor)", "texto": "Evalúa la necesidad de reposición del mayorista local por evento."},
      {"id": "a5", "rol": "Coordinador(a) de Logística y Bodega", "texto": "Consolida el pedido de reposición y lo transfiere a Logística local para despacho."}
     ],
     "diagrama": {
      "carriles": ["Coordinador(a) de Logística y Bodega", "Supervisor de Ventas", "Analista/Ejecutivo(a) Comercial (Mayor)"],
      "nodos": [
       {"id": "n0", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "inicio", "n": "Ciclo semanal de reposición de tiendas / alerta de cobertura crítica"},
       {"id": "n1", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "tarea", "n": "Ejecutar clasificación Pareto A/B/C por tienda", "sistemas": ["Odoo (ERP)"]},
       {"id": "n2", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "tarea", "n": "Calcular cobertura por SKU y marcar bandera amarilla"},
       {"id": "n3", "carril": "Supervisor de Ventas", "tipo": "tarea", "n": "Revisar bandera amarilla de la zona y confirmar necesidad real"},
       {"id": "n4", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "decision", "n": "¿Aplica también reposición al mayorista local?"},
       {"id": "n4alt", "carril": "Analista/Ejecutivo(a) Comercial (Mayor)", "tipo": "tarea", "n": "Evaluar necesidad de reposición del mayorista por evento"},
       {"id": "n5", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "tarea", "n": "Consolidar el pedido de reposición al punto de venta"},
       {"id": "n6", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "fin", "n": "Pedido de reposición transferido a Logística local"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n3"}, {"de": "n3", "a": "n4"}, {"de": "n4", "a": "n4alt", "etq": "Sí"}, {"de": "n4", "a": "n5", "etq": "No"},
       {"de": "n4alt", "a": "n5"}, {"de": "n5", "a": "n6"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Montaje de pedidos requiere reimpresión y recarga manual por tienda", "Aunque el sistema soporta la carga directa, hoy se imprime y se vuelve a cargar la plantilla por punto de venta.", "Media", "Medio", "Evaluar la automatización directa que el sistema ya soporta en teoría."],
      ["Meta de cobertura regional fijada sin considerar capacidad física del kiosco", "Un mandato de cobertura uniforme resultó imposible para los puntos más pequeños y está en renegociación.", "Alta", "Alto", "Ajustar la meta de cobertura por tipo de punto de venta (se cruza con el proceso 9.3 de Ventas Retail)."],
      ["Clasificación Pareto no revisada periódicamente", "El ranking de SKU por velocidad de venta puede quedar desactualizado si no se revisa con regularidad.", "Baja", "Medio", "Revisar la clasificación Pareto al menos trimestralmente."],
      ["Reposición de mayorista local por evento, sin calendario ni criterio escrito", "La activación de reposición al mayorista depende de que alguien la solicite, sin calendario propio.", "Media", "Medio", "Documentar el criterio de activación de reposición al mayorista."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Tiendas con bandera amarilla resuelta antes de quiebre", "Resueltas a tiempo ÷ total de tiendas con bandera en el período", "Semanal", "Coordinador(a) de Logística y Bodega", "≥90%"],
      ["Fill rate del pedido a punto de venta", "Cantidad despachada ÷ cantidad pedida", "Semanal", "Coordinador(a) de Logística y Bodega", "≥90%"],
      ["Cobertura promedio por clase Pareto (A/B/C)", "Inventario disponible ÷ venta promedio, por clase", "Semanal", "Coordinador(a) de Logística y Bodega", "Meta diferenciada por clase"]
     ]
    }
   },

   "6.8": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre la política de compras, la matriz de aprobación por monto y tipo, el tablero de KPI del área y la gestión de riesgo de la cadena de suministro que deberían gobernar de forma transversal el resto de los procesos de este macroproceso. No incluye la ejecución operativa de ninguna compra en particular (procesos 6.1 a 6.7 y 6.9), sobre los que esta capa aplica.",
     "nota_estado": "Este proceso es «to-be»: hoy no existe un departamento de compras formalmente estructurado, ni política escrita, ni matriz de aprobación, ni KPI formalizados. Se documenta con base en buena práctica de la disciplina de compras (CIPS) como referencia para construirlo, no como descripción de lo que ya opera."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Gerente Regional Comercial / Retail", "texto": "Define y aprueba la política de compras y la matriz de aprobación por monto y tipo."},
      {"id": "a2", "rol": "Coordinador(a) de Logística y Bodega", "texto": "Aplica la matriz de aprobación en la operación diaria de compra y reposición."},
      {"id": "a3", "rol": "Planificador Financiero", "texto": "Alimenta el tablero de KPI de compras con los indicadores de cada proceso."},
      {"id": "a4", "rol": "Gerente de Contabilidad / Administración", "texto": "Revisa el cumplimiento de la política en la auditoría interna, cuando aplica."},
      {"id": "a5", "rol": "Gerente Regional Comercial / Retail", "texto": "Revisa trimestralmente la política y el tablero de KPI, y decide ajustes."}
     ],
     "diagrama": {
      "carriles": ["Gerente Regional Comercial / Retail", "Coordinador(a) de Logística y Bodega", "Planificador Financiero", "Gerente de Contabilidad / Administración"],
      "nodos": [
       {"id": "n0", "carril": "Gerente Regional Comercial / Retail", "tipo": "inicio", "n": "Revisión trimestral programada de gobierno de compras"},
       {"id": "n1", "carril": "Gerente Regional Comercial / Retail", "tipo": "tarea", "n": "Definir o actualizar política de compras y matriz de aprobación"},
       {"id": "n2", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "tarea", "n": "Aplicar la matriz de aprobación en la operación diaria"},
       {"id": "n3", "carril": "Planificador Financiero", "tipo": "tarea", "n": "Alimentar el tablero de KPI de compras"},
       {"id": "n4", "carril": "Gerente de Contabilidad / Administración", "tipo": "tarea", "n": "Revisar cumplimiento en auditoría interna cuando aplica"},
       {"id": "n5", "carril": "Gerente Regional Comercial / Retail", "tipo": "decision", "n": "¿Política o KPI requieren ajuste?"},
       {"id": "n5alt", "carril": "Gerente Regional Comercial / Retail", "tipo": "tarea", "n": "Ajustar política, matriz o KPI"},
       {"id": "n6", "carril": "Gerente Regional Comercial / Retail", "tipo": "fin", "n": "Gobierno de compras vigente para el próximo trimestre"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n3"}, {"de": "n3", "a": "n4"}, {"de": "n4", "a": "n5"},
       {"de": "n5", "a": "n5alt", "etq": "Sí"}, {"de": "n5", "a": "n6", "etq": "No"}, {"de": "n5alt", "a": "n6"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Ausencia total de política escrita hoy", "No existe una política de compras documentada en la organización.", "Alta", "Alto", "Documentar primero la matriz de aprobación, que es lo más urgente y lo más citado en las entrevistas."],
      ["Sin KPI formalizados de compras", "No hay un tablero ni un set mínimo de indicadores definidos para el área.", "Alta", "Medio", "Definir un set mínimo de KPI (allocation, fill rate, tiempo de ciclo) antes de construir el tablero completo."],
      ["Sin estructura de departamento de compras", "La compra internacional de cada marca depende de una sola persona, sin equipo ni backup formal.", "Alta", "Alto", "Decidir primero el modelo mínimo de estructura, aunque sea una sola persona con respaldo, antes de la política completa."],
      ["Riesgo de la cadena de suministro no mapeado formalmente", "Los riesgos ya identificados (mono-proveedor, allocation, capacidad de contenedor) no están consolidados en un solo mapa de riesgo.", "Media", "Alto", "Mapear los riesgos ya identificados de facto como primer inventario de riesgo del área."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["Política de compras documentada y aprobada", "Sí/no, verificado contra el documento vigente", "Una vez; luego trimestral", "Gerente Regional Comercial / Retail", "Documentada en el primer ciclo"],
      ["Compras aplicando la matriz de aprobación", "Compras bajo matriz ÷ total de compras del período", "Trimestral", "Coordinador(a) de Logística y Bodega", "100% una vez vigente"],
      ["KPI de compras publicados en el tablero", "KPI activos ÷ KPI definidos", "Trimestral", "Planificador Financiero", "100%"]
     ]
    }
   },

   "6.9": {
    "proposito": {
     "estado": "borrador",
     "texto": "Cubre la detección de un defecto o discrepancia en la mercancía recibida, la apertura del reclamo con el proveedor, su seguimiento y la recuperación del costo o de la mercancía correspondiente. No incluye la garantía o el servicio postventa al cliente final (proceso 9.13 de Ventas Retail; macro 11, Postventa y Experiencia de Cliente), que es un reclamo distinto: del cliente hacia Kenex, no de Kenex hacia el proveedor.",
     "nota_estado": "Este proceso es «to-be»: hoy no hay política de devoluciones a proveedor, y hay devoluciones acumuladas sin resolver mientras los defectos de Cubitt no quedan trazados. Se documenta con base en buena práctica (CIPS/APQC PCF) para cerrar esa brecha."
    },
    "dueno": {"estado": "borrador"},
    "disparador": {"estado": "borrador"},
    "flujo": {
     "estado": "borrador",
     "actividades": [
      {"id": "a1", "rol": "Coordinador(a) de Logística y Bodega", "texto": "Detecta el defecto o discrepancia en la recepción, o lo recibe reportado desde la operación."},
      {"id": "a2", "rol": "Coordinador(a) de Logística y Bodega", "texto": "Documenta la no conformidad (NCR) con evidencia: fotos, cantidades y referencia del lote."},
      {"id": "a3", "rol": "Director(a) responsable de la marca", "texto": "Da soporte a la apertura del reclamo con el proveedor correspondiente (Casio o fábrica Cubitt)."},
      {"id": "a4", "rol": "Gerente Regional Comercial / Retail", "texto": "Da seguimiento al reclamo con el proveedor hasta su resolución."},
      {"id": "a5", "rol": "Gerente de Contabilidad / Administración", "texto": "Registra la recuperación del costo o de la mercancía una vez resuelto el reclamo."}
     ],
     "diagrama": {
      "carriles": ["Coordinador(a) de Logística y Bodega", "Director(a) responsable de la marca", "Gerente Regional Comercial / Retail", "Gerente de Contabilidad / Administración"],
      "nodos": [
       {"id": "n0", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "inicio", "n": "Detectar defecto o discrepancia en la mercancía recibida"},
       {"id": "n1", "carril": "Coordinador(a) de Logística y Bodega", "tipo": "tarea", "n": "Documentar la no conformidad (NCR) con evidencia"},
       {"id": "n2", "carril": "Director(a) responsable de la marca", "tipo": "tarea", "n": "Dar soporte a la apertura del reclamo con el proveedor"},
       {"id": "n3", "carril": "Gerente Regional Comercial / Retail", "tipo": "tarea", "n": "Dar seguimiento al reclamo hasta su resolución"},
       {"id": "n4", "carril": "Gerente Regional Comercial / Retail", "tipo": "decision", "n": "¿El proveedor reconoce el reclamo?"},
       {"id": "n4alt", "carril": "Gerente Regional Comercial / Retail", "tipo": "tarea", "n": "Escalar el reclamo o documentar la pérdida no recuperable"},
       {"id": "n5", "carril": "Gerente de Contabilidad / Administración", "tipo": "tarea", "n": "Registrar la recuperación del costo o de la mercancía"},
       {"id": "n6", "carril": "Gerente de Contabilidad / Administración", "tipo": "fin", "n": "Reclamo cerrado y NCR documentada"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"}, {"de": "n1", "a": "n2"}, {"de": "n2", "a": "n3"}, {"de": "n3", "a": "n4"}, {"de": "n4", "a": "n5", "etq": "Sí"}, {"de": "n4", "a": "n4alt", "etq": "No"},
       {"de": "n4alt", "a": "n6"}, {"de": "n5", "a": "n6"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "filas": [
      ["Devoluciones acumuladas sin política", "Hay devoluciones pendientes acumuladas sin un proceso que las resuelva de forma ordenada.", "Alta", "Alto", "Priorizar el cierre del backlog de devoluciones acumuladas como primer paso."],
      ["Defectos de Cubitt sin trazabilidad", "Los defectos detectados en producto Cubitt no quedan registrados de forma sistemática.", "Alta", "Medio", "Exigir registro de NCR desde la primera detección, aunque sea con una plantilla simple."],
      ["Sin criterio de cuándo escalar un reclamo no reconocido por el proveedor", "No hay un tiempo máximo de espera ni un criterio de escalamiento documentado.", "Media", "Medio", "Definir el criterio y el tiempo máximo de espera antes de escalar un reclamo."],
      ["Recuperación de costo sin proceso contable definido", "No está definido cómo se registra contablemente la recuperación de costo o de mercancía.", "Media", "Medio", "Definir el registro contable de la recuperación de costo o de mercancía."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "filas": [
      ["NCR documentadas sobre defectos detectados", "NCR documentadas ÷ defectos detectados en el período", "Mensual", "Coordinador(a) de Logística y Bodega", "100%"],
      ["Tiempo de resolución del reclamo", "Fecha de cierre − fecha de apertura", "Por caso", "Gerente Regional Comercial / Retail", "Referencia a definir con el primer ciclo"],
      ["Monto recuperado ÷ monto reclamado", "Proporción recuperada sobre el total reclamado en el período", "Trimestral", "Gerente de Contabilidad / Administración", "Referencia de seguimiento"]
     ]
    }
   }

  }
 }
};
