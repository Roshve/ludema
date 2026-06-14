/**
 * Suite de evaluación de contenido — Fase 3 del harness IA de Ludema.
 *
 * Puntúa heurísticas de CALIDAD pedagógica que el validador (`validate.ts`)
 * deja fuera deliberadamente. El validador es el piso de correctitud;
 * esta suite es el techo de calidad.
 *
 * Las métricas cubren tres brechas que un cambio de prompt/modelo puede degradar
 * sin que `pnpm validate:content` lo detecte:
 *   1. `explanation` es opcional en zod — ejercicios evaluados sin explicación pasan.
 *   2. Variedad de `correctIndex` no se chequea (AUTHORING.md §Estilo lo advierte).
 *   3. Heurísticas de calidad por tipo: distractores, items mixtos, opciones suficientes.
 *
 * Uso:
 *   import { scoreUnits } from "@/content/eval";
 *   const report = scoreUnits([goldenUnit], "golden");
 *
 * IMPORTANTE: importar solo desde tests y scripts/, nunca desde código de app.
 */

import { validateCurriculum } from "@/content/validate";
import type {
  Unit,
  Exercise,
  ExerciseType,
  MultipleChoiceExercise,
  BuildExpressionExercise,
  TapPropositionExercise,
} from "@/content/types";

// ── Tipos públicos ────────────────────────────────────────────────────────────

export type MetricStatus = "pass" | "fail" | "n/a";

export type MetricResult = {
  metric: string;
  status: MetricStatus;
  /** Detalle adicional cuando status es "fail" o "n/a" informativo. */
  detail?: string;
};

export type SetMetricResult = MetricResult & {
  /** ID de la lección a la que pertenece esta métrica de conjunto. */
  lessonId: string;
};

export type CaseResult = {
  id: string;
  type: ExerciseType;
  lessonId: string;
  metrics: MetricResult[];
  /** true si todas las métricas aplicables (status ≠ "n/a") son "pass". */
  passed: boolean;
};

export type EvalReport = {
  suiteName: string;
  /** Casos ordenados por id para diffs deterministas. */
  cases: CaseResult[];
  /** Métricas a nivel lección (ej: variedad de correctIndex). */
  setMetrics: SetMetricResult[];
  summary: {
    total: number;
    passed: number;
    failed: number;
    /** Ratio pass / applicable sobre casos + set-metrics combinados. */
    score: number;
    byMetric: Record<string, { pass: number; applicable: number }>;
  };
};

// ── Orden canónico de métricas (para salida determinista) ─────────────────────

const EXERCISE_METRIC_ORDER: string[] = [
  "structural-valid",
  "explanation-present",
  "explanation-substantive",
  "id-prefix",
  "mc-enough-options",
  "build-has-distractors",
  "tap-mixed",
];

const SET_METRIC_ORDER: string[] = ["correctIndex-variety"];

// ── Métricas por ejercicio ────────────────────────────────────────────────────

