import { Cluster } from './clustering';
import { Polygon } from 'geojson';

export const generateHotspotPolygons = (clusters: Cluster[]): Polygon[] => {
  return clusters.map((cluster) => {
    const coordinates = cluster.reports.map((r) => [r.lng, r.lat]);
    return {
      type: 'Polygon',
      coordinates: [coordinates], // Only one ring
    };
  });
};
