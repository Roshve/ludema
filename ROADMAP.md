# Roadmap de Ludema

Documento de planificación del trabajo pendiente. La arquitectura técnica vive en
[`ARCHITECTURE.md`](ARCHITECTURE.md); el harness de validación en [`AGENTS.md`](AGENTS.md);
el schema de autoría en [`src/content/AUTHORING.md`](src/content/AUTHORING.md).

**Leyenda:**
- `- [ ]` pendiente
- `- [x]` hecho
- `🔄` en curso

---

## Fase 0 — Refactor del modelo de datos · PRIMERO

**Épica que desbloquea todo lo demás.** El modelo actual (`subjects.ts` plano +
`curriculum` hardcodeado a Lógica) no soporta la estructura real del proyecto:
**Carrera → Año → Materia**, con materias que pueden ser homogéneas entre carreras.

**Decisión de diseño:** la Materia es la entidad reusable y tiene su propio slug
y progreso (`/materia/<slug>`). Carrera y Año solo agrupan en la portada. Si dos
carreras comparten una materia, comparten el mismo progreso.

### Tipos y estructura de contenido

- [ ] Definir tipos nuevos en `src/content/types.ts`:
  - `Materia { id, slug, title, tagline, accent, icon, units: Unit[] }`
  - `Año { año: number; materiaIds: string[] }`
  - `Carrera { id, slug, nombre, años: Año[] }`
- [ ] Crear `src/content/materias/` — un módulo por materia:
  - `src/content/materias/logica.ts` — reagrupa `unit1`/`unit2` bajo la materia Lógica.
  - (Materias futuras siguen el mismo patrón.)
- [ ] Crear `src/content/carreras.ts` — declara las carreras con referencia a `materiaId`.
  Las materias compartidas entre carreras usan el mismo `materiaId`, no se duplican.
- [ ] Garantizar unicidad global de IDs de lección: prefijados por materia
  (ej. `logica-u1-a-l1`) o derivados en `buildIndex()`. Actualizar todos los IDs
  existentes de `u1`/`u2`.
- [ ] En `src/stores/progress.ts`: versionar el persist con `migrate` para mover
  `completedLessons` del formato viejo (sin prefijo de materia) al nuevo.

### `index.ts` — API del currículo

- [ ] Reemplazar `curriculum: Unit[]` por `MATERIAS: Materia[]` + `CARRERAS: Carrera[]`.
- [ ] Exponer: `getMateria(slug)`, `getCarrera(slug)`, `curriculumDeMateria(slug)`.
- [ ] `allLessonIds` y `allGuideSectionIds` recorren **todas** las materias disponibles.
- [ ] Actualizar `generateStaticParams` en `app/lesson/[lessonId]` y
  `app/guide/[sectionId]` para usar los nuevos índices.

### Ruteo

- [ ] Nueva ruta `/materia/[slug]/page.tsx` — mapa de la materia (reusa `LearningMap`).
- [ ] `HomeLanding` muestra carreras → años → materias (en lugar del catálogo plano).
- [ ] Deprecar `/logica` → redirect a `/materia/logica` o reescribir como alias.
- [ ] `subjects.ts` queda como compatibilidad temporal o se elimina.

### Tooling

- [ ] `scripts/validate-content.ts` recorre `MATERIAS` en lugar de `curriculum`.
- [ ] `scripts/eval-content.ts` y `src/content/eval/` idem.

**Criterio de aceptación:**
`pnpm check` verde; portada lista carreras→años→materias; progreso compartido
entre carreras que comparten materia; `/materia/logica` juega U1/U2 igual que antes.

---

## Fase 1 — Migración de contenido a JSON

**Prerequisito del editor de contenido.** El contenido pasa de módulos TypeScript
(difíciles de escribir desde una UI) a archivos JSON que el editor puede leer y
sobrescribir.

- [ ] Mover el contenido de `materias/logica.ts` (y futuros `unitN.ts`) a
  `src/content/data/<materia>/<unitN>.json`.
- [ ] Loader tipado en `src/content/loader.ts`: importa los JSON y los valida
  con los schemas zod de `validate.ts` al arrancar.
- [ ] `validate:content` y `eval:content` operan sobre el JSON cargado (misma
  API; solo cambia la fuente).
- [ ] Tests de snapshot: comparar contenido antes y después de la migración.

**Criterio de aceptación:**
Contenido idéntico a la versión TS (diff 0 en el snapshot); `pnpm validate:content`
sale con código 0; `pnpm check` verde.

