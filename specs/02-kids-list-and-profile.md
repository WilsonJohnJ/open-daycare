# SPEC 02 — Diseño de las pantallas Niños y perfil del niño

> **Status:** Approved
> **Depends on:** SPEC 01
> **Date:** 2026-10-09
> **Objective:** Implementar el diseño de `/kids` (lista) y `/kids/[id]` (perfil) replicando `references/pantallas/ninos.dc.html` y `perfil-nino.dc.html` con componentes, datos mock y filtrado client-side, sin lógica de negocio.

## Scope

**In:**

- Ruta `/kids`: cabecera "GESTIÓN / Niños" + botón "Agregar niño" (inerte), barra "Buscar niño…" que filtra por nombre, rótulo "SALA SOLES · N niños" con contador dinámico, estado "Sin resultados", grilla de 2 columnas con las 8 tarjetas del mockup (avatar con color propio, nombre, "edad · N padres vinculados", badge MANÍ/LACTOSA o VINCULAR, chevron), hover con borde `#F2A78E` y `translateY(-2px)`.
- Ruta `/kids/[id]`: link "Volver a Niños" → `/kids`, cabecera con avatar de 84px + nombre + "N años · Sala Soles" + botón "Editar" (inerte), panel condicional "Alergias y notas", ficha con Fecha de nacimiento / Sala / Ingreso, columna derecha con botón "Resumen del día" (inerte) y panel "PADRES VINCULADOS" (avatar, nombre, "Mamá · activa", badge ACTIVA/PENDIENTE) + link "Vincular otro padre" (inerte).
- Sidebar parametrizado: prop `activeItem`; "Feed" navega a `/` y "Niños" a `/kids` desde cualquier pantalla; activo correcto en las 3 rutas.
- Datos mock: `lib/mock/children.ts` con los 8 niños completos (lista + detalle + padres). Mateo idéntico al mockup; datos inventados con reglas fijas para los otros 7.
- Iconos nuevos en `components/icons.tsx`: `Search`, `ChevronRight`, `ArrowLeft`, `AlertTriangle`.
- Responsive: bajo `md` la grilla pasa a 1 columna, las dos columnas del perfil se apilan, y se reusa el drawer con hamburguesa de SPEC 01.
- 404 con `notFound()` ante id inexistente.

**Out of scope (for future specs):**

- Pantallas `agregar-nino`, `vincular-padre`, `resumen-dia`, `avisos`, `mi-cuenta`.
- Backend, API, server actions, base de datos.
- Persistencia de cualquier dato (el filtro no se guarda).
- Alta/edición real de niños y vinculación real de padres.
- Fotos de perfil reales (el avatar es siempre la inicial con color).
- Modo oscuro. Tests automatizados: el repo no tiene runner.

## Data model

`lib/types.ts` (adiciones):

```ts
export type ParentStatus = "active" | "pending";

export interface ChildParent {
  id: string;               // "parent-lucia-fernandez"
  name: string;             // "Lucía Fernández"
  initials: string;         // "L"
  avatarBackground: string; // "#C9B6E8" — el texto siempre es blanco
  roleLabel: string;        // "Mamá" | "Papá"
  status: ParentStatus;
  statusLabel: string;      // "activa" | "invitación enviada" — texto tras "·"
}

export interface Child {
  id: string;               // "mateo-fernandez" — segmento de /kids/[id]
  name: string;             // "Mateo Fernández"
  initials: string;         // "M"
  avatarBackground: string; // "#A9D9E8"
  avatarText: string;       // "#1F7A93"
  ageLabel: string;         // "3 años"
  room: string;             // "Soles"
  allergyLabel: string | null; // "MANÍ" | "LACTOSA" | null — badge de la tarjeta
  notes: string | null;     // panel "Alergias y notas"; null = el panel no se renderiza
  birthLabel: string;       // "12 mar 2022"
  joinedLabel: string;      // "feb 2025"
  parents: ChildParent[];
}
```

Los 8 hijos, tal como aparecen en `ninos.dc.html` (orden de la grilla = orden del array):

