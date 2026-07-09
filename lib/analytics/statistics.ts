import type { AnalyticsReport, Statistics } from './types';

function getDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
}

function getMonthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getPreviousWeekStart(date: Date): Date {
  const d = getWeekStart(date);
  d.setDate(d.getDate() - 7);
  return d;
}

function getPreviousMonthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}

function getPreviousMonthEnd(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 0);
}

function safeGrowthRate(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Number((((current - previous) / previous) * 100).toFixed(2));
}

/** Calculates comprehensive statistics from a set of reports */
export function calculateStatistics(reports: readonly AnalyticsReport[]): Statistics {
  const now = new Date();
  const todayStr = getDateString(now);
  const weekStart = getWeekStart(now);
  const monthStart = getMonthStart(now);
  const prevWeekStart = getPreviousWeekStart(now);
  const prevMonthStart = getPreviousMonthStart(now);
  const prevMonthEnd = getPreviousMonthEnd(now);

  let todayReports = 0;
  let thisWeekReports = 0;
  let thisMonthReports = 0;
  let prevWeekReports = 0;
  let prevMonthReports = 0;
  let totalUrgency = 0;
  let totalConfidence = 0;
  let criticalReports = 0;

  for (const report of reports) {
    const createdAt = new Date(report.createdAt);
    const dateStr = getDateString(createdAt);

    if (dateStr === todayStr) todayReports++;
    if (createdAt >= weekStart) thisWeekReports++;
    if (createdAt >= monthStart) thisMonthReports++;
    if (createdAt >= prevWeekStart && createdAt < weekStart) prevWeekReports++;
    if (createdAt >= prevMonthStart && createdAt <= prevMonthEnd) prevMonthReports++;
    if (report.urgency >= 80) criticalReports++;

    totalUrgency += report.urgency;
    totalConfidence += report.confidence;
  }

  const total = reports.length;
  const averageUrgency = total > 0 ? Number((totalUrgency / total).toFixed(2)) : 0;
  const averageConfidence = total > 0 ? Number((totalConfidence / total).toFixed(2)) : 0;

  return {
    totalReports: total,
    todayReports,
    thisWeekReports,
    thisMonthReports,
    weeklyGrowthRate: safeGrowthRate(thisWeekReports, prevWeekReports),
    monthlyGrowthRate: safeGrowthRate(thisMonthReports, prevMonthReports),
    averageUrgency,
    averageConfidence,
    criticalReports,
  };
}
