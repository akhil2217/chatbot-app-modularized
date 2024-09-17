import React, { useState, useRef, useEffect, useCallback } from 'react';
import ChatbotIcon from './ChatbotIcon';
import ChatbotContainer from './ChatbotContainer';
import { Message } from './types';
import '../styles/Chatbot.css';

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isMinimized, setIsMinimized] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [fontSize, setFontSize] = useState(14);
    const [showMenu, setShowMenu] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [newMessage, setNewMessage] = useState(false);
    const messageEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const sendMessage = () => {
        if (input.trim() === '') return;
    
        const userMessage: Message = { sender: 'me', text: input };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInput('');
        setIsTyping(true);
    
        // Simulate bot response
        setTimeout(() => {
            const botResponse = 'Hello! This is a static response from the bot.';
            setMessages(prevMessages => [
                ...prevMessages,
                { sender: 'bot', text: botResponse, likes: 0, dislikes: 0 }
            ]);
            setIsTyping(false);
            scrollToBottom();
        }, 1500); // Show typing animation for 1.5 seconds
    };

    const likeMessage = (index: number) => {
        const updatedMessages = [...messages];
        updatedMessages[index].likes = (updatedMessages[index].likes || 0) + 1;
        setMessages(updatedMessages);
    };

    const dislikeMessage = (index: number) => {
        const updatedMessages = [...messages];
        updatedMessages[index].dislikes = (updatedMessages[index].dislikes || 0) + 1;
        setMessages(updatedMessages);
    };

    const copyMessage = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Message copied to clipboard!');
    };

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

    const clearChat = () => {
        if (window.confirm('Are you sure you want to clear the chat?')) {
            setMessages([]);
            setIsTyping(false);
        }
    };

    const newChatSession = () => {
        setMessages([]);
        setInput('');
        setIsTyping(false);
        addWelcomeMessage();
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const adjustFontSize = (size: number) => {
        const newSize = size;
        if (newSize >= 12 && newSize <= 20) {
            setFontSize(newSize);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        } else if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleMinimize = () => {
        setIsOpen(false);
        setIsMinimized(false);
    };

    const addWelcomeMessage = useCallback(() => {
        setIsTyping(true);
        setTimeout(() => {
            const botResponse = 'Hello! How can I assist you today?';
            setMessages([
                { sender: 'bot', text: botResponse, likes: 0, dislikes: 0 }
            ]);
            setIsTyping(false);
            scrollToBottom();
        }, 1500);
    }, []);

    useEffect(() => {
        if (newMessage) {
            const timer = setTimeout(() => {
                setNewMessage(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [newMessage]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            addWelcomeMessage();
        }
    }, [isOpen, messages.length, addWelcomeMessage]);

    return (
        <>
            {!isOpen && (
                <ChatbotIcon onClick={() => setIsOpen(true)} newMessage={newMessage} />
            )}

            {isOpen && (
                <ChatbotContainer
                    theme={theme}
                    fontSize={fontSize}
                    isMinimized={isMinimized}
                    showMenu={showMenu}
                    messages={messages}
                    input={input}
                    setInput={setInput}
                    sendMessage={sendMessage}
                    handleMinimize={handleMinimize}
                    setIsOpen={setIsOpen}
                    setShowMenu={setShowMenu}
                    exportChat={exportChat}
                    clearChat={clearChat}
                    newChatSession={newChatSession}
                    toggleTheme={toggleTheme}
                    adjustFontSize={adjustFontSize}
                    handleKeyDown={handleKeyDown}
                    messageEndRef={messageEndRef}
                    likeMessage={likeMessage}
                    dislikeMessage={dislikeMessage}
                    copyMessage={copyMessage}
                    isTyping={isTyping}
                />
            )}
        </>
    );
};

export default Chatbot;