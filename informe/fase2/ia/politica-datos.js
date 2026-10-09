/* Política de Adopción de IA — Fase 2.
 * Fuente única de documento.html?d=politica (la pinta ia-doc.js). Dos niveles:
 * la declaración (para firma de la Junta) y la norma operativa en artículos.
 * Es el documento que produce el proceso 5.1 (cuyo To-Be vive en el manual de
 * procesos y no se toca aquí). Usa los nombres de gobierno vigentes de
 * estructura-tobe-datos.js sin editarlo. Se edita a mano. */
window.IA_DOC = {
  id: 'politica',
  titulo: 'Política de adopción de IA',
  lede: 'Qué usos de la inteligencia artificial se aprueban en el grupo, con qué datos y con qué nivel de autonomía, y quién la gobierna.',
  estado: 'borrador',
  version: '0.1',
  corte: '09-oct-2026',
  capas: { que: 'Qué establece', como: 'Cómo se cumple' },
  secciones: [
    { id:'declaracion', num:'D', titulo:'Declaración', intencion:'El compromiso del grupo con la adopción de IA en una página, para firma de la Junta Directiva: propósito, principios y vínculo con el código de ética.' },
    { id:'gobierno', num:'1', titulo:'Gobierno de la IA', intencion:'Quién aprueba, quién implanta, quién opera y quién usa, con la regla de que quien aprueba la IA no es quien la implanta.' },
    { id:'datos', num:'2', titulo:'Clasificación de los datos', intencion:'Cuatro niveles de sensibilidad y qué se puede usar con IA en cada uno.' },
    { id:'herramientas', num:'3', titulo:'Herramientas y cuentas autorizadas', intencion:'Solo cuentas corporativas; qué herramientas están aprobadas y cómo se usa la API de IA desde la plataforma.' },
    { id:'usos', num:'4', titulo:'Usos aceptables y prohibidos', intencion:'Qué se puede hacer con IA, qué no, y qué necesita autorización previa.' },
    { id:'autonomia', num:'5', titulo:'Autonomía y firma humana', intencion:'Una sola escala de autonomía, las decisiones reservadas a personas y cómo un agente sube de nivel con evidencia.' },
    { id:'casos', num:'6', titulo:'Aprobación de casos de uso', intencion:'Cómo se propone, prioriza, prueba, mide y retira un caso de uso, sobre el ciclo del proceso 5.2.' },
    { id:'desarrollo', num:'7', titulo:'Desarrollo por las áreas', intencion:'Lo que un área construye con IA y se conecta a los sistemas del grupo pasa por Tecnología.' },
    { id:'licencias', num:'8', titulo:'Licencias', intencion:'Con qué criterio se asignan, cómo se mide su uso y cuándo se revisan.' },
    { id:'formacion', num:'9', titulo:'Formación obligatoria', intencion:'No hay adopción sin formación: qué formación se exige antes de usar IA y quién la imparte.' },
    { id:'datos-personales', num:'10', titulo:'Datos personales y cumplimiento', intencion:'Las obligaciones por país en datos personales, transferencias al exterior y avisos de incidentes.' },
    { id:'transparencia', num:'11', titulo:'Transparencia', intencion:'Qué se informa a clientes, candidatos y colaboradores cuando la IA interviene.' },
    { id:'propiedad', num:'12', titulo:'Propiedad intelectual y contenido generado', intencion:'De quién es lo que produce la IA y cómo se revisa antes de publicarlo.' },
    { id:'incidentes', num:'13', titulo:'Incidentes de IA', intencion:'Qué es un incidente de IA, cómo se reporta, quién lo atiende y cómo se aprende de él.' },
    { id:'proveedores', num:'14', titulo:'Proveedores de IA', intencion:'Requisitos contractuales: tratamiento de datos, retención y que no entrenen con los datos del grupo.' },
    { id:'revision', num:'15', titulo:'Revisión y vigencia', intencion:'Cada cuánto se revisa la política y quién la actualiza.' },
    { id:'incumplimiento', num:'16', titulo:'Incumplimiento', intencion:'Qué pasa cuando no se cumple.' },
    { id:'anexos', num:'A', titulo:'Anexos', intencion:'Matriz de responsabilidades, tabla de clasificación de datos, herramientas autorizadas, formulario de solicitud de caso de uso, equivalencias de las escalas de autonomía, marcos de referencia y glosario.' }
  ]
};
