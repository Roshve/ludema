// Parser de lógica proposicional.
// Símbolos soportados:
//   Negación:    ¬  ∼  ~
//   Conjunción:  ∧
//   Disyunción:  ∨
//   Condicional: ⇒  →  ->
//   Bicondicional: ⇔  ↔  <->
// Variables: cualquier letra minúscula a-z (típicamente p, q, r, s, t).
// Precedencia (de mayor a menor): ¬ , ∧ , ∨ , ⇒ , ⇔.

export type Ast =
  | { type: "var"; name: string }
  | { type: "not"; e: Ast }
  | { type: "and"; l: Ast; r: Ast }
  | { type: "or"; l: Ast; r: Ast }
  | { type: "imp"; l: Ast; r: Ast }
  | { type: "iff"; l: Ast; r: Ast };

type Tok =
  | { k: "var"; name: string }
  | { k: "not" }
  | { k: "and" }
  | { k: "or" }
  | { k: "imp" }
  | { k: "iff" }
  | { k: "lparen" }
  | { k: "rparen" };

function tokenize(input: string): Tok[] {
  const toks: Tok[] = [];
  const s = input;
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === " " || c === "\t" || c === "\n") {
      i++;
      continue;
    }
    // Operadores multi-carácter ASCII.
    if (s.startsWith("<->", i)) {
      toks.push({ k: "iff" });
      i += 3;
      continue;
    }
    if (s.startsWith("->", i)) {
      toks.push({ k: "imp" });
      i += 2;
      continue;
    }
    switch (c) {
      case "¬":
      case "∼":
      case "~":
        toks.push({ k: "not" });
        i++;
        continue;
      case "∧":
      case "&":
        toks.push({ k: "and" });
        i++;
        continue;
      case "∨":
      case "|":
        toks.push({ k: "or" });
        i++;
        continue;
      case "⇒":
      case "→":
        toks.push({ k: "imp" });
        i++;
        continue;
      case "⇔":
      case "↔":
        toks.push({ k: "iff" });
        i++;
        continue;
      case "(":
      case "[":
      case "{":
        toks.push({ k: "lparen" });
        i++;
        continue;
      case ")":
      case "]":
      case "}":
        toks.push({ k: "rparen" });
        i++;
        continue;
    }
    if (/[a-z]/.test(c)) {
      toks.push({ k: "var", name: c });
      i++;
      continue;
    }
    throw new Error(`Carácter inesperado "${c}" en la fórmula: ${input}`);
  }
  return toks;
}

// Parser descendente recursivo.
class Parser {
  private pos = 0;
  constructor(private toks: Tok[]) {}

  private peek(): Tok | undefined {
    return this.toks[this.pos];
  }
  private next(): Tok | undefined {
    return this.toks[this.pos++];
  }

  parse(): Ast {
    const e = this.parseIff();
    if (this.pos !== this.toks.length) {
      throw new Error("Tokens sobrantes al final de la fórmula");
    }
    return e;
  }

  private parseIff(): Ast {
    let left = this.parseImp();
    while (this.peek()?.k === "iff") {
      this.next();
      const right = this.parseImp();
      left = { type: "iff", l: left, r: right };
    }
    return left;
  }

  private parseImp(): Ast {
    const left = this.parseOr();
    if (this.peek()?.k === "imp") {
      this.next();
      // Asociativo a la derecha.
      const right = this.parseImp();
      return { type: "imp", l: left, r: right };
    }
    return left;
  }

  private parseOr(): Ast {
    let left = this.parseAnd();
    while (this.peek()?.k === "or") {
      this.next();
      const right = this.parseAnd();
      left = { type: "or", l: left, r: right };
    }
    return left;
  }

  private parseAnd(): Ast {
    let left = this.parseNot();
    while (this.peek()?.k === "and") {
      this.next();
      const right = this.parseNot();
      left = { type: "and", l: left, r: right };
    }
    return left;
  }

  private parseNot(): Ast {
    if (this.peek()?.k === "not") {
      this.next();
      return { type: "not", e: this.parseNot() };
    }
    return this.parseAtom();
  }

  private parseAtom(): Ast {
    const t = this.next();
    if (!t) throw new Error("Fórmula incompleta");
    if (t.k === "var") return { type: "var", name: t.name };
    if (t.k === "lparen") {
      const e = this.parseIff();
      const close = this.next();
      if (close?.k !== "rparen") throw new Error("Falta paréntesis de cierre");
      return e;
    }
    throw new Error(`Token inesperado: ${t.k}`);
  }
}

export function parse(formula: string): Ast {
  return new Parser(tokenize(formula)).parse();
}

// Variables presentes en la fórmula, en orden canónico (p, q, r, s, t, resto alfabético).
const CANON = ["p", "q", "r", "s", "t"];

export function collectVars(ast: Ast): string[] {
  const set = new Set<string>();
  const walk = (n: Ast) => {
    switch (n.type) {
      case "var":
        set.add(n.name);
        break;
      case "not":
        walk(n.e);
        break;
      default:
        walk(n.l);
        walk(n.r);
    }
  };
  walk(ast);
  return [...set].sort((a, b) => {
    const ia = CANON.indexOf(a);
    const ib = CANON.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.localeCompare(b);
  });
}
