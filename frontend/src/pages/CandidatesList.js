import React, { useContext, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Container, Typography, Paper, Box, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Button, CircularProgress, Alert
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CandidateContext } from '../context/CandidateContext';

const CandidatesList = () => {
  const { candidates, loading, error, fetchCandidates } = useContext(CandidateContext);

  useEffect(() => {
    fetchCandidates();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading candidates...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button variant="contained" onClick={fetchCandidates}>
            Try Again
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Candidates List
        </Typography>
        
        {candidates.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1">No candidates found.</Typography>
            <Button 
              component={RouterLink} 
              to="/upload" 
              variant="contained" 
              sx={{ mt: 2 }}
            >
              Upload CV
            </Button>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Skills</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {candidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell>{candidate.id}</TableCell>
                    <TableCell>{candidate.name}</TableCell>
                    <TableCell>{candidate.email}</TableCell>
                    <TableCell>{candidate.phone}</TableCell>
                    <TableCell>{candidate.skills?.substring(0, 50)}...</TableCell>
                    <TableCell>
                      <Button
                        component={RouterLink}
                        to={`/candidates/${candidate.id}`}
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityIcon />}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
};

export default CandidatesList;