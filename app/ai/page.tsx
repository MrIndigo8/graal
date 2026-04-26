import type { Metadata } from "next";
import { AiLanding } from "@/components/pages/AiLanding";

export const metadata: Metadata = {
  title: "ИИ-автоматизация продаж — Грааль",
  description:
    "Отдельный AI-продукт: enrichment, скрипты, outreach, CRM-оркестрация и аналитика воронки.",
};

export default function AiPage() {
  return <AiLanding />;
}
