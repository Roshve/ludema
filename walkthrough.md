# Walkthrough: Rediseño Unidad 1 + Cheat Sheet

> Actualizado: ver la segunda iteración al final (brechas pedagógicas, deducción formal y modo Práctica).

## Qué se hizo

### 1. Currículum — `src/content/unit1.ts`

**Guías teóricas ampliadas** (campo `guide` de cada sección):
- **Sección A:** Distinción condición suficiente/necesaria con ejemplos cotidianos (Arriola).
- **Sección C:** Tabla completa de equivalencias lógicas (Peralta Tabla III): Involución, Idempotencia, Conmutativa, Asociativa, Distributiva, De Morgan, Absorción, Identidad, Dominación, Complementación, Condicional y Bicondicional.
- **Sección E:** Definición formal de validez por implicación lógica y las 4 reglas de inferencia principales con formato premisas/conclusión (Grassman).

**Sección C reestructurada en 4 lecciones progresivas:**
1. De Morgan e Involución
2. Condicional y Absorción
3. Distributividad e Identidad
4. Simplificación paso a paso (ejercicios complejos de la guía)

**Sección E reestructurada en 3 lecciones progresivas:**
1. Reglas elementales (MP, MT, SD, SH — identificación)
2. Contraejemplos básicos (razonamientos inválidos, 2–3 variables)
3. Razonamientos de examen (traducción + validez, 4–5 variables)

**Nueva Sección F · Práctica de Examen (UTN.BA):**
- Simulacro 1: ejercicio de simplificación formal de parcial, razonamiento en lenguaje natural y cuantificadores.
- Simulacro 2: argumentos de lenguaje natural (botón/app, Alan y el chocolate) y deducción con hipótesis existenciales/universales.
- Basados en `docs/ejercicio_parcial_01.md` (parciales reales UTN.BA 2023–2025).

### 2. Cheat Sheet — `src/content/cheatsheet.ts` + `src/components/lesson/CheatSheet.tsx`

Botón de libro (`BookOpenText`) añadido en la cabecera del reproductor de lecciones, entre la barra de progreso y los corazones. Al pulsarlo abre un modal con dos pestañas:

- **Equivalencias:** 13 leyes lógicas con fórmula y ejemplo (nomenclatura Peralta, coincide exactamente con las opciones de `simplify-steps`).
- **Inferencia:** 7 reglas de Grassman en formato premisas + `∴ conclusión`.

Cierre con clic fuera del panel, botón X o tecla `Escape`. No pausa el timer de los ejercicios cronometrados.

### 3. Integración — `src/components/lesson/LessonPlayer.tsx`

Importación y renderizado de `<CheatSheet />` en el header del player. Disponible en todas las lecciones.

## Verificación

```bash
npm run build   # compiló sin errores — 34 páginas estáticas
```

Flujo manual a comprobar:
1. `/logica` → mapa muestra la Sección F con sus dos lecciones.
2. Entrar a cualquier lección de Sección C/E → aparece el icono de libro en la cabecera.
3. Pulsar el botón → modal abre con animación, pestaña "Equivalencias" activa por defecto.
4. Cambiar a "Inferencia" → se muestran las 7 reglas con formato correcto.
5. Cerrar con Escape / clic en overlay / botón X.
6. Verificar dark mode: sembrar `ludema-theme = "dark"` en localStorage y recargar.

---

# Iteración 2: Brechas pedagógicas (Peralta, Arriola, Grassman)

Análisis a fondo de los tres libros de cátedra contra el contenido existente. Tres bloques implementados.

## Bloque 1 — Contenido nuevo (`src/content/unit1.ts`)

**4 lecciones nuevas** (la Unidad 1 pasa de 23 a 27 lecciones):

