export interface TimeRange {
  start: Date;
  end: Date;
}

export const getTimeRange = (preset: string): TimeRange => {
  const now = new Date();
  switch (preset) {
    case 'today':
      return { start: new Date(now.setHours(0, 0, 0, 0)), end: new Date() };
    case 'last7days':
      return { start: new Date(now.setDate(now.getDate() - 7)), end: new Date() };
    case 'last30days':
      return { start: new Date(now.setDate(now.getDate() - 30)), end: new Date() };
    case 'thisYear':
      return { start: new Date(now.getFullYear(), 0, 1), end: new Date() };
    default:
      throw new Error('Invalid time range preset');
  }
};
