import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import InnovaLogo from '../components/InnovaLogo';
import { HiSparkles, HiShieldCheck, HiLightningBolt } from 'react-icons/hi';

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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)', padding: '2rem', position: 'relative', overflow: 'hidden' }} className="animate-fade-in">
      {/* Decorative Floating Ambient Cards in Background */}
      <div className="glass-card floating-tile-1" style={{ position: 'absolute', top: '15%', left: '8%', width: '220px', padding: '1.25rem', opacity: 0.65, pointerEvents: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a5b4fc', fontSize: '0.8rem', fontWeight: '700' }}>
          <HiSparkles /> Multi-Dataset AI
        </div>
        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#f8fafc', marginTop: '0.35rem' }}>250M+ Papers</div>
        <div style={{ fontSize: '0.725rem', color: '#94a3b8' }}>OpenAlex & CrossRef</div>
      </div>

      <div className="glass-card floating-tile-2" style={{ position: 'absolute', bottom: '15%', right: '8%', width: '220px', padding: '1.25rem', opacity: 0.65, pointerEvents: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6ee7b7', fontSize: '0.8rem', fontWeight: '700' }}>
          <HiShieldCheck /> Global IP Explorer
        </div>
        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#f8fafc', marginTop: '0.35rem' }}>140M+ Patents</div>
        <div style={{ fontSize: '0.725rem', color: '#94a3b8' }}>USPTO & Google Patents</div>
      </div>

      {/* Main Sign-In Card */}
      <div className="glass-card pulse-glow" style={{ width: '100%', maxWidth: '450px', padding: '3rem', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
          <div style={{ display: 'inline-block', marginBottom: '1.25rem' }}>
            <InnovaLogo size={64} className="logo-animated" />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 0.4rem 0', fontFamily: 'var(--font-heading)', color: '#f8fafc' }}>
            Welcome Back
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>
            Sign in to InnovaFund AI Intelligence Platform
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5', padding: '0.85rem', borderRadius: '0.75rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.4rem' }}>Email Address</label>
            <input
              type="email"
              className="glass-input"
              style={{ width: '100%', boxSizing: 'border-box' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@researchsphere.ai"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.4rem' }}>Password</label>
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

          <button type="submit" className="btn-gradient" disabled={loading} style={{ width: '100%', marginTop: '0.5rem', padding: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            {loading ? (
              <span className="shimmer-loading" style={{ padding: '0.2rem 1rem', borderRadius: '0.5rem', width: '100%', display: 'inline-block' }}>Authenticating...</span>
            ) : (
              <>
                <HiLightningBolt /> Sign In to Portal
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: '#94a3b8' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#a5b4fc', textDecoration: 'none', fontWeight: '700' }}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
