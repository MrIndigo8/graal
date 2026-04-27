import type { LeadPayload, LeadQualification } from "@/lib/validation";

export function calculateLeadScore(lead: LeadPayload) {
  let score = 0;

  if (lead.stage === "growth") {
    score += 40;
  } else if (lead.stage === "early") {
    score += 30;
  } else {
    score += 20;
  }

  if (lead.service === "hybrid") {
    score += 25;
  } else if (lead.service === "outbound" || lead.service === "inbound") {
    score += 20;
  } else if (lead.service === "training") {
    score += 15;
  } else {
    score += 10;
  }

  if (
    lead.source?.utmSource ||
    lead.source?.utmMedium ||
    lead.source?.utmCampaign
  ) {
    score += 10;
  }

  if (
    lead.contact.includes("@") ||
    lead.contact.includes("http") ||
    lead.contact.includes("linkedin")
  ) {
    score += 10;
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
