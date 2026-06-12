import type { Ast } from "./parser";
import { evaluate } from "./evaluate";
import type { Env } from "./evaluate";

// Precedence for minimum-parens printing (higher = tighter binding).
const PREC: Record<Ast["type"], number> = {
  var: 99,
  not: 5,
  and: 4,
  or: 3,
  imp: 2,
  iff: 1,
};

// Re-export evaluate so callers don't need a separate import.
export { evaluate };
export type { Env };

// Prints an AST back to a string with the minimum necessary parentheses.
// Precedence: ¬ > ∧ > ∨ > ⇒ (right-assoc) > ⇔.
export function formatAst(ast: Ast): string {
  return fmt(ast, 0, false);
}

function fmt(node: Ast, parentPrec: number, rightOfLeftAssoc: boolean): string {
  const myPrec = PREC[node.type];
  let s: string;

  switch (node.type) {
    case "var":
      return node.name;
    case "not": {
      // ¬ is prefix; operand only needs parens if it is a binary op.
      const inner =
        node.e.type === "var" || node.e.type === "not"
          ? fmt(node.e, myPrec, false)
          : `(${fmt(node.e, 0, false)})`;
      s = `¬${inner}`;
      break;
    }
    case "and":
      s = `${fmt(node.l, myPrec, false)} ∧ ${fmt(node.r, myPrec, true)}`;
      break;
    case "or":
      s = `${fmt(node.l, myPrec, false)} ∨ ${fmt(node.r, myPrec, true)}`;
      break;
    case "imp":
      // Right-associative: left child at same prec needs parens; right does not.
      s = `${fmt(node.l, myPrec + 0.1, false)} ⇒ ${fmt(node.r, myPrec - 0.1, false)}`;
      break;
    case "iff":
      s = `${fmt(node.l, myPrec, false)} ⇔ ${fmt(node.r, myPrec, true)}`;
      break;
  }

  // Wrap if this node binds less tightly than the parent context.
  if (myPrec < parentPrec || (myPrec === parentPrec && rightOfLeftAssoc)) {
    return `(${s})`;
  }
  return s;
}

// Returns all unique non-variable sub-ASTs in post-order (leaves first,
// root last). Uniqueness is by formatted string so structurally identical
// sub-formulas appear only once.
export function subExpressions(ast: Ast): Ast[] {
  const seen = new Set<string>();
  const result: Ast[] = [];

  function walk(node: Ast): void {
    if (node.type === "var") return;
    if (node.type === "not") {
      walk(node.e);
    } else {
      walk(node.l);
      walk(node.r);
    }
    const key = formatAst(node);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(node);
    }
  }

  walk(ast);
  return result;
}
