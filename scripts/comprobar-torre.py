# -*- coding: utf-8 -*-
"""Comprobaciones de la torre — Proyecto Rower.

La torre son dos vistas del MISMO modelo (`arquitectura-datos.js`): la 3D
(`arquitectura-ia-kenex.html`) y la plana de respaldo
(`arquitectura-ia-plana.html`). Estas comprobaciones existen para que no
puedan divergir, y sobre todo para cazar el defecto que más veces apareció
construyéndola: **la escena afirma un estado que el código no produce**.

    1. modelo     coherencia interna, sin navegador (~0 s)
    2. plana      la versión de respaldo pinta, sin desbordes ni solapes
    3. rack       la escena 3D se monta y cuadra con el modelo
    4. gavetas    cada piso abre en UN panel, con sus agentes y sellos
    4b. corriente los cables se mueven de verdad, al ritmo declarado
    7b. rotulos   ningún rótulo se pisa, se sale ni queda bajo la barra
    7c. plegado   la flecha pliega cabecera y pie y el mapa gana ese alto
    5. bajada     los arcos salen de la decisión y caen sobre su fuente
    6. modo       hoy / propuesto, y los textos salen del modelo
    7. recorrido  las 8 paradas en orden, AL REVÉS y saltando
    8. contraste  WCAG AA sobre las dos vistas

Uso:
    python scripts/comprobar-torre.py            # todo
    python scripts/comprobar-torre.py modelo     # solo una

Levanta el servidor si el puerto está libre y lo apaga al terminar. Sale con
código 1 si algo falla.

⚠️ La escena es WebGL. Aquí se fuerza SwiftShader (render por software) para
que las comprobaciones corran en cualquier equipo, también sin GPU.
"""
import io
import json
import os
import socket
import subprocess
import sys
import time

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUERTO = 8080
BASE = 'http://localhost:%d/informe/fase1/' % PUERTO
TORRE = BASE + 'arquitectura-ia-kenex.html'
PLANA = BASE + 'arquitectura-ia-plana.html'
ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']


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
        raise RuntimeError('no se pudo levantar el servidor')

    def __exit__(self, *a):
        if self.proc:
            self.proc.terminate()
            print('· servidor apagado')


# ── utilidades ───────────────────────────────────────────────────────────────

def abre(nav, url, espera=3800, ancho=1700, alto=1150):
    p = nav.new_page(viewport={'width': ancho, 'height': alto})
    p.errores = []
    p.on('pageerror', lambda e: p.errores.append('excepción: ' + str(e)[:150]))
    p.on('console', lambda m: p.errores.append('consola: ' + m.text[:150])
         if m.type == 'error' else None)
    p.on('response', lambda r: p.errores.append('recurso %d: %s' % (r.status, r.url.split('/')[-1]))
         if r.status >= 400 else None)
    p.goto(url, wait_until='networkidle')
    p.wait_for_timeout(espera)
    return p


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
  for(const e of document.querySelectorAll('body *')){
    if(!e.textContent.trim()||e.children.length) continue;
    const st=getComputedStyle(e);
    if(st.display==='none'||st.visibility==='hidden'||+st.opacity<0.5) continue;
    if(st.backgroundImage&&st.backgroundImage!=='none') continue;
    const padre=e.parentElement;
    if(padre&&getComputedStyle(padre).backgroundImage!=='none') continue;
    const r0=e.getBoundingClientRect(); if(!r0.width||!r0.height) continue;
    const f=rgb(st.color); if(!f) continue;
    const b=fondoDe(e); if(!b) continue;
    const L1=lum(f), L2=lum(b);
    const r=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);
    const px=parseFloat(st.fontSize);
    const grande=px>=24||(px>=18.66&&+st.fontWeight>=700);
    const min=grande?3:4.5;
    if(r<min) malos.push({t:e.textContent.trim().slice(0,32),
      r:+r.toFixed(2), min, px:+px.toFixed(1), cls:(e.className||'').toString().slice(0,26)});}
  return malos;}
"""


# ── 1 · el modelo, sin navegador ─────────────────────────────────────────────

def c_modelo(nav):
    """Coherencia interna: toda raíz entra a un nivel real por una vía
    declarada, toda bajada conecta cosas que existen, ningún nivel de entrada
    queda sin raíces, y cada cadencia tiene un solo ritmo."""
    fuente = os.path.join(RAIZ, 'informe', 'fase1', 'arquitectura-datos.js')
    salida = subprocess.run(
        [_node(), '-e', _JS_MODELO, fuente], capture_output=True, text=True,
        encoding='utf-8', cwd=RAIZ)
    if salida.returncode != 0:
        return ['no se pudo evaluar el modelo: ' + (salida.stderr or '')[:200]], '—'
    d = json.loads(salida.stdout)
    return d['fallos'], '%d niveles · %d raíces · %d bajadas' % (d['niveles'], d['raices'], d['bajadas'])


def _node():
    return 'node'


_JS_MODELO = r"""
const m = require(process.argv[1]);
const {NIVELES, RAICES, BAJADAS, VIAS, AUTONOMIA, CEDAZO} = m;
const fallos = [];
const ids = new Set(NIVELES.map(n => n.id));
const raiz = new Set(RAICES.map(r => r.id));

