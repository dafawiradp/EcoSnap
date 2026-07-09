import { PollutionReport } from "./clustering";

export interface ViewportAnalytics {
  visibleReports: number;
  visibleUrgency: number;
  visibleHotspots: number;
  visibleConfidence: number;
  visiblePollution: Record<string, number>;
}

export interface PollutionMetrics {
  totalReports: number;
  dominantCategory: string;
  averageUrgency: number;
  pollutionCounts: Record<string, number>;
}

export function calculateViewportAnalytics(
  reports: PollutionReport[]
): ViewportAnalytics {

  if (reports.length === 0) {
    return {
      visibleReports: 0,
      visibleUrgency: 0,
      visibleHotspots: 0,
      visibleConfidence: 0,
      visiblePollution: {},
    };
  }

  const pollution: Record<string, number> = {};

  let urgency = 0;
  let confidence = 0;
  let hotspots = 0;

  for (const report of reports) {

    urgency += report.urgency;

    confidence += report.confidence ?? 100;

    pollution[report.category] =
      (pollution[report.category] || 0) + 1;

    if (report.urgency >= 80) {
      hotspots++;
    }
  }

  return {

    visibleReports: reports.length,

    visibleUrgency:
      urgency / reports.length,

    visibleHotspots: hotspots,

    visibleConfidence:
      confidence / reports.length,

    visiblePollution: pollution,

  };

}

export function calculatePollutionMetrics(
  reports: PollutionReport[]
): PollutionMetrics {

  const pollutionCounts: Record<string, number> = {};

  let urgency = 0;

  for (const report of reports) {

    urgency += report.urgency;

    pollutionCounts[report.category] =
      (pollutionCounts[report.category] || 0) + 1;

  }

  const dominantCategory =
    Object.keys(pollutionCounts).sort(
      (a, b) =>
        pollutionCounts[b] - pollutionCounts[a]
    )[0] ?? "unknown";

  return {

    totalReports: reports.length,

    dominantCategory,

    averageUrgency:
      reports.length === 0
        ? 0
        : urgency / reports.length,

    pollutionCounts,

  };

}