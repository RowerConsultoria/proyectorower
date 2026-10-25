-- ============================================================
-- 25-oct-2026 — El Agente IA también entiende y cambia la estructura organizativa To-Be
--
-- Entender la estructura y preguntar por ella: quien ya puede usar el agente.
-- Cambiarla: además, el interruptor «Puede cambiar la estructura» de la cuenta
-- (agente_cuentas.estructura, módulo Usuarios), porque la estructura nombra personas
-- y cargos y la decide la Presidencia.
--
--   1. `estructura_tobe` — cada estructura aplicada es una VERSIÓN entera (el objeto
--      ESTRUCTURA_TOBE completo). Append-only: la publica solo la Edge Function
--      `agente` con la clave de servicio, tras aplicar y validar las operaciones;
--      se borra solo como intervención firmada (`set local rower.actor`).
--      El manual pinta la última (`v_estructura_vigente`) por encima de
--      estructura-tobe-datos.js, mientras el archivo siga siendo el mismo sobre
--      el que se publicó (`archivo`).
--   2. `agente_propuestas` admite propuestas de estructura (`tipo`).
--
-- Idempotente. Es la §17 de schema.sql.
-- ============================================================

-- ---------- 17.1 El interruptor y la regla ----------
alter table public.agente_cuentas add column if not exists estructura boolean not null default false;

create or replace function public.puede_cambiar_estructura()
returns boolean language sql stable security definer set search_path = public as $$
  select public.puede_usar_agente()
     and exists (select 1 from public.agente_cuentas a where a.perfil_id = auth.uid() and a.estructura)
$$;

create or replace function public.mi_agente()
returns jsonb language plpgsql stable security definer set search_path = public as $$
begin
  return jsonb_build_object(
    'puede',      public.puede_usar_agente(),
    'encendido',  public.agente_encendido(),
    'por_comite', public.puede_validar_tobe(),
    'por_cuenta', exists (select 1 from public.agente_cuentas a where a.perfil_id = auth.uid() and a.activo),
    'estructura', public.puede_cambiar_estructura());
end;
$$;

-- Cambia la forma del resultado: hay que borrarla antes.
drop function if exists public.agente_cuentas_admin();
create function public.agente_cuentas_admin()
returns table (perfil_id uuid, por_comite boolean, por_cuenta boolean, estructura boolean)
language plpgsql stable security definer set search_path = public as $$
#variable_conflict use_column
begin
  if not public.tiene_permiso('admin.usuarios') then
    raise exception 'Hace falta el permiso admin.usuarios.' using errcode = '42501';
  end if;
  return query
  select pf.id,
         exists (select 1 from public.validadores_tobe v where v.perfil_id = pf.id and v.activo),
         exists (select 1 from public.agente_cuentas a where a.perfil_id = pf.id and a.activo),
         exists (select 1 from public.agente_cuentas a where a.perfil_id = pf.id and a.estructura)
    from public.perfiles pf;
end;
$$;

-- ---------- 17.2 Las versiones de la estructura ----------
create table if not exists public.estructura_tobe (
  id           uuid primary key default gen_random_uuid(),
  version      int not null unique,                 -- 1, 2, 3… (la fija el trigger)
  datos        jsonb not null check (jsonb_typeof(datos->'DIRECCIONES') = 'array' and jsonb_typeof(datos->'COMITES') = 'array'),
  resumen      text not null check (length(btrim(resumen)) > 0 and length(resumen) <= 2000),
  cambios      jsonb not null default '[]'::jsonb,  -- lo que cambió, en frases (lo arma la función)
  operaciones  jsonb,                               -- las operaciones que propuso el agente
  base         text,                                -- huella de la estructura sobre la que se propuso
  archivo      text,                                -- huella de estructura-tobe-datos.js al publicar
  autor        uuid,
  autor_nombre text,
  propuesta_id text unique,
  creado_en    timestamptz not null default now()
);

create or replace function public.guardia_estructura_tobe()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'DELETE' and coalesce(current_setting('rower.actor', true), '') <> '' then
    return old;   -- intervención administrativa firmada
  end if;
  if tg_op <> 'INSERT' then
    raise exception 'Una versión de la estructura no se edita ni se borra: se publica otra.';
  end if;
  if auth.uid() is not null then
    raise exception 'La estructura se publica desde el agente, que la valida antes.';
  end if;
  perform pg_advisory_xact_lock(hashtext('estructura_tobe'));
  select coalesce(max(version), 0) + 1 into new.version from public.estructura_tobe;
  new.autor_nombre := coalesce(public.nombre_perfil(new.autor), new.autor_nombre);
  new.creado_en := now();
  return new;
