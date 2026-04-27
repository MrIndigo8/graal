import { getTranslations } from "next-intl/server";
import { SimplePage } from "@/components/shared/simple-page";
import { getCareerPositions } from "@/lib/sanity";

export default async function CareersPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "pages.careers" });
  const tCommon = await getTranslations({ locale: params.locale, namespace: "common" });
  const roles = t.raw("roles") as string[];
  const positions = await getCareerPositions(params.locale);

  return (
    <SimplePage
      locale={params.locale}
      title={t("title")}
      sub={t("sub")}
      ctaLabel={tCommon("requestProposal")}
    >
      <div className="space-y-4">
        <ul className="list-disc space-y-2 pl-5 text-sm text-[var(--text-secondary)]">
          {roles.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="space-y-2">
          {positions.map((position) => (
            <article
              key={position.title}
              className="border border-[var(--border)] bg-[var(--bg-secondary)] p-3"
            >
              <h2 className="text-sm font-medium">{position.title}</h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{position.requirement}</p>
            </article>
          ))}
        </div>

        <form className="grid gap-3 md:grid-cols-2">
          <input className="h-11 border border-[var(--border)] px-3" placeholder={t("form.name")} />
          <input className="h-11 border border-[var(--border)] px-3" placeholder={t("form.role")} />
          <input className="h-11 border border-[var(--border)] px-3 md:col-span-2" placeholder={t("form.linkedin")} />
          <textarea
            className="min-h-[120px] border border-[var(--border)] p-3 md:col-span-2"
            placeholder={t("form.pitch")}
          />
          <button
            type="button"
            className="h-11 border border-[var(--crimson)] bg-[var(--crimson)] px-5 text-sm text-white md:col-span-2"
          >
            {t("form.submit")}
          </button>
        </form>
      </div>
    </SimplePage>
  );
}
