import type { ExportData } from '../analytics/types';
import type { ChartRef } from './types';

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export async function exportPDF(
  data: ExportData,
  charts: ChartRef[]
): Promise<void> {
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import('jspdf'),
    import('html2canvas'),
  ]);

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const addText = (text: string, size: number, bold = false): void => {
    doc.setFontSize(size);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.text(text, margin, y);
    y += size * 0.5;
  };

  const checkPageBreak = (height: number): void => {
    if (y + height > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // Title
  addText(data.title, 18, true);
  y += 4;
  addText(`Generated: ${data.generatedAt}`, 9);
  y += 6;

  // Health Score
  checkPageBreak(20);
  addText('Environmental Health Score', 14, true);
  y += 2;
  addText(
    `Score: ${data.healthScore.score}/100 (Grade: ${data.healthScore.grade})`,
    11
  );
  addText(data.healthScore.description, 10);
  y += 6;

  // Statistics
  checkPageBreak(40);
  addText('Statistics', 14, true);
  y += 2;

  const statsLines = [
    `Total Reports: ${data.statistics.totalReports}`,
    `Today's Reports: ${data.statistics.todayReports}`,
    `This Week: ${data.statistics.thisWeekReports}`,
    `Weekly Growth: ${data.statistics.weeklyGrowthRate.toFixed(1)}%`,
    `Average Urgency: ${data.statistics.averageUrgency.toFixed(1)}`,
    `Critical Reports: ${data.statistics.criticalReports}`,
  ];

  for (const line of statsLines) {
    addText(line, 10);
  }
  y += 6;

  // Insights
  checkPageBreak(30);
  addText('AI Insights', 14, true);
  y += 2;

  for (const insight of data.insights.slice(0, 10)) {
    checkPageBreak(10);
    addText(`• [${insight.confidence}%] ${insight.message}`, 9);
  }
  y += 6;

  // Forecast
  checkPageBreak(30);
  addText('Forecast', 14, true);
  y += 2;
  addText(`Tomorrow: ${data.forecast.tomorrow} reports`, 10);
  addText(`Next Week: ${data.forecast.nextWeek} reports`, 10);
  addText(`Next Month: ${data.forecast.nextMonth} reports`, 10);
  addText(`Trend: ${data.forecast.trendDirection}`, 10);
  addText(`Growth Rate: ${data.forecast.growthRate.toFixed(1)}%`, 10);
  y += 6;

  // Recommendations
  if (data.recommendations.length > 0) {
    checkPageBreak(20);
    addText('Recommendations', 14, true);
    y += 2;
    for (const rec of data.recommendations) {
      checkPageBreak(8);
      addText(`• ${rec}`, 9);
    }
    y += 6;
  }

  // Charts
  for (const chart of charts) {
    const el = chart.ref.current;
    if (!el) continue;

    doc.addPage();
    y = margin;
    addText(chart.label, 13, true);
    y += 4;

    const canvas = await html2canvas(el, { scale: 1.5, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const imgHeight = (canvas.height * contentWidth) / canvas.width;

    checkPageBreak(imgHeight);
    doc.addImage(imgData, 'PNG', margin, y, contentWidth, imgHeight);
    y += imgHeight + 6;
  }

  const blob = doc.output('blob');
  triggerDownload(blob, `EcoSnap_Report_${Date.now()}.pdf`);
}
