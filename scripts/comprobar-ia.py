# -*- coding: utf-8 -*-
"""Comprobaciones de la sección de IA de la Fase 2 (#/arquitectura).

La sección tiene un submenú: la órbita (Propuesta) y cuatro documentos que se
pintan con informe/fase2/ia/ia-doc.js en el mismo marco #aqMarco:
#/arquitectura/tecnico|politica|casos|prototipos[/<sección>].

Verifica: que cada pestaña cargue su página y quede marcada, que el índice y
las secciones coincidan con el dato, los enlaces profundos a una sección, que
el índice dentro del marco mueva el hash del manual, que la órbita siga
abriendo módulos por hash, que el tema siga al manual, que no haya scroll
horizontal en móvil, que la página sola ofrezca volver al manual y que al
imprimir se oculte el índice.

    python scripts/comprobar-ia.py           # contra http://localhost:8080
    ROMPER=1 python scripts/comprobar-ia.py  # debe fallar: espera el título equivocado

Credenciales: ver sesion_prueba.py. No escribe nada.
Sale con código 1 si algo falla, 2 si faltan credenciales.
"""
import io
import json
import os
import re
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

import sesion_prueba
from playwright.sync_api import sync_playwright

BASE = os.environ.get('ROWER_BASE', 'http://localhost:8080')
MANUAL = BASE + '/informe/fase2/informe-fase2.html'
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIR_IA = os.path.join(RAIZ, 'informe', 'fase2', 'ia')
DOCS = ['tecnico', 'politica', 'casos', 'prototipos']
fallos = []


def check(nombre, cond, detalle=''):
    print(('  OK   ' if cond else '  FALLA ') + nombre + (('  — ' + detalle) if detalle and not cond else ''))
    if not cond:
        fallos.append(nombre)


def dato(doc):
    """Título e ids de sección de <doc>-datos.js, leídos con Node (la fuente única)."""
    js = ("global.window={};require(%s);const D=window.IA_DOC;"
          "console.log(JSON.stringify({titulo:D.titulo,ids:D.secciones.map(s=>s.id)}))") % json.dumps(os.path.join(DIR_IA, doc + '-datos.js'))
    return json.loads(subprocess.run(['node', '-e', js], capture_output=True, text=True, encoding='utf-8', check=True).stdout)


def marco(pg, patron, espera=15000):
    """El frame de #aqMarco cuando su URL casa con `patron`, ya pintado."""
    pg.wait_for_function("p => { const f=document.querySelector('#aqMarco'); return f && new RegExp(p).test(f.contentWindow.location.href); }",
                         arg=patron, timeout=espera)
    f = pg.frame_locator('#aqMarco')
    fr = next(x for x in pg.frames if re.search(patron, x.url))
    return f, fr


