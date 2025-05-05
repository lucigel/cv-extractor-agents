// src/context/ChatContext.js

import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import api from '../api/api';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // Thêm tin nhắn người dùng vào danh sách
    const userMessage = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);

    try {
      // Gọi API mới
      const response = await api.post('/api/chat', { query: text });
      
      // Thêm phản hồi từ AI vào danh sách
      const aiMessage = {
        id: uuidv4(),
        text: response.data.response || 'Xin lỗi, tôi không thể xử lý yêu cầu của bạn.',
        sender: 'ai',
        timestamp: new Date(),
        // Nếu muốn hiển thị thêm thông tin như SQL query
        metadata: {
          sql_query: response.data.sql_query,
          raw_results: response.data.raw_results
        }
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Thêm thông báo lỗi vào danh sách
      const errorMessage = {
        id: uuidv4(),
        text: 'Đã xảy ra lỗi khi xử lý yêu cầu của bạn.',
        sender: 'ai',
        timestamp: new Date(),
        error: true,
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider value={{ messages, loading, sendMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
};