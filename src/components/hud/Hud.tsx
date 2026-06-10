"use client";

import { useEffect } from "react";
import { Heart, Flame, Star } from "lucide-react";
import {
  useProgress,
  levelFromXp,
  xpIntoLevel,
  XP_LEVEL_SIZE,
  MAX_HEARTS,
} from "@/stores/progress";
import { useHydrated } from "@/hooks/useHydrated";
import { cn } from "@/lib/utils";
import { ThemeMenu } from "./ThemeMenu";

function Pill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 font-extrabold text-sm shadow-pop-sm dark:bg-slate-800",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Hud() {
  const hydrated = useHydrated();
  const hearts = useProgress((s) => s.hearts);
  const xp = useProgress((s) => s.xp);
  const streak = useProgress((s) => s.streak);
  const syncHearts = useProgress((s) => s.syncHearts);

  // Regenera corazones al montar y cada 30 s.
  useEffect(() => {
    syncHearts();
    const id = setInterval(syncHearts, 30_000);
    return () => clearInterval(id);
  }, [syncHearts]);

  const level = hydrated ? levelFromXp(xp) : 1;
  const into = hydrated ? xpIntoLevel(xp) : 0;

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Pill className="text-rose-500">
        <Heart className="size-4 fill-rose-500" />
        <span>{hydrated ? hearts : MAX_HEARTS}</span>
      </Pill>
      <Pill className="text-orange-500">
        <Flame className="size-4 fill-orange-400" />
        <span>{hydrated ? streak : 0}</span>
      </Pill>
      <Pill className="text-amber-500">
        <Star className="size-4 fill-amber-400" />
        <span>Nv. {level}</span>
        <span className="hidden text-xs font-bold text-slate-400 sm:inline">
          {into}/{XP_LEVEL_SIZE}
        </span>
      </Pill>
      <ThemeMenu />
    </div>
  );
}
