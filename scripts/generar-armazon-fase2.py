# -*- coding: utf-8 -*-
"""Genera el armazón de datos de «Fase 2 — Procesos» a partir del mapa v18.

Proyecto Rower — UCAB Consultores para Grupo Kenex.

Entrada  : Insumos/mapa-procesos-kennex-v18.json   (mapa validado, N0 + N1, sin N2)
Salida   : informe/fase2/manual-procesos-datos.js  (fuente única del módulo)

El guion NO inventa contenido: proyecta el árbol del mapa (20 macroprocesos /
182 procesos) al esquema que consume el módulo, deja la ficha de cada proceso
tal como viene del mapa (estado «semilla») y marca todo lo demás «pendiente».
El contenido real de cada sección lo llenará después el pipeline de manuales.

Normaliza «Kennex» → «Kenex» en todo texto visible (convención del proyecto).

Uso:
    python scripts/generar-armazon-fase2.py

Es idempotente: reescribe el .js completo cada vez.
"""
import io
import json
import os
import re
import sys
from datetime import date

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENTRADA = os.path.join(RAIZ, "Insumos", "mapa-procesos-kennex-v18.json")
SALIDA = os.path.join(RAIZ, "informe", "fase2", "manual-procesos-datos.js")


def kenex(x):
    """Normaliza la marca en cualquier cadena (o estructura anidada)."""
    if isinstance(x, str):
        x = re.sub(r"Kennex", "Kenex", x)
        x = re.sub(r"KENNEX", "KENEX", x)
        return x
    if isinstance(x, list):
        return [kenex(i) for i in x]
    if isinstance(x, dict):
        return {k: kenex(v) for k, v in x.items()}
    return x


# --- catálogos fijos del módulo -------------------------------------------------

CATEGORIAS = [
    {"id": "estrategico", "n": "Estratégicos",
     "g": "Definen el rumbo: qué vender, dónde crecer y cómo se gobierna el grupo."},
    {"id": "operativo", "n": "Operativos",
     "g": "La cadena de valor de punta a punta: comprar, mover, vender y atender al cliente."},
    {"id": "soporte", "n": "Soporte",
     "g": "Habilitan la operación: finanzas, tecnología, datos, personas y cumplimiento."},
]

# Actores externos — panel de referencia del mapa, no son macroprocesos.
ACTORES_EXTERNOS = [
    {"n": "Casio (casa matriz, Japón)",
     "r": "Marca representada: catálogo, cupos de compra y lineamientos de marca."},
    {"n": "Fábricas y ODM (Asia)",
     "r": "Manufactura del producto propio Cubitt y de accesorios."},
    {"n": "Operadores logísticos y aduanas",
     "r": "Transporte internacional, nacionalización y permisología por país."},
    {"n": "Socios y terceros de canal",
     "r": "Importbel (Costa Rica) como socio; franquicias, mayoristas y retail de terceros."},
    {"n": "Clientes finales",
     "r": "Consumidor de los canales mayoreo, retail y e-commerce."},
    {"n": "Entes reguladores y banca",
     "r": "Marcos tributario, aduanal y cambiario; sistema financiero por país."},
]

# Secciones internas del macroproceso (N0). Derivadas del prompt v4 del equipo.
SECCIONES_N0 = [
    {"id": "introduccion", "n": "Introducción",
     "sub": ["Propósito del manual", "Alcance", "Audiencia"]},
    {"id": "contexto", "n": "Contexto del macroproceso",
     "sub": ["Ubicación en el mapa de procesos", "Dueños y responsabilidades",
             "Entidades y países involucrados", "Sistemas utilizados",
             "Interfaces con otros macroprocesos"]},
    {"id": "gobernanza", "n": "Gobernanza y responsabilidades",
     "sub": ["Actores y límites de autoridad", "Comités e instancias de decisión"]},
    {"id": "marco", "n": "Marco de referencia",
     "sub": ["Principios rectores", "Políticas aplicables", "Marco normativo"]},
    {"id": "procesos", "n": "Procesos del macroproceso", "indice": True,
     "sub": []},
    {"id": "agenda", "n": "Agenda de mejora y brechas",
     "sub": ["Procesos por implementar", "Procesos por formalizar o consolidar",
             "Brechas por atender en procesos vigentes"]},
    {"id": "anexos", "n": "Anexos",
     "sub": ["Glosario del macroproceso", "Matriz RACI consolidada",
             "Catálogo de sistemas y herramientas", "Interfaces con otros macroprocesos (detalle)",
             "Catálogo de documentación de Lark", "Variaciones operativas por país"]},
]

