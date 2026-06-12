"use client";

import { Lightbulb } from "lucide-react";
import type { ConceptExercise } from "@/content/types";
import type { RenderProps } from "../types";

// Tarjeta de teoría sin riesgo: solo se lee y se continúa. No reporta
// respuesta; el reproductor muestra «Continuar» directamente.
export function ConceptCard({ exercise }: RenderProps<ConceptExercise>) {
  return (
    <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/40">
      <Lightbulb className="mb-3 size-8 fill-amber-300 text-amber-500" />
      <div className="flex flex-col gap-3">
        {exercise.body.map((paragraph, i) => (
          <p
            key={i}
            className="font-semibold leading-relaxed text-amber-950 dark:text-amber-100"
          >
            {paragraph}
          </p>
        ))}
        {exercise.example && (
          <p className="rounded-2xl bg-white px-4 py-3 text-center font-black text-slate-800 shadow-pop-sm dark:bg-slate-800 dark:text-slate-100">
            {exercise.example}
          </p>
        )}
      </div>
    </div>
  );
}
