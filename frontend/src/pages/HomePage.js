import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Container, Typography, Paper, Box, Button, Grid,
  Card, CardContent, CardActions
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PeopleIcon from '@mui/icons-material/People';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          CV Extractor Agent
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
          Upload CV, extract information using Gemini AI, and save to PostgreSQL + S3
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
          <Button
            component={RouterLink}
            to="/upload"
            variant="contained"
            size="large"
            startIcon={<UploadFileIcon />}
          >
            Upload CV
          </Button>
          <Button
            component={RouterLink}
            to="/candidates"
            variant="outlined"
            size="large"
            startIcon={<PeopleIcon />}
          >
            View Candidates
          </Button>
        </Box>
      </Box>

      <Grid item xs={12} md={4}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <UploadFileIcon color="primary" sx={{ fontSize: 60 }} />
            </Box>
            <Typography variant="h5" component="h2" gutterBottom textAlign="center">
              Easy CV Upload
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Upload your CV in PDF format. Our system supports drag-and-drop functionality and validates your files before processing.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
            <Button component={RouterLink} to="/upload" size="small" color="primary">
              Upload Now
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Container>
  );
};

export default HomePage;