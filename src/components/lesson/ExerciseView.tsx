"use client";

import type { Exercise } from "@/content/types";
import type { AnswerState } from "./types";
import { TapProposition } from "./exercises/TapProposition";
import { MultipleChoice } from "./exercises/MultipleChoice";
import { BuildExpression } from "./exercises/BuildExpression";
import { TruthTable } from "./exercises/TruthTable";
import { Classify } from "./exercises/Classify";
import { SimplifySteps } from "./exercises/SimplifySteps";
import { Counterexample } from "./exercises/Counterexample";

export function ExerciseView({
  exercise,
  checked,
  onAnswer,
  requestCheck,
}: {
  exercise: Exercise;
  checked: boolean;
  onAnswer: (a: AnswerState) => void;
  requestCheck?: () => void;
}) {
  const common = { checked, onAnswer, requestCheck };
  switch (exercise.type) {
    case "tap-proposition":
      return <TapProposition exercise={exercise} {...common} />;
    case "multiple-choice":
      return <MultipleChoice exercise={exercise} {...common} />;
    case "build-expression":
      return <BuildExpression exercise={exercise} {...common} />;
    case "truth-table":
      return <TruthTable exercise={exercise} {...common} />;
    case "classify":
      return <Classify exercise={exercise} {...common} />;
    case "simplify-steps":
      return <SimplifySteps exercise={exercise} {...common} />;
    case "counterexample":
      return <Counterexample exercise={exercise} {...common} />;
  }
}
