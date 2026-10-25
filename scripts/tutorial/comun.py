"""Base común de los videos tutoriales del manual de Fase 2 (scripts/tutorial/).

Cada tutorial (grabar_validacion.py, grabar_estructura.py) define su GUION: una lista de
pasos {id, titulo, pantalla, voz}. `pantalla` es el subtítulo (admite <b>), `voz` lo que
narra la voz. El flujo completo:

  1. python scripts/tutorial/voz.py <tutorial> --lista   → los textos a narrar (voz/<tutorial>.json)
  2. generar cada audio y dejarlo en scripts/tutorial/voz/<tutorial>/<id>.mp3
     (hoy con Higgsfield · ElevenLabs, voz «Marisol»; ver voz.py)
  3. python scripts/tutorial/grabar_<tutorial>.py        → graba el manual local (≈8 min)
  4. python scripts/tutorial/editar.py <tutorial>        → acelera esperas, mezcla la voz, exporta

Cada paso dura lo que dura su narración (o, sin audio, lo que lleva leer el subtítulo), así
que la voz y la pantalla van sincronizadas. grabar_* anota cuándo empieza cada paso y qué
tramos acelerar; editar.py coloca cada audio en su instante ya acelerado.

La grabación usa la cuenta de QA del .env (ROWER_CORREO/ROWER_CLAVE) vista como un integrante
del comité, y necesita SUPABASE_ACCESS_TOKEN/SUPABASE_PROJECT_REF para preparar y limpiar la
base (cada grabar_* define qué deja y qué borra).
"""
import io, json, os, re, subprocess, sys, time

AQUI = os.path.dirname(os.path.abspath(__file__))
TRABAJO = os.path.join(AQUI, '_trabajo')
VOZ = os.path.join(AQUI, 'voz')
os.makedirs(TRABAJO, exist_ok=True)
sys.path.insert(0, os.path.dirname(AQUI))
import sesion_prueba  # noqa: E402

BASE = 'http://localhost:8080/informe/fase2/informe-fase2.html'
W, H = 1280, 800

# El cliente SQL de la API de gestión, el mismo de las comprobaciones.
_src = open(os.path.join(os.path.dirname(AQUI), 'comprobar-validacion-comite.py'), encoding='utf-8').read()
_ns = {'__file__': os.path.join(os.path.dirname(AQUI), 'comprobar-validacion-comite.py'), '__name__': 'cvc'}
exec(_src[:_src.index('cuentas = sql(')], _ns)
sql = _ns['sql']

