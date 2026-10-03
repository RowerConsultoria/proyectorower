// Fuente única del módulo «Circuito del negocio» del manual de Fase 2 (#/circuito).
// El flujo de cómo opera Kenex HOY (As-Is), del plan de demanda al cobro, dibujado
// como una vía de tren (03-oct-2026): línea troncal, ramales, cambios de agujas,
// frenos, señales de paso y la catenaria de mercadeo.
//
// ⚠️ Este archivo es GENERADO por `Rower/analisis-circuito-27sep/tren-03oct/
// construir-circuito.py` a partir de las fichas `estaciones-A..D.json` (fuera del
// repo). Editar el circuito = editar las fichas o el generador, nunca este archivo.
//
// Estructura de la venta en dos niveles:
//   · nivel 1, en el hub: 7 → ramal Mayor (clientes terceros) o ramal Países
//     (operaciones propias) · 8 pedido y liberación · 9 despacho · 10 llegada al país;
//   · nivel 2, en cada país: 10b → tiendas, mayor local o web · 11 pedido y reparto ·
//     12 despacho · 13 entrega o recepción · 14 venta · 15 caja;
//   · dinero: 16 cobro (empalme) → 20 sell-out, que vuelve al plan.
//
// ⚠️ Cliente-facing (lo lee el rol Junta): los frenos nombran roles, nunca personas;
// nada de pagos entre países ni sensibilidades fiscales; fichas en tono formal. Los
// nombres solo van en `jefe` y `tripulacion` («rol · nombre»).
//
// ⚠️ Cada freno lleva su código fijo en `id` («11e.1») y en `antes` el código que
// tenía como trombo hasta el 30-sep. La arquitectura de IA los cita por `id`
// (volcar-trombos.js): no se renumeran ni se reutilizan.
//
// `trasp` cuenta los traspasos de información de la estación: `ofi` (Odoo, Lark,
// EBS; de ellos `lim` por chat o calendario de Lark), `ext` (plataformas externas;
// de ellas `sc` sin conexión) e `inf` (sin sistema). `sistemasColor` clasifica cada
// herramienta. `circuito-render.js` lo pinta.
window.CIRCUITO = {
 "meta": {
  "corte": "03-oct-2026",
  "entrevistas": 87
 },
 "ramales": {
  "troncal": "Línea troncal",
  "cubitt": "Ramal Cubitt",
  "casio": "Ramal Casio",
  "mayor": "Ramal Mayor · clientes terceros",
  "paises": "Ramal Países · operaciones propias",
  "tiendas": "Sub-ramal Tiendas · dentro de cada país",
  "mayorlocal": "Sub-ramal Mayor local · dentro de cada país",
  "web": "Sub-ramal Web · dentro de cada país",
  "alimentacion": "Vía de alimentación del sub-ramal Web",
  "retorno": "Vía de retorno",
  "catenaria": "Catenaria",
  "independiente": "Línea independiente"
 },
 "grupos": [
  [
   "Compra por marca",
   "troncal",
   [
    "1",
    "2a",
    "3a",
    "4a",
    "2b",
    "3b",
    "4b"
   ],
   "El plan de demanda abre dos ramales de compra: Cubitt, marca propia, y Casio, marca representada."
  ],
  [
   "Estación central · Zona Libre",
   "troncal",
   [
    "5",
    "6",
    "7"
   ],
   "La mercancía llega, se recibe y se libera. En el 7, el primer cambio de agujas reparte entre Mayor y Países."
  ],
  [
   "Ramal Mayor",
   "mayor",
   [
    "8a",
    "9a"
   ],
   "Clientes terceros que compran a Kenex y se sirven desde Zona Libre. Empalma directo en el cobro."
  ],
  [
   "Ramal Países",
   "paises",
   [
    "8b",
    "9b",
    "10b"
   ],
   "Operaciones propias del grupo. En el 10b, el segundo cambio de agujas reparte entre los canales del país."
  ],
  [
   "Tiendas",
   "tiendas",
   [
    "11c",
    "12c",
    "13c",
    "14c",
    "15c"
   ],
   "Sub-ramal de cada país: reposición, despacho, recepción, venta y cierre de caja."
  ],
  [
   "Mayor local",
   "mayorlocal",
   [
    "11e",
    "12e",
    "13e"
   ],
   "Sub-ramal de cada país: clientes mayoristas locales servidos desde el stock del país."
  ],
  [
   "Web",
   "web",
   [
    "SW",
    "11d",
    "12d",
    "13d"
   ],
   "Sub-ramal de cada país: el surtido de su bodega, el pedido y su pago, el envío y la entrega."
  ],
  [
   "Dinero",
   "troncal",
   [
    "16",
    "17",
    "18",
    "19",
    "20"
   ],
   "Todos los ramales empalman en el cobro; el sell-out vuelve al plan."
  ],
  [
   "Retornos, catenaria y línea independiente",
   "retorno",
   [
    "PCI",
    "PV",
    "RT",
    "MK",
    "US"
   ],
   "Vías que regresan información o mercancía, el mercadeo que alimenta la línea y Kenex USA, que corre por su propia vía."
  ]
 ],
 "alias": {
  "8c": "11c",
  "9c": "12c",
  "10c": "13c",
  "8d": "11d",
  "9d": "12d",
  "10d": "13d",
  "11": "16",
  "12": "17",
  "13": "16",
  "14": "17",
  "15": "18"
 },
 "sistemasColor": {
  "App WMS": "ofi",
  "EBS": "ofi",
  "Flujo de Lark": "ofi",
  "Lark": "ofi",
  "Odoo": "ofi",
  "Odoo POS": "ofi",
  "Odoo ×3": "ofi",
  "PDT": "ofi",
  "tablet": "ofi",
  "WMS": "ofi",
  "WMS propio": "ofi",
  "Calendario de Lark": "lim",
  "Chat de Lark": "lim",
  "chat de Lark": "lim",
  "API de Odoo": "ext",
  "BI": "ext",
  "BPOS": "ext",
  "Cashea": "ext",
  "Fabric": "ext",
  "Follow Up": "ext",
  "Impresora fiscal": "ext",
  "MercadoLibre": "ext",
  "Microsoft Fabric": "ext",
  "MRW / Zoom": "ext",
  "Pasarela de pago": "ext",
  "Power BI": "ext",
  "Shopify": "ext",
  "Banca": "sc",
  "banca": "sc",
  "Banca en línea": "sc",
  "courier": "sc",
  "Mercately": "sc",
  "NAF": "sc",
  "PCGraph": "sc",
  "Portal B2B propio": "sc",
  "Portal de Cashea": "sc",
  "portal de Cashea": "sc",
  "Portal DMC": "sc",
  "Portal SENIAT": "sc",
  "Portales de aduana y permisos": "sc",
  "Portales de marketplaces": "sc",
  "QuickBooks": "sc",
  "Sellerboard": "sc",
  "Syscore": "sc",
  "Archivo compartido de guías": "inf",
  "Chat de grupo": "inf",
  "Claude": "inf",
  "Claude en Excel": "inf",
  "Correo": "inf",
  "correo": "inf",
  "De palabra": "inf",
  "de palabra": "inf",
  "Drive": "inf",
  "Dropbox": "inf",
  "Excel": "inf",
  "Excel / Drive": "inf",
  "Llamada": "inf",
  "llamada": "inf",
  "Papel": "inf",
  "papel": "inf",
  "Reunión": "inf",
  "Teléfono": "inf",
  "teléfono": "inf",
  "Teléfono / WhatsApp": "inf",
  "Teléfono/WhatsApp del vendedor": "inf",
  "WeChat": "inf",
  "WhatsApp": "inf"
 },
 "via": {
  "viewBox": "0 0 1400 990",
  "pos": {
   "1": [
    170,
    130,
    "above"
   ],
   "2a": [
    370,
    70,
    "above"
   ],
   "3a": [
    500,
    70,
    "above"
   ],
   "4a": [
    630,
    70,
    "above"
   ],
   "2b": [
    370,
    190,
    "below"
   ],
   "3b": [
    500,
    190,
    "below"
   ],
   "4b": [
    630,
    190,
    "below"
   ],
   "5": [
    830,
    130,
    "above"
   ],
   "6": [
    960,
    130,
    "above"
   ],
   "7": [
    1310,
    265,
    "left"
   ],
   "US": [
    800,
    24,
    "right"
   ],
   "8a": [
    1190,
    430,
    "above"
   ],
   "9a": [
    1075,
    430,
    "above"
   ],
   "8b": [
    1190,
    520,
    "above"
   ],
   "9b": [
    1075,
    520,
    "above"
   ],
   "10b": [
    960,
    520,
    "above"
   ],
   "11e": [
    780,
    610,
    "above"
   ],
   "12e": [
    665,
    610,
    "above"
   ],
   "13e": [
    550,
    610,
    "above"
   ],
   "11c": [
    780,
    700,
    "above"
   ],
   "12c": [
    665,
    700,
    "above"
   ],
   "13c": [
    550,
    700,
    "above"
   ],
   "14c": [
    435,
    700,
    "above"
   ],
   "15c": [
    320,
    700,
    "above"
   ],
   "SW": [
    848,
    790,
    "below"
   ],
   "11d": [
    780,
    790,
    "above"
   ],
   "12d": [
    665,
    790,
    "above"
   ],
   "13d": [
    550,
    790,
    "above"
   ],
   "16": [
    200,
    880,
    "below"
   ],
   "17": [
    80,
    770,
    "right"
   ],
   "18": [
    80,
    660,
    "right"
   ],
   "19": [
    80,
    550,
    "right"
   ],
   "20": [
    80,
    440,
    "right"
   ],
   "PCI": [
    205,
    300,
    "right"
   ],
   "PV": [
    620,
    300,
    "below"
   ],
   "RT": [
    620,
    365,
    "below"
   ],
   "MK": [
    1080,
    250,
    "above"
   ]
  },
  "grandes": [
   "7",
   "10b",
   "16"
  ],
  "lineas": [
   [
    "retorno",
    "M80,405 C80,345 140,300 205,300 C262,300 286,236 298,198"
   ],
   [
    "retorno",
    "M370,335 C390,335 390,300 420,300 L905,300 C935,300 948,270 948,148"
   ],
   [
    "retorno",
    "M370,335 C390,335 390,365 420,365 L905,365 C955,365 972,300 972,148"
   ],
   [
    "independiente",
    "M690,70 C715,70 715,24 745,24 L800,24"
   ],
   [
    "cubitt",
    "M255,130 C285,130 285,70 315,70 L690,70 C720,70 720,130 750,130"
   ],
   [
    "casio",
    "M255,130 C285,130 285,190 315,190 L690,190 C720,190 720,130 750,130"
   ],
   [
    "web",
    "M902,528 L902,760 Q902,790 872,790 L332,790 Q298,790 298,824 L298,850 Q298,880 268,880 L200,880"
   ],
   [
    "tiendas",
    "M890,528 L890,670 Q890,700 860,700 L316,700 Q282,700 282,734 L282,850 Q282,880 252,880 L200,880"
   ],
   [
    "mayorlocal",
    "M878,528 L878,580 Q878,610 848,610 L300,610 Q266,610 266,644 L266,850 Q266,880 236,880 L200,880"
   ],
   [
    "socio",
    "M1005,520 L1005,574"
   ],
   [
    "paises",
    "M1318,345 L1318,490 Q1318,520 1288,520 L890,520"
   ],
   [
    "mayor",
    "M1302,345 L1302,400 Q1302,430 1272,430 L290,430 Q250,430 250,470 L250,850 Q250,880 220,880 L200,880"
   ],
   [
    "troncal",
    "M200,880 L110,880 Q80,880 80,850 L80,180 Q80,130 130,130 L255,130"
   ],
   [
    "troncal",
    "M750,130 L1260,130 Q1310,130 1310,180 L1310,345"
   ]
  ],
  "columnas": [
   [
    1190,
    "8",
    "pedido y liberación",
    405
   ],
   [
    1075,
    "9",
    "despacho",
    405
   ],
   [
    960,
    "10",
    "llegada al país",
    405
   ],
   [
    780,
    "11",
    "pedido y reparto",
    585
   ],
   [
    665,
    "12",
    "despacho",
    585
   ],
   [
    550,
    "13",
    "entrega o recepción",
    585
   ],
   [
    435,
    "14",
    "venta en tienda",
    585
   ],
   [
    320,
    "15",
    "cierre de caja",
    585
   ]
  ],
  "agujas": [
   [
    1310,
    345,
    "cambio de agujas",
    "Mayor o Países",
    1292,
    "end"
   ],
   [
    890,
    520,
    "cambio de agujas",
    "tiendas, mayor local o web",
    872,
    "end"
   ]
  ],
  "rotulos": [
   [
    "CUBITT",
    440,
    92,
    "cubitt",
    ""
   ],
   [
    "CASIO",
    440,
    178,
    "casio",
    ""
   ],
   [
    "MAYOR",
    1252,
    452,
    "mayor",
    "clientes terceros"
   ],
   [
    "PAÍSES",
    1252,
    542,
    "paises",
    "operaciones propias"
   ],
   [
    "MAYOR LOCAL",
    440,
    630,
    "mayorlocal",
    ""
   ],
   [
    "TIENDAS",
    383,
    722,
    "tiendas",
    ""
   ],
   [
    "WEB",
    440,
    810,
    "web",
    ""
   ]
  ],
  "notas": [
   [
    "Costa Rica · socio",
    1018,
    570,
    "start"
   ],
   [
    "operación interna sin detalle",
    1018,
    584,
    "start"
   ],
   [
    "desde los clientes",
    350,
    332,
    "end"
   ],
   [
    "de todos los ramales",
    350,
    346,
    "end"
   ],
   [
    "vuelve a bodega",
    938,
    290,
    "end"
   ],
   [
    "se abre por marca",
    262,
    158,
    "end"
   ],
   [
    "se unen al llegar a Colón",
    756,
    158,
    "start"
   ],
   [
    "empalme: todos los",
    236,
    842,
    "end"
   ],
   [
    "ramales llegan al cobro",
    236,
    856,
    "end"
   ],
   [
    "aquí se salda el",
    98,
    697,
    "start"
   ],
   [
    "ramal Países",
    98,
    711,
    "start"
   ]
  ],
  "origenRetorno": [
   362,
   335
  ],
  "catenariaY": 250
 },
 "estaciones": [
  {
   "id": "1",
   "ramal": "troncal",
   "nivel": 0,
   "etapa": "1",
   "t": "Plan de demanda",
   "tramo": "T01 · Plan de demanda",
   "depto": "Comercial · Planificación",
   "jefe": "Dir. comercial y compras · Roberto Roizental",
   "ev": "solida",
   "hoy": "Cada diciembre la dirección comercial construye con los vendedores el plan anual por marca, cliente por cliente, y lo entrega a Finanzas como monto mensual. En Casio, la dirección de compras fija cada mes la cantidad a comprar con el sugerido de BI y la reposición de planificación. En Cubitt, ventas internacionales proyecta la venta por mercado y la revisa cada trimestre; la compra se activa cuando el inventario baja.",
   "pasos": [
    "La dirección comercial arma el plan anual por marca, vendedor y cliente, y lo reparte en meses con pesos estacionales [E-08]",
    "El monto mensual pasa a Finanzas; reportería de compras carga cada mes la venta real contra el plan [E-08 · E-10]",
    "En Casio, reportería de compras arma la sábana de compra y la dirección de compras fija la cantidad en la estación 2b [E-10 · E-08]",
    "Planificación calcula en Excel la reposición de Venezuela, a 3–4 meses, y la de tiendas, a 3–4 semanas con clasificación A/B/C [E-40]",
    "BI genera sugeridos de compra y de rebalanceo desde Fabric y Power BI; hoy se aplican en Casio y aún no en Cubitt [E-18 · E-10]",
    "En Cubitt, ventas internacionales proyecta por mercado sobre el año anterior más un crecimiento, lo reparte por meses y lo revisa cada trimestre [E-63]",
    "Compras traduce la proyección a unidades por modelo y color, con horizonte de 14 meses y tres meses de cobertura adicional [E-63]",
    "Cubitt no tiene calendario de compra: la decisión se activa cuando el inventario baja y se convoca al comité [E-06]"
   ],
   "variantes": "Cada marca sigue un ritmo propio. Casio se ajusta al calendario mensual que fija la casa matriz. Cubitt compra cuando el inventario baja y toma como primera referencia la necesidad de Venezuela.",
   "senal": "En Casio, la dirección comercial fija el plan y la dirección de compras decide la compra. En Cubitt decide el comité de compra, con revisión de la dirección.",
   "frenos": [
    {
     "id": "1.1",
     "grado": "detiene",
     "t": "Cuando falta producto, la línea del pedido se elimina en Odoo y la demanda no atendida no queda registrada para el plan siguiente.",
     "ev": "E-05 · E-08 · E-26",
     "antes": "1.1"
    },
    {
     "id": "1.2",
     "grado": "lento",
     "t": "En Casio conviven tres fuentes de sugerido de compra sin un responsable único que las concilie.",
     "ev": "E-08",
     "antes": "1.2"
    },
    {
     "id": "1.3",
     "grado": "lento",
     "t": "El modelo de BI no incorpora el pedido mínimo ni el tiempo de entrega de Cubitt, y sus resultados no llegan a los vendedores.",
     "ev": "E-10 · E-18",
     "antes": "1.3"
    },
    {
     "id": "1.4",
     "grado": "lento",
     "t": "La planificación de la demanda no tiene un rol asignado, y en Venezuela el histórico de venta refleja los periodos de quiebre.",
     "ev": "E-40 · E-05",
     "antes": "1.4"
    },
    {
     "id": "1.5",
     "grado": "lento",
     "t": "El forecast de Cubitt se rehízo tres veces en el año y quien compra no tiene confirmación de cuál versión se aplica.",
     "ev": "E-63 · E-60",
     "antes": "1.5"
    }
   ],
   "cifras": [
    "USD 1 M de mercancía de baja rotación identificada por BI [E-01]",
    "Más de 6 meses de inventario sin análisis de liquidación [E-08]",
    "Con el modelo de inventario, el análisis de compra pasó de 8 días a minutos [E-18]"
   ],
   "tripulacion": [
    "Dir. comercial y compras · Roberto Roizental",
    "Gerencia comercial · Andrés Roizental",
    "Mayor internacional Cubitt · John Mordoch",
    "Regional Cubitt · Ricardo Baltodano",
    "Planificación VE · Jimena Sánchez",
    "Reportería de compras · Vera Gavizon",
    "BI (externo) · Alexis Mujica"
   ],
   "senalizacion": [
    "Excel",
    "Claude en Excel",
    "Odoo (exportación)",
    "Power BI",
    "Microsoft Fabric"
   ],
   "trasp": {
    "ofi": 0,
    "lim": 0,
    "ext": 1,
    "sc": 0,
    "inf": 5,
    "ver": "inf"
   },
   "proc": [
    "6.1",
    "2.2",
    "9.1"
   ],
   "src": "E-01 · E-05 · E-06 · E-08 · E-10 · E-18 · E-26 · E-40 · E-60 · E-63",
   "confirmar": "",
   "catenaria": null
  },
  {
   "id": "2a",
   "ramal": "cubitt",
   "nivel": 0,
   "etapa": "2",
   "t": "Idea y muestras",
   "tramo": "T02 · Producto Cubitt",
   "depto": "I+D Cubitt",
   "jefe": "Dir. I+D · Alejandro Roizental",
   "ev": "solida",
   "hoy": "Las ideas de producto Cubitt surgen de las solicitudes de los vendedores, de la oferta de las fábricas y del seguimiento a la competencia. Las muestras se reciben en Panamá, donde las evalúa un grupo de unas diez personas, y el director de I+D emite la aprobación final.",
   "pasos": [
    "La idea se origina en el equipo de I+D, en los vendedores, en la oferta de las fábricas o en la observación de la competencia [E-60]",
    "Desde junio, una diseñadora industrial sigue las tendencias de color en WGSN y diseña accesorios [E-60 · E-22]",
    "Las muestras llegan a Panamá y el especialista de producto prueba la electrónica, el firmware y la aplicación [E-60]",
    "La fábrica ajusta la muestra en sucesivas rondas hasta su aprobación [E-60]",
    "Producto y licencias crea el SKU y el UPC y gestiona las licencias de terceros, como Disney [E-06 · E-60]",
    "Desde el 20 de agosto de 2026 cada muestra se registra en una base de Lark [E-60]"
   ],
   "variantes": "El desarrollo sigue dos líneas internas: electrónica, con unos diez proveedores, casi uno por categoría, y accesorios, moda y licencias. La recompra de un producto recurrente no pasa por esta estación.",
   "senal": "El director de I+D emite la aprobación final de cada producto.",
   "frenos": [
    {
     "id": "2a.1",
     "grado": "detiene",
     "t": "La aplicación y el firmware del reloj pertenecen a la fábrica, y Kenex accede solo a una vista genérica de los datos de sus usuarios.",
     "ev": "E-05 · E-20",
     "antes": "2a.1"
    },
    {
     "id": "2a.2",
     "grado": "lento",
     "t": "El registro de muestras comenzó en agosto; antes no tenían trazabilidad, y no existe una política para su disposición.",
     "ev": "E-60",
     "antes": "2a.2"
    },
    {
     "id": "2a.3",
     "grado": "lento",
     "t": "La decisión de producto no queda documentada en un acta, y el área de I+D no cuenta con indicadores ni presupuesto propio.",
     "ev": "E-60",
     "antes": "2a.3"
    },
    {
     "id": "2a.4",
     "grado": "lento",
     "t": "La aprobación visual reúne muchas opiniones sin un criterio único de decisión.",
     "ev": "E-22",
     "antes": "2a.4"
    }
   ],
   "cifras": [
    "Unos 10 proveedores en China, casi uno por categoría [E-06 · E-08]",
    "Umbral aceptado de garantías en relojería: menos de 1 % [E-60]"
   ],
   "tripulacion": [
    "Dir. I+D · Alejandro Roizental",
    "Producto y licencias · Stephania Roizental",
    "Diseño industrial · Camila Cortés Herrera",
    "Especialista de producto · Rogmarc González",
    "Gerencia de producto · Ricardo Candanedo",
    "Sourcing China · Marina"
   ],
   "senalizacion": [
    "WeChat",
    "WhatsApp",
    "Correo",
    "Lark",
    "Odoo (alta de SKU)"
   ],
   "trasp": {
    "ofi": 4,
    "lim": 1,
    "ext": 0,
    "sc": 0,
    "inf": 4,
    "ver": "mix"
   },
   "proc": [
    "3.1",
    "3.3",
    "3.4",
    "3.6"
   ],
   "src": "E-06 · E-20 · E-22 · E-60 · SC-10",
   "confirmar": "",
   "catenaria": {
    "tipo": "L",
    "t": "I+D entrega a mercadeo el producto aprobado, y mercadeo diseña el empaque, los diales y la campaña durante la fabricación.",
    "ev": "E-60 · E-22 · E-42"
   }
  },
  {
   "id": "3a",
   "ramal": "cubitt",
   "nivel": 0,
   "etapa": "3",
   "t": "Comité y orden",
   "tramo": "T04 · Decisión y orden",
   "depto": "Comité de compras",
   "jefe": "Dir. I+D · Alejandro Roizental",
   "ev": "solida",
   "hoy": "Un comité de compra sin calendario fijo decide qué y cuánto comprar. Lo integran I+D, la gerencia comercial, planificación comercial y ventas internacionales, con el apoyo de planificación de Venezuela. La dirección de compras valida la decisión y, a continuación, I+D emite la orden al proveedor por mensajería o por correo.",
   "pasos": [
    "Planificación comercial calcula la venta reciente en Excel o Power BI y propone cantidades [E-60 · E-06]",
    "El comité decide y la dirección de compras confirma antes de proceder [E-06 · E-08]",
    "I+D envía la orden al proveedor por WhatsApp o por correo, con modelo y cantidad [E-60]",
    "El proveedor responde con la factura, que da inicio al pago [E-06]"
   ],
   "variantes": "",
   "senal": "La dirección de compras valida la compra de Cubitt como segunda instancia.",
   "frenos": [
    {
     "id": "3a.1",
     "grado": "detiene",
     "t": "Cuando el comité no logra reunirse, la compra se detiene; una pausa de más de una semana derivó en un quiebre de inventario de un mes.",
     "ev": "E-06",
     "antes": "3a.1"
    },
    {
     "id": "3a.2",
     "grado": "detiene",
     "t": "La orden de compra no se emite como documento de sistema: se envía por WhatsApp o por correo, sin plantilla.",
     "ev": "E-60",
     "antes": "3a.2"
    },
    {
     "id": "3a.3",
     "grado": "lento",
     "t": "La emisión de órdenes de compra depende de una sola persona.",
     "ev": "E-06",
     "antes": "3a.3"
    },
    {
     "id": "3a.4",
     "grado": "lento",
     "t": "La función de compras no está constituida como un área formal.",
     "ev": "E-26 · E-08",
     "antes": "3a.4"
    }
   ],
   "cifras": [
    "Órdenes típicas de 5.000, 10.000 o 20.000 piezas [E-60 · E-06]",
    "Pedido mínimo por fábrica, por ejemplo 5.000 relojes [E-10]"
   ],
   "tripulacion": [
    "Dir. I+D (emite la orden) · Alejandro Roizental",
    "Dir. compras (valida) · Roberto Roizental",
    "Regional Cubitt (calcula cantidades) · Ricardo Baltodano",
    "Gerencia comercial · Andrés Roizental",
    "Mayor internacional Cubitt · John Mordoch",
    "Planificación VE · Jimena Sánchez"
   ],
   "senalizacion": [
    "WhatsApp",
    "Correo",
    "Excel",
    "Power BI",
    "Chat de grupo (medio no dicho)"
   ],
   "trasp": {
    "ofi": 0,
    "lim": 0,
    "ext": 0,
    "sc": 0,
    "inf": 7,
    "ver": "inf"
   },
   "proc": [
    "6.4",
    "6.2"
   ],
   "src": "E-06 · E-08 · E-10 · E-26 · E-60 · SC-10",
   "confirmar": "",
   "catenaria": null
  },
  {
   "id": "4a",
   "ramal": "cubitt",
   "nivel": 0,
   "etapa": "4",
   "t": "Anticipo y producción",
   "tramo": "T05–T06 · Pago y embarque",
   "depto": "I+D · Sourcing China",
   "jefe": "Sourcing China · Marina",
   "ev": "parcial",
   "hoy": "Kenex paga un anticipo del 20 al 30 % al colocar el pedido y el saldo cuando la fábrica notifica que la producción está lista; esa notificación llega a I+D y las condiciones varían por proveedor. Sourcing coordina desde China la consolidación y el envío, por vía aérea para relojes y urgencias o por vía marítima, con 60 a 90 días de tránsito.",
   "pasos": [
    "I+D envía por correo a Finanzas la instrucción de pago [E-06]",
    "Los pagos internacionales salen por distintos bancos según el país del proveedor, fuera del día de pago semanal [E-61]",
    "Sourcing registra por proveedor en Lark lo que está en producción y en tránsito [E-06 · E-60]",
    "Se consulta el inventario de Venezuela para elegir entre envío aéreo y marítimo [E-60 · E-08]",
    "Una orden de 10.000 piezas puede despacharse en tres envíos de 3.000 [E-60]",
    "La mercancía de Kenex USA viaja directamente desde China, sin pasar por Panamá [E-01 · E-30]"
   ],
   "variantes": "",
   "senal": "",
   "frenos": [
    {
     "id": "4a.1",
     "grado": "detiene",
     "t": "El tránsito no es visible para logística, que en ocasiones conoce la llegada de un contenedor dos días antes, tras 60 a 90 días de viaje.",
     "ev": "E-03 · E-60",
     "antes": "4a.1"
    },
    {
     "id": "4a.2",
     "grado": "lento",
     "t": "Los archivos de seguimiento en Lark se actualizan de forma parcial y no se usan como fuente de referencia.",
     "ev": "E-08 · E-40 · E-10",
     "antes": "4a.2"
    },
    {
     "id": "4a.3",
     "grado": "lento",
     "t": "Cuando un lanzamiento se retrasa se recurre al flete aéreo, y ese costo adicional no se registra por separado.",
     "ev": "SC-08",
     "antes": "4a.3"
    },
    {
     "id": "4a.4",
     "grado": "lento",
     "t": "El control de calidad se realiza solo contra la muestra aprobada, y los defectos se detectan después, en las garantías.",
     "ev": "E-60",
     "antes": "4a.4"
    }
   ],
   "cifras": [
    "China a Colón: 60–90 días por vía marítima [E-03]",
    "El envío aéreo reduce el tránsito en cerca de un mes [E-60]"
   ],
   "tripulacion": [
    "Sourcing China · Marina",
    "Dir. I+D (instrucción de pago) · Alejandro Roizental",
    "Tesorería PA · Norman Vanegas",
    "CFO · Jaime González"
   ],
   "senalizacion": [
    "Correo",
    "WeChat",
    "Lark (documentos por proveedor; tablero de compras)",
    "Banca en línea"
   ],
   "trasp": {
    "ofi": 2,
    "lim": 0,
    "ext": 1,
    "sc": 1,
    "inf": 4,
    "ver": "mix"
   },
   "proc": [
    "6.4",
    "13.1",
    "13.2",
    "7.6"
   ],
   "src": "E-03 · E-06 · E-08 · E-10 · E-15 · E-40 · E-60 · E-61 · SC-08",
   "confirmar": "El tiempo de producción por categoría; hoy se trabaja con una cuenta regresiva de unos tres meses antes del lanzamiento.",
   "catenaria": {
    "tipo": "L",
    "t": "La campaña se fija contra la llegada estimada; si la producción se retrasa, la mercancía se envía por vía aérea para mantener la fecha de lanzamiento.",
    "ev": "E-42 · SC-08"
   }
  },
  {
   "id": "2b",
   "ramal": "casio",
   "nivel": 0,
   "etapa": "2",
   "t": "Order sheet y sábana",
   "tramo": "T03 · Compra Casio",
   "depto": "Compras Casio",
   "jefe": "Reportería de compras · Vera Gavizon",
   "ev": "solida",
   "hoy": "Cada mes Casio Latinoamérica envía el order sheet con las referencias disponibles. Reportería de compras arma la «sábana», un libro de Excel con inventario, venta, tránsito, prepedidos de clientes especiales y el sugerido de BI. Con esa base, la dirección de compras fija la cantidad de cada referencia.",
   "pasos": [
    "Hacia el día 15 a 20 llega el order sheet; el de calculadoras llega antes que el de relojes [E-08 · E-05]",
    "Se extrae de Odoo el reporte consolidado y se le suman la venta de 6 a 12 meses y el tránsito [E-10]",
    "Planificación asigna por país los lanzamientos nuevos (NPR) [E-40]",
    "El order sheet se ofrece a 10–12 clientes especiales, que pagan su prepedido por adelantado [E-10]",
    "La dirección de compras fija la cantidad por SKU, en 2 a 3 días cada mes [E-08]"
   ],
   "variantes": "La compra de Casio integra tres flujos en un solo pedido: la compra regular, los lanzamientos NPR y los prepedidos de clientes especiales.",
   "senal": "La dirección de compras decide la compra de Casio.",
   "frenos": [
    {
     "id": "2b.1",
     "grado": "detiene",
     "t": "La compra mensual de miles de referencias depende de una sola persona, sin un respaldo designado.",
     "ev": "E-08 · E-10",
     "antes": "2b.1"
    },
    {
     "id": "2b.2",
     "grado": "lento",
     "t": "El libro de compra no está documentado; su manejo se ha transmitido de persona a persona.",
     "ev": "E-10",
     "antes": "2b.2"
    },
    {
     "id": "2b.3",
     "grado": "lento",
     "t": "Los códigos de Casio y de Kenex son distintos y se cruzan manualmente con una tabla de equivalencias.",
     "ev": "E-10",
     "antes": "2b.3"
    }
   ],
   "cifras": [
    "Clientes especiales: 10–12, más del 10 % de la venta [E-10]",
    "La compra toma unos 3 días al mes [E-10]"
   ],
   "tripulacion": [
    "Reportería de compras · Vera Gavizon",
    "Dir. compras (decide la cantidad) · Roberto Roizental",
    "Planificación VE (lanzamientos) · Jimena Sánchez"
   ],
   "senalizacion": [
    "Excel",
    "Correo",
    "Odoo (exportación)",
    "Power BI"
   ],
   "trasp": {
    "ofi": 0,
    "lim": 0,
    "ext": 1,
    "sc": 0,
    "inf": 6,
    "ver": "inf"
   },
   "proc": [
    "6.3",
    "2.4"
   ],
   "src": "E-05 · E-08 · E-10 · E-26 · E-40",
   "confirmar": "",
   "catenaria": {
    "tipo": "L",
    "t": "Casio comparte sus lanzamientos y aprueba el plan semestral de mercadeo, al que aporta parte del presupuesto.",
    "ev": "E-40 · E-42 · E-49"
   }
  },
  {
   "id": "3b",
   "ramal": "casio",
   "nivel": 0,
   "etapa": "3",
   "t": "Allocation y pago",
   "tramo": "T03–T05 · Asignación y pago",
   "depto": "Compras · Finanzas",
   "jefe": "Dir. compras · Roberto Roizental",
   "ev": "parcial",
   "hoy": "Casio confirma una asignación (allocation) menor a lo solicitado, por lo que compras pide por encima de la necesidad. El pago se realiza por adelantado, antes del despacho y hacia el día 25, con la línea de crédito bancaria del hub. La mercancía llega el mes siguiente.",
   "pasos": [
    "Calendario de referencia: el 15 se devuelve el pedido, el 17 Casio confirma, hasta el 20 se agregan líneas y el 25 se paga [E-05]",
    "Casio responde con la asignación y se pueden solicitar unidades adicionales [E-06 · E-10]",
    "Unos 5 días antes del cierre de mes, compras entrega al CFO el estimado y el CFO prepara la línea de crédito [E-15 · E-43]",
    "Toda la mercancía se recibe en la Zona Libre de Colón [E-10]"
   ],
   "variantes": "",
   "senal": "",
   "frenos": [
    {
     "id": "3b.1",
     "grado": "detiene",
     "t": "En los últimos meses Casio ha asignado entre el 20 y el 30 % de lo solicitado, con faltantes en referencias clave.",
     "ev": "E-10 · E-40 · E-08",
     "antes": "3b.1"
    },
    {
     "id": "3b.2",
     "grado": "lento",
     "t": "El reparto final por país difiere de lo solicitado para cada uno, lo que obliga a ajustar manualmente el reporte a Casio.",
     "ev": "E-10",
     "antes": "3b.2"
    }
   ],
   "cifras": [
    "Tiempo de entrega de Casio: 45–60 días; siempre hay dos pedidos en tránsito [E-10]",
    "Asignación: pasó de 80 % a 60 % y hoy ronda el 20–30 % de lo pedido [E-08 · E-10 · E-40]"
   ],
   "tripulacion": [
    "Dir. compras · Roberto Roizental",
    "CFO (línea para el pago) · Jaime González",
    "Contraparte · Casio Latinoamérica (Brasil)"
   ],
   "senalizacion": [
    "Correo",
    "Excel",
    "Banca (línea de crédito)"
   ],
   "trasp": {
    "ofi": 0,
    "lim": 0,
    "ext": 1,
    "sc": 1,
    "inf": 3,
    "ver": "inf"
   },
   "proc": [
    "6.3",
    "13.1",
    "13.4"
   ],
   "src": "E-05 · E-06 · E-08 · E-10 · E-15 · E-40 · E-43",
   "confirmar": "Los plazos contractuales con Casio y si se opera con carta de crédito.",
   "catenaria": null
  },
  {
   "id": "4b",
   "ramal": "casio",
   "nivel": 0,
   "etapa": "4",
   "t": "Embarque Casio",
   "tramo": "T06 · Embarque",
   "depto": "Compras · Logística",
   "jefe": "Dir. compras · Roberto Roizental",
   "ev": "parcial",
   "hoy": "Tras el pago, compras coordina con el agente aduanal y el forwarder, aprueba la cotización del flete y define cuántos contenedores salen y con qué mercancía. Al confirmarse la salida, reenvía el aviso de embarque a logística.",
   "pasos": [
    "Compras recibe la cotización del flete y aprueba los contenedores [E-08]",
    "Kenex elige su forwarder: la logística de Casio propone la salida y Kenex la aprueba por correo [SC-01]",
    "La mercancía de Casio viaja casi en su totalidad por vía marítima [E-08]",
    "El aviso de embarque (shipping advice) se reenvía por correo a logística [E-08]",
    "Llegan la lista de empaque y la factura, y el agente de carga envía el BL [SC-01 · E-70]"
   ],
   "variantes": "",
   "senal": "La dirección de compras aprueba el flete y los contenedores.",
   "frenos": [
    {
     "id": "4b.1",
     "grado": "lento",
     "t": "Cada paso del embarque se canaliza a través de la misma persona.",
     "ev": "E-08",
     "antes": "4b.1"
    },
    {
     "id": "4b.2",
     "grado": "lento",
     "t": "No se distingue cuántos contenedores al mes corresponden a cada marca.",
     "ev": "E-68 · E-03",
     "antes": "4b.2"
    }
   ],
   "cifras": [
    "Un contenedor de Casio trae unas 1.800 cajas [E-03]"
   ],
   "tripulacion": [
    "Dir. compras (flete y contenedores) · Roberto Roizental",
    "Inventarios PA · María Alejandra Mejías",
    "Logística PA · Fernando Alvarado",
    "Agente de carga · Marlin Logistics"
   ],
   "senalizacion": [
    "Correo",
    "Llamada"
   ],
   "trasp": {
    "ofi": 0,
    "lim": 0,
    "ext": 0,
    "sc": 0,
    "inf": 4,
    "ver": "inf"
   },
   "proc": [
    "6.3",
    "7.6"
   ],
   "src": "E-03 · E-08 · E-68 · E-70 · SC-01",
   "confirmar": "Puerto de origen y naviera.",
   "catenaria": null
  },
  {
   "id": "5",
   "ramal": "troncal",
   "nivel": 0,
   "etapa": "5",
   "t": "Llegada a Zona Libre",
   "tramo": "T07 · Llegada a Panamá",
   "depto": "Tráfico",
   "jefe": "Jefa de Tráfico PA · Yanilka Martínez",
   "ev": "solida",
   "hoy": "Con el aviso de partida, Tráfico crea el ASN y sigue el contenedor en un Excel propio y en el calendario de Lark. Un día antes de la llegada se registra la entrada en EBS y se le asocia la orden de compra. En la Zona Libre ningún movimiento se ejecuta sin el documento DMC.",
   "pasos": [
    "Tráfico crea el ASN a partir de la notificación de partida [SC-01 · E-03]",
    "El agente de carga envía los documentos por correo y Kenex los valida [E-70]",
    "La fecha estimada de llegada, más dos días, se anota en el calendario de Lark para operaciones [E-70]",
    "Se registra la entrada en EBS con BL y contenedor, e inventarios asocia la orden de compra [E-70]",
    "El registro de acarreo marca la llegada y habilita a la bodega [E-70]"
   ],
   "variantes": "En la Zona Libre hay cuatro movimientos posibles: entrada, salida, traspaso a otra empresa de la zona y liquidación hacia el territorio de Panamá.",
   "senal": "",
   "frenos": [
    {
     "id": "5.1",
     "grado": "lento",
     "t": "El seguimiento de contenedores se lleva fuera del sistema, entre un Excel, el calendario y cadenas de correo.",
     "ev": "E-70",
     "antes": "5.1"
    },
    {
     "id": "5.2",
     "grado": "lento",
     "t": "El tránsito aparece en Odoo solo una o dos semanas antes de la llegada.",
     "ev": "SC-01",
     "antes": "5.2"
    },
    {
     "id": "5.3",
     "grado": "lento",
     "t": "Los pagos de aduana de cada movimiento se realizan de forma presencial.",
     "ev": "E-70",
     "antes": "5.3"
    }
   ],
   "cifras": [
    "4–5 contenedores al mes; hasta 10 en temporada alta [E-68]",
    "Tráfico: 5–6 personas [E-03 · E-70]"
   ],
   "tripulacion": [
    "Jefa de Tráfico PA · Yanilka Martínez",
    "Inventarios PA (asocia la orden) · María Alejandra Mejías",
    "Agente de carga · Marlin Logistics"
   ],
   "senalizacion": [
    "Correo",
    "Excel",
    "EBS",
    "Odoo",
    "Calendario de Lark",
    "Portal DMC"
   ],
   "trasp": {
    "ofi": 4,
    "lim": 1,
    "ext": 1,
    "sc": 1,
    "inf": 6,
    "ver": "mix"
   },
   "proc": [
    "7.6",
    "7.1"
   ],
   "src": "E-03 · E-68 · E-70 · SC-01",
   "confirmar": "",
   "catenaria": null
  },
  {
   "id": "6",
   "ramal": "troncal",
   "nivel": 0,
   "etapa": "6",
   "t": "Bodega y liberación",
   "tramo": "T08 · Bodega",
   "depto": "Operaciones y Logística",
   "jefe": "Logística PA · Fernando Alvarado",
   "ev": "solida",
   "hoy": "La carga se descarga caja por caja; cada caja recibe un LPN y se ubica según la clasificación ABC. Al cerrar el ASN, EBS transfiere las cantidades a Odoo, y la mercancía queda disponible para la venta cuando inventarios la acepta manualmente y asigna las preventas. La dirección de compras fija el precio de la mercancía nueva.",
   "pasos": [
    "Descarga manual y paletizado sin mezclar productos [E-03 · SC-01]",
    "Recepción contra la orden en la PDT; los faltantes pasan a una bodega virtual y se reclaman al proveedor [SC-01]",
    "Cada caja recibe un LPN y una ubicación según la clasificación ABC; los artículos de baja rotación van al fondo [SC-01]",
    "Al cerrar el ASN, la interfaz pasa las cantidades de EBS a Odoo; inventarios valida costos y libera [E-03]",
    "La dirección de compras fija los precios y reparte por país las ediciones limitadas [E-08]"
   ],
   "variantes": "Panamá opera dos bodegas: la de Zona Libre, con EBS y ubicaciones, y la de la ciudad, sin WMS, que surte al mayor local y a la web de Panamá. Las tiendas de Panamá se surten hoy directamente desde la Zona Libre, en un piloto.",
   "senal": "La dirección de compras fija los precios de la mercancía nueva.",
   "frenos": [
    {
     "id": "6.1",
     "grado": "detiene",
     "t": "La liberación del inventario en Odoo depende de una sola persona y se hace manualmente, para proteger las preventas.",
     "ev": "E-03 · SC-01",
     "antes": "6.1"
    },
    {
     "id": "6.2",
     "grado": "detiene",
     "t": "La bodega de la ciudad llegó a acumular unas 130.000 unidades donde bastaban 30.000, y en un conteo de Cubitt coincidió el 29 % de los ítems.",
     "ev": "SC-06 · E-03",
     "antes": "6.2"
    },
    {
     "id": "6.3",
     "grado": "lento",
     "t": "La mercancía queda disponible solo cuando se descarga la última caja, y la descarga de un contenedor toma un día.",
     "ev": "E-03",
     "antes": "6.3"
    },
    {
     "id": "6.4",
     "grado": "lento",
     "t": "EBS y Odoo se sincronizan en momentos puntuales y no en tiempo real.",
     "ev": "E-07",
     "antes": "6.4"
    }
   ],
   "cifras": [
    "Nave de 5.000–5.500 m²; la mudanza fue en agosto de 2025 [SC-07]",
    "Unos 4.800 SKU operativos [SC-01]"
   ],
   "tripulacion": [
    "Logística PA · Fernando Alvarado",
    "Inventarios y precios PA (libera en Odoo) · María Alejandra Mejías",
    "Entradas e inventario PA · José E. Miranda",
    "Pick & pack PA · Isaac del Cid",
    "Dir. compras (precios de lo nuevo) · Roberto Roizental"
   ],
   "senalizacion": [
    "EBS (con PDT)",
    "Odoo",
    "Excel",
    "De palabra"
   ],
   "trasp": {
    "ofi": 3,
    "lim": 0,
    "ext": 0,
    "sc": 0,
    "inf": 4,
    "ver": "mix"
   },
   "proc": [
    "7.1",
    "7.2",
    "7.8"
   ],
   "src": "E-03 · E-07 · E-08 · E-53 · E-68 · SC-01 · SC-06 · SC-07",
   "confirmar": "",
   "catenaria": {
    "tipo": "L",
    "t": "Al liberarse la mercancía, el aviso de lanzamiento activa el reparto a tiendas y la preventa.",
    "ev": "E-60 · E-03 · E-07"
   }
  },
  {
   "id": "7",
   "ramal": "troncal",
   "nivel": 0,
   "etapa": "7",
   "t": "Asignación y aprobación",
   "tramo": "T09 · Asignación",
   "depto": "Gerencia Comercial",
   "jefe": "Gerencia comercial · Andrés Roizental",
   "ev": "parcial",
   "hoy": "En esta estación se decide quién recibe la mercancía disponible. No hay una regla escrita de reparto: la preventa asignada al liberar ya tiene destino. La gerencia o la dirección comercial revisa cada pedido por margen, cantidad por referencia y crédito, y lo ajusta para mantener disponibilidad para los demás. Desde aquí la vía se abre en dos ramales: Mayor y Países.",
   "pasos": [
    "La gerencia comercial aprueba cada pedido en Odoo con un indicador de riesgo, en unos 30 segundos por pedido [E-05 · E-62]",
    "Se limita que un solo cliente concentre las 20 referencias de mayor venta, porque la asignación de Casio no alcanza [E-05]",
    "El pedido de cada país se ajusta según el inventario del hub: en Cubitt decide la gerencia comercial y en Casio la dirección de compras [E-34 · E-40]",
    "Los clientes especiales de fuera de la zona reciben lo que no compromete el abastecimiento de la zona natural [E-10]",
    "Ventas internacionales reserva para sus clientes clave entre un 15 y un 20 % adicional en preventa [E-63]",
    "Las ediciones limitadas se bloquean y la dirección las reparte por país [E-08]",
    "Lo que no hay queda como presupuesto; si el tránsito no lo cubre, se elimina [E-05]"
   ],
   "variantes": "Aquí la vía se abre en dos ramales. El ramal Mayor atiende a clientes terceros que compran a Kenex y se sirven desde la Zona Libre. El ramal Países abastece a las operaciones propias del grupo (Venezuela, Colombia, el mercado local de Panamá y Guatemala) y al socio de Costa Rica. Dentro de cada país, la mercancía se reparte después entre tiendas, mayor local y web.",
   "senal": "La gerencia o la dirección comercial aprueban todos los pedidos.",
   "frenos": [
    {
     "id": "7.1",
     "grado": "detiene",
     "t": "Lo no atendido se elimina y no queda registro de la demanda perdida.",
     "ev": "E-05 · E-26",
     "antes": "7.1"
    },
    {
     "id": "7.2",
     "grado": "detiene",
     "t": "Todo pedido espera una aprobación centralizada; cuando el aprobador está de viaje, los pedidos quedan en espera.",
     "ev": "E-08 · E-62",
     "antes": "7.2"
    },
    {
     "id": "7.3",
     "grado": "lento",
     "t": "Ventas consulta un disponible futuro común, y varios vendedores ofrecen el mismo inventario a la vez.",
     "ev": "E-03 · E-05",
     "antes": "7.3"
    }
   ],
   "cifras": [
    "200 clientes especiales revisados cada 2–4 días [E-08]",
    "Ajuste manual de 30–40 % a la reposición [E-08]"
   ],
   "tripulacion": [
    "Gerencia comercial (aprueba cada pedido) · Andrés Roizental",
    "Dir. comercial (ajusta la reposición) · Roberto Roizental",
    "Inventarios PA (asigna la preventa) · María Alejandra Mejías",
    "Planificación VE · Jimena Sánchez",
    "Mayor internacional Cubitt (preventa) · John Mordoch"
   ],
   "senalizacion": [
    "Odoo",
    "Correo",
    "Lark",
    "Chat de grupo"
   ],
   "trasp": {
    "ofi": 4,
    "lim": 1,
    "ext": 0,
    "sc": 0,
    "inf": 3,
    "ver": "mix"
   },
   "proc": [
    "2.6",
    "8.5",
    "8.6",
    "6.6"
   ],
   "src": "E-03 · E-05 · E-08 · E-10 · E-19 · E-26 · E-34 · E-40 · E-62 · E-63",
   "confirmar": "Si existe un orden de prioridad entre países cuando la mercancía no alcanza y quién lo fija en cada marca.",
   "catenaria": {
    "tipo": "P·L",
    "t": "La dirección comercial aprueba cada promoción según el margen; no se reservan unidades específicas para comunicar el lanzamiento.",
    "ev": "E-40 · E-08 · E-56"
   }
  },
  {
   "id": "US",
   "ramal": "independiente",
   "nivel": 0,
   "etapa": "",
   "t": "Kenex USA",
   "tramo": "T11 · Kenex USA",
   "depto": "Kenex USA",
   "jefe": "Operación Kenex USA · Isabella Roizental",
   "ev": "parcial",
   "hoy": "Kenex USA opera como una línea independiente: compra directamente a las fábricas de China, recibe en su bodega de Miami y vende en 15 marketplaces y en su sitio propio. Panamá le envía solo pedidos urgentes. La operación reporta sus resultados una vez al mes a la dirección del grupo.",
   "pasos": [
    "La operación prepara la lista de necesidades de los próximos meses [E-30]",
    "La mercancía viaja directamente de las fábricas de China a Miami; los urgentes se piden a Panamá [E-01 · E-30]",
    "Dos personas de bodega cuentan lo recibido y la factura se registra en QuickBooks [E-30]",
    "Las órdenes de Amazon y Whatnot se imprimen a diario para su preparación en bodega [E-30]"
   ],
   "variantes": "Además de los marketplaces, vende por su sitio propio, por transmisiones en vivo en Whatnot y por televisión, y abrió su primer punto de venta físico.",
   "senal": "",
   "frenos": [
    {
     "id": "US.1",
     "grado": "lento",
     "t": "La operación funciona fuera de los procesos del grupo y su información no se comparte con Panamá.",
     "ev": "E-01 · E-30",
     "antes": "US.1"
    },
    {
     "id": "US.2",
     "grado": "lento",
     "t": "Las devoluciones de Amazon, del orden de miles al mes, no tienen registro de su estado.",
     "ev": "E-30",
     "antes": "US.2"
    }
   ],
   "cifras": [
    "15 marketplaces [E-30]",
    "Una transmisión de televisión generó ventas por 100.000 USD [E-30]"
   ],
   "tripulacion": [
    "Operación Kenex USA · Isabella Roizental",
    "Dir. I+D (compra a fábricas) · Alejandro Roizental"
   ],
   "senalizacion": [
    "Shopify",
    "QuickBooks",
    "Sellerboard",
    "Portales de marketplaces",
    "Papel (órdenes impresas)",
    "Lark (comunicación)"
   ],
   "trasp": {
    "ofi": 1,
    "lim": 0,
    "ext": 5,
    "sc": 5,
    "inf": 5,
    "ver": "fuera"
   },
   "proc": [
    "10.5"
   ],
   "src": "E-01 · E-06 · E-30",
   "confirmar": "El trámite de aduana en EE.UU. y si la orden a la fábrica la emite siempre I+D.",
   "catenaria": null
  },
  {
   "id": "8a",
   "ramal": "mayor",
   "nivel": 1,
   "etapa": "8",
   "t": "Oferta, pedido y aprobación",
   "tramo": "T10 · Venta al mayor",
   "depto": "Ventas al mayor internacional",
   "jefe": "Mayor internacional Cubitt · John Mordoch",
   "ev": "solida",
   "hoy": "El ramal mayor atiende a los clientes terceros que le compran a Kenex y se sirven desde la Zona Libre. Opera en dos frentes: el mayor internacional de Cubitt, en 17 a 20 países, y las cuentas especiales e internacionales pequeñas, junto con los clientes especiales de Casio. El pedido se carga en Odoo como presupuesto, pasa a orden de venta y la gerencia comercial lo aprueba antes de que llegue a la bodega.",
   "pasos": [
    "Cada lunes se envía a los clientes una lista de disponibilidad en Excel con referencia, imagen, precio y mercancía en tránsito [E-05]",
    "El pedido del cliente se carga en Odoo como presupuesto, sin reserva, y se convierte en orden de venta, que reserva el stock [E-05]",
    "La mercancía en tránsito se ofrece en preventa, con una fecha de entrega comprometida con el cliente [E-05 · E-07]",
    "Antes de cada campaña, el mayor internacional de Cubitt presenta el producto a sus clientes por mensajería y reserva una porción adicional del 15 al 20 % [E-63]",
    "Los clientes especiales de Casio, fuera de la zona oficial, hacen prepedidos contra el order sheet mensual y pagan por adelantado, antes de que exista la mercancía [E-10]",
    "La gerencia comercial aprueba el pedido en Odoo y la interfaz lo envía a EBS, donde lo recibe la jefatura de preparación [E-05 · SC-01]",
    "El crédito exige la afiliación y la debida diligencia del cliente; en casos puntuales se compensa con mercancía en lugar de ampliar el cupo [E-62 · E-63]"
   ],
   "variantes": "Además de la venta recurrente, el ramal incluye la venta corporativa con descuento anual, la venta táctica de alto volumen (promociones de decenas de miles de unidades con cadenas y supermercados) y la línea blanca o marca privada, con su propio ciclo de diseño, muestra, proforma y pedido. Casio y Cubitt siguen el mismo proceso. El equipo internacional también atiende cadenas en mercados donde el grupo tiene operación propia.",
   "senal": "La gerencia comercial aprueba cada pedido antes de que la bodega lo vea.",
   "frenos": [
    {
     "id": "8a.1",
     "grado": "lento",
     "t": "La lista de disponibilidad no llega a todos los clientes por igual, y varios vendedores ofrecen el mismo inventario al mismo tiempo.",
     "ev": "E-05",
     "antes": "8a.2"
    },
    {
     "id": "8a.2",
     "grado": "lento",
     "t": "El ramal mayor conoce las campañas de mercadeo unas dos semanas antes del lanzamiento, lo que acorta su preparación comercial con los clientes.",
     "ev": "E-63",
     "antes": "8a.4"
    },
    {
     "id": "8a.3",
     "grado": "lento",
     "t": "En los lanzamientos, la primera remesa puede agotarse antes de cubrir los pedidos del mayor, y la reposición llega meses después.",
     "ev": "E-63",
     "antes": null
    }
   ],
   "cifras": [
    "El mayor internacional de Cubitt crece entre 2 y 3 veces al año [E-63]",
    "La línea blanca facturó cerca de 2 millones de USD el año pasado [E-63]",
    "Los clientes especiales de Casio son 10 a 12 y suman al menos el 10 % de la venta de Kenex [E-10]"
   ],
   "tripulacion": [
    "Mayor internacional Cubitt · John Mordoch",
    "Regional Cubitt · Ricardo Baltodano",
    "KAM Centroamérica · Jorge Ábrego",
    "Cuentas especiales e internacionales · Edumar Escalona",
    "Clientes especiales Casio · Vera Gavizon",
    "Asistente comercial PA · Steffany Aguilar"
   ],
   "senalizacion": [
    "Excel",
    "WhatsApp",
    "Teléfono",
    "Odoo"
   ],
   "trasp": {
    "ofi": 3,
    "lim": 0,
    "ext": 0,
    "sc": 0,
    "inf": 4,
    "ver": "mix"
   },
   "proc": [
    "8.3",
    "8.4",
    "8.5",
    "8.6",
    "8.7",
    "8.8",
    "8.9",
    "8.10",
    "8.11"
   ],
   "src": "E-05 · E-07 · E-10 · E-62 · E-63 · SC-01",
   "confirmar": "Cómo se registran y desde qué stock se sirven las ventas del equipo internacional a cadenas de mercados con operación propia, y quién asume la cartera de cuentas especiales cuando su responsable actual pase al mayor local de Panamá.",
   "catenaria": {
    "tipo": "C·L",
    "t": "Mercadeo asigna presupuesto por cliente para material de punto de venta, mobiliario y activaciones, y comparte las campañas con el ramal antes del lanzamiento.",
    "ev": "E-49 · E-31 · E-63"
   }
  },
  {
   "id": "9a",
   "ramal": "mayor",
   "nivel": 1,
   "etapa": "9",
   "t": "Despacho y exportación",
   "tramo": "T15 · Despacho",
   "depto": "Bodega · Tráfico",
   "jefe": "Pick & pack PA · Isaac del Cid",
   "ev": "solida",
   "hoy": "El pedido aprobado llega a EBS y la jefatura de preparación lo asigna. La mercancía se prepara por recorrido dirigido, se empaca con verificación ciega y espera en el área de salida según el modo de transporte. Tráfico elabora la factura con la lista de empaque, y la salida se programa cuando el vendedor confirma el pago y el agente de carga del cliente fija la fecha.",
   "pasos": [
    "Preparación dirigida con terminal portátil y empaque con verificación ciega, que no permite cerrar un bulto incompleto [SC-01]",
    "Los pedidos se ordenan en el área de salida por modo de transporte: aéreo, terrestre o marítimo [SC-01]",
    "Al cerrar el empaque se genera la lista de empaque, que se envía por correo al vendedor y a Tráfico [SC-01 · E-70]",
    "Tráfico arma la factura borrador con las cantidades empacadas, el empaque y el flete, y el vendedor valida el precio y la lista [SC-01 · E-70]",
    "Si el cliente paga por adelantado, el vendedor confirma el pago y autoriza el despacho [E-70]",
    "El agente de carga del cliente fija el retiro; se emite la declaración de movimiento comercial, se sella la carga y se registra la salida en EBS [E-70 · SC-01]",
    "El agente entrega una constancia de recepción al vendedor; los faltantes o daños se gestionan con el formulario de reclamos [E-03 · E-70 · SC-06]"
   ],
   "variantes": "Cada analista de Tráfico atiende un grupo de países y lee en Odoo las instrucciones del vendedor para cada pedido. La llegada al cliente se documenta con la constancia del agente de carga; el receptor informa solo faltantes, sobrantes o daños. El ramal mayor termina aquí y continúa en el cobro.",
   "senal": "El vendedor confirma el pago o las condiciones del cliente antes de autorizar la salida.",
   "frenos": [
    {
     "id": "9a.1",
     "grado": "detiene",
     "t": "La mayor parte del tiempo entre pedido y despacho corresponde a la espera de clientes y agentes de carga; algunas órdenes permanecieron hasta 200 días en el área de salida.",
     "ev": "SC-01",
     "antes": "9a.1"
    },
    {
     "id": "9a.2",
     "grado": "lento",
     "t": "El vendedor concentra la intermediación del despacho: confirma pagos, reenvía la lista de empaque y conserva los contactos del cliente en su teléfono.",
     "ev": "E-70 · SC-01",
     "antes": "9a.2"
    },
    {
     "id": "9a.3",
     "grado": "lento",
     "t": "El tipo de empaque se define pedido por pedido según la indicación del vendedor, lo que genera reempaques y reversos.",
     "ev": "E-68",
     "antes": "9a.3"
    }
   ],
   "cifras": [
    "El tiempo de preparación por pedido pasó de unos 14 días a 3–4 días [SC-07]",
    "Cumplimiento del plazo de despacho: 85–90 % [SC-01]"
   ],
   "tripulacion": [
    "Pick & pack PA · Isaac del Cid",
    "Supervisión de despacho PA · Jorge Meneses",
    "Jefa de Tráfico PA · Yanilka Martínez",
    "Tráfico PA · Natalia Oliveros",
    "Tráfico PA · Levana Acosta",
    "Tráfico PA · Karibeth López",
    "Tráfico PA · Jovanna West",
    "Logística PA · Fernando Alvarado"
   ],
   "senalizacion": [
    "EBS (con PDT)",
    "Odoo",
    "Correo",
    "Excel",
    "Teléfono/WhatsApp del vendedor",
    "Portal DMC"
   ],
   "trasp": {
    "ofi": 5,
    "lim": 1,
    "ext": 1,
    "sc": 1,
    "inf": 7,
    "ver": "mix"
   },
   "proc": [
    "7.3",
    "7.4",
    "7.5"
   ],
   "src": "E-03 · E-68 · E-70 · SC-01 · SC-06 · SC-07",
   "confirmar": "Si existe una confirmación sistemática de la entrega al cliente en la exportación, además de la constancia del agente de carga.",
   "catenaria": null
  },
  {
   "id": "8b",
   "ramal": "paises",
   "nivel": 1,
   "etapa": "8",
   "t": "Pedido del país y recorte",
   "tramo": "T11 · Países propios",
   "depto": "Planificación · Gerencia comercial",
   "jefe": "Planificación VE · Jimena Sánchez",
   "ev": "solida",
   "hoy": "Cada operación propia le compra a la estación central como un cliente del grupo. Venezuela envía su pedido en Excel, Colombia lo acuerda con la gerencia comercial y Panamá local pide el surtido de la bodega de la ciudad. La estación central decide cuánto entrega a cada país según el stock del hub. Costa Rica, socio del grupo, pide con su propia hoja de pedido.",
   "pasos": [
    "Venezuela: planificación calcula una cobertura de tres a cuatro meses, operaciones la ajusta y el pedido se envía en Excel, sin orden en Odoo [E-40 · E-34]",
    "Colombia: el área comercial consolida, la gerencia del país revisa, la gerencia comercial en Panamá aprueba y asistencia comercial carga el pedido en Odoo [E-11]",
    "Panamá local: planificación calcula el surtido de la bodega de la ciudad, ventas lo ajusta y la dirección de compras lo aprueba antes de enviarlo a Zona Libre [E-39]",
    "La estación central recorta cada pedido según el stock del hub: la gerencia comercial en Cubitt y la dirección de compras en Casio [E-34 · E-40]",
    "Costa Rica: compras del socio completa la hoja de pedido que le envía ventas internacionales, y la gerencia del socio la aprueba [E-19 · E-59]",
    "Ventas internacionales confirma al socio lo que queda pendiente de entrega antes de enviar el pedido a preparación [E-19]"
   ],
   "variantes": "El ramal reúne cinco frentes con reglas propias: Venezuela, Colombia y Panamá local, que comparten sistema con el grupo; Guatemala, cuya operación lleva un tercero; y Costa Rica, socio con sistema propio, cuya operación interna queda fuera del detalle de este circuito. Kenex USA no pasa por este ramal: compra directamente a las fábricas y recibe del hub solo pedidos urgentes.",
   "senal": "La dirección de compras (Casio) y la gerencia comercial (Cubitt) deciden cuánto recibe cada país.",
   "frenos": [
    {
     "id": "8b.1",
     "grado": "detiene",
     "t": "Los países reciben menos de lo pedido sin aviso oportuno: Costa Rica recibe del 70 al 80 %, y Venezuela registró diferencias entre lo facturado y lo recibido.",
     "ev": "E-19 · E-40 · E-34",
     "antes": "8b.1"
    },
    {
     "id": "8b.2",
     "grado": "lento",
     "t": "La disponibilidad se informa al socio por rangos de cantidad y no en unidades exactas, lo que dificulta planificar su pedido.",
     "ev": "E-19",
     "antes": "8b.2"
    },
    {
     "id": "8b.3",
     "grado": "lento",
     "t": "El sistema no registra la cantidad pedida por cada país frente a la entregada, lo que impide medir el nivel de servicio del hub.",
     "ev": "E-40",
     "antes": "8b.3"
    }
   ],
   "cifras": [
    "Cobertura objetivo del pedido de Venezuela: 3 a 4 meses, revisada una vez al mes [E-40]"
   ],
   "tripulacion": [
    "Planificación VE · Jimena Sánchez",
    "Operaciones VE · Vladimir Castillo",
    "Cuentas especiales (cuenta Venezuela y socio) · Edumar Escalona",
    "Gerencia comercial (cupo Cubitt) · Andrés Roizental",
    "Dir. compras (cupo Casio) · Roberto Roizental",
    "Country manager CO · Joel Cohen",
    "Comercial CO · Santiago Ramírez",
    "Asistente comercial PA · Steffany Aguilar",
    "Socio CR · Gil Porat",
    "Compras CR · Itai Porat"
   ],
   "senalizacion": [
    "Excel",
    "Correo",
    "Teléfono / WhatsApp (Colombia)",
    "Odoo",
    "Claude en Excel (Colombia)"
   ],
   "trasp": {
    "ofi": 2,
    "lim": 0,
    "ext": 0,
    "sc": 0,
    "inf": 9,
    "ver": "inf"
   },
   "proc": [
    "6.6",
    "8.3"
   ],
   "src": "E-11 · E-14 · E-19 · E-34 · E-39 · E-40 · E-59",
   "confirmar": "Cómo compra, factura y recibe Guatemala, cuya logística y administración lleva un operador tercero; la evidencia del levantamiento sobre ese frente es escasa.",
   "catenaria": {
    "tipo": "L·P",
    "t": "Cada país adapta la línea gráfica regional y sus promociones; el socio de Costa Rica somete sus piezas a la aprobación de Panamá.",
    "ev": "E-42 · E-31 · E-19"
   }
  },
  {
   "id": "9b",
   "ramal": "paises",
   "nivel": 1,
   "etapa": "9",
   "t": "Despacho y aduana",
   "tramo": "T11 · Despacho al país",
   "depto": "Tráfico · Operaciones país",
   "jefe": "Operaciones VE · Vladimir Castillo",
   "ev": "solida",
   "hoy": "La Zona Libre alista el pedido de cada país y lo despacha con su documentación. Cada destino tiene su propio paso aduanero: Venezuela recibe el contenedor por mar y lo nacionaliza con permisos sectoriales; Colombia importa a través de un tercero; Costa Rica recibe por camión en el almacén fiscal de San José; y Panamá local liquida la salida de Zona Libre antes de llevar la mercancía a la ciudad.",
   "pasos": [
    "La Zona Libre alista el pedido en unas dos semanas; lo que espera embarque marítimo se ubica en un área aparte [E-40 · SC-01]",
    "Panamá local: Tráfico factura a la entidad local y prepara con el agente de aduana la liquidación de salida, que agrega un día al traslado [E-70 · SC-06 · SC-03]",
    "Venezuela: el conocimiento de embarque, la factura y el documento de salida llegan por correo; operaciones los revisa y los entrega al agente de aduana [E-34]",
    "Venezuela: se tramitan los permisos sectoriales de SENCAMER y CONATEL, sin los cuales el embarque no se despacha, y se nacionaliza la carga [E-34]",
    "Aranceles, flete y seguro se distribuyen en el costo de cada unidad [E-65]",
    "Colombia: la importación la realiza un tercero autorizado, que cobra un recargo por el servicio [E-11]",
    "Costa Rica: la mercancía se entrega al operador logístico del socio en Zona Libre, viaja por tierra a San José y se nacionaliza allí [E-19]"
   ],
   "variantes": "El tránsito varía por destino: unos 15 días de mar hasta Venezuela, transporte terrestre hasta Costa Rica y un día adicional de liquidación para Panamá local. En Costa Rica la responsabilidad de Kenex termina con la entrega al operador logístico del socio.",
   "senal": "",
   "frenos": [
    {
     "id": "9b.1",
     "grado": "detiene",
     "t": "Colombia importa a través de un tercero, con un costo adicional, y ha tenido mercancía retenida en aduana.",
     "ev": "E-11",
     "antes": "9b.1"
    },
    {
     "id": "9b.2",
     "grado": "detiene",
     "t": "En Venezuela, la gestión aduanera, los permisos y buena parte de las decisiones operativas se concentran en un solo rol.",
     "ev": "E-34 · E-35",
     "antes": "9b.2"
    },
    {
     "id": "9b.3",
     "grado": "lento",
     "t": "El procedimiento aduanero de Venezuela no está documentado, y la falta de un certificado ha ocasionado retenciones de carga.",
     "ev": "E-34",
     "antes": "9b.3"
    },
    {
     "id": "9b.4",
     "grado": "lento",
     "t": "Planificación no recibe la guía del embarque y conoce la llegada de la mercancía por canales no formales.",
     "ev": "E-40",
     "antes": "9b.4"
    }
   ],
   "cifras": [
    "Preparar un pedido a Venezuela toma unas 2 semanas [E-40]",
    "Contenedor de 66 m³; se planifica hasta unos 60 [E-40]",
    "Panamá a Venezuela: unos 15 días de mar [SC-07]; alrededor de un mes de punta a punta [E-35]",
    "Arancel de relojería en Venezuela: del 20 % al 35 % [E-34]"
   ],
   "tripulacion": [
    "Operaciones VE · Vladimir Castillo",
    "Tesorería VE (permisos e impuestos) · Verónica Mejías",
    "Tráfico PA (Venezuela) · Karibeth López",
    "Tráfico PA (Panamá local) · Jovanna West",
    "Country manager CO · Joel Cohen",
    "Administración CR · Hugo"
   ],
   "senalizacion": [
    "Correo",
    "Papel",
    "De palabra",
    "EBS",
    "Portales de aduana y permisos",
    "PCGraph"
   ],
   "trasp": {
    "ofi": 1,
    "lim": 0,
    "ext": 1,
    "sc": 1,
    "inf": 8,
    "ver": "inf"
   },
   "proc": [
    "7.6",
    "7.1"
   ],
   "src": "E-11 · E-19 · E-34 · E-35 · E-40 · E-59 · E-65 · E-70 · SC-01 · SC-03 · SC-06 · SC-07",
   "confirmar": "El plazo de tránsito de Colón a Bogotá y el procedimiento con el que la bodega de la ciudad de Panamá recibe lo que llega de Zona Libre.",
   "catenaria": null
  },
  {
   "id": "10b",
   "ramal": "paises",
   "nivel": 1,
   "etapa": "10",
   "t": "Entrada al país y reparto",
   "tramo": "T08–T09 · Bodega del país",
   "depto": "Logística del país",
   "jefe": "Almacén VE · Elvis Badillo",
   "ev": "solida",
   "hoy": "La mercancía entra a la bodega de cada país, se verifica contra la factura y se reparte entre sus tres canales: tiendas, mayor local y web. Es el segundo cambio de agujas del circuito y no tiene una regla escrita. En Venezuela las tiendas se surten primero, luego la web y por último el mayor local; en Colombia los tres canales comparten un solo stock.",
   "pasos": [
    "Venezuela: logística ubica la mercancía, facturación registra la entrada y planificación levanta las diferencias contra la factura para su reclamo [E-34]",
    "Con contenedor en Venezuela: el día 1 se recibe, el 2 se verifica, el 3 salen las tiendas y el 4 y el 5 el mayor local [E-36]",
    "El stock objetivo de cada tienda aumenta con la distancia, y las tiendas grandes operan como almacenes satélite [E-34]",
    "Colombia: dos personas operan la bodega con el WMS de Odoo y la gerencia del país aprueba cada movimiento en Lark [E-11]",
    "Panamá local: la bodega de la ciudad surte al mayor local y a la web; las tiendas reciben directamente desde Zona Libre en el piloto vigente [E-03 · E-53]",
    "Costa Rica: el socio registra la entrada en su propio sistema y concilia los impuestos de la declaración aduanera [E-59]"
   ],
   "variantes": "El reparto varía por país: Venezuela prioriza tiendas y web sobre el mayor local; Colombia mantiene un stock único con un mínimo de un mes para tiendas y web; Panamá surte las tiendas desde Zona Libre y el mayor local y la web desde la ciudad. Costa Rica reparte con su propia operación, sin detalle aquí. La relación de cada país con el hub se salda en el cuadre entre empresas.",
   "senal": "En Colombia, la gerencia del país aprueba en Lark cada salida de mercancía de la bodega.",
   "frenos": [
    {
     "id": "10b.1",
     "grado": "detiene",
     "t": "En Venezuela la recepción de un contenedor ocupa el almacén durante varios días, y el mayor local recibe su mercancía una semana después que las tiendas.",
     "ev": "E-36",
     "antes": "10b.1"
    },
    {
     "id": "10b.2",
     "grado": "detiene",
     "t": "El inventario del sistema difiere del físico: hay reservas que no se liberan y existencias registradas que no están disponibles.",
     "ev": "E-34 · E-35",
     "antes": "10b.2"
    },
    {
     "id": "10b.3",
     "grado": "lento",
     "t": "Colombia no divide el inventario por canal, por lo que una venta grande del mayor local puede dejar sin stock a la web y a las tiendas.",
     "ev": "E-14",
     "antes": "10b.3"
    },
    {
     "id": "10b.4",
     "grado": "lento",
     "t": "La facturación y la aprobación de movimientos dependen de un solo rol en cada país.",
     "ev": "E-34 · E-11",
     "antes": "10b.4"
    },
    {
     "id": "10b.5",
     "grado": "lento",
     "t": "El reparto entre canales no tiene una regla escrita; en Venezuela el mayor local trabaja con lo que queda después de tiendas y web.",
     "ev": "E-35 · E-40",
     "antes": "10b.5"
    }
   ],
   "cifras": [
    "Coincidencia de referencias entre Panamá y Venezuela: 99,9 % [E-34]",
    "Colombia reserva un mínimo de un mes de cobertura para tiendas y web [E-14]"
   ],
   "tripulacion": [
    "Almacén VE · Elvis Badillo",
    "Logística y facturación VE · Yoly Pacheco",
    "Supervisión de almacén VE · Rogelio Aznárez",
    "Operaciones VE · Vladimir Castillo",
    "Bodega CO · Miguel Grisales",
    "Country manager CO (aprueba movimientos) · Joel Cohen",
    "Administración CR · Hugo"
   ],
   "senalizacion": [
    "Odoo",
    "WMS propio (VE, tablet)",
    "Lark",
    "Correo",
    "PCGraph (Costa Rica)"
   ],
   "trasp": {
    "ofi": 6,
    "lim": 3,
    "ext": 1,
    "sc": 1,
    "inf": 3,
    "ver": "ofi"
   },
   "proc": [
    "7.2",
    "7.8",
    "6.7"
   ],
   "src": "E-03 · E-11 · E-14 · E-34 · E-35 · E-36 · E-40 · E-53 · E-59",
   "confirmar": "Quién decide el reparto entre canales en cada país y con qué criterio cuando el stock no alcanza.",
   "catenaria": null
  },
  {
   "id": "11c",
   "ramal": "tiendas",
   "nivel": 2,
   "etapa": "11",
   "t": "Sugerido, pedido y aprobación",
   "tramo": "T12 · Tiendas",
   "depto": "Planificación · Retail",
   "jefe": "Planificación · Jimena Sánchez",
   "ev": "solida",
   "hoy": "La reposición de tiendas parte de un sugerido semanal que planificación calcula con el inventario y la venta de cada tienda. En Panamá, la supervisión de tiendas lo ajusta por espacio y exhibición, carga los pedidos en Odoo con la plantilla masiva y la gerencia comercial los aprueba. En Venezuela, planificación registra el pedido de cada tienda en Odoo y la reposición sale de la bodega del país.",
   "pasos": [
    "Planificación cruza el inventario y la venta de cada tienda y emite el sugerido semanal [E-53 · E-40]",
    "En Panamá, la supervisión de tiendas ajusta el sugerido según el espacio y la exhibición de cada punto [E-53 · SC-02]",
    "Los pedidos se cargan en Odoo con la plantilla masiva, con corte el lunes a las 12:00 [E-53 · SC-07]",
    "La gerencia comercial aprueba cada pedido en el sistema; a partir de esa aprobación la bodega lo recibe [E-53]",
    "En Venezuela, planificación registra en Odoo el pedido de cada tienda, lo imprime y lo entrega a la bodega del país [E-40 · E-47]",
    "Los pedidos urgentes se solicitan por correo o por WhatsApp [E-53 · E-47]"
   ],
   "variantes": "En Venezuela las tiendas se reponen desde la bodega del país, que las atiende antes que al mayor local cuando llega un contenedor. En Panamá el pedido de cada tienda sale directo de la Zona Libre, en el piloto vigente. De Colombia no hay evidencia sobre la reposición de sus islas.",
   "senal": "En Panamá la gerencia comercial aprueba cada pedido de tienda; sin esa aprobación el pedido no llega a la bodega.",
   "frenos": [
    {
     "id": "11c.1",
     "grado": "lento",
     "t": "En Venezuela los pedidos de tienda se registran uno a uno en Odoo y se imprimen, lo que toma entre 10 y 30 minutos por ciclo.",
     "ev": "E-40",
     "antes": "8c.1"
    },
    {
     "id": "11c.2",
     "grado": "lento",
     "t": "Los productos de mayor rotación llegan a quedar sin existencias en la ciudad mientras la Zona Libre conserva miles de unidades.",
     "ev": "E-57",
     "antes": "8c.2"
    }
   ],
   "cifras": [
    "Cobertura objetivo en tienda: 3 a 4 semanas, priorizada por Pareto [E-40]"
   ],
   "tripulacion": [
    "Planificación · Jimena Sánchez",
    "Supervisión de tiendas PA · Blas García",
    "Gerencia comercial (aprueba) · Andrés Roizental",
    "Ventas al detal VE · María Eugenia Villegas",
    "Operaciones VE · Vladimir Castillo"
   ],
   "senalizacion": [
    "Excel",
    "Odoo",
    "Correo",
    "WhatsApp",
    "Papel"
   ],
   "trasp": {
    "ofi": 2,
    "lim": 0,
    "ext": 0,
    "sc": 0,
    "inf": 4,
    "ver": "inf"
   },
   "proc": [
    "9.3",
    "6.7"
   ],
   "src": "E-40 · E-47 · E-53 · E-57 · SC-02 · SC-07",
   "confirmar": "Cómo se reponen las islas de Colombia y si los pedidos de tienda de Venezuela pasan por el WMS.",
   "catenaria": null
  },
  {
   "id": "12c",
   "ramal": "tiendas",
   "nivel": 2,
   "etapa": "12",
   "t": "Despacho a tienda",
   "tramo": "T15 · Despacho a tienda",
   "depto": "Bodega · Tráfico",
   "jefe": "Tráfico PA (factura y liquida) · Jovanna West",
   "ev": "solida",
   "hoy": "En Panamá, el piloto vigente despacha cada pedido de tienda directo desde la Zona Libre: la bodega lo prepara en EBS, Tráfico lo factura a la entidad local y tramita la liquidación de aduana, y los camiones propios lo entregan con la ruta y la lista de empaque. En Venezuela, el transporte propio abastece las tiendas de Caracas tres días por semana y un transportista tercero atiende el interior.",
   "pasos": [
    "La Zona Libre prepara en EBS el pedido de cada tienda y emite la lista de empaque [E-70]",
    "Tráfico revisa el pedido, lo factura a la entidad local y registra la compra correspondiente [E-70 · E-53]",
    "Tráfico elabora la liquidación de salida con el agente de aduana y programa la carga en EBS [E-70]",
    "El pedido se prepara el lunes y el martes se liquida y se entrega; llega a las tiendas entre martes y jueves [SC-07 · E-53]",
    "Dos camiones propios hacen la ruta con los horarios de recepción de cada tienda y la lista de empaque impresos [E-70 · SC-01]",
    "En Venezuela, el transporte propio sale lunes, miércoles y viernes a las tiendas de Caracas y en el retorno trae reparaciones, devoluciones y efectivo [E-47 · E-34]",
    "Al interior despacha un transportista tercero cuando el flete compensa el valor del envío, con la liquidación de aduana a bordo [E-34]"
   ],
   "variantes": "Margarita mantiene más inventario porque el envío cuesta el doble, y tiene reglas propias para devolver mercancía al continente. Antes del piloto, en Panamá la mercancía entraba a la bodega de la ciudad y desde allí se trasladaba a cada tienda durante la semana.",
   "senal": "",
   "frenos": [
    {
     "id": "12c.1",
     "grado": "lento",
     "t": "En la primera semana del piloto la mercancía llegó sin lista de empaque, y algunas tiendas solo reciben hasta el mediodía, lo que acota la ventana de entrega.",
     "ev": "E-53",
     "antes": "9c.1"
    },
    {
     "id": "12c.2",
     "grado": "lento",
     "t": "La ruta, los horarios de recepción y la lista de empaque viajan impresos con el chofer y no se siguen en el sistema.",
     "ev": "E-70",
     "antes": "9c.2"
    }
   ],
   "cifras": [
    "Pedido a tienda en Panamá: de 13 días a 2 con el despacho directo [E-69]",
    "Flota propia en Caracas: 3 camionetas [E-34]"
   ],
   "tripulacion": [
    "Tráfico PA (factura y liquida) · Jovanna West",
    "Logística PA · Fernando Alvarado",
    "Operaciones VE · Vladimir Castillo"
   ],
   "senalizacion": [
    "EBS",
    "Odoo",
    "Papel"
   ],
   "trasp": {
    "ofi": 1,
    "lim": 0,
    "ext": 0,
    "sc": 0,
    "inf": 2,
    "ver": "inf"
   },
   "proc": [
    "7.3",
    "7.4",
    "7.5"
   ],
   "src": "E-03 · E-34 · E-47 · E-53 · E-69 · E-70 · SC-01 · SC-07",
   "confirmar": "Si el despacho directo desde la Zona Libre a cada tienda se mantiene después de la medición del piloto.",
   "catenaria": null
  },
  {
   "id": "13c",
   "ramal": "tiendas",
   "nivel": 2,
   "etapa": "13",
   "t": "Recepción en tienda",
   "tramo": "T12 · Tiendas",
   "depto": "Retail",
   "jefe": "Supervisión de tiendas PA · Blas García",
   "ev": "solida",
   "hoy": "La tienda recibe la mercancía y la cuenta pieza por pieza contra la lista de empaque. En Panamá, la supervisión de tiendas compara lo facturado con el pedido y valida en Odoo el traslado que estaba en borrador; con esa validación la mercancía queda disponible para la venta. En Venezuela, la tienda verifica con su hoja de recepción y comunica las diferencias a la oficina.",
   "pasos": [
    "La tienda cuenta la mercancía pieza por pieza contra la lista de empaque; una persona revisa y otra guarda [E-53 · SC-02]",
    "La supervisión de tiendas compara una por una las líneas facturadas con el pedido [E-53]",
    "La supervisión valida en Odoo el traslado de la bodega de la ciudad a la tienda, que estaba en borrador [E-53]",
    "En Venezuela, la tienda verifica con su hoja de recepción y comunica por teléfono cualquier faltante [E-40]",
    "La tienda hace inventario selectivo dos a tres veces por semana con la aplicación del WMS en tableta [E-53 · SC-02]"
   ],
   "variantes": "En Panamá la recepción se registra con dos documentos, la factura de la Zona Libre a la entidad local y el traslado a la tienda, aunque la mercancía llegue directo desde Colón.",
   "senal": "",
   "frenos": [
    {
     "id": "13c.1",
     "grado": "detiene",
     "t": "La mercancía recibida no puede venderse hasta completar el doble registro de factura y traslado, que depende de un solo supervisor.",
     "ev": "E-53",
     "antes": "10c.1"
    },
    {
     "id": "13c.2",
     "grado": "lento",
     "t": "En Venezuela los faltantes de la recepción se resuelven por teléfono y sin registro, lo que obliga a rastrear la mercancía después.",
     "ev": "E-40",
     "antes": "10c.2"
    }
   ],
   "cifras": [],
   "tripulacion": [
    "Supervisión de tiendas PA · Blas García",
    "Ventas al detal VE · María Eugenia Villegas"
   ],
   "senalizacion": [
    "Papel",
    "Odoo",
    "App WMS (tablet)"
   ],
   "trasp": {
    "ofi": 2,
    "lim": 0,
    "ext": 0,
    "sc": 0,
    "inf": 3,
    "ver": "inf"
   },
   "proc": [
    "9.3",
    "7.8",
    "9.14"
   ],
   "src": "E-40 · E-53 · SC-02",
   "confirmar": "",
   "catenaria": null
  },
  {
   "id": "14c",
   "ramal": "tiendas",
   "nivel": 2,
   "etapa": "14",
   "t": "Venta en tienda",
   "tramo": "T12 · Tiendas",
   "depto": "Retail · Visual",
   "jefe": "Retail regional · Handani Mora",
   "ev": "solida",
   "hoy": "Las tiendas venden con Odoo POS. En Venezuela el cobro se procesa en BPOS, integrado con varios bancos, y en la impresora fiscal. Casio se exhibe por línea según los parámetros de la marca y Cubitt por color. Visual instala las artes y promociones que define mercadeo, y retail regional fija con la dirección comercial las metas de cada país, que la gerencia de tiendas distribuye por tienda.",
   "pasos": [
    "La venta se registra en Odoo POS; en Panamá se acepta efectivo, tarjeta, transferencia y pago móvil [SC-02 · E-53]",
    "En Venezuela la tienda carga la tasa del día al abrir y cobra con BPOS, que integra varios bancos fuera de Odoo [E-47 · E-33]",
    "Se exhibe una unidad por modelo y el resto se guarda en la tienda [SC-02]",
    "Retail regional y la dirección comercial fijan metas por país, y la gerencia de tiendas las distribuye por tienda [E-47]",
    "Cuando falta un producto, retail identifica en Odoo qué tienda lo tiene y solicita por correo un traslado entre tiendas [E-47 · E-53]",
    "En Panamá cada venta se registra con el código del vendedor y la supervisión calcula las comisiones, que carga talento humano [E-54]"
   ],
   "variantes": "La red suma unas 50 tiendas: 21 en Venezuela a agosto, unas 10 en Panamá, dos islas y un flagship en apertura en Colombia, las de Guatemala con operador, las del socio en Costa Rica y franquicias Casio en Honduras y República Dominicana. En Venezuela los traslados entre tiendas empiezan por las del mismo centro comercial, y desde mayo hay un bono grupal por tienda al cumplir la meta.",
   "senal": "",
   "frenos": [
    {
     "id": "14c.1",
     "grado": "lento",
     "t": "La venta perdida no se registra cuando el cliente pide un producto sin existencias.",
     "ev": "SC-02",
     "antes": "11c.1"
    },
    {
     "id": "14c.2",
     "grado": "lento",
     "t": "Algunos productos llegan a tienda sin precio de venta cargado y no pueden venderse hasta que se registra.",
     "ev": "E-53",
     "antes": "11c.2"
    },
    {
     "id": "14c.3",
     "grado": "lento",
     "t": "En Venezuela las fallas de conectividad y de los bancos interrumpen el cobro, y el soporte a tiendas recae en una sola persona.",
     "ev": "E-33 · E-07",
     "antes": "11c.3"
    },
    {
     "id": "14c.4",
     "grado": "lento",
     "t": "Las promociones pasaron de una a cinco o seis por país al mes, con artes que en ocasiones deben rehacerse.",
     "ev": "E-50",
     "antes": "11c.4"
    },
    {
     "id": "14c.5",
     "grado": "lento",
     "t": "Los traslados entre tiendas se solicitan por correo y dependen de la ruta y el horario de los choferes, lo que genera descuadres de inventario.",
     "ev": "E-40 · E-53 · E-55",
     "antes": null
    }
   ],
   "cifras": [
    "Venta de una isla: unos 30.000 USD al mes; tienda Cubitt de Metromall: unos 50.000 [SC-02]",
    "Montaje: kiosco, unos 15.000 USD; tienda, unos 60.000 [SC-02]"
   ],
   "tripulacion": [
    "Retail regional · Handani Mora",
    "Ventas al detal VE · María Eugenia Villegas",
    "Supervisión de tiendas PA · Blas García",
    "Visual regional · Reyna Barraza",
    "Supervisión Cubitt VE · Carlos Márquez",
    "Supervisión Casio VE · Carlos Velásquez"
   ],
   "senalizacion": [
    "Odoo POS",
    "BPOS (Megasoft)",
    "Impresora fiscal",
    "Follow Up",
    "Correo",
    "WhatsApp"
   ],
   "trasp": {
    "ofi": 3,
    "lim": 1,
    "ext": 4,
    "sc": 1,
    "inf": 3,
    "ver": "mix"
   },
   "proc": [
    "9.6",
    "9.7",
    "9.13",
    "16.7",
    "9.4",
    "9.17"
   ],
   "src": "E-07 · E-08 · E-21 · E-33 · E-40 · E-47 · E-50 · E-53 · E-54 · E-55 · SC-02",
   "confirmar": "Cómo se calculan hoy las comisiones del personal de tienda en cada país.",
   "catenaria": {
    "tipo": "P·L",
    "t": "Visual instala los lanzamientos y cinco a seis promociones por país al mes; en Venezuela cada promoción requiere un permiso previo.",
    "ev": "E-50 · E-31"
   }
  },
  {
   "id": "15c",
   "ramal": "tiendas",
   "nivel": 2,
   "etapa": "15",
   "t": "Cierre de caja",
   "tramo": "T12 → T16 · Cierre",
   "depto": "Retail · Tesorería",
   "jefe": "Supervisión de tiendas PA · Blas García",
   "ev": "solida",
   "hoy": "Al cierre del día cada tienda cuadra la caja por medio de pago y deposita lo recaudado. Luego registra la venta, las unidades y las transacciones del día en el cuadro de retail regional. En Caracas el efectivo viaja a tesorería con el transporte de tiendas; en el interior de Venezuela se deposita en el banco y el reporte del día se envía por correo en la noche.",
   "pasos": [
    "En Panamá cada tienda opera con un fondo de 600 USD, cuadra contra el cierre bancario y deposita en la agencia del centro comercial [SC-02 · E-53]",
    "En la tienda sin agencia bancaria, contabilidad retira el efectivo y un mensajero lo deposita [E-53]",
    "En Caracas el efectivo viaja a tesorería con el transporte de lunes, miércoles y viernes, y los comprobantes en otra valija [E-47]",
    "En el interior de Venezuela se deposita en el banco y la documentación viaja por MRW [E-47]",
    "En Venezuela la caja se verifica contra el reporte Z de la máquina fiscal [E-38]",
    "El cierre del día se registra en el cuadro compartido de retail regional [E-55]"
   ],
   "variantes": "",
   "senal": "",
   "frenos": [
    {
     "id": "15c.1",
     "grado": "lento",
     "t": "La venta diaria se transcribe manualmente con un formato distinto por país, y las anomalías se detectan por revisión visual.",
     "ev": "E-55 · E-47",
     "antes": "12c.1"
    },
    {
     "id": "15c.2",
     "grado": "lento",
     "t": "En Venezuela la caja se concilia manualmente contra el reporte Z de la máquina fiscal.",
     "ev": "E-38",
     "antes": "12c.2"
    }
   ],
   "cifras": [
    "Cadencia de reporte: venta diaria, inventario semanal y P&L mensual por tienda, este último aún pendiente en Panamá y Venezuela [E-55]"
   ],
   "tripulacion": [
    "Supervisión de tiendas PA · Blas García",
    "Ventas al detal VE · María Eugenia Villegas",
    "Tesorería VE (recibe el efectivo) · Marvis Caraballo",
    "Retail regional (cuadro diario) · Handani Mora"
   ],
   "senalizacion": [
    "Odoo",
    "Excel / Drive (cuadro de retail)",
    "Correo",
    "Papel (valija, cuaderno)"
   ],
   "trasp": {
    "ofi": 2,
    "lim": 0,
    "ext": 0,
    "sc": 0,
    "inf": 6,
    "ver": "inf"
   },
   "proc": [
    "9.5",
    "9.15",
    "12.2",
    "9.2"
   ],
   "src": "E-38 · E-47 · E-53 · E-55 · SC-02",
   "confirmar": "Cómo cierran caja las islas de Colombia.",
   "catenaria": null
  },
  {
   "id": "SW",
   "ramal": "alimentacion",
   "nivel": 2,
   "etapa": "",
   "t": "Surtido de la bodega web",
   "tramo": "T13 · Web",
   "depto": "E-commerce · Bodega del país",
   "jefe": "Ventas web VE · Jesmir Flores",
   "ev": "parcial",
   "hoy": "La venta web se atiende desde un inventario propio que se repone como el de una tienda. En Venezuela el almacén web está separado del almacén principal, para que las reservas del mayor no comprometan lo que se ofrece en línea, y se surte dos veces por semana. En Panamá la web se surte desde la bodega de la ciudad, que comparte con el mayor local. Colombia vende desde el stock único del país.",
   "pasos": [
    "En Venezuela, e-commerce compara en Odoo el inventario del almacén principal con el propio y envía un sugerido de reposición [E-16 · E-41]",
    "El almacén principal registra el traslado en Odoo, lo prepara y lo entrega los lunes y miércoles, con la cadencia de una tienda [E-34 · E-16]",
    "La reposición se activa por stock próximo a agotarse, por una promoción cercana o por la llegada de un contenedor, que genera un traslado automático [E-41 · E-16]",
    "El almacén web verifica la mercancía y acepta el traslado en el sistema [E-16]",
    "En Panamá, planificación calcula la necesidad, ventas la ajusta, la dirección de compras la aprueba y el pedido se envía a la Zona Libre [E-39]",
    "La salida desde la Zona Libre se liquida antes del despacho, lo que agrega un día [SC-06 · SC-03]"
   ],
   "variantes": "Venezuela tiene almacén web propio dentro de la bodega del país. Panamá surte la web desde la bodega de la ciudad y, si falta un producto, lo trae de una tienda con un traslado y un mensajero. Colombia no tiene bodega web y vende del stock único del país.",
   "senal": "En Panamá la dirección de compras aprueba el pedido de surtido de la bodega de la ciudad.",
   "frenos": [
    {
     "id": "SW.1",
     "grado": "lento",
     "t": "E-commerce conoce la mercancía nueva cuando llega el contenedor y se genera el traslado automático, sin aviso previo para planificar su venta.",
     "ev": "E-16",
     "antes": "SW.1"
    },
    {
     "id": "SW.2",
     "grado": "lento",
     "t": "Mientras se reciben traslados, el almacén web reduce su capacidad de despacho.",
     "ev": "E-41",
     "antes": "SW.2"
    },
    {
     "id": "SW.3",
     "grado": "lento",
     "t": "Desde la Zona Libre no es posible despachar en el mismo día, porque cada salida se liquida y suma un día.",
     "ev": "SC-06 · SC-03",
     "antes": "SW.3"
    }
   ],
   "cifras": [],
   "tripulacion": [
    "Ventas web VE · Jesmir Flores",
    "Planificación · Jimena Sánchez",
    "Mayor PA · Edumar Escalona"
   ],
   "senalizacion": [
    "Odoo",
    "WMS (tablet)",
    "Teléfono",
    "Portal DMC"
   ],
   "trasp": {
    "ofi": 4,
    "lim": 0,
    "ext": 1,
    "sc": 1,
    "inf": 2,
    "ver": "mix"
   },
   "proc": [
    "10.12",
    "7.8"
   ],
   "src": "E-14 · E-16 · E-34 · E-39 · E-41 · E-53 · SC-03 · SC-06",
   "confirmar": "Cómo se recibe en la bodega de la ciudad lo que llega de la Zona Libre y con qué frecuencia se surte el almacén web de Venezuela.",
   "catenaria": null
  },
  {
   "id": "11d",
   "ramal": "web",
   "nivel": 2,
   "etapa": "11",
   "t": "Pedido y pago",
   "tramo": "T13–T16 · Web y pago",
   "depto": "E-commerce",
   "jefe": "Ventas web VE · Jesmir Flores",
   "ev": "solida",
   "hoy": "En Venezuela la venta digital entra por Cashea, que concentra cerca del 80 %, por las tiendas Shopify, por WhatsApp y por MercadoLibre. Antes de preparar, el equipo valida el pago: Cashea se filtra en su portal, la web de Cubitt cobra con pasarela y los pagos por WhatsApp se confirman uno a uno contra el banco. Con el pago confirmado, el pedido pasa a preparación en Odoo. En Panamá y Colombia confirma el pago contabilidad.",
   "pasos": [
    "E-commerce publica los productos en Cashea y MercadoLibre una vez que la mercancía está en el almacén [E-16]",
    "Los pedidos de Cashea llegan al portal del comercio; una persona filtra los pagados y los confirma en Odoo [E-41]",
    "Por WhatsApp (Mercately), el asesor vende con enlace de Cashea, directamente en Odoo o con el enlace de la web [E-16 · E-41]",
    "La web de Cubitt cobra con pasarela de pago desde hace uno a dos meses [E-41]",
    "Los pagos móviles recibidos por WhatsApp se validan manualmente contra el banco en el grupo «Confirmaciones» de Lark [E-41]",
    "Cashea financia al cliente; desde el 15 de julio su nivel más alto tiene 0 % de inicial [E-41]",
    "Con el pago confirmado, e-commerce envía el pedido a preparación en Odoo con la instrucción de envío [E-41]",
    "Las ventas a crédito se canalizan por el mayor local; en Panamá y Colombia contabilidad confirma los pagos [E-41 · E-02]"
   ],
   "variantes": "Colombia vende por Shopify y nueve marketplaces. Kenex USA opera su venta en línea en 15 marketplaces, con Shopify y QuickBooks, en su línea independiente.",
   "senal": "El pedido pasa a preparación solo con el pago confirmado; la cuota inicial de Cashea la fija la presidencia.",
   "frenos": [
    {
     "id": "11d.1",
     "grado": "detiene",
     "t": "La integración de Cashea con Odoo trae pedidos cancelados y sin datos de contacto; depurarlos exige una hoja paralela y una persona dedicada.",
     "ev": "E-41",
     "antes": "8d.1"
    },
    {
     "id": "11d.2",
     "grado": "lento",
     "t": "E-commerce conoce los productos nuevos cuando la mercancía ya llegó, sin un plan de lanzamiento previo.",
     "ev": "E-16",
     "antes": "8d.2"
    },
    {
     "id": "11d.3",
     "grado": "lento",
     "t": "El canal de chat atiende unas 6.000 conversaciones al mes solo de Cubitt en Venezuela, por encima de su capacidad.",
     "ev": "E-41 · E-26",
     "antes": "8d.3"
    },
    {
     "id": "11d.4",
     "grado": "detiene",
     "t": "En Venezuela el mismo equipo que vende valida sus propios pagos; separar esas dos funciones fortalecería el control.",
     "ev": "E-41 · E-58",
     "antes": "8d.4"
    },
    {
     "id": "11d.5",
     "grado": "lento",
     "t": "La confirmación del pago queda registrada en un chat y no en Odoo, sin un panel de pagos aprobados.",
     "ev": "E-41",
     "antes": "8d.5"
    },
    {
     "id": "11d.6",
     "grado": "lento",
     "t": "En Panamá la conciliación de los pagos web lleva unos dos meses de rezago.",
     "ev": "E-02",
     "antes": "8d.6"
    }
   ],
   "cifras": [
    "Julio de 2026: 5.063 órdenes en Venezuela [E-41]",
    "Cashea: unos 3.000 pedidos al mes de Cubitt y 1.000 de Casio [E-16]",
    "Crecimiento cercano al 230 % desde julio de 2025 [E-16]",
    "Validaciones manuales: de 30–40 al día a 10–15 [E-41]"
   ],
   "tripulacion": [
    "Ventas web VE · Jesmir Flores",
    "Pedidos Cashea VE · Jeyker Martínez",
    "Webs Shopify · Cynthia de la Barrera",
    "Venta online PA · Reinaldo Méndez",
    "Venta online PA · Luis Peroza",
    "Atención al cliente PA · Patrick Corujo",
    "E-commerce regional · Clara Arosemena",
    "Marketplaces CO · Tatiana Rodríguez",
    "Tesorería VE (divisas) · Verónica Mejías",
    "Presidencia (inicial de Cashea) · Bernardo Roizental"
   ],
   "senalizacion": [
    "Cashea",
    "Shopify",
    "Mercately (WhatsApp)",
    "MercadoLibre (vía Mercatech)",
    "Odoo",
    "Excel",
    "Chat de Lark",
    "Banca en línea",
    "Pasarela de pago (web Cubitt)"
   ],
   "trasp": {
    "ofi": 8,
    "lim": 4,
    "ext": 6,
    "sc": 2,
    "inf": 5,
    "ver": "mix"
   },
   "proc": [
    "10.3",
    "10.4",
    "10.6",
    "10.7",
    "10.8"
   ],
   "src": "E-02 · E-11 · E-16 · E-26 · E-30 · E-41 · E-58 · SC-03",
   "confirmar": "",
   "catenaria": {
    "tipo": "P·L",
    "t": "E-commerce activa las promociones y los banners regionales, y publica los productos nuevos cuando la mercancía ya está en el almacén.",
    "ev": "E-42 · E-16"
   }
  },
  {
   "id": "12d",
   "ramal": "web",
   "nivel": 2,
   "etapa": "12",
   "t": "Preparación y envío",
   "tramo": "T15 · Despacho web",
   "depto": "Logística web",
   "jefe": "Logística web VE · Ricardo Castillo",
   "ev": "solida",
   "hoy": "En Venezuela el pedido confirmado aparece en la tableta del almacén web, donde el operario lo prepara, lo escanea y lo etiqueta. La factura fiscal se imprime y viaja dentro del paquete, por lo que la caja se cierra cuando la factura llega. Luego se emparejan factura, guía y caja, y el paquete queda listo para el courier. En Panamá el courier integrado genera la guía automáticamente.",
   "pasos": [
    "La tableta del WMS muestra canal, producto y cantidad; el operario prepara y escanea cada unidad [E-41]",
    "El operario envía la foto de la etiqueta al grupo de facturación [E-41]",
    "Facturación emite la factura fiscal en Odoo; desde el 17 de agosto también se emite en formato digital [E-38]",
    "Se genera la guía de Cashea, MRW o Zoom; si la integración falla, se registra manualmente en un archivo compartido [E-41]",
    "Factura, guía y caja se emparejan, y el paquete se cierra y se embala para el courier [E-41]"
   ],
   "variantes": "En Panamá un operario de la bodega de la ciudad atiende e-commerce y garantías, contabilidad factura después de que la bodega prepara el pedido y el courier integrado genera la guía. En Colombia dos personas preparan y despachan desde la bodega del país.",
   "senal": "",
   "frenos": [
    {
     "id": "12d.1",
     "grado": "detiene",
     "t": "Las cajas permanecen abiertas hasta que llega la factura física, lo que retrasa el cierre y el despacho de cada pedido.",
     "ev": "E-41 · E-04",
     "antes": "9d.1"
    },
    {
     "id": "12d.2",
     "grado": "detiene",
     "t": "El almacén web tiene poco espacio para el volumen actual y parte del embalaje se hace fuera de él, lo que limita la capacidad en temporada alta.",
     "ev": "E-16 · E-41",
     "antes": "9d.2"
    }
   ],
   "cifras": [
    "150 a 200 envíos al día; unos 800 escaneados en un fin de semana [E-41]",
    "Diciembre: entre 120 % y 160 % más volumen [E-16 · E-41]"
   ],
   "tripulacion": [
    "Logística web VE · Ricardo Castillo",
    "Operaciones web VE · Leonardo Guevara",
    "Facturación web VE · Alexandra Gil"
   ],
   "senalizacion": [
    "WMS (tablet)",
    "Odoo",
    "Papel (factura física, guías)",
    "Archivo compartido de guías",
    "Excel",
    "MRW / Zoom"
   ],
   "trasp": {
    "ofi": 2,
    "lim": 0,
    "ext": 1,
    "sc": 0,
    "inf": 6,
    "ver": "inf"
   },
   "proc": [
    "10.9",
    "10.10"
   ],
   "src": "E-02 · E-04 · E-11 · E-16 · E-38 · E-41 · SC-03",
   "confirmar": "En Colombia, si la factura se emite antes o después de preparar el pedido.",
   "catenaria": null
  },
  {
   "id": "13d",
   "ramal": "web",
   "nivel": 2,
   "etapa": "13",
   "t": "Entrega al cliente",
   "tramo": "T15 · Entrega web",
   "depto": "Logística web",
   "jefe": "Logística web VE · Ricardo Castillo",
   "ev": "solida",
   "hoy": "En Venezuela MRW retira los paquetes a diario y Zoom los martes, jueves y viernes; en Caracas también entregan motorizados y el cliente puede retirar en la oficina. El equipo web da seguimiento a cada envío y gestiona los reclamos con el courier; cuando un paquete se extravía, la empresa asume el costo. En Panamá Entrego genera la guía con seguimiento.",
   "pasos": [
    "MRW retira a diario y Zoom los martes, jueves y viernes [E-41]",
    "En Caracas entregan motorizados, con las rutas registradas en Drive y en una hoja impresa [E-16 · E-41]",
    "El cliente puede retirar el pedido en la oficina [E-41]",
    "El equipo web da seguimiento al envío y gestiona el reclamo con el courier cuando hay una incidencia [E-41]",
    "En Panamá, Entrego genera la guía con seguimiento para el cliente [E-02]",
    "Con los couriers no integrados, el vendedor envía la guía al cliente por WhatsApp [E-02]"
   ],
   "variantes": "En Panamá también se despacha con Uno Express, con mensajero o con transporte al interior.",
   "senal": "",
   "frenos": [
    {
     "id": "13d.1",
     "grado": "lento",
     "t": "No existe un panel de despachos; cada asesor dedica cerca de una hora al día a confirmar si un pedido salió.",
     "ev": "E-41",
     "antes": "10d.1"
    },
    {
     "id": "13d.2",
     "grado": "lento",
     "t": "Cuando el courier extravía un paquete, la empresa asume la pérdida.",
     "ev": "E-41",
     "antes": "10d.2"
    }
   ],
   "cifras": [],
   "tripulacion": [
    "Logística web VE · Ricardo Castillo",
    "Guías Cashea VE · Jeyker Martínez",
    "Atención al cliente PA · Patrick Corujo"
   ],
   "senalizacion": [
    "MRW / Zoom",
    "Drive",
    "WhatsApp (Panamá)",
    "Papel"
   ],
   "trasp": {
    "ofi": 0,
    "lim": 0,
    "ext": 1,
    "sc": 1,
    "inf": 3,
    "ver": "inf"
   },
   "proc": [
    "10.11"
   ],
   "src": "E-02 · E-16 · E-39 · E-41 · SC-03",
   "confirmar": "Qué plazo de entrega se promete al cliente final en cada país.",
   "catenaria": null
  },
  {
   "id": "11e",
   "ramal": "mayorlocal",
   "nivel": 2,
   "etapa": "11",
   "t": "Pedido y aprobación",
   "tramo": "T10 · Mayor local",
   "depto": "Ventas al mayor del país",
   "jefe": "Mayor PA, VE y CO · Escalona, Márquez y Ramírez",
   "ev": "solida",
   "hoy": "Cada país vende al mayor desde su propio stock, con un equipo comercial local. El vendedor toma el pedido, a partir de un sugerido o de la lista de precios, y lo registra en Odoo. Antes de que la bodega lo prepare, el pedido pasa por una aprobación local: la del mayor del país en los créditos de Panamá, la del gerente de ventas en Venezuela y la de la gerencia del país en Colombia.",
   "pasos": [
    "En Panamá el vendedor registra el pedido en Odoo; el de contado pasa directo a la bodega [E-39]",
    "El pedido a crédito requiere dos aprobaciones del mayor del país en Odoo, para preparar y para facturar, tras revisar mercancía, margen y deuda [E-39]",
    "En Venezuela el vendedor propone un sugerido o el cliente pide sobre la lista; las tiendas pequeñas piden cada semana y las cadenas cada mes [E-35 · E-36]",
    "El pedido se arma en una plantilla de Excel que marca lo no disponible y se carga en Odoo [E-36 · E-34]",
    "El gerente de ventas filtra deuda y condiciones para que la bodega reciba pedidos listos para preparar [E-34]",
    "Los clientes corporativos de Venezuela generan su orden en un portal propio con la lista de precios de Odoo; la orden de venta se crea después manualmente [SC-08]",
    "En Colombia la orden de compra de cada cadena se gestiona comercialmente y la gerencia del país aprueba en Lark cada salida de mercancía [E-14 · E-11]"
   ],
   "variantes": "Venezuela maneja tres listas de precio (en bolívares, en dólares y precio de venta sugerido) y atiende tiendas pequeñas, cadenas, grandes superficies, redistribuidores y corporativos. Panamá atiende revendedores, cadenas, venta corporativa con pago diferido y clientes del interior. La venta corporativa incluye pedidos grabados con la marca del cliente. La comisión de los vendedores se calcula sobre lo cobrado y orienta qué marcas y clientes se priorizan.",
   "senal": "En Panamá el mayor del país aprueba los pedidos a crédito; en Venezuela el gerente de ventas filtra deuda y condiciones; en Colombia la gerencia del país aprueba cada salida.",
   "frenos": [
    {
     "id": "11e.1",
     "grado": "detiene",
     "t": "En Venezuela el mayor local se atiende después de tiendas y web, y suele recibir solo una parte de lo que pide.",
     "ev": "E-35",
     "antes": "8a.1"
    },
    {
     "id": "11e.2",
     "grado": "lento",
     "t": "Parte de la venta al mayor se acuerda por teléfono y no queda registrada en Odoo.",
     "ev": "SC-11 · E-26",
     "antes": "8a.3"
    },
    {
     "id": "11e.3",
     "grado": "lento",
     "t": "El vendedor dedica buena parte de su jornada al montaje de pedidos y a la conciliación de pagos, lo que reduce las visitas y la prospección.",
     "ev": "E-36 · E-35",
     "antes": null
    },
    {
     "id": "11e.4",
     "grado": "lento",
     "t": "En Panamá la venta a revendedores se gestiona por chat y su conversión a pedido de Odoo se hace manualmente.",
     "ev": "E-57",
     "antes": null
    },
    {
     "id": "11e.5",
     "grado": "lento",
     "t": "El portal corporativo de Venezuela no está conectado al inventario, y cada orden se transcribe a Odoo.",
     "ev": "SC-08",
     "antes": null
    }
   ],
   "cifras": [
    "Seis vendedores en el mayor de Panamá y seis en el de Venezuela [E-39 · E-35]",
    "El segundo cliente del mayor de Venezuela compra unos 600 mil USD al año [E-35]",
    "La venta a revendedores de Panamá suma cerca de 0,5 M USD al año [E-57]"
   ],
   "tripulacion": [
    "Mayor PA · Edumar Escalona",
    "Mayor VE · Andrés Márquez",
    "Coordinación mayor VE · Henry Lucena",
    "Comercial CO · Santiago Ramírez",
    "Country manager CO (aprueba salidas) · Joel Cohen"
   ],
   "senalizacion": [
    "Odoo",
    "Excel",
    "WhatsApp",
    "Teléfono",
    "Lark",
    "Portal B2B propio (VE)"
   ],
   "trasp": {
    "ofi": 4,
    "lim": 0,
    "ext": 1,
    "sc": 1,
    "inf": 3,
    "ver": "mix"
   },
   "proc": [
    "8.4",
    "8.5",
    "8.7",
    "8.9",
    "8.14"
   ],
   "src": "E-11 · E-14 · E-26 · E-34 · E-35 · E-36 · E-39 · E-57 · SC-08 · SC-11",
   "confirmar": "Quién aprueba los pedidos a crédito del mayor local de Panamá, el mayor del país o la gerencia comercial, y cómo se aprueba la venta al mayor en Colombia antes de la salida de mercancía.",
   "catenaria": {
    "tipo": "C·P",
    "t": "El mayor local solicita a visual el mueble y el material de punto de venta de cada cliente, según su historial de compra; en Venezuela hay metas por marca con descuentos y material adicional para Casio.",
    "ev": "E-39 · E-36"
   }
  },
  {
   "id": "12e",
   "ramal": "mayorlocal",
   "nivel": 2,
   "etapa": "12",
   "t": "Preparación, factura y despacho",
   "tramo": "T15 · Despacho del mayor local",
   "depto": "Bodega del país · Facturación",
   "jefe": "Almacén VE · Elvis Badillo",
   "ev": "solida",
   "hoy": "El pedido aprobado llega al WMS de la bodega del país, que lo prepara, lo controla y lo deja listo para despachar. La factura se emite con el pedido completo: en Venezuela después del control de calidad, y en Panamá, si es de contado, cuando finanzas confirma el pago en el banco. El despacho se hace con flota propia, transportista, courier o retiro del cliente, según el país y el destino.",
   "pasos": [
    "El pedido aprobado aparece en el WMS como normal, con 48 horas para despachar, o como urgente [E-34 · E-36]",
    "La supervisión de almacén asigna un despachador, que hace el picking con tableta; los faltantes se notifican al gerente de almacén [E-34 · E-36]",
    "Se hace el empaque y el control de calidad por código y color, y el vendedor recibe un correo de pedido verificado [E-34 · E-36]",
    "Facturación revisa en Lark los cambios de cantidad y color, y emite la factura cuando no quedan pendientes [E-34 · E-36]",
    "En Panamá el pago de contado se confirma en Lark, la bodega prepara con tabletas y finanzas verifica en el banco y factura en una o dos horas [E-57 · E-44]",
    "En Venezuela se despacha con flota propia en Caracas, con courier a los mayoristas del interior o por retiro del cliente [E-34]",
    "En Colombia logística prepara con rótulos y distribución por tienda, y despacha con el transportista que certifica la cadena [E-14]"
   ],
   "variantes": "En Panamá el cliente suele retirar al día siguiente o recibe por mensajero o transporte al interior; en temporada alta la bodega de la ciudad concentra la carga de la web y del mayor. Los pedidos con grabado se solicitan por Lark y su plazo depende de la cantidad.",
   "senal": "La bodega prepara solo pedidos aprobados; en Panamá la factura de contado espera la confirmación del pago en el banco.",
   "frenos": [
    {
     "id": "12e.1",
     "grado": "lento",
     "t": "En Venezuela el faltante detectado en el picking se notifica al gerente de almacén y no al vendedor, que se entera después.",
     "ev": "E-36",
     "antes": null
    },
    {
     "id": "12e.2",
     "grado": "lento",
     "t": "En temporada alta la bodega de la ciudad en Panamá concentra los pedidos de varios canales y llega a saturarse.",
     "ev": "E-57",
     "antes": null
    }
   ],
   "cifras": [
    "Plazo de despacho normal en Venezuela: 48 horas [E-34]",
    "Factura de contado en Panamá: una a dos horas después de confirmado el pago [E-57]"
   ],
   "tripulacion": [
    "Almacén VE · Elvis Badillo",
    "Supervisión de almacén VE · Rogelio Aznárez",
    "Logística y facturación VE · Yoly Pacheco",
    "Logística PA · Fernando Alvarado",
    "Bodega CO · Miguel Grisales"
   ],
   "senalizacion": [
    "App WMS (tablet)",
    "Odoo",
    "Lark",
    "Correo",
    "Banca en línea",
    "MRW / Zoom"
   ],
   "trasp": {
    "ofi": 4,
    "lim": 0,
    "ext": 1,
    "sc": 1,
    "inf": 2,
    "ver": "mix"
   },
   "proc": [
    "7.3",
    "7.4",
    "7.5"
   ],
   "src": "E-14 · E-34 · E-36 · E-39 · E-44 · E-57",
   "confirmar": "Cómo se prepara y se factura el mayor local en Colombia, y en qué orden.",
   "catenaria": null
  },
  {
   "id": "13e",
   "ramal": "mayorlocal",
   "nivel": 2,
   "etapa": "13",
   "t": "Entrega al cliente",
   "tramo": "T15 · Entrega del mayor local",
   "depto": "Bodega del país · Ventas al mayor",
   "jefe": "Coordinación mayor VE · Henry Lucena",
   "ev": "parcial",
   "hoy": "La entrega cierra el pedido del mayor local. En Venezuela se confirma por Lark, con aviso al chofer, a la supervisión de despacho y al vendedor. En Colombia el comercial sigue la salida y la llegada de cada orden de las cadenas. En las cuentas en consignación, la mercancía entregada se repone y se factura según la venta que reporta el cliente, que luego da paso al cobro.",
   "pasos": [
    "En Venezuela la entrega se confirma por Lark, con correo al chofer, a la supervisión de despacho y al vendedor [E-34]",
    "En Panamá el cliente retira en la bodega o recibe por mensajero o por transporte al interior [E-57 · E-39]",
    "En Colombia el comercial da seguimiento a la salida y la llegada de cada orden urgente de una cadena [E-14]",
    "En consignación con cadenas y grandes superficies, el cliente reporta lo vendido y se repone esa cantidad [E-35]",
    "La consignación se documenta con nota de entrega, y la factura sigue a la venta reportada [E-35]"
   ],
   "variantes": "En Venezuela las cadenas y grandes superficies operan en consignación, y en las grandes superficies se monta un espacio propio de la marca dentro de la tienda. En Colombia las cadenas reciben paquetes divididos por tienda, con mueble y promotor, y desde enero se abastecen y facturan localmente.",
   "senal": "",
   "frenos": [
    {
     "id": "13e.1",
     "grado": "lento",
     "t": "Parte de la venta en consignación se registró como venta en firme, lo que obligó a depurar facturas y migrar a nota de entrega.",
     "ev": "E-35",
     "antes": null
    },
    {
     "id": "13e.2",
     "grado": "lento",
     "t": "Los redistribuidores y las franquicias Casio de Venezuela no reportan precios ni ventas, por lo que no se conoce cómo se revende el producto.",
     "ev": "E-35",
     "antes": null
    },
    {
     "id": "13e.3",
     "grado": "lento",
     "t": "En Colombia la confirmación de salida y llegada de las órdenes de las cadenas se sigue por mensajes, sin registro en el sistema.",
     "ev": "E-14",
     "antes": null
    }
   ],
   "cifras": [
    "Colombia: cinco grandes superficies, con 10 a 15 tiendas cada una [E-14]",
    "Venezuela: una cadena abrirá la marca en unas 50 de sus 211 tiendas [E-35]"
   ],
   "tripulacion": [
    "Coordinación mayor VE · Henry Lucena",
    "Mayor VE · Andrés Márquez",
    "Comercial CO · Santiago Ramírez",
    "Mayor PA · Edumar Escalona"
   ],
   "senalizacion": [
    "Lark",
    "Correo",
    "WhatsApp",
    "Excel"
   ],
   "trasp": {
    "ofi": 1,
    "lim": 0,
    "ext": 0,
    "sc": 0,
    "inf": 3,
    "ver": "inf"
   },
   "proc": [
    "7.5",
    "8.7"
   ],
   "src": "E-11 · E-14 · E-34 · E-35 · E-39 · E-57",
   "confirmar": "Cómo se confirma la entrega del mayor local en Panamá y en Colombia.",
   "catenaria": null
  },
  {
   "id": "16",
   "ramal": "troncal",
   "nivel": 0,
   "etapa": "16",
   "t": "Cobro y crédito",
   "tramo": "T16 · Cobro",
   "depto": "Crédito y cobranza",
   "jefe": "Crédito y cobros PA · Noel Correa",
   "ev": "solida",
   "hoy": "Aquí empalman el ramal Mayor y los tres sub-ramales de cada país: las tiendas, tras su cierre de caja, el mayor local y la web. Cada país cobra con reglas propias. Panamá otorga crédito formal con afiliación, plazos e indicador de riesgo, y registra los pagos el mismo día. En Venezuela el vendedor del mayor registra pagos en varias monedas. Colombia vende a crédito y revisa la cartera cada semana.",
   "pasos": [
    "Panamá: el cliente se afilia por Lark y pasa una debida diligencia antes de recibir crédito [E-62]",
    "Los plazos van de 30 a 120 días; los cambios de condición se tramitan por un flujo de Lark [E-62]",
    "Venezuela: el cliente del mayor se da de alta con el RIF y el vendedor registra el pago en la factura de Odoo con una plantilla [E-48]",
    "Cuentas por cobrar valida esos registros contra los cortes bancarios que tesorería publica en Drive [E-48]",
    "Tiendas y web cobran al contado; Cashea abona a medida que cobra las cuotas a sus clientes [E-15 · E-43]",
    "Colombia: el vendedor gestiona el cobro y su comisión se calcula sobre lo recaudado; desde enero se factura y se cobra directamente a las cadenas [E-14 · E-11]",
    "Colombia: contabilidad confirma los pagos de la web y una persona revisa la cartera cada semana [E-02 · E-46]"
   ],
   "variantes": "Es el empalme del dinero: llegan el ramal Mayor y los sub-ramales de tiendas, mayor local y web de cada país. El ramal Países no se cobra en esta estación: la relación de cada país con el hub se salda en el cuadre entre empresas (18).",
   "senal": "",
   "frenos": [
    {
     "id": "16.1",
     "grado": "detiene",
     "t": "El crédito del mayor en Venezuela opera sin una política formal de límites, plazos ni bloqueo por mora.",
     "ev": "E-48",
     "antes": "13.1"
    },
    {
     "id": "16.2",
     "grado": "detiene",
     "t": "El saldo de clientes registrado en el sistema difiere de la deuda real porque hay cobros de meses anteriores pendientes de registrar.",
     "ev": "E-35 · E-48",
     "antes": "13.2"
    },
    {
     "id": "16.3",
     "grado": "lento",
     "t": "El crédito a clientes del exterior se otorga sin contrato marco ni comité de crédito.",
     "ev": "E-62",
     "antes": "13.3"
    },
    {
     "id": "16.4",
     "grado": "lento",
     "t": "La gestión del cobro recae en los propios vendedores, y en Panamá un pago se reporta por tres canales distintos.",
     "ev": "E-39 · E-36",
     "antes": "13.4"
    }
   ],
   "cifras": [
    "Panamá: cartera de 6–7 millones de USD y morosidad de 3,1 % [E-62]",
    "Venezuela: 610 mil USD vencidos, de ellos 113 mil a más de 120 días [E-48]"
   ],
   "tripulacion": [
    "Crédito y cobros PA · Noel Correa",
    "Cobros exterior PA · Víctor Ortega",
    "Tesorería PA · Norman Vanegas",
    "Mayor PA (aprueba crédito) · Edumar Escalona",
    "Gerencia comercial · Andrés Roizental",
    "CxC VE · Yajaira Cortorreal",
    "Tesorería VE (cortes bancarios) · Ali Carmona",
    "Mayor VE · Andrés Márquez"
   ],
   "senalizacion": [
    "Odoo",
    "Lark",
    "Correo",
    "Excel",
    "Drive",
    "Portal SENIAT",
    "Portal de Cashea"
   ],
   "trasp": {
    "ofi": 6,
    "lim": 1,
    "ext": 2,
    "sc": 2,
    "inf": 8,
    "ver": "mix"
   },
   "proc": [
    "13.5",
    "13.6",
    "8.15"
   ],
   "src": "E-02 · E-11 · E-14 · E-15 · E-35 · E-36 · E-39 · E-43 · E-46 · E-48 · E-62",
   "confirmar": "Cómo cobran las tiendas de Colombia, qué plazos de crédito tiene cada cadena y qué comisión descuenta Cashea al liquidar.",
   "catenaria": {
    "tipo": "C·P",
    "t": "Las activaciones con clientes y las promociones posteriores a la venta se liquidan como notas de crédito.",
    "ev": "E-49 · E-62 · E-67"
   }
  },
  {
   "id": "17",
   "ramal": "troncal",
   "nivel": 0,
   "etapa": "17",
   "t": "Conciliación",
   "tramo": "T17 · Conciliación",
   "depto": "Contabilidad",
   "jefe": "Contabilidad VE · Víctor Padovani",
   "ev": "solida",
   "hoy": "Lo cobrado se concilia contra el banco y las plataformas de pago. Panamá concilia a diario en Odoo con cuentas transitorias y revisa las cajas dentro del sistema. Venezuela concilia en Excel en dos etapas: lo vendido contra lo cobrado y lo cobrado contra el banco. Colombia cruza en Excel el reporte de Odoo con el de cada marketplace.",
   "pasos": [
    "Panamá: el extracto bancario se carga a diario en Odoo y las cuentas transitorias se revisan dos veces al mes [E-44]",
    "Venezuela: la caja se cruza con el reporte Z y, luego, lo cobrado con los estados de cuenta [E-38]",
    "Las operaciones de Cashea se cruzan entre el estado de cuenta bancario y el portal de Cashea [E-38]",
    "Colombia: una persona cruza en Excel el reporte de Odoo con el de cada plataforma [E-46]"
   ],
   "variantes": "",
   "senal": "",
   "frenos": [
    {
     "id": "17.1",
     "grado": "detiene",
     "t": "En Venezuela la conciliación ocupa a entre 8 y 10 personas y acumula unos dos meses de rezago.",
     "ev": "E-04 · E-38",
     "antes": "14.1"
    },
    {
     "id": "17.2",
     "grado": "lento",
     "t": "Las operaciones de Cashea se concilian fuera de Odoo, contra el portal de la plataforma.",
     "ev": "E-15 · E-43",
     "antes": "14.2"
    },
    {
     "id": "17.3",
     "grado": "lento",
     "t": "Cerca del 60 % de las ventas en Venezuela genera diferencial cambiario, que se ajusta cuota por cuota.",
     "ev": "E-38",
     "antes": "14.3"
    }
   ],
   "cifras": [
    "Panamá concilia seis empresas y redujo el tiempo de un día a 20 minutos [SC-05]"
   ],
   "tripulacion": [
    "Contabilidad VE · Víctor Padovani",
    "Contabilidad CO · Marcela Ramírez",
    "Contabilidad PA · Ian Chen",
    "Conciliación PA · Ligia Ojeda",
    "Conciliación PA · Yajaira Moreno",
    "Contabilidad PA (transitorias) · Fernando Barría",
    "Contabilidad PA (transitorias) · Yamanis Gálvez",
    "Tesorería VE (Cashea) · Ali Carmona"
   ],
   "senalizacion": [
    "Excel",
    "Odoo",
    "Portal de Cashea",
    "Correo",
    "Papel (conciliación impresa)",
    "Lark (tarjetas)"
   ],
   "trasp": {
    "ofi": 2,
    "lim": 0,
    "ext": 1,
    "sc": 1,
    "inf": 6,
    "ver": "inf"
   },
   "proc": [
    "12.3",
    "12.2",
    "10.8"
   ],
   "src": "E-04 · E-15 · E-38 · E-43 · E-44 · E-46 · SC-05",
   "confirmar": "",
   "catenaria": null
  },
  {
   "id": "18",
   "ramal": "troncal",
   "nivel": 0,
   "etapa": "18",
   "t": "Cuadre entre empresas",
   "tramo": "T17 · Intercompañía",
   "depto": "Contabilidad · Tesorería",
   "jefe": "CxC PA · Noel Correa",
   "ev": "parcial",
   "hoy": "Las empresas del grupo registran entre sí sus operaciones y cuadran los saldos resultantes. Aquí se salda el ramal Países: cada operación propia registra en su Odoo las facturas que recibe del hub. También se registran los gastos que una empresa asume por cuenta de otra y los cargos de tarjetas compartidas, en sistemas contables que no están conectados entre sí.",
   "pasos": [
    "Cada país registra en su propio Odoo las facturas emitidas por el hub [E-65]",
    "Los gastos que una empresa de Panamá asume por cuenta de otra se registran como cuenta por cobrar a esa empresa [E-61]",
    "Desde agosto, los saldos entre las empresas de Panamá se cuadran cada mes [E-61]"
   ],
   "variantes": "El ramal Países se salda en esta estación y no en el cobro: la operación de cada país con el hub queda como saldo entre empresas del grupo.",
   "senal": "",
   "frenos": [
    {
     "id": "18.1",
     "grado": "detiene",
     "t": "Las cuentas por cobrar entre empresas del grupo se registran, pero no se gestionan de forma sistemática, y su cuadre es manual y sin periodicidad fija.",
     "ev": "E-61",
     "antes": "15.1"
    },
    {
     "id": "18.2",
     "grado": "lento",
     "t": "Un cargo con una tarjeta compartida entre empresas puede requerir hasta cuatro asientos contables.",
     "ev": "E-61",
     "antes": "15.2"
    },
    {
     "id": "18.3",
     "grado": "lento",
     "t": "Las instancias de Odoo de cada país no están conectadas, por lo que los estados de cuenta entre empresas se solicitan manualmente.",
     "ev": "E-65",
     "antes": "15.3"
    }
   ],
   "cifras": [],
   "tripulacion": [
    "CxC PA · Noel Correa",
    "Tesorería PA · Felipe Alain",
    "Tesorería PA · Norman Vanegas",
    "CxP VE · Andrés Largo"
   ],
   "senalizacion": [
    "Odoo (tres instancias sin conexión)",
    "Excel",
    "Correo",
    "Claude (conciliación)"
   ],
   "trasp": {
    "ofi": 2,
    "lim": 0,
    "ext": 0,
    "sc": 0,
    "inf": 5,
    "ver": "inf"
   },
   "proc": [
    "13.7",
    "13.2"
   ],
   "src": "E-61 · E-62 · E-65",
   "confirmar": "",
   "catenaria": null
  },
  {
   "id": "19",
   "ramal": "troncal",
   "nivel": 0,
   "etapa": "19",
   "t": "Cierre y reporte",
   "tramo": "T17 · Cierre",
   "depto": "Contabilidad · Finanzas",
   "jefe": "CFO · Jaime González",
   "ev": "solida",
   "hoy": "Cada empresa cierra su contabilidad y presenta resultados a la dirección. Panamá cierra mensualmente y Finanzas presenta las cifras en el comité de finanzas cada quince días. Venezuela presenta el estado de resultados y tiene en proceso el cierre de meses anteriores. El grupo no emite un estado consolidado, y las ventas y el margen del mes se comparten por WhatsApp.",
   "pasos": [
    "Panamá: contabilidad revisa con Finanzas el resultado por tienda y el balance [E-44]",
    "El comité de finanzas sesiona cada quince días, los miércoles, con la Junta [E-44 · E-23]",
    "Venezuela: el reporte a la dirección es un Excel con datos extraídos de Odoo [E-38]",
    "Colombia: el cierre mensual lo firman contabilidad, la revisoría fiscal y la gerencia del país [E-46]"
   ],
   "variantes": "",
   "senal": "",
   "frenos": [
    {
     "id": "19.1",
     "grado": "detiene",
     "t": "El cierre mensual de Venezuela acumula rezago: a finales de agosto se revisaba el mes de abril.",
     "ev": "E-15 · E-38 · E-65",
     "antes": "16.1"
    },
    {
     "id": "19.2",
     "grado": "lento",
     "t": "No se calcula de forma sistemática el costo real ni el margen por producto.",
     "ev": "SC-13",
     "antes": "16.2"
    },
    {
     "id": "19.3",
     "grado": "lento",
     "t": "El grupo no emite un estado financiero consolidado.",
     "ev": "E-01 · E-44",
     "antes": "16.3"
    }
   ],
   "cifras": [
    "La empresa del hub cierra en 7–10 días; las tiendas de Panamá, en unas 3 semanas [E-15]"
   ],
   "tripulacion": [
    "CFO · Jaime González",
    "Contabilidad PA · Ian Chen",
    "Contabilidad VE · Víctor Padovani",
    "Contabilidad CO · Marcela Ramírez",
    "Country manager CO (firma el cierre) · Joel Cohen"
   ],
   "senalizacion": [
    "Odoo",
    "Excel",
    "WhatsApp",
    "Lark (flujo de caja; tablero PMO)",
    "Reunión (comité)"
   ],
   "trasp": {
    "ofi": 3,
    "lim": 0,
    "ext": 0,
    "sc": 0,
    "inf": 7,
    "ver": "inf"
   },
   "proc": [
    "12.8",
    "12.9",
    "13.8"
   ],
   "src": "E-01 · E-08 · E-15 · E-23 · E-38 · E-44 · E-46 · E-65 · SC-13",
   "confirmar": "",
   "catenaria": null
  },
  {
   "id": "20",
   "ramal": "troncal",
   "nivel": 0,
   "etapa": "20",
   "t": "Sell-out y vuelta al plan",
   "tramo": "T19 · Sell-out",
   "depto": "BI · Planificación",
   "jefe": "BI (externo) · Alexis Mujica",
   "ev": "solida",
   "hoy": "La venta de los clientes regresa como insumo para planificar la siguiente compra. Los 41 clientes del mayor envían su sell-out por correo, cada uno en su formato; BI lo normaliza en Microsoft Fabric y lo publica en Power BI. Las tiendas propias se integran por la API de Odoo y el cuadro de retail. El dato vuelve a compras, planificación y dirección, y cierra el circuito en el plan de demanda (1).",
   "pasos": [
    "El cliente exporta la venta de su ERP y la envía a su vendedor, que la reenvía a BI [E-18]",
    "Fabric lleva los 41 formatos a una tabla normalizada [E-18]",
    "Colombia presenta su consolidado de ventas a la Junta cada martes [E-11 · E-14]",
    "Costa Rica envía reportes diarios desde su ERP; Kenex USA reporta sus cifras directamente a la dirección [E-19 · E-30]"
   ],
   "variantes": "",
   "senal": "",
   "frenos": [
    {
     "id": "20.1",
     "grado": "detiene",
     "t": "El sell-out llega con retraso, incompleto o con códigos propios del cliente, y esos productos quedan fuera del análisis.",
     "ev": "E-18",
     "antes": "17.1"
    },
    {
     "id": "20.2",
     "grado": "lento",
     "t": "Cada país reporta en un formato distinto y los reportes se rehacen para cada área.",
     "ev": "E-55 · E-47",
     "antes": "17.2"
    },
    {
     "id": "20.3",
     "grado": "lento",
     "t": "El dato de sell-out no llega a los vendedores ni a la planificación de compras de Cubitt.",
     "ev": "E-18",
     "antes": "17.3"
    }
   ],
   "cifras": [
    "41 clientes y más de 1.000 tiendas [E-18]",
    "Presencia comercial en 14 países [E-18]"
   ],
   "tripulacion": [
    "BI (externo) · Alexis Mujica",
    "BI (externo) · Kenzie Pérez",
    "Retail regional · Handani Mora",
    "Reportería de compras · Vera Gavizon",
    "Planificación VE · Jimena Sánchez",
    "KAM Centroamérica · Jorge Ábrego",
    "Comercial CO · Santiago Ramírez"
   ],
   "senalizacion": [
    "Correo",
    "Excel",
    "WhatsApp",
    "API de Odoo",
    "Microsoft Fabric",
    "Power BI",
    "Lark (Colombia)",
    "Claude en Excel (Colombia)"
   ],
   "trasp": {
    "ofi": 1,
    "lim": 0,
    "ext": 2,
    "sc": 0,
    "inf": 9,
    "ver": "inf"
   },
   "proc": [
    "8.17",
    "9.2",
    "10.16",
    "2.7"
   ],
   "src": "E-10 · E-11 · E-14 · E-18 · E-19 · E-30 · E-47 · E-55",
   "confirmar": "Cómo se incorpora el dato de sell-out a la cantidad de la orden de compra.",
   "catenaria": {
    "tipo": "P",
    "t": "Mercadeo recibe lo vendido y lo que no rota, y con ello define la grilla y las promociones del mes.",
    "ev": "E-42 · E-49 · E-40 · E-18"
   }
  },
  {
   "id": "PCI",
   "ramal": "retorno",
   "nivel": 0,
   "etapa": "",
   "t": "Reporte PCI a Casio",
   "tramo": "T19 · Reporte a Casio",
   "depto": "Compras Casio",
   "jefe": "Reportería de compras · Vera Gavizon",
   "ev": "solida",
   "hoy": "Es la vía de retorno que lleva el sell-out a la compra de Casio. Cada mes, compras arma para Casio el reporte de lo vendido en la zona. El reporte se extrae de Odoo y se ajusta manualmente para que compras y ventas cuadren. Dos veces al año las cifras se presentan en la convención con Casio.",
   "pasos": [
    "El reporte se extrae de Odoo y se ajusta manualmente para cuadrar compras y ventas [E-10]",
    "Cubre relojes, calculadoras y teclados en unos ocho países de la zona [E-10]",
    "Casio revisa el cumplimiento del forecast por país [E-10]"
   ],
   "variantes": "",
   "senal": "",
   "frenos": [
    {
     "id": "PCI.1",
     "grado": "detiene",
     "t": "La elaboración del reporte ocupa los primeros diez días del mes y depende de una sola persona.",
     "ev": "E-10",
     "antes": "PCI.1"
    },
    {
     "id": "PCI.2",
     "grado": "lento",
     "t": "El control de seriales de la línea exclusiva no está actualizado.",
     "ev": "E-10",
     "antes": "PCI.2"
    }
   ],
   "cifras": [
    "Reporte mensual y convención con Casio dos veces al año [E-10]"
   ],
   "tripulacion": [
    "Reportería de compras · Vera Gavizon",
    "Dir. compras · Roberto Roizental"
   ],
   "senalizacion": [
    "Excel (desde Odoo)",
    "Correo (inferencia)"
   ],
   "trasp": {
    "ofi": 0,
    "lim": 0,
    "ext": 0,
    "sc": 0,
    "inf": 3,
    "ver": "inf"
   },
   "proc": [
    "6.3"
   ],
   "src": "E-10",
   "confirmar": "",
   "catenaria": null
  },
  {
   "id": "PV",
   "ramal": "retorno",
   "nivel": 0,
   "etapa": "",
   "t": "Postventa",
   "tramo": "T18 · Postventa",
   "depto": "Servicio al cliente",
   "jefe": "Atención al cliente regional · Patrick Corujo",
   "ev": "solida",
   "hoy": "Los productos con falla regresan por esta vía de retorno. Cubitt no se repara: dentro del año de garantía se reemplaza, de inmediato si la falla es de hardware o en hasta siete días si la fábrica corrige el software. Casio se repara, con repuestos que se solicitan a Japón. Cada mes se concilia el producto dañado y se da de baja con un reciclador certificado.",
   "pasos": [
    "El caso entra por la tienda, el chat, el correo o el Cubi Café [E-64 · E-58]",
    "Se diagnostica y se resuelve con un reemplazo, o se abre un caso en una tabla de Lark a la que accede la fábrica [E-64]",
    "El producto dañado se traslada en Odoo a la bodega de garantías y el reemplazo se entrega al recibir el dañado [E-58]",
    "La fábrica recibe el caso por un formulario de Lark y se lleva un tablero de garantías [E-58]",
    "Venezuela: la orden se registra en Syscore y luego en NAF, Lark y Odoo; el almacén despacha los reemplazos dos veces al día [E-51]"
   ],
   "variantes": "Por marca: Cubitt se reemplaza y Casio se repara. Por país: en Panamá, Colombia y Guatemala la tienda hace el primer filtro; en Venezuela los casos se concentran en el taller central de Caracas. Las devoluciones y los reembolsos que no son garantía siguen la vía de retorno RT.",
   "senal": "La presidencia aprueba la compra de repuestos de Casio.",
   "frenos": [
    {
     "id": "PV.1",
     "grado": "detiene",
     "t": "En Venezuela un mismo caso se registra en cuatro sistemas: Syscore, NAF, Lark y Odoo.",
     "ev": "E-51",
     "antes": "PV.1"
    },
    {
     "id": "PV.2",
     "grado": "detiene",
     "t": "La gestión de repuestos de Casio para toda la región depende de una sola persona.",
     "ev": "E-51 · E-02",
     "antes": "PV.2"
    },
    {
     "id": "PV.3",
     "grado": "lento",
     "t": "En Venezuela el stock destinado a cambios es insuficiente y se cubre con préstamos del almacén web.",
     "ev": "E-51",
     "antes": "PV.3"
    },
    {
     "id": "PV.4",
     "grado": "lento",
     "t": "La disposición final del producto dañado se formalizó recientemente; hasta entonces la mercancía dañada se acumulaba en bodega.",
     "ev": "E-04",
     "antes": "PV.4"
    }
   ],
   "cifras": [
    "Venezuela: unas 700 órdenes de servicio al mes [E-51]",
    "Garantías de Cubitt: históricamente menos de 1,5 %; hoy 3,5 % en algunos productos [E-58]"
   ],
   "tripulacion": [
    "Atención al cliente regional · Patrick Corujo",
    "Soporte técnico PA · Jesús Arratia",
    "Soporte técnico PA · Eloy Morcillo",
    "Especialista de producto · Rogmarc González",
    "Servicio técnico VE · Juseth González",
    "Soporte web VE · Johan Lucena",
    "Soporte web VE · Gustavo Hernández",
    "Almacén VE (garantías) · Elvis Badillo"
   ],
   "senalizacion": [
    "Lark",
    "Odoo",
    "Mercately",
    "Syscore",
    "NAF",
    "WeChat",
    "WhatsApp",
    "Correo",
    "Excel (repuestos Casio)"
   ],
   "trasp": {
    "ofi": 7,
    "lim": 0,
    "ext": 3,
    "sc": 3,
    "inf": 8,
    "ver": "mix"
   },
   "proc": [
    "11.1",
    "11.2",
    "11.3",
    "11.4",
    "11.5",
    "11.9",
    "7.7"
   ],
   "src": "E-02 · E-04 · E-51 · E-58 · E-64 · SC-03",
   "confirmar": "",
   "catenaria": null
  },
  {
   "id": "RT",
   "ramal": "retorno",
   "nivel": 0,
   "etapa": "",
   "t": "Devoluciones y notas de crédito",
   "tramo": "T16–T18 · Retornos de mercancía",
   "depto": "Ventas · Bodega · Contabilidad",
   "jefe": "Mayor PA (autoriza devoluciones) · Edumar Escalona",
   "ev": "parcial",
   "hoy": "La mercancía que el cliente devuelve sin que sea una garantía regresa por esta vía. En Panamá, el vendedor solicita la devolución por Lark, la gerencia de ventas al mayor la autoriza, la bodega recibe y verifica el producto, y contabilidad emite la nota de crédito o reintegra el dinero. En la web, el reembolso sigue un flujo de aprobación en Lark. Los faltantes de recepción en el hub se reclaman a la fábrica.",
   "pasos": [
    "El vendedor solicita la devolución en un formulario de Lark, con la factura de Odoo y una etiqueta en el producto [E-57]",
    "La gerencia de ventas al mayor autoriza; la bodega recibe la mercancía y aprueba su ingreso [E-39 · E-57]",
    "Contabilidad emite la nota de crédito o reintegra el dinero al cliente [E-39]",
    "Las notas de crédito, notas de débito y ajustes posteriores a la venta solo se registran con una solicitud aprobada en Lark [E-62]",
    "Web en Panamá y Colombia: el reembolso se solicita por un flujo de Lark y contabilidad lo aprueba y lo paga [E-02 · E-58]",
    "Venezuela: el transporte propio de lunes, miércoles y viernes recoge las devoluciones de las tiendas de Caracas y las lleva a la oficina [E-47]",
    "Los faltantes de recepción en el hub pasan a una bodega virtual y se reclaman a la fábrica hasta recibir la nota de crédito o el producto [SC-01]",
    "Los defectos de Casio detectados al recibir en tienda se reportan por número de serie a compras, que gestiona la nota de crédito con la fábrica [E-53]"
   ],
   "variantes": "Por origen: devoluciones de clientes del mayor y del mayor local, reembolsos de la web y reclamos a fábrica por faltantes o defectos de recepción. Las garantías siguen la vía de postventa (PV). Kenex USA devuelve a Panamá el producto que no puede revender, que se comercializa como usado.",
   "senal": "La gerencia de ventas al mayor autoriza cada devolución y contabilidad aprueba en Lark cada nota de crédito o reembolso.",
   "frenos": [
    {
     "id": "RT.1",
     "grado": "lento",
     "t": "Una devolución por cambio de producto recorre ventas, bodega y contabilidad en hasta cuatro días y retiene la siguiente facturación al cliente.",
     "ev": "E-57",
     "antes": null
    },
    {
     "id": "RT.2",
     "grado": "lento",
     "t": "El plazo del reembolso web varía por país, de unas 24 horas en Panamá a unos cinco días en Colombia, sin un estándar común del grupo.",
     "ev": "E-58 · E-02",
     "antes": null
    }
   ],
   "cifras": [
    "Devolución por cambio de producto en el mayor: hasta 4 días [E-57]",
    "Reembolso web: unas 24 horas en Panamá; en Colombia pasó de 30 a 5 días [E-58]"
   ],
   "tripulacion": [
    "Mayor PA (autoriza devoluciones) · Edumar Escalona",
    "Crédito y cobros PA (nota de crédito) · Noel Correa",
    "Inventarios y precios PA (reclamo a fábrica) · María Alejandra Mejías",
    "Atención al cliente regional (reembolsos web) · Patrick Corujo"
   ],
   "senalizacion": [
    "Lark",
    "Odoo",
    "Papel (etiqueta en el producto)",
    "Correo"
   ],
   "trasp": {
    "ofi": 5,
    "lim": 0,
    "ext": 0,
    "sc": 0,
    "inf": 4,
    "ver": "mix"
   },
   "proc": [
    "8.16",
    "10.14",
    "11.8",
    "6.9",
    "7.7"
   ],
   "src": "E-02 · E-06 · E-39 · E-47 · E-53 · E-57 · E-58 · E-62 · SC-01",
   "confirmar": "Cómo se aprueban y registran en Venezuela y Colombia las devoluciones de mercancía y los reembolsos, con qué plazo y quién los autoriza.",
   "catenaria": null
  },
  {
   "id": "MK",
   "ramal": "catenaria",
   "nivel": 0,
   "etapa": "",
   "t": "Mercadeo",
   "tramo": "TX · Mercadeo",
   "depto": "Mercadeo · Visual",
   "jefe": "Marketing regional · Natasha Betancourt",
   "ev": "solida",
   "hoy": "Mercadeo no compra ni vende, pero alimenta toda la línea con la demanda que genera. Interviene en tres momentos: el lanzamiento, cuando el producto ya está en fabricación; las promociones mensuales para rotar inventario; y el co-marketing con los clientes del mayor. Las campañas de Casio se aprueban en Casio Brasil y las de Cubitt pasan por la Junta.",
   "pasos": [
    "El key visual regional se produce en Panamá y cada país lo adapta [E-42 · E-31]",
    "Visual merchandising lo implementa en las tiendas y la web activa las promociones [E-31 · E-16]",
    "En Venezuela cada promoción requiere el permiso de la SUNDDE, que tarda 15 días hábiles [E-31]",
    "Las activaciones con clientes del mayor se liquidan como notas de crédito [E-49 · E-62]"
   ],
   "variantes": "Toques sobre la línea: lanzamiento (L) en la compra, la liberación y la asignación del hub; promoción (P) en las tiendas, la web y el sell-out; co-marketing (C) con los clientes del mayor y en el cobro, donde las activaciones se liquidan como notas de crédito.",
   "senal": "La Junta aprueba las artes de Cubitt y la dirección comercial aprueba cada promoción.",
   "frenos": [
    {
     "id": "MK.1",
     "grado": "detiene",
     "t": "Las piezas de Cubitt pasan por varias instancias de aprobación con criterios distintos, lo que suma unas cuatro semanas y compromete el plazo del permiso de promoción.",
     "ev": "E-42 · E-31",
     "antes": "MK.1"
    },
    {
     "id": "MK.2",
     "grado": "lento",
     "t": "Hay lanzamientos sin unidades reservadas para comunicar: en Colombia las primeras piezas se asignaron a la venta comercial.",
     "ev": "E-56",
     "antes": "MK.2"
    },
    {
     "id": "MK.3",
     "grado": "lento",
     "t": "Mercadeo no accede de forma sistemática al inventario ni al dato de venta para planificar sus acciones.",
     "ev": "E-42 · E-22",
     "antes": "MK.3"
    }
   ],
   "cifras": [
    "Unas 5 promociones por país al mes [E-22]"
   ],
   "tripulacion": [
    "Marketing regional · Natasha Betancourt",
    "Marketing VE · Valentina Abreu",
    "Marketing Cubitt PA · Sofiana Tovar",
    "Marketing Casio regional · Kelly Marimón",
    "Brand manager Casio · Félix Almendral",
    "Marketing CO · Lesly Laverde",
    "Visual regional · Reyna Barraza"
   ],
   "senalizacion": [
    "Lark",
    "WhatsApp",
    "Drive",
    "Dropbox",
    "Correo",
    "Papel"
   ],
   "trasp": {
    "ofi": 3,
    "lim": 2,
    "ext": 1,
    "sc": 1,
    "inf": 8,
    "ver": "inf"
   },
   "proc": [
    "16.1",
    "16.2",
    "16.7",
    "2.5"
   ],
   "src": "E-16 · E-22 · E-31 · E-40 · E-42 · E-49 · E-50 · E-56 · E-60 · E-62 · E-63",
   "confirmar": "Quién aprueba cada promoción: la gerencia de retail regional, en lo que toca a la pieza, o la dirección comercial, en lo que toca al descuento.",
   "catenaria": null
  }
 ],
 "cobertura": [
  [
   "T01",
   "Plan de demanda",
   "1",
   "solida",
   "Cubitt cuenta con un forecast comercial por mercado en Excel; falta precisar cómo se traduce en la orden de compra."
  ],
  [
   "T02",
   "Producto Cubitt",
   "2a",
   "solida",
   ""
  ],
  [
   "T03",
   "Compra Casio",
   "2b · 3b",
   "solida",
   "El criterio con que Casio asigna el cupo."
  ],
  [
   "T04",
   "Decisión y orden de compra",
   "3a · 2b",
   "solida",
   "La composición estable del comité de compra."
  ],
  [
   "T05",
   "Pago a proveedores",
   "4a · 3b",
   "parcial",
   "Carta de crédito y plazos contractuales con Casio; lead time de producción de Cubitt."
  ],
  [
   "T06",
   "Producción y embarque",
   "4a · 4b",
   "parcial",
   "Puerto, naviera y contenedores por marca."
  ],
  [
   "T07",
   "Llegada a Zona Libre",
   "5",
   "solida",
   ""
  ],
  [
   "T08",
   "Bodega",
   "6 · 10b · SW",
   "solida",
   "Indicadores medidos de exactitud y tiempos; hoy se cuenta con metas."
  ],
  [
   "T09",
   "Asignación",
   "7 · 10b",
   "parcial",
   "Regla escrita de reparto y prioridad entre países (7) y entre canales de cada país (10b) cuando la disponibilidad no alcanza."
  ],
  [
   "T10",
   "Venta al mayor",
   "8a · 9a · 11e · 12e · 13e",
   "solida",
   "El ramal Mayor (8a–9a) atiende a clientes terceros desde Zona Libre; el mayor local de cada país va en su sub-ramal (11e–13e)."
  ],
  [
   "T11",
   "Países propios",
   "8b · 9b · 10b · US",
   "solida",
   "Operación de Kenex USA y de Guatemala de punta a punta."
  ],
  [
   "T12",
   "Tiendas",
   "11c · 12c · 13c · 14c · 15c",
   "solida",
   "Operación de las tiendas de Colombia y de las franquicias."
  ],
  [
   "T13",
   "Web",
   "SW · 11d · 12d · 13d",
   "solida",
   "Volúmenes de Panamá y Colombia."
  ],
  [
   "T14",
   "Socios y franquicias",
   "8a · 8b · 9b · 10b",
   "parcial",
   "Operación interna de Costa Rica y de Guatemala; aduana de Kenex USA."
  ],
  [
   "T15",
   "Despacho y entrega",
   "9a · 9b · 12c · 12d · 13d · 12e · 13e",
   "solida",
   "Promesa de entrega al cliente final."
  ],
  [
   "T16",
   "Cobro y crédito",
   "16 · 11d",
   "solida",
   "Plazos de crédito y medios de pago en Colombia; comisión de Cashea."
  ],
  [
   "T17",
   "Conciliación y cierre",
   "17 · 18 · 19",
   "solida",
   "Estado consolidado del grupo."
  ],
  [
   "T18",
   "Postventa",
   "PV",
   "solida",
   ""
  ],
  [
   "TR",
   "Retornos de mercancía",
   "RT",
   "parcial",
   "Flujo de devoluciones de mercancía y reembolsos en Venezuela y Colombia."
  ],
  [
   "T19",
   "Sell-out",
   "20 · PCI",
   "solida",
   "Cómo se incorpora el dato de sell-out a la cantidad de la orden de compra."
  ],
  [
   "TX",
   "Mercadeo",
   "MK",
   "solida",
   ""
  ]
 ],
 "preguntas": [
  "¿Existe carta de crédito con Casio, cuáles son los plazos contractuales y cuál es el lead time de producción de las fábricas de Cubitt?",
  "¿Existe una prioridad entre países cuando la disponibilidad del hub no alcanza, y quién la fija en cada marca?",
  "¿Cómo se decide dentro de cada país el reparto entre tiendas, mayor local y web cuando llega la mercancía, y quién lo aprueba?",
  "¿Cómo opera Guatemala de punta a punta: quién hace el pedido al hub, cómo recibe y reparte el operador, y cómo factura y cobra?",
  "Cuando el equipo de ventas internacional atiende cadenas en países con operación propia, como Panamá o Colombia, ¿esas ventas se facturan desde Zona Libre o desde la empresa del país, y en qué ramal se registran?",
  "¿Cómo pasa su aduana Kenex USA?",
  "¿Cómo cobran y cierran caja las tiendas de Colombia, y qué plazos de crédito se otorgan a las cadenas?",
  "¿Qué comisión descuenta Cashea al liquidar?",
  "¿Cómo se recibe en la bodega de la ciudad la mercancía que llega de la Zona Libre?",
  "¿Cómo se aprueban y registran en Venezuela y Colombia las devoluciones de mercancía y los reembolsos, y con qué plazo?"
 ],
 "cifrasConfirmar": [
  "Quién aprueba en última instancia la compra de Cubitt; hoy no existe un aprobador único formal.",
  "Referencias activas: unos 4.800 SKU operativos sobre unos 7.000 códigos, por contar en EBS y Odoo.",
  "Puntos de venta: Panamá, unos 10 (11 con el punto de la Zona Libre); Venezuela, 21 a agosto, con aperturas en curso."
 ]
};
