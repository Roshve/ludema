---
id: tablas-de-verdad
title: Tablas de Verdad
---

# Tablas de Verdad

Una **tabla de verdad** muestra todos los valores posibles de una fórmula según las
combinaciones de sus variables.

## Tablas de los conectivos básicos

### Negación (¬)

| p | ¬p |
|---|-----|
| V | F |
| F | V |

### Conjunción (∧)

| p | q | p ∧ q |
|---|---|-------|
| V | V | **V** |
| V | F | F |
| F | V | F |
| F | F | F |

> La conjunción es V **solo** cuando ambas son V.

### Disyunción (∨)

| p | q | p ∨ q |
|---|---|-------|
| V | V | V |
| V | F | V |
| F | V | V |
| F | F | **F** |

> La disyunción es F **solo** cuando ambas son F.

### Condicional (⇒)

| p | q | p ⇒ q |
|---|---|-------|
| V | V | V |
| V | F | **F** |
| F | V | V |
| F | F | V |

> El condicional es F **solo** cuando el antecedente es V y el consecuente es F.  
> («prometí algo y no lo cumplí»).

### Bicondicional (⇔)

| p | q | p ⇔ q |
|---|---|-------|
| V | V | V |
| V | F | F |
| F | V | F |
| F | F | V |

> El bicondicional es V cuando ambas tienen el **mismo valor**.

## Cantidad de filas

Con `n` variables: `2ⁿ` filas.

| Variables | Filas |
|-----------|-------|
| 1 | 2 |
| 2 | 4 |
| 3 | 8 |
| 4 | 16 |

## Clasificación de fórmulas

| Tipo | Definición | Ejemplo |
|------|-----------|---------|
| **Tautología** | V en todas las filas | `p ∨ ¬p` |
| **Contradicción** | F en todas las filas | `p ∧ ¬p` |
| **Contingencia** | V en algunas, F en otras | `p ∧ q` |

:::tip Truco contrarreloj
Para `X ∨ ¬X`: siempre tautología (alguna de las dos es V).  
Para `X ∧ ¬X`: siempre contradicción (no pueden ser V a la vez).
:::

## Método de valores ocultos

Para clasificar sin hacer toda la tabla:
1. Intentá encontrar una fila donde la fórmula sea **F** (para descartar tautología).
2. Si no existe, es tautología.
3. Si solo hay filas con F, es contradicción.
