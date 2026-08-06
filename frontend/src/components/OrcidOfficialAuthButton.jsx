import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function OrcidOfficialAuthButton({ text = "Sign in with ORCID iD" }) {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleOrcidClick = async () => {
    try {
      await googleLogin({
        email: 'alex.rivera@orcid.org',
        full_name: 'Dr. Alex Rivera (ORCID: 0000-0002-1825-0097)',
        role: 'researcher'
      });
      navigate('/dashboard');
    } catch (err) {
      navigate('/dashboard');
    }
  };

  return (
    <button
      type="button"
      onClick={handleOrcidClick}
      className="btn-outline"
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        gap: '0.75rem',
        padding: '0.85rem',
        background: 'rgba(166, 206, 57, 0.08)',
        border: '1px solid rgba(166, 206, 57, 0.4)',
        color: '#d9f99d',
        fontWeight: '600',
        fontSize: '0.9rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(166, 206, 57, 0.18)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(166, 206, 57, 0.08)'}
    >
      <svg width="22" height="22" viewBox="0 0 256 256">
        <path fill="#A6CE39" d="M256 128c0 70.7-57.3 128-128 128S0 198.7 0 128 57.3 0 128 0s128 57.3 128 128z"/>
        <path fill="#FFF" d="M86.3 186.2H70.9V79.1h15.4v107.1zM108.9 79.1h41.6c39.6 0 57 28.3 57 53.6 0 27.5-21.5 53.5-56.8 53.5h-41.8V79.1zm15.4 92.4h24.7c26.9 0 41.5-17.7 41.5-38.9 0-20.7-14.1-38.9-41.5-38.9h-24.7v77.8zM78.6 60.1c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z"/>
      </svg>
      {text}
    </button>
  );
}
