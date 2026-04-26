import { LeadForm } from "@/components/forms/LeadForm";
import { getSiteConfig, type SiteConfig } from "@/lib/site-config";
import type { CSSProperties } from "react";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const config = await getSiteConfig();
  const heroBlock = config.blocks.find(
    (block) => block.type === "hero" && block.enabled,
  );
  const cardBlocks = config.blocks.filter(
    (block) => block.type === "cards" && block.enabled,
  );

  return (
    <main
      className="min-h-screen bg-[var(--color-bg-primary)]"
      style={buildThemeStyle(config)}
    >
      <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-white/90 backdrop-blur">
        <nav className="mx-auto flex h-18 max-w-[var(--container-max)] items-center justify-between px-[var(--page-padding-x)]">
          <a className="text-sm font-semibold tracking-[0.28em]" href="#">
            {config.brand.name}
          </a>
          <a
            className="rounded bg-[var(--color-crimson-400)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-crimson-600)]"
            href="#lead-form"
          >
            {config.buttons.finalCtaLabel}
          </a>
        </nav>
      </header>

      {heroBlock ? (
        <section className="mx-auto grid max-w-[var(--container-max)] gap-12 px-[var(--page-padding-x)] py-[var(--section-padding-y)] lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-crimson-400)]">
              {heroBlock.eyebrow || config.brand.tagline}
            </p>
            <h1 className="font-[var(--font-cormorant)] text-[length:var(--h1-fluid)] leading-none text-[var(--color-text-primary)]">
              {heroBlock.title}
            </h1>
            {heroBlock.body ? (
              <p className="mt-8 max-w-2xl text-[length:var(--body-fluid)] leading-8 text-[var(--color-text-secondary)]">
                {heroBlock.body}
              </p>
            ) : null}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                className="rounded-[var(--radius-button)] bg-[var(--color-crimson-400)] px-6 py-4 font-medium text-white transition hover:bg-[var(--color-crimson-600)]"
                href="#lead-form"
              >
                {config.buttons.primaryLabel}
              </a>
              <a
                className="rounded-[var(--radius-button)] border border-[var(--color-crimson-400)] px-6 py-4 font-medium text-[var(--color-crimson-400)] transition hover:bg-[var(--color-crimson-50)]"
                href="#cases"
              >
                {config.buttons.secondaryLabel}
              </a>
            </div>
          </div>

          <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-[var(--card-padding)] shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-gold-700)]">
              Revenue system
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {heroBlock.items.map((item) => (
                <div
                  className="rounded-[var(--radius-card)] bg-[var(--color-bg-secondary)] p-5"
                  key={item.text}
                >
                  <div className="text-4xl font-light text-[var(--color-crimson-400)]">
                    {item.title}
                  </div>
                  <div className="mt-2 text-sm text-[var(--color-text-secondary)]">
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {cardBlocks.map((block) => (
        <Section id={block.id === "cases" ? "cases" : undefined} key={block.id} title={block.title}>
          <div
            className={
              block.columns === 3
                ? "grid gap-4 md:grid-cols-3"
                : "grid gap-4 md:grid-cols-2"
            }
          >
            {block.items.map((item) => (
              <Card key={`${block.id}-${item.title}`} title={item.title} text={item.text} />
            ))}
          </div>
        </Section>
      ))}

      <Section title={config.form.title}>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="text-[var(--color-text-secondary)]">
            <p className="text-lg leading-8">
              {config.form.subtitle}
            </p>
          </div>
          <LeadForm
            submitLabel={config.form.submitLabel}
            successMessage={config.form.successMessage}
          />
        </div>
      </Section>

      <footer className="border-t border-[var(--color-border)] px-6 py-10 text-center text-sm text-[var(--color-text-secondary)]">
        {config.brand.name} © 2026. Sales outsourcing and AI automation.
      </footer>
    </main>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="mx-auto max-w-[var(--container-max)] px-[var(--page-padding-x)] py-[var(--section-padding-y)]"
    >
      <h2 className="mb-10 font-[var(--font-cormorant)] text-[length:var(--h2-fluid)] text-[var(--color-text-primary)]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-[var(--radius-card)] border border-[var(--color-border)] border-l-2 border-l-[var(--color-crimson-400)] bg-white p-[var(--card-padding)] transition hover:border-l-[var(--color-gold-500)] hover:shadow-lg">
      <h3 className="text-xl font-medium text-[var(--color-text-primary)]">
        {title}
      </h3>
      <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">
        {text}
      </p>
    </article>
  );
}

function buildThemeStyle(config: SiteConfig) {
  return {
    "--color-bg-primary": config.theme.colors.bgPrimary,
    "--color-bg-secondary": config.theme.colors.bgSecondary,
    "--color-bg-dark": config.theme.colors.bgDark,
    "--color-crimson-50": config.theme.colors.crimsonSoft,
    "--color-crimson-400": config.theme.colors.crimson,
    "--color-crimson-600": config.theme.colors.crimsonHover,
    "--color-gold-500": config.theme.colors.gold,
    "--color-gold-700": config.theme.colors.goldDark,
    "--color-text-primary": config.theme.colors.textPrimary,
    "--color-text-secondary": config.theme.colors.textSecondary,
    "--color-border": config.theme.colors.border,
    "--container-max": `${config.theme.layout.containerMaxWidth}px`,
    "--section-padding-y": `clamp(${config.theme.layout.sectionPaddingMobile}px, 8vw, ${config.theme.layout.sectionPaddingDesktop}px)`,
    "--card-padding": `${config.theme.shape.cardPadding}px`,
    "--radius-card": `${config.theme.shape.radius}px`,
    "--radius-button": `${config.theme.shape.buttonRadius}px`,
    "--font-scale-heading": config.theme.typography.headingScale,
    "--font-scale-body": config.theme.typography.bodyScale,
  } as CSSProperties;
}
