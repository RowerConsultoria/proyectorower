# -*- coding: utf-8 -*-
"""Comprobaciones del prototipo /sistema — Proyecto Rower.

Son las que han encontrado casi todos los defectos durante la construcción, y
casi siempre el mismo: **la pantalla afirma un efecto que el código no produce**.
Por eso no comprueban que «no haya errores», sino que lo que se ve sea cierto.

    1. rutas       cada ruta pinta, la URL no miente, no hay desbordes
    2. contraste   WCAG AA sobre todo el texto, en los dos temas
    3. recorrido   las 12 paradas, y CADA CIFRA DEL GUION presente en su pantalla
    4. permisos    ningún ámbito de firma huérfano; cada rol firma lo suyo
    5. reglas      ninguna regla de negocio declarada y sin usar
    6. moneda      ninguna cifra grande sin su unidad o su moneda
    7. freno       detiene de verdad, y sigue siendo reversible

Uso:
    python scripts/comprobar-sistema.py            # todo
    python scripts/comprobar-sistema.py --rapido   # una anchura, un tema
    python scripts/comprobar-sistema.py rutas moneda

Levanta el servidor si el puerto 8080 está libre y lo apaga al terminar.
Sale con código 1 si algo falla, para poder encadenarlo antes de un commit.
"""
import io
import os
import re
import socket
import subprocess
import sys
import time

import sesion_prueba          # siembra la sesión: el aplicativo está detrás de /acceso/

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = 'http://localhost:8080/sistema/'
SES = None                   # registro de sesión; lo llena main()
PUERTO = 8080

RUTAS = [
    'direccion', 'compras', 'compras/cierre', 'compras/casio', 'compras/cubitt',
    'compras/transitos', 'producto', 'fabricas', 'logistica',
    'inventarios', 'inventarios/salud', 'inventarios/enmar', 'inventarios/distribuido',
    'distribucion', 'comercial', 'comercial/demanda', 'clientes', 'clientes/torre',
    'mapa', 'frentes', 'frentes/conectores',
    'cimiento', 'agentes',
]
ROLES = ['direccion', 'compras', 'analista', 'producto', 'logistica', 'comercial', 'sistemas']

# Los portales son documentos aparte: no tienen hash y no salen en RUTAS. Se
# listan aquí para que `contraste` y `moneda` —que barren todo el texto y todas
# las cifras— los recorran también. Sin esto, dos páginas enteras quedaban sin
# medir, que es justo donde nadie mira.
PORTALES = [
    ('portal-vendedor/', ['catalogo', 'mar', 'reservas']),
    ('portal-cliente/', ['comprar', 'preventa', 'pedidos', 'reportar', 'cuenta']),
]
ANCHOS = [(1560, 1000), (1280, 800), (430, 900)]


# ── el servidor ──────────────────────────────────────────────────────────────

def puerto_ocupado():
    with socket.socket() as s:
        s.settimeout(0.4)
        return s.connect_ex(('127.0.0.1', PUERTO)) == 0


