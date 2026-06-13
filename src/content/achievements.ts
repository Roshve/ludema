import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  Dumbbell,
  Zap,
  GraduationCap,
  Flame,
  CalendarCheck,
  Shield,
  TrendingUp,
  Rocket,
  Table2,
  Scale,
  Search,
  Lightbulb,
  FileText,
  Boxes,
  Medal,
  Crown,
  Timer,
  AlarmClock,
  Clock,
} from "lucide-react";
import type { Accent } from "@/lib/accent";

// Estadísticas derivadas del store que los predicados de logros consumen.
export type AchievementStats = {
  lessonsCount: number;
  totalLessons: number;
  streak: number;
  level: number;
  pomodorosCompleted: number;
  totalStudySeconds: number;
  goldSectionsCount: number;
  unit1Gold: boolean;
  isSectionComplete: (sectionId: string) => boolean;
};

export type Achievement = {
  id: string;
  /** Nombre meme en rioplatense. */
  name: string;
  /** Descripción breve de cómo se consigue. */
  description: string;
  icon: LucideIcon;
  accent: Accent;
  /** Si es true usa shimmer-gold (logros tope). */
  special?: boolean;
  /** Barra de progreso para logros contables (visible cuando está bloqueado). */
  progress?: (s: AchievementStats) => { current: number; target: number };
  unlocked: (s: AchievementStats) => boolean;
};

// 5 horas en segundos.
const MARATHON_SECONDS = 5 * 3600;

