-- ============================================================
-- 25-oct-2026 — Agente IA del manual y flujos del To-Be en la plataforma
--
-- Un agente (Claude Managed Agents, Edge Function `agente`) flota en el manual
-- de Fase 2. Lee todo lo del proceso que la cuenta que le habla puede ver, y lo
-- único que cambia es el FLUJO DE ACTIVIDADES del To-Be (lista + flujograma),
-- siempre con la confirmación de esa persona. El resto se sigue anotando a mano.
--
--   1. `config_plataforma` — interruptor general del agente (clave 'agente_ia').
--   2. `agente_cuentas` — el interruptor por cuenta, del módulo Usuarios.
--      Quien la secretaría habilitó para validar (validadores_tobe) lo tiene
--      sin interruptor.
--   3. `puede_usar_agente()` / `mi_agente()` — la regla, en un solo sitio.
--   4. `flujos_tobe` — cada flujo aprobado es una VERSIÓN nueva (append-only, la publica
--      solo la Edge Function tras validarlo):
--      el manual pinta la última por encima del To-Be del archivo, a todos los
--      lectores, y la registra en `actividad_tobe` (tipo 'flujo_cambiado').
--      El archivo del repo (manual-contenido.js) se pone al día aparte.
--   5. `agente_sesiones` y `agente_propuestas` — las conversaciones de cada cuenta
--      y los cambios propuestos a la espera de «Aplicar». Las escribe la Edge
--      Function con la clave de servicio; cada cuenta lee solo lo suyo.
--   6. El agente lee las notas publicadas y la línea de tiempo: quien puede
--      usarlo también las ve (notas_publicadas_tobe y actividad_tobe).
--
-- Idempotente. Es la §16 de schema.sql.
-- ============================================================

-- ---------- 16.1 Interruptor general ----------
create table if not exists public.config_plataforma (
  clave          text primary key,
  valor          jsonb not null default '{}'::jsonb,
  actualizado_por uuid references public.perfiles(id) on delete set null,
  actualizado_en timestamptz not null default now()
);
insert into public.config_plataforma(clave, valor) values ('agente_ia', '{"activo": true}')
  on conflict (clave) do nothing;

drop trigger if exists trg_config_plataforma_touch on public.config_plataforma;
create trigger trg_config_plataforma_touch
  before update on public.config_plataforma
  for each row execute function public.touch_actualizado_en();

-- ---------- 16.2 Interruptor por cuenta ----------
create table if not exists public.agente_cuentas (
  perfil_id      uuid primary key references public.perfiles(id) on delete cascade,
  activo         boolean not null default true,
  habilitado_por uuid references public.perfiles(id) on delete set null,
  habilitado_en  timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);
drop trigger if exists trg_agente_cuentas_touch on public.agente_cuentas;
create trigger trg_agente_cuentas_touch
  before update on public.agente_cuentas
  for each row execute function public.touch_actualizado_en();

-- ---------- 16.3 La regla ----------
create or replace function public.agente_encendido()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce((select (valor->>'activo')::boolean from public.config_plataforma where clave = 'agente_ia'), false)
$$;

create or replace function public.puede_usar_agente()
returns boolean language sql stable security definer set search_path = public as $$
  select public.agente_encendido()
     and public.tiene_permiso('ver.informe')
     and (public.puede_validar_tobe()
          or exists (select 1 from public.agente_cuentas a
                      where a.perfil_id = auth.uid() and a.activo))
$$;

-- Lo que necesita la página para decidir si muestra el botón flotante.
create or replace function public.mi_agente()
returns jsonb language plpgsql stable security definer set search_path = public as $$
begin
  return jsonb_build_object(
    'puede',      public.puede_usar_agente(),
    'encendido',  public.agente_encendido(),
    'por_comite', public.puede_validar_tobe(),
    'por_cuenta', exists (select 1 from public.agente_cuentas a where a.perfil_id = auth.uid() and a.activo));
end;
$$;

-- Para el módulo Usuarios: quién lo tiene y por qué. Solo admin.usuarios.
drop function if exists public.agente_cuentas_admin();   -- la §17 le cambia la forma
create function public.agente_cuentas_admin()
returns table (perfil_id uuid, por_comite boolean, por_cuenta boolean)
language plpgsql stable security definer set search_path = public as $$
#variable_conflict use_column
begin
  if not public.tiene_permiso('admin.usuarios') then
    raise exception 'Hace falta el permiso admin.usuarios.' using errcode = '42501';
  end if;
  return query
  select pf.id,
         exists (select 1 from public.validadores_tobe v where v.perfil_id = pf.id and v.activo),
         exists (select 1 from public.agente_cuentas a where a.perfil_id = pf.id and a.activo)
    from public.perfiles pf;
end;
$$;

