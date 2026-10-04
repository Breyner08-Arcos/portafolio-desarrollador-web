# Portafolio · Shopify & Frontend

Primera versión personalizable, en español, con HTML semántico, CSS basado en Flexbox, Alpine.js y animaciones GSAP. Se conservan las carpetas originales: `assets/css`, `fonts`, `images` y `js`.

## Empezar

Requiere Node.js 22.12+ (o una versión LTS posterior compatible) y npm.

```bash
npm ci
npm run dev
```

Abre la dirección que muestra Vite. No abras `index.html` con doble clic ni uses Live Server: los imports de paquetes necesitan Vite. Las dependencias ya se instalaron durante la creación; `npm ci` permite reproducirlas en otro equipo.

```bash
npm run build    # Genera dist/ para producción
npm run preview  # Sirve la compilación local; requiere build previo
```

No se ejecutaron pruebas ni compilación en esta primera entrega, según el alcance solicitado. Antes de publicar, realiza la compilación y la revisión manual indicada al final.

## Mapa de edición

| Quiero cambiar…                                         | Archivo                                   |
| ------------------------------------------------------- | ----------------------------------------- |
| Nombre, textos, enlaces, orden de secciones y metadatos | `index.html`                              |
| Fuentes, ancho general, espacios y estilos base         | `assets/css/base.css`                     |
| Paletas clara y oscura                                  | `assets/css/themes.css`                   |
| Apariencia del selector de tema                         | `assets/css/theme-toggle.css`             |
| Preferencia de tema y botón                             | `js/components/theme.js`                  |
| Animación del selector                                  | `js/animations/theme.js`                  |
| Restaurar el tema antes del primer render               | `public/theme-init.js`                    |
| Botones, etiquetas y elementos compartidos              | `assets/css/components.css`               |
| Una sección concreta                                    | `assets/css/sections/<seccion>.css`       |
| Orden de carga del CSS                                  | `assets/css/main.css`                     |
| Menú móvil y comportamiento Alpine                      | `js/components/navigation.js`             |
| Filtros de proyectos                                    | `js/sections/projects.js`                 |
| Movimiento inicial                                      | `js/animations/hero.js`                   |
| Movimiento al entrar en pantalla                        | `js/animations/reveal.js`                 |
| Preferencias de movimiento y coordinación GSAP          | `js/animations/index.js`                  |
| Cuándo cargar lógica de una sección                     | `js/utils/lazy-section.js` y `js/main.js` |
| Favicon                                                 | `images/favicon.svg`                      |
| Fuentes locales y licencias                             | `fonts/`                                  |
| Compilación                                             | `vite.config.js`                          |
| Despliegue futuro y cabeceras de seguridad              | `vercel.json`                             |

## Botones y detalles de proyectos

- `assets/css/components.css`: botones principales y enlaces; `sections/header.css`: botón de contacto; `sections/projects.css`: filtros y tarjetas desplegables. Los colores siguen las variables de ambos temas.
- `js/animations/buttons.js`: respuesta al hover, foco y pulsación usando transformaciones GSAP. Se inicia desde `animations/index.js` y usa `overwrite: "auto"` para evitar acumular movimientos. El botón de tema conserva su animación independiente.
- `js/animations/project-details.js`: apertura y cierre de `.project-details`, cargados al acercarse a los proyectos. Edita `duration` (0.36 al abrir, 0.26 al cerrar) y `ease` para ajustar la sensación.
- Conserva la estructura `<details class="project-details"><summary>Texto <span aria-hidden="true">+</span></summary><div>Contenido</div></details>`. El `div` directo contiene todo el panel; no le asignes altura fija. Puedes abrir varias tarjetas a la vez.
- Se anima la altura únicamente del desplegable para desplazar el contenido inferior, sin escalar ni deformar el texto. Las medidas se toman al pulsar, no en cada frame. Al terminar se elimina la altura inline para permitir contenido responsive.
- Los clics rápidos invierten el destino desde la altura actual. Un cambio de ancho finaliza la transición y recupera la altura natural. Durante el cierre, el contenido deja de recibir foco; el `summary` conserva su operación nativa con teclado.
- Con movimiento reducido se desactiva la animación y se conserva el estado abierto/cerrado. Si GSAP no carga, los `details/summary` siguen funcionando de forma nativa. No se añadieron plugins ni dependencias.

## Modo claro / oscuro

El modo inicial es **oscuro**, inspirado en la referencia: negro y cian. El modo claro usa blanco frío y azul, sin fondos crema. El botón de la cabecera cambia ambos modos y guarda la elección en `localStorage` con la clave `portfolio-theme`; también sincroniza otras pestañas. No sigue automáticamente el tema del sistema, porque el diseño inicial elegido es oscuro.

La implementación se divide así:

