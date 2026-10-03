/* Madurez documental de Kenex — la sección #/madurez del manual de Fase 2.
   Sostiene la premisa central de la validación (lámina 2 de la presentación):
   el punto de partida en madurez documental es bajo.
   Nació como artefacto de claude.ai el 02-oct-2026 y desde ese día vive aquí y
   se edita a mano. Fuente única: editar la sección = editar solo este archivo.
   Cliente-facing: citas de menos de 15 palabras y sin nombres; la formalización
   como habilitación, nunca como corrección del pasado. */
window.MADUREZ = {
  premisa: 'La documentación de procesos es escasa o nula, y la que existe usa esquemas y formatos distintos. No hay una política para producirla ni una gobernanza declarada. Por eso hay tantos criterios para organizar los procesos como responsables de área, sin una base de conocimiento común y consolidada, ni una instancia central que responda por su evolución.',

  // Escala de cinco niveles; la tabla solo usa los tres primeros.
  escala: [
    { n: 1, r: 'Inicial', d: 'informal o sin documentar' },
    { n: 2, r: 'En desarrollo', d: 'documentos aislados, sin estándar' },
    { n: 3, r: 'Estandarizado', d: 'un solo estándar, con dueño' },
    { n: 4, r: 'Gestionado', d: '' },
    { n: 5, r: 'Optimizado', d: '' }
  ],

  // En el texto, «…» entre comillas angulares es una cita textual de entrevista.
  criterios: [
    { c: 'Responsable y política', ref: 'ARMA · Accountability · Rosemann y de Bruin · gobierno',
      exige: 'Un responsable con autoridad sobre la información y políticas que guían cómo se documenta.',
      hallado: 'No hay política para producir documentación ni instancia que la gobierne. Ninguna autorización relevante del grupo tiene política de montos, márgenes o excepciones escrita. Sobre el uso de IA, «no hay nada escrito, ni documentado… solo por conversación».',
      nivel: 1 },
    { c: 'Procesos documentados', ref: 'OMG BPMM · nivel 3 · Hammer PEMM · diseño',
      exige: 'Procesos de punta a punta definidos y documentados para toda la organización, no por grupo de trabajo.',
      hallado: 'El grupo funciona por el criterio y la memoria de personas experimentadas, no por procedimientos. En áreas con más de 20 años: «Nunca he visto un manual de procedimiento». En compras: «no hay nada documentado».',
      nivel: 1 },
    { c: 'Formato común e identificación', ref: 'ISO 9001:2015 · 7.5.2',
      exige: 'Cada documento con título, fecha, autor y versión, en un formato común, revisado y aprobado.',
      hallado: 'Lo que existe usa esquemas distintos: manuales formales y versionados en la contabilidad de un país, procedimientos informales en otro. Un manual de almacén firmado tiene una sola de sus seis hojas desarrollada; las demás solo nombran responsables.',
      nivel: 2 },
    { c: 'Disponibilidad y uso', ref: 'ARMA · Availability · ISO 9001 · 7.5.3',
      exige: 'La versión vigente está disponible donde se usa y cualquiera sabe dónde encontrarla.',
      hallado: 'La documentación está dispersa entre Lark, carpetas y archivos personales. Un área construyó un wiki completo de manuales y flujogramas, pero «a nivel de empresa nadie lo usa».',
      nivel: 2 },
    { c: 'Actualización y control de cambios', ref: 'ISO 9001 · 7.5.3 · ARMA · Integrity',
      exige: 'Los cambios se registran, se controla la versión y se retira la obsoleta.',
      hallado: 'En tiendas, «se modifica algo, pero no se documenta». La organización ya construyó una vez organigrama, descripciones de cargo y evaluaciones, y ese trabajo quedó congelado sin retomarse.',
      nivel: 1 },
    { c: 'Conocimiento crítico fuera de las personas', ref: 'Hammer PEMM · ejecutores y dueño',
      exige: 'El conocimiento del proceso vive en la organización y sobrevive a la salida de quien lo ejecuta.',
      hallado: 'Las seis dependencias individuales de severidad alta coinciden con los procesos menos documentados: compras, servicio técnico y criterios de autorización comercial. Donde hay norma, falta el sentido: «existía el cómo, pero no el por qué».',
      nivel: 1 },
    { c: 'Un criterio común para organizar los procesos', ref: 'Rosemann y de Bruin · métodos · OMG BPMM · estandarizado',
      exige: 'Un mismo método de modelado y una misma arquitectura de procesos en todas las áreas.',
      hallado: 'Hay tantos criterios como responsables de área. El mapa de procesos heredado registraba a los dueños en texto libre, y la mitad de los roles de los flujos no existía en el patrón de cargos.',
      nivel: 1 },
    { c: 'Medición del proceso', ref: 'Hammer PEMM · métricas · OMG BPMM · nivel 4',
      exige: 'Indicadores definidos por proceso, con fuente oficial y uso en la gestión.',
      hallado: 'No hay indicadores de proceso formalizados. Donde se mide, es por iniciativa personal; en otras áreas los indicadores están propuestos en un manual y no se calculan.',
      nivel: 1 }
  ],

  // Lo que ya funciona: no lleva nivel, es la base para escalar.
  base: {
    c: 'Lo que ya funciona', ref: 'Base para escalar',
    exige: 'Prácticas propias que pueden volverse el estándar del grupo.',
    hallado: 'Mercadeo y la oficina de proyectos usan Lark con formularios y flujos; la célula de datos documenta cada proyecto (manual, diccionario, medidas); hay manuales recientes de contabilidad, postventa y talento en Panamá, y descripciones de cargo formales en Colombia.'
  },

  lectura: 'Siete de los ocho criterios están en el nivel inicial o en desarrollo: Kenex tiene documentos, pero no un sistema documental. El manual de procesos de la Fase 2 y su base de conocimiento son el primer paso hacia el nivel 3: un estándar único, con dueño, versión y control de cambios. Formalizar no corrige el pasado; habilita la siguiente etapa del grupo.',

  evidencia: 'Informe de diagnóstico de Fase 1 (secciones 4.5, 5, 6, 8.1–8.5) y entrevistas de Fase 2 (citas textuales de menos de 15 palabras, sin nombres). Niveles estimados por el equipo consultor; se ajustan con la validación.',

  fuentes: [
    { t: 'Rosemann y de Bruin (2005), modelo de madurez de BPM, ECIS', u: 'https://eprints.qut.edu.au/25194/' },
    { t: 'Van Looy (2013), BPTrends, sobre OMG BPMM (2008) y otros modelos', u: 'https://bptrends.info/wp-content/publicationfiles/07-02-2013-ART-BPMM%20Best%20Fits%20your%20Org-Van%20Looy.pdf' },
    { t: 'Power (2007), BPTrends, sobre el PEMM de Hammer (HBR, 2007)', u: 'https://bptrends.info/wp-content/publicationfiles/07-07-ART-HammersPEMM-Power-final1.pdf' },
    { t: 'ARMA International (2013), Information Governance Maturity Model', u: 'https://old.lva.virginia.gov/agencies/records/psrc/documents/Principles.pdf' },
    { t: 'ISO 9001:2015, cláusula 7.5, información documentada', u: 'https://www.isms.online/iso-9001/clause-7-5-documented-information/' }
  ]
};
