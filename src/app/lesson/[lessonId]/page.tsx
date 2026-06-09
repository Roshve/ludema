import { notFound } from "next/navigation";
import { allLessonIds, getLesson } from "@/content";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

// Genera una página estática por cada lección (export estático).
export function generateStaticParams() {
  return allLessonIds.map((lessonId) => ({ lessonId }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = getLesson(lessonId);
  if (!lesson) notFound();
  return <LessonPlayer lesson={lesson} />;
}
