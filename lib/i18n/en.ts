import type { TranslationSchema } from './types';

export const en: TranslationSchema = {
  dashboard: {
    title: 'Environmental Intelligence Dashboard',
    subtitle: 'Real-time pollution monitoring and analysis',
    refresh: 'Refresh',
    loading: 'Loading dashboard data...',
    error: 'Failed to load dashboard data.',
  },
  kpi: {
    totalReports: 'Total Reports',
    todayReports: "Today's Reports",
    thisWeek: 'This Week',
    criticalReports: 'Critical Reports',
    avgUrgency: 'Avg. Urgency',
    healthScore: 'Health Score',
  },
  insights: {
    title: 'AI Insights',
    noInsights: 'No insights available for this period.',
    confidence: 'Confidence',
  },
  forecast: {
    title: 'Statistical Forecast',
    tomorrow: 'Tomorrow',
    nextWeek: 'Next Week',
    nextMonth: 'Next Month',
    trend: 'Trend',
    growthRate: 'Growth Rate',
    riskIncrease: 'Risk Increase',
  },
  export: {
    title: 'Export Report',
    pdf: 'Export PDF',
    csv: 'Export CSV',
    excel: 'Export Excel',
    json: 'Export JSON',
    png: 'Export Charts (PNG)',
    exporting: 'Exporting...',
    error: 'Export failed. Please try again.',
  },
  risk: {
    title: 'Risk Analysis',
    highestRiskProvince: 'Highest Risk Province',
    highestRiskCategory: 'Highest Risk Category',
    riskScore: 'Risk Score',
  },
  severity: {
    critical: 'Critical',
    warning: 'Warning',
    info: 'Info',
  },
};
