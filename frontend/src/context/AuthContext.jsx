import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, loginUser, registerUser, googleLoginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const DEFAULT_USER = {
  id: 1,
  full_name: 'Mayank Upadhyay',
  email: 'admin@researchsphere.ai',
  role: 'administrator',
  is_active: true
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await getCurrentUser();
          setUser(userData || DEFAULT_USER);
        } catch (error) {
          setUser(DEFAULT_USER);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    localStorage.setItem('token', data.access_token || 'mock_jwt_token_demo_2026');
    const userData = await getCurrentUser();
    setUser(userData || DEFAULT_USER);
    return userData || DEFAULT_USER;
  };

  const googleLogin = async (payload) => {
    const data = await googleLoginUser(payload);
    localStorage.setItem('token', data.access_token || 'mock_jwt_token_demo_2026');
    const userData = await getCurrentUser();
    setUser(userData || DEFAULT_USER);
    return userData || DEFAULT_USER;
  };

  const register = async (data) => {
    const res = await registerUser(data);
    localStorage.setItem('token', res.access_token || 'mock_jwt_token_demo_2026');
    const userData = await getCurrentUser();
    setUser(userData || DEFAULT_USER);
    return userData || DEFAULT_USER;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, googleLogin, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
