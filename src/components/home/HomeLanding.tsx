"use client";

import { MotionConfig } from "motion/react";
import { CARRERAS, getMateria } from "@/content";
import { ThemeMenu } from "@/components/hud/ThemeMenu";
import { GitHubLink } from "@/components/ui/GitHubLink";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { SubjectCard } from "./SubjectCard";
import { APP_VERSION } from "@/lib/version";

// Portada: muestra Carrera → Año → Materias.
// El Hud completo (corazones/racha/nivel) vive dentro de cada materia.
export function HomeLanding() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto min-h-dvh w-full max-w-2xl px-4 pb-24">
        {/* Barra superior mínima */}
        <header className="sticky top-0 z-20 -mx-4 flex items-center justify-between border-b border-slate-200/70 bg-background/85 px-4 py-3 backdrop-blur dark:border-slate-700/70">
          <div className="flex items-center gap-2">
            <BrandLogo priority className="size-9" />
            <span className="font-arcade text-xl font-black tracking-tight text-slate-800 dark:text-slate-100">
              Ludema
            </span>
          </div>
          <div className="flex items-center gap-2">
            <GitHubLink />
            <ThemeMenu />
          </div>
        </header>

        {/* Héroe */}
        <div className="mb-8 mt-10 text-center">
          <BrandLogo className="mx-auto mb-3 size-20" />
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">
            Aprende jugando
          </h1>
          <p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-400">
            Elegí la materia que querés dominar:
          </p>
        </div>

        {/* Carreras → Años → Materias */}
        {CARRERAS.map((carrera) => (
          <div key={carrera.id} className="mb-8">
            <h2 className="mb-4 text-lg font-black text-slate-700 dark:text-slate-200">
              {carrera.nombre}
            </h2>

            {carrera.anios.map((anio) => {
              const materias = anio.materiaIds
                .map((id) => getMateria(id))
                .filter((m) => m !== undefined);

              return (
                <div key={anio.anio} className="mb-6">
                  <h3 className="mb-3 text-xs font-extrabold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    Año {anio.anio}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {materias.map((materia) => (
                      <SubjectCard key={materia.id} subject={materia} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <footer className="mt-12 text-center text-xs font-bold text-slate-400 dark:text-slate-500">
          Ludema v{APP_VERSION}
        </footer>
      </div>
    </MotionConfig>
  );
}
