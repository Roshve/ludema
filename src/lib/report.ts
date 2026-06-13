/**
 * Utilidades para generar URLs de issues de GitHub pre-rellenados.
 * El flujo es 100% client-side: no hay backend, no hay tokens expuestos.
 */

export const REPO_URL = "https://github.com/Roshve/ludema";

export type ReportCategory = "contenido" | "bug" | "sugerencia";

interface CategoryMeta {
  label: string;
  githubLabel: string;
  emoji: string;
  titlePrefix: string;
  placeholder: string;
}

export const CATEGORY_META: Record<ReportCategory, CategoryMeta> = {
  contenido: {
    label: "Error de contenido",
    githubLabel: "contenido",
    emoji: "📚",
    titlePrefix: "[Contenido]",
    placeholder:
      "Describí el error en el enunciado, la respuesta esperada u otro problema de contenido…",
  },
  bug: {
    label: "Bug técnico",
    githubLabel: "bug",
    emoji: "🐛",
    titlePrefix: "[Bug]",
    placeholder:
      "Describí qué pasó y qué esperabas que pasara. Mencioná el navegador si es relevante…",
  },
  sugerencia: {
    label: "Sugerencia",
    githubLabel: "enhancement",
    emoji: "💡",
    titlePrefix: "[Sugerencia]",
    placeholder: "¿Qué mejoraría la experiencia o el contenido de la app?",
  },
};

export interface ReportContext {
  lessonId?: string;
  exerciseId?: string;
  exerciseType?: string;
}

export interface BuildIssueUrlParams {
  category: ReportCategory;
  description: string;
  context?: ReportContext;
}

/**
 * Construye la URL para abrir un issue de GitHub pre-rellenado.
 * Incluye en el body: descripción del usuario + sección de contexto auto-generada.
 */
export function buildIssueUrl({
  category,
  description,
  context,
}: BuildIssueUrlParams): string {
  const meta = CATEGORY_META[category];

  // Título: prefijo + primeras 60 letras de la descripción.
  const snippet = description.trim().slice(0, 60).replace(/\n/g, " ");
  const title = `${meta.titlePrefix} ${snippet}${description.trim().length > 60 ? "…" : ""}`;

  // Cuerpo en Markdown.
  const contextLines: string[] = [];
  if (typeof window !== "undefined") {
    contextLines.push(`- **URL:** ${window.location.href}`);
    contextLines.push(`- **Navegador:** ${navigator.userAgent}`);
  }
  if (context?.lessonId) {
    contextLines.push(`- **Lección:** \`${context.lessonId}\``);
  }
  if (context?.exerciseId) {
    contextLines.push(`- **Ejercicio:** \`${context.exerciseId}\``);
  }
  if (context?.exerciseType) {
    contextLines.push(`- **Tipo:** \`${context.exerciseType}\``);
  }

  const contextSection =
    contextLines.length > 0
      ? `\n\n---\n**Contexto automático**\n${contextLines.join("\n")}`
      : "";

  const body = `${description.trim()}${contextSection}`;

  const params = new URLSearchParams({
    title,
    body,
    labels: meta.githubLabel,
  });

  return `${REPO_URL}/issues/new?${params.toString()}`;
}
