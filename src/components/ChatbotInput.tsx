// src/components/ChatbotInput.tsx

import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import '../styles/ChatbotInput.css';

interface ChatbotInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  theme: 'light' | 'dark';
}

const ChatbotInput: React.FC<ChatbotInputProps> = ({
  input,
  setInput,
  sendMessage,
  handleKeyDown,
  theme,
}) => {
  return (
    <div className={`chatbot-input ${theme}`}>
      <textarea
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="textarea"
      />
      <div className="send-icon" onClick={sendMessage}>
        <FaPaperPlane />
      </div>
    </div>
  );
};

export default ChatbotInput;
