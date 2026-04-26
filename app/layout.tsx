import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { env } from "@/config/env";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: "Грааль — Аутсорс продаж под ключ",
  description:
    "Строим команды продаж для IT, iGaming и инфобизнеса. РОП, SDR/BDR, лидогенерация, CRM и ИИ-автоматизация.",
  keywords: [
    "аутсорс продаж",
    "отдел продаж на аутсорсинге",
    "лидогенерация IT",
    "SDR outsourcing",
    "B2B lead generation",
    "AI sales automation",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Грааль — Ваша машина продаж под ключ",
    description:
      "За 48 часов подготовим состав команды, стек, KPI и бюджет запуска продаж под вашу нишу.",
    url: env.siteUrl,
    siteName: "Грааль",
    locale: "ru_RU",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
