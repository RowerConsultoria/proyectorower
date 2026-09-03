# -*- coding: utf-8 -*-
"""Proyecta el informe del repo a las tablas de la sección 12 del esquema.

El repo manda: este guion NO inventa dato, solo traduce a filas lo que ya está
en el informe y en el mapa de procesos. Volver a correrlo es seguro (borra y
recarga cada tabla dentro de una transacción).

    python scripts/cargar-informe.py            # genera el SQL y lo aplica
    python scripts/cargar-informe.py --solo-sql # solo lo genera, para revisarlo

Requiere: node (para leer los .js del mapa), la CLI de Supabase vía npx y
SUPABASE_ACCESS_TOKEN en el entorno o en .env.local.
"""
from __future__ import annotations

import io
import json
import os
import re
import subprocess
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
SCRATCH = Path(os.environ.get("TEMP", "/tmp")) / "rower-carga"
SCRATCH.mkdir(parents=True, exist_ok=True)


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
        # Las listas del organigrama (ámbitos, pares, referencias) van a jsonb.
        return "'" + json.dumps(v, ensure_ascii=False).replace("'", "''") + "'::jsonb"
    return "'" + str(v).replace("'", "''") + "'"


def con_orden(filas: list[dict]) -> list[dict]:
    """Numera por posición las tablas del informe que no traen orden propio.
    Vienen en orden de documento, así que la posición ES el orden."""
    return [{**f, "orden": f.get("orden", i + 1)} for i, f in enumerate(filas)]


def insertar(tabla: str, columnas: list[str], filas: list[dict]) -> str:
    """Genera `delete` + `insert` para una tabla. Sin filas, no toca nada."""
    if not filas:
        return f"-- {tabla}: sin filas en el insumo, se deja como está\n"
    valores = ",\n  ".join(
        "(" + ", ".join(sql_txt(f.get(c)) for c in columnas) + ")" for f in filas
    )
    return (
        f"delete from public.{tabla};\n"
        f"insert into public.{tabla} ({', '.join(columnas)}) values\n  {valores};\n"
    )


def token_supabase() -> str:
    tok = os.environ.get("SUPABASE_ACCESS_TOKEN", "").strip()
    if tok:
        return tok
    env = RAIZ / ".env.local"
    if env.exists():
        m = re.search(r"^SUPABASE_ACCESS_TOKEN=(.+)$", env.read_text(encoding="utf-8"), re.M)
        if m:
            return m.group(1).strip()
    sys.exit("Falta SUPABASE_ACCESS_TOKEN (ponlo en el entorno o en .env.local).")


# ------------------------------------------------------- 1. mapa de procesos
def leer_mapa() -> dict:
    """Ejecuta el extractor de Node sobre los dos archivos del mapa."""
    extractor = Path(__file__).parent / "_extraer_mapa.js"
    salida = SCRATCH / "mapa-datos.json"
    r = subprocess.run(
        ["node", str(extractor), str(salida), str(RAIZ)],
        capture_output=True, text=True, encoding="utf-8",
    )
    if r.returncode != 0:
        sys.exit(f"El extractor de Node falló:\n{r.stderr}")
    print("  mapa de procesos:", r.stdout.strip().replace("\n", " "))
    return json.loads(salida.read_text(encoding="utf-8"))


# --------------------------------------------------- 2. tablas del informe
def leer_ia() -> dict:
    """Extrae la torre de arquitectura de IA y las reglas del prototipo."""
    extractor = Path(__file__).parent / "_extraer_ia.js"
    salida = SCRATCH / "ia-datos.json"
    r = subprocess.run(
        ["node", str(extractor), str(salida), str(RAIZ)],
        capture_output=True, text=True, encoding="utf-8",
    )
    if r.returncode != 0:
        sys.exit(f"El extractor de la torre falló:\n{r.stderr}")
    print("  torre y prototipo:", r.stdout.strip().replace("\n", " "))
    return json.loads(salida.read_text(encoding="utf-8"))


