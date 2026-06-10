import Link from "next/link";
import { X, Lightbulb } from "lucide-react";
import type { Section, GuideEntry } from "@/content/types";
import { ACCENT } from "@/lib/accent";
import { cn } from "@/lib/utils";

export function SectionGuideView({ section }: { section: Section }) {
  const a = ACCENT[section.accent];
  const guide = section.guide!;
  const firstLessonId = section.lessons[0]?.id;

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4 pb-28">
      {/* Cabecera */}
      <header className="sticky top-0 z-10 -mx-4 flex items-center gap-3 border-b border-slate-200/70 bg-background/85 px-4 py-4 backdrop-blur dark:border-slate-700/70">
        <Link
          href="/"
          aria-label="Cerrar guía"
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        >
          <X className="size-7" strokeWidth={3} />
        </Link>
        <div>
          <p className={cn("text-xs font-black uppercase tracking-wide", a.text)}>
            Guía de la sección
          </p>
          <h1 className="text-xl font-black leading-tight text-slate-800 dark:text-slate-100">
            {section.title}
          </h1>
        </div>
      </header>

      {/* Niveles */}
      <div className="mt-5 flex flex-col gap-5">
        {guide.levels.map((level, i) => (
          <section
            key={i}
            className="rounded-3xl border-2 border-slate-100 bg-white p-5 shadow-pop-sm dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="mb-1 flex items-center gap-2">
              <span className="text-2xl">{level.emoji}</span>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">
                {level.title}
              </h2>
            </div>
            {level.intro && (
              <p className="mb-4 font-bold text-slate-500 dark:text-slate-400">
                {level.intro}
              </p>
            )}
            <ul className="flex flex-col gap-2.5">
              {level.entries.map((entry, j) => (
                <Entry key={j} entry={entry} accent={section.accent} />
              ))}
            </ul>
          </section>
        ))}

        {/* Tip */}
        {guide.tip && (
          <div className="flex items-start gap-3 rounded-3xl border-2 border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/40">
            <Lightbulb className="mt-0.5 size-6 shrink-0 fill-amber-300 text-amber-500" />
            <p className="font-bold text-amber-900 dark:text-amber-200">
              <span className="font-black">Tip de Ludema: </span>
              {guide.tip}
            </p>
          </div>
        )}
      </div>

      {/* Acción inferior */}
      {firstLessonId && (
        <footer className="fixed inset-x-0 bottom-0 border-t border-slate-200 bg-background/90 backdrop-blur dark:border-slate-700">
          <div className="mx-auto max-w-2xl px-4 py-4">
            <Link href={`/lesson/${firstLessonId}`} className="block">
              <span
                className={cn(
                  "block w-full rounded-2xl border-b-4 px-6 py-3 text-center font-extrabold uppercase tracking-wide text-white transition active:translate-y-0.5 active:border-b-2",
                  a.bg,
                  a.border,
                )}
              >
                Empezar lección
              </span>
            </Link>
          </div>
        </footer>
      )}
    </div>
  );
}

function Entry({
  entry,
  accent,
}: {
  entry: GuideEntry;
  accent: Section["accent"];
}) {
  const a = ACCENT[accent];
  // Viñeta simple (solo texto).
  if (!entry.term && !entry.symbol) {
    return (
      <li className="flex gap-2 font-semibold text-slate-600 dark:text-slate-300">
        <span className={cn("mt-2 size-1.5 shrink-0 rounded-full", a.bg)} />
        <span>{entry.text}</span>
      </li>
    );
  }
  // Concepto destacado (símbolo + término + descripción).
  return (
    <li className="flex items-start gap-3">
      {entry.symbol && (
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-xl text-lg font-black text-white",
            a.bg,
          )}
        >
          {entry.symbol}
        </span>
      )}
      <span className="font-semibold text-slate-600 dark:text-slate-300">
        {entry.term && (
          <span className="font-black text-slate-800 dark:text-slate-100">
            {entry.term}:{" "}
          </span>
        )}
        {entry.text}
      </span>
    </li>
  );
}
