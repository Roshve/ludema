/**
 * Formateadores de EvalReport para salida diff-able.
 *
 * Texto plano (`formatReport`): sin timestamps ni colores ANSI en el cuerpo;
 * los casos están ordenados por id. Hacer `diff run-a.txt run-b.txt` entre
 * dos ejecuciones muestra exactamente qué casos cambiaron.
 *
 * JSON (`formatReportJSON`): claves en orden fijo para diffs de máquina / CI.
 */

import type { EvalReport, MetricResult, SetMetricResult } from "./metrics";

// ── Texto plano diff-able ─────────────────────────────────────────────────────

const SEPARATOR = "=".repeat(60);
const SUBSEP = "-".repeat(60);

function renderMetric(m: MetricResult | SetMetricResult, indent = "   "): string {
  if (m.status === "pass") return ""; // pasos sin fallo no se detallan
  const icon = m.status === "fail" ? "✗" : "~";
  const extra = "lessonId" in m ? ` (${(m as SetMetricResult).lessonId})` : "";
  const detail = m.detail ? `  ${m.detail}` : "";
  return `${indent}${icon} ${m.metric}${extra}${detail}`;
}

/**
 * Produce un reporte de texto plano determinista y diff-able.
 *
 * - Sin timestamps ni colores.
 * - Casos ordenados por id (ya vienen ordenados de scoreUnits).
 * - Métricas en orden canónico.
 * - Líneas vacías omitidas en fallos individuales.
 */
export function formatReport(report: EvalReport): string {
  const { suiteName, cases, setMetrics, summary } = report;
  const lines: string[] = [];

  lines.push(`EVAL REPORT — ${suiteName} (${cases.length} casos)`);
  lines.push(SEPARATOR);

  // Ordenar set-metrics por lessonId para agruparlos junto a sus casos.
  // (ya vienen ordenados de scoreUnits, pero lo repetimos por robustez)
  const setByLesson = new Map<string, SetMetricResult[]>();
  for (const sm of setMetrics) {
    const list = setByLesson.get(sm.lessonId) ?? [];
    list.push(sm);
    setByLesson.set(sm.lessonId, list);
  }

  // Casos por lección para intercalar set-metrics al final de cada lección.
  let currentLesson = "";
  const processedLessons = new Set<string>();

  for (const c of cases) {
    // Al cambiar de lección, emitir set-metrics de la lección anterior.
    if (c.lessonId !== currentLesson) {
      if (currentLesson && !processedLessons.has(currentLesson)) {
        emitSetMetrics(lines, setByLesson.get(currentLesson) ?? []);
        processedLessons.add(currentLesson);
      }
      currentLesson = c.lessonId;
    }

    const tag = c.passed ? "[PASS]" : "[FAIL]";
    lines.push(`${tag} ${c.id.padEnd(36)} ${c.type}`);

    if (!c.passed) {
      for (const m of c.metrics) {
        const line = renderMetric(m);
        if (line) lines.push(line);
      }
    }
  }

  // Emitir set-metrics de la última lección.
  if (currentLesson && !processedLessons.has(currentLesson)) {
    emitSetMetrics(lines, setByLesson.get(currentLesson) ?? []);
    processedLessons.add(currentLesson);
  }

  // Emitir set-metrics de lecciones sin casos (edge case).
  for (const [lessonId, sms] of setByLesson) {
    if (!processedLessons.has(lessonId)) {
      emitSetMetrics(lines, sms);
    }
  }

  lines.push(SUBSEP);

  // Resumen.
  const scoreStr = (summary.score * 100).toFixed(1);
  lines.push(
    `Resumen: ${summary.passed}/${summary.total} casos · score ${scoreStr}%`,
  );

  // Métricas ordenadas por nombre (determinista).
  const metricSummary = Object.entries(summary.byMetric)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, { pass, applicable }]) => `${name} ${pass}/${applicable}`)
    .join(" · ");

  if (metricSummary) lines.push(`Métricas: ${metricSummary}`);

  return lines.join("\n") + "\n";
}

function emitSetMetrics(lines: string[], sms: SetMetricResult[]): void {
  for (const sm of sms) {
    if (sm.status !== "n/a") {
      const line = renderMetric(sm);
      if (line) lines.push(line);
    }
  }
}

// ── JSON diff-able ────────────────────────────────────────────────────────────

/**
 * Serializa el reporte a JSON con claves en orden fijo para diffs de máquina.
 * Útil para CI o para diffear dos corridas con `jq` / `diff`.
 */
export function formatReportJSON(report: EvalReport): string {
  const { suiteName, cases, setMetrics, summary } = report;

  // Serialización manual en orden fijo de claves.
  const obj = {
    suiteName,
    cases: cases.map((c) => ({
      id: c.id,
      type: c.type,
      lessonId: c.lessonId,
      passed: c.passed,
      metrics: c.metrics.map((m) =>
        m.detail !== undefined
          ? { metric: m.metric, status: m.status, detail: m.detail }
          : { metric: m.metric, status: m.status },
      ),
    })),
    setMetrics: setMetrics.map((sm) =>
      sm.detail !== undefined
        ? {
            lessonId: sm.lessonId,
            metric: sm.metric,
            status: sm.status,
            detail: sm.detail,
          }
        : { lessonId: sm.lessonId, metric: sm.metric, status: sm.status },
    ),
    summary: {
      total: summary.total,
      passed: summary.passed,
      failed: summary.failed,
      score: parseFloat((summary.score * 100).toFixed(1)),
      byMetric: Object.fromEntries(
        Object.entries(summary.byMetric)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([name, v]) => [name, { pass: v.pass, applicable: v.applicable }]),
      ),
    },
  };

  return JSON.stringify(obj, null, 2);
}
