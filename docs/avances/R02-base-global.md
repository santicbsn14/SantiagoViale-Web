# Avance R02 — Base global

## Qué se hizo
- Se creó la rama `rediseno` (no existía) a partir de `main`, llevando los cambios sin commitear de R01.
- Se agregaron al `:root` de variables de `src/index.css`: tintes de acento (`--accent-soft`, `--accent-line`, `--accent2-soft`, `--accent2-line`), `--border-strong` y estados (`--danger`, `--warning`, `--warning-soft`, `--warning-line`). Las variables de R01 quedaron sin cambios.
- Clases globales:
  - `.section-title`: `font-weight` 800 → 700.
  - `.btn-filled`: `color` → `var(--on-accent)`.
  - `.btn-filled:hover`: `background` → `var(--accent3)` (el texto hereda `var(--on-accent)`).
  - `.btn-outline`: borde → `var(--border-strong)`.
- Se borró el bloque `:root` por defecto de Vite. Al `:root` de variables se pasaron solo `color-scheme: dark`, `-webkit-font-smoothing`, `-moz-osx-font-smoothing` y `text-rendering`.
- Se borró `src/App.css`: no se importaba en ningún lado.
- `npm run build` compila sin errores. Solo aparece el warning de chunk grande de `react-pdf`, que ya existía.

## Archivos creados / modificados
- `src/index.css`: modificado.
- `src/App.css`: eliminado (`git rm`).
- `docs/avances/R02-base-global.md`: creado.

No se tocó nada de `src/Components/`, `src/Pages/`, `src/pdf/` ni `api/`.

## Decisiones tomadas durante la implementación
- **`App.css` no se importaba.** Ni `main.tsx`, ni `App.tsx`, ni ningún otro archivo lo importa, y el CSS compilado (`dist/assets/index-*.css`) no tenía ninguna regla `#root`. Por eso se borró el archivo completo. No había import que quitar.
- El bloque `:root` de Vite tenía otras propiedades que no se trasladaron, porque el brief pedía pasar solo las cuatro de arriba:
  - `line-height: 1.5` y `font-weight: 400`: sin efecto, porque `body` define `line-height: 1.6` y 400 es el valor por defecto.
  - `font-synthesis: none`: ver "Pendientes".
- Se dejaron como estaban las reglas `html { scroll-behavior }` y `body { margin; min-width: 320px; min-height: 100vh }` que siguen al bloque borrado. Son útiles y el brief no las mencionaba. La regla `html { scroll-behavior: smooth }` aparece dos veces en el archivo, pero la repetición no genera ningún problema.

## Cambios visuales por la limpieza de `#root`
**Ninguno.** Como `App.css` nunca se importaba, las reglas de `#root` (`max-width: 1280px`, `padding: 2rem`, `text-align: center`) nunca se aplicaron en el sitio. Borrar el archivo no cambia el ancho, la alineación ni el padding de ninguna sección.

Lo que sí puede cambiar al borrar el `:root` de Vite:
- **`color-scheme: light dark` → `dark`.** Si el sistema operativo está en modo claro, los controles nativos del navegador (inputs, textarea y select del formulario de Contacto y del admin, autocompletado, selector de fecha, barra de scroll en Firefox) ahora se ven en su versión oscura. Si el sistema está en modo oscuro, no cambia nada.
- `color` y `background-color` del `:root` viejo no tenían efecto visible, porque `body` los pisa con `var(--text)` y `var(--bg)`.

Revisión: se sirvió el build (`vite preview`) y se sacaron capturas del hero con Edge headless a 1440 px y 390 px. Las fuentes nuevas cargan, `.btn-filled` se ve menta con texto navy y `.btn-outline` se ve con el borde nuevo.

## Desvíos respecto al brief
- El brief daba por hecho que existía la rama `rediseno`. No existía, así que se creó. **No se hizo commit**: los cambios de R01 y R02 quedan sin commitear en `rediseno`.

## Pendientes / problemas encontrados
- **Itálica de IBM Plex Sans.** `Projects.css:112` usa `font-style: italic`, pero la URL de Google Fonts de R01 solo trae los pesos rectos de IBM Plex Sans. Al sacar `font-synthesis: none`, el navegador vuelve a inclinar el texto de forma artificial. Antes de R02 se veía recto. Si se quiere la itálica real, hay que agregar `ital` a la URL, por ejemplo `IBM+Plex+Sans:ital,wght@0,300..700;1,400`.
- La captura de celular sale cortada a la derecha, incluso el menú hamburguesa. Lo más probable es que sea un problema de Edge headless con anchos menores a ~500 px, no del layout, pero conviene revisarlo con el modo dispositivo de DevTools en el brief del Home/Navbar.
- `src/assets/brand/` aparece como carpeta sin seguimiento en git. No es de este brief; queda para el brief de logos.
- Los hardcodeos de componentes del inventario de R01 siguen sin tocar, como estaba previsto. Ahora ya existen variables para todos:
  - Celeste → `--accent-soft` / `--accent-line` o `--accent2-*`.
  - Amarillo → `--warning-*`.
  - `#ff6b6b` → `--danger`.

## Cómo probarlo
1. `git switch rediseno` y `npm run dev`.
2. DevTools → Elements → `:root`: tienen que estar las variables nuevas y `color-scheme: dark`. No debe quedar el bloque con `font-family: Inter`.
3. Hero: el botón "Ver proyectos" se ve menta con texto navy y en hover pasa a teal. "Hablemos" tiene un borde gris azulado un poco más marcado que antes.
4. Los títulos de sección (`.section-title`) se ven en Chakra Petch 700.
5. Comprobar que `src/App.css` no existe y que `npm run build` compila.