# Secciones internas del proceso (N1). Los 7 sub-puntos del prompt, con x.4 y x.5
# fundidos en «Flujo de actividades» (la lista numerada vive pegada a su diagrama).
SECCIONES_N1 = [
    {"id": "proposito", "n": "Propósito y alcance", "semilla": "alcance"},
    {"id": "dueno", "n": "Dueño y participantes", "semilla": "dueno"},
    {"id": "disparador", "n": "Disparador, cadencia y output", "semilla": "disparador"},
    {"id": "flujo", "n": "Flujo de actividades",
     "nota": "Descripción numerada de las actividades y su flujograma (BPMN)."},
    {"id": "riesgos", "n": "Matriz de riesgos"},
    {"id": "indicadores", "n": "Indicadores propuestos"},
]


def construir():
    with open(ENTRADA, "r", encoding="utf-8") as f:
        crudo = kenex(json.load(f))

    macros_src = crudo["macroprocesos"]

    # --- totales ---
    por_cat = {}
    por_mad = {}
    total_proc = 0
    for m in macros_src:
        c = m["categoria"]
        por_cat.setdefault(c, {"m": 0, "p": 0})
        por_cat[c]["m"] += 1
        por_cat[c]["p"] += len(m["procesos"])
        total_proc += len(m["procesos"])
        for p in m["procesos"]:
            md = p.get("madurez", "sin_determinar")
            por_mad[md] = por_mad.get(md, 0) + 1

    # --- macroprocesos ---
    macros = []
    for m in macros_src:
        n0 = {s["id"]: {"estado": "pendiente"} for s in SECCIONES_N0
              if not s.get("indice")}
        procesos = []
        for p in m["procesos"]:
            ficha = {
                "alcance": p.get("alcance", ""),
                "dueno": p.get("dueno", ""),
                "participantes": p.get("participantes", []),
                "cadencia": p.get("cadencia", ""),
                "disparador": p.get("disparador", ""),
                "output": p.get("output", ""),
                "fuentes": p.get("fuentes", ""),
            }
            n1 = {}
            for s in SECCIONES_N1:
                if s.get("semilla") and ficha.get(s["semilla"]):
                    n1[s["id"]] = {"estado": "semilla"}
                else:
                    n1[s["id"]] = {"estado": "pendiente"}
            procesos.append({
                "codigo": p["codigo"],
                "n": p["nombre"],
                "madurez": p.get("madurez", "sin_determinar"),
                "mapa": ficha,
                "n1": n1,
            })
        macros.append({
            "prefijo": m["prefijo"],
            "cat": m["categoria"],
            "n": m["nombre"],
            "n0": n0,
            "procesos": procesos,
        })

    datos = {
        "meta": {
            "version": "v18",
            "generado": date.today().isoformat(),
            "fuenteMapa": "Mapa de Procesos Actualizado v18 — validado por el equipo consultor",
            "niveles": "N0 (macroprocesos) y N1 (procesos). Sin N2: los procedimientos quedaron fuera del alcance de la Fase 2.",
            "totales": {
                "macroprocesos": len(macros_src),
                "procesos": total_proc,
                "categoria": por_cat,
                "madurez": por_mad,
            },
        },
        "categorias": CATEGORIAS,
        "actoresExternos": ACTORES_EXTERNOS,
        "seccionesN0": SECCIONES_N0,
        "seccionesN1": SECCIONES_N1,
        "macros": macros,
    }
    return datos


def main():
    datos = construir()
    cuerpo = json.dumps(datos, ensure_ascii=False, indent=1)
    cab = (
        "// Fuente única del módulo «Fase 2 — Procesos» del aplicativo.\n"
        "// GENERADO por scripts/generar-armazon-fase2.py desde el mapa v18 — NO editar a mano.\n"
        "// El árbol (20 macroprocesos / 182 procesos) y la ficha de cada proceso vienen\n"
        "// del mapa validado; el contenido de las secciones lo llena el pipeline de manuales.\n"
        "window.MANUAL_FASE2 = "
    )
    with open(SALIDA, "w", encoding="utf-8", newline="\n") as f:
        f.write(cab + cuerpo + ";\n")

    t = datos["meta"]["totales"]
    print("OK  " + os.path.relpath(SALIDA, RAIZ))
    print("    %d macroprocesos · %d procesos" % (t["macroprocesos"], t["procesos"]))
    print("    por categoría: " + ", ".join(
        "%s %d/%d" % (k, v["m"], v["p"]) for k, v in t["categoria"].items()))
    print("    por madurez:   " + ", ".join(
        "%s %d" % (k, v) for k, v in sorted(t["madurez"].items())))


if __name__ == "__main__":
    main()
