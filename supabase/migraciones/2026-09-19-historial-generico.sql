-- ============================================================
-- 19-sep-2026 — Un solo diario de cambios para todo el dato que se recoge
--
-- El diario nació esta misma madrugada para `fichas_perfil`, después de que
-- el formulario borrara 73 «periodos» de posiciones anteriores en 46 personas
-- sin dejar rastro. Aquí se generaliza: el censo, los enlaces y todo el módulo
-- de validación se escriben igual —el cliente manda el objeto entero y el
-- servidor lo reemplaza— así que corren exactamente el mismo riesgo, y el
-- proyecto sigue sin PITR ni copias diarias de las que tirar.
--
-- Sustituye a `fichas_perfil_historial`, cuyas filas se migran aquí.
--
-- ⚠️ SIN clave foránea a propósito, y no es un descuido: `fichas_perfil`,
-- `fichas_tokens`, `procesos_validadores`, `validaciones` y
-- `validacion_tokens` cuelgan de `personal` con `on delete cascade`. Una
-- foránea haría que dar de baja a una persona se llevara por delante justo la
-- prueba de lo que tenía. El diario debe sobrevivir a lo que historia.
-- ============================================================

create table if not exists public.historial (
  id             bigint generated always as identity primary key,
  tabla          text   not null,
  fila_id        text   not null,        -- text: hay claves uuid y claves texto («9.3»)
  persona_id     uuid,                   -- cuando la fila cuelga de alguien, para buscarla por persona
  operacion      text   not null check (operacion in ('update','delete')),
  columnas       text[] not null,        -- qué cambió
  anterior       jsonb  not null,        -- los valores VIEJOS de esas columnas
  nuevo          jsonb,                  -- los nuevos (null en un borrado)
  hubo_vaciado   boolean not null default false,
  actor          text,
  registrado_en  timestamptz not null default now()
);

create index if not exists historial_tabla_idx   on public.historial (tabla, registrado_en desc);
create index if not exists historial_fila_idx    on public.historial (tabla, fila_id);
create index if not exists historial_persona_idx on public.historial (persona_id, registrado_en desc)
  where persona_id is not null;
create index if not exists historial_vaciado_idx on public.historial (registrado_en desc)
  where hubo_vaciado;

comment on table public.historial is
  'Diario de cambios de las tablas que recogen dato de personas. Sin foránea a propósito: debe sobrevivir al on delete cascade.';

-- ------------------------------------------------------------
-- El trigger, uno solo para todas
--
--   tg_argv[0] = columna de clave primaria
--   tg_argv[1] = columna con el uuid de la persona ('' si la tabla no la tiene)
--   tg_argv[2…] = columnas especiales:
--                 «col»  → el cambio se registra, pero en vez del valor va una
--                          marca de tamaño (para blobs de cientos de kB).
--                 «!col» → se ignora del todo, ni siquiera cuenta como cambio.
--                          Es para contadores de trastienda como `usos` de los
--                          tokens, que se mueven en CADA apertura del enlace:
--                          sin esto el diario se llena de ruido —las fichas
--                          llevan 1053 aperturas— y esconde lo que importa.
-- ------------------------------------------------------------
/** Para una columna omitida devuelve una marca de tamaño; para el resto, el valor. */
create or replace function public.valor_o_marca(clave text, valor jsonb, omitidas text[])
returns jsonb language sql immutable as $$
  select case
    when not (clave = any(omitidas)) then valor
    when valor is null then null
    else jsonb_build_object('_omitido', length(valor::text) || ' caracteres')
  end;
$$;

create or replace function public.registrar_historial()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_pk      text := coalesce(tg_argv[0], 'id');
  v_pcol    text := nullif(coalesce(tg_argv[1], ''), '');
  v_omitir  text[] := array[]::text[];          -- valor no guardado, cambio sí registrado
  v_ignorar text[] := array['actualizado_en'];  -- ni siquiera cuenta como cambio
  v_old     jsonb  := to_jsonb(old);
  v_new     jsonb;
  v_ant     jsonb;
  v_nue     jsonb;
  v_cols    text[];
  v_vacio   boolean := false;
  i         int;
