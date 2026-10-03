# -*- coding: utf-8 -*-
"""Comprueba las reglas de la validación del To-Be por el comité (§15 de schema.sql).

Recorre en la base viva el ciclo completo de una validación —habilitar,
veredictos, notas, enviar, responder, confirmar, reabrir— simulando las
sesiones de tres cuentas reales: una de la secretaría técnica (`admin.validacion`)
y dos lectores del manual sin ese permiso. Todo corre dentro de un único bloque
que termina en `raise exception`, así que **nada queda escrito**: ni la
habilitación, ni las filas, ni el diario.

Comprueba lo que la página no puede garantizar: la RLS (cada integrante solo ve
lo suyo, anon no ve nada), los guardias (no se edita lo enviado, el estado de
una nota lo fija la secretaría, el envío exige las seis secciones, una nota en
cada ajuste y la lista) y la vista `v_estado_tobe` que pinta el menú.

Uso:
    python scripts/comprobar-validacion-comite.py

Necesita SUPABASE_ACCESS_TOKEN y SUPABASE_PROJECT_REF en el .env de la raíz
(la API de gestión ejecuta el SQL). Sale con código 1 si algo falla.
"""
import json
import os
import re
import sys
import urllib.error
import urllib.request

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def entorno():
    env = dict(os.environ)
    ruta = os.path.join(RAIZ, '.env')
    if os.path.exists(ruta):
        for linea in open(ruta, encoding='utf-8'):
            m = re.match(r'\s*([A-Z_]+)\s*=\s*(.*)\s*$', linea)
            if m and m.group(1) not in env:
                env[m.group(1)] = m.group(2).strip().strip('"').strip("'")
    if not env.get('SUPABASE_ACCESS_TOKEN') or not env.get('SUPABASE_PROJECT_REF'):
        sys.exit('Faltan SUPABASE_ACCESS_TOKEN y SUPABASE_PROJECT_REF (en el entorno o en .env).')
    return env


ENV = entorno()


def sql(consulta):
    pet = urllib.request.Request(
        'https://api.supabase.com/v1/projects/%s/database/query' % ENV['SUPABASE_PROJECT_REF'],
        data=json.dumps({'query': consulta}).encode('utf-8'),
        headers={'Authorization': 'Bearer ' + ENV['SUPABASE_ACCESS_TOKEN'],
                 'Content-Type': 'application/json',
                 # La API de gestión responde 403 (Cloudflare 1010) al User-Agent de urllib.
                 'User-Agent': 'rower-comprobaciones/1.0'})
    try:
        return json.load(urllib.request.urlopen(pet, timeout=60))
    except urllib.error.HTTPError as e:
        return {'error': e.code, 'cuerpo': e.read().decode('utf-8', 'replace')}


cuentas = sql("""
  select
    (select pf.id from perfiles pf where pf.activo
        and exists (select 1 from roles_permisos rp where rp.rol = pf.rol and rp.permiso = 'admin.validacion')
        and exists (select 1 from roles_permisos rp where rp.rol = pf.rol and rp.permiso = 'ver.informe')
        and not exists (select 1 from validadores_tobe v where v.perfil_id = pf.id)
      order by pf.creado_en limit 1) as s,
    (select array_agg(id) from (
       select pf.id from perfiles pf where pf.activo
          and exists (select 1 from roles_permisos rp where rp.rol = pf.rol and rp.permiso = 'ver.informe')
          and not exists (select 1 from roles_permisos rp where rp.rol = pf.rol and rp.permiso = 'admin.validacion')
          and not exists (select 1 from validadores_tobe v where v.perfil_id = pf.id)
        order by pf.creado_en limit 2) x) as lectores
""")
if not isinstance(cuentas, list) or not cuentas[0]['s'] or not cuentas[0]['lectores'] or len(cuentas[0]['lectores']) < 2:
    sys.exit('No hay cuentas para simular: hacen falta una con admin.validacion y dos lectores sin habilitar. ' + str(cuentas)[:300])
S = cuentas[0]['s']
J, K = cuentas[0]['lectores'][:2]
# Un proceso que nadie esté validando, para no tropezar con filas reales.
libre = sql("select codigo from (values ('20.6'),('20.5'),('19.6'),('16.8')) v(codigo) "
            "where not exists (select 1 from validaciones_tobe t where t.proceso = v.codigo) limit 1")
