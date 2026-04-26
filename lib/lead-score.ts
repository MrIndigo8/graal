import type { LeadPayload, LeadQualification } from "@/lib/validation";

export function calculateLeadScore(lead: LeadPayload) {
  let score = 0;

  if (lead.avgDeal === "5-20k" || lead.avgDeal === "gt-20k") {
    score += 30;
  }

  if (["3-5", "5-10", "10-plus"].includes(lead.teamSize)) {
    score += 20;
  }

  if (["it", "igaming", "infobusiness"].includes(lead.niche)) {
    score += 20;
  }

  if ((lead.comment?.length ?? 0) > 30) {
    score += 15;
  }

  if (
    lead.source?.utmSource ||
    lead.source?.utmMedium ||
    lead.source?.utmCampaign
  ) {
    score += 10;
  }

  if (lead.avgDeal === "lt-1k") {
    score -= 40;
  }

  return Math.max(0, score);
}

export function qualifyLead(score: number): LeadQualification {
  if (score >= 70) {
    return "hot";
  }

  if (score >= 40) {
    return "warm";
  }

  return "low-fit";
}
