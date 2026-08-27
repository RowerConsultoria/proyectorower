# -*- coding: utf-8 -*-
"""Carga el censo de personal de Kenex en Supabase y resuelve la jerarquía.

    python scripts/importar-personal.py            # importa y sube
    python scripts/importar-personal.py --seco      # solo lee y reporta, no sube

FUENTE. El Excel consolidado de RR.HH. (426 personas, 4 entidades: Rower ·
Casiolandia Panamá · Kenex Trading · Deltadir). Ruta fija más abajo — mismo
patrón que scripts/generar_mapa_procesos.py con su Excel de insumo.

QUÉ HACE.
  1. Lee la hoja "Personal Consolidado" y sube cada fila a public.personal
     (upsert idempotente por nombre+entidad — se puede re-correr).
  2. Resuelve public.personal.gerente_id por coincidencia EXACTA de nombre
     normalizado (sin acentos, mayúsculas, espacios colapsados) contra la
     columna "Gerente / Supervisor" del Excel — hoy resuelve solo la
     jerarquía de Venezuela y Colombia, no la de Panamá (el Excel no la
     trae). Los ~43 casos de Panamá se asignan a mano en el panel, por área
     (módulo «Censo y enlaces» → Asignación masiva).
  3. Reporta lo que no pudo resolver: cargos genéricos sin persona
     ("Gerente Regional", "Director General"…), nombres duplicados
     ambiguos, y el resto de Panamá.

REVERSIBLE. Re-correrlo actualiza (upsert por nombre+entidad); no borra
personas que hayan sido editadas o dadas de baja a mano en el panel salvo
que el Excel les cambie el nombre.
"""
import datetime as dt
import io, json, os, re, sys, unicodedata, urllib.error, urllib.request

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(RAIZ)
SECO = '--seco' in sys.argv

EXCEL = r"c:\Users\gabri\Downloads\Listado Personal_Consolidado_Rower_Kenex_PA_VE_CO.xlsx"
HOJA = "Personal Consolidado"

try:
    import openpyxl
except ImportError:
    print('Falta openpyxl: pip install openpyxl')
    sys.exit(2)

# ══════════════════════════════════════════════════════════════════════════
#  1 · LEER EL EXCEL
# ══════════════════════════════════════════════════════════════════════════
if not os.path.isfile(EXCEL):
    print('No encuentro el Excel en:', EXCEL)
    print('Ajusta la constante EXCEL al inicio del guion si se movió de sitio.')
    sys.exit(2)

wb = openpyxl.load_workbook(EXCEL, data_only=True)
ws = wb[HOJA]
filas = list(ws.iter_rows(values_only=True))
cab, datos = filas[0], filas[1:]
idx = {nombre: pos for pos, nombre in enumerate(cab)}


def limpio(v):
    if v is None:
        return None
    s = str(v).strip()
    return None if s in ('', 'N/A') else s


def fecha_iso(v):
    if isinstance(v, (dt.date, dt.datetime)):
        return v.date().isoformat() if isinstance(v, dt.datetime) else v.isoformat()
    return None


def normaliza(s):
    if not s:
        return ''
    s = unicodedata.normalize('NFKD', str(s)).encode('ascii', 'ignore').decode()
    return ' '.join(s.upper().split())


personas = []
for r in datos:
    g = lambda col: r[idx[col]] if col in idx else None
    personas.append({
        'nombre': limpio(g('Nombre Completo')),
        'pais': limpio(g('País')),
        'entidad': limpio(g('Entidad')),
        'area': limpio(g('Departamento / Área')),
        'cargo': limpio(g('Cargo')),
        'correo': (limpio(g('Correo Electrónico')) or '').lower() or None,
        'fecha_ingreso': fecha_iso(g('Fecha de Ingreso')),
        'identificacion': limpio(g('Identificación')),
        'ubicacion': limpio(g('Ubicación de Trabajo')),
        'condicion': limpio(g('Condición')),
        'supervisor_txt': limpio(g('Gerente / Supervisor')),
        'origen': limpio(g('Archivo de Origen')),
    })
personas = [p for p in personas if p['nombre']]
print('Leídas %d personas de "%s".' % (len(personas), HOJA))

# El nombre no es único de verdad: el Excel trae homónimos reales (misma
# entidad, distinta persona — distinto correo/cargo). unique(nombre,entidad)
# necesita un valor distinto por fila, así que al segundo+ homónimo se le
# añade un desambiguador visible; se avisa para revisarlo en el panel.
vistos = {}
homonimos = []
for p in personas:
    clave = (p['nombre'], p['entidad'])
    vistos[clave] = vistos.get(clave, 0) + 1
    if vistos[clave] > 1:
        original = p['nombre']
        p['nombre'] = '%s (%d)' % (original, vistos[clave])
        homonimos.append((original, p['entidad'], p['correo']))
if homonimos:
    print('\nHomónimos reales en la misma entidad (personas DISTINTAS, mismo nombre) — %d:'
          % len(homonimos))
    for nombre, entidad, correo in homonimos:
        print('  · "%s" en %s (%s) → renombrado con un sufijo para no perderlo; revisar en el panel.'
              % (nombre, entidad, correo or 'sin correo'))

if SECO:
    print('\n  (--seco: no se sube nada)')
    sys.exit(0)