-- ---------- 16.4 Los flujos del To-Be en la plataforma ----------
create table if not exists public.flujos_tobe (
  id           uuid primary key default gen_random_uuid(),
  proceso      text not null check (proceso ~ '^[0-9]{1,2}\.[0-9]{1,2}$'),
  version      int not null,                    -- 1, 2, 3… por proceso (la fija el trigger)
  flujo        jsonb not null check (jsonb_typeof(flujo->'actividades') = 'array'
                                     and jsonb_typeof(flujo->'diagrama'->'nodos') = 'array'
                                     and jsonb_typeof(flujo->'diagrama'->'aristas') = 'array'),
  resumen      text not null check (length(btrim(resumen)) > 0 and length(resumen) <= 2000),
  base         text,                            -- huella del To-Be (con el flujo vigente) sobre la que se propuso
  archivo      text,                            -- huella del proceso en manual-contenido.js al publicar
  origen       text not null default 'agente' check (origen in ('agente','manual')),
  autor        uuid,                            -- sin foránea, como `historial`
  autor_nombre text,
  propuesta_id text,                            -- el tool use del agente que la propuso
  creado_en    timestamptz not null default now(),
  unique (proceso, version)
);
create index if not exists flujos_tobe_proceso_idx on public.flujos_tobe (proceso, version desc);
alter table public.flujos_tobe add column if not exists archivo text;
-- Un doble «Aplicar» (dos pestañas, un reintento) no publica dos versiones.
create unique index if not exists flujos_tobe_propuesta_uq on public.flujos_tobe (propuesta_id) where propuesta_id is not null;

create or replace function public.guardia_flujos_tobe()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'DELETE' and coalesce(current_setting('rower.actor', true), '') <> '' then
    return old;   -- intervención administrativa firmada con `set local rower.actor = '…'`
  end if;
  if tg_op <> 'INSERT' then
    raise exception 'Una versión del flujo no se edita ni se borra: se publica otra.';
  end if;
  if tg_op = 'INSERT' and auth.uid() is not null then
    raise exception 'Un flujo se publica desde el agente, que lo valida antes.';
  end if;
  perform pg_advisory_xact_lock(hashtext('flujos_tobe:' || new.proceso));
  select coalesce(max(version), 0) + 1 into new.version from public.flujos_tobe where proceso = new.proceso;
  new.autor_nombre := coalesce(public.nombre_perfil(new.autor), new.autor_nombre);
  new.creado_en := now();
  return new;
end;
$$;
drop trigger if exists trg_flujos_tobe_guardia on public.flujos_tobe;
create trigger trg_flujos_tobe_guardia
  before insert or update or delete on public.flujos_tobe
  for each row execute function public.guardia_flujos_tobe();
-- Publica SOLO la Edge Function `agente`, con la clave de servicio, después de validar el
-- flujo entero (ids, carriles, ciclos, decisiones, tipos). Ninguna sesión inserta directo:
-- un flujo sin validar podía romper el manual de todos o inyectar marcado en el flujograma.

-- La línea de tiempo del proceso registra cada versión.
alter table public.actividad_tobe drop constraint if exists actividad_tobe_tipo_check;
alter table public.actividad_tobe add constraint actividad_tobe_tipo_check
  check (tipo in ('enviada','validada','reabierta','nota_publicada','nota_respondida','nota_retirada','flujo_cambiado'));

create or replace function public.registrar_flujo_tobe()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.actividad_tobe(proceso, tipo, perfil_id, integrante, actor, actor_nombre, version, detalle)
  values (new.proceso, 'flujo_cambiado', new.autor, new.autor_nombre, new.autor, new.autor_nombre, new.base,
          jsonb_build_object('version', new.version, 'resumen', new.resumen, 'origen', new.origen,
                             'actividades', jsonb_array_length(new.flujo->'actividades')));
  return null;
end;
$$;
drop trigger if exists trg_flujos_tobe_actividad on public.flujos_tobe;
create trigger trg_flujos_tobe_actividad
  after insert on public.flujos_tobe
  for each row execute function public.registrar_flujo_tobe();

-- Lo que pinta el manual: la última versión de cada proceso.
drop view if exists public.v_flujos_vigentes;
create view public.v_flujos_vigentes with (security_invoker = on) as
select distinct on (proceso) proceso, version, flujo, resumen, base, archivo, autor_nombre, creado_en
  from public.flujos_tobe
 order by proceso, version desc;

-- ---------- 16.5 La conversación y las propuestas ----------
create table if not exists public.agente_sesiones (
  id          uuid primary key default gen_random_uuid(),
  perfil_id   uuid not null references public.perfiles(id) on delete cascade,
  session_id  text not null unique,             -- sesión de Managed Agents (sesn_…)
  activa      boolean not null default true,
  creado_en   timestamptz not null default now(),
  ultimo_uso  timestamptz not null default now()
);
create index if not exists agente_sesiones_perfil_idx on public.agente_sesiones (perfil_id, activa);
-- Las conversaciones se conservan: la cuenta ve su lista, retoma cualquiera o abre
-- otra. `activa` marca la que el chat tiene abierta (una por cuenta); `titulo` es
-- el comienzo de su primer mensaje.
alter table public.agente_sesiones add column if not exists titulo text check (titulo is null or length(titulo) <= 120);
-- Cerrojo: una sola llamada a la función atiende la conversación a la vez (dos pestañas no
-- ejecutan dos veces la misma herramienta). Y el último contexto de página enviado al agente.
alter table public.agente_sesiones add column if not exists bombeando_hasta timestamptz;
alter table public.agente_sesiones add column if not exists ultimo_contexto text;

