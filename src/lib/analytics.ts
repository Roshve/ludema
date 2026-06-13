/**
 * Wrapper de analítica sobre sendGAEvent de @next/third-parties/google.
 *
 * Centraliza los nombres de eventos y sus payloads tipados para evitar
 * strings mágicos dispersos. sendGAEvent es no-op seguro cuando GA no
 * está cargado (sin NEXT_PUBLIC_GA_ID en build), así que no hay guardas extra.
 */
import { sendGAEvent } from "@next/third-parties/google";

import type { Exercise } from "@/content/types";

// ── Eventos de lección ────────────────────────────────────────────────────────

export function trackLessonComplete({
  lessonId,
  xp,
  accuracy,
  heartsLeft,
}: {
  lessonId: string;
  xp: number;
  accuracy: number;
  heartsLeft: number;
}) {
  sendGAEvent("event", "lesson_complete", {
    lesson_id: lessonId,
    xp_earned: xp,
    accuracy_pct: accuracy,
    hearts_left: heartsLeft,
  });
}

export function trackLessonFailed({ lessonId }: { lessonId: string }) {
  sendGAEvent("event", "lesson_failed", { lesson_id: lessonId });
}

// ── Eventos de ejercicio ──────────────────────────────────────────────────────

export function trackExerciseAnswered({
  exerciseId,
  exerciseType,
  correct,
}: {
  exerciseId: string;
  exerciseType: Exercise["type"];
  correct: boolean;
}) {
  sendGAEvent("event", "exercise_answered", {
    exercise_id: exerciseId,
    exercise_type: exerciseType,
    correct,
  });
}

// ── Eventos de Pomodoro ───────────────────────────────────────────────────────

export function trackPomodoroComplete({
  focusSeconds,
}: {
  focusSeconds: number;
}) {
  sendGAEvent("event", "pomodoro_complete", { focus_seconds: focusSeconds });
}

// ── Eventos de tema ───────────────────────────────────────────────────────────

export function trackThemeChange({ theme }: { theme: string }) {
  sendGAEvent("event", "theme_change", { theme });
}
