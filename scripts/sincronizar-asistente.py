# -*- coding: utf-8 -*-
"""Sincroniza el contexto del Asistente IA con el estado real del repositorio.

    python scripts/sincronizar-asistente.py            # genera y sube
    python scripts/sincronizar-asistente.py --seco     # solo genera, no sube

PARA QUÉ. El Asistente IA del admin razona sobre la tabla `conocimiento` de
Supabase, que se llena SOLA con lo que el equipo carga (entrevistas y archivos
vía la Edge Function `indexar`). Pero el informe, la arquitectura de IA y el
prototipo viven en el REPOSITORIO, no en Supabase — así que el asistente no los
conoce a menos que alguien se los cuente. Este guion se los cuenta.

⚠️ HAY QUE VOLVER A CORRERLO tras cada cambio de fondo en el informe, en la
torre o en el prototipo. Si no, la síntesis envejece en silencio — que es peor
que no tenerla: el asistente responde con seguridad sobre una versión vieja.

QUÉ SUBE. Tres documentos DERIVADOS del repositorio, no de la memoria de nadie:
la estructura real de los <h2>/<h3> del informe, los niveles y fuentes reales de
`arquitectura-datos.js`, y los módulos, reglas y agentes reales del prototipo.
Van a `conocimiento` (que viaja SIEMPRE en el contexto del modelo) y troceados a
`fragmentos` (para que la herramienta `buscar_pasajes` pueda citarlos).

REVERSIBLE. Se deshace borrando por clave —informe-fase1, arquitectura-ia,
sistema-prototipo— y por código de fragmento —DOC-INFORME, DOC-ARQUITECTURA,
DOC-SISTEMA—.
"""
import io, json, os, re, sys, urllib.error, urllib.request

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(RAIZ)
SECO = '--seco' in sys.argv

INF = io.open('informe/fase1/informe-diagnostico-fase1.html', encoding='utf-8').read()


def txt(h):
    return ' '.join(re.sub(r'<[^>]+>', '', h).replace('&amp;', '&').split())


# ══════════════════════════════════════════════════════════════════════════
#  1 · EL INFORME — la estructura se lee del propio HTML
# ══════════════════════════════════════════════════════════════════════════
sec = [(m.group(1), txt(m.group(2)), m.start())
       for m in re.finditer(r'<h2[^>]*id="(s\d+)"[^>]*>(.*?)</h2>', INF, re.S)]
lineas = []
for k, (sid, t, pos) in enumerate(sec):
    fin = sec[k + 1][2] if k + 1 < len(sec) else len(INF)
    lineas.append('### %s' % t)
    for x in re.finditer(r'<h3[^>]*id="%s-\d+"[^>]*>(.*?)</h3>' % sid, INF[pos:fin], re.S):
        lineas.append('  - %s' % txt(x.group(1)))

