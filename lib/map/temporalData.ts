import { PollutionReport } from './cluster';
import { TimeRange } from './time';

export const filterReportsByTime = (
  reports: PollutionReport[],
  timeRange: TimeRange
): PollutionReport[] => {
  return reports.filter((report) => {
    const reportDate = new Date(report.created_at);
    return reportDate >= timeRange.start && reportDate <= timeRange.end;
  });
};
