# -*- coding: utf-8 -*-
"""Proyecta los procesos de Fase 2 a la §15 y propone quién valida cada uno.

Dos trabajos en una corrida:

1. **Proyectar** `informe/fase2/*.js` a `public.procesos_fase2`. El repo manda:
   este guion no inventa dato, solo traduce a filas lo que ya está en el manual.

2. **Emparejar** el dueño que el mapa v18 dejó como texto libre («Coordinador(a)
   de Logística y Bodega») con una PERSONA REAL del censo (`personal`, cuyos
   cargos vienen en el otro vocabulario: «COORD. DE LOGISTICA Y BODEGA»).

⚠️ Lo que siembra el emparejador son PROPUESTAS (`origen='auto'`), no
asignaciones. Solo las filas que un humano confirma en el panel habilitan la
generación de un enlace — el texto del dueño trae artefactos de una sustitución
automática mal hecha («Gerente de Proyectoss (PMO)», «Gerente Comercial (País /
Canal) al Detal (País) (País) (VE)») y mandarle a un gerente un proceso que no
es suyo quema la ronda entera en el primer envío.

Volver a correrlo es seguro y NO deshace trabajo humano: `procesos_fase2` se
actualiza fila por fila (nunca delete+insert, que por el `on delete cascade` se
llevaría por delante las asignaciones ya confirmadas) y de `procesos_validadores`
solo se recalculan las filas `auto`.

    python scripts/cargar-validacion.py            # genera el SQL y lo aplica
    python scripts/cargar-validacion.py --solo-sql # solo lo genera, para revisarlo

Requiere: node (para leer los .js del manual) y SUPABASE_ACCESS_TOKEN en el
entorno, en .env.local o en .env.

A diferencia de scripts/cargar-informe.py, que solo escribe y usa la CLI de
Supabase, este guion necesita LEER el censo para poder emparejar. Usa la API de
gestión para las dos mitades en vez de mezclar dos mecanismos.
"""
from __future__ import annotations

import io
import json
import os
import re
import subprocess
import sys
import unicodedata
import urllib.request
from pathlib import Path

# La consola de Windows va en cp1252 y este guion imprime «≥» y «·».
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

RAIZ = Path(__file__).resolve().parent.parent
SCRATCH = Path(os.environ.get("TEMP", "/tmp")) / "rower-validacion"
SCRATCH.mkdir(parents=True, exist_ok=True)
PROYECTO = "kmhwqybqrcjhjeywjgxj"

# Umbrales del emparejador, calibrados a mano contra los 182 procesos:
#   ≥ FIABLE  → la propuesta casi siempre es correcta (66 % de los procesos)
#   ≥ REVISAR → hay un candidato razonable que un humano debe confirmar (27 %)
#   por debajo → no se propone nada; se asigna a mano en el panel
FIABLE = 0.80
REVISAR = 0.50

# Un cargo con más gente que esto no es dueño de un proceso, es una población
# (72 asesores de ventas, 28 cajeros). Si el emparejador cae ahí es que el
# dueño del mapa está mal escrito: mejor no proponer nada que proponer 72.
MAX_PERSONAS_POR_CARGO = 25


# ---------------------------------------------------------------- utilidades
def sql_txt(v) -> str:
    """Literal SQL. None → NULL; el resto, texto con las comillas escapadas."""
    if v is None or (isinstance(v, str) and not v.strip()):
        return "NULL"
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, (int, float)):
        return str(v)
    if isinstance(v, (list, dict)):
        return "'" + json.dumps(v, ensure_ascii=False).replace("'", "''") + "'::jsonb"
    return "'" + str(v).replace("'", "''") + "'"


def token_supabase() -> str:
    tok = os.environ.get("SUPABASE_ACCESS_TOKEN", "").strip()
    if tok:
        return tok
    for nombre in (".env.local", ".env"):
        env = RAIZ / nombre
        if env.exists():
            m = re.search(r"^SUPABASE_ACCESS_TOKEN=(.+)$", env.read_text(encoding="utf-8"), re.M)
            if m:
                return m.group(1).strip()
    sys.exit("Falta SUPABASE_ACCESS_TOKEN (ponlo en el entorno, en .env.local o en .env).")


