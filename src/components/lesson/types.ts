// Contrato compartido por los renderers de ejercicio.

// Estado de respuesta que el renderer reporta al reproductor:
//  - null  → respuesta incompleta (no se puede comprobar todavía).
//  - { correct } → respuesta lista; correct indica si es correcta.
export type AnswerState = { correct: boolean } | null;

export type RenderProps<E> = {
  exercise: E;
  /** true una vez que el usuario presionó «Comprobar». */
  checked: boolean;
  /** Reporta el estado de la respuesta actual. */
  onAnswer: (a: AnswerState) => void;
  /** El renderer puede forzar la comprobación (p. ej. al agotarse el tiempo). */
  requestCheck?: () => void;
};
