# Contribuir a Ludema

¡Gracias por querer aportar! Esta guía explica cómo configurar el entorno, el flujo de trabajo esperado y los casos más comunes de contribución.

---

## Setup local

**Requisito:** Node.js 22 (ver [`.nvmrc`](.nvmrc)) y pnpm (`npm i -g pnpm` o Corepack).

```bash
# Usando nvm (recomendado)
nvm use

pnpm install
pnpm dev   # http://localhost:3000
```

> ⚠️ **Este proyecto usa Next.js 16**, que tiene breaking changes respecto a versiones anteriores (`params` es una `Promise`, rutas dinámicas requieren `generateStaticParams`, Turbopack en dev). Leé [`AGENTS.md`](AGENTS.md) antes de tocar código de routing o data-fetching.

---

## El gate: lint → test → build

Antes de abrir un PR, los tres comandos deben pasar sin errores:

```bash
pnpm lint        # ESLint (sin errores)
pnpm test        # Vitest (tests del motor de lógica)
pnpm build       # type-check de TypeScript + static export a out/
```

El CI corre los tres en ese orden. Si alguno falla, el PR no puede mergearse.

> **Formato:** podés correr `pnpm format` para que Prettier arregle el estilo automáticamente, o `pnpm format:check` para solo verificar.

---

## Conventional Commits

Este proyecto usa **Conventional Commits** para generar el CHANGELOG y versionar automáticamente con `standard-version`. Si los commits no siguen la convención, el historial de versiones queda roto.

### Formato

```
<tipo>(<scope opcional>): <descripción en minúsculas>
```

### Tipos disponibles

| Tipo | Aparece en CHANGELOG | Cuándo usarlo |
|------|---------------------|---------------|
| `feat` | ✅ Features | Nueva funcionalidad visible para el usuario |
| `fix` | ✅ Bug Fixes | Corrección de bug |
| `perf` | ✅ Performance | Mejora de rendimiento |
| `docs` | ❌ oculto | Solo documentación |
| `style` | ❌ oculto | Formato, espacios, sin cambios de lógica |
| `refactor` | ❌ oculto | Refactor sin nueva funcionalidad ni bug fix |
| `chore` | ❌ oculto | Tareas de mantenimiento, deps, config |
| `build` | ❌ oculto | Cambios en el sistema de build |

### Ejemplos (estilo del repo)

```
feat: agregar ejercicio de tabla de verdad para bicondicional
fix: corregir validación de fórmula con paréntesis anidados
docs: agregar sección de cuantificadores al guide de u1-b
chore: actualizar dependencias de devDependencies
style: unificar ancho de página a max-w-2xl
```

> **BREAKING CHANGE:** Si el cambio rompe compatibilidad hacia atrás, agregá `BREAKING CHANGE:` en el cuerpo del commit (no en el título). Esto bumpeará el major en el próximo release.

---

## Flujo de trabajo

1. **Creá una rama** desde `main` con un nombre descriptivo:
   ```bash
   git checkout -b feat/agregar-ejercicio-bicondicional
   ```
2. Hacé tus cambios y verificá que `pnpm build` pasa.
3. Commiteá siguiendo Conventional Commits.
4. Abrí un PR contra `main` usando la plantilla provista. El CI correrá el build automáticamente.
5. Un mantenedor revisará y mergeará el PR.

**PRs pequeños y enfocados** son más fáciles de revisar. Si tu cambio es grande, consultalo primero abriendo un issue.

---

## Cómo agregar contenido (el caso más común)

El currículo es **data-driven**: agregar lecciones o ejercicios **no requiere tocar componentes**. Solo editás el archivo de contenido.

### Estructura

```
src/content/
  unit1.ts     ← Unidad 1 completa (editar acá para contenido de U1)
  unitN.ts     ← Para unidades nuevas
  index.ts     ← Registra y ensambla las unidades
  types.ts     ← Tipos discriminados de los 9 tipos de ejercicio
```

