import { describe, it, expect } from "vitest";
import { scoreUnits, goldenUnit, formatReport, formatReportJSON } from "../index";
import type { Unit, MultipleChoiceExercise, TapPropositionExercise } from "@/content/types";

// ── helpers ───────────────────────────────────────────────────────────────────

/** Construye una unidad mínima válida con los ejercicios dados en una sola lección. */
function makeUnit(
  exercises: Array<Record<string, unknown>>,
  lessonId = "tst-a-l1",
): Unit {
  return {
    id: "tst",
    title: "Test",
    subtitle: "Test",
    available: true,
    sections: [
      {
        id: "tst-a",
        title: "A",
        description: "Desc",
        accent: "blue",
        lessons: [
          {
            id: lessonId,
            title: "L1",
            exercises: exercises as never,
          },
        ],
      },
    ],
  };
}

// ── golden calibration ────────────────────────────────────────────────────────

describe("goldenUnit", () => {
  it("score 100%: todos los casos del golden pasan", () => {
    const report = scoreUnits([goldenUnit], "golden");
    const failed = report.cases.filter((c) => !c.passed);

    if (failed.length > 0) {
      const detail = failed
        .map(
          (c) =>
            `  [${c.id}] ${c.type}\n` +
            c.metrics
              .filter((m) => m.status === "fail")
              .map((m) => `    ✗ ${m.metric}: ${m.detail ?? ""}`)
              .join("\n"),
        )
        .join("\n");
      throw new Error(
        `${failed.length} caso(s) del golden fallan:\n${detail}`,
      );
    }

    expect(report.summary.score).toBe(1);
  });

  it("cubre los 9 tipos de ejercicio", () => {
    const types = new Set(goldenUnit.sections.flatMap((s) =>
      s.lessons.flatMap((l) => l.exercises.map((e) => e.type)),
    ));
    const expected = [
      "concept",
      "tap-proposition",
      "multiple-choice",
      "build-expression",
      "truth-table",
      "classify",
      "simplify-steps",
      "counterexample",
      "deduction-steps",
    ] as const;
    for (const t of expected) {
      expect(types.has(t), `falta tipo "${t}" en el golden`).toBe(true);
    }
  });

  it("set-metric correctIndex-variety pasa en la lección con ≥2 MC", () => {
    const report = scoreUnits([goldenUnit], "golden");
    const variety = report.setMetrics.filter(
      (sm) => sm.metric === "correctIndex-variety" && sm.status === "pass",
    );
    expect(variety.length).toBeGreaterThan(0);
  });
});

// ── detección de degradaciones ────────────────────────────────────────────────

