# Panel administrativo (Admin)

Sección **interna** del aplicativo Rower: módulos de trabajo del equipo consultor, con navegación por *sidebar*. Es la contraparte del **Front** (el informe navegable en `informe/fase1/`, cara pública del proyecto).

- **Entrada:** [`admin/index.html`](index.html) (enlazado desde el portal raíz).
- **Datos:** Supabase (`@supabase/supabase-js` desde CDN + `../supabase/cliente.js`). Ver [`../supabase/README.md`](../supabase/README.md).
- **Paleta y tipografía:** las de `gestion/CONVENCIONES.md` (sidenav gradiente navy, ítem activo con borde `#9dc3ee`).

## Módulos

| Módulo | Estado | Fuente de datos |
|---|---|---|
| **Entrevistas transcritas** | ✅ Activo | Tabla `entrevistas` (listar, buscar, filtrar, crear, editar, eliminar) |
| Estado del informe | 🚧 Próximamente | Tabla `secciones` |
| Comentarios | 🚧 Próximamente | Tabla `comentarios` |
| Matriz de riesgos | 🚧 Próximamente | Tabla `riesgos` |

El shell es una SPA de un solo archivo con enrutado por hash (`#entrevistas`, `#entrevistas/nueva`, `#entrevistas/<id>`). Para añadir un módulo: crear su vista en el objeto `routes` de `index.html` y su ítem en el `<nav>`.

## ⚠️ Seguridad — pendiente antes de datos reales

El panel **aún no tiene autenticación** (decisión de arranque). La tabla `entrevistas` tiene una política de escritura anónima transitoria para que el panel funcione sin login. Por eso:

- **No cargar transcripciones reales sensibles** hasta activar **Supabase Auth** y cerrar la política `entrevistas_escritura_anon`.
- La fila `E-DEMO` es solo semilla de demostración; puede borrarse.

Siguiente paso previsto: login con Supabase Auth y restringir lectura/escritura a usuarios autenticados del equipo.
