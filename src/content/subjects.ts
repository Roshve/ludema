import type { LucideIcon } from "lucide-react";
import { Brain, Network, Sigma, Code2 } from "lucide-react";
import type { Accent } from "@/lib/accent";

// Materias ("juegos") que ofrece la portada. Cuando una materia futura esté
// lista: poner available: true y crear su ruta src/app/<slug>/page.tsx.
export type Subject = {
  /** Slug en español; también es la ruta (/<slug>). */
  slug: string;
  title: string;
  tagline: string;
  accent: Accent;
  icon: LucideIcon;
  /** false → tarjeta "Próximamente" sin link. */
  available: boolean;
};

export const SUBJECTS: Subject[] = [
  {
    slug: "logica",
    title: "Lógica",
    tagline: "Proposiciones, tablas de verdad, leyes y razonamientos.",
    accent: "blue",
    icon: Brain,
    available: true,
  },
  {
    slug: "sistemas-e-informacion",
    title: "Sistemas e Información",
    tagline: "Sistemas, datos e información: cómo se organizan y fluyen.",
    accent: "cyan",
    icon: Network,
    available: false,
  },
  {
    slug: "algebra-y-geometria-analitica",
    title: "Álgebra y Geometría Analítica",
    tagline: "Vectores, matrices, rectas y cónicas paso a paso.",
    accent: "violet",
    icon: Sigma,
    available: false,
  },
  {
    slug: "algoritmos-y-programacion",
    title: "Algoritmos y Programación",
    tagline: "Piensa como programador: secuencias, decisiones y bucles.",
    accent: "indigo",
    icon: Code2,
    available: false,
  },
];

export function subjectHref(subject: Subject): string {
  return `/${subject.slug}`;
}
