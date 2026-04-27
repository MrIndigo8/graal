import { z } from "zod";

const contactPattern =
  /^(@[a-zA-Z0-9_]{3,32}|[^\s@]+@[^\s@]+\.[^\s@]+|\+?[0-9\s().-]{7,24})$/;

export const leadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  company: z.string().trim().min(2).max(120),
  service: z.enum(["outbound", "inbound", "hybrid", "training", "not-sure"]),
  stage: z.enum(["pre-revenue", "early", "growth"]),
  contact: z.string().trim().min(3).max(120).regex(contactPattern),
  consent: z.literal(true),
  source: z
    .object({
      page: z.string().trim().max(200).optional(),
      locale: z.string().trim().max(10).optional(),
      utmSource: z.string().trim().max(120).optional(),
      utmMedium: z.string().trim().max(120).optional(),
      utmCampaign: z.string().trim().max(160).optional(),
      utmContent: z.string().trim().max(160).optional(),
      utmTerm: z.string().trim().max(160).optional(),
    })
    .optional(),
  website: z.string().max(200).optional(),
});

export type LeadPayload = z.infer<typeof leadSchema>;

export type LeadQualification = "hot" | "warm" | "low-fit";

export type LeadResponse = {
  ok: boolean;
  leadId?: string;
  score?: number;
  qualification?: LeadQualification;
  partial?: boolean;
  message: string;
};
