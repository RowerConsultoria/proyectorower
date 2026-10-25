"""Graba el tutorial de la validación del To-Be: informe/fase2/tutorial/validacion-tobe.mp4.

    python scripts/tutorial/grabar_validacion.py
    python scripts/tutorial/editar.py validacion-tobe

Ver comun.py para el flujo completo (voz, grabación, edición). Recorre el proceso 9.3 como
«Integrante del comité (demo)»: valida las seis secciones, anota, envía, y usa el agente para
una pregunta y para aplicar un cambio al flujo. Al terminar, aunque falle, BORRA la validación,
las notas y la línea de tiempo del 9.3 que hizo la cuenta, el flujo que aplicó, y sus
propuestas y conversaciones.
⚠️ Usa el 9.3 porque no tenía validaciones reales. Si alguien empieza a validarlo, cambiar COD
y los textos de los pasos 5 y 9.
"""
import re, sys
from playwright.sync_api import sync_playwright
from comun import Tutorial, lista_voz, sql

NOMBRE = 'validacion-tobe'
COD = '9.3'
DEMO = 'Integrante del comité (demo)'

GUION = [
    {'id': 'portada', 'titulo': '', 'voz':
        'En este video vas a ver cómo validar el modelo To-Be en el manual de procesos: el veredicto de cada sección, las notas, el envío, y cómo usar el Agente IA para despejar dudas y proponer cambios al flujo.',
     'pantalla': '<div class="k">Manual de procesos · Fase 2</div><h1>Cómo validar el modelo To-Be</h1>'
                 '<p>Guía para el comité ejecutivo: veredictos, notas, envío y el Agente IA.</p>'
                 '<ol><li><span>1</span>Encontrar el proceso y leer su To-Be</li><li><span>2</span>Dar un veredicto a cada sección</li>'
                 '<li><span>3</span>Anotar ajustes, escritos o dictados</li><li><span>4</span>Cerrar y enviar a la secretaría técnica</li>'
                 '<li><span>5</span>Usar el Agente IA para despejar dudas y cambiar el flujo</li></ol>'},
    {'id': 'menu', 'titulo': '1 · El menú', 'voz':
        'Al entrar ves el manual con tu nombre arriba a la derecha. En el menú, cada proceso lleva un punto: gris sin validar, ámbar en validación y verde validado.',
     'pantalla': 'Al entrar ves el manual con tu nombre arriba a la derecha. En el menú, cada proceso lleva un punto: <b>gris</b> sin validar, <b>ámbar</b> en validación y <b>verde</b> validado.'},
    {'id': 'macro', 'titulo': '1 · El menú', 'voz':
        'Abre la banda y el macroproceso. A la derecha de cada macroproceso ves cuántos de sus procesos ya están validados.',
     'pantalla': 'Abre la banda y el macroproceso. A la derecha ves cuántos de sus procesos ya están validados.'},
    {'id': 'proceso', 'titulo': '1 · El menú', 'voz':
        'Haz clic en el proceso. El enlace te lleva directo a su versión To-Be, que es la que se valida.',
     'pantalla': 'Haz clic en el proceso: el enlace te lleva directo a su versión <b>To-Be</b>, que es la que se valida.'},
    {'id': 'banda', 'titulo': '2 · La banda de validación', 'voz':
        'Arriba del proceso aparece la banda de validación: seis barras, una por sección, que se colorean con tu veredicto. También tienes los atajos al cierre, al historial, al instructivo y a este video.',
     'pantalla': 'La <b>banda de validación</b>: seis barras, una por sección, que se colorean con tu veredicto, y los atajos al cierre, al historial, al instructivo y a este video.'},
    {'id': 'banda2', 'titulo': '2 · La banda de validación', 'voz':
        'Valida sobre el To-Be. Si necesitas el punto de partida, el As-Is está a un clic. Nada de lo que anotes cambia el manual: el equipo consultor lo revisa e incorpora.',
     'pantalla': 'Valida sobre el To-Be; el As-Is está a un clic. Nada de lo que anotes cambia el manual: el equipo consultor lo revisa e incorpora.'},
    {'id': 'veredicto', 'titulo': '3 · Veredicto por sección', 'voz':
        'Al pie de cada sección hay un panel con la pregunta guía y tres veredictos: valida, valida con ajustes, o no valida.',
     'pantalla': 'Al pie de cada sección, la pregunta guía y tres veredictos: <b>Valida</b>, <b>Valida con ajustes</b> o <b>No valida</b>.'},
    {'id': 'validado', 'titulo': '3 · Veredicto por sección', 'voz':
        'Listo: el propósito queda validado y su barra se pone verde.',
     'pantalla': 'Listo: el propósito queda validado y su barra se pone verde.'},
    {'id': 'ajustes', 'titulo': '4 · Validar con ajustes', 'voz':
        'Si algo debe cambiar, elige valida con ajustes. El panel te pide la nota: qué ajustarías y por qué. Sin nota no se puede enviar.',
     'pantalla': 'Si algo debe cambiar, elige <b>Valida con ajustes</b> y escribe la nota: qué ajustarías y por qué.'},
    {'id': 'dictar', 'titulo': '4 · Validar con ajustes', 'voz':
        'También puedes dictar la nota con el botón Dictar: el texto aparece mientras hablas y lo corriges antes de guardar.',
     'pantalla': 'También puedes <b>dictar</b> la nota (Chrome, Edge o Safari) y corregirla antes de guardar.'},
    {'id': 'sesgo', 'titulo': '4 · Validar con ajustes', 'voz':
        'Antes de guardar, revisa las tres preguntas contra el sesgo hacia el As-Is: ¿la propuesta está mal, o solo es distinta de lo que hacemos hoy?',
     'pantalla': 'Revisa las preguntas contra el <b>sesgo hacia el As-Is</b>: ¿está mal, o solo es distinta de lo que hacemos hoy?'},
    {'id': 'guardada', 'titulo': '4 · Validar con ajustes', 'voz':
        'La nota queda guardada sin enviar: mientras no envíes la validación, solo la ves tú y la puedes quitar.',
     'pantalla': 'La nota queda <b>sin enviar</b>: hasta que envíes, solo la ves tú y la puedes quitar.'},
    {'id': 'anotar', 'titulo': '5 · Anotar sobre una actividad', 'voz':
        'En el flujo, cada actividad, riesgo e indicador tiene su botón Anotar. La nota queda anclada a esa actividad.',
     'pantalla': 'Cada actividad, riesgo e indicador tiene su botón <b>Anotar</b>: la nota queda anclada a esa actividad.'},
    {'id': 'anotada', 'titulo': '5 · Anotar sobre una actividad', 'voz':
        'La actividad anotada queda resaltada, y el veredicto del flujo es valida con ajustes, porque ya tiene su nota.',
     'pantalla': 'La actividad anotada queda resaltada, y el flujo queda en <b>Valida con ajustes</b>.'},
    {'id': 'seis', 'titulo': '5 · Las seis secciones', 'voz':
        'Con un veredicto en las seis secciones, las seis barras quedan de color. Falta el cierre.',
     'pantalla': 'Con un veredicto en las seis secciones, las seis barras quedan de color. Falta el cierre.'},
    {'id': 'lista', 'titulo': '6 · Cierre y envío', 'voz':
        'El cierre trae la lista del instructivo. Las dos primeras casillas se marcan solas; las otras cuatro las confirmas tú.',
     'pantalla': 'El cierre trae la lista del instructivo: dos casillas se marcan solas, las otras cuatro las confirmas tú.'},
    {'id': 'consulta', 'titulo': '6 · Cierre y envío', 'voz':
        'Si consultaste un dato puntual con el dueño del proceso, regístralo aquí. Informa, pero no queda como pendiente.',
     'pantalla': 'Si consultaste un dato con el dueño del proceso, regístralo aquí: informa, no queda pendiente.'},
    {'id': 'enviada', 'titulo': '6 · Cierre y envío', 'voz':
        'Al enviar, tus notas se publican con tu nombre para el resto del comité, y la secretaría técnica las responde.',
     'pantalla': 'Al <b>enviar</b>, tus notas se publican con tu nombre y la secretaría técnica las responde.'},
    {'id': 'confirmar', 'titulo': '6 · Cierre y envío', 'voz':
        'Cuando la secretaría responde todo, vuelves aquí y confirmas. Si cambias de opinión, puedes reabrir.',
     'pantalla': 'Cuando la secretaría responde, <b>Confirmar y dar por validado</b>. Si cambias de opinión, <b>Reabrir</b>.'},
    {'id': 'historial', 'titulo': '7 · Historial del proceso', 'voz':
        'El historial muestra cómo ha cambiado el proceso: las versiones del To-Be y todo lo que el comité publicó, con autor y fecha.',
     'pantalla': 'El <b>historial</b>: las versiones del To-Be y todo lo que el comité publicó, con autor y fecha.'},
    {'id': 'agente', 'titulo': '', 'voz':
        'Ahora, el Agente IA. Conoce el To-Be, el As-Is, las notas del comité y las entrevistas, y solo cambia el flujo si tú lo apruebas.',
     'pantalla': '<div class="k">Agente IA del manual</div><h1>Pregúntale al agente</h1><p>Conoce el To-Be, el As-Is, las notas del comité y las entrevistas. Solo cambia el flujo si tú lo apruebas.</p>'},
    {'id': 'abrir', 'titulo': '8 · El Agente IA', 'voz':
        'El botón Agente IA abre el chat. Sabe qué proceso tienes abierto, así que puedes preguntar por este proceso.',
     'pantalla': 'El botón <b>Agente IA</b> abre el chat. Sabe qué proceso tienes abierto.'},
    {'id': 'pregunta', 'titulo': '8 · El Agente IA', 'voz':
        'El agente lee el proceso, sus notas y el As-Is antes de responder.',
     'pantalla': 'El agente lee el proceso, sus notas y el As-Is antes de responder… <i>(acelerado)</i>'},
    {'id': 'respuesta', 'titulo': '8 · El Agente IA', 'voz':
        'Responde con lo que hay en la plataforma y cita la fuente. Úsalo para despejar dudas antes de dar tu veredicto.',
     'pantalla': 'Responde con lo que hay en la plataforma y cita la fuente. Úsalo antes de dar tu veredicto.'},
    {'id': 'cambio', 'titulo': '9 · Cambiar el flujo con el agente', 'voz':
        'Lo único que el agente puede cambiar de un proceso es el flujo de actividades. Pídele el cambio en tus palabras.',
     'pantalla': 'De un proceso, el agente solo cambia el <b>flujo de actividades</b>. Pídele el cambio en tus palabras.'},
    {'id': 'armando', 'titulo': '9 · Cambiar el flujo con el agente', 'voz':
        'El agente arma el flujo nuevo y lo valida antes de mostrártelo.',
     'pantalla': 'El agente arma el flujo nuevo y lo valida… <i>(acelerado)</i>'},
    {'id': 'propuesta', 'titulo': '9 · Cambiar el flujo con el agente', 'voz':
        'Llega una propuesta con las actividades que cambian y la vista previa del flujograma. Nada se aplica sin tu confirmación.',
     'pantalla': 'Llega una <b>propuesta</b> con lo que cambia y la vista previa del flujograma. Nada se aplica sin tu confirmación.'},
    {'id': 'decidir', 'titulo': '9 · Cambiar el flujo con el agente', 'voz':
        'Si no te convence, descártala o escribe qué ajustar. Si está bien, aplícala al manual.',
     'pantalla': 'Si no te convence, <b>Descartar</b> o escribe qué ajustar. Si está bien, <b>Aplicar al manual</b>… <i>(acelerado)</i>'},
    {'id': 'aplicado', 'titulo': '9 · Cambiar el flujo con el agente', 'voz':
        'Aplicado: el manual ya muestra el flujo nuevo a todos, y en la sección aparece qué versión es, quién la aplicó y por qué.',
     'pantalla': 'Aplicado: el manual ya muestra el flujo nuevo, con su versión, quién la aplicó y por qué.'},
    {'id': 'conversaciones', 'titulo': '10 · Conversaciones guardadas', 'voz':
        'Tus conversaciones se guardan. En Conversaciones retomas cualquiera otro día, con todo su contexto, o empiezas una nueva.',
     'pantalla': 'Tus conversaciones se guardan: en <b>Conversaciones</b> retomas cualquiera otro día, o empiezas una <b>Nueva</b>.'},
    {'id': 'cierre', 'titulo': '', 'voz':
        'En resumen: da un veredicto en las seis secciones, anota cada ajuste, envía a la secretaría técnica, confirma cuando respondan, y usa el agente para dudas y para proponer cambios al flujo.',
     'pantalla': '<div class="k">En resumen</div><h1>Valida sección por sección</h1>'
                 '<ol><li><span>1</span>Lee el To-Be y da un veredicto en las seis secciones</li><li><span>2</span>Anota cada ajuste: qué y por qué</li>'
                 '<li><span>3</span>Marca la lista y envía a la secretaría técnica</li><li><span>4</span>Confirma cuando respondan tus notas</li>'
                 '<li><span>5</span>Usa el agente para dudas y para proponer cambios al flujo</li></ol>'},
]