for (const r of RAICES) {
  if (!ids.has(r.nivel)) fallos.push('la raíz ' + r.id + ' entra a un nivel inexistente: ' + r.nivel);
  if (!VIAS[r.via]) fallos.push('la raíz ' + r.id + ' usa una vía sin declarar: ' + r.via);
  for (const c of ['dato','cadencia','dueno','hoy','rompe'])
    if (!r[c]) fallos.push('la raíz ' + r.id + ' no declara ' + c);
  if (!(r.ritmo >= 1 && r.ritmo <= 5)) fallos.push('la raíz ' + r.id + ' no declara un ritmo de 1 a 5');
  if (!(r.grado >= 1)) fallos.push('la raíz ' + r.id + ' no declara grado');
}
for (const b of BAJADAS) {
  if (!ids.has(b.desde)) fallos.push('la bajada ' + b.id + ' sale de un nivel inexistente');
  if (!raiz.has(b.hacia)) fallos.push('la bajada ' + b.id + ' llega a una raíz inexistente: ' + b.hacia);
  if (!b.que || !b.nota) fallos.push('la bajada ' + b.id + ' no dice qué baja o por qué');
}
for (const n of NIVELES.filter(n => RAICES.some(r => r.nivel === n.id) || n.n <= 2)) {
  if (n.n <= 2 && !RAICES.some(r => r.nivel === n.id))
    fallos.push('el nivel ' + n.id + ' no tiene ninguna raíz que lo alimente');
}
for (const n of NIVELES) {
  if (!n.hace || !n.hace.length) fallos.push('el nivel ' + n.id + ' no dice qué hace');
  if (!n.noHace) fallos.push('el nivel ' + n.id + ' no dice qué NO hace');
  /* La frase con que ABRE el panel del piso. Sin ella el lector cae directo a
     una lista de capacidades sin saber en qué piso está. 90 caracteres es el
     suelo: por debajo es un lema, no una explicación. */
  if (!n.que || n.que.length < 90)
    fallos.push('el piso ' + n.id + ' no dice en una frase QUÉ es (tiene ' +
                ((n.que || '').length) + ' caracteres)');
  for (const a of (n.agentes || []))
    if (!AUTONOMIA[a.nivel]) fallos.push('el agente ' + a.nombre + ' declara una autonomía inválida');
}
/* el cedazo es lo que más se pregunta: tiene que decir qué hace, por qué está
   entre dos pisos, y cuándo algo NO pasa — antes de los cuatro casos */
for (const c of ['que', 'porQue', 'cuando', 'destino', 'nota'])
  if (!CEDAZO[c] || CEDAZO[c].length < 20)
    fallos.push('el cedazo no declara «' + c + '»');
if (!CEDAZO.criterios || CEDAZO.criterios.length < 3)
  fallos.push('el cedazo no enumera los casos en que algo no pasa');
/* una cadencia con dos ritmos distintos se lee como contradicción */
const porCad = {};
for (const r of RAICES) (porCad[r.cadencia] = porCad[r.cadencia] || new Set()).add(r.ritmo);
for (const [c, v] of Object.entries(porCad))
  if (v.size > 1) fallos.push('la cadencia «' + c + '» tiene ' + v.size + ' ritmos distintos');

const e = CEDAZO.ejemplo;
if (e.entran !== e.certifican + e.cola)
  fallos.push('la cuenta del cedazo no cuadra: ' + e.entran + ' ≠ ' + e.certifican + ' + ' + e.cola);

console.log(JSON.stringify({fallos, niveles: NIVELES.length,
  raices: RAICES.length, bajadas: BAJADAS.length}));