OVERLAY = r"""
(function(){
  if (window.__tut) return;
  var css = document.createElement('style');
  css.textContent = `
  #tutCursor{position:fixed;left:640px;top:400px;width:26px;height:26px;z-index:100000;pointer-events:none;transition:left .75s cubic-bezier(.4,0,.2,1),top .75s cubic-bezier(.4,0,.2,1);filter:drop-shadow(0 2px 3px rgba(0,0,0,.35))}
  #tutAnillo{position:fixed;z-index:99998;pointer-events:none;border:3px solid #FFB020;border-radius:12px;box-shadow:0 0 0 6px rgba(255,176,32,.25);transition:all .45s ease;opacity:0}
  #tutPulso{position:fixed;z-index:99999;pointer-events:none;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;background:rgba(255,176,32,.6);opacity:0}
  #tutPulso.on{animation:tp .55s ease-out}
  @keyframes tp{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(5)}}
  #tutCap{position:fixed;z-index:99997;left:50%;bottom:26px;transform:translateX(-50%);width:min(860px,calc(100vw - 48px));background:rgba(12,18,26,.92);color:#fff;border-radius:16px;padding:14px 20px 16px;font:500 19px/1.45 "DM Sans","Segoe UI",sans-serif;box-shadow:0 10px 40px rgba(0,0,0,.35);transition:opacity .3s, left .4s, transform .4s}
  #tutCap.izq{left:24px;transform:none;width:min(720px,calc(100vw - 520px))}
  #tutCap b.t{display:block;font-size:12.5px;letter-spacing:.12em;text-transform:uppercase;color:#36F6BB;margin-bottom:4px}
  #tutCap[hidden]{display:block;opacity:0}
  #tutCard{position:fixed;inset:0;z-index:100001;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;text-align:center;padding:40px;
    background:radial-gradient(circle at 30% 20%,#123a4a 0%,#0A0E13 65%);color:#E9EFF5;font-family:"DM Sans","Segoe UI",sans-serif;transition:opacity .5s}
  #tutCard .k{font-size:15px;letter-spacing:.2em;text-transform:uppercase;color:#36F6BB;font-weight:700}
  #tutCard h1{margin:0;font-size:46px;letter-spacing:-.02em;max-width:980px;line-height:1.1}
  #tutCard p{margin:0;font-size:21px;color:#9AAABA;max-width:860px;line-height:1.5}
  #tutCard ol{margin:10px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px;font-size:20px;color:#E9EFF5;text-align:left}
  #tutCard ol li span{display:inline-block;width:30px;height:30px;border-radius:50%;background:#36F6BB;color:#0A0E13;font-weight:800;text-align:center;line-height:30px;margin-right:12px;font-size:15px}
  #tutCard[hidden]{display:flex;opacity:0;pointer-events:none}`;
  document.head.appendChild(css);
  var cur = document.createElement('div'); cur.id = 'tutCursor';
  cur.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26"><path d="M4 2l15 9-6.5 1.6L16 20l-3 1.4-3.3-7.4L4 18z" fill="#fff" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>';
  var an = document.createElement('div'); an.id = 'tutAnillo';
  var pu = document.createElement('div'); pu.id = 'tutPulso';
  var cap = document.createElement('div'); cap.id = 'tutCap'; cap.hidden = true;
  var card = document.createElement('div'); card.id = 'tutCard'; card.hidden = true;
  [cur, an, pu, cap, card].forEach(function(e){ document.body.appendChild(e); });
  window.__tut = {
    mover: function(x, y){ cur.style.left = x + 'px'; cur.style.top = y + 'px'; },
    anillo: function(r){ if(!r){ an.style.opacity = 0; return; } an.style.left = (r.x-6)+'px'; an.style.top = (r.y-6)+'px'; an.style.width = (r.width+12)+'px'; an.style.height = (r.height+12)+'px'; an.style.opacity = 1; },
    pulso: function(x, y){ pu.style.left = x+'px'; pu.style.top = y+'px'; pu.classList.remove('on'); void pu.offsetWidth; pu.classList.add('on'); },
    cap: function(t, x, izq){ if(!x){ cap.hidden = true; return; } cap.innerHTML = (t ? '<b class="t">'+t+'</b>' : '') + x; cap.hidden = false; cap.classList.toggle('izq', !!izq); },
    card: function(html){ if(!html){ card.hidden = true; return; } card.innerHTML = html; card.hidden = false; }
  };
})();
"""


def duracion(ruta):
    try:
        return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', ruta]).decode().strip())
    except Exception:
        return None


