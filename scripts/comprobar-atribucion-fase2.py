# -*- coding: utf-8 -*-
"""Comprueba la capa de atribución de Fase 2: quién manda sobre Dueño y Disparador.

Contexto (18-sep-2026): hasta esta fecha el informe de Fase 2 renderizaba «Dueño
del proceso», «Participantes», «Disparador», «Cadencia» y «Output» LEYENDO
DIRECTAMENTE la ficha del mapa v18 (`p.mapa`). El manual redactado sólo podía
añadir texto debajo, así que una atribución equivocada del mapa no se podía
corregir desde el contenido — fue lo que dejó a 6.4 publicando «Gerente Regional
de Marketing» como quien confirma las órdenes de compra de la marca propia,
cargo que la evidencia (E-05, E-06) no sostiene.

Ahora `manual-contenido.js` puede sobrescribir esos campos, y cuando lo hace debe
declarar de qué entrevistas salen. Este guion verifica las dos mitades:

  1. Todo proceso que sobrescriba la atribución publica el valor derivado Y su
     trazabilidad («Derivado de la evidencia: E-xx»). Un dato sin procedencia es
     justo lo que nos dejó heredar el mapa sin poder auditarlo.
  2. Todo proceso que NO la sobrescriba sigue mostrando la ficha del mapa, intacta
     — el mecanismo no puede romper los procesos aún no rederivados.

Uso:
    python scripts/comprobar-atribucion-fase2.py

No necesita credenciales: monta una copia del sitio sin el guardia de acceso,
igual que `comprobar-fase2.py`. Sale con código 1 si algo falla.
"""
import functools
import http.server
import io
import json
import pathlib
import re
import shutil
import socketserver
import subprocess
import sys
import tempfile
import threading

from playwright.sync_api import sync_playwright

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

RAIZ = pathlib.Path(__file__).resolve().parent.parent
SRC = RAIZ / "informe" / "fase2"

for requerido in (SRC / "informe-fase2.html", SRC / "manual-contenido.js",
                  SRC / "manual-procesos-datos.js", RAIZ / "estilo" / "app.css"):
    if not requerido.exists():
        print(f"Falta {requerido}")
        sys.exit(2)

# --- qué procesos declaran atribución propia, según el contenido redactado ---
lector = """
global.window={};
require(process.argv[1]);
const C=window.MANUAL_CONTENIDO, con=[], sin=[];
for(const pref in C){
  for(const cod in (C[pref].procesos||{})){
    const p=C[pref].procesos[cod];
    // qué SECCIONES concretas sobrescribe: cada una debe traer su propia
    // trazabilidad, no vale que una preste la de la otra.
    const secs=[];
    if(p.dueno && p.dueno.dueno) secs.push('dueno');
    if(p.disparador && p.disparador.disparador) secs.push('disparador');
    if(secs.length) con.push({cod:cod, secs:secs}); else sin.push(cod);
  }
}
console.log(JSON.stringify({con:con,sin:sin}));
"""
try:
    salida = subprocess.run(
        ["node", "-e", lector, str(SRC / "manual-contenido.js")],
        capture_output=True, text=True, check=True, cwd=str(RAIZ))
    datos = json.loads(salida.stdout.strip().splitlines()[-1])
except Exception as e:  # noqa: BLE001
    print(f"No se pudo leer manual-contenido.js con Node: {e}")
    sys.exit(2)

def orden(c):
    return [int(x) for x in c.split(".")]


CON = sorted(datos["con"], key=lambda r: orden(r["cod"]))
SIN = sorted(datos["sin"], key=orden)
if not CON:
    print("Ningún proceso declara atribución propia todavía — nada que comprobar.")
    sys.exit(0)
CONTROL = SIN[:3]  # muestra de procesos no rederivados, para detectar regresión

