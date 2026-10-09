/* Casos de uso de IA priorizados — Fase 2.
 * Fuente de documento.html?d=casos (la pinta ia-doc.js). El inventario saldrá
 * de los módulos de la órbita más los casos que viven fuera de ella; la
 * priorización, de un archivo de evaluación editable a mano. El ciclo de vida
 * cita el proceso 5.2, que vive en el manual de procesos. */
window.IA_DOC = {
  id: 'casos',
  titulo: 'Casos de uso de IA priorizados',
  lede: 'El inventario de lo que la IA hará en el grupo, ordenado por valor, viabilidad y riesgo: quién responde por cada caso y cómo se mide su beneficio.',
  estado: 'borrador',
  version: '0.1',
  corte: '09-oct-2026',
  secciones: [
    { id:'metodo', num:'1', titulo:'Cómo se priorizó', intencion:'Los criterios (valor, viabilidad y riesgo), sus pesos y de dónde sale cada puntaje.' },
    { id:'top', num:'2', titulo:'Los diez primeros', intencion:'Los casos con mayor prioridad, con su métrica, su meta y quién responde por cada uno.' },
    { id:'mapa', num:'3', titulo:'Valor frente a viabilidad', intencion:'Todos los casos en un mismo mapa, para ver qué conviene hacer primero y qué necesita preparar el terreno.' },
    { id:'inventario', num:'4', titulo:'Inventario completo', intencion:'Cada caso con lo que hace la IA, su nivel de autonomía, quién firma, sus procesos y frenos, los datos que necesita, su ola y su estado.' },
    { id:'ciclo', num:'5', titulo:'Ciclo de vida de un caso', intencion:'De la propuesta al retiro, sobre el proceso 5.2: priorización, piloto con criterio de salida, medición del beneficio y monitoreo.' },
    { id:'responsables', num:'6', titulo:'Quién responde por cada caso', intencion:'Dueño, operador y firmante de cada caso, por rol.' }
  ]
};
