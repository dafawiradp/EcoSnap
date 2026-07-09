
import type { PollutionCategory } from './cluster';

// ─── Layer Keys ───────────────────────────────────────────────────────────────
export type HeatmapLayerKey = 'overall' | PollutionCategory;

// ─── Points ───────────────────────────────────────────────────────────────────
export interface HeatmapPoint {
  lat: number;
  lng: number;
  intensity: number; // 0–1 normalized for Leaflet.heat
}

export interface RawHeatmapPoint {
  lat: number;
  lng: number;
  rawWeight: number; // pre-normalization composite score
}

// ─── Config ───────────────────────────────────────────────────────────────────
export interface HeatmapConfig {
  radius: number;
  blur: number;
  maxZoom: number;
  minOpacity: number;
  max: number;
  gradient: Record<string, string>;
}

// ─── Layer Metadata ───────────────────────────────────────────────────────────
export interface HeatmapLayerConfig {
  key: HeatmapLayerKey;
  label: string;
  icon: string;
  color: string;           // UI accent color
  categoryWeight: number;  // Environmental severity multiplier
  gradient: Record<string, string>;
}

// ─── Engine State ─────────────────────────────────────────────────────────────
export interface HeatmapEngineState {
  activeLayer: HeatmapLayerKey;
  points: HeatmapPoint[];
  config: HeatmapConfig;
  isLoading: boolean;
  lastUpdated: Date | null;
  totalReports: number;
  layerCounts: Record<HeatmapLayerKey, number>;
}

export interface HeatmapEngineActions {
  setActiveLayer: (layer: HeatmapLayerKey) => void;
  refresh: () => Promise<void>;
}

export type HeatmapEngine = HeatmapEngineState & HeatmapEngineActions;
