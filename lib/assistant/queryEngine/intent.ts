import { Intent } from './types';

export function detectIntent(query: string): Intent {
  const intentMap: Record<string, Intent> = {
    'near': 'filter',
    'in': 'filter',
    'highest': 'aggregation',
    'compare': 'comparison',
    'yesterday': 'date_filter',
    'this month': 'date_filter',
    'last month': 'date_filter',
    'show': 'filter',
    'only': 'follow_up',
  };

  for (const [key, intent] of Object.entries(intentMap)) {
    if (query.toLowerCase().includes(key)) {
      return intent;
    }
  }

  return 'unknown';
}
