// src/App.js (updated)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Pages
import HomePage from './pages/HomePage';
import UploadCV from './pages/UploadCV';
import CandidatesList from './pages/CandidatesList';
import CandidateDetail from './pages/CandidateDetail';
import ChatPage from './pages/ChatPage'; // New import
import Navbar from './components/Navbar';

// Context
import { CandidateProvider } from './context/CandidateContext';
import { ChatProvider } from './context/ChatContext'; // New import

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CandidateProvider>
        <ChatProvider> {/* Wrap with ChatProvider */}
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/upload" element={<UploadCV />} />
              <Route path="/candidates" element={<CandidatesList />} />
              <Route path="/candidates/:id" element={<CandidateDetail />} />
              <Route path="/chat" element={<ChatPage />} /> {/* Add new route */}
            </Routes>
          </Router>
        </ChatProvider>
      </CandidateProvider>
    </ThemeProvider>
  );
}

export default App;