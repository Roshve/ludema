// Modelo de contenido de Ludema.
// Jerarquía (portada): Carrera → Año → Materia → Unidad → Sección → Lección → Ejercicios.

import type { LucideIcon } from "lucide-react";

export type ExerciseBase = {
  id: string;
  /** Enunciado / instrucción mostrada al usuario. */
  prompt: string;
  /** Explicación opcional mostrada tras responder. */
  explanation?: string;
};

// "Tarjeta de concepto": teoría breve dentro de la lección, sin riesgo.
// No se comprueba ni afecta corazones, precisión o XP; el pie muestra solo
// «Continuar». El `prompt` hace de título de la tarjeta.
export type ConceptExercise = ExerciseBase & {
  type: "concept";
  /** Párrafos del cuerpo de la tarjeta. */
  body: string[];
  /** Ejemplo o fórmula destacada opcional. */
  example?: string;
};

// "Toca la Proposición": el usuario marca cuáles frases son proposiciones lógicas.
export type TapPropositionExercise = ExerciseBase & {
  type: "tap-proposition";
  items: { text: string; isProposition: boolean }[];
};

// Opción múltiple de respuesta única. Sirve para clasificación, De Morgan,
// identificar regla de inferencia, antecedente/consecuente, cuantificadores, etc.
export type MultipleChoiceExercise = ExerciseBase & {
  type: "multiple-choice";
  options: string[];
  correctIndex: number;
};

// "Traducir conectivos": construir una expresión simbólica arrastrando/tocando
// bloques desde un banco (que puede incluir distractores) hacia la respuesta.
export type BuildExpressionExercise = ExerciseBase & {
  type: "build-expression";
  /** Banco de bloques disponibles (se barajan al mostrar). */
  bank: string[];
  /** Secuencia correcta de bloques. */
  answer: string[];
};

// "Completar la tabla": se da una fórmula y el motor calcula la columna esperada.
export type TruthTableExercise = ExerciseBase & {
  type: "truth-table";
  formula: string;
};

// "Clasificación rápida": Tautología / Contradicción / Contingencia.
// El motor calcula la respuesta a partir de la fórmula. `timeLimit` opcional (seg).
export type ClassifyExercise = ExerciseBase & {
  type: "classify";
  formula: string;
  timeLimit?: number;
};

// "Arrastrar y simplificar": en cada paso el usuario elige la ley aplicada.
export type SimplifyStepsExercise = ExerciseBase & {
  type: "simplify-steps";
  start: string;
  steps: {
    /** Nombres de leyes entre las que elegir. */
    options: string[];
    correctIndex: number;
    /** Expresión resultante tras aplicar la ley correcta. */
    result: string;
  }[];
};

// "Detectar el error": asignar valores de verdad que hagan V las premisas y F la
// conclusión (contraejemplo). El motor valida la asignación.
export type CounterexampleExercise = ExerciseBase & {
  type: "counterexample";
  premises: string[];
  conclusion: string;
  /** Variables a asignar, en orden de presentación. */
  variables: string[];
};

// "Deducción formal": derivación línea a línea. Las premisas van numeradas
// (1..n) y cada paso muestra la línea derivada; el usuario elige la regla de
// inferencia que la justifica.
export type DeductionStepsExercise = ExerciseBase & {
  type: "deduction-steps";
  /** Premisas numeradas mostradas como punto de partida. */
  premises: string[];
  steps: {
    /** Nombres de reglas entre las que elegir. */
    options: string[];
    correctIndex: number;
    /** Línea derivada al aplicar la regla correcta. */
    result: string;
    /** Líneas de las que se obtiene, p. ej. "de 1 y 2". */
    from?: string;
  }[];
};

export type Exercise =
  | ConceptExercise
  | TapPropositionExercise
  | MultipleChoiceExercise
  | BuildExpressionExercise
  | TruthTableExercise
  | ClassifyExercise
  | SimplifyStepsExercise
  | CounterexampleExercise
  | DeductionStepsExercise;

export type ExerciseType = Exercise["type"];

export type Lesson = {
  id: string;
  title: string;
  subtitle?: string;
  exercises: Exercise[];
};

// ── Mini-guía de sección (estilo "guidebook" de Duolingo) ───────────────────

// Una entrada de guía. Con `term`/`symbol` se renderiza como concepto destacado
// (badge del símbolo + término en negrita); solo con `text`, como viñeta normal.
export type GuideEntry = { term?: string; symbol?: string; text: string };

export type GuideLevel = {
  emoji: string;
  title: string;
  intro?: string;
  entries: GuideEntry[];
};

export type SectionGuide = {
  levels: GuideLevel[];
  tip?: string;
};

export type Section = {
  id: string;
  title: string;
  description: string;
  /** Clase de color base (define el acento visual de la sección). */
  accent: "blue" | "cyan" | "violet" | "indigo" | "fuchsia";
  /** Mini-guía teórica opcional de la sección. */
  guide?: SectionGuide;
  lessons: Lesson[];
};

export type Unit = {
  id: string;
  title: string;
  subtitle: string;
  /** Unidades futuras pueden venir bloqueadas / "próximamente". */
  available: boolean;
  sections: Section[];
};

// ── Modelo multi-materia: Carrera → Año → Materia ─────────────────────────────

/**
 * Una materia ("juego") — entidad reusable con slug y progreso propios.
 * Dos carreras que comparten una materia comparten el mismo progreso.
 * `id` y `slug` son iguales (se usa slug en la ruta `/materia/<slug>`).
 */
export type Materia = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  /** Mismo tipo que Section["accent"]; evita importar accent.ts (sería circular). */
  accent: Section["accent"];
  icon: LucideIcon;
  /** false → tarjeta "Próximamente"; units puede ser vacío. */
  available: boolean;
  units: Unit[];
};

/** Año dentro de una carrera: lista de materiaIds que le pertenecen. */
// Nota: usamos `anio` (ASCII) por consistencia con tooling;
// la presentación puede mostrar "Año".
export type Anio = { anio: number; materiaIds: string[] };

/** Carrera universitaria. Agrupa años → materias en la portada. */
export type Carrera = {
  id: string;
  slug: string;
  nombre: string;
  anios: Anio[];
};
