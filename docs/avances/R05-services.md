# Avance R05 — Services + ajustes globales de sección

## Qué se hizo
- **Contenido (`Services.tsx`):**
  - Título "De una herramienta puntual a un sistema completo" y subtítulo nuevo. La etiqueta sigue siendo "Lo que ofrezco".
  - El array `services` (tipado con `Service`) tiene las 4 cards nuevas en orden: `01` Herramientas puntuales, `02` Webs y catálogos, `03` Sistemas de turnos, `04` Gestión a medida (`featured: true`). Cada una con `num`, `icon`, `title`, `desc` y `tag`.
  - Sin emojis en títulos ni etiquetas.
  - Cada card renderiza `.service-num`, y la destacada suma la clase `service-card--featured`. El `key` ahora es `s.num` en vez del índice.
- **Íconos (`ServiceIcons.tsx`, nuevo):** `ToolIcon` (llave), `BrowserIcon` (ventana de navegador con dos puntos en la barra, un bloque de imagen y dos líneas de texto), `CalendarCheckIcon` (calendario con tilde) y `DashboardIcon` (panel con gráfico de 3 barras). Todos comparten el mismo objeto `iconProps`: `viewBox 0 0 24 24`, `fill="none"`, `stroke="currentColor"`, `strokeWidth 1.75`, puntas y uniones redondeadas y `aria-hidden`.
- **Estilos (`Services.css`):**
  - `.service-card` con `position: relative`. Fondo, padding y hover a `var(--bg3)` sin cambios.
  - `.service-num` arriba a la derecha (2rem / 2rem), Chakra Petch 600, 0.8rem, `letter-spacing: 0.1em`, `color: var(--muted)`.
  - `.service-icon` de 44×44 con `--accent-soft`, borde `--accent-line`, radio 8px y `color: var(--accent)`. El SVG va a 22px. Se sacó el `font-size: 1.3rem` que era para el emoji.
  - `.service-card p` con peso 400.
  - `.service-tag` en cyan (`--accent2-soft` / `--accent2-line` / `--accent2`), radio 6px, Chakra Petch 600, 0.7rem, `letter-spacing: 0.08em`, uppercase.
  - `.service-card--featured::before`: línea de 2px con `var(--gradient)` arriba de la card.
  - Grilla sin cambios. No quedan `rgba` en el archivo.
- **Ajustes globales (`index.css`):**
  - `.section-label`: `font-family: var(--font-display)`.
  - `.section-subtitle`: peso 400 y `max-width: 560px`.
  - `.btn`: Chakra Petch, peso 600, `letter-spacing: 0.02em`.
- `npm run build` compila sin errores (solo el aviso de tamaño de chunk de `react-pdf`, que ya estaba).

## Archivos creados / modificados
- `src/Components/Services/ServiceIcons.tsx`: creado.
- `src/Components/Services/Services.tsx`: modificado.
- `src/Components/Services/Services.css`: modificado.
- `src/index.css`: modificado.
- `docs/avances/R05-services.md`: creado.

## Decisiones tomadas durante la implementación
- Los props comunes de los SVG quedaron en un objeto `iconProps` compartido. Así los 4 íconos tienen el mismo estilo de línea sí o sí.
- Para que los 4 tengan el mismo peso visual, todos ocupan más o menos el mismo recuadro (de 3 a 21 en la grilla de 24) y usan formas cerradas con radio 2.
- El ícono va como `React.ReactNode` dentro del array, para que el `map` no tenga que hacer un switch por tipo.
- `.service-num` es un `<span>`. El número es decorativo, pero se dejó legible para lectores de pantalla porque refuerza el orden de la escala.

## Desvíos respecto al brief
- Ninguno.

## Verificación
Build servido con `vite preview` y revisado en Edge headless (`puppeteer-core`).
- **1440px:** las 4 cards en una fila, numeradas 01–04, íconos de 22px en menta (`rgb(52, 244, 198)`) y línea de degradé arriba de "Gestión a medida". Sin scroll horizontal.
- **1024px:** grilla de 2×2.
- **390px:** 1 columna, `scrollWidth = 390`.
- **Fuentes calculadas:** `.section-label` en Chakra Petch 600, `.section-subtitle` en IBM Plex Sans 400 y `.btn` en Chakra Petch 600.

### Impacto visual de los ajustes globales
- **Home:** los botones "Ver proyectos →" y "Hablemos" pasan a Chakra Petch 600. Se ven bien y van en línea con el navbar y el `.hero-tag`. La flecha "→" se sigue viendo bien.
- **`.section-label`** pasa a Chakra Petch en About, Cómo trabajo, Projects y Contact, y también en `/admin` (AdminPage, AdminDashboard, AdminProyectoDetalle). Es solo cambio de fuente, con el mismo tamaño y espaciado.
- **`.btn`** también se usa en `/admin` (botón de login y `AdminBotonBoleta`). Pasan a Chakra Petch, igual que en el sitio público. No se tocó nada de `/admin`.
- **`.section-subtitle`** por ahora solo lo usa Services, así que el cambio de peso y ancho no afecta a otras secciones.

## Pendientes / problemas encontrados
- Ninguno bloqueante. Se nota que el subtítulo en peso 400 tiene más presencia que el 300 de antes. Habría que confirmar en los briefs de las otras secciones si ellas también lo adoptan.

## Cómo probarlo
1. `npm run dev` e ir a "Servicios".
2. Revisar el título, el subtítulo y las 4 cards en orden 01 → 04, con íconos SVG en menta y etiquetas cyan sin emojis.
3. Verificar que "Gestión a medida" tenga la línea de degradé arriba.
4. Achicar la ventana: 4 columnas en escritorio ancho, 2×2 cerca de 1024px y 1 columna a 390px, sin scroll horizontal.
5. En el Home, los botones del hero se ven en Chakra Petch. En las otras secciones, las etiquetas de sección también.
