import type { Ast } from "./parser";

export type Env = Record<string, boolean>;

// Evalúa el AST bajo una asignación de valores de verdad.
export function evaluate(ast: Ast, env: Env): boolean {
  switch (ast.type) {
    case "var": {
      const v = env[ast.name];
      if (v === undefined)
        throw new Error(`Variable "${ast.name}" sin valor asignado`);
      return v;
    }
    case "not":
      return !evaluate(ast.e, env);
    case "and":
      return evaluate(ast.l, env) && evaluate(ast.r, env);
    case "or":
      return evaluate(ast.l, env) || evaluate(ast.r, env);
    case "imp":
      // p ⇒ q  ≡  ¬p ∨ q
      return !evaluate(ast.l, env) || evaluate(ast.r, env);
    case "iff":
      return evaluate(ast.l, env) === evaluate(ast.r, env);
  }
}

// Genera todas las asignaciones posibles para un conjunto de variables.
// El orden recorre la última variable más rápido (estilo tabla de verdad clásica,
// con V antes que F en cada columna).
export function allAssignments(vars: string[]): Env[] {
  const n = vars.length;
  const total = 2 ** n;
  const rows: Env[] = [];
  for (let i = 0; i < total; i++) {
    const env: Env = {};
    for (let j = 0; j < n; j++) {
      // bit más significativo = primera variable; V = true.
      env[vars[j]] = (i & (1 << (n - 1 - j))) === 0;
    }
    rows.push(env);
  }
  return rows;
}
