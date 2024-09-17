import React from 'react';
import { Message as MessageType } from './types';
import '../styles/Message.css';

interface MessageProps {
  message: MessageType;
  theme: 'light' | 'dark';
  onLike: () => void;
  onDislike: () => void;
  onCopy: () => void;
}

const Message: React.FC<MessageProps> = ({ message, theme, onLike, onDislike, onCopy }) => (
  <div className={`message ${message.sender}`}>
    <div className="message-content">
      <div className="icon-wrapper">
        {message.sender === 'me' ? (
          <img src={process.env.PUBLIC_URL + '/assets/icons/user.svg'} alt="User Icon" className="icon" />
        ) : (
          <img src={process.env.PUBLIC_URL + '/assets/icons/robot.svg'} alt="Robot Icon" className="icon" />
        )}
      </div>
      <div className={`bubble ${theme}`}>
        {message.isTyping ? (
          <div className="typing-indicator">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        ) : (
          message.text
        )}
        {message.sender === 'bot' && !message.isTyping && (
          <div className={`message-actions ${theme}`}>
            <img
              src={process.env.PUBLIC_URL + '/assets/icons/copy.svg'}
              alt="Copy"
              className="action-icon"
              onClick={onCopy}
            />
            <img
              src={process.env.PUBLIC_URL + '/assets/icons/thumbs-up.svg'}
              alt="Like"
              className="action-icon"
              onClick={onLike}
            />
            {message.likes || 0}
            <img
              src={process.env.PUBLIC_URL + '/assets/icons/thumbs-down.svg'}
              alt="Dislike"
              className="action-icon"
              onClick={onDislike}
            />
            {message.dislikes || 0}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default Message;
