import React from "react";
import type { Hotspot } from "@/lib/map/hotspot";

interface HotspotPopupProps {
  hotspot: Hotspot;
}

interface HotspotPopupProps {
  hotspot: Hotspot;
}

const HotspotPopup: React.FC<HotspotPopupProps> = ({ hotspot }) => {
  return (
    <div>
      <h4>Hotspot Details</h4>
      <p>Score: {hotspot.score.toFixed(2)}</p>
      <p>Priority: {hotspot.priority}</p>
      <p>Trend: {hotspot.trend}</p>
      <h5>Recommendations:</h5>
      <ul>
        {hotspot.recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
};

export default HotspotPopup;
