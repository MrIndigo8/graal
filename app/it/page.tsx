import type { Metadata } from "next";
import { NicheLanding } from "@/components/pages/NicheLanding";
import { nichePages } from "@/content/niche-pages";

export const metadata: Metadata = {
  title: "Команда продаж для IT / SaaS — Грааль",
  description:
    "SDR/BDR команда, outbound, CRM и управляемый pipeline для IT/SaaS бизнеса.",
};

export default function ItPage() {
  return <NicheLanding content={nichePages.it} />;
}
