import React from 'react';
import { ViewportAnalytics } from '@/lib/map/analytics';

interface AnalyticsPanelProps {
  analytics: ViewportAnalytics;
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ analytics }) => {
  return (
    <div className="analytics-panel">
      <h4>Viewport Analytics</h4>
      <p>Visible Reports: {analytics.visibleReports}</p>
      <p>Average Urgency: {analytics.visibleUrgency.toFixed(2)}</p>
      <p>Visible Hotspots: {analytics.visibleHotspots}</p>
      <p>Average Confidence: {analytics.visibleConfidence.toFixed(2)}</p>
      <h5>Pollution Breakdown:</h5>
      <ul>
        {Object.entries(analytics.visiblePollution).map(([category, count]) => (
          <li key={category}>
            {category}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnalyticsPanel;
