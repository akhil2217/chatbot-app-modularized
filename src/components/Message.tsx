
import React from 'react';
import { MessageType } from './types';
import {
  FaUser,
  FaRobot,
  FaRegCopy,
  FaThumbsUp,
  FaThumbsDown,
} from 'react-icons/fa';
import TypingIndicator from './TypingIndicator';
import '../styles/Message.css';

interface MessageProps {
  msg: MessageType;
  index: number;
  theme: 'light' | 'dark';
  copyMessage: (text: string) => void;
  likeMessage: (index: number) => void;
  dislikeMessage: (index: number) => void;
}

const Message: React.FC<MessageProps> = ({
  msg,
  index,
  theme,
  copyMessage,
  likeMessage,
  dislikeMessage,
}) => {
  return (
    <div className={`message ${msg.sender}`}>
      <div className={`message-content ${msg.sender}`}>
        <div className={`icon-wrapper ${msg.sender}`}>
          {msg.sender === 'me' ? <FaUser /> : <FaRobot />}
        </div>
        <div className={`bubble ${msg.sender}`}>
          {msg.isTyping && !msg.text ? (
            <TypingIndicator />
          ) : (
            msg.text
          )}
          {msg.sender === 'bot' && !msg.isTyping && (
            <div className={`message-actions ${theme}`}>
              <FaRegCopy onClick={() => copyMessage(msg.text)} />
              <FaThumbsUp
                onClick={() => !msg.reaction && likeMessage(index)}
                className={msg.reaction === 'like' ? 'liked' : ''}
              />
              <FaThumbsDown
                onClick={() => !msg.reaction && dislikeMessage(index)}
                className={msg.reaction === 'dislike' ? 'disliked' : ''}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
