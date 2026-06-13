"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { MotionConfig, motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACHIEVEMENTS } from "@/content/achievements";
import { useProgress } from "@/stores/progress";
import { ACCENT } from "@/lib/accent";
import { fireConfetti } from "@/lib/confetti";
import { sfxComplete } from "@/lib/sfx";
import { useHydrated } from "@/hooks/useHydrated";

const AUTO_DISMISS_MS = 4_000;

/**
 * Toast flotante que aparece al desbloquear un logro.
 * Se monta en layout.tsx para estar disponible en toda la app.
 * Muestra los logros de a uno (cabeza de la cola pendingAchievements).
 */
export function AchievementToast() {
  const hydrated = useHydrated();
  const pending = useProgress((s) => s.pendingAchievements);
  const dismiss = useProgress((s) => s.dismissPendingAchievement);

  const currentId = pending[0] ?? null;
  const achievement = currentId
    ? (ACHIEVEMENTS.find((a) => a.id === currentId) ?? null)
    : null;

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!achievement) return;

    // Celebración al aparecer.
    fireConfetti();
    sfxComplete();

    timerRef.current = setTimeout(() => {
      dismiss(achievement.id);
    }, AUTO_DISMISS_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [achievement?.id]);

  if (!hydrated) return null;

  const a = achievement ? ACCENT[achievement.accent] : null;
  const Icon = achievement?.icon ?? null;

  return createPortal(
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {achievement && a && Icon && (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 40, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.88 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            role="status"
            aria-live="polite"
            onClick={() => dismiss(achievement.id)}
            className={cn(
              "fixed bottom-8 left-1/2 z-[60] w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2 cursor-pointer",
              "flex items-center gap-3 rounded-2xl border-b-4 px-4 py-4 text-white shadow-pop",
              a.bg,
              a.border,
            )}
          >
            {/* Icono */}
            <div className="grid size-11 shrink-0 place-items-center rounded-full bg-white/20">
              <Icon className="size-5" strokeWidth={2.5} />
            </div>

            {/* Texto */}
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-white/70">
                ¡Logro desbloqueado!
              </p>
              <p className="truncate font-black leading-tight">{achievement.name}</p>
            </div>

            {/* Botón cerrar */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                dismiss(achievement.id);
              }}
              aria-label="Cerrar notificación de logro"
              className="shrink-0 rounded-full bg-white/20 p-1.5 hover:bg-white/30"
            >
              <X className="size-3.5" strokeWidth={2.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>,
    document.body,
  );
}
