import type { AnalyticsReport, ProvinceRisk } from './types';
import type { PollutionCategory } from '../../types/taxonomy';

/** Calculates province-level risk profiles */
export function calculateProvinceRisks(
  reports: readonly AnalyticsReport[]
): readonly ProvinceRisk[] {
  type ProvinceAccum = {
    totalUrgency: number;
    count: number;
    categoryCounts: Partial<Record<PollutionCategory, number>>;
  };

  const map = new Map<string, ProvinceAccum>();

  for (const report of reports) {
    const { province, urgency, category } = report;
    if (!province) continue;

    const existing = map.get(province) ?? {
      totalUrgency: 0,
      count: 0,
      categoryCounts: {},
    };

    map.set(province, {
      totalUrgency: existing.totalUrgency + urgency,
      count: existing.count + 1,
      categoryCounts: {
        ...existing.categoryCounts,
        [category]: (existing.categoryCounts[category] ?? 0) + 1,
      },
    });
  }

  const risks: ProvinceRisk[] = [];

  for (const [province, { totalUrgency, count, categoryCounts }] of map.entries()) {
    const averageUrgency = Number((totalUrgency / count).toFixed(2));
    const topCategory = getTopKey(categoryCounts) as PollutionCategory;
    const riskScore = calculateRiskScore(averageUrgency, count, reports.length);

    risks.push({ province, reportCount: count, averageUrgency, riskScore, topCategory });
  }

  return risks.sort((a, b) => b.riskScore - a.riskScore);
}

function getTopKey(record: Partial<Record<string, number>>): string {
  let topKey = 'other';
  let topVal = 0;
  for (const [k, v] of Object.entries(record)) {
    if ((v ?? 0) > topVal) {
      topVal = v ?? 0;
      topKey = k;
    }
  }
  return topKey;
}

function calculateRiskScore(
  avgUrgency: number,
  count: number,
  totalReports: number
): number {
  const urgencyWeight = 0.6;
  const volumeWeight = 0.4;
  const volumeScore = totalReports > 0 ? (count / totalReports) * 100 : 0;
  const score = avgUrgency * urgencyWeight + volumeScore * volumeWeight;
  return Math.round(Math.min(100, score));
}
