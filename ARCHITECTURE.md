# Arquitectura de Ludema

Plataforma estilo Duolingo para gamificar materias universitarias: corazones, XP, rachas y validación automática de respuestas. **Frontend-only** — sin backend, sin cuentas. La app es un **static export** de Next.js y todo el progreso del usuario vive en `localStorage`. Materia activa: **Lógica** (proposicional, tablas de verdad, cuantificadores, inferencia).

---

## Stack

| Capa           | Tecnología                                          |
| -------------- | --------------------------------------------------- |
| Framework      | Next.js 16.2 (`output: "export"` → `out/`)         |
| UI             | React 19, Tailwind v4 (sin config file)             |
| Estado         | Zustand 5 + persist (localStorage)                  |
| Animaciones    | motion/react, lottie-react, canvas-confetti         |
| Íconos         | lucide-react                                        |
| Deploy         | GitHub Pages — `NEXT_PUBLIC_BASE_PATH` en build     |
| Package manager| pnpm 11, Node ≥ 22                                  |

Build: `pnpm build` = type-check + export estático. Gate antes de PR: `pnpm check` (`lint && test && build`). Ver [`AGENTS.md`](AGENTS.md) para el harness completo de validación.

---

## Mapa de directorios

```
ludema/
├── src/
│   ├── app/                          # Rutas de Next.js (App Router)
│   │   ├── page.tsx                  # / → portada (HomeLanding)
│   │   ├── logica/page.tsx           # /logica → mapa de Lógica
│   │   ├── lesson/[lessonId]/        # /lesson/:id → player (server page)
│   │   ├── guide/[sectionId]/        # /guide/:id → mini-guía de sección
│   │   ├── practice/page.tsx         # /practice → repaso de ejercicios fallados
│   │   ├── pomodoro/page.tsx         # /pomodoro → timer Pomodoro
│   │   ├── estadisticas/page.tsx     # /estadisticas → dashboard de estudio
│   │   ├── logros/page.tsx           # /logros → lista de logros/achievements
│   │   ├── tools/page.tsx            # /tools → generador de tablas de verdad
│   │   ├── layout.tsx                # Layout raíz (HUD, fuente, tema)
│   │   └── globals.css               # Tailwind v4 + utilities globales
│   │
│   ├── components/
│   │   ├── lesson/                   # Player + renderers (la costura principal)
│   │   │   ├── LessonPlayer.tsx      # Orquesta índice, corazones, XP, resultados
│   │   │   ├── ExerciseView.tsx      # Switch por exercise.type → renderer
│   │   │   ├── types.ts              # Contrato RenderProps / onAnswer
│   │   │   ├── CheatSheet.tsx        # Cheatsheet desplegable durante la lección
│   │   │   ├── TableDraft.tsx        # Borrador de tabla de verdad
│   │   │   └── exercises/            # Un archivo por tipo de ejercicio (9 tipos)
│   │   ├── map/                      # Mapa de aprendizaje y nodos de lección
│   │   ├── guide/                    # Vista de mini-guía por sección
│   │   ├── achievements/             # Grid de logros y toast de desbloqueo
│   │   ├── home/                     # Landing (HomeLanding, SubjectCard)
│   │   ├── hud/                      # HUD global (racha, corazones, XP, tema)
│   │   ├── practice/                 # Sesión de repaso
│   │   ├── pomodoro/                 # Timer Pomodoro
│   │   ├── stats/                    # Dashboard de estadísticas
│   │   ├── tools/                    # Generador de tablas de verdad
│   │   └── ui/                       # Primitivos (Button, Tooltip, Lottie…)
│   │
│   ├── content/                      # Currículo y tipos (la fuente de verdad)
│   │   ├── types.ts                  # Unión discriminada de 9 tipos de ejercicio
│   │   ├── index.ts                  # curriculum, getLesson, getLessonContext…
│   │   ├── subjects.ts               # Catálogo de materias de la portada
│   │   ├── unit1.ts / unit2.ts       # Currículo de Lógica (Unidades 1 y 2)
│   │   ├── achievements.ts           # Definición de logros (ACHIEVEMENTS)
│   │   ├── cheatsheet.ts             # Contenido del cheatsheet
│   │   ├── validate.ts               # Validador de contenido (zod + semántica)
│   │   ├── eval/                     # Suite de evaluación pedagógica
│   │   └── AUTHORING.md              # Guía de autoría: schema, snippets, reglas
│   │
│   ├── lib/
│   │   ├── logic/                    # Motor lógico puro (sin React)
│   │   │   ├── parser.ts             # Tokenizer + parser recursivo
│   │   │   ├── evaluate.ts           # Evaluador de AST
│   │   │   ├── truthTable.ts         # Generador de tablas de verdad
│   │   │   ├── classify.ts           # Tautología / contradicción / contingencia
│   │   │   ├── counterexample.ts     # findCounterexample / isCounterexample
│   │   │   ├── subexpressions.ts     # Subexpresiones de una fórmula
│   │   │   └── __tests__/            # Tests unitarios del motor
│   │   ├── accent.ts                 # Acentos de color por sección
│   │   ├── practice.ts               # Lógica de selección de ejercicios para repaso
│   │   ├── sfx.ts / confetti.ts      # Efectos de sonido y confeti
│   │   ├── analytics.ts              # Integración Analytics (Google)
│   │   ├── report.ts                 # Reporte de errores de contenido
│   │   └── utils.ts / version.ts     # Utilidades generales
│   │
│   ├── hooks/
│   │   ├── useHydrated.ts            # Espera a que el store hidrate (SSR safe)
│   │   ├── useTheme.ts               # Tema claro/oscuro
│   │   ├── useSoundEnabled.ts        # Sonidos habilitados
│   │   └── useStudyTimer.ts          # Timer de estudio activo
│   │
│   └── stores/
│       └── progress.ts               # Store principal (zustand + persist)
│
├── scripts/
│   ├── validate-content.ts           # pnpm validate:content
│   └── eval-content.ts               # pnpm eval:content
│
└── next.config.ts                    # output: "export", basePath, versión
```

