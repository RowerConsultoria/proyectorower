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

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = 'http://localhost:8080/sistema/'
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
    p = nav.new_page(viewport={'width': ancho, 'height': alto})
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
  const fondoDe=e=>{let n=e;
    while(n&&n!==document.documentElement){
      const st=getComputedStyle(n);
      if(st.backgroundImage&&st.backgroundImage!=='none') return null;
      const c=st.backgroundColor, v=rgb(c);
      if(v&&c!=='transparent'){const a=(c.match(/[\d.]+/g)||[])[3];
        if(a===undefined||+a>.6) return v;}
      n=n.parentElement;}
    return rgb(getComputedStyle(document.body).backgroundColor)||[255,255,255];};
  const malos=[];
  for(const e of document.querySelectorAll('.lienzo *')){
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
    return fallos, 'texto medido en %d pantallas × %d tema(s)' % (len(RUTAS), 1 if rapido else 2)


def c_recorrido(nav, rapido):
    """Las 12 paradas llegan a su ruta, hallan su ancla, y CADA CIFRA del guion
    aparece en la pantalla que la sostiene. Es la comprobación que descubrió que
    el guion decía «5 frentes con Odoo» cuando eran 3."""
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
    for i in range(total):
        if i:
            p.click('#rec-sigue')
            p.wait_for_timeout(720)
        d = p.evaluate("""()=>{const q=RECORRIDO[_rec.paso];
            return {n:_rec.paso+1, pide:q.ruta, hash:location.hash.replace('#/',''),
                    ancla:q.foco||null,
                    hallada: q.foco? !!document.querySelector('.lienzo '+q.foco) : true,
                    guion:document.querySelector('.rec-txt').innerText,
                    pantalla:document.querySelector('.lienzo').innerText};}""")
        if d['hash'] != d['pide']:
            fallos.append('paso %d: pide #/%s y quedó en #/%s' % (d['n'], d['pide'], d['hash']))
        if not d['hallada']:
            fallos.append('paso %d: no encuentra su ancla %s' % (d['n'], d['ancla']))
        if 'no pudo leer' in d['guion']:
            fallos.append('paso %d: el guion no pudo leer sus cifras del núcleo' % d['n'])
        pantalla = d['pantalla'].replace(' ', ' ')
        for c in num.findall(d['guion']):
            c = c.rstrip('.')
            if len(c) < 3 or c in ('100',):
                continue                      # 1, 2, 3… son ordinales, no cifras
            if c not in pantalla:
                fallos.append('paso %d: el guion dice «%s» y no está en la pantalla'
                              % (d['n'], c))
    fallos += p.errores
    p.close()
    return fallos, '%d paradas y sus cifras' % total


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
    reglas son el argumento."""
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
    return fallos, 'cifras de %d pantallas' % len(RUTAS)


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
    p = nav.new_page(viewport={'width': 1560, 'height': 1000})
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

    fallos += p.errores
    p.close()

    # ── sin red no revienta: se corta Mapbox y tiene que caer a la lista ────
    if not rapido:
        p = nav.new_page(viewport={'width': 1560, 'height': 1000})
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


CHEQUEOS = {
    'rutas': c_rutas, 'contraste': c_contraste, 'recorrido': c_recorrido,
    'permisos': c_permisos, 'reglas': c_reglas, 'moneda': c_moneda, 'freno': c_freno,
    'portada': c_portada, 'inventarios': c_inventarios, 'distribuido': c_distribuido,
    'clientes': c_clientes, 'mapa': c_mapa,
}


def main():
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
