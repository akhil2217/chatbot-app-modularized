import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import '../styles/ChatbotInput.css';

interface ChatbotInputProps {
  theme: 'light' | 'dark';
  input: string;
  setInput: (input: string) => void;
  sendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

const ChatbotInput: React.FC<ChatbotInputProps> = ({
  theme,
  input,
  setInput,
  sendMessage,
  handleKeyDown,
}) => (
  <div className={`chatbot-input ${theme}`}>
    <textarea
      rows={1}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Type your message..."
    ></textarea>
    <div className="send-icon" onClick={sendMessage}>
      <FaPaperPlane />
    </div>
  </div>
);

export default ChatbotInput;