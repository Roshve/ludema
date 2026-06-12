import type { Metadata } from "next";
import { PracticeSession } from "@/components/practice/PracticeSession";

export const metadata: Metadata = { title: "Práctica · Ludema" };

export default function PracticePage() {
  return <PracticeSession />;
}