| id | nombre | ini | avatar bg / text | edad | `parents.length` | badge tarjeta |
| --- | --- | --- | --- | --- | --- | --- |
| `mateo-fernandez` | Mateo Fernández | M | `#A9D9E8` / `#1F7A93` | 3 años | 2 | MANÍ |
| `sofia-mendez` | Sofía Méndez | S | `#F4B8CC` / `#C44A7A` | 2 años | 1 | — |
| `benjamin-ruiz` | Benjamín Ruiz | B | `#B9DEC4` / `#3E8B62` | 3 años | 2 | — |
| `valentina-soto` | Valentina Soto | V | `#F4DC8E` / `#9A7B1E` | 2 años | 0 | VINCULAR |
| `tomas-diaz` | Tomás Díaz | T | `#C9B6E8` / `#7B5FC0` | 3 años | 1 | LACTOSA |
| `emma-castro` | Emma Castro | E | `#F4B8CC` / `#C44A7A` | 2 años | 1 | — |
| `lucas-romero` | Lucas Romero | L | `#A9D9E8` / `#1F7A93` | 3 años | 1 | — |
| `olivia-vega` | Olivia Vega | O | `#B9DEC4` / `#3E8B62` | 2 años | 1 | — |

Detalle de Mateo, literal del mockup: nacimiento "12 mar 2022", ingreso "feb 2025", notes "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.", padres Lucía Fernández (L, `#C9B6E8`, Mamá, `active`, "activa") y Diego Fernández (D, `#A9C7E8`, Papá, `pending`, "invitación enviada").

Reglas para los 7 inventados (todo en `lib/mock/children.ts`):

- `birthLabel` coherente con `ageLabel` (2 años → nacimiento en 2023/2024; 3 años → 2021/2022).
- `joinedLabel` anterior a "oct 2026".
- `notes`: sólo Mateo (literal) y Tomás (texto inventado sobre lactosa). Los otros 6 → `null`.
- Padres inventados: todos `active`, `statusLabel` "activa"/"activo" según `roleLabel`, nombres y apellidos en español; la cantidad debe respetar la columna `parents.length` de la tabla.

Texto del contador de padres, derivado (no se guarda): `0` → "sin padres vinculados", `1` → "1 padre vinculado", `n` → "n padres vinculados".

Badges, siguiendo el patrón `postTypeTheme` de SPEC 01 (mapa, no tokens):

- Tarjeta: `allergyLabel` presente → fondo `#FBD8CC`, texto `#D9684A`. Si no, `parents.length === 0` → fondo `#F9D2DE`, texto `#C56486`, label "VINCULAR". Un solo badge por tarjeta: la alergia tiene prioridad.
- Padre: `active` → label "ACTIVA", fondo `#CFEBD8`, texto `#3E9B6C`; `pending` → label "PENDIENTE", fondo `#F7E7A6`, texto `#9A7B1E`.

Tokens nuevos en `globals.css` (sólo chrome; los badges no son tokens):

```css
--color-alert-bg: #FBDAD6;      --color-alert-surface: #F4A8A0;
--color-alert-title: #C5413A;   --color-alert-body: #B25249;
--color-hover-line: #F2A78E;
```

## Implementation plan

