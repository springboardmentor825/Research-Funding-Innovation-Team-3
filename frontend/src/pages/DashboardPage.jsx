import React from 'react';
import { useAuth } from '../context/AuthContext';
import StatsCard from '../components/StatsCard';
import { HiDocumentText, HiLightBulb, HiCurrencyDollar, HiChartBar, HiUsers, HiUser } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) return null;

  const getRoleStats = () => {
    switch (user.role) {
      case 'researcher':
        return [
          { label: 'Publications', value: '42', icon: <HiDocumentText />, trend: '12%', trendUp: true },
          { label: 'Citations', value: '1,204', icon: <HiChartBar />, trend: '8%', trendUp: true },
          { label: 'Patents', value: '3', icon: <HiLightBulb /> },
          { label: 'Innovation Score', value: '86/100', icon: <HiLightBulb />, trend: '5%', trendUp: true },
        ];
      case 'startup_founder':
        return [
          { label: 'Funding Matches', value: '14', icon: <HiCurrencyDollar />, trend: '2', trendUp: true },
          { label: 'Tech Matches', value: '8', icon: <HiLightBulb /> },
          { label: 'Patents Filed', value: '2', icon: <HiDocumentText /> },
          { label: 'Market Score', value: '92/100', icon: <HiChartBar />, trend: '1%', trendUp: true },
        ];
      case 'administrator':
        return [
          { label: 'Total Users', value: '1,248', icon: <HiUsers />, trend: '12%', trendUp: true },
          { label: 'Researchers', value: '840', icon: <HiUsers /> },
          { label: 'Startups', value: '312', icon: <HiUsers /> },
          { label: 'Managers', value: '96', icon: <HiUsers /> },
        ];
      default:
        return [
          { label: 'Projects', value: '24', icon: <HiDocumentText /> },
          { label: 'Researchers', value: '142', icon: <HiUsers />, trend: '5%', trendUp: true },
          { label: 'Patents', value: '89', icon: <HiLightBulb /> },
          { label: 'Innovation Index', value: '9.4', icon: <HiChartBar />, trend: '0.2', trendUp: true },
        ];
    }
  };

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <h1>
          Welcome back, {user.full_name}
          <span className={`role-badge role-${user.role}`}>{user.role.replace('_', ' ')}</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Here is what's happening with your innovation portfolio today.</p>
      </div>

      <div className="stats-grid">
        {getRoleStats().map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>

      <h2 className="section-title">Quick Actions</h2>
      <div className="actions-grid">
        <div className="action-card glass-panel" onClick={() => navigate('/publications')}>
          <div className="action-icon"><HiDocumentText /></div>
          <h3>Search Publications</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Find relevant academic papers and authors</p>
        </div>
        <div className="action-card glass-panel" onClick={() => navigate('/patents')}>
          <div className="action-icon"><HiLightBulb /></div>
          <h3>Explore Patents</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Search the patent database for innovations</p>
        </div>
        <div className="action-card glass-panel" onClick={() => navigate('/profile')}>
          <div className="action-icon"><HiUser /></div>
          <h3>Update Profile</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Refine your research domains and keywords</p>
        </div>
      </div>
    </div>
  );
}

