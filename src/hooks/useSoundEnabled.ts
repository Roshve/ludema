"use client";

import { useCallback, useState } from "react";

// Misma clave que lee src/lib/sfx.ts en cada reproducción.
const STORAGE_KEY = "ludema-sound";

// Lectura perezosa: en el prerender estático no hay localStorage.
function readStoredEnabled(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(STORAGE_KEY) !== "off";
}

// Preferencia de sonido persistida en localStorage; activado por defecto.
export function useSoundEnabled() {
  const [enabled, setEnabledState] = useState(readStoredEnabled);

  const setEnabled = useCallback((value: boolean) => {
    setEnabledState(value);
    localStorage.setItem(STORAGE_KEY, value ? "on" : "off");
  }, []);

  return { enabled, setEnabled };
}
