import { getTranslations } from "next-intl/server";
import { SimplePage } from "@/components/shared/simple-page";

export default async function TrainingPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "pages.training" });
  const tCommon = await getTranslations({ locale: params.locale, namespace: "common" });
  const cards = t.raw("cards") as Array<{ title: string; text: string }>;

  return (
    <SimplePage
      locale={params.locale}
      title={t("title")}
      sub={t("sub")}
      ctaLabel={tCommon("requestProposal")}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article key={card.title} className="border border-[var(--border)] p-4">
            <h2 className="text-lg">{card.title}</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">{card.text}</p>
          </article>
        ))}
      </div>
    </SimplePage>
  );
}
