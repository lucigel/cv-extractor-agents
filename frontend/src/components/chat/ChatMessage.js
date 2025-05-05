// src/components/chat/ChatMessage.js
import React from 'react';
import { Paper, Typography, Box, Avatar } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

const ChatMessage = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        mb: 2,
        width: '100%',
      }}
    >
      <Avatar
        sx={{
          mr: 2,
          bgcolor: isBot ? 'primary.main' : 'secondary.main',
        }}
      >
        {isBot ? <SmartToyIcon /> : <PersonIcon />}
      </Avatar>
      
      <Paper
        elevation={1}
        sx={{
          p: 2,
          borderRadius: 2,
          maxWidth: '80%',
          backgroundColor: isBot ? 'primary.light' : 'background.paper',
        }}
      >
        <Typography variant="body1">{message.text}</Typography>
        
        {message.data && message.data.candidates && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" fontWeight="bold">
              Candidates Found:
            </Typography>
            {message.data.candidates.map((candidate, index) => (
              <Paper key={index} sx={{ p: 1, my: 1 }}>
                <Typography variant="body2">
                  <strong>Name:</strong> {candidate.name}
                </Typography>
                {candidate.skills && (
                  <Typography variant="body2">
                    <strong>Skills:</strong> {candidate.skills}
                  </Typography>
                )}
              </Paper>
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ChatMessage;