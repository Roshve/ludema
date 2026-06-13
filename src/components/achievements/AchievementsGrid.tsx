"use client";

import Link from "next/link";
import { ArrowLeft, Lock, Trophy } from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ACHIEVEMENTS } from "@/content/achievements";
import {
  useProgress,
  buildAchievementStats,
} from "@/stores/progress";
import { useHydrated } from "@/hooks/useHydrated";
import { ACCENT } from "@/lib/accent";

const containerVariants = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export function AchievementsGrid() {
  const hydrated = useHydrated();

  const completedLessons = useProgress((s) => s.completedLessons);
  const streak = useProgress((s) => s.streak);
  const xp = useProgress((s) => s.xp);
  const pomodorosCompleted = useProgress((s) => s.pomodorosCompleted);
  const totalStudySeconds = useProgress((s) => s.totalStudySeconds);
  const unlockedAchievements = useProgress((s) => s.unlockedAchievements);

  const stats = hydrated
    ? buildAchievementStats({
        completedLessons,
        streak,
        xp,
        pomodorosCompleted,
        totalStudySeconds,
      })
    : null;

  const unlockedCount = hydrated ? Object.keys(unlockedAchievements).length : 0;
  const total = ACHIEVEMENTS.length;

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto min-h-dvh w-full max-w-2xl px-4 py-8">
        {/* Cabecera */}
        <header className="mb-8 flex items-center gap-3">
          <Link
            href="/logica"
            aria-label="Volver al mapa"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <ArrowLeft className="size-6" strokeWidth={2.5} />
          </Link>
          <div className="flex flex-1 items-center gap-2">
            <Trophy className="size-6 text-amber-500" strokeWidth={2.5} />
            <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100">
              Mis logros
            </h1>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-extrabold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {unlockedCount}&nbsp;/&nbsp;{total}
          </span>
        </header>

        {/* Grilla */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {ACHIEVEMENTS.map((achievement) => {
            const isUnlocked = hydrated
              ? Boolean(unlockedAchievements[achievement.id])
              : false;
            const a = ACCENT[achievement.accent];
            const prog =
              !isUnlocked && stats && achievement.progress
                ? achievement.progress(stats)
                : null;
            const Icon = achievement.icon;

            return (
              <motion.div
                key={achievement.id}
                variants={itemVariants}
                className={cn(
                  "flex items-start gap-3 rounded-2xl border-2 px-4 py-4 shadow-pop-sm transition",
                  isUnlocked
                    ? "border-transparent bg-white dark:bg-slate-800"
                    : "border-slate-200 bg-white/60 dark:border-slate-700 dark:bg-slate-800/60",
                )}
              >
                {/* Icono */}
                <div
                  className={cn(
                    "mt-0.5 grid size-11 shrink-0 place-items-center rounded-full",
                    isUnlocked
                      ? cn("text-white", a.bg, achievement.special && "shimmer-gold")
                      : "bg-slate-200 text-slate-400 dark:bg-slate-700",
                  )}
                >
                  {isUnlocked ? (
                    <Icon className="size-5" strokeWidth={2.5} />
                  ) : (
                    <Lock className="size-4" strokeWidth={2.5} />
                  )}
                </div>

                {/* Texto */}
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "font-black leading-tight",
                      isUnlocked
                        ? "text-slate-800 dark:text-slate-100"
                        : "text-slate-400 dark:text-slate-500",
                    )}
                  >
                    {achievement.name}
                  </p>
                  <p
                    className={cn(
                      "mt-0.5 text-xs leading-snug",
                      isUnlocked
                        ? "text-slate-500 dark:text-slate-400"
                        : "text-slate-400 dark:text-slate-600",
                    )}
                  >
                    {achievement.description}
                  </p>

                  {/* Barra de progreso (solo en bloqueados con progress) */}
                  {prog && (
                    <div className="mt-2">
                      <div className="mb-1 flex justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500">
                        <span>Progreso</span>
                        <span>
                          {prog.current}&nbsp;/&nbsp;{prog.target}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                        <div
                          className="h-full rounded-full bg-slate-400 transition-all dark:bg-slate-500"
                          style={{
                            width: `${Math.min(100, (prog.current / prog.target) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </MotionConfig>
  );
}
