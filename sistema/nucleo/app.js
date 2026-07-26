/* ============================================================================
   EL SISTEMA — Armazón de la aplicación
   Proyecto Rower · UCAB Consultores para Grupo Kenex · Fase 3 del plan

   Aquí vive el marco: chrome, menú, enrutado por hash, selector de rol, tema,
   el HUD del agente y la estela que cruza el menú cuando una acción salta de
   módulo. Los módulos se registran en MODULOS y cada fase posterior sustituye
   su función `pinta` por la pantalla real.
   ============================================================================ */

/* ------------------------------------------------------------------ ROLES */
/* Los roles son de FUNCIÓN, nunca de persona: el prototipo no señala a nadie.
   El selector de rol es, además, el recurso de demo más barato que existe:
   "esto es lo que ve compras el día 18". */

const ROLES = {
  direccion: {
    nombre: 'dirección ejecutiva',
    ve: ['direccion', 'compras', 'fabricas', 'distribucion', 'logistica', 'comercial', 'frentes', 'producto', 'cimiento', 'agentes'],
    firma: 'todo, sin tope',
  },
  compras: {
    nombre: 'dirección de compras',
    ve: ['compras', 'fabricas', 'distribucion', 'producto', 'logistica', 'comercial', 'frentes', 'cimiento', 'agentes'],
    firma: 'compras, reparto y traslados',
  },
  analista: {
    nombre: 'analista de compras y datos',
    ve: ['compras', 'producto', 'fabricas', 'frentes', 'cimiento', 'agentes'],
    firma: 'normalización y excepciones',
  },
  producto: {
    nombre: 'desarrollo de producto',
    ve: ['producto', 'fabricas', 'compras', 'cimiento', 'agentes'],
    firma: 'graduación de candidatos',
  },
  logistica: {
    nombre: 'operaciones y logística',
    ve: ['logistica', 'distribucion', 'compras', 'frentes', 'agentes'],
    firma: 'recepción, traslados y despacho',
  },
  comercial: {
    nombre: 'gerencia comercial',
    ve: ['comercial', 'distribucion', 'frentes', 'logistica', 'agentes'],
    firma: 'pedidos y disponibilidad publicada',
  },
  sistemas: {
    nombre: 'sistemas',
    ve: ['frentes', 'cimiento', 'agentes', 'direccion', 'compras', 'fabricas', 'distribucion', 'logistica', 'comercial', 'producto'],
    firma: 'reglas y conectores · no ve dinero',
  },
};

/* ---------------------------------------------------------------- MÓDULOS */
/* `fase` es la fase del plan que construye la pantalla real. Mientras tanto
   el módulo se pinta como carta de presentación, para que al navegar se vea
   el mapa completo del sistema. */

const MODULOS = {
  direccion: {
    ico: '◆', nombre: 'dirección', grupo: 'grupo', fase: 19,
    para: 'Junta Directiva, presidencia y accionistas',
    resuelve: 'El estado del ciclo completo en una pantalla, y la barra de consulta de solo lectura.',
  },
  producto: {
    ico: '✦', nombre: 'desarrollo de producto', grupo: 'operación', fase: 10,
    para: 'I+D y producto de marca propia',
    resuelve: 'El embudo del candidato —muestra, prueba, decisión— hasta que gradúa al catálogo. Solo un producto graduado es comprable.',
  },
  fabricas: {
    ico: '⌂', nombre: 'fábricas', grupo: 'operación', fase: 10,
    para: 'compras y desarrollo de producto',
    resuelve: 'El pedido mínimo, el plazo y el esquema de pago de cada fábrica, junto al historial de si cumple lo que promete. Es lo que convierte una queja recurrente en una negociación con argumentos.',
  },
  compras: {
    ico: '▤', nombre: 'compras', grupo: 'operación', fase: 6,
    para: 'dirección de compras, analista, y finanzas como invitada',
    resuelve: 'El forecast y la compra internacional a Casio y a Cubitt, con el ciclo del mes, la mesa de compra y la torre de tránsitos.',
  },
  logistica: {
    ico: '▥', nombre: 'logística e inventarios', grupo: 'operación', fase: 13,
    para: 'operaciones, inventarios y jefes de bodega',
    resuelve: 'Recepción de contenedor, ubicación, salud del inventario y rebalanceo entre ubicaciones.',
  },
  distribucion: {
    ico: '⇄', nombre: 'distribución', grupo: 'operación', fase: 12,
    para: 'compras y comercial',
    resuelve: 'El reparto de la mercancía a todos los frentes, incluida la escasez, con su escalera de precedencia y el motivo de cada ajuste.',
  },
  comercial: {
    ico: '▧', nombre: 'comercial', grupo: 'operación', fase: 15,
    para: 'gerencia comercial y responsables de frente',
    resuelve: 'Los pedidos de los clientes mayores, la demanda no atendida y la disponibilidad publicada a cada socio.',
  },
  frentes: {
    ico: '◈', nombre: 'frentes', grupo: 'red', fase: 17,
    para: 'sistemas, responsables de país y la Junta',
    resuelve: 'El portal donde los frentes sin Odoo cargan su venta con su propio Excel, y el estado de cada conexión con su reloj de corte.',
  },
  cimiento: {
    ico: '◇', nombre: 'cimiento', grupo: 'sistema', fase: 4,
    para: 'administración de datos',
    resuelve: 'El catálogo canónico con su lista de alias, las reglas de negocio con dueño y versión, y la cola de excepciones.',
  },
  agentes: {
    ico: '⬤', nombre: 'sala de agentes', grupo: 'sistema', fase: 20,
    para: 'cada quien ve su parte; sistemas y la Junta, el conjunto',
    resuelve: 'Qué hace cada agente, con qué permiso y con qué registro. La bitácora, el árbitro de colisiones y el freno.',
  },
};

