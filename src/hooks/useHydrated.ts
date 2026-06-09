"use client";

import { useEffect, useState } from "react";

// Devuelve true una vez que el componente se montó en el cliente.
// Útil para evitar desajustes de hidratación con estado persistido (localStorage).
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
