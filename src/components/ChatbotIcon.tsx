// src/components/ChatbotIcon.tsx

import React from 'react';
import { FaComments } from 'react-icons/fa';
import '../styles/ChatbotIcon.css';

interface ChatbotIconProps {
  onClick: () => void;
  newMessage: boolean;
}

const ChatbotIcon: React.FC<ChatbotIconProps> = ({ onClick, newMessage }) => {
  return (
    <div className={`chatbot-icon ${newMessage ? 'pop' : ''}`} onClick={onClick}>
      <FaComments />
    </div>
  );
};

export default ChatbotIcon;
