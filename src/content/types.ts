// Modelo de contenido de Ludema.
// Jerarquía: Unidad → Sección → Lección → Ejercicios.

export type ExerciseBase = {
  id: string;
  /** Enunciado / instrucción mostrada al usuario. */
  prompt: string;
  /** Explicación opcional mostrada tras responder. */
  explanation?: string;
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

export type Exercise =
  | TapPropositionExercise
  | MultipleChoiceExercise
  | BuildExpressionExercise
  | TruthTableExercise
  | ClassifyExercise
  | SimplifyStepsExercise
  | CounterexampleExercise;

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
  accent: "green" | "purple" | "amber" | "sky" | "rose";
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
