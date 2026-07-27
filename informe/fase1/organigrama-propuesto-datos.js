/* ============================================================================
   ESTRUCTURA ORGANIZATIVA PROPUESTA — FUENTE ÚNICA (informe, sección 4.8)
   Proyecto Rower · UCAB Consultores para Grupo Kenex

   Este archivo es el ORIGEN ÚNICO de la propuesta. Lo consumen:
     · organigrama-propuesto-kenex.html  → página completa (se abre desde 4.8)
     · organigrama-kenex.html            → capa «🧭 Propuesto» del organigrama

   ⚠ Editar la propuesta = editar SOLO este archivo. Las dos vistas se
     actualizan solas; no duplicar nodos, aristas ni notas en los HTML.

   Sistema de coordenadas: lienzo fijo de 1680 × 1250 px. Cada anfitrión
   decide cómo escalarlo (la página usa fit(); el organigrama usa su cámara).
   ============================================================================ */

const ORG_PROPUESTA = {
  W: 1680,
  H: 1120,

  titulo: 'Estructura organizativa propuesta — Grupo Kenex Trading',
  bajada: 'Propuesta del equipo consultor, en tres niveles (Dirección Ejecutiva · Gerencias Corporativas · Direcciones), diseñada sobre los siete principios de estructura y sobre el diagnóstico de Fase 1. Borrador para discusión con la Alta Gerencia — las coordinaciones dentro de cada dirección se detallarán en una siguiente iteración.',

  /* ---------------------------------------------------------------- nodos */
  NODES: {
    exec:{x:635,y:40,w:330,h:62,cls:'exec',tag:'Nivel 1',ttl:'Dirección Ejecutiva del Grupo'},
    holding:{x:500,y:138,w:250,h:54,cls:'gov',tag:'Gobierno · consulta',ttl:'Holding — grupo familiar propietario'},
    junta:{x:850,y:138,w:250,h:54,cls:'gov',tag:'Gobierno · consulta',ttl:'Junta Directiva'},

    // ---- costado izquierdo (soporte) ----
    gg_th:{x:95,y:250,w:250,h:56,cls:'sop',tag:'Gerencia corporativa · Soporte',ttl:'Talento Humano'},
    dir_th:{x:120,y:316,w:205,h:50,cls:'dir',ttl:'Dirección de Talento Humano',note:'por país'},

    gg_tt:{x:70,y:388,w:290,h:58,cls:'sop',tag:'Gerencia corporativa · Soporte',ttl:'Transformación Tecnológica y Soporte'},
    cex:{x:70,y:456,w:290,h:60,cls:'coe',ttl:'Comité de Excelencia en Transformación Tecnológica e IA',note:'transversal · apoyo'},
    dir_ti:{x:70,y:526,w:250,h:52,cls:'dir',ttl:'Dirección de Tecnologías de Información',note:'por país'},

    gg_pmo:{x:95,y:600,w:250,h:56,cls:'sop',tag:'Gerencia corporativa · Soporte',ttl:'PMO'},
    dir_pmo:{x:95,y:666,w:250,h:70,cls:'dir',ttl:'Dirección de PMO',note:'dos alas: desarrollo de producto · mejora y transformación organizacional'},

    // ---- costado derecho (soporte + híbrida) ----
    gg_fin:{x:1215,y:250,w:250,h:56,cls:'sop',tag:'Gerencia corporativa · Soporte',ttl:'Finanzas'},
    dir_ac:{x:1230,y:316,w:225,h:52,cls:'dir',ttl:'Dirección de Administración y Contabilidad',note:'por país'},

    dir_mant:{x:1195,y:388,w:270,h:58,cls:'dir',ttl:'Dirección de Mantenimiento y Servicios',note:'por país'},

    gg_em:{x:1180,y:466,w:290,h:62,cls:'hyb',tag:'Gerencia corporativa · Híbrida (soporte-medular)',ttl:'Experiencia de Marcas'},
    dir_exc:{x:1220,y:542,w:245,h:48,cls:'dir',ttl:'Dirección de Experiencia del Cliente'},
    dir_mkt:{x:1220,y:598,w:245,h:48,cls:'dir',ttl:'Dirección de Mercadeo'},
    dir_dig:{x:1220,y:654,w:245,h:48,cls:'dir',ttl:'Dirección de Experiencia Digital'},

    // ---- flujo medular ----
    gg_id:{x:195,y:800,w:250,h:60,cls:'med',tag:'Gerencia corporativa · Medular',ttl:'Investigación y Desarrollo'},

    gg_com:{x:675,y:800,w:250,h:60,cls:'med',tag:'Gerencia corporativa · Medular',ttl:'Comercial'},
    dir_casio:{x:630,y:886,w:160,h:64,cls:'marca',ttl:'Dirección Comercial CASIO',note:'incluye compras y ventas al mayor'},
    dir_cubitt:{x:810,y:886,w:160,h:64,cls:'marca',ttl:'Dirección Comercial CUBITT',note:'incluye compras y ventas al mayor'},
    dir_detal:{x:500,y:990,w:150,h:66,cls:'dir',ttl:'Dirección de Ventas al Detal',note:'tiendas · por país'},
    dir_web:{x:660,y:990,w:150,h:66,cls:'dir',ttl:'Dirección de Ventas Web',note:'por país'},
    dir_stec:{x:820,y:990,w:150,h:66,cls:'dir',ttl:'Dirección de Servicio Técnico',note:'por país'},
    dir_ecom:{x:980,y:990,w:150,h:66,cls:'dir',ttl:'Dirección de E-commerce',note:'regional'},
    com_comite:{x:455,y:800,w:200,h:64,cls:'coe',ttl:'Comité Comercial',note:'vinculado a la G. Corporativa Comercial'},

    gg_ops:{x:1225,y:800,w:270,h:60,cls:'med',tag:'Gerencia corporativa · Medular',ttl:'Operaciones y Logística'},
    dir_ops:{x:1230,y:886,w:130,h:56,cls:'dir',ttl:'Dirección de Operaciones'},
    dir_inv:{x:1370,y:886,w:130,h:56,cls:'dir',ttl:'Dirección de Inventario'},
  },

  /* ------------------------------------------- líneas de reporte / consulta */
  EDGES: [
    {s:'dot', p:[[750,165],[800,165]]},                        // holding -> espina (consulta)
    {s:'dot', p:[[850,165],[800,165]]},                        // junta -> espina (consulta)
    {s:'sol', p:[[800,102],[800,770]]},                        // espina
    {s:'sol', p:[[345,278],[1215,278]]},                       // barra A (Talento H | Finanzas)
    {s:'sol', p:[[360,417],[1195,417]]},                       // barra B (Transf.Tec | Mantenimiento)
    {s:'sol', p:[[345,628],[800,628]]},                        // PMO -> espina
    {s:'sol', p:[[800,497],[1180,497]]},                       // espina -> Exp. Marcas
    {s:'sol', p:[[220,306],[220,316]]},                        // gg_th -> dir_th
    {s:'sol', p:[[95,446],[48,446],[48,552]]},                 // riel gg_tt
    {s:'dot', p:[[48,486],[70,486]]},                          // -> cex
    {s:'sol', p:[[48,552],[70,552]]},                          // -> dir_ti
    {s:'sol', p:[[220,656],[220,666]]},                        // gg_pmo -> dir_pmo
    {s:'sol', p:[[1342,306],[1342,316]]},                      // gg_fin -> dir_ac
    {s:'sol', p:[[1470,528],[1490,528],[1490,678]]},           // riel gg_em
    {s:'sol', p:[[1490,566],[1465,566]]},
    {s:'sol', p:[[1490,622],[1465,622]]},
    {s:'sol', p:[[1490,678],[1465,678]]},
    {s:'sol', p:[[320,770],[1360,770]]},                       // bus medular
    {s:'sol', p:[[320,770],[320,800]]},
    {s:'sol', p:[[800,770],[800,800]]},
    {s:'sol', p:[[1360,770],[1360,800]]},
    {s:'dot', p:[[655,832],[675,832]]},                        // Comité Comercial -> Comercial
    // Comercial: gerencia -> marcas
    {s:'sol', p:[[800,860],[800,872]]},
    {s:'sol', p:[[710,872],[890,872]]},
    {s:'sol', p:[[710,872],[710,886]]},{s:'sol', p:[[890,872],[890,886]]},
    // marcas -> direcciones operativas (reportan a las marcas)
    {s:'sol', p:[[710,950],[710,964]]},{s:'sol', p:[[890,950],[890,964]]},
    {s:'sol', p:[[710,964],[890,964]]},
    {s:'sol', p:[[800,964],[800,974]]},
    {s:'sol', p:[[575,974],[1055,974]]},
    {s:'sol', p:[[575,974],[575,990]]},{s:'sol', p:[[735,974],[735,990]]},
    {s:'sol', p:[[895,974],[895,990]]},{s:'sol', p:[[1055,974],[1055,990]]},
    // Operaciones
    {s:'sol', p:[[1360,860],[1360,872]]},
    {s:'sol', p:[[1295,872],[1435,872]]},
    {s:'sol', p:[[1295,872],[1295,886]]},{s:'sol', p:[[1435,872],[1435,886]]},
  ],

  /* Relaciones funcionales (curvas punteadas azules). Explicadas en las Notas. */
  RELS: [
    {d:'M1180,520 C1080,690 1010,880 955,990'},   // Exp. Marcas -> direcciones operativas de Comercial
    {d:'M1220,622 C1080,580 1080,278 345,278'},    // Dir. de Mercadeo -> Talento Humano (experiencia del empleado)
  ],

  /* ------------------------------------------------------------- leyenda */
  LEYENDA: [
    {sw:'background:linear-gradient(135deg,var(--p-navy),var(--p-navy2));border-color:var(--p-navy);', t:'Dirección Ejecutiva'},
    {sw:'background:var(--p-card);border:2px dashed var(--p-navy);', t:'Gobierno (consulta)'},
    {sw:'border-left:5px solid var(--p-ambar);', t:'G. Corporativa soporte'},
    {sw:'border-left:5px solid var(--p-verde);', t:'G. Corporativa medular'},
    {sw:'border-left:5px solid var(--p-ambar);border-right:5px solid var(--p-verde);', t:'G. Corporativa híbrida'},
    {sw:'background:var(--p-gris);border-left:4px solid var(--p-blue);', t:'Dirección'},
    {sw:'background:var(--p-marca-bg);border-left:4px solid var(--p-navy);', t:'Dirección de marca'},
    {sw:'border:1.5px dashed var(--p-blue);', t:'Comité de apoyo (consultivo)'},
    {ln:{color:'var(--p-line)'}, t:'Reporte (continua)'},
    {ln:{color:'var(--p-line)', dash:'3 4'}, t:'Consulta / apoyo (punteada)'},
    {ln:{color:'var(--p-blue)', dash:'2 4'}, t:'Relación funcional (insumos)'},
  ],

  /* --------------------------------------------------------------- notas */
  NOTAS_HTML: `
  <h3>Notas de diseño</h3>
  <ul>
    <li><b>Niveles diagramados:</b> Dirección Ejecutiva · Gerencias Corporativas · Direcciones asociadas. Las <b>coordinaciones</b> dentro de cada dirección se definirán en la siguiente iteración.</li>
    <li><b>Gobierno corporativo.</b> El Holding del grupo familiar y la Junta Directiva son instancias de <b>consulta y decisión</b> de la Dirección Ejecutiva (línea punteada), no niveles de línea de mando.</li>
    <li><b>Capa corporativa flexible.</b> Puede operar desde <b>Panamá o Venezuela</b> según conveniencia (disponibilidad de perfiles y facilidad de acción). Orienta el enfoque estratégico por marca (Casio / Cubitt) y por país.</li>
    <li><b>Soporte a los costados, medulares en el flujo.</b> Las gerencias corporativas de soporte (Talento Humano, Transformación Tecnológica y Soporte, Finanzas y PMO), junto con la Dirección de Mantenimiento y Servicios, se conectan a los costados de la línea de reporte Dirección Ejecutiva → gerencias corporativas medulares (I+D, Comercial, Operaciones y Logística). <b>Experiencia de Marcas</b> es híbrida (soporte-medular).</li>
    <li><b>«Por país».</b> Las direcciones marcadas «por país» se despliegan en las operaciones con presencia propia (Venezuela, Colombia) mediante direcciones y coordinaciones locales.</li>
    <li><b>Transformación Tecnológica y Soporte.</b> Lidera la <b>gobernanza y el desarrollo de IA</b> en las operaciones, apoyada por el <b>Comité de Excelencia en Transformación Tecnológica e IA</b> —comité transversal (línea punteada) que estandariza buenas prácticas y mide el impacto operacional— y por la <b>Dirección de Tecnologías de Información</b> (por país).</li>
    <li><b>Gerencia Corporativa de PMO (soporte).</b> Reporta a la Dirección Ejecutiva; de ella depende una <b>Dirección de PMO</b> con dos alas de proyectos: desarrollo de producto y mejora y transformación organizacional (de cualquier proceso o área).</li>
    <li><b>Dirección de Mantenimiento y Servicios (soporte · por país).</b> Reporta directamente a la línea ejecutiva y concentra el mantenimiento y los servicios de las operaciones.</li>
    <li><b>Gerencia Corporativa Comercial.</b> Las <b>Direcciones Comerciales CASIO y CUBITT</b> incluyen, cada una, <b>compras y ventas al mayor</b>. De ellas —no directamente de la gerencia— dependen las direcciones de <b>Ventas al Detal (tiendas)</b>, <b>Ventas Web</b> y <b>Servicio Técnico</b> (por país); a ese mismo nivel se incorpora una <b>Dirección de E-commerce (regional)</b>. Estas direcciones reciben <b>insumos directos de Experiencia de Marcas</b> (relación funcional punteada).</li>
    <li><b>Comité Comercial.</b> Instancia consultiva vinculada a la Gerencia Corporativa Comercial (línea punteada) para alinear la estrategia comercial entre marcas (Casio · Cubitt) y países.</li>
    <li><b>Dirección de Mercadeo ↔ Talento Humano.</b> Relación funcional punteada: la Experiencia del Empleado se diseña en colaboración con Recursos Humanos (onboarding, clima y orgullo de pertenencia).</li>
  </ul>

  <div class="em-block">
    <h3 style="margin-top:0">Gerencia Corporativa de Experiencia de Marcas — rol y direcciones</h3>
    <p><b>Gerencia Corporativa de Experiencia de Marcas (híbrida, soporte-medular).</b> Rol ejecutivo clave para unificar la percepción, los valores y las vivencias que los públicos tienen de las distintas marcas del grupo. Su enfoque va más allá del diseño visual tradicional para gestionar conexiones emocionales en cada punto de contacto.</p>
    <div class="dcard"><b>Dirección de Experiencia del Cliente.</b>
      <ul class="sub">
        <li><b>Enfoque:</b> diseña el viaje completo del comprador (Customer Journey).</li>
        <li><b>Función:</b> optimiza los procesos de atención, postventa y soporte técnico.</li>
        <li><b>Meta:</b> eliminar fricciones en la interacción directa con el usuario.</li>
      </ul>
    </div>
    <div class="dcard"><b>Dirección de Experiencia Digital.</b>
      <ul class="sub">
        <li><b>Enfoque:</b> gestiona los ecosistemas virtuales de todas las marcas.</li>
        <li><b>Función:</b> supervisa aplicaciones móviles, plataformas de comercio electrónico y páginas web.</li>
        <li><b>Meta:</b> garantizar interfaces intuitivas y un diseño de experiencia de usuario homogéneo.</li>
      </ul>
    </div>
    <div class="dcard"><b>Dirección de Mercadeo.</b> Integra cuatro frentes:
      <ul class="sub">
        <li><b>1 · Identidad y Expresión de Marca.</b> Enfoque: custodia los activos visuales, verbales y sensoriales del grupo. Función: define el tono de voz, el diseño gráfico, el interiorismo corporativo y el branding sónico. Meta: mantener la coherencia estética global en cualquier soporte o país.</li>
        <li><b>2 · Activación y Eventos Globales.</b> Enfoque: conecta la marca con el público mediante vivencias en vivo. Función: organiza lanzamientos de productos, patrocinios, ferias comerciales y tiendas efímeras (pop-up stores). Meta: generar impacto emocional y cobertura mediática a gran escala.</li>
        <li><b>3 · Experiencia del Empleado.</b> Enfoque: alinea la cultura interna con la promesa externa de la marca. Función: colabora con Recursos Humanos para diseñar el onboarding, el clima laboral y el orgullo de pertenencia. Meta: transformar a los trabajadores en los primeros embajadores de las marcas.</li>
        <li><b>4 · Insights y Analítica de Experiencia.</b> Enfoque: sustenta las decisiones creativas en datos reales. Función: monitorea el índice de recomendación (NPS), la satisfacción (CSAT) y las tendencias del mercado. Meta: traducir el comportamiento del consumidor en mejoras continuas de la estrategia.</li>
      </ul>
    </div>
  </div>`,
};

