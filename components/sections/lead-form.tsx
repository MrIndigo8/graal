"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { leadSchema, type LeadPayload } from "@/lib/validation";

const formSchema = leadSchema.pick({
  name: true,
  company: true,
  service: true,
  stage: true,
  contact: true,
  consent: true,
  website: true,
});

type FormValues = z.infer<typeof formSchema>;

export function LeadFormSection() {
  const t = useTranslations("leadForm");
  const locale = useLocale();
  const [resultMessage, setResultMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ??
    "https://calendly.com/free-sales-audit/graal-audit";

  const serviceOptions = useMemo(
    () => t.raw("serviceOptions") as Array<{ value: string; label: string }>,
    [t],
  );
  const stageOptions = useMemo(
    () => t.raw("stageOptions") as Array<{ value: string; label: string }>,
    [t],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      service: "not-sure",
      stage: "pre-revenue",
      contact: "",
      consent: true,
      website: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      setIsSubmitting(true);
      setResultMessage("");
      const params = new URLSearchParams(window.location.search);

      const payload: LeadPayload = {
        ...values,
        source: {
          page: window.location.pathname,
          locale,
          utmSource: params.get("utm_source") ?? undefined,
          utmMedium: params.get("utm_medium") ?? undefined,
          utmCampaign: params.get("utm_campaign") ?? undefined,
          utmContent: params.get("utm_content") ?? undefined,
          utmTerm: params.get("utm_term") ?? undefined,
        },
      };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { message?: string };
      setResultMessage(data.message ?? t("success"));
      if (response.ok) {
        form.reset();
      }
    } catch {
      setResultMessage(t("error"));
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <section id="lead-form" className="bg-[var(--bg-primary)] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "var(--font-cormorant)" }}>
            {t("title")}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-[var(--text-secondary)]">
            {t("sub")}
          </p>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <Input placeholder={t("nameLabel")} {...form.register("name")} />
          <Input placeholder={t("companyLabel")} {...form.register("company")} />

          <Select {...form.register("service")} aria-label={t("serviceLabel")}>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select {...form.register("stage")} aria-label={t("stageLabel")}>
            {stageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Input placeholder={t("contactLabel")} {...form.register("contact")} />
          <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...form.register("website")} />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "..." : t("submit")}
          </Button>

          <p className="text-xs text-[var(--text-muted)]">{t("privacy")}</p>
          {resultMessage ? <p className="text-sm text-[var(--gold)]">{resultMessage}</p> : null}
        </form>
      </div>
      <div className="mx-auto mt-8 w-full max-w-6xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
        <iframe
          title={t("calendlyTitle")}
          src={calendlyUrl}
          className="h-[620px] w-full border-0"
        />
      </div>
    </section>
  );
}
