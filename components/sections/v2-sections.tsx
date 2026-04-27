"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";

export function WhoWePlaceSection() {
  const t = useTranslations("whoWePlace");
  const roles = useMemo(
    () => t.raw("roles") as Array<{ name: string; kpi: string; tools: string }>,
    [t],
  );

  return (
    <section className="bg-[var(--bg-secondary)] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "var(--font-cormorant)" }}>
          {t("title")}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <Card key={role.name}>
              <h3 className="text-lg">{role.name}</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">KPI: {role.kpi}</p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">Tools: {role.tools}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ForWhomSection() {
  const t = useTranslations("forWhom");
  const items = useMemo(
    () => t.raw("items") as Array<{ stage: string; text: string; package: string }>,
    [t],
  );

  return (
    <section className="bg-[var(--bg-primary)] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "var(--font-cormorant)" }}>
          {t("title")}
        </h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.stage} className="border-l-2 border-l-[var(--crimson)]">
              <h3 className="text-xl">{item.stage}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{item.text}</p>
              <p className="mt-4 text-sm font-semibold text-[var(--crimson-dark)]">
                {item.package}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IndustriesSection() {
  const t = useTranslations("industries");
  const items = useMemo(
    () => t.raw("items") as Array<{ name: string; text: string }>,
    [t],
  );

  return (
    <section id="industries" className="bg-[var(--bg-secondary)] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "var(--font-cormorant)" }}>
          {t("title")}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <Card key={item.name}>
              <h3 className="text-xl">{item.name}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{item.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CasesPreviewSection() {
  const t = useTranslations("cases");
  const locale = useLocale();

  return (
    <section className="bg-[var(--bg-primary)] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "var(--font-cormorant)" }}>
          {t("title")}
        </h2>
        <Card className="mt-8">
          <p className="text-sm text-[var(--text-secondary)]">{t("empty")}</p>
          <Link href={`/${locale}/cases`} className="mt-4 inline-block text-sm text-[var(--crimson)]">
            Open cases page →
          </Link>
        </Card>
      </div>
    </section>
  );
}

export function TechStackSection() {
  const t = useTranslations("stack");
  const groups = useMemo(
    () => t.raw("groups") as Array<{ name: string; tools: string }>,
    [t],
  );

  return (
    <section className="bg-[var(--bg-secondary)] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "var(--font-cormorant)" }}>
          {t("title")}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <Card key={group.name}>
              <p className="text-xs uppercase tracking-[0.06em] text-[var(--gold-dark)]">
                {group.name}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{group.tools}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MindsetSection() {
  const t = useTranslations("mindset");
  const locale = useLocale();
  const cards = useMemo(
    () => t.raw("cards") as Array<{ name: string; text: string }>,
    [t],
  );

  return (
    <section className="bg-[var(--bg-primary)] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "var(--font-cormorant)" }}>
          {t("title")}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--text-secondary)]">{t("sub")}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <Card key={card.name}>
              <h3 className="text-xl">{card.name}</h3>
              <p className="mt-3 text-sm text-[var(--text-secondary)]">{card.text}</p>
            </Card>
          ))}
        </div>
        <Link href={`/${locale}/training`} className="mt-6 inline-block text-sm text-[var(--crimson)]">
          {t("cta")} →
        </Link>
      </div>
    </section>
  );
}

export function EngagementModelsSection() {
  const t = useTranslations("models");
  const items = useMemo(
    () => t.raw("items") as Array<{ name: string; text: string }>,
    [t],
  );

  return (
    <section className="bg-[var(--bg-secondary)] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "var(--font-cormorant)" }}>
          {t("title")}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <Card key={item.name}>
              <h3 className="text-xl">{item.name}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{item.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const t = useTranslations("faq");
  const questions = useMemo(() => t.raw("questions") as string[], [t]);

  return (
    <section className="bg-[var(--bg-primary)] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "var(--font-cormorant)" }}>
          {t("title")}
        </h2>
        <div className="mt-8 grid gap-3">
          {questions.map((question) => (
            <details key={question} className="border border-[var(--border)] bg-white p-4">
              <summary className="cursor-pointer text-sm font-medium">{question}</summary>
              <p className="mt-3 text-sm text-[var(--text-secondary)]">
                {t("answer")}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