- **A·5 "El lenguaje del condicional"**: «q si p», «p sólo si q», «a menos que» (≡ ∨) y o exclusivo ⊻ — el error de traducción #1 según Arriola (Ej. 11).
- **C·5 "Condicionales asociados y negación"**: recíproco/contrario/contrarrecíproco (Peralta §1), ¬(p ⇒ q) ≡ p ∧ ¬q, y negación de cuantificadas con ⇒ adentro (guía Ej. 11d).
- **D·5 "Álgebra de cuantificadores"**: qué se hereda de ∀x∃y verdadero (∃∃ sí, ∀∀ no, su negación es F) y las dos distribuciones inválidas con contraejemplos par/impar (guía Ej. 14-15).
- **E·5 "Deducción formal"** (ver Bloque 2). El antiguo "El gran desafío" pasa a ser E·6.

**Método del absurdo** (el aporte didáctico central de Arriola, Ej. 16/19): nivel nuevo en la guía de E + 3 ejercicios guiados (E·2-e6, E·3-e8/e9) que modelan «premisas V + conclusión F → contradicción = válido» y la comparación de métodos (2ⁿ filas).

**Guías ampliadas**: niveles nuevos en A (lenguaje del condicional) y C (condicionales asociados); entrada "Escalera de fuerza" (∃∀ ⇒ ∀∃ ⇒ ∃∃) en D.

## Bloque 2 — Nuevo tipo de ejercicio: deducción formal

Lo que pedían Grassman (cap. 1) y los finales de Arriola: **construir** demostraciones, no solo identificar reglas.

- `src/content/types.ts`: variante `deduction-steps` (premisas numeradas + pasos con `result`, `options`, `from`).
- `src/components/lesson/exercises/DeductionSteps.tsx`: renderer estilo Grassman — premisas numeradas en caja oscura, cada línea derivada con su número y referencia («de 1 y 2»), elección de la regla que la justifica.
- Lección **E·5**: 2 derivaciones proposicionales (SH+MT y el final Ej. 112 de Arriola), 1 estilo Sherlock Holmes (MT→MP→SD), 1 **categórica** (final Ej. 123: PE→Simplificación→EU→MP→GE) y un «complete la conclusión válida» (guía Ej. 21).
- **F·2-e6**: demostración formal del argumento del botón (Tema 15A de parcial).
- Cheat sheet ampliado: Negación del condicional, Dilema Constructivo y las 4 reglas de cuantificadores (EU, PE, GU, GE).

## Bloque 3 — Modo Práctica (testing effect)

- `src/stores/progress.ts`: `missedExercises` persistido — cada `Comprobar` registra el resultado (`recordExercise`); acertar un ejercicio antes fallado lo saca de la lista. `addPracticeXp` suma XP reducida (5 por acierto) y mantiene viva la racha.
- `src/lib/practice.ts`: `buildPracticeSession` arma una sesión de ~10 ejercicios de lecciones completadas, priorizando los fallados.
- `/practice` (`src/app/practice/page.tsx` + `components/practice/PracticeSession.tsx`): reutiliza `LessonPlayer` en modo `practice` (no marca lecciones, pantalla final con «Repetir práctica»). Estado vacío si aún no hay lecciones completas.
- Mapa: botón flotante verde (mancuerna) con badge del número de fallos pendientes, visible con ≥1 lección completa.

## Verificación (iteración 2)

- Script `npx tsx` contra el motor: 21 comprobaciones (equivalencias de A/C, validez de los argumentos del absurdo, y que **cada línea** de las 4 deducciones se siga de sus premisas) — todas en verde.
- `npm run build`: 39 páginas estáticas (27 lecciones + `/practice`).
- `npm run lint`: solo los 3 errores preexistentes (sin regresiones).
- Visual (playwright + Chrome): FAB con badge «3», 4 lecciones nuevas en el mapa, sesión de práctica jugable, ejercicio de deducción completado con feedback correcto, estado vacío de `/practice` sin progreso.

## Fuera de alcance (anotado para futuras unidades)

