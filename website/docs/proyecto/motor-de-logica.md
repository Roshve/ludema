---
id: motor-de-logica
title: Motor de lógica
---

# Motor de lógica

El motor vive en `src/lib/logic/` y es **puro** (sin React, sin side-effects).
Parsea fórmulas proposicionales y las evalúa para autovalidar ejercicios.

## Archivos

| Archivo | Función |
|---------|---------|
| `parser.ts` | Tokeniza y construye el AST de una fórmula |
| `evaluate.ts` | Evalúa el AST dado un mapa de variables |
| `truthTable.ts` | `truthColumn` / `truthTable` — genera columnas de tabla de verdad |
| `classify.ts` | `classify` — tautología / contradicción / contingencia |
| `counterexample.ts` | `findCounterexample` / `isCounterexample` para argumentos inválidos |
| `subexpressions.ts` | Enumera sub-fórmulas para cabeceras de tabla |

## Operadores soportados

| Operador | Símbolos aceptados |
|----------|--------------------|
| Negación | `¬` `∼` `~` |
| Conjunción | `∧` `&` |
| Disyunción | `∨` `\|` |
| Condicional | `⇒` `→` `->` |
| Bicondicional | `⇔` `↔` `<->` |

Variables: letras minúsculas `a-z` (canónico: `p q r s t`).

## Precedencia

De mayor a menor: `¬` > `∧` > `∨` > `⇒` (asocia por la derecha) > `⇔`.

## Uso desde scripts de validación

```ts
import { classify, truthColumn, findCounterexample } from "@/lib/logic/classify";

// Tautología?
classify("p ∨ ¬p"); // → "tautology"

// Columna de una tabla
truthColumn("p ∧ q"); // → [false, false, false, true]

// Contraejemplo para un argumento inválido
findCounterexample(["p ⇒ q", "q"], "p"); // → { p: false, q: true }
```

Ejecutar con:
```bash
pnpm dlx tsx --tsconfig ./tsconfig.json tu-script.ts
```

El alias `@/*` resuelve a `src/*`. Usá esto para validar ejercicios nuevos antes de commitear.

## Tipos de ejercicio validados por el motor

- `truth-table` → `truthColumn`
- `classify` → `classify`
- `counterexample` → `isCounterexample`

Los cuantificadores (Sección B) **no** son validados por el motor; usan respuestas
autoradas con `multiple-choice`.