create table if not exists public.agente_propuestas (
  id          text primary key,                 -- id del evento agent.custom_tool_use
  session_id  text not null,
  perfil_id   uuid not null references public.perfiles(id) on delete cascade,
  proceso     text not null,
  flujo       jsonb not null,
  resumen     text not null,
  base        text,
  estado      text not null default 'pendiente' check (estado in ('pendiente','aplicada','rechazada')),
  motivo      text,
  flujo_id    uuid,
  creado_en   timestamptz not null default now(),
  resuelto_en timestamptz
);
create index if not exists agente_propuestas_sesion_idx on public.agente_propuestas (session_id, estado);

-- ---------- 16.6 RLS ----------
alter table public.config_plataforma enable row level security;
alter table public.agente_cuentas    enable row level security;
alter table public.flujos_tobe       enable row level security;
alter table public.agente_sesiones   enable row level security;
alter table public.agente_propuestas enable row level security;

drop policy if exists config_plataforma_lectura   on public.config_plataforma;
drop policy if exists config_plataforma_escritura on public.config_plataforma;
create policy config_plataforma_lectura on public.config_plataforma for select to authenticated using (true);
create policy config_plataforma_escritura on public.config_plataforma for update to authenticated
  using (public.tiene_permiso('admin.usuarios')) with check (public.tiene_permiso('admin.usuarios'));

drop policy if exists agente_cuentas_lectura   on public.agente_cuentas;
drop policy if exists agente_cuentas_escritura on public.agente_cuentas;
create policy agente_cuentas_lectura on public.agente_cuentas for select to authenticated
  using (perfil_id = auth.uid() or public.tiene_permiso('admin.usuarios'));
create policy agente_cuentas_escritura on public.agente_cuentas for all to authenticated
  using (public.tiene_permiso('admin.usuarios')) with check (public.tiene_permiso('admin.usuarios'));

-- Todo lector del manual ve el flujo vigente. Publicar es cosa de la Edge Function (ver 16.4).
drop policy if exists flujos_tobe_lectura on public.flujos_tobe;
drop policy if exists flujos_tobe_alta    on public.flujos_tobe;
create policy flujos_tobe_lectura on public.flujos_tobe for select to authenticated
  using (public.tiene_permiso('ver.informe') or public.tiene_permiso('admin.validacion'));

drop policy if exists agente_sesiones_lectura   on public.agente_sesiones;
drop policy if exists agente_propuestas_lectura on public.agente_propuestas;
create policy agente_sesiones_lectura on public.agente_sesiones for select to authenticated
  using (perfil_id = auth.uid());
create policy agente_propuestas_lectura on public.agente_propuestas for select to authenticated
  using (perfil_id = auth.uid());

revoke all on public.config_plataforma, public.agente_cuentas, public.flujos_tobe,
              public.agente_sesiones, public.agente_propuestas, public.v_flujos_vigentes from anon;
grant select, update on public.config_plataforma to authenticated;
grant select, insert, update, delete on public.agente_cuentas to authenticated;
revoke insert, update, delete on public.flujos_tobe from authenticated;
grant select on public.flujos_tobe to authenticated;
grant select on public.v_flujos_vigentes, public.agente_sesiones, public.agente_propuestas to authenticated;

revoke all on function public.agente_encendido()      from public, anon;
revoke all on function public.puede_usar_agente()     from public, anon;
revoke all on function public.mi_agente()             from public, anon;
revoke all on function public.agente_cuentas_admin()  from public, anon;
grant execute on function public.agente_encendido(), public.puede_usar_agente(), public.mi_agente(),
                          public.agente_cuentas_admin() to authenticated;

-- ---------- 16.7 Quien usa el agente lee lo que el comité publicó ----------
create or replace function public.notas_publicadas_tobe(p_proceso text)
returns jsonb language plpgsql stable security definer set search_path = public as $$
begin
  if not (public.puede_validar_tobe() or public.tiene_permiso('admin.validacion') or public.puede_usar_agente()) then
    raise exception 'Solo el comité, la secretaría técnica y quien usa el agente ven las notas publicadas.' using errcode = '42501';
  end if;
  return coalesce((
    select jsonb_agg(to_jsonb(n) || jsonb_build_object(
             'autor',             public.nombre_perfil(n.perfil_id),
             'registrado_nombre', public.nombre_perfil(n.registrado_por),
             'respondido_nombre', public.nombre_perfil(n.respondido_por))
           order by coalesce(n.publicada_en, n.creado_en), n.creado_en)
      from public.notas_tobe n
     where n.proceso = p_proceso and n.estado <> 'borrador'), '[]'::jsonb);
end;
$$;

drop policy if exists actividad_tobe_lectura on public.actividad_tobe;
create policy actividad_tobe_lectura on public.actividad_tobe for select to authenticated
  using (public.puede_validar_tobe() or public.tiene_permiso('admin.validacion') or public.puede_usar_agente());
