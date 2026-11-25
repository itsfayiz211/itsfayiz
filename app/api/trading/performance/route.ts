import { createHmac } from "node:crypto";

type PublicMetric =
  | "connectionStatus"
  | "individualPnl"
  | "realizedUnrealized"
  | "historicalPerformance";

type DeltaPosition = {
  product_symbol?: string;
  size?: string | number | null;
  settling_asset_symbol?: string;
  product?: {
    settling_asset?: { symbol?: string };
  };
  realized_pnl?: string | number | null;
  unrealized_pnl?: string | number | null;
};

type DeltaNewPosition = {
  size?: string | number | null;
  realized_pnl?: string | number | null;
};

type DeltaFill = {
  product_id?: number;
  settling_asset_symbol?: string;
  created_at?: string;
  meta_data?: {
    new_position?: DeltaNewPosition;
  };
};

type DeltaResponse<T> = {
  success?: boolean;
  result?: T[];
  meta?: { after?: string | null };
};

type PositionPnl = {
  asset: string;
  positions: number;
  realizedPnl: number | null;
  unrealizedPnl: number | null;
};
type HistoricalDay = {
  date: string;
  pnl: number;
  fills: number;
};
type HistoricalAsset = {
  asset: string;
  days: HistoricalDay[];
};
type HistoricalPnl = {
  from: string;
  to: string;
  assets: HistoricalAsset[];
  incompleteProducts: number;
};

const DELTA_BASE_URL = "https://api.india.delta.exchange";
const POSITIONS_PATH = "/v2/positions/margined";
const FILLS_PATH = "/v2/fills";
const CACHE_DURATION_MS = 60_000;
const MAX_FILL_PAGES = 20;
const allowedMetrics: PublicMetric[] = [
  "connectionStatus",
  "individualPnl",
  "realizedUnrealized",
  "historicalPerformance",
];

let cachedResult: { expiresAt: number; value: PerformanceResponse } | null = null;
let pendingRequest: Promise<PerformanceResponse> | null = null;

type PerformanceResponse = {
  status: "connected" | "disconnected" | "error" | "private";
  lastUpdated: string | null;
  publicMetrics: PublicMetric[];
  positionPnl?: PositionPnl[];
  historicalPnl?: HistoricalPnl;
  historyError?: string;
};

function getPublicMetrics(): PublicMetric[] {
  const configured =
    process.env.TRADING_PUBLIC_METRICS ??
    "connectionStatus,individualPnl,realizedUnrealized,historicalPerformance";
  return configured
    .split(",")
    .map((metric) => metric.trim())
    .filter((metric): metric is PublicMetric =>
      allowedMetrics.includes(metric as PublicMetric),
    );
}

function parseAmount(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  const amount = typeof value === "number" ? value : Number(value);
  return Number.isFinite(amount) ? amount : null;
}

function getSettlementAsset(position: DeltaPosition): string {
  return (
    position.settling_asset_symbol ??
    position.product?.settling_asset?.symbol ??
    "Settlement asset"
  );
}

function aggregatePositionPnl(positions: DeltaPosition[]): PositionPnl[] {
  const byAsset = new Map<
    string,
    {
      count: number;
      realized: number;
      unrealized: number;
      hasRealized: boolean;
      hasUnrealized: boolean;
    }
  >();

  for (const position of positions) {
    const asset = getSettlementAsset(position);
    const current = byAsset.get(asset) ?? {
      count: 0,
      realized: 0,
      unrealized: 0,
      hasRealized: true,
      hasUnrealized: true,
    };
    const realized = parseAmount(position.realized_pnl);
    const unrealized = parseAmount(position.unrealized_pnl);

    current.count += 1;
    if (realized === null) current.hasRealized = false;
    else current.realized += realized;
    if (unrealized === null) current.hasUnrealized = false;
    else current.unrealized += unrealized;
    byAsset.set(asset, current);
  }

  return Array.from(byAsset, ([asset, value]) => ({
    asset,
    positions: value.count,
    realizedPnl: value.hasRealized ? value.realized : null,
    unrealizedPnl: value.hasUnrealized ? value.unrealized : null,
  }));
}

function getSixMonthRange(now: Date) {
  const start = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 5, 1),
  );
  return { start, end: now };
}

