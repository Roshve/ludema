"use client";

import { useEffect, useMemo, useState } from "react";
import type { BuildExpressionExercise } from "@/content/types";
import type { RenderProps } from "../types";
import { cn, shuffle } from "@/lib/utils";

export function BuildExpression({
  exercise,
  checked,
  onAnswer,
}: RenderProps<BuildExpressionExercise>) {
  // Orden barajado del banco; cada elemento es un índice del banco original.
  const order = useMemo(
    () => shuffle(exercise.bank.map((_, i) => i)),
    [exercise.bank],
  );
  const [placed, setPlaced] = useState<number[]>([]); // índices del banco, en orden

  const tokens = placed.map((i) => exercise.bank[i]);
  const correct =
    tokens.length === exercise.answer.length &&
    tokens.every((t, i) => t === exercise.answer[i]);

  useEffect(() => {
    onAnswer(placed.length === 0 ? null : { correct });
  }, [placed, correct, onAnswer]);

  function place(i: number) {
    if (checked || placed.includes(i)) return;
    setPlaced((p) => [...p, i]);
  }
  function remove(i: number) {
    if (checked) return;
    setPlaced((p) => p.filter((x) => x !== i));
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Zona de respuesta */}
      <div
        className={cn(
          "flex min-h-16 flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed p-3",
          checked
            ? correct
              ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
              : "border-rose-400 bg-rose-50 dark:bg-rose-950/40"
            : "border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800",
        )}
      >
        {placed.length === 0 && (
          <span className="px-2 font-bold text-slate-300 dark:text-slate-500">
            Toca los bloques para construir la expresión…
          </span>
        )}
        {placed.map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => remove(i)}
            disabled={checked}
            className="rounded-xl border-b-4 border-cyan-700 bg-cyan-500 px-4 py-2 text-lg font-black text-white shadow-pop-sm active:translate-y-0.5"
          >
            {exercise.bank[i]}
          </button>
        ))}
      </div>

      {/* Banco de bloques */}
      <div className="flex flex-wrap justify-center gap-2">
        {order.map((i) => {
          const used = placed.includes(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => place(i)}
              disabled={checked || used}
              className={cn(
                "rounded-xl border-b-4 px-4 py-2 text-lg font-black transition active:translate-y-0.5",
                used
                  ? "border-slate-200 bg-slate-100 text-transparent dark:border-slate-700 dark:bg-slate-800"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
              )}
            >
              {exercise.bank[i]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
