"use client";

import Image from "next/image";
import { MotionConfig } from "motion/react";
import logo from "@/../public/logo.png";
import { SUBJECTS } from "@/content/subjects";
import { ThemeMenu } from "@/components/hud/ThemeMenu";
import { SubjectCard } from "./SubjectCard";

// Portada: elige la materia ("juego") que quieres aprender. El Hud completo
// (corazones/racha/nivel) vive dentro de cada materia, aquí solo el tema.
export function HomeLanding() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto min-h-dvh w-full max-w-3xl px-4 pb-24">
        {/* Barra superior mínima */}
        <header className="sticky top-0 z-20 -mx-4 flex items-center justify-between border-b border-slate-200/70 bg-background/85 px-4 py-3 backdrop-blur dark:border-slate-700/70">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="" priority className="size-9" />
            <span className="font-arcade text-xl font-black tracking-tight text-slate-800 dark:text-slate-100">
              Ludema
            </span>
          </div>
          <ThemeMenu />
        </header>

        {/* Héroe */}
        <div className="mb-8 mt-10 text-center">
          <Image src={logo} alt="" className="mx-auto mb-3 size-20" />
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">
            Aprende jugando
          </h1>
          <p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-400">
            Elige la materia que quieres dominar:
          </p>
        </div>

        {/* Grilla de materias */}
        <div className="grid gap-4 sm:grid-cols-2">
          {SUBJECTS.map((subject) => (
            <SubjectCard key={subject.slug} subject={subject} />
          ))}
        </div>
      </div>
    </MotionConfig>
  );
}
