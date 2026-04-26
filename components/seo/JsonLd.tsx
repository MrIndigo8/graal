import { env } from "@/config/env";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${env.siteUrl}/#organization`,
        name: "Грааль",
        alternateName: "Graal Agency",
        url: env.siteUrl,
        description:
          "Агентство аутсорсинга продаж полного цикла для IT, iGaming, Fintech и инфобизнеса.",
        areaServed: ["EU", "PL", "UK", "USA"],
        serviceType: [
          "Sales Outsourcing",
          "B2B Lead Generation",
          "SDR Outsourcing",
          "AI Sales Automation",
        ],
      },
      {
        "@type": "Service",
        "@id": `${env.siteUrl}/#sales-outsourcing`,
        name: "Аутсорс продаж под ключ",
        provider: {
          "@id": `${env.siteUrl}/#organization`,
        },
        areaServed: ["EU", "PL", "UK", "USA"],
        serviceType: "Sales Outsourcing",
        description:
          "Построение отдела продаж, SDR/BDR-команд, CRM, outreach и ИИ-автоматизации под задачу клиента.",
      },
    ],
  };

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type="application/ld+json"
    />
  );
}
