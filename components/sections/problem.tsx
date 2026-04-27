"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";

export function ProblemSection() {
  const t = useTranslations("problem");
  const items = useMemo(
    () => t.raw("items") as Array<{ title: string; text: string }>,
    [t],
  );

  return (
    <section className="bg-[var(--bg-primary)] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "var(--font-cormorant)" }}>
          {t("title")}
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="border-l-2 border-l-[var(--crimson)]">
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{item.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
