"use client";

import { useEffect, useRef, useCallback } from "react";
import { useProgress } from "@/stores/progress";

/**
 * Tope máximo por segmento: evita inflar el tiempo cuando la pestaña está en
 * primer plano pero el usuario no interactúa (p. ej. fue a comer con la lección
 * abierta). 5 min es suficiente para una ráfaga de ejercicios.
 */
const IDLE_CAP_MS = 5 * 60_000;

/**
 * Cronómetro de estudio activo para el `LessonPlayer`.
 *
 * - Pausa automáticamente cuando la pestaña se oculta (`visibilitychange`).
 * - Cada segmento de tiempo se capa a `IDLE_CAP_MS` para evitar inflado.
 * - Llama a `addStudySeconds` al hacer flush.
 *
 * Devuelve `flush()`: cierra el segmento abierto y persiste los segundos.
 * Llamar varias veces es seguro (después del primer flush el acumulador queda en 0).
 */
export function useStudyTimer(): { flush: () => void } {
  const addStudySeconds = useProgress((s) => s.addStudySeconds);

  // ms acumulados desde el último flush.
  const accMs = useRef(0);
  // Inicio del segmento activo en curso. null = pestaña oculta o ya flusheado.
  // eslint-disable-next-line react-hooks/purity -- Date.now() en el valor inicial de useRef solo se ejecuta al montar; es el comportamiento deseado para iniciar el segmento desde el momento del mount
  const segmentStart = useRef<number | null>(Date.now());

  /** Cierra el segmento abierto sumando al acumulador. */
  const closeSegment = useCallback(() => {
    if (segmentStart.current === null) return;
    const elapsed = Date.now() - segmentStart.current;
    accMs.current += Math.min(elapsed, IDLE_CAP_MS);
    segmentStart.current = null;
  }, []);

  /** Persiste el tiempo acumulado y resetea el acumulador. */
  const flush = useCallback(() => {
    closeSegment();
    const seconds = Math.floor(accMs.current / 1000);
    accMs.current = 0;
    addStudySeconds(seconds);
  }, [closeSegment, addStudySeconds]);

  useEffect(() => {
    function onVisibilityChange() {
      if (document.hidden) {
        closeSegment();
      } else {
        // La pestaña vuelve a ser visible: abre un nuevo segmento.
        segmentStart.current = Date.now();
      }
    }

    function onPageHide() {
      flush();
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", onPageHide);
    // beforeunload como respaldo en navegadores que no disparan pagehide en cierre.
    window.addEventListener("beforeunload", onPageHide);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("beforeunload", onPageHide);
      // Flush al desmontar (salir con la X / navegar).
      flush();
    };
  }, [closeSegment, flush]);

  return { flush };
}
