// src/components/chat/ChatInput.js
import React, { useState } from 'react';
import { Paper, InputBase, IconButton, Box, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ChatInput = ({ onSendMessage, onClearChat, loading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        borderRadius: 4,
        boxShadow: 2,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Ask a question about your candidates..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={loading}
      />
      
      <IconButton 
        color="error" 
        sx={{ p: '10px' }} 
        onClick={onClearChat}
        disabled={loading}
      >
        <DeleteOutlineIcon />
      </IconButton>
      
      <Box sx={{ mx: 1, display: 'flex' }}>
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <IconButton color="primary" sx={{ p: '10px' }} type="submit" disabled={!message.trim()}>
            <SendIcon />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
};

export default ChatInput;