"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  Table2,
  Plus,
  Minus,
  Trash2,
  X,
  GripHorizontal,
  GripVertical,
} from "lucide-react";
import { motion, useDragControls, Reorder } from "motion/react";
import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/Tooltip";

// ── Types ────────────────────────────────────────────────────────────────────

type Cell = boolean | null;
type ColDef = { id: string; header: string };
// Cells keyed by ColDef.id so column reordering doesn't touch cell data.
type RowDef = { id: string; cells: Record<string, Cell> };

// ── Constants ────────────────────────────────────────────────────────────────

const MAX_COLS = 8;
const MAX_ROWS = 16;
const SYMBOLS = ["¬", "∧", "∨", "⇒", "⇔", "(", ")", "p", "q", "r", "s", "t"];

// ── Stable initial state (col ids shared between cols and rows) ───────────────

function makeInitial(uid: () => string): { cols: ColDef[]; rows: RowDef[] } {
  const cols: ColDef[] = [
    { id: uid(), header: "p" },
    { id: uid(), header: "q" },
    { id: uid(), header: "" },
  ];
  const rows: RowDef[] = Array.from({ length: 4 }, () => ({
    id: uid(),
    cells: Object.fromEntries(cols.map((c) => [c.id, null as Cell])),
  }));
  return { cols, rows };
}

// ── DraggableCol — explicit grip strip + elastic input ───────────────────────

function DraggableCol({
  col,
  onUpdate,
  lastFocusedRef,
}: {
  col: ColDef;
  onUpdate: (id: string, val: string) => void;
  lastFocusedRef: React.RefObject<HTMLInputElement | null>;
}) {
  const controls = useDragControls();
  return (
    <Reorder.Item
      as="th"
      value={col}
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      className="px-0.5 align-bottom"
    >
      {/* focus-within: el ring va aquí porque sobre el input lo taparía la barra
          de agarre (el span relative del Tooltip pinta encima del box-shadow) */}
      <div className="flex flex-col rounded-lg focus-within:ring-2 focus-within:ring-blue-400">
        {/* Barra de agarre: cubre todo el ancho del input, único trigger del drag */}
        <Tooltip label="Arrastrar columna" side="top" className="self-stretch">
          <div
            onPointerDown={(e) => controls.start(e)}
            className="flex h-4 w-full cursor-grab items-center justify-center rounded-t-lg bg-slate-200 transition hover:bg-slate-300 active:cursor-grabbing dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            <GripHorizontal className="size-3 text-slate-500 dark:text-slate-400" />
          </div>
        </Tooltip>
        {/* Elastic input: inline-grid overlay makes width match content */}
        <div className="inline-grid min-w-14 max-w-[180px]">
          <span
            aria-hidden
            className="invisible col-start-1 row-start-1 whitespace-pre px-1 text-sm font-black"
          >
            {col.header || "—"}
          </span>
          <input
            data-colid={col.id}
            type="text"
            value={col.header}
            onChange={(e) => onUpdate(col.id, e.target.value)}
            onFocus={(e) => {
              lastFocusedRef.current = e.currentTarget;
            }}
            onPointerDown={(e) => e.stopPropagation()}
            placeholder="—"
            maxLength={60}
            // size=1 anula el ancho intrínseco por defecto del input (~20ch),
            // que inflaría el w-fit del modal; el span invisible dicta el ancho.
            size={1}
            className="col-start-1 row-start-1 w-full cursor-text rounded-b-lg bg-slate-100 px-1 py-1.5 text-center text-sm font-black text-slate-700 outline-none dark:bg-slate-800 dark:text-slate-200"
          />
        </div>
      </div>
    </Reorder.Item>
  );
}

// ── DraggableRow — needs its own useDragControls instance ────────────────────

