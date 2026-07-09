import React from 'react';
import { GeoJSON } from 'react-leaflet';
import { Polygon } from 'geojson';
import { Hotspot } from '@/lib/map/hotspot';

interface HotspotLayerProps {
  polygons: Polygon[];
  hotspots: Hotspot[];
}

const HotspotLayer: React.FC<HotspotLayerProps> = ({ polygons, hotspots }) => {
  return (
    <>
      {polygons.map((polygon, index) => (
        <GeoJSON
          key={index}
          data={polygon}
          style={() => ({
            color: '#ff5722',
            weight: 2,
            fillOpacity: 0.6,
          })}
        />
      ))}
    </>
  );
};

export default HotspotLayer;
