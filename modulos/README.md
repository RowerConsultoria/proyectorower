# Módulos interactivos

Piezas web navegables que complementan el informe. Candidatos identificados:

| Módulo | Origen en el informe | Estado |
|---|---|---|
| Matriz visual de riesgos (severidad × área) | Sección 9 | Por construir — es LA lámina que la Junta va a mirar |
| Mapa de procesos explorable (22/104/260, colapsable y con buscador) | Sección 6.5 | Por construir |
| Hoja de ruta de automatización por olas | Sección 13 (insumos en 7.9, 11.4, 11.5, 12.5) | Por construir |
| Diagrama de arquitectura de IA | Sección 12 (hoy embebido como modal) | Existe como HTML standalone — traer aquí como módulo propio |

## Convención

- Una carpeta por módulo: `modulos/<nombre>/` con un `index.html` autocontenido (sin dependencias externas: CSS/JS inline).
- Usar la paleta institucional de [`gestion/CONVENCIONES.md`](../gestion/CONVENCIONES.md).
- Enlazar cada módulo nuevo desde el portal (`index.html` en la raíz) y, si aplica, desde la sección correspondiente del informe.
