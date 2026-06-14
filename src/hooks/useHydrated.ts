"use client";

import { useEffect, useState } from "react";

// Devuelve true una vez que el componente se montó en el cliente.
// Útil para evitar desajustes de hidratación con estado persistido (localStorage).
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- patrón estándar de detección de hidratación: el setState sincrónico dentro del efecto solo corre una vez al montar
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
