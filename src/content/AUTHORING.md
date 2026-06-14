# Andamiaje de autoría — `src/content/`

> Leé esto **antes** de generar o editar `unit*.ts`.
> Después corré `pnpm validate:content` hasta que termine con exit 0.

---

## Flujo de trabajo

```
generar / editar unit*.ts
        ↓
pnpm validate:content          ← chequea estructura, IDs y semántica
        ↓ issues?
corregir los [error]           ← los [warn] de convención de ID no rompen el loop
        ↓
exit 0  ✓  →  listo para commitear
```

Para cambios de código (componentes, motor, stores): usá `pnpm check` (lint + test + build).

---

## Notación del motor proposicional

Solo aplica a los tipos `truth-table`, `classify`, `counterexample`, y al parsing parcial de `simplify-steps` / `deduction-steps` / `build-expression`.

| Conectivo     | Símbolos aceptados            |
| ------------- | ----------------------------- |
| Negación      | `¬` `∼` `~`                   |
| Conjunción    | `∧` `&`                       |
| Disyunción    | `∨` `\|`                      |
| Condicional   | `⇒` `→` `->`                  |
| Bicondicional | `⇔` `↔` `<->`                 |
| Variables     | letras minúsculas `p q r s t` |

**Precedencia** (de mayor a menor): `¬ > ∧ > ∨ > ⇒` (asocia por derecha) `> ⇔`

---

## Jerarquía e IDs

```
Unit        uN
Section     uN-{a|b|c|d|e}
Lesson      uN-{sec}-l{n}
Exercise    {lessonId}-c{n}    ← tarjeta de concepto (no evaluada)
            {lessonId}-e{n}    ← ejercicio evaluado
```

**Reglas:**

- IDs **únicos globalmente** — una colisión es `[error]` que el compilador no detecta (el `Map` de `index.ts` sobreescribe en silencio).
- El prefijo jerárquico es convención, se reporta como `[warn]`, no rompe el loop.
- El **orden** del array `exercises` define la secuencia del jugador, no el número del ID.
- `accent` por sección, en orden A→E: `blue`, `cyan`, `violet`, `indigo`, `fuchsia`.

---

## Motor vs. autorado

| Tipo               | ¿Motor valida?                                                                                                   |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `truth-table`      | ⚙️ Sí — parsea `formula`, verifica que tenga ≥1 variable                                                         |
| `classify`         | ⚙️ Sí — parsea `formula`, corre `classify()`                                                                     |
| `counterexample`   | ⚙️ Sí — parsea premisas+conclusión, verifica que el argumento sea **inválido**                                   |
| `simplify-steps`   | ⚙️ Parcial — verifica equivalencia lógica si `start`/`result` son proposicionales                                |
| `build-expression` | ⚙️ Parcial — parsea `answer` si parece proposicional; siempre chequea que `answer ⊆ bank`                        |
| `deduction-steps`  | ⚙️ Parcial — parsea premisas y `result` si son proposicionales; **no** verifica la corrección lógica de la regla |
| `concept`          | ✗ Solo estructura                                                                                                |
| `multiple-choice`  | ✗ Solo estructura                                                                                                |
| `tap-proposition`  | ✗ Solo estructura                                                                                                |

**Regla de oro para Unidad 2:** si una fórmula contiene cuantificadores (∀∃), notación de conjuntos (∩∪⊆∅, mayúsculas A B, `ᶜ`, U), predicados (`p(x)`), o constantes V/F — el motor la **omite** sin reportar error. La corrección del contenido queda en tus manos.

---

## Los 9 tipos de ejercicio

### 1. `concept` — autorado

Tarjeta de teoría. **No puntúa, no gasta corazones, no cuenta para XP.** El `prompt` hace de título.

