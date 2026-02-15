"use client";

import { cn } from "@/lib/utils";
import type { Translations } from "@/lib/i18n";

interface ConversionResultProps {
  amount: number | null;
  currency: string;
  rate: number | null;
  isLoading: boolean;
  error: string | null;
  reversed: boolean;
  t: Translations;
}

export function ConversionResult({
  amount,
  currency,
  rate,
  isLoading,
  error,
  reversed,
  t,
}: ConversionResultProps) {
  if (error) {
    return (
      <div className="rounded-xl bg-destructive/10 border border-destructive/30 p-4 text-center">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    );
  }

  if (!amount || !rate) {
    return (
      <div className="rounded-xl bg-card border border-border p-6 text-center">
        <div className="w-10 h-10 rounded-full bg-secondary mx-auto mb-3 flex items-center justify-center">
          <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
        </div>
        <p className="text-sm text-muted-foreground">{t.enterAmount}</p>
      </div>
    );
  }

  // reversed = true means USD -> local, rate is always localCurrency/USD
  // rate from API = how many USD per 1 local unit
  // so: inverse = 1/rate = how many local per 1 USD
  let fromValue: number;
  let toValue: number;
  let fromLabel: string;
  let toLabel: string;
  let rateDisplay: string;

  if (reversed) {
    // USD -> local currency
    fromValue = amount;
    fromLabel = "USD";
    const inverseRate = 1 / rate;
    toValue = amount * inverseRate;
    toLabel = currency;
    const rateFormatted = inverseRate < 1 ? inverseRate.toFixed(4) : inverseRate.toFixed(2);
    rateDisplay = t.rateInfo
      .replace("{from}", "USD")
      .replace("{rate}", rateFormatted)
      .replace("{to}", currency);
  } else {
    // local -> USD
    fromValue = amount;
    fromLabel = currency;
    toValue = amount * rate;
    toLabel = "USD";
    const rateFormatted = rate < 0.01 ? rate.toFixed(6) : rate.toFixed(4);
    rateDisplay = t.rateInfo
      .replace("{from}", currency)
      .replace("{rate}", rateFormatted)
      .replace("{to}", "USD");
  }

  return (
    <div className={cn("rounded-xl border p-5 transition-all", "bg-card border-primary/30")}>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
            {t.originalValue}
          </p>
          <p className="text-2xl font-bold text-foreground font-mono truncate">
            {fromValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}{" "}
            <span className="text-sm text-muted-foreground">{fromLabel}</span>
          </p>
        </div>

        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 shrink-0">
          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>

        <div className="text-right min-w-0 flex-1">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
            {t.convertedValue}
          </p>
          <p className="text-2xl font-bold text-primary font-mono truncate">
            {toLabel === "USD" ? "$" : ""}
            {toValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
            <span className="text-sm text-muted-foreground">{toLabel}</span>
          </p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-[11px] text-muted-foreground text-center font-mono">
          {isLoading ? t.updatingRate : rateDisplay}
        </p>
      </div>
    </div>
  );
}
