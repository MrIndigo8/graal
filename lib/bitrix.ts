import { env, hasBitrixConfig } from "@/config/env";
import type { IntegrationResult } from "@/lib/telegram";
import type { LeadPayload, LeadQualification } from "@/lib/validation";

type BitrixLead = {
  lead: LeadPayload;
  leadId: string;
  score: number;
  qualification: LeadQualification;
};

function mapLeadToBitrixFields({
  lead,
  leadId,
  score,
  qualification,
}: BitrixLead) {
  return {
    TITLE: `Грааль: ${lead.company} / ${lead.niche}`,
    NAME: lead.name,
    COMPANY_TITLE: lead.company,
    COMMENTS: [
      lead.comment,
      `Lead ID: ${leadId}`,
      `Qualification: ${qualification}`,
      `Lead score: ${score}`,
      `Messenger: ${lead.messenger}`,
      `Contact: ${lead.contact}`,
      `Page: ${lead.source?.page ?? "-"}`,
      `UTM: ${lead.source?.utmSource ?? "-"}/${lead.source?.utmCampaign ?? "-"}`,
    ]
      .filter(Boolean)
      .join("\n"),
    SOURCE_ID: "WEB",
    UF_CRM_NICHE: lead.niche,
    UF_CRM_AVG_DEAL: lead.avgDeal,
    UF_CRM_TEAM_SIZE: lead.teamSize,
    UF_CRM_LANGUAGE: lead.source?.locale ?? "ru",
    UF_CRM_PAGE_PATH: lead.source?.page,
    UF_CRM_UTM_SOURCE: lead.source?.utmSource,
    UF_CRM_UTM_MEDIUM: lead.source?.utmMedium,
    UF_CRM_UTM_CAMPAIGN: lead.source?.utmCampaign,
    UF_CRM_LEAD_SCORE: score,
  };
}

export async function sendBitrixLead(
  payload: BitrixLead,
): Promise<IntegrationResult> {
  if (!hasBitrixConfig()) {
    return { service: "bitrix24", status: "skipped" };
  }

  const response = await fetch(env.bitrix24WebhookUrl!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: mapLeadToBitrixFields(payload),
      params: { REGISTER_SONET_EVENT: "Y" },
    }),
  });

  if (!response.ok) {
    return {
      service: "bitrix24",
      status: "failed",
      error: `Bitrix24 responded with ${response.status}`,
    };
  }

  return { service: "bitrix24", status: "sent" };
}
