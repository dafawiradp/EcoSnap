import { PollutionReport } from './clustering';

export const filterReportsByBoundingBox = (
  reports: PollutionReport[],
  bounds: { west: number; south: number; east: number; north: number }
): PollutionReport[] => {
  return reports.filter(
    (report) =>
      report.lat >= bounds.south &&
      report.lat <= bounds.north &&
      report.lng >= bounds.west &&
      report.lng <= bounds.east
  );
};
