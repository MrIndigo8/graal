import type { Metadata } from "next";
import { AnalyticsScripts } from "@/components/layout/analytics-scripts";
import "./globals.css";

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
      <body className="font-sans antialiased">
        {children}
        <AnalyticsScripts />
      </body>
    </html>
  );
}
