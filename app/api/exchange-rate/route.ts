import { NextResponse } from "next/server";

// In-memory cache for exchange rates
const cache: Record<string, { rate: number; timestamp: number }> = {};
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Fallback rates in case the API is unavailable
const FALLBACK_RATES: Record<string, number> = {
  ARS: 0.00089,
  MXN: 0.049,
  EUR: 1.08,
  BRL: 0.17,
  COP: 0.00023,
  CLP: 0.00104,
  PEN: 0.27,
  UYU: 0.023,
  GBP: 1.27,
  JPY: 0.0064,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const currency = searchParams.get("currency")?.toUpperCase();

  if (!currency) {
    return NextResponse.json(
      { error: "Currency parameter is required" },
      { status: 400 }
    );
  }

  // Check cache
  const cached = cache[currency];
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json({
      currency,
      rate: cached.rate,
      cached: true,
    });
  }

  try {
    // Use the free exchangerate API
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${currency}`,
      { signal: AbortSignal.timeout(5000) }
    );

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    const rate = data.rates?.USD;

    if (!rate) {
      throw new Error("USD rate not found in response");
    }

    // Update cache
    cache[currency] = { rate, timestamp: Date.now() };

    return NextResponse.json({
      currency,
      rate,
      cached: false,
    });
  } catch {
    // Use fallback rates
    const fallbackRate = FALLBACK_RATES[currency];
    if (fallbackRate) {
      return NextResponse.json({
        currency,
        rate: fallbackRate,
        cached: false,
        fallback: true,
      });
    }

    return NextResponse.json(
      { error: `Could not fetch exchange rate for ${currency}` },
      { status: 500 }
    );
  }
}