def preparar(correo):
    r = sql("""update perfiles set nombre = '%s' where correo = '%s';
      insert into validadores_tobe(perfil_id) select id from perfiles where correo = '%s'
        on conflict (perfil_id) do update set activo = true;
      delete from agente_sesiones where perfil_id = (select id from perfiles where correo = '%s');""" % (DEMO, correo, correo, correo))
    if isinstance(r, dict) and 'error' in r:
        sys.exit('No pude preparar la cuenta de demo: %s' % r)


def limpiar(correo):
    r = sql("""do $$ declare qa uuid := (select id from perfiles where correo = '%s'); begin
      perform set_config('rower.actor', 'limpieza del video tutorial de validación', true);
      delete from public.flujos_tobe where proceso = '%s' and autor = qa;
      delete from public.validaciones_tobe where proceso = '%s' and perfil_id = qa;
      delete from public.actividad_tobe where proceso = '%s' and (perfil_id = qa or actor = qa);
      delete from public.agente_propuestas where perfil_id = qa;
      delete from public.agente_sesiones where perfil_id = qa;
      delete from public.validadores_tobe where perfil_id = qa;
      update public.perfiles set nombre = null where id = qa;
    end $$;""" % (correo, COD, COD, COD))
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
            p.wait_for_selector('#nav .f2-msub a', state='attached', timeout=30000)
            p.wait_for_selector('#agFab', timeout=30000)
            t.overlay()
            t.tarjeta('portada', minimo=7.5)

            # 1. menú
            t.apuntar(p.locator('#vtLeyenda'), pausa=300)
            t.paso('menu')
            t.apuntar(p.locator('#perfilUsuario .rp-btn'), pausa=900)
            banda = p.locator('#nav button.f2-cat-tit').filter(has_text=re.compile('operativ', re.I)).first
            if banda.get_attribute('aria-expanded') != 'true': t.clic(banda)
            chev = p.locator('.f2-mrow[data-pref="9"] .f2-mchev')
            if chev.get_attribute('aria-expanded') != 'true': t.clic(chev)
            t.apuntar(p.locator('.f2-mrow[data-pref="9"] .vt-mcuenta'), pausa=300)
            t.paso('macro')
            t.apuntar(p.locator('.f2-msub a[data-cod="%s"]' % COD), pausa=300)
            t.paso('proceso')
            t.clic(p.locator('.f2-msub a[data-cod="%s"]' % COD), pausa=1800)
            p.wait_for_selector('#vtBanda .vt-barras', timeout=30000)

            # 2. banda
            t.apuntar(p.locator('#vtBanda .vt-barras'), pausa=300)
            t.paso('banda')
            t.apuntar(p.locator('#vtBanda [data-vt="tutorial"]'), pausa=900)
            t.paso('banda2')

            # 3. veredictos
            t.clic(p.locator('#vtBanda [data-vt="ir"][data-sec="proposito"]'), pausa=1200)
            t.apuntar(p.locator('.vt-panel[data-vt-sec="proposito"] .vt-preg'), pausa=300)
            t.paso('veredicto')
            t.clic(p.locator('.vt-verd[data-sec="proposito"][data-v="valida"]'), pausa=1000)
            t.apuntar(p.locator('#vtBanda .vt-barras button').nth(0), pausa=300)
            t.paso('validado')

            # 4. ajustes con nota
            t.clic(p.locator('#vtBanda [data-vt="ir"][data-sec="dueno"]'), pausa=1200)
            t.clic(p.locator('.vt-verd[data-sec="dueno"][data-v="ajustes"]'), pausa=900)
            t.paso('ajustes')
            t.escribir(p.locator('#vtTa-dueno'), 'Falta el Gerente de Operaciones y Logística como participante: programa el despacho y responde por la ventana semanal.')
            t.apuntar(p.locator('.vt-panel[data-vt-sec="dueno"] [data-vt="dictar"]'), pausa=300)
            t.paso('dictar')
            t.apuntar(p.locator('.vt-panel[data-vt-sec="dueno"] details.vt-sesgo'), pausa=300)
            t.paso('sesgo')
            t.clic(p.locator('[data-vt="guardar"][data-sec="dueno"]'), pausa=1200)
            t.paso('guardada')
            t.clic(p.locator('#vtBanda [data-vt="ir"][data-sec="disparador"]'), pausa=1000)
            t.clic(p.locator('.vt-verd[data-sec="disparador"][data-v="valida"]'), pausa=900)

            # 5. anotar una actividad
            t.clic(p.locator('#vtBanda [data-vt="ir"][data-sec="flujo"]'), pausa=1200)
            act = p.locator('#secb-flujo ol.f2-num-list > li').nth(6)
            t.apuntar(act.locator('.vt-anotar'), pausa=300)
            t.paso('anotar')
            t.clic(act.locator('.vt-anotar'), pausa=1200)
            t.escribir(p.locator('#vtTa-flujo'), 'Si lo recibido no coincide con lo facturado, falta quién registra la diferencia y en qué plazo.')
            t.clic(p.locator('[data-vt="guardar"][data-sec="flujo"]'), pausa=1200)
            t.clic(p.locator('.vt-verd[data-sec="flujo"][data-v="ajustes"]'), pausa=1200)
            t.apuntar(act, pausa=300)
            t.paso('anotada')
            for sec in ('riesgos', 'indicadores'):
                t.clic(p.locator('#vtBanda [data-vt="ir"][data-sec="%s"]' % sec), pausa=800)
                t.clic(p.locator('.vt-verd[data-sec="%s"][data-v="valida"]' % sec), pausa=800)
            t.apuntar(p.locator('#vtBanda .vt-barras'), pausa=300)
            t.paso('seis')

            # 6. cierre y envío
            t.clic(p.locator('#vtBanda [data-vt="cierre"]'), pausa=1500)
            t.paso('lista')
            for k in ('asis', 'est', 'dec', 'sesgo'):
                t.clic(p.locator('#vtL-' + k), pausa=450)
            t.apuntar(p.locator('.vt-consulta'), pausa=300)
            t.paso('consulta')
            t.clic(p.locator('[data-vt="enviar"]'), pausa=2000)
            p.wait_for_selector('.vt-enviada, .vt-ok', timeout=30000)
            t.apuntar(p.locator('.vt-enviada, .vt-ok').first, pausa=300)
            t.paso('enviada')
            t.paso('confirmar')

            # 7. historial
            t.clic(p.locator('#vtBanda [data-vt="historial"]'), pausa=1500)
            t.apuntar(p.locator('#vtHist .vt-tl li').first, pausa=300)
            t.paso('historial')
            t.callar()

            # 8. agente: dudas
            t.tarjeta('agente', minimo=5)
            t.clic(p.locator('#agFab'), pausa=1500)
            t.paso('abrir', izq=True)
            t.escribir(p.locator('#agEntrada'), '¿Qué notas tiene este proceso y qué cambia frente al As-Is? Resúmelo en pocas líneas.')
            t.clic(p.locator('#agEnviar'), pausa=400)
            t.esperar('pregunta', "() => !document.querySelector('#agEnviar').disabled && !document.querySelector('.ag-estado')")
            p.evaluate("() => { var l = document.querySelector('#agLista'); l.scrollTop = l.scrollHeight; }")
            t.paso('respuesta', izq=True, extra=1.0)

            # 9. agente: cambiar el flujo
            t.paso('cambio', izq=True)
            t.escribir(p.locator('#agEntrada'), 'Propón en el flujo de 9.3: si en la recepción hay diferencias con lo facturado, el Gerente de Tienda las reporta a Logística en 24 horas para el ajuste.')
            t.clic(p.locator('#agEnviar'), pausa=400)
            t.esperar('armando', "() => document.querySelector('#agLista .ag-prop [data-ag=\"aplicar\"]') && !document.querySelector('.ag-estado')")
            tarjeta = p.locator('#agLista .ag-prop').last
            t.apuntar(tarjeta.locator('.ag-dif'), pausa=300)
            t.paso('propuesta', izq=True)
            t.apuntar(tarjeta.locator('.ag-prev'), pausa=1200)
            t.clic(tarjeta.locator('[data-ag="aplicar"]'), pausa=300)
            t.esperar('decidir', "() => document.querySelector('#agLista .ag-prop.ag-ok') && !document.querySelector('#agEnviar').disabled && !document.querySelector('.ag-estado')")
            t.clic(p.locator('#agPanel [data-ag="cerrar"]'), pausa=1000)
            p.evaluate("() => { location.hash = '#/tobe/%s/flujo'; }" % COD)
            p.wait_for_selector('#secb-flujo .f2-plat', timeout=30000)
            p.wait_for_timeout(800)
            t.apuntar(p.locator('#secb-flujo .f2-plat'), pausa=300)
            t.paso('aplicado')

            # 10. conversaciones
            t.clic(p.locator('#agFab'), pausa=1200)
            t.clic(p.locator('#agPanel [data-ag="lista"]'), pausa=1500)
            p.wait_for_selector('.ag-conv', timeout=20000)
            t.apuntar(p.locator('.ag-conv').first, pausa=300)
            t.paso('conversaciones', izq=True)
            t.callar()
            t.tarjeta('cierre', minimo=7.5)
            t.cerrar(nav)
    finally:
        limpiar(t.correo)
