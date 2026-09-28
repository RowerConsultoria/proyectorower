// Fuente única del módulo «Circuito del negocio» del manual de Fase 2 (#/circuito).
// El flujo de cómo opera Kenex HOY (As-Is), de la idea de producto al cobro,
// dibujado como un circuito con carriles que se abren y se vuelven a unir.
//
// Origen: lectura completa de las 87 entrevistas de la tabla `entrevistas` de
// Supabase (27-sep-2026), en 12 lotes con un esquema común de 19 tramos. Los
// extractos por lote, con cada afirmación citada, viven FUERA del repo en
// `Rower/analisis-circuito-27sep/extractos/` (material interno del equipo).
//
// ⚠️ Esto es cliente-facing (lo lee el rol Junta). Reglas del proyecto:
// hallazgos despersonalizados (el trombo nombra el rol, nunca a la persona),
// nada de pagos entre países ni sensibilidades fiscales, citas ≤15 palabras,
// la formalización como habilitación. Los nombres solo aparecen como dato
// descriptivo en `personas` (quién opera la estación).
//
// Editar el circuito = editar solo este archivo. `circuito-render.js` lo pinta.
window.CIRCUITO = {
  meta: { corte: "27-sep-2026", entrevistas: 87 },

  carriles: {
    main: "Vía principal", cub: "Carril Cubitt", cas: "Carril Casio",
    may: "Carril Mayor", pai: "Carril Países y socios", tie: "Carril Tiendas", web: "Carril Web",
    loop: "Bucle de retorno", acc: "Vía de acceso", exit: "Salida de la vía"
  },
  grupos: ["Compra", "Hub Panamá", "Venta por canal", "Dinero", "Bucles y accesos"],

  // Geometría del dibujo (viewBox 86 10 1250 830).
  via: {
    roads: [
      "M120,610 L120,200 Q120,150 170,150 L300,150",
      "M300,150 C340,150 340,90 380,90 L880,90 C920,90 920,150 960,150",
      "M300,150 C340,150 340,210 380,210 L880,210 C920,210 920,150 960,150",
      "M960,150 L1250,150 Q1300,150 1300,200 L1300,470",
      "M1300,470 C1300,540 1270,560 1200,560 L600,560 C530,560 520,690 440,690",
      "M1300,470 C1300,610 1270,640 1200,640 L600,640 C540,640 520,690 440,690",
      "M1300,470 C1300,690 1270,720 1200,720 L600,720 C540,720 520,690 440,690",
      "M1300,470 C1300,770 1270,800 1200,800 L600,800 C530,800 520,690 440,690",
      "M440,690 L200,690 Q120,690 120,610"
    ],
    pits: [
      "M680,548 C680,470 690,410 740,410 L1100,410 C1190,410 1250,425 1292,440",
      "M870,90 C900,90 905,36 945,36 L990,36"
    ],
    info: [
      { d: "M131,268 C160,300 240,308 286,306" },
      { d: "M314,300 C344,292 354,248 358,224", arrow: true },
      { d: "M716,396 C710,340 700,300 700,250 L700,106", arrow: true },
      { d: "M960,496 L960,544", arrow: true }
    ],
    pintado: [["CUBITT",525,90],["CASIO",525,210],["MAYOR",1150,560],["PAÍSES",1150,640],["TIENDAS",1150,720],["WEB",1150,800]],
    notas: [
      ["se abre por marca",286,184,"end"], ["se unen al llegar a Colón",972,190,"start"],
      ["se abre por canal",1282,500,"end"], ["se unen en el cobro",430,664,"end"],
      ["retorno de garantías y devoluciones",1000,398,"middle"], ["fallas a fábrica",690,300,"end"],
      ["campañas y promociones",982,478,"start"]
    ],
    flechas: ["256,144 264,150 256,156", "1294,228 1300,236 1306,228", "286,684 278,690 286,696", "114,426 120,418 126,426"]
  },

  estaciones: [
{id:"1",lane:"main",x:220,y:150,dir:"r",lab:"above",grp:"Compra",tramo:"T01 · Plan de demanda",t:"Plan de demanda",depto:"Comercial · Planificación",sis:"Excel · Odoo · Power BI",gente:"Roberto · Andrés · Jimena",ev:"solida",
 hoy:"Cada diciembre la dirección comercial arma el forecast del año con cada vendedor, cliente por cliente, y lo pasa a Finanzas como un monto de compra mensual. Durante el año, tres fuentes sugieren cantidades por separado: compras y reportería para Casio, planificación para Venezuela y las tiendas, y el equipo de BI. La dirección decide con su criterio.",
 pasos:["Forecast anual por marca, vendedor y cliente, repartido en meses con pesos estacionales [E-08]","El monto mensual pasa a Finanzas para el flujo de caja [E-08]","Planificación calcula la reposición de Venezuela (3–4 meses) y de tiendas (3–4 semanas, Pareto A/B/C) en Excel [E-40]","BI sugiere compra, salud de inventario y rebalanceo desde Fabric y Power BI [E-18]","Cubitt no tiene calendario: se compra cuando «estamos bajos» o cuando se logra reunir al comité [E-06]"],
 trombos:[{s:"alta",t:"Cuando falta producto, la línea se borra en Odoo y la demanda no atendida no queda registrada.",ev:"E-05 · E-08 · E-26"},{s:"media",t:"Tres fuentes de sugerido que se pisan, sin un responsable del proceso.",ev:"E-08"},{s:"media",t:"El modelo de BI no conoce el pedido mínimo ni el lead time de Cubitt y no llega a los vendedores.",ev:"E-10 · E-18"},{s:"media",t:"No hay un rol de planificación de demanda; en Venezuela el histórico está afectado por los quiebres.",ev:"E-40 · E-05"}],
 cifras:["USD 1 M de mercancía estacionada, detectada por BI [E-01]","Más de 6 meses de inventario sin analizar qué rematar [E-08]","Con el modelo de inventario, el análisis de compra pasó de 8 días a minutos [E-18]"],
 personas:["Roberto","Andrés","Jimena","Vera","Alexis (BI)"],sistemas:["Excel","Odoo","Power BI","Microsoft Fabric","Claude en Excel"],proc:["6.1","2.2","9.1"],src:"E-01 · E-05 · E-08 · E-10 · E-18 · E-26 · E-40",aprob:"La dirección comercial aprueba el forecast y decide la compra."},

{id:"2a",lane:"cub",x:440,y:90,dir:"r",lab:"above",grp:"Compra",tramo:"T02 · Producto Cubitt",t:"Idea y muestras",depto:"I+D Cubitt",sis:"Lark · WeChat · WhatsApp",gente:"Alejandro · Estefanía",ev:"solida",
 hoy:"El producto Cubitt nace de ideas informales: lo que piden los vendedores, lo que ofrecen las fábricas o lo que hace la competencia. Las muestras llegan a Panamá, donde opinan unas diez personas, y el director de I+D da el aprobado final.",
 pasos:["La idea sale de la intuición del equipo, de los vendedores, de la oferta de las fábricas o de la competencia [E-60]","Desde junio una diseñadora industrial sigue las tendencias de color en WGSN y diseña accesorios [E-60 · E-22]","Las muestras van a Panamá y el especialista de producto prueba la electrónica, el firmware y la app [E-60]","La fábrica rehace la muestra hasta que se aprueba [E-60]","Producto y lanzamientos crea el SKU y el UPC y lleva las licencias, como Disney [E-06 · E-60]","Desde el 20-ago-2026 una base en Lark registra cada muestra [E-60]"],
 variantes:"Dos carriles internos: electrónica, con más de 10 proveedores por categoría, y accesorios, moda y licencias. La recompra de un producto recurrente se salta esta estación.",
 trombos:[{s:"alta",t:"La app y el firmware del reloj son de la fábrica china; Kenex solo ve una vista genérica de sus usuarios.",ev:"E-05 · E-20"},{s:"media",t:"Las muestras se pierden durante meses y no hubo registro hasta agosto; tampoco hay política para desecharlas.",ev:"E-60"},{s:"media",t:"La decisión de producto no deja acta, y no hay KPI ni presupuesto de I+D.",ev:"E-60"},{s:"media",t:"Muchas voces en la aprobación visual, sin un criterio único.",ev:"E-22"}],
 cifras:["Más de 10 proveedores en China [E-06]","Umbral de garantías aceptado en relojería: menos de 1 % [E-60]"],
 personas:["Alejandro","Estefanía","Camila","Rockmar","Marina (China)"],sistemas:["Lark","WeChat","WhatsApp","Correo"],proc:["3.1","3.3","3.4","3.6"],src:"E-06 · E-20 · E-22 · E-60 · SC-10",aprob:"El director de I+D da el aprobado final de cada producto."},

{id:"3a",lane:"cub",x:610,y:90,dir:"r",lab:"above",grp:"Compra",tramo:"T04 · Decisión y orden",t:"Comité y orden",depto:"Comité de compras",sis:"WhatsApp · correo",gente:"Comité · Roberto",ev:"solida",
 hoy:"Un comité sin calendario decide qué y cuánto comprar: I+D, la gerencia comercial, planificación comercial y ventas internacionales, con planificación de Venezuela. La dirección de compras valida en un grupo aparte. I+D emite la orden al proveedor, a veces por WhatsApp.",
 pasos:["Planificación comercial calcula con Excel o Power BI la venta reciente y propone cantidades [E-60 · E-06]","El comité decide y la dirección de compras confirma antes de proceder [E-06 · E-08]","I+D manda la orden por WhatsApp o correo, por ejemplo «necesito 5.000 piezas de esta» [E-60]","El proveedor responde con la factura, que dispara el pago [E-06]"],
 trombos:[{s:"alta",t:"El comité no logra reunirse: más de una semana con el proceso parado y un quiebre de stock de un mes.",ev:"E-06"},{s:"alta",t:"La orden de compra no existe como documento de sistema: WhatsApp o correo, sin plantilla.",ev:"E-60"},{s:"media",t:"La emisión de órdenes depende de una sola persona.",ev:"E-06"},{s:"media",t:"No existe un área de compras formal.",ev:"E-26 · E-08"}],
 cifras:["Órdenes típicas de 5.000, 10.000 o 20.000 piezas [E-60 · E-06]","Pedido mínimo por fábrica, por ejemplo 5.000 relojes [E-10]"],
 personas:["Alejandro","Andrés","Ricardo Baltodano","Johnny","Jimena","Roberto"],sistemas:["WhatsApp","Correo","Excel","Lark"],proc:["6.4","6.2"],src:"E-06 · E-08 · E-10 · E-26 · E-60 · SC-10",aprob:"La dirección de compras valida la compra de Cubitt como segunda instancia."},

{id:"4a",lane:"cub",x:780,y:90,dir:"r",lab:"above",grp:"Compra",tramo:"T05–T06 · Pago y embarque",t:"Pago 30/70 y producción",depto:"I+D · Sourcing China",sis:"Lark · correo",gente:"Marina · Alejandro",ev:"parcial",
 hoy:"Kenex paga 30 % al hacer el pedido y 70 % cuando la fábrica avisa que está listo, un aviso que llega solo a I+D. Sourcing coordina desde China la consolidación y el envío. Se decide entre avión, para relojes y urgencias, y barco, que tarda de 60 a 90 días.",
 pasos:["I+D manda por correo a Finanzas la instrucción de pago [E-06]","Sourcing lleva por proveedor en Lark lo que está en producción y en camino [E-06 · E-60]","Se consulta el inventario de Venezuela para decidir entre avión y barco [E-60 · E-08]","Una orden de 10.000 puede salir en tres despachos de 3.000 [E-60]","Kenex USA recibe directo de China, sin pasar por Panamá [E-01 · E-30]"],
 trombos:[{s:"alta",t:"Tránsito invisible: Logística a veces se entera dos días antes de un contenedor que tardó 60 a 90 días.",ev:"E-03 · E-60"},{s:"media",t:"Los archivos de seguimiento en Lark están «actualizados a medias» y no se usan como fuente confiable.",ev:"E-08 · E-40 · E-10"},{s:"media",t:"Cuando un lanzamiento se atrasa se paga flete aéreo, y ese costo no se registra.",ev:"SC-08"},{s:"media",t:"La calidad se controla solo contra la muestra; los defectos aparecen después, en las garantías.",ev:"E-60"}],
 cifras:["China a Colón: 60–90 días en barco [E-03]","El aéreo ahorra cerca de un mes [E-60]"],
 personas:["Alejandro","Marina","Finanzas"],sistemas:["Lark","Correo","WeChat"],proc:["6.4","13.1","13.2","7.6"],src:"E-03 · E-06 · E-08 · E-10 · E-40 · E-60 · SC-08",
 confirmar:"Bancos, instrumento de pago y lead time de producción por categoría."},

{id:"2b",lane:"cas",x:440,y:210,dir:"r",lab:"below",grp:"Compra",tramo:"T03 · Compra Casio",t:"Order sheet y sábana",depto:"Compras Casio",sis:"Excel · Odoo · Power BI",gente:"Vera · Roberto",ev:"solida",
 hoy:"Casio Latinoamérica manda cada mes el order sheet con lo que se puede pedir. Compras y reportería arma la «sábana», un Excel con stock, venta, tránsito, pedidos de clientes especiales y el sugerido de BI. La dirección de compras escribe la cantidad de cada referencia.",
 pasos:["Hacia el día 15–20 llega el order sheet, las calculadoras antes que los relojes [E-08 · E-05]","Se saca de Odoo el reporte «macro» y se le suma la venta de 6–12 meses y el tránsito [E-10]","Planificación reparte por país los lanzamientos nuevos (NPR) [E-40]","Se ofrece el order sheet a 10–12 clientes especiales, que prepagan [E-10]","La dirección de compras pone la cantidad por SKU: 2–3 días al mes [E-08]"],
 variantes:"Tres carriles dentro de Casio que se juntan en un solo pedido: compra regular, lanzamientos NPR y prepedidos de clientes especiales.",
 trombos:[{s:"alta",t:"Una compra de miles de referencias depende de una sola persona, sin respaldo.",ev:"E-08 · E-10"},{s:"media",t:"El archivo de compra no está documentado; se transmitió de persona a persona.",ev:"E-10"},{s:"baja",t:"Los códigos de Casio y de Kenex no coinciden y se cruzan a mano con una tabla de equivalencias.",ev:"E-10"}],
 cifras:["Clientes especiales: 10–12, más de 10 % de la venta [E-10]","La compra toma unos 3 días al mes [E-10]"],
 personas:["Vera","Roberto","Jimena"],sistemas:["Excel","Odoo","Power BI"],proc:["6.3","2.4"],src:"E-05 · E-08 · E-10 · E-26 · E-40",aprob:"La dirección de compras decide la compra de Casio."},

{id:"3b",lane:"cas",x:610,y:210,dir:"r",lab:"below",grp:"Compra",tramo:"T03–T05 · Asignación y pago",t:"Allocation y pago",depto:"Compras · Finanzas",sis:"Correo · Excel",gente:"Roberto · Casio LatAm",ev:"parcial",
 hoy:"Casio confirma una asignación menor a lo pedido, así que compras pide de más. El pago se hace antes del despacho, hacia el día 25, y la mercancía llega el mes siguiente.",
 pasos:["Calendario aproximado: el 15 se devuelve el pedido, el 17 Casio confirma, hasta el 20 se puede agregar y el 25 se paga [E-05]","Casio responde con el allocation y se pueden pedir adicionales [E-06 · E-10]","Todo llega a la Zona Libre de Colón [E-10]","Finanzas prevé el monto mensual en el flujo de caja [E-08]"],
 trombos:[{s:"alta",t:"Casio asigna entre 20 % y 30 % de lo pedido en los últimos meses y faltan referencias clave.",ev:"E-10 · E-40 · E-08"},{s:"media",t:"El reparto final por país no coincide con lo pedido para cada uno, y eso obliga a cuadrar a mano el reporte a Casio.",ev:"E-10"}],
 cifras:["Lead time de Casio: 45–60 días; siempre hay dos pedidos en tránsito [E-10]","Allocation: de 80 % a 30 % según el mes [E-08]"],
 personas:["Roberto","Casio Latinoamérica (Brasil)","Finanzas"],sistemas:["Correo","Excel"],proc:["6.3","13.1","13.4"],src:"E-05 · E-06 · E-08 · E-10 · E-40",
 confirmar:"Instrumento y condiciones del pago a Casio."},

{id:"4b",lane:"cas",x:780,y:210,dir:"r",lab:"below",grp:"Compra",tramo:"T06 · Embarque",t:"Embarque Casio",depto:"Compras · Logística",sis:"Correo",gente:"Roberto · agente",ev:"parcial",
 hoy:"Después del pago, compras coordina con el agente aduanal y el forwarder, aprueba la cotización del flete y decide cuántos contenedores salen y con qué mercancía. Cuando se confirma la salida, reenvía el aviso a logística.",
 pasos:["Compras recibe la cotización del flete y aprueba los contenedores [E-08]","Casio va «casi todo por barco» [E-08]","El shipping advice se reenvía por correo a logística [E-08]","Compras trabaja directo con la logística de Casio: proforma, pago, forwarder y packing list [SC-01]"],
 trombos:[{s:"media",t:"Cada paso del embarque pasa por la misma persona.",ev:"E-08"},{s:"baja",t:"No se separa cuántos contenedores al mes son de cada marca.",ev:"E-68 · E-03"}],
 cifras:["Un contenedor de Casio trae unas 1.800 cajas [E-03]"],
 personas:["Roberto","Agente aduanal","Forwarder"],sistemas:["Correo"],proc:["6.3","7.6"],src:"E-03 · E-08 · E-68 · SC-01",aprob:"La dirección de compras aprueba el flete y los contenedores.",
 confirmar:"Puerto de origen, naviera y documentos que envía Casio."},

{id:"5",lane:"main",x:1040,y:150,dir:"r",lab:"above",grp:"Hub Panamá",tramo:"T07 · Llegada a Panamá",t:"Llegada a Zona Libre",depto:"Tráfico",sis:"EBS · Odoo · Excel",gente:"Tráfico · Inventarios",ev:"solida",
 hoy:"Con el aviso de partida, Tráfico crea el ASN y sigue el contenedor en su propio Excel y en el calendario de Lark. Un día antes de la llegada se crea la entrada en EBS y se le asocia la orden de compra. En la Zona Libre nada se mueve sin el documento DMC.",
 pasos:["Tráfico crea el ASN con la notificación de partida [SC-01 · E-03]","El agente de carga manda los documentos por correo y Kenex los valida [E-70]","La fecha estimada de llegada más 2 días se anota en el calendario de Lark para operaciones [E-70]","Entrada en EBS con BL y contenedor; inventarios asocia la orden de compra [E-70]","El «acarreo» marca la llegada y habilita a la bodega [E-70]"],
 variantes:"Cuatro movimientos posibles en la Zona Libre: entrada, salida, traspaso a otra empresa de la zona y liquidación hacia Panamá.",
 trombos:[{s:"media",t:"Seguimiento fuera de sistema: Excel de contenedores, calendario y cadena de correos.",ev:"E-70"},{s:"media",t:"El tránsito aparece en Odoo solo 1–2 semanas antes de llegar.",ev:"SC-01"},{s:"baja",t:"Pagos de aduana en persona en cada movimiento.",ev:"E-70"}],
 cifras:["4–5 contenedores al mes; hasta 10 en temporada alta [E-68]","Tráfico: 5–6 personas [E-03 · E-70]"],
 personas:["Yanilka (Tráfico)","Alejandra","Agente de carga"],sistemas:["EBS","Odoo","Excel","Calendario de Lark","Portal DMC"],proc:["7.6","7.1"],src:"E-03 · E-68 · E-70 · SC-01"},

{id:"6",lane:"main",x:1190,y:150,dir:"r",lab:"above",grp:"Hub Panamá",tramo:"T08 · Bodega",t:"Bodega y liberación",depto:"Operaciones y Logística",sis:"EBS · Odoo",gente:"Fernando · Alejandra",ev:"solida",
 hoy:"La carga llega a granel y se baja caja por caja. Cada caja recibe un LPN y va a su ubicación según la clasificación ABC. Al cerrar el ASN, EBS pasa las cantidades a Odoo, pero la mercancía solo queda disponible cuando inventarios la acepta a mano y amarra las preventas. La dirección de compras fija el precio de lo nuevo.",
 pasos:["Descarga manual y paletizado sin mezclar productos [E-03 · SC-01]","Recepción contra la orden en la PDT; los faltantes van a una bodega virtual y se reclaman [SC-01]","LPN por caja y ubicación ABC; lo que no se mueve va al fondo [SC-01]","Interfaz de EBS a Odoo al cerrar el ASN; inventarios valida costos y libera [E-03]","Compras pone los precios y reparte por país las ediciones limitadas [E-08]"],
 variantes:"Dos bodegas en Panamá: la de Zona Libre, con EBS y ubicaciones, y la de la ciudad, sin WMS, que surte tiendas, mayor local y web.",
 trombos:[{s:"alta",t:"Una sola persona libera el inventario en Odoo; se hace a mano a propósito para proteger las preventas.",ev:"E-03 · SC-01"},{s:"alta",t:"La bodega de la ciudad tenía unas 130.000 unidades donde bastaban 30.000; en un conteo de Cubitt coincidió solo el 29 % de los ítems.",ev:"SC-06 · E-03"},{s:"media",t:"Hasta que baja la última caja nada está disponible: un contenedor tarda un día.",ev:"E-03"},{s:"media",t:"EBS y Odoo «se hablan en ciertos momentos», no en tiempo real.",ev:"E-07"}],
 cifras:["Nave de 5.000–5.500 m²; la mudanza fue en agosto de 2025 [SC-07]","Unos 4.800 SKU operativos [SC-01]"],
 personas:["Fernando","Alejandra","Supervisores de bodega","Roberto"],sistemas:["EBS","Odoo","PDT"],proc:["7.1","7.2","7.8"],src:"E-03 · E-07 · E-08 · E-68 · SC-01 · SC-06 · SC-07",aprob:"La dirección de compras fija los precios de la mercancía nueva."},

{id:"7",lane:"main",x:1300,y:330,dir:"d",lab:"left",grp:"Hub Panamá",tramo:"T09 · Asignación",t:"Asignación y aprobación",depto:"Gerencia Comercial",sis:"Odoo · Lark",gente:"Andrés · Roberto",ev:"parcial",
 hoy:"No hay una regla escrita de reparto. En la práctica decide la preventa: lo que se amarra al liberar ya tiene dueño. Todo pedido pasa por la gerencia o la dirección comercial, que miran el margen, la cantidad por referencia y el crédito. Cuando no alcanza, el orden implícito es Panamá, luego Colombia, Costa Rica y República Dominicana, y al final Venezuela.",
 pasos:["La gerencia comercial aprueba cada pedido en Odoo con un indicador de riesgo, unos 30 segundos por pedido [E-05 · E-62]","Se evita que un solo cliente se lleve las 20 referencias más vendidas [E-05]","La dirección ajusta un 30–40 % la reposición semanal que prepara planificación [E-08]","Ventas internacionales reserva a sus clientes clave un 15–20 % extra en preventa [E-63]","Lo que no hay queda como presupuesto; si el tránsito no lo cubre, se elimina [E-05]"],
 variantes:"Aquí la vía se abre en cuatro carriles por canal: mayor, países y socios, tiendas y web.",
 trombos:[{s:"alta",t:"Lo no atendido se borra y no queda registro de la demanda perdida.",ev:"E-05 · E-26"},{s:"alta",t:"Todo pedido espera una aprobación centralizada; cuando el aprobador viaja, los pedidos se detienen.",ev:"E-08 · E-62"},{s:"media",t:"Ventas ve un «futuro disponible» y todos ofrecen el mismo stock.",ev:"E-03 · E-05"},{s:"media",t:"El mayor de Venezuela recibe lo que queda: «somos el hoyo».",ev:"E-35"}],
 cifras:["200 clientes especiales revisados cada 2–4 días [E-08]","Ajuste manual de 30–40 % a la reposición [E-08]"],
 personas:["Andrés","Roberto","Alejandra","Jimena","John"],sistemas:["Odoo","Lark"],proc:["2.6","8.5","8.6","6.6"],src:"E-03 · E-05 · E-08 · E-26 · E-35 · E-62 · E-63",aprob:"La gerencia o la dirección comercial aprueban todos los pedidos.",
 confirmar:"La regla que se aplica cuando la mercancía no alcanza para todos."},

{id:"8a",lane:"may",x:1080,y:560,dir:"l",lab:"above",grp:"Venta por canal",tramo:"T10 · Venta al mayor",t:"Oferta y pedido",depto:"Ventas al mayor",sis:"Excel · Odoo · WhatsApp",gente:"John · Edumar",ev:"solida",
 hoy:"El mayor corre en tres carriles: el internacional de Cubitt, en 17 a 20 países; las cuentas especiales; y el mayor local de cada país. Los lunes se manda una lista de disponibilidad en Excel. El cliente la llena, se carga a Odoo como presupuesto y se convierte en orden de venta, que reserva stock.",
 pasos:["Lista de disponibilidad los lunes con SKU, imagen, precio y tránsito [E-05]","Carga masiva a Odoo: primero presupuesto, luego orden de venta [E-05]","Preventa contra tránsito, con fecha prometida al cliente [E-05 · E-07]","Ventas internacionales preventa por WhatsApp con una foto antes de la campaña [E-63]","En Panamá el crédito exige afiliación y debida diligencia; en Venezuela basta el RIF [E-62 · E-48]"],
 variantes:"Casio y Cubitt se venden igual al mayor, pero Cubitt tiene dirección internacional y Casio no. Venezuela maneja tres listas de precio (bolívares, dólares y PVP) y consignación en cadenas.",
 trombos:[{s:"alta",t:"En Venezuela el mayor recibe último: pide 1.000 y le llegan 500.",ev:"E-35"},{s:"media",t:"La lista de los lunes no la mandan todos, y todos ofrecen el mismo stock.",ev:"E-05"},{s:"media",t:"Parte de la venta B2B no está en Odoo; la mayoría de los clientes compra por teléfono.",ev:"SC-11 · E-26"},{s:"media",t:"El mayor conoce las campañas dos semanas antes del lanzamiento.",ev:"E-63"}],
 cifras:["El mayor internacional de Cubitt crece 2–3 veces al año [E-63]","Línea blanca: cerca de 2 M USD el año pasado [E-63]","El cliente n.º 2 de Venezuela compra unos 600 mil USD al año [E-35]"],
 personas:["John","Edumar","Andrés Márquez","Ricardo Baltodano"],sistemas:["Excel","Odoo","WhatsApp","Lark"],proc:["8.3","8.4","8.5","8.6","8.7","8.11"],src:"E-05 · E-07 · E-35 · E-36 · E-39 · E-48 · E-57 · E-62 · E-63",
 confirmar:"Quién lleva el mayor internacional de Casio y cómo reparte el cupo."},

{id:"9a",lane:"may",x:860,y:560,dir:"l",lab:"above",grp:"Venta por canal",tramo:"T15 · Despacho",t:"Despacho y exportación",depto:"Bodega · Tráfico",sis:"EBS · Odoo · correo",gente:"Pick & pack · Tráfico",ev:"solida",
 hoy:"El pedido aprobado cae en EBS y el jefe de preparación lo asigna. Se piquea en zig-zag, se empaca a ciegas y espera en el stage según el modo de transporte. Tráfico factura con el packing list que llega por correo, suma empaque y flete, y despacha cuando el vendedor confirma el pago y el forwarder del cliente fija el día.",
 pasos:["Picking dirigido con PDT y packing ciego, que no deja avanzar si falta una pieza [SC-01]","Stage por modo de transporte: aéreo, terrestre o marítimo [SC-01]","Packing list automático por correo al vendedor y a Tráfico [SC-01 · E-70]","Factura borrador con empaque y flete [SC-01]","DMC, sello, carga programada en EBS, foto de cada pedido y salida [E-70 · SC-01]"],
 trombos:[{s:"alta",t:"El 70 % del tiempo entre pedido y despacho es esperar a clientes y forwarders; hubo órdenes de hasta 200 días en el stage.",ev:"SC-01"},{s:"media",t:"El vendedor hace de intermediario en todo: confirma el pago, reenvía el packing list y guarda los contactos del cliente en su teléfono.",ev:"E-70 · SC-01"},{s:"media",t:"Los empaques los dictan los vendedores caso a caso, con reempaques y reversos.",ev:"E-68"}],
 cifras:["De unos 14 días a 3–4 días por pedido [SC-07]","Cumplimiento del plazo: 85–90 % [SC-01]"],
 personas:["Isaac","Tráfico (Natalia, Lebana, Karin, Joana)","Vendedores"],sistemas:["EBS","Odoo","Correo","Excel"],proc:["7.3","7.4","7.5"],src:"E-03 · E-68 · E-70 · SC-01 · SC-07"},

{id:"8b",lane:"pai",x:1080,y:640,dir:"l",lab:"above",grp:"Venta por canal",tramo:"T11 · Países propios",t:"Pedido intragrupo",depto:"Planificación · Ventas",sis:"Excel · correo · Odoo",gente:"Jimena · Vladimir · Edumar",ev:"solida",
 hoy:"Los países le compran a Panamá como clientes. Venezuela manda su pedido en Excel y Panamá decide cuánto le da. Colombia acuerda su pedido con la gerencia comercial y Panamá lo carga en Odoo. Costa Rica, que es socio, rellena una hoja de pedido que le envía ventas internacionales.",
 pasos:["Venezuela: planificación calcula, operaciones ajusta y se envía a Panamá en Excel, sin orden en Odoo [E-34]","Panamá recorta: la gerencia comercial en Cubitt y la dirección de compras en Casio [E-34]","Colombia: el líder comercial consolida, la gerencia del país revisa, Panamá aprueba y logística lo carga en Odoo [E-11]","Costa Rica: compras del socio llena la hoja, su gerencia aprueba y Kenex alista en 1–3 semanas [E-19 · E-59]"],
 variantes:"Cuatro frentes con reglas distintas: Venezuela, Colombia, Costa Rica como socio, y Kenex USA, que sale de la vía y compra directo a China.",
 trombos:[{s:"alta",t:"Llega menos de lo pedido y no se avisa a tiempo: Costa Rica recibe 70–80 % y en Venezuela hubo diferencias entre lo facturado y lo recibido.",ev:"E-19 · E-40 · E-34"},{s:"media",t:"El stock disponible se publica a Costa Rica por rangos, no en cantidades exactas.",ev:"E-19"},{s:"media",t:"No se registra cuánto pidió cada país ni cuánto se le dio.",ev:"E-40"}],
 cifras:["Preparar un pedido a Venezuela toma unas 2 semanas [E-40]","Contenedor de 66 m³; se planifica hasta unos 60 [E-40]"],
 personas:["Jimena","Vladimir","Edumar","Joel","Santiago","Gil e Itai Porat"],sistemas:["Excel","Correo","Odoo"],proc:["6.6","8.3"],src:"E-11 · E-14 · E-19 · E-34 · E-39 · E-40 · E-59",aprob:"La dirección de compras (Casio) y la gerencia comercial (Cubitt) deciden cuánto recibe cada país."},

{id:"9b",lane:"pai",x:900,y:640,dir:"l",lab:"above",grp:"Venta por canal",tramo:"T11 · Aduana en destino",t:"Aduana en destino",depto:"Operaciones del país",sis:"Correo · papel",gente:"Vladimir · Joel",ev:"solida",
 hoy:"Cada país tiene su propia aduana y sus trabas. Venezuela recibe el contenedor tras unos 15 días de mar y luego pasa por permisos y nacionalización. Colombia importa hoy a través de un tercero. Costa Rica recibe por camión en el almacén fiscal de San José.",
 pasos:["Venezuela: BL, factura y documento de salida llegan por correo; operaciones los cuadra y los pasa al agente [E-34]","Permisos de SENCAMER y CONATEL; sin permiso, el embarque se frena [E-34]","Aranceles y reparto de flete y seguro en el costo de cada unidad [E-65]","Colombia importa con un tercero, que cobra un sobrecargo [E-11]","Costa Rica: DUA, semáforo y camión hasta la bodega del socio [E-19]"],
 trombos:[{s:"alta",t:"Colombia importa a través de un tercero, con sobrecosto, y ha tenido mercancía retenida en aduana.",ev:"E-11"},{s:"alta",t:"En Venezuela aduana, permisos y buena parte de las decisiones operativas pasan por una sola persona.",ev:"E-34 · E-35"},{s:"media",t:"El proceso de aduana en Venezuela no está documentado y hubo retenciones por un certificado.",ev:"E-34"},{s:"media",t:"Quien planifica no ve la guía del embarque y se entera de la llegada por comentarios.",ev:"E-40"}],
 cifras:["Panamá a Venezuela: unos 15 días de mar [SC-07]; «un mes cuando poco» de punta a punta [E-35]","Arancel de relojería en Venezuela: del 20 % al 35 % [E-34]"],
 personas:["Vladimir","Agente aduanal","Joel","Hugo (Costa Rica)"],sistemas:["Correo","Papel","Odoo"],proc:["7.6","7.1"],src:"E-11 · E-19 · E-34 · E-35 · E-40 · E-59 · E-65 · SC-07"},

{id:"10b",lane:"pai",x:720,y:640,dir:"l",lab:"above",grp:"Venta por canal",tramo:"T08–T09 · Bodega del país",t:"Bodega país y reparto",depto:"Logística del país",sis:"WMS propio · Odoo",gente:"Elvis · Yoly · Joel",ev:"solida",
 hoy:"La mercancía entra a la bodega del país y se reparte a sus canales. En Venezuela el orden es fijo: «primero comen las tiendas, un poquito de la web», y el mayor vende lo que queda. En Colombia todo cae en un solo stock y el mayor puede dejar al país en cero.",
 pasos:["Venezuela: logística ubica, facturación carga la orden y la entrada, y planificación levanta los faltantes contra la factura [E-34]","Stock objetivo según la distancia: más unidades cuanto más lejos está la tienda [E-34]","Las tiendas grandes funcionan como almacenes satélite [E-34]","Colombia: dos personas en la bodega con el WMS de Odoo; la gerencia aprueba cada movimiento en Lark [E-11]","Costa Rica: logística nacionaliza en su ERP y administración cuadra los impuestos contra el sistema [E-59]"],
 trombos:[{s:"alta",t:"En Venezuela un contenedor paraliza el almacén: el mayor pierde una semana porque las tiendas pasan primero.",ev:"E-36"},{s:"alta",t:"El inventario del sistema no es el real: reservas que no se liberan y «mercancías que existen pero no existen».",ev:"E-34 · E-35"},{s:"media",t:"Colombia no divide el inventario por canal: el mayor consume todo y deja la web y las islas en cero.",ev:"E-14"},{s:"media",t:"La facturación y la aprobación de movimientos dependen de una persona en cada país.",ev:"E-34 · E-11"}],
 cifras:["Referencias iguales en Panamá y Venezuela: 99,9 % [E-34]"],
 personas:["Elvis","Yoly","Vladimir","Joel","Andrea","Hugo"],sistemas:["WMS propio (Venezuela)","Odoo","Lark","PCGraph (Costa Rica)"],proc:["7.2","7.8","6.7"],src:"E-11 · E-14 · E-34 · E-35 · E-36 · E-59"},

{id:"8c",lane:"tie",x:1080,y:720,dir:"l",lab:"above",grp:"Venta por canal",tramo:"T12 · Tiendas",t:"Reposición a tienda",depto:"Planificación · Retail",sis:"Excel · Odoo · WMS",gente:"Jimena · Blas · Andrés",ev:"solida",
 hoy:"Las tiendas no piden: planificación les calcula un sugerido cada semana. En Panamá hay un piloto de despacho directo desde Colón: el supervisor ajusta el sugerido el lunes, la gerencia comercial aprueba, el camión llega a la tienda entre martes y jueves, y la mercancía no se puede vender hasta que se valida la factura y se crea el traslado.",
 pasos:["Planificación cruza inventario y venta por tienda y manda el sugerido [E-53 · E-40]","El supervisor lo ajusta por espacio y exhibición y arma los pedidos con la plantilla masiva de Odoo [E-53]","La gerencia comercial aprueba en el sistema; sin eso la bodega no ve el pedido [E-53]","Colón factura a la bodega de la ciudad [E-70 · E-44]","La tienda cuenta pieza por pieza y el supervisor crea el traslado hacia la tienda [E-53]"],
 variantes:"Venezuela repone desde la bodega central, con transporte propio lunes, miércoles y viernes en Caracas y terceros al interior. Margarita tiene reglas propias para mover mercancía hacia el continente.",
 trombos:[{s:"alta",t:"La mercancía está en la tienda pero no se puede vender hasta el doble registro, que depende de un solo supervisor.",ev:"E-53"},{s:"media",t:"En Venezuela los pedidos se suben tienda por tienda a Odoo, se imprimen y se grapan: 10 a 30 minutos cada vez.",ev:"E-40"},{s:"media",t:"Quiebres de productos estrella: el termo negro en cero en la tienda y 5.000 en Zona Libre.",ev:"E-57"}],
 cifras:["Pedido a tienda en Panamá: de 13 días a 2 [E-69]","Cobertura objetivo en tienda: 3–4 semanas, por Pareto [E-40]"],
 personas:["Jimena","Blas","Andrés","María Eugenia","Vladimir"],sistemas:["Excel","Odoo","WMS (tablet)"],proc:["9.3","9.4","6.7"],src:"E-40 · E-44 · E-47 · E-53 · E-57 · E-69 · E-70 · SC-02",aprob:"La gerencia comercial aprueba cada pedido de tienda en Panamá."},

{id:"9c",lane:"tie",x:900,y:720,dir:"l",lab:"above",grp:"Venta por canal",tramo:"T12 · Tiendas",t:"Venta en tienda",depto:"Retail · Visual",sis:"Odoo POS · BPOS",gente:"Handani · Reina",ev:"solida",
 hoy:"Todas las tiendas venden con Odoo POS. En Venezuela el cobro sale de Odoo hacia BPOS, de Megasoft, y la impresora fiscal. Casio se exhibe por línea según sus parámetros y Cubitt por color. Visual implementa las artes y promociones que manda mercadeo.",
 pasos:["Venta en Odoo POS; en Panamá con efectivo, tarjeta, transferencia y pago móvil [SC-02 · E-53]","Venezuela: tasa del día al abrir; BPOS integra varios bancos fuera de Odoo [E-47 · E-33]","Una unidad exhibida por modelo; el resto se guarda [SC-02]","Retail regional y la dirección comercial fijan metas por país; la gerencia de tiendas las baja a cada tienda [E-47]"],
 variantes:"Unas 50 tiendas en la región: Venezuela 20–24, Panamá 9–11, Colombia 2–3, Guatemala con operador, Costa Rica del socio y franquicias Casio en Honduras y República Dominicana.",
 trombos:[{s:"media",t:"No se registra la venta perdida cuando el cliente pide algo que no hay.",ev:"SC-02"},{s:"media",t:"Productos que llegan sin precio de venta bloquean la venta.",ev:"E-53"},{s:"media",t:"En Venezuela Internet y bancos fallan a diario, y el soporte de tiendas depende de una persona todos los días.",ev:"E-33 · E-07"},{s:"media",t:"Las promociones pasaron de 1 a 5–6 por país al mes, con artes que hubo que rehacer.",ev:"E-50"}],
 cifras:["Isla: unos 30.000 USD de venta al mes; tienda Cubitt de Metromall: unos 50.000 [SC-02]","Montaje: kiosco unos 15.000 USD, tienda unos 60.000 [SC-02]"],
 personas:["Handani","María Eugenia","Blas","Reina (Visual)"],sistemas:["Odoo POS","BPOS (Megasoft)","Impresora fiscal","Follow Up"],proc:["9.6","9.7","9.13","16.7"],src:"E-07 · E-08 · E-33 · E-47 · E-50 · E-53 · E-55 · SC-02"},

{id:"10c",lane:"tie",x:720,y:720,dir:"l",lab:"above",grp:"Venta por canal",tramo:"T12 → T16 · Cierre",t:"Cierre de caja",depto:"Retail · Tesorería",sis:"Odoo · Excel · Drive",gente:"Tiendas · Handani",ev:"solida",
 hoy:"Al cerrar, cada tienda cuadra la caja por medio de pago y deposita. Después digita a mano tres datos, venta, unidades y transacciones, en el cuadro de retail regional. En Caracas el efectivo viaja con el transporte a tesorería, y en Venezuela el reporte llega por correo en la noche.",
 pasos:["Panamá: fondo de 600 USD, cuadre con el cierre bancario y depósito en la agencia del centro comercial [SC-02 · E-53]","Caracas: el efectivo va con el transporte a tesorería los lunes, miércoles y viernes [E-47]","Interior de Venezuela: depósito en el banco y valija por MRW con los papeles [E-47]","El cierre del día se digita en el cuadro compartido de retail regional [E-55]"],
 trombos:[{s:"media",t:"La venta diaria se digita a mano, con un formato por país, y las anomalías se detectan «a ojo».",ev:"E-55 · E-47"},{s:"media",t:"En Venezuela la caja se revisa a mano contra el reporte Z de la máquina fiscal.",ev:"E-38"}],
 cifras:["Cadencia: venta diaria, inventario semanal y P&L por tienda mensual, aún pendiente en Panamá y Venezuela [E-55]"],
 personas:["Encargados de tienda","Handani","Tesorería"],sistemas:["Odoo","Excel","Drive","Correo"],proc:["9.5","9.15","12.2","9.2"],src:"E-38 · E-47 · E-53 · E-55 · SC-02"},

{id:"8d",lane:"web",x:1080,y:800,dir:"l",lab:"above",grp:"Venta por canal",tramo:"T13 · Web",t:"Pedido web",depto:"E-commerce",sis:"Cashea · Shopify · Mercately",gente:"Jesmir · asesores",ev:"solida",
 hoy:"En Venezuela la venta digital entra por Cashea, que es cerca del 80 %, por las webs de Shopify, por WhatsApp y por MercadoLibre, y todo se une en Odoo al «mandar a preparación». En Panamá el cliente compra en Shopify o por WhatsApp, y contabilidad confirma el pago antes de preparar.",
 pasos:["E-commerce publica los productos en Cashea y MercadoLibre cuando la mercancía ya llegó [E-16]","Cashea cae al portal del comercio; una persona filtra lo pagado y lo confirma en Odoo [E-41]","WhatsApp (Mercately): el asesor vende con link de Cashea, directo en Odoo o con el link de la web [E-16 · E-41]","Una venta a crédito tiene que pasar al mayor [E-41]"],
 variantes:"Colombia vende por Shopify y 9 marketplaces y es el primer canal online del grupo. Kenex USA vende en 15 marketplaces con Shopify y QuickBooks.",
 trombos:[{s:"alta",t:"La integración de Cashea con Odoo trae pedidos cancelados y sin datos de contacto: Excel paralelo y una persona dedicada solo a filtrar.",ev:"E-41"},{s:"media",t:"La web se entera de lo nuevo cuando la mercancía ya llegó; no hay plan de lanzamiento.",ev:"E-16"},{s:"media",t:"Canal de chat sobrecargado: unas 6.000 conversaciones al mes solo de Cubitt en Venezuela.",ev:"E-41 · E-26"}],
 cifras:["Julio de 2026: 5.063 órdenes en Venezuela [E-41]","Cashea: unos 3.000 pedidos al mes de Cubitt y 1.000 de Casio [E-16]","Crecimiento cercano al 230 % desde julio de 2025 [E-16]"],
 personas:["Jesmir","Asesores de chat"],sistemas:["Cashea","Shopify","Mercately","MercadoLibre","Odoo"],proc:["10.3","10.4","10.6","10.7"],src:"E-02 · E-11 · E-16 · E-26 · E-30 · E-41 · SC-03"},

{id:"9d",lane:"web",x:900,y:800,dir:"l",lab:"above",grp:"Venta por canal",tramo:"T16 · Pago web",t:"Validación de pago",depto:"E-commerce",sis:"Chat de Lark · banco",gente:"Jesmir",ev:"solida",
 hoy:"En Venezuela los pagos por WhatsApp se validan uno por uno: el asesor publica el pedido en un grupo de Lark y la gerencia de e-commerce entra al banco a confirmar, también los domingos. La web de Cubitt ya tiene pasarela automática; la de Casio todavía no.",
 pasos:["Pasarela de pago en la web de Cubitt desde hace 1–2 meses [E-41]","Pago móvil por WhatsApp: validación manual en el grupo «Confirmaciones» [E-41]","Cashea financia al cliente; desde el 15-jul hay 0 % de inicial para su nivel más alto [E-41]","En Panamá y Colombia confirma contabilidad [E-02]"],
 trombos:[{s:"alta",t:"En Venezuela el mismo equipo que vende valida sus pagos: falta separar esas dos funciones.",ev:"E-41 · E-58"},{s:"media",t:"La confirmación vive en un chat y no en Odoo; no hay un panel de pagos aprobados.",ev:"E-41"},{s:"media",t:"En Panamá, en junio se conciliaban los pagos de abril.",ev:"E-02"}],
 cifras:["Validaciones manuales: de 30–40 al día a 10–15 [E-41]"],
 personas:["Jesmir","Asesores","Contabilidad"],sistemas:["Chat de Lark","Banca en línea","Odoo"],proc:["10.8","12.3"],src:"E-02 · E-16 · E-41 · E-58",aprob:"La presidencia decide la cuota inicial de Cashea."},

{id:"10d",lane:"web",x:720,y:800,dir:"l",lab:"above",grp:"Venta por canal",tramo:"T15 · Despacho web",t:"Factura y courier",depto:"Logística web",sis:"WMS tablet · MRW",gente:"Logística web",ev:"solida",
 hoy:"En Venezuela el pedido aparece en la tablet del almacén web, se escanea y se etiqueta. La factura es física y va dentro del paquete, así que la caja queda abierta hasta que llega. Después se emparejan factura, guía y caja, y se entregan a MRW o Zoom, que recogen en la propia oficina.",
 pasos:["Tablet con WMS: el operario ve canal, producto y cantidad, y escanea [E-41]","Foto de la etiqueta a un grupo para que facturen [E-41]","Guía de Cashea, MRW o Zoom; si falla, se hace a mano en un archivo compartido [E-41]","MRW recoge a diario y Zoom martes, jueves y viernes [E-41]"],
 variantes:"En Panamá hay un operario de bodega para e-commerce y garantías, contabilidad factura y el courier integrado genera la guía solo.",
 trombos:[{s:"alta",t:"Cajas abiertas esperando la factura física.",ev:"E-41 · E-04"},{s:"alta",t:"El almacén web es pequeño para el volumen y se embala afuera: «un diciembre no vamos a poder».",ev:"E-16 · E-41"},{s:"media",t:"No hay panel de despacho: cada asesor pierde cerca de una hora al día buscando si un pedido salió.",ev:"E-41"}],
 cifras:["150–200 envíos al día; unos 800 escaneados en un fin de semana [E-41]","Diciembre: entre +120 % y +160 % [E-16 · E-41]"],
 personas:["Logística web","Facturación web"],sistemas:["WMS (tablet)","Odoo","MRW","Zoom","Drive"],proc:["10.9","10.10","10.11","10.12"],src:"E-02 · E-04 · E-16 · E-41 · SC-03"},

{id:"11",lane:"main",x:360,y:690,dir:"l",lab:"below",grp:"Dinero",tramo:"T16 · Cobro",t:"Cobro y crédito",depto:"Crédito y cobranza",sis:"Odoo · Excel · Lark",gente:"Noel · Yajaira",ev:"solida",
 hoy:"Los cuatro carriles se unen en el cobro, pero cada país cobra distinto. Panamá tiene crédito formal con plazos, afiliación y un indicador de riesgo, y registra los pagos el mismo día. En Venezuela el alta de un cliente del mayor se hace solo con el RIF, sin límites ni plazos de crédito, y los vendedores negocian y registran pagos mixtos en varias monedas.",
 pasos:["Panamá: afiliación en Lark y debida diligencia de crédito antes de otorgarlo [E-62]","Plazos de 30 a 120 días; los cambios de condición van por un flujo de Lark [E-62]","Venezuela: el vendedor registra el pago en la factura de Odoo con una plantilla [E-48]","Cuentas por cobrar valida contra los cortes bancarios que tesorería comparte en Drive [E-48]","Tiendas y web cobran al contado; Cashea abona a medida que cobra sus cuotas [E-15 · E-43]"],
 variantes:"Aquí se unen los cuatro carriles de venta.",
 trombos:[{s:"alta",t:"Venezuela todavía no tiene una política de crédito para el mayor: faltan límites, plazos y bloqueo de morosos.",ev:"E-48"},{s:"alta",t:"El saldo de clientes en el sistema no refleja la deuda real: hay cobros de meses anteriores sin registrar.",ev:"E-35 · E-48"},{s:"media",t:"El crédito a clientes del exterior no tiene contrato ni comité.",ev:"E-62"},{s:"media",t:"Los vendedores venden y cobran; en Panamá hay tres canales distintos para reportar un pago.",ev:"E-39 · E-36"}],
 cifras:["Panamá: cartera de 6–7 M USD y morosidad de 3,1 % [E-62]","Venezuela: 610 mil USD vencidos, 113 mil a más de 120 días [E-48]"],
 personas:["Noel","Víctor (cobros Panamá)","Yajaira","Vendedores"],sistemas:["Odoo","Excel","Lark","Drive"],proc:["13.5","13.6","8.15"],src:"E-15 · E-35 · E-36 · E-39 · E-43 · E-48 · E-62",
 confirmar:"Cómo cobra Colombia y cómo liquida Cashea (plazos y comisión)."},

{id:"12",lane:"main",x:120,y:570,dir:"u",lab:"right",grp:"Dinero",tramo:"T17 · Conciliación",t:"Conciliación",depto:"Contabilidad",sis:"Odoo · Excel",gente:"Contabilidad",ev:"solida",
 hoy:"Panamá concilia a diario en Odoo con cuentas transitorias y ya revisa las cajas dentro del sistema. Venezuela concilia a mano en Excel, en dos etapas: lo vendido contra lo cobrado, y lo cobrado contra el banco. Colombia cruza en Excel los reportes de cada marketplace.",
 pasos:["Panamá: extracto diario en Odoo; las transitorias se revisan dos veces al mes [E-44]","Venezuela: caja contra el reporte Z, luego lo cobrado contra los estados de cuenta [E-38]","Cashea se cruza entre el estado de cuenta del banco y el portal de Cashea [E-38]","Colombia: una persona cruza en Excel el reporte de Odoo con el de cada plataforma [E-46]"],
 trombos:[{s:"alta",t:"En Venezuela 8–10 personas concilian y van unos dos meses atrasadas.",ev:"E-04 · E-38"},{s:"media",t:"Cashea se concilia fuera de Odoo, contra su propio portal.",ev:"E-15 · E-43"},{s:"media",t:"Cerca del 60 % de las ventas en Venezuela genera diferencial cambiario, que se ajusta cuota por cuota.",ev:"E-38"}],
 cifras:["Panamá concilia 6 empresas; pasó de un día a 20 minutos [SC-05]"],
 personas:["Contabilidad de cada país","Tesorería"],sistemas:["Odoo","Excel","Portal de Cashea"],proc:["12.3","12.2","10.8"],src:"E-04 · E-15 · E-38 · E-43 · E-44 · E-46 · SC-05"},

{id:"13",lane:"main",x:120,y:470,dir:"u",lab:"right",grp:"Dinero",tramo:"T17 · Intercompañía",t:"Cuadre entre empresas",depto:"Contabilidad · Tesorería",sis:"Odoo ×3 · Excel",gente:"Tesorería · CxC",ev:"parcial",
 hoy:"Los países le compran a la casa matriz como clientes y registran sus facturas en su propio Odoo. Entre las empresas del grupo quedan saldos por cuadrar: gastos que una empresa paga por otra, tarjetas compartidas y sistemas contables que no se hablan.",
 pasos:["Cada país registra la factura de la casa matriz en su propio Odoo [E-65]","Los gastos pagados en Panamá por cuenta de otros países se registran como cuentas por cobrar a esas empresas [E-61]","Desde agosto se cuadran cada mes los saldos entre las empresas de Panamá [E-61]"],
 trombos:[{s:"alta",t:"Las cuentas por cobrar entre empresas del grupo se llevan pero no se gestionan, y el cuadre es manual e irregular.",ev:"E-61"},{s:"media",t:"Pagos cruzados con tarjetas: hasta cuatro asientos por un solo movimiento.",ev:"E-61"},{s:"media",t:"Los Odoo de cada país no están conectados; los estados de cuenta se piden a mano.",ev:"E-65"}],
 cifras:[],
 personas:["Tesorería Panamá","Cuentas por cobrar","Cuentas por pagar Venezuela"],sistemas:["Odoo (tres instancias)","Excel"],proc:["13.7","13.2"],src:"E-61 · E-62 · E-65"},

{id:"14",lane:"main",x:120,y:370,dir:"u",lab:"right",grp:"Dinero",tramo:"T17 · Cierre",t:"Cierre y reporte",depto:"Contabilidad · Finanzas",sis:"Odoo · Excel · WhatsApp",gente:"Contabilidad · CFO",ev:"solida",
 hoy:"Panamá cierra cada mes y Finanzas presenta los números en el comité de finanzas cada 15 días. Venezuela lleva el cierre atrasado y solo presenta el estado de resultados. No hay un consolidado del grupo, y las ventas y el margen del mes se comparten por WhatsApp.",
 pasos:["Panamá: contabilidad revisa con Finanzas el resultado por tienda y el balance [E-44]","Comité de finanzas quincenal, los miércoles, con la Junta [E-44 · E-23]","Venezuela: el reporte a la dirección es un Excel con datos bajados de Odoo [E-38]","Colombia: cierre mensual firmado por contabilidad, la revisoría fiscal y la gerencia del país [E-46]"],
 trombos:[{s:"alta",t:"Venezuela todavía no cierra el mes: a finales de agosto se revisaba abril.",ev:"E-15 · E-38 · E-65"},{s:"media",t:"No hay un cálculo del costo real y del margen por producto.",ev:"SC-13"},{s:"media",t:"No existe un estado consolidado del grupo.",ev:"E-01 · E-44"}],
 cifras:["La casa matriz cierra en 7–10 días; las tiendas de Panamá en unas 3 semanas [E-15]"],
 personas:["Ian Chen","Víctor Padovani","Marcella","Jaime"],sistemas:["Odoo","Excel","WhatsApp"],proc:["12.8","12.9","13.8"],src:"E-01 · E-08 · E-15 · E-23 · E-38 · E-44 · E-46 · E-65 · SC-13"},

{id:"15",lane:"main",x:120,y:260,dir:"u",lab:"right",grp:"Dinero",tramo:"T19 · Sell-out",t:"Sell-out y vuelta al plan",depto:"BI · Planificación",sis:"Correo · Fabric · Power BI",gente:"Alexis · Handani · Vera",ev:"solida",
 hoy:"La venta de los clientes vuelve para planificar la siguiente compra. Los 41 clientes del mayor mandan su sell-out por correo, cada uno en su formato; BI lo normaliza en Microsoft Fabric y lo publica en Power BI. Las tiendas propias entran por la API de Odoo y a mano en el cuadro de retail. De ahí el dato vuelve a compras, planificación y la dirección.",
 pasos:["El cliente exporta de su ERP y se lo manda a su vendedor, que lo reenvía a BI [E-18]","Fabric lleva los 41 formatos a una tabla normalizada [E-18]","Colombia presenta su Excel Máster a la Junta cada martes [E-11 · E-14]","Costa Rica manda reportes diarios desde su ERP; Kenex USA no reporta a Panamá [E-19 · E-30]"],
 trombos:[{s:"alta",t:"El sell-out llega tarde, incompleto o con nombres propios del cliente, y ese producto queda por fuera.",ev:"E-18"},{s:"media",t:"Cada país reporta en un formato distinto, y los reportes se rehacen para cada área.",ev:"E-55 · E-47"},{s:"media",t:"El dato no llega a los vendedores ni a las compras de Cubitt.",ev:"E-18"}],
 cifras:["41 clientes y más de 1.000 tiendas [E-18]","Presencia comercial en 14 países [E-18]"],
 personas:["Alexis","Kenzie","Ali","Handani","Vera","Jimena"],sistemas:["Correo","Microsoft Fabric","Power BI","API de Odoo","Excel"],proc:["8.17","9.2","10.16","2.7"],src:"E-10 · E-11 · E-14 · E-18 · E-19 · E-30 · E-47 · E-55"},

{id:"PCI",lane:"loop",x:300,y:305,dir:"r",lab:"below",hz:[0,-24],grp:"Bucles y accesos",tramo:"T19 · Reporte a Casio",t:"Reporte PCI a Casio",depto:"Compras Casio",sis:"Odoo · Excel",gente:"Vera",ev:"solida",
 hoy:"Cada mes compras y reportería arma para Casio el reporte de lo vendido en la zona. Sale de Odoo y requiere ajustes manuales para cuadrar compras y ventas. Dos veces al año los números se presentan en la convención con Casio.",
 pasos:["Sale de Odoo y se ajusta a mano [E-10]","Cubre relojes, calculadoras y teclados en unos ocho países [E-10]","Casio revisa el cumplimiento del forecast por país [E-10]"],
 trombos:[{s:"alta",t:"Un reporte complejo que ocupa los primeros 10 días del mes y que solo una persona sabe hacer.",ev:"E-10"},{s:"media",t:"El control de seriales de la línea exclusiva no está al día.",ev:"E-10"}],
 cifras:["Reporte mensual y convención con Casio dos veces al año [E-10]"],
 personas:["Vera","Roberto"],sistemas:["Odoo","Excel"],proc:["6.3"],src:"E-10"},

{id:"PV",lane:"loop",x:720,y:410,dir:"r",lab:"custom",lxy:[750,440,"start"],grp:"Bucles y accesos",tramo:"T18 · Postventa",t:"Postventa",depto:"Servicio al cliente",sis:"Lark · Odoo · Syscore",gente:"Patrick · Yusseth",ev:"solida",
 hoy:"Lo que vuelve toma otra vía. Cubitt no se repara: dentro del año se reemplaza, de inmediato si la falla es de hardware o en hasta 7 días si la fábrica corrige el software. Casio sí se repara, con repuestos que se piden a Japón. Cada mes se concilia lo dañado y se desecha con un reciclador.",
 pasos:["Entrada por la tienda, el chat, el correo o el Cubi Café [E-64 · E-58]","Diagnóstico, y reemplazo o caso en una tabla de Lark con acceso de la fábrica [E-64]","Traslado en Odoo a la bodega de garantías; el nuevo se entrega al recibir el dañado [E-58]","Formulario de Lark para la fábrica y tablero de garantías [E-58]","Venezuela: orden en Syscore, luego NAF, Lark y Odoo; el reemplazo lo baja el almacén dos veces al día [E-51]"],
 variantes:"Por marca: Cubitt se reemplaza y Casio se repara. Por país: en Panamá, Colombia y Guatemala la tienda filtra; en Venezuela todo va al taller central de Caracas.",
 trombos:[{s:"alta",t:"En Venezuela un mismo caso pasa por cuatro sistemas: Syscore, NAF, Lark y Odoo.",ev:"E-51"},{s:"alta",t:"Los repuestos de Casio de toda la región dependen de una sola persona.",ev:"E-51 · E-02"},{s:"media",t:"En Venezuela falta stock para los cambios y se pide prestado al almacén web.",ev:"E-51"},{s:"media",t:"Hasta hace poco no había proceso de scrap y la mercancía dañada se acumulaba.",ev:"E-04"}],
 cifras:["Venezuela: unas 700 órdenes de servicio al mes [E-51]","Garantías de Cubitt: históricamente menos de 1,5 %, hoy 3,5 % en algunos productos [E-58]"],
 personas:["Patrick","Yusseth","Eloy","Rockmar"],sistemas:["Lark","Odoo","Syscore","NAF","Mercately"],proc:["11.1","11.2","11.3","11.4","11.5","11.9","7.7"],src:"E-02 · E-04 · E-51 · E-58 · E-64 · SC-03",aprob:"La presidencia aprueba la compra de repuestos de Casio."},

{id:"MK",lane:"acc",x:960,y:480,dir:"d",lab:"left",grp:"Bucles y accesos",tramo:"TX · Mercadeo",t:"Mercadeo",depto:"Mercadeo · Visual",sis:"Lark · Dropbox",gente:"Natasha · Valentina",ev:"solida",
 hoy:"Mercadeo no compra ni vende, pero entra a la vía en tres puntos: el lanzamiento, cuando el producto ya se está fabricando; las promociones mensuales para rotar inventario; y el co-marketing con los clientes del mayor. Casio aprueba sus campañas en Casio Brasil; las de Cubitt pasan por la Junta.",
 pasos:["El key visual regional sale de Panamá y cada país lo adapta [E-42 · E-31]","Visual implementa en las tiendas y la web activa las promociones [E-31 · E-16]","En Venezuela cada promoción necesita permiso de la SUNDDE, que tarda 15 días hábiles [E-31]"],
 trombos:[{s:"alta",t:"Las piezas de Cubitt pasan por varias instancias de aprobación con criterios distintos; se pierden unas 4 semanas y se compromete el plazo del permiso.",ev:"E-42 · E-31"},{s:"media",t:"Lanzamientos sin stock para comunicar: en Colombia las primeras piezas se fueron a comercial.",ev:"E-56"},{s:"media",t:"Mercadeo no ve el inventario ni recibe el dato de venta de forma sistemática: «trabajamos muy a ciegas».",ev:"E-42 · E-22"}],
 cifras:["Unas 5 promociones por país al mes [E-22]"],
 personas:["Natasha","Valentina","Sofiana","Leslie","Reina"],sistemas:["Lark","Dropbox"],proc:["16.1","16.2","16.7","2.5"],src:"E-22 · E-31 · E-42 · E-49 · E-56",aprob:"La Junta aprueba las artes de Cubitt y la dirección comercial cada promoción."},

{id:"US",lane:"exit",x:1004,y:36,dir:"r",lab:"right",lx:44,grp:"Bucles y accesos",tramo:"T11 · Kenex USA",t:"Kenex USA",depto:"Kenex USA",sis:"Shopify · QuickBooks",gente:"Isabella · Alejandro",ev:"parcial",
 hoy:"Kenex USA sale de la vía: compra directo a las fábricas de China, recibe en Miami y vende en 15 marketplaces. Panamá solo le manda urgencias. Reporta sus números una vez al mes a la dirección, no a Panamá.",
 pasos:["La operación arma la lista de lo que hace falta para los próximos meses [E-30]","Dos personas en la bodega cuentan lo que llega; la factura se registra en QuickBooks [E-30]","Las órdenes de Amazon y Whatnot se imprimen a diario para la bodega [E-30]"],
 trombos:[{s:"media",t:"Opera fuera de los procesos del grupo y no comparte su dato con Panamá.",ev:"E-01 · E-30"},{s:"media",t:"Miles de devoluciones de Amazon al mes sin registro de su estado.",ev:"E-30"}],
 cifras:["15 marketplaces [E-30]","Un evento de TV vendió 100.000 USD [E-30]"],
 personas:["Isabella","Alejandro"],sistemas:["Shopify","QuickBooks","Sellerboard"],proc:["10.5"],src:"E-01 · E-06 · E-30",
 confirmar:"Aduana en EE.UU. y quién emite la orden a las fábricas."}
  ],

  // Cobertura por tramo del esquema común con que se leyeron las entrevistas.
  cobertura: [
    ["T01","Plan de demanda","1","solida","Formal solo en Casio; en Cubitt no hay forecast escrito."],
    ["T02","Producto Cubitt","2a","solida",""],
    ["T03","Compra Casio","2b · 3b","solida","Con qué criterio asigna Casio el cupo."],
    ["T04","Decisión y orden de compra","3a · 2b","solida","Quién integra de forma estable el comité de compra."],
    ["T05","Pago a proveedores","4a · 3b","parcial","Instrumento de pago, bancos y plazos con Casio y con las fábricas."],
    ["T06","Producción y embarque","4a · 4b","parcial","Lead time por categoría, naviera y contenedores por marca."],
    ["T07","Llegada a Zona Libre","5","solida",""],
    ["T08","Bodega","6 · 10b","solida","Indicadores reales de exactitud y tiempos: hoy solo hay metas."],
    ["T09","Asignación","7","parcial","No hay regla escrita para cuando no alcanza."],
    ["T10","Venta al mayor","8a","solida","Mayor internacional de Casio."],
    ["T11","Países propios","8b · 9b · 10b · US","solida","Kenex USA y Guatemala de punta a punta."],
    ["T12","Tiendas","8c · 9c · 10c","solida","Tiendas de Colombia y franquicias."],
    ["T13","Web","8d","solida","Volúmenes de Panamá y Colombia."],
    ["T14","Socios y franquicias","8b · 9b","parcial","Guatemala, Honduras y República Dominicana."],
    ["T15","Despacho y entrega","9a · 10d","solida","Promesa de entrega al cliente final."],
    ["T16","Cobro y crédito","11 · 9d","solida","Cobro en Colombia; liquidación de Cashea."],
    ["T17","Conciliación y cierre","12 · 13 · 14","solida","No existe consolidado del grupo."],
    ["T18","Postventa","PV","solida",""],
    ["T19","Sell-out","15 · PCI","solida","Cómo entra el dato de BI en la cantidad de la orden."],
    ["TX","Mercadeo","MK","solida",""]
  ],

  // Lo que la validación con el cliente tiene que confirmar.
  preguntas: [
    "¿Con qué instrumento, bancos y plazos se paga a Casio y a las fábricas de Cubitt?",
    "¿Qué regla se aplica cuando la mercancía no alcanza para todos los países y canales?",
    "¿Quién lleva el mayor internacional de Casio y cómo se reparte su cupo?",
    "¿Cómo operan de punta a punta Kenex USA y Guatemala?",
    "¿Cómo funcionan hoy las tiendas y el cobro en Colombia?",
    "¿Cómo liquida Cashea: en qué plazos y con qué comisión?"
  ],
  cifrasConfirmar: [
    "Porcentaje que asigna Casio sobre lo pedido: las cifras citadas van del 20 % al 80 % según el mes.",
    "Quién aprueba en última instancia la compra de Cubitt.",
    "Puntos de venta: en Panamá entre 8 y 11 según cómo se cuenten; en Venezuela entre 20 y 24.",
    "Proveedores activos de Cubitt: entre 6 y 20.",
    "Referencias activas: entre 3.000 y 4.800 operativas."
  ]
};
