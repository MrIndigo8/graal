import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
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
  metadataBase: new URL("https://graal.agency"),
  title: "Грааль — Аутсорс продаж под ключ",
  description:
    "Строим команды продаж для IT, iGaming и инфобизнеса. РОП, SDR/BDR, лидогенерация, CRM и ИИ-автоматизация.",
  openGraph: {
    title: "Грааль — Ваша машина продаж под ключ",
    description:
      "За 48 часов подготовим состав команды, стек, KPI и бюджет запуска продаж под вашу нишу.",
    url: "https://graal.agency",
    siteName: "Грааль",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
