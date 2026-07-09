import { PollutionReport } from './clustering';

export const analyzeSpatialConcentration = (
  reports: PollutionReport[]
): string => {
  const riverProximityReports = reports.filter(
    (r) => r.category === 'water' && r.subtype === 'river'
  );

  if (riverProximityReports.length > reports.length * 0.6) {
    return 'Water pollution is concentrated around rivers.';
  }

  const industrialReports = reports.filter((r) => r.subtype === 'industrial');
  if (industrialReports.length > reports.length * 0.5) {
    return 'Industrial waste dominates this area.';
  }

  return 'No clear spatial concentration detected.';
};
