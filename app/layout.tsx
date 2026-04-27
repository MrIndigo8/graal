import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { AnalyticsScripts } from "@/components/layout/analytics-scripts";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  variable: "--font-cormorant",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Graal — We open the revenue tap",
    template: "%s | Graal",
  },
  description:
    "Sales team as a service for SaaS, Fintech and EdTech. Team + infrastructure + results.",
  metadataBase: new URL("https://graal.agency"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}>
        {children}
        <AnalyticsScripts />
      </body>
    </html>
  );
}
