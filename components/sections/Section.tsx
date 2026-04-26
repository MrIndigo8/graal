import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({
  id,
  title,
  eyebrow,
  children,
  className,
}: {
  id?: string;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto max-w-[var(--container-max)] px-[var(--page-padding-x)] py-[var(--section-padding-y)]",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-700)]">
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h2 className="mb-10 font-[var(--font-cormorant)] text-[length:var(--h2-fluid)] text-[var(--color-text-primary)]">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
