import React, { useEffect, useState } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import { loadGeoJSON, PolygonFeature } from '@/lib/map/polygons';
import { PollutionReport } from '@/lib/map/cluster';
import { computePolygonStatistics } from '@/lib/map/statistics';
import PolygonPopup from './PolygonPopup';

interface PolygonLayerProps {
  level: string; // country, province, city, district, village
  reports: PollutionReport[];
}

const PolygonLayer: React.FC<PolygonLayerProps> = ({ level, reports }) => {
  const [geoJSON, setGeoJSON] = useState<PolygonFeature | null>(null);
  const [selectedPolygon, setSelectedPolygon] = useState<PolygonFeature | null>(
    null
  );
  const map = useMap();

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const data = await loadGeoJSON(level);
        setGeoJSON(data);
      } catch (error) {
        console.error('Failed to load GeoJSON:', error);
      }
    };

    fetchGeoJSON();
  }, [level]);

  const onPolygonClick = (event: any) => {
    const layer = event.target;
    const polygon = layer.feature as PolygonFeature;
    setSelectedPolygon(polygon);
    map.fitBounds(layer.getBounds());
  };

  return (
    <>
      {geoJSON && (
        <GeoJSON
          data={geoJSON}
          style={() => ({
            color: '#3388ff',
            weight: 2,
            fillOpacity: 0.2,
          })}
          onEachFeature={(feature, layer) => {
            layer.on({
              click: onPolygonClick,
            });
          }}
        />
      )}
      {selectedPolygon && (
        <PolygonPopup
          polygon={selectedPolygon}
          statistics={computePolygonStatistics(selectedPolygon, reports)}
        />
      )}
    </>
  );
};

export default PolygonLayer;
