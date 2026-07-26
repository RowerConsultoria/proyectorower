# -*- coding: utf-8 -*-
"""Regenera las capturas del prototipo para el deck del informe (fase 25).

Uso:  levantar el servidor (python -m http.server 8080 desde la raíz) y correr
      python scripts/capturar-laminas-sistema.py

Cada toma fija el ROL a propósito: la pantalla de un rol que no puede firmar
algo se ve distinta, y la lámina debe enseñar la que corresponde a su historia.
"""
import io, sys, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
from playwright.sync_api import sync_playwright
DEST = r'C:\Users\marke\Desktop\Github Projects\Rower\informe\fase1\img-sistema'
TOMAS = [
  ('direccion',  'direccion',          'sistemas',  None),
  ('mesa',       'compras/casio',      'compras',   None),
  ('reparto',    'distribucion',       'compras',   None),
  ('cimiento',   'cimiento',           'sistemas',  'tasas'),
  ('agentes',    'agentes',            'direccion', None),
  ('conectores', 'frentes/conectores', 'sistemas',  None),
]
with sync_playwright() as pw:
    b=pw.chromium.launch(); p=b.new_page(viewport={'width':1600,'height':900})
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
        f=os.path.join(DEST, nombre+'.jpg')
        p.screenshot(path=f, type='jpeg', quality=86)
        k=os.path.getsize(f)//1024; tot+=k
        print(f'  {nombre:12s} {ruta:20s} {k} KB')
    print(f'\n  total {tot} KB')
    print('errores:', errs or 'ninguno')
    b.close()
