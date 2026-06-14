# Ludema

**Ludema** es una app estilo Duolingo para aprender **lógica universitaria** — tablas de verdad, leyes lógicas, cuantificadores, inferencia — de forma gamificada. Sin backend, sin cuentas: todo el progreso vive en `localStorage`.

🔗 **Demo:** [roshve.github.io/ludema](https://roshve.github.io/ludema)

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (static export) |
| UI | React 19, Tailwind v4 |
| Estado | Zustand 5 (persistido en localStorage) |
| Íconos | lucide-react |
| Animaciones | motion/react |
| Deploy | GitHub Pages (GitHub Actions) |

---

## Quickstart

**Requisito:** Node.js 22+ (ver [`.nvmrc`](.nvmrc)) y pnpm (`npm i -g pnpm` o Corepack).

```bash
# Si usás nvm
nvm use

# Instalar dependencias
pnpm install

# Servidor de desarrollo en http://localhost:3000
pnpm dev
```

### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Servidor de desarrollo (Turbopack) |
| `pnpm build` | ✅ **El gate del proyecto** — type-check + static export a `out/` |
| `pnpm lint` | ESLint (hay 3 errores preexistentes conocidos; no es el gate) |

---

## Arquitectura (resumen)

El proyecto es **data-driven** y tiene tres seams principales:

1. **Contenido** (`src/content/`) — jerarquía Unidad → Sección → Lección → Ejercicio. Para agregar lecciones solo se edita `unit1.ts` (o un nuevo `unitN.ts`), sin tocar componentes.
2. **Motor de lógica** (`src/lib/logic/`) — parser + evaluador puro para fórmulas proposicionales. Alimenta la validación automática de ejercicios.
3. **Renderers** (`src/components/lesson/`) — cada tipo de ejercicio tiene su propio componente; `LessonPlayer.tsx` orquesta el flujo corazones/XP/completado.

📖 La documentación de arquitectura completa está en [`CLAUDE.md`](CLAUDE.md) y [`AGENTS.md`](AGENTS.md).

---

## Contribuir

¡Las contribuciones son bienvenidas! Leé [`CONTRIBUTING.md`](CONTRIBUTING.md) para el flujo de trabajo, la convención de commits y cómo agregar contenido nuevo.

---

## Licencia

[MIT](LICENSE) © 2026 Roshve
