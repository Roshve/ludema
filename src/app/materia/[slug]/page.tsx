import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MATERIAS, getMateria } from "@/content";
import { LearningMap } from "@/components/map/LearningMap";

export function generateStaticParams() {
  return MATERIAS.filter((m) => m.available).map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const materia = getMateria(slug);
  return { title: materia?.title ?? slug };
}

export default async function MateriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const materia = getMateria(slug);
  if (!materia?.available) notFound();
  return <LearningMap slug={slug} />;
}
