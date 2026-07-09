import type { ExportData } from '../analytics/types';

function escapeCSV(value: string | number): string {
  const str = String(value);
  return str.includes(',') || str.includes('"') || str.includes('\n')
    ? `"${str.replace(/"/g, '""')}"`
    : str;
}

function triggerDownload(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportCSV(data: ExportData): void {
  const rows: string[] = [];

  rows.push('EcoSnap AI Environmental Report');
  rows.push(`Generated,${escapeCSV(data.generatedAt)}`);
  rows.push('');

  rows.push('STATISTICS');
  rows.push('Metric,Value');
  rows.push(`Total Reports,${data.statistics.totalReports}`);
  rows.push(`Today Reports,${data.statistics.todayReports}`);
  rows.push(`This Week,${data.statistics.thisWeekReports}`);
  rows.push(`Weekly Growth Rate,${data.statistics.weeklyGrowthRate.toFixed(2)}%`);
  rows.push(`Average Urgency,${data.statistics.averageUrgency.toFixed(2)}`);
  rows.push(`Average Confidence,${data.statistics.averageConfidence.toFixed(2)}`);
  rows.push(`Critical Reports,${data.statistics.criticalReports}`);
  rows.push('');

  rows.push('HEALTH SCORE');
  rows.push(`Score,${data.healthScore.score}`);
  rows.push(`Grade,${data.healthScore.grade}`);
  rows.push(`Description,${escapeCSV(data.healthScore.description)}`);
  rows.push('');

  rows.push('CATEGORY BREAKDOWN');
  rows.push('Category,Count,Percentage,Growth Rate');
  for (const cat of data.categoryBreakdown) {
    rows.push(
      [cat.category, cat.count, `${cat.percentage}%`, `${cat.growthRate}%`]
        .map(escapeCSV)
        .join(',')
    );
  }
  rows.push('');

  rows.push('PROVINCE RISKS');
  rows.push('Province,Reports,Avg Urgency,Risk Score,Top Category');
  for (const p of data.provinceRisks) {
    rows.push(
      [p.province, p.reportCount, p.averageUrgency.toFixed(2), p.riskScore, p.topCategory]
        .map(escapeCSV)
        .join(',')
    );
  }
  rows.push('');

  rows.push('AI INSIGHTS');
  rows.push('Message,Confidence,Type,Severity');
  for (const insight of data.insights) {
    rows.push(
      [insight.message, `${insight.confidence}%`, insight.type, insight.severity]
        .map(escapeCSV)
        .join(',')
    );
  }
  rows.push('');

  rows.push('FORECAST');
  rows.push(`Tomorrow,${data.forecast.tomorrow}`);
  rows.push(`Next Week,${data.forecast.nextWeek}`);
  rows.push(`Next Month,${data.forecast.nextMonth}`);
  rows.push(`Trend Direction,${data.forecast.trendDirection}`);
  rows.push(`Growth Rate,${data.forecast.growthRate.toFixed(2)}%`);
  rows.push('');

  rows.push('RECOMMENDATIONS');
  for (const rec of data.recommendations) {
    rows.push(escapeCSV(rec));
  }

  triggerDownload(rows.join('\n'), `EcoSnap_Report_${Date.now()}.csv`);
}
