import { PollutionCategory, WasteType } from './taxonomy';

/** Statistics for the dashboard */
export interface DashboardStatistics {
  readonly totalReports: number;
  readonly highUrgencyReports: number;
  readonly categoryStatistics: CategoryStatistics[];
  readonly wasteTypeStatistics: WasteTypeStatistics[];
}

/** Statistics for a specific pollution category */
export interface CategoryStatistics {
  readonly category: PollutionCategory;
  readonly count: number;
}

/** Statistics for a specific waste type */
export interface WasteTypeStatistics {
  readonly wasteType: WasteType;
  readonly count: number;
}

/** Monthly trend data */
export interface MonthlyTrend {
  readonly month: string;
  readonly reportCount: number;
}

/** Represents a point on a heatmap */
export interface HeatMapPoint {
  readonly latitude: number;
  readonly longitude: number;
  readonly intensity: number;
}
