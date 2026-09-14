# -*- coding: utf-8 -*-
"""Comprobaciones del módulo «Censo y enlaces» del panel admin.

El censo lleva 436 personas: el módulo es una tabla densa y lo que se verifica
aquí es sobre todo que siga siéndolo. Antes de sep-2026 la fila medía 56 px
—el área («JUNTA DIRECTIVA / DIRECCION GENERAL / GERENCIA DE MARKETING»)
envolvía a tres líneas— y cabían diez personas en pantalla.

    $env:ROWER_CORREO="qa.validacion@rower.test"
    $env:ROWER_CLAVE="Prueba-Validacion-2026"
    python scripts/comprobar-censo.py

⚠️ Este guion NO escribe nada: solo lee, filtra y mide. El censo es dato real
de personas de Kenex y el equipo puede estar editándolo en otra pestaña.

Sale con código 1 si algo falla, 2 si faltan credenciales.
"""
import io
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

import sesion_prueba
from playwright.sync_api import sync_playwright

BASE = os.environ.get('ROWER_BASE', 'http://localhost:8080')
ALTO_MAX_COMPACTA = 40      # Carbon: fila compacta de 32 px + borde y holgura
fallos = []


def check(nombre, cond, detalle=''):
    print(('  OK   ' if cond else '  FALLA ') + nombre + (('  — ' + detalle) if detalle and not cond else ''))
    if not cond:
        fallos.append(nombre)


def main():
    SES = sesion_prueba.exigir()
    with sync_playwright() as pw:
        nav = pw.chromium.launch()
        pg = sesion_prueba.pagina(nav, SES, viewport={'width': 1600, 'height': 1000})
        errores = []
        pg.on('pageerror', lambda e: errores.append(str(e)))
        pg.on('console', lambda m: errores.append(m.text) if m.type == 'error' else None)

        pg.goto(BASE + '/admin/index.html#personal', wait_until='networkidle')
        pg.wait_for_selector('#perWrap tbody tr', timeout=25000)
        pg.wait_for_timeout(2000)

        def medir():
            return pg.evaluate("""() => {
              const tr=[...document.querySelectorAll('#perWrap tbody tr:not(.fila-grupo)')];
              const gr=[...document.querySelectorAll('#perWrap tr.fila-grupo')];
              return {
                alto: tr.length ? Math.round(tr[0].getBoundingClientRect().height) : 0,
                altoGrupo: gr.length ? Math.round(gr[0].getBoundingClientRect().height) : 0,
                filas: tr.length,
                conteo: (document.querySelector('#perConteo')||{}).textContent || '',
              };
            }""")

        print('\n--- Carga ---')
        check('el módulo carga sin errores de consola', not errores, ' | '.join(errores[:3]))
        m = medir()
        check('lista el censo', m['filas'] > 100, f"{m['filas']} filas")
        check('muestra el conteo de resultados', 'persona' in m['conteo'], m['conteo'])

        print('\n--- Densidad ---')
        # Arranca en la preferencia guardada; se fuerza compacta para medir.
        if 'compacta' not in pg.inner_text('#perDens'):
            pg.click('#perDens'); pg.wait_for_timeout(600)
        m = medir()
        check(f"la fila compacta no pasa de {ALTO_MAX_COMPACTA} px",
              0 < m['alto'] <= ALTO_MAX_COMPACTA, f"{m['alto']} px")
        check('la fila de grupo no es más alta que las de datos',
              m['altoGrupo'] <= m['alto'] + 6, f"grupo {m['altoGrupo']} px vs fila {m['alto']} px")
        compacta = m['alto']

        pg.click('#perDens'); pg.wait_for_timeout(600)
        m2 = medir()
        check('el modo cómodo da más aire', m2['alto'] > compacta, f"{m2['alto']} px vs {compacta} px")
        check('en cómoda aparece el correo bajo el nombre',
              pg.eval_on_selector_all('#perWrap .solo-comoda', 'els => els.some(e => e.offsetParent !== null)'))

        # La preferencia es del usuario, no del módulo: tiene que sobrevivir.
        pg.reload(wait_until='networkidle')
        pg.wait_for_selector('#perWrap tbody tr', timeout=25000)
        pg.wait_for_timeout(1800)
        check('la densidad elegida sobrevive a recargar',
              'cómoda' in pg.inner_text('#perDens'), pg.inner_text('#perDens'))
        pg.click('#perDens'); pg.wait_for_timeout(600)

        print('\n--- Nada se sale de su celda ---')
        desborde = pg.evaluate("""() => {
          const tds=[...document.querySelectorAll('#perWrap tbody tr:not(.fila-grupo) td.recorta')];
          return tds.filter(td => td.scrollWidth > td.clientWidth + 1 && !td.title).length;
        }""")
        check('toda celda recortada lleva su texto completo en `title`', desborde == 0,
              f'{desborde} celdas recortadas sin title')
        ancho = pg.evaluate("""() => {
          const t=document.querySelector('#perWrap table');
          const e=document.querySelector('#perWrap .tabla-envoltura');
          return t && e ? t.scrollWidth - e.clientWidth : 0;
        }""")
        check('la tabla cabe a lo ancho sin scroll horizontal', ancho <= 2, f'{ancho} px de más')

        print('\n--- Filtros ---')
        pg.fill('#qp', 'gerente')
        pg.wait_for_timeout(700)
        m3 = medir()
        check('la búsqueda filtra y el conteo lo dice',
              ' de ' in m3['conteo'] and m3['filas'] < m['filas'], m3['conteo'])
        check('aparece el chip del filtro activo',
              pg.eval_on_selector_all('#perChips .filtro-activo', 'e => e.length') == 1)
        pg.click('#perChips [data-limpiar-per]')
        pg.wait_for_timeout(700)
        check('quitar el chip restaura la lista completa',
              'persona' in medir()['conteo'], medir()['conteo'])

        print('\n--- La vista de árbol sigue viva ---')
        pg.click('#vistaArbol')
        pg.wait_for_timeout(1200)
        nodos = pg.eval_on_selector_all('#perWrap *[class*="arbol"], #perWrap li, #perWrap .nodo',
                                        'els => els.length')
        check('el árbol de jerarquía pinta algo', nodos > 0, f'{nodos} nodos')
        pg.click('#vistaTabla')
        pg.wait_for_timeout(900)
        check('volver a la tabla la repinta', medir()['filas'] > 100)

        print('\n--- La ficha de una persona abre ---')
        pg.click('#perWrap tbody tr:not(.fila-grupo)')
        pg.wait_for_timeout(1200)
        check('el modal de la persona se abre',
              pg.eval_on_selector('#perModalFondo', 'e => e.classList.contains("on")'))
        check('sigue sin errores de consola al final', not errores, ' | '.join(errores[:3]))

        pg.keyboard.press('Escape')
        pg.wait_for_timeout(400)
        pg.screenshot(path=os.path.join(os.environ.get('TEMP', '/tmp'), 'censo-modulo.png'))
        nav.close()

    print('\n' + ('FALLAN %d: %s' % (len(fallos), ', '.join(fallos)) if fallos else 'TODO PASA'))
    sys.exit(1 if fallos else 0)


if __name__ == '__main__':
    main()
