# -*- coding: utf-8 -*-
"""Validador HTML tolerante del equipo — Proyecto Rower.

Criterio de aprobación: la pila de etiquetas abiertas queda VACÍA al final y no
hay cierres huérfanos. Es tolerante a propósito: el informe usa etiquetas de
cierre opcional (<li>, <p>, <td>…) y llenarlo de cierres explícitos solo para
contentar a un validador estricto haría el archivo peor, no mejor.

⚠️ Excluye el contenido de los atributos `srcdoc`: el diagrama de arquitectura
va embebido ahí y lleva etiquetas literales que NO son del documento. Es la
lección del srcdoc, anotada en CLAUDE.md.

Uso:
    python scripts/validar-html.py                 # todos los HTML del repo
    python scripts/validar-html.py ruta/a/uno.html # solo esos

Sale con código 1 si algo no valida, para poder encadenarlo antes de un commit.
"""
import io
import os
import re
import sys
from html.parser import HTMLParser

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Etiquetas sin cierre. Se incluyen las de SVG que aparecen en los diagramas.
VACIOS = {
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
    'param', 'source', 'track', 'wbr',
    'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse', 'use',
    'stop', 'image', 'animate', 'feoffset', 'fegaussianblur', 'feblend',
}

# Etiquetas cuyo cierre es opcional en HTML: que queden abiertas no es un error.
OPCIONALES = {'li', 'p', 'td', 'th', 'tr', 'option', 'thead', 'tbody', 'tfoot', 'dt', 'dd'}


class Tolerante(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.pila = []
        self.errores = []

    def handle_starttag(self, tag, attrs):
        if tag in VACIOS:
            return
        self.pila.append((tag, self.getpos()[0]))

    def handle_startendtag(self, tag, attrs):
        pass  # <tag/> se abre y se cierra en el sitio

    def handle_endtag(self, tag):
        if tag in VACIOS:
            return
        for i in range(len(self.pila) - 1, -1, -1):
            if self.pila[i][0] == tag:
                colgando = [t for t, _ in self.pila[i + 1:] if t not in OPCIONALES]
                if colgando:
                    self.errores.append(
                        'línea %d: </%s> cierra por encima de %s' %
                        (self.getpos()[0], tag, ', '.join(colgando)))
                del self.pila[i:]
                return
        self.errores.append('línea %d: </%s> sin apertura' % (self.getpos()[0], tag))


def valida(ruta):
    with open(ruta, encoding='utf-8') as f:
        s = f.read()
    s = re.sub(r'srcdoc="(?:[^"\\]|\\.)*"', 'srcdoc=""', s, flags=re.S)

    p = Tolerante()
    p.feed(s)
    resto = [t for t, _ in p.pila if t not in OPCIONALES]
    ok = not resto and not p.errores

    rel = os.path.relpath(ruta, RAIZ)
    print('  %s %s' % ('OK  ' if ok else 'MAL ', rel))
    if resto:
        print('        quedan abiertas: %s' % ', '.join(resto))
    for e in p.errores[:8]:
        print('        %s' % e)
    if len(p.errores) > 8:
        print('        …y %d más' % (len(p.errores) - 8))
    return ok


def todos_los_html():
    fuera = {'node_modules', '.git', 'img', 'img-sistema'}
    out = []
    for base, dirs, ficheros in os.walk(RAIZ):
        dirs[:] = [d for d in dirs if d not in fuera and not d.startswith('.')]
        for f in ficheros:
            if f.endswith('.html'):
                out.append(os.path.join(base, f))
    return sorted(out)


def main():
    rutas = [os.path.abspath(a) for a in sys.argv[1:]] or todos_los_html()
    print('=== validador HTML tolerante · %d archivo(s) ===' % len(rutas))
    ok = all([valida(r) for r in rutas])
    print('\n%s' % ('TODO VALIDA' if ok else 'HAY ARCHIVOS QUE NO VALIDAN'))
    return 0 if ok else 1


if __name__ == '__main__':
    sys.exit(main())
