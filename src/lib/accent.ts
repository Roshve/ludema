import type { Section } from "@/content/types";

export type Accent = Section["accent"];

// Clases de Tailwind por acento de sección. Paleta de marca: familia fría
// azul (#2563EB) · cian (#06B6D4) · violeta (#7C3AED) + índigo y fucsia.
export const ACCENT: Record<
  Accent,
  {
    bg: string;
    bgSoft: string;
    text: string;
    ring: string;
    border: string;
    node: string;
  }
> = {
  blue: {
    bg: "bg-blue-600",
    bgSoft: "bg-blue-50 dark:bg-blue-950/40",
    text: "text-blue-600 dark:text-blue-400",
    ring: "ring-blue-600",
    border: "border-blue-700",
    node: "bg-blue-600 border-blue-800",
  },
  cyan: {
    bg: "bg-cyan-500",
    bgSoft: "bg-cyan-50 dark:bg-cyan-950/40",
    text: "text-cyan-600 dark:text-cyan-400",
    ring: "ring-cyan-600",
    border: "border-cyan-600",
    node: "bg-cyan-500 border-cyan-700",
  },
  violet: {
    bg: "bg-violet-500",
    bgSoft: "bg-violet-50 dark:bg-violet-950/40",
    text: "text-violet-600 dark:text-violet-400",
    ring: "ring-violet-600",
    border: "border-violet-600",
    node: "bg-violet-500 border-violet-700",
  },
  indigo: {
    bg: "bg-indigo-500",
    bgSoft: "bg-indigo-50 dark:bg-indigo-950/40",
    text: "text-indigo-600 dark:text-indigo-400",
    ring: "ring-indigo-600",
    border: "border-indigo-600",
    node: "bg-indigo-500 border-indigo-700",
  },
  fuchsia: {
    bg: "bg-fuchsia-500",
    bgSoft: "bg-fuchsia-50 dark:bg-fuchsia-950/40",
    text: "text-fuchsia-600 dark:text-fuchsia-400",
    ring: "ring-fuchsia-600",
    border: "border-fuchsia-600",
    node: "bg-fuchsia-500 border-fuchsia-700",
  },
};
