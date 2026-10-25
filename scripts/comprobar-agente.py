# -*- coding: utf-8 -*-
"""Comprueba las reglas del Agente IA del manual y de los flujos del To-Be (§16 de schema.sql).

Simula en la base viva las sesiones de tres cuentas reales —una con admin.usuarios
y dos lectores del manual sin habilitar— dentro de un bloque que termina en
`raise exception`, así que **nada queda escrito**. Comprueba:

  · quién puede usar el agente: nadie por defecto, sí con el interruptor de la
    cuenta o habilitado en el comité, nadie con el interruptor general apagado;
  · que solo admin.usuarios cambia los interruptores;
  · que ninguna sesión publica un flujo directo (ni con el agente activado): lo
    publica solo la Edge Function con la clave de servicio, tras validarlo; que la
    versión la numera la base, que no se edita ni se borra salvo intervención
    firmada, que la vista de vigentes devuelve la última y que la línea de tiempo
    la registra;
  · que la estructura se cambia solo con su interruptor propio, que tampoco se
    publica directo y que sus versiones no se editan ni se borran;
  · que quien usa el agente lee las notas publicadas.

Uso:  python scripts/comprobar-agente.py
Necesita SUPABASE_ACCESS_TOKEN y SUPABASE_PROJECT_REF en el .env. Sale con 1 si algo falla.
"""
import json
import os
import re
import sys

RAIZ = os.path.dirname(os.path.abspath(__file__))
# Reutiliza el cliente SQL de la otra comprobación sin correrla: solo hasta antes de sus casos.
_src = open(os.path.join(RAIZ, 'comprobar-validacion-comite.py'), encoding='utf-8').read()
_ns = {'__file__': os.path.join(RAIZ, 'comprobar-validacion-comite.py'), '__name__': 'cvc'}
exec(_src[:_src.index('cuentas = sql(')], _ns)
sql = _ns['sql']

cuentas = sql("""
  select
    (select pf.id from perfiles pf where pf.activo
        and exists (select 1 from roles_permisos rp where rp.rol = pf.rol and rp.permiso = 'admin.usuarios')
        and exists (select 1 from roles_permisos rp where rp.rol = pf.rol and rp.permiso = 'ver.informe')
      order by pf.creado_en limit 1) as a,
    (select array_agg(id) from (
       select pf.id from perfiles pf where pf.activo
          and exists (select 1 from roles_permisos rp where rp.rol = pf.rol and rp.permiso = 'ver.informe')
          and not exists (select 1 from roles_permisos rp where rp.rol = pf.rol and rp.permiso in ('admin.usuarios','admin.validacion'))
          and not exists (select 1 from validadores_tobe v where v.perfil_id = pf.id)
          and not exists (select 1 from agente_cuentas c where c.perfil_id = pf.id)
        order by pf.creado_en limit 2) x) as lectores
""")
if not isinstance(cuentas, list) or not cuentas[0]['a'] or not cuentas[0]['lectores'] or len(cuentas[0]['lectores']) < 2:
    sys.exit('No hay cuentas para simular: hacen falta una con admin.usuarios y dos lectores sin habilitar. ' + str(cuentas)[:300])
A = cuentas[0]['a']
J, K = cuentas[0]['lectores'][:2]
P = '99.99'   # un código que no existe: ninguna fila real se cruza con la prueba


def como(u):
    return "perform set_config('request.jwt.claims', '{\"sub\":\"%s\",\"role\":\"authenticated\"}', true); execute 'set local role authenticated';" % u


FLUJO = json.dumps({'actividades': [{'id': 'a1', 'rol': 'R', 'texto': 't'}],
                    'diagrama': {'carriles': ['R'], 'nodos': [], 'aristas': []}})

