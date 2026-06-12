"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

type Side = "top" | "bottom" | "left" | "right";

const GAP = 6;

function place(r: DOMRect, side: Side): CSSProperties {
  switch (side) {
    case "top":
      return {
        top: r.top - GAP,
        left: r.left + r.width / 2,
        transform: "translate(-50%, -100%)",
      };
    case "bottom":
      return {
        top: r.bottom + GAP,
        left: r.left + r.width / 2,
        transform: "translate(-50%, 0)",
      };
    case "left":
      return {
        top: r.top + r.height / 2,
        left: r.left - GAP,
        transform: "translate(-100%, -50%)",
      };
    case "right":
      return {
        top: r.top + r.height / 2,
        left: r.right + GAP,
        transform: "translate(0, -50%)",
      };
  }
}

/**
 * Muestra un tooltip junto al elemento hijo al hacer hover.
 * Se renderiza en un portal sobre <body> con `position: fixed`, así no lo
 * recortan contenedores con `overflow` ni queda por debajo de modales.
 * Solo responde a punteros finos (ratón/trackpad); los eventos táctiles se
 * ignoran. Se oculta al iniciar un click/arrastre sobre el trigger.
 */
export function Tooltip({
  label,
  side = "top",
  className,
  children,
}: {
  label: string;
  side?: Side;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [style, setStyle] = useState<CSSProperties | null>(null);

  return (
    <span
      ref={ref}
      className={cn("inline-flex", className)}
      onPointerEnter={(e) => {
        if (e.pointerType === "touch") return;
        const r = ref.current?.getBoundingClientRect();
        if (r) setStyle(place(r, side));
      }}
      onPointerLeave={() => setStyle(null)}
      onPointerDown={() => setStyle(null)}
    >
      {children}
      {style &&
        createPortal(
          <span
            role="tooltip"
            style={style}
            className="pointer-events-none fixed z-60 whitespace-nowrap rounded-lg bg-slate-800 px-2 py-1 text-xs font-bold text-white transition-opacity starting:opacity-0 dark:bg-slate-700"
          >
            {label}
          </span>,
          document.body,
        )}
    </span>
  );
}
