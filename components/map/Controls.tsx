
'use client';

import React from 'react';
import { useMap } from 'react-leaflet';

const Controls: React.FC = () => {
  const map = useMap();

  const zoomIn = () => map.zoomIn();
  const zoomOut = () => map.zoomOut();

  return (
    <div className="absolute top-4 right-4 z-50 flex flex-col space-y-2 bg-white rounded shadow p-2">
      <button onClick={zoomIn} className="p-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
      <button onClick={zoomOut} className="p-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
    </div>
  );
};

export default Controls;
