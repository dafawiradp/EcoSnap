
export type PollutionCategory =
  | 'water'
  | 'air'
  | 'soil'
  | 'waste'
  | 'noise'
  | 'light'
  | 'thermal'
  | 'visual'
  | 'electromagnetic';

export type ReportStatus = 'pending' | 'verified' | 'resolved' | 'rejected';

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';

export interface PollutionReport {
  id: string;
  lat: number;
  lng: number;
  category: PollutionCategory;
  subtype: string;
  urgency: number;       // 1–10
  confidence: number;    // 0–100
  province: string;
  city: string;
  description: string;
  created_at: string;
  status:
