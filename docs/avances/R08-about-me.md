# Avance R08 — AboutMe + link de Camila

## Qué se hizo
- **Link de Camila (`Projects.tsx`):** `live: 'PEGAR_URL_CAMILA'` pasa a `live: 'https://camilagonzalezbelleza.com'`. No se tocó nada más del archivo.
- **Contenido (`About-me.tsx`):**
  - El título pasa a "Detrás de Viale Sistemas". La etiqueta sigue siendo "Quién soy".
  - Los 3 párrafos se reemplazaron por los del brief, con las partes en negrita en `<strong>`.
  - Se agregó el mini título `<p className="stack-label">Con qué trabajo</p>` antes de las pastillas. El array `stack` no cambió.
  - `.about-img-frame` lleva `aria-hidden="true"`. La foto sigue con `alt="Santiago Viale"`.
- **Estilos (`AboutMe.css`):**
  - `.about-text p` con `font-weight: 400`.
  - `.stack-label`: Chakra Petch 500, 0.75rem, `letter-spacing: 0.1em`, mayúsculas, `--muted`, `margin: 2rem 0 0.75rem`.
  - `.stack-pill`: Chakra Petch 500. En hover, borde `--accent-line` y texto `--accent`. `.stack-list` pasa a `margin-top: 0` para quedar pegado al mini título (la separación la da el `margin-bottom` de 0.75rem del label).
  - El tamaño de la foto sale de `--img-w` / `--img-h`, definidas en `.about-visual` (280×340). `.about-img` y `.about-img-frame` las usan.
  - `.about-img-frame`: borde de 2px con `var(--gradient)` usando la técnica de máscara del brief, `box-sizing: border-box`, `opacity: 0.7`. Mantiene el radio de 12px y el `translate(12px, 12px)`.
  - Mobile (≤768px): la foto ya no se oculta. Va arriba del texto (`order: -1`), alineada a la izquierda, a 200×240, con el marco en `translate(10px, 10px)`. El gap entre foto y texto es de 2.5rem.
  - **Limpieza:** se borró `.about-img-placeholder` (grises viejos hardcodeados).
- `npm run build` compila sin errores. Solo aparece el aviso de tamaño de chunk de `react-pdf`, que ya estaba.

## Archivos creados / modificados
- `src/Components/About-Me/About-me.tsx`: modificado.
- `src/Components/About-Me/AboutMe.css`: modificado.
- `src/Components/Projects/Projects.tsx`: modificado (solo el link de Camila).
- `docs/avances/R08-about-me.md`: creado.

## Decisiones tomadas durante la implementación
- **Selector del mini título:** se usa `.about-text p.stack-label`, que es más específico que `.about-text p`. Así pisa el `margin`, el `font-size` y el `line-height` (se fijó en 1.4 para que no herede el 1.8 de los párrafos).
- **Espacio en el párrafo 2:** el corte de línea antes de `<strong>` lleva `{' '}` para que no se pegue "tenés" con "un solo interlocutor".

## Desvíos respecto al brief
- Ninguno. Una aclaración: en la máscara del marco aparece `#000` (`linear-gradient(#000 0 0)`). No es un color visible: la máscara solo usa el canal alfa y es el código que da el brief. Fuera de eso, `AboutMe.css` no tiene colores hardcodeados.

## Pendientes o problemas encontrados
- No se probó en navegador; queda revisar a ojo el marco con degradé y el layout mobile (ver abajo). A 390px el contenido más ancho es la foto de 200px más 10px del marco, así que no debería haber scroll horizontal.

## Cómo probarlo
1. `npm run dev` y abrir la sección "Sobre mí" (`#sobre-mi`).
2. Desktop: título "Detrás de Viale Sistemas", 3 párrafos nuevos, "CON QUÉ TRABAJO" arriba de las pastillas. El marco de la foto se ve como un borde con el degradé cyan → menta, sin relleno, desplazado abajo a la derecha.
3. Pasar el mouse por una pastilla: borde menta suave y texto menta.
4. DevTools a 390px: la foto aparece arriba del texto, alineada a la izquierda, más chica, con el marco acompañándola. Sin scroll horizontal.
5. En Projects, "Ver proyecto" de Camila González abre `https://camilagonzalezbelleza.com` en otra pestaña.
6. `npm run build` compila.
