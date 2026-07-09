export type Intent =
  | 'summary'
  | 'statistics'
  | 'trend'
  | 'comparison'
  | 'location_search'
  | 'category_search'
  | 'urgency_search'
  | 'latest_reports'
  | 'recommendation'
  | 'environmental_advice'
  | 'prediction'
  | 'unknown';

export interface ParsedQuery {
  date: string | null;
  location: string | null;
  rawQuestion: string;
}

export interface QueryPlan {
  table: string;
  filters: Record<string, string | number>;
  limit: number;
  orderBy: string;
  orderDirection: 'asc' | 'desc';
}

export interface AssistantResponse {
  message: string;
  suggestions?: string[];
}

export interface AssistantContext {
  userId: string;
  conversationHistory: ConversationHistory;
}

export interface ConversationHistory {
  messages: ChatMessage[];
}

export interface ChatMessage {
  sender: 'user' | 'assistant';
  message: string;
  timestamp: string;
}

export interface GeminiResponse {
  insights: string;
  confidence: number;
}
