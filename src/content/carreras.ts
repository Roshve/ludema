import type { Carrera } from "./types";

// Carreras declaradas. Cada materiaId referencia el `id`/`slug` de una Materia
// en materias/index.ts. Materias compartidas entre carreras usan el mismo id
// y comparten progreso automáticamente (el store es por materia).
export const CARRERAS: Carrera[] = [
  {
    id: "sistemas",
    slug: "ingenieria-en-sistemas",
    nombre: "Ingeniería en Sistemas (UTN)",
    anios: [
      {
        anio: 1,
        materiaIds: [
          "logica",
          "algebra-y-geometria-analitica",
          "algoritmos-y-estructura-de-datos",
        ],
      },
      {
        anio: 2,
        materiaIds: ["sistemas-y-procesos-de-negocio"],
      },
    ],
  },
];
