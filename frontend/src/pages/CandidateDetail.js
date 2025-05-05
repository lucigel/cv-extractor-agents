import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Paper, Box, Button, 
  Grid, Divider, Chip, CircularProgress, Alert, 
  Link, Card, CardContent
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { CandidateContext } from '../context/CandidateContext';

const CandidateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCandidate } = useContext(CandidateContext);
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidateDetails = async () => {
      try {
        const data = await getCandidate(id);
        setCandidate(data);
        setError(null);
      } catch (err) {
        setError('Failed to load candidate details');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidateDetails();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading candidate details...</Typography>
      </Container>
    );
  }

  if (error || !candidate) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error || 'Candidate not found'}</Alert>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button 
            variant="contained" 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/candidates')}
          >
            Back to List
          </Button>
        </Box>
      </Container>
    );
  }

  // Parse skills string back to array
  const skillsArray = candidate.skills ? candidate.skills.split(', ') : [];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 3 }}>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/candidates')}
        >
          Back to Candidates
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {candidate.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="body1" sx={{ mr: 1 }}>
                {candidate.email} | {candidate.phone}
              </Typography>
              {candidate.cv_url && (
                <Link href={candidate.cv_url} target="_blank" sx={{ display: 'flex', alignItems: 'center' }}>
                  <PictureAsPdfIcon sx={{ ml: 1, mr: 0.5 }} color="error" fontSize="small" />
                  <Typography variant="body2">View CV</Typography>
                </Link>
              )}
            </Box>
            <Divider sx={{ my: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Skills
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {skillsArray.map((skill, index) => (
                    <Chip key={index} label={skill} color="primary" variant="outlined" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Education
                </Typography>
                <Typography variant="body1">
                  {candidate.education || 'No education information available.'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Experience
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {candidate.experience || 'No experience information available.'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CandidateDetail;