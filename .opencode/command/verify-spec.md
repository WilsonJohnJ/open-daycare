---
description: Verifica los "Acceptance criteria" de un spec, corrige el código que no cumple y marca los checks. Cierra el flujo /spec → /spec-impl → /verify-spec.
agent: spec-verifier
---

# /verify-spec — Verificador de criterios de aceptación

Verificá los checks del `## Acceptance criteria` de un spec, corregí el código
que no los cumple, y marcá los que pasan.

Este comando es la tercera pieza del flujo del repo:
`/spec` (diseñar) → `/spec-impl` (implementar) → **`/verify-spec` (verificar)**.

El workflow completo vive en el agente `spec-verifier`. Tu trabajo acá es sólo
resolver el spec y delegar.

---

## Paso 1 — Identificar el spec

El argumento recibido es: `$ARGUMENTS`

Si `$ARGUMENTS` está vacío:

- Listá los specs disponibles en `specs/` (`ls specs/`).
- Preguntale al usuario cuál verificar.
- **Pará y esperá.** No elijas vos.

Si `$ARGUMENTS` tiene valor, buscá el archivo en `specs/`. El usuario puede
haber escrito:

| Qué escribió | Qué buscás |
| --- | --- |
| `01-feed-home` | `specs/01-feed-home.md` |
| `01` | el único spec que empiece por `01-` |
| `feed-home` | el único spec que contenga `feed-home` |

Probá las formas en ese orden. Si no encontrás nada, mostrale los specs
disponibles y pedí que corrija el nombre. **No inventes una ruta ni crees un
archivo nuevo.**

---

## Paso 2 — Contexto de la sesión

Corré estos dos comandos para tener el estado antes de arrancar:

```bash
git status --short
git branch --show-current
```

No los interpretes todavía: el agente se encarga de decidir si hace falta
preguntarle al usuario por el estado del árbol.

---

## Paso 3 — Verificar

Ejecutá el flujo completo de fases **A–F** del agente `spec-verifier` sobre el
spec que encontraste, desde la línea de comando de arriba.

Recordatorio operativo, para que no se te olvide:

- Levantá el dev server en **background** si vas a usar Playwright:
  `npm run dev > /tmp/od-dev.log 2>&1 &`, esperá el `Ready`. Si el puerto 3000
  ya responde, reutilizá ese server.
- Usá **Context7** para los checks que toquen comportamiento de Next.js/React, y
  leé además `node_modules/next/dist/docs/` — esta versión tiene breaking
  changes.
- Usá **visión** para los checks de fidelidad visual: capturá a
  `.playwright-mcp/` y leé la imagen para compararla contra
  `references/screenshots/*.png`.
- **Cada check necesita evidencia medida**, nunca inferida.
- Si algo falla, **arreglalo** y volvé a verificar antes de marcarlo.
- **Nunca commitees** y ** nunca cambies el estado del spec.** Si todo pasa, sólo
  avisale al usuario que ya puede pasarlo a `Implemented` a mano.