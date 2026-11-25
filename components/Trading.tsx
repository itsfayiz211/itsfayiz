"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Activity,
  BarChart3,
  CalendarDays,
  ChevronDown,
  Code2,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import GlassSurface from "@/components/ui/GlassSurface";
import MagicBento, { type BentoCard } from "@/components/ui/MagicBento";
// a
type PositionPnl = {
  asset: string;
  positions: number;
  realizedPnl: number | null;
  unrealizedPnl: number | null;
};
type PerformanceResponse = {
  status: "connected" | "disconnected" | "error" | "private";
  lastUpdated: string | null;
  publicMetrics: string[];
  positionPnl?: PositionPnl[];
  historicalPnl?: {
    from: string;
    to: string;
    incompleteProducts: number;
    assets: {
      asset: string;
      days: { date: string; pnl: number; fills: number }[];
    }[];
  };
  historyError?: string;
};

type CalendarDay = {
  date: string;
  pnl: number;
  fills: number;
};

const tradingCards: BentoCard[] = [
  {
    eyebrow: "Markets",
    title: "Crypto & forex",
    description:
      "Around two years of experience exploring cryptocurrency and forex markets, including XAUUSD.",
    detail: "A continuing learning journey — not a performance claim.",
    visual: "chart",
    icon: <Activity size={18} />,
  },
  {
    eyebrow: "Approach",
    title: "Price action first",
    description:
      "Market structure, liquidity, supply and demand, and Smart Money Concepts (SMC) / ICT concepts.",
    icon: <BarChart3 size={18} />,
  },
  {
    eyebrow: "Process",
    title: "Risk & psychology",
    description:
      "A focus on risk management, patience, and the psychology behind decision-making.",
    icon: <ShieldCheck size={18} />,
  },
  {
    eyebrow: "Engineering",
    title: "Full-stack builder",
    description:
      "Next.js, React, Node.js, Express, MongoDB, and SQL — from interface to backend.",
    icon: <Code2 size={18} />,
  },
];

function formatAmount(value: number | null, asset: string) {
  if (value === null) return "Not provided";
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(value));
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  const amount =
    asset.toUpperCase() === "USD" ? `$${formatted}` : `${formatted} ${asset}`;
  return `${sign}${amount}`;
}

function pnlColor(value: number) {
  if (value > 0) return "text-emerald-300";
  if (value < 0) return "text-rose-300";
  return "text-neutral-200";
}

function MiniPnlCalendar({
  year,
  month,
  days,
  asset,
  historyComplete,
  startDate,
  latestDate,
  onSelectDay,
}: {
  year: number;
  month: number;
  days: Map<string, CalendarDay>;
  asset: string;
  historyComplete: boolean;
  startDate: string;
  latestDate: string;
  onSelectDay: (day: CalendarDay) => void;
}) {
  const monthLabel = new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month, 1)));
  const offset = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const dateCells: (number | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  const monthDays = dateCells.map((date) =>
    date === null
      ? null
      : days.get(
          `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`,
        ) ?? null,
  );
  const maximumPnl = Math.max(
    ...monthDays.map((day) => Math.abs(day?.pnl ?? 0)),
    0.01,
  );
  const monthTotal = monthDays.reduce((sum, day) => sum + (day?.pnl ?? 0), 0);
  const monthFills = monthDays.reduce((sum, day) => sum + (day?.fills ?? 0), 0);
  const monthStartDate = `${year}-${String(month + 1).padStart(2, "0")}-01`;
  const monthPnlLabel =
    monthStartDate > latestDate
      ? "Upcoming"
      : historyComplete
        ? formatAmount(monthTotal, asset)
        : monthFills
          ? `Known ${formatAmount(monthTotal, asset)}`
          : "P&L unavailable";

  return (
    <article className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-2 sm:p-2.5">
      <div className="mb-2 flex min-h-12 flex-col gap-1">
        <h5 className="text-[0.65rem] font-medium leading-tight text-neutral-100">
          {monthLabel}
        </h5>
        <p className={`text-[0.6rem] font-semibold leading-tight ${pnlColor(monthTotal)}`}>
          {monthPnlLabel}
        </p>
        <p className="text-[0.55rem] leading-tight text-neutral-500">
            {monthFills} {monthFills === 1 ? "fill" : "fills"}
        </p>
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center text-[0.5rem] text-neutral-600">
        {["S", "M", "T", "W", "T", "F", "S"].map((weekday, index) => (
          <span key={`${weekday}-${index}`} className="pb-1">
            {weekday}
          </span>
        ))}
        {dateCells.map((date, index) => {
          const day = monthDays[index];
          if (date === null) {
            return <span key={`empty-${index}`} className="aspect-square" />;
          }
          const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
          const beforeTrackingStart = fullDate < startDate;
          const isPastOrCurrentDate =
            !beforeTrackingStart && fullDate <= latestDate;
          const calendarDay =
            day ??
            (historyComplete && isPastOrCurrentDate
              ? { date: fullDate, pnl: 0, fills: 0 }
              : null);
          const value = calendarDay?.pnl ?? 0;
          const opacity = day?.fills
            ? 0.12 + (Math.abs(value) / maximumPnl) * 0.55
            : 0;
          const background =
            value > 0
              ? `rgba(16, 185, 129, ${opacity})`
              : value < 0
                ? `rgba(244, 63, 94, ${opacity})`
                  : calendarDay
                    ? "rgba(148, 163, 184, 0.12)"
                  : "transparent";
          const description = calendarDay
            ? `${fullDate}: ${historyComplete ? "" : "Known "}${formatAmount(calendarDay.pnl, asset)} realized P&L from ${calendarDay.fills} ${calendarDay.fills === 1 ? "fill" : "fills"}`
            : beforeTrackingStart
              ? `${fullDate}: tracking starts ${startDate}`
              : isPastOrCurrentDate
                ? `${fullDate}: P&L unavailable because the exchange history is incomplete`
                : `${fullDate}: future date`;

          return (
            <button
              key={fullDate}
              type="button"
              title={description}
              aria-label={description}
              disabled={!calendarDay}
              onClick={() => calendarDay && onSelectDay(calendarDay)}
              className={`relative flex aspect-square items-center justify-center rounded-sm text-[0.55rem] transition hover:ring-1 hover:ring-white/40 ${
                calendarDay ? "text-white" : "cursor-default text-neutral-600"
              }`}
              style={{ backgroundColor: background }}
            >
              {date}
            </button>
          );
        })}
      </div>
    </article>
  );
}

