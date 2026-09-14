# -*- coding: utf-8 -*-
"""Smoke test genérico del Manual de Procesos (Fase 2), sin guardia de acceso.

Verifica el mínimo del esquema para UN macroproceso, sin depender de cifras
exactas de ese macro en particular (a diferencia de los smoke test ad-hoc que
se escribieron macro por macro durante la construcción de 6/8/9/10/11/12/13):
por cada proceso N1 exige >=4 actividades, >=4 nodos en el diagrama, >=4
riesgos, >=3 indicadores y cero cajas de "contenido pendiente"; a nivel de
macro (N0) exige que el título cargue y que no queden cajas de "contenido
pendiente" en ninguna sección que ya se haya redactado.

Uso:
    python scripts/comprobar-fase2.py 11
    python scripts/comprobar-fase2.py 11 --capturas   (además, dos screenshots)

Requiere: pip install playwright && playwright install chromium
Sale con código 1 si algo falla o si la consola del navegador reporta un
error. Se puede correr tanto dentro del repo como dentro del paquete
"VS Code - Paquete Elaboracion Macroprocesos" (busca informe/estilo/supabase
como hermanos de scripts/, en ambos casos).
"""
import http.server
import io
import pathlib
import shutil
import socketserver
import sys
import tempfile
import threading
import functools

from playwright.sync_api import sync_playwright

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

if len(sys.argv) < 2 or not sys.argv[1]:
    print("Uso: python scripts/comprobar-fase2.py <prefijo-de-macroproceso> [--capturas]")
    sys.exit(2)

PREFIJO = sys.argv[1]
CAPTURAS = "--capturas" in sys.argv[2:]

RAIZ = pathlib.Path(__file__).resolve().parent.parent
SRC = RAIZ / "informe" / "fase2"

for requerido in (
    SRC / "informe-fase2.html",
    SRC / "manual-procesos-datos.js",
    SRC / "manual-contenido.js",
    SRC / "flujo-render.js",
    SRC / "mapa-procesos-flujos.js",
    RAIZ / "estilo" / "app.css",
):
    if not requerido.exists():
        print(f"Falta {requerido} — este guion espera la misma estructura de carpetas del repo "
              f"(informe/fase2/, estilo/) como hermanas de scripts/.")
        sys.exit(2)

tmp = pathlib.Path(tempfile.mkdtemp())
(tmp / "informe" / "fase2").mkdir(parents=True)
(tmp / "estilo").mkdir()
(tmp / "supabase").mkdir()
shutil.copy(RAIZ / "estilo" / "app.css", tmp / "estilo" / "app.css")
(tmp / "supabase" / "sesion.js").write_text(
    "window.rowerSesion={viva:()=>true,correo:()=>'x',usuario:()=>({}),"
    "token:()=>'x',tokenVivo:()=>Promise.resolve('x'),salir:()=>{}};",
    encoding="utf-8",
)
html = (SRC / "informe-fase2.html").read_text(encoding="utf-8").replace(
    '<script src="../../supabase/sesion.js" data-proteger data-permiso="ver.informe"></script>',
    '<script src="../../supabase/sesion.js"></script>',
)
(tmp / "informe" / "fase2" / "informe-fase2.html").write_text(html, encoding="utf-8")
for f in ("manual-procesos-datos.js", "manual-contenido.js", "mapa-procesos-flujos.js", "flujo-render.js"):
    shutil.copy(SRC / f, tmp / "informe" / "fase2" / f)

Handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(tmp))
Handler.log_message = lambda *a, **k: None
srv = socketserver.TCPServer(("127.0.0.1", 0), Handler)
port = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()
base = f"http://127.0.0.1:{port}/informe/fase2/informe-fase2.html"
capturas_dir = pathlib.Path(tempfile.gettempdir()) / "comprobar-fase2-capturas"
if CAPTURAS:
    capturas_dir.mkdir(exist_ok=True)

errores = []
fallas = []

