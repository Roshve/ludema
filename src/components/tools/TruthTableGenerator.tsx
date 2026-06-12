"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { parse, collectVars } from "@/lib/logic/parser";
import { evaluate, allAssignments, type Env } from "@/lib/logic/evaluate";
import { classify, CLASSIFICATION_LABEL } from "@/lib/logic/classify";
import { formatAst, subExpressions } from "@/lib/logic/subexpressions";
import type { Ast } from "@/lib/logic/parser";
import { cn } from "@/lib/utils";

const SYMBOLS = ["¬", "∧", "∨", "⇒", "⇔", "(", ")", "p", "q", "r", "s", "t"];
const MAX_VARS = 5;

type TableData = {
  vars: string[];
  subs: { label: string; ast: Ast }[];
  formulaLabel: string;
  classification: ReturnType<typeof classify>;
  rows: { env: Env; subValues: boolean[]; value: boolean }[];
  tooMany: false;
} | {
  vars: string[];
  tooMany: true;
};

function buildTable(formula: string): TableData {
  const ast = parse(formula);
  const vars = collectVars(ast);

  if (vars.length > MAX_VARS) {
    return { vars, tooMany: true };
  }

  const allSubs = subExpressions(ast);
  // Last element is the root; everything before it is intermediate.
  const intermediates = allSubs.slice(0, -1);
  const subs = intermediates.map((s) => ({ label: formatAst(s), ast: s }));

  const assignments = allAssignments(vars);
  const rows = assignments.map((env) => ({
    env,
    subValues: subs.map((s) => evaluate(s.ast, env)),
    value: evaluate(ast, env),
  }));

  return {
    vars,
    subs,
    formulaLabel: allSubs.length > 0 ? formatAst(ast) : formula,
    classification: classify(formula),
    rows,
    tooMany: false,
  };
}

function ClassBadge({ cls }: { cls: ReturnType<typeof classify> }) {
  const label = CLASSIFICATION_LABEL[cls];
  return (
    <span
      className={cn(
        "rounded-full px-4 py-1.5 text-sm font-black",
        cls === "tautologia" &&
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
        cls === "contradiccion" &&
          "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300",
        cls === "contingencia" &&
          "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
      )}
    >
      {label}
    </span>
  );
}

export function TruthTableGenerator() {
  const [formula, setFormula] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function insertSymbol(sym: string) {
    const el = inputRef.current;
    if (!el) {
      setFormula((f) => f + sym);
      return;
    }
    const start = el.selectionStart ?? formula.length;
    const end = el.selectionEnd ?? formula.length;
    const next = formula.slice(0, start) + sym + formula.slice(end);
    setFormula(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + sym.length, start + sym.length);
    });
  }

  let table: TableData | null = null;
  let parseError: string | null = null;

  const trimmed = formula.trim();
  if (trimmed) {
    try {
      table = buildTable(trimmed);
    } catch (e) {
      parseError = (e as Error).message;
    }
  }

  return (
    <div className="mx-auto min-h-dvh w-full max-w-2xl px-4 py-8">
      {/* Back link */}
      <Link
        href="/logica"
        className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
      >
        <ArrowLeft className="size-4" />
        Volver al mapa
      </Link>

      <h1 className="mb-1 text-2xl font-black text-slate-800 dark:text-slate-100">
        Generador de tablas de verdad
      </h1>
      <p className="mb-6 text-sm font-bold text-slate-500 dark:text-slate-400">
        Escribe una fórmula lógica para ver su tabla completa con subexpresiones.
      </p>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={formula}
        onChange={(e) => setFormula(e.target.value)}
        placeholder="p ⇒ (q ∧ r)"
        spellCheck={false}
        className="mb-3 w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 font-mono text-lg font-bold text-slate-800 outline-none focus:border-blue-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      />

      {/* Symbol keyboard */}
      <div className="mb-6 flex flex-wrap gap-1.5">
        {SYMBOLS.map((sym) => (
          <button
            key={sym}
            type="button"
            onClick={() => insertSymbol(sym)}
            className="rounded-xl border-b-2 border-slate-300 bg-white px-3 py-1.5 text-sm font-black text-slate-700 shadow-sm transition active:translate-y-0.5 active:border-b-0 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {sym}
          </button>
        ))}
      </div>

      {/* Parse error */}
      {parseError && trimmed && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
          {parseError}
        </div>
      )}

      {/* Too many variables */}
      {table?.tooMany && (
        <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300">
          Demasiadas variables ({table.vars.length}). La tabla tendría{" "}
          {2 ** table.vars.length} filas — usa máximo {MAX_VARS} variables.
        </div>
      )}

      {/* Results */}
      {table && !table.tooMany && (
        <>
          <div className="mb-4 flex items-center gap-3">
            <ClassBadge cls={table.classification} />
          </div>
          <div className="overflow-x-auto">
            <table className="mx-auto border-separate border-spacing-1 text-center text-sm">
              <thead>
                <tr>
                  {table.vars.map((v) => (
                    <th
                      key={v}
                      className="rounded-lg bg-slate-100 px-3 py-2 font-black text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {v}
                    </th>
                  ))}
                  {table.subs.map((sub, i) => (
                    <th
                      key={i}
                      className="rounded-lg bg-slate-200 px-3 py-2 font-black text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                    >
                      {sub.label}
                    </th>
                  ))}
                  <th className="rounded-lg bg-slate-800 px-3 py-2 font-black text-white dark:bg-slate-950">
                    {table.formulaLabel}
                  </th>
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, ri) => (
                  <tr key={ri}>
                    {table!.vars.map((v) => (
                      <td
                        key={v}
                        className="rounded-lg bg-slate-50 px-3 py-2 font-extrabold text-slate-500 dark:bg-slate-800/60 dark:text-slate-400"
                      >
                        {row.env[v] ? "V" : "F"}
                      </td>
                    ))}
                    {table!.subs.map((_, si) => (
                      <td
                        key={si}
                        className="rounded-lg bg-slate-100/70 px-3 py-2 font-extrabold text-slate-500 dark:bg-slate-800/40 dark:text-slate-400"
                      >
                        {row.subValues[si] ? "V" : "F"}
                      </td>
                    ))}
                    <td
                      className={cn(
                        "rounded-lg px-3 py-2 font-black",
                        row.value
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                          : "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300",
                      )}
                    >
                      {row.value ? "V" : "F"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
