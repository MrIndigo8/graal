import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const routes = [
  "",
  "/outbound",
  "/inbound",
  "/hybrid",
  "/training",
  "/careers",
  "/quiz",
  "/cases",
  "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://graal.agency";
  const now = new Date();

  return routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${base}/${locale}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
  );
}
