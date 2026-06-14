---
id: modelo-de-contenido
title: Modelo de contenido
---

# Modelo de contenido

Jerarquía: **Unidad → Sección → Lección → Ejercicios**.

:::note Modelo multi-materia
Esta jerarquía es agnóstica al dominio y está diseñada para escalar a cualquier materia.
Hoy el currículo de **Lógica** vive en `unit1.ts` y `unit2.ts`.
Cada materia nueva añade sus propios archivos `unitN.ts` y, si lo necesita,
un módulo de validación en `src/lib/`.
:::

Los tipos están definidos en `src/content/types.ts` como una **unión discriminada**.
`src/content/unit1.ts` (y `unit2.ts`) contienen el currículo de **Lógica** (materia actual).
`src/content/index.ts` ensambla las unidades, aplana las lecciones en lista ordenada
y expone `getLesson`, `getLessonContext` (prev/next) y `allLessonIds`.

## Para agregar lecciones o ejercicios

Editá `src/content/unit1.ts` (o creá un `unitN.ts` y registralo en `index.ts`).
**No se necesitan cambios de código** para los tipos de ejercicio existentes.

## Los 9 tipos de ejercicio

| `type` | Validación | Descripción |
|--------|-----------|-------------|
| `concept` | — | Tarjeta de teoría (sin riesgo, solo «Continuar») |
| `tap-proposition` | Autorada | Marcar qué frases son proposiciones lógicas |
| `multiple-choice` | Autorada | Opción única |
| `build-expression` | Autorada | Armar expresión simbólica con bloques |
| `truth-table` | Motor | Completar columna de tabla de verdad |
| `classify` | Motor | Tautología / contradicción / contingencia |
| `simplify-steps` | Autorada | Elegir ley aplicada en cada paso de simplificación |
| `counterexample` | Motor | Asignar valores que hacen V las premisas y F la conclusión |
| `deduction-steps` | Autorada | Elegir regla de inferencia que justifica cada línea |

**Motor** = validado automáticamente por `src/lib/logic/`.  
**Autorada** = la respuesta correcta se define a mano en el contenido.

## Identificadores

- Lección: `u<unidad>-<sección>-l<número>` (ej. `u1-a-l1`)
- Ejercicio: `u<unidad>-<sección>-<tipo>-<número>` (ej. `u1-a-mc-01`)

**Son permanentes**: cambiarlos borra el progreso de usuarios que ya completaron esa lección.

## Guía de sección

El campo `guide?: SectionGuide` en `Section` permite una mini-guía teórica
(niveles con emoji + título + entradas con término/símbolo/texto) que se muestra
como "guidebook" al abrir la sección en el mapa.
