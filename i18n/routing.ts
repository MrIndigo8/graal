import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ru", "es", "pl"],
  defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];
