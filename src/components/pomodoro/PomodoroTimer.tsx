"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { useProgress, formatStudyTime } from "@/stores/progress";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { sfxComplete, sfxClick } from "@/lib/sfx";
import { trackPomodoroComplete } from "@/lib/analytics";

// ── Constantes de duración ────────────────────────────────────────────────────
const FOCUS_S = 25 * 60;
const SHORT_BREAK_S = 5 * 60;
const LONG_BREAK_S = 15 * 60;
const CYCLES_BEFORE_LONG = 4;

type Phase = "focus" | "short" | "long";

const PHASE_LABEL: Record<Phase, string> = {
  focus: "Enfoque",
  short: "Descanso corto",
  long: "Descanso largo",
};

const PHASE_DURATION: Record<Phase, number> = {
  focus: FOCUS_S,
  short: SHORT_BREAK_S,
  long: LONG_BREAK_S,
};

// Colores por fase.
const PHASE_RING: Record<Phase, string> = {
  focus: "stroke-blue-500",
  short: "stroke-emerald-500",
  long: "stroke-violet-500",
};
const PHASE_BG: Record<Phase, string> = {
  focus: "text-blue-600 dark:text-blue-400",
  short: "text-emerald-600 dark:text-emerald-400",
  long: "text-violet-600 dark:text-violet-400",
};

