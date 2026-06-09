"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { X, Heart, Check, Trophy, HeartCrack } from "lucide-react";
import type { Lesson } from "@/content/types";
import { getLessonContext, lessonXp } from "@/content";
import { useProgress } from "@/stores/progress";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ExerciseView } from "./ExerciseView";
import type { AnswerState } from "./types";

type Phase = "playing" | "complete" | "failed";

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const total = lesson.exercises.length;
  const hearts = useProgress((s) => s.hearts);
  const loseHeart = useProgress((s) => s.loseHeart);
  const completeLesson = useProgress((s) => s.completeLesson);
  const refillHearts = useProgress((s) => s.refillHearts);

  const [index, setIndex] = useState(0);
  const [pending, setPending] = useState<AnswerState>(null);
  const [checked, setChecked] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("playing");

  const exercise = lesson.exercises[index];
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
    if (correct) setCorrectCount((c) => c + 1);
    else loseHeart();
  }, [pending, loseHeart]);

  function next() {
    // ¿Se quedó sin corazones?
    if (useProgress.getState().hearts <= 0) {
      setPhase("failed");
      return;
    }
    if (index + 1 >= total) {
      const xp = lessonXp(lesson);
      completeLesson(lesson.id, xp);
      setPhase("complete");
      return;
    }
    setIndex((i) => i + 1);
    setPending(null);
    setChecked(false);
  }

  function restart() {
    refillHearts();
    setIndex(0);
    setPending(null);
    setChecked(false);
    setCorrectCount(0);
    setPhase("playing");
  }

  // ── Pantalla: sin corazones ────────────────────────────────────────────────
  if (phase === "failed" || (phase === "playing" && hearts <= 0)) {
    return (
      <EndScreen
        icon={<HeartCrack className="size-16 text-rose-500" />}
        title="¡Te quedaste sin corazones!"
        subtitle="Espera a que se regeneren o recarga para seguir practicando."
        primary={
          <Button onClick={restart}>Recargar y reintentar</Button>
        }
        secondary={
          <Link href="/">
            <Button variant="neutral">Volver al mapa</Button>
          </Link>
        }
      />
    );
  }

  // ── Pantalla: lección completada ───────────────────────────────────────────
  if (phase === "complete") {
    const xp = lessonXp(lesson);
    const accuracy = Math.round((correctCount / total) * 100);
    return (
      <EndScreen
        icon={<Trophy className="size-16 text-amber-500" />}
        title="¡Lección completada!"
        subtitle={`Precisión ${accuracy}% · +${xp} XP`}
        primary={
          ctx?.nextLessonId ? (
            <Link href={`/lesson/${ctx.nextLessonId}`}>
              <Button>Siguiente lección</Button>
            </Link>
          ) : (
            <Link href="/">
              <Button>Volver al mapa</Button>
            </Link>
          )
        }
        secondary={
          <Link href="/">
            <Button variant="neutral">Ir al mapa</Button>
          </Link>
        }
      />
    );
  }

  // ── Pantalla: jugando ──────────────────────────────────────────────────────
  const progress = (index / total) * 100;

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4">
      {/* Cabecera: cerrar + progreso + corazones */}
      <header className="flex items-center gap-3 py-4">
        <Link
          href="/"
          aria-label="Salir de la lección"
          className="text-slate-400 hover:text-slate-600"
        >
          <X className="size-7" strokeWidth={3} />
        </Link>
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center gap-1 font-black text-rose-500">
          <Heart className="size-5 fill-rose-500" />
          {hearts}
        </div>
      </header>

      {/* Cuerpo del ejercicio */}
      <main className="flex flex-1 flex-col py-4">
        <h2 className="mb-6 whitespace-pre-line text-xl font-black text-slate-800 sm:text-2xl">
          {exercise.prompt}
        </h2>
        {/* key por id: reinicia el estado interno del renderer en cada ejercicio */}
        <ExerciseView
          key={exercise.id}
          exercise={exercise}
          checked={checked}
          onAnswer={onAnswer}
          requestCheck={check}
        />
      </main>

      {/* Pie: feedback + acción */}
      <footer
        className={cn(
          "sticky bottom-0 -mx-4 mt-4 border-t px-4 py-4",
          checked
            ? lastCorrect
              ? "border-emerald-200 bg-emerald-50"
              : "border-rose-200 bg-rose-50"
            : "border-slate-200 bg-background/90 backdrop-blur",
        )}
      >
        {checked && (
          <div
            className={cn(
              "mb-3 flex items-start gap-2 font-bold",
              lastCorrect ? "text-emerald-700" : "text-rose-700",
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
                <span className="block font-semibold text-slate-600">
                  {exercise.explanation}
                </span>
              )}
            </span>
          </div>
        )}

        {checked ? (
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
  );
}

function EndScreen({
  icon,
  title,
  subtitle,
  primary,
  secondary,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  primary: React.ReactNode;
  secondary: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="animate-pop-in">{icon}</div>
      <h1 className="text-2xl font-black text-slate-800">{title}</h1>
      <p className="font-bold text-slate-500">{subtitle}</p>
      <div className="mt-2 flex w-full flex-col gap-3">
        {primary}
        {secondary}
      </div>
    </div>
  );
}
