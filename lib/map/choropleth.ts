import chroma from 'chroma-js';

export const getColorScale = (metric: string, value: number): string => {
  const scales: Record<string, string[]> = {
    totalPollution: ['#f7fbff', '#08306b'],
    averageUrgency: ['#ffffcc', '#800026'],
    riskScore: ['#edf8e9', '#006d2c'],
    wasteDensity: ['#fef0d9', '#d7301f'],
    waterPollution: ['#deebf7', '#3182bd'],
    airPollution: ['#fee5d9', '#a50f15'],
  };

  const scale = chroma.scale(scales[metric]).domain([0, 100]); // Normalize to 0–100
  return scale(value).hex();
};

export const computeMetricValue = (properties: any, metric: string): number => {
  return properties[metric] || 0;
};
