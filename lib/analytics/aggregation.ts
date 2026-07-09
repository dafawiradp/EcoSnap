import type { AnalyticsReport, CategoryBreakdown } from './types';
import type { PollutionCategory } from '../../types/taxonomy';

/** Computes per-category breakdown with growth rate */
export function buildCategoryBreakdown(
  reports: readonly AnalyticsReport[]
): readonly CategoryBreakdown[] {
  const total = reports.length;
  if (total === 0) return [];

  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(now.getDate() - 7);
  const twoWeeksAgo = new Date(now);
  twoWeeksAgo.setDate(now.getDate() - 14);

  const allCounts = new Map<PollutionCategory, number>();
  const thisWeekCounts = new Map<PollutionCategory, number>();
  const lastWeekCounts = new Map<PollutionCategory, number>();

  for (const report of reports) {
    const cat = report.category;
    allCounts.set(cat, (allCounts.get(cat) ?? 0) + 1);

    const created = new Date(report.createdAt);
    if (created >= weekAgo) {
      thisWeekCounts.set(cat, (thisWeekCounts.get(cat) ?? 0) + 1);
    } else if (created >= twoWeeksAgo) {
      lastWeekCounts.set(cat, (lastWeekCounts.get(cat) ?? 0) + 1);
    }
  }

  const breakdowns: CategoryBreakdown[] = [];

  for (const [category, count] of allCounts.entries()) {
    const percentage = Number(((count / total) * 100).toFixed(2));
    const current = thisWeekCounts.get(category) ?? 0;
    const previous = lastWeekCounts.get(category) ?? 0;
    const growthRate =
      previous > 0
        ? Number((((current - previous) / previous) * 100).toFixed(2))
        : current > 0
        ? 100
        : 0;

    breakdowns.push({ category, count, percentage, growthRate });
  }

  return breakdowns.sort((a, b) => b.count - a.count);
}
