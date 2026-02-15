import { NextResponse } from "next/server";

const SUPPORTED_CURRENCIES = new Set([
  "BRL", "EUR", "GBP", "MXN",
  "AUD", "CAD", "CHF", "CNY", "CZK", "DKK", "HKD", "HUF",
  "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MYR", "NOK",
  "NZD", "PHP", "PLN", "RON", "SEK", "SGD", "THB", "TRY",
  "USD", "ZAR",
]);

const cache: Record<string, { data: { date: string; rate: number }[]; timestamp: number }> = {};
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const currency = searchParams.get("currency")?.toUpperCase();

  if (!currency) {
    return NextResponse.json({ error: "Currency parameter is required" }, { status: 400 });
  }

  if (!SUPPORTED_CURRENCIES.has(currency)) {
    return NextResponse.json({ supported: false, currency });
  }

  const cached = cache[currency];
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json({ supported: true, currency, data: cached.data, cached: true });
  }

  try {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 30);

    const fmt = (d: Date) => d.toISOString().split("T")[0];
    const url = `https://api.frankfurter.dev/v1/${fmt(start)}..${fmt(end)}?base=USD&symbols=${currency}`;

    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`API returned ${response.status}`);

    const json = await response.json();
    const data = Object.entries(json.rates)
      .map(([date, rates]) => ({
        date,
        rate: (rates as Record<string, number>)[currency],
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    cache[currency] = { data, timestamp: Date.now() };

    return NextResponse.json({ supported: true, currency, data, cached: false });
  } catch {
    return NextResponse.json(
      { error: `Could not fetch history for ${currency}` },
      { status: 500 }
    );
  }
}
