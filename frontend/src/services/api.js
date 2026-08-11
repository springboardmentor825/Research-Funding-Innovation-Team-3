import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const registerUser = (data) => api.post("/register", data);
export const loginUser = (data) => api.post("/login", data);

export const getProfile = (token) =>
  api.get("/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const saveProfile = (data, token) =>
  api.post("/profile", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export default api;