INFORME = """ESTADO ACTUAL DEL INFORME DIAGNÓSTICO DE FASE 1
Documento maestro: informe/fase1/informe-diagnostico-fase1.html — sitio navegable
autocontenido, entregable de la Fase 1 para la Junta Directiva de Grupo Kenex.

== ADVERTENCIA DE VIGENCIA ==
Esta síntesis describe la ESTRUCTURA VIGENTE del informe. Las minutas y
entrevistas del corpus contienen numeraciones ANTIGUAS de secciones (p. ej.
"sección 8 = tecnología", "11-12 = propuestas"): son fósiles de la planificación
de julio y NO corresponden al informe actual. Ante conflicto, manda esta síntesis.

== EL DESLINDE HALLAZGO / PROPUESTA ==
Las secciones 7, 8, 9 y 10 separan explícitamente lo que la evidencia sostiene
de lo que propone el equipo consultor. Cada una cierra con un PREBORRADOR DE
PROPUESTA, rotulado con distintivo violeta y una nota de deslinde; los hallazgos
que originan una propuesta llevan una remisión a ella.
  · 7.1–7.9 hallazgo · 7.10 síntesis de hallazgos · 7.11 PREBORRADOR (cuatro
    propuestas: certificar el dato · la tecnología y la IA como función
    transversal · gobernar el acceso al dato · núcleo Odoo nativo + capa propia)
  · 8.1–8.5 hallazgo · 8.6 PREBORRADOR (no reemplazar sistemas: hacer nacer el
    sistema propio)
  · 9.1–9.2 hallazgo · 9.3 PREBORRADOR (la formación, los dos cimientos
    documentales y la escalera de adopción)
  · 10 ENTERA es propuesta — una arquitectura de IA transversal NO existe hoy en
    la organización. La 10.7 son los dos quick wins; el cierre es la 10.8.

== REORDENAMIENTO 8 ↔ 9 ==
La auditoría técnica de Lark y Odoo pasó de ser la sección 9 a ser la 8; la
cultura y adopción de IA pasó de 8 a 9. El orden lee: el ecosistema (7) → el
examen de las dos plataformas que lo sostienen (8) → la base humana (9) → la
arquitectura que se propone (10). Consecuencia: el "componente técnico" YA NO ES
CONTIGUO — es "secciones 8 y 10", con la cultura en medio.

== MAIA NO ES UN HALLAZGO ==
Maia (formación en IA vía WhatsApp) es un DESPLIEGUE DEL EQUIPO CONSULTOR, no
una capacidad que el diagnóstico encontrara instalada. Se retiró de la 7.1
(donde figuraba como fila de la tabla de sistemas DEL GRUPO, junto a Odoo y
Lark), de la 7.4, de toda la sección 9 y de la capa C6 de la arquitectura. Sigue
—legítimamente— en los anexos, la tabla de requisitos, la sección 3 y la hoja de
ruta, que son registro del proyecto. NO reintroducirlo como hallazgo. Además: el
supuesto "Encuesta Baseline de Maia antes del Go-Live" NO EXISTE — desmentido
por la PM.

== LOS CUATRO NÚMEROS QUE LA JUNTA DEBE RETENER ==
~400 personas · 12 dependencias críticas · 22/104/260 procesos (el mapa
interactivo dice 22/104/244 tras 8 reubicaciones y 1 duplicado corregidos — EN
CONCILIACIÓN) · 52 proyectos con 3 PM.

== EL HILO CONDUCTOR ==
Criterio personal sin procedimiento (s3–s6) → dato sin certificar (s7) → dos
tesis: "estructura primero" (Parte II) y "el dato antes que el agente" (Parte III).

== ESTRUCTURA VIGENTE, SECCIÓN A SECCIÓN ==
%s

== LOS CUATRO RIESGOS DE LA SECCIÓN 7 ==
  R1 (7.5) El dato no certificado: Odoo se comunica con el resto casi siempre
     por exportación manual a Excel; la única API sistemática es la de la célula
     de BI; distintas áreas adoptan IA generativa sobre su propio Excel no
     certificado. "Una IA veloz sobre datos no validados no acelera el buen
     juicio, acelera el error."
  R2 (7.6) La ausencia de un eje: la gerencia regional de sistemas describe la
     IA del grupo en tercera persona, desde fuera. Falta el mandato que la
     constituya en función transversal.
  R3 (7.7) El gobierno del dato: la data crítica en manos sin marco formal —la
     célula de BI opera como personas naturales sin figura contractual; quienes
     modifican Odoo son freelance y partners remotos. Es el hallazgo que el
     informe eleva con MAYOR URGENCIA.
  R4 (7.8) Continuidad y escala: migración 17→19 de Odoo sin planear (son dos
     migraciones encadenadas), facturación electrónica como punto único de falla
     por país, partners sin transferencia de conocimiento, trazabilidad desigual
     de inventario, activos de marca sin repositorio, asimetría con Casio.

== HALLAZGO CENTRAL DE LA 8 (auditoría) ==
Lark: los techos oficiales de Base (50 mil filas/tabla en el mejor plan, 500
registros por llamada de API) están dos o tres órdenes de magnitud por debajo
del volumen real. NINGÚN dato maestro o transaccional debe vivir en Lark Base.
Odoo: el upgrade oficial NO migra los módulos custom; el salto 17→19 son dos
migraciones encadenadas; las bases fuertemente personalizadas cuestan ~5× más
migrar y tardan hasta 3× más. La instancia multipaís única que la gerencia de
sistemas desea AÚN NO EXISTE, y de cómo se construya depende que las
actualizaciones anuales sean gratuitas. Filtro por brecha: ¿estándar? →
¿configuración? → ¿capa externa por API? → solo entonces, módulo heredado propio.
El inventario de vacíos (8.5) suma 23 procesos: 8 críticos en Excel al lado del
sistema, 8 sin sistema alguno, 7 islas de IA generativa individual.

== HALLAZGO CENTRAL DE LA 9 (cultura) ==
El crecimiento del uso de IA ha sido "bastante arbitrario". Hay focos de madurez
reales (célula de BI, Colombia, Costa Rica, marketing, y en compras "todos
tienen Claude"). Lealtad alta con hábito arraigado; la resistencia NO admite un
porcentaje global: se lee área por área. Lección ya vivida: la migración del ERP
generó rechazo alimentado por formación incompleta.
La 9.3 propone la ESCALERA DE ADOPCIÓN (el efecto cascada): cuatro planos de
mando — Comité Gerencial (decide y diseña, define la política, comunica la hoja
de ruta) → Líder interno del proceso (implementación transversal, enlace con la
consultoría, flujo al Comité) → Gerencias (aseguran la ejecución en su área,
alerta temprana) → El personal (formarse, incorporar los métodos, elevar
inquietudes). De los cuatro, el LÍDER INTERNO DEL PROCESO es el rol acordado en
el Comité del 01-jul y AÚN NO CONSTITUIDO: es el escalón que hoy falta.
"Si la alta dirección no se alinea, nadie más lo hará."

== PENDIENTE DE DECISIÓN DEL EQUIPO (no resuelto) ==
  · s1 Resumen ejecutivo — se redacta AL FINAL.
  · s13 Hoja de ruta — espera insumo de Gabriel.
  · Destinatario de portada: "Comité Directivo" vs "Junta Directiva".
  · Cifras de Maia sin conciliar (30/60/70/150).
  · Versión cliente: falta el build que ampute el Anexo B y el apartado interno.
""" % '\n'.join(lineas)

