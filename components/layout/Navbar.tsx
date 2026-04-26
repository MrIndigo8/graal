import { ButtonLink } from "@/components/ui/Button";

export function Navbar({
  brandName,
  ctaLabel,
}: {
  brandName: string;
  ctaLabel: string;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-18 max-w-[var(--container-max)] items-center justify-between px-[var(--page-padding-x)]">
        <a className="text-sm font-semibold tracking-[0.28em]" href="#">
          {brandName}
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
