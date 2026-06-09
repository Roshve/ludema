import type { Unit } from "./types";

// Unidad 1: Lógica. Currículo estilo Duolingo con dificultad progresiva.
// La lógica proposicional se divide en 3 secciones (conceptos, tablas, leyes),
// seguidas de cuantificadores y razonamientos.
export const unit1: Unit = {
  id: "u1",
  title: "Unidad 1 · Lógica",
  subtitle: "Proposiciones, tablas, leyes, cuantificadores y razonamientos",
  available: true,
  sections: [
    // ── Sección A · Proposiciones y conectivos ───────────────────────────────
    {
      id: "u1-a",
      title: "Proposiciones y conectivos",
      description: "Qué es una proposición y cómo se conectan las ideas.",
      accent: "green",
      guide: {
        levels: [
          {
            emoji: "🌟",
            title: "Proposiciones y conectivos",
            intro: "Aprende qué es la lógica y cómo se conectan las ideas.",
            entries: [
              {
                text: "Una proposición es un enunciado que puede ser verdadero (V) o falso (F). «2 + 3 = 5» es una proposición; «¿Qué hora es?» no lo es.",
              },
              {
                text: "Las proposiciones simples expresan una sola idea; las compuestas combinan varias mediante conectivos lógicos.",
              },
              { term: "Negación", symbol: "¬", text: "Cambia el valor de verdad. Se lee «no»." },
              {
                term: "Conjunción",
                symbol: "∧",
                text: "Verdadera solo si ambas ideas son verdaderas. Se lee «y».",
              },
              {
                term: "Disyunción",
                symbol: "∨",
                text: "Falsa solo si ambas ideas son falsas. Se lee «o».",
              },
              {
                term: "Condicional",
                symbol: "⇒",
                text: "Si se cumple una condición, ocurre una consecuencia. Solo es falso cuando el antecedente es V y el consecuente F.",
              },
              {
                term: "Bicondicional",
                symbol: "⇔",
                text: "Verdadero si ambos tienen el mismo valor de verdad. Se lee «si y solo si».",
              },
              {
                term: "Disyunción excluyente",
                symbol: "⊻",
                text: "Verdadera si solo uno de los dos se cumple, pero no ambos.",
              },
            ],
          },
        ],
        tip: "Recuerda: una proposición SIEMPRE puede ser verdadera o falsa. Si es una pregunta, una orden o tiene una variable libre (como x + 1 = 4), no es una proposición.",
      },
      lessons: [
        {
          id: "u1-a-l1",
          title: "¿Qué es una proposición?",
          subtitle: "Nivel 1 · Conceptos",
          exercises: [
            {
              id: "u1-a-l1-e1",
              type: "tap-proposition",
              prompt: "Toca todas las frases que sean proposiciones lógicas.",
              items: [
                { text: "2 + 3 = 5", isProposition: true },
                { text: "¿Qué hora es?", isProposition: false },
                { text: "Caracas es la capital de Venezuela.", isProposition: true },
                { text: "¡Cierra la puerta!", isProposition: false },
                { text: "x + 1 = 4", isProposition: false },
              ],
              explanation:
                "Una proposición afirma algo que es verdadero o falso. Las preguntas, órdenes y expresiones con variables libres (como x + 1 = 4) no lo son.",
            },
            {
              id: "u1-a-l1-e2",
              type: "multiple-choice",
              prompt: "¿Cuál de estos enunciados NO es una proposición?",
              options: [
                "¡Estudia para el examen!",
                "El número 7 es primo.",
                "Madrid está en Europa.",
                "2 es mayor que 5.",
              ],
              correctIndex: 0,
              explanation:
                "Una orden no afirma algo verdadero o falso, así que «¡Estudia para el examen!» no es una proposición.",
            },
            {
              id: "u1-a-l1-e3",
              type: "multiple-choice",
              prompt: "«Llueve y hace frío». ¿Es una proposición simple o compuesta?",
              options: ["Compuesta", "Simple", "No es proposición", "Depende del clima"],
              correctIndex: 0,
              explanation:
                "Combina dos ideas («llueve», «hace frío») con el conectivo «y», así que es compuesta.",
            },
            {
              id: "u1-a-l1-e4",
              type: "multiple-choice",
              prompt: "«París es la capital de Francia». ¿Simple o compuesta?",
              options: ["Simple", "Compuesta", "No es proposición", "Falsa, por tanto no cuenta"],
              correctIndex: 0,
              explanation:
                "Expresa una sola idea, sin conectivos: es una proposición simple (y además verdadera).",
            },
            {
              id: "u1-a-l1-e5",
              type: "tap-proposition",
              prompt: "Toca solo las que sean proposiciones.",
              items: [
                { text: "Todos los gatos son mamíferos.", isProposition: true },
                { text: "¿Vendrás mañana?", isProposition: false },
                { text: "La Luna es un planeta.", isProposition: true },
                { text: "Resuelve la ecuación.", isProposition: false },
                { text: "El agua hierve a 100 °C al nivel del mar.", isProposition: true },
              ],
              explanation:
                "«La Luna es un planeta» es proposición aunque sea falsa: lo importante es que tiene un valor de verdad definido.",
            },
          ],
        },
        {
          id: "u1-a-l2",
          title: "Conectivos lógicos",
          subtitle: "Nivel 1 · Conectivos",
          exercises: [
            {
              id: "u1-a-l2-e1",
              type: "multiple-choice",
              prompt: "¿Qué símbolo representa la conjunción «y»?",
              options: ["∧", "∨", "¬", "⇒"],
              correctIndex: 0,
              explanation: "La conjunción «y» se simboliza con ∧.",
            },
            {
              id: "u1-a-l2-e2",
              type: "build-expression",
              prompt:
                "Traduce a símbolos: «Estamos en invierno PERO hace calor».  (p: estamos en invierno, q: hace calor)",
              bank: ["p", "q", "∧", "∨", "¬", "⇒"],
              answer: ["p", "∧", "q"],
              explanation: "«Pero» funciona como conjunción: p ∧ q.",
            },
            {
              id: "u1-a-l2-e3",
              type: "build-expression",
              prompt: "Traduce: «No llueve o hace frío».  (p: llueve, q: hace frío)",
              bank: ["p", "q", "¬", "∨", "∧", "⇒"],
              answer: ["¬", "p", "∨", "q"],
              explanation: "La negación afecta solo a p: ¬p ∨ q.",
            },
            {
              id: "u1-a-l2-e4",
              type: "multiple-choice",
              prompt: "¿Cuál es la traducción de «Si estudio, entonces apruebo»?",
              options: ["p ⇒ q", "p ∧ q", "q ⇒ p", "p ∨ q"],
              correctIndex: 0,
              explanation: "«Si p entonces q» es el condicional p ⇒ q.",
            },
            {
              id: "u1-a-l2-e5",
              type: "multiple-choice",
              prompt:
                "«Es necesario que haya nubes para que llueva». ¿Cuál es el consecuente del condicional?",
              options: ["Hay nubes", "Llueve", "No llueve", "No hay nubes"],
              correctIndex: 0,
              explanation:
                "«A es necesario para B» se simboliza B ⇒ A. Aquí: llueve ⇒ hay nubes, así que el consecuente es «hay nubes».",
            },
          ],
        },
        {
          id: "u1-a-l3",
          title: "Traducir al símbolo",
          subtitle: "Nivel 1 · Reto",
          exercises: [
            {
              id: "u1-a-l3-e1",
              type: "build-expression",
              prompt:
                "Traduce: «Hace sol y vamos a la playa».  (p: hace sol, q: vamos a la playa)",
              bank: ["p", "q", "∧", "∨", "¬", "⇒"],
              answer: ["p", "∧", "q"],
              explanation: "Dos ideas unidas por «y»: p ∧ q.",
            },
            {
              id: "u1-a-l3-e2",
              type: "build-expression",
              prompt:
                "Traduce: «Si llueve, entonces no salimos».  (p: llueve, q: salimos)",
              bank: ["p", "q", "⇒", "¬", "∧", "∨"],
              answer: ["p", "⇒", "¬", "q"],
              explanation: "Condicional con consecuente negado: p ⇒ ¬q.",
            },
            {
              id: "u1-a-l3-e3",
              type: "build-expression",
              prompt:
                "Traduce: «Apruebo si y solo si estudio».  (p: apruebo, q: estudio)",
              bank: ["p", "q", "⇔", "⇒", "∧", "∨"],
              answer: ["p", "⇔", "q"],
              explanation: "«Si y solo si» es el bicondicional: p ⇔ q.",
            },
            {
              id: "u1-a-l3-e4",
              type: "build-expression",
              prompt: "Traduce: «Ni llueve ni truena».  (p: llueve, q: truena)",
              bank: ["p", "q", "¬", "¬", "∧", "∨"],
              answer: ["¬", "p", "∧", "¬", "q"],
              explanation: "«Ni… ni…» niega ambas: ¬p ∧ ¬q.",
            },
            {
              id: "u1-a-l3-e5",
              type: "multiple-choice",
              prompt:
                "«Basta con estudiar para aprobar» se simboliza…  (p: estudiar, q: aprobar)",
              options: ["p ⇒ q", "q ⇒ p", "p ∧ q", "p ⇔ q"],
              correctIndex: 0,
              explanation:
                "«A es suficiente para B» se simboliza A ⇒ B. Estudiar basta para aprobar: p ⇒ q.",
            },
          ],
        },
      ],
    },
    // ── Sección B · Tablas de verdad y clasificación ─────────────────────────
    {
      id: "u1-b",
      title: "Tablas de verdad y clasificación",
      description: "Calcula valores de verdad y clasifica proposiciones.",
      accent: "sky",
      guide: {
        levels: [
          {
            emoji: "📊",
            title: "Tablas de verdad y clasificación",
            intro: "Calcula el valor de verdad de expresiones complejas y clasifícalas.",
            entries: [
              {
                term: "Regla de las filas",
                text: "Si una proposición tiene n variables simples, su tabla tendrá 2ⁿ renglones.",
              },
              {
                term: "Orden de prioridad",
                text: "Sin paréntesis, resuelve así: 1° Negación, 2° Conjunción, 3° Disyunción, 4° Condicional, 5° Bicondicional.",
              },
              { term: "Tautología", text: "Todos los resultados finales son verdaderos." },
              { term: "Contradicción", text: "Todos los resultados finales son falsos." },
              { term: "Contingencia", text: "El resultado mezcla verdaderos y falsos." },
            ],
          },
        ],
        tip: "Antes de llenar una tabla, cuenta las variables: con n variables hay 2ⁿ filas. ¡No te saltes ninguna combinación!",
      },
      lessons: [
        {
          id: "u1-b-l1",
          title: "Tablas de verdad",
          subtitle: "Nivel 2 · Tablas",
          exercises: [
            {
              id: "u1-b-l1-e1",
              type: "truth-table",
              prompt: "Completa la columna final de la tabla de verdad.",
              formula: "p ∧ q",
              explanation: "La conjunción solo es verdadera cuando p y q lo son.",
            },
            {
              id: "u1-b-l1-e2",
              type: "truth-table",
              prompt: "Completa la columna final.",
              formula: "p ∨ ¬q",
              explanation: "Solo es falsa cuando p es falsa y q verdadera.",
            },
            {
              id: "u1-b-l1-e3",
              type: "truth-table",
              prompt: "Completa la columna final.",
              formula: "(p ∨ q) ∧ ¬p",
              explanation: "Solo es verdadera cuando p es falsa y q verdadera.",
            },
            {
              id: "u1-b-l1-e4",
              type: "truth-table",
              prompt: "Completa la columna final.",
              formula: "p ⇒ (q ∨ ¬p)",
              explanation:
                "El condicional solo falla cuando el antecedente es V y el consecuente F.",
            },
            {
              id: "u1-b-l1-e5",
              type: "truth-table",
              prompt: "Completa la columna final.",
              formula: "¬(p ∧ q)",
              explanation: "Es falsa solo cuando p y q son ambas verdaderas (De Morgan).",
            },
          ],
        },
        {
          id: "u1-b-l2",
          title: "Clasificación",
          subtitle: "Nivel 2 · Clasificar",
          exercises: [
            {
              id: "u1-b-l2-e1",
              type: "classify",
              prompt: "Clasifica la proposición: p ⇒ p",
              formula: "p ⇒ p",
              explanation: "Siempre verdadera: es una tautología.",
            },
            {
              id: "u1-b-l2-e2",
              type: "classify",
              prompt: "Clasifica: p ∧ ¬p",
              formula: "p ∧ ¬p",
              explanation: "Nunca puede ser verdadera: contradicción.",
            },
            {
              id: "u1-b-l2-e3",
              type: "classify",
              prompt: "Clasifica: p ∨ ¬p",
              formula: "p ∨ ¬p",
              explanation: "Siempre verdadera (principio del tercero excluido): tautología.",
            },
            {
              id: "u1-b-l2-e4",
              type: "classify",
              prompt: "Clasifica: p ⇒ q",
              formula: "p ⇒ q",
              explanation: "A veces verdadera, a veces falsa: contingencia.",
            },
            {
              id: "u1-b-l2-e5",
              type: "classify",
              prompt: "Clasifica: p ⇔ ¬p",
              formula: "p ⇔ ¬p",
              explanation: "p nunca es igual a su negación: contradicción.",
            },
          ],
        },
        {
          id: "u1-b-l3",
          title: "Reto rápido",
          subtitle: "Nivel 2 · ¡Contrarreloj!",
          exercises: [
            {
              id: "u1-b-l3-e1",
              type: "classify",
              prompt: "¡Rápido! Clasifica: p ∧ ¬p",
              formula: "p ∧ ¬p",
              timeLimit: 20,
              explanation: "Nunca verdadera: contradicción.",
            },
            {
              id: "u1-b-l3-e2",
              type: "classify",
              prompt: "Clasifica: (p ⇒ q) ∧ p",
              formula: "(p ⇒ q) ∧ p",
              explanation: "Verdadera solo cuando p y q son verdaderas: contingencia.",
            },
            {
              id: "u1-b-l3-e3",
              type: "truth-table",
              prompt: "Completa la columna final.",
              formula: "(p ⇒ q) ⇔ (¬p ∨ q)",
              explanation:
                "Ambos lados son equivalentes (definición de condicional): la columna es toda V (tautología).",
            },
            {
              id: "u1-b-l3-e4",
              type: "classify",
              prompt: "¡Rápido! Clasifica: ¬(p ∨ ¬p)",
              formula: "¬(p ∨ ¬p)",
              timeLimit: 15,
              explanation: "Es la negación de una tautología: contradicción.",
            },
            {
              id: "u1-b-l3-e5",
              type: "classify",
              prompt: "Clasifica: (p ∨ q) ⇒ p",
              formula: "(p ∨ q) ⇒ p",
              explanation: "Falla cuando p es F y q es V: contingencia.",
            },
          ],
        },
      ],
    },
    // ── Sección C · Leyes lógicas y simplificación ───────────────────────────
    {
      id: "u1-c",
      title: "Leyes lógicas y simplificación",
      description: "Equivalencias y leyes para simplificar sin hacer toda la tabla.",
      accent: "rose",
      guide: {
        levels: [
          {
            emoji: "🛠️",
            title: "Leyes lógicas y simplificación",
            intro: "Usa leyes para reducir expresiones largas sin hacer toda la tabla.",
            entries: [
              {
                text: "Las leyes son equivalencias lógicas (proposiciones con la misma tabla de verdad) que permiten simplificar problemas complejos.",
              },
              {
                term: "De Morgan",
                text: "Niegan paréntesis: ¬(p ∨ q) ≡ ¬p ∧ ¬q  y  ¬(p ∧ q) ≡ ¬p ∨ ¬q.",
              },
              {
                term: "Absorción",
                text: "Elimina variables sobrantes: p ∧ (p ∨ q) ≡ p.",
              },
              {
                term: "Definición de condicional",
                text: "Transforma flechas en disyunciones: (p ⇒ q) ≡ ¬p ∨ q.",
              },
              {
                term: "Involución",
                text: "Una doble negación se cancela: ¬(¬p) ≡ p.",
              },
            ],
          },
        ],
        tip: "Para ganar este nivel, indica siempre qué ley aplicas en cada paso de tu simplificación, tal como lo piden los ejercicios.",
      },
      lessons: [
        {
          id: "u1-c-l1",
          title: "Equivalencias",
          subtitle: "Nivel 3 · Leyes",
          exercises: [
            {
              id: "u1-c-l1-e1",
              type: "multiple-choice",
              prompt: "¿Cuál es la forma equivalente a  ¬(p ∨ q)?",
              options: ["¬p ∧ ¬q", "¬p ∨ ¬q", "p ∧ q", "¬p ∧ q"],
              correctIndex: 0,
              explanation: "Ley de De Morgan: ¬(p ∨ q) ≡ ¬p ∧ ¬q.",
            },
            {
              id: "u1-c-l1-e2",
              type: "multiple-choice",
              prompt: "¿Cuál es la forma equivalente a  ¬(p ∧ q)?",
              options: ["¬p ∨ ¬q", "¬p ∧ ¬q", "p ∨ q", "¬(p ∨ q)"],
              correctIndex: 0,
              explanation: "Ley de De Morgan: ¬(p ∧ q) ≡ ¬p ∨ ¬q.",
            },
            {
              id: "u1-c-l1-e3",
              type: "multiple-choice",
              prompt: "La doble negación  ¬¬p  es equivalente a…",
              options: ["p", "¬p", "Una contradicción", "Una tautología"],
              correctIndex: 0,
              explanation: "Ley de involución (doble negación): ¬¬p ≡ p.",
            },
            {
              id: "u1-c-l1-e4",
              type: "multiple-choice",
              prompt: "Por la definición de condicional,  p ⇒ q  es equivalente a…",
              options: ["¬p ∨ q", "p ∧ ¬q", "¬p ∧ q", "p ∨ ¬q"],
              correctIndex: 0,
              explanation: "Definición de condicional: (p ⇒ q) ≡ ¬p ∨ q.",
            },
            {
              id: "u1-c-l1-e5",
              type: "multiple-choice",
              prompt: "Por la ley de absorción,  p ∧ (p ∨ q)  es equivalente a…",
              options: ["p", "q", "p ∧ q", "p ∨ q"],
              correctIndex: 0,
              explanation: "Absorción: p ∧ (p ∨ q) ≡ p.",
            },
          ],
        },
        {
          id: "u1-c-l2",
          title: "Simplificación",
          subtitle: "Nivel 3 · Paso a paso",
          exercises: [
            {
              id: "u1-c-l2-e1",
              type: "simplify-steps",
              prompt: "Simplifica paso a paso eligiendo la ley aplicada.",
              start: "p ∧ (p ∨ q)",
              steps: [
                {
                  options: ["Ley de Absorción", "De Morgan", "Doble negación"],
                  correctIndex: 0,
                  result: "p",
                },
              ],
              explanation: "Absorción: p ∧ (p ∨ q) ≡ p.",
            },
            {
              id: "u1-c-l2-e2",
              type: "simplify-steps",
              prompt: "Simplifica  ¬(¬p ∧ q)  paso a paso.",
              start: "¬(¬p ∧ q)",
              steps: [
                {
                  options: ["De Morgan", "Absorción", "Identidad"],
                  correctIndex: 0,
                  result: "¬¬p ∨ ¬q",
                },
                {
                  options: ["Doble negación", "De Morgan", "Conmutativa"],
                  correctIndex: 0,
                  result: "p ∨ ¬q",
                },
              ],
              explanation: "De Morgan y luego doble negación: ¬(¬p ∧ q) ≡ p ∨ ¬q.",
            },
            {
              id: "u1-c-l2-e3",
              type: "simplify-steps",
              prompt: "Simplifica  ¬(p ⇒ q)  paso a paso.",
              start: "¬(p ⇒ q)",
              steps: [
                {
                  options: ["Definición de condicional", "De Morgan", "Absorción"],
                  correctIndex: 0,
                  result: "¬(¬p ∨ q)",
                },
                {
                  options: ["De Morgan", "Doble negación", "Conmutativa"],
                  correctIndex: 0,
                  result: "¬¬p ∧ ¬q",
                },
                {
                  options: ["Doble negación", "De Morgan", "Identidad"],
                  correctIndex: 0,
                  result: "p ∧ ¬q",
                },
              ],
              explanation:
                "Definición de condicional, De Morgan y doble negación: ¬(p ⇒ q) ≡ p ∧ ¬q.",
            },
            {
              id: "u1-c-l2-e4",
              type: "simplify-steps",
              prompt: "Simplifica  p ∨ (p ∧ q)  paso a paso.",
              start: "p ∨ (p ∧ q)",
              steps: [
                {
                  options: ["Ley de Absorción", "De Morgan", "Doble negación"],
                  correctIndex: 0,
                  result: "p",
                },
              ],
              explanation: "Absorción (forma dual): p ∨ (p ∧ q) ≡ p.",
            },
            {
              id: "u1-c-l2-e5",
              type: "simplify-steps",
              prompt: "Simplifica  ¬¬(p ∧ q)  paso a paso.",
              start: "¬¬(p ∧ q)",
              steps: [
                {
                  options: ["Doble negación", "De Morgan", "Absorción"],
                  correctIndex: 0,
                  result: "p ∧ q",
                },
              ],
              explanation: "Involución: ¬¬(p ∧ q) ≡ p ∧ q.",
            },
          ],
        },
        {
          id: "u1-c-l3",
          title: "El gimnasio",
          subtitle: "Nivel 3 · Reto final",
          exercises: [
            {
              id: "u1-c-l3-e1",
              type: "simplify-steps",
              prompt: "Simplifica  ¬(p ∧ ¬q)  paso a paso.",
              start: "¬(p ∧ ¬q)",
              steps: [
                {
                  options: ["De Morgan", "Absorción", "Definición de condicional"],
                  correctIndex: 0,
                  result: "¬p ∨ ¬¬q",
                },
                {
                  options: ["Doble negación", "De Morgan", "Conmutativa"],
                  correctIndex: 0,
                  result: "¬p ∨ q",
                },
              ],
              explanation: "De Morgan y doble negación: ¬(p ∧ ¬q) ≡ ¬p ∨ q.",
            },
            {
              id: "u1-c-l3-e2",
              type: "multiple-choice",
              prompt: "¬(p ⇒ q)  es equivalente a…",
              options: ["p ∧ ¬q", "¬p ∨ q", "p ∨ ¬q", "¬p ∧ q"],
              correctIndex: 0,
              explanation: "Negar un condicional: ¬(p ⇒ q) ≡ p ∧ ¬q.",
            },
            {
              id: "u1-c-l3-e3",
              type: "build-expression",
              prompt:
                "Escribe la forma equivalente de  p ⇒ q  usando la definición de condicional.",
              bank: ["p", "q", "¬", "∨", "∧", "⇒"],
              answer: ["¬", "p", "∨", "q"],
              explanation: "Definición de condicional: (p ⇒ q) ≡ ¬p ∨ q.",
            },
            {
              id: "u1-c-l3-e4",
              type: "simplify-steps",
              prompt: "Simplifica  ¬(¬p ∨ ¬q)  paso a paso.",
              start: "¬(¬p ∨ ¬q)",
              steps: [
                {
                  options: ["De Morgan", "Absorción", "Definición de condicional"],
                  correctIndex: 0,
                  result: "¬¬p ∧ ¬¬q",
                },
                {
                  options: ["Doble negación", "De Morgan", "Identidad"],
                  correctIndex: 0,
                  result: "p ∧ q",
                },
              ],
              explanation: "De Morgan y doble negación: ¬(¬p ∨ ¬q) ≡ p ∧ q.",
            },
            {
              id: "u1-c-l3-e5",
              type: "multiple-choice",
              prompt: "Por la ley de absorción,  p ∨ (p ∧ q)  se reduce a…",
              options: ["p", "q", "p ∨ q", "p ∧ q"],
              correctIndex: 0,
              explanation: "Absorción: p ∨ (p ∧ q) ≡ p.",
            },
          ],
        },
      ],
    },
    // ── Sección D · Predicados y Cuantificadores ─────────────────────────────
    {
      id: "u1-d",
      title: "Predicados y Cuantificadores",
      description: "Cuantificadores universal y existencial, y sus negaciones.",
      accent: "purple",
      guide: {
        levels: [
          {
            emoji: "🔢",
            title: "Predicados y cuantificadores",
            intro: "El lenguaje de primer orden: propiedades que dependen de una variable.",
            entries: [
              {
                term: "Predicado",
                text: "Una propiedad p(x) que depende de una variable, como «x es par». No tiene valor de verdad hasta fijar x o cuantificarlo.",
              },
              {
                term: "Universal",
                symbol: "∀",
                text: "«Para todo». ∀x: p(x) es verdadero si p(x) se cumple para todos los elementos del dominio.",
              },
              {
                term: "Existencial",
                symbol: "∃",
                text: "«Existe al menos uno». ∃x: p(x) es verdadero si algún elemento cumple p(x).",
              },
              {
                term: "El dominio importa",
                text: "∀x∈ℝ: x² ≥ 0 es verdadero, pero ∃x∈ℝ: x² = −1 es falso.",
              },
            ],
          },
          {
            emoji: "🔄",
            title: "Negación de cuantificadores",
            intro: "Negar un cuantificador lo cambia por el otro y niega el predicado.",
            entries: [
              { term: "Negar ∀", text: "¬(∀x: p(x)) ≡ ∃x: ¬p(x)." },
              { term: "Negar ∃", text: "¬(∃x: p(x)) ≡ ∀x: ¬p(x)." },
              {
                term: "El orden importa",
                text: "Con cuantificadores anidados, ∀x∃y no significa lo mismo que ∃y∀x.",
              },
            ],
          },
        ],
        tip: "Para negar, intercambia ∀ ↔ ∃ y niega lo de adentro. ¡Nunca dejes el mismo cuantificador!",
      },
      lessons: [
        {
          id: "u1-d-l1",
          title: "Cuantificadores",
          subtitle: "Nivel 4",
          exercises: [
            {
              id: "u1-d-l1-e1",
              type: "multiple-choice",
              prompt: "¿Es verdadero o falso?   ∀x ∈ ℝ:  x² ≥ 0",
              options: ["Verdadero", "Falso"],
              correctIndex: 0,
              explanation: "Todo número real al cuadrado es ≥ 0.",
            },
            {
              id: "u1-d-l1-e2",
              type: "multiple-choice",
              prompt: "¿Es verdadero o falso?   ∃x ∈ ℝ:  x² = −1",
              options: ["Verdadero", "Falso"],
              correctIndex: 1,
              explanation: "Ningún real al cuadrado da −1.",
            },
            {
              id: "u1-d-l1-e3",
              type: "multiple-choice",
              prompt: "La negación de  ∀x: p(x)  es…",
              options: ["∃x: ¬p(x)", "∀x: ¬p(x)", "∃x: p(x)", "¬∃x: p(x)"],
              correctIndex: 0,
              explanation: "Negar un universal produce un existencial: ∃x: ¬p(x).",
            },
            {
              id: "u1-d-l1-e4",
              type: "multiple-choice",
              prompt: "La negación de  ∃x: p(x)  es…",
              options: ["∀x: ¬p(x)", "∃x: ¬p(x)", "∀x: p(x)", "¬∀x: p(x)"],
              correctIndex: 0,
              explanation: "Negar un existencial produce un universal: ∀x: ¬p(x).",
            },
            {
              id: "u1-d-l1-e5",
              type: "multiple-choice",
              prompt: "¿Es verdadero o falso?   ∃y ∈ ℝ: ∀x ∈ ℝ:  3x − 2y = 0",
              options: ["Verdadero", "Falso"],
              correctIndex: 1,
              explanation:
                "Para un y fijo, la igualdad solo se cumple para un x; no para todos. Es falso.",
            },
          ],
        },
      ],
    },
    // ── Sección E · Razonamientos ────────────────────────────────────────────
    {
      id: "u1-e",
      title: "Razonamientos",
      description: "Reglas de inferencia y detección de falacias. ¡Jefe final!",
      accent: "amber",
      guide: {
        levels: [
          {
            emoji: "🧩",
            title: "Validez y reglas de inferencia",
            intro:
              "Un razonamiento es válido si, siempre que las premisas sean verdaderas, la conclusión también lo es.",
            entries: [
              {
                term: "Modus Ponens",
                text: "De p ⇒ q y p se infiere q. (Afirmar el antecedente.)",
              },
              {
                term: "Modus Tollens",
                text: "De p ⇒ q y ¬q se infiere ¬p. (Negar el consecuente.)",
              },
              {
                term: "Silogismo Hipotético",
                text: "De p ⇒ q y q ⇒ r se infiere p ⇒ r. (Encadenar condicionales.)",
              },
            ],
          },
          {
            emoji: "🚫",
            title: "Detectar falacias",
            intro: "Un razonamiento es inválido si existe un contraejemplo.",
            entries: [
              {
                term: "Contraejemplo",
                text: "Una asignación de valores que hace todas las premisas V y la conclusión F. Si existe, el razonamiento es inválido.",
              },
              {
                term: "Afirmar el consecuente",
                text: "Falacia: de p ⇒ q y q NO se infiere p.",
              },
              {
                term: "Negar el antecedente",
                text: "Falacia: de p ⇒ q y ¬p NO se infiere ¬q.",
              },
            ],
          },
        ],
        tip: "Para probar que algo es inválido basta UN contraejemplo. Para probar validez, no debe existir ninguno.",
      },
      lessons: [
        {
          id: "u1-e-l1",
          title: "Reglas de inferencia",
          subtitle: "Nivel 5",
          exercises: [
            {
              id: "u1-e-l1-e1",
              type: "multiple-choice",
              prompt: "Identifica la regla:   p ⇒ q ,  p   ∴  q",
              options: [
                "Modus Ponens",
                "Modus Tollens",
                "Silogismo Hipotético",
                "Silogismo Disyuntivo",
              ],
              correctIndex: 0,
              explanation: "Afirmar el antecedente: Modus Ponens.",
            },
            {
              id: "u1-e-l1-e2",
              type: "multiple-choice",
              prompt: "Identifica la regla:   p ⇒ q ,  ¬q   ∴  ¬p",
              options: [
                "Modus Tollens",
                "Modus Ponens",
                "Silogismo Hipotético",
                "Adición",
              ],
              correctIndex: 0,
              explanation: "Negar el consecuente: Modus Tollens.",
            },
            {
              id: "u1-e-l1-e3",
              type: "multiple-choice",
              prompt: "Identifica la regla:   p ⇒ q ,  q ⇒ r   ∴  p ⇒ r",
              options: [
                "Silogismo Hipotético",
                "Modus Ponens",
                "Modus Tollens",
                "Simplificación",
              ],
              correctIndex: 0,
              explanation: "Encadenar condicionales: Silogismo Hipotético.",
            },
            {
              id: "u1-e-l1-e4",
              type: "counterexample",
              prompt:
                "Este razonamiento es INVÁLIDO. Asigna valores que hagan V las premisas y F la conclusión.\nPremisas: p ⇒ q ,  q     Conclusión: p",
              premises: ["p ⇒ q", "q"],
              conclusion: "p",
              variables: ["p", "q"],
              explanation:
                "Con p = F y q = V ambas premisas son verdaderas pero la conclusión es falsa: falacia de afirmar el consecuente.",
            },
            {
              id: "u1-e-l1-e5",
              type: "counterexample",
              prompt:
                "Encuentra el contraejemplo del razonamiento inválido.\nPremisas: p ∨ q ,  p     Conclusión: ¬q",
              premises: ["p ∨ q", "p"],
              conclusion: "¬q",
              variables: ["p", "q"],
              explanation:
                "Con p = V y q = V las premisas son verdaderas pero ¬q es falsa.",
            },
          ],
        },
        {
          id: "u1-e-l2",
          title: "El gran desafío",
          subtitle: "Jefe final · Parcial",
          exercises: [
            {
              id: "u1-e-l2-e1",
              type: "build-expression",
              prompt:
                "Simboliza: «Si trajo cédula, entonces presentó el apto médico».  (c: trajo cédula, a: presentó el apto)",
              bank: ["c", "a", "⇒", "∧", "∨", "¬"],
              answer: ["c", "⇒", "a"],
              explanation: "Condicional directo: c ⇒ a.",
            },
            {
              id: "u1-e-l2-e2",
              type: "multiple-choice",
              prompt:
                "«Sofía no presentó el apto médico». Sabiendo que c ⇒ a, ¿qué se concluye por Modus Tollens?",
              options: [
                "Sofía no trajo cédula (¬c)",
                "Sofía trajo cédula (c)",
                "Sofía presentó el apto (a)",
                "No se puede concluir nada",
              ],
              correctIndex: 0,
              explanation: "De c ⇒ a y ¬a se infiere ¬c (Modus Tollens).",
            },
            {
              id: "u1-e-l2-e3",
              type: "counterexample",
              prompt:
                "¿Es inválido?  Encuentra el contraejemplo.\nPremisas: p ⇒ q ,  ¬p     Conclusión: ¬q",
              premises: ["p ⇒ q", "¬p"],
              conclusion: "¬q",
              variables: ["p", "q"],
              explanation:
                "Con p = F y q = V las premisas son verdaderas pero ¬q es falsa: falacia de negar el antecedente.",
            },
          ],
        },
      ],
    },
  ],
};
