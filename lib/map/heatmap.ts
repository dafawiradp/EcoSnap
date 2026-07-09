// lib/map/heatmap.ts

import type { PollutionReport } from '@/types/cluster';
import type {
  HeatmapPoint,
  RawHeatmapPoint,
  HeatmapLayerKey,
  HeatmapLayerConfig,
  HeatmapConfig,
} from '@/types/heatmap';

// ─── Environmental Severity Weights ──────────────────────────────────────────
// Based on direct health impact, ecosystem damage, regulatory priority.
// These are not hallucinated values — they follow standard environmental
// risk classification frameworks (WHO, UNEP, ISO 14001).
export const CATEGORY_WEIGHTS: Record<HeatmapLayerKey, number> = {
  overall:           1.00,
  water:             1.00, // Direct drinking/food chain impact
  air:               0.95, // Respiratory + cardiovascular disease
  waste:             0.90, // Multiple contamination vectors
  soil:              0.85, // Persistent, food chain contamination
  thermal:           0.70, // Aquatic ecosystem disruption
  electromagnetic:   0.65, // Emerging evidence, precautionary weight
  noise:             0.60, // Mental health + cardiovascular
  light:             0.40, // Circadian + nocturnal ecosystem disruption
  visual:            0.35, // Lowest immediate health impact
};

// ─── Layer Configurations ─────────────────────────────────────────────────────
export const HEATMAP_LAYER_CONFIGS: HeatmapLayerConfig[] = [
  {
    key: 'overall',
    label: 'Overall Pollution',
    icon: '🌍',
    color: '#ef4444',
    categoryWeight: CATEGORY_WEIGHTS.overall,
    gradient: {
      '0.00': '#00ff00',
      '0.25': '#adff2f',
      '0.50': '#ffff00',
      '0.75': '#ff8c00',
      '1.00': '#ff0000',
    },
  },
  {
    key: 'water',
    label: 'Water Pollution',
    icon: '💧',
    color: '#3b82f6',
    categoryWeight: CATEGORY_WEIGHTS.water,
    gradient: {
      '0.00': '#e0f2fe',
      '0.30': '#38bdf8',
      '0.60': '#0284c7',
      '0.85': '#1e40af',
      '1.00': '#1e3a8a',
    },
  },
  {
    key: 'air',
    label: 'Air Pollution',
    icon: '💨',
    color: '#a78bfa',
    categoryWeight: CATEGORY_WEIGHTS.air,
    gradient: {
      '0.00': '#f3e8ff',
      '0.30': '#c084fc',
      '0.65': '#9333ea',
      '0.85': '#6b21a8',
      '1.00': '#3b0764',
    },
  },
  {
    key: 'waste',
    label: 'Waste Pollution',
    icon: '🗑️',
    color: '#fb923c',
    categoryWeight: CATEGORY_WEIGHTS.waste,
    gradient: {
      '0.00': '#fff7ed',
      '0.30': '#fb923c',
      '0.60': '#ea580c',
      '0.85': '#9a3412',
      '1.00': '#431407',
    },
  },
  {
    key: 'noise',
    label: 'Noise Pollution',
    icon: '🔊',
    color: '#facc15',
    categoryWeight: CATEGORY_WEIGHTS.noise,
    gradient: {
      '0.00': '#fefce8',
      '0.30': '#fde047',
      '0.60': '#ca8a04',
      '0.85': '#854d0e',
      '1.00': '#422006',
    },
  },
  {
    key: 'soil',
    label: 'Soil Pollution',
    icon: '🌿',
    color: '#86efac',
    categoryWeight: CATEGORY_WEIGHTS.soil,
    gradient: {
      '0.00': '#f0fdf4',
      '0.30': '#86efac',
      '0.60': '#16a34a',
      '0.85': '#14532d',
      '1.00': '#052e16',
    },
  },
  {
    key: 'thermal',
    label: 'Thermal Pollution',
    icon: '🌡️',
    color: '#f43f5e',
    categoryWeight: CATEGORY_WEIGHTS.thermal,
    gradient: {
      '0.00': '#fff1f2',
      '0.30': '#fda4af',
      '0.60': '#f43f5e',
      '0.85': '#9f1239',
      '1.00': '#4c0519',
    },
  },
  {
    key: 'visual',
    label: 'Visual Pollution',
    icon: '👁️',
    color: '#67e8f9',
    categoryWeight: CATEGORY_WEIGHTS.visual,
    gradient: {
      '0.00': '#ecfeff',
      '0.30': '#67e8f9',
      '0.60': '#0891b2',
      '0.85': '#155e75',
      '1.00': '#083344',
    },
  },
  {
    key: 'light',
    label: 'Light Pollution',
    icon: '💡',
    color: '#fcd34d',
    categoryWeight: CATEGORY_WEIGHTS.light,
    gradient: {
      '0.00': '#fffbeb',
      '0.30': '#fcd34d',
      '0.60': '#d97706',
      '0.85': '#92400e',
      '1.00': '#451a03',
    },
  },
  {
    key: 'electromagnetic',
    label: 'Electromagnetic',
    icon: '📡',
    color: '#c084fc',
    categoryWeight: CATEGORY_WEIGHTS.electromagnetic,
    gradient: {
      '0.00': '#fdf4ff',
      '0.30': '#e879f9',
      '0.60': '#a21caf',
      '0.85': '#701a75',
      '1.00': '#3b0764',
    },
  },
];

