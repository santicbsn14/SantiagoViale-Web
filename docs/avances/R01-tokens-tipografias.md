# Avance R01 — Tokens y tipografías

## Qué se hizo
- Se reemplazó la carga de Syne + DM Sans por Chakra Petch (400–700) + IBM Plex Sans (300–700), vía `<link>` + `preconnect` en `index.html`.
- Se eliminó el `@import` de Google Fonts de `src/index.css`.
- Se reemplazó el bloque de variables `:root` de `src/index.css` por la paleta y tipografías de "Viale Sistemas" (fondos navy, menta/cyan/teal, `--on-accent`, degradés, `--surface`, `--accent3`).
- Se relevó (sin corregir) todo lo hardcodeado en `src/` — ver inventario abajo.
- `npm run build` compila OK (solo el warning de chunk grande de `react-pdf`, que ya existía).

## Archivos creados / modificados
- `index.html` — modificado (3 líneas de fuentes en `<head>`; `<title>`, favicon y meta sin tocar).
- `src/index.css` — modificado (se quitó el `@import`; se reemplazó el `:root` de variables).
- `docs/avances/R01-tokens-tipografias.md` — creado.

Ningún archivo de `src/Components/`, `src/Pages/`, `src/pdf/` ni `api/` fue modificado.

## Decisiones tomadas durante la implementación
- `src/index.css` tiene **dos** bloques `:root`. El primero (líneas 1–14) es el que viene por defecto con Vite (`font-family: Inter…`, `color-scheme: light dark`, `color: rgba(255,255,255,.87)`, `background-color: #242424`, smoothing). No tiene variables custom, así que se dejó intacto. En la práctica `body` lo pisa con `var(--bg)`, `var(--text)` y `var(--font-body)`.
- El `:root` de variables no tenía variables extra además de las del brief, así que no hubo que conservar ninguna.
- No se tocaron las clases globales de `index.css` (`.section-title`, `.btn-filled`, `.btn-outline`) aunque tienen hardcodeos. Quedan en el inventario porque el brief limita el cambio al `:root`.

## Desvíos respecto al brief
- Ninguno.
- Dato importante: el `@import` viejo estaba en la línea 24, **después** de otras reglas. Según la spec de CSS, el navegador ignora un `@import` que no está al principio del archivo, así que **Syne y DM Sans probablemente nunca se cargaban** y el sitio se veía con la fuente de respaldo `sans-serif`. Con el `<link>` en `index.html` esto queda resuelto.

## Inventario de hardcodeos (por componente)

Referencia de colores viejos: `rgba(97, 218, 251, …)` = celeste `#61dafb` (el `--accent` viejo). `rgba(247, 201, 72, …)` = amarillo `#f7c948` (el `--accent2` viejo). `rgba(14, 14, 14, …)` = `#0e0e0e` (el `--bg` viejo).

**Ojo con el cambio de significado:** `--accent` pasó de celeste a **menta** y `--accent2` pasó de amarillo a **cyan**. Todos los `rgba` de abajo que acompañan a `var(--accent)` / `var(--accent2)` ahora quedan con un tinte que no combina con el color del texto/borde que tienen al lado.

### Global — `src/index.css` (fuera de `:root`, no se tocó)
| Línea | Selector | Hardcodeo | Tipo |
|---|---|---|---|
| 2 | `:root` (default Vite) | `font-family: Inter, …` | Fuente |
| 7 | `:root` (default Vite) | `color: rgba(255,255,255,0.87)` | Color (pisado por `body`) |
| 8 | `:root` (default Vite) | `background-color: #242424` | Color (pisado por `body`) |
| 84 | `.section-title` | `font-weight: 800` | Peso > 700 |
| 111 | `.btn-filled` | `color: #0e0e0e` sobre `var(--accent)` | Texto sobre acento → `var(--on-accent)` |
| 112 | `.btn-filled:hover` | `background: #fff` | Color |
| 113 | `.btn-outline` | `border: … rgba(255,255,255,0.2)` | Color |

### About-Me — `AboutMe.css`
| Línea | Selector | Hardcodeo |
|---|---|---|
| 59 | `.about-img-placeholder` | `linear-gradient(135deg, #1e1e1e 0%, #252525 100%)` (grises viejos) |

