# Avance R07 — Projects: estilos, contenido y limpieza

## Qué se hizo
- **Imágenes:** se importan `CamilaGonzalez-Project.jpg` (`camilaGonzalez`) y `blackstation-logo.svg` (`blackStationLogo`) en `Projects.tsx`. Se sacó el import de `cami-logo.png`.
- **Datos (`Projects.tsx`):**
  - La interfaz `Project` ya no tiene `emoji` ni `code`.
  - El array `projects` tiene los 9 proyectos en el orden del brief, con títulos cortos (sin el "— Tipo de web") y los `typeLabel` / `type` nuevos.
  - Clasificación: Catálogos = Pañalera Nano, La Juana, Black Station. Sistemas = Camila González, Kinefit, Nicolás Sanetti Coiffeur. Webs = Club Belgrano, New Concepts, Brío Valores.
  - Camila pasa a terminada, con captura y `live: 'PEGAR_URL_CAMILA'`. Black Station y Brío quedan con `enDesarrollo: true`.
  - Descripciones nuevas de Camila y Black Station. En La Juana se corrigió "online!." por "online.". El resto no cambió.
- **Render:**
  - Se sacó el botón "Código". Las cards terminadas muestran solo "Ver proyecto" (`target="_blank" rel="noopener noreferrer"`).
  - `alt` = "Logo de …" en las cards en desarrollo y "Captura de …" en las terminadas.
  - `key={p.title}` en vez del índice.
  - Los filtros tienen `aria-pressed`.
- **Estilos (`Projects.css`):**
  - `.filter-tab`: Chakra Petch 500, radio 6px. Activo/hover con `--accent`, `--accent-soft`.
  - `.project-card:hover`: borde `--accent-line`. La sombra y el `translateY(-6px)` siguen igual.
  - `.project-type`: Chakra Petch 600, radio 6px. Sistemas en menta (`--accent*`), catálogos en cyan (`--accent2*`) y webs en neutro (`--text` al 6% + `--border-strong`).
  - `.badge-dev`: mismo estilo que `.hero-tag` (menta, Chakra Petch 500, 0.68rem, `letter-spacing: 0.1em`, radio 6px) con el `●` que titila. Sigue arriba a la derecha.
  - `.project-logo-wrap`: el radial celeste pasa a `color-mix(in srgb, var(--accent2) 12%, transparent)`.
  - `.link-live`: botón con borde `--accent-line` y texto menta (Chakra Petch 600). En hover se rellena con `--accent` y el texto pasa a `--on-accent`.
  - `.project-desc` con `font-weight: 400`. `.project-soon` ya no está en itálica.
  - **Limpieza:** se borraron `.link-code`, `.project-img-placeholder`, el bloque comentado `.btn-primary` / `.btn-secondary` y el comentario de `.project-img`. Los dos `@media (max-width: 768px)` quedaron en uno solo. Los `touch-action` / `cursor` sueltos que estaban fuera de su regla se movieron a `.project-card` y `.project-link`.
- **Imágenes borradas** (no se usan en ningún lado de `src/`):
  - `src/Components/Imagenes/cami-logo.png` (solo lo usaba Projects, ya reemplazado por la captura).
  - `src/Components/Imagenes/Catalogo-Project.jpg` (sin referencias).
  - `src/Components/Imagenes/Catalogo-Proyect.jpg` (sin referencias).
  - `Santiago-Viale.jpg` **no** se borró: lo usa `About-me.tsx`.
- `npm run build` compila sin errores. Solo aparece el aviso de tamaño de chunk de `react-pdf`, que ya estaba.

## Archivos creados / modificados
- `src/Components/Projects/Projects.tsx`: modificado.
- `src/Components/Projects/Projects.css`: modificado.
- `src/Components/Imagenes/cami-logo.png`, `Catalogo-Project.jpg`, `Catalogo-Proyect.jpg`: borrados.
- `docs/avances/R07-projects.md`: creado.

## Decisiones tomadas durante la implementación
- **Animación del badge:** se usa un `@keyframes badge-dev-blink` propio, igual al `blink` de `home.css`. Así Projects no depende de que el CSS del Home esté cargado ni de un nombre de keyframes de otra sección.
- **Punto del badge:** el `●` va a `0.45rem` (en el hero es `0.5rem`), porque el badge tiene una letra más chica (0.68rem contra 0.75rem). Se agregó `display: inline-flex` con `gap: 0.4rem` para alinearlo con el texto, como en el hero.
- **Sombra del hover:** queda `rgba(0, 0, 0, 0.4)`, porque el brief pide no tocarla y no es un color de la paleta vieja (en R01 figuraba como "aceptable"). Es el único `rgba` del archivo.

## Desvíos respecto al brief
- Ninguno.

## Verificación
Build servido con `vite preview` y medido en Edge headless (`puppeteer-core`).
- **390px y 1440px:**
  - Se ven los 9 proyectos en el orden pedido. `scrollWidth` = ancho del viewport (sin scroll horizontal).
  - Las 9 imágenes cargan (`naturalWidth > 0`), incluido el SVG de Black Station.
  - 0 elementos `.link-code`.
  - Colores de los badges de tipo: sistemas `rgb(52, 244, 198)` (menta), catálogos `rgb(29, 205, 255)` (cyan), webs `rgb(238, 243, 247)` (`--text`).
  - Brío y Black Station con badge "En desarrollo". El resto con "Ver proyecto".
- **Filtros:** Catálogos → Pañalera Nano, La Juana, Black Station. Sistemas → Camila González, Kinefit, Nicolás Sanetti Coiffeur. Webs → Club Belgrano, New Concepts, Brío Valores. El botón activo tiene `aria-pressed="true"`.

## Pendientes / problemas encontrados
- **Falta la URL de Camila:** el link quedó como `'PEGAR_URL_CAMILA'` (tal cual el brief). Hasta que se reemplace, "Ver proyecto" de Camila abre una URL rota. Está en `Projects.tsx`, en el objeto de Camila González.
## Cómo probarlo
1. `npm run dev` e ir a "Proyectos".
2. Ver los 9 proyectos en orden, con los títulos cortos y sin botón "Código".
3. Camila González se ve con la captura y "Ver proyecto". Brío y Black Station muestran su logo sobre el fondo cyan suave, con el badge "En desarrollo" menta y el punto que titila.
4. Probar los filtros: cada uno muestra 3 proyectos (ver la lista de arriba), y el activo queda resaltado en menta.
5. Badges de tipo: sistemas en menta, catálogos en cyan, webs en gris/blanco.
6. Hover sobre "Ver proyecto": se rellena de menta con el texto oscuro.
7. A 390px no tiene que haber scroll horizontal.
8. Con "reducir movimiento" activado en el sistema, el punto del badge no titila.
