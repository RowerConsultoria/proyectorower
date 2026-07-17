-- ============================================================
-- Proyecto Rower — Esquema de base de datos (Supabase/Postgres)
-- Ejecutar en: Supabase Dashboard → SQL Editor → New query
-- Idempotente: se puede re-ejecutar sin duplicar datos.
-- ============================================================

-- ---------- 1. Secciones del informe (estado vivo) ----------
create table if not exists public.secciones (
  id             text primary key,            -- 's1'..'s17', 'indice'
  numero         text not null,               -- '1', 'A (s15)', etc.
  titulo         text not null,
  estado         text not null default 'pendiente'
                 check (estado in ('completa','parcial','borrador','pendiente','interna')),
  responsable    text,
  notas          text,
  actualizado_en timestamptz not null default now()
);

-- ---------- 2. Comentarios de los consultores ----------
create table if not exists public.comentarios (
  id          uuid primary key default gen_random_uuid(),
  seccion_id  text references public.secciones(id) on delete set null,
  autor       text not null,                  -- Clemencia, Gabriel, Jesús, Vanessa, Josué, Melanieth
  contenido   text not null,
  resuelto    boolean not null default false,
  creado_en   timestamptz not null default now()
);

-- ---------- 3. Riesgos (alimenta la matriz de la sección 9) ----------
create table if not exists public.riesgos (
  id             uuid primary key default gen_random_uuid(),
  titulo         text not null,
  descripcion    text,
  area           text,                        -- gobierno, estructura, talento, procesos, tecnología, cultura
  severidad      text check (severidad in ('critica','alta','media','baja')),
  probabilidad   text check (probabilidad in ('alta','media','baja')),
  fuente_seccion text references public.secciones(id) on delete set null,
  creado_en      timestamptz not null default now()
);

-- ---------- Trigger: mantener actualizado_en ----------
create or replace function public.touch_actualizado_en()
returns trigger language plpgsql as $$
begin
  new.actualizado_en = now();
  return new;
end $$;

drop trigger if exists trg_secciones_touch on public.secciones;
create trigger trg_secciones_touch
  before update on public.secciones
  for each row execute function public.touch_actualizado_en();

-- ---------- Seguridad: RLS ----------
-- Lectura pública (clave anon); escritura solo con sesión autenticada.
-- Si el equipo aún no usa Supabase Auth, ver supabase/README.md para
-- la política transitoria de escritura.
alter table public.secciones   enable row level security;
alter table public.comentarios enable row level security;
alter table public.riesgos     enable row level security;

drop policy if exists secciones_lectura   on public.secciones;
drop policy if exists secciones_escritura on public.secciones;
create policy secciones_lectura   on public.secciones   for select using (true);
create policy secciones_escritura on public.secciones   for all to authenticated using (true) with check (true);

drop policy if exists comentarios_lectura   on public.comentarios;
drop policy if exists comentarios_escritura on public.comentarios;
create policy comentarios_lectura   on public.comentarios for select using (true);
create policy comentarios_escritura on public.comentarios for all to authenticated using (true) with check (true);

drop policy if exists riesgos_lectura   on public.riesgos;
drop policy if exists riesgos_escritura on public.riesgos;
create policy riesgos_lectura   on public.riesgos   for select using (true);
create policy riesgos_escritura on public.riesgos   for all to authenticated using (true) with check (true);

-- ---------- Datos iniciales: estado del informe al 17-jul-2026 ----------
insert into public.secciones (id, numero, titulo, estado, responsable, notas) values
  ('indice','—','Índice del documento','completa',null,'Partes I/II/III + Anexos + grupo Uso interno'),
  ('s1','1','Resumen ejecutivo','pendiente',null,'Se redacta al final, cuando s9 y s13 cierren'),
  ('s2','2','Metodología y fuentes','completa',null,null),
  ('s3','3','Fundamentos, gobierno y estrategia','completa','Clemencia','Despersonalizada'),
  ('s4','4','Estructura organizativa global','completa',null,'Alertas movidas a s17'),
  ('s5','5','Talento y RRHH','completa','Vanessa','Pendiente decidir integración de Estructura_Patron_de_Cargos'),
  ('s6','6','Procesos y operaciones','completa','Jesús','6.5 = Mapa v7: 22/104/260'),
  ('s7','7','Tecnología, sistemas y datos','completa','Gabriel',null),
  ('s8','8','Cultura y adopción de IA','completa','Josué',null),
  ('s9','9','Síntesis de hallazgos críticos y riesgos','borrador',null,'Consolidar en matriz de severidad'),
  ('s10','10','Propuesta de estructura','parcial',null,'Falta placeholder 10.2: elementos adicionales'),
  ('s11','11','Auditoría Lark y Odoo','completa','Gabriel','Fase documental'),
  ('s12','12','Arquitectura IA preliminar','completa','Gabriel','Contiene el modal del diagrama'),
  ('s13','13','Hoja de ruta de automatización','pendiente','Gabriel','Insumos disponibles en 7.9, 11.4, 11.5, 12.5'),
  ('s15','A','Anexo A — Inventario de entrevistas','borrador',null,'Cotejar contra 2.3'),
  ('s16','B','Anexo B — Plan de trabajo interno F1','interna',null,'Fuera de la versión cliente'),
  ('s17','—','Apartado interno — Alertas de identidad','interna',null,'Fuera de la versión cliente')
on conflict (id) do nothing;