# ══════════════════════════════════════════════════════════════════════════
#  2 · LA ARQUITECTURA DE IA — los datos salen de arquitectura-datos.js
# ══════════════════════════════════════════════════════════════════════════
AD = io.open('informe/fase1/arquitectura-datos.js', encoding='utf-8').read()


def campos(bloque, clave):
    return re.findall(r"%s:\s*'((?:[^'\\]|\\.)*)'" % clave, bloque)


niv = re.search(r'const NIVELES\s*=\s*\[(.*?)\n\];', AD, re.S)
niveles = ['  %s. %s (%s) — %s' % (b.group(2), b.group(3), b.group(4), b.group(5))
           for b in re.finditer(
               r"\{\s*id:\s*'(\w+)',\s*n:\s*(\d+),\s*nombre:\s*'([^']*)',"
               r"\s*capa:\s*'([^']*)',\s*lema:\s*'([^']*)'", niv.group(1))] if niv else []
rai = re.search(r'const RAICES\s*=\s*\[(.*?)\n\];', AD, re.S)
raices = ['  · %s — cadencia: %s' % (b.group(1), b.group(2))
          for b in re.finditer(r"nombre:\s*'([^']*)'[^}]*?cadencia:\s*'([^']*)'",
                               rai.group(1), re.S)] if rai else []
ced = re.search(r'const CEDAZO\s*=\s*\{(.*?)\n\};', AD, re.S)
cedazo = ' '.join(campos(ced.group(1), 'que') + campos(ced.group(1), 'porQue')) if ced else ''

