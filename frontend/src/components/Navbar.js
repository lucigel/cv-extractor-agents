// src/components/Navbar.js (updated)
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat'; // New import

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CV Extractor
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            startIcon={<HomeIcon />}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/upload"
            startIcon={<UploadFileIcon />}
          >
            Upload CV
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/candidates"
            startIcon={<PeopleIcon />}
          >
            Candidates
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/chat"
            startIcon={<ChatIcon />}
          >
            CV Assistant
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;