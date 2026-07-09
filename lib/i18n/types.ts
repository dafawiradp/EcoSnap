export type SupportedLocale = 'en' | 'id';

export interface TranslationSchema {
  readonly dashboard: {
    readonly title: string;
    readonly subtitle: string;
    readonly refresh: string;
    readonly loading: string;
    readonly error: string;
  };
  readonly kpi: {
    readonly totalReports: string;
    readonly todayReports: string;
    readonly thisWeek: string;
    readonly criticalReports: string;
    readonly avgUrgency: string;
    readonly healthScore: string;
  };
  readonly insights: {
    readonly title: string;
    readonly noInsights: string;
    readonly confidence: string;
  };
  readonly forecast: {
    readonly title: string;
    readonly tomorrow: string;
    readonly nextWeek: string;
    readonly nextMonth: string;
    readonly trend: string;
    readonly growthRate: string;
    readonly riskIncrease: string;
  };
  readonly export: {
    readonly title: string;
    readonly pdf: string;
    readonly csv: string;
    readonly excel: string;
    readonly json: string;
    readonly png: string;
    readonly exporting: string;
    readonly error: string;
  };
  readonly risk: {
    readonly title: string;
    readonly highestRiskProvince: string;
    readonly highestRiskCategory: string;
    readonly riskScore: string;
  };
  readonly severity: {
    readonly critical: string;
    readonly warning: string;
    readonly info: string;
  };
}
