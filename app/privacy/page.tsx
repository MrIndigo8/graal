import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Грааль",
  description:
    "Как Грааль обрабатывает данные из форм, заявок, аналитики и коммуникаций.",
};

const sections = [
  {
    title: "1. Какие данные мы собираем",
    text: [
      "Данные, которые вы оставляете в формах: имя, компания, ниша, средний чек, размер команды, контакт, комментарий к задаче.",
      "Технические данные заявки: страница отправки, язык, UTM-метки, источник перехода и служебный lead score.",
      "Данные коммуникации, если вы продолжаете общение в Telegram, WhatsApp, email, CRM или на звонке.",
    ],
  },
  {
    title: "2. Зачем мы используем данные",
    text: [
      "Чтобы подготовить смету, состав команды, рекомендации по стеку и план запуска продаж.",
      "Чтобы связаться с вами по указанному каналу и уточнить задачу.",
      "Чтобы анализировать качество заявок и улучшать сайт, формы и маркетинговые кампании без передачи персональных данных в аналитику.",
    ],
  },
  {
    title: "3. Куда передаются данные",
    text: [
      "Заявки могут передаваться в CRM, Telegram-уведомления команды, email или другие рабочие инструменты обработки лидов.",
      "Мы не продаём персональные данные третьим лицам.",
      "Сервисные провайдеры используются только для обработки заявок, хостинга, аналитики, коммуникаций и CRM-процессов.",
    ],
  },
  {
    title: "4. Аналитика и cookies",
    text: [
      "В MVP сайт может использовать техническую аналитику без передачи персональных данных.",
      "Рекламные пиксели, heatmaps и расширенный трекинг должны подключаться только после внедрения cookie/consent механики.",
      "В аналитику не отправляются телефон, email, мессенджеры, имя, компания и комментарии из формы.",
    ],
  },
  {
    title: "5. Срок хранения",
    text: [
      "Данные заявок хранятся столько, сколько необходимо для обработки запроса, продаж, договорных отношений и внутренней отчётности.",
      "Если сотрудничество не началось, вы можете запросить удаление или уточнение данных.",
    ],
  },
  {
    title: "6. Ваши права",
    text: [
      "Вы можете запросить доступ к своим данным, исправление, ограничение обработки или удаление.",
      "Для запроса используйте тот же канал связи, через который вы оставляли заявку, или напишите на контакт компании.",
    ],
  },
  {
    title: "7. Безопасность",
    text: [
      "Секретные ключи и интеграционные токены хранятся только в server-side environment variables.",
      "Формы проходят клиентскую и серверную валидацию, а отправка заявок защищается от базового спама.",
      "Доступ к админке конструктора защищается отдельным admin token.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="lux-main min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar brandName="ГРААЛЬ" ctaLabel="Получить смету" />

      <section className="mx-auto max-w-4xl px-[var(--page-padding-x)] py-[var(--section-padding-y)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-crimson-400)]">
          Privacy
        </p>
        <h1 className="mt-4 font-[var(--font-cormorant)] text-[length:var(--h1-fluid)] leading-none text-[var(--color-text-primary)]">
          Политика конфиденциальности
        </h1>
        <p className="mt-6 text-lg leading-8 text-[var(--color-text-secondary)]">
          Этот документ описывает, как сайт Грааль обрабатывает данные из форм
          заявок, коммуникаций, аналитики и админки. Документ является рабочей
          версией для MVP и должен быть юридически проверен перед масштабным
          рекламным запуском.
        </p>

        <div className="mt-12 grid gap-5">
          {sections.map((section) => (
            <article
              className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-[var(--card-padding)]"
              key={section.title}
            >
              <h2 className="text-2xl font-medium text-[var(--color-text-primary)]">
                {section.title}
              </h2>
              <div className="mt-4 grid gap-3 text-[var(--color-text-secondary)]">
                {section.text.map((paragraph) => (
                  <p className="leading-7" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm text-[var(--color-text-muted)]">
          Последнее обновление: апрель 2026.
        </p>
      </section>

      <Footer brandName="ГРААЛЬ" />
    </main>
  );
}
