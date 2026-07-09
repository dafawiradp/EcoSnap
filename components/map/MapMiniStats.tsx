
'use client';

import React from 'react';

interface MapMiniStatsProps {
  totalReports: number;
  activeClusters: number;
  currentZoom: number;
}

const MapMiniStats: React.FC<MapMiniStatsProps> = ({
  totalReports,
  activeClusters,
  currentZoom,
}) => {
  return (
    <div className="absolute bottom-4 right-4 z-50 bg-white rounded shadow p-3 text-xs text-gray-700 space-y-1 w-48">
      <div>Total Reports: {totalReports}</div>
      <div>Active Clusters: {activeClusters}</div>
      <div>Zoom Level: {currentZoom}</div>
    </div>
  );
};

export default MapMiniStats;