### Tipos de ejercicio disponibles

| `type` | Validación | Descripción |
|--------|-----------|-------------|
| `multiple-choice` | Autorada | Opciones con una respuesta correcta |
| `truth-table` | Motor | Completar tabla de verdad |
| `classify` | Motor | Tautología / contradicción / contingencia |
| `formula-input` | Motor | Escribir una fórmula proposicional |
| `match-pairs` | Autorada | Emparejar columnas |
| `ordering` | Autorada | Ordenar pasos de una demostración |
| `fill-blank` | Autorada | Completar con texto |
| `simplify-steps` | Autorada | Pasos de simplificación lógica |
| `deduction-steps` | Autorada | Pasos de deducción |

**Motor** = validado automáticamente por `src/lib/logic/`. **Autorada** = la respuesta correcta se define a mano en el contenido.

### Validar con el motor de lógica

Para ejercicios de tipo motor, corré los tests automáticos primero:

```bash
pnpm test
```

Los tests en `src/lib/logic/__tests__/` cubren el parser, evaluador, tabla de verdad,
`classify` y `findCounterexample`. Si querés probar una fórmula específica de forma
ad-hoc, podés usar:

```bash
pnpm dlx tsx --tsconfig ./tsconfig.json <tu-script-de-prueba>.ts
```

El alias `@/*` resuelve a `src/*`. Usá `truthColumn`, `classify` y `findCounterexample` de `src/lib/logic/`.

### Identificadores (`id`)

- Formato: `u<unidad>-<sección>-<tipo>-<número>` (ej. `u1-a-mc-01`, `u1-b-tt-03`).
- Los IDs de lección siguen: `u<unidad>-<sección>-l<número>` (ej. `u1-a-l1`).
- Son permanentes: cambiarlos borra el progreso de usuarios que ya completaron esa lección.

Para más detalles de la arquitectura de contenido, leé [`CLAUDE.md`](CLAUDE.md) (sección *Content model*).

---

## Releases (solo mantenedores)

El versionado es **automático vía GitHub Actions** con [release-please](https://github.com/googleapis/release-please). No se corre nada localmente.

### Flujo

1. Se mergean PRs a `main` con Conventional Commits.
2. El workflow **Release** (`.github/workflows/release.yml`) corre y abre/actualiza
   automáticamente un PR llamado **"chore(main): release X.Y.Z"** que acumula el
   bump de `package.json` y las notas del `CHANGELOG.md`.
3. Un mantenedor revisa y **mergea ese PR de release**.
4. Al mergearlo: release-please crea el tag `vX.Y.Z` y el **GitHub Release** con las
   notas del CHANGELOG. El deploy a Pages se dispara automáticamente y la UI muestra
   la nueva versión.

> ⚠️ **Conventional Commits es obligatorio**: `feat`, `fix` y `perf` son los tipos
> que bumbean versión y aparecen en el CHANGELOG. Sin la convención correcta, el
> versionado semántico no funciona.

---

## Labels de GitHub

El botón de reporte in-app (⚙️ → "Reportar o sugerir") genera issues con estos labels. Para crearlos o actualizarlos, corré el workflow **Setup labels** desde GitHub Actions → Actions → Setup labels → Run workflow. Es idempotente: si el label ya existe, lo actualiza.

---

## Consideraciones futuras

- **Branch protection:** configurar en GitHub Settings → Branches para requerir que el CI pase y haya al menos 1 review antes de mergear a `main`. El modelo de release-please ya es compatible (el release ocurre vía PR, no por push directo).
- **CI en el release-PR:** por limitación de GitHub Actions, el `GITHUB_TOKEN` no dispara otros workflows en PRs creados por bots. Si se quiere que el build corra también sobre el release-PR, configurar un PAT como `secrets.RELEASE_TOKEN` y pasarlo como `token:` en `release.yml`.
