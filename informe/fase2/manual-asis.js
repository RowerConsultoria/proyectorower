// manual-asis.js — versión AS-IS de los procesos de la Fase 2: cómo opera cada
// proceso HOY. Mismo esquema que manual-contenido.js (que es el To-Be), con
// tres reglas propias:
//   1. Cargos actuales: los que usan las entrevistas o la columna de cargo
//      actual del patrón V4 — nunca las denominaciones propuestas del To-Be.
//   2. Sin mejoras: el flujo describe lo que se hace, no lo que convendría.
//      Riesgos e indicadores son los que existen hoy (o constan que faltan).
//   3. Procesos sin dueño formal: se documenta a quien de hecho lo ejecuta,
//      según su propia narrativa.
// Diferencias de esquema con el To-Be: `proposito.alcance` sustituye a la
// ficha del mapa v18 (que ya habla con cargos del To-Be), `nota_version` del
// proceso se pinta bajo la cabecera, y `riesgos`/`indicadores` pueden traer
// `cabecera` propia (el As-Is registra el control de hoy, no una mitigación).
//
// Un proceso aparece aquí => al entrar en él por #/p/<codigo> se ofrece
// elegir entre As-Is (#/asis/<codigo>) y To-Be (#/tobe/<codigo>).
window.MANUAL_ASIS = {
 "6": {
  "procesos": {

   "6.3": {
    "nota_version": "Versión As-Is: describe cómo se compra hoy a la marca representada, con los cargos que usan las propias entrevistas y el patrón V4 en su columna de cargo actual. No incorpora mejoras; donde algo falta, se dice que falta.",
    "proposito": {
     "estado": "borrador",
     "alcance": "Desde que la fábrica envía cada mes su order sheet hasta que el embarque sale hacia la Zona Libre con su orden de compra cargada en Odoo, más el reporte mensual de ventas por país (PCI) que se devuelve a la marca. La recepción física, la nacionalización y la fijación de precios de la mercancía que llega quedan fuera (macro 7 y comercial); el reparto a cada país, en 6.6 y 6.7.",
     "texto": "Hoy la compra a la marca representada no pertenece a un departamento de compras, porque el grupo no tiene uno: la lleva personalmente el socio que dirige la parte comercial, con el apoyo de una analista que le prepara la información. Cada mes la fábrica ofrece lo que tiene disponible, él decide qué y cuánto pedir sobre una hoja de cálculo, la fábrica asigna una fracción de lo pedido, se paga, y él mismo coordina con el agente de carga cuántos contenedores salen y con qué. Nada de esto está escrito: el método vive en la experiencia de quien compra y en el archivo de quien le arma los datos."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Director Comercial y de Compras (socio)",
     "participantes": [
      "Director Comercial y de Compras (socio) — es el único contacto con la fábrica, decide qué y cuánto pedir, envía el pedido, paga, aprueba contenedores y flete y avisa a Logística. Lleva también las ventas junto con la Gerencia de Ventas Internacional, los precios y buena parte de las aprobaciones comerciales, así que la compra compite con todo lo demás.",
      "Analista de Datos e Informes — arma y mantiene el archivo de compras del mes, lleva los prepedidos de un grupo de clientes especiales fuera de la zona natural y prepara el reporte mensual PCI que se envía a la marca.",
      "Data Scientist / Líder de BI — mantiene el módulo de Power BI que produce un sugerido de compra desde hace unos meses, con los parámetros (meses de inventario, tránsito, obsolescencia) que le dio el Director.",
      "Agente de carga (Marlin Logistics, externo) — recibe el contacto con la fábrica, cotiza el flete, arma los contenedores y confirma la salida del embarque.",
      "Gerente de Inventario y Precios (Casiolandia Panamá) — recibe el aviso de salida y carga la orden de compra en Odoo, con la que el tránsito queda visible y empieza a prevenderse.",
      "Grte. de Ope. y Exc. Logística (Casiolandia Panamá) — recibe el mismo aviso de salida para preparar la llegada a la bodega de Zona Libre.",
      "Coordinadora de Planificación de Compras (Rower, Venezuela) — no interviene en el pedido a la fábrica: arma la reposición de Venezuela desde el inventario del hub, y el Director la ajusta según lo que haya. Según la documentación de Lark, da apoyo puntual a la planificación de compras a fábrica, sin contacto con ella.",
      "Brand Manager Casio (Casiolandia Panamá) — recién incorporado; a la fecha de las entrevistas aún no participaba en el pedido, y la intención declarada es que asuma la reportería y los requisitos de la marca."
     ],
     "evidencia": ["E-08", "E-10", "E-05", "E-03", "E-40", "E-70", "Lark: Levantamiento Procesos Compras (VE)"],
     "notas": "Cargos tomados de la columna «cargo actual» del patrón V4 cuando la persona figura en él (Gerente de Inventario y Precios; Grte. de Ope. y Exc. Logística; Coordinadora de Planificación de Compras; Brand Manager Casio). El dueño, la analista y el líder de BI no figuran en el V4: el primero pertenece a la capa de socios, que el patrón no contempla. Para los tres se usa la denominación que dan las propias entrevistas; «director de compras» es como lo nombra otro socio, «aunque en teoría», porque no existe un departamento de compras.",
     "sin_evidencia": "No consta quién ejecuta materialmente el pago a la fábrica (el Director dice «cuando yo pago»; no se sabe si interviene Tesorería). Tampoco hay segundo a bordo: el propio Director lo reconoce, y señala a la analista como la persona que tiene la información, pero no la experiencia de compra."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Llegada del order sheet mensual de la fábrica: la lista de mercancía disponible para pedir. La fábrica no entrega necesariamente lo que se pide: tras el pedido confirma una asignación (allocation) que en los últimos meses ha sido de entre un 20 % y un 30 % de lo solicitado.",
     "cadencia": "Mensual, con calendario fijo que marca la fábrica: se recibe la hoja, se devuelve el pedido, la fábrica confirma lo disponible, hay unos días para agregados y luego se paga; lo pedido llega entre 45 y 60 días después. Las fechas exactas que citan las fuentes no coinciden (hacia el 15 las calculadoras y el 20 los relojes, según quien compra; pedido el 15, confirmación el 17, agregados hasta el 20 y pago el 25, según otro socio).",
     "output": "Pedido colocado y pagado, embarque confirmado por el agente de carga, orden de compra cargada en Odoo y, al mes siguiente, el reporte PCI enviado a la marca.",
     "evidencia": ["E-08", "E-10", "E-05", "E-40"],
     "notas": "El Director prepara una vez al año, entre diciembre y enero, un forecast por marca que envía a Finanzas para el flujo de caja; ese monto guía el volumen, y el detalle de qué modelo pedir se decide mes a mes en este proceso. Siempre hay dos pedidos en tránsito: uno preparándose en Japón y otro en el mar."
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": ["E-08", "E-10", "E-05", "E-03", "E-40", "E-70"],
     "actividades": [
      {"id": "a1", "rol": "Casio (fábrica)", "texto": "Envía el order sheet del mes con la mercancía disponible para pedir."},
      {"id": "a2", "rol": "Data Scientist / Líder de BI", "texto": "Deja en el módulo de Power BI el sugerido de compra del mes."},
      {"id": "a3", "rol": "Analista de Datos e Informes", "texto": "Hacia el día 18 saca de Odoo la «macro» (stock, costos y precios de todas las referencias) y arma un archivo de compras nuevo: venta mes a mes, stock, los dos pedidos en tránsito, el order sheet y el sugerido de Power BI. Empareja a mano los nombres de modelo de la fábrica con los propios, que no coinciden. Le toma un par de horas y lo sigue actualizando todo el mes."},
      {"id": "a4", "rol": "Analista de Datos e Informes", "texto": "Envía el order sheet con precios especiales a dos, tres o cuatro clientes especiales que hacen prepedidos y pagan por anticipado, y carga esos pedidos en el mismo archivo."},
      {"id": "a5", "rol": "Director Comercial y de Compras (socio)", "texto": "Estudia el archivo y le pone cantidad a cada producto, separando lo que se pide por Kenex y lo que se pide por Rower. Se guía por el histórico y corrige a criterio: temporada, lo que asignó la fábrica el mes anterior, meses con venta cero por falta de stock. Le dedica dos o tres días entre el resto de su trabajo, a menudo de noche o en fin de semana, porque hay fecha límite."},
      {"id": "a6", "rol": "Director Comercial y de Compras (socio)", "texto": "Envía el pedido a la fábrica antes del cierre."},
      {"id": "a7", "rol": "Casio (fábrica)", "texto": "Confirma lo que asigna del pedido."},
      {"id": "a8", "rol": "Director Comercial y de Compras (socio)", "texto": "Si lo asignado no cubre lo pedido, agrega dentro de la ventana que da la fábrica o lo compensa pidiendo de más el mes siguiente."},
      {"id": "a9", "rol": "Director Comercial y de Compras (socio)", "texto": "Paga a la fábrica en la fecha del calendario."},
      {"id": "a10", "rol": "Director Comercial y de Compras (socio)", "texto": "Unos diez días después del pago pone en contacto a la fábrica con el agente de carga y le indica cuántos contenedores son ese mes."},
      {"id": "a11", "rol": "Agente de carga (Marlin Logistics)", "texto": "Envía la cotización del flete y el shipping advice con la mercancía de cada contenedor."},
      {"id": "a12", "rol": "Director Comercial y de Compras (socio)", "texto": "Revisa y aprueba cuántos contenedores salen y qué lleva cada uno, cuidando que ninguno salga con tan poco valor que el flete pese sobre el costo."},
      {"id": "a13", "rol": "Agente de carga (Marlin Logistics)", "texto": "Confirma la salida de los contenedores."},
      {"id": "a14", "rol": "Director Comercial y de Compras (socio)", "texto": "Reenvía ese correo a la Gerente de Inventario y Precios y al Grte. de Ope. y Exc. Logística, que así saben la fecha estimada de llegada. A partir de ahí se desentiende hasta que le avisan que llegaron los contenedores."},
      {"id": "a15", "rol": "Gerente de Inventario y Precios", "texto": "Carga en Odoo la orden de compra del embarque. Desde ese momento el tránsito es visible y los vendedores empiezan a prevenderlo; al recibirse, se amarran esas preventas."},
      {"id": "a16", "rol": "Analista de Datos e Informes", "texto": "En los primeros diez días del mes siguiente arma desde Odoo el reporte PCI de relojes, calculadoras y teclados para la marca, cuadrando a mano lo vendido por país con lo comprado por cada entidad."}
     ],
     "diagrama": {
      "carriles": ["Casio (fábrica)", "Data Scientist / Líder de BI", "Analista de Datos e Informes", "Director Comercial y de Compras (socio)", "Agente de carga (Marlin Logistics)", "Gerente de Inventario y Precios"],
      "nodos": [
       {"id": "n0", "carril": "Casio (fábrica)", "tipo": "inicio", "n": "Llega el order sheet del mes"},
       {"id": "n1", "carril": "Data Scientist / Líder de BI", "tipo": "tarea", "n": "Dejar el sugerido de compra", "sistemas": ["Power BI"]},
       {"id": "n2", "carril": "Analista de Datos e Informes", "tipo": "tarea", "n": "Armar el archivo de compras desde la macro", "sistemas": ["Odoo", "Excel"]},
       {"id": "n3", "carril": "Analista de Datos e Informes", "tipo": "tarea", "n": "Cargar prepedidos de clientes especiales", "sistemas": ["Excel"]},
       {"id": "n4", "carril": "Director Comercial y de Compras (socio)", "tipo": "tarea", "n": "Poner cantidad por producto y entidad", "sistemas": ["Excel"]},
       {"id": "n5", "carril": "Director Comercial y de Compras (socio)", "tipo": "tarea", "n": "Enviar el pedido antes del cierre"},
       {"id": "n6", "carril": "Casio (fábrica)", "tipo": "tarea", "n": "Confirmar lo asignado"},
       {"id": "n7", "carril": "Director Comercial y de Compras (socio)", "tipo": "decision", "n": "¿Cubre lo pedido?"},
       {"id": "n7alt", "carril": "Director Comercial y de Compras (socio)", "tipo": "tarea", "n": "Agregar o compensar el mes siguiente"},
       {"id": "n8", "carril": "Director Comercial y de Compras (socio)", "tipo": "tarea", "n": "Pagar a la fábrica"},
       {"id": "n9", "carril": "Director Comercial y de Compras (socio)", "tipo": "tarea", "n": "Conectar fábrica y agente de carga", "sistemas": ["Correo"]},
       {"id": "n10", "carril": "Agente de carga (Marlin Logistics)", "tipo": "tarea", "n": "Cotizar flete y armar contenedores"},
       {"id": "n11", "carril": "Director Comercial y de Compras (socio)", "tipo": "decision", "n": "¿Contenedores aceptables?"},
       {"id": "n11alt", "carril": "Agente de carga (Marlin Logistics)", "tipo": "tarea", "n": "Recomponer los contenedores"},
       {"id": "n12", "carril": "Agente de carga (Marlin Logistics)", "tipo": "tarea", "n": "Confirmar la salida"},
       {"id": "n13", "carril": "Director Comercial y de Compras (socio)", "tipo": "tarea", "n": "Reenviar el aviso a Inventario y Operaciones", "sistemas": ["Correo"]},
       {"id": "n14", "carril": "Gerente de Inventario y Precios", "tipo": "tarea", "n": "Cargar la orden de compra", "sistemas": ["Odoo"]},
       {"id": "n15", "carril": "Analista de Datos e Informes", "tipo": "tarea", "n": "Armar el reporte PCI del mes", "sistemas": ["Odoo", "Excel"]},
       {"id": "n16", "carril": "Analista de Datos e Informes", "tipo": "fin", "n": "Pedido en tránsito y ventas reportadas"}
      ],
      "aristas": [
       {"de": "n0", "a": "n1"},
       {"de": "n0", "a": "n3"},
       {"de": "n1", "a": "n2"},
       {"de": "n2", "a": "n4"},
       {"de": "n3", "a": "n4"},
       {"de": "n4", "a": "n5"},
       {"de": "n5", "a": "n6"},
       {"de": "n6", "a": "n7"},
       {"de": "n7", "a": "n8", "etq": "Sí"},
       {"de": "n7", "a": "n7alt", "etq": "No"},
       {"de": "n7alt", "a": "n8"},
       {"de": "n8", "a": "n9"},
       {"de": "n9", "a": "n10"},
       {"de": "n10", "a": "n11"},
       {"de": "n11", "a": "n12", "etq": "Sí"},
       {"de": "n11", "a": "n11alt", "etq": "No"},
       {"de": "n11alt", "a": "n12"},
       {"de": "n12", "a": "n13"},
       {"de": "n13", "a": "n14"},
       {"de": "n14", "a": "n15"},
       {"de": "n15", "a": "n16"}
      ]
     }
    },
    "riesgos": {
     "estado": "borrador",
     "evidencia": ["E-08", "E-10", "E-05", "E-40", "Lark: Levantamiento Procesos Compras (VE)"],
     "cabecera": ["Riesgo", "Cómo se manifiesta hoy", "Probabilidad", "Impacto", "Control existente hoy"],
     "filas": [
      ["La compra depende de una sola persona", "Quien compra es el único contacto con la fábrica y quien decide, paga y aprueba el flete. Él mismo lo dice: si le pasara algo, esta compra es lo que quedaría en el aire.", "Alta", "Alto", "Ninguno formal. La analista tiene toda la información y «podría hacerlo», pero no tiene la experiencia de compra."],
      ["La compra compite con la agenda del Director", "Dedica dos o tres días al mes a la compra, entre viajes, reuniones, aprobaciones y la relación semanal con la marca; la termina de noche o en fin de semana. Él mismo admite que por falta de tiempo no puede analizar a fondo y a veces se decide rápido.", "Alta", "Medio", "La fecha límite de la fábrica: el pedido sale, aunque sea con menos análisis."],
      ["La asignación de la fábrica no se puede prever", "En los últimos meses la fábrica ha asignado entre un 20 % y un 30 % de lo pedido. La respuesta es pedir de más y compensar al mes siguiente, lo que deja la cantidad final en manos de la fábrica y del criterio del Director.", "Alta", "Alto", "El criterio del Director, que ajusta el pedido según lo asignado antes. Ningún sistema registra esa lógica."],
      ["Nada está documentado", "Ni la compra ni el archivo de compras tienen método escrito. La analista lo aprendió en dos o tres días de traspaso y lo ha ido modificando con el tiempo.", "Alta", "Alto", "Ninguno."],
      ["Todo el cálculo se hace a mano en Excel", "El archivo se rearma cada mes desde un reporte de Odoo; los nombres de modelo de la fábrica y los propios no coinciden y se emparejan a ojo; la columna que marca los relojes con serial no está actualizada.", "Media", "Medio", "La revisión del Director, línea por línea."],
      ["El sugerido de compra aún no es confiable", "El módulo de Power BI funciona desde hace unos meses, pero el Director todavía no confía en él porque le ha visto errores. Antes hubo otra herramienta que se retiró por costo y porque no quitaba trabajo, y el equipo pasó varios meses sin nada.", "Media", "Medio", "Se usa como referencia; decide el Director."],
      ["Reporte PCI manual y sin respaldo", "Cuadrar cada mes lo vendido por país con lo comprado por cada entidad le toma a la analista los primeros diez días del mes. Ella misma reconoce que puede tener errores y que solo ella sabe hacerlo.", "Media", "Alto", "Ninguno más allá del cuidado de quien lo arma."],
      ["Logística se entera por reenvío de correo", "La fecha de llegada baja al hub porque el Director reenvía la confirmación del agente de carga. Si el reenvío se demora, se demora el aviso.", "Media", "Medio", "La constancia personal del Director; el hub responde a tiempo cuando le llega el aviso."]
     ]
    },
    "indicadores": {
     "estado": "borrador",
     "cabecera": ["Indicador", "Cómo se obtiene hoy", "Frecuencia", "Quién lo mira", "Situación actual"],
     "filas": [
      ["Meses de inventario, tránsito y mercancía obsoleta o nueva", "Parámetros que el Director fijó y que calcula el módulo de Power BI", "Mensual, al preparar la compra", "Director Comercial y de Compras (socio)", "Se usa en la decisión, sin meta escrita"],
      ["Porcentaje asignado por la fábrica sobre lo pedido", "No se calcula: se conoce por la confirmación de la fábrica", "Mensual", "Director Comercial y de Compras (socio)", "No se registra; se citan de memoria cifras de 20–30 %"],
      ["Ventas por país reportadas a la marca (PCI)", "Reporte armado a mano desde Odoo", "Mensual y en las dos convenciones anuales", "Casio (fábrica)", "Es el único seguimiento formal, y lo pide la marca, no el grupo"],
      ["Tiempo dedicado a la compra", "Estimación del propio Director", "No se mide", "—", "Dos o tres días al mes, según él"],
      ["Diferencia entre lo pedido, lo asignado y lo vendido", "No existe", "—", "—", "No hay indicador; tampoco para la brecha entre lo solicitado y lo enviado desde el hub"]
     ]
    }
   },
 "6.4": {
  "nota_version": "Versión As-Is: describe cómo se compra hoy a las fábricas de la marca propia, con los cargos que usan las propias entrevistas y el patrón V4 en su columna de cargo actual. No incorpora mejoras; donde algo falta, se dice que falta. Esta versión no lleva matriz de riesgos ni indicadores: los cuellos de botella se describen dentro del propio flujo.",
  "proposito": {
   "estado": "borrador",
   "alcance": "Desde que se detecta que hay que reponer o lanzar un producto de la marca propia hasta que el lote sale de China con su modo de envío decidido, pasando por la reunión del grupo que define qué pedir, la búsqueda de fábrica y la evaluación de muestras, la colocación de la orden y el pago del depósito de inicio de producción. Quedan fuera el diseño y desarrollo del producto en sí (macro 3), la recepción en el hub de Colón (macro 7) y el reparto posterior a cada país (6.6 y 6.7).",
   "texto": "Hoy la compra de la marca propia no pertenece a un departamento de compras —el grupo no tiene uno— sino a un socio que la lleva personalmente y que declara estar «100 %» en esta marca y «cero» en la representada, igual que su contraparte lo está al revés. A diferencia de la marca representada, que tiene un solo proveedor y un calendario mensual impuesto por la fábrica, aquí hay una decena de fábricas distintas, cada una con su lote mínimo y sus condiciones de pago, y no se compra todos los meses: se compra «cada cierto tiempo», cuando el grupo logra reunirse.\n\nEl proceso descansa en una reunión informal de cuatro personas —quien compra, la gerencia de ventas internacional, la gerencia regional de ventas de la marca y un product manager que aporta la data— que no tiene periodicidad fija, no deja registro y, por el número de productos, rara vez alcanza a revisar el catálogo completo en una sola sesión. Lo que no se alcanza a ver se acumula para la próxima, y el propio dueño del proceso describe la consecuencia: de repente se descubre que el stock de algo está bajo y por ese atraso se pasa un mes sin existencias. Él mismo resume el estado: «no está muy bien planificado este proceso» y «en toda la parte de compras estoy seguro que hace falta un proceso»."
  },
  "dueno": {
   "estado": "borrador",
   "dueno": "Director de Compras de Marca Propia (socio)",
   "participantes": [
    "Director de Compras de Marca Propia (socio) — decide qué y cuánto pedir, es el único contacto permanente con las fábricas, negocia, coloca la orden, instruye los pagos, decide el modo de envío y aprueba las muestras. Lleva además la creación de producto y la operación de Estados Unidos, así que la compra compite con todo lo demás.",
    "Product Manager / Project Manager (Panamá) — mantiene el archivo con venta mensual, inventario y sugerido por producto, y hace los cálculos sobre los que el grupo decide cuánto pedir. Es la única base cuantitativa de la reunión.",
    "Gerente de Ventas Internacional — aporta el forecast de los canales y lo que sus clientes van a comprar; el dueño del proceso declara no estar empapado de ese dato y no poder decidirlo solo.",
    "Gerente Regional de Ventas de Marca Propia — «no se mete tanto en la compra, pero ayuda porque sabe lo que se vende»: es el vendedor principal de la marca y participa en la definición de qué pedir.",
    "Director Comercial y de Compras (socio) — segunda mirada: el grupo le lleva los puntos que quiere que revise antes de proceder. Es el mismo socio que compra la marca representada, y declara querer «organizar un poco mejor la compra y las proyecciones» de esta.",
    "Gerente de Sourcing y Logística (China) — entró hace un año como gerente de sourcing para buscar fábricas y su rol derivó a una mezcla de sourcing y logística: coordina envíos y consolidaciones desde China, sigue producciones y pagos por proveedor, y organizó el control que antes no existía.",
    "Product Specialist — prueba las muestras de electrónica y da su visto antes de la aprobación, hace el seguimiento de fallas con la fábrica y la inspección en fábrica.",
    "Coordinadora de Planificación de Compras (Rower, Venezuela) — aporta cuánto va a necesitar Venezuela, que toma gran parte de la compra; su incorporación al proceso es reciente y parcial.",
    "Gerencia de Administración y Finanzas — recibe por correo la instrucción de pago y consigue los fondos; no participa en la decisión de compra.",
    "Fábricas de China (externo) — una decena de proveedores distintos por línea de producto (relojes, básculas, audífonos, cocina, relojes de niño, accesorios). Aportan el diseño y, en los productos conectados, el firmware y la aplicación, cuyo código no es del grupo."
   ],
   "evidencia": [
    "E-06 (partes 1 y 2)",
    "E-60",
    "E-08",
    "E-15",
    "E-10",
    "E-05",
    "E-25"
   ],
   "notas": "Cargos tomados de la columna «cargo actual» del patrón V4 cuando la persona figura en él: Gerente de Ventas Internacional, Product Manager / Project Manager y Coordinadora de Planificación de Compras. El dueño del proceso, el Director Comercial y de Compras, el Gerente Regional de Ventas de Marca Propia, el Gerente de Sourcing y Logística en China y el Product Specialist no figuran en el V4 —los dos primeros pertenecen a la capa de socios, que el patrón no contempla, y los tres últimos están fuera del censo—; para ellos se usa la denominación que dan las propias entrevistas («product specialist, ese es su cargo»; «entró como gerente de sourcing»). La sesión de revisión del organigrama sitúa al dueño bajo «compras», junto al otro socio que compra.",
   "sin_evidencia": "No consta quién sustituye al dueño del proceso en su ausencia: él mismo dice que podría delegarlo mandando un correo con la referencia y las cantidades, y que la gerencia de ventas internacional y la coordinación de accesorios tienen contacto con casi todas las fábricas, pero no hay un segundo formalmente designado. Tampoco consta el umbral de monto a partir del cual una compra requeriría otra aprobación: no existe ninguno."
  },
  "disparador": {
   "estado": "borrador",
   "disparador": "No hay un disparador externo equivalente al order sheet de la marca representada. Lo dispara la percepción del propio dueño del proceso de que hay stock corto de algo —«yo tengo mi mente y trato de revisar cada cierto tiempo; sé que estamos cortos y sé que tenemos que pedir»— o el lanzamiento de un producto nuevo. La señal cuantitativa existe pero es secundaria: el archivo de venta e inventario que mantiene el product manager, y el módulo de inventario que usa la marca representada, cuyos datos alguien de esa otra compra empezó a pasarle por iniciativa propia.",
   "cadencia": "Sin periodicidad fija: «cada cierto tiempo», sujeta a que los cuatro integrantes del grupo coincidan. El propio dueño describe la consecuencia: lleva más de una semana intentando reunirlos sin conseguirlo mientras hace falta comprar, y el proceso queda parado porque no logran reunirse. A diferencia de la marca representada, no se compra todos los meses.",
   "output": "Orden colocada con la fábrica y depósito de inicio de producción pagado, con el modo de envío decidido por producto.",
   "evidencia": [
    "E-06 (partes 1 y 2)",
    "E-08",
    "E-10"
   ],
   "notas": "El mapa v18 sitúa el disparador en «necesidad detectada por el comité». La evidencia lo matiza: el comité es el sitio donde se decide, pero quien detecta la necesidad y convoca es el dueño del proceso, y lo hace en buena medida de memoria."
  },
  "flujo": {
   "estado": "borrador",
   "evidencia": [
    "E-06 (partes 1 y 2)",
    "E-60",
    "E-15",
    "E-08"
   ],
   "actividades": [
    {
     "id": "a1",
     "rol": "Product Manager / Project Manager (Panamá)",
     "texto": "Mantiene el control de venta mensual, inventario y sugerido por producto: cuánto se ha vendido en promedio los últimos meses, cuánto hay y cuánto debería pedirse. Es la única base cuantitativa con la que cuenta el grupo."
    },
    {
     "id": "a2",
     "rol": "Director de Compras de Marca Propia (socio)",
     "texto": "Detecta que hay que pedir —por revisión propia de lo que sabe corto, o porque se va a lanzar un producto nuevo— y convoca al grupo. No hay calendario: la reunión se hace cuando los cuatro coinciden, y el pedido espera mientras tanto."
    },
    {
     "id": "a3",
     "rol": "Gerente de Ventas Internacional",
     "texto": "Aporta el forecast de los canales y lo que sus clientes van a comprar en el periodo."
    },
    {
     "id": "a4",
     "rol": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
     "texto": "Aporta cuánto va a necesitar Venezuela de los productos en cuestión, por ser el mercado que toma la mayor parte de la compra. Su participación es reciente y no está en todos los pedidos."
    },
    {
     "id": "a5",
     "rol": "Director de Compras de Marca Propia (socio)",
     "texto": "Reúne al grupo y recorren producto por producto qué pedir y cuánto, sobre el archivo del product manager y el forecast de los canales. La conversación no queda registrada en ningún formato."
    },
    {
     "id": "a6",
     "rol": "Director de Compras de Marca Propia (socio)",
     "texto": "Comprueba si la reunión alcanzó a cubrir todo el catálogo. Como son muchos productos, habitualmente no se termina de ver todo en una sesión y lo que queda se acumula para la próxima."
    },
    {
     "id": "a7",
     "rol": "Director Comercial y de Compras (socio)",
     "texto": "Revisa los puntos que el grupo quiere confirmar antes de proceder. Es una consulta puntual, no una aprobación formal ni un umbral por monto."
    },
    {
     "id": "a8",
     "rol": "Gerente de Sourcing y Logística (China)",
     "texto": "Cuando el producto es nuevo o hace falta otro proveedor, busca fábrica en China y solicita muestras. Con los proveedores ya establecidos, coordina directamente."
    },
    {
     "id": "a9",
     "rol": "Fábricas de China (externo)",
     "texto": "Envían la muestra, normalmente sobre un diseño propio de la fábrica o sobre la inspiración que se les manda: el grupo no diseña desde cero salvo en los accesorios que lleva la diseñadora industrial recién incorporada."
    },
    {
     "id": "a10",
     "rol": "Product Specialist",
     "texto": "Prueba la muestra cuando es electrónica y da su visto: funcionamiento del producto, del firmware y de la aplicación."
    },
    {
     "id": "a11",
     "rol": "Director de Compras de Marca Propia (socio)",
     "texto": "Decide sobre la muestra. Casi siempre la hace enviar a Panamá aunque él no esté allí, para que opine el equipo —no quiere decidirlo solo habiendo diez personas que pueden opinar—, recoge el feedback y decide. Las muestras se controlan desde hace poco en una base de Lark; antes llegaban y se perdían o se olvidaba por qué se habían pedido."
    },
    {
     "id": "a12",
     "rol": "Director de Compras de Marca Propia (socio)",
     "texto": "Coloca la orden con la fábrica. No hay formato ni canal único: se ha hecho por correo y también por mensajería instantánea, indicando referencia y cantidad."
    },
    {
     "id": "a13",
     "rol": "Fábricas de China (externo)",
     "texto": "Envían la factura correspondiente a la orden."
    },
    {
     "id": "a14",
     "rol": "Director de Compras de Marca Propia (socio)",
     "texto": "Instruye por correo a Finanzas el pago del depósito que la fábrica exige para iniciar la producción, entre un 20 % y un 30 % según el proveedor. Cada fábrica tiene condiciones distintas."
    },
    {
     "id": "a15",
     "rol": "Gerencia de Administración y Finanzas",
     "texto": "Ejecuta el pago y consigue los fondos. Se trabaja con un estimado mensual de lo que va a hacer falta, pero nunca es exacto: aparecen órdenes no contempladas y el equipo financiero resuelve cómo cubrirlas."
    },
    {
     "id": "a16",
     "rol": "Fábricas de China (externo)",
     "texto": "Producen el lote y avisan cuando está próximo a salir; el saldo se paga antes del embarque, según las condiciones de cada proveedor."
    },
    {
     "id": "a17",
     "rol": "Director de Compras de Marca Propia (socio)",
     "texto": "Decide con el equipo comercial qué parte del lote sale por aire y qué parte por mar. Solo los relojes son candidatos al aéreo por tamaño; el resto va marítimo."
    },
    {
     "id": "a18",
     "rol": "Gerente de Sourcing y Logística (China)",
     "texto": "Coordina con los proveedores la consolidación y la salida del envío desde China, y mantiene por proveedor el documento de qué está en producción, qué viene en camino, cuándo se estima que llegue y hacia dónde va."
    },
    {
     "id": "a19",
     "rol": "Director de Compras de Marca Propia (socio)",
     "texto": "Deja el archivo por proveedor actualizado en la carpeta compartida de Lark —producción, tránsito y pagos— para que quien necesite saberlo entre y lo consulte sin preguntarle. Antes esa información solo estaba en su correo."
    }
   ],
   "diagrama": {
    "carriles": [
     "Product Manager / Project Manager (Panamá)",
     "Gerente de Ventas Internacional",
     "Coordinadora de Planificación de Compras (Rower, Venezuela)",
     "Director de Compras de Marca Propia (socio)",
     "Director Comercial y de Compras (socio)",
     "Gerente de Sourcing y Logística (China)",
     "Product Specialist",
     "Fábricas de China (externo)",
     "Gerencia de Administración y Finanzas"
    ],
    "nodos": [
     {
      "id": "n0",
      "carril": "Director de Compras de Marca Propia (socio)",
      "tipo": "inicio",
      "n": "Se detecta stock corto o un lanzamiento"
     },
     {
      "id": "n1",
      "carril": "Product Manager / Project Manager (Panamá)",
      "tipo": "tarea",
      "n": "Actualizar venta, inventario y sugerido",
      "sistemas": [
       "Excel"
      ]
     },
     {
      "id": "n2",
      "carril": "Gerente de Ventas Internacional",
      "tipo": "tarea",
      "n": "Aportar el forecast de los canales"
     },
     {
      "id": "n3",
      "carril": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
      "tipo": "tarea",
      "n": "Aportar la necesidad de Venezuela"
     },
     {
      "id": "n4",
      "carril": "Director de Compras de Marca Propia (socio)",
      "tipo": "tarea",
      "n": "Convocar al grupo y reunirlo"
     },
     {
      "id": "n5",
      "carril": "Director de Compras de Marca Propia (socio)",
      "tipo": "tarea",
      "n": "Definir qué pedir y cuánto, sin registro",
      "sistemas": [
       "Excel"
      ]
     },
     {
      "id": "n6",
      "carril": "Director de Compras de Marca Propia (socio)",
      "tipo": "decision",
      "n": "¿Se cubrió todo el catálogo?"
     },
     {
      "id": "n7",
      "carril": "Director de Compras de Marca Propia (socio)",
      "tipo": "fin",
      "n": "Resto acumulado para la próxima reunión"
     },
     {
      "id": "n8",
      "carril": "Director Comercial y de Compras (socio)",
      "tipo": "tarea",
      "n": "Revisar los puntos a confirmar"
     },
     {
      "id": "n9",
      "carril": "Director de Compras de Marca Propia (socio)",
      "tipo": "decision",
      "n": "¿Producto nuevo o proveedor por buscar?"
     },
     {
      "id": "n10",
      "carril": "Gerente de Sourcing y Logística (China)",
      "tipo": "tarea",
      "n": "Buscar fábrica y pedir muestras"
     },
     {
      "id": "n11",
      "carril": "Fábricas de China (externo)",
      "tipo": "tarea",
      "n": "Enviar la muestra"
     },
     {
      "id": "n12",
      "carril": "Product Specialist",
      "tipo": "tarea",
      "n": "Probar la muestra de electrónica"
     },
     {
      "id": "n13",
      "carril": "Director de Compras de Marca Propia (socio)",
      "tipo": "decision",
      "n": "¿Se aprueba la muestra?"
     },
     {
      "id": "n14",
      "carril": "Director de Compras de Marca Propia (socio)",
      "tipo": "fin",
      "n": "Muestra devuelta con ajustes a la fábrica"
     },
     {
      "id": "n15",
      "carril": "Director de Compras de Marca Propia (socio)",
      "tipo": "tarea",
      "n": "Colocar la orden, sin formato único",
      "sistemas": [
       "Correo",
       "Mensajería"
      ]
     },
     {
      "id": "n16",
      "carril": "Fábricas de China (externo)",
      "tipo": "tarea",
      "n": "Enviar la factura"
     },
     {
      "id": "n17",
      "carril": "Director de Compras de Marca Propia (socio)",
      "tipo": "tarea",
      "n": "Instruir el depósito de inicio",
      "sistemas": [
       "Correo"
      ]
     },
     {
      "id": "n18",
      "carril": "Gerencia de Administración y Finanzas",
      "tipo": "tarea",
      "n": "Pagar y conseguir los fondos"
     },
     {
      "id": "n19",
      "carril": "Fábricas de China (externo)",
      "tipo": "tarea",
      "n": "Producir el lote y avisar la salida"
     },
     {
      "id": "n20",
      "carril": "Director de Compras de Marca Propia (socio)",
      "tipo": "tarea",
      "n": "Decidir qué va aéreo y qué marítimo"
     },
     {
      "id": "n21",
      "carril": "Gerente de Sourcing y Logística (China)",
      "tipo": "tarea",
      "n": "Consolidar y despachar desde China"
     },
     {
      "id": "n22",
      "carril": "Director de Compras de Marca Propia (socio)",
      "tipo": "fin",
      "n": "Orden en producción y tránsito visible",
      "sistemas": [
       "Lark"
      ]
     }
    ],
    "aristas": [
     {
      "de": "n0",
      "a": "n1"
     },
     {
      "de": "n0",
      "a": "n4"
     },
     {
      "de": "n1",
      "a": "n5"
     },
     {
      "de": "n4",
      "a": "n2"
     },
     {
      "de": "n4",
      "a": "n3"
     },
     {
      "de": "n2",
      "a": "n5"
     },
     {
      "de": "n3",
      "a": "n5"
     },
     {
      "de": "n5",
      "a": "n6"
     },
     {
      "de": "n6",
      "a": "n7",
      "etq": "No"
     },
     {
      "de": "n6",
      "a": "n8",
      "etq": "Sí"
     },
     {
      "de": "n8",
      "a": "n9"
     },
     {
      "de": "n9",
      "a": "n10",
      "etq": "Sí"
     },
     {
      "de": "n9",
      "a": "n15",
      "etq": "No"
     },
     {
      "de": "n10",
      "a": "n11"
     },
     {
      "de": "n11",
      "a": "n12"
     },
     {
      "de": "n12",
      "a": "n13"
     },
     {
      "de": "n13",
      "a": "n14",
      "etq": "No"
     },
     {
      "de": "n13",
      "a": "n15",
      "etq": "Sí"
     },
     {
      "de": "n15",
      "a": "n16"
     },
     {
      "de": "n16",
      "a": "n17"
     },
     {
      "de": "n17",
      "a": "n18"
     },
     {
      "de": "n18",
      "a": "n19"
     },
     {
      "de": "n19",
      "a": "n20"
     },
     {
      "de": "n20",
      "a": "n21"
     },
     {
      "de": "n21",
      "a": "n22"
     }
    ]
   }
  }
 },
 "6.1": {
  "nota_version": "Versión As-Is: describe cómo se planifica hoy la demanda, con los cargos que usan las propias entrevistas y el patrón V4 en su columna de cargo actual. No incorpora mejoras; donde algo falta, se dice que falta. Sin matriz de riesgos ni indicadores: los cuellos de botella se describen dentro del flujo.",
  "proposito": {
   "estado": "borrador",
   "alcance": "Desde que se cierra el mes hasta que existe una proyección de cuánto habrá que reponer. Cubre la extracción del inventario, la construcción manual de la proyección y el forecast anual que hace la dirección. No incluye el armado del pedido ni su aprobación, que son 6.6.",
   "texto": "**No hay proceso de planificación de demanda ni S&OP.** Los términos con los que el To-Be describe este proceso —«S&OP», «plan de suministro», «planificación de demanda»— no aparecen ni una vez en las 87 entrevistas, y la propia coordinadora que sostiene la función declara que no existen indicadores formalizados ni reporte periódico: los cálculos de cobertura y de rotación se hacen «de forma manual y puntual», nadie los recibe y no se revisan de forma sistemática.\n\nLo que sí ocurre son dos ejercicios que no se hablan entre sí. Uno es anual y estratégico: la dirección comercial prepara en diciembre o enero el plan de negocio del año —cuánto se venderá por marca, con qué margen y con qué estrategia— guiándose por los históricos de uno o dos años, y lo manda a finanzas. El otro es mensual y operativo: la coordinación de planificación construye a mano, en hoja de cálculo, la proyección de cada mes tomando la venta del mismo mes del año anterior y ajustándola por el crecimiento real del año en curso.\n\nEl sistema no ayuda. El ERP no tiene reposición automatizada ni reglas: como mucho avisa cuando el inventario baja de un nivel fijado a mano. Por eso **todo el ciclo de planificación se hace fuera del ERP**, en hojas de cálculo conectadas a él para extraer el inventario, con fórmulas propias y apoyo de inteligencia artificial. Se evaluaron tres herramientas de planificación y ninguna llegó a implementarse: unas daban una predicción puntual y otras no se integraban con el ERP."
  },
  "dueno": {
   "estado": "borrador",
   "dueno": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
   "participantes": [
    "Coordinadora de Planificación de Compras (Rower, Venezuela) — construye la proyección mensual a mano y sostiene la función para Venezuela y Panamá, con apoyo puntual a Colombia, Guatemala y Costa Rica. No tiene personal a su cargo.",
    "Director Comercial y de Compras (socio) — prepara una vez al año el plan de negocio de venta por marca, margen y estrategia, y lo remite a finanzas. Es también quien aprueba después cada reposición.",
    "Data Scientist / Líder de BI — desarrolló un módulo que sugiere reposición automática, en prueba desde hace pocas semanas al momento del levantamiento, y entrega los reportes donde puede consultarse la venta perdida."
   ],
   "evidencia": [
    "Lark: Levantamiento de Procesos de Compras (VE)",
    "E-08",
    "E-40",
    "E-10",
    "E-18"
   ],
   "notas": "Cargos tomados de la columna «cargo actual» del V4 donde la persona figura (Coordinador(a) Planificación de Compras). El director no figura en el patrón: pertenece a la capa de socios, que el V4 no contempla, y se usa la denominación con la que lo nombran las entrevistas, igual que en 6.3 y 6.4.",
   "sin_evidencia": "No consta que exista una instancia donde la proyección mensual se revise con ventas, logística o finanzas. La coordinadora propone crear una revisión operativa mensual, lo que confirma que hoy no la hay."
  },
  "disparador": {
   "estado": "borrador",
   "disparador": "El cierre de mes, que es cuando la coordinación revisa inventario y arma la proyección. El ejercicio anual lo dispara el cambio de año.",
   "cadencia": "Mensual la proyección operativa; anual el plan de negocio. Ninguno de los dos tiene reunión ni reporte asociado.",
   "output": "Una proyección de demanda en hoja de cálculo, que alimenta directamente el armado del pedido. No se publica ni se contrasta con nadie.",
   "evidencia": [
    "Lark: Levantamiento de Procesos de Compras (VE)",
    "E-08"
   ],
   "notas": "El módulo de sugerido automático existe pero no sustituye el proceso manual: al momento del levantamiento todavía no reflejaba bien los ajustes fuera de rutina, como el incremento de pedido de cara a diciembre."
  },
  "flujo": {
   "estado": "borrador",
   "evidencia": [
    "Lark: Levantamiento de Procesos de Compras (VE)",
    "E-08",
    "E-40",
    "E-18"
   ],
   "actividades": [
    {
     "id": "a1",
     "rol": "Director Comercial y de Compras (socio)",
     "texto": "Prepara a fin de año el plan de negocio de venta: cuánto venderá cada marca, con qué margen y con qué estrategia, guiándose por los históricos de uno o dos años anteriores, y lo remite a finanzas. No baja como objetivo al ciclo mensual."
    },
    {
     "id": "a2",
     "rol": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
     "texto": "Al cierre de cada mes actualiza las tablas de la hoja de cálculo conectadas al ERP y extrae el inventario disponible del país, el que está en tránsito y el que hay en el hub."
    },
    {
     "id": "a3",
     "rol": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
     "texto": "Construye la proyección de demanda a mano: toma la venta del mismo mes del año anterior y la ajusta por el crecimiento real o esperado del año en curso. Todo el cálculo vive fuera del ERP, en la hoja de cálculo, con fórmulas propias y apoyo de inteligencia artificial."
    },
    {
     "id": "a4",
     "rol": "Data Scientist / Líder de BI",
     "texto": "Mantiene el módulo que sugiere reposición automática y entrega los reportes en los que puede consultarse la venta perdida."
    },
    {
     "id": "a5",
     "rol": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
     "texto": "Contrasta el sugerido del módulo con su propia proyección y decide con cuál se queda. El sugerido todavía no recoge los ajustes fuera de rutina, como el aumento de pedido previo a diciembre, así que el cálculo manual sigue mandando."
    },
    {
     "id": "a6",
     "rol": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
     "texto": "Calcula de forma puntual la cobertura promedio y la clasificación por rotación cuando le hacen falta. No hay reporte periódico, nadie los recibe y no se revisan de forma sistemática."
    },
    {
     "id": "a7",
     "rol": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
     "texto": "Entrega la proyección al armado del pedido de reposición, que es el paso siguiente. No hay instancia donde la proyección se discuta con ventas, logística o finanzas antes de convertirse en pedido."
    }
   ],
   "diagrama": {
    "carriles": [
     "Director Comercial y de Compras (socio)",
     "Coordinadora de Planificación de Compras (Rower, Venezuela)",
     "Data Scientist / Líder de BI"
    ],
    "nodos": [
     {
      "id": "n0",
      "carril": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
      "tipo": "inicio",
      "n": "Cierre de mes"
     },
     {
      "id": "n1",
      "carril": "Director Comercial y de Compras (socio)",
      "tipo": "tarea",
      "n": "Preparar el plan de negocio anual"
     },
     {
      "id": "n2",
      "carril": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
      "tipo": "tarea",
      "n": "Extraer inventario, tránsito y hub",
      "sistemas": [
       "Excel",
       "Odoo"
      ]
     },
     {
      "id": "n3",
      "carril": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
      "tipo": "tarea",
      "n": "Proyectar a mano sobre el año anterior",
      "sistemas": [
       "Excel"
      ]
     },
     {
      "id": "n4",
      "carril": "Data Scientist / Líder de BI",
      "tipo": "tarea",
      "n": "Mantener el sugerido automático",
      "sistemas": [
       "Power BI"
      ]
     },
     {
      "id": "n5",
      "carril": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
      "tipo": "decision",
      "n": "¿El sugerido recoge los ajustes?"
     },
     {
      "id": "n6",
      "carril": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
      "tipo": "tarea",
      "n": "Mantener el cálculo manual"
     },
     {
      "id": "n7",
      "carril": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
      "tipo": "fin",
      "n": "Proyección lista para armar el pedido"
     }
    ],
    "aristas": [
     {
      "de": "n0",
      "a": "n2"
     },
     {
      "de": "n1",
      "a": "n2"
     },
     {
      "de": "n2",
      "a": "n3"
     },
     {
      "de": "n4",
      "a": "n5"
     },
     {
      "de": "n3",
      "a": "n5"
     },
     {
      "de": "n5",
      "a": "n6",
      "etq": "No"
     },
     {
      "de": "n5",
      "a": "n7",
      "etq": "Sí"
     },
     {
      "de": "n6",
      "a": "n7"
     }
    ]
   }
  }
 },
 "6.2": {
  "nota_version": "Versión As-Is: describe qué ocurre hoy en lugar de una gestión del ciclo de vida del proveedor, que no existe. Cargos actuales; sin matriz de riesgos ni indicadores.",
  "proposito": {
   "estado": "borrador",
   "alcance": "La relación con los proveedores de mercancía: cómo se encuentra uno nuevo, quién decide trabajar con él y qué seguimiento se le da después. No incluye la colocación de la orden (6.3 y 6.4) ni el reclamo por una entrega defectuosa (6.9).",
   "texto": "**No existe gestión del ciclo de vida del proveedor.** No hay homologación, ni evaluación periódica, ni panel de proveedores, ni criterio escrito para incorporar uno nuevo o dejar de trabajar con otro. El propio mapa clasifica este proceso como propuesto, y la evidencia lo confirma: nada en las entrevistas describe una evaluación de proveedor.\n\nLo que hay son dos realidades opuestas según la marca. La representada tiene **un solo proveedor**, la casa matriz, y por tanto no hay nada que gestionar: la relación es de representación, no de compra competitiva. La marca propia tiene **una decena de fábricas distintas**, una por línea de producto, y ahí la búsqueda sí ocurre — pero como una gestión personal del director que compra, apoyada por una gerente de sourcing contratada en China hace un año justamente para encontrar fábricas.\n\nEl seguimiento posterior existe en forma de control documental por proveedor —qué está en producción, qué viene en camino, cuándo se estima que llegue y los pagos—, organizado por esa misma persona en China porque antes ese control no existía y había que preguntárselo al director. Es control de órdenes, no evaluación del proveedor: no mide cumplimiento, calidad ni plazo.\n\nEl propio director señala el riesgo mayor sin proceso que lo cubra: la aplicación y el firmware de los productos conectados son **de la fábrica, no del grupo**, y cambiar de proveedor obligaría a rehacerlos."
  },
  "dueno": {
   "estado": "borrador",
   "dueno": "Director de Compras de Marca Propia (socio)",
   "participantes": [
    "Director de Compras de Marca Propia (socio) — decide con qué fábricas se trabaja, negocia y mantiene la relación. Es el único contacto permanente con la decena de proveedores de la marca propia.",
    "Gerente de Sourcing y Logística (China) — entró hace un año como gerente de sourcing para encontrar fábricas; su rol derivó a una mezcla de sourcing y logística, y organizó el control por proveedor que antes no existía.",
    "Director Comercial y de Compras (socio) — para la marca representada no hay proveedor que gestionar: hay un solo fabricante y la relación es de representación.",
    "Coordinación de accesorios (Panamá) — mantiene el contacto con las fábricas de accesorios y su detalle de muestras y colores. ⚠️ Sin equivalencia en el patrón V4."
   ],
   "evidencia": [
    "E-06 (partes 1 y 2)",
    "E-60",
    "E-08",
    "E-20"
   ],
   "notas": "Ninguno de los cuatro figura en el patrón V4: los dos directores pertenecen a la capa de socios, que el patrón no contempla, y las otras dos personas están fuera del censo por operar en China y en Panamá sin cargo registrado. Se usan las denominaciones que dan las propias entrevistas, igual que en 6.4.",
   "sin_evidencia": "No consta ningún criterio —ni escrito ni declarado— para decidir incorporar o abandonar un proveedor, ni ninguna medición de su desempeño. Tampoco consta quién tomaría esa decisión si el director que compra no estuviera."
  },
  "disparador": {
   "estado": "borrador",
   "disparador": "La necesidad de un producto que ningún proveedor actual fabrica, o la intención de desarrollar una línea nueva. No hay revisión periódica del panel que pudiera disparar una evaluación.",
   "cadencia": "Por evento, sin periodicidad. No existe ciclo de evaluación.",
   "output": "Una fábrica nueva incorporada de hecho, por haberle colocado una orden. No hay alta formal ni expediente del proveedor.",
   "evidencia": [
    "E-06 (partes 1 y 2)",
    "E-60"
   ],
   "notas": "La incorporación de un proveedor no es un acto explícito: ocurre cuando se le aprueba una muestra y se le coloca la primera orden."
  },
  "flujo": {
   "estado": "borrador",
   "evidencia": [
    "E-06 (partes 1 y 2)",
    "E-60",
    "E-08",
    "E-20"
   ],
   "actividades": [
    {
     "id": "a1",
     "rol": "Director de Compras de Marca Propia (socio)",
     "texto": "Detecta que hace falta un producto que ninguna fábrica actual hace, o decide desarrollar una línea nueva."
    },
    {
     "id": "a2",
     "rol": "Gerente de Sourcing y Logística (China)",
     "texto": "Busca fábricas candidatas en China y gestiona el primer contacto. Es la función para la que fue contratada, aunque su trabajo derivó después hacia la logística de los envíos."
    },
    {
     "id": "a3",
     "rol": "Gerente de Sourcing y Logística (China)",
     "texto": "Solicita muestras a las fábricas candidatas y coordina su envío."
    },
    {
     "id": "a4",
     "rol": "Director de Compras de Marca Propia (socio)",
     "texto": "Decide con qué fábrica se trabaja a partir de la muestra y de lo que el proveedor ofrece. No hay criterio escrito ni comparación formal: el grupo depende en buena medida de lo que cada proveedor propone, porque no existe un estudio propio por producto."
    },
    {
     "id": "a5",
     "rol": "Director de Compras de Marca Propia (socio)",
     "texto": "Coloca la primera orden, con lo que la fábrica queda incorporada de hecho. No hay alta formal, expediente ni condiciones pactadas por escrito más allá de los términos de pago."
    },
    {
     "id": "a6",
     "rol": "Gerente de Sourcing y Logística (China)",
     "texto": "Abre y mantiene el control por proveedor: qué está en producción, qué viene en camino, cuándo se estima que llegue y hacia dónde va, más el registro de pagos. Antes de existir este control había que preguntárselo al director y buscarlo en su correo."
    },
    {
     "id": "a7",
     "rol": "Coordinación de accesorios (Panamá)",
     "texto": "Lleva el contacto del día a día con las fábricas de accesorios —muestras, colores y detalle de producto— para descargar de esa gestión al director."
    },
    {
     "id": "a8",
     "rol": "Director de Compras de Marca Propia (socio)",
     "texto": "Mantiene la relación por contacto directo y continuo con cada fábrica. No hay evaluación de cumplimiento, calidad ni plazo, ni revisión periódica del panel de proveedores."
    }
   ],
   "diagrama": {
    "carriles": [
     "Director de Compras de Marca Propia (socio)",
     "Gerente de Sourcing y Logística (China)",
     "Coordinación de accesorios (Panamá)"
    ],
    "nodos": [
     {
      "id": "n0",
      "carril": "Director de Compras de Marca Propia (socio)",
      "tipo": "inicio",
      "n": "Hace falta un producto que nadie fabrica"
     },
     {
      "id": "n1",
      "carril": "Gerente de Sourcing y Logística (China)",
      "tipo": "tarea",
      "n": "Buscar fábricas candidatas en China"
     },
     {
      "id": "n2",
      "carril": "Gerente de Sourcing y Logística (China)",
      "tipo": "tarea",
      "n": "Pedir muestras y coordinar el envío"
     },
     {
      "id": "n3",
      "carril": "Director de Compras de Marca Propia (socio)",
      "tipo": "decision",
      "n": "¿Sirve lo que ofrece la fábrica?"
     },
     {
      "id": "n4",
      "carril": "Director de Compras de Marca Propia (socio)",
      "tipo": "fin",
      "n": "Se descarta; no queda registro del descarte"
     },
     {
      "id": "n5",
      "carril": "Director de Compras de Marca Propia (socio)",
      "tipo": "tarea",
      "n": "Colocar la primera orden, sin alta formal"
     },
     {
      "id": "n6",
      "carril": "Gerente de Sourcing y Logística (China)",
      "tipo": "tarea",
      "n": "Abrir el control de producción y pagos"
     },
     {
      "id": "n7",
      "carril": "Coordinación de accesorios (Panamá)",
      "tipo": "tarea",
      "n": "Llevar el día a día de accesorios"
     },
     {
      "id": "n8",
      "carril": "Director de Compras de Marca Propia (socio)",
      "tipo": "fin",
      "n": "Relación sostenida por contacto directo"
     }
    ],
    "aristas": [
     {
      "de": "n0",
      "a": "n1"
     },
     {
      "de": "n1",
      "a": "n2"
     },
     {
      "de": "n2",
      "a": "n3"
     },
     {
      "de": "n3",
      "a": "n4",
      "etq": "No"
     },
     {
      "de": "n3",
      "a": "n5",
      "etq": "Sí"
     },
     {
      "de": "n5",
      "a": "n6"
     },
     {
      "de": "n6",
      "a": "n7"
     },
     {
      "de": "n7",
      "a": "n8"
     }
    ]
   }
  }
 },
 "6.5": {
  "nota_version": "Versión As-Is: describe cómo se compra hoy localmente en el país, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
  "proposito": {
   "estado": "borrador",
   "alcance": "La compra de bienes y servicios que el país necesita para operar —insumos, materiales, reparaciones, servicios de terceros— y que no son mercancía para vender. Desde que un área detecta la necesidad hasta que administración aprueba la compra. No incluye la compra de mercancía (6.3 y 6.4) ni su pago, que es de administración y finanzas.",
   "texto": "La compra local no pertenece a ningún departamento de compras, porque el grupo no lo tiene: la ejecuta quien necesita el bien, y la aprueba la gerencia de administración del país. El circuito es corto y funciona, pero descansa entero en el criterio de quien cotiza.\n\nQuien detecta la necesidad busca presupuestos y los lleva a administración, que decide. La práctica declarada es traer «uno, dos o tres» presupuestos; y cuando quien compra ya conoce al proveedor que le parece mejor en precio y calidad, va directo a él y se lo plantea a administración como la mejor opción, por ganar tiempo. **No hay número mínimo de cotizaciones, ni umbral por monto que obligue a comparar, ni registro del criterio con el que se eligió.**\n\nNo consta procedimiento escrito para esta compra en ninguna de las operaciones."
  },
  "dueno": {
   "estado": "borrador",
   "dueno": "Gerente de Administración (país)",
   "participantes": [
    "Gerente de Administración (país) — decide y aprueba la compra local; es quien cierra el circuito.",
    "Jefe de Servicios Generales — detecta la necesidad de insumos, materiales y reparaciones, busca los presupuestos y los lleva a administración. Es el solicitante más frecuente.",
    "Área solicitante — cualquier otra área que necesite un bien o servicio sigue el mismo camino.",
    "Proveedor local (externo) — cotiza y entrega."
   ],
   "evidencia": [
    "E-45",
    "Lark: Levantamiento de Procesos de Compras (VE)"
   ],
   "notas": "Cargos tomados de la columna «cargo actual» del V4, donde ambos figuran: Gerente de Administración y Jefe de Servicios Generales, los dos en la operación de Venezuela. El mapa v18 atribuye el proceso a un asistente administrativo o de servicios generales; la evidencia sitúa la decisión en la gerencia de administración y la gestión en la jefatura de servicios generales.",
   "sin_evidencia": "No consta cómo opera este circuito en las operaciones distintas de Venezuela, ni si existe un umbral de monto por encima del cual la aprobación suba de nivel. Tampoco consta quién lo ejecuta cuando la necesidad la detecta un área sin relación con servicios generales."
  },
  "disparador": {
   "estado": "borrador",
   "disparador": "La necesidad detectada por un área: un insumo que se acabó, un material para una reparación, un servicio de un tercero. También una emergencia, que es lo que marca el ritmo real del área de servicios generales.",
   "cadencia": "Continua y sin periodicidad: «depende de las emergencias que se presenten».",
   "output": "Compra aprobada por administración y bien o servicio recibido.",
   "evidencia": [
    "E-45"
   ],
   "notas": "El propio jefe de servicios generales describe su trabajo como reactivo a la emergencia, sin plan ni calendario de compra."
  },
  "flujo": {
   "estado": "borrador",
   "evidencia": [
    "E-45",
    "Lark: Levantamiento de Procesos de Compras (VE)"
   ],
   "actividades": [
    {
     "id": "a1",
     "rol": "Área solicitante",
     "texto": "Detecta la necesidad del bien o del servicio y la plantea a servicios generales, o la gestiona por su cuenta si no le corresponde a esa área."
    },
    {
     "id": "a2",
     "rol": "Jefe de Servicios Generales",
     "texto": "Comprueba si ya conoce un proveedor que le resulte conveniente para eso."
    },
    {
     "id": "a3",
     "rol": "Jefe de Servicios Generales",
     "texto": "Pide presupuesto a uno, dos o tres proveedores cuando no tiene referencia previa, y compara precio y calidad."
    },
    {
     "id": "a4",
     "rol": "Jefe de Servicios Generales",
     "texto": "Va directo al proveedor que ya tiene identificado como el de mejor precio y calidad, y lo plantea a administración como la opción que conviene. Lo hace por ganar tiempo; no queda registro del criterio ni de las alternativas."
    },
    {
     "id": "a5",
     "rol": "Proveedor local (externo)",
     "texto": "Entrega el presupuesto."
    },
    {
     "id": "a6",
     "rol": "Jefe de Servicios Generales",
     "texto": "Lleva el presupuesto o los presupuestos a la gerencia de administración."
    },
    {
     "id": "a7",
     "rol": "Gerente de Administración (país)",
     "texto": "Decide y aprueba la compra. No hay umbral por monto declarado que cambie quién aprueba."
    },
    {
     "id": "a8",
     "rol": "Proveedor local (externo)",
     "texto": "Entrega el bien o ejecuta el servicio."
    },
    {
     "id": "a9",
     "rol": "Jefe de Servicios Generales",
     "texto": "Da la conformidad de lo recibido o del trabajo ejecutado."
    }
   ],
   "diagrama": {
    "carriles": [
     "Área solicitante",
     "Jefe de Servicios Generales",
     "Proveedor local (externo)",
     "Gerente de Administración (país)"
    ],
    "nodos": [
     {
      "id": "n0",
      "carril": "Área solicitante",
      "tipo": "inicio",
      "n": "Se detecta la necesidad"
     },
     {
      "id": "n1",
      "carril": "Jefe de Servicios Generales",
      "tipo": "decision",
      "n": "¿Ya conoce un proveedor conveniente?"
     },
     {
      "id": "n2",
      "carril": "Jefe de Servicios Generales",
      "tipo": "tarea",
      "n": "Pedir uno a tres presupuestos"
     },
     {
      "id": "n3",
      "carril": "Jefe de Servicios Generales",
      "tipo": "tarea",
      "n": "Ir directo al proveedor conocido"
     },
     {
      "id": "n4",
      "carril": "Proveedor local (externo)",
      "tipo": "tarea",
      "n": "Entregar el presupuesto"
     },
     {
      "id": "n5",
      "carril": "Gerente de Administración (país)",
      "tipo": "decision",
      "n": "¿Se aprueba la compra?"
     },
     {
      "id": "n6",
      "carril": "Jefe de Servicios Generales",
      "tipo": "fin",
      "n": "Compra no aprobada; se rehace o se deja"
     },
     {
      "id": "n7",
      "carril": "Proveedor local (externo)",
      "tipo": "tarea",
      "n": "Entregar el bien o ejecutar el servicio"
     },
     {
      "id": "n8",
      "carril": "Jefe de Servicios Generales",
      "tipo": "fin",
      "n": "Conformidad dada de lo recibido"
     }
    ],
    "aristas": [
     {
      "de": "n0",
      "a": "n1"
     },
     {
      "de": "n1",
      "a": "n2",
      "etq": "No"
     },
     {
      "de": "n1",
      "a": "n3",
      "etq": "Sí"
     },
     {
      "de": "n2",
      "a": "n4"
     },
     {
      "de": "n3",
      "a": "n4"
     },
     {
      "de": "n4",
      "a": "n5"
     },
     {
      "de": "n5",
      "a": "n6",
      "etq": "No"
     },
     {
      "de": "n5",
      "a": "n7",
      "etq": "Sí"
     },
     {
      "de": "n7",
      "a": "n8"
     }
    ]
   }
  }
 },
 "6.6": {
  "nota_version": "Versión As-Is: describe cómo se repone hoy el país desde el hub, con los cargos actuales y los tiempos reales que declara quien lo ejecuta. Sin matriz de riesgos ni indicadores.",
  "proposito": {
   "estado": "borrador",
   "alcance": "Desde que se cierra el mes y se revisa el inventario hasta que la mercancía llega a la bodega del país y la responsabilidad pasa a la gerencia de operaciones. Es el proceso ancla de la coordinación de planificación. No incluye la compra a fábrica (6.3 y 6.4), ni la recepción física y el costeo (macro 7), ni la reposición a tienda (6.7).",
   "texto": "El país se repone del hub como si fuera un cliente mayorista suyo: pide, el hub asigna lo que puede liberar sin desabastecer a los demás, y lo que se asigna casi nunca es lo que se pidió. La coordinación de planificación lo describe como su proceso ancla, y el ciclo completo —del armado del pedido a la mercancía en bodega— toma entre uno y mes y medio.\n\nDos rasgos lo definen. El primero es que **la aprobación es el cuello de botella**: el pedido tarda alrededor de una semana en volver aprobado, y vuelve recortado según lo que el hub pueda liberar; el ejemplo que da quien lo ejecuta es pedir mil unidades y recibir quinientas.\n\nEl segundo es más serio y nadie lo controla: **lo que no cabe en el contenedor simplemente no se envía, y no se notifica**. El país queda contando con mercancía en tránsito que nunca salió, y no se entera hasta que el contenedor llega. El impacto no es solo venta perdida: se han pagado aranceles en aduana sobre mercancía que figuraba en la factura y que finalmente no viajó.\n\nLa cobertura objetivo varía por destino —tres a cuatro meses para el mayorista de Venezuela por el tiempo de tránsito, uno a mes y medio para el de Panamá por estar junto al hub— y se sostiene con dificultad, porque el hub se queda sin mercancía con frecuencia."
  },
  "dueno": {
   "estado": "borrador",
   "dueno": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
   "participantes": [
    "Coordinadora de Planificación de Compras (Rower, Venezuela) — arma el pedido de reposición del país y lo envía a aprobar. Su función termina con la solicitud: no maneja permisología, aduana ni nacionalización, no tiene contacto con proveedores ni con fábrica y no gestiona pagos.",
    "Director Comercial y de Compras (socio) — asigna y aprueba las cantidades finales, decidiendo qué puede liberar el hub sin desabastecer a los demás países.",
    "Gerente de Ventas Mayor (Panamá) — gestiona con la bodega del hub la preparación del pedido y el armado del contenedor, e informa de tiempos y retrasos.",
    "Gerente de Operaciones y Logística (Venezuela) — recibe la mercancía al llegar al país; de ahí en adelante la gestión logística es suya.",
    "Data Scientist / Líder de BI — provee el reporte donde puede consultarse la venta perdida."
   ],
   "evidencia": [
    "Lark: Levantamiento de Procesos de Compras (VE)",
    "E-40",
    "E-08",
    "E-34"
   ],
   "notas": "Cargos tomados de la columna «cargo actual» del V4 donde la persona figura: Coordinador(a) Planificación de Compras, Gerente de Ventas Mayor PTY y Gerente de Operaciones y Logística. El director no figura en el patrón —capa de socios—, y se usa la denominación de las entrevistas, la misma que en 6.3.",
   "sin_evidencia": "No consta con qué criterio se decide el reparto cuando el hub no puede atender a todos los países: se declara que cada país toma lo necesario para su cobertura mínima y repone poco a poco, pero no hay regla escrita ni prioridad establecida."
  },
  "disparador": {
   "estado": "borrador",
   "disparador": "El cierre de mes, que abre la revisión del inventario disponible en el país, el que viene en tránsito y el que hay en el hub.",
   "cadencia": "Mensual para la reposición total del país; quincenal para el mayorista de Panamá, por estar junto al hub.",
   "output": "Mercancía recibida en la bodega del país, en la cantidad que el hub pudo asignar, no en la que se pidió.",
   "evidencia": [
    "Lark: Levantamiento de Procesos de Compras (VE)"
   ],
   "notas": "El ciclo declarado: aproximadamente una semana de aprobación, tres semanas de tránsito y una de nacionalización — entre uno y mes y medio desde que se monta el pedido."
  },
  "flujo": {
   "estado": "borrador",
   "evidencia": [
    "Lark: Levantamiento de Procesos de Compras (VE)",
    "E-40",
    "E-08",
    "E-34"
   ],
   "actividades": [
    {
     "id": "a1",
     "rol": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
     "texto": "Al cierre de mes revisa el inventario disponible del país, la mercancía en tránsito hacia él y el inventario disponible en el hub."
    },
    {
     "id": "a2",
     "rol": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
     "texto": "Arma el pedido buscando sostener la cobertura objetivo del destino: tres a cuatro meses para el mayorista del país por el tiempo de tránsito, uno a mes y medio para el mayorista de Panamá. En temporada alta el pedido se ajusta al alza con anticipación."
    },
    {
     "id": "a3",
     "rol": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
     "texto": "Envía el pedido a aprobar y a preparar."
    },
    {
     "id": "a4",
     "rol": "Director Comercial y de Compras (socio)",
     "texto": "Asigna las cantidades finales según lo que el hub puede liberar sin desabastecer a los demás países, y aprueba. Tarda alrededor de una semana, y es habitual que asigne menos de lo pedido."
    },
    {
     "id": "a5",
     "rol": "Gerente de Ventas Mayor (Panamá)",
     "texto": "Gestiona con la bodega del hub la preparación del pedido y la organización del contenedor, e informa de tiempos y retrasos."
    },
    {
     "id": "a6",
     "rol": "Gerente de Ventas Mayor (Panamá)",
     "texto": "Comprueba al cargar si todo lo aprobado cabe en el contenedor."
    },
    {
     "id": "a7",
     "rol": "Gerente de Ventas Mayor (Panamá)",
     "texto": "Deja fuera la mercancía que no entra y despacha el resto. No se notifica formalmente lo que quedó fuera, de modo que el país sigue contando con ella como si viniera en camino."
    },
    {
     "id": "a8",
     "rol": "Gerente de Operaciones y Logística (Venezuela)",
     "texto": "Sigue el embarque en tránsito —alrededor de tres semanas— y su nacionalización, que toma otra semana."
    },
    {
     "id": "a9",
     "rol": "Gerente de Operaciones y Logística (Venezuela)",
     "texto": "Recibe la mercancía en la bodega del país. A partir de aquí la gestión logística deja de ser de planificación y pasa a operaciones."
    },
    {
     "id": "a10",
     "rol": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
     "texto": "Descubre al llegar el contenedor qué mercancía no viajó, y rehace el pedido desde cero en el ciclo siguiente: no hay mecanismo que reserve automáticamente lo que quedó pendiente."
    }
   ],
   "diagrama": {
    "carriles": [
     "Coordinadora de Planificación de Compras (Rower, Venezuela)",
     "Director Comercial y de Compras (socio)",
     "Gerente de Ventas Mayor (Panamá)",
     "Gerente de Operaciones y Logística (Venezuela)"
    ],
    "nodos": [
     {
      "id": "n0",
      "carril": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
      "tipo": "inicio",
      "n": "Cierre de mes: revisar inventario y tránsito",
      "sistemas": [
       "Excel",
       "Odoo"
      ]
     },
     {
      "id": "n1",
      "carril": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
      "tipo": "tarea",
      "n": "Armar el pedido por cobertura objetivo",
      "sistemas": [
       "Excel"
      ]
     },
     {
      "id": "n2",
      "carril": "Director Comercial y de Compras (socio)",
      "tipo": "tarea",
      "n": "Asignar cantidades y aprobar (~1 semana)"
     },
     {
      "id": "n3",
      "carril": "Gerente de Ventas Mayor (Panamá)",
      "tipo": "tarea",
      "n": "Preparar el pedido y armar el contenedor"
     },
     {
      "id": "n4",
      "carril": "Gerente de Ventas Mayor (Panamá)",
      "tipo": "decision",
      "n": "¿Cabe todo en el contenedor?"
     },
     {
      "id": "n5",
      "carril": "Gerente de Ventas Mayor (Panamá)",
      "tipo": "tarea",
      "n": "Dejar fuera lo que no entra, sin avisar"
     },
     {
      "id": "n6",
      "carril": "Gerente de Operaciones y Logística (Venezuela)",
      "tipo": "tarea",
      "n": "Tránsito (~3 sem.) y nacionalización (~1 sem.)"
     },
     {
      "id": "n7",
      "carril": "Gerente de Operaciones y Logística (Venezuela)",
      "tipo": "tarea",
      "n": "Recibir en la bodega del país"
     },
     {
      "id": "n8",
      "carril": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
      "tipo": "fin",
      "n": "Se descubre lo que no viajó; se rehace el pedido"
     }
    ],
    "aristas": [
     {
      "de": "n0",
      "a": "n1"
     },
     {
      "de": "n1",
      "a": "n2"
     },
     {
      "de": "n2",
      "a": "n3"
     },
     {
      "de": "n3",
      "a": "n4"
     },
     {
      "de": "n4",
      "a": "n5",
      "etq": "No"
     },
     {
      "de": "n4",
      "a": "n6",
      "etq": "Sí"
     },
     {
      "de": "n5",
      "a": "n6"
     },
     {
      "de": "n6",
      "a": "n7"
     },
     {
      "de": "n7",
      "a": "n8"
     }
    ]
   }
  }
 },
 "6.7": {
  "nota_version": "Versión As-Is: describe cómo se repone hoy el punto de venta, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
  "proposito": {
   "estado": "borrador",
   "alcance": "Desde que la coordinación de planificación calcula qué necesita cada tienda hasta que la mercancía llega al punto de venta. No incluye la reposición del país desde el hub (6.6) ni la preparación y el despacho físico, que son del macro 7.",
   "texto": "La reposición al punto de venta es el ciclo corto del macroproceso: semanal, y del pedido a la mercancía en tienda pasan tres o cuatro días. La cobertura objetivo es de unas tres semanas, y la razón es física: los depósitos de tienda son pequeños y no admiten más.\n\nLa lleva la misma coordinación que repone el país, para Venezuela y Panamá, y en paralelo a los otros ciclos. Funciona con regularidad, pero arrastra la debilidad del ciclo que lo precede: **el sugerido se calcula sobre un inventario que no es del todo fiable**, porque el conteo general se hace una vez al año y los cíclicos ceden ante el volumen de trabajo de la bodega. Lo que el sistema dice que hay en tienda y lo que hay pueden no coincidir, y la depuración se hace contra el físico al preparar el traslado.\n\nCuando falta algo, el circuito es de búsqueda: se revisa si otra tienda de la misma plaza lo tiene y se resuelve entre ellas."
  },
  "dueno": {
   "estado": "borrador",
   "dueno": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
   "participantes": [
    "Coordinadora de Planificación de Compras (Rower, Venezuela) — calcula el sugerido de reposición de cada tienda y arma el traslado, para Venezuela y Panamá.",
    "Gerente de Almacén (Venezuela) — depura el traslado contra lo que hay físicamente y organiza su preparación y despacho.",
    "Encargado(a) de Tienda — recibe la mercancía, verifica contra el documento y reporta lo que falta.",
    "Gerente de Ventas al Detal (País) — resuelve la urgencia cuando una tienda necesita algo que no está en su reposición."
   ],
   "evidencia": [
    "Lark: Levantamiento de Procesos de Compras (VE)",
    "E-40",
    "E-34",
    "E-53"
   ],
   "notas": "Cargos tomados de la columna «cargo actual» del V4 donde la persona figura (Coordinador(a) Planificación de Compras, Gerente de Almacén). ⚠️ El mapa v18 atribuye la revisión a un «Supervisor de Ventas» que no existe en el patrón y que ninguna entrevista sitúa en este ciclo; se usa Gerente de Ventas al Detal (País), la equivalencia ya adoptada en el macro 9.",
   "sin_evidencia": "No consta cómo se resuelve la reposición de tienda en las operaciones distintas de Venezuela y Panamá: la coordinación declara dar solo apoyo puntual al resto de países, en aperturas y lanzamientos."
  },
  "disparador": {
   "estado": "borrador",
   "disparador": "El ciclo semanal de reposición de tiendas. Fuera de él, la urgencia de una tienda que se quedó sin una referencia que necesita.",
   "cadencia": "Semanal para Venezuela y Panamá. Del pedido a la recepción en tienda pasan tres o cuatro días.",
   "output": "Mercancía en el punto de venta, con el traslado registrado.",
   "evidencia": [
    "Lark: Levantamiento de Procesos de Compras (VE)"
   ],
   "notas": "La cobertura objetivo de unas tres semanas no es una meta comercial sino una restricción física: los depósitos de tienda son pequeños."
  },
  "flujo": {
   "estado": "borrador",
   "evidencia": [
    "Lark: Levantamiento de Procesos de Compras (VE)",
    "E-40",
    "E-34",
    "E-53"
   ],
   "actividades": [
    {
     "id": "a1",
     "rol": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
     "texto": "Revisa semanalmente la venta y el inventario de cada tienda y calcula el sugerido de reposición, buscando la cobertura de unas tres semanas que admite el depósito del punto."
    },
    {
     "id": "a2",
     "rol": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
     "texto": "Arma el traslado por tienda y lo envía al almacén."
    },
    {
     "id": "a3",
     "rol": "Gerente de Almacén (Venezuela)",
     "texto": "Depura el traslado contra lo que hay físicamente en la bodega, porque el inventario del sistema no siempre coincide."
    },
    {
     "id": "a4",
     "rol": "Gerente de Almacén (Venezuela)",
     "texto": "Comprueba si hay existencia para cubrir lo solicitado."
    },
    {
     "id": "a5",
     "rol": "Gerente de Ventas al Detal (País)",
     "texto": "Resuelve el faltante buscando la referencia en otra tienda de la misma plaza, y autoriza el movimiento entre puntos cuando procede."
    },
    {
     "id": "a6",
     "rol": "Gerente de Almacén (Venezuela)",
     "texto": "Organiza la preparación y el despacho del traslado hacia la tienda."
    },
    {
     "id": "a7",
     "rol": "Encargado(a) de Tienda",
     "texto": "Recibe la mercancía, la verifica contra el documento del traslado y reporta lo que no llegó."
    },
    {
     "id": "a8",
     "rol": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
     "texto": "Recoge lo no cubierto para el ciclo siguiente. No hay reserva automática de lo pendiente: se vuelve a calcular desde cero."
    }
   ],
   "diagrama": {
    "carriles": [
     "Coordinadora de Planificación de Compras (Rower, Venezuela)",
     "Gerente de Almacén (Venezuela)",
     "Gerente de Ventas al Detal (País)",
     "Encargado(a) de Tienda"
    ],
    "nodos": [
     {
      "id": "n0",
      "carril": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
      "tipo": "inicio",
      "n": "Ciclo semanal: calcular el sugerido",
      "sistemas": [
       "Excel",
       "Odoo"
      ]
     },
     {
      "id": "n1",
      "carril": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
      "tipo": "tarea",
      "n": "Armar el traslado por tienda"
     },
     {
      "id": "n2",
      "carril": "Gerente de Almacén (Venezuela)",
      "tipo": "tarea",
      "n": "Depurar contra el inventario físico"
     },
     {
      "id": "n3",
      "carril": "Gerente de Almacén (Venezuela)",
      "tipo": "decision",
      "n": "¿Hay existencia para cubrirlo?"
     },
     {
      "id": "n4",
      "carril": "Gerente de Ventas al Detal (País)",
      "tipo": "tarea",
      "n": "Buscar la referencia en otra tienda"
     },
     {
      "id": "n5",
      "carril": "Gerente de Almacén (Venezuela)",
      "tipo": "tarea",
      "n": "Preparar y despachar el traslado",
      "sistemas": [
       "WMS"
      ]
     },
     {
      "id": "n6",
      "carril": "Encargado(a) de Tienda",
      "tipo": "tarea",
      "n": "Recibir, verificar y reportar faltantes"
     },
     {
      "id": "n7",
      "carril": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
      "tipo": "fin",
      "n": "Lo no cubierto vuelve al cálculo siguiente"
     }
    ],
    "aristas": [
     {
      "de": "n0",
      "a": "n1"
     },
     {
      "de": "n1",
      "a": "n2"
     },
     {
      "de": "n2",
      "a": "n3"
     },
     {
      "de": "n3",
      "a": "n4",
      "etq": "No"
     },
     {
      "de": "n3",
      "a": "n5",
      "etq": "Sí"
     },
     {
      "de": "n4",
      "a": "n5"
     },
     {
      "de": "n5",
      "a": "n6"
     },
     {
      "de": "n6",
      "a": "n7"
     }
    ]
   }
  }
 },
 "6.8": {
  "nota_version": "Versión As-Is: describe qué gobierna hoy la compra, que en la práctica es muy poco. Cargos actuales; sin matriz de riesgos ni indicadores.",
  "proposito": {
   "estado": "borrador",
   "alcance": "Las reglas con las que se decide y se controla la compra del grupo: quién puede comprar, hasta qué monto, con qué criterio y con qué medición. No incluye la ejecución de cada compra, que son 6.3, 6.4 y 6.5.",
   "texto": "**No existe gobierno de compras.** No hay política escrita, ni matriz de aprobación, ni umbral por monto que determine quién autoriza qué, ni tablero de seguimiento. Los términos con los que el To-Be describe este proceso no aparecen en el corpus, y el propio mapa lo clasifica como propuesto.\n\nLo que hay en su lugar es una atribución personal: **la compra internacional de cada marca la decide un socio distinto**, con plena autonomía y sin monto que active una segunda firma. Uno lleva la marca representada y el otro la propia, y ninguno interviene en la del otro. En la marca propia existe un grupo informal de cuatro personas que define qué pedir y cuánto, y una consulta puntual al otro socio antes de proceder; pero no es una aprobación formal ni responde a un umbral: es una segunda mirada por costumbre.\n\nLa medición tampoco existe: no hay indicadores formalizados ni reportados, los cálculos se hacen de forma manual y puntual, nadie los recibe y no se revisan de forma sistemática. El único punto donde algo se aprueba caso por caso es el descuento de una promoción, que requiere el visto de uno de los socios cada vez.\n\nEl rasgo que condiciona cualquier diseño futuro: **quienes compran son miembros de la propia Junta**, de modo que una regla que los alcance no puede fijarse por debajo de ellos."
  },
  "dueno": {
   "estado": "borrador",
   "dueno": "Director Comercial y de Compras (socio)",
   "participantes": [
    "Director Comercial y de Compras (socio) — decide la compra de la marca representada sin umbral ni segunda firma, y aprueba las reposiciones de los países y todas las promociones, caso por caso.",
    "Director de Compras de Marca Propia (socio) — decide la compra de la marca propia con la misma autonomía, apoyado en un grupo informal de cuatro personas.",
    "Junta Directiva — no ejerce hoy control sobre la compra. Es donde tendría que residir cualquier regla, porque ambos directores son miembros suyos.",
    "Coordinadora de Planificación de Compras (Rower, Venezuela) — señala la ausencia de indicadores y de un departamento de compras formal, y declara tener clara cómo debería estructurarse."
   ],
   "evidencia": [
    "E-08",
    "E-06 (partes 1 y 2)",
    "E-60",
    "Lark: Levantamiento de Procesos de Compras (VE)"
   ],
   "notas": "Los dos directores no figuran en el patrón V4: pertenecen a la capa de socios, que el patrón no contempla. Se usan las denominaciones de las entrevistas, las mismas de 6.3 y 6.4.",
   "sin_evidencia": "No consta ningún umbral de monto, ninguna política de compras escrita, ninguna matriz de aprobación ni ningún indicador de compras formalizado. La ausencia es el hallazgo, no un hueco de la investigación."
  },
  "disparador": {
   "estado": "borrador",
   "disparador": "No hay disparador: no existe ciclo de gobierno. Lo más parecido es la aprobación caso por caso de una promoción o de una reposición de país, que ocurre cuando alguien la pide.",
   "cadencia": "Sin periodicidad. No hay revisión de política ni de indicadores porque no existen ni una ni otros.",
   "output": "Decisiones de compra tomadas individualmente, sin registro del criterio ni medición posterior.",
   "evidencia": [
    "E-08",
    "Lark: Levantamiento de Procesos de Compras (VE)"
   ],
   "notas": "El único control recurrente documentado es que cada descuento de promoción pasa por el visto de un socio, lo que en la práctica convierte una decisión comercial rutinaria en un cuello de botella."
  },
  "flujo": {
   "estado": "borrador",
   "evidencia": [
    "E-08",
    "E-06 (partes 1 y 2)",
    "E-60",
    "Lark: Levantamiento de Procesos de Compras (VE)"
   ],
   "actividades": [
    {
     "id": "a1",
     "rol": "Director Comercial y de Compras (socio)",
     "texto": "Decide la compra de la marca que lleva, con autonomía completa. No hay monto a partir del cual la decisión requiera otra firma."
    },
    {
     "id": "a2",
     "rol": "Director de Compras de Marca Propia (socio)",
     "texto": "Decide la compra de su marca con la misma autonomía, apoyado en un grupo informal de cuatro personas que define qué pedir y cuánto. El grupo no deja registro de sus decisiones."
    },
    {
     "id": "a3",
     "rol": "Director de Compras de Marca Propia (socio)",
     "texto": "Consulta al otro socio los puntos que el grupo quiere confirmar antes de proceder. Es una segunda mirada por costumbre, no una aprobación formal ni una respuesta a un umbral."
    },
    {
     "id": "a4",
     "rol": "Director Comercial y de Compras (socio)",
     "texto": "Aprueba caso por caso el descuento de cada promoción y las reposiciones que le envían los países."
    },
    {
     "id": "a5",
     "rol": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
     "texto": "Calcula de forma manual y puntual las métricas que necesita —cobertura promedio, clasificación por rotación— sin reporte periódico ni destinatario."
    },
    {
     "id": "a6",
     "rol": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
     "texto": "Comprueba si existe una meta contra la que medir el resultado, y no la encuentra: se sabe informalmente que la cobertura del mayorista debe estar entre tres y cuatro meses, pero no hay reporte que lo contraste."
    },
    {
     "id": "a7",
     "rol": "Junta Directiva",
     "texto": "No recibe reporte de compras ni ejerce control sobre el proceso. Es la instancia donde tendría que residir la regla, porque ambos directores que compran son miembros suyos."
    }
   ],
   "diagrama": {
    "carriles": [
     "Director Comercial y de Compras (socio)",
     "Director de Compras de Marca Propia (socio)",
     "Coordinadora de Planificación de Compras (Rower, Venezuela)",
     "Junta Directiva"
    ],
    "nodos": [
     {
      "id": "n0",
      "carril": "Director Comercial y de Compras (socio)",
      "tipo": "inicio",
      "n": "Hay que decidir una compra"
     },
     {
      "id": "n1",
      "carril": "Director Comercial y de Compras (socio)",
      "tipo": "decision",
      "n": "¿De qué marca es la compra?"
     },
     {
      "id": "n2",
      "carril": "Director Comercial y de Compras (socio)",
      "tipo": "tarea",
      "n": "Decidir solo, sin umbral ni segunda firma"
     },
     {
      "id": "n3",
      "carril": "Director de Compras de Marca Propia (socio)",
      "tipo": "tarea",
      "n": "Decidir con el grupo informal, sin registro"
     },
     {
      "id": "n4",
      "carril": "Director de Compras de Marca Propia (socio)",
      "tipo": "tarea",
      "n": "Consultar al otro socio por costumbre"
     },
     {
      "id": "n5",
      "carril": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
      "tipo": "tarea",
      "n": "Calcular métricas a mano, sin destinatario",
      "sistemas": [
       "Excel"
      ]
     },
     {
      "id": "n6",
      "carril": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
      "tipo": "decision",
      "n": "¿Hay meta contra la que medir?"
     },
     {
      "id": "n7",
      "carril": "Junta Directiva",
      "tipo": "fin",
      "n": "Sin reporte de compras ni control"
     },
     {
      "id": "n8",
      "carril": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
      "tipo": "fin",
      "n": "Métrica queda sin contraste"
     }
    ],
    "aristas": [
     {
      "de": "n0",
      "a": "n1"
     },
     {
      "de": "n1",
      "a": "n2",
      "etq": "Representada"
     },
     {
      "de": "n1",
      "a": "n3",
      "etq": "Propia"
     },
     {
      "de": "n3",
      "a": "n4"
     },
     {
      "de": "n2",
      "a": "n5"
     },
     {
      "de": "n4",
      "a": "n5"
     },
     {
      "de": "n5",
      "a": "n6"
     },
     {
      "de": "n6",
      "a": "n7",
      "etq": "Sí"
     },
     {
      "de": "n6",
      "a": "n8",
      "etq": "No"
     }
    ]
   }
  }
 },
 "6.9": {
  "nota_version": "Versión As-Is: describe cómo se resuelve hoy una diferencia en lo recibido, que no es lo mismo que un reclamo al proveedor. Cargos actuales; sin matriz de riesgos ni indicadores.",
  "proposito": {
   "estado": "borrador",
   "alcance": "Qué ocurre cuando lo que llega no coincide con lo que la factura dice, o llega dañado. Desde que la diferencia se detecta hasta que se resuelve. No incluye la devolución del cliente final, que es logística inversa del macro 7.",
   "texto": "**No existe un proceso de devoluciones y no conformidades al proveedor.** Lo que existe es la resolución de diferencias entre las operaciones del grupo: el país detecta que le falta algo respecto de la factura del hub, lo reporta a Panamá, y allí se verifica antes de aceptarlo.\n\nEl rasgo que lo define es que **primero se certifica la diferencia y después se busca a quién corresponde**. Quien la recibe no la da por buena: comprueba que sea real, porque puede ser un error de lectura —un bulto rotulado de forma parecida a otro— y no un faltante. Cuando la diferencia se explica por dos referencias equivalentes en costo, se ajusta la factura y el asunto se cierra sin más.\n\nContra la fábrica, en cambio, no consta reclamo alguno. Y la no conformidad más costosa del ciclo no llega siquiera a tratarse como tal: la mercancía que no cabe en el contenedor y no viaja aparece como faltante en destino, cuando en realidad nunca salió — y en ocasiones se pagó arancel sobre ella."
  },
  "dueno": {
   "estado": "borrador",
   "dueno": "Gerente de Operaciones y Logística (Venezuela)",
   "participantes": [
    "Gerente de Operaciones y Logística (Venezuela) — certifica la diferencia reportada antes de aceptarla y la gestiona con la contraparte del hub.",
    "Gerente de Almacén (Venezuela) — detecta la diferencia al recibir y la reporta con el número de factura y la referencia.",
    "Gerente de Ventas Mayor (Panamá) — contraparte en el hub: organiza el faltante y confirma qué salió realmente.",
    "Coordinadora de Planificación de Compras (Rower, Venezuela) — sufre la consecuencia en el ciclo siguiente, porque la mercancía no recibida vuelve a pedirse desde cero."
   ],
   "evidencia": [
    "E-34",
    "Lark: Levantamiento de Procesos de Compras (VE)",
    "E-40"
   ],
   "notas": "Cargos tomados de la columna «cargo actual» del V4 donde la persona figura. El mapa v18 atribuye el proceso a la coordinación de logística y bodega con soporte del director de la marca; la evidencia sitúa la gestión en la gerencia de operaciones del país y su contraparte en el hub, y no describe intervención del director.",
   "sin_evidencia": "No consta ningún reclamo formal a la fábrica por mercancía defectuosa, faltante o fuera de especificación, ni un mecanismo para hacerlo. Tampoco consta qué ocurre cuando la diferencia no se explica ni se resuelve: no hay escalamiento documentado."
  },
  "disparador": {
   "estado": "borrador",
   "disparador": "La detección de una diferencia al recibir: falta mercancía respecto de la factura, sobra, o llegó algo distinto de lo documentado.",
   "cadencia": "Por evento, en cada recepción.",
   "output": "Diferencia certificada y resuelta, normalmente mediante ajuste de la factura. Lo no recibido vuelve al pedido del ciclo siguiente.",
   "evidencia": [
    "E-34"
   ],
   "notas": "El proceso lo dispara la incidencia, no una rutina: no hay revisión periódica de no conformidades acumuladas."
  },
  "flujo": {
   "estado": "borrador",
   "evidencia": [
    "E-34",
    "Lark: Levantamiento de Procesos de Compras (VE)",
    "E-40"
   ],
   "actividades": [
    {
     "id": "a1",
     "rol": "Gerente de Almacén (Venezuela)",
     "texto": "Detecta al recibir que lo que llegó no coincide con la factura y lo reporta con el número de factura y la referencia afectada."
    },
    {
     "id": "a2",
     "rol": "Gerente de Operaciones y Logística (Venezuela)",
     "texto": "Certifica que la diferencia sea real antes de aceptarla. Puede tratarse de un error de lectura —dos bultos rotulados de forma parecida— y no de un faltante."
    },
    {
     "id": "a3",
     "rol": "Gerente de Operaciones y Logística (Venezuela)",
     "texto": "Comprueba si lo recibido equivale en costo a lo facturado."
    },
    {
     "id": "a4",
     "rol": "Gerente de Operaciones y Logística (Venezuela)",
     "texto": "Ajusta la factura cuando la diferencia es de referencia pero no de costo, y el asunto se cierra sin mayor trámite."
    },
    {
     "id": "a5",
     "rol": "Gerente de Ventas Mayor (Panamá)",
     "texto": "Organiza desde el hub la verificación del faltante y confirma qué salió realmente en el embarque."
    },
    {
     "id": "a6",
     "rol": "Gerente de Operaciones y Logística (Venezuela)",
     "texto": "Acepta la diferencia certificada y la registra en el inventario del país."
    },
    {
     "id": "a7",
     "rol": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
     "texto": "Vuelve a incluir en el pedido siguiente la mercancía que no llegó. No hay reserva del pendiente: el pedido se rehace desde cero."
    }
   ],
   "diagrama": {
    "carriles": [
     "Gerente de Almacén (Venezuela)",
     "Gerente de Operaciones y Logística (Venezuela)",
     "Gerente de Ventas Mayor (Panamá)",
     "Coordinadora de Planificación de Compras (Rower, Venezuela)"
    ],
    "nodos": [
     {
      "id": "n0",
      "carril": "Gerente de Almacén (Venezuela)",
      "tipo": "inicio",
      "n": "Se detecta diferencia contra la factura"
     },
     {
      "id": "n1",
      "carril": "Gerente de Operaciones y Logística (Venezuela)",
      "tipo": "tarea",
      "n": "Certificar que la diferencia sea real"
     },
     {
      "id": "n2",
      "carril": "Gerente de Operaciones y Logística (Venezuela)",
      "tipo": "decision",
      "n": "¿Equivale en costo a lo facturado?"
     },
     {
      "id": "n3",
      "carril": "Gerente de Operaciones y Logística (Venezuela)",
      "tipo": "tarea",
      "n": "Ajustar la factura y cerrar"
     },
     {
      "id": "n4",
      "carril": "Gerente de Ventas Mayor (Panamá)",
      "tipo": "tarea",
      "n": "Verificar en el hub qué salió"
     },
     {
      "id": "n5",
      "carril": "Gerente de Operaciones y Logística (Venezuela)",
      "tipo": "tarea",
      "n": "Aceptar y registrar en inventario",
      "sistemas": [
       "Odoo"
      ]
     },
     {
      "id": "n6",
      "carril": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
      "tipo": "fin",
      "n": "Lo no recibido vuelve al pedido siguiente"
     }
    ],
    "aristas": [
     {
      "de": "n0",
      "a": "n1"
     },
     {
      "de": "n1",
      "a": "n2"
     },
     {
      "de": "n2",
      "a": "n3",
      "etq": "Sí"
     },
     {
      "de": "n2",
      "a": "n4",
      "etq": "No"
     },
     {
      "de": "n3",
      "a": "n6"
     },
     {
      "de": "n4",
      "a": "n5"
     },
     {
      "de": "n5",
      "a": "n6"
     }
    ]
   }
  }
 }

  }
 },
 "7": {
  "procesos": {
   "7.1": {
    "nota_version": "Versión As-Is: describe cómo se recibe hoy la mercancía importada y cómo se le carga el costo, con los cargos que usan las propias entrevistas y el patrón V4 en su columna de cargo actual. No incorpora mejoras; donde algo falta, se dice que falta. Esta versión no lleva matriz de riesgos ni indicadores: los cuellos de botella se describen dentro del propio flujo.",
    "proposito": {
     "estado": "borrador",
     "alcance": "Desde que Tráfico avisa el arribo de la carga al hub de Zona Libre hasta que la mercancía queda marcada como disponible y, más tarde, con su costo puesto en destino ya calculado. El flujo descrito es el del hub de Panamá, que es donde la evidencia alcanza para describirlo paso a paso. Quedan fuera el trámite aduanal y el seguimiento del embarque, la colocación de la compra, el conteo cíclico de inventario y la preparación de pedidos.",
     "texto": "La recepción en el hub funciona hoy como una cadena de tres manos que se pasan el testigo sin un procedimiento escrito que las ate: Tráfico avisa el arribo y entrega los documentos, Operaciones descarga, paletiza y ubica, y la gerencia de inventario valida la orden de compra, confirma las preventas y calcula el costo. Cada tramo funciona, y quien lo lleva lo describe con precisión; lo que no existe es el documento que lo fije ni la medición que lo vigile —hasta hace poco no había indicadores de la operación, y apenas ahora se están definiendo.\n\nTres rasgos marcan el proceso tal como opera. El primero es que **la operación se entera tarde**: un contenedor puede tardar entre sesenta y noventa días en llegar y el almacén se entera dos días antes, y la carga aérea con frecuencia no viene rastreada porque el proveedor no comparte el seguimiento. El origen no es logístico —la información de la compra no baja a operaciones—, y la consecuencia sí: se satura la semana y se desplazan recepciones ya comprometidas. El segundo es que **la disponibilidad es todo o nada**: ninguna referencia aparece como vendible hasta que el contenedor entero se cierra, y en una carga de la marca representada eso significa bajar a mano del orden de mil ochocientas cajas, con la primera caja ubicada esperando a la última. El tercero es que **el costo llega después de la venta**: la mercancía se marca disponible al cerrar la recepción, pero el costeo en destino solo puede ejecutarse cuando Contabilidad ha registrado la factura del flete, de modo que entre ambos momentos se vende a un costo aún provisional.\n\nLos dos ritmos de llegada no se parecen. La marca representada llega una vez al mes, con la factura del proveedor disponible con un mes de antelación, y es planificable. La marca propia llega de forma continua —aérea casi semanal— y a menudo sin aviso: se sabe que viene algo cuando ya está en el puerto."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente de Operaciones y Excelencia Logística",
     "participantes": [
      "Gerente de Operaciones y Excelencia Logística — responde por toda la operación del almacén: recepción, ubicación, pick, pack, despacho y envío, «excepto compra y costeo». Toma el arribo que reporta Tráfico, organiza la recepción y resuelve las incidencias de sobrante y faltante. Lleva un mes en el cargo a la fecha de la entrevista.",
      "Jefa de Tráfico — emite el Aviso de Notificación de Arribo (ACN) y entrega la documentación del embarque. Su departamento lleva aduana, movimiento interno, contacto con el proveedor de fletes y liquidaciones, con una persona de importación y tres de exportación.",
      "Gerente de Inventario y Precios — carga la orden de compra, valida el inventario cuando Operaciones ha culminado la recepción, confirma las preventas, avisa la disponibilidad a los vendedores y ejecuta el costeo en destino. Responde por los inventarios de todas las ubicaciones, bodegas y tiendas.",
      "Jefe de Bodega — dirige la descarga, la paletización y el conteo contra el documento de embarque.",
      "Ayudante de Bodega — descarga, paletiza y ubica físicamente la mercancía. Es el cargo más numeroso de la operación del hub.",
      "Gerente de Contabilidad — registra en el sistema la factura del pago del flete, sin la cual el costeo en destino no puede ejecutarse.",
      "Agente aduanal (externo) — en parte de las cargas, es quien avisa la llegada efectiva; ese aviso dispara la búsqueda de documentos y el arranque del proceso."
     ],
     "evidencia": [
      "E-03",
      "E-34",
      "E-70",
      "Lark: Procesos.pdf — Logística/Inventario (PA), secciones 2 y 4"
     ],
     "notas": "Cargos tomados de la columna «cargo actual» del patrón V4, donde las cuatro funciones que este proceso separa sí aparecen distinguidas: Gerente de Operaciones y Excelencia Logística, Gerente de Inventario y Precios, Jefa de Tráfico y Jefe de Bodega. ⚠️ El patrón propuesto las colapsa todas bajo «Gerente de Operaciones y Logística», que es la denominación que usa el To-Be de este mismo proceso; esa diferencia es deliberada y conviene no cruzarla. En Panamá no existe hoy el cargo «Supervisor de Bodega»: hay Jefe de Bodega y Coordinadora de Bodega.",
     "sin_evidencia": "La ficha del mapa v18 da el proceso al Coordinador(a) de Logística y Bodega. Ninguna entrevista sitúa a esa coordinación ejecutando la recepción: en el hub la dirige la gerencia de operaciones y en Venezuela la gerencia de almacén, así que el dueño se atribuye a quien de hecho responde por ella. No consta procedimiento escrito de recepción en ninguna de las dos operaciones: el levantamiento de Venezuela existe como plantilla de cinco fases con los responsables anotados, pero sin un solo paso; y quien lleva la operación del hub declara que «no tenemos documentación completa»."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "El Aviso de Notificación de Arribo (ACN) que crea Tráfico cuando la carga llega, o —en buena parte de los embarques— el aviso de llegada que manda el agente aduanero, que es lo que dispara buscar los documentos y arrancar. No hay un hito anterior que anticipe la llegada: la orden de compra colocada no abre visibilidad para el almacén.",
     "cadencia": "Por evento, con dos ritmos muy distintos: la marca representada, una vez al mes y planificable; la marca propia, continua, con carga aérea casi semanal y a menudo sin aviso previo.",
     "output": "Mercancía ubicada y marcada como disponible en el sistema de almacén, con la orden de compra validada en el ERP, las preventas confirmadas y la disponibilidad avisada a ventas. El costo puesto en destino se calcula después, cuando entra la factura del flete.",
     "evidencia": [
      "E-03",
      "Lark: Procesos.pdf — Logística/Inventario (PA), secciones 2 y 4"
     ],
     "notas": "El output tiene dos cierres que hoy no coinciden en el tiempo, y esa distancia es el rasgo definitorio del proceso: la mercancía se vende antes de que su costo real esté cargado."
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-03",
      "E-34",
      "E-70",
      "Lark: Procesos.pdf — Logística/Inventario (PA)",
      "Lark: flujo logistico.xlsx — hoja Recepción (VE)"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Jefa de Tráfico",
       "texto": "Crea el Aviso de Notificación de Arribo (ACN) cuando la carga llega, y entrega la documentación del embarque. En parte de los embarques el aviso llega antes por el agente aduanero, y es entonces cuando se buscan los documentos y se arranca."
      },
      {
       "id": "a2",
       "rol": "Gerente de Operaciones y Excelencia Logística",
       "texto": "Toma el arribo, lo reporta y organiza la recepción con la cuadrilla disponible. En la práctica el margen es corto: un contenedor que tarda entre sesenta y noventa días en llegar se conoce dos días antes, y la carga aérea normalmente no viene rastreada porque el proveedor no comparte el seguimiento."
      },
      {
       "id": "a3",
       "rol": "Gerente de Operaciones y Excelencia Logística",
       "texto": "Comprueba si la carga estaba dentro de lo previsto para esa semana. Cuando aparece un contenedor no contemplado, se reacomoda la operación del día sobre la marcha y se desplazan recepciones ya comprometidas."
      },
      {
       "id": "a4",
       "rol": "Jefe de Bodega",
       "texto": "Dirige la descarga y el conteo de bultos contra el documento de embarque, y ordena la paletización: la carga viene a granel y hay que consolidarla en paleta antes de poder ubicarla."
      },
      {
       "id": "a5",
       "rol": "Ayudante de Bodega",
       "texto": "Descarga, paletiza y ubica la mercancía en su posición de anaquel. Es trabajo manual: en un contenedor de la marca representada se bajan del orden de mil ochocientas cajas."
      },
      {
       "id": "a6",
       "rol": "Jefe de Bodega",
       "texto": "Verifica lo recibido contra el documento de embarque y recuenta las referencias que muestran diferencia."
      },
      {
       "id": "a7",
       "rol": "Jefe de Bodega",
       "texto": "Determina si hay sobrante o faltante respecto a lo documentado."
      },
      {
       "id": "a8",
       "rol": "Gerente de Operaciones y Excelencia Logística",
       "texto": "Recibe el reporte de la diferencia y la manda recontar al supervisor del área implicada. Establecer de dónde viene exige revisar hacia atrás los movimientos del producto, porque no hay un registro que ate la incidencia a su embarque; el proceso lo dispara la incidencia, no es una rutina."
      },
      {
       "id": "a9",
       "rol": "Gerente de Operaciones y Excelencia Logística",
       "texto": "Cierra el contenedor en el sistema de gestión de almacén. Hasta que no se cierra, ninguna de sus referencias figura como disponible: la primera caja ubicada espera a la última."
      },
      {
       "id": "a10",
       "rol": "Gerente de Inventario y Precios",
       "texto": "Valida la orden de compra contra lo efectivamente recibido y carga los productos en el inventario del ERP. Tiene que estar pendiente de que la operación del almacén haya terminado para poder actualizar; el enlace entre los dos sistemas existe pero no se usa como parte del proceso."
      },
      {
       "id": "a11",
       "rol": "Gerente de Inventario y Precios",
       "texto": "Confirma las preventas que los vendedores habían tomado sobre el tránsito, amarrando a cada una la mercancía que ya está en bodega. Es en ese momento cuando el vendedor tiene disponibilidad real."
      },
      {
       "id": "a12",
       "rol": "Gerente de Inventario y Precios",
       "texto": "Avisa a los vendedores la disponibilidad de la mercancía recibida."
      },
      {
       "id": "a13",
       "rol": "Gerente de Contabilidad",
       "texto": "Registra en el sistema la factura del pago del flete del embarque."
      },
      {
       "id": "a14",
       "rol": "Gerente de Inventario y Precios",
       "texto": "Ejecuta en el ERP el proceso de costes en destino y fija el costo del producto puesto en Zona Libre o en la bodega de la ciudad, según a dónde haya entrado la carga."
      },
      {
       "id": "a15",
       "rol": "Gerente de Inventario y Precios",
       "texto": "A principio de mes, una vez calculados todos los costes en destino, revisa sobre el reporte de existencias, costos y precios que los fletes no hayan movido los márgenes fuera del rango esperado, y remite a la dirección comercial las referencias que se salen para que decida el precio."
      }
     ],
     "diagrama": {
      "carriles": [
       "Jefa de Tráfico",
       "Gerente de Operaciones y Excelencia Logística",
       "Jefe de Bodega",
       "Ayudante de Bodega",
       "Gerente de Inventario y Precios",
       "Gerente de Contabilidad"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Jefa de Tráfico",
        "tipo": "inicio",
        "n": "Crear el aviso de arribo (ACN)"
       },
       {
        "id": "n1",
        "carril": "Gerente de Operaciones y Excelencia Logística",
        "tipo": "tarea",
        "n": "Tomar y reportar el arribo"
       },
       {
        "id": "n2",
        "carril": "Gerente de Operaciones y Excelencia Logística",
        "tipo": "decision",
        "n": "¿Estaba prevista la carga?"
       },
       {
        "id": "n3",
        "carril": "Gerente de Operaciones y Excelencia Logística",
        "tipo": "tarea",
        "n": "Reacomodar la semana sobre la marcha"
       },
       {
        "id": "n4",
        "carril": "Jefe de Bodega",
        "tipo": "tarea",
        "n": "Dirigir descarga y paletización"
       },
       {
        "id": "n5",
        "carril": "Ayudante de Bodega",
        "tipo": "tarea",
        "n": "Paletizar y ubicar en anaquel",
        "sistemas": [
         "EBS"
        ]
       },
       {
        "id": "n6",
        "carril": "Jefe de Bodega",
        "tipo": "tarea",
        "n": "Verificar contra el documento de embarque"
       },
       {
        "id": "n7",
        "carril": "Jefe de Bodega",
        "tipo": "decision",
        "n": "¿Hay sobrante o faltante?"
       },
       {
        "id": "n8",
        "carril": "Gerente de Operaciones y Excelencia Logística",
        "tipo": "tarea",
        "n": "Mandar recontar y rastrear el origen"
       },
       {
        "id": "n9",
        "carril": "Gerente de Operaciones y Excelencia Logística",
        "tipo": "tarea",
        "n": "Cerrar el contenedor en el almacén",
        "sistemas": [
         "EBS"
        ]
       },
       {
        "id": "n10",
        "carril": "Gerente de Inventario y Precios",
        "tipo": "tarea",
        "n": "Validar la OC y cargar inventario",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n11",
        "carril": "Gerente de Inventario y Precios",
        "tipo": "tarea",
        "n": "Confirmar las preventas del tránsito",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n12",
        "carril": "Gerente de Inventario y Precios",
        "tipo": "tarea",
        "n": "Avisar disponibilidad a los vendedores"
       },
       {
        "id": "n13",
        "carril": "Gerente de Contabilidad",
        "tipo": "tarea",
        "n": "Registrar la factura del flete",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n14",
        "carril": "Gerente de Inventario y Precios",
        "tipo": "tarea",
        "n": "Ejecutar los costes en destino",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n15",
        "carril": "Gerente de Inventario y Precios",
        "tipo": "fin",
        "n": "Costo en destino cargado y márgenes revisados"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3",
        "etq": "No"
       },
       {
        "de": "n2",
        "a": "n4",
        "etq": "Sí"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8",
        "etq": "Sí"
       },
       {
        "de": "n7",
        "a": "n9",
        "etq": "No"
       },
       {
        "de": "n8",
        "a": "n9"
       },
       {
        "de": "n9",
        "a": "n10"
       },
       {
        "de": "n10",
        "a": "n11"
       },
       {
        "de": "n11",
        "a": "n12"
       },
       {
        "de": "n0",
        "a": "n13"
       },
       {
        "de": "n12",
        "a": "n14"
       },
       {
        "de": "n13",
        "a": "n14"
       },
       {
        "de": "n14",
        "a": "n15"
       }
      ]
     }
    }
   },
 "7.2": {
  "nota_version": "Versión As-Is: describe cómo se cuenta hoy el inventario, con los cargos actuales de cada operación. No incorpora mejoras; donde algo falta, se dice que falta. Sin matriz de riesgos ni indicadores: los cuellos de botella se describen dentro del flujo.",
  "proposito": {
   "estado": "borrador",
   "alcance": "El conteo físico del inventario y la explicación de sus diferencias, hasta el ajuste. No incluye la recepción ni los traslados, que son los movimientos que el conteo audita.",
   "texto": "Hoy el inventario se cuenta **una o dos veces al año**. Los conteos por referencia existen como práctica declarada, pero se hacían «muy poco» porque entre recibir contenedores y preparar pedidos no quedaba cuadrilla: la propia gerencia de inventario lo reconoce y sitúa el plan de hacerlos mensuales como intención, no como rutina.\n\nEl conteo general que se cerró en el hub se hizo en dos fines de semana, uno por marca. Y destapó una carencia de fondo: **como no hay sistema de ubicaciones**, hubo que inventar zonas, áreas y pasillos virtuales para poder asignar contadores. Un conteo montado sobre ubicaciones improvisadas no se puede comparar con el siguiente.\n\nLa mecánica sí está definida y es sólida: se cuenta todo; si la referencia coincide, cierra; si no, va a un segundo conteo **con un operario distinto**; si sigue discrepando, a un tercero con el supervisor. Después, las referencias con diferencia por encima de unas diez piezas se auditan revisando todos los movimientos del producto, para localizar ajustes pasados o errores en traslados y ventas. Las diferencias definitivas se comunican a la junta y a contabilidad antes de ajustar — aunque a la junta llega solo el monto total, no el detalle.\n\nHay puntos donde el inventario se sigue llevando **a mano** pese a existir sistemas."
  },
  "dueno": {
   "estado": "borrador",
   "dueno": "Gerente de Inventario y Precios",
   "participantes": [
    "Gerente de Inventario y Precios — responde por los inventarios de todas las ubicaciones, bodegas y tiendas; revisa las diferencias, busca su razón en el histórico del producto y reporta a la junta y a contabilidad.",
    "Gerente de Operaciones y Excelencia Logística — ordena la ejecución del conteo y pone la cuadrilla; fue quien mandó cerrar el último inventario general del hub.",
    "Jefe de Bodega — organiza el conteo en piso y, al no haber ubicaciones, crea las zonas y pasillos virtuales para asignar contadores.",
    "Ayudante de Bodega — cuenta físicamente; el segundo conteo lo hace siempre un operario distinto del primero.",
    "Gerente de Contabilidad — recibe las diferencias definitivas y registra el ajuste.",
    "Junta Directiva — recibe el monto total de la diferencia, no el detalle por referencia."
   ],
   "evidencia": [
    "E-03",
    "E-34",
    "E-42",
    "Lark: Procesos.pdf — Logística/Inventario (PA), sección 5"
   ],
   "notas": "Cargos tomados de la columna «cargo actual» del V4: Gerente de Inventario y Precios, Grte. de Ope. y Exc. Logística, Jefe de Bodega, Ayudante de Bodega y Gerente de Contabilidad, todos de la operación del hub. ⚠️ El patrón propuesto colapsa las dos primeras gerencias en un solo cargo; la versión To-Be de este proceso usa esa denominación única.",
   "sin_evidencia": "No consta una meta de exactitud aprobada ni un calendario de conteos cíclicos en vigor. Tampoco consta cómo se ejecuta el conteo en las operaciones de país distintas de Venezuela, que está normalizando ubicaciones para un sistema nuevo."
  },
  "disparador": {
   "estado": "borrador",
   "disparador": "La decisión de la gerencia de hacer el inventario, normalmente al cierre del año. Fuera de eso, una discrepancia que aparece al preparar un pedido o al recibir un embarque.",
   "cadencia": "Anual en la práctica. Los conteos por categoría o por referencias puntuales se hacían muy poco, y el plan de hacerlos mensuales todavía no está en vigor.",
   "output": "Diferencias explicadas y ajustadas, con el monto total comunicado a la junta y a contabilidad.",
   "evidencia": [
    "E-03",
    "Lark: Procesos.pdf — Logística/Inventario (PA), sección 5"
   ],
   "notas": "El último inventario general del hub se cerró en dos fines de semana, uno por marca."
  },
  "flujo": {
   "estado": "borrador",
   "evidencia": [
    "E-03",
    "E-34",
    "E-42",
    "Lark: Procesos.pdf — Logística/Inventario (PA), sección 5"
   ],
   "actividades": [
    {
     "id": "a1",
     "rol": "Gerente de Operaciones y Excelencia Logística",
     "texto": "Ordena hacer el inventario y libera la cuadrilla, normalmente en fin de semana para no chocar con la operación."
    },
    {
     "id": "a2",
     "rol": "Jefe de Bodega",
     "texto": "Organiza el conteo tomando como referencia lo que dice el sistema y, al no existir ubicaciones, crea zonas, áreas y pasillos virtuales para poder asignar contadores a tramos concretos."
    },
    {
     "id": "a3",
     "rol": "Ayudante de Bodega",
     "texto": "Cuenta todas las unidades de las referencias asignadas."
    },
    {
     "id": "a4",
     "rol": "Jefe de Bodega",
     "texto": "Compara lo contado con el sistema y comprueba si la referencia coincide."
    },
    {
     "id": "a5",
     "rol": "Ayudante de Bodega",
     "texto": "Hace el segundo conteo de las referencias que no coinciden. Lo hace un operario distinto del que contó primero."
    },
    {
     "id": "a6",
     "rol": "Jefe de Bodega",
     "texto": "Hace el tercer conteo con el supervisor cuando el segundo sigue discrepando, y fija la diferencia definitiva."
    },
    {
     "id": "a7",
     "rol": "Gerente de Inventario y Precios",
     "texto": "Audita las referencias con diferencia por encima de unas diez piezas revisando todos los movimientos del producto, para detectar ajustes pasados o errores en traslados y ventas. No reporta un faltante sin haber buscado antes su razón."
    },
    {
     "id": "a8",
     "rol": "Gerente de Inventario y Precios",
     "texto": "Comunica a la junta el monto total de la diferencia —cuánto faltó y cuánto sobró— sin el detalle por referencia, y pasa las diferencias definitivas a contabilidad."
    },
    {
     "id": "a9",
     "rol": "Gerente de Contabilidad",
     "texto": "Registra el ajuste de inventario."
    }
   ],
   "diagrama": {
    "carriles": [
     "Gerente de Operaciones y Excelencia Logística",
     "Jefe de Bodega",
     "Ayudante de Bodega",
     "Gerente de Inventario y Precios",
     "Gerente de Contabilidad"
    ],
    "nodos": [
     {
      "id": "n0",
      "carril": "Gerente de Operaciones y Excelencia Logística",
      "tipo": "inicio",
      "n": "Ordenar el inventario y liberar cuadrilla"
     },
     {
      "id": "n1",
      "carril": "Jefe de Bodega",
      "tipo": "tarea",
      "n": "Crear zonas virtuales y asignar contadores"
     },
     {
      "id": "n2",
      "carril": "Ayudante de Bodega",
      "tipo": "tarea",
      "n": "Contar todas las unidades"
     },
     {
      "id": "n3",
      "carril": "Jefe de Bodega",
      "tipo": "decision",
      "n": "¿La referencia coincide?"
     },
     {
      "id": "n4",
      "carril": "Ayudante de Bodega",
      "tipo": "tarea",
      "n": "Segundo conteo con otro operario"
     },
     {
      "id": "n5",
      "carril": "Jefe de Bodega",
      "tipo": "tarea",
      "n": "Tercer conteo con el supervisor"
     },
     {
      "id": "n6",
      "carril": "Gerente de Inventario y Precios",
      "tipo": "decision",
      "n": "¿La diferencia pasa de diez piezas?"
     },
     {
      "id": "n7",
      "carril": "Gerente de Inventario y Precios",
      "tipo": "tarea",
      "n": "Auditar el histórico de movimientos",
      "sistemas": [
       "Odoo"
      ]
     },
     {
      "id": "n8",
      "carril": "Gerente de Inventario y Precios",
      "tipo": "tarea",
      "n": "Reportar el monto total a la junta"
     },
     {
      "id": "n9",
      "carril": "Gerente de Contabilidad",
      "tipo": "fin",
      "n": "Ajuste registrado en contabilidad",
      "sistemas": [
       "Odoo"
      ]
     }
    ],
    "aristas": [
     {
      "de": "n0",
      "a": "n1"
     },
     {
      "de": "n1",
      "a": "n2"
     },
     {
      "de": "n2",
      "a": "n3"
     },
     {
      "de": "n3",
      "a": "n4",
      "etq": "No"
     },
     {
      "de": "n3",
      "a": "n9",
      "etq": "Sí"
     },
     {
      "de": "n4",
      "a": "n5"
     },
     {
      "de": "n5",
      "a": "n6"
     },
     {
      "de": "n6",
      "a": "n7",
      "etq": "Sí"
     },
     {
      "de": "n6",
      "a": "n8",
      "etq": "No"
     },
     {
      "de": "n7",
      "a": "n8"
     },
     {
      "de": "n8",
      "a": "n9"
     }
    ]
   }
  }
 },
 "7.3": {
  "nota_version": "Versión As-Is: describe cómo se prepara hoy un pedido, siguiendo el manual formal que la operación de Venezuela tiene emitido y firmado. Cargos actuales; sin matriz de riesgos ni indicadores.",
  "proposito": {
   "estado": "borrador",
   "alcance": "Desde que el pedido liberado entra en el sistema de almacén hasta que el bulto queda etiquetado en la bahía de su ruta o agencia. No incluye la facturación ni la entrega.",
   "texto": "Es el único proceso del macroproceso que está **formalizado por escrito**: la operación de Venezuela tiene emitido un manual de procedimientos de almacén y despacho, versión 1.0 de mayo de 2026, firmado por cuatro instancias, con código por procedimiento y responsabilidades definidas para picking, packing y embalaje. Lo que sigue es ese procedimiento, que es lo que se hace.\n\nEl proceso descansa entero en la lectura por radiofrecuencia. El operario escanea **primero la ubicación y después el producto**, de modo que el sistema valide que está donde cree; en la estación de empaque se audita el pedido **unidad por unidad** contra la lista en pantalla, y el sistema bloquea el avance si el artículo no pertenece al pedido o avisa si la cantidad excede lo pedido. Lo sobrante va a una caja de discrepancias.\n\nEl embalaje cambia según por dónde salga el pedido: paletizado y envuelto para flota propia, y **reforzado con doble cinta y precinto de garantía** para agencia externa, por la manipulación de terceros. No se despachan cajas con costura expuesta.\n\nEl plazo declarado es de 48 horas para el pedido normal; el urgente entra por línea dedicada. El almacén no evalúa condiciones del cliente: si el pedido llega liberado, se prepara. En la operación del hub el proceso equivalente se ejecuta sobre un sistema de almacén recién migrado, sin manual propio."
  },
  "dueno": {
   "estado": "borrador",
   "dueno": "Gerente de Almacén (Venezuela)",
   "participantes": [
    "Gerente de Almacén (Venezuela) — emite el procedimiento y responde por la configuración de las ubicaciones en el sistema y por la disponibilidad de los terminales, baterías y red del almacén.",
    "Supervisor(a) de Almacén — monitorea la cola de pedidos, asigna las olas de recolección por prioridad o zona, resuelve los faltantes de ubicación y autoriza la re-recolección o el ajuste cuando un pedido queda retenido por diferencia.",
    "Ayudante de Almacén — ejecuta la recolección, la auditoría por escaneo en la estación de empaque y el embalaje, pesaje y etiquetado del bulto.",
    "Jefe de Despacho — recibe el bulto terminado en la zona de embarque y lo clasifica por ruta o agencia."
   ],
   "evidencia": [
    "Lark: Procedimientos de Almacén y Despacho V1.0 (VE), procedimientos 2005-ALM-2026#1, #2 y #3",
    "E-34",
    "E-03"
   ],
   "notas": "Cargos tomados de la columna «cargo actual» del V4 en la operación de Venezuela, que es donde el procedimiento está emitido: Gerente de Almacén, Supervisor(a) de Almacén, Ayudante de Almacén y Jefe de Despacho. El manual distingue tres perfiles operativos —picker, packer y embalador— que son el mismo cargo desempeñando tres funciones; se indica en cada actividad cuál.",
   "sin_evidencia": "No consta procedimiento escrito equivalente en la operación del hub ni en las demás; el hub ejecuta pasos parecidos sobre un sistema de almacén recién migrado, sin manual propio."
  },
  "disparador": {
   "estado": "borrador",
   "disparador": "La llegada al sistema de almacén del pedido de venta ya liberado y aprobado comercialmente. El almacén se entera por el sistema, no por el vendedor.",
   "cadencia": "Continua durante la jornada. El pedido normal tiene 48 horas para despacharse; el urgente entra marcado como tal y se atiende con prioridad.",
   "output": "Bulto embalado, pesado, medido y etiquetado, en la bahía de la ruta o agencia que le corresponde.",
   "evidencia": [
    "Lark: Procedimientos de Almacén y Despacho V1.0 (VE)",
    "E-34"
   ],
   "notas": "El filtro de condiciones del cliente lo hace la gerencia de ventas antes de liberar: el almacén recibe el pedido ya apto y no evalúa deuda ni negociación."
  },
  "flujo": {
   "estado": "borrador",
   "evidencia": [
    "Lark: Procedimientos de Almacén y Despacho V1.0 (VE)",
    "E-34",
    "E-03"
   ],
   "actividades": [
    {
     "id": "a1",
     "rol": "Supervisor(a) de Almacén",
     "texto": "Monitorea la cola de pedidos liberados en el sistema y genera la ola de recolección, asignándola al terminal del operario disponible según prioridad y zona. El pedido trae marcado si es normal o urgente."
    },
    {
     "id": "a2",
     "rol": "Ayudante de Almacén",
     "texto": "Como recolector, activa la tarea en su terminal y recorre la ruta que el sistema optimiza por pasillo, estantería y nivel. Escanea primero el código de la ubicación para confirmar que está en el sitio correcto, y después el del producto."
    },
    {
     "id": "a3",
     "rol": "Ayudante de Almacén",
     "texto": "Confirma la cantidad recolectada. Si el sistema da conformidad, la unidad queda rebajada de la ubicación y el terminal lo manda a la siguiente."
    },
    {
     "id": "a4",
     "rol": "Supervisor(a) de Almacén",
     "texto": "Resuelve el faltante cuando la ubicación no tiene lo esperado: reasigna desde otra ubicación o retiene la línea."
    },
    {
     "id": "a5",
     "rol": "Ayudante de Almacén",
     "texto": "Traslada lo recolectado a la estación de empaque y cierra la ola, con lo que el pedido entra en la cola de auditoría."
    },
    {
     "id": "a6",
     "rol": "Ayudante de Almacén",
     "texto": "Como empacador, revisa visualmente cada producto —empaque sin roturas ni abolladuras, sellos de fábrica intactos— y separa lo dañado, reportándolo en el sistema para que se reponga."
    },
    {
     "id": "a7",
     "rol": "Ayudante de Almacén",
     "texto": "Audita el pedido escaneando cada unidad contra la lista en pantalla. El sistema bloquea el avance si el artículo no pertenece al pedido y avisa si la cantidad excede lo solicitado; lo sobrante va a la caja de discrepancias para devolverse al anaquel."
    },
    {
     "id": "a8",
     "rol": "Supervisor(a) de Almacén",
     "texto": "Audita los pedidos retenidos por diferencia y autoriza la re-recolección o el ajuste."
    },
    {
     "id": "a9",
     "rol": "Ayudante de Almacén",
     "texto": "Cierra el empaque con el pedido cuadrado, lo que lo habilita para facturar y lo dirige a la mesa de embalaje."
    },
    {
     "id": "a10",
     "rol": "Ayudante de Almacén",
     "texto": "Como embalador, selecciona el embalaje según el canal: paletizado y envuelto con película estirable para flota propia; doble capa de cinta y precinto de garantía para agencia de envíos. No se despachan cajas con debilidad estructural o costura expuesta."
    },
    {
     "id": "a11",
     "rol": "Ayudante de Almacén",
     "texto": "Pesa y mide cada bulto, imprime y pega la etiqueta con número de pedido, cliente, dirección, canal de envío y numeración correlativa del bulto."
    },
    {
     "id": "a12",
     "rol": "Jefe de Despacho",
     "texto": "Recibe los bultos en la zona de embarque y los clasifica en la bahía de su ruta o agencia, cerrando el ciclo interno de preparación."
    }
   ],
   "diagrama": {
    "carriles": [
     "Supervisor(a) de Almacén",
     "Ayudante de Almacén",
     "Jefe de Despacho"
    ],
    "nodos": [
     {
      "id": "n0",
      "carril": "Supervisor(a) de Almacén",
      "tipo": "inicio",
      "n": "Generar la ola de recolección",
      "sistemas": [
       "WMS"
      ]
     },
     {
      "id": "n1",
      "carril": "Ayudante de Almacén",
      "tipo": "tarea",
      "n": "Escanear ubicación y luego producto",
      "sistemas": [
       "WMS"
      ]
     },
     {
      "id": "n2",
      "carril": "Ayudante de Almacén",
      "tipo": "decision",
      "n": "¿La ubicación tiene lo esperado?"
     },
     {
      "id": "n3",
      "carril": "Supervisor(a) de Almacén",
      "tipo": "tarea",
      "n": "Reasignar ubicación o retener la línea"
     },
     {
      "id": "n4",
      "carril": "Ayudante de Almacén",
      "tipo": "tarea",
      "n": "Cerrar la ola y llevar a empaque",
      "sistemas": [
       "WMS"
      ]
     },
     {
      "id": "n5",
      "carril": "Ayudante de Almacén",
      "tipo": "tarea",
      "n": "Revisar calidad y auditar por escaneo",
      "sistemas": [
       "WMS"
      ]
     },
     {
      "id": "n6",
      "carril": "Ayudante de Almacén",
      "tipo": "decision",
      "n": "¿El pedido queda cuadrado?"
     },
     {
      "id": "n7",
      "carril": "Supervisor(a) de Almacén",
      "tipo": "tarea",
      "n": "Autorizar re-recolección o ajuste"
     },
     {
      "id": "n8",
      "carril": "Ayudante de Almacén",
      "tipo": "tarea",
      "n": "Embalar según el canal de salida"
     },
     {
      "id": "n9",
      "carril": "Ayudante de Almacén",
      "tipo": "tarea",
      "n": "Pesar, medir y etiquetar el bulto"
     },
     {
      "id": "n10",
      "carril": "Jefe de Despacho",
      "tipo": "fin",
      "n": "Bulto en la bahía de su ruta o agencia"
     }
    ],
    "aristas": [
     {
      "de": "n0",
      "a": "n1"
     },
     {
      "de": "n1",
      "a": "n2"
     },
     {
      "de": "n2",
      "a": "n3",
      "etq": "No"
     },
     {
      "de": "n2",
      "a": "n4",
      "etq": "Sí"
     },
     {
      "de": "n3",
      "a": "n4"
     },
     {
      "de": "n4",
      "a": "n5"
     },
     {
      "de": "n5",
      "a": "n6"
     },
     {
      "de": "n6",
      "a": "n7",
      "etq": "No"
     },
     {
      "de": "n6",
      "a": "n8",
      "etq": "Sí"
     },
     {
      "de": "n7",
      "a": "n8"
     },
     {
      "de": "n8",
      "a": "n9"
     },
     {
      "de": "n9",
      "a": "n10"
     }
    ]
   }
  }
 },
 "7.4": {
  "nota_version": "Versión As-Is: describe cómo se factura hoy el pedido preparado. Cargos actuales; sin matriz de riesgos ni indicadores.",
  "proposito": {
   "estado": "borrador",
   "alcance": "Desde que el pedido auditado llega desde empaque hasta que se traspasa a despacho con su documentación. No incluye la causación contable ni la conciliación de cobranzas.",
   "texto": "Lo sostiene **una sola persona** en la operación del país: la analista de logística recibe el pedido ya escaneado y verificado por almacén, lo coteja contra el pedido original —cantidades, colores, códigos—, comprueba que el cliente no esté en retención ni con crédito vencido, emite la factura y entrega el pedido al despacho.\n\nEs el único punto entre la bodega y la calle donde se comprueba que lo que sale coincide con lo que se vendió. Y el reparto de la función no está resuelto: la propia gerencia de operaciones del hub señala que **tráfico también factura** y lo declara zona a revisar; en el hub, varias personas del departamento de tráfico emiten factura además de sus funciones de importación y exportación.\n\nEl levantamiento de este proceso en la operación de Venezuela existe como plantilla de cinco fases con los responsables anotados, y **sin un solo paso desarrollado**."
  },
  "dueno": {
   "estado": "borrador",
   "dueno": "Analista de Logística (Venezuela)",
   "participantes": [
    "Analista de Logística (Venezuela) — recibe el pedido verificado, lo coteja contra el original, comprueba el estado del cliente, emite la factura y la entrega a despacho. Es el único puesto que lo hace en la operación.",
    "Supervisor(a) de Almacén — entrega el pedido escaneado y embalado.",
    "Jefe de Despacho — recibe el pedido facturado con su documentación y lo incorpora a la programación de salida.",
    "Gerente de Ventas (Venezuela) — hace antes el filtro de condiciones comerciales; si el pedido llegó al almacén es porque ya lo pasó.",
    "Jefa de Tráfico (Panamá) — en el hub, su departamento también emite factura, además de aduana, movimiento interno y liquidaciones."
   ],
   "evidencia": [
    "E-34",
    "E-03",
    "E-70",
    "Lark: flujo logistico.xlsx — hoja facturación (VE)"
   ],
   "notas": "Cargos tomados de la columna «cargo actual» del V4: Analista de Logística y Jefa de Tráfico. El manual interno de Venezuela llama a la primera «asistente administrativo de logística», que es la misma persona y función. ⚠️ El mapa v18 atribuye el proceso a un auxiliar de bodega y tráfico.",
   "sin_evidencia": "No consta cómo se reparte exactamente la emisión de facturas entre logística y tráfico en el hub, ni con qué criterio: la gerencia lo señala como zona a revisar sin describir el reparto actual. Tampoco consta quién factura cuando la analista no está."
  },
  "disparador": {
   "estado": "borrador",
   "disparador": "La llegada del pedido escaneado, verificado y embalado desde el área de empaque.",
   "cadencia": "Continua durante la jornada.",
   "output": "Factura emitida y pedido traspasado a tránsito con su documentación: factura, guía y permisología cuando la ruta la exija.",
   "evidencia": [
    "E-34",
    "Lark: flujo logistico.xlsx — hoja facturación (VE)"
   ],
   "notas": "La hoja del levantamiento correspondiente a este proceso solo contiene el esquema de fases y los responsables."
  },
  "flujo": {
   "estado": "borrador",
   "evidencia": [
    "E-34",
    "E-03",
    "E-70",
    "Lark: flujo logistico.xlsx — hoja facturación (VE)"
   ],
   "actividades": [
    {
     "id": "a1",
     "rol": "Supervisor(a) de Almacén",
     "texto": "Entrega el pedido escaneado, verificado y embalado."
    },
    {
     "id": "a2",
     "rol": "Analista de Logística (Venezuela)",
     "texto": "Coteja el pedido contra el original: cantidades, colores y códigos, para detectar cualquier sustitución hecha durante la preparación."
    },
    {
     "id": "a3",
     "rol": "Analista de Logística (Venezuela)",
     "texto": "Comprueba en el sistema que el cliente no esté en retención ni con crédito vencido que impida la salida."
    },
    {
     "id": "a4",
     "rol": "Gerente de Ventas (Venezuela)",
     "texto": "Resuelve el pedido retenido: lo libera bajo su criterio, lo ajusta o lo deja en espera. La decisión se resuelve por conversación."
    },
    {
     "id": "a5",
     "rol": "Analista de Logística (Venezuela)",
     "texto": "Emite la factura de venta en el sistema y arma la documentación que acompaña al pedido, incluida la guía y la permisología cuando la ruta foránea la exija."
    },
    {
     "id": "a6",
     "rol": "Analista de Logística (Venezuela)",
     "texto": "Entrega el pedido facturado al despacho."
    },
    {
     "id": "a7",
     "rol": "Jefe de Despacho",
     "texto": "Recibe el pedido con su documentación y lo incorpora a la programación de salida del día."
    }
   ],
   "diagrama": {
    "carriles": [
     "Supervisor(a) de Almacén",
     "Analista de Logística (Venezuela)",
     "Gerente de Ventas (Venezuela)",
     "Jefe de Despacho"
    ],
    "nodos": [
     {
      "id": "n0",
      "carril": "Supervisor(a) de Almacén",
      "tipo": "inicio",
      "n": "Entregar el pedido verificado"
     },
     {
      "id": "n1",
      "carril": "Analista de Logística (Venezuela)",
      "tipo": "tarea",
      "n": "Cotejar contra el pedido original"
     },
     {
      "id": "n2",
      "carril": "Analista de Logística (Venezuela)",
      "tipo": "decision",
      "n": "¿El cliente puede recibir?"
     },
     {
      "id": "n3",
      "carril": "Gerente de Ventas (Venezuela)",
      "tipo": "tarea",
      "n": "Resolver la retención por conversación"
     },
     {
      "id": "n4",
      "carril": "Analista de Logística (Venezuela)",
      "tipo": "tarea",
      "n": "Emitir factura y armar documentación",
      "sistemas": [
       "Odoo"
      ]
     },
     {
      "id": "n5",
      "carril": "Analista de Logística (Venezuela)",
      "tipo": "tarea",
      "n": "Entregar el pedido a despacho"
     },
     {
      "id": "n6",
      "carril": "Jefe de Despacho",
      "tipo": "fin",
      "n": "Pedido en la programación de salida"
     }
    ],
    "aristas": [
     {
      "de": "n0",
      "a": "n1"
     },
     {
      "de": "n1",
      "a": "n2"
     },
     {
      "de": "n2",
      "a": "n3",
      "etq": "No"
     },
     {
      "de": "n2",
      "a": "n4",
      "etq": "Sí"
     },
     {
      "de": "n3",
      "a": "n4"
     },
     {
      "de": "n4",
      "a": "n5"
     },
     {
      "de": "n5",
      "a": "n6"
     }
    ]
   }
  }
 },
 "7.5": {
  "nota_version": "Versión As-Is: describe cómo se entrega hoy la mercancía, siguiendo los tres procedimientos formales de la operación de Venezuela. Cargos actuales; sin matriz de riesgos ni indicadores.",
  "proposito": {
   "estado": "borrador",
   "alcance": "Desde que el pedido facturado llega a la zona de despacho hasta que el destinatario lo recibe y el documento firmado vuelve. Cubre las tres vías: flota propia, agencia de envíos y retiro del cliente.",
   "texto": "Las tres vías de entrega están **formalizadas por escrito** en la operación de Venezuela, con procedimiento propio cada una, emitidos en mayo de 2026 y firmados por cuatro instancias.\n\nLa flota propia es la vía más controlada: la gerencia consolida diariamente los pedidos facturados y los agrupa por zona para armar rutas; antes de estibar, **el conductor y el supervisor cuentan juntos** la carga —que es el punto donde la responsabilidad cambia de manos—; en la puerta, el vigilante coteja precintos, placas, identidad del conductor y carga contra la factura, y estampa la autorización de salida con la hora. En destino, conductor y receptor revisan juntos el estado y la cantidad, y el receptor firma con nombre, identificación, fecha, hora y sello. Al cerrar la ruta, el supervisor valida que no falte firma ni sello y cierra la orden para avisar al vendedor.\n\nLa salida por agencia —las empresas de encomienda nacionales— exige embalaje reforzado y el registro de los datos del destinatario, y se gestiona pidiendo la recolecta por el portal de la agencia o entregando en sus instalaciones, con firma del transportista como constancia.\n\nEl retiro directo se atiende en el piso de entrega cuando son cantidades pequeñas y en la zona de carga cuando pasan de dos cajas, previa validación de la factura original y la identificación.\n\nHay además rutas foráneas a varias ciudades del país que se apoyan en una empresa de transporte de terceros con la que se trabaja desde hace años."
  },
  "dueno": {
   "estado": "borrador",
   "dueno": "Jefe de Despacho",
   "participantes": [
    "Jefe de Despacho — supervisa el flujo de pedidos acondicionados, valida la emisión de guías, coordina con las agencias y cierra la orden cuando vuelven los documentos firmados.",
    "Gerente de Almacén (Venezuela) — consolida los pedidos del día, agrupa por zona geográfica y asigna vehículo y personal a cada ruta.",
    "Líder de Despacho — organiza la carga en el andén y la entrega al transportista o al conductor.",
    "Chofer de flota propia — cuenta la carga con el supervisor, custodia mercancía y documentos en tránsito, entrega con inspección conjunta y retorna los documentos firmados. ⚠️ Cargo sin equivalencia en el patrón V4.",
    "Personal de seguridad — coteja precintos, placas, identidad y carga contra la documentación antes de autorizar la salida. ⚠️ Cargo sin equivalencia en el patrón V4.",
    "Analista de Logística (Venezuela) — emite la documentación legal y registra los datos de envío que exige cada agencia.",
    "Empresa de transporte de terceros (externo) — cubre las rutas foráneas del país.",
    "Agencias de envío (externo) — encomiendas nacionales bajo modalidad de casillero, agencia destino o puerta a puerta."
   ],
   "evidencia": [
    "Lark: Procedimientos de Almacén y Despacho V1.0 (VE), procedimientos 1905-DESP-2026#1, #2 y #3",
    "E-34",
    "E-03",
    "E-19"
   ],
   "notas": "Cargos tomados de la columna «cargo actual» del V4 en la operación de Venezuela: Jefe de Despacho, Líder de Despacho, Gerente de Almacén y Analista de Logística. ⚠️ **El patrón no contempla chofer ni personal de seguridad**, y el procedimiento formal les asigna pasos de control obligatorios: el conteo conjunto antes de estibar y el cotejo en puerta. Se usan las denominaciones del propio manual.",
   "sin_evidencia": "No consta qué ocurre cuando el documento firmado no vuelve o vuelve incompleto: el procedimiento exige validarlo al cierre de ruta, pero no describe el tratamiento de la excepción."
  },
  "disparador": {
   "estado": "borrador",
   "disparador": "El pedido facturado que llega a la zona de despacho con su documentación completa.",
   "cadencia": "Continua, con consolidación diaria de rutas. El pedido normal se entrega dentro de las 48 horas; el urgente tiene prioridad.",
   "output": "Mercancía entregada con el documento firmado y sellado por el receptor, orden cerrada en el sistema y vendedor avisado.",
   "evidencia": [
    "Lark: Procedimientos de Almacén y Despacho V1.0 (VE)",
    "E-34"
   ],
   "notas": "El cierre del ciclo es explícito en el procedimiento de flota propia: no se cierra la orden hasta validar que no falte ninguna firma ni sello."
  },
  "flujo": {
   "estado": "borrador",
   "evidencia": [
    "Lark: Procedimientos de Almacén y Despacho V1.0 (VE), procedimientos 1905-DESP-2026#1, #2 y #3",
    "E-34",
    "E-03"
   ],
   "actividades": [
    {
     "id": "a1",
     "rol": "Gerente de Almacén (Venezuela)",
     "texto": "Consolida diariamente los pedidos facturados y liberados, los agrupa por zona geográfica y programa las rutas, asignando a cada una vehículo, conductor y ayudante según volumen y peso."
    },
    {
     "id": "a2",
     "rol": "Jefe de Despacho",
     "texto": "Determina por qué vía sale cada pedido: flota propia, agencia de envíos o retiro del cliente."
    },
    {
     "id": "a3",
     "rol": "Chofer de flota propia",
     "texto": "Cuenta la carga junto al supervisor antes de estibar e inspecciona el estado de las cajas. Es el punto donde la responsabilidad sobre la mercancía pasa del almacén al transporte."
    },
    {
     "id": "a4",
     "rol": "Personal de seguridad",
     "texto": "Coteja en la caseta los precintos, las placas del vehículo, la identidad del conductor y, de forma ocular, que la carga coincida con la factura o guía. Estampa el sello de salida autorizada y registra la hora de partida."
    },
    {
     "id": "a5",
     "rol": "Chofer de flota propia",
     "texto": "Entrega en destino con inspección conjunta: descarga, revisión del estado de los empaques y conteo con el receptor autorizado, que firma con nombre, identificación, fecha, hora y sello. Cualquier inconformidad se asienta en el documento y se comunica al supervisor."
    },
    {
     "id": "a6",
     "rol": "Líder de Despacho",
     "texto": "Gestiona la salida por agencia: solicita la recolecta en el portal del courier o entrega en sus instalaciones, valida con el transportista la cantidad de bultos y obtiene su firma en la nota de entrega interna como constancia."
    },
    {
     "id": "a7",
     "rol": "Líder de Despacho",
     "texto": "Atiende el retiro directo del cliente: valida factura original o autorización e identificación, comprueba que el pedido esté liberado y con el pago conforme, y realiza la inspección conjunta y la entrega contra firma. Las cantidades pequeñas se entregan en el piso de entrega y las mayores en la zona de carga."
    },
    {
     "id": "a8",
     "rol": "Analista de Logística (Venezuela)",
     "texto": "Emite la documentación legal y registra los datos que exige la agencia: nombre, casillero, dirección de destino y contacto, y si el envío es prepagado o con cobro en destino."
    },
    {
     "id": "a9",
     "rol": "Jefe de Despacho",
     "texto": "Recibe al cierre de ruta todas las copias firmadas por los clientes, valida que no falte ninguna firma ni sello y cierra la orden en el sistema para avisar al vendedor de la entrega."
    }
   ],
   "diagrama": {
    "carriles": [
     "Gerente de Almacén (Venezuela)",
     "Jefe de Despacho",
     "Chofer de flota propia",
     "Personal de seguridad",
     "Líder de Despacho",
     "Analista de Logística (Venezuela)"
    ],
    "nodos": [
     {
      "id": "n0",
      "carril": "Gerente de Almacén (Venezuela)",
      "tipo": "inicio",
      "n": "Consolidar pedidos y programar rutas"
     },
     {
      "id": "n1",
      "carril": "Jefe de Despacho",
      "tipo": "decision",
      "n": "¿Por qué vía sale el pedido?"
     },
     {
      "id": "n2",
      "carril": "Chofer de flota propia",
      "tipo": "tarea",
      "n": "Contar la carga con el supervisor"
     },
     {
      "id": "n3",
      "carril": "Personal de seguridad",
      "tipo": "tarea",
      "n": "Cotejar en puerta y autorizar salida"
     },
     {
      "id": "n4",
      "carril": "Chofer de flota propia",
      "tipo": "tarea",
      "n": "Entregar con inspección conjunta y firma"
     },
     {
      "id": "n5",
      "carril": "Analista de Logística (Venezuela)",
      "tipo": "tarea",
      "n": "Registrar datos de envío de la agencia"
     },
     {
      "id": "n6",
      "carril": "Líder de Despacho",
      "tipo": "tarea",
      "n": "Entregar a la agencia contra firma"
     },
     {
      "id": "n7",
      "carril": "Líder de Despacho",
      "tipo": "tarea",
      "n": "Atender el retiro directo del cliente"
     },
     {
      "id": "n8",
      "carril": "Jefe de Despacho",
      "tipo": "fin",
      "n": "Documentos validados y orden cerrada",
      "sistemas": [
       "Odoo"
      ]
     }
    ],
    "aristas": [
     {
      "de": "n0",
      "a": "n1"
     },
     {
      "de": "n1",
      "a": "n2",
      "etq": "Flota propia"
     },
     {
      "de": "n1",
      "a": "n5",
      "etq": "Agencia"
     },
     {
      "de": "n1",
      "a": "n7",
      "etq": "Cliente retira"
     },
     {
      "de": "n2",
      "a": "n3"
     },
     {
      "de": "n3",
      "a": "n4"
     },
     {
      "de": "n4",
      "a": "n8"
     },
     {
      "de": "n5",
      "a": "n6"
     },
     {
      "de": "n6",
      "a": "n8"
     },
     {
      "de": "n7",
      "a": "n8"
     }
    ]
   }
  }
 },
 "7.6": {
  "nota_version": "Versión As-Is: describe cómo se trae hoy la mercancía desde el proveedor hasta la puerta del almacén. Cargos actuales; sin matriz de riesgos ni indicadores.",
  "proposito": {
   "estado": "borrador",
   "alcance": "El seguimiento del embarque, la gestión con el agente aduanal, la permisología del país y el pago de tributos, hasta el aviso de arribo con el que arranca la recepción. No incluye la decisión de compra ni la recepción física.",
   "texto": "En el hub, el tráfico es un **departamento formal** con jefatura propia: una persona lleva importación —y algo de exportación— y tres llevan exportación. Hacen aduana, movimiento interno dentro de la zona franca, contacto con el proveedor de fletes, y las liquidaciones. Llevan su control en hojas de cálculo compartidas donde registran traspasos, liquidaciones y memoriales, con un cálculo propio para la adición del flete según el cliente.\n\nEn la operación de país el esquema es otro: no hay departamento. La gerencia de operaciones recibe por correo desde el hub el conocimiento de embarque, la factura y el documento de salida de mercancía; **revisa que los documentos cuadren entre sí** antes de pasarlos, y se los entrega al agente aduanal con los códigos arancelarios, las cantidades y los costos. La permisología previa —cuando el producto la exige— la lleva una persona de recepción a la que se le delegó esa gestión, en contacto directo con el hub para obtener las certificaciones del producto. Tesorería paga los impuestos para liberar.\n\nEl agujero del proceso no está aquí sino aguas arriba: **la información de la compra no baja**. Un contenedor que tarda entre sesenta y noventa días se conoce dos días antes, y la carga aérea con frecuencia no viene rastreada porque el proveedor no comparte el seguimiento."
  },
  "dueno": {
   "estado": "borrador",
   "dueno": "Jefa de Tráfico (Panamá)",
   "participantes": [
    "Jefa de Tráfico (Panamá) — dirige el departamento del hub: aduana, movimiento interno, contacto con el proveedor de fletes y liquidaciones. Su equipo emite también facturas.",
    "Asistente de Tráfico (Panamá) — lleva la importación y parte de la exportación; arma el cuadro de seguimiento con las fechas estimadas de llegada a partir de lo que manda el operador de carga.",
    "Gerente de Operaciones y Logística (Venezuela) — en la operación de país asume la función: revisa que los documentos del embarque cuadren y los entrega al agente aduanal. También asume de hecho la permisología, al no haber un área legal.",
    "Asistente Administrativo (Venezuela) — gestión delegada de los permisos previos, en contacto directo con el hub para las certificaciones de producto.",
    "Coordinador(a) de Tesorería (Venezuela) — paga los impuestos y tasas que liberan la carga.",
    "Agente aduanal (externo) — presenta la declaración, atiende el reconocimiento y liquida.",
    "Operador de carga (externo) — transporta y reporta la fecha estimada de llegada; entrega la factura del flete."
   ],
   "evidencia": [
    "E-03",
    "E-34",
    "E-70",
    "E-19"
   ],
   "notas": "Cargos tomados de la columna «cargo actual» del V4: Jefa de Tráfico y Asistente de Tráfico en el hub; Gerente de Operaciones y Logística, Asistente Administrativo y Coordinador(a) de Tesorería en la operación de Venezuela. ⚠️ El mapa v18 atribuye el proceso a una coordinación de logística y bodega que no es quien lo ejecuta en ninguna de las dos operaciones.",
   "sin_evidencia": "No consta una lista por país de qué producto exige qué permiso: el requisito se resuelve por la experiencia de quien lo ha tramitado antes. Tampoco consta procedimiento escrito para este proceso en ninguna operación."
  },
  "disparador": {
   "estado": "borrador",
   "disparador": "La llegada de los documentos del embarque desde el origen —conocimiento de embarque, factura y documento de salida— o, en parte de los casos, el aviso del agente aduanal de que la carga ya llegó. No hay hito anterior que anticipe el embarque.",
   "cadencia": "Continua para los tránsitos activos; por evento en cada arribo.",
   "output": "Mercancía nacionalizada con permisos e impuestos pagados, y aviso al almacén de que puede descargarse.",
   "evidencia": [
    "E-03",
    "E-34"
   ],
   "notas": "El seguimiento arranca con los documentos, no con la compra: la orden colocada no abre visibilidad para tráfico ni para el almacén."
  },
  "flujo": {
   "estado": "borrador",
   "evidencia": [
    "E-03",
    "E-34",
    "E-70",
    "E-19"
   ],
   "actividades": [
    {
     "id": "a1",
     "rol": "Operador de carga (externo)",
     "texto": "Manda la factura del flete y un borrador con la información del embarque, incluida la fecha en la que debería llegar."
    },
    {
     "id": "a2",
     "rol": "Asistente de Tráfico (Panamá)",
     "texto": "Captura esa información y arma el cuadro de seguimiento con la fecha de salida y la de llegada estimada de cada embarque."
    },
    {
     "id": "a3",
     "rol": "Gerente de Operaciones y Logística (Venezuela)",
     "texto": "Recibe del hub el conocimiento de embarque, la factura y el documento de salida de mercancía, y revisa que coincidan entre sí antes de dar ningún paso."
    },
    {
     "id": "a4",
     "rol": "Gerente de Operaciones y Logística (Venezuela)",
     "texto": "Comprueba si la mercancía exige permiso previo en el país de destino."
    },
    {
     "id": "a5",
     "rol": "Asistente Administrativo (Venezuela)",
     "texto": "Tramita el permiso ante el organismo que corresponda, pidiendo al hub la certificación del producto y avisando cuando queda aprobado. Es una gestión delegada: la persona la asumió sin que sea su función original."
    },
    {
     "id": "a6",
     "rol": "Gerente de Operaciones y Logística (Venezuela)",
     "texto": "Entrega al agente aduanal el expediente con los códigos arancelarios, las cantidades y los costos. Retiene el embarque en origen si detecta que falta un permiso: no sale hasta que lo tenga."
    },
    {
     "id": "a7",
     "rol": "Agente aduanal (externo)",
     "texto": "Presenta la declaración, atiende el reconocimiento cuando la aduana lo determina y liquida los tributos."
    },
    {
     "id": "a8",
     "rol": "Coordinador(a) de Tesorería (Venezuela)",
     "texto": "Paga los impuestos y tasas para que la carga se libere."
    },
    {
     "id": "a9",
     "rol": "Jefa de Tráfico (Panamá)",
     "texto": "En los movimientos dentro de la zona franca, hace la liquidación interna y el traslado de la carga, y registra la operación en la hoja compartida del departamento junto a traspasos y memoriales."
    },
    {
     "id": "a10",
     "rol": "Gerente de Operaciones y Logística (Venezuela)",
     "texto": "Confirma la liberación y avisa al almacén de que la carga puede descargarse. El aviso llega con poco margen: un contenedor de sesenta a noventa días de tránsito se conoce dos días antes."
    }
   ],
   "diagrama": {
    "carriles": [
     "Operador de carga (externo)",
     "Asistente de Tráfico (Panamá)",
     "Gerente de Operaciones y Logística (Venezuela)",
     "Asistente Administrativo (Venezuela)",
     "Agente aduanal (externo)",
     "Coordinador(a) de Tesorería (Venezuela)",
     "Jefa de Tráfico (Panamá)"
    ],
    "nodos": [
     {
      "id": "n0",
      "carril": "Operador de carga (externo)",
      "tipo": "inicio",
      "n": "Mandar documentos y fecha estimada"
     },
     {
      "id": "n1",
      "carril": "Asistente de Tráfico (Panamá)",
      "tipo": "tarea",
      "n": "Armar el cuadro de seguimiento",
      "sistemas": [
       "Excel"
      ]
     },
     {
      "id": "n2",
      "carril": "Gerente de Operaciones y Logística (Venezuela)",
      "tipo": "tarea",
      "n": "Revisar que los documentos cuadren"
     },
     {
      "id": "n3",
      "carril": "Gerente de Operaciones y Logística (Venezuela)",
      "tipo": "decision",
      "n": "¿Exige permiso previo?"
     },
     {
      "id": "n4",
      "carril": "Asistente Administrativo (Venezuela)",
      "tipo": "tarea",
      "n": "Tramitar el permiso con el hub"
     },
     {
      "id": "n5",
      "carril": "Gerente de Operaciones y Logística (Venezuela)",
      "tipo": "tarea",
      "n": "Entregar el expediente al agente"
     },
     {
      "id": "n6",
      "carril": "Agente aduanal (externo)",
      "tipo": "tarea",
      "n": "Declarar, atender aforo y liquidar"
     },
     {
      "id": "n7",
      "carril": "Coordinador(a) de Tesorería (Venezuela)",
      "tipo": "tarea",
      "n": "Pagar impuestos y tasas"
     },
     {
      "id": "n8",
      "carril": "Jefa de Tráfico (Panamá)",
      "tipo": "tarea",
      "n": "Liquidar y trasladar dentro de zona franca",
      "sistemas": [
       "Excel"
      ]
     },
     {
      "id": "n9",
      "carril": "Gerente de Operaciones y Logística (Venezuela)",
      "tipo": "fin",
      "n": "Aviso al almacén con poco margen"
     }
    ],
    "aristas": [
     {
      "de": "n0",
      "a": "n1"
     },
     {
      "de": "n1",
      "a": "n2"
     },
     {
      "de": "n2",
      "a": "n3"
     },
     {
      "de": "n3",
      "a": "n4",
      "etq": "Sí"
     },
     {
      "de": "n3",
      "a": "n5",
      "etq": "No"
     },
     {
      "de": "n4",
      "a": "n5"
     },
     {
      "de": "n5",
      "a": "n6"
     },
     {
      "de": "n6",
      "a": "n7"
     },
     {
      "de": "n0",
      "a": "n8"
     },
     {
      "de": "n7",
      "a": "n9"
     },
     {
      "de": "n8",
      "a": "n9"
     }
    ]
   }
  }
 },
 "7.7": {
  "nota_version": "Versión As-Is: describe cómo se gestiona hoy lo que el cliente devuelve. Cargos actuales; sin matriz de riesgos ni indicadores.",
  "proposito": {
   "estado": "borrador",
   "alcance": "Desde que el producto devuelto llega hasta que se resuelve: reemplazo, reparación o desecho. No incluye el diagnóstico técnico en sí.",
   "texto": "La operación de Venezuela tiene resuelto lo esencial con **dos bodegas separadas**: una para la mercancía de garantía disponible para reemplazo y otra de desecho, que es de entrada y no de salida — lo que entra ahí ya no vuelve a circular. Una persona está dedicada a garantías, con **cortes en dos momentos fijos del día**, y los volúmenes por corte llegan a varios cientos de unidades.\n\nEse corte es precisamente el cuello de botella, y lo señala el propio equipo de servicio técnico: **antes tenían la mercancía a mano para el cambio directo y ahora la piden al almacén**, de modo que dependen de esos dos tiempos al día. Un caso que llega después del corte espera al siguiente.\n\nEl desenlace depende de la marca. La propia **no se repara**: no hay piezas ni cambio de batería, se trabaja sobre una carta de garantía y se resuelve por reemplazo. La representada sí tiene reparación real, a cargo de un relojero.\n\nDos huecos quedan abiertos. El caso se abre cuando el producto llega al área central, no en la tienda donde el cliente lo entregó, así que entre ambos momentos nadie puede decirle en qué estado está. Y la **baja contable de lo acumulado en desecho no se ha hecho nunca**: se reconoce como pendiente, sin periodicidad establecida."
  },
  "dueno": {
   "estado": "borrador",
   "dueno": "Gerente de Almacén (Venezuela)",
   "participantes": [
    "Gerente de Almacén (Venezuela) — responde por las dos bodegas de garantía y desecho, autoriza los traslados de reemplazo y hace los cortes diarios.",
    "Asistente de Almacén — persona dedicada a garantías: recibe lo devuelto, lo ubica y prepara los reemplazos.",
    "Subgerente de Servicio Técnico — determina si procede reparación, reemplazo o rechazo, y solicita al almacén la unidad de sustitución.",
    "Técnico(a) de Servicio / Relojero(a) — repara las unidades de la marca representada.",
    "Encargado(a) de Tienda — recibe el producto del cliente en el punto de venta; en ocasiones el ingreso lo hace la cajera y un asesor comprueba la falla.",
    "Gerente de Contabilidad — registraría la baja de lo desechado; no se ha ejecutado."
   ],
   "evidencia": [
    "E-34",
    "E-51",
    "E-64"
   ],
   "notas": "Cargos tomados de la columna «cargo actual» del V4: Gerente de Almacén, Asistente de Almacén y Encargado(a) de Tienda en la operación de Venezuela. Las dos bodegas se identifican internamente por número; aquí se nombran por su función para no arrastrar una codificación local.",
   "sin_evidencia": "No consta el tratamiento de la devolución en la operación de comercio electrónico de Estados Unidos, donde el propio responsable declara que las devoluciones llegan, se apartan y se revisan cada cierto tiempo «sin proceso muy claro»."
  },
  "disparador": {
   "estado": "borrador",
   "disparador": "La llegada del producto devuelto, por el almacén central, por una tienda o por agencia de envíos.",
   "cadencia": "Continua, con dos cortes de procesamiento en horas fijas del día. Los volúmenes por corte llegan a varios cientos de unidades.",
   "output": "Cliente resuelto con reemplazo o unidad reparada, y mercancía no recuperable apartada en la bodega de desecho.",
   "evidencia": [
    "E-34",
    "E-51"
   ],
   "notas": "Los dos cortes diarios son el ritmo real del proceso y la causa de la espera que reporta servicio técnico."
  },
  "flujo": {
   "estado": "borrador",
   "evidencia": [
    "E-34",
    "E-51",
    "E-64"
   ],
   "actividades": [
    {
     "id": "a1",
     "rol": "Encargado(a) de Tienda",
     "texto": "Recibe el producto del cliente en el punto de venta, comprueba que traiga la factura y hace que un asesor verifique la falla antes de enviarlo. El caso no se abre todavía en ningún sistema central."
    },
    {
     "id": "a2",
     "rol": "Asistente de Almacén",
     "texto": "Recibe el producto devuelto en el almacén y lo ubica en la bodega de garantías, separada del inventario vendible."
    },
    {
     "id": "a3",
     "rol": "Subgerente de Servicio Técnico",
     "texto": "Determina el desenlace según la marca y el estado: la marca propia no se repara —no hay piezas ni cambio de batería— y se resuelve por reemplazo sobre la carta de garantía; la representada sí tiene reparación."
    },
    {
     "id": "a4",
     "rol": "Técnico(a) de Servicio / Relojero(a)",
     "texto": "Repara la unidad de la marca representada y la devuelve para su entrega."
    },
    {
     "id": "a5",
     "rol": "Subgerente de Servicio Técnico",
     "texto": "Solicita al almacén la unidad de reemplazo. Antes tenía mercancía a mano para el cambio directo; ahora depende de los dos cortes del día."
    },
    {
     "id": "a6",
     "rol": "Gerente de Almacén (Venezuela)",
     "texto": "Atiende la solicitud en el corte correspondiente y autoriza el traslado de la unidad de sustitución a la bodega de garantías, donde queda a disposición."
    },
    {
     "id": "a7",
     "rol": "Asistente de Almacén",
     "texto": "Prepara la unidad de reemplazo y la entrega para que llegue al cliente."
    },
    {
     "id": "a8",
     "rol": "Asistente de Almacén",
     "texto": "Traslada a la bodega de desecho la unidad que no tiene arreglo. Esa bodega solo recibe: nada de lo que entra vuelve a circular."
    },
    {
     "id": "a9",
     "rol": "Gerente de Almacén (Venezuela)",
     "texto": "Acumula lo desechado a la espera de darle de baja. La baja contable se reconoce como pendiente y no se ha ejecutado nunca; tampoco hay periodicidad definida."
    }
   ],
   "diagrama": {
    "carriles": [
     "Encargado(a) de Tienda",
     "Asistente de Almacén",
     "Subgerente de Servicio Técnico",
     "Técnico(a) de Servicio / Relojero(a)",
     "Gerente de Almacén (Venezuela)"
    ],
    "nodos": [
     {
      "id": "n0",
      "carril": "Encargado(a) de Tienda",
      "tipo": "inicio",
      "n": "Recibir el producto del cliente"
     },
     {
      "id": "n1",
      "carril": "Asistente de Almacén",
      "tipo": "tarea",
      "n": "Ubicar en la bodega de garantías",
      "sistemas": [
       "Odoo"
      ]
     },
     {
      "id": "n2",
      "carril": "Subgerente de Servicio Técnico",
      "tipo": "decision",
      "n": "¿Cuál es el desenlace?"
     },
     {
      "id": "n3",
      "carril": "Técnico(a) de Servicio / Relojero(a)",
      "tipo": "tarea",
      "n": "Reparar y devolver la unidad"
     },
     {
      "id": "n4",
      "carril": "Subgerente de Servicio Técnico",
      "tipo": "tarea",
      "n": "Pedir el reemplazo al almacén"
     },
     {
      "id": "n5",
      "carril": "Gerente de Almacén (Venezuela)",
      "tipo": "tarea",
      "n": "Autorizar el traslado en el corte del día"
     },
     {
      "id": "n6",
      "carril": "Asistente de Almacén",
      "tipo": "tarea",
      "n": "Preparar y entregar el reemplazo",
      "sistemas": [
       "Odoo"
      ]
     },
     {
      "id": "n7",
      "carril": "Asistente de Almacén",
      "tipo": "tarea",
      "n": "Trasladar a la bodega de desecho",
      "sistemas": [
       "Odoo"
      ]
     },
     {
      "id": "n8",
      "carril": "Gerente de Almacén (Venezuela)",
      "tipo": "fin",
      "n": "Desecho acumulado, sin baja contable"
     },
     {
      "id": "n9",
      "carril": "Subgerente de Servicio Técnico",
      "tipo": "fin",
      "n": "Cliente resuelto"
     }
    ],
    "aristas": [
     {
      "de": "n0",
      "a": "n1"
     },
     {
      "de": "n1",
      "a": "n2"
     },
     {
      "de": "n2",
      "a": "n3",
      "etq": "Reparación"
     },
     {
      "de": "n2",
      "a": "n4",
      "etq": "Reemplazo"
     },
     {
      "de": "n2",
      "a": "n7",
      "etq": "Sin arreglo"
     },
     {
      "de": "n3",
      "a": "n9"
     },
     {
      "de": "n4",
      "a": "n5"
     },
     {
      "de": "n5",
      "a": "n6"
     },
     {
      "de": "n6",
      "a": "n9"
     },
     {
      "de": "n7",
      "a": "n8"
     }
    ]
   }
  }
 },
 "7.8": {
  "nota_version": "Versión As-Is: describe cómo se mueve hoy la mercancía entre bodegas y áreas cuando no hay una venta detrás. Cargos actuales; sin matriz de riesgos ni indicadores.",
  "proposito": {
   "estado": "borrador",
   "alcance": "Los movimientos de mercancía sin venta detrás: material para marketing, unidades para servicio técnico, urgencias entre tiendas y movimientos entre bodegas de la misma operación. No incluye la reposición entre países ni el despacho al cliente.",
   "texto": "Es el proceso más informal del macroproceso. El traslado se pide y se ejecuta; el registro llega después, si llega. Las urgencias son la norma: un influencer que aparece y se lleva dos termos y un llavero, una visita que se resuelve en el momento — «bueno muchachos, saquen algo».\n\nEl hueco de fondo es contable y está reconocido: la mercancía que sale a marketing **debe salir a costo** para dejar de figurar como existencia, y **no se ha hecho ni una sola vez** con el sistema actual. Se plantea hacerlo trimestral o bimensual, pero todavía no se ha encontrado la forma. Antes del sistema actual la práctica era aún más suelta —«hacíamos lo que nos daba la gana», se entregaba la mercancía y después alguien registraba el traslado o la salida directa—; hoy el movimiento sí se registra, pero **el ajuste de inventario tampoco se ha hecho todavía**.\n\nLa mecánica en sí funciona: el área solicitante pide, se saca el producto —si no está el color pedido se sustituye por otro y se corrige— y se monta el traslado hacia la bodega de destino.\n\nLos levantamientos de este proceso existen como plantillas con los responsables anotados y **sin pasos desarrollados**."
  },
  "dueno": {
   "estado": "borrador",
   "dueno": "Analista de Logística (Venezuela)",
   "participantes": [
    "Analista de Logística (Venezuela) — recibe la solicitud, monta el traslado en el sistema y lo dirige a la bodega de destino.",
    "Gerente de Almacén (Venezuela) — autoriza el movimiento y resuelve las urgencias que llegan fuera de solicitud.",
    "Ayudante de Almacén — saca físicamente el producto y ejecuta el traslado.",
    "Coordinador(a) de Marca — solicitante frecuente para material promocional y entregas a terceros.",
    "Subgerente de Servicio Técnico — solicitante frecuente para unidades de reemplazo.",
    "Gerente de Contabilidad — registraría la salida a costo del material consumido; no se ha ejecutado."
   ],
   "evidencia": [
    "E-34",
    "E-51",
    "Lark: flujo logistico.xlsx — hojas Traslados Marketing y Traslados Solicitudes (VE)"
   ],
   "notas": "Cargos tomados de la columna «cargo actual» del V4 en la operación de Venezuela. ⚠️ El mapa v18 atribuye el proceso a un auxiliar de bodega y tráfico, y nombra como aprobador de los traslados entre tiendas a un «Supervisor de Ventas» que no existe en el patrón.",
   "sin_evidencia": "No consta umbral de valor ni aprobación formal para ningún traslado, ni criterio que distinga el que retorna del que se consume. Tampoco consta cómo opera este proceso fuera de la operación de Venezuela."
  },
  "disparador": {
   "estado": "borrador",
   "disparador": "La solicitud del área que necesita la mercancía, que puede llegar por el canal formal o de viva voz cuando es urgente.",
   "cadencia": "Continua durante la jornada, con picos por urgencias no previstas.",
   "output": "Mercancía trasladada y movimiento registrado en el sistema. La salida a costo, cuando corresponde, queda pendiente.",
   "evidencia": [
    "E-34",
    "Lark: flujo logistico.xlsx — hojas de traslados (VE)"
   ],
   "notas": "Las urgencias se ejecutan antes de que exista constancia: se saca la mercancía y el registro se monta después."
  },
  "flujo": {
   "estado": "borrador",
   "evidencia": [
    "E-34",
    "E-51",
    "Lark: flujo logistico.xlsx — hojas Traslados Marketing y Traslados Solicitudes (VE)"
   ],
   "actividades": [
    {
     "id": "a1",
     "rol": "Coordinador(a) de Marca",
     "texto": "Solicita la mercancía que necesita para material promocional o para una entrega a un tercero. Cuando es urgente la pide directamente, sin solicitud previa."
    },
    {
     "id": "a2",
     "rol": "Gerente de Almacén (Venezuela)",
     "texto": "Comprueba si la solicitud llegó por el canal formal o si es una urgencia que hay que resolver en el momento."
    },
    {
     "id": "a3",
     "rol": "Gerente de Almacén (Venezuela)",
     "texto": "Autoriza sacar la mercancía de inmediato cuando es urgencia, y el registro se monta después."
    },
    {
     "id": "a4",
     "rol": "Ayudante de Almacén",
     "texto": "Saca físicamente el producto. Si no hay el color o la referencia pedida, se sustituye por otro y se corrige la solicitud."
    },
    {
     "id": "a5",
     "rol": "Analista de Logística (Venezuela)",
     "texto": "Monta el traslado en el sistema desde la bodega principal hacia la bodega del área destino."
    },
    {
     "id": "a6",
     "rol": "Subgerente de Servicio Técnico",
     "texto": "Solicita por la misma vía las unidades que necesita para reemplazo, que se trasladan a la bodega de garantías."
    },
    {
     "id": "a7",
     "rol": "Analista de Logística (Venezuela)",
     "texto": "Comprueba si la mercancía trasladada se consume o si vuelve al inventario vendible."
    },
    {
     "id": "a8",
     "rol": "Gerente de Contabilidad",
     "texto": "Registraría la salida a costo de la mercancía consumida. No se ha ejecutado ninguna con el sistema actual, y tampoco se ha hecho el ajuste de inventario correspondiente."
    },
    {
     "id": "a9",
     "rol": "Analista de Logística (Venezuela)",
     "texto": "Deja el movimiento registrado y la mercancía cargada en la bodega de destino, que es donde queda contabilizada mientras no se dé de baja."
    }
   ],
   "diagrama": {
    "carriles": [
     "Coordinador(a) de Marca",
     "Gerente de Almacén (Venezuela)",
     "Ayudante de Almacén",
     "Analista de Logística (Venezuela)",
     "Subgerente de Servicio Técnico",
     "Gerente de Contabilidad"
    ],
    "nodos": [
     {
      "id": "n0",
      "carril": "Coordinador(a) de Marca",
      "tipo": "inicio",
      "n": "Solicitar mercancía para el área"
     },
     {
      "id": "n1",
      "carril": "Gerente de Almacén (Venezuela)",
      "tipo": "decision",
      "n": "¿Vino por el canal formal?"
     },
     {
      "id": "n2",
      "carril": "Gerente de Almacén (Venezuela)",
      "tipo": "tarea",
      "n": "Autorizar la urgencia y registrar después"
     },
     {
      "id": "n3",
      "carril": "Ayudante de Almacén",
      "tipo": "tarea",
      "n": "Sacar el producto y sustituir si falta"
     },
     {
      "id": "n4",
      "carril": "Subgerente de Servicio Técnico",
      "tipo": "tarea",
      "n": "Pedir unidades de reemplazo"
     },
     {
      "id": "n5",
      "carril": "Analista de Logística (Venezuela)",
      "tipo": "tarea",
      "n": "Montar el traslado a la bodega destino",
      "sistemas": [
       "Odoo"
      ]
     },
     {
      "id": "n6",
      "carril": "Analista de Logística (Venezuela)",
      "tipo": "decision",
      "n": "¿La mercancía se consume?"
     },
     {
      "id": "n7",
      "carril": "Gerente de Contabilidad",
      "tipo": "fin",
      "n": "Salida a costo pendiente, nunca ejecutada"
     },
     {
      "id": "n8",
      "carril": "Analista de Logística (Venezuela)",
      "tipo": "fin",
      "n": "Movimiento registrado en bodega destino"
     }
    ],
    "aristas": [
     {
      "de": "n0",
      "a": "n1"
     },
     {
      "de": "n1",
      "a": "n2",
      "etq": "No"
     },
     {
      "de": "n1",
      "a": "n3",
      "etq": "Sí"
     },
     {
      "de": "n2",
      "a": "n3"
     },
     {
      "de": "n4",
      "a": "n5"
     },
     {
      "de": "n3",
      "a": "n5"
     },
     {
      "de": "n5",
      "a": "n6"
     },
     {
      "de": "n6",
      "a": "n7",
      "etq": "Sí"
     },
     {
      "de": "n6",
      "a": "n8",
      "etq": "No"
     }
    ]
   }
  }
 },
 "7.9": {
  "nota_version": "Versión As-Is: describe qué existe hoy en lugar de una capa de gobierno logístico, que no está constituida. Cargos actuales; sin matriz de riesgos ni indicadores.",
  "proposito": {
   "estado": "borrador",
   "alcance": "La definición y el seguimiento de indicadores logísticos, la política del macroproceso y la convergencia entre operaciones. No incluye la ejecución de ninguno de los procesos que gobernaría.",
   "texto": "**No existe capa de gobierno logístico.** La gerencia que se incorporó al hub poco antes del levantamiento lo declara sin rodeos: no había indicadores. Lo que hay es el arranque de su construcción, en curso al momento de las entrevistas, y con un criterio explícito: llevar a la junta un conjunto acotado para no dispersar la atención, y dejar el detalle por área en subindicadores.\n\nLo que sí está identificado es **qué habría que medir**, y viene del recorrido del pedido: desde que se recibe, cuánto tarda en recolectarse, cuánto en empacarse, cuánto en llegar a la zona de salida y cuándo lo saca tráfico. Ese levantamiento es la base sobre la que se están definiendo los indicadores, y es también la razón por la que se migró el sistema de almacén: sin él no hay de dónde sacar el dato.\n\nLa convergencia entre operaciones tampoco ha empezado. La gerencia de inventario señala que hace falta un plan donde todos los países reporten cómo hacen sus inventarios, y reconoce que ese proyecto **no se ha comenzado a conversar** siquiera con la persona indicada en la operación de Venezuela. Desde las operaciones pequeñas el contraste es el mismo: una describe su día a día como apagar incendios y otra reconoce un nivel de cumplimiento bajo con quiebres de inventario."
  },
  "dueno": {
   "estado": "borrador",
   "dueno": "Gerente de Operaciones y Excelencia Logística",
   "participantes": [
    "Gerente de Operaciones y Excelencia Logística — impulsa la definición de los indicadores y presenta a la junta la información para escoger por cuáles empezar. Se incorporó poco antes del levantamiento.",
    "Gerente de Inventario y Precios — señala la necesidad de un plan de reporte de inventarios común a todos los países, todavía sin arrancar.",
    "Junta Directiva — recibe la información y filtra con qué indicadores comenzar.",
    "Gerente de Operaciones y Logística (Venezuela) — contraparte en la operación de país; el plan común aún no se ha conversado con él.",
    "Data Scientist / Líder de BI — provee los reportes desde los que hoy se consulta la información de desempeño."
   ],
   "evidencia": [
    "E-03",
    "E-11",
    "E-19",
    "E-63",
    "E-18"
   ],
   "notas": "Cargos tomados de la columna «cargo actual» del V4: Grte. de Ope. y Exc. Logística, Gerente de Inventario y Precios y Gerente de Operaciones y Logística. ⚠️ El mapa v18 nombra como participante a un «Planificador Financiero» que no existe en el patrón y que ninguna entrevista sitúa en este proceso.",
   "sin_evidencia": "No consta qué indicadores quedaron seleccionados ni con qué metas: la selección estaba en curso. Tampoco consta instancia, periodicidad ni responsable de una revisión de desempeño logístico."
  },
  "disparador": {
   "estado": "borrador",
   "disparador": "No hay disparador: no existe ciclo de gobierno. Lo que hay es un esfuerzo de definición impulsado por la gerencia que se incorporó.",
   "cadencia": "Sin periodicidad. No hay revisión establecida porque no hay tablero que revisar.",
   "output": "Un conjunto de indicadores en definición y un levantamiento de las etapas del pedido sobre el que construirlos.",
   "evidencia": [
    "E-03"
   ],
   "notas": "El criterio declarado para la selección es no empezar con todos, para no distorsionar la atención de la junta."
  },
  "flujo": {
   "estado": "borrador",
   "evidencia": [
    "E-03",
    "E-11",
    "E-19",
    "E-63",
    "E-18"
   ],
   "actividades": [
    {
     "id": "a1",
     "rol": "Gerente de Operaciones y Excelencia Logística",
     "texto": "Constata al incorporarse que el área no tiene indicadores de ningún tipo."
    },
    {
     "id": "a2",
     "rol": "Gerente de Operaciones y Excelencia Logística",
     "texto": "Levanta las etapas del recorrido del pedido —recepción, recolección, empaque, llegada a la zona de salida y despacho— para saber qué se puede medir y dónde."
    },
    {
     "id": "a3",
     "rol": "Data Scientist / Líder de BI",
     "texto": "Provee los reportes desde los que hoy se consulta la información de desempeño disponible."
    },
    {
     "id": "a4",
     "rol": "Gerente de Operaciones y Excelencia Logística",
     "texto": "Presenta a la junta la información levantada para que se filtre con qué indicadores empezar, deliberadamente pocos."
    },
    {
     "id": "a5",
     "rol": "Junta Directiva",
     "texto": "Escoge por dónde comenzar. La selección estaba en curso al momento del levantamiento."
    },
    {
     "id": "a6",
     "rol": "Gerente de Inventario y Precios",
     "texto": "Plantea la necesidad de un plan común donde todos los países reporten cómo hacen sus inventarios y se reporte a la junta."
    },
    {
     "id": "a7",
     "rol": "Gerente de Inventario y Precios",
     "texto": "Comprueba si el plan común se ha conversado con la operación de país, y no se ha hecho: el proyecto no ha empezado."
    },
    {
     "id": "a8",
     "rol": "Gerente de Operaciones y Logística (Venezuela)",
     "texto": "Sigue operando sin indicadores comunes ni criterio de cálculo compartido con las demás operaciones."
    }
   ],
   "diagrama": {
    "carriles": [
     "Gerente de Operaciones y Excelencia Logística",
     "Data Scientist / Líder de BI",
     "Junta Directiva",
     "Gerente de Inventario y Precios",
     "Gerente de Operaciones y Logística (Venezuela)"
    ],
    "nodos": [
     {
      "id": "n0",
      "carril": "Gerente de Operaciones y Excelencia Logística",
      "tipo": "inicio",
      "n": "Constatar que no hay indicadores"
     },
     {
      "id": "n1",
      "carril": "Gerente de Operaciones y Excelencia Logística",
      "tipo": "tarea",
      "n": "Levantar las etapas del pedido",
      "sistemas": [
       "WMS"
      ]
     },
     {
      "id": "n2",
      "carril": "Data Scientist / Líder de BI",
      "tipo": "tarea",
      "n": "Proveer los reportes disponibles",
      "sistemas": [
       "Power BI"
      ]
     },
     {
      "id": "n3",
      "carril": "Gerente de Operaciones y Excelencia Logística",
      "tipo": "tarea",
      "n": "Llevar la información a la junta"
     },
     {
      "id": "n4",
      "carril": "Junta Directiva",
      "tipo": "tarea",
      "n": "Filtrar con qué indicadores empezar"
     },
     {
      "id": "n5",
      "carril": "Gerente de Inventario y Precios",
      "tipo": "tarea",
      "n": "Plantear el plan común de inventarios"
     },
     {
      "id": "n6",
      "carril": "Gerente de Inventario y Precios",
      "tipo": "decision",
      "n": "¿Se conversó con la operación de país?"
     },
     {
      "id": "n7",
      "carril": "Gerente de Operaciones y Logística (Venezuela)",
      "tipo": "fin",
      "n": "Sigue sin indicadores comunes"
     },
     {
      "id": "n8",
      "carril": "Gerente de Operaciones y Excelencia Logística",
      "tipo": "fin",
      "n": "Selección de indicadores en curso"
     }
    ],
    "aristas": [
     {
      "de": "n0",
      "a": "n1"
     },
     {
      "de": "n1",
      "a": "n3"
     },
     {
      "de": "n2",
      "a": "n3"
     },
     {
      "de": "n3",
      "a": "n4"
     },
     {
      "de": "n4",
      "a": "n8"
     },
     {
      "de": "n0",
      "a": "n5"
     },
     {
      "de": "n5",
      "a": "n6"
     },
     {
      "de": "n6",
      "a": "n7",
      "etq": "No"
     },
     {
      "de": "n6",
      "a": "n8",
      "etq": "Sí"
     }
    ]
   }
  }
 }
  }
 },
 "8": {
  "procesos": {
   "8.1": {
    "nota_version": "Versión As-Is: describe cómo se planifica hoy la venta al mayor y se bajan las cuotas, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La construcción del forecast de venta al mayor por vendedor, cliente, marca y país, la bajada de cuotas y su revisión durante el año. No incluye la planificación de compra (macro 6) ni la asignación de inventario entre frentes.",
     "texto": "El forecast se construye **sobre la venta del año anterior**. La dirección fija en enero el foco del año en una junta de socios de dos días, y a partir de ahí cada vendedor recibe su venta histórica por marca y cliente y propone cuánto venderá. La gerencia comercial se sienta con cada uno, ajusta el porcentaje de crecimiento, consolida por país con un peso mensual tomado del histórico y lo entrega a finanzas para el flujo de caja.\n\nPara Cubitt el ejercicio lo hace la dirección comercial de la marca con el mismo método —venta del año anterior por mes más el crecimiento esperado— y se revisa cada trimestre; en el año en curso el forecast se rehízo tres veces porque las metas del primer trimestre se superaron. La venta real se carga mes a mes en un archivo compartido que mantiene la analista de datos.\n\nEl seguimiento no tiene la misma forma en cada país. En Venezuela la gerencia de ventas al mayor arma su presupuesto y lo envía a la dirección, pero reconoce que no recibe retroalimentación; el propio equipo señala que el ciclo anual no permite corregir a tiempo y se está moviendo a trimestral. En Colombia la jefatura de cuentas clave reporta cada semana a Panamá el cumplimiento contra la meta anual y trimestral. **No existe un planificador de demanda** ni herramienta de pronóstico estadístico: el forecast es aritmética sobre el histórico."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente de Ventas Internacional",
     "participantes": [
      "Gerente de Ventas Internacional — se sienta con cada vendedor, ajusta el crecimiento, consolida por país y entrega el resultado a finanzas. En las entrevistas se le llama gerente comercial.",
      "Director Comercial y de Compras (socio) — fija con los socios el foco del año y hace el plan de negocio de venta por marca.",
      "Gerente de Ventas Mayor (país) — envía a sus vendedores la venta del año anterior y revisa sus propuestas.",
      "Vendedor(a) al por Mayor — propone cuánto venderá por categoría, marca y cliente.",
      "Analista de Datos e Informes — carga la venta real de cada mes en el archivo del forecast.",
      "Director Comercial Wholesale y Nuevos Negocios (Cubitt) — hace el forecast de Cubitt con la Regional Cubitt Manager y lo revisa cada trimestre.",
      "KAM · Cadenas (Colombia) — reporta cada semana a Panamá la meta, lo ejecutado y la diferencia."
     ],
     "evidencia": [
      "E-05",
      "E-08",
      "E-39",
      "E-10",
      "E-63",
      "E-35",
      "E-36",
      "E-14",
      "E-40"
     ],
     "notas": "Cargos tomados de la columna «cargo actual» del V4 donde constan: Gerente de Ventas Internacional, Gerente de Ventas Mayor PTY, Gerente de Ventas al Mayor (Venezuela), Regional Cubitt Manager y KAM · Cadenas. En Venezuela el vendedor figura como «Asesor(a) de Ventas al Mayor»; aquí se usa la denominación común «Vendedor(a) al por Mayor» en todo el macroproceso.",
     "sin_evidencia": "No consta un calendario formal de revisión trimestral fuera de Cubitt, ni qué pasa con el forecast de un país cuando la dirección no lo comenta. Tampoco consta cómo se reparte la meta entre Casio y Cubitt en los países donde las vende el mismo vendedor."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "El cierre del año y la junta de socios de enero, donde se fija el foco del año.",
     "cadencia": "Anual, con revisión trimestral en Cubitt y reajuste cuando la venta se aparta del plan. La venta real se carga cada mes.",
     "output": "Forecast por vendedor, cliente, marca y país, con cuotas mensuales, trimestrales y anuales, entregado a finanzas.",
     "evidencia": [
      "E-08",
      "E-05",
      "E-63",
      "E-10"
     ],
     "notas": "Venezuela declara que está pasando de revisión anual a trimestral; al momento de las entrevistas no estaba claro que ya ocurriera."
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-05",
      "E-08",
      "E-39",
      "E-10",
      "E-63",
      "E-35"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Director Comercial y de Compras (socio)",
       "texto": "Fija con los socios, en la junta de dos días de enero, el foco del año y el crecimiento que se espera por marca."
      },
      {
       "id": "a2",
       "rol": "Gerente de Ventas Mayor (país)",
       "texto": "Envía a cada vendedor su venta del año anterior por marca y cliente."
      },
      {
       "id": "a3",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Indica cuánto va a vender por categoría, marca y cliente."
      },
      {
       "id": "a4",
       "rol": "Gerente de Ventas Internacional",
       "texto": "Se sienta con cada vendedor, ajusta el porcentaje de crecimiento y consolida el total del país, con un peso mensual sacado del histórico."
      },
      {
       "id": "a5",
       "rol": "Gerente de Ventas Internacional",
       "texto": "Baja las cuotas mensuales, trimestrales y anuales y entrega el forecast a finanzas para el flujo de caja."
      },
      {
       "id": "a6",
       "rol": "Analista de Datos e Informes",
       "texto": "Carga cada mes la venta real en el archivo compartido del forecast, que la dirección revisa cuando lo necesita."
      },
      {
       "id": "a7",
       "rol": "Gerente de Ventas Internacional",
       "texto": "Si la venta se aparta del plan, rehace el forecast. En Cubitt esto ocurrió tres veces en el año en curso; en Venezuela no consta una revisión con retroalimentación de la dirección."
      }
     ],
     "diagrama": {
      "carriles": [
       "Director Comercial y de Compras (socio)",
       "Gerente de Ventas Internacional",
       "Gerente de Ventas Mayor (país)",
       "Vendedor(a) al por Mayor",
       "Analista de Datos e Informes"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Director Comercial y de Compras (socio)",
        "tipo": "inicio",
        "n": "Junta de socios de enero"
       },
       {
        "id": "n1",
        "carril": "Director Comercial y de Compras (socio)",
        "tipo": "tarea",
        "n": "Fijar foco y crecimiento del año"
       },
       {
        "id": "n2",
        "carril": "Gerente de Ventas Mayor (país)",
        "tipo": "tarea",
        "n": "Enviar la venta del año anterior",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n3",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Proponer venta por marca y cliente",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n4",
        "carril": "Gerente de Ventas Internacional",
        "tipo": "tarea",
        "n": "Ajustar y consolidar por país"
       },
       {
        "id": "n5",
        "carril": "Gerente de Ventas Internacional",
        "tipo": "tarea",
        "n": "Bajar cuotas y pasar a finanzas"
       },
       {
        "id": "n6",
        "carril": "Analista de Datos e Informes",
        "tipo": "tarea",
        "n": "Cargar la venta real del mes",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n7",
        "carril": "Gerente de Ventas Internacional",
        "tipo": "decision",
        "n": "¿Se aparta del plan?"
       },
       {
        "id": "n8",
        "carril": "Gerente de Ventas Internacional",
        "tipo": "tarea",
        "n": "Rehacer el forecast"
       },
       {
        "id": "n9",
        "carril": "Gerente de Ventas Internacional",
        "tipo": "fin",
        "n": "Forecast vigente"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8",
        "etq": "Sí"
       },
       {
        "de": "n7",
        "a": "n9",
        "etq": "No"
       },
       {
        "de": "n8",
        "a": "n9"
       }
      ]
     }
    }
   },
   "8.2": {
    "nota_version": "Versión As-Is: describe cómo se fijan hoy los precios, los descuentos y las condiciones de crédito de los clientes al mayor, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La fijación de listas de precios por mercado, los descuentos, la clasificación de clientes y la asignación de condiciones de crédito al cliente mayorista. No incluye la aprobación de cada pedido (8.5) ni la cobranza (8.15).",
     "texto": "La política comercial del mayor la diseña **una capa corporativa**, no cada país: la dirección comercial y la gerencia comercial deciden, con un comité de estrategia que reúne a los socios y a la dirección comercial de Cubitt. Ese comité no tiene cadencia ni actas; funciona porque sus miembros conviven a diario. Los precios dejaron de ser uniformes por país y hoy se ajustan a lo que soporta cada mercado.\n\nLas listas viven en Odoo. En Venezuela son tres —en bolívares, en divisas y el precio al público, que además sirve para decirle al cliente a cuánto debe revender—, con descuentos de entre el 10 % y el 25 % según la modalidad de pago y el cliente. El vendedor asigna el descuento arrancando siempre por el más bajo, y el margen de las cuentas grandes se negocia caso a caso. **No hay margen mínimo escrito**: toda promoción o descuento fuera de lista se eleva a la dirección.\n\nLa clasificación A/B/C/D por volumen, frecuencia y capacidad de inversión existe, pero no es un dato comercial gobernado: en Venezuela la mantiene a mano el equipo de visual y está desactualizada —registra unos 230 clientes cuando son cerca de 400—, y en Colombia no existía hasta que la jefatura comercial la creó este año.\n\nEl crédito es la parte más débil. En Panamá los cambios de plazo o monto se tramitan en Lark y la coordinación de cuentas por cobrar tiene la última palabra; un manual de crédito redactado hace dos años nunca se implantó, no hay comité de crédito, y el documento que el cliente firma al pedir crédito se creó hace poco. En Venezuela el cliente se crea solo con el RIF, **no hay límites ni días de crédito asignados** por cliente, nadie sabe bloquear un cliente en Odoo y los vendedores pueden reasignarse la cartera sin que quede rastro de quién hizo el cambio."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Director Comercial y de Compras (socio)",
     "participantes": [
      "Director Comercial y de Compras (socio) — con la gerencia comercial, diseña la política de venta al mayor; aprueba descuentos y promociones fuera de lista.",
      "Gerente de Ventas Internacional — mantiene las listas por mercado y la línea rectora comercial de todos los países.",
      "Director Comercial Wholesale y Nuevos Negocios (Cubitt) — segmenta los clientes de Cubitt por capacidad de compra e inversión y negocia su margen caso a caso.",
      "Vendedor(a) al por Mayor — da de alta al cliente, le asigna lista y descuento y tramita la solicitud de crédito.",
      "Gerente de Ventas Mayor (país) — revisa las solicitudes de crédito de su equipo en Lark.",
      "Supervisor(a) de Coordinación y Planificación de CxC (Panamá) — decide el plazo y el monto de crédito; en la práctica tiene la última palabra.",
      "Coordinador(a) Visual (Venezuela) — mantiene a mano la base de clientes categorizados A a D.",
      "Coordinadora de Cuentas por Cobrar (Venezuela) — aplica de memoria una regla de 30 días a falta de límites asignados."
     ],
     "evidencia": [
      "E-01",
      "E-63",
      "E-35",
      "E-05",
      "E-40",
      "E-62",
      "E-48",
      "E-39",
      "E-31",
      "E-14",
      "E-57",
      "Lark: Proceso Ventas al Mayor Rower (VE)",
      "Lark: Procesos de Ventas al Mayor (PA)"
     ],
     "notas": "La coordinación de crédito de Panamá figura en el V4 como «Sup. Coord. y Plani. de CxC». El director comercial y el presidente no figuran en el V4; se nombran por su función, como en los demás manuales. Algunos vendedores aplican además criterios propios para dar crédito —antigüedad y venta mensual mínimas—, que no están escritos en ningún documento.",
     "sin_evidencia": "No consta quién carga o cambia las listas de precios en Odoo, ni cada cuánto. Tampoco consta un criterio escrito para pasar a un cliente de una categoría a otra."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Un cliente nuevo, una petición de crédito o de más descuento, o una decisión de precios del comité.",
     "cadencia": "Continua y a demanda; no hay revisión periódica de la política ni de la clasificación de clientes.",
     "output": "Cliente creado en Odoo con su lista de precios, su descuento y, si procede, sus condiciones de crédito.",
     "evidencia": [
      "E-01",
      "E-62",
      "E-48",
      "E-40"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-01",
      "E-63",
      "E-35",
      "E-40",
      "E-62",
      "E-48",
      "Lark: Procesos de Ventas al Mayor (PA)"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Director Comercial y de Compras (socio)",
       "texto": "Fija los precios por mercado con el comité de estrategia, sin cadencia ni acta."
      },
      {
       "id": "a2",
       "rol": "Gerente de Ventas Internacional",
       "texto": "Mantiene las listas por mercado en Odoo, de donde las descargan los vendedores."
      },
      {
       "id": "a3",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Da de alta al cliente en Odoo. En Venezuela basta con el RIF."
      },
      {
       "id": "a4",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Le asigna la lista que le corresponde y el descuento según el tipo de cliente y la compra, empezando siempre por el más bajo."
      },
      {
       "id": "a5",
       "rol": "Director Comercial y de Compras (socio)",
       "texto": "Si el cliente pide más descuento o un margen especial, lo decide caso a caso. No hay margen mínimo escrito que permita resolverlo sin escalar."
      },
      {
       "id": "a6",
       "rol": "Gerente de Ventas Mayor (país)",
       "texto": "Si el cliente pide crédito, revisa la solicitud que el vendedor tramita en Lark."
      },
      {
       "id": "a7",
       "rol": "Supervisor(a) de Coordinación y Planificación de CxC (Panamá)",
       "texto": "Decide el plazo y el monto del crédito. En Venezuela este paso no existe: no se asignan límites ni días por cliente."
      }
     ],
     "diagrama": {
      "carriles": [
       "Director Comercial y de Compras (socio)",
       "Gerente de Ventas Internacional",
       "Vendedor(a) al por Mayor",
       "Gerente de Ventas Mayor (país)",
       "Supervisor(a) de Coordinación y Planificación de CxC (Panamá)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Director Comercial y de Compras (socio)",
        "tipo": "inicio",
        "n": "Comité fija precios por mercado"
       },
       {
        "id": "n1",
        "carril": "Gerente de Ventas Internacional",
        "tipo": "tarea",
        "n": "Mantener las listas por mercado",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n2",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Dar de alta al cliente",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n3",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Asignar lista y descuento inicial"
       },
       {
        "id": "n4",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "decision",
        "n": "¿Pide más descuento?"
       },
       {
        "id": "n5",
        "carril": "Director Comercial y de Compras (socio)",
        "tipo": "tarea",
        "n": "Decidir el margen caso a caso"
       },
       {
        "id": "n6",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "decision",
        "n": "¿Pide crédito?"
       },
       {
        "id": "n7",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "fin",
        "n": "Cliente de contado"
       },
       {
        "id": "n8",
        "carril": "Gerente de Ventas Mayor (país)",
        "tipo": "tarea",
        "n": "Revisar la solicitud",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n9",
        "carril": "Supervisor(a) de Coordinación y Planificación de CxC (Panamá)",
        "tipo": "tarea",
        "n": "Fijar plazo y monto"
       },
       {
        "id": "n10",
        "carril": "Supervisor(a) de Coordinación y Planificación de CxC (Panamá)",
        "tipo": "fin",
        "n": "Crédito asignado"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5",
        "etq": "Sí"
       },
       {
        "de": "n4",
        "a": "n6",
        "etq": "No"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7",
        "etq": "No"
       },
       {
        "de": "n6",
        "a": "n8",
        "etq": "Sí"
       },
       {
        "de": "n8",
        "a": "n9"
       },
       {
        "de": "n9",
        "a": "n10"
       }
      ]
     }
    }
   },
   "8.3": {
    "nota_version": "Versión As-Is: describe cómo se le hace llegar hoy al cliente mayorista la lista de precios y disponibilidad, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "El envío al cliente de la lista de precios y disponibilidad sobre la que devuelve su pedido. No incluye el montaje del pedido (8.4) ni los materiales de marketing (8.13).",
     "texto": "La norma declarada es que cada vendedor mande los lunes a sus clientes la lista con referencia, imagen, precio, disponible y tránsito. **En la práctica unos lo hacen los lunes y otros no.** El envío es manual: el vendedor descarga de Odoo las listas vigentes de cada línea —en Venezuela son unas seis: Casio, Q&Q, Cubitt, teclados, calculadoras y otras—, les quita las columnas que no son para el cliente y las manda por WhatsApp a quien la pide o tiene un pedido pendiente. Un vendedor la envía además cuando un cliente lleva unos quince días sin comprar, y le pregunta por su rotación.\n\nLa disponibilidad no se comunica en cifras exactas sino en rangos —de 0 a 10 piezas, de 10 a 20, de 20 a 50—, y un cliente mayorista lo señala como la causa de que su pedido se cumpla entre el 70 % y el 80 %: pide dentro de un rango y otros clientes se adelantan. Algunos vendedores han construido por su cuenta un enlace por cliente con su lista personalizada, que actualizan a mano.\n\nEl envío automático semanal desde Odoo está en desarrollo con el área de sistemas; al cierre de las entrevistas no estaba en uso."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Vendedor(a) al por Mayor",
     "participantes": [
      "Vendedor(a) al por Mayor — descarga, adapta y envía la lista; decide cuándo y a quién.",
      "Cliente mayorista (externo) — revisa la lista y devuelve cantidades, un sugerido o nada.",
      "Gerente de Ventas Internacional — impulsa con sistemas el envío automático semanal, todavía en desarrollo."
     ],
     "evidencia": [
      "E-05",
      "E-36",
      "E-19",
      "E-07",
      "E-63",
      "SC Taller de IA y arquitectura de datos (Panamá)",
      "Lark: Proceso Ventas al Mayor Rower (VE)"
     ],
     "notas": "La pauta de los lunes la dan la gerencia comercial y el mapa v18; ningún vendedor entrevistado la describe como rutina propia.",
     "sin_evidencia": "No consta quién define que la disponibilidad se publique en rangos, ni si aplica a todos los clientes o solo a los internacionales. Tampoco consta cómo se hace este envío en Colombia."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "El lunes, para quien lo aplica; la petición del cliente; o un cliente que lleva unos quince días sin comprar.",
     "cadencia": "Semanal en la norma; irregular en la práctica. Los clientes pequeños piden cada semana y las cadenas, más o menos una vez al mes.",
     "output": "Lista de precios y disponibilidad en manos del cliente, sobre la que devuelve su pedido.",
     "evidencia": [
      "E-05",
      "E-36"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-05",
      "E-36",
      "E-19",
      "Lark: Proceso Ventas al Mayor Rower (VE)"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Decide cuándo enviar: el lunes si aplica la pauta, cuando el cliente la pide o cuando lleva unos quince días sin pedir."
      },
      {
       "id": "a2",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Descarga de Odoo las listas vigentes de cada línea."
      },
      {
       "id": "a3",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Quita las columnas internas y deja el formato que ve el cliente."
      },
      {
       "id": "a4",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "La envía por WhatsApp; algunos la dejan en un enlace propio por cliente."
      },
      {
       "id": "a5",
       "rol": "Cliente mayorista (externo)",
       "texto": "Revisa precios y disponibilidad, que le llega en rangos y no en cifras exactas."
      },
      {
       "id": "a6",
       "rol": "Cliente mayorista (externo)",
       "texto": "Devuelve el Excel con cantidades o un sugerido, que pasa a la toma de pedido (8.4); o no responde, y el vendedor lo retoma en su siguiente contacto."
      }
     ],
     "diagrama": {
      "carriles": [
       "Vendedor(a) al por Mayor",
       "Cliente mayorista (externo)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "inicio",
        "n": "Lunes, petición o 15 días sin compra"
       },
       {
        "id": "n1",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Descargar las listas",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n2",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Quitar las columnas internas",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n3",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Enviar la lista al cliente",
        "sistemas": [
         "WhatsApp"
        ]
       },
       {
        "id": "n4",
        "carril": "Cliente mayorista (externo)",
        "tipo": "tarea",
        "n": "Revisar precios y rangos"
       },
       {
        "id": "n5",
        "carril": "Cliente mayorista (externo)",
        "tipo": "decision",
        "n": "¿Devuelve cantidades?"
       },
       {
        "id": "n6",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "fin",
        "n": "Pedido recibido (pasa a 8.4)"
       },
       {
        "id": "n7",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "fin",
        "n": "Se retoma en otro contacto"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6",
        "etq": "Sí"
       },
       {
        "de": "n5",
        "a": "n7",
        "etq": "No"
       }
      ]
     }
    }
   },
   "8.4": {
    "nota_version": "Versión As-Is: describe cómo se toma y se monta hoy el pedido mayorista en Odoo, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "Desde que el cliente envía su pedido hasta que queda confirmado en Odoo y listo para aprobación. No incluye la aprobación (8.5) ni la preparación y el despacho (macro 7).",
     "texto": "El pedido llega de muchas formas: el Excel de la lista devuelto con cantidades, un mensaje de WhatsApp, un «mándame lo que me falta» de un cliente con veinte años de relación, el pedido tomado en una visita o, en consignación, lo que el cliente vendió. El vendedor lo pasa a una plantilla de Excel —en Venezuela la plantilla marca en rojo lo que no hay— y lo carga de golpe en Odoo, que lo convierte en pedido sin cargar producto por producto.\n\nLa carga entra como **presupuesto, que no reserva inventario**; al convertirla en orden de venta sí reserva. La carga falla a menudo por referencias mal escritas, por el nombre del cliente escrito a mano en vez de elegido del maestro o por celdas con formato incompatible, y hay que corregir y recargar. Lo que no se puede cubrir queda en otro presupuesto o se borra. En Panamá, Odoo le manda al cliente un correo con el detalle para que confirme; en los pedidos de contado el vendedor sube además el comprobante de pago.\n\nEl dolor principal es que **lo que dice el sistema no es lo que hay**. El vendedor monta un pedido con una disponibilidad que luego no encuentra en el color o la variante prometidos y tiene que renegociar en vivo con el cliente. Las anulaciones parciales que no se cierran dejan la misma mercancía reservada varias veces, y las reservas que no se retiran siguen apareciendo como disponibles en el canal web, que las vende de nuevo. Las instrucciones de empaque que pone el vendedor no siempre corresponden a las cajas que existen, y el almacén tiene que rehacer pedidos ya armados.\n\nEn Venezuela, hasta mediados de 2026 el vendedor hacía todo el ciclo: vendía, cobraba, buscaba la factura, armaba la caja y la bajaba. Desde julio el proceso está homologado al de Panamá y el vendedor deja de intervenir físicamente una vez confirmado el pedido."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Vendedor(a) al por Mayor",
     "participantes": [
      "Vendedor(a) al por Mayor — recibe el pedido, lo monta, lo carga en Odoo, corrige los errores y lo confirma con sus instrucciones.",
      "Cliente mayorista (externo) — envía el pedido y confirma el detalle que le llega por correo.",
      "Gerente de Operaciones y Logística (Venezuela) — recibe el pedido con sus observaciones una vez aprobado; señala las reservas que no se liberan como el mayor cuello de botella."
     ],
     "evidencia": [
      "E-05",
      "E-35",
      "E-36",
      "E-57",
      "E-34",
      "E-16",
      "E-68",
      "E-04",
      "E-24",
      "Lark: Proceso Ventas al Mayor Rower (VE)"
     ],
     "notas": "El paso de presupuesto a orden de venta, y su efecto sobre la reserva, lo describe la gerencia comercial; los errores de carga los recoge el documento de Lark de Venezuela.",
     "sin_evidencia": "No consta cómo se toma el pedido en Colombia más allá de que todo el ciclo vive en Odoo. Tampoco consta una regla sobre cuándo borrar el remanente y cuándo conservarlo como presupuesto."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "El cliente envía su pedido, o el vendedor le propone uno sobre lo que le falta.",
     "cadencia": "Continua. Los clientes pequeños piden cada semana, a veces dos o tres veces; las cadenas, más o menos una vez al mes.",
     "output": "Orden de venta confirmada en Odoo, con sus instrucciones, lista para aprobación.",
     "evidencia": [
      "E-35",
      "E-36",
      "E-05"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-05",
      "E-35",
      "E-36",
      "E-57",
      "Lark: Proceso Ventas al Mayor Rower (VE)"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Cliente mayorista (externo)",
       "texto": "Envía su pedido: la lista devuelta con cantidades, un mensaje o la indicación de reponer lo que le falta."
      },
      {
       "id": "a2",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Lo pasa a la plantilla de Excel, que en Venezuela marca en rojo lo que no hay."
      },
      {
       "id": "a3",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Lo carga de golpe en Odoo, donde queda como presupuesto sin reservar inventario."
      },
      {
       "id": "a4",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Si la carga falla, corrige referencias, cliente o formato y vuelve a cargar."
      },
      {
       "id": "a5",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Anota las instrucciones especiales de empaque, despacho o urgencia y convierte el presupuesto en orden de venta, que reserva."
      },
      {
       "id": "a6",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Lo que no alcanza lo deja en otro presupuesto o lo borra."
      },
      {
       "id": "a7",
       "rol": "Cliente mayorista (externo)",
       "texto": "En Panamá recibe por correo el detalle y lo confirma o pide cambios; si es de contado, el vendedor sube su comprobante de pago."
      },
      {
       "id": "a8",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Solicita la aprobación del pedido (8.5)."
      }
     ],
     "diagrama": {
      "carriles": [
       "Cliente mayorista (externo)",
       "Vendedor(a) al por Mayor"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Cliente mayorista (externo)",
        "tipo": "inicio",
        "n": "Envía su pedido"
       },
       {
        "id": "n1",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Pasar a la plantilla",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n2",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Cargar como presupuesto",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n3",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "decision",
        "n": "¿La carga da error?"
       },
       {
        "id": "n4",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Corregir y volver a cargar",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n5",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Anotar instrucciones y confirmar orden",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n6",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "decision",
        "n": "¿Cubre todo el pedido?"
       },
       {
        "id": "n7",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Dejar el resto en presupuesto o borrarlo",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n8",
        "carril": "Cliente mayorista (externo)",
        "tipo": "tarea",
        "n": "Confirmar el detalle recibido",
        "sistemas": [
         "Correo"
        ]
       },
       {
        "id": "n9",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "fin",
        "n": "Pedido enviado a aprobación"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4",
        "etq": "Sí"
       },
       {
        "de": "n3",
        "a": "n5",
        "etq": "No"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7",
        "etq": "No"
       },
       {
        "de": "n6",
        "a": "n8",
        "etq": "Sí"
       },
       {
        "de": "n7",
        "a": "n8"
       },
       {
        "de": "n8",
        "a": "n9"
       }
      ]
     }
    }
   },
   "8.5": {
    "nota_version": "Versión As-Is: describe cómo se aprueba hoy el pedido mayorista antes de prepararlo y facturarlo, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La revisión y autorización del pedido confirmado, desde que el vendedor pide la aprobación hasta que se factura. No incluye la preparación física ni el despacho (macro 7).",
     "texto": "La aprobación tiene **dos llaves en Odoo**: una para trabajar el pedido —que el almacén lo prepare— y otra para facturarlo. En Panamá, la gerencia de ventas mayor revisa el margen, los productos que van con margen bajo y la deuda del cliente: si hay deuda no aprueba, salvo que el vendedor diga cuándo va a pagar. Los pedidos de contado pueden no pasar por ella. La gerencia comercial revisa en una vista propia de Odoo el margen, el reparto por referencia —para que un cliente no se lleve todas las más vendidas— y un indicador de riesgo sacado del historial de pagos; es una tarea diaria que resuelve en unos treinta segundos por pedido. Según la dirección, **todos los pedidos de la empresa pasan por sus manos o por las de la gerencia comercial.**\n\nAl aprobarse, el pedido baja solo al almacén —en el hub, por la interfaz entre Odoo y el sistema de bodega— sin que nadie lo libere a mano, paso que existía y se eliminó. Tras la preparación, facturación genera un borrador de factura que el vendedor confirma en precio; si se preparó menos de lo pedido se ajusta la cantidad, nunca el precio. En los pedidos de contado, finanzas verifica antes que el pago esté acreditado en el banco.\n\nEn Venezuela el modelo se homologó al de Panamá en julio de 2026: la gerencia de ventas al mayor aprueba en dos niveles, retiene el pedido si la cartera no está al día y lo clasifica como urgente (24 horas), regular (48 horas) o caso especial. En Colombia la aprobación es local, con la gerencia comercial regional aprobando ofertas en tiempo real por WhatsApp. Una decena de clientes especiales del hub sigue un circuito aparte: su pedido va a un archivo maestro que la dirección revisa a diario y decide qué se le da, y solo entonces se carga en Odoo."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente de Ventas Internacional",
     "participantes": [
      "Gerente de Ventas Internacional — aprueba a diario en la vista de Odoo; su aprobación es la que baja el pedido al almacén.",
      "Gerente de Ventas Mayor (país) — revisa margen, productos de margen bajo y deuda del cliente; en Venezuela aprueba los dos niveles y clasifica la prioridad.",
      "Director Comercial y de Compras (socio) — aprueba también pedidos y decide caso a caso en los clientes especiales.",
      "Vendedor(a) al por Mayor — pide la aprobación y confirma el precio del borrador de factura.",
      "Jefe de Bodega — recibe el pedido aprobado para preparar.",
      "Responsable de facturación (país) — verifica el pago de los pedidos de contado y emite la factura."
     ],
     "evidencia": [
      "E-39",
      "E-05",
      "E-08",
      "E-10",
      "E-11",
      "E-57",
      "E-34",
      "SC Recorrido de bodega Panamá (04-sep)",
      "Lark: Proceso Ventas al Mayor Rower (VE)"
     ],
     "notas": "En el hub la factura la emite contabilidad; en Venezuela, la analista de logística (ver 7.4). Por eso el carril se llama «Responsable de facturación (país)».",
     "sin_evidencia": "No consta si la segunda aprobación, la de facturar, la da siempre la misma persona que la primera, ni qué criterio distinto aplica. Tampoco consta cuándo un pedido de contado sí pasa por la gerencia."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "El vendedor confirma el pedido y pide la aprobación en Odoo.",
     "cadencia": "Diaria.",
     "output": "Pedido aprobado para trabajar, preparado y facturado; o retenido hasta que el cliente regularice.",
     "evidencia": [
      "E-05",
      "E-39"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-39",
      "E-05",
      "E-57",
      "SC Recorrido de bodega Panamá (04-sep)",
      "Lark: Proceso Ventas al Mayor Rower (VE)"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Pide la aprobación del pedido confirmado en Odoo."
      },
      {
       "id": "a2",
       "rol": "Gerente de Ventas Mayor (país)",
       "texto": "Revisa si el cliente tiene deuda vencida; si la tiene, retiene el pedido salvo que el vendedor diga cuándo pagará."
      },
      {
       "id": "a3",
       "rol": "Gerente de Ventas Mayor (país)",
       "texto": "Revisa el margen y los productos que van con margen bajo."
      },
      {
       "id": "a4",
       "rol": "Gerente de Ventas Internacional",
       "texto": "Revisa en la vista de Odoo el reparto por referencia y el indicador de riesgo, y aprueba trabajar el pedido."
      },
      {
       "id": "a5",
       "rol": "Jefe de Bodega",
       "texto": "Recibe el pedido automáticamente y lo prepara (macro 7)."
      },
      {
       "id": "a6",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Confirma el precio del borrador de factura; si se preparó menos, se ajusta la cantidad."
      },
      {
       "id": "a7",
       "rol": "Responsable de facturación (país)",
       "texto": "En los pedidos de contado verifica que el pago esté acreditado, y emite la factura."
      }
     ],
     "diagrama": {
      "carriles": [
       "Vendedor(a) al por Mayor",
       "Gerente de Ventas Mayor (país)",
       "Gerente de Ventas Internacional",
       "Jefe de Bodega",
       "Responsable de facturación (país)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "inicio",
        "n": "Pide la aprobación"
       },
       {
        "id": "n1",
        "carril": "Gerente de Ventas Mayor (país)",
        "tipo": "decision",
        "n": "¿Tiene deuda vencida?"
       },
       {
        "id": "n2",
        "carril": "Gerente de Ventas Mayor (país)",
        "tipo": "fin",
        "n": "Retenido hasta regularizar"
       },
       {
        "id": "n3",
        "carril": "Gerente de Ventas Mayor (país)",
        "tipo": "tarea",
        "n": "Revisar margen del pedido",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n4",
        "carril": "Gerente de Ventas Internacional",
        "tipo": "tarea",
        "n": "Revisar reparto y riesgo",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n5",
        "carril": "Gerente de Ventas Internacional",
        "tipo": "decision",
        "n": "¿Aprueba trabajarlo?"
       },
       {
        "id": "n6",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "fin",
        "n": "Devuelto al vendedor"
       },
       {
        "id": "n7",
        "carril": "Jefe de Bodega",
        "tipo": "tarea",
        "n": "Recibir y preparar el pedido",
        "sistemas": [
         "EBS"
        ]
       },
       {
        "id": "n8",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Confirmar precio del borrador",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n9",
        "carril": "Responsable de facturación (país)",
        "tipo": "tarea",
        "n": "Verificar pago y facturar",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n10",
        "carril": "Responsable de facturación (país)",
        "tipo": "fin",
        "n": "Pedido facturado"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2",
        "etq": "Sí"
       },
       {
        "de": "n1",
        "a": "n3",
        "etq": "No"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6",
        "etq": "No"
       },
       {
        "de": "n5",
        "a": "n7",
        "etq": "Sí"
       },
       {
        "de": "n7",
        "a": "n8"
       },
       {
        "de": "n8",
        "a": "n9"
       },
       {
        "de": "n9",
        "a": "n10"
       }
      ]
     }
    }
   },
   "8.6": {
    "nota_version": "Versión As-Is: describe cómo se vende hoy mercancía en tránsito y qué pasa con la demanda que no se cubre, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La venta contra mercancía que todavía no llegó (preventa) y el tratamiento del pedido que no se puede cubrir. No incluye la compra internacional (macro 6) ni la recepción (7.1).",
     "texto": "Cuando el pedido pide más de lo que hay, el vendedor mira lo que viene en camino. La preventa es **un desarrollo a medida**: una pantalla de Odoo donde el vendedor marca el pedido como preventa, y entonces el sistema descuenta del tránsito en vez del disponible. La visibilidad del tránsito depende de la marca: Casio llega planificada con alrededor de un mes de aviso; Cubitt llega con frecuencia sin aviso suficiente. En Venezuela el tránsito se sigue en un tablero de Lark —con seis etapas, de solicitado a finalizado— y la coordinación de planificación avisa con una semana de antelación; hasta hace poco los vendedores se enteraban cuando la mercancía ya estaba cargada.\n\nLa preventa no queda asegurada al llegar el contenedor. Ninguna unidad aparece disponible hasta que se recibe la última caja, y es la gerencia de inventarios la que tiene que confirmar la preventa para amarrar la mercancía. **Si el sistema de bodega libera la disponibilidad antes de esa confirmación, la mercancía queda libre y la toma el primer vendedor que la vea.** La confirmación automática al cerrar el contenedor está pedida y no existe.\n\nLa segunda mitad del proceso no existe. Lo que no se cubre queda como presupuesto o se borra, y si el tránsito no llega o llega incompleto —Casio ha estado asignando entre el 20 % y el 30 % de lo pedido— se pierde la cuenta de lo que se dejó de vender y de hasta dónde llega la demanda. La gerencia comercial lo señala como la prioridad número uno de la organización. Un vendedor lo describe desde el terreno: el producto estrella se le agota en la bodega del mayor mientras hay miles de unidades en la bodega grande, sin que nadie lo sepa a tiempo."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Vendedor(a) al por Mayor",
     "participantes": [
      "Vendedor(a) al por Mayor — marca la preventa, comunica la fecha al cliente y decide qué hacer con el remanente.",
      "Gerente de Inventario y Precios — confirma las preventas al cerrar la recepción para amarrar la mercancía.",
      "Coordinadora de Planificación de Compras (Rower, Venezuela) — avisa a ventas lo que viene en camino, alrededor de una semana antes.",
      "Gerente de Ventas Internacional — define la brecha como prioridad, sin que exista todavía un registro de la demanda no cubierta."
     ],
     "evidencia": [
      "E-05",
      "E-39",
      "E-07",
      "E-03",
      "E-36",
      "E-35",
      "E-57",
      "E-10",
      "Lark: Proceso Ventas al Mayor Rower (VE)"
     ],
     "notas": "La demanda no cubierta no tiene dueño: nadie la registra ni la consolida. En Venezuela el tablero de Lark permite registrar un faltante con compromiso de cliente como «backorder», que es el único registro que consta.",
     "sin_evidencia": "No consta cómo se hace la preventa en Colombia, ni qué pasa con un faltante que el vendedor borra: si se le avisa a compras por otra vía o se pierde."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Un pedido pide más de lo que hay disponible.",
     "cadencia": "Continua; se concentra en la llegada de cada contenedor.",
     "output": "Pedido cubierto con mercancía en tránsito y fecha comunicada al cliente; o remanente en presupuesto o borrado, sin registro de la demanda perdida.",
     "evidencia": [
      "E-05",
      "E-03"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-05",
      "E-07",
      "E-03",
      "E-36",
      "Lark: Proceso Ventas al Mayor Rower (VE)"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Consulta lo que viene en tránsito: en la pantalla de Odoo, en el tablero de Lark o por el aviso de planificación."
      },
      {
       "id": "a2",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Si no hay tránsito visible, deja el remanente como presupuesto o lo borra. La demanda perdida no se registra en ningún sitio."
      },
      {
       "id": "a3",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Si hay tránsito, marca el pedido como preventa para que descuente del tránsito."
      },
      {
       "id": "a4",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Le comunica al cliente la fecha estimada."
      },
      {
       "id": "a5",
       "rol": "Gerente de Inventario y Precios",
       "texto": "Al cerrar la recepción del contenedor, confirma la preventa y amarra la mercancía."
      },
      {
       "id": "a6",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Si la confirmación llegó a tiempo, el pedido sigue a aprobación (8.5). Si el sistema de bodega liberó antes, la mercancía ya la tomó otro pedido."
      }
     ],
     "diagrama": {
      "carriles": [
       "Vendedor(a) al por Mayor",
       "Gerente de Inventario y Precios"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "inicio",
        "n": "Pedido excede lo disponible"
       },
       {
        "id": "n1",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Consultar lo que viene en tránsito",
        "sistemas": [
         "Odoo",
         "Lark"
        ]
       },
       {
        "id": "n2",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "decision",
        "n": "¿Hay tránsito visible?"
       },
       {
        "id": "n3",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Dejar el resto en presupuesto o borrarlo",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n4",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "fin",
        "n": "Demanda perdida sin registrar"
       },
       {
        "id": "n5",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Marcar como preventa",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n6",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Comunicar fecha al cliente",
        "sistemas": [
         "WhatsApp"
        ]
       },
       {
        "id": "n7",
        "carril": "Gerente de Inventario y Precios",
        "tipo": "tarea",
        "n": "Confirmar la preventa al recibir",
        "sistemas": [
         "EBS"
        ]
       },
       {
        "id": "n8",
        "carril": "Gerente de Inventario y Precios",
        "tipo": "decision",
        "n": "¿Confirmó antes de liberar?"
       },
       {
        "id": "n9",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "fin",
        "n": "Pedido cubierto (pasa a 8.5)"
       },
       {
        "id": "n10",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "fin",
        "n": "Mercancía tomada por otro pedido"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3",
        "etq": "No"
       },
       {
        "de": "n2",
        "a": "n5",
        "etq": "Sí"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8"
       },
       {
        "de": "n8",
        "a": "n9",
        "etq": "Sí"
       },
       {
        "de": "n8",
        "a": "n10",
        "etq": "No"
       }
      ]
     }
    }
   },
   "8.7": {
    "nota_version": "Versión As-Is: describe cómo se atienden hoy las cuentas clave y las grandes superficies, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La atención dedicada a los clientes de alto volumen o de alto reconocimiento: grandes superficies, cadenas y clientes especiales. No incluye el pedido en sí (8.4), el mobiliario (8.13) ni las franquicias (8.8).",
     "texto": "No hay un modelo de cuenta clave común: **cada país lo resuelve con quien tiene**. El más estructurado es Colombia, que desde enero vende directo a las cadenas —antes pasaba por un distribuidor intermediario— y lo notó en el cumplimiento de meta. La jefatura de cuentas clave negocia con el comprador de cada cadena un acuerdo anual, arma un calendario de campañas para que las cadenas no se canibalicen entre sí en el mismo mes, y sigue el inventario y las semanas de cobertura de cada tienda para decidir dónde poner promotores: a la tienda que no tiene inventario suficiente no se le asigna, porque no va a vender. Un líder de impulsadores coordina a unos diecisiete promotores, cuya asistencia se controla con un formulario creado este año.\n\nEn Venezuela la cuenta clave no se define por facturación sino por lo estratégico —reconocimiento de marca, crecimiento, relación con la junta— y la atiende la coordinación de ventas al mayor. Una gran superficie recibe en un solo punto; una cadena, tienda por tienda y con mueble propio, lo que obliga a elegir qué tiendas y qué portafolio. En el hub, la dirección atiende en persona a unos doscientos clientes especiales revisando sus pedidos cada dos a cuatro días, la analista de datos lleva una decena de clientes fuera de zona —alrededor del 10 % de la venta— y la dirección comercial de Cubitt se reserva los mercados grandes y guarda stock adicional para sus clientes principales.\n\nEl sellout que reportan las cadenas llega en formatos distintos y lo normaliza el equipo de datos; ese trabajo nació justamente porque nadie podía ordenar la información de las cadenas. Marketing tiene un equipo de cuentas clave con presupuesto por cliente, pero sus solicitudes entran en cola con las de todos los mercados."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Sin dueño regional: KAM · Cadenas (Colombia), Coordinador de Ventas al Mayor (Venezuela) y la dirección en el hub",
     "participantes": [
      "KAM · Cadenas (Colombia) — negocia el acuerdo anual con cada cadena, fija el calendario de campañas y decide la asignación de promotores según la cobertura de cada tienda.",
      "Líder de impulsadores (Colombia) — coordina a los promotores en las tiendas de las cadenas.",
      "Data Scientist / Líder de BI — normaliza el sellout que envía cada cadena en su propio formato.",
      "Cadena (cliente externo) — reporta sellout e inventario por tienda.",
      "Coordinador de Ventas al Mayor (Venezuela) — atiende las cuentas estratégicas.",
      "Director Comercial y de Compras (socio) — atiende en persona a unos doscientos clientes especiales del hub.",
      "Analista de Datos e Informes — única persona de contacto de una decena de clientes fuera de zona.",
      "Director Comercial Wholesale y Nuevos Negocios (Cubitt) — se reserva los mercados grandes de Cubitt.",
      "Gerente de Cuentas Clave y Proyectos — dirige el equipo de marketing de cuentas clave, con presupuesto por cliente y país."
     ],
     "evidencia": [
      "E-14",
      "E-11",
      "E-35",
      "E-08",
      "E-10",
      "E-63",
      "E-49",
      "E-22",
      "E-01",
      "E-18"
     ],
     "notas": "Cargos tomados de la columna «cargo actual» del V4: KAM · Cadenas, Líder impulsadores, Coordinador de Ventas al Mayor y Gerente de Cuentas Clave y Proyectos. El diagrama sigue el circuito de Colombia, el único que las entrevistas describen de punta a punta.",
     "sin_evidencia": "No consta qué criterio convierte a un cliente en cuenta clave fuera de Venezuela, ni cómo se reparten las cuentas entre la dirección, la analista de datos y la dirección de Cubitt en el hub."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "El inicio del año comercial para el acuerdo con cada cadena; después, el reporte de sellout de cada una.",
     "cadencia": "Anual para el acuerdo; mensual para el calendario de campañas; semanal para el seguimiento en Colombia.",
     "output": "Cuenta atendida en el ciclo: acuerdo vigente, campañas calendarizadas, promotores asignados y reposición pedida.",
     "evidencia": [
      "E-14"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-14",
      "E-11",
      "E-01",
      "E-18"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "KAM · Cadenas (Colombia)",
       "texto": "Negocia con el comprador de la cadena el acuerdo comercial del año."
      },
      {
       "id": "a2",
       "rol": "KAM · Cadenas (Colombia)",
       "texto": "Fija el calendario de campañas por cadena para que no coincidan apuestas que se canibalicen."
      },
      {
       "id": "a3",
       "rol": "Cadena (cliente externo)",
       "texto": "Reporta su sellout e inventario por tienda, en su propio formato."
      },
      {
       "id": "a4",
       "rol": "Data Scientist / Líder de BI",
       "texto": "Normaliza el sellout de cada cadena a una tabla común."
      },
      {
       "id": "a5",
       "rol": "KAM · Cadenas (Colombia)",
       "texto": "Revisa el inventario y las semanas de cobertura de cada tienda."
      },
      {
       "id": "a6",
       "rol": "Líder de impulsadores (Colombia)",
       "texto": "Asigna promotor a las tiendas con inventario suficiente."
      },
      {
       "id": "a7",
       "rol": "KAM · Cadenas (Colombia)",
       "texto": "A las que no lo tienen, les pide reposición (8.4)."
      }
     ],
     "diagrama": {
      "carriles": [
       "KAM · Cadenas (Colombia)",
       "Cadena (cliente externo)",
       "Data Scientist / Líder de BI",
       "Líder de impulsadores (Colombia)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "KAM · Cadenas (Colombia)",
        "tipo": "inicio",
        "n": "Inicio del año comercial"
       },
       {
        "id": "n1",
        "carril": "KAM · Cadenas (Colombia)",
        "tipo": "tarea",
        "n": "Negociar el acuerdo anual"
       },
       {
        "id": "n2",
        "carril": "KAM · Cadenas (Colombia)",
        "tipo": "tarea",
        "n": "Fijar el calendario de campañas"
       },
       {
        "id": "n3",
        "carril": "Cadena (cliente externo)",
        "tipo": "tarea",
        "n": "Reportar sellout e inventario"
       },
       {
        "id": "n4",
        "carril": "Data Scientist / Líder de BI",
        "tipo": "tarea",
        "n": "Normalizar el sellout",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n5",
        "carril": "KAM · Cadenas (Colombia)",
        "tipo": "tarea",
        "n": "Revisar cobertura por tienda",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n6",
        "carril": "KAM · Cadenas (Colombia)",
        "tipo": "decision",
        "n": "¿Tiene inventario suficiente?"
       },
       {
        "id": "n7",
        "carril": "Líder de impulsadores (Colombia)",
        "tipo": "tarea",
        "n": "Asignar promotor a la tienda"
       },
       {
        "id": "n8",
        "carril": "KAM · Cadenas (Colombia)",
        "tipo": "tarea",
        "n": "Pedir reposición (8.4)",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n9",
        "carril": "KAM · Cadenas (Colombia)",
        "tipo": "fin",
        "n": "Cuenta atendida en el ciclo"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7",
        "etq": "Sí"
       },
       {
        "de": "n6",
        "a": "n8",
        "etq": "No"
       },
       {
        "de": "n7",
        "a": "n9"
       },
       {
        "de": "n8",
        "a": "n9"
       }
      ]
     }
    }
   },
   "8.8": {
    "nota_version": "Versión As-Is: describe cómo se atiende hoy a los franquiciados Casio, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La relación con los franquiciados Casio. No incluye las tiendas propias (macro 9) ni el mobiliario (8.13).",
     "texto": "La gestión de franquicias **se abandonó con el tiempo**. En Venezuela, de las 39 que hubo quedan dos activas, y la relación se reduce a que llegan, piden otro pedido y se les despacha, como a cualquier cliente del mayor. La coordinación de ventas al mayor las visita y les envía material. No hay contrato vigente con regalía, no hay acceso pactado a los datos de venta del franquiciado, no se negocian remodelaciones y no se le trasladan a Casio las necesidades para pedirle apoyo. La propia gerencia lo resume: *«Eso debería suceder. No está sucediendo»*.\n\nSe está retomando por las aperturas nuevas: se redacta un contrato con regalía, empezando por Nicaragua. Pero ese trabajo no lo lleva ventas al mayor sino la gerencia regional de retail, que reconoce que debería ser del mayor porque es quien le vende el producto al franquiciado. **El proceso queda en una zona gris entre los dos macroprocesos.**"
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Coordinador de Ventas al Mayor (Venezuela)",
     "participantes": [
      "Coordinador de Ventas al Mayor (Venezuela) — tramita los pedidos de las dos franquicias activas, las visita y les envía material.",
      "Franquiciado (externo) — pide mercancía como cualquier cliente mayorista.",
      "Regional Manager Retail — prepara el contrato con regalía de las aperturas nuevas, aunque considera que la función le corresponde al mayor."
     ],
     "evidencia": [
      "E-35",
      "E-55"
     ],
     "notas": "Cargos tomados de la columna «cargo actual» del V4: Coordinador de Ventas al Mayor y Regional Manager Retail.",
     "sin_evidencia": "No consta cómo se atienden las franquicias fuera de Venezuela, ni con qué condiciones comerciales compran las dos activas: si tienen lista o descuento propios."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "El franquiciado necesita reponer mercancía.",
     "cadencia": "A demanda del franquiciado; no hay revisión periódica de la relación.",
     "output": "Pedido despachado. No se genera contrato, reporte de venta ni plan de remodelación.",
     "evidencia": [
      "E-35"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-35",
      "E-55"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Franquiciado (externo)",
       "texto": "Pide mercancía cuando necesita reponer."
      },
      {
       "id": "a2",
       "rol": "Coordinador de Ventas al Mayor (Venezuela)",
       "texto": "Monta y tramita el pedido como el de cualquier cliente mayorista (8.4 y 8.5)."
      },
      {
       "id": "a3",
       "rol": "Coordinador de Ventas al Mayor (Venezuela)",
       "texto": "Visita la franquicia y le envía material."
      },
      {
       "id": "a4",
       "rol": "Coordinador de Ventas al Mayor (Venezuela)",
       "texto": "No se revisa contrato, no se cobra regalía y no se recogen datos de venta del franquiciado."
      }
     ],
     "diagrama": {
      "carriles": [
       "Franquiciado (externo)",
       "Coordinador de Ventas al Mayor (Venezuela)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Franquiciado (externo)",
        "tipo": "inicio",
        "n": "Necesita reponer"
       },
       {
        "id": "n1",
        "carril": "Franquiciado (externo)",
        "tipo": "tarea",
        "n": "Pedir mercancía"
       },
       {
        "id": "n2",
        "carril": "Coordinador de Ventas al Mayor (Venezuela)",
        "tipo": "tarea",
        "n": "Tramitar el pedido (8.4)",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n3",
        "carril": "Coordinador de Ventas al Mayor (Venezuela)",
        "tipo": "tarea",
        "n": "Visitar y enviar material"
       },
       {
        "id": "n4",
        "carril": "Coordinador de Ventas al Mayor (Venezuela)",
        "tipo": "fin",
        "n": "Despachado, sin contrato ni datos"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4"
       }
      ]
     }
    }
   },
   "8.9": {
    "nota_version": "Versión As-Is: describe cómo se vende hoy a empresas que compran para su personal o para regalar con su marca, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La venta a empresas que compran para consumo propio, para sus colaboradores o para repartir con su marca o en co-branding. No incluye la marca privada completa (8.11) ni las promociones con cadenas (8.10).",
     "texto": "En Panamá la venta corporativa tiene **un vendedor dedicado**, figura creada durante la pandemia. Busca por internet empresas con muchos colaboradores, arma una lista de las diez primeras y contacta a su área de recursos humanos, a veces a través de conocidos. La oferta es estándar: un correo que dice que la empresa califica como cliente corporativo, con un 25 % de descuento; el colaborador paga en cuatro quincenas y la empresa le paga a Kenex a sesenta días. También atiende ferias dentro de las empresas: lleva muestras, toma pedidos sin entregar nada y despacha dos o tres días después contra el consolidado que manda la empresa. Concesionarios de autos, constructoras y marcas de consumo compran para regalar con su venta; una de estas cuentas factura entre 10.000 y 15.000 dólares al mes.\n\nCuando el producto lleva logo, el vendedor lo pide al área interna de grabado con una plantilla de Lark —datos del cliente, pedido, posición del logo, cantidad y fecha—, con plazos de un día para pocas piezas y hasta quince para volúmenes grandes. En el co-branding con varias marcas a la vez, **cada gerente de marketing de cada marca patrocinante tiene que aprobar color, forma y arte**, lo que alarga la venta. Aquí no se usan las listas: se negocia sobre el costo con el margen que el volumen permite.\n\nEn Venezuela no consta un vendedor dedicado; el canal web ha resuelto pedidos corporativos grandes con autorización verbal de la dirección. En Colombia la venta corporativa se está montando: están contratando a alguien para eso."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Vendedor(a) al por Mayor (Panamá)",
     "participantes": [
      "Vendedor(a) al por Mayor (Panamá) — dedicado a corporativo: prospecta, oferta, toma el pedido y pide el grabado.",
      "Empresa cliente (externo) — acepta la oferta y, si el producto lleva su marca, envía y aprueba el arte.",
      "Área de grabado (Customer Service) — graba el logo sobre el producto.",
      "Gerente de Ventas Internacional — aprueba, con administración, el pago a proveedores de personalización cuando interviene uno externo.",
      "Gerente de Cuentas Clave y Proyectos — activa en marketing las alianzas de co-branding con un presupuesto proporcional a la venta."
     ],
     "evidencia": [
      "E-57",
      "E-39",
      "E-63",
      "E-35",
      "E-49",
      "E-58",
      "E-41"
     ],
     "notas": "El vendedor dedicado figura en el V4 como «Vendedor» del departamento Ventas Mayor PTY. El área de grabado depende de la gerencia de Customer Service.",
     "sin_evidencia": "No consta quién aprueba el margen de una venta a costo más margen, ni cómo se decide que un pedido corporativo grande vaya por el canal web o por el mayor."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "El vendedor identifica una empresa objetivo, o una empresa pide una propuesta.",
     "cadencia": "Continua; las alianzas de co-branding llegan por campaña.",
     "output": "Pedido corporativo entregado —con o sin grabado— y cobrado a sesenta días.",
     "evidencia": [
      "E-57"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-57",
      "E-63",
      "E-35"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Vendedor(a) al por Mayor (Panamá)",
       "texto": "Busca empresas con muchos colaboradores y arma su lista de las diez primeras."
      },
      {
       "id": "a2",
       "rol": "Vendedor(a) al por Mayor (Panamá)",
       "texto": "Envía la oferta corporativa: 25 % de descuento y pago del colaborador en cuatro quincenas."
      },
      {
       "id": "a3",
       "rol": "Empresa cliente (externo)",
       "texto": "Revisa la oferta y decide si el producto lleva su logo o su marca."
      },
      {
       "id": "a4",
       "rol": "Empresa cliente (externo)",
       "texto": "Si lleva marca, envía el arte y lo aprueba; en co-branding aprueba cada marca patrocinante."
      },
      {
       "id": "a5",
       "rol": "Vendedor(a) al por Mayor (Panamá)",
       "texto": "Pide el grabado con la plantilla de Lark, con posición, cantidad y fecha de entrega."
      },
      {
       "id": "a6",
       "rol": "Área de grabado (Customer Service)",
       "texto": "Graba el producto."
      },
      {
       "id": "a7",
       "rol": "Vendedor(a) al por Mayor (Panamá)",
       "texto": "Monta el pedido (8.4); la empresa paga a sesenta días."
      }
     ],
     "diagrama": {
      "carriles": [
       "Vendedor(a) al por Mayor (Panamá)",
       "Empresa cliente (externo)",
       "Área de grabado (Customer Service)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Vendedor(a) al por Mayor (Panamá)",
        "tipo": "inicio",
        "n": "Empresa identificada"
       },
       {
        "id": "n1",
        "carril": "Vendedor(a) al por Mayor (Panamá)",
        "tipo": "tarea",
        "n": "Enviar la oferta corporativa",
        "sistemas": [
         "Correo"
        ]
       },
       {
        "id": "n2",
        "carril": "Empresa cliente (externo)",
        "tipo": "tarea",
        "n": "Revisar la oferta"
       },
       {
        "id": "n3",
        "carril": "Empresa cliente (externo)",
        "tipo": "decision",
        "n": "¿Lleva logo o marca?"
       },
       {
        "id": "n4",
        "carril": "Empresa cliente (externo)",
        "tipo": "tarea",
        "n": "Enviar y aprobar el arte"
       },
       {
        "id": "n5",
        "carril": "Vendedor(a) al por Mayor (Panamá)",
        "tipo": "tarea",
        "n": "Pedir el grabado",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n6",
        "carril": "Área de grabado (Customer Service)",
        "tipo": "tarea",
        "n": "Grabar el producto"
       },
       {
        "id": "n7",
        "carril": "Vendedor(a) al por Mayor (Panamá)",
        "tipo": "tarea",
        "n": "Montar el pedido (8.4)",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n8",
        "carril": "Vendedor(a) al por Mayor (Panamá)",
        "tipo": "fin",
        "n": "Entregado; cobro a 60 días"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4",
        "etq": "Sí"
       },
       {
        "de": "n3",
        "a": "n7",
        "etq": "No"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8"
       }
      ]
     }
    }
   },
   "8.10": {
    "nota_version": "Versión As-Is: describe cómo se deciden y ejecutan hoy las campañas de alto volumen y las promociones tácticas, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "Las campañas cortas de volumen alto con cadenas de consumo masivo y las promociones de descuento para rotar producto. No incluye el co-branding corporativo (8.9) ni la ejecución gráfica completa, que es de marketing.",
     "texto": "La campaña que sirve de referencia es la de diciembre de 2025: con la mecánica de «por la compra de 40 dólares, llévate un producto Cubitt a mitad de precio» en cadenas de consumo masivo, se comprometieron 85.000 unidades y se vendieron 70.000 en mes y medio. La marca, según su dirección comercial, *«tenía miedo de los descuentos»*; una rebaja del 40 % por cambio de línea vendió más que nunca y desde entonces el descuento agresivo se usa a propósito para mover volumen.\n\nLa aprobación se concentró en una sola persona tras un episodio en que distintos miembros de la junta aprobaban y desaprobaban la misma promoción, incluso ya publicada: **hoy la aprueba el director comercial**, caso a caso, porque no hay un margen mínimo que permita decidir sin escalar. En Venezuela las propuestas salen cada mes de mercadeo y planificación, sobre los productos que necesitan rotación, y van a la junta.\n\nLa ejecución es la parte desordenada. Comercial declara cada promoción en un formulario de Lark para que marketing la ejecute; llegan unas cinco por país al mes y la información cambia a mitad del proceso. Hay un doble filtro —la aprobación interna y la aceptación de la cadena— que impide automatizarlo, y marketing señala un vacío de responsabilidad: se le pidió definir promociones sin tener acceso al inventario."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Director Comercial Wholesale y Nuevos Negocios (Cubitt)",
     "participantes": [
      "Director Comercial Wholesale y Nuevos Negocios (Cubitt) — identifica la oportunidad, propone la mecánica y el volumen y negocia con la cadena.",
      "Director Comercial y de Compras (socio) — aprueba cada promoción.",
      "Gerente de Cuentas Clave y Proyectos — recibe la promoción por el formulario de Lark y la ejecuta desde marketing.",
      "Cadena (cliente externo) — acepta la promoción con su propio proceso.",
      "Gerente de Mercadeo (Venezuela) — propone cada mes, con planificación, las promociones para los productos que necesitan rotar."
     ],
     "evidencia": [
      "E-63",
      "E-42",
      "E-40",
      "E-49",
      "E-22"
     ],
     "notas": "La dirección comercial de Cubitt no figura en el V4; se nombra por la función que describe en su entrevista.",
     "sin_evidencia": "No consta cómo se reserva el inventario para una campaña de volumen, ni cómo se mide después si la promoción dejó margen."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Una oportunidad de volumen con una cadena, o un producto que necesita rotar.",
     "cadencia": "Mensual para las promociones —unas cinco por país—; las campañas de volumen, por temporada.",
     "output": "Promoción aprobada, declarada a marketing y en curso, con el pedido de volumen montado.",
     "evidencia": [
      "E-49",
      "E-22",
      "E-42"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-63",
      "E-42",
      "E-49",
      "E-22"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Director Comercial Wholesale y Nuevos Negocios (Cubitt)",
       "texto": "Propone la mecánica y el volumen de la promoción."
      },
      {
       "id": "a2",
       "rol": "Director Comercial y de Compras (socio)",
       "texto": "Aprueba o descarta la promoción, caso a caso."
      },
      {
       "id": "a3",
       "rol": "Director Comercial Wholesale y Nuevos Negocios (Cubitt)",
       "texto": "La declara en el formulario de Lark para que marketing la ejecute."
      },
      {
       "id": "a4",
       "rol": "Cadena (cliente externo)",
       "texto": "La acepta o la rechaza con su propio proceso."
      },
      {
       "id": "a5",
       "rol": "Gerente de Cuentas Clave y Proyectos",
       "texto": "Produce las piezas y la activación. Con frecuencia la información cambia a mitad del proceso."
      },
      {
       "id": "a6",
       "rol": "Director Comercial Wholesale y Nuevos Negocios (Cubitt)",
       "texto": "Monta el pedido de volumen (8.4). Si la cadena no acepta, se renegocia o se cae."
      }
     ],
     "diagrama": {
      "carriles": [
       "Director Comercial Wholesale y Nuevos Negocios (Cubitt)",
       "Director Comercial y de Compras (socio)",
       "Cadena (cliente externo)",
       "Gerente de Cuentas Clave y Proyectos"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Director Comercial Wholesale y Nuevos Negocios (Cubitt)",
        "tipo": "inicio",
        "n": "Oportunidad o producto por rotar"
       },
       {
        "id": "n1",
        "carril": "Director Comercial Wholesale y Nuevos Negocios (Cubitt)",
        "tipo": "tarea",
        "n": "Proponer mecánica y volumen"
       },
       {
        "id": "n2",
        "carril": "Director Comercial y de Compras (socio)",
        "tipo": "decision",
        "n": "¿Aprueba la promoción?"
       },
       {
        "id": "n3",
        "carril": "Director Comercial y de Compras (socio)",
        "tipo": "fin",
        "n": "Promoción descartada"
       },
       {
        "id": "n4",
        "carril": "Director Comercial Wholesale y Nuevos Negocios (Cubitt)",
        "tipo": "tarea",
        "n": "Declararla para marketing",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n5",
        "carril": "Cadena (cliente externo)",
        "tipo": "decision",
        "n": "¿La acepta la cadena?"
       },
       {
        "id": "n6",
        "carril": "Director Comercial Wholesale y Nuevos Negocios (Cubitt)",
        "tipo": "fin",
        "n": "Se renegocia o se cae"
       },
       {
        "id": "n7",
        "carril": "Gerente de Cuentas Clave y Proyectos",
        "tipo": "tarea",
        "n": "Producir piezas y activación"
       },
       {
        "id": "n8",
        "carril": "Director Comercial Wholesale y Nuevos Negocios (Cubitt)",
        "tipo": "tarea",
        "n": "Montar el pedido de volumen",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n9",
        "carril": "Director Comercial Wholesale y Nuevos Negocios (Cubitt)",
        "tipo": "fin",
        "n": "Promoción en curso"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3",
        "etq": "No"
       },
       {
        "de": "n2",
        "a": "n4",
        "etq": "Sí"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6",
        "etq": "No"
       },
       {
        "de": "n5",
        "a": "n7",
        "etq": "Sí"
       },
       {
        "de": "n7",
        "a": "n8"
       },
       {
        "de": "n8",
        "a": "n9"
       }
      ]
     }
    }
   },
   "8.11": {
    "nota_version": "Versión As-Is: describe cómo se atiende hoy al cliente que pide producto fabricado con su propia marca, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "Desde que un cliente pide un producto con su marca hasta que se le factura y despacha. No incluye la compra a fábrica, que sigue el circuito de compras de marca propia (macro 6).",
     "texto": "La marca privada es un negocio real: el año pasado facturó **casi dos millones de dólares** con clientes de ropa deportiva y consumo que piden audífonos, termos o bocinas con su marca. El circuito que describe la dirección comercial de Cubitt es corto: se le diseña el producto al cliente, ve la muestra, la aprueba, firma la proforma, se produce, se le factura y se despacha. Para armarlo intervienen varias áreas internas, sin que se detalle cuáles ni en qué orden.\n\nEs el proceso con menos evidencia del macroproceso: las entrevistas lo confirman como negocio pero no lo describen paso a paso."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Director Comercial Wholesale y Nuevos Negocios (Cubitt)",
     "participantes": [
      "Director Comercial Wholesale y Nuevos Negocios (Cubitt) — lleva la relación con el cliente, le presenta el diseño y le hace firmar la proforma.",
      "Cliente de marca privada (externo) — aprueba la muestra y firma la proforma.",
      "Áreas internas de producto y compras — diseñan, hacen la muestra y gestionan la producción."
     ],
     "evidencia": [
      "E-63"
     ],
     "notas": "Una sola entrevista describe el proceso; el carril de áreas internas agrupa lo que ella misma no desglosa.",
     "sin_evidencia": "No consta quién diseña el producto, si se cobra anticipo, cuánto tarda el ciclo, cómo se costea ni qué pasa si el cliente no aprueba la muestra."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Un cliente pide un producto fabricado con su propia marca.",
     "cadencia": "A demanda.",
     "output": "Producto con la marca del cliente, facturado y despachado.",
     "evidencia": [
      "E-63"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-63"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Cliente de marca privada (externo)",
       "texto": "Pide un producto con su marca."
      },
      {
       "id": "a2",
       "rol": "Áreas internas de producto y compras",
       "texto": "Diseñan el producto y hacen la muestra."
      },
      {
       "id": "a3",
       "rol": "Cliente de marca privada (externo)",
       "texto": "Revisa y aprueba la muestra."
      },
      {
       "id": "a4",
       "rol": "Director Comercial Wholesale y Nuevos Negocios (Cubitt)",
       "texto": "Le hace firmar la proforma."
      },
      {
       "id": "a5",
       "rol": "Áreas internas de producto y compras",
       "texto": "Gestionan la producción del pedido."
      },
      {
       "id": "a6",
       "rol": "Director Comercial Wholesale y Nuevos Negocios (Cubitt)",
       "texto": "Se factura y se despacha (8.4 y 8.5)."
      }
     ],
     "diagrama": {
      "carriles": [
       "Cliente de marca privada (externo)",
       "Áreas internas de producto y compras",
       "Director Comercial Wholesale y Nuevos Negocios (Cubitt)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Cliente de marca privada (externo)",
        "tipo": "inicio",
        "n": "Pide producto con su marca"
       },
       {
        "id": "n1",
        "carril": "Áreas internas de producto y compras",
        "tipo": "tarea",
        "n": "Diseñar y hacer la muestra"
       },
       {
        "id": "n2",
        "carril": "Cliente de marca privada (externo)",
        "tipo": "tarea",
        "n": "Aprobar la muestra"
       },
       {
        "id": "n3",
        "carril": "Director Comercial Wholesale y Nuevos Negocios (Cubitt)",
        "tipo": "tarea",
        "n": "Hacer firmar la proforma"
       },
       {
        "id": "n4",
        "carril": "Áreas internas de producto y compras",
        "tipo": "tarea",
        "n": "Producir el pedido"
       },
       {
        "id": "n5",
        "carril": "Director Comercial Wholesale y Nuevos Negocios (Cubitt)",
        "tipo": "tarea",
        "n": "Facturar y despachar",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n6",
        "carril": "Director Comercial Wholesale y Nuevos Negocios (Cubitt)",
        "tipo": "fin",
        "n": "Entregado al cliente"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       }
      ]
     }
    }
   },
   "8.12": {
    "nota_version": "Versión As-Is: describe cómo se consiguen y se abren hoy los clientes nuevos del mayor, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "Desde que aparece un prospecto hasta que hace su primera compra y queda creado como cliente. No incluye la asignación de condiciones de crédito (8.2).",
     "texto": "La mayor parte de los clientes nuevos **llega por referidos**: de otros distribuidores, de clientes existentes o por consultas en la web que se canalizan al vendedor de esa línea. En Panamá el prospecto que escribe por WhatsApp se asigna por Lark, según su ubicación, al vendedor de la zona, y el tiempo desde el primer contacto hasta el cierre se ha empezado a medir hace poco. En Venezuela el canal desapareció entre 2018 y 2021 —se fueron los siete vendedores del mayor— y se reconstruyó cliente a cliente, sin zonificar: un cliente nuevo se le daba a quien estuviera; dos ejecutivos recién incorporados trabajan también sobre referidos.\n\nLa búsqueda activa depende de cada vendedor. La dirección comercial de Cubitt usa su propia «escalera» de cinco pasos —analizar al prospecto, acercarse, venderle empezando por sus cinco mejores puntos de venta, expandirse al resto de tiendas y crecer en volumen—. Otros prospectan por correo masivo a empresas, y un vendedor ha probado a buscar prospectos por zona con una herramienta de IA sobre mapas y a llevarlos en un registro propio, que el propio equipo califica de *«muy verde todavía»*.\n\nLa apertura es sencilla: en Panamá la primera compra de un revendedor se pide surtida, de unos 700 a 800 dólares, con un margen de reventa del 35 % y siempre de contado; en Venezuela el cliente se crea en Odoo solo con el RIF. Arranca siempre con el descuento más bajo."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Vendedor(a) al por Mayor",
     "participantes": [
      "Vendedor(a) al por Mayor — analiza al prospecto, se acerca, le hace la primera venta y lo da de alta.",
      "Gerente de Ventas Mayor (país) — asigna el prospecto al vendedor; en Panamá por Lark y según la ubicación.",
      "Prospecto (externo) — escribe, llega referido o es buscado.",
      "Director Comercial Wholesale y Nuevos Negocios (Cubitt) — aplica su escalera de cinco pasos con los clientes grandes de Cubitt."
     ],
     "evidencia": [
      "E-57",
      "E-36",
      "E-35",
      "E-63",
      "E-58",
      "E-48",
      "SC Taller de IA y arquitectura de datos (Panamá)",
      "Lark: Procesos de Ventas al Mayor (PA)"
     ],
     "notas": "El monto de primera compra y el margen de reventa son los que aplica un vendedor del hub con sus revendedores; no constan escritos como política.",
     "sin_evidencia": "No consta cómo se asigna el prospecto en Venezuela y Colombia, ni un criterio para descartarlo. En Colombia solo consta que la jefatura de cuentas clave negocia directamente con los compradores de cada cadena antes de entrar."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Un prospecto escribe, llega referido o el vendedor lo encuentra.",
     "cadencia": "Continua; sin meta de prospección declarada.",
     "output": "Cliente creado en Odoo, de contado, con su primera compra hecha.",
     "evidencia": [
      "E-57",
      "E-36"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-57",
      "E-63",
      "E-36",
      "Lark: Procesos de Ventas al Mayor (PA)"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Prospecto (externo)",
       "texto": "Escribe por WhatsApp o por la web, llega referido o es buscado por el vendedor."
      },
      {
       "id": "a2",
       "rol": "Gerente de Ventas Mayor (país)",
       "texto": "Asigna el prospecto a un vendedor; en Panamá, por Lark y según la ubicación. En Venezuela no hay zonificación."
      },
      {
       "id": "a3",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Analiza al prospecto: sus puntos de venta, sus redes y su tamaño."
      },
      {
       "id": "a4",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Se acerca y le ofrece una primera compra surtida, con el descuento más bajo."
      },
      {
       "id": "a5",
       "rol": "Prospecto (externo)",
       "texto": "Hace o no la primera compra."
      },
      {
       "id": "a6",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Si compra, lo da de alta en Odoo, de contado."
      },
      {
       "id": "a7",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Amplía después a más puntos de venta y más volumen."
      }
     ],
     "diagrama": {
      "carriles": [
       "Prospecto (externo)",
       "Gerente de Ventas Mayor (país)",
       "Vendedor(a) al por Mayor"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Prospecto (externo)",
        "tipo": "inicio",
        "n": "Escribe, es referido o es buscado"
       },
       {
        "id": "n1",
        "carril": "Gerente de Ventas Mayor (país)",
        "tipo": "tarea",
        "n": "Asignar a un vendedor",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n2",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Analizar al prospecto"
       },
       {
        "id": "n3",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Ofrecer la primera compra",
        "sistemas": [
         "WhatsApp"
        ]
       },
       {
        "id": "n4",
        "carril": "Prospecto (externo)",
        "tipo": "decision",
        "n": "¿Hace la primera compra?"
       },
       {
        "id": "n5",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "fin",
        "n": "Queda como prospecto"
       },
       {
        "id": "n6",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Dar de alta, de contado",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n7",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Ampliar puntos y volumen"
       },
       {
        "id": "n8",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "fin",
        "n": "Cliente activo"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5",
        "etq": "No"
       },
       {
        "de": "n4",
        "a": "n6",
        "etq": "Sí"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8"
       }
      ]
     }
    }
   },
   "8.13": {
    "nota_version": "Versión As-Is: describe cómo se piden y se producen hoy el mobiliario, el material POP y las activaciones para clientes del mayor, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "Desde que el vendedor pide un mueble, material POP o una activación para un cliente mayorista hasta que queda instalado. No incluye el mobiliario de las tiendas propias (macro 9).",
     "texto": "El pedido nace del vendedor, y por dónde llega depende del país. **Solo Panamá usa de forma sistemática el formulario de Lark**: la solicitud llega a la coordinación regional de visual, que la asigna a una ejecutiva, y el vendedor puede seguir su estado. En Venezuela y en los demás países se pide por WhatsApp o por correo, y las solicitudes se pierden. Antes de aprobar, visual mira cuánto compra el cliente al mes, si está al día en sus pagos y cuánto espacio tiene; en Colombia, desde este año, toda solicitud tiene que venir con un plan de compra que justifique la inversión. El cliente se «cría»: primero recibe un apoyo mínimo, y solo con volumen sostenido llega el mueble.\n\nHay un catálogo interno con los muebles estándar del año y su costo aproximado; lo que no está en catálogo requiere visita, medición y diseño a medida. Los tiempos que describe la dirección comercial de Cubitt son largos: de uno a tres días para levantar la solicitud, de tres a seis para las propuestas, y de 25 a 37 días hábiles para un mueble nuevo u 8 a 15 para uno de catálogo. **El mismo circuito se aplica a pedir tres muebles más de un modelo ya aprobado.** La producción depende de proveedores externos que no trabajan en exclusiva, y en Venezuela todo diseño pasa por Panamá, con un plazo nominal de cinco días hábiles que en la práctica llega a ocho.\n\nEn Venezuela el mayor queda desatendido: dos o tres personas de visual cubren también veinte tiendas propias, que tienen prioridad, y un cliente mayorista puede pasar cinco o seis meses sin visita. El control es un Excel semanal que va atrasado, y el presupuesto del año no se había comunicado a agosto. Se ha dado al menos un caso en que un proveedor llevó su presupuesto directamente a administración, saltándose el circuito, y bloqueó la salida de un mueble ya asignado. El material digital de campaña se comparte con los clientes por Drive o Dropbox."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente Regional de Visual Merchandising",
     "participantes": [
      "Gerente Regional de Visual Merchandising — aprueba en Lark los pagos de las solicitudes y fija los criterios de inversión.",
      "Coordinadora Regional de Visual — recibe las solicitudes del formulario, las asigna a una ejecutiva y decide si la inversión se justifica.",
      "Equipo de Visual (país) — evalúa al cliente, propone o diseña el mueble, lo instala y deja evidencia. En Venezuela lo lleva el Coordinador(a) Visual con dos asistentes.",
      "Vendedor(a) al por Mayor — detecta la necesidad y hace la solicitud.",
      "Proveedor de mobiliario (externo) — produce el mueble o el material.",
      "Director Comercial Wholesale y Nuevos Negocios (Cubitt) — convoca la reunión inicial con comercial y visual en las solicitudes de Cubitt."
     ],
     "evidencia": [
      "E-50",
      "E-31",
      "E-63",
      "E-14",
      "E-39",
      "E-42",
      "E-36"
     ],
     "notas": "Cargos tomados de la columna «cargo actual» del V4: Gerente Regional de Visual Merchandising, Coordinador(a) Visual y Asistente de Visual. En Venezuela visual depende de la gerencia de ventas al mayor.",
     "sin_evidencia": "No consta quién responde por la reparación de un mueble ya instalado, ni cuál es el presupuesto de visual por país ni quién lo asigna."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Un cliente del mayor necesita mueble, material POP o una activación, o una campaña requiere material en su punto de venta.",
     "cadencia": "A demanda; el seguimiento en Venezuela es un Excel semanal.",
     "output": "Mueble o material instalado en el punto de venta del cliente, con fotografía de antes y después.",
     "evidencia": [
      "E-50",
      "E-31"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-50",
      "E-31",
      "E-63",
      "E-14"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Pide el mueble o el material: por el formulario de Lark en Panamá, por WhatsApp o correo en los demás países."
      },
      {
       "id": "a2",
       "rol": "Coordinadora Regional de Visual",
       "texto": "Recibe la solicitud y la asigna a una ejecutiva."
      },
      {
       "id": "a3",
       "rol": "Equipo de Visual (país)",
       "texto": "Evalúa cuánto compra el cliente, si está al día y cuánto espacio tiene; en Colombia exige además un plan de compra."
      },
      {
       "id": "a4",
       "rol": "Coordinadora Regional de Visual",
       "texto": "Decide si la inversión se justifica; si no, la solicitud no sigue."
      },
      {
       "id": "a5",
       "rol": "Equipo de Visual (país)",
       "texto": "Si se justifica, propone un mueble del catálogo o, si no lo hay, visita, mide y diseña a medida."
      },
      {
       "id": "a6",
       "rol": "Gerente Regional de Visual Merchandising",
       "texto": "Aprueba el pago en Lark."
      },
      {
       "id": "a7",
       "rol": "Proveedor de mobiliario (externo)",
       "texto": "Produce el mueble, en turnos compartidos con otros clientes."
      },
      {
       "id": "a8",
       "rol": "Equipo de Visual (país)",
       "texto": "Lo instala y lo fotografía antes y después, cuando hay tiempo para hacerlo."
      }
     ],
     "diagrama": {
      "carriles": [
       "Vendedor(a) al por Mayor",
       "Coordinadora Regional de Visual",
       "Equipo de Visual (país)",
       "Gerente Regional de Visual Merchandising",
       "Proveedor de mobiliario (externo)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "inicio",
        "n": "El cliente necesita mueble o POP"
       },
       {
        "id": "n1",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Hacer la solicitud",
        "sistemas": [
         "Lark",
         "WhatsApp"
        ]
       },
       {
        "id": "n2",
        "carril": "Coordinadora Regional de Visual",
        "tipo": "tarea",
        "n": "Asignar la solicitud",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n3",
        "carril": "Equipo de Visual (país)",
        "tipo": "tarea",
        "n": "Evaluar compra, cartera y espacio"
       },
       {
        "id": "n4",
        "carril": "Coordinadora Regional de Visual",
        "tipo": "decision",
        "n": "¿Justifica la inversión?"
       },
       {
        "id": "n5",
        "carril": "Coordinadora Regional de Visual",
        "tipo": "fin",
        "n": "Solicitud no aprobada"
       },
       {
        "id": "n6",
        "carril": "Equipo de Visual (país)",
        "tipo": "decision",
        "n": "¿Hay mueble de catálogo?"
       },
       {
        "id": "n7",
        "carril": "Equipo de Visual (país)",
        "tipo": "tarea",
        "n": "Proponer el de catálogo"
       },
       {
        "id": "n8",
        "carril": "Equipo de Visual (país)",
        "tipo": "tarea",
        "n": "Medir y diseñar a medida"
       },
       {
        "id": "n9",
        "carril": "Gerente Regional de Visual Merchandising",
        "tipo": "tarea",
        "n": "Aprobar el pago",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n10",
        "carril": "Proveedor de mobiliario (externo)",
        "tipo": "tarea",
        "n": "Producir el mueble"
       },
       {
        "id": "n11",
        "carril": "Equipo de Visual (país)",
        "tipo": "tarea",
        "n": "Instalar y fotografiar"
       },
       {
        "id": "n12",
        "carril": "Equipo de Visual (país)",
        "tipo": "fin",
        "n": "Mueble instalado"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5",
        "etq": "No"
       },
       {
        "de": "n4",
        "a": "n6",
        "etq": "Sí"
       },
       {
        "de": "n6",
        "a": "n7",
        "etq": "Sí"
       },
       {
        "de": "n6",
        "a": "n8",
        "etq": "No"
       },
       {
        "de": "n7",
        "a": "n9"
       },
       {
        "de": "n8",
        "a": "n9"
       },
       {
        "de": "n9",
        "a": "n10"
       },
       {
        "de": "n10",
        "a": "n11"
       },
       {
        "de": "n11",
        "a": "n12"
       }
      ]
     }
    }
   },
   "8.14": {
    "nota_version": "Versión As-Is: describe cómo se calculan, aprueban y pagan hoy las comisiones de los vendedores del mayor, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "Desde el cierre de mes hasta el pago de la comisión al vendedor del mayor. No incluye las comisiones de tienda ni de venta web, que pasan por recursos humanos.",
     "texto": "La regla es la misma en todos los países que la describen: **la comisión se paga sobre lo cobrado, no sobre lo facturado.** Lo que cambia es la mecánica. En Venezuela cada vendedor lleva a mano un Excel diario de quién le pagó, con fecha, tasa, bolívares y dólares, y lo entrega al cierre de mes; el propio equipo reconoce que eso debería ser automático. La gerencia de ventas al mayor calcula la comisión sobre lo cobrado, pide a cuentas por cobrar un listado de las facturas cobradas por cliente para contrastarlo —un pedido suyo, no un paso establecido— y envía el reporte por correo a la presidencia y a la dirección. La presidencia tiene que aprobarlo, y la gerencia tiene que recordárselo *«insistentemente»* hasta que lo hace; con esa aprobación, administración ejecuta el pago.\n\n**Recursos humanos no interviene** en las comisiones del mayor, a diferencia de las de tienda, web y servicio técnico: en Venezuela y en Panamá las lleva la línea comercial. En Colombia la comisión tiene techo y una tabla de tramos según el descuento dado al cliente, y se paga completa solo si el vendedor recauda completo; se conversa con cada vendedor a solas, y se usa para empujar la cobranza mostrándole lo que deja de ganar por sus cuentas vencidas. En Panamá la gerencia comparte cada lunes el avance contra la meta «por el tema del bono». No hay un esquema común entre países."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente de Ventas al Mayor (Venezuela)",
     "participantes": [
      "Gerente de Ventas al Mayor (Venezuela) — calcula la comisión sobre lo cobrado, la contrasta y envía el reporte.",
      "Vendedor(a) al por Mayor — lleva su Excel diario de cobros y lo entrega al cierre.",
      "Coordinadora de Cuentas por Cobrar (Venezuela) — entrega, a pedido de la gerencia, el listado de facturas cobradas por cliente.",
      "Presidente (socio) — aprueba el reporte de comisiones.",
      "Gerente de Administración (Venezuela) — ejecuta el pago una vez aprobado.",
      "KAM · Cadenas (Colombia) — en Colombia aplica la tabla de tramos y conversa la comisión con cada vendedor."
     ],
     "evidencia": [
      "E-35",
      "E-36",
      "E-48",
      "E-37",
      "E-54",
      "E-14",
      "E-39",
      "E-05"
     ],
     "notas": "El diagrama sigue el circuito de Venezuela, el único descrito de punta a punta. En Panamá consta solo que el cálculo lo lleva el gerente de ventas de cada equipo.",
     "sin_evidencia": "No consta la tabla de comisión de Venezuela ni la de Panamá, ni cómo se resuelve una diferencia entre el Excel del vendedor y el listado de cobranza."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "El cierre de mes.",
     "cadencia": "Mensual. La aprobación no tiene plazo y depende de que la presidencia responda al correo.",
     "output": "Comisión del mes pagada al vendedor.",
     "evidencia": [
      "E-35",
      "E-36"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-35",
      "E-36",
      "E-48"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Entrega al cierre de mes el Excel en el que anotó a diario quién le pagó, con fecha, tasa y moneda."
      },
      {
       "id": "a2",
       "rol": "Coordinadora de Cuentas por Cobrar (Venezuela)",
       "texto": "Entrega, a pedido de la gerencia, el listado de facturas cobradas por cliente."
      },
      {
       "id": "a3",
       "rol": "Gerente de Ventas al Mayor (Venezuela)",
       "texto": "Calcula la comisión sobre lo cobrado, contrastando las dos fuentes."
      },
      {
       "id": "a4",
       "rol": "Gerente de Ventas al Mayor (Venezuela)",
       "texto": "Envía el reporte por correo a la presidencia y a la dirección, y recuerda la aprobación hasta obtenerla."
      },
      {
       "id": "a5",
       "rol": "Presidente (socio)",
       "texto": "Aprueba el reporte."
      },
      {
       "id": "a6",
       "rol": "Gerente de Administración (Venezuela)",
       "texto": "Ejecuta el pago de las comisiones."
      }
     ],
     "diagrama": {
      "carriles": [
       "Vendedor(a) al por Mayor",
       "Coordinadora de Cuentas por Cobrar (Venezuela)",
       "Gerente de Ventas al Mayor (Venezuela)",
       "Presidente (socio)",
       "Gerente de Administración (Venezuela)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "inicio",
        "n": "Cierre de mes"
       },
       {
        "id": "n1",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Entregar su Excel de cobros",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n2",
        "carril": "Coordinadora de Cuentas por Cobrar (Venezuela)",
        "tipo": "tarea",
        "n": "Listar facturas cobradas",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n3",
        "carril": "Gerente de Ventas al Mayor (Venezuela)",
        "tipo": "tarea",
        "n": "Calcular sobre lo cobrado",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n4",
        "carril": "Gerente de Ventas al Mayor (Venezuela)",
        "tipo": "tarea",
        "n": "Enviar el reporte y recordarlo",
        "sistemas": [
         "Correo"
        ]
       },
       {
        "id": "n5",
        "carril": "Presidente (socio)",
        "tipo": "tarea",
        "n": "Aprobar el reporte",
        "sistemas": [
         "Correo"
        ]
       },
       {
        "id": "n6",
        "carril": "Gerente de Administración (Venezuela)",
        "tipo": "tarea",
        "n": "Pagar las comisiones"
       },
       {
        "id": "n7",
        "carril": "Gerente de Administración (Venezuela)",
        "tipo": "fin",
        "n": "Comisiones pagadas"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7"
       }
      ]
     }
    }
   },
   "8.15": {
    "nota_version": "Versión As-Is: describe cómo se cobra hoy al cliente mayorista y cómo se registran sus pagos, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "Desde que se emite la factura a crédito hasta que el pago queda registrado y la factura saldada. No incluye la conciliación bancaria ni el cierre contable (macro 12).",
     "texto": "**El cobro lo hace el vendedor.** En Panamá no hay departamento de cobranza en ventas: el vendedor vende, cobra, tramita notas de crédito y devoluciones, y la gerencia revisa con cada uno, los lunes, un cuadro de deudas viejas y próximas a vencer; si el vendedor no puede ese lunes, se pierden dos días. No hay alertas automáticas de vencimiento: el vendedor y cobranza llevan las fechas a mano.\n\nEl cliente paga por muchas vías —transferencia local o internacional, pago móvil, efectivo en dólares, bolívares indexados, con retenciones— y a veces combina varias en una misma factura, según lo que negoció con su vendedor sin que cobranza conozca el acuerdo. Por eso es el vendedor quien le explica a cobranza cómo se compone cada pago; una factura ha llegado a tener veinte abonos. El comprobante viaja por caminos distintos: en Venezuela por el chat de la propia orden de venta en Odoo —decisión deliberada para que la información no se vaya con el vendedor—; en Panamá por una plantilla de Lark, que un vendedor de Zona Libre convirtió en un circuito que la gerencia califica de impecable, mientras otro sigue mandando fotos y correos.\n\nCuentas por cobrar valida contra el banco y registra. En Panamá entran a mano entre quince y veinte pagos al día, y cuando llega menos de lo esperado por una comisión bancaria queda un saldo pendiente que se ha vuelto costumbre. En Venezuela cobranza no tiene acceso a los bancos: valida contra los cortes diarios que tesorería sube a una carpeta compartida, y ha construido su propio Excel porque la factura de Odoo no muestra el subtotal en dólares ni el reporte de cartera se entendía. Hasta hace pocos meses allí solo se registraban los cobros, sin seguimiento de antigüedad, y los comprobantes acumulados sin rebajar hacían que la deuda del sistema fuera, en palabras de la gerencia, *«ficticia»*. Hoy cobranza envía al gerente los vencidos de más de 120 días, con poca respuesta."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Vendedor(a) al por Mayor",
     "participantes": [
      "Vendedor(a) al por Mayor — sigue la deuda de su cartera, recuerda al cliente, recibe el comprobante y explica a cobranza cómo se compone el pago.",
      "Cliente mayorista (externo) — paga y envía el comprobante.",
      "Coordinación de Cuentas por Cobrar (país) — valida el pago contra el banco y lo registra. En Panamá es el Supervisor(a) de Coordinación y Planificación de CxC con dos analistas; en Venezuela, la Coordinadora de Cuentas por Cobrar.",
      "Coordinador(a) de Tesorería (Venezuela) — sube cada día los cortes bancarios a una carpeta compartida.",
      "Gerente de Ventas Mayor (país) — revisa la cartera vencida con cada vendedor."
     ],
     "evidencia": [
      "E-39",
      "E-48",
      "E-62",
      "E-35",
      "E-36",
      "E-57",
      "E-59",
      "Lark: Proceso Ventas al Mayor Rower (VE)"
     ],
     "notas": "El dueño se atribuye al vendedor porque las entrevistas lo sitúan a él al frente del cobro; cuentas por cobrar registra y valida, pero no gestiona al cliente.",
     "sin_evidencia": "No consta un procedimiento común para hacer llegar el comprobante en Panamá continental, ni cómo se cobra en Colombia."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "La emisión de una factura a crédito.",
     "cadencia": "Continua. En Panamá, revisión de cartera los lunes; en Venezuela, cortes bancarios diarios y aviso de vencidos de más de 120 días.",
     "output": "Pago registrado en Odoo y factura saldada, o abono con saldo pendiente en seguimiento.",
     "evidencia": [
      "E-39",
      "E-48"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-39",
      "E-48",
      "E-62",
      "E-35"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Le recuerda el pago al cliente; no hay alerta automática de vencimiento."
      },
      {
       "id": "a2",
       "rol": "Cliente mayorista (externo)",
       "texto": "Paga por una o varias vías y envía el comprobante."
      },
      {
       "id": "a3",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Pasa el comprobante a cobranza —por el chat de la orden en Odoo, por Lark o por correo— y le explica cómo se compone el pago."
      },
      {
       "id": "a4",
       "rol": "Coordinador(a) de Tesorería (Venezuela)",
       "texto": "Sube los cortes bancarios del día a la carpeta compartida."
      },
      {
       "id": "a5",
       "rol": "Coordinación de Cuentas por Cobrar (país)",
       "texto": "Valida el pago contra el banco o contra los cortes."
      },
      {
       "id": "a6",
       "rol": "Coordinación de Cuentas por Cobrar (país)",
       "texto": "Si cubre la factura, registra el cobro en Odoo; si no, registra el abono y deja el saldo pendiente."
      },
      {
       "id": "a7",
       "rol": "Gerente de Ventas Mayor (país)",
       "texto": "Revisa los vencidos con cada vendedor: en Panamá los lunes, en Venezuela cuando cobranza le envía los de más de 120 días."
      }
     ],
     "diagrama": {
      "carriles": [
       "Vendedor(a) al por Mayor",
       "Cliente mayorista (externo)",
       "Coordinador(a) de Tesorería (Venezuela)",
       "Coordinación de Cuentas por Cobrar (país)",
       "Gerente de Ventas Mayor (país)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "inicio",
        "n": "Factura a crédito emitida"
       },
       {
        "id": "n1",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Recordar el pago",
        "sistemas": [
         "WhatsApp"
        ]
       },
       {
        "id": "n2",
        "carril": "Cliente mayorista (externo)",
        "tipo": "tarea",
        "n": "Pagar y enviar comprobante"
       },
       {
        "id": "n3",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Pasar el comprobante a cobranza",
        "sistemas": [
         "Odoo",
         "Lark"
        ]
       },
       {
        "id": "n4",
        "carril": "Coordinador(a) de Tesorería (Venezuela)",
        "tipo": "tarea",
        "n": "Subir los cortes bancarios",
        "sistemas": [
         "Google Drive"
        ]
       },
       {
        "id": "n5",
        "carril": "Coordinación de Cuentas por Cobrar (país)",
        "tipo": "tarea",
        "n": "Validar contra el banco",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n6",
        "carril": "Coordinación de Cuentas por Cobrar (país)",
        "tipo": "decision",
        "n": "¿Cubre la factura?"
       },
       {
        "id": "n7",
        "carril": "Coordinación de Cuentas por Cobrar (país)",
        "tipo": "tarea",
        "n": "Registrar el cobro",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n8",
        "carril": "Coordinación de Cuentas por Cobrar (país)",
        "tipo": "fin",
        "n": "Factura saldada"
       },
       {
        "id": "n9",
        "carril": "Coordinación de Cuentas por Cobrar (país)",
        "tipo": "tarea",
        "n": "Registrar abono con saldo",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n10",
        "carril": "Gerente de Ventas Mayor (país)",
        "tipo": "tarea",
        "n": "Revisar vencidos con el vendedor",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n11",
        "carril": "Gerente de Ventas Mayor (país)",
        "tipo": "fin",
        "n": "Saldo en seguimiento"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7",
        "etq": "Sí"
       },
       {
        "de": "n6",
        "a": "n9",
        "etq": "No"
       },
       {
        "de": "n7",
        "a": "n8"
       },
       {
        "de": "n9",
        "a": "n10"
       },
       {
        "de": "n10",
        "a": "n11"
       }
      ]
     }
    }
   },
   "8.16": {
    "nota_version": "Versión As-Is: describe cómo se tramitan hoy las devoluciones de clientes mayoristas y sus notas de crédito, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "Desde que el cliente pide devolver mercancía hasta que se emite la nota de crédito y, si procede, se refactura la reposición. No incluye las garantías por defecto de producto, que van a servicio técnico (macro 11).",
     "texto": "En Panamá **la devolución tiene un circuito formal en Lark**, y es de los pocos del macroproceso que coinciden con lo que describe el mapa. El vendedor la monta con cliente, factura, referencia, motivo y cantidad; la primera parada es la gerencia de ventas mayor, que revisa qué pasó; la bodega recibe el producto y lo confirma en el sistema con observaciones; y contabilidad emite la nota de crédito, la aplica y devuelve el dinero si corresponde. Después el vendedor puede refacturar el pedido de reposición. El ciclo toma hasta cuatro días e involucra a cuatro áreas.\n\nEl circuito tiene un ajuste que no está escrito: desde que los vendedores trabajan en otro piso, entregan el producto directamente en bodega y lo anotan en las observaciones, de modo que la gerencia aprueba sabiendo que la mercancía ya está recibida. Se aceptan devoluciones por simple cambio de preferencia —otro color—, algo que los propios vendedores cuestionan para un distribuidor mayorista; alguno ha ido educando a sus clientes para que planifiquen mejor.\n\nEn Venezuela, desde julio de 2026, toda devolución de un cliente mayorista se envía por un único courier, desde su oficina más cercana a un casillero de la empresa, con el flete a cargo de Rower."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente de Ventas Mayor (Panamá)",
     "participantes": [
      "Gerente de Ventas Mayor (Panamá) — aprueba la devolución tras revisar qué pasó con el producto.",
      "Vendedor(a) al por Mayor — monta la solicitud en Lark y, si procede, refactura la reposición.",
      "Cliente mayorista (externo) — pide la devolución y entrega o envía el producto.",
      "Jefe de Bodega — recibe el producto y lo confirma en el sistema.",
      "Contabilidad (país) — emite y aplica la nota de crédito y devuelve el dinero si corresponde."
     ],
     "evidencia": [
      "E-39",
      "E-57",
      "Lark: Proceso Ventas al Mayor Rower (VE)",
      "Lark: Procesos de Ventas al Mayor (PA)"
     ],
     "notas": "Cargo tomado de la columna «cargo actual» del V4: Gerente de Ventas Mayor PTY.",
     "sin_evidencia": "No consta qué motivos se rechazan, ni si existe plazo máximo para pedir una devolución. Tampoco consta quién aprueba en Venezuela ni cómo se tramita en Colombia."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "El cliente pide devolver mercancía: por error de despacho, por defecto o por cambio de preferencia.",
     "cadencia": "A demanda.",
     "output": "Nota de crédito aplicada al cliente y, si procede, reposición refacturada.",
     "evidencia": [
      "E-39",
      "E-57"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-39",
      "E-57",
      "Lark: Proceso Ventas al Mayor Rower (VE)"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Cliente mayorista (externo)",
       "texto": "Pide devolver la mercancía."
      },
      {
       "id": "a2",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Monta la devolución en Lark con cliente, factura, referencia, motivo y cantidad."
      },
      {
       "id": "a3",
       "rol": "Gerente de Ventas Mayor (Panamá)",
       "texto": "Revisa qué pasó con el producto y aprueba o no la devolución."
      },
      {
       "id": "a4",
       "rol": "Cliente mayorista (externo)",
       "texto": "Entrega el producto, o en Venezuela lo envía por el courier único al casillero de la empresa."
      },
      {
       "id": "a5",
       "rol": "Jefe de Bodega",
       "texto": "Recibe el producto y lo confirma en el sistema con observaciones."
      },
      {
       "id": "a6",
       "rol": "Contabilidad (país)",
       "texto": "Emite y aplica la nota de crédito y devuelve el dinero si corresponde."
      },
      {
       "id": "a7",
       "rol": "Vendedor(a) al por Mayor",
       "texto": "Si hay reposición, la refactura."
      }
     ],
     "diagrama": {
      "carriles": [
       "Cliente mayorista (externo)",
       "Vendedor(a) al por Mayor",
       "Gerente de Ventas Mayor (Panamá)",
       "Jefe de Bodega",
       "Contabilidad (país)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Cliente mayorista (externo)",
        "tipo": "inicio",
        "n": "Pide devolver mercancía"
       },
       {
        "id": "n1",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Montar la devolución",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n2",
        "carril": "Gerente de Ventas Mayor (Panamá)",
        "tipo": "decision",
        "n": "¿Aprueba la devolución?"
       },
       {
        "id": "n3",
        "carril": "Gerente de Ventas Mayor (Panamá)",
        "tipo": "fin",
        "n": "Devolución no aprobada"
       },
       {
        "id": "n4",
        "carril": "Cliente mayorista (externo)",
        "tipo": "tarea",
        "n": "Entregar o enviar el producto"
       },
       {
        "id": "n5",
        "carril": "Jefe de Bodega",
        "tipo": "tarea",
        "n": "Recibir y confirmar en el sistema"
       },
       {
        "id": "n6",
        "carril": "Contabilidad (país)",
        "tipo": "tarea",
        "n": "Emitir la nota de crédito",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n7",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "decision",
        "n": "¿Hay reposición?"
       },
       {
        "id": "n8",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "tarea",
        "n": "Refacturar la reposición",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n9",
        "carril": "Vendedor(a) al por Mayor",
        "tipo": "fin",
        "n": "Devolución cerrada"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3",
        "etq": "No"
       },
       {
        "de": "n2",
        "a": "n4",
        "etq": "Sí"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8",
        "etq": "Sí"
       },
       {
        "de": "n7",
        "a": "n9",
        "etq": "No"
       },
       {
        "de": "n8",
        "a": "n9"
       }
      ]
     }
    }
   },
   "8.17": {
    "nota_version": "Versión As-Is: describe cómo se produce hoy la información comercial del mayor y quién la usa para decidir, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La extracción, el procesamiento y la presentación de la información de venta al mayor para la toma de decisiones. No incluye la reportería contable (macro 12) ni la de tiendas propias.",
     "texto": "La información comercial **no sale de un tablero único sino de varias piezas construidas por quien las necesitaba**. La principal es un dashboard de ventas que hizo la gerencia comercial con ayuda de IA: se conecta a Odoo de los cuatro países, separa mayor, retail y comercio electrónico, se refresca cada mañana a las seis, y muestra por vendedor, país, cliente y familia la venta del año, la meta, el avance y un semáforo. Vive en un servicio de alojamiento externo con cuentas personales, no corporativas, sin respaldo ni control de acceso central, y el propio equipo lo señala como algo a resolver antes de seguir construyendo encima.\n\nAlrededor hay más piezas. La gerencia de ventas mayor del hub saca su Excel de Odoo, lo comparte con los vendedores cada lunes y envía cada mes a la dirección un informe de unas once láminas —productos y clientes principales, negociaciones pendientes, ranking de vendedores—. La analista de datos mantiene el forecast contra la venta real y prepara los reportes para la junta de cada país. En Colombia, un Excel maestro con metas y venta real por canal se presenta cada martes en la junta regional, y la jefatura de cuentas clave automatizó con IA la actualización semanal de sus tablas. Cobranza en Venezuela armó su propio tablero de cartera.\n\nEl equipo de datos recibe el sellout de unos cuarenta clientes por correo, cada uno en su formato, y lo lleva a una tabla común; sus dolores son que la información llega sin calendario, que un mismo producto aparece nombrado de decenas de formas y que las licencias de la herramienta de análisis son pocas. Un tablero en Power BI para la venta local de Panamá está en desarrollo."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente de Ventas Internacional",
     "participantes": [
      "Gerente de Ventas Internacional — construyó y mantiene el dashboard de ventas conectado a Odoo.",
      "Gerente de Ventas Mayor (país) — saca su Excel de Odoo, lo comparte los lunes y envía el informe mensual a la dirección.",
      "Analista de Datos e Informes — mantiene el forecast contra la venta real y prepara los reportes para la junta.",
      "Data Scientist / Líder de BI — normaliza el sellout de los clientes y mantiene modelos de inventario.",
      "Country Manager Colombia — presenta cada martes el Excel maestro en la junta regional.",
      "Junta Directiva — recibe las distintas piezas y decide sobre ellas."
     ],
     "evidencia": [
      "E-63",
      "E-39",
      "E-10",
      "E-18",
      "E-11",
      "E-14",
      "E-48",
      "E-01",
      "SC Taller de IA y arquitectura de datos (Panamá)"
     ],
     "notas": "Se atribuye el dueño a quien construyó y mantiene la pieza central; no hay un responsable designado de la información comercial.",
     "sin_evidencia": "No consta qué pieza manda cuando dos dan cifras distintas, ni quién valida los números antes de que lleguen a la junta."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "La venta registrada cada día en Odoo y los reportes de sellout que envían los clientes.",
     "cadencia": "Diaria para el dashboard; semanal los lunes en el hub y los martes en la junta de Colombia; mensual para el informe a la dirección y a las juntas.",
     "output": "Tableros e informes que la dirección y las juntas usan para decidir.",
     "evidencia": [
      "E-63",
      "E-39",
      "E-11"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-63",
      "E-39",
      "E-10",
      "E-18",
      "E-11",
      "SC Taller de IA y arquitectura de datos (Panamá)"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Gerente de Ventas Internacional",
       "texto": "Mantiene el dashboard de ventas, que se refresca cada mañana desde Odoo."
      },
      {
       "id": "a2",
       "rol": "Data Scientist / Líder de BI",
       "texto": "Recibe por correo el sellout de los clientes y lo normaliza a una tabla común."
      },
      {
       "id": "a3",
       "rol": "Gerente de Ventas Mayor (país)",
       "texto": "Saca su Excel de Odoo y lo comparte cada lunes con los vendedores."
      },
      {
       "id": "a4",
       "rol": "Gerente de Ventas Mayor (país)",
       "texto": "Arma el informe mensual para la dirección."
      },
      {
       "id": "a5",
       "rol": "Analista de Datos e Informes",
       "texto": "Pone la venta real contra el forecast y prepara los reportes para la junta."
      },
      {
       "id": "a6",
       "rol": "Country Manager Colombia",
       "texto": "Consolida el Excel maestro de metas y venta por canal y lo presenta cada martes en la junta regional."
      },
      {
       "id": "a7",
       "rol": "Junta Directiva",
       "texto": "Revisa las piezas que le llegan, cada una por su lado, y decide."
      }
     ],
     "diagrama": {
      "carriles": [
       "Gerente de Ventas Internacional",
       "Data Scientist / Líder de BI",
       "Gerente de Ventas Mayor (país)",
       "Analista de Datos e Informes",
       "Country Manager Colombia",
       "Junta Directiva"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Gerente de Ventas Internacional",
        "tipo": "inicio",
        "n": "Venta registrada en Odoo"
       },
       {
        "id": "n1",
        "carril": "Gerente de Ventas Internacional",
        "tipo": "tarea",
        "n": "Refrescar el dashboard",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n2",
        "carril": "Data Scientist / Líder de BI",
        "tipo": "tarea",
        "n": "Normalizar el sellout",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n3",
        "carril": "Gerente de Ventas Mayor (país)",
        "tipo": "tarea",
        "n": "Compartir avance los lunes",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n4",
        "carril": "Gerente de Ventas Mayor (país)",
        "tipo": "tarea",
        "n": "Armar el informe mensual"
       },
       {
        "id": "n5",
        "carril": "Analista de Datos e Informes",
        "tipo": "tarea",
        "n": "Cruzar venta real y forecast",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n6",
        "carril": "Country Manager Colombia",
        "tipo": "tarea",
        "n": "Presentar el Excel maestro",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n7",
        "carril": "Junta Directiva",
        "tipo": "tarea",
        "n": "Revisar y decidir"
       },
       {
        "id": "n8",
        "carril": "Junta Directiva",
        "tipo": "fin",
        "n": "Cada pieza llega por su lado"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n0",
        "a": "n2"
       },
       {
        "de": "n0",
        "a": "n3"
       },
       {
        "de": "n0",
        "a": "n5"
       },
       {
        "de": "n0",
        "a": "n6"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n1",
        "a": "n7"
       },
       {
        "de": "n2",
        "a": "n7"
       },
       {
        "de": "n4",
        "a": "n7"
       },
       {
        "de": "n5",
        "a": "n7"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8"
       }
      ]
     }
    }
   }
  }
 },
 "9": {
  "procesos": {
   "9.1": {
    "nota_version": "Versión As-Is: describe cómo se construyen hoy el presupuesto y las metas de las tiendas, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La construcción del presupuesto anual de venta de las tiendas propias, su aprobación, su bajada a metas por tienda y su reajuste durante el año. El seguimiento diario va en 9.2 y la planificación de promociones, con el comité comercial, en 9.6.",
     "texto": "El presupuesto de las tiendas lo construye **la gerencia regional de retail**, que llegó hace año y medio y desde entonces concentra la planificación de los países con tienda propia. Parte de los históricos de venta de cada país, que extrae de Odoo por consultas y guarda en Excel porque cada país trae la información en un formato distinto. Mira qué vendió cada tienda, la estacionalidad y el crecimiento del año anterior; para las tiendas nuevas toma una tienda parecida. La regla que se pone es que la meta sea exigente pero alcanzable. El presupuesto lo **aprueba el Director Comercial y de Compras**, que a veces pide cambiar líneas concretas. El foco del año lo fija antes la junta de socios de enero —en 2026, fortalecer el retail y abrir tiendas—, sin indicadores formales de seguimiento.\n\nUna vez aprobado, la gerencia regional pasa a cada país lo macro y la **gerencia de ventas al detal lo reparte por tienda**. En Venezuela lo hace la Gerente de Ventas al Detal, que ajusta lo que no cuadra con la realidad local, manda las metas a cada tienda y las discute en la reunión de los lunes, donde los gerentes pueden objetar («me pusieron mucho»). Cuando algo externo cambia el año —el terremoto, una restricción de mercancía—, la gerencia regional consulta a los gerentes de país qué creen que pasará, rehace los números y los lleva otra vez a aprobación. En 2026 se reajustaron los últimos cuatro meses porque varias tiendas iban por encima de lo previsto, y la dirección fijó que ese es el número del cierre.\n\nLa compra que alimenta a las tiendas va por otro carril (macro 6): un forecast de compra por marca y país que los socios arman en Excel, sin distinguir entre tienda y mayor."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Regional Manager Retail",
     "participantes": [
      "Regional Manager Retail — construye el presupuesto por país y tienda desde los históricos, lo reajusta durante el año y presenta cada mes a la junta cómo va.",
      "Director Comercial y de Compras (socio) — aprueba el presupuesto y sus reajustes.",
      "Socios (junta de enero) — fijan el foco del año para el retail.",
      "Gerente de Ventas al Detal (Venezuela) — reparte las metas por tienda, las ajusta al contexto del país y las discute con los gerentes en la reunión semanal.",
      "Gerente de Tienda — recibe la meta de su tienda y puede objetarla en la reunión semanal."
     ],
     "evidencia": [
      "E-55",
      "E-47",
      "E-08",
      "E-05",
      "Lark: Guía de procesos Retail LATAM de la gerencia regional, agosto 2026"
     ],
     "notas": "El presupuesto se arma con archivos por país que no comparten formato; la gerencia regional lo describe como la parte más desgastante del trabajo.",
     "sin_evidencia": "No consta cómo se reparten las metas por tienda en Panamá ni en Colombia, ni si existe una meta por asesor más allá de la de la tienda."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "El cierre del año y la fijación del foco en la junta de socios de enero.",
     "cadencia": "Anual, con reajustes cuando cambia el contexto; revisión mensual ante la junta.",
     "output": "Presupuesto aprobado por país y metas mensuales comunicadas a cada tienda.",
     "evidencia": [
      "E-55",
      "E-08"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-55",
      "E-47"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Regional Manager Retail",
       "texto": "Analiza los históricos de venta por tienda —estacionalidad, crecimiento, tiendas comparables para las nuevas— desde consultas a Odoo."
      },
      {
       "id": "a2",
       "rol": "Regional Manager Retail",
       "texto": "Arma el presupuesto anual por país y tienda."
      },
      {
       "id": "a3",
       "rol": "Director Comercial y de Compras (socio)",
       "texto": "Lo aprueba o pide cambiar líneas concretas."
      },
      {
       "id": "a4",
       "rol": "Regional Manager Retail",
       "texto": "Si hay cambios, los ajusta; luego carga el presupuesto en el cuadro regional y pasa a cada país lo macro."
      },
      {
       "id": "a5",
       "rol": "Gerente de Ventas al Detal (Venezuela)",
       "texto": "Reparte la meta por tienda, la ajusta al contexto local y la envía a cada tienda."
      },
      {
       "id": "a6",
       "rol": "Gerente de Tienda",
       "texto": "Recibe la meta y la discute en la reunión semanal; el seguimiento diario sigue en 9.2."
      }
     ],
     "diagrama": {
      "carriles": [
       "Regional Manager Retail",
       "Director Comercial y de Compras (socio)",
       "Gerente de Ventas al Detal (Venezuela)",
       "Gerente de Tienda"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Regional Manager Retail",
        "tipo": "inicio",
        "n": "Nuevo ciclo anual"
       },
       {
        "id": "n1",
        "carril": "Regional Manager Retail",
        "tipo": "tarea",
        "n": "Analizar históricos por tienda",
        "sistemas": [
         "Odoo",
         "Excel"
        ]
       },
       {
        "id": "n2",
        "carril": "Regional Manager Retail",
        "tipo": "tarea",
        "n": "Armar el presupuesto por tienda",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n3",
        "carril": "Director Comercial y de Compras (socio)",
        "tipo": "decision",
        "n": "¿Aprueba sin cambios?"
       },
       {
        "id": "n4",
        "carril": "Regional Manager Retail",
        "tipo": "tarea",
        "n": "Ajustar las líneas indicadas",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n5",
        "carril": "Regional Manager Retail",
        "tipo": "tarea",
        "n": "Cargar y pasar lo macro al país",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n6",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "tarea",
        "n": "Repartir la meta por tienda",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n7",
        "carril": "Gerente de Tienda",
        "tipo": "tarea",
        "n": "Recibir y discutir la meta"
       },
       {
        "id": "n8",
        "carril": "Gerente de Tienda",
        "tipo": "fin",
        "n": "Meta en la tienda (sigue 9.2)"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4",
        "etq": "No"
       },
       {
        "de": "n3",
        "a": "n5",
        "etq": "Sí"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8"
       }
      ]
     }
    }
   },
   "9.2": {
    "nota_version": "Versión As-Is: describe cómo se consolidan hoy las ventas diarias de las tiendas y sus indicadores, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La carga diaria de la venta de cada tienda en el cuadro regional, su lectura por la gerencia regional y el cierre mensual ante la junta. El cuadre de caja va en 9.5.",
     "texto": "La consolidación regional existe, pero **a mano y a propósito**. Cada noche, al cerrar, las tiendas descargan su cierre de ventas del sistema y cargan tres datos —venta, unidades y transacciones— en un cuadro compartido; con eso el cuadro calcula el ticket promedio, las unidades por transacción y, donde hay contador de tráfico (Follow Up), la conversión. La gerencia regional no quiere automatizar ese paso: sostiene que el gerente tiene que ver cada noche cómo le fue para que «le duela» un mal día. En Venezuela las tiendas no cargan directo: mandan por correo un resumen del cierre y es el equipo de la gerencia de ventas al detal quien lo vacía en el cuadro a la mañana siguiente. Donde el país u operador no permite compartir el cuadro, se le arma uno aparte que alimenta el principal.\n\nCon eso la gerencia regional revisa cada día cómo va cada tienda frente a su meta y llama al gerente de país o de tienda cuando alguna se queda corta. Cada mes presenta a la junta el cierre por región, país y tienda, los productos más vendidos y, donde ya existe, el resultado por tienda; ese estado de resultados por tienda está hecho para Colombia y Guatemala, y seguía pendiente en Panamá y Venezuela.\n\nLa **torre de control regional** que reuniría todo esto está en construcción y no en producción: hoy es un Excel maestro por país, pesado, con nomenclaturas de tienda distintas en cada país. En paralelo hay otros tableros —el de inteligencia de negocios, un reporte mensual de ventas por tienda para la junta, uno de la gerencia comercial— que no se cruzan entre sí."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Regional Manager Retail",
     "participantes": [
      "Gerente de Tienda — descarga el cierre del día y lo carga en el cuadro o lo manda por correo.",
      "Supervisor(a) de Tiendas (Venezuela) — en Venezuela, vacía cada mañana los resúmenes de cierre en el cuadro regional.",
      "Regional Manager Retail — revisa cada día los indicadores, llama a los países con tiendas por debajo de la meta y presenta el cierre mensual a la junta.",
      "Analista de Datos e Informes — prepara por su lado el reporte mensual de ventas por tienda para la junta y Mercadeo."
     ],
     "evidencia": [
      "E-55",
      "E-47",
      "SC-11",
      "E-18",
      "E-10",
      "E-05",
      "E-33",
      "Lark: Guía de procesos Retail LATAM de la gerencia regional, agosto 2026"
     ],
     "notas": "Varios tableros miden lo mismo sin una fuente común; la gerencia regional perdió además el acceso al tablero de inteligencia de negocios al vencerle la licencia de prueba.",
     "sin_evidencia": "No consta un indicador de tienda que se reporte con regla escrita: las definiciones de cada KPI no están documentadas."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "El cierre diario de cada tienda.",
     "cadencia": "Diaria; semanal en la reunión con gerentes; mensual ante la junta.",
     "output": "Cuadro regional al día con venta, unidades, transacciones y conversión por tienda; presentación mensual a la junta.",
     "evidencia": [
      "E-55",
      "E-47"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-55",
      "E-47"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Gerente de Tienda",
       "texto": "Al cierre, descarga del sistema la venta, las unidades y las transacciones del día."
      },
      {
       "id": "a2",
       "rol": "Gerente de Tienda",
       "texto": "Donde el país carga directo, las anota en el cuadro regional."
      },
      {
       "id": "a3",
       "rol": "Gerente de Tienda",
       "texto": "En Venezuela, manda por correo el resumen del cierre."
      },
      {
       "id": "a4",
       "rol": "Supervisor(a) de Tiendas (Venezuela)",
       "texto": "En Venezuela, vacía a la mañana siguiente los resúmenes en el cuadro."
      },
      {
       "id": "a5",
       "rol": "Regional Manager Retail",
       "texto": "Revisa los indicadores de cada tienda frente a su meta."
      },
      {
       "id": "a6",
       "rol": "Regional Manager Retail",
       "texto": "Si alguna se queda corta, llama al gerente de país o de tienda para acordar acciones."
      },
      {
       "id": "a7",
       "rol": "Regional Manager Retail",
       "texto": "Al cierre de mes, presenta a la junta el resultado por país y tienda."
      }
     ],
     "diagrama": {
      "carriles": [
       "Gerente de Tienda",
       "Supervisor(a) de Tiendas (Venezuela)",
       "Regional Manager Retail"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Gerente de Tienda",
        "tipo": "inicio",
        "n": "Cierre de la tienda"
       },
       {
        "id": "n1",
        "carril": "Gerente de Tienda",
        "tipo": "tarea",
        "n": "Descargar venta, unidades y transacciones",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n2",
        "carril": "Gerente de Tienda",
        "tipo": "decision",
        "n": "¿Carga directo en el cuadro?"
       },
       {
        "id": "n3",
        "carril": "Gerente de Tienda",
        "tipo": "tarea",
        "n": "Anotar en el cuadro regional",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n4",
        "carril": "Gerente de Tienda",
        "tipo": "tarea",
        "n": "Mandar resumen por correo"
       },
       {
        "id": "n5",
        "carril": "Supervisor(a) de Tiendas (Venezuela)",
        "tipo": "tarea",
        "n": "Vaciar resúmenes en el cuadro",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n6",
        "carril": "Regional Manager Retail",
        "tipo": "tarea",
        "n": "Revisar KPIs contra la meta",
        "sistemas": [
         "Excel",
         "Follow Up"
        ]
       },
       {
        "id": "n7",
        "carril": "Regional Manager Retail",
        "tipo": "decision",
        "n": "¿Tienda por debajo?"
       },
       {
        "id": "n8",
        "carril": "Regional Manager Retail",
        "tipo": "tarea",
        "n": "Llamar al país para acordar acciones"
       },
       {
        "id": "n9",
        "carril": "Regional Manager Retail",
        "tipo": "tarea",
        "n": "Presentar el cierre mensual a la junta",
        "sistemas": [
         "PowerPoint"
        ]
       },
       {
        "id": "n10",
        "carril": "Regional Manager Retail",
        "tipo": "fin",
        "n": "Cierre presentado"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3",
        "etq": "Sí"
       },
       {
        "de": "n2",
        "a": "n4",
        "etq": "No"
       },
       {
        "de": "n3",
        "a": "n6"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8",
        "etq": "Sí"
       },
       {
        "de": "n7",
        "a": "n9",
        "etq": "No"
       },
       {
        "de": "n8",
        "a": "n9"
       },
       {
        "de": "n9",
        "a": "n10"
       }
      ]
     }
    }
   },
   "9.3": {
    "nota_version": "Versión As-Is: describe cómo se reponen hoy las tiendas y los kioscos, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "El ciclo semanal que va del cálculo del sugerido por tienda a la mercancía disponible en el punto de venta. Las transferencias puntuales entre tiendas van en 9.4 y la compra internacional, en el macro 6.",
     "texto": "La reposición se calcula **centralizada en Venezuela**: la coordinación de planificación de compras arma cada semana un sugerido por tienda con un Excel propio conectado a Odoo, que ordena los productos por venta (A/B/C) y apunta a tres o cuatro semanas de cobertura; se apoya en IA para aplicar reglas por tienda (qué no le va a un outlet, qué no cabe en un kiosco). Las tiendas no piden salvo excepciones; lo que sí existe es el «ojo clínico» de quien las supervisa, que corrige el sugerido.\n\nEn **Panamá** el sugerido lo recibe el supervisor de tienda, que lo revisa con su conocimiento del punto: una venta especial de cien termos no significa que haya que reponer cien, y un kiosco de 2,5 por 2,5 metros no puede recibir treinta. Carga los pedidos en Odoo con una plantilla masiva y sus observaciones, y el pedido no le aparece a la bodega hasta que **lo autoriza la Gerencia de Ventas Internacional**. Desde un piloto reciente la mercancía sale directo de la bodega de Zona Libre a cada tienda, sin pasar por la bodega de la ciudad: el plazo bajó de ocho a doce días a dos o tres. Las tiendas cotejan lo recibido contra la lista y el supervisor valida en Odoo los traslados, que ya dejó preparados en borrador. Lo que llega de más o de menos se reporta a la bodega.\n\nEn **Venezuela** el pedido de tienda no pasa por el WMS: la coordinación lo monta a mano en Odoo tienda por tienda —no se pueden importar las veinte a la vez—, lo imprime y lo lleva en físico al almacén. Si Odoo muestra existencias que el almacén no tiene, se quitan del traslado antes de que llegue. La gerencia de ventas al detal percibe que las tiendas «comen primero»; la del mayor, que recibe el remanente. En Colombia no hay bodega separada por canal y el mayor puede dejar a las tiendas sin inventario."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
     "participantes": [
      "Coordinadora de Planificación de Compras (Rower, Venezuela) — calcula cada semana el sugerido por tienda para Venezuela y Panamá; en Venezuela, además, monta los pedidos en Odoo.",
      "Supervisor de Tienda (Panamá) — revisa el sugerido, carga los pedidos en Odoo, valida los traslados al recibir y atiende las diferencias.",
      "Gerente de Ventas Internacional — autoriza el pedido de las tiendas de Panamá para que la bodega lo vea.",
      "Jefe de Bodega — prepara y despacha los pedidos de las tiendas de Panamá.",
      "Encargado(a) de Tienda (Panamá) — coteja lo recibido contra la lista y reporta diferencias.",
      "Gerente de Almacén (Venezuela) — despacha a las tiendas lo que la coordinación montó en Odoo.",
      "Gerente de Ventas al Detal (Venezuela) — corrige el sugerido con lo que ve en las visitas."
     ],
     "evidencia": [
      "E-40",
      "E-53",
      "E-03",
      "SC-02",
      "E-47",
      "E-34",
      "E-35",
      "E-14",
      "E-05"
     ],
     "notas": "En Venezuela el pedido de tienda se monta y se entrega a mano; la coordinación dice que le anunciaron hace meses que dejaría de hacerlo y sigue igual.",
     "sin_evidencia": "No consta un mínimo o máximo definido por producto y tienda; la meta de cobertura estaba en revisión porque la fijada para todas no cabía físicamente en los kioscos."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "El ciclo semanal de reposición.",
     "cadencia": "Semanal; en Panamá, pedido el lunes y entrega el miércoles.",
     "output": "Mercancía recibida, cotejada y cargada al inventario de cada tienda.",
     "evidencia": [
      "E-53",
      "E-40",
      "SC-02"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-53",
      "E-40",
      "E-03",
      "SC-02"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
       "texto": "Calcula el sugerido semanal por tienda y lo envía."
      },
      {
       "id": "a2",
       "rol": "Supervisor de Tienda (Panamá)",
       "texto": "Lo revisa según el espacio de cada punto y las ventas especiales, y lo ajusta."
      },
      {
       "id": "a3",
       "rol": "Supervisor de Tienda (Panamá)",
       "texto": "Carga los pedidos en Odoo con la plantilla masiva y sus observaciones."
      },
      {
       "id": "a4",
       "rol": "Gerente de Ventas Internacional",
       "texto": "Autoriza los pedidos para que la bodega los vea."
      },
      {
       "id": "a5",
       "rol": "Jefe de Bodega",
       "texto": "Prepara los pedidos y los despacha a cada tienda."
      },
      {
       "id": "a6",
       "rol": "Encargado(a) de Tienda (Panamá)",
       "texto": "Coteja lo recibido contra la lista."
      },
      {
       "id": "a7",
       "rol": "Encargado(a) de Tienda (Panamá)",
       "texto": "Si hay diferencias, las reporta para que la bodega las revise."
      },
      {
       "id": "a8",
       "rol": "Supervisor de Tienda (Panamá)",
       "texto": "Valida en Odoo el traslado que ya tenía en borrador y la mercancía queda disponible."
      }
     ],
     "diagrama": {
      "carriles": [
       "Coordinadora de Planificación de Compras (Rower, Venezuela)",
       "Supervisor de Tienda (Panamá)",
       "Gerente de Ventas Internacional",
       "Jefe de Bodega",
       "Encargado(a) de Tienda (Panamá)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
        "tipo": "inicio",
        "n": "Ciclo semanal"
       },
       {
        "id": "n1",
        "carril": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
        "tipo": "tarea",
        "n": "Calcular el sugerido por tienda",
        "sistemas": [
         "Excel",
         "Odoo"
        ]
       },
       {
        "id": "n2",
        "carril": "Supervisor de Tienda (Panamá)",
        "tipo": "tarea",
        "n": "Revisar y ajustar el sugerido"
       },
       {
        "id": "n3",
        "carril": "Supervisor de Tienda (Panamá)",
        "tipo": "tarea",
        "n": "Cargar los pedidos en Odoo",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n4",
        "carril": "Gerente de Ventas Internacional",
        "tipo": "tarea",
        "n": "Autorizar los pedidos",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n5",
        "carril": "Jefe de Bodega",
        "tipo": "tarea",
        "n": "Preparar y despachar a tiendas",
        "sistemas": [
         "EBS"
        ]
       },
       {
        "id": "n6",
        "carril": "Encargado(a) de Tienda (Panamá)",
        "tipo": "tarea",
        "n": "Cotejar contra la lista"
       },
       {
        "id": "n7",
        "carril": "Encargado(a) de Tienda (Panamá)",
        "tipo": "decision",
        "n": "¿Llegó completo?"
       },
       {
        "id": "n8",
        "carril": "Encargado(a) de Tienda (Panamá)",
        "tipo": "tarea",
        "n": "Reportar la diferencia a bodega"
       },
       {
        "id": "n9",
        "carril": "Supervisor de Tienda (Panamá)",
        "tipo": "tarea",
        "n": "Validar el traslado en Odoo",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n10",
        "carril": "Supervisor de Tienda (Panamá)",
        "tipo": "fin",
        "n": "Mercancía disponible"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8",
        "etq": "No"
       },
       {
        "de": "n7",
        "a": "n9",
        "etq": "Sí"
       },
       {
        "de": "n8",
        "a": "n9"
       },
       {
        "de": "n9",
        "a": "n10"
       }
      ]
     }
    }
   },
   "9.4": {
    "nota_version": "Versión As-Is: describe cómo se mueve hoy mercancía entre tiendas del mismo país, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "El traslado puntual de mercancía de una tienda a otra para cerrar una venta o cubrir un faltante. La reposición semanal va en 9.3.",
     "texto": "Cada tienda ve en Odoo el inventario de todas las del país, pero **solo puede mover el suyo**. Cuando a una le falta algo para cerrar una venta —un cliente que pide cinco relojes, una venta corporativa de cien calculadoras, un domingo con la oficina cerrada—, el gerente se lo pide a la supervisión, casi siempre por teléfono o por chat y a veces por correo. La supervisión busca qué tienda lo tiene y hace el traslado en Odoo; si está de visita en una tienda, lo hace desde su computadora y queda como hecho por la tienda. En Panamá se ha propuesto que los gerentes hagan sus propios traslados, sin decidir todavía.\n\nDentro del mismo centro comercial el producto se lleva a mano el mismo día. Entre centros comerciales depende de la ruta de transporte: el que va al este no es el que va al centro, y en Venezuela la coordinación de planificación reconoce que no ha logrado resolver un traslado entre centros comerciales en el día. Desde el interior hay un límite propio: sacar mercancía de Margarita exige declararla y pagar un impuesto de salida, algo que el equipo descubrió en plena operación. Cuando llega el traslado, el sistema coteja lo recibido contra la factura y lo carga, un tramo que el personal califica de eficaz.\n\nCuando el producto no está en ninguna tienda, **la demanda no queda registrada** en ningún sitio."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Supervisor(a) de Tiendas (país)",
     "participantes": [
      "Gerente de Tienda (solicitante) — pide el producto que le falta.",
      "Supervisor(a) de Tiendas (país) — en Venezuela, la gerencia de ventas al detal y su equipo de supervisión; en Panamá, el supervisor de tienda. Busca quién lo tiene y hace el traslado en Odoo.",
      "Gerente de Tienda (cedente) — entrega el producto o lo envía con el mensajero o la ruta.",
      "Gerente de Operaciones y Logística (Venezuela) — aprueba los traslados que necesitan transporte del almacén."
     ],
     "evidencia": [
      "SC-02",
      "E-53",
      "E-47",
      "E-40",
      "E-34",
      "E-36"
     ],
     "notas": "La demanda que no se cubre con ninguna tienda se pierde sin registro.",
     "sin_evidencia": "No consta cómo se hacen los traslados entre tiendas en Colombia."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "A una tienda le falta un producto para cerrar una venta.",
     "cadencia": "Por evento.",
     "output": "Producto trasladado y cargado en el inventario de la tienda que lo pidió, o venta perdida sin registro.",
     "evidencia": [
      "SC-02",
      "E-53"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "SC-02",
      "E-53",
      "E-47"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Gerente de Tienda (solicitante)",
       "texto": "Pide el producto que le falta, por teléfono, chat o correo."
      },
      {
       "id": "a2",
       "rol": "Supervisor(a) de Tiendas (país)",
       "texto": "Busca en Odoo qué tienda lo tiene."
      },
      {
       "id": "a3",
       "rol": "Supervisor(a) de Tiendas (país)",
       "texto": "Si no lo tiene ninguna, la venta se pierde y no queda registro."
      },
      {
       "id": "a4",
       "rol": "Supervisor(a) de Tiendas (país)",
       "texto": "Si lo tiene otra, hace el traslado en Odoo."
      },
      {
       "id": "a5",
       "rol": "Gerente de Tienda (cedente)",
       "texto": "Si está en el mismo centro comercial, lo entrega en mano; si no, lo envía con el mensajero o la ruta."
      },
      {
       "id": "a6",
       "rol": "Gerente de Tienda (solicitante)",
       "texto": "Recibe el producto; el sistema coteja el traslado contra la factura y lo carga."
      }
     ],
     "diagrama": {
      "carriles": [
       "Gerente de Tienda (solicitante)",
       "Supervisor(a) de Tiendas (país)",
       "Gerente de Tienda (cedente)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Gerente de Tienda (solicitante)",
        "tipo": "inicio",
        "n": "Falta un producto para vender"
       },
       {
        "id": "n1",
        "carril": "Gerente de Tienda (solicitante)",
        "tipo": "tarea",
        "n": "Pedir el producto",
        "sistemas": [
         "WhatsApp",
         "Lark"
        ]
       },
       {
        "id": "n2",
        "carril": "Supervisor(a) de Tiendas (país)",
        "tipo": "tarea",
        "n": "Buscar qué tienda lo tiene",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n3",
        "carril": "Supervisor(a) de Tiendas (país)",
        "tipo": "decision",
        "n": "¿Lo tiene otra tienda?"
       },
       {
        "id": "n4",
        "carril": "Supervisor(a) de Tiendas (país)",
        "tipo": "fin",
        "n": "Venta perdida, sin registro"
       },
       {
        "id": "n5",
        "carril": "Supervisor(a) de Tiendas (país)",
        "tipo": "tarea",
        "n": "Hacer el traslado",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n6",
        "carril": "Gerente de Tienda (cedente)",
        "tipo": "decision",
        "n": "¿Mismo centro comercial?"
       },
       {
        "id": "n7",
        "carril": "Gerente de Tienda (cedente)",
        "tipo": "tarea",
        "n": "Entregar en mano"
       },
       {
        "id": "n8",
        "carril": "Gerente de Tienda (cedente)",
        "tipo": "tarea",
        "n": "Enviar con mensajero o ruta"
       },
       {
        "id": "n9",
        "carril": "Gerente de Tienda (solicitante)",
        "tipo": "tarea",
        "n": "Recibir y cargar el traslado",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n10",
        "carril": "Gerente de Tienda (solicitante)",
        "tipo": "fin",
        "n": "Producto disponible"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4",
        "etq": "No"
       },
       {
        "de": "n3",
        "a": "n5",
        "etq": "Sí"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7",
        "etq": "Sí"
       },
       {
        "de": "n6",
        "a": "n8",
        "etq": "No"
       },
       {
        "de": "n7",
        "a": "n9"
       },
       {
        "de": "n8",
        "a": "n9"
       },
       {
        "de": "n9",
        "a": "n10"
       }
      ]
     }
    }
   },
   "9.5": {
    "nota_version": "Versión As-Is: describe cómo se cuadra hoy la caja de cada tienda y cómo llega esa información a la oficina, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "El cuadre de caja al cierre de cada tienda, el reporte de la venta del día y su revisión por Contabilidad. El traslado físico del efectivo va en 9.15.",
     "texto": "En **Venezuela**, al cierre, la tienda cuadra la caja contra el reporte Z de la máquina fiscal y los cierres de los puntos de venta, y esa misma noche manda por correo un resumen: monto vendido, facturas, divisas recibidas, lo cobrado con Cashea y lo vendido por línea. Con ese resumen el equipo de la gerencia de ventas al detal alimenta a la mañana siguiente el cuadro regional (9.2). Las anomalías se detectan a ojo: un monto o un número de facturas que no cuadra, o un reporte que no llegó, hacen que la gerencia llame a la tienda y revise con Sistemas; así apareció una vez un cierre inflado por facturas que habían quedado pendientes durante un cambio de precios. Si Odoo cae, la tienda factura en contingencia y carga esas facturas cuando vuelve el sistema.\n\nLos soportes físicos —reporte Z, vouchers de los puntos de venta, soportes de depósito— viajan en la valija, y en Contabilidad **la revisión de las cajas es manual**: un analista vuelca en Excel lo que llega de cada tienda para comprobar que todo lo vendido se cobró. Con Odoo se evalúa que el cierre de caja apunte directo a una cuenta contable, sin implementar. Tesorería cierra a las cinco o seis de la tarde, pero las tiendas venden hasta las nueve o las diez, así que esas horas se ven al día siguiente.\n\nEn **Panamá** el procedimiento está escrito: la caja tiene un fondo fijo que se cuenta al cerrar y al abrir, y cada tienda entrega un expediente diario —voucher del depósito, detalle de ventas por medio de pago, cierres de los terminales y gastos de caja— que la asistente contable de conciliación cruza contra el reporte de venta de Odoo en una plantilla de revisión, antes de conciliar con el banco."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente de Tienda",
     "participantes": [
      "Gerente de Tienda — cuadra la caja al cierre y envía el resumen y los soportes; en Venezuela el cuadre lo hace con la cajera.",
      "Supervisor(a) de Tiendas (Venezuela) — revisa cada mañana los resúmenes, detecta anomalías y las carga en el cuadro regional.",
      "Analista de Contabilidad (Venezuela) — revisa a mano en Excel cada caja con los soportes físicos.",
      "Asistente contable de conciliación (Panamá) — cruza el expediente de cada tienda contra el reporte de venta de Odoo.",
      "Coordinador(a) de Tesorería (Venezuela) — recibe la venta de las tiendas con un día de rezago."
     ],
     "evidencia": [
      "E-47",
      "E-38",
      "E-43",
      "E-32",
      "SC-02",
      "Lark: Manual Análisis Reporte de Venta de Tienda Casiolandia (PA)",
      "Lark: Procedimiento de Conciliación Bancaria (VE)"
     ],
     "notas": "En Venezuela el control del cierre depende de que alguien note a ojo que un número es raro; no hay un cruce automático entre lo que dice el resumen y lo que llega a Contabilidad.",
     "sin_evidencia": "No consta un plazo para que Contabilidad termine la revisión de cada caja ni qué se hace con una diferencia que no se explica."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "El cierre de cada tienda.",
     "cadencia": "Diaria.",
     "output": "Caja cuadrada, resumen enviado, cuadro regional al día y caja revisada por Contabilidad.",
     "evidencia": [
      "E-47",
      "E-38"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-47",
      "E-38",
      "Lark: Manual Análisis Reporte de Venta de Tienda Casiolandia (PA)"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Gerente de Tienda",
       "texto": "Cuadra la caja contra el reporte Z de la máquina fiscal y los cierres de los puntos de venta."
      },
      {
       "id": "a2",
       "rol": "Gerente de Tienda",
       "texto": "Manda esa noche por correo el resumen del cierre."
      },
      {
       "id": "a3",
       "rol": "Gerente de Tienda",
       "texto": "Arma la valija con el reporte Z y los vouchers para Contabilidad."
      },
      {
       "id": "a4",
       "rol": "Supervisor(a) de Tiendas (Venezuela)",
       "texto": "A la mañana revisa los resúmenes; si algo no cuadra, llama a la tienda y revisa con Sistemas."
      },
      {
       "id": "a5",
       "rol": "Supervisor(a) de Tiendas (Venezuela)",
       "texto": "Vacía los resúmenes en el cuadro regional (9.2)."
      },
      {
       "id": "a6",
       "rol": "Analista de Contabilidad (Venezuela)",
       "texto": "Cuando llegan los soportes, revisa la caja a mano en Excel."
      }
     ],
     "diagrama": {
      "carriles": [
       "Gerente de Tienda",
       "Supervisor(a) de Tiendas (Venezuela)",
       "Analista de Contabilidad (Venezuela)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Gerente de Tienda",
        "tipo": "inicio",
        "n": "Cierre de la tienda"
       },
       {
        "id": "n1",
        "carril": "Gerente de Tienda",
        "tipo": "tarea",
        "n": "Cuadrar caja con el reporte Z",
        "sistemas": [
         "Odoo",
         "Máquina fiscal"
        ]
       },
       {
        "id": "n2",
        "carril": "Gerente de Tienda",
        "tipo": "tarea",
        "n": "Mandar el resumen del cierre",
        "sistemas": [
         "Correo"
        ]
       },
       {
        "id": "n3",
        "carril": "Gerente de Tienda",
        "tipo": "tarea",
        "n": "Armar la valija con los soportes"
       },
       {
        "id": "n4",
        "carril": "Supervisor(a) de Tiendas (Venezuela)",
        "tipo": "decision",
        "n": "¿Algo anormal?"
       },
       {
        "id": "n5",
        "carril": "Supervisor(a) de Tiendas (Venezuela)",
        "tipo": "tarea",
        "n": "Llamar a la tienda y revisar"
       },
       {
        "id": "n6",
        "carril": "Supervisor(a) de Tiendas (Venezuela)",
        "tipo": "tarea",
        "n": "Cargar en el cuadro regional",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n7",
        "carril": "Analista de Contabilidad (Venezuela)",
        "tipo": "tarea",
        "n": "Revisar la caja con los soportes",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n8",
        "carril": "Analista de Contabilidad (Venezuela)",
        "tipo": "fin",
        "n": "Caja revisada"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5",
        "etq": "Sí"
       },
       {
        "de": "n4",
        "a": "n6",
        "etq": "No"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8"
       }
      ]
     }
    }
   },
   "9.6": {
    "nota_version": "Versión As-Is: describe cómo funciona hoy un día en la tienda, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La apertura de la tienda, la atención y la venta al cliente y el cobro. El cierre de caja va en 9.5, la falla de un producto en 9.13 y la falta de un producto en 9.4.",
     "texto": "La apertura tiene sus comprobaciones, aunque no estén escritas: que el sistema tenga la fecha del día, que **la tasa esté actualizada**, que el fondo de caja cuadre con el cierre anterior y que la exhibición esté en orden. En Venezuela los precios tienen que estar en físico por exigencia legal, así que cada cambio de precio obliga a reimprimir etiquetas desde Odoo, según un instructivo de la supervisión, y la tienda coteja que la etiqueta diga lo mismo que el sistema.\n\nLa estructura de la tienda cambia por país. En Venezuela hay gerente, subgerente, asesores de ventas y cajeras —veinte gerentes, ocho subgerentes, setenta asesores y veintiséis cajeras— y, en algunas tiendas, relojero y seguridad. En **Panamá** el cargo de cajero desapareció: hay un encargado y vendedores, y los dos venden y cobran; en los kioscos son siempre dos personas. El contador de tráfico en la entrada (Follow Up) permite calcular la conversión. Casio se exhibe por línea y Cubitt por degradación de color, y en Venezuela el personal que rota entre tiendas de las dos marcas se cambia el uniforme, aunque se han visto mezclas.\n\nEl asesor atiende y asesora; si el producto no está, se busca en otra tienda (9.4) o la venta se pierde **sin dejar registro de lo que el cliente pidió**. Se factura en Odoo y, en Venezuela, se imprime por la máquina fiscal; se cobra en efectivo, tarjeta, pago móvil o Cashea. Si el producto falla en las primeras 24 horas, se cambia en el acto (9.13). Las cámaras las monitorea un proveedor externo que avisa si ve algo raro, y la gerencia de ventas al detal las revisa cuando hace falta. El uso del celular y la puntualidad se corrigen con llamados de atención del gerente."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente de Tienda",
     "participantes": [
      "Gerente de Tienda — abre, verifica sistema, tasa y fondo de caja, supervisa la venta y corrige la disciplina del equipo; en Panamá, el encargado de tienda, que también vende y cobra.",
      "Asesor(a) de Ventas — atiende, asesora y cierra la venta; en Panamá, también cobra.",
      "Cajero(a) — en Venezuela, factura y cobra.",
      "Supervisor(a) de Tienda e Inventario (Venezuela) — mantiene el instructivo para imprimir etiquetas de precio desde Odoo."
     ],
     "evidencia": [
      "E-47",
      "SC-02",
      "E-31",
      "E-42",
      "SC-13",
      "E-33",
      "E-32",
      "Lark: Departamento de Ventas al Detal, junio 2026 (VE)",
      "Lark: instructivos de inventario y etiquetas en Odoo de la Supervisión de Tienda e Inventario (VE)",
      "Lark: descripciones de cargo de Gerente de Tienda, Asesor(a) de Ventas y Cajero(a) (VE)"
     ],
     "notas": "La apertura y la rutina del día no están escritas; las cumplen los gerentes con antigüedad «por inercia», y la gerencia de ventas al detal lo señala como una debilidad para quien entra nuevo.",
     "sin_evidencia": "No consta un protocolo de atención escrito que se use en piso; el protocolo de servicio de la gerencia regional está en desarrollo."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "La apertura diaria de la tienda.",
     "cadencia": "Diaria, en horario del centro comercial.",
     "output": "Ventas facturadas y cobradas; cierre listo para el cuadre (9.5).",
     "evidencia": [
      "E-47",
      "SC-02"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-47",
      "SC-02",
      "Lark: descripciones de cargo de Gerente de Tienda, Asesor(a) de Ventas y Cajero(a) (VE)"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Gerente de Tienda",
       "texto": "Abre y verifica la fecha y la tasa del sistema, el fondo de caja y la exhibición."
      },
      {
       "id": "a2",
       "rol": "Asesor(a) de Ventas",
       "texto": "Recibe al cliente y lo asesora."
      },
      {
       "id": "a3",
       "rol": "Asesor(a) de Ventas",
       "texto": "Si el producto no está, lo busca en otra tienda (9.4) o la venta se pierde sin registro."
      },
      {
       "id": "a4",
       "rol": "Asesor(a) de Ventas",
       "texto": "Si el cliente decide comprar, lo pasa a caja."
      },
      {
       "id": "a5",
       "rol": "Cajero(a)",
       "texto": "Factura en Odoo, imprime por la máquina fiscal y cobra."
      },
      {
       "id": "a6",
       "rol": "Gerente de Tienda",
       "texto": "Al final del día, cuadra la caja (9.5)."
      }
     ],
     "diagrama": {
      "carriles": [
       "Gerente de Tienda",
       "Asesor(a) de Ventas",
       "Cajero(a)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Gerente de Tienda",
        "tipo": "inicio",
        "n": "Apertura de la tienda"
       },
       {
        "id": "n1",
        "carril": "Gerente de Tienda",
        "tipo": "tarea",
        "n": "Verificar sistema, tasa y fondo",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n2",
        "carril": "Asesor(a) de Ventas",
        "tipo": "tarea",
        "n": "Recibir y asesorar al cliente",
        "sistemas": [
         "Follow Up"
        ]
       },
       {
        "id": "n3",
        "carril": "Asesor(a) de Ventas",
        "tipo": "decision",
        "n": "¿Hay el producto?"
       },
       {
        "id": "n4",
        "carril": "Asesor(a) de Ventas",
        "tipo": "fin",
        "n": "Venta perdida o traslado (9.4)"
       },
       {
        "id": "n5",
        "carril": "Asesor(a) de Ventas",
        "tipo": "decision",
        "n": "¿El cliente compra?"
       },
       {
        "id": "n6",
        "carril": "Asesor(a) de Ventas",
        "tipo": "fin",
        "n": "Sin venta, sin registro"
       },
       {
        "id": "n7",
        "carril": "Cajero(a)",
        "tipo": "tarea",
        "n": "Facturar y cobrar",
        "sistemas": [
         "Odoo",
         "Máquina fiscal"
        ]
       },
       {
        "id": "n8",
        "carril": "Gerente de Tienda",
        "tipo": "tarea",
        "n": "Cuadrar la caja al cierre (9.5)"
       },
       {
        "id": "n9",
        "carril": "Gerente de Tienda",
        "tipo": "fin",
        "n": "Día cerrado"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4",
        "etq": "No"
       },
       {
        "de": "n3",
        "a": "n5",
        "etq": "Sí"
       },
       {
        "de": "n5",
        "a": "n6",
        "etq": "No"
       },
       {
        "de": "n5",
        "a": "n7",
        "etq": "Sí"
       },
       {
        "de": "n7",
        "a": "n8"
       },
       {
        "de": "n8",
        "a": "n9"
       }
      ]
     }
    }
   },
   "9.7": {
    "nota_version": "Versión As-Is: describe cómo se supervisan hoy las tiendas, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "Las visitas a tiendas, la revisión semanal con los gerentes y la corrección de lo que se encuentra. La auditoría con acta de la gerencia regional va en 9.12.",
     "texto": "En **Venezuela** la supervisión la hace la gerencia de ventas al detal con tres supervisores, uno orientado a formación y aperturas, otro a inventarios y otro al piso; todos los gerentes le reportan directo. La gerente visita personalmente, a veces sin aviso y a veces de noche; los supervisores están en la calle y se comunican por WhatsApp porque en los centros comerciales la señal no da para Lark. En la visita se mira que el personal cumpla con el uniforme y los días libres, que conozca las promociones y el manejo de garantías, que la caja cuadre, que el sistema funcione, el visual, los displays y el inventario. Los gerentes mandan cada semana un reporte de fotos, y **todos los lunes** hay reunión con gerentes, subgerentes y supervisión para promociones, pendientes y problemas.\n\nLo que se encuentra se reparte por tipo: lo visual va al equipo de Visual Merchandising por foto o chat; lo de personal lo resuelve primero el gerente de tienda con llamados de atención verbales, que pasan a escritos si hay reincidencia y solo después suben a la gerencia y a Recursos Humanos; lo de infraestructura va a mantenimiento (9.18). Las visitas al interior dependen de la logística del viaje.\n\nEn **Panamá** hay un solo supervisor para todas las tiendas, que las visita todas cada semana —dos por día, según el tráfico—, revisa uniforme, carné, exhibición por línea, limpieza, etiquetas, iluminación y daños, y hace de puente con los demás departamentos. La gerencia regional, además, revisa los viernes fotos de las tiendas, lo que genera roces con Visual cuando la foto muestra precios sobrepuestos o vitrinas que no se pudieron resolver."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente de Ventas al Detal (Venezuela); Supervisor de Tienda (Panamá)",
     "participantes": [
      "Supervisor(a) de Tiendas (país) — en Venezuela, la gerencia de ventas al detal y sus tres supervisores; en Panamá, el supervisor de tienda. Recorre las tiendas y reparte lo que encuentra.",
      "Gerente de Tienda — corrige lo de su personal y su operación, y manda el reporte semanal de fotos.",
      "Coordinador(a) de Visual Merchandising (Venezuela) — corrige la exhibición y los artes que la supervisión le reporta.",
      "Gerente de Ventas al Detal (Venezuela) — revisa en la reunión de los lunes lo que quedó pendiente.",
      "Regional Manager Retail — revisa las fotos semanales de las tiendas."
     ],
     "evidencia": [
      "E-47",
      "E-53",
      "E-31",
      "E-42",
      "SC-02",
      "Lark: Departamento de Ventas al Detal, junio 2026 (VE)"
     ],
     "notas": "Los hallazgos de las visitas no se registran en un sistema: viajan por chat y se siguen en la reunión semanal.",
     "sin_evidencia": "No consta una lista de verificación escrita para la visita ni una frecuencia mínima por tienda en Venezuela."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "El calendario semanal de visitas o un aviso de la tienda.",
     "cadencia": "Semanal; reunión con gerentes los lunes.",
     "output": "Hallazgos corregidos o asignados, y pendientes revisados en la reunión semanal.",
     "evidencia": [
      "E-47",
      "E-53"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-47",
      "E-53"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Supervisor(a) de Tiendas (país)",
       "texto": "Recorre las tiendas y revisa personal, exhibición, limpieza, etiquetas, caja y sistema."
      },
      {
       "id": "a2",
       "rol": "Supervisor(a) de Tiendas (país)",
       "texto": "Si encuentra algo, lo reparte según su tipo."
      },
      {
       "id": "a3",
       "rol": "Coordinador(a) de Visual Merchandising (Venezuela)",
       "texto": "Si es visual, corrige la exhibición o el arte."
      },
      {
       "id": "a4",
       "rol": "Gerente de Tienda",
       "texto": "Si es del personal o la operación, lo corrige con llamado de atención, escrito si reincide."
      },
      {
       "id": "a5",
       "rol": "Supervisor(a) de Tiendas (país)",
       "texto": "Si es infraestructura, lo pasa a mantenimiento (9.18)."
      },
      {
       "id": "a6",
       "rol": "Gerente de Ventas al Detal (Venezuela)",
       "texto": "Revisa los pendientes en la reunión de los lunes."
      }
     ],
     "diagrama": {
      "carriles": [
       "Supervisor(a) de Tiendas (país)",
       "Gerente de Tienda",
       "Coordinador(a) de Visual Merchandising (Venezuela)",
       "Gerente de Ventas al Detal (Venezuela)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Supervisor(a) de Tiendas (país)",
        "tipo": "inicio",
        "n": "Semana de visitas"
       },
       {
        "id": "n1",
        "carril": "Supervisor(a) de Tiendas (país)",
        "tipo": "tarea",
        "n": "Recorrer y revisar las tiendas",
        "sistemas": [
         "WhatsApp"
        ]
       },
       {
        "id": "n2",
        "carril": "Supervisor(a) de Tiendas (país)",
        "tipo": "decision",
        "n": "¿Qué se encontró?"
       },
       {
        "id": "n3",
        "carril": "Coordinador(a) de Visual Merchandising (Venezuela)",
        "tipo": "tarea",
        "n": "Corregir exhibición o arte"
       },
       {
        "id": "n4",
        "carril": "Gerente de Tienda",
        "tipo": "tarea",
        "n": "Corregir con llamado de atención"
       },
       {
        "id": "n5",
        "carril": "Supervisor(a) de Tiendas (país)",
        "tipo": "tarea",
        "n": "Pasar a mantenimiento (9.18)"
       },
       {
        "id": "n6",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "tarea",
        "n": "Revisar pendientes el lunes",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n7",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "fin",
        "n": "Pendientes en seguimiento"
       },
       {
        "id": "n8",
        "carril": "Supervisor(a) de Tiendas (país)",
        "tipo": "fin",
        "n": "Visita sin hallazgos"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3",
        "etq": "Visual"
       },
       {
        "de": "n2",
        "a": "n4",
        "etq": "Personal"
       },
       {
        "de": "n2",
        "a": "n5",
        "etq": "Infraestructura"
       },
       {
        "de": "n2",
        "a": "n8",
        "etq": "Nada"
       },
       {
        "de": "n3",
        "a": "n6"
       },
       {
        "de": "n4",
        "a": "n6"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7"
       }
      ]
     }
    }
   },
   "9.8": {
    "nota_version": "Versión As-Is: describe cómo se abre hoy una tienda o un kiosco propio, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "Desde que aparece un local hasta la tienda abierta: evaluación, proyecto, diseño, permisos, personal, sistemas, montaje y apertura. Las remodelaciones de tiendas existentes van en 9.9.",
     "texto": "La decisión de abrir la toman **los socios de la dirección comercial**, que a veces negocian personalmente con las administradoras de los centros comerciales; en Panamá el supervisor de tienda aporta los contactos con esas administradoras para encontrar locales. La gerencia regional de retail arma un análisis de la apertura —ventas esperadas, gastos, margen y recuperación de la inversión, con la regla de no pasar de tres años— y a veces Finanzas lo revisa; pero la gerencia comercial señala que **no hay un paso formal que junte el análisis comercial con el financiero** antes de decidir, y la gerencia regional cuenta que la junta ha abierto tiendas que su análisis desaconsejaba.\n\nDecidida la apertura, la oficina de proyectos la lleva como proyecto: tabla de hitos en Lark, reunión semanal con Visual, supervisión, Sistemas, el arquitecto y Administración, y un resumen a la junta los viernes. El arquitecto, externo, manda renders que revisan la gerencia de ventas al detal, Visual, la gerencia regional y la junta hasta llegar a un acuerdo; Visual reclama no ser consultado siempre. La gerencia de ventas al detal define la plantilla según el horario del centro comercial, pide el personal a Recursos Humanos y lo entrena en una tienda cercana o en Caracas; Administración saca patentes y permisos de alcaldía y bomberos, y Tesorería gestiona los puntos de venta con el banco. Sistemas instala equipos, usuarios y la caja, y prueba la facturación en un laboratorio antes de llevarla a la tienda. La coordinación de planificación arma el surtido inicial con tiendas comparables.\n\nEl montaje suele tener ajustes en caliente, que se corrigen en el sitio y **se aprenden de palabra** para la próxima. En Panamá un kiosco cuesta unos 15.000 dólares y una tienda unos 60.000, y se abren en alrededor de un mes. Mantenimiento no participa, y en una apertura de Venezuela la instalación eléctrica del contratista no aguantó la carga real y hubo que rehacerla con la tienda ya abierta."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente de Proyectos (PMO)",
     "participantes": [
      "Dirección comercial (socios) — deciden la apertura y a veces negocian el local.",
      "Regional Manager Retail — evalúa la apertura, coordina los renders y da los parámetros de exhibición.",
      "Gerente de Proyectos (PMO) — lleva la apertura como proyecto con hitos, reunión semanal y reporte a la junta.",
      "Gerente de Ventas al Detal (Venezuela) — define la plantilla, pide el personal, coordina permisos y dirige el montaje y la apertura; en Panamá, el supervisor de tienda.",
      "Técnico de Sistemas (Venezuela) — instala equipos, usuarios y caja, y prueba la facturación.",
      "Arquitecto o contratista (externo) — diseña, mide y ejecuta la obra y el mobiliario."
     ],
     "evidencia": [
      "E-55",
      "E-05",
      "E-08",
      "E-53",
      "E-47",
      "E-04",
      "E-09",
      "E-52",
      "E-33",
      "E-32",
      "E-37",
      "E-40",
      "E-31",
      "E-45",
      "SC-02",
      "E-50"
     ],
     "notas": "El análisis de la apertura llega a la junta solo con la mirada comercial; la gerencia comercial pide que se defina cómo entra Finanzas antes de decidir.",
     "sin_evidencia": "No consta una lista de verificación de apertura ni que se revise la instalación eléctrica del contratista antes de abrir."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Aparece un local o la dirección decide entrar a una plaza.",
     "cadencia": "Por proyecto; en 2026 hubo varias aperturas al mismo tiempo.",
     "output": "Tienda abierta con personal, sistemas, permisos y surtido inicial.",
     "evidencia": [
      "E-55",
      "E-04"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-55",
      "E-47",
      "E-04",
      "E-33",
      "E-05"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Dirección comercial (socios)",
       "texto": "Detecta el local o la plaza y decide evaluarlo."
      },
      {
       "id": "a2",
       "rol": "Regional Manager Retail",
       "texto": "Arma el análisis de la apertura: ventas, gastos, margen y recuperación de la inversión."
      },
      {
       "id": "a3",
       "rol": "Dirección comercial (socios)",
       "texto": "Decide si se abre; puede hacerlo aunque el análisis la desaconseje."
      },
      {
       "id": "a4",
       "rol": "Gerente de Proyectos (PMO)",
       "texto": "Abre el proyecto con su tabla de hitos y la reunión semanal."
      },
      {
       "id": "a5",
       "rol": "Regional Manager Retail",
       "texto": "Revisa los renders del arquitecto con Visual, la gerencia del país y la junta hasta llegar a un acuerdo."
      },
      {
       "id": "a6",
       "rol": "Gerente de Ventas al Detal (Venezuela)",
       "texto": "Define la plantilla, pide el personal y coordina permisos y puntos de venta."
      },
      {
       "id": "a7",
       "rol": "Técnico de Sistemas (Venezuela)",
       "texto": "Instala equipos, usuarios y caja, y prueba la facturación."
      },
      {
       "id": "a8",
       "rol": "Gerente de Ventas al Detal (Venezuela)",
       "texto": "Dirige el montaje, el entrenamiento y la apertura, corrigiendo en el sitio lo que falla."
      }
     ],
     "diagrama": {
      "carriles": [
       "Dirección comercial (socios)",
       "Regional Manager Retail",
       "Gerente de Proyectos (PMO)",
       "Gerente de Ventas al Detal (Venezuela)",
       "Técnico de Sistemas (Venezuela)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Dirección comercial (socios)",
        "tipo": "inicio",
        "n": "Aparece un local"
       },
       {
        "id": "n1",
        "carril": "Regional Manager Retail",
        "tipo": "tarea",
        "n": "Evaluar la apertura",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n2",
        "carril": "Dirección comercial (socios)",
        "tipo": "decision",
        "n": "¿Se abre?"
       },
       {
        "id": "n3",
        "carril": "Dirección comercial (socios)",
        "tipo": "fin",
        "n": "No se abre"
       },
       {
        "id": "n4",
        "carril": "Gerente de Proyectos (PMO)",
        "tipo": "tarea",
        "n": "Abrir el proyecto con hitos",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n5",
        "carril": "Regional Manager Retail",
        "tipo": "tarea",
        "n": "Acordar los renders"
       },
       {
        "id": "n6",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "tarea",
        "n": "Plantilla, permisos y puntos de venta"
       },
       {
        "id": "n7",
        "carril": "Técnico de Sistemas (Venezuela)",
        "tipo": "tarea",
        "n": "Instalar y probar sistemas",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n8",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "tarea",
        "n": "Montar, entrenar y abrir"
       },
       {
        "id": "n9",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "fin",
        "n": "Tienda abierta"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3",
        "etq": "No"
       },
       {
        "de": "n2",
        "a": "n4",
        "etq": "Sí"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8"
       },
       {
        "de": "n8",
        "a": "n9"
       }
      ]
     }
    }
   },
   "9.9": {
    "nota_version": "Versión As-Is: describe cómo se remodelan hoy las tiendas existentes, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "Las intervenciones sobre tiendas que ya operan: iluminación, paneles, mobiliario, cerramientos y reubicaciones. La apertura de una tienda nueva va en 9.8.",
     "texto": "En Venezuela las remodelaciones pendientes las lleva **la gerencia de ventas al detal en un cuaderno**: el cambio de iluminación blanca y azul a cálida —decidido a nivel regional—, paneles, un baño, un televisor. La regla que se aplica es no intervenir dos veces la misma tienda: si el material no ha llegado, se espera para hacerlo todo junto. El presupuesto lo arma el mismo arquitecto externo que hace las aperturas, que ya sabe qué se usa, y la aprobación la da la dirección. Tesorería señala que las remodelaciones le llegan como gasto no previsto en el flujo de caja.\n\nVisual Merchandising ejecuta la parte de exhibición pero reclama que no la consultan en el diseño: se entera por el proveedor de un mueble rediseñado y tiene que improvisar. Los cerramientos de las obras son otro punto de fricción: Mercadeo propone algo simple y la dirección pide algo más vistoso, lo que encarece la pieza y obliga a montarla de un día para otro. En Panamá, el hundimiento del piso de un centro comercial dañó puertas y vitrinas de una tienda, y reubicarla dentro del mismo centro no ha sido posible por falta de locales."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente de Ventas al Detal (Venezuela)",
     "participantes": [
      "Gerente de Ventas al Detal (Venezuela) — lleva la lista de pendientes, pide el presupuesto y decide cuándo intervenir.",
      "Arquitecto o contratista (externo) — cotiza y ejecuta la obra.",
      "Presidente — aprueba la remodelación; en los cerramientos opina la dirección.",
      "Coordinador(a) de Visual Merchandising (Venezuela) — rearma la exhibición después de la obra.",
      "Regional Manager Retail — fija los cambios de imagen que se aplican en todos los países."
     ],
     "evidencia": [
      "E-47",
      "E-43",
      "E-31",
      "E-42",
      "E-55",
      "SC-02"
     ],
     "notas": "La planificación de las remodelaciones vive en un cuaderno personal de la gerencia; no hay una cola compartida ni aviso a Tesorería.",
     "sin_evidencia": "No consta con precisión quién aprueba el presupuesto de una remodelación —las entrevistas lo sitúan en la dirección—, cómo se decide el orden de las intervenciones ni cómo se remodela en Panamá o en Colombia."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Una tienda necesita refrescar su imagen o se aplica un cambio regional.",
     "cadencia": "Por evento.",
     "output": "Tienda intervenida y exhibición rearmada, o pendiente en espera de aprobación o material.",
     "evidencia": [
      "E-47"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-47",
      "E-31"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Gerente de Ventas al Detal (Venezuela)",
       "texto": "Anota el pendiente y le pide el presupuesto al arquitecto."
      },
      {
       "id": "a2",
       "rol": "Arquitecto o contratista (externo)",
       "texto": "Cotiza y propone la intervención."
      },
      {
       "id": "a3",
       "rol": "Presidente",
       "texto": "Aprueba o no la remodelación."
      },
      {
       "id": "a4",
       "rol": "Gerente de Ventas al Detal (Venezuela)",
       "texto": "Si falta material, espera para intervenir la tienda una sola vez."
      },
      {
       "id": "a5",
       "rol": "Arquitecto o contratista (externo)",
       "texto": "Ejecuta la obra."
      },
      {
       "id": "a6",
       "rol": "Coordinador(a) de Visual Merchandising (Venezuela)",
       "texto": "Rearma la exhibición."
      }
     ],
     "diagrama": {
      "carriles": [
       "Gerente de Ventas al Detal (Venezuela)",
       "Arquitecto o contratista (externo)",
       "Presidente",
       "Coordinador(a) de Visual Merchandising (Venezuela)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "inicio",
        "n": "Tienda por intervenir"
       },
       {
        "id": "n1",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "tarea",
        "n": "Anotar y pedir presupuesto"
       },
       {
        "id": "n2",
        "carril": "Arquitecto o contratista (externo)",
        "tipo": "tarea",
        "n": "Cotizar la intervención"
       },
       {
        "id": "n3",
        "carril": "Presidente",
        "tipo": "decision",
        "n": "¿Aprueba?"
       },
       {
        "id": "n4",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "fin",
        "n": "Pendiente sin aprobar"
       },
       {
        "id": "n5",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "decision",
        "n": "¿Llegó el material?"
       },
       {
        "id": "n6",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "tarea",
        "n": "Esperar para intervenir una vez"
       },
       {
        "id": "n7",
        "carril": "Arquitecto o contratista (externo)",
        "tipo": "tarea",
        "n": "Ejecutar la obra"
       },
       {
        "id": "n8",
        "carril": "Coordinador(a) de Visual Merchandising (Venezuela)",
        "tipo": "tarea",
        "n": "Rearmar la exhibición"
       },
       {
        "id": "n9",
        "carril": "Coordinador(a) de Visual Merchandising (Venezuela)",
        "tipo": "fin",
        "n": "Tienda renovada"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4",
        "etq": "No"
       },
       {
        "de": "n3",
        "a": "n5",
        "etq": "Sí"
       },
       {
        "de": "n5",
        "a": "n6",
        "etq": "No"
       },
       {
        "de": "n5",
        "a": "n7",
        "etq": "Sí"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8"
       },
       {
        "de": "n8",
        "a": "n9"
       }
      ]
     }
    }
   },
   "9.10": {
    "nota_version": "Versión As-Is: describe cómo se gestionan hoy las franquicias de Cubitt, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La incorporación y el seguimiento de las franquicias de Cubitt. Las franquicias de Casio del canal mayor van en 8.8.",
     "texto": "Hasta 2026 las franquicias eran asunto del canal mayor: se les vendía, sin contrato vigente, sin regalía definida y sin acceso a lo que vendían. Este año **la gerencia regional de retail las está tomando bajo su gestión**, mientras el mayor sigue negociando y vendiéndoles la mercancía con los estándares que retail le va fijando. El primer contrato de franquicia se redactó para Nicaragua, que estaba por abrir; para las que ya operan —República Dominicana y Honduras— el trabajo es meterlas «en el sistema»: la gerencia regional les diseña una plantilla de reportería, porque no tienen los sistemas del grupo, para poder auditar su información y cobrarles una cuota a cambio de herramientas de gestión.\n\nPara una franquicia nueva la gerencia regional hace el mismo análisis que para una tienda propia (9.8): visita el local si puede, proyecta ventas, gastos y margen, y opina si es un buen negocio; la decisión final no es suya."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Regional Manager Retail",
     "participantes": [
      "Regional Manager Retail — evalúa las franquicias nuevas, redacta el contrato y diseña la reportería de las existentes.",
      "Director Comercial Wholesale y Nuevos Negocios (Cubitt) — negocia con las franquicias y les vende la mercancía.",
      "Franquiciado (externo) — opera la tienda y reporta sus ventas en la plantilla que le da la gerencia regional."
     ],
     "evidencia": [
      "E-55",
      "E-35",
      "E-08",
      "E-63"
     ],
     "notas": "El modelo está en construcción: a la fecha de las entrevistas había un solo contrato y la reportería estaba en diseño.",
     "sin_evidencia": "No consta el monto de la cuota ni cómo se auditará a las franquicias."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Aparece una franquicia nueva o se regulariza una existente.",
     "cadencia": "Por evento; reporte periódico de la franquicia, en diseño.",
     "output": "Franquicia con contrato y reportería, o incorporada al seguimiento regional.",
     "evidencia": [
      "E-55"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-55",
      "E-35",
      "E-08"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Regional Manager Retail",
       "texto": "Distingue si es una franquicia nueva o una que ya opera sin contrato."
      },
      {
       "id": "a2",
       "rol": "Regional Manager Retail",
       "texto": "Si es nueva, evalúa el local y el negocio y redacta el contrato."
      },
      {
       "id": "a3",
       "rol": "Director Comercial Wholesale y Nuevos Negocios (Cubitt)",
       "texto": "Negocia y vende la mercancía a la franquicia."
      },
      {
       "id": "a4",
       "rol": "Franquiciado (externo)",
       "texto": "Opera y reporta sus ventas en la plantilla."
      },
      {
       "id": "a5",
       "rol": "Regional Manager Retail",
       "texto": "Incorpora la información al seguimiento regional."
      }
     ],
     "diagrama": {
      "carriles": [
       "Regional Manager Retail",
       "Director Comercial Wholesale y Nuevos Negocios (Cubitt)",
       "Franquiciado (externo)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Regional Manager Retail",
        "tipo": "inicio",
        "n": "Franquicia por incorporar"
       },
       {
        "id": "n1",
        "carril": "Regional Manager Retail",
        "tipo": "decision",
        "n": "¿Nueva o existente?"
       },
       {
        "id": "n2",
        "carril": "Regional Manager Retail",
        "tipo": "tarea",
        "n": "Evaluar el negocio",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n3",
        "carril": "Regional Manager Retail",
        "tipo": "tarea",
        "n": "Redactar el contrato"
       },
       {
        "id": "n4",
        "carril": "Regional Manager Retail",
        "tipo": "tarea",
        "n": "Diseñar su reportería",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n5",
        "carril": "Director Comercial Wholesale y Nuevos Negocios (Cubitt)",
        "tipo": "tarea",
        "n": "Negociar y vender la mercancía",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n6",
        "carril": "Franquiciado (externo)",
        "tipo": "tarea",
        "n": "Operar y reportar ventas"
       },
       {
        "id": "n7",
        "carril": "Regional Manager Retail",
        "tipo": "tarea",
        "n": "Incorporar al seguimiento regional",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n8",
        "carril": "Regional Manager Retail",
        "tipo": "fin",
        "n": "Franquicia en seguimiento"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2",
        "etq": "Nueva"
       },
       {
        "de": "n1",
        "a": "n4",
        "etq": "Existente"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8"
       }
      ]
     }
    }
   },
   "9.11": {
    "nota_version": "Versión As-Is: describe cómo se trabaja hoy con los socios y operadores que llevan tiendas de las marcas, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La relación operativa con las tiendas que no son propiedad plena ni franquicia: el socio de Costa Rica y el operador tercerizado de Guatemala. La venta que el grupo les hace va por el macro 8.",
     "texto": "**Costa Rica** es una sociedad a partes iguales con un socio local que lleva unas cien personas y catorce puntos de venta de Casio y Cubitt, con su propio sistema de gestión —no Odoo— y, además, marcas que no son del grupo. Durante casi veinte años se manejó como un cliente al que la dirección visitaba una vez al año; desde la pandemia el equipo de Panamá interviene más, con viajes varias veces al año. La relación sigue sin definirse: **a veces se la trata como socio y a veces como cliente**, y el propio equipo de Costa Rica dice sentirse más cliente que socio. El socio manda cada día su venta y su contabilidad; la gerencia regional de retail tiene una consulta para ver sus números, les pasa los mismos cuadros de meta que al resto y mantiene un chat diario con sus supervisoras. Los pedidos los arma el área de compras del socio, que los aprueba su dirección general, y la gerencia de ventas al mayor de Panamá confirma la disponibilidad y los manda a alistar; el transporte llega puerta a puerta. La comunicación de garantías con Costa Rica va por WhatsApp, sin registro.\n\n**Guatemala** no tiene entidad propia: un operador local abre y administra las tiendas, lleva la logística y el personal a su nombre y cobra una cuota sobre la venta, bajo las políticas del grupo, que mantiene allí una gerencia de país propia. Como el operador no permite compartir el cuadro regional, se le arma uno aparte. El resto de los mercados sin operación propia se atiende como clientes del mayor."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Regional Manager Retail",
     "participantes": [
      "Regional Manager Retail — sigue la venta de los socios con los mismos cuadros que al resto y les sugiere acciones.",
      "Socio u operador local (externo) — el socio de Costa Rica o el operador de Guatemala; opera las tiendas, reporta su venta y arma sus pedidos.",
      "Gerente de Ventas Mayor (Panamá) — confirma la disponibilidad de los pedidos del socio y los manda a alistar.",
      "Director Comercial y de Compras (socio) — es el interlocutor de la dirección con Costa Rica."
     ],
     "evidencia": [
      "E-67",
      "E-19",
      "E-59",
      "E-01",
      "E-05",
      "E-55",
      "E-64",
      "E-02"
     ],
     "notas": "No hay una decisión sobre qué procesos del grupo aplican al socio de Costa Rica; se propuso una instancia periódica de coordinación, sin implementar.",
     "sin_evidencia": "No consta qué información reporta el operador de Guatemala ni con qué frecuencia."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "La operación diaria del socio y cada pedido que hace a Panamá.",
     "cadencia": "Reporte de venta diario; visitas varias veces al año; pedidos según necesidad.",
     "output": "Venta del socio consolidada en el seguimiento regional y pedidos despachados.",
     "evidencia": [
      "E-19",
      "E-55"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-19",
      "E-55",
      "E-59"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Socio u operador local (externo)",
       "texto": "Vende y reporta cada día su venta."
      },
      {
       "id": "a2",
       "rol": "Regional Manager Retail",
       "texto": "La revisa junto con la del resto de los países."
      },
      {
       "id": "a3",
       "rol": "Regional Manager Retail",
       "texto": "Si hay desviación, le sugiere acciones por el chat diario."
      },
      {
       "id": "a4",
       "rol": "Socio u operador local (externo)",
       "texto": "Arma su pedido a Panamá y lo aprueba su dirección."
      },
      {
       "id": "a5",
       "rol": "Gerente de Ventas Mayor (Panamá)",
       "texto": "Confirma la disponibilidad y lo manda a alistar; el transporte llega puerta a puerta."
      }
     ],
     "diagrama": {
      "carriles": [
       "Socio u operador local (externo)",
       "Regional Manager Retail",
       "Gerente de Ventas Mayor (Panamá)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Socio u operador local (externo)",
        "tipo": "inicio",
        "n": "Operación del socio"
       },
       {
        "id": "n1",
        "carril": "Socio u operador local (externo)",
        "tipo": "tarea",
        "n": "Vender y reportar la venta diaria",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n2",
        "carril": "Regional Manager Retail",
        "tipo": "tarea",
        "n": "Revisar junto con los países",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n3",
        "carril": "Regional Manager Retail",
        "tipo": "decision",
        "n": "¿Hay desviación?"
       },
       {
        "id": "n4",
        "carril": "Regional Manager Retail",
        "tipo": "tarea",
        "n": "Sugerir acciones por chat",
        "sistemas": [
         "WhatsApp"
        ]
       },
       {
        "id": "n5",
        "carril": "Socio u operador local (externo)",
        "tipo": "tarea",
        "n": "Armar y aprobar su pedido"
       },
       {
        "id": "n6",
        "carril": "Gerente de Ventas Mayor (Panamá)",
        "tipo": "tarea",
        "n": "Confirmar y mandar a alistar",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n7",
        "carril": "Gerente de Ventas Mayor (Panamá)",
        "tipo": "fin",
        "n": "Pedido despachado al socio"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4",
        "etq": "Sí"
       },
       {
        "de": "n3",
        "a": "n5",
        "etq": "No"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7"
       }
      ]
     }
    }
   },
   "9.12": {
    "nota_version": "Versión As-Is: describe cómo se audita hoy el estándar de las tiendas, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La verificación periódica del estándar operativo, visual y de mantenimiento de las tiendas, más las inspecciones externas. La supervisión semanal va en 9.7.",
     "texto": "La auditoría de tienda **no tiene un formato común**. Lo más parecido es el acta de visita que deja la gerencia regional de retail cuando viaja a un país con el que no tiene contacto frecuente: anota lo que encuentra —tiendas que piden una adecuación, una remodelación, un cambio— y los responsables, para darle seguimiento en la próxima visita. Los gerentes mandan cada semana fotos de su tienda y la gerencia regional las revisa los viernes. Visual Merchandising hace sus propias auditorías de exhibición. La aplicación de autoauditoría —que cada gerente se audite y que avise cuándo una tienda lleva meses sin hacerlo— es una idea de la gerencia regional, todavía no desarrollada.\n\nLas inspecciones externas llegan sin aviso: la administración del centro comercial inspecciona antes de renovar el contrato y deja una orden de chequeo con plazo; y en Venezuela, cuando hay inspección laboral o del seguro social, Recursos Humanos avisa a los gerentes por WhatsApp para que tengan la documentación a mano, que a veces no está impresa. No hay un área de auditoría interna que haga revisiones sorpresa de cajas o activos."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Regional Manager Retail",
     "participantes": [
      "Regional Manager Retail — revisa las fotos semanales y deja actas de visita con responsables.",
      "Gerente de Tienda — manda las fotos, corrige lo observado y atiende las inspecciones externas.",
      "Gerente de Ventas al Detal (Venezuela) — asigna las correcciones que salen de las actas.",
      "Coordinador(a) de Visual Merchandising — audita la exhibición.",
      "Gerente de Recursos Humanos (Venezuela) — avisa a las tiendas de las inspecciones laborales."
     ],
     "evidencia": [
      "E-55",
      "E-47",
      "E-31",
      "E-37",
      "E-38",
      "Lark: Procesos Visual Merchandising (VE)",
      "Lark: Guía de procesos Retail LATAM de la gerencia regional, agosto 2026"
     ],
     "notas": "Las actas y las fotos no se consolidan en un registro que permita ver el estado de todas las tiendas.",
     "sin_evidencia": "No consta una frecuencia de auditoría por tienda ni criterios escritos de qué se evalúa."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "La revisión semanal de fotos, una visita regional o una inspección externa.",
     "cadencia": "Fotos semanales; actas por visita; inspecciones sin fecha fija.",
     "output": "Observaciones asignadas y corregidas, con seguimiento en la visita siguiente.",
     "evidencia": [
      "E-55",
      "E-47"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-55",
      "E-47"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Gerente de Tienda",
       "texto": "Manda las fotos semanales de la tienda."
      },
      {
       "id": "a2",
       "rol": "Regional Manager Retail",
       "texto": "Revisa las fotos o visita la tienda y deja un acta con responsables."
      },
      {
       "id": "a3",
       "rol": "Gerente de Ventas al Detal (Venezuela)",
       "texto": "Si hay observaciones, asigna la corrección."
      },
      {
       "id": "a4",
       "rol": "Gerente de Tienda",
       "texto": "Corrige y reporta."
      },
      {
       "id": "a5",
       "rol": "Regional Manager Retail",
       "texto": "Le da seguimiento en la próxima visita."
      }
     ],
     "diagrama": {
      "carriles": [
       "Gerente de Tienda",
       "Regional Manager Retail",
       "Gerente de Ventas al Detal (Venezuela)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Gerente de Tienda",
        "tipo": "inicio",
        "n": "Semana o visita regional"
       },
       {
        "id": "n1",
        "carril": "Gerente de Tienda",
        "tipo": "tarea",
        "n": "Mandar fotos de la tienda",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n2",
        "carril": "Regional Manager Retail",
        "tipo": "tarea",
        "n": "Revisar y dejar acta de visita"
       },
       {
        "id": "n3",
        "carril": "Regional Manager Retail",
        "tipo": "decision",
        "n": "¿Hay observaciones?"
       },
       {
        "id": "n4",
        "carril": "Regional Manager Retail",
        "tipo": "fin",
        "n": "Sin observaciones"
       },
       {
        "id": "n5",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "tarea",
        "n": "Asignar la corrección"
       },
       {
        "id": "n6",
        "carril": "Gerente de Tienda",
        "tipo": "tarea",
        "n": "Corregir y reportar"
       },
       {
        "id": "n7",
        "carril": "Regional Manager Retail",
        "tipo": "tarea",
        "n": "Seguir en la próxima visita"
       },
       {
        "id": "n8",
        "carril": "Regional Manager Retail",
        "tipo": "fin",
        "n": "Observación cerrada"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4",
        "etq": "No"
       },
       {
        "de": "n3",
        "a": "n5",
        "etq": "Sí"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8"
       }
      ]
     }
    }
   },
   "9.13": {
    "nota_version": "Versión As-Is: describe cómo se atiende hoy en tienda un producto con falla, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La recepción en tienda del reclamo, la decisión de cambio o envío a taller y el retorno al cliente. El proceso completo de garantías, fábrica y desecho va en el macro 11.",
     "texto": "La tienda es la primera puerta y **recibe la garantía sin importar dónde se compró el producto**. El cajero o el gerente hace la primera evaluación —batería, encendido, cargador— y resuelve lo que puede: si el producto se compró en las últimas 24 horas y no enciende, se cambia en el acto; si es una actualización o un cargador, se resuelve allí. La regla, dice la gerencia de ventas al detal, admite excepciones según el cliente.\n\nEn **Venezuela**, si no se resuelve en tienda, el gerente registra una orden de servicio en el sistema del taller —distinto de Odoo—, le da al cliente la hoja de la orden y envía el producto al taller central por el transporte. Allí se verifica la garantía en otro sistema, se decide el cambio y se reporta a la fábrica, en papel; la unidad de cambio sale por un traslado en Odoo. Son **cuatro sistemas sin integración** para un mismo caso, con más de 1.400 órdenes de servicio entre junio y julio. **Cubitt no se repara**: se cambia o, si no hay unidad, se ofrece un descuento sobre uno nuevo dejando el dañado; **Casio sí**, con relojeros y un presupuesto que el cliente paga si está fuera de garantía. El conocimiento del proceso de Casio está concentrado en una sola persona del taller.\n\nEn **Panamá** la tienda funciona como filtro: registra el caso en el flujo de Lark de Servicio Técnico, hace un traslado a una bodega lógica de garantías y, una vez al mes, lo recibido se concilia en bodega contra lo registrado antes del desecho. En los primeros 15 a 30 días desde la compra, la tienda cambia directamente; después se centraliza en la oficina."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente de Tienda",
     "participantes": [
      "Gerente de Tienda — evalúa la falla, resuelve lo que puede en tienda y registra y envía el resto; en Venezuela, también la cajera.",
      "Servicio Técnico (Venezuela) — verifica la garantía, decide el cambio o la reparación, reporta a la fábrica y devuelve la unidad a la tienda.",
      "Customer Services Manager (Panamá) — mantiene el flujo de garantías de Lark que usan las tiendas de Panamá y de otros países.",
      "Supervisor(a) de Tiendas (Venezuela) — entrena al personal para reconocer las fallas que se cambian en tienda."
     ],
     "evidencia": [
      "E-47",
      "E-51",
      "E-53",
      "E-58",
      "E-64",
      "E-02",
      "SC-03",
      "E-33",
      "E-34",
      "E-01"
     ],
     "notas": "En Venezuela el caso se vuelve a teclear en cada sistema; el propio taller estima que integrarlos le ahorraría la mayor parte del trabajo repetitivo.",
     "sin_evidencia": "No consta un plazo de respuesta al cliente en Venezuela ni cómo se le informa del estado de su caso."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Un cliente trae a la tienda un producto con falla.",
     "cadencia": "Por evento; volumen alto y creciente.",
     "output": "Producto resuelto en tienda, o reparado o cambiado y devuelto a la tienda.",
     "evidencia": [
      "E-47",
      "E-51"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-47",
      "E-51"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Gerente de Tienda",
       "texto": "Evalúa la falla: batería, encendido, cargador."
      },
      {
       "id": "a2",
       "rol": "Gerente de Tienda",
       "texto": "Si se resuelve en tienda, o si falló en las primeras 24 horas, lo resuelve o lo cambia en el acto."
      },
      {
       "id": "a3",
       "rol": "Gerente de Tienda",
       "texto": "Si no, registra la orden de servicio en el sistema del taller y envía el producto."
      },
      {
       "id": "a4",
       "rol": "Servicio Técnico (Venezuela)",
       "texto": "Verifica la garantía en su sistema."
      },
      {
       "id": "a5",
       "rol": "Servicio Técnico (Venezuela)",
       "texto": "Si es Casio, lo repara; si es Cubitt, lo cambia o ofrece un descuento."
      },
      {
       "id": "a6",
       "rol": "Servicio Técnico (Venezuela)",
       "texto": "Reporta a la fábrica y hace el traslado de la unidad en Odoo."
      }
     ],
     "diagrama": {
      "carriles": [
       "Gerente de Tienda",
       "Servicio Técnico (Venezuela)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Gerente de Tienda",
        "tipo": "inicio",
        "n": "Cliente trae una falla"
       },
       {
        "id": "n1",
        "carril": "Gerente de Tienda",
        "tipo": "tarea",
        "n": "Evaluar la falla en tienda"
       },
       {
        "id": "n2",
        "carril": "Gerente de Tienda",
        "tipo": "decision",
        "n": "¿Se resuelve en tienda?"
       },
       {
        "id": "n3",
        "carril": "Gerente de Tienda",
        "tipo": "fin",
        "n": "Resuelto o cambiado en tienda"
       },
       {
        "id": "n4",
        "carril": "Gerente de Tienda",
        "tipo": "tarea",
        "n": "Registrar la orden y enviar",
        "sistemas": [
         "Sistema del taller"
        ]
       },
       {
        "id": "n5",
        "carril": "Servicio Técnico (Venezuela)",
        "tipo": "tarea",
        "n": "Verificar la garantía",
        "sistemas": [
         "NAF"
        ]
       },
       {
        "id": "n6",
        "carril": "Servicio Técnico (Venezuela)",
        "tipo": "decision",
        "n": "¿Qué marca es?"
       },
       {
        "id": "n7",
        "carril": "Servicio Técnico (Venezuela)",
        "tipo": "tarea",
        "n": "Reparar (Casio)"
       },
       {
        "id": "n8",
        "carril": "Servicio Técnico (Venezuela)",
        "tipo": "tarea",
        "n": "Cambiar o descontar (Cubitt)"
       },
       {
        "id": "n9",
        "carril": "Servicio Técnico (Venezuela)",
        "tipo": "tarea",
        "n": "Reportar a fábrica y trasladar",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n10",
        "carril": "Servicio Técnico (Venezuela)",
        "tipo": "fin",
        "n": "Producto de vuelta en tienda"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3",
        "etq": "Sí"
       },
       {
        "de": "n2",
        "a": "n4",
        "etq": "No"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7",
        "etq": "Casio"
       },
       {
        "de": "n6",
        "a": "n8",
        "etq": "Cubitt"
       },
       {
        "de": "n7",
        "a": "n9"
       },
       {
        "de": "n8",
        "a": "n9"
       },
       {
        "de": "n9",
        "a": "n10"
       }
      ]
     }
    }
   },
   "9.14": {
    "nota_version": "Versión As-Is: describe cómo se cuenta hoy el inventario de las tiendas, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "Los conteos selectivos por línea de producto, el inventario general y el ajuste de diferencias en tienda. El inventario de las bodegas va en el macro 7.",
     "texto": "En **Venezuela** cada tienda tiene un calendario semanal de qué líneas se cuentan, y se cuenta además antes y después de los días fuertes, como el Día de la Madre. La supervisora de tienda e inventario dejó instructivos para sacar de Odoo la existencia de la tienda, contarla en una hoja con columnas de vitrina, depósito y dañado, archivar cada conteo y llevar un cuaderno de novedades; su instructivo pide un selectivo cada mes. En la práctica el conteo sigue siendo **manual**, lo que la dirección ha cuestionado, y la coordinación de planificación dice que las diferencias aparecen cuando se arma un traslado y «arriba no hay». Casi todas son cambios de color —se vendió uno azul por uno amarillo— y se ajustan uno por otro. Cuando hay un faltante real, **la tienda lo paga**: se factura el producto con el descuento de empleado y el monto se divide entre el personal de la sucursal, una regla que se comunica el primer día.\n\nEn **Panamá** las tiendas hacen dos o tres conteos cortos por semana con una tablet en el WMS; antes de contar, el supervisor saca la existencia del día para que la venta no altere la comparación, descarga lo contado y devuelve las diferencias en el momento. Con la misma herramienta se hace el inventario general de fin de año."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Supervisor(a) de Tienda e Inventario (Venezuela); Supervisor de Tienda (Panamá)",
     "participantes": [
      "Supervisor(a) de Tienda e Inventario (Venezuela) — en Panamá, el supervisor de tienda. Saca la existencia teórica, compara lo contado y ajusta.",
      "Gerente de Tienda — cuenta con su equipo las líneas del calendario y responde por los faltantes.",
      "Coordinadora de Planificación de Compras (Rower, Venezuela) — detecta diferencias cuando arma traslados sobre existencias que no están."
     ],
     "evidencia": [
      "E-47",
      "E-53",
      "E-42",
      "E-40",
      "SC-02",
      "Lark: instructivos de inventario y etiquetas en Odoo de la Supervisión de Tienda e Inventario (VE)",
      "Lark: Departamento de Ventas al Detal, junio 2026 (VE)"
     ],
     "notas": "En Venezuela conviven un calendario de conteos y la percepción de otras áreas de que el inventario de tienda no se cuenta con regularidad.",
     "sin_evidencia": "No consta cuántos ajustes por diferencia se hacen al mes ni un registro consolidado de faltantes."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "El calendario de conteos, un día fuerte próximo o el cierre del año.",
     "cadencia": "Semanal o mensual por línea; inventario general anual.",
     "output": "Inventario ajustado en el sistema y faltantes cobrados al equipo de la tienda.",
     "evidencia": [
      "E-47",
      "E-53",
      "Lark: instructivos de inventario y etiquetas en Odoo de la Supervisión de Tienda e Inventario (VE)"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-47",
      "E-53",
      "Lark: instructivos de inventario y etiquetas en Odoo de la Supervisión de Tienda e Inventario (VE)"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Supervisor(a) de Tienda e Inventario (Venezuela)",
       "texto": "Saca de Odoo la existencia teórica de la línea que toca contar."
      },
      {
       "id": "a2",
       "rol": "Gerente de Tienda",
       "texto": "Cuenta la línea con su equipo: vitrina, depósito y dañado."
      },
      {
       "id": "a3",
       "rol": "Supervisor(a) de Tienda e Inventario (Venezuela)",
       "texto": "Compara lo contado contra el sistema."
      },
      {
       "id": "a4",
       "rol": "Supervisor(a) de Tienda e Inventario (Venezuela)",
       "texto": "Si la diferencia es un cambio de color, ajusta uno por otro."
      },
      {
       "id": "a5",
       "rol": "Gerente de Tienda",
       "texto": "Si es un faltante, se factura con descuento de empleado y lo paga el equipo de la tienda."
      }
     ],
     "diagrama": {
      "carriles": [
       "Supervisor(a) de Tienda e Inventario (Venezuela)",
       "Gerente de Tienda"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Supervisor(a) de Tienda e Inventario (Venezuela)",
        "tipo": "inicio",
        "n": "Toca contar una línea"
       },
       {
        "id": "n1",
        "carril": "Supervisor(a) de Tienda e Inventario (Venezuela)",
        "tipo": "tarea",
        "n": "Sacar la existencia teórica",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n2",
        "carril": "Gerente de Tienda",
        "tipo": "tarea",
        "n": "Contar la línea",
        "sistemas": [
         "Excel",
         "WMS"
        ]
       },
       {
        "id": "n3",
        "carril": "Supervisor(a) de Tienda e Inventario (Venezuela)",
        "tipo": "tarea",
        "n": "Comparar contra el sistema",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n4",
        "carril": "Supervisor(a) de Tienda e Inventario (Venezuela)",
        "tipo": "decision",
        "n": "¿Qué diferencia hay?"
       },
       {
        "id": "n5",
        "carril": "Supervisor(a) de Tienda e Inventario (Venezuela)",
        "tipo": "fin",
        "n": "Inventario cuadrado"
       },
       {
        "id": "n6",
        "carril": "Supervisor(a) de Tienda e Inventario (Venezuela)",
        "tipo": "tarea",
        "n": "Ajustar el cambio de color",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n7",
        "carril": "Gerente de Tienda",
        "tipo": "tarea",
        "n": "Cobrar el faltante al equipo",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n8",
        "carril": "Gerente de Tienda",
        "tipo": "fin",
        "n": "Diferencia cerrada"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5",
        "etq": "Ninguna"
       },
       {
        "de": "n4",
        "a": "n6",
        "etq": "Color"
       },
       {
        "de": "n4",
        "a": "n7",
        "etq": "Faltante"
       },
       {
        "de": "n6",
        "a": "n8"
       },
       {
        "de": "n7",
        "a": "n8"
       }
      ]
     }
    }
   },
   "9.15": {
    "nota_version": "Versión As-Is: describe cómo sale hoy el efectivo de las tiendas hasta el banco o la oficina, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "El traslado y el depósito del efectivo de la venta de las tiendas. El cuadre de caja va en 9.5 y la conciliación bancaria, en el macro 12.",
     "texto": "En **Venezuela**, las tiendas de Caracas no depositan: el efectivo, con su cuadre, viaja en la valija que lleva el personal del almacén en sus rutas de reparto —lunes, miércoles y viernes para todas las tiendas— y lo recibe en la oficina una sola persona de Administración, que concentra todas esas operaciones y avisa si lo recibido no coincide con lo declarado. En la misma valija van los vouchers de los puntos de venta para Contabilidad, y el transporte trae y lleva también mercancía, reparaciones y material de oficina. Las tiendas del interior depositan en el banco y mandan los documentos por courier, que lleva el gerente o el subgerente a la agencia. En los kioscos, la norma de depositar al día siguiente no siempre se cumple. Parte del efectivo que se usa fuera de las tiendas se custodia sin pasar por Odoo, algo que Tesorería señala como mejorable.\n\nEn **Panamá** casi todas las tiendas tienen banco en el centro comercial y depositan el mismo día; los papeles van físicamente a Contabilidad. Una tienda sin banco cercano entrega el efectivo, anotado en un cuaderno, al supervisor o a alguien de Contabilidad, y un mensajero lo deposita. Los pagos por transferencia inmediata llegan notificados a la tienda; las transferencias grandes las confirma Contabilidad antes de entregar el producto."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Administración (Venezuela)",
     "participantes": [
      "Gerente de Tienda — arma la valija con el efectivo y el cuadre, o deposita cuando la tienda está en el interior; en Panamá, deposita en el banco del centro comercial.",
      "Personal de almacén (rutas de reparto) — lleva la valija de las tiendas de Caracas a la oficina.",
      "Administración (Venezuela) — recibe y cuenta el efectivo y avisa las diferencias.",
      "Contabilidad (Panamá) — confirma transferencias grandes y retira el efectivo de la tienda sin banco."
     ],
     "evidencia": [
      "E-47",
      "E-38",
      "E-43",
      "E-53",
      "Lark: Manual Análisis Reporte de Venta de Tienda Casiolandia (PA)"
     ],
     "notas": "En Venezuela el efectivo viaja con la mercancía, en las rutas del almacén, y lo custodia una sola persona.",
     "sin_evidencia": "No consta un límite de efectivo por tienda ni un plazo máximo entre la venta y la llegada del efectivo a la oficina."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "El cierre con efectivo en caja.",
     "cadencia": "Rutas lunes, miércoles y viernes en Caracas; depósito diario en Panamá.",
     "output": "Efectivo depositado o en custodia de Administración, con sus soportes en Contabilidad.",
     "evidencia": [
      "E-47",
      "E-53"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-47",
      "E-38"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Gerente de Tienda",
       "texto": "Si la tienda es del interior, deposita en el banco y manda los soportes por courier."
      },
      {
       "id": "a2",
       "rol": "Gerente de Tienda",
       "texto": "Si es de Caracas, arma la valija con el efectivo, el cuadre y los vouchers."
      },
      {
       "id": "a3",
       "rol": "Personal de almacén (rutas de reparto)",
       "texto": "Lleva la valija a la oficina en la ruta de reparto."
      },
      {
       "id": "a4",
       "rol": "Administración (Venezuela)",
       "texto": "Recibe y cuenta el efectivo contra el cuadre."
      },
      {
       "id": "a5",
       "rol": "Administración (Venezuela)",
       "texto": "Si no coincide, avisa la diferencia a la tienda."
      }
     ],
     "diagrama": {
      "carriles": [
       "Gerente de Tienda",
       "Personal de almacén (rutas de reparto)",
       "Administración (Venezuela)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Gerente de Tienda",
        "tipo": "inicio",
        "n": "Efectivo al cierre"
       },
       {
        "id": "n1",
        "carril": "Gerente de Tienda",
        "tipo": "decision",
        "n": "¿Tienda del interior?"
       },
       {
        "id": "n2",
        "carril": "Gerente de Tienda",
        "tipo": "tarea",
        "n": "Depositar y enviar soportes",
        "sistemas": [
         "Banca en línea",
         "MRW"
        ]
       },
       {
        "id": "n3",
        "carril": "Gerente de Tienda",
        "tipo": "fin",
        "n": "Efectivo depositado"
       },
       {
        "id": "n4",
        "carril": "Gerente de Tienda",
        "tipo": "tarea",
        "n": "Armar la valija con el cuadre"
       },
       {
        "id": "n5",
        "carril": "Personal de almacén (rutas de reparto)",
        "tipo": "tarea",
        "n": "Llevarla en la ruta de reparto"
       },
       {
        "id": "n6",
        "carril": "Administración (Venezuela)",
        "tipo": "tarea",
        "n": "Recibir y contar el efectivo"
       },
       {
        "id": "n7",
        "carril": "Administración (Venezuela)",
        "tipo": "decision",
        "n": "¿Coincide con el cuadre?"
       },
       {
        "id": "n8",
        "carril": "Administración (Venezuela)",
        "tipo": "tarea",
        "n": "Avisar la diferencia a la tienda"
       },
       {
        "id": "n9",
        "carril": "Administración (Venezuela)",
        "tipo": "fin",
        "n": "Efectivo en custodia"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2",
        "etq": "Sí"
       },
       {
        "de": "n1",
        "a": "n4",
        "etq": "No"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8",
        "etq": "No"
       },
       {
        "de": "n7",
        "a": "n9",
        "etq": "Sí"
       },
       {
        "de": "n8",
        "a": "n9"
       }
      ]
     }
    }
   },
   "9.16": {
    "nota_version": "Versión As-Is: describe cómo se gestiona hoy el día a día del personal de las tiendas, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La cobertura de turnos, las vacaciones, las vacantes, el ingreso y las faltas del personal de tienda. Las comisiones van en 9.17 y el proceso completo de talento, en el macro 17.",
     "texto": "En **Venezuela** la gerencia de ventas al detal cuida que las plantillas estén completas. Aprueba las vacaciones y las pasa a Recursos Humanos, porque es ella quien sabe si chocan con un permiso o con otra ausencia; cuando alguien falta, mueve personal entre tiendas, y el que rota entre Casio y Cubitt se cambia el uniforme. Cuando hay una vacante o una apertura, avisa por correo a Recursos Humanos, que publica en portales de empleo, hace una preselección telefónica y le manda una terna; la gerencia entrevista y **decide con Recursos Humanos**. Al ingreso se piden los usuarios de Lark y Odoo y se entrega un kit; no hay una inducción institucional formal. El entrenamiento de producto lo da la supervisión en la tienda y queda en la universidad corporativa. Las faltas las atiende primero el gerente de tienda con llamados de atención verbales; si hay reincidencia, por escrito, y solo después interviene la gerencia con Recursos Humanos.\n\nNo hay evaluación de desempeño individual: desde mayo de 2026 hay un bono grupal por tienda, que se paga a todo el equipo si la tienda llega a su meta y a nadie si no llega. En **Panamá** el supervisor de tienda revisa los horarios que cada tienda sube a Lark, cubre las ausencias y es el puente con Recursos Humanos, que controla la asistencia con un reloj biométrico. Cuando se abre una tienda, el gerente de ventas avisa con antelación para contratar antes de la apertura."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente de Ventas al Detal (Venezuela)",
     "participantes": [
      "Gerente de Tienda — pide vacaciones y cobertura y atiende en primera instancia las faltas de su equipo.",
      "Gerente de Ventas al Detal (Venezuela) — aprueba vacaciones, cubre ausencias, pide personal y decide los ingresos con Recursos Humanos; en Panamá, el supervisor de tienda.",
      "Gerente de Recursos Humanos (Venezuela) — publica, preselecciona, incorpora y registra; en Panamá, la gerencia de RRHH del país."
     ],
     "evidencia": [
      "E-47",
      "E-37",
      "E-21",
      "E-53",
      "E-54",
      "SC-13",
      "E-64"
     ],
     "notas": "Los criterios para cubrir turnos y mover personal entre tiendas no están escritos: dependen de la gerencia.",
     "sin_evidencia": "No consta cómo se gestiona el personal de tienda en Colombia ni si existe un plan de desarrollo para el personal de piso."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Una ausencia, una solicitud de vacaciones o una vacante.",
     "cadencia": "Continua; picos de contratación de octubre a diciembre.",
     "output": "Turno cubierto, vacaciones aprobadas o personal incorporado.",
     "evidencia": [
      "E-47",
      "E-37"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-47",
      "E-37",
      "E-21"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Gerente de Ventas al Detal (Venezuela)",
       "texto": "Identifica la novedad: una ausencia, unas vacaciones o una vacante."
      },
      {
       "id": "a2",
       "rol": "Gerente de Ventas al Detal (Venezuela)",
       "texto": "Si es una ausencia, mueve personal de otra tienda."
      },
      {
       "id": "a3",
       "rol": "Gerente de Tienda",
       "texto": "Si son vacaciones, las solicita."
      },
      {
       "id": "a4",
       "rol": "Gerente de Ventas al Detal (Venezuela)",
       "texto": "Revisa que no choquen con la plantilla y las aprueba."
      },
      {
       "id": "a5",
       "rol": "Gerente de Recursos Humanos (Venezuela)",
       "texto": "Registra las vacaciones."
      },
      {
       "id": "a6",
       "rol": "Gerente de Ventas al Detal (Venezuela)",
       "texto": "Si es una vacante, avisa a Recursos Humanos por correo."
      },
      {
       "id": "a7",
       "rol": "Gerente de Recursos Humanos (Venezuela)",
       "texto": "Publica, preselecciona y envía una terna."
      },
      {
       "id": "a8",
       "rol": "Gerente de Ventas al Detal (Venezuela)",
       "texto": "Entrevista y decide con Recursos Humanos."
      },
      {
       "id": "a9",
       "rol": "Gerente de Recursos Humanos (Venezuela)",
       "texto": "Incorpora a la persona: usuarios y kit de ingreso."
      }
     ],
     "diagrama": {
      "carriles": [
       "Gerente de Tienda",
       "Gerente de Ventas al Detal (Venezuela)",
       "Gerente de Recursos Humanos (Venezuela)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "inicio",
        "n": "Novedad de personal"
       },
       {
        "id": "n1",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "decision",
        "n": "¿Qué novedad es?"
       },
       {
        "id": "n2",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "tarea",
        "n": "Mover personal de otra tienda"
       },
       {
        "id": "n3",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "fin",
        "n": "Turno cubierto"
       },
       {
        "id": "n4",
        "carril": "Gerente de Tienda",
        "tipo": "tarea",
        "n": "Solicitar vacaciones"
       },
       {
        "id": "n5",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "tarea",
        "n": "Revisar plantilla y aprobar"
       },
       {
        "id": "n6",
        "carril": "Gerente de Recursos Humanos (Venezuela)",
        "tipo": "tarea",
        "n": "Registrar las vacaciones"
       },
       {
        "id": "n7",
        "carril": "Gerente de Recursos Humanos (Venezuela)",
        "tipo": "fin",
        "n": "Vacaciones aprobadas"
       },
       {
        "id": "n8",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "tarea",
        "n": "Avisar la vacante a RRHH",
        "sistemas": [
         "Correo"
        ]
       },
       {
        "id": "n9",
        "carril": "Gerente de Recursos Humanos (Venezuela)",
        "tipo": "tarea",
        "n": "Publicar y preseleccionar"
       },
       {
        "id": "n10",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "tarea",
        "n": "Entrevistar y decidir con RRHH"
       },
       {
        "id": "n11",
        "carril": "Gerente de Recursos Humanos (Venezuela)",
        "tipo": "tarea",
        "n": "Incorporar a la persona",
        "sistemas": [
         "Lark",
         "Odoo"
        ]
       },
       {
        "id": "n12",
        "carril": "Gerente de Recursos Humanos (Venezuela)",
        "tipo": "fin",
        "n": "Personal incorporado"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2",
        "etq": "Ausencia"
       },
       {
        "de": "n1",
        "a": "n4",
        "etq": "Vacaciones"
       },
       {
        "de": "n1",
        "a": "n8",
        "etq": "Vacante"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n8",
        "a": "n9"
       },
       {
        "de": "n9",
        "a": "n10"
       },
       {
        "de": "n10",
        "a": "n11"
       },
       {
        "de": "n11",
        "a": "n12"
       }
      ]
     }
    }
   },
   "9.17": {
    "nota_version": "Versión As-Is: describe cómo se calculan y pagan hoy las comisiones del personal de tienda, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "El cálculo, la validación y el pago de las comisiones e incentivos del personal de tienda. Las comisiones del canal mayor van en 8.14.",
     "texto": "Cada país paga **un esquema distinto**, y la gerencia regional de retail ha propuesto uno único para toda la región, que la gerencia comercial está evaluando. En **Venezuela** Recursos Humanos baja cada mes, del módulo de comisiones de Odoo, un reporte por cargo —asesores, cajeras, gerentes, supervisores— y manda el de las tiendas a la gerencia de ventas al detal para que lo valide. Con las novedades de la quincena que cada gerencia le manda por correo en Excel, arma a mano el consolidado que termina en la nómina: un trabajo que le toma casi una semana por quincena y que la propia responsable describe como propenso a errores, y que señala como lo primero a automatizar. Desde mayo de 2026 hay además un bono grupal por tienda atado a la meta. La comisión por vender Cubitt es mayor que la de Casio, algo que Visual Merchandising señala porque inclina al vendedor hacia una marca.\n\nEn **Panamá** la venta queda registrada con el código de cada vendedor en la caja; el supervisor de tienda calcula el porcentaje y se lo pasa a Recursos Humanos, que lo carga en el sistema de nómina, y la gerencia de RRHH aprueba el pago en el banco. En los kioscos cobran comisión tanto el encargado como el vendedor."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente de Recursos Humanos (Venezuela)",
     "participantes": [
      "Gerente de Recursos Humanos (Venezuela) — baja el reporte de comisiones de Odoo, lo consolida con las novedades y lo carga en la nómina; en Panamá, la gerencia de RRHH aprueba el pago.",
      "Gerente de Ventas al Detal (Venezuela) — valida las comisiones de las tiendas antes del pago; en Panamá, el supervisor de tienda calcula el porcentaje.",
      "Regional Manager Retail — propuso un esquema regional único, en evaluación."
     ],
     "evidencia": [
      "E-21",
      "E-37",
      "E-54",
      "E-05",
      "E-55",
      "E-31",
      "SC-02"
     ],
     "notas": "El consolidado de comisiones y novedades se arma a mano en Excel en cada quincena.",
     "sin_evidencia": "No consta la regla de cálculo de las comisiones de tienda en ningún país ni quién calcula el bono grupal."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "El cierre del mes y el de cada quincena.",
     "cadencia": "Mensual para las comisiones; quincenal para las novedades de nómina.",
     "output": "Comisiones validadas y pagadas con la nómina.",
     "evidencia": [
      "E-21",
      "E-37"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-21",
      "E-37"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Gerente de Recursos Humanos (Venezuela)",
       "texto": "Baja del módulo de comisiones de Odoo el reporte por cargo."
      },
      {
       "id": "a2",
       "rol": "Gerente de Recursos Humanos (Venezuela)",
       "texto": "Manda el reporte de las tiendas a la gerencia de ventas al detal."
      },
      {
       "id": "a3",
       "rol": "Gerente de Ventas al Detal (Venezuela)",
       "texto": "Lo valida o pide corregirlo."
      },
      {
       "id": "a4",
       "rol": "Gerente de Recursos Humanos (Venezuela)",
       "texto": "Si hay observaciones, corrige el reporte."
      },
      {
       "id": "a5",
       "rol": "Gerente de Recursos Humanos (Venezuela)",
       "texto": "Consolida en Excel las comisiones con las novedades de la quincena y lo carga a la nómina."
      }
     ],
     "diagrama": {
      "carriles": [
       "Gerente de Recursos Humanos (Venezuela)",
       "Gerente de Ventas al Detal (Venezuela)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Gerente de Recursos Humanos (Venezuela)",
        "tipo": "inicio",
        "n": "Cierre del mes"
       },
       {
        "id": "n1",
        "carril": "Gerente de Recursos Humanos (Venezuela)",
        "tipo": "tarea",
        "n": "Bajar comisiones por cargo",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n2",
        "carril": "Gerente de Recursos Humanos (Venezuela)",
        "tipo": "tarea",
        "n": "Enviar el reporte de tiendas",
        "sistemas": [
         "Correo"
        ]
       },
       {
        "id": "n3",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "decision",
        "n": "¿Lo valida?"
       },
       {
        "id": "n4",
        "carril": "Gerente de Recursos Humanos (Venezuela)",
        "tipo": "tarea",
        "n": "Corregir el reporte",
        "sistemas": [
         "Excel"
        ]
       },
       {
        "id": "n5",
        "carril": "Gerente de Recursos Humanos (Venezuela)",
        "tipo": "tarea",
        "n": "Consolidar y cargar a nómina",
        "sistemas": [
         "Excel",
         "Odoo"
        ]
       },
       {
        "id": "n6",
        "carril": "Gerente de Recursos Humanos (Venezuela)",
        "tipo": "fin",
        "n": "Comisiones pagadas"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4",
        "etq": "No"
       },
       {
        "de": "n3",
        "a": "n5",
        "etq": "Sí"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       }
      ]
     }
    }
   },
   "9.18": {
    "nota_version": "Versión As-Is: describe cómo se atienden hoy las fallas de infraestructura de las tiendas, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La atención de fallas de infraestructura de las tiendas y la relación con los centros comerciales por temas del local. La remodelación va en 9.9 y el mantenimiento de la sede, en el macro 19.",
     "texto": "En **Venezuela** el mantenimiento de las tiendas **se pide por teléfono** y no deja registro. Lo que es electricidad y alarmas en Caracas lo atiende el único jefe de servicios generales: si tiene el insumo en su depósito, lo cambia; si no, pide autorización de palabra a la gerencia de ventas al detal, que decide la compra y el proveedor, y Administración paga por correo. No hay tickets, ni indicadores, ni respaldo cuando él falta, y el mantenimiento preventivo que se hacía hace años de noche, con la tienda cerrada, se dejó de hacer. Pintura, plomería y obra civil las hace un contratista coordinado por la gerencia de ventas al detal, que a menudo contrata a los mismos técnicos del centro comercial fuera de su horario, porque conocen sus reglas. Con la administración del centro comercial se usa el canal regular; solo cuando no responde se llama al gerente, con quien la relación es personal. El centro comercial inspecciona antes de renovar el contrato y deja observaciones con plazo.\n\nEn **Panamá** todo pasa por el supervisor de tienda: cuotas de mantenimiento, requerimientos del centro comercial —como conectar la alarma contra incendios al sistema del centro—, búsqueda del proveedor y coordinación del pago con Contabilidad. Las urgencias también: una noche una puerta no cerró y fue él quien consiguió un proveedor que trabajó hasta la madrugada. Las cámaras y la red dependen de Sistemas."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente de Ventas al Detal (Venezuela); Supervisor de Tienda (Panamá)",
     "participantes": [
      "Gerente de Tienda — avisa la falla por teléfono.",
      "Jefe de Servicios Generales — atiende electricidad y alarmas de las tiendas de Caracas.",
      "Gerente de Ventas al Detal (Venezuela) — autoriza las compras, elige el proveedor y coordina a los contratistas; en Panamá, el supervisor de tienda.",
      "Técnico de Sistemas (Venezuela) — atiende cámaras, red y equipos."
     ],
     "evidencia": [
      "E-45",
      "E-47",
      "E-53",
      "E-52",
      "E-33",
      "SC-02"
     ],
     "notas": "La atención depende de una persona sin respaldo y de acuerdos de palabra; nada queda registrado.",
     "sin_evidencia": "No consta cuánto se gasta en mantenimiento por tienda ni cuánto tarda en resolverse una falla."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Una falla en la tienda o un requerimiento del centro comercial.",
     "cadencia": "Por evento; sin mantenimiento preventivo.",
     "output": "Falla reparada, sin registro de lo hecho.",
     "evidencia": [
      "E-45"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-45",
      "E-47"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Gerente de Tienda",
       "texto": "Avisa la falla por teléfono."
      },
      {
       "id": "a2",
       "rol": "Jefe de Servicios Generales",
       "texto": "Si es electricidad o alarma en Caracas, busca el insumo en su depósito y, si lo tiene, repara."
      },
      {
       "id": "a3",
       "rol": "Gerente de Ventas al Detal (Venezuela)",
       "texto": "Si no tiene el insumo, autoriza la compra de palabra y define el proveedor."
      },
      {
       "id": "a4",
       "rol": "Jefe de Servicios Generales",
       "texto": "Con el insumo comprado, repara."
      },
      {
       "id": "a5",
       "rol": "Gerente de Ventas al Detal (Venezuela)",
       "texto": "Si es otra falla o una tienda del interior, contrata a un proveedor, a menudo del propio centro comercial."
      }
     ],
     "diagrama": {
      "carriles": [
       "Gerente de Tienda",
       "Jefe de Servicios Generales",
       "Gerente de Ventas al Detal (Venezuela)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Gerente de Tienda",
        "tipo": "inicio",
        "n": "Falla en la tienda"
       },
       {
        "id": "n1",
        "carril": "Gerente de Tienda",
        "tipo": "tarea",
        "n": "Avisar por teléfono"
       },
       {
        "id": "n2",
        "carril": "Jefe de Servicios Generales",
        "tipo": "decision",
        "n": "¿Electricidad o alarma?"
       },
       {
        "id": "n8",
        "carril": "Jefe de Servicios Generales",
        "tipo": "tarea",
        "n": "Buscar el insumo en su depósito"
       },
       {
        "id": "n3",
        "carril": "Jefe de Servicios Generales",
        "tipo": "decision",
        "n": "¿Tiene el insumo?"
       },
       {
        "id": "n4",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "tarea",
        "n": "Autorizar la compra de palabra"
       },
       {
        "id": "n5",
        "carril": "Jefe de Servicios Generales",
        "tipo": "tarea",
        "n": "Reparar"
       },
       {
        "id": "n6",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "tarea",
        "n": "Contratar a un proveedor"
       },
       {
        "id": "n7",
        "carril": "Gerente de Ventas al Detal (Venezuela)",
        "tipo": "fin",
        "n": "Reparado, sin registro"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n8",
        "etq": "Sí"
       },
       {
        "de": "n2",
        "a": "n6",
        "etq": "No"
       },
       {
        "de": "n8",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n5",
        "etq": "Sí"
       },
       {
        "de": "n3",
        "a": "n4",
        "etq": "No"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n7"
       },
       {
        "de": "n6",
        "a": "n7"
       }
      ]
     }
    }
   }
  }
 },
 "10": {
  "procesos": {
   "10.1": {
    "nota_version": "Versión As-Is: describe cómo se fija hoy la meta del canal web y cómo se reparte la pauta digital, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La fijación de la meta anual de venta web, su comunicación y el seguimiento de la inversión en pauta digital. La planificación de las temporadas altas va en 10.15 y la reportería de cierre de mes en 10.16.",
     "texto": "El canal web no tiene un forecast propio. En la junta de socios de enero se fija el foco del año —en 2026, crecer el e-commerce en Estados Unidos y en el resto de los países—, y la meta anual la baja la Gerencia de Ventas Internacional como **la venta del año anterior más un 10 %**. Es una meta **grupal**, del departamento: no se desglosa por canal (web, Cashea, Mercado Libre, WhatsApp, venta corporativa) ni por persona, y en Venezuela se calculó solo sobre Shopify y Cashea, sin contar la venta por WhatsApp ni la corporativa que el equipo sumó después.\n\nLa estrategia se bajó solo al departamento de e-commerce, aunque la ejecutan también logística, mercadeo y sistemas. Hasta septiembre de 2026 la Gerencia de Ventas Internacional seguía el canal país por país, sin una cabeza regional; esa gerencia regional de e-commerce se acaba de crear y está en su primer mes.\n\nLa pauta digital sí tiene seguimiento: la Gerencia de Paid Media regional lleva el presupuesto de inversión y se reúne cada semana con la Gerencia de Ventas Web de Venezuela para ver cuánto se vendió contra cuánto se invirtió. En Estados Unidos el cálculo se hace sobre la venta del año anterior y, desde hace dos meses, con una herramienta de proyección de inventario que dio la agencia de Amazon; quien lo lleva reconoce que hoy se mira «muy por encima»."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente de Ventas Internacional",
     "participantes": [
      "Socios (junta de enero) — fijan el foco del año para el canal online dentro de la planificación anual del grupo.",
      "Gerente de Ventas Internacional — fija la meta anual del canal (año anterior + 10 %) y recibe los resultados de cierre de mes. Hasta la creación de la gerencia regional de e-commerce, supervisaba el canal país por país.",
      "Gerente de Ventas Web (Venezuela) — recibe la meta grupal, registra lo vendido y el presupuesto en un archivo de Lark y hace el seguimiento semanal de la pauta.",
      "Gerente de Paid Media y Performance (regional) — lleva el presupuesto de pauta digital de los países y cruza semanalmente inversión contra venta con cada país.",
      "Responsable de Operación y Administración (Kenex USA, sin cargo formal) — proyecta la compra y la venta de Amazon sobre el año anterior y la herramienta de la agencia."
     ],
     "evidencia": [
      "E-41",
      "E-05",
      "E-08",
      "E-16",
      "E-30",
      "E-24",
      "SC-03",
      "Lark: Manual 03 Reportería y Análisis de Paid Media (regional, borrador jun-2026)"
     ],
     "notas": "La meta no distingue canales ni personas: el área tiene una sola cifra de departamento. La gerencia regional de e-commerce se creó en septiembre de 2026 y todavía no consta cómo cambia la fijación de metas.",
     "sin_evidencia": "No consta que exista un forecast por canal digital ni quién construye el «forecast del mes por país» que el manual de Paid Media usa como insumo. Tampoco consta cómo se fija la meta en Colombia, Panamá o Costa Rica."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "La junta de socios de enero fija el foco del año.",
     "cadencia": "Anual para la meta; seguimiento semanal de la pauta y registro mensual de lo vendido.",
     "output": "Una meta anual grupal del departamento (año anterior + 10 %), sin desglose por canal ni por persona.",
     "evidencia": [
      "E-08",
      "E-41"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-41",
      "E-05",
      "E-08",
      "E-16"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Socios (junta de enero)",
       "texto": "En la junta de enero fijan el foco del año para el canal online (en 2026, crecer en Estados Unidos y en el resto de los países)."
      },
      {
       "id": "a2",
       "rol": "Gerente de Ventas Internacional",
       "texto": "Fija la meta anual del departamento como la venta del año anterior más un 10 %."
      },
      {
       "id": "a3",
       "rol": "Gerente de Ventas Internacional",
       "texto": "La comunica al departamento de e-commerce de cada país; no se baja a logística, mercadeo ni sistemas."
      },
      {
       "id": "a4",
       "rol": "Gerente de Ventas Web (Venezuela)",
       "texto": "Reparte la operación del año sin metas por persona: la meta es del departamento."
      },
      {
       "id": "a5",
       "rol": "Gerente de Paid Media y Performance (regional)",
       "texto": "Asigna el presupuesto de pauta y revisa cada semana con el país lo vendido contra lo invertido."
      },
      {
       "id": "a6",
       "rol": "Gerente de Ventas Web (Venezuela)",
       "texto": "Registra mes a mes en un archivo de Lark lo vendido y el presupuesto usado; el cierre pasa a 10.16."
      }
     ],
     "diagrama": {
      "carriles": [
       "Socios (junta de enero)",
       "Gerente de Ventas Internacional",
       "Gerente de Ventas Web (Venezuela)",
       "Gerente de Paid Media y Performance (regional)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Socios (junta de enero)",
        "tipo": "inicio",
        "n": "Junta de socios de enero"
       },
       {
        "id": "n1",
        "carril": "Socios (junta de enero)",
        "tipo": "tarea",
        "n": "Fijar el foco del año para el canal online"
       },
       {
        "id": "n2",
        "carril": "Gerente de Ventas Internacional",
        "tipo": "tarea",
        "n": "Fijar meta: año anterior + 10 %"
       },
       {
        "id": "n3",
        "carril": "Gerente de Ventas Internacional",
        "tipo": "tarea",
        "n": "Comunicar la meta al departamento de e-commerce"
       },
       {
        "id": "n4",
        "carril": "Gerente de Ventas Web (Venezuela)",
        "tipo": "tarea",
        "n": "Operar con meta grupal, sin metas por persona"
       },
       {
        "id": "n5",
        "carril": "Gerente de Paid Media y Performance (regional)",
        "tipo": "tarea",
        "n": "Asignar pauta y revisar venta contra inversión",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n6",
        "carril": "Gerente de Ventas Web (Venezuela)",
        "tipo": "tarea",
        "n": "Registrar lo vendido y el presupuesto del mes",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n7",
        "carril": "Gerente de Ventas Web (Venezuela)",
        "tipo": "fin",
        "n": "Cierre de mes (pasa a 10.16)"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7"
       }
      ]
     }
    }
   },
   "10.2": {
    "nota_version": "Versión As-Is: describe cómo se entra hoy a un marketplace nuevo y cómo se abre una web propia en un país, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La entrada a un marketplace nuevo (postulación, listings, conexión bancaria y con Shopify, atención al cliente del canal) y la apertura de una web propia en un país nuevo. La operación diaria de cada canal va en 10.3, 10.4 y 10.5.",
     "texto": "Entrar a un canal nuevo no tiene un procedimiento común; lo hace **quien lleva el canal en cada país**. En Estados Unidos lo lleva de principio a fin quien dirige la operación de Kenex USA: postula al marketplace, espera la aceptación, sube uno por uno todos los listings —cada plataforma pide características distintas, «no es que tienes un Excel y lo subes»—, conecta la cuenta bancaria, lo engancha a Shopify, que es donde confluyen las ventas, y activa la atención al cliente propia de ese canal. Hoy son quince marketplaces (Amazon, Walmart, Target, Macy's, Nordstrom, Kohl's, Lowe's, JCPenney, TikTok, Whatnot, QVC y otros). No hay sistema EDI: se evaluó y se descartó por costo, así que cada marketplace que no lo exige se opera desde su propio portal.\n\nEn Venezuela la entrada a Cashea y Mercado Libre la llevó la Gerencia de Ventas Web, que es también quien carga el producto en esas dos plataformas. La entrada al marketplace de Yummy se decidió en la presidencia tras la conversación con la plataforma, aunque el área le veía poco retorno; empieza por Cubitt y después seguirá Casio. En Colombia la coordinación de marketplaces busca de forma continua plataformas nuevas (hoy son nueve además de Mercado Libre), conectadas por un agregador integrado a Odoo. Panamá no opera marketplaces.\n\nAbrir una web propia sí sigue una secuencia repetida: Mercadeo lo pide por un formulario de Lark, Sistemas compra el dominio y crea la tienda dentro de Shopify, y un desarrollador hace el diseño y la carga del catálogo antes de las pruebas y el lanzamiento. Guatemala acaba de abrir la suya, y Honduras y El Salvador están en curso."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Sin dueño único: el responsable del canal en cada país (Kenex USA, Gerencia de Ventas Web en Venezuela, coordinación de marketplaces en Colombia)",
     "participantes": [
      "Responsable de Operación y Administración (Kenex USA, sin cargo formal) — hace toda la entrada a los marketplaces de Estados Unidos, desde la postulación hasta la operación.",
      "Gerente de Ventas Web (Venezuela) — llevó la entrada a Cashea y Mercado Libre y carga el producto en ambos.",
      "Coordinadora de Marketplaces (Colombia) — busca y abre plataformas nuevas para Cubitt.",
      "Presidente — decidió la entrada al marketplace de Yummy en Venezuela.",
      "Mercadeo (país) — pide la apertura de una web propia por el formulario de Lark (antes lo pedía la junta directiva).",
      "Web Master (Sistemas) — compra el dominio, crea la tienda en Shopify y la agrega a la organización.",
      "Desarrollador web / Asistente de E-commerce — hace el diseño, la carga de inventario y la configuración de la tienda nueva."
     ],
     "evidencia": [
      "E-30",
      "E-06 pt.1",
      "E-41",
      "E-16",
      "E-56",
      "E-11",
      "E-07",
      "E-52",
      "E-58",
      "E-22"
     ],
     "notas": "Cada país abre sus canales por su cuenta y no consta un criterio común para decidir la entrada (volumen esperado, costo, capacidad de atenderlo).",
     "sin_evidencia": "No consta cómo se decidió entrar a cada uno de los quince marketplaces de Estados Unidos ni quién lo aprueba; tampoco cómo se entra a un marketplace en Colombia."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Se decide entrar a un marketplace o abrir la web de un país nuevo.",
     "cadencia": "Por evento.",
     "output": "Canal operativo, con listings publicados, cuenta bancaria y Shopify conectados y atención al cliente activa; o tienda web del país lanzada.",
     "evidencia": [
      "E-30",
      "E-52"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-30",
      "E-06 pt.1",
      "E-52",
      "E-41"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Responsable del canal (Kenex USA o Ventas Web)",
       "texto": "Recibe la decisión de abrir un canal y distingue si es un marketplace o una web propia."
      },
      {
       "id": "a2",
       "rol": "Responsable del canal (Kenex USA o Ventas Web)",
       "texto": "Si es un marketplace, postula y espera la aceptación de la plataforma."
      },
      {
       "id": "a3",
       "rol": "Responsable del canal (Kenex USA o Ventas Web)",
       "texto": "Sube los listings de todos los productos con los requisitos propios de esa plataforma."
      },
      {
       "id": "a4",
       "rol": "Responsable del canal (Kenex USA o Ventas Web)",
       "texto": "Conecta la cuenta bancaria y engancha el canal a Shopify."
      },
      {
       "id": "a5",
       "rol": "Responsable del canal (Kenex USA o Ventas Web)",
       "texto": "Activa la atención al cliente del canal y queda operativo."
      },
      {
       "id": "a6",
       "rol": "Mercadeo (país)",
       "texto": "Si es una web propia, pide la apertura por el formulario de Lark."
      },
      {
       "id": "a7",
       "rol": "Web Master (Sistemas)",
       "texto": "Compra el dominio y crea la tienda nueva dentro de Shopify."
      },
      {
       "id": "a8",
       "rol": "Desarrollador web / Asistente de E-commerce",
       "texto": "Hace el diseño, carga el catálogo y el inventario, prueba y lanza la tienda."
      }
     ],
     "diagrama": {
      "carriles": [
       "Responsable del canal (Kenex USA o Ventas Web)",
       "Mercadeo (país)",
       "Web Master (Sistemas)",
       "Desarrollador web / Asistente de E-commerce"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Responsable del canal (Kenex USA o Ventas Web)",
        "tipo": "inicio",
        "n": "Se decide abrir un canal"
       },
       {
        "id": "n1",
        "carril": "Responsable del canal (Kenex USA o Ventas Web)",
        "tipo": "decision",
        "n": "¿Marketplace o web propia?"
       },
       {
        "id": "n2",
        "carril": "Responsable del canal (Kenex USA o Ventas Web)",
        "tipo": "tarea",
        "n": "Postular y esperar aceptación"
       },
       {
        "id": "n3",
        "carril": "Responsable del canal (Kenex USA o Ventas Web)",
        "tipo": "tarea",
        "n": "Subir listings con los requisitos del canal"
       },
       {
        "id": "n4",
        "carril": "Responsable del canal (Kenex USA o Ventas Web)",
        "tipo": "tarea",
        "n": "Conectar cuenta bancaria y Shopify",
        "sistemas": [
         "Shopify"
        ]
       },
       {
        "id": "n5",
        "carril": "Responsable del canal (Kenex USA o Ventas Web)",
        "tipo": "tarea",
        "n": "Activar la atención al cliente del canal"
       },
       {
        "id": "n6",
        "carril": "Responsable del canal (Kenex USA o Ventas Web)",
        "tipo": "fin",
        "n": "Marketplace operativo"
       },
       {
        "id": "n7",
        "carril": "Mercadeo (país)",
        "tipo": "tarea",
        "n": "Pedir la web por formulario",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n8",
        "carril": "Web Master (Sistemas)",
        "tipo": "tarea",
        "n": "Comprar dominio y crear la tienda",
        "sistemas": [
         "Shopify"
        ]
       },
       {
        "id": "n9",
        "carril": "Desarrollador web / Asistente de E-commerce",
        "tipo": "tarea",
        "n": "Diseñar, cargar catálogo y probar",
        "sistemas": [
         "Shopify"
        ]
       },
       {
        "id": "n10",
        "carril": "Desarrollador web / Asistente de E-commerce",
        "tipo": "fin",
        "n": "Web del país lanzada"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2",
        "etq": "Marketplace"
       },
       {
        "de": "n1",
        "a": "n7",
        "etq": "Web propia"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n7",
        "a": "n8"
       },
       {
        "de": "n8",
        "a": "n9"
       },
       {
        "de": "n9",
        "a": "n10"
       }
      ]
     }
    }
   },
   "10.3": {
    "nota_version": "Versión As-Is: describe cómo se mantienen hoy las webs propias en Shopify —producto, precio, promociones y medios de pago—, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La publicación de producto, precio y promociones en las webs propias de Casio y Cubitt por país, y la puesta en marcha de medios de pago y envíos en ellas. El montaje del pedido que entra por la web va en 10.7.",
     "texto": "Todas las webs propias están en **Shopify**, una por marca y por país, y comparten plantilla y contenido: cambia el precio, no la página. Odoo sincroniza la existencia y el precio hacia la web y de la web bajan las órdenes. El producto nace en el Odoo de Panamá, que hace de matriz del catálogo, y un proceso automático lo replica en el de Venezuela; crearlo a mano en Venezuela es posible y ya ha roto códigos.\n\nLa carga en las webs la hace **una sola persona de e-commerce que trabaja en remoto** y atiende, entre otras, las webs de Venezuela y Colombia: sube el producto de forma masiva y activa las promociones que Mercadeo le notifica. El aviso de que algo ya se puede publicar no tiene un circuito: en Venezuela la Gerencia de Ventas Web se entera casi siempre cuando el producto ya está en el almacén, avisa a quien carga las webs y le consulta a Mercadeo si hay un lanzamiento previsto. Mercadeo reconoce que no está claro **quién responde de que un producto que ya está en bodega aparezca activo en la web**. Los banners los produce Mercadeo y se replican en todas las tiendas online de todos los países. En Colombia la cadena es Mercadeo → la administración crea el código en Odoo → quien carga las webs lo enlaza en Shopify.\n\nEn Venezuela la web de Cubitt dejó de ser un catálogo que se cerraba por WhatsApp: desde mediados de 2026 el cliente paga en la propia web (pago móvil, débito inmediato y tarjetas, validados por el banco), con el botón de Cashea y con las guías de MRW y Zoom generadas por la integración. En la web de Casio faltaba migrar esos cambios. En Estados Unidos quien dirige la operación mantiene personalmente inventario, reglas de envío y ajustes de Shopify, y desde agosto una agencia se encarga del diseño."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Asistente de E-commerce (carga de las webs)",
     "participantes": [
      "Asistente de E-commerce (carga de las webs) — carga de forma masiva el producto en todas las webs y activa las promociones que le notifica Mercadeo.",
      "Responsable del canal (país) — en Venezuela, la Gerencia de Ventas Web; en Colombia, la coordinación de mercadeo. Avisa que el producto llegó y pide que se publique.",
      "Gerente de Mercadeo (país) — produce los banners y las campañas, decide si hay lanzamiento y notifica las promociones que deben estar activas.",
      "Web Master (Sistemas, Panamá) — administra Shopify a nivel de sistemas y las integraciones con Odoo, a través de la Gerencia de Sistemas.",
      "Responsable de Operación y Administración (Kenex USA, sin cargo formal) — mantiene inventario, reglas de envío y ajustes de la web de Estados Unidos."
     ],
     "evidencia": [
      "E-01",
      "E-07",
      "E-32",
      "E-16",
      "E-42",
      "E-56",
      "E-04",
      "E-41",
      "E-30",
      "E-52",
      "E-15"
     ],
     "notas": "Quien carga las webs depende de que alguien le avise; ninguna regla dice quién debe hacerlo ni en qué plazo desde que el producto llega.",
     "sin_evidencia": "No consta quién crea el producto en el Odoo de Panamá ni cómo se ajustan los precios de la web cuando cambian en tienda."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Llega un producto nuevo, cambia un precio o Mercadeo lanza una promoción.",
     "cadencia": "Continua; se concentra en la llegada de contenedores y en las fechas promocionales.",
     "output": "Producto publicado y promociones activas en la web; precio y existencia sincronizados desde Odoo.",
     "evidencia": [
      "E-16",
      "E-42"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-16",
      "E-42",
      "E-56",
      "E-07"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Responsable del canal (país)",
       "texto": "Se entera de que el producto llegó —casi siempre cuando ya está en el almacén— y avisa a quien carga las webs."
      },
      {
       "id": "a2",
       "rol": "Responsable del canal (país)",
       "texto": "Le consulta a Mercadeo si hay un lanzamiento o una campaña prevista para ese producto."
      },
      {
       "id": "a3",
       "rol": "Gerente de Mercadeo (país)",
       "texto": "Si hay campaña, indica la fecha y prepara el banner; si no, autoriza publicar."
      },
      {
       "id": "a4",
       "rol": "Asistente de E-commerce (carga de las webs)",
       "texto": "Carga el producto de forma masiva en Shopify; el precio y la existencia llegan sincronizados desde Odoo."
      },
      {
       "id": "a5",
       "rol": "Asistente de E-commerce (carga de las webs)",
       "texto": "Activa en la fecha indicada las promociones y los banners que le notifica Mercadeo."
      }
     ],
     "diagrama": {
      "carriles": [
       "Responsable del canal (país)",
       "Gerente de Mercadeo (país)",
       "Asistente de E-commerce (carga de las webs)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Responsable del canal (país)",
        "tipo": "inicio",
        "n": "Llega un producto nuevo"
       },
       {
        "id": "n1",
        "carril": "Responsable del canal (país)",
        "tipo": "tarea",
        "n": "Avisar para publicar y consultar a Mercadeo",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n2",
        "carril": "Gerente de Mercadeo (país)",
        "tipo": "decision",
        "n": "¿Hay lanzamiento previsto?"
       },
       {
        "id": "n3",
        "carril": "Gerente de Mercadeo (país)",
        "tipo": "tarea",
        "n": "Fijar fecha y preparar banner"
       },
       {
        "id": "n4",
        "carril": "Asistente de E-commerce (carga de las webs)",
        "tipo": "tarea",
        "n": "Cargar el producto en Shopify",
        "sistemas": [
         "Shopify",
         "Odoo"
        ]
       },
       {
        "id": "n5",
        "carril": "Asistente de E-commerce (carga de las webs)",
        "tipo": "tarea",
        "n": "Activar promoción y banner en la fecha",
        "sistemas": [
         "Shopify"
        ]
       },
       {
        "id": "n6",
        "carril": "Asistente de E-commerce (carga de las webs)",
        "tipo": "fin",
        "n": "Producto visible en la web"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3",
        "etq": "Sí"
       },
       {
        "de": "n2",
        "a": "n4",
        "etq": "No"
       },
       {
        "de": "n3",
        "a": "n5"
       },
       {
        "de": "n4",
        "a": "n6"
       },
       {
        "de": "n5",
        "a": "n6"
       }
      ]
     }
    }
   },
   "10.4": {
    "nota_version": "Versión As-Is: describe cómo se operan hoy los marketplaces de Latinoamérica —sobre todo Cashea en Venezuela—, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La recepción y depuración diaria de las órdenes de Cashea, la atención de Mercado Libre y la operación de marketplaces en Colombia. El montaje del pedido en Odoo va en 10.7 y la conciliación de lo que paga Cashea, en 10.8.",
     "texto": "En Venezuela **Cashea es el canal**: alrededor del 80 % de la venta web pasa por ahí —2.900 de las 5.063 órdenes de julio de 2026—, con 120 a 130 órdenes diarias de Cashea en meses normales; en diciembre de 2025 el canal llegó a 350 órdenes al día. La integración hace llegar todas las órdenes a Odoo, pero **también las canceladas y los simples intentos de compra**, y sin los datos completos del cliente (ni teléfono ni correo). Por eso no se puede trabajar desde Odoo: una persona dedicada extrae cada día las ventas del portal de Cashea, las anota en un registro de Excel por marca, las cruza contra lo que llegó a Odoo para quedarse con lo que «realmente es trabajable», elimina lo cancelado, completa a mano los datos del cliente —que además pide Mercadeo para sus campañas— y le escribe al cliente para confirmarle el pedido. Cashea tiene previsto enviar solo lo pagado y con los datos completos a finales de septiembre de 2026; a la fecha de la entrevista seguía llegando todo.\n\nLa presencia en Cashea también se paga: la Gerencia de Ventas Web compra espacios de publicidad en la plataforma y participa en sus promociones (la «cosecha», el 0 % de inicial), que son las que disparan los picos. Las condiciones de pago de Cashea que afectan el ingreso a caja, como la inicial, las decide la presidencia.\n\nMercado Libre vende poco: lo lleva uno de los asesores, que responde cada día las preguntas de preventa de las dos marcas, cuida que la reputación siga en verde y califica las ventas que no se concretan para que no cobren comisión. En Colombia, la coordinación de marketplaces opera nueve plataformas además de Mercado Libre, conectadas por un agregador integrado a Odoo. Panamá no tiene marketplaces."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente de Ventas Web (Venezuela)",
     "participantes": [
      "Gestor(a) de Pedidos Cashea — formalmente Asesor(a) de Ventas Web. Extrae, depura y confirma cada día las órdenes de Cashea y le escribe al cliente. Apareció porque la persona que atendía Cashea no podía responder chats y montar órdenes a la vez.",
      "Asesor(a) de Ventas Web (Mercado Libre) — atiende las preguntas de preventa de Mercado Libre de las dos marcas, cuida la reputación y califica las ventas no concretadas.",
      "Gerente de Ventas Web (Venezuela) — compra la publicidad en Cashea y decide la participación en sus promociones.",
      "Presidente — decide las condiciones de Cashea que afectan la caja, como la inicial.",
      "Coordinadora de Marketplaces (Colombia) — opera los marketplaces de Colombia."
     ],
     "evidencia": [
      "E-41",
      "E-16",
      "E-58",
      "E-56",
      "E-07",
      "E-11",
      "Lark: Procesos Activos (e-commerce, VE)",
      "Lark: descripciones de cargo de la Gerencia de Ventas Web (VE)"
     ],
     "notas": "El registro de Excel existe porque la integración con Cashea trae ruido: la depuración es trabajo manual de una persona a tiempo completo.",
     "sin_evidencia": "No consta cómo se operan en el día a día los marketplaces de Colombia ni quién responde allí las preguntas de preventa."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Entran órdenes nuevas en Cashea o preguntas en Mercado Libre.",
     "cadencia": "Diaria; todo lo aprobado debe quedar procesado al final de la jornada.",
     "output": "Órdenes de Cashea depuradas, con datos completos y confirmadas en Odoo; preguntas de Mercado Libre respondidas.",
     "evidencia": [
      "E-41",
      "Lark: descripciones de cargo de la Gerencia de Ventas Web (VE)"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-41",
      "E-16",
      "Lark: descripciones de cargo de la Gerencia de Ventas Web (VE)",
      "Lark: Procesos Activos (e-commerce, VE)"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Gestor(a) de Pedidos Cashea",
       "texto": "Extrae del portal de Cashea las ventas del día y las anota en el registro de Excel de la marca."
      },
      {
       "id": "a2",
       "rol": "Gestor(a) de Pedidos Cashea",
       "texto": "Las cruza contra las órdenes que la integración dejó en Odoo."
      },
      {
       "id": "a3",
       "rol": "Gestor(a) de Pedidos Cashea",
       "texto": "Elimina de Odoo las órdenes canceladas, rechazadas o con errores."
      },
      {
       "id": "a4",
       "rol": "Gestor(a) de Pedidos Cashea",
       "texto": "En las vigentes, completa a mano los datos del cliente y confirma la orden; el montaje sigue en 10.7."
      },
      {
       "id": "a5",
       "rol": "Gestor(a) de Pedidos Cashea",
       "texto": "Le escribe al cliente por WhatsApp para confirmarle el pedido y el tiempo de despacho."
      },
      {
       "id": "a6",
       "rol": "Asesor(a) de Ventas Web (Mercado Libre)",
       "texto": "En Mercado Libre, responde las preguntas de preventa de las dos marcas."
      },
      {
       "id": "a7",
       "rol": "Asesor(a) de Ventas Web (Mercado Libre)",
       "texto": "Califica las ventas que no se concretaron para que la plataforma no cobre comisión."
      }
     ],
     "diagrama": {
      "carriles": [
       "Gestor(a) de Pedidos Cashea",
       "Asesor(a) de Ventas Web (Mercado Libre)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Gestor(a) de Pedidos Cashea",
        "tipo": "inicio",
        "n": "Entran órdenes o preguntas"
       },
       {
        "id": "n1",
        "carril": "Gestor(a) de Pedidos Cashea",
        "tipo": "decision",
        "n": "¿Qué marketplace?"
       },
       {
        "id": "n2",
        "carril": "Gestor(a) de Pedidos Cashea",
        "tipo": "tarea",
        "n": "Extraer ventas del portal a Excel",
        "sistemas": [
         "Cashea",
         "Excel"
        ]
       },
       {
        "id": "n3",
        "carril": "Gestor(a) de Pedidos Cashea",
        "tipo": "tarea",
        "n": "Cruzar contra lo que llegó a Odoo",
        "sistemas": [
         "Odoo",
         "Excel"
        ]
       },
       {
        "id": "n4",
        "carril": "Gestor(a) de Pedidos Cashea",
        "tipo": "decision",
        "n": "¿Orden vigente?"
       },
       {
        "id": "n5",
        "carril": "Gestor(a) de Pedidos Cashea",
        "tipo": "tarea",
        "n": "Eliminar la orden de Odoo",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n6",
        "carril": "Gestor(a) de Pedidos Cashea",
        "tipo": "fin",
        "n": "Orden descartada"
       },
       {
        "id": "n7",
        "carril": "Gestor(a) de Pedidos Cashea",
        "tipo": "tarea",
        "n": "Completar datos y confirmar la orden",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n8",
        "carril": "Gestor(a) de Pedidos Cashea",
        "tipo": "tarea",
        "n": "Confirmar el pedido al cliente",
        "sistemas": [
         "WhatsApp",
         "Mercately"
        ]
       },
       {
        "id": "n9",
        "carril": "Gestor(a) de Pedidos Cashea",
        "tipo": "fin",
        "n": "Orden lista para montar (10.7)"
       },
       {
        "id": "n10",
        "carril": "Asesor(a) de Ventas Web (Mercado Libre)",
        "tipo": "tarea",
        "n": "Responder preguntas de preventa",
        "sistemas": [
         "Mercado Libre"
        ]
       },
       {
        "id": "n11",
        "carril": "Asesor(a) de Ventas Web (Mercado Libre)",
        "tipo": "tarea",
        "n": "Calificar ventas no concretadas",
        "sistemas": [
         "Mercado Libre"
        ]
       },
       {
        "id": "n12",
        "carril": "Asesor(a) de Ventas Web (Mercado Libre)",
        "tipo": "fin",
        "n": "Tienda al día"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2",
        "etq": "Cashea"
       },
       {
        "de": "n1",
        "a": "n10",
        "etq": "Mercado Libre"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5",
        "etq": "No"
       },
       {
        "de": "n4",
        "a": "n7",
        "etq": "Sí"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n7",
        "a": "n8"
       },
       {
        "de": "n8",
        "a": "n9"
       },
       {
        "de": "n10",
        "a": "n11"
       },
       {
        "de": "n11",
        "a": "n12"
       }
      ]
     }
    }
   },
   "10.5": {
    "nota_version": "Versión As-Is: describe cómo se operan hoy los marketplaces de Estados Unidos, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La operación diaria de los quince marketplaces de Kenex USA, donde solo se vende Cubitt: órdenes, envío de inventario a Amazon, inventario por canal y conciliación de pagos. Las devoluciones van en 10.14 y la atención al cliente, en 10.13.",
     "texto": "Kenex USA funciona con **una sola persona que concentra la operación**, sin cargo formal, a cargo de la operación y la administración. Cada mañana revisa las órdenes del día anterior en todos los marketplaces. Las que entran por Shopify el almacén las ve; las de Amazon y Whatnot no, porque el almacén no tiene acceso a esas plataformas, así que las imprime y se las manda. Después responde el servicio al cliente de Amazon, que lleva personalmente desde hace siete años porque solo esa persona y un socio tienen acceso a la cuenta.\n\nSin sistema EDI, cada marketplace se opera desde su propio portal, con su usuario y sus reglas; en los que no se integran, órdenes y guías se descargan a mano cada día. Amazon se abastece desde el almacén de Miami varias veces por semana, y una agencia contratada hace dos meses lleva la publicidad y avisa cuándo el inventario en Amazon no va a alcanzar. Cuando un producto se agota, lo pone en cero en todos los marketplaces uno por uno. Whatnot, la plataforma de subastas en vivo, suma dos o tres transmisiones por semana, con sus mensajes y sus órdenes.\n\nLa conciliación de los pagos de cada marketplace la hace desde hace dos meses un asistente administrativo remoto; para algunos canales ya tiene acceso y para otros todavía depende de que le pasen los reportes. En la contabilidad, la venta que llega por Shopify se registra **a nombre del cliente final y no del marketplace**, de modo que no se puede saber cuánto vende cada canal. Un pasante está programando etiquetas para corregirlo."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Responsable de Operación y Administración (Kenex USA)",
     "participantes": [
      "Responsable de Operación y Administración (Kenex USA) — sin cargo formal. Revisa las órdenes de todos los marketplaces, imprime las de Amazon y Whatnot, atiende el servicio al cliente de Amazon, mantiene el inventario por canal y pasa los reportes para conciliar.",
      "Personal de almacén (Miami) — dos personas. Imprimen, preparan y despachan las órdenes y arman los envíos de inventario a Amazon.",
      "Asistente administrativo y contable (Kenex USA, remoto) — concilia los pagos de los marketplaces desde hace dos meses.",
      "Director de Compras de Marca Propia (socio) — tiene el otro acceso a la cuenta de Amazon y llevaba la publicidad antes de la agencia.",
      "Agencia de Amazon (externa) — lleva la publicidad y recomienda cuándo reponer el inventario en Amazon."
     ],
     "evidencia": [
      "E-30",
      "E-06 pt.1",
      "E-01"
     ],
     "notas": "Todo el conocimiento de la operación de marketplaces está en una persona, que además señala como delegables la impresión de órdenes y el servicio al cliente de Amazon.",
     "sin_evidencia": "No consta cuánto vende cada marketplace ni si alguien revisa la rentabilidad por canal."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "El inicio de cada jornada, con las órdenes que entraron el día anterior.",
     "cadencia": "Diaria; envíos de inventario a Amazon varias veces por semana; subastas de Whatnot dos o tres veces por semana.",
     "output": "Órdenes enviadas al almacén, Amazon abastecido, inventario al día en cada marketplace y pagos conciliados.",
     "evidencia": [
      "E-30"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-30",
      "E-06 pt.1"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Responsable de Operación y Administración (Kenex USA)",
       "texto": "Al llegar, revisa las órdenes del día anterior en todos los marketplaces."
      },
      {
       "id": "a2",
       "rol": "Responsable de Operación y Administración (Kenex USA)",
       "texto": "Las de Amazon y Whatnot las imprime y se las manda al almacén, que no tiene acceso a esas plataformas."
      },
      {
       "id": "a3",
       "rol": "Personal de almacén (Miami)",
       "texto": "Imprime las órdenes que entran por Shopify, prepara y despacha todas (10.9 y 10.11)."
      },
      {
       "id": "a4",
       "rol": "Responsable de Operación y Administración (Kenex USA)",
       "texto": "Revisa el inventario en Amazon y, si hace falta, pide al almacén un envío."
      },
      {
       "id": "a5",
       "rol": "Personal de almacén (Miami)",
       "texto": "Arma el envío de inventario a Amazon con las cajas tal como llegan de fábrica."
      },
      {
       "id": "a6",
       "rol": "Responsable de Operación y Administración (Kenex USA)",
       "texto": "Pone en cero en todos los marketplaces lo que se agotó."
      },
      {
       "id": "a7",
       "rol": "Asistente administrativo y contable (Kenex USA, remoto)",
       "texto": "Concilia los pagos de cada marketplace; los reportes que no puede descargar se los pasa la responsable de la operación."
      }
     ],
     "diagrama": {
      "carriles": [
       "Responsable de Operación y Administración (Kenex USA)",
       "Personal de almacén (Miami)",
       "Asistente administrativo y contable (Kenex USA, remoto)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Responsable de Operación y Administración (Kenex USA)",
        "tipo": "inicio",
        "n": "Inicio de jornada"
       },
       {
        "id": "n1",
        "carril": "Responsable de Operación y Administración (Kenex USA)",
        "tipo": "tarea",
        "n": "Revisar órdenes de todos los marketplaces"
       },
       {
        "id": "n2",
        "carril": "Responsable de Operación y Administración (Kenex USA)",
        "tipo": "decision",
        "n": "¿Entró por Shopify?"
       },
       {
        "id": "n3",
        "carril": "Responsable de Operación y Administración (Kenex USA)",
        "tipo": "tarea",
        "n": "Imprimir y mandar órdenes al almacén",
        "sistemas": [
         "Amazon",
         "Whatnot"
        ]
       },
       {
        "id": "n4",
        "carril": "Personal de almacén (Miami)",
        "tipo": "tarea",
        "n": "Preparar y despachar las órdenes",
        "sistemas": [
         "Shopify"
        ]
       },
       {
        "id": "n5",
        "carril": "Responsable de Operación y Administración (Kenex USA)",
        "tipo": "decision",
        "n": "¿Falta inventario en Amazon?"
       },
       {
        "id": "n6",
        "carril": "Personal de almacén (Miami)",
        "tipo": "tarea",
        "n": "Armar el envío a Amazon"
       },
       {
        "id": "n7",
        "carril": "Responsable de Operación y Administración (Kenex USA)",
        "tipo": "tarea",
        "n": "Poner en cero lo agotado en cada canal"
       },
       {
        "id": "n8",
        "carril": "Asistente administrativo y contable (Kenex USA, remoto)",
        "tipo": "tarea",
        "n": "Conciliar pagos por marketplace",
        "sistemas": [
         "QuickBooks"
        ]
       },
       {
        "id": "n9",
        "carril": "Asistente administrativo y contable (Kenex USA, remoto)",
        "tipo": "fin",
        "n": "Jornada cerrada"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3",
        "etq": "No"
       },
       {
        "de": "n2",
        "a": "n4",
        "etq": "Sí"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6",
        "etq": "Sí"
       },
       {
        "de": "n5",
        "a": "n7",
        "etq": "No"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8"
       },
       {
        "de": "n8",
        "a": "n9"
       }
      ]
     }
    }
   },
   "10.6": {
    "nota_version": "Versión As-Is: describe cómo se vende hoy por WhatsApp, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La venta que se cierra en el chat: atención del cliente en Mercately, cotización, montaje directo en Odoo o envío del enlace de Cashea, y validación del pago antes de preparar. La atención de posventa va en 10.13 y la conciliación de pagos, en 10.8.",
     "texto": "El e-commerce del grupo nació en Panamá, en la pandemia, por WhatsApp, y la venta por chat sigue siendo un canal propio. En Venezuela todo entra por **Mercately**, el CRM de chats: el cliente elige en una botonera si quiere comprar, soporte o Cashea, y el chat cae al asesor que tiene asignado ese canal. Son unos 6.000 chats al mes en Cubitt y 2.000 en Casio, atendidos por seis asesores dedicados. Los asesores responden con mensajes predefinidos y se apoyan en IA generativa por su cuenta para redactar los difíciles, que a veces le pasan a la gerencia antes de enviarlos.\n\nSi el cliente quiere comprar, **no se le redirige a la web**: o se le envía un enlace de Cashea, o el asesor toma los datos y monta el pedido directamente en Odoo. El pago directo (pago móvil o transferencia) no lo valida el asesor ni Contabilidad: el asesor publica el número de pedido en un grupo de Lark llamado «Confirmaciones» y **la Gerencia de Ventas Web entra al banco**, verifica referencia y monto y deja los datos del pago en el mismo grupo; recién entonces el pedido pasa a preparación. En abril de 2026 se vendió más por WhatsApp que por la web de Cubitt. La venta corporativa también pasa por aquí, siempre de contado: lo que se vende a crédito tiene que ir por el mayor.\n\nEn Panamá el asesor cierra la venta en el chat, pero **el pago lo verifica Contabilidad** antes de que se prepare el pedido, con un flujo de aprobación en Lark. En Colombia la venta por WhatsApp la cierra el equipo de servicio al cliente, que depende de la gerencia de Customer Services de Panamá. Se probó responder chats con IA dentro de Mercately y se frenó: la marca decidió que el cliente latinoamericano quiere hablar con una persona."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente de Ventas Web (Venezuela)",
     "participantes": [
      "Asesor(a) de Ventas Web — atiende el chat, cotiza, envía el enlace de Cashea o monta el pedido en Odoo y lo pasa a preparación una vez validado el pago.",
      "Gerente de Ventas Web (Venezuela) — revisa cada mañana que los chats estén asignados y valida en el banco los pagos directos, también en fin de semana.",
      "Asesor de Ventas Online (Panamá) — cierra la venta en el chat; el pago lo verifica Contabilidad.",
      "Customer Services Manager (Panamá) — supervisa la atención por chat de Panamá y Colombia y la herramienta Mercately.",
      "Community manager de Mercadeo — atiende Instagram y Facebook, que no gestiona el equipo de ventas web."
     ],
     "evidencia": [
      "E-41",
      "E-16",
      "E-02",
      "E-39",
      "E-56",
      "E-58",
      "E-64",
      "Lark: descripciones de cargo de la Gerencia de Ventas Web (VE)"
     ],
     "notas": "En Venezuela la persona que dirige la venta es la misma que valida el cobro; en Panamá y Colombia esa validación está en Contabilidad. La gerencia del área reconoce que esa tarea «debería llevarse en contabilidad».",
     "sin_evidencia": "No consta quién valida en Venezuela los pagos en divisas ni por PayPal: la entrevista menciona a otra persona sin precisar su cargo."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Un cliente escribe por WhatsApp (desde la web, las redes o directamente).",
     "cadencia": "Continua, en horario de atención; la validación de pagos se hace varias veces al día.",
     "output": "Pedido montado en Odoo con el pago validado y enviado a preparación, o cliente redirigido a Cashea.",
     "evidencia": [
      "E-41",
      "E-16"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-41",
      "E-16",
      "Lark: descripciones de cargo de la Gerencia de Ventas Web (VE)"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Asesor(a) de Ventas Web",
       "texto": "Atiende el chat que le asigna Mercately y resuelve la preventa: disponibilidad, precio y forma de pago."
      },
      {
       "id": "a2",
       "rol": "Asesor(a) de Ventas Web",
       "texto": "Si el cliente prefiere Cashea, le envía el enlace; la orden sigue como cualquier orden de Cashea (10.4)."
      },
      {
       "id": "a3",
       "rol": "Asesor(a) de Ventas Web",
       "texto": "Si paga directo, toma los datos y monta el pedido en Odoo."
      },
      {
       "id": "a4",
       "rol": "Asesor(a) de Ventas Web",
       "texto": "Publica el número de pedido en el grupo «Confirmaciones» de Lark."
      },
      {
       "id": "a5",
       "rol": "Gerente de Ventas Web",
       "texto": "Entra al banco y verifica referencia y monto contra el pedido."
      },
      {
       "id": "a6",
       "rol": "Gerente de Ventas Web",
       "texto": "Si el pago no aparece, le pide al asesor que revise la orden con el cliente."
      },
      {
       "id": "a7",
       "rol": "Gerente de Ventas Web",
       "texto": "Si aparece, deja en el grupo la fecha, la referencia y los datos del pago."
      },
      {
       "id": "a8",
       "rol": "Asesor(a) de Ventas Web",
       "texto": "Pasa el pedido a preparación en Odoo."
      }
     ],
     "diagrama": {
      "carriles": [
       "Asesor(a) de Ventas Web",
       "Gerente de Ventas Web"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "inicio",
        "n": "Cliente escribe por WhatsApp"
       },
       {
        "id": "n1",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "tarea",
        "n": "Atender la preventa",
        "sistemas": [
         "Mercately"
        ]
       },
       {
        "id": "n2",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "decision",
        "n": "¿Paga con Cashea?"
       },
       {
        "id": "n3",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "tarea",
        "n": "Enviar enlace de Cashea",
        "sistemas": [
         "Cashea"
        ]
       },
       {
        "id": "n4",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "fin",
        "n": "Orden de Cashea (10.4)"
       },
       {
        "id": "n5",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "tarea",
        "n": "Montar el pedido en Odoo",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n6",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "tarea",
        "n": "Publicar el pedido en «Confirmaciones»",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n7",
        "carril": "Gerente de Ventas Web",
        "tipo": "tarea",
        "n": "Verificar referencia y monto en el banco",
        "sistemas": [
         "Banca en línea"
        ]
       },
       {
        "id": "n8",
        "carril": "Gerente de Ventas Web",
        "tipo": "decision",
        "n": "¿El pago aparece?"
       },
       {
        "id": "n9",
        "carril": "Gerente de Ventas Web",
        "tipo": "tarea",
        "n": "Pedir al asesor que revise la orden",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n10",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "fin",
        "n": "Pedido detenido hasta aclarar"
       },
       {
        "id": "n11",
        "carril": "Gerente de Ventas Web",
        "tipo": "tarea",
        "n": "Registrar los datos del pago",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n12",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "tarea",
        "n": "Pasar el pedido a preparación",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n13",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "fin",
        "n": "Pedido en preparación (10.9)"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3",
        "etq": "Sí"
       },
       {
        "de": "n2",
        "a": "n5",
        "etq": "No"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8"
       },
       {
        "de": "n8",
        "a": "n9",
        "etq": "No"
       },
       {
        "de": "n8",
        "a": "n11",
        "etq": "Sí"
       },
       {
        "de": "n9",
        "a": "n10"
       },
       {
        "de": "n11",
        "a": "n12"
       },
       {
        "de": "n12",
        "a": "n13"
       }
      ]
     }
    }
   },
   "10.7": {
    "nota_version": "Versión As-Is: describe cómo se monta hoy el pedido web en Odoo y cómo llega al almacén, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "El montaje del pedido en Odoo, venga de la web, de Cashea, de WhatsApp o de un cliente que retira, hasta la orden de preparación que llega al almacén. La preparación física va en 10.9.",
     "texto": "En Venezuela todo pedido del canal termina en **Odoo**, que el área usa desde 2026; antes se montaban en el sistema anterior y se imprimían hojas que viajaban al almacén y a la caja, y que se perdían. El pedido de la web llega solo por la integración y lo revisa quien atiende Shopify; el de WhatsApp lo monta a mano el asesor; el de Cashea lo confirma quien depura esas órdenes (10.4). Cada pedido lleva su **origen**, que es lo que permite saber después cuánto vende cada canal.\n\nPara que el almacén se entere hay que darle al pedido la orden de «mandar a preparación» y llenar el campo de instrucciones, que el equipo **homologó sin escribirlo**: «vía Cashea» quiere decir guía de Cashea; «MRW», guía automática; también se indica si va por delivery, si se retira o si el producto va grabado. Con esa orden el pedido aparece en la tableta del almacén web (el WMS). Lo que Odoo no tiene es un panel de despacho: ni el asesor ni la logística pueden ver ahí si el pedido salió, y la dirección del cliente no se carga en los campos de Odoo sino en archivos aparte.\n\nEn Panamá el vendedor ingresa el pedido de Shopify, WhatsApp o venta directa en Odoo una vez que Contabilidad confirma el pago; la lista de empaque se imprime sola en la bodega de Obarrio y el administrador de bodega llena un formulario de control con el almacenista y el vendedor responsables. En Estados Unidos las órdenes de Amazon y Whatnot se imprimen y se entregan al almacén (10.5). Cuando un cliente que compró en la web se presenta en una tienda de Venezuela, la tienda consulta caso por caso con el área de e-commerce si despacha de su propio inventario."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Asesor(a) de Ventas Web",
     "participantes": [
      "Asesor(a) de Ventas Web — revisa el pedido que entra por Shopify o monta el de WhatsApp, indica forma de envío e instrucciones y lo manda a preparación.",
      "Gestor(a) de Pedidos Cashea — confirma en Odoo las órdenes de Cashea ya depuradas y las manda a preparación.",
      "Gerente de Ventas Web (Venezuela) — definió con el equipo las instrucciones homologadas para el almacén.",
      "Vendedor y administrador de bodega (Panamá, bodega de Obarrio) — el vendedor ingresa el pedido; el administrador registra en un formulario quién lo procesa.",
      "Gerente de Ventas al Detal (Venezuela) — su tienda consulta con e-commerce cuando un cliente de la web se presenta a retirar."
     ],
     "evidencia": [
      "E-41",
      "E-16",
      "E-47",
      "E-39",
      "SC-03",
      "Lark: Manual de Procesos Pedidos E-Commerce Bodega Obarrio (PA)",
      "Lark: descripciones de cargo de la Gerencia de Ventas Web (VE)"
     ],
     "notas": "Las instrucciones para el almacén son una convención oral del equipo; no hay un catálogo escrito de qué significa cada rótulo.",
     "sin_evidencia": "No consta cómo se monta el pedido web en Colombia."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Un pedido queda confirmado en cualquier canal: web, Cashea, WhatsApp o retiro.",
     "cadencia": "Continua.",
     "output": "Pedido en Odoo con origen, forma de envío e instrucciones, visible en la tableta del almacén.",
     "evidencia": [
      "E-41",
      "E-16"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-41",
      "E-16",
      "Lark: descripciones de cargo de la Gerencia de Ventas Web (VE)"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Asesor(a) de Ventas Web",
       "texto": "Identifica por qué canal entró el pedido."
      },
      {
       "id": "a2",
       "rol": "Asesor(a) de Ventas Web",
       "texto": "Si viene de la web, lo revisa en Odoo, donde llegó por la integración con Shopify."
      },
      {
       "id": "a3",
       "rol": "Asesor(a) de Ventas Web",
       "texto": "Si viene de WhatsApp, lo monta a mano en Odoo con los datos del cliente."
      },
      {
       "id": "a4",
       "rol": "Asesor(a) de Ventas Web",
       "texto": "Indica el origen, la forma de envío y las instrucciones homologadas para el almacén."
      },
      {
       "id": "a5",
       "rol": "Asesor(a) de Ventas Web",
       "texto": "Le da la orden de «mandar a preparación»."
      },
      {
       "id": "a6",
       "rol": "Gestor(a) de Pedidos Cashea",
       "texto": "Si viene de Cashea, confirma la orden ya depurada, indica la guía de Cashea y la manda a preparación."
      }
     ],
     "diagrama": {
      "carriles": [
       "Asesor(a) de Ventas Web",
       "Gestor(a) de Pedidos Cashea"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "inicio",
        "n": "Pedido confirmado"
       },
       {
        "id": "n1",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "decision",
        "n": "¿Por qué canal entró?"
       },
       {
        "id": "n2",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "tarea",
        "n": "Revisar el pedido web en Odoo",
        "sistemas": [
         "Shopify",
         "Odoo"
        ]
       },
       {
        "id": "n3",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "tarea",
        "n": "Montar el pedido a mano",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n4",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "tarea",
        "n": "Indicar origen, envío e instrucciones",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n5",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "tarea",
        "n": "Mandar a preparación",
        "sistemas": [
         "Odoo",
         "WMS"
        ]
       },
       {
        "id": "n6",
        "carril": "Gestor(a) de Pedidos Cashea",
        "tipo": "tarea",
        "n": "Confirmar la orden e indicar guía Cashea",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n7",
        "carril": "Gestor(a) de Pedidos Cashea",
        "tipo": "tarea",
        "n": "Mandar a preparación",
        "sistemas": [
         "Odoo",
         "WMS"
        ]
       },
       {
        "id": "n8",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "fin",
        "n": "Pedido en la tableta del almacén"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2",
        "etq": "Web"
       },
       {
        "de": "n1",
        "a": "n3",
        "etq": "WhatsApp"
       },
       {
        "de": "n1",
        "a": "n6",
        "etq": "Cashea"
       },
       {
        "de": "n2",
        "a": "n4"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n8"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8"
       }
      ]
     }
    }
   },
   "10.8": {
    "nota_version": "Versión As-Is: describe cómo se validan y concilian hoy los pagos del canal web, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La validación de cada pago antes de preparar el pedido, el cierre diario de caja del canal y la conciliación posterior de bancos, Cashea y marketplaces. La facturación va en 10.10.",
     "texto": "En Venezuela la validación la hace **la Gerencia de Ventas Web**, no Contabilidad. Empezó como solución rápida porque la validación se demoraba: primero la hacía el área de soporte, y cuando se abrió una cuenta bancaria para la web pasó a la Gerencia de Ventas Web, con acceso de solo consulta. Los asesores publican cada pedido en el grupo «Confirmaciones» de Lark y la gerencia lo busca en el banco por referencia y monto, caso por caso, varias veces al día y también el domingo para no llegar al lunes con la cola llena. Desde que la web de Cubitt cobra con validación automática del banco quedan por validar sobre todo las ventas de WhatsApp, que eran 30 o 40 pagos diarios. La propia gerencia del área dice que esa tarea no debería ser suya.\n\nFacturación abre y cierra la caja del canal cada día, hace el arqueo y entrega el cierre a Contabilidad, y cada mes reporta el ingreso de cada orden de la web de Cubitt en los primeros cinco días. La conciliación posterior la hace Contabilidad y Tesorería y va atrasada: **a julio de 2026 se estaban conciliando pagos de abril**, con ocho a diez personas dedicadas. La causa más citada es la **tasa**: lo que se vende el viernes o el sábado se factura el lunes con otra tasa, y el pago ya no cuadra con la factura. **Cashea se concilia a mano** porque deposita las transacciones agrupadas y sin detalle por cliente; su monto y su fecha de abono no son predecibles, y Contabilidad lo registra como ingreso diferido y no como cuenta por cobrar. Los reintegros por devoluciones de Cashea los registra Tesorería en Odoo.\n\nEn Panamá los pagos de la web llegan a Contabilidad, que verifica que sean reales antes de que el vendedor mande a preparar, y las ventas de la web entran por el comercio afiliado de cubitt.com.pa. En Colombia una persona de Contabilidad concilia a tiempo completo las plataformas en Excel, cruzando el reporte de Odoo con el de cada plataforma, que llega cada una en un formato distinto. En Estados Unidos concilia el asistente administrativo remoto (10.5)."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente de Ventas Web (validación, Venezuela); Contabilidad (conciliación)",
     "participantes": [
      "Asesor(a) de Ventas Web — publica cada pedido pagado en el grupo «Confirmaciones».",
      "Gerente de Ventas Web (Venezuela) — valida en el banco referencia y monto de cada pago directo.",
      "Analista de Facturación (Ventas Web) — abre y cierra la caja, hace el arqueo, entrega el cierre a Contabilidad y reporta mensualmente el ingreso de las órdenes de la web de Cubitt.",
      "Contabilidad y Tesorería (Venezuela) — concilia bancos y Cashea; Tesorería registra los reintegros de Cashea. Contabilidad prepara un memorando sobre órdenes de junio sin facturar y duplicadas.",
      "Contabilidad (Panamá) — verifica los pagos de la web antes de la preparación.",
      "Contabilidad (Colombia) — una persona concilia a tiempo completo las plataformas en Excel."
     ],
     "evidencia": [
      "E-41",
      "E-04",
      "E-38",
      "E-15",
      "E-43",
      "E-07",
      "E-39",
      "E-46",
      "E-02",
      "SC-05",
      "Lark: Manual de Procesos de Tesorería (VE)",
      "Lark: Manual Conciliaciones Bancarias Casiolandia (PA)",
      "Lark: Procesos Activos (e-commerce, VE)",
      "Lark: descripciones de cargo de la Gerencia de Ventas Web (VE)"
     ],
     "notas": "En Venezuela un mismo equipo vende, valida el cobro, factura y despacha; en Panamá y Colombia la validación del pago está en Contabilidad. El atraso de la conciliación es de varios meses.",
     "sin_evidencia": "No consta un procedimiento escrito para conciliar Cashea en Venezuela; en Panamá existe un módulo a medida sobre Odoo para esa conciliación, pero no consta que se use en Venezuela."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Un cliente reporta un pago directo; al cierre de cada día, la caja; al cierre de mes, la conciliación.",
     "cadencia": "Validación continua; cierre de caja diario; reporte de ingresos mensual; conciliación mensual, con atraso.",
     "output": "Pedido con el pago validado; cierre de caja entregado a Contabilidad; pagos conciliados meses después.",
     "evidencia": [
      "E-41",
      "E-04",
      "Lark: descripciones de cargo de la Gerencia de Ventas Web (VE)"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-41",
      "E-04",
      "E-07",
      "E-15",
      "Lark: descripciones de cargo de la Gerencia de Ventas Web (VE)",
      "Lark: Procesos Activos (e-commerce, VE)"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Asesor(a) de Ventas Web",
       "texto": "Publica el número de pedido en el grupo «Confirmaciones» de Lark."
      },
      {
       "id": "a2",
       "rol": "Gerente de Ventas Web",
       "texto": "Busca el pago en el banco por referencia y monto."
      },
      {
       "id": "a3",
       "rol": "Gerente de Ventas Web",
       "texto": "Si no aparece, le avisa al asesor para que lo revise con el cliente; el pedido no avanza."
      },
      {
       "id": "a4",
       "rol": "Gerente de Ventas Web",
       "texto": "Si aparece, copia en el grupo la fecha, la referencia y los datos del pago."
      },
      {
       "id": "a5",
       "rol": "Analista de Facturación (Ventas Web)",
       "texto": "Al final del día cierra la caja, hace el arqueo y entrega el cierre a Contabilidad."
      },
      {
       "id": "a6",
       "rol": "Contabilidad y Tesorería (Venezuela)",
       "texto": "Concilia los bancos contra Odoo y Cashea a mano contra su portal, con meses de atraso."
      }
     ],
     "diagrama": {
      "carriles": [
       "Asesor(a) de Ventas Web",
       "Gerente de Ventas Web",
       "Analista de Facturación (Ventas Web)",
       "Contabilidad y Tesorería (Venezuela)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "inicio",
        "n": "Cliente reporta un pago"
       },
       {
        "id": "n1",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "tarea",
        "n": "Publicar el pedido en «Confirmaciones»",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n2",
        "carril": "Gerente de Ventas Web",
        "tipo": "tarea",
        "n": "Buscar el pago en el banco",
        "sistemas": [
         "Banca en línea"
        ]
       },
       {
        "id": "n3",
        "carril": "Gerente de Ventas Web",
        "tipo": "decision",
        "n": "¿Coinciden referencia y monto?"
       },
       {
        "id": "n4",
        "carril": "Gerente de Ventas Web",
        "tipo": "tarea",
        "n": "Avisar al asesor",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n5",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "fin",
        "n": "Pedido detenido"
       },
       {
        "id": "n6",
        "carril": "Gerente de Ventas Web",
        "tipo": "tarea",
        "n": "Copiar los datos del pago en el grupo",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n7",
        "carril": "Analista de Facturación (Ventas Web)",
        "tipo": "tarea",
        "n": "Cerrar caja y entregar el cierre",
        "sistemas": [
         "Odoo",
         "Lark"
        ]
       },
       {
        "id": "n8",
        "carril": "Contabilidad y Tesorería (Venezuela)",
        "tipo": "tarea",
        "n": "Conciliar bancos y Cashea",
        "sistemas": [
         "Odoo",
         "Cashea",
         "Excel"
        ]
       },
       {
        "id": "n9",
        "carril": "Contabilidad y Tesorería (Venezuela)",
        "tipo": "fin",
        "n": "Pagos conciliados, con atraso"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4",
        "etq": "No"
       },
       {
        "de": "n3",
        "a": "n6",
        "etq": "Sí"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8"
       },
       {
        "de": "n8",
        "a": "n9"
       }
      ]
     }
    }
   },
   "10.9": {
    "nota_version": "Versión As-Is: describe cómo se prepara y embala hoy el pedido web, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La preparación física del pedido en el almacén web: sacar el producto, verificarlo, embalarlo, avisar a facturación y cerrar la caja con su factura y su guía. La factura va en 10.10 y la salida, en 10.11.",
     "texto": "En Venezuela el e-commerce tiene **su propio almacén**, separado del principal y funcionando como una tienda más: está en el primer piso, es tan pequeño que el embalaje tuvo que salir a unas mesas del pasillo, y no tiene ubicaciones rotuladas —quien trabaja ahí sabe dónde está cada cosa, quien viene a ayudar no—. Los pedidos aparecen en la tableta del WMS con el canal, el courier, el producto y la cantidad. El almacenista saca el producto, lo escanea para verificar que es el correcto, lo embala e imprime una etiqueta; luego **publica la foto de la etiqueta en un grupo de Lark** para que facturación sepa que ese pedido ya se puede facturar.\n\nLa caja **no se puede cerrar hasta que llega la factura física**, que va dentro del paquete; con cientos de pedidos al día, el almacén queda lleno de cajas abiertas esperando. Los pedidos de Cashea suman un paso: desde mayo de 2026 cada caja se registra en el sistema de Cashea, lleva una guía impresa y se escanea con pistola —un fin de semana fueron casi 800 cajas—. La persona que gestiona Cashea imprime las facturas, busca la guía de cada una y se las lleva al almacén, que junta factura, guía y caja por número de pedido. Si el producto va grabado, el pedido pasa antes por el rotulado.\n\nEn Panamá, en la bodega de Obarrio, la lista de empaque se imprime sola al confirmarse el pedido, el administrador registra en un formulario quién lo procesa, los empleados empacan y escanean cada producto, y el sistema manda un correo de pedido completado al vendedor y a la bodega. El empaque cambia según la entrega: prioritario, courier o retiro en oficina (con la bolsa abierta para que el cliente verifique). En Estados Unidos preparan dos personas en el almacén de Miami."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Supervisor de Operaciones y Logística (Ventas Web, Venezuela)",
     "participantes": [
      "Almacenista (Ventas Web) — formalmente Asistente o Ayudante de Almacén. Saca el producto, lo verifica, lo embala, avisa a facturación y cierra la caja.",
      "Analista de Facturación (Ventas Web) — factura el pedido cuando ve la foto de la etiqueta (10.10).",
      "Gestor(a) de Pedidos Cashea — imprime las facturas y las guías de Cashea y se las lleva al almacén.",
      "Supervisor de Operaciones y Logística (Ventas Web) — supervisa el embalaje, prepara las guías y ayuda a sacar pedidos en los picos.",
      "Administrador y empleados de bodega (Panamá, Obarrio) — controlan y empacan los pedidos web de Panamá."
     ],
     "evidencia": [
      "E-41",
      "E-16",
      "E-04",
      "E-51",
      "Lark: Manual de Procesos Pedidos E-Commerce Bodega Obarrio (PA)",
      "Lark: descripciones de cargo de la Gerencia de Ventas Web (VE)",
      "E-30"
     ],
     "notas": "La factura física obliga a dejar la caja abierta; la facturación digital, en pruebas, busca quitar esa espera (10.10).",
     "sin_evidencia": "No consta cómo se prepara el pedido web en Colombia, donde no hay una bodega aparte para la web."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "El pedido aparece en la tableta del almacén web.",
     "cadencia": "Continua; de 150 a 200 envíos diarios en meses normales, con picos de cientos de cajas por día.",
     "output": "Caja cerrada con su factura, y con su guía cuando corresponde, lista para despacho.",
     "evidencia": [
      "E-41"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-41",
      "E-16",
      "Lark: descripciones de cargo de la Gerencia de Ventas Web (VE)"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Almacenista (Ventas Web)",
       "texto": "Ve el pedido en la tableta, busca el producto y lo saca."
      },
      {
       "id": "a2",
       "rol": "Almacenista (Ventas Web)",
       "texto": "Lo escanea para verificar producto y cantidad, lo embala e imprime la etiqueta."
      },
      {
       "id": "a3",
       "rol": "Almacenista (Ventas Web)",
       "texto": "Publica la foto de la etiqueta en el grupo de Lark y deja la caja abierta."
      },
      {
       "id": "a4",
       "rol": "Analista de Facturación (Ventas Web)",
       "texto": "Factura el pedido y entrega la factura física (10.10)."
      },
      {
       "id": "a5",
       "rol": "Gestor(a) de Pedidos Cashea",
       "texto": "En los pedidos de Cashea, imprime la guía y la junta con su factura por número de pedido."
      },
      {
       "id": "a6",
       "rol": "Almacenista (Ventas Web)",
       "texto": "En Cashea, pega la guía, mete la factura y escanea la caja en el sistema de Cashea."
      },
      {
       "id": "a7",
       "rol": "Almacenista (Ventas Web)",
       "texto": "En los demás, mete la factura y cierra la caja."
      }
     ],
     "diagrama": {
      "carriles": [
       "Almacenista (Ventas Web)",
       "Analista de Facturación (Ventas Web)",
       "Gestor(a) de Pedidos Cashea"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Almacenista (Ventas Web)",
        "tipo": "inicio",
        "n": "Pedido en la tableta"
       },
       {
        "id": "n1",
        "carril": "Almacenista (Ventas Web)",
        "tipo": "tarea",
        "n": "Buscar y sacar el producto",
        "sistemas": [
         "WMS"
        ]
       },
       {
        "id": "n2",
        "carril": "Almacenista (Ventas Web)",
        "tipo": "tarea",
        "n": "Escanear, embalar e imprimir etiqueta",
        "sistemas": [
         "WMS"
        ]
       },
       {
        "id": "n3",
        "carril": "Almacenista (Ventas Web)",
        "tipo": "tarea",
        "n": "Publicar foto de la etiqueta",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n4",
        "carril": "Analista de Facturación (Ventas Web)",
        "tipo": "tarea",
        "n": "Facturar el pedido (10.10)",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n5",
        "carril": "Analista de Facturación (Ventas Web)",
        "tipo": "decision",
        "n": "¿Es de Cashea?"
       },
       {
        "id": "n6",
        "carril": "Gestor(a) de Pedidos Cashea",
        "tipo": "tarea",
        "n": "Imprimir guía y juntarla con la factura",
        "sistemas": [
         "Cashea"
        ]
       },
       {
        "id": "n7",
        "carril": "Almacenista (Ventas Web)",
        "tipo": "tarea",
        "n": "Pegar guía, meter factura y escanear",
        "sistemas": [
         "Cashea"
        ]
       },
       {
        "id": "n8",
        "carril": "Almacenista (Ventas Web)",
        "tipo": "tarea",
        "n": "Meter la factura y cerrar la caja"
       },
       {
        "id": "n9",
        "carril": "Almacenista (Ventas Web)",
        "tipo": "fin",
        "n": "Caja lista para despacho (10.11)"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6",
        "etq": "Sí"
       },
       {
        "de": "n5",
        "a": "n8",
        "etq": "No"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n9"
       },
       {
        "de": "n8",
        "a": "n9"
       }
      ]
     }
    }
   },
   "10.10": {
    "nota_version": "Versión As-Is: describe cómo se factura hoy el pedido web, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La emisión de la factura del pedido web una vez que el almacén avisa que está preparado, y su entrega al almacén para cerrar la caja. La validación del pago va en 10.8 y el despacho, en 10.11.",
     "texto": "En Venezuela factura **una sola persona**, que depende de la Gerencia de Ventas Web y no de Contabilidad. Factura cada orden de la web, Cashea y Mercado Libre, y también las ventas de repuestos del área de soporte, las devoluciones y los cambios; además abre y cierra la caja, maneja el efectivo en divisas y cierra los pedidos en Odoo para que el inventario quede real. Factura cuando ve en el grupo de Lark la foto de la etiqueta del pedido preparado, y antes comprueba que el pago corresponde al pedido. La factura sale **en físico** de la máquina fiscal y va dentro de la caja, así que el ritmo de la facturación marca el del almacén.\n\nLo que se vende en fin de semana se factura el lunes, con la tasa del lunes, y la diferencia entre el pago y la factura queda para la conciliación (10.8). Contabilidad ha señalado además órdenes de junio sin facturar y órdenes duplicadas. La **facturación digital**, que la normativa ya exige a la venta en línea, está en camino a través de un proveedor autorizado: Contabilidad preveía arrancarla el 17 de agosto de 2026 solo para la web, pero en las entrevistas de Sistemas seguía en pruebas y sin resolver cómo numerar las facturas. La gerencia del área advierte que no quita trabajo: la factura se sigue emitiendo a mano, solo que ya no hace falta imprimirla para cerrar la caja.\n\nEn Panamá la facturación de la web la hace Contabilidad, que la centralizó después de perder comprobantes y de entregas sin factura; la factura electrónica se sube a la autoridad fiscal por un proveedor integrado a Odoo, y se imprime en la bodega. En Colombia también factura Contabilidad, y la bodega la recibe automáticamente."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Analista de Facturación (Ventas Web)",
     "participantes": [
      "Analista de Facturación (Ventas Web) — factura cada pedido del canal, procesa devoluciones y cambios, maneja la caja y cierra los pedidos en Odoo.",
      "Almacenista (Ventas Web) — avisa con la foto de la etiqueta y mete la factura en la caja.",
      "Gestor(a) de Pedidos Cashea — recibe las facturas de Cashea para juntarlas con su guía.",
      "Gerente de Contabilidad (Venezuela) — lleva el paso a la facturación digital y el seguimiento de las órdenes sin facturar.",
      "Coordinador de Sistemas (Venezuela) — prueba la facturación digital con el proveedor y el partner de Odoo.",
      "Contabilidad (Panamá y Colombia) — factura la venta web en esos países."
     ],
     "evidencia": [
      "E-41",
      "E-16",
      "E-04",
      "E-38",
      "E-32",
      "E-15",
      "E-44",
      "E-07",
      "SC-03",
      "Lark: descripciones de cargo de la Gerencia de Ventas Web (VE)",
      "Lark: Procesos Activos (e-commerce, VE)"
     ],
     "notas": "La fecha de arranque de la facturación digital que dio Contabilidad (17-ago-2026) no está confirmada por las entrevistas de Sistemas, que la sitúan todavía en pruebas.",
     "sin_evidencia": "No consta si la facturación digital de la web ya está en producción."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "El almacén publica la foto de la etiqueta de un pedido preparado.",
     "cadencia": "Continua en días hábiles; lo del fin de semana, el lunes.",
     "output": "Factura fiscal impresa entregada al almacén para cerrar la caja.",
     "evidencia": [
      "E-41",
      "E-38"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-41",
      "E-16",
      "E-38",
      "Lark: descripciones de cargo de la Gerencia de Ventas Web (VE)"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Almacenista (Ventas Web)",
       "texto": "Publica la foto de la etiqueta del pedido preparado en el grupo de Lark."
      },
      {
       "id": "a2",
       "rol": "Analista de Facturación (Ventas Web)",
       "texto": "Ubica el pedido en Odoo y comprueba que el pago corresponde al pedido."
      },
      {
       "id": "a3",
       "rol": "Analista de Facturación (Ventas Web)",
       "texto": "Si no corresponde, lo retiene y lo consulta con el asesor."
      },
      {
       "id": "a4",
       "rol": "Analista de Facturación (Ventas Web)",
       "texto": "Si corresponde, emite la factura en la máquina fiscal con la tasa del día."
      },
      {
       "id": "a5",
       "rol": "Gestor(a) de Pedidos Cashea",
       "texto": "Si es de Cashea, recibe las facturas e imprime la guía de cada una."
      },
      {
       "id": "a6",
       "rol": "Almacenista (Ventas Web)",
       "texto": "Mete la factura en la caja y la cierra (10.9)."
      }
     ],
     "diagrama": {
      "carriles": [
       "Almacenista (Ventas Web)",
       "Analista de Facturación (Ventas Web)",
       "Gestor(a) de Pedidos Cashea"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Almacenista (Ventas Web)",
        "tipo": "inicio",
        "n": "Pedido preparado"
       },
       {
        "id": "n1",
        "carril": "Almacenista (Ventas Web)",
        "tipo": "tarea",
        "n": "Publicar foto de la etiqueta",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n2",
        "carril": "Analista de Facturación (Ventas Web)",
        "tipo": "tarea",
        "n": "Ubicar el pedido y revisar el pago",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n3",
        "carril": "Analista de Facturación (Ventas Web)",
        "tipo": "decision",
        "n": "¿El pago corresponde?"
       },
       {
        "id": "n4",
        "carril": "Analista de Facturación (Ventas Web)",
        "tipo": "tarea",
        "n": "Retener y consultar al asesor",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n5",
        "carril": "Analista de Facturación (Ventas Web)",
        "tipo": "fin",
        "n": "Pedido sin facturar"
       },
       {
        "id": "n6",
        "carril": "Analista de Facturación (Ventas Web)",
        "tipo": "tarea",
        "n": "Emitir factura con la tasa del día",
        "sistemas": [
         "Odoo",
         "Máquina fiscal"
        ]
       },
       {
        "id": "n7",
        "carril": "Analista de Facturación (Ventas Web)",
        "tipo": "decision",
        "n": "¿Es de Cashea?"
       },
       {
        "id": "n8",
        "carril": "Gestor(a) de Pedidos Cashea",
        "tipo": "tarea",
        "n": "Recibir facturas e imprimir guías",
        "sistemas": [
         "Cashea"
        ]
       },
       {
        "id": "n9",
        "carril": "Almacenista (Ventas Web)",
        "tipo": "tarea",
        "n": "Meter la factura y cerrar la caja"
       },
       {
        "id": "n10",
        "carril": "Almacenista (Ventas Web)",
        "tipo": "fin",
        "n": "Caja cerrada"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4",
        "etq": "No"
       },
       {
        "de": "n3",
        "a": "n6",
        "etq": "Sí"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8",
        "etq": "Sí"
       },
       {
        "de": "n7",
        "a": "n9",
        "etq": "No"
       },
       {
        "de": "n8",
        "a": "n9"
       },
       {
        "de": "n9",
        "a": "n10"
       }
      ]
     }
    }
   },
   "10.11": {
    "nota_version": "Versión As-Is: describe cómo sale hoy el pedido web hacia el cliente, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La salida del pedido web: envío nacional por agencia, delivery en la ciudad y retiro en el punto de operación, más el seguimiento de las guías que no avanzan. La preparación va en 10.9 y los reclamos de posventa, en 10.13.",
     "texto": "En Venezuela hay tres salidas. **Envío nacional**: MRW —con el que van gratis los pedidos de Cashea—, Zoom y Tealca. El área funciona como una agencia más de MRW y de Zoom: registra cada paquete, la agencia lo cuenta y firma el conteo, que es el aval de lo despachado. MRW recoge todos los días y Zoom martes, jueves y viernes, fechas que el equipo eligió para que nada espere todo un fin de semana. Hay que avisar a MRW cuántos paquetes hay (hoy entre 150 y 200 diarios), porque si manda un vehículo pequeño lo que no cabe se queda para el día siguiente. Las guías de la web salen solas por la integración desde agosto de 2026; las de WhatsApp —y las de Cashea cuando falla su envío o el cliente cambia la oficina— se hacen a mano: el vendedor anota número de pedido, nombre, cédula y teléfono en un archivo compartido, y logística arma la guía en la cuenta de la empresa y pega su foto en esa misma fila.\n\n**Delivery** en Caracas: los pedidos se agendan en una hoja compartida y los reparten la flota propia y la de Yummy; el asistente de operaciones agrupa por zona, arma la ruta, imprime la hoja con la dirección —que no se carga en Odoo—, verifica con el motorizado la mercancía contra la factura y recoge su firma. Los motorizados de Cashea están desactivados por falta de espacio. **Retiro**: el cliente o el motorizado de Cashea viene al punto, y alguien del equipo busca el pedido en el almacén y se lo entrega. Cuando una guía no avanza, logística consulta a la agencia; si el paquete se pierde o llega abierto, la empresa asume la pérdida.\n\nEn Panamá uno de los couriers está integrado a Shopify y le manda al cliente la guía y el seguimiento; otro no, y sus guías llegan por WhatsApp a los vendedores para que se las reenvíen al cliente. Hay mensajero para la ciudad y transporte externo para el interior. En Estados Unidos sale por Amazon (FBA) o desde el almacén de Miami."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Supervisor de Operaciones y Logística (Ventas Web)",
     "participantes": [
      "Supervisor de Operaciones y Logística (Ventas Web) — prepara las guías de los envíos nacionales, coordina la recogida con las agencias y supervisa a los motorizados.",
      "Asistente de Operaciones (Ventas Web) — formalmente Asistente de Operaciones; arma las rutas de delivery, valida la mercancía con el motorizado, entrega los retiros y ayuda con las guías.",
      "Asesor(a) de Ventas Web — anota en el archivo compartido los datos de los envíos que no tienen guía automática.",
      "Agencias de envío y flotas de delivery (externas) — recogen, cuentan y firman los paquetes o los reparten."
     ],
     "evidencia": [
      "E-41",
      "E-16",
      "E-04",
      "E-02",
      "E-39",
      "E-65",
      "E-30",
      "Lark: Procesos Activos (e-commerce, VE)",
      "Lark: descripciones de cargo de la Gerencia de Ventas Web (VE)",
      "Lark: Manual de Procesos Pedidos E-Commerce Bodega Obarrio (PA)"
     ],
     "notas": "Ni el asesor ni la logística pueden ver en Odoo si un pedido salió: lo marcan en archivos aparte, que es donde el asesor busca cuando el cliente pregunta.",
     "sin_evidencia": "No consta cómo se reclama a la agencia una pérdida ni si alguna vez se ha recuperado su valor."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Una caja queda cerrada y lista para salir.",
     "cadencia": "Diaria; MRW todos los días y Zoom martes, jueves y viernes.",
     "output": "Paquete entregado a la agencia con el conteo firmado, entregado por el motorizado o retirado por el cliente.",
     "evidencia": [
      "E-41"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-41",
      "Lark: Procesos Activos (e-commerce, VE)",
      "Lark: descripciones de cargo de la Gerencia de Ventas Web (VE)"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Supervisor de Operaciones y Logística (Ventas Web)",
       "texto": "Ve cómo sale el pedido: envío nacional, delivery o retiro."
      },
      {
       "id": "a2",
       "rol": "Asesor(a) de Ventas Web",
       "texto": "Si es un envío sin guía automática, anota los datos del cliente en el archivo compartido."
      },
      {
       "id": "a3",
       "rol": "Supervisor de Operaciones y Logística (Ventas Web)",
       "texto": "Arma la guía en la cuenta de la agencia y pega su foto en el archivo."
      },
      {
       "id": "a4",
       "rol": "Supervisor de Operaciones y Logística (Ventas Web)",
       "texto": "Entrega los paquetes a la recogida de la agencia y se asegura de que firme el conteo."
      },
      {
       "id": "a5",
       "rol": "Asistente de Operaciones (Ventas Web)",
       "texto": "Si es delivery, agrupa por zona, arma la ruta e imprime la hoja con la dirección."
      },
      {
       "id": "a6",
       "rol": "Asistente de Operaciones (Ventas Web)",
       "texto": "Verifica con el motorizado la mercancía contra la factura y recoge su firma."
      },
      {
       "id": "a7",
       "rol": "Asistente de Operaciones (Ventas Web)",
       "texto": "Si es retiro, busca el pedido en el almacén y lo entrega."
      }
     ],
     "diagrama": {
      "carriles": [
       "Supervisor de Operaciones y Logística (Ventas Web)",
       "Asesor(a) de Ventas Web",
       "Asistente de Operaciones (Ventas Web)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Supervisor de Operaciones y Logística (Ventas Web)",
        "tipo": "inicio",
        "n": "Caja lista para salir"
       },
       {
        "id": "n1",
        "carril": "Supervisor de Operaciones y Logística (Ventas Web)",
        "tipo": "decision",
        "n": "¿Cómo sale?"
       },
       {
        "id": "n2",
        "carril": "Supervisor de Operaciones y Logística (Ventas Web)",
        "tipo": "decision",
        "n": "¿Tiene guía automática?"
       },
       {
        "id": "n3",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "tarea",
        "n": "Anotar datos en el archivo compartido",
        "sistemas": [
         "Hoja compartida"
        ]
       },
       {
        "id": "n4",
        "carril": "Supervisor de Operaciones y Logística (Ventas Web)",
        "tipo": "tarea",
        "n": "Armar la guía en la agencia",
        "sistemas": [
         "MRW",
         "Zoom"
        ]
       },
       {
        "id": "n5",
        "carril": "Supervisor de Operaciones y Logística (Ventas Web)",
        "tipo": "tarea",
        "n": "Entregar a la agencia con conteo firmado"
       },
       {
        "id": "n6",
        "carril": "Supervisor de Operaciones y Logística (Ventas Web)",
        "tipo": "fin",
        "n": "Paquete en la agencia"
       },
       {
        "id": "n7",
        "carril": "Asistente de Operaciones (Ventas Web)",
        "tipo": "tarea",
        "n": "Armar ruta e imprimir la dirección",
        "sistemas": [
         "Hoja compartida"
        ]
       },
       {
        "id": "n8",
        "carril": "Asistente de Operaciones (Ventas Web)",
        "tipo": "tarea",
        "n": "Verificar con el motorizado y firmar"
       },
       {
        "id": "n9",
        "carril": "Asistente de Operaciones (Ventas Web)",
        "tipo": "fin",
        "n": "Entregado por delivery"
       },
       {
        "id": "n10",
        "carril": "Asistente de Operaciones (Ventas Web)",
        "tipo": "tarea",
        "n": "Buscar el pedido y entregarlo"
       },
       {
        "id": "n11",
        "carril": "Asistente de Operaciones (Ventas Web)",
        "tipo": "fin",
        "n": "Retirado"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2",
        "etq": "Nacional"
       },
       {
        "de": "n1",
        "a": "n7",
        "etq": "Delivery"
       },
       {
        "de": "n1",
        "a": "n10",
        "etq": "Retiro"
       },
       {
        "de": "n2",
        "a": "n3",
        "etq": "No"
       },
       {
        "de": "n2",
        "a": "n5",
        "etq": "Sí"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n7",
        "a": "n8"
       },
       {
        "de": "n8",
        "a": "n9"
       },
       {
        "de": "n10",
        "a": "n11"
       }
      ]
     }
    }
   },
   "10.12": {
    "nota_version": "Versión As-Is: describe cómo se repone hoy el almacén web y cómo se cuida su inventario, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La reposición del almacén web desde el almacén principal, la recepción de esos traslados, la sincronización del inventario con los canales y los conteos de ajuste. La compra internacional va en el macro 6.",
     "texto": "En Venezuela el almacén principal trata al almacén web **como una tienda más**: le despacha lo que pide los lunes y los miércoles, y lo urgente en el momento. En teoría la reposición la calcula la planificación de compras; en la práctica **la adelanta la Gerencia de Ventas Web**: descarga de Odoo el inventario del almacén principal y el suyo, los cruza, y pide lo que está por acabarse o lo que sabe que va a necesitar en la próxima promoción, para no bajar mercancía en medio de un pico. Desconfía de lo que el sistema muestra arriba —«lo que yo veo menos de 100, para mí es sospechoso»— y a veces pide y no llega porque no estaba. Planificación, por su lado, dice que los pedidos de la web son a veces enormes y que su propia herramienta de cálculo le da resultados raros para ese canal. Cuando llega un contenedor, el lado principal le monta un pedido automático sin que la gerencia sepa antes qué viene. El traslado lo pide el supervisor de operaciones; al llegar, el almacén web **cuenta la mercancía a mano**, sin pistola, y acepta el traslado en Odoo.\n\nEl inventario del almacén web está sincronizado con todos los canales digitales, y ahí está su punto débil: cuando el mayor reserva mercancía en el almacén principal sin sacarla del inventario, sigue apareciendo disponible y **se vende lo que no hay**, que termina en devolución y retrabajo. Para contener los descuadres el almacén web hace al menos un inventario al mes. El gerente del mayor percibe que la mercancía que llega se reparte primero a las tiendas, luego «un poquito» a la web y lo que sobra al mayor.\n\nEn Panamá la web no tiene almacén propio: comparte la bodega de Obarrio con el mayor, la reposición a cuatro meses no distingue canal y, cuando falta algo, se pide prestado a una tienda. En Colombia tampoco hay bodega aparte y el mayor se lleva a veces el inventario del que vive la web. En Estados Unidos el almacén de Miami se repone desde China y, en urgencias, desde Panamá."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente de Ventas Web (Venezuela)",
     "participantes": [
      "Gerente de Ventas Web (Venezuela) — cruza inventarios y arma el sugerido de reposición, anticipándose a las promociones.",
      "Supervisor de Operaciones y Logística (Ventas Web) — pide los traslados, recibe y cuenta la mercancía y acepta el traslado.",
      "Gerente de Almacén (Venezuela) — despacha al almacén web como a una tienda, los lunes y los miércoles.",
      "Coordinadora de Planificación de Compras (Rower, Venezuela) — en teoría calcula la reposición; monta el pedido automático cuando llega un contenedor.",
      "Gerente de Ventas al Mayor (Venezuela) — sus reservas sin facturar dejan disponible mercancía que ya no lo está."
     ],
     "evidencia": [
      "E-16",
      "E-41",
      "E-34",
      "E-40",
      "E-35",
      "E-05",
      "E-53",
      "E-14",
      "E-30",
      "Lark: descripciones de cargo de la Gerencia de Ventas Web (VE)"
     ],
     "notas": "La sincronización hace que el almacén web venda lo que el sistema dice que hay, y el sistema no descuenta las reservas del mayor hasta que se facturan.",
     "sin_evidencia": "No consta un mínimo o un máximo definido por producto para el almacén web."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "La revisión propia del inventario, una promoción próxima o la llegada de un contenedor.",
     "cadencia": "Despachos los lunes y los miércoles; revisión continua; inventario de ajuste al menos una vez al mes.",
     "output": "Mercancía trasladada, contada y aceptada en el almacén web, con el inventario sincronizado en los canales.",
     "evidencia": [
      "E-34",
      "E-16"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-16",
      "E-41",
      "E-34",
      "Lark: descripciones de cargo de la Gerencia de Ventas Web (VE)"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Gerente de Ventas Web (Venezuela)",
       "texto": "Descarga de Odoo el inventario del almacén principal y el de la web y los cruza."
      },
      {
       "id": "a2",
       "rol": "Gerente de Ventas Web (Venezuela)",
       "texto": "Arma el sugerido con lo que está por acabarse y lo que pedirá la próxima promoción."
      },
      {
       "id": "a3",
       "rol": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
       "texto": "Cuando llega un contenedor, monta un pedido automático para la web."
      },
      {
       "id": "a4",
       "rol": "Supervisor de Operaciones y Logística (Ventas Web)",
       "texto": "Pide el traslado al almacén principal."
      },
      {
       "id": "a5",
       "rol": "Gerente de Almacén (Venezuela)",
       "texto": "Lo prepara y lo despacha como a una tienda, los lunes y los miércoles."
      },
      {
       "id": "a6",
       "rol": "Supervisor de Operaciones y Logística (Ventas Web)",
       "texto": "Cuenta a mano lo recibido; lo que no llegó queda pendiente de volver a pedir."
      },
      {
       "id": "a7",
       "rol": "Supervisor de Operaciones y Logística (Ventas Web)",
       "texto": "Acepta el traslado en Odoo y el inventario se sincroniza con los canales."
      }
     ],
     "diagrama": {
      "carriles": [
       "Gerente de Ventas Web (Venezuela)",
       "Coordinadora de Planificación de Compras (Rower, Venezuela)",
       "Supervisor de Operaciones y Logística (Ventas Web)",
       "Gerente de Almacén (Venezuela)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Gerente de Ventas Web (Venezuela)",
        "tipo": "inicio",
        "n": "Hace falta reponer"
       },
       {
        "id": "n1",
        "carril": "Gerente de Ventas Web (Venezuela)",
        "tipo": "decision",
        "n": "¿Llegó un contenedor?"
       },
       {
        "id": "n2",
        "carril": "Coordinadora de Planificación de Compras (Rower, Venezuela)",
        "tipo": "tarea",
        "n": "Montar el pedido automático",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n3",
        "carril": "Gerente de Ventas Web (Venezuela)",
        "tipo": "tarea",
        "n": "Cruzar inventario principal y web",
        "sistemas": [
         "Odoo",
         "Excel"
        ]
       },
       {
        "id": "n4",
        "carril": "Gerente de Ventas Web (Venezuela)",
        "tipo": "tarea",
        "n": "Armar el sugerido de reposición"
       },
       {
        "id": "n5",
        "carril": "Supervisor de Operaciones y Logística (Ventas Web)",
        "tipo": "tarea",
        "n": "Pedir el traslado",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n6",
        "carril": "Gerente de Almacén (Venezuela)",
        "tipo": "tarea",
        "n": "Preparar y despachar como a una tienda",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n7",
        "carril": "Supervisor de Operaciones y Logística (Ventas Web)",
        "tipo": "tarea",
        "n": "Contar a mano lo recibido"
       },
       {
        "id": "n8",
        "carril": "Supervisor de Operaciones y Logística (Ventas Web)",
        "tipo": "decision",
        "n": "¿Llegó lo pedido?"
       },
       {
        "id": "n9",
        "carril": "Supervisor de Operaciones y Logística (Ventas Web)",
        "tipo": "tarea",
        "n": "Dejar el faltante para el próximo pedido"
       },
       {
        "id": "n10",
        "carril": "Supervisor de Operaciones y Logística (Ventas Web)",
        "tipo": "tarea",
        "n": "Aceptar el traslado",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n11",
        "carril": "Supervisor de Operaciones y Logística (Ventas Web)",
        "tipo": "fin",
        "n": "Stock sincronizado en los canales"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2",
        "etq": "Sí"
       },
       {
        "de": "n1",
        "a": "n3",
        "etq": "No"
       },
       {
        "de": "n2",
        "a": "n6"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8"
       },
       {
        "de": "n8",
        "a": "n9",
        "etq": "No"
       },
       {
        "de": "n8",
        "a": "n10",
        "etq": "Sí"
       },
       {
        "de": "n9",
        "a": "n10"
       },
       {
        "de": "n10",
        "a": "n11"
       }
      ]
     }
    }
   },
   "10.13": {
    "nota_version": "Versión As-Is: describe cómo se atiende hoy al cliente digital antes y después de la compra, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La atención por chat de preventa y posventa —estado del pedido, errores de despacho, paquetes demorados— y el paso a soporte técnico de lo que es garantía. La garantía en sí va en el macro 11 y las devoluciones, en 10.14.",
     "texto": "En Venezuela la atención y la venta son **el mismo equipo y el mismo chat**. Cada mañana la gerencia revisa que todos los chats estén asignados y los asesores conectados en Mercately. Buena parte de lo que entra es posventa: con 130 órdenes al día, son 130 clientes que escriben para saber si su pedido salió, aunque Cashea ya les haya confirmado todo. Como Odoo no muestra si un pedido se despachó, el asesor **lo busca por número en varios archivos** —el de Cashea, el de guías, el de delivery—; son segundos por consulta que al día suman fácilmente una hora.\n\nLos casos más comunes son que se envió algo errado o que faltó algo, y que la guía de MRW no avanza; en ese caso logística llama a la agencia. Si el paquete se perdió o llegó abierto, la empresa asume la pérdida: la gerencia lo describe como «una batalla donde siempre perdemos». Si el producto no enciende o tiene un defecto, el asesor **transfiere el chat a soporte** dentro de Mercately y el caso deja de ser del e-commerce. Instagram y Facebook los atiende la community manager de Mercadeo. Los asesores tienen una meta de tiempo de respuesta, pero es grupal: no hay meta por persona.\n\nFuera de Venezuela la atención depende de la gerencia de Customer Services de Panamá, que coordina los agentes de cada país (dos en Colombia, un agente remoto para Estados Unidos) y mide tiempos de respuesta con un tablero propio conectado a Mercately, fuera de las herramientas corporativas. Mercately está en Venezuela y Panamá, y Colombia y Costa Rica tienen las licencias pero no lo usan todavía. En Estados Unidos, además, quien dirige la operación responde personalmente el servicio al cliente de Amazon."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente de Ventas Web (Venezuela); Customer Services Manager (Panamá, para el resto de los países)",
     "participantes": [
      "Asesor(a) de Ventas Web — atiende el chat, busca el estado del pedido en los archivos y transfiere a soporte lo que es garantía.",
      "Supervisor de Operaciones y Logística (Ventas Web) — consulta a la agencia cuando una guía no avanza.",
      "Soporte Web (Servicio Técnico) — recibe en Mercately los chats de producto defectuoso y los lleva como garantía.",
      "Gerente de Ventas Web (Venezuela) — revisa cada mañana la asignación de chats y resuelve los casos que escalan.",
      "Customer Services Manager (Panamá) — dirige la atención de Panamá, Colombia y Estados Unidos y sus métricas.",
      "Community manager de Mercadeo — atiende Instagram y Facebook."
     ],
     "evidencia": [
      "E-41",
      "E-16",
      "E-02",
      "E-58",
      "E-64",
      "E-56",
      "E-30",
      "E-11",
      "Lark: descripciones de cargo de la Gerencia de Ventas Web (VE)"
     ],
     "notas": "La consulta más frecuente —¿salió mi pedido?— no se puede contestar desde el sistema; depende de archivos que se marcan a mano.",
     "sin_evidencia": "No consta cuántas consultas son de preventa y cuántas de posventa, ni cuánto tarda en resolverse un caso."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Un cliente escribe por WhatsApp o por la web.",
     "cadencia": "Continua, en horario de atención.",
     "output": "Consulta respondida, reclamo gestionado con la agencia o caso transferido a soporte técnico.",
     "evidencia": [
      "E-41",
      "E-16"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-41",
      "E-16"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Asesor(a) de Ventas Web",
       "texto": "Recibe el chat en Mercately e identifica el motivo."
      },
      {
       "id": "a2",
       "rol": "Asesor(a) de Ventas Web",
       "texto": "Si es preventa, informa disponibilidad y precio; si el cliente compra, sigue en 10.6."
      },
      {
       "id": "a3",
       "rol": "Asesor(a) de Ventas Web",
       "texto": "Si pregunta por su pedido, lo busca por número en los archivos de Cashea, guías y delivery."
      },
      {
       "id": "a4",
       "rol": "Supervisor de Operaciones y Logística (Ventas Web)",
       "texto": "Si la guía no avanza, consulta a la agencia y le pasa la respuesta al asesor."
      },
      {
       "id": "a5",
       "rol": "Asesor(a) de Ventas Web",
       "texto": "Responde al cliente con el estado del pedido."
      },
      {
       "id": "a6",
       "rol": "Soporte Web (Servicio Técnico)",
       "texto": "Si el producto tiene un defecto, recibe el chat transferido y lo lleva como garantía."
      }
     ],
     "diagrama": {
      "carriles": [
       "Asesor(a) de Ventas Web",
       "Supervisor de Operaciones y Logística (Ventas Web)",
       "Soporte Web (Servicio Técnico)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "inicio",
        "n": "Cliente escribe"
       },
       {
        "id": "n1",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "decision",
        "n": "¿Qué necesita?"
       },
       {
        "id": "n2",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "tarea",
        "n": "Informar disponibilidad y precio",
        "sistemas": [
         "Mercately"
        ]
       },
       {
        "id": "n3",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "fin",
        "n": "Venta por chat (10.6)"
       },
       {
        "id": "n4",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "tarea",
        "n": "Buscar el pedido en los archivos",
        "sistemas": [
         "Hoja compartida",
         "Excel"
        ]
       },
       {
        "id": "n5",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "decision",
        "n": "¿La guía avanza?"
       },
       {
        "id": "n6",
        "carril": "Supervisor de Operaciones y Logística (Ventas Web)",
        "tipo": "tarea",
        "n": "Consultar a la agencia",
        "sistemas": [
         "MRW"
        ]
       },
       {
        "id": "n7",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "tarea",
        "n": "Responder el estado del pedido",
        "sistemas": [
         "Mercately"
        ]
       },
       {
        "id": "n8",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "fin",
        "n": "Consulta cerrada"
       },
       {
        "id": "n9",
        "carril": "Soporte Web (Servicio Técnico)",
        "tipo": "tarea",
        "n": "Atender el caso como garantía",
        "sistemas": [
         "Mercately"
        ]
       },
       {
        "id": "n10",
        "carril": "Soporte Web (Servicio Técnico)",
        "tipo": "fin",
        "n": "Caso en garantía (macro 11)"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2",
        "etq": "Preventa"
       },
       {
        "de": "n1",
        "a": "n4",
        "etq": "Estado del pedido"
       },
       {
        "de": "n1",
        "a": "n9",
        "etq": "Defecto"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6",
        "etq": "No"
       },
       {
        "de": "n5",
        "a": "n7",
        "etq": "Sí"
       },
       {
        "de": "n6",
        "a": "n7"
       },
       {
        "de": "n7",
        "a": "n8"
       },
       {
        "de": "n9",
        "a": "n10"
       }
      ]
     }
    }
   },
   "10.14": {
    "nota_version": "Versión As-Is: describe cómo se gestiona hoy un pedido web que vuelve, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La devolución o el cambio de un pedido web que no es garantía: producto no disponible, cambio de color, error de despacho, y las devoluciones de los marketplaces de Estados Unidos. El producto defectuoso va a soporte técnico (macro 11).",
     "texto": "En Venezuela la devolución no tiene un circuito propio: es un encargo más de las personas del canal. Facturación procesa la devolución o el cambio en Odoo; el supervisor y el asistente de operaciones se aseguran de que el artículo quede en el estante correcto; y si el cliente había pagado con Cashea, Tesorería registra el reintegro en Odoo contra la cuenta donde abona Cashea. Una fuente recurrente de devoluciones es propia: **se vende lo que no hay** porque las reservas del mayor no se descuentan del inventario sincronizado (10.12). Cuando el paquete llega abierto o se pierde en la agencia, la empresa repone y asume la pérdida, y el faltante obliga a volver a contar el almacén.\n\nEn Estados Unidos las devoluciones de Amazon son **miles al mes** y no se registran en ningún sistema: se van apartando, cada cierto tiempo se revisan, lo que se puede vender vuelve al inventario y lo usado o invendible se manda a Panamá para venderlo como usado. Las dos personas del almacén no dan abasto para llevar ese control; hay una idea de rastrear el estado de cada devolución con código de barras en Odoo, sin implementar. En Colombia, devolverle el dinero al cliente cuando el producto comprado no estaba disponible llegaba a tardar hasta 30 días; hoy hay un flujo de aprobación en Lark con un plazo de 48 horas."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Sin dueño formal: lo reparten facturación, operaciones y tesorería (Venezuela)",
     "participantes": [
      "Asesor(a) de Ventas Web — recibe la solicitud del cliente y registra el motivo.",
      "Analista de Facturación (Ventas Web) — procesa la devolución o el cambio en Odoo.",
      "Asistente de Operaciones (Ventas Web) — junto con el supervisor, ubica el artículo devuelto en su estante.",
      "Coordinador(a) de Tesorería (Venezuela) — registra en Odoo los reintegros de las devoluciones pagadas con Cashea.",
      "Responsable de Operación y Administración y personal de almacén (Kenex USA) — apartan, revisan y reenvían las devoluciones de Amazon.",
      "Customer Services Manager (Panamá) — fijó el flujo de aprobación de reembolsos de Colombia."
     ],
     "evidencia": [
      "E-16",
      "E-41",
      "E-06 pt.2",
      "E-30",
      "E-02",
      "Lark: Manual de Procesos de Tesorería (VE)",
      "Lark: descripciones de cargo de la Gerencia de Ventas Web (VE)"
     ],
     "notas": "En Estados Unidos no hay registro de qué se devolvió, en qué condición ni qué se hizo con ello.",
     "sin_evidencia": "No consta cómo se reembolsa en Venezuela un pago que no fue por Cashea, ni si existe un plazo para hacerlo."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Un cliente pide devolver o cambiar un pedido web.",
     "cadencia": "Por evento; en Estados Unidos, revisión periódica de lo apartado.",
     "output": "Artículo reintegrado al inventario y, si aplica, reintegro registrado; o pérdida asumida.",
     "evidencia": [
      "E-16",
      "Lark: descripciones de cargo de la Gerencia de Ventas Web (VE)"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-16",
      "E-41",
      "Lark: Manual de Procesos de Tesorería (VE)",
      "Lark: descripciones de cargo de la Gerencia de Ventas Web (VE)"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Asesor(a) de Ventas Web",
       "texto": "Recibe la solicitud del cliente y registra el motivo."
      },
      {
       "id": "a2",
       "rol": "Asesor(a) de Ventas Web",
       "texto": "Si es un defecto de producto, lo transfiere a soporte técnico (macro 11)."
      },
      {
       "id": "a3",
       "rol": "Analista de Facturación (Ventas Web)",
       "texto": "Si es un cambio o una devolución, la procesa en Odoo."
      },
      {
       "id": "a4",
       "rol": "Asistente de Operaciones (Ventas Web)",
       "texto": "Ubica el artículo devuelto en el estante correcto."
      },
      {
       "id": "a5",
       "rol": "Coordinador(a) de Tesorería (Venezuela)",
       "texto": "Si el cliente pagó con Cashea, registra el reintegro en Odoo."
      }
     ],
     "diagrama": {
      "carriles": [
       "Asesor(a) de Ventas Web",
       "Analista de Facturación (Ventas Web)",
       "Asistente de Operaciones (Ventas Web)",
       "Coordinador(a) de Tesorería (Venezuela)"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "inicio",
        "n": "Cliente pide devolver o cambiar"
       },
       {
        "id": "n1",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "tarea",
        "n": "Registrar el motivo",
        "sistemas": [
         "Mercately"
        ]
       },
       {
        "id": "n2",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "decision",
        "n": "¿Es un defecto?"
       },
       {
        "id": "n3",
        "carril": "Asesor(a) de Ventas Web",
        "tipo": "fin",
        "n": "Pasa a garantía (macro 11)"
       },
       {
        "id": "n4",
        "carril": "Analista de Facturación (Ventas Web)",
        "tipo": "tarea",
        "n": "Procesar la devolución o el cambio",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n5",
        "carril": "Asistente de Operaciones (Ventas Web)",
        "tipo": "tarea",
        "n": "Ubicar el artículo en su estante"
       },
       {
        "id": "n6",
        "carril": "Asistente de Operaciones (Ventas Web)",
        "tipo": "decision",
        "n": "¿Pagó con Cashea?"
       },
       {
        "id": "n7",
        "carril": "Coordinador(a) de Tesorería (Venezuela)",
        "tipo": "tarea",
        "n": "Registrar el reintegro de Cashea",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n8",
        "carril": "Coordinador(a) de Tesorería (Venezuela)",
        "tipo": "fin",
        "n": "Reintegro registrado"
       },
       {
        "id": "n9",
        "carril": "Asistente de Operaciones (Ventas Web)",
        "tipo": "fin",
        "n": "Devolución cerrada"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3",
        "etq": "Sí"
       },
       {
        "de": "n2",
        "a": "n4",
        "etq": "No"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7",
        "etq": "Sí"
       },
       {
        "de": "n6",
        "a": "n9",
        "etq": "No"
       },
       {
        "de": "n7",
        "a": "n8"
       }
      ]
     }
    }
   },
   "10.15": {
    "nota_version": "Versión As-Is: describe cómo se prepara hoy el canal web para las temporadas altas y las promociones grandes, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "La preparación de los picos —noviembre y diciembre, la «cosecha» de marzo y las promociones de Cashea—: elección de la promoción, cálculo del personal adicional y reposición anticipada. La operación durante el pico sigue los procesos 10.4 a 10.11.",
     "texto": "Las promociones se deciden **un mes antes** en una reunión donde entran Mercadeo con la idea de comunicación, la Gerencia de Operaciones y Logística y la Coordinación de Planificación con lo que el inventario permite —desde 2026 la promoción se hace sobre lo que tiene inventario y no rota, no sobre todo el catálogo—, más la gerencia regional de tiendas, la de ventas al detal y, últimamente, la del mayor. Lo que sale de ahí lo aprueba o lo ajusta el Director Comercial y de Compras. Las condiciones de Cashea que afectan la caja las decide la presidencia.\n\nEl cálculo de la capacidad es **iniciativa de la Gerencia de Ventas Web**, sin un método de la empresa. Para su primera temporada alta cronometró cuánto tarda cada persona, tomó las ventas por canal y los chats asignados de los tres meses previos, un estándar de 7 a 10 minutos por chat y el crecimiento esperado (+33 % en noviembre y más del doble en diciembre), y con ayuda de IA generativa calculó que necesitaba cinco personas más para los chats. Contaba con que el almacén principal le prestaría gente en las noches y no ocurrió; la presidencia aprobó las cinco contrataciones y el almacén lo cubrieron las dos personas de logística. Repitió el cálculo para la cosecha de marzo (tres personas, 5.000 órdenes en el mes), y esas tres personas se quedaron después para vender por WhatsApp. Antes de cada promoción se adelanta la reposición para no bajar mercancía en pleno pico (10.12).\n\nPara el diciembre de 2026 prevé entre 7.000 y 8.000 órdenes y unas siete personas para los chats, además de refuerzos en el almacén; la limitante es el espacio, y la remodelación seguía sin aprobarse. Recursos Humanos ya tuvo que incorporar personal de urgencia para una activación de Cashea. En Estados Unidos la preparación del último trimestre se apoya en la herramienta de proyección de la agencia de Amazon."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Gerente de Ventas Web (Venezuela)",
     "participantes": [
      "Comité de promociones — Mercadeo, Gerencia de Operaciones y Logística, Coordinación de Planificación de Compras y gerencias de tiendas, detal y mayor. Propone la promoción según lo que el inventario permite.",
      "Director Comercial y de Compras (socio) — aprueba o ajusta la promoción propuesta.",
      "Gerente de Ventas Web (Venezuela) — calcula órdenes, chats y personal adicional, pide las contrataciones y adelanta la reposición.",
      "Presidente — aprueba el personal temporal y las condiciones de Cashea que afectan la caja.",
      "Gerencia de Recursos Humanos (Venezuela) — incorpora el personal adicional, a veces con muy poco margen."
     ],
     "evidencia": [
      "E-16",
      "E-41",
      "E-37",
      "E-30"
     ],
     "notas": "El dimensionamiento lo hace la gerencia del área por su cuenta; no hay un procedimiento de la empresa para preparar un pico ni un responsable de coordinar almacén, chats y reposición.",
     "sin_evidencia": "No consta cómo se preparan los picos en Panamá o en Colombia."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "Se acerca una temporada alta o una promoción grande de Cashea.",
     "cadencia": "Varias veces al año; la promoción se decide un mes antes.",
     "output": "Promoción aprobada, personal adicional incorporado y almacén repuesto antes del pico.",
     "evidencia": [
      "E-16"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-16",
      "E-41"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Comité de promociones",
       "texto": "Un mes antes propone la promoción y los productos según el inventario disponible y lo que no rota."
      },
      {
       "id": "a2",
       "rol": "Director Comercial y de Compras (socio)",
       "texto": "Aprueba la promoción o la ajusta."
      },
      {
       "id": "a3",
       "rol": "Gerente de Ventas Web",
       "texto": "Estima órdenes y chats con el histórico de tres meses, el tiempo por chat y el crecimiento esperado, apoyándose en IA."
      },
      {
       "id": "a4",
       "rol": "Gerente de Ventas Web",
       "texto": "Calcula el personal adicional y lo solicita."
      },
      {
       "id": "a5",
       "rol": "Presidente",
       "texto": "Aprueba o no las contrataciones temporales."
      },
      {
       "id": "a6",
       "rol": "Gerente de Ventas Web",
       "texto": "Si no se aprueban, cuenta con el personal de logística y con el apoyo del almacén principal, que no siempre llega."
      },
      {
       "id": "a7",
       "rol": "Gerente de Ventas Web",
       "texto": "Adelanta la reposición del almacén web antes del arranque (10.12)."
      }
     ],
     "diagrama": {
      "carriles": [
       "Comité de promociones",
       "Director Comercial y de Compras (socio)",
       "Gerente de Ventas Web",
       "Presidente"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Comité de promociones",
        "tipo": "inicio",
        "n": "Se acerca un pico"
       },
       {
        "id": "n1",
        "carril": "Comité de promociones",
        "tipo": "tarea",
        "n": "Proponer promoción según inventario"
       },
       {
        "id": "n2",
        "carril": "Director Comercial y de Compras (socio)",
        "tipo": "tarea",
        "n": "Aprobar o ajustar la promoción"
       },
       {
        "id": "n3",
        "carril": "Gerente de Ventas Web",
        "tipo": "tarea",
        "n": "Estimar órdenes y chats con IA",
        "sistemas": [
         "Gemini",
         "Excel"
        ]
       },
       {
        "id": "n4",
        "carril": "Gerente de Ventas Web",
        "tipo": "tarea",
        "n": "Calcular y pedir personal adicional"
       },
       {
        "id": "n5",
        "carril": "Presidente",
        "tipo": "decision",
        "n": "¿Aprueba el personal?"
       },
       {
        "id": "n6",
        "carril": "Gerente de Ventas Web",
        "tipo": "tarea",
        "n": "Incorporar los temporales"
       },
       {
        "id": "n7",
        "carril": "Gerente de Ventas Web",
        "tipo": "tarea",
        "n": "Cubrir con logística y apoyo del almacén"
       },
       {
        "id": "n8",
        "carril": "Gerente de Ventas Web",
        "tipo": "tarea",
        "n": "Adelantar la reposición (10.12)",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n9",
        "carril": "Gerente de Ventas Web",
        "tipo": "fin",
        "n": "Canal listo para el pico"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6",
        "etq": "Sí"
       },
       {
        "de": "n5",
        "a": "n7",
        "etq": "No"
       },
       {
        "de": "n6",
        "a": "n8"
       },
       {
        "de": "n7",
        "a": "n8"
       },
       {
        "de": "n8",
        "a": "n9"
       }
      ]
     }
    }
   },
   "10.16": {
    "nota_version": "Versión As-Is: describe qué reportería tiene hoy el canal web, con los cargos actuales. Sin matriz de riesgos ni indicadores.",
    "proposito": {
     "estado": "borrador",
     "alcance": "Los reportes que existen sobre la venta web al cierre de cada mes, quién los arma y a quién llegan. La fijación de la meta va en 10.1.",
     "texto": "El canal web **no tiene una entrega formal de resultados**. En Venezuela la Gerencia de Ventas Web descarga de Odoo un reporte de ventas por origen —que pidió a Sistemas— y al cerrar el mes se lo muestra de manera informal a la Gerencia de Ventas Internacional; además anota mes a mes en un archivo de Lark lo vendido y el presupuesto usado, abierto a quien quiera verlo. Nadie más sabe, por ejemplo, cuántos deliveries o envíos salieron en el mes: «saben que vendemos full», resume la gerencia, pero no mucho más. Es un reporte por iniciativa propia; la empresa no lo pide.\n\nOtros reportes tocan el canal por los lados. La analista de datos e informes arma cada mes, desde Odoo y Power BI, el reporte de ventas para Mercadeo y la junta, con la venta por internet separada de la de tiendas. Paid Media consolida al cierre de cada mes, del 1 al 5, una base en Lark con la inversión y la venta web por país —retorno de la inversión, costo por cliente, conversión—, según su manual en borrador. En Colombia el Country Manager presenta cada martes a la junta un Excel con la venta por canal, online incluida, y Mercadeo reparte sus reportes por correo. En Estados Unidos hay una reunión mensual con la presidencia y la dirección de finanzas con los números sacados de QuickBooks, donde no se distingue la venta de cada marketplace (10.5).\n\nHay además tableros hechos por iniciativa individual —el de Paid Media, que une Shopify con la pauta; uno personal con pestaña de e-commerce sobre el Odoo de los cuatro países; el de Customer Services sobre la atención—, que no forman parte de la reportería oficial. De este último, su responsable dice que se muestra a la junta «y tampoco lo ven»."
    },
    "dueno": {
     "estado": "borrador",
     "dueno": "Sin dueño formal; en Venezuela, por iniciativa propia, la Gerente de Ventas Web",
     "participantes": [
      "Gerente de Ventas Web (Venezuela) — descarga el reporte por origen, lo registra en Lark y lo muestra al cierre de mes.",
      "Gerente de Ventas Internacional — recibe el cierre de mes del canal, de manera informal.",
      "Analista de Datos e Informes — arma el reporte mensual de ventas con la venta por internet separada, para Mercadeo y la junta.",
      "Gerente de Paid Media y Performance (regional) — consolida cada mes la inversión y la venta web por país en la base de Lark.",
      "Country Manager (Colombia) — presenta cada semana a la junta la venta por canal.",
      "Responsable de Operación y Administración (Kenex USA) — responde en la reunión mensual por los números de Estados Unidos."
     ],
     "evidencia": [
      "E-41",
      "E-10",
      "E-11",
      "E-56",
      "E-30",
      "E-06 pt.1",
      "E-58",
      "E-22",
      "SC-08",
      "Lark: Manual 03 Reportería y Análisis de Paid Media (regional, borrador jun-2026)"
     ],
     "notas": "Hay varias piezas sueltas, cada una con su fuente y su destinatario, y ninguna reúne operación, venta e inversión del canal en un mismo lugar.",
     "sin_evidencia": "No consta ningún indicador operativo del canal que se reporte con regularidad: tiempos de despacho, pedidos con error, devoluciones o tiempos de respuesta."
    },
    "disparador": {
     "estado": "borrador",
     "disparador": "El cierre de cada mes.",
     "cadencia": "Mensual; semanal en Colombia.",
     "output": "Reporte por origen mostrado de manera informal; reporte mensual de ventas con la venta por internet; base de Paid Media; presentaciones de Colombia y Estados Unidos.",
     "evidencia": [
      "E-41",
      "E-10",
      "Lark: Manual 03 Reportería y Análisis de Paid Media (regional, borrador jun-2026)"
     ]
    },
    "flujo": {
     "estado": "borrador",
     "evidencia": [
      "E-41",
      "E-10",
      "Lark: Manual 03 Reportería y Análisis de Paid Media (regional, borrador jun-2026)"
     ],
     "actividades": [
      {
       "id": "a1",
       "rol": "Analista de Datos e Informes",
       "texto": "Arma el reporte mensual de ventas con la venta por internet separada y lo envía a Mercadeo y a la junta."
      },
      {
       "id": "a2",
       "rol": "Gerente de Paid Media y Performance (regional)",
       "texto": "Consolida del 1 al 5 la inversión y la venta web del mes por país en la base de Lark."
      },
      {
       "id": "a3",
       "rol": "Gerente de Ventas Web (Venezuela)",
       "texto": "Descarga de Odoo el reporte de ventas por origen."
      },
      {
       "id": "a4",
       "rol": "Gerente de Ventas Web (Venezuela)",
       "texto": "Lo anota en su archivo de Lark junto con el presupuesto usado."
      },
      {
       "id": "a5",
       "rol": "Gerente de Ventas Web (Venezuela)",
       "texto": "Se lo muestra de manera informal a la Gerencia de Ventas Internacional."
      },
      {
       "id": "a6",
       "rol": "Gerente de Ventas Internacional",
       "texto": "Lo recibe sin que exista una entrega formal de resultados del canal."
      }
     ],
     "diagrama": {
      "carriles": [
       "Analista de Datos e Informes",
       "Gerente de Paid Media y Performance (regional)",
       "Gerente de Ventas Web (Venezuela)",
       "Gerente de Ventas Internacional"
      ],
      "nodos": [
       {
        "id": "n0",
        "carril": "Analista de Datos e Informes",
        "tipo": "inicio",
        "n": "Cierre de mes"
       },
       {
        "id": "n1",
        "carril": "Analista de Datos e Informes",
        "tipo": "tarea",
        "n": "Armar reporte de ventas con la venta web",
        "sistemas": [
         "Odoo",
         "Power BI"
        ]
       },
       {
        "id": "n2",
        "carril": "Gerente de Paid Media y Performance (regional)",
        "tipo": "tarea",
        "n": "Consolidar inversión y venta web",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n3",
        "carril": "Gerente de Ventas Web (Venezuela)",
        "tipo": "tarea",
        "n": "Descargar el reporte por origen",
        "sistemas": [
         "Odoo"
        ]
       },
       {
        "id": "n4",
        "carril": "Gerente de Ventas Web (Venezuela)",
        "tipo": "tarea",
        "n": "Anotar venta y presupuesto",
        "sistemas": [
         "Lark"
        ]
       },
       {
        "id": "n5",
        "carril": "Gerente de Ventas Web (Venezuela)",
        "tipo": "tarea",
        "n": "Mostrarlo de manera informal"
       },
       {
        "id": "n6",
        "carril": "Gerente de Ventas Internacional",
        "tipo": "tarea",
        "n": "Recibir el cierre del canal"
       },
       {
        "id": "n7",
        "carril": "Gerente de Ventas Internacional",
        "tipo": "fin",
        "n": "Sin entrega formal de resultados"
       }
      ],
      "aristas": [
       {
        "de": "n0",
        "a": "n1"
       },
       {
        "de": "n1",
        "a": "n2"
       },
       {
        "de": "n2",
        "a": "n3"
       },
       {
        "de": "n3",
        "a": "n4"
       },
       {
        "de": "n4",
        "a": "n5"
       },
       {
        "de": "n5",
        "a": "n6"
       },
       {
        "de": "n6",
        "a": "n7"
       }
      ]
     }
    }
   }
  }
 }
};
