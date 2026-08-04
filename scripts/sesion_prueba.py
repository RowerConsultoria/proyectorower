# -*- coding: utf-8 -*-
"""Siembra una sesión de Supabase Auth en el navegador de los guiones Playwright.

Desde el 04-ago-2026 todo el aplicativo vive detrás de `/acceso/` (ver
`supabase/sesion.js`), así que un Playwright que entre en frío solo ve la
pantalla de login. Este módulo pide un token con las credenciales del entorno y
lo deja en `localStorage` antes de que la página corra su primer script — que es
literalmente lo que hace la pantalla de acceso cuando alguien entra a mano.

Credenciales (nunca en el repositorio):
    PowerShell:  $env:ROWER_CORREO="tu@correo"; $env:ROWER_CLAVE="tu clave"
    Git Bash:    export ROWER_CORREO="tu@correo" ROWER_CLAVE="tu clave"

Uso desde un guion:
    import sesion_prueba
    SES = sesion_prueba.exigir()                      # una vez, al arrancar
    p = sesion_prueba.pagina(nav, SES, viewport={...})  # en vez de nav.new_page()
"""
import io
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def _proyecto():
    """(url, ref, clave publishable) leídos de supabase/cliente.js."""
    c = io.open(os.path.join(RAIZ, 'supabase', 'cliente.js'), encoding='utf-8').read()
    m = re.search(r'https://([\w-]+)\.supabase\.co', c)
    k = re.search(r"['\"](sb_publishable_[\w-]+)['\"]", c)
    if not m or not k:
        raise RuntimeError('no pude leer URL/clave de supabase/cliente.js')
    return m.group(0), m.group(1), k.group(1)


def token(correo=None, clave=None):
    """Inicia sesión y devuelve {'llave', 'sesion'} con el formato de supabase-js.

    Devuelve None si no hay credenciales en el entorno.
    """
    correo = correo or os.environ.get('ROWER_CORREO') or os.environ.get('SUPABASE_CORREO')
    clave = clave or os.environ.get('ROWER_CLAVE') or os.environ.get('SUPABASE_CLAVE')
    if not correo or not clave:
        return None

    url, ref, publica = _proyecto()
    cuerpo = json.dumps({'email': correo, 'password': clave}).encode('utf-8')
    pet = urllib.request.Request(
        url + '/auth/v1/token?grant_type=password', data=cuerpo,
        headers={'apikey': publica, 'Content-Type': 'application/json'}, method='POST')
    with urllib.request.urlopen(pet, timeout=45) as o:
        s = json.loads(o.read().decode('utf-8'))
    s['expires_at'] = int(time.time()) + int(s.get('expires_in') or 3600)
    return {'llave': 'sb-%s-auth-token' % ref, 'sesion': s}


def exigir():
    """Como token(), pero corta el guion con un mensaje claro si no hay acceso."""
    try:
        s = token()
    except urllib.error.HTTPError as e:
        print('\n  NO PUDE ENTRAR: HTTP %s %s' % (e.code, e.read().decode('utf-8', 'replace')[:200]))
        print('  Revisa ROWER_CORREO / ROWER_CLAVE.')
        sys.exit(2)
    except Exception as e:                                   # red caída, cliente.js movido…
        print('\n  NO PUDE ENTRAR: %s' % e)
        sys.exit(2)
    if not s:
        print('\n  FALTAN CREDENCIALES: define ROWER_CORREO y ROWER_CLAVE en el entorno.')
        print('  El aplicativo está detrás de /acceso/ y el navegador de pruebas')
        print('  necesita sesión, igual que una persona.')
        print('    PowerShell:  $env:ROWER_CORREO="tu@correo"; $env:ROWER_CLAVE="tu clave"')
        sys.exit(2)
    print('· sesión sembrada como %s' % (s['sesion'].get('user', {}).get('email') or '¿?'))
    return s


def guion(ses):
    """El JS que siembra la sesión (para add_init_script)."""
    return 'try{localStorage.setItem(%s,%s)}catch(e){}' % (
        json.dumps(ses['llave']), json.dumps(json.dumps(ses['sesion'])))


def pagina(nav, ses, **kw):
    """Página con la sesión ya puesta. Sustituye a nav.new_page(**kw)."""
    ctx = nav.new_context(**kw)
    if ses:
        ctx.add_init_script(guion(ses))
    return ctx.new_page()


def sembrar(ctx, ses):
    """Siembra la sesión en un contexto ya creado (antes de navegar)."""
    if ses:
        ctx.add_init_script(guion(ses))
    return ctx
