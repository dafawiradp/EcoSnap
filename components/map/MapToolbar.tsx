import React from 'react';

interface MapToolbarProps {
  metric: string;
  onMetricChange: (metric: string) => void;
}

const metrics = [
  'totalPollution',
  'averageUrgency',
  'riskScore',
  'wasteDensity',
  'waterPollution',
  'airPollution',
];

const MapToolbar: React.FC<MapToolbarProps> = ({ metric, onMetricChange }) => {
  return (
    <div className="map-toolbar">
      <select value={metric} onChange={(e) => onMetricChange(e.target.value)}>
        {metrics.map((m) => (
          <option key={m} value={m}>
            {m.replace(/([A-Z])/g, ' $1')}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MapToolbar;
