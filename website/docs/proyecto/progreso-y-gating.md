---
id: progreso-y-gating
title: Progreso y gating
---

# Progreso y gating

## Store de progreso

`src/stores/progress.ts` — store único de **Zustand + persist** (`localStorage` key `ludema-progress`).

### Estado persistido

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `completedLessons` | `Set<string>` | IDs de lecciones completadas |
| `hearts` | `number` | Corazones restantes (se regeneran con el tiempo) |
| `xp` | `number` | XP total acumulada |
| `level` | `number` | Nivel actual |
| `dailyStreak` | `number` | Días consecutivos de actividad |
| `missedExercises` | array | Ejercicios fallados para el modo práctica |

### Hydration

La app es un static export con prerendering en servidor. Guardarse de mismatches de
hidratación: **leer valores del store para mostrar solo después de mount**.

```ts
// Opción 1: hook
import { useHydrated } from "@/hooks/useHydrated";
const hydrated = useHydrated();
if (!hydrated) return null;

// Opción 2: flag del store
const hasHydrated = useProgressStore(s => s.hasHydrated);
```

## Gating y unlock

La lógica de desbloqueo **vive en la UI**, no en el store: `src/components/map/LearningMap.tsx`.

- Las lecciones son **lineales**: una lección se desbloquea cuando la anterior está en `completedLessons`.
- Una sección es **"gold"** cuando todas sus lecciones están completadas.
- **Unidad 2** (Lógica) está bloqueada hasta que la Unidad 1 esté completamente en gold.

:::note Escalabilidad multi-materia
El modelo de gating lineal describe la materia de **Lógica** tal como está implementada hoy.
Al incorporar nuevas materias, este modelo puede adaptarse (ej. materias paralelas con
progreso independiente) modificando `LearningMap.tsx` sin tocar el store.
:::

## Modo Práctica

`src/lib/practice.ts` — `buildPracticeSession` arma una sesión de ~10 ejercicios
de lecciones completadas, priorizando los registrados en `missedExercises`.

`addPracticeXp` suma XP reducida (5 por acierto) y mantiene viva la racha diaria.