P = libre[0]['codigo'] if isinstance(libre, list) and libre else None
if not P:
    sys.exit('Los procesos de prueba ya tienen validaciones reales; elige otro en el guion.')


def como(u):
    return "perform set_config('request.jwt.claims', '{\"sub\":\"%s\",\"role\":\"authenticated\"}', true); execute 'set local role authenticated';" % u


BLOQUE = """
do $t$
declare r text := ''; v public.validaciones_tobe; n1 uuid; n2 uuid; x int; e text;
begin
  COMO_J
  r := r || ' puede_antes=' || public.puede_validar_tobe();
  begin insert into public.validaciones_tobe(proceso, perfil_id) values ('PP','JJ'); r := r || ' alta_sin_habilitar=MAL'; exception when others then r := r || ' alta_sin_habilitar=ok'; end;
  execute 'reset role';
  insert into public.validadores_tobe(perfil_id) values ('JJ');
  COMO_J
  r := r || ' puede_despues=' || public.puede_validar_tobe();
  insert into public.validaciones_tobe(proceso, perfil_id, veredictos) values ('PP','JJ','{"proposito":"valida"}') returning * into v;
  r := r || ' estado_inicial=' || v.estado;
  begin update public.validaciones_tobe set veredictos = '{"x":"valida"}' where id = v.id; r := r || ' veredicto_invalido=MAL'; exception when others then r := r || ' veredicto_invalido=ok'; end;
  begin update public.validaciones_tobe set estado = 'enviada' where id = v.id; r := r || ' estado_a_mano=MAL'; exception when others then r := r || ' estado_a_mano=ok'; end;
  begin perform public.validacion_tobe_enviar(v.id, 'h'); r := r || ' envio_incompleto=MAL'; exception when others then r := r || ' envio_incompleto=ok'; end;
  insert into public.notas_tobe(validacion_id, seccion, tipo, ancla_id, ancla_n, ancla_texto, texto)
    values (v.id, 'flujo', 'voz', 'a2', 2, 'texto leído', 'nota de prueba') returning id into n1;
  select count(*) into x from public.notas_tobe where id = n1 and estado = 'borrador' and proceso = 'PP' and perfil_id = 'JJ';
  r := r || ' nota_heredada=' || x;
  update public.validaciones_tobe set
     veredictos = '{"proposito":"valida","dueno":"valida","disparador":"valida","flujo":"ajustes","riesgos":"valida","indicadores":"no"}',
     lista = '{"asis":true,"est":true,"dec":true,"sesgo":true}' where id = v.id;
  insert into public.notas_tobe(validacion_id, seccion, tipo, texto) values (v.id, 'indicadores', 'escrita', 'sin meta') returning id into n2;
  insert into public.notas_tobe(validacion_id, tipo, texto, consulta_a, consulta_respuesta) values (v.id, 'consulta', 'plazo', 'Contabilidad', '30 días');
  v := public.validacion_tobe_enviar(v.id, 'h');
  select count(*) into x from public.notas_tobe where validacion_id = v.id and estado = 'por_revisar';
  r := r || ' tras_enviar=' || v.estado || '/' || x;
  begin update public.notas_tobe set estado = 'se_incorpora' where id = n1; r := r || ' integrante_fija_estado=MAL'; exception when others then r := r || ' integrante_fija_estado=ok'; end;
  begin insert into public.notas_tobe(validacion_id, seccion, tipo, texto) values (v.id, 'flujo', 'escrita', 'otra'); r := r || ' nota_tras_envio=MAL'; exception when others then r := r || ' nota_tras_envio=ok'; end;
  begin delete from public.notas_tobe where id = n1; r := r || ' borrar_enviada=MAL'; exception when others then r := r || ' borrar_enviada=ok'; end;
  begin perform public.validacion_tobe_confirmar(v.id); r := r || ' confirmar_pronto=MAL'; exception when others then r := r || ' confirmar_pronto=ok'; end;
  select estado into e from public.v_estado_tobe where proceso = 'PP'; r := r || ' vista_enviada=' || coalesce(e, 'null');
  execute 'reset role';
  COMO_S
  select count(*) into x from public.notas_tobe where validacion_id = v.id; r := r || ' secretaria_ve=' || x;
  update public.notas_tobe set estado = 'se_incorpora', respuesta = 'hecho' where id = n1;
  begin update public.notas_tobe set estado = 'no_se_incorpora' where id = n2; r := r || ' no_incorporar_sin_motivo=MAL'; exception when others then r := r || ' no_incorporar_sin_motivo=ok'; end;
  update public.notas_tobe set estado = 'no_se_incorpora', respuesta = 'motivo' where id = n2;
  select count(*) into x from public.secretaria_usuarios() su where su.id = 'JJ' and su.habilitado; r := r || ' lista_cuentas=' || x;
  execute 'reset role';
  COMO_J
  begin perform public.secretaria_usuarios(); r := r || ' cuentas_sin_permiso=MAL'; exception when others then r := r || ' cuentas_sin_permiso=ok'; end;
  v := public.validacion_tobe_confirmar(v.id);
  select estado into e from public.notas_tobe where id = n1;
  r := r || ' tras_confirmar=' || v.estado || '/' || e;
  select estado into e from public.v_estado_tobe where proceso = 'PP'; r := r || ' vista_validada=' || e;
  v := public.validacion_tobe_reabrir(v.id);
  select estado into e from public.v_estado_tobe where proceso = 'PP'; r := r || ' tras_reabrir=' || v.estado || '/' || e;
  execute 'reset role';
  COMO_K
  select count(*) into x from public.validaciones_tobe where proceso = 'PP'; r := r || ' ajenas=' || x;
  begin perform public.validacion_tobe_reabrir(v.id); r := r || ' mover_ajena=MAL'; exception when others then r := r || ' mover_ajena=ok'; end;
  execute 'reset role';
  execute 'set local role anon';
  begin select count(*) into x from public.v_estado_tobe; r := r || ' anon=MAL'; exception when others then r := r || ' anon=ok'; end;
  execute 'reset role';
  -- borrar la validación con notas enviadas (lo que pasa al borrar una cuenta)
  delete from public.validaciones_tobe where id = v.id;
  select count(*) into x from public.notas_tobe where validacion_id = v.id; r := r || ' cascada=' || x;
  raise exception 'RESULTADOS:%', r;
end $t$;
"""
bloque = (BLOQUE.replace('COMO_J', como(J)).replace('COMO_S', como(S)).replace('COMO_K', como(K))
          .replace('JJ', J).replace('PP', P))
