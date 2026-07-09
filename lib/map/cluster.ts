import Supercluster from 'supercluster';
import { LatLngBounds } from 'leaflet';

export interface PollutionReport {
  id: string;
  lat: number;
  lng: number;
  urgency: number; // 1–10
  confidence: number; // 0–100
  category: string;
}

export interface ClusterProperties {
  averageUrgency: number;
  averageConfidence: number;
  dominantCategory: string;
  reportCount: number;
}

export const createClusterEngine = (reports: PollutionReport[]) => {
  const supercluster = new Supercluster({
    radius: 60, // Cluster radius in pixels
    maxZoom: 18,
    minZoom: 0,
    map: (props) => ({
      urgency: props.urgency,
      confidence: props.confidence,
      category: props.category,
    }),
    reduce: (accumulated, props) => {
      accumulated.urgency += props.urgency;
      accumulated.confidence += props.confidence;
      accumulated.categories[props.category] =
        (accumulated.categories[props.category] || 0) + 1;
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
      urgency: report.urgency,
      confidence: report.confidence,
      category: report.category,
    },
  }));

  supercluster.load(points);

  return {
    getClusters: (bounds: LatLngBounds, zoom: number) => {
      const bbox = [
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth(),
      ];
      return supercluster.getClusters(bbox, zoom);
    },
    getClusterProperties: (clusterId: number): ClusterProperties => {
      const cluster = supercluster.getCluster(clusterId);
      const categories = cluster.properties.categories;
      const dominantCategory = Object.keys(categories).reduce((a, b) =>
        categories[a] > categories[b] ? a : b
      );

      return {
        averageUrgency: cluster.properties.urgency / cluster.properties.count,
        averageConfidence:
          cluster.properties.confidence / cluster.properties.count,
        dominantCategory,
        reportCount: cluster.properties.count,
      };
    },
  };
};
