
'use client';

import React from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { AnalyticsReport } from '../../lib/analytics/types';

interface MarkerLayerProps {
  reports?: AnalyticsReport[];
  onSelectReport?: (id: string) => void;
}

const MarkerLayer: React.FC<MarkerLayerProps> = ({ reports = [], onSelectReport }) => {
  const map = useMap();

  return (
    <>
      {reports.map((report) => {
        const position: [number, number] = [
          parseFloat(report.location.split(',')[0]),
          parseFloat(report.location.split(',')[1]),
        ];

        return (
          <Marker
            key={report.id}
            position={position}
            eventHandlers={{
              click: () => {
                if (onSelectReport) onSelectReport(report.id);
              },
            }}
            icon={L.icon({
              iconUrl: '/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowUrl: '/marker-shadow.png',
              shadowSize: [41, 41],
            })}
          >
            <Popup>
              <div>
                <strong>{report.category}</strong>
                <br />
                Urgency: {report.urgency}
                <br />
                Confidence: {report.confidence}%
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default MarkerLayer;
