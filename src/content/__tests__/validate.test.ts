import { describe, it, expect } from "vitest";
import { validateCurriculum, type Issue } from "../validate";
import { curriculum } from "../index";

// Formatea los issues para mensajes de fallo legibles.
function formatIssues(issues: Issue[]): string {
  return issues
    .map((iss) => `  [${iss.level.toUpperCase()}] ${iss.path}: ${iss.message}`)
    .join("\n");
}

describe("validateCurriculum", () => {
  it("no produce errores en el currículo actual", () => {
    const issues = validateCurriculum();
    const errors = issues.filter((i) => i.level === "error");

    if (errors.length > 0) {
      throw new Error(
        `Se encontraron ${errors.length} error(es) en el currículo:\n${formatIssues(errors)}\n` +
          `(${issues.filter((i) => i.level === "warn").length} advertencias adicionales)`,
      );
    }
  });

  it("detecta IDs duplicados", () => {
    // Construimos una unidad mínima con un ID duplicado a propósito.
    const fakeUnit = {
      id: "test-dup",
      title: "Test",
      subtitle: "Test",
      available: true,
      sections: [
        {
          id: "test-dup-s",
          title: "S",
          description: "Desc",
          accent: "blue" as const,
          lessons: [
            {
              id: "test-dup-s-l1",
              title: "L1",
              exercises: [
                {
                  id: "test-dup-s-l1-e1",
                  type: "concept" as const,
                  prompt: "Concepto A",
                  body: ["Párrafo A"],
                },
                {
                  // ID duplicado del anterior.
                  id: "test-dup-s-l1-e1",
                  type: "concept" as const,
                  prompt: "Concepto B",
                  body: ["Párrafo B"],
                },
              ],
            },
          ],
        },
      ],
    };

    const issues = validateCurriculum([fakeUnit]);
    const dupErrors = issues.filter(
      (i) => i.level === "error" && i.message.includes("duplicado"),
    );
    expect(dupErrors.length).toBeGreaterThan(0);
  });

  it("detecta fórmulas no parseables", () => {
    const fakeUnit = {
      id: "test-parse",
      title: "Test",
      subtitle: "Test",
      available: true,
      sections: [
        {
          id: "test-parse-s",
          title: "S",
          description: "Desc",
          accent: "blue" as const,
          lessons: [
            {
              id: "test-parse-s-l1",
              title: "L1",
              exercises: [
                {
                  id: "test-parse-s-l1-e1",
                  type: "classify" as const,
                  prompt: "Clasifica",
                  formula: "p ∧ ∧ q", // fórmula inválida
                },
              ],
            },
          ],
        },
      ],
    };

    const issues = validateCurriculum([fakeUnit]);
    const parseErrors = issues.filter(
      (i) => i.level === "error" && i.message.includes("parseable"),
    );
    expect(parseErrors.length).toBeGreaterThan(0);
  });

  it("detecta contraejemplo de argumento válido", () => {
    const fakeUnit = {
      id: "test-ce",
      title: "Test",
      subtitle: "Test",
      available: true,
      sections: [
        {
          id: "test-ce-s",
          title: "S",
          description: "Desc",
          accent: "blue" as const,
          lessons: [
            {
              id: "test-ce-s-l1",
              title: "L1",
              exercises: [
                {
                  id: "test-ce-s-l1-e1",
                  type: "counterexample" as const,
                  prompt: "Encuentra el contraejemplo",
                  // Modus Ponens es VÁLIDO: no puede tener contraejemplo.
                  premises: ["p ⇒ q", "p"],
                  conclusion: "q",
                  variables: ["p", "q"],
                },
              ],
            },
          ],
        },
      ],
    };

    const issues = validateCurriculum([fakeUnit]);
    const validArgErrors = issues.filter(
      (i) => i.level === "error" && i.message.includes("VÁLIDO"),
    );
    expect(validArgErrors.length).toBe(1);
  });

  it("detecta steps no equivalentes en simplify-steps", () => {
    const fakeUnit = {
      id: "test-simp",
      title: "Test",
      subtitle: "Test",
      available: true,
      sections: [
        {
          id: "test-simp-s",
          title: "S",
          description: "Desc",
          accent: "blue" as const,
          lessons: [
            {
              id: "test-simp-s-l1",
              title: "L1",
              exercises: [
                {
                  id: "test-simp-s-l1-e1",
                  type: "simplify-steps" as const,
                  prompt: "Simplifica",
                  start: "p ∧ q",
                  steps: [
                    {
                      options: ["De Morgan", "Doble negación"],
                      correctIndex: 0,
                      // p ∨ q no es equivalente a p ∧ q.
                      result: "p ∨ q",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    const issues = validateCurriculum([fakeUnit]);
    const equivErrors = issues.filter(
      (i) => i.level === "error" && i.message.includes("equivalente"),
    );
    expect(equivErrors.length).toBe(1);
  });

  it("currículo tiene al menos 1 unidad disponible con lecciones", () => {
    const availableUnits = curriculum.filter((u) => u.available);
    expect(availableUnits.length).toBeGreaterThan(0);
    const totalLessons = availableUnits.flatMap((u) =>
      u.sections.flatMap((s) => s.lessons),
    ).length;
    expect(totalLessons).toBeGreaterThan(0);
  });
});
