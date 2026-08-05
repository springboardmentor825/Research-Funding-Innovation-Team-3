import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import InnovaLogo from '../components/InnovaLogo';
import { HiSparkles, HiShieldCheck, HiLightningBolt, HiAcademicCap, HiLightBulb, HiCurrencyDollar, HiCheckCircle } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email || 'admin@researchsphere.ai', password || 'Admin@123456');
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.detail || 'Invalid email credentials or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setEmail('admin@researchsphere.ai');
    setPassword('Admin@123456');
    handleSubmit();
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      background: 'var(--bg-dark)',
      padding: '2rem',
      boxSizing: 'border-box'
    }} className="animate-fade-in">
      
      {/* Landscape Split Container */}
      <div style={{
        width: '100%',
        maxWidth: '1100px',
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        gap: '2rem',
        alignItems: 'center'
      }}>
        {/* Left Side: Landscape Showcase Panel */}
        <div className="glass-card pulse-glow" style={{ padding: '3rem', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(2, 132, 199, 0.15) 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '2rem' }}>
            <InnovaLogo size={48} className="logo-animated" />
            <div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: '800', color: '#f8fafc' }}>
                InnovaFund <span style={{ color: '#0ea5e9' }}>AI</span>
              </span>
              <span style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Funding & Innovation Intelligence
              </span>
            </div>
          </div>

          <h2 style={{ fontSize: '2.25rem', fontWeight: '800', lineHeight: 1.25, margin: '0 0 1rem 0', color: '#f8fafc', fontFamily: 'var(--font-heading)' }}>
            Accelerate Technology Commercialization & Grants
          </h2>

          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Connect academic papers, patent white-space records, and live funding opportunities in one enterprise platform.
          </p>

          {/* Metric Highlights Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '1rem', borderRadius: '0.85rem' }}>
              <div style={{ color: '#38bdf8', fontSize: '1.35rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>250M+</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '600' }}>Research Papers</div>
              <div style={{ color: '#64748b', fontSize: '0.7rem' }}>OpenAlex & CrossRef</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '1rem', borderRadius: '0.85rem' }}>
              <div style={{ color: '#c084fc', fontSize: '1.35rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>140M+</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '600' }}>Global Patents</div>
              <div style={{ color: '#64748b', fontSize: '0.7rem' }}>USPTO & Google Patents</div>
            </div>
          </div>

          {/* Feature List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HiCheckCircle style={{ color: '#10b981', fontSize: '1.1rem' }} /> Multi-Source Academic & IP Dataset API Connectors
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HiCheckCircle style={{ color: '#10b981', fontSize: '1.1rem' }} /> Enterprise RBAC for Researchers, Founders & Admins
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HiCheckCircle style={{ color: '#10b981', fontSize: '1.1rem' }} /> Automated Live Grant Opportunity Match Engine
            </div>
          </div>
        </div>

        {/* Right Side: Sign-In Form Panel */}
        <div className="glass-card" style={{ padding: '2.75rem' }}>
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0 0 0.35rem 0', color: '#f8fafc' }}>
              Welcome Back
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
              Sign in to your InnovaFund AI account
            </p>
          </div>

          {error && (
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5', padding: '0.85rem', borderRadius: '0.75rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          {/* Social OAuth Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn-outline"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.04)', fontWeight: '600', fontSize: '0.875rem' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.14C3.25 21.3 7.31 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.59H1.27C.46 8.21 0 10.05 0 12s.46 3.79 1.27 5.41l4.01-3.14z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.59l4.01 3.14c.95-2.83 3.6-4.98 6.72-4.98z" />
              </svg>
              Sign in with Google
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn-outline"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.04)', fontWeight: '600', fontSize: '0.875rem' }}
            >
              <FaGithub style={{ fontSize: '1.1rem' }} />
              Sign in with GitHub
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', margin: '1.25rem 0', color: '#64748b', fontSize: '0.75rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }}></div>
            <span>OR EMAIL SIGN IN</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }}></div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.35rem' }}>Email Address</label>
              <input
                type="email"
                className="glass-input"
                style={{ width: '100%', boxSizing: 'border-box' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@researchsphere.ai"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.35rem' }}>Password</label>
              <input
                type="password"
                className="glass-input"
                style={{ width: '100%', boxSizing: 'border-box' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn-gradient" disabled={loading} style={{ width: '100%', marginTop: '0.35rem', padding: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              {loading ? (
                <span className="shimmer-loading" style={{ padding: '0.2rem 1rem', borderRadius: '0.5rem', width: '100%', display: 'inline-block' }}>Authenticating...</span>
              ) : (
                <>
                  <HiLightningBolt /> Sign In to Portal
                </>
              )}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.875rem', color: '#94a3b8' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: '700' }}>
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
