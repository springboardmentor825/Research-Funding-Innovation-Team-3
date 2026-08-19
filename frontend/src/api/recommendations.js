import axios from 'axios';

// Recommendations endpoints have NO /api prefix per Member 1's contract — separate client
const recClient = axios.create({ baseURL: 'http://localhost:8000' });
recClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getRecommendations = async (researcherId) => {
  const response = await recClient.get(`/recommendations/${researcherId}`);
  return response.data;
};

export const generateRecommendations = async (researcherId, topN = 10) => {
  const response = await recClient.post('/recommendations/generate', {
    researcher_id: researcherId,
    top_n: topN,
  });
  return response.data;
};