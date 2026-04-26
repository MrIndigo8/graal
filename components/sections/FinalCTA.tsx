import { LeadForm } from "@/components/forms/LeadForm";
import { Section } from "@/components/sections/Section";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { SiteConfig } from "@/lib/site-config";

export function FinalCTA({ form }: { form: SiteConfig["form"] }) {
  return (
    <Section>
      <div className="rounded-[calc(var(--radius-card)+10px)] bg-[var(--color-bg-dark)] p-1 shadow-[0_30px_90px_rgba(26,10,10,0.18)]">
        <div className="grid gap-8 rounded-[calc(var(--radius-card)+8px)] border border-[rgba(232,200,112,0.28)] bg-[radial-gradient(circle_at_20%_20%,rgba(201,168,76,0.18),transparent_34%),var(--color-bg-dark)] p-6 lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
          <div className="text-white">
            <Badge variant="gold">Revenue audit</Badge>
            <h2 className="mt-6 font-[var(--font-cormorant)] text-[length:var(--h2-fluid)] leading-tight">
              {form.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/72">
              {form.subtitle}
            </p>
            <div className="mt-8 grid gap-3 text-sm text-white/72">
              {[
                "Состав команды под вашу нишу",
                "Рекомендуемый CRM/outreach/AI стек",
                "Ориентиры по KPI и бюджету запуска",
              ].map((item) => (
                <div className="flex items-center gap-3" key={item}>
                  <span className="h-px w-8 bg-[var(--color-gold-500)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <Card className="bg-white shadow-2xl">
            <LeadForm
              submitLabel={form.submitLabel}
              successMessage={form.successMessage}
            />
          </Card>
        </div>
      </div>
    </Section>
  );
}
