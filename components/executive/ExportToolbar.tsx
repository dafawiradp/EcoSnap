'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useExport } from '../../hooks/useExport';
import type { ExportData } from '../../lib/analytics/types';
import type { ChartRef, ExportFormat } from '../../lib/export/types';

interface ExportToolbarProps {
  readonly reportData: ExportData;
  readonly chartRefs: ChartRef[];
}

interface ExportButton {
  readonly format: ExportFormat;
  readonly label: string;
  readonly color: string;
  readonly hoverColor: string;
}

const EXPORT_BUTTONS: readonly ExportButton[] = [
  {
    format: 'pdf',
    label: 'PDF',
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-600',
  },
  {
    format: 'csv',
    label: 'CSV',
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
  },
  {
    format: 'excel',
    label: 'Excel',
    color: 'bg-emerald-500',
    hoverColor: 'hover:bg-emerald-600',
  },
  {
    format: 'json',
    label: 'JSON',
    color: 'bg-slate-500',
    hoverColor: 'hover:bg-slate-600',
  },
  {
    format: 'png',
    label: 'Charts PNG',
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600',
  },
];

const ExportToolbar: React.FC<ExportToolbarProps> = ({ reportData, chartRefs }) => {
  const { isExporting, exportError, handleExport } = useExport(reportData);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">Export Report</h2>

      <div className="flex flex-wrap gap-2">
        {EXPORT_BUTTONS.map((btn, i) => (
          <motion.button
            key={btn.format}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            disabled={isExporting}
            onClick={() => void handleExport(btn.format, chartRefs)}
            className={`${btn.color} ${btn.hoverColor} text-white text-xs font-medium px-4 py-2 rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isExporting ? 'Exporting...' : `Export ${btn.label}`}
          </motion.button>
        ))}
      </div>

      {exportError !== null && (
        <p className="mt-3 text-xs text-red-500">{exportError}</p>
      )}
    </div>
  );
};

export default ExportToolbar;
