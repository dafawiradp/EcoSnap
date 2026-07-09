import { FeatureCollection, Geometry } from 'geojson';

export interface ProvinceProperties {
  id: string;
  name: string;
  totalPollution: number;
  averageUrgency: number;
  riskScore: number;
  wasteDensity: number;
  waterPollution: number;
  airPollution: number;
}

export interface ProvinceFeature extends FeatureCollection<Geometry, ProvinceProperties> {}

export const loadGeoJSON = async (): Promise<ProvinceFeature> => {
  const response = await fetch('/geojson/provinces.geojson'); // GeoJSON stored in public/geojson
  if (!response.ok) {
    throw new Error('Failed to load GeoJSON data');
  }
  return response.json();
};
