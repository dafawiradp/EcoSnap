export function analyzeRisk(reports: any[]): { province: string; category: string } {
  const provinceCounts = aggregateCounts(reports, 'province');
  const categoryCounts = aggregateCounts(reports, 'category');

  const highestRiskProvince = getHighestKey(provinceCounts);
  const highestRiskCategory = getHighestKey(categoryCounts);

  return { province: highestRiskProvince, category: highestRiskCategory };
}

function aggregateCounts(reports: any[], field: string) {
  return reports.reduce((acc, report) => {
    acc[report[field]] = (acc[report[field]] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

function getHighestKey(counts: Record<string, number>): string {
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}
