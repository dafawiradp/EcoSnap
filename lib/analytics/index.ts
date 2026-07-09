import type { AnalyticsReport, AnalyticsResult } from './types';
import { calculateStatistics } from './statistics';
import { buildTrendPoints, analyzeCategoryTrends } from './trend';
import { calculateProvinceRisks } from './risk';
import { calculateHealthScore } from './healthScore';
import { buildCategoryBreakdown } from './aggregation';
import { generateInsights } from './insights';
import { forecastReports } from './forecast';

export { calculateStatistics } from './statistics';
export { buildTrendPoints, analyzeCategoryTrends } from './trend';
export { forecastReports } from './forecast';
export { calculateProvinceRisks } from './risk';
export { calculateHealthScore } from './healthScore';
export { buildCategoryBreakdown } from './aggregation';
export { generateInsights } from './insights';
export type {
  AnalyticsReport,
  AnalyticsResult,
  Statistics,
  Insight,
  ForecastResult,
  DailyForecast,
  CategoryBreakdown,
  ProvinceRisk,
  HealthScore,
  TrendPoint,
  CategoryTrend,
  ExportData,
} from './types';

/** Runs the complete analytics engine against a set of reports */
export function runAnalytics(reports: readonly AnalyticsReport[]): AnalyticsResult {
  const statistics = calculateStatistics(reports);
  const insights = generateInsights(reports);
  const forecast = forecastReports(reports.map((r) => r.createdAt));
  const categoryBreakdown = buildCategoryBreakdown(reports);
  const provinceRisks = calculateProvinceRisks(reports);
  const healthScore = calculateHealthScore(reports);
  const trendPoints = buildTrendPoints(reports);
  const categoryTrends = analyzeCategoryTrends(reports);

  return {
    statistics,
    insights,
    forecast,
    categoryBreakdown,
    provinceRisks,
    healthScore,
    trendPoints,
    categoryTrends,
  };
}
