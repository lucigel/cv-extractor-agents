import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { 
  Container, Typography, Paper, Box, Button, 
  CircularProgress, Alert, Divider 
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { CandidateContext } from '../context/CandidateContext';

const UploadCV = () => {
  const { uploadCV, loading } = useContext(CandidateContext);
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [extractedInfo, setExtractedInfo] = useState(null);
  const navigate = useNavigate();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    onDrop: acceptedFiles => {
      setFile(acceptedFiles[0]);
      setUploadStatus(null);
      setExtractedInfo(null);
    }
  });

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus({
        severity: 'error',
        message: 'Please select a PDF file first.'
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await uploadCV(formData);
      setUploadStatus({
        severity: 'success',
        message: 'CV uploaded successfully!'
      });
      setExtractedInfo(response.info);
      
      // Redirect to candidate detail after 2 seconds
      setTimeout(() => {
        navigate(`/candidates/${response.candidate_id}`);
      }, 2000);
    } catch (error) {
      setUploadStatus({
        severity: 'error',
        message: error.response?.data?.error || 'Error uploading CV.'
      });
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Upload CV
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed #ccc',
            borderRadius: 2,
            p: 4,
            mb: 3,
            textAlign: 'center',
            cursor: 'pointer',
            bgcolor: isDragActive ? 'rgba(25, 118, 210, 0.04)' : 'transparent',
            '&:hover': {
              bgcolor: 'rgba(25, 118, 210, 0.04)',
            },
          }}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
          {isDragActive ? (
            <Typography>Drop the CV file here...</Typography>
          ) : (
            <Typography>
              Drag and drop a CV file here, or click to select a file
            </Typography>
          )}
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Only PDF files are accepted
          </Typography>
        </Box>

        {file && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1">
              Selected file: <strong>{file.name}</strong> ({(file.size / 1024).toFixed(2)} KB)
            </Typography>
          </Box>
        )}

        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          onClick={handleUpload}
          disabled={!file || loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? 'Processing...' : 'Upload and Extract CV Info'}
        </Button>

        {uploadStatus && (
          <Alert severity={uploadStatus.severity} sx={{ mt: 3 }}>
            {uploadStatus.message}
          </Alert>
        )}

        {extractedInfo && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Extracted Information:
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography><strong>Name:</strong> {extractedInfo.name}</Typography>
              <Typography><strong>Email:</strong> {extractedInfo.email}</Typography>
              <Typography><strong>Phone:</strong> {extractedInfo.phone}</Typography>
              <Typography><strong>Skills:</strong> {extractedInfo.skills?.join(', ')}</Typography>
              <Typography><strong>Education:</strong> {extractedInfo.education}</Typography>
              <Typography><strong>Experience:</strong> {extractedInfo.experience}</Typography>
            </Paper>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default UploadCV;