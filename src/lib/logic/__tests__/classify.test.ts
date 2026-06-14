import { describe, it, expect } from "vitest";
import { classify } from "../classify";

describe("classify", () => {
  it("identifica tautologías", () => {
    expect(classify("p ∨ ¬p")).toBe("tautologia");
    expect(classify("p ⇒ p")).toBe("tautologia");
    // Ley de doble negación: ¬¬p ⇔ p
    expect(classify("¬¬p ⇔ p")).toBe("tautologia");
    // Modus ponens como bicondicional
    expect(classify("((p ⇒ q) ∧ p) ⇒ q")).toBe("tautologia");
  });

  it("identifica contradicciones", () => {
    expect(classify("p ∧ ¬p")).toBe("contradiccion");
    expect(classify("¬(p ∨ ¬p)")).toBe("contradiccion");
  });

  it("identifica contingencias", () => {
    expect(classify("p")).toBe("contingencia");
    expect(classify("p ∧ q")).toBe("contingencia");
    expect(classify("p ⇒ q")).toBe("contingencia");
    expect(classify("p ⇔ q")).toBe("contingencia");
  });
});
