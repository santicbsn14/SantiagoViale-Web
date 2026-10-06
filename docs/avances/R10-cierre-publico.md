# Avance R10 — Cierre de la parte pública (meta, accesibilidad del menú y revisión final)

## Qué se hizo
- **Meta para compartir (`index.html`):** después de la `description` se agregaron, con el comentario `<!-- URL del sitio: si cambia el dominio, actualizar og:url, og:image, twitter:image y canonical -->` arriba:
  - `canonical`.
  - Open Graph: `type`, `locale`, `site_name`, `title`, `description`, `url`, `image` con `width`, `height` y `alt`.
  - Twitter: `twitter:card` (`summary_large_image`) y `twitter:image`.
  - Los valores son los del brief. El resto del `<head>` no se tocó.
- **`public/`:**
  - Se borraron `favicon (1).svg` y `apple-touch-icon (1).png` con `git rm`.
  - Se crearon `robots.txt` (bloquea `/admin` y apunta al sitemap) y `sitemap.xml` (una sola URL, la raíz).
- **Rewrite de Vercel:** con el build servido (`vite preview`), cada archivo se sirve como el archivo real:

  | URL | Status | Tipo | Tamaño |
  |---|---|---|---|
  | `/og-image.png` | 200 | `image/png` | 95 447 B |
  | `/robots.txt` | 200 | `text/plain` | 100 B |
  | `/sitemap.xml` | 200 | `text/xml` | 181 B |

  - En Vercel, `rewrites` se evalúa recién después de buscar el archivo en el filesystem. Por eso el rewrite de `/(.*)` a `/index.html` no tapa los archivos que existen en `dist/`.
  - No hizo falta cambiar `vercel.json`.
- **Menú mobile (`Navbar.tsx`):**
  - **Escape** cierra el drawer cuando está abierto. El listener de `keydown` en `document` solo se registra mientras el menú está abierto.
  - **Foco al abrir:** pasa al primer link del drawer ("Servicios").
  - **Foco al cerrar:** vuelve al hamburguesa cuando se cierra con Escape, con el overlay o con el hamburguesa.
    - Un `ref` (`restoreFocus`) indica cómo se cerró. Si se cerró con un link, no se fuerza el foco y la página navega a la sección.
    - Se agregó un helper `closeMenu(focusHamburger)`, que usan el overlay, el hamburguesa, Escape y `scrollTo`.
  - **Trampa de foco:** con el menú abierto, Tab y Shift+Tab circulan entre el hamburguesa y los links del drawer, en ambos sentidos.
  - No se tocaron la animación, el overlay, el bloqueo de scroll ni el CSS.
- **Revisión de identidad vieja:** se buscaron `#61dafb`, `#f7c948`, `#0e0e0e`, `#161616`, `#1e1e1e`, `#252525`, `rgba(97, 218, 251`, `rgba(247, 201, 72`, `font-weight: 800/900`, `Syne` y `DM Sans` en todo `src/`, sin contar `Admin*`, `src/pages/Admin*` ni `src/pdf/`. **No hubo coincidencias en la parte pública**, así que no hubo nada que reemplazar.
- **Revisión visual:** con el build servido, se revisó la página completa a 1440, 1024 y 390px, con capturas de página completa y una medición de `scrollWidth`. Ver Pendientes.
- **Teclado:** se recorrió toda la página con Tab a 1440 y 390px. Los 29 elementos interactivos (a 1440) y los 26 (a 390) tienen foco visible:
  - logo, links del nav y hamburguesa;
  - CTAs del hero y filtros de proyectos;
  - "Ver proyecto";
  - links de contacto, campos y botón del formulario;
  - links del footer.

  El honeypot no recibe foco.
- **Lighthouse (mobile, build servido con `vite preview` en local):**

  | Categoría | Puntaje |
  |---|---|
  | Performance | **88** |
  | Accessibility | **100** |
  | Best Practices | **100** |
  | SEO | **100** |

  - Métricas: FCP 2,8 s · LCP 3,2 s · TBT 0 ms · CLS 0,001 · Speed Index 2,8 s.
  - Problemas que marca (solo se reportan):
    - **Entrega de imágenes:** se podrían ahorrar ~1,1 MB. Las capturas de proyectos están en JPG/PNG grandes; por ejemplo, `NewConcept` pesa 737 KB. Convendría pasarlas a WebP con un tamaño acorde a la tarjeta.
    - **Requests que bloquean el render:** ~1,6 s estimados, sobre todo por la hoja de Google Fonts.
    - **Imágenes sin `width`/`height` explícitos:** el CLS igual da 0,001.
    - **JavaScript sin usar:** ~26 KB.
  - Ninguno se resuelve con un arreglo de una línea, así que no se corrigió nada.
- **Dependencias:**
  - `npm audit fix` (sin `--force`) bajó de **25 vulnerabilidades (3 moderadas, 22 altas)** a **4 (3 moderadas, 1 alta)**.
  - Solo cambió `package-lock.json`. `npm run build` y `npx tsc -p api/tsconfig.json` compilan sin errores, así que no hizo falta revertir.

