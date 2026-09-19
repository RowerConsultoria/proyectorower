-- ============================================================
-- 19-sep-2026 — Historial de fichas_perfil (red de seguridad del censo)
--
-- Por qué: el formulario de `actualizacion-perfil/` reescribía la ficha ENTERA
-- en cada guardado, así que un campo que no se hubiera pintado se guardaba
-- vacío y el valor anterior desaparecía sin dejar rastro. Se midió: 73 periodos
-- de «posiciones anteriores» borrados en 46 personas, irrecuperables porque el
-- proyecto no tiene PITR ni copias diarias.
--
-- Esta tabla es el diario: cada UPDATE y cada DELETE de fichas_perfil deja
-- registrado el valor ANTERIOR de las columnas que cambiaron. Con la fila viva
-- más el diario se reconstruye cualquier momento pasado.
--
-- ⚠️ A PROPÓSITO no lleva clave foránea a fichas_perfil ni a personal: ambas
-- cuelgan con `on delete cascade`, y una foránea haría que borrar a la persona
-- se llevara por delante justo la prueba de lo que tenía. El historial debe
-- sobrevivir al borrado de lo que historia.
-- ============================================================

create table if not exists public.fichas_perfil_historial (
  id             bigint generated always as identity primary key,
  ficha_id       uuid   not null,
  persona_id     uuid   not null,
  operacion      text   not null check (operacion in ('update','delete')),
  columnas       text[] not null,          -- qué cambió
  anterior       jsonb  not null,          -- valores viejos SOLO de esas columnas
  nuevo          jsonb,                    -- valores nuevos (null en un delete)
  hubo_vaciado   boolean not null default false,  -- algo lleno pasó a vacío
  actor          text,
  registrado_en  timestamptz not null default now()
);

create index if not exists fichas_perfil_historial_persona_idx
  on public.fichas_perfil_historial (persona_id, registrado_en desc);
create index if not exists fichas_perfil_historial_vaciado_idx
  on public.fichas_perfil_historial (registrado_en desc) where hubo_vaciado;

comment on table public.fichas_perfil_historial is
  'Diario de cambios de fichas_perfil. Sin foránea a propósito: debe sobrevivir al on delete cascade.';

-- ------------------------------------------------------------
-- El trigger
-- ------------------------------------------------------------
create or replace function public.registrar_historial_ficha()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_ant   jsonb;
  v_nue   jsonb;
  v_cols  text[];
  v_vacio boolean := false;
begin
  -- `rower.actor` deja firmar una intervención administrativa sin tocar
  -- `llenada_por`, que es el nombre de la persona y no un campo de auditoría:
  --   set local rower.actor = 'rescate-48-20260919';
  if tg_op = 'DELETE' then
    insert into public.fichas_perfil_historial
      (ficha_id, persona_id, operacion, columnas, anterior, nuevo, hubo_vaciado, actor)
    values (old.id, old.persona_id, 'delete',
            array(select jsonb_object_keys(to_jsonb(old))), to_jsonb(old), null, true,
            coalesce(nullif(current_setting('rower.actor', true), ''), old.llenada_por, current_user));
    return old;
  end if;

  -- Solo las columnas que cambiaron de verdad. `actualizado_en` lo mueve el
  -- trigger de touch en cada escritura, así que no cuenta como cambio.
  select array_agg(o.key order by o.key),
         jsonb_object_agg(o.key, o.value),
         jsonb_object_agg(o.key, to_jsonb(new) -> o.key)
    into v_cols, v_ant, v_nue
    from jsonb_each(to_jsonb(old)) o
   where o.key <> 'actualizado_en'
     and o.value is distinct from (to_jsonb(new) -> o.key);

  if v_cols is null then
    return new;                      -- un guardado que no cambió nada: no ensucia el diario
  end if;

  -- ¿Se perdió algo? Texto no vacío que queda vacío/nulo, o lista que se acorta.
  select bool_or(
           case jsonb_typeof(o.value)
             when 'string' then btrim(o.value #>> '{}') <> ''
                                and coalesce(btrim((to_jsonb(new) -> o.key) #>> '{}'), '') = ''
             when 'array'  then jsonb_array_length(o.value)
                                > jsonb_array_length(coalesce(to_jsonb(new) -> o.key, '[]'::jsonb))
             else false
           end)
    into v_vacio
    from jsonb_each(to_jsonb(old)) o
   where o.key = any(v_cols);

  insert into public.fichas_perfil_historial
    (ficha_id, persona_id, operacion, columnas, anterior, nuevo, hubo_vaciado, actor)
  values (old.id, old.persona_id, 'update', v_cols, v_ant, v_nue,
          coalesce(v_vacio, false),
          coalesce(nullif(current_setting('rower.actor', true), ''), new.llenada_por, current_user));
  return new;
end;
$$;

drop trigger if exists trg_fichas_perfil_historial     on public.fichas_perfil;
drop trigger if exists trg_fichas_perfil_historial_del on public.fichas_perfil;
create trigger trg_fichas_perfil_historial
  after update on public.fichas_perfil
  for each row execute function public.registrar_historial_ficha();
create trigger trg_fichas_perfil_historial_del
  after delete on public.fichas_perfil
  for each row execute function public.registrar_historial_ficha();

-- ------------------------------------------------------------
-- RLS: lo mismo que fichas_perfil, y SOLO lectura desde el panel.
-- Nadie con sesión puede escribir ni borrar el diario; lo llena el trigger,
-- que corre como security definer.
-- ------------------------------------------------------------
alter table public.fichas_perfil_historial enable row level security;
drop policy if exists fichas_perfil_historial_lectura on public.fichas_perfil_historial;
create policy fichas_perfil_historial_lectura on public.fichas_perfil_historial
  for select to authenticated using (public.tiene_permiso('admin.fichas'));

revoke insert, update, delete on public.fichas_perfil_historial from authenticated, anon;

-- ------------------------------------------------------------
-- Atajo para mirar las pérdidas sin escribir la consulta a mano.
-- ------------------------------------------------------------
create or replace view public.v_fichas_vaciados
with (security_invoker = on) as
select h.registrado_en, p.nombre, p.entidad, h.columnas, h.anterior, h.nuevo, h.actor
  from public.fichas_perfil_historial h
  left join public.personal p on p.id = h.persona_id
 where h.hubo_vaciado
 order by h.registrado_en desc;
