import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.detail || 'Invalid email credentials or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)', padding: '2rem' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '0.6rem 1rem', borderRadius: '0.75rem', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1rem' }}>
            RS AI
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Welcome Back</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>Sign in to ResearchSphere AI Platform</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '0.5rem' }}>Email Address</label>
            <input
              type="email"
              className="glass-input"
              style={{ width: '100%', boxSizing: 'border-box' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="researcher@university.edu"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '0.5rem' }}>Password</label>
            <input
              type="password"
              className="glass-input"
              style={{ width: '100%', boxSizing: 'border-box' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn-gradient" disabled={loading} style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.9rem', color: '#94a3b8' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#a5b4fc', textDecoration: 'none', fontWeight: '600' }}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
