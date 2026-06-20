import type { Materia } from "../types";
import { Brain } from "lucide-react";
import { unit1 } from "../unit1";
import { unit2 } from "../unit2";

export const logica: Materia = {
  id: "logica",
  slug: "logica",
  title: "Lógica y Estructuras Discretas",
  tagline: "Proposiciones, tablas de verdad, leyes y razonamientos.",
  accent: "blue",
  icon: Brain,
  available: true,
  units: [unit1, unit2],
};
