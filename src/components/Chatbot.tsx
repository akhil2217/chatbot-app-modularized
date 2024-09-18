// src/Chatbot.tsx

import React, { useState, useRef, useEffect } from 'react';
import ChatbotIcon from './ChatbotIcon';
import ChatbotContainer from './ChatbotContainer';
import ChatbotHeader from './ChatbotHeader';
import ChatbotMenu from './ChatbotMenu';
import ChatbotMessages from './ChatbotMessages';
import ChatbotInput from './ChatbotInput';
import { MessageType } from './types';


const Chatbot: React.FC = () => {
  // State variables
  const [messages, setMessages] = useState<MessageType[]> ([]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [fontSize, setFontSize] = useState(14);
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false); // New state
  const messageEndRef = useRef<HTMLDivElement>(null);
  const messageIndexRef = useRef<number | null>(null);
  const [showGoodbye, setShowGoodbye] = useState(false);

  // Scroll to the latest message
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  useEffect(() => {
    if (isOpen) {
      // Ensure showGoodbye is false when opening
      setShowGoodbye(false);

      // If you want to clear messages when reopening:
      setMessages([]);
    }
  }, [isOpen]);

  const showGoodbyeMessage = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: 'bot',
        text: 'Goodbye! Feel free to chat again anytime.',
      },
    ]);

    setShowGoodbye(true);

    // Close the chatbot after a delay
    setTimeout(() => {
      setIsOpen(false);
      setShowGoodbye(false); // Reset for next time
      setMessages([]); // Clear messages from state
    }, 3000); // 3-second delay
  };


  // Function to handle sending messages
  const sendMessage = () => {
    if (input.trim() === '') return;

    const userMessage: MessageType = { sender: 'me', text: input };
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, userMessage];

      // Prepare bot's typing indicator
      const botMessageIndex = updatedMessages.length;
      messageIndexRef.current = botMessageIndex;

      // Add bot's typing indicator message
      return [
        ...updatedMessages,
        {
          sender: 'bot',
          text: '',
          isTyping: true,
          likes: 0,
          dislikes: 0,
        },
      ];
    });

    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = 'Hello! This is a static response from the bot.';
      typeBotMessage(botResponse);
    }, 2000);
  };



  // Function to simulate typing effect for bot message
  // Chatbot.tsx

  const typeBotMessage = (fullText: string) => {
    let index = 0;
    const typingSpeed = 50; // Adjust typing speed if necessary
    const botMessageIndex = messageIndexRef.current;
  
    const typeInterval = setInterval(() => {
      index++;
  
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        if (botMessageIndex !== null && updatedMessages[botMessageIndex]) {
          updatedMessages[botMessageIndex].text = fullText.substring(0, index); // Typing effect
        }
        return updatedMessages;
      });
  
      if (index >= fullText.length) {
        clearInterval(typeInterval);
  
        // After typing is done, set isTyping to false
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          if (botMessageIndex !== null && updatedMessages[botMessageIndex]) {
            updatedMessages[botMessageIndex].isTyping = false;
          }
          return updatedMessages;
        });
  
        setNewMessage(true); // Trigger any effects needed
        messageIndexRef.current = null; // Reset the ref
      }
  
      scrollToBottom(); // Scroll to the latest message
    }, typingSpeed);
  };
  



  // Function to handle liking a message
  // src/Chatbot.tsx

  // Function to handle liking a message
  const likeMessage = (index: number) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      if (!updatedMessages[index].reaction) {
        updatedMessages[index].reaction = 'like';
      }
      return updatedMessages;
    });
  };

  // Function to handle disliking a message
  const dislikeMessage = (index: number) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      if (!updatedMessages[index].reaction) {
        updatedMessages[index].reaction = 'dislike';
      }
      return updatedMessages;
    });
  };


  // Function to copy message text
  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Message copied to clipboard!');
  };

  // Function to export chat
  const exportChat = () => {
    const chatContent = messages
      .map((msg) => `${msg.sender}: ${msg.text}`)
      .join('\n');
    const blob = new Blob([chatContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'chat.txt';
    link.click();
  };

  // Function to clear chat
  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat?')) {
      setMessages([]);
      messageIndexRef.current = null;
      setIsTyping(false);
    }
  };

  // Function to start a new chat session
  const newChatSession = () => {
    setMessages([]);
    setInput('');
    messageIndexRef.current = null;
    setIsTyping(false);
    addWelcomeMessage();
  };

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Function to adjust font size with limits
  const adjustFontSize = (size: number) => {
    if (size >= 12 && size <= 20) {
      setFontSize(size);
    }
  };

  // Handle keypress for sending message
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.key === 'Enter' && !e.shiftKey) || (e.key === 'Enter' && e.ctrlKey)) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Handle minimize
  const handleMinimize = () => {
    setIsMinimized(false);
    setIsOpen(false);

  };


  // Effect to reset newMessage state after the pop effect
  useEffect(() => {
    if (newMessage) {
      const timer = setTimeout(() => {
        setNewMessage(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [newMessage]);

  // Add welcome message when chatbot opens for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addWelcomeMessage();
    }
  }, [isOpen, messages]);

  const addWelcomeMessage = () => {
    // Check if there are any existing messages to prevent adding multiple welcome messages
    if (messages.length === 0) {
      setIsTyping(true);
      const botMessageIndex = messages.length;
      messageIndexRef.current = botMessageIndex;
  
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: 'bot',
          text: '',
          isTyping: true, // Bot is typing
        },
      ]);
  
      setTimeout(() => {
        const botResponse = 'Hello! How can I assist you today?';
        typeBotMessage(botResponse);
      }, 1000);
    }
  };
  


  return (
    <>
      {!isOpen && (
        <ChatbotIcon onClick={() => setIsOpen(true)} newMessage={newMessage} />
      )}

      {isOpen && (
        <ChatbotContainer themeStyle={theme} fontSize={fontSize} isMaximized={isMaximized}>
          {/* Chatbot Header */}
          <ChatbotHeader
            theme={theme}
            setShowMenu={setShowMenu}
            showMenu={showMenu}
            handleMinimize={handleMinimize}
            isMaximized={isMaximized} // Pass isMaximized
            setIsMaximized={setIsMaximized} // Pass setIsMaximized
            showGoodbyeMessage={showGoodbyeMessage}
          />

          {/* Menu Options */}
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

          {/* Chat Messages */}
          {!isMinimized && (
            <>
              <ChatbotMessages
                messages={messages}
                theme={theme}
                copyMessage={copyMessage}
                likeMessage={likeMessage}
                dislikeMessage={dislikeMessage}
                messageEndRef={messageEndRef}
              />
              {!showGoodbye && (
                <ChatbotInput
                  input={input}
                  setInput={setInput}
                  sendMessage={sendMessage}
                  handleKeyDown={handleKeyDown}
                  theme={theme}
                />
              )}
            </>
          )}
        </ChatbotContainer>
      )}
    </>
  );
};

export default Chatbot;
