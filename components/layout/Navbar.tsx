import { ButtonLink } from "@/components/ui/Button";

export function Navbar({
  brandName,
  ctaLabel,
}: {
  brandName: string;
  ctaLabel: string;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[rgba(251,248,241,0.82)] backdrop-blur-xl">
      <nav className="mx-auto flex h-18 max-w-[var(--container-max)] items-center justify-between px-[var(--page-padding-x)]">
        <a className="group flex items-center gap-3" href="#">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-gold-500)] bg-[linear-gradient(135deg,var(--color-gold-100),#fff)] text-[10px] font-semibold tracking-[0.18em] text-[var(--color-gold-700)]">
            G
          </span>
          <span className="text-sm font-semibold tracking-[0.28em] text-[var(--color-text-primary)]">
            {brandName}
          </span>
        </a>

        <div className="hidden items-center gap-6 text-sm text-[var(--color-text-secondary)] md:flex">
          <a className="transition hover:text-[var(--color-crimson-400)]" href="#how-it-works">
            Процесс
          </a>
          <a className="transition hover:text-[var(--color-crimson-400)]" href="#niches">
            Ниши
          </a>
          <a className="transition hover:text-[var(--color-crimson-400)]" href="#cases">
            Кейсы
          </a>
          <a className="transition hover:text-[var(--color-crimson-400)]" href="#faq">
            FAQ
          </a>
        </div>

        <ButtonLink href="#lead-form" size="sm">
          {ctaLabel}
        </ButtonLink>
      </nav>
    </header>
  );
}