- Formas normales (FND/FNC), circuitos lógicos y dualidad → unidad de Álgebra de Boole.
- Diagramas de Venn interactivos para categóricos → requiere renderer gráfico.
- Lógica del límite ε-δ (Arriola Ej. 15) → integración con Análisis.

---

# Iteración 3: Onboarding de principiante — enseñar antes de evaluar

Diagnóstico (pedagogo + game designer): la app evaluaba antes de enseñar. La teoría vivía solo en la guía opcional y en explicaciones post-respuesta, el primer fallo costaba un corazón a los 30 segundos, las lecciones de 5 ítems daban ~1.7 exposiciones por concepto y los errores nunca se re-preguntaban en la sesión.

## Mecánica 1 — Tarjetas de concepto (`concept`)

Nuevo tipo de ítem **sin riesgo**: teoría breve dentro de la lección (título + párrafos + ejemplo destacado, estilo tarjeta ámbar con bombilla). No se comprueba: el pie muestra solo «Continuar» — sin corazones, sin precisión, sin XP.

- `src/content/types.ts`: `ConceptExercise` (`body: string[]`, `example?`).
- `src/components/lesson/exercises/ConceptCard.tsx` + case en `ExerciseView`.
- `LessonPlayer`: rama `isConcept` en el pie; precisión y XP calculadas sobre `gradedTotal` (solo ejercicios evaluables); `lessonXp` y el pool de `/practice` excluyen tarjetas.

## Mecánica 2 — Re-encolar errores

La lección pasa de índice fijo a **cola**: al fallar, el ejercicio se re-añade al final y vuelve a aparecer hasta acertarlo (los corazones siguen limitando los intentos). La pantalla final reporta precisión **al primer intento**. Es el ciclo de Duolingo: el error se corrige en la misma sesión, no queda pendiente.

## Contenido — toda la Unidad 1

**33 tarjetas de concepto** intercaladas siguiendo el patrón *concepto → ejercicios que lo drillan* en las 27 lecciones, más **12 ejercicios nuevos** que cubren los huecos de principiante detectados:

- **A** (la más reforzada, 25 → 44 ítems): qué es/no es proposición, simples-compuestas, **negación ≠ antónimo** («Juan no es alto» ≠ «Juan es bajo»), semántica intuitiva de ∧/∨ (la milanesa con papas), **alcance de la negación** (¬p ∨ q vs ¬(p ∨ q), con paréntesis en build-expression), ⇒/⇔, condicionales encubiertos, suficiente/necesaria. Se movió el ejercicio de condición necesaria de l2 a l5 (estaba antes de enseñarse).
- **B**: método 2ⁿ y la fila tramposa del condicional, definiciones T-C-C, trucos contrarreloj (X ∨ ¬X), método de valores ocultos + 3 ejercicios nuevos (p ⇔ q, (p∧q)⇒p, ¬(p∧¬p)).
- **C**: una tarjeta por grupo de leyes + estrategia de orden de simplificación + los tres asociados y la negación del condicional.
- **D**: predicados/cuantificar, particularizar y elegir universo, negación de cuantificadores, el orden importa, escalera de fuerza.
- **E**: qué es validez, las 4 reglas estrella, el contraejemplo, método del absurdo, traducción de categóricos (todos→⇒, algunos→∧), formato de demostración.
- **F**: estrategia de parcial (diccionario primero, elegir método) y checklist de verificación.

Total del currículo: **203 ítems** (33 tarjetas + 170 ejercicios evaluables).

## Verificación (iteración 3)

- Motor: p ⇔ q, (p ∧ q) ⇒ p y ¬(p ∧ ¬p) validados con `classify`/`truthColumn`.
- `npm run build` (39 páginas) y lint sin regresiones (3 errores preexistentes).
- Visual (playwright + Chrome): tarjeta con «Continuar» y sin «Comprobar»; lección u1-b-l2 jugada completa fallando e1 a propósito → el ejercicio **reaparece al final**, la lección completa al acertarlo y la precisión reporta 83% (5/6 al primer intento).
