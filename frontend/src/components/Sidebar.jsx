import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiHome, HiUser, HiDocumentText, HiLightBulb, HiShieldCheck, HiCog } from 'react-icons/hi';
import './Sidebar.css';

export default function Sidebar() {
  const { user } = useAuth();

  const links = [
    { to: '/dashboard', icon: <HiHome />, label: 'Dashboard' },
    { to: '/profile', icon: <HiUser />, label: 'Profile' },
    { to: '/publications', icon: <HiDocumentText />, label: 'Publications' },
    { to: '/patents', icon: <HiLightBulb />, label: 'Patents' },
    { to: '/settings', icon: <HiCog />, label: 'Settings' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-menu">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <span className="link-icon">{link.icon}</span>
            <span className="link-label">{link.label}</span>
          </NavLink>
        ))}
        {user?.role === 'administrator' && (
          <NavLink
            to="/admin"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <span className="link-icon"><HiShieldCheck /></span>
            <span className="link-label">Admin Console</span>
          </NavLink>
        )}
      </div>
    </aside>
  );
}
