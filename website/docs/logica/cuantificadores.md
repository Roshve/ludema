---
id: cuantificadores
title: Cuantificadores
---

# Cuantificadores

La **lógica de predicados** (o de primer orden) extiende la proposicional permitiendo
hablar de propiedades de objetos y cuantificar sobre ellos.

## Predicados

Un **predicado** es una propiedad que puede ser verdadera o falsa para un objeto.

- `p(x)` — «x tiene la propiedad p»
- `p(3)` — «3 tiene la propiedad p» (proposición concreta)

## Cuantificadores

| Símbolo | Nombre | Se lee |
|---------|--------|--------|
| `∀x` | Universal | «para todo x» / «para cualquier x» |
| `∃x` | Existencial | «existe al menos un x tal que» |

Ejemplos:
- `∀x: p(x)` — todos los x tienen la propiedad p.
- `∃x: p(x)` — existe al menos un x con la propiedad p.

## Negación de cuantificadores

Las negaciones invierten el cuantificador y niegan el predicado (De Morgan para cuantificadores):

| Fórmula | Equivale a |
|---------|-----------|
| `¬∀x: p(x)` | `∃x: ¬p(x)` |
| `¬∃x: p(x)` | `∀x: ¬p(x)` |

## El orden importa (∀∃ vs ∃∀)

Cuando hay dos cuantificadores, el orden **no** es intercambiable en general:

- `∀x ∃y: p(x,y)` — para todo x, existe un y (posiblemente distinto para cada x).
- `∃y ∀x: p(x,y)` — existe un y que funciona para todos los x a la vez (más fuerte).

`∃y ∀x: p(x,y)` **implica** `∀x ∃y: p(x,y)`, pero no al revés.

### Escalera de fuerza

```
∃y ∀x: p(x,y)   ⟹   ∀x ∃y: p(x,y)   ⟹   ∃x ∃y: p(x,y)
(más fuerte)                                    (más débil)
```

## Distribución de cuantificadores

El universal **sí** distribuye sobre `∧`, el existencial sobre `∨`:

| Válida | Fórmula |
|--------|---------|
| ✅ | `∀x: (p(x) ∧ q(x)) ≡ (∀x: p(x)) ∧ (∀x: q(x))` |
| ✅ | `∃x: (p(x) ∨ q(x)) ≡ (∃x: p(x)) ∨ (∃x: q(x))` |
| ❌ | `∀x: (p(x) ∨ q(x))` **no** equivale a `(∀x: p(x)) ∨ (∀x: q(x))` |
| ❌ | `∃x: (p(x) ∧ q(x))` **no** equivale a `(∃x: p(x)) ∧ (∃x: q(x))` |

## Especificación y generalización

Las **reglas de inferencia** para cuantificadores se encuentran en la página de
[Inferencia](/logica/inferencia-y-contraejemplos).

## Traducción de categorías

En lógica de predicados, los enunciados universales afirmativos se traducen con `⇒`,
los existenciales afirmativos con `∧`:

| Enunciado | Traducción |
|-----------|-----------|
| «Todos los A son B» | `∀x: (A(x) ⇒ B(x))` |
| «Algunos A son B» | `∃x: (A(x) ∧ B(x))` |
| «Ningún A es B» | `∀x: (A(x) ⇒ ¬B(x))` |
| «Algunos A no son B» | `∃x: (A(x) ∧ ¬B(x))` |
