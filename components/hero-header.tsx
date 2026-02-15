"use client";

import type { Locale } from "@/lib/i18n";
import type { Translations } from "@/lib/i18n";
import { LanguageSwitcher } from "./language-switcher";

interface HeroHeaderProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  t: Translations;
  isLoadingRate: boolean;
  onRefresh: () => void;
}

export function HeroHeader({
  locale,
  onLocaleChange,
  t,
  isLoadingRate,
  onRefresh,
}: HeroHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-border">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/4" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-primary/5 rounded-full blur-3xl" />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative px-4 py-5">
        {/* Top bar: refresh + language */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onRefresh}
            disabled={isLoadingRate}
            className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 uppercase tracking-wider"
            aria-label={t.refresh}
          >
            <svg
              className={`w-3.5 h-3.5 ${isLoadingRate ? "animate-spin" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {t.refresh}
          </button>
          <LanguageSwitcher locale={locale} onLocaleChange={onLocaleChange} />
        </div>

        {/* Title area */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              {/* Logo icon */}
              <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center border border-primary/20">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-foreground tracking-tight text-balance">
                {t.title}
              </h1>
            </div>
            <p className="text-xs text-muted-foreground ml-[42px]">
              {t.subtitle}
            </p>
          </div>

          {/* Decorative exchange symbol */}
          <div className="shrink-0 text-right opacity-60">
            <span className="text-4xl font-mono font-bold text-primary/20 select-none">$</span>
          </div>
        </div>
      </div>
    </header>
  );
}
