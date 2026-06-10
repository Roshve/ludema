"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { prefersReducedMotion } from "@/components/ui/Lottie";
import { cn } from "@/lib/utils";

// Dos variantes por capa con idéntica estructura de comandos para que el
// morphing del atributo `d` interpole. Los fills usan la paleta de Tailwind,
// así el tema arcade re-skinea la llama vía variables --color-*.
const BODY = [
  "M12 22 C7.5 22 4.5 18.8 4.5 15 C4.5 11.8 6.2 9.6 7.8 7.4 C8.3 9.4 9.6 10.4 10.6 10.4 C9.8 7.4 10.6 4 12 2 C12.6 4.8 14.2 6.9 16.1 9.2 C17.8 11.3 19.5 13 19.5 15.6 C19.5 19 16.5 22 12 22 Z",
  "M12 22 C7.5 22 4.8 18.6 4.8 15.2 C4.8 11.6 6.8 9.2 8.2 7 C8.6 9.2 9.8 10.6 10.8 10.6 C10 7.2 11 3.6 12 2.2 C12.8 4.6 14.6 7.2 16.4 9.6 C18 11.7 19.2 13.4 19.2 15.8 C19.2 19.2 16.5 22 12 22 Z",
];
const CORE = [
  "M12 22 C9.6 22 8 20.4 8 18.4 C8 16.6 9 15.4 9.9 14.2 C10.3 15.4 11 16 11.7 16 C11.4 14.6 11.8 13 12.7 12 C13.2 13.6 14.2 14.6 14.9 15.7 C15.5 16.6 16 17.4 16 18.4 C16 20.4 14.4 22 12 22 Z",
  "M12 22 C9.6 22 8.2 20.2 8.2 18.2 C8.2 16.4 9.4 15 10.2 13.8 C10.6 15.2 11.2 15.8 11.9 15.8 C11.6 14.2 12.2 12.6 13 11.6 C13.4 13.4 14.4 14.4 15.1 15.5 C15.7 16.4 15.8 17.2 15.8 18.2 C15.8 20.2 14.4 22 12 22 Z",
];

// Llama de racha: encendida hace morphing continuo; apagada queda estática
// y atenuada. El morphing de `d` no es transform, así que el guard de
// reduced motion va a mano.
export function FlameIcon({
  lit,
  className,
}: {
  lit: boolean;
  className?: string;
}) {
  const [reduced] = useState(prefersReducedMotion);
  const animated = lit && !reduced;

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn(className, !lit && "opacity-50")}
    >
      {animated ? (
        <>
          <motion.path
            className="fill-orange-400"
            initial={{ d: BODY[0] }}
            animate={{ d: [BODY[0], BODY[1], BODY[0]] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          />
          <motion.path
            className="fill-amber-300"
            initial={{ d: CORE[0] }}
            animate={{ d: [CORE[0], CORE[1], CORE[0]] }}
            transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
          />
        </>
      ) : (
        <>
          <path className="fill-orange-400" d={BODY[0]} />
          <path className="fill-amber-300" d={CORE[0]} />
        </>
      )}
    </svg>
  );
}
