import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('researcher');
  const [organization, setOrganization] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({
        full_name: fullName,
        email,
        password,
        role,
        organization: organization.trim() || undefined
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)', padding: '2rem' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '520px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '0.6rem 1rem', borderRadius: '0.75rem', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1rem' }}>
            RS AI
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Create Account</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>Join ResearchSphere AI Intelligence Platform</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '0.5rem' }}>Full Name</label>
            <input
              type="text"
              className="glass-input"
              style={{ width: '100%', boxSizing: 'border-box' }}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Dr. Jane Doe"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '0.5rem' }}>Email Address</label>
            <input
              type="email"
              className="glass-input"
              style={{ width: '100%', boxSizing: 'border-box' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="jane.doe@university.edu"
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

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '0.5rem' }}>Organization / Institution</label>
            <input
              type="text"
              className="glass-input"
              style={{ width: '100%', boxSizing: 'border-box' }}
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="MIT / Stanford / TechCorp"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '0.5rem' }}>Select Platform Role</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {[
                { id: 'researcher', label: 'Researcher' },
                { id: 'startup_founder', label: 'Startup Founder' },
                { id: 'innovation_manager', label: 'Innovation Manager' },
                { id: 'administrator', label: 'Administrator' },
              ].map((r) => (
                <button
                  type="button"
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  style={{
                    padding: '0.6rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    border: role === r.id ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.15)',
                    background: role === r.id ? 'rgba(99, 102, 241, 0.25)' : 'rgba(15, 23, 42, 0.4)',
                    color: role === r.id ? '#a5b4fc' : '#94a3b8',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-gradient" disabled={loading} style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}>
            {loading ? 'Creating Account...' : 'Register Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.9rem', color: '#94a3b8' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#a5b4fc', textDecoration: 'none', fontWeight: '600' }}>
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