1. **`lib/types.ts`** — agregar `ParentStatus`, `ChildParent` y `Child`. Verificar: `npm run build` compila.
2. **`lib/mock/children.ts`** — los 8 `Child` con la tabla y las reglas de arriba; textos visibles en español. Verificar: `npm run build`.
3. **`components/icons.tsx`** — añadir `Search`, `ChevronRight`, `ArrowLeft`, `AlertTriangle` con `currentColor`, mismo estilo que los existentes.
4. **`components/sidebar.tsx` + `components/app-shell.tsx` + `app/page.tsx`** — prop `activeItem: "feed" | "kids"` que `AppShell` reenvía al `Sidebar`; links reales con `next/link`: logo y "Feed" → `/`, "Niños" → `/kids`, resto sigue en `href="#"`; `app/page.tsx` pasa `activeItem="feed"`. Crear **`app/kids/page.tsx`** mínimo: `<AppShell activeItem="kids">` con la cabecera "GESTIÓN / Niños" estática, sin grilla. Verificar: `/` se ve idéntico a hoy, `/kids` muestra el shell con "Niños" activo, drawer sigue funcionando a 375px.
5. **`components/kids-header.tsx` + `components/kid-card.tsx`** — cabecera completa (título, botón "Agregar niño" `href="#"`, barra de búsqueda visual, rótulo de sala) y tarjeta estática tipada con `Child`. Montar las 8 en la grilla `grid-cols-1 md:grid-cols-2 gap-[14px]`, tarjeta `<Link href={`/kids/${child.id}`}>` con hover `hover:border-hover-line hover:-translate-y-0.5 transition`. Verificar: `/kids` coincide con `ninos.dc.html` a 1440×900.
6. **`components/kids-view.tsx`** (`"use client"`) — estado `query`, filtro por nombre insensible a mayúsculas y acentos (comparar con `normalize("NFD").replace(/\p{Diacritic}/gu, "")`), contador `n === 1 ? "1 niño" : `${n} niños``, estado vacío `Sin resultados para «{query}»`. `app/kids/page.tsx` monta `<KidsView>` con `children`. Verificar: "mendez" encuentra a Sofía; "zzz" muestra el vacío.
7. **`components/parents-card.tsx` + `components/child-profile.tsx` + `app/kids/[id]/page.tsx`** — página server: `params: Promise<{ id: string }>` con `await params` (convención de Next 16 en `node_modules/next/dist/docs/`), `children.find(...)` y `notFound()` si no existe. `ChildProfile` renderiza: "Volver a Niños" (`Link` a `/kids`), cabecera, alerta sólo si `notes !== null`, ficha de 3 filas, y la columna derecha con "Resumen del día" (`href="#"`) y `ParentsCard`. Verificar: `/kids/mateo-fernandez` literal contra `perfil-nino.dc.html`, `/kids/otro` → 404.
8. **Responsive** — confirmar apilado bajo `md` (grilla 1 columna, perfil en columna, columna derecha al 100%) y drawer. Verificar a 375px y a 768px.
9. **Verificación** — `npm run lint` (sólo los preexistentes de `references/pantallas/support.js`) y `npm run build`. Playwright a 1440×900: `/kids` contra `references/screenshots/ninos.png`/`ninos2.png` y `/kids/mateo-fernandez` contra el `.dc.html` servido localmente, guardadas en `.playwright-mcp/`. Flujo completo: `/` → click "Niños" → `/kids` → filtrar → click tarjeta → perfil → "Volver a Niños". Consola sin errores.

## Acceptance criteria

- [ ] `npm run build` sin errores de TypeScript; `npm run lint` sin errores nuevos (sólo los preexistentes de `references/pantallas/support.js`).
- [ ] `/kids` renderiza 8 tarjetas en el orden de la tabla, con avatar, nombre y "edad · N padres" exactos ("sin padres vinculados" para Valentina).
- [ ] Sólo Mateo muestra badge MANÍ, Tomás LACTOSA y Valentina VINCULAR; las otras 5 tarjetas sin badge.
- [ ] A ≥768px la grilla tiene 2 columnas; el hover de la tarjeta pone borde `#F2A78E` y sube 2px.
- [ ] Escribir "mendez" deja sólo Sofía Méndez y el rótulo dice "1 niño"; "zzz" muestra «Sin resultados para «zzz»» y "0 niños".
- [ ] Click en la tarjeta de Mateo navega a `/kids/mateo-fernandez`.
- [ ] El perfil de Mateo muestra avatar de 84px `#A9D9E8`, "3 años · Sala Soles", ficha "12 mar 2022" / "Soles" / "feb 2025".
- [ ] El panel "Alergias y notas" tiene fondo `#FBDAD6` y el texto literal del mockup; en un niño sin `notes` el panel no existe.
- [ ] "PADRES VINCULADOS" muestra a Lucía con badge ACTIVA y sub "Mamá · activa", y a Diego con badge PENDIENTE y sub "Papá · invitación enviada".
- [ ] "Volver a Niños" navega a `/kids`.
- [ ] `/kids/<id-inexistente>` devuelve la 404 de Next (`notFound()`).
- [ ] En `/`, `/kids` y `/kids/[id]` el item activo del sidebar es correcto (`#FBE3D8`/`#D9583C`); "Feed" lleva a `/` y "Niños" a `/kids` desde cualquier pantalla.
- [ ] "Agregar niño", "Editar", "Resumen del día", "Vincular otro padre" y "Cerrar sesión" tienen `href="#"` y no navegan.
- [ ] A 375px: grilla de 1 columna, perfil apilado, barra superior con hamburguesa que abre y cierra el drawer.
- [ ] La consola del browser está sin errores ni warnings de hidratación.
- [ ] Capturas guardadas en `.playwright-mcp/` y comparadas contra `references/screenshots/ninos.png` y contra `perfil-nino.dc.html`.