```ts
{
  id: "u1-a-l1-c1",
  type: "concept",
  prompt: "¿Qué es una proposición?",
  body: [
    "Una proposición es un enunciado del que tiene sentido decir si es VERDADERO o FALSO.",
    "«2 + 3 = 5» es una proposición (verdadera). «París está en Italia» también lo es: es falsa, pero AFIRMA algo.",
  ],
  example: "Proposición = se le puede asignar V o F",   // opcional
  explanation: "...",                                   // opcional en concepts
}
```

**El validador exige:**

- `body`: array de strings, ≥1 elemento.
- `prompt`: string no vacío.
- `example`: opcional; string de una sola línea (fórmula o mnemónico).

---

### 2. `tap-proposition` — autorado

El jugador toca las frases que son proposiciones lógicas.

```ts
{
  id: "u1-a-l1-e1",
  type: "tap-proposition",
  prompt: "Toca todas las frases que sean proposiciones lógicas.",
  items: [
    { text: "2 + 3 = 5",                                    isProposition: true  },
    { text: "¿Qué hora es?",                                 isProposition: false },
    { text: "Caracas es la capital de Venezuela.",           isProposition: true  },
    { text: "¡Cierra la puerta!",                            isProposition: false },
    { text: "x + 1 = 4",                                    isProposition: false },
  ],
  explanation: "Una proposición afirma algo que es verdadero o falso. Las preguntas, órdenes y expresiones con variables libres no lo son.",
}
```

**El validador exige:**

- `items`: array de objetos `{ text: string, isProposition: boolean }`, ≥1 elemento.
- Incluir al menos un `true` y un `false` para que el ejercicio tenga sentido (convención, no validado automáticamente).

---

### 3. `multiple-choice` — autorado

Opción múltiple de respuesta única. Sirve para clasificación, identificar reglas de inferencia, cuantificadores, conjuntos, V/F, etc.

```ts
{
  id: "u1-a-l1-e6",
  type: "multiple-choice",
  prompt: "«El 7 es un número primo». ¿Es una proposición lógica?",
  options: [
    "Sí: afirma algo que es verdadero o falso",
    "No: es una opinión",
    "No: los números no son proposiciones",
    "Solo si es verdadera",
  ],
  correctIndex: 0,   // 0-based; NO siempre es 0, variarlo para evitar sesgos
  explanation: "Afirma algo comprobable. Ser V o F no importa: basta con que se le pueda asignar un valor.",
}
```

**El validador exige:**

- `options`: array de strings, ≥2 opciones.
- `correctIndex`: entero ≥0 y **en rango** (< `options.length`). Error si está fuera de rango.
- `explanation`: siempre presente en ejercicios evaluados (convención de estilo).

---

### 4. `build-expression` — autorado + ⚙️ parsing parcial

El jugador arrastra bloques del banco para formar la expresión correcta. El banco puede incluir distractores.

```ts
{
  id: "u1-a-l2-e3",
  type: "build-expression",
  prompt: "Traduce: «No llueve o hace frío».  (p: llueve, q: hace frío)",
  bank: ["p", "q", "¬", "∨", "∧", "⇒"],   // incluye distractores
  answer: ["¬", "p", "∨", "q"],             // todos deben estar en bank
  explanation: "La negación afecta solo a p: ¬p ∨ q.",
}
```

**El validador exige:**

- `bank`: array de strings, ≥1 elemento.
- `answer`: array de strings, ≥1 elemento.
- **Todos los tokens de `answer` deben estar en `bank`** — si falta alguno, es `[error]`.
- Si `answer` unido es proposicional (solo operadores y variables `p q r s t`), se verifica que parsee como fórmula válida.

---

### 5. `truth-table` — ⚙️ motor

El motor calcula la columna esperada; el jugador la completa. **No autorás la respuesta.**

```ts
{
  id: "u1-b-l1-e1",
  type: "truth-table",
  prompt: "Completa la columna final de la tabla de verdad.",
  formula: "p ∧ q",
  explanation: "La conjunción solo es verdadera cuando p y q lo son.",
}
```

**El validador exige:**

