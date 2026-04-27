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
    TITLE: `Graal: ${lead.company} / ${lead.service}`,
    NAME: lead.name,
    COMPANY_TITLE: lead.company,
    COMMENTS: [
      `Lead ID: ${leadId}`,
      `Qualification: ${qualification}`,
      `Lead score: ${score}`,
      `Contact: ${lead.contact}`,
      `Stage: ${lead.stage}`,
      `Service: ${lead.service}`,
      `Page: ${lead.source?.page ?? "-"}`,
      `UTM: ${lead.source?.utmSource ?? "-"}/${lead.source?.utmCampaign ?? "-"}`,
    ]
      .filter(Boolean)
      .join("\n"),
    SOURCE_ID: "WEB",
    UF_CRM_SERVICE: lead.service,
    UF_CRM_STAGE: lead.stage,
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
