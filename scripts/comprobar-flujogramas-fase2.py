# -*- coding: utf-8 -*-
"""Comprueba sobre el DOM que los flujogramas de Fase 2 se LEAN, no solo que el
dato sea coherente (de eso se ocupa verificar-diagramas-fase2.js).

Tres defectos que se cobraron una revisión de consultor y que la comprobación por
dato no ve, porque son de trazado:

  1. Un rombo cuyas dos ramas aterrizan en la misma coordenada: una etiqueta tapa
     a la otra y el rombo parece tener una sola salida.
  2. Una etiqueta lejos de su propio rombo (iba al punto medio del trazado, que en
     una rama larga cae sobre otro nodo).
  3. Una arista que cruza por dentro de una caja intermedia: su flecha queda
     escondida detrás y la rama parece no existir.
  4. Un texto que se sale de su figura.

Aparte, avisa de las preguntas que no caben en su rombo y salen recortadas. Eso no
es un fallo del motor sino del enunciado -una pregunta de noventa caracteres no es
la etiqueta de una compuerta, es una frase-, así que se lista para acortarlo pero
no tumba la comprobación.

Uso:  python scripts/comprobar-flujogramas-fase2.py [prefijo]
Sin prefijo recorre todo el manual. Sale con código 1 si algo falla.
"""
from __future__ import print_function
import os
import re
import shutil
import subprocess
import sys
import tempfile

# la consola de Windows viene en cp1252 y el texto del manual no cabe ahi: sin
# esto, un simbolo cualquiera del contenido tumba la comprobacion al imprimir
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print('Falta Playwright:  pip install playwright  &&  playwright install chromium')
    sys.exit(2)

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
F2 = os.path.join(RAIZ, 'informe', 'fase2')

# margen de holgura, en px del lienzo del SVG
LEJOS = 170          # distancia máxima admitida entre una etiqueta y su rombo
JUNTAS = 30          # separación mínima entre dos etiquetas del mismo rombo
DENTRO = 6           # cuánto tiene que entrar una arista en una caja para contar

MEDIR = """() => {
  const svg = document.querySelector('.fx-svg');
  if (!svg) return null;
  const caja = e => { const b = e.getBBox(); return {x:b.x, y:b.y, w:b.width, h:b.height,
                                                    cx:b.x+b.width/2, cy:b.y+b.height/2}; };
  return {
    rombos: [...svg.querySelectorAll('path.fx-decision')].map(caja),
    // texto de cada rombo frente a la figura que lo contiene
    textos: [...svg.querySelectorAll('path.fx-decision')].map(e => {
      const b = e.getBBox();
      const dx = b.width / 2, dy = b.height / 2, cx = b.x + dx, cy = b.y + dy;
      let fuera = 0, corte = false, t = '';
      [...svg.querySelectorAll('text.fx-nodo-t')].forEach(x => {
        const px = +x.getAttribute('x'), py = +x.getAttribute('y');
        if (Math.abs(px - cx) > 4 || py < b.y - 4 || py > b.y + b.height + 4) return;
        t += x.textContent + ' ';
        if (/…$/.test(x.textContent)) corte = true;
        const r = x.getBBox();
        // dentro de un rombo, a la altura py cabe un ancho proporcional a lo que
        // queda hasta el vértice: |x-cx|/dx + |y-cy|/dy <= 1
        const libre = dx * (1 - Math.min(1, (Math.abs(py - cy) + 4) / dy));
        if (r.width / 2 > libre) fuera = Math.max(fuera, Math.round(r.width / 2 - libre));
      });
      return {t: t.trim(), fuera, corte};
    }),
    nodos:  [...svg.querySelectorAll('rect.fx-nodo, path.fx-decision, circle.fx-nodo')].map(caja),
    etqs:   [...svg.querySelectorAll('.fx-etq')].map(t => ({
              t: t.textContent, x: +t.getAttribute('x'), y: +t.getAttribute('y') })),
    // cada arista, como la lista de vértices de su trazado ortogonal
    rutas:  [...svg.querySelectorAll('path.fx-arista')].map(p => {
              const d = p.getAttribute('d');
              const n = d.match(/-?\\d+(?:\\.\\d+)?/g).map(Number);
              const pts = []; let x = n[0], y = n[1]; pts.push({x, y});
              const ops = d.match(/[MHVhv]\\s*-?\\d+(?:\\.\\d+)?(?:\\s*,\\s*-?\\d+(?:\\.\\d+)?)?/g) || [];
              ops.slice(1).forEach(op => {
                const k = op[0], v = parseFloat(op.slice(1).replace(/[\\s,].*$/, ''));
                if (k === 'H') x = v; else if (k === 'V') y = v;
                else if (k === 'h') x += v; else if (k === 'v') y += v;
                pts.push({x, y});
              });
              return pts;
            })
  };
}"""


def dist(a, b):
    return ((a['x'] - b['x']) ** 2 + (a['y'] - b['y']) ** 2) ** 0.5


def cruza(pts, c):
    """¿Algún tramo del trazado pasa por dentro de la caja c?"""
    x0, x1 = c['x'] + DENTRO, c['x'] + c['w'] - DENTRO
    y0, y1 = c['y'] + DENTRO, c['y'] + c['h'] - DENTRO
    for i in range(len(pts) - 1):
        a, b = pts[i], pts[i + 1]
        if abs(a['y'] - b['y']) < 0.5:                      # tramo horizontal
            if y0 <= a['y'] <= y1 and min(a['x'], b['x']) < x1 and max(a['x'], b['x']) > x0:
                return True
        elif abs(a['x'] - b['x']) < 0.5:                    # tramo vertical
            if x0 <= a['x'] <= x1 and min(a['y'], b['y']) < y1 and max(a['y'], b['y']) > y0:
                return True
    return False


