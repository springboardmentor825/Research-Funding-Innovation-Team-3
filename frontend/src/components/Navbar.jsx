import React from 'react';
import { useAuth } from '../context/AuthContext';
import { HiLogout } from 'react-icons/hi';
import './Navbar.css'; // Inline styles can also be in pages.css, but we'll add CSS below

export default function Navbar() {
  const { user, logout } = useAuth();
  
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <nav className="navbar glass-panel">
      <div className="nav-left">
        <div className="nav-logo">
          <div className="logo-icon">IF</div>
          <span className="logo-text text-gradient">InnovaFund AI</span>
        </div>
      </div>
      
      <div className="nav-right">
        {user && (
          <div className="user-info">
            <div className="user-details">
              <span className="user-name">{user.full_name}</span>
              <span className={`role-badge role-${user.role}`}>{user.role.replace('_', ' ')}</span>
            </div>
            <div className="user-avatar">{getInitials(user.full_name)}</div>
            <button className="logout-btn" onClick={logout} title="Logout">
              <HiLogout />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
