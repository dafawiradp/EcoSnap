import { ConversationHistory } from './types';

export class MemoryManager {
  private history: ConversationHistory = { messages: [] };

  getHistory(): ConversationHistory {
    return this.history;
  }

  addMessage(sender: 'user' | 'assistant', message: string): void {
    this.history.messages.push({
      sender,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