# --- sitio de prueba sin guardia ---
tmp = pathlib.Path(tempfile.mkdtemp())
(tmp / "informe" / "fase2").mkdir(parents=True)
(tmp / "estilo").mkdir()
(tmp / "supabase").mkdir()
shutil.copy(RAIZ / "estilo" / "app.css", tmp / "estilo" / "app.css")
(tmp / "supabase" / "sesion.js").write_text(
    "window.rowerSesion={viva:()=>true,correo:()=>'x',usuario:()=>({}),"
    "token:()=>'x',tokenVivo:()=>Promise.resolve('x'),salir:()=>{}};", encoding="utf-8")
html = (SRC / "informe-fase2.html").read_text(encoding="utf-8").replace(
    '<script src="../../supabase/sesion.js" data-proteger data-permiso="ver.informe"></script>',
    '<script src="../../supabase/sesion.js"></script>')
(tmp / "informe" / "fase2" / "informe-fase2.html").write_text(html, encoding="utf-8")
for f in ("manual-procesos-datos.js", "manual-contenido.js",
          "mapa-procesos-flujos.js", "flujo-render.js"):
    shutil.copy(SRC / f, tmp / "informe" / "fase2" / f)

H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(tmp))
H.log_message = lambda *a, **k: None
srv = socketserver.TCPServer(("127.0.0.1", 0), H)
threading.Thread(target=srv.serve_forever, daemon=True).start()
BASE = f"http://127.0.0.1:{srv.server_address[1]}/informe/fase2/informe-fase2.html"

fallas = []
errores = []

with sync_playwright() as pw:
    nav = pw.chromium.launch()
    pg = nav.new_page(viewport={"width": 1360, "height": 1000})
    pg.on("console", lambda m: errores.append(m.text)
          if m.type == "error" and "Failed to load resource" not in m.text else None)
    pg.on("pageerror", lambda e: errores.append(str(e)))

    def seccion(sid):
        try:
            return pg.eval_on_selector("#sec-" + sid, "e => e.innerText")
        except Exception:  # noqa: BLE001
            return ""

    ROTULO = {"dueno": "Dueño y participantes", "disparador": "Disparador, cadencia y output"}
    print(f"\nProcesos con atribución derivada de entrevistas: {len(CON)}")
    for fila in CON:
        cod, secs = fila["cod"], fila["secs"]
        pg.goto(f"{BASE}#/p/{cod}", wait_until="networkidle")
        pg.wait_for_timeout(700)
        # Cada sección sobrescrita responde por SU propia trazabilidad: si se
        # comprobara sobre el texto de ambas juntas, una taparía el hueco de la otra.
        for sid in secs:
            txt = seccion(sid)
            if not txt:
                fallas.append(f"{cod}: no renderizó «{ROTULO[sid]}»")
                continue
            if "Derivado de la evidencia" not in txt:
                fallas.append(f"{cod}: «{ROTULO[sid]}» sobrescribe la ficha "
                              f"pero no declara de qué evidencia sale")
            elif not re.search(r"E-\d+", txt):
                fallas.append(f"{cod}: «{ROTULO[sid]}» no cita ninguna entrevista (E-xx)")
        print(f"   {cod:<6} {' + '.join(secs)}")

    print(f"\nProcesos de control (ficha del mapa intacta): {len(CONTROL)}")
    for cod in CONTROL:
        pg.goto(f"{BASE}#/p/{cod}", wait_until="networkidle")
        pg.wait_for_timeout(700)
        dueno = seccion("dueno")
        if not dueno:
            fallas.append(f"{cod}: no renderizó la sección Dueño")
            continue
        if "Derivado de la evidencia" in dueno:
            fallas.append(f"{cod}: muestra trazabilidad sin declarar atribución propia")
        if "—" == dueno.strip()[-1:]:
            fallas.append(f"{cod}: perdió el dueño de la ficha del mapa (regresión)")
        print(f"   {cod:<6} conserva la ficha del mapa")

    nav.close()
srv.shutdown()

if errores:
    fallas.append("errores de consola: " + " | ".join(errores[:3]))

print()
if fallas:
    for f in fallas:
        print("  FALLA -", f)
    print(f"\n{len(fallas)} comprobación(es) fallida(s)")
    sys.exit(1)
print("✅ Capa de atribución OK — lo derivado de entrevistas manda y va trazado; "
      "lo no rederivado conserva la ficha del mapa.")
