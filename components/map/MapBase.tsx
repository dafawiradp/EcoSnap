import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { PollutionReport } from '@/lib/map/clustering';
import { generateInsights, Insight } from '@/lib/map/insights';
import InsightsPanel from './InsightsPanel';

interface MapBaseProps {
  reports: PollutionReport[];
}

const MapBase: React.FC<MapBaseProps> = ({ reports, children }) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const map = useMap();

  useEffect(() => {
    const updateInsights = () => {
      setInsights(generateInsights(reports));
    };

    map.on('moveend', updateInsights);
    updateInsights();

    return () => {
      map.off('moveend', updateInsights);
    };
  }, [map, reports]);

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {children}
      <InsightsPanel insights={insights} />
    </>
  );
};

export default MapBase;
