# Genera informe/fase1/mapa-procesos-datos.js desde el Excel v7 del mapa de
# procesos, aplicando las correcciones detectadas en la auditoría:
#  - 4 corrimientos de fila en Soporte (procedimiento bajo el proceso equivocado)
#  - 1 procedimiento duplicado literal en Ventas al Canal Mayor
# Los procedimientos "sugeridos por UCAB" se detectan por cursiva/azul.
import json, re
import openpyxl

XLSX = r"c:\Users\gabri\Downloads\Mapa_Procesos_Kennex_v7_Integrado.xlsx"
SALIDA = r"C:\Users\gabri\OneDrive\Escritorio\APPS Github\Rower\proyectorower\informe\fase1\mapa-procesos-datos.js"

HOJAS = [("1. Estratégicos", "e"), ("2. Operativos", "o"), ("3. Soporte", "s")]

# (fragmento único del procedimiento, fragmento del proceso equivocado, fragmento del proceso correcto)
REUBICACIONES = [
    ("Reportería fiscal a autoridades", "Ingresos Diferidos", "Reportería Financiera Consolidada"),
    ("Detección de Oportunidades Comerciales", "Democratización", "Analítica Predictiva"),
    ("Rebalanceo de Tiendas", "Democratización", "Analítica Predictiva"),
    ("Smart Pricing", "Democratización", "Analítica Predictiva"),
    ("Editorial y calendario de contenidos", "Influencers", "Contenido Creativo"),
    ("Reebok", "Visual Merchandising", "Influencers"),
    ("estándares visuales", "Eventos y Presencia", "Visual Merchandising"),
    ("Cumplimiento laboral y regulatorio local", "Riesgos Legales", "Cumplimiento Regulatorio y Fiscal"),
]

def es_sugerido(cell):
    f = cell.font
    if f is None: return False
    if f.italic: return True
    rgb = getattr(f.color, "rgb", None) if f.color else None
    return isinstance(rgb, str) and rgb.upper().endswith("1565C0")

wb = openpyxl.load_workbook(XLSX, data_only=True)
macros, num = [], {"e": 0, "o": 0, "s": 0}

for hoja, cat in HOJAS:
    ws = wb[hoja]
    macro_actual, proceso_actual = None, None
    for fila in ws.iter_rows(min_row=6):
        a, b, c, d = fila[0], fila[1], fila[2], fila[3]
        texto_fila = " ".join(str(x.value) for x in (a, b, c, d) if x.value)
        if "RESUMEN" in texto_fila.upper(): break
        if b.value and str(b.value).strip():
            num[cat] += 1
            macro_actual = {"id": f"{cat}{num[cat]}", "cat": cat,
                            "n": re.sub(r"^\d+\.\s*", "", str(b.value).strip()), "procesos": []}
            macros.append(macro_actual)
            proceso_actual = None
        if c.value and str(c.value).strip() and macro_actual is not None:
            proceso_actual = {"n": str(c.value).strip(), "pr": []}
            macro_actual["procesos"].append(proceso_actual)
        if d.value and str(d.value).strip() and proceso_actual is not None:
            proceso_actual["pr"].append({"t": str(d.value).strip(), "sug": es_sugerido(d)})

# --- correcciones ---
def buscar_proceso(frag):
    for m in macros:
        for p in m["procesos"]:
            if frag.lower() in p["n"].lower():
                return p
    return None

reubicados = 0
for frag_pr, frag_desde, frag_hacia in REUBICACIONES:
    desde, hacia = buscar_proceso(frag_desde), buscar_proceso(frag_hacia)
    if not desde or not hacia: print(f"AVISO: no encontré '{frag_desde}' o '{frag_hacia}'"); continue
    for pr in list(desde["pr"]):
        if frag_pr.lower() in pr["t"].lower():
            desde["pr"].remove(pr); hacia["pr"].append(pr); reubicados += 1

# duplicado literal en Ventas al Canal Mayor
dedup = 0
for m in macros:
    for p in m["procesos"]:
        vistos, unicos = set(), []
        for pr in p["pr"]:
            clave = pr["t"].lower()
            if clave in vistos: dedup += 1; continue
            vistos.add(clave); unicos.append(pr)
        p["pr"] = unicos

tot_m = len(macros)
tot_p = sum(len(m["procesos"]) for m in macros)
tot_pr = sum(len(p["pr"]) for m in macros for p in m["procesos"])
tot_sug = sum(1 for m in macros for p in m["procesos"] for pr in p["pr"] if pr["sug"])

datos = {
    "meta": {
        "fuente": "Mapa_Procesos_Kenex_v7_Integrado.xlsx (jul-2026)",
        "corte": "18-jul-2026",
        "macros": tot_m, "procesos": tot_p, "procedimientos": tot_pr,
        "sugeridos": tot_sug, "originales": tot_pr - tot_sug,
        "nota": f"v7 corregida: {reubicados} procedimientos reubicados (corrimientos de fila) y {dedup} duplicado eliminado. El informe cita 260 procedimientos — cifra en conciliación con Jesús (el archivo v7 contiene {tot_pr + dedup}).",
    },
    "macros": macros,
}

with open(SALIDA, "w", encoding="utf-8") as f:
    f.write("// Generado desde el Excel v7 del mapa de procesos — NO editar a mano.\n")
    f.write("// Regenerar con scripts del proyecto si cambia el Excel (correcciones de auditoría aplicadas).\n")
    f.write("window.MAPA_DATOS = ")
    json.dump(datos, f, ensure_ascii=False, indent=1)
    f.write(";\n")

print(f"OK: {tot_m} macros · {tot_p} procesos · {tot_pr} procedimientos ({tot_pr - tot_sug} originales + {tot_sug} sugeridos)")
print(f"Reubicados: {reubicados} · Duplicados eliminados: {dedup}")
for cat, nombre in [("e", "Estratégicos"), ("o", "Operativos"), ("s", "Soporte")]:
    ms = [m for m in macros if m["cat"] == cat]
    print(f"  {nombre}: {len(ms)} macros / {sum(len(m['procesos']) for m in ms)} procesos / {sum(len(p['pr']) for m in ms for p in m['procesos'])} proced.")
for m in macros: print(f"   [{m['id']}] {m['n']} ({len(m['procesos'])}p)")
