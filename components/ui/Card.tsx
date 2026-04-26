import { cn } from "@/lib/cn";

type CardVariant = "base" | "accent" | "metric";

const variantClasses: Record<CardVariant, string> = {
  base: "border-[var(--color-border)] bg-white",
  accent:
    "border-[var(--color-border)] border-l-[var(--color-crimson-400)] bg-white hover:border-l-[var(--color-gold-500)] hover:shadow-lg",
  metric: "border-transparent bg-[var(--color-bg-secondary)]",
};

export function Card({
  variant = "base",
  className,
  children,
}: {
  variant?: CardVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "rounded-[var(--radius-card)] border p-[var(--card-padding)] transition",
        variant === "accent" ? "border-l-2" : "",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </article>
  );
}

export function ContentCard({
  title,
  text,
  eyebrow,
  className,
}: {
  title: string;
  text: string;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <Card variant="accent" className={className}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-gold-700)]">
          {eyebrow}
        </p>
      ) : null}
      <h3 className="text-xl font-medium text-[var(--color-text-primary)]">
        {title}
      </h3>
      <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">
        {text}
      </p>
    </Card>
  );
}
