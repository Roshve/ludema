---
id: logica-proposicional
title: Lógica Proposicional
---

# Lógica Proposicional

## ¿Qué es una proposición?

Una **proposición** es un enunciado declarativo que es verdadero (V) o falso (F), pero no ambos.

| Proposición ✅ | No es proposición ❌ |
|----------------|----------------------|
| «El agua hierve a 100°C» | «¿Qué hora es?» (pregunta) |
| «2 + 2 = 5» (falsa, pero proposición) | «Cerrá la puerta» (imperativo) |
| «Juan tiene 30 años» | «¡Qué lindo día!» (exclamación) |

## Proposiciones simples y compuestas

- **Simple (atómica):** no se puede descomponer. Representada con letras minúsculas: `p`, `q`, `r`, `s`, `t`.
- **Compuesta (molecular):** formada por proposiciones simples y **conectivos lógicos**.

## Conectivos lógicos

| Conectivo | Símbolo | Se lee | Ejemplo |
|-----------|---------|--------|---------|
| Negación | `¬` | «no» | `¬p` — «no p» |
| Conjunción | `∧` | «y» | `p ∧ q` — «p y q» |
| Disyunción | `∨` | «o» | `p ∨ q` — «p o q» |
| Condicional | `⇒` | «si... entonces» | `p ⇒ q` — «si p entonces q» |
| Bicondicional | `⇔` | «si y solo si» | `p ⇔ q` — «p si y solo si q» |

## El condicional en detalle

`p ⇒ q` puede leerse de muchas formas equivalentes:
- «si p entonces q»
- «p es condición suficiente para q»
- «q es condición necesaria para p»
- «q si p»
- «p solo si q»

:::warning Cuidado
`q ⇒ p` (recíproco) y `¬p ⇒ ¬q` (contrario) **no son equivalentes** al original.
Solo el **contrarrecíproco** `¬q ⇒ ¬p` es equivalente a `p ⇒ q`.
:::

## Precedencia de operadores

De mayor a menor prioridad:

1. `¬` (negación)
2. `∧` (conjunción)
3. `∨` (disyunción)
4. `⇒` (condicional — asocia por la derecha)
5. `⇔` (bicondicional)

Ejemplo: `¬p ∧ q ⇒ r` se lee como `(¬p ∧ q) ⇒ r`.

## Alcance de la negación

El alcance de `¬` es solo el término inmediato, salvo que haya paréntesis:

- `¬p ∨ q` — solo niega `p`: `(¬p) ∨ q`
- `¬(p ∨ q)` — niega toda la disyunción

:::info Negación ≠ antónimo
«Juan no es alto» **no** equivale a «Juan es bajo». La negación de «Juan es alto»
es solo «no es cierto que Juan sea alto».
:::
