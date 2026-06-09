import { parse, collectVars, type Ast } from "./parser";
import { evaluate, allAssignments, type Env } from "./evaluate";

export type TruthRow = { env: Env; value: boolean };
export type TruthTable = {
  vars: string[];
  ast: Ast;
  rows: TruthRow[];
};

// Construye la tabla de verdad completa de una fórmula.
export function truthTable(formula: string): TruthTable {
  const ast = parse(formula);
  const vars = collectVars(ast);
  const rows = allAssignments(vars).map((env) => ({
    env,
    value: evaluate(ast, env),
  }));
  return { vars, ast, rows };
}

// Columna final (valores de verdad) de la fórmula, en orden de la tabla.
export function truthColumn(formula: string): boolean[] {
  return truthTable(formula).rows.map((r) => r.value);
}
