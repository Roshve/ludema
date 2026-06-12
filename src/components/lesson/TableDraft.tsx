"use client";

import { useEffect, useRef, useState } from "react";
import { Table2, Plus, Minus, Trash2, X, GripHorizontal } from "lucide-react";
import { motion, useDragControls } from "motion/react";
import { cn } from "@/lib/utils";

const MAX_COLS = 8;
const MAX_ROWS = 16;
type Cell = boolean | null;

const DEFAULT_HEADERS = ["p", "q", ""];
const DEFAULT_ROWS = 4;

function emptyRows(numRows: number, numCols: number): Cell[][] {
  return Array.from({ length: numRows }, () => Array<Cell>(numCols).fill(null));
}

export function TableDraft() {
  const [open, setOpen] = useState(false);
  const [headers, setHeaders] = useState<string[]>(DEFAULT_HEADERS);
  const [cells, setCells] = useState<Cell[][]>(() =>
    emptyRows(DEFAULT_ROWS, DEFAULT_HEADERS.length),
  );

  // The full-viewport div serves as the drag constraint boundary.
  const constraintRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function addCol() {
    if (headers.length >= MAX_COLS) return;
    setHeaders((h) => [...h, ""]);
    setCells((rows) => rows.map((r) => [...r, null]));
  }
  function removeCol() {
    if (headers.length <= 1) return;
    setHeaders((h) => h.slice(0, -1));
    setCells((rows) => rows.map((r) => r.slice(0, -1)));
  }
  function addRow() {
    if (cells.length >= MAX_ROWS) return;
    setCells((rows) => [...rows, Array<Cell>(headers.length).fill(null)]);
  }
  function removeRow() {
    if (cells.length <= 1) return;
    setCells((rows) => rows.slice(0, -1));
  }
  function clear() {
    setHeaders(DEFAULT_HEADERS);
    setCells(emptyRows(DEFAULT_ROWS, DEFAULT_HEADERS.length));
  }
  function cycleCell(row: number, col: number) {
    setCells((prev) => {
      const next = prev.map((r) => [...r]);
      const v = prev[row][col];
      next[row][col] = v === null ? true : v === true ? false : null;
      return next;
    });
  }
  function updateHeader(i: number, val: string) {
    setHeaders((h) => {
      const next = [...h];
      next[i] = val;
      return next;
    });
  }

  const vStr = (v: Cell) => (v === null ? "·" : v ? "V" : "F");
  const btnCtrl =
    "rounded-lg border border-slate-200 p-1 text-slate-500 transition disabled:opacity-30 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Tabla borrador"
        className="flex items-center rounded-full bg-white p-2 text-slate-500 shadow-pop-sm transition active:translate-y-0.5 dark:bg-slate-800 dark:text-slate-300"
      >
        <Table2 className="size-4" />
      </button>

      {/*
        Always mounted so state survives close/reopen.
        The outer div is both the overlay backdrop and the drag constraint boundary.
      */}
      <div
        ref={constraintRef}
        className={cn("fixed inset-0 z-40", !open && "hidden")}
      >
        {/* Backdrop: click to close */}
        <div
          className="absolute inset-0 cursor-default bg-slate-900/40"
          onClick={() => setOpen(false)}
        />

        {/*
          Flex container: centers the modal on load.
          pointer-events-none so the backdrop click-through works;
          the motion.div re-enables pointer events on itself.
        */}
        <div className="pointer-events-none absolute inset-x-0 top-[5dvh] flex justify-center px-3 sm:px-6">
          <motion.div
            drag
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={constraintRef}
            dragMomentum={false}
            dragElastic={0.08}
            role="dialog"
            aria-modal
            aria-label="Tabla borrador"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "pointer-events-auto w-full max-w-lg rounded-3xl border-2 border-slate-200 bg-white shadow-pop dark:border-slate-700 dark:bg-slate-900",
              // Only animate pop-in on first open; drag handles subsequent positioning.
              open && "animate-pop-in",
            )}
          >
            {/* ── Drag handle / header ── */}
            <div
              onPointerDown={(e) => dragControls.start(e)}
              className="flex cursor-grab items-center justify-between gap-2 rounded-t-3xl border-b border-slate-100 px-4 pt-4 pb-3 select-none active:cursor-grabbing dark:border-slate-700"
            >
              <div className="flex min-w-0 items-center gap-2">
                <GripHorizontal className="size-4 shrink-0 text-slate-400" />
                <h2 className="truncate text-base font-black text-slate-800 dark:text-slate-100">
                  Tabla borrador
                </h2>
              </div>
              <div
                className="flex shrink-0 items-center gap-1"
                /* Stop pointer-down here so buttons don't trigger drag. */
                onPointerDown={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={clear}
                  aria-label="Limpiar tabla"
                  className="rounded-full p-1.5 text-slate-400 transition hover:text-rose-500 dark:hover:text-rose-400"
                >
                  <Trash2 className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar"
                  className="rounded-full p-1.5 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <X className="size-5" strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* ── Col / row controls ── */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 px-4 pt-3 pb-2">
              <span className="text-xs font-bold text-slate-500">Columnas:</span>
              <div className="flex items-center gap-1">
                <button type="button" onClick={removeCol} disabled={headers.length <= 1} className={btnCtrl} aria-label="Eliminar columna">
                  <Minus className="size-3.5" />
                </button>
                <span className="w-5 text-center text-xs font-black text-slate-700 dark:text-slate-200">
                  {headers.length}
                </span>
                <button type="button" onClick={addCol} disabled={headers.length >= MAX_COLS} className={btnCtrl} aria-label="Añadir columna">
                  <Plus className="size-3.5" />
                </button>
              </div>
              <span className="text-xs font-bold text-slate-500">Filas:</span>
              <div className="flex items-center gap-1">
                <button type="button" onClick={removeRow} disabled={cells.length <= 1} className={btnCtrl} aria-label="Eliminar fila">
                  <Minus className="size-3.5" />
                </button>
                <span className="w-5 text-center text-xs font-black text-slate-700 dark:text-slate-200">
                  {cells.length}
                </span>
                <button type="button" onClick={addRow} disabled={cells.length >= MAX_ROWS} className={btnCtrl} aria-label="Añadir fila">
                  <Plus className="size-3.5" />
                </button>
              </div>
            </div>

            {/* ── Table ── */}
            <div className="max-h-[55dvh] overflow-auto px-4 pb-5">
              <table className="mx-auto border-separate border-spacing-1">
                <thead>
                  <tr>
                    {headers.map((h, i) => (
                      <th key={i} className="px-0.5">
                        <input
                          type="text"
                          value={h}
                          onChange={(e) => updateHeader(i, e.target.value)}
                          placeholder="—"
                          maxLength={10}
                          className="w-14 rounded-lg bg-slate-100 px-1 py-1.5 text-center text-sm font-black text-slate-700 outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-800 dark:text-slate-200"
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cells.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-0.5">
                          <button
                            type="button"
                            onClick={() => cycleCell(ri, ci)}
                            className={cn(
                              "w-14 rounded-lg border-2 py-1.5 text-sm font-black transition",
                              cell === null
                                ? "border-dashed border-slate-300 bg-white text-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-500"
                                : "border-cyan-400 bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300",
                            )}
                          >
                            {vStr(cell)}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-center text-xs font-bold text-slate-400">
                Toca cada celda · · · para alternar V / F
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
