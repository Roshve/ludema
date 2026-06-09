import { parse, collectVars } from "./parser";
import { evaluate, allAssignments, type Env } from "./evaluate";

// Un razonamiento (premisas ⊢ conclusión) es VÁLIDO si no existe ninguna
// asignación que haga todas las premisas verdaderas y la conclusión falsa.
// Esa asignación, si existe, es el CONTRAEJEMPLO que prueba la invalidez.

export type Argument = {
  premises: string[];
  conclusion: string;
};

// ¿La asignación dada hace V todas las premisas y F la conclusión?
export function isCounterexample(arg: Argument, env: Env): boolean {
  const premisesTrue = arg.premises.every((p) => evaluate(parse(p), env));
  const conclusionFalse = !evaluate(parse(arg.conclusion), env);
  return premisesTrue && conclusionFalse;
}

// Busca un contraejemplo recorriendo todas las asignaciones. null si el
// razonamiento es válido.
export function findCounterexample(arg: Argument): Env | null {
  const vars = new Set<string>();
  [...arg.premises, arg.conclusion].forEach((f) =>
    collectVars(parse(f)).forEach((v) => vars.add(v)),
  );
  const order = [...vars];
  for (const env of allAssignments(order)) {
    if (isCounterexample(arg, env)) return env;
  }
  return null;
}

export function isValidArgument(arg: Argument): boolean {
  return findCounterexample(arg) === null;
}
