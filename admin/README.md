# Panel administrativo (Admin)

Sección **interna** del aplicativo Rower: módulos de trabajo del equipo consultor, con navegación por *sidebar*. Es la contraparte del **Front** (el informe navegable en `informe/fase1/`, cara pública del proyecto).

- **Entrada:** [`admin/index.html`](index.html) (enlazado desde el portal raíz **a través de `/acceso/`**).
- **Acceso:** exige sesión de Supabase Auth. El guardia [`../supabase/sesion.js`](../supabase/sesion.js) va en el `<head>` con `data-proteger` y rebota a `/acceso/?destino=admin%2F` si no hay sesión viva. La barra superior muestra quién está dentro y el botón **Salir**.
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
- Redeploy: `supabase functions deploy extraer-entrevista --project-ref <ref>` (con verificación de JWT). Rotar la clave: `supabase secrets set ANTHROPIC_API_KEY=... --project-ref <ref>`.
- 🔒 Exige sesión: el panel manda el JWT del consultor (`cabecerasFn()` en `index.html`) y la función lo valida con [`../supabase/functions/_shared/acceso.ts`](../supabase/functions/_shared/acceso.ts). Con la clave publishable responde **401**.

## Archivos (insumos)

Repositorio de documentos de trabajo (Excel, PowerPoint, PDF, CSV, Word…). Los binarios viven en el **bucket de Supabase Storage `insumos`** (privado); los metadatos (nombre, descripción, categoría, tipo, tamaño, etiquetas) en la tabla `archivos`. El módulo permite subir varios a la vez, buscar, filtrar por categoría/tipo, descargar y eliminar. El bucket y las políticas están en [`../supabase/schema.sql`](../supabase/schema.sql).

## 🔒 Seguridad (cerrada el 04-ago-2026)

El panel corre **con autenticación**. Lo que cambió respecto del arranque:

- Todas las políticas `*_escritura_anon` y `insumos_anon` fueron **eliminadas**, y la **lectura** también exige `authenticated`: con la clave publishable en la mano no se ve ni una fila.
- Las Edge Functions validan la credencial en su propio código (`_shared/acceso.ts`), además del `verify_jwt` de la pasarela.
- El **registro abierto está deshabilitado** en Supabase Auth: las cuentas las crea el equipo técnico (ver `../supabase/README.md`).
- La fila `E-DEMO` es solo semilla de demostración; puede borrarse.

Queda como mejora, no como agujero: **perfiles diferenciados**. Hoy toda cuenta autenticada ve el informe *y* el panel. Cuando entren cuentas de la Junta conviene separar con `user_metadata.rol` (un chequeo en el guardia y políticas por rol).
