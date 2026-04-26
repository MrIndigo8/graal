import { ContentCard } from "@/components/ui/Card";
import type { SiteConfig } from "@/lib/site-config";
import { Section } from "./Section";

type CardsBlock = SiteConfig["blocks"][number];

function getGridClass(columns?: number) {
  if (columns === 4) {
    return "grid gap-4 sm:grid-cols-2 lg:grid-cols-4";
  }

  if (columns === 3) {
    return "grid gap-4 md:grid-cols-3";
  }

  return "grid gap-4 md:grid-cols-2";
}

export function CardsSection({ block }: { block: CardsBlock }) {
  if (block.id === "how-it-works") {
    return <TimelineSection block={block} />;
  }

  return (
    <Section id={block.id} title={block.title}>
      <div className={getGridClass(block.columns)}>
        {block.items.map((item) => (
          <ContentCard
            key={`${block.id}-${item.title}`}
            title={item.title}
            text={item.text}
            eyebrow={block.id === "niches" ? "niche" : undefined}
          />
        ))}
      </div>
    </Section>
  );
}

function TimelineSection({ block }: { block: CardsBlock }) {
  return (
    <Section id={block.id} title={block.title}>
      <div className="relative grid gap-5 lg:grid-cols-3">
        <div className="absolute left-6 right-6 top-8 hidden h-px bg-[linear-gradient(90deg,transparent,var(--color-gold-500),transparent)] lg:block" />
        {block.items.map((item, index) => (
          <div className="relative" key={`${block.id}-${item.title}`}>
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--color-gold-500)] bg-white text-lg font-light text-[var(--color-crimson-400)] shadow-sm">
              {String(index + 1).padStart(2, "0")}
            </div>
            <ContentCard title={item.title} text={item.text} />
          </div>
        ))}
      </div>
    </Section>
  );
}
