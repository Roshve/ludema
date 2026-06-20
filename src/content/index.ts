import type { Lesson, Section, Unit, Materia, Carrera } from "./types";
import { MATERIAS } from "./materias";
import { CARRERAS as CARRERAS_DATA } from "./carreras";

// Re-exports públicos para consumidores.
export { MATERIAS, CARRERAS_DATA as CARRERAS };
export type { Materia, Carrera };

// ── Normalización (prefijo de materia) ───────────────────────────────────────

/**
 * Clona una materia profundamente y prefija todos los IDs de
 * unidades/secciones/lecciones/ejercicios con `${materia.id}-`.
 *
 * El source (unit*.ts) mantiene IDs cortos (ej. "u1-a-l1"); el runtime
 * opera siempre sobre los IDs prefijados (ej. "logica-u1-a-l1"), lo que
 * garantiza unicidad global cuando hay varias materias.
 */
function prefixMateria(m: Materia): Materia {
  const p = `${m.id}-`;
  const units: Unit[] = m.units.map((u) => ({
    ...u,
    id: p + u.id,
    sections: u.sections.map((s) => ({
      ...s,
      id: p + s.id,
      lessons: s.lessons.map((l) => ({
        ...l,
        id: p + l.id,
        exercises: l.exercises.map((e) => ({ ...e, id: p + e.id })),
      })),
    })),
  }));
  return { ...m, units };
}

// Mapa slug → Materia normalizada (solo materias disponibles).
const PREFIXED = new Map<string, Materia>(
  MATERIAS.filter((m) => m.available).map((m) => [m.slug, prefixMateria(m)]),
);

// ── API de materias y carreras ────────────────────────────────────────────────

/** Devuelve la materia raw (con IDs sin prefijo) por slug/id; útil para display. */
export function getMateria(slug: string): Materia | undefined {
  return MATERIAS.find((m) => m.slug === slug || m.id === slug);
}

/** Devuelve las unidades normalizadas (IDs prefijados) de una materia. */
export function curriculumDeMateria(slug: string): Unit[] {
  return PREFIXED.get(slug)?.units ?? [];
}

export function getCarrera(slug: string): Carrera | undefined {
  return CARRERAS_DATA.find((c) => c.slug === slug || c.id === slug);
}

// ── Índice global de lecciones ───────────────────────────────────────────────

export type LessonContext = {
  /** Materia raw (para display: title, slug, accent). */
  materia: Materia;
  unit: Unit;       // IDs prefijados
  section: Section; // IDs prefijados
  lesson: Lesson;   // IDs prefijados
  globalIndex: number;
  prevLessonId: string | null;
  nextLessonId: string | null;
};

function buildIndex(): LessonContext[] {
  const flat: { materia: Materia; unit: Unit; section: Section; lesson: Lesson }[] = [];
  for (const rawMateria of MATERIAS) {
    if (!rawMateria.available) continue;
    const prefixed = PREFIXED.get(rawMateria.slug)!;
    for (const unit of prefixed.units) {
      if (!unit.available) continue;
      for (const section of unit.sections) {
        for (const lesson of section.lessons) {
          flat.push({ materia: rawMateria, unit, section, lesson });
        }
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

// XP por lección: 10 por ejercicio evaluable (tarjetas de concepto excluidas).
export function lessonXp(lesson: Lesson): number {
  return lesson.exercises.filter((e) => e.type !== "concept").length * 10;
}

// ── Secciones (para las mini-guías en /guide/[sectionId]) ────────────────────

// Secciones únicas del índice global, con IDs prefijados.
const SECTION_SEEN = new Set<string>();
const ALL_SECTIONS: Section[] = [];
for (const c of LESSON_INDEX) {
  if (!SECTION_SEEN.has(c.section.id)) {
    SECTION_SEEN.add(c.section.id);
    ALL_SECTIONS.push(c.section);
  }
}
const SECTION_BY_ID = new Map(ALL_SECTIONS.map((s) => [s.id, s]));

export function getSection(id: string): Section | undefined {
  return SECTION_BY_ID.get(id);
}

// IDs de secciones con guía (para generateStaticParams de /guide/[sectionId]).
export const allGuideSectionIds = ALL_SECTIONS.filter((s) => s.guide).map((s) => s.id);

// ── Compat: curriculum ────────────────────────────────────────────────────────
// Todas las unidades normalizadas de todas las materias disponibles.
// Usado por validate.ts (validateCurriculum) y buildAchievementStats en progress.ts.
export const curriculum: Unit[] = MATERIAS
  .filter((m) => m.available)
  .flatMap((m) => PREFIXED.get(m.slug)!.units);
