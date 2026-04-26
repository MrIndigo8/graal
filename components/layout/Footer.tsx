import Link from "next/link";

export function Footer({ brandName }: { brandName: string }) {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(243,236,223,0.45),rgba(251,248,241,0.96))] px-[var(--page-padding-x)] py-10 text-sm text-[var(--color-text-secondary)]">
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <p>{brandName} © 2026. Sales outsourcing and AI automation.</p>
        <nav className="flex flex-wrap justify-center gap-4 md:justify-end">
          <Link className="transition hover:text-[var(--color-crimson-400)]" href="/privacy">
            Privacy
          </Link>
          <Link className="transition hover:text-[var(--color-crimson-400)]" href="/#lead-form">
            Получить смету
          </Link>
          <Link className="transition hover:text-[var(--color-crimson-400)]" href="/#faq">
            FAQ
          </Link>
        </nav>
      </div>
    </footer>
  );
}
