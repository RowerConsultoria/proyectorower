-- ============================================================
-- 03-oct-2026 — La validación del To-Be pasa al Comité y a la Secretaría técnica
--
-- Se aplica DESPUÉS de la §15 de schema.sql, que borra las tablas de la
-- validación por gerentes (procesos_fase2, procesos_validadores, validaciones,
-- validacion_tokens y la vista v_validadores_proceso) y crea las nuevas
-- (validadores_tobe, validaciones_tobe, notas_tobe, v_estado_tobe y sus
-- funciones). Este archivo hace lo que schema.sql no lleva:
--
--   1. Registra las tablas nuevas en el diario `historial` (el trigger y la
--      tabla nacen en 2026-09-19-historial-generico.sql, no en schema.sql).
--   2. Renombra el permiso admin.validacion en la base viva: la semilla de
--      schema.sql ya trae el nombre nuevo, pero su `on conflict` solo corre
--      cuando se re-ejecuta el archivo entero.
--
-- Las filas de la validación por gerentes (182 procesos proyectados, 268
-- propuestas de validador —una confirmada—, 0 validaciones y 1 enlace) se
-- respaldaron antes de borrar, fuera del repo:
--   Rower/respaldos-validacion-03oct/validacion-gerentes-2026-10-03.json
-- La función desplegada `validacion` se borró del proyecto ese mismo día.
-- ============================================================

do $$
declare
  t record;
begin
  if to_regprocedure('public.registrar_historial()') is null
     and not exists (select 1 from pg_proc where proname = 'registrar_historial') then
    raise notice 'no existe registrar_historial(): aplicar antes 2026-09-19-historial-generico.sql';
    return;
  end if;
  for t in
    select * from (values
      -- tabla,               clave,       persona
      ('validadores_tobe',    'perfil_id', 'perfil_id'),
      ('validaciones_tobe',   'id',        'perfil_id'),
      ('notas_tobe',          'id',        'perfil_id')
    ) as v(tabla, clave, persona)
  loop
    if to_regclass('public.' || t.tabla) is null then
      raise notice 'no existe public.%, se salta', t.tabla;
      continue;
    end if;
    execute format('drop trigger if exists trg_%s_historial     on public.%I', t.tabla, t.tabla);
    execute format('drop trigger if exists trg_%s_historial_del on public.%I', t.tabla, t.tabla);
    execute format(
      'create trigger trg_%s_historial after update on public.%I
         for each row execute function public.registrar_historial(%L, %L)',
      t.tabla, t.tabla, t.clave, t.persona);
    execute format(
      'create trigger trg_%s_historial_del after delete on public.%I
         for each row execute function public.registrar_historial(%L, %L)',
      t.tabla, t.tabla, t.clave, t.persona);
  end loop;
end $$;

update public.permisos
   set nombre = 'Secretaría técnica',
       descripcion = 'Elegir qué cuentas validan el modelo To-Be de Fase 2, recibir sus notas, responder cada una y seguir el estado de los 182 procesos.'
 where clave = 'admin.validacion';
