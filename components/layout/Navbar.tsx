import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { LangSwitcher } from "@/components/layout/lang-switcher";
import { Button } from "@/components/ui/button";

export async function Navbar({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-light)] bg-[var(--bg-primary)]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <Image src="/logo/graal-dark.svg" alt="Graal" width={32} height={32} />
          <span className="text-sm font-semibold tracking-[0.18em]">GRAAL</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-[var(--text-secondary)] md:flex">
          <a href={`/${locale}#services`} className="hover:text-[var(--text-primary)]">
            {t("services")}
          </a>
          <a href={`/${locale}#industries`} className="hover:text-[var(--text-primary)]">
            {t("industries")}
          </a>
          <a href={`/${locale}/cases`} className="hover:text-[var(--text-primary)]">
            {t("cases")}
          </a>
          <a href={`/${locale}/training`} className="hover:text-[var(--text-primary)]">
            {t("training")}
          </a>
          <a href={`/${locale}/careers`} className="hover:text-[var(--text-primary)]">
            {t("careers")}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitcher locale={locale} />
          <a href={`/${locale}#lead-form`}>
            <Button className="hidden md:inline-flex">{t("cta")}</Button>
          </a>
        </div>
      </div>
    </header>
  );
}
