"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const t = useTranslations("hero");
  const metrics = useMemo(
    () => t.raw("metrics") as Array<{ value: string; label: string }>,
    [t],
  );

  return (
    <section className="relative overflow-hidden bg-[var(--bg-dark)] px-6 py-20 text-white md:px-10 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(201,168,76,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,168,76,0.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="space-y-7"
        >
          <Badge className="border-[var(--gold)] bg-transparent text-[var(--gold)]">
            {t("label")}
          </Badge>

          <h1
            className="max-w-2xl text-5xl leading-[0.95] md:text-7xl"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </h1>

          <p className="max-w-2xl text-base leading-8 text-[#dfd5cf] md:text-lg">
            {t("sub")}
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#lead-form">
              <Button>{t("ctaPrimary")}</Button>
            </a>
            <a href="#how-it-works">
              <Button variant="ghost" className="border-[var(--gold)] text-[var(--gold)]">
                {t("ctaSecondary")} ↓
              </Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.22),transparent_68%)]" />
          <svg
            width="320"
            height="320"
            viewBox="0 0 320 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative h-auto w-[280px] md:w-[320px]"
          >
            <path
              d="M76 78H244C243 148 222 202 160 242C98 202 77 148 76 78Z"
              stroke="var(--gold)"
              strokeWidth="2"
            />
            <path d="M115 78V56H205V78" stroke="var(--gold)" strokeWidth="2" />
            <path d="M112 258H208" stroke="var(--gold)" strokeWidth="2" />
            <path d="M136 242V258" stroke="var(--gold)" strokeWidth="2" />
            <path d="M184 242V258" stroke="var(--gold)" strokeWidth="2" />
            <path
              d="M108 106H212"
              stroke="var(--gold)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
            <path
              d="M124 146H196"
              stroke="var(--gold)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
          </svg>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-16 grid w-full max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="border-l-2 border-[var(--crimson)] bg-white/5 p-4">
            <p className="text-4xl font-light text-[var(--crimson)] md:text-5xl">
              {metric.value}
            </p>
            <p className="mt-2 text-sm text-[#e9dfd9]">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
