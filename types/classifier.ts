import { PollutionCategory, WasteType, RiskScore, UrgencyLevel } from './taxonomy';

/** Result of a classification */
export interface ClassificationResult {
  readonly category: PollutionCategory;
  readonly wasteType: WasteType;
  readonly confidence: ConfidenceScore;
  readonly urgency: UrgencyLevel;
  readonly recommendations: string[];
}

/** Represents a keyword match in the classification process */
export interface KeywordMatch {
  readonly keyword: string;
  readonly score: number;
}

/** Score for a pollution category */
export interface CategoryScore {
  readonly category: PollutionCategory;
  readonly score: number;
}

/** Score for a waste type */
export interface WasteScore {
  readonly wasteType: WasteType;
  readonly score: number;
}

/** Confidence score for classification (0–100) */
export type ConfidenceScore = number;

/** Urgency score for classification (0–100) */
export type UrgencyScore = number;

/** Options for configuring the classifier */
export interface ClassifierOptions {
  readonly enableFuzzyMatching?: boolean;
  readonly language?: Language;
}
