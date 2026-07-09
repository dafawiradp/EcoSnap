/** Represents a request to the assistant */
export interface AssistantRequest {
  readonly query: string;
  readonly context: AssistantContext;
}

/** Represents a response from the assistant */
export interface AssistantResponse {
  readonly message: string;
  readonly suggestions?: string[];
}

/** Represents a chat message in a conversation */
export interface ChatMessage {
  readonly sender: 'user' | 'assistant';
  readonly message: string;
  readonly timestamp: Timestamp;
}

/** Context for the assistant's operation */
export interface AssistantContext {
  readonly userId: string;
  readonly conversationHistory: ConversationHistory;
}

/** History of a conversation */
export interface ConversationHistory {
  readonly messages: ChatMessage[];
}
