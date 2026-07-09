import type { ExportData } from '../analytics/types';

export async function exportExcel(data: ExportData): Promise<void> {
  const XLSX = await import('xlsx');

  const wb = XLSX.utils.book_new();

  // Statistics sheet
  const statsData = [
    ['Metric', 'Value'],
    ['Total Reports', data.statistics.totalReports],
    ['Today Reports', data.statistics.todayReports],
    ['This Week', data.statistics.thisWeekReports],
    ['Weekly Growth Rate', `${data.statistics.weeklyGrowthRate.toFixed(2)}%`],
    ['Average Urgency', data.statistics.averageUrgency.toFixed(2)],
    ['Average Confidence', data.statistics.averageConfidence.toFixed(2)],
    ['Critical Reports', data.statistics.criticalReports],
    [],
    ['Health Score', data.healthScore.score],
    ['Grade', data.healthScore.grade],
  ];
  const ws1 = XLSX.utils.aoa_to_sheet(statsData);
  XLSX.utils.book_append_sheet(wb, ws1, 'Statistics');

  // Category Breakdown sheet
  const catData = [
    ['Category', 'Count', 'Percentage', 'Growth Rate'],
    ...data.categoryBreakdown.map((c) => [
      c.category,
      c.count,
      `${c.percentage}%`,
      `${c.growthRate}%`,
    ]),
  ];
  const ws2 = XLSX.utils.aoa_to_sheet(catData);
  XLSX.utils.book_append_sheet(wb, ws2, 'Category Breakdown');

  // Province Risks sheet
  const provData = [
    ['Province', 'Reports', 'Avg Urgency', 'Risk Score', 'Top Category'],
    ...data.provinceRisks.map((p) => [
      p.province,
      p.reportCount,
      p.averageUrgency.toFixed(2),
      p.riskScore,
      p.topCategory,
    ]),
  ];
  const ws3 = XLSX.utils.aoa_to_sheet(provData);
  XLSX.utils.book_append_sheet(wb, ws3, 'Province Risks');

  // Insights sheet
  const insightData = [
    ['Message', 'Confidence', 'Type', 'Severity'],
    ...data.insights.map((i) => [
      i.message,
      `${i.confidence}%`,
      i.type,
      i.severity,
    ]),
  ];
  const ws4 = XLSX.utils.aoa_to_sheet(insightData);
  XLSX.utils.book_append_sheet(wb, ws4, 'AI Insights');

  // Forecast sheet
  const forecastData = [
    ['Metric', 'Value'],
    ['Tomorrow', data.forecast.tomorrow],
    ['Next Week', data.forecast.nextWeek],
    ['Next Month', data.forecast.nextMonth],
    ['Trend Direction', data.forecast.trendDirection],
    ['Growth Rate', `${data.forecast.growthRate.toFixed(2)}%`],
    [],
    ['Date', 'Predicted', 'Lower', 'Upper'],
    ...data.forecast.dailyForecasts.slice(0, 14).map((f) => [
      f.date,
      f.predicted,
      f.lower,
      f.upper,
    ]),
  ];
  const ws5 = XLSX.utils.aoa_to_sheet(forecastData);
  XLSX.utils.book_append_sheet(wb, ws5, 'Forecast');

  // Recommendations sheet
  const recData = [
    ['Recommendations'],
    ...data.recommendations.map((r) => [r]),
  ];
  const ws6 = XLSX.utils.aoa_to_sheet(recData);
  XLSX.utils.book_append_sheet(wb, ws6, 'Recommendations');

  XLSX.writeFile(wb, `EcoSnap_Report_${Date.now()}.xlsx`);
}
