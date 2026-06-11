export type EquivalenceLaw = {
  name: string;
  formula: string;
  example?: string;
};

export type InferenceRule = {
  name: string;
  premises: string[];
  conclusion: string;
};

export const EQUIVALENCE_LAWS: EquivalenceLaw[] = [
  {
    name: "Involución (Doble Negación)",
    formula: "¬¬p ≡ p",
    example: "¬¬q ≡ q",
  },
  {
    name: "Idempotencia",
    formula: "p ∧ p ≡ p   ·   p ∨ p ≡ p",
  },
  {
    name: "Conmutativa",
    formula: "p ∧ q ≡ q ∧ p   ·   p ∨ q ≡ q ∨ p",
  },
  {
    name: "Asociativa",
    formula: "(p ∧ q) ∧ r ≡ p ∧ (q ∧ r)",
    example: "también para ∨",
  },
  {
    name: "Distributiva",
    formula: "p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)",
    example: "p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)",
  },
  {
    name: "De Morgan",
    formula: "¬(p ∧ q) ≡ ¬p ∨ ¬q   ·   ¬(p ∨ q) ≡ ¬p ∧ ¬q",
  },
  {
    name: "Absorción",
    formula: "p ∧ (p ∨ q) ≡ p   ·   p ∨ (p ∧ q) ≡ p",
  },
  {
    name: "Identidad (Neutro)",
    formula: "p ∧ V ≡ p   ·   p ∨ F ≡ p",
  },
  {
    name: "Dominación",
    formula: "p ∧ F ≡ F   ·   p ∨ V ≡ V",
  },
  {
    name: "Complementación",
    formula: "p ∧ ¬p ≡ F   ·   p ∨ ¬p ≡ V",
  },
  {
    name: "Definición de Condicional",
    formula: "p ⇒ q ≡ ¬p ∨ q",
  },
  {
    name: "Contrarrecíproco",
    formula: "p ⇒ q ≡ ¬q ⇒ ¬p",
  },
  {
    name: "Definición de Bicondicional",
    formula: "p ⇔ q ≡ (p ⇒ q) ∧ (q ⇒ p)",
    example: "p ⇔ q ≡ (¬p ∨ q) ∧ (¬q ∨ p)",
  },
];

export const INFERENCE_RULES: InferenceRule[] = [
  {
    name: "Modus Ponens (MP)",
    premises: ["p ⇒ q", "p"],
    conclusion: "q",
  },
  {
    name: "Modus Tollens (MT)",
    premises: ["p ⇒ q", "¬q"],
    conclusion: "¬p",
  },
  {
    name: "Silogismo Hipotético (SH)",
    premises: ["p ⇒ q", "q ⇒ r"],
    conclusion: "p ⇒ r",
  },
  {
    name: "Silogismo Disyuntivo (SD)",
    premises: ["p ∨ q", "¬p"],
    conclusion: "q",
  },
  {
    name: "Simplificación",
    premises: ["p ∧ q"],
    conclusion: "p",
  },
  {
    name: "Adición",
    premises: ["p"],
    conclusion: "p ∨ q",
  },
  {
    name: "Conjunción",
    premises: ["p", "q"],
    conclusion: "p ∧ q",
  },
];
