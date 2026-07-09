import type { ExportData } from '../analytics/types';

export function exportJSON(data: ExportData): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `EcoSnap_Report_${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}
