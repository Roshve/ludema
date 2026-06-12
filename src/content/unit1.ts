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
      accent: "blue",
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
                text: "Verdadera si solo uno de los dos se cumple, pero no ambos. Se expresa con los conectivos básicos: (p ∨ q) ∧ ¬(p ∧ q).",
              },
            ],
          },
          {
            emoji: "🗣️",
            title: "El lenguaje del condicional",
            intro:
              "El español esconde condicionales bajo varias formas. La clave es siempre identificar quién es el antecedente.",
            entries: [
              {
                term: "q si p",
                text: "Lo que sigue al «si» SIEMPRE es el antecedente, aunque aparezca al final: «Iré al cine si termino la tarea» significa termino ⇒ voy.",
              },
              {
                term: "p sólo si q",
                text: "«Sólo si» introduce la condición necesaria (el consecuente): «Apruebo sólo si estudio» significa apruebo ⇒ estudio.",
              },
              {
                term: "Suficiente / necesaria",
                text: "La condición SUFICIENTE va en el antecedente; la NECESARIA, en el consecuente.",
              },
              {
                term: "A menos que",
                text: "«p a menos que q» equivale a ¬q ⇒ p, que se reduce a p ∨ q: «Voy a la playa a menos que llueva» es voy ∨ llueve.",
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
        {
          id: "u1-a-l4",
          title: "Guía · Proposiciones y condicionales",
          subtitle: "Nivel 1 · Guía de ejercicios",
          exercises: [
            {
              id: "u1-a-l4-e1",
              type: "tap-proposition",
              prompt: "De la guía: toca los enunciados que son proposiciones lógicas.",
              items: [
                { text: "El año 2004 tuvo 366 días.", isProposition: true },
                { text: "Los divisores positivos de 135.", isProposition: false },
                { text: "No pisar el césped.", isProposition: false },
                {
                  text: "Los divisores positivos de 135 son 8 en total.",
                  isProposition: true,
                },
              ],
              explanation:
                "Una descripción («los divisores positivos de 135») y una orden no afirman nada. Las otras dos sí tienen valor de verdad: 2004 fue bisiesto (V) y 135 tiene exactamente 8 divisores (V).",
            },
            {
              id: "u1-a-l4-e2",
              type: "tap-proposition",
              prompt: "Segunda parte: toca las que son proposiciones lógicas.",
              items: [
                { text: "2x + 5 = 8", isProposition: false },
                {
                  text: "La frase «No pisar el césped» es una proposición lógica.",
                  isProposition: true,
                },
                {
                  text: "Existe un x entero que cumple 2x + 5 = 8.",
                  isProposition: true,
                },
                {
                  text: "La ecuación 2x + 5 = 8 tiene solución en ℝ.",
                  isProposition: true,
                },
              ],
              explanation:
                "2x + 5 = 8 sola tiene una variable libre: no es proposición. Pero al cuantificarla («existe un x entero…», que es F porque x = 3/2) o al afirmar algo SOBRE otra frase, sí hay valor de verdad.",
            },
            {
              id: "u1-a-l4-e3",
              type: "multiple-choice",
              prompt: "¿Cuál de estas proposiciones es un condicional encubierto?",
              options: [
                "Algunos números pares son divisibles por 3.",
                "El cuadrado de todo número par es también par.",
                "El resto de dividir 23456 por 4 es cero.",
                "Ninguna puede escribirse como condicional.",
              ],
              correctIndex: 1,
              explanation:
                "«El cuadrado de todo par es par» equivale a «SI un número es par, ENTONCES su cuadrado es par». Las otras solo afirman hechos puntuales.",
            },
            {
              id: "u1-a-l4-e4",
              type: "multiple-choice",
              prompt:
                "«Para cursar Análisis II es necesario tener aprobada Análisis I». ¿Cuál es su forma Si… entonces…?",
              options: [
                "Si apruebo Análisis I, entonces curso Análisis II.",
                "Si no curso Análisis II, entonces no aprobé Análisis I.",
                "Si curso Análisis II, entonces aprobé Análisis I.",
                "No es un condicional.",
              ],
              correctIndex: 2,
              explanation:
                "La condición NECESARIA va en el consecuente: cursar Análisis II ⇒ Análisis I aprobada.",
            },
            {
              id: "u1-a-l4-e5",
              type: "multiple-choice",
              prompt:
                "«Es suficiente tener 3 ejercicios correctos para aprobar el examen». Indica antecedente y consecuente.",
              options: [
                "Antecedente: aprobar el examen · Consecuente: tener 3 correctos",
                "Antecedente: tener 3 correctos · Consecuente: aprobar el examen",
                "No tiene antecedente: no es un condicional",
                "Antecedente y consecuente son intercambiables",
              ],
              correctIndex: 1,
              explanation:
                "La condición SUFICIENTE va en el antecedente: tener 3 correctos ⇒ aprobar.",
            },
          ],
        },
        {
          id: "u1-a-l5",
          title: "El lenguaje del condicional",
          subtitle: "Nivel 1 · Si, sólo si, a menos que",
          exercises: [
            {
              id: "u1-a-l5-e1",
              type: "multiple-choice",
              prompt:
                "«Te llevaré al partido si apruebas Matemática Discreta».\n(a: apruebas · t: te llevo al partido). ¿Cuál es su forma simbólica?",
              options: ["a ⇒ t", "t ⇒ a", "a ⇔ t", "t ∨ a"],
              correctIndex: 0,
              explanation:
                "Lo que sigue al «si» es el antecedente aunque esté al final de la frase: «t si a» significa a ⇒ t. La promesa solo se rompe si apruebas y no te llevan.",
            },
            {
              id: "u1-a-l5-e2",
              type: "multiple-choice",
              prompt:
                "«Los autos paran sólo si el semáforo está en rojo».\n(p: los autos paran · r: el semáforo está en rojo). ¿Forma simbólica?",
              options: ["p ⇒ r", "r ⇒ p", "p ⇔ r", "r ∧ p"],
              correctIndex: 0,
              explanation:
                "«Sólo si» introduce la condición NECESARIA (el consecuente): si pararon, el semáforo estaba en rojo. No promete que en rojo siempre paren.",
            },
            {
              id: "u1-a-l5-e3",
              type: "multiple-choice",
              prompt:
                "«Aprobarás si estudias» y «Aprobarás sólo si estudias». ¿Significan lo mismo?",
              options: [
                "No: la primera es estudias ⇒ apruebas y la segunda apruebas ⇒ estudias",
                "Sí: ambas son estudias ⇒ apruebas",
                "Sí: ambas son apruebas ⇒ estudias",
                "No: la segunda es un bicondicional",
              ],
              correctIndex: 0,
              explanation:
                "Son los condicionales recíprocos. «Si» apunta al antecedente; «sólo si» apunta al consecuente. Decir ambas a la vez sí daría el bicondicional.",
            },
            {
              id: "u1-a-l5-e4",
              type: "build-expression",
              prompt:
                "Traduce: «Iré a la playa a menos que llueva».\n(p: voy a la playa · q: llueve)",
              bank: ["p", "∨", "q", "⇒", "¬", "∧"],
              answer: ["p", "∨", "q"],
              explanation:
                "«A menos que» equivale a «si no…»: ¬q ⇒ p. Aplicando la definición de condicional queda ¬¬q ∨ p, es decir, p ∨ q.",
            },
            {
              id: "u1-a-l5-e5",
              type: "multiple-choice",
              prompt:
                "«En el menú puedes elegir sopa o ensalada, pero no ambas» (o exclusivo s ⊻ e). ¿Cómo se expresa con los conectivos básicos?",
              options: [
                "(s ∨ e) ∧ ¬(s ∧ e)",
                "(s ∧ e) ∨ ¬(s ∨ e)",
                "s ∨ e",
                "¬s ∨ ¬e",
              ],
              correctIndex: 0,
              explanation:
                "El o exclusivo exige al menos uno (s ∨ e) y prohíbe los dos a la vez (¬(s ∧ e)). La segunda opción es justamente su negación (el bicondicional).",
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
      accent: "cyan",
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
        {
          id: "u1-b-l4",
          title: "Guía · Valores ocultos",
          subtitle: "Nivel 2 · Guía de ejercicios",
          exercises: [
            {
              id: "u1-b-l4-e1",
              type: "multiple-choice",
              prompt:
                "Sea t: (p ∧ q ⇒ ¬r) ∧ ¬p  y se sabe que v(t) = V. ¿Se puede conocer el valor de r?",
              options: [
                "Sí: r es V",
                "Sí: r es F",
                "No: r puede ser V o F",
                "Imposible: t nunca puede ser V",
              ],
              correctIndex: 2,
              explanation:
                "v(t) = V exige ¬p V, o sea p = F. Entonces p ∧ q es F y el condicional p ∧ q ⇒ ¬r es V sin importar r: r queda indeterminada.",
            },
            {
              id: "u1-b-l4-e2",
              type: "multiple-choice",
              prompt:
                "Sea t: (¬p ∨ q ⇒ ¬r) ∨ p  con v(t) = F. ¿Se puede conocer el valor de r?",
              options: [
                "Sí: r es V",
                "Sí: r es F",
                "No se puede determinar",
                "Imposible: t nunca puede ser F",
              ],
              correctIndex: 0,
              explanation:
                "La disyunción es F solo si p = F y el condicional es F. Un condicional falso exige consecuente F: ¬r = F, es decir r = V.",
            },
            {
              id: "u1-b-l4-e3",
              type: "multiple-choice",
              prompt: "En el mismo caso (v(t) = F), ¿se puede conocer q?",
              options: [
                "Sí: q es V",
                "Sí: q es F",
                "Sí: q vale lo mismo que r",
                "No: con p = F el antecedente ¬p ∨ q ya es V sin importar q",
              ],
              correctIndex: 3,
              explanation:
                "El condicional falso exige antecedente V, pero ¬p ∨ q ya es V porque ¬p es V. q queda libre.",
            },
            {
              id: "u1-b-l4-e4",
              type: "classify",
              prompt: "De la guía: clasifica  q ∨ (q ∧ ¬p ⇒ p)",
              formula: "q ∨ (q ∧ ¬p ⇒ p)",
              explanation:
                "Si q es V, la disyunción es V; si q es F, q ∧ ¬p es F y el condicional es V. Siempre V: tautología.",
            },
            {
              id: "u1-b-l4-e5",
              type: "classify",
              prompt: "Clasifica:  (p ⇒ q ∨ r) ∧ ¬q ⇒ ¬p ∨ r",
              formula: "(p ⇒ q ∨ r) ∧ ¬q ⇒ ¬p ∨ r",
              explanation:
                "Si las premisas del antecedente se cumplen y p es V, de q ∨ r con ¬q queda r. Las 8 filas dan V: tautología.",
            },
            {
              id: "u1-b-l4-e6",
              type: "classify",
              prompt: "Clasifica:  ¬(p ∧ q ⇒ r) ∧ (r ∨ ¬p)",
              formula: "¬(p ∧ q ⇒ r) ∧ (r ∨ ¬p)",
              explanation:
                "¬(p ∧ q ⇒ r) exige p y q V con r F, pero entonces r ∨ ¬p queda F. Nunca es V: contradicción.",
            },
            {
              id: "u1-b-l4-e7",
              type: "classify",
              prompt: "Clasifica:  (p ⇒ q) ⇔ (q ⇒ p)",
              formula: "(p ⇒ q) ⇔ (q ⇒ p)",
              explanation:
                "Un condicional y su recíproco NO son equivalentes: con p V y q F da F; con p y q iguales da V. Contingencia.",
            },
            {
              id: "u1-b-l4-e8",
              type: "classify",
              prompt: "Clasifica:  (p ∨ q) ∧ ¬(p ∧ q) ∧ (p ⇔ q)",
              formula: "(p ∨ q) ∧ ¬(p ∧ q) ∧ (p ⇔ q)",
              explanation:
                "(p ∨ q) ∧ ¬(p ∧ q) pide valores distintos y p ⇔ q pide valores iguales: imposible. Contradicción.",
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
      accent: "violet",
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
                term: "Involución (Doble Negación)",
                text: "Una doble negación se cancela: ¬(¬p) ≡ p.",
              },
              {
                term: "Definición de condicional",
                text: "Transforma implicaciones en disyunciones: (p ⇒ q) ≡ ¬p ∨ q.",
              },
              {
                term: "Definición de bicondicional",
                text: "Expresa equivalencias: (p ⇔ q) ≡ (p ⇒ q) ∧ (q ⇒ p).",
              },
              {
                term: "Absorción",
                text: "Simplifica variables redundantes: p ∧ (p ∨ q) ≡ p  y  p ∨ (p ∧ q) ≡ p.",
              },
              {
                term: "Distributividad",
                text: "Distribuye conectivos: p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)  y  p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r).",
              },
              {
                term: "Tercero excluido y contradicción",
                text: "Leyes sobre opuestos: p ∨ ¬p ≡ V (tautología)  y  p ∧ ¬p ≡ F (contradicción).",
              },
              {
                term: "Identidad (Neutro)",
                text: "Neutros de conjunción y disyunción: p ∧ V ≡ p  y  p ∨ F ≡ p.",
              },
            ],
          },
          {
            emoji: "🔁",
            title: "Condicionales asociados y negación",
            intro:
              "A cada condicional p ⇒ q se le asocian otros tres. Solo uno es equivalente al original.",
            entries: [
              { term: "Recíproco", text: "q ⇒ p. NO es equivalente al directo." },
              { term: "Contrario", text: "¬p ⇒ ¬q. Tampoco es equivalente al directo." },
              {
                term: "Contrarrecíproco",
                text: "¬q ⇒ ¬p. El ÚNICO equivalente al directo: p ⇒ q ≡ ¬q ⇒ ¬p. A su vez, recíproco ≡ contrario entre sí.",
              },
              {
                term: "Negación del condicional",
                text: "¬(p ⇒ q) ≡ p ∧ ¬q. Negar una implicación NO da otra implicación: afirma el antecedente y niega el consecuente.",
              },
            ],
          },
        ],
        tip: "Para simplificar expresiones largas, el orden recomendado es: 1° bicondicionales, 2° condicionales, 3° leyes de De Morgan e involución, 4° distributiva o absorción.",
      },
      lessons: [
        {
          id: "u1-c-l1",
          title: "Equivalencias elementales",
          subtitle: "Nivel 3 · De Morgan e Involución",
          exercises: [
            {
              id: "u1-c-l1-e1",
              type: "multiple-choice",
              prompt: "¿Cuál es la forma equivalente a  ¬(p ∨ q)  según las Leyes de De Morgan?",
              options: ["¬p ∧ ¬q", "¬p ∨ ¬q", "p ∧ q", "¬p ∧ q"],
              correctIndex: 0,
              explanation: "De Morgan: la negación de una disyunción es la conjunción de las negaciones: ¬(p ∨ q) ≡ ¬p ∧ ¬q.",
            },
            {
              id: "u1-c-l1-e2",
              type: "multiple-choice",
              prompt: "¿Cuál es la forma equivalente a  ¬(p ∧ q)  según De Morgan?",
              options: ["¬p ∨ ¬q", "¬p ∧ ¬q", "p ∨ q", "¬(p ∨ q)"],
              correctIndex: 0,
              explanation: "De Morgan: la negación de una conjunción es la disyunción de las negaciones: ¬(p ∧ q) ≡ ¬p ∨ ¬q.",
            },
            {
              id: "u1-c-l1-e3",
              type: "multiple-choice",
              prompt: "Por la Ley de Involución (doble negación), la expresión  ¬¬p  equivale a…",
              options: ["p", "¬p", "Una contradicción", "Una tautología"],
              correctIndex: 0,
              explanation: "Ley de Involución: negar algo dos veces es equivalente a la proposición original: ¬¬p ≡ p.",
            },
            {
              id: "u1-c-l1-e4",
              type: "simplify-steps",
              prompt: "Simplifica  ¬¬(p ∧ q)  aplicando la doble negación.",
              start: "¬¬(p ∧ q)",
              steps: [
                {
                  options: ["Doble negación (Involución)", "De Morgan", "Identidad"],
                  correctIndex: 0,
                  result: "p ∧ q",
                },
              ],
              explanation: "Por involución, la doble negación externa se cancela: ¬¬(p ∧ q) ≡ p ∧ q.",
            },
            {
              id: "u1-c-l1-e5",
              type: "simplify-steps",
              prompt: "Simplifica  ¬(p ∨ ¬q)  aplicando De Morgan e Involución.",
              start: "¬(p ∨ ¬q)",
              steps: [
                {
                  options: ["De Morgan", "Doble negación", "Conmutativa"],
                  correctIndex: 0,
                  result: "¬p ∧ ¬¬q",
                },
                {
                  options: ["Doble negación (Involución)", "De Morgan", "Identidad"],
                  correctIndex: 0,
                  result: "¬p ∧ q",
                },
              ],
              explanation: "Primero se aplica De Morgan para meter la negación: ¬p ∧ ¬¬q, y luego Involución en ¬¬q para obtener ¬p ∧ q.",
            },
          ],
        },
        {
          id: "u1-c-l2",
          title: "Condicional y Absorción",
          subtitle: "Nivel 3 · Conectivos y Absorción",
          exercises: [
            {
              id: "u1-c-l2-e1",
              type: "multiple-choice",
              prompt: "Según la definición de condicional, la implicación  p ⇒ q  equivale a…",
              options: ["¬p ∨ q", "p ∧ ¬q", "¬p ∧ q", "p ∨ ¬q"],
              correctIndex: 0,
              explanation: "La definición de condicional establece que p ⇒ q ≡ ¬p ∨ q (falla únicamente si p es V y q es F).",
            },
            {
              id: "u1-c-l2-e2",
              type: "multiple-choice",
              prompt: "Por la ley de absorción, la expresión  p ∧ (p ∨ q)  es equivalente a…",
              options: ["p", "q", "p ∧ q", "p ∨ q"],
              correctIndex: 0,
              explanation: "Leyes de absorción: si una variable se repite dentro y fuera del paréntesis con conectivos distintos (∧ y ∨), se absorbe: p ∧ (p ∨ q) ≡ p.",
            },
            {
              id: "u1-c-l2-e3",
              type: "simplify-steps",
              prompt: "Simplifica la expresión dual  p ∨ (p ∧ q)  aplicando absorción.",
              start: "p ∨ (p ∧ q)",
              steps: [
                {
                  options: ["Ley de Absorción", "De Morgan", "Doble negación"],
                  correctIndex: 0,
                  result: "p",
                },
              ],
              explanation: "La absorción dual establece que p ∨ (p ∧ q) ≡ p sin importar el valor de q.",
            },
            {
              id: "u1-c-l2-e4",
              type: "simplify-steps",
              prompt: "Simplifica la negación del condicional  ¬(p ⇒ q)  paso a paso.",
              start: "¬(p ⇒ q)",
              steps: [
                {
                  options: ["Definición de condicional", "De Morgan", "Absorción"],
                  correctIndex: 0,
                  result: "¬(¬p ∨ q)",
                },
                {
                  options: ["De Morgan", "Doble negación (Involución)", "Conmutativa"],
                  correctIndex: 0,
                  result: "¬¬p ∧ ¬q",
                },
                {
                  options: ["Doble negación (Involución)", "De Morgan", "Identidad"],
                  correctIndex: 0,
                  result: "p ∧ ¬q",
                },
              ],
              explanation: "Definición de condicional: ¬(¬p ∨ q); luego De Morgan: ¬¬p ∧ ¬q; y finalmente involución: p ∧ ¬q.",
            },
            {
              id: "u1-c-l2-e5",
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
                  options: ["Doble negación (Involución)", "De Morgan", "Conmutativa"],
                  correctIndex: 0,
                  result: "¬p ∨ q",
                },
              ],
              explanation: "De Morgan expande la negación a ¬p ∨ ¬¬q. Luego, por doble negación, queda ¬p ∨ q (que equivale a p ⇒ q).",
            },
          ],
        },
        {
          id: "u1-c-l3",
          title: "Distributividad y Neutros",
          subtitle: "Nivel 3 · Distribución y simplificación con V/F",
          exercises: [
            {
              id: "u1-c-l3-e1",
              type: "simplify-steps",
              prompt: "Simplifica  (p ∧ q) ∨ (p ∧ ¬q)  extrayendo factor común.",
              start: "(p ∧ q) ∨ (p ∧ ¬q)",
              steps: [
                {
                  options: ["Propiedad Distributiva", "De Morgan", "Asociativa"],
                  correctIndex: 0,
                  result: "p ∧ (q ∨ ¬q)",
                },
                {
                  options: ["Tercero excluido", "Identidad (Neutro)", "Doble negación"],
                  correctIndex: 0,
                  result: "p ∧ V",
                },
                {
                  options: ["Identidad (Neutro)", "Absorción", "Doble negación"],
                  correctIndex: 0,
                  result: "p",
                },
              ],
              explanation: "Por distributiva extraemos p: p ∧ (q ∨ ¬q). Por tercero excluido, q ∨ ¬q es una tautología (V). Por identidad, p ∧ V es p.",
            },
            {
              id: "u1-c-l3-e2",
              type: "simplify-steps",
              prompt: "Simplifica  (p ∨ q) ∧ ¬p  paso a paso.",
              start: "(p ∨ q) ∧ ¬p",
              steps: [
                {
                  options: ["Propiedad Distributiva", "Conmutativa", "Asociativa"],
                  correctIndex: 0,
                  result: "(p ∧ ¬p) ∨ (q ∧ ¬p)",
                },
                {
                  options: ["Ley de contradicción", "Tercero excluido", "Identidad"],
                  correctIndex: 0,
                  result: "F ∨ (q ∧ ¬p)",
                },
                {
                  options: ["Identidad (Neutro)", "Absorción", "Idempotencia"],
                  correctIndex: 0,
                  result: "q ∧ ¬p",
                },
              ],
              explanation: "Se distribuye ¬p en el paréntesis: (p ∧ ¬p) ∨ (q ∧ ¬p). Como p ∧ ¬p es una contradicción (F), queda F ∨ (q ∧ ¬p), lo cual por neutro se reduce a q ∧ ¬p.",
            },
            {
              id: "u1-c-l3-e3",
              type: "multiple-choice",
              prompt: "Por la definición de bicondicional, la equivalencia  p ⇔ q  se expande como…",
              options: ["(p ⇒ q) ∧ (q ⇒ p)", "(p ∧ q) ∨ (¬p ∧ ¬q)", "(p ⇒ q) ∨ (q ⇒ p)", "p ∨ ¬q"],
              correctIndex: 0,
              explanation: "El bicondicional «si y solo si» exige que p implique q, y simultáneamente q implique p: (p ⇒ q) ∧ (q ⇒ p).",
            },
            {
              id: "u1-c-l3-e4",
              type: "multiple-choice",
              prompt: "Por la ley de tercero excluido, toda proposición unida a su negación por disyunción  p ∨ ¬p  es siempre…",
              options: ["Una tautología (V)", "Una contradicción (F)", "Una contingencia", "Indeterminada"],
              correctIndex: 0,
              explanation: "El principio del tercero excluido indica que una idea o es verdadera o es falsa: p ∨ ¬p es siempre verdadero (Tautología).",
            },
            {
              id: "u1-c-l3-e5",
              type: "simplify-steps",
              prompt: "Simplifica la negación de la disyunción de negaciones:  ¬(¬p ∨ ¬q)  paso a paso.",
              start: "¬(¬p ∨ ¬q)",
              steps: [
                {
                  options: ["De Morgan", "Absorción", "Definición de condicional"],
                  correctIndex: 0,
                  result: "¬¬p ∧ ¬¬q",
                },
                {
                  options: ["Doble negación (Involución)", "De Morgan", "Identidad"],
                  correctIndex: 0,
                  result: "p ∧ q",
                },
              ],
              explanation: "De Morgan convierte el exterior en conjunción: ¬¬p ∧ ¬¬q. La doble negación los simplifica a p ∧ q.",
            },
          ],
        },
        {
          id: "u1-c-l4",
          title: "Guía · Simplificación con leyes",
          subtitle: "Nivel 3 · Guía de ejercicios",
          exercises: [
            {
              id: "u1-c-l4-e1",
              type: "simplify-steps",
              prompt:
                "De la guía: simplifica  (p ∨ q) ⇒ (p ∨ (p ⇔ q))  eligiendo la ley de cada paso.",
              start: "(p ∨ q) ⇒ (p ∨ (p ⇔ q))",
              steps: [
                {
                  options: ["De Morgan", "Definición de bicondicional", "Absorción"],
                  correctIndex: 1,
                  result: "(p ∨ q) ⇒ (p ∨ ((p ∧ q) ∨ (¬p ∧ ¬q)))",
                },
                {
                  options: ["Ley de Absorción", "Doble negación", "Tercero excluido"],
                  correctIndex: 0,
                  result: "(p ∨ q) ⇒ (p ∨ (¬p ∧ ¬q))",
                },
                {
                  options: ["De Morgan", "Conmutativa", "Distributiva"],
                  correctIndex: 2,
                  result: "(p ∨ q) ⇒ ((p ∨ ¬p) ∧ (p ∨ ¬q))",
                },
                {
                  options: ["Tercero excluido y neutro", "Idempotencia", "Absorción"],
                  correctIndex: 0,
                  result: "(p ∨ q) ⇒ (p ∨ ¬q)",
                },
                {
                  options: ["De Morgan", "Definición de condicional", "Distributiva"],
                  correctIndex: 1,
                  result: "¬(p ∨ q) ∨ (p ∨ ¬q)",
                },
                {
                  options: ["De Morgan", "Doble negación", "Idempotencia"],
                  correctIndex: 0,
                  result: "(¬p ∧ ¬q) ∨ (p ∨ ¬q)",
                },
                {
                  options: ["Distributiva", "Ley de Absorción", "Tercero excluido"],
                  correctIndex: 1,
                  result: "p ∨ ¬q",
                },
              ],
              explanation:
                "Resultado: p ∨ ¬q (es decir, q ⇒ p). La clave fue expandir el bicondicional y absorber.",
            },
            {
              id: "u1-c-l4-e2",
              type: "simplify-steps",
              prompt: "Simplifica  ¬(p ∨ (q ⇒ r)) ∨ ¬q  paso a paso.",
              start: "¬(p ∨ (q ⇒ r)) ∨ ¬q",
              steps: [
                {
                  options: ["Definición de condicional", "De Morgan", "Absorción"],
                  correctIndex: 0,
                  result: "¬(p ∨ (¬q ∨ r)) ∨ ¬q",
                },
                {
                  options: ["Distributiva", "De Morgan", "Doble negación"],
                  correctIndex: 1,
                  result: "(¬p ∧ ¬(¬q ∨ r)) ∨ ¬q",
                },
                {
                  options: ["De Morgan y doble negación", "Tercero excluido", "Conmutativa"],
                  correctIndex: 0,
                  result: "(¬p ∧ (q ∧ ¬r)) ∨ ¬q",
                },
                {
                  options: ["Idempotencia", "De Morgan", "Absorción generalizada"],
                  correctIndex: 2,
                  result: "¬q ∨ (¬p ∧ ¬r)",
                },
              ],
              explanation:
                "El q interno se absorbe contra ¬q: (A ∧ q) ∨ ¬q ≡ A ∨ ¬q. Resultado: ¬q ∨ (¬p ∧ ¬r).",
            },
            {
              id: "u1-c-l4-e3",
              type: "simplify-steps",
              prompt: "Simplifica  (p ⇒ r ∨ q) ∧ (¬q ∨ r)  paso a paso.",
              start: "(p ⇒ r ∨ q) ∧ (¬q ∨ r)",
              steps: [
                {
                  options: ["De Morgan", "Absorción", "Definición de condicional"],
                  correctIndex: 2,
                  result: "(¬p ∨ (r ∨ q)) ∧ (¬q ∨ r)",
                },
                {
                  options: ["Conmutativa y asociativa", "Doble negación", "Distributiva"],
                  correctIndex: 0,
                  result: "((¬p ∨ q) ∨ r) ∧ (¬q ∨ r)",
                },
                {
                  options: ["De Morgan", "Distributiva (factor común r)", "Idempotencia"],
                  correctIndex: 1,
                  result: "((¬p ∨ q) ∧ ¬q) ∨ r",
                },
                {
                  options: ["Distributiva y contradicción", "Absorción", "Tercero excluido"],
                  correctIndex: 0,
                  result: "(¬p ∧ ¬q) ∨ r",
                },
              ],
              explanation:
                "(¬p ∨ q) ∧ ¬q ≡ (¬p ∧ ¬q) ∨ (q ∧ ¬q) ≡ ¬p ∧ ¬q. Resultado: (¬p ∧ ¬q) ∨ r.",
            },
            {
              id: "u1-c-l4-e4",
              type: "classify",
              prompt:
                "La guía pide probar por leyes que es tautología. Verifícalo: clasifica  (p ⇒ q) ∧ t ⇔ ¬(t ⇒ p) ∨ (q ∧ t)",
              formula: "(p ⇒ q) ∧ t ⇔ ¬(t ⇒ p) ∨ (q ∧ t)",
              explanation:
                "¬(t ⇒ p) ≡ t ∧ ¬p; el lado derecho queda (t ∧ ¬p) ∨ (q ∧ t) ≡ t ∧ (¬p ∨ q) ≡ t ∧ (p ⇒ q). Ambos lados son equivalentes: tautología.",
            },
            {
              id: "u1-c-l4-e5",
              type: "classify",
              prompt: "Clasifica:  ¬(t ⇒ b) ∨ (a ∧ t) ⇔ t ∧ (b ⇒ a)",
              formula: "¬(t ⇒ b) ∨ (a ∧ t) ⇔ t ∧ (b ⇒ a)",
              explanation:
                "¬(t ⇒ b) ≡ t ∧ ¬b; entonces (t ∧ ¬b) ∨ (a ∧ t) ≡ t ∧ (¬b ∨ a) ≡ t ∧ (b ⇒ a). Tautología.",
            },
            {
              id: "u1-c-l4-e6",
              type: "classify",
              prompt:
                "El jefe de la guía: clasifica  [¬(p ⇒ q) ∨ (p ∧ q) ⇔ q] ⇒ (¬q ∨ p)",
              formula: "[¬(p ⇒ q) ∨ (p ∧ q) ⇔ q] ⇒ (¬q ∨ p)",
              explanation:
                "¬(p ⇒ q) ∨ (p ∧ q) ≡ (p ∧ ¬q) ∨ (p ∧ q) ≡ p. Queda (p ⇔ q) ⇒ (q ⇒ p), que nunca falla: tautología.",
            },
          ],
        },
        {
          id: "u1-c-l5",
          title: "Condicionales asociados y negación",
          subtitle: "Nivel 3 · Recíproco, contrario y contrarrecíproco",
          exercises: [
            {
              id: "u1-c-l5-e1",
              type: "multiple-choice",
              prompt:
                "Dado «Si un número es múltiplo de 4, entonces es par», ¿cuál es su CONTRARRECÍPROCO?",
              options: [
                "Si un número no es par, entonces no es múltiplo de 4.",
                "Si un número es par, entonces es múltiplo de 4.",
                "Si un número no es múltiplo de 4, entonces no es par.",
                "Un número es múltiplo de 4 y no es par.",
              ],
              correctIndex: 0,
              explanation:
                "El contrarrecíproco de p ⇒ q es ¬q ⇒ ¬p: se intercambian Y se niegan. Las otras opciones son el recíproco, el contrario y la negación.",
            },
            {
              id: "u1-c-l5-e2",
              type: "multiple-choice",
              prompt:
                "¿Cuál de los condicionales asociados es EQUIVALENTE al directo p ⇒ q?",
              options: [
                "El contrarrecíproco: ¬q ⇒ ¬p",
                "El recíproco: q ⇒ p",
                "El contrario: ¬p ⇒ ¬q",
                "Los tres son equivalentes",
              ],
              correctIndex: 0,
              explanation:
                "Solo el contrarrecíproco tiene la misma tabla de verdad que el directo. El recíproco y el contrario son equivalentes ENTRE SÍ, pero no con el original.",
            },
            {
              id: "u1-c-l5-e3",
              type: "classify",
              prompt: "Clasifica:  (p ⇒ q) ⇔ (¬q ⇒ ¬p)",
              formula: "(p ⇒ q) ⇔ (¬q ⇒ ¬p)",
              explanation:
                "Directo y contrarrecíproco siempre coinciden: el bicondicional entre ambos es una tautología.",
            },
            {
              id: "u1-c-l5-e4",
              type: "classify",
              prompt: "Clasifica:  (p ⇒ q) ⇔ (¬p ⇒ ¬q)",
              formula: "(p ⇒ q) ⇔ (¬p ⇒ ¬q)",
              explanation:
                "Directo y CONTRARIO no son equivalentes: con p = F y q = V el directo es V pero el contrario es F. Es una contingencia.",
            },
            {
              id: "u1-c-l5-e5",
              type: "build-expression",
              prompt: "Construye la NEGACIÓN de  p ⇒ q  sin usar ⇒.",
              bank: ["p", "∧", "¬", "q", "⇒", "∨"],
              answer: ["p", "∧", "¬", "q"],
              explanation:
                "¬(p ⇒ q) ≡ ¬(¬p ∨ q) ≡ p ∧ ¬q: el condicional solo falla cuando el antecedente se cumple y el consecuente no.",
            },
            {
              id: "u1-c-l5-e6",
              type: "multiple-choice",
              prompt:
                "La negación de «Si llueve, llevo paraguas» es…",
              options: [
                "Llueve y no llevo paraguas.",
                "Si llueve, no llevo paraguas.",
                "Si no llueve, no llevo paraguas.",
                "No llueve o no llevo paraguas.",
              ],
              correctIndex: 0,
              explanation:
                "¬(p ⇒ q) ≡ p ∧ ¬q. La negación de una implicación nunca es otra implicación: es el caso concreto que la rompe.",
            },
            {
              id: "u1-c-l5-e7",
              type: "multiple-choice",
              prompt:
                "De la guía: la negación de  ∃x∈ℤ: (x < 3 ⇒ x + 1 < 0)  es…",
              options: [
                "∀x∈ℤ: (x < 3 ∧ x + 1 ≥ 0)",
                "∀x∈ℤ: (x < 3 ⇒ x + 1 ≥ 0)",
                "∃x∈ℤ: (x ≥ 3 ⇒ x + 1 ≥ 0)",
                "∀x∈ℤ: (x ≥ 3 ∨ x + 1 < 0)",
              ],
              correctIndex: 0,
              explanation:
                "Se cambia ∃ por ∀ y se niega el condicional de adentro: ¬(A ⇒ B) ≡ A ∧ ¬B, con ¬(x + 1 < 0) ≡ x + 1 ≥ 0.",
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
      accent: "indigo",
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
          {
            emoji: "🪆",
            title: "Dobles cuantificadores",
            intro: "Cuando hay dos cuantificadores, el orden cambia el significado.",
            entries: [
              {
                term: "∀x ∃y",
                text: "Para cada x hay un y, que puede cambiar con cada x. Con p(x,y): x + y = 8 en ℤ es V: sirve y = 8 − x.",
              },
              {
                term: "∃y ∀x",
                text: "Hay UN y fijo que sirve para todos los x a la vez. Con x + y = 8 es F: ningún y suma 8 con todos.",
              },
              {
                term: "Distribución",
                text: "∃ distribuye en ∨ y ∀ distribuye en ∧. Las otras dos combinaciones NO son equivalencias.",
              },
              {
                term: "Escalera de fuerza",
                text: "∃y∀x ⇒ ∀x∃y ⇒ ∃x∃y (en dominios no vacíos). Lo fuerte implica lo débil, nunca al revés.",
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
        {
          id: "u1-d-l2",
          title: "Guía · Predicados",
          subtitle: "Nivel 4 · Guía de ejercicios",
          exercises: [
            {
              id: "u1-d-l2-e1",
              type: "tap-proposition",
              prompt:
                "Toca las frases que son funciones proposicionales (predicados): las que afirman algo y se vuelven proposiciones al fijar sus variables.",
              items: [
                { text: "x es un número positivo.", isProposition: true },
                { text: "2x + 5 = y", isProposition: true },
                { text: "La suma de x más el cuadrado de y.", isProposition: false },
                { text: "x es de color blanco.", isProposition: true },
                { text: "3(x + 4) − x² + 9", isProposition: false },
              ],
              explanation:
                "Un predicado AFIRMA algo de sus variables. «La suma de x más el cuadrado de y» y «3(x + 4) − x² + 9» son solo expresiones: no afirman nada ni al fijar x e y.",
            },
            {
              id: "u1-d-l2-e2",
              type: "multiple-choice",
              prompt:
                "«x es hijo de y». ¿Cuántas variables tiene este predicado y qué universo le conviene?",
              options: [
                "Una variable; U = el conjunto de los hijos",
                "Dos variables; U = el conjunto de las personas",
                "Dos variables; U = los números enteros",
                "No es una función proposicional",
              ],
              correctIndex: 1,
              explanation:
                "Depende de x y de y: es un predicado de dos variables sobre el universo de las personas.",
            },
            {
              id: "u1-d-l2-e3",
              type: "multiple-choice",
              prompt:
                "p(x): «x es un número primo». ¿Qué valores de verdad tienen las particularizaciones p(8), p(13) y p(1)?",
              options: [
                "p(8) F, p(13) V, p(1) V",
                "p(8) V, p(13) V, p(1) F",
                "p(8) F, p(13) V, p(1) F",
                "p(8) F, p(13) F, p(1) F",
              ],
              correctIndex: 2,
              explanation:
                "8 = 2³ no es primo; 13 sí lo es; y el 1 NO se considera primo (tiene un solo divisor).",
            },
            {
              id: "u1-d-l2-e4",
              type: "multiple-choice",
              prompt:
                "¿Con cuál universo U de 4 elementos resulta VERDADERA  ∀x: p(x), con p(x): «x es primo»?",
              options: [
                "U = {1, 2, 3, 5}",
                "U = {2, 3, 5, 7}",
                "U = {2, 4, 6, 8}",
                "U = {3, 5, 7, 9}",
              ],
              correctIndex: 1,
              explanation:
                "Para el universal TODOS deben ser primos: el 1 no es primo, y 4, 6, 8 y 9 tampoco.",
            },
            {
              id: "u1-d-l2-e5",
              type: "multiple-choice",
              prompt:
                "¿Con cuál universo U resulta FALSA  ∃x: p(x)  (ningún elemento es primo)?",
              options: [
                "U = {2, 3, 5, 7}",
                "U = {1, 2, 4, 6}",
                "U = {4, 6, 8, 11}",
                "U = {1, 4, 6, 8}",
              ],
              correctIndex: 3,
              explanation:
                "Para que el existencial sea F, NINGUNO puede ser primo: 1, 4, 6 y 8 no lo son. (El 11 sí es primo, descarta esa opción.)",
            },
            {
              id: "u1-d-l2-e6",
              type: "build-expression",
              prompt:
                "Simboliza: «Todos los alumnos del curso K-10 trabajan por la mañana».  (U = alumnos del K-10; t(x): x trabaja por la mañana)",
              bank: ["∀x", "∃x", ":", "t(x)", "¬"],
              answer: ["∀x", ":", "t(x)"],
              explanation:
                "«Todos los…» es el cuantificador universal sobre el universo elegido: ∀x: t(x).",
            },
            {
              id: "u1-d-l2-e7",
              type: "build-expression",
              prompt:
                "Simboliza: «Algunos datos de los clientes están incompletos o desactualizados».  (U = datos de los clientes; i(x): incompleto; d(x): desactualizado)",
              bank: ["∃x", "∀x", ":", "i(x)", "d(x)", "∨", "∧"],
              answer: ["∃x", ":", "i(x)", "∨", "d(x)"],
              explanation: "«Algunos» es el existencial y el «o» es la disyunción: ∃x: i(x) ∨ d(x).",
            },
            {
              id: "u1-d-l2-e8",
              type: "build-expression",
              prompt:
                "Simboliza: «Existen grafos bipartitos que no son eulerianos».  (U = grafos; b(x): bipartito; e(x): euleriano)",
              bank: ["∃x", "∀x", ":", "b(x)", "e(x)", "∧", "⇒", "¬"],
              answer: ["∃x", ":", "b(x)", "∧", "¬", "e(x)"],
              explanation:
                "«Existen A que no son B»: ∃x: b(x) ∧ ¬e(x). Ojo: con ∃ se usa ∧, no ⇒.",
            },
          ],
        },
        {
          id: "u1-d-l3",
          title: "Guía · Verdad y negación",
          subtitle: "Nivel 4 · Guía de ejercicios",
          exercises: [
            {
              id: "u1-d-l3-e1",
              type: "multiple-choice",
              prompt: "¿Verdadero o falso?   ∃x ∈ ℤ :  3x + 11 = 20",
              options: ["Verdadero", "Falso"],
              correctIndex: 0,
              explanation: "x = 3 es entero y cumple 3·3 + 11 = 20.",
            },
            {
              id: "u1-d-l3-e2",
              type: "multiple-choice",
              prompt: "¿Verdadero o falso?   ∀x ∈ U :  x² > 2,  con U = {2, 3, −1, 5}",
              options: ["Verdadero", "Falso"],
              correctIndex: 1,
              explanation:
                "(−1)² = 1, que no es mayor que 2. Un solo contraejemplo tumba al universal.",
            },
            {
              id: "u1-d-l3-e3",
              type: "multiple-choice",
              prompt: "¿Verdadero o falso?   ∀x ∈ ℤ :  x + x²  es par",
              options: ["Verdadero", "Falso"],
              correctIndex: 0,
              explanation:
                "x + x² = x(x + 1) es producto de enteros consecutivos: uno de los dos siempre es par.",
            },
            {
              id: "u1-d-l3-e4",
              type: "multiple-choice",
              prompt: "¿Verdadero o falso?   ∃x ∈ ℝ :  x⁴ + 16 = 0",
              options: ["Verdadero", "Falso"],
              correctIndex: 1,
              explanation:
                "x⁴ ≥ 0 para todo real, así que x⁴ + 16 ≥ 16: ningún x cumple la igualdad.",
            },
            {
              id: "u1-d-l3-e5",
              type: "build-expression",
              prompt: "Construye la negación de   ∃x ∈ ℝ :  x² = −9",
              bank: ["∀x ∈ ℝ", "∃x ∈ ℝ", ":", "x² = −9", "x² ≠ −9"],
              answer: ["∀x ∈ ℝ", ":", "x² ≠ −9"],
              explanation:
                "¬∃ ≡ ∀¬: todo real cumple x² ≠ −9. (La negación resulta verdadera.)",
            },
            {
              id: "u1-d-l3-e6",
              type: "multiple-choice",
              prompt: "¿Cuál es la negación de   ∀n ∈ ℕ :  n + 4 < n³ ?",
              options: [
                "∃n ∈ ℕ :  n + 4 ≥ n³",
                "∀n ∈ ℕ :  n + 4 ≥ n³",
                "∃n ∈ ℕ :  n + 4 < n³",
                "¬∃n ∈ ℕ :  n + 4 < n³",
              ],
              correctIndex: 0,
              explanation:
                "∀ pasa a ∃ y el < se niega como ≥. (De hecho n = 1 cumple 5 ≥ 1: la negación es V.)",
            },
            {
              id: "u1-d-l3-e7",
              type: "build-expression",
              prompt: "Construye la negación de   ∀x ∈ ℝ :  (x² > 0  ∨  x = 0)",
              bank: ["∃x ∈ ℝ", "∀x ∈ ℝ", ":", "x² ≤ 0", "∧", "∨", "x ≠ 0"],
              answer: ["∃x ∈ ℝ", ":", "x² ≤ 0", "∧", "x ≠ 0"],
              explanation:
                "∀ pasa a ∃ y De Morgan niega la disyunción: ¬(a ∨ b) ≡ ¬a ∧ ¬b.",
            },
            {
              id: "u1-d-l3-e8",
              type: "multiple-choice",
              prompt: "¿Cuál es la negación de   ∃x ∈ ℤ :  (x < 3  ⇒  x + 1 < 0) ?",
              options: [
                "∀x ∈ ℤ :  (x < 3 ⇒ x + 1 ≥ 0)",
                "∃x ∈ ℤ :  (x < 3 ∧ x + 1 ≥ 0)",
                "∀x ∈ ℤ :  (x ≥ 3 ⇒ x + 1 < 0)",
                "∀x ∈ ℤ :  (x < 3 ∧ x + 1 ≥ 0)",
              ],
              correctIndex: 3,
              explanation:
                "∃ pasa a ∀ y el condicional se niega como ¬(a ⇒ b) ≡ a ∧ ¬b. ¡Nunca queda otro condicional!",
            },
          ],
        },
        {
          id: "u1-d-l4",
          title: "Guía · Dobles cuantificadores",
          subtitle: "Nivel 4 · Guía de ejercicios",
          exercises: [
            {
              id: "u1-d-l4-e1",
              type: "multiple-choice",
              prompt:
                "p(x, y): x + y = 8, con x, y ∈ ℤ. ¿Qué valores tienen   ∀x: ∃y: p(x, y)   y   ∃x: ∀y: p(x, y)?",
              options: [
                "Ambas V",
                "La primera V, la segunda F",
                "La primera F, la segunda V",
                "Ambas F",
              ],
              correctIndex: 1,
              explanation:
                "Para cada x sirve y = 8 − x (el y depende de x). Pero ningún x fijo suma 8 con TODOS los y.",
            },
            {
              id: "u1-d-l4-e2",
              type: "multiple-choice",
              prompt:
                "Con el mismo p(x, y): ¿y   ∀x: ∀y: p(x, y)   y   ∃x: ∃y: p(x, y)?",
              options: [
                "La primera F, la segunda V",
                "Ambas V",
                "La primera V, la segunda F",
                "Ambas F",
              ],
              correctIndex: 0,
              explanation:
                "1 + 1 ≠ 8 tumba al doble universal; 3 + 5 = 8 confirma al doble existencial.",
            },
            {
              id: "u1-d-l4-e3",
              type: "multiple-choice",
              prompt:
                "U = {1, −2, 3, −4, 5, 0}. ¿Verdadero o falso?   ∀x ∈ U: ∃y ∈ U: (x < y ∨ x < y²)",
              options: ["Verdadero", "Falso"],
              correctIndex: 0,
              explanation:
                "Para x = 5 sirve y = −4, porque 5 < (−4)² = 16. Para cualquier otro x sirve y = 5.",
            },
            {
              id: "u1-d-l4-e4",
              type: "multiple-choice",
              prompt: "¿Verdadero o falso?   ∀x ∈ ℝ: ∀y ∈ ℝ: (x > y ⇒ x² > y²)",
              options: ["Verdadero", "Falso"],
              correctIndex: 1,
              explanation:
                "x = 1, y = −2: 1 > −2 pero 1² = 1 < 4 = (−2)². Con negativos, elevar al cuadrado invierte el orden.",
            },
            {
              id: "u1-d-l4-e5",
              type: "multiple-choice",
              prompt: "¿Verdadero o falso?   ∃x ∈ ℝ: ∀y ∈ ℝ: (x² > y² ⇒ x > y)",
              options: ["Verdadero", "Falso"],
              correctIndex: 0,
              explanation:
                "x = 0 sirve: 0 > y² no se cumple nunca, así que el condicional es V para todo y (antecedente falso).",
            },
            {
              id: "u1-d-l4-e6",
              type: "multiple-choice",
              prompt:
                "Se sabe que   ∀x: ∃y: p(x, y)   es V. ¿Qué pasa con   ∃x: ∃y: p(x, y)   y con   ∃x: ∀y: ¬p(x, y)?",
              options: [
                "Ambas quedan indeterminadas",
                "La primera es V; la segunda es F",
                "Ambas son V",
                "La primera es F; la segunda es V",
              ],
              correctIndex: 1,
              explanation:
                "Si todo x tiene su y, en particular existe un par (V). Y un x donde p falle con TODOS los y contradiría la hipótesis (F).",
            },
            {
              id: "u1-d-l4-e7",
              type: "multiple-choice",
              prompt:
                "Con la misma hipótesis (∀x: ∃y: p(x, y) es V), ¿se puede asegurar   ∃y: ∀x: p(x, y)?",
              options: [
                "Sí: es equivalente",
                "Sí: porque el doble existencial es V",
                "No: el y puede depender de cada x y no haber uno fijo que sirva para todos",
                "No: es necesariamente falsa",
              ],
              correctIndex: 2,
              explanation:
                "∃y ∀x exige UN y fijo. Con x + y = 8 la hipótesis es V y esta es F; con p(x, y): «y = y» ambas son V. Queda indeterminada.",
            },
            {
              id: "u1-d-l4-e8",
              type: "multiple-choice",
              prompt:
                "¿Cuáles distribuciones de cuantificadores son equivalencias válidas?   (1) ∃ sobre ∧   (2) ∃ sobre ∨   (3) ∀ sobre ∨   (4) ∀ sobre ∧",
              options: ["(1) y (3)", "(2) y (4)", "Las cuatro", "Solo la (2)"],
              correctIndex: 1,
              explanation:
                "∃x:[p ∨ q] ≡ ∃x:p ∨ ∃x:q  y  ∀x:[p ∧ q] ≡ ∀x:p ∧ ∀x:q. Que alguien cumpla p y alguien cumpla q no da alguien que cumpla ambas; y que todos cumplan p ∨ q no fuerza que todos cumplan la misma.",
            },
          ],
        },
        {
          id: "u1-d-l5",
          title: "Álgebra de cuantificadores",
          subtitle: "Nivel 4 · Qué se hereda y qué no",
          exercises: [
            {
              id: "u1-d-l5-e1",
              type: "multiple-choice",
              prompt:
                "Sabiendo que  ∀x: ∃y: p(x, y)  es VERDADERA, ¿se puede asegurar el valor de  ∃x: ∃y: p(x, y)?",
              options: [
                "Sí: es verdadera, basta tomar cualquier x con su y",
                "Sí: es falsa",
                "No: queda indeterminada",
                "Solo si el dominio es finito",
              ],
              correctIndex: 0,
              explanation:
                "Lo universal implica lo existencial (en dominios no vacíos): si para TODO x hay un y, en particular para alguno lo hay. ∀x∃y ⇒ ∃x∃y.",
            },
            {
              id: "u1-d-l5-e2",
              type: "multiple-choice",
              prompt:
                "Con la misma hipótesis (∀x: ∃y: p(x, y) verdadera), ¿se puede asegurar  ∀x: ∀y: p(x, y)?",
              options: [
                "No: queda indeterminada",
                "Sí: es verdadera",
                "Sí: es falsa",
                "Es equivalente a la hipótesis",
              ],
              correctIndex: 0,
              explanation:
                "Que cada x tenga ALGÚN y no obliga a que sirvan TODOS los y. Con p(x,y): x + y = 8 en ℤ la hipótesis es V y ∀∀ es F; con p(x,y): «y = y» ambas son V.",
            },
            {
              id: "u1-d-l5-e3",
              type: "multiple-choice",
              prompt:
                "Con la misma hipótesis (∀x: ∃y: p(x, y) verdadera), ¿qué vale  ∃x: ∀y: ¬p(x, y)?",
              options: [
                "Es FALSA con seguridad: contradiría la hipótesis para ese x",
                "Es VERDADERA con seguridad",
                "Queda indeterminada",
                "Es equivalente a la hipótesis",
              ],
              correctIndex: 0,
              explanation:
                "∃x∀y:¬p(x,y) es exactamente la NEGACIÓN de ∀x∃y:p(x,y). Si la hipótesis es V, su negación es F.",
            },
            {
              id: "u1-d-l5-e4",
              type: "multiple-choice",
              prompt:
                "¿Es  ∃x: [p(x) ∧ q(x)]  equivalente a  ∃x: p(x) ∧ ∃x: q(x)?",
              options: [
                "No: la primera implica la segunda, pero no al revés",
                "Sí: el existencial distribuye sobre ∧",
                "No: la segunda implica la primera, pero no al revés",
                "Sí: por De Morgan",
              ],
              correctIndex: 0,
              explanation:
                "Si UN MISMO x cumple ambas, hay testigo para cada una. Pero al revés no: en ℤ hay pares y hay impares, y ningún x es par e impar a la vez.",
            },
            {
              id: "u1-d-l5-e5",
              type: "multiple-choice",
              prompt:
                "¿Es  ∀x: [p(x) ∨ q(x)]  equivalente a  ∀x: p(x) ∨ ∀x: q(x)?",
              options: [
                "No: la segunda implica la primera, pero no al revés",
                "Sí: el universal distribuye sobre ∨",
                "No: la primera implica la segunda, pero no al revés",
                "Sí: ambas dicen lo mismo",
              ],
              correctIndex: 0,
              explanation:
                "Si todos cumplen p (o todos q), todos cumplen p ∨ q. Pero en ℤ todo número es par o impar (V) sin que todos sean pares ni todos impares (F).",
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
      accent: "fuchsia",
      guide: {
        levels: [
          {
            emoji: "🧩",
            title: "Validez y reglas de inferencia",
            intro:
              "Un razonamiento es válido si, siempre que las premisas sean verdaderas, la conclusión también lo es de forma obligatoria.",
            entries: [
              {
                term: "Modus Ponens (MP)",
                text: "Si se da el antecedente, se cumple el consecuente: de p ⇒ q y p se infiere q.",
              },
              {
                term: "Modus Tollens (MT)",
                text: "Negar el consecuente niega el antecedente: de p ⇒ q y ¬q se infiere ¬p.",
              },
              {
                term: "Silogismo Hipotético (SH)",
                text: "Encadena condicionales transitivos: de p ⇒ q y q ⇒ r se infiere p ⇒ r.",
              },
              {
                term: "Silogismo Disyuntivo (SD)",
                text: "Descarte en una disyunción: de p ∨ q y ¬p se infiere q (o de p ∨ q y ¬q se infiere p).",
              },
              {
                term: "Simplificación (S) y Conjunción (C)",
                text: "De p ∧ q se infiere p (o q). Al revés, de p y q por separado se infiere p ∧ q.",
              },
            ],
          },
          {
            emoji: "🚫",
            title: "Detección de falacias",
            intro: "Un razonamiento es inválido si es posible construir un contraejemplo.",
            entries: [
              {
                term: "Contraejemplo",
                text: "Asignación de valores de verdad que hace VERDADERAS todas las premisas y FALSA la conclusión. Si existe al menos uno, el razonamiento es inválido.",
              },
              {
                term: "Afirmar el consecuente",
                text: "Falacia común: de p ⇒ q y q NO se puede deducir p.",
              },
              {
                term: "Negar el antecedente",
                text: "Falacia común: de p ⇒ q y ¬p NO se puede deducir ¬q.",
              },
            ],
          },
          {
            emoji: "🎭",
            title: "Método del absurdo",
            intro:
              "Para decidir la validez sin hacer toda la tabla: supón las premisas VERDADERAS y la conclusión FALSA, y persigue los valores forzados.",
            entries: [
              {
                text: "Si esa suposición lleva a una contradicción, no existe contraejemplo: el razonamiento es VÁLIDO.",
              },
              {
                text: "Si en cambio logras una asignación coherente, eso ES el contraejemplo: el razonamiento es INVÁLIDO.",
              },
              {
                term: "Estrategia",
                text: "Empieza por lo que deja menos opciones (la conclusión, una premisa de una sola letra o una negación) y propaga los valores.",
              },
              {
                term: "¿Qué método me conviene?",
                text: "Tabla: pocas variables (con n variables son 2ⁿ filas). Absurdo: va directo al grano. Deducción: cuando ves el camino de reglas.",
              },
            ],
          },
        ],
        tip: "Para demostrar la validez de forma directa, parte de las premisas dadas y aplica las reglas de inferencia paso a paso hasta llegar a la conclusión. Si dudas de su validez, busca un contraejemplo forzando la conclusión a ser falsa.",
      },
      lessons: [
        {
          id: "u1-e-l1",
          title: "Reglas de inferencia",
          subtitle: "Nivel 5 · Reglas elementales",
          exercises: [
            {
              id: "u1-e-l1-e1",
              type: "multiple-choice",
              prompt: "Identifica qué regla de inferencia se aplica en:\n«Si llueve, voy al cine. Llueve. Por lo tanto, voy al cine.»\n(p ⇒ q ,  p   ∴  q)",
              options: [
                "Modus Ponens (MP)",
                "Modus Tollens (MT)",
                "Silogismo Hipotético (SH)",
                "Silogismo Disyuntivo (SD)",
              ],
              correctIndex: 0,
              explanation: "Modus Ponens: de una implicación y la afirmación de su antecedente se deduce su consecuente.",
            },
            {
              id: "u1-e-l1-e2",
              type: "multiple-choice",
              prompt: "Identifica la regla aplicada:\n«Si estudio, apruebo. No aprobé. Por lo tanto, no estudié.»\n(p ⇒ q ,  ¬q   ∴  ¬p)",
              options: [
                "Modus Tollens (MT)",
                "Modus Ponens (MP)",
                "Silogismo Hipotético (SH)",
                "Ley de Simplificación",
              ],
              correctIndex: 0,
              explanation: "Modus Tollens: de una implicación y la negación de su consecuente se deduce la negación del antecedente.",
            },
            {
              id: "u1-e-l1-e3",
              type: "multiple-choice",
              prompt: "Identifica la regla aplicada:\n«Si como sano, tengo energía. Si tengo energía, juego mejor. Por lo tanto, si como sano, juego mejor.»\n(p ⇒ q ,  q ⇒ r   ∴  p ⇒ r)",
              options: [
                "Silogismo Hipotético (SH)",
                "Modus Ponens (MP)",
                "Modus Tollens (MT)",
                "Silogismo Disyuntivo (SD)",
              ],
              correctIndex: 0,
              explanation: "Silogismo Hipotético: encadena dos condicionales donde el consecuente del primero es el antecedente del segundo.",
            },
            {
              id: "u1-e-l1-e4",
              type: "multiple-choice",
              prompt: "Identifica la regla aplicada:\n«Eric va a pescar o juega al tenis. No fue a pescar. Por lo tanto, juega al tenis.»\n(p ∨ q ,  ¬p   ∴  q)",
              options: [
                "Silogismo Disyuntivo (SD)",
                "Modus Ponens (MP)",
                "Ley de Adición",
                "Silogismo Hipotético",
              ],
              correctIndex: 0,
              explanation: "Silogismo Disyuntivo: dada una disyunción, si descartas una opción, la otra debe ser verdadera.",
            },
            {
              id: "u1-e-l1-e5",
              type: "multiple-choice",
              prompt: "Dada la premisa  p ∧ q, se infiere  p  por la regla de…",
              options: [
                "Simplificación",
                "Conjunción",
                "Adición",
                "Modus Ponens",
              ],
              correctIndex: 0,
              explanation: "La ley de Simplificación permite deducir cualquiera de los componentes de una conjunción verdadera.",
            },
          ],
        },
        {
          id: "u1-e-l2",
          title: "Contraejemplos básicos",
          subtitle: "Nivel 5 · Razonamientos inválidos",
          exercises: [
            {
              id: "u1-e-l2-e1",
              type: "counterexample",
              prompt:
                "Este razonamiento (Falacia de afirmar el consecuente) es INVÁLIDO. Asigna valores para probarlo.\nPremisas: p ⇒ q ,  q     Conclusión: p",
              premises: ["p ⇒ q", "q"],
              conclusion: "p",
              variables: ["p", "q"],
              explanation:
                "Con p = F y q = V, el antecedente de p ⇒ q es F (el condicional es V), la premisa q es V, pero la conclusión p es F: premisas verdaderas y conclusión falsa.",
            },
            {
              id: "u1-e-l2-e2",
              type: "counterexample",
              prompt:
                "Este razonamiento (Falacia de negar el antecedente) es INVÁLIDO. Asigna valores para el contraejemplo.\nPremisas: p ⇒ q ,  ¬p     Conclusión: ¬q",
              premises: ["p ⇒ q", "¬p"],
              conclusion: "¬q",
              variables: ["p", "q"],
              explanation:
                "Con p = F y q = V, p ⇒ q es V, ¬p es V (porque p es F), pero la conclusión ¬q es F (porque q es V).",
            },
            {
              id: "u1-e-l2-e3",
              type: "counterexample",
              prompt:
                "Halla el contraejemplo para este razonamiento disyuntivo inválido.\nPremisas: p ∨ q ,  p     Conclusión: ¬q",
              premises: ["p ∨ q", "p"],
              conclusion: "¬q",
              variables: ["p", "q"],
              explanation:
                "Con p = V y q = V, ambas premisas son verdaderas, pero la conclusión ¬q es falsa (la disyunción lógica no es excluyente por defecto).",
            },
            {
              id: "u1-e-l2-e4",
              type: "counterexample",
              prompt:
                "Encuentra el contraejemplo de 3 variables.\nPremisas: p ⇒ q ,  q ⇒ r ,  r     Conclusión: p",
              premises: ["p ⇒ q", "q ⇒ r", "r"],
              conclusion: "p",
              variables: ["p", "q", "r"],
              explanation:
                "Con p = F, q = F (o V) y r = V, las tres premisas se evalúan a verdadero, pero la conclusión p es falsa.",
            },
            {
              id: "u1-e-l2-e5",
              type: "counterexample",
              prompt:
                "Halla el contraejemplo de 3 variables.\nPremisas: p ⇒ q ,  ¬p ∨ r ,  ¬r     Conclusión: ¬q",
              premises: ["p ⇒ q", "¬p ∨ r", "¬r"],
              conclusion: "¬q",
              variables: ["p", "q", "r"],
              explanation:
                "Forzamos conclusión falsa: q = V. Para ¬r = V necesitamos r = F. Como r = F, para que ¬p ∨ r sea V necesitamos ¬p = V (p = F). Con p=F y q=V, p ⇒ q es V. Contraejemplo: p=F, q=V, r=F.",
            },
            {
              id: "u1-e-l2-e6",
              type: "multiple-choice",
              prompt:
                "Método del absurdo sobre   p ∨ q ;  ¬p   ∴  q\nSupón la conclusión FALSA (q = F) y las premisas VERDADERAS. De ¬p = V sale p = F. ¿Qué pasa con la premisa p ∨ q?",
              options: [
                "Queda F ∨ F = F, contradiciendo que era V: el razonamiento es VÁLIDO",
                "Queda V: encontramos el contraejemplo, es INVÁLIDO",
                "Queda indeterminada: hay que probar otra asignación",
                "El método no se puede aplicar con dos premisas",
              ],
              correctIndex: 0,
              explanation:
                "La única forma de tener premisas V y conclusión F se autodestruye: no existe contraejemplo. Es el Silogismo Disyuntivo, demostrado por el absurdo.",
            },
          ],
        },
        {
          id: "u1-e-l3",
          title: "Validez de razonamientos",
          subtitle: "Nivel 5 · Guía de ejercicios",
          exercises: [
            {
              id: "u1-e-l3-e1",
              type: "multiple-choice",
              prompt:
                "«Si me pagan el aguinaldo hoy, pagaré la deuda. Hoy me pagaron el aguinaldo. Por lo tanto, pagaré la deuda.» ¿Es válido?",
              options: [
                "Válido: Modus Tollens",
                "Válido: Modus Ponens",
                "Inválido: afirma el consecuente",
                "Inválido: niega el antecedente",
              ],
              correctIndex: 1,
              explanation:
                "p ⇒ q y p dan q: Modus Ponens. Afirmar el ANTECEDENTE sí es una regla válida.",
            },
            {
              id: "u1-e-l3-e2",
              type: "counterexample",
              prompt:
                "«Si no llueve y no hay viento, vuelo en el avión. Volé en el avión. Por lo tanto, no llovió.» Es INVÁLIDO: encuentra el contraejemplo.  (p: llueve, q: hay viento, r: vuelo)",
              premises: ["¬p ∧ ¬q ⇒ r", "r"],
              conclusion: "¬p",
              variables: ["p", "q", "r"],
              explanation:
                "Con p = V y r = V las premisas valen V (el antecedente del condicional es F) pero ¬p es F: pude volar aunque lloviera. Falacia de afirmar el consecuente.",
            },
            {
              id: "u1-e-l3-e3",
              type: "multiple-choice",
              prompt:
                "«Si el planeta Kamino figura en los Archivos Jedi, entonces existe. Kamino no figura en los Archivos. Por lo tanto, Kamino no existe.» ¿Es válido?",
              options: [
                "Válido: Modus Tollens",
                "Inválido: niega el antecedente",
                "Válido: Modus Ponens",
                "Inválido: afirma el consecuente",
              ],
              correctIndex: 1,
              explanation:
                "De f ⇒ e y ¬f no se infiere ¬e. Como descubrió Obi-Wan, Kamino existía: alguien lo había borrado de los Archivos.",
            },
            {
              id: "u1-e-l3-e4",
              type: "multiple-choice",
              prompt:
                "Analiza:   ¬p ;  q ⇒ t ∨ r ;  t ⇒ p     ∴   q ⇒ r",
              options: ["Inválido", "Válido"],
              correctIndex: 1,
              explanation:
                "De ¬p y t ⇒ p sale ¬t (Modus Tollens). Si vale q, vale t ∨ r; sin t queda r (silogismo disyuntivo). Por eso q ⇒ r.",
            },
            {
              id: "u1-e-l3-e5",
              type: "counterexample",
              prompt:
                "Es INVÁLIDO: halla el contraejemplo.\nPremisas: (p ∧ q) ⇒ r ,  ¬r ∨ t ,  ¬t     Conclusión: ¬p",
              premises: ["(p ∧ q) ⇒ r", "¬r ∨ t", "¬t"],
              conclusion: "¬p",
              variables: ["p", "q", "r", "t"],
              explanation:
                "Con p = V, q = F, r = F, t = F todas las premisas son V pero ¬p es F. De ¬r solo se infiere ¬(p ∧ q), no ¬p.",
            },
            {
              id: "u1-e-l3-e6",
              type: "counterexample",
              prompt:
                "Es INVÁLIDO: halla el contraejemplo.\nPremisas: a ⇒ b ,  ¬b ∨ ¬c ,  d ⇒ a ∨ c     Conclusión: ¬d",
              premises: ["a ⇒ b", "¬b ∨ ¬c", "d ⇒ a ∨ c"],
              conclusion: "¬d",
              variables: ["a", "b", "c", "d"],
              explanation:
                "Con a = V, b = V, c = F y d = V las tres premisas son V y ¬d es F: d puede sostenerse vía a.",
            },
            {
              id: "u1-e-l3-e7",
              type: "counterexample",
              prompt:
                "El más difícil de la guía: halla el contraejemplo.\nPremisas: p ⇒ q ∨ r ,  p ∨ (¬t ∨ s) ,  ¬q ∧ ¬s ,  s ⇒ ¬t     Conclusión: ¬t",
              premises: ["p ⇒ q ∨ r", "p ∨ (¬t ∨ s)", "¬q ∧ ¬s", "s ⇒ ¬t"],
              conclusion: "¬t",
              variables: ["p", "q", "r", "s", "t"],
              explanation:
                "Con p = V, r = V y t = V (q = s = F) las cuatro premisas son V pero ¬t es F.",
            },
            {
              id: "u1-e-l3-e8",
              type: "multiple-choice",
              prompt:
                "Método del absurdo sobre   (p ∧ q) ⇒ r ;  p ;  q   ∴  r\nSupón r = F y las tres premisas verdaderas. ¿Qué ocurre?",
              options: [
                "p = V y q = V fuerzan (p ∧ q) = V, y con r = F la primera premisa queda F: contradicción → VÁLIDO",
                "Se halla el contraejemplo p = V, q = V, r = F: INVÁLIDO",
                "r puede ser V o F: queda indeterminado",
                "El absurdo no aplica cuando hay tres premisas",
              ],
              correctIndex: 0,
              explanation:
                "Suponer premisas V y conclusión F obliga a que (p ∧ q) ⇒ r sea V ⇒ F = F, contradiciendo la suposición. No hay contraejemplo posible: el razonamiento es válido.",
            },
            {
              id: "u1-e-l3-e9",
              type: "multiple-choice",
              prompt:
                "Para analizar la validez de un razonamiento con 5 proposiciones simples, ¿qué método conviene y por qué?",
              options: [
                "El del absurdo o la deducción: la tabla tendría 2⁵ = 32 filas",
                "La tabla de verdad: es siempre la más corta",
                "Ninguno: con 5 variables no se puede decidir",
                "Contar los conectivos de cada premisa",
              ],
              correctIndex: 0,
              explanation:
                "La tabla crece exponencialmente (2ⁿ filas). El método del absurdo va directo: fuerza conclusión F y premisas V, y mira si sobrevive alguna asignación.",
            },
          ],
        },
        {
          id: "u1-e-l4",
          title: "Razonamientos categóricos",
          subtitle: "Nivel 5 · Predicados",
          exercises: [
            {
              id: "u1-e-l4-e1",
              type: "build-expression",
              prompt:
                "Simboliza: «Todos los grafos completos son conexos».  (U = grafos; p(x): x es completo; q(x): x es conexo)",
              bank: ["∀x", "∃x", ":", "p(x)", "q(x)", "⇒", "∧"],
              answer: ["∀x", ":", "p(x)", "⇒", "q(x)"],
              explanation:
                "«Todos los A son B» se simboliza ∀x: A(x) ⇒ B(x). Ojo: con ∀ va ⇒, no ∧.",
            },
            {
              id: "u1-e-l4-e2",
              type: "multiple-choice",
              prompt:
                "«Todos los grafos completos son conexos. K₅ es completo. Por lo tanto, K₅ es conexo.» ¿Es válido?",
              options: [
                "Válido: particularización universal y Modus Ponens",
                "Inválido: K₅ es solo un caso particular",
                "Inválido: falta la tabla de verdad",
                "Válido: porque la conclusión es verdadera",
              ],
              correctIndex: 0,
              explanation:
                "El ∀ permite particularizar en K₅: p(K₅) ⇒ q(K₅); con p(K₅) sale q(K₅) por Modus Ponens.",
            },
            {
              id: "u1-e-l4-e3",
              type: "multiple-choice",
              prompt:
                "«Algunos invitados son ingenieros. Algunos ingenieros saben programar. Por lo tanto, algunos invitados saben programar.» ¿Es válido?",
              options: [
                "Válido: se encadenan los dos «algunos»",
                "Inválido: cada «algunos» puede referirse a personas distintas",
                "Válido: silogismo hipotético",
                "Inválido: faltan datos numéricos",
              ],
              correctIndex: 1,
              explanation:
                "Cada ∃ tiene su propio testigo: el invitado ingeniero puede no ser el ingeniero que sabe programar.",
            },
            {
              id: "u1-e-l4-e4",
              type: "multiple-choice",
              prompt:
                "«Todas las matrices que tienen dos filas iguales no son inversibles. La matriz M es inversible. Por lo tanto, M no tiene dos filas iguales.» ¿Es válido?",
              options: [
                "Inválido: niega el antecedente",
                "Inválido: afirma el consecuente",
                "Válido: particularización en M y Modus Tollens",
                "No se puede analizar sin conocer M",
              ],
              correctIndex: 2,
              explanation:
                "∀x: f(x) ⇒ ¬i(x); particularizando en M y sabiendo i(M), sale ¬f(M) por Modus Tollens.",
            },
            {
              id: "u1-e-l4-e5",
              type: "multiple-choice",
              prompt:
                "Para comprobar que   ∀x:[d(x) ⇒ c(x)] ; ∃x:[¬c(x) ∧ p(x)]   ⟹   ∀x:[c(x) ∨ p(x)]   es INVÁLIDO, ¿qué interpretación sirve?",
              options: [
                "U = ∅ (el vacío invalida todo)",
                "U = {1, 2, 3};  d(x): x > 5;  c(x): x es par;  p(x): x = 1",
                "U = {2, 4};  d(x): x es par;  c(x): x es par;  p(x): x > 0",
                "Ninguna: el razonamiento es válido",
              ],
              correctIndex: 1,
              explanation:
                "Nadie cumple d (premisa 1 V por vacuidad) y el 1 cumple ¬c ∧ p (premisa 2 V), pero el 3 no cumple c ∨ p: premisas V con conclusión F.",
            },
            {
              id: "u1-e-l4-e6",
              type: "multiple-choice",
              prompt:
                "∀x:[p(x) ∨ q(x)] ;  ∀x:[p(x) ⇒ r(x)] ;  ¬r(a).   ¿Qué conclusión   ∃x: …   es válida?",
              options: [
                "∃x: [p(x) ∧ r(x)]",
                "∃x: [q(x) ∧ ¬p(x)]",
                "∃x: ¬q(x)",
                "∃x: [p(x) ∧ ¬r(x)]",
              ],
              correctIndex: 1,
              explanation:
                "De ¬r(a) y p(a) ⇒ r(a) sale ¬p(a) (Modus Tollens); de p(a) ∨ q(a) sale q(a) (silogismo disyuntivo). El elemento a cumple q ∧ ¬p: generalización existencial.",
            },
            {
              id: "u1-e-l4-e7",
              type: "multiple-choice",
              prompt:
                "¿Cuál es válido?   (1) ∃x:[p(x) ∨ q(x)] ; ∃x:[¬q(x) ∧ r(x)]  ∴  ∃x:[p(x) ∧ r(x)]      (2) ∀x:¬[p(x) ∨ q(x)]  ∴  ∃x:¬q(x)",
              options: ["Solo el (1)", "Ambos", "Solo el (2)", "Ninguno"],
              correctIndex: 2,
              explanation:
                "El (1) es inválido: los testigos de cada ∃ pueden ser elementos distintos. El (2) es válido: ∀x: ¬p ∧ ¬q da ∀x: ¬q y, con universo no vacío, ∃x: ¬q.",
            },
            {
              id: "u1-e-l4-e8",
              type: "multiple-choice",
              prompt:
                "«Todas las frutas que están en la heladera están lavadas. Algunas frutas no están lavadas y son deliciosas.» ¿Qué conclusión es válida?",
              options: [
                "c1: Algunas frutas están en la heladera y son deliciosas",
                "c2: Todas las frutas de la heladera son deliciosas",
                "c3: Algunas frutas no están en la heladera y son deliciosas",
                "Ninguna de las tres",
              ],
              correctIndex: 2,
              explanation:
                "Toma la fruta testigo: no lavada y deliciosa. Si estuviera en la heladera, estaría lavada (Modus Tollens): no está en la heladera. Y es deliciosa: c3.",
            },
            {
              id: "u1-e-l4-e9",
              type: "multiple-choice",
              prompt:
                "Con diagramas de Venn:   (1) ∀x:[p(x) ⇒ q(x)] ; ¬q(a)  ∴  ¬p(a)      (2) ∀x:[a(x) ∨ b(x)] ; ∃x:[c(x) ∧ ¬a(x)]  ∴  ∃x:[c(x) ∧ b(x)].   ¿Qué concluyes?",
              options: [
                "Solo el (1) es válido",
                "Solo el (2) es válido",
                "Ninguno es válido",
                "Ambos son válidos",
              ],
              correctIndex: 3,
              explanation:
                "(1): P ⊆ Q y a fuera de Q implican a fuera de P. (2): el testigo de c ∧ ¬a cae dentro de B porque A ∪ B cubre todo el universo: cumple c ∧ b.",
              },
            ],
          },
          {
            id: "u1-e-l5",
            title: "Deducción formal",
            subtitle: "Nivel 5 · Demostrar paso a paso",
            exercises: [
              {
                id: "u1-e-l5-e1",
                type: "deduction-steps",
                prompt:
                  "Justifica cada línea de la demostración para concluir ¬p.",
                premises: ["p ⇒ q", "q ⇒ r", "¬r"],
                steps: [
                  {
                    options: [
                      "Silogismo Hipotético (SH)",
                      "Modus Ponens (MP)",
                      "Conjunción",
                    ],
                    correctIndex: 0,
                    result: "p ⇒ r",
                    from: "de 1 y 2",
                  },
                  {
                    options: [
                      "Modus Tollens (MT)",
                      "Silogismo Disyuntivo (SD)",
                      "Adición",
                    ],
                    correctIndex: 0,
                    result: "¬p",
                    from: "de 4 y 3",
                  },
                ],
                explanation:
                  "Encadenando los condicionales (SH) queda p ⇒ r; negar su consecuente con ¬r niega el antecedente (MT): ¬p.",
              },
              {
                id: "u1-e-l5-e2",
                type: "deduction-steps",
                prompt:
                  "Un final clásico: «Si usó la estrategia 1, no usó la 2. Si no usó la 1, usó la 3. Usó la 2.» Demuestra que usó la estrategia 3.",
                premises: ["p ⇒ ¬q", "¬p ⇒ r", "q"],
                steps: [
                  {
                    options: [
                      "Modus Tollens (MT)",
                      "Modus Ponens (MP)",
                      "Simplificación",
                    ],
                    correctIndex: 0,
                    result: "¬p",
                    from: "de 1 y 3",
                  },
                  {
                    options: [
                      "Modus Ponens (MP)",
                      "Modus Tollens (MT)",
                      "Conjunción",
                    ],
                    correctIndex: 0,
                    result: "r",
                    from: "de 2 y 4",
                  },
                ],
                explanation:
                  "q hace falso al consecuente ¬q, así que MT da ¬p. Ese ¬p activa la segunda premisa por MP y se concluye r: usó la estrategia 3.",
              },
              {
                id: "u1-e-l5-e3",
                type: "deduction-steps",
                prompt:
                  "Estilo Sherlock Holmes: justifica las tres líneas para concluir r.",
                premises: ["p ⇒ q", "¬q", "¬p ⇒ (r ∨ s)", "¬s"],
                steps: [
                  {
                    options: [
                      "Modus Tollens (MT)",
                      "Modus Ponens (MP)",
                      "Silogismo Disyuntivo (SD)",
                    ],
                    correctIndex: 0,
                    result: "¬p",
                    from: "de 1 y 2",
                  },
                  {
                    options: [
                      "Modus Ponens (MP)",
                      "Silogismo Hipotético (SH)",
                      "Adición",
                    ],
                    correctIndex: 0,
                    result: "r ∨ s",
                    from: "de 3 y 5",
                  },
                  {
                    options: [
                      "Silogismo Disyuntivo (SD)",
                      "Simplificación",
                      "Modus Tollens (MT)",
                    ],
                    correctIndex: 0,
                    result: "r",
                    from: "de 6 y 4",
                  },
                ],
                explanation:
                  "MT descarta p; MP abre la disyunción r ∨ s; y como ¬s descarta s, el Silogismo Disyuntivo deja r.",
              },
              {
                id: "u1-e-l5-e4",
                type: "deduction-steps",
                prompt:
                  "Razonamiento categórico: «Algunos escritores son pintores. Todos los pintores son bohemios.» Demuestra que algunos son bohemios.\n(e: escritor · p: pintor · b: bohemio)",
                premises: ["∃x: [e(x) ∧ p(x)]", "∀x: [p(x) ⇒ b(x)]"],
                steps: [
                  {
                    options: [
                      "Particularización Existencial (PE)",
                      "Especificación Universal (EU)",
                      "Generalización Existencial (GE)",
                    ],
                    correctIndex: 0,
                    result: "e(a) ∧ p(a)",
                    from: "de 1, con a testigo",
                  },
                  {
                    options: [
                      "Simplificación",
                      "Adición",
                      "Modus Ponens (MP)",
                    ],
                    correctIndex: 0,
                    result: "p(a)",
                    from: "de 3",
                  },
                  {
                    options: [
                      "Especificación Universal (EU)",
                      "Generalización Universal (GU)",
                      "Particularización Existencial (PE)",
                    ],
                    correctIndex: 0,
                    result: "p(a) ⇒ b(a)",
                    from: "de 2",
                  },
                  {
                    options: [
                      "Modus Ponens (MP)",
                      "Modus Tollens (MT)",
                      "Silogismo Disyuntivo (SD)",
                    ],
                    correctIndex: 0,
                    result: "b(a)",
                    from: "de 4 y 5",
                  },
                  {
                    options: [
                      "Generalización Existencial (GE)",
                      "Generalización Universal (GU)",
                      "Especificación Universal (EU)",
                    ],
                    correctIndex: 0,
                    result: "∃x: b(x)",
                    from: "de 6",
                  },
                ],
                explanation:
                  "Primero SIEMPRE se particulariza el existencial (el testigo a). Luego se especializa el universal en ese mismo a, se aplica MP y se generaliza existencialmente.",
              },
              {
                id: "u1-e-l5-e5",
                type: "multiple-choice",
                prompt:
                  "Completa con una conclusión válida y demostrable:\n∀x: [p(x) ∨ q(x)] ;  ∀x: [p(x) ⇒ r(x)] ;  ¬r(a)   ∴  ¿?",
                options: [
                  "∃x: q(x)",
                  "∃x: r(x)",
                  "∀x: q(x)",
                  "∃x: p(x)",
                ],
                correctIndex: 0,
                explanation:
                  "EU en a: p(a) ⇒ r(a); con ¬r(a) sale ¬p(a) (MT); con p(a) ∨ q(a) queda q(a) (SD); y por GE: ∃x: q(x).",
              },
            ],
          },
          {
            id: "u1-e-l6",
            title: "El gran desafío",
            subtitle: "Jefe final · Parcial",
            exercises: [
              {
                id: "u1-e-l6-e1",
                type: "build-expression",
                prompt:
                  "Simboliza: «Si trajo cédula, entonces presentó el apto médico».  (c: trajo cédula, a: presentó el apto)",
                bank: ["c", "a", "⇒", "∧", "∨", "¬"],
                answer: ["c", "⇒", "a"],
                explanation: "Condicional directo: c ⇒ a.",
              },
              {
                id: "u1-e-l6-e2",
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
                id: "u1-e-l6-e3",
                type: "multiple-choice",
                prompt:
                  "«Si iba solo y desarmado, su jefe no lo mataría. Para suplicarle perdón era necesario ir desarmado. Le suplicó perdón, pero su jefe igualmente lo mató.» ¿Qué conclusión es válida?",
                options: [
                  "No le suplicó perdón",
                  "Fue armado",
                  "No fue solo",
                  "Su jefe no lo mató",
                ],
                correctIndex: 2,
                explanation:
                  "s: iba solo, d: desarmado, m: lo mató. De la súplica sale d (la condición necesaria, Modus Ponens). De m y (s ∧ d) ⇒ ¬m sale ¬(s ∧ d) (Modus Tollens), o sea ¬s ∨ ¬d; como d vale, queda ¬s: no fue solo.",
              },
            ],
          },
        ],
      },
      // ── Sección F · Práctica de Examen (UTN.BA) ──────────────────────────────
      {
        id: "u1-f",
        title: "Práctica de Examen (UTN.BA)",
        description: "Ejercicios reales tomados en exámenes parciales universitarios.",
        accent: "blue",
        guide: {
          levels: [
            {
              emoji: "🎓",
              title: "Simulacro de examen",
              intro: "Entrena con los problemas de lógica reales de los parciales de la UTN.BA.",
              entries: [
                {
                  text: "Los exámenes integran todas las áreas: simplificación con leyes, validez de razonamientos proposicionales, cuantificadores y traducción de lenguaje natural."
                },
                {
                  term: "Demostración de validez",
                  text: "Para probar que un razonamiento es válido, se encadenan premisas aplicando reglas. Si es inválido, se da un contraejemplo."
                },
                {
                  term: "Negación de implicación",
                  text: "Recuerda que ¬(A ⇒ B) ≡ A ∧ ¬B. Esta equivalencia aparece frecuentemente al negar enunciados cuantificados."
                }
              ]
            }
          ],
          tip: "¡Tómate tu tiempo! Estos ejercicios tienen el nivel real de exigencia de un examen parcial."
        },
        lessons: [
          {
            id: "u1-f-l1",
            title: "Simulacro de Parcial I",
            subtitle: "Nivel Examen · Parte 1",
            exercises: [
              {
                id: "u1-f-l1-e1",
                type: "simplify-steps",
                prompt: "Simplifica el ejercicio de parcial (Tema 12):\n¬(p ∧ ¬q) ⇒ (¬q ∨ r)",
                start: "¬(p ∧ ¬q) ⇒ (¬q ∨ r)",
                steps: [
                  {
                    options: ["De Morgan y doble negación", "Definición de condicional", "Distributiva"],
                    correctIndex: 1,
                    result: "¬¬(p ∧ ¬q) ∨ (¬q ∨ r)"
                  },
                  {
                    options: ["Doble negación (Involución)", "Ley de Absorción", "De Morgan"],
                    correctIndex: 0,
                    result: "(p ∧ ¬q) ∨ ¬q ∨ r"
                  },
                  {
                    options: ["Conmutativa y asociativa", "De Morgan", "Distributiva"],
                    correctIndex: 0,
                    result: "(¬q ∨ (p ∧ ¬q)) ∨ r"
                  },
                  {
                    options: ["Ley de Absorción", "Identidad", "Tercero excluido"],
                    correctIndex: 0,
                    result: "¬q ∨ r"
                  }
                ],
                explanation: "Definición de condicional: ¬¬(p ∧ ¬q) ∨ (¬q ∨ r); luego Involución/Doble negación: (p ∧ ¬q) ∨ ¬q ∨ r; reordenando por conmutativa: (¬q ∨ (¬q ∧ p)) ∨ r; y por Absorción: ¬q ∨ r (equivalente a q ⇒ r)."
              },
              {
                id: "u1-f-l1-e2",
                type: "multiple-choice",
                prompt: "Analiza el razonamiento (Tema 11):\n«Eric va a la playa o a las montañas. Si va a la playa, lleva sombrilla. Si va a las montañas, lleva mochila. Por lo tanto, Eric lleva sombrilla o mochila»",
                options: [
                  "Válido: Dilema Constructivo (regla válida)",
                  "Inválido: falacia de afirmar el consecuente",
                  "Válido: Modus Tollens",
                  "Inválido: contraejemplo cuando no va a ningún lado"
                ],
                correctIndex: 0,
                explanation: "Es una regla de inferencia clásica llamada Dilema Constructivo: dadas p ∨ q, p ⇒ r, y q ⇒ s, se deduce r ∨ s. Es válido."
              },
              {
                id: "u1-f-l1-e3",
                type: "multiple-choice",
                prompt: "Indique el valor de verdad (Tema 14):\n«(∀x: p(x) ∨ ∀x: q(x)) ⇔ ∀x: [p(x) ∨ q(x)]»",
                options: [
                  "Falso: el universal no se distribuye sobre la disyunción (∨)",
                  "Verdadero: el universal distribuye sobre la disyunción y la conjunción",
                  "Verdadero: son equivalentes por De Morgan",
                  "Falso: el existencial es el único que distribuye sobre ∨"
                ],
                correctIndex: 0,
                explanation: "Falso. Que todos cumplan p(x) o todos cumplan q(x) implica que todos cumplen p(x) ∨ q(x), pero el recíproco no es cierto. Por ejemplo, en los enteros, todos los números son pares o impares (V), pero no todos son pares ni todos son impares (F)."
              },
              {
                id: "u1-f-l1-e4",
                type: "multiple-choice",
                prompt: "Analice el razonamiento (Tema 14):\n«Cuando llueve y la ventana está abierta, se moja mi escritorio. La ventana está abierta y mi escritorio está seco. Por lo tanto, no llueve»",
                options: [
                  "Válido: de q ∧ ¬r y p ∧ q ⇒ r se infiere ¬(p ∧ q), que con q da ¬p",
                  "Inválido: falacia de negar el antecedente",
                  "Inválido: contraejemplo cuando no llueve pero la ventana se cierra",
                  "Válido: por Silogismo Hipotético directo"
                ],
                correctIndex: 0,
                explanation: "Válido. De p ∧ q ⇒ r y ¬r (del escritorio seco) se deduce ¬(p ∧ q) por Modus Tollens. ¬(p ∧ q) equivale a ¬p ∨ ¬q. Como sabemos que la ventana está abierta (q es V, por ende ¬q es F), por Silogismo Disyuntivo concluimos ¬p (no llueve)."
              },
              {
                id: "u1-f-l1-e5",
                type: "multiple-choice",
                prompt: "Pruebe la validez del razonamiento (Tema 02):\nPremisas: (p ∧ q) ⇒ r  ;  ¬r ∨ t  ;  ¬t ∧ q\nConclusión: ¬p",
                options: [
                  "Válido: de ¬t ∧ q sale ¬t; con ¬r ∨ t queda ¬r; con (p ∧ q) ⇒ r sale ¬(p ∧ q) por MT, que con q da ¬p",
                  "Inválido: contraejemplo con p=V, q=V, r=V, t=F",
                  "Válido: por Modus Ponens directo en todas las premisas",
                  "Inválido: falacia de afirmar el consecuente en la primera premisa"
                ],
                correctIndex: 0,
                explanation: "Válido. 1. De ¬t ∧ q obtenemos ¬t y q por simplificación. 2. De ¬r ∨ t y ¬t concluimos ¬r por Silogismo Disyuntivo. 3. De (p ∧ q) ⇒ r y ¬r concluimos ¬(p ∧ q) por Modus Tollens. 4. ¬(p ∧ q) es ¬p ∨ ¬q. Como q es verdadero (¬q es F), queda ¬p por Silogismo Disyuntivo."
              }
            ]
          },
          {
            id: "u1-f-l2",
            title: "Simulacro de Parcial II",
            subtitle: "Nivel Examen · Parte 2",
            exercises: [
              {
                id: "u1-f-l2-e1",
                type: "multiple-choice",
                prompt: "Analiza el valor de verdad (Tema 15A):\n«∃y ∈ ℝ : ∀x ∈ ℝ : 2x + y = 0»",
                options: [
                  "Falso: ningún y fijo puede cumplir la ecuación para todos los reales x simultáneamente",
                  "Verdadero: para cualquier y que elijamos podemos despejar x = -y/2",
                  "Verdadero: si y = 0 se cumple para todo x",
                  "Falso: la ecuación no tiene solución en el conjunto de los reales"
                ],
                correctIndex: 0,
                explanation: "Falso. Para que sea verdadero tendría que existir un único número y que sumado a cualquier 2x diera 0. Si y fuera fijo, la ecuación solo se cumple para x = -y/2, no para todo x ∈ ℝ."
              },
              {
                id: "u1-f-l2-e2",
                type: "multiple-choice",
                prompt: "Analice la validez del razonamiento (Tema 15A):\n«Cuando presiono el botón y la aplicación está abierta, se apaga el dispositivo. La aplicación está abierta y el dispositivo está encendido (no apagado). Por lo tanto, no estoy presionando el botón»",
                options: [
                  "Válido: por Modus Tollens entre las premisas, concluyendo ¬(b ∧ a), y luego Silogismo Disyuntivo con a",
                  "Inválido: falacia de negar el antecedente",
                  "Válido: por Modus Ponens directo",
                  "Inválido: contraejemplo con b=V, a=F, d=F"
                ],
                correctIndex: 0,
                explanation: "Válido. Premisas: (b ∧ a) ⇒ d  y  (a ∧ ¬d). De a ∧ ¬d obtenemos ¬d y a. Por Modus Tollens con (b ∧ a) ⇒ d y ¬d deducimos ¬(b ∧ a), que equivale a ¬b ∨ ¬a. Como a es verdadero (¬a es F), concluimos ¬b (no presiono el botón)."
              },
              {
                id: "u1-f-l2-e3",
                type: "multiple-choice",
                prompt: "Sabiendo que  ∃x : ∀y : p(x, y)  es verdadera, ¿cuál de las siguientes proposiciones también lo es necesariamente?",
                options: [
                  "∀y : ∃x : p(x, y)  y  ∃x : ∃y : p(x, y)",
                  "∀x : ∀y : p(x, y)  y  ∀x : ∃y : ¬p(x, y)",
                  "Solo ∃x : ∃y : p(x, y)",
                  "Ninguna de las opciones"
                ],
                correctIndex: 0,
                explanation: "Si existe un x* que se relaciona con todo y, entonces para cualquier y existe al menos un x (el mismo x*), por lo que ∀y: ∃x: p(x,y) es verdadera. También existe al menos un par x, y que cumple p, por lo que ∃x: ∃y: p(x,y) es verdadera. Las demás no son necesariamente verdaderas."
              },
              {
                id: "u1-f-l2-e4",
                type: "counterexample",
                prompt: "El razonamiento del parcial (Tema 10) es INVÁLIDO. Encuentra un contraejemplo (valores para un mueble x) que haga verdaderas las premisas y falsa la conclusión.\nPremisas: a (antiguo) ,  c ∨ o (cómodo o moderno) ,  c ⇒ b (cómodo ⇒ beige)\nConclusión: a ∧ b (antiguo y beige)",
                premises: ["a", "c ∨ o", "c ⇒ b"],
                conclusion: "a ∧ b",
                variables: ["a", "c", "o", "b"],
                explanation: "Asignando a = V (antiguo), c = F (no cómodo), o = V (moderno), b = F (no beige) las tres premisas se cumplen, pero la conclusión de que es antiguo y beige es falsa."
              },
              {
                id: "u1-f-l2-e5",
                type: "multiple-choice",
                prompt: "Sabiendo que la proposición (Tema 04) es FALSA:\n¬(q ∨ r) ⇒ ¬s ∨ (p ∧ ¬r)\nDetermine los valores de verdad de p, q, r y s.",
                options: [
                  "p = F, q = F, r = F, s = V",
                  "p = V, q = F, r = F, s = F",
                  "p = F, q = V, r = F, s = V",
                  "p = V, q = V, r = V, s = V"
                ],
                correctIndex: 0,
                explanation: "El condicional es F si el antecedente ¬(q ∨ r) es V (por ende q=F y r=F) y el consecuente ¬s ∨ (p ∧ ¬r) es F. Para que la disyunción sea F, necesitamos ¬s=F (s=V) y p ∧ ¬r = F. Como r=F (¬r=V), entonces p tiene que ser F."
              },
              {
                id: "u1-f-l2-e6",
                type: "deduction-steps",
                prompt:
                  "Ahora DEMUESTRA formalmente el argumento del botón (Tema 15A): de  (b ∧ a) ⇒ d  y  a ∧ ¬d , concluye ¬b justificando cada línea.",
                premises: ["(b ∧ a) ⇒ d", "a ∧ ¬d"],
                steps: [
                  {
                    options: ["Simplificación", "Adición", "Modus Ponens (MP)"],
                    correctIndex: 0,
                    result: "¬d",
                    from: "de 2"
                  },
                  {
                    options: ["Modus Tollens (MT)", "Modus Ponens (MP)", "Silogismo Hipotético (SH)"],
                    correctIndex: 0,
                    result: "¬(b ∧ a)",
                    from: "de 1 y 3"
                  },
                  {
                    options: ["De Morgan", "Distributiva", "Doble negación (Involución)"],
                    correctIndex: 0,
                    result: "¬b ∨ ¬a",
                    from: "de 4"
                  },
                  {
                    options: ["Simplificación", "Conjunción", "Adición"],
                    correctIndex: 0,
                    result: "a",
                    from: "de 2"
                  },
                  {
                    options: ["Silogismo Disyuntivo (SD)", "Modus Tollens (MT)", "Dilema Constructivo (DC)"],
                    correctIndex: 0,
                    result: "¬b",
                    from: "de 5 y 6"
                  }
                ],
                explanation: "Simplificación extrae ¬d y a de la segunda premisa; MT niega el antecedente compuesto; De Morgan lo reparte; y el Silogismo Disyuntivo descarta ¬a (porque a vale) dejando ¬b."
              }
            ]
          }
        ]
      }
  ],
};
