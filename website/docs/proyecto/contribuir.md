---
id: contribuir
title: Contribuir
---

# Contribuir a Ludema

¡Gracias por querer aportar! Esta página resume el proceso. La versión canónica y
siempre actualizada está en [`CONTRIBUTING.md`](https://github.com/roshve/ludema/blob/main/CONTRIBUTING.md) en el repo.

## Setup local

**Requisito:** Node.js 22 (ver `.nvmrc`) y pnpm (`npm i -g pnpm` o Corepack).

```bash
nvm use          # si usás nvm
pnpm install
pnpm dev         # http://localhost:3000
```

## El gate: `pnpm build`

No hay test runner. El único criterio que debe pasar antes de abrir un PR es:

```bash
pnpm build
```

Corre type-check de TypeScript y genera el static export en `out/`.

> `pnpm lint` tiene 3 errores preexistentes conocidos — no es el criterio de éxito.

## Conventional Commits

```
<tipo>(<scope opcional>): <descripción en minúsculas>
```

| Tipo | Aparece en CHANGELOG | Cuándo usarlo |
|------|---------------------|---------------|
| `feat` | ✅ | Nueva funcionalidad visible para el usuario |
| `fix` | ✅ | Corrección de bug |
| `perf` | ✅ | Mejora de rendimiento |
| `docs` | ❌ | Solo documentación |
| `refactor` | ❌ | Refactor sin cambio funcional |
| `chore` | ❌ | Mantenimiento, deps, config |

Ejemplos:
```
feat: agregar ejercicio de tabla de verdad para bicondicional
fix: corregir validación de fórmula con paréntesis anidados
docs: agregar sección de cuantificadores al guide de u1-b
```

## Flujo de trabajo

1. Crear rama desde `main`: `git checkout -b feat/mi-cambio`
2. Hacer cambios y verificar que `pnpm build` pasa.
3. Commitear siguiendo Conventional Commits.
4. Abrir PR contra `main`. El CI corre el build automáticamente.

**PRs pequeños y enfocados** son más fáciles de revisar.

## Agregar contenido

El currículo es data-driven. Para la materia **Lógica**, editás `src/content/unit1.ts`
(o un `unitN.ts` nuevo). Para una **materia nueva**, creás sus propios archivos `unitN.ts`
y los registrás en `src/content/index.ts` — el reproductor de lecciones no necesita cambios.

Consultá la sección [Modelo de contenido](/proyecto/modelo-de-contenido) para la
estructura completa y los tipos de ejercicio disponibles.

Para validar fórmulas de Lógica con el motor antes de commitear:
```bash
pnpm dlx tsx --tsconfig ./tsconfig.json mi-script-de-prueba.ts
```

## Releases

Automáticos vía [release-please](https://github.com/googleapis/release-please).
Al mergear PRs con commits convencionales, se abre automáticamente un PR
"chore(main): release X.Y.Z" que acumula el bump de versión y el CHANGELOG.
Un mantenedor lo mergea y el deploy se dispara solo.
