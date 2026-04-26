import type { Metadata } from "next";
import { NicheLanding } from "@/components/pages/NicheLanding";
import { nichePages } from "@/content/niche-pages";

export const metadata: Metadata = {
  title: "Система закрытия для инфобизнеса — Грааль",
  description:
    "РОП, close-команда, скрипты, апселлы и реактивация базы для инфобизнеса и EdTech.",
};

export default function InfobusinessPage() {
  return <NicheLanding content={nichePages.infobusiness} />;
}
