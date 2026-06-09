import { notFound } from "next/navigation";
import { allGuideSectionIds, getSection } from "@/content";
import { SectionGuideView } from "@/components/guide/SectionGuideView";

// Una página estática por cada sección con guía.
export function generateStaticParams() {
  return allGuideSectionIds.map((sectionId) => ({ sectionId }));
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ sectionId: string }>;
}) {
  const { sectionId } = await params;
  const section = getSection(sectionId);
  if (!section?.guide) notFound();
  return <SectionGuideView section={section} />;
}
