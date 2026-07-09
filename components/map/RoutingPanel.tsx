
'use client';

import React, { useState } from 'react';

interface RoutingPanelProps {
  onRouteChange: (start: string, end: string) => void;
}

const RoutingPanel: React.FC<RoutingPanelProps> = ({ onRouteChange }) => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleRoute = () => {
    if (start && end) {
      onRouteChange(start, end);
    }
  };

  return (
    <div className="absolute top-4 left-4 z-50 bg-white rounded shadow p-4 w-72 space-y-2">
      <h4 className="font-semibold">Routing Panel</h4>
      <input
        type="text"
        placeholder="Start location"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        className="w-full border rounded px-2 py-1"
      />
      <input
        type="text"
        placeholder="End location"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        className="w-full border rounded px-2 py-1"
      />
      <button
        onClick={handleRoute}
        className="w-full bg-green-600 text-white rounded py-2 hover:bg-green-700"
      >
        Calculate Route
      </button>
    </div>
  );
};

export default RoutingPanel;
