/**
 * Harness de validación de contenido — Fase 1: Ciclo de validación.
 *
 * Tres capas:
 *   A) Estructura (zod)     — campos requeridos, tipos, rangos de índices.
 *   B) Unicidad de IDs      — colisiones silenciosas en los Map de index.ts.
 *   C) Semántica con motor  — fórmulas parseables, claves de respuesta correctas.
 *
 * Uso:
 *   import { validateCurriculum } from "@/content/validate";
 *   const issues = validateCurriculum();          // todo el currículo
 *   const issues = validateCurriculum([unit2]);   // solo una unidad
 *
 * IMPORTANTE: este archivo sólo debe importarse desde tests y scripts/,
 * nunca desde código de app (depende de devDeps: zod, y del motor que es puro).
 */

import { z } from "zod";
import { curriculum } from "./index";
import type { Unit } from "./types";
import { parse, collectVars } from "@/lib/logic/parser";
import { truthColumn } from "@/lib/logic/truthTable";
import { classify } from "@/lib/logic/classify";
import { findCounterexample } from "@/lib/logic/counterexample";
import { evaluate, allAssignments } from "@/lib/logic/evaluate";

// ── Tipo público ──────────────────────────────────────────────────────────────

export type Issue = {
  /** ID del nodo afectado (ejercicio, lección, sección, unidad),
   *  o ruta posicional si el ID está ausente. */
  path: string;
  level: "error" | "warn";
  message: string;
};

// ── Capa A: esquemas Zod ──────────────────────────────────────────────────────

const baseSchema = z.object({
  id: z.string().min(1, "id vacío"),
  prompt: z.string().min(1, "prompt vacío"),
  explanation: z.string().optional(),
});

const stepSchema = z.object({
  options: z.array(z.string()).min(2, "options debe tener al menos 2 entradas"),
  correctIndex: z.number().int().min(0),
  result: z.string().min(1, "result vacío"),
});

const exerciseSchema = z.discriminatedUnion("type", [
  baseSchema.extend({
    type: z.literal("concept"),
    body: z.array(z.string()).min(1, "body debe tener al menos 1 párrafo"),
    example: z.string().optional(),
  }),
  baseSchema.extend({
    type: z.literal("tap-proposition"),
    items: z
      .array(z.object({ text: z.string().min(1), isProposition: z.boolean() }))
      .min(1, "items debe tener al menos 1 entrada"),
  }),
  baseSchema.extend({
    type: z.literal("multiple-choice"),
    options: z.array(z.string()).min(2, "options debe tener al menos 2 opciones"),
    correctIndex: z.number().int().min(0),
  }),
  baseSchema.extend({
    type: z.literal("build-expression"),
    bank: z.array(z.string()).min(1, "bank vacío"),
    answer: z.array(z.string()).min(1, "answer vacía"),
  }),
  baseSchema.extend({
    type: z.literal("truth-table"),
    formula: z.string().min(1, "formula vacía"),
  }),
  baseSchema.extend({
    type: z.literal("classify"),
    formula: z.string().min(1, "formula vacía"),
    timeLimit: z.number().positive().optional(),
  }),
  baseSchema.extend({
    type: z.literal("simplify-steps"),
    start: z.string().min(1, "start vacío"),
    steps: z.array(stepSchema).min(1, "steps debe tener al menos 1 paso"),
  }),
  baseSchema.extend({
    type: z.literal("counterexample"),
    premises: z.array(z.string()).min(1, "premises vacías"),
    conclusion: z.string().min(1, "conclusion vacía"),
    variables: z.array(z.string()).min(1, "variables vacías"),
  }),
  baseSchema.extend({
    type: z.literal("deduction-steps"),
    premises: z.array(z.string()).min(1, "premises vacías"),
    steps: z
      .array(stepSchema.extend({ from: z.string().optional() }))
      .min(1, "steps debe tener al menos 1 paso"),
  }),
]);

// Schemas de campos propios de cada nivel jerárquico (sin recursar en hijos).
const unitFieldsSchema = z.object({
  id: z.string().min(1, "id vacío"),
  title: z.string().min(1, "title vacío"),
  subtitle: z.string().min(1, "subtitle vacío"),
  available: z.boolean(),
  sections: z.array(z.unknown()).min(1, "sections vacías"),
});

const sectionFieldsSchema = z.object({
  id: z.string().min(1, "id vacío"),
  title: z.string().min(1, "title vacío"),
  description: z.string().min(1, "description vacía"),
  accent: z.enum(["blue", "cyan", "violet", "indigo", "fuchsia"]),
  lessons: z.array(z.unknown()).min(1, "lessons vacías"),
});

