import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import InnovaLogo from '../components/InnovaLogo';
import { HiAcademicCap, HiLightBulb, HiBriefcase, HiShieldCheck, HiSparkles, HiArrowRight } from 'react-icons/hi';

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

  const roleOptions = [
    { id: 'researcher', label: 'Researcher', desc: 'Academic & Industry Scientists', icon: <HiAcademicCap /> },
    { id: 'startup_founder', label: 'Startup Founder', desc: 'Tech Entrepreneurs & DeepTech', icon: <HiLightBulb /> },
    { id: 'innovation_manager', label: 'Innovation Manager', desc: 'University Tech Transfer & R&D', icon: <HiBriefcase /> },
    { id: 'administrator', label: 'Administrator', desc: 'Platform IT & Compliance', icon: <HiShieldCheck /> },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)', padding: '2.5rem 1.5rem', position: 'relative', overflow: 'hidden' }} className="animate-fade-in">
      {/* Background Floating Tiles */}
      <div className="glass-card floating-tile-1" style={{ position: 'absolute', top: '10%', right: '6%', width: '210px', padding: '1.25rem', opacity: 0.6, pointerEvents: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#c084fc', fontSize: '0.8rem', fontWeight: '700' }}>
          <HiSparkles /> Innovation Hub
        </div>
        <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#f8fafc', marginTop: '0.35rem' }}>$15B+ Grants</div>
        <div style={{ fontSize: '0.725rem', color: '#94a3b8' }}>Live Matching Pool</div>
      </div>

      {/* Main Registration Card */}
      <div className="glass-card pulse-glow" style={{ width: '100%', maxWidth: '600px', padding: '3rem', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
          <div style={{ display: 'inline-block', marginBottom: '1.25rem' }}>
            <InnovaLogo size={64} className="logo-animated" />
          </div>
          <h2 style={{ fontSize: '2.1rem', fontWeight: '800', margin: '0 0 0.4rem 0', fontFamily: 'var(--font-heading)', color: '#f8fafc' }}>
            Create Your Account
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>
            Join InnovaFund AI Intelligence Platform
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5', padding: '0.85rem 1rem', borderRadius: '0.75rem', marginBottom: '1.75rem', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.4rem' }}>Full Name</label>
              <input
                type="text"
                className="glass-input"
                style={{ width: '100%', boxSizing: 'border-box' }}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Dr. Alex Rivera"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.4rem' }}>Organization / Institution</label>
              <input
                type="text"
                className="glass-input"
                style={{ width: '100%', boxSizing: 'border-box' }}
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="MIT / Stanford / TechCorp"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.4rem' }}>Email Address</label>
            <input
              type="email"
              className="glass-input"
              style={{ width: '100%', boxSizing: 'border-box' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="alex.rivera@university.edu"
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

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.6rem' }}>Select Platform Persona (RBAC)</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              {roleOptions.map((r) => {
                const isSelected = role === r.id;
                return (
                  <div
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    style={{
                      padding: '0.85rem',
                      borderRadius: '0.85rem',
                      cursor: 'pointer',
                      border: isSelected ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.08)',
                      background: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'rgba(10, 15, 30, 0.4)',
                      boxShadow: isSelected ? '0 4px 15px rgba(99, 102, 241, 0.25)' : 'none',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem'
                    }}
                  >
                    <div style={{ fontSize: '1.25rem', color: isSelected ? '#a5b4fc' : '#64748b' }}>
                      {r.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '700', color: isSelected ? '#ffffff' : '#cbd5e1' }}>
                        {r.label}
                      </div>
                      <div style={{ fontSize: '0.725rem', color: '#94a3b8' }}>
                        {r.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button type="submit" className="btn-gradient" disabled={loading} style={{ width: '100%', marginTop: '0.5rem', padding: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            {loading ? (
              <span className="shimmer-loading" style={{ padding: '0.2rem 1rem', borderRadius: '0.5rem', width: '100%', display: 'inline-block' }}>Creating Account...</span>
            ) : (
              <>
                Register Account <HiArrowRight />
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: '#94a3b8' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#a5b4fc', textDecoration: 'none', fontWeight: '700' }}>
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
