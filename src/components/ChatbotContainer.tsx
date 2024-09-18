import React from 'react';
import '../styles/ChatbotContainer.css';

interface ChatbotContainerProps {
  themeStyle: 'light' | 'dark';
  fontSize: number;
  isMaximized: boolean; // Ensure this is included
  children: React.ReactNode;
}

const ChatbotContainer: React.FC<ChatbotContainerProps> = ({
  themeStyle,
  fontSize,
  isMaximized,
  children,
}) => {
  return (
    <div
      className={`chatbot-container ${themeStyle} ${
        isMaximized ? 'maximized' : ''
      }`}
      style={{ fontSize: `${fontSize}px` }}
    >
      {children}
    </div>
  );
};

export default ChatbotContainer;
