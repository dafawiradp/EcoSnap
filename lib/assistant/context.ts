import { AssistantContext, ConversationHistory } from './types';

export class AssistantContextManager {
  private context: AssistantContext;

  constructor(userId: string) {
    this.context = {
      userId,
      conversationHistory: { messages: [] },
    };
  }

  getContext(): AssistantContext {
    return this.context;
  }

  addMessage(sender: 'user' | 'assistant', message: string): void {
    this.context.conversationHistory.messages.push({
      sender,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