---

## Fase 2 — Editor de contenido dev-only

UI visible solo en `next dev` para crear y editar contenido sin tocar código.

### Restricción static export

`output: "export"` rompe el build si hay route handlers en el bundle. El handler
del editor **debe** excluirse en producción:
```ts
// Solo se incluye si NODE_ENV=development en build time
if (process.env.NODE_ENV !== "development") return notFound();
```

### Tareas

- [ ] Ruta `/editor` — gateada por `NODE_ENV === "development"` (404 en
  producción/export). Enlace al editor visible solo en dev (ej. en el HUD o
  corner button).
- [ ] Route handler dev-only `app/api/editor/route.ts` — lee y **escribe**
  los JSON de `src/content/data/`. Excluido del export estático via guarda
  `NODE_ENV`.
- [ ] UI del editor:
  - Árbol de navegación: Carrera → Año → Materia → Unidad → Sección → Lección →
    Ejercicio.
  - Formularios por los **9 tipos** de ejercicio (campos validados en frontend).
  - Al guardar: llama al route handler + corre `validateCurriculum` y muestra
    issues inline.
  - Acciones: crear, editar, reordenar, eliminar ejercicios/lecciones.
- [ ] (Opcional) Vista previa del ejercicio editado usando el renderer real.

**Criterio de aceptación:**
En `next dev` se puede crear/editar una lección y el JSON persiste en disco;
`pnpm build` de producción no incluye el editor ni el handler; `pnpm check` verde.

---

## Fase 3 — Contenido pendiente

A desarrollar **sobre el modelo nuevo** (Fases 0 y 1 completas) usando el
editor (Fase 2) o directamente sobre el JSON.

### Unidad 2 — Conjuntos (materia: Lógica y Estructuras Discretas)

Las secciones A y B están completas. Pendientes:

- [ ] **Sección C — Demostraciones de propiedades** (`u2-c`, violet, 4 lecciones)
  Tipos: `deduction-steps`, `simplify-steps`. Definir `CONJUNCTION_LAWS` antes
  de implementar los pasos de simplificación (análogo al cheatsheet lógico).
  Ver `docs/unidad2-andamiaje.md` para los ejercicios concretos.
- [ ] **Sección D — Familias de conjuntos** (`u2-d`, indigo, 3 lecciones)
  Tipos: `multiple-choice`, `concept`. Incluye conjunto potencia y producto
  cartesiano.
- [ ] **Sección E — Inducción completa** (`u2-e`, fuchsia, 6 lecciones)
  Tipos: `deduction-steps` (los más complejos de U2). Modelar igual que las
  demostraciones de U1-C pero con álgebra/aritmética en `result`.

- [ ] **Mejorar explicaciones y ejercicios `concept`** (transversal a A–E)
  Revisar `explanation` de cada ejercicio: sustantiva, con ejemplo, estilo
  rioplatense. Reforzar los ejercicios tipo `concept` (más motivación, conexión
  con la práctica). Validar con `pnpm eval:content` (mide calidad pedagógica,
  no correctitud) — sin regresiones PASS→FAIL.
- [ ] **+5 lecciones nuevas en Unidad 2** repartidas entre C/D/E
  (refuerzo y práctica adicional). IDs siguen convención `u2-<sec>-l<n>`;
  reordenar sin colisionar. `pnpm validate:content` exit 0.

**Criterio de aceptación:** `pnpm validate:content` exit 0; `eval:content` sin
regresiones; jugable de punta a punta en `/materia/logica`.

### Unidades futuras

- [ ] **Unidad 3** — confirmar estado (¿existe? ¿está en andamiaje? ¿es nueva materia?).
- [ ] **Unidad 4** — alcance temático a definir.
- [ ] **Unidad 5** — alcance temático a definir.
- [ ] **Unidad 6** — alcance temático a definir.

**Criterio de aceptación por unidad:** `pnpm validate:content` exit 0; jugable en
`/materia/<slug>`; logros y progreso funcionan.

---

## Decisiones abiertas

| Pregunta | Estado |
|----------|--------|
| ¿Unidad 3 existe o es nueva? | ⏳ pendiente de confirmar |
| Alcance temático de U4 / U5 / U6 | ⏳ pendiente |
| ¿El editor edita guías y cheatsheets además de ejercicios? | ⏳ pendiente |
| Estrategia de versionado de contenido JSON (git history vs. backups) | ⏳ pendiente |
