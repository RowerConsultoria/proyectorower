-- ============================================================
-- 25-oct-2026 — Notas publicadas con su autor y la línea de tiempo de cada proceso
--
-- Hasta hoy cada integrante del comité solo veía sus propias notas y nada
-- quedaba fechado más allá del último envío (reabrir y reenviar pisaba
-- `enviada_en`). Desde hoy:
--
--   1. Una nota se PUBLICA al enviar la validación: `notas_tobe.publicada_en`.
--      Mientras es borrador sigue siendo privada.
--   2. Lo publicado lo ven, con su autor, los integrantes habilitados y la
--      secretaría técnica, por la RPC `notas_publicadas_tobe(proceso)`. La RLS
--      de `notas_tobe` no cambia: cada quien sigue leyendo y escribiendo solo
--      lo suyo, y la RPC no devuelve borradores.
--   3. `actividad_tobe` es la línea de tiempo del proceso: una fila por envío,
--      validación, reapertura, nota publicada, respuesta de la secretaría y nota
--      retirada. La escriben solo los triggers; nadie la edita. Guarda los nombres
--      en el momento del hecho, para que borrar una cuenta no deje huecos.
--
-- Los cambios del texto del To-Be no viven en la base: los proyecta
-- `node scripts/generar-versiones-tobe.js` desde el historial de git a
-- informe/fase2/manual-versiones.js, y la página los intercala.
--
-- Idempotente. Es el mismo texto que la §15.10 de schema.sql (y los cambios a
-- 15.4, 15.5 y 15.6), para aplicarlo sin re-ejecutar el esquema entero.
-- ============================================================

-- ---------- 1. La fecha de publicación de cada nota ----------
alter table public.notas_tobe add column if not exists publicada_en timestamptz;

-- ---------- 2. El guardia de las notas: nadie fija publicada_en a mano ----------
create or replace function public.guardia_notas_tobe()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v     public.validaciones_tobe;
  secre boolean := public.tiene_permiso('admin.validacion');
begin
  -- Las transiciones y el servidor (sin sesión: la clave de servicio, o el
  -- borrado de una cuenta con sus `on delete cascade/set null`) pasan siempre.
  if public.es_transicion_tobe() or auth.uid() is null then return coalesce(new, old); end if;

  if tg_op = 'DELETE' then
    -- La secretaría y el borrado en cascada de la validación madre, también.
    if secre then return old; end if;
    select * into v from public.validaciones_tobe where id = old.validacion_id;
    if v.id is null then return old; end if;
    if old.estado <> 'borrador' or v.estado <> 'en_revision' then
      raise exception 'Solo se quita una nota que todavía no se envió.';
    end if;
    return old;
  end if;

  select * into v from public.validaciones_tobe where id = new.validacion_id;
  if v.id is null then raise exception 'La validación de esa nota no existe.'; end if;

  if tg_op = 'INSERT' then
    if v.estado <> 'en_revision' then
      raise exception 'La validación ya se envió. Reábrela para añadir notas.';
    end if;
    new.proceso := v.proceso; new.perfil_id := v.perfil_id;
    new.estado := 'borrador';
    new.respuesta := null; new.respondido_por := null; new.respondido_en := null;
    new.publicada_en := null;
    new.registrado_por := auth.uid();
    return new;
  end if;

  if new.validacion_id <> old.validacion_id or new.proceso <> old.proceso or new.perfil_id <> old.perfil_id then
    raise exception 'Una nota no cambia de validación.';
  end if;
  if new.estado is distinct from old.estado or new.respuesta is distinct from old.respuesta then
    if not secre then
      raise exception 'El estado y la respuesta de una nota los fija la secretaría técnica.';
    end if;
    if old.estado = 'borrador' then raise exception 'Esa nota todavía no se envió.'; end if;
    if new.estado in ('borrador','confirmada') then raise exception 'Ese estado no se fija a mano.'; end if;
    if new.estado = 'no_se_incorpora' and coalesce(btrim(new.respuesta), '') = '' then
      raise exception 'Para no incorporar una nota hay que responder por qué.';
    end if;
    new.respondido_por := auth.uid(); new.respondido_en := now();
  end if;
  if (new.texto, new.seccion, new.tipo, new.ancla_id, new.ancla_n, new.ancla_texto,
      new.consulta_a, new.consulta_respuesta, new.version)
     is distinct from
     (old.texto, old.seccion, old.tipo, old.ancla_id, old.ancla_n, old.ancla_texto,
      old.consulta_a, old.consulta_respuesta, old.version) then
    if old.estado <> 'borrador' or v.estado <> 'en_revision' then
      raise exception 'Una nota enviada no se edita: se añade otra.';
    end if;
  end if;
  new.registrado_por := old.registrado_por;
  new.publicada_en := old.publicada_en;
  return new;
