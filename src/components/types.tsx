export interface Message {
    sender: 'me' | 'bot';
    text: string;
    isTyping?: boolean;
    likes?: number;
    dislikes?: number;
  }
  

  