### AdminEstadoBadge — `AdminEstadoBadge.css`
| Línea | Selector | Hardcodeo |
|---|---|---|
| 15 | `.admin-badge--activo` | `background: rgba(97, 218, 251, 0.1)` (celeste) |
| 17 | `.admin-badge--activo` | `border-color: rgba(97, 218, 251, 0.25)` (celeste) |
| 21 | `.admin-badge--pausado` | `background: rgba(247, 201, 72, 0.12)` (amarillo) |
| 23 | `.admin-badge--pausado` | `border-color: rgba(247, 201, 72, 0.25)` (amarillo) |
| 27 | `.admin-badge--terminado` | `background: rgba(255, 255, 255, 0.04)` |

> Hay que decidir el color de "pausado": antes era amarillo (`--accent2`), y ahora `--accent2` es cyan, que se confunde con "activo".

### AdminProyectoRow — `AdminProyectoRow.css`
| Línea | Selector | Hardcodeo |
|---|---|---|
| 17 | `.admin-proyecto-row:hover` | `border-color: rgba(97, 218, 251, 0.25)` (celeste) |

### AdminTotalCard — `AdminTotalCard.css`
| Línea | Selector | Hardcodeo |
|---|---|---|
| 22 | `.admin-total-card__value` | `font-weight: 800` |

### ComoTrabajo — `ComoTrabajo.css`
| Línea | Selector | Hardcodeo |
|---|---|---|
| 35 | `.como-trabajo-number` | `font-weight: 800` |

### Contact — `Contact.css`
| Línea | Selector | Hardcodeo |
|---|---|---|
| 71 | `.form-submit` | `color: #0e0e0e` sobre `var(--accent)` → `var(--on-accent)` |
| 82 | `.form-submit:hover` | `background: #fff` |
| 85 | `.form-error` | `color: #ff6b6b` (rojo de error; no hay variable de error/peligro) |

### Home — `home.css`
| Línea | Selector | Hardcodeo |
|---|---|---|
| 29 | `.hero-glow` | `radial-gradient(… rgba(97, 218, 251, 0.06) …)` (celeste) |
| 43 | `.hero-tag` | `background: rgba(97, 218, 251, 0.08)` (celeste) |
| 44 | `.hero-tag` | `border: 1px solid rgba(97, 218, 251, 0.2)` (celeste) |
| 67 | `.hero h1` | `font-weight: 800` |
| 101 | `.stat-num` | `font-weight: 800` |

(`black` en línea 19 es una `mask-image`, no un color visible. Está bien.)

### Navbar — `Navbar.css`
| Línea | Selector | Hardcodeo |
|---|---|---|
| 9 | `.navbar` | `background: rgba(14, 14, 14, 0.85)` (= `#0e0e0e` viejo) |
| 16 | `.navbar` (scrolled) | `box-shadow: … rgba(0,0,0,0.4)` (sombra, aceptable) |
| 21 | `.nav-logo` | `font-weight: 800` |
| 83 | `.nav-overlay` | `background: rgba(0,0,0,0.6)` (overlay, aceptable) |
| 103 | `.nav-drawer` | `background: #111` |

