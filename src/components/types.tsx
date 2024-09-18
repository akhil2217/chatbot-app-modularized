// src/types.ts

export interface MessageType {
  sender: 'me' | 'bot';
  text: string;
  isTyping?: boolean;
  reaction?: 'like' | 'dislike';
}
