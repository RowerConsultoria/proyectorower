# -*- coding: utf-8 -*-
"""Extrae las tablas del informe de Fase 1 a un JSON limpio. Solo lectura del repo.

    python scripts/_extraer_informe.py [salida.json] [informe.html]

Lo invoca scripts/cargar-informe.py. Ancla por numero de linea y por cadenas
del propio documento: si el informe se reestructura, revisar los `avisos` de
la salida antes de dar la extraccion por buena.
"""
import json, re, html, io, os, sys

_RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(_RAIZ, "scripts", "datos", "informe-datos.json")
SRC = sys.argv[2] if len(sys.argv) > 2 else os.path.join(_RAIZ, "informe", "fase1", "informe-diagnostico-fase1.html")
os.makedirs(os.path.dirname(os.path.abspath(OUT)), exist_ok=True)

with io.open(SRC, encoding="utf-8") as f:
    LINES = f.read().split("\n")          # LINES[i] == linea i+1

avisos = []

TAG = re.compile(r"<[^>]+>")
CELL = re.compile(r"<t([dh])\b([^>]*)>(.*?)</t\1>", re.S)

def txt(s):
    s = TAG.sub("", s)
    s = html.unescape(s)
    s = s.replace("\u00a0", " ")
    s = re.sub(r"\s+", " ", s).strip()
    return s

def line(n):            # 1-based
    return LINES[n - 1]

def find(pat, start=1, end=None):
    """Primera linea (1-based) que contiene pat."""
    end = end or len(LINES)
    for i in range(start, end + 1):
        if pat in line(i):
            return i
    raise KeyError(pat)

def table_rows(start, end):
    """Filas de las <table class="data"> entre start y end (1-based, inclusive).
    Devuelve lista de (tipo, [(attrs, texto), ...]) por fila."""
    out = []
    for i in range(start, end + 1):
        L = line(i)
        if "<tr>" not in L:
            continue
        cells = [(m.group(1), m.group(2), txt(m.group(3))) for m in CELL.finditer(L)]
        if not cells:
            continue
        kind = "th" if cells[0][0] == "h" else "td"
        out.append((kind, cells))
    return out

def tables(start, end):
    """Divide el rango en tablas: lista de listas de filas."""
    res, cur, inside = [], [], False
    for i in range(start, end + 1):
        L = line(i)
        if '<table class="data">' in L:
            inside, cur = True, []
        if inside and "<tr>" in L:
            cells = [(m.group(1), m.group(2), txt(m.group(3))) for m in CELL.finditer(L)]
            if cells:
                cur.append(("th" if cells[0][0] == "h" else "td", cells))
        if "</table>" in L and inside:
            res.append(cur)
            inside = False
    return res

SEC = re.compile(r"(?<![\d,])(\d{1,2})\.(\d{1,2}|x)(?![\d])")
def secs(s):
    vistos, res = set(), []
    for m in SEC.finditer(s):
        v = m.group(0)
        if v not in vistos:
            vistos.add(v); res.append(v)
    return res

# ---------------------------------------------------------------- 1. hallazgos (11.2)
h = find('<h3 id="s11-2">')
fin = find('<h3 id="s11-3">', h)
tb = tables(h, fin)
assert len(tb) == 1, len(tb)
hallazgos = []
for n, (kind, cells) in enumerate([r for r in tb[0] if r[0] == "td"], 1):
    tt, fac, crit, impl = [c[2] for c in cells]
    s = secs(tt)
    hallazgos.append({
        "orden": n,
        "titulo_o_texto": tt,
        "criticidad": crit,
        "seccion_origen": ", ".join(s) if s else None,
        "implicacion": impl,
        "factores": [x.strip() for x in fac.split("·")],
    })

# leyenda de factores: div.fuentes de la seccion 11
fl = find('<div class="fuentes"><b>Se consolida</b>', find('<h2 id="s11">'))
leyenda_raw = txt(line(fl))
m = re.search(r"factores del marco de 2\.2:\s*(.+)$", leyenda_raw)
factores_leyenda = {}
for parte in m.group(1).rstrip(".").split("·"):
    p = parte.strip()
    mm = re.match(r"^(\d)\s+(.+)$", p)
    factores_leyenda[mm.group(1)] = mm.group(2).strip()