const GRUPOS = [
  { clave: 'grupo', titulo: '' },
  { clave: 'operación', titulo: 'operación' },
  { clave: 'red', titulo: 'red de frentes' },
  { clave: 'sistema', titulo: 'sistema' },
];

/* ------------------------------------------------- EVENTOS DEL MARQUEE */
/* Lo que el agente está haciendo ahora mismo. En la fase 5 esto lo alimenta
   el núcleo de agentes; aquí es la coreografía del marco. */

const EVENTOS = [
  { n: 1, t: 'armé la mesa de compra de agosto — <b>1.284 referencias</b>, 312 con propuesta' },
  { n: 2, t: 'normalicé el reporte de <b>3 frentes</b> — 23 nombres resueltos, 4 en cola' },
  { n: 2, t: 'registré <b>4.180 unidades</b> de demanda no atendida que antes se borraban' },
  { n: 3, t: 'preparé el traslado que sustituye una compra de <b>92 unidades</b>' },
  { n: 1, t: 'redacté el reclamo de la factura de flete — sale con tu nombre' },
];

/* ------------------------------------------------------------------ ESTADO */

const ESTADO = {
  rol: localStorage.getItem('kx.rol') || 'compras',
  modulo: 'compras',
  tema: localStorage.getItem('kx.tema') || 'oscuro',
  pendientes: 4,      // lo que espera firma del rol activo
  preparadas: 12,     // lo que el agente dejó listo hoy
};

/* ------------------------------------------------------------------ ÚTILES */

const $ = (s, raiz = document) => raiz.querySelector(s);
const $$ = (s, raiz = document) => [...raiz.querySelectorAll(s)];
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

/* ------------------------------------------------------------------- MENÚ */

function pintaMenu() {
  const visibles = ROLES[ESTADO.rol].ve;
  const menu = $('#menu');
  let html = '';

  for (const g of GRUPOS) {
    const items = Object.entries(MODULOS)
      .filter(([k, m]) => m.grupo === g.clave && visibles.includes(k));
    if (!items.length) continue;
    if (g.titulo) html += `<div class="menu-grupo">${esc(g.titulo)}</div>`;
    for (const [k, m] of items) {
      const activo = k === ESTADO.modulo;
      const pend = (typeof bandejaDe === 'function') ? bandejaDe(k).length : 0;
      html += `<div class="menu-item estela ${activo ? 'on' : ''}" data-mod="${k}" role="button" tabindex="0">
        <span class="ico">${m.ico}</span><span>${esc(m.nombre)}</span>
        ${pend ? `<span class="contador">${pend}</span>` : ''}
      </div>`;
    }
  }
  menu.innerHTML = html;

  $$('.menu-item', menu).forEach(el => {
    const ir = () => { location.hash = '#/' + el.dataset.mod; document.body.classList.remove('menu-abierto'); };
    el.onclick = ir;
    el.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ir(); } };
  });
}

/* --------------------------------------------------------------- LA ESTELA */
/* La respuesta visual literal al encargo: se ve la acción viajar de un módulo
   a otro por el menú, antes de que nadie abra el módulo destino. */