def leer_organigrama() -> dict:
    """Extrae el organigrama en sus tres capas. Si el extractor no está, avisa
    y sigue: el resto de la carga no depende de él."""
    extractor = Path(__file__).parent / "_extraer_organigrama.js"
    if not extractor.exists():
        print("  organigrama: falta scripts/_extraer_organigrama.js — se omite")
        return {}
    salida = SCRATCH / "organigrama-datos.json"
    r = subprocess.run(
        ["node", str(extractor), str(salida), str(RAIZ)],
        capture_output=True, text=True, encoding="utf-8",
    )
    if r.returncode != 0:
        sys.exit(f"El extractor del organigrama falló:\n{r.stderr}")
    print("  organigrama:", r.stdout.strip().replace("\n", " "))
    return json.loads(salida.read_text(encoding="utf-8"))


def leer_informe() -> dict:
    """Extrae las tablas del informe maestro (68 tablas HTML) a JSON."""
    destino = RAIZ / "scripts" / "datos" / "informe-datos.json"
    r = subprocess.run(
        [sys.executable, str(Path(__file__).parent / "_extraer_informe.py"), str(destino)],
        capture_output=True, text=True, encoding="utf-8",
    )
    if r.returncode != 0:
        print(r.stderr[-2000:], file=sys.stderr)
        sys.exit("El extractor del informe falló.")
    inf = json.loads(destino.read_text(encoding="utf-8"))
    print("  tablas del informe:", ", ".join(
        f"{k} {len(v)}" for k, v in inf.items() if isinstance(v, list) and k != "avisos"))
    if inf.get("avisos"):
        print(f"  ({len(inf['avisos'])} avisos del extractor; revisar {destino.name})")
    return inf


# ------------------------------------------------------------------- armado
def emparejar_s9(mapa: dict, filas: list[dict]) -> list[dict]:
    """Empareja los procedimientos de s9 con su proceso por nombre literal."""
    if not filas:
        return []
    normaliza = lambda s: re.sub(r"\s+", " ", (s or "")).strip().lower()
    por_nombre = {normaliza(p["nombre"]): p["id"]
                  for p in mapa["procesos"] if p["macro_id"] == "s9"}
    salida, huerfanos = [], []
    for f in filas:
        pid = por_nombre.get(normaliza(f.get("proceso_nombre")))
        if not pid:
            huerfanos.append(f.get("proceso_nombre"))
            continue
        salida.append({
            "id": f"{pid}.{f['orden']}",
            "proceso_id": pid,
            "orden": f["orden"],
            "texto": f["texto"],
            # El informe no marca los sugeridos en la 6.5 (lo dice su propia
            # nota metodológica): no se afirma lo que no está en la fuente.
            "naturaleza": ("sin_determinar" if f.get("sugerido") is None
                           else "propuesta_ucab" if f["sugerido"] else "levantado"),
            "fuente": "informe_s9",
        })
    if huerfanos:
        print(f"  AVISO: {len(huerfanos)} procedimientos de s9 sin proceso que "
              f"los reciba, se omiten: {sorted(set(huerfanos))}")
    print(f"  procedimientos de s9 (solo en el informe): {len(salida)}")
    return salida


