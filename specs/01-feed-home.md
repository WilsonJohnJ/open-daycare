# SPEC 01 — Feed del personal como home

> **Status:** Approved
> **Depends on:** —
> **Date:** 2026-09-29
> **Objective:** Reemplazar el boilerplate de create-next-app por el feed del personal en `/`, replicando `references/pantallas/feed.dc.html` con Tailwind v4, datos mock tipados y likes persistidos en `localStorage`.

## Scope

**In:**

- Sidebar de escritorio fijo (248px, pegajoso, `100vh`): logo OpenDayCare / Sala Soles, botón "Nueva publicación", nav (Feed, Niños, Avisos, Mi cuenta), pie con usuario "Caro Giménez · Maestra · Soles" y botón cerrar sesión.
- Cabecera del feed: kicker "GUARDERÍA · SALA SOLES", título "Buenas, Caro", línea "12 niños · martes 17 jun".
- Barra de compositor "Compartí un momento…" como link inerte.
- Separador "PUBLICADO HOY".
- 3 tarjetas que cubren los 3 tipos del mockup: `achievement` (LOGRO), `activity` (ACTIVIDAD, con placeholder de foto) y `announcement` (ANUNCIO).
- Barra de acciones por tarjeta: like (interactivo), comentarios (link inerte) y "Editar" (link inerte).
- Drawer móvil: bajo `md` el sidebar se oculta y aparece una barra superior con hamburguesa que lo abre superpuesto con overlay.
- Colores, tipografías, radios, sombras y espaciados exactos del mockup.
- Metadata (`title`, `description`), `lang="es"`, fondo `#F6ECDF`, sin Geist ni dark mode.
- Links a rutas inexistentes con `href="#"`.

**Out of scope (for future specs):**

- Las otras 15 pantallas de `references/pantallas/`.
- Autenticación y sesión real. "Cerrar sesión" y el usuario del pie son fijos.
- Base de datos, API, server actions.
- Modo oscuro.
- Formularios de creación y edición de publicaciones.
- Detalle de publicación, foto ampliada, resumen del día.
- Paginación, scroll infinito, filtros o búsqueda.
- Persistencia de cualquier dato que no sea el like.
- Tests automatizados: el repo no tiene runner.

## Data model

`lib/types.ts`:

```ts
export type PostType = "achievement" | "activity" | "announcement";

export interface PostAuthor {
  name: string;                       // "Mateo" | "Anuncio general"
  initials: string | null;            // "M" — null cuando el avatar es el ícono de megáfono
  kind: "child" | "system";
}

export interface PostPhoto {
  label: string;                      // "Foto · pintando con témperas"
}

export interface Post {
  id: string;                         // "post-achievement-mateo"
  type: PostType;
  author: PostAuthor;
  time: string;                       // "14:20"
  audience: string;                   // "Para: familia de Mateo" | "Para: toda la sala"
  body: string;
  likes: number;                      // contador base del mockup
  comments: number;
  photo?: PostPhoto;                  // presente sólo en `activity`
}
```

Convenciones:

- Los valores de `PostType` son claves de `postTypeTheme` y van en inglés.
- Todo texto visible al usuario va en español y vive en `lib/mock/feed.ts` como dato: etiquetas de badge, `author.name`, `audience`, `body`. Nunca como constante dentro del código.

`lib/mock/feed.ts` exporta `feedPosts: Post[]` (los 3 posts, en el orden del mockup), más `currentUser = { name: "Caro Giménez", role: "Maestra", classroom: "Soles", initials: "C" }` y `classroomMeta = { roomCount: 12, dateLabel: "martes 17 jun" }`.

Paleta y etiqueta por tipo de publicación, sacada del mockup (`postTypeTheme`). La clave del mapa es el valor de `PostType` (inglés) y `label` es lo que se pinta en el badge (español):

| clave | `label` | fondo del badge | punto + texto | avatar |
| ----- | ------- | --------------- | ------------- | ------ |
| `achievement` | "LOGRO" | `#CFEBD8` | `#3E9B6C` | `#A9D9E8` / `#1F7A93` |
| `activity` | "ACTIVIDAD" | `#C7E7F1` | `#2E89A6` | `#A9D9E8` / `#1F7A93` |
| `announcement` | "ANUNCIO" | `#CCD8F4` | `#4E72C8` | megáfono, `#CCD8F4` / `#4E72C8` |

