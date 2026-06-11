# Walkthrough: Rediseño Unidad 1 + Cheat Sheet

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