res = sql(bloque)
# El bloque termina en raise exception: los resultados viajan en el mensaje del error.
mensaje = ''
if isinstance(res, dict) and 'cuerpo' in res:
    try:
        mensaje = json.loads(res['cuerpo']).get('message', '')
    except ValueError:
        mensaje = res['cuerpo']
m = re.search(r'RESULTADOS:([^\n]*)', mensaje)
if not m:
    print('La comprobación no llegó al final:', json.dumps(res, ensure_ascii=False)[:1500])
    sys.exit(1)

ESPERADO = {
    'puede_antes': 'false', 'alta_sin_habilitar': 'ok', 'puede_despues': 'true', 'estado_inicial': 'en_revision',
    'veredicto_invalido': 'ok', 'estado_a_mano': 'ok', 'envio_incompleto': 'ok', 'nota_heredada': '1',
    'tras_enviar': 'enviada/3', 'integrante_fija_estado': 'ok', 'nota_tras_envio': 'ok', 'borrar_enviada': 'ok',
    'confirmar_pronto': 'ok', 'vista_enviada': 'en_validacion', 'secretaria_ve': '3', 'no_incorporar_sin_motivo': 'ok',
    'lista_cuentas': '1', 'cuentas_sin_permiso': 'ok', 'tras_confirmar': 'validada/confirmada',
    'vista_validada': 'validado', 'tras_reabrir': 'en_revision/en_validacion', 'ajenas': '0', 'mover_ajena': 'ok',
    'anon': 'ok', 'cascada': '0',
}
obtenido = dict(par.split('=', 1) for par in m.group(1).split())
fallos = 0
for clave, valor in ESPERADO.items():
    real = obtenido.get(clave)
    bien = real == valor
    fallos += 0 if bien else 1
    print(('OK    ' if bien else 'FALLA ') + clave + ('' if bien else '  (esperaba %s, salió %s)' % (valor, real)))
print('\n%d de %d comprobaciones en el proceso %s; nada quedó escrito.' % (len(ESPERADO) - fallos, len(ESPERADO), P))
sys.exit(1 if fallos else 0)
