/* Documento técnico de arquitectura de IA — Fase 2.
 * Fuente única de la página documento.html?d=tecnico (la pinta ia-doc.js).
 * Detalla la propuesta de la órbita (arquitectura-ia.html) y guía su
 * construcción sobre el triángulo Supabase · Vercel · GitHub. Cada sección en
 * dos capas: que (explicativa) y como (técnica). Se edita a mano.
 * Reglas: es cliente-facing (roles, no personas; sin pagos entre países ni
 * salarios); «frenos», no «trombos»; Power BI y Fabric se retiran; la IA se
 * usa desde la plataforma también para Venezuela. */
window.IA_DOC = {
  id: 'tecnico',
  titulo: 'Documento técnico de arquitectura',
  lede: 'Cómo se construye la plataforma de la órbita: qué hace cada pieza, por qué está ahí y el paso a paso para levantarla, ola por ola, sobre el triángulo Supabase · Vercel · GitHub.',
  estado: 'borrador',
  version: '0.1',
  corte: '09-oct-2026',
  secciones: [
    { id:'leer', num:'0', titulo:'Cómo leer este documento', intencion:'Para quién es, cómo se usan las dos capas de cada sección y un resumen de la arquitectura en una página.' },
    { id:'principios', num:'1', titulo:'Principios e invariantes', intencion:'Las reglas que no cambian en ninguna ola: el ERP registra y la plataforma innova; ningún módulo nuevo en Odoo; la IA propone, una persona firma y todo deja rastro; el dato certificado antes que el agente.' },
    { id:'propuesta', num:'2', titulo:'La propuesta en una imagen', intencion:'Las dos capas (registro y Plataforma Kenex con el espejo en su núcleo), los siete sectores, las cuatro olas y las herramientas conectadas por fuera. Enlaza a la órbita.' },
    { id:'triangulo', num:'3', titulo:'El triángulo y sus servicios de apoyo', intencion:'Qué hace Supabase, Vercel y GitHub; qué aportan Anthropic, OpenAI, Resend y Mapbox; entornos de desarrollo, pruebas y producción; cuentas a nombre de Kenex; costos. Incluye la alternativa de Cloudflare para el front, que Kenex puede decidir.' },
    { id:'registro', num:'4', titulo:'El registro: Odoo de los tres países y EBS', intencion:'Cómo se lee cada Odoo por su API externa según su versión, con usuarios de integración y solo objetos estándar; cómo se escribe en borrador, por etapas; los patrones posibles para EBS.' },
    { id:'nucleo', num:'5', titulo:'El núcleo: el espejo y el dato certificado', intencion:'Esquemas del espejo en Supabase, sincronización incremental, certificación del dato con su cola de excepciones, catálogo canónico con alias y diccionario de datos.' },
    { id:'seguridad', num:'6', titulo:'Seguridad y acceso', intencion:'Autenticación, MFA para quien firma, permisos por país y rol en la base, bóveda de secretos, auditoría y datos personales.' },
    { id:'ia', num:'7', titulo:'La capa de IA', intencion:'La sala de agentes, la escala de autonomía, el patrón de un agente en una Edge Function con la API de Anthropic, el registro de cada acción, el freno general, la evaluación antes de cada cambio y el uso de OpenAI para voz e imágenes.' },
    { id:'pronostico', num:'8', titulo:'El pronóstico', intencion:'Cómo se arman las series, cómo corren los métodos estadísticos por lotes y cómo se mide el error antes de usarlo. La IA explica el número; no lo pone.' },
    { id:'front', num:'9', titulo:'Pantallas y portales', intencion:'El front en Vercel (o Cloudflare), los portales para clientes, socios y proveedores, y la regla de ninguna llave en el navegador.' },
    { id:'github', num:'10', titulo:'Repositorio, pruebas y despliegue', intencion:'Ramas, revisión, pruebas de permisos y de contrato con cada Odoo, migraciones y paso a producción con aprobación. Se apoya en el proceso 14.3.' },
    { id:'conectores', num:'11', titulo:'Herramientas conectadas', intencion:'Lark como canal de avisos y de firma; Mercately y WhatsApp, Cashea, bancos, couriers, Shopify y fábricas; cuándo se usa un webhook y cuándo se consulta.' },
    { id:'operacion', num:'12', titulo:'Operación y continuidad', intencion:'Monitoreo, respaldos y recuperación, incidentes, costos y topes de gasto.' },
    { id:'construccion', num:'13', titulo:'Paso a paso de la construcción', intencion:'De la Ola 0 (preparar la casa) a la Ola 4: cada paso con su entregable, cómo se hace, de qué depende, cuándo se acepta y quién lo hace, enlazado a sus módulos, procesos y frenos.' },
    { id:'equipo', num:'14', titulo:'Equipo y forma de trabajo', intencion:'Quién construye y opera la plataforma, cómo se organiza el desarrollo y cómo se usa Claude Code en el equipo.' },
    { id:'decisiones', num:'15', titulo:'Decisiones abiertas', intencion:'Las decisiones que quedan por tomar, con una recomendación y a quién le toca cada una.' },
    { id:'anexos', num:'16', titulo:'Anexos', intencion:'Modelos de Odoo por módulo, equivalencias con la arquitectura de la Fase 1, costos, glosario y el aplicativo del proyecto como prueba del patrón.' }
  ]
};