---

## Las 3 costuras

### 1. Contenido — `src/content/`

**Fuente de verdad**. La jerarquía es agnóstica al dominio:

```
Unit → Section → Lesson → Exercise[]
```

`types.ts` define una **unión discriminada** de 9 tipos de ejercicio:

| Tipo (`type`)       | Renderer                  | Validación           |
| ------------------- | ------------------------- | -------------------- |
| `concept`           | `ConceptCard.tsx`         | No aplica (no puntúa)|
| `multiple-choice`   | `MultipleChoice.tsx`      | Autorado             |
| `tap-proposition`   | `TapProposition.tsx`      | Motor / autorado     |
| `truth-table`       | `TruthTable.tsx`          | Motor (`truthColumn`)|
| `classify`          | `Classify.tsx`            | Motor (`classify`)   |
| `counterexample`    | `Counterexample.tsx`      | Motor (`findCounterexample`) |
| `build-expression`  | `BuildExpression.tsx`     | Motor (equivalencia) |
| `simplify-steps`    | `SimplifySteps.tsx`       | Motor (equivalencia de pasos) |
| `deduction-steps`   | `DeductionSteps.tsx`      | Autorado             |

`index.ts` arma `curriculum`, aplana las lecciones con `buildIndex()` y expone:

- `getLesson(id)` / `getLessonContext(id)` — contexto con prev/next.
- `allLessonIds` — para `generateStaticParams` de la ruta `/lesson/[lessonId]`.
- `getSection(id)` / `allGuideSectionIds` — para `generateStaticParams` de `/guide/[sectionId]`.
- `lessonXp(lesson)` — XP de la lección (10 × ejercicios no-concept).

`subjects.ts` define el catálogo de materias de la portada (`SUBJECTS`): cada materia tiene `slug` (= ruta), `available` (false → "Próximamente"), `accent` e ícono.

> Para agregar contenido: ver [`src/content/AUTHORING.md`](src/content/AUTHORING.md).

---

### 2. Motor lógico — `src/lib/logic/`

**Puro, sin React**. Parsea fórmulas proposicionales y auto-valida respuestas sin necesidad de answers codificados a mano.

```
cadena → parser.ts → AST → evaluate.ts → valor booleano
                              ↓
                         truthTable.ts  →  truth-table, classify, build-expression
                         classify.ts    →  classify
                         counterexample.ts → counterexample
                         subexpressions.ts → simplify-steps
```

- Operadores: `¬ ∼ ~` / `∧ &` / `∨ |` / `⇒ → ->` / `⇔ ↔ <->`.
- Variables: letras minúsculas, orden canónico `p q r s t`.
- Precedencia: ¬ > ∧ > ∨ > ⇒ (asocia a derecha) > ⇔.
- Ejercicios de cuantificadores: fuera del dominio del motor — usan `multiple-choice` autorado.

---

### 3. Renderers + player — `src/components/lesson/`

**Contrato** (`types.ts`):

```ts
type RenderProps<E> = {
  exercise: E;
  onAnswer: (result: { correct: boolean } | null) => void;
  requestCheck?: () => void; // para ejercicios con timer
};
```

Cada renderer es autocontenido: gestiona su estado de selección y llama `onAnswer` cuando el usuario responde, o `null` si la respuesta está incompleta.

`LessonPlayer.tsx` orquesta:
- índice del ejercicio actual, corazones, XP acumulada, lista de resultados.
- ejecuta "Comprobar" (un solo check por ejercicio), muestra feedback, descuenta corazón en error.
- decide flujo: siguiente → completado → fallado.

`ExerciseView.tsx` hace `switch` sobre `exercise.type` para seleccionar el renderer correcto.

---

## Flujo de datos

