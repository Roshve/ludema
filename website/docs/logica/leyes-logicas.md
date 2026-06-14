---
id: leyes-logicas
title: Leyes Lógicas (Equivalencias)
---

# Leyes Lógicas

Dos fórmulas son **lógicamente equivalentes** (`≡`) si tienen los mismos valores de
verdad en todas las filas de sus tablas.

## Las 14 leyes fundamentales

| Ley | Fórmula |
|-----|---------|
| **Involución (Doble Negación)** | `¬¬p ≡ p` |
| **Idempotencia** | `p ∧ p ≡ p` · `p ∨ p ≡ p` |
| **Conmutativa** | `p ∧ q ≡ q ∧ p` · `p ∨ q ≡ q ∨ p` |
| **Asociativa** | `(p ∧ q) ∧ r ≡ p ∧ (q ∧ r)` (también para ∨) |
| **Distributiva** | `p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)` |
| | `p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)` |
| **De Morgan** | `¬(p ∧ q) ≡ ¬p ∨ ¬q` |
| | `¬(p ∨ q) ≡ ¬p ∧ ¬q` |
| **Absorción** | `p ∧ (p ∨ q) ≡ p` · `p ∨ (p ∧ q) ≡ p` |
| **Identidad (Neutro)** | `p ∧ V ≡ p` · `p ∨ F ≡ p` |
| **Dominación** | `p ∧ F ≡ F` · `p ∨ V ≡ V` |
| **Complementación** | `p ∧ ¬p ≡ F` · `p ∨ ¬p ≡ V` |
| **Def. de Condicional** | `p ⇒ q ≡ ¬p ∨ q` |
| **Contrarrecíproco** | `p ⇒ q ≡ ¬q ⇒ ¬p` |
| **Neg. del Condicional** | `¬(p ⇒ q) ≡ p ∧ ¬q` |
| **Def. de Bicondicional** | `p ⇔ q ≡ (p ⇒ q) ∧ (q ⇒ p)` |

## Condicionales asociados

Dado `p ⇒ q`:

| Nombre | Fórmula | ¿Equivale al original? |
|--------|---------|------------------------|
| Original | `p ⇒ q` | — |
| **Contrarrecíproco** | `¬q ⇒ ¬p` | ✅ Sí |
| Recíproco | `q ⇒ p` | ❌ No |
| Contrario | `¬p ⇒ ¬q` | ❌ No |

## Cómo simplificar una fórmula

Estrategia recomendada:

1. Aplicar **De Morgan** para pasar negaciones hacia adentro.
2. Aplicar **Involución** para eliminar dobles negaciones.
3. Aplicar **Distributiva** para reagrupar.
4. Aplicar **Absorción**, **Identidad** o **Dominación** para simplificar.
5. Si queda un condicional, usar **Def. de Condicional** (`⇒ ≡ ¬ ∨`).

:::tip Orden sugerido
Empezá siempre por las **De Morgan** — limpian la fórmula rápidamente y abren
el camino a las demás leyes.
:::
