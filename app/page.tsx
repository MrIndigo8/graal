import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CardsSection } from "@/components/sections/CardsSection";
import { CasesSection } from "@/components/sections/Cases";
import { FAQSection } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { homeContent } from "@/content/home";
import { getSiteConfig, type SiteConfig } from "@/lib/site-config";
import type { CSSProperties } from "react";

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
      className="lux-main min-h-screen bg-[var(--color-bg-primary)]"
      style={buildThemeStyle(config)}
    >
      <Navbar brandName={config.brand.name} ctaLabel={config.buttons.finalCtaLabel} />

      {heroBlock ? (
        <Hero
          block={heroBlock}
          tagline={config.brand.tagline}
          primaryLabel={config.buttons.primaryLabel}
          secondaryLabel={config.buttons.secondaryLabel}
        />
      ) : null}

      {cardBlocks.map((block) => (
        <CardsSection block={block} key={block.id} />
      ))}

      <CasesSection items={homeContent.cases} />
      <FAQSection items={homeContent.faq} />
      <FinalCTA form={config.form} />

      <Footer brandName={config.brand.name} />
    </main>
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
