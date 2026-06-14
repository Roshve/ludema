---
id: intro
title: Introducción al proyecto
sidebar_label: Introducción
slug: /proyecto/intro
---

# Ludema — documentación del proyecto

**Ludema** es una plataforma estilo Duolingo para gamificar **cualquier materia universitaria** —
corazones, XP, rachas diarias y validación automática de respuestas. Sin backend, sin cuentas:
todo el progreso vive en `localStorage`.

La primera materia disponible es **Lógica** (lógica proposicional, tablas de verdad, leyes
lógicas, cuantificadores e inferencia). La arquitectura está diseñada para incorporar nuevas
materias sin tocar los componentes del reproductor de lecciones.

- Demo: [roshve.github.io/ludema](https://roshve.github.io/ludema)
- Exportación estática (`next export`) desplegada en GitHub Pages.

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (static export) |
| UI | React 19, Tailwind v4 |
| Estado | Zustand 5 (persistido en localStorage) |
| Íconos | lucide-react |
| Animaciones | motion/react |
| Deploy | GitHub Pages (GitHub Actions) |

## Comandos básicos

```bash
pnpm install
pnpm dev         # servidor de desarrollo en http://localhost:3000
pnpm build       # type-check + exportación estática a out/
pnpm lint        # eslint
```

**Requisito:** Node.js 22+ (ver `.nvmrc`) y pnpm (`npm i -g pnpm` o Corepack).

> El único gate que debe pasar antes de abrir un PR es `pnpm build`.
> No hay test runner configurado.

## Navegación de esta documentación

- **Arquitectura** — cómo está organizado el código: contenido, motor de validación, renderers.
- **Contribuir** — setup, convenciones de commits, flujo de trabajo y cómo agregar ejercicios.
- **Materias** — guías de estudio por materia; hoy disponible: Lógica.