const lessonFieldsSchema = z.object({
  id: z.string().min(1, "id vacío"),
  title: z.string().min(1, "title vacío"),
  subtitle: z.string().optional(),
  exercises: z.array(z.unknown()).min(1, "exercises vacíos"),
});

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Caracteres que el tokenizer proposicional reconoce. Cadenas que contienen
 * cualquier otro carácter (cuantificadores ∀∃, mayúsculas como A B o V F,
 * notación de conjuntos ∩∪⊆∅, constantes verdad V/F, etc.) pertenecen a
 * dominios no soportados por el motor y se excluyen del chequeo semántico.
 *
 * También se excluye la notación predicativa: `p(x)`, `e(a)`, etc. —
 * un patrón `letra(` que el parser proposicional no reconoce como llamada
 * de función, sino como variable seguida de un paréntesis sobrante.
 */
const PROPOSITIONAL_RE = /^[a-z¬∼~∧&∨|⇒→⇔↔()[\]{}\s\-<>]*$/;
const PREDICATE_NOTATION_RE = /[a-z]\(/;

function isProposicional(formula: string): boolean {
  return PROPOSITIONAL_RE.test(formula) && !PREDICATE_NOTATION_RE.test(formula);
}

/**
 * Verifica si dos fórmulas proposicionales son lógicamente equivalentes
 * evaluando todas las asignaciones sobre la unión de sus variables.
 * Retorna false ante cualquier error (fórmula no parseable, etc.).
 */
function equivalent(formulaA: string, formulaB: string): boolean {
  try {
    const astA = parse(formulaA);
    const astB = parse(formulaB);
    const allVars = [
      ...new Set([...collectVars(astA), ...collectVars(astB)]),
    ];
    for (const env of allAssignments(allVars)) {
      if (evaluate(astA, env) !== evaluate(astB, env)) return false;
    }
    return true;
  } catch {
    return false;
  }
}

/** Intenta parsear una fórmula y retorna el mensaje de error, o null si es válida. */
function parseError(formula: string): string | null {
  try {
    parse(formula);
    return null;
  } catch (e) {
    return e instanceof Error ? e.message : String(e);
  }
}

// ── Capa C: validación semántica por tipo ─────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkExerciseSemantic(exercise: any, path: string, issues: Issue[]): void {
  const { type } = exercise;

  if (type === "truth-table" || type === "classify") {
    const err = parseError(exercise.formula);
    if (err) {
      issues.push({ path, level: "error", message: `formula no parseable: ${err}` });
      return;
    }
    // Verificar que tiene al menos 1 variable.
    const vars = collectVars(parse(exercise.formula));
    if (vars.length === 0) {
      issues.push({ path, level: "warn", message: "formula sin variables proposicionales" });
    }
    // Para classify: el motor puede calcular la clasificación sin problemas.
    // No hay clave de respuesta que verificar; la validez es implícita.
    if (type === "classify") {
      try { classify(exercise.formula); } catch (e) {
        issues.push({ path, level: "error", message: `classify lanzó error: ${e instanceof Error ? e.message : String(e)}` });
      }
    } else {
      try { truthColumn(exercise.formula); } catch (e) {
        issues.push({ path, level: "error", message: `truthColumn lanzó error: ${e instanceof Error ? e.message : String(e)}` });
      }
    }
    return;
  }

  if (type === "counterexample") {
    // Verificar que premisas y conclusión parsean.
    const formulas: string[] = [...(exercise.premises ?? []), exercise.conclusion];
    let anyBad = false;
    for (const f of formulas) {
      const err = parseError(f);
      if (err) {
        issues.push({ path, level: "error", message: `fórmula no parseable "${f}": ${err}` });
        anyBad = true;
      }
    }
    if (anyBad) return;

    // Verificar que `variables` coincide (como conjunto) con las vars de todas las fórmulas.
    const allVars = new Set<string>();
    for (const f of formulas) collectVars(parse(f)).forEach((v) => allVars.add(v));
    const declaredVars = new Set<string>(exercise.variables ?? []);
    const missing = [...allVars].filter((v) => !declaredVars.has(v));
    const extra = [...declaredVars].filter((v) => !allVars.has(v));
    if (missing.length > 0) {
      issues.push({ path, level: "warn", message: `variables del campo 'variables' no incluyen: ${missing.join(", ")}` });
    }
    if (extra.length > 0) {
      issues.push({ path, level: "warn", message: `campo 'variables' lista vars que no aparecen en las fórmulas: ${extra.join(", ")}` });
    }

    // Verificar que el argumento es INVÁLIDO (eso es lo que afirma el enunciado
    // de un ejercicio de contraejemplo — debe existir un contraejemplo).
    const arg = { premises: exercise.premises as string[], conclusion: exercise.conclusion as string };
    const ce = findCounterexample(arg);
    if (ce === null) {
      issues.push({
        path,
        level: "error",
        message:
          "el argumento es VÁLIDO, pero un ejercicio 'counterexample' debe presentar un argumento inválido " +
          "(un razonamiento del que el usuario pueda encontrar un contraejemplo)",
      });
    }
    return;
  }

  if (type === "build-expression") {
    const { bank, answer } = exercise;
    // Verificar que la respuesta parsea como fórmula proposicional válida,
    // sólo si los tokens tienen aspecto proposicional (omitir ejercicios de
    // cuantificadores o notación de conjuntos que reusan este tipo).
    const joined = (answer as string[]).join(" ");
    if (isProposicional(joined)) {
      const err = parseError(joined);
      if (err) {
        issues.push({ path, level: "error", message: `answer no parsea como fórmula: "${joined}" — ${err}` });
      }
    }
    // Verificar siempre que todos los tokens de answer están en bank.
    const bankSet = new Set<string>(bank as string[]);
    const missingTokens = (answer as string[]).filter((t) => !bankSet.has(t));
    if (missingTokens.length > 0) {
      issues.push({ path, level: "error", message: `tokens en answer que no están en bank: ${missingTokens.join(", ")}` });
    }
    return;
  }

  if (type === "simplify-steps") {
    // Si start no es proposicional (p.ej. notación de conjuntos, constantes V/F)
    // se omite la validación semántica del tipo — no es dominio del motor.
    if (!isProposicional(exercise.start)) return;

    // Verificar que start parsea.
    const startErr = parseError(exercise.start);
    if (startErr) {
      issues.push({ path, level: "error", message: `start no parseable: ${startErr}` });
      return;
    }
    // Verificar cada paso: result parsea y es equivalente al anterior.
    let prevExpr: string = exercise.start;
    let prevParseable = true;
    const steps = exercise.steps as Array<{ options: string[]; correctIndex: number; result: string }>;
    steps.forEach((step, i) => {
      // correctIndex en rango (zod lo captura, pero chequeamos por si la safeParse falló).
      if (step.correctIndex >= step.options.length) {
        issues.push({
          path,
          level: "error",
          message: `paso ${i}: correctIndex (${step.correctIndex}) fuera de rango (options tiene ${step.options.length} elementos)`,
        });
      }
      // Si el result introduce notación no proposicional (V/F, conjuntos, etc.)
      // se detiene la cadena de validación sin reportar error.
      if (!isProposicional(step.result)) {
        prevParseable = false;
        prevExpr = step.result;
        return;
      }
      const resultErr = parseError(step.result);
      if (resultErr) {
        issues.push({ path, level: "error", message: `paso ${i}: result no parseable: ${resultErr}` });
        prevParseable = false;
      } else if (prevParseable) {
        // Verificar equivalencia lógica con el paso anterior.
        if (!equivalent(prevExpr, step.result)) {
          issues.push({
            path,
            level: "error",
            message: `paso ${i}: result "${step.result}" no es lógicamente equivalente a "${prevExpr}"`,
          });
        }
      }
      prevExpr = step.result;
      prevParseable = resultErr === null;
    });
    return;
  }

  if (type === "deduction-steps") {
    // Verificar premisas proposicionales (omitir cuantificadores, lenguaje natural, etc.).
    for (const p of exercise.premises as string[]) {
      if (!isProposicional(p)) continue;
      const err = parseError(p);
      if (err) issues.push({ path, level: "error", message: `premisa no parseable "${p}": ${err}` });
    }
    // Verificar result de cada paso (sólo si es proposicional).
    const steps = exercise.steps as Array<{ options: string[]; correctIndex: number; result: string }>;
    steps.forEach((step, i) => {
      if (step.correctIndex >= step.options.length) {
        issues.push({
          path,
          level: "error",
          message: `paso ${i}: correctIndex (${step.correctIndex}) fuera de rango (options tiene ${step.options.length} elementos)`,
        });
      }
      if (!isProposicional(step.result)) return;
      const err = parseError(step.result);
      if (err) issues.push({ path, level: "error", message: `paso ${i}: result no parseable: ${err}` });
    });
    // Nota: el motor no aplica reglas de inferencia natural, así que la
    // corrección lógica de la derivación no se verifica aquí — sólo estructura y parseo.
    return;
  }

  if (type === "multiple-choice") {
    const { options, correctIndex } = exercise;
    if (correctIndex >= (options as string[]).length) {
      issues.push({
        path,
        level: "error",
        message: `correctIndex (${correctIndex}) fuera de rango (options tiene ${(options as string[]).length} elementos)`,
      });
    }
    return;
  }

  // concept y tap-proposition: sólo estructura (zod).
}