with sync_playwright() as pw:
    b = pw.chromium.launch()
    pg = b.new_page(viewport={"width": 1360, "height": 1000})
    def registrar_consola(m):
        if m.type not in ("error", "warning"):
            return
        # La sección de validadores intenta leer v_validadores_proceso contra
        # el Supabase real; sin sesión válida (no la hay en esta previsualización
        # local) responde 401 y la propia app lo tolera y sigue sin ese bloque —
        # es un mensaje de red esperado en este contexto, no un error de la app.
        if "Failed to load resource" in m.text:
            return
        errores.append(f"{m.type}: {m.text}")

    pg.on("console", registrar_consola)
    pg.on("pageerror", lambda e: errores.append(f"pageerror: {e}"))

    # --- vista del macroproceso: título + descubrir sus procesos N1 ---
    pg.goto(f"{base}#/m/{PREFIJO}", wait_until="networkidle")
    pg.wait_for_timeout(250)
    h1 = pg.inner_text(".f2-h1").strip()
    if not h1:
        fallas.append(f"macro {PREFIJO}: no cargó título (¿el prefijo existe en manual-procesos-datos.js?)")
    else:
        print(f"Macro {PREFIJO}: {h1}")

    codigos = []
    for href in pg.locator("#sec-procesos .f2-proc").evaluate_all("els => els.map(e => e.getAttribute('href'))"):
        if href and "#/p/" in href:
            codigos.append(href.split("#/p/")[-1])
    codigos = sorted(set(codigos), key=lambda c: [int(x) if x.isdigit() else x for x in c.split(".")])

    if not codigos:
        fallas.append(f"macro {PREFIJO}: no se encontró ningún proceso N1 en el índice — ¿prefijo correcto?")

    vacios_macro = pg.locator("#app .f2-vacio").count()
    if vacios_macro:
        print(f"  (info) {vacios_macro} sección(es) de N0 aún sin redactar (\"contenido pendiente\") — normal si el macro está en curso")

    if CAPTURAS:
        pg.screenshot(path=str(capturas_dir / f"macro-{PREFIJO}.png"), full_page=True)

    # --- cada proceso N1: mínimos del esquema ---
    resumen = []
    for cod in codigos:
        pg.goto(f"{base}#/p/{cod}", wait_until="networkidle")
        pg.wait_for_timeout(180)
        h1p = pg.inner_text(".f2-h1").strip()
        nact = pg.locator("#sec-flujo .f2-num-list li").count()
        nnodos = pg.locator(
            "#sec-flujo svg.fx-svg .fx-nodo, #sec-flujo svg.fx-svg .fx-decision, "
            "#sec-flujo svg.fx-svg .fx-inicio, #sec-flujo svg.fx-svg .fx-fin"
        ).count()
        nriesgos = pg.locator("#sec-riesgos table.f2-tabla tbody tr").count()
        nind = pg.locator("#sec-indicadores table.f2-tabla tbody tr").count()
        vacios = pg.locator(".f2-vacio").count()
        resumen.append((cod, h1p, nact, nnodos, nriesgos, nind, vacios))
        if nact < 4:
            fallas.append(f"{cod}: pocas actividades ({nact}, mínimo 4)")
        if nnodos < 4:
            fallas.append(f"{cod}: pocos nodos en el diagrama ({nnodos}, mínimo 4)")
        if nriesgos < 4:
            fallas.append(f"{cod}: pocos riesgos ({nriesgos}, mínimo 4)")
        if nind < 3:
            fallas.append(f"{cod}: pocos indicadores ({nind}, mínimo 3)")
        if vacios:
            fallas.append(f"{cod}: quedan {vacios} caja(s) de \"contenido pendiente\"")

    for cod, h1p, nact, nnodos, nriesgos, nind, vacios in resumen:
        marca = "  " if not vacios and nact >= 4 and nnodos >= 4 and nriesgos >= 4 and nind >= 3 else "⚠️"
        print(f"{marca} {cod:8s} {h1p[:52]:52s} act={nact:2d} nodos={nnodos:2d} riesgos={nriesgos} ind={nind}")

    if CAPTURAS and codigos:
        pg.goto(f"{base}#/p/{codigos[0]}", wait_until="networkidle")
        pg.wait_for_timeout(300)
        if pg.locator("#sec-flujo .fx-ampliar").count():
            pg.locator("#sec-flujo .fx-ampliar").click()
            pg.wait_for_timeout(300)
            pg.locator(".fx-lb").screenshot(path=str(capturas_dir / f"flujo-{codigos[0]}.png"))

    b.close()

srv.shutdown()

if CAPTURAS:
    print("\ncapturas en:", capturas_dir)

if errores:
    print("\n⚠️  consola del navegador:")
    for e in errores:
        print("  ", e)
    fallas.append(f"{len(errores)} mensaje(s) de error/warning en la consola del navegador")

if fallas:
    print(f"\n❌ {len(fallas)} problema(s) en el macro {PREFIJO}:")
    for f in fallas:
        print("  -", f)
    sys.exit(1)

print(f"\n✅ Macro {PREFIJO} OK — {len(codigos)} proceso(s), sin errores de consola.")
