# Panel administrativo (Admin)

Sección **interna** del aplicativo Rower: módulos de trabajo del equipo consultor, con navegación por *sidebar*. Es la contraparte del **Front** (el informe navegable en `informe/fase1/`, cara pública del proyecto).

- **Entrada:** [`admin/index.html`](index.html) (enlazado desde el portal raíz).
- **Datos:** Supabase (`@supabase/supabase-js` desde CDN + `../supabase/cliente.js`). Ver [`../supabase/README.md`](../supabase/README.md).
- **Paleta y tipografía:** las de `gestion/CONVENCIONES.md` (sidenav gradiente navy, ítem activo con borde `#9dc3ee`).

## Módulos

| Módulo | Estado | Fuente de datos |
|---|---|---|
| **Entrevistas transcritas** | ✅ Activo | Tabla `entrevistas` (listar, buscar, filtrar, crear, editar, eliminar) + **autocompletar con IA** al subir el crudo |
| **Archivos (insumos)** | ✅ Activo | Bucket de Storage `insumos` + tabla `archivos` (subir varios Excel/PowerPoint/PDF, buscar, filtrar por categoría/tipo, descargar, eliminar) |
| Estado del informe | 🚧 Próximamente | Tabla `secciones` |
| Comentarios | 🚧 Próximamente | Tabla `comentarios` |
| Matriz de riesgos | 🚧 Próximamente | Tabla `riesgos` |

El shell es una SPA de un solo archivo con enrutado por hash (`#entrevistas`, `#entrevistas/nueva`, `#entrevistas/<id>`). Para añadir un módulo: crear su vista en el objeto `routes` de `index.html` y su ítem en el `<nav>`.

## Autocompletar con IA

En el formulario de entrevista puedes **subir el crudo** (`.md`, `.json`, `.txt`) y la IA rellena los campos (entrevistado, cargo, área, país, fecha, entrevistador, duración, etiquetas y un resumen). El texto crudo se vuelca en `transcripción` y el resto se completa automáticamente; **revisas y guardas**.

- El navegador **no** contiene la API key de Anthropic. La llamada va a la **Supabase Edge Function** [`extraer-entrevista`](../supabase/functions/extraer-entrevista/index.ts), que llama a Claude (modelo `claude-opus-4-8`) con la clave guardada como **secreto de Supabase** (`ANTHROPIC_API_KEY`).
- La función respeta las convenciones del proyecto (Kenex con una "n", correcciones de dictado, listas cerradas de área/país, resumen cliente-facing).
- Redeploy: `supabase functions deploy extraer-entrevista --no-verify-jwt --project-ref <ref>`. Rotar la clave: `supabase secrets set ANTHROPIC_API_KEY=... --project-ref <ref>`.
- ⚠️ Está desplegada con `--no-verify-jwt` (sin login aún) — cualquiera con la URL podría invocarla y consumir cuota de Anthropic. Al activar Auth, exigir JWT o una comprobación de sesión.

## Archivos (insumos)

Repositorio de documentos de trabajo (Excel, PowerPoint, PDF, CSV, Word…). Los binarios viven en el **bucket de Supabase Storage `insumos`** (privado); los metadatos (nombre, descripción, categoría, tipo, tamaño, etiquetas) en la tabla `archivos`. El módulo permite subir varios a la vez, buscar, filtrar por categoría/tipo, descargar y eliminar. El bucket y las políticas están en [`../supabase/schema.sql`](../supabase/schema.sql).

## ⚠️ Seguridad — pendiente antes de datos reales

El panel **aún no tiene autenticación** (decisión de arranque). Para que funcione sin login hay políticas de acceso anónimo transitorias en: la tabla `entrevistas` (`entrevistas_escritura_anon`), la tabla `archivos` (`archivos_escritura_anon`), el bucket de Storage `insumos` (`insumos_anon`) y la Edge Function `extraer-entrevista` (`--no-verify-jwt`). Por eso:

- **No cargar contenido real sensible** (transcripciones, insumos confidenciales) hasta activar **Supabase Auth** y cerrar todas esas políticas anónimas.
- La fila `E-DEMO` es solo semilla de demostración; puede borrarse.

Siguiente paso previsto: login con Supabase Auth y restringir lectura/escritura a usuarios autenticados del equipo.
