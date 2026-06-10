import type { Metadata } from "next";
import { LearningMap } from "@/components/map/LearningMap";

// Con el template del layout rinde "Lógica · Ludema".
export const metadata: Metadata = { title: "Lógica" };

export default function LogicaPage() {
  return <LearningMap />;
}
