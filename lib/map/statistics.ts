import { PollutionReport } from './cluster';
import { PolygonFeature } from './polygons';

export interface PolygonStatistics {
  population: number;
  reportCount: number;
  averageUrgency: number;
  dominantPollution: string;
}

export const computePolygonStatistics = (
  polygon: PolygonFeature,
  reports: PollutionReport[]
): PolygonStatistics => {
  const polygonBounds = L.geoJSON(polygon).getBounds();

  const filteredReports = reports.filter((report) =>
    polygonBounds.contains([report.lat, report.lng])
  );

  const reportCount = filteredReports.length;
  const averageUrgency =
    reportCount > 0
      ? filteredReports.reduce((sum, r) => sum + r.urgency, 0) / reportCount
      : 0;

  const pollutionCounts = filteredReports.reduce((acc, report) => {
    acc[report.category] = (acc[report.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const dominantPollution = Object.keys(pollutionCounts).reduce((a, b) =>
    pollutionCounts[a] > pollutionCounts[b] ? a : b
  );

  return {
    population: polygon.features[0].properties.population,
    reportCount,
    averageUrgency,
    dominantPollution,
  };
};
