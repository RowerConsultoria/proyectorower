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
 }
};
