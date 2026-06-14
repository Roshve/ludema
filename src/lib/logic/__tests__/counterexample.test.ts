import { describe, it, expect } from "vitest";
import {
  findCounterexample,
  isCounterexample,
  isValidArgument,
} from "../counterexample";
import type { Argument } from "../counterexample";

describe("isValidArgument / findCounterexample", () => {
  it("razonamiento válido: modus ponens", () => {
    const arg: Argument = {
      premises: ["p ⇒ q", "p"],
      conclusion: "q",
    };
    expect(isValidArgument(arg)).toBe(true);
    expect(findCounterexample(arg)).toBeNull();
  });

  it("razonamiento inválido: afirmación del consecuente", () => {
    // De (p⇒q) y q NO se puede concluir p.
    const arg: Argument = {
      premises: ["p ⇒ q", "q"],
      conclusion: "p",
    };
    expect(isValidArgument(arg)).toBe(false);
    expect(findCounterexample(arg)).not.toBeNull();
  });

  it("contraejemplo es correcto: hace V las premisas y F la conclusión", () => {
    const arg: Argument = {
      premises: ["p ⇒ q", "q"],
      conclusion: "p",
    };
    const ce = findCounterexample(arg);
    expect(ce).not.toBeNull();
    // p=F, q=V hace V ambas premisas y F la conclusión
    if (ce) {
      expect(isCounterexample(arg, ce)).toBe(true);
    }
  });

  it("razonamiento válido sin premisas (conclusión tautológica)", () => {
    const arg: Argument = {
      premises: [],
      conclusion: "p ∨ ¬p",
    };
    expect(isValidArgument(arg)).toBe(true);
  });

  it("razonamiento inválido: conclusión contingente sin premisas", () => {
    const arg: Argument = {
      premises: [],
      conclusion: "p",
    };
    expect(isValidArgument(arg)).toBe(false);
  });
});

describe("isCounterexample", () => {
  it("retorna false cuando las premisas no son todas V", () => {
    const arg: Argument = {
      premises: ["p ⇒ q", "q"],
      conclusion: "p",
    };
    // p=V, q=V: premisas V pero conclusión también V → no es contraejemplo
    expect(isCounterexample(arg, { p: true, q: true })).toBe(false);
  });

  it("retorna false cuando la conclusión es V", () => {
    const arg: Argument = {
      premises: ["p"],
      conclusion: "p",
    };
    expect(isCounterexample(arg, { p: true })).toBe(false);
  });
});
