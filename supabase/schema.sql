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

-- Las políticas viven en la §10 (necesitan public.tiene_permiso, que nace allí).

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

-- Las políticas viven en la §10 (necesitan public.tiene_permiso, que nace allí).
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

-- El bucket es privado y solo lo ve quien tenga el permiso admin.archivos: aquí
-- hay nóminas reales. insumos_anon quedó CERRADA el 04-ago-2026 — no reabrirla.
-- La política vive en la §10.
drop policy if exists insumos_anon on storage.objects;

create table if not exists public.archivos (
  id             uuid primary key default gen_random_uuid(),
  nombre         text not null,
  descripcion    text,
  area           text,                          -- catálogo de áreas/departamentos de la compañía (no solo del proyecto)
  tipo_documento text,                          -- política, contrato, presentación, hoja de cálculo, acta, informe…
  tipo           text,                          -- xlsx, pptx, pdf, otro — formato, se infiere de la extensión
  confidencial   boolean not null default false,-- visible/filtrable; hoy no cierra nada aparte (sigue siendo admin.archivos)
  storage_path   text not null unique,
  size_bytes     bigint,
  mime           text,
  subido_por     text,
  etiquetas      text[],
  creado_en      timestamptz not null default now()
);

-- Repositorio de TODA la compañía (no solo los insumos del proyecto de
-- consultoría): "categoria" nació como una lista plana de 7 valores del
-- propio proyecto; ahora es "area", el primero de tres ejes independientes
-- (área · tipo de documento · etiquetas) que se cruzan al filtrar, no
-- carpetas anidadas. Renombrar conserva los datos ya cargados — sus 7
-- valores originales (procesos, talento…) quedan como áreas válidas más.
alter table public.archivos rename column categoria to area;
alter table public.archivos add column if not exists tipo_documento text;
alter table public.archivos add column if not exists confidencial boolean not null default false;

alter table public.archivos enable row level security;

-- Las políticas viven en la §10 (necesitan public.tiene_permiso, que nace allí).
drop policy if exists archivos_escritura_anon on public.archivos;   -- cerrada el 04-ago-2026

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

-- Las políticas viven en la §10 (necesitan public.tiene_permiso, que nace allí).
drop policy if exists eventos_escritura_anon on public.eventos;      -- cerrada el 04-ago-2026

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

-- Las políticas viven en la §10 (necesitan public.tiene_permiso, que nace allí).
drop policy if exists conocimiento_escritura_anon on public.conocimiento;   -- cerrada el 04-ago-2026
drop policy if exists fragmentos_escritura_anon   on public.fragmentos;     -- cerrada el 04-ago-2026

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

-- ---------- 11. Personal: censo, jerarquía y fichas de actualización ----------
-- Módulos «Censo y enlaces» y «Fichas recibidas» del panel admin: recolección
-- de la ficha de actualización de perfil (Fase 3) por los ~426 colaboradores
-- de Kenex, llenada por cada gerente para su equipo directo o por cada quien
-- para sí mismo, según se decida caso por caso — de ahí que existan los dos
-- tipos de enlace en fichas_tokens.
--
-- ⚠️ Datos personales de personas AJENAS al equipo consultor (documento de
-- identidad, nivel educativo…). El acceso anónimo sigue cerrado igual que el
-- resto del esquema; la única puerta sin sesión de Supabase Auth es la Edge
-- Function `ficha`, que valida el token opaco con la clave de servicio y solo
-- alcanza al ámbito de ESE token (ver supabase/functions/ficha/index.ts).

create table if not exists public.personal (
  id             uuid primary key default gen_random_uuid(),
  nombre         text not null,
  pais           text,
  entidad        text,                        -- Rower · Casiolandia Panamá · Kenex Trading · Deltadir
  area           text,
  cargo          text,
  correo         text,
  fecha_ingreso  date,
  identificacion text,
  ubicacion      text,
  condicion      text,
  supervisor_txt text,                        -- valor crudo del Excel, para trazabilidad
  gerente_id     uuid references public.personal(id) on delete set null,
  origen         text,                        -- archivo/hoja de donde vino la fila
  activo         boolean not null default true,
  notas          text,
  creado_en      timestamptz not null default now(),
  actualizado_en timestamptz not null default now(),
  unique (nombre, entidad)
);
create index if not exists personal_gerente_idx on public.personal (gerente_id);
create index if not exists personal_entidad_idx on public.personal (entidad);
create index if not exists personal_area_idx    on public.personal (area);

drop trigger if exists trg_personal_touch on public.personal;
create trigger trg_personal_touch
  before update on public.personal
  for each row execute function public.touch_actualizado_en();

-- Nadie puede ser su propio gerente, ni de forma directa ni por cadena — el
-- Excel de origen ya trae un caso real de auto-referencia.
create or replace function public.evitar_ciclo_gerente()
returns trigger
language plpgsql
as $$
declare
  actual uuid;
  saltos int := 0;
begin
  if new.gerente_id is null then
    return new;
  end if;
  if new.gerente_id = new.id then
    raise exception 'Una persona no puede ser su propio gerente';
  end if;
  actual := new.gerente_id;
  while actual is not null and saltos < 100 loop
    if actual = new.id then
      raise exception 'Esa asignación crea un ciclo en la jerarquía de gerentes';
    end if;
    select gerente_id into actual from public.personal where id = actual;
    saltos := saltos + 1;
  end loop;
  return new;
end;
$$;

drop trigger if exists trg_personal_evitar_ciclo on public.personal;
create trigger trg_personal_evitar_ciclo
  before insert or update of gerente_id on public.personal
  for each row execute function public.evitar_ciclo_gerente();

-- Una ficha por persona. Las tres listas (responsabilidades, posiciones
-- previas, hard skills) van en jsonb: son de tamaño variable y no se
-- consultan por campo interno, solo se leen/escriben enteras.
create table if not exists public.fichas_perfil (
  id                  uuid primary key default gen_random_uuid(),
  persona_id          uuid not null unique references public.personal(id) on delete cascade,
  documento           text,
  antiguedad_org      text,
  nivel_educativo     text check (nivel_educativo in
                       ('bachiller_tecnico_medio','tsu_universitario_incompleto',
                        'universitario_titulado','especializacion_maestria_doctorado')),
  otras_formaciones   text,
  titulo_obtenido     text,
  institucion         text,
  cargo_actual        text,
  antiguedad_cargo    text,
  area_sede           text,
  responsabilidades   jsonb not null default '[]'::jsonb,   -- ["texto", …] hasta 4
  posiciones_previas  jsonb not null default '[]'::jsonb,   -- [{cargo,area,desde,hasta}, …]
  habilidades         jsonb not null default '{}'::jsonb,   -- {excel,odoo,lark,powerbi,ia,otra:{nombre,nivel}}
  estado              text not null default 'pendiente'
                      check (estado in ('pendiente','en_progreso','completada')),
  llenada_por         text,                     -- nombre de quien llenó (el propio o su gerente)
  enviada_en          timestamptz,
  creado_en           timestamptz not null default now(),
  actualizado_en      timestamptz not null default now()
);

