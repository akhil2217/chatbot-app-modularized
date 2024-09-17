import React from 'react';
import { FaBars, FaWindowMinimize, FaTimes } from 'react-icons/fa';
import '../styles/ChatbotHeader.css';

interface ChatbotHeaderProps {
  theme: 'light' | 'dark';
  handleMinimize: () => void;
  setIsOpen: (isOpen: boolean) => void;
  setShowMenu: (showMenu: boolean) => void;
  showMenu: boolean;
}

const ChatbotHeader: React.FC<ChatbotHeaderProps> = ({
  theme,
  handleMinimize,
  setIsOpen,
  setShowMenu,
  showMenu
}) => (
  <div className={`chatbot-header ${theme}`}>
    <h2>Chat Assistant</h2>
    <div className="header-icons">
      <FaBars onClick={() => setShowMenu(!showMenu)} />
      <FaWindowMinimize onClick={handleMinimize} />
      <FaTimes onClick={() => setIsOpen(false)} />
    </div>
  </div>
);

export default ChatbotHeader;