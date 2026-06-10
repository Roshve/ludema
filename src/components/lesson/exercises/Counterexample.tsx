"use client";

import { useEffect, useMemo, useState } from "react";
import type { CounterexampleExercise } from "@/content/types";
import type { RenderProps } from "../types";
import { parse } from "@/lib/logic/parser";
import { evaluate, type Env } from "@/lib/logic/evaluate";
import { isCounterexample } from "@/lib/logic/counterexample";
import { cn } from "@/lib/utils";

export function Counterexample({
  exercise,
  checked,
  onAnswer,
}: RenderProps<CounterexampleExercise>) {
  const [vals, setVals] = useState<Record<string, boolean | null>>(() =>
    Object.fromEntries(exercise.variables.map((v) => [v, null])),
  );

  const allSet = exercise.variables.every((v) => vals[v] !== null);
  const env = useMemo<Env>(
    () =>
      Object.fromEntries(
        exercise.variables.map((v) => [v, Boolean(vals[v])]),
      ),
    [vals, exercise.variables],
  );
  const correct =
    allSet &&
    isCounterexample(
      { premises: exercise.premises, conclusion: exercise.conclusion },
      env,
    );

  useEffect(() => {
    onAnswer(allSet ? { correct } : null);
  }, [vals, allSet, correct, onAnswer]);

  function set(v: string, value: boolean) {
    if (checked) return;
    setVals((prev) => ({ ...prev, [v]: value }));
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Asignación de variables */}
      <div className="flex flex-wrap justify-center gap-4">
        {exercise.variables.map((v) => (
          <div key={v} className="flex items-center gap-2">
            <span className="text-xl font-black text-slate-700 dark:text-slate-200">
              {v}
            </span>
            {[true, false].map((b) => (
              <button
                key={String(b)}
                type="button"
                onClick={() => set(v, b)}
                disabled={checked}
                className={cn(
                  "size-11 rounded-xl border-2 text-lg font-black transition",
                  vals[v] === b
                    ? b
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                      : "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
                    : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-500",
                )}
              >
                {b ? "V" : "F"}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Evaluación de premisas y conclusión (tras comprobar) */}
      {checked && allSet && (
        <div className="mx-auto w-full max-w-sm rounded-2xl bg-slate-50 p-4 text-sm font-bold dark:bg-slate-800/60">
          {exercise.premises.map((p, i) => (
            <Row key={i} label={`Premisa: ${p}`} value={evaluate(parse(p), env)} want />
          ))}
          <Row
            label={`Conclusión: ${exercise.conclusion}`}
            value={evaluate(parse(exercise.conclusion), env)}
            want={false}
          />
        </div>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  want,
}: {
  label: string;
  value: boolean;
  want: boolean;
}) {
  const ok = value === want;
  return (
    <div className="flex items-center justify-between py-0.5">
      <span className="text-slate-600 dark:text-slate-300">{label}</span>
      <span
        className={cn(
          "ml-2 rounded-md px-2 py-0.5 font-black",
          ok
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
            : "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300",
        )}
      >
        {value ? "V" : "F"}
      </span>
    </div>
  );
}
