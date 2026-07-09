import type { PollutionCategory, WasteType } from '../../types/taxonomy';

/** A single analytics-ready pollution report */
export interface AnalyticsReport {
  readonly id: string;
  readonly description: string;
  readonly category: PollutionCategory;
  readonly wasteType: WasteType;
  readonly urgency: number;
  readonly confidence: number;
  readonly createdAt: string;
  readonly location: string;
  readonly province: string;
  readonly city: string;
}

/** Aggregated statistics for a reporting period */
export interface Statistics {
  readonly totalReports: number;
  readonly todayReports: number;
  readonly thisWeekReports: number;
  readonly thisMonthReports: number;
  readonly weeklyGrowthRate: number;
  readonly monthlyGrowthRate: number;
  readonly averageUrgency: number;
  readonly averageConfidence: number;
  readonly criticalReports: number;
}

/** A single point in a time-series trend */
export interface TrendPoint {
  readonly date: string;
  readonly count: number;
  readonly movingAverage: number;
}

/** Per-category trend analysis */
export interface CategoryTrend {
  readonly category: PollutionCategory;
  readonly message: string;
  readonly confidence: number;
  readonly changePercent: number;
  readonly direction: 'increasing' | 'decreasing' | 'stable';
}

/** A single AI-generated insight */
export interface Insight {
  readonly id: string;
  readonly message: string;
  readonly confidence: number;
  readonly type: 'trend' | 'statistics' | 'risk' | 'recommendation';
  readonly category?: PollutionCategory;
  readonly severity: 'info' | 'warning' | 'critical';
}

/** A single day forecast with confidence interval */
export interface DailyForecast {
  readonly date: string;
  readonly predicted: number;
  readonly lower: number;
  readonly upper: number;
}

/** Complete forecast result */
export interface ForecastResult {
  readonly tomorrow: number;
  readonly nextWeek: number;
  readonly nextMonth: number;
  readonly trendDirection: 'increasing' | 'decreasing' | 'stable';
  readonly growthRate: number;
  readonly riskIncrease: number;
  readonly confidence: number;
  readonly dailyForecasts: readonly DailyForecast[];
}

/** Per-category report breakdown */
export interface CategoryBreakdown {
  readonly category: PollutionCategory;
  readonly count: number;
  readonly percentage: number;
  readonly growthRate: number;
}

/** Risk profile for a province */
export interface ProvinceRisk {
  readonly province: string;
  readonly reportCount: number;
  readonly averageUrgency: number;
  readonly riskScore: number;
  readonly topCategory: PollutionCategory;
}

/** Environmental health score components */
export interface HealthScoreComponents {
  readonly urgencyScore: number;
  readonly volumeScore: number;
  readonly trendScore: number;
  readonly criticalScore: number;
}

/** Overall environmental health score */
export interface HealthScore {
  readonly score: number;
  readonly grade: 'A' | 'B' | 'C' | 'D' | 'F';
  readonly description: string;
  readonly components: HealthScoreComponents;
}

/** Complete analytics engine result */
export interface AnalyticsResult {
  readonly statistics: Statistics;
  readonly insights: readonly Insight[];
  readonly forecast: ForecastResult;
  readonly categoryBreakdown: readonly CategoryBreakdown[];
  readonly provinceRisks: readonly ProvinceRisk[];
  readonly healthScore: HealthScore;
  readonly trendPoints: readonly TrendPoint[];
  readonly categoryTrends: readonly CategoryTrend[];
}

/** Structured data for export */
export interface ExportData {
  readonly title: string;
  readonly generatedAt: string;
  readonly statistics: Statistics;
  readonly healthScore: HealthScore;
  readonly insights: readonly Insight[];
  readonly forecast: ForecastResult;
  readonly categoryBreakdown: readonly CategoryBreakdown[];
  readonly provinceRisks: readonly ProvinceRisk[];
  readonly recommendations: readonly string[];
}
