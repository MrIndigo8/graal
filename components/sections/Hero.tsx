import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { SiteConfig } from "@/lib/site-config";
import { GraalArtifact } from "./GraalArtifact";

type HeroBlock = SiteConfig["blocks"][number];

export function Hero({
  block,
  tagline,
  primaryLabel,
  secondaryLabel,
}: {
  block: HeroBlock;
  tagline: string;
  primaryLabel: string;
  secondaryLabel: string;
}) {
  return (
    <section className="mx-auto grid max-w-[var(--container-max)] gap-12 px-[var(--page-padding-x)] py-[var(--section-padding-y)] lg:grid-cols-[1.08fr_0.92fr]">
      <div>
        <Badge className="mb-5">{block.eyebrow || tagline}</Badge>
        <h1 className="font-[var(--font-cormorant)] text-[length:var(--h1-fluid)] leading-none text-[var(--color-text-primary)]">
          {block.title}
        </h1>
        {block.body ? (
          <p className="mt-8 max-w-2xl text-[length:var(--body-fluid)] leading-8 text-[var(--color-text-secondary)]">
            {block.body}
          </p>
        ) : null}
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="#lead-form" size="lg">
            {primaryLabel}
          </ButtonLink>
          <ButtonLink href="#cases" variant="secondary" size="lg">
            {secondaryLabel}
          </ButtonLink>
        </div>
      </div>

      <Card className="relative min-h-[520px] overflow-hidden bg-[linear-gradient(135deg,#fff,rgba(253,245,220,0.55))] shadow-[0_24px_80px_rgba(74,14,14,0.08)]">
        <GraalArtifact />
        <div className="relative z-10">
          <Badge variant="gold">Revenue system</Badge>
          <p className="mt-6 max-w-sm text-sm leading-6 text-[var(--color-text-secondary)]">
            Система продаж как управляемый актив: команда, стек, KPI и
            ежедневная прозрачность вместо хаотичного найма.
          </p>
        </div>
        <div className="relative z-10 mt-52 grid grid-cols-2 gap-4 sm:mt-60">
          {block.items.map((item) => (
            <Card
              className="bg-white/86 shadow-sm backdrop-blur"
              variant="metric"
              key={item.text}
            >
              <div className="text-4xl font-light text-[var(--color-crimson-400)]">
                {item.title}
              </div>
              <div className="mt-2 text-sm text-[var(--color-text-secondary)]">
                {item.text}
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </section>
  );
}
