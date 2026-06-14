import { describe, it, expect } from "vitest";
import { parse } from "../parser";
import { evaluate, allAssignments } from "../evaluate";
import { truthTable, truthColumn } from "../truthTable";

describe("evaluate", () => {
  const env = { p: true, q: false };

  it("evalúa una variable", () => {
    expect(evaluate(parse("p"), env)).toBe(true);
    expect(evaluate(parse("q"), env)).toBe(false);
  });

  it("evalúa negación", () => {
    expect(evaluate(parse("¬p"), env)).toBe(false);
    expect(evaluate(parse("¬q"), env)).toBe(true);
  });

  it("evalúa conjunción", () => {
    expect(evaluate(parse("p ∧ q"), env)).toBe(false);
    expect(evaluate(parse("p ∧ p"), env)).toBe(true);
  });

  it("evalúa disyunción", () => {
    expect(evaluate(parse("p ∨ q"), env)).toBe(true);
    expect(evaluate(parse("q ∨ q"), env)).toBe(false);
  });

  it("evalúa condicional (F⇒F=V, V⇒F=F, F⇒V=V, V⇒V=V)", () => {
    expect(evaluate(parse("p ⇒ q"), env)).toBe(false); // V⇒F = F
    expect(evaluate(parse("q ⇒ p"), env)).toBe(true); // F⇒V = V
    expect(evaluate(parse("q ⇒ q"), env)).toBe(true); // F⇒F = V
  });

  it("evalúa bicondicional", () => {
    expect(evaluate(parse("p ⇔ q"), env)).toBe(false); // V⇔F = F
    expect(evaluate(parse("p ⇔ p"), env)).toBe(true);
    expect(evaluate(parse("q ⇔ q"), env)).toBe(true);
  });

  it("lanza error para variable sin asignación", () => {
    expect(() => evaluate(parse("r"), env)).toThrow();
  });
});

describe("allAssignments", () => {
  it("genera 2^n asignaciones", () => {
    expect(allAssignments(["p"]).length).toBe(2);
    expect(allAssignments(["p", "q"]).length).toBe(4);
    expect(allAssignments(["p", "q", "r"]).length).toBe(8);
  });

  it("primera variable varía más lento (estilo tabla clásica)", () => {
    const rows = allAssignments(["p", "q"]);
    // p: V V F F  (varía lento)
    // q: V F V F  (varía rápido)
    expect(rows[0]).toEqual({ p: true, q: true });
    expect(rows[1]).toEqual({ p: true, q: false });
    expect(rows[2]).toEqual({ p: false, q: true });
    expect(rows[3]).toEqual({ p: false, q: false });
  });

  it("caso borde: sin variables", () => {
    expect(allAssignments([])).toEqual([{}]);
  });
});

describe("truthTable / truthColumn", () => {
  it("p ∧ ¬p es contradicción (columna toda F)", () => {
    expect(truthColumn("p ∧ ¬p")).toEqual([false, false]);
  });

  it("p ∨ ¬p es tautología (columna toda V)", () => {
    expect(truthColumn("p ∨ ¬p")).toEqual([true, true]);
  });

  it("p ∧ q tiene las 4 filas correctas", () => {
    expect(truthColumn("p ∧ q")).toEqual([true, false, false, false]);
  });

  it("p ⇒ q tiene las 4 filas correctas", () => {
    // VV→V, VF→F, FV→V, FF→V
    expect(truthColumn("p ⇒ q")).toEqual([true, false, true, true]);
  });

  it("truthTable incluye las variables y el AST", () => {
    const table = truthTable("p ∧ q");
    expect(table.vars).toEqual(["p", "q"]);
    expect(table.rows).toHaveLength(4);
    expect(table.ast.type).toBe("and");
  });
});
