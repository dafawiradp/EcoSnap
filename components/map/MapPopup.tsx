
'use client';

import React from 'react';
import { Popup } from 'react-leaflet';
import type { AnalyticsReport } from '../../lib/analytics/types';

interface MapPopupProps {
  reportId: string | null;
  onClose: () => void;
  reports?: AnalyticsReport[];
}

const MapPopup: React.FC<MapPopupProps> = ({ reportId, onClose, reports = [] }) => {
  if (!reportId) return null;

  const report = reports.find((r) => r.id === reportId);
  if (!report) return null;

  return (
    <Popup position={report.location.split(',').map(Number) as [number, number]} onClose={onClose}>
      <div className="max-w-xs">
        <h3 className="font-bold text-lg">{report.category}</h3>
        <p>{report.description}</p>
        <p>
          <strong>Urgency:</strong> {report.urgency}
        </p>
        <p>
          <strong>Confidence:</strong> {report.confidence}%
        </p>
        <p>
          <strong>Location:</strong> {report.province}, {report.city}
        </p>
        <p>
          <strong>Date:</strong> {new Date(report.createdAt).toLocaleString()}
        </p>
      </div>
    </Popup>
  );
};

export default MapPopup;
