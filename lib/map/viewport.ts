import { LatLngBounds } from 'leaflet';

export interface BoundingBox {
  west: number;
  south: number;
  east: number;
  north: number;
}

export const getViewportBoundingBox = (bounds: LatLngBounds): BoundingBox => {
  return {
    west: bounds.getWest(),
    south: bounds.getSouth(),
    east: bounds.getEast(),
    north: bounds.getNorth(),
  };
};
