"use client";

import { cn } from "@/lib/utils";

export interface CurrencyOption {
  code: string;
  flag: string;
  symbol: string;
}

// Country code to flag emoji conversion
function countryCodeToFlag(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export const CURRENCIES: CurrencyOption[] = [
  { code: "ARS", flag: "AR", symbol: "$" },
  { code: "MXN", flag: "MX", symbol: "$" },
  { code: "EUR", flag: "EU", symbol: "\u20AC" },
  { code: "BRL", flag: "BR", symbol: "R$" },
  { code: "COP", flag: "CO", symbol: "$" },
  { code: "CLP", flag: "CL", symbol: "$" },
  { code: "GBP", flag: "GB", symbol: "\u00A3" },
  { code: "PEN", flag: "PE", symbol: "S/" },
  { code: "UYU", flag: "UY", symbol: "$U" },
];

interface CurrencySelectorProps {
  selected: string;
  onSelect: (code: string) => void;
}

export function CurrencySelector({ selected, onSelect }: CurrencySelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1 md:grid md:grid-cols-3 md:overflow-x-visible">
      {CURRENCIES.map((currency) => (
        <button
          key={currency.code}
          onClick={() => onSelect(currency.code)}
          className={cn(
            "flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
            "border shrink-0 md:shrink md:justify-center",
            selected === currency.code
              ? "bg-primary/15 text-primary border-primary/50 shadow-sm shadow-primary/10"
              : "bg-card text-secondary-foreground border-border hover:border-muted-foreground/40 hover:bg-secondary"
          )}
        >
          <span className="text-base leading-none" role="img" aria-label={currency.flag}>
            {countryCodeToFlag(currency.flag)}
          </span>
          <span>{currency.code}</span>
        </button>
      ))}
    </div>
  );
}
