"use client";

import { cn } from "@/lib/utils";

interface SwapButtonProps {
  reversed: boolean;
  onToggle: () => void;
  fromLabel: string;
  toLabel: string;
  ariaLabel: string;
}

export function SwapButton({ reversed, onToggle, fromLabel, toLabel, ariaLabel }: SwapButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl",
        "border border-border bg-card",
        "hover:border-primary/40 hover:bg-primary/5",
        "active:scale-[0.98] transition-all"
      )}
      aria-label={ariaLabel}
    >
      <span className={cn(
        "text-sm font-semibold transition-colors",
        !reversed ? "text-primary" : "text-muted-foreground"
      )}>
        {reversed ? "USD" : fromLabel}
      </span>

      <div className="relative w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
        <svg
          className={cn("w-4 h-4 text-primary transition-transform duration-300", reversed && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      </div>

      <span className={cn(
        "text-sm font-semibold transition-colors",
        reversed ? "text-primary" : "text-muted-foreground"
      )}>
        {reversed ? toLabel : "USD"}
      </span>
    </button>
  );
}
