import { env, hasTelegramConfig } from "@/config/env";
import type { LeadPayload, LeadQualification } from "@/lib/validation";

export type IntegrationResult = {
  service: "telegram" | "bitrix24";
  status: "sent" | "skipped" | "failed";
  error?: string;
};

type TelegramLead = {
  lead: LeadPayload;
  leadId: string;
  score: number;
  qualification: LeadQualification;
};

function formatLeadMessage({
  lead,
  leadId,
  score,
  qualification,
}: TelegramLead) {
  return [
    "Новая заявка - Грааль",
    "",
    `ID: ${leadId}`,
    `Квалификация: ${qualification}`,
    `Lead score: ${score}`,
    "",
    `Имя: ${lead.name}`,
    `Компания: ${lead.company}`,
    `Ниша: ${lead.niche}`,
    `Средний чек: ${lead.avgDeal}`,
    `Размер команды: ${lead.teamSize}`,
    `Контакт: ${lead.messenger} / ${lead.contact}`,
    lead.comment ? `Комментарий: ${lead.comment}` : undefined,
    "",
    `Страница: ${lead.source?.page ?? "-"}`,
    `UTM: ${lead.source?.utmSource ?? "-"}/${lead.source?.utmCampaign ?? "-"}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendTelegramLead(
  payload: TelegramLead,
): Promise<IntegrationResult> {
  if (!hasTelegramConfig()) {
    return { service: "telegram", status: "skipped" };
  }

  const response = await fetch(
    `https://api.telegram.org/bot${env.telegramBotToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.telegramChatId,
        text: formatLeadMessage(payload),
        disable_web_page_preview: true,
      }),
    },
  );

  if (!response.ok) {
    return {
      service: "telegram",
      status: "failed",
      error: `Telegram responded with ${response.status}`,
    };
  }

  return { service: "telegram", status: "sent" };
}
