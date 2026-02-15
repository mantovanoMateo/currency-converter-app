"use client";

import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { LOCALE_LABELS } from "@/lib/i18n";

const LOCALES: Locale[] = ["es", "en", "pt"];

interface LanguageSwitcherProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export function LanguageSwitcher({ locale, onLocaleChange }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-secondary/80 p-0.5">
      {LOCALES.map((l) => (
        <button
          key={l}
          onClick={() => onLocaleChange(l)}
          className={cn(
            "px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wider uppercase transition-all",
            locale === l
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label={`Switch to ${l}`}
        >
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
