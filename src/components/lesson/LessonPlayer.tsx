"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, Heart, Check, HeartCrack } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import type { Lesson } from "@/content/types";
import { getLessonContext, lessonXp } from "@/content";
import { useProgress } from "@/stores/progress";
import { Button } from "@/components/ui/Button";
import { Lottie } from "@/components/ui/Lottie";
import { fireConfetti } from "@/lib/confetti";
import { PRACTICE_XP_PER_CORRECT } from "@/lib/practice";
import { sfxCorrect, sfxWrong, sfxComplete, sfxFail } from "@/lib/sfx";
import { cn } from "@/lib/utils";
import { ExerciseView } from "./ExerciseView";
import { CheatSheet } from "./CheatSheet";
import type { AnswerState } from "./types";
import trophyAnim from "@/assets/lottie/trophy.json";

type Phase = "playing" | "complete" | "failed";

export function LessonPlayer({
  lesson,
  practice = false,
}: {
  lesson: Lesson;
  /** Sesión de práctica: no marca lecciones completadas y da XP reducida. */
  practice?: boolean;
}) {
  // Las tarjetas de concepto no cuentan para la precisión ni la XP.
  const gradedTotal = Math.max(
    1,
    lesson.exercises.filter((e) => e.type !== "concept").length,
  );
  const hearts = useProgress((s) => s.hearts);
  const loseHeart = useProgress((s) => s.loseHeart);
  const completeLesson = useProgress((s) => s.completeLesson);
  const refillHearts = useProgress((s) => s.refillHearts);
  const recordExercise = useProgress((s) => s.recordExercise);
  const addPracticeXp = useProgress((s) => s.addPracticeXp);

  // Cola de ejercicios: los fallados se re-añaden al final hasta acertarlos.
  const [queue, setQueue] = useState(() => lesson.exercises);
  const [index, setIndex] = useState(0);
  const [pending, setPending] = useState<AnswerState>(null);
  const [checked, setChecked] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  // Aciertos al primer intento (los recuperados en re-encolado no cuentan).
  const [correctCount, setCorrectCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("playing");
  const failedIdsRef = useRef(new Set<string>());

  const exercise = queue[index];
  const isConcept = exercise.type === "concept";
  const ctx = getLessonContext(lesson.id);

  // Ref para que onAnswer (memoizado) lea el valor actual de `checked`.
  const checkedRef = useRef(checked);
  checkedRef.current = checked;
  const onAnswer = useCallback((a: AnswerState) => {
    // Ignora reportes una vez comprobado.
    setPending((prev) => (checkedRef.current ? prev : a));
  }, []);

  const check = useCallback(() => {
    if (checkedRef.current) return;
    const correct = pending?.correct ?? false;
    setChecked(true);
    setLastCorrect(correct);
    recordExercise(exercise.id, correct);
    if (correct) {
      sfxCorrect();
      if (!failedIdsRef.current.has(exercise.id)) {
        setCorrectCount((c) => c + 1);
      }
    } else {
      sfxWrong();
      loseHeart();
      failedIdsRef.current.add(exercise.id);
      // El ejercicio fallado vuelve al final de la cola hasta acertarlo.
      setQueue((q) => [...q, exercise]);
    }
  }, [pending, loseHeart, recordExercise, exercise]);

  function next() {
    // ¿Se quedó sin corazones?
    if (useProgress.getState().hearts <= 0) {
      setPhase("failed");
      return;
    }
    if (index + 1 >= queue.length) {
      if (practice) {
        addPracticeXp(correctCount * PRACTICE_XP_PER_CORRECT);
      } else {
        completeLesson(lesson.id, lessonXp(lesson));
      }
      setPhase("complete");
      return;
    }
    setIndex((i) => i + 1);
    setPending(null);
    setChecked(false);
  }

  function restartSession() {
    failedIdsRef.current.clear();
    setQueue(lesson.exercises);
    setIndex(0);
    setPending(null);
    setChecked(false);
    setCorrectCount(0);
    setPhase("playing");
  }

  function restart() {
    refillHearts();
    restartSession();
  }

  // ── Pantalla: sin corazones ────────────────────────────────────────────────
  if (phase === "failed" || (phase === "playing" && hearts <= 0)) {
    return (
      <EndScreen
        icon={<HeartCrack className="size-16 text-rose-500" />}
        celebrate={false}
        title="¡Te quedaste sin corazones!"
        subtitle="Espera a que se regeneren o recarga para seguir practicando."
        primary={
          <Button onClick={restart}>Recargar y reintentar</Button>
        }
        secondary={
          <Link href="/logica">
            <Button variant="neutral">Volver al mapa</Button>
          </Link>
        }
      />
    );
  }

  // ── Pantalla: lección completada ───────────────────────────────────────────
  if (phase === "complete") {
    const xp = practice
      ? correctCount * PRACTICE_XP_PER_CORRECT
      : lessonXp(lesson);
    const accuracy = Math.round((correctCount / gradedTotal) * 100);
    return (
      <EndScreen
        icon={
          <Lottie animationData={trophyAnim} loop={false} className="size-44" />
        }
        celebrate
        title={practice ? "¡Práctica completada!" : "¡Lección completada!"}
        subtitle={`Precisión ${accuracy}% · +${xp} XP`}
        primary={
          !practice && ctx?.nextLessonId ? (
            <Link href={`/lesson/${ctx.nextLessonId}`}>
              <Button>Siguiente lección</Button>
            </Link>
          ) : (
            <Link href="/logica">
              <Button>Volver al mapa</Button>
            </Link>
          )
        }
        secondary={
          practice ? (
            <Button variant="neutral" onClick={restartSession}>
              Repetir práctica
            </Button>
          ) : (
            <Link href="/logica">
              <Button variant="neutral">Ir al mapa</Button>
            </Link>
          )
        }
      />
    );
  }

  // ── Pantalla: jugando ──────────────────────────────────────────────────────
  const progress = (index / queue.length) * 100;

  return (
    <MotionConfig reducedMotion="user">
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4">
      {/* Cabecera: cerrar + progreso + corazones */}
      <header className="flex items-center gap-3 py-4">
        <Link
          href="/logica"
          aria-label="Salir de la lección"
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        >
          <X className="size-7" strokeWidth={3} />
        </Link>
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <motion.div
            className="h-full rounded-full bg-blue-500"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 140, damping: 22 }}
          />
        </div>
        <CheatSheet />
        <div className="flex items-center gap-1 font-black text-rose-500">
          <Heart className="size-5 fill-rose-500" />
          <motion.span
            key={hearts}
            initial={{ scale: 1.6 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
          >
            {hearts}
          </motion.span>
        </div>
      </header>

      {/* Cuerpo del ejercicio: entra desde la derecha, sale hacia la izquierda */}
      <main className="flex flex-1 flex-col overflow-x-clip py-4">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            // index en la key: el mismo ejercicio re-encolado debe remontarse.
            key={`${exercise.id}#${index}`}
            initial={{ x: 56, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -56, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 32 }}
            className="flex flex-1 flex-col"
          >
            <h2 className="mb-6 whitespace-pre-line text-xl font-black text-slate-800 sm:text-2xl dark:text-slate-100">
              {exercise.prompt}
            </h2>
            {/* el key del contenedor reinicia el estado del renderer en cada ejercicio */}
            <ExerciseView
              exercise={exercise}
              checked={checked}
              onAnswer={onAnswer}
              requestCheck={check}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Pie: feedback + acción */}
      <footer
        className={cn(
          "sticky bottom-0 -mx-4 mt-4 border-t px-4 py-4",
          checked
            ? lastCorrect
              ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950"
              : "border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950"
            : "border-slate-200 bg-background/90 backdrop-blur dark:border-slate-700",
        )}
      >
        {checked && (
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              x: lastCorrect ? 0 : [0, -6, 6, -6, 6, 0],
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 28,
              x: { duration: 0.35, ease: "easeInOut" },
            }}
            className={cn(
              "mb-3 flex items-start gap-2 font-bold",
              lastCorrect
                ? "text-emerald-700 dark:text-emerald-300"
                : "text-rose-700 dark:text-rose-300",
            )}
          >
            <span
              className={cn(
                "grid size-7 shrink-0 place-items-center rounded-full text-white",
                lastCorrect ? "bg-emerald-500" : "bg-rose-500",
              )}
            >
              {lastCorrect ? (
                <Check className="size-4" strokeWidth={4} />
              ) : (
                <X className="size-4" strokeWidth={4} />
              )}
            </span>
            <span>
              {lastCorrect ? "¡Correcto!" : "Incorrecto."}
              {exercise.explanation && (
                <span className="block font-semibold text-slate-600 dark:text-slate-300">
                  {exercise.explanation}
                </span>
              )}
            </span>
          </motion.div>
        )}

        {isConcept ? (
          // Las tarjetas de concepto no se comprueban: solo se continúa.
          <Button className="w-full" onClick={next}>
            Continuar
          </Button>
        ) : checked ? (
          <Button
            variant={lastCorrect ? "primary" : "danger"}
            className="w-full"
            onClick={next}
          >
            Continuar
          </Button>
        ) : (
          <Button
            className="w-full"
            disabled={pending === null}
            onClick={check}
          >
            Comprobar
          </Button>
        )}
      </footer>
    </div>
    </MotionConfig>
  );
}

const endItem = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

function EndScreen({
  icon,
  celebrate,
  title,
  subtitle,
  primary,
  secondary,
}: {
  icon: React.ReactNode;
  celebrate: boolean;
  title: string;
  subtitle: string;
  primary: React.ReactNode;
  secondary: React.ReactNode;
}) {
  useEffect(() => {
    if (celebrate) {
      fireConfetti();
      sfxComplete();
    } else {
      sfxFail();
    }
  }, [celebrate]);

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center gap-4 px-6 text-center"
      >
        <motion.div variants={endItem}>{icon}</motion.div>
        <motion.h1
          variants={endItem}
          className="text-2xl font-black text-slate-800 dark:text-slate-100"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={endItem}
          className="font-bold text-slate-500 dark:text-slate-400"
        >
          {subtitle}
        </motion.p>
        <motion.div
          variants={endItem}
          className="mt-2 flex w-full flex-col gap-3"
        >
          {primary}
          {secondary}
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}