function DraggableRow({
  row,
  cols,
  onCycle,
}: {
  row: RowDef;
  cols: ColDef[];
  onCycle: (rowId: string, colId: string) => void;
}) {
  const controls = useDragControls();
  const vStr = (v: Cell) => (v === null ? "·" : v ? "V" : "F");

  return (
    <Reorder.Item
      as="tr"
      value={row}
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
    >
      {/* Row grip */}
      <td className="px-0.5">
        <Tooltip label="Arrastrar fila" side="left">
          <button
            type="button"
            aria-label="Arrastrar fila"
            onPointerDown={(e) => controls.start(e)}
            className="flex cursor-grab items-center justify-center rounded-md p-1 text-slate-300 transition active:cursor-grabbing hover:text-slate-400 dark:text-slate-600 dark:hover:text-slate-400"
          >
            <GripVertical className="size-3.5" />
          </button>
        </Tooltip>
      </td>
      {cols.map((col) => (
        <td key={col.id} className="px-0.5">
          <button
            type="button"
            onClick={() => onCycle(row.id, col.id)}
            className={cn(
              "block w-full min-w-14 rounded-lg border-2 py-1.5 text-sm font-black transition",
              row.cells[col.id] === null
                ? "border-dashed border-slate-300 bg-white text-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-500"
                : "border-cyan-400 bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300",
            )}
          >
            {vStr(row.cells[col.id])}
          </button>
        </td>
      ))}
    </Reorder.Item>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function TableDraft() {
  const [open, setOpen] = useState(false);

  // IDs por instancia: prefijo de useId (idéntico en server y cliente) +
  // contador en ref (no se resetea con Fast Refresh, a diferencia de un
  // contador a nivel de módulo, que regeneraba ids ya usados → keys duplicadas).
  const idPrefix = useId();
  const seqRef = useRef(0);
  const uid = () => `${idPrefix}${++seqRef.current}`;

  // Una sola llamada a makeInitial: los IDs de columna deben ser los mismos
  // en cols[] y en las claves de rows[].cells.
  const [initial] = useState(() => makeInitial(uid));
  const [cols, setCols] = useState<ColDef[]>(initial.cols);
  const [rows, setRows] = useState<RowDef[]>(initial.rows);

  // Constraint boundary for modal drag.
  const constraintRef = useRef<HTMLDivElement>(null);
  const modalDragControls = useDragControls();

  // Last focused header input — used to insert symbols at cursor.
  const lastFocusedRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // ── Column actions ────────────────────────────────────────────────────────

  function addCol() {
    if (cols.length >= MAX_COLS) return;
    const newCol: ColDef = { id: uid(), header: "" };
    setCols((c) => [...c, newCol]);
    setRows((rs) =>
      rs.map((r) => ({ ...r, cells: { ...r.cells, [newCol.id]: null } })),
    );
  }

  function removeCol() {
    if (cols.length <= 1) return;
    const lastId = cols[cols.length - 1].id;
    setCols((c) => c.slice(0, -1));
    setRows((rs) =>
      rs.map((r) => {
        const cells = { ...r.cells };
        delete cells[lastId];
        return { ...r, cells };
      }),
    );
  }

  function updateHeader(id: string, val: string) {
    setCols((c) =>
      c.map((col) => (col.id === id ? { ...col, header: val } : col)),
    );
  }

  // ── Row actions ───────────────────────────────────────────────────────────

  function addRow() {
    if (rows.length >= MAX_ROWS) return;
    setRows((rs) => [
      ...rs,
      {
        id: uid(),
        cells: Object.fromEntries(cols.map((c) => [c.id, null as Cell])),
      },
    ]);
  }

  function removeRow() {
    if (rows.length <= 1) return;
    setRows((rs) => rs.slice(0, -1));
  }

  // ── Cell action ───────────────────────────────────────────────────────────

  function cycleCell(rowId: string, colId: string) {
    setRows((rs) =>
      rs.map((r) => {
        if (r.id !== rowId) return r;
        const v = r.cells[colId];
        return {
          ...r,
          cells: {
            ...r.cells,
            [colId]: v === null ? true : v === true ? false : null,
          },
        };
      }),
    );
  }

  // ── Reset ─────────────────────────────────────────────────────────────────

  function clear() {
    const { cols: c, rows: r } = makeInitial(uid);
    setCols(c);
    setRows(r);
  }

  // ── Symbol keyboard ───────────────────────────────────────────────────────

  function insertSymbol(sym: string) {
    const el = lastFocusedRef.current;
    if (!el) return;
    const id = el.dataset.colid;
    if (!id) return;
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    const next = el.value.slice(0, start) + sym + el.value.slice(end);
    updateHeader(id, next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + sym.length, start + sym.length);
    });
  }

  const btnCtrl =
    "rounded-lg border border-slate-200 p-1 text-slate-500 transition disabled:opacity-30 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800";

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Trigger */}
      <Tooltip label="Tabla borrador" side="bottom">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Tabla borrador"
          className="flex items-center rounded-full bg-white p-2 text-slate-500 shadow-pop-sm transition active:translate-y-0.5 dark:bg-slate-800 dark:text-slate-300"
        >
          <Table2 className="size-4" />
        </button>
      </Tooltip>

      {/* Always mounted; CSS hidden preserves state and modal drag position. */}
      <div
        ref={constraintRef}
        className={cn("fixed inset-0 z-40", !open && "hidden")}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 cursor-default bg-slate-900/40"
          onClick={() => setOpen(false)}
        />

        {/* Centers the modal on open; pointer-events-none for backdrop click-through */}
        <div className="pointer-events-none absolute inset-x-0 top-[5dvh] flex justify-center px-3 sm:px-6">
          <motion.div
            drag
            dragControls={modalDragControls}
            dragListener={false}
            dragConstraints={constraintRef}
            dragMomentum={false}
            dragElastic={0.08}
            role="dialog"
            aria-modal
            aria-label="Tabla borrador"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              // En sm+ el modal crece con la tabla (w-fit) entre min-w-lg y el
              // padding del wrapper; el overflow-auto interno queda de respaldo.
              "pointer-events-auto w-full max-w-lg rounded-3xl border-2 border-slate-200 bg-white shadow-pop sm:w-fit sm:min-w-lg sm:max-w-full dark:border-slate-700 dark:bg-slate-900",
              open && "animate-pop-in",
            )}
          >
            {/* ── Modal drag handle / header ── */}
            <div
              onPointerDown={(e) => modalDragControls.start(e)}
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
                onPointerDown={(e) => e.stopPropagation()}
              >
                <Tooltip label="Limpiar" side="bottom">
                  <button
                    type="button"
                    onClick={clear}
                    aria-label="Limpiar tabla"
                    className="rounded-full p-1.5 text-slate-400 transition hover:text-rose-500 dark:hover:text-rose-400"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </Tooltip>
                <Tooltip label="Cerrar" side="bottom">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Cerrar"
                    className="rounded-full p-1.5 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <X className="size-5" strokeWidth={3} />
                  </button>
                </Tooltip>
              </div>
            </div>

            {/* ── Col / row controls ── */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 px-4 pt-3 pb-2">
              <span className="text-xs font-bold text-slate-500">Columnas:</span>
              <div className="flex items-center gap-1">
                <Tooltip label="Eliminar columna" side="top">
                  <button
                    type="button"
                    onClick={removeCol}
                    disabled={cols.length <= 1}
                    className={btnCtrl}
                    aria-label="Eliminar columna"
                  >
                    <Minus className="size-3.5" />
                  </button>
                </Tooltip>
                <span className="w-5 text-center text-xs font-black text-slate-700 dark:text-slate-200">
                  {cols.length}
                </span>
                <Tooltip label="Añadir columna" side="top">
                  <button
                    type="button"
                    onClick={addCol}
                    disabled={cols.length >= MAX_COLS}
                    className={btnCtrl}
                    aria-label="Añadir columna"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </Tooltip>
              </div>

              <span className="text-xs font-bold text-slate-500">Filas:</span>
              <div className="flex items-center gap-1">
                <Tooltip label="Eliminar fila" side="top">
                  <button
                    type="button"
                    onClick={removeRow}
                    disabled={rows.length <= 1}
                    className={btnCtrl}
                    aria-label="Eliminar fila"
                  >
                    <Minus className="size-3.5" />
                  </button>
                </Tooltip>
                <span className="w-5 text-center text-xs font-black text-slate-700 dark:text-slate-200">
                  {rows.length}
                </span>
                <Tooltip label="Añadir fila" side="top">
                  <button
                    type="button"
                    onClick={addRow}
                    disabled={rows.length >= MAX_ROWS}
                    className={btnCtrl}
                    aria-label="Añadir fila"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </Tooltip>
              </div>
            </div>

            {/* ── Symbol keyboard ── */}
            <div className="flex flex-wrap gap-1 px-4 pb-2">
              {SYMBOLS.map((sym) => (
                <button
                  key={sym}
                  type="button"
                  // Prevent blur of focused header input before reading selectionStart.
                  onPointerDown={(e) => e.preventDefault()}
                  onClick={() => insertSymbol(sym)}
                  className="rounded-lg border-b-2 border-slate-300 bg-white px-2 py-1 text-xs font-black text-slate-700 shadow-sm transition active:translate-y-0.5 active:border-b-0 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  {sym}
                </button>
              ))}
            </div>

            {/* ── Table with drag-to-reorder ── */}
            <div className="scrollbar-slim max-h-[50dvh] overflow-auto px-4 pt-8 pb-5">
              <table className="mx-auto border-separate border-spacing-1">
                <thead>
                  <Reorder.Group
                    as="tr"
                    axis="x"
                    values={cols}
                    onReorder={setCols}
                  >
                    {/* Empty cell above row grips */}
                    <th className="w-6" />
                    {cols.map((col) => (
                      <DraggableCol
                        key={col.id}
                        col={col}
                        onUpdate={updateHeader}
                        lastFocusedRef={lastFocusedRef}
                      />
                    ))}
                  </Reorder.Group>
                </thead>

                <Reorder.Group
                  as="tbody"
                  axis="y"
                  values={rows}
                  onReorder={setRows}
                >
                  {rows.map((row) => (
                    <DraggableRow
                      key={row.id}
                      row={row}
                      cols={cols}
                      onCycle={cycleCell}
                    />
                  ))}
                </Reorder.Group>
              </table>
              <p className="mt-2 text-center text-xs font-bold text-slate-400">
                Arrastra encabezados o filas · toca celdas para alternar V / F
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
