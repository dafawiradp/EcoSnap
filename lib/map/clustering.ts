import Supercluster from 'supercluster';

export interface PollutionReport {
  id: string;
  lat: number;
  lng: number;
  urgency: number; // 1–10
  confidence: number; // 0–100
  category: string;
  created_at: string;
}

export const createSupercluster = (reports: PollutionReport[]) => {
  const supercluster = new Supercluster({
    radius: 60, // Cluster radius in pixels
    maxZoom: 18,
    minZoom: 0,
    map: (props) => ({
      urgency: props.urgency,
      confidence: props.confidence,
    }),
    reduce: (accumulated, props) => {
      accumulated.urgency += props.urgency;
      accumulated.confidence += props.confidence;
      accumulated.count += 1;
    },
  });

  const points = reports.map((report) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [report.lng, report.lat],
    },
    properties: {
      id: report.id,
      urgency: report.urgency,
      confidence: report.confidence,
      category: report.category,
    },
  }));

  supercluster.load(points);

  return supercluster;
};
