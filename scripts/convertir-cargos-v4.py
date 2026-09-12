# -*- coding: utf-8 -*-
"""
Convierte Insumos/Estructura_Patron_Cargos_Rower_V4.xlsx (hoja "Detalle
Personal") a Insumos/estructura-patron-cargos-v4.json, fila por fila, sin
deduplicar y sin recortar columnas.

Por qué existe: el equipo consultor necesita, para cada persona, tanto su
`cargo_actual` (como se nombra hoy, y como suele aparecer en las
entrevistas) como su `cargo_patron_propuesto` (la denominación V4 que se
usa en el contenido de los manuales de Fase 2) — la reclasificación entre
ambos es justamente el dato de valor. Un catálogo deduplicado de solo
cargos propuestos perdería esa trazabilidad.

El .xlsx no se puede leer directo con las herramientas de lectura de texto
del asistente (es binario); el .json derivado sí. Ambos quedan dentro de
Insumos/ y por tanto fuera de git (ver .gitignore) — el .json contiene
nombres reales de personal, igual que el .xlsx de origen.

Re-correr este guion cada vez que el equipo entregue una versión nueva del
Excel V4 (el .json queda desactualizado si no se regenera).

Uso: python scripts/convertir-cargos-v4.py
"""
import json
import sys
from pathlib import Path

import openpyxl

RAIZ = Path(__file__).resolve().parent.parent
ORIGEN = RAIZ / "Insumos" / "Estructura_Patron_Cargos_Rower_V4.xlsx"
DESTINO = RAIZ / "Insumos" / "estructura-patron-cargos-v4.json"

CLAVES = [
    "nombre_completo",
    "pais",
    "entidad",
    "departamento_original",
    "cargo_actual",
    "familia_propuesta",
    "nivel_propuesto",
    "cargo_patron_propuesto",
    "cargo_normalizado_auxiliar",
]


def main():
    if not ORIGEN.exists():
        print(f"No se encontró {ORIGEN}", file=sys.stderr)
        sys.exit(1)

    wb = openpyxl.load_workbook(ORIGEN, data_only=True)
    ws = wb["Detalle Personal"]
    filas = list(ws.iter_rows(values_only=True))
    encabezado = filas[0]

    if len(encabezado) != len(CLAVES):
        print(
            f"⚠️  La hoja tiene {len(encabezado)} columnas y se esperaban "
            f"{len(CLAVES)} — revisar CLAVES antes de continuar. "
            f"Encabezado real: {encabezado}",
            file=sys.stderr,
        )
        sys.exit(1)

    personas = []
    for fila in filas[1:]:
        if all(valor is None for valor in fila):
            continue
        personas.append(dict(zip(CLAVES, fila)))

    salida = {
        "_fuente": "Insumos/Estructura_Patron_Cargos_Rower_V4.xlsx, hoja Detalle Personal",
        "_generado_por": "scripts/convertir-cargos-v4.py",
        "_nota": (
            "Conversión fiel, fila por fila, sin deduplicar. Contiene nombres "
            "reales — uso interno del equipo consultor; nunca citar nombres "
            "propios en el contenido de los manuales (solo "
            "cargo_patron_propuesto)."
        ),
        "_columnas_originales": list(encabezado),
        "personas": personas,
    }

    DESTINO.write_text(
        json.dumps(salida, ensure_ascii=False, indent=1), encoding="utf-8"
    )

    cargos_unicos = {p["cargo_patron_propuesto"] for p in personas if p["cargo_patron_propuesto"]}
    print(f"{len(personas)} personas · {len(cargos_unicos)} cargos propuestos distintos")
    print(f"Escrito: {DESTINO}")


if __name__ == "__main__":
    main()
