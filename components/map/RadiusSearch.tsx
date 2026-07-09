import React, { useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

interface RadiusSearchProps {
  reports: PollutionReport[];
}

const RadiusSearch: React.FC<RadiusSearchProps> = ({ reports }) => {
  const map = useMap();
  const [radius, setRadius] = useState(1000); // Default radius in meters
  const [results, setResults] = useState<PollutionReport[]>([]);

  const handleRadiusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRadius(Number(e.target.value));
  };

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    const filteredReports = reports.filter((report) => {
      const distance = map.distance([lat, lng], [report.lat, report.lng]);
      return distance <= radius;
    });
    setResults(filteredReports);
  };

  map.on('click', handleMapClick);

  return (
    <div className="radius-search">
      <select onChange={handleRadiusChange} value={radius}>
        <option value={100}>100 m</option>
        <option value={250}>250 m</option>
        <option value={500}>500 m</option>
        <option value={1000}>1 km</option>
        <option value={2000}>2 km</option>
        <option value={5000}>5 km</option>
        <option value={10000}>10 km</option>
      </select>
      <div>
        <h4>Search Results</h4>
        <p>Number of Reports: {results.length}</p>
        <p>
          Dominant Pollution:{' '}
          {results.reduce(
            (acc, report) => {
              acc[report.category] = (acc[report.category] || 0) + 1;
              return acc;
            },
            {} as Record<string, number>
          )}
        </p>
        <p>
          Average Urgency:{' '}
          {results.reduce((sum, report) => sum + report.urgency, 0) /
            results.length || 0}
        </p>
        <p>
          Average Confidence:{' '}
          {results.reduce((sum, report) => sum + report.confidence, 0) /
            results.length || 0}
        </p>
      </div>
    </div>
  );
};

export default RadiusSearch;
