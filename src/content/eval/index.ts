/**
 * Suite de evaluación de contenido — Fase 3 del harness IA.
 *
 * Exporta los tipos y funciones públicos del módulo eval/.
 * Importar solo desde tests y scripts/ — nunca desde código de app.
 */

export type {
  MetricStatus,
  MetricResult,
  SetMetricResult,
  CaseResult,
  EvalReport,
} from "./metrics";

export { scoreUnits } from "./metrics";
export { goldenUnit } from "./golden";
export { formatReport, formatReportJSON } from "./report";
