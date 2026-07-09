import type { TranslationSchema } from './types';

export const id: TranslationSchema = {
  dashboard: {
    title: 'Dasbor Kecerdasan Lingkungan',
    subtitle: 'Pemantauan dan analisis polusi secara real-time',
    refresh: 'Segarkan',
    loading: 'Memuat data dasbor...',
    error: 'Gagal memuat data dasbor.',
  },
  kpi: {
    totalReports: 'Total Laporan',
    todayReports: 'Laporan Hari Ini',
    thisWeek: 'Minggu Ini',
    criticalReports: 'Laporan Kritis',
    avgUrgency: 'Urgensi Rata-rata',
    healthScore: 'Skor Kesehatan',
  },
  insights: {
    title: 'Wawasan AI',
    noInsights: 'Tidak ada wawasan tersedia untuk periode ini.',
    confidence: 'Kepercayaan',
  },
  forecast: {
    title: 'Prakiraan Statistik',
    tomorrow: 'Besok',
    nextWeek: 'Minggu Depan',
    nextMonth: 'Bulan Depan',
    trend: 'Tren',
    growthRate: 'Tingkat Pertumbuhan',
    riskIncrease: 'Peningkatan Risiko',
  },
  export: {
    title: 'Ekspor Laporan',
    pdf: 'Ekspor PDF',
    csv: 'Ekspor CSV',
    excel: 'Ekspor Excel',
    json: 'Ekspor JSON',
    png: 'Ekspor Grafik (PNG)',
    exporting: 'Mengekspor...',
    error: 'Ekspor gagal. Silakan coba lagi.',
  },
  risk: {
    title: 'Analisis Risiko',
    highestRiskProvince: 'Provinsi Risiko Tertinggi',
    highestRiskCategory: 'Kategori Risiko Tertinggi',
    riskScore: 'Skor Risiko',
  },
  severity: {
    critical: 'Kritis',
    warning: 'Peringatan',
    info: 'Informasi',
  },
};
