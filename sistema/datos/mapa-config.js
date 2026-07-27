/* ============================================================================
   EL SISTEMA — Configuración del mapa global            · Fase 30 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   ÚNICO lugar donde vive el token de Mapbox. Es un token PÚBLICO (pk.*),
   publicable por diseño — no es un secreto como la clave de Anthropic—, pero
   conviene RESTRINGIRLO POR URL en el panel de Mapbox (localhost + el dominio
   donde se publique) para que nadie lo gaste desde otra página.

   ⚠️ El mapa es la única pieza del prototipo que depende de la red: los tiles
   se piden a Mapbox al vuelo. Sin red o sin token, la pantalla cae a su lista
   por país — declarado, no escondido (el patrón del «sin WebGL» de la torre).
   ============================================================================ */

const MAPA_CONFIG = {
  token: 'pk.eyJ1Ijoicm93ZXJjb25zdWx0b3JpYSIsImEiOiJjbXMyaXM3emQxY3VpMzNwdG5sZzdlZXEwIn0.10P7TJ0VMkEDcU5JJKbrzg',
  /* el estilo sigue al tema del sistema */
  estilo: { oscuro: 'mapbox://styles/mapbox/dark-v11', claro: 'mapbox://styles/mapbox/light-v11' },
};
