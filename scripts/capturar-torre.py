# -*- coding: utf-8 -*-
"""Regenera las capturas de la torre para el deck del informe.

Uso:  levantar el servidor (python -m http.server 8080 desde la raíz) y correr
      python scripts/capturar-torre.py

Captura DOS vistas porque las dos juntas son el argumento: la torre propuesta
con la corriente subiendo, y el modo «hoy», donde el dato nace y no llega.

La escena es WebGL. En un equipo sin GPU se fuerza el render por software con
SwiftShader — más lento, pero el fotograma sale igual, que es lo que importa
para una lámina estática.
"""
import io
import os
import sys

import sesion_prueba          # siembra la sesión: el aplicativo está detrás de /acceso/

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

from playwright.sync_api import sync_playwright

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEST = os.path.join(RAIZ, 'informe', 'fase1', 'img-arquitectura')
os.makedirs(DEST, exist_ok=True)

URL = 'http://localhost:8080/informe/fase1/arquitectura-ia-kenex.html'
ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']


def main():
    with sync_playwright() as pw:
        b = pw.chromium.launch(args=ARGS)
        p = sesion_prueba.pagina(b, sesion_prueba.exigir(), viewport={'width': 1600, 'height': 900})
        errs = []
        p.on('pageerror', lambda e: errs.append(str(e)[:160]))
        p.goto(URL, wait_until='networkidle')
        p.wait_for_timeout(4500)

        # el flujo se congela: una lámina con la corriente a medio trazo se ve sucia
        p.click('#pausa')
        p.wait_for_timeout(700)

        tomas = [('torre', None), ('hoy', '#modo')]
        for nombre, boton in tomas:
            if boton:
                p.click(boton)
                p.wait_for_timeout(2200)
            f = os.path.join(DEST, nombre + '.jpg')
            p.screenshot(path=f, type='jpeg', quality=88)
            print('  %-8s %d KB' % (nombre, os.path.getsize(f) // 1024))

        print('errores:', errs or 'ninguno')
        b.close()
    return 0


if __name__ == '__main__':
    sys.exit(main())
