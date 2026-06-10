"use client";

import { useEffect } from "react";
import { sfxClick } from "@/lib/sfx";

// Listener delegado global: un tick sutil en cualquier botón o enlace,
// sin tener que tocar cada renderer de ejercicio.
export function UiSounds() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      if (target?.closest("button, a")) sfxClick();
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
