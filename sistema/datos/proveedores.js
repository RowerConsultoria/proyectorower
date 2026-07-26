/* ============================================================================
   EL SISTEMA — Desempeño de fábricas y proveedores     · añadido a la fase 10
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   El MOQ y el lead time de cada fábrica estaban dentro de la mesa de compra,
   que es donde se usan pero no donde deben vivir. Aquí tienen su sitio, junto
   a lo único que permite negociarlos: el historial de cómo se ha comportado
   cada fábrica.

   ⚠️ DATOS DE PROTOTIPO. Los nombres de fábrica son descriptivos: el corpus
   del diagnóstico no recoge las razones sociales reales de los proveedores
   chinos de la marca propia.
   ============================================================================ */

const DESEMPENO = {
  'FAB-WEAR-01': {
    desde: 2019, ordenes12m: 7, cumplePlazo: 0.86, diasDesvio: 6,
    incidencias: 1, notaCalidad: 4.4,
    nota: 'La fábrica de referencia de la línea. Cumple, y cuando se retrasa avisa.',
  },
  'FAB-WEAR-02': {
    desde: 2022, ordenes12m: 4, cumplePlazo: 0.62, diasDesvio: 19,
    incidencias: 3, notaCalidad: 3.6,
    nota: 'Dos de las últimas cuatro órdenes llegaron con más de dos semanas de retraso.',
  },
  'FAB-AUDIO-01': {
    desde: 2020, ordenes12m: 9, cumplePlazo: 0.91, diasDesvio: 4,
    incidencias: 0, notaCalidad: 4.6,
    nota: 'El proveedor más fiable del grupo en plazo.',
  },
  'FAB-AUDIO-02': {
    desde: 2024, ordenes12m: 2, cumplePlazo: 0.50, diasDesvio: 24,
    incidencias: 1, notaCalidad: 3.9,
    nota: 'Relación nueva y poco historial. Su pedido mínimo pesa mucho para el volumen que mueve.',
  },
  'FAB-HOME-01': {
    desde: 2023, ordenes12m: 3, cumplePlazo: 0.83, diasDesvio: 8,
    incidencias: 0, notaCalidad: 4.2, nota: '',
  },
  'FAB-DRINK-01': {
    desde: 2021, ordenes12m: 8, cumplePlazo: 0.88, diasDesvio: 5,
    incidencias: 1, notaCalidad: 4.3,
    nota: 'Comparte molde y tapa entre formatos, lo que abarata las variantes nuevas.',
  },
  'FAB-BAG-01': {
    desde: 2022, ordenes12m: 5, cumplePlazo: 0.78, diasDesvio: 11,
    incidencias: 2, notaCalidad: 4.0, nota: '',
  },
  /* El proveedor representado no es una fábrica: no tiene pedido mínimo sino
     un ciclo mensual rígido, y lo que condiciona la compra no es su plazo sino
     cuánto de lo pedido termina asignando. */
  'PRV-CASIO': {
    desde: 1986, ordenes12m: 12, cumplePlazo: 0.94, diasDesvio: 3,
    incidencias: 0, notaCalidad: 4.8,
    asignacion12m: [0.31, 0.28, 0.24, 0.26, 0.22, 0.25, 0.21, 0.23, 0.20, 0.24, 0.22, 0.25],
    nota: 'Relación de cuatro décadas. El plazo lo cumple; lo que varía es qué proporción de lo pedido asigna.',
  },
};
