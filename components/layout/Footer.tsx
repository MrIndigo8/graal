import { getTranslations } from "next-intl/server";

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "footer" });

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 md:px-10 md:py-10">
        <p className="text-xs uppercase tracking-[0.06em] text-[var(--text-muted)]">
          {t("tagline")}
        </p>
        <p className="text-sm text-[var(--text-secondary)]">{t("copy")}</p>
      </div>
    </footer>
  );
}
