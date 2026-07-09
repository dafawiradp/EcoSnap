import { DateRange } from './types';

export function parseDate(dateExpression: string): DateRange {
  const now = new Date('Monday, July 06, 2026 09:11 UTC'); // Current operating time
  const start = new Date(now);
  const end = new Date(now);

  switch (dateExpression.toLowerCase()) {
    case 'yesterday':
      start.setDate(now.getDate() - 1);
      end.setDate(now.getDate() - 1);
      break;
    case 'this week':
      start.setDate(now.getDate() - now.getDay());
      break;
    case 'last week':
      start.setDate(now.getDate() - now.getDay() - 7);
      end.setDate(start.getDate() + 6);
      break;
    case 'this month':
      start.setDate(1);
      break;
    case 'last month':
      start.setMonth(now.getMonth() - 1, 1);
      end.setMonth(now.getMonth(), 0);
      break;
    case 'this year':
      start.setMonth(0, 1);
      break;
    case 'last year':
      start.setFullYear(now.getFullYear() - 1, 0, 1);
      end.setFullYear(now.getFullYear() - 1, 11, 31);
      break;
  }

  return { start: start.toISOString(), end: end.toISOString() };
}
