"use client";

import { useCallback, useEffect, useState } from "react";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { Translations } from "@/lib/i18n";

interface RateChartProps {
  currency: string;
  t: Translations;
}

interface HistoryPoint {
  date: string;
  rate: number;
}

const chartConfig = {
  rate: {
    label: "Rate",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function RateChart({ currency, t }: RateChartProps) {
  const [data, setData] = useState<HistoryPoint[]>([]);
  const [supported, setSupported] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchHistory = useCallback(async (curr: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/history?currency=${curr}`);
      const json = await res.json();
      if (json.supported === false) {
        setSupported(false);
        setData([]);
      } else {
        setSupported(true);
        setData(json.data ?? []);
      }
    } catch {
      setSupported(false);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory(currency);
  }, [currency, fetchHistory]);

  if (loading) {
    return (
      <div className="rounded-xl bg-card border border-border p-5">
        <div className="h-[180px] flex items-center justify-center">
          <p className="text-xs text-muted-foreground animate-pulse">
            {t.chartLoading}
          </p>
        </div>
      </div>
    );
  }

  if (!supported || data.length === 0) {
    return (
      <div className="rounded-xl bg-card border border-border p-5">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-3">
          {t.chartTitle}
        </p>
        <div className="h-[140px] flex items-center justify-center">
          <p className="text-xs text-muted-foreground text-center">
            {t.chartNotAvailable}
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return `${d.getDate()}/${d.getMonth() + 1}`;
  };

  return (
    <div className="rounded-xl bg-card border border-border p-5">
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-3">
        {t.chartTitle} — 1 USD → {currency}
      </p>
      <ChartContainer config={chartConfig} className="h-[180px] w-full aspect-auto">
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="fillRate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
            minTickGap={40}
          />
          <YAxis
            domain={["dataMin", "dataMax"]}
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            width={45}
            tickFormatter={(v: number) => v.toFixed(1)}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(_, payload) => {
                  if (payload?.[0]?.payload?.date) {
                    const d = new Date(payload[0].payload.date + "T00:00:00");
                    return d.toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }
                  return "";
                }}
              />
            }
          />
          <Area
            type="monotone"
            dataKey="rate"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            fill="url(#fillRate)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