function formatMmSs(seconds: number): string {
  const s = Math.max(0, seconds);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

// Anillo SVG de progreso.
function Ring({
  progress,
  phase,
}: {
  progress: number; // 0-1 (porcentaje consumido)
  phase: Phase;
}) {
  const R = 88;
  const C = 2 * Math.PI * R;
  return (
    <svg
      viewBox="0 0 200 200"
      className="absolute inset-0 size-full -rotate-90"
      aria-hidden
    >
      {/* Pista */}
      <circle
        cx="100"
        cy="100"
        r={R}
        fill="none"
        strokeWidth="8"
        className="stroke-slate-200 dark:stroke-slate-700"
      />
      {/* Progreso */}
      <motion.circle
        cx="100"
        cy="100"
        r={R}
        fill="none"
        strokeWidth="8"
        strokeLinecap="round"
        className={PHASE_RING[phase]}
        initial={false}
        animate={{ strokeDashoffset: C * (1 - progress) }}
        transition={{ type: "tween", duration: 0.25 }}
        style={{ strokeDasharray: C }}
      />
    </svg>
  );
}

export function PomodoroTimer() {
  const completePomodoro = useProgress((s) => s.completePomodoro);
  const pomodorosCompleted = useProgress((s) => s.pomodorosCompleted);
  const totalFocusSeconds = useProgress((s) => s.totalFocusSeconds);

  const [phase, setPhase] = useState<Phase>("focus");
  const [running, setRunning] = useState(false);
  const [remaining, setRemaining] = useState(FOCUS_S);
  // Cuántos ciclos de enfoque se han completado en esta sesión (para alternar descansos).
  const focusDoneRef = useRef(0);
  // Timestamp objetivo: Date.now() + remaining*1000 cuando el timer corre.
  const endAtRef = useRef<number | null>(null);
  // Duración de la fase actual (para calcular el progreso del anillo).
  const totalRef = useRef(FOCUS_S);

  // ── Función que avanza a la siguiente fase ────────────────────────────────
  const advancePhase = useCallback(
    (from: Phase) => {
      if (from === "focus") {
        sfxComplete();
        completePomodoro(FOCUS_S);
        trackPomodoroComplete({ focusSeconds: FOCUS_S });
        focusDoneRef.current += 1;
        const next: Phase =
          focusDoneRef.current % CYCLES_BEFORE_LONG === 0 ? "long" : "short";
        setPhase(next);
        setRemaining(PHASE_DURATION[next]);
        totalRef.current = PHASE_DURATION[next];
      } else {
        // Descanso terminado → volver a enfoque.
        sfxClick();
        setPhase("focus");
        setRemaining(FOCUS_S);
        totalRef.current = FOCUS_S;
      }
      // Auto-pausa: el usuario pulsa Iniciar cuando esté listo.
      setRunning(false);
      endAtRef.current = null;
    },
    [completePomodoro],
  );

  // ── Ticker robusto ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      if (endAtRef.current === null) return;
      const left = Math.ceil((endAtRef.current - Date.now()) / 1000);
      if (left <= 0) {
        clearInterval(id);
        setRemaining(0);
        // Leer la fase actual desde un ref para evitar closure obsoleto.
        setPhase((current) => {
          // Disparar el avance en el siguiente microtask para no mutar estado
          // dentro del render.
          setTimeout(() => advancePhase(current), 0);
          return current;
        });
      } else {
        setRemaining(left);
      }
    }, 250);

    return () => clearInterval(id);
  }, [running, advancePhase]);

  // ── Controles ─────────────────────────────────────────────────────────────
  function toggle() {
    if (running) {
      // Pausar: guardar remaining actual y anular endAt.
      endAtRef.current = null;
      setRunning(false);
    } else {
      // Iniciar/reanudar: calcular nuevo endAt desde remaining.
      endAtRef.current = Date.now() + remaining * 1000;
      setRunning(true);
    }
  }

  function restart() {
    endAtRef.current = null;
    setRunning(false);
    setRemaining(PHASE_DURATION[phase]);
    totalRef.current = PHASE_DURATION[phase];
  }

  function skip() {
    endAtRef.current = null;
    setRunning(false);
    advancePhase(phase);
  }

  const progress = 1 - remaining / totalRef.current;

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col items-center px-4 py-8">
        {/* Cabecera */}
        <header className="mb-8 flex w-full items-center gap-3">
          <Link
            href="/logica"
            aria-label="Volver al mapa"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <ArrowLeft className="size-6" strokeWidth={2.5} />
          </Link>
          <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100">
            Pomodoro
          </h1>
        </header>

        {/* Etiqueta de fase */}
        <motion.p
          key={phase}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "mb-6 text-sm font-extrabold uppercase tracking-widest",
            PHASE_BG[phase],
          )}
        >
          {PHASE_LABEL[phase]}
        </motion.p>

        {/* Anillo + contador */}
        <div className="relative mb-10 flex size-56 items-center justify-center">
          <Ring progress={progress} phase={phase} />
          <motion.span
            key={`${phase}-${running}`}
            className="relative text-5xl font-black tabular-nums text-slate-800 dark:text-slate-100"
          >
            {formatMmSs(remaining)}
          </motion.span>
        </div>

        {/* Controles */}
        <div className="flex w-full items-center gap-3">
          <button
            onClick={restart}
            aria-label="Reiniciar"
            className="grid size-12 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            <RotateCcw className="size-5" />
          </button>

          <Button className="flex-1 flex items-center justify-center gap-2" onClick={toggle}>
            {running ? (
              <>
                <Pause className="size-5" />
                Pausar
              </>
            ) : (
              <>
                <Play className="size-5" />
                {remaining === PHASE_DURATION[phase] ? "Iniciar" : "Reanudar"}
              </>
            )}
          </Button>

          <button
            onClick={skip}
            aria-label="Saltar"
            className="grid size-12 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            <SkipForward className="size-5" />
          </button>
        </div>

        {/* Indicador de ciclo */}
        <div className="mt-8 flex gap-2">
          {Array.from({ length: CYCLES_BEFORE_LONG }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "size-2.5 rounded-full transition",
                i < focusDoneRef.current % CYCLES_BEFORE_LONG ||
                  (phase === "focus" && running &&
                    i < (focusDoneRef.current % CYCLES_BEFORE_LONG) + 1)
                  ? "bg-blue-500"
                  : "bg-slate-200 dark:bg-slate-700",
              )}
            />
          ))}
        </div>

        {/* Resumen de sesión */}
        <div className="mt-10 w-full rounded-2xl bg-white px-5 py-4 shadow-pop-sm dark:bg-slate-800">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">
            Total acumulado
          </p>
          <div className="flex justify-around">
            <div className="text-center">
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
                {pomodorosCompleted}
              </p>
              <p className="text-xs font-bold text-slate-500">Pomodoros</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-violet-600 dark:text-violet-400">
                {formatStudyTime(totalFocusSeconds)}
              </p>
              <p className="text-xs font-bold text-slate-500">Enfoque</p>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
