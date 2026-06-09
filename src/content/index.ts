import type { Lesson, Section, Unit } from "./types";
import { unit1 } from "./unit1";

// Unidad 2: placeholder "próximamente" (se desbloquea al dorar la Unidad 1).
const unit2: Unit = {
  id: "u2",
  title: "Unidad 2 · Conjuntos",
  subtitle: "Próximamente",
  available: false,
  sections: [],
};

export const curriculum: Unit[] = [unit1, unit2];

export type LessonContext = {
  unit: Unit;
  section: Section;
  lesson: Lesson;
  /** Posición global de la lección dentro de todo el currículo. */
  globalIndex: number;
  prevLessonId: string | null;
  nextLessonId: string | null;
};

// Lista ordenada de todas las lecciones jugables, con su contexto.
function buildIndex(): LessonContext[] {
  const flat: { unit: Unit; section: Section; lesson: Lesson }[] = [];
  for (const unit of curriculum) {
    if (!unit.available) continue;
    for (const section of unit.sections) {
      for (const lesson of section.lessons) {
        flat.push({ unit, section, lesson });
      }
    }
  }
  return flat.map((f, i) => ({
    ...f,
    globalIndex: i,
    prevLessonId: i > 0 ? flat[i - 1].lesson.id : null,
    nextLessonId: i < flat.length - 1 ? flat[i + 1].lesson.id : null,
  }));
}

const LESSON_INDEX = buildIndex();
const BY_ID = new Map(LESSON_INDEX.map((c) => [c.lesson.id, c]));

export const allLessons = LESSON_INDEX;

export function getLessonContext(id: string): LessonContext | undefined {
  return BY_ID.get(id);
}

export function getLesson(id: string): Lesson | undefined {
  return BY_ID.get(id)?.lesson;
}

export const allLessonIds = LESSON_INDEX.map((c) => c.lesson.id);

// XP otorgada al completar una lección sin fallar (10 por ejercicio).
export function lessonXp(lesson: Lesson): number {
  return lesson.exercises.length * 10;
}

// ── Secciones (para las mini-guías) ─────────────────────────────────────────

const ALL_SECTIONS = curriculum
  .filter((u) => u.available)
  .flatMap((u) => u.sections);
const SECTION_BY_ID = new Map(ALL_SECTIONS.map((s) => [s.id, s]));

export function getSection(id: string): Section | undefined {
  return SECTION_BY_ID.get(id);
}

// Ids de secciones que tienen guía (para generateStaticParams del /guide).
export const allGuideSectionIds = ALL_SECTIONS.filter((s) => s.guide).map(
  (s) => s.id,
);
