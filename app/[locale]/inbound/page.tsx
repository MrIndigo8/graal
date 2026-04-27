import { getTranslations } from "next-intl/server";
import { SimplePage } from "@/components/shared/simple-page";

export default async function InboundPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "pages.inbound" });
  const tCommon = await getTranslations({ locale: params.locale, namespace: "common" });
  const bullets = t.raw("bullets") as string[];

  return (
    <SimplePage
      locale={params.locale}
      title={t("title")}
      sub={t("sub")}
      ctaLabel={tCommon("requestProposal")}
    >
      <ul className="list-disc space-y-2 pl-5 text-sm text-[var(--text-secondary)]">
        {bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </SimplePage>
  );
}
