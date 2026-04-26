import { cn } from "@/lib/cn";

type BadgeVariant = "crimson" | "gold" | "neutral";

const variantClasses: Record<BadgeVariant, string> = {
  crimson:
    "bg-[linear-gradient(135deg,var(--color-crimson-50),#fff)] text-[var(--color-crimson-900)] border border-[rgba(181,58,47,0.22)]",
  gold:
    "bg-[linear-gradient(135deg,var(--color-gold-100),#fff)] text-[var(--color-gold-700)] border border-[rgba(184,147,67,0.32)]",
  neutral:
    "bg-[linear-gradient(135deg,var(--color-bg-secondary),#fff)] text-[var(--color-text-secondary)] border border-[var(--color-border)]",
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
