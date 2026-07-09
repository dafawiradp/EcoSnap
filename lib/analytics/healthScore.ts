import type { AnalyticsReport, HealthScore, HealthScoreComponents } from './types';

function scoreGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 80) return 'A';
  if (score >= 65) return 'B';
  if (score >= 50) return 'C';
  if (score >= 35) return 'D';
  return 'F';
}

function gradeDescription(grade: 'A' | 'B' | 'C' | 'D' | 'F'): string {
  const descriptions: Record<'A' | 'B' | 'C' | 'D' | 'F', string> = {
    A: 'Excellent environmental health. Minimal critical incidents.',
    B: 'Good environmental health. Manageable pollution levels.',
    C: 'Moderate environmental health. Action recommended.',
    D: 'Poor environmental health. Immediate intervention needed.',
    F: 'Critical environmental health. Emergency response required.',
  };
  return descriptions[grade];
}

/** Calculates the overall environmental health score */
export function calculateHealthScore(
  reports: readonly AnalyticsReport[]
): HealthScore {
  const total = reports.length;

  if (total === 0) {
    const components: HealthScoreComponents = {
      urgencyScore: 100,
      volumeScore: 100,
      trendScore: 100,
      criticalScore: 100,
    };
    return {
      score: 100,
      grade: 'A',
      description: gradeDescription('A'),
      components,
    };
  }

  const averageUrgency =
    reports.reduce((sum, r) => sum + r.urgency, 0) / total;
  const criticalCount = reports.filter((r) => r.urgency >= 80).length;
  const criticalRatio = criticalCount / total;

  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(now.getDate() - 7);
  const twoWeeksAgo = new Date(now);
  twoWeeksAgo.setDate(now.getDate() - 14);

  const thisWeek = reports.filter((r) => new Date(r.createdAt) >= weekAgo).length;
  const lastWeek = reports.filter(
    (r) =>
      new Date(r.createdAt) >= twoWeeksAgo &&
      new Date(r.createdAt) < weekAgo
  ).length;

  const growthRate =
    lastWeek > 0 ? (thisWeek - lastWeek) / lastWeek : 0;

  const urgencyScore = Math.round(100 - averageUrgency);
  const criticalScore = Math.round(100 - criticalRatio * 100);
  const trendScore = Math.round(100 - Math.max(0, growthRate * 50));
  const volumeScore = Math.round(Math.max(0, 100 - Math.log10(total + 1) * 20));

  const score = Math.round(
    urgencyScore * 0.35 +
      criticalScore * 0.3 +
      trendScore * 0.2 +
      volumeScore * 0.15
  );

  const clamped = Math.max(0, Math.min(100, score));
  const grade = scoreGrade(clamped);

  return {
    score: clamped,
    grade,
    description: gradeDescription(grade),
    components: { urgencyScore, volumeScore, trendScore, criticalScore },
  };
}