```
src/content/unit*.ts
       │
       ▼
src/content/index.ts  ──── buildIndex() ────► allLessonIds / allGuideSectionIds
       │
       ▼
app/lesson/[lessonId]/page.tsx  (server)
  • generateStaticParams → allLessonIds
  • await params → getLessonContext(id)
       │
       ▼
components/lesson/LessonPlayer.tsx  (client)
  • recibe { lesson, prevLessonId, nextLessonId }
  • gestiona índice / corazones / xp
       │
       ▼
components/lesson/ExerciseView.tsx
  • switch(exercise.type) → renderer
       │
       ▼
renderer (BuildExpression, TruthTable, etc.)
  • onAnswer({ correct }) / null
       │
       ▼
src/stores/progress.ts  (zustand + persist → localStorage)
  • completeLesson(), loseHeart(), unlockAchievement()…
```

**Hidratación SSR**: el store es de cliente; leer valores del store para display solo después del mount. Usar `useHydrated()` (`src/hooks/useHydrated.ts`) o el flag `hasHydrated` del store.

---

## Estado y progreso — `src/stores/progress.ts`

Store único con `zustand` + `persist` (key: `ludema-progress`). Campos principales:

| Campo                  | Tipo / default         | Propósito                              |
| ---------------------- | ---------------------- | -------------------------------------- |
| `hearts`               | number (0-5)           | Regen automático cada 5 min            |
| `xp` / `streak`        | number                 | XP total y racha diaria                |
| `completedLessons`     | Record<id, {xp, date}> | Lecciones completadas                  |
| `missedExercises`      | string[]               | Cola de ejercicios para `/practice`    |
| `totalStudySeconds`    | number                 | Tiempo de estudio activo acumulado     |
| `dailyStudy`           | Record<date, seconds>  | Estudio por día (para estadísticas)    |
| `pomodorosCompleted`   | number                 | Pomodoros de 25 min finalizados        |
| `unlockedAchievements` | Record<id, isoDate>    | Logros desbloqueados                   |
| `pendingAchievements`  | string[]               | Cola de toasts de logro pendientes     |

**Unlock logic vive en la UI** (`components/map/LearningMap.tsx`), no en el store: una lección se desbloquea cuando la anterior está en `completedLessons`; la sección es "gold" cuando todas sus lecciones están completas; la Unidad 2 está bloqueada hasta que la Unidad 1 es completamente gold.

---

## Rutas

| Ruta                     | Componente principal    | Tipo   | Propósito                              |
| ------------------------ | ----------------------- | ------ | -------------------------------------- |
| `/`                      | `HomeLanding`           | client | Portada — catálogo de materias         |
| `/logica`                | `LearningMap`           | client | Mapa de lecciones de Lógica            |
| `/lesson/[lessonId]`     | `LessonPlayer`          | server | Player de lección (static params)      |
| `/guide/[sectionId]`     | `SectionGuideView`      | server | Mini-guía teórica de una sección       |
| `/practice`              | `PracticeSession`       | client | Repaso de ejercicios fallados          |
| `/pomodoro`              | `PomodoroTimer`         | client | Timer Pomodoro (25/5 min)              |
| `/estadisticas`          | `StatsDashboard`        | client | Estudio diario, XP, racha              |
| `/logros`                | `AchievementsGrid`      | client | Logros desbloqueados / pendientes      |
| `/tools`                 | `TruthTableGenerator`   | client | Generador interactivo de tablas        |

> Regla de routing: `generateStaticParams` siempre en el **server page**; nunca marcar ese archivo `"use client"`.

---

## Cómo extender

### a) Agregar lecciones o ejercicios a un tipo existente

Editar `src/content/unit1.ts` o `unit2.ts`. Sin cambios de código.
Ver [`src/content/AUTHORING.md`](src/content/AUTHORING.md) para el schema completo.

### b) Agregar un tipo de ejercicio nuevo

1. Agregar variante a la unión `Exercise` en `src/content/types.ts`.
2. Crear renderer en `src/components/lesson/exercises/` implementando `RenderProps`.
3. Agregar `case` en `ExerciseView.tsx`.

### c) Agregar una materia nueva

1. Agregar entrada en `src/content/subjects.ts` (`available: false` durante el desarrollo).
2. Crear `src/content/unitN.ts` con el currículo y registrarlo en `src/content/index.ts`.
3. Crear la ruta `src/app/<slug>/page.tsx` (puede reusar `LearningMap`).
4. Si la materia necesita validación automática: agregar motor en `src/lib/<materia>/`.

---

## Validación y gate

| Comando               | Cuándo ejecutar                         |
| --------------------- | --------------------------------------- |
| `pnpm validate:content` | Tras editar cualquier `unitN.ts`      |
| `pnpm eval:content`   | Tras cambiar prompt de generación/modelo|
| `pnpm check`          | Antes de todo PR (lint + test + build)  |

Ver [`AGENTS.md`](AGENTS.md) para detalles del harness, métricas pedagógicas y el loop validar→corregir.
