"use client";

import Link from "next/link";
import { Lock, BookOpen } from "lucide-react";
import { curriculum, allLessons } from "@/content";
import { useProgress } from "@/stores/progress";
import { ACCENT } from "@/lib/accent";
import { cn } from "@/lib/utils";
import { Hud } from "@/components/hud/Hud";
import { LessonNode, GoldBadge, type NodeState } from "./LessonNode";

// Sendero en zigzag: desplazamiento horizontal según la posición.
function offsetFor(i: number): number {
  return Math.round(Math.sin(i * 0.9) * 64);
}

export function LearningMap() {
  const completed = useProgress((s) => s.completedLessons);

  // Conjunto de lecciones desbloqueadas (la primera, o aquellas cuya anterior está completa).
  const unlocked = new Set<string>();
  allLessons.forEach((c, i) => {
    if (i === 0 || (c.prevLessonId && completed[c.prevLessonId])) {
      unlocked.add(c.lesson.id);
    }
  });

  function stateOf(id: string): NodeState {
    if (completed[id]) return "completed";
    if (unlocked.has(id)) return "current";
    return "locked";
  }

  // ¿La Unidad 1 está completamente dorada? -> habilita la Unidad 2.
  const unit1 = curriculum[0];
  const unit1Done = unit1.sections.every((s) =>
    s.lessons.every((l) => completed[l.id]),
  );

  return (
    <div className="mx-auto min-h-dvh w-full max-w-2xl px-4 pb-24">
      {/* Barra superior */}
      <header className="sticky top-0 z-10 -mx-4 mb-2 flex items-center justify-between border-b border-slate-200/70 bg-background/85 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧩</span>
          <span className="text-xl font-black tracking-tight text-slate-800">
            Ludema
          </span>
        </div>
        <Hud />
      </header>

      {/* Unidad 1 */}
      <div className="mb-2 mt-4 text-center">
        <h1 className="text-2xl font-black text-slate-800">{unit1.title}</h1>
        <p className="text-sm font-bold text-slate-500">{unit1.subtitle}</p>
      </div>

      {(() => {
        let running = 0; // índice global para el zigzag
        return unit1.sections.map((section) => {
          const a = ACCENT[section.accent];
          const gold = section.lessons.every((l) => completed[l.id]);
          return (
            <section key={section.id} className="mb-6">
              <div
                className={cn(
                  "sticky top-16 z-0 mb-4 flex items-center justify-between rounded-2xl border-b-4 px-4 py-3 text-white shadow-pop",
                  a.bg,
                  a.border,
                )}
              >
                <div>
                  <h2 className="text-lg font-black leading-tight">
                    {section.title}
                  </h2>
                  <p className="text-xs font-bold text-white/85">
                    {section.description}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {gold && <GoldBadge />}
                  {section.guide && (
                    <Link
                      href={`/guide/${section.id}`}
                      aria-label={`Ver la guía de ${section.title}`}
                      className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-extrabold text-white transition hover:bg-white/30"
                    >
                      <BookOpen className="size-4" /> Guía
                    </Link>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-center gap-6">
                {section.lessons.map((lesson) => {
                  const node = (
                    <LessonNode
                      key={lesson.id}
                      lessonId={lesson.id}
                      title={lesson.title}
                      subtitle={lesson.subtitle}
                      state={stateOf(lesson.id)}
                      accent={section.accent}
                      offset={offsetFor(running)}
                    />
                  );
                  running++;
                  return node;
                })}
              </div>
            </section>
          );
        });
      })()}

      {/* Unidad 2 (bloqueada) */}
      <section className="mt-8">
        <div
          className={cn(
            "rounded-2xl border-2 border-dashed border-slate-300 bg-white/60 px-5 py-6 text-center",
            !unit1Done && "opacity-80",
          )}
        >
          <div className="mb-1 flex items-center justify-center gap-2 text-slate-400">
            <Lock className="size-4" />
            <span className="text-xs font-extrabold uppercase tracking-wide">
              {unit1Done ? "¡Desbloqueada!" : "Bloqueada"}
            </span>
          </div>
          <h2 className="text-lg font-black text-slate-700">
            Unidad 2 · Conjuntos
          </h2>
          <p className="text-sm font-bold text-slate-400">
            {unit1Done
              ? "Muy pronto añadiremos más retos. ¡Sigue practicando!"
              : "Dora todas las secciones de la Unidad 1 para desbloquearla."}
          </p>
        </div>
      </section>
    </div>
  );
}
