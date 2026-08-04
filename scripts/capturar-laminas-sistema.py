# -*- coding: utf-8 -*-
"""Regenera las capturas del prototipo para el deck del informe (fase 25).

Uso:  levantar el servidor (python -m http.server 8080 desde la raíz) y correr
      python scripts/capturar-laminas-sistema.py

Cada toma fija el ROL a propósito: la pantalla de un rol que no puede firmar
algo se ve distinta, y la lámina debe enseñar la que corresponde a su historia.
"""
import io, sys, os

import sesion_prueba          # siembra la sesión: el aplicativo está detrás de /acceso/
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
from playwright.sync_api import sync_playwright
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEST = os.path.join(RAIZ, 'informe', 'fase1', 'img-sistema')
os.makedirs(DEST, exist_ok=True)
TOMAS = [
  ('direccion',  'direccion',          'sistemas',  None),
  ('mesa',       'compras/casio',      'compras',   None),
  ('reparto',    'distribucion',       'compras',   None),
  ('cimiento',   'cimiento',           'sistemas',  'tasas'),
  ('agentes',    'agentes',            'direccion', None),
  ('conectores', 'frentes/conectores', 'sistemas',  None),
  # segunda serie (fases 27-32): los módulos y portales que el deck no contaba
  ('distribuido', 'inventarios/distribuido', 'logistica', None),
  ('mapa',        'mapa',                    'direccion', 'mapa'),
]

# Los portales son documentos aparte: no tienen hash y hay que abrirlos por URL.
# (nombre, url, pestaña)
TOMAS_PORTAL = [
    ('portal-vendedor', 'sistema/portal-vendedor/', 'catalogo'),
    ('portal-cliente',  'sistema/portal-cliente/',  'comprar'),
]
with sync_playwright() as pw:
    b=pw.chromium.launch(); SES=sesion_prueba.exigir()
    p=sesion_prueba.pagina(b, SES, viewport={'width':1600,'height':900})
    errs=[]; p.on('pageerror', lambda e: errs.append(str(e)[:120]))
    p.goto('http://localhost:8080/sistema/', wait_until='networkidle'); p.wait_for_timeout(900)
    tot=0
    for nombre, ruta, rol, ancla in TOMAS:
        p.select_option('#rol', rol); p.wait_for_timeout(350)
        p.evaluate(f'()=>location.hash="#/{ruta}"'); p.wait_for_timeout(950)
        if ancla=='tasas':
            p.evaluate("""()=>{const t=[...document.querySelectorAll('.tabla')][1];
                if(t) t.closest('.rejilla').scrollIntoView({block:'start'});}""")
            p.wait_for_timeout(700)
        if ancla=='mapa':
            # el mapa pide tiles a la red: se le da tiempo a pintarlos
            p.wait_for_timeout(4200)
        f=os.path.join(DEST, nombre+'.jpg')
        p.screenshot(path=f, type='jpeg', quality=86)
        k=os.path.getsize(f)//1024; tot+=k
        print(f'  {nombre:12s} {ruta:20s} {k} KB')
    for nombre, url, pestana in TOMAS_PORTAL:
        q = sesion_prueba.pagina(b, SES, viewport={'width': 1600, 'height': 900})
        q.on('pageerror', lambda e: errs.append(str(e)[:120]))
        q.goto('http://localhost:8080/' + url, wait_until='networkidle')
        q.wait_for_timeout(1500)
        q.evaluate('(k)=>{const x=document.querySelector(\'[data-pest="\'+k+\'"]\'); if(x) x.click();}',
                   pestana)
        q.wait_for_timeout(800)
        f = os.path.join(DEST, nombre + '.jpg')
        q.screenshot(path=f, type='jpeg', quality=86)
        k = os.path.getsize(f) // 1024
        tot += k
        print(f'  {nombre:12s} {url:20s} {k} KB')
        q.close()

    print(f'\n  total {tot} KB')
    print('errores:', errs or 'ninguno')
    b.close()
