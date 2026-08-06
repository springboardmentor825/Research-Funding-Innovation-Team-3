import client from './client';

export const registerUser = async (data) => {
  const response = await client.post('/auth/register', data);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await client.post('/auth/login', credentials);
  return response.data;
};

export const googleLoginUser = async (payload) => {
  const response = await client.post('/auth/google', payload);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await client.get('/auth/me');
  return response.data;
};
