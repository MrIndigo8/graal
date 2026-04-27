"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

function stripLocale(pathname: string) {
  const parts = pathname.split("/");
  if (parts.length > 1 && routing.locales.includes(parts[1] as never)) {
    return `/${parts.slice(2).join("/")}`;
  }
  return pathname;
}

export function LangSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const normalizedPath = stripLocale(pathname || "/");

  return (
    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.06em]">
      {routing.locales.map((loc) => (
        <Link
          key={loc}
          href={`/${loc}${normalizedPath === "/" ? "" : normalizedPath}`}
          className={cn(
            "border border-[var(--border)] px-2 py-1 transition",
            loc === locale
              ? "border-[var(--crimson)] text-[var(--crimson)]"
              : "text-[var(--text-secondary)] hover:border-[var(--gold)] hover:text-[var(--gold-dark)]",
          )}
        >
          {loc}
        </Link>
      ))}
    </div>
  );
}
