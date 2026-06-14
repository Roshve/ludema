---
id: inferencia-y-contraejemplos
title: Inferencia y Contraejemplos
---

# Inferencia y Contraejemplos

## Validez de un razonamiento

Un razonamiento es **válido** cuando es imposible que todas las premisas sean verdaderas
y la conclusión sea falsa: es decir, las premisas **implican lógicamente** la conclusión.

Un razonamiento es **inválido** si existe al menos un **contraejemplo**: una asignación
de valores que hace V todas las premisas y F la conclusión.

## Reglas de inferencia proposicionales

| Nombre | Premisas | Conclusión |
|--------|----------|-----------|
| **Modus Ponens (MP)** | `p ⇒ q`, `p` | `q` |
| **Modus Tollens (MT)** | `p ⇒ q`, `¬q` | `¬p` |
| **Silogismo Hipotético (SH)** | `p ⇒ q`, `q ⇒ r` | `p ⇒ r` |
| **Silogismo Disyuntivo (SD)** | `p ∨ q`, `¬p` | `q` |
| **Simplificación** | `p ∧ q` | `p` |
| **Adición** | `p` | `p ∨ q` |
| **Conjunción** | `p`, `q` | `p ∧ q` |
| **Dilema Constructivo (DC)** | `p ∨ q`, `p ⇒ r`, `q ⇒ s` | `r ∨ s` |

## Reglas de inferencia con cuantificadores

| Nombre | Premisa | Conclusión |
|--------|---------|-----------|
| **Especificación Universal (EU)** | `∀x: p(x)` | `p(a)` (a cualquiera) |
| **Particularización Existencial (PE)** | `∃x: p(x)` | `p(a)` (a testigo) |
| **Generalización Universal (GU)** | `p(a)` (a arbitrario) | `∀x: p(x)` |
| **Generalización Existencial (GE)** | `p(a)` | `∃x: p(x)` |

## Métodos para verificar validez

### 1. Tabla de verdad (2ⁿ filas)

Hacer la tabla completa. Si no hay ninguna fila donde todas las premisas sean V y la
conclusión sea F: **válido**. Si hay alguna: **inválido** (esa fila es el contraejemplo).

### 2. Método del absurdo (más eficiente)

Asumir que las premisas son V y la conclusión es F. Si llegamos a una **contradicción**,
el razonamiento es válido (no puede existir ese escenario). Si no hay contradicción,
encontramos el contraejemplo.

Pasos:
1. Poner la conclusión en F.
2. Usar ese valor para forzar valores en las premisas.
3. Ver si alguna premisa resulta F (contradicción → válido) o si todas
   pueden ser V simultáneamente (inválido → ese es el contraejemplo).

### 3. Deducción formal

Derivar la conclusión aplicando reglas de inferencia paso a paso, citando en cada
línea qué premisas se usaron y qué regla se aplicó.

```
(1) p ⇒ q        premisa
(2) q ⇒ r        premisa
(3) p ⇒ r        SH de (1) y (2)
(4) p             premisa
(5) r             MP de (3) y (4)
```

## Comparación de métodos

| Método | Cuándo usarlo |
|--------|---------------|
| Tabla de verdad | Pocas variables (≤3), verificación exhaustiva |
| Absurdo | Rápido con muchas variables; ideal en examen |
| Deducción formal | Cuando se pide demostración explícita |