Tokens de `globals.css` (`@theme`, nombres semánticos, no hex sueltos):

```css
--color-canvas: #F6ECDF;      --color-surface: #FFFDF9;
--color-line: #ECE0D0;        --color-hairline: #F0E6D8;
--color-rule: #E7DAC8;        --color-scrollbar: #E4D6C4;
--color-ink: #3F362E;         --color-body: #4A4038;
--color-nav: #6E6359;         --color-muted: #94887B;
--color-subtle: #A89A8B;      --color-accent: #D9583C;
--color-like: #E0654A;        --color-edit: #C5503A;
--color-coral: #F2937A;       --color-nav-active-bg: #FBE3D8;
--color-photo-bg: #F4ECE1;    --color-photo-border: #DBCDBA;
--color-photo-text: #B0A290;
--color-btn-from: #F4977E;    --color-btn-to: #EE8164;
--color-logo-from: #F8C3A8;   --color-logo-to: #F2937A;
--font-display: var(--font-fredoka);   --font-sans: var(--font-nunito);
```

Sombras: botón `0 8px 18px -8px rgb(238 129 100 / 0.75)`, tarjeta `0 4px 16px -12px rgb(120 90 60 / 0.5)`, compositor `0 4px 14px -10px rgb(120 90 60 / 0.4)`.

## Implementation plan

1. **`app/globals.css`** — borrar `:root --background/--foreground`, el bloque `@media (prefers-color-scheme: dark)` y la regla `body` de Arial. Setear `body { background: var(--color-canvas); color: var(--color-ink); font-family: var(--font-sans); }`, la barra de scroll `#E4D6C4` de 10px, y los tokens del bloque de arriba. Verificar: `npm run dev`, el fondo del home pasa de blanco a crema.
2. **`app/layout.tsx`** — sacar `Geist` y `Geist_Mono`; declarar `Fredoka` y `Nunito` con `next/font/google`, `subsets: ["latin"]`, exponiendo `--font-fredoka` y `--font-nunito` vía `variable`. Poner `lang="es"`, clases de las variables en `<html>`, y `metadata` con `title: "OpenDayCare · Sala Soles"`. Verificar: DevTools → Network sin requests a `fonts.googleapis.com`.
3. **`lib/types.ts` y `lib/mock/feed.ts`** — los tipos y los 3 posts del mockup, con sus textos literales. El `type` de cada post es `achievement`, `activity` y `announcement`; el texto visible del badge no se guarda en el post, sale de `postTypeTheme`. Verificar: `npm run build` compila.
4. **`components/icons.tsx`** — los ~10 SVG del mockup como componentes con `currentColor` y `strokeWidth` por prop: `Sun`, `Plus`, `Home`, `Users`, `Bell`, `User`, `LogOut`, `Camera`, `Heart`, `MessageCircle`, `Megaphone`, `Menu`, `Close`.
5. **`components/sidebar.tsx` + `components/app-shell.tsx` + `app/page.tsx`** — `Sidebar` presentacional (recibe `open` y `onClose`). `AppShell` es `"use client"`, chrome fijo, scroll propio en `main`, y monta la barra superior móvil con hamburguesa. `app/page.tsx` sigue siendo server component y renderiza `<AppShell>` con el feed vacío. Verificar: el sidebar se ve exacto en ≥768px.
6. **`components/feed-header.tsx` y `components/composer-bar.tsx`** — la cabecera de saludo y la barra del compositor, montadas en `page.tsx`. Verificar: coinciden con el mockup.
7. **`components/post-card.tsx`** — tarjeta tipada por `post.type`, con avatar de inicial o megáfono, badge resuelto con `postTypeTheme[post.type].label` (texto en español, clave en inglés), `audience`, cuerpo, placeholder de foto opcional y barra de acciones con el corazón todavía como elemento no interactivo. Montar los 3 posts. Verificar: las 3 tarjetas coinciden con el mockup.
8. **`components/feed-view.tsx`** (`"use client"`) — estado elevado de likes: `useState<Record<string, boolean>>`, inicializado desde el mockup y luego reconciliado con `localStorage` en `useEffect` (nunca durante el render, para no romper la hidratación). El contador mostrado es `post.likes + (liked ? 1 : 0)`. Se guarda en `opendaycare:likes:v1` con `try/catch`. `PostCard` recibe `liked` y `onToggleLike`; el corazón pasa a `<button>`. Verificar: click sube y baja el contador y sobrevive al reload.
9. **Drawer móvil** — en `AppShell`: `hidden md:flex` en el aside de escritorio, barra superior `md:hidden` con `Menu`, drawer superpuesto con overlay que cierra al hacer click. Verificar: a 375px el sidebar no está y la hamburguesa lo abre y lo cierra.
10. **Verificación** — `npm run lint` (sólo los errores preexistentes de `references/pantallas/support.js`) y `npm run build`. Después Playwright: captura de `/` a 1440×900 contra `references/screenshots/feed.png` y contra el `.dc.html` servido localmente, guardadas en `.playwright-mcp/`.

