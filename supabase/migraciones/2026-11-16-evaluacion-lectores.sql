-- ============================================================
-- §18.1 — Quién lee la evaluación de perfiles (16-nov-2026)
-- Mismo texto en supabase/schema.sql.
-- ============================================================
-- Mientras se valida, la evaluación de perfiles la lee solo el equipo
-- consultor, y no todo quien tiene admin.fichas (que incluye cuentas del
-- cliente que sí deben seguir viendo las fichas). La lista va por cuenta:
-- los consultores comparten rol con cuentas del cliente, así que un permiso
-- no bastaría.
--   · Las filas de la lista se cargan con la clave de servicio, fuera del
--     repositorio; ninguna sesión la lee ni la escribe directamente.
--   · Abrirla al cliente = añadir sus cuentas a la lista, o volver la política
--     a tiene_permiso('admin.fichas'). Sin tocar código.
create table if not exists public.evaluacion_lectores (
  usuario   uuid primary key references auth.users (id) on delete cascade,
  creado_en timestamptz not null default now()
);
alter table public.evaluacion_lectores enable row level security;
revoke all on public.evaluacion_lectores from anon, authenticated;

-- ¿Puede quien pregunta leer la evaluación? También la usa la página para
-- ocultar la sección a quien no está en la lista.
create or replace function public.puede_ver_evaluacion()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
      from public.evaluacion_lectores el
      join public.perfiles pf on pf.id = el.usuario
     where el.usuario = auth.uid()
       and pf.activo
  );
$$;
revoke all on function public.puede_ver_evaluacion() from public, anon;
grant execute on function public.puede_ver_evaluacion() to authenticated;

drop policy if exists evaluacion_perfiles_lectura on public.evaluacion_perfiles;
create policy evaluacion_perfiles_lectura on public.evaluacion_perfiles for select to authenticated
  using (public.puede_ver_evaluacion());
