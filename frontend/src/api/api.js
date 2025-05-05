import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Thay đổi theo URL của FastAPI backend của bạn
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default api;