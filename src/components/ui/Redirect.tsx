"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Componente client-only que redirige a `to` usando replace (no agrega al historial). */
export function Redirect({ to }: { to: string }) {
  const router = useRouter();
  useEffect(() => {
    router.replace(to);
  }, [router, to]);
  return null;
}
