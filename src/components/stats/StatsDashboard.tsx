"use client";

import Link from "next/link";
import { ArrowLeft, Flame, Star, BookOpen, Clock, CalendarDays, Timer, Zap } from "lucide-react";
import { motion } from "motion/react";
import {
  useProgress,
  levelFromXp,
  xpIntoLevel,
  XP_LEVEL_SIZE,
  lessonsCompletedCount,
  formatStudyTime,
} from "@/stores/progress";
import { useHydrated } from "@/hooks/useHydrated";
import { cn } from "@/lib/utils";

// Devuelve los últimos N días (inclusive hoy) como strings "YYYY-MM-DD" UTC.
function lastNDays(n: number): string[] {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

// Etiqueta corta del día ("lun", "mar", …).
function shortDay(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00Z`);
  return d.toLocaleDateString("es", { weekday: "short", timeZone: "UTC" });
}

function StatCard({
  icon,
  label,
  value,
  colorClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  colorClass: string;
}) {
  return (
    <motion.div
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-pop-sm dark:bg-slate-800"
    >
      <span className={cn("grid size-10 shrink-0 place-items-center rounded-full text-white", colorClass)}>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">
          {label}
        </p>
        <p className="truncate text-xl font-black text-slate-800 dark:text-slate-100">
          {value}
        </p>
      </div>
    </motion.div>
  );
}

export function StatsDashboard() {
  const hydrated = useHydrated();

  const streak = useProgress((s) => s.streak);
  const xp = useProgress((s) => s.xp);
  const completedLessons = useProgress((s) => s.completedLessons);
  const totalStudySeconds = useProgress((s) => s.totalStudySeconds);
  const dailyStudy = useProgress((s) => s.dailyStudy);
  const pomodorosCompleted = useProgress((s) => s.pomodorosCompleted);
  const totalFocusSeconds = useProgress((s) => s.totalFocusSeconds);

  const level = hydrated ? levelFromXp(xp) : 1;
  const into = hydrated ? xpIntoLevel(xp) : 0;
  const lessonsCount = hydrated ? lessonsCompletedCount(completedLessons) : 0;
  const totalTime = hydrated ? formatStudyTime(totalStudySeconds) : "< 1m";

  const days = lastNDays(7);
  const maxSeconds = hydrated
    ? Math.max(1, ...days.map((d) => dailyStudy[d] ?? 0))
    : 1;

  const todayStr = new Date().toISOString().slice(0, 10);
  const todaySeconds = hydrated ? (dailyStudy[todayStr] ?? 0) : 0;

  return (
    <div className="mx-auto min-h-dvh w-full max-w-lg px-4 py-8">
      {/* Cabecera */}
      <header className="mb-8 flex items-center gap-3">
        <Link
          href="/logica"
          aria-label="Volver al mapa"
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        >
          <ArrowLeft className="size-6" strokeWidth={2.5} />
        </Link>
        <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100">
          Mis estadísticas
        </h1>
      </header>

      {/* Tarjetas */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={<Flame className="size-5" />}
          label="Racha"
          value={hydrated ? `${streak} día${streak !== 1 ? "s" : ""}` : "0 días"}
          colorClass="bg-orange-500"
        />
        <StatCard
          icon={<Star className="size-5" />}
          label="Nivel"
          value={`Nv. ${level}`}
          colorClass="bg-amber-500"
        />
        <StatCard
          icon={<BookOpen className="size-5" />}
          label="Lecciones"
          value={String(lessonsCount)}
          colorClass="bg-blue-600"
        />
        <StatCard
          icon={<Clock className="size-5" />}
          label="Tiempo total"
          value={totalTime}
          colorClass="bg-violet-500"
        />
        <StatCard
          icon={<Timer className="size-5" />}
          label="Pomodoros"
          value={hydrated ? String(pomodorosCompleted) : "0"}
          colorClass="bg-rose-500"
        />
        <StatCard
          icon={<Zap className="size-5" />}
          label="Tiempo enfoque"
          value={hydrated ? formatStudyTime(totalFocusSeconds) : "< 1m"}
          colorClass="bg-cyan-500"
        />
      </div>

      {/* XP dentro del nivel */}
      <div className="mt-3 rounded-2xl bg-white px-5 py-4 shadow-pop-sm dark:bg-slate-800">
        <div className="mb-2 flex items-center justify-between text-sm font-bold text-slate-500 dark:text-slate-400">
          <span>XP del nivel {level}</span>
          <span>{into} / {XP_LEVEL_SIZE}</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <motion.div
            className="h-full rounded-full bg-amber-400"
            initial={false}
            animate={{ width: `${(into / XP_LEVEL_SIZE) * 100}%` }}
            transition={{ type: "spring", stiffness: 140, damping: 22 }}
          />
        </div>
      </div>

      {/* Tiempo hoy */}
      <div className="mt-3 rounded-2xl bg-white px-5 py-4 shadow-pop-sm dark:bg-slate-800">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">
          Estudiado hoy
        </p>
        <p className="mt-0.5 text-2xl font-black text-slate-800 dark:text-slate-100">
          {hydrated ? formatStudyTime(todaySeconds) : "< 1m"}
        </p>
      </div>

      {/* Mini-gráfico últimos 7 días */}
      <div className="mt-3 rounded-2xl bg-white px-5 py-5 shadow-pop-sm dark:bg-slate-800">
        <div className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400">
          <CalendarDays className="size-4" />
          <span>Últimos 7 días</span>
        </div>
        <div className="flex items-end justify-between gap-1.5">
          {days.map((day) => {
            const secs = hydrated ? (dailyStudy[day] ?? 0) : 0;
            const heightPct = (secs / maxSeconds) * 100;
            const isToday = day === todayStr;
            return (
              <div key={day} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="relative flex w-full justify-center" style={{ height: 56 }}>
                  <motion.div
                    className={cn(
                      "absolute bottom-0 w-full max-w-[28px] rounded-t-md",
                      secs > 0
                        ? isToday
                          ? "bg-blue-500"
                          : "bg-blue-300 dark:bg-blue-700"
                        : "bg-slate-200 dark:bg-slate-700",
                    )}
                    initial={false}
                    animate={{ height: `${Math.max(secs > 0 ? 10 : 4, heightPct)}%` }}
                    transition={{ type: "spring", stiffness: 200, damping: 26 }}
                  />
                </div>
                <span
                  className={cn(
                    "text-[10px] font-bold uppercase",
                    isToday
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-400 dark:text-slate-500",
                  )}
                >
                  {shortDay(day)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
