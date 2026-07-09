import { AssistantResponse } from './types';

export function buildResponse(data: any[], intent: string): AssistantResponse {
  if (data.length === 0) {
    return {
      message: 'No reports found for the given query.',
      suggestions: ['Try refining your query with a different date or location.'],
    };
  }

  const summary = `Found ${data.length} reports matching your query.`;
  const insights = `The most common category is ${data[0].category}.`;

  return {
    message: summary,
    suggestions: [insights],
  };
}
