'use client';

import { useState, useCallback } from 'react';
import type { ExportData } from '../lib/analytics/types';
import type { ChartRef, ExportFormat } from '../lib/export/types';

interface UseExportReturn {
  isExporting: boolean;
  exportError: string | null;
  handleExport: (format: ExportFormat, charts?: ChartRef[]) => Promise<void>;
}

export function useExport(reportData: ExportData): UseExportReturn {
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const handleExport = useCallback(
    async (format: ExportFormat, charts: ChartRef[] = []) => {
      setIsExporting(true);
      setExportError(null);

      try {
        switch (format) {
          case 'pdf': {
            const { exportPDF } = await import('../lib/export/pdfExporter');
            await exportPDF(reportData, charts);
            break;
          }
          case 'csv': {
            const { exportCSV } = await import('../lib/export/csvExporter');
            exportCSV(reportData);
            break;
          }
          case 'excel': {
            const { exportExcel } = await import('../lib/export/excelExporter');
            exportExcel(reportData);
            break;
          }
          case 'json': {
            const { exportJSON } = await import('../lib/export/jsonExporter');
            exportJSON(reportData);
            break;
          }
          case 'png': {
            const { exportChartsAsPNG } = await import('../lib/export/chartExporter');
            await exportChartsAsPNG(charts);
            break;
          }
        }
      } catch (err) {
        setExportError(err instanceof Error ? err.message : 'Export failed');
      } finally {
        setIsExporting(false);
      }
    },
    [reportData]
  );

  return { isExporting, exportError, handleExport };
}
