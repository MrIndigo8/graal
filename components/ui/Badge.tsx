import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-none border border-[var(--border)] bg-[var(--crimson-light)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--crimson-dark)]",
        className,
      )}
      {...props}
    />
  );
}
