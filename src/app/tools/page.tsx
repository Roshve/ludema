import type { Metadata } from "next";
import { TruthTableGenerator } from "@/components/tools/TruthTableGenerator";

export const metadata: Metadata = {
  title: "Generador de tablas de verdad · Ludema",
};

export default function ToolsPage() {
  return <TruthTableGenerator />;
}
