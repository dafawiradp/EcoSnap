import React, { useEffect, useState } from 'react';
import { Marker, useMap } from 'react-leaflet';
import { filterReportsByBoundingBox } from '@/lib/map/spatialIndex';
import { getViewportBoundingBox } from '@/lib/map/viewport';
import { PollutionReport } from '@/lib/map/clustering';

interface VirtualMarkerLayerProps {
  reports: PollutionReport[];
}

const VirtualMarkerLayer: React.FC<VirtualMarkerLayerProps> = ({ reports }) => {
  const map = useMap();
  const [visibleReports, setVisibleReports] = useState<PollutionReport[]>([]);

  useEffect(() => {
    const updateVisibleReports = () => {
      const bounds = getViewportBoundingBox(map.getBounds());
      const filteredReports = filterReportsByBoundingBox(reports, bounds);
      setVisibleReports(filteredReports);
    };

    map.on('moveend', updateVisibleReports);
    updateVisibleReports();

    return () => {
      map.off('moveend', updateVisibleReports);
    };
  }, [map, reports]);

  return (
    <>
      {visibleReports.map((report) => (
        <Marker
          key={report.id}
          position={[report.lat, report.lng]}
          icon={L.divIcon({
            html: `<div class="marker-icon">${report.category}</div>`,
            className: 'individual-marker',
          })}
        />
      ))}
    </>
  );
};

export default VirtualMarkerLayer;
