import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(135deg,var(--color-crimson-400),var(--color-crimson-600))] text-white shadow-[0_10px_28px_rgba(133,36,29,0.26)] hover:brightness-105",
  secondary:
    "border border-[var(--color-gold-500)] bg-white/75 text-[var(--color-gold-700)] hover:bg-[var(--color-gold-100)]",
  ghost:
    "bg-transparent text-[var(--color-text-primary)] hover:text-[var(--color-crimson-600)]",
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