def main():
    SES = sesion_prueba.exigir()
    datos = {d: dato(d) for d in DOCS}
    if os.environ.get('ROMPER'):
        datos['politica']['titulo'] = 'Título que no existe'
    with sync_playwright() as pw:
        nav = pw.chromium.launch()
        pg = sesion_prueba.pagina(nav, SES, viewport={'width': 1440, 'height': 900})
        errores = []
        pg.on('pageerror', lambda e: errores.append(str(e)))
        pg.on('console', lambda m: errores.append(m.text) if m.type == 'error' else None)

        print('\n--- Propuesta (órbita) ---')
        pg.goto(MANUAL + '#/arquitectura', wait_until='networkidle')
        marco(pg, r'arquitectura-ia\.html')
        activa = pg.evaluate("() => [...document.querySelectorAll('.aq-sub .on')].map(a => a.dataset.aq)")
        check('la pestaña Propuesta queda marcada', activa == [''], str(activa))

        for doc in DOCS:
            print('\n--- %s ---' % doc)
            pg.evaluate("h => location.hash = h", '#/arquitectura/' + doc)
            _, fr = marco(pg, r'ia/documento\.html\?d=' + doc)
            fr.wait_for_selector('.iad-sec', timeout=15000)
            activa = pg.evaluate("() => [...document.querySelectorAll('.aq-sub .on')].map(a => a.dataset.aq)")
            check('la pestaña queda marcada', activa == [doc], str(activa))
            h1 = fr.eval_on_selector('h1', 'e => e.textContent')
            check('el título es el del dato', h1 == datos[doc]['titulo'], '%r ≠ %r' % (h1, datos[doc]['titulo']))
            ids = fr.eval_on_selector_all('.iad-sec', 'l => l.map(s => s.dataset.id)')
            check('pinta todas las secciones del dato, en orden', ids == datos[doc]['ids'], '%d de %d' % (len(ids), len(datos[doc]['ids'])))
            toc = fr.eval_on_selector_all('.iad-toc a[data-id]', 'l => l.map(a => a.dataset.id)')
            check('el índice lista las mismas secciones', toc == ids)
            check('el título de la pestaña del navegador nombra el documento', datos[doc]['titulo'].split()[0] in pg.title(), pg.title())

        print('\n--- Enlace profundo e índice dentro del marco ---')
        pg.evaluate("h => location.hash = h", '#/arquitectura/tecnico/triangulo')
        _, fr = marco(pg, r'ia/documento\.html\?d=tecnico')
        fr.wait_for_function("() => location.hash === '#triangulo'", timeout=8000)
        pg.wait_for_timeout(400)
        top = fr.evaluate("() => Math.round(document.getElementById('sec-triangulo').getBoundingClientRect().top)")
        check('#/arquitectura/tecnico/triangulo lleva a la sección', -5 <= top <= 80, 'top=%s' % top)
        fr.click('.iad-toc a[data-id="nucleo"]')
        pg.wait_for_function("() => location.hash === '#/arquitectura/tecnico/nucleo'", timeout=5000)
        fr.wait_for_function("() => location.hash === '#nucleo'", timeout=5000)
        check('el índice del marco mueve el hash del manual', True)

        print('\n--- La órbita sigue abriendo por hash ---')
        pg.evaluate("h => location.hash = h", '#/arquitectura/m-espejo')
        _, fr = marco(pg, r'arquitectura-ia\.html')
        fr.wait_for_function("() => location.hash === '#m-espejo'", timeout=8000)
        check('#/arquitectura/m-espejo vuelve a la órbita con el módulo', True)

        print('\n--- Tema ---')
        pg.evaluate("h => location.hash = h", '#/arquitectura/politica')
        _, fr = marco(pg, r'ia/documento\.html\?d=politica')
        fr.wait_for_selector('.iad-sec')
        temas = []
        for t in ('oscuro', 'claro'):
            pg.evaluate("t => document.documentElement.setAttribute('data-tema', t)", t)
            pg.wait_for_timeout(150)
            temas.append(fr.evaluate("() => document.documentElement.getAttribute('data-theme')"))
        check('el documento sigue el tema del manual', temas == ['dark', 'light'], str(temas))

        check('sin errores de consola en el escritorio', not errores, ' | '.join(errores[:3]))

        print('\n--- Móvil (390 px) ---')
        movil = sesion_prueba.pagina(nav, SES, viewport={'width': 390, 'height': 844})
        movil.goto(MANUAL + '#/arquitectura/tecnico', wait_until='networkidle')
        for doc in DOCS:
            movil.evaluate("h => location.hash = h", '#/arquitectura/' + doc)
            _, fr = marco(movil, r'ia/documento\.html\?d=' + doc)
            fr.wait_for_selector('.iad-sec')
            ancho = fr.evaluate("() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]")
            check('sin scroll horizontal en %s' % doc, ancho[0] <= ancho[1] + 1, str(ancho))
        ancho = movil.evaluate("() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]")
        check('sin scroll horizontal en el manual', ancho[0] <= ancho[1] + 1, str(ancho))

        print('\n--- Página sola e impresión ---')
        sola = sesion_prueba.pagina(nav, SES, viewport={'width': 1280, 'height': 900})
        sola.goto(BASE + '/informe/fase2/ia/documento.html?d=politica', wait_until='networkidle')
        sola.wait_for_selector('.iad-sec')
        check('la página sola ofrece abrirla en el manual', sola.locator('.iad-fuera a').count() == 1)
        sola.emulate_media(media='print')
        visible = sola.evaluate("() => getComputedStyle(document.querySelector('.iad-toc')).display")
        check('al imprimir se oculta el índice', visible == 'none', visible)
        nav.close()

    print('\n%s' % ('TODO EN ORDEN' if not fallos else '%d FALLAS: %s' % (len(fallos), ', '.join(fallos))))
    sys.exit(1 if fallos else 0)


if __name__ == '__main__':
    main()
