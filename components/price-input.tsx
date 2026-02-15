"use client";

import React from "react"

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { Translations } from "@/lib/i18n";

interface PriceInputProps {
  value: number | null;
  onChange: (value: number | null) => void;
  currencyLabel: string;
  t: Translations;
}

export function PriceInput({ value, onChange, currencyLabel, t }: PriceInputProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value === null) {
      setInputValue("");
    } else {
      const currentParsed = Number.parseFloat(inputValue.replace(/,/g, "."));
      if (Number.isNaN(currentParsed) || currentParsed !== value) {
        setInputValue(value.toString());
      }
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "" || /^[\d.,]*$/.test(raw)) {
      setInputValue(raw);
      const normalized = raw.replace(/,/g, ".");
      const parsed = Number.parseFloat(normalized);
      if (!Number.isNaN(parsed) && parsed > 0) {
        onChange(parsed);
      } else if (raw === "") {
        onChange(null);
      }
    }
  };

  const handleClear = () => {
    setInputValue("");
    onChange(null);
    inputRef.current?.focus();
  };

  const quickAmounts = [100, 500, 1000, 5000];

  return (
    <div className="space-y-3">
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
        {t.amountLabel}
      </p>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          inputMode="decimal"
          placeholder={t.placeholder}
          value={inputValue}
          onChange={handleChange}
          className={cn(
            "w-full bg-card border border-border rounded-xl px-4 py-4",
            "text-3xl font-mono font-bold text-foreground text-center",
            "placeholder:text-muted-foreground/30",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
            "transition-all"
          )}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground tracking-wide">
          {currencyLabel}
        </span>
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-secondary flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
            aria-label={t.clear}
          >
            <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex gap-2">
        {quickAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => {
              setInputValue(amount.toString());
              onChange(amount);
            }}
            className={cn(
              "flex-1 py-2 rounded-lg text-xs font-mono font-semibold transition-all border",
              value === amount
                ? "bg-primary/15 text-primary border-primary/50"
                : "bg-card text-secondary-foreground border-border hover:border-muted-foreground/40 active:scale-95"
            )}
          >
            {amount.toLocaleString()}
          </button>
        ))}
      </div>
    </div>
  );
}
