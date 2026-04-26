import { Section } from "@/components/sections/Section";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { cases } from "@/content/cases";

export function CasesSection({ items }: { items: typeof cases }) {
  return (
    <Section id="cases-detail" title="Сценарии, по которым мы запускаем рост выручки">
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <Card
            className="flex min-h-full flex-col bg-[linear-gradient(180deg,#fff,rgba(245,243,238,0.55))]"
            variant="accent"
            key={item.id}
          >
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
            <div className="mt-auto pt-6">
              <div className="mb-3 h-px bg-[var(--color-border)]" />
              <div className="flex flex-wrap gap-2">
              {item.metrics.map((metric) => (
                <span
                  className="rounded-full bg-white px-3 py-1 text-xs text-[var(--color-text-secondary)] shadow-sm"
                  key={metric}
                >
                  {metric}
                </span>
              ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
