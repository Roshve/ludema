# Contribuir a Ludema

¡Gracias por querer aportar! Esta guía explica cómo configurar el entorno, el flujo de trabajo esperado y los casos más comunes de contribución.

---

## Setup local

**Requisito:** Node.js 22 (ver [`.nvmrc`](.nvmrc)).

```bash
# Usando nvm (recomendado)
nvm use

npm install
npm run dev   # http://localhost:3000
```

> ⚠️ **Este proyecto usa Next.js 16**, que tiene breaking changes respecto a versiones anteriores (`params` es una `Promise`, rutas dinámicas requieren `generateStaticParams`, Turbopack en dev). Leé [`AGENTS.md`](AGENTS.md) antes de tocar código de routing o data-fetching.

---

## El gate: `npm run build`

No hay test runner. El único gate que debe pasar antes de abrir un PR es:

```bash
npm run build
```

Esto corre type-check de TypeScript y genera el static export en `out/`. Si el build falla, el CI también falla.

> `npm run lint` tiene 3 errores preexistentes conocidos que no son regresiones. No uses lint como criterio de éxito.

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
2. Hacé tus cambios y verificá que `npm run build` pasa.
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

Para ejercicios de tipo motor, verificá tu fórmula antes de commitear:

```bash
npx tsx --tsconfig ./tsconfig.json <tu-script-de-prueba>.ts
```

El alias `@/*` resuelve a `src/*`. Usá `truthColumn`, `classify` y `findCounterexample` de `src/lib/logic/`.

### Identificadores (`id`)

- Formato: `u<unidad>-<sección>-<tipo>-<número>` (ej. `u1-a-mc-01`, `u1-b-tt-03`).
- Los IDs de lección siguen: `u<unidad>-<sección>-l<número>` (ej. `u1-a-l1`).
- Son permanentes: cambiarlos borra el progreso de usuarios que ya completaron esa lección.

Para más detalles de la arquitectura de contenido, leé [`CLAUDE.md`](CLAUDE.md) (sección *Content model*).

---

## Releases (solo mantenedores)

```bash
npm run release          # patch automático (detecta feat/fix en commits)
npm run release:minor    # minor manual
npm run release:major    # major manual
npm run release:dry      # preview sin commitear

git push --follow-tags origin main
```

El release bumps la versión en `package.json`, actualiza `CHANGELOG.md` y crea un tag `vX.Y.Z`.

---

## Labels de GitHub

El botón de reporte in-app (⚙️ → "Reportar o sugerir") genera issues con estos labels. Hay que crearlos en el repo si no existen:

```bash
gh label create contenido   --color BFD4F2 --description "Error de contenido" --force
gh label create bug         --color D73A4A --description "Bug técnico" --force
gh label create enhancement --color A2EEEF --description "Sugerencia / mejora" --force
```

---

## Consideraciones futuras

- **Branch protection:** configurar en GitHub Settings → Branches para requerir que el CI pase y haya al menos 1 review antes de mergear a `main`.
- **Commit hooks:** si el equipo crece, se puede agregar `husky` + `commitlint` para validar commits automáticamente.
- **CODE_OF_CONDUCT y SECURITY:** útiles cuando el proyecto sea más público.
