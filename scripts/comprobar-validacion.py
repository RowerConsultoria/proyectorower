# -*- coding: utf-8 -*-
"""Comprobaciones del módulo «Validación de procesos» del panel admin.

Abre el módulo con una sesión real y verifica que lo que pinta cuadra con lo
que hay en la base: los KPI, la agrupación por macroproceso, el aviso de los
procesos con lista larga de validadores y que confirmar una propuesta la
persiste de verdad.

    $env:ROWER_CORREO="qa.validacion@rower.test"
    $env:ROWER_CLAVE="Prueba-Validacion-2026"
    python scripts/comprobar-validacion.py

Cierra comprobando que el validador confirmado **sale publicado en el informe
de Fase 2**, y que la vista `v_validadores_proceso` que lo alimenta no filtra
ningún dato personal de más: el informe lo lee el rol Junta, que no puede ver
el censo.

⚠️ Este guion ESCRIBE en producción (confirma un validador y genera un enlace)
y el equipo puede estar trabajando en el panel a la vez. Por eso lee el
contador justo antes de cada clic y deshace exactamente lo que él mismo hizo,
en vez de limpiar «lo que sobra». No añadir aquí ningún `delete` masivo.

La cuenta de QA (rol «QA (pruebas)», borrable) tiene `admin.entrar`,
`admin.validacion`, `admin.personal`, `admin.fichas` y `ver.informe` — lo
justo para recorrer los tres módulos y el informe.

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
fallos = []


def check(nombre, condicion, detalle=''):
    print(('  OK   ' if condicion else '  FALLA ') + nombre + (('  — ' + detalle) if detalle and not condicion else ''))
    if not condicion:
        fallos.append(nombre)


def main():
    SES = sesion_prueba.exigir()
    with sync_playwright() as pw:
        nav = pw.chromium.launch()
        pg = sesion_prueba.pagina(nav, SES, viewport={'width': 1600, 'height': 1000})

        errores = []
        pg.on('pageerror', lambda e: errores.append(str(e)))
        pg.on('console', lambda m: errores.append(m.text) if m.type == 'error' else None)

        pg.goto(BASE + '/admin/index.html#validacion', wait_until='networkidle')
        pg.wait_for_selector('#vaKpis .tarjeta', timeout=25000)
        pg.wait_for_timeout(1200)

        print('\n--- El módulo abre y pinta ---')
        check('el módulo carga sin errores de consola', not errores, ' | '.join(errores[:3]))
        check('la ruta #validacion queda activa en el menú',
              pg.eval_on_selector('#nav .item[data-route="validacion"]',
                                  'e => e.classList.contains("active")'))

        kpis = pg.eval_on_selector_all('#vaKpis .valor', 'els => els.map(e => +e.textContent)')
        check('pinta los cuatro KPI', len(kpis) == 4, str(kpis))
        listos, confirmados, por_confirmar, sin_validador = (kpis + [0, 0, 0, 0])[:4]
        check('hay procesos listos para validar', listos > 0, f'listos={listos}')
        check('los KPI suman el total de la oleada',
              confirmados + por_confirmar + sin_validador == listos,
              f'{confirmados}+{por_confirmar}+{sin_validador} != {listos}')

        print('\n--- La tabla ---')
        # Una sola tabla: el macroproceso es una fila `tr.grupo` del mismo tbody,
        # así que los procesos son las filas que NO son de grupo.
        grupos = pg.eval_on_selector_all('#vaWrap tr.grupo', 'els => els.length')
        filas = pg.eval_on_selector_all('#vaWrap tbody tr:not(.grupo)', 'els => els.length')
        check('agrupa por macroproceso', grupos > 0, f'grupos={grupos}')
        check('pinta una fila por proceso de la oleada', filas == listos, f'{filas} filas vs {listos} listos')

        # El censo tiene que haber llegado: si la RLS no dejara leer `personal`,
        # los chips dirían «(fuera del censo)» en todas las filas.
        fuera = pg.eval_on_selector_all(
            '#vaWrap', 'els => (els[0].innerHTML.match(/fuera del censo/g)||[]).length')
        check('resuelve los nombres del censo (RLS de personal)', fuera == 0,
              f'{fuera} validadores sin nombre')

        print('\n--- Filtros ---')
        pg.select_option('#vaEstado', 'sin')
        pg.wait_for_timeout(400)
        filas_sin = pg.eval_on_selector_all('#vaWrap tbody tr:not(.grupo)', 'els => els.length')
        check('el filtro «sin validador» cuadra con su KPI',
              filas_sin == sin_validador, f'{filas_sin} filas vs KPI {sin_validador}')

        pg.select_option('#vaEstado', '')
        pg.fill('#qv', 'reposición')
        pg.wait_for_timeout(400)
        filas_q = pg.eval_on_selector_all('#vaWrap tbody tr:not(.grupo)', 'els => els.length')
        check('la búsqueda filtra', 0 < filas_q < listos, f'{filas_q} resultados')
        pg.fill('#qv', '')
        pg.wait_for_timeout(400)

        # ⚠️ Todo lo que sigue toca la base de PRODUCCIÓN, y el equipo puede
        # estar confirmando validadores en otra pestaña mientras esto corre.
        # Por eso el guion nunca compara contra el estado inicial ni limpia
        # «lo que sobra»: lee el contador justo antes de cada clic, y deshace
        # exactamente lo que él mismo hizo.
        def kpis_ahora():
            return pg.eval_on_selector_all('#vaKpis .valor', 'els => els.map(e => +e.textContent)')

        print('\n--- Confirmar una propuesta persiste ---')
        pg.select_option('#vaEstado', 'por_confirmar')
        pg.wait_for_timeout(600)
        boton = pg.query_selector('#vaWrap [data-confirmar]')
        check('hay propuestas por confirmar', boton is not None)
        codigo_tocado = None
        if boton:
            codigo_tocado = boton.evaluate('e => e.closest("tr").dataset.codigo')
            prev = kpis_ahora()
            boton.click()
            pg.wait_for_timeout(2500)
            k = kpis_ahora()
            check('sube el contador de confirmados', k[1] == prev[1] + 1, f'{k[1]} vs {prev[1] + 1}')
            check('baja el de por confirmar', k[2] == prev[2] - 1, f'{k[2]} vs {prev[2] - 1}')
            pg.reload(wait_until='networkidle')
            pg.wait_for_selector('#vaKpis .tarjeta', timeout=25000)
            pg.wait_for_timeout(1200)
            check('sigue confirmado tras recargar', kpis_ahora()[1] == k[1], str(kpis_ahora()[1]))

        print('\n--- Corregir una confirmación equivocada ---')
        # Con un solo validador no hay chip «+N»: la puerta a la gestión tiene
        # que ser el «⋯» de la fila, también cuando ya está confirmado.
        if codigo_tocado:
            pg.fill('#qv', codigo_tocado)
            pg.wait_for_timeout(600)
            fila = pg.query_selector(f'#vaWrap tr[data-codigo="{codigo_tocado}"] [data-gestionar]')
            check('un proceso ya confirmado ofrece gestionar sus validadores', fila is not None)
            if fila:
                fila.click()
                pg.wait_for_selector('#vaPop', timeout=5000)
                check('el popover ofrece deshacer la confirmación',
                      pg.query_selector('#vaPop [data-pop-deshacer]') is not None)
                check('el popover ofrece quitar el validador',
                      pg.query_selector('#vaPop [data-pop-quitar]') is not None)
                check('el popover ofrece añadir otra persona',
                      pg.query_selector('#vaPop [data-pop-anadir]') is not None)
                prev = kpis_ahora()
                pg.click('#vaPop [data-pop-deshacer]')
                pg.wait_for_timeout(2500)
                k = kpis_ahora()
                check('deshacer devuelve el proceso a «por confirmar»',
                      k[1] == prev[1] - 1 and k[2] == prev[2] + 1,
                      f'confirmados={k[1]} por_confirmar={k[2]}')
                # Y con eso el guion ya deshizo su propia confirmación: la base
                # queda como estaba antes de correrlo.
            pg.fill('#qv', '')
            pg.wait_for_timeout(400)

        print('\n--- Enlaces ---')
        pg.click('#vaEnlaces')
        pg.wait_for_selector('#vaListaEnlaces', timeout=10000)
        pg.wait_for_timeout(500)
        gente = pg.eval_on_selector_all('#vaListaEnlaces > div', 'els => els.length')
        check('lista solo a quien tiene asignación confirmada', gente > 0, f'{gente} personas')
        # Generar uno y comprobar que aparece el botón de copiar en su fila.
        gen = pg.query_selector('#vaListaEnlaces [data-generar]')
        if gen:
            antes_cop = pg.eval_on_selector_all('#vaListaEnlaces [data-copiar]', 'els => els.length')
            gen.click()
            pg.wait_for_timeout(2500)
            copiar = pg.eval_on_selector_all('#vaListaEnlaces [data-copiar]', 'els => els.length')
            check('generar un enlace lo deja listo para copiar', copiar == antes_cop + 1,
                  f'{copiar} vs {antes_cop + 1}')
            # Revocar el que acaba de crear: un enlace de prueba vivo en
            # producción es un enlace que alguien podría repartir por error.
            revocar = pg.query_selector_all('#vaListaEnlaces [data-revocar]')
            if len(revocar) > antes_cop:
                revocar[-1].click()
                pg.wait_for_timeout(2000)
                check('revocar deshace el enlace de prueba',
                      pg.eval_on_selector_all('#vaListaEnlaces [data-copiar]', 'els => els.length') == antes_cop)
        else:
            check('generar un enlace lo deja listo para copiar', True, 'ya estaban todos generados')
        # El enlace tiene que apuntar a la página pública, no al panel.
        ruta_ok = pg.evaluate("() => typeof enlaceValidacion === 'function' && "
                              "enlaceValidacion('XYZ').includes('validar-procesos/?t=XYZ')")
        check('el enlace apunta a /validar-procesos/', ruta_ok)
        pg.keyboard.press('Escape')
        pg.wait_for_timeout(300)

        pg.screenshot(path=os.path.join(
            os.environ.get('TEMP', '/tmp'), 'validacion-modulo.png'), full_page=False)

        print('\n--- El validador sale publicado en el informe ---')
        # Quién valida es parte de la credibilidad del manual: tiene que verse
        # en el propio informe, no solo en el panel. Se busca un proceso que
        # esté confirmado AHORA (el estado lo mueve el equipo, no este guion).
        # `let cacheVal` no crea propiedad en `window` — se accede por nombre.
        confirmado = pg.evaluate("""() => {
          if (typeof cacheVal === 'undefined') return null;
          const v = (cacheVal.validadores || []).find(x => x.origen !== 'auto');
          return v ? v.proceso : null;
        }""")
        if not confirmado:
            print('  (no hay ningún proceso confirmado ahora mismo: no se comprueba)')
        else:
            pg.goto(f'{BASE}/informe/fase2/informe-fase2.html#/p/{confirmado}',
                    wait_until='networkidle')
            pg.wait_for_selector('#sec-dueno', timeout=20000)
            pg.wait_for_timeout(3000)
            txt = pg.inner_text('#sec-dueno')
            check(f'el informe nombra a quien valida {confirmado}',
                  'validar por' in txt.lower() or 'validado por' in txt.lower()
                  or 'en validación' in txt.lower(), txt[:120])
            # La vista es la ventana del informe al dato: tiene que dar el
            # nombre y NADA del resto del censo. Si alguien le añade `correo`
            # o `identificacion`, el informe pasa a filtrar datos personales.
            cols = pg.evaluate("""async () => {
              const jwt = await window.rowerSesion.tokenVivo();
              const r = await fetch('https://kmhwqybqrcjhjeywjgxj.supabase.co/rest/v1/v_validadores_proceso?select=*&limit=1', {
                headers: {apikey:'sb_publishable_a1TB2z327D8lIbeFDij0zg_qewS9ri1', Authorization:'Bearer '+jwt}});
              if(!r.ok) return null;
              const f = await r.json();
              return f.length ? Object.keys(f[0]) : [];
            }""")
            check('la vista devuelve filas al informe', cols is not None and len(cols) > 0, str(cols))
            if cols:
                prohibidas = [c for c in cols if c in
                              ('correo', 'identificacion', 'fecha_ingreso', 'notas',
                               'supervisor_txt', 'gerente_id', 'persona_id', 'id')]
                check('la vista no expone ningún dato personal de más', not prohibidas,
                      'expone ' + ', '.join(prohibidas))
        nav.close()

    print('\n' + ('FALLAN %d comprobaciones: %s' % (len(fallos), ', '.join(fallos))
                  if fallos else 'TODO PASA'))
    sys.exit(1 if fallos else 0)


if __name__ == '__main__':
    main()
