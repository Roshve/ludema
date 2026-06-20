import type { Materia } from "../types";
import { Workflow, Sigma, Code2 } from "lucide-react";
import { logica } from "./logica";

export { logica };

// Registro completo de materias. Las disponibles (available: true) tienen
// unidades y contenido; las restantes son stubs "Próximamente".
export const MATERIAS: Materia[] = [
  logica,
  {
    id: "sistemas-y-procesos-de-negocio",
    slug: "sistemas-y-procesos-de-negocio",
    title: "Sistemas y Procesos de Negocio",
    tagline: "Cómo las organizaciones modelan sus sistemas y procesos.",
    accent: "cyan",
    icon: Workflow,
    available: false,
    units: [],
  },
  {
    id: "algebra-y-geometria-analitica",
    slug: "algebra-y-geometria-analitica",
    title: "Álgebra y Geometría Analítica",
    tagline: "Vectores, matrices, rectas y cónicas paso a paso.",
    accent: "violet",
    icon: Sigma,
    available: false,
    units: [],
  },
  {
    id: "algoritmos-y-estructura-de-datos",
    slug: "algoritmos-y-estructura-de-datos",
    title: "Algoritmos y Estructura de Datos",
    tagline: "Piensa como programador: algoritmos, listas, pilas y árboles.",
    accent: "indigo",
    icon: Code2,
    available: false,
    units: [],
  },
];
