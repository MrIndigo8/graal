import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const colorSchema = z.object({
  bgPrimary: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  bgSecondary: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  bgDark: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  crimson: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  crimsonHover: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  crimsonSoft: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  gold: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  goldDark: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  textPrimary: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  textSecondary: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  border: z.string().regex(/^#[0-9a-fA-F]{6}$/),
});

const itemSchema = z.object({
  title: z.string().trim().min(1).max(120),
  text: z.string().trim().min(1).max(500),
});

const blockSchema = z.object({
  id: z.string().trim().min(1).max(80),
  type: z.enum(["hero", "cards"]),
  enabled: z.boolean(),
  eyebrow: z.string().trim().max(160).optional(),
  title: z.string().trim().min(1).max(180),
  body: z.string().trim().max(1000).optional(),
  columns: z.number().int().min(1).max(4).optional(),
  items: z.array(itemSchema).min(1).max(12),
});

export const siteConfigSchema = z.object({
  version: z.number().int().min(1),
  brand: z.object({
    name: z.string().trim().min(1).max(80),
    tagline: z.string().trim().min(1).max(160),
  }),
  theme: z.object({
    colors: colorSchema,
    typography: z.object({
      headingFont: z.string().trim().min(1).max(80),
      bodyFont: z.string().trim().min(1).max(80),
      headingScale: z.number().min(0.8).max(1.3),
      bodyScale: z.number().min(0.9).max(1.2),
    }),
    shape: z.object({
      radius: z.number().int().min(0).max(32),
      buttonRadius: z.number().int().min(0).max(32),
      cardPadding: z.number().int().min(16).max(48),
    }),
    layout: z.object({
      containerMaxWidth: z.number().int().min(960).max(1440),
      sectionPaddingDesktop: z.number().int().min(64).max(160),
      sectionPaddingMobile: z.number().int().min(40).max(96),
    }),
  }),
  buttons: z.object({
    primaryLabel: z.string().trim().min(1).max(80),
    secondaryLabel: z.string().trim().min(1).max(80),
    finalCtaLabel: z.string().trim().min(1).max(100),
  }),
  form: z.object({
    title: z.string().trim().min(1).max(180),
    subtitle: z.string().trim().min(1).max(500),
    submitLabel: z.string().trim().min(1).max(100),
    successMessage: z.string().trim().min(1).max(200),
  }),
  blocks: z.array(blockSchema).min(1).max(20),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type SiteConfigStorage = "supabase" | "file";

const configPath = path.join(process.cwd(), "data", "site-config.json");
const siteConfigKey = process.env.SITE_CONFIG_KEY ?? "main";

function hasSupabaseConfig() {
  return Boolean(
    process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

function getSupabaseAdmin() {
  if (!hasSupabaseConfig()) {
    return null;
  }

  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

async function getFileConfig() {
  const raw = await readFile(configPath, "utf8");
  return siteConfigSchema.parse(JSON.parse(raw));
}

async function saveFileConfig(config: SiteConfig) {
  const parsed = siteConfigSchema.parse(config);
  await writeFile(configPath, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");
  return parsed;
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return getFileConfig();
  }

  const { data, error } = await supabase
    .from("site_configs")
    .select("config")
    .eq("key", siteConfigKey)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load Supabase site config: ${error.message}`);
  }

  if (!data?.config) {
    const fallback = await getFileConfig();
    await saveSiteConfig(fallback);
    return fallback;
  }

  return siteConfigSchema.parse(data.config);
}

export async function saveSiteConfig(config: SiteConfig) {
  const parsed = siteConfigSchema.parse(config);

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return saveFileConfig(parsed);
  }

  const { error } = await supabase.from("site_configs").upsert(
    {
      key: siteConfigKey,
      config: parsed,
      updated_by: "graal-admin",
    },
    { onConflict: "key" },
  );

  if (error) {
    throw new Error(`Failed to save Supabase site config: ${error.message}`);
  }

  return parsed;
}

export function getSiteConfigStorage(): SiteConfigStorage {
  return hasSupabaseConfig() ? "supabase" : "file";
}
