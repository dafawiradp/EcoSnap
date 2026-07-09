import React from 'react';
import { Insight } from '@/lib/map/insights';

interface InsightsPanelProps {
  insights: Insight[];
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights }) => {
  return (
    <div className="insights-panel">
      <h4>AI Insights</h4>
      <ul>
        {insights.map((insight, index) => (
          <li key={index}>{insight.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default InsightsPanel;
