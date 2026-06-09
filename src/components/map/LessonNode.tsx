"use client";

import Link from "next/link";
import { Check, Lock, Star, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCENT, type Accent } from "@/lib/accent";

export type NodeState = "locked" | "current" | "completed";

export function LessonNode({
  lessonId,
  title,
  subtitle,
  state,
  accent,
  offset,
}: {
  lessonId: string;
  title: string;
  subtitle?: string;
  state: NodeState;
  accent: Accent;
  /** Desplazamiento horizontal para el sendero en zigzag. */
  offset: number;
}) {
  const a = ACCENT[accent];
  const locked = state === "locked";

  const circle = (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={cn(
          "grid size-18 place-items-center rounded-full border-b-4 text-white transition active:translate-y-0.5",
          locked
            ? "border-slate-300 bg-slate-200 text-slate-400"
            : a.node,
          state === "current" && "ring-4 ring-offset-2 " + a.ring,
        )}
      >
        {state === "completed" ? (
          <Check className="size-8" strokeWidth={3.5} />
        ) : locked ? (
          <Lock className="size-7" strokeWidth={3} />
        ) : (
          <Play className="size-8 fill-white" strokeWidth={0} />
        )}
      </div>
      <div className="max-w-32 text-center">
        <p
          className={cn(
            "text-xs font-extrabold leading-tight",
            locked ? "text-slate-400" : "text-slate-700",
          )}
        >
          {title}
        </p>
        {subtitle && (
          <p className="text-[10px] font-bold text-slate-400">{subtitle}</p>
        )}
      </div>
    </div>
  );

  return (
    <div
      className="flex justify-center"
      style={{ transform: `translateX(${offset}px)` }}
    >
      {locked ? (
        <div aria-disabled className="cursor-not-allowed opacity-90">
          {circle}
        </div>
      ) : (
        <Link
          href={`/lesson/${lessonId}`}
          className="group outline-none"
          aria-label={`${title} (${state === "completed" ? "completada" : "disponible"})`}
        >
          {circle}
        </Link>
      )}
    </div>
  );
}

export function GoldBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-extrabold text-amber-600">
      <Star className="size-3.5 fill-amber-400 text-amber-400" /> Dorada
    </span>
  );
}