## Acceptance criteria

- [ ] `npm run build` termina sin errores de TypeScript.
- [ ] `npm run lint` no reporta errores nuevos; siguen sólo los preexistentes de `references/pantallas/support.js`.
- [ ] El fondo del body es `#F6ECDF` y no hay reglas de `prefers-color-scheme` en `globals.css`.
- [ ] El título de la pestaña es "OpenDayCare · Sala Soles".
- [ ] `<html lang="es">` y no queda ninguna variable de Geist.
- [ ] DevTools → Computed muestra `Nunito` en el cuerpo de texto y `Fredoka` en el logo, el saludo y los nombres.
- [ ] En runtime no hay ningún request a `fonts.googleapis.com` ni a `fonts.gstatic.com`; ambas fuentes se sirven desde `/_next/static/media/`.
- [ ] En viewports ≥768px el sidebar mide 248px de ancho, es pegajoso y ocupa el 100% del alto de la pantalla.
- [ ] El item "Feed" del nav tiene fondo `#FBE3D8` y texto `#D9583C`; los otros tres son transparentes con texto `#6E6359`.
- [ ] El botón "Nueva publicación" muestra el gradiente vertical `#F4977E` → `#EE8164`.
- [ ] El logo muestra el gradiente `#F8C3A8` → `#F2937A` con el ícono de sol.
- [ ] Se renderizan exactamente 3 tarjetas, en este orden: logro de Mateo (14:20), actividad de Mateo (09:40, con foto), anuncio general (07:50).
- [ ] El aviso se renderiza con avatar de megáfono; los otros dos con avatar de inicial "M".
- [ ] "Para: toda la sala" aparece sólo en el anuncio; los otros dos muestran "Para: familia de Mateo".
- [ ] El placeholder de foto tiene borde punteado de 1.5px, fondo `#F4ECE1` y 200px de alto.
- [ ] La columna de contenido tiene 760px de ancho máximo y está centrada.
- [ ] El body no scrollea: el scroll ocurre dentro de `main`.
- [ ] "Nueva publicación", "Niños", "Avisos", "Mi cuenta", comentarios y "Editar" tienen `href="#"` y no navegan.
- [ ] En viewports <768px el sidebar no está visible y sí hay una barra superior con botón hamburguesa.
- [ ] La hamburguesa abre el sidebar como drawer superpuesto y el overlay lo cierra.
- [ ] El primer clic en el corazón de la tarjeta del logro lleva el contador de 3 a 4 y rellena el ícono.
- [ ] El segundo clic lo devuelve a 3 y lo des-rellena.
- [ ] Los comentarios siguen mostrando su contador estático (3 / 2 / 0 → 1 / 2 / 0) y no son interactivos.
- [ ] Tras recargar, la tarjeta del logro sigue con el corazón activo y el contador en 4.
- [ ] `localStorage["opendaycare:likes:v1"]` contiene sólo ids marcados (`{"post-achievement-mateo":true}`), sin contadores.
- [ ] La consola del browser está sin errores ni warnings de hidratación.

## Decisions

