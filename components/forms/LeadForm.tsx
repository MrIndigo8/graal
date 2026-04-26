"use client";

import { FormEvent, ReactNode, useState } from "react";
import { leadSchema } from "@/lib/validation";

type SubmitState = "idle" | "loading" | "success" | "error";

export function LeadForm({
  submitLabel = "Получить смету за 48 часов",
  successMessage = "Заявка принята. Смета будет готова за 48 часов.",
}: {
  submitLabel?: string;
  successMessage?: string;
}) {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const params = new URLSearchParams(window.location.search);

    const payload = {
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      niche: String(formData.get("niche") ?? "other"),
      avgDeal: String(formData.get("avgDeal") ?? "1-5k"),
      teamSize: String(formData.get("teamSize") ?? "1-2"),
      messenger: String(formData.get("messenger") ?? "telegram"),
      contact: String(formData.get("contact") ?? ""),
      comment: String(formData.get("comment") ?? ""),
      consent: formData.get("consent") === "on",
      website: String(formData.get("website") ?? ""),
      source: {
        page: window.location.pathname,
        locale: "ru",
        utmSource: params.get("utm_source") ?? undefined,
        utmMedium: params.get("utm_medium") ?? undefined,
        utmCampaign: params.get("utm_campaign") ?? undefined,
        utmContent: params.get("utm_content") ?? undefined,
        utmTerm: params.get("utm_term") ?? undefined,
      },
    };

    const parsed = leadSchema.safeParse(payload);

    if (!parsed.success) {
      setState("error");
      setMessage("Проверьте обязательные поля и формат контакта.");
      return;
    }

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    const result = await response.json();

    if (!response.ok && response.status !== 202) {
      setState("error");
      setMessage(result.message ?? "Не удалось отправить заявку.");
      return;
    }

    setState("success");
    setMessage(result.message ?? successMessage);
    form.reset();
  }

  return (
    <form
      id="lead-form"
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-lg border border-[var(--color-border)] bg-white p-6 shadow-sm"
    >
      <input
        className="hidden"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Ваше имя" name="name" placeholder="Иван" />
        <Field label="Компания" name="company" placeholder="Graal Agency" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Select label="Ниша" name="niche">
          <option value="it">IT / SaaS</option>
          <option value="igaming">iGaming / Fintech</option>
          <option value="infobusiness">Инфобизнес</option>
          <option value="ai">ИИ-автоматизация</option>
          <option value="other">Другое</option>
        </Select>
        <Select label="Средний чек" name="avgDeal">
          <option value="lt-1k">до €1k</option>
          <option value="1-5k">€1-5k</option>
          <option value="5-20k">€5-20k</option>
          <option value="gt-20k">больше €20k</option>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Select label="Нужно людей" name="teamSize">
          <option value="1-2">1-2</option>
          <option value="3-5">3-5</option>
          <option value="5-10">5-10</option>
          <option value="10-plus">10+</option>
        </Select>
        <Select label="Канал связи" name="messenger">
          <option value="telegram">Telegram</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="email">Email</option>
          <option value="phone">Телефон</option>
        </Select>
      </div>

      <Field label="Контакт" name="contact" placeholder="@username, email или телефон" />

      <label className="grid gap-2 text-sm font-medium text-[var(--color-text-primary)]">
        Кратко о задаче
        <textarea
          name="comment"
          rows={4}
          className="rounded border border-[var(--color-border)] bg-white px-4 py-3 text-base outline-none transition focus:border-[var(--color-crimson-400)]"
          placeholder="Например: нужен outbound для SaaS на рынок Польши"
        />
      </label>

      <label className="flex gap-3 text-sm leading-6 text-[var(--color-text-secondary)]">
        <input name="consent" type="checkbox" className="mt-1 size-4" />
        <span>
          Я согласен на обработку данных и понимаю, что со мной свяжутся для
          подготовки сметы.
        </span>
      </label>

      <button
        type="submit"
        disabled={state === "loading"}
        className="rounded bg-[var(--color-crimson-400)] px-6 py-4 font-medium text-white transition hover:bg-[var(--color-crimson-600)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "loading" ? "Отправляем..." : submitLabel}
      </button>

      {message ? (
        <p
          className={
            state === "success"
              ? "text-sm text-[var(--color-crimson-900)]"
              : "text-sm text-[var(--color-crimson-600)]"
          }
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[var(--color-text-primary)]">
      {label}
      <input
        name={name}
        className="rounded border border-[var(--color-border)] bg-white px-4 py-3 text-base outline-none transition focus:border-[var(--color-crimson-400)]"
        placeholder={placeholder}
      />
    </label>
  );
}

function Select({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[var(--color-text-primary)]">
      {label}
      <select
        name={name}
        className="rounded border border-[var(--color-border)] bg-white px-4 py-3 text-base outline-none transition focus:border-[var(--color-crimson-400)]"
      >
        {children}
      </select>
    </label>
  );
}
