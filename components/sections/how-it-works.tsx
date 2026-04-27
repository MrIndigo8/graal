"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function HowItWorksSection() {
  const t = useTranslations("howItWorks");
  const steps = useMemo(
    () => t.raw("steps") as Array<{ period: string; title: string; text: string }>,
    [t],
  );

  return (
    <section id="how-it-works" className="bg-[var(--bg-secondary)] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "var(--font-cormorant)" }}>
          {t("title")}
        </h2>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="border border-[var(--border)] bg-white p-6"
            >
              <p className="text-xs uppercase tracking-[0.06em] text-[var(--crimson)]">
                {step.period}
              </p>
              <h3 className="mt-2 text-2xl" style={{ fontFamily: "var(--font-cormorant)" }}>
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{step.text}</p>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 text-lg text-[var(--crimson-dark)]">{t("accent")}</p>
      </div>
    </section>
  );
}
