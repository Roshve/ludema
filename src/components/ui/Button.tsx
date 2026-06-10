"use client";

import { cn } from "@/lib/utils";

type Variant = "primary" | "danger" | "ghost" | "neutral";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-blue-600 border-blue-800 text-white hover:brightness-105 disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-400 dark:disabled:bg-slate-800 dark:disabled:border-slate-700 dark:disabled:text-slate-500",
  danger: "bg-rose-500 border-rose-700 text-white hover:brightness-105",
  neutral:
    "bg-white border-slate-300 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700",
  ghost:
    "bg-transparent border-transparent text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700",
};

export function Button({
  variant = "primary",
  className,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "rounded-2xl border-b-4 px-6 py-3 font-extrabold uppercase tracking-wide transition active:translate-y-0.5 active:border-b-2 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:border-b-4",
        VARIANTS[variant],
        className,
      )}
      {...props}
    />
  );
}
