import type { ChartRef } from './types';

export async function exportChartsAsPNG(charts: ChartRef[]): Promise<void> {
  const { default: html2canvas } = await import('html2canvas');

  for (const chart of charts) {
    const el = chart.ref.current;
    if (!el) continue;

    const canvas = await html2canvas(el, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imgData;
    link.download = `${chart.id}_${Date.now()}.png`;
    link.click();
  }
}
