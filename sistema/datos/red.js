/* ============================================================================
   EL SISTEMA — La red: la central, los frentes y las bodegas
   Proyecto Rower · UCAB Consultores para Grupo Kenex · Fase 4 del plan

   ⚠️ DATOS DE PROTOTIPO. Los nombres de las entidades son los reales del grupo
   (constan en el informe de Fase 1). No aparece el nombre de ninguna persona:
   el prototipo trabaja con roles, nunca con personas.

   REGLA DE ARQUITECTURA — todos los frentes son CLIENTES MAYORES de la central
   y todos le pagan. Lo que cambia entre ellos no es el rango: es la conexión.
     · frentes propios con Odoo  → conexión en vivo, y la central les escribe
                                   la transferencia de mercancía a su almacén
     · frentes sin Odoo          → portal de reporte, cada uno con su Excel
   ============================================================================ */

const CENTRAL = {
  id: 'ZLC',
  nombre: 'Kenex Trading',
  sede: 'Zona Libre de Colón · Panamá',
  papel: 'central de mayoreo y distribución',
  m2: 5000,
};

const FRENTES = [
  /* ---- propios, con Odoo conectado ---- */
  { id:'VE', nombre:'Distribuidora Rower', pais:'Venezuela', tipo:'propio',
    via:'odoo', cadencia:'evento', corte:'hace 40 s', moneda:'USD',
    almacen:'Caracas', peso:1.00, credito:900000, saldo:412000, atraso:0 },

  { id:'CO', nombre:'Deltadir SAS', pais:'Colombia', tipo:'propio',
    via:'odoo', cadencia:'evento', corte:'hace 2 min', moneda:'COP',
    almacen:'Bogotá', peso:0.42, credito:400000, saldo:118000, atraso:0 },

  { id:'PA', nombre:'Casiolandia', pais:'Panamá', tipo:'propio',
    via:'odoo', cadencia:'evento', corte:'hace 1 min', moneda:'USD',
    almacen:'Panamá ciudad', peso:0.55, credito:500000, saldo:96000, atraso:0 },

  /* ---- propio sin Odoo: opera con su contabilidad y reporta por portal ---- */
  { id:'US', nombre:'Kenex USA', pais:'EE. UU.', tipo:'propio',
    via:'portal', cadencia:'cada 4 h', corte:'hace 3 h', moneda:'USD',
    almacen:'Miami', peso:0.18, credito:250000, saldo:31000, atraso:0 },

  /* ---- socio ---- */
  { id:'CR', nombre:'Importbel S.A.', pais:'Costa Rica', tipo:'socio',
    via:'portal', cadencia:'diaria', corte:'ayer', moneda:'USD',
    almacen:'San José', peso:0.34, credito:300000, saldo:187000, atraso:0,
    nota:'sociedad al 50 % · compra como cliente' },

  /* ---- operador ---- */
  { id:'GT', nombre:'Ix Comercio', pais:'Guatemala', tipo:'operador',
    via:'portal', cadencia:'semanal', corte:'hace 4 días', moneda:'USD',
    almacen:'Ciudad de Guatemala', peso:0.26, credito:220000, saldo:143000, atraso:12,
    nota:'opera bajo la marca con su propio sistema' },

  /* ---- clientes mayores directos y franquicia ---- */
  { id:'HN', nombre:'Honduras', pais:'Honduras', tipo:'cliente',
    via:'portal', cadencia:'quincenal', corte:'hace 9 días', moneda:'USD',
    almacen:'San Pedro Sula', peso:0.14, credito:120000, saldo:88000, atraso:6 },

  { id:'SV', nombre:'El Salvador', pais:'El Salvador', tipo:'cliente',
    via:'portal', cadencia:'quincenal', corte:'hace 11 días', moneda:'USD',
    almacen:'San Salvador', peso:0.11, credito:100000, saldo:24000, atraso:0 },

  { id:'EC', nombre:'Ecuador', pais:'Ecuador', tipo:'cliente',
    via:'portal', cadencia:'mensual', corte:'hace 21 días', moneda:'USD',
    almacen:'Guayaquil', peso:0.16, credito:150000, saldo:61000, atraso:0 },

  { id:'DO', nombre:'República Dominicana', pais:'Rep. Dominicana', tipo:'franquicia',
    via:'portal', cadencia:'quincenal', corte:'hace 7 días', moneda:'USD',
    almacen:'Santo Domingo', peso:0.19, credito:140000, saldo:52000, atraso:0 },
];

/* Cómo llama cada frente sin Odoo a sus columnas cuando manda su archivo.
   Es el problema real: el mismo dato con seis nombres distintos. El portal
   aprende el formato de cada frente y lo normaliza contra el canónico. */
const FORMATOS_PORTAL = {
  CR: { archivo:'VENTAS_MES.xlsx',        col_sku:'CODIGO',      col_cant:'CANT',      col_fecha:'FECHA' },
  GT: { archivo:'reporte_ix.xlsx',        col_sku:'Referencia',  col_cant:'Unidades',  col_fecha:'Periodo' },
  HN: { archivo:'sellout hn.xls',         col_sku:'Modelo',      col_cant:'Salidas',   col_fecha:'Mes' },
  SV: { archivo:'INVENTARIO Y VENTAS.xlsx', col_sku:'Descripcion', col_cant:'Vendido', col_fecha:'Corte' },
  EC: { archivo:'ventas_ec.csv',          col_sku:'sku',         col_cant:'qty',       col_fecha:'date' },
  DO: { archivo:'Reporte Mensual.xlsx',   col_sku:'Producto',    col_cant:'Cantidad',  col_fecha:'Mes' },
  US: { archivo:'shopify_export.csv',     col_sku:'Lineitem sku', col_cant:'Lineitem quantity', col_fecha:'Created at' },
};

const TIPOS_FRENTE = {
  propio:     { rotulo:'operación propia', color:'var(--n2)' },
  socio:      { rotulo:'socio',            color:'var(--n1)' },
  operador:   { rotulo:'operador',         color:'var(--n1)' },
  franquicia: { rotulo:'franquicia',       color:'var(--n1)' },
  cliente:    { rotulo:'cliente mayor',    color:'var(--tinta-media)' },
};