end;
$$;
drop trigger if exists trg_estructura_tobe_guardia on public.estructura_tobe;
create trigger trg_estructura_tobe_guardia
  before insert or update or delete on public.estructura_tobe
  for each row execute function public.guardia_estructura_tobe();

drop view if exists public.v_estructura_vigente;
create view public.v_estructura_vigente with (security_invoker = on) as
select version, datos, resumen, cambios, base, archivo, autor_nombre, creado_en
  from public.estructura_tobe order by version desc limit 1;

-- ---------- 17.3 Propuestas de estructura ----------
alter table public.agente_propuestas add column if not exists tipo text not null default 'flujo';
alter table public.agente_propuestas add column if not exists datos jsonb;
alter table public.agente_propuestas add column if not exists operaciones jsonb;
alter table public.agente_propuestas add column if not exists cambios jsonb;
alter table public.agente_propuestas alter column proceso drop not null;
alter table public.agente_propuestas alter column flujo drop not null;
alter table public.agente_propuestas drop constraint if exists agente_propuestas_tipo_check;
alter table public.agente_propuestas add constraint agente_propuestas_tipo_check check (
  (tipo = 'flujo' and proceso is not null and flujo is not null) or (tipo = 'estructura' and datos is not null));

-- ---------- 17.4 RLS y permisos ----------
alter table public.estructura_tobe enable row level security;
drop policy if exists estructura_tobe_lectura on public.estructura_tobe;
create policy estructura_tobe_lectura on public.estructura_tobe for select to authenticated
  using (public.tiene_permiso('ver.informe') or public.tiene_permiso('admin.validacion'));
revoke all on public.estructura_tobe, public.v_estructura_vigente from anon;
revoke insert, update, delete on public.estructura_tobe from authenticated;
grant select on public.estructura_tobe, public.v_estructura_vigente to authenticated;

revoke all on function public.puede_cambiar_estructura() from public, anon;
revoke all on function public.agente_cuentas_admin()      from public, anon;
grant execute on function public.puede_cambiar_estructura(), public.agente_cuentas_admin() to authenticated;

-- ---------- 17.5 Dos «Aplicar» casi simultáneos no se pisan (revisión del 25-oct) ----------
-- La función comprueba la huella de la base y después inserta; entre las dos cosas, otro
-- pudo publicar. Por eso la inserción trae `base_version` (la última versión que vio la
-- función) y el trigger, bajo el mismo cerrojo con que numera, la rechaza si ya no es la última.
alter table public.flujos_tobe     add column if not exists base_version int;
alter table public.estructura_tobe add column if not exists base_version int;

create or replace function public.guardia_flujos_tobe()
returns trigger language plpgsql security definer set search_path = public as $$
declare ultima int;
begin
  if tg_op = 'DELETE' and coalesce(current_setting('rower.actor', true), '') <> '' then
    return old;   -- intervención administrativa firmada con `set local rower.actor = '…'`
  end if;
  if tg_op <> 'INSERT' then
    raise exception 'Una versión del flujo no se edita ni se borra: se publica otra.';
  end if;
  if auth.uid() is not null then
    raise exception 'Un flujo se publica desde el agente, que lo valida antes.';
  end if;
  perform pg_advisory_xact_lock(hashtext('flujos_tobe:' || new.proceso));
  select coalesce(max(version), 0) into ultima from public.flujos_tobe where proceso = new.proceso;
  if new.base_version is not null and new.base_version <> ultima then
    raise exception 'conflicto: el flujo de % cambió (versión %) mientras se aplicaba.', new.proceso, ultima;
  end if;
  new.version := ultima + 1;
  new.autor_nombre := coalesce(public.nombre_perfil(new.autor), new.autor_nombre);
  new.creado_en := now();
  return new;
end;
$$;

create or replace function public.guardia_estructura_tobe()
returns trigger language plpgsql security definer set search_path = public as $$
declare ultima int;
begin
  if tg_op = 'DELETE' and coalesce(current_setting('rower.actor', true), '') <> '' then
    return old;   -- intervención administrativa firmada
  end if;
  if tg_op <> 'INSERT' then
    raise exception 'Una versión de la estructura no se edita ni se borra: se publica otra.';
  end if;
  if auth.uid() is not null then
    raise exception 'La estructura se publica desde el agente, que la valida antes.';
  end if;
  perform pg_advisory_xact_lock(hashtext('estructura_tobe'));
  select coalesce(max(version), 0) into ultima from public.estructura_tobe;
  if new.base_version is not null and new.base_version <> ultima then
    raise exception 'conflicto: la estructura cambió (versión %) mientras se aplicaba.', ultima;
  end if;
  new.version := ultima + 1;
  new.autor_nombre := coalesce(public.nombre_perfil(new.autor), new.autor_nombre);
  new.creado_en := now();
  return new;
end;
$$;
