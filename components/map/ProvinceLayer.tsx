
'use client';

import React from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import type { FeatureCollection } from 'geojson';

interface ProvinceLayerProps {
  geojson: FeatureCollection;
  onProvinceClick?: (provinceName: string) => void;
}

const ProvinceLayer: React.FC<ProvinceLayerProps> = ({ geojson, onProvinceClick }) => {
  const map = useMap();

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: () => {
        if (onProvinceClick && feature.properties?.name) {
          onProvinceClick(feature.properties.name);
        }
      },
    });
  };

  return <GeoJSON data={geojson} onEachFeature={onEachFeature} style={{ color: '#666', weight: 1 }} />;
};

export default ProvinceLayer;
