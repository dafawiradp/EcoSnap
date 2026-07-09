import type { ForecastResult, DailyForecast } from './types';

/** Builds array of daily counts from ISO date strings */
function buildDailySeries(dates: readonly string[]): number[] {
  const counts = new Map<string, number>();
  for (const date of dates) {
    const day = date.split('T')[0];
    counts.set(day, (counts.get(day) ?? 0) + 1);
  }
  return Array.from(counts.values());
}

/** Simple linear regression: returns slope and intercept */
function linearRegression(values: readonly number[]): { slope: number; intercept: number } {
  const n = values.length;
  if (n < 2) return { slope: 0, intercept: values[0] ?? 0 };

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  for (let i = 0; i < n; i++) {
    sumX += i;
    sumY += values[i];
    sumXY += i * values[i];
    sumXX += i * i;
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}

/** Calculates population standard deviation */
function standardDeviation(values: readonly number[]): number {
  const n = values.length;
  if (n === 0) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / n;
  const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / n;
  return Math.sqrt(variance);
}

/** Calculates weighted moving average (recent values weighted more) */
function weightedMovingAverage(values: readonly number[], window: number): number {
  const slice = values.slice(-window);
  const n = slice.length;
  if (n === 0) return 0;

  let weightedSum = 0;
  let totalWeight = 0;

  for (let i = 0; i < n; i++) {
    const weight = i + 1;
    weightedSum += slice[i] * weight;
    totalWeight += weight;
  }

  return weightedSum / totalWeight;
}

/** Projects a value using linear regression */
function projectValue(
  slope: number,
  intercept: number,
  n: number,
  daysAhead: number
): number {
  return Math.max(0, Math.round(slope * (n + daysAhead) + intercept));
}

/** Generates forecast confidence based on data variance */
function calculateForecastConfidence(values: readonly number[]): number {
  if (values.length < 7) return 40;
  if (values.length < 14) return 60;

  const std = standardDeviation(values);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const cv = mean > 0 ? std / mean : 1;

  const confidence = Math.round(100 - cv * 60);
  return Math.max(30, Math.min(95, confidence));
}

/** Generates forecast ISO date string */
function forecastDate(daysAhead: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
}

/** Produces complete statistical forecast from historical reports */
export function forecastReports(
  reportDates: readonly string[]
): ForecastResult {
  const series = buildDailySeries(reportDates);

  if (series.length === 0) {
    return {
      tomorrow: 0,
      nextWeek: 0,
      nextMonth: 0,
      trendDirection: 'stable',
      growthRate: 0,
      riskIncrease: 0,
      confidence: 0,
      dailyForecasts: [],
    };
  }

  const { slope, intercept } = linearRegression(series);
  const n = series.length;
  const std = standardDeviation(series);
  const wma7 = weightedMovingAverage(series, 7);
  const confidence = calculateForecastConfidence(series);

  const lastValue = series[n - 1];
  const prevValue = series[Math.max(0, n - 8)];

  const growthRate =
    prevValue > 0
      ? Number((((lastValue - prevValue) / prevValue) * 100).toFixed(2))
      : 0;

  const trendDirection =
    slope > 0.3 ? 'increasing' : slope < -0.3 ? 'decreasing' : 'stable';

  const tomorrow = Math.max(0, Math.round(wma7 * (1 + slope * 0.1)));
  const nextWeek = projectValue(slope, intercept, n, 7);
  const nextMonth = projectValue(slope, intercept, n, 30);

  const riskIncrease = Math.max(0, Number((growthRate * 0.5).toFixed(2)));

  const dailyForecasts: DailyForecast[] = Array.from({ length: 30 }, (_, i) => {
    const predicted = Math.max(0, Math.round(slope * (n + i + 1) + intercept));
    return {
      date: forecastDate(i + 1),
      predicted,
      lower: Math.max(0, Math.round(predicted - std)),
      upper: Math.round(predicted + std),
    };
  });

  return {
    tomorrow,
    nextWeek,
    nextMonth,
    trendDirection,
    growthRate,
    riskIncrease,
    confidence,
    dailyForecasts,
  };
}
