"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Heart, Star, BarChart3, Timer, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { FlameIcon } from "./FlameIcon";
import {
  useProgress,
  levelFromXp,
  xpIntoLevel,
  XP_LEVEL_SIZE,
  MAX_HEARTS,
} from "@/stores/progress";
import { useHydrated } from "@/hooks/useHydrated";
import { cn } from "@/lib/utils";
import { GitHubLink } from "@/components/ui/GitHubLink";
import { ThemeMenu } from "./ThemeMenu";

// Número que hace "pop" cuando cambia su valor.
function Counter({ value, prefix = "" }: { value: number; prefix?: string }) {
  return (
    <motion.span
      key={value}
      initial={{ scale: 1.5 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 18 }}
    >
      {prefix}
      {value}
    </motion.span>
  );
}

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
  const pendingCount = useProgress((s) => s.pendingAchievements.length);

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
        <Counter value={hydrated ? hearts : MAX_HEARTS} />
      </Pill>
      <Pill className="text-orange-500">
        <FlameIcon lit={hydrated && streak > 0} className="size-4" />
        <Counter value={hydrated ? streak : 0} />
      </Pill>
      <Pill className="text-amber-500">
        <Star className="size-4 fill-amber-400" />
        <Counter value={level} prefix="Nv. " />
        <span className="hidden text-xs font-bold text-slate-400 sm:inline">
          {into}/{XP_LEVEL_SIZE}
        </span>
      </Pill>
      <Link
        href="/pomodoro"
        aria-label="Temporizador Pomodoro"
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
      >
        <Timer className="size-5" />
      </Link>
      <Link
        href="/logros"
        aria-label="Ver logros"
        className="relative text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
      >
        <Trophy className="size-5" />
        {hydrated && pendingCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-amber-400" />
        )}
      </Link>
      <Link
        href="/estadisticas"
        aria-label="Ver estadísticas"
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
      >
        <BarChart3 className="size-5" />
      </Link>
      <GitHubLink />
      <ThemeMenu />
    </div>
  );
}