function computeExerciseMetrics(
  exercise: Exercise,
  lessonId: string,
  errorIds: Set<string>,
): MetricResult[] {
  const { type } = exercise;
  const isEvaluated = type !== "concept";
  const results: MetricResult[] = [];

  // ── structural-valid ──────────────────────────────────────────────────────
  // Heredado del validador: pasa si no hay ningún [error] para este ID.
  results.push({
    metric: "structural-valid",
    status: errorIds.has(exercise.id) ? "fail" : "pass",
    detail: errorIds.has(exercise.id)
      ? "hay errores estructurales (ver pnpm validate:content)"
      : undefined,
  });

  // ── explanation-present ───────────────────────────────────────────────────
  // N/A para `concept` (tarjeta de teoría, sin evaluación).
  if (!isEvaluated) {
    results.push({ metric: "explanation-present", status: "n/a" });
  } else {
    const present =
      typeof exercise.explanation === "string" &&
      exercise.explanation.length > 0;
    results.push({
      metric: "explanation-present",
      status: present ? "pass" : "fail",
      detail: present ? undefined : "explanation ausente",
    });
  }

  // ── explanation-substantive ───────────────────────────────────────────────
  // N/A para `concept` o cuando explanation está ausente (ya penalizado arriba).
  if (!isEvaluated || !exercise.explanation) {
    results.push({ metric: "explanation-substantive", status: "n/a" });
  } else {
    const exp = exercise.explanation;
    const tooShort = exp.length < 20;
    const sameAsPrompt = exp.trim() === exercise.prompt.trim();
    const substantive = !tooShort && !sameAsPrompt;
    results.push({
      metric: "explanation-substantive",
      status: substantive ? "pass" : "fail",
      detail: tooShort
        ? `muy corta (${exp.length} chars, mínimo 20)`
        : sameAsPrompt
          ? "explanation idéntica al prompt"
          : undefined,
    });
  }

  // ── id-prefix ─────────────────────────────────────────────────────────────
  // El validador lo marca [warn]; aquí es métrica de calidad cuantificable.
  const hasPrefix = exercise.id.startsWith(lessonId);
  results.push({
    metric: "id-prefix",
    status: hasPrefix ? "pass" : "fail",
    detail: hasPrefix
      ? undefined
      : `"${exercise.id}" debería comenzar con "${lessonId}"`,
  });

  // ── mc-enough-options ─────────────────────────────────────────────────────
  // Solo para `multiple-choice`. Zod exige ≥2; la práctica pedagógica pide ≥3.
  if (type !== "multiple-choice") {
    results.push({ metric: "mc-enough-options", status: "n/a" });
  } else {
    const mc = exercise as MultipleChoiceExercise;
    const enough = mc.options.length >= 3;
    results.push({
      metric: "mc-enough-options",
      status: enough ? "pass" : "fail",
      detail: enough
        ? undefined
        : `${mc.options.length} opciones (mínimo 3)`,
    });
  }

  // ── build-has-distractors ─────────────────────────────────────────────────
  // Solo para `build-expression`. Sin distractores el banco revela la respuesta.
  if (type !== "build-expression") {
    results.push({ metric: "build-has-distractors", status: "n/a" });
  } else {
    const bx = exercise as BuildExpressionExercise;
    const hasDistractors = bx.bank.length > bx.answer.length;
    results.push({
      metric: "build-has-distractors",
      status: hasDistractors ? "pass" : "fail",
      detail: hasDistractors
        ? undefined
        : `bank (${bx.bank.length}) = answer (${bx.answer.length}): sin distractores`,
    });
  }

  // ── tap-mixed ─────────────────────────────────────────────────────────────
  // Solo para `tap-proposition`. Necesita al menos un true y un false.
  if (type !== "tap-proposition") {
    results.push({ metric: "tap-mixed", status: "n/a" });
  } else {
    const tx = exercise as TapPropositionExercise;
    const hasTrue = tx.items.some((i) => i.isProposition);
    const hasFalse = tx.items.some((i) => !i.isProposition);
    const mixed = hasTrue && hasFalse;
    results.push({
      metric: "tap-mixed",
      status: mixed ? "pass" : "fail",
      detail: !hasTrue
        ? "no hay items con isProposition=true"
        : !hasFalse
          ? "no hay items con isProposition=false"
          : undefined,
    });
  }

  // Ordenar según EXERCISE_METRIC_ORDER para salida determinista.
  return results.sort(
    (a, b) =>
      EXERCISE_METRIC_ORDER.indexOf(a.metric) -
      EXERCISE_METRIC_ORDER.indexOf(b.metric),
  );
}

// ── Métricas de conjunto (nivel lección) ─────────────────────────────────────

