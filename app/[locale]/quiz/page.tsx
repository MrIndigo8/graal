import { getTranslations } from "next-intl/server";
import { SimplePage } from "@/components/shared/simple-page";
import { RevenueQuiz } from "@/components/sections/revenue-quiz";

export default async function QuizPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "pages.quiz" });
  const tCommon = await getTranslations({ locale: params.locale, namespace: "common" });

  return (
    <SimplePage
      locale={params.locale}
      title={t("title")}
      sub={t("sub")}
      ctaLabel={tCommon("requestProposal")}
    >
      <RevenueQuiz />
    </SimplePage>
  );
}
