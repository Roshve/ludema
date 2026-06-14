---
id: renderers-y-player
title: Renderers y Player
---

# Renderers y Player

El sistema de ejercicios vive en `src/components/lesson/`.

## Contrato de renderer

Cada renderer es **autocontenido**: maneja su propio estado de selección y reporta el
resultado al player via la prop `onAnswer`:

```ts
type RenderProps = {
  exercise: Exercise;
  onAnswer: (result: { correct: boolean } | null) => void;
  // null = respuesta incompleta (el botón "Comprobar" queda deshabilitado)
};
```

`{ correct: true }` → acierto, `{ correct: false }` → error.

## Archivos clave

| Archivo | Rol |
|---------|-----|
| `LessonPlayer.tsx` | Orquesta índice, corazones, resultados, feedback y navegación |
| `ExerciseView.tsx` | Switch en `exercise.type` → renderer correcto |
| `exercises/ConceptCard.tsx` | Tarjeta de teoría (sin `onAnswer`, solo «Continuar») |
| `exercises/MultipleChoice.tsx` | Opción única |
| `exercises/TruthTable.tsx` | Tabla interactiva validada por motor |
| `exercises/Classify.tsx` | Tautología/contradicción/contingencia, con timer opcional |
| `exercises/BuildExpression.tsx` | Bloques drag-and-drop |
| `exercises/SimplifySteps.tsx` | Pasos de simplificación con leyes |
| `exercises/CounterExample.tsx` | Asignación de valores |
| `exercises/DeductionSteps.tsx` | Derivación formal línea a línea |
| `CheatSheet.tsx` | Modal con equivalencias + reglas de inferencia |

## Player — flujo de una lección

1. El usuario responde → `onAnswer` recibe resultado.
2. El jugador corre la comprobación ("Comprobar").
3. Si correcto: avanza al siguiente ejercicio (o cierra la lección).
4. Si incorrecto: pierde un corazón y el ejercicio **se re-encola** al final (cola, no índice fijo).
5. La pantalla final reporta precisión **al primer intento** y XP ganada.

## Para agregar un tipo de ejercicio

1. Agregar una variante a la unión `Exercise` en `src/content/types.ts`.
2. Crear un renderer en `src/components/lesson/exercises/` implementando `RenderProps`.
3. Agregar un `case` en `ExerciseView.tsx`.

## Ejercicios cronometrados

Los renderers como `Classify` pueden llamar `requestCheck()` al vencer el timer para
forzar la comprobación automáticamente, sin esperar al clic del usuario.
