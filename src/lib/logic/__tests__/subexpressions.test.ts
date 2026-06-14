import { describe, it, expect } from "vitest";
import { parse } from "../parser";
import { subExpressions, formatAst } from "../subexpressions";

describe("subExpressions", () => {
  it("fórmula atómica no tiene subexpresiones", () => {
    expect(subExpressions(parse("p"))).toHaveLength(0);
  });

  it("¬p tiene una subexpresión: ¬p", () => {
    const subs = subExpressions(parse("¬p"));
    expect(subs).toHaveLength(1);
    expect(formatAst(subs[0])).toBe("¬p");
  });

  it("p ∧ q tiene una subexpresión: p ∧ q", () => {
    const subs = subExpressions(parse("p ∧ q"));
    expect(subs).toHaveLength(1);
    expect(formatAst(subs[0])).toBe("p ∧ q");
  });

  it("orden post-orden (hijos antes que la raíz)", () => {
    // p ∧ q ∨ r: subexps son [p ∧ q, p ∧ q ∨ r]
    const subs = subExpressions(parse("p ∧ q ∨ r"));
    expect(subs).toHaveLength(2);
    expect(formatAst(subs[0])).toBe("p ∧ q");
    expect(formatAst(subs[1])).toBe("p ∧ q ∨ r");
  });

  it("subexpresiones duplicadas aparecen una sola vez", () => {
    // p ∧ p: el único nodo compuesto es p ∧ p (no hay hijos compuestos)
    const subs = subExpressions(parse("p ∧ p"));
    expect(subs).toHaveLength(1);
  });

  it("¬p ∧ ¬p: ¬p aparece una sola vez", () => {
    const subs = subExpressions(parse("¬p ∧ ¬p"));
    const labels = subs.map(formatAst);
    const notP = labels.filter((l) => l === "¬p");
    expect(notP).toHaveLength(1);
  });
});

describe("formatAst", () => {
  it("mínimos paréntesis: precedencia respetada", () => {
    // (p ∧ q) ∨ r no necesita paréntesis porque ∧ > ∨
    expect(formatAst(parse("(p ∧ q) ∨ r"))).toBe("p ∧ q ∨ r");
  });

  it("añade paréntesis cuando la precedencia lo requiere", () => {
    // p ∧ (q ∨ r) sí necesita paréntesis
    expect(formatAst(parse("p ∧ (q ∨ r)"))).toBe("p ∧ (q ∨ r)");
  });

  it("round-trip: parse → format → parse produce el mismo AST", () => {
    const formulas = [
      "p ∧ q ∨ r",
      "p ⇒ q ⇒ r",
      "¬p ∧ (q ∨ r)",
      "p ⇔ q",
      "¬¬p",
    ];
    for (const f of formulas) {
      const ast1 = parse(f);
      const formatted = formatAst(ast1);
      const ast2 = parse(formatted);
      // El re-parseo debe producir el mismo AST
      expect(ast2).toEqual(ast1);
    }
  });
});
