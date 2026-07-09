/** Pollution categories supported by the system */
export type PollutionCategory =
  | 'air_pollution'
  | 'water_pollution'
  | 'soil_pollution'
  | 'waste_pollution'
  | 'noise_pollution'
  | 'light_pollution'
  | 'thermal_pollution'
  | 'visual_pollution'
  | 'electromagnetic_pollution'
  | 'other';

/** Waste types supported by the system */
export type WasteType =
  | 'organic'
  | 'plastic'
  | 'paper'
  | 'glass'
  | 'metal'
  | 'electronic'
  | 'chemical'
  | 'medical'
  | 'oil'
  | 'construction'
  | 'mixed'
  | 'other';

/** Urgency levels for pollution reports */
export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';

/** Severity levels for pollution incidents */
export type Severity = 'minor' | 'moderate' | 'severe' | 'catastrophic';

/** Risk score for pollution incidents (0–100) */
export type RiskScore = number;

/** Supported languages */
export type Language = 'en' | 'id' | 'mixed';
