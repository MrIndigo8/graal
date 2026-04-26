import type { Metadata } from "next";
import { CasesCatalog } from "@/components/pages/CasesCatalog";

export const metadata: Metadata = {
  title: "Кейсы и сценарии — Грааль",
  description:
    "Подборка сценариев и кейсов по нишам: IT/SaaS, iGaming/Fintech и инфобизнес.",
};

export default function CasesPage() {
  return <CasesCatalog />;
}