function viajaEstela(ruta, alTerminar) {
  const pasos = ruta.map(m => $(`.menu-item[data-mod="${m}"]`)).filter(Boolean);
  pasos.forEach((el, i) => setTimeout(() => {
    el.classList.add('viaja');
    setTimeout(() => el.classList.remove('viaja'), 1100);
    if (i === pasos.length - 1 && alTerminar) setTimeout(alTerminar, 900);
  }, i * 320));
}
window.viajaEstela = viajaEstela;

/* -------------------------------------------------------------- EL MARQUEE */

function arrancaMarquee() {
  const caja = $('#marquee');
  /* si el núcleo está cargado, el marquee cuenta lo que de verdad pasó anoche */
  const reales = (typeof turno === 'function')
    ? turno().slice(0, 5).map(e => ({ n: e.nivel, t: e.salida.split(' · ').slice(0, 2).join(' · ') }))
    : EVENTOS;
  caja.innerHTML = reales.map((e, i) =>
    `<div class="ev ${i === 0 ? 'ver' : ''}">
       <span class="orbe orbe-mini ${e.n === 1 ? '' : 'hecho'}"></span>
       <span>${e.t}</span>
     </div>`).join('');
  const evs = $$('.ev', caja);
  let i = 0;
  setInterval(() => {
    evs[i].classList.remove('ver');
    i = (i + 1) % evs.length;
    evs[i].classList.add('ver');
  }, 4200);
}

/* ------------------------------------------------------------------ ROUTER */

/* Enrutado por hash con sub-rutas: #/compras → módulo · #/compras/casio →
   pantalla dentro del módulo. El hash nunca viaja al servidor, así que esto
   funciona igual servido por HTTP que abriendo el archivo con doble clic. */
