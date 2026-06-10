"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import type { MultipleChoiceExercise } from "@/content/types";
import type { RenderProps } from "../types";
import { cn } from "@/lib/utils";

export function MultipleChoice({
  exercise,
  checked,
  onAnswer,
}: RenderProps<MultipleChoiceExercise>) {
  const [choice, setChoice] = useState<number | null>(null);

  useEffect(() => {
    onAnswer(choice === null ? null : { correct: choice === exercise.correctIndex });
  }, [choice, exercise.correctIndex, onAnswer]);

  return (
    <ul className="flex flex-col gap-3">
      {exercise.options.map((opt, i) => {
        const isSel = choice === i;
        let tone =
          "border-slate-200 bg-white hover:border-slate-300 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-500 dark:text-slate-200";
        if (checked) {
          if (i === exercise.correctIndex)
            tone =
              "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200";
          else if (isSel)
            tone =
              "border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200";
          else
            tone =
              "border-slate-200 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-800";
        } else if (isSel) {
          tone =
            "border-cyan-500 bg-cyan-50 ring-2 ring-cyan-200 text-slate-800 dark:bg-cyan-950/40 dark:ring-cyan-800 dark:text-slate-100";
        }
        return (
          <li key={i}>
            <button
              type="button"
              onClick={() => !checked && setChoice(i)}
              disabled={checked}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3 text-left text-lg font-bold transition",
                tone,
              )}
            >
              <span>{opt}</span>
              {checked && i === exercise.correctIndex && (
                <Check className="size-5 shrink-0 text-emerald-600" />
              )}
              {checked && isSel && i !== exercise.correctIndex && (
                <X className="size-5 shrink-0 text-rose-600" />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
