---
id: arquitectura
title: Arquitectura general
---

# Arquitectura general

La app es **data-driven**: el currículo en `src/content/` es la fuente de verdad, un
motor de validación puro corrige las respuestas, y renderers autocontenidos presentan cada
tipo de ejercicio. Entender esas tres costuras es suficiente para ser productivo.

:::note Arquitectura multi-materia
La jerarquía Unidad → Sección → Lección → Ejercicio es agnóstica al dominio.
Hoy la única materia implementada es **Lógica** (`src/lib/logic/` como motor de validación).
Nuevas materias se agregan añadiendo su currículo en `src/content/` y, si lo necesitan,
su propio módulo de validación en `src/lib/`.
:::

## Tres capas

```
src/content/          ← qué se enseña (datos, por materia)
src/lib/logic/        ← motor de validación para la materia Lógica
src/components/lesson/ ← cómo se muestra (UI + feedback, genérico)
```

## Routing

| Ruta | Tipo | Descripción |
|------|------|-------------|
| `/` | Client | `LearningMap` — mapa visual del currículo |
| `/lesson/[lessonId]` | Server | `generateStaticParams` + `await params`, renderiza `LessonPlayer` |
| `/practice` | Client | sesión de práctica con ejercicios fallados |

> **Next.js 16:** `params` es una `Promise`. Las rutas dinámicas necesitan
> `generateStaticParams`. No marques el archivo de página del servidor con
> `"use client"`.

## Estilo

Tailwind v4 (`@import "tailwindcss"` en `globals.css`, sin config file).
Sin shadcn — primitivos UI son hand-rolled (`components/ui/Button.tsx`).
Íconos: `lucide-react`. Fuente: Nunito.

Utilidades clave:
- `.shadow-pop` / `.shadow-pop-sm` — efecto 3D estilo Duolingo.
- `animate-pop-in` / `animate-shake` — feedback de respuesta.
- Colores de acento por sección centralizados en `src/lib/accent.ts`.

## Deploy

La app se exporta estáticamente a `out/`. El workflow `.github/workflows/deploy.yml`
sube `out/` como artifact de GitHub Pages. Los docs de Docusaurus se buildean en
`website/build/` y se copian a `out/docs/` antes de subir el artifact.

```
out/
  index.html              → roshve.github.io/ludema/
  lesson/[id]/index.html  → roshve.github.io/ludema/lesson/...
  docs/                   → roshve.github.io/ludema/docs/
```
