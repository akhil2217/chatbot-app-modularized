import React from 'react';
import ChatbotHeader from './ChatbotHeader';
import ChatbotMenu from './ChatbotMenu';
import ChatbotMessages from './ChatbotMessages';
import ChatbotInput from './ChatbotInput';
import { Message } from './types';

interface ChatbotContainerProps {
  theme: 'light' | 'dark';
  fontSize: number;
  isMinimized: boolean;
  showMenu: boolean;
  messages: Message[];
  input: string;
  setInput: (input: string) => void;
  sendMessage: () => void;
  handleMinimize: () => void;
  setIsOpen: (isOpen: boolean) => void;
  setShowMenu: (showMenu: boolean) => void;
  exportChat: () => void;
  clearChat: () => void;
  newChatSession: () => void;
  toggleTheme: () => void;
  adjustFontSize: (size: number) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  messageEndRef: React.RefObject<HTMLDivElement>;
  likeMessage: (index: number) => void;
  dislikeMessage: (index: number) => void;
  copyMessage: (text: string) => void;
  isTyping: boolean; // Add this line
}

const ChatbotContainer: React.FC<ChatbotContainerProps> = ({
  theme,
  fontSize,
  isMinimized,
  showMenu,
  messages,
  input,
  setInput,
  sendMessage,
  handleMinimize,
  setIsOpen,
  setShowMenu,
  exportChat,
  clearChat,
  newChatSession,
  toggleTheme,
  adjustFontSize,
  handleKeyDown,
  messageEndRef,
  likeMessage,
  dislikeMessage,
  copyMessage,
  isTyping,
  
}) => (
  <div className={`chatbot-container ${theme}`} style={{ fontSize: `${fontSize}px` }}>
    <ChatbotHeader
      theme={theme}
      handleMinimize={handleMinimize}
      setIsOpen={setIsOpen}
      setShowMenu={setShowMenu}
      showMenu={showMenu}
    />
    {showMenu && (
      <ChatbotMenu
        theme={theme}
        exportChat={exportChat}
        clearChat={clearChat}
        newChatSession={newChatSession}
        toggleTheme={toggleTheme}
        adjustFontSize={adjustFontSize}
        fontSize={fontSize}
        onMouseLeave={() => setShowMenu(false)}
      />
    )}
    {!isMinimized && (
      <>
        <ChatbotMessages
          theme={theme}
          messages={messages}
          messageEndRef={messageEndRef}
          likeMessage={likeMessage}
          dislikeMessage={dislikeMessage}
          copyMessage={copyMessage}
          isTyping={isTyping} // Pass isTyping prop here
        />
        <ChatbotInput
          theme={theme}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          handleKeyDown={handleKeyDown}
        />
      </>
    )}
  </div>
);

export default ChatbotContainer;