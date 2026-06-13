"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BookOpen, Bug, Lightbulb, X } from "lucide-react";
import {
  CATEGORY_META,
  buildIssueUrl,
  type ReportCategory,
  type ReportContext,
} from "@/lib/report";
import { trackReportOpened } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const CATEGORIES: { id: ReportCategory; Icon: typeof Bug }[] = [
  { id: "contenido", Icon: BookOpen },
  { id: "bug", Icon: Bug },
  { id: "sugerencia", Icon: Lightbulb },
];

interface ReportDialogProps {
  open: boolean;
  onClose: () => void;
  context?: ReportContext;
}

export function ReportDialog({ open, onClose, context }: ReportDialogProps) {
  const [category, setCategory] = useState<ReportCategory>("contenido");
  const [description, setDescription] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);
  // Guarda el elemento que tenía el foco antes de abrir para restaurarlo al cerrar.
  const previousFocusRef = useRef<Element | null>(null);

  // Cerrar con Esc.
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Guardar/restaurar foco y mover el foco inicial al abrirse.
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement;
      // nextTick para que el portal ya esté en el DOM.
      setTimeout(() => firstFocusRef.current?.focus(), 0);
    } else {
      (previousFocusRef.current as HTMLElement | null)?.focus();
    }
  }, [open]);

  // Resetear estado interno al abrir.
  useEffect(() => {
    if (open) {
      setCategory("contenido");
      setDescription("");
    }
  }, [open]);

  function handleSubmit() {
    if (!description.trim()) return;
    const url = buildIssueUrl({ category, description, context });
    trackReportOpened({
      category,
      lessonId: context?.lessonId,
      exerciseId: context?.exerciseId,
    });
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  }

  if (!open) return null;

  const meta = CATEGORY_META[category];

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Overlay semitransparente — clic fuera cierra */}
      <button
        type="button"
        aria-hidden
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-default"
      />

      {/* Tarjeta del modal */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-dialog-title"
        className={cn(
          "relative z-10 w-full max-w-md animate-pop-in",
          "rounded-t-3xl sm:rounded-3xl",
          "border-2 border-slate-200 dark:border-slate-700",
          "bg-white dark:bg-slate-900",
          "shadow-pop p-6 flex flex-col gap-5",
        )}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between">
          <h2
            id="report-dialog-title"
            className="text-lg font-black text-slate-800 dark:text-slate-100"
          >
            {context?.lessonId ? "Reportar este ejercicio" : "Reportar o sugerir"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="grid size-8 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition"
          >
            <X className="size-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Selector de categoría */}
        <div role="radiogroup" aria-label="Tipo de reporte" className="flex gap-2">
          {CATEGORIES.map(({ id, Icon }, i) => {
            const m = CATEGORY_META[id];
            const active = category === id;
            return (
              <button
                key={id}
                ref={i === 0 ? firstFocusRef : undefined}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setCategory(id)}
                className={cn(
                  "flex flex-1 flex-col items-center gap-1 rounded-2xl border-2 py-3 text-xs font-extrabold uppercase tracking-wide transition",
                  active
                    ? "border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-400"
                    : "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600",
                )}
              >
                <Icon className="size-5" />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Área de texto */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="report-description"
            className="text-sm font-extrabold text-slate-600 dark:text-slate-300"
          >
            Descripción{" "}
            <span className="font-semibold text-rose-500" aria-hidden>
              *
            </span>
          </label>
          <textarea
            id="report-description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={meta.placeholder}
            className={cn(
              "w-full resize-none rounded-2xl border-2 px-4 py-3",
              "text-sm font-semibold text-slate-700 dark:text-slate-200",
              "bg-slate-50 dark:bg-slate-800",
              "border-slate-200 dark:border-slate-700",
              "focus:border-blue-500 focus:outline-none dark:focus:border-blue-400",
              "placeholder:font-normal placeholder:text-slate-400 dark:placeholder:text-slate-500",
              "transition",
            )}
          />
        </div>

        {/* Acciones */}
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleSubmit}
            disabled={!description.trim()}
            className="w-full"
          >
            {meta.emoji} Abrir en GitHub
          </Button>
          <Button variant="ghost" onClick={onClose} className="w-full">
            Cancelar
          </Button>
        </div>

        {/* Nota */}
        <p className="text-center text-xs text-slate-400 dark:text-slate-500">
          Se abrirá GitHub para publicar el reporte.{" "}
          <span className="whitespace-nowrap">Necesitás una cuenta.</span>
        </p>
      </div>
    </div>,
    document.body,
  );
}
