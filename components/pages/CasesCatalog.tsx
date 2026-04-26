"use client";

import { useMemo, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Section } from "@/components/sections/Section";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cases } from "@/content/cases";

const filters = ["all", "IT / SaaS", "iGaming", "Инфобизнес"] as const;
type Filter = (typeof filters)[number];

export function CasesCatalog() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") {
      return cases;
    }
    return cases.filter((item) => item.niche === filter);
  }, [filter]);

  return (
    <main className="lux-main min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar brandName="ГРААЛЬ" ctaLabel="Получить смету" />

      <Section eyebrow="Cases" title="Результаты и сценарии клиентов">
        <div className="flex flex-wrap gap-2">
          {filters.map((value) => (
            <button
              className={
                value === filter
                  ? "rounded-[var(--radius-button)] bg-[var(--color-crimson-400)] px-4 py-2 text-sm font-medium text-white"
                  : "rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-4 py-2 text-sm text-[var(--color-text-secondary)]"
              }
              key={value}
              onClick={() => setFilter(value)}
              type="button"
            >
              {value === "all" ? "Все ниши" : value}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <Card variant="accent" key={item.id}>
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge>{item.niche}</Badge>
                <Badge variant="neutral">{item.label}</Badge>
              </div>
              <h3 className="text-xl font-medium text-[var(--color-text-primary)]">
                {item.title}
              </h3>
              <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">
                {item.text}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.metrics.map((metric) => (
                  <span
                    className="rounded-full bg-[var(--color-bg-secondary)] px-3 py-1 text-xs text-[var(--color-text-secondary)]"
                    key={metric}
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Footer brandName="ГРААЛЬ" />
    </main>
  );
}