- **Sí:** Tailwind v4 utilities con tokens en `@theme`. Ya está instalado, convierte 1:1 el `style` inline del mockup y las 16 pantallas reusan el mismo vocabulario.
- **No:** CSS Modules. Convive mal con el setup CSS-first existente y agrega una capa de abstracción sin ganho.
- **No:** copiar el `style="..."` inline del mockup. A 16 pantallas el JSX queda ilegible.
- **Sí:** nombres semánticos (`--color-surface`, `--color-ink`) en vez de hex sueltos en el JSX. La paleta es compartida por toda la app.
- **Sí:** `AppShell` con el sidebar, montado explícitamente por `page.tsx` y **no** por `app/layout.tsx`. Las pantallas de familia (`login`, `activar-cuenta`, `vincular-padre`) no llevan sidebar; envolverlas en el layout raíz obligaría a ocultarlo.
- **Sí:** `href="#"` en los links sin destino, en vez de quitar el `href`. Conserva la semántica de link y el aspecto exacto sin crear rutas falsas.
- **Sí:** `next/font/google` con Fredoka y Nunito. Se auto-alojan en build: sin requests externos y sin layout shift.
- **No:** `<link>` a Google Fonts como en el mockup. Request externo y fuente de fallos.
- **Sí:** variable font sin declarar `weight` para ambas. Las dos exponen el eje `wght` y el mockup usa 3 pesos de Fredoka y 5 de Nunito.
- **No:** mantener Geist. No aparece en ningún mockup.
- **Sí:** SVGs copiados del mockup a `components/icons.tsx`. Pixel-idénticos y sin dependencia nueva. `lucide-react` se reevalúa cuando una pantalla necesite iconos que difieran del mockup.
- **Sí:** `app/page.tsx` sigue siendo **server component** y sólo renderiza `<FeedView>` (client). El estado no se agrega al Server Component; cuando llegue el backend, la línea de datos no se rompe.
- **Sí:** estado de likes elevado en `FeedView`, no en cada `PostCard`. Una sola fuente de verdad y un solo punto de escritura en `localStorage`.
- **Sí:** en `localStorage` se guardan **sólo los ids marcados** (`{ "post-1": true }`) y el contador se deriva. Si mañana cambia el likes base del mockup no hay nada que migrar. Se descartó guardar `{ liked, count }` completo.
- **Sí:** la lectura de `localStorage` ocurre en `useEffect`, nunca en el render inicial. Leer durante el render rompe la hidratación de React.
- **Sí:** drawer móvil con overlay. Reutiliza el mismo `Sidebar` sin duplicarlo.
- **No:** barra horizontal de iconos en móvil. La referencia no la define, sería diseño nuevo.
- **Sí:** escritorio primero, móvil al final del plan. La fidelidad visual sólo se puede verificar donde existe referencia.
- **Sí:** sin modo oscuro. Ningún mockup lo define; se saca el bloque `prefers-color-scheme` del boilerplate.
- **Sí:** títulos de sección en inglés (los del template), contenido en español, estado `Draft` en inglés. El repo es en español, pero el estado y los títulos son los que `/spec-impl` reconoce.
- **Sí:** identificadores, tipos, funciones y valores de enum en inglés (`PostType = "achievement" | "activity" | "announcement"`), y todo texto visible al usuario en español. Es la regla de código limpio del `AGENTS.md`, y separa el nombre interno del dato de su traducción en pantalla. La frontera: los identificadores y las claves viajan en inglés; el contenido (`author.name`, `audience`, `body`, `label` del badge) se define en español en `lib/mock/feed.ts`.

## Risks

| Riesgo | Mitigación |
| ------ | ---------- |
| Los degradados del logo y del botón no tienen equivalente exacto en Tailwind | Usar `bg-linear-to-b from-*-to-*` (existe en 4.3.3); si falla, valor arbitrario `bg-[linear-gradient(180deg,#F4977E,#EE8164)]` |
| Sidebar 248px + `max-width:760px` desbordan en viewports de 768–1023px | `overflow-hidden` en el contenedor flex raíz y verificación explícita a 768px |
| `localStorage` lanza en modo privado de Safari | Envolver lectura y escritura en `try/catch`; la app sigue funcionando en memoria |
| Hydration mismatch por leer `localStorage` durante el render | La lectura va en `useEffect`; el primer render usa los likes del mockup |
| El placeholder de foto con `height:200px` fijo se desborda si el label crece | `truncate` en el label |
| Regresión en `next dev`: el bloque `nextjs-agent-rules` de `AGENTS.md` se re-agrega al hacer commit | Se commitea junto al trabajo |

## What is **not** in this spec

- Autenticación, sesión real y "Cerrar sesión".
- Base de datos, API, server actions.
- Las otras 15 pantallas, aunque el sidebar ya enlace a `Niños`, `Avisos` y `Mi cuenta`.
- Modo oscuro.
- Formularios de creación y edición de publicaciones.
- Detalle de publicación, foto ampliada, resumen del día.
- Paginación, filtros, búsqueda.
- Persistencia de posts, niños o perfil: sólo los likes.
- Tests automatizados.

Cada uno de esos, si aterriza, va en su propio spec.
