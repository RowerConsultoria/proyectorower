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

-- ---------- 4. Entrevistas transcritas (crudos) ----------
-- Insumo del módulo admin. Las transcripciones NO viven en el repo (material sensible).
create table if not exists public.entrevistas (
  id             uuid primary key default gen_random_uuid(),
  codigo         text unique,                 -- 'E-01'… para cotejar con Anexo A
  entrevistado   text not null,
  cargo          text,
  area           text,                        -- gobierno, estructura, talento, procesos, tecnología, cultura, operaciones
  pais           text,                        -- Venezuela, Panamá, Colombia, Costa Rica, Guatemala, EE.UU.
  fecha          date,
  entrevistador  text,
  duracion_min   integer,
  estado         text not null default 'crudo'
                 check (estado in ('crudo','revisado','procesado','descartado')),
  transcripcion  text,
  notas          text,
  etiquetas      text[],
  creado_en      timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);

drop trigger if exists trg_entrevistas_touch on public.entrevistas;
create trigger trg_entrevistas_touch
  before update on public.entrevistas
  for each row execute function public.touch_actualizado_en();

alter table public.entrevistas enable row level security;

drop policy if exists entrevistas_lectura   on public.entrevistas;
drop policy if exists entrevistas_escritura on public.entrevistas;
create policy entrevistas_lectura   on public.entrevistas for select using (true);
create policy entrevistas_escritura on public.entrevistas for all to authenticated using (true) with check (true);

-- TRANSITORIO ⚠️: escritura anónima mientras el panel admin no tenga login.
-- CERRAR (drop policy) al activar Supabase Auth — con esta política, cualquiera con la
-- clave publishable puede escribir/leer. No cargar transcripciones reales sensibles hasta entonces.
drop policy if exists entrevistas_escritura_anon on public.entrevistas;
create policy entrevistas_escritura_anon on public.entrevistas for all to anon using (true) with check (true);

insert into public.entrevistas
  (codigo, entrevistado, cargo, area, pais, entrevistador, estado, transcripcion, notas, etiquetas)
values
  ('E-DEMO','Ejemplo — reemplazar','Cargo de ejemplo','tecnología','Venezuela','Gabriel','crudo',
   'Transcripción de ejemplo para validar el módulo. Reemplazar por contenido real solo cuando Auth esté activo.',
   'Fila semilla de demostración. Puede borrarse.', array['demo','ejemplo'])
on conflict (codigo) do nothing;

-- ---------- 5. Archivos (insumos: Excel, PowerPoint, PDF, etc.) ----------
-- Binarios en Storage (bucket 'insumos'); metadatos en public.archivos.
insert into storage.buckets (id, name, public, file_size_limit)
values ('insumos', 'insumos', false, 104857600)   -- 100 MB por archivo, bucket privado
on conflict (id) do nothing;

drop policy if exists insumos_anon on storage.objects;
drop policy if exists insumos_auth on storage.objects;
create policy insumos_anon on storage.objects
  for all to anon using (bucket_id = 'insumos') with check (bucket_id = 'insumos');
create policy insumos_auth on storage.objects
  for all to authenticated using (bucket_id = 'insumos') with check (bucket_id = 'insumos');

create table if not exists public.archivos (
  id            uuid primary key default gen_random_uuid(),
  nombre        text not null,
  descripcion   text,
  categoria     text,                          -- procesos, talento, tecnología, gobierno, financiero, operaciones, general
  tipo          text,                          -- xlsx, pptx, pdf, otro
  storage_path  text not null unique,
  size_bytes    bigint,
  mime          text,
  subido_por    text,
  etiquetas     text[],
  creado_en     timestamptz not null default now()
);

alter table public.archivos enable row level security;

drop policy if exists archivos_lectura        on public.archivos;
drop policy if exists archivos_escritura       on public.archivos;
drop policy if exists archivos_escritura_anon  on public.archivos;
create policy archivos_lectura        on public.archivos for select using (true);
create policy archivos_escritura      on public.archivos for all to authenticated using (true) with check (true);
-- TRANSITORIO ⚠️: escritura anónima mientras el panel no tenga login. Cerrar al activar Auth.
create policy archivos_escritura_anon on public.archivos for all to anon using (true) with check (true);

-- ---------- 6. Línea de tiempo (bitácora del proyecto) ----------
-- Eventos día a día del proyecto consultor: entrevistas, reuniones internas,
-- hitos, entregables, análisis, decisiones y visitas. Alimenta el módulo
-- "Línea de tiempo" del admin. unique(fecha,titulo) hace idempotente la semilla.
create table if not exists public.eventos (
  id          uuid primary key default gen_random_uuid(),
  fecha       date not null,
  titulo      text not null,
  descripcion text,
  tipo        text not null default 'hito'
              check (tipo in ('entrevista','reunion_interna','hito','entregable','analisis','decision','visita')),
  fuente      text,                          -- E-01, minuta 29-jun, propuesta, estatus 30-jun…
  pais        text,
  actores     text[],
  creado_en   timestamptz not null default now(),
  unique (fecha, titulo)
);

