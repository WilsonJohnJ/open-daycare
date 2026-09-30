<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## MCPs

- Playwright Screenshots y cualquier cosa relacionada a Playwright tienen que estar en la carpeta .playwright-mcp.
- Context7 Usaremos este MCP para traer la documentación actualizada del framework.
- El MCP de Playwright está configurado en `opencode.json` (timeout 60s). Ojo: `.playwright-mcp/*` está en `.gitignore`, así que lo que se guarde ahí no se commitea.

## Spec Driven Development - Skills

- /spec Usaremos esta habilidad para crear las especificaciones.
- /spec-impl Usaremos esta skill para hacer las implementaciones.

## Comandos

- `npm run dev` / `npm run build` / `npm run start` / `npm run lint`. No hay más scripts.
- **No hay tests ni script de typecheck.** `npm run build` ya corre la verificación de TypeScript (`next build` la incluye), así que `build` es el typecheck+build real.
- `npx tsc --noEmit` funciona, pero los tipos globales `PageProps<"/ruta">` / `LayoutProps<"/">` (usados en `app/layout.tsx`) se generan en `.next/types` y `.next/dev/types`. En un clon limpio sin `.next`, `tsc` falla: corré `npm run build` o `npm run dev` primero.
- Orden de verificación: `npm run lint` → `npm run build`.

## Gotchas verificados

- `npm run lint` hoy sale con código 1 **por errores preexistentes** en `references/pantallas/support.js` (`react/no-deprecated`, `@next/next/no-assign-module-variable`). No son código tuyo; no los "arregles". Si hay que dejarlos pasar, la vía limpia es añadir `references/**` a `globalIgnores` en `eslint.config.mjs`.
- Tailwind v4, sin `tailwind.config.js`: la config es CSS-first en `app/globals.css` (`@import "tailwindcss"` + `@theme inline`). PostCSS usa el plugin `@tailwindcss/postcss`.
- El alias de tsconfig es `@/*` → **raíz del repo**, no `./src`. O sea `@/app/layout.tsx`.
- Cada build emite un warning de Turbopack: ignora un `package-lock.json` de `/Volumes/Externo/Cursos/IA/OpenCode` que está fuera del repo. Es inofensivo; se silencia con `turbopack.root` en `next.config.ts`.
- `.env*` está gitignored y no hay variables de entorno ni backend: la app es 100% cliente por ahora.

## Estado del proyecto y referencias de diseño

- App de guardería (`open-daycare`) recién scaffolteada con create-next-app: lo único en `app/` es el boilerplate. **No hay lógica de negocio todavía.**
- `references/pantallas/*.dc.html` = mockups de diseño, la fuente de verdad visual. 16 pantallas con dos roles: personal (`ninos`, `agregar-nino`, `perfil-nino`, `feed`, `avisos`, `crear-publicacion`, `detalle-publicacion`, `resumen-dia`, `foto`) y familias (`login`, `activar-cuenta`, `vincular-padre`, `familia-feed`, `familia-cuenta`, `mi-cuenta`).
- `references/pantallas/support.js` está generado por un runtime externo (`dc-runtime`, se rebuild con bun) — **no editar**. Los `.dc.html` son páginas estáticas con un `<x-dc>` custom; se abren en el browser o vía Playwright para comparar.
- `references/screenshots/*.png` son capturas de referencia de esas pantallas.

## Workflow spec-driven

- Specs viven en `specs/NN-slug.md` (la carpeta **todavía no existe**), con estado en el header y `specs/.spec-config.yml` para `AutoCreateBranch`.
- Skills en `.agents/skills/spec` y `.agents/skills/spec-impl` (instaladas desde `klerith/fernando-skills`, fijadas en `skills-lock.json`). Ambas tienen `disable-model-invocation: true`: **solo corren si el usuario las pide explícitamente**, nunca las auto-invokes.
- `spec-impl` exige estado "Approved" (o equivalente), crea la branch `spec-NN-slug` y **nunca commitea solo** — el commit es decisión del usuario.
- El usuario escribe en español y el skill `/spec` obliga a responder en el idioma del prompt: respondé en español.
- Antes de arrancar una feature grande, ofrecé `/spec` en vez de saltar directo a código.

## Reglas de código

- Usar código limpio, nombres, funciones, variables, etc. en inglés. 
