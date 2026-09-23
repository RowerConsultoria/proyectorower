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
   }

  }
 }
};