def copia_sin_guardia():
    tmp = tempfile.mkdtemp()
    dst = os.path.join(tmp, 'f2')
    os.makedirs(dst)
    for f in os.listdir(F2):
        if f.endswith(('.js', '.html')):
            shutil.copy(os.path.join(F2, f), dst)
    p = os.path.join(dst, 'informe-fase2.html')
    h = open(p, encoding='utf-8').read()
    h = re.sub(r'<script[^>]*sesion\.js[^>]*>\s*</script>', '', h)
    open(p, 'w', encoding='utf-8').write(h)
    return tmp, 'file:///' + p.replace(os.sep, '/')


def codigos(prefijo):
    js = ("global.window={};require(%r);"
          "var M=window.MANUAL_CONTENIDO,o=[];"
          "Object.keys(M).forEach(function(p){if(!M[p].procesos)return;"
          "Object.keys(M[p].procesos).forEach(function(k){"
          "var f=M[p].procesos[k].flujo;"
          "if(f&&f.diagrama&&f.diagrama.nodos&&f.diagrama.nodos.length)o.push(k);});});"
          "console.log(o.join(' '));") % os.path.join(F2, 'manual-contenido.js').replace('\\', '/')
    out = subprocess.check_output(['node', '-e', js], cwd=RAIZ).decode('utf-8').split()
    if prefijo:
        out = [c for c in out if c.split('.')[0] == prefijo]
    return out


def main():
    prefijo = sys.argv[1] if len(sys.argv) > 1 else None
    procs = codigos(prefijo)
    if not procs:
        print('No hay flujogramas que revisar%s.' % (' para el macro ' + prefijo if prefijo else ''))
        return 1

    fallos, avisos = [], []
    tmp, url = copia_sin_guardia()
    try:
        with sync_playwright() as pw:
            nav = pw.chromium.launch()
            pg = nav.new_page(viewport={'width': 1600, 'height': 1000})
            for cod in procs:
                pg.goto(url + '#/p/' + cod)
                pg.wait_for_timeout(450)
                r = pg.evaluate(MEDIR)
                if not r or not r['rombos']:
                    continue

                # 1 y 2 — cada etiqueta, junto a su rombo y sin tapar a su hermana
                por_rombo = {}
                for e in r['etqs']:
                    k = min(range(len(r['rombos'])), key=lambda i: dist(e, {'x': r['rombos'][i]['cx'],
                                                                           'y': r['rombos'][i]['cy']}))
                    q = r['rombos'][k]
                    d = dist(e, {'x': q['cx'], 'y': q['cy']})
                    if d > LEJOS:
                        fallos.append('%s :: ETIQUETA SUELTA — "%s" está a %d px de su rombo'
                                      % (cod, e['t'], round(d)))
                    por_rombo.setdefault(k, []).append(e)
                for k, es in por_rombo.items():
                    for i in range(len(es)):
                        for j in range(i + 1, len(es)):
                            if dist(es[i], es[j]) < JUNTAS:
                                fallos.append('%s :: ETIQUETAS SUPERPUESTAS — "%s" y "%s" en el mismo punto'
                                              % (cod, es[i]['t'], es[j]['t']))
                for k in range(len(r['rombos'])):
                    if len(por_rombo.get(k, [])) < 2:
                        fallos.append('%s :: ROMBO SIN SUS DOS SALIDAS ROTULADAS (rombo %d)' % (cod, k + 1))

                # 4 — el texto del rombo, dentro de su figura y sin recortar
                for d in (r.get('textos') or []):
                    if d['fuera'] > 2:
                        fallos.append('%s :: TEXTO FUERA DE SU ROMBO — "%s" se sale %d px'
                                      % (cod, d['t'][:44], d['fuera']))
                    if d['corte']:
                        avisos.append('%s :: pregunta recortada — "%s"' % (cod, d['t'][:56]))

                # 3 — ninguna arista por dentro de una caja
                for pts in r['rutas']:
                    for c in r['nodos']:
                        extremo = any(dist(p, {'x': c['cx'], 'y': c['cy']}) < max(c['w'], c['h']) / 2 + 2
                                      for p in (pts[0], pts[-1]))
                        if extremo:
                            continue
                        if cruza(pts, c):
                            fallos.append('%s :: ARISTA ATRAVIESA UN NODO — su flecha queda tapada' % cod)
                            break
            nav.close()
    finally:
        shutil.rmtree(tmp, ignore_errors=True)

    unicos = sorted(set(fallos))
    avis = sorted(set(avisos))
    ambito = 'macro ' + prefijo if prefijo else 'todo el manual'
    print()
    print('%d flujograma(s) medido(s) (%s) — %d problema(s) de trazado.' % (len(procs), ambito, len(unicos)))
    for f in unicos:
        print('  ' + f)
    if avis:
        print()
        print('%d pregunta(s) no caben en su rombo y salen recortadas — hay que acortar el'
              ' enunciado (el texto íntegro queda en el tooltip):' % len(avis))
        for a in avis:
            print('  ' + a)
    if unicos:
        return 1
    print('OK — cada rombo muestra sus dos ramas, el texto cabe y ninguna arista queda tapada.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