- `formula`: parseable por el motor (operadores y variables en notación proposicional).
- Al menos 1 variable proposicional — si no hay variables, es `[warn]`.
- Usá solo variables `p q r s t`.

---

### 6. `classify` — ⚙️ motor

El motor calcula si la fórmula es **tautología / contradicción / contingencia**. **No autorás la respuesta.**

```ts
{
  id: "u1-b-l2-e1",
  type: "classify",
  prompt: "Clasifica la proposición: p ⇒ p",
  formula: "p ⇒ p",
  timeLimit: 10,     // opcional, en segundos
  explanation: "Siempre verdadera: es una tautología.",
}
```

**El validador exige:**

- `formula`: parseable por el motor.
- `timeLimit`: positivo si se provee; omitirlo si no querés contador.
- El motor calcula la clasificación — si hay un error interno de `classify()`, se reporta como `[error]`.

---

### 7. `simplify-steps` — autorado + ⚙️ equivalencia parcial

El jugador elige la ley aplicada en cada paso de la simplificación.

**Caso proposicional** (Unidad 1 — el motor verifica equivalencia):

```ts
{
  id: "u1-c-l1-e5",
  type: "simplify-steps",
  prompt: "Simplifica  ¬(p ∨ ¬q)  aplicando De Morgan e Involución.",
  start: "¬(p ∨ ¬q)",
  steps: [
    {
      options: ["De Morgan", "Doble negación", "Conmutativa"],
      correctIndex: 0,
      result: "¬p ∧ ¬¬q",    // equivalente lógico de start — el validador lo verifica
    },
    {
      options: ["Doble negación (Involución)", "De Morgan", "Identidad"],
      correctIndex: 0,
      result: "¬p ∧ q",       // equivalente lógico del paso anterior — el validador lo verifica
    },
  ],
  explanation: "Primero se aplica De Morgan: ¬p ∧ ¬¬q, y luego Involución en ¬¬q: ¬p ∧ q.",
}
```

**Caso de conjuntos / U2** (notación no proposicional — el motor omite la verificación):

```ts
{
  id: "u2-b-l4-e4",
  type: "simplify-steps",
  prompt: "Aplicá la ley correcta para simplificar (A ∩ B)ᶜ paso a paso.",
  start: "(A ∩ B)ᶜ",          // contiene mayúsculas → motor lo omite
  steps: [
    {
      options: [
        "De Morgan: (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ",
        "Involución: (Aᶜ)ᶜ = A",
        "Complementación: A ∩ Aᶜ = ∅",
      ],
      correctIndex: 0,
      result: "Aᶜ ∪ Bᶜ",      // correctitud: responsabilidad del autor
    },
  ],
  explanation: "Por De Morgan: el complemento de una intersección es la unión de los complementos.",
}
```

**El validador exige:**

- `start`: string no vacío.
- Si `start` es proposicional: debe parsear; cada `result` debe parsear **y ser lógicamente equivalente al paso anterior**. Si no son equivalentes → `[error]`.
- Si `start` contiene notación de conjuntos/mayúsculas/V/F: el motor corta la verificación — la corrección queda en tus manos.
- `options`: ≥2 por paso; `correctIndex` en rango.
- `steps`: ≥1 paso.

---

### 8. `counterexample` — ⚙️ motor

El jugador asigna valores de verdad que hagan verdaderas las premisas y falsa la conclusión. El motor valida la asignación.

```ts
{
  id: "u1-e-l2-e1",
  type: "counterexample",
  prompt:
    "Este razonamiento (Falacia de afirmar el consecuente) es INVÁLIDO. Asigna valores para probarlo.\nPremisas: p ⇒ q ,  q     Conclusión: p",
  premises: ["p ⇒ q", "q"],
  conclusion: "p",
  variables: ["p", "q"],    // orden de presentación al jugador
  explanation:
    "Con p = F y q = V, el condicional es V, q es V, pero la conclusión p es F.",
}
```

**El validador exige:**

