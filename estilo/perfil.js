/* ============================================================
   Rower · Menú de perfil del usuario (cabecera de los informes)
   ------------------------------------------------------------
   Pinta en cualquier elemento con [data-rower-perfil] un botón con las
   iniciales y el nombre de quien entró; al desplegarlo muestra su correo y
   su rol, el acceso al panel de administración y a los módulos que su rol
   puede abrir, el portal y «Cerrar sesión».

   Depende de supabase/sesion.js (window.rowerSesion), que ya carga toda página
   protegida. Lee el perfil cacheado (rol + permisos) para pintar al instante y
   lo revalida de fondo con mi_acceso(). Ocultar el acceso al panel es cortesía
   de interfaz: quien cierra el panel es su guardia (admin.entrar) y la RLS.

   Usa los tokens de estilo/app.css; trae sus propias reglas (.rp-*).
   ============================================================ */
(function () {
  'use strict';

  // Módulos del panel a los que el menú da un atajo, con el permiso que piden
  // (el mismo PERMISO_RUTA de admin/index.html). El panel en sí pide admin.entrar.
  var ATAJOS = [
    ['secretaria', 'admin.validacion', 'Secretaría técnica'],
    ['asistente',  'admin.asistente',  'Asistente IA'],
    ['usuarios',   'admin.usuarios',   'Usuarios'],
    ['roles',      'admin.roles',      'Roles y permisos']
  ];

  var CSS =
    '.rp{position:relative;flex:none}' +
    '.rp-btn{display:inline-flex;align-items:center;gap:8px;min-height:34px;max-width:230px;padding:3px 10px 3px 3px;border-radius:var(--r-pildora,999px);' +
      'border:1px solid var(--borde);background:var(--panel);color:var(--tinta);font:inherit;font-size:12px;font-weight:650;cursor:pointer}' +
    '.rp-btn:hover{border-color:var(--tinta-tenue)}' +
    '.rp-btn:focus-visible,.rp-menu a:focus-visible,.rp-menu button:focus-visible{outline:2px solid var(--cian);outline-offset:2px}' +
    '.rp-av{flex:none;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:var(--gradiente);color:var(--tinta-inversa);' +
      'font-size:11px;font-weight:800;letter-spacing:.02em}' +
    '.rp-nom{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '.rp-car{flex:none;font-size:10px;color:var(--tinta-tenue);transition:transform var(--rapido,150ms)}' +
    '.rp-btn[aria-expanded="true"] .rp-car{transform:rotate(180deg)}' +
    '.rp-menu{position:absolute;right:0;top:calc(100% + 8px);z-index:300;width:min(290px,calc(100vw - 24px));padding:6px;border-radius:16px;' +
      'background:var(--panel);border:1px solid var(--borde);box-shadow:var(--sombra-alta);display:flex;flex-direction:column}' +
    '.rp-menu[hidden]{display:none}' +
    '.rp-cab{display:flex;gap:10px;align-items:center;padding:10px 10px 12px;border-bottom:1px solid var(--borde);margin-bottom:6px;min-width:0}' +
    '.rp-cab .rp-av{width:38px;height:38px;font-size:13px}' +
    '.rp-id{min-width:0;display:flex;flex-direction:column;gap:2px}' +
    '.rp-id b{font-size:13.5px;color:var(--tinta);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '.rp-id span{font-size:11.5px;color:var(--tinta-media);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '.rp-rol{align-self:flex-start;margin-top:3px;font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--tinta);' +
      'background:var(--panel-alto);border:1px solid var(--borde);border-radius:var(--r-pildora,999px);padding:1px 8px}' +
    '.rp-lbl{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--tinta-tenue);padding:8px 10px 4px}' +
    '.rp-menu a,.rp-menu button.rp-it{display:flex;align-items:center;gap:8px;min-height:32px;padding:6px 10px;border-radius:10px;border:0;background:transparent;' +
      'color:var(--tinta);font:inherit;font-size:12.5px;font-weight:600;text-decoration:none;cursor:pointer;text-align:left;width:100%}' +
    '.rp-menu a:hover,.rp-menu button.rp-it:hover{background:var(--realce)}' +
    '.rp-menu a.rp-pri{font-weight:700}' +
    '.rp-menu .rp-sub{padding-left:22px;font-weight:550;color:var(--tinta-media)}' +
    '.rp-sep{height:1px;background:var(--borde);margin:6px 4px}' +
    '.rp-salir{color:var(--riesgo)!important}' +
    '@media (max-width:900px){.rp-nom,.rp-car{display:none}.rp-btn{padding:3px}}' +
    '@media print{.rp{display:none!important}}';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function iniciales(nombre, correo) {
    var base = (nombre || '').trim() || (correo || '').split('@')[0].replace(/[._-]+/g, ' ');
    var p = base.split(/\s+/).filter(Boolean);
    return ((p[0] || '?').charAt(0) + (p.length > 1 ? p[p.length - 1].charAt(0) : '')).toUpperCase();
  }

  function datos() {
    var S = window.rowerSesion, pf = (S.perfil && S.perfil()) || {}, u = (S.usuario && S.usuario()) || {};
    var correo = pf.correo || u.email || '';
    var nombre = (pf.nombre || '').trim() || (u.user_metadata && u.user_metadata.nombre) || correo;
    return { nombre: nombre, correo: correo, rol: pf.rol_nombre || pf.rol || '', permisos: pf.permisos || [], activo: pf.activo !== false };
  }

  function menuHtml(d) {
    var S = window.rowerSesion, raiz = S.raiz || '/';
    var puede = function (k) { return d.activo && d.permisos.indexOf(k) >= 0; };
    var h = '<div class="rp-cab"><span class="rp-av" aria-hidden="true">' + esc(iniciales(d.nombre, d.correo)) + '</span>' +
            '<div class="rp-id"><b>' + esc(d.nombre) + '</b>' + (d.correo && d.correo !== d.nombre ? '<span>' + esc(d.correo) + '</span>' : '') +
            (d.rol ? '<span class="rp-rol">' + esc(d.rol) + '</span>' : '') + '</div></div>';
    if (puede('admin.entrar')) {
      h += '<div class="rp-lbl">Administración</div>' +
           '<a class="rp-pri" role="menuitem" href="' + esc(raiz + 'admin/') + '">Panel de administración</a>';
      ATAJOS.forEach(function (a) {
        if (puede(a[1])) h += '<a class="rp-sub" role="menuitem" href="' + esc(raiz + 'admin/#' + a[0]) + '">' + esc(a[2]) + '</a>';
      });
      h += '<div class="rp-sep" role="separator"></div>';
    }
    h += '<a role="menuitem" href="' + esc(raiz) + '">Portal del proyecto</a>' +
         '<button type="button" class="rp-it rp-salir" role="menuitem" data-rp="salir">Cerrar sesión</button>';
    return h;
  }

  function montar(host) {
    if (host.getAttribute('data-rp-listo')) return;
    host.setAttribute('data-rp-listo', '1');
    host.classList.add('rp');
    host.innerHTML = '<button type="button" class="rp-btn" aria-haspopup="menu" aria-expanded="false"></button>' +
                     '<div class="rp-menu" role="menu" hidden></div>';
    var btn = host.querySelector('.rp-btn'), menu = host.querySelector('.rp-menu');

    function pintar() {
      var d = datos();
      btn.innerHTML = '<span class="rp-av" aria-hidden="true">' + esc(iniciales(d.nombre, d.correo)) + '</span>' +
                      '<span class="rp-nom">' + esc(d.nombre) + '</span><span class="rp-car" aria-hidden="true">▾</span>';
      btn.title = d.nombre + (d.rol ? ' · ' + d.rol : '');
      btn.setAttribute('aria-label', 'Perfil de ' + d.nombre);
      menu.innerHTML = menuHtml(d);
    }
    function abrir(si, foco) {
      menu.hidden = !si;
      btn.setAttribute('aria-expanded', si ? 'true' : 'false');
      if (si && foco) { var p = menu.querySelector('a,button'); if (p) p.focus(); }
    }

    pintar();
    btn.addEventListener('click', function () { abrir(menu.hidden, false); });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); abrir(true, true); }
    });
    menu.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-rp="salir"]');
      if (b) { window.rowerSesion.salir(); return; }
      if (e.target.closest && e.target.closest('a')) abrir(false);
    });
    menu.addEventListener('keydown', function (e) {
      var its = [].slice.call(menu.querySelectorAll('a,button')), i = its.indexOf(document.activeElement);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        var n = its[(i + (e.key === 'ArrowDown' ? 1 : its.length - 1)) % its.length]; if (n) n.focus();
      }
    });
    document.addEventListener('click', function (e) { if (!host.contains(e.target)) abrir(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) { abrir(false); btn.focus(); }
    });
    // El rol pudo cambiar desde la última vez: revalidar de fondo y repintar.
    if (window.rowerSesion.refrescarPerfil) window.rowerSesion.refrescarPerfil().then(function (p) { if (p) pintar(); });
  }

  function iniciar() {
    if (!window.rowerSesion || !window.rowerSesion.viva || !window.rowerSesion.viva()) return;
    if (!document.getElementById('rpEstilo')) {
      var st = document.createElement('style'); st.id = 'rpEstilo'; st.textContent = CSS;
      document.head.appendChild(st);
    }
    [].forEach.call(document.querySelectorAll('[data-rower-perfil]'), montar);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
