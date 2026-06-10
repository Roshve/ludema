"use client";

import { useCallback, useEffect, useState } from "react";

export type ThemePref = "light" | "dark" | "system" | "arcade";

// Misma clave que lee el script inline de layout.tsx antes del primer paint.
const STORAGE_KEY = "ludema-theme";

function isThemePref(value: string | null): value is ThemePref {
  return (
    value === "light" ||
    value === "dark" ||
    value === "system" ||
    value === "arcade"
  );
}

// Arcade se monta sobre dark: aplican las variantes dark: y encima
// .theme-arcade re-skinea la paleta vía variables CSS.
function applyTheme(pref: ThemePref) {
  const dark =
    pref === "dark" ||
    pref === "arcade" ||
    (pref === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.classList.toggle("theme-arcade", pref === "arcade");
}

// Lectura perezosa: en el prerender estático no hay localStorage.
function readStoredTheme(): ThemePref {
  if (typeof window === "undefined") return "system";
  const stored = localStorage.getItem(STORAGE_KEY);
  return isThemePref(stored) ? stored : "system";
}

// Preferencia de tema persistida en localStorage; "system" sigue al SO.
export function useTheme() {
  const [theme, setThemeState] = useState<ThemePref>(readStoredTheme);

  useEffect(() => {
    if (theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = useCallback((pref: ThemePref) => {
    setThemeState(pref);
    localStorage.setItem(STORAGE_KEY, pref);
    applyTheme(pref);
  }, []);

  return { theme, setTheme };
}
