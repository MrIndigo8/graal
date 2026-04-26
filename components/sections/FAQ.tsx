import { Section } from "@/components/sections/Section";
import type { faq } from "@/content/faq";

export function FAQSection({ items }: { items: typeof faq }) {
  return (
    <Section id="faq" title="FAQ">
      <div className="grid gap-4">
        {items.map((item) => (
          <details
            className="group rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-5"
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
  );
}
