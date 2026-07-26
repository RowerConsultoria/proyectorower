/* ============================================================================
   EL SISTEMA — Monedas y tasas                          · Fase 24 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   La arquitectura fija una regla que hasta ahora no se cumplía en ninguna
   pantalla: **no existe cifra sin moneda y sin tasa fechada**. Todo se venía
   mostrando en USD implícito, que es cómodo hasta el día en que alguien suma
   dos columnas que no eran la misma moneda.

   Tres cosas viven aquí, y solo aquí:

   1. LA MONEDA DE CADA MONTO. El central factura a los frentes en USD —son
      clientes mayores de la central—, pero cada frente vive en su moneda: es
      la que usa su Odoo, la que aparece en su Excel y la que entiende su
      gerente. Las dos cosas son ciertas a la vez y hay que enseñarlas juntas.

   2. LA TASA, CON SU FECHA Y SU FUENTE. Una tasa sin fecha no es un dato: es
      una opinión. Aquí cada una dice de cuándo es y de dónde salió.

   3. CUÁNDO DEJA DE VALER. La antigüedad máxima la fija finanzas, como el
      techo de compra. Pasada esa edad la cifra no se oculta ni se bloquea —se
      marca—, porque en una operación real se sigue trabajando con la tasa que
      hay mientras se consigue la nueva.

   ⚠️ DATOS DE PROTOTIPO. Las tasas son verosímiles, no oficiales. La fecha de
   corte es la misma del resto de la demo.
   ============================================================================ */

/* Cómo se escribe cada moneda. `dec` son los decimales con que se muestra:
   en las monedas de valor bajo, los céntimos son ruido en una pantalla de
   dirección. */
const MONEDAS = {
  USD: { nombre: 'dólar',              simbolo: '$',    dec: 0 },
  COP: { nombre: 'peso colombiano',    simbolo: 'COP ', dec: 0 },
  GTQ: { nombre: 'quetzal',            simbolo: 'Q',    dec: 0 },
  CRC: { nombre: 'colón costarricense', simbolo: '₡',   dec: 0 },
  HNL: { nombre: 'lempira',            simbolo: 'L',    dec: 0 },
  DOP: { nombre: 'peso dominicano',    simbolo: 'RD$',  dec: 0 },
};

/* Unidades de moneda local por 1 USD. `desde` es la fecha de la tasa, no la
   de la carga: es la que hay que mirar para saber si sirve.

   Panamá, Ecuador y El Salvador no aparecen porque su moneda de curso es el
   dólar — no hay conversión que hacer, y fingir una tasa sería inventarse un
   problema para poder resolverlo en la demo. */
const TASAS = {
  USD: { tasa: 1,      desde: '2026-08-18', fuente: 'moneda de referencia' },
  COP: { tasa: 4185,   desde: '2026-08-17', fuente: 'Banco de la República' },
  GTQ: { tasa: 7.72,   desde: '2026-08-15', fuente: 'Banco de Guatemala' },
  CRC: { tasa: 512.40, desde: '2026-08-18', fuente: 'Banco Central de Costa Rica' },
  HNL: { tasa: 24.85,  desde: '2026-08-11', fuente: 'Banco Central de Honduras' },
  DOP: { tasa: 60.15,  desde: '2026-08-16', fuente: 'Banco Central de la República Dominicana' },
};

/* Qué moneda usa cada frente en su propia operación. El crédito que la
   central le concede sigue estando en USD —así se factura—, pero su gerente
   lee su negocio en esto. */
const MONEDA_FRENTE = {
  VE: 'USD',   // mayoreo facturado en dólares
  CO: 'COP',
  PA: 'USD',   // el balboa está a la par y el dólar es de curso legal
  US: 'USD',
  CR: 'CRC',
  GT: 'GTQ',
  HN: 'HNL',
  SV: 'USD',   // dolarizado desde 2001
  EC: 'USD',   // dolarizado desde 2000
  DO: 'DOP',
};
