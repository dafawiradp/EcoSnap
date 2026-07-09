import { PollutionReport } from './clustering';

export const analyzeTrends = (reports: PollutionReport[]): string => {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const recentReports = reports.filter(
    (r) => new Date(r.created_at) >= oneWeekAgo
  );

  const weeklyGrowth =
    (recentReports.length - reports.length) / (reports.length || 1);

  if (weeklyGrowth > 0.2) {
    return 'rapidly increasing';
  } else if (weeklyGrowth > 0) {
    return 'slightly increasing';
  } else if (weeklyGrowth < 0) {
    return 'decreasing';
  } else {
    return 'stable';
  }
};
