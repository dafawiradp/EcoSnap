import { Intent } from './types';

export function detectIntent(question: string): Intent {
  const intentMap: Record<string, Intent> = {
    'how many reports': 'statistics',
    'show all reports': 'location_search',
    'summarize': 'summary',
    'compare': 'comparison',
    'what should authorities prioritize': 'recommendation',
    'which category': 'trend',
    'what waste type': 'trend',
    'what pollution occurs': 'category_search',
  };

  for (const [key, intent] of Object.entries(intentMap)) {
    if (question.toLowerCase().includes(key)) {
      return intent;
    }
  }

  return 'unknown';
}
