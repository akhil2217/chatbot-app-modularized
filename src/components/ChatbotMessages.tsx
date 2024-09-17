import React from 'react';
import Message from './Message';
import { Message as MessageType } from './types';
import '../styles/ChatbotMessages.css';

interface ChatbotMessagesProps {
  theme: 'light' | 'dark';
  messages: MessageType[];
  messageEndRef: React.RefObject<HTMLDivElement>;
  likeMessage: (index: number) => void;
  dislikeMessage: (index: number) => void;
  copyMessage: (text: string) => void;
  isTyping: boolean;
}

const ChatbotMessages: React.FC<ChatbotMessagesProps> = ({
  theme,
  messages,
  messageEndRef,
  likeMessage,
  dislikeMessage,
  copyMessage,
  isTyping
}) => (
  <div className={`chatbot-messages ${theme}`}>
    {messages.map((msg, index) => (
      <Message
        key={index}
        message={msg}
        theme={theme}
        onLike={() => likeMessage(index)}
        onDislike={() => dislikeMessage(index)}
        onCopy={() => copyMessage(msg.text)}
      />
    ))}
    {isTyping && (
      <div className="message bot">
        <div className="message-content">
          <div className="icon-wrapper">
            <div className="fas fa-robot bot-icon"></div>
          </div>
          <div className="bubble">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    )}
    <div ref={messageEndRef} />
  </div>
);

export default ChatbotMessages;