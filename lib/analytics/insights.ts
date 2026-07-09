import type { AnalyticsReport, Insight, Statistics, CategoryTrend, ProvinceRisk } from './types';
import { calculateStatistics } from './statistics';
import { analyzeCategoryTrends } from './trend';
import { calculateProvinceRisks } from './risk';

let insightCounter = 0;

function makeId(): string {
  return `insight_${++insightCounter}_${Date.now()}`;
}

/** Generates data-driven insights from reports - never hallucinated */
export function generateInsights(
  reports: readonly AnalyticsReport[]
): readonly Insight[] {
  const insights: Insight[] = [];

  const stats = calculateStatistics(reports);
  const categoryTrends = analyzeCategoryTrends(reports);
  const provinceRisks = calculateProvinceRisks(reports);

  insights.push(...buildStatisticsInsights(stats));
  insights.push(...buildTrendInsights(categoryTrends));
  insights.push(...buildRiskInsights(provinceRisks, stats));

  return insights.sort((a, b) => {
    const severityOrder = { critical: 0, warning: 1, info: 2 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });
}

function buildStatisticsInsights(stats: Statistics): Insight[] {
  const insights: Insight[] = [];

  if (stats.weeklyGrowthRate > 20) {
    insights.push({
      id: makeId(),
      message: `Pollution reports increased ${stats.weeklyGrowthRate.toFixed(1)}% this week compared to last week.`,
      confidence: 92,
      type: 'trend',
      severity: 'critical',
    });
  } else if (stats.weeklyGrowthRate > 0) {
    insights.push({
      id: makeId(),
      message: `Pollution reports rose ${stats.weeklyGrowthRate.toFixed(1)}% this week.`,
      confidence: 90,
      type: 'trend',
      severity: 'warning',
    });
  } else if (stats.weeklyGrowthRate < -10) {
    insights.push({
      id: makeId(),
      message: `Pollution reports declined ${Math.abs(stats.weeklyGrowthRate).toFixed(1)}% this week — a positive trend.`,
      confidence: 88,
      type: 'trend',
      severity: 'info',
    });
  }

  if (stats.averageUrgency >= 75) {
    insights.push({
      id: makeId(),
      message: `Average urgency score is critically high at ${stats.averageUrgency.toFixed(1)}/100.`,
      confidence: 95,
      type: 'risk',
      severity: 'critical',
    });
  } else if (stats.averageUrgency >= 55) {
    insights.push({
      id: makeId(),
      message: `Average urgency score is elevated at ${stats.averageUrgency.toFixed(1)}/100.`,
      confidence: 93,
      type: 'statistics',
      severity: 'warning',
    });
  } else {
    insights.push({
      id: makeId(),
      message: `Average urgency score is manageable at ${stats.averageUrgency.toFixed(1)}/100.`,
      confidence: 90,
      type: 'statistics',
      severity: 'info',
    });
  }

  if (stats.criticalReports > 0) {
    const pct = ((stats.criticalReports / stats.totalReports) * 100).toFixed(1);
    insights.push({
      id: makeId(),
      message: `${stats.criticalReports} critical reports detected — ${pct}% of all reports require immediate action.`,
      confidence: 97,
      type: 'risk',
      severity: 'critical',
    });
  }

  if (stats.todayReports > 0) {
    insights.push({
      id: makeId(),
      message: `${stats.todayReports} new pollution reports submitted today.`,
      confidence: 99,
      type: 'statistics',
      severity: 'info',
    });
  }

  return insights;
}

function buildTrendInsights(trends: readonly CategoryTrend[]): Insight[] {
  return trends
    .filter((t) => Math.abs(t.changePercent) >= 10)
    .slice(0, 5)
    .map((t) => ({
      id: makeId(),
      message: t.message,
      confidence: t.confidence,
      type: 'trend' as const,
      category: t.category,
      severity:
        t.direction === 'increasing' && t.changePercent > 30
          ? ('critical' as const)
          : t.direction === 'increasing'
          ? ('warning' as const)
          : ('info' as const),
    }));
}

function buildRiskInsights(
  risks: readonly ProvinceRisk[],
  stats: Statistics
): Insight[] {
  const insights: Insight[] = [];

  if (risks.length > 0) {
    const top = risks[0];
    insights.push({
      id: makeId(),
      message: `${top.province} has the highest environmental risk score (${top.riskScore}/100) with average urgency of ${top.averageUrgency.toFixed(1)}.`,
      confidence: 91,
      type: 'risk',
      severity: top.riskScore >= 70 ? 'critical' : 'warning',
    });
  }

  if (stats.monthlyGrowthRate > 15) {
    insights.push({
      id: makeId(),
      message: `Monthly pollution trend is accelerating — ${stats.monthlyGrowthRate.toFixed(1)}% increase vs previous month.`,
      confidence: 87,
      type: 'trend',
      severity: 'warning',
    });
  }

  return insights;
}