end;
$$;

-- ---------- 3. Enviar publica las notas ----------
create or replace function public.validacion_tobe_enviar(p_id uuid, p_version text default null)
returns public.validaciones_tobe language plpgsql security definer set search_path = public as $$
declare
  v public.validaciones_tobe;
  s text;
  falta text[] := '{}';
  pendientes int;
  todo_valida boolean;
begin
  select * into v from public.validaciones_tobe where id = p_id for update;
  if v.id is null then raise exception 'La validación no existe.'; end if;
  if not public.puede_mover_tobe(v) then
    raise exception 'No puedes enviar esta validación.' using errcode = '42501';
  end if;
  if v.estado <> 'en_revision' then raise exception 'La validación ya se envió.'; end if;

  foreach s in array public.secciones_tobe() loop
    if not (v.veredictos ? s) then
      falta := falta || ('veredicto de ' || s);
    elsif v.veredictos->>s in ('ajustes','no') and not exists (
            select 1 from public.notas_tobe n
             where n.validacion_id = v.id and n.seccion = s and n.tipo in ('escrita','voz')) then
      falta := falta || ('nota en ' || s);
    end if;
  end loop;
  if not coalesce((v.lista->>'asis')::boolean, false)
     or not coalesce((v.lista->>'est')::boolean, false)
     or not coalesce((v.lista->>'dec')::boolean, false)
     or not coalesce((v.lista->>'sesgo')::boolean, false) then
    falta := falta || 'casillas de la lista de verificación'::text;
  end if;
  if coalesce(array_length(falta, 1), 0) > 0 then
    raise exception 'Falta: %', array_to_string(falta, ', ');
  end if;

  perform set_config('rower.transicion_tobe', '1', true);
  -- Al enviar, las notas en borrador se publican: el resto del comité las ve.
  update public.notas_tobe set estado = 'por_revisar', publicada_en = now()
   where validacion_id = v.id and estado = 'borrador';
  -- Las consultas a dueños de proceso informan, no piden respuesta: no cuentan.
  select count(*) into pendientes from public.notas_tobe
   where validacion_id = v.id and tipo <> 'consulta'
     and estado in ('por_revisar','necesita_consulta','se_incorpora');
  select not exists (select 1 from jsonb_each_text(v.veredictos) e where e.value <> 'valida')
    into todo_valida;
  update public.validaciones_tobe
     set estado      = case when pendientes = 0 and todo_valida then 'validada' else 'enviada' end,
         enviada_en  = now(),
         validada_en = case when pendientes = 0 and todo_valida then now() else null end,
         version     = coalesce(p_version, version),
         registrado_por = auth.uid()
   where id = v.id
  returning * into v;
  perform set_config('rower.transicion_tobe', '', true);
  return v;
end;
$$;

-- ---------- 4. La línea de tiempo ----------
create or replace function public.nombre_perfil(p uuid)
returns text language sql stable security definer set search_path = public as $$
  select coalesce(nullif(btrim(nombre), ''), correo) from public.perfiles where id = p
$$;

-- Sin foráneas a propósito, como `historial`: borrar una cuenta o una validación
-- no debe llevarse la prueba de lo que pasó. Por eso guarda los nombres.
create table if not exists public.actividad_tobe (
  id             bigint generated always as identity primary key,
  proceso        text not null,
  tipo           text not null check (tipo in ('enviada','validada','reabierta',
                                               'nota_publicada','nota_respondida','nota_retirada')),
  perfil_id      uuid,          -- el integrante a cuyo nombre va la validación
  integrante     text,
  actor          uuid,          -- quien lo hizo (la secretaría puede registrar a nombre de otro)
  actor_nombre   text,
  nota_id        uuid,
  version        text,          -- huella del To-Be en ese momento
  detalle        jsonb not null default '{}'::jsonb,
  creado_en      timestamptz not null default now()
);
create index if not exists actividad_tobe_proceso_idx on public.actividad_tobe (proceso, creado_en);

create or replace function public.registrar_actividad_tobe()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  actor uuid := auth.uid();
  an text := public.nombre_perfil(auth.uid());
  n public.notas_tobe;
  nota jsonb;
