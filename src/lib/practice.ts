import type { Exercise, Lesson } from "@/content/types";
import { allLessons } from "@/content";

export const PRACTICE_SIZE = 10;
// La práctica otorga la mitad de XP que una lección (10 por ejercicio),
// y solo por los aciertos.
export const PRACTICE_XP_PER_CORRECT = 5;

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Arma una sesión de repaso con ejercicios de lecciones ya completadas,
// priorizando los fallados pendientes. Devuelve null si no hay nada que
// practicar todavía.
export function buildPracticeSession(
  completedLessons: Record<string, unknown>,
  missedExerciseIds: string[],
): Lesson | null {
  const pool: Exercise[] = [];
  for (const ctx of allLessons) {
    if (!completedLessons[ctx.lesson.id]) continue;
    // Las tarjetas de concepto no se repasan: solo ejercicios evaluables.
    pool.push(...ctx.lesson.exercises.filter((e) => e.type !== "concept"));
  }
  if (pool.length === 0) return null;

  const missed = new Set(missedExerciseIds);
  const prioritized = shuffle(pool.filter((e) => missed.has(e.id)));
  const rest = shuffle(pool.filter((e) => !missed.has(e.id)));
  const exercises = shuffle(
    [...prioritized, ...rest].slice(0, PRACTICE_SIZE),
  );

  return {
    id: "practice",
    title: "Práctica",
    subtitle: "Repaso de lo aprendido",
    exercises,
  };
}