function createDeltaHeaders(pathWithQuery: string) {
  const apiKey = process.env.DELTA_EXCHANGE_API_KEY;
  const apiSecret = process.env.DELTA_EXCHANGE_API_SECRET;
  if (!apiKey || !apiSecret) {
    throw new Error("Delta Exchange credentials are not configured.");
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = createHmac("sha256", apiSecret)
    .update(`GET${timestamp}${pathWithQuery}`)
    .digest("hex");

  return {
    "api-key": apiKey,
    timestamp,
    signature,
    "User-Agent": "fayis-portfolio",
    Accept: "application/json",
  };
}

async function fetchDelta<T>(
  path: string,
  query: URLSearchParams = new URLSearchParams(),
): Promise<DeltaResponse<T> & { result: T[] }> {
  const queryString = query.toString();
  const pathWithQuery = queryString ? `${path}?${queryString}` : path;
  const response = await fetch(`${DELTA_BASE_URL}${pathWithQuery}`, {
    method: "GET",
    headers: createDeltaHeaders(pathWithQuery),
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    throw new Error(`Delta Exchange returned HTTP ${response.status}`);
  }

  const payload = (await response.json()) as DeltaResponse<T>;
  if (payload.success !== true || !Array.isArray(payload.result)) {
    throw new Error("Delta Exchange returned an invalid response");
  }
  return { ...payload, result: payload.result };
}

async function loadHistoricalPnl(now: Date): Promise<HistoricalPnl> {
  const { start, end } = getSixMonthRange(now);
  const startTime = (start.getTime() * 1000).toString();
  const endTime = (end.getTime() * 1000).toString();
  const fills: DeltaFill[] = [];
  let after: string | null | undefined;
  const seenCursors = new Set<string>();

  for (let page = 0; page < MAX_FILL_PAGES; page += 1) {
    const query = new URLSearchParams([
      ["start_time", startTime],
      ["end_time", endTime],
      ["page_size", "100"],
    ]);
    if (after) query.set("after", after);

    const payload = await fetchDelta<DeltaFill>(FILLS_PATH, query);
    fills.push(...payload.result);
    after = payload.meta?.after;

    if (!after) break;
    if (seenCursors.has(after)) {
      throw new Error("Delta Exchange repeated a fills history cursor.");
    }
    seenCursors.add(after);

    if (page === MAX_FILL_PAGES - 1) {
      throw new Error("Six-month fills history exceeds the supported page limit.");
    }
  }

  fills.sort((left, right) => {
    const leftTime = Date.parse(left.created_at ?? "");
    const rightTime = Date.parse(right.created_at ?? "");
    return leftTime - rightTime;
  });

  const snapshots = new Map<number, { realizedPnl: number; isFlat: boolean }>();
  const totals = new Map<string, Map<string, { pnl: number; fills: number }>>();
  const incompleteProducts = new Set<number>();

  for (const fill of fills) {
    const productId = fill.product_id;
    const fillTimestamp = Date.parse(fill.created_at ?? "");
    const fillDate = Number.isFinite(fillTimestamp)
      ? new Date(fillTimestamp).toISOString().slice(0, 10)
      : null;
    const realizedPnl = parseAmount(fill.meta_data?.new_position?.realized_pnl);
    const size = parseAmount(fill.meta_data?.new_position?.size);
    const asset = fill.settling_asset_symbol;
    if (
      productId === undefined ||
      fillDate === null ||
      realizedPnl === null ||
      size === null ||
      !asset
    ) {
      if (productId !== undefined) {
        incompleteProducts.add(productId);
        snapshots.delete(productId);
      }
      continue;
    }

    const previous = snapshots.get(productId);
    let delta: number | null = null;
    if (!previous) {
      if (realizedPnl === 0) delta = 0;
      else incompleteProducts.add(productId);
    } else {
      delta = previous.isFlat ? realizedPnl : realizedPnl - previous.realizedPnl;
    }
    snapshots.set(productId, { realizedPnl, isFlat: size === 0 });

    if (delta === null) continue;
    const assetDays = totals.get(asset) ?? new Map();
    const day = assetDays.get(fillDate) ?? { pnl: 0, fills: 0 };
    day.pnl += delta;
    day.fills += 1;
    assetDays.set(fillDate, day);
    totals.set(asset, assetDays);
  }

  return {
    from: start.toISOString(),
    to: end.toISOString(),
    incompleteProducts: incompleteProducts.size,
    assets: Array.from(totals, ([asset, days]) => ({
      asset,
      days: Array.from(days, ([date, day]) => ({ date, ...day })).sort(
        (left, right) => left.date.localeCompare(right.date),
      ),
    })),
  };
}

async function loadPerformance(
  publicMetrics: PublicMetric[],
): Promise<PerformanceResponse> {
  const apiKey = process.env.DELTA_EXCHANGE_API_KEY;
  const apiSecret = process.env.DELTA_EXCHANGE_API_SECRET;

  if (!apiKey || !apiSecret) {
    return {
      status: "disconnected",
      lastUpdated: null,
      publicMetrics,
    };
  }

  const payload = await fetchDelta<DeltaPosition>(POSITIONS_PATH);
  const openPositions = payload.result.filter(
    (position) => parseAmount(position.size) !== 0,
  );

  const now = new Date();
  const result: PerformanceResponse = {
    status: "connected",
    lastUpdated: now.toISOString(),
    publicMetrics,
  };
  if (
    publicMetrics.includes("individualPnl") ||
    publicMetrics.includes("realizedUnrealized")
  ) {
    result.positionPnl = aggregatePositionPnl(openPositions);
  }
  if (publicMetrics.includes("historicalPerformance")) {
    try {
      result.historicalPnl = await loadHistoricalPnl(now);
    } catch (error) {
      console.error("Unable to load six-month Delta Exchange fills history.", error);
      result.historyError =
        "Six-month history is temporarily unavailable. Current position data is still live.";
    }
  }

  return result;
}

function withPublicMetrics(
  result: PerformanceResponse,
  publicMetrics: PublicMetric[],
): PerformanceResponse {
  const canShowStatus = publicMetrics.includes("connectionStatus");
  const hasPublicAccountMetrics =
    publicMetrics.includes("individualPnl") ||
    publicMetrics.includes("realizedUnrealized") ||
    publicMetrics.includes("historicalPerformance");
  return {
    status: canShowStatus ? result.status : "private",
    lastUpdated:
      canShowStatus || hasPublicAccountMetrics ? result.lastUpdated : null,
    publicMetrics,
    ...(publicMetrics.includes("individualPnl") ||
    publicMetrics.includes("realizedUnrealized")
      ? { positionPnl: result.positionPnl }
      : {}),
    ...(publicMetrics.includes("historicalPerformance")
      ? {
          historicalPnl: result.historicalPnl,
          historyError: result.historyError,
        }
      : {}),
  };
}

export async function GET() {
  const publicMetrics = getPublicMetrics();
  const hasPublicAccountMetrics = publicMetrics.some((metric) =>
    ["individualPnl", "realizedUnrealized", "historicalPerformance"].includes(
      metric,
    ),
  );

  if (!publicMetrics.includes("connectionStatus") && !hasPublicAccountMetrics) {
    return Response.json(
      { status: "private", lastUpdated: null, publicMetrics: [] },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    if (cachedResult && cachedResult.expiresAt > Date.now()) {
      return Response.json(
        withPublicMetrics(cachedResult.value, publicMetrics),
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    pendingRequest ??= loadPerformance(publicMetrics).finally(() => {
      pendingRequest = null;
    });
    const value = await pendingRequest;
    cachedResult = { value, expiresAt: Date.now() + CACHE_DURATION_MS };

    return Response.json(withPublicMetrics(value, publicMetrics), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(
      "Unable to load public Delta Exchange performance data.",
      error instanceof Error ? error.message : String(error),
    );
    return Response.json(
      {
        status: publicMetrics.includes("connectionStatus")
          ? "error"
          : "private",
        lastUpdated: null,
        publicMetrics,
        ...(publicMetrics.includes("historicalPerformance") && {
          historyError:
            "Delta Exchange data could not be loaded. Check the server-side Vercel environment variables and API permissions, then redeploy.",
        }),
      } satisfies PerformanceResponse,
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
