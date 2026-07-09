import React, { useEffect, useState } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import { loadGeoJSON, ProvinceFeature } from '@/lib/map/geojson';
import { getColorScale, computeMetricValue } from '@/lib/map/choropleth';

interface ChoroplethLayerProps {
  metric: string; // Metric to visualize (e.g., totalPollution, averageUrgency)
}

const ChoroplethLayer: React.FC<ChoroplethLayerProps> = ({ metric }) => {
  const [geoJSON, setGeoJSON] = useState<ProvinceFeature | null>(null);
  const map = useMap();

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const data = await loadGeoJSON();
        setGeoJSON(data);
      } catch (error) {
        console.error('Failed to load GeoJSON:', error);
      }
    };

    fetchGeoJSON();
  }, []);

  const style = (feature: any) => {
    const value = computeMetricValue(feature.properties, metric);
    return {
      fillColor: getColorScale(metric, value),
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7,
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: () => {
        const { name, totalPollution, averageUrgency, riskScore } = feature.properties;
        alert(`
          Province: ${name}
          Total Pollution: ${totalPollution}
          Average Urgency: ${averageUrgency}
          Risk Score: ${riskScore}
        `);
      },
    });
  };

  return geoJSON ? (
    <GeoJSON data={geoJSON} style={style} onEachFeature={onEachFeature} />
  ) : null;
};

export default ChoroplethLayer;