export const ACHIEVEMENTS: Achievement[] = [
  // ── Progreso (lecciones) ─────────────────────────────────────────────────
  {
    id: "primera-leccion",
    name: "Hola, mundo lógico",
    description:
      "Completaste tu primera lección. El viaje de mil millas empieza con una proposición.",
    icon: Sparkles,
    accent: "blue",
    unlocked: (s) => s.lessonsCount >= 1,
  },
  {
    id: "cinco-lecciones",
    name: "Calentando motores",
    description: "Completaste 5 lecciones. Ya estás en modo calentamiento.",
    icon: Dumbbell,
    accent: "blue",
    progress: (s) => ({ current: Math.min(s.lessonsCount, 5), target: 5 }),
    unlocked: (s) => s.lessonsCount >= 5,
  },
  {
    id: "quince-lecciones",
    name: "Esto ya es vicio",
    description:
      "15 lecciones. En algún punto dejaste de estudiar y empezaste a disfrutarlo.",
    icon: Zap,
    accent: "blue",
    progress: (s) => ({ current: Math.min(s.lessonsCount, 15), target: 15 }),
    unlocked: (s) => s.lessonsCount >= 15,
  },
  {
    id: "todo-completo",
    name: "Lógico de carrera",
    description: "Completaste todas las lecciones disponibles. Sos un animal.",
    icon: GraduationCap,
    accent: "blue",
    special: true,
    progress: (s) => ({ current: s.lessonsCount, target: s.totalLessons }),
    unlocked: (s) => s.totalLessons > 0 && s.lessonsCount >= s.totalLessons,
  },
  // ── Racha ────────────────────────────────────────────────────────────────
  {
    id: "racha-3",
    name: "Volví porque me extrañabas",
    description: "Racha de 3 días. El conocimiento te llama y vos atendés.",
    icon: Flame,
    accent: "cyan",
    progress: (s) => ({ current: Math.min(s.streak, 3), target: 3 }),
    unlocked: (s) => s.streak >= 3,
  },
  {
    id: "racha-7",
    name: "Una semana imparable",
    description: "7 días seguidos. Siete días de lluvia de neuronas.",
    icon: CalendarCheck,
    accent: "cyan",
    progress: (s) => ({ current: Math.min(s.streak, 7), target: 7 }),
    unlocked: (s) => s.streak >= 7,
  },
  {
    id: "racha-30",
    name: "Disciplina monje shaolin",
    description:
      "30 días de racha. A esta altura ya sos un mito entre los parciales.",
    icon: Shield,
    accent: "cyan",
    special: true,
    progress: (s) => ({ current: Math.min(s.streak, 30), target: 30 }),
    unlocked: (s) => s.streak >= 30,
  },
  // ── Nivel / XP ───────────────────────────────────────────────────────────
  {
    id: "nivel-5",
    name: "Subiendo de nivel IRL",
    description: "Alcanzaste el nivel 5. La progresión está activada.",
    icon: TrendingUp,
    accent: "violet",
    unlocked: (s) => s.level >= 5,
  },
  {
    id: "nivel-10",
    name: "XP > sueño",
    description:
      "Nivel 10. A este punto el sueño es opcional y la lógica es vital.",
    icon: Rocket,
    accent: "violet",
    unlocked: (s) => s.level >= 10,
  },
  // ── Maestría por sección ─────────────────────────────────────────────────
  {
    id: "tablas",
    name: "Máquina de la verdad",
    description:
      "Completaste la sección de tablas de verdad. V, F, V, F… ya lo soñás.",
    icon: Table2,
    accent: "cyan",
    unlocked: (s) => s.isSectionComplete("u1-b"),
  },
  {
    id: "leyes",
    name: "Abogado de las leyes lógicas",
    description: "Dominaste las equivalencias. De Morgan te debe un favor.",
    icon: Scale,
    accent: "violet",
    unlocked: (s) => s.isSectionComplete("u1-c"),
  },
  {
    id: "cuantificadores",
    name: "Para todo meme, existe un logro",
    description: "Terminaste cuantificadores. ∀ meme ∃ un momento de brillo.",
    icon: Search,
    accent: "indigo",
    unlocked: (s) => s.isSectionComplete("u1-d"),
  },
  {
    id: "razonamientos",
    name: "Modus Ponens, papá",
    description:
      "Superaste el jefe final: inferencia y falacias. Incuestionable.",
    icon: Lightbulb,
    accent: "fuchsia",
    unlocked: (s) => s.isSectionComplete("u1-e"),
  },
  {
    id: "examen",
    name: "Modo parcial activado",
    description: "Completaste los simulacros de parcial. UTN.BA tiembla.",
    icon: FileText,
    accent: "blue",
    unlocked: (s) => s.isSectionComplete("u1-f"),
  },
  {
    id: "conjuntos",
    name: "Pertenezco, luego existo",
    description:
      "Terminaste conjuntos básicos. René Descartes ∈ tus influencias.",
    icon: Boxes,
    accent: "blue",
    unlocked: (s) => s.isSectionComplete("u2-a"),
  },
  // ── Secciones doradas ────────────────────────────────────────────────────
  {
    id: "primera-dorada",
    name: "Todo lo que brilla",
    description: "Tu primera sección completamente dorada. El brillo fue tuyo.",
    icon: Medal,
    accent: "indigo",
    unlocked: (s) => s.goldSectionsCount >= 1,
  },
  {
    id: "unidad1-oro",
    name: "Rey Midas",
    description:
      "La Unidad 1 entera en oro. Todo lo que tocás se convierte en tautología.",
    icon: Crown,
    accent: "indigo",
    special: true,
    unlocked: (s) => s.unit1Gold,
  },
  // ── Tiempo y enfoque ─────────────────────────────────────────────────────
  {
    id: "primer-pomodoro",
    name: "Tomatazo 🍅",
    description:
      "Tu primer Pomodoro completado. El método italiano aprobado por la lógica.",
    icon: Timer,
    accent: "fuchsia",
    unlocked: (s) => s.pomodorosCompleted >= 1,
  },
  {
    id: "diez-pomodoros",
    name: "La técnica italiana",
    description: "10 Pomodoros. Ya no sos alumno: sos una máquina de concentración.",
    icon: AlarmClock,
    accent: "fuchsia",
    progress: (s) => ({
      current: Math.min(s.pomodorosCompleted, 10),
      target: 10,
    }),
    unlocked: (s) => s.pomodorosCompleted >= 10,
  },
  {
    id: "maraton",
    name: "Maratón mental",
    description: "5 horas de estudio acumuladas. Eso sí que es compromiso.",
    icon: Clock,
    accent: "fuchsia",
    progress: (s) => ({
      current: Math.min(s.totalStudySeconds, MARATHON_SECONDS),
      target: MARATHON_SECONDS,
    }),
    unlocked: (s) => s.totalStudySeconds >= MARATHON_SECONDS,
  },
];
