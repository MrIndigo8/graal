import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-none border border-[var(--border)] bg-[var(--bg-card)] p-6 transition duration-200 hover:scale-[1.01] hover:shadow-lg hover:shadow-[rgba(26,17,14,0.06)]",
        className,
      )}
      {...props}
    />
  );
}
