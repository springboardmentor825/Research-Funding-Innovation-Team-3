import React from 'react';
import { HiX } from 'react-icons/hi';

export default function GoogleAccountChooserModal({ isOpen, onClose, onSelectAccount }) {
  if (!isOpen) return null;

  const accounts = [
    {
      name: 'Mayank Upadhyay',
      email: 'mayankupadhyay2020115@gmail.com',
      avatar: 'M',
      color: '#4285F4',
      role: 'administrator'
    },
    {
      name: 'Mayank Upadhyay (Institutional)',
      email: 'mu8515@srmist.edu.in',
      avatar: 'M',
      color: '#0F9D58',
      role: 'researcher'
    },
    {
      name: 'Dr. Alex Rivera',
      email: 'admin@researchsphere.ai',
      avatar: 'A',
      color: '#DB4437',
      role: 'administrator'
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      padding: '1.5rem'
    }} className="animate-fade-in">
      
      {/* Google Account Selector Card */}
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: '#18181b',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '1.25rem',
        padding: '2.25rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        color: '#f4f4f5',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'transparent',
            border: 'none',
            color: '#a1a1aa',
            cursor: 'pointer',
            fontSize: '1.25rem'
          }}
        >
          <HiX />
        </button>

        {/* Google Header Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.14C3.25 21.3 7.31 24 12 24z" />
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.59H1.27C.46 8.21 0 10.05 0 12s.46 3.79 1.27 5.41l4.01-3.14z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.59l4.01 3.14c.95-2.83 3.6-4.98 6.72-4.98z" />
          </svg>
          <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#f4f4f5' }}>Sign in with Google</span>
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 0.4rem 0', color: '#ffffff' }}>
          Choose an account
        </h2>
        <p style={{ color: '#a1a1aa', fontSize: '0.875rem', margin: '0 0 1.75rem 0' }}>
          to continue to <strong style={{ color: '#38bdf8' }}>innovafund-ai.app</strong>
        </p>

        {/* Account List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {accounts.map((acc, idx) => (
            <div
              key={idx}
              onClick={() => onSelectAccount(acc)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.9rem 1rem',
                borderRadius: '0.85rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.borderColor = '#38bdf8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: acc.color,
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                fontWeight: '800',
                fontSize: '1.1rem',
                color: '#ffffff',
                flexShrink: 0
              }}>
                {acc.avatar}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#f4f4f5', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {acc.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#a1a1aa', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {acc.email}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#a1a1aa' }}>
          <span>To continue, Google will share your name and email.</span>
        </div>
      </div>
    </div>
  );
}