ARQ = """LA ARQUITECTURA DE IA PROPUESTA — SECCIÓN 10 DEL INFORME Y "LA TORRE"

== QUÉ ES Y QUÉ NO ES ==
La sección 10 del informe es PROPUESTA EN SU TOTALIDAD. Una arquitectura de IA
transversal NO EXISTE hoy en Grupo Kenex. Lo único que existe son piezas sueltas
—la célula de BI, el agente de Lark de Andrés, las islas de IA generativa— y el
objeto de la propuesta es precisamente dejar de tenerlas sueltas. Se presenta
como PREBORRADOR: material para que la dirección lo evalúe y corrija.

Existe además un modelo 3D interactivo, "la torre"
(informe/fase1/arquitectura-ia-kenex.html, WebGL con three.js vendorizado), que
enseña la misma arquitectura desde la otra punta: no con qué se construye, sino
de dónde viene el dato y en qué se convierte. Su fuente única es
informe/fase1/arquitectura-datos.js, que alimenta también la versión plana de
respaldo (arquitectura-ia-plana.html). Tiene conmutador hoy/propuesto y un
recorrido guiado de 8 paradas.

== LOS CUATRO NIVELES DE LA TORRE ==
%s

== LAS DOCE FUENTES QUE LA ALIMENTAN (con su cadencia real) ==
%s

== EL CEDAZO ==
%s

== EL ESQUEMA POR CAPAS DEL INFORME (10.1) ==
  C1 · Sistemas de registro (lo que ya existe): Odoo (núcleo transaccional,
     estándar, camino a instancia multipaís única) · EBS/WMS · Shopify,
     Mercately, Cashea, Mercado Libre · Lark · fuentes externas (41 clientes,
     Casio, Importbel). Se mantienen y estabilizan; no se reemplaza nada.
  C2 · Capa de datos certificada: almacén analítico, pipelines normalizados con
     dueño formal, catálogo y diccionario maestro, reglas de calidad, API
     interna de datos. Es la obra fundacional — responde al Riesgo 1.
  C3 · Capa de integración IA (MCP): servidores MCP por sistema + gateway
     empresarial con OAuth 2.1/SSO, permisos por rol y auditoría de cada acción.
     MCP elimina el problema N×M. Es el requisito de los Riesgos 2 y 3 hecho
     infraestructura.
  C4 · Motor de razonamiento (Anthropic): Claude vía API para los agentes,
     Claude for Work para uso asistencial por área, Claude Code para el equipo
     interno. Se estandariza lo que ya germinó orgánicamente.
  C5 · Agentes y casos de uso, por olas.
  C6 · Experiencia: Lark como interfaz conversacional interna, WhatsApp como
     canal de cliente, Power BI para tableros, Universidad Cubitt como capa de
     formación. Nadie aprende una herramienta nueva.
  C0 · Gobierno (transversal): la instancia acordada el 01-jul como dueña, la
     política de adopción de IA, el marco legal de accesos, presupuesto con
     dueño único, y observabilidad desde el día uno.

== LOS OCHO COMPONENTES (10.2), en orden de precedencia ==
  1. Gobierno constituido — la única pieza que no admite espera (Riesgo 3).
  2. Capa de datos certificada: API interna + catálogo maestro.
  3. Gateway MCP empresarial — la puerta única y gobernada.
  4. Servidores MCP por sistema, empezando por MCP-Odoo en solo lectura.
  5. Los agentes de la Ola 1.
  6. Estandarización del uso asistencial (de islas a flota).
  7. Capacidad de desarrollo interna (se desarrolla en 10.3).
  8. Observabilidad y evaluación: costo, uso, precisión y valor desde el día uno
     — porque "la función no se mide: el termómetro es la ausencia de reclamos".

== EL EQUIPO INTERNO (10.3) ==
Condición de viabilidad, no accesorio: un equipo entrenado en el ecosistema de
Anthropic que (a) empuje transversalmente sistemas e IA, (b) sea el enlace con
el tercero que desarrolle el núcleo, (c) pueda modificar y mantener ese núcleo
por sí mismo, y (d) gobierne la capa de integración y datos. Puede empezar
mínimo pero no admite no existir. "Convierte la arquitectura de un plan que se
compra en una capacidad que se posee."

== MCP-ODOO: LA SECUENCIA DE PRIVILEGIO (10.5) ==
  Fase 1 · Solo lectura — estado de pedido, disponibilidad, inventario, precio.
     Un agente que solo lee no puede romper nada.
  Fase 2 · Escritura propuesta (borrador) — el agente redacta; la persona firma.
  Fase 3 · Escritura gobernada acotada — solo bajo riesgo, alto volumen y reglas
     claras, tras demostrar precisión. Nunca decisiones económicas.
  Principio: el privilegio de escritura SE GANA CON EVIDENCIA DE PRECISIÓN.

== HUMAN-IN-THE-LOOP (10.6) ==
  · INFORMAR — autonomía plena (lee, calcula, resume, presenta).
  · RECOMENDAR / PREPARAR — autonomía media, el humano confirma.
  · DECIDIR — reservado al humano SIEMPRE: comprar, pagar, aprobar un precio,
    contratar, desvincular. "El agente llega al borde; el clic es humano."
  "No es la IA impactando los procesos: son las personas usando IA las que
  impactan los procesos."

== LOS DOS QUICK WINS (10.7) ==
  1. EL AGENTE DE IA PARA LAS CONVERSACIONES. Agente conversacional sobre el
     WhatsApp del e-commerce, con MCP-Odoo en solo lectura. Evidencia: ~6.000
     mensajes/mes atendidos a mano por seis personas; en ABRIL el canal
     conversacional facturó 37 MIL USD frente a 30 MIL de la web — el canal
     manual ya vende más que el automatizado, y al saturarse SE PIERDEN VENTAS.
     Habilitante: exponer estado de pedido y disponibilidad, porque hoy "en Odoo
     no puedo saber si un pedido salió".
  2. LA FORMACIÓN EN IA CON LICENCIA CLAUDE TEAMS. Licencias corporativas con
     formación estructurada y política de uso. Cero código que construir: la
     herramienta ya está adoptada sola en 7 focos. Habilitante: dos decisiones
     de dirección — cobertura de licencias con dueño presupuestario, y la
     política de uso.
  ADVERTENCIA EXPLÍCITA DEL INFORME: NINGUNO DE LOS DOS RESUELVE EL RIESGO 1.
  Sirven para demostrar valor y construir patrocinio mientras se hace la obra
  que sí lo resuelve: la capa de datos certificada.

== LO QUE EL ESQUEMA DELIBERADAMENTE NO HACE (10.8) ==
No reemplaza a Odoo, Lark ni al stack de BI; no despliega agentes sobre datos no
certificados; no deja ninguna acción de agente fuera del gateway y su auditoría;
y no automatiza decisiones económicas sin aprobación humana.
""" % ('\n'.join(niveles) or '  (no extraídos)',
       '\n'.join(raices) or '  (no extraídas)',
       cedazo[:900] or '(no extraído)')