drop trigger if exists trg_fichas_perfil_touch on public.fichas_perfil;
create trigger trg_fichas_perfil_touch
  before update on public.fichas_perfil
  for each row execute function public.touch_actualizado_en();

-- Enlaces de acceso público (sin sesión de Supabase Auth). El token es una
-- cadena aleatoria opaca generada en el navegador del panel; no hace falta
-- guardar solo su hash porque el propio panel necesita re-exportar la lista
-- de enlaces para repartirlos, y el alcance de cada token es acotado (una
-- ficha o el equipo directo de un gerente).
create table if not exists public.fichas_tokens (
  id          uuid primary key default gen_random_uuid(),
  token       text not null unique,
  tipo        text not null check (tipo in ('individual','gerente')),
  persona_id  uuid not null references public.personal(id) on delete cascade,
  expira_en   timestamptz not null default (now() + interval '45 days'),
  revocado    boolean not null default false,
  usos        int not null default 0,
  ultimo_uso  timestamptz,
  creado_por  text,
  creado_en   timestamptz not null default now()
);
create index if not exists fichas_tokens_persona_idx on public.fichas_tokens (persona_id);

alter table public.personal      enable row level security;
alter table public.fichas_perfil enable row level security;
alter table public.fichas_tokens enable row level security;

-- Las políticas viven en el bloque final (necesitan public.tiene_permiso).

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

-- ---------- 10. Gobierno del acceso: usuarios, roles y permisos ----------
-- Módulos «Usuarios» y «Roles y permisos» del panel admin.
--
-- El rol NO vive en user_metadata: eso lo puede editar el propio usuario con su
-- sesión (se ascendería solo). Vive en public.perfiles, que solo escribe la
-- Edge Function `usuarios` con la clave de servicio.
--
-- `permisos` es un CATÁLOGO acoplado al código: añadir una fila no crea un
-- permiso nuevo si nadie lo comprueba. Se edita aquí, no desde la pantalla.

create table if not exists public.permisos (
  clave       text primary key,             -- 'admin.entrevistas'
  nombre      text not null,
  descripcion text,
  grupo       text not null default 'Panel', -- 'Front' | 'Panel' | 'Gobierno del acceso'
  orden       int  not null default 100
);

create table if not exists public.roles (
  clave       text primary key,             -- 'admin', 'consultor', 'junta', 'pendiente'
  nombre      text not null,
  descripcion text,
  es_sistema  boolean not null default false, -- no se puede borrar desde la pantalla
  orden       int not null default 100,
  creado_en   timestamptz not null default now()
);

create table if not exists public.roles_permisos (
  rol     text not null references public.roles(clave)    on delete cascade,
  permiso text not null references public.permisos(clave) on delete cascade,
  primary key (rol, permiso)
);

-- Un perfil por cuenta de auth.users. Se crea solo (trigger de abajo), así que
-- una cuenta dada de alta desde el Dashboard tampoco queda sin gobierno: cae en
-- el rol 'pendiente', que no tiene ningún permiso.
create table if not exists public.perfiles (
  id             uuid primary key references auth.users(id) on delete cascade,
  correo         text,
  nombre         text,
  rol            text not null default 'pendiente' references public.roles(clave),
  activo         boolean not null default true,
  notas          text,
  creado_en      timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);
create index if not exists perfiles_rol_idx on public.perfiles (rol);

drop trigger if exists trg_perfiles_touch on public.perfiles;
create trigger trg_perfiles_touch
  before update on public.perfiles
  for each row execute function public.touch_actualizado_en();

-- ---------- Semilla: los cuatro roles y los diez permisos ----------
insert into public.permisos (clave, nombre, descripcion, grupo, orden) values
  ('ver.informe',     'Ver el informe',        'Informe Diagnóstico Fase 1 y sus módulos: organigramas, mapa de procesos, presentación y la torre de arquitectura de IA.', 'Front', 10),
  ('ver.sistema',     'Ver el prototipo',      'Prototipo del sistema Kenex y sus dos portales (vendedor y cliente).', 'Front', 20),
  ('admin.entrar',    'Entrar al panel',       'Abrir el panel administrativo. Sin este permiso no se ve ningún módulo interno.', 'Panel', 30),
  ('admin.asistente', 'Asistente IA',          'Conversar con el corpus completo del proyecto: entrevistas crudas, síntesis y notas internas. Gasta cuota de Anthropic.', 'Panel', 40),
  ('admin.entrevistas','Entrevistas transcritas','Leer, crear y editar las transcripciones íntegras de las entrevistas.', 'Panel', 50),
  ('admin.archivos',  'Archivos (insumos)',    'Subir, descargar y borrar los insumos del bucket. Incluye material sensible como las escalas salariales.', 'Panel', 60),
  ('admin.timeline',  'Línea de tiempo',       'Bitácora cronológica del proyecto.', 'Panel', 70),
  ('admin.informe',   'Estado del informe',    'Estado por sección, comentarios de los consultores y matriz de riesgos.', 'Panel', 80),
  ('admin.usuarios',  'Administrar usuarios',  'Crear cuentas, reponer claves, asignar roles y dar de baja. Permiso delicado.', 'Gobierno del acceso', 90),
  ('admin.roles',     'Definir roles',         'Crear roles y decidir qué puede hacer cada uno. Permiso delicado.', 'Gobierno del acceso', 100),
  ('admin.personal',  'Censo y enlaces',       'Censo de personal de Kenex, su jerarquía y la generación de enlaces para la ficha de actualización de perfil.', 'Panel', 110),
  ('admin.fichas',    'Fichas recibidas',      'Leer y exportar las fichas de actualización de perfil recibidas. Incluye documento de identidad y nivel educativo.', 'Panel', 120)
on conflict (clave) do update
  set nombre = excluded.nombre, descripcion = excluded.descripcion,
      grupo = excluded.grupo, orden = excluded.orden;

insert into public.roles (clave, nombre, descripcion, es_sistema, orden) values
  ('admin',     'Administrador', 'Gobierna el aplicativo: todos los módulos y la administración de accesos.', true, 10),
  ('consultor', 'Consultor',     'Equipo de UCAB Consultores: el informe y todos los módulos de trabajo, sin tocar accesos.', true, 20),
  ('junta',     'Junta',         'Lectura del informe. Pensado para la Junta Directiva de Kenex.', true, 30),
  ('pendiente', 'Sin accesos',   'Cuenta creada pero sin permisos todavía. Es donde cae toda cuenta nueva de origen desconocido.', true, 90)
on conflict (clave) do nothing;

-- Matriz inicial. Solo se siembra lo que falte: si alguien ya ajustó un rol
-- desde la pantalla, re-ejecutar este archivo no le deshace el trabajo.
insert into public.roles_permisos (rol, permiso)
select 'admin', clave from public.permisos
on conflict do nothing;

