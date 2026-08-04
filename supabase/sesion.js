/* ============================================================
   Rower · Guardia de sesión (Supabase Auth)
   ------------------------------------------------------------
   Único punto de control de acceso del aplicativo. Se carga como
   script BLOQUEANTE en el <head> de cada página protegida:

     <script src="../../supabase/sesion.js" data-proteger></script>

   Con data-proteger, si no hay sesión válida la página NO se pinta:
   se redirige a /acceso/?destino=<ruta> antes de que el navegador
   llegue al <body>. Sin el atributo solo expone la API (así lo cargan
   el portal raíz y la propia pantalla de acceso).

   No depende de @supabase/supabase-js: lee el mismo registro de
   localStorage que escribe la pantalla de acceso ('sb-<ref>-auth-token'),
   para que el informe no tenga que traer el SDK desde un CDN.

   La clave publishable es pública por diseño (protegida por RLS).
   Mantener URL y clave en sintonía con supabase/cliente.js.
   ============================================================ */
(function () {
  'use strict';

  const PROYECTO   = 'kmhwqybqrcjhjeywjgxj';
  const URL_BASE   = 'https://' + PROYECTO + '.supabase.co';
  const CLAVE_PUB  = 'sb_publishable_a1TB2z327D8lIbeFDij0zg_qewS9ri1';
  const LLAVE      = 'sb-' + PROYECTO + '-auth-token';   // storageKey de supabase-js v2
  const MARGEN     = 60;    // s: por debajo de esto el token ya se considera vencido
  const ANTICIPO   = 600;   // s: a menos de 10 min del vencimiento, refrescar de fondo

  /* ---- raíz del sitio, derivada de la ruta de este mismo script ----
     <raíz>/supabase/sesion.js → <raíz>/ ; sirve igual a 1, 2 o 3 niveles
     de profundidad, en localhost y en el dominio publicado. */
  const propio = (document.currentScript && document.currentScript.src) || '';
  const RAIZ   = propio ? propio.replace(/supabase\/sesion\.js(\?.*)?$/, '') : '/';
  const ACCESO = RAIZ + 'acceso/';
  const proteger = !!(document.currentScript && document.currentScript.hasAttribute('data-proteger'));

  /* ============================================================
     Lectura / escritura del registro de sesión
     ============================================================ */
  function cruda() {
    try { return localStorage.getItem(LLAVE); } catch (e) { return null; }
  }

  // supabase-js guarda JSON plano; algunas versiones lo guardan como
  // 'base64-<base64url>'. Se aceptan las dos y se conserva el formato al escribir.
  function decodificar(txt) {
    if (!txt) return null;
    try {
      if (txt.slice(0, 7) === 'base64-') {
        let b = txt.slice(7).replace(/-/g, '+').replace(/_/g, '/');
        while (b.length % 4) b += '=';
        return JSON.parse(decodeURIComponent(escape(atob(b))));
      }
      return JSON.parse(txt);
    } catch (e) { return null; }
  }

  function codificar(sesion, enBase64) {
    const json = JSON.stringify(sesion);
    if (!enBase64) return json;
    return 'base64-' + btoa(unescape(encodeURIComponent(json)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function guardar(sesion) {
    try {
      const enBase64 = (cruda() || '').slice(0, 7) === 'base64-';
      localStorage.setItem(LLAVE, codificar(sesion, enBase64));
    } catch (e) { /* almacenamiento bloqueado: la sesión durará solo esta carga */ }
  }

  function borrar() {
    try { localStorage.removeItem(LLAVE); } catch (e) { /* nada que hacer */ }
    try { sessionStorage.clear(); } catch (e) { /* idem */ }   // limpia el chat del asistente
  }

  const ahora = () => Math.floor(Date.now() / 1000);

  function sesion()  { return decodificar(cruda()); }
  function vence(s)  { return (s && Number(s.expires_at)) || 0; }
  function viva(s)   { return !!(s && s.access_token && vence(s) - MARGEN > ahora()); }

  /* ============================================================
     Ruta de destino (siempre relativa a la raíz del sitio)
     ============================================================ */
  function destinoActual() {
    const aqui = location.href;
    if (RAIZ && aqui.indexOf(RAIZ) === 0) return aqui.slice(RAIZ.length);
    return (location.pathname + location.search + location.hash).replace(/^\//, '');
  }

  // Solo rutas internas: nada de esquemas ni de '//host'.
  function destinoSeguro(d) {
    if (!d) return '';
    if (/^[a-z][a-z0-9+.-]*:/i.test(d) || d.slice(0, 2) === '//' || d.charAt(0) === '\\') return '';
    return d.replace(/^\/+/, '');
  }

  function irAlAcceso(motivo) {
    const d = destinoActual();
    const url = ACCESO + (d ? '?destino=' + encodeURIComponent(d) : '') +
                (motivo ? (d ? '&' : '?') + 'motivo=' + motivo : '');
    // replace(): no deja la página protegida en el historial (el "atrás" no la reabre).
    location.replace(url);
  }

  /* ============================================================
     Renovación del token con el refresh_token
     ============================================================ */
  let renovando = null;
  function renovar() {
    const s = sesion();
    if (!s || !s.refresh_token) return Promise.resolve(null);
    if (renovando) return renovando;
    renovando = fetch(URL_BASE + '/auth/v1/token?grant_type=refresh_token', {
      method: 'POST',
      headers: { apikey: CLAVE_PUB, 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: s.refresh_token }),
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status))))
      .then((n) => {
        if (!n || !n.access_token) throw new Error('respuesta sin token');
        const nueva = Object.assign({}, s, n, {
          expires_at: ahora() + (Number(n.expires_in) || 3600),
        });
        guardar(nueva);
        return nueva;
      })
      .catch(() => null)
      .then((v) => { renovando = null; return v; });
    return renovando;
  }

  /* ============================================================
     Cierre de sesión
     ============================================================ */
  function salir(irAcceso) {
    const s = sesion();
    const fin = () => {
      borrar();
      location.replace(irAcceso === false ? RAIZ : ACCESO);
    };
    if (!s || !s.access_token) return fin();
    // Revoca el refresh_token en el servidor; si falla, igual limpiamos en local.
    fetch(URL_BASE + '/auth/v1/logout', {
      method: 'POST',
      headers: { apikey: CLAVE_PUB, Authorization: 'Bearer ' + s.access_token },
      keepalive: true,
    }).catch(function () {}).then(fin, fin);
  }

  /* ============================================================
     API pública
     ============================================================ */
  window.rowerSesion = {
    url: URL_BASE,
    clave: CLAVE_PUB,
    llave: LLAVE,
    raiz: RAIZ,
    acceso: ACCESO,
    sesion: sesion,
    viva: function () { return viva(sesion()); },
    usuario: function () { const s = sesion(); return (s && s.user) || null; },
    correo: function () { const u = this.usuario(); return (u && u.email) || ''; },
    token: function () { const s = sesion(); return (s && s.access_token) || null; },
    // Token utilizable: renueva antes de devolverlo si está a punto de vencer.
    tokenVivo: function () {
      const s = sesion();
      if (viva(s) && vence(s) - ANTICIPO > ahora()) return Promise.resolve(s.access_token);
      return renovar().then(function (n) { return (n && n.access_token) || (s && s.access_token) || null; });
    },
    renovar: renovar,
    salir: salir,
    guardar: guardar,
    borrar: borrar,
    destinoSeguro: destinoSeguro,
    irAlAcceso: irAlAcceso,
  };

  /* ============================================================
     La puerta
     ============================================================ */
  if (!proteger) return;

  const s = sesion();
  if (!viva(s)) {
    // Sin sesión utilizable aquí y ahora. La pantalla de acceso tiene el SDK
    // completo: si queda un refresh_token bueno, restaura y reenvía sin que
    // el usuario escriba nada; si no, pide credenciales.
    irAlAcceso(s ? 'vencida' : null);
    return;
  }

  // Sesión válida: la página sigue cargando. Si el token está por vencer,
  // se renueva de fondo para que una lectura larga no rebote al acceso.
  if (vence(s) - ANTICIPO <= ahora()) {
    // En las páginas que traen el SDK (admin, acceso) la renovación es suya:
    // si renovásemos los dos a la vez, el refresh_token rotado podría dejar al
    // SDK con uno viejo en memoria y hacerle cerrar la sesión.
    const cede = function () { if (!window.supabase) renovar(); };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', cede);
    } else {
      cede();
    }
  }
})();
