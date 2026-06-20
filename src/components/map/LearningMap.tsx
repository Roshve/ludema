"use client";

import Link from "next/link";
import { Lock, BookOpen, Dumbbell, Table2 } from "lucide-react";
import { MotionConfig } from "motion/react";
import { allLessons, curriculumDeMateria } from "@/content";
import { useProgress } from "@/stores/progress";
import { useHydrated } from "@/hooks/useHydrated";
import { ACCENT } from "@/lib/accent";
import { cn } from "@/lib/utils";
import { Hud } from "@/components/hud/Hud";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { LessonNode, GoldBadge, type NodeState } from "./LessonNode";
import { JumpToCurrentButton } from "./JumpToCurrentButton";

// Sendero en zigzag: desplazamiento horizontal según la posición.
function offsetFor(i: number): number {
  return Math.round(Math.sin(i * 0.9) * 64);
}

export function LearningMap({ slug }: { slug: string }) {
  const hydrated = useHydrated();
  const completed = useProgress((s) => s.completedLessons);
  const missedCount = useProgress((s) => s.missedExercises.length);

  // Unidades normalizadas (IDs prefijados) de esta materia.
  const units = curriculumDeMateria(slug);

  // Conjunto de lecciones desbloqueadas (secuencial global).
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

  // Primera lección de esta materia aún no completada ("lección actual").
  const currentLesson = allLessons.find(
    (c) => c.materia.slug === slug && !completed[c.lesson.id],
  );
  const currentAccent = currentLesson?.section.accent;

  // ¿La unidad anterior está completamente dorada?
  function isPrevUnitDone(unitIndex: number): boolean {
    if (unitIndex === 0) return true;
    const prevUnit = units[unitIndex - 1];
    if (!prevUnit) return false;
    return prevUnit.sections.every((s) =>
      s.lessons.every((l) => completed[l.id]),
    );
  }

  // Contador global de zigzag (continuo a través de todas las secciones).
  let zigzagCounter = 0;

  return (
    <MotionConfig reducedMotion="user">
    <div className="mx-auto min-h-dvh w-full max-w-2xl px-4 pb-24">
      {/* Barra superior */}
      <header className="sticky top-0 z-20 -mx-4 mb-2 flex items-center justify-between border-b border-slate-200/70 bg-background/85 px-4 py-3 backdrop-blur dark:border-slate-700/70">
        <Link href="/" aria-label="Volver al inicio" className="flex items-center gap-2">
          <BrandLogo priority className="size-9" />
          <span className="font-arcade text-xl font-black tracking-tight text-slate-800 dark:text-slate-100">
            Ludema
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/tools"
            aria-label="Generador de tablas de verdad"
            className="flex items-center rounded-full bg-white p-2 text-slate-500 shadow-pop-sm transition active:translate-y-0.5 dark:bg-slate-800 dark:text-slate-300"
          >
            <Table2 className="size-5" />
          </Link>
          <Hud />
        </div>
      </header>

      {/* Unidades de la materia */}
      {units.map((unit, ui) => {
        const prevDone = isPrevUnitDone(ui);

        if (!prevDone) {
          const prevUnit = units[ui - 1];
          return (
            <section key={unit.id} className="mt-8">
              <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white/60 px-5 py-6 text-center opacity-80 dark:border-slate-600 dark:bg-slate-800/60">
                <div className="mb-1 flex items-center justify-center gap-2 text-slate-400">
                  <Lock className="size-4" />
                  <span className="text-xs font-extrabold uppercase tracking-wide">
                    Bloqueada
                  </span>
                </div>
                <h2 className="text-lg font-black text-slate-700 dark:text-slate-200">
                  {unit.title}
                </h2>
                <p className="text-sm font-bold text-slate-400">
                  Dora todas las secciones de {prevUnit?.title ?? "la unidad anterior"} para desbloquearla.
                </p>
              </div>
            </section>
          );
        }

        return (
          <div key={unit.id}>
            <div className="mb-2 mt-4 text-center">
              <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100">
                {unit.title}
              </h1>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                {unit.subtitle}
              </p>
            </div>

            {unit.sections.map((section) => {
              const a = ACCENT[section.accent];
              const gold = section.lessons.every((l) => completed[l.id]);
              return (
                <section key={section.id} className="mb-6">
                  <div
                    className={cn(
                      "sticky top-16 z-10 mb-4 flex items-center justify-between rounded-2xl border-b-4 px-4 py-3 text-white shadow-pop",
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
                      const nodeIndex = zigzagCounter++;
                      return (
                        <LessonNode
                          key={lesson.id}
                          lessonId={lesson.id}
                          title={lesson.title}
                          subtitle={lesson.subtitle}
                          state={stateOf(lesson.id)}
                          accent={section.accent}
                          offset={offsetFor(nodeIndex)}
                        />
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        );
      })}

      {/* Volver a la lección actual cuando queda fuera de pantalla. */}
      {hydrated && currentLesson && currentAccent && (
        <JumpToCurrentButton
          lessonId={currentLesson.lesson.id}
          accent={currentAccent}
        />
      )}

      {/* Práctica: repaso de lecciones completadas, priorizando errores. */}
      {hydrated && Object.keys(completed).length > 0 && (
        <Link
          href="/practice"
          aria-label="Práctica: repasa lo aprendido"
          className="fixed bottom-6 right-6 z-30 rounded-full border-b-4 border-emerald-700 bg-emerald-500 p-4 text-white shadow-pop transition active:translate-y-0.5 active:border-b-2"
        >
          <Dumbbell className="size-6" />
          {missedCount > 0 && (
            <span className="absolute -right-1 -top-1 grid min-w-6 place-items-center rounded-full bg-rose-500 px-1.5 py-0.5 text-xs font-black">
              {missedCount}
            </span>
          )}
        </Link>
      )}
    </div>
    </MotionConfig>
  );
}

