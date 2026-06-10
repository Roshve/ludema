"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import type { SimplifyStepsExercise } from "@/content/types";
import type { RenderProps } from "../types";
import { cn } from "@/lib/utils";

export function SimplifySteps({
  exercise,
  checked,
  onAnswer,
}: RenderProps<SimplifyStepsExercise>) {
  const [picks, setPicks] = useState<(number | null)[]>(
    () => exercise.steps.map(() => null),
  );

  const allPicked = picks.every((p) => p !== null);
  const correct =
    allPicked && picks.every((p, i) => p === exercise.steps[i].correctIndex);

  useEffect(() => {
    onAnswer(allPicked ? { correct } : null);
  }, [picks, allPicked, correct, onAnswer]);

  function pick(stepIdx: number, optIdx: number) {
    if (checked) return;
    setPicks((prev) => {
      const next = [...prev];
      next[stepIdx] = optIdx;
      return next;
    });
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-xl bg-slate-800 px-4 py-2 text-lg font-black text-white dark:bg-slate-950">
        {exercise.start}
      </div>

      {exercise.steps.map((step, si) => (
        <div key={si} className="flex w-full flex-col items-center gap-2">
          <ArrowDown className="size-5 text-slate-300 dark:text-slate-600" />
          <div className="flex flex-wrap justify-center gap-2">
            {step.options.map((opt, oi) => {
              const isSel = picks[si] === oi;
              let tone =
                "border-slate-200 bg-white hover:border-slate-300 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-500 dark:text-slate-200";
              if (checked) {
                if (oi === step.correctIndex)
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
                  "border-cyan-500 bg-cyan-50 ring-2 ring-cyan-200 dark:bg-cyan-950/40 dark:ring-cyan-800";
              }
              return (
                <button
                  key={oi}
                  type="button"
                  onClick={() => pick(si, oi)}
                  disabled={checked}
                  className={cn(
                    "rounded-xl border-2 px-3 py-2 text-sm font-extrabold transition",
                    tone,
                  )}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          <div className="rounded-xl bg-slate-100 px-4 py-1.5 text-base font-black text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {step.result}
          </div>
        </div>
      ))}
    </div>
  );
}
