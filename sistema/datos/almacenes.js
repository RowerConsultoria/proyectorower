/* ============================================================================
   EL SISTEMA — Almacenes propios                        · Fase 27 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   SOLO metadatos: el stock vive en `operacion.js` (STOCK_HUB y STOCK_FRENTE) y
   los nombres salen de `red.js` (CENTRAL y FRENTES) — aquí no se repite ni una
   cifra ni un rótulo que ya exista en otra parte, para que no puedan divergir.

   Lo que sí nace aquí, porque no existía en ningún sitio:
   · el DUEÑO de cada almacén (un rol, nunca una persona: regla del prototipo)
   · la capacidad estimada en unidades, que da la ocupación y su semáforo
   · los m² (la central usa los de CENTRAL, por eso va en null)
   · las coordenadas — las reutiliza el Big Map de la fase 30

   ⚠️ CIFRAS DE PROTOTIPO: capacidades y metros plausibles, no dato real.
   ============================================================================ */

const ALMACENES = [
  { id: 'ZLC', tipo: 'central', dueno: 'jefe de bodega · Zona Libre',
    capacidadU: 100000, m2: null, lat: 9.359, lon: -79.901 },

  { id: 'VE', tipo: 'frente', dueno: 'operaciones Venezuela',
    capacidadU: 20000, m2: 1800, lat: 10.491, lon: -66.902 },

  { id: 'CO', tipo: 'frente', dueno: 'operaciones Colombia',
    capacidadU: 12000, m2: 900, lat: 4.711, lon: -74.072 },

  { id: 'PA', tipo: 'frente', dueno: 'operaciones Panamá',
    capacidadU: 8500, m2: 700, lat: 8.983, lon: -79.519 },

  { id: 'US', tipo: 'frente', dueno: 'operaciones EE. UU.',
    capacidadU: 6000, m2: 500, lat: 25.774, lon: -80.194 },
];

/** La ficha del almacén de una ubicación de inventario (por id de ubicación). */
function fichaAlmacen(id) {
  return ALMACENES.find(a => a.id === id) || null;
}
