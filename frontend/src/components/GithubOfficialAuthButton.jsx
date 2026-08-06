import React from 'react';
import { FaGithub } from 'react-icons/fa';

export default function GithubOfficialAuthButton({ text = "Sign in with GitHub", onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn-outline"
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        gap: '0.75rem',
        padding: '0.85rem',
        background: 'rgba(255, 255, 255, 0.04)',
        fontWeight: '600',
        fontSize: '0.9rem',
        cursor: 'pointer'
      }}
    >
      <FaGithub style={{ fontSize: '1.2rem' }} />
      {text}
    </button>
  );
}
