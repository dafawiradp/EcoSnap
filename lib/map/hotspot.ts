import { Cluster } from './clustering';

export interface Hotspot {
  id: number;
  centroid: [number, number];
  score: number;
  priority: string;
  trend: string;
  recommendations: string[];
}

export const computeHotspotScore = (cluster: Cluster): number => {
  const density = cluster.reports.length; // Number of reports
  const averageUrgency = cluster.reports.reduce((sum, r) => sum + r.urgency, 0) / density;
  const averageConfidence = cluster.reports.reduce((sum, r) => sum + r.confidence, 0) / density;

  // Recency decay: Recent reports contribute more to the score
  const recencyWeight = cluster.reports.reduce((sum, r) => {
    const hoursOld = (Date.now() - new Date(r.created_at).getTime()) / 3_600_000;
    const decay = Math.exp(-hoursOld / 72); // Half-life of 72 hours
    return sum + decay;
  }, 0);

  return density * 0.4 + averageUrgency * 0.3 + averageConfidence * 0.2 + recencyWeight * 0.1;
};

export const getPriorityLevel = (score: number): string => {
  if (score >= 90) return 'Critical';
  if (score >= 70) return 'High';
  if (score >= 50) return 'Moderate';
  return 'Low';
};

export const generateRecommendations = (cluster: Cluster): string[] => {
  const dominantCategory = cluster.reports.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mainCategory = Object.keys(dominantCategory).reduce((a, b) =>
    dominantCategory[a] > dominantCategory[b] ? a : b
  );

  const recommendations: Record<string, string[]> = {
    water: ['Conduct water quality tests', 'Increase water treatment efforts'],
    air: ['Install air quality sensors', 'Issue public health advisories'],
    waste: ['Organize waste collection drives', 'Enforce waste disposal regulations'],
    // Add more categories as needed
  };

  return recommendations[mainCategory] || ['Investigate further'];
};
