/**
 * Valida que los snippets de ejemplo en src/content/AUTHORING.md
 * sigan siendo válidos contra el schema (zod) y el motor lógico.
 *
 * Fase 4 del harness de IA: el doc se bindea directamente, sin duplicación,
 * de modo que un snippet stale rompa el build (pnpm check → exit 1).
 *
 * Diseño:
 *  - Lee AUTHORING.md, extrae los bloques ```ts, los evalúa como objetos JS.
 *  - Filtra a los que tienen un campo `type` reconocido (9 tipos de ejercicio).
 *  - Cada snippet se valida en su propia llamada a validateCurriculum para
 *    evitar falsos "ID duplicado" entre snippets distintos.
 *  - Solo se asevera sobre issues `level === "error"` — los warns de prefijo
 *    de ID son esperados (los snippets usan u1-..., la unidad envolvente no).
 */

import { describe, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateCurriculum } from "@/content/validate";
import type { Unit } from "@/content/types";

// ── Ruta al doc ───────────────────────────────────────────────────────────────

// src/content/eval/__tests__/ → ../../ → src/content/
const AUTHORING_PATH = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../AUTHORING.md",
);

// ── Los 9 tipos de ejercicio conocidos ───────────────────────────────────────

const EXERCISE_TYPES = [
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

type ExerciseType = (typeof EXERCISE_TYPES)[number];

// ── Extracción de bloques ```ts ───────────────────────────────────────────────

function extractTsBlocks(markdown: string): string[] {
  const blocks: string[] = [];
  const fence = /```ts\n([\s\S]*?)```/g;
  let m: RegExpExecArray | null;
  while ((m = fence.exec(markdown)) !== null) {
    blocks.push(m[1]);
  }
  return blocks;
}

/**
 * Evalúa un bloque TS como literal de objeto JS.
 * Soporta comentarios inline `//`, comas finales y caracteres unicode.
 */
function evalBlock(src: string, idx: number): Record<string, unknown> {
  try {
    return new Function(`return (${src})`)() as Record<string, unknown>;
  } catch (e) {
    throw new Error(
      `AUTHORING.md bloque #${idx}: no es un literal de objeto JS válido.\n` +
        `${e instanceof Error ? e.message : String(e)}\n\nContenido:\n${src}`,
    );
  }
}

function isExerciseObj(
  obj: Record<string, unknown>,
): obj is Record<string, unknown> & { type: ExerciseType } {
  return (
    typeof obj.type === "string" &&
    (EXERCISE_TYPES as readonly string[]).includes(obj.type)
  );
}

// ── Envolver en unidad mínima válida (patrón de validate.test.ts / eval.test.ts) ──

function wrapExercise(exercise: Record<string, unknown>, idx: number): Unit {
  const base = `authoring-snip${idx}`;
  return {
    id: base,
    title: "Snippet",
    subtitle: "AUTHORING.md",
    available: true,
    sections: [
      {
        id: `${base}-a`,
        title: "A",
        description: "Snippets del doc de autoría",
        accent: "blue",
        lessons: [
          {
            id: `${base}-a-l1`,
            title: "L1",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            exercises: [exercise as any],
          },
        ],
      },
    ],
  };
}

// ── Suite ─────────────────────────────────────────────────────────────────────

describe("AUTHORING.md snippets → schema + motor", () => {
  const markdown = fs.readFileSync(AUTHORING_PATH, "utf8");
  const rawBlocks = extractTsBlocks(markdown);

  // Evaluar todos los bloques y filtrar a ejercicios.
  const allObjs = rawBlocks.map((src, i) => evalBlock(src, i));
  const exercises = allObjs.filter(isExerciseObj);

  // Sanity: el doc debe seguir cubriendo los 9 tipos.
  // Si la extracción se rompe silenciosamente, este test lo detecta.
  it("cubre los 9 tipos de ejercicio (sanity de extracción)", () => {
    const found = new Set(exercises.map((e) => e.type));
    const missing = EXERCISE_TYPES.filter((t) => !found.has(t));
    if (missing.length > 0) {
      throw new Error(
        `Los siguientes tipos no aparecen en los snippets de AUTHORING.md: ${missing.join(", ")}\n` +
          `(Revisar que los bloques \`\`\`ts del doc sean evaluables y tengan campo "type")`,
      );
    }
  });

  // Un it por snippet: si un snippet falla, el mensaje identifica cuál y por qué.
  exercises.forEach((exercise, i) => {
    const label = `[${exercise.type}] ${String(exercise.id ?? "(sin id)")}`;
    it(`${label} — sin errores de validación`, () => {
      const wrapped = wrapExercise(exercise, i);
      const issues = validateCurriculum([wrapped]);
      const errors = issues.filter((iss) => iss.level === "error");
      if (errors.length > 0) {
        const detail = errors
          .map((iss) => `  ${iss.path}: ${iss.message}`)
          .join("\n");
        throw new Error(
          `Snippet ${label} en AUTHORING.md tiene ${errors.length} error(es) de validación:\n${detail}\n` +
            `\n→ Actualizá el snippet en src/content/AUTHORING.md para reflejar el schema actual.`,
        );
      }
    });
  });
});
