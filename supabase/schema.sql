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
-- 🔒 Desde el 04-ago-2026 (activación de Supabase Auth) NADA es anónimo:
-- lectura y escritura exigen sesión (rol `authenticated`). La clave publishable
-- es pública y vive en el repositorio: con ella sola no se ve ni se escribe nada.
-- Las Edge Functions usan la clave de servicio, que salta RLS por diseño.
alter table public.secciones   enable row level security;
alter table public.comentarios enable row level security;
alter table public.riesgos     enable row level security;

drop policy if exists secciones_lectura   on public.secciones;
drop policy if exists secciones_escritura on public.secciones;
create policy secciones_lectura   on public.secciones   for select to authenticated using (true);
create policy secciones_escritura on public.secciones   for all    to authenticated using (true) with check (true);

drop policy if exists comentarios_lectura   on public.comentarios;
drop policy if exists comentarios_escritura on public.comentarios;
create policy comentarios_lectura   on public.comentarios for select to authenticated using (true);
create policy comentarios_escritura on public.comentarios for all    to authenticated using (true) with check (true);

drop policy if exists riesgos_lectura   on public.riesgos;
drop policy if exists riesgos_escritura on public.riesgos;
create policy riesgos_lectura   on public.riesgos   for select to authenticated using (true);
create policy riesgos_escritura on public.riesgos   for all    to authenticated using (true) with check (true);

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
create policy entrevistas_lectura   on public.entrevistas for select to authenticated using (true);
create policy entrevistas_escritura on public.entrevistas for all    to authenticated using (true) with check (true);

-- La política anónima transitoria quedó CERRADA el 04-ago-2026 al activar Auth.
-- No reabrirla: aquí viven las transcripciones íntegras del corpus.
drop policy if exists entrevistas_escritura_anon on public.entrevistas;

insert into public.entrevistas
  (codigo, entrevistado, cargo, area, pais, entrevistador, estado, transcripcion, notas, etiquetas)
values
  ('E-DEMO','Ejemplo — reemplazar','Cargo de ejemplo','tecnología','Venezuela','Gabriel','crudo',
   'Transcripción de ejemplo para validar el módulo. Puede borrarse: el corpus real ya está cargado.',
   'Fila semilla de demostración. Puede borrarse.', array['demo','ejemplo'])
on conflict (codigo) do nothing;

-- ---------- 5. Archivos (insumos: Excel, PowerPoint, PDF, etc.) ----------
-- Binarios en Storage (bucket 'insumos'); metadatos en public.archivos.
insert into storage.buckets (id, name, public, file_size_limit)
values ('insumos', 'insumos', false, 104857600)   -- 100 MB por archivo, bucket privado
on conflict (id) do nothing;

-- El bucket es privado y solo lo ve quien tenga sesión: aquí hay nóminas reales.
-- insumos_anon quedó CERRADA el 04-ago-2026 al activar Auth — no reabrirla.
drop policy if exists insumos_anon on storage.objects;
drop policy if exists insumos_auth on storage.objects;
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
drop policy if exists archivos_escritura_anon  on public.archivos;   -- cerrada el 04-ago-2026
create policy archivos_lectura        on public.archivos for select to authenticated using (true);
create policy archivos_escritura      on public.archivos for all    to authenticated using (true) with check (true);

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
drop policy if exists eventos_escritura_anon on public.eventos;      -- cerrada el 04-ago-2026
create policy eventos_lectura   on public.eventos for select to authenticated using (true);
create policy eventos_escritura on public.eventos for all    to authenticated using (true) with check (true);

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
drop policy if exists conocimiento_escritura_anon on public.conocimiento;   -- cerrada el 04-ago-2026
create policy conocimiento_lectura   on public.conocimiento for select to authenticated using (true);
create policy conocimiento_escritura on public.conocimiento for all    to authenticated using (true) with check (true);

drop policy if exists fragmentos_lectura        on public.fragmentos;
drop policy if exists fragmentos_escritura      on public.fragmentos;
drop policy if exists fragmentos_escritura_anon on public.fragmentos;       -- cerrada el 04-ago-2026
create policy fragmentos_lectura   on public.fragmentos for select to authenticated using (true);
create policy fragmentos_escritura on public.fragmentos for all    to authenticated using (true) with check (true);

-- ---------- 8. Indexación automática del corpus ----------
-- Cada entrevista o archivo que se carga dispara (vía pg_net) la Edge Function
-- "indexar", que: extrae el texto (diálogo limpio / contenido del xlsx-pdf-docx-pptx),
-- lo trocea en fragmentos (FTS), y genera con Claude una síntesis que se guarda
-- en "conocimiento" — con lo que entra AUTOMÁTICAMENTE al contexto del Asistente IA
-- (su caché de conocimiento refresca cada 5 min).

