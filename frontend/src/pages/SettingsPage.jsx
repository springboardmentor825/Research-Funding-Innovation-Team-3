import React from 'react';
import { useAuth } from '../context/AuthContext';
import { HiCog, HiKey, HiBell, HiShieldCheck } from 'react-icons/hi';

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Platform Settings</h1>
        <p style={{ color: '#94a3b8', margin: 0 }}>Configure security credentials, notifications, and API integrations.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Account & Security */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ color: '#6366f1', fontSize: '1.5rem', marginBottom: '1rem' }}><HiShieldCheck /></div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Account Security</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Logged in as <strong>{user?.email}</strong> ({user?.role.replace('_', ' ')})
          </p>
          <button className="btn-outline" style={{ width: '100%', marginBottom: '0.75rem' }}>Change Password</button>
          <button className="btn-outline" style={{ width: '100%' }}>Enable 2FA Authentication</button>
        </div>

        {/* API Integration Keys */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ color: '#8b5cf6', fontSize: '1.5rem', marginBottom: '1rem' }}><HiKey /></div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>API Dataset Keys</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Manage OpenAlex, CrossRef, USPTO, and The Lens integration credentials.
          </p>
          <input type="text" className="glass-input" style={{ width: '100%', boxSizing: 'border-box', marginBottom: '0.75rem' }} defaultValue="OpenAlex Mailto Header Set" disabled />
          <input type="password" className="glass-input" style={{ width: '100%', boxSizing: 'border-box', marginBottom: '1rem' }} placeholder="The Lens API Key (Optional)" />
          <button className="btn-gradient" style={{ width: '100%' }}>Save API Preferences</button>
        </div>

        {/* Notification Preferences */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ color: '#06b6d4', fontSize: '1.5rem', marginBottom: '1rem' }}><HiBell /></div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Notifications & Alerts</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Receive updates on new publications, patent filings, and grant opportunities.
          </p>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#cbd5e1', marginBottom: '0.75rem', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked /> Email alerts for publication citations
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#cbd5e1', marginBottom: '1.5rem', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked /> Patent landscape white-space alerts
          </label>
          <button className="btn-outline" style={{ width: '100%' }}>Update Notifications</button>
        </div>
      </div>
    </div>
  );
}