/* ============================================================================
   ESTILOS — se inyectan una sola vez en el anfitrión.
   Los colores viven en variables --p-* con valores CLAROS por defecto. El
   anfitrión que tenga tema oscuro (organigrama-kenex.html) las redefine.
   Las clases van namespaced (.pnode, no .node) para no chocar con el
   organigrama, que ya tiene su propio .node.
   ============================================================================ */
const ORG_PROPUESTA_CSS = `
:root{
  --p-navy:#1F3864; --p-navy2:#2a4a80; --p-blue:#2E75B6; --p-verde:#2E7D32; --p-ambar:#B26A00;
  --p-card:#ffffff; --p-card-edge:#d4dae6; --p-ink:#26303f; --p-muted:#5b6678;
  --p-line:#6b7a95; --p-gris:#F4F6FA; --p-title:#1F3864; --p-marca-bg:#eef4fb;
  --p-shadow:0 1px 2px rgba(23,32,54,.06),0 6px 16px rgba(23,32,54,.07);
}
.propuesta-wrap{font-family:Calibri,"Segoe UI",Segoe,Arial,sans-serif;color:var(--p-ink);line-height:1.4}

/* ---- lienzo ---- */
.propuesta-board{position:relative;width:${1680}px;height:${1250}px;transform-origin:top left;margin:0 auto}
.propuesta-board .pwires{position:absolute;inset:0;width:${1680}px;height:${1250}px;pointer-events:none}

/* ---- nodos ---- */
.pnode{position:absolute;background:var(--p-card);border:1px solid var(--p-card-edge);border-radius:10px;
  box-shadow:var(--p-shadow);padding:8px 12px;display:flex;flex-direction:column;justify-content:center}
.pnode .tag{font-size:8.5px;letter-spacing:.09em;text-transform:uppercase;color:var(--p-muted);font-weight:700;margin-bottom:2px}
.pnode .ttl{font-weight:650;font-size:12.5px;color:var(--p-title);line-height:1.18}
.pnode .note{font-size:10px;font-style:italic;color:var(--p-muted);margin-top:2px}
.pnode.exec{background:linear-gradient(135deg,var(--p-navy),var(--p-navy2));border-color:var(--p-navy);align-items:center;text-align:center}
.pnode.exec .ttl{color:#fff;font-size:16px;font-weight:700}
.pnode.exec .tag{color:#9dc3ee}
.pnode.gov{background:var(--p-card);border:2px dashed var(--p-navy);align-items:center;text-align:center}
.pnode.gov .tag{color:var(--p-title)}
.pnode.sop{border-left:5px solid var(--p-ambar)}
.pnode.med{border-left:5px solid var(--p-verde)}
.pnode.hyb{border-left:5px solid var(--p-ambar);border-right:5px solid var(--p-verde)}
.pnode.dir{background:var(--p-gris);border-left:4px solid var(--p-blue)}
.pnode.dir .ttl{font-size:11.5px;font-weight:600}
.pnode.marca{background:var(--p-marca-bg);border-left:4px solid var(--p-navy)}
.pnode.marca .ttl{font-size:12px;color:var(--p-title)}
.pnode.coe{background:var(--p-card);border:1.5px dashed var(--p-blue)}
.pnode.coe .ttl{font-size:11.5px;color:var(--p-blue);font-style:italic}

/* ---- leyenda (el anfitrión decide el contenedor; esto es el contenido) ---- */
.propuesta-leyenda{display:flex;flex-wrap:wrap;gap:14px 24px;align-items:center;font-size:.8rem;color:var(--p-ink)}
.propuesta-leyenda .li{display:flex;align-items:center;gap:7px}
.propuesta-leyenda .sw{width:24px;height:15px;border-radius:4px;flex:none;border:1px solid var(--p-card-edge)}
.propuesta-leyenda .ln{width:30px;height:10px;flex:none}

/* ---- notas ---- */
.propuesta-notas{font-size:.83rem;color:var(--p-ink);line-height:1.45}
.propuesta-notas h3{font-size:.82rem;text-transform:uppercase;letter-spacing:.08em;color:var(--p-title);margin:2px 0 8px;font-weight:700}
.propuesta-notas ul{margin:0 0 0 18px;padding:0;list-style:disc}
.propuesta-notas li{margin:5px 0}
.propuesta-notas p{margin:0 0 8px}
.propuesta-notas b{color:var(--p-title)}
.propuesta-notas .em-block{margin-top:14px;padding:14px 18px;background:var(--p-gris);border-left:4px solid var(--p-ambar);border-radius:8px}
.propuesta-notas .em-block .dcard{margin:10px 0}
.propuesta-notas .em-block .dcard>b{color:var(--p-title)}
.propuesta-notas .em-block .sub{margin:4px 0 4px 16px;font-size:.82rem}
.propuesta-notas .em-block .sub li{margin:3px 0}
`;