alter table public.eventos enable row level security;

drop policy if exists eventos_lectura        on public.eventos;
drop policy if exists eventos_escritura      on public.eventos;
drop policy if exists eventos_escritura_anon on public.eventos;
create policy eventos_lectura   on public.eventos for select using (true);
create policy eventos_escritura on public.eventos for all to authenticated using (true) with check (true);
-- TRANSITORIO ⚠️: escritura anónima mientras el panel no tenga login. Cerrar al activar Auth.
create policy eventos_escritura_anon on public.eventos for all to anon using (true) with check (true);

-- ---------- 7. Asistente IA (conocimiento + fragmentos) ----------
-- Base de conocimiento del asistente conversacional del admin:
--  · conocimiento: documentos de síntesis del corpus (van SIEMPRE al contexto
--    del modelo, cacheados). clave = 'resumenes' | 'memoria' | …
--  · fragmentos: las transcripciones troceadas (~1.600 chars con solape) con
--    índice full-text en español, para que el asistente cite pasajes textuales.
-- El flag "activo" permite excluir una fuente del corpus sin borrarla
-- (p. ej. si se decide curar el material visible para la Junta).

create table if not exists public.conocimiento (
  id             uuid primary key default gen_random_uuid(),
  clave          text not null unique,
  titulo         text not null,
  contenido      text not null,
  activo         boolean not null default true,
  actualizado_en timestamptz not null default now()
);

-- Diálogo limpio de la entrevista (extraído del JSON/markdown del transcriptor:
-- "S1: …" por turno de habla). Lo consume la herramienta leer_entrevista del
-- asistente — leer el JSON crudo triplica los tokens.
alter table public.entrevistas add column if not exists dialogo text;

create table if not exists public.fragmentos (
  id           bigint generated always as identity primary key,
  codigo       text not null,          -- E-01 … E-24 (pt.1/pt.2)
  entrevistado text,
  orden        int not null,           -- posición del fragmento en la entrevista
  contenido    text not null,
  activo       boolean not null default true,
  tsv          tsvector generated always as (to_tsvector('spanish', contenido)) stored,
  unique (codigo, orden)
);
create index if not exists fragmentos_tsv_idx    on public.fragmentos using gin (tsv);
create index if not exists fragmentos_codigo_idx on public.fragmentos (codigo);

-- Búsqueda léxica en español. Primero intenta que aparezcan TODOS los términos
-- (websearch, admite "frases entre comillas"); como las palabras raras dejan
-- consultas AND sin resultados, el matching real es OR y los fragmentos que
-- cumplen el AND estricto se rankean primero (+1 al rango).
create or replace function public.buscar_fragmentos(consulta text, cod text default null, limite int default 8)
returns table (codigo text, entrevistado text, orden int, contenido text, rango real)
language sql stable
set search_path = public
as $$
  with q as (
    select websearch_to_tsquery('spanish', consulta) as estricta
  ), qq as (
    select estricta,
           case when numnode(estricta) > 0
                then to_tsquery('spanish', regexp_replace(estricta::text, '&', '|', 'g'))
                else estricta end as amplia
    from q
  )
  select f.codigo, f.entrevistado, f.orden, f.contenido,
         (ts_rank(f.tsv, qq.amplia) + (f.tsv @@ qq.estricta)::int)::real as rango
  from public.fragmentos f, qq
  where f.activo
    and f.tsv @@ qq.amplia
    and (cod is null or f.codigo = cod)
  order by rango desc
  limit least(greatest(limite, 1), 20);
$$;

alter table public.conocimiento enable row level security;
alter table public.fragmentos   enable row level security;

drop policy if exists conocimiento_lectura        on public.conocimiento;
drop policy if exists conocimiento_escritura      on public.conocimiento;
drop policy if exists conocimiento_escritura_anon on public.conocimiento;
create policy conocimiento_lectura   on public.conocimiento for select using (true);
create policy conocimiento_escritura on public.conocimiento for all to authenticated using (true) with check (true);
-- TRANSITORIO ⚠️: escritura anónima mientras el panel no tenga login. Cerrar al activar Auth.
create policy conocimiento_escritura_anon on public.conocimiento for all to anon using (true) with check (true);

drop policy if exists fragmentos_lectura        on public.fragmentos;
drop policy if exists fragmentos_escritura      on public.fragmentos;
drop policy if exists fragmentos_escritura_anon on public.fragmentos;
create policy fragmentos_lectura   on public.fragmentos for select using (true);
create policy fragmentos_escritura on public.fragmentos for all to authenticated using (true) with check (true);
-- TRANSITORIO ⚠️: escritura anónima mientras el panel no tenga login. Cerrar al activar Auth.
create policy fragmentos_escritura_anon on public.fragmentos for all to anon using (true) with check (true);