insert into public.roles_permisos (rol, permiso)
select 'consultor', clave from public.permisos
 where clave in ('ver.informe','ver.sistema','admin.entrar','admin.asistente',
                 'admin.entrevistas','admin.archivos','admin.timeline','admin.informe',
                 'admin.personal','admin.fichas')
on conflict do nothing;

insert into public.roles_permisos (rol, permiso) values ('junta','ver.informe')
on conflict do nothing;
-- 'pendiente' se queda a propósito sin ninguna fila.

-- ---------- Perfil automático al crear una cuenta ----------
create or replace function public.crear_perfil_auth()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.perfiles (id, correo, nombre, rol)
  values (
    new.id,
    new.email,
    nullif(trim(coalesce(new.raw_user_meta_data->>'nombre', '')), ''),
    case when exists (select 1 from public.roles r
                       where r.clave = coalesce(new.raw_user_meta_data->>'rol', ''))
         then new.raw_user_meta_data->>'rol'
         else 'pendiente' end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists auth_users_perfil on auth.users;
create trigger auth_users_perfil
  after insert on auth.users
  for each row execute function public.crear_perfil_auth();

-- Perfil para las cuentas que ya existían antes de este módulo.
insert into public.perfiles (id, correo, nombre, rol)
select u.id, u.email,
       nullif(trim(coalesce(u.raw_user_meta_data->>'nombre','')), ''),
       'pendiente'
  from auth.users u
 where not exists (select 1 from public.perfiles p where p.id = u.id)
on conflict (id) do nothing;

-- ---------- Los dos ayudantes que usan TODAS las políticas ----------
-- security definer: leen perfiles/roles_permisos saltándose RLS, para que las
-- políticas que los invocan no entren en recursión.
create or replace function public.tiene_permiso(p text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
      from public.perfiles pf
      join public.roles_permisos rp on rp.rol = pf.rol
     where pf.id = auth.uid()
       and pf.activo
       and rp.permiso = p
  );
$$;

-- Lo que el navegador necesita saber de sí mismo (RPC del guardia y del admin).
create or replace function public.mi_acceso()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  pf    record;
  perms jsonb;
begin
  select p.id, p.correo, p.nombre, p.rol, p.activo, r.nombre as rol_nombre
    into pf
    from public.perfiles p
    left join public.roles r on r.clave = p.rol
   where p.id = auth.uid();

  if pf.id is null then
    return jsonb_build_object('existe', false, 'activo', false, 'permisos', '[]'::jsonb);
  end if;

  if pf.activo then
    select coalesce(jsonb_agg(rp.permiso order by rp.permiso), '[]'::jsonb)
      into perms
      from public.roles_permisos rp
     where rp.rol = pf.rol;
  else
    perms := '[]'::jsonb;
  end if;

  return jsonb_build_object(
    'existe', true, 'id', pf.id, 'correo', pf.correo, 'nombre', pf.nombre,
    'rol', pf.rol, 'rol_nombre', pf.rol_nombre, 'activo', pf.activo,
    'permisos', perms);
end;
$$;

revoke all on function public.mi_acceso() from anon;
revoke all on function public.tiene_permiso(text) from anon;

-- ---------- Que nadie se deje fuera ----------
-- El rol 'admin' no puede perder el gobierno del acceso, ni por descuido ni por
-- un clic en la matriz: sin admin.usuarios/admin.roles nadie podría reabrirlo.
create or replace function public.proteger_gobierno()
returns trigger
language plpgsql
as $$
begin
  if old.rol = 'admin' and old.permiso in ('admin.usuarios', 'admin.roles') then
    raise exception 'El rol Administrador no puede quedarse sin «%»: nadie podría volver a repartir accesos', old.permiso;
  end if;
  return old;
end;
$$;

drop trigger if exists trg_proteger_gobierno on public.roles_permisos;
create trigger trg_proteger_gobierno
  before delete on public.roles_permisos
  for each row execute function public.proteger_gobierno();

create or replace function public.proteger_roles_sistema()
returns trigger
language plpgsql
as $$
begin
  if old.es_sistema then
    raise exception 'El rol «%» es de sistema: se puede reasignar sus permisos, no borrarlo', old.nombre;
  end if;
  return old;
end;
$$;

drop trigger if exists trg_proteger_roles_sistema on public.roles;
create trigger trg_proteger_roles_sistema
  before delete on public.roles
  for each row execute function public.proteger_roles_sistema();

-- ---------- RLS del gobierno del acceso ----------
alter table public.permisos       enable row level security;
alter table public.roles          enable row level security;
alter table public.roles_permisos enable row level security;
alter table public.perfiles       enable row level security;

-- Catálogo de permisos: se lee (para pintar la matriz), no se escribe desde la app.
drop policy if exists permisos_lectura on public.permisos;
create policy permisos_lectura on public.permisos for select to authenticated using (true);

-- Roles y matriz: los ve cualquier autenticado; los cambia quien tenga admin.roles.
drop policy if exists roles_lectura   on public.roles;
drop policy if exists roles_escritura on public.roles;
create policy roles_lectura   on public.roles for select to authenticated using (true);
create policy roles_escritura on public.roles for all    to authenticated
  using (public.tiene_permiso('admin.roles')) with check (public.tiene_permiso('admin.roles'));

drop policy if exists roles_permisos_lectura   on public.roles_permisos;
drop policy if exists roles_permisos_escritura on public.roles_permisos;
create policy roles_permisos_lectura   on public.roles_permisos for select to authenticated using (true);
create policy roles_permisos_escritura on public.roles_permisos for all    to authenticated
  using (public.tiene_permiso('admin.roles')) with check (public.tiene_permiso('admin.roles'));

-- Perfiles: cada quien ve el suyo; la lista completa, solo con admin.usuarios.
-- La ESCRITURA no tiene política: se hace por la Edge Function `usuarios`, que
-- usa la clave de servicio y comprueba el permiso del llamante.
drop policy if exists perfiles_lectura on public.perfiles;
create policy perfiles_lectura on public.perfiles for select to authenticated
  using (id = auth.uid() or public.tiene_permiso('admin.usuarios'));

-- ---------- Las políticas de TODO el esquema, por permiso ----------
-- Van al final a propósito: `tiene_permiso()` tiene que existir antes.
-- Cada tabla pide el permiso de SU módulo, el mismo que comprueban el panel
-- y las Edge Functions. Cambiar un permiso en el módulo «Roles y permisos»
-- cambia lo que la base de datos deja ver, sin tocar este archivo.

drop policy if exists secciones_lectura   on public.secciones;
drop policy if exists secciones_escritura on public.secciones;
create policy secciones_lectura   on public.secciones for select to authenticated
  using (public.tiene_permiso('admin.informe'));
create policy secciones_escritura on public.secciones for all to authenticated
  using (public.tiene_permiso('admin.informe')) with check (public.tiene_permiso('admin.informe'));

drop policy if exists comentarios_lectura   on public.comentarios;
drop policy if exists comentarios_escritura on public.comentarios;
create policy comentarios_lectura   on public.comentarios for select to authenticated
  using (public.tiene_permiso('admin.informe'));
create policy comentarios_escritura on public.comentarios for all to authenticated
  using (public.tiene_permiso('admin.informe')) with check (public.tiene_permiso('admin.informe'));

drop policy if exists riesgos_lectura   on public.riesgos;
drop policy if exists riesgos_escritura on public.riesgos;
create policy riesgos_lectura   on public.riesgos for select to authenticated
  using (public.tiene_permiso('admin.informe'));
create policy riesgos_escritura on public.riesgos for all to authenticated
  using (public.tiene_permiso('admin.informe')) with check (public.tiene_permiso('admin.informe'));

drop policy if exists entrevistas_lectura   on public.entrevistas;
drop policy if exists entrevistas_escritura on public.entrevistas;
create policy entrevistas_lectura   on public.entrevistas for select to authenticated
  using (public.tiene_permiso('admin.entrevistas'));
create policy entrevistas_escritura on public.entrevistas for all to authenticated
  using (public.tiene_permiso('admin.entrevistas')) with check (public.tiene_permiso('admin.entrevistas'));

drop policy if exists archivos_lectura   on public.archivos;
drop policy if exists archivos_escritura on public.archivos;
create policy archivos_lectura   on public.archivos for select to authenticated
  using (public.tiene_permiso('admin.archivos'));
create policy archivos_escritura on public.archivos for all to authenticated
  using (public.tiene_permiso('admin.archivos')) with check (public.tiene_permiso('admin.archivos'));

drop policy if exists eventos_lectura   on public.eventos;
drop policy if exists eventos_escritura on public.eventos;
create policy eventos_lectura   on public.eventos for select to authenticated
  using (public.tiene_permiso('admin.timeline'));
create policy eventos_escritura on public.eventos for all to authenticated
  using (public.tiene_permiso('admin.timeline')) with check (public.tiene_permiso('admin.timeline'));

drop policy if exists conocimiento_lectura   on public.conocimiento;
drop policy if exists conocimiento_escritura on public.conocimiento;
create policy conocimiento_lectura   on public.conocimiento for select to authenticated
  using (public.tiene_permiso('admin.asistente'));
create policy conocimiento_escritura on public.conocimiento for all to authenticated
  using (public.tiene_permiso('admin.asistente')) with check (public.tiene_permiso('admin.asistente'));

drop policy if exists fragmentos_lectura   on public.fragmentos;
drop policy if exists fragmentos_escritura on public.fragmentos;
create policy fragmentos_lectura   on public.fragmentos for select to authenticated
  using (public.tiene_permiso('admin.asistente'));
create policy fragmentos_escritura on public.fragmentos for all to authenticated
  using (public.tiene_permiso('admin.asistente')) with check (public.tiene_permiso('admin.asistente'));

drop policy if exists insumos_anon on storage.objects;
drop policy if exists insumos_auth on storage.objects;
create policy insumos_auth on storage.objects for all to authenticated
  using (bucket_id = 'insumos' and public.tiene_permiso('admin.archivos'))
  with check (bucket_id = 'insumos' and public.tiene_permiso('admin.archivos'));

drop policy if exists personal_lectura   on public.personal;
drop policy if exists personal_escritura on public.personal;
create policy personal_lectura   on public.personal for select to authenticated
  using (public.tiene_permiso('admin.personal'));
create policy personal_escritura on public.personal for all to authenticated
  using (public.tiene_permiso('admin.personal')) with check (public.tiene_permiso('admin.personal'));

drop policy if exists fichas_tokens_lectura   on public.fichas_tokens;
drop policy if exists fichas_tokens_escritura on public.fichas_tokens;
create policy fichas_tokens_lectura   on public.fichas_tokens for select to authenticated
  using (public.tiene_permiso('admin.personal'));
create policy fichas_tokens_escritura on public.fichas_tokens for all to authenticated
  using (public.tiene_permiso('admin.personal')) with check (public.tiene_permiso('admin.personal'));

-- fichas_perfil: la escribe también la Edge Function `ficha` con la clave de
-- servicio (el llenado público no tiene sesión); el panel solo lee/exporta.
drop policy if exists fichas_perfil_lectura   on public.fichas_perfil;
drop policy if exists fichas_perfil_escritura on public.fichas_perfil;
create policy fichas_perfil_lectura   on public.fichas_perfil for select to authenticated
  using (public.tiene_permiso('admin.fichas'));
create policy fichas_perfil_escritura on public.fichas_perfil for all to authenticated
  using (public.tiene_permiso('admin.fichas')) with check (public.tiene_permiso('admin.fichas'));


-- ============================================================
-- 12. El informe como DATO consultable (02-sep-2026)
-- ============================================================
-- Hasta hoy el informe solo existía en Supabase como PROSA: la síntesis de
-- `conocimiento` más 23 chunks en `fragmentos` — el 0,7 % del índice de texto,
-- contra el 95,6 % que ocupan las transcripciones crudas. Consecuencia medida:
-- «¿cuáles son los cuellos de botella documentados?» no caía en el informe sino
-- en el diálogo de las entrevistas, y devolvía además FALSOS POSITIVOS que
-- invierten el sentido (en la 6.1 el «cuello de botella» es un control sano
-- DELIBERADO; en la 4.6 es una práctica de gobierno de la PMO; en la T47 es el
-- nombre de un procedimiento propuesto). Estas tablas exponen como dato lo que
-- el informe ya tenía estructurado en sus 68 tablas, para que la respuesta se
-- consulte en vez de adivinarse.
--
-- El repo sigue mandando; esto es su proyección a SQL. Fuentes:
--   · informe/fase1/mapa-procesos-datos.js ......... árbol 22/104/244
--   · informe/fase1/mapa-procesos-kenex.html ....... fricciones, prácticas, sistemas, cruces
--   · informe/fase1/informe-diagnostico-fase1.html . hallazgos, dependencias, brechas, vicios
-- Recargar todo con: python scripts/cargar-informe.py
--
-- RLS: LECTURA con `ver.informe` (el permiso que YA tiene el rol Junta) y
-- ESCRITURA con `admin.informe`. No se añadió ningún permiso nuevo a propósito:
-- el catálogo `permisos` está acoplado al código y una fila que nadie comprueba
-- no es un permiso.

-- ---------- 12.1 El mapa de procesos: árbol de tres niveles ----------
create table if not exists public.macroprocesos (
  id            text primary key,               -- e1…e5 · o1…o8 · s1…s9
  categoria     text not null check (categoria in ('estrategico','operativo','soporte')),
  nombre        text not null,
  nombre_corto  text,
  icono         text,
  orden         int  not null
);

create table if not exists public.procesos (
  id        text primary key,                   -- «o1.3»
  macro_id  text not null references public.macroprocesos(id) on delete cascade,
  orden     int  not null,
  nombre    text not null
);
create index if not exists procesos_macro_idx on public.procesos (macro_id);

create table if not exists public.procedimientos (
  id          text primary key,                 -- «o1.3.2»
  proceso_id  text not null references public.procesos(id) on delete cascade,
  orden       int  not null,
  texto       text not null,
  -- El proyecto ya hace este deslinde editorialmente (cursiva azul en el mapa):
  -- lo levantado en el diagnóstico vs. lo que UCAB propone. Perderlo aquí sería
  -- un retroceso: haría pasar una propuesta nuestra por un hallazgo del cliente.
  -- `sin_determinar` es honesto, no un descuido: los 15 procedimientos de s9
  -- existen SOLO en el informe, y la 6.5 dice expresamente que «en esta versión
  -- no se incluye la columna de estado». El flag hay que sacarlo del Excel v7
  -- o decidirlo con Jesús; hasta entonces no se afirma ni una cosa ni la otra.
  naturaleza  text not null
              check (naturaleza in ('levantado','propuesta_ucab','sin_determinar')),
  -- 244 del mapa v7 + los 15 de s9 Mejora Continua que solo lista el informe.
  -- El informe cita 260: la diferencia son esos 15 más 1 duplicado que el mapa
  -- v7 ya eliminó. Cifra EN CONCILIACIÓN con Jesús — ver public.catalogo_datos.
  fuente      text not null check (fuente in ('mapa_v7','informe_s9'))
);
create index if not exists procedimientos_proceso_idx on public.procedimientos (proceso_id);

-- ---------- 12.2 Fricciones y buenas prácticas por macroproceso ----------
-- LA respuesta a «cuellos de botella». Cada fila trae su referencia de origen
-- («6.2 · E-03») para que toda afirmación sea rastreable al informe o a la
-- entrevista. Ojo: `practicas_buenas` es lo CONTRARIO — ahí vive el control
-- sano que la búsqueda de texto confundía con una falla.
create table if not exists public.fricciones (
  id          bigserial primary key,
  macro_id    text not null references public.macroprocesos(id) on delete cascade,
  orden       int  not null,
  texto       text not null,
  referencia  text,
  unique (macro_id, orden)
);

create table if not exists public.practicas_buenas (
  id          bigserial primary key,
  macro_id    text not null references public.macroprocesos(id) on delete cascade,
  orden       int  not null,
  texto       text not null,
  referencia  text,
  unique (macro_id, orden)
);

create table if not exists public.macroproceso_sistemas (
  macro_id  text not null references public.macroprocesos(id) on delete cascade,
  sistema   text not null,
  primary key (macro_id, sistema)
);

-- Nodos que no son macroprocesos del grupo: Casio Japón, fábricas, clientes.
create table if not exists public.nodos_externos (
  id      text primary key,
  nombre  text not null,
  icono   text
);

-- Aristas del mapa. Sin clave foránea a propósito: origen/destino mezclan
-- macroprocesos con nodos externos.
create table if not exists public.cruces_procesos (
  id        bigserial primary key,
  orden     int  not null unique,
  origen    text not null,
  destino   text not null,
  tipo      text not null check (tipo in ('troncal','cruce_documentado','externa')),
  etiqueta  text
);

-- ---------- 12.3 Hallazgos consolidados y sus derivados ----------
create table if not exists public.hallazgos (
  id              bigserial primary key,
  orden           int  not null unique,
  titulo          text not null,
  criticidad      text not null,          -- Alta · Media-Alta · Media · Oportunidad
  seccion_origen  text,                   -- «7.7», «5.3»
  implicacion     text
);

create table if not exists public.hallazgo_factores (
  hallazgo_id  bigint not null references public.hallazgos(id) on delete cascade,
  factor       text   not null,
  primary key (hallazgo_id, factor)
);

create table if not exists public.dependencias_criticas (
  id              bigserial primary key,
  orden           int  not null unique,
  persona_o_rol   text not null,
  dependencia     text,
  impacto         text,
  mitigacion      text,
  severidad       text,                   -- alta · media-alta (viene del h4, no de columna)
  seccion_origen  text
);

create table if not exists public.brechas_rrhh (
  id            bigserial primary key,
  orden         int  not null unique,
  proceso_rrhh  text not null,
  severidad     text,                     -- Crítica · Alta · Media
  hallazgo      text,
  exigencia     text
);

create table if not exists public.procesos_sin_sistema (
  id           bigserial primary key,
  orden        int  not null unique,
  proceso      text not null,
  -- `bloque` es el enunciado del grupo (los tres vacíos de la 8.5: Excel como
  -- sistema de decisión · sin captura sistematizada · IA individual sobre
  -- Excel). `naturaleza` es la columna de la fila, con 11 valores distintos:
  -- son cosas diferentes y agrupar por la segunda no da los tres bloques.
  bloque       text,
  naturaleza   text,
  detalle      text,
  area_o_pais  text                       -- solo cuando el país va en el nombre del proceso
);

create table if not exists public.sistemas_por_pais (
  sistema  text not null,
  pais     text not null,
  estado   text,
  -- Conclusión por sistema; se repite en las 6 filas del mismo sistema.
  -- La fila «BI / analítica» es una sola celda con colspan=6 en el informe:
  -- su literal se replicó por país porque no hay valor desagregado.
  lectura  text,
  primary key (sistema, pais)
);

-- Los vicios venían encapsulados como «(1)… (2)… (3)…» dentro de 8 celdas de
-- la 4.7. Aquí van partidos: una fila por vicio, o la consulta devolvería
-- 8 párrafos en vez de ~30 hallazgos.
create table if not exists public.vicios_flujo (
  id            bigserial primary key,
  flujo_codigo  text not null,            -- F1…F8
  flujo_nombre  text,
  orden_vicio   int  not null,
  texto         text not null,
  unique (flujo_codigo, orden_vicio)
);

-- ---------- 12.4 Lo que el informe PROPONE (no es hallazgo) ----------
-- Las 12 decisiones de la 1.3, en tres grupos de cuatro.
create table if not exists public.decisiones_junta (
  id              bigserial primary key,
  orden           int  not null unique,
  ambito          text,                   -- primera columna de la tabla
  grupo           text,                   -- la fila-cabecera que agrupa de cuatro en cuatro
  decision        text not null,
  seccion_origen  text                    -- el paréntesis final literal, p. ej. «3.4 · 11»
);

create table if not exists public.quick_wins (
  id                  bigserial primary key,
  orden               int  not null unique,
  nombre              text not null,
  que_es              text,
  por_que             text,
  que_resolver_antes  text,
  como_se_mide        text
);

-- ---------- 12.4b La estructura real y vigente del informe ----------
-- No se toca `secciones`: esa es la tabla de SEGUIMIENTO EDITORIAL del panel
-- (estado completa/parcial/borrador/pendiente/interna, más el responsable de
-- cada sección), y su vocabulario es de proceso de trabajo, no de documento.
-- Su contenido quedó con la numeración de julio —dice s9 = «Síntesis de
-- hallazgos», s11 = «Auditoría Lark y Odoo»—, dos generaciones atrás; re-
-- indexarla es decisión del equipo, no de este guion. Aquí va la estructura
-- del documento tal como está HOY: 16 h2 + 66 h3 en orden de lectura.
create table if not exists public.informe_estructura (
  id              text primary key,        -- «s7», «s7-11»
  numero          text,                    -- «7», «7.11»; null en índice y anexos
  titulo          text not null,
  nivel           int  not null check (nivel in (2, 3)),
  orden_documento int  not null unique,
  rotulo          text                     -- «Borrador», «Preborrador de propuesta», …
);
alter table public.informe_estructura enable row level security;
comment on table public.informe_estructura is
  'Estructura real y vigente del informe, en orden de lectura. El cuerpo termina en la sección 12: NO existen s13 ni s14, y los anexos conservan los ids fósiles s15/s16/s17. Las minutas y entrevistas del corpus citan numeraciones ANTIGUAS: manda esta tabla.';

-- Columnas añadidas después de la primera creación de las tablas: los
-- `create table if not exists` de arriba ya las traen para una instalación
-- nueva, y estos `alter` las ponen donde las tablas ya existían.
alter table public.procesos_sin_sistema add column if not exists bloque  text;
alter table public.sistemas_por_pais    add column if not exists lectura text;
alter table public.decisiones_junta     add column if not exists ambito  text;
alter table public.decisiones_junta     add column if not exists grupo   text;

-- ---------- 12.5 El catálogo: dónde mirar y qué NO confundir ----------
-- Sin esto, un modelo que llega a la base por primera vez se zambulle en
-- `fragmentos` (95,6 % del índice, transcripciones crudas) y responde con
-- diálogo suelto. Esta tabla es el mapa de la base para quien la consulta.
create table if not exists public.catalogo_datos (
  tabla        text primary key,
  descripcion  text not null,
  cuando_usar  text,
  advertencia  text,
  filas_aprox  int
);

-- ---------- 12.6 La vista consolidada de cuellos de botella ----------
-- La pregunta «dime los procesos cuello de botella documentados» no tiene UNA
-- fuente en el informe: se construye uniendo fricciones de proceso, hallazgos
-- consolidados de criticidad alta, brechas críticas de RRHH, vicios de flujo y
-- procesos sin sistema. Esta vista hace esa unión explícita y trazable.
-- security_invoker: sin él la vista saltaría la RLS de sus tablas.
drop view if exists public.v_cuellos_de_botella;
create view public.v_cuellos_de_botella
  with (security_invoker = true) as
select 'friccion de proceso'   as origen_tipo,
       coalesce(m.nombre_corto, m.nombre) as ambito,
       f.texto, null::text as severidad, f.referencia as origen
  from public.fricciones f join public.macroprocesos m on m.id = f.macro_id
union all
select 'hallazgo consolidado', coalesce(h.seccion_origen, '11.2'),
       h.titulo, h.criticidad, h.seccion_origen
  from public.hallazgos h
 where h.criticidad in ('Alta','Media-Alta')
union all
select 'brecha de RRHH', b.proceso_rrhh, b.hallazgo, b.severidad, '5.3'
  from public.brechas_rrhh b
 where b.severidad = 'Crítica'
union all
select 'vicio de flujo', coalesce(v.flujo_nombre, v.flujo_codigo),
       v.texto, null, '4.7'
  from public.vicios_flujo v
union all
select 'proceso sin sistema', s.proceso, coalesce(s.detalle, s.proceso),
       s.naturaleza, '8.5'
  from public.procesos_sin_sistema s;

-- ---------- 12.7 Comentarios (los ve quien lista las tablas) ----------
comment on table public.macroprocesos is
  'Mapa de procesos, nivel 1: 22 macroprocesos (5 estratégicos, 8 operativos, 9 de soporte). Fuente: mapa-procesos-datos.js (Excel v7, corte 18-jul-2026).';
comment on table public.procesos is 'Mapa de procesos, nivel 2: 104 procesos. Cuelgan de macroprocesos.';
comment on table public.procedimientos is
  'Mapa de procesos, nivel 3. 244 del mapa v7 + 15 de s9 que solo lista el informe. naturaleza distingue lo LEVANTADO en el diagnóstico de lo PROPUESTO por UCAB: no los mezcles al responder.';
comment on table public.fricciones is
  'Las fricciones documentadas por macroproceso: la respuesta a «cuellos de botella». 12 filas en 9 macroprocesos; los otros 13 macroprocesos no tienen fricción REGISTRADA, que no es lo mismo que no tener fricción.';
comment on table public.practicas_buenas is
  'Buenas prácticas replicables (6.4). CUIDADO: aquí vive el «control sano» que la búsqueda de texto confundía con un cuello de botella.';
comment on table public.hallazgos is 'Los 21 hallazgos consolidados por criticidad de la sección 11.2. Es la sábana de hallazgos del informe.';
comment on table public.dependencias_criticas is 'Las 12 dependencias críticas de personas individuales (4.5). Uno de los cuatro números que la Junta debe retener.';
comment on table public.vicios_flujo is 'Vicios detectados en los flujos operativos F1-F8 (4.7), partidos uno por fila.';
comment on view public.v_cuellos_de_botella is
  'EMPIEZA AQUÍ para cualquier pregunta sobre cuellos de botella, fricciones, atascos o dolores de proceso. Une las cinco fuentes del informe con su trazabilidad. No busques esto en fragmentos: ahí solo hay diálogo crudo de entrevistas.';
comment on table public.catalogo_datos is 'Guía de esta base de datos: qué hay en cada tabla, cuándo usarla y qué no confundir. Léela antes de consultar.';

-- ---------- 12.8 RLS de la sección 12 ----------
alter table public.macroprocesos         enable row level security;
alter table public.procesos              enable row level security;
alter table public.procedimientos        enable row level security;
alter table public.fricciones            enable row level security;
alter table public.practicas_buenas      enable row level security;
alter table public.macroproceso_sistemas enable row level security;
alter table public.nodos_externos        enable row level security;
alter table public.cruces_procesos       enable row level security;
alter table public.hallazgos             enable row level security;
alter table public.hallazgo_factores     enable row level security;
alter table public.dependencias_criticas enable row level security;
alter table public.brechas_rrhh          enable row level security;
alter table public.procesos_sin_sistema  enable row level security;
alter table public.sistemas_por_pais     enable row level security;
alter table public.vicios_flujo          enable row level security;
alter table public.decisiones_junta      enable row level security;
alter table public.quick_wins            enable row level security;
alter table public.catalogo_datos        enable row level security;

-- ============================================================
-- 13. La arquitectura de IA (la torre) y el prototipo (02-sep-2026)
-- ============================================================
-- ⚠️ TODO lo de esta sección es PROPUESTA del equipo consultor, no hallazgo
-- del diagnóstico: una arquitectura de IA transversal NO existe hoy en la
-- organización, y `/sistema` es un prototipo. Al responder, no mezclar esto
-- con las tablas de la sección 12, que son lo que la evidencia sostiene.
--
-- Fuentes (fuente única de las páginas que lo dibujan):
--   · informe/fase1/arquitectura-datos.js .. niveles, raíces, bajadas, cedazo
--   · sistema/nucleo/agentes.js ............ reglas de negocio, acciones, escalera
-- Recargar con: python scripts/cargar-informe.py
--
-- ⚠️ Deliberadamente NO se cargan las cifras de sistema/datos/*.js (ventas,
-- existencias, clientes): el propio archivo las rotula «CIFRAS DE PROTOTIPO».
-- Son inventadas para que el prototipo se pueda enseñar, y sentarlas en la
-- misma base que consulta la Junta invitaría a preguntar «¿cuánto vendimos?»
-- y recibir un número falso con cara de dato.

create table if not exists public.ia_niveles (
  id       text primary key,               -- ingesta · cimiento · inteligencia · decision
  n        int  not null unique,
  nombre   text not null,
  capa     text,                           -- «la fuente de la verdad»
  lema     text,
  que      text,
  no_hace  text                            -- lo que ese piso NO hace, dicho a propósito
);

create table if not exists public.ia_nivel_hace (
  nivel_id  text not null references public.ia_niveles(id) on delete cascade,
  orden     int  not null,
  texto     text not null,
  primary key (nivel_id, orden)
);

create table if not exists public.ia_agentes (
  id               bigserial primary key,
  nivel_id         text not null references public.ia_niveles(id) on delete cascade,
  orden            int  not null,
  nombre           text not null,
  autonomia        int,                    -- 1 preparé · 2 hice · 3 tu firma
  autonomia_verbo  text,
  que              text,
  unique (nivel_id, orden)
);

-- Las doce raíces: dónde nace el dato. `rompe` es la columna que convierte el
-- diagrama en argumento — qué se cae si esa fuente falta.
create table if not exists public.ia_raices (
  id          text primary key,
  orden       int  not null unique,
  nombre      text not null,
  dato        text,
  via         text,                        -- clave de ia_vias (sin FK: se declara más abajo)
  via_rotulo  text,
  cadencia    text,
  dueno       text,
  nivel       text,
  hoy         text,                        -- cómo llega hoy, sin señalar a nadie
  rompe       text,
  grado       int,                          -- 2 serio · 3 crítico
  ritmo       int                           -- 1 a tirones … 5 continuo
);

create table if not exists public.ia_bajadas (
  id     text primary key,
  orden  int  not null unique,
  desde  text,
  hacia  text,
  que    text,
  nota   text
);

create table if not exists public.ia_vias (
  clave    text primary key,
  rotulo   text not null,
  detalle  text
);

create table if not exists public.ia_cedazo_criterios (
  orden  int  primary key,
  texto  text not null
);

-- ---------- El prototipo: las reglas con dueño, fecha y versión ----------
-- Es la pieza más citable del prototipo: cada umbral tiene un responsable
-- humano y un número de versión, que es justo lo que el informe reclama.
create table if not exists public.proto_reglas (
  clave    text primary key,
  orden    int  not null,
  valor    text not null,
  unidad   text,
  dueno    text,
  desde    date,
  version  int
);

create table if not exists public.proto_escalera (
  n      int  primary key,
  clave  text not null,
  texto  text not null
);

create table if not exists public.proto_acciones (
  clave               text primary key,    -- N-01, C-03, …
  orden               int  not null,
  modulo              text,
  agente              text,
  nombre              text,
  dispara             text,
  cruza               text,
  eje_perimetro       text,
  eje_reversibilidad  text,
  eje_radio           text,
  eje_dinero          text,
  eje_reloj           text
);

comment on table public.ia_raices is
  'Las 12 fuentes de dato de la arquitectura propuesta. La columna `rompe` dice qué se cae sin esa fuente, y `hoy` cómo llega actualmente. PROPUESTA, no hallazgo.';
comment on table public.ia_niveles is
  'Los 4 niveles de la torre de arquitectura de IA propuesta (sección 10). `no_hace` es explícito a propósito: dice dónde el diagrama NO promete.';
comment on table public.proto_reglas is
  'Las 13 reglas de negocio del prototipo, cada una con dueño, fecha de vigencia y versión. Es diseño PROPUESTO, no la política vigente de Kenex.';
comment on table public.proto_acciones is
  'Las 11 acciones de agente del prototipo, con su gramática de autonomía en cinco ejes (perímetro, reversibilidad, radio, dinero, reloj). Diseño propuesto.';

-- ============================================================
-- 14. El organigrama: declarado, real y propuesto (02-sep-2026)
-- ============================================================
-- Fuentes: informe/fase1/organigrama-kenex.html (los datos van hardcodeados en
-- su <script>) y informe/fase1/organigrama-propuesto-datos.js (fuente única de
-- la estructura propuesta de la 4.8, que consumen las dos vistas del sitio).
--
-- Lo que hace valioso a este conjunto es el sistema de tres capas: lo que el
-- papel DECLARA, lo que la operación hace REALMENTE (con su evidencia [E-xx]),
-- y lo que se PROPONE. `delta` es el badge de diferencia entre las dos
-- primeras — el dato que no está en ningún organigrama oficial de Kenex.
--
-- ⚠️ Cuatro cosas que la extracción dejó claras y conviene no olvidar:
--  · `org_personas` son NODOS NOMBRADOS, no personas únicas: 12 actores
--    aparecen en más de un nodo porque operan en más de un país o entidad
--    —que es justamente el hallazgo de la 4.4—. `org_mismo_actor` mapea esos
--    casos. NO se deduplicó a propósito: colapsarlos borraría el hallazgo.
--  · Tampoco son solo personas: hay unidades y terceros sin nombre propio
--    (negocios del family office, «Tiendas», presencias menores por país).
--  · `capa` es DERIVADO de la regla CSS del archivo, que oculta ciertos nodos
--    en la vista «declarado». El archivo NO marca la capa nodo a nodo.
--  · 60 de los 139 nodos no traen id en la fuente: llevan uno sintético con
--    prefijo (`gen:`, `dep:`, `agr:`, `chp:`), y `id_origen` lo registra.

create table if not exists public.org_personas (
  id               text primary key,
  id_origen        text,          -- «fuente» si el id es del archivo, «sintetico» si lo generamos
  nombre           text,
  rol              text,
  tipo             text,
  tipo_etiqueta    text,
  capa             text,          -- derivado: «real» (18) · «declarado+real» (121)
  padre_id         text,          -- sin FK: la capa real tiene nodos colgando de cajas de markup
  meta             text,
  advertencia      text,          -- 28 nodos la traen: lo que el papel no dice
  nota             text,
  delta            text,          -- badge de diferencia declarado vs. real
  delta_etiqueta   text,
  bloque           text,
  entidad_id       text,
  departamento_id  text,
  reside_en        text,
  equipo           text,
  alcance          text
);
create index if not exists org_personas_padre_idx   on public.org_personas (padre_id);
create index if not exists org_personas_entidad_idx on public.org_personas (entidad_id);

-- 11 paneles, de los cuales dos no son entidades jurídicas: el organigrama
-- oficial en papel y el panel de «presencias menores». `headcount` es texto
-- porque la fuente escribe cosas como «holding», no solo cifras.
create table if not exists public.org_entidades (
  id          text primary key,
  nombre      text not null,
  pais        text,          -- derivado de la bandera; null en los dos paneles que no son país
  bandera     text,
  subtitulo   text,
  tipo        text,
  headcount   text,
  socio       boolean,
  nota        text,
  notas       jsonb
);

create table if not exists public.org_departamentos (
  id          text primary key,
  id_origen   text,
  nombre      text not null,
  entidad_id  text,
  pais        text,
  headcount   text
);

-- Los 19 flujos funcionales. `tipo` no existe en la fuente y se omite.
create table if not exists public.org_flujos (
  id           text primary key,
  nombre       text not null,
  descripcion  text,
  color        text
);

-- Un par es solo dos extremos: la fuente no rotula las aristas. Los extremos
-- apuntan a nodos, a entidades, a un departamento y a presencias menores, así
-- que no llevan clave foránea.
create table if not exists public.org_flujo_pares (
  id        bigserial primary key,
  flujo_id  text not null references public.org_flujos(id) on delete cascade,
  orden     int,
  origen    text,
  destino   text
);

-- La fuente da un solo texto por alerta: no hay título ni severidad separados.
create table if not exists public.org_alertas (
  id             text primary key,
  orden          int,
  texto          text,
  nodo_o_ambito  text
);

create table if not exists public.org_solapes (
  id       text primary key,
  orden    int,
  titulo   text,
  ambitos  jsonb,
  pares    jsonb,
  nota     text
);

-- ⚠️ No existe un catálogo de evidencias en el repo: los 19 códigos [E-xx]
-- solo aparecen incrustados dentro de los textos de otros campos. Aquí queda
-- el código, cuántas veces se cita y en qué campo exacto — no su enunciado,
-- que habría que redactar. Faltan además E-02, E-04, E-07, E-10 y E-16.
create table if not exists public.org_evidencias (
  codigo       text primary key,
  citas        int,
  referencias  jsonb          -- rutas «fila.campo» donde aparece el código
);

-- Recuadros sin nombre propio del organigrama (equipos contados en bloque).
create table if not exists public.org_agregados (
  id               text primary key,
  padre_id         text,
  bloque           text,
  entidad_id       text,
  departamento_id  text,
  texto            text
);

create table if not exists public.org_comites (
  id           text primary key,
  nombre       text not null,
  composicion  text
);

-- La leyenda de los badges de diferencia: sin esto, `delta` es un emoji suelto.
-- La llave es `clave`, no `badge`: uno de los seis casos (🕳 vacante) no existe
-- como dato en la fuente —se rastrea por el emoji dentro de otros textos—, así
-- que su badge viene vacío.
create table if not exists public.org_deltas_catalogo (
  clave        text primary key,
  badge        text,
  nombre       text,
  descripcion  text
);

-- Los 12 actores que aparecen en más de un nodo. Es la respuesta a «quién
-- opera en varios grupos» y el modo correcto de contar personas únicas.
create table if not exists public.org_mismo_actor (
  nombre  text primary key,
  ids     jsonb not null
);

create table if not exists public.org_escenas (
  id            text primary key,
  orden         int,
  nombre        text not null,
  elemento      text,
  abre_flujos   boolean
);

-- La estructura propuesta de la 4.8. Se omiten a propósito las coordenadas de
-- píxel: la geometría es del dibujo, y su fuente única sigue siendo el .js.
create table if not exists public.estructura_propuesta (
  clave     text primary key,
  orden     int,
  tipo      text,
  titulo    text,
  etiqueta  text,
  nota      text
);

comment on table public.org_personas is
  'Los 139 NODOS NOMBRADOS del organigrama (no personas únicas: 12 actores repiten nodo, ver org_mismo_actor) con su capa declarado/real. `advertencia` y `delta` son el hallazgo: la diferencia entre el papel y la operación no aparece en ningún organigrama oficial de Kenex. Incluye unidades y terceros sin persona.';
comment on table public.org_mismo_actor is
  'Los 12 actores que ocupan más de un nodo del organigrama, por operar en varios países o entidades. Es el hallazgo de la 4.4 y la forma correcta de contar personas únicas: org_personas tiene nodos, no personas.';
comment on table public.org_evidencias is
  'Los 19 códigos [E-xx] que sostienen la capa real, con su recuento de citas y dónde aparecen. NO existe un catálogo con su enunciado: los códigos solo viven incrustados en otros textos.';
comment on table public.org_deltas_catalogo is
  'Leyenda de los badges de diferencia entre el organigrama declarado y el real. Necesaria para interpretar org_personas.delta.';
comment on table public.estructura_propuesta is
  'La estructura organizativa PROPUESTA (sección 4.8), 29 nodos. Es propuesta del equipo consultor, no la estructura vigente: esa está en org_personas y en personal.';
comment on table public.org_agregados is
  'Recuadros del organigrama que cuentan equipos en bloque, sin nombrar a nadie. Complementan org_personas para totales de plantilla.';

-- Un par de políticas por tabla, iguales para todas: ver con `ver.informe`,
-- escribir con `admin.informe`.
do $$
declare t text;
begin
  foreach t in array array[
    'macroprocesos','procesos','procedimientos','fricciones','practicas_buenas',
    'macroproceso_sistemas','nodos_externos','cruces_procesos','hallazgos',
    'hallazgo_factores','dependencias_criticas','brechas_rrhh',
    'procesos_sin_sistema','sistemas_por_pais','vicios_flujo',
    'decisiones_junta','quick_wins','catalogo_datos','informe_estructura',
    'ia_niveles','ia_nivel_hace','ia_agentes','ia_raices','ia_bajadas',
    'ia_vias','ia_cedazo_criterios','proto_reglas','proto_escalera',
    'proto_acciones',
    'org_personas','org_entidades','org_departamentos','org_flujos',
    'org_flujo_pares','org_alertas','org_solapes','org_evidencias',
    'org_agregados','org_comites','org_deltas_catalogo','org_mismo_actor',
    'org_escenas','estructura_propuesta']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists %I on public.%I', t || '_lectura', t);
    execute format('drop policy if exists %I on public.%I', t || '_escritura', t);
    execute format(
      'create policy %I on public.%I for select to authenticated using (public.tiene_permiso(%L))',
      t || '_lectura', t, 'ver.informe');
    execute format(
      'create policy %I on public.%I for all to authenticated using (public.tiene_permiso(%L)) with check (public.tiene_permiso(%L))',
      t || '_escritura', t, 'admin.informe', 'admin.informe');
  end loop;
end $$;
