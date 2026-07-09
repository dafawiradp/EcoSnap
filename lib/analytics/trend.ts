import type { AnalyticsReport, TrendPoint, CategoryTrend } from './types';
import type { PollutionCategory } from '../../types/taxonomy';

/** Builds a time-series of daily counts with moving average */
export function buildTrendPoints(
  reports: readonly AnalyticsReport[],
  windowSize = 7
): readonly TrendPoint[] {
  const dailyCounts = new Map<string, number>();

  for (const report of reports) {
    const date = report.createdAt.split('T')[0];
    dailyCounts.set(date, (dailyCounts.get(date) ?? 0) + 1);
  }

  const sorted = Array.from(dailyCounts.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count }));

  return sorted.map((point, index) => {
    const start = Math.max(0, index - windowSize + 1);
    const window = sorted.slice(start, index + 1);
    const movingAverage = Number(
      (window.reduce((sum, p) => sum + p.count, 0) / window.length).toFixed(2)
    );
    return { ...point, movingAverage };
  });
}

/** Analyzes trend per pollution category */
export function analyzeCategoryTrends(
  reports: readonly AnalyticsReport[]
): readonly CategoryTrend[] {
  const now = new Date();
  const thisWeekStart = new Date(now);
  thisWeekStart.setDate(now.getDate() - 7);
  const lastWeekStart = new Date(now);
  lastWeekStart.setDate(now.getDate() - 14);

  const thisWeek = reports.filter((r) => new Date(r.createdAt) >= thisWeekStart);
  const lastWeek = reports.filter(
    (r) =>
      new Date(r.createdAt) >= lastWeekStart &&
      new Date(r.createdAt) < thisWeekStart
  );

  const thisWeekCounts = countByCategory(thisWeek);
  const lastWeekCounts = countByCategory(lastWeek);

  const categories = new Set([
    ...Object.keys(thisWeekCounts),
    ...Object.keys(lastWeekCounts),
  ]) as Set<PollutionCategory>;

  const trends: CategoryTrend[] = [];

  for (const category of categories) {
    const current = thisWeekCounts[category] ?? 0;
    const previous = lastWeekCounts[category] ?? 0;

    if (current === 0 && previous === 0) continue;

    const changePercent =
      previous === 0
        ? current > 0
          ? 100
          : 0
        : Number((((current - previous) / previous) * 100).toFixed(2));

    const direction =
      changePercent > 5
        ? 'increasing'
        : changePercent < -5
        ? 'decreasing'
        : 'stable';

    const absChange = Math.abs(changePercent).toFixed(1);
    const message =
      direction === 'increasing'
        ? `${formatCategory(category)} increased by ${absChange}% this week.`
        : direction === 'decreasing'
        ? `${formatCategory(category)} decreased by ${absChange}% this week.`
        : `${formatCategory(category)} remained stable this week.`;

    const confidence = Math.min(
      95,
      50 + Math.min(current, previous) * 2 + (previous > 0 ? 20 : 0)
    );

    trends.push({ category, message, confidence, changePercent, direction });
  }

  return trends.sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent));
}

function countByCategory(
  reports: readonly AnalyticsReport[]
): Partial<Record<PollutionCategory, number>> {
  const counts: Partial<Record<PollutionCategory, number>> = {};
  for (const report of reports) {
    counts[report.category] = (counts[report.category] ?? 0) + 1;
  }
  return counts;
}

function formatCategory(category: PollutionCategory): string {
  return category.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
