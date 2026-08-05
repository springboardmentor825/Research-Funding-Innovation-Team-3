import React, { useState, useEffect } from 'react';
import { getMyProfile, updateMyProfile } from '../api/profile';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    bio: '',
    technology_areas: '',
    research_domains: '',
    keywords: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setProfile(data);
        if (data) {
          setFormData({
            title: data.title || '',
            bio: data.bio || '',
            technology_areas: data.technology_areas || '',
            research_domains: (data.research_domains || []).join(', '),
            keywords: (data.keywords || []).join(', ')
          });
        }
      } catch (err) {
        // No profile found
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const payload = {
        title: formData.title,
        bio: formData.bio,
        technology_areas: formData.technology_areas,
        research_domains: formData.research_domains.split(',').map(s => s.trim()).filter(Boolean),
        keywords: formData.keywords.split(',').map(s => s.trim()).filter(Boolean)
      };
      const updated = await updateMyProfile(payload);
      setProfile(updated);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Research & Innovation Profile</h1>
        <p style={{ color: '#94a3b8', margin: 0 }}>Manage your research interests, technology domains, and academic profile.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem' }}>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#6366f1' }}>Current Profile Overview</h3>
          {profile ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Title / Role</label>
                <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>{profile.title || 'Researcher / Specialist'}</div>
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Biography</label>
                <div style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.5' }}>{profile.bio || 'No biography provided yet.'}</div>
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>Research Domains</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {profile.research_domains && profile.research_domains.length > 0 ? (
                    profile.research_domains.map((dom, i) => (
                      <span key={i} style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.85rem' }}>
                        {dom}
                      </span>
                    ))
                  ) : <span style={{ color: '#64748b' }}>No domains set</span>}
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>Technology Keywords</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {profile.keywords && profile.keywords.length > 0 ? (
                    profile.keywords.map((kw, i) => (
                      <span key={i} style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.4)', color: '#c084fc', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.85rem' }}>
                        #{kw}
                      </span>
                    ))
                  ) : <span style={{ color: '#64748b' }}>No keywords set</span>}
                </div>
              </div>
            </div>
          ) : (
            <p style={{ color: '#94a3b8' }}>No profile data yet. Fill out the form to create your profile.</p>
          )}
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#8b5cf6' }}>Edit Profile Information</h3>
          {message && (
            <div style={{ padding: '0.75rem', background: message.includes('success') ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)', color: message.includes('success') ? '#6ee7b7' : '#fca5a5', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>Professional Title</label>
              <input
                type="text"
                name="title"
                className="glass-input"
                style={{ width: '100%', boxSizing: 'border-box' }}
                value={formData.title}
                onChange={handleChange}
                placeholder="Senior Research Fellow / Associate Professor"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>Bio / Overview</label>
              <textarea
                name="bio"
                className="glass-input"
                style={{ width: '100%', boxSizing: 'border-box', minHeight: '80px' }}
                value={formData.bio}
                onChange={handleChange}
                placeholder="Brief summary of research focus and commercialization goals..."
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>Research Domains (comma-separated)</label>
              <input
                type="text"
                name="research_domains"
                className="glass-input"
                style={{ width: '100%', boxSizing: 'border-box' }}
                value={formData.research_domains}
                onChange={handleChange}
                placeholder="Artificial Intelligence, Quantum Computing, Bioinformatics"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>Technology Keywords (comma-separated)</label>
              <input
                type="text"
                name="keywords"
                className="glass-input"
                style={{ width: '100%', boxSizing: 'border-box' }}
                value={formData.keywords}
                onChange={handleChange}
                placeholder="deep learning, drug discovery, transformers, precision medicine"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>Technology Areas</label>
              <input
                type="text"
                name="technology_areas"
                className="glass-input"
                style={{ width: '100%', boxSizing: 'border-box' }}
                value={formData.technology_areas}
                onChange={handleChange}
                placeholder="DeepTech, HealthTech, Clean Energy"
              />
            </div>
            <button type="submit" className="btn-gradient" disabled={saving} style={{ alignSelf: 'flex-start', padding: '0.75rem 1.5rem' }}>
              {saving ? 'Updating...' : 'Save Profile Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
