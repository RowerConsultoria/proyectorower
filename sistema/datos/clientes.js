/* ============================================================================
   EL SISTEMA — Clientes y regiones                      · Fase 28 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   SOLO metadatos, como almacenes.js: la identidad comercial de cada frente
   (nombre, tipo, crédito, cadencia de reporte) vive en `red.js`; su venta y su
   existencia, en `operacion.js`. Aquí nace únicamente lo que no existía:

   · la REGIÓN de cada frente no propio — para agrupar la vista global
   · sus coordenadas — las reutiliza el Big Map de la fase 30

   La fase 29 (módulo de clientes) enriquece esta ficha; no la duplica.
   ============================================================================ */

const REGIONES = {
  centroamerica: 'Centroamérica',
  andina: 'Región Andina',
  caribe: 'Caribe',
};

/* los frentes NO propios: socio, operador, clientes y franquicia */
const CLIENTES = [
  { id: 'CR', region: 'centroamerica', lat: 9.928, lon: -84.091 },
  { id: 'GT', region: 'centroamerica', lat: 14.634, lon: -90.507 },
  { id: 'HN', region: 'centroamerica', lat: 15.504, lon: -88.025 },
  { id: 'SV', region: 'centroamerica', lat: 13.699, lon: -89.191 },
  { id: 'EC', region: 'andina', lat: -2.170, lon: -79.922 },
  { id: 'DO', region: 'caribe', lat: 18.486, lon: -69.931 },
];

/** La ficha de región/coordenadas de un frente no propio. */
function fichaCliente(id) {
  return CLIENTES.find(c => c.id === id) || null;
}

/* Promociones ACTIVAS: datos declarados —una promoción es una decisión
   comercial, no se deriva—, pero atadas a señales reales del inventario: cada
   una apunta a una referencia que de verdad está parada o sobrada en ese
   frente. Los motivos van SIN cifras a propósito: la cifra vigente la calcula
   la pantalla desde operacion.js, para que no puedan divergir. */
const PROMOS = [
  { id: 'PR-101', sku: 'KX-REL-1035', frentes: ['HN'], tipo: 'descuento', pct: 15,
    desde: '01-ago', hasta: '31-ago', motivo: 'rotación baja sostenida en el frente' },
  { id: 'PR-102', sku: 'CTHB24-1', frentes: ['EC'], tipo: 'descuento', pct: 10,
    desde: '05-ago', hasta: '05-sep', motivo: 'existencia sin movimiento' },
  { id: 'PR-103', sku: 'KX-CAL-1021', frentes: ['GT'], tipo: 'combo', pct: 12,
    desde: '01-ago', hasta: '15-sep', motivo: 'sobre-stock del frente' },
  { id: 'PR-104', sku: 'CT-MUG1-N', frentes: ['VE'], tipo: 'descuento', pct: 20,
    desde: '10-ago', hasta: '31-ago', motivo: 'sobre-stock del frente' },
];

/** Las promociones activas de un frente. */
function promosDe(id) {
  return PROMOS.filter(p => p.frentes.includes(id));
}
