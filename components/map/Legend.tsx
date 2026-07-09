import React from 'react';
import chroma from 'chroma-js';

interface LegendProps {
  metric: string;
}

const Legend: React.FC<LegendProps> = ({ metric }) => {
  const scales: Record<string, string[]> = {
    totalPollution: ['#f7fbff', '#08306b'],
    averageUrgency: ['#ffffcc', '#800026'],
    riskScore: ['#edf8e9', '#006d2c'],
    wasteDensity: ['#fef0d9', '#d7301f'],
    waterPollution: ['#deebf7', '#3182bd'],
    airPollution: ['#fee5d9', '#a50f15'],
  };

  const scale = chroma.scale(scales[metric]).domain([0, 100]);

  return (
    <div className="legend">
      <h4>{metric.replace(/([A-Z])/g, ' $1')}</h4>
      <div className="legend-scale">
        {[0, 25, 50, 75, 100].map((value) => (
          <div key={value} style={{ background: scale(value).hex() }}>
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;
