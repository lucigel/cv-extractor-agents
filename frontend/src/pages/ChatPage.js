// src/pages/ChatPage.js
import React, { useContext, useRef, useEffect } from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import { ChatContext } from '../context/ChatContext';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';

const ChatPage = () => {
  const { messages, loading, sendMessage, clearChat } = useContext(ChatContext);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          CV Assistant Chat
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Ask questions about candidates in natural language
        </Typography>
      </Box>

      <Paper
        elevation={3}
        sx={{
          height: '60vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            p: 2,
            flexGrow: 1,
            overflow: 'auto',
            backgroundColor: 'background.default',
          }}
        >
          {messages.length === 0 ? (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0.7,
              }}
            >
              <Typography variant="body1" align="center">
                Start a conversation with your CV Assistant.
              </Typography>
              <Typography variant="body2" align="center" color="textSecondary">
                Try asking: "Find candidates with Python experience" or "Who has worked at Google?"
              </Typography>
            </Box>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
          <div ref={messagesEndRef} />
        </Box>

        <Box sx={{ p: 2, backgroundColor: 'background.paper' }}>
          <ChatInput
            onSendMessage={sendMessage}
            onClearChat={clearChat}
            loading={loading}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default ChatPage;