BLOQUE = """
do $t$
declare r text := ''; x int; y int; e text; b boolean; f public.flujos_tobe;
begin
  update public.config_plataforma set valor = '{"activo": true}' where clave = 'agente_ia';
  COMO_J
  r := r || ' sin_activar=' || public.puede_usar_agente();
  begin insert into public.agente_cuentas(perfil_id) values ('JJ'); r := r || ' se_activa_solo=MAL'; exception when others then r := r || ' se_activa_solo=ok'; end;
  begin update public.config_plataforma set valor = '{"activo": false}' where clave = 'agente_ia';
        get diagnostics x = row_count; r := r || ' global_sin_permiso=' || case when x = 0 then 'ok' else 'MAL' end;
  exception when others then r := r || ' global_sin_permiso=ok'; end;
  begin insert into public.flujos_tobe(proceso, flujo, resumen) values ('PP', 'FLUJO'::jsonb, 'x'); r := r || ' publica_sin_agente=MAL'; exception when others then r := r || ' publica_sin_agente=ok'; end;
  begin perform public.notas_publicadas_tobe('PP'); r := r || ' notas_sin_agente=MAL'; exception when others then r := r || ' notas_sin_agente=ok'; end;
  execute 'reset role';
  COMO_A
  insert into public.agente_cuentas(perfil_id, habilitado_por) values ('JJ', 'AA');
  select count(*) into x from public.agente_cuentas_admin() c where c.perfil_id = 'JJ' and c.por_cuenta; r := r || ' admin_ve=' || x;
  execute 'reset role';
  COMO_J
  r := r || ' con_interruptor=' || public.puede_usar_agente();
  r := r || ' mi_agente=' || (public.mi_agente()->>'por_cuenta');
  begin insert into public.flujos_tobe(proceso, flujo, resumen) values ('PP', 'FLUJO'::jsonb, 'directo'); r := r || ' publica_directo=MAL'; exception when others then r := r || ' publica_directo=ok'; end;
  execute 'reset role';
  -- La Edge Function publica con la clave de servicio: sin sesión, y firma con el autor.
  perform set_config('request.jwt.claims', '', true);
  insert into public.flujos_tobe(proceso, flujo, resumen, version, autor) values ('PP', 'FLUJO'::jsonb, 'primera', 99, 'JJ') returning * into f;
  r := r || ' version=' || f.version || ' firmada=' || (f.autor = 'JJ' and f.autor_nombre is not null);
  insert into public.flujos_tobe(proceso, flujo, resumen, autor, propuesta_id) values ('PP', 'FLUJO'::jsonb, 'segunda', 'JJ', 'sevt_prueba') returning * into f;
  r := r || ' version2=' || f.version;
  begin insert into public.flujos_tobe(proceso, flujo, resumen, autor, propuesta_id) values ('PP', 'FLUJO'::jsonb, 'doble', 'JJ', 'sevt_prueba'); r := r || ' doble_aplicar=MAL'; exception when others then r := r || ' doble_aplicar=ok'; end;
  begin update public.flujos_tobe set resumen = 'otro' where id = f.id; r := r || ' editar=MAL'; exception when others then r := r || ' editar=ok'; end;
  -- Dos «Aplicar» casi a la vez: el que llega con una base vieja se rechaza.
  begin insert into public.flujos_tobe(proceso, flujo, resumen, autor, base_version) values ('PP', 'FLUJO'::jsonb, 'carrera', 'JJ', 1); r := r || ' base_vieja=MAL'; exception when others then r := r || ' base_vieja=ok'; end;
  insert into public.flujos_tobe(proceso, flujo, resumen, autor, base_version) values ('PP', 'FLUJO'::jsonb, 'al dia', 'JJ', 2) returning * into f;
  r := r || ' base_al_dia=' || f.version;
  COMO_J
  select version into x from public.v_flujos_vigentes where proceso = 'PP'; r := r || ' vigente=' || x;
  select jsonb_array_length(public.notas_publicadas_tobe('PP')) into x; r := r || ' notas_con_agente=' || x;
  select count(*) into x from public.actividad_tobe where proceso = 'PP' and tipo = 'flujo_cambiado'; r := r || ' linea_tiempo=' || x;
  execute 'reset role';
  begin delete from public.flujos_tobe where proceso = 'PP'; r := r || ' borrar=MAL'; exception when others then r := r || ' borrar=ok'; end;
  perform set_config('rower.actor', 'comprobar-agente.py', true);
  delete from public.flujos_tobe where proceso = 'PP' and version = 1; get diagnostics x = row_count; r := r || ' borrar_firmado=' || x;
  perform set_config('rower.actor', '', true);
  -- La estructura: cambiarla pide además su propio interruptor; publicar, solo la función.
  COMO_J
  r := r || ' est_sin_permiso=' || public.puede_cambiar_estructura();
  begin insert into public.estructura_tobe(datos, resumen) values ('{"DIRECCIONES":[],"COMITES":[]}'::jsonb, 'directo'); r := r || ' est_directo=MAL'; exception when others then r := r || ' est_directo=ok'; end;
  execute 'reset role';
  COMO_A
  update public.agente_cuentas set estructura = true where perfil_id = 'JJ';
  execute 'reset role';
  COMO_J
  r := r || ' est_con_permiso=' || public.puede_cambiar_estructura() || ' est_mi_agente=' || (public.mi_agente()->>'estructura');
  execute 'reset role';
  perform set_config('request.jwt.claims', '', true);
  select coalesce(max(version), 0) into y from public.estructura_tobe;
  insert into public.estructura_tobe(datos, resumen, autor, propuesta_id) values ('{"DIRECCIONES":[],"COMITES":[]}'::jsonb, 'prueba', 'JJ', 'sevt_est_prueba');
  select version - y into x from public.estructura_tobe where propuesta_id = 'sevt_est_prueba'; r := r || ' est_version_sube=' || x;
  begin update public.estructura_tobe set resumen = 'otro' where propuesta_id = 'sevt_est_prueba'; r := r || ' est_editar=MAL'; exception when others then r := r || ' est_editar=ok'; end;
  begin delete from public.estructura_tobe where propuesta_id = 'sevt_est_prueba'; r := r || ' est_borrar=MAL'; exception when others then r := r || ' est_borrar=ok'; end;
  COMO_K
  select count(*) into x from public.v_estructura_vigente; r := r || ' est_lector_lee=' || x;
  execute 'reset role';
  COMO_K
  select count(*) into x from public.v_flujos_vigentes where proceso = 'PP'; r := r || ' lector_ve_flujo=' || x;
  r := r || ' lector_sin_agente=' || public.puede_usar_agente();
  execute 'reset role';
  update public.config_plataforma set valor = '{"activo": false}' where clave = 'agente_ia';
  COMO_J
  r := r || ' global_apagado=' || public.puede_usar_agente();
  execute 'reset role';
  insert into public.validadores_tobe(perfil_id) values ('KK');
  update public.config_plataforma set valor = '{"activo": true}' where clave = 'agente_ia';
  COMO_K
  r := r || ' por_comite=' || public.puede_usar_agente();
  execute 'reset role';
  execute 'set local role anon';
  begin select count(*) into x from public.v_flujos_vigentes; r := r || ' anon=MAL'; exception when others then r := r || ' anon=ok'; end;
  execute 'reset role';
  raise exception 'RESULTADOS:%', r;
end $t$;
"""
bloque = (BLOQUE.replace('COMO_J', como(J)).replace('COMO_K', como(K)).replace('COMO_A', como(A))
          .replace('FLUJO', FLUJO).replace('JJ', J).replace('KK', K).replace('AA', A).replace("'PP'", "'%s'" % P))
res = sql(bloque)
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
    'sin_activar': 'false', 'se_activa_solo': 'ok', 'global_sin_permiso': 'ok', 'publica_sin_agente': 'ok',
    'notas_sin_agente': 'ok', 'admin_ve': '1', 'con_interruptor': 'true', 'mi_agente': 'true',
    'publica_directo': 'ok', 'version': '1', 'firmada': 'true', 'version2': '2', 'doble_aplicar': 'ok', 'editar': 'ok',
    'base_vieja': 'ok', 'base_al_dia': '3', 'vigente': '3', 'notas_con_agente': '0', 'linea_tiempo': '3', 'borrar': 'ok', 'borrar_firmado': '1',
    'lector_ve_flujo': '1', 'lector_sin_agente': 'false',
    'global_apagado': 'false', 'por_comite': 'true', 'anon': 'ok',
    'est_sin_permiso': 'false', 'est_directo': 'ok', 'est_con_permiso': 'true', 'est_mi_agente': 'true',
    'est_version_sube': '1', 'est_editar': 'ok', 'est_borrar': 'ok', 'est_lector_lee': '1',
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