# ══════════════════════════════════════════════════════════════════════════
#  2 · SUBIDA — mismo cliente PostgREST que sincronizar-asistente.py
# ══════════════════════════════════════════════════════════════════════════
c = io.open(os.path.join(RAIZ, 'supabase', 'cliente.js'), encoding='utf-8').read()
URL = re.search(r'https://[\w-]+\.supabase\.co', c).group(0)

SERVICIO = (os.environ.get('SUPABASE_SERVICE_KEY')
            or os.environ.get('SUPABASE_SERVICE_ROLE_KEY') or '').strip()
if not SERVICIO:
    print('\n  FALTA CREDENCIAL: define SUPABASE_SERVICE_KEY en el entorno.')
    print('    PowerShell:  $env:SUPABASE_SERVICE_KEY = "<clave de servicio>"')
    print('    Git Bash:    export SUPABASE_SERVICE_KEY="<clave de servicio>"')
    print('  (Dashboard → Project Settings → API keys → service_role / secret key.)')
    sys.exit(2)
KEY = SERVICIO


def pedir(path, metodo='GET', cuerpo=None, prefer=None):
    h = {'apikey': KEY, 'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json'}
    if prefer:
        h['Prefer'] = prefer
    body = json.dumps(cuerpo, ensure_ascii=False).encode() if cuerpo is not None else None
    req = urllib.request.Request(URL + path, data=body, headers=h, method=metodo)
    try:
        with urllib.request.urlopen(req, timeout=60) as o:
            b = o.read().decode()
            return o.status, (json.loads(b) if b.strip() else None)
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()[:400]


print()
LOTE = 100
subidas = []
fallos = []
for i in range(0, len(personas), LOTE):
    trozo = personas[i:i + LOTE]
    st, resp = pedir('/rest/v1/personal?on_conflict=nombre,entidad', 'POST', trozo,
                      'resolution=merge-duplicates,return=representation')
    ok = st in (200, 201)
    print('  %s personal  filas %d–%d  HTTP %s' % ('OK ' if ok else 'MAL', i + 1, i + len(trozo), st))
    if ok:
        subidas.extend(resp)
    else:
        fallos.append('personal filas %d-%d: %s %s' % (i + 1, i + len(trozo), st, resp))

if fallos:
    print('\nFALLOS al subir:\n  · ' + '\n  · '.join(fallos))
    sys.exit(1)

print('\n%d filas confirmadas en public.personal.' % len(subidas))

# ══════════════════════════════════════════════════════════════════════════
#  3 · RESOLVER LA JERARQUÍA — coincidencia exacta de nombre normalizado
# ══════════════════════════════════════════════════════════════════════════
por_nombre = {}
for p in subidas:
    por_nombre.setdefault(normaliza(p['nombre']), []).append(p)

resueltos = []
no_resueltos = []
for p in subidas:
    crudo = p.get('supervisor_txt')
    if not crudo:
        continue
    candidatos = por_nombre.get(normaliza(crudo), [])
    en_misma_entidad = [c for c in candidatos if c['entidad'] == p['entidad'] and c['id'] != p['id']]
    elegido = en_misma_entidad[0] if len(en_misma_entidad) == 1 else (
        candidatos[0] if len(candidatos) == 1 and candidatos[0]['id'] != p['id'] else None)
    if elegido:
        resueltos.append((p['id'], p['nombre'], elegido['id'], elegido['nombre']))
    else:
        no_resueltos.append((p['nombre'], p['entidad'], crudo))

print('\nJerarquía: %d de %d supervisores declarados se resolvieron por nombre exacto.'
      % (len(resueltos), len(resueltos) + len(no_resueltos)))

errores_patch = []
for i, (pid, _, gid, _) in enumerate(resueltos):
    st, resp = pedir('/rest/v1/personal?id=eq.%s' % pid, 'PATCH', {'gerente_id': gid})
    if st not in (200, 204):
        errores_patch.append((pid, st, resp))
    if (i + 1) % 50 == 0:
        print('  … %d/%d asignaciones de gerente aplicadas' % (i + 1, len(resueltos)))
print('  %d/%d asignaciones de gerente aplicadas.' % (len(resueltos) - len(errores_patch), len(resueltos)))
if errores_patch:
    print('  %d fallaron (posible ciclo detectado por el trigger):' % len(errores_patch))
    for pid, st, resp in errores_patch[:15]:
        print('    · %s → HTTP %s %s' % (pid, st, resp))

if no_resueltos:
    print('\nPendientes de asignar a mano en el panel (%d):' % len(no_resueltos))
    por_valor = {}
    for nombre, entidad, crudo in no_resueltos:
        por_valor.setdefault(crudo, []).append((nombre, entidad))
    for crudo, gente in sorted(por_valor.items(), key=lambda x: -len(x[1])):
        muestra = ', '.join('%s (%s)' % g for g in gente[:3])
        mas = '' if len(gente) <= 3 else ' … +%d más' % (len(gente) - 3)
        print('  · "%s" — %d persona(s): %s%s' % (crudo, len(gente), muestra, mas))

sin_supervisor = [p for p in subidas if not p.get('supervisor_txt')]
print('\nSin ningún valor de "Gerente / Supervisor" en el Excel (%d) — típicamente Panamá.'
      ' Usa la asignación masiva por área en el panel.' % len(sin_supervisor))

print('\nIMPORTACIÓN COMPLETA' + (' CON AVISOS' if (no_resueltos or errores_patch) else ''))
sys.exit(0)