# ---------------------------------------------------------------- 2. dependencias (4.5)
d0 = find('<h3 id="s4-5">')
d1 = find('<h3 id="s4-6">', d0)
h4s = [i for i in range(d0, d1) if "<h4>" in line(i)]
sev_por_tabla = []
for i in h4s:
    t = txt(line(i))
    if "severidad alta" in t:
        sev_por_tabla.append("alta")
    elif "severidad media-alta" in t:
        sev_por_tabla.append("media-alta")
dep_tabs = tables(d0, d1)
assert len(dep_tabs) == 2 and len(sev_por_tabla) == 2
dependencias = []
for sev, tb2 in zip(sev_por_tabla, dep_tabs):
    for kind, cells in [r for r in tb2 if r[0] == "td"]:
        persona, dependencia, impacto, mitig = [c[2] for c in cells]
        dependencias.append({
            "persona_o_rol": persona,
            "dependencia": dependencia,
            "impacto": impacto,
            "mitigacion": mitig,
            "severidad": sev,
            "seccion_origen": "4.5",
        })

# ---------------------------------------------------------------- 3. brechas RRHH (5.3)
b0 = find('<h3 id="s5-3">')
b1 = find('<h3 id="s5-4">', b0)
btb = tables(b0, b1)
assert len(btb) == 1
brechas = []
for kind, cells in [r for r in btb[0] if r[0] == "td"]:
    proc, sev, hall, exig = [c[2] for c in cells]
    brechas.append({
        "proceso_rrhh": proc,
        "severidad": sev,
        "hallazgo": hall,
        "exigencia_o_requerido": exig,
    })

# ---------------------------------------------------------------- 4. procesos sin sistema (8.5)
p0 = find('<h3 id="s8-5">')
p1 = find('<h3 id="s8-6">', p0)
bloques = [txt(line(i)) for i in range(p0, p1) if "<h4>" in line(i)]
ptb = tables(p0, p1)
assert len(ptb) == 3 and len(bloques) == 3, (len(ptb), len(bloques))
PAISES = ["Venezuela", "Colombia", "Costa Rica", "EE.UU.", "Panamá", "Guatemala", "VE"]
procesos = []
for bloque, tb3 in zip(bloques, ptb):
    for kind, cells in [r for r in tb3 if r[0] == "td"]:
        proc, detalle, nat = [c[2] for c in cells]
        area = next((p for p in PAISES if p in proc), None)
        procesos.append({
            "proceso": proc,
            "naturaleza": nat,
            "detalle": detalle,
            "area_o_pais": area,
            "bloque": bloque,
        })

# ---------------------------------------------------------------- 5. sistemas por pais (7.1)
s0 = find('<h4>Mapa de cobertura', find('<h3 id="s7-1">'))
s1 = find("</table>", s0)
stb = tables(s0, s1)
assert len(stb) == 1
filas = stb[0]
cabecera = [c[2] for c in filas[0][1]]
paises = cabecera[1:-1]
assert len(paises) == 6, paises
sistemas = []
for kind, cells in [r for r in filas if r[0] == "td"]:
    sistema = cells[0][2]
    if len(cells) == 3 and 'colspan="6"' in cells[1][1]:
        estado, lectura = cells[1][2], (cells[2][2] or None)
        for p in paises:
            sistemas.append({"sistema": sistema, "pais": p, "estado": estado, "lectura": lectura})
        avisos.append(
            u"sistemas_por_pais: la fila «%s» es una sola celda con colspan=6 (no hay valor por país); "
            u"se replicó su literal en las 6 filas de país y su columna «Lectura» viene vacía en el HTML (null)." % sistema)
    else:
        lectura = cells[-1][2] or None
        vals = [c[2] for c in cells[1:-1]]
        assert len(vals) == 6, (sistema, vals)
        for p, v in zip(paises, vals):
            sistemas.append({"sistema": sistema, "pais": p, "estado": v, "lectura": lectura})

# ---------------------------------------------------------------- 6. vicios de flujos (4.7)
f0 = find('<h3 id="s4-7">')
f1 = find('<h3 id="s4-8">', f0)
vicios = []
flujos_h4 = [i for i in range(f0, f1) if "<h4>" in line(i) and re.search(r"<h4>F\d", line(i))]
assert len(flujos_h4) == 8, len(flujos_h4)
for i in flujos_h4:
    t = txt(line(i))
    cod, nombre = t.split("·", 1)
    cod, nombre = cod.strip(), nombre.strip()
    j = find("</table>", i)
    cel = None
    for k in range(i, j + 1):
        if "<b>Vicios</b>" in line(k):
            cs = [txt(m.group(3)) for m in CELL.finditer(line(k))]
            cel = cs[-1]
    assert cel, cod
    partes = re.split(r"\((\d+)\)\s*", cel)
    assert partes[0].strip() == "", (cod, partes[0])
    it = iter(partes[1:])
    for num, cuerpo in zip(it, it):
        vicios.append({
            "flujo_codigo": cod,
            "flujo_nombre": nombre,
            "orden_vicio": int(num),
            "texto_vicio": cuerpo.strip(),
        })

