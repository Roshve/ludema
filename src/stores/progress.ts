"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const MAX_HEARTS = 5;
// Un corazón se regenera cada 5 minutos.
const HEART_REGEN_MS = 5 * 60 * 1000;
// XP necesaria por nivel.
const XP_PER_LEVEL = 100;

function todayStr(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}
function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return todayStr(d);
}
// Racha diaria: se mantiene si ya jugó hoy, crece si jugó ayer, se reinicia si no.
function nextStreak(streak: number, lastPlayedDate: string | null): number {
  if (lastPlayedDate === todayStr()) return streak;
  if (lastPlayedDate === yesterdayStr()) return streak + 1;
  return 1;
}

export type CompletedLesson = { xp: number; completedAt: string };

type ProgressState = {
  hearts: number;
  /** Timestamp del último corazón perdido (para regeneración). */
  lastHeartLossAt: number | null;
  xp: number;
  streak: number;
  lastPlayedDate: string | null;
  completedLessons: Record<string, CompletedLesson>;
  /** Ids de ejercicios fallados pendientes de repaso. */
  missedExercises: string[];
  /** Segundos totales de estudio activo acumulados. */
  totalStudySeconds: number;
  /** Segundos de estudio activo por día (clave: "YYYY-MM-DD" UTC). */
  dailyStudy: Record<string, number>;
  hasHydrated: boolean;

  // Acciones
  setHydrated: () => void;
  syncHearts: () => void;
  loseHeart: () => void;
  refillHearts: () => void;
  completeLesson: (lessonId: string, xpEarned: number) => void;
  /** Registra el resultado de un ejercicio: acumula fallos y limpia aciertos. */
  recordExercise: (exerciseId: string, correct: boolean) => void;
  /** XP de sesiones de práctica: suma directa y mantiene viva la racha. */
  addPracticeXp: (xpEarned: number) => void;
  /** Suma segundos de estudio activo al total y al día de hoy. */
  addStudySeconds: (seconds: number) => void;
  reset: () => void;
};

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      hearts: MAX_HEARTS,
      lastHeartLossAt: null,
      xp: 0,
      streak: 0,
      lastPlayedDate: null,
      completedLessons: {},
      missedExercises: [],
      totalStudySeconds: 0,
      dailyStudy: {},
      hasHydrated: false,

      setHydrated: () => set({ hasHydrated: true }),

      // Regenera corazones según el tiempo transcurrido.
      syncHearts: () => {
        const { hearts, lastHeartLossAt } = get();
        if (hearts >= MAX_HEARTS || lastHeartLossAt == null) return;
        const elapsed = Date.now() - lastHeartLossAt;
        const regen = Math.floor(elapsed / HEART_REGEN_MS);
        if (regen <= 0) return;
        const newHearts = Math.min(MAX_HEARTS, hearts + regen);
        set({
          hearts: newHearts,
          lastHeartLossAt:
            newHearts >= MAX_HEARTS ? null : lastHeartLossAt + regen * HEART_REGEN_MS,
        });
      },

      loseHeart: () => {
        const { hearts, lastHeartLossAt } = get();
        const next = Math.max(0, hearts - 1);
        set({
          hearts: next,
          // Arranca el reloj de regeneración al perder el primer corazón.
          lastHeartLossAt:
            hearts === MAX_HEARTS ? Date.now() : (lastHeartLossAt ?? Date.now()),
        });
      },

      refillHearts: () => set({ hearts: MAX_HEARTS, lastHeartLossAt: null }),

      completeLesson: (lessonId, xpEarned) => {
        const state = get();
        const today = todayStr();
        const streak = nextStreak(state.streak, state.lastPlayedDate);

        const prev = state.completedLessons[lessonId];
        const bestXp = Math.max(prev?.xp ?? 0, xpEarned);
        // Solo se suma XP nueva por encima del récord previo de la lección.
        const xpDelta = xpEarned - (prev?.xp ?? 0);

        set({
          streak,
          lastPlayedDate: today,
          xp: state.xp + Math.max(0, xpDelta),
          completedLessons: {
            ...state.completedLessons,
            [lessonId]: { xp: bestXp, completedAt: today },
          },
        });
      },

      recordExercise: (exerciseId, correct) => {
        const { missedExercises } = get();
        const pending = missedExercises.includes(exerciseId);
        if (!correct && !pending) {
          set({ missedExercises: [...missedExercises, exerciseId] });
        } else if (correct && pending) {
          set({
            missedExercises: missedExercises.filter((id) => id !== exerciseId),
          });
        }
      },

      addPracticeXp: (xpEarned) => {
        const state = get();
        set({
          xp: state.xp + Math.max(0, xpEarned),
          streak: nextStreak(state.streak, state.lastPlayedDate),
          lastPlayedDate: todayStr(),
        });
      },

      addStudySeconds: (seconds) => {
        if (seconds <= 0) return;
        const state = get();
        const today = todayStr();
        set({
          totalStudySeconds: state.totalStudySeconds + seconds,
          dailyStudy: {
            ...state.dailyStudy,
            [today]: (state.dailyStudy[today] ?? 0) + seconds,
          },
        });
      },

      reset: () =>
        set({
          hearts: MAX_HEARTS,
          lastHeartLossAt: null,
          xp: 0,
          streak: 0,
          lastPlayedDate: null,
          completedLessons: {},
          missedExercises: [],
          totalStudySeconds: 0,
          dailyStudy: {},
        }),
    }),
    {
      name: "ludema-progress",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? window.localStorage
          : // Storage de respaldo durante el prerender estático.
            {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            },
      ),
      partialize: ({ hasHydrated, ...rest }) => rest,
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    },
  ),
);

// ── Selectores / utilidades derivadas ───────────────────────────────────────

export function levelFromXp(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}
export function xpIntoLevel(xp: number): number {
  return xp % XP_PER_LEVEL;
}
export const XP_LEVEL_SIZE = XP_PER_LEVEL;

export function isLessonCompleted(
  completed: Record<string, CompletedLesson>,
  lessonId: string,
): boolean {
  return Boolean(completed[lessonId]);
}

export function lessonsCompletedCount(
  completed: Record<string, CompletedLesson>,
): number {
  return Object.keys(completed).length;
}

/** Formatea segundos como "3h 25m", "45m" o "< 1m". */
export function formatStudyTime(seconds: number): string {
  if (seconds < 60) return "< 1m";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}
