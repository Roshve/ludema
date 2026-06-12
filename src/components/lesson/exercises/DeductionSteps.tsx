"use client";

import { useEffect, useState } from "react";
import type { DeductionStepsExercise } from "@/content/types";
import type { RenderProps } from "../types";
import { cn } from "@/lib/utils";

export function DeductionSteps({
  exercise,
  checked,
  onAnswer,
}: RenderProps<DeductionStepsExercise>) {
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

  const premiseCount = exercise.premises.length;

  return (
    <div className="flex flex-col gap-3">
      {/* Premisas numeradas */}
      <div className="rounded-xl bg-slate-800 px-4 py-3 dark:bg-slate-950">
        {exercise.premises.map((premise, i) => (
          <div key={i} className="flex items-baseline gap-3">
            <span className="w-5 shrink-0 text-right font-black text-slate-400">
              {i + 1}.
            </span>
            <span className="text-lg font-black text-white">{premise}</span>
            <span className="ml-auto text-xs font-bold text-slate-400">
              Premisa
            </span>
          </div>
        ))}
      </div>

      {/* Pasos derivados: elegir la regla que justifica cada línea */}
      {exercise.steps.map((step, si) => (
        <div key={si} className="flex flex-col gap-2">
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
                  "border-fuchsia-500 bg-fuchsia-50 ring-2 ring-fuchsia-200 dark:bg-fuchsia-950/40 dark:ring-fuchsia-800";
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
          <div className="flex items-baseline gap-3 rounded-xl bg-slate-100 px-4 py-2 dark:bg-slate-800">
            <span className="w-5 shrink-0 text-right font-black text-slate-400 dark:text-slate-500">
              {premiseCount + si + 1}.
            </span>
            <span className="text-base font-black text-slate-700 dark:text-slate-200">
              {step.result}
            </span>
            {step.from && (
              <span className="ml-auto text-xs font-bold text-slate-400 dark:text-slate-500">
                {step.from}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
