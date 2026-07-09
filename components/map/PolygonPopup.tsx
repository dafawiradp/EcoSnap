import React from 'react';
import { PolygonFeature } from '@/lib/map/polygons';
import { PolygonStatistics } from '@/lib/map/statistics';

interface PolygonPopupProps {
  polygon: PolygonFeature;
  statistics: PolygonStatistics;
}

const PolygonPopup: React.FC<PolygonPopupProps> = ({ polygon, statistics }) => {
  const { name, population } = polygon.features[0].properties;
  const { reportCount, averageUrgency, dominantPollution } = statistics;

  return (
    <div className="polygon-popup">
      <h4>{name}</h4>
      <p>Population: {population.toLocaleString()}</p>
      <p>Reports: {reportCount}</p>
      <p>Average Urgency: {averageUrgency.toFixed(2)}</p>
      <p>Dominant Pollution: {dominantPollution}</p>
    </div>
  );
};

export default PolygonPopup;