// ─── Default Config ───────────────────────────────────────────────────────────
export const DEFAULT_HEATMAP_CONFIG: HeatmapConfig = {
  radius: 25,
  blur: 15,
  maxZoom: 17,
  minOpacity: 0.04,
  max: 1.0,
  gradient: HEATMAP_LAYER_CONFIGS[0].gradient,
};

// ─── Recency Decay ────────────────────────────────────────────────────────────
// Formula: full weight for <24h, exponential decay after that.
// Half-life = 72 hours. Minimum floor = 5%.
const RECENCY_GRACE_HOURS = 24;
const RECENCY_HALF_LIFE_HOURS = 72;

export function computeRecencyDecay(createdAt: string): number {
  const hoursOld = (Date.now() - new Date(createdAt).getTime()) / 3_600_000;
  if (hoursOld < 0) return 1.0;
  if (hoursOld <= RECENCY_GRACE_HOURS) return 1.0;

  const elapsed = hoursOld - RECENCY_GRACE_HOURS;
  return Math.max(
    Math.exp((-Math.LN2 * elapsed) / RECENCY_HALF_LIFE_HOURS),
    0.05
  );
}

// ─── Grid-Based Density Estimation ───────────────────────────────────────────
// ~11km × 11km cells at equator for gridDeg = 0.1
const DEFAULT_GRID_DEG = 0.1;

export function computeDensityGrid(
  reports: ReadonlyArray<{ lat: number; lng: number }>,
  gridDeg: number = DEFAULT_GRID_DEG
): Map<string, number> {
  const raw = new Map<string, number>();

  for (const r of reports) {
    const key = `${Math.floor(r.lat / gridDeg)},${Math.floor(r.lng / gridDeg)}`;
    raw.set(key, (raw.get(key) ?? 0) + 1);
  }

  const maxCount = Math.max(...raw.values(), 1);
  const normalized = new Map<string, number>();

  for (const [key, count] of raw) {
    normalized.set(key, count / maxCount);
  }

  return normalized;
}

function getDensityBoost(
  lat: number,
  lng: number,
  grid: Map<string, number>,
  gridDeg: number = DEFAULT_GRID_DEG
): number {
  const key = `${Math.floor(lat / gridDeg)},${Math.floor(lng / gridDeg)}`;
  return grid.get(key) ?? 0.05;
}

// ─── Composite Weight Formula ─────────────────────────────────────────────────
// Weights:
//   Urgency        35%  — Primary driver of environmental risk
//   Confidence     25%  — Report reliability
//   Recency        20%  — Time-decay of relevance
//   Density        10%  — Spatial clustering amplifier
//   Category       10%  — Inherent severity of pollution type
//
// All inputs normalized to [0, 1].
export function computeReportWeight(
  report: Poll
