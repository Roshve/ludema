import type { Metadata } from "next";
import { StatsDashboard } from "@/components/stats/StatsDashboard";

export const metadata: Metadata = { title: "Mis estadísticas" };

export default function EstadisticasPage() {
  return <StatsDashboard />;
}
