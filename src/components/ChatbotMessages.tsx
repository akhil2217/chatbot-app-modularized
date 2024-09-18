// src/components/ChatbotMessages.tsx

import React from 'react';
import Message from './Message';
import { MessageType } from './types';
import '../styles/ChatbotMessages.css';

interface ChatbotMessagesProps {
  messages: MessageType[];
  theme: 'light' | 'dark';
  copyMessage: (text: string) => void;
  likeMessage: (index: number) => void;
  dislikeMessage: (index: number) => void;
  messageEndRef: React.RefObject<HTMLDivElement>;
}

const ChatbotMessages: React.FC<ChatbotMessagesProps> = ({
  messages,
  theme,
  copyMessage,
  likeMessage,
  dislikeMessage,
  messageEndRef,
}) => {
  return (
    <div className={`chatbot-messages ${theme}`}>
      {messages.map((msg, index) => (
        <Message
          key={index}
          msg={msg}
          index={index}
          theme={theme}
          copyMessage={copyMessage}
          likeMessage={likeMessage}
          dislikeMessage={dislikeMessage}
        />
      ))}
      <div ref={messageEndRef} />
    </div>
  );
};

export default ChatbotMessages;
