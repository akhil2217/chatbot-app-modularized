// src/components/ChatbotMenu.tsx

import React from 'react';
import '../styles/ChatbotMenu.css';

interface ChatbotMenuProps {
  theme: 'light' | 'dark';
  exportChat: () => void;
  clearChat: () => void;
  newChatSession: () => void;
  toggleTheme: () => void;
  adjustFontSize: (size: number) => void;
  fontSize: number;
  onMouseLeave: () => void;
}

const ChatbotMenu: React.FC<ChatbotMenuProps> = ({
  theme,
  exportChat,
  clearChat,
  newChatSession,
  toggleTheme,
  adjustFontSize,
  fontSize,
  onMouseLeave,
}) => {
  return (
    <div className={`chatbot-menu ${theme}`} onMouseLeave={onMouseLeave}>
      <ul>
        <li onClick={exportChat}>Export Chat</li>
        <li onClick={clearChat}>Clear Chat</li>
        <li onClick={newChatSession}>New Chat Session</li>
        <li onClick={toggleTheme}>Toggle Theme</li>
        <li onClick={() => adjustFontSize(fontSize + 2)}>Increase Font Size</li>
        <li onClick={() => adjustFontSize(fontSize - 2)}>Decrease Font Size</li>
      </ul>
    </div>
  );
};

export default ChatbotMenu;
