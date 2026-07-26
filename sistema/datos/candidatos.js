/* ============================================================================
   EL SISTEMA — Candidatos de producto                 · Fase 10 del plan
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   De aquí sale lo que después se compra. Un producto candidato recorre un
   embudo —idea → muestra pedida → en prueba → decisión— y solo cuando GRADÚA
   entra al catálogo canónico y puede aparecer en una mesa de compra.

   ⚠️ DATOS DE PROTOTIPO. Los candidatos son verosímiles para la marca, no
   productos reales en desarrollo.

   Cada candidato se compara contra un EQUIVALENTE que ya está en catálogo:
   es lo que permite proyectar su demanda sin inventarla, y lo que convierte
   la decisión del comité en una conversación con evidencia delante.
   ============================================================================ */

const ETAPAS = [
  { id: 'idea',    rotulo: 'idea',          orden: 1 },
  { id: 'muestra', rotulo: 'muestra pedida', orden: 2 },
  { id: 'prueba',  rotulo: 'en prueba',     orden: 3 },
  { id: 'decision',rotulo: 'decisión',      orden: 4 },
  { id: 'graduado',rotulo: 'graduado',      orden: 5 },
  { id: 'descartado', rotulo: 'descartado', orden: 6 },
];

const CANDIDATOS = [
  {
    id: 'CAND-001', nombre: 'AURA Pro 3', familia: 'Smartwatches', fabrica: 'FAB-WEAR-01',
    etapa: 'decision', diasEnEtapa: 12, desde: '2026-04-02',
    costoObjetivo: 62, pvpPrevisto: 209, equivalente: 'CT-AURAP2-1',
    porQue: 'Sucesor directo del modelo con mejor rotación de la línea. Pantalla más brillante y autonomía declarada de 12 días.',
    muestras: { pedidas: 12, recibidas: 12, fecha: '2026-05-20' },
    pruebas: [
      { que: 'autonomía real de batería', resultado: 'ok', nota: '11,4 días contra 12 declarados' },
      { que: 'resistencia al agua', resultado: 'ok', nota: 'cumple la norma declarada' },
      { que: 'sincronización con la app', resultado: 'ok', nota: 'sin caídas en 30 días' },
      { que: 'acabado y empaque', resultado: 'ok', nota: 'aprobado por marca' },
    ],
    riesgos: [],
  },
  {
    id: 'CAND-002', nombre: 'Power Buds Air', familia: 'Audio', fabrica: 'FAB-AUDIO-01',
    etapa: 'decision', diasEnEtapa: 26, desde: '2026-03-11',
    costoObjetivo: 17, pvpPrevisto: 54.95, equivalente: 'CT-PWEP1',
    porQue: 'Versión más ligera del auricular de mayor volumen, con estuche de carga reducido.',
    muestras: { pedidas: 20, recibidas: 20, fecha: '2026-04-28' },
    pruebas: [
      { que: 'calidad de audio', resultado: 'ok', nota: 'comparable al modelo actual' },
      { que: 'autonomía del estuche', resultado: 'duda', nota: '18 h contra 24 declaradas por la fábrica' },
      { que: 'emparejamiento', resultado: 'ok', nota: 'sin incidencias' },
    ],
    riesgos: ['La autonomía declarada por la fábrica no se sostuvo en prueba: hay que corregir el empaque o renegociar la ficha.'],
  },
  {
    id: 'CAND-003', nombre: 'TERRA Trail', familia: 'Smartwatches', fabrica: 'FAB-WEAR-01',
    etapa: 'prueba', diasEnEtapa: 34, desde: '2026-05-06',
    costoObjetivo: 78, pvpPrevisto: 259, equivalente: 'CT-TERRA1',
    porQue: 'Variante de exterior del modelo tope de línea: correa reforzada, GPS y altímetro.',
    muestras: { pedidas: 8, recibidas: 8, fecha: '2026-06-14' },
    pruebas: [
      { que: 'precisión del GPS', resultado: 'ok', nota: 'dentro del margen esperado' },
      { que: 'resistencia de la correa', resultado: 'falla', nota: 'dos de ocho muestras cedieron en el anclaje' },
      { que: 'autonomía con GPS activo', resultado: 'pendiente', nota: 'en curso' },
    ],
    riesgos: ['Falla de anclaje de correa en el 25 % de las muestras. Sin corregir, no debe graduar.'],
  },
  {
    id: 'CAND-004', nombre: 'Cubitt Kids Watch 2', familia: 'Jr. + Teens', fabrica: 'FAB-WEAR-02',
    etapa: 'prueba', diasEnEtapa: 19, desde: '2026-05-22',
    costoObjetivo: 31, pvpPrevisto: 99, equivalente: 'CTJR-1',
    porQue: 'Segunda generación del reloj infantil, con llamada y localización.',
    muestras: { pedidas: 15, recibidas: 15, fecha: '2026-06-30' },
    pruebas: [
      { que: 'llamada y localización', resultado: 'ok', nota: 'funciona en las tres operadoras probadas' },
      { que: 'resistencia a caídas', resultado: 'ok', nota: 'sin daños en 20 caídas' },
      { que: 'control parental', resultado: 'pendiente', nota: 'esperando versión final de la app' },
    ],
    riesgos: [],
  },
  {
    id: 'CAND-005', nombre: 'Power Ring', familia: 'Smartwatches', fabrica: 'FAB-WEAR-01',
    etapa: 'prueba', diasEnEtapa: 61, desde: '2026-03-30',
    costoObjetivo: 44, pvpPrevisto: 149, equivalente: 'CT-VIVA2-1',
    porQue: 'Categoría nueva para la marca: anillo de actividad y sueño. Sin equivalente directo en el catálogo.',
    muestras: { pedidas: 25, recibidas: 25, fecha: '2026-05-02' },
    pruebas: [
      { que: 'precisión del sensor de sueño', resultado: 'duda', nota: 'desviación del 14 % contra referencia' },
      { que: 'tallaje', resultado: 'falla', nota: 'hacen falta 8 tallas; la fábrica ofrece 5' },
      { que: 'autonomía', resultado: 'ok', nota: '6 días' },
    ],
    riesgos: [
      'Categoría sin histórico: la proyección se apoya en un equivalente que no es comparable.',
      'El tallaje obliga a un surtido que multiplica el inventario por talla.',
    ],
  },
  {
    id: 'CAND-006', nombre: 'Hydro Bottle 32 oz', familia: 'Termos', fabrica: 'FAB-DRINK-01',
    etapa: 'decision', diasEnEtapa: 8, desde: '2026-05-15',
    costoObjetivo: 11, pvpPrevisto: 39.95, equivalente: 'CTHB24-1',
    porQue: 'Formato grande del termo de mayor rotación. Mismo molde, tapa compartida.',
    muestras: { pedidas: 10, recibidas: 10, fecha: '2026-06-25' },
    pruebas: [
      { que: 'retención de temperatura', resultado: 'ok', nota: '11 h en frío' },
      { que: 'estanqueidad', resultado: 'ok', nota: 'sin fugas' },
      { que: 'compatibilidad de tapa', resultado: 'ok', nota: 'comparte tapa con el formato actual' },
    ],
    riesgos: [],
  },
  {
    id: 'CAND-007', nombre: 'Smart Scale Pro', familia: 'Básculas', fabrica: 'FAB-HOME-01',
    etapa: 'muestra', diasEnEtapa: 22, desde: '2026-06-18',
    costoObjetivo: 19, pvpPrevisto: 74, equivalente: 'CT-SCALE-D-01',
    porQue: 'Báscula con medición segmentada y perfil por usuario.',
    muestras: { pedidas: 6, recibidas: 0, fecha: null },
    pruebas: [],
    riesgos: ['Las muestras llevan 22 días pedidas y no han llegado.'],
  },
  {
    id: 'CAND-008', nombre: 'Crossbody Bag', familia: 'Accesorios', fabrica: 'FAB-BAG-01',
    etapa: 'idea', diasEnEtapa: 9, desde: '2026-07-09',
    costoObjetivo: 14, pvpPrevisto: 49, equivalente: 'CTBPK-1',
    porQue: 'Completar la línea de marroquinería con un formato de diario.',
    muestras: { pedidas: 0, recibidas: 0, fecha: null },
    pruebas: [],
    riesgos: [],
  },
  {
    id: 'CAND-009', nombre: 'Power Headphones Studio', familia: 'Audio', fabrica: 'FAB-AUDIO-01',
    etapa: 'idea', diasEnEtapa: 4, desde: '2026-07-14',
    costoObjetivo: 41, pvpPrevisto: 139, equivalente: 'CT-PWANC1',
    porQue: 'Gama alta de audífonos, por encima del modelo actual.',
    muestras: { pedidas: 0, recibidas: 0, fecha: null },
    pruebas: [],
    riesgos: [],
  },
  {
    id: 'CAND-010', nombre: 'Travel Tumbler 20 oz', familia: 'Termos', fabrica: 'FAB-DRINK-01',
    etapa: 'graduado', diasEnEtapa: 3, desde: '2026-02-10', graduadoEl: '2026-07-15',
    costoObjetivo: 9, pvpPrevisto: 32.95, equivalente: 'CT-MUG1-N',
    porQue: 'Formato intermedio entre el vaso y el termo grande.',
    muestras: { pedidas: 10, recibidas: 10, fecha: '2026-04-02' },
    pruebas: [
      { que: 'retención de temperatura', resultado: 'ok', nota: '8 h' },
      { que: 'estanqueidad', resultado: 'ok', nota: 'sin fugas' },
    ],
    riesgos: [],
  },
  {
    id: 'CAND-011', nombre: 'Sport Band Pro', familia: 'Accesorios', fabrica: 'FAB-BAG-01',
    etapa: 'descartado', diasEnEtapa: 41, desde: '2026-01-20', motivoDescarte:
      'El costo objetivo no bajó de 9 USD y el margen quedaba por debajo del mínimo de la línea.',
    costoObjetivo: 9, pvpPrevisto: 19.95, equivalente: 'CT-CAPRUN-1',
    porQue: 'Correa deportiva de recambio.',
    muestras: { pedidas: 20, recibidas: 20, fecha: '2026-03-05' },
    pruebas: [{ que: 'resistencia', resultado: 'ok', nota: 'cumple' }],
    riesgos: [],
  },
];