/* ============================================================================
   API DE PINTADO
   ============================================================================ */

/** Inyecta los estilos compartidos una sola vez. */
function orgPropuestaEstilos(){
  if(document.getElementById('org-propuesta-css')) return;
  const s = document.createElement('style');
  s.id = 'org-propuesta-css';
  s.textContent = ORG_PROPUESTA_CSS;
  document.head.appendChild(s);
}

const _pEsc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');

/**
 * Pinta el organigrama propuesto.
 * @param {HTMLElement} board  contenedor del lienzo (recibe .propuesta-board)
 * @param {SVGElement}  wires  <svg> de las líneas (recibe .pwires)
 */
function pintarOrgPropuesta(board, wires){
  orgPropuestaEstilos();
  board.classList.add('propuesta-board');
  wires.classList.add('pwires');

  // idempotente: limpia un pintado anterior
  board.querySelectorAll('.pnode').forEach(el => el.remove());

  const N = ORG_PROPUESTA.NODES;
  for(const k in N){
    const n = N[k];
    const d = document.createElement('div');
    d.className = 'pnode ' + n.cls;
    d.dataset.pid = k;
    d.style.cssText = `left:${n.x}px;top:${n.y}px;width:${n.w}px;height:${n.h}px`;
    d.innerHTML = (n.tag ? `<div class="tag">${_pEsc(n.tag)}</div>` : '')
                + `<div class="ttl">${_pEsc(n.ttl)}</div>`
                + (n.note ? `<div class="note">${_pEsc(n.note)}</div>` : '');
    board.appendChild(d);
  }

  let svg = ORG_PROPUESTA.EDGES.map(e => {
    const d = 'M' + e.p.map(pt => pt[0] + ',' + pt[1]).join(' L');
    return `<path d="${d}" fill="none" stroke="var(--p-line)" stroke-width="2.2"${e.s === 'dot' ? ' stroke-dasharray="3 4"' : ''}/>`;
  }).join('');
  svg += ORG_PROPUESTA.RELS.map(r =>
    `<path d="${r.d}" fill="none" stroke="var(--p-blue)" stroke-width="2" stroke-dasharray="2 4" opacity=".85"/>`
  ).join('');
  wires.innerHTML = svg;
}

/** Pinta la leyenda dentro del elemento dado. */
function pintarOrgPropuestaLeyenda(el){
  orgPropuestaEstilos();
  el.classList.add('propuesta-leyenda');
  el.innerHTML = ORG_PROPUESTA.LEYENDA.map(i => {
    const marca = i.ln
      ? `<svg class="ln"><line x1="0" y1="5" x2="30" y2="5" stroke="${i.ln.color}" stroke-width="2.5"${i.ln.dash ? ` stroke-dasharray="${i.ln.dash}"` : ''}/></svg>`
      : `<span class="sw" style="${i.sw}"></span>`;
    return `<div class="li">${marca}${_pEsc(i.t)}</div>`;
  }).join('');
}

/** Pinta las notas de diseño dentro del elemento dado. */
function pintarOrgPropuestaNotas(el){
  orgPropuestaEstilos();
  el.classList.add('propuesta-notas');
  el.innerHTML = ORG_PROPUESTA.NOTAS_HTML;
}