## Archivos creados / modificados
- `index.html`: modificado (meta OG, Twitter y canonical).
- `public/robots.txt`: creado.
- `public/sitemap.xml`: creado.
- `public/favicon (1).svg`: borrado.
- `public/apple-touch-icon (1).png`: borrado.
- `src/Components/Navbar/Navbar.tsx`: modificado (Escape, manejo de foco y trampa de foco).
- `package-lock.json`: modificado por `npm audit fix`.
- `docs/avances/R10-cierre-publico.md`: creado.

## Decisiones tomadas durante la implementación
- **La trampa de foco incluye GitHub y LinkedIn del pie del drawer.** El brief habla de "los links del drawer". Si se dejaban afuera, esos dos links quedaban inaccesibles con teclado mientras el menú estaba abierto. El ciclo queda así: Servicios → Proyectos → Sobre mí → Contacto → GitHub → LinkedIn → hamburguesa → Servicios.
- **El ciclo de Tab se maneja siempre a mano** (`preventDefault` y `focus()` del siguiente), en vez de interceptar solo los bordes. Así el foco tampoco se escapa si arranca fuera de la lista (por ejemplo, después de un clic en el fondo del drawer): el próximo Tab lo lleva al primero.
- **El foco al abrir se pone en un `useEffect` sobre `menuOpen`.** Al abrir, el CSS del drawer cambia `visibility` a `visible` sin demora, así que el link ya puede recibir foco en ese momento. No hizo falta `requestAnimationFrame`.

## Desvíos respecto al brief
- **`apple-touch-icon (1).png` no era idéntico byte a byte a `apple-touch-icon.png`:** pesaba 12,6 KB contra 6,9 KB.
  - Se compararon las dos imágenes y son visualmente iguales (mismo isotipo, mismo fondo, 180×180). Solo cambia la compresión del PNG.
  - Se borró igual, como pedía el brief, y queda `apple-touch-icon.png`, que es el que referencia `index.html`.
- `favicon (1).svg` sí era idéntico a `favicon.svg`.

## Pendientes o problemas encontrados
- **Scroll horizontal:** no hay en ningún ancho. `scrollWidth` es igual al ancho del viewport a 1440, 1024 y 390px.
  - Algunos elementos sí se salen del viewport: los glows del hero (`.hero-glow--cyan` y `--mint`), el isotipo de fondo `.hero-mark` (a 1440 y 1024) y el honeypot `.form-trap`, que está a −10000px a propósito.
  - Ninguno genera scroll: el hero los recorta y el honeypot está posicionado fuera de pantalla.
- **Visual a 1024px:** la grilla de Servicios queda en 3 columnas + 1, así que la cuarta tarjeta ("Gestión a medida") queda sola en la segunda fila. No está roto, pero a ese ancho quedaría más prolijo un 2×2. No se tocó porque el brief no permite cambiar diseños.
- **Visual a 1440 y 390px:** no se vieron problemas de layout.
- **Vulnerabilidades que quedan (necesitan `--force`, no se aplicaron):**
  - `vite` (**alta**) y `esbuild` (moderada): esbuild ≤ 0.24.2 permite que cualquier sitio le pida datos al **servidor de desarrollo**. Solo afecta a `npm run dev`, no al build ni a producción. El fix es `vite@8`, un salto de versión mayor.
  - `react-router` y `react-router-dom` (moderadas): open redirect y un problema de SSR hydration. Este sitio no usa SSR. El fix es `react-router-dom@7`, también un salto mayor.
  - Conviene encarar ambas actualizaciones en un brief aparte, probando también el `/admin`.
- **Performance (88):** las mejoras posibles son pasar las capturas de proyectos a WebP redimensionadas, agregar `width`/`height` en las `<img>` y revisar la carga de Google Fonts. Si se encara, que sea en un brief aparte.
- Sigue el aviso de tamaño de chunk de `react-pdf` en el build. Es del admin y ya estaba antes.

## Cómo probarlo
1. `npm run build` y `npx vite preview`.
2. Abrir `/og-image.png`, `/robots.txt` y `/sitemap.xml`: tienen que mostrar el archivo, no la página.
3. Ver el código fuente de la página y confirmar los meta `og:*`, `twitter:*` y `canonical`. Después del deploy, se puede validar con el depurador de Facebook (developers.facebook.com/tools/debug) o pegando el link en WhatsApp.
4. A 390px de ancho, menú mobile:
   1. Tab hasta el hamburguesa y Enter: el foco queda en "Servicios".
   2. Tab varias veces: recorre los links, GitHub, LinkedIn y el hamburguesa, y vuelve a empezar. Shift+Tab hace el mismo recorrido al revés.
   3. Escape: el menú se cierra y el foco vuelve al hamburguesa. Pasa lo mismo cerrando con el overlay o con el hamburguesa.
   4. Abrir el menú y tocar "Proyectos": el menú se cierra y la página baja hasta la sección.
5. Recorrer la página con Tab a ancho desktop: todos los elementos muestran el contorno de foco.
6. Lighthouse en Chrome DevTools, modo Mobile, sobre el build servido.
