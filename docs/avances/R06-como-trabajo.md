# Avance R06 — ComoTrabajo: línea de tiempo + contenido nuevo

## Qué se hizo
- **Contenido (`ComoTrabajo.tsx`):**
  - La etiqueta sigue siendo "Método de trabajo". El título nuevo es "De la primera charla a la entrega".
  - Intro nueva, con "las decisiones las tomo yo" en `<strong>`.
  - El array `steps` tiene los 4 pasos nuevos: `01` Charla inicial, `02` Propuesta clara, `03` Desarrollo con avances, `04` Entrega y autonomía.
- **Estructura:**
  - Los pasos son un `<ol className="como-trabajo-timeline">` con un `<li className="como-trabajo-step">` por paso.
  - Cada paso tiene el número en `.como-trabajo-number` (con `aria-hidden="true"`), un `h3` y un `p`.
- **Estilos (`ComoTrabajo.css`):**
  - `.como-trabajo-step` ya no es una card: no tiene fondo, borde, radio ni padding.
  - `.como-trabajo-number`:
    - Cajita de 44×44 con el contenido centrado.
    - Borde `--accent-line`, radio 8px y fondo `--bg`.
    - Chakra Petch 600, 0.9rem, `letter-spacing: 0.05em`, en `--accent`.
    - `z-index: 1` para quedar por encima de la línea.
  - **Escritorio (más de 900px):**
    - Grilla de 4 columnas con `gap: 2rem`.
    - La línea es un `::before` del `<ol>`: 2px de alto con `var(--gradient)`, centrada a 22px desde arriba.
    - Va del centro de la primera cajita al centro de la última, y las cajitas la tapan en los extremos.
  - **900px o menos:**
    - Los pasos van en columna, separados por `2rem`.
    - Cada paso es una grilla `44px 1fr` con `column-gap: 1.25rem`, y la cajita ocupa las dos filas.
    - La línea vertical de 2px está centrada a 22px desde la izquierda.
  - **Textos:**
    - `.como-trabajo-intro`, `.como-trabajo-intro strong` y `.como-trabajo-step p` quedaron como pedía el brief.
    - El `h3` suma `margin-top: 1.25rem` en escritorio y `0.5rem` en mobile, para alinearse con la cajita.
  - Se sacaron el `font-weight: 800` y el breakpoint de 480px, que ya no hacía falta. El archivo no tiene colores hardcodeados (sin `#` ni `rgba`).
- `npm run build` compila sin errores. Solo aparece el aviso de tamaño de chunk de `react-pdf`, que ya estaba.

## Archivos creados / modificados
- `src/Components/ComoTrabajo/ComoTrabajo.tsx`: modificado.
- `src/Components/ComoTrabajo/ComoTrabajo.css`: modificado.
- `docs/avances/R06-como-trabajo.md`: creado.

## Decisiones tomadas durante la implementación
- **Variables locales:** `--box: 44px` y `--step-gap: 2rem` se definen en `.como-trabajo-timeline`. Las posiciones de la línea se calculan a partir de ellas.
- **Final exacto en escritorio:** `right: calc((100% - 3 * var(--step-gap)) / 4 - var(--box) / 2)`. Es el ancho de una columna menos media cajita, así que la línea termina justo en el centro de la cajita 04.
- **Final en mobile:** el alto del último paso depende del texto, así que no se puede calcular con CSS. La línea llega hasta el fondo del `<ol>` y el `li:last-child::before` la tapa con un rectángulo `--bg` de 44px de ancho debajo de la última cajita. Visualmente termina en la cajita 04.
- **Degradé vertical:** se usa el mismo `var(--gradient)` que en escritorio, en vez de reescribir el `linear-gradient(180deg, ...)` con los hex. En una franja de 2px, el ángulo de 135° se ve prácticamente vertical (cyan arriba, menta abajo). Así se cumple "sin colores hardcodeados".

## Desvíos respecto al brief
- **Degradé vertical:** no se usó `linear-gradient(180deg, ...)` con colores explícitos. Es opcional en el brief y chocaba con el criterio de no tener colores hardcodeados. Ver arriba.
- **Final de la línea en mobile:** como el degradé se estira hasta el fondo de la lista, su último tramo (el teal `#21d0b3`) queda tapado. La parte visible va de cyan a menta. No se nota, pero no es un degradé completo de punta a punta.

## Verificación
Build servido con `vite preview` y medido en Edge headless (`puppeteer-core`).
- **1440px:**
  - Los 4 pasos en fila.
  - Centros de las cajitas en x = 70 / 414 / 758 / 1102. La línea va de x = 70 a x = 1102, a la altura del centro de las cajitas. No se pasa de ninguno de los dos extremos.
  - Sin scroll horizontal.
- **900px:**
  - Columna, con la línea vertical en x = 69–71, centrada bajo las cajitas (centro en x = 70).
  - Debajo de la cajita 04 la línea queda tapada.
- **390px:**
  - Columna, `scrollWidth = 390`.
  - En la captura, la línea une 01 → 04 y no sigue debajo de 04.
- El `strong` de la intro se ve en `rgb(238, 243, 247)` (`--text`).

## Pendientes / problemas encontrados
- Ninguno bloqueante.
- Entre 900 y ~1000px, las 4 columnas quedan angostas y los textos ocupan varias líneas. Se ve bien, pero si hiciera falta se podría subir el breakpoint.

## Cómo probarlo
1. `npm run dev` e ir a "Cómo trabajo".
2. Escritorio: título nuevo, intro con "las decisiones las tomo yo" en blanco y los 4 pasos en fila, unidos por la línea de degradé que va de la cajita 01 a la 04.
3. Achicar a 900px o menos: los pasos pasan a columna con la línea vertical que une las cajitas y termina en la 04.
4. A 390px no tiene que haber scroll horizontal.
5. Comparar con Services, que está arriba: ya no son cards y se diferencian a simple vista.
