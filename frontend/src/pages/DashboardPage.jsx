import React from 'react';
import { useAuth } from '../context/AuthContext';
import { HiBookOpen, HiLightBulb, HiCurrencyDollar, HiChartBar, HiUsers, HiUserCircle, HiSparkles, HiArrowRight, HiShieldCheck } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) return null;

  const getRoleStats = () => {
    switch (user.role) {
      case 'researcher':
        return [
          { label: 'Publications Indexed', value: '42', color: '#6366f1', icon: <HiBookOpen />, sub: '+5 this month' },
          { label: 'Citations Tracked', value: '1,204', color: '#8b5cf6', icon: <HiChartBar />, sub: 'Top 5% in field' },
          { label: 'Patents Cataloged', value: '3', color: '#06b6d4', icon: <HiLightBulb />, sub: '2 Granted' },
          { label: 'Innovation Impact', value: '88/100', color: '#10b981', icon: <HiSparkles />, sub: 'High commercial readiness' },
        ];
      case 'startup_founder':
        return [
          { label: 'Funding Opportunity Matches', value: '14', color: '#6366f1', icon: <HiCurrencyDollar />, sub: '$4.2M total pool' },
          { label: 'Technology IP Matches', value: '8', color: '#8b5cf6', icon: <HiLightBulb />, sub: 'Licensing ready' },
          { label: 'Patents Monitored', value: '12', color: '#06b6d4', icon: <HiBookOpen />, sub: '3 Assignees' },
          { label: 'Market Potential', value: '92/100', color: '#10b981', icon: <HiChartBar />, sub: 'DeepTech Sector' },
        ];
      case 'administrator':
        return [
          { label: 'Platform Registered Users', value: '1,248', color: '#6366f1', icon: <HiUsers />, sub: '840 Researchers' },
          { label: 'Datasets Connected', value: '6 APIs', color: '#8b5cf6', icon: <HiBookOpen />, sub: 'OpenAlex, USPTO, Lens' },
          { label: 'System Health Uptime', value: '99.9%', color: '#10b981', icon: <HiShieldCheck />, sub: 'PostgreSQL + MongoDB' },
          { label: 'Audit Events Logged', value: '4,892', color: '#06b6d4', icon: <HiChartBar />, sub: 'Dual DB Stream' },
        ];
      default:
        return [
          { label: 'R&D Projects', value: '24', color: '#6366f1', icon: <HiBookOpen />, sub: 'Active' },
          { label: 'Institutional Researchers', value: '142', color: '#8b5cf6', icon: <HiUsers />, sub: '12 Departments' },
          { label: 'Patents Cataloged', value: '89', color: '#06b6d4', icon: <HiLightBulb />, sub: 'USPTO + Google' },
          { label: 'Innovation Index', value: '9.4/10', color: '#10b981', icon: <HiSparkles />, sub: 'Top Tier' },
        ];
    }
  };

  const fundingGrants = [
    { title: 'National DeepTech Innovation Grant 2026', agency: 'National Research Foundation', amount: '$500,000', deadline: 'Aug 30, 2026', tags: ['AI', 'Robotics'] },
    { title: 'Horizon Quantum Computing & IP Accelerator', agency: 'European Innovation Council', amount: '€1,200,000', deadline: 'Sep 15, 2026', tags: ['Quantum', 'Hardware'] },
    { title: 'BioTech Commercialization Seed Fund', agency: 'Global Health Institute', amount: '$250,000', deadline: 'Oct 01, 2026', tags: ['BioTech', 'Pharma'] },
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }} className="animate-fade-in">
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '2rem 2.5rem', marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#a5b4fc', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            <HiSparkles /> Innovation Intelligence Dashboard
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', margin: '0 0 0.5rem 0', background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Welcome back, {user.full_name}
          </h1>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem' }}>
            Here is your innovation portfolio overview, active dataset updates, and matching funding opportunities.
          </p>
        </div>

        <button onClick={() => navigate('/profile')} className="btn-gradient" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Manage Profile <HiArrowRight />
        </button>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {getRoleStats().map((stat, i) => (
          <div key={i} className="glass-card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: '500' }}>{stat.label}</span>
              <div style={{ width: '42px', height: '42px', borderRadius: '0.75rem', background: `${stat.color}20`, border: `1px solid ${stat.color}40`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                {stat.icon}
              </div>
            </div>
            <div style={{ fontSize: '2.25rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: '#f8fafc', marginBottom: '0.25rem' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.8rem', color: stat.color, fontWeight: '600' }}>
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Funding Opportunity Discovery + Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Funding Grants Preview Widget */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '700', margin: '0 0 0.25rem 0', color: '#f8fafc' }}>
                Matching Funding & Grant Opportunities
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
                Discovered programs matching your research domains and keywords
              </p>
            </div>
            <span style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#6ee7b7', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '700' }}>
              3 Live Matches
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {fundingGrants.map((grant, idx) => (
              <div key={idx} style={{ background: 'rgba(10, 15, 30, 0.5)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s ease' }}>
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    {grant.tags.map((t, ti) => (
                      <span key={ti} style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', padding: '0.15rem 0.5rem', borderRadius: '0.5rem', fontSize: '0.7rem', fontWeight: '600' }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700', margin: '0 0 0.25rem 0', color: '#f8fafc' }}>
                    {grant.title}
                  </h4>
                  <div style={{ fontSize: '0.825rem', color: '#94a3b8' }}>
                    Sponsor: <span style={{ color: '#cbd5e1' }}>{grant.agency}</span> • Deadline: <span style={{ color: '#fca5a5' }}>{grant.deadline}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#10b981', fontFamily: 'var(--font-heading)' }}>
                    {grant.amount}
                  </div>
                  <button className="btn-outline" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                    Apply Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.75rem', cursor: 'pointer' }} onClick={() => navigate('/publications')}>
            <div style={{ width: '44px', height: '44px', borderRadius: '0.75rem', background: 'rgba(99,102,241,0.2)', color: '#a5b4fc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '1rem' }}>
              <HiBookOpen />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>Publication Search</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
              Query OpenAlex, CrossRef, and Semantic Scholar academic repositories.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '1.75rem', cursor: 'pointer' }} onClick={() => navigate('/patents')}>
            <div style={{ width: '44px', height: '44px', borderRadius: '0.75rem', background: 'rgba(139,92,246,0.2)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '1rem' }}>
              <HiLightBulb />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>Patent Intelligence</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
              Search USPTO, Google Patents, and The Lens IP landscape records.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '1.75rem', cursor: 'pointer' }} onClick={() => navigate('/profile')}>
            <div style={{ width: '44px', height: '44px', borderRadius: '0.75rem', background: 'rgba(6,182,212,0.2)', color: '#67e8f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '1rem' }}>
              <HiUserCircle />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>Update Profile</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
              Manage research domains, technology keywords, and publication links.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
