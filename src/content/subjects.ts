import type { LucideIcon } from "lucide-react";
import { Brain, Workflow, Sigma, Code2 } from "lucide-react";
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
    title: "Lógica y Estructuras Discretas",
    tagline: "Proposiciones, tablas de verdad, leyes y razonamientos.",
    accent: "blue",
    icon: Brain,
    available: true,
  },
  {
    slug: "sistemas-y-procesos-de-negocio",
    title: "Sistemas y Procesos de Negocio",
    tagline: "Cómo las organizaciones modelan sus sistemas y procesos.",
    accent: "cyan",
    icon: Workflow,
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
    slug: "algoritmos-y-estructura-de-datos",
    title: "Algoritmos y Estructura de Datos",
    tagline: "Piensa como programador: algoritmos, listas, pilas y árboles.",
    accent: "indigo",
    icon: Code2,
    available: false,
  },
];

export function subjectHref(subject: Subject): string {
  return `/${subject.slug}`;
}
