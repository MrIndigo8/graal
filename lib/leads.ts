import { sendBitrixLead } from "@/lib/bitrix";
import { calculateLeadScore, qualifyLead } from "@/lib/lead-score";
import { sendTelegramLead } from "@/lib/telegram";
import type { LeadPayload, LeadResponse } from "@/lib/validation";

export async function processLead(lead: LeadPayload): Promise<LeadResponse> {
  const leadId = crypto.randomUUID();
  const score = calculateLeadScore(lead);
  const qualification = qualifyLead(score);

  const integrationPayload = { lead, leadId, score, qualification };
  const results = await Promise.allSettled([
    sendTelegramLead(integrationPayload),
    sendBitrixLead(integrationPayload),
  ]);

  const hasFailedIntegration = results.some(
    (result) =>
      result.status === "rejected" ||
      (result.status === "fulfilled" && result.value.status === "failed"),
  );

  return {
    ok: true,
    leadId,
    score,
    qualification,
    message: hasFailedIntegration
      ? "Заявка принята. Часть интеграций временно недоступна."
      : "Заявка принята. Смета будет готова за 48 часов.",
  };
}
