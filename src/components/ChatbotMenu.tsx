import React from 'react';
import '../styles/ChatbotMenu.css';

interface ChatbotMenuProps {
  theme: 'light' | 'dark';
  onMouseLeave: () => void;
  exportChat: () => void;
  clearChat: () => void;
  newChatSession: () => void;
  toggleTheme: () => void;
  adjustFontSize: (size: number) => void;
  fontSize: number;
}

const ChatbotMenu: React.FC<ChatbotMenuProps> = ({
  theme,
  onMouseLeave,
  exportChat,
  clearChat,
  newChatSession,
  toggleTheme,
  adjustFontSize,
  fontSize,
}) => (
  <div className={`chatbot-menu ${theme}`} onMouseLeave={onMouseLeave}>
    <ul>
      <li onClick={exportChat}>Export Chat</li>
      <li onClick={clearChat}>Clear Chat</li>
      <li onClick={newChatSession}>New Chat Session</li>
      <li onClick={toggleTheme}>Toggle Theme</li>
      <li onClick={() => adjustFontSize(fontSize + 1)}>Increase Font Size</li>
      <li onClick={() => adjustFontSize(fontSize - 1)}>Decrease Font Size</li>
    </ul>
  </div>
);

export default ChatbotMenu;