def construir_sql(mapa: dict, inf: dict, ia: dict, org: dict) -> str:
    p = ["begin;\n"]

    # --- el árbol y sus anexos (borrado de hijos a padres, por las FK)
    p.append("delete from public.procedimientos;\ndelete from public.procesos;\n"
             "delete from public.macroproceso_sistemas;\ndelete from public.fricciones;\n"
             "delete from public.practicas_buenas;\ndelete from public.macroprocesos;\n")
    p.append(insertar("macroprocesos",
                      ["id", "categoria", "nombre", "nombre_corto", "icono", "orden"],
                      mapa["macroprocesos"]).replace("delete from public.macroprocesos;\n", ""))
    p.append(insertar("procesos", ["id", "macro_id", "orden", "nombre"],
                      mapa["procesos"]).replace("delete from public.procesos;\n", ""))

    procs = list(mapa["procedimientos"])
    # Los procedimientos de s9 Mejora Continua solo los lista el informe: el
    # .js trae sus 4 procesos con pr:[]. Van marcados con fuente='informe_s9'
    # para que el conteo se pueda hacer con o sin ellos (244 del mapa v7).
    procs += emparejar_s9(mapa, inf.get("procedimientos_s9", []))
    p.append(insertar("procedimientos",
                      ["id", "proceso_id", "orden", "texto", "naturaleza", "fuente"],
                      procs).replace("delete from public.procedimientos;\n", ""))

    p.append(insertar("fricciones", ["macro_id", "orden", "texto", "referencia"],
                      mapa["fricciones"]).replace("delete from public.fricciones;\n", ""))
    p.append(insertar("practicas_buenas", ["macro_id", "orden", "texto", "referencia"],
                      mapa["practicas"]).replace("delete from public.practicas_buenas;\n", ""))
    p.append(insertar("macroproceso_sistemas", ["macro_id", "sistema"],
                      mapa["macroproceso_sistemas"]).replace(
                          "delete from public.macroproceso_sistemas;\n", ""))
    p.append(insertar("nodos_externos", ["id", "nombre", "icono"], mapa["externos"]))
    p.append(insertar("cruces_procesos", ["orden", "origen", "destino", "tipo", "etiqueta"],
                      mapa["cruces"]))

    # --- las tablas del informe
    hallazgos = inf.get("hallazgos", [])
    if hallazgos:
        p.append("delete from public.hallazgo_factores;\n")
        p.append(insertar("hallazgos",
                          ["orden", "titulo", "criticidad", "seccion_origen", "implicacion"],
                          [{**h, "titulo": h["titulo_o_texto"]} for h in hallazgos]))
        factores = [
            {"orden": h["orden"], "factor": f}
            for h in hallazgos for f in (h.get("factores") or [])
        ]
        if factores:
            vals = ",\n  ".join(
                f"((select id from public.hallazgos where orden = {f['orden']}), {sql_txt(f['factor'])})"
                for f in factores
            )
            p.append("insert into public.hallazgo_factores (hallazgo_id, factor) values\n  "
                     + vals + "\non conflict do nothing;\n")

    p.append(insertar("dependencias_criticas",
                      ["orden", "persona_o_rol", "dependencia", "impacto", "mitigacion",
                       "severidad", "seccion_origen"],
                      con_orden(inf.get("dependencias_criticas", []))))
    p.append(insertar("brechas_rrhh",
                      ["orden", "proceso_rrhh", "severidad", "hallazgo", "exigencia"],
                      con_orden([{**b, "exigencia": b.get("exigencia_o_requerido")}
                                 for b in inf.get("brechas_rrhh", [])])))
    p.append(insertar("procesos_sin_sistema",
                      ["orden", "proceso", "bloque", "naturaleza", "detalle", "area_o_pais"],
                      con_orden(inf.get("procesos_sin_sistema", []))))
    p.append(insertar("sistemas_por_pais", ["sistema", "pais", "estado", "lectura"],
                      inf.get("sistemas_por_pais", [])))
    p.append(insertar("vicios_flujo",
                      ["flujo_codigo", "flujo_nombre", "orden_vicio", "texto"],
                      [{**v, "texto": v["texto_vicio"]}
                       for v in inf.get("vicios_flujos", [])]))
    p.append(insertar("decisiones_junta",
                      ["orden", "ambito", "grupo", "decision", "seccion_origen"],
                      inf.get("decisiones_junta", [])))
    p.append(insertar("quick_wins",
                      ["orden", "nombre", "que_es", "por_que", "que_resolver_antes",
                       "como_se_mide"],
                      [{**q, "orden": i + 1} for i, q in enumerate(inf.get("quick_wins", []))]))

    # --- la estructura real del informe. NO se toca `secciones`: esa es la
    # tabla de seguimiento editorial del panel (con su propio vocabulario de
    # estados y el responsable de cada sección), y re-indexarla a la
    # numeración vigente es decisión del equipo, no de este guion.
    p.append(insertar("informe_estructura",
                      ["id", "numero", "titulo", "nivel", "orden_documento", "rotulo"],
                      [{**e, "rotulo": e.get("estado_rotulado")}
                       for e in inf.get("estructura_informe", [])]))

    # --- sección 13: la torre y el prototipo (todo PROPUESTA, no hallazgo)
    p.append("delete from public.ia_nivel_hace;\ndelete from public.ia_agentes;\n")
    p.append(insertar("ia_niveles", ["id", "n", "nombre", "capa", "lema", "que", "no_hace"],
                      ia.get("ia_niveles", [])))
    p.append(insertar("ia_nivel_hace", ["nivel_id", "orden", "texto"],
                      ia.get("ia_nivel_hace", []))
             .replace("delete from public.ia_nivel_hace;\n", ""))
    p.append(insertar("ia_agentes",
                      ["nivel_id", "orden", "nombre", "autonomia", "autonomia_verbo", "que"],
                      ia.get("ia_agentes", []))
             .replace("delete from public.ia_agentes;\n", ""))
    p.append(insertar("ia_vias", ["clave", "rotulo", "detalle"], ia.get("ia_vias", [])))
    p.append(insertar("ia_raices",
                      ["id", "orden", "nombre", "dato", "via", "via_rotulo", "cadencia",
                       "dueno", "nivel", "hoy", "rompe", "grado", "ritmo"],
                      ia.get("ia_raices", [])))
    p.append(insertar("ia_bajadas", ["id", "orden", "desde", "hacia", "que", "nota"],
                      ia.get("ia_bajadas", [])))
    p.append(insertar("ia_cedazo_criterios", ["orden", "texto"],
                      ia.get("ia_cedazo_criterios", [])))
    p.append(insertar("proto_reglas",
                      ["clave", "orden", "valor", "unidad", "dueno", "desde", "version"],
                      ia.get("proto_reglas", [])))
    p.append(insertar("proto_escalera", ["n", "clave", "texto"], ia.get("proto_escalera", [])))
    p.append(insertar("proto_acciones",
                      ["clave", "orden", "modulo", "agente", "nombre", "dispara", "cruza",
                       "eje_perimetro", "eje_reversibilidad", "eje_radio", "eje_dinero",
                       "eje_reloj"],
                      ia.get("proto_acciones", [])))

    # --- sección 14: el organigrama en sus tres capas
    if org:
        p.append("delete from public.org_flujo_pares;\n")
        p.append(insertar("org_personas",
                          ["id", "id_origen", "nombre", "rol", "tipo", "tipo_etiqueta",
                           "capa", "padre_id", "meta", "advertencia", "nota", "delta",
                           "delta_etiqueta", "bloque", "entidad_id", "departamento_id",
                           "reside_en", "equipo", "alcance"],
                          org.get("org_personas", [])))
        p.append(insertar("org_entidades",
                          ["id", "nombre", "pais", "bandera", "subtitulo", "tipo",
                           "headcount", "socio", "nota", "notas"],
                          org.get("org_entidades", [])))
        p.append(insertar("org_departamentos",
                          ["id", "id_origen", "nombre", "entidad_id", "pais", "headcount"],
                          org.get("org_departamentos", [])))
        p.append(insertar("org_flujos", ["id", "nombre", "descripcion", "color"],
                          org.get("org_flujos", [])))
        p.append(insertar("org_flujo_pares", ["flujo_id", "orden", "origen", "destino"],
                          org.get("org_flujo_pares", []))
                 .replace("delete from public.org_flujo_pares;\n", ""))
        p.append(insertar("org_alertas", ["id", "orden", "texto", "nodo_o_ambito"],
                          org.get("org_alertas", [])))
        p.append(insertar("org_solapes",
                          ["id", "orden", "titulo", "ambitos", "pares", "nota"],
                          org.get("org_solapes", [])))
        p.append(insertar("org_evidencias", ["codigo", "citas", "referencias"],
                          org.get("org_evidencias", [])))
        p.append(insertar("org_agregados",
                          ["id", "padre_id", "bloque", "entidad_id", "departamento_id",
                           "texto"],
                          org.get("org_agregados", [])))
        p.append(insertar("org_comites", ["id", "nombre", "composicion"],
                          org.get("gobierno_comites", [])))
        p.append(insertar("org_deltas_catalogo",
                          ["clave", "badge", "nombre", "descripcion"],
                          org.get("deltas_catalogo", [])))
        p.append(insertar("org_mismo_actor", ["nombre", "ids"],
                          org.get("mismo_actor", [])))
        p.append(insertar("org_escenas",
                          ["id", "orden", "nombre", "elemento", "abre_flujos"],
                          org.get("escenas", [])))
        p.append(insertar("estructura_propuesta",
                          ["clave", "orden", "tipo", "titulo", "etiqueta", "nota"],
                          org.get("estructura_propuesta", [])))

    p.append(catalogo(mapa, inf, ia, org))
    p.append("\ncommit;\n")
    return "".join(p)