describe("scoreUnits detecta degradaciones", () => {
  it("explanation-present falla cuando falta la explanation", () => {
    const unit = makeUnit([
      {
        id: "tst-a-l1-e1",
        type: "multiple-choice",
        prompt: "Pregunta",
        options: ["A", "B", "C"],
        correctIndex: 0,
        // explanation ausente a propósito
      },
    ]);
    const report = scoreUnits([unit], "test");
    const c = report.cases[0];
    const metric = c.metrics.find((m) => m.metric === "explanation-present");
    expect(metric?.status).toBe("fail");
    expect(c.passed).toBe(false);
  });

  it("explanation-substantive falla cuando explanation es demasiado corta", () => {
    const unit = makeUnit([
      {
        id: "tst-a-l1-e1",
        type: "classify",
        prompt: "Clasifica",
        formula: "p ∧ q",
        explanation: "OK", // menos de 20 chars
      },
    ]);
    const report = scoreUnits([unit], "test");
    const c = report.cases[0];
    const metric = c.metrics.find((m) => m.metric === "explanation-substantive");
    expect(metric?.status).toBe("fail");
  });

  it("build-has-distractors falla cuando bank = answer sin extras", () => {
    const unit = makeUnit([
      {
        id: "tst-a-l1-e1",
        type: "build-expression",
        prompt: "Construye p ∧ q",
        bank: ["p", "∧", "q"],
        answer: ["p", "∧", "q"], // bank.length === answer.length → sin distractores
        explanation: "La conjunción p ∧ q solo es verdadera cuando ambas son verdaderas.",
      },
    ]);
    const report = scoreUnits([unit], "test");
    const c = report.cases[0];
    const metric = c.metrics.find((m) => m.metric === "build-has-distractors");
    expect(metric?.status).toBe("fail");
  });

  it("tap-mixed falla cuando todos los items son proposiciones", () => {
    const unit = makeUnit([
      {
        id: "tst-a-l1-e1",
        type: "tap-proposition",
        prompt: "Toca las proposiciones",
        items: [
          { text: "2 + 2 = 4", isProposition: true },
          { text: "La Tierra es redonda.", isProposition: true },
        ],
        explanation: "Ambas afirman algo verdadero o falso: son proposiciones.",
      } satisfies TapPropositionExercise,
    ]);
    const report = scoreUnits([unit], "test");
    const c = report.cases[0];
    const metric = c.metrics.find((m) => m.metric === "tap-mixed");
    expect(metric?.status).toBe("fail");
  });

  it("mc-enough-options falla con solo 2 opciones", () => {
    const unit = makeUnit([
      {
        id: "tst-a-l1-e1",
        type: "multiple-choice",
        prompt: "¿Verdadero o falso?",
        options: ["Verdadero", "Falso"],
        correctIndex: 0,
        explanation: "Una opción es correcta y la otra incorrecta en este contexto.",
      } satisfies MultipleChoiceExercise,
    ]);
    const report = scoreUnits([unit], "test");
    const c = report.cases[0];
    const metric = c.metrics.find((m) => m.metric === "mc-enough-options");
    expect(metric?.status).toBe("fail");
  });

  it("id-prefix falla cuando el ID no empieza con lessonId", () => {
    const unit = makeUnit([
      {
        id: "otro-prefijo-e1", // no empieza con "tst-a-l1"
        type: "multiple-choice",
        prompt: "Pregunta",
        options: ["A", "B", "C"],
        correctIndex: 1,
        explanation: "La respuesta B es correcta en este caso de prueba de prefijos.",
      } satisfies MultipleChoiceExercise,
    ]);
    const report = scoreUnits([unit], "test");
    const c = report.cases[0];
    const metric = c.metrics.find((m) => m.metric === "id-prefix");
    expect(metric?.status).toBe("fail");
  });

  it("correctIndex-variety falla cuando todos los MC tienen el mismo índice", () => {
    const unit = makeUnit([
      {
        id: "tst-a-l1-e1",
        type: "multiple-choice",
        prompt: "Primera pregunta",
        options: ["Correcta", "Incorrecta A", "Incorrecta B"],
        correctIndex: 0,
        explanation: "La primera opción es la única correcta aquí.",
      },
      {
        id: "tst-a-l1-e2",
        type: "multiple-choice",
        prompt: "Segunda pregunta",
        options: ["Correcta también", "Incorrecta A", "Incorrecta B"],
        correctIndex: 0, // mismos que e1 → sin variedad
        explanation: "La primera opción es también la correcta en este segundo caso.",
      },
    ]);
    const report = scoreUnits([unit], "test");
    const variety = report.setMetrics.find(
      (sm) => sm.metric === "correctIndex-variety",
    );
    expect(variety?.status).toBe("fail");
  });

  it("correctIndex-variety es n/a con menos de 2 MC en la lección", () => {
    const unit = makeUnit([
      {
        id: "tst-a-l1-e1",
        type: "multiple-choice",
        prompt: "Única pregunta",
        options: ["A", "B", "C"],
        correctIndex: 0,
        explanation: "La opción A es correcta en este único ejercicio de la lección.",
      },
    ]);
    const report = scoreUnits([unit], "test");
    const variety = report.setMetrics.find(
      (sm) => sm.metric === "correctIndex-variety",
    );
    expect(variety?.status).toBe("n/a");
  });
});

// ── determinismo del reporte ──────────────────────────────────────────────────

describe("formatReport / formatReportJSON", () => {
  it("formatReport es determinista: misma entrada → misma salida", () => {
    const r1 = scoreUnits([goldenUnit], "golden");
    const r2 = scoreUnits([goldenUnit], "golden");
    expect(formatReport(r1)).toBe(formatReport(r2));
  });

  it("formatReportJSON es determinista y parseable", () => {
    const r = scoreUnits([goldenUnit], "golden");
    const json1 = formatReportJSON(r);
    const json2 = formatReportJSON(r);
    expect(json1).toBe(json2);
    expect(() => JSON.parse(json1)).not.toThrow();
  });

  it("formatReport contiene el suiteName y el resumen", () => {
    const report = scoreUnits([goldenUnit], "golden");
    const text = formatReport(report);
    expect(text).toContain("EVAL REPORT — golden");
    expect(text).toContain("Resumen:");
  });

  it("concept tiene explanation-present como n/a (no evaluado)", () => {
    const report = scoreUnits([goldenUnit], "golden");
    const concept = report.cases.find((c) => c.type === "concept");
    expect(concept).toBeDefined();
    const m = concept!.metrics.find((m) => m.metric === "explanation-present");
    expect(m?.status).toBe("n/a");
  });
});
