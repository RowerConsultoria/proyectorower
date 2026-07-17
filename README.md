# Proyecto Rower — Informe y aplicativo web

Repositorio central del **Proyecto Rower**: consultoría de Optimización Organizacional y Adopción de IA de **UCAB Consultores** para **Grupo Kenex**. Aquí vive el informe navegable, las presentaciones y los módulos web interactivos del proyecto, de modo que todo el equipo consultor pueda acceder y aportar desde cualquier sitio.

> ⚠️ **Contenido confidencial.** Este repositorio contiene material de trabajo interno del equipo consultor. No compartir fuera del equipo sin autorización de la PM (Clemencia Abad).

## Cómo navegar

- **[`index.html`](index.html)** — Portal de entrada: enlaza el informe y los demás módulos. Ábrelo en el navegador (o publica el repo con GitHub Pages para acceder por URL).
- **[`informe/fase1/informe-diagnostico-fase1.html`](informe/fase1/informe-diagnostico-fase1.html)** — El entregable maestro: Informe Diagnóstico Fase 1, sitio navegable autocontenido (menú lateral, scroll-spy, diagrama de arquitectura embebido).

## Estructura del repositorio

```
proyectorower/
├── index.html                  Portal de navegación del proyecto
├── informe/
│   └── fase1/                  Informe Diagnóstico Fase 1 (entregable maestro)
├── presentaciones/             Presentaciones web del proyecto (Junta, comités…)
├── modulos/                    Módulos web interactivos (matriz de riesgos, mapa de procesos…)
├── insumos/                    Insumos de trabajo de los consultores (xlsx, specs, borradores)
├── supabase/                   Base de datos persistente: esquema SQL, guía y cliente de ejemplo
└── gestion/                    Documentación interna del proyecto
    ├── ESTADO.md               Estado sección por sección y pendientes priorizados
    ├── CONVENCIONES.md         Convenciones obligatorias (nomenclatura, redacción, paleta)
    └── TRASPASO_...md          Documento de traspaso desde el chat de construcción
```

## Trabajar en local (Windows)

### 1. Clonar el repositorio

Abre **Git Bash** o **PowerShell** y ejecuta (ajusta la ruta si quieres otra):

```bash
git clone https://github.com/RowerConsultoria/proyectorower.git "C:/Users/gabri/Escritorio/APPS Github/Rower"
```

> ⚠️ **Sobre OneDrive:** la ruta propuesta está dentro de OneDrive (`...\OneDrive\Escritorio\...`). OneDrive y Git sincronizan por su cuenta y a veces chocan (OneDrive intenta subir archivos internos de `.git`, lo que corrompe el historial). **Recomendación:** clona fuera de OneDrive, p. ej. `C:\Repos\Rower` o `C:\Users\gabri\Rower`. Si prefieres mantenerlo en OneDrive, en los ajustes de OneDrive excluye de la sincronización la carpeta `.git` del proyecto.

### 2. Ver el sitio en local

Doble clic en **`scripts/servidor-local.bat`** → abre `http://localhost:8080` en tu navegador. Este sí funciona porque corre en **tu** equipo (a diferencia del servidor de las sesiones de Claude, que vive en la nube y no es alcanzable desde fuera).

### 3. Mantener local y GitHub al día

- **Manual:** doble clic en `scripts/sincronizar.bat` cuando quieras ponerte al día (baja lo de GitHub y sube lo tuyo).
- **Automático:** ejecuta `scripts/auto-sincronizar.ps1` (sincroniza cada 5 min mientras la ventana esté abierta).
- Ver [`scripts/README.md`](scripts/README.md) para el detalle.

**Cómo fluyen los cambios:** Claude Code (en la nube) hace *push* a GitHub → tú haces *pull* para recibirlos; tú haces *push* de tus cambios a GitHub → Claude hace *pull* en la siguiente sesión. GitHub es el punto de encuentro; no hay conexión directa entre tu equipo y las sesiones de Claude.

## Cómo contribuir (equipo consultor)

1. **Fuente de verdad:** el HTML maestro en `informe/fase1/` es el documento vigente. No circular copias con sufijos de versión (`_v2`, `_final`); el historial de versiones lo lleva git.
2. **Ramas:** trabajar en una rama por área/cambio (ej. `talento/seccion-10`, `tecnologia/hoja-de-ruta`) y abrir Pull Request hacia la rama principal para que quede registro de qué cambió y quién lo aprobó.
3. **Insumos:** los archivos fuente (Excel del mapa de procesos, diagnósticos HTML, specs) van en `insumos/`, con nombre descriptivo y sin datos sensibles (ver `gestion/CONVENCIONES.md`).
4. **Antes de editar el informe:** leer `gestion/CONVENCIONES.md` — hay reglas obligatorias de nomenclatura (Kenex con una sola "n"), de redacción cliente-facing y una lección técnica importante sobre el `srcdoc` del diagrama embebido.
5. **Estado del proyecto:** consultar y mantener actualizado `gestion/ESTADO.md`.

## Fechas críticas

| Hito | Fecha |
|---|---|
| Presentación formal a la Junta Directiva (vía Lark) | **viernes 24-jul-2026, 11:00 am** |

## Contexto del proyecto

Grupo Kenex (Kenex Trading S.A.) es un holding familiar de distribución de electrónica de consumo: **Casio** (marca representada) y **Cubitt** (marca propia). Opera en Venezuela, Panamá, Colombia, Costa Rica, Guatemala y EE.UU. El contrato cubre 4 fases: F1 diagnóstico · F2 documentación de procesos y prototipos IA · F3 reestructuración de talento · F4 evaluación/certificación/cierre.
