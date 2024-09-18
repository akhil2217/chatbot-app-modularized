// src/components/ChatbotHeader.tsx

import React, { useState } from 'react';
import {
  FaBars,
  FaWindowMinimize,
  FaTimes,
  FaExpand,
  FaCompress,
} from 'react-icons/fa';
import CloseChatDialog from './CloseChatDialog';
import '../styles/ChatbotHeader.css';

interface ChatbotHeaderProps {
  theme: 'light' | 'dark';
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showMenu: boolean;
  handleMinimize: () => void;
  isMaximized: boolean;
  setIsMaximized: React.Dispatch<React.SetStateAction<boolean>>;
  showGoodbyeMessage: () => void; // New prop
}

const ChatbotHeader: React.FC<ChatbotHeaderProps> = ({
  theme,
  setShowMenu,
  showMenu,
  handleMinimize,
  isMaximized,
  setIsMaximized,
  showGoodbyeMessage,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCloseClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogConfirm = () => {
    setIsDialogOpen(false);
    showGoodbyeMessage();
  };

  return (
    <div className={`chatbot-header ${theme}`}>
      <h2>Chat Assistant</h2>
      <div className="header-icons">
        <FaBars onClick={() => setShowMenu(!showMenu)} />
        <FaWindowMinimize onClick={handleMinimize} />
        {isMaximized ? (
          <FaCompress onClick={() => setIsMaximized(false)} title="Restore" />
        ) : (
          <FaExpand onClick={() => setIsMaximized(true)} title="Maximize" />
        )}
        <FaTimes onClick={handleCloseClick} />
      </div>

      {/* Confirmation Dialog */}
      <CloseChatDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleDialogConfirm}
      />
    </div>
  );
};

export default ChatbotHeader;
