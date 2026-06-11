"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpenText, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { EQUIVALENCE_LAWS, INFERENCE_RULES } from "@/content/cheatsheet";

type Tab = "laws" | "rules";

export function CheatSheet() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("laws");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ver leyes y reglas"
        className="flex items-center rounded-full bg-white p-2 text-slate-500 shadow-pop-sm transition active:translate-y-0.5 dark:bg-slate-800 dark:text-slate-300"
      >
        <BookOpenText className="size-4" />
      </button>

      {open && (
        <>
          {/* Overlay */}
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default bg-slate-900/40"
          />

          {/* Panel */}
          <div
            ref={panelRef}
            role="dialog"
            aria-modal
            aria-label="Leyes y reglas de inferencia"
            className="fixed inset-x-4 top-[5dvh] z-50 mx-auto max-w-lg animate-pop-in rounded-3xl border-2 border-slate-200 bg-white shadow-pop dark:border-slate-700 dark:bg-slate-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 pt-4 pb-3 dark:border-slate-700">
              <h2 className="text-base font-black text-slate-800 dark:text-slate-100">
                Fórmulas y Reglas
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="rounded-full p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X className="size-5" strokeWidth={3} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-4 pt-3">
              {(
                [
                  { id: "laws" as Tab, label: "Equivalencias" },
                  { id: "rules" as Tab, label: "Inferencia" },
                ] as const
              ).map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={cn(
                    "flex-1 rounded-xl px-3 py-2 text-sm font-extrabold transition",
                    tab === id
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                      : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="max-h-[60dvh] overflow-y-auto px-4 pt-3 pb-5">
              {tab === "laws" ? (
                <ul className="flex flex-col gap-2.5">
                  {EQUIVALENCE_LAWS.map((law) => (
                    <li
                      key={law.name}
                      className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-2.5 dark:border-slate-700 dark:bg-slate-800"
                    >
                      <p className="text-xs font-black uppercase tracking-wide text-slate-400 dark:text-slate-500">
                        {law.name}
                      </p>
                      <p className="font-bold text-slate-800 dark:text-slate-100">
                        {law.formula}
                      </p>
                      {law.example && (
                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                          {law.example}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="flex flex-col gap-2.5">
                  {INFERENCE_RULES.map((rule) => (
                    <li
                      key={rule.name}
                      className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-2.5 dark:border-slate-700 dark:bg-slate-800"
                    >
                      <p className="mb-1.5 text-xs font-black uppercase tracking-wide text-slate-400 dark:text-slate-500">
                        {rule.name}
                      </p>
                      <div className="font-bold text-slate-700 dark:text-slate-200">
                        {rule.premises.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                        <div className="my-1 border-t border-slate-300 dark:border-slate-600" />
                        <p className="text-slate-800 dark:text-slate-100">
                          ∴ {rule.conclusion}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