function ruta() {
  const partes = (location.hash || '').replace(/^#\/?/, '').split('/').filter(Boolean);
  /* Sin hash, cada rol entra por su propia pantalla —no por compras—. Quien
     dirige abre en dirección; quien vende, en comercial. El selector de rol
     cambia el sistema, no solo el menú. */
  const inicio = (ROLES[ESTADO.rol] || ROLES.compras).ve[0];
  const mod = MODULOS[partes[0]] ? partes[0] : inicio;
  return { mod, sub: partes.slice(1).join('/'), llave: partes.slice(0, 2).join('/') };
}

function navega() {
  const r = ruta();
  const visibles = ROLES[ESTADO.rol].ve;
  ESTADO.modulo = visibles.includes(r.mod) ? r.mod : visibles[0];
  ESTADO.sub = ESTADO.modulo === r.mod ? r.sub : '';
  ESTADO.llave = ESTADO.sub ? ESTADO.modulo + '/' + ESTADO.sub : ESTADO.modulo;

  /* Si el rol no podía ver lo pedido —o la sub-ruta no existe— se cae a la
     pantalla del módulo. La URL no puede seguir afirmando lo que no se ve:
     se corrige sin dejar rastro en el historial, para que atrás siga yendo
     a la pantalla anterior de verdad. */
  if (ESTADO.sub && !(window.PANTALLAS || {})[ESTADO.llave]) {
    ESTADO.sub = ''; ESTADO.llave = ESTADO.modulo;
  }
  const deseada = '#/' + ESTADO.llave;
  if (location.hash && location.hash !== deseada) history.replaceState(null, '', deseada);

  pintaMenu();
  pintaLienzo();
  pintaHud();
  $('.lienzo').scrollTop = 0;
}

/* ------------------------------------------------------------------ LIENZO */

function pintaLienzo() {
  const k = ESTADO.modulo, m = MODULOS[k];
  const lienzo = $('#lienzo');

  /* Se busca primero la pantalla concreta (compras/casio) y si no existe, la
     del módulo (compras). Cada fase posterior añade la suya. */
  const P = window.PANTALLAS || {};
  const elegida = P[ESTADO.llave] || P[k];
  if (elegida) {
    lienzo.innerHTML = '';
    elegida(lienzo, ESTADO);
    return;
  }

  lienzo.innerHTML = `
    <div class="lienzo-cab">
      <div class="sobretitulo">${esc(m.grupo === 'grupo' ? 'el grupo' : m.grupo)}</div>
      <div class="titulo-seccion" style="margin-top:4px">${esc(m.nombre)}</div>
    </div>

    <div class="rejilla" style="grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);align-items:start">
      <div class="panel">
        <div class="fila gap-12">
          <span class="orbe orbe-grande"></span>
          <div>
            <div style="font-weight:700;font-size:15px">${esc(m.nombre)}</div>
            <div class="apunte">para ${esc(m.para)}</div>
          </div>
        </div>
        <hr class="sep">
        <p class="apunte" style="font-size:13px;line-height:1.55">${esc(m.resuelve)}</p>
        <div class="fila gap-8 mt-24">
          <span class="marca-estado e-neutro"><i class="punto"></i>pantalla en la fase ${m.fase}</span>
          <span class="apunte tenue">el armazón ya está; falta el contenido</span>
        </div>
      </div>

      <div class="panel">
        <div class="sobretitulo">el ciclo del sistema</div>
        <div class="pila gap-8 mt-16" style="font-size:12.5px">
          ${[
            ['✦', 'desarrollo de producto', 'producto'],
            ['▤', 'compra internacional', 'compras'],
            ['▥', 'recepción en Colón', 'logistica'],
            ['⇄', 'reparto a los frentes', 'distribucion'],
            ['▧', 'despacho y factura', 'comercial'],
            ['◈', 'el frente vende y reporta', 'frentes'],
          ].map(([i, t, mod]) => `
            <div class="fila gap-8" style="padding:7px 10px;border-radius:10px;
                 ${mod === k ? 'background:var(--gradiente-suave);font-weight:650' : 'color:var(--tinta-media)'}">
              <span style="width:15px;text-align:center;opacity:.8">${i}</span><span>${t}</span>
            </div>`).join('<div style="height:1px"></div>')}
        </div>
        <p class="apunte tenue mt-16" style="font-size:11.5px;line-height:1.5">
          Se cierra sobre sí mismo: lo que el frente reporta es lo que alimenta el siguiente forecast.
        </p>
      </div>
    </div>`;
}

/* -------------------------------------------------------------------- HUD */

function pintaHud() {
  /* las cifras salen del núcleo, no de constantes: si cambia una regla de
     negocio, el HUD cambia solo */
  const r = (typeof resumenAgentes === 'function') ? resumenAgentes()
          : { esperanFirma: 0, preparadas: 0, ejecutadas: 0, enviadasSinFirmaHumana: 0 };
  /* En dirección no aparece: esa pantalla declara «solo lectura · aquí la IA
     no actúa», y una píldora flotante que invita a firmar la contradice. Sus
     mismas cifras están dentro, dichas con todas las letras. */
  const hud = $('#hud');
  hud.style.display = ESTADO.modulo === 'direccion' ? 'none' : '';
  hud.innerHTML = `
    <span class="orbe orbe-grande actuando"></span>
    <div class="txt">
      <b>${r.esperanFirma} esperan tu firma</b>
      <div class="sub">${r.preparadas + r.ejecutadas} acciones anoche · ${r.enviadasSinFirmaHumana} sin firma humana</div>
    </div>`;
}

/* -------------------------------------------------------------- ARRANQUE */

function arranca() {
  document.documentElement.setAttribute('data-tema', ESTADO.tema);

  /* selector de rol */
  const sel = $('#rol');
  sel.innerHTML = Object.entries(ROLES)
    .map(([k, r]) => `<option value="${k}">${esc(r.nombre)}</option>`).join('');
  sel.value = ESTADO.rol;
  sel.onchange = () => {
    ESTADO.rol = sel.value;
    localStorage.setItem('kx.rol', ESTADO.rol);
    ESTADO.pendientes = { direccion: 2, compras: 4, analista: 6, producto: 1, logistica: 3, comercial: 5, sistemas: 0 }[ESTADO.rol] ?? 0;
    navega(); pintaHud();
  };

  /* tema */
  const bt = $('#tema');
  const rotula = () => bt.textContent = ESTADO.tema === 'oscuro' ? '☾' : '☀';
  rotula();
  bt.onclick = () => {
    ESTADO.tema = ESTADO.tema === 'oscuro' ? 'claro' : 'oscuro';
    document.documentElement.setAttribute('data-tema', ESTADO.tema);
    localStorage.setItem('kx.tema', ESTADO.tema);
    rotula();
  };

  /* menú en móvil */
  $('#abre-menu').onclick = () => document.body.classList.toggle('menu-abierto');
  $('#lienzo').addEventListener('click', () => document.body.classList.remove('menu-abierto'));

  /* el HUD lleva a la sala de agentes */
  $('#hud').onclick = () => { location.hash = '#/agentes'; };

  /* demostración de la estela: se ve la acción cruzar el menú */
  $('#probar-estela').onclick = () => viajaEstela(['compras', 'distribucion', 'logistica', 'comercial']);

  addEventListener('hashchange', navega);
  arrancaMarquee();
  navega();
  pintaHud();
}

document.addEventListener('DOMContentLoaded', arranca);