## Decisions

- **Sí:** rutas `/kids` y `/kids/[id]` en inglés, decididas por el usuario. Consistente con la regla de identificadores en inglés del `AGENTS.md`; la UI visible sigue en español.
- **Sí:** parametrizar `Sidebar` con `activeItem` y dar links reales a `/` y `/kids`. Toca código de SPEC 01, pero dejar "Feed" activo en `/kids` sería un nav roto.
- **Sí:** `next/link` para las rutas reales; `<a href="#">` sólo para destinos inexistentes (criterio heredado de SPEC 01).
- **Sí:** filtrado client-side con contador dinámico y estado vacío. Un input sin comportamiento se siente roto; sin persistencia, es UI pura.
- **Sí:** filtro insensible a mayúsculas y acentos vía normalización NFD. "mendez" debe encontrar a "Sofía Méndez".
- **Sí:** los 8 niños con detalle completo; los 7 no cubiertos por el mockup se inventan con las reglas del Data model. 7 tarjetas muertas sería peor que mock data inventada.
- **Sí:** `notFound()` para id inválido. Estado claro, sin redirecciones ambiguas.
- **Sí:** responsive apilado bajo `md` reusando el drawer de SPEC 01. La fidelidad se verifica en escritorio; el móvil sólo debe ser usable.
- **Sí:** un solo badge por tarjeta, prioridad a la alergia sobre VINCULAR. El mockup nunca muestra dos; la alergia es información de seguridad.
- **Sí:** badges como mapa de tema (`parentStatusTheme`, colores fijos de alergia/VINCULAR), por el patrón de `postTypeTheme` de SPEC 01. Sólo el chrome (alerta, hover) son tokens en `@theme`.
- **Sí:** colores de avatar como `style` dinámico desde el mock (datos), no como clases Tailwind: varían por niño.
- **Sí:** `AppShell` montado por cada page, no por `app/layout.tsx` (decisión de SPEC 01).
- **Sí:** `/kids` es server component puro y `KidsView` es el único `"use client"` nuevo. El perfil no tiene estado.
- **No:** `generateStaticParams`. Con 8 ids de mock no aporta; `dynamicParams` ya resuelve.
- **Sí:** títulos de sección y estados en inglés, contenido en español (consistente con SPEC 01).

## Risks

| Riesgo | Mitigación |
| ------ | ---------- |
| Modificar `Sidebar` regresiona el feed | El paso 4 verifica `/` a 1440px antes de seguir; el diff toca sólo `navItems` y los `href` |
| Los 7 perfiles inventados divergen del futuro backend | Todo vive en `lib/mock/children.ts`; un solo archivo que reemplazar cuando lleguen datos reales |
| `params` cambió en Next 16 (ahora es `Promise`) | Seguir `node_modules/next/dist/docs/` (`await params`); el build falla si se olvida el `await` |
| No hay screenshot de referencia del perfil | La verificación se hace contra `perfil-nino.dc.html` servido localmente con Playwright |

## What is **not** in this spec

- `agregar-nino`, `vincular-padre`, `resumen-dia`, `avisos`, `mi-cuenta`.
- Backend, API, server actions, persistencia.
- Alta o edición real de niños, padres y notas.
- Fotos de perfil reales.
- Modo oscuro. Tests automatizados.

Cada uno de esos, si aterriza, va en su propio spec.
