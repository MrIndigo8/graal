import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-crimson-400)] text-white hover:bg-[var(--color-crimson-600)]",
  secondary:
    "border border-[var(--color-crimson-400)] bg-transparent text-[var(--color-crimson-400)] hover:bg-[var(--color-crimson-50)]",
  ghost:
    "bg-transparent text-[var(--color-text-primary)] hover:text-[var(--color-crimson-400)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 py-2 text-sm",
  md: "min-h-12 px-5 py-3 text-sm",
  lg: "min-h-14 px-6 py-4 text-base",
};

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius-button)] font-medium transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-500)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}

type ButtonLinkProps = {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius-button)] font-medium transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-500)] focus:ring-offset-2",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      href={href}
    >
      {children}
    </a>
  );
}
