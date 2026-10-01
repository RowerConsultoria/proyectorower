// Fuente única del módulo «Circuito del negocio» del manual de Fase 2 (#/circuito).
// El flujo de cómo opera Kenex HOY (As-Is), de la idea de producto al cobro,
// dibujado como un circuito con carriles que se abren y se vuelven a unir.
//
// Origen: lectura completa de las 87 entrevistas de la tabla `entrevistas` de
// Supabase (27-sep-2026), en 12 lotes con un esquema común de 19 tramos, y una
// segunda pasada el 30-sep-2026 tras la revisión de Gabriel y Jesús. Los
// extractos e informes, con cada afirmación citada, viven FUERA del repo en
// `Rower/analisis-circuito-27sep/` (material interno del equipo).
//
// ⚠️ Este archivo es GENERADO por `Rower/analisis-circuito-27sep/mejoras-30sep/
// construir-circuito.py`, que parte de la copia del 27-sep. Si se edita a mano,
// hay que llevar el mismo cambio al generador o se perderá al volver a correrlo.
//
// ⚠️ Esto es cliente-facing (lo lee el rol Junta). Reglas del proyecto:
// hallazgos despersonalizados (el trombo nombra el rol, nunca a la persona),
// nada de pagos entre países ni sensibilidades fiscales, citas ≤15 palabras,
// la formalización como habilitación. Los nombres solo aparecen como dato
// descriptivo en `gente` y `personas` («rol · nombre»: quién opera la estación).
//
// Numeración (30-sep): en la venta, el número es la ETAPA y vale lo mismo en los
// cuatro carriles: 8 pedido y liberación · 9 despacho · 10 llegada; solo tiendas
// sigue con 11 venta y 12 caja. La vía principal va de 13 (cobro) a 17 (sell-out).
// `alias` lleva los ids viejos que ya no existen a su estación nueva.
//
// ⚠️ Cada trombo lleva su código fijo en `id` («8c.1»). La arquitectura de IA los
// cita por ese código: no se renumeran ni se reutilizan. Un trombo nuevo toma el
// siguiente número libre de su estación.
//
// `trasp` cuenta los traspasos de información de la estación (oficial, de ellos
// `lim` en chat o calendario de Lark; externa, de ellos `sc` sin conexión;
// informal) y `ver` es el veredicto. `sistemasColor` clasifica cada herramienta.
//
// Editar el circuito = editar el generador. `circuito-render.js` lo pinta.
window.CIRCUITO = {
  meta: {corte:"30-sep-2026",entrevistas:87},

  carriles: {
    main: "Vía principal", cub: "Carril Cubitt", cas: "Carril Casio",
    may: "Carril Mayor", pai: "Carril Países y socios", tie: "Carril Tiendas", web: "Carril Web",
    loop: "Bucle de retorno", acc: "Vía de acceso", exit: "Salida de la vía"
  },
  grupos: ["Compra", "Hub Panamá", "Venta por canal", "Dinero", "Bucles y accesos"],
  alias: {11:"13",12:"14"},

  // Herramienta → ofi (Odoo, Lark, EBS) · lim (chat o calendario de Lark) · ext (externa
  // conectada) · sc (externa sin conexión) · inf (informal). Se busca por el nombre base,
  // sin el paréntesis.
  sistemasColor: {
    "App WMS": "ofi", "EBS": "ofi", "Flujo de Lark": "ofi", "Lark": "ofi", "Odoo": "ofi",
    "Odoo POS": "ofi", "Odoo ×3": "ofi", "PDT": "ofi", "tablet": "ofi", "WMS": "ofi",
    "WMS propio": "ofi", "Calendario de Lark": "lim", "Chat de Lark": "lim", "chat de Lark": "lim", "API de Odoo": "ext",
    "BI": "ext", "BPOS": "ext", "Cashea": "ext", "Fabric": "ext", "Follow Up": "ext",
    "Impresora fiscal": "ext", "MercadoLibre": "ext", "Microsoft Fabric": "ext", "MRW / Zoom": "ext", "Pasarela de pago": "ext",
    "Power BI": "ext", "Shopify": "ext", "Banca": "sc", "banca": "sc", "Banca en línea": "sc",
    "courier": "sc", "Mercately": "sc", "NAF": "sc", "PCGraph": "sc", "Portal B2B propio": "sc",
    "Portal de Cashea": "sc", "portal de Cashea": "sc", "Portal DMC": "sc", "Portal SENIAT": "sc", "Portales de aduana y permisos": "sc",
    "Portales de marketplaces": "sc", "QuickBooks": "sc", "Sellerboard": "sc", "Syscore": "sc", "Archivo compartido de guías": "inf",
    "Chat de grupo": "inf", "Claude": "inf", "Claude en Excel": "inf", "Correo": "inf", "correo": "inf",
    "De palabra": "inf", "de palabra": "inf", "Drive": "inf", "Dropbox": "inf", "Excel": "inf",
    "Excel / Drive": "inf", "Llamada": "inf", "llamada": "inf", "Papel": "inf", "papel": "inf",
    "Reunión": "inf", "Teléfono": "inf", "teléfono": "inf", "Teléfono / WhatsApp": "inf", "Teléfono/WhatsApp del vendedor": "inf",
    "WeChat": "inf", "WhatsApp": "inf"
  },

  // Geometría del dibujo.
  via: {
    viewBox: "86 10 1250 960",
    roads: [
      "M120,610 L120,200 Q120,150 170,150 L300,150",
      "M300,150 C340,150 340,90 380,90 L880,90 C920,90 920,150 960,150",
      "M300,150 C340,150 340,210 380,210 L880,210 C920,210 920,150 960,150",
      "M960,150 L1250,150 Q1300,150 1300,200 L1300,470",
      "M1300,470 C1300,540 1270,560 1200,560 L520,560 C460,560 450,690 400,690",
      "M1300,470 C1300,610 1270,640 1200,640 L520,640 C470,640 455,690 400,690",
      "M1300,470 C1300,690 1270,720 1200,720 L520,720 C470,720 455,690 400,690",
      "M1300,470 C1300,770 1270,800 1200,800 L520,800 C460,800 450,690 400,690",
      "M400,690 L200,690 Q120,690 120,610"
    ],
    pits: [
      "M680,548 C680,470 690,410 740,410 L1100,410 C1190,410 1250,425 1292,440",
      "M870,90 C900,90 905,36 945,36 L990,36",
      "M1334,860 L1270,860 C1235,860 1230,800 1200,800"
    ],
    info: [
      {d:"M131,268 C160,300 240,308 286,306"},
      {d:"M314,300 C344,292 354,248 358,224",arrow:true},
      {d:"M716,396 C710,340 700,300 700,250 L700,106",arrow:true}
    ],
    pintado: [["CUBITT", 525, 90], ["CASIO", 525, 210], ["MAYOR", 1255, 560], ["PAÍSES", 1255, 640], ["TIENDAS", 1255, 720], ["WEB", 1255, 800]],
    notas: [
      ["se abre por marca", 286, 184, "end"],
      ["se unen al llegar a Colón", 972, 190, "start"],
      ["se abre por canal", 1280, 488, "end"],
      ["se unen en el cobro", 395, 652, "end"],
      ["retorno de garantías y devoluciones", 925, 398, "middle"],
      ["fallas a fábrica", 690, 326, "end"]
    ],
    flechas: ["256,144 264,150 256,156", "1294,228 1300,236 1306,228", "256,684 248,690 256,696", "114,426 120,418 126,426"],
    // Columnas de etapa de los carriles de venta: guía vertical y rótulo al pie.
    columnas: {"y0": 532, "y1": 905, "yn": 935, "yt": 951, "cols": [[1155, "8", "Pedido y liberación"], [1010, "9", "Despacho"], [865, "10", "Llegada"], [720, "11", "Venta"], [575, "12", "Caja"]]},
    // Pasarela de mercadeo (opción A): cinta continua, hilos a las estaciones que toca y
    // nudos con el tipo de toque (L lanzamiento · P promoción · C co-marketing).
    mercadeo: {
      cinta: ["M440,285 L1053,285 Q1083,285 1083,315 L1083,456", "M1083,484 L1083,828"],
      hilos: ["M440,276 L440,103", "M812,276 C812,190 800,130 790,102", "M1083,302 C1120,260 1180,215 1190,164"],
      nudos: [[440, 285, ["2a", "2b"]], [812, 285, ["4a"]], [1147, 236, ["6"]], [1083, 560, ["8a"]], [1083, 640, ["8b"]], [1083, 720, ["11c"]], [1083, 800, ["8d"]], [1322, 306, ["7"]], [738, 744, ["11c"]], [296, 666, ["13"]], [100, 240, ["17"]]]
    }
  },

  estaciones: [
{id:"1",lane:"main",x:220,y:150,dir:"r",lab:"above",grp:"Compra",tramo:"T01 · Plan de demanda",t:"Plan de demanda",depto:"Comercial · Planificación",sis:"Excel · Power BI · Odoo",gente:"Comercial · Roberto y Andrés",ev:"solida",
 hoy:"Cada diciembre la dirección comercial arma, con cada vendedor y cliente por cliente, el plan del año por marca y lo pasa a Finanzas como monto mensual. Casio: cada mes la dirección de compras fija la cantidad sobre la sábana, con el sugerido de BI y la reposición de planificación. Cubitt: ventas internacionales proyecta en Excel la venta por mercado y la revisa cada trimestre, pero la compra es reactiva: el comité se reúne cuando el stock baja y parte de lo que necesita Venezuela.",
 pasos:["Plan anual por marca, vendedor y cliente, repartido en meses con pesos estacionales [E-08]", "El monto mensual pasa a Finanzas; compras y reportería carga cada mes la venta real contra el plan [E-08 · E-10]", "Casio: compras y reportería arma la sábana y la dirección de compras pone la cantidad, en la estación 2b [E-10 · E-08]", "Planificación calcula la reposición de Venezuela (3–4 meses) y de tiendas (3–4 semanas, Pareto A/B/C) en Excel [E-40]", "BI sugiere compra y rebalanceo desde Fabric y Power BI; se usa en Casio, todavía no en Cubitt [E-18 · E-10]", "Cubitt: ventas internacionales proyecta por mercado (el año anterior más un crecimiento), lo reparte por meses y lo revisa cada trimestre [E-63]", "Compras lo pasa a unidades por modelo y color, a 14 meses y con tres meses de colchón [E-63]", "Cubitt no tiene calendario: se compra cuando «estamos bajos» o cuando se logra reunir al comité [E-06]"],
 variantes:"Dos ritmos por marca: Casio sigue el calendario mensual que fija Casio; Cubitt no tiene calendario y compra cuando el stock baja, con la necesidad de Venezuela primero.",
 trombos:[{id:"1.1",s:"alta",t:"Cuando falta producto, la línea se borra en Odoo y la demanda no atendida no queda registrada.",ev:"E-05 · E-08 · E-26"},{id:"1.2",s:"media",t:"En Casio, tres fuentes de sugerido se pisan, sin un responsable del proceso.",ev:"E-08"},{id:"1.3",s:"media",t:"El modelo de BI no conoce el pedido mínimo ni el lead time de Cubitt y no llega a los vendedores.",ev:"E-10 · E-18"},{id:"1.4",s:"media",t:"No hay un rol de planificación de demanda; en Venezuela el histórico está afectado por los quiebres.",ev:"E-40 · E-05"},{id:"1.5",s:"media",t:"El forecast de Cubitt se rehízo tres veces este año y quien compra no sabe si se usa.",ev:"E-63 · E-60"}],
 cifras:["USD 1 M de mercancía estacionada, detectada por BI [E-01]", "Más de 6 meses de inventario sin analizar qué rematar [E-08]", "Con el modelo de inventario, el análisis de compra pasó de 8 días a minutos [E-18]"],
 personas:["Dir. comercial y compras · Roberto Roizental", "Gerencia comercial · Andrés Roizental", "Mayor internacional Cubitt · John Mordoch", "Regional Cubitt · Ricardo Baltodano", "Planificación VE · Jimena Sánchez", "Reportería de compras · Vera Gavizon", "BI (externo) · Alexis Mujica"],sistemas:["Excel", "Claude en Excel", "Odoo (exportación)", "Power BI", "Microsoft Fabric"],proc:["6.1", "2.2", "9.1"],src:"E-01 · E-05 · E-06 · E-08 · E-10 · E-18 · E-26 · E-40 · E-60 · E-63",aprob:"Casio: la dirección comercial fija el plan y la dirección de compras decide la compra. Cubitt: decide el comité de compra, con revisión de la dirección.",
 trasp:{ofi:0,lim:0,ext:1,sc:0,inf:5,ver:"inf"}},

{id:"2a",lane:"cub",x:440,y:90,dir:"r",lab:"above",grp:"Compra",tramo:"T02 · Producto Cubitt",t:"Idea y muestras",depto:"I+D Cubitt",sis:"WeChat · WhatsApp · Lark",gente:"Dir. I+D · Alejandro",ev:"solida",
 hoy:"El producto Cubitt nace de ideas informales: lo que piden los vendedores, lo que ofrecen las fábricas o lo que hace la competencia. Las muestras llegan a Panamá, donde opinan unas diez personas, y el director de I+D da el aprobado final.",
 pasos:["La idea sale de la intuición del equipo, de los vendedores, de la oferta de las fábricas o de la competencia [E-60]", "Desde junio una diseñadora industrial sigue las tendencias de color en WGSN y diseña accesorios [E-60 · E-22]", "Las muestras van a Panamá y el especialista de producto prueba la electrónica, el firmware y la app [E-60]", "La fábrica rehace la muestra hasta que se aprueba [E-60]", "Producto y lanzamientos crea el SKU y el UPC y lleva las licencias, como Disney [E-06 · E-60]", "Desde el 20-ago-2026 una base en Lark registra cada muestra [E-60]"],
 variantes:"Dos carriles internos: electrónica, con unos 10 proveedores, casi uno por categoría, y accesorios, moda y licencias. La recompra de un producto recurrente se salta esta estación.",
 trombos:[{id:"2a.1",s:"alta",t:"La app y el firmware del reloj son de la fábrica china; Kenex solo ve una vista genérica de sus usuarios.",ev:"E-05 · E-20"},{id:"2a.2",s:"media",t:"Las muestras se pierden durante meses y no hubo registro hasta agosto; tampoco hay política para desecharlas.",ev:"E-60"},{id:"2a.3",s:"media",t:"La decisión de producto no deja acta, y no hay KPI ni presupuesto de I+D.",ev:"E-60"},{id:"2a.4",s:"media",t:"Muchas voces en la aprobación visual, sin un criterio único.",ev:"E-22"}],
 cifras:["Unos 10 proveedores en China, casi uno por categoría [E-06 · E-08]", "Umbral de garantías aceptado en relojería: menos de 1 % [E-60]"],
 personas:["Dir. I+D · Alejandro Roizental", "Producto y licencias · Stephania Roizental", "Diseño industrial · Camila Cortés Herrera", "Especialista de producto · Rogmarc González", "Gerencia de producto · Ricardo Candanedo", "Sourcing China · Marina"],sistemas:["WeChat", "WhatsApp", "Correo", "Lark", "Odoo (alta de SKU)"],proc:["3.1", "3.3", "3.4", "3.6"],src:"E-06 · E-20 · E-22 · E-60 · SC-10",aprob:"El director de I+D da el aprobado final de cada producto.",
 trasp:{ofi:4,lim:1,ext:0,sc:0,inf:4,ver:"mix"},mk:{tipo:"L",t:"I+D pasa a mercadeo el producto aprobado; mercadeo diseña empaque, diales y la campaña mientras se fabrica.",ev:"E-60 · E-22 · E-42"}},

{id:"3a",lane:"cub",x:610,y:90,dir:"r",lab:"above",grp:"Compra",tramo:"T04 · Decisión y orden",t:"Comité y orden",depto:"Comité de compras",sis:"WhatsApp · correo · Excel",gente:"Comité · Alejandro y Roberto",ev:"solida",
 hoy:"Un comité sin calendario decide qué y cuánto comprar: I+D, la gerencia comercial, planificación comercial y ventas internacionales, con planificación de Venezuela. La dirección de compras valida en un grupo aparte. I+D emite la orden al proveedor, a veces por WhatsApp.",
 pasos:["Planificación comercial calcula con Excel o Power BI la venta reciente y propone cantidades [E-60 · E-06]", "El comité decide y la dirección de compras confirma antes de proceder [E-06 · E-08]", "I+D manda la orden por WhatsApp o correo, por ejemplo «necesito 5.000 piezas de esta» [E-60]", "El proveedor responde con la factura, que dispara el pago [E-06]"],
 trombos:[{id:"3a.1",s:"alta",t:"El comité no logra reunirse: más de una semana con el proceso parado y un quiebre de stock de un mes.",ev:"E-06"},{id:"3a.2",s:"alta",t:"La orden de compra no existe como documento de sistema: WhatsApp o correo, sin plantilla.",ev:"E-60"},{id:"3a.3",s:"media",t:"La emisión de órdenes depende de una sola persona.",ev:"E-06"},{id:"3a.4",s:"media",t:"No existe un área de compras formal.",ev:"E-26 · E-08"}],
 cifras:["Órdenes típicas de 5.000, 10.000 o 20.000 piezas [E-60 · E-06]", "Pedido mínimo por fábrica, por ejemplo 5.000 relojes [E-10]"],
 personas:["Dir. I+D (emite la orden) · Alejandro Roizental", "Dir. compras (valida) · Roberto Roizental", "Regional Cubitt (calcula cantidades) · Ricardo Baltodano", "Gerencia comercial · Andrés Roizental", "Mayor internacional Cubitt · John Mordoch", "Planificación VE · Jimena Sánchez"],sistemas:["WhatsApp", "Correo", "Excel", "Power BI", "Chat de grupo (medio no dicho)"],proc:["6.4", "6.2"],src:"E-06 · E-08 · E-10 · E-26 · E-60 · SC-10",aprob:"La dirección de compras valida la compra de Cubitt como segunda instancia.",
 trasp:{ofi:0,lim:0,ext:0,sc:0,inf:7,ver:"inf"}},

{id:"4a",lane:"cub",x:780,y:90,dir:"r",lab:"above",grp:"Compra",tramo:"T05–T06 · Pago y embarque",t:"Anticipo y producción",depto:"I+D · Sourcing China",sis:"Correo · WeChat · Lark",gente:"Sourcing · Marina",ev:"parcial",
 hoy:"Kenex paga un anticipo de 20–30 % al hacer el pedido y el saldo cuando la fábrica avisa que está listo, un aviso que llega solo a I+D; las condiciones varían por proveedor. Sourcing coordina desde China la consolidación y el envío. Se decide entre avión, para relojes y urgencias, y barco, que tarda de 60 a 90 días.",
 pasos:["I+D manda por correo a Finanzas la instrucción de pago [E-06]", "Los pagos internacionales salen por varios bancos, según el país del proveedor, y fuera del día de pago semanal [E-61]", "Sourcing lleva por proveedor en Lark lo que está en producción y en camino [E-06 · E-60]", "Se consulta el inventario de Venezuela para decidir entre avión y barco [E-60 · E-08]", "Una orden de 10.000 puede salir en tres despachos de 3.000 [E-60]", "Kenex USA recibe directo de China, sin pasar por Panamá [E-01 · E-30]"],
 trombos:[{id:"4a.1",s:"alta",t:"Tránsito invisible: Logística a veces se entera dos días antes de un contenedor que tardó 60 a 90 días.",ev:"E-03 · E-60"},{id:"4a.2",s:"media",t:"Los archivos de seguimiento en Lark están «actualizados a medias» y no se usan como fuente confiable.",ev:"E-08 · E-40 · E-10"},{id:"4a.3",s:"media",t:"Cuando un lanzamiento se atrasa se paga flete aéreo, y ese costo no se registra.",ev:"SC-08"},{id:"4a.4",s:"media",t:"La calidad se controla solo contra la muestra; los defectos aparecen después, en las garantías.",ev:"E-60"}],
 cifras:["China a Colón: 60–90 días en barco [E-03]", "El aéreo ahorra cerca de un mes [E-60]"],
 personas:["Sourcing China · Marina", "Dir. I+D (instrucción de pago) · Alejandro Roizental", "Tesorería PA · Norman Vanegas", "CFO · Jaime González"],sistemas:["Correo", "WeChat", "Lark (documentos por proveedor; tablero de compras)", "Banca en línea"],proc:["6.4", "13.1", "13.2", "7.6"],src:"E-03 · E-06 · E-08 · E-10 · E-15 · E-40 · E-60 · E-61 · SC-08",
 confirmar:"Lead time de producción por categoría; hoy solo hay una cuenta regresiva de unos tres meses antes del lanzamiento.",
 trasp:{ofi:2,lim:0,ext:1,sc:1,inf:4,ver:"mix"},mk:{tipo:"L",t:"La campaña se fija contra la llegada estimada; si la producción se atrasa, se paga aéreo para no mover la fecha.",ev:"E-42 · SC-08"}},

{id:"2b",lane:"cas",x:440,y:210,dir:"r",lab:"below",grp:"Compra",tramo:"T03 · Compra Casio",t:"Order sheet y sábana",depto:"Compras Casio",sis:"Excel · correo · Power BI",gente:"Compras · Vera y Roberto",ev:"solida",
 hoy:"Casio Latinoamérica manda cada mes el order sheet con lo que se puede pedir. Compras y reportería arma la «sábana», un Excel con stock, venta, tránsito, pedidos de clientes especiales y el sugerido de BI. La dirección de compras escribe la cantidad de cada referencia.",
 pasos:["Hacia el día 15–20 llega el order sheet, las calculadoras antes que los relojes [E-08 · E-05]", "Se saca de Odoo el reporte «macro» y se le suma la venta de 6–12 meses y el tránsito [E-10]", "Planificación reparte por país los lanzamientos nuevos (NPR) [E-40]", "Se ofrece el order sheet a 10–12 clientes especiales, que prepagan [E-10]", "La dirección de compras pone la cantidad por SKU: 2–3 días al mes [E-08]"],
 variantes:"Tres carriles dentro de Casio que se juntan en un solo pedido: compra regular, lanzamientos NPR y prepedidos de clientes especiales.",
 trombos:[{id:"2b.1",s:"alta",t:"Una compra de miles de referencias depende de una sola persona, sin respaldo.",ev:"E-08 · E-10"},{id:"2b.2",s:"media",t:"El archivo de compra no está documentado; se transmitió de persona a persona.",ev:"E-10"},{id:"2b.3",s:"baja",t:"Los códigos de Casio y de Kenex no coinciden y se cruzan a mano con una tabla de equivalencias.",ev:"E-10"}],
 cifras:["Clientes especiales: 10–12, más de 10 % de la venta [E-10]", "La compra toma unos 3 días al mes [E-10]"],
 personas:["Reportería de compras · Vera Gavizon", "Dir. compras (decide la cantidad) · Roberto Roizental", "Planificación VE (lanzamientos) · Jimena Sánchez"],sistemas:["Excel", "Correo", "Odoo (exportación)", "Power BI"],proc:["6.3", "2.4"],src:"E-05 · E-08 · E-10 · E-26 · E-40",aprob:"La dirección de compras decide la compra de Casio.",
 trasp:{ofi:0,lim:0,ext:1,sc:0,inf:6,ver:"inf"},mk:{tipo:"L",t:"Casio comparte sus lanzamientos y aprueba el plan semestral de mercadeo, con parte del presupuesto.",ev:"E-40 · E-42 · E-49"}},

{id:"3b",lane:"cas",x:610,y:210,dir:"r",lab:"below",grp:"Compra",tramo:"T03–T05 · Asignación y pago",t:"Allocation y pago",depto:"Compras · Finanzas",sis:"Correo · Excel · banca",gente:"Dir. compras · Roberto",ev:"parcial",
 hoy:"Casio confirma una asignación menor a lo pedido, así que compras pide de más. El pago se hace por adelantado, antes del despacho y hacia el día 25, con la línea de crédito bancaria del hub; la mercancía llega el mes siguiente.",
 pasos:["Calendario aproximado: el 15 se devuelve el pedido, el 17 Casio confirma, hasta el 20 se puede agregar y el 25 se paga [E-05]", "Casio responde con el allocation y se pueden pedir adicionales [E-06 · E-10]", "Unos 5 días antes del cierre de mes, compras pasa al CFO el estimado y el CFO prepara la línea de crédito [E-15 · E-43]", "Todo llega a la Zona Libre de Colón [E-10]"],
 trombos:[{id:"3b.1",s:"alta",t:"Casio asigna entre 20 % y 30 % de lo pedido en los últimos meses y faltan referencias clave.",ev:"E-10 · E-40 · E-08"},{id:"3b.2",s:"media",t:"El reparto final por país no coincide con lo pedido para cada uno, y eso obliga a cuadrar a mano el reporte a Casio.",ev:"E-10"}],
 cifras:["Lead time de Casio: 45–60 días; siempre hay dos pedidos en tránsito [E-10]", "Allocation: pasó de 80 % a 60 % y hoy ronda el 20–30 % de lo pedido [E-08 · E-10 · E-40]"],
 personas:["Dir. compras · Roberto Roizental", "CFO (línea para el pago) · Jaime González", "Contraparte · Casio Latinoamérica (Brasil)"],sistemas:["Correo", "Excel", "Banca (línea de crédito)"],proc:["6.3", "13.1", "13.4"],src:"E-05 · E-06 · E-08 · E-10 · E-15 · E-40 · E-43",
 confirmar:"Los plazos contractuales con Casio y si hay carta de crédito.",
 trasp:{ofi:0,lim:0,ext:1,sc:1,inf:3,ver:"inf"}},

{id:"4b",lane:"cas",x:780,y:210,dir:"r",lab:"below",grp:"Compra",tramo:"T06 · Embarque",t:"Embarque Casio",depto:"Compras · Logística",sis:"Correo · llamada",gente:"Dir. compras · Roberto",ev:"parcial",
 hoy:"Después del pago, compras coordina con el agente aduanal y el forwarder, aprueba la cotización del flete y decide cuántos contenedores salen y con qué mercancía. Cuando se confirma la salida, reenvía el aviso a logística.",
 pasos:["Compras recibe la cotización del flete y aprueba los contenedores [E-08]", "Kenex elige su forwarder: la logística de Casio propone la salida y Kenex la aprueba por correo [SC-01]", "Casio va «casi todo por barco» [E-08]", "El shipping advice se reenvía por correo a logística [E-08]", "Llegan el packing list y la factura; el agente de carga envía el BL [SC-01 · E-70]"],
 trombos:[{id:"4b.1",s:"media",t:"Cada paso del embarque pasa por la misma persona.",ev:"E-08"},{id:"4b.2",s:"baja",t:"No se separa cuántos contenedores al mes son de cada marca.",ev:"E-68 · E-03"}],
 cifras:["Un contenedor de Casio trae unas 1.800 cajas [E-03]"],
 personas:["Dir. compras (flete y contenedores) · Roberto Roizental", "Inventarios PA · María Alejandra Mejías", "Logística PA · Fernando Alvarado", "Agente de carga · Marlin Logistics"],sistemas:["Correo", "Llamada"],proc:["6.3", "7.6"],src:"E-03 · E-08 · E-68 · E-70 · SC-01",aprob:"La dirección de compras aprueba el flete y los contenedores.",
 confirmar:"Puerto de origen y naviera.",
 trasp:{ofi:0,lim:0,ext:0,sc:0,inf:4,ver:"inf"}},

{id:"5",lane:"main",x:1040,y:150,dir:"r",lab:"above",grp:"Hub Panamá",tramo:"T07 · Llegada a Panamá",t:"Llegada a Zona Libre",depto:"Tráfico",sis:"Correo · Excel · EBS",gente:"Tráfico · Yanilka",ev:"solida",
 hoy:"Con el aviso de partida, Tráfico crea el ASN y sigue el contenedor en su propio Excel y en el calendario de Lark. Un día antes de la llegada se crea la entrada en EBS y se le asocia la orden de compra. En la Zona Libre nada se mueve sin el documento DMC.",
 pasos:["Tráfico crea el ASN con la notificación de partida [SC-01 · E-03]", "El agente de carga manda los documentos por correo y Kenex los valida [E-70]", "La fecha estimada de llegada más 2 días se anota en el calendario de Lark para operaciones [E-70]", "Entrada en EBS con BL y contenedor; inventarios asocia la orden de compra [E-70]", "El «acarreo» marca la llegada y habilita a la bodega [E-70]"],
 variantes:"Cuatro movimientos posibles en la Zona Libre: entrada, salida, traspaso a otra empresa de la zona y liquidación hacia Panamá.",
 trombos:[{id:"5.1",s:"media",t:"Seguimiento fuera de sistema: Excel de contenedores, calendario y cadena de correos.",ev:"E-70"},{id:"5.2",s:"media",t:"El tránsito aparece en Odoo solo 1–2 semanas antes de llegar.",ev:"SC-01"},{id:"5.3",s:"baja",t:"Pagos de aduana en persona en cada movimiento.",ev:"E-70"}],
 cifras:["4–5 contenedores al mes; hasta 10 en temporada alta [E-68]", "Tráfico: 5–6 personas [E-03 · E-70]"],
 personas:["Jefa de Tráfico PA · Yanilka Martínez", "Inventarios PA (asocia la orden) · María Alejandra Mejías", "Agente de carga · Marlin Logistics"],sistemas:["Correo", "Excel", "EBS", "Odoo", "Calendario de Lark", "Portal DMC"],proc:["7.6", "7.1"],src:"E-03 · E-68 · E-70 · SC-01",
 trasp:{ofi:4,lim:1,ext:1,sc:1,inf:6,ver:"mix"}},

{id:"6",lane:"main",x:1190,y:150,dir:"r",lab:"above",grp:"Hub Panamá",tramo:"T08 · Bodega",t:"Bodega y liberación",depto:"Operaciones y Logística",sis:"EBS · Odoo · Excel",gente:"Logística · Fernando",ev:"solida",
 hoy:"La carga llega a granel y se baja caja por caja. Cada caja recibe un LPN y va a su ubicación según la clasificación ABC. Al cerrar el ASN, EBS pasa las cantidades a Odoo, pero la mercancía solo queda disponible cuando inventarios la acepta a mano y amarra las preventas. La dirección de compras fija el precio de lo nuevo.",
 pasos:["Descarga manual y paletizado sin mezclar productos [E-03 · SC-01]", "Recepción contra la orden en la PDT; los faltantes van a una bodega virtual y se reclaman [SC-01]", "LPN por caja y ubicación ABC; lo que no se mueve va al fondo [SC-01]", "Interfaz de EBS a Odoo al cerrar el ASN; inventarios valida costos y libera [E-03]", "Compras pone los precios y reparte por país las ediciones limitadas [E-08]"],
 variantes:"Dos bodegas en Panamá: la de Zona Libre, con EBS y ubicaciones, y la de la ciudad, sin WMS, que surte tiendas, mayor local y web.",
 trombos:[{id:"6.1",s:"alta",t:"Una sola persona libera el inventario en Odoo; se hace a mano a propósito para proteger las preventas.",ev:"E-03 · SC-01"},{id:"6.2",s:"alta",t:"La bodega de la ciudad tenía unas 130.000 unidades donde bastaban 30.000; en un conteo de Cubitt coincidió solo el 29 % de los ítems.",ev:"SC-06 · E-03"},{id:"6.3",s:"media",t:"Hasta que baja la última caja nada está disponible: un contenedor tarda un día.",ev:"E-03"},{id:"6.4",s:"media",t:"EBS y Odoo «se hablan en ciertos momentos», no en tiempo real.",ev:"E-07"}],
 cifras:["Nave de 5.000–5.500 m²; la mudanza fue en agosto de 2025 [SC-07]", "Unos 4.800 SKU operativos [SC-01]"],
 personas:["Logística PA · Fernando Alvarado", "Inventarios y precios PA (libera en Odoo) · María Alejandra Mejías", "Entradas e inventario PA · José E. Miranda", "Pick & pack PA · Isaac del Cid", "Dir. compras (precios de lo nuevo) · Roberto Roizental"],sistemas:["EBS (con PDT)", "Odoo", "Excel", "De palabra"],proc:["7.1", "7.2", "7.8"],src:"E-03 · E-07 · E-08 · E-68 · SC-01 · SC-06 · SC-07",aprob:"La dirección de compras fija los precios de la mercancía nueva.",
 trasp:{ofi:3,lim:0,ext:0,sc:0,inf:4,ver:"mix"},mk:{tipo:"L",t:"Al liberarse la mercancía, el aviso de lanzamiento dispara el reparto a tiendas y la preventa.",ev:"E-60 · E-03 · E-07"}},

{id:"7",lane:"main",x:1300,y:330,dir:"d",lab:"left",grp:"Hub Panamá",tramo:"T09 · Asignación",t:"Asignación y aprobación",depto:"Gerencia Comercial",sis:"Odoo · correo · Lark",gente:"Aprobación · Andrés",ev:"parcial",
 hoy:"No hay una regla escrita de reparto. Manda la preventa: lo amarrado al liberar ya tiene dueño. Todo pedido, también el de cada país, pasa por la gerencia o la dirección comercial, que miran margen, cantidad por referencia y crédito, y lo recortan para no dejar al hub sin mercancía para los demás. Ningún país tiene una prioridad declarada.",
 pasos:["La gerencia comercial aprueba cada pedido en Odoo con un indicador de riesgo, unos 30 segundos por pedido [E-05 · E-62]", "Se evita que un solo cliente se lleve las 20 referencias más vendidas, porque el cupo de Casio no alcanza [E-05]", "El pedido de cada país se recorta según el stock del hub: en Cubitt lo decide la gerencia comercial y en Casio la dirección de compras [E-34 · E-40]", "Los clientes especiales de fuera de zona reciben solo lo que no deja corta a la zona natural [E-10]", "Ventas internacionales reserva a sus clientes clave un 15–20 % extra en preventa [E-63]", "Las ediciones limitadas se bloquean y la dirección las reparte por país [E-08]", "Lo que no hay queda como presupuesto; si el tránsito no lo cubre, se elimina [E-05]"],
 variantes:"Aquí la vía se abre en cuatro carriles por canal: mayor, países y socios, tiendas y web.",
 trombos:[{id:"7.1",s:"alta",t:"Lo no atendido se borra y no queda registro de la demanda perdida.",ev:"E-05 · E-26"},{id:"7.2",s:"alta",t:"Todo pedido espera una aprobación centralizada; cuando el aprobador viaja, los pedidos se detienen.",ev:"E-08 · E-62"},{id:"7.3",s:"media",t:"Ventas ve un «futuro disponible» y todos ofrecen el mismo stock.",ev:"E-03 · E-05"}],
 cifras:["200 clientes especiales revisados cada 2–4 días [E-08]", "Ajuste manual de 30–40 % a la reposición [E-08]"],
 personas:["Gerencia comercial (aprueba cada pedido) · Andrés Roizental", "Dir. comercial (ajusta la reposición) · Roberto Roizental", "Inventarios PA (amarra la preventa) · María Alejandra Mejías", "Planificación VE · Jimena Sánchez", "Mayor internacional Cubitt (preventa) · John Mordoch"],sistemas:["Odoo", "Correo", "Lark", "Chat de grupo"],proc:["2.6", "8.5", "8.6", "6.6"],src:"E-03 · E-05 · E-08 · E-10 · E-19 · E-26 · E-34 · E-40 · E-62 · E-63",aprob:"La gerencia o la dirección comercial aprueban todos los pedidos.",
 confirmar:"Si existe un orden de prioridad entre países cuando no alcanza y quién lo fija en cada marca.",
 trasp:{ofi:4,lim:1,ext:0,sc:0,inf:3,ver:"mix"},mk:{tipo:"P·L",t:"La dirección comercial aprueba cada promoción por margen; nadie reserva unidades para comunicar el lanzamiento.",ev:"E-40 · E-08 · E-56"}},

{id:"8a",lane:"may",x:1155,y:560,dir:"l",lab:"above",wrap:15,grp:"Venta por canal",tramo:"T10 · Venta al mayor",t:"Oferta, pedido y aprobación",depto:"Ventas al mayor",sis:"Excel · WhatsApp",gente:"Mayor · John",ev:"solida",
 hoy:"El mayor tiene tres frentes: el internacional de Cubitt, en 17 a 20 países; las cuentas especiales; y el mayor local de cada país. Los lunes se manda una lista de disponibilidad en Excel. El cliente la llena, se carga a Odoo como presupuesto y se convierte en orden de venta, que reserva stock. La gerencia comercial aprueba el pedido antes de que la bodega lo vea.",
 pasos:["Lista de disponibilidad los lunes con SKU, imagen, precio y tránsito [E-05]", "Carga masiva a Odoo: primero presupuesto, luego orden de venta [E-05]", "Preventa contra tránsito, con fecha prometida al cliente [E-05 · E-07]", "Ventas internacionales preventa por WhatsApp con una foto antes de la campaña [E-63]", "La gerencia comercial aprueba y la interfaz manda el pedido a EBS; en el mayor local de Panamá el contado no pasa por aprobación y el crédito lleva dos [E-05 · SC-01 · E-39]", "Los clientes especiales de Casio prepagan contra el order sheet, antes de que exista la mercancía [E-10]", "En Panamá el crédito exige afiliación y debida diligencia; en Venezuela basta el RIF [E-62 · E-48]"],
 variantes:"Casio y Cubitt se venden igual al mayor, pero Cubitt tiene dirección internacional y el mayor de Casio pasa a un brand manager regional que se está incorporando. Las cuentas especiales incluyen a Venezuela y Costa Rica, que en el circuito van por el carril de países. Venezuela maneja tres listas de precio (bolívares, dólares y PVP) y consignación en cadenas.",
 trombos:[{id:"8a.1",s:"alta",t:"En Venezuela el mayor recibe último: pide 1.000 y le llegan 500.",ev:"E-35"},{id:"8a.2",s:"media",t:"La lista de los lunes no la mandan todos, y todos ofrecen el mismo stock.",ev:"E-05"},{id:"8a.3",s:"media",t:"Parte de la venta B2B no está en Odoo; la mayoría de los clientes compra por teléfono.",ev:"SC-11 · E-26"},{id:"8a.4",s:"media",t:"El mayor conoce las campañas dos semanas antes del lanzamiento.",ev:"E-63"}],
 cifras:["El mayor internacional de Cubitt crece 2–3 veces al año [E-63]", "Línea blanca: cerca de 2 M USD el año pasado [E-63]", "El cliente n.º 2 de Venezuela compra unos 600 mil USD al año [E-35]"],
 personas:["Mayor internacional Cubitt · John Mordoch", "Regional Cubitt · Ricardo Baltodano", "KAM Centroamérica · Jorge Ábrego", "Mayor PA · Edumar Escalona", "Mayor VE · Andrés Márquez", "Coordinación mayor VE · Henry Lucena"],sistemas:["Excel", "WhatsApp", "Teléfono", "Odoo", "Lark", "Portal B2B propio (VE)"],proc:["8.3", "8.4", "8.5", "8.6", "8.7", "8.11"],src:"E-05 · E-07 · E-10 · E-35 · E-36 · E-39 · E-48 · E-57 · E-62 · E-63 · SC-01",
 trasp:{ofi:4,lim:0,ext:1,sc:1,inf:5,ver:"mix"},mk:{tipo:"C·L",t:"Presupuesto por cliente para material de punto de venta, muebles y activaciones; el mayor conoce las campañas dos semanas antes.",ev:"E-49 · E-31 · E-63"}},

{id:"9a",lane:"may",x:1010,y:560,dir:"l",lab:"above",wrap:15,grp:"Venta por canal",tramo:"T15 · Despacho",t:"Despacho y exportación",depto:"Bodega · Tráfico",sis:"EBS · correo · Odoo",gente:"Despacho · Isaac",ev:"solida",
 hoy:"El pedido aprobado cae en EBS y el jefe de preparación lo asigna. Se piquea en zig-zag, se empaca a ciegas y espera en el stage según el modo de transporte. Tráfico factura con el packing list que llega por correo, suma empaque y flete, y despacha cuando el vendedor confirma el pago y el forwarder del cliente fija el día.",
 pasos:["Picking dirigido con PDT y packing ciego, que no deja avanzar si falta una pieza [SC-01]", "Stage por modo de transporte: aéreo, terrestre o marítimo [SC-01]", "Packing list automático por correo al vendedor y a Tráfico [SC-01 · E-70]", "Factura borrador con empaque y flete [SC-01]", "DMC, sello, carga programada en EBS, foto de cada pedido y salida [E-70 · SC-01]"],
 trombos:[{id:"9a.1",s:"alta",t:"El 70 % del tiempo entre pedido y despacho es esperar a clientes y forwarders; hubo órdenes de hasta 200 días en el stage.",ev:"SC-01"},{id:"9a.2",s:"media",t:"El vendedor hace de intermediario en todo: confirma el pago, reenvía el packing list y guarda los contactos del cliente en su teléfono.",ev:"E-70 · SC-01"},{id:"9a.3",s:"media",t:"Los empaques los dictan los vendedores caso a caso, con reempaques y reversos.",ev:"E-68"}],
 cifras:["De unos 14 días a 3–4 días por pedido [SC-07]", "Cumplimiento del plazo: 85–90 % [SC-01]"],
 personas:["Pick & pack PA · Isaac del Cid", "Supervisión de despacho PA · Jorge Meneses", "Jefa de Tráfico PA · Yanilka Martínez", "Tráfico PA · Natalia Oliveros", "Tráfico PA · Levana Acosta", "Tráfico PA · Karibeth López", "Tráfico PA · Jovanna West", "Logística PA · Fernando Alvarado"],sistemas:["EBS (con PDT)", "Odoo", "Correo", "Excel", "Teléfono/WhatsApp del vendedor", "Portal DMC"],proc:["7.3", "7.4", "7.5"],src:"E-03 · E-68 · E-70 · SC-01 · SC-07",
 trasp:{ofi:5,lim:1,ext:1,sc:1,inf:7,ver:"mix"}},

{id:"8b",lane:"pai",x:1155,y:640,dir:"l",lab:"above",wrap:15,grp:"Venta por canal",tramo:"T11 · Países propios",t:"Pedido país y recorte",depto:"Planificación",sis:"Excel · correo",gente:"Planif. · Jimena",ev:"solida",
 hoy:"Los países le compran a Panamá como clientes. Venezuela manda su pedido en Excel y Panamá decide cuánto le da. Colombia acuerda su pedido con la gerencia comercial y Panamá lo carga en Odoo. Costa Rica, que es socio, rellena una hoja de pedido que le envía ventas internacionales.",
 pasos:["Venezuela: planificación calcula, operaciones ajusta y se envía a Panamá en Excel, sin orden en Odoo [E-34]", "Panamá recorta: la gerencia comercial en Cubitt y la dirección de compras en Casio [E-34]", "Colombia: el líder comercial consolida, la gerencia del país revisa, Panamá aprueba y lo carga en Odoo [E-11]", "Costa Rica: compras del socio llena la hoja y su gerencia aprueba [E-19 · E-59]"],
 variantes:"Cuatro frentes con reglas distintas: Venezuela, Colombia, Costa Rica como socio, y Kenex USA, que sale de la vía y compra directo a China.",
 trombos:[{id:"8b.1",s:"alta",t:"Llega menos de lo pedido y no se avisa a tiempo: Costa Rica recibe 70–80 % y en Venezuela hubo diferencias entre lo facturado y lo recibido.",ev:"E-19 · E-40 · E-34"},{id:"8b.2",s:"media",t:"El stock disponible se publica a Costa Rica por rangos, no en cantidades exactas.",ev:"E-19"},{id:"8b.3",s:"media",t:"No se registra cuánto pidió cada país ni cuánto se le dio.",ev:"E-40"}],
 cifras:[],
 personas:["Planificación VE · Jimena Sánchez", "Operaciones VE · Vladimir Castillo", "Mayor PA (cuenta Venezuela) · Edumar Escalona", "Gerencia comercial (cupo Cubitt) · Andrés Roizental", "Dir. compras (cupo Casio) · Roberto Roizental", "Country manager CO · Joel Cohen", "Comercial CO · Santiago Ramírez", "Asistente comercial PA · Steffany Aguilar", "Socio CR · Gil Porat", "Compras CR · Itai Porat"],sistemas:["Excel", "Correo", "Teléfono / WhatsApp (Colombia)", "Odoo", "Claude en Excel (Colombia)"],proc:["6.6", "8.3"],src:"E-11 · E-14 · E-19 · E-34 · E-39 · E-40 · E-59",aprob:"La dirección de compras (Casio) y la gerencia comercial (Cubitt) deciden cuánto recibe cada país.",
 trasp:{ofi:2,lim:0,ext:0,sc:0,inf:8,ver:"inf"},mk:{tipo:"L·P",t:"Cada país adapta el key visual regional y sus promociones; el socio de Costa Rica somete sus artes a Panamá.",ev:"E-42 · E-31 · E-19"}},

{id:"9b",lane:"pai",x:1010,y:640,dir:"l",lab:"above",wrap:15,grp:"Venta por canal",tramo:"T11 · Despacho al país",t:"Despacho y aduana",depto:"Operaciones país",sis:"Correo · papel",gente:"Op. VE · Vladimir",ev:"solida",
 hoy:"Panamá alista el pedido del país en la Zona Libre, en unas dos semanas, y lo embarca. Cada país tiene su propia aduana y sus trabas. Venezuela recibe el contenedor tras unos 15 días de mar y luego pasa por permisos y nacionalización. Colombia importa hoy a través de un tercero. Costa Rica recibe por camión en el almacén fiscal de San José.",
 pasos:["Alistamiento en la Zona Libre: unas 2 semanas; lo que espera barco va a un área aparte [E-40 · SC-01]", "Costa Rica: alistamiento de 1 a 3 semanas y entrega al operador logístico del socio [E-19]", "Venezuela: BL, factura y documento de salida llegan por correo; operaciones los cuadra y los pasa al agente [E-34]", "Permisos de SENCAMER y CONATEL; sin permiso, el embarque se frena [E-34]", "Aranceles y reparto de flete y seguro en el costo de cada unidad [E-65]", "Colombia importa con un tercero, que cobra un sobrecargo [E-11]", "Costa Rica: DUA, semáforo y camión hasta la bodega del socio [E-19]"],
 trombos:[{id:"9b.1",s:"alta",t:"Colombia importa a través de un tercero, con sobrecosto, y ha tenido mercancía retenida en aduana.",ev:"E-11"},{id:"9b.2",s:"alta",t:"En Venezuela aduana, permisos y buena parte de las decisiones operativas pasan por una sola persona.",ev:"E-34 · E-35"},{id:"9b.3",s:"media",t:"El proceso de aduana en Venezuela no está documentado y hubo retenciones por un certificado.",ev:"E-34"},{id:"9b.4",s:"media",t:"Quien planifica no ve la guía del embarque y se entera de la llegada por comentarios.",ev:"E-40"}],
 cifras:["Preparar un pedido a Venezuela toma unas 2 semanas [E-40]", "Contenedor de 66 m³; se planifica hasta unos 60 [E-40]", "Panamá a Venezuela: unos 15 días de mar [SC-07]; «un mes cuando poco» de punta a punta [E-35]", "Arancel de relojería en Venezuela: del 20 % al 35 % [E-34]"],
 personas:["Operaciones VE · Vladimir Castillo", "Tesorería VE (permisos e impuestos) · Verónica Mejías", "Country manager CO · Joel Cohen", "Administración CR · Hugo"],sistemas:["Correo", "Papel", "De palabra", "Portales de aduana y permisos", "PCGraph"],proc:["7.6", "7.1"],src:"E-11 · E-19 · E-34 · E-35 · E-40 · E-59 · E-65 · SC-01 · SC-07",
 trasp:{ofi:0,lim:0,ext:1,sc:1,inf:8,ver:"inf"}},

{id:"10b",lane:"pai",x:865,y:640,dir:"l",lab:"above",wrap:15,grp:"Venta por canal",tramo:"T08–T09 · Bodega del país",t:"Bodega país y reparto",depto:"Logística del país",sis:"Odoo · WMS · Lark",gente:"Almacén · Elvis",ev:"solida",
 hoy:"La mercancía entra a la bodega del país y se reparte a sus canales. En Venezuela el orden habitual es «primero comen las tiendas, un poquito de la web», y el mayor vende lo que queda. En Colombia todo cae en un solo stock y el mayor puede dejar al país en cero.",
 pasos:["Venezuela: logística ubica, facturación carga la orden y la entrada, y planificación levanta los faltantes contra la factura [E-34]", "Venezuela con contenedor: el día 1 se recibe, el 2 se chequea, el 3 salen las tiendas y el 4 y el 5 el mayor [E-36]", "Stock objetivo según la distancia: más unidades cuanto más lejos está la tienda [E-34]", "Las tiendas grandes funcionan como almacenes satélite [E-34]", "Colombia: dos personas en la bodega con el WMS de Odoo; la gerencia aprueba cada movimiento en Lark [E-11]", "Costa Rica: logística nacionaliza en su ERP y administración cuadra los impuestos contra el sistema [E-59]"],
 variantes:"En Venezuela y Colombia de esta bodega se surten también las tiendas, la web y el mayor local del país: el dibujo los muestra en carriles aparte para leerlos por canal.",
 trombos:[{id:"10b.1",s:"alta",t:"En Venezuela un contenedor paraliza el almacén: el mayor pierde una semana porque las tiendas pasan primero.",ev:"E-36"},{id:"10b.2",s:"alta",t:"El inventario del sistema no es el real: reservas que no se liberan y «mercancías que existen pero no existen».",ev:"E-34 · E-35"},{id:"10b.3",s:"media",t:"Colombia no divide el inventario por canal: el mayor consume todo y deja la web y las islas en cero.",ev:"E-14"},{id:"10b.4",s:"media",t:"La facturación y la aprobación de movimientos dependen de una persona en cada país.",ev:"E-34 · E-11"},{id:"10b.5",s:"media",t:"El mayor de Venezuela vende lo que dejan tiendas y web: «somos el hoyo».",ev:"E-35 · E-40"}],
 cifras:["Referencias iguales en Panamá y Venezuela: 99,9 % [E-34]"],
 personas:["Almacén VE · Elvis Badillo", "Logística y facturación VE · Yoly Pacheco", "Supervisión de almacén VE · Rogelio Aznárez", "Operaciones VE · Vladimir Castillo", "Bodega CO · Miguel Grisales", "Country manager CO (aprueba movimientos) · Joel Cohen", "Administración CR · Hugo"],sistemas:["Odoo", "WMS propio (VE, tablet)", "Lark", "Correo", "PCGraph (Costa Rica)"],proc:["7.2", "7.8", "6.7"],src:"E-11 · E-14 · E-34 · E-35 · E-36 · E-40 · E-59",
 trasp:{ofi:6,lim:3,ext:1,sc:1,inf:3,ver:"ofi"}},

{id:"8c",lane:"tie",x:1155,y:720,dir:"l",lab:"above",wrap:15,grp:"Venta por canal",tramo:"T12 · Tiendas",t:"Sugerido y pedido",depto:"Planificación",sis:"Excel · Odoo",gente:"Reposición · Jimena",ev:"solida",
 hoy:"Las tiendas no piden: planificación les calcula un sugerido cada semana. En Panamá el supervisor lo ajusta por espacio y exhibición y sube los pedidos el lunes con la plantilla masiva de Odoo; la gerencia comercial los aprueba y sin eso la bodega no los ve. En Venezuela planificación monta el pedido de cada tienda en Odoo.",
 pasos:["Planificación cruza inventario y venta por tienda y manda el sugerido [E-53 · E-40]", "El supervisor lo ajusta por espacio y exhibición y arma los pedidos con la plantilla masiva de Odoo, con corte el lunes a mediodía [E-53 · SC-07]", "La gerencia comercial aprueba en el sistema; sin eso la bodega no ve el pedido [E-53]", "Venezuela: reposición semanal desde la bodega central; los pedidos se suben tienda por tienda, se imprimen y se grapan [E-40 · E-47]", "Las urgencias y los traslados entre tiendas se piden por correo o WhatsApp [E-53 · E-47]"],
 variantes:"Venezuela repone desde la bodega del país, que primero sirve a las tiendas.",
 trombos:[{id:"8c.1",s:"media",t:"En Venezuela los pedidos se suben tienda por tienda a Odoo, se imprimen y se grapan: 10 a 30 minutos cada vez.",ev:"E-40"},{id:"8c.2",s:"media",t:"Quiebres de productos estrella: el termo negro en cero en la tienda y 5.000 en Zona Libre.",ev:"E-57"}],
 cifras:["Cobertura objetivo en tienda: 3–4 semanas, por Pareto [E-40]"],
 personas:["Planificación · Jimena Sánchez", "Supervisión de tiendas PA · Blas García", "Gerencia comercial (aprueba) · Andrés Roizental", "Ventas al detal VE · María Eugenia Villegas", "Operaciones VE · Vladimir Castillo"],sistemas:["Excel", "Odoo", "Correo", "WhatsApp", "Papel"],proc:["9.3", "6.7"],src:"E-40 · E-47 · E-53 · E-57 · SC-07",aprob:"La gerencia comercial aprueba cada pedido de tienda en Panamá.",
 trasp:{ofi:2,lim:0,ext:0,sc:0,inf:4,ver:"inf"}},

{id:"9c",lane:"tie",x:1010,y:720,dir:"l",lab:"above",wrap:15,grp:"Venta por canal",tramo:"T15 · Despacho a tienda",t:"Despacho a tienda",depto:"Bodega · Tráfico",sis:"EBS · Odoo · papel",gente:"Tráfico · Jovanna",ev:"solida",
 hoy:"En Panamá, desde el piloto, la Zona Libre prepara el pedido de cada tienda en EBS, Tráfico lo factura a la bodega de la ciudad y lo liquida, y los camiones propios lo llevan el martes con la ruta y la lista de empaque impresas. En Venezuela el transporte propio sale lunes, miércoles y viernes a las tiendas de Caracas, y un tercero lleva el interior.",
 pasos:["La Zona Libre prepara en EBS y llega la lista de empaque [E-70]", "Tráfico factura a la bodega de la ciudad y arma la liquidación con el agente de aduana [E-70 · E-53]", "Se prepara el lunes y el martes se liquida y se entrega; llega entre martes y jueves [SC-07 · E-53]", "Dos camiones propios, con los horarios de recepción de cada tienda impresos para los choferes [E-70 · SC-01]", "Venezuela: transporte propio lunes, miércoles y viernes en Caracas, que de vuelta trae reparaciones, devoluciones y efectivo [E-47 · E-34]", "Al interior, un transportista tercero cuando el flete compensa [E-34]"],
 variantes:"Margarita mantiene más stock porque enviar cuesta el doble, y tiene reglas propias para mover mercancía hacia el continente.",
 trombos:[{id:"9c.1",s:"media",t:"La primera semana del piloto la mercancía llegó sin lista de empaque, y hay tiendas que solo reciben hasta el mediodía.",ev:"E-53"},{id:"9c.2",s:"baja",t:"La ruta, los horarios de recepción y la lista de empaque viajan impresos con el chofer.",ev:"E-70"}],
 cifras:["Pedido a tienda en Panamá: de 13 días a 2 [E-69]", "Flota propia en Caracas: 3 camionetas [E-34]"],
 personas:["Tráfico PA (factura y liquida) · Jovanna West", "Logística PA · Fernando Alvarado", "Operaciones VE · Vladimir Castillo"],sistemas:["EBS", "Odoo", "Papel"],proc:["7.3", "7.4", "7.5"],src:"E-03 · E-34 · E-47 · E-53 · E-69 · E-70 · SC-01 · SC-07",
 trasp:{ofi:1,lim:0,ext:0,sc:0,inf:2,ver:"inf"}},

{id:"10c",lane:"tie",x:865,y:720,dir:"l",lab:"above",wrap:15,grp:"Venta por canal",tramo:"T12 · Tiendas",t:"Recepción en tienda",depto:"Retail",sis:"Papel · Odoo",gente:"Tiendas · Blas",ev:"solida",
 hoy:"La tienda cuenta pieza por pieza contra la lista de empaque. En Panamá el supervisor compara lo facturado con su pedido y valida el traslado que tenía en borrador: solo entonces la mercancía queda disponible para vender. En Venezuela la tienda chequea con su hoja y, si falta algo, llama.",
 pasos:["La tienda cuenta pieza por pieza contra la lista de empaque [E-53 · SC-02]", "El supervisor compara uno por uno lo facturado con su pedido [E-53]", "Valida el traslado de la bodega de la ciudad a la tienda, que estaba en borrador [E-53]", "Venezuela: la tienda chequea con su hoja y llama si falta algo [E-40]", "Inventario selectivo 2–3 veces por semana con la app de WMS en tablet [E-53 · SC-02]"],
 trombos:[{id:"10c.1",s:"alta",t:"La mercancía está en la tienda pero no se puede vender hasta el doble registro, que depende de un solo supervisor.",ev:"E-53"},{id:"10c.2",s:"media",t:"En Venezuela un faltante en la tienda se resuelve llamando y sin registro: empieza «la búsqueda del inventario perdido».",ev:"E-40"}],
 cifras:[],
 personas:["Supervisión de tiendas PA · Blas García", "Ventas al detal VE · María Eugenia Villegas"],sistemas:["Papel", "Odoo", "App WMS (tablet)"],proc:["9.3", "7.8"],src:"E-40 · E-53 · SC-02",
 trasp:{ofi:2,lim:0,ext:0,sc:0,inf:3,ver:"inf"}},

{id:"11c",lane:"tie",x:720,y:720,dir:"l",lab:"above",wrap:15,grp:"Venta por canal",tramo:"T12 · Tiendas",t:"Venta en tienda",depto:"Retail · Visual",sis:"Odoo POS · BPOS",gente:"Retail · Handani",ev:"solida",
 hoy:"Todas las tiendas venden con Odoo POS. En Venezuela el cobro sale de Odoo hacia BPOS, de Megasoft, y la impresora fiscal. Casio se exhibe por línea según sus parámetros y Cubitt por color. Visual implementa las artes y promociones que manda mercadeo.",
 pasos:["Venta en Odoo POS; en Panamá con efectivo, tarjeta, transferencia y pago móvil [SC-02 · E-53]", "Venezuela: tasa del día al abrir; BPOS integra varios bancos fuera de Odoo [E-47 · E-33]", "Una unidad exhibida por modelo; el resto se guarda [SC-02]", "Retail regional y la dirección comercial fijan metas por país; la gerencia de tiendas las baja a cada tienda [E-47]"],
 variantes:"Unas 50 tiendas en la región: Venezuela 21 a agosto, con aperturas en curso; Panamá unas 10; Colombia 2 islas y un flagship; Guatemala con operador; Costa Rica del socio, y franquicias Casio en Honduras y República Dominicana.",
 trombos:[{id:"11c.1",s:"media",t:"No se registra la venta perdida cuando el cliente pide algo que no hay.",ev:"SC-02"},{id:"11c.2",s:"media",t:"Productos que llegan sin precio de venta bloquean la venta.",ev:"E-53"},{id:"11c.3",s:"media",t:"En Venezuela Internet y bancos fallan a diario, y el soporte de tiendas depende de una persona todos los días.",ev:"E-33 · E-07"},{id:"11c.4",s:"media",t:"Las promociones pasaron de 1 a 5–6 por país al mes, con artes que hubo que rehacer.",ev:"E-50"}],
 cifras:["Isla: unos 30.000 USD de venta al mes; tienda Cubitt de Metromall: unos 50.000 [SC-02]", "Montaje: kiosco unos 15.000 USD, tienda unos 60.000 [SC-02]"],
 personas:["Retail regional · Handani Mora", "Ventas al detal VE · María Eugenia Villegas", "Supervisión de tiendas PA · Blas García", "Visual regional · Reyna Barraza", "Supervisión Cubitt VE · Carlos Márquez", "Supervisión Casio VE · Carlos Velásquez"],sistemas:["Odoo POS", "BPOS (Megasoft)", "Impresora fiscal", "Follow Up", "Correo", "WhatsApp"],proc:["9.6", "9.7", "9.13", "16.7"],src:"E-07 · E-08 · E-33 · E-47 · E-50 · E-53 · E-55 · SC-02",
 trasp:{ofi:3,lim:1,ext:4,sc:1,inf:2,ver:"mix"},mk:{tipo:"P·L",t:"Visual instala lanzamientos y 5–6 promociones por país al mes; en Venezuela cada una exige permiso previo.",ev:"E-50 · E-31"}},

{id:"12c",lane:"tie",x:575,y:720,dir:"l",lab:"above",wrap:15,grp:"Venta por canal",tramo:"T12 → T16 · Cierre",t:"Cierre de caja",depto:"Retail · Tesorería",sis:"Excel · papel",gente:"Cierre · Blas",ev:"solida",
 hoy:"Al cerrar, cada tienda cuadra la caja por medio de pago y deposita. Después digita a mano tres datos, venta, unidades y transacciones, en el cuadro de retail regional. En Caracas el efectivo viaja con el transporte a tesorería, y en Venezuela el reporte llega por correo en la noche.",
 pasos:["Panamá: fondo de 600 USD, cuadre con el cierre bancario y depósito en la agencia del centro comercial [SC-02 · E-53]", "Caracas: el efectivo va con el transporte a tesorería los lunes, miércoles y viernes [E-47]", "Interior de Venezuela: depósito en el banco y valija por MRW con los papeles [E-47]", "El cierre del día se digita en el cuadro compartido de retail regional [E-55]"],
 trombos:[{id:"12c.1",s:"media",t:"La venta diaria se digita a mano, con un formato por país, y las anomalías se detectan «a ojo».",ev:"E-55 · E-47"},{id:"12c.2",s:"media",t:"En Venezuela la caja se revisa a mano contra el reporte Z de la máquina fiscal.",ev:"E-38"}],
 cifras:["Cadencia: venta diaria, inventario semanal y P&L por tienda mensual, aún pendiente en Panamá y Venezuela [E-55]"],
 personas:["Supervisión de tiendas PA · Blas García", "Ventas al detal VE · María Eugenia Villegas", "Tesorería VE (recibe el efectivo) · Marvis Caraballo", "Retail regional (cuadro diario) · Handani Mora"],sistemas:["Odoo", "Excel / Drive (cuadro de retail)", "Correo", "Papel (valija, cuaderno)"],proc:["9.5", "9.15", "12.2", "9.2"],src:"E-38 · E-47 · E-53 · E-55 · SC-02",
 trasp:{ofi:2,lim:0,ext:0,sc:0,inf:6,ver:"inf"}},

{id:"SW",lane:"acc",x:1262,y:860,dir:"l",lab:"below",wrap:15,grp:"Venta por canal",tramo:"T13 · Web",t:"Surtido de la bodega web",depto:"E-commerce · Bodega",sis:"Odoo · teléfono",gente:"Surtido · Jesmir",ev:"parcial",
 hoy:"La web vende de su propia bodega, que se surte como una tienda. En Venezuela el almacén web está separado del almacén principal para que las reservas del mayor no dejen a la web vendiendo stock comprometido; se surte los lunes y miércoles, y con un traslado automático cuando llega un contenedor. En Panamá la web sale de la bodega de la ciudad, no de la Zona Libre. Colombia no tiene bodega web: vende del stock único del país.",
 pasos:["Venezuela: e-commerce cruza en Odoo el inventario del almacén principal con el suyo y manda un sugerido [E-16 · E-41]", "El almacén principal lo monta en Odoo, lo prepara y lo baja los lunes y miércoles, «como una tienda» [E-34 · E-16]", "Disparadores: stock por acabarse, una promoción próxima o la llegada de un contenedor [E-41 · E-16]", "El almacén web chequea la mercancía y acepta el traslado [E-16]", "Panamá: planificación calcula, ventas ajusta, la dirección de compras aprueba y el pedido va a la Zona Libre; la salida se liquida y suma un día [E-39 · SC-06 · SC-03]"],
 variantes:"Venezuela tiene almacén web propio; Panamá surte la web desde la bodega de la ciudad, que comparte con el mayor local; Colombia no tiene bodega web.",
 trombos:[{id:"SW.1",s:"media",t:"E-commerce no se entera de lo que va a llegar: el traslado automático aparece cuando llega el contenedor.",ev:"E-16"},{id:"SW.2",s:"media",t:"Mientras se reciben traslados, el almacén web deja de despachar.",ev:"E-41"},{id:"SW.3",s:"baja",t:"Desde la Zona Libre no se despacha en el día: cada salida se liquida y suma un día.",ev:"SC-06 · SC-03"}],
 cifras:[],
 personas:["Ventas web VE · Jesmir Flores", "Planificación · Jimena Sánchez", "Mayor PA · Edumar Escalona"],sistemas:["Odoo", "WMS (tablet)", "Teléfono", "Portal DMC"],proc:["10.12", "7.8"],src:"E-14 · E-16 · E-34 · E-39 · E-41 · SC-03 · SC-06",
 confirmar:"Cómo se recibe en la bodega de la ciudad lo que llega de la Zona Libre, y con qué frecuencia se surte el almacén web en Venezuela.",
 trasp:{ofi:4,lim:0,ext:1,sc:1,inf:2,ver:"mix"}},

{id:"8d",lane:"web",x:1155,y:800,dir:"l",lab:"above",wrap:15,grp:"Venta por canal",tramo:"T13–T16 · Web y pago",t:"Pedido y pago",depto:"E-commerce",sis:"Cashea · Shopify",gente:"Web · Jesmir Flores",ev:"solida",
 hoy:"En Venezuela la venta digital entra por Cashea, que es cerca del 80 %, por las webs de Shopify, por WhatsApp y por MercadoLibre. Antes de preparar se valida el pago: Cashea se filtra en su portal, la web de Cubitt tiene pasarela y los pagos por WhatsApp se confirman uno por uno en un grupo de Lark contra el banco, también los domingos. Recién entonces el pedido se «manda a preparación» en Odoo. En Panamá y Colombia confirma el pago contabilidad.",
 pasos:["E-commerce publica los productos en Cashea y MercadoLibre cuando la mercancía ya llegó [E-16]", "Cashea cae al portal del comercio; una persona filtra lo pagado y lo confirma en Odoo [E-41]", "WhatsApp (Mercately): el asesor vende con link de Cashea, directo en Odoo o con el link de la web [E-16 · E-41]", "Pasarela de pago en la web de Cubitt desde hace 1–2 meses [E-41]", "Pago móvil por WhatsApp: validación manual en el grupo «Confirmaciones» [E-41]", "Cashea financia al cliente; desde el 15-jul hay 0 % de inicial para su nivel más alto [E-41]", "E-commerce «manda a preparación» en Odoo, con la instrucción de envío [E-41]", "Una venta a crédito tiene que pasar al mayor [E-41]", "En Panamá y Colombia confirma contabilidad [E-02]"],
 variantes:"Colombia vende por Shopify y 9 marketplaces y es el primer canal online del grupo. Kenex USA vende en 15 marketplaces con Shopify y QuickBooks.",
 trombos:[{id:"8d.1",s:"alta",t:"La integración de Cashea con Odoo trae pedidos cancelados y sin datos de contacto: Excel paralelo y una persona dedicada solo a filtrar.",ev:"E-41"},{id:"8d.2",s:"media",t:"La web se entera de lo nuevo cuando la mercancía ya llegó; no hay plan de lanzamiento.",ev:"E-16"},{id:"8d.3",s:"media",t:"Canal de chat sobrecargado: unas 6.000 conversaciones al mes solo de Cubitt en Venezuela.",ev:"E-41 · E-26"},{id:"8d.4",s:"alta",t:"En Venezuela el mismo equipo que vende valida sus pagos: falta separar esas dos funciones.",ev:"E-41 · E-58"},{id:"8d.5",s:"media",t:"La confirmación vive en un chat y no en Odoo; no hay un panel de pagos aprobados.",ev:"E-41"},{id:"8d.6",s:"media",t:"En Panamá, en junio se conciliaban los pagos de abril.",ev:"E-02"}],
 cifras:["Julio de 2026: 5.063 órdenes en Venezuela [E-41]", "Cashea: unos 3.000 pedidos al mes de Cubitt y 1.000 de Casio [E-16]", "Crecimiento cercano al 230 % desde julio de 2025 [E-16]", "Validaciones manuales: de 30–40 al día a 10–15 [E-41]"],
 personas:["Ventas web VE · Jesmir Flores", "Pedidos Cashea VE · Jeyker Martínez", "Webs Shopify · Cynthia de la Barrera", "Venta online PA · Reinaldo Méndez", "Venta online PA · Luis Peroza", "Atención al cliente PA · Patrick Corujo", "E-commerce regional · Clara Arosemena", "Marketplaces CO · Tatiana Rodríguez", "Tesorería VE (divisas) · Verónica Mejías", "Presidencia (inicial de Cashea) · Bernardo Roizental"],sistemas:["Cashea", "Shopify", "Mercately (WhatsApp)", "MercadoLibre (vía Mercatech)", "Odoo", "Excel", "Chat de Lark", "Banca en línea", "Pasarela de pago (web Cubitt)"],proc:["10.3", "10.4", "10.6", "10.7", "10.8"],src:"E-02 · E-11 · E-16 · E-26 · E-30 · E-41 · E-58 · SC-03",aprob:"La presidencia decide la cuota inicial de Cashea.",
 trasp:{ofi:8,lim:4,ext:6,sc:2,inf:5,ver:"mix"},mk:{tipo:"P·L",t:"E-commerce activa promociones y banners regionales, y publica lo nuevo cuando la mercancía ya llegó.",ev:"E-42 · E-16"}},

{id:"9d",lane:"web",x:1010,y:800,dir:"l",lab:"above",wrap:15,grp:"Venta por canal",tramo:"T15 · Despacho web",t:"Preparación y envío",depto:"Logística web",sis:"tablet · papel",gente:"Log. web · Ricardo",ev:"solida",
 hoy:"En Venezuela el pedido aparece en la tablet del almacén web, se escanea y se etiqueta. La factura es física y va dentro del paquete, así que la caja queda abierta hasta que llega. Después se emparejan factura, guía y caja, y se entregan al courier.",
 pasos:["Tablet con WMS: el operario ve canal, producto y cantidad, y escanea [E-41]", "Foto de la etiqueta a un grupo para que facturen [E-41]", "Guía de Cashea, MRW o Zoom; si falla, se hace a mano en un archivo compartido [E-41]", "La factura fiscal sale de Odoo; desde el 17 de agosto también es digital [E-38]"],
 variantes:"En Panamá hay un operario de bodega para e-commerce y garantías, contabilidad factura y el courier integrado genera la guía solo.",
 trombos:[{id:"9d.1",s:"alta",t:"Cajas abiertas esperando la factura física.",ev:"E-41 · E-04"},{id:"9d.2",s:"alta",t:"El almacén web es pequeño para el volumen y se embala afuera: «un diciembre no vamos a poder».",ev:"E-16 · E-41"}],
 cifras:["150–200 envíos al día; unos 800 escaneados en un fin de semana [E-41]", "Diciembre: entre +120 % y +160 % [E-16 · E-41]"],
 personas:["Logística web VE · Ricardo Castillo", "Operaciones web VE · Leonardo Guevara", "Facturación web VE · Alexandra Gil"],sistemas:["WMS (tablet)", "Odoo", "Papel (factura física, guías)", "Archivo compartido de guías", "Excel", "MRW / Zoom"],proc:["10.9", "10.10"],src:"E-02 · E-04 · E-16 · E-38 · E-41 · SC-03",
 trasp:{ofi:2,lim:0,ext:1,sc:0,inf:6,ver:"inf"}},

{id:"10d",lane:"web",x:865,y:800,dir:"l",lab:"above",wrap:15,grp:"Venta por canal",tramo:"T15 · Entrega web",t:"Entrega al cliente",depto:"Logística web",sis:"courier · WhatsApp",gente:"Envíos · Ricardo",ev:"solida",
 hoy:"MRW recoge a diario y Zoom martes, jueves y viernes; también hay motorizados y retiro en la oficina. El seguimiento y el reclamo al courier los hace el equipo web, y si un paquete se pierde la pérdida la asume la empresa. En Panamá la guía de Entrego sale sola; con los couriers no integrados, el vendedor le pasa la guía al cliente por WhatsApp.",
 pasos:["MRW recoge a diario y Zoom martes, jueves y viernes [E-41]", "Motorizados en Caracas, con las rutas en Drive y en una hoja impresa [E-16 · E-41]", "Seguimiento y reclamo al courier; si se pierde, «siempre perdemos» [E-41]", "Panamá: Entrego genera la guía con seguimiento [E-02]", "Panamá: con los couriers no integrados, el vendedor manda la guía al cliente por WhatsApp [E-02]"],
 trombos:[{id:"10d.1",s:"media",t:"No hay panel de despacho: cada asesor pierde cerca de una hora al día buscando si un pedido salió.",ev:"E-41"},{id:"10d.2",s:"media",t:"Cuando el courier pierde un paquete, la pérdida la asume la empresa: «siempre perdemos».",ev:"E-41"}],
 cifras:[],
 personas:["Logística web VE · Ricardo Castillo", "Guías Cashea VE · Jeyker Martínez", "Atención al cliente PA · Patrick Corujo"],sistemas:["MRW / Zoom", "Drive", "WhatsApp (Panamá)", "Papel"],proc:["10.11"],src:"E-02 · E-16 · E-41",
 trasp:{ofi:0,lim:0,ext:1,sc:1,inf:3,ver:"inf"}},

{id:"13",lane:"main",x:320,y:690,dir:"l",lab:"below",grp:"Dinero",tramo:"T16 · Cobro",t:"Cobro y crédito",depto:"Crédito y cobranza",sis:"Odoo · Lark · correo",gente:"Cobros · Noel y Yajaira",ev:"solida",
 hoy:"Los carriles de venta se unen en el cobro, pero cada país cobra distinto. Panamá tiene crédito formal con plazos, afiliación y un indicador de riesgo, y registra los pagos el mismo día. En Venezuela el alta de un cliente del mayor se hace solo con el RIF, sin límites ni plazos de crédito, y los vendedores negocian y registran pagos mixtos en varias monedas. En Colombia el mayor vende a crédito sin política escrita y la cartera se revisa cada semana.",
 pasos:["Panamá: afiliación en Lark y debida diligencia de crédito antes de otorgarlo [E-62]", "Plazos de 30 a 120 días; los cambios de condición van por un flujo de Lark [E-62]", "Venezuela: el vendedor registra el pago en la factura de Odoo con una plantilla [E-48]", "Cuentas por cobrar valida contra los cortes bancarios que tesorería comparte en Drive [E-48]", "Tiendas y web cobran al contado; Cashea abona a medida que cobra sus cuotas [E-15 · E-43]", "Colombia: el vendedor cobra y su comisión se paga sobre lo recaudado; desde enero se factura y se cobra directo a las cadenas [E-14 · E-11]", "Colombia: contabilidad confirma los pagos web y una persona revisa la cartera cada semana [E-02 · E-46]"],
 variantes:"Aquí se unen los carriles de venta. El carril de países no se cobra aquí: los países le compran a la casa matriz y lo saldan en el cuadre entre empresas (15).",
 trombos:[{id:"13.1",s:"alta",t:"Venezuela todavía no tiene una política de crédito para el mayor: faltan límites, plazos y bloqueo de morosos.",ev:"E-48"},{id:"13.2",s:"alta",t:"El saldo de clientes en el sistema no refleja la deuda real: hay cobros de meses anteriores sin registrar.",ev:"E-35 · E-48"},{id:"13.3",s:"media",t:"El crédito a clientes del exterior no tiene contrato ni comité.",ev:"E-62"},{id:"13.4",s:"media",t:"Los vendedores venden y cobran; en Panamá hay tres canales distintos para reportar un pago.",ev:"E-39 · E-36"}],
 cifras:["Panamá: cartera de 6–7 M USD y morosidad de 3,1 % [E-62]", "Venezuela: 610 mil USD vencidos, 113 mil a más de 120 días [E-48]"],
 personas:["Crédito y cobros PA · Noel Correa", "Cobros exterior PA · Víctor Ortega", "Tesorería PA · Norman Vanegas", "Mayor PA (aprueba crédito) · Edumar Escalona", "Gerencia comercial · Andrés Roizental", "CxC VE · Yajaira Cortorreal", "Tesorería VE (cortes bancarios) · Ali Carmona", "Mayor VE · Andrés Márquez"],sistemas:["Odoo", "Lark", "Correo", "Excel", "Drive", "Portal SENIAT", "Portal de Cashea"],proc:["13.5", "13.6", "8.15"],src:"E-02 · E-11 · E-14 · E-15 · E-35 · E-36 · E-39 · E-43 · E-46 · E-48 · E-62",
 confirmar:"Cómo cobran las tiendas de Colombia, los plazos de crédito por cadena y la comisión que descuenta Cashea al liquidar.",
 trasp:{ofi:6,lim:1,ext:2,sc:2,inf:8,ver:"mix"},mk:{tipo:"C·P",t:"Las activaciones con clientes y las promociones posteriores a la venta se liquidan como notas de crédito.",ev:"E-49 · E-62 · E-67"}},

{id:"14",lane:"main",x:120,y:570,dir:"u",lab:"right",grp:"Dinero",tramo:"T17 · Conciliación",t:"Conciliación",depto:"Contabilidad",sis:"Excel · Odoo · portal de Cashea",gente:"Contabilidad · Padovani, Ramírez, Chen",ev:"solida",
 hoy:"Panamá concilia a diario en Odoo con cuentas transitorias y ya revisa las cajas dentro del sistema. Venezuela concilia a mano en Excel, en dos etapas: lo vendido contra lo cobrado, y lo cobrado contra el banco. Colombia cruza en Excel los reportes de cada marketplace.",
 pasos:["Panamá: extracto diario en Odoo; las transitorias se revisan dos veces al mes [E-44]", "Venezuela: caja contra el reporte Z, luego lo cobrado contra los estados de cuenta [E-38]", "Cashea se cruza entre el estado de cuenta del banco y el portal de Cashea [E-38]", "Colombia: una persona cruza en Excel el reporte de Odoo con el de cada plataforma [E-46]"],
 trombos:[{id:"14.1",s:"alta",t:"En Venezuela 8–10 personas concilian y van unos dos meses atrasadas.",ev:"E-04 · E-38"},{id:"14.2",s:"media",t:"Cashea se concilia fuera de Odoo, contra su propio portal.",ev:"E-15 · E-43"},{id:"14.3",s:"media",t:"Cerca del 60 % de las ventas en Venezuela genera diferencial cambiario, que se ajusta cuota por cuota.",ev:"E-38"}],
 cifras:["Panamá concilia 6 empresas; pasó de un día a 20 minutos [SC-05]"],
 personas:["Contabilidad VE · Víctor Padovani", "Contabilidad CO · Marcela Ramírez", "Contabilidad PA · Ian Chen", "Conciliación PA · Ligia Ojeda", "Conciliación PA · Yajaira Moreno", "Contabilidad PA (transitorias) · Fernando Barría", "Contabilidad PA (transitorias) · Yamanis Gálvez", "Tesorería VE (Cashea) · Ali Carmona"],sistemas:["Excel", "Odoo", "Portal de Cashea", "Correo", "Papel (conciliación impresa)", "Lark (tarjetas)"],proc:["12.3", "12.2", "10.8"],src:"E-04 · E-15 · E-38 · E-43 · E-44 · E-46 · SC-05",
 trasp:{ofi:2,lim:0,ext:1,sc:1,inf:6,ver:"inf"}},

{id:"15",lane:"main",x:120,y:470,dir:"u",lab:"right",grp:"Dinero",tramo:"T17 · Intercompañía",t:"Cuadre entre empresas",depto:"Contabilidad · Tesorería",sis:"Excel · Odoo ×3 · correo",gente:"CxC/CxP · Noel Correa y Felipe Alain",ev:"parcial",
 hoy:"Los países le compran a la casa matriz como clientes y registran sus facturas en su propio Odoo. Entre las empresas del grupo quedan saldos por cuadrar: gastos que una empresa paga por otra, tarjetas compartidas y sistemas contables que no se hablan.",
 pasos:["Cada país registra la factura de la casa matriz en su propio Odoo [E-65]", "Los gastos pagados en Panamá por cuenta de otros países se registran como cuentas por cobrar a esas empresas [E-61]", "Desde agosto se cuadran cada mes los saldos entre las empresas de Panamá [E-61]"],
 trombos:[{id:"15.1",s:"alta",t:"Las cuentas por cobrar entre empresas del grupo se llevan pero no se gestionan, y el cuadre es manual e irregular.",ev:"E-61"},{id:"15.2",s:"media",t:"Pagos cruzados con tarjetas: hasta cuatro asientos por un solo movimiento.",ev:"E-61"},{id:"15.3",s:"media",t:"Los Odoo de cada país no están conectados; los estados de cuenta se piden a mano.",ev:"E-65"}],
 cifras:[],
 personas:["CxC PA · Noel Correa", "Tesorería PA · Felipe Alain", "Tesorería PA · Norman Vanegas", "CxP VE · Andrés Largo"],sistemas:["Odoo (tres instancias sin conexión)", "Excel", "Correo", "Claude (conciliación)"],proc:["13.7", "13.2"],src:"E-61 · E-62 · E-65",
 trasp:{ofi:2,lim:0,ext:0,sc:0,inf:5,ver:"inf"}},

{id:"16",lane:"main",x:120,y:370,dir:"u",lab:"right",grp:"Dinero",tramo:"T17 · Cierre",t:"Cierre y reporte",depto:"Contabilidad · Finanzas",sis:"Excel · WhatsApp · Odoo",gente:"CFO · Jaime González",ev:"solida",
 hoy:"Panamá cierra cada mes y Finanzas presenta los números en el comité de finanzas cada 15 días. Venezuela lleva el cierre atrasado y solo presenta el estado de resultados. No hay un consolidado del grupo, y las ventas y el margen del mes se comparten por WhatsApp.",
 pasos:["Panamá: contabilidad revisa con Finanzas el resultado por tienda y el balance [E-44]", "Comité de finanzas quincenal, los miércoles, con la Junta [E-44 · E-23]", "Venezuela: el reporte a la dirección es un Excel con datos bajados de Odoo [E-38]", "Colombia: cierre mensual firmado por contabilidad, la revisoría fiscal y la gerencia del país [E-46]"],
 trombos:[{id:"16.1",s:"alta",t:"Venezuela todavía no cierra el mes: a finales de agosto se revisaba abril.",ev:"E-15 · E-38 · E-65"},{id:"16.2",s:"media",t:"No hay un cálculo del costo real y del margen por producto.",ev:"SC-13"},{id:"16.3",s:"media",t:"No existe un estado consolidado del grupo.",ev:"E-01 · E-44"}],
 cifras:["La casa matriz cierra en 7–10 días; las tiendas de Panamá en unas 3 semanas [E-15]"],
 personas:["CFO · Jaime González", "Contabilidad PA · Ian Chen", "Contabilidad VE · Víctor Padovani", "Contabilidad CO · Marcela Ramírez", "Country manager CO (firma el cierre) · Joel Cohen"],sistemas:["Odoo", "Excel", "WhatsApp", "Lark (flujo de caja; tablero PMO)", "Reunión (comité)"],proc:["12.8", "12.9", "13.8"],src:"E-01 · E-08 · E-15 · E-23 · E-38 · E-44 · E-46 · E-65 · SC-13",
 trasp:{ofi:3,lim:0,ext:0,sc:0,inf:7,ver:"inf"}},

{id:"17",lane:"main",x:120,y:260,dir:"u",lab:"right",grp:"Dinero",tramo:"T19 · Sell-out",t:"Sell-out y vuelta al plan",depto:"BI · Planificación",sis:"Correo · Excel · BI",gente:"BI · Alexis Mujica",ev:"solida",
 hoy:"La venta de los clientes vuelve para planificar la siguiente compra. Los 41 clientes del mayor mandan su sell-out por correo, cada uno en su formato; BI lo normaliza en Microsoft Fabric y lo publica en Power BI. Las tiendas propias entran por la API de Odoo y a mano en el cuadro de retail. De ahí el dato vuelve a compras, planificación y la dirección.",
 pasos:["El cliente exporta de su ERP y se lo manda a su vendedor, que lo reenvía a BI [E-18]", "Fabric lleva los 41 formatos a una tabla normalizada [E-18]", "Colombia presenta su Excel Máster a la Junta cada martes [E-11 · E-14]", "Costa Rica manda reportes diarios desde su ERP; Kenex USA no reporta a Panamá [E-19 · E-30]"],
 trombos:[{id:"17.1",s:"alta",t:"El sell-out llega tarde, incompleto o con nombres propios del cliente, y ese producto queda por fuera.",ev:"E-18"},{id:"17.2",s:"media",t:"Cada país reporta en un formato distinto, y los reportes se rehacen para cada área.",ev:"E-55 · E-47"},{id:"17.3",s:"media",t:"El dato no llega a los vendedores ni a las compras de Cubitt.",ev:"E-18"}],
 cifras:["41 clientes y más de 1.000 tiendas [E-18]", "Presencia comercial en 14 países [E-18]"],
 personas:["BI (externo) · Alexis Mujica", "BI (externo) · Kenzie Pérez", "Retail regional · Handani Mora", "Reportería de compras · Vera Gavizon", "Planificación VE · Jimena Sánchez", "KAM Centroamérica · Jorge Ábrego", "Comercial CO · Santiago Ramírez"],sistemas:["Correo", "Excel", "WhatsApp", "API de Odoo", "Microsoft Fabric", "Power BI", "Lark (Colombia)", "Claude en Excel (Colombia)"],proc:["8.17", "9.2", "10.16", "2.7"],src:"E-10 · E-11 · E-14 · E-18 · E-19 · E-30 · E-47 · E-55",
 trasp:{ofi:1,lim:0,ext:2,sc:0,inf:9,ver:"inf"},mk:{tipo:"P",t:"Mercadeo recibe lo vendido y lo que no rota; con eso arma la grilla y las promociones del mes.",ev:"E-42 · E-49 · E-40 · E-18"}},

{id:"PCI",lane:"loop",x:300,y:305,dir:"r",lab:"below",hz:[0, -24],grp:"Bucles y accesos",tramo:"T19 · Reporte a Casio",t:"Reporte PCI a Casio",depto:"Compras Casio",sis:"Excel · correo",gente:"Reportería · Vera Gavizon",ev:"solida",
 hoy:"Cada mes compras y reportería arma para Casio el reporte de lo vendido en la zona. Sale de Odoo y requiere ajustes manuales para cuadrar compras y ventas. Dos veces al año los números se presentan en la convención con Casio.",
 pasos:["Sale de Odoo y se ajusta a mano [E-10]", "Cubre relojes, calculadoras y teclados en unos ocho países [E-10]", "Casio revisa el cumplimiento del forecast por país [E-10]"],
 trombos:[{id:"PCI.1",s:"alta",t:"Un reporte complejo que ocupa los primeros 10 días del mes y que solo una persona sabe hacer.",ev:"E-10"},{id:"PCI.2",s:"media",t:"El control de seriales de la línea exclusiva no está al día.",ev:"E-10"}],
 cifras:["Reporte mensual y convención con Casio dos veces al año [E-10]"],
 personas:["Reportería de compras · Vera Gavizon", "Dir. compras · Roberto Roizental"],sistemas:["Excel (desde Odoo)", "Correo (inferencia)"],proc:["6.3"],src:"E-10",
 trasp:{ofi:0,lim:0,ext:0,sc:0,inf:3,ver:"inf"}},

{id:"PV",lane:"loop",x:720,y:410,dir:"r",lab:"custom",lxy:[750, 440, "start"],grp:"Bucles y accesos",tramo:"T18 · Postventa",t:"Postventa",depto:"Servicio al cliente",sis:"Lark · Odoo · WhatsApp",gente:"Postventa · Patrick y Juseth",ev:"solida",
 hoy:"Lo que vuelve toma otra vía. Cubitt no se repara: dentro del año se reemplaza, de inmediato si la falla es de hardware o en hasta 7 días si la fábrica corrige el software. Casio sí se repara, con repuestos que se piden a Japón. Cada mes se concilia lo dañado y se desecha con un reciclador.",
 pasos:["Entrada por la tienda, el chat, el correo o el Cubi Café [E-64 · E-58]", "Diagnóstico, y reemplazo o caso en una tabla de Lark con acceso de la fábrica [E-64]", "Traslado en Odoo a la bodega de garantías; el nuevo se entrega al recibir el dañado [E-58]", "Formulario de Lark para la fábrica y tablero de garantías [E-58]", "Venezuela: orden en Syscore, luego NAF, Lark y Odoo; el reemplazo lo baja el almacén dos veces al día [E-51]"],
 variantes:"Por marca: Cubitt se reemplaza y Casio se repara. Por país: en Panamá, Colombia y Guatemala la tienda filtra; en Venezuela todo va al taller central de Caracas.",
 trombos:[{id:"PV.1",s:"alta",t:"En Venezuela un mismo caso pasa por cuatro sistemas: Syscore, NAF, Lark y Odoo.",ev:"E-51"},{id:"PV.2",s:"alta",t:"Los repuestos de Casio de toda la región dependen de una sola persona.",ev:"E-51 · E-02"},{id:"PV.3",s:"media",t:"En Venezuela falta stock para los cambios y se pide prestado al almacén web.",ev:"E-51"},{id:"PV.4",s:"media",t:"Hasta hace poco no había proceso de scrap y la mercancía dañada se acumulaba.",ev:"E-04"}],
 cifras:["Venezuela: unas 700 órdenes de servicio al mes [E-51]", "Garantías de Cubitt: históricamente menos de 1,5 %, hoy 3,5 % en algunos productos [E-58]"],
 personas:["Atención al cliente regional · Patrick Corujo", "Soporte técnico PA · Jesús Arratia", "Soporte técnico PA · Eloy Morcillo", "Especialista de producto · Rogmarc González", "Servicio técnico VE · Juseth González", "Soporte web VE · Johan Lucena", "Soporte web VE · Gustavo Hernández", "Almacén VE (garantías) · Elvis Badillo"],sistemas:["Lark", "Odoo", "Mercately", "Syscore", "NAF", "WeChat", "WhatsApp", "Correo", "Excel (repuestos Casio)"],proc:["11.1", "11.2", "11.3", "11.4", "11.5", "11.9", "7.7"],src:"E-02 · E-04 · E-51 · E-58 · E-64 · SC-03",aprob:"La presidencia aprueba la compra de repuestos de Casio.",
 trasp:{ofi:7,lim:0,ext:3,sc:3,inf:8,ver:"mix"}},

{id:"MK",lane:"acc",x:1083,y:470,dir:"d",lab:"left",hz:[26, 0],grp:"Bucles y accesos",tramo:"TX · Mercadeo",t:"Mercadeo",depto:"Mercadeo · Visual",sis:"WhatsApp · Drive · Lark",gente:"Mercadeo · Natasha Betancourt",ev:"solida",
 hoy:"Mercadeo no compra ni vende, pero entra a la vía en tres puntos: el lanzamiento, cuando el producto ya se está fabricando; las promociones mensuales para rotar inventario; y el co-marketing con los clientes del mayor. Casio aprueba sus campañas en Casio Brasil; las de Cubitt pasan por la Junta.",
 pasos:["El key visual regional sale de Panamá y cada país lo adapta [E-42 · E-31]", "Visual implementa en las tiendas y la web activa las promociones [E-31 · E-16]", "En Venezuela cada promoción necesita permiso de la SUNDDE, que tarda 15 días hábiles [E-31]", "Las activaciones con clientes se liquidan como notas de crédito [E-49 · E-62]"],
 trombos:[{id:"MK.1",s:"alta",t:"Las piezas de Cubitt pasan por varias instancias de aprobación con criterios distintos; se pierden unas 4 semanas y se compromete el plazo del permiso.",ev:"E-42 · E-31"},{id:"MK.2",s:"media",t:"Lanzamientos sin stock para comunicar: en Colombia las primeras piezas se fueron a comercial.",ev:"E-56"},{id:"MK.3",s:"media",t:"Mercadeo no ve el inventario ni recibe el dato de venta de forma sistemática: «trabajamos muy a ciegas».",ev:"E-42 · E-22"}],
 cifras:["Unas 5 promociones por país al mes [E-22]"],
 personas:["Marketing regional · Natasha Betancourt", "Marketing VE · Valentina Abreu", "Marketing Cubitt PA · Sofiana Tovar", "Marketing Casio regional · Kelly Marimón", "Brand manager Casio · Félix Almendral", "Marketing CO · Lesly Laverde", "Visual regional · Reyna Barraza"],sistemas:["Lark", "WhatsApp", "Drive", "Dropbox", "Correo", "Papel"],proc:["16.1", "16.2", "16.7", "2.5"],src:"E-16 · E-22 · E-31 · E-40 · E-42 · E-49 · E-50 · E-56 · E-60 · E-62 · E-63",aprob:"La Junta aprueba las artes de Cubitt y la dirección comercial cada promoción.",
 confirmar:"Quién aprueba cada promoción: el retail regional (la pieza) o la dirección comercial (el descuento).",
 trasp:{ofi:3,lim:2,ext:1,sc:1,inf:8,ver:"inf"}},

{id:"US",lane:"exit",x:1004,y:36,dir:"r",lab:"right",lx:44,grp:"Bucles y accesos",tramo:"T11 · Kenex USA",t:"Kenex USA",depto:"Kenex USA",sis:"Shopify · QuickBooks · papel",gente:"Kenex USA · Isabella y Alejandro",ev:"parcial",
 hoy:"Kenex USA sale de la vía: compra directo a las fábricas de China, recibe en Miami y vende en 15 marketplaces. Panamá solo le manda urgencias. Reporta sus números una vez al mes a la dirección, no a Panamá.",
 pasos:["La operación arma la lista de lo que hace falta para los próximos meses [E-30]", "Dos personas en la bodega cuentan lo que llega; la factura se registra en QuickBooks [E-30]", "Las órdenes de Amazon y Whatnot se imprimen a diario para la bodega [E-30]"],
 trombos:[{id:"US.1",s:"media",t:"Opera fuera de los procesos del grupo y no comparte su dato con Panamá.",ev:"E-01 · E-30"},{id:"US.2",s:"media",t:"Miles de devoluciones de Amazon al mes sin registro de su estado.",ev:"E-30"}],
 cifras:["15 marketplaces [E-30]", "Un evento de TV vendió 100.000 USD [E-30]"],
 personas:["Operación Kenex USA · Isabella Roizental", "Dir. I+D (compra a fábricas) · Alejandro Roizental"],sistemas:["Shopify", "QuickBooks", "Sellerboard", "Portales de marketplaces", "Papel (órdenes impresas)", "Lark (comunicación)"],proc:["10.5"],src:"E-01 · E-06 · E-30",
 confirmar:"Aduana en EE.UU., y si la orden a la fábrica la emite siempre I+D.",
 trasp:{ofi:1,lim:0,ext:5,sc:5,inf:5,ver:"fuera"}}
  ],

  // Cobertura por tramo del esquema común con que se leyeron las entrevistas.
  cobertura: [
    ["T01", "Plan de demanda", "1", "solida", "Cubitt sí tiene forecast comercial por mercado en Excel; falta saber cómo baja a la orden de compra."],
    ["T02", "Producto Cubitt", "2a", "solida", ""],
    ["T03", "Compra Casio", "2b · 3b", "solida", "Con qué criterio asigna Casio el cupo."],
    ["T04", "Decisión y orden de compra", "3a · 2b", "solida", "Quién integra de forma estable el comité de compra."],
    ["T05", "Pago a proveedores", "4a · 3b", "parcial", "Carta de crédito y plazos contractuales con Casio; lead time de producción de Cubitt."],
    ["T06", "Producción y embarque", "4a · 4b", "parcial", "Puerto, naviera y contenedores por marca."],
    ["T07", "Llegada a Zona Libre", "5", "solida", ""],
    ["T08", "Bodega", "6 · 10b · SW", "solida", "Indicadores reales de exactitud y tiempos: hoy solo hay metas."],
    ["T09", "Asignación", "7", "parcial", "No hay regla escrita ni prioridad declarada entre países cuando no alcanza."],
    ["T10", "Venta al mayor", "8a", "solida", ""],
    ["T11", "Países propios", "8b · 9b · 10b · US", "solida", "Kenex USA y Guatemala de punta a punta."],
    ["T12", "Tiendas", "8c · 10c · 11c · 12c", "solida", "Tiendas de Colombia y franquicias."],
    ["T13", "Web", "8d · SW", "solida", "Volúmenes de Panamá y Colombia."],
    ["T14", "Socios y franquicias", "8b · 9b", "parcial", "Cómo compra y cobra Guatemala; aduana de Kenex USA."],
    ["T15", "Despacho y entrega", "9a · 9c · 9d · 10d", "solida", "Promesa de entrega al cliente final."],
    ["T16", "Cobro y crédito", "13 · 8d", "solida", "Plazos de crédito y medios de pago en Colombia; comisión de Cashea."],
    ["T17", "Conciliación y cierre", "14 · 15 · 16", "solida", "No existe consolidado del grupo."],
    ["T18", "Postventa", "PV", "solida", ""],
    ["T19", "Sell-out", "17 · PCI", "solida", "Cómo entra el dato de BI en la cantidad de la orden."],
    ["TX", "Mercadeo", "MK", "solida", ""]
  ],

  // Lo que la validación con el cliente tiene que confirmar.
  preguntas: [
    "¿Hay carta de crédito con Casio, cuáles son los plazos contractuales y cuál es el lead time de producción de las fábricas de Cubitt?",
    "¿Hay prioridad entre países cuando no alcanza, y quién la fija en cada marca?",
    "¿Cómo compra, factura y cobra Guatemala, y cómo pasa su aduana Kenex USA?",
    "¿Cómo cobran y cierran caja las tiendas de Colombia, y con qué plazos de crédito vende a las cadenas?",
    "¿Qué comisión descuenta Cashea al liquidar?",
    "¿Cómo se recibe en la bodega de la ciudad lo que llega de la Zona Libre?"
  ],
  cifrasConfirmar: [
    "Quién aprueba en última instancia la compra de Cubitt: hoy no hay un aprobador único formal.",
    "Referencias activas: unos 4.800 SKU operativos sobre unos 7.000 códigos; hay que contarlas en EBS y Odoo.",
    "Puntos de venta: Panamá unos 10 (11 con el punto de la Zona Libre); Venezuela 21 a agosto, con aperturas en curso."
  ]
};
