"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import type { TapPropositionExercise } from "@/content/types";
import type { RenderProps } from "../types";
import { cn } from "@/lib/utils";

export function TapProposition({
  exercise,
  checked,
  onAnswer,
}: RenderProps<TapPropositionExercise>) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const correct = exercise.items.every(
    (it, i) => it.isProposition === selected.has(i),
  );

  useEffect(() => {
    // Siempre comprobable: una selección vacía es un intento válido.
    onAnswer({ correct });
  }, [selected, correct, onAnswer]);

  function toggle(i: number) {
    if (checked) return;
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  return (
    <ul className="flex flex-col gap-3">
      {exercise.items.map((it, i) => {
        const isSel = selected.has(i);
        // Estado visual tras comprobar.
        let tone = "";
        if (checked) {
          if (it.isProposition && isSel)
            tone = "border-emerald-500 bg-emerald-50";
          else if (it.isProposition && !isSel)
            tone = "border-amber-400 bg-amber-50";
          else if (!it.isProposition && isSel)
            tone = "border-rose-500 bg-rose-50";
          else tone = "border-slate-200 bg-white";
        } else {
          tone = isSel
            ? "border-sky-500 bg-sky-50 ring-2 ring-sky-200"
            : "border-slate-200 bg-white hover:border-slate-300";
        }
        return (
          <li key={i}>
            <button
              type="button"
              onClick={() => toggle(i)}
              disabled={checked}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3 text-left font-bold text-slate-700 transition",
                tone,
              )}
            >
              <span>{it.text}</span>
              {checked && it.isProposition && (
                <Check className="size-5 shrink-0 text-emerald-600" />
              )}
              {checked && !it.isProposition && isSel && (
                <X className="size-5 shrink-0 text-rose-600" />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
