import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Section } from "@/components/sections/Section";
import { LeadForm } from "@/components/forms/LeadForm";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { nichePages } from "@/content/niche-pages";

type NicheContent = (typeof nichePages)[keyof typeof nichePages];

export function NicheLanding({ content }: { content: NicheContent }) {
  return (
    <main className="lux-main min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar brandName="ГРААЛЬ" ctaLabel="Получить смету" />

      <Section eyebrow="Niche page" title={content.title}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <p className="max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
            {content.subtitle}
          </p>
          <Card className="bg-[linear-gradient(180deg,#fff,rgba(253,245,220,0.42))]">
            <Badge variant="gold">Focus metrics</Badge>
            <div className="mt-5 grid gap-2">
              {content.metrics.map((metric) => (
                <div
                  className="rounded-[var(--radius-button)] bg-white px-4 py-3 text-sm text-[var(--color-text-secondary)]"
                  key={metric}
                >
                  {metric}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section id="challenges" title={content.challengeTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {content.challenges.map((item, index) => (
            <Card variant="accent" key={item}>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-700)]">
                pain {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">{item}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="deliverables" title={content.deliverablesTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {content.deliverables.map((item, index) => (
            <Card variant="accent" key={item}>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-crimson-400)]">
                value {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">{item}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="lead-form" title={content.cta}>
        <LeadForm presetNiche={content.nicheValue} submitLabel={content.cta} />
      </Section>

      <Footer brandName="ГРААЛЬ" />
    </main>
  );
}