# ---------------------------------------------------------------- 7. decisiones a la Junta (1.3)
j0 = find('<h3 id="s1-3">')
j1 = find('<h3 id="s1-4">', j0)
jtb = tables(j0, j1)
assert len(jtb) == 1
decisiones, grupo, n = [], None, 0
for kind, cells in jtb[0]:
    if kind == "th":
        continue
    if len(cells) == 1 and 'colspan="2"' in cells[0][1]:
        grupo = cells[0][2]
        continue
    ambito, dec = cells[0][2], cells[1][2]
    n += 1
    m = re.search(r"\(([^()]+)\)\s*\.?\s*$", dec)
    decisiones.append({
        "orden": n,
        "decision": dec,
        "seccion_origen": m.group(1).strip() if m else None,
        "ambito": ambito,
        "grupo": grupo,
    })

# ---------------------------------------------------------------- 8. quick wins (10.7)
q0 = find('<h3 id="s10-7">')
q1 = find('<h3 id="s10-8">', q0)
ROT = {"Qué es.": "que_es", "Por qué este.": "por_que",
       "Qué hay que resolver antes.": "que_resolver_antes", "Cómo se mide.": "como_se_mide"}
quick, actual = [], None
for i in range(q0, q1):
    L = line(i)
    if "<h4>" in L:
        t = txt(L)
        actual = {"nombre": t, "que_es": None, "por_que": None,
                  "que_resolver_antes": None, "como_se_mide": None}
        quick.append(actual)
        continue
    m = re.match(r"\s*<p><b>([^<]+)</b>\s*(.*)</p>\s*$", L)
    if m and actual and m.group(1) in ROT:
        actual[ROT[m.group(1)]] = txt(m.group(2))
assert len(quick) == 2 and all(all(v for v in q.values()) for q in quick)

# ---------------------------------------------------------------- 9. estructura del informe
BADGE = re.compile(r'<span class="badge [^"]*">(.*?)</span>', re.S)
HEAD = re.compile(r'<h([23])\s+id="([^"]+)"\s*>(.*?)</h\1>', re.S)
estructura, orden = [], 0
for i in range(1, len(LINES) + 1):
    L = line(i)
    for m in HEAD.finditer(L):
        nivel, hid, inner = int(m.group(1)), m.group(2), m.group(3)
        b = BADGE.search(inner)
        badge = txt(b.group(1)) if b else None
        limpio = txt(BADGE.sub("", inner))
        mn = re.match(r"^(\d{1,2}(?:\.\d{1,2})?)\.?\s+(.*)$", limpio)
        if mn and re.match(r"^\d", limpio):
            numero, titulo = mn.group(1), mn.group(2).strip()
        else:
            numero, titulo = None, limpio
        orden += 1
        estructura.append({
            "id": hid, "numero": numero, "titulo": titulo, "nivel": nivel,
            "orden_documento": orden, "estado_rotulado": badge,
        })

# ------------------------------------------- 10. procedimientos de s9 (tabla de soporte de 6.5)
# El macroproceso "9. Gestión de Procesos y Mejora Continua" vive en la tabla id="mapa-sop"
# como una celda con rowspan=N; cada proceso abre otra celda con rowspan=M.
m9 = find('9. Gestión de Procesos y Mejora Continua', find('id="mapa-sop"'))
rowspan_macro = int(re.search(r'rowspan="(\d+)"', line(m9)).group(1))
proc_s9, proceso_actual, k = [], None, 0
i = m9
while len([p for p in proc_s9]) < rowspan_macro:
    L = line(i)
    cells = [(mm.group(2), txt(mm.group(3))) for mm in CELL.finditer(L)]
    assert cells, i
    if len(cells) == 3:                      # abre macro + proceso + procedimiento
        nuevo, texto = cells[1][1], cells[2][1]
    elif len(cells) == 2:                    # abre proceso + procedimiento
        nuevo, texto = cells[0][1], cells[1][1]
    else:                                    # solo procedimiento
        nuevo, texto = proceso_actual, cells[0][1]
    if nuevo != proceso_actual:
        proceso_actual, k = nuevo, 0
    k += 1
    proc_s9.append({
        "proceso_nombre": proceso_actual,
        "orden": k,
        "texto": texto,
        "sugerido": None,   # el informe no lo distingue — ver avisos
    })
    i += 1
