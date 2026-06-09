import { truthColumn } from "./truthTable";

export type Classification = "tautologia" | "contradiccion" | "contingencia";

export const CLASSIFICATION_LABEL: Record<Classification, string> = {
  tautologia: "Tautología",
  contradiccion: "Contradicción",
  contingencia: "Contingencia",
};

// Clasifica una proposición compuesta según su tabla de verdad.
export function classify(formula: string): Classification {
  const col = truthColumn(formula);
  const allTrue = col.every((v) => v);
  const allFalse = col.every((v) => !v);
  if (allTrue) return "tautologia";
  if (allFalse) return "contradiccion";
  return "contingencia";
}
