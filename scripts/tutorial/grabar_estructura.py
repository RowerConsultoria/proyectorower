"""Graba el tutorial de la estructura organizativa To-Be: informe/fase2/tutorial/estructura.mp4.

    python scripts/tutorial/grabar_estructura.py
    python scripts/tutorial/editar.py estructura

Ver comun.py para el flujo completo (voz, grabación, edición). La grabación usa la cuenta de
QA como «Integrante del comité (demo)» con el Agente IA y el permiso «Estructura» activos, le
pide al agente un cambio real y lo APLICA (la Coordinación de Contenidos bajo Mercadeo). Al
terminar, aunque falle, BORRA la versión de la estructura que publicó, sus propuestas y
conversaciones, y deja la cuenta como estaba.
"""
import sys
from playwright.sync_api import sync_playwright
from comun import Tutorial, lista_voz, sql

NOMBRE = 'estructura'
DEMO = 'Integrante del comité (demo)'

GUION = [
    {'id': 'portada', 'titulo': '', 'voz':
        'En este video vas a ver cómo leer la estructura organizativa propuesta, y cómo usar el Agente IA para entenderla y, si tienes el permiso, cambiarla.',
     'pantalla': '<div class="k">Manual de procesos · Fase 2</div><h1>La estructura organizativa To-Be</h1>'
                 '<p>Cómo leerla, y cómo usar el Agente IA para entenderla y proponer cambios.</p>'
                 '<ol><li><span>1</span>Recorrer el organigrama</li><li><span>2</span>Abrir una unidad y ver sus países</li>'
                 '<li><span>3</span>Comités, capas y premisas</li><li><span>4</span>Preguntarle al agente</li><li><span>5</span>Proponer y aplicar un cambio</li></ol>'},
    {'id': 'entrar', 'titulo': '1 · Entrar', 'voz':
        'La estructura se abre desde la barra superior del manual, con el enlace Estructura.',
     'pantalla': 'La estructura se abre desde la barra superior del manual, con el enlace <b>Estructura</b>.'},
    {'id': 'lectura', 'titulo': '1 · Cómo se lee', 'voz':
        'Arriba está la Presidencia. A la izquierda, en naranja, las unidades de staff que apoyan al comité directivo. A la derecha, en verde, las unidades de negocio, en el orden de la cadena de valor: compra, logística y venta.',
     'pantalla': 'Arriba, la <b>Presidencia</b>. A la izquierda, en naranja, el <b>staff</b> que apoya al comité directivo. A la derecha, en verde, el <b>negocio</b>, en el orden de la cadena de valor: compra, logística y venta.'},
    {'id': 'bandas', 'titulo': '1 · Cómo se lee', 'voz':
        'Cada lado tiene dos bandas: arriba la capa corporativa, que existe una sola vez para todo el grupo, y abajo, rayada, la capa país, que se repite en Panamá, Venezuela y Colombia.',
     'pantalla': 'Cada lado tiene dos bandas: la <b>capa corporativa</b>, una sola vez para todo el grupo, y la <b>capa país</b>, rayada, que se repite en Panamá, Venezuela y Colombia.'},
    {'id': 'navegar', 'titulo': '1 · Moverse', 'voz':
        'Con la rueda del mouse acercas y alejas, arrastrando te mueves, y con estos botones ajustas la vista a la pantalla.',
     'pantalla': 'Con la <b>rueda del mouse</b> acercas y alejas; <b>arrastrando</b> te mueves; con estos botones ajustas la vista.'},
    {'id': 'unidad', 'titulo': '2 · Abrir una unidad', 'voz':
        'Un clic en cualquier caja abre su ficha: quién la ocupa y en qué estado, sus funciones, de quién depende y en qué comités participa.',
     'pantalla': 'Un clic en una caja abre su <b>ficha</b>: ocupante y estado, funciones, de quién depende y en qué comités participa.'},
    {'id': 'paises', 'titulo': '2 · Por país', 'voz':
        'Las gerencias país se dibujan como una pila, una hoja por país. Al abrirla, ves una caja por país con su ocupante.',
     'pantalla': 'Las gerencias país son una <b>pila</b>, una hoja por país. Al abrirla ves una caja por país con su ocupante.'},
    {'id': 'leyenda', 'titulo': '2 · Ocupantes', 'voz':
        'La leyenda explica los colores del ocupante: titular actual, propuesto, por validar, vacante o por definir. Resaltar abiertas marca las posiciones que faltan por cubrir.',
     'pantalla': 'La <b>leyenda</b> explica los estados del ocupante. <b>Resaltar abiertas</b> marca las posiciones por cubrir.'},
    {'id': 'comites', 'titulo': '3 · Consejos y comités', 'voz':
        'Arriba, el desplegable de consejos y comités muestra las instancias de cogobierno, quién las lidera y quiénes las integran.',
     'pantalla': 'El desplegable <b>Consejos y comités</b> muestra las instancias de cogobierno, quién las lidera y quiénes las integran.'},
    {'id': 'capas', 'titulo': '3 · Capas', 'voz':
        'El botón Capas explica la lógica de la estructura sin nombres, nivel por nivel, antes de entrar al detalle.',
     'pantalla': 'El botón <b>Capas</b> explica la lógica de la estructura, nivel por nivel, sin nombres.'},
    {'id': 'premisas', 'titulo': '3 · Premisas del diseño', 'voz':
        'Y en Premisas del diseño están los principios, qué se conserva y qué cambia, y los pendientes.',
     'pantalla': 'En <b>Premisas del diseño</b> están los principios, qué se conserva, qué cambia y los pendientes.'},
    {'id': 'agente', 'titulo': '', 'voz':
        'Ahora, el Agente IA. Conoce toda la estructura vigente y responde con ella.',
     'pantalla': '<div class="k">Agente IA del manual</div><h1>Pregúntale por la estructura</h1>'
                 '<p>Conoce toda la estructura vigente: unidades, ocupantes, comités y premisas. Y, con el permiso, la cambia.</p>'},
    {'id': 'abrir', 'titulo': '4 · El Agente IA', 'voz':
        'Abre el agente con su botón. Sabe que estás en la estructura, así que puedes preguntar directamente.',
     'pantalla': 'Abre el <b>Agente IA</b>. Sabe que estás en la estructura: pregunta directamente.'},
    {'id': 'pregunta', 'titulo': '4 · El Agente IA', 'voz':
        'El agente lee la estructura antes de responder.',
     'pantalla': 'El agente lee la estructura antes de responder… <i>(acelerado)</i>'},
    {'id': 'respuesta', 'titulo': '4 · El Agente IA', 'voz':
        'Responde con la estructura vigente: dependencias, ocupantes y comités. Úsalo para entenderla o para preparar una conversación.',
     'pantalla': 'Responde con la estructura vigente: dependencias, ocupantes y comités.'},
    {'id': 'permiso', 'titulo': '5 · Cambiar la estructura', 'voz':
        'Cambiarla requiere un permiso aparte, el interruptor Estructura de tu cuenta. Si no lo tienes, el agente te explica qué cambiaría y a quién pedírselo.',
     'pantalla': 'Cambiarla pide un permiso aparte: el interruptor <b>Estructura</b> de tu cuenta. Sin él, el agente explica qué cambiaría.'},
    {'id': 'pedir', 'titulo': '5 · Cambiar la estructura', 'voz':
        'Pídele el cambio en tus palabras. El agente lo arma, revisa que ningún comité quede nombrando una unidad que ya no existe, y te lo propone.',
     'pantalla': 'Pide el cambio en tus palabras. El agente lo arma y lo valida… <i>(acelerado)</i>'},
    {'id': 'tarjeta', 'titulo': '5 · La propuesta', 'voz':
        'Llega una tarjeta con los cambios en frases. Antes de decidir, mira cómo quedaría con Ver vista previa.',
     'pantalla': 'Llega una <b>propuesta</b> con los cambios en frases. Antes de decidir, <b>Ver vista previa</b>.'},
    {'id': 'previa', 'titulo': '5 · Vista previa', 'voz':
        'La vista previa dibuja la estructura completa con el cambio, marcada como no aplicada. Nada cambia hasta que lo apliques.',
     'pantalla': 'La <b>vista previa</b> dibuja la estructura con el cambio, marcada como no aplicada. Nada cambia todavía.'},
    {'id': 'aplicar', 'titulo': '5 · Aplicar', 'voz':
        'Vuelve a la propuesta y pulsa Aplicar. Se publica como una versión nueva, firmada con tu nombre.',
     'pantalla': 'Vuelve a la propuesta y pulsa <b>Aplicar</b>: se publica como versión nueva, firmada con tu nombre… <i>(acelerado)</i>'},
    {'id': 'version', 'titulo': '5 · Versiones', 'voz':
        'Todos la ven al instante. La barra muestra la versión vigente y, al pulsarla, el historial con lo que cambió en cada versión.',
     'pantalla': 'Todos la ven al instante. La barra muestra la <b>versión vigente</b> y, al pulsarla, el <b>historial</b> de cambios.'},
    {'id': 'aviso', 'titulo': '5 · Ten en cuenta', 'voz':
        'Un cambio en la estructura no cambia solo los cargos que nombran los procesos del manual. El agente te lo recuerda en cada propuesta.',
     'pantalla': 'Un cambio aquí no cambia solos los <b>cargos de los procesos</b> del manual. El agente lo recuerda en cada propuesta.'},
    {'id': 'cierre', 'titulo': '', 'voz':
        'En resumen: recorre la estructura, abre las unidades, consulta al agente y, con el permiso, propón, revisa la vista previa y aplica.',
     'pantalla': '<div class="k">En resumen</div><h1>Leer, preguntar, cambiar</h1>'
                 '<ol><li><span>1</span>Recorre el organigrama y abre las unidades</li><li><span>2</span>Revisa países, ocupantes y comités</li>'
                 '<li><span>3</span>Pregúntale al agente para entenderla</li><li><span>4</span>Con el permiso, propón un cambio y mira la vista previa</li>'
                 '<li><span>5</span>Aplica: queda como versión con historial</li></ol>'},
]


