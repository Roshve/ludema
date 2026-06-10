"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { motion } from "motion/react";
import type { Subject } from "@/content/subjects";
import { subjectHref } from "@/content/subjects";
import { allLessons } from "@/content";
import { useProgress } from "@/stores/progress";
import { useHydrated } from "@/hooks/useHydrated";
import { ACCENT } from "@/lib/accent";
import { cn } from "@/lib/utils";

export function SubjectCard({ subject }: { subject: Subject }) {
  const a = ACCENT[subject.accent];
  const Icon = subject.icon;
  const hydrated = useHydrated();
  const completed = useProgress((s) => s.completedLessons);

  // Por ahora todo el progreso pertenece a Lógica (única materia jugable).
  const total = allLessons.length;
  const done =
    hydrated && subject.slug === "logica"
      ? allLessons.filter((c) => completed[c.lesson.id]).length
      : 0;

  // ── Tarjeta bloqueada: mismo patrón que la Unidad 2 del mapa ──────────────
  if (!subject.available) {
    return (
      <div className="animate-pop-in rounded-3xl border-2 border-dashed border-slate-300 bg-white/60 p-5 opacity-80 dark:border-slate-600 dark:bg-slate-800/60">
        <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-500">
          <Icon className="size-6" />
        </div>
        <h2 className="text-lg font-black leading-tight text-slate-700 dark:text-slate-200">
          {subject.title}
        </h2>
        <p className="mt-1 text-sm font-bold text-slate-400">
          {subject.tagline}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-slate-400">
          <Lock className="size-3.5" />
          <span className="text-xs font-extrabold uppercase tracking-wide">
            Próximamente
          </span>
        </div>
      </div>
    );
  }

  // ── Tarjeta jugable ────────────────────────────────────────────────────────
  return (
    <Link
      href={subjectHref(subject)}
      className={cn(
        "group block animate-pop-in rounded-3xl border-2 border-b-4 bg-white p-5 shadow-pop transition hover:-translate-y-0.5 active:translate-y-0.5 active:border-b-2 dark:bg-slate-800",
        a.border,
      )}
    >
      <div
        className={cn(
          "mb-3 flex size-12 items-center justify-center rounded-2xl text-white",
          a.bg,
        )}
      >
        <Icon className="size-6" />
      </div>
      <h2 className="text-lg font-black leading-tight text-slate-800 dark:text-slate-100">
        {subject.title}
      </h2>
      <p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-400">
        {subject.tagline}
      </p>

      {/* Progreso: 0% en el prerender; anima tras hidratar. */}
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <motion.div
          className={cn("h-full rounded-full", a.bg)}
          initial={false}
          animate={{ width: `${(done / total) * 100}%` }}
          transition={{ type: "spring", stiffness: 140, damping: 22 }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className={cn("text-xs font-extrabold", a.text)}>
          {done}/{total} lecciones
        </span>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-white",
            a.bg,
          )}
        >
          {done > 0 ? "Continuar" : "Jugar"}
        </span>
      </div>
    </Link>
  );
}