function computeSetMetrics(lesson: {
  id: string;
  exercises: Exercise[];
}): SetMetricResult[] {
  // correctIndex-variety: solo para lecciones con ≥2 ejercicios multiple-choice.
  const mcExercises = lesson.exercises.filter(
    (e) => e.type === "multiple-choice",
  ) as MultipleChoiceExercise[];

  if (mcExercises.length < 2) {
    return [
      {
        metric: "correctIndex-variety",
        status: "n/a",
        lessonId: lesson.id,
        detail: `${mcExercises.length} ejercicio(s) MC (se requieren ≥2 para esta métrica)`,
      },
    ];
  }

  const indices = mcExercises.map((e) => e.correctIndex);
  const allSame = indices.every((i) => i === indices[0]);

  return [
    {
      metric: "correctIndex-variety",
      status: allSame ? "fail" : "pass",
      lessonId: lesson.id,
      detail: allSame
        ? `todos los correctIndex son ${indices[0]} en lección ${lesson.id}`
        : undefined,
    },
  ];
}

// ── Runner principal ──────────────────────────────────────────────────────────

/**
 * Puntúa un conjunto de unidades contra las métricas de calidad.
 *
 * @param units     Unidades a evaluar (p. ej. [goldenUnit] o [unit1]).
 * @param suiteName Nombre de la suite que aparece en el reporte.
 * @returns         EvalReport determinista y diff-able.
 */
export function scoreUnits(units: Unit[], suiteName: string): EvalReport {
  // 1. Ejecutar el validador una sola vez para obtener IDs con errores.
  const issues = validateCurriculum(units);
  const errorIds = new Set<string>(
    issues.filter((i) => i.level === "error").map((i) => i.path),
  );

  const cases: CaseResult[] = [];
  const setMetrics: SetMetricResult[] = [];

  // 2. Caminar la jerarquía Unit → Section → Lesson → Exercise.
  for (const unit of units) {
    for (const section of unit.sections) {
      for (const lesson of section.lessons) {
        // Métricas de conjunto por lección.
        setMetrics.push(...computeSetMetrics(lesson));

        // Métricas por ejercicio.
        for (const exercise of lesson.exercises) {
          const metrics = computeExerciseMetrics(
            exercise,
            lesson.id,
            errorIds,
          );
          const applicable = metrics.filter((m) => m.status !== "n/a");
          const passed = applicable.every((m) => m.status === "pass");
          cases.push({
            id: exercise.id,
            type: exercise.type,
            lessonId: lesson.id,
            metrics,
            passed,
          });
        }
      }
    }
  }

  // 3. Ordenar por id para determinismo (diff-able).
  cases.sort((a, b) => a.id.localeCompare(b.id));
  setMetrics.sort((a, b) =>
    a.lessonId !== b.lessonId
      ? a.lessonId.localeCompare(b.lessonId)
      : SET_METRIC_ORDER.indexOf(a.metric) -
        SET_METRIC_ORDER.indexOf(b.metric),
  );

  // 4. Calcular resumen.
  const total = cases.length;
  const passed = cases.filter((c) => c.passed).length;
  const failed = total - passed;

  const byMetric: Record<string, { pass: number; applicable: number }> = {};
  const allMetrics: { metric: string; status: MetricStatus }[] = [
    ...cases.flatMap((c) => c.metrics),
    ...setMetrics,
  ];

  for (const m of allMetrics) {
    if (m.status === "n/a") continue;
    if (!byMetric[m.metric]) byMetric[m.metric] = { pass: 0, applicable: 0 };
    byMetric[m.metric].applicable++;
    if (m.status === "pass") byMetric[m.metric].pass++;
  }

  const totalApplicable = Object.values(byMetric).reduce(
    (s, v) => s + v.applicable,
    0,
  );
  const totalPass = Object.values(byMetric).reduce(
    (s, v) => s + v.pass,
    0,
  );
  const score = totalApplicable === 0 ? 1 : totalPass / totalApplicable;

  return { suiteName, cases, setMetrics, summary: { total, passed, failed, score, byMetric } };
}
