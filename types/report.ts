import { PollutionCategory, WasteType, UrgencyLevel, Language } from './taxonomy';

/** Represents a pollution report */
export interface Report {
  readonly id: string;
  readonly description: string;
  readonly category: PollutionCategory;
  readonly wasteType: WasteType;
  readonly urgency: UrgencyLevel;
  readonly location: GeoLocation;
  readonly timestamp: Timestamp;
  readonly language: Language;
}

/** Represents a new pollution report to be submitted */
export interface NewReport {
  readonly description: string;
  readonly location: GeoLocation;
  readonly language: Language;
}

/** Summary of a pollution report */
export interface ReportSummary {
  readonly totalReports: number;
  readonly categories: Record<PollutionCategory, number>;
  readonly wasteTypes: Record<WasteType, number>;
}

/** Filters for querying reports */
export interface ReportFilter {
  readonly category?: PollutionCategory;
  readonly wasteType?: WasteType;
  readonly urgency?: UrgencyLevel;
  readonly dateRange?: { start: Timestamp; end: Timestamp };
  readonly location?: GeoLocation;
}

/** Statistics for pollution reports */
export interface ReportStatistics {
  readonly totalReports: number;
  readonly highUrgencyReports: number;
  readonly categoryBreakdown: Record<PollutionCategory, number>;
  readonly wasteTypeBreakdown: Record<WasteType, number>;
}

/** Represents a geographical location */
export interface GeoLocation {
  readonly latitude: number;
  readonly longitude: number;
}
