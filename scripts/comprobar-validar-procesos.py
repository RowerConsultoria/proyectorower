# -*- coding: utf-8 -*-
"""Comprobaciones de validar-procesos/index.html, la página que abre el gerente.

Es una página PÚBLICA (sin sesión de Supabase Auth): el navegador entra con el
token del enlace y todo lo resuelve la Edge Function `validacion`. Por eso este
guion NO usa sesion_prueba — si hiciera falta una sesión, la página estaría mal.

Recorre lo que haría un gerente: abre el enlace, ve su bandeja, entra a un
proceso, marca veredictos, escribe una observación y envía. Después comprueba
contra la base que lo enviado quedó guardado.

    export ROWER_TOKEN_VALIDACION="<token de un enlace vivo>"
    python scripts/comprobar-validar-procesos.py

Sale con código 1 si algo falla, 2 si falta el token.
"""
import io
import json
import os
import sys
import urllib.request

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

from playwright.sync_api import sync_playwright

BASE = os.environ.get('ROWER_BASE', 'http://localhost:8080')
TOKEN = os.environ.get('ROWER_TOKEN_VALIDACION', '').strip()
MGMT = os.environ.get('SUPABASE_ACCESS_TOKEN', '').strip()
REF = 'kmhwqybqrcjhjeywjgxj'
fallos = []


def check(nombre, cond, detalle=''):
    print(('  OK   ' if cond else '  FALLA ') + nombre + (('  — ' + detalle) if detalle and not cond else ''))
    if not cond:
        fallos.append(nombre)


def sql(q):
    r = urllib.request.Request(
        f'https://api.supabase.com/v1/projects/{REF}/database/query',
        data=json.dumps({'query': q}).encode(),
        headers={'Authorization': f'Bearer {MGMT}', 'Content-Type': 'application/json'},
        method='POST')
    return json.loads(urllib.request.urlopen(r).read().decode())


def main():
    if not TOKEN:
        print('Falta ROWER_TOKEN_VALIDACION (el token de un enlace vivo).', file=sys.stderr)
        sys.exit(2)

    with sync_playwright() as pw:
        nav = pw.chromium.launch()
        pg = nav.new_page(viewport={'width': 1280, 'height': 1000})
        errores = []
        pg.on('pageerror', lambda e: errores.append(str(e)))
        pg.on('console', lambda m: errores.append(m.text) if m.type == 'error' else None)

        print('\n--- La bandeja ---')
        pg.goto(f'{BASE}/validar-procesos/?t={TOKEN}', wait_until='networkidle')
        pg.wait_for_selector('.proc-row', timeout=25000)
        check('abre sin errores de consola', not errores, ' | '.join(errores[:3]))
        check('no pide login (no rebota a /acceso/)', '/acceso/' not in pg.url, pg.url)
        filas = pg.eval_on_selector_all('.proc-row', 'e => e.length')
        check('lista los procesos del enlace', filas > 0, f'{filas} filas')
        check('saluda por su nombre', 'Hola,' in pg.inner_text('.card'))

        print('\n--- Un proceso ---')
        codigo = pg.eval_on_selector('.proc-row', 'e => e.dataset.codigo')
        pg.click('.proc-row')
        pg.wait_for_selector('.seccion', timeout=20000)
        secs = pg.eval_on_selector_all('.seccion', 'e => e.length')
        check('pinta las 6 secciones del manual', secs == 6, f'{secs} secciones')
        acts = pg.eval_on_selector_all('.acts li', 'e => e.length')
        check('lista las actividades del flujo', acts > 0, f'{acts} actividades')
        svg = pg.eval_on_selector_all('#flujograma svg', 'e => e.length')
        check('dibuja el flujograma BPMN', svg > 0)
        check('el avance arranca en cero', '0 de 6' in pg.inner_text('#avance'))

        print('\n--- Responder ---')
        # Todo correcto salvo el flujo, que va con observación.
        for b in pg.query_selector_all('.veredicto button[data-v="ok"]'):
            b.click()
        pg.click('.veredicto button[data-sec="flujo"][data-v="observaciones"]')
        check('el avance cuenta los 6 bloques', '6 de 6' in pg.inner_text('#avance'))

        # Comentario anclado a la primera actividad.
        pg.click('.acts li .coment-btn')
        pg.fill('.acts li textarea', 'El paso 1 hoy lo dispara Compras, no Logística.')
        check('el icono marca que hay comentario',
              pg.eval_on_selector('.acts li .coment-btn', 'e => e.classList.contains("tiene")'))

        pg.on('dialog', lambda d: d.accept())
        pg.click('#enviar')
        pg.wait_for_selector('.proc-row', timeout=20000)
        estado = pg.eval_on_selector(f'.proc-row[data-codigo="{codigo}"] .estado-chip', 'e => e.textContent')
        check('vuelve a la bandeja con el proceso marcado como enviado',
              'enviado' in estado, estado)

        pg.screenshot(path=os.path.join(os.environ.get('TEMP', '/tmp'), 'validar-procesos.png'))
        nav.close()

    print('\n--- Lo enviado llegó a la base ---')
    if MGMT:
        filas = sql("select proceso, estado, jsonb_array_length(comentarios) as coments, "
                    "veredictos->>'flujo' as flujo from validaciones order by actualizado_en desc limit 1;")
        check('hay una validación enviada', bool(filas) and filas[0]['estado'] == 'enviada',
              str(filas))
        if filas:
            check('guardó la observación', filas[0]['coments'] == 1, str(filas[0]['coments']))
            check('guardó el veredicto del flujo', filas[0]['flujo'] == 'observaciones', str(filas[0]['flujo']))
    else:
        print('  (sin SUPABASE_ACCESS_TOKEN: no se comprueba la base)')

    print('\n' + ('FALLAN %d: %s' % (len(fallos), ', '.join(fallos)) if fallos else 'TODO PASA'))
    sys.exit(1 if fallos else 0)


if __name__ == '__main__':
    main()
