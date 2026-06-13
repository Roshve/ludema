import type { Metadata } from "next";
import { PomodoroTimer } from "@/components/pomodoro/PomodoroTimer";

export const metadata: Metadata = { title: "Pomodoro" };

export default function PomodoroPage() {
  return <PomodoroTimer />;
}
