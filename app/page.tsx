"use client";

import { useCallback, useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/i18n";
import { HeroHeader } from "@/components/hero-header";
import { CurrencySelector } from "@/components/currency-selector";
import { SwapButton } from "@/components/swap-button";
import { PriceInput } from "@/components/price-input";
import { ConversionResult } from "@/components/conversion-result";

export default function Page() {
  const [locale, setLocale] = useState<Locale>("es");
  const [selectedCurrency, setSelectedCurrency] = useState("ARS");
  const [priceAmount, setPriceAmount] = useState<number | null>(null);
  const [reversed, setReversed] = useState(false); // false = local->USD, true = USD->local
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [isLoadingRate, setIsLoadingRate] = useState(false);
  const [rateError, setRateError] = useState<string | null>(null);

  const t = getTranslations(locale);

  const fetchExchangeRate = useCallback(async (currency: string) => {
    setIsLoadingRate(true);
    setRateError(null);
    try {
      const response = await fetch(`/api/exchange-rate?currency=${currency}`);
      if (!response.ok) throw new Error("Failed to fetch rate");
      const data = await response.json();
      setExchangeRate(data.rate);
    } catch {
      setRateError(t.errorRate);
    } finally {
      setIsLoadingRate(false);
    }
  }, [t.errorRate]);

  useEffect(() => {
    fetchExchangeRate(selectedCurrency);
  }, [selectedCurrency, fetchExchangeRate]);

  const handleCurrencyChange = (code: string) => {
    setSelectedCurrency(code);
    setPriceAmount(null);
    setExchangeRate(null);
  };

  const handleSwap = () => {
    setReversed((prev) => !prev);
    setPriceAmount(null);
  };

  // Determine what label to show in the input based on direction
  const inputCurrencyLabel = reversed ? "USD" : selectedCurrency;

  return (
    <main className="min-h-dvh flex flex-col">
      <HeroHeader
        locale={locale}
        onLocaleChange={setLocale}
        t={t}
        isLoadingRate={isLoadingRate}
        onRefresh={() => fetchExchangeRate(selectedCurrency)}
      />

      <div className="flex-1 flex flex-col gap-5 p-4 max-w-lg mx-auto w-full">
        {/* Currency Selector */}
        <section aria-label="Currency selector">
          <CurrencySelector
            selected={selectedCurrency}
            onSelect={handleCurrencyChange}
          />
        </section>

        {/* Swap direction */}
        <section aria-label="Conversion direction">
          <SwapButton
            reversed={reversed}
            onToggle={handleSwap}
            fromLabel={selectedCurrency}
            toLabel={selectedCurrency}
            ariaLabel={t.swapDirection}
          />
        </section>

        {/* Price Input */}
        <section aria-label="Amount input">
          <PriceInput
            value={priceAmount}
            onChange={setPriceAmount}
            currencyLabel={inputCurrencyLabel}
            t={t}
          />
        </section>

        {/* Conversion Result */}
        <section aria-label="Conversion result">
          <ConversionResult
            amount={priceAmount}
            currency={selectedCurrency}
            rate={exchangeRate}
            isLoading={isLoadingRate}
            error={rateError}
            reversed={reversed}
            t={t}
          />
        </section>
      </div>

      {/* Footer */}
      <footer className="px-4 py-3 border-t border-border text-center">
        <p className="text-[11px] text-muted-foreground">
          {t.footer}
        </p>
      </footer>
    </main>
  );
}