def consultar(sql: str, token: str):
    """Ejecuta SQL contra el proyecto y devuelve las filas como lista de dicts."""
    peticion = urllib.request.Request(
        f"https://api.supabase.com/v1/projects/{PROYECTO}/database/query",
        data=json.dumps({"query": sql}).encode("utf-8"),
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(peticion) as r:
        cuerpo = r.read().decode("utf-8")
    datos = json.loads(cuerpo)
    if isinstance(datos, dict) and datos.get("message"):
        sys.exit(f"Supabase rechazó la consulta:\n{datos['message']}")
    return datos


# -------------------------------------------------------------- 1. el manual
def leer_procesos() -> list[dict]:
    extractor = Path(__file__).parent / "_extraer_fase2.js"
    salida = SCRATCH / "fase2.json"
    r = subprocess.run(
        ["node", str(extractor), str(salida), str(RAIZ)],
        capture_output=True, text=True, encoding="utf-8",
    )
    if r.returncode != 0:
        sys.exit(f"El extractor de Node falló:\n{r.stderr}")
    print("  manual de Fase 2:", r.stdout.strip())
    return json.loads(salida.read_text(encoding="utf-8"))["procesos"]


# ---------------------------------------------------------- 2. el emparejador
# El mapa v18 y el censo nombran los cargos en dos vocabularios distintos: el
# manual usa la denominación patrón V4 («Gerente de Operaciones y Logística») y
# el censo la original del Excel de nómina, abreviada y en mayúscula («GRTE DE
# OPE. Y EXC LOGISTICA»). Estas equivalencias son el puente mientras no se
# cargue Estructura_Patron_Cargos_Rower_V4.xlsx, que trae el mapeo explícito.
ABREVIATURAS = [
    (r"\bGRTE\b", "GERENTE"), (r"\bGET\b", "GERENTE"), (r"\bGTE\b", "GERENTE"),
    (r"\bCOORD\b", "COORDINADOR"), (r"\bASIST\b", "ASISTENTE"),
    (r"\bOPE\b", "OPERACIONES"), (r"\bEXC\b", "EXCELENCIA"),
    (r"\bADMON\b", "ADMINISTRACION"), (r"\bMKT\b", "MARKETING"),
    (r"\bRRHH\b", "RECURSOS HUMANOS"), (r"\bSIST\b", "SISTEMAS"),
    (r"\bCONTAB\b", "CONTABILIDAD"),
    # Sinónimos reales del negocio, no abreviaturas.
    (r"\bDETAL\b", "RETAIL"), (r"\bTECNOLOGIA\b", "SISTEMAS"),
    (r"\bE COMMERCE\b", "WEB"), (r"\bECOMMERCE\b", "WEB"),
    (r"\bCOMERCIAL\b", "VENTAS"), (r"\bTALENTO HUMANO\b", "RECURSOS HUMANOS"),
    (r"\bSUB GERENTE\b", "SUBGERENTE"),
    # Artefacto conocido de la sustitución mal hecha en el mapa v18.
    (r"\bPROYECTOSS\b", "PROYECTOS"),
]
VACIAS = {"DE", "DEL", "LA", "EL", "LOS", "LAS", "Y", "E", "A", "EN", "POR",
          "PAIS", "CANAL", "SR", "JR", "SENIOR", "JUNIOR", "1", "2", "3", "4"}
COLEGIADO = re.compile(r"JUNTA|COMIT|DIRECTORIO|ACCIONISTAS", re.I)

# Rango del cargo, de mayor a menor. Sirve para no cruzar niveles: sin esto,
# «Supervisor(a) de Bodega / Despacho» casa con «AYUDANTE DE BODEGA» solo
# porque comparten la palabra «bodega», y el proceso acaba propuesto a 22
# ayudantes en vez de a quien lo supervisa.
RANGOS = ["DIRECTOR", "COUNTRY MANAGER", "GERENTE", "JEFE", "COORDINADOR",
          "SUPERVISOR", "PLANIFICADOR", "ESPECIALISTA", "ANALISTA", "TECNICO",
          "ASESOR", "ASISTENTE", "AUXILIAR", "AYUDANTE", "CAJERO", "VENDEDOR"]
PENALIZACION_RANGO = 0.6


def rango(palabras: list[str]) -> str | None:
    for r in RANGOS:
        if all(p in palabras for p in r.split()):
            return r
    return None


def normalizar(s: str) -> list[str]:
    """Cargo → lista de palabras significativas, comparable entre vocabularios."""
    t = unicodedata.normalize("NFD", s or "")
    t = "".join(c for c in t if unicodedata.category(c) != "Mn").upper()
    t = re.sub(r"\([^)]*\)", " ", t)          # (a), (PA), (País), (por país)…
    t = re.sub(r"[^A-Z0-9\s/]", " ", t)
    for patron, valor in ABREVIATURAS:
        t = re.sub(patron, valor, t)
    return [p for p in t.replace("/", " ").split() if p and p not in VACIAS]


def parecido(a: list[str], b: list[str]) -> float:
    """Jaccard con un premio a que el más corto quede cubierto entero.

    Sin el segundo término, «Gerente de Tienda» contra «GERENTE DE TIENDA
    CENTRO COMERCIAL SAMBIL» puntúa bajo solo por ser más específico el censo.
    """
    A, B = set(a), set(b)
    if not A or not B:
        return 0.0
    comunes = len(A & B)
    jaccard = comunes / len(A | B)
    cobertura = comunes / min(len(A), len(B))
    puntos = 0.6 * jaccard + 0.4 * cobertura
    ra, rb = rango(a), rango(b)
    if ra and rb and ra != rb:
        puntos *= PENALIZACION_RANGO
    return puntos


def variantes(texto: str) -> list[str]:
    """«Gerente Regional Comercial / Retail» son dos cargos alternativos, no uno.

    Devuelve la cadena entera y cada rama de la barra, además de la rama
    recompuesta con el prefijo («Gerente Regional Retail»), que es como suele
    llamarse en el censo.
    """
    base = re.sub(r"\([^)]*\)", " ", texto).strip()
    salida = [base]
    if "/" in base:
        ramas = [r.strip() for r in base.split("/") if r.strip()]
        salida.extend(ramas)
        if len(ramas) == 2:
            prefijo = ramas[0].split()
            if len(prefijo) > 1:
                salida.append(" ".join(prefijo[:-1]) + " " + ramas[1])
    return salida


def menciones(dueno: str) -> list[str]:
    """Un dueño puede traer varios cargos separados por punto y coma."""
    return [m.strip() for m in (dueno or "").split(";") if len(m.strip()) > 3]


def emparejar(dueno: str, cargos: list[dict]) -> tuple[str | None, float]:
    """Mejor cargo del censo para ese dueño, con su puntuación."""
    mejor_cargo, mejor_puntos = None, 0.0
    for mencion in menciones(dueno):
        if COLEGIADO.search(mencion):
            continue                       # un órgano colegiado no es una persona
        for variante in variantes(mencion):
            palabras = normalizar(variante)
            if not palabras:
                continue
            for c in cargos:
                if c["personas"] > MAX_PERSONAS_POR_CARGO:
                    continue
                p = parecido(palabras, c["palabras"])
                if p > mejor_puntos:
                    mejor_cargo, mejor_puntos = c["cargo"], p
    return mejor_cargo, mejor_puntos


# ------------------------------------------------------------------ 3. el SQL
def construir_sql(procesos: list[dict], propuestas: list[dict]) -> str:
    partes: list[str] = ["begin;\n"]

    # procesos_fase2: upsert fila por fila. NUNCA delete+insert — el
    # `on delete cascade` de procesos_validadores se llevaría las asignaciones
    # ya confirmadas por un humano.
    columnas = ["codigo", "macro", "macro_nombre", "nombre", "madurez",
                "dueno_texto", "participantes", "tiene_contenido", "contenido", "orden"]
    valores = ",\n  ".join(
        "(" + ", ".join(sql_txt(p.get(c)) for c in columnas) + ")" for p in procesos
    )
    partes.append(
        f"insert into public.procesos_fase2 ({', '.join(columnas)}) values\n  {valores}\n"
        "on conflict (codigo) do update set\n"
        "  macro = excluded.macro, macro_nombre = excluded.macro_nombre,\n"
        "  nombre = excluded.nombre, madurez = excluded.madurez,\n"
        "  dueno_texto = excluded.dueno_texto, participantes = excluded.participantes,\n"
        "  tiene_contenido = excluded.tiene_contenido, contenido = excluded.contenido,\n"
        "  orden = excluded.orden, actualizado_en = now();\n"
    )
    codigos = ", ".join(sql_txt(p["codigo"]) for p in procesos)
    partes.append(
        f"delete from public.procesos_fase2 where codigo not in ({codigos});\n"
    )

    # procesos_validadores: solo se recalculan las propuestas automáticas.
    partes.append("delete from public.procesos_validadores where origen = 'auto';\n")
    if propuestas:
        filas = ",\n  ".join(
            "(" + ", ".join([
                sql_txt(p["proceso"]), sql_txt(p["cargo"]),
                str(round(p["confianza"], 3)),
            ]) + ")" for p in propuestas
        )
        # La persona se resuelve en SQL para no traer 436 uuid al guion: por
        # cada (proceso, cargo) entran todas las personas ACTIVAS con ese cargo.
        #
        # Y quien valida es un GERENTE (decisión del 13-sep-2026). Alguien lo es
        # si tiene gente a cargo en el censo —el dato manda sobre el título— o si
        # su cargo lo dice. Cuando el dueño del proceso resulta ser personal de
        # línea (un asesor de ventas web, un ayudante de bodega), la propuesta
        # sube a SU gerente en vez de repartirse entre los 22 de ese cargo; el
        # `unique (proceso, persona_id)` colapsa solo los repetidos.
        partes.append(
            "with propuesta(proceso, cargo, confianza) as (values\n  " + filas + "\n),\n"
            "candidato as (\n"
            "  select pr.proceso, pr.cargo, pr.confianza, pe.id as persona_id, pe.gerente_id,\n"
            "         (exists (select 1 from public.personal r\n"
            "                   where r.gerente_id = pe.id and r.activo)\n"
            "          or pe.cargo ~* '(GERENTE|GRTE|DIRECTOR|JEFE|COORDINADOR|COORD\\.|"
            "SUPERVISOR|MANAGER|ENCARGADO)') as es_gerente\n"
            "    from propuesta pr\n"
            "    join public.personal pe on pe.cargo = pr.cargo and pe.activo\n"
            "   where exists (select 1 from public.procesos_fase2 f where f.codigo = pr.proceso)\n"
            ")\n"
            "insert into public.procesos_validadores\n"
            "  (proceso, persona_id, origen, confianza, cargo_sugerido)\n"
            "select proceso,\n"
            "       case when es_gerente then persona_id else gerente_id end,\n"
            "       'auto', confianza, cargo\n"
            "  from candidato\n"
            " where (case when es_gerente then persona_id else gerente_id end) is not null\n"
            "on conflict (proceso, persona_id) do nothing;\n"
        )
    partes.append("\ncommit;\n")
    return "".join(partes)


# --------------------------------------------------------------------- main
def main() -> None:
    token = token_supabase()

    print("Leyendo el repo…")
    procesos = leer_procesos()

    print("Leyendo el censo…")
    cargos = consultar(
        "select cargo, count(*) as personas from public.personal "
        "where activo and cargo is not null group by cargo;", token)
    for c in cargos:
        c["personas"] = int(c["personas"])
        c["palabras"] = normalizar(c["cargo"])
    print(f"  censo: {len(cargos)} cargos distintos")

    print("Emparejando dueños…")
    propuestas, fiables, a_revisar, sin_match, colegiados = [], 0, 0, 0, 0
    for p in procesos:
        dueno = p.get("dueno_texto") or ""
        if dueno and all(COLEGIADO.search(m) for m in menciones(dueno) or [""]):
            colegiados += 1
            continue
        cargo, puntos = emparejar(dueno, cargos)
        if cargo and puntos >= REVISAR:
            propuestas.append({"proceso": p["codigo"], "cargo": cargo, "confianza": puntos})
            if puntos >= FIABLE:
                fiables += 1
            else:
                a_revisar += 1
        else:
            sin_match += 1

    redactados = {p["codigo"] for p in procesos if p["tiene_contenido"]}
    prop_redactados = sum(1 for p in propuestas if p["proceso"] in redactados)
    print(f"  fiables (≥{FIABLE}): {fiables} · a revisar (≥{REVISAR}): {a_revisar} · "
          f"colegiados: {colegiados} · sin match: {sin_match}")
    print(f"  de los {len(redactados)} procesos ya redactados, {prop_redactados} "
          f"traen propuesta de validador")

    sql = construir_sql(procesos, propuestas)
    destino = SCRATCH / "carga-validacion.sql"
    destino.write_text(sql, encoding="utf-8")
    print(f"\nSQL generado: {destino} ({len(sql):,} chars)")

    if "--solo-sql" in sys.argv:
        return

    print("Aplicando…")
    consultar(sql, token)
    resumen = consultar(
        "select (select count(*) from public.procesos_fase2) as procesos,"
        " (select count(*) from public.procesos_validadores where origen='auto') as propuestas,"
        " (select count(*) from public.procesos_validadores where origen<>'auto') as confirmados,"
        " (select count(distinct persona_id) from public.procesos_validadores) as personas;",
        token)[0]
    print(f"Carga aplicada: {resumen['procesos']} procesos · "
          f"{resumen['propuestas']} propuestas · {resumen['confirmados']} confirmadas · "
          f"{resumen['personas']} personas implicadas")


if __name__ == "__main__":
    main()
