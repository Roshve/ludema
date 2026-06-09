"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Timer } from "lucide-react";
import type { ClassifyExercise } from "@/content/types";
import type { RenderProps } from "../types";
import {
  classify,
  CLASSIFICATION_LABEL,
  type Classification,
} from "@/lib/logic/classify";
import { cn } from "@/lib/utils";

const ORDER: Classification[] = ["tautologia", "contradiccion", "contingencia"];

export function Classify({
  exercise,
  checked,
  onAnswer,
  requestCheck,
}: RenderProps<ClassifyExercise>) {
  const answer = useMemo(
    () => classify(exercise.formula),
    [exercise.formula],
  );
  const [choice, setChoice] = useState<Classification | null>(null);
  const [timeLeft, setTimeLeft] = useState(exercise.timeLimit ?? 0);

  useEffect(() => {
    onAnswer(choice === null ? null : { correct: choice === answer });
  }, [choice, answer, onAnswer]);

  // Temporizador (solo si la fórmula define timeLimit).
  const reqRef = useRef(requestCheck);
  reqRef.current = requestCheck;
  useEffect(() => {
    if (!exercise.timeLimit || checked) return;
    if (timeLeft <= 0) {
      reqRef.current?.();
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, checked, exercise.timeLimit]);

  return (
    <div className="flex flex-col gap-4">
      {exercise.timeLimit && !checked && (
        <div
          className={cn(
            "mx-auto flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-black",
            timeLeft <= 5
              ? "bg-rose-100 text-rose-600"
              : "bg-slate-100 text-slate-500",
          )}
        >
          <Timer className="size-4" /> {timeLeft}s
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        {ORDER.map((c) => {
          const isSel = choice === c;
          let tone =
            "border-slate-200 bg-white hover:border-slate-300 text-slate-700";
          if (checked) {
            if (c === answer)
              tone = "border-emerald-500 bg-emerald-50 text-emerald-800";
            else if (isSel) tone = "border-rose-500 bg-rose-50 text-rose-800";
            else tone = "border-slate-200 bg-white text-slate-400";
          } else if (isSel) {
            tone = "border-sky-500 bg-sky-50 ring-2 ring-sky-200 text-slate-800";
          }
          return (
            <button
              key={c}
              type="button"
              onClick={() => !checked && setChoice(c)}
              disabled={checked}
              className={cn(
                "rounded-2xl border-2 px-4 py-4 text-center font-extrabold transition",
                tone,
              )}
            >
              {CLASSIFICATION_LABEL[c]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
