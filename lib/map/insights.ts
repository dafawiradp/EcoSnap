import { PollutionReport } from './clustering';
import { calculatePollutionMetrics } from './analytics';
import { analyzeTrends } from './trends';
import { analyzeSpatialConcentration } from './spatialAnalysis';

export interface Insight {
  message: string;
  data: Record<string, any>;
}

export const generateInsights = (reports: PollutionReport[]): Insight[] => {
  const metrics = calculatePollutionMetrics(reports);
  const trend = analyzeTrends(reports);
  const spatialConcentration = analyzeSpatialConcentration(reports);

  const insights: Insight[] = [];

  if (metrics.totalReports > 0) {
    insights.push({
      message: `This area has ${trend} pollution levels.`,
      data: { trend },
    });

    insights.push({
      message: `The dominant pollution category is ${metrics.dominantCategory}.`,
      data: { dominantCategory: metrics.dominantCategory },
    });

    insights.push({
      message: `The average urgency score is ${metrics.averageUrgency.toFixed(
        2
      )}.`,
      data: { averageUrgency: metrics.averageUrgency },
    });

    insights.push({
      message: spatialConcentration,
      data: {},
    });
  } else {
    insights.push({
      message: 'No pollution reports available for this area.',
      data: {},
    });
  }

  return insights;
};
