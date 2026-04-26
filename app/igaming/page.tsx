import type { Metadata } from "next";
import { NicheLanding } from "@/components/pages/NicheLanding";
import { nichePages } from "@/content/niche-pages";

export const metadata: Metadata = {
  title: "BizDev и продажи для iGaming / Fintech — Грааль",
  description:
    "Построение BizDev и партнёрских продаж для iGaming/Fintech: процесс, переговоры, KPI и контроль воронки.",
};

export default function IgamingPage() {
  return <NicheLanding content={nichePages.igaming} />;
}
