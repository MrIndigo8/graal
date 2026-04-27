import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

function mergeMessages(
  base: Record<string, unknown>,
  patch: Record<string, unknown>,
): Record<string, unknown> {
  const output = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      output[key] &&
      typeof output[key] === "object" &&
      !Array.isArray(output[key])
    ) {
      output[key] = mergeMessages(
        output[key] as Record<string, unknown>,
        value as Record<string, unknown>,
      );
    } else {
      output[key] = value;
    }
  }
  return output;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const nextLocale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const base = (await import("../messages/en.json")).default;
  const localized =
    nextLocale === "en"
      ? {}
      : (await import(`../messages/${nextLocale}.json`)).default;

  return {
    locale: nextLocale,
    messages: mergeMessages(base, localized),
  };
});