1. `public/theme-init.js` restaura la preferencia antes de cargar los estilos, evitando el destello del tema incorrecto. Es un script externo pequeño y síncrono, compatible con la CSP actual. Vite lo copia sin transformarlo; no lo conviertas en un módulo diferido.
2. `assets/css/themes.css` define los colores mediante variables. `:root` contiene la paleta oscura y `:root[data-theme="light"]` la clara. Para cambiar un color, edita su variable en ambas paletas. Las ilustraciones usan estas variables y gradientes cian decorativos en sus CSS de sección.
3. `js/components/theme.js` actualiza `data-theme`, el estado accesible del selector y el color del navegador. Si el almacenamiento está bloqueado, el cambio funciona durante la visita. Si JavaScript no está disponible, permanece el tema oscuro y no aparece un botón inerte.
4. `js/animations/theme.js` carga GSAP bajo demanda para animar el icono y el texto del selector. Los colores de la página usan una transición CSS breve. El cambio de tema funciona incluso si GSAP no carga. La preferencia de movimiento reducido cancela las animaciones, incluso al cambiarla durante la visita.

Para modificar el aspecto del botón edita `assets/css/theme-toggle.css`. El control usa `role="switch"`, nombre estable «Modo oscuro» y `aria-checked`; se activa con teclado. En pantallas estrechas muestra solo el icono, conservando su nombre accesible.

Si cambias `--color-bg`, actualiza también los colores iniciales de `theme-color` en `index.html` y `public/theme-init.js`. Al usar el selector, JS obtiene el nuevo color directamente desde CSS. Para volver al estado inicial, elimina `portfolio-theme` del almacenamiento local y recarga.

## Personalizar tu perfil

1. Busca `PERSONALIZAR`, los textos entre corchetes, `Tu Nombre` y `tu.nombre` en `index.html`. Sustituye también el título, la descripción y los metadatos Open Graph.
2. Ajusta presentación, perfil, ubicación, servicios y recorrido a tu experiencia real. No se incluyeron métricas, clientes ni testimonios inventados.
3. Sustituye los tres proyectos conceptuales por trabajos propios. Sus ilustraciones son composiciones CSS, sin imágenes remotas. Quita la etiqueta «Ejemplo conceptual» únicamente al añadir un trabajo real.
4. Configura el contacto. El correo y los perfiles se muestran como texto hasta que tengas datos reales; no hay formulario ni envío simulado.
5. Cambia el símbolo del favicon si quieres tu propia marca. Mantén el `viewBox` cuadrado.

Para activar el correo, sustituye el párrafo `.contact-email` por:

```html
<a class="contact-email" href="mailto:hola@tudominio.com">
  hola@tudominio.com
</a>
```

En `.social-placeholders`, sustituye cada `span` por un enlace real. Si usas otra pestaña, añade `rel="noopener noreferrer"`:

```html
<a
  href="https://github.com/TU_USUARIO"
  target="_blank"
  rel="noopener noreferrer"
>
  GitHub ↗
</a>
```

Puedes añadir un CV en la carpeta `public/` y enlazarlo como `/cv.pdf`. Vite copia los archivos de `public/` sin transformarlos. No publiques datos personales que no quieras compartir.

## Añadir un proyecto

Duplica un `article.project-card` en `index.html`. Cambia su título, descripción, etiquetas y contenido del `details`. Asigna un `id` único al título y actualiza `aria-labelledby` del artículo. Usa `data-category="shopify"`, `data-category="frontend"` o ambos separados por un espacio. El contador de «Todos» se calcula automáticamente.

Para una categoría nueva, añade un botón con `data-filter="nueva-categoria"` y `aria-pressed="false"` dentro de `.project-filters`; usa ese mismo valor en el artículo.

Reemplaza la ilustración por una captura propia en `images/`. Elimina `aria-hidden="true"` del contenedor si la captura aporta información y usa un texto alternativo concreto:

```html
<div class="project-visual">
  <img
    src="/images/mi-tienda.webp"
    alt="Página de producto con selector de variantes y guía de tallas"
    width="1200"
    height="800"
    loading="lazy"
    decoding="async"
  />
</div>
```

Ajusta `object-fit` y el tamaño en `projects.css` según prefieras recortar o mostrar la captura completa. Usa AVIF/WebP, dimensiones explícitas y capturas optimizadas. Las imágenes principales visibles al abrir la página no deben tener `loading="lazy"`.

## Lógica de la estructura

- El contenido está en HTML para estar disponible sin JavaScript y ser fácil de editar. El menú conserva enlaces visibles si Alpine no carga; los filtros aparecen cuando su módulo está preparado; los detalles usan `details/summary` nativos.
- `main.js` solo coordina la página. La navegación se carga al inicio; el módulo de proyectos usa `import()` cuando la sección se acerca a la pantalla. GSAP se descarga cuando el navegador tiene tiempo disponible, salvo que el visitante prefiera movimiento reducido; el selector también puede solicitarlo bajo demanda.
- Las animaciones de entrada y botones usan transformaciones, sin ocultar contenido. Los desplegables animan su altura para acomodar el flujo de la página. Si cambia la preferencia de movimiento, se cancelan y se restauran los estilos. No se usa ScrollTrigger para mantener sencilla esta primera versión.
- Los archivos CSS están separados por responsabilidad. Vite resuelve los `@import` y agrupa/minifica los estilos de la página: separar el código fuente no significa hacer una petición por archivo. Los módulos dinámicos de JavaScript sí generan fragmentos descargables por separado.
- Los layouts usan principalmente `display: flex`, `gap` y `flex-wrap`. La posición absoluta se limita a las ilustraciones y elementos decorativos.
- Alpine usa la distribución `@alpinejs/csp`, compatible con una política sin `unsafe-eval`. La lógica de los componentes vive en JS; los atributos HTML enlazan métodos y estado.
- Este es un sitio estático: **Liquid se muestra como especialidad y ejemplo de código, pero no se ejecuta aquí**. Las plantillas reales de Shopify necesitan el entorno de un tema de Shopify.

