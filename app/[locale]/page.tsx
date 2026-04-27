import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { LeadFormSection } from "@/components/sections/lead-form";
import { ProblemSection } from "@/components/sections/problem";
import { ServicesSection } from "@/components/sections/services";
import {
  CasesPreviewSection,
  EngagementModelsSection,
  FaqSection,
  ForWhomSection,
  IndustriesSection,
  MindsetSection,
  TechStackSection,
  WhoWePlaceSection,
} from "@/components/sections/v2-sections";
import { routing } from "@/i18n/routing";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = routing.locales.includes(params.locale as never)
    ? params.locale
    : routing.defaultLocale;
  const keywords: Record<string, string[]> = {
    en: [
      "outsourced sales team for startups",
      "fractional VP of sales SaaS",
      "hire BizDev for IT startup",
      "outsourced SDR team fintech",
      "sales team rental agency",
    ],
    ru: [
      "аутсорс отдела продаж стартап",
      "аренда РОПа для IT компании",
      "биздев на аутсорсинге SaaS",
      "найм отдела продаж под ключ",
    ],
    es: ["outsourced sales team for startups"],
    pl: ["outsourced sales team for startups"],
  };

  return {
    keywords: keywords[locale],
  };
}

export default function LocalizedHomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Graal",
    serviceType: [
      "Sales Team Outsourcing",
      "Fractional RoS",
      "BizDev as a Service",
      "Corporate Sales Training",
    ],
    areaServed: "Worldwide",
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <ServicesSection />
      <WhoWePlaceSection />
      <ForWhomSection />
      <IndustriesSection />
      <CasesPreviewSection />
      <TechStackSection />
      <MindsetSection />
      <EngagementModelsSection />
      <FaqSection />
      <LeadFormSection />
    </main>
  );
}
