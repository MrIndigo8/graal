"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import { Card } from "@/components/ui/card";

export function ServicesSection() {
  const t = useTranslations("services");
  const locale = useLocale();
  const cards = useMemo(
    () =>
      t.raw("cards") as Array<{
        slug: string;
        name: string;
        subtitle: string;
        roles: string;
        focus: string;
        price: string;
      }>,
    [t],
  );

  return (
    <section id="services" className="bg-[var(--bg-primary)] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "var(--font-cormorant)" }}>
          {t("title")}
        </h2>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {cards.map((card) => (
            <Link key={card.slug} href={`/${locale}/${card.slug}`}>
              <Card className="h-full border-l-2 border-l-[var(--crimson)]">
                <p className="text-xs uppercase tracking-[0.06em] text-[var(--crimson)]">
                  {card.name}
                </p>
                <h3 className="mt-2 text-2xl" style={{ fontFamily: "var(--font-cormorant)" }}>
                  {card.subtitle}
                </h3>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">{card.roles}</p>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{card.focus}</p>
                <p className="mt-6 text-sm font-semibold text-[var(--crimson-dark)]">
                  {card.price} →
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
