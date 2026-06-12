"use client";

import { useState } from "react";
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { buildPracticeSession } from "@/lib/practice";
import { useProgress } from "@/stores/progress";
import { useHydrated } from "@/hooks/useHydrated";
import { Button } from "@/components/ui/Button";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function PracticeSession() {
  const hydrated = useHydrated();
  // El contenido depende del progreso en localStorage: se monta tras hidratar.
  if (!hydrated) return null;
  return <PracticeInner />;
}

function PracticeInner() {
  // Solo se monta en el cliente: lee el store persistido una única vez para
  // que la sesión no cambie mientras se juega (fallar un ejercicio modifica
  // missedExercises y no debe rearmar la lección).
  const [session] = useState(() => {
    const { completedLessons, missedExercises } = useProgress.getState();
    return buildPracticeSession(completedLessons, missedExercises);
  });

  if (session === null) {
    return (
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
        <Dumbbell className="size-16 text-slate-300 dark:text-slate-600" />
        <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100">
          Nada que repasar todavía
        </h1>
        <p className="font-bold text-slate-500 dark:text-slate-400">
          Completa tu primera lección y aquí podrás practicar lo aprendido,
          empezando por lo que hayas fallado.
        </p>
        <Link href="/logica" className="mt-2 w-full">
          <Button className="w-full">Ir al mapa</Button>
        </Link>
      </div>
    );
  }

  return <LessonPlayer lesson={session} practice />;
}
