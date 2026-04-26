import { cn } from "@/lib/cn";

const controlClasses =
  "min-h-12 rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-4 py-3 text-base text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-crimson-400)] focus:ring-2 focus:ring-[var(--color-crimson-50)] disabled:cursor-not-allowed disabled:opacity-60";

function Label({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[var(--color-text-primary)]">
      {label}
      {children}
      {error ? (
        <span className="text-sm font-normal text-[var(--color-crimson-600)]">
          {error}
        </span>
      ) : null}
    </label>
  );
}

export function Input({
  label,
  error,
  className,
  ...props
}: {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Label label={label} error={error}>
      <input className={cn(controlClasses, className)} {...props} />
    </Label>
  );
}

export function Select({
  label,
  error,
  className,
  children,
  ...props
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Label label={label} error={error}>
      <select className={cn(controlClasses, className)} {...props}>
        {children}
      </select>
    </Label>
  );
}

export function Textarea({
  label,
  error,
  className,
  ...props
}: {
  label: string;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Label label={label} error={error}>
      <textarea
        className={cn(controlClasses, "min-h-32", className)}
        {...props}
      />
    </Label>
  );
}
