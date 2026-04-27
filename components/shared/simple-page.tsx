import Link from "next/link";

type SimplePageProps = {
  title: string;
  sub: string;
  children?: React.ReactNode;
  locale: string;
  ctaLabel: string;
};

export function SimplePage({ title, sub, children, locale, ctaLabel }: SimplePageProps) {
  return (
    <main className="bg-[var(--bg-primary)] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-4xl">
        <p className="text-xs uppercase tracking-[0.06em] text-[var(--crimson)]">Graal</p>
        <h1 className="mt-3 text-5xl md:text-6xl" style={{ fontFamily: "var(--font-cormorant)" }}>
          {title}
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--text-secondary)]">{sub}</p>

        <div className="mt-8 border border-[var(--border)] bg-white p-6">{children}</div>

        <Link href={`/${locale}#lead-form`} className="mt-6 inline-block text-sm text-[var(--crimson)]">
          {ctaLabel} →
        </Link>
      </div>
    </main>
  );
}
