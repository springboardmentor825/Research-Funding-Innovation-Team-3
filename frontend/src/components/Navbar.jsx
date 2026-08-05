import React from 'react';
import { useAuth } from '../context/AuthContext';
import { HiLogout, HiSparkles, HiShieldCheck, HiUser } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'administrator':
        return { bg: 'rgba(244, 63, 94, 0.2)', border: 'rgba(244, 63, 94, 0.4)', text: '#fda4af' };
      case 'startup_founder':
        return { bg: 'rgba(245, 158, 11, 0.2)', border: 'rgba(245, 158, 11, 0.4)', text: '#fcd34d' };
      case 'innovation_manager':
        return { bg: 'rgba(16, 185, 129, 0.2)', border: 'rgba(16, 185, 129, 0.4)', text: '#6ee7b7' };
      default:
        return { bg: 'rgba(99, 102, 241, 0.2)', border: 'rgba(99, 102, 241, 0.4)', text: '#a5b4fc' };
    }
  };

  return (
    <header style={{
      height: '68px',
      background: 'rgba(10, 15, 30, 0.8)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justify: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      {/* Left Logo */}
      <Link to="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '0.75rem',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '900',
          color: '#ffffff',
          fontSize: '1.1rem',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
        }}>
          RS
        </div>
        <div>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '800', color: '#f8fafc', letterSpacing: '-0.5px' }}>
            ResearchSphere <span style={{ color: '#6366f1' }}>AI</span>
          </span>
          <span style={{ display: 'block', fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '-2px' }}>
            Innovation Intelligence
          </span>
        </div>
      </Link>

      {/* Right User Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {user ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.35rem 0.85rem', background: 'rgba(255,255,255,0.03)', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(139, 92, 246, 0.4)'
              }}>
                {getInitials(user.full_name)}
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#f8fafc', lineHeight: 1.2 }}>
                  {user.full_name}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                  {user.email}
                </div>
              </div>
              {(() => {
                const badge = getRoleBadgeStyle(user.role);
                return (
                  <span style={{
                    padding: '0.2rem 0.65rem',
                    borderRadius: '1rem',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    background: badge.bg,
                    border: `1px solid ${badge.border}`,
                    color: badge.text
                  }}>
                    {user.role.replace('_', ' ')}
                  </span>
                );
              })()}
            </div>

            <button
              onClick={logout}
              title="Sign Out"
              style={{
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#fca5a5',
                width: '38px',
                height: '38px',
                borderRadius: '0.6rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)'}
            >
              <HiLogout style={{ fontSize: '1.1rem' }} />
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/login" className="btn-outline" style={{ textDecoration: 'none', padding: '0.5rem 1.1rem', fontSize: '0.875rem' }}>Sign In</Link>
            <Link to="/register" className="btn-gradient" style={{ textDecoration: 'none', padding: '0.5rem 1.1rem', fontSize: '0.875rem' }}>Register</Link>
          </div>
        )}
      </div>
    </header>
  );
}
