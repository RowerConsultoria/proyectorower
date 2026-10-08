# -*- coding: utf-8 -*-
"""Conocimiento de la Fase 2 para el Asistente IA (lo usa sincronizar-asistente.py).

Todo sale del repositorio, nada de la memoria de nadie: el manual de procesos
(To-Be y As-Is), el circuito del negocio, la arquitectura de IA (la órbita), la
estructura organizativa To-Be con sus funcionamientos, la madurez documental, la
presentación de validación y el instructivo del comité.

Devuelve dos listas:
  · CONTEXTO — documentos de síntesis que van a `conocimiento` y viajan SIEMPRE
    en el contexto del asistente (claves fase2-*).
  · DETALLE  — un documento por pieza (cada proceso en cada versión, cada N0,
    cada estación, cada módulo…), que va solo a `fragmentos`: se encuentra con
    `buscar_pasajes` y se lee entero con `leer_documento(<código>)`.
"""
import html as _html, io, json, os, re, subprocess

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
F2 = os.path.join(RAIZ, 'informe', 'fase2')


# ───────────────────────────────────────────────────────────── utilidades
def t(x):
    """Texto plano de un valor del dato (cadena, lista, fila de tabla o dict)."""
    if x is None:
        return ''
    if isinstance(x, str):
        return re.sub(r'\*\*(.+?)\*\*', r'\1', x).strip()
    if isinstance(x, (int, float)):
        return str(x)
    if isinstance(x, list):
        return ' | '.join(t(v) for v in x if t(v))
    if isinstance(x, dict):
        return ' · '.join('%s: %s' % (k, t(v)) for k, v in x.items() if k not in ('estado', 'id') and t(v))
    return str(x)


def corto(s, n):
    s = ' '.join(t(s).split())
    return s if len(s) <= n else s[:n - 1].rsplit(' ', 1)[0] + '…'


def html_texto(h):
    h = re.sub(r'(?is)<(script|style)[^>]*>.*?</\1>', ' ', h)
    h = re.sub(r'(?i)<br\s*/?>', '\n', h)
    h = re.sub(r'(?i)</(p|div|li|h\d|tr|section|ol|ul|table)>', '\n', h)
    h = re.sub(r'<[^>]+>', ' ', h)
    h = _html.unescape(h)
    lineas = [' '.join(l.split()) for l in h.split('\n')]
    return '\n'.join(l for l in lineas if l)


def volcar():
    sal = subprocess.run(['node', os.path.join(RAIZ, 'scripts', '_volcar_fase2_asistente.js')],
                         capture_output=True, check=True)
    return json.loads(sal.stdout.decode('utf-8'))


# ───────────────────────────────────────────────────────────── el manual
def ficha_mapa(p):
    return p.get('mapa') or {}


def dueno_de(proc_dato, p):
    d = (proc_dato or {}).get('dueno') or {}
    return t(d.get('dueno')) or t(ficha_mapa(p).get('dueno'))


def texto_proceso(p, macro, dato, version):
    """El proceso completo, en el orden de sus secciones."""
    cod = p['codigo']
    m = ficha_mapa(p)
    v = 'TO-BE (cómo debería operar: propuesta del manual)' if version == 'TOBE' else 'AS-IS (cómo opera hoy, según las entrevistas)'
    L = ['PROCESO %s · %s' % (cod, p['n']),
         'Versión %s · macroproceso %s %s (%s) · madurez según el mapa v18: %s' % (v, macro['prefijo'], macro['n'], macro['cat'], p.get('madurez', 's/d'))]
    if dato.get('nota_version'):
        L.append('Nota de versión: ' + t(dato['nota_version']))
    pr = dato.get('proposito') or {}
    if pr:
        L.append('\nPROPÓSITO Y ALCANCE')
        for k in ('texto', 'alcance', 'nota_estado'):
            if pr.get(k):
                L.append(('' if k == 'texto' else k.replace('_', ' ').capitalize() + ': ') + t(pr[k]))
    elif m.get('alcance') and version == 'TOBE':
        L.append('\nALCANCE (ficha del mapa v18): ' + t(m['alcance']))
    du = dato.get('dueno') or {}
    L.append('\nDUEÑO Y PARTICIPANTES')
    L.append('Dueño: ' + (t(du.get('dueno')) or (t(m.get('dueno')) + ' (ficha del mapa v18)' if version == 'TOBE' and m.get('dueno') else 's/d')))
    parts = du.get('participantes') or (m.get('participantes') if version == 'TOBE' else None) or []
    for x in parts if isinstance(parts, list) else [parts]:
        L.append('  · ' + t(x))
    for k in ('evidencia', 'sin_evidencia', 'nota'):
        if du.get(k):
            L.append('%s: %s' % (k.replace('_', ' '), t(du[k])))
    di = dato.get('disparador') or {}
    src = di if di else (m if version == 'TOBE' else {})
    if src:
        L.append('\nDISPARADOR, CADENCIA Y RESULTADO')
        for k, n in (('disparador', 'Disparador'), ('cadencia', 'Cadencia'), ('output', 'Resultado (output)'),
                     ('evidencia', 'Evidencia'), ('sin_evidencia', 'Sin evidencia')):
            if src.get(k):
                L.append('%s: %s' % (n, t(src[k])))
    fl = dato.get('flujo') or {}
    if fl.get('actividades'):
        L.append('\nFLUJO DE ACTIVIDADES')
        if fl.get('nota'):
            L.append(t(fl['nota']))
        for i, a in enumerate(fl['actividades'], 1):
            L.append('%d. [%s] %s' % (i, t(a.get('rol')), t(a.get('texto'))))
        if fl.get('evidencia'):
            L.append('Evidencia del flujo: ' + t(fl['evidencia']))
    for clave, titulo in (('riesgos', 'MATRIZ DE RIESGOS'), ('indicadores', 'INDICADORES')):
        b = dato.get(clave) or {}
        if b.get('filas'):
            L.append('\n' + titulo + (' (' + t(b['cabecera']) + ')' if b.get('cabecera') else ''))
            for f in b['filas']:
                L.append('  · ' + t(f))
    return '\n'.join(L)