class Tutorial:
    """Graba un tutorial: página, pasos con su narración, y el registro para la edición."""

    def __init__(self, nombre, guion):
        self.nombre = nombre
        self.guion = {p['id']: p for p in guion}
        self.pasos = []      # [(id, segundo de video en que empieza)]
        self.marcas = []     # tramos de espera a acelerar
        self.t0 = None
        self.p = None
        self.ses = sesion_prueba.exigir()
        self.correo = self.ses['sesion']['user']['email']

    # ---- página ----
    def abrir(self, nav, ruta, quitar_admin=True, nombre_demo=None):
        ctx = nav.new_context(viewport={'width': W, 'height': H}, record_video_dir=os.path.join(TRABAJO, 'crudo-' + self.nombre),
                              record_video_size={'width': W, 'height': H}, device_scale_factor=1)
        ctx.add_init_script(sesion_prueba.guion(self.ses))
        ctx.add_init_script("try{localStorage.setItem('rower.agente.abierto','0');localStorage.setItem('rower.tema','claro');"
                            "localStorage.removeItem('rower.fase2.secs');localStorage.removeItem('rower.fase2.estructura')}catch(e){}")
        if quitar_admin:
            def acceso(r):
                res = r.fetch(); d = res.json()
                d['permisos'] = [x for x in d.get('permisos', []) if not x.startswith('admin.')]
                if nombre_demo: d.update({'nombre': nombre_demo, 'rol_nombre': 'Comité ejecutivo'})
                r.fulfill(response=res, body=json.dumps(d))
            ctx.route('**/rest/v1/rpc/mi_acceso', acceso)
        self.ctx = ctx
        self.p = ctx.new_page()
        self.t0 = time.monotonic()
        self.p.goto(BASE + ruta)
        return self.p

    def overlay(self):
        self.p.evaluate(OVERLAY)

    def ahora(self):
        return time.monotonic() - self.t0

    # ---- narración ----
    def audio(self, pid):
        ruta = os.path.join(VOZ, self.nombre, pid + '.mp3')
        return duracion(ruta) if os.path.exists(ruta) else None

    def _espera_paso(self, pid, extra=0.0):
        g = self.guion[pid]
        d = self.audio(pid)
        leer = max(3.2, len(re.sub('<[^>]+>', '', g['pantalla'])) / 15.0)
        return (d + 0.6 if d else leer) + extra

    def paso(self, pid, izq=False, extra=0.0):
        """Muestra el subtítulo del paso y espera lo que dura su narración."""
        g = self.guion[pid]
        self.pasos.append((pid, self.ahora()))
        self.p.evaluate('([t,x,i]) => window.__tut.cap(t,x,i)', [g['titulo'], g['pantalla'], izq])
        self.p.wait_for_timeout(int(self._espera_paso(pid, extra) * 1000))

    def tarjeta(self, pid, minimo=5.0):
        g = self.guion[pid]
        self.pasos.append((pid, self.ahora()))
        self.p.evaluate('h => window.__tut.card(h)', g['pantalla'])
        self.p.wait_for_timeout(int(max(minimo, self._espera_paso(pid, 0.8)) * 1000))
        self.p.evaluate('() => window.__tut.card(null)')
        self.p.wait_for_timeout(500)

    def esperar(self, pid, condicion_js, tope=240000, izq=True):
        """Paso narrado mientras el agente trabaja: tras la narración, la espera se acelera ×6."""
        self.paso(pid, izq=izq)
        a = self.ahora()
        self.p.wait_for_function(condicion_js, timeout=tope)
        b = self.ahora()
        if b - a > 6:
            self.marcas.append((a + 1.0, b - 1.0))
        self.p.wait_for_timeout(1200)

    def callar(self):
        self.p.evaluate('() => { window.__tut.cap(null,null); window.__tut.anillo(null); }')

    # ---- cursor ----
    def apuntar(self, loc, anillo=True, pausa=900):
        loc.scroll_into_view_if_needed()
        self.p.wait_for_timeout(250)
        b = loc.bounding_box()
        self.p.evaluate('([x,y]) => window.__tut.mover(x,y)', [b['x'] + b['width'] / 2, b['y'] + b['height'] / 2])
        self.p.evaluate('r => window.__tut.anillo(r)', b if anillo else None)
        self.p.wait_for_timeout(pausa)
        return b

    def clic(self, loc, pausa=700):
        b = self.apuntar(loc)
        self.p.evaluate('([x,y]) => window.__tut.pulso(x,y)', [b['x'] + b['width'] / 2, b['y'] + b['height'] / 2])
        loc.click()
        self.p.wait_for_timeout(pausa)
        self.p.evaluate('() => window.__tut.anillo(null)')

    def escribir(self, loc, texto):
        self.apuntar(loc, pausa=400)
        loc.click()
        loc.press_sequentially(texto, delay=22)
        self.p.wait_for_timeout(500)

    # ---- cierre ----
    def cerrar(self, nav):
        total = self.ahora()
        self.p.close(); self.ctx.close(); nav.close()
        carpeta = os.path.join(TRABAJO, 'crudo-' + self.nombre)
        crudos = sorted([os.path.join(carpeta, f) for f in os.listdir(carpeta)], key=os.path.getmtime)
        json.dump({'video': crudos[-1], 'pasos': self.pasos, 'marcas': self.marcas, 'total': total},
                  open(os.path.join(TRABAJO, self.nombre + '-marcas.json'), 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
        print('%s: %.1f s grabados, %d pasos, %d esperas a acelerar' % (self.nombre, total, len(self.pasos), len(self.marcas)))


def lista_voz(nombre, guion):
    """Escribe voz/<nombre>.json con los textos a narrar y marca los que ya tienen audio."""
    os.makedirs(os.path.join(VOZ, nombre), exist_ok=True)
    filas = [{'id': g['id'], 'voz': g['voz'], 'listo': os.path.exists(os.path.join(VOZ, nombre, g['id'] + '.mp3'))} for g in guion]
    json.dump(filas, open(os.path.join(VOZ, nombre + '.json'), 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
    return filas