- `premises`: ≥1, todas parseables (si son proposicionales).
- `conclusion`: string no vacío, parseable.
- El argumento **debe ser inválido** (debe existir un contraejemplo). Si el argumento es válido → `[error]`. Nunca uses `counterexample` para argumentos válidos — usá `deduction-steps` en su lugar.
- `variables`: debe cubrir todas las variables que aparecen en las fórmulas; extra → `[warn]`; faltantes → `[warn]`.

---

### 9. `deduction-steps` — autorado + ⚙️ parsing parcial

El jugador justifica cada línea de una derivación formal eligiendo la regla de inferencia.

```ts
{
  id: "u1-e-l5-e1",
  type: "deduction-steps",
  prompt: "Justifica cada línea de la demostración para concluir ¬p.",
  premises: ["p ⇒ q", "q ⇒ r", "¬r"],
  steps: [
    {
      options: ["Silogismo Hipotético (SH)", "Modus Ponens (MP)", "Conjunción"],
      correctIndex: 0,
      result: "p ⇒ r",
      from: "de 1 y 2",    // opcional
    },
    {
      options: ["Modus Tollens (MT)", "Silogismo Disyuntivo (SD)", "Adición"],
      correctIndex: 0,
      result: "¬p",
      from: "de 4 y 3",
    },
  ],
  explanation:
    "Encadenando los condicionales (SH): p ⇒ r; negando el consecuente con ¬r (MT): ¬p.",
}
```

**El validador exige:**

- `premises`: ≥1, parseables si son proposicionales.
- `steps`: ≥1 paso; `result` parseable si es proposicional.
- `correctIndex` en rango de `options`.
- **El motor NO verifica que la regla de inferencia sea lógicamente correcta** — solo estructura y parseo. La corrección de la derivación queda en tus manos.
- Para U2 (lenguaje natural en `premises`/`result`): el motor ignora esas líneas, sin error.

---

## Estilo de contenido

- **Español rioplatense** — "completá", "elegí", "Justificá", "Aplicá".
- `explanation` **siempre presente** en ejercicios evaluados (todos excepto `concept`).
- `⚠️ TRAMPA CLÁSICA:` en el `body` de un `concept` cuando hay confusión frecuente.
- Opciones V/F en `multiple-choice` con la justificación embebida: `"Falso — |∅| = 0, no tiene ningún elemento"`.
- No varíes el orden de las opciones para que `correctIndex: 0` sea siempre la respuesta — alternalo entre lecciones.

---

## Mapa de errores → causa → sección relevante

| Mensaje del validador                                                    | Causa más frecuente                                                       | Sección para corregir                               |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------- | --------------------------------------------------- |
| `formula no parseable: Carácter inesperado ...`                          | Carácter fuera del set del motor (∀, A, V, ᶜ) o sintaxis rota             | §Motor vs. autorado, §truth-table/classify          |
| `ID duplicado: "u2-c-l1-e2"`                                             | Copiaste un bloque sin cambiar el ID                                      | §Jerarquía e IDs                                    |
| `tokens en answer que no están en bank: "⇔"`                             | `answer` usa un token que olvidaste agregar al `bank`                     | §build-expression                                   |
| `paso N: result "..." no es lógicamente equivalente a "..."`             | Aplicaste mal la ley o hay un typo en `result`                            | §simplify-steps                                     |
| `el argumento es VÁLIDO, pero un ejercicio 'counterexample' debe ...`    | Usaste un argumento válido; el jugador no podría hallar contraejemplo     | §counterexample                                     |
| `correctIndex (3) fuera de rango (options tiene 3 elementos)`            | `correctIndex` es 1-based en vez de 0-based, o hay una opción de menos    | §multiple-choice, §simplify-steps, §deduction-steps |
| `Convención de ID: ejercicio "u2-c-l1-e3" debería empezar con "u2-c-l1"` | ID copiado de otra lección sin actualizar el prefijo (`[warn]`, no rompe) | §Jerarquía e IDs                                    |
