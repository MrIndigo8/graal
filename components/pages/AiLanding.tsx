import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Section } from "@/components/sections/Section";
import { LeadForm } from "@/components/forms/LeadForm";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { aiPage } from "@/content/ai-page";

export function AiLanding() {
  return (
    <main className="lux-main min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar brandName="ГРААЛЬ" ctaLabel="AI-смета" />

      <Section eyebrow="AI automation" title={aiPage.title}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <p className="max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
            {aiPage.subtitle}
          </p>
          <Card className="bg-[linear-gradient(180deg,#fff,rgba(253,245,220,0.42))]">
            <Badge variant="gold">Стоимость запуска</Badge>
            <div className="mt-4 text-4xl font-light text-[var(--color-crimson-400)]">
              {aiPage.priceFrom}
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--color-text-secondary)]">
              Финальная стоимость зависит от числа сценариев, источников лидов,
              глубины CRM-оркестрации и объёма сопровождения.
            </p>
          </Card>
        </div>
      </Section>

      <Section id="capabilities" title="Ключевые AI-возможности">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {aiPage.capabilities.map((item) => (
            <Card variant="accent" key={item.title}>
              <h3 className="text-xl font-medium text-[var(--color-text-primary)]">
                {item.title}
              </h3>
              <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">
                {item.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="stack" title="Технологический стек AI-автоматизации">
        <div className="flex flex-wrap gap-2">
          {aiPage.stack.map((item) => (
            <span
              className="rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm text-[var(--color-text-secondary)]"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      </Section>

      <Section id="faq" title="FAQ по AI-продукту">
        <div className="grid gap-4">
          {aiPage.faq.map((item) => (
            <details
              className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-[var(--card-padding)]"
              key={item.question}
            >
              <summary className="cursor-pointer list-none text-lg font-medium text-[var(--color-text-primary)]">
                {item.question}
              </summary>
              <p className="mt-4 leading-7 text-[var(--color-text-secondary)]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="lead-form" title={aiPage.cta}>
        <LeadForm presetNiche="ai" submitLabel={aiPage.cta} />
      </Section>

      <Footer brandName="ГРААЛЬ" />
    </main>
  );
}
