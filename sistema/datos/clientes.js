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
