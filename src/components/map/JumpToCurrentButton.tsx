"use client";

import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ACCENT, type Accent } from "@/lib/accent";

/**
 * Botón flotante que aparece cuando la lección actual queda fuera de pantalla
 * y, al tocarlo, hace scroll suave para traerla al centro de la vista.
 * La flecha indica la dirección (↑ arriba, ↓ abajo).
 */
export function JumpToCurrentButton({
  lessonId,
  accent,
}: {
  lessonId: string;
  accent: Accent;
}) {
  const [offscreen, setOffscreen] = useState(false);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const a = ACCENT[accent];

  useEffect(() => {
    const el = document.getElementById(`lesson-node-${lessonId}`);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOffscreen(false);
        } else {
          const rect = el.getBoundingClientRect();
          setDirection(rect.top < 0 ? "up" : "down");
          setOffscreen(true);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [lessonId]);

  function handleClick() {
    const el = document.getElementById(`lesson-node-${lessonId}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <AnimatePresence>
      {offscreen && (
        <motion.button
          key="jump-to-current"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.75 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          onClick={handleClick}
          aria-label="Volver a tu lección actual"
          className={cn(
            "fixed bottom-24 right-6 z-30 rounded-full border-b-4 p-4 text-white shadow-pop transition active:translate-y-0.5 active:border-b-2",
            a.bg,
            a.border,
          )}
        >
          {direction === "up" ? (
            <ArrowUp className="size-6" strokeWidth={2.5} />
          ) : (
            <ArrowDown className="size-6" strokeWidth={2.5} />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
