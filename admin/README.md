# Panel administrativo (Admin)

Sección **interna** del aplicativo Rower: módulos de trabajo del equipo consultor, con navegación por *sidebar*. Es la contraparte del **Front** (el informe navegable en `informe/fase1/`, cara pública del proyecto).

- **Entrada:** [`admin/index.html`](index.html) (enlazado desde el portal raíz **a través de `/acceso/`**).
- **Acceso:** exige sesión de Supabase Auth **y el permiso `admin.entrar`**. El guardia [`../supabase/sesion.js`](../supabase/sesion.js) va en el `<head>` con `data-proteger data-permiso="admin.entrar"` y rebota a `/acceso/?destino=admin%2F` si falta cualquiera de los dos. La barra superior muestra quién está dentro, con su rol, y el botón **Salir**.
- **Datos:** Supabase (`@supabase/supabase-js` desde CDN + `../supabase/cliente.js`). Ver [`../supabase/README.md`](../supabase/README.md).
- **Paleta y tipografía:** las de `gestion/CONVENCIONES.md` (sidenav gradiente navy, ítem activo con borde `#9dc3ee`).

## Módulos

| Módulo | Estado | Permiso | Fuente de datos |
|---|---|---|---|
| **Asistente IA** | ✅ Activo | `admin.asistente` | Edge Function `asistente` + `conocimiento`/`fragmentos` |
| **Entrevistas transcritas** | ✅ Activo | `admin.entrevistas` | Tabla `entrevistas` + **autocompletar con IA** al subir el crudo |
| **Archivos (insumos)** | ✅ Activo | `admin.archivos` | Bucket `insumos` + tabla `archivos` |
| **Línea de tiempo** | ✅ Activo | `admin.timeline` | Tabla `eventos` |
| **Usuarios** | ✅ Activo | `admin.usuarios` | Edge Function `usuarios` + tabla `perfiles` |
| **Roles y permisos** | ✅ Activo | `admin.roles` | Tablas `roles`, `permisos`, `roles_permisos` |
| Estado del informe | 🚧 Próximamente | `admin.informe` | Tabla `secciones` |
| Comentarios | 🚧 Próximamente | `admin.informe` | Tabla `comentarios` |
| Matriz de riesgos | 🚧 Próximamente | `admin.informe` | Tabla `riesgos` |

El shell es una SPA de un solo archivo con enrutado por hash (`#entrevistas`, `#entrevistas/nueva`, `#entrevistas/<id>`). Para añadir un módulo: crear su vista en el objeto `routes` de `index.html`, su ítem en el `<nav>`, y **su permiso en `PERMISO_RUTA`** — sin esa entrada el módulo queda abierto a cualquiera que entre al panel.

## Usuarios y roles

- **Usuarios**: da de alta con clave (hay generador: sílabas legibles al dictarla, sin `l/1/O/0`), asigna rol, repone claves, da de baja y elimina. La clave se muestra **una sola vez** al crearla — cópiala y pásala por un canal privado.
- **Roles y permisos**: matriz rol × permiso. Cada casilla es una fila de `roles_permisos`; se guarda al tocarla y rige de inmediato, también en la base de datos. Las dos casillas del rol Administrador que gobiernan el acceso salen **fijas**: sin ellas nadie podría volver a repartir permisos.
- Ocultar un módulo en el menú es cortesía; lo que cierra el dato es RLS. Ver [`../supabase/README.md`](../supabase/README.md#roles-y-permisos).

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

- **Los perfiles diferenciados ya están** (04-ago-2026): cuatro roles y diez permisos, con RLS por permiso. Una cuenta `junta` ve el informe y nada más; una cuenta `pendiente` no ve nada. Ver arriba.

Lo que sigue siendo cierto y conviene no olvidar: **el HTML se sirve estático**. Quien conozca la URL exacta de un archivo del informe puede descargarlo sin sesión. El login y los permisos cierran el dato, no los archivos.