assert len(proc_s9) == rowspan_macro == 15, (len(proc_s9), rowspan_macro)

# ---------------------------------------------------------------- avisos
nulos = [h["orden"] for h in hallazgos if h["seccion_origen"] is None]
avisos = [
 u"hallazgos: la tabla de 11.2 no tiene columna «sección de origen»; el campo seccion_origen se "
 u"obtuvo extrayendo las referencias tipo N.M presentes en el propio texto del hallazgo (orden de "
 u"aparición, separadas por «, ») y es null en las %d filas que no citan ninguna subsección: órdenes "
 u"%s. Ojo: el orden %d cita «(sección 5)» y el %d «(insumo sesión 14-jul)» — referencias que no son "
 u"N.M y por eso quedan en null." % (len(nulos), ", ".join(str(x) for x in nulos), 18, 13),
 u"hallazgos: el orden de las columnas en el HTML es Hallazgo · Factores (2.2) · Criticidad · "
 u"Implicación / recomendación preliminar; se respetaron los literales de criticidad "
 u"(Alta / Media-Alta / Media / Oportunidad).",
 u"dependencias_criticas: la severidad no es columna — viene del <h4> que precede cada tabla "
 u"(«Riesgos de severidad alta» → alta, 6 filas; «Riesgos de severidad media-alta» → media-alta, "
 u"6 filas). seccion_origen se fijó a «4.5» para las 12 filas (no hay columna de origen).",
] + avisos + [
 u"procesos_sin_sistema: el enunciado del bloque y la columna «Naturaleza» son dos cosas distintas. "
 u"naturaleza lleva el literal de la columna Naturaleza de cada fila (de ahí salen los ejemplos "
 u"«Excel como sistema de decisión», «Sin captura sistematizada», «IA individual sobre Excel»); se "
 u"añadió el campo extra «bloque» con el literal del <h4> del bloque (a / b / c) para no perderlo.",
 u"procesos_sin_sistema: no existe columna de área o país. area_o_pais solo se rellenó cuando el "
 u"nombre del proceso menciona literalmente un país o «VE»; es null en 12 de las 23 filas.",
 u"sistemas_por_pais: la tabla tiene además una columna «Lectura» (una conclusión por sistema, no por "
 u"país); se conservó en el campo extra «lectura», repetido en las filas del mismo sistema.",
 u"vicios_flujos: los vicios se partieron por los marcadores «(1) (2) (3)…» dentro de la celda "
 u"«Vicios» de cada flujo. Reparto: F1 6 · F2 3 · F3 5 · F4 4 · F5 4 · F6 4 · F7 5 · F8 7 = 38 vicios. "
 u"La celda «Cadena real» de cada flujo no se extrajo (no la pedía el esquema); la tabla de «Vicios "
 u"transversales» (6 patrones) tampoco.",
 u"decisiones_junta: las 12 decisiones están en la tabla de 1.3, agrupadas por tres filas-cabecera "
 u"(Gobierno y estrategia · Estructura y talento · Dato e inteligencia artificial), 4 decisiones cada "
 u"una. Se añadieron los campos extra «ambito» (primera columna de la tabla) y «grupo» (la "
 u"fila-cabecera). seccion_origen es el paréntesis final de cada decisión, literal (p.ej. «3.4 · 11»).",
 u"quick_wins: los cuatro rótulos del informe son «Qué es.» / «Por qué este.» / «Qué hay que resolver "
 u"antes.» / «Cómo se mide.» — se mapearon a que_es / por_que / que_resolver_antes / como_se_mide.",
 u"estructura_informe: el documento vigente tiene 16 <h2> y 66 <h3>. Los <h2> son: «indice» + las 12 "
 u"secciones numeradas (1–12) + los anexos s15 y s16 + el apartado interno s17. OJO: NO existen "
 u"secciones 13 ni 14 — los anexos conservan los ids s15/s16/s17 (fósiles de una numeración anterior), "
 u"y el índice los lista con <ol start=\"15\">. numero es null para «indice» y para los tres anexos.",
 u"estructura_informe: agrupación por partes (no es campo del esquema): Parte I — Diagnóstico "
 u"organizativo = s1–s10 · Parte II — Síntesis de hallazgos y próximos pasos = s11–s12 · Anexos = "
 u"s15, s16 · Uso interno del equipo = s17. El informe NO tiene «Parte III».",
 u"estructura_informe: estado_rotulado es el texto literal del <span class=\"badge\"> del encabezado "
 u"(«Borrador», «Borrador — primera versión», «Borrador consolidado — para revisión del equipo», "
 u"«Preborrador de propuesta», «En construcción», «Uso interno del equipo», «Borrador — para "
 u"discusión», «Borrador — fase documental»); null cuando el encabezado no trae rótulo. "
 u"Los <h4> no se incluyeron (113 en el documento): el esquema pide solo h2 y h3.",
 u"procedimientos_s9: son 15, no ~16, y se reparten 3 + 3 + 3 + 3 + 3 entre CINCO procesos, no cuatro. "
 u"El macroproceso «9. Gestión de Procesos y Mejora Continua» está en la tercera tabla de 6.5 "
 u"(id=\"mapa-sop\") con rowspan=15. OJO: la lista de procesos del coordinador omitió el segundo del "
 u".js, «Diseño Estructural y Levantamiento»; el orden real en mapa-procesos-datos.js es "
 u"1 Detección de Necesidades y Diagnóstico · 2 Diseño Estructural y Levantamiento · 3 Análisis "
 u"Técnico y Documentación de Manuales · 4 Validación, Aprobación e Implementación · 5 Actualización "
 u"de Registros, Seguimiento y Mejora — y coincide exactamente, nombre a nombre y en el mismo orden, "
 u"con los cinco de la tabla del informe.",
 u"procedimientos_s9: sugerido es null en las 15 filas. El informe NO marca los sugeridos en las "
 u"tablas de 6.5: no hay cursiva, ni color, ni clase CSS, ni columna de estado en ninguna de las 260 "
 u"filas (verificado: .mapa-proc no tiene regla de estilo, es solo un gancho). La nota metodológica de "
 u"6.5 lo dice expresamente — los propuestos por el equipo consultor «quedan ubicados en el lugar que "
 u"ocuparía el procedimiento real» y «en esta versión no se incluye la columna de estado». El dato "
 u"sugerido/levantado de estos 15 no existe en el repo: los textos aparecen SOLO en el informe (no "
 u"están en el .js, cuyos 5 procesos de s9 traen pr: []), así que hay que decidirlo con Jesús o "
 u"sacarlo del Excel v7.",
 u"procedimientos_s9: la diferencia 260 − 244 = 16 NO es solo s9. Comparando macro por macro, el "
 u"informe y el .js coinciden en 21 de los 22 macroprocesos; los dos huecos son s9 (informe 15 · .js 0) "
 u"y «o4 Gestión Comercial - Canal Mayoreo (B2B)» (informe 10 · .js 9, coherente con el «1 duplicado "
 u"eliminado» de la auditoría v7). 15 + 1 = 16. Además hay 3 procesos con pr: [] fuera de s9 "
 u"(«Democratización de Datos (Self-Service BI)» en s4, «Gestión de Eventos y Presencia en Ferias» en "
 u"s5, «Gestión de Riesgos Legales» en s7): en el informe cada uno tiene 1 procedimiento, pero el "
 u"total de su macro cuadra con el .js, así que esos procedimientos están reubicados en procesos "
 u"hermanos (los «8 procedimientos reubicados» de la auditoría), no perdidos.",
]

data = {
    "hallazgos": hallazgos,
    "factores_leyenda": factores_leyenda,
    "dependencias_criticas": dependencias,
    "brechas_rrhh": brechas,
    "procesos_sin_sistema": procesos,
    "sistemas_por_pais": sistemas,
    "vicios_flujos": vicios,
    "decisiones_junta": decisiones,
    "quick_wins": quick,
    "estructura_informe": estructura,
    "procedimientos_s9": proc_s9,
    "avisos": avisos,
}

with io.open(OUT, "w", encoding="utf-8") as f:
    f.write(json.dumps(data, ensure_ascii=False, indent=2))

print("escrito", OUT)
for k, v in data.items():
    print(" ", k, len(v))