### Projects — `Projects.css`
| Línea | Selector | Hardcodeo |
|---|---|---|
| 35 | `.filter-tab:hover` | `background: rgba(97, 218, 251, 0.06)` (celeste) |
| 53 | `.project-card:hover` | `border-color: rgba(97, 218, 251, 0.25)` (celeste) |
| 54 | `.project-card:hover` | `box-shadow: … rgba(0, 0, 0, 0.4)` (sombra, aceptable) |
| 68 | `.project-img-placeholder` | `linear-gradient(135deg, var(--bg3) 0%, #252525 100%)` |
| 81 | `.project-logo-wrap` | `radial-gradient(… rgba(97, 218, 251, 0.12) …)` (celeste) |
| 104 | `.badge-dev` | `background: rgba(247, 201, 72, 0.14)` (amarillo) |
| 106 | `.badge-dev` | `border: 1px solid rgba(247, 201, 72, 0.35)` (amarillo) |
| 128 | `.type-catalog` | `rgba(247,201,72,0.12)` / `rgba(247,201,72,0.25)` (amarillo) con `color: var(--accent2)` (ahora cyan) |
| 129 | `.type-system` | `rgba(97,218,251,0.10)` / `rgba(97,218,251,0.25)` (celeste) con `color: var(--accent)` (ahora menta) |
| 130 | `.type-web` | `#b4b4ff`, `rgba(180,180,255,0.10)`, `rgba(180,180,255,0.25)` (lila, fuera de paleta) |
| 158 | `.link-live` | `color: #0e0e0e` sobre `var(--accent)` → `var(--on-accent)` |
| 159 | `.link-live:hover` | `background: #fff` |
| 173–198 | `.btn-primary` / `.btn-secondary` | `#61dafb`, `#fff`, `#21a1f1`, `#242424`: **código comentado (muerto)**, se puede borrar |

### Services — `Services.css`
| Línea | Selector | Hardcodeo |
|---|---|---|
| 27 | `.service-icon` | `background: rgba(97, 218, 251, 0.1)` (celeste) |
| 53 | `.service-tag` | `background: rgba(247, 201, 72, 0.1)` (amarillo) |
| 54 | `.service-tag` | `border: 1px solid rgba(247, 201, 72, 0.25)` (amarillo) |

### Sin hallazgos
- Footer, AdminBotonBoleta, AdminDashboard, AdminProyectoDetalle, `src/Pages/AdminPage.css`, `src/App.css`: no tienen colores hardcodeados y usan las variables de fuente.
- Ningún `.tsx` tiene colores ni fuentes inline (el único `style={{}}` es `animationDelay` en `Navbar.tsx:69`).
- Ningún archivo nombra `Syne` ni `DM Sans` a mano: todos usan `var(--font-display)` / `var(--font-body)`.
- `src/pdf/` quedó afuera del relevamiento, como pide el brief.

### Texto sobre fondos de acento
No hay texto **blanco** sobre `var(--accent)` / `var(--accent2)`. Los 3 casos que hay usan `#0e0e0e` (casi negro), que se lee bien sobre menta pero no es el color de marca. Deberían pasar a `var(--on-accent)`:
- `src/index.css:111` `.btn-filled`
- `Contact.css:71` `.form-submit`
- `Projects.css:158` `.link-live`

Además, los tres usan `background: #fff` en `:hover`. Conviene revisarlo con la paleta nueva (por ejemplo `var(--accent3)`).

## Pendientes / problemas encontrados
- 6 usos de `font-weight: 800` (1 global + 5 en componentes). Chakra Petch no tiene 800, así que el navegador muestra 700 (o lo engrosa artificialmente donde no hay `font-synthesis: none`). Hay que bajarlos a 700 en los briefs de cada sección.
- Conviene crear variables para los tintes de acento (por ejemplo `--accent-soft: rgba(52,244,198,.1)`, `--accent-line: rgba(52,244,198,.25)` y lo mismo para cyan) y así reemplazar todos los `rgba` celestes y amarillos de una vez.
- Falta decidir: el color del estado "pausado" en admin, el lila de `.type-web` y si se agrega una variable `--danger` para `.form-error`.
- El bloque `:root` de Vite (líneas 1–14 de `index.css`) y `#root { max-width:1280px; padding:2rem; text-align:center }` en `App.css` son restos de la plantilla de Vite. Hay que evaluar si se borran.
- Código comentado muerto en `Projects.css:173–198`.

## Cómo probarlo
1. `npm run dev` y abrir el sitio.
2. DevTools → Network → filtrar "Font": tienen que aparecer pedidos a `fonts.gstatic.com` de Chakra Petch e IBM Plex Sans, y ninguno de Syne ni DM Sans.
3. DevTools → Elements → `:root` → revisar las variables nuevas (`--bg: #0c141c`, `--accent: #34f4c6`, etc.).
4. El fondo tiene que verse navy oscuro (no negro) y los acentos en menta/cyan. Los tintes celestes y amarillos que quedan son los hardcodeos del inventario.
5. `npm run build` → compila sin errores.
