import { describe, it, expect } from "vitest";
import { parse, collectVars } from "../parser";
import { formatAst } from "../subexpressions";

describe("parse", () => {
  it("parsea una variable simple", () => {
    const ast = parse("p");
    expect(ast).toEqual({ type: "var", name: "p" });
  });

  it("parsea negación con ¬", () => {
    const ast = parse("¬p");
    expect(ast).toEqual({ type: "not", e: { type: "var", name: "p" } });
  });

  it("parsea negación con ~ y ∼ (alias)", () => {
    expect(parse("~p")).toEqual(parse("¬p"));
    expect(parse("∼p")).toEqual(parse("¬p"));
  });

  it("parsea conjunción con ∧ y & (alias)", () => {
    expect(parse("p & q")).toEqual(parse("p ∧ q"));
  });

  it("parsea disyunción con ∨ y | (alias)", () => {
    expect(parse("p | q")).toEqual(parse("p ∨ q"));
  });

  it("parsea condicional con ⇒, → y -> (alias)", () => {
    expect(parse("p -> q")).toEqual(parse("p ⇒ q"));
    expect(parse("p → q")).toEqual(parse("p ⇒ q"));
  });

  it("parsea bicondicional con ⇔, ↔ y <-> (alias)", () => {
    expect(parse("p <-> q")).toEqual(parse("p ⇔ q"));
    expect(parse("p ↔ q")).toEqual(parse("p ⇔ q"));
  });

  it("precedencia: ¬ > ∧ (¬p ∧ q = (¬p) ∧ q)", () => {
    const ast = parse("¬p ∧ q");
    expect(ast).toEqual({
      type: "and",
      l: { type: "not", e: { type: "var", name: "p" } },
      r: { type: "var", name: "q" },
    });
  });

  it("precedencia: ∧ > ∨ (p ∧ q ∨ r = (p ∧ q) ∨ r)", () => {
    const ast = parse("p ∧ q ∨ r");
    expect(ast).toEqual({
      type: "or",
      l: {
        type: "and",
        l: { type: "var", name: "p" },
        r: { type: "var", name: "q" },
      },
      r: { type: "var", name: "r" },
    });
  });

  it("precedencia: ∨ > ⇒ (p ∨ q ⇒ r = (p ∨ q) ⇒ r)", () => {
    const ast = parse("p ∨ q ⇒ r");
    expect(ast.type).toBe("imp");
    expect((ast as { type: "imp"; l: { type: string }; r: unknown }).l.type).toBe(
      "or",
    );
  });

  it("asociatividad derecha de ⇒ (p ⇒ q ⇒ r = p ⇒ (q ⇒ r))", () => {
    const ast = parse("p ⇒ q ⇒ r");
    expect(ast.type).toBe("imp");
    const root = ast as { type: "imp"; l: unknown; r: { type: string } };
    // El lado derecho también es imp (asociatividad a la derecha)
    expect(root.r.type).toBe("imp");
  });

  it("paréntesis cambian la asociatividad: (p ⇒ q) ⇒ r ≠ p ⇒ (q ⇒ r)", () => {
    const leftAssoc = parse("(p ⇒ q) ⇒ r");
    const rightAssoc = parse("p ⇒ q ⇒ r");
    expect(leftAssoc).not.toEqual(rightAssoc);
  });

  it("acepta corchetes y llaves como paréntesis", () => {
    expect(parse("[p ∧ q]")).toEqual(parse("(p ∧ q)"));
    expect(parse("{p ∧ q}")).toEqual(parse("(p ∧ q)"));
  });

  it("lanza error en carácter inesperado", () => {
    expect(() => parse("p + q")).toThrow();
  });

  it("lanza error si falta paréntesis de cierre", () => {
    expect(() => parse("(p ∧ q")).toThrow();
  });

  it("lanza error si la fórmula está vacía / incompleta", () => {
    expect(() => parse("")).toThrow();
    expect(() => parse("p ∧")).toThrow();
  });

  it("lanza error si hay tokens sobrantes", () => {
    expect(() => parse("p q")).toThrow();
  });
});

describe("collectVars", () => {
  it("orden canónico p, q, r, s, t", () => {
    expect(collectVars(parse("r ∧ p ∨ q"))).toEqual(["p", "q", "r"]);
    expect(collectVars(parse("t ∧ s ∧ p"))).toEqual(["p", "s", "t"]);
  });

  it("no duplica variables", () => {
    expect(collectVars(parse("p ∧ p ∨ p"))).toEqual(["p"]);
  });

  it("variable única", () => {
    expect(collectVars(parse("p"))).toEqual(["p"]);
  });
});

describe("formatAst (round-trip)", () => {
  it("parse → format → parse produce el mismo AST", () => {
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
      expect(ast2).toEqual(ast1);
    }
  });
});