"""


# ── 2 · la versión plana ─────────────────────────────────────────────────────

def c_plana(nav):
    """El respaldo pinta entero: nada desborda su caja, nada se solapa, y cada
    cable sale de su tarjeta y acaba dentro de su nivel."""
    p = abre(nav, PLANA, 1200)
    d = p.evaluate(r"""()=>{
      const cajas=[...document.querySelectorAll('.raiz,.nivel,.cedazo,.cola')];
      const desb=cajas.filter(e=>e.scrollHeight>e.clientHeight+2).map(e=>e.id);
      const r=cajas.map(e=>({id:e.id,b:e.getBoundingClientRect()})); const sol=[];
      for(let i=0;i<r.length;i++)for(let j=i+1;j<r.length;j++){const a=r[i].b,c=r[j].b;
        if(!(a.right<=c.left+1||a.left>=c.right-1||a.bottom<=c.top+1||a.top>=c.bottom-1))
          sol.push(r[i].id+' ∩ '+r[j].id);}
      const malos=[];
      for(const raiz of RAICES){
        const p=document.querySelector('#cable-'+raiz.id);
        if(!p){malos.push(raiz.id+': sin cable');continue;}
        const fin=p.getPointAtLength(p.getTotalLength()), c=CAJA[raiz.nivel];
        if(fin.y<c.y-2||fin.y>c.y+c.h+2) malos.push(raiz.id+': el cable acaba fuera de su nivel');
        const ini=p.getPointAtLength(0), s=SITIO[raiz.id];
        if(ini.y<s.y-2||ini.y>s.y+s.h+2) malos.push(raiz.id+': el cable no sale de su tarjeta');}
      return {desb, sol, malos,
        niveles:document.querySelectorAll('.nivel').length,
        raices:document.querySelectorAll('.raiz').length};}""")
    fallos = (['desborda su caja: ' + x for x in d['desb']] + d['sol'] + d['malos'] + p.errores)
    if d['niveles'] != 4:
        fallos.append('se pintan %d niveles y el modelo tiene 4' % d['niveles'])
    n = d['raices']
    p.close()
    return fallos, '%d niveles y %d raíces' % (d['niveles'], n)


# ── 3 · la escena 3D ─────────────────────────────────────────────────────────

def c_rack(nav):
    """La escena se monta y cuadra con el modelo: una bandeja por nivel más el
    tamiz, un pedestal y un rótulo por raíz, una corriente por cable."""
    p = abre(nav, TORRE)
    d = p.evaluate(r"""()=>{const T=window.__torre;
      return {lienzo:!!document.querySelector('#lienzo3d canvas'),
        sinwebgl:getComputedStyle(document.querySelector('#sinwebgl')).display,
        bandejas:Object.keys(T.bandejas).length, esperaBandejas:NIVELES.length+1,
        raices:Object.keys(T.sitio).length, esperaRaices:RAICES.length,
        chapas:document.querySelectorAll('.chapa').length,
        etiquetas:document.querySelectorAll('.eti').length,
        corrientes:T.corrientes.length,
        esperaCorrientes:RAICES.length+NIVELES.length,
        leds:T.ledsVivos.length};}""")
    fallos = list(p.errores)
    if not d['lienzo']:
        fallos.append('no se creó el lienzo WebGL')
    if d['sinwebgl'] != 'none':
        fallos.append('salió el aviso de «sin WebGL» habiendo WebGL')
    for k, e, q in [('bandejas', 'esperaBandejas', 'bandejas'), ('raices', 'esperaRaices', 'raíces'),
                    ('chapas', 'esperaBandejas', 'chapas'), ('etiquetas', 'esperaRaices', 'etiquetas'),
                    ('corrientes', 'esperaCorrientes', 'corrientes')]:
        if d[k] != d[e]:
            fallos.append('%s: %d en la escena y %d en el modelo' % (q, d[k], d[e]))
    p.close()
    return fallos, '%d bandejas · %d raíces · %d corrientes' % (d['bandejas'], d['raices'], d['corrientes'])


# ── 4 · las gavetas ──────────────────────────────────────────────────────────

def c_gavetas(nav):
    """Cada piso abre como una gaveta y se explica en UN panel: su frase de
    entrada, sus capacidades, sus agentes con el sello correcto y su tope.
    Antes brotaban hasta once burbujas alrededor del rack; se cambió por un
    solo panel porque el conjunto no tenía orden de lectura. La comprobación
    sigue el mismo espíritu: que lo que se lee salga del modelo, y que la
    gaveta de la escena sea la del piso del que habla el panel."""
    p = abre(nav, TORRE)
    fallos = []
    for nid in p.evaluate("()=>NIVELES.map(n=>n.id)"):
        p.evaluate("(id)=>window.__torre.abreNivel(id)", nid)
        p.wait_for_timeout(2600)
        d = p.evaluate(r"""(id)=>{const T=window.__torre, N=NIVELES.find(n=>n.id===id);
          const orden=T.PILA.indexOf(id), f=document.querySelector('#ficha');
          const cuerpo=document.querySelector('#f-cuerpo');
          const txt=cuerpo.innerText;
          return {
            abierto:f.classList.contains('abierta'),
            titulo:document.querySelector('#f-nombre').textContent.trim(),
            esperaTitulo:N.nombre,
            lema:document.querySelector('#f-dato').textContent.trim(),
            esperaLema:N.lema,
            entrada:(cuerpo.querySelector('.entrada')||{}).innerText||'',
            esperaEntrada:N.que||N.lema,
            capacidades:cuerpo.querySelectorAll('.lista li').length,
            esperaCapacidades:N.hace.length,
            agentes:cuerpo.querySelectorAll('.agente').length,
            esperaAgentes:N.agentes.length,
            nombres:[...cuerpo.querySelectorAll('.agente .nom')].map(e=>e.textContent),
            esperaNombres:N.agentes.map(a=>a.nombre),
            sellos:[...cuerpo.querySelectorAll('.agente .sello')].map(e=>e.textContent),
            verbos:N.agentes.map(a=>AUTONOMIA[a.nivel].verbo),
            tope:(cuerpo.querySelector('.tope p')||{}).innerText||'',
            /* el tope se compara sin etiquetas: el modelo trae <b> dentro */
            esperaTope:N.noHace.replace(/<[^>]+>/g,''),
            paneles:document.querySelectorAll('.pnl').length,
            /* Las chapas son DOM de tamaño fijo y la escena SÍ escala: al
               reencuadrar más estrecho se pisaban entre sí. Se mide con el
               panel abierto, que es el estado en que se descubrió. */
            chocan:(()=>{const e=[...document.querySelectorAll('.chapa')].map(x=>(
                {t:x.textContent.slice(0,14), r:x.getBoundingClientRect()})), o=[];
              for(let i=0;i<e.length;i++)for(let j=i+1;j<e.length;j++){const a=e[i].r,b=e[j].r;
                if(!(a.right<=b.left||a.left>=b.right||a.bottom<=b.top||a.top>=b.bottom))
                  o.push(e[i].t+' / '+e[j].t);} return o;})(),
            burbujas:document.querySelectorAll('.burbuja').length,
            /* que quepa: un panel que se corta por abajo sin poder desplazarse
               esconde justo el tope, que es lo que la Junta viene a leer */
            recortado:f.scrollHeight>f.clientHeight+2 && getComputedStyle(f).overflowY==='visible',
            gaveta:T.bandejas[id].position.z>1.6,
            arribaSuben:T.PILA.filter((_,i)=>i>orden).every(o=>T.bandejas[o].position.y>T.Y[o].y+0.6),
            abajoQuietas:T.PILA.filter((_,i)=>i<orden).every(o=>Math.abs(T.bandejas[o].position.y-T.Y[o].y)<0.06)};}""", nid)
        if not d['abierto']:
            fallos.append('%s: el panel no se abrió' % nid)
        if d['chocan']:
            fallos.append('%s: las chapas se pisan (%s)' % (nid, '; '.join(d['chocan'])))
        if d['paneles'] != 1:
            fallos.append('%s: %d paneles en pantalla y debe haber exactamente 1' % (nid, d['paneles']))
        if d['burbujas']:
            fallos.append('%s: quedan %d burbujas sueltas' % (nid, d['burbujas']))
        if d['titulo'] != d['esperaTitulo']:
            fallos.append('%s: el panel se titula «%s» y el modelo dice «%s»'
                          % (nid, d['titulo'], d['esperaTitulo']))
        if d['lema'] != d['esperaLema']:
            fallos.append('%s: el lema del panel no es el del modelo' % nid)
        if d['esperaEntrada'][:40] not in d['entrada']:
            fallos.append('%s: la frase de entrada no sale del modelo' % nid)
        if d['capacidades'] != d['esperaCapacidades']:
            fallos.append('%s: %d capacidades y el modelo declara %d'
                          % (nid, d['capacidades'], d['esperaCapacidades']))
        if d['agentes'] != d['esperaAgentes']:
            fallos.append('%s: %d agentes y el modelo declara %d'
                          % (nid, d['agentes'], d['esperaAgentes']))
        if d['nombres'] != d['esperaNombres']:
            fallos.append('%s: los agentes %s no son los del modelo %s'
                          % (nid, d['nombres'], d['esperaNombres']))
        if d['sellos'] != d['verbos']:
            fallos.append('%s: los sellos %s no son los del modelo %s'
                          % (nid, d['sellos'], d['verbos']))
        if d['esperaTope'][:40] not in d['tope']:
            fallos.append('%s: el «lo que NO hace» no sale del modelo' % nid)
        if d['recortado']:
            fallos.append('%s: el panel se corta sin poder desplazarse' % nid)
        if not d['gaveta']:
            fallos.append('%s: la gaveta no salió' % nid)
        if not d['arribaSuben']:
            fallos.append('%s: las bandejas de arriba no se apartaron' % nid)
        if not d['abajoQuietas']:
            fallos.append('%s: las bandejas de abajo se movieron' % nid)

    # el cedazo se abre igual pero NO es un piso: su panel es otro
    p.evaluate("()=>window.__torre.abreNivel('__cedazo__')")
    p.wait_for_timeout(2400)
    d = p.evaluate(r"""()=>{const c=document.querySelector('#f-cuerpo');
      return {tamiz:document.querySelector('#ficha').classList.contains('tamiz'),
        titulo:document.querySelector('#f-nombre').textContent.trim(),
        criterios:c.querySelectorAll('.lista li').length,
        entran:(c.querySelector('.cuenta .v')||{}).textContent,
        agentes:c.querySelectorAll('.agente').length,
        entrada:(c.querySelector('.entrada')||{}).innerText||''};}""")
    if d['titulo'] != p.evaluate("()=>CEDAZO.titulo"):
        fallos.append('cedazo: el panel no se titula como el modelo')
    if not d['tamiz']:
        fallos.append('cedazo: se presenta como un piso más, y no lo es')
    if d['criterios'] != p.evaluate("()=>CEDAZO.criterios.length+1"):
        fallos.append('cedazo: %d puntos y el modelo trae %s'
                      % (d['criterios'], p.evaluate("()=>CEDAZO.criterios.length+1")))
    if d['entran'] != str(p.evaluate("()=>CEDAZO.ejemplo.entran")):
        fallos.append('cedazo: la cuenta no es la del modelo')
    if d['agentes']:
        fallos.append('cedazo: se le pintan agentes, y el cedazo no tiene')
    if p.evaluate("()=>CEDAZO.que")[:40] not in d['entrada']:
        fallos.append('cedazo: no dice qué hace antes de enumerar los casos')

    p.evaluate("()=>window.__torre.cierraNivel()")
    for _ in range(20):
        p.wait_for_timeout(400)
        if p.evaluate("""()=>window.__torre.PILA.every(id=>
            Math.abs(window.__torre.bandejas[id].position.z)<0.06
         && Math.abs(window.__torre.bandejas[id].position.y-window.__torre.Y[id].y)<0.06)"""):
            break
    else:
        fallos.append('al cerrar, las bandejas no vuelven a su sitio')
    if p.evaluate("()=>document.querySelector('#ficha').classList.contains('abierta')"):
        fallos.append('al cerrar el piso, el panel se queda abierto')
    fallos += p.errores
    p.close()
    return fallos, '4 pisos y el cedazo, un panel cada uno'


# ── 4b · la corriente ────────────────────────────────────────────────────────

def c_corriente(nav):
    """Que los cables se MUEVAN. Existía la animación, existían las 16 texturas
    y no avanzaba ninguna: getElapsedTime() consume el delta por dentro, así
    que el getDelta() de la línea siguiente devolvía ~0. Ninguna comprobación
    lo vio porque ninguna medía el avance — solo que las corrientes existieran.
    Y de paso: que cada cable corra al ritmo que declara su fuente, y que el
    botón de pausa pare de verdad."""
    p = abre(nav, TORRE)
    fallos = []
    LEE = "()=>window.__torre.corrientes.map(c=>({x:c.tex.offset.x, v:c.v}))"

    a = p.evaluate(LEE)
    p.wait_for_timeout(2500)
    b = p.evaluate(LEE)
    quietas = [i for i, (x, y) in enumerate(zip(a, b)) if abs(y['x'] - x['x']) < 1e-4]
    if quietas:
        fallos.append('%d de %d corrientes no avanzan' % (len(quietas), len(a)))

    # el avance tiene que ser proporcional a la velocidad declarada, o el
    # ritmo de cada cadencia es decorativo
    if not quietas and len(a) > 1:
        razones = [abs(b[i]['x'] - a[i]['x']) / b[i]['v'] for i in range(len(a)) if b[i]['v']]
        if razones and max(razones) / min(razones) > 1.25:
            fallos.append('el avance no es proporcional a la velocidad declarada '
                          '(entre %.2f y %.2f por unidad)' % (min(razones), max(razones)))

    # la pausa
    p.click('#pausa')
    p.wait_for_timeout(700)
    c = p.evaluate(LEE)
    p.wait_for_timeout(1600)
    d = p.evaluate(LEE)
    if any(abs(d[i]['x'] - c[i]['x']) > 1e-4 for i in range(len(c))):
        fallos.append('la pausa no detiene la corriente')
    p.click('#pausa')
    p.wait_for_timeout(1400)
    e = p.evaluate(LEE)
    if all(abs(e[i]['x'] - d[i]['x']) < 1e-4 for i in range(len(d))):
        fallos.append('tras quitar la pausa la corriente no vuelve')

    fallos += p.errores
    p.close()
    return fallos, '%d cables corriendo, y la pausa los para' % len(a)


# ── 5 · la bajada ────────────────────────────────────────────────────────────

def c_bajada(nav):
    """Los arcos salen del nivel de la decisión, pasan POR ENCIMA y acaban
    sobre la fuente que reciben. Y apagarlos los retira del todo."""
    p = abre(nav, TORRE)
    d0 = p.evaluate("()=>window.__torre.escena.children.filter(o=>o.userData&&o.userData.bajada&&o.visible).length")
    p.click('#bajada')
    p.wait_for_timeout(1200)
    d = p.evaluate(r"""()=>{const T=window.__torre;
      const tubos=T.escena.children.filter(o=>o.userData&&o.userData.bajada);
      return {tubos:tubos.length, espera:BAJADAS.length,
        visibles:tubos.filter(o=>o.visible).length,
        marcas:[...document.querySelectorAll('.eti .recibe')]
                 .filter(e=>getComputedStyle(e).display!=='none').length,
        reciben:[...new Set(BAJADAS.map(b=>b.hacia))].length,
        atados:tubos.every(o=>{const b=BAJADAS.find(x=>x.id===o.userData.bajada);
          const g=o.geometry.attributes.position, p=T.sitio[b.hacia];
          let cerca=1e9;
          for(let i=0;i<g.count;i+=7) cerca=Math.min(cerca,
            Math.hypot(g.getX(i)-p.x,g.getY(i)-p.y,g.getZ(i)-p.z));
          return Math.abs(g.getY(0)-T.Y[b.desde].y)<0.4 && cerca<0.7;}),
        arquean:tubos.every(o=>{const g=o.geometry.attributes.position; let alto=-1e9;
          for(let i=0;i<g.count;i+=7) alto=Math.max(alto,g.getY(i));
          return alto>T.Y['decision'].y+1.5;})};}""")
    fallos = list(p.errores)
    if d0:
        fallos.append('la bajada arranca encendida y debería estar apagada')
    if d['tubos'] != d['espera']:
        fallos.append('%d arcos y el modelo declara %d bajadas' % (d['tubos'], d['espera']))
    if d['visibles'] != d['espera']:
        fallos.append('solo %d de %d arcos se hicieron visibles' % (d['visibles'], d['espera']))
    if d['marcas'] != d['reciben']:
        fallos.append('%d distintivos «recibe» y %d raíces que reciben' % (d['marcas'], d['reciben']))
    if not d['atados']:
        fallos.append('algún arco no sale de la decisión o no acaba sobre su fuente')
    if not d['arquean']:
        fallos.append('algún arco no pasa por encima del rack')
    p.click('#bajada')
    p.wait_for_timeout(900)
    if p.evaluate("()=>window.__torre.escena.children.filter(o=>o.userData&&o.userData.bajada&&o.visible).length"):
        fallos.append('apagar la bajada no la retira')
    p.close()
    return fallos, '%d arcos' % d['tubos']


# ── 6 · hoy / propuesto ──────────────────────────────────────────────────────

def c_modo(nav):
    """En «hoy» el rack entero se desvanece, la corriente se apaga, las fuentes
    siguen visibles y cada una dice cómo llega — con el texto del modelo."""
    p = abre(nav, TORRE)
    p.click('#modo')
    p.wait_for_timeout(1400)
    d = p.evaluate(r"""()=>{const T=window.__torre;
      const b=[...document.querySelectorAll('.eti')].map(e=>e.getBoundingClientRect());
      let pisan=0; for(let i=0;i<b.length;i++)for(let j=i+1;j<b.length;j++){const a=b[i],c=b[j];
        if(!(a.right<=c.left||a.left>=c.right||a.bottom<=c.top||a.top>=c.bottom)) pisan++;}
      return {clase:document.body.classList.contains('modo-hoy'),
        aviso:getComputedStyle(document.querySelector('.aviso-hoy')).display!=='none',
        rack:Object.values(T.bandejas).every(x=>{
          const m=Array.isArray(x.material)?x.material[0]:x.material; return m.opacity<0.2;}),
        armazon:T.armazon.every(x=>x.material.opacity<0.35),
        corriente:Object.values(T.tubos).every(t=>t.material.map.image.width===8),
        fuentes:T.pedestales.every(x=>x.material.opacity>0.9),
        textos:[...document.querySelectorAll('.eti .comoLlega')]
                 .filter(e=>getComputedStyle(e).display!=='none').length,
        coinciden:[...document.querySelectorAll('.eti')].every(e=>{
          const r=RAICES.find(x=>x.id===e.dataset.raiz);
          return e.querySelector('.comoLlega').textContent===r.hoy;}),
        bajada:document.querySelector('#bajada').disabled,
        rejilla:document.body.classList.contains('rejilla-hoy'),
        columnas:(()=>{const c={};for(const e of document.querySelectorAll('.eti'))
          (c[Math.round(e.getBoundingClientRect().left)] ||= []).push(1);
          return Object.values(c).map(v=>v.length).sort();})(),
        pisan, total:RAICES.length};}""")
    fallos = list(p.errores)
    for cond, txt in [(d['clase'], 'el modo no se activa'), (d['aviso'], 'no sale el aviso de «hoy»'),
                      (d['rack'], 'las bandejas no se desvanecen'), (d['armazon'], 'el bastidor no se desvanece'),
                      (d['corriente'], 'la corriente no se apaga'), (d['fuentes'], 'las fuentes se apagan y hoy sí existen'),
                      (d['coinciden'], 'algún texto de «hoy» no sale del modelo'),
                      (d['bajada'], 'la bajada sigue disponible sin torre')]:
        if not cond:
            fallos.append(txt)
    if d['textos'] != d['total']:
        fallos.append('%d textos de «hoy» y %d raíces' % (d['textos'], d['total']))
    if d['pisan']:
        fallos.append('%d pares de rótulos se pisan en modo «hoy»' % d['pisan'])
    if not d['rejilla']:
        fallos.append('las fuentes no se ordenan en rejilla en «hoy»')
    if d['columnas'] != [6, 6]:
        fallos.append('la rejilla de «hoy» no son dos columnas de seis: %s' % d['columnas'])
    p.click('#modo')
    p.wait_for_timeout(1200)
    if p.evaluate("()=>document.body.classList.contains('modo-hoy')"):
        fallos.append('volver a «propuesto» no lo desactiva')
    p.close()
    return fallos, '%d fuentes con su «cómo llega hoy»' % d['total']


# ── 7 · el recorrido ─────────────────────────────────────────────────────────

def c_recorrido(nav):
    """Las paradas dejan la escena en el estado que anuncian — recorridas en
    orden, AL REVÉS y saltando. El orden importa: recorrer siempre hacia
    delante ocultaba que las paradas heredaban el modo de la anterior.

    Desde que el recorrido CONSTRUYE la escena, lo que se comprueba no es solo
    el modo: es qué capas están puestas en cada parada. La 1 no puede tener
    torre, la 8 no puede tener alimentación, la 9 tiene las dos corrientes."""
    p = abre(nav, TORRE)
    total = p.evaluate("()=>window.__torre.PARADAS.length")
    # b = el panel habla de un piso · f = el panel habla de una fuente
    espera = {
        1: lambda d: d['hoy'] and not d['rack'] and not d['sube'] and not d['baja']
                     and not d['b'] and not d['f'] and d['rejilla'],
        2: lambda d: d['rack'] and d['sube'] and not d['baja'] and not d['hoy']
                     and not d['b'] and not d['f'],
        3: lambda d: d['b'] and not d['f'] and not d['hoy'] and d['rack'] and d['sube'],
        4: lambda d: d['b'] and not d['f'] and not d['hoy'] and d['rack'],
        5: lambda d: d['b'] and not d['hoy'] and d['rack'],
        6: lambda d: d['b'] and not d['hoy'] and d['rack'],
        7: lambda d: d['b'] and not d['hoy'] and d['rack'],
        8: lambda d: d['baja'] and not d['sube'] and d['rack'] and not d['hoy']
                     and not d['b'] and not d['f']
                     and d['fuentes'] == d['reciben'] and d['pedestales'] == d['reciben'],
        9: lambda d: d['baja'] and d['sube'] and d['lejos'] and not d['hoy']
                     and d['fuentes'] == d['todas'],
    }
    EST = """()=>{const T=window.__torre, e=T.estado();
      const f=document.querySelector('#ficha');
      /* El panel cerrado CONSERVA su contenido a propósito —para no vaciarse a
         la vista mientras se desliza fuera—, así que no basta con buscar
         `.pnl`: hay que exigir que además esté abierto. */
      const ab=f.classList.contains('abierta'), pnl=!!document.querySelector('#f-cuerpo .pnl');
      return {n:T._rec.paso+1, b:ab && pnl, f:ab && !pnl,
        rack:Object.values(T.bandejas).every(x=>x.visible),
        armazon:T.armazon.every(x=>x.visible),
        chapas:T.chapas.every(c=>c.visible),
        leds:T.ledsVivos.every(l=>l.led.visible),
        sube:Object.values(T.tubos).every(t=>t.visible),
        /* los cables de DENTRO del rack son alimentación igual: se quedaban
           corriendo en azul en la parada de la bajada */
        subeDentro:T.tubosDentro.every(t=>t.visible),
        algoSube:Object.values(T.tubos).some(t=>t.visible)||T.tubosDentro.some(t=>t.visible),
        /* en la parada de la bajada solo deben quedar las fuentes que reciben:
           las otras cinco no vuelven a ninguna parte y sobran en esa lámina */
        fuentes:T.rotulosRaiz.filter(o=>o.visible).map(o=>o.element.dataset.raiz).sort(),
        pedestales:T.pedestales.filter(b=>b.visible).map(b=>b.userData.raiz).sort(),
        reciben:BAJADAS.map(b=>b.hacia).sort(),
        todas:RAICES.map(r=>r.id).sort(),
        baja:T.bajadas.some(x=>x.malla.visible),
        lejos:e.lejos, hoy:document.body.classList.contains('modo-hoy'),
        rejilla:document.body.classList.contains('rejilla-hoy'),
        compacto:document.body.classList.contains('compacto'),
        roto:document.querySelector('.rec-txt').innerText.indexOf('no pudo leer')>=0};}"""
    fallos = []
    p.click('#abre-recorrido')
    p.wait_for_timeout(1600)
    if not p.evaluate("()=>document.body.classList.contains('compacto')"):
        fallos.append('el recorrido no pliega la cabecera')
    secuencias = [('en orden', list(range(1, total + 1))),
                  ('al revés', list(range(total, 0, -1))),
                  ('saltando', [total, 4, 1, total - 1, 3])]
    for etq, sec in secuencias:
        for n in sec:
            p.evaluate("(i)=>window.__torre.vaAlPaso(i)", n - 1)
            p.wait_for_timeout(1500)
            d = p.evaluate(EST)
            if d['roto']:
                fallos.append('%s · parada %d: el guion no pudo leer sus cifras' % (etq, n))
            if d['sube'] != d['subeDentro'] or (not d['sube'] and d['algoSube']):
                fallos.append('%s · parada %d: la alimentación se apaga a medias '
                              '(fuera %s, dentro %s)' % (etq, n, d['sube'], d['subeDentro']))
            if n in espera and not espera[n](d):
                fallos.append('%s · parada %d deja %s' % (etq, n, dict(
                    {k: d[k] for k in ('rack', 'sube', 'baja', 'hoy', 'lejos', 'b', 'f')},
                    fuentes=len(d['fuentes']), pedestales=len(d['pedestales']))))
            if not d['rack'] and (d['armazon'] or d['chapas'] or d['leds']):
                fallos.append('%s · parada %d: sin torre pero quedan %s en el aire' % (etq, n,
                    ', '.join(x for x in ('bastidor', 'chapas', 'led')
                              if d[{'bastidor': 'armazon', 'chapas': 'chapas', 'led': 'leds'}[x]])))

    # al salir, la escena y la página vuelven enteras
    p.evaluate("()=>window.__torre.cierraRecorrido()")
    p.wait_for_timeout(1600)
    d = p.evaluate(EST)
    for cond, txt in [(d['rack'], 'al salir la torre no vuelve'),
                      (d['sube'], 'al salir la alimentación no vuelve'),
                      (not d['baja'], 'al salir se queda encendida la bajada'),
                      (not d['lejos'], 'al salir la cámara se queda retirada'),
                      (not d['compacto'], 'al salir la cabecera sigue plegada'),
                      (d['fuentes'] == d['todas'], 'al salir faltan fuentes por volver'),
                      (d['pedestales'] == d['todas'], 'al salir faltan pedestales por volver')]:
        if not cond:
            fallos.append(txt)
    fallos += p.errores
    p.close()
    return fallos, '%d paradas × 3 recorridos' % total


# ── 7b · los rótulos ─────────────────────────────────────────────────────────

def c_rotulos(nav):
    """Ningún rótulo de fuente se pisa con otro, se sale del lienzo ni queda
    detrás de la barra del recorrido — en tres anchuras y en los dos modos.

    Es la comprobación que faltaba y que dejó pasar el defecto: separar los
    rótulos EN LA ESCENA no los separa en pantalla, porque el encuadre se
    ajusta al contenido y la cámara se retira otro tanto. Se midió con 1,5 ·
    2,4 · 3,2 unidades de separación y los solapes fueron 2 · 3 · 4."""
    MIDE = """()=>{const c=document.querySelector('#lienzo3d').getBoundingClientRect();
      const barra=document.querySelector('#recorrido');
      const bb=barra.hidden?null:barra.getBoundingClientRect();
      /* TODOS los rótulos flotantes, no solo los de fuente: mirar solo `.eti`
         dejó pasar que las chapas de las bandejas se pisaban entre sí —hasta
         nueve pares a 1280 px— y que tapaban a los rótulos de fuente. */
      const e=[...document.querySelectorAll('.eti,.chapa')]
        .map(x=>({t:(x.classList.contains('chapa')?'chapa ':'')+
                    (x.querySelector('.n')||x).textContent.slice(0,20).trim(),
                  r:x.getBoundingClientRect()}))
        .filter(x=>x.r.width>0);
      const pisan=[]; for(let i=0;i<e.length;i++)for(let j=i+1;j<e.length;j++){
        const a=e[i].r,b=e[j].r;
        if(!(a.right<=b.left||a.left>=b.right||a.bottom<=b.top||a.top>=b.bottom))
          pisan.push(e[i].t+' / '+e[j].t);}
      return {n:e.length, pisan,
        fuera:e.filter(x=>x.r.left<c.left-2||x.r.right>c.right+2
                        ||x.r.top<c.top-2||x.r.bottom>c.bottom+2).map(x=>x.t),
        tapados:!bb?[]:e.filter(x=>x.r.bottom>bb.top+2&&x.r.right>bb.left&&x.r.left<bb.right)
                        .map(x=>x.t)};}"""
    fallos = []
    for w, h in [(1600, 950), (1280, 800), (1100, 780)]:
        p = abre(nav, TORRE, ancho=w, alto=h)
        for modo in ('propuesto', 'hoy'):
            if modo == 'hoy':
                p.click('#modo')
                p.wait_for_timeout(1800)
            d = p.evaluate(MIDE)
            # las chapas se ocultan en «hoy» a propósito —el rack es un
            # fantasma ahí—, así que se cuenta lo que de verdad se ve
            espera = p.evaluate("""()=>RAICES.length + [...document.querySelectorAll('.chapa')]
              .filter(x=>x.getBoundingClientRect().width>0).length""")
            if d['n'] != espera:
                fallos.append('%dx%d %s: %d rótulos y se esperaban %d' % (w, h, modo, d['n'], espera))
            for lista, txt in [(d['pisan'], 'se pisan'), (d['fuera'], 'fuera del lienzo')]:
                if lista:
                    fallos.append('%dx%d %s: %s — %s' % (w, h, modo, txt, '; '.join(lista[:3])))
        # y con la barra del recorrido puesta, que tapa por abajo
        p.click('#modo')
        p.wait_for_timeout(1200)
        p.click('#abre-recorrido')
        p.wait_for_timeout(1800)
        for i in range(9):
            p.evaluate("(i)=>window.__torre.vaAlPaso(i)", i)
            p.wait_for_timeout(1400)
            d = p.evaluate(MIDE)
            if d['tapados']:
                fallos.append('%dx%d parada %d: la barra tapa %s'
                              % (w, h, i + 1, '; '.join(d['tapados'][:3])))
            if d['pisan']:
                fallos.append('%dx%d parada %d: se pisan %s' % (w, h, i + 1, d['pisan'][0]))
        fallos += p.errores
        p.close()
    return fallos, 'sin solapes: 3 anchuras × (2 modos + 9 paradas)'


# ── 7c · plegar la página ────────────────────────────────────────────────────

def c_plegado(nav):
    """La flecha pliega cabecera y pie, el mapa gana ese alto, y la salida
    sigue existiendo con la cabecera plegada. Y al desplegar vuelve todo."""
    p = abre(nav, TORRE)
    fallos = []
    LEE = """()=>({compacto:document.body.classList.contains('compacto'),
      cab:document.querySelector('header').getBoundingClientRect().height,
      pie:document.querySelector('footer').getBoundingClientRect().height,
      esc:Math.round(document.querySelector('.escenario').getBoundingClientRect().height),
      salida:getComputedStyle(document.getElementById('volver2')).display!=='none',
      lienzo:Math.round(document.getElementById('lienzo3d').getBoundingClientRect().height)})"""
    a = p.evaluate(LEE)
    if a['compacto']:
        fallos.append('arranca ya plegada')
    if a['salida']:
        fallos.append('la salida de la barra se ve sin estar plegada')
    p.click('#compacta')
    p.wait_for_timeout(1200)
    b = p.evaluate(LEE)
    if not b['compacto']:
        fallos.append('la flecha no pliega')
    if b['cab'] > 2 or b['pie'] > 2:
        fallos.append('cabecera %dpx y pie %dpx siguen ocupando' % (b['cab'], b['pie']))
    if b['esc'] <= a['esc'] + 40:
        fallos.append('el mapa no gana alto: %d → %d' % (a['esc'], b['esc']))
    if b['lienzo'] != b['esc']:
        fallos.append('el lienzo 3D no siguió al alto nuevo (%d vs %d)' % (b['lienzo'], b['esc']))
    if not b['salida']:
        fallos.append('plegada, no queda por dónde volver')
    p.click('#compacta')
    p.wait_for_timeout(1200)
    c = p.evaluate(LEE)
    if c['compacto'] or c['cab'] < 40 or abs(c['esc'] - a['esc']) > 4:
        fallos.append('desplegar no devuelve la página: %s' % c)
    fallos += p.errores
    p.close()
    return fallos, 'plegado y devuelto'


# ── 8 · contraste ────────────────────────────────────────────────────────────

def c_contraste(nav):
    """WCAG AA sobre las dos vistas."""
    fallos = []
    for nombre, url, espera in [('3D', TORRE, 3800), ('plana', PLANA, 1200)]:
        p = abre(nav, url, espera)
        for m in p.evaluate(JS_CONTRASTE):
            fallos.append('%s: %.2f (mín %.1f) · %spx · «%s» .%s'
                          % (nombre, m['r'], m['min'], m['px'], m['t'], m['cls']))
        p.close()
    return fallos, 'texto de las dos vistas'


CHEQUEOS = {
    'modelo': c_modelo, 'plana': c_plana, 'rack': c_rack, 'gavetas': c_gavetas,
    'corriente': c_corriente,
    'bajada': c_bajada, 'modo': c_modo, 'recorrido': c_recorrido,
    'rotulos': c_rotulos, 'plegado': c_plegado, 'contraste': c_contraste,
}


def main():
    pedidos = [a for a in sys.argv[1:] if not a.startswith('--')] or list(CHEQUEOS)
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

    print('=== comprobaciones de la torre ===')
    fallados, t0 = [], time.time()
    with Servidor(), sync_playwright() as pw:
        nav = pw.chromium.launch(args=ARGS)
        for nombre in pedidos:
            t1 = time.time()
            try:
                fallos, resumen = CHEQUEOS[nombre](nav)
            except Exception as e:                       # noqa: BLE001
                fallos, resumen = ['la comprobación reventó: %s' % str(e)[:170]], '—'
            print('\n%s %-10s %-38s %5.1f s'
                  % ('OK  ' if not fallos else 'MAL ', nombre, resumen, time.time() - t1))
            for f in fallos[:10]:
                print('       · %s' % f)
            if len(fallos) > 10:
                print('       · …y %d más' % (len(fallos) - 10))
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
