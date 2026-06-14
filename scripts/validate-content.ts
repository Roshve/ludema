#!/usr/bin/env tsx
/**
 * CLI del ciclo de validación de contenido.
 *
 * Uso (habitual tras generar contenido con IA):
 *   pnpm validate:content
 *
 * Salida:
 *   - Lista de issues agrupados por nodo (path).
 *   - Resumen: N errores, M advertencias.
 *   - Código de salida 1 si hay errores; 0 si solo hay advertencias o nada.
 *
 * Qué detecta:
 *   A) Estructura (zod)      — campos requeridos, tipos, rangos de índices.
 *   B) Unicidad de IDs       — colisiones silenciosas en los Map de index.ts.
 *   C) Semántica con motor   — fórmulas parseables, claves lógicamente correctas.
 */

import { validateCurriculum, type Issue } from "../src/content/validate.js";

// ── Colores ANSI (desactivados si no es TTY) ──────────────────────────────────

const isTTY = process.stdout.isTTY;
const c = {
  red: (s: string) => (isTTY ? `\x1b[31m${s}\x1b[0m` : s),
  yellow: (s: string) => (isTTY ? `\x1b[33m${s}\x1b[0m` : s),
  green: (s: string) => (isTTY ? `\x1b[32m${s}\x1b[0m` : s),
  bold: (s: string) => (isTTY ? `\x1b[1m${s}\x1b[0m` : s),
  dim: (s: string) => (isTTY ? `\x1b[2m${s}\x1b[0m` : s),
};

// ── Render ────────────────────────────────────────────────────────────────────

function renderIssue(issue: Issue): string {
  const icon = issue.level === "error" ? c.red("✗") : c.yellow("▲");
  const tag = issue.level === "error" ? c.red("error") : c.yellow("warn");
  return `  ${icon} ${c.bold(issue.path)}  ${c.dim(`[${tag}]`)} ${issue.message}`;
}

function run(): void {
  console.log(c.bold("\nValidando contenido del currículo…\n"));

  const issues = validateCurriculum();

  if (issues.length === 0) {
    console.log(c.green("✓ Sin issues. El currículo está limpio.\n"));
    process.exit(0);
  }

  // Agrupar por path para facilitar la lectura.
  const byPath = new Map<string, Issue[]>();
  for (const issue of issues) {
    const list = byPath.get(issue.path) ?? [];
    list.push(issue);
    byPath.set(issue.path, list);
  }

  for (const [path, pathIssues] of byPath) {
    console.log(c.bold(path));
    for (const issue of pathIssues) {
      console.log(renderIssue(issue));
    }
    console.log();
  }

  const errors = issues.filter((i) => i.level === "error");
  const warns = issues.filter((i) => i.level === "warn");

  const summary = [
    errors.length > 0 ? c.red(`${errors.length} error(es)`) : null,
    warns.length > 0 ? c.yellow(`${warns.length} advertencia(s)`) : null,
  ]
    .filter(Boolean)
    .join(", ");

  console.log(c.bold(`Resultado: ${summary}\n`));

  if (errors.length > 0) {
    console.log(
      c.red("✗ Hay errores que deben corregirse antes de publicar.\n"),
    );
    process.exit(1);
  }

  console.log(
    c.yellow(
      "▲ Solo advertencias (convenciones de ID). El contenido es estructuralmente válido.\n",
    ),
  );
  process.exit(0);
}

run();
