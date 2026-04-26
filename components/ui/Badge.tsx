import { cn } from "@/lib/cn";

type BadgeVariant = "crimson" | "gold" | "neutral";

const variantClasses: Record<BadgeVariant, string> = {
  crimson: "bg-[var(--color-crimson-50)] text-[var(--color-crimson-900)]",
  gold: "bg-[var(--color-gold-100)] text-[var(--color-gold-700)]",
  neutral: "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]",
};

export function Badge({
  variant = "crimson",
  className,
  children,
}: {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
