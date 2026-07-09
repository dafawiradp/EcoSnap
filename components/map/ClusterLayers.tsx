import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { createSupercluster, PollutionReport } from '@/lib/map/clustering';
import L from 'leaflet';
import {
  Marker,
  Popup,
  Circle,
  Polygon,
  Tooltip,
} from "react-leaflet";

interface ClusterLayerProps {
  reports: PollutionReport[];
}

const ClusterLayer: React.FC<ClusterLayerProps> = ({ reports }) => {
  const map = useMap();
  const [clusters, setClusters] = useState<any[]>([]);
  const supercluster = createSupercluster(reports);

  useEffect(() => {
    const updateClusters = () => {
      const bounds = map.getBounds();
      const zoom = map.getZoom();
      const bbox = [
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth(),
      ];
      const newClusters = supercluster.getClusters(bbox, zoom);
      setClusters(newClusters);
    };

    map.on('moveend', updateClusters);
    updateClusters();

    return () => {
      map.off('moveend', updateClusters);
    };
  }, [map, supercluster]);

  return (
    <>
      {clusters.map((cluster) => {
        const [lng, lat] = cluster.geometry.coordinates;

        if (cluster.properties.cluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[lat, lng]}
              icon={L.divIcon({
                html: `<div class="cluster-icon">${cluster.properties.point_count}</div>`,
                className: 'cluster-marker',
              })}
            />
          );
        }

        return (
          <Marker
            key={`marker-${cluster.properties.id}`}
            position={[lat, lng]}
            icon={L.divIcon({
              html: `<div class="marker-icon">${cluster.properties.category}</div>`,
              className: 'individual-marker',
            })}
          />
        );
      })}
    </>
  );
};

export default ClusterLayer;