def catalogo(mapa: dict, inf: dict, ia: dict, org: dict) -> str:
    """La guía de la base: qué hay dónde y qué no confundir."""
    fuentes = {"inf": inf, "ia": ia, "org": org}
    n = lambda k, d=None: len(fuentes.get(d, mapa).get(k, []))
    filas = [
        dict(tabla="v_cuellos_de_botella", filas_aprox=None,
             descripcion="Vista consolidada: fricciones de proceso + hallazgos de criticidad alta + brechas críticas de RRHH + vicios de flujo + procesos sin sistema.",
             cuando_usar="EMPIEZA AQUÍ para cuellos de botella, fricciones, atascos, demoras o dolores de proceso.",
             advertencia="No busques esto en `fragmentos`: ahí solo hay diálogo crudo de entrevistas, y da falsos positivos."),
        dict(tabla="fricciones", filas_aprox=n("fricciones"),
             descripcion="Las fricciones documentadas por macroproceso, cada una con su referencia de origen.",
             cuando_usar="La respuesta directa a «cuellos de botella por proceso».",
             advertencia="Solo 9 de los 22 macroprocesos tienen fricción registrada. Ausencia de dato NO es ausencia de fricción."),
        dict(tabla="practicas_buenas", filas_aprox=n("practicas"),
             descripcion="Buenas prácticas replicables detectadas (sección 6.4).",
             cuando_usar="Qué funciona bien y conviene escalar.",
             advertencia="Aquí vive el «control sano» (autorización comercial previa a bodega) que la búsqueda de texto confundía con un cuello de botella."),
        dict(tabla="macroprocesos", filas_aprox=n("macroprocesos"),
             descripcion="Nivel 1 del mapa: 22 macroprocesos en tres categorías.",
             cuando_usar="Cualquier pregunta por la cadena de valor.", advertencia=None),
        dict(tabla="procesos", filas_aprox=n("procesos"),
             descripcion="Nivel 2 del mapa: 104 procesos.", cuando_usar=None, advertencia=None),
        dict(tabla="procedimientos", filas_aprox=n("procedimientos"),
             descripcion="Nivel 3 del mapa: 244 procedimientos del mapa v7, más los de s9 Mejora Continua que solo lista el informe.",
             cuando_usar="Detalle operativo de un proceso.",
             advertencia="Dos avisos. (1) `naturaleza` separa lo LEVANTADO en el diagnóstico de lo PROPUESTO por UCAB: no los sumes como si fueran lo mismo. (2) El informe cita 260 procedimientos y el mapa v7 tiene 244; la diferencia son los 15 de s9 más 1 duplicado ya eliminado. Cifra EN CONCILIACIÓN con Jesús Planas."),
        dict(tabla="hallazgos", filas_aprox=n("hallazgos", "inf"),
             descripcion="Los 21 hallazgos consolidados por criticidad de la sección 11.2.",
             cuando_usar="«¿Qué encontró el diagnóstico?» y cualquier pregunta por criticidad o riesgo.",
             advertencia=None),
        dict(tabla="dependencias_criticas", filas_aprox=n("dependencias_criticas", "inf"),
             descripcion="Las 12 dependencias críticas de personas individuales (4.5).",
             cuando_usar="Riesgo de continuidad y de persona única.",
             advertencia="Es uno de los cuatro números que la Junta debe retener: ~400 personas · 12 dependencias críticas · 22/104/260 procesos · 52 proyectos con 3 PM."),
        dict(tabla="brechas_rrhh", filas_aprox=n("brechas_rrhh", "inf"),
             descripcion="Brechas por proceso de Recursos Humanos con su severidad (5.3).",
             cuando_usar="Preguntas de talento y función de RRHH.", advertencia=None),
        dict(tabla="procesos_sin_sistema", filas_aprox=n("procesos_sin_sistema", "inf"),
             descripcion="Inventario de procesos manuales, en Excel o en herramientas personales (8.5).",
             cuando_usar="Dónde falta sistema y dónde hay islas de IA individual.", advertencia=None),
        dict(tabla="vicios_flujo", filas_aprox=n("vicios_flujos", "inf"),
             descripcion="Vicios detectados en los flujos operativos F1-F8 (4.7), uno por fila.",
             cuando_usar="Fricciones que cruzan varias áreas.", advertencia=None),
        dict(tabla="decisiones_junta", filas_aprox=n("decisiones_junta", "inf"),
             descripcion="Las decisiones que el informe eleva a la Junta Directiva.",
             cuando_usar="«¿Qué se nos pide decidir?»", advertencia=None),
        dict(tabla="quick_wins", filas_aprox=n("quick_wins", "inf"),
             descripcion="Los dos quick wins de la sección 10.7.",
             cuando_usar="Por dónde empezar sin esperar a la arquitectura completa.",
             advertencia="Es PROPUESTA de UCAB, no un hallazgo del diagnóstico."),
        dict(tabla="informe_estructura", filas_aprox=n("estructura_informe", "inf"),
             descripcion="Estructura real y vigente del informe: sus 16 secciones y 66 subpuntos en orden de lectura, con el rótulo de cada uno.",
             cuando_usar="«¿Qué contiene el informe?» y para citar la sección correcta.",
             advertencia="El cuerpo termina en la sección 12: NO existen s13 ni s14, y los anexos conservan los ids fósiles s15/s16/s17. Las minutas y entrevistas del corpus citan numeraciones ANTIGUAS: son fósiles, manda esta tabla."),
        dict(tabla="secciones", filas_aprox=17,
             descripcion="Seguimiento editorial interno: estado de trabajo y responsable por sección del informe.",
             cuando_usar="Sirve para saber quién lleva cada sección, no qué dice el informe.",
             advertencia="NO la uses para saber qué contiene el informe: sus ids y títulos quedaron en una numeración de julio, dos generaciones atrás (dice s9 = «Síntesis de hallazgos», s11 = «Auditoría Lark y Odoo»). Para la estructura real usa `informe_estructura`."),
        dict(tabla="org_personas", filas_aprox=n("org_personas", "org"),
             descripcion="Los nodos del organigrama en sus capas: lo que el papel DECLARA y lo que la operación hace REALMENTE, con la advertencia y el badge de diferencia de cada uno.",
             cuando_usar="Estructura de mando, quién reporta a quién, y sobre todo dónde el organigrama oficial no coincide con la realidad.",
             advertencia="Lo valioso está en `advertencia` y `delta`: esa diferencia no aparece en ningún organigrama oficial de Kenex. La trazabilidad de lo «de facto» está en `org_evidencias`."),
        dict(tabla="org_evidencias", filas_aprox=n("org_evidencias", "org"),
             descripcion="Las evidencias [E-xx] que sostienen la capa real del organigrama.",
             cuando_usar="Cuando haga falta respaldar una afirmación sobre la estructura real.",
             advertencia="Solo existen aquí: el informe no las contiene."),
        dict(tabla="org_alertas", filas_aprox=n("org_alertas", "org"),
             descripcion="Las alertas del organigrama: concentraciones, vacíos y solapes de mando detectados.",
             cuando_usar="Riesgo organizativo.", advertencia=None),
        dict(tabla="estructura_propuesta", filas_aprox=n("estructura_propuesta", "org"),
             descripcion="La estructura organizativa propuesta en la sección 4.8.",
             cuando_usar="«¿Qué estructura se propone?»",
             advertencia="Es PROPUESTA del equipo consultor, no la estructura vigente. La vigente está en `org_personas` y en `personal`."),
        dict(tabla="ia_raices", filas_aprox=n("ia_raices", "ia"),
             descripcion="Las 12 fuentes de dato de la arquitectura de IA propuesta, con su vía de entrada, cadencia, dueño y —lo más citable— qué se rompe si esa fuente falta.",
             cuando_usar="«¿De dónde saldría el dato?» y «¿qué pasa si falta X?».",
             advertencia="Es PROPUESTA del equipo consultor, no lo que existe hoy. La columna `hoy` sí describe la situación actual."),
        dict(tabla="ia_niveles", filas_aprox=n("ia_niveles", "ia"),
             descripcion="Los 4 niveles de la torre (ingesta · dato certificado · inteligencia · decisión) más el cedazo, con lo que cada piso hace y lo que deliberadamente NO hace.",
             cuando_usar="La arquitectura de IA de la sección 10.",
             advertencia="PROPUESTA. Una arquitectura de IA transversal no existe hoy en la organización."),
        dict(tabla="proto_reglas", filas_aprox=n("proto_reglas", "ia"),
             descripcion="Las 13 reglas de negocio del prototipo, cada una con dueño humano, fecha de vigencia y número de versión.",
             cuando_usar="Ejemplo concreto de «una regla tiene un dueño», que es lo que el informe reclama.",
             advertencia="Es diseño PROPUESTO en el prototipo, no la política vigente de Kenex."),
        dict(tabla="proto_acciones", filas_aprox=n("proto_acciones", "ia"),
             descripcion="Las 11 acciones de agente del prototipo con su gramática de autonomía en cinco ejes (perímetro, reversibilidad, radio, dinero, reloj).",
             cuando_usar="Cómo se acota lo que un agente puede hacer solo.",
             advertencia="Diseño propuesto. Las CIFRAS del prototipo (ventas, existencias, clientes) NO están en esta base a propósito: son inventadas para poder enseñarlo."),
        dict(tabla="personal", filas_aprox=426,
             descripcion="Censo de personal de Kenex con área, cargo, país y jerarquía.",
             cuando_usar="Plantilla, organigrama real, quién reporta a quién.",
             advertencia="Cubre Venezuela, Panamá y Colombia. El grupo opera además en Costa Rica, Guatemala y EE. UU.: esos países no están en el censo."),
        dict(tabla="eventos", filas_aprox=172,
             descripcion="Bitácora cronológica del proyecto: entrevistas, hitos, decisiones, entregables.",
             cuando_usar="«¿Cuándo pasó qué?» y la trazabilidad del proyecto.", advertencia=None),
        dict(tabla="entrevistas", filas_aprox=67,
             descripcion="Las 67 entrevistas del diagnóstico con su diálogo limpio íntegro.",
             cuando_usar="Qué dijo textualmente una persona o un área.",
             advertencia="Material CRUDO y sensible. Es la materia prima, no la conclusión: para conclusiones usa `hallazgos` y `v_cuellos_de_botella`."),
        dict(tabla="fragmentos", filas_aprox=3303,
             descripcion="Las transcripciones troceadas con búsqueda de texto en español (RPC buscar_fragmentos).",
             cuando_usar="Buscar una cita textual concreta en el corpus.",
             advertencia="El 95,6 % de este índice es diálogo crudo de entrevistas y solo el 0,7 % viene del informe. Buscar aquí un hallazgo documentado devuelve conversación, no conclusiones. Usa las tablas de la sección 12."),
        dict(tabla="conocimiento", filas_aprox=35,
             descripcion="Síntesis destilada del corpus, en prosa larga. Dos filas lo resumen TODO: `resumenes` (165 mil caracteres, síntesis documento por documento) y `memoria` (73 mil, hechos destilados). Juntas son ~59 mil tokens.",
             cuando_usar="PARA TODA PREGUNTA DE SÍNTESIS TRANSVERSAL —«desde la óptica de los entrevistados», «por qué este proyecto», una DOFA, las conclusiones sobre talento— empieza leyendo `resumenes` y `memoria` completas. Son ingeribles de una vez y cubren el corpus entero; después ancla cada afirmación en las tablas de la sección 12.",
             advertencia="No intentes sintetizar leyendo `fragmentos`: son 3.300 trozos de diálogo crudo y cualquier muestreo da una conclusión con aire de certeza y base de tres citas. Las claves `informe-fase1`, `arquitectura-ia` y `sistema-prototipo` las genera un guion desde el repo y pueden ir por detrás del informe; se refrescan con scripts/sincronizar-asistente.py."),
    ]
    return insertar("catalogo_datos",
                    ["tabla", "descripcion", "cuando_usar", "advertencia", "filas_aprox"], filas)


# --------------------------------------------------------------------- main
def main() -> None:
    print("Leyendo el repo…")
    mapa = leer_mapa()
    inf = leer_informe()
    ia = leer_ia()
    org = leer_organigrama()

    sql = construir_sql(mapa, inf, ia, org)
    destino = SCRATCH / "carga-informe.sql"
    destino.write_text(sql, encoding="utf-8")
    print(f"\nSQL generado: {destino} ({len(sql):,} chars)")

    if "--solo-sql" in sys.argv:
        return

    os.environ["SUPABASE_ACCESS_TOKEN"] = token_supabase()
    print("Aplicando…")
    r = subprocess.run(
        ["npx", "-y", "supabase", "db", "query", "--linked", "-f", str(destino)],
        capture_output=True, text=True, encoding="utf-8", shell=(os.name == "nt"),
    )
    print(r.stdout[-2000:] if r.stdout else "")
    if r.returncode != 0:
        print(r.stderr[-3000:], file=sys.stderr)
        sys.exit("La carga falló (la transacción se revirtió: nada quedó a medias).")
    print("Carga aplicada.")


if __name__ == "__main__":
    main()