# ══════════════════════════════════════════════════════════════════════════
#  3 · EL PROTOTIPO — módulos, reglas y agentes reales
# ══════════════════════════════════════════════════════════════════════════
AM = io.open('sistema/ARQUITECTURA.md', encoding='utf-8').read()
mods = sorted(x[:-3] for x in os.listdir('sistema/pantallas') if x.endswith('.js'))
AG = io.open('sistema/nucleo/agentes.js', encoding='utf-8').read()
# los agentes se declaran como CLAVES de un objeto — 'N-01': { modulo, agente, nombre… },
# no con un campo `id`: buscar `id:` no encuentra ninguno.
agentes = re.findall(
    r"'([A-Z]-\d\d)':\s*\{\s*modulo:\s*'([^']*)',\s*agente:\s*'([^']*)',\s*nombre:\s*'([^']*)'", AG)
reglas = re.findall(r"^\s{2}(\w+):\s*\{\s*v:", AG, re.M)
cuerpo = re.sub(r'\n{3,}', '\n\n', re.sub(r'```.*?```', '', AM, flags=re.S)).strip()

SIS = """EL PROTOTIPO DEL SISTEMA (/sistema) — FASE 2

== QUÉ ES ==
Prototipo navegable del "sistema propio" que la sección 8.6 del informe propone
hacer nacer. Vive en el repositorio bajo /sistema y se abre desde el portal raíz
y desde el raíl de herramientas del informe. NO es el sistema en producción: es
la maqueta funcional que enseña cómo se vería y con qué reglas operaría.

== MÓDULOS DEL APLICATIVO (%d pantallas) ==
%s

== LOS DOS PORTALES EXTERNOS ==
  · Portal del VENDEDOR (sistema/portal-vendedor/) — vendedor de Kenex, mayoreo:
    ve productos, inventario y lo que está en el mar, y hace RESERVAS sobre
    stock del hub y sobre embarques en tránsito. Tiene tope por reserva.
  · Portal del CLIENTE (sistema/portal-cliente/) — pide y ve anticipos,
    historial de compras, despachos, reporte de ventas por Excel (sell-out),
    línea de crédito, historiales y promociones.
  Ambos son páginas aparte con estética de portal y piden al MISMO libro de
  reservas que el aplicativo: es lo que los hace sistema y no maqueta.

== LAS REGLAS DE NEGOCIO PARAMETRIZADAS (%d) ==
%s

== LOS AGENTES DEL NÚCLEO ==
%s

== CONCEPTOS CLAVE ==
  · ATP (disponible para prometer) = libre en hub + libre por embarque − reservado.
  · Inventario distribuido = despachado − reportado, con banda de confianza: la
    visual global de dónde está la mercancía en los almacenes de los clientes.
  · Recorrido guiado de 18 paradas en cuatro actos, que atraviesa el aplicativo
    y los dos portales. Se puede PLEGAR al mínimo para explicar la pantalla y
    volver a abrir sin perder el paso (botón o tecla G).
  · Big map con cartografía real (Mapbox vendorizado, sin CDN): todos los puntos
    de venta, filtro Cubitt/Casio, y al pulsar un punto se aterriza en SU ficha
    —el almacén en Inventarios o el cliente en Clientes—, no en la lista.
  · Módulo de Clientes por país y región, con recomendaciones de impulso de
    ventas por IA y una torre de control (global + pestaña por cliente).

== CÓMO SE COMPRUEBA ==
scripts/comprobar-sistema.py corre 14 comprobaciones sobre el prototipo y
scripts/comprobar-torre.py otras 11 sobre la torre. Práctica establecida: toda
comprobación nueva se ROMPE A PROPÓSITO primero para confirmar que la detecta.

== DOCUMENTO DE ARQUITECTURA (extracto) ==
%s
""" % (len(mods), '\n'.join('  · ' + m for m in mods),
       len(reglas), '\n'.join('  · ' + r for r in reglas) or '  (no extraídas)',
       '\n'.join('  · %s [%s] %s — %s' % a for a in agentes) or '  (no extraídos)',
       cuerpo[:7000])

