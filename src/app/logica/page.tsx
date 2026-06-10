import type { Metadata } from "next";
import { LearningMap } from "@/components/map/LearningMap";

// Con el template del layout rinde "Lógica y Estructuras Discretas · Ludema".
export const metadata: Metadata = { title: "Lógica y Estructuras Discretas" };

export default function LogicaPage() {
  return <LearningMap />;
}
