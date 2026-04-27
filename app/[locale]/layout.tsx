import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = routing.locales.includes(params.locale as never)
    ? params.locale
    : routing.defaultLocale;

  const titleByLocale: Record<string, string> = {
    en: "Graal — We open the revenue tap",
    ru: "Graal — Мы открываем кран выручки",
    es: "Graal — We open the revenue tap",
    pl: "Graal — We open the revenue tap",
  };

  return {
    title: titleByLocale[locale],
    description:
      "Outsourced sales teams, fractional RoS, BizDev as a service and corporate sales training.",
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `/${loc}`]),
      ),
    },
    openGraph: {
      title: titleByLocale[locale],
      description:
        "Team + infrastructure + results for SaaS, Fintech and EdTech.",
      type: "website",
      locale,
      url: `https://graal.agency/${locale}`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = params;
  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar locale={locale} />
      {children}
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}
