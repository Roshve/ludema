/**
 * Golden set — snapshot inline congelado de alta calidad pedagógica.
 *
 * Contiene un ejercicio representativo de cada uno de los 9 tipos,
 * copiados del currículo real (unit1/unit2) y revisados manualmente.
 * Los IDs usan el prefijo "gold-" para ser autónomos y estables:
 * editar el currículo NO mueve la vara de este benchmark.
 *
 * Para actualizar el golden (p. ej. al cambiar el motor o añadir un tipo):
 *   1. Copiar el nuevo ejercicio modelo aquí con ID gold-*-*-*.
 *   2. Correr `pnpm eval:content` y verificar score 1.00.
 *   3. Commitear con mensaje "chore(eval): refresh golden - <razón>".
 *
 * IMPORTANTE: no importar desde código de app.
 */

import type { Unit } from "@/content/types";

export const goldenUnit: Unit = {
  id: "gold",
  title: "Ejercicios Golden",
  subtitle: "Benchmark de calidad pedagógica · Fase 3 harness IA",
  available: true,
  sections: [
    // ── gold-a · Proposiciones y conectivos ───────────────────────────────────
    {
      id: "gold-a",
      title: "Proposiciones",
      description: "Fundamentos de proposiciones lógicas y conectivos.",
      accent: "blue",
      lessons: [
        {
          id: "gold-a-l1",
          title: "Proposiciones y conectivos",
          exercises: [
            // concept — tarjeta de teoría (sin explicación requerida)
            {
              id: "gold-a-l1-c1",
              type: "concept",
              prompt: "¿Qué es una proposición?",
              body: [
                "Una proposición es un enunciado del que tiene sentido decir si es VERDADERO o FALSO.",
                "«2 + 3 = 5» es una proposición (verdadera). «París está en Italia» también lo es: es falsa, pero AFIRMA algo.",
                "Las preguntas, órdenes y expresiones con variable libre («x + 1 = 4») NO son proposiciones: no se les puede asignar un valor de verdad único.",
              ],
              example: "Proposición = se le puede asignar V o F",
            },

            // tap-proposition — ≥1 true y ≥1 false; explanation presente
            {
              id: "gold-a-l1-e1",
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

            // multiple-choice · correctIndex=0
            {
              id: "gold-a-l1-e2",
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

            // multiple-choice · correctIndex=1  (variedad de correctIndex)
            {
              id: "gold-a-l1-e3",
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
          ],
        },
      ],
    },

    // ── gold-b · Tablas de verdad y clasificación ─────────────────────────────
    {
      id: "gold-b",
      title: "Tablas y clasificación",
      description: "Tablas de verdad, clasificación de fórmulas y traducción.",
      accent: "cyan",
      lessons: [
        {
          id: "gold-b-l1",
          title: "Fórmulas proposicionales",
          exercises: [
            // build-expression — bank > answer (distractores presentes)
            {
              id: "gold-b-l1-e1",
              type: "build-expression",
              prompt:
                "Traduce: «No llueve o hace frío».  (p: llueve, q: hace frío)",
              bank: ["p", "q", "¬", "∨", "∧", "⇒"],
              answer: ["¬", "p", "∨", "q"],
              explanation:
                "La negación afecta solo a p: ¬p ∨ q. El banco incluye ∧ y ⇒ como distractores.",
            },

            // truth-table — motor calcula la columna; solo formula requerida
            {
              id: "gold-b-l1-e2",
              type: "truth-table",
              prompt: "Completa la columna final de la tabla de verdad.",
              formula: "p ∧ q",
              explanation:
                "La conjunción solo es verdadera cuando p y q lo son.",
            },

            // classify — motor calcula tautología/contradicción/contingencia
            {
              id: "gold-b-l1-e3",
              type: "classify",
              prompt: "Clasificá la proposición: p ⇒ p",
              formula: "p ⇒ p",
              explanation:
                "Siempre verdadera sin importar el valor de p: es una tautología.",
            },
          ],
        },
      ],
    },

    // ── gold-c · Leyes lógicas y simplificación ───────────────────────────────
    {
      id: "gold-c",
      title: "Leyes lógicas",
      description: "Simplificación proposicional con leyes equivalentes.",
      accent: "violet",
      lessons: [
        {
          id: "gold-c-l1",
          title: "Simplificación paso a paso",
          exercises: [
            // simplify-steps — proposicional; el motor verifica equivalencia lógica
            {
              id: "gold-c-l1-e1",
              type: "simplify-steps",
              prompt: "Simplificá  ¬(p ∨ ¬q)  aplicando De Morgan e Involución.",
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
              explanation:
                "Primero De Morgan mete la negación: ¬p ∧ ¬¬q. Luego Involución en ¬¬q da ¬p ∧ q.",
            },
          ],
        },
      ],
    },

    // ── gold-d · Razonamiento formal ──────────────────────────────────────────
    {
      id: "gold-d",
      title: "Razonamiento",
      description: "Contraejemplos y deducciones formales.",
      accent: "indigo",
      lessons: [
        {
          id: "gold-d-l1",
          title: "Contraejemplo y deducción",
          exercises: [
            // counterexample — argumento INVÁLIDO; motor verifica que existe CE
            {
              id: "gold-d-l1-e1",
              type: "counterexample",
              prompt:
                "Este razonamiento (Falacia de afirmar el consecuente) es INVÁLIDO. Asigná valores para probarlo.\nPremisas: p ⇒ q ,  q     Conclusión: p",
              premises: ["p ⇒ q", "q"],
              conclusion: "p",
              variables: ["p", "q"],
              explanation:
                "Con p = F y q = V, el condicional p ⇒ q es V, la premisa q es V, pero la conclusión p es F: premisas verdaderas y conclusión falsa.",
            },

            // deduction-steps — derivación formal proposicional
            {
              id: "gold-d-l1-e2",
              type: "deduction-steps",
              prompt: "Justificá cada línea de la demostración para concluir ¬p.",
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
                "Encadenando los condicionales (SH): p ⇒ r. Luego con ¬r, Modus Tollens niega el antecedente: ¬p.",
            },
          ],
        },
      ],
    },
  ],
};