// ── Helpers de ID ─────────────────────────────────────────────────────────────

function registerID(
  id: string | undefined,
  path: string,
  allIds: Set<string>,
  issues: Issue[],
): void {
  if (!id) return;
  if (allIds.has(id)) {
    issues.push({ path, level: "error", message: `ID duplicado: "${id}"` });
  } else {
    allIds.add(id);
  }
}

function checkPrefix(
  id: string | undefined,
  parentId: string | undefined,
  path: string,
  issues: Issue[],
  nodeLabel: string,
): void {
  if (!id || !parentId) return;
  if (!id.startsWith(parentId)) {
    issues.push({
      path,
      level: "warn",
      message: `Convención de ID: ${nodeLabel} "${id}" debería empezar con "${parentId}"`,
    });
  }
}

/** Mapea los issues de zod (para un nodo concreto) al formato de Issue. */
function zodIssues(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: unknown,
  schema: z.ZodTypeAny,
  path: string,
  issues: Issue[],
): void {
  const result = schema.safeParse(data);
  if (!result.success) {
    for (const err of result.error.issues) {
      const fieldPath = err.path.length > 0 ? err.path.join(".") : "raíz";
      issues.push({
        path,
        level: "error",
        message: `[struct] ${fieldPath}: ${err.message}`,
      });
    }
  }
}

