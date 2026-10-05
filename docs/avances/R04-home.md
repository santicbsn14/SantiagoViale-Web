# Avance R04 — Home (hero) + remanentes del Navbar

## Qué se hizo
- **Contenido del hero (`Home.tsx`):**
  - `HERO_STATS` definido fuera del componente; `.hero-stats` se renderiza con un `map` (clases `stat-num` / `stat-label` sin cambios). El tercer stat pasó de "Full / Stack propio" a "1 a 1 / Trato directo".
  - `h1` solo con el claim: `Tu solución web,<br /><span className="hero-title-accent">de punta a punta.</span>`. Se sacó `hero-name` ("Santiago Viale") y `hero-role`.
  - `hero-desc` con el texto nuevo; "Santiago Viale" y "Trato directo con quien lo hace" en `<strong>`.
  - Etiqueta "Disponible para nuevos proyectos" y botones sin cambios.
- **Fondo y decoración:**
  - `.hero-grid`: mismas medidas y máscara, líneas en `color-mix(in srgb, var(--accent2) 8%, transparent)`.
  - El `.hero-glow` viejo se reemplazó por `.hero-glow--cyan` (arriba a la derecha, 55vw / máx. 700px, cyan al 14%) y `.hero-glow--mint` (abajo a la izquierda, 50vw / máx. 600px, menta al 10%). Ambos con `aria-hidden="true"`, `position: absolute`, `pointer-events: none` y `z-index: 0`.
  - Isotipo de marca de agua: `<img className="hero-mark">` con `isotipo-mono.svg`, `alt=""`, `aria-hidden="true"`, `opacity: 0.06`. Oculto por debajo de 900px.
  - `.hero-content` sigue con `position: relative; z-index: 1`.
- **Estilos de texto (`home.css`):** `.hero-tag`, `.hero h1`, `.hero-title-accent`, `.hero-desc`, `.stat-num` y `.stat-label` según el brief. Se borraron `.hero-name`, `.hero-role` y el `.hero-glow` viejo. Se agregó `@media (prefers-reduced-motion: reduce)` que apaga la animación `blink`.
- **Navbar:**
  - `.nav-drawer` cerrado con `visibility: hidden` y transición de `visibility` retrasada 0.35s; `.nav-drawer--open` con `visibility: visible` inmediato. La animación de apertura y cierre es la misma.
  - Hamburguesa con `aria-expanded={menuOpen}`, `aria-controls="nav-drawer"` y `aria-label` "Abrir menú" / "Cerrar menú". El drawer tiene `id="nav-drawer"`.
- **`index.css`:** variable `--nav-h: 4.5rem` en `:root` (bloque nuevo "Layout"), regla `section[id] { scroll-margin-top: var(--nav-h); }` y un solo `scroll-behavior: smooth`.
- `npm run build` compila sin errores (solo el aviso de tamaño de chunk de `react-pdf`, que ya existía).

## Archivos creados / modificados
- `src/Components/Home/Home.tsx`: modificado.
- `src/Components/Home/home.css`: modificado.
- `src/Components/Navbar/Navbar.tsx`: modificado.
- `src/Components/Navbar/Navbar.css`: modificado.
- `src/index.css`: modificado.
- `docs/avances/R04-home.md`: creado.

## Decisiones tomadas durante la implementación
- Las propiedades comunes de los brillos (`position`, `z-index`, `aspect-ratio`, `pointer-events`) quedaron en la clase base `.hero-glow`, y cada modificador (`--cyan` / `--mint`) solo define posición, tamaño y degradado.
- También se le puso `aria-hidden="true"` a `.hero-grid`, que es decorativa igual que los brillos.
- `.hero-tag` mantiene `color: var(--accent)`, el padding y el `text-transform: uppercase` que ya tenía; solo se cambió lo que pedía el brief.
- `.stat-label` mantiene `color: var(--muted)` y `margin-top: 0.3rem`.
- `--nav-h: 4.5rem` (72px) cubre el navbar en su estado más alto (sin scroll, ~70px en escritorio). Con scroll el navbar mide 60px, así que queda un margen de 12px sobre la sección.

## Desvíos respecto al brief
- **`scroll-behavior` duplicado:** el brief decía que estaba en `:root` y en `html`, pero en realidad había dos reglas `html` (una al principio del archivo, con comentario, y otra después del `:root`). Se borró la primera y quedó `html { scroll-behavior: smooth; }` después de las variables.

## Verificación
Build servido con `vite preview` y revisado en Edge headless (`puppeteer-core`).
- **Escritorio (1440×900):** claim con degradé y sin corte en la "p"; stats `7+`, `2`, `1 a 1`; isotipo visible (`display: block`, `opacity: 0.06`); sin scroll horizontal.
- **Navegación a secciones:** desde el Navbar, `servicios`, `proyectos`, `sobre-mi` y `contacto` quedan con `top = 72px` y el navbar mide 60px: el inicio de la sección ya no queda tapado (en R03 era `top = 0`).
- **Mobile (390px, `isMobile`):** `scrollWidth = 390` (sin scroll horizontal), isotipo con `display: none`, el hero se lee bien.
- **Teclado con el menú cerrado:** Tab recorre logo → "Abrir menú" → "Ver proyectos" → "Hablemos"; no entra al drawer.
- **Teclado con el menú abierto:** desde el hamburguesa, Tab va a Servicios → Proyectos → Sobre mí → Contacto.
- **`aria-expanded`:** `false` / "Abrir menú" cerrado, `true` / "Cerrar menú" abierto, y vuelve a `false` al cerrar.
- **Animación de cierre:** 100ms después de cerrar el drawer sigue `visible` (se ve la salida); a los 600ms pasa a `hidden`.

## Pendientes / problemas encontrados
- **Isotipo de marca de agua bastante presente.** Con `opacity: 0.06` se nota más de lo que sugiere el número, porque `isotipo-mono.svg` tiene óvalos blancos. Si se quiere más sutil, bajar a ~0.04.
- **Foco no se mueve al abrir el drawer.** Al abrir el menú el foco queda en el hamburguesa (Tab entra a los links desde ahí) y no hay cierre con Escape ni trampa de foco. No se tocó porque el brief pide no cambiar el comportamiento del menú; queda para un brief de accesibilidad.
- Sigue pendiente de R03: el hash no queda en la URL al navegar, y los íconos provisorios.

## Cómo probarlo
1. `npm run dev` y abrir el sitio en escritorio.
2. Hero: etiqueta con borde menta y esquinas de 6px, claim "Tu solución web, / de punta a punta." con la segunda línea en degradé cyan→menta, descripción nueva y stats `7+` / `2` / `1 a 1`.
3. Fondo: grilla cyan tenue, brillo cyan arriba a la derecha, brillo menta abajo a la izquierda e isotipo grande a la derecha.
4. Achicar la ventana por debajo de 900px: el isotipo desaparece. A 390px no hay scroll horizontal.
5. Click en cada link del Navbar: el título de la sección queda visible debajo del navbar.
6. A 390px, con el menú cerrado, Tab no entra a los links del drawer. Abrirlo con el hamburguesa: Tab recorre los links. En DevTools, `aria-expanded` del botón cambia entre `false` y `true`.
7. Con "reducir movimiento" activado en el sistema, el punto de la etiqueta no titila.
8. `npm run build` → compila sin errores.