def preparar(correo):
    r = sql("""update perfiles set nombre = '%s' where correo = '%s';
      insert into agente_cuentas(perfil_id, activo, estructura) select id, true, true from perfiles where correo = '%s'
        on conflict (perfil_id) do update set activo = true, estructura = true;
      delete from agente_sesiones where perfil_id = (select id from perfiles where correo = '%s');""" % (DEMO, correo, correo, correo))
    if isinstance(r, dict) and 'error' in r:
        sys.exit('No pude preparar la cuenta de demo: %s' % r)


def limpiar(correo):
    r = sql("""do $$ declare qa uuid := (select id from perfiles where correo = '%s'); begin
      perform set_config('rower.actor', 'limpieza del video tutorial de la estructura', true);
      delete from public.estructura_tobe where autor = qa;
      delete from public.agente_propuestas where perfil_id = qa;
      delete from public.agente_sesiones where perfil_id = qa;
      update public.agente_cuentas set activo = false, estructura = false where perfil_id = qa;
      update public.perfiles set nombre = null where id = qa;
    end $$;""" % correo)
    print('limpieza de la base:', 'ok' if not (isinstance(r, dict) and 'error' in r) else r)


if __name__ == '__main__':
    if '--lista' in sys.argv:
        for f in lista_voz(NOMBRE, GUION): print(('✓ ' if f['listo'] else '· ') + f['id'])
        sys.exit(0)
    t = Tutorial(NOMBRE, GUION)
    preparar(t.correo)
    try:
        with sync_playwright() as pw:
            nav = pw.chromium.launch()
            p = t.abrir(nav, '#/', nombre_demo=DEMO)
            p.wait_for_selector('#agFab', timeout=30000)
            t.overlay()
            t.tarjeta('portada', minimo=7)

            t.paso('entrar')
            t.clic(p.locator('#lnkEstructura'), pausa=2500)
            p.wait_for_selector('#estructura .eo-card', timeout=30000)
            t.apuntar(p.locator('#estructura .eo-card[data-id="ceo"]'), pausa=300)
            t.paso('lectura')
            t.apuntar(p.locator('#estructura .eo-card[data-id="finanzas"]'), pausa=700)
            t.apuntar(p.locator('#estructura .eo-card[data-id="opl"]'), pausa=700)
            t.paso('bandas')
            t.clic(p.locator('#eoZin'), pausa=400); t.clic(p.locator('#eoZin'), pausa=400)
            t.paso('navegar')
            t.clic(p.locator('#eoZfit'), pausa=900)

            t.clic(p.locator('#estructura .eo-card[data-id="opl"]'), pausa=1200)
            p.wait_for_selector('#eoPanel:not([hidden])', timeout=10000)
            t.apuntar(p.locator('#eoPanel'), pausa=300)
            t.paso('unidad')
            t.clic(p.locator('#eoPx'), pausa=900)

            pila = p.locator('#estructura .eo-pexp').first
            cual = pila.get_attribute('data-exp')
            t.apuntar(pila, pausa=300)
            t.paso('paises')
            t.clic(pila, pausa=1800)
            t.clic(p.locator('#estructura .eo-pcab[data-exp="%s"]' % cual), pausa=900)   # vuelve a una sola caja

            t.apuntar(p.locator('#eoLey'), pausa=300)
            t.paso('leyenda')
            t.clic(p.locator('#eoVac'), pausa=1500); t.clic(p.locator('#eoVac'), pausa=600)

            t.clic(p.locator('#eoCogCab'), pausa=1200)
            t.paso('comites')
            t.clic(p.locator('#eoCogCab'), pausa=600)

            t.clic(p.locator('#eoCapasBtn'), pausa=1500)
            t.paso('capas')
            p.evaluate("() => { location.hash = '#/estructura'; }"); p.wait_for_timeout(1200)
            t.clic(p.locator('#estructura .eo-btn-prem'), pausa=1500)
            t.paso('premisas')
            t.clic(p.locator('#eoPx'), pausa=800)
            t.callar()

            # el agente
            t.tarjeta('agente', minimo=4.5)
            t.clic(p.locator('#agFab'), pausa=1500)
            t.paso('abrir', izq=True)
            t.escribir(p.locator('#agEntrada'), '¿De quién depende la gerencia de Mercadeo, quién la ocupa y en qué comités participa? En pocas líneas.')
            t.clic(p.locator('#agEnviar'), pausa=400)
            t.esperar('pregunta', "() => !document.querySelector('#agEnviar').disabled && !document.querySelector('.ag-estado')")
            t.paso('respuesta', izq=True, extra=1.0)
            t.paso('permiso', izq=True)
            t.escribir(p.locator('#agEntrada'), 'Agrega bajo la gerencia corporativa de Mercadeo una coordinación corporativa de Contenidos, vacante, que produzca los contenidos de marca.')
            t.clic(p.locator('#agEnviar'), pausa=400)
            t.esperar('pedir', "() => document.querySelector('#agLista .ag-prop [data-ag=\"previa\"]') && !document.querySelector('.ag-estado')")
            tarjeta = p.locator('#agLista .ag-prop').last
            t.apuntar(tarjeta.locator('.ag-dif'), pausa=300)
            t.paso('tarjeta', izq=True)
            t.clic(tarjeta.locator('[data-ag="previa"]'), pausa=1800)
            p.wait_for_selector('#estructura .eo-plat.previa', timeout=15000)
            nueva = p.locator('#estructura .eo-card').filter(has_text='Contenidos').first
            t.apuntar(nueva, pausa=300)
            t.paso('previa')
            t.clic(p.locator('#estructura [data-est="agente"]'), pausa=1200)
            t.clic(p.locator('#agLista .ag-prop [data-ag="aplicar"]').last, pausa=300)
            t.esperar('aplicar', "() => document.querySelector('#agLista .ag-prop.ag-ok') && !document.querySelector('#agEnviar').disabled && !document.querySelector('.ag-estado')")
            t.clic(p.locator('#agPanel [data-ag="cerrar"]'), pausa=1200)
            t.apuntar(p.locator('#estructura .eo-card').filter(has_text='Contenidos').first, pausa=600)
            t.clic(p.locator('#estructura [data-est="historial"]'), pausa=1200)
            t.paso('version')
            t.clic(p.locator('#estructura [data-est="historial"]'), pausa=600)
            t.paso('aviso')
            t.callar()
            t.tarjeta('cierre', minimo=7)
            t.cerrar(nav)
    finally:
        limpiar(t.correo)