export default function Trading() {
  const [performance, setPerformance] = useState<PerformanceResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [requestError, setRequestError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const hasLoaded = useRef(false);

  const loadPerformance = useCallback(
    async (signal: AbortSignal) => {
      try {
        const response = await fetch(
          "/api/trading/performance",
          { cache: "no-store", signal },
        );
        const payload = (await response.json()) as PerformanceResponse;
        if (!response.ok && payload.status !== "error") {
          throw new Error("Performance request failed");
        }
        setPerformance(payload);
        hasLoaded.current = true;
        setRequestError(false);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setRequestError(true);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const controller = new AbortController();
    setLoading(!hasLoaded.current);
    void loadPerformance(controller.signal);
    const interval = window.setInterval(() => {
      void loadPerformance(controller.signal);
    }, 60_000);

    return () => {
      controller.abort();
      window.clearInterval(interval);
    };
  }, [loadPerformance, refreshKey]);

  const publicMetrics = performance?.publicMetrics ?? [];
  const showConnectionStatus = publicMetrics.includes("connectionStatus");
  const showIndividualPnl = publicMetrics.includes("individualPnl");
  const showRealizedUnrealized = publicMetrics.includes("realizedUnrealized");
  const showHistory = publicMetrics.includes("historicalPerformance");
  const positionPnl = performance?.positionPnl ?? [];
  const historyAssets = performance?.historicalPnl?.assets ?? [];
  const activeAsset =
    historyAssets.find((item) => item.asset === selectedAsset) ??
    historyAssets[0];
  const dailyPnl = new Map(
    (activeAsset?.days ?? []).map((day) => [day.date, day]),
  );
  const trackedPnl = (activeAsset?.days ?? []).reduce(
    (total, day) => total + day.pnl,
    0,
  );
  const trackedFills = (activeAsset?.days ?? []).reduce(
    (total, day) => total + day.fills,
    0,
  );
  const historyIncomplete =
    (performance?.historicalPnl?.incompleteProducts ?? 0) > 0;
  const historyComplete = !historyIncomplete;
  const startDate =
    performance?.historicalPnl?.from.slice(0, 10) ??
    new Date().toISOString().slice(0, 10);
  const latestDate =
    performance?.historicalPnl?.to.slice(0, 10) ??
    new Date().toISOString().slice(0, 10);
  const currentMonth = new Date(`${startDate}T00:00:00.000Z`);
  const calendarMonths = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(
      Date.UTC(
        currentMonth.getUTCFullYear(),
        currentMonth.getUTCMonth() + index,
        1,
      ),
    );
    return { year: date.getUTCFullYear(), month: date.getUTCMonth() };
  });

  return (
    <section
      id="trading"
      className="relative overflow-hidden bg-neutral-950 px-5 py-20 text-white sm:px-8 md:px-12 md:py-28"
    >
      <div className="pointer-events-none absolute -right-36 top-20 h-80 w-80 rounded-full bg-violet-500/[0.06] blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-violet-300">
            <Sparkles size={14} /> Markets, mindset &amp; making
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Trading is part of
            <span className="text-violet-300"> my journey.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base">
            Around two years learning across crypto and forex — alongside the
            work I do as a full-stack developer. I value process, careful risk,
            and staying curious.
          </p>
        </div>

        <MagicBento
          columns={4}
          rowHeight={200}
          gap={12}
          radius={20}
          enableBorderGlow
          enableSpotlight
          spotlightRadius={300}
          clickEffect
          enableStars={false}
          particleCount={24}
          enableTilt={false}
          enableMagnetism={false}
          textAutoHide
          intro
          cards={tradingCards}
        />

        <div className="mt-20 border-t border-white/10 pt-12">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-violet-300">
                <Activity size={14} /> Account overview
              </p>
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Live trading performance
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-400">
                Live positions and realized P&amp;L tracking from today, with
                a six-month forward calendar from Delta Exchange India.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setRefreshKey((value) => value + 1)}
              disabled={loading}
              className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-full border border-white/15 px-4 py-2 text-sm text-neutral-200 transition hover:border-violet-300/50 hover:text-white disabled:cursor-wait disabled:opacity-50 sm:self-auto"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
              Refresh data
            </button>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {showConnectionStatus && (
              <GlassSurface className="rounded-2xl p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                      Delta Exchange India
                    </p>
                    <p className="mt-3 text-lg font-medium">
                      {loading
                        ? "Checking connection…"
                        : performance?.status === "connected"
                          ? "Connected"
                          : performance?.status === "error" || requestError
                            ? "Temporarily unavailable"
                            : "Not connected"}
                    </p>
                  </div>
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      performance?.status === "connected"
                        ? "bg-emerald-400"
                        : performance?.status === "error" || requestError
                          ? "bg-amber-400"
                          : "bg-neutral-600"
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </GlassSurface>
            )}
          </div>

          {requestError && (
            <p role="alert" className="mt-5 text-sm text-amber-200">
              Live account data could not be loaded. Please try again later.
            </p>
          )}

          {(showIndividualPnl || showRealizedUnrealized) && (
            <GlassSurface className="mt-3 rounded-2xl p-5 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    Current open positions · Delta Exchange India
                  </p>
                  <p className="mt-2 text-sm text-neutral-400">
                    P&amp;L is shown by settlement asset and reflects open
                    positions only.
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="mt-7 h-24 animate-pulse rounded-xl bg-white/[0.04]" />
              ) : positionPnl.length > 0 ? (
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {positionPnl.map((item) => (
                    <div
                      key={item.asset}
                      className="rounded-xl border border-white/[0.07] bg-black/20 p-4"
                    >
                      {showIndividualPnl && (
                        <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                          Delta · {item.asset} · {item.positions} open{" "}
                          {item.positions === 1 ? "position" : "positions"}
                        </p>
                      )}
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        {showRealizedUnrealized && (
                          <>
                            <div>
                              <p className="text-xs text-neutral-500">
                                Realized on open positions
                              </p>
                              <p className="mt-1 text-sm font-medium text-neutral-100">
                                <span className={pnlColor(item.realizedPnl ?? 0)}>
                                  {formatAmount(item.realizedPnl, item.asset)}
                                </span>
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-neutral-500">
                                Unrealized
                              </p>
                              <p className="mt-1 text-sm font-medium text-neutral-100">
                                <span className={pnlColor(item.unrealizedPnl ?? 0)}>
                                  {formatAmount(item.unrealizedPnl, item.asset)}
                                </span>
                              </p>
                            </div>
                          </>
                        )}
                        {showIndividualPnl && !showRealizedUnrealized && (
                          <div>
                            <p className="text-xs text-neutral-500">
                              Position P&amp;L
                            </p>
                            <p className="mt-1 text-sm font-medium text-neutral-100">
                              <span
                                className={pnlColor(
                                  (item.realizedPnl ?? 0) +
                                    (item.unrealizedPnl ?? 0),
                                )}
                              >
                                {formatAmount(
                                  item.realizedPnl !== null &&
                                    item.unrealizedPnl !== null
                                    ? item.realizedPnl + item.unrealizedPnl
                                    : null,
                                  item.asset,
                                )}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-6 text-sm text-neutral-400">
                  {performance?.status === "connected"
                    ? "No open-position P&L is currently available."
                    : "Live P&L will appear here when the exchange connection is available."}
                </p>
              )}
            </GlassSurface>
          )}

          {showHistory && (
            <GlassSurface className="mt-3 rounded-2xl p-5 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CalendarDays size={18} className="text-violet-300" />
                    <h4 className="font-medium">P&amp;L from today · six-month calendar</h4>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-neutral-400">
                    Daily realized P&amp;L from today onward, based on exchange
                    fills. Green days are positive; red days are negative.
                    Select a traded date to see its exact amount. Future dates
                    stay blank until actual fills occur.
                  </p>
                </div>
                {historyAssets.length > 1 && (
                  <label className="relative flex w-full items-center sm:w-auto">
                    <span className="sr-only">Calendar settlement asset</span>
                    <select
                      value={activeAsset?.asset ?? ""}
                      onChange={(event) => {
                        setSelectedAsset(event.target.value);
                        setSelectedDay(null);
                      }}
                      className="min-h-11 w-full appearance-none rounded-xl border border-white/10 bg-neutral-900 px-4 pr-10 text-sm text-neutral-100 outline-none focus:border-violet-300/50 sm:w-auto"
                    >
                      {historyAssets.map((item) => (
                        <option key={item.asset} value={item.asset}>
                          {item.asset}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={15}
                      className="pointer-events-none absolute right-3 text-neutral-500"
                    />
                  </label>
                )}
              </div>

              {activeAsset && !loading && !performance?.historyError && (
                <div className="mt-5 flex flex-wrap items-end justify-between gap-3 rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                      {historyIncomplete
                        ? "Known realized P&L since today"
                        : "Realized P&L since today"}{" "}
                      · {activeAsset.asset}
                    </p>
                    <p className={`mt-1 text-xl font-semibold ${pnlColor(trackedPnl)}`}>
                      {trackedFills || historyComplete
                        ? formatAmount(trackedPnl, activeAsset.asset)
                        : "Incomplete"}
                    </p>
                  </div>
                  <p className="text-xs text-neutral-500">
                    {trackedFills} fills included
                  </p>
                </div>
              )}

              {loading ? (
                <div className="mt-6 grid grid-cols-3 gap-2 lg:grid-cols-6">
                  {Array.from({ length: 6 }, (_, index) => (
                    <div
                      key={index}
                      className="h-36 animate-pulse rounded-xl bg-white/[0.04]"
                    />
                  ))}
                </div>
              ) : performance?.historyError ? (
                <p role="alert" className="mt-6 text-sm text-amber-200">
                  {performance.historyError}
                </p>
              ) : !activeAsset ? (
                <p className="mt-6 text-sm text-neutral-400">
                  {performance?.status === "connected"
                    ? "No settlement asset or fills are available yet. The calendar will populate when Delta returns actual fills."
                    : "Connect Delta Exchange to start tracking realized P&L from today."}
                </p>
              ) : (
                <>
                  <div className="mt-6 grid grid-cols-3 gap-2 lg:grid-cols-6">
                    {calendarMonths.map(({ year, month }) => (
                      <MiniPnlCalendar
                        key={`${year}-${month}`}
                        year={year}
                        month={month}
                        days={dailyPnl}
                        asset={activeAsset.asset}
                        historyComplete={historyComplete}
                        startDate={startDate}
                        latestDate={latestDate}
                        onSelectDay={(day) => setSelectedDay(day)}
                      />
                    ))}
                  </div>
                  {selectedDay && (
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-sm">
                      <span className="text-neutral-400">
                        {historyIncomplete ? "Known P&L · " : ""}
                        {new Intl.DateTimeFormat("en", {
                          dateStyle: "long",
                          timeZone: "UTC",
                        }).format(new Date(`${selectedDay.date}T00:00:00Z`))}
                        {" · "}
                        {selectedDay.fills}{" "}
                        {selectedDay.fills === 1 ? "fill" : "fills"}
                      </span>
                      <span className={`font-semibold ${pnlColor(selectedDay.pnl)}`}>
                        {formatAmount(selectedDay.pnl, activeAsset.asset)}
                      </span>
                    </div>
                  )}
                  {historyIncomplete ? (
                    <p className="mt-4 text-xs leading-5 text-amber-200/80">
                      Some position snapshots are missing. Displayed amounts
                      are the known P&amp;L from available fills and may be
                      partial; dates without a verifiable total stay
                      unavailable rather than showing zero.
                    </p>
                  ) : null}
                </>
              )}
            </GlassSurface>
          )}

          {showConnectionStatus && performance?.lastUpdated && (
            <p className="mt-4 text-right text-xs text-neutral-500">
              Updated{" "}
              {new Intl.DateTimeFormat("en", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(performance.lastUpdated))}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
