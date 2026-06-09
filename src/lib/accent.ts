import type { Section } from "@/content/types";

export type Accent = Section["accent"];

// Clases de Tailwind por acento de sección.
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
  green: {
    bg: "bg-emerald-500",
    bgSoft: "bg-emerald-50",
    text: "text-emerald-600",
    ring: "ring-emerald-600",
    border: "border-emerald-600",
    node: "bg-emerald-500 border-emerald-700",
  },
  purple: {
    bg: "bg-violet-500",
    bgSoft: "bg-violet-50",
    text: "text-violet-600",
    ring: "ring-violet-600",
    border: "border-violet-600",
    node: "bg-violet-500 border-violet-700",
  },
  amber: {
    bg: "bg-amber-500",
    bgSoft: "bg-amber-50",
    text: "text-amber-600",
    ring: "ring-amber-600",
    border: "border-amber-600",
    node: "bg-amber-500 border-amber-700",
  },
  sky: {
    bg: "bg-sky-500",
    bgSoft: "bg-sky-50",
    text: "text-sky-600",
    ring: "ring-sky-600",
    border: "border-sky-600",
    node: "bg-sky-500 border-sky-700",
  },
  rose: {
    bg: "bg-rose-500",
    bgSoft: "bg-rose-50",
    text: "text-rose-600",
    ring: "ring-rose-600",
    border: "border-rose-600",
    node: "bg-rose-500 border-rose-700",
  },
};