def texto_n0(macro, n0, version):
    L = ['MACROPROCESO %s · %s (%s) — manual N0, versión %s' % (macro['prefijo'], macro['n'], macro['cat'], version)]
    nombres = {'introduccion': 'INTRODUCCIÓN', 'contexto': 'CONTEXTO', 'gobernanza': 'GOBERNANZA',
               'marco': 'MARCO DE REFERENCIA', 'agenda': 'AGENDA DE MEJORA Y BRECHAS', 'anexos': 'ANEXOS'}
    for sec, nom in nombres.items():
        b = n0.get(sec)
        if not b:
            continue
        L.append('\n' + nom)
        for k, v in b.items():
            if k == 'estado' or not v:
                continue
            if isinstance(v, list) and v and isinstance(v[0], list):
                L.append('%s:' % k.replace('_', ' '))
                for f in v:
                    L.append('  · ' + t(f))
            elif isinstance(v, list):
                L.append('%s:' % k.replace('_', ' '))
                for f in v:
                    L.append('  · ' + t(f))
            else:
                L.append('%s: %s' % (k.replace('_', ' '), t(v)))
    return '\n'.join(L)


# ───────────────────────────────────────────────────────────── generación
def generar():
    D = volcar()
    mapa, TOBE, ASIS = D['mapa'], D['tobe'], D['asis']
    CONTEXTO, DETALLE = [], []

    macros = mapa['macros']
    n_proc = sum(len(m['procesos']) for m in macros)
    n_tobe = sum(len((TOBE.get(m['prefijo']) or {}).get('procesos') or {}) for m in macros)
    n_asis = sum(len((ASIS.get(m['prefijo']) or {}).get('procesos') or {}) for m in macros)
    mad = {}
    for m in macros:
        for p in m['procesos']:
            mad[p.get('madurez', 's/d')] = mad.get(p.get('madurez', 's/d'), 0) + 1
    con_asis = [m['prefijo'] for m in macros if (ASIS.get(m['prefijo']) or {}).get('procesos')]

    # ── índice del manual (siempre en contexto) y detalle por proceso
    idx = ['ÍNDICE DEL MANUAL DE PROCESOS DE LA FASE 2 (los %d procesos, por macroproceso)' % n_proc,
           'Cada línea: código · nombre · madurez (mapa v18) · dueño en el To-Be · dueño en el As-Is.',
           'El texto completo de cada proceso se lee con leer_documento: «PROC-<código>-TOBE» o «PROC-<código>-ASIS»',
           '(p. ej. PROC-6.3-TOBE). El N0 de cada macroproceso: «MACRO-<prefijo>» (y «MACRO-<prefijo>-ASIS» si existe).']
    agenda = ['AGENDA DE MEJORA DE CADA MACROPROCESO (Fase 2, del N0 To-Be de cada manual)',
              'Por macroproceso: su propósito y su agenda — procesos por implementar (no operan hoy), por formalizar',
              '(operan pero sin norma escrita) y brechas transversales. El N0 completo: leer_documento(«MACRO-<prefijo>»).']
    for m in macros:
        pref = m['prefijo']
        tb = (TOBE.get(pref) or {}).get('procesos') or {}
        asb = (ASIS.get(pref) or {}).get('procesos') or {}
        idx.append('\n### %s · %s (%s) — %d procesos · To-Be redactados: %d · As-Is: %d'
                   % (pref, m['n'], m['cat'], len(m['procesos']), len(tb), len(asb)))
        for p in m['procesos']:
            cod = p['codigo']
            idx.append('  %s · %s · %s · To-Be: %s · As-Is: %s'
                       % (cod, p['n'], p.get('madurez', 's/d'),
                          corto(dueno_de(tb.get(cod), p), 70) or 's/d',
                          corto(t((asb.get(cod) or {}).get('dueno', {}).get('dueno')), 70) if cod in asb else '—'))
            if cod in tb:
                DETALLE.append(('PROC-%s-TOBE' % cod, 'Manual Fase 2 · %s To-Be · %s' % (cod, p['n']),
                                texto_proceso(p, m, tb[cod], 'TOBE')))
            if cod in asb:
                DETALLE.append(('PROC-%s-ASIS' % cod, 'Manual Fase 2 · %s As-Is · %s' % (cod, p['n']),
                                texto_proceso(p, m, asb[cod], 'ASIS')))
        n0 = (TOBE.get(pref) or {}).get('n0') or {}
        if n0:
            DETALLE.append(('MACRO-%s' % pref, 'Manual Fase 2 · N0 del macroproceso %s %s' % (pref, m['n']), texto_n0(m, n0, 'To-Be')))
            intro = n0.get('introduccion') or {}
            ag = n0.get('agenda') or {}
            agenda.append('\n### %s · %s' % (pref, m['n']))
            if intro.get('proposito'):
                agenda.append('Propósito: ' + corto(intro['proposito'], 420))
            if ag.get('nota'):
                agenda.append('Nota: ' + corto(ag['nota'], 320))
            for k, nom in (('por_implementar', 'Por implementar'), ('por_formalizar', 'Por formalizar'), ('brechas', 'Brechas')):
                for f in ag.get(k) or []:
                    f = f if isinstance(f, list) else [f]
                    agenda.append('  · %s — %s: %s' % (nom, corto(f[0], 90), corto(' · '.join(t(x) for x in f[1:]), 260)))
        n0a = (ASIS.get(pref) or {}).get('n0') or {}
        if n0a:
            DETALLE.append(('MACRO-%s-ASIS' % pref, 'Manual Fase 2 · N0 As-Is del macroproceso %s %s' % (pref, m['n']), texto_n0(m, n0a, 'As-Is')))
    CONTEXTO.append(('fase2-manual-indice', 'Fase 2 · índice de los 182 procesos del manual, con dueños y versiones', '\n'.join(idx)))
    CONTEXTO.append(('fase2-manual-agendas', 'Fase 2 · propósito y agenda de mejora de cada macroproceso', '\n'.join(agenda)))

    # ── circuito del negocio
    C = D['circuito']
    est = C['estaciones']
    tot = {'ofi': 0, 'ext': 0, 'inf': 0}
    for s in est:
        for k in tot:
            tot[k] += (s.get('trasp') or {}).get(k, 0)
    T = sum(tot.values()) or 1
    circ = ['EL CIRCUITO DEL NEGOCIO (Fase 2, versión As-Is: cómo corre hoy la operación de todo el grupo) — corte %s' % C['meta']['corte'],
            'Ruta en el manual: #/circuito. Dibujado como una VÍA DE TREN (la analogía del «tren bala» de la Presidencia):',
            'línea troncal · ramales · cambios de agujas (donde alguien decide a qué ramal va la mercancía) · FRENOS (puntos donde',
            'el flujo se detiene —grado «detiene»— o pierde velocidad —«lento»—) · señales de paso (esperas de aprobación) ·',
            'tripulación (jefe de estación: rol · nombre) · catenaria (mercadeo, que alimenta la línea) · vías de retorno.',
            '',
            'ESTRUCTURA: el plan de demanda abre dos ramales de compra (Cubitt, marca propia; Casio, representada) que se unen en la',
            'estación central de Zona Libre (5 llegada, 6 bodega y liberación). En el 7 (asignación) el PRIMER cambio de agujas reparte',
            'entre el ramal MAYOR (clientes terceros servidos desde Zona Libre: 8a, 9a) y el ramal PAÍSES (operaciones propias VE, CO,',
            'Panamá local, GT; Costa Rica como socio sin detalle: 8b, 9b, 10b). En el 10b el SEGUNDO cambio de agujas reparte dentro de',
            'cada país entre TIENDAS (11c–15c), MAYOR LOCAL (11e–13e) y WEB (SW surtido, 11d–13d). Todos empalman en el 16 (cobro);',
            'el dinero sube 17 conciliación · 18 cuadre entre empresas (donde se salda el ramal Países) · 19 cierre · 20 sell-out, que',
            'vuelve al plan. Vías de retorno: PCI (reporte a Casio), PV (postventa), RT (devoluciones). MK = mercadeo (catenaria).',
            'Numeración: nivel 1 (hub) 8 pedido y liberación · 9 despacho · 10 llegada; nivel 2 (país) 11 pedido y reparto · 12',
            'despacho · 13 entrega o recepción · 14 venta · 15 caja.',
            '',
            'SISTEMAS: de %d traspasos de información, el %d %% no pasa por ningún sistema (Excel, correo, mensajería, papel, de palabra)'
            % (T, round(100 * tot['inf'] / T)),
            'y el %d %% queda fuera de Odoo, Lark y EBS al sumar plataformas externas; solo el %d %% pasa por los sistemas del grupo.'
            % (round(100 * (tot['inf'] + tot['ext']) / T), round(100 * tot['ofi'] / T)),
            '%d frenos en total, %d de los cuales detienen el tren.' % (sum(len(s.get('frenos') or []) for s in est),
                                                                    sum(1 for s in est for f in s.get('frenos') or [] if f.get('grado') == 'detiene')),
            '',
            'ESTACIONES (código · título · ramal · jefe de estación · %% sin sistema · frenos que DETIENEN). La ficha completa de cada',
            'estación —recorrido, variantes, frenos, cifras, tripulación, sistemas, procesos— se lee con leer_documento(«CIRC-<id>»).']
    for s in est:
        tr = s.get('trasp') or {}
        tt = (tr.get('ofi', 0) + tr.get('ext', 0) + tr.get('inf', 0)) or 1
        det = [f for f in s.get('frenos') or [] if f.get('grado') == 'detiene']
        circ.append('  %s · %s · %s · %s · %d %% sin sistema%s'
                    % (s['id'], s['t'], C['ramales'].get(s['ramal'], s['ramal']), s.get('jefe', ''),
                       round(100 * tr.get('inf', 0) / tt),
                       (' · DETIENEN: ' + ' / '.join('%s %s' % (f['id'], corto(f['t'], 150)) for f in det)) if det else ''))
        L = ['ESTACIÓN %s · %s — circuito del negocio (As-Is), %s · %s' % (s['id'], s['t'], C['ramales'].get(s['ramal'], s['ramal']), s.get('tramo', '')),
             'Departamento: %s · Jefe de estación: %s · Evidencia: %s' % (s.get('depto', ''), s.get('jefe', ''), s.get('ev', '')),
             '\nCÓMO FUNCIONA HOY\n' + t(s.get('hoy'))]
        if s.get('pasos'):
            L.append('\nRECORRIDO')
            L += ['%d. %s' % (i, t(x)) for i, x in enumerate(s['pasos'], 1)]
        if s.get('variantes'):
            L.append('\nVARIANTES\n' + t(s['variantes']))
        if s.get('senal'):
            L.append('\nSEÑAL DE PASO (espera de aprobación)\n' + t(s['senal']))
        if s.get('frenos'):
            L.append('\nFRENOS')
            L += ['  · %s [%s] %s (%s)%s' % (f['id'], f.get('grado'), t(f['t']), f.get('ev', ''),
                                            (' — antes trombo ' + f['antes']) if f.get('antes') and f['antes'] != f['id'] else '')
                  for f in s['frenos']]
        if s.get('cifras'):
            L.append('\nCIFRAS')
            L += ['  · ' + t(x) for x in s['cifras']]
        if s.get('catenaria'):
            L.append('\nCATENARIA (toque de mercadeo): ' + t(s['catenaria'].get('t')) + ' (' + t(s['catenaria'].get('ev')) + ')')
        L.append('\nSISTEMAS: %s · traspasos: %d por Odoo/Lark/EBS, %d por plataformas externas, %d sin sistema'
                 % (t(s.get('senalizacion')), tr.get('ofi', 0), tr.get('ext', 0), tr.get('inf', 0)))
        if s.get('tripulacion'):
            L.append('TRIPULACIÓN: ' + ' · '.join(t(x) for x in s['tripulacion']))
        if s.get('proc'):
            L.append('PROCESOS DEL MANUAL: ' + ', '.join(s['proc']))
        if s.get('confirmar'):
            L.append('POR CONFIRMAR EN LA VALIDACIÓN: ' + t(s['confirmar']))
        if s.get('src'):
            L.append('FUENTES: ' + t(s['src']))
        DETALLE.append(('CIRC-%s' % s['id'], 'Circuito del negocio · estación %s %s' % (s['id'], s['t']), '\n'.join(L)))
    if C.get('preguntas'):
        circ.append('\nPREGUNTAS ABIERTAS PARA LA VALIDACIÓN')
        circ += ['  · ' + t(x) for x in C['preguntas']]
    CONTEXTO.append(('fase2-circuito', 'Fase 2 · el circuito del negocio As-Is (vía de tren): estructura, frenos y sistemas', '\n'.join(circ)))

    # ── arquitectura de IA (la órbita)
    O = D['orbita']
    area = {a['id']: a for a in O['areas']}
    olas = {}
    for mo in O['mods']:
        olas[mo.get('olaTxt') or mo.get('ola')] = olas.get(mo.get('olaTxt') or mo.get('ola'), 0) + 1
    arq = ['LA ARQUITECTURA DE IA PROPUESTA EN LA FASE 2 — «LA ÓRBITA» (ruta #/arquitectura del manual)',
           'Es PROPUESTA del equipo consultor (To-Be), no algo que exista hoy. Dos capas: abajo los sistemas de registro (Odoo de',
           'Panamá, Venezuela y Colombia, y EBS); en el núcleo «el espejo» (réplica y modelo canónico del dato del grupo); alrededor,',
           'sectores y áreas con %d módulos que crecen por olas (%s). Cada módulo se describe como Sistema → IA → Firma (qué decide una'
           % (len(O['mods']), ', '.join('%s: %d' % (k, v) for k, v in sorted(olas.items(), key=lambda x: str(x[0])))),
           'persona) → Frenos que resuelve (códigos del circuito) → Reemplaza → Conecta → Procesos del manual.',
           'Sin Power BI ni Fabric: el entorno de datos se nombra por su función. No reemplaza a Odoo.',
           'Detalle de cada módulo: leer_documento(«ARQ-<id del módulo>»), p. ej. ARQ-m-espejo.',
           '',
           'ÁREAS Y MÓDULOS (id · nombre · ola · tipo · frenos del circuito que resuelve):']
    for a in O['areas']:
        arq.append('\n### %s · %s%s' % (a.get('num', ''), a['nom'], (' — ' + a['nota']) if a.get('nota') else ''))
        for mid in a.get('mods') or []:
            mo = next((x for x in O['mods'] if x['id'] == mid), None)
            if not mo:
                continue
            arq.append('  %s · %s · %s · %s%s' % (mo['id'], mo['nom'], mo.get('olaTxt', ''), mo.get('tipo', ''),
                                                (' · frenos: ' + ', '.join(mo.get('trombos') or [])) if mo.get('trombos') else ''))
            L = ['MÓDULO %s · %s — arquitectura de IA de la Fase 2 (propuesta), área %s, %s, tipo %s'
                 % (mo['id'], mo['nom'], a['nom'], mo.get('olaTxt', ''), mo.get('tipo', ''))]
            for k, v in (mo.get('campos') or {}).items():
                if isinstance(v, dict):
                    L.append('\n%s: %s' % (k.upper(), t(v.get('txt'))))
                    L += ['  · ' + t(x) for x in v.get('items') or []]
                else:
                    L.append('\n%s: %s' % (k.upper(), t(v)))
            if mo.get('trombos'):
                L.append('\nFRENOS DEL CIRCUITO QUE RESUELVE:')
                for c in mo['trombos']:
                    tr = (O.get('trombos') or {}).get(c) or {}
                    L.append('  · %s %s' % (c, t(tr.get('t'))))
            DETALLE.append(('ARQ-%s' % mo['id'], 'Arquitectura de IA Fase 2 · módulo %s' % mo['nom'], '\n'.join(L)))
    if O.get('fuera'):
        arq.append('\nFRENOS QUE LA PLATAFORMA NO DISUELVE:')
        arq += ['  · %s — %s' % (f.get('trombo'), t(f.get('nota'))) for f in O['fuera']]
    CONTEXTO.append(('fase2-arquitectura-ia', 'Fase 2 · la arquitectura de IA propuesta (la órbita): áreas, módulos y olas', '\n'.join(arq)))

    # ── estructura organizativa To-Be y funcionamientos
    E = D['estructura']
    est_n = {k: v.get('n', k) for k, v in (E.get('ESTADOS') or {}).items()} if isinstance(E.get('ESTADOS'), dict) else {}

    def ocup(o):
        return '%s (%s)' % (o.get('nombre', ''), est_n.get(o.get('estado'), o.get('estado', ''))) if o else ''

    def unidad(u, nivel_txt, sangria):
        L = ['%s%s · %s%s' % (sangria, nivel_txt, u['n'], (' — ' + ocup(u.get('ocupante'))) if u.get('ocupante') else '')]
        if u.get('paises'):
            L.append(sangria + '    países: ' + ' · '.join('%s %s%s' % (k, ocup(v), (' [' + v['cargo'] + ']') if v.get('cargo') else '')
                                                     for k, v in u['paises'].items()))
        for f in u.get('funciones') or []:
            L.append(sangria + '    - ' + t(f))
        if u.get('nota'):
            L.append(sangria + '    nota: ' + t(u['nota']))
        for h in u.get('hijos') or []:
            L += unidad(h, 'Gerencia país' if h.get('nivel') == 'n3' else 'Gerencia corporativa', sangria + '  ')
        return L

    es = ['LA ESTRUCTURA ORGANIZATIVA TO-BE DE LA FASE 2 (ruta #/estructura) — %s · corte %s' % (t(E.get('titulo')), t(E.get('corte'))),
          t(E.get('bajada')),
          'Es PROPUESTA (borrador del equipo, sesión del 26-sep, liderada por Clemencia). Niveles: ' +
          ' · '.join('%s %s' % (n.get('id'), n.get('n')) for n in E.get('NIVELES') or []) + '. Países: ' +
          ', '.join(p.get('n', p.get('id', '')) for p in E.get('PAISES') or []) + '.',
          'En el organigrama, el staff va en un contenedor a la izquierda de la línea de la Presidencia y las unidades de negocio en',
          'otro a la derecha, a la misma altura; dentro de cada uno, un recuadro agrupa los niveles corporativos y debajo quedan las',
          'gerencias país.',
          '\nGOBIERNO: ' + ' · '.join('%s (%s)' % (g['n'], corto(g.get('d'), 160)) for g in E.get('GOBIERNO') or []),
          'PRESIDENCIA: %s — %s' % (E['CEO']['n'], ocup(E['CEO'].get('ocupante')))]
    es += ['    - ' + t(f) for f in E['CEO'].get('funciones') or []]
    for s in E.get('STAFF') or []:
        es += unidad(s, 'Staff de la Presidencia', '')
    for d in E.get('DIRECCIONES') or []:
        es.append('')
        es += unidad(d, 'Dirección corporativa (%s)' % d.get('caracter', ''), '')
    es.append('\nCOMITÉS (órganos de cogobierno, sin línea de mando):')
    for k in E.get('COMITES') or []:
        es.append('  · %s — lidera: %s · %s · funciones: %s' % (k['n'], k.get('lidera'), corto(k.get('proposito'), 200), corto(k.get('funciones'), 300)))
    for clave, tit in (('FUNCIONAMIENTO', 'CÓMO FUNCIONA'), ('PRINCIPIOS', 'PRINCIPIOS DE DISEÑO')):
        if E.get(clave):
            es.append('\n' + tit + ':')
            for x in E[clave]:
                es.append('  · ' + t(x))
    if E.get('CAMBIOS'):
        es.append('\nQUÉ SE CONSERVA Y QUÉ CAMBIA FRENTE A JULIO: ' + t(E['CAMBIOS']))
    if E.get('PATRON'):
        es.append('ESTRUCTURA PATRÓN DE CARGOS: ' + ' > '.join(t(x) for x in E['PATRON']))
    if E.get('PENDIENTES'):
        es.append('\nPENDIENTES:')
        es += ['  · ' + t(x) for x in E['PENDIENTES']]
    CAP = E.get('CAPAS') or {}
    if CAP:
        es.append('\nVISTA «CAPAS» (#/estructura/capas): ' + t(CAP.get('bajada')))
        for c in CAP.get('lista') or []:
            es.append('  · %s — %s: %s' % (c.get('n', c.get('id')), c.get('verbo', ''), corto(c.get('d'), 300)))
    FU = D['funcionamiento']
    nodos = FU['nodos']
    es.append('\nFUNCIONAMIENTOS (página «Capas y funcionamiento»: dinámicas entre unidades, sacadas de los flujogramas To-Be).'
              ' Paso a paso: leer_documento(«DOC-FUNCIONAMIENTO»).')
    fl = ['FUNCIONAMIENTOS ENTRE UNIDADES DE LA ESTRUCTURA TO-BE (estructura-funcionamiento.html)',
          'Unidades: ' + ' · '.join('%s=%s' % (k, (v.get('n') if isinstance(v, dict) else v)) for k, v in nodos.items())]
    for f in FU['func']:
        es.append('  · %s — %s' % (f['t'], corto(f.get('r'), 220)))
        fl.append('\n### %s\n%s' % (f['t'], t(f.get('r'))))
        for i, p in enumerate(f.get('pasos') or [], 1):
            dec = ('  [decisión: %s — decide %s]' % (t(p['dec'].get('q')), p['dec'].get('por'))) if p.get('dec') else ''
            fl.append('%d. %s: %s%s (procesos %s)' % (i, p['t'], t(p.get('d')), dec, ', '.join(p.get('p') or [])))
    CONTEXTO.append(('fase2-estructura', 'Fase 2 · la estructura organizativa To-Be: unidades, ocupantes, comités y funcionamientos', '\n'.join(es)))
    DETALLE.append(('DOC-ESTRUCTURA', 'Estructura organizativa To-Be (Fase 2)', '\n'.join(es)))
    DETALLE.append(('DOC-FUNCIONAMIENTO', 'Funcionamientos entre unidades de la estructura To-Be', '\n'.join(fl)))

    # ── madurez documental, presentación de validación e instructivo del comité
    M = D['madurez']
    md = ['MADUREZ DOCUMENTAL DE KENEX (ruta #/madurez): la premisa central de toda la validación de la Fase 2',
          'Premisa: ' + t(M.get('premisa')),
          'Escala: ' + ' · '.join('%s %s (%s)' % (e.get('n'), e.get('r'), e.get('d')) for e in M.get('escala') or [])]
    for c in M.get('criterios') or []:
        md.append('  · ' + t(c))
    for k in ('base', 'lectura', 'evidencia', 'fuentes'):
        if M.get(k):
            md.append('%s: %s' % (k.capitalize(), t(M[k])))
    DETALLE.append(('DOC-MADUREZ', 'Madurez documental de Kenex (Fase 2)', '\n'.join(md)))

    pres = io.open(os.path.join(F2, 'presentacion-validacion.html'), encoding='utf-8').read()
    pres = re.sub(r'(?s)<!--.*?-->', '', pres)   # un comentario describe `pv-lamina` y se colaba como lámina
    laminas = []
    for mt in re.finditer(r'(?s)<section class="pv-lamina"([^>]*)>(.*?)</section>', pres):
        n = re.search(r'data-n="(\d+)"', mt.group(1))
        notas = re.search(r'data-notas="([^"]*)"', mt.group(1))
        cuerpo = html_texto(mt.group(2))
        laminas.append((n.group(1) if n else '?', cuerpo, _html.unescape(notas.group(1)) if notas else ''))
    pl = ['PRESENTACIÓN DE VALIDACIÓN DE LA FASE 2 — «Un decálogo» (presentacion-validacion.html), %d láminas.'
          ' Guía de la reunión con la Presidencia (5-oct) y de la presentación a la Junta (9-oct).' % len(laminas)]
    for n, cuerpo, notas in laminas:
        pl.append('\n### Lámina %s\n%s%s' % (n, cuerpo, ('\nNotas para quien presenta: ' + notas) if notas else ''))
    DETALLE.append(('DOC-PRESENTACION', 'Presentación de validación de la Fase 2', '\n'.join(pl)))

    ins = html_texto(io.open(os.path.join(F2, 'instructivo-comite.html'), encoding='utf-8').read())
    DETALLE.append(('DOC-INSTRUCTIVO', 'Instructivo del Comité de Validación (Fase 2)', 'INSTRUCTIVO DEL COMITÉ DE VALIDACIÓN DE LA FASE 2 (instructivo-comite.html)\n' + ins))

    # ── panorama (siempre en contexto)
    pan = ['LA FASE 2 DEL PROYECTO ROWER — QUÉ ES, QUÉ PRODUJO Y EN QUÉ ESTADO ESTÁ (síntesis derivada del repositorio)',
           '',
           '== QUÉ ES ==',
           'El contrato tiene cuatro fases: F1 diagnóstico (informe presentado a la Junta el 24-jul-2026) · F2 documentación de',
           'procesos y prototipos de IA · F3 reestructuración de talento · F4 evaluación y cierre. La Fase 2 documenta cómo opera',
           'Kenex HOY (As-Is) y cómo DEBERÍA operar (To-Be), y propone la estructura y la arquitectura de IA que lo sostienen.',
           '',
           '== LOS ENTREGABLES DE LA FASE 2 (todos en el manual: informe/fase2/informe-fase2.html) ==',
           '  · Manual de procesos: 20 macroprocesos / %d procesos (mapa v18 validado). To-Be redactado en los %d; As-Is en %d'
           % (n_proc, n_tobe, n_asis),
           '    (macros %s). Rutas #/m/<macro>, #/tobe/<proceso>, #/asis/<proceso>. → documentos fase2-manual-indice y' % ', '.join(con_asis),
           '    fase2-manual-agendas; texto completo con leer_documento(«PROC-…»/«MACRO-…»).',
           '  · Circuito del negocio (#/circuito): la operación As-Is como vía de tren. → documento fase2-circuito; fichas «CIRC-…».',
           '  · Mapa de procesos (#/mapa): los 20 macroprocesos en tres bandas (estratégicos, operativos, soporte).',
           '  · Arquitectura de IA (#/arquitectura): «la órbita», propuesta. → documento fase2-arquitectura-ia; módulos «ARQ-…».',
           '  · Estructura organizativa To-Be (#/estructura) y su vista «Capas»; página «Capas y funcionamiento» con 11 dinámicas',
           '    entre unidades. → documento fase2-estructura; «DOC-ESTRUCTURA», «DOC-FUNCIONAMIENTO».',
           '  · Madurez documental (#/madurez): diagnóstico que sostiene la premisa central. → «DOC-MADUREZ».',
           '  · Presentación de validación (19 láminas) e Instructivo del Comité de Validación. → «DOC-PRESENTACION», «DOC-INSTRUCTIVO».',
           '  · Prototipo del sistema propio (/sistema): ver el documento sistema-prototipo.',
           '',
           '== CÓMO LEER AS-IS Y TO-BE ==',
           'AS-IS = cómo opera hoy, según las entrevistas: cargos actuales, sin mejoras, dueño de facto donde no hay uno formal. Sus',
           'hallazgos son evidencia. TO-BE = cómo debería operar: la propuesta del manual, con los cargos de la estructura patrón',
           '(V4) y de la estructura To-Be. Una denominación del To-Be no describe algo que hoy exista. Madurez del mapa v18 por',
           'proceso: ' + ', '.join('%s %d' % (k, v) for k, v in sorted(mad.items())) + '.',
           '',
           '== LA VALIDACIÓN ==',
           'Valida el modelo To-Be un COMITÉ EJECUTIVO AD HOC de quienes conducen la transformación, que consulta a los dueños de',
           'proceso solo en lo puntual. Reunión con la Presidencia el 5-oct-2026 y presentación a la Junta el 9-oct-2026, con la',
           'presentación «Un decálogo». Los macros estratégicos 1–5 se validan en la Junta Directiva.',
           '',
           '== LA PREMISA CENTRAL: MADUREZ DOCUMENTAL BAJA ==',
           t(M.get('premisa')),
           'Criterios evaluados (nivel 1 inicial · 2 en desarrollo · 3 definido…):']
    for c in M.get('criterios') or []:
        pan.append('  · ' + corto(c, 330))
    pan += ['', '== LA PRESENTACIÓN DE VALIDACIÓN, LÁMINA A LÁMINA (resumen) ==']
    for n, cuerpo, _ in laminas:
        pan.append('  %s. %s' % (n, corto(cuerpo.replace('\n', ' · '), 330)))
    pan += ['', '== EL INSTRUCTIVO DEL COMITÉ (extracto) ==', corto(ins.replace('\n', ' · '), 3500),
            '', '== CÓMO CONSULTAR EL DETALLE ==',
            'leer_documento(<código>) devuelve un documento completo; buscar_pasajes encuentra pasajes en todos ellos y en las',
            'entrevistas. Códigos: PROC-<proceso>-TOBE / -ASIS · MACRO-<prefijo> (-ASIS) · CIRC-<estación> · ARQ-<módulo> ·',
            'DOC-ESTRUCTURA · DOC-FUNCIONAMIENTO · DOC-MADUREZ · DOC-PRESENTACION · DOC-INSTRUCTIVO · DOC-INFORME (Fase 1) ·',
            'DOC-ARQUITECTURA (torre de la Fase 1) · DOC-SISTEMA (prototipo). Las entrevistas usan E-xx y SC-xx (sesiones sin',
            'código en origen: SC-01…SC-10 viaje a Panamá y Presidencia, SC-11/12 capacitación en Venezuela, SC-13 validación con',
            'Clemencia, SC-14 reunión de procesos, SC-15 Edumar, SC-16 revisión Gabriel–Jesús 30-sep, SC-17 reunión de estructura',
            '26-sep, SC-18 María Elvira).']
    CONTEXTO.insert(0, ('fase2-panorama', 'Fase 2 · panorama: entregables, estado, validación y premisa central', '\n'.join(pan)))
    return CONTEXTO, DETALLE


if __name__ == '__main__':
    import sys
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    ctx, det = generar()
    for k, ti, c in ctx:
        print('  %-24s %7d car.  %s' % (k, len(c), ti[:70]))
    print('  contexto Fase 2: %d car. (~%d tokens)' % (sum(len(c) for _, _, c in ctx), sum(len(c) for _, _, c in ctx) // 3.6))
    print('  detalle: %d documentos · %d car.' % (len(det), sum(len(c) for _, _, c in det)))
    pre = {}
    for cod, _, _ in det:
        pre[cod.split('-')[0]] = pre.get(cod.split('-')[0], 0) + 1
    print('  por prefijo:', pre)
