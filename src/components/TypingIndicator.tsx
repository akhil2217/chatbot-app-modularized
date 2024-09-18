// src/components/TypingIndicator.tsx

import React from 'react';
import '../styles/TypingIndicator.css';

const TypingIndicator: React.FC = () => {
  return (
    <div className="typing-indicator">
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
    </div>
  );
};

export default TypingIndicator;
