import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';

export const CandidateContext = createContext();

export const CandidateProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const response = await api.get('/candidates');
      setCandidates(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch candidates');
      console.error('Error fetching candidates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const uploadCV = async (formData) => {
    setLoading(true);
    try {
      const response = await api.post('/upload-cv', formData);
      await fetchCandidates(); // Refresh the list after upload
      return response.data;
    } catch (err) {
      setError('Failed to upload CV');
      console.error('Error uploading CV:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getCandidate = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/candidates/${id}`);
      setError(null);
      return response.data;
    } catch (err) {
      setError('Failed to fetch candidate details');
      console.error('Error fetching candidate details:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CandidateContext.Provider
      value={{
        candidates,
        loading,
        error,
        uploadCV,
        getCandidate,
        fetchCandidates,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};