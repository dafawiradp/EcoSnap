import { ParsedQuery } from './types';

export function parseQuestion(question: string): ParsedQuery {
  const dateRegex = /(today|yesterday|this week|last week|this month|last month|this year|last year)/i;
  const locationRegex = /(west java|jakarta|nearby|gps|province|city|country)/i;

  const dateMatch = question.match(dateRegex);
  const locationMatch = question.match(locationRegex);

  return {
    date: dateMatch ? dateMatch[0].toLowerCase() : null,
    location: locationMatch ? locationMatch[0].toLowerCase() : null,
    rawQuestion: question,
  };
}
