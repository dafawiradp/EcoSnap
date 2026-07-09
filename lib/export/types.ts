import type React from 'react';

export type ExportFormat = 'pdf' | 'csv' | 'excel' | 'json' | 'png';

export interface ChartRef {
  readonly id: string;
  readonly label: string;
  readonly ref: React.RefObject<HTMLDivElement | null>;
}
