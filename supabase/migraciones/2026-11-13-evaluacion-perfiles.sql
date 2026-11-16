-- ============================================================
-- §18 — Evaluación de perfiles de la Fase 3 (13-nov-2026)
-- Mismo texto en supabase/schema.sql.
-- ============================================================
-- Resultado de la evaluación de perfiles (ajuste persona–cargo To-Be) por lote
-- (familia de cargos). Lleva nombres reales, así que vive solo aquí, nunca en
-- un archivo del repositorio: la página informe/fase3/descripciones-cargo.html
-- la lee con el JWT de quien mira.
--   · Lee quien tiene admin.fichas (el mismo dato sensible que las fichas).
--   · Nadie escribe con sesión: se carga desde el equipo consultor con la clave
--     de servicio (sin política de escritura). Se recarga entera por lote.
-- Sin foránea a personal, a propósito: el resultado es un documento del
-- momento y no debe desaparecer en cascada si se borra una persona.
create table if not exists public.evaluacion_perfiles (
  id             uuid primary key default gen_random_uuid(),
  clave          text not null unique,          -- '<lote>:persona:<persona_id>' · '<lote>:tablero' · '<lote>:informe'
  lote           text not null,                 -- código de la familia (SSG…)
  tipo           text not null check (tipo in ('persona','tablero','informe')),
  persona_id     uuid,                          -- id de personal, solo en tipo 'persona'
  version_prompt text not null,
  contenido      jsonb not null,
  creado_en      timestamptz not null default now(),
  actualizado_en timestamptz not null default now(),
  check ((tipo = 'persona') = (persona_id is not null))
);
create index if not exists evaluacion_perfiles_lote on public.evaluacion_perfiles (lote, tipo);

alter table public.evaluacion_perfiles enable row level security;
revoke all on public.evaluacion_perfiles from anon;
grant select on public.evaluacion_perfiles to authenticated;
drop policy if exists evaluacion_perfiles_lectura on public.evaluacion_perfiles;
create policy evaluacion_perfiles_lectura on public.evaluacion_perfiles for select to authenticated
  using (public.tiene_permiso('admin.fichas'));
