#!/usr/bin/env tsx
/**
 * CLI de la suite de evaluación de contenido — Fase 3 del harness IA.
 *
 * Uso:
 *   pnpm eval:content                  # evalúa el golden (calibración)
 *   pnpm eval:content --unit u1        # evalúa unit1 del currículo vivo
 *   pnpm eval:content --unit u2        # evalúa unit2 del currículo vivo
 *   pnpm eval:content --json           # salida JSON (sin colores)
 *   pnpm eval:content --out reporte.txt  # escribe el reporte a un archivo
 *
 * Comparar dos corridas (p. ej. antes/después de cambiar el prompt):
 *   pnpm eval:content --unit u2 --out run-a.txt
 *   # (regenerar u2 con el nuevo prompt)
 *   pnpm eval:content --unit u2 --out run-b.txt
 *   diff run-a.txt run-b.txt
 *
 * Exit code: 0 si no hay casos fallidos; 1 si los hay (útil en CI).
 */

import fs from "node:fs";
import { scoreUnits, goldenUnit, formatReport, formatReportJSON } from "../src/content/eval/index.js";
import type { Unit } from "../src/content/types.js";

// ── Colores ANSI (solo en TTY) ────────────────────────────────────────────────

const isTTY = process.stdout.isTTY;
const c = {
  red: (s: string) => (isTTY ? `\x1b[31m${s}\x1b[0m` : s),
  green: (s: string) => (isTTY ? `\x1b[32m${s}\x1b[0m` : s),
  yellow: (s: string) => (isTTY ? `\x1b[33m${s}\x1b[0m` : s),
  bold: (s: string) => (isTTY ? `\x1b[1m${s}\x1b[0m` : s),
  dim: (s: string) => (isTTY ? `\x1b[2m${s}\x1b[0m` : s),
};

// ── Parseo de args ────────────────────────────────────────────────────────────

function parseArgs(): { unit?: string; json: boolean; out?: string } {
  const args = process.argv.slice(2);
  let unit: string | undefined;
  let json = false;
  let out: string | undefined;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--unit" && args[i + 1]) {
      unit = args[++i];
    } else if (args[i] === "--json") {
      json = true;
    } else if (args[i] === "--out" && args[i + 1]) {
      out = args[++i];
    }
  }

  return { unit, json, out };
}

// ── Cargar unidades ───────────────────────────────────────────────────────────

async function loadUnits(unit?: string): Promise<{ units: Unit[]; suiteName: string }> {
  if (!unit) {
    return { units: [goldenUnit], suiteName: "golden" };
  }

  // Importación dinámica para no cargar el currículo cuando se evalúa solo el golden.
  const { MATERIAS, curriculumDeMateria, curriculum } = await import(
    "../src/content/index.js"
  );

  // Intento 1: --unit como slug/id de materia (ej. "logica") → todas sus unidades.
  const materia = MATERIAS.find(
    (m: { slug: string; id: string; available: boolean }) =>
      (m.slug === unit || m.id === unit) && m.available,
  );
  if (materia) {
    return { units: curriculumDeMateria(materia.slug), suiteName: unit };
  }

  // Intento 2: --unit como id de unidad (prefijado "logica-u1" o legacy "u1").
  const target =
    curriculum.find((u: Unit) => u.id === unit) ??
    // Compat: busca por sufijo para IDs legado sin prefijo (ej. "u1" → "logica-u1").
    curriculum.find((u: Unit) => u.id.endsWith(`-${unit}`));

  if (!target) {
    const ids = [
      ...MATERIAS.filter((m: { available: boolean }) => m.available).map(
        (m: { slug: string }) => m.slug,
      ),
      ...curriculum.map((u: Unit) => u.id),
    ].join(", ");
    console.error(
      c.red(`\n✗ "${unit}" no encontrado. Disponibles: ${ids}\n`),
    );
    process.exit(1);
  }

  return { units: [target], suiteName: unit };
}

// ── Render con colores (solo texto, no afecta el reporte escrito a --out) ─────

function printColored(text: string, failed: number): void {
  for (const line of text.split("\n")) {
    if (line.startsWith("[FAIL]")) {
      process.stdout.write(c.red(line) + "\n");
    } else if (line.startsWith("[PASS]")) {
      process.stdout.write(c.dim(line) + "\n");
    } else if (line.startsWith("   ✗")) {
      process.stdout.write(c.red(line) + "\n");
    } else if (line.startsWith("Resumen:")) {
      const colored =
        failed === 0
          ? c.green(line)
          : c.red(line);
      process.stdout.write(c.bold(colored) + "\n");
    } else {
      process.stdout.write(line + "\n");
    }
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function run(): Promise<void> {
  const { unit, json, out } = parseArgs();

  console.error(c.bold(`\nEvaluando contenido…\n`));

  const { units, suiteName } = await loadUnits(unit);
  const report = scoreUnits(units, suiteName);

  const text = json ? formatReportJSON(report) : formatReport(report);

  // Escribir a archivo si se indicó.
  if (out) {
    fs.writeFileSync(out, text, "utf8");
    console.error(c.dim(`→ Reporte escrito en ${out}\n`));
  }

  // Imprimir en stdout (con colores en TTY si es texto plano).
  if (json || !isTTY) {
    process.stdout.write(text);
  } else {
    printColored(text, report.summary.failed);
  }

  // Exit code basado en fallos.
  if (report.summary.failed > 0) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error(c.red(`\n✗ Error inesperado: ${err instanceof Error ? err.message : String(err)}\n`));
  process.exit(1);
});