DOCS = [('informe-fase1', 'Estado y estructura vigente del Informe Diagnóstico Fase 1', INFORME),
        ('arquitectura-ia', 'La arquitectura de IA propuesta: sección 10 y la torre', ARQ),
        ('sistema-prototipo', 'El prototipo del sistema /sistema — Fase 2', SIS)]

for k, t, c in DOCS:
    print('  %-20s %6d car.  %s' % (k, len(c), t[:50]))
print('  total: %d car. · ~%d tokens que se suman a CADA consulta del asistente'
      % (sum(len(c) for _, _, c in DOCS), sum(len(c) for _, _, c in DOCS) // 3.6))
for k, t, c in DOCS:
    assert '(no extra' not in c, '%s: quedaron bloques sin extraer del repositorio' % k
if SECO:
    print('\n  (--seco: no se sube nada)')
    sys.exit(0)

# ══════════════════════════════════════════════════════════════════════════
#  4 · SUBIDA
# ══════════════════════════════════════════════════════════════════════════
print()
CODIGO = {'informe-fase1': 'DOC-INFORME', 'arquitectura-ia': 'DOC-ARQUITECTURA',
          'sistema-prototipo': 'DOC-SISTEMA'}
QUIEN = {'informe-fase1': 'documento del proyecto — informe Fase 1',
         'arquitectura-ia': 'documento del proyecto — arquitectura de IA',
         'sistema-prototipo': 'documento del proyecto — prototipo del sistema'}

c = io.open(os.path.join(RAIZ, 'supabase', 'cliente.js'), encoding='utf-8').read()
URL = re.search(r'https://[\w-]+\.supabase\.co', c).group(0)

# Desde el cierre del acceso anónimo (04-ago-2026) la clave publishable ya NO
# puede escribir en `conocimiento`/`fragmentos`: hace falta una credencial de
# servicio, que nunca vive en el repositorio. Se toma del entorno:
#
#   PowerShell:  $env:SUPABASE_SERVICE_KEY = "<clave de servicio>"
#   Git Bash:    export SUPABASE_SERVICE_KEY="<clave de servicio>"
#
# (Dashboard → Project Settings → API keys → service_role / secret key.)
SERVICIO = (os.environ.get('SUPABASE_SERVICE_KEY')
            or os.environ.get('SUPABASE_SERVICE_ROLE_KEY') or '').strip()
if not SERVICIO:
    print('\n  FALTA CREDENCIAL: define SUPABASE_SERVICE_KEY en el entorno.')
    print('  Sin ella la subida a `conocimiento` responde 401/0 filas, porque el')
    print('  proyecto ya no admite escritura anónima. Ver supabase/README.md.')
    sys.exit(2)
KEY = SERVICIO


def pedir(path, metodo='GET', cuerpo=None, prefer=None):
    h = {'apikey': KEY, 'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json'}
    if prefer:
        h['Prefer'] = prefer
    datos = json.dumps(cuerpo, ensure_ascii=False).encode() if cuerpo is not None else None
    r = urllib.request.Request(URL + path, data=datos, headers=h, method=metodo)
    try:
        with urllib.request.urlopen(r, timeout=60) as o:
            b = o.read().decode()
            return o.status, (json.loads(b) if b.strip() else None)
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()[:400]


def trocear(texto, tam=1600, solape=200):
    partes, i = [], 0
    while i < len(texto):
        partes.append(texto[i:i + tam])
        i += tam - solape
    return partes


fallos = []
for clave, titulo, contenido in DOCS:
    st, resp = pedir('/rest/v1/conocimiento?on_conflict=clave', 'POST',
                     [{'clave': clave, 'titulo': titulo, 'contenido': contenido, 'activo': True}],
                     'resolution=merge-duplicates,return=representation')
    ok = st in (200, 201)
    print('  %s conocimiento  %-20s HTTP %s' % ('OK ' if ok else 'MAL', clave, st))
    if not ok:
        fallos.append('conocimiento %s: %s %s' % (clave, st, resp))
        continue
    cod = CODIGO[clave]
    pedir('/rest/v1/fragmentos?codigo=eq.' + cod, 'DELETE')
    filas = [{'codigo': cod, 'entrevistado': QUIEN[clave], 'orden': k,
              'contenido': t, 'activo': True} for k, t in enumerate(trocear(contenido), 1)]
    st2, resp2 = pedir('/rest/v1/fragmentos', 'POST', filas, 'return=minimal')
    ok2 = st2 in (200, 201, 204)
    print('  %s fragmentos    %-20s %d trozos · HTTP %s' % ('OK ' if ok2 else 'MAL', cod, len(filas), st2))
    if not ok2:
        fallos.append('fragmentos %s: %s %s' % (cod, st2, resp2))

st, filas = pedir('/rest/v1/conocimiento?select=clave,activo&order=clave')
print('\n  `conocimiento` tiene ahora %d documentos activos' % sum(1 for f in filas if f['activo']))
print()
print(('FALLOS:\n  · ' + '\n  · '.join(fallos)) if fallos
      else 'CONTEXTO DEL ASISTENTE SINCRONIZADO (la caché refresca en ~5 min)')
sys.exit(1 if fallos else 0)