begin
  if tg_table_name = 'validaciones_tobe' then
    if new.estado is not distinct from old.estado then return null; end if;
    if old.estado = 'en_revision' and new.estado in ('enviada','validada') then
      insert into public.actividad_tobe(proceso, tipo, perfil_id, integrante, actor, actor_nombre, version, detalle)
      values (new.proceso, 'enviada', new.perfil_id, public.nombre_perfil(new.perfil_id), actor, an, new.version,
              jsonb_build_object('veredictos', new.veredictos));
    end if;
    if new.estado = 'validada' then
      insert into public.actividad_tobe(proceso, tipo, perfil_id, integrante, actor, actor_nombre, version, detalle)
      values (new.proceso, 'validada', new.perfil_id, public.nombre_perfil(new.perfil_id), actor, an, new.version, '{}'::jsonb);
    elsif new.estado = 'en_revision' then
      insert into public.actividad_tobe(proceso, tipo, perfil_id, integrante, actor, actor_nombre, version, detalle)
      values (new.proceso, 'reabierta', new.perfil_id, public.nombre_perfil(new.perfil_id), actor, an, new.version, '{}'::jsonb);
    end if;
    return null;
  end if;

  -- notas_tobe
  if tg_op = 'DELETE' then n := old; else n := new; end if;
  nota := jsonb_build_object('tipo', n.tipo, 'seccion', n.seccion, 'ancla_id', n.ancla_id, 'ancla_n', n.ancla_n,
                             'texto', n.texto, 'consulta_a', n.consulta_a, 'consulta_respuesta', n.consulta_respuesta,
                             'registrado_por', n.registrado_por, 'registrado_nombre', public.nombre_perfil(n.registrado_por));
  if tg_op = 'DELETE' then
    if old.estado = 'borrador' then return null; end if;     -- un borrador nunca se publicó
    insert into public.actividad_tobe(proceso, tipo, perfil_id, integrante, actor, actor_nombre, nota_id, version, detalle)
    values (old.proceso, 'nota_retirada', old.perfil_id, public.nombre_perfil(old.perfil_id), actor, an, old.id, old.version, nota);
    return null;
  end if;
  if old.estado = 'borrador' and new.estado <> 'borrador' then
    insert into public.actividad_tobe(proceso, tipo, perfil_id, integrante, actor, actor_nombre, nota_id, version, detalle)
    values (new.proceso, 'nota_publicada', new.perfil_id, public.nombre_perfil(new.perfil_id), actor, an, new.id, new.version, nota);
  elsif new.estado in ('se_incorpora','no_se_incorpora','necesita_consulta')
        and (new.estado is distinct from old.estado or new.respuesta is distinct from old.respuesta) then
    insert into public.actividad_tobe(proceso, tipo, perfil_id, integrante, actor, actor_nombre, nota_id, version, detalle)
    values (new.proceso, 'nota_respondida', new.perfil_id, public.nombre_perfil(new.perfil_id), actor, an, new.id, new.version,
            nota || jsonb_build_object('estado', new.estado, 'respuesta', new.respuesta));
  end if;
  return null;
end;
$$;

drop trigger if exists trg_validaciones_tobe_actividad on public.validaciones_tobe;
create trigger trg_validaciones_tobe_actividad
  after update on public.validaciones_tobe
  for each row execute function public.registrar_actividad_tobe();
drop trigger if exists trg_notas_tobe_actividad on public.notas_tobe;
create trigger trg_notas_tobe_actividad
  after update or delete on public.notas_tobe
  for each row execute function public.registrar_actividad_tobe();

-- ---------- 5. Las notas publicadas de un proceso, con su autor ----------
-- La RLS de notas_tobe deja ver solo lo propio; esto abre lo PUBLICADO (nunca
-- un borrador) al resto del comité y a la secretaría, con los nombres.
create or replace function public.notas_publicadas_tobe(p_proceso text)
returns jsonb language plpgsql stable security definer set search_path = public as $$
begin
  if not (public.puede_validar_tobe() or public.tiene_permiso('admin.validacion')) then
    raise exception 'Solo el comité y la secretaría técnica ven las notas publicadas.' using errcode = '42501';
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

-- ---------- 6. RLS y permisos ----------
alter table public.actividad_tobe enable row level security;
drop policy if exists actividad_tobe_lectura on public.actividad_tobe;
create policy actividad_tobe_lectura on public.actividad_tobe for select to authenticated
  using (public.puede_validar_tobe() or public.tiene_permiso('admin.validacion'));
-- Sin políticas de escritura: solo la escriben los triggers (security definer).
revoke all on public.actividad_tobe from anon;
revoke insert, update, delete on public.actividad_tobe from authenticated;
grant select on public.actividad_tobe to authenticated;

revoke all on function public.notas_publicadas_tobe(text) from public, anon;
grant execute on function public.notas_publicadas_tobe(text) to authenticated;
-- Daría el nombre de cualquier cuenta: solo la usan las funciones de arriba.
revoke all on function public.nombre_perfil(uuid) from public, anon, authenticated;
