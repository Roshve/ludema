# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> The import above is load-bearing: this is **Next.js 16** with breaking changes vs. older training data (`params` is a `Promise`, dynamic routes need `generateStaticParams`, Turbopack build). Consult `node_modules/next/dist/docs/01-app/` before writing routing/data code.

## What this is

**Ludema** is a Duolingo-style webapp for learning **logic** (university-level: propositional logic, truth tables, laws, quantifiers, inference). It is **frontend-only**: no backend, no accounts. The app is a **static export** (`output: "export"` → `out/`) and all user progress lives in `localStorage`.

## Commands

```bash
pnpm dev          # dev server at http://localhost:3000
pnpm lint         # eslint (must pass clean — no known preexisting errors)
pnpm test         # vitest — unit tests for src/lib/logic/
pnpm build        # type-check + static export to out/
pnpm format       # prettier auto-fix
pnpm format:check # prettier check only
```

**Gate before PR:** `pnpm lint && pnpm test && pnpm build` — all three must pass. `pnpm test` covers `src/lib/logic/__tests__/` (parser, evaluate, classify, counterexample, subexpressions). For ad-hoc formula validation, throwaway scripts still work: `pnpm dlx tsx --tsconfig ./tsconfig.json <file>.ts` (the `@/*` alias resolves). When changing the engine or adding exercises, validate by scripting against `truthColumn`, `classify`, and `findCounterexample`.

## Architecture

The app is **data-driven**: the curriculum in `src/content/` is the source of truth, a small **pure logic engine** validates answers, and **self-contained renderers** present each exercise type. Understanding these three seams is enough to be productive.

### 1. Content model — `src/content/`
Hierarchy **Unit → Section → Lesson → Exercise**. `types.ts` defines a **discriminated union** of 7 exercise types (`type` discriminant). `unit1.ts` holds the full Unit 1 curriculum; `index.ts` assembles `curriculum`, flattens lessons into an ordered list, and exposes `getLesson`, `getLessonContext` (prev/next), and `allLessonIds`.
- **To add lessons/exercises**: edit `unit1.ts` (or add a `unitN.ts` and register it in `index.ts`). No code changes needed for existing exercise types.

### 2. Logic engine — `src/lib/logic/` (pure, no React)
Parses propositional formulas from strings and powers auto-validation so exercise answers don't have to be hand-authored. Operators: `¬ ∼ ~` / `∧ &` / `∨ |` / `⇒ → ->` / `⇔ ↔ <->`; variables are single lowercase letters (canonical order `p q r s t`). Precedence ¬ > ∧ > ∨ > ⇒ (right-assoc) > ⇔.
- `truthTable`/`truthColumn` → drives `truth-table` exercises, `classify` → tautology/contradiction/contingency, `counterexample` → `findCounterexample`/`isCounterexample` for invalid-argument exercises. Quantifier exercises (Section B) are **not** engine-validated; they use authored `multiple-choice` answers.

### 3. Exercise renderers + player — `src/components/lesson/`
The player drives a **single "Comprobar" check per exercise**. The contract is in `types.ts`: each renderer is self-contained, manages its own selection state, and reports `{ correct } | null` (null = incomplete) via `onAnswer`. `LessonPlayer.tsx` holds index/hearts/results state, runs the check, shows feedback, loses a heart on wrong, and decides next/complete/failed. `ExerciseView.tsx` switches on `exercise.type` to the right renderer in `exercises/`. Timed exercises (e.g. `Classify`) call `requestCheck()` to force the check on timeout.
- **To add an exercise type**: (1) add a variant to the `Exercise` union in `content/types.ts`, (2) create a renderer in `components/lesson/exercises/` implementing `RenderProps`, (3) add a `case` in `ExerciseView.tsx`.

### Progress, gating & hydration — `src/stores/progress.ts`
Single **zustand + persist** store (localStorage key `ludema-progress`): hearts (timed regen), xp/level, daily streak, `completedLessons`. Because state is persisted and the app is statically prerendered, guard against SSR/hydration mismatch with the `useHydrated()` hook (`src/hooks/`) or the store's `hasHydrated` flag — read store values for display only after mount.
- **Unlock logic lives in the UI** (`components/map/LearningMap.tsx`), not the store: lessons are linear (a lesson unlocks when the previous one is in `completedLessons`); a section is "gold" when all its lessons are complete; Unit 2 is gated until Unit 1 is fully gold.

### Routing
`/` → client `LearningMap`. `/lesson/[lessonId]` → **server** page that exports `generateStaticParams` (from `allLessonIds`) and `await params`, then renders the client `LessonPlayer`. Keep `generateStaticParams` in the server page; never mark that file `"use client"`.

### Styling
Tailwind v4 (`@import "tailwindcss"` in `globals.css`, no config file). **No shadcn** — UI primitives are hand-rolled (`components/ui/Button.tsx`), icons from `lucide-react`, Nunito font. The Duolingo look uses custom utilities `.shadow-pop`/`.shadow-pop-sm` and `animate-pop-in`/`animate-shake`; per-section accent colors are centralized in `src/lib/accent.ts`.
