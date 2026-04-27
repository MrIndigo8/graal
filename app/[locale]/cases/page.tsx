import { getTranslations } from "next-intl/server";
import { SimplePage } from "@/components/shared/simple-page";
import { getCaseStudies } from "@/lib/sanity";

export default async function CasesPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "pages.cases" });
  const tCommon = await getTranslations({ locale: params.locale, namespace: "common" });
  const columns = t.raw("columns") as string[];
  const caseStudies = await getCaseStudies(params.locale);

  return (
    <SimplePage
      locale={params.locale}
      title={t("title")}
      sub={t("sub")}
      ctaLabel={tCommon("requestProposal")}
    >
      <div className="grid gap-3 text-sm text-[var(--text-secondary)] md:grid-cols-4">
        {columns.map((column) => (
          <div key={column} className="border border-[var(--border)] p-3">
            {column}
          </div>
        ))}
      </div>

      <div className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
        {caseStudies.map((caseStudy, index) => (
          <div key={`${caseStudy.niche}-${index}`} className="grid gap-3 md:grid-cols-4">
            <div className="border border-[var(--border)] p-3">{caseStudy.niche}</div>
            <div className="border border-[var(--border)] p-3">{caseStudy.challenge}</div>
            <div className="border border-[var(--border)] p-3">{caseStudy.team}</div>
            <div className="border border-[var(--border)] p-3">{caseStudy.result}</div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-[var(--text-secondary)]">{t("empty")}</p>
    </SimplePage>
  );
}