create extension if not exists pg_net;
create extension if not exists supabase_vault with schema vault;

alter table public.entrevistas add column if not exists indexado_en timestamptz;
alter table public.archivos    add column if not exists indexado_en timestamptz;

-- 🔑 La credencial con que Postgres invoca la función NO vive en este archivo:
-- se guarda cifrada en Supabase Vault bajo el nombre 'clave_servicio'. Sembrarla
-- una vez por proyecto (SQL Editor, con el valor real de la clave de servicio):
--
--   select vault.create_secret(
--     '<SUPABASE_SERVICE_ROLE_KEY>', 'clave_servicio',
--     'Clave con que los triggers invocan la Edge Function indexar');
--
-- Para reponerla:  select vault.update_secret(
--     (select id from vault.secrets where name = 'clave_servicio'), '<CLAVE>');
-- Comprobar que está:  select name from vault.secrets where name = 'clave_servicio';
create or replace function public.disparar_indexado()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  clave text;
begin
  select decrypted_secret into clave
    from vault.decrypted_secrets
   where name = 'clave_servicio';

  if clave is null or clave = '' then
    -- Sin credencial no se indexa, pero la carga del insumo NO debe fallar:
    -- se avisa y queda pendiente para el backfill ({"todo":true}).
    raise warning 'Rower: falta el secreto ''clave_servicio'' en Vault; % % queda sin indexar',
                  TG_ARGV[0], NEW.id;
    return NEW;
  end if;

  perform net.http_post(
    url     := 'https://kmhwqybqrcjhjeywjgxj.supabase.co/functions/v1/indexar',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || clave
    ),
    body := jsonb_build_object('tipo', TG_ARGV[0], 'id', NEW.id::text)
  );
  return NEW;
end;
$$;

-- Entrevistas: al crear con transcripción, o cuando la transcripción cambia.
drop trigger if exists entrevistas_indexar_ins on public.entrevistas;
create trigger entrevistas_indexar_ins
  after insert on public.entrevistas
  for each row
  when (new.transcripcion is not null and length(new.transcripcion) > 50)
  execute function public.disparar_indexado('entrevista');

drop trigger if exists entrevistas_indexar_upd on public.entrevistas;
create trigger entrevistas_indexar_upd
  after update of transcripcion on public.entrevistas
  for each row
  when (old.transcripcion is distinct from new.transcripcion
        and new.transcripcion is not null and length(new.transcripcion) > 50)
  execute function public.disparar_indexado('entrevista');

-- Archivos: al insertar la metadata (el binario ya está en Storage en ese punto).
drop trigger if exists archivos_indexar_ins on public.archivos;
create trigger archivos_indexar_ins
  after insert on public.archivos
  for each row
  execute function public.disparar_indexado('archivo');

-- ---------- 9. Acceso: Supabase Auth (activado el 04-ago-2026) ----------
-- Todo el aplicativo vive detrás de /acceso/ (pantalla de login) y del guardia
-- supabase/sesion.js. Las políticas de arriba solo reconocen `authenticated`,
-- así que sin sesión no hay lectura ni escritura, ni desde el navegador ni con
-- la clave publishable en la mano.
--
-- Las cuentas NO se crean con SQL: van por la API de administración de Auth,
-- que exige la clave de servicio (nunca la publishable, nunca desde el repo).
--
--   POST https://<ref>.supabase.co/auth/v1/admin/users
--   apikey: <SERVICE_ROLE>   Authorization: Bearer <SERVICE_ROLE>
--   { "email": "...", "password": "...", "email_confirm": true,
--     "user_metadata": { "nombre": "...", "rol": "admin" } }
--
-- …o desde el Dashboard → Authentication → Users → Add user (marcar
-- "Auto Confirm User", porque el proyecto no tiene SMTP propio configurado).
--
-- El registro abierto está deshabilitado (Authentication → Providers → Email →
-- "Allow new users to sign up" en off): las cuentas las da el equipo técnico.
--
-- Consultar quién tiene acceso:
--   select email, raw_user_meta_data->>'nombre' as nombre,
--          email_confirmed_at, last_sign_in_at
--     from auth.users order by created_at;
--
-- Reponer una clave:
--   PUT https://<ref>.supabase.co/auth/v1/admin/users/<id>  { "password": "..." }
--
-- Cuando haga falta separar perfiles (Junta = solo informe · equipo = admin),
-- el sitio natural es user_metadata.rol + un chequeo en el guardia y políticas
-- por rol; hoy toda cuenta autenticada ve todo.
