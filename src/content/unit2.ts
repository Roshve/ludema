import type { Unit } from "./types";

// Unidad 2: Conjuntos e Inducción.
// Motor de validación: 100 % autorado (sin evaluación proposicional).
// Los 4 tipos usados son: concept · multiple-choice · simplify-steps · deduction-steps.
export const unit2: Unit = {
  id: "u2",
  title: "Unidad 2 · Conjuntos",
  subtitle: "Conjuntos, operaciones, demostraciones e inducción",
  available: true,
  sections: [
    // ── Sección A · Conjuntos: nociones básicas ──────────────────────────────
    {
      id: "u2-a",
      title: "Conjuntos: nociones básicas",
      description:
        "Definición, cardinal, pertenencia, conjuntos numéricos e inclusión.",
      accent: "blue",
      // ── Guía / cheatsheet (genera /guide/u2-a automáticamente) ─────────────
      guide: {
        levels: [
          {
            emoji: "📦",
            title: "¿Qué es un conjunto?",
            intro:
              "Un conjunto es una colección de objetos de una misma especie. Los objetos se llaman elementos.",
            entries: [
              {
                text: "Los conjuntos se denotan con letras MAYÚSCULAS (A, B, C…) y sus elementos con minúsculas (a, b, c…).",
              },
              {
                term: "Por extensión",
                symbol: "{ }",
                text: "Se enumeran todos los elementos: A = { a, e, i, o, u }.",
              },
              {
                term: "Por comprensión",
                symbol: "{ / }",
                text: "Se describe la propiedad que cumplen: A = { x / x es una vocal }.",
              },
              {
                term: "Cardinal",
                symbol: "| |",
                text: "|A| = n indica que A tiene n elementos (finito). |A| = ∞ si el conjunto es infinito.",
              },
              {
                term: "Conjunto vacío",
                symbol: "∅",
                text: "∅ = { } = { x / x ≠ x }  →  |∅| = 0. ⚠️  {∅} NO es el vacío: es un conjunto con un elemento (el propio ∅), por lo que |{∅}| = 1.",
              },
            ],
          },
          {
            emoji: "🔗",
            title: "Pertenencia e inclusión",
            intro:
              "Dos relaciones distintas: una vincula un elemento con un conjunto; la otra vincula dos conjuntos entre sí.",
            entries: [
              {
                term: "Pertenencia",
                symbol: "∈",
                text: "x ∈ A — el elemento x pertenece al conjunto A. x ∉ A — no pertenece. Relaciona ELEMENTO con CONJUNTO.",
              },
              {
                term: "Conjuntos numéricos",
                symbol: "ℝ",
                text: "ℕ ⊆ ℤ ⊆ ℚ ⊆ ℝ. Ejemplos: −2 ∉ ℕ  ;  1/3 ∈ ℚ  ;  √(−4) ∉ ℝ  ;  √169 = 13 ∈ ℕ.",
              },
              {
                term: "Inclusión",
                symbol: "⊆",
                text: "A ⊆ B  ⟺  ∀x: [ x ∈ A ⇒ x ∈ B ]. Todos los de A también están en B. Relaciona CONJUNTO con CONJUNTO.",
              },
              {
                term: "4 propiedades",
                text: "(1) A ⊆ A  (2) ∅ ⊆ A  (3) A ⊆ U  (4) A ⊆ B ∧ B ⊆ C ⇒ A ⊆ C",
              },
              {
                term: "Universal",
                symbol: "U",
                text: "U contiene todos los elementos del universo de discurso. En Venn se dibuja como un rectángulo.",
              },
              {
                term: "Igualdad",
                text: "X = Y  ⟺  X ⊆ Y ∧ Y ⊆ X  (se incluyen mutuamente).",
              },
            ],
          },
        ],
        tip: "La confusión más frecuente: ∈ conecta un ELEMENTO con un CONJUNTO (a ∈ A); ⊆ conecta dos CONJUNTOS (A ⊆ B). Y cuidado: ∅ ∈ A (el vacío figura como elemento) es distinto de ∅ ⊆ A (siempre verdadero por la propiedad 2).",
      },
      lessons: [
        // ── u2-a-l1 · ¿Qué es un conjunto? ─────────────────────────────────
        {
          id: "u2-a-l1",
          title: "¿Qué es un conjunto?",
          subtitle: "Nivel 1 · Definición y representación",
          exercises: [
            // ─ Tarjetas de concepto ─────────────────────────────────────────
            {
              id: "u2-a-l1-c1",
              type: "concept",
              prompt: "¿Qué es un conjunto?",
              body: [
                "Un conjunto es una colección de objetos de una misma especie.",
                "Los objetos que forman un conjunto se llaman ELEMENTOS.",
                "Por convención: los conjuntos se denotan con letras MAYÚSCULAS (A, B, C…) y los elementos con letras minúsculas (a, b, c…).",
                "Ejemplo: A = { a, e, i, o, u }  —  A es el conjunto; a, e, i, o, u son sus elementos.",
              ],
              example: "Conjunto A = { a, e, i, o, u }  →  5 elementos",
            },
            {
              id: "u2-a-l1-c2",
              type: "concept",
              prompt: "Tres formas de expresar un conjunto",
              body: [
                "Por EXTENSIÓN: se enumeran todos los elementos entre llaves, separados por comas.",
                "   Ejemplo: B = { 2, 4, 6, 8 }",
                "Por COMPRENSIÓN: se describe la propiedad característica que cumplen sus elementos.",
                "   Ejemplo: B = { x / x es un número par positivo menor que 9 }",
                "Por DIAGRAMA DE VENN: se dibuja una curva cerrada y los elementos se escriben adentro.",
                "Las tres representaciones describen el mismo conjunto; elegir la más cómoda según el contexto.",
              ],
              example: "Extensión: B = {2,4,6,8}  ↔  Comprensión: B = {x / x es par, 0 < x < 9}",
            },
            // ─ Ejercicios evaluados ─────────────────────────────────────────
            {
              id: "u2-a-l1-e1",
              type: "multiple-choice",
              prompt:
                "El conjunto B = { x / x es un número par positivo menor que 9 } está expresado por…",
              options: [
                "Comprensión — describe la propiedad de sus elementos",
                "Extensión — enumera sus elementos uno por uno",
                "Diagrama de Venn — representa el conjunto gráficamente",
                "Cardinal — indica la cantidad de elementos",
              ],
              correctIndex: 0,
              explanation:
                "Comprensión usa la notación { x / propiedad }. Extensión enumeraría directamente {2, 4, 6, 8}.",
            },
            {
              id: "u2-a-l1-e2",
              type: "multiple-choice",
              prompt:
                "¿Cuál es la forma por EXTENSIÓN del conjunto B = { x / x es un número par positivo menor que 9 }?",
              options: [
                "{ 2, 4, 6, 8 }",
                "{ 1, 2, 3, 4, 5, 6, 7, 8 }",
                "{ 0, 2, 4, 6, 8 }",
                "{ 2, 4, 6, 8, 10 }",
              ],
              correctIndex: 0,
              explanation:
                "Los números pares positivos menores que 9 son exactamente 2, 4, 6 y 8. El 0 no es positivo; el 10 no es menor que 9.",
            },
            {
              id: "u2-a-l1-e3",
              type: "multiple-choice",
              prompt:
                "Sea A = { a, e, i, o, u }. ¿Cuál de los siguientes objetos ES un elemento de A?",
              options: [
                "e",
                "b",
                "A  (el propio conjunto)",
                "6",
              ],
              correctIndex: 0,
              explanation:
                "e ∈ A porque figura explícitamente en la extensión del conjunto. b ∉ A, A mismo no es un elemento de sí mismo en esta definición, y 6 es un número, no una vocal.",
            },
          ],
        },

        // ── u2-a-l2 · Cardinal y conjuntos especiales ───────────────────────
        {
          id: "u2-a-l2",
          title: "Cardinal y conjuntos especiales",
          subtitle: "Nivel 1 · Cardinal, vacío e infinito",
          exercises: [
            // ─ Tarjetas de concepto ─────────────────────────────────────────
            {
              id: "u2-a-l2-c1",
              type: "concept",
              prompt: "Cardinal de un conjunto",
              body: [
                "El CARDINAL es la cantidad de elementos que posee un conjunto. Se escribe entre barras verticales: |A|.",
                "|A| = n  →  el conjunto A tiene n elementos (es finito).",
                "|A| = ∞  →  el conjunto A tiene infinitos elementos.",
                "Ejemplos con A = {a,e,i,o,u} y B = {2,4,6,8}:",
                "   |A| = 5     |B| = 4",
                "Un conjunto con un número finito de elementos se llama FINITO; si no, INFINITO.",
              ],
              example: "A = {a, e, i, o, u}  →  |A| = 5",
            },
            {
              id: "u2-a-l2-c2",
              type: "concept",
              prompt: "El conjunto vacío — ¡cuidado con {∅}!",
              body: [
                "El CONJUNTO VACÍO es el que no tiene ningún elemento. Se escribe ∅ o { }.",
                "Se puede definir mediante una contradicción: ∅ = { x / x ≠ x }",
                "Por eso su cardinal es cero: |∅| = 0.",
                "⚠️  TRAMPA CLÁSICA: { ∅ } NO es el conjunto vacío.",
                "{ ∅ } es un conjunto que contiene UN elemento: el propio conjunto vacío.",
                "Es como una bolsa que tiene adentro otra bolsa vacía — la bolsa de afuera no está vacía.",
              ],
              example: "∅ = { }  →  |∅| = 0     pero     |{∅}| = 1",
            },
            // ─ Ejercicios evaluados ─────────────────────────────────────────
            {
              id: "u2-a-l2-e1",
              type: "multiple-choice",
              prompt: "¿Cuál es el cardinal del conjunto A = { a, e, i, o, u }?",
              options: ["5", "4", "6", "∞"],
              correctIndex: 0,
              explanation:
                "|A| = 5 porque A tiene exactamente cinco elementos: a, e, i, o, u.",
            },
            {
              id: "u2-a-l2-e2",
              type: "multiple-choice",
              prompt: "¿Verdadero o Falso? — «El conjunto vacío tiene cardinal 1»",
              options: [
                "Falso — |∅| = 0, no tiene ningún elemento",
                "Verdadero — tiene un elemento: el vacío mismo",
                "Verdadero — cualquier conjunto tiene al menos cardinal 1",
                "Falso — el cardinal del vacío es ∞",
              ],
              correctIndex: 0,
              explanation:
                "|∅| = 0. El conjunto vacío no contiene ningún elemento, por eso su cardinal es cero, no 1.",
            },
            {
              id: "u2-a-l2-e3",
              type: "multiple-choice",
              prompt: "¿Verdadero o Falso? — «{∅} es el conjunto vacío»",
              options: [
                "Falso — {∅} tiene un elemento: el conjunto vacío; |{∅}| = 1",
                "Verdadero — {∅} y ∅ son la misma notación",
                "Verdadero — ∅ dentro de llaves sigue siendo vacío",
                "Falso — {∅} no existe como conjunto",
              ],
              correctIndex: 0,
              explanation:
                "{∅} contiene un elemento (el propio ∅), así que |{∅}| = 1 y no es vacío. ∅ = { } es el vacío; {∅} es 'una bolsa con una bolsa vacía adentro'.",
            },
            {
              id: "u2-a-l2-e4",
              type: "multiple-choice",
              prompt:
                "¿Cuál de los siguientes conjuntos es el VACÍO?",
              options: [
                "{ x / x ≠ x }",
                "{ 0 }",
                "{ x ∈ ℕ / x < 5 }",
                "{ 1, 2, 3, … }",
              ],
              correctIndex: 0,
              explanation:
                "{ x / x ≠ x } es vacío porque ningún objeto puede ser distinto de sí mismo — la propiedad x ≠ x es siempre falsa. Los otros tienen elementos: {0} tiene el cero, {x∈ℕ / x<5} = {0,1,2,3,4}, y {1,2,3,…} es infinito.",
            },
          ],
        },

        // ── u2-a-l3 · Pertenencia ∈/∉ y conjuntos numéricos ─────────────────
        {
          id: "u2-a-l3",
          title: "Pertenencia y conjuntos numéricos",
          subtitle: "Nivel 1 · ∈ y ∉, ℕ ℤ ℚ ℝ",
          exercises: [
            // ─ Tarjetas de concepto ─────────────────────────────────────────
            {
              id: "u2-a-l3-c1",
              type: "concept",
              prompt: "La relación de pertenencia ∈ / ∉",
              body: [
                "La PERTENENCIA es una relación entre un ELEMENTO y un CONJUNTO.",
                "x ∈ A  →  el elemento x pertenece al conjunto A.",
                "x ∉ A  →  el elemento x NO pertenece al conjunto A.",
                "Con A = {a,e,i,o,u} y B = {2,4,6,8}:",
                "   a ∈ A     m ∉ A     4 ∈ B     1 ∉ B",
                "⚠️  Pertenencia (∈) relaciona un ELEMENTO con un CONJUNTO — no dos conjuntos entre sí.",
              ],
              example: "a ∈ {a,e,i,o,u}     m ∉ {a,e,i,o,u}",
            },
            {
              id: "u2-a-l3-c2",
              type: "concept",
              prompt: "Los conjuntos numéricos: ℕ ℤ ℚ ℝ",
              body: [
                "ℕ — Naturales: {0, 1, 2, 3, …}  (con el 0 según la cátedra)",
                "ℤ — Enteros: {…, −2, −1, 0, 1, 2, …}",
                "ℚ — Racionales: fracciones p/q con p,q ∈ ℤ, q ≠ 0",
                "ℝ — Reales: todos los anteriores más los irracionales (√2, π, …)",
                "Están anidados: ℕ ⊆ ℤ ⊆ ℚ ⊆ ℝ",
                "Ejemplos: −2 ∉ ℕ   1/3 ∈ ℚ   √(−4) ∉ ℝ   π ∉ ℤ",
              ],
              example: "ℕ ⊆ ℤ ⊆ ℚ ⊆ ℝ",
            },
            // ─ Ejercicios evaluados ─────────────────────────────────────────
            {
              id: "u2-a-l3-e1",
              type: "multiple-choice",
              prompt: "Completá con ∈ o ∉:  −2 ___ ℕ",
              options: [
                "∉  (−2 no pertenece a ℕ — los naturales son ≥ 0)",
                "∈  (−2 pertenece a ℕ)",
                "∈  (−2 es entero, y ℕ ⊆ ℤ)",
                "∉  (−2 no pertenece a ningún conjunto numérico)",
              ],
              correctIndex: 0,
              explanation:
                "ℕ = {0,1,2,3,…} — solo enteros no negativos. −2 es negativo, por lo que −2 ∉ ℕ. Sí pertenece a ℤ, ℚ y ℝ.",
            },
            {
              id: "u2-a-l3-e2",
              type: "multiple-choice",
              prompt:
                "√169 = 13. ¿A cuál o cuáles conjuntos numéricos pertenece 13?",
              options: [
                "ℕ, ℤ, ℚ y ℝ — pertenece a todos",
                "Solo ℝ",
                "ℚ y ℝ, pero no ℤ",
                "Solo ℕ",
              ],
              correctIndex: 0,
              explanation:
                "13 es natural, por lo tanto también entero, racional y real: ℕ ⊆ ℤ ⊆ ℚ ⊆ ℝ implica que todo natural pertenece a los cuatro conjuntos.",
            },
            {
              id: "u2-a-l3-e3",
              type: "multiple-choice",
              prompt:
                "¿Cuál es el conjunto numérico MÁS PEQUEÑO al que pertenece 1/3?",
              options: [
                "ℚ — es una fracción pero no un entero",
                "ℝ — solo los reales contienen fracciones",
                "ℤ — los enteros incluyen fracciones",
                "ℕ — el 1/3 está implícito en los naturales",
              ],
              correctIndex: 0,
              explanation:
                "1/3 es racional (p/q con p=1, q=3) pero no entero. El conjunto más pequeño que lo contiene es ℚ. Sí pertenece también a ℝ, pero ℚ es más pequeño.",
            },
            {
              id: "u2-a-l3-e4",
              type: "multiple-choice",
              prompt: "Completá con ∈ o ∉:  √(−4) ___ ℝ",
              options: [
                "∉ — √(−4) no es un número real (es imaginario)",
                "∈ — todo número tiene raíz en ℝ",
                "∈ — √(−4) = −2 y −2 ∈ ℝ",
                "∉ — √(−4) no pertenece a ningún conjunto",
              ],
              correctIndex: 0,
              explanation:
                "En ℝ no existe la raíz cuadrada de un número negativo. √(−4) es un número imaginario (2i), que no pertenece a ℝ.",
            },
          ],
        },

        // ── u2-a-l4 · Inclusión e igualdad ──────────────────────────────────
        {
          id: "u2-a-l4",
          title: "Inclusión e igualdad de conjuntos",
          subtitle: "Nivel 2 · ⊆, ⊄ y propiedades",
          exercises: [
            // ─ Tarjetas de concepto ─────────────────────────────────────────
            {
              id: "u2-a-l4-c1",
              type: "concept",
              prompt: "La relación de inclusión ⊆ / ⊄",
              body: [
                "La INCLUSIÓN es una relación entre DOS CONJUNTOS (no entre elemento y conjunto).",
                "A ⊆ B  ⟺  ∀x: [ x ∈ A ⇒ x ∈ B ]",
                "Es decir: todos los elementos de A también pertenecen a B. Se dice que A es subconjunto de B.",
                "A ⊄ B  ⟺  existe algún x tal que x ∈ A pero x ∉ B.",
                "Ejemplo: X = {a,e,i,o,u},  Y = {a,e,o},  Z = {a,b}",
                "   Y ⊆ X  (todos los elementos de Y están en X)",
                "   Z ⊄ X  (b ∈ Z pero b ∉ X)",
                "⚠️  ∈ relaciona elemento con conjunto; ⊆ relaciona conjunto con conjunto.",
              ],
              example: "Y = {a,e,o} ⊆ X = {a,e,i,o,u}     Z = {a,b} ⊄ X",
            },
            {
              id: "u2-a-l4-c2",
              type: "concept",
              prompt: "Propiedades de la inclusión e igualdad de conjuntos",
              body: [
                "Cuatro propiedades básicas de la inclusión:",
                "1. Reflexiva:    ∀A: A ⊆ A  (todo conjunto está incluido en sí mismo)",
                "2. Vacío:        ∀A: ∅ ⊆ A  (el vacío está incluido en todo conjunto)",
                "3. Universal:    ∀A: A ⊆ U  (todo conjunto está incluido en el Universal)",
                "4. Transitiva:   A ⊆ B ∧ B ⊆ C  ⇒  A ⊆ C",
                "El CONJUNTO UNIVERSAL U contiene todos los elementos del universo de discurso; en diagramas de Venn se representa como un rectángulo.",
                "IGUALDAD: X = Y  ⟺  X ⊆ Y ∧ Y ⊆ X",
                "(Todos los elementos de X están en Y, y todos los de Y están en X.)",
              ],
              example: "∅ ⊆ A ⊆ U  para todo conjunto A",
            },
            // ─ Ejercicios evaluados ─────────────────────────────────────────
            {
              id: "u2-a-l4-e1",
              type: "multiple-choice",
              prompt:
                "Sea X = {a, e, i, o, u} e Y = {a, e, o}. ¿Es cierto que Y ⊆ X?",
              options: [
                "Verdadero — a, e y o pertenecen a X; todos los elementos de Y están en X",
                "Falso — Y tiene menos elementos que X, por eso no puede ser subconjunto",
                "Falso — i y u están en X pero no en Y, entonces X ⊄ Y",
                "Verdadero — Y y X tienen letras en común",
              ],
              correctIndex: 0,
              explanation:
                "Y ⊆ X porque cada elemento de Y (a, e, o) también pertenece a X. No es necesario que Y tenga los mismos elementos que X; basta con que todos los de Y estén en X.",
            },
            {
              id: "u2-a-l4-e2",
              type: "multiple-choice",
              prompt:
                "Sea X = {a, e, i, o, u} y Z = {a, b}. ¿Por qué Z ⊄ X?",
              options: [
                "Porque b ∈ Z pero b ∉ X — existe un elemento de Z que no está en X",
                "Porque Z tiene menos elementos que X",
                "Porque a aparece en los dos conjuntos",
                "Porque Z no contiene vocales",
              ],
              correctIndex: 0,
              explanation:
                "Para que Z ⊄ X basta encontrar un elemento de Z que no esté en X. El elemento b cumple eso: b ∈ Z pero b ∉ X.",
            },
            {
              id: "u2-a-l4-e3",
              type: "multiple-choice",
              prompt:
                "¿Cuál de las siguientes afirmaciones es SIEMPRE verdadera, para cualquier conjunto A?",
              options: [
                "∅ ⊆ A  (el conjunto vacío está incluido en todo conjunto)",
                "∅ ∈ A  (el conjunto vacío pertenece como elemento a todo conjunto)",
                "A ⊆ ∅  (todo conjunto está incluido en el vacío)",
                "U ⊆ A  (el Universal está incluido en todo conjunto)",
              ],
              correctIndex: 0,
              explanation:
                "∅ ⊆ A es siempre verdadero (propiedad 2 de la inclusión). En cambio, ∅ ∈ A solo es cierto si ∅ figura explícitamente como elemento de A. U ⊆ A sería A = U, que no es siempre cierto.",
            },
            {
              id: "u2-a-l4-e4",
              type: "multiple-choice",
              prompt:
                "Sea C = {1, 2, {1}, ∅}. ¿Cuál de estas afirmaciones es VERDADERA?",
              options: [
                "∅ ∈ C  y además  ∅ ⊆ C",
                "∅ ∈ C  pero  ∅ ⊄ C",
                "∅ ⊆ C  pero  ∅ ∉ C",
                "C = ∅  porque ∅ es uno de sus elementos",
              ],
              correctIndex: 0,
              explanation:
                "∅ ∈ C porque ∅ figura explícitamente en la extensión de C. Además, ∅ ⊆ C por la propiedad 2 (el vacío está incluido en todo conjunto). Ambas son verdaderas simultáneamente: ∈ e ⊆ son relaciones distintas.",
            },
            {
              id: "u2-a-l4-e5",
              type: "deduction-steps",
              prompt:
                "Justificá cada paso para demostrar que ∅ ⊆ A (el conjunto vacío está incluido en todo conjunto A).",
              premises: [
                "Por definición: ∅ ⊆ A  ⟺  ∀x: [ x ∈ ∅ ⇒ x ∈ A ]",
              ],
              steps: [
                {
                  options: [
                    "Def. del conjunto vacío: ningún x satisface x ∈ ∅; el antecedente es siempre F",
                    "Definición de intersección",
                    "Complementación: A ∩ Aᶜ = ∅",
                  ],
                  correctIndex: 0,
                  result: "El antecedente x ∈ ∅ es SIEMPRE falso (∅ no tiene elementos)",
                  from: "de 1",
                },
                {
                  options: [
                    "Vacuidad del condicional: F ⇒ Q es verdadero para cualquier Q",
                    "Definición de unión",
                    "Modus Ponens",
                  ],
                  correctIndex: 0,
                  result: "∴ x ∈ ∅ ⇒ x ∈ A es V para todo x  →  ∅ ⊆ A  ✓",
                  from: "de 2",
                },
              ],
              explanation:
                "La demostración se basa en la 'verdad vacua': como ningún x puede pertenecer a ∅, la hipótesis es siempre falsa y el condicional x ∈ ∅ ⇒ x ∈ A es trivialmente verdadero. Por eso ∅ ⊆ A para todo A.",
            },
          ],
        },
      ],
    },

    // ── Sección B · Operaciones entre conjuntos ──────────────────────────────
    {
      id: "u2-b",
      title: "Operaciones entre conjuntos",
      description:
        "Unión, intersección, diferencia, complemento, diferencia simétrica y las 10 propiedades.",
      accent: "cyan",
      // ── Guía / cheatsheet (genera /guide/u2-b automáticamente) ─────────────
      guide: {
        levels: [
          {
            emoji: "🔗",
            title: "Operaciones entre conjuntos",
            intro:
              "Dados los conjuntos A y B y un Universal U, se definen las siguientes operaciones.",
            entries: [
              {
                term: "Unión",
                symbol: "∪",
                text: "A ∪ B = { x / x ∈ A ∨ x ∈ B } — todos los elementos de A o de B (o ambos).",
              },
              {
                term: "Intersección",
                symbol: "∩",
                text: "A ∩ B = { x / x ∈ A ∧ x ∈ B } — solo los elementos comunes a los dos.",
              },
              {
                term: "Diferencia",
                symbol: "−",
                text: "A − B = { x / x ∈ A ∧ x ∉ B } — los de A que NO están en B. No es conmutativa: A − B ≠ B − A en general.",
              },
              {
                term: "Complemento",
                symbol: "ᶜ",
                text: "Aᶜ = U − A = { x / x ∉ A } — todos los elementos del Universal que no pertenecen a A. Requiere un U definido.",
              },
              {
                term: "Diferencia simétrica",
                symbol: "△",
                text: "A △ B = (A − B) ∪ (B − A) = (A ∪ B) − (A ∩ B) — los que están en UNO solo de los dos conjuntos.",
              },
              {
                text: "Disjuntos: se dice que A y B son DISJUNTOS cuando A ∩ B = ∅ — no comparten ningún elemento.",
              },
            ],
          },
          {
            emoji: "📜",
            title: "Las 10 propiedades de las operaciones",
            intro:
              "Estas leyes permiten simplificar y demostrar expresiones con conjuntos, igual que las leyes lógicas de la Unidad 1.",
            entries: [
              {
                term: "1. Involución",
                text: "(Aᶜ)ᶜ = A",
              },
              {
                term: "2. Conmutatividad",
                text: "A ∪ B = B ∪ A   ;   A ∩ B = B ∩ A",
              },
              {
                term: "3. Asociatividad",
                text: "A ∪ (B ∪ C) = (A ∪ B) ∪ C   ;   A ∩ (B ∩ C) = (A ∩ B) ∩ C",
              },
              {
                term: "4. Distributividad",
                text: "A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)   ;   A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)",
              },
              {
                term: "5. Idempotencia",
                text: "A ∪ A = A   ;   A ∩ A = A",
              },
              {
                term: "6. De Morgan",
                text: "(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ   ;   (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ",
              },
              {
                term: "7. Neutro y Absorbente",
                text: "A ∩ U = A   ;   A ∪ U = U   ;   A ∩ ∅ = ∅   ;   A ∪ ∅ = A",
              },
              {
                term: "8. Absorción",
                text: "A ∩ (A ∪ B) = A   ;   A ∪ (A ∩ B) = A",
              },
              {
                term: "9. Equiv. diferencia",
                text: "A − B = A ∩ Bᶜ",
              },
              {
                term: "10. Complementación",
                text: "A ∩ Aᶜ = ∅   ;   A ∪ Aᶜ = U",
              },
            ],
          },
        ],
        tip: "Paralelismo con la Unidad 1: ∪ ↔ ∨,  ∩ ↔ ∧,  ᶜ ↔ ¬,  U ↔ V,  ∅ ↔ F. Si recordás la ley lógica, ¡ya sabés su equivalente en conjuntos!",
      },
      lessons: [
        // ── u2-b-l1 · Unión e intersección ──────────────────────────────────
        {
          id: "u2-b-l1",
          title: "Unión e intersección",
          subtitle: "Nivel 2 · ∪ e ∩",
          exercises: [
            // ─ Tarjetas de concepto ─────────────────────────────────────────
            {
              id: "u2-b-l1-c1",
              type: "concept",
              prompt: "Unión ∪ e Intersección ∩",
              body: [
                "UNIÓN: A ∪ B = { x / x ∈ A ∨ x ∈ B }",
                "Todos los elementos que están en A, en B, o en ambos.",
                "INTERSECCIÓN: A ∩ B = { x / x ∈ A ∧ x ∈ B }",
                "Solo los elementos que están al mismo tiempo en A y en B.",
                "Ejemplos con A = {1,2,3,4,5} y B = {2,4,6}:",
                "   A ∪ B = {1,2,3,4,5,6}     A ∩ B = {2,4}",
              ],
              example: "A ∪ B = {1,2,3,4,5,6}   ·   A ∩ B = {2,4}",
            },
            {
              id: "u2-b-l1-c2",
              type: "concept",
              prompt: "Conjuntos disjuntos",
              body: [
                "Dos conjuntos son DISJUNTOS cuando su intersección es vacía: A ∩ B = ∅.",
                "Eso significa que no comparten ningún elemento.",
                "Ejemplo: con A = {1,2,3,4,5} y C = {7}:",
                "   A ∩ C = ∅  →  A y C son disjuntos.",
                "En un diagrama de Venn, los disjuntos se dibujan como dos curvas separadas que no se solapan.",
              ],
              example: "A ∩ C = ∅  →  A y C son disjuntos",
            },
            // ─ Ejercicios evaluados ─────────────────────────────────────────
            {
              id: "u2-b-l1-e1",
              type: "multiple-choice",
              prompt:
                "Sea A = {1, 2, 3, 4, 5} y B = {2, 4, 6}. ¿Cuál es A ∪ B?",
              options: [
                "{1, 2, 3, 4, 5, 6}",
                "{2, 4}",
                "{1, 3, 5}",
                "{1, 2, 3, 4, 5, 6, 7}",
              ],
              correctIndex: 0,
              explanation:
                "A ∪ B reúne todos los elementos de A y de B sin repetir: {1,2,3,4,5} más el 6 de B que no estaba en A. Resultado: {1,2,3,4,5,6}.",
            },
            {
              id: "u2-b-l1-e2",
              type: "multiple-choice",
              prompt:
                "Sea A = {1, 2, 3, 4, 5} y B = {2, 4, 6}. ¿Cuál es A ∩ B?",
              options: [
                "{2, 4}",
                "{1, 2, 3, 4, 5, 6}",
                "{1, 3, 5, 6}",
                "{6}",
              ],
              correctIndex: 0,
              explanation:
                "A ∩ B contiene solo los elementos que están en los DOS conjuntos a la vez. De A solo 2 y 4 también están en B → A ∩ B = {2, 4}.",
            },
            {
              id: "u2-b-l1-e3",
              type: "multiple-choice",
              prompt:
                "Sea A = {1,2,3,4,5}, B = {2,4,6} y C = {7}. ¿Cuál de los siguientes pares de conjuntos es DISJUNTO?",
              options: [
                "A y C  (A ∩ C = ∅)",
                "A y B  (A ∩ B = {2,4})",
                "B y C  (B ∩ C = {6,7})",
                "A y B  (A ∩ B = ∅)",
              ],
              correctIndex: 0,
              explanation:
                "A ∩ C = ∅ porque C = {7} y el 7 no pertenece a A = {1,2,3,4,5}. Los demás pares sí comparten elementos: A∩B = {2,4} y B∩C = {6,7} son no-vacíos.",
            },
            {
              id: "u2-b-l1-e4",
              type: "multiple-choice",
              prompt:
                "Sea C = {7} y D = {6, 7}. ¿Es verdad que C ∪ D = D?",
              options: [
                "Verdadero — C ⊆ D, por lo tanto C ∪ D = D",
                "Falso — la unión siempre produce un conjunto más grande",
                "Falso — C ∪ D = {6, 7} ≠ D",
                "Verdadero — porque C y D son disjuntos",
              ],
              correctIndex: 0,
              explanation:
                "C = {7} y D = {6,7}: como 7 ∈ D, C ⊆ D. Cuando un conjunto está incluido en otro, la unión es el mayor: C ∪ D = D = {6,7}. En general: C ⊆ D ⟺ C ∪ D = D.",
            },
            {
              id: "u2-b-l1-e5",
              type: "multiple-choice",
              prompt:
                "Sea A = {−3,−2,−1,0,1,2,3} y B = {−1,0,1,2,3,4,5}. ¿Cuál es A ∩ B?",
              options: [
                "{−1, 0, 1, 2, 3}",
                "{−3,−2,−1,0,1,2,3,4,5}",
                "{−3, −2}",
                "{4, 5}",
              ],
              correctIndex: 0,
              explanation:
                "A ∩ B son los elementos comunes. Los que están en ambos son −1, 0, 1, 2 y 3. El −3 y −2 están solo en A; el 4 y 5 están solo en B.",
            },
          ],
        },

        // ── u2-b-l2 · Diferencia y complemento ──────────────────────────────
        {
          id: "u2-b-l2",
          title: "Diferencia y complemento",
          subtitle: "Nivel 2 · − y complemento",
          exercises: [
            // ─ Tarjetas de concepto ─────────────────────────────────────────
            {
              id: "u2-b-l2-c1",
              type: "concept",
              prompt: "Diferencia A − B",
              body: [
                "A − B = { x / x ∈ A ∧ x ∉ B }",
                "Los elementos que están en A pero NO en B.",
                "⚠️  NO es conmutativa: A − B ≠ B − A en general.",
                "Ejemplos con A = {1,2,3,4,5} y B = {2,4,6}:",
                "   A − B = {1,3,5}  (los de A sin los compartidos)",
                "   B − A = {6}       (los de B sin los compartidos)",
                "Propiedad clave: A − B = A ∩ Bᶜ  (equivalencia de la diferencia).",
              ],
              example: "A − B = {1,3,5}   ·   B − A = {6}",
            },
            {
              id: "u2-b-l2-c2",
              type: "concept",
              prompt: "Complemento Aᶜ",
              body: [
                "Aᶜ = U − A = { x / x ∈ U ∧ x ∉ A }",
                "Todos los elementos del Universal que NO pertenecen a A.",
                "⚠️  El complemento necesita un Universal definido — sin U, Aᶜ no está determinado.",
                "Ejemplo con U = {1,2,…,10} y A = {1,2,3,4,5}:",
                "   Aᶜ = {6,7,8,9,10}",
                "Propiedad de complementación: A ∩ Aᶜ = ∅  y  A ∪ Aᶜ = U.",
              ],
              example: "Aᶜ = U − A   ·   A ∩ Aᶜ = ∅   ·   A ∪ Aᶜ = U",
            },
            // ─ Ejercicios evaluados ─────────────────────────────────────────
            {
              id: "u2-b-l2-e1",
              type: "multiple-choice",
              prompt:
                "Sea A = {1, 2, 3, 4, 5} y B = {2, 4, 6}. ¿Cuál es A − B?",
              options: [
                "{1, 3, 5}",
                "{2, 4}",
                "{6}",
                "{1, 2, 3, 4, 5, 6}",
              ],
              correctIndex: 0,
              explanation:
                "A − B conserva los elementos de A que no están en B. Del conjunto A = {1,2,3,4,5}, se eliminan el 2 y el 4 (que sí están en B). Queda {1,3,5}.",
            },
            {
              id: "u2-b-l2-e2",
              type: "multiple-choice",
              prompt:
                "Con los mismos A = {1,2,3,4,5} y B = {2,4,6}, ¿cuánto vale B − A?",
              options: [
                "{6}",
                "{1, 3, 5}",
                "{2, 4}",
                "∅",
              ],
              correctIndex: 0,
              explanation:
                "B − A son los de B que no están en A. De B = {2,4,6}, el 2 y el 4 sí están en A, pero el 6 no → B − A = {6}. Esto confirma que A − B ≠ B − A.",
            },
            {
              id: "u2-b-l2-e3",
              type: "multiple-choice",
              prompt:
                "Sea U = {1,2,3,4,5,6,7,8,9,10} y A = {1,2,3,4,5}. ¿Cuál es Aᶜ?",
              options: [
                "{6, 7, 8, 9, 10}",
                "{1, 2, 3, 4, 5}",
                "∅",
                "{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}",
              ],
              correctIndex: 0,
              explanation:
                "Aᶜ = U − A = todos los de U que no están en A. U tiene los números del 1 al 10; los que no están en A = {1,…,5} son {6,7,8,9,10}.",
            },
            {
              id: "u2-b-l2-e4",
              type: "multiple-choice",
              prompt:
                "¿Cuál de las siguientes afirmaciones es VERDADERA?",
              options: [
                "A − A = ∅  para todo conjunto A",
                "A − B = B − A  siempre",
                "A − ∅ = ∅  para todo conjunto A",
                "A − B = A ∪ Bᶜ",
              ],
              correctIndex: 0,
              explanation:
                "A − A = ∅: al quitarle a A todos sus propios elementos queda vacío, siempre. A − B ≠ B − A (no conmutativa). A − ∅ = A (no ∅). Y la equivalencia correcta es A − B = A ∩ Bᶜ, no A ∪ Bᶜ.",
            },
            {
              id: "u2-b-l2-e5",
              type: "multiple-choice",
              prompt:
                "¿Cuál expresión es EQUIVALENTE a la diferencia A − B?",
              options: [
                "A ∩ Bᶜ",
                "A ∪ Bᶜ",
                "Aᶜ ∩ B",
                "Aᶜ ∪ Bᶜ",
              ],
              correctIndex: 0,
              explanation:
                "Por la ley 9 (equivalencia de la diferencia): A − B = A ∩ Bᶜ. Los elementos en A que no están en B son exactamente los que están en A y en el complemento de B.",
            },
          ],
        },

        // ── u2-b-l3 · Diferencia simétrica ──────────────────────────────────
        {
          id: "u2-b-l3",
          title: "Diferencia simétrica",
          subtitle: "Nivel 2 · △",
          exercises: [
            // ─ Tarjeta de concepto ──────────────────────────────────────────
            {
              id: "u2-b-l3-c1",
              type: "concept",
              prompt: "Diferencia simétrica A △ B",
              body: [
                "A △ B son los elementos que están en UNO solo de los dos conjuntos, no en ambos.",
                "Definición y equivalencias:",
                "   A △ B = (A − B) ∪ (B − A)",
                "         = (A ∪ B) − (A ∩ B)",
                "Es el «or exclusivo» a nivel de conjuntos.",
                "Ejemplo con A = {1,2,3,4,5} y B = {2,4,6}:",
                "   A − B = {1,3,5}   B − A = {6}",
                "   A △ B = {1,3,5,6}",
                "En Venn: son las 'orejas' de A y B sin la parte que se solapa (la intersección).",
              ],
              example: "A △ B = (A − B) ∪ (B − A) = {1,3,5,6}",
            },
            // ─ Ejercicios evaluados ─────────────────────────────────────────
            {
              id: "u2-b-l3-e1",
              type: "multiple-choice",
              prompt:
                "Sea A = {1,2,3,4,5} y B = {2,4,6}. ¿Cuál es A △ B?",
              options: [
                "{1, 3, 5, 6}",
                "{2, 4}",
                "{1, 2, 3, 4, 5, 6}",
                "{1, 3, 5}",
              ],
              correctIndex: 0,
              explanation:
                "A − B = {1,3,5} (los de A sin 2 ni 4); B − A = {6} (el 6 de B no está en A). La unión de ambas diferencias es {1,3,5,6}.",
            },
            {
              id: "u2-b-l3-e2",
              type: "multiple-choice",
              prompt:
                "¿Cuál de las siguientes expresiones define CORRECTAMENTE A △ B?",
              options: [
                "(A − B) ∪ (B − A)",
                "(A ∪ B) ∩ (A ∩ B)",
                "A ∩ Bᶜ",
                "(A ∪ B) ∪ (A ∩ B)",
              ],
              correctIndex: 0,
              explanation:
                "A △ B = (A − B) ∪ (B − A): lo que está solo en A más lo que está solo en B. También equivale a (A ∪ B) − (A ∩ B), no a la intersección con A ∩ B. A ∩ Bᶜ es solo la diferencia A − B.",
            },
            {
              id: "u2-b-l3-e3",
              type: "multiple-choice",
              prompt:
                "¿Cuál de estas combinaciones es COMPLETAMENTE VERDADERA?",
              options: [
                "A △ A = ∅  y  A △ ∅ = A  (ambas verdaderas)",
                "A △ A = A  y  A △ ∅ = ∅  (ambas falsas)",
                "A △ A = ∅  y  A △ ∅ = ∅  (la segunda es falsa)",
                "A △ A = U  y  A △ ∅ = A  (la primera es falsa)",
              ],
              correctIndex: 0,
              explanation:
                "A △ A = (A−A)∪(A−A) = ∅∪∅ = ∅ (los elementos que están en uno solo de A y A no existen). A △ ∅ = (A−∅)∪(∅−A) = A ∪ ∅ = A (el vacío no aporta ni quita).",
            },
            {
              id: "u2-b-l3-e4",
              type: "multiple-choice",
              prompt:
                "En un diagrama de Venn de dos conjuntos A y B, se sombrea la región que contiene los elementos que están en A o en B, pero NO en los dos al mismo tiempo. ¿Qué operación representa esa región sombreada?",
              options: [
                "A △ B — diferencia simétrica",
                "A ∪ B — unión",
                "A ∩ B — intersección",
                "A − B — diferencia",
              ],
              correctIndex: 0,
              explanation:
                "La diferencia simétrica A △ B es exactamente eso: las 'orejas' de A y B pero no la zona central que se superpone (A ∩ B). La unión incluye también la intersección; la intersección es solo el centro; A − B es solo la oreja de A.",
            },
          ],
        },

        // ── u2-b-l4 · Propiedades de las operaciones ────────────────────────
        {
          id: "u2-b-l4",
          title: "Propiedades de las operaciones",
          subtitle: "Nivel 3 · Las 10 leyes",
          exercises: [
            // ─ Tarjetas de concepto ─────────────────────────────────────────
            {
              id: "u2-b-l4-c1",
              type: "concept",
              prompt: "Leyes de conjuntos I — Involución, Conmut., Asoc., Distrib.",
              body: [
                "1. INVOLUCIÓN: (Aᶜ)ᶜ = A  (complementar dos veces es volver al original).",
                "2. CONMUTATIVIDAD: A ∪ B = B ∪ A  ;  A ∩ B = B ∩ A",
                "3. ASOCIATIVIDAD: A ∪ (B ∪ C) = (A ∪ B) ∪ C  ;  idem con ∩",
                "4. DISTRIBUTIVIDAD:",
                "      A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)",
                "      A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)",
                "Paralelismo con Unidad 1: ∪ ↔ ∨,  ∩ ↔ ∧,  ᶜ ↔ ¬.",
              ],
              example: "(Aᶜ)ᶜ = A   ·   A ∪ B = B ∪ A   ·   A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)",
            },
            {
              id: "u2-b-l4-c2",
              type: "concept",
              prompt: "Leyes de conjuntos II — Idemp., De Morgan, Neutro, Absrc., Equiv.Dif., Compl.",
              body: [
                "5. IDEMPOTENCIA: A ∪ A = A  ;  A ∩ A = A",
                "6. DE MORGAN: (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ  ;  (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ",
                "7. NEUTRO Y ABSORBENTE: A ∩ U = A  ;  A ∪ U = U  ;  A ∩ ∅ = ∅  ;  A ∪ ∅ = A",
                "8. ABSORCIÓN: A ∩ (A ∪ B) = A  ;  A ∪ (A ∩ B) = A",
                "9. EQUIV. DIFERENCIA: A − B = A ∩ Bᶜ",
                "10. COMPLEMENTACIÓN: A ∩ Aᶜ = ∅  ;  A ∪ Aᶜ = U",
              ],
              example: "(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ   ·   A ∩ (A ∪ B) = A   ·   A ∩ Aᶜ = ∅",
            },
            // ─ Ejercicios evaluados ─────────────────────────────────────────
            {
              id: "u2-b-l4-e1",
              type: "multiple-choice",
              prompt:
                "¿Cuánto vale A ∩ (A ∪ B)?",
              options: [
                "A — por la propiedad de Absorción",
                "A ∪ B — la intersección con la unión da la unión",
                "B — solo queda B",
                "∅ — la intersección es vacía",
              ],
              correctIndex: 0,
              explanation:
                "Por la ley 8 (Absorción): A ∩ (A ∪ B) = A. Intuitivamente, A ∪ B ya contiene a A, así que al intersectar con A volvemos a A.",
            },
            {
              id: "u2-b-l4-e2",
              type: "multiple-choice",
              prompt:
                "La igualdad A ∪ (A ∩ B) = A se justifica con…",
              options: [
                "Absorción — A ∪ (A ∩ B) = A",
                "Idempotencia — A ∪ A = A",
                "Neutro — A ∪ ∅ = A",
                "Conmutatividad — A ∪ (A ∩ B) = (A ∩ B) ∪ A",
              ],
              correctIndex: 0,
              explanation:
                "Es la segunda forma de la Absorción (ley 8): A ∪ (A ∩ B) = A. A ∩ B siempre está contenido en A, entonces agregarlo a A con ∪ no cambia nada.",
            },
            {
              id: "u2-b-l4-e3",
              type: "multiple-choice",
              prompt:
                "¿Cuál de las siguientes afirmaciones es FALSA como ley general de conjuntos?",
              options: [
                "A ∪ B = A ∩ B  (esto solo sería cierto si A = B)",
                "(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ  (De Morgan)",
                "A ∩ Aᶜ = ∅  (Complementación)",
                "A ∪ ∅ = A  (Neutro del ∪)",
              ],
              correctIndex: 0,
              explanation:
                "A ∪ B = A ∩ B no es una ley válida en general: la unión da todos los elementos de A y B, mientras que la intersección solo los comunes. Solo sería igual si A = B. Las otras tres son leyes auténticas.",
            },
            {
              id: "u2-b-l4-e4",
              type: "simplify-steps",
              prompt:
                "Aplicá la ley correcta para simplificar (A ∩ B)ᶜ paso a paso.",
              start: "(A ∩ B)ᶜ",
              steps: [
                {
                  options: [
                    "De Morgan: (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ",
                    "Involución: (Aᶜ)ᶜ = A",
                    "Complementación: A ∩ Aᶜ = ∅",
                  ],
                  correctIndex: 0,
                  result: "Aᶜ ∪ Bᶜ",
                },
              ],
              explanation:
                "Por la ley de De Morgan (ley 6): el complemento de una intersección es la unión de los complementos. (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ.",
            },
            {
              id: "u2-b-l4-e5",
              type: "simplify-steps",
              prompt:
                "Simplificá (A ∩ B) ∪ (A ∩ Bᶜ) aplicando las leyes en cadena.",
              start: "(A ∩ B) ∪ (A ∩ Bᶜ)",
              steps: [
                {
                  options: [
                    "Distributividad: factor común A",
                    "Absorción: A ∪ (A ∩ B) = A",
                    "Idempotencia: A ∪ A = A",
                  ],
                  correctIndex: 0,
                  result: "A ∩ (B ∪ Bᶜ)",
                },
                {
                  options: [
                    "Complementación: B ∪ Bᶜ = U",
                    "Neutro del ∪: A ∪ ∅ = A",
                    "Idempotencia: B ∪ B = B",
                  ],
                  correctIndex: 0,
                  result: "A ∩ U",
                },
                {
                  options: [
                    "Neutro del ∩: A ∩ U = A",
                    "Absorción: A ∩ (A ∪ B) = A",
                    "Complementación: A ∩ Aᶜ = ∅",
                  ],
                  correctIndex: 0,
                  result: "A",
                },
              ],
              explanation:
                "Paso 1: factor común A por Distributividad → A ∩ (B ∪ Bᶜ). Paso 2: B ∪ Bᶜ = U por Complementación. Paso 3: A ∩ U = A por la ley del Neutro. Resultado: A.",
            },
          ],
        },

        // ── u2-b-l5 · Problemas de conteo con Venn ──────────────────────────
        {
          id: "u2-b-l5",
          title: "Problemas de conteo con Venn",
          subtitle: "Nivel 3 · Encuestas con 3 conjuntos",
          exercises: [
            // ─ Tarjeta de concepto ──────────────────────────────────────────
            {
              id: "u2-b-l5-c1",
              type: "concept",
              prompt: "Estrategia de conteo con diagramas de Venn",
              body: [
                "Para contar elementos en uniones de 3 conjuntos se usa el Principio de Inclusión-Exclusión:",
                "|A ∪ B ∪ C| = |A| + |B| + |C| − |A∩B| − |A∩C| − |B∩C| + |A∩B∩C|",
                "",
                "ESTRATEGIA ('de adentro hacia afuera'):",
                "1. Empezar por la región central: |A ∩ B ∩ C|.",
                "2. Calcular cada intersección doble (sin la triple) restando la triple.",
                "3. Calcular cada zona 'solo A', 'solo B', 'solo C' restando lo ya colocado.",
                "4. Verificar que la suma total coincida con el total dado.",
                "",
                "Distinción clave:",
                "  'A y B' significa A ∩ B (incluye los que tienen los tres).",
                "  'A y B pero NO C' significa (A ∩ B) − C = A ∩ B ∩ Cᶜ.",
              ],
              example: "|A ∪ B| = |A| + |B| − |A ∩ B|",
            },
            // ─ Ejercicios evaluados ─────────────────────────────────────────
            {
              id: "u2-b-l5-e1",
              type: "multiple-choice",
              prompt:
                "En una clase de 30 estudiantes, 18 hablan inglés, 12 hablan francés y 7 hablan ambos idiomas. ¿Cuántos estudiantes hablan AL MENOS uno de los dos idiomas?",
              options: ["23", "30", "25", "13"],
              correctIndex: 0,
              explanation:
                "|I ∪ F| = |I| + |F| − |I ∩ F| = 18 + 12 − 7 = 23. Sin restar los 7 que cuentan dos veces (una por cada idioma), el resultado sería incorrecto.",
            },
            {
              id: "u2-b-l5-e2",
              type: "multiple-choice",
              prompt:
                "De 1800 alumnos que rindieron las tres materias de ingreso:\n• 740 aprobaron Matemática (M)\n• 830 aprobaron Física (F)\n• 1220 aprobaron Química (Q)\n• 32 aprobaron M y F pero no Q\n• 665 aprobaron F y Q (en total)\n• 128 aprobaron las tres materias\n• 135 no aprobaron ninguna\n\n¿Cuántos aprobaron ÚNICAMENTE Matemática?",
              options: ["280", "300", "255", "408"],
              correctIndex: 0,
              explanation:
                "Construyendo el diagrama de Venn desde el centro: M∩F∩Q = 128; M∩F (no Q) = 32; F∩Q (total) = 665 → F∩Q (no M) = 665 − 128 = 537; los que aprobaron alguna = 1800 − 135 = 1665. Usando inclusión-exclusión se halla M∩Q (no F) = 300. Solo M = 740 − 128 − 32 − 300 = 280.",
            },
            {
              id: "u2-b-l5-e3",
              type: "multiple-choice",
              prompt:
                "Sobre un grupo de 45 personas:\n• 16 leen Novelas (N)\n• 18 leen Ciencia Ficción (CF)\n• 17 leen Cuentos (C)\n• 3 leen los tres géneros\n• 1 lee solo Cuentos y Ciencia Ficción (no Novelas)\n• 8 leen solo Cuentos\n• 4 leen solo Novelas y Ciencia Ficción (no Cuentos)\n\n¿Cuántas personas leen SOLO Ciencia Ficción?",
              options: ["10", "18", "7", "4"],
              correctIndex: 0,
              explanation:
                "Rellenando el Venn: N∩CF∩C = 3; CF∩C (no N) = 1; N∩CF (no C) = 4. Solo CF = 18 − 3 − 1 − 4 = 10. Verificación: solo N = 16 − 3 − 4 − (N∩C no CF) = 4 con N∩C(noF) = 5 → suma = 4+4+10+3+1+5+8+10 = 45 ✓.",
            },
            {
              id: "u2-b-l5-e4",
              type: "multiple-choice",
              prompt:
                "Con los mismos datos del ejercicio anterior (45 personas, géneros N/CF/C), ¿cuántas personas leen POR LO MENOS dos géneros distintos?",
              options: ["13", "10", "8", "18"],
              correctIndex: 0,
              explanation:
                "Los que leen al menos dos géneros son: solo N∩CF (no C) = 4, solo N∩C (no CF) = 5, solo CF∩C (no N) = 1, más los tres géneros = 3. Total = 4 + 5 + 1 + 3 = 13.",
            },
          ],
        },
      ],
    },
  ],
};