class Servidor:
    def __enter__(self):
        self.proc = None
        if puerto_ocupado():
            print('· servidor ya en marcha en :%d' % PUERTO)
            return self
        self.proc = subprocess.Popen(
            [sys.executable, '-m', 'http.server', str(PUERTO)],
            cwd=RAIZ, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        for _ in range(40):
            if puerto_ocupado():
                print('· servidor levantado en :%d' % PUERTO)
                return self
            time.sleep(0.15)
        raise RuntimeError('no se pudo levantar el servidor en :%d' % PUERTO)

    def __exit__(self, *a):
        if self.proc:
            self.proc.terminate()
            print('· servidor apagado')


# ── utilidades de página ─────────────────────────────────────────────────────

def nueva(nav, ancho=1560, alto=1000):
    p = sesion_prueba.pagina(nav, SES, viewport={'width': ancho, 'height': alto})
    p.errores = []
    p.on('pageerror', lambda e: p.errores.append('excepción: ' + str(e)[:140]))
    p.on('console', lambda m: p.errores.append('consola: ' + m.text[:140])
         if m.type == 'error' else None)
    p.goto(BASE, wait_until='networkidle')
    p.wait_for_timeout(700)
    return p


def rol(p, r):
    p.select_option('#rol', r)
    p.wait_for_timeout(320)


def va(p, ruta, espera=330):
    p.evaluate('()=>location.hash="#/%s"' % ruta)
    p.wait_for_timeout(espera)


def abre_portal(nav, url, ancho=1560, alto=1100):
    p = sesion_prueba.pagina(nav, SES, viewport={'width': ancho, 'height': alto})
    p.errores = []
    p.on('pageerror', lambda e: p.errores.append('excepción: ' + str(e)[:140]))
    p.on('console', lambda m: p.errores.append('consola: ' + m.text[:140])
         if m.type == 'error' else None)
    p.goto(BASE + url, wait_until='networkidle')
    p.wait_for_timeout(1400)
    return p


def pest(p, clave, espera=600):
    p.evaluate('(k)=>{const b=document.querySelector(\'[data-pest="\'+k+\'"]\'); if(b) b.click();}',
               clave)
    p.wait_for_timeout(espera)


# ── el medidor de contraste ──────────────────────────────────────────────────

JS_CONTRASTE = r"""
()=>{
  const lum=c=>{const [r,g,b]=c.map(v=>{v/=255;
    return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});
    return .2126*r+.7152*g+.0722*b;};
  const rgb=s=>{const m=(s||'').match(/[\d.]+/g);return m?m.slice(0,3).map(Number):null;};
  /* Devuelve null si por el camino hay un DEGRADADO: sobre un degradado no se
     puede medir un contraste con un solo color, y darlo por el fondo del body
     producía falsos positivos escandalosos —texto blanco sobre la cabecera
     navy se contaba como blanco sobre papel—. */
  const solido=st=>{const c=st.backgroundColor, v=rgb(c);
    if(!v||c==='transparent') return null;
    const a=(c.match(/[\d.]+/g)||[])[3];
    return (a===undefined||+a>.6)? v : null;};
  const fondoDe=e=>{let n=e;
    while(n&&n!==document.documentElement){
      const st=getComputedStyle(n);
      if(st.backgroundImage&&st.backgroundImage!=='none'){
        /* Un degradado ENCIMA de un color sólido declarado sí tiene base contra
           la que medir —así es el fondo de los portales—. Un degradado SIN color
           debajo, no: ahí sigue devolviendo null, que es lo que impide contar
           el texto blanco de la cabecera navy del informe como blanco sobre
           papel. Sin esta distinción, los portales se recorrían enteros sin
           medir una sola línea. */
        return solido(st);
      }
      const v=solido(st);
      if(v) return v;
      n=n.parentElement;}
    return rgb(getComputedStyle(document.body).backgroundColor)||[255,255,255];};
  const malos=[];
  /* ⚠️ Antes esto miraba solo `.lienzo *`. Los portales de las fases 31-32 son
     documentos aparte y su contenedor se llama `.p-lienzo`: al extender la
     comprobación a los portales, los recorría midiendo CERO elementos y pasaba
     siempre. Una comprobación que no mira nada es peor que no tenerla, porque
     da una confianza que no ha ganado. Se cubren los dos lienzos y el cromo
     del portal, que es donde vive el crédito del cliente. */
  const AMBITO = '.lienzo *, .p-lienzo *, .p-cab *, .p-pest *';
  for(const e of document.querySelectorAll(AMBITO)){
    if(!e.textContent.trim()||e.children.length) continue;
    const st=getComputedStyle(e);
    if(st.display==='none'||st.visibility==='hidden') continue;
    if(st.webkitTextFillColor==='rgba(0, 0, 0, 0)') continue;   // texto en gradiente
    if(st.backgroundImage&&st.backgroundImage!=='none') continue;
    const padre=e.parentElement;
    if(padre&&getComputedStyle(padre).backgroundImage!=='none') continue;
    const f=rgb(st.color); if(!f) continue;
    const b=fondoDe(e); if(!b) continue;
    const L1=lum(f), L2=lum(b);
    const r=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);
    const px=parseFloat(st.fontSize);
    const grande=px>=24||(px>=18.66&&+st.fontWeight>=700);
    const min=grande?3:4.5;
    if(r<min) malos.push({t:e.textContent.trim().slice(0,34),
      r:+r.toFixed(2), min, px:+px.toFixed(1), cls:e.className.slice(0,26)});}
  return malos;}
"""

# La unidad se busca en el RÓTULO DE LA PROPIA CIFRA —el hermano de arriba, el
# de abajo, y el rótulo/pie de su tarjeta—, no en el texto de toda la caja.
# Mirar la caja entera hacía la comprobación ciega: cualquier tarjeta que
# mencionara «u» en otra frase daba por buena una cifra de dinero pelada.
JS_SIN_MONEDA = r"""
()=>{const out=[];
  const UNIDAD=/USD|u\/mes|unidades|\bu\b|\bd\b|%|días|meses|referencias|pedidos|embarques|frentes|nombres|líneas|cajas|contenedor/i;
  const txtDe=e=>e?e.innerText.trim():'';
  for(const e of document.querySelectorAll('.cifra-grande,.kpi .valor,.cifra-media')){
    const txt=e.innerText.trim();
    const num=parseFloat(txt.replace(/[^\d,.-]/g,'').replace(/\./g,'').replace(',','.'));
    if(!isFinite(num)||num<1000) continue;
    if(UNIDAD.test(txt)) continue;                       // la propia cifra lo dice
    const kpi=e.closest('.kpi');
    const cerca=[txtDe(e.previousElementSibling), txtDe(e.nextElementSibling),
                 kpi?txtDe(kpi.querySelector('.rotulo')):'',
                 kpi?txtDe(kpi.querySelector('.pie')):''].join(' · ');
    if(UNIDAD.test(cerca)) continue;
    out.push({t:txt, ctx:cerca.replace(/\s+/g,' ').slice(0,70)});}
  return out;}
"""


# ── las comprobaciones ───────────────────────────────────────────────────────

def c_rutas(nav, rapido):
    """Cada ruta pinta algo, la URL coincide con lo que se ve, y no desborda."""
    fallos = []
    anchos = ANCHOS[:1] if rapido else ANCHOS
    temas = (0,) if rapido else (0, 1)
    for w, h in anchos:
        p = nueva(nav, w, h)
        rol(p, 'sistemas')
        for tema in temas:
            if tema:
                p.click('#tema')
                p.wait_for_timeout(380)
            for r in RUTAS:
                va(p, r)
                # `registrada` es la clave: sin ella, una pantalla que se queda
                # sin registrar cae en la ficha genérica del módulo, que pinta
                # texto de sobra y pasaba la comprobación como si nada.
                d = p.evaluate("""()=>{const P=window.PANTALLAS||{};
                  return {h:location.hash,
                    n:document.querySelector('.lienzo').innerText.trim().length,
                    registrada: !!(P[ESTADO.llave]||P[ESTADO.modulo]),
                    des:document.documentElement.scrollWidth>document.documentElement.clientWidth+2};}""")
                if d['h'] != '#/' + r:
                    fallos.append('%dpx: #/%s acabó en %s' % (w, r, d['h']))
                elif not d['registrada']:
                    fallos.append('%dpx: #/%s no tiene pantalla registrada — cae en la ficha genérica' % (w, r))
                elif d['n'] < 400:
                    fallos.append('%dpx: #/%s pinta solo %d caracteres' % (w, r, d['n']))
                elif d['des']:
                    fallos.append('%dpx %s: #/%s desborda a lo ancho'
                                  % (w, 'claro' if tema else 'oscuro', r))
        fallos += ['%dpx %s' % (w, e) for e in p.errores]
        p.close()
    n = len(RUTAS) * len(anchos) * len(temas)
    return fallos, '%d comprobaciones de ruta' % n


def c_contraste(nav, rapido):
    """Todo el texto por encima del mínimo AA, en los dos temas."""
    fallos = []
    p = nueva(nav)
    rol(p, 'sistemas')
    for tema in ((0,) if rapido else (0, 1)):
        if tema:
            p.click('#tema')
            p.wait_for_timeout(420)
        for r in RUTAS:
            va(p, r)
            for m in p.evaluate(JS_CONTRASTE):
                fallos.append('%s %s: %.2f (mín %.1f) · %spx · «%s» .%s'
                              % ('claro' if tema else 'oscuro', r, m['r'], m['min'],
                                 m['px'], m['t'], m['cls']))
    p.close()

    # los portales, con sus pestañas, en los dos temas
    for url, pestanas in PORTALES:
        for tema in ((0,) if rapido else (0, 1)):
            q = abre_portal(nav, url)
            if tema:
                q.click('#tema')
                q.wait_for_timeout(500)
            for k in pestanas:
                pest(q, k)
                for m in q.evaluate(JS_CONTRASTE):
                    fallos.append('%s %s%s: %.2f (mín %.1f) · %spx · «%s» .%s'
                                  % ('claro' if tema else 'oscuro', url, k, m['r'], m['min'],
                                     m['px'], m['t'], m['cls']))
            fallos += q.errores
            q.close()

    pantallas = len(RUTAS) + sum(len(x[1]) for x in PORTALES)
    return fallos, 'texto medido en %d pantallas × %d tema(s)' % (pantallas, 1 if rapido else 2)


def c_recorrido(nav, rapido):
    """Las paradas llegan a su destino, hallan su ancla, y CADA CIFRA del guion
    aparece en la pantalla que la sostiene. Es la comprobación que descubrió que
    el guion decía «5 frentes con Odoo» cuando eran 3.

    Desde la fase 33 hay dos clases de parada: las de PANTALLA, que navegan por
    hash dentro del sistema, y las de PORTAL, que abren otro documento en un
    panel. Para una parada de portal hay que mirar DENTRO del iframe: buscar
    sus cifras en la pantalla de detrás daba falsos positivos —el paso del
    portal del cliente pasaba porque sus números aparecían por casualidad en la
    cartera que quedaba debajo—."""
    fallos = []
    p = nueva(nav)
    # desde la fase 26 la portada recibe primero: se entra por ella, como
    # cualquier usuario, antes de poder tocar el chrome
    p.click('#entrar-directo')
    p.wait_for_timeout(600)
    p.click('#abre-recorrido')
    p.wait_for_timeout(800)
    total = p.evaluate('()=>RECORRIDO.length')
    num = re.compile(r'\d[\d.]*')
    portales = 0
    for i in range(total):
        if i:
            p.click('#rec-sigue')
            p.wait_for_timeout(760)
        d = p.evaluate("""()=>{const q=RECORRIDO[_rec.paso];
            const pan=document.querySelector('#portal-panel');
            return {n:_rec.paso+1, pide:q.ruta||null, portal:q.portal||null,
                    hash:location.hash.replace('#/',''),
                    ancla:q.foco||null,
                    hallada: q.foco? !!document.querySelector('.lienzo '+q.foco) : true,
                    panel: pan? !pan.hidden : false,
                    marco: pan? (document.querySelector('#pp-marco').dataset.clave||null) : null,
                    guion:document.querySelector('.rec-txt').innerText,
                    pantalla:document.querySelector('.lienzo').innerText};}""")

        if d['portal']:
            portales += 1
            # el panel abierto, con SU portal cargado
            if not d['panel'] or d['marco'] != d['portal']:
                fallos.append('paso %d: la parada del portal «%s» no abrió su panel (panel=%s marco=%s)'
                              % (d['n'], d['portal'], d['panel'], d['marco']))
                continue
            # y las cifras se buscan DENTRO del iframe, no en lo que quedó detrás
            marco = p.frame_locator('#pp-marco')
            try:
                marco.locator('body').wait_for(timeout=8000)
                pantalla = marco.locator('body').inner_text(timeout=8000)
            except Exception as e:
                fallos.append('paso %d: no se pudo leer el portal «%s» (%s)'
                              % (d['n'], d['portal'], str(e)[:60]))
                continue
        else:
            if d['hash'] != d['pide']:
                fallos.append('paso %d: pide #/%s y quedó en #/%s' % (d['n'], d['pide'], d['hash']))
            if not d['hallada']:
                fallos.append('paso %d: no encuentra su ancla %s' % (d['n'], d['ancla']))
            # con un portal abierto antes, el panel tiene que haberse cerrado
            if d['panel']:
                fallos.append('paso %d: el panel del portal sigue abierto sobre una pantalla' % d['n'])
            pantalla = d['pantalla']

        if 'no pudo leer' in d['guion']:
            fallos.append('paso %d: el guion no pudo leer sus cifras del núcleo' % d['n'])
        pantalla = pantalla.replace('\u00a0', ' ')
        for c in num.findall(d['guion']):
            c = c.rstrip('.')
            if len(c) < 3 or c in ('100',):
                continue                      # 1, 2, 3… son ordinales, no cifras
            if c not in pantalla:
                fallos.append('paso %d: el guion dice «%s» y no está en la pantalla'
                              % (d['n'], c))

    if portales != 2:
        fallos.append('el recorrido tiene %d paradas de portal y la fase 33 pide 2' % portales)

    # ── el guion se pliega para explicar la pantalla, y vuelve ─────────────
    # Plegar NO es cerrar: el paso se conserva, se puede seguir avanzando, y al
    # desplegar vuelve el texto. Si se perdiera el paso, quien presenta tendría
    # que buscar dónde estaba delante de la Junta.
    p.evaluate('()=>vaAlPaso(2)')
    p.wait_for_timeout(900)
    abierta = p.evaluate("""()=>({alto:Math.round(document.querySelector('#recorrido').getBoundingClientRect().height),
      paso:_rec.paso, texto:!!document.querySelector('.rec-txt')})""")
    p.click('#rec-pliega')
    p.wait_for_timeout(700)
    d = p.evaluate("""()=>{const c=document.querySelector('#recorrido');
      const r=c.getBoundingClientRect();
      return {plegada:c.classList.contains('plegada'), paso:_rec.paso,
        alto:Math.round(r.height), ancho:Math.round(r.width),
        texto:!!c.querySelector('.rec-txt'), titulo:!!c.querySelector('.rec-tit'),
        sigue:!!c.querySelector('#rec-sigue'), atras:!!c.querySelector('#rec-atras')};}""")
    if not d['plegada']:
        fallos.append('el guion no se pliega')
    if d['alto'] >= abierta['alto']:
        fallos.append('plegado no reduce la barra: %d px abierta y %d px plegada'
                      % (abierta['alto'], d['alto']))
    if d['ancho'] >= p.evaluate('()=>innerWidth') - 40:
        fallos.append('plegado sigue ocupando todo el ancho (%d px)' % d['ancho'])
    if d['texto']:
        fallos.append('plegado sigue enseñando el guion entero')
    if not d['titulo'] or not d['sigue'] or not d['atras']:
        fallos.append('plegado sin título o sin flechas: no se sabe dónde se está ni se puede seguir')
    if d['paso'] != abierta['paso']:
        fallos.append('plegar perdió el paso (%d → %d)' % (abierta['paso'], d['paso']))

    p.click('#rec-sigue')
    p.wait_for_timeout(1100)
    if p.evaluate('()=>_rec.paso') != abierta['paso'] + 1 or not p.evaluate('()=>_rec.plegada'):
        fallos.append('no se puede avanzar con el guion plegado sin que se despliegue solo')

    p.click('#rec-despliega')
    p.wait_for_timeout(700)
    d = p.evaluate("""()=>({plegada:_rec.plegada, paso:_rec.paso,
      texto:!!document.querySelector('.rec-txt')})""")
    if d['plegada'] or not d['texto']:
        fallos.append('desplegar no devuelve el guion')
    if d['paso'] != abierta['paso'] + 1:
        fallos.append('desplegar perdió el paso')

    # la tecla, que es como se usa presentando
    p.keyboard.press('g')
    p.wait_for_timeout(500)
    if not p.evaluate('()=>_rec.plegada'):
        fallos.append('la tecla G no pliega el guion')
    p.keyboard.press('g')
    p.wait_for_timeout(500)
    if p.evaluate('()=>_rec.plegada'):
        fallos.append('la tecla G no lo despliega')

    # Salir del recorrido DESDE UNA PARADA DE PORTAL: es el único caso en que
    # el panel puede quedarse pegado. Cerrar desde la última parada no probaba
    # nada —esa no es de portal, así que el panel ya estaba cerrado— y la
    # trampa correspondiente salió ciega.
    i = p.evaluate("()=>RECORRIDO.findIndex(x=>x.portal)")
    if i >= 0:
        p.evaluate('(k)=>vaAlPaso(k)', i)
        p.wait_for_timeout(1200)
        if not p.evaluate("()=>{const x=document.querySelector('#portal-panel'); return x? !x.hidden : false;}"):
            fallos.append('no se pudo volver a una parada de portal para probar la salida')
        p.evaluate('()=>cierraRecorrido()')
        p.wait_for_timeout(800)
        if p.evaluate("()=>{const x=document.querySelector('#portal-panel'); return x? !x.hidden : false;}"):
            fallos.append('salir del recorrido desde un portal deja el panel puesto')
        if p.evaluate("()=>document.body.classList.contains('con-portal')"):
            fallos.append('salir del recorrido desde un portal deja el cuerpo bloqueado')

    fallos += p.errores
    p.close()
    return fallos, '%d paradas (%d de portal) y sus cifras' % (total, portales)


def c_permisos(nav, rapido):
    """Ningún ámbito de firma declarado y sin gobernar nada, y cada rol firma
    exactamente lo que su descripción promete."""
    fallos = []
    p = nueva(nav)
    rol(p, 'direccion')
    usados = set()
    for r in RUTAS:
        va(p, r, 380)
        usados |= set(p.evaluate(
            "()=>[...document.querySelectorAll('[data-firma]')].map(e=>e.dataset.firma)"))
    # los que viven detrás de una interacción se declaran también en el código
    for f in sorted(_ficheros_js()):
        with open(f, encoding='utf-8') as fh:
            usados |= set(re.findall(r'data-firma="([a-z]+)"', fh.read()))
    usados |= set(p.evaluate('()=>Object.values(AMBITO_DE_MODULO)'))
    declarados = set(p.evaluate('()=>Object.keys(AMBITOS)'))
    for a in sorted(declarados - usados):
        fallos.append('ámbito «%s» declarado y sin ningún botón que lo use' % a)
    for a in sorted(usados - declarados):
        fallos.append('ámbito «%s» usado en un botón y sin declarar' % a)

    for r in ROLES:
        rol(p, r)
        d = p.evaluate("""()=>({firma:ROLES[ESTADO.rol].firma,
            todos:Object.keys(AMBITOS)})""")
        if 'todo' in d['firma']:
            continue
        for a in d['firma']:
            if a not in d['todos']:
                fallos.append('el rol %s dice firmar «%s», que no es un ámbito' % (r, a))
    fallos += p.errores
    p.close()
    return fallos, '%d ámbitos y %d roles' % (len(declarados), len(ROLES))


def _ficheros_js():
    base = os.path.join(RAIZ, 'sistema')
    for carpeta, _, ficheros in os.walk(base):
        for f in ficheros:
            if f.endswith('.js'):
                yield os.path.join(carpeta, f)


def c_reglas(nav, rapido):
    """Ninguna regla de negocio declarada con dueño y versión que después no use
    nadie. Una regla huérfana es una promesa incumplida, y en este sistema las
    reglas son el argumento.

    Y ningún FACTOR de valoración escrito a mano fuera del núcleo. El 0,62 del
    precio de mayoreo llegó a estar copiado en dos pantallas y el portal del
    cliente iba a ser la tercera; ahora vive en `valorMayoreo()`. Esto no se
    puede comprobar en el navegador —mover la constante cambia los dos lados de
    la comparación y la prueba pasaría igual— así que se comprueba leyendo el
    código."""
    fuente = os.path.join(RAIZ, 'sistema', 'nucleo', 'agentes.js')
    with open(fuente, encoding='utf-8') as f:
        nucleo = f.read()
    bloque = nucleo[nucleo.find('const REGLAS'):]
    bloque = bloque[:bloque.find('\n};')]
    claves = re.findall(r'^\s*(\w+):\s*\{', bloque, re.M)

    todo = ''
    for f in _ficheros_js():
        with open(f, encoding='utf-8') as fh:
            todo += fh.read()

    fallos = []

    # los factores de valoración, en un solo sitio
    for f in _ficheros_js():
        if f.endswith(os.path.join('nucleo', 'agentes.js')):
            continue
        with open(f, encoding='utf-8') as fh:
            cuerpo = fh.read()
        for m in re.findall(r'pvp\s*\*\s*0\.\d+', cuerpo):
            fallos.append('%s escribe «%s» a mano: los factores de valoración '
                          'viven en el núcleo' % (os.path.basename(f), m))

    for k in claves:
        # se descuenta la propia declaración
        usos = len(re.findall(r'REGLAS\.' + k + r'\b', todo))
        if usos == 0:
            fallos.append('la regla «%s» se declara con dueño y versión y no la usa nadie' % k)
    return fallos, '%d reglas de negocio' % len(claves)


def c_moneda(nav, rapido):
    """Ninguna cifra grande sin decir su unidad o su moneda. Es la regla que fija
    la arquitectura: no existe cifra sin moneda y sin tasa fechada."""
    fallos = []
    p = nueva(nav)
    rol(p, 'sistemas')
    for r in RUTAS:
        va(p, r, 380)
        for m in p.evaluate(JS_SIN_MONEDA):
            fallos.append('%s: «%s» sin unidad ni moneda · %s' % (r, m['t'], m['ctx']))
    fallos += p.errores
    p.close()

    for url, pestanas in PORTALES:
        q = abre_portal(nav, url)
        for k in pestanas:
            pest(q, k)
            for m in q.evaluate(JS_SIN_MONEDA):
                fallos.append('%s%s: «%s» sin unidad ni moneda · %s' % (url, k, m['t'], m['ctx']))
        fallos += q.errores
        q.close()

    return fallos, 'cifras de %d pantallas' % (len(RUTAS) + sum(len(x[1]) for x in PORTALES))


def c_freno(nav, rapido):
    """El freno detiene de verdad —los contadores del menú caen a cero— y sigue
    siendo reversible. Un freno que se apaga a sí mismo no es un freno."""
    fallos = []
    p = nueva(nav)
    rol(p, 'direccion')
    va(p, 'agentes', 800)
    contadores = lambda: p.evaluate(
        """()=>[...document.querySelectorAll('.menu-item .contador')]
             .reduce((a,e)=>a+ +e.textContent,0)""")
    antes = contadores()
    if antes == 0:
        fallos.append('no hay nada pendiente antes de frenar: la prueba no dice nada')
    p.click('#freno-general')
    p.wait_for_timeout(800)
    if contadores() != 0:
        fallos.append('con el freno puesto siguen quedando %d pendientes en el menú'
                      % contadores())
    if p.evaluate("()=>document.querySelector('#freno-general').disabled"):
        fallos.append('el freno se apaga a sí mismo: detener sería irreversible')
    va(p, 'compras/cierre', 700)
    if not p.evaluate("()=>document.querySelector('#enviar').disabled"):
        fallos.append('con el freno puesto se puede seguir firmando la compra')
    va(p, 'agentes', 700)
    p.click('#freno-general')
    p.wait_for_timeout(800)
    if contadores() != antes:
        fallos.append('al soltar el freno no se recupera el estado (%d ≠ %d)'
                      % (contadores(), antes))
    fallos += p.errores
    p.close()
    return fallos, 'freno general, bandejas y reversibilidad'


def c_portada(nav, rapido):
    """La puerta del prototipo (fase 26): aparece solo al llegar sin hash,
    Entrar arranca el recorrido, entrar directo no, y un enlace profundo
    no la ve. La cifra de paradas sale del guion real, no de un texto."""
    fallos = []

    # ⚠️ Se mide LO QUE SE VE (computed display), no el atributo `hidden`:
    # el atributo decía «oculta» mientras el CSS la seguía pintando, y esta
    # comprobación lo dio por bueno. Medir la propiedad era medir lo de al lado.
    p = nueva(nav)
    d = p.evaluate("""()=>({vis:getComputedStyle(document.querySelector('#portada')).display!=='none',
      clase:document.body.classList.contains('en-portada'),
      hud:getComputedStyle(document.querySelector('#hud')).display,
      nota:document.querySelector('#portada-nota').textContent,
      paradas:RECORRIDO.length})""")
    if not d['vis'] or not d['clase']:
        fallos.append('la portada no aparece al llegar sin hash')
    if d['hud'] != 'none':
        fallos.append('el HUD sigue visible con la portada puesta')
    if str(d['paradas']) not in d['nota']:
        fallos.append('la nota no dice las %s paradas del guion real' % d['paradas'])

    p.click('#entrar')
    p.wait_for_timeout(1100)
    d = p.evaluate("""()=>({fuera:getComputedStyle(document.querySelector('#portada')).display==='none',
      rec:!document.querySelector('#recorrido').hidden, rol:ESTADO.rol})""")
    if not d['fuera']:
        fallos.append('Entrar no quita la portada')
    if not d['rec'] or d['rol'] != 'direccion':
        fallos.append('Entrar no arranca el recorrido en dirección (%s)' % d)
    fallos += p.errores
    p.close()

    p = nueva(nav)
    p.click('#entrar-directo')
    p.wait_for_timeout(700)
    d = p.evaluate("""()=>({fuera:getComputedStyle(document.querySelector('#portada')).display==='none',
      rec:document.querySelector('#recorrido').hidden,
      pintado:document.querySelector('#lienzo').children.length>0})""")
    if not (d['fuera'] and d['rec'] and d['pintado']):
        fallos.append('entrar directo no deja el sistema listo sin recorrido (%s)' % d)
    fallos += p.errores
    p.close()

    # ⚠️ El enlace profundo tiene que ser la PRIMERA carga de la página.
    # `nueva()` ya navega a BASE, y de ahí a BASE#/compras solo cambia el hash:
    # eso cierra la portada por el camino legítimo (hashchange) y la prueba
    # pasaba aunque la carga-con-hash estuviera rota — se vio al sabotearla.
    p = sesion_prueba.pagina(nav, SES, viewport={'width': 1560, 'height': 1000})
    p.errores = []
    p.on('pageerror', lambda e: p.errores.append('excepción: ' + str(e)[:140]))
    p.goto(BASE + '#/compras', wait_until='networkidle')
    p.wait_for_timeout(700)
    if not p.evaluate("()=>getComputedStyle(document.querySelector('#portada')).display==='none'"):
        fallos.append('la portada tapa un enlace profundo')
    fallos += p.errores
    p.close()

    if not rapido:
        p = nueva(nav, 430, 900)
        d = p.evaluate("""()=>({desborda:document.documentElement.scrollWidth>document.documentElement.clientWidth+2,
          dentro:document.querySelector('.portada-caja').getBoundingClientRect().bottom<=innerHeight+2})""")
        if d['desborda'] or not d['dentro']:
            fallos.append('la portada desborda a 430 px (%s)' % d)
        fallos += p.errores
        p.close()

    return fallos, 'portada, dos entradas y enlace profundo'


def c_inventarios(nav, rapido):
    """El módulo de la fase 27 no puede inventar cifras: cada tarjeta de
    almacén debe sumar EXACTAMENTE lo que dice el modelo, cada almacén debe
    tener dueño y ficha completa, el semáforo debe corresponder a su umbral, y
    «en mar» debe decir el mismo número que la torre de tránsitos — dos
    pantallas, un solo dato."""
    fallos = []
    p = nueva(nav)
    rol(p, 'logistica')

    # ── por almacén: la pantalla contra el modelo ───────────────────────────
    va(p, 'inventarios', 700)
    d = p.evaluate("""()=>{
      const n=v=>Math.round(v||0).toLocaleString('es-VE');
      const malos=[], semaforo=[], sinFicha=[];
      /* el modelo, recalculado aquí mismo: ZLC = STOCK_HUB; cada frente
         propio = su columna de STOCK_FRENTE */
      const modelo={ZLC:Object.values(STOCK_HUB).reduce((a,b)=>a+b,0)};
      for(const f of FRENTES.filter(f=>f.tipo==='propio')){
        let t=0; for(const k in STOCK_FRENTE) t+=STOCK_FRENTE[k][f.id]||0;
        modelo[f.id]=t;
      }
      let suma=0;
      for(const card of document.querySelectorAll('[data-alm]')){
        const id=card.dataset.alm, vis=card.querySelector('.alm-u').textContent.trim();
        if(vis!==n(modelo[id])) malos.push(id+': pantalla '+vis+' y modelo '+n(modelo[id]));
        suma+=modelo[id];
        const ficha=fichaAlmacen(id);
        if(!ficha||!ficha.dueno||!ficha.capacidadU||!ficha.lat||!ficha.lon) sinFicha.push(id);
        else {
          const pct=modelo[id]/ficha.capacidadU;
          const dice=(card.textContent.match(/ocupación (holgada|ajustada|al límite)/)||[])[1];
          const toca=pct>=0.90?'al límite':pct>=0.70?'ajustada':'holgada';
          if(dice!==toca) semaforo.push(id+': dice «'+dice+'» y toca «'+toca+'» ('+Math.round(pct*100)+' %)');
        }
        if(!ficha||!card.textContent.includes(ficha.dueno)) sinFicha.push(id+' (dueño no visible)');
      }
      const kpi=document.querySelector('#inv-tot-u').textContent.trim();
      const enMar=TRANSITOS.reduce((a,t)=>a+lineasEmbarque(t).reduce((x,y)=>x+y.u,0),0);
      return {malos, semaforo, sinFicha,
        tarjetas:document.querySelectorAll('[data-alm]').length,
        ubic:saludInventario().ubicaciones.length,
        kpiOk:kpi===n(suma),
        marOk:document.querySelector('#inv-enmar-u').textContent.trim()===n(enMar),
        rutaVieja:'logistica/inventario' in (window.PANTALLAS||{}),
        salud:'inventarios/salud' in (window.PANTALLAS||{})};}""")
    for x in d['malos']:
        fallos.append('almacén ' + x)
    for x in d['semaforo']:
        fallos.append('semáforo de ' + x)
    for x in d['sinFicha']:
        fallos.append('almacén sin ficha completa o sin dueño visible: ' + x)
    if d['tarjetas'] != d['ubic']:
        fallos.append('%d tarjetas y %d ubicaciones en el modelo' % (d['tarjetas'], d['ubic']))
    if not d['kpiOk']:
        fallos.append('el KPI de unidades no es la suma de las tarjetas')
    if not d['marOk']:
        fallos.append('el KPI «en mar» no cuadra con los embarques del modelo')
    if d['rutaVieja']:
        fallos.append('la ruta vieja logistica/inventario sigue registrada')
    if not d['salud']:
        fallos.append('inventarios/salud no está registrada')

    # ── en mar contra la torre de tránsitos: dos pantallas, un dato ─────────
    va(p, 'inventarios/enmar', 600)
    mar = p.evaluate("()=>document.querySelector('#mar-u').textContent.trim()")
    ok = p.evaluate("""()=>{
      const n=v=>Math.round(v||0).toLocaleString('es-VE');
      return document.querySelector('#mar-u').textContent.trim()===
        n(TRANSITOS.reduce((a,t)=>a+lineasEmbarque(t).reduce((x,y)=>x+y.u,0),0));}""")
    if not ok:
        fallos.append('«en mar» no cuadra con el modelo de embarques')
    va(p, 'compras/transitos', 700)
    torre = p.evaluate("""()=>{
      const k=[...document.querySelectorAll('.kpi')].find(x=>x.textContent.includes('unidades en tránsito'));
      return k?k.querySelector('.valor').textContent.trim():null;}""")
    if torre != mar:
        fallos.append('la torre dice %s unidades y «en mar» dice %s — dos pantallas, dos datos' % (torre, mar))

    fallos += p.errores
    p.close()
    return fallos, '%d almacenes cuadrados y el mar contra la torre' % d['tarjetas']


def c_distribuido(nav, rapido):
    """La fase 28 vive de una ecuación: despachado − reportado = estimado, con
    su banda = venta diaria × días desde el corte. Se verifica CONTRA PANTALLA,
    cliente por cliente, recomputando desde los datos crudos (STOCK_FRENTE,
    VENTAS y el rótulo del corte) — no contra la función que pinta, que sería
    darle la razón al acusado."""
    fallos = []
    p = nueva(nav)
    rol(p, 'logistica')
    va(p, 'inventarios/distribuido', 700)

    d = p.evaluate(r"""()=>{
      const n=v=>Math.round(v||0).toLocaleString('es-VE');
      const malos=[], conf=[];
      const noPropios=FRENTES.filter(f=>f.tipo!=='propio');
      let sumEst=0, sumBanda=0;
      for(const f of noPropios){
        /* el modelo, DESDE LOS CRUDOS */
        let est=0, rep=0;
        for(const sku in STOCK_FRENTE) est+=STOCK_FRENTE[sku][f.id]||0;
        for(const sku in VENTAS) rep+=((VENTAS[sku]||{})[f.id]||[]).reduce((a,b)=>a+b,0);
        const m=String(f.corte).match(/(\d+)\s*día/);
        const dias=m?+m[1]:(/ayer/.test(f.corte)?1:0);
        const banda=Math.round(rep/365*dias);
        sumEst+=est; sumBanda+=banda;

        const card=document.querySelector('[data-cli="'+f.id+'"]');
        if(!card){ malos.push(f.id+': sin tarjeta'); continue; }
        const lee=c=>card.querySelector(c).textContent.trim();
        if(lee('.d-est')!==n(est)) malos.push(f.id+': estimado '+lee('.d-est')+' y crudo '+n(est));
        if(lee('.d-rep')!==n(rep)) malos.push(f.id+': reportado '+lee('.d-rep')+' y crudo '+n(rep));
        if(lee('.d-desp')!==n(est+rep)) malos.push(f.id+': despachado '+lee('.d-desp')+' ≠ estimado+reportado');
        if(lee('.d-banda')!=='± '+n(banda)) malos.push(f.id+': banda '+lee('.d-banda')+' y cruda ± '+n(banda));

        /* la confianza pintada, contra el criterio recomputado */
        const rel=est?banda/est:0;
        const toca=dias===0?'firme':rel<0.05?'aceptable':rel<0.15?'con banda':'borrosa';
        const dice=(card.textContent.match(/estimación (firme|aceptable|con banda|borrosa)/)||[])[1];
        if(dice!==toca) conf.push(f.id+': dice «'+dice+'» y toca «'+toca+'»');
      }
      const tarjetas=document.querySelectorAll('[data-cli]').length;
      const propio=saludInventario().filas.reduce((a,f)=>a+f.u,0);
      return {malos, conf, tarjetas, esperadas:noPropios.length,
        kpiMundo:document.querySelector('#dist-mundo').textContent.trim()===n(propio+sumEst),
        kpiEst:document.querySelector('#dist-est').textContent.trim()===n(sumEst),
        kpiBanda:document.querySelector('#dist-banda').textContent.trim()==='± '+n(sumBanda)};}""")

    fallos += ['cliente ' + x for x in d['malos']]
    fallos += ['confianza de ' + x for x in d['conf']]
    if d['tarjetas'] != d['esperadas']:
        fallos.append('%d tarjetas y %d frentes no propios' % (d['tarjetas'], d['esperadas']))
    if not d['kpiMundo']:
        fallos.append('el KPI del mundo no es lo medido + lo estimado')
    if not d['kpiEst']:
        fallos.append('el KPI estimado no es la suma de los clientes')
    if not d['kpiBanda']:
        fallos.append('el KPI de incertidumbre no es la suma de las bandas')

    fallos += p.errores
    p.close()
    return fallos, '%d clientes con su ecuación contra pantalla' % d['tarjetas']


def c_clientes(nav, rapido):
    """El módulo de la fase 29: cada tarjeta de la cartera dice el crédito y la
    venta que dicen los datos crudos; toda recomendación declara su ámbito de
    firma; el agente K-01 corre en el turno y aparece en la sala; y aplicar una
    recomendación deja rastro en la bitácora. Los conteos de la torre se
    recomputan desde los CRUDOS (OCIOSOS, atrasos), no desde la función que
    pinta."""
    fallos = []
    p = nueva(nav)
    rol(p, 'comercial')
    va(p, 'clientes', 800)

    d = p.evaluate("""()=>{
      const n=v=>Math.round(v||0).toLocaleString('es-VE');
      const malos=[];
      for(const f of FRENTES){
        const card=document.querySelector('[data-cli="'+f.id+'"]');
        if(!card){ malos.push(f.id+': sin tarjeta'); continue; }
        const disp=card.querySelector('.cli-disp').textContent.trim();
        if(disp!==n(f.credito-f.saldo)) malos.push(f.id+': disponible '+disp+' y crudo '+n(f.credito-f.saldo));
        let venta=0;
        for(const sku in VENTAS) venta+=((VENTAS[sku]||{})[f.id]||[]).reduce((a,b)=>a+b,0);
        const vis=card.querySelector('.cli-venta').textContent.trim();
        if(vis!==n(venta)) malos.push(f.id+': venta '+vis+' y cruda '+n(venta));
      }
      return {malos, tarjetas:document.querySelectorAll('[data-cli]').length,
        frentes:FRENTES.length, k01:!!entradaDe('K-01')};}""")
    fallos += ['cartera · ' + x for x in d['malos']]
    if d['tarjetas'] != d['frentes']:
        fallos.append('%d tarjetas y %d frentes en la red' % (d['tarjetas'], d['frentes']))
    if not d['k01']:
        fallos.append('el agente K-01 no corrió en el turno')

    # ── la ficha de GT: pedidos, promos y recomendaciones con ámbito ────────
    p.evaluate("()=>document.querySelector('[data-abre-cli=\"GT\"]').click()")
    p.wait_for_timeout(700)
    d = p.evaluate(r"""()=>{
      const card=document.querySelector('[data-cli="GT"]');
      const ambitos=Object.keys(AMBITOS);
      const recs=[...card.querySelectorAll('[data-rec]')];
      const sinAmbito=recs.filter(e=>{
        const a=e.dataset.ambito;
        if(a==='') return !e.textContent.includes('aviso a gerencia comercial');
        return !ambitos.includes(a);
      }).length;
      const botonSinFirma=recs.filter(e=>{
        const b=e.querySelector('[data-aplica]');
        return b && b.dataset.firma!==e.dataset.ambito;
      }).length;
      return {ped:+card.querySelector('.cli-ped').textContent,
        pedCrudo:PEDIDOS.filter(x=>x.frente==='GT').length,
        promos:(card.textContent.match(/−\d+ % hasta/g)||[]).length,
        promosCrudo:PROMOS.filter(x=>x.frentes.includes('GT')).length,
        recs:recs.length, sinAmbito, botonSinFirma};}""")
    if d['ped'] != d['pedCrudo']:
        fallos.append('GT: %d pedidos en ficha y %d en los datos' % (d['ped'], d['pedCrudo']))
    if d['promos'] != d['promosCrudo']:
        fallos.append('GT: %d promos en ficha y %d en PROMOS' % (d['promos'], d['promosCrudo']))
    if not d['recs']:
        fallos.append('GT: la ficha no enseña recomendaciones')
    if d['sinAmbito']:
        fallos.append('GT: %d recomendaciones sin ámbito declarado' % d['sinAmbito'])
    if d['botonSinFirma']:
        fallos.append('GT: %d botones cuya firma no es el ámbito de su recomendación' % d['botonSinFirma'])

    # ── la torre: conteos contra los CRUDOS ─────────────────────────────────
    va(p, 'clientes/torre', 700)
    d = p.evaluate(r"""()=>{
      const noPropios=FRENTES.filter(f=>f.tipo!=='propio').map(f=>f.id);
      const impulsosCrudo=OCIOSOS.filter(o=>noPropios.includes(o.frente)).length;
      const alertasCrudo=FRENTES.filter(f=>f.tipo!=='propio'&&
        (f.atraso>0||f.saldo/f.credito>0.7)).length;
      const prep=+document.querySelector('#torre-prep').textContent;
      const alertas=+document.querySelector('#torre-alertas').textContent;
      const pie=document.querySelector('#torre-prep').closest('.kpi').querySelector('.pie').textContent;
      const impulsosDice=+(pie.match(/(\d+) impulso/)||[0,0])[1];
      return {prep, alertas, alertasCrudo, impulsosDice, impulsosCrudo,
        aplicaBtns:document.querySelectorAll('[data-aplica]').length};}""")
    if d['alertas'] != d['alertasCrudo']:
        fallos.append('torre: %d alertas y los crudos dicen %d' % (d['alertas'], d['alertasCrudo']))
    if d['impulsosDice'] != d['impulsosCrudo']:
        fallos.append('torre: %d impulsos y OCIOSOS dice %d' % (d['impulsosDice'], d['impulsosCrudo']))
    if not d['prep'] or not d['aplicaBtns']:
        fallos.append('torre sin recomendaciones o sin botones para empujarlas')

    # ── aplicar una promoción deja rastro en la bitácora ────────────────────
    antes = p.evaluate("()=>BITACORA.length")
    p.evaluate("""()=>{const b=[...document.querySelectorAll('[data-aplica]')]
      .find(x=>x.dataset.firma==='promocion'&&!x.disabled); if(b) b.click();}""")
    p.wait_for_timeout(900)
    d = p.evaluate("""(antes)=>({mas:BITACORA.length-antes,
      k02:BITACORA.some(e=>e.accion.startsWith('K-02')),
      hecha:document.body.textContent.includes('preparada · en la bandeja')})""", antes)
    if d['mas'] < 1 or not d['k02']:
        fallos.append('aplicar una promoción no dejó rastro K-02 en la bitácora')
    if not d['hecha']:
        fallos.append('la recomendación aplicada no cambia de estado en pantalla')

    # ── y el agente existe para la sala ─────────────────────────────────────
    va(p, 'agentes', 800)
    if not p.evaluate("()=>document.body.textContent.includes('impulsor de cartera')"):
        fallos.append('la sala de agentes no enseña al impulsor de cartera')

    fallos += p.errores
    p.close()
    return fallos, '%d frentes en cartera · ficha, torre y bitácora' % d.get('frentes', 10) if False else '10 frentes · ficha, torre y bitácora'


def c_mapa(nav, rapido):
    """El mapa de la fase 30 no puede inventar: tantos puntos como
    almacenes + clientes, cada cifra desde el stock crudo, el filtro por marca
    filtrando de verdad, el semáforo de la fase 28 en el borde — y sin red cae
    a la lista declarada en vez de reventar."""
    fallos = []
    p = nueva(nav)
    rol(p, 'direccion')
    va(p, 'mapa', 2600)

    d = p.evaluate(r"""()=>{
      const n=v=>Math.round(v||0).toLocaleString('es-VE');
      let cub=0, tot=0;
      for(const q of CATALOGO){const u=STOCK_HUB[q.sku]||0; tot+=u; if(q.marca==='Cubitt') cub+=u;}
      return {esperados:ALMACENES.length+CLIENTES.length,
        fallback:!document.querySelector('#mapa-fallback').hidden,
        mks:document.querySelectorAll('.mk').length,
        filas:document.querySelectorAll('[data-fb]').length,
        nTot:n(tot), nCub:n(cub),
        ec:(document.querySelector('[data-mk="EC"]')||{className:''}).className};}""")

    if d['fallback']:
        if d['filas'] != d['esperados']:
            fallos.append('fallback con %d filas y %d puntos en el modelo' % (d['filas'], d['esperados']))
        fallos.append('el mapa cayó a la lista con la red presente — no se pudo probar el mapa vivo')
    else:
        if d['mks'] != d['esperados']:
            fallos.append('%d marcadores y %d puntos en el modelo' % (d['mks'], d['esperados']))
        if 'e-riesgo' not in d['ec']:
            fallos.append('EC (estimación borrosa) sin su semáforo de riesgo en el borde')

        # el popup de la central dice lo que dice el stock crudo
        p.evaluate("()=>document.querySelector('[data-mk=\"ZLC\"]').click()")
        p.wait_for_timeout(700)
        pop = p.evaluate("()=>{const e=document.querySelector('.mapa-pop .pop-u');return e?e.textContent.trim():null}")
        if pop != d['nTot']:
            fallos.append('el popup de la central dice %s y el stock crudo %s' % (pop, d['nTot']))

        # el filtro por marca recalcula desde el inventario real
        p.evaluate("()=>document.querySelector('[data-marca=\"Cubitt\"]').click()")
        p.wait_for_timeout(1800)
        zlc = p.evaluate("()=>{const e=document.querySelector('[data-mk=\"ZLC\"] .mk-u');return e?e.textContent.trim():null}")
        if zlc != d['nCub']:
            fallos.append('con el filtro Cubitt la central dice %s y el crudo %s' % (zlc, d['nCub']))
        p.evaluate("()=>document.querySelector('[data-marca=\"ambas\"]').click()")
        p.wait_for_timeout(900)

        # ── el clic en un punto aterriza EN ese punto, no en su módulo ─────
        # Llevar a la lista genérica obligaba a buscar a mano lo que se acababa
        # de pulsar en el mapa: es la queja que originó este cambio.
        for punto, modulo, esAlm in (('VE', 'inventarios', True), ('CR', 'clientes', False)):
            va(p, 'mapa', 2600)
            p.evaluate("(k)=>{const m=document.querySelector('[data-mk=\"'+k+'\"]');"
                       "if(m) m.click();}", punto)
            p.wait_for_timeout(900)
            rot = p.evaluate("()=>{const x=document.querySelector('.mapa-pop [data-ir-ficha]');"
                             "return x?x.textContent.trim():null;}")
            if not rot:
                fallos.append('%s: el popup no ofrece llevar a su ficha' % punto)
                continue
            nombre = p.evaluate("(k)=>(puntosMapa().find(x=>x.id===k)||{}).nombre", punto)
            if not nombre or nombre not in rot:
                fallos.append('%s: el botón dice «%s» y no nombra su destino («%s»)'
                              % (punto, rot, nombre))
            p.evaluate("()=>document.querySelector('.mapa-pop [data-ir-ficha]').click()")
            p.wait_for_timeout(1400)
            a = 'alm' if esAlm else 'cli'
            d2 = p.evaluate("([k,a])=>({hash:location.hash,"
                            " abierto:(a==='alm'? _alm.abierto : _cli.abierto),"
                            " desplegada: !!document.querySelector("
                            "   '[data-'+a+'=\"'+k+'\"] table, [data-'+a+'=\"'+k+'\"] .rejilla')})",
                            [punto, a])
            if modulo not in d2['hash']:
                fallos.append('%s: el botón llevó a %s y esperaba %s' % (punto, d2['hash'], modulo))
            if d2['abierto'] != punto:
                fallos.append('%s: llegó al módulo pero sin marcar su tarjeta (abierto=%s)'
                              % (punto, d2['abierto']))
            if not d2['desplegada']:
                fallos.append('%s: su tarjeta no quedó desplegada al llegar' % punto)

    fallos += p.errores
    p.close()

    # ── sin red no revienta: se corta Mapbox y tiene que caer a la lista ────
    if not rapido:
        p = sesion_prueba.pagina(nav, SES, viewport={'width': 1560, 'height': 1000})
        p.errores = []
        p.on('pageerror', lambda e: p.errores.append('excepción: ' + str(e)[:140]))
        p.route('**://api.mapbox.com/**', lambda r: r.abort())
        p.route('**://events.mapbox.com/**', lambda r: r.abort())
        p.goto(BASE, wait_until='domcontentloaded')
        p.wait_for_timeout(900)
        rol(p, 'direccion')
        va(p, 'mapa', 600)
        p.wait_for_timeout(9000)   # la vigía del mapa son 8 s
        d = p.evaluate("""()=>({fallback:!document.querySelector('#mapa-fallback').hidden,
          filas:document.querySelectorAll('[data-fb]').length,
          esperados:ALMACENES.length+CLIENTES.length})""")
        if not d['fallback']:
            fallos.append('sin red, el mapa no cae a la lista declarada')
        elif d['filas'] != d['esperados']:
            fallos.append('sin red, la lista trae %d filas y el modelo %d' % (d['filas'], d['esperados']))
        fallos += p.errores
        p.close()

    return fallos, '%d puntos · filtro, popup y fallback sin red' % d['esperados']


def c_portal_vendedor(nav, rapido):
    """El portal de la fase 31. No se verifica que pinte, sino que su promesa
    sea cierta:

      · el ATP es libre(Colón) + libre(cada embarque), recomputado desde crudos
      · amarrar de un EMBARQUE EN EL MAR aparta ese contenedor concreto — es la
        pieza que da sentido a la fase, y la primera versión de esta
        comprobación no la probaba: solo reservaba del hub, y por eso una
        trampa sobre el ATP del mar salió ciega
      · amarrar descuenta EN EL APLICATIVO INTERNO, que es otro documento
      · por encima del tope la reserva pide firma, y lo dice en el botón
      · soltar devuelve las unidades y deja el par en la bitácora
    """
    fallos = []
    ctx = sesion_prueba.sembrar(nav.new_context(viewport={'width': 1560, 'height': 1100}), SES)

    def abre(url, espera=1400):
        pg = ctx.new_page()
        pg.errores = []
        pg.on('pageerror', lambda e: pg.errores.append('excepción: ' + str(e)[:140]))
        pg.on('console', lambda m: pg.errores.append('consola: ' + m.text[:140])
              if m.type == 'error' else None)
        pg.goto(url, wait_until='networkidle')
        pg.wait_for_timeout(espera)
        return pg

    p = abre(BASE + 'portal-vendedor/')

    # las referencias se ELIGEN por lo que hace falta probar, no a mano: una con
    # holgura en el hub para el tope, y otra que venga en un embarque
    elec = p.evaluate("""()=>{
      const tope=REGLAS.topeReservaVendedor.v;
      const hub=CATALOGO.map(q=>({sku:q.sku,...atp(q.sku)}))
        .filter(x=>x.hub>tope+300).sort((a,b)=>b.hub-a.hub)[0];
      let mar=null;
      for(const q of CATALOGO){
        for(const t of TRANSITOS){
          const l=disponible(q.sku,t.id);
          if(l>400){ mar={sku:q.sku, emb:t.id, libre:l}; break; }
        }
        if(mar) break;
      }
      return {tope, hub, mar};}""")
    if not elec['hub'] or not elec['mar']:
        ctx.close()
        return ['no hay existencia suficiente para probar el portal (%s)' % elec], '—'
    SKU, TOPE = elec['hub']['sku'], elec['tope']
    SKU_MAR, EMB = elec['mar']['sku'], elec['mar']['emb']

    sis = abre(BASE + '#/comercial/demanda')
    antes_sis = sis.evaluate("(k)=>disponible(k,'ZLC')", SKU)

    # ── 1 · los KPI contra los crudos ───────────────────────────────────────
    d = p.evaluate("""()=>{
      const n=v=>Math.round(v||0).toLocaleString('es-VE');
      let hub=0, mar=0;
      for(const q of CATALOGO){
        hub+=disponible(q.sku,'ZLC');
        for(const t of TRANSITOS) mar+=disponible(q.sku,t.id);
      }
      return {kAtp:document.querySelector('#k-atp').textContent.trim(),
        kHub:document.querySelector('#k-hub').textContent.trim(),
        kMar:document.querySelector('#k-mar').textContent.trim(),
        nHub:n(hub), nMar:n(mar), nTot:n(hub+mar),
        filas:document.querySelectorAll('[data-sku]').length, refs:CATALOGO.length};}""")
    if d['kHub'] != d['nHub'] or d['kMar'] != d['nMar'] or d['kAtp'] != d['nTot']:
        fallos.append('los KPI (%s = %s + %s) no cuadran con los crudos (%s = %s + %s)'
                      % (d['kAtp'], d['kHub'], d['kMar'], d['nTot'], d['nHub'], d['nMar']))
    if d['filas'] != d['refs']:
        fallos.append('%d filas en el catálogo y %d referencias' % (d['filas'], d['refs']))

    def amarra(sku, origen, cuanto):
        """Abre el cajón de una referencia, elige origen y cantidad, y pulsa."""
        p.evaluate("(k)=>{const b=document.querySelector('[data-abre=\"'+k+'\"]');"
                   "if(b) b.click();}", sku)
        p.wait_for_timeout(400)
        if origen != 'ZLC':
            p.evaluate("(o)=>{const r=document.querySelector('[name=\"origen\"][value=\"'+o+'\"]');"
                       "if(r){r.checked=true; r.dispatchEvent(new Event('change',{bubbles:true}));}}", origen)
            p.wait_for_timeout(500)
        p.fill('#cant', str(cuanto))
        p.wait_for_timeout(400)
        b = p.evaluate("()=>{const x=document.querySelector('#reservar');"
                       "return x?{rot:x.textContent.trim(), off:x.disabled}:null;}")
        if not b:
            return None
        if not b['off']:
            p.click('#reservar')
            p.wait_for_timeout(800)
        return b

    # ── 2 · amarrar de un EMBARQUE: la pieza que da sentido a la fase ───────
    libre_emb = p.evaluate("([k,e])=>disponible(k,e)", [SKU_MAR, EMB])
    cuanto_mar = min(200, libre_emb)
    b = amarra(SKU_MAR, EMB, cuanto_mar)
    if not b or b['off']:
        fallos.append('no se pudo amarrar del embarque %s (%s)' % (EMB, b))
    else:
        ahora = p.evaluate("([k,e])=>disponible(k,e)", [SKU_MAR, EMB])
        if libre_emb - ahora != cuanto_mar:
            fallos.append('amarrar %d u del embarque %s no las apartó de ESE contenedor (%d → %d)'
                          % (cuanto_mar, EMB, libre_emb, ahora))
        guard = p.evaluate("(e)=>reservasDelPortal().some(r=>r.ubicacion===e)", EMB)
        if not guard:
            fallos.append('la reserva sobre un embarque no se guardó con su contenedor')

    # ── 3 · amarrar del hub por debajo del tope, y que el aplicativo lo vea ──
    cuanto = max(1, TOPE // 2)
    b = amarra(SKU, 'ZLC', cuanto)
    if not b:
        fallos.append('no apareció el botón de reserva para %s' % SKU)
    elif 'firma' in b['rot']:
        fallos.append('por debajo del tope (%d de %d u) el botón ya pide firma: «%s»'
                      % (cuanto, TOPE, b['rot']))
    else:
        sis.reload(wait_until='networkidle')
        sis.wait_for_timeout(1600)
        despues_sis = sis.evaluate("(k)=>disponible(k,'ZLC')", SKU)
        if antes_sis - despues_sis != cuanto:
            fallos.append('el aplicativo interno no vio la reserva: %d → %d (esperado −%d)'
                          % (antes_sis, despues_sis, cuanto))
        if not sis.evaluate("()=>BITACORA.some(e=>e.accion.startsWith('W-01'))"):
            fallos.append('la reserva del portal no aparece en la bitácora del aplicativo')

    # ── 4 · por encima del tope: pide firma ────────────────────────────────
    hueco = p.evaluate("(k)=>atp(k).hub", SKU)
    sobre = min(TOPE + 100, hueco)
    if sobre <= TOPE:
        fallos.append('no queda existencia para probar el tope (%d libres, tope %d)' % (hueco, TOPE))
    else:
        b = amarra(SKU, 'ZLC', sobre)
        if not b:
            fallos.append('no apareció el botón para la reserva por encima del tope')
        elif 'firma' not in b['rot']:
            fallos.append('por encima del tope (%d u de %d) el botón no pide firma: «%s»'
                          % (sobre, TOPE, b['rot']))

    # ── 5 · mis reservas, y soltar devuelve ────────────────────────────────
    p.evaluate("()=>document.querySelector('[data-pest=\"reservas\"]').click()")
    p.wait_for_timeout(700)
    d2 = p.evaluate("""()=>({n:document.querySelectorAll('[data-res]').length,
      espera:document.body.textContent.includes('espera firma'),
      guardadas:reservasDelPortal().length})""")
    if d2['guardadas'] != 3 or d2['n'] != 3:
        fallos.append('mis reservas enseña %d y hay %d guardadas (esperadas 3: mar, hub, sobre-tope)'
                      % (d2['n'], d2['guardadas']))
    if not d2['espera']:
        fallos.append('la reserva por encima del tope no se marca como «espera firma»')

    if d2['n']:
        antes_soltar = p.evaluate("(k)=>atp(k).total", SKU_MAR)
        p.evaluate("""(e)=>{const f=[...document.querySelectorAll('[data-res]')]
          .find(x=>x.textContent.includes(e)); if(f) f.querySelector('[data-suelta]').click();}""", EMB)
        p.wait_for_timeout(800)
        d3 = p.evaluate("([k,a])=>({n:reservasDelPortal().length, sube:atp(k).total>a,"
                        " par:BITACORA.some(e=>e.accion.startsWith('W-02'))})", [SKU_MAR, antes_soltar])
        if d3['n'] != 2:
            fallos.append('soltar no quitó la reserva guardada (quedan %d de 3)' % d3['n'])
        if not d3['sube']:
            fallos.append('soltar no devolvió las unidades del embarque al disponible')
        if not d3['par']:
            fallos.append('soltar no dejó su W-02 en la bitácora')

    # ── 6 · el portal en un móvil: ninguna pestaña puede desbordar ─────────
    # (hueco real: el catálogo desbordaba a 430 px y nadie lo medía — el
    #  aplicativo interno sí se mide en `rutas`, pero el portal es otra página)
    if not rapido:
        m = ctx.new_page()
        m.set_viewport_size({'width': 430, 'height': 900})
        m.goto(BASE + 'portal-vendedor/', wait_until='networkidle')
        m.wait_for_timeout(1300)
        for pest in ('catalogo', 'mar', 'reservas'):
            m.evaluate("(k)=>{const b=document.querySelector('[data-pest=\"'+k+'\"]');"
                       "if(b) b.click();}", pest)
            m.wait_for_timeout(500)
            if m.evaluate("()=>document.documentElement.scrollWidth>"
                          "document.documentElement.clientWidth+2"):
                fallos.append('la pestaña «%s» desborda la ventana a 430 px' % pest)

    fallos += p.errores + sis.errores
    ctx.close()
    return fallos, 'ATP contra crudos · amarre de un embarque · cruce al aplicativo · tope, soltar y móvil'


def c_portal_cliente(nav, rapido):
    """El portal de la fase 32. Sus tres promesas, verificadas:

      · el crédito BLOQUEA con motivo escrito — no en silencio ni aprobando
      · la escalera de precedencia se PUBLICA, y el peldaño que se resalta es
        el que le toca a ese cliente por su tipo
      · lo que sube el cliente pasa por el cedazo: reconocidas y en cola, con
        las cifras del reporte real, y la banda de la fase 28 dicha a su dueño

    Y lo de siempre: precio, crédito y disponible recomputados desde los
    crudos, no desde la función que pinta.
    """
    fallos = []
    ctx = sesion_prueba.sembrar(nav.new_context(viewport={'width': 1560, 'height': 1200}), SES)
    p = ctx.new_page()
    p.errores = []
    p.on('pageerror', lambda e: p.errores.append('excepción: ' + str(e)[:140]))
    p.on('console', lambda m: p.errores.append('consola: ' + m.text[:140])
         if m.type == 'error' else None)
    p.goto(BASE + 'portal-cliente/', wait_until='networkidle')
    p.wait_for_timeout(1500)

    # ── 1 · catálogo: precio y disponible contra los crudos ────────────────
    d = p.evaluate("""()=>{
      const f=FRENTES.find(x=>x.id===_c.cliente);
      const mon=MONEDA_FRENTE[f.id]||'USD';
      const fila=document.querySelector('[data-sku]');
      const sku=fila?fila.dataset.sku:null;
      const q=CATALOGO.find(x=>x.sku===sku);
      const precioUSD=valorMayoreo(q);
      const esperado=mon==='USD'?dinero(precioUSD):dinero(deUSD(precioUSD,mon).valor,mon);
      const n=v=>Math.round(v||0).toLocaleString('es-VE');
      return {sku, precio:fila.querySelector('.c-precio').textContent.trim(), esperado,
        atp:fila.querySelector('.c-atp').textContent.trim(), atpEsp:n(atp(sku).total),
        filas:document.querySelectorAll('[data-sku]').length,
        conStock:CATALOGO.filter(x=>atp(x.sku).total>0).length,
        credito:f.credito-f.saldo, moneda:mon, tipo:f.tipo};}""")
    if d['precio'] != d['esperado']:
        fallos.append('el precio de %s dice %s y el mayoreo da %s' % (d['sku'], d['precio'], d['esperado']))
    if d['atp'] != d['atpEsp']:
        fallos.append('el disponible de %s dice %s y el ATP da %s' % (d['sku'], d['atp'], d['atpEsp']))
    if d['filas'] != d['conStock']:
        fallos.append('%d filas y %d referencias con existencia' % (d['filas'], d['conStock']))

    # ── 2 · un pedido que CABE se confirma y deja rastro ───────────────────
    p.evaluate("""()=>{const i=document.querySelector('[data-pedir]');
      i.value='30'; i.dispatchEvent(new Event('input',{bubbles:true}));}""")
    p.wait_for_timeout(700)
    d2 = p.evaluate("""()=>({bloqueo:!!document.querySelector('#c-bloqueo'),
      off:document.querySelector('#confirmar').disabled,
      total:document.querySelector('#c-total').textContent.trim()})""")
    if d2['bloqueo'] or d2['off']:
        fallos.append('un pedido dentro del crédito aparece bloqueado (%s)' % d2)
    else:
        antes = p.evaluate("()=>PEDIDOS.length")
        p.click('#confirmar')
        p.wait_for_timeout(900)
        d3 = p.evaluate("(a)=>({nuevos:PEDIDOS.length-a,"
                        " y01:BITACORA.some(e=>e.accion.startsWith('Y-01')),"
                        " confirmado:document.body.textContent.includes('recibido'),"
                        " carro:Object.keys(_c.carro).length})", antes)
        if d3['nuevos'] != 1:
            fallos.append('confirmar no creó el pedido en el modelo')
        if not d3['y01']:
            fallos.append('el pedido del portal no dejó su Y-01 en la bitácora')
        if not d3['confirmado'] or d3['carro']:
            fallos.append('tras confirmar, la pantalla no lo acusa o el carrito no se vacía')

    # ── 3 · un pedido que NO cabe: bloqueo con motivo, nunca en silencio ───
    p.evaluate("""()=>{document.querySelectorAll('[data-pedir]').forEach((i,k)=>{
      if(k<3){ i.value='99999'; i.dispatchEvent(new Event('input',{bubbles:true})); }});}""")
    p.wait_for_timeout(800)
    d4 = p.evaluate("""()=>{const b=document.querySelector('#c-bloqueo');
      const f=FRENTES.find(x=>x.id===_c.cliente);
      return {hay:!!b, off:document.querySelector('#confirmar').disabled,
        dice:b?b.textContent:'',
        limite:dinero(f.credito), consumido:dinero(f.saldo)};}""")
    if not d4['hay']:
        fallos.append('un pedido que excede el crédito NO se bloquea')
    else:
        if not d4['off']:
            fallos.append('el pedido excede el crédito y el botón de confirmar sigue vivo')
        for trozo, que in [('excede su línea de crédito', 'no dice que excede'),
                           (d4['limite'], 'no dice el límite'),
                           (d4['consumido'], 'no dice lo consumido')]:
            if trozo not in d4['dice']:
                fallos.append('el bloqueo %s — «%s»' % (que, d4['dice'].strip()[:70]))
    # se limpia el carrito para no arrastrarlo
    p.evaluate("""()=>{document.querySelectorAll('[data-pedir]').forEach(i=>{
      i.value=''; i.dispatchEvent(new Event('input',{bubbles:true}));});}""")
    p.wait_for_timeout(600)

    # ── 4 · la escalera publicada, con SU peldaño resaltado ────────────────
    p.evaluate("()=>document.querySelector('[data-pest=\"preventa\"]').click()")
    p.wait_for_timeout(700)
    d5 = p.evaluate("""()=>{
      const f=FRENTES.find(x=>x.id===_c.cliente);
      const toca=(f.tipo==='propio'||f.tipo==='socio')?'nominal':'ciclo';
      const esp=ESCALERA.find(e=>e.clave===toca);
      const mios=[...document.querySelectorAll('.c-escalera .pel.mio')];
      return {peldanos:document.querySelectorAll('.c-escalera .pel').length,
        total:ESCALERA.length, mios:mios.length,
        dice:mios.length?+mios[0].dataset.pel:null, esperado:esp.n};}""")
    if d5['peldanos'] != d5['total']:
        fallos.append('la escalera enseña %d peldaños y son %d' % (d5['peldanos'], d5['total']))
    if d5['mios'] != 1 or d5['dice'] != d5['esperado']:
        fallos.append('el peldaño resaltado es el %s y a este cliente le toca el %s'
                      % (d5['dice'], d5['esperado']))

    # ── 5 · el reporte pasa por el cedazo, con las cifras del reporte real ──
    p.evaluate("()=>document.querySelector('[data-pest=\"reportar\"]').click()")
    p.wait_for_timeout(700)
    p.evaluate("()=>{const b=document.querySelector('#subir'); if(b) b.click();}")
    p.wait_for_timeout(800)
    d6 = p.evaluate("""()=>{
      const r=REPORTES[_c.cliente];
      const rec=r.filas.filter(x=>x.resuelto).length, cola=r.filas.length-rec;
      const dist=inventarioDistribuido().clientes.find(c=>c.f.id===_c.cliente);
      const t=document.body.textContent;
      const n=v=>Math.round(v||0).toLocaleString('es-VE');
      return {rec, cola, diceRec:t.includes(rec+' reconocidas'),
        diceCola:!cola||t.includes(cola+' en cola'),
        y02:BITACORA.some(e=>e.accion.startsWith('Y-02')),
        banda:!dist||!dist.banda||t.includes(n(dist.banda)+' u')};}""")
    if not d6['diceRec'] or not d6['diceCola']:
        fallos.append('el reporte no dice %d reconocidas y %d en cola' % (d6['rec'], d6['cola']))
    if not d6['y02']:
        fallos.append('subir el reporte no dejó su Y-02 en la bitácora')
    if not d6['banda']:
        fallos.append('el portal no le dice al cliente su banda de incertidumbre (fase 28)')

    # ── 6 · mi cuenta: el crédito contra los crudos ────────────────────────
    p.evaluate("()=>document.querySelector('[data-pest=\"cuenta\"]').click()")
    p.wait_for_timeout(700)
    d7 = p.evaluate("""()=>{const f=FRENTES.find(x=>x.id===_c.cliente);
      return {lim:document.querySelector('#c-limite').textContent.trim(),
        limEsp:dinero(f.credito),
        disp:document.querySelector('#c-disp').textContent.trim(),
        dispEsp:dinero(f.credito-f.saldo),
        promos:document.querySelectorAll('[data-promo]').length,
        promosEsp:promosDe(f.id).length};}""")
    if d7['lim'] != d7['limEsp'] or d7['disp'] != d7['dispEsp']:
        fallos.append('mi cuenta dice límite %s / disponible %s y los crudos %s / %s'
                      % (d7['lim'], d7['disp'], d7['limEsp'], d7['dispEsp']))
    if d7['promos'] != d7['promosEsp']:
        fallos.append('%d promociones en pantalla y %d en PROMOS' % (d7['promos'], d7['promosEsp']))

    # ── 7 · un frente con Odoo no tiene que subir nada ─────────────────────
    p.select_option('#cliente', 'VE')
    p.wait_for_timeout(800)
    p.evaluate("()=>document.querySelector('[data-pest=\"reportar\"]').click()")
    p.wait_for_timeout(700)
    if not p.evaluate("()=>document.body.textContent.includes('su sistema ya está conectado')"):
        fallos.append('a un frente con Odoo se le sigue pidiendo subir un archivo')

    # ── 8 · el portal en un móvil ──────────────────────────────────────────
    if not rapido:
        m = ctx.new_page()
        m.set_viewport_size({'width': 430, 'height': 900})
        m.goto(BASE + 'portal-cliente/', wait_until='networkidle')
        m.wait_for_timeout(1400)
        for pest in ('comprar', 'preventa', 'pedidos', 'reportar', 'cuenta'):
            m.evaluate("(k)=>{const b=document.querySelector('[data-pest=\"'+k+'\"]');"
                       "if(b) b.click();}", pest)
            m.wait_for_timeout(500)
            if m.evaluate("()=>document.documentElement.scrollWidth>"
                          "document.documentElement.clientWidth+2"):
                fallos.append('la pestaña «%s» desborda la ventana a 430 px' % pest)

    fallos += p.errores
    ctx.close()
    return fallos, 'precio y crédito contra crudos · bloqueo con motivo · escalera · cedazo'


CHEQUEOS = {
    'rutas': c_rutas, 'contraste': c_contraste, 'recorrido': c_recorrido,
    'permisos': c_permisos, 'reglas': c_reglas, 'moneda': c_moneda, 'freno': c_freno,
    'portada': c_portada, 'inventarios': c_inventarios, 'distribuido': c_distribuido,
    'clientes': c_clientes, 'mapa': c_mapa, 'portal-vendedor': c_portal_vendedor,
    'portal-cliente': c_portal_cliente,
}


def main():
    global SES
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    rapido = '--rapido' in sys.argv
    pedidos = args or list(CHEQUEOS)
    malos = [a for a in pedidos if a not in CHEQUEOS]
    if malos:
        print('no conozco: %s' % ', '.join(malos))
        print('disponibles: %s' % ', '.join(CHEQUEOS))
        return 2

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print('falta Playwright:  pip install playwright  &&  playwright install chromium')
        return 2

    print('=== comprobaciones del prototipo%s ===' % (' · modo rápido' if rapido else ''))
    SES = sesion_prueba.exigir()
    fallados = []
    t0 = time.time()
    with Servidor(), sync_playwright() as pw:
        nav = pw.chromium.launch()
        for nombre in pedidos:
            t1 = time.time()
            try:
                fallos, resumen = CHEQUEOS[nombre](nav, rapido)
            except Exception as e:                    # noqa: BLE001
                fallos, resumen = ['la comprobación reventó: %s' % str(e)[:160]], '—'
            marca = 'OK  ' if not fallos else 'MAL '
            print('\n%s %-10s %-42s %4.1f s' % (marca, nombre, resumen, time.time() - t1))
            for f in fallos[:12]:
                print('       · %s' % f)
            if len(fallos) > 12:
                print('       · …y %d más' % (len(fallos) - 12))
            if fallos:
                fallados.append(nombre)
        nav.close()

    print('\n' + '─' * 70)
    if fallados:
        print('FALLAN: %s   (%.0f s)' % (', '.join(fallados), time.time() - t0))
        return 1
    print('TODO CORRECTO · %d comprobaciones (%.0f s)' % (len(pedidos), time.time() - t0))
    return 0


if __name__ == '__main__':
    sys.exit(main())
