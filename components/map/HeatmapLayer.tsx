import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { filterReportsByTime } from '@/lib/map/temporalData';
import { PollutionReport } from '@/lib/map/cluster';
import L from 'leaflet';
import type { TimeRange } from "@/lib/map/time";

interface HeatmapLayerProps {
  reports: PollutionReport[];
  timeRange: TimeRange;
}

const HeatmapLayer: React.FC<HeatmapLayerProps> = ({ reports, timeRange }) => {
  const map = useMap();
  const [heatmapLayer, setHeatmapLayer] = useState<L.Layer | null>(null);

  useEffect(() => {
    const filteredReports = filterReportsByTime(reports, timeRange);
    const heatmapData: [number, number, number?][] = reports.map(
  (report): [number, number, number] => [
    report.lat,
    report.lng,
    report.urgency / 100,
  ]
);

    if (heatmapLayer) {
      map.removeLayer(heatmapLayer);
    }

    const newHeatmapLayer = L.heatLayer(heatmapData, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
    });

    newHeatmapLayer.addTo(map);
    setHeatmapLayer(newHeatmapLayer);

    return () => {
      if (heatmapLayer) {
        map.removeLayer(heatmapLayer);
      }
    };
  }, [reports, timeRange, map]);

  return null;
};

export default HeatmapLayer;
