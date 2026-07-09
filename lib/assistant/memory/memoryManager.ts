import { ConversationHistory, MemoryEntry } from '../queryEngine/types';

export class MemoryManager {
  private history: ConversationHistory = { messages: [] };

  getHistory(): ConversationHistory {
    return this.history;
  }

  addEntry(entry: MemoryEntry): void {
    this.history.messages.push(entry);
  }

  getLastUserQuery(): MemoryEntry | null {
    const userMessages = this.history.messages.filter(msg => msg.sender === 'user');
    return userMessages.length > 0 ? userMessages[userMessages.length - 1] : null;
  }

  getLastAssistantResponse(): MemoryEntry | null {
    const assistantMessages = this.history.messages.filter(msg => msg.sender === 'assistant');
    return assistantMessages.length > 0 ? assistantMessages[assistantMessages.length - 1] : null;
  }
}
