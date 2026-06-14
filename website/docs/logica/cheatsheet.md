---
id: cheatsheet
title: Cheatsheet
---

# Cheatsheet de Lógica

Referencia rápida para tener a mano en el estudio y en el parcial.

## Equivalencias lógicas

| Ley | Fórmula |
|-----|---------|
| Involución (Doble Negación) | `¬¬p ≡ p` |
| Idempotencia | `p ∧ p ≡ p` · `p ∨ p ≡ p` |
| Conmutativa | `p ∧ q ≡ q ∧ p` · `p ∨ q ≡ q ∨ p` |
| Asociativa | `(p ∧ q) ∧ r ≡ p ∧ (q ∧ r)` · (también ∨) |
| Distributiva | `p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)` |
| | `p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)` |
| De Morgan | `¬(p ∧ q) ≡ ¬p ∨ ¬q` |
| | `¬(p ∨ q) ≡ ¬p ∧ ¬q` |
| Absorción | `p ∧ (p ∨ q) ≡ p` · `p ∨ (p ∧ q) ≡ p` |
| Identidad (Neutro) | `p ∧ V ≡ p` · `p ∨ F ≡ p` |
| Dominación | `p ∧ F ≡ F` · `p ∨ V ≡ V` |
| Complementación | `p ∧ ¬p ≡ F` · `p ∨ ¬p ≡ V` |
| Def. de Condicional | `p ⇒ q ≡ ¬p ∨ q` |
| Contrarrecíproco | `p ⇒ q ≡ ¬q ⇒ ¬p` |
| Neg. del Condicional | `¬(p ⇒ q) ≡ p ∧ ¬q` |
| Def. de Bicondicional | `p ⇔ q ≡ (p ⇒ q) ∧ (q ⇒ p)` |

## Reglas de inferencia

| Regla | Premisas | Conclusión |
|-------|----------|-----------|
| Modus Ponens (MP) | `p ⇒ q`, `p` | `∴ q` |
| Modus Tollens (MT) | `p ⇒ q`, `¬q` | `∴ ¬p` |
| Silogismo Hipotético (SH) | `p ⇒ q`, `q ⇒ r` | `∴ p ⇒ r` |
| Silogismo Disyuntivo (SD) | `p ∨ q`, `¬p` | `∴ q` |
| Simplificación | `p ∧ q` | `∴ p` |
| Adición | `p` | `∴ p ∨ q` |
| Conjunción | `p`, `q` | `∴ p ∧ q` |
| Dilema Constructivo (DC) | `p ∨ q`, `p ⇒ r`, `q ⇒ s` | `∴ r ∨ s` |
| Especificación Universal (EU) | `∀x: p(x)` | `∴ p(a)` |
| Particularización Existencial (PE) | `∃x: p(x)` | `∴ p(a)` (testigo) |
| Generalización Universal (GU) | `p(a)` (arbitrario) | `∴ ∀x: p(x)` |
| Generalización Existencial (GE) | `p(a)` | `∴ ∃x: p(x)` |

## Clasificación de fórmulas

| Tipo | Definición |
|------|-----------|
| Tautología | V en **todas** las filas |
| Contradicción | F en **todas** las filas |
| Contingencia | V en algunas, F en otras |

## Negación de cuantificadores

| Fórmula | Equivale a |
|---------|-----------|
| `¬∀x: p(x)` | `∃x: ¬p(x)` |
| `¬∃x: p(x)` | `∀x: ¬p(x)` |

## Condicionales asociados

| Nombre | Fórmula | Equivale a `p ⇒ q` |
|--------|---------|-------------------|
| Contrarrecíproco | `¬q ⇒ ¬p` | ✅ Sí |
| Recíproco | `q ⇒ p` | ❌ No |
| Contrario | `¬p ⇒ ¬q` | ❌ No |

## Traducciones frecuentes al lenguaje natural

| Lenguaje natural | Símbolo |
|-----------------|---------|
| «si p entonces q» / «p solo si q» | `p ⇒ q` |
| «p es suficiente para q» | `p ⇒ q` |
| «q es necesario para p» | `p ⇒ q` |
| «p a menos que q» | `p ∨ q` (a menos que ≈ o) |
| «todos los A son B» | `∀x: A(x) ⇒ B(x)` |
| «algunos A son B» | `∃x: A(x) ∧ B(x)` |