begin
  for i in 2 .. coalesce(array_length(tg_argv, 1), 0) - 1 loop
    if left(tg_argv[i], 1) = '!' then
      v_ignorar := v_ignorar || substr(tg_argv[i], 2);
    else
      v_omitir := v_omitir || tg_argv[i];
    end if;
  end loop;

  if tg_op = 'DELETE' then
    insert into public.historial
      (tabla, fila_id, persona_id, operacion, columnas, anterior, nuevo, hubo_vaciado, actor)
    values (tg_table_name, v_old ->> v_pk,
            case when v_pcol is null then null else (v_old ->> v_pcol)::uuid end,
            'delete',
            array(select k from jsonb_object_keys(v_old) k where not (k = any(v_ignorar))),
            (select coalesce(jsonb_object_agg(k, public.valor_o_marca(k, v_old -> k, v_omitir)), '{}'::jsonb)
               from jsonb_object_keys(v_old) k where not (k = any(v_ignorar))),
            null, true,
            coalesce(nullif(current_setting('rower.actor', true), ''), current_user));
    return old;
  end if;

  v_new := to_jsonb(new);

  -- Solo lo que cambió de verdad. `actualizado_en` lo mueve el trigger de touch
  -- en toda escritura, así que no cuenta como cambio y un reguardado idéntico
  -- no ensucia el diario.
  select array_agg(o.key order by o.key),
         jsonb_object_agg(o.key, public.valor_o_marca(o.key, o.value, v_omitir)),
         jsonb_object_agg(o.key, public.valor_o_marca(o.key, v_new -> o.key, v_omitir))
    into v_cols, v_ant, v_nue
    from jsonb_each(v_old) o
   where not (o.key = any(v_ignorar))
     and o.value is distinct from (v_new -> o.key);

  if v_cols is null then
    return new;
  end if;

  -- ¿Se perdió algo? Texto con contenido que queda vacío o nulo, lista que se
  -- acorta, u objeto que pierde claves.
  select bool_or(
           case jsonb_typeof(o.value)
             when 'string' then btrim(o.value #>> '{}') <> ''
                                and coalesce(btrim((v_new -> o.key) #>> '{}'), '') = ''
             when 'array'  then jsonb_array_length(o.value)
                                > jsonb_array_length(coalesce(v_new -> o.key, '[]'::jsonb))
             when 'object' then (select count(*) from jsonb_object_keys(o.value))
                                > (select count(*) from jsonb_object_keys(coalesce(v_new -> o.key, '{}'::jsonb)))
             else false
           end)
    into v_vacio
    from jsonb_each(v_old) o
   where o.key = any(v_cols) and not (o.key = any(v_omitir));

  insert into public.historial
    (tabla, fila_id, persona_id, operacion, columnas, anterior, nuevo, hubo_vaciado, actor)
  values (tg_table_name, v_old ->> v_pk,
          case when v_pcol is null then null else (v_old ->> v_pcol)::uuid end,
          'update', v_cols, v_ant, v_nue, coalesce(v_vacio, false),
          coalesce(nullif(current_setting('rower.actor', true), ''), current_user));
  return new;
end;
$$;

-- ------------------------------------------------------------
-- Migrar lo que ya había en fichas_perfil_historial
-- ------------------------------------------------------------
do $$
begin
  if to_regclass('public.fichas_perfil_historial') is not null then
    insert into public.historial
      (tabla, fila_id, persona_id, operacion, columnas, anterior, nuevo, hubo_vaciado, actor, registrado_en)
    select 'fichas_perfil', h.ficha_id::text, h.persona_id, h.operacion,
           h.columnas, h.anterior, h.nuevo, h.hubo_vaciado, h.actor, h.registrado_en
      from public.fichas_perfil_historial h
     where not exists (
       select 1 from public.historial g
        where g.tabla = 'fichas_perfil' and g.fila_id = h.ficha_id::text
          and g.registrado_en = h.registrado_en);
  end if;
end $$;

drop view  if exists public.v_fichas_vaciados;
drop trigger if exists trg_fichas_perfil_historial     on public.fichas_perfil;
drop trigger if exists trg_fichas_perfil_historial_del on public.fichas_perfil;
drop function if exists public.registrar_historial_ficha();
drop table if exists public.fichas_perfil_historial;

-- ------------------------------------------------------------
-- Los triggers, tabla por tabla
-- ------------------------------------------------------------
do $$
declare
  t record;
begin
  for t in
    select * from (values
      -- tabla,                  clave,        persona,      columnas omitidas
      ('fichas_perfil',          'id',         'persona_id', ''),
      ('personal',               'id',         'id',         ''),
      ('fichas_tokens',          'id',         'persona_id', '!usos,!ultimo_uso'),
      ('procesos_validadores',   'id',         'persona_id', ''),
      ('validaciones',           'id',         'persona_id', ''),
      ('validacion_tokens',      'id',         'persona_id', '!usos,!ultimo_uso'),
      -- De `contenido` se registra que cambió y cuánto ocupaba, no el blob:
      -- son ~300 kB por proceso y el manual se regenera desde el repo con
      -- `cargar-validacion.py`. Lo que no está en ningún otro sitio —qué
      -- proceso se tocó y cuándo— sí queda.
      ('procesos_fase2',         'codigo',     '',           'contenido')
    ) as v(tabla, clave, persona, omitir)
  loop
    if to_regclass('public.' || t.tabla) is null then
      raise notice 'no existe public.%, se salta', t.tabla;
      continue;
    end if;
    execute format('drop trigger if exists trg_%s_historial     on public.%I', t.tabla, t.tabla);
    execute format('drop trigger if exists trg_%s_historial_del on public.%I', t.tabla, t.tabla);
    execute format(
      'create trigger trg_%s_historial after update on public.%I
         for each row execute function public.registrar_historial(%L, %L%s)',
      t.tabla, t.tabla, t.clave, t.persona,
      case when t.omitir = '' then ''
           else ', ' || (select string_agg(quote_literal(x), ', ')
                           from unnest(string_to_array(t.omitir, ',')) x) end);
    execute format(
      'create trigger trg_%s_historial_del after delete on public.%I
         for each row execute function public.registrar_historial(%L, %L%s)',
      t.tabla, t.tabla, t.clave, t.persona,
      case when t.omitir = '' then ''
           else ', ' || (select string_agg(quote_literal(x), ', ')
                           from unnest(string_to_array(t.omitir, ',')) x) end);
  end loop;
end $$;

-- ------------------------------------------------------------
-- RLS: solo lectura, y solo con permiso de admin. El diario lo llena el
-- trigger (security definer); nadie con sesión lo escribe ni lo borra.
-- ------------------------------------------------------------
alter table public.historial enable row level security;
drop policy if exists historial_lectura on public.historial;
create policy historial_lectura on public.historial
  for select to authenticated
  using (public.tiene_permiso('admin.fichas')
      or public.tiene_permiso('admin.personal')
      or public.tiene_permiso('admin.validacion'));

revoke insert, update, delete on public.historial from authenticated, anon;

-- ------------------------------------------------------------
-- Atajo para mirar las pérdidas sin escribir la consulta a mano.
-- ------------------------------------------------------------
create or replace view public.v_historial_vaciados
with (security_invoker = on) as
select h.registrado_en, h.tabla, h.operacion, p.nombre, p.entidad,
       h.columnas, h.anterior, h.nuevo, h.actor
  from public.historial h
  left join public.personal p on p.id = h.persona_id
 where h.hubo_vaciado
 order by h.registrado_en desc;
