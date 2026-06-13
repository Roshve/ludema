import type { Metadata } from "next";
import { AchievementsGrid } from "@/components/achievements/AchievementsGrid";

export const metadata: Metadata = { title: "Mis logros" };

export default function LogrosPage() {
  return <AchievementsGrid />;
}
