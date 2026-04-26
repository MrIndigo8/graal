import type { CalculatorTeamSize } from "@/config/calculator";

type NichePageContent = {
  slug: "it" | "igaming" | "infobusiness";
  nicheValue: "it" | "igaming" | "infobusiness";
  title: string;
  subtitle: string;
  challengeTitle: string;
  challenges: string[];
  deliverablesTitle: string;
  deliverables: string[];
  metricsTitle: string;
  metrics: string[];
  cta: string;
  presetTeamSize: CalculatorTeamSize;
};

export const nichePages: Record<NichePageContent["slug"], NichePageContent> = {
  it: {
    slug: "it",
    nicheValue: "it",
    title: "Команда продаж для IT / SaaS",
    subtitle:
      "Запускаем B2B outbound-процесс: SDR/BDR, базы, CRM, outreach и ежедневная управляемость pipeline.",
    challengeTitle: "Типичные боли IT/SaaS",
    challenges: [
      "Есть продукт, но нет стабильного исходящего pipeline.",
      "Лиды приходят нерегулярно, CAC непредсказуем.",
      "SDR нанимать долго, онбординг съедает месяцы.",
      "Нет связки база → outreach → CRM → отчётность.",
    ],
    deliverablesTitle: "Что вы получаете",
    deliverables: [
      "SDR/BDR-команду под ваш ICP и географию.",
      "Сборку баз Apollo/Clay/LinkedIn с верификацией.",
      "Outreach-связки email + LinkedIn + звонки.",
      "CRM-процесс и KPI-дашборд для прозрачного контроля.",
    ],
    metricsTitle: "Ключевые метрики",
    metrics: [
      "qualified meetings / month",
      "cost per qualified lead",
      "pipeline velocity",
      "win rate по сегментам",
    ],
    cta: "Получить IT/SaaS смету за 48 часов",
    presetTeamSize: "3-5",
  },
  igaming: {
    slug: "igaming",
    nicheValue: "igaming",
    title: "BizDev и продажи для iGaming / Fintech",
    subtitle:
      "Помогаем выстроить партнёрскую и B2B-коммерческую систему: BizDev, интеграции, переговоры, воронка сделок.",
    challengeTitle: "Типичные боли iGaming / Fintech",
    challenges: [
      "Сложный рынок с высокой ценой ошибки в партнёрствах.",
      "Нужны люди, которые понимают compliance и интеграции.",
      "Нет структуры по приоритету операторов и партнёров.",
      "Длинные сделки без единого контроля этапов.",
    ],
    deliverablesTitle: "Что вы получаете",
    deliverables: [
      "BizDev-лид с нишевой экспертизой.",
      "Процесс приоритезации и выхода на партнёров.",
      "Коммуникационные сценарии под разные типы контрагентов.",
      "Единый трекер переговоров, этапов и ответственности.",
    ],
    metricsTitle: "Ключевые метрики",
    metrics: [
      "партнёрские встречи / месяц",
      "конверсия в коммерческие этапы",
      "средняя длительность сделки",
      "количество активных интеграционных диалогов",
    ],
    cta: "Получить iGaming/Fintech смету за 48 часов",
    presetTeamSize: "3-5",
  },
  infobusiness: {
    slug: "infobusiness",
    nicheValue: "infobusiness",
    title: "Система закрытия для инфобизнеса",
    subtitle:
      "Упаковываем отдел продаж под входящий трафик: РОП, close-команда, скрипты, апселлы, реактивация.",
    challengeTitle: "Типичные боли инфобизнеса",
    challenges: [
      "Лидов много, но конверсия в оплату нестабильна.",
      "Нет единого стандарта качества звонков.",
      "Менеджеры работают на разных скриптах и по-разному закрывают.",
      "Слабая реактивация базы и недополученная выручка.",
    ],
    deliverablesTitle: "Что вы получаете",
    deliverables: [
      "РОП и закрывающую команду под объём входящих лидов.",
      "Скрипты, таблицу возражений и апселл-цепочки.",
      "Регулярный контроль качества звонков и отчётность.",
      "Систему реактивации старой базы.",
    ],
    metricsTitle: "Ключевые метрики",
    metrics: [
      "lead-to-sale conversion",
      "average check uplift",
      "reactivation revenue share",
      "скорость обработки входящего лида",
    ],
    cta: "Получить смету для инфобизнеса",
    presetTeamSize: "5-10",
  },
};
