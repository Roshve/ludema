"use client";

import { useEffect, useMemo, useState } from "react";
import type { TruthTableExercise } from "@/content/types";
import type { RenderProps } from "../types";
import { truthTable } from "@/lib/logic/truthTable";
import { cn } from "@/lib/utils";

export function TruthTable({
  exercise,
  checked,
  onAnswer,
}: RenderProps<TruthTableExercise>) {
  const table = useMemo(() => truthTable(exercise.formula), [exercise.formula]);
  const [cells, setCells] = useState<(boolean | null)[]>(
    () => table.rows.map(() => null),
  );

  const allFilled = cells.every((c) => c !== null);
  const correct =
    allFilled && cells.every((c, i) => c === table.rows[i].value);

  useEffect(() => {
    onAnswer(allFilled ? { correct } : null);
  }, [cells, allFilled, correct, onAnswer]);

  // Ciclo de la celda: vacío → V → F → vacío.
  function cycle(i: number) {
    if (checked) return;
    setCells((prev) => {
      const next = [...prev];
      next[i] = prev[i] === null ? true : prev[i] === true ? false : null;
      return next;
    });
  }

  const vstr = (b: boolean) => (b ? "V" : "F");

  return (
    <div className="overflow-x-auto">
      <table className="mx-auto border-separate border-spacing-1 text-center">
        <thead>
          <tr>
            {table.vars.map((v) => (
              <th
                key={v}
                className="rounded-lg bg-slate-100 px-3 py-2 text-base font-black text-slate-600"
              >
                {v}
              </th>
            ))}
            <th className="rounded-lg bg-slate-800 px-3 py-2 text-base font-black text-white">
              {exercise.formula}
            </th>
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i}>
              {table.vars.map((v) => (
                <td
                  key={v}
                  className="rounded-lg bg-slate-50 px-3 py-2 text-base font-extrabold text-slate-500"
                >
                  {vstr(row.env[v])}
                </td>
              ))}
              <td>
                <button
                  type="button"
                  onClick={() => cycle(i)}
                  disabled={checked}
                  className={cn(
                    "min-w-12 rounded-lg border-2 px-3 py-2 text-base font-black transition",
                    checked
                      ? cells[i] === row.value
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-rose-500 bg-rose-50 text-rose-700"
                      : cells[i] === null
                        ? "border-dashed border-slate-300 bg-white text-slate-300"
                        : "border-sky-400 bg-sky-50 text-sky-700",
                  )}
                >
                  {cells[i] === null ? "·" : vstr(cells[i]!)}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-center text-xs font-bold text-slate-400">
        Toca cada celda para alternar V / F.
      </p>
    </div>
  );
}