Para añadir una sección: crea su `section` con `id` y `aria-labelledby`, añade un CSS en `assets/css/sections/` e impórtalo en `main.css`. Añade un módulo en `js/sections/` solamente si necesita interacción. Regístralo desde `main.js` con `whenNearViewport`; no conviertas ese archivo en un contenedor de toda la lógica. Usa `data-reveal` para aplicar la animación de entrada existente.

## Fuentes

Space Grotesk en títulos e Inter en texto, descargadas de Google Fonts en formato WOFF2 variable, subconjunto latino (incluye caracteres habituales del español). Se sirven desde `fonts/`, con `font-display: swap`; el sitio no consulta Google Fonts durante la visita. Solo se precarga la fuente de títulos.

Conserva `inter-OFL.txt` y `space-grotesk-OFL.txt` al redistribuirlas. Para cambiar una familia, coloca su WOFF2 y licencia en `fonts/`, actualiza `@font-face` y las variables en `base.css`, y cambia el preload de `index.html`. Si necesitas otros alfabetos, añade sus subconjuntos. Las serifas decorativas de las ilustraciones usan Georgia del sistema.

## Seguridad y futuro despliegue

`vercel.json` queda preparado, pero **no se ha desplegado el sitio**. Para publicarlo más adelante, importa el repositorio en Vercel, usa el preset Vite, el comando `npm run build` y la salida `dist`. No hacen falta variables de entorno para esta versión.

La configuración establece CSP con scripts, fuentes y conexiones del mismo origen, bloqueo de objetos y de inclusión en iframes, `nosniff`, política de referencia y bloqueo de permisos de cámara, micrófono y ubicación. Solo se permiten estilos en atributos para las transformaciones de GSAP; no se permiten scripts inline ni `unsafe-eval`. Estas cabeceras se aplican en Vercel, no automáticamente en `npm run dev` o `npm run preview`. Otro hosting debe configurarlas de manera equivalente.

El sitio no contiene backend, formularios, claves, cookies ni analítica. Solo guarda la preferencia de tema en `localStorage`. La configuración reduce riesgos del navegador, pero no protege por sí sola la cuenta de hosting o el repositorio: activa autenticación multifactor y controla quién puede desplegar. El HTML, el CSS y el JS publicados son públicos; nunca incluyas secretos, tokens privados de Shopify ni credenciales, tampoco en variables `VITE_*` porque terminan en el navegador.

Si añades servicios externos, revisa y permite únicamente sus orígenes necesarios en CSP. Si añades formularios, necesitarás un backend o servicio de recepción, validación del lado servidor, límites de solicitudes, protección antispam y ajustar `form-action`/`connect-src`. No uses `innerHTML` o `x-html` con contenido no confiable. Mantén el archivo de bloqueo y revisa las dependencias antes de actualizarlas.

## Antes de publicar

- Sustituir todos los placeholders y proyectos de ejemplo, activar contacto y revisar permisos para compartir trabajos de clientes.
- Añadir dominio real, URL canónica, `og:url` e imagen social con URL absoluta. Crear `public/robots.txt` y `public/sitemap.xml` con el dominio definitivo. Quitar `noindex, nofollow` cuando quieras indexación.
- Si lo necesitas, añadir favicon PNG de respaldo y `apple-touch-icon`; el SVG cubre navegadores modernos. Un manifiesto solo es necesario si buscas una experiencia instalable.
- Ejecutar `npm run build`, revisar con `npm run preview` y comprobar móvil, teclado, menú, filtros, enlaces y preferencia de movimiento reducido. Revisar rendimiento, contraste y fuentes con el contenido definitivo.
- Comprobar las cabeceras y los recursos en el despliegue de vista previa de Vercel. El servidor local no reproduce sus cabeceras.
- Incorporar privacidad/consentimiento cuando las funciones y los datos que recopiles lo requieran. Esta versión no instala rastreadores.

## Referencias

- [Alpine: distribución CSP](https://alpinejs.dev/advanced/csp)
- [GSAP: preferencias de movimiento con matchMedia](<https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/>)
- [GSAP: instalación](https://gsap.com/docs/v3/Installation/)
- [Vercel: configuración con vercel.json](https://vercel.com/docs/project-configuration/vercel-json)
- [Google Fonts: Inter](https://fonts.google.com/specimen/Inter) y [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