// ── Función principal ─────────────────────────────────────────────────────────

/**
 * Valida la estructura, unicidad de IDs y semántica lógica de un conjunto de
 * unidades. Por omisión valida el currículo completo (`curriculum` de index.ts).
 *
 * Retorna una lista de issues (nunca lanza). Los issues con `level: "error"`
 * indican errores que deben corregirse antes de publicar; los `level: "warn"`
 * son advertencias sobre convenciones.
 */
export function validateCurriculum(units: Unit[] = curriculum): Issue[] {
  const issues: Issue[] = [];
  const allIds = new Set<string>();

  for (const unit of units) {
    const unitPath = unit.id ?? "(unidad sin id)";

    // Capa A — estructura del nodo unidad.
    zodIssues(unit, unitFieldsSchema, unitPath, issues);

    // Capa B — unicidad de ID.
    registerID(unit.id, unitPath, allIds, issues);

    const sections = (unit.sections as unknown[]) ?? [];
    for (let si = 0; si < sections.length; si++) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const section = sections[si] as any;
      const sectionPath = section.id ?? `${unitPath}/seccion[${si}]`;

      // Capa A — estructura sección.
      zodIssues(section, sectionFieldsSchema, sectionPath, issues);

      // Capa B — ID sección.
      registerID(section.id, sectionPath, allIds, issues);
      checkPrefix(section.id, unit.id, sectionPath, issues, "sección");

      const lessons = (section.lessons as unknown[]) ?? [];
      for (let li = 0; li < lessons.length; li++) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const lesson = lessons[li] as any;
        const lessonPath = lesson.id ?? `${sectionPath}/leccion[${li}]`;

        // Capa A — estructura lección.
        zodIssues(lesson, lessonFieldsSchema, lessonPath, issues);

        // Capa B — ID lección.
        registerID(lesson.id, lessonPath, allIds, issues);
        checkPrefix(lesson.id, section.id, lessonPath, issues, "lección");

        const exercises = (lesson.exercises as unknown[]) ?? [];
        for (let ei = 0; ei < exercises.length; ei++) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const exercise = exercises[ei] as any;
          const exercisePath = exercise.id ?? `${lessonPath}/ejercicio[${ei}]`;

          // Capa B — ID ejercicio.
          registerID(exercise.id, exercisePath, allIds, issues);
          checkPrefix(exercise.id, lesson.id, exercisePath, issues, "ejercicio");

          // Capa A — estructura ejercicio (discriminated union).
          zodIssues(exercise, exerciseSchema, exercisePath, issues);

          // Capa C — semántica.
          checkExerciseSemantic(exercise, exercisePath, issues);
        }
      }
    }
  }

  return issues;
}
