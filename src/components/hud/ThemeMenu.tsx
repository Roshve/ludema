"use client";

import { useState } from "react";
import { Settings, Sun, Moon, Monitor, Gamepad2, Check } from "lucide-react";
import { useTheme, type ThemePref } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

const OPTIONS: { pref: ThemePref; label: string; Icon: typeof Sun }[] = [
  { pref: "light", label: "Claro", Icon: Sun },
  { pref: "dark", label: "Oscuro", Icon: Moon },
  { pref: "system", label: "Sistema", Icon: Monitor },
  { pref: "arcade", label: "Arcade", Icon: Gamepad2 },
];

export function ThemeMenu() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Configuración de tema"
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center rounded-full bg-white p-2 text-slate-500 shadow-pop-sm transition active:translate-y-0.5 dark:bg-slate-800 dark:text-slate-300"
      >
        <Settings className="size-4" />
      </button>

      {open && (
        <>
          {/* Overlay invisible para cerrar con clic fuera. */}
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-20 cursor-default"
          />
          <div
            role="menu"
            className="absolute right-0 top-full z-30 mt-2 w-44 animate-pop-in rounded-2xl border-2 border-slate-200 bg-white p-1.5 shadow-pop dark:border-slate-700 dark:bg-slate-800"
          >
            {OPTIONS.map(({ pref, label, Icon }) => {
              const active = theme === pref;
              return (
                <button
                  key={pref}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => {
                    setTheme(pref);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-extrabold transition",
                    active
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                      : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700",
                  )}
                >
                  <Icon className="size-4" />
                  <span className="flex-1 text-left">{label}</span>
                  {active && <Check className="size-4" strokeWidth={3} />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
