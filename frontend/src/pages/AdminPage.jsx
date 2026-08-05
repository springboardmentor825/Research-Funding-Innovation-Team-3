import React, { useState, useEffect } from 'react';
import { getUsers, getAuditLogs, getSystemMetrics } from '../api/admin';
import LoadingSpinner from '../components/LoadingSpinner';
import { HiUsers, HiShieldCheck, HiDocumentText, HiLightBulb } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminPage() {
  const { user } = useAuth();
  const [usersList, setUsersList] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    if (user?.role !== 'administrator') return;
    const fetchData = async () => {
      try {
        const [uRes, aRes, mRes] = await Promise.all([
          getUsers().catch(() => []),
          getAuditLogs().catch(() => []),
          getSystemMetrics().catch(() => null),
        ]);
        setUsersList(uRes || []);
        setAuditLogs(aRes || []);
        setMetrics(mRes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (user?.role !== 'administrator') {
    return <Navigate to="/dashboard" replace />;
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Admin Console & System Audit</h1>
        <p style={{ color: '#94a3b8', margin: 0 }}>Platform user management, RBAC enforcement, and dual-database audit logs.</p>
      </div>

      {/* System Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ color: '#6366f1', fontSize: '1.5rem', marginBottom: '0.5rem' }}><HiUsers /></div>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{metrics?.total_users || usersList.length}</div>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Registered Users</div>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ color: '#8b5cf6', fontSize: '1.5rem', marginBottom: '0.5rem' }}><HiDocumentText /></div>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{metrics?.total_publications_indexed || 0}</div>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Publications Indexed</div>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ color: '#06b6d4', fontSize: '1.5rem', marginBottom: '0.5rem' }}><HiLightBulb /></div>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{metrics?.total_patents_indexed || 0}</div>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Patents Cataloged</div>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ color: '#10b981', fontSize: '1.5rem', marginBottom: '0.5rem' }}><HiShieldCheck /></div>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{metrics?.status === 'operational' ? '100% OK' : 'Degraded'}</div>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>System Status</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('users')}
          style={{
            background: 'none',
            border: 'none',
            color: activeTab === 'users' ? '#6366f1' : '#94a3b8',
            borderBottom: activeTab === 'users' ? '2px solid #6366f1' : 'none',
            padding: '0.75rem 1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          User Accounts ({usersList.length})
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          style={{
            background: 'none',
            border: 'none',
            color: activeTab === 'audit' ? '#6366f1' : '#94a3b8',
            borderBottom: activeTab === 'audit' ? '2px solid #6366f1' : 'none',
            padding: '0.75rem 1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          System Audit Logs ({auditLogs.length})
        </button>
      </div>

      {activeTab === 'users' ? (
        <div className="glass-card" style={{ padding: '1.5rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#f8fafc', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '0.75rem 1rem' }}>User ID</th>
                <th style={{ padding: '0.75rem 1rem' }}>Full Name</th>
                <th style={{ padding: '0.75rem 1rem' }}>Email Address</th>
                <th style={{ padding: '0.75rem 1rem' }}>Role</th>
                <th style={{ padding: '0.75rem 1rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.75rem 1rem', color: '#a5b4fc' }}>#{u.id}</td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: '600' }}>{u.full_name}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#cbd5e1' }}>{u.email}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.6rem',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      background: u.role === 'administrator' ? 'rgba(239,68,68,0.2)' : u.role === 'researcher' ? 'rgba(99,102,241,0.2)' : 'rgba(139,92,246,0.2)',
                      color: u.role === 'administrator' ? '#fca5a5' : u.role === 'researcher' ? '#a5b4fc' : '#c084fc'
                    }}>
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: u.is_active ? '#6ee7b7' : '#fca5a5' }}>
                    {u.is_active ? 'Active' : 'Inactive'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '1.5rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#f8fafc', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Log ID</th>
                <th style={{ padding: '0.75rem 1rem' }}>Action</th>
                <th style={{ padding: '0.75rem 1rem' }}>Resource</th>
                <th style={{ padding: '0.75rem 1rem' }}>Details</th>
                <th style={{ padding: '0.75rem 1rem' }}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.75rem 1rem', color: '#a5b4fc' }}>#{log.id}</td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 'bold', color: '#06b6d4' }}>{log.action}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#cbd5e1' }}>{log.resource}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#94a3b8' }}>{log.details || '-'}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#64748b' }}>{new Date(log.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
