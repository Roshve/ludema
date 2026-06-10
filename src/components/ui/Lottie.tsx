"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// lottie-web pesa ~250KB: cargarlo solo en cliente y solo donde se usa.
const LottiePlayer = dynamic(() => import("lottie-react"), { ssr: false });

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Reproduce un JSON de Lottie embebido; con reduced motion queda congelado.
// El player solo se carga en cliente (ssr:false), así que leer la media query
// en el inicializador no causa desajuste de hidratación.
export function Lottie({
  animationData,
  className,
  loop = true,
}: {
  animationData: object;
  className?: string;
  loop?: boolean;
}) {
  const [reduced] = useState(prefersReducedMotion);

  return (
    <LottiePlayer
      animationData={animationData}
      loop={loop}
      autoplay={!reduced}
      className={className}
    />
  );
}
