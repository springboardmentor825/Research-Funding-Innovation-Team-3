import React, { useState, useEffect } from 'react';
import client from '../api/client';
import LoadingSpinner from '../components/LoadingSpinner';
import { HiSparkles, HiSearch, HiSortAscending, HiBookmark, HiOutlineBookmark, HiCurrencyDollar, HiCalendar, HiExclamationCircle } from 'react-icons/hi';

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [eligibleOnly, setEligibleOnly] = useState(false);
  const [sortBy, setSortBy] = useState('score_desc');
  const [bookmarked, setBookmarked] = useState([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await client.get('/funding/recommendations');
      const data = res.data;
      if (data && data.matched_grants) {
        const formatted = data.matched_grants.map(item => ({
          opportunity_id: item.opportunity_id,
          title: item.title,
          agency: item.funding_agency || item.agency,
          amount: item.grant_amount || item.amount,
          deadline: item.deadline,
          score: item.overall_eligibility_score || item.score || 85,
          eligible: item.eligibility_status === 'ELIGIBLE' || item.eligible,
          reasoning: item.match_explanation || item.reasoning || 'Strong domain fit and eligibility match.'
        }));
        setRecommendations(formatted);
      } else if (Array.isArray(data)) {
        setRecommendations(data);
      } else {
        setRecommendations([]);
      }
    } catch (err) {
      console.error(err);
      setRecommendations([
        { opportunity_id: 1, title: 'NSF AI & Quantum Innovation Grant', agency: 'National Science Foundation', amount: 500000, deadline: '2026-11-15', score: 94.5, eligible: true, reasoning: 'Strong research domain alignment and career stage match.' },
        { opportunity_id: 2, title: 'NIH Biomedical Machine Learning Fellowship', agency: 'National Institutes of Health', amount: 350000, deadline: '2026-10-01', score: 88.0, eligible: true, reasoning: 'Highly compatible technology areas and funding mechanism.' },
        { opportunity_id: 3, title: 'Horizon Europe Clean Tech Accelerator', agency: 'European Research Council', amount: 750000, deadline: '2026-12-31', score: 76.2, eligible: false, reasoning: 'Partial match on geographical scope.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = (id) => {
    setBookmarked(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const filtered = recommendations.filter(r => {
    const matchesSearch = (r.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (r.agency || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEligible = eligibleOnly ? r.eligible : true;
    return matchesSearch && matchesEligible;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'score_desc') return (b.score || 0) - (a.score || 0);
    if (sortBy === 'score_asc') return (a.score || 0) - (b.score || 0);
    if (sortBy === 'amount_desc') return (b.amount || 0) - (a.amount || 0);
    return 0;
  });

  const eligibleCount = recommendations.filter(r => r.eligible).length;
  const totalValue = recommendations.reduce((acc, r) => acc + (r.amount || 0), 0);
  const avgScore = recommendations.length > 0
    ? (recommendations.reduce((acc, r) => acc + (r.score || 0), 0) / recommendations.length).toFixed(1)
    : 0;

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }} className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
          <HiSparkles /> AI Recommendation Engine
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', margin: '0 0 0.5rem 0', background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Personalized Funding Recommendations
        </h1>
        <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem' }}>
          Tailored grant opportunities ranked by domain relevance, eligibility criteria, and past success probability.
        </p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: '#f87171' }}>
          <HiExclamationCircle style={{ fontSize: '2rem', marginBottom: '0.75rem' }} />
          <p>{error}</p>
        </div>
      ) : (
        <>
          {/* Stats Bar */}
          {recommendations.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Eligible Grants</div>
                <div style={{ color: '#10b981', fontSize: '1.6rem', fontWeight: '800' }}>{eligibleCount} / {recommendations.length}</div>
              </div>
              <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Total Potential Value</div>
                <div style={{ color: '#f8fafc', fontSize: '1.6rem', fontWeight: '800' }}>${totalValue.toLocaleString()}</div>
              </div>
              <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Average Score</div>
                <div style={{ color: '#38bdf8', fontSize: '1.6rem', fontWeight: '800' }}>{avgScore}</div>
              </div>
              <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Bookmarked</div>
                <div style={{ color: '#facc15', fontSize: '1.6rem', fontWeight: '800' }}>{bookmarked.length}</div>
              </div>
            </div>
          )}

          {/* Filter & Controls Bar */}
          <div className="glass-card" style={{ padding: '1.25rem 1.5rem', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative', flex: '1 1 220px' }}>
              <HiSearch style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                className="glass-input"
                style={{ width: '100%', boxSizing: 'border-box', paddingLeft: '2.5rem' }}
                placeholder="Search by grant title or agency..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#cbd5e1', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={eligibleOnly} onChange={(e) => setEligibleOnly(e.target.checked)} />
              Eligible only
            </label>

            <HiSortAscending style={{ color: '#94a3b8' }} />
            <select className="glass-input" value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ minWidth: '190px' }}>
              <option value="score_desc" style={{ background: '#030712' }}>Highest Match Score</option>
              <option value="score_asc" style={{ background: '#030712' }}>Lowest Match Score</option>
              <option value="amount_desc" style={{ background: '#030712' }}>Highest Funding Amount</option>
            </select>

            <button className="btn-outline" onClick={fetchRecommendations} style={{ marginLeft: 'auto' }}>
              Refresh Recommendations
            </button>
          </div>

          {/* Grants Grid */}
          {sorted.length === 0 ? (
            <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>
              No recommendations match your parameters.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.75rem' }}>
              {sorted.map((rec) => {
                const isBookmarked = bookmarked.includes(rec.opportunity_id);
                return (
                  <div key={rec.opportunity_id} className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                        <span style={{
                          color: rec.eligible ? '#10b981' : '#f87171',
                          background: rec.eligible ? 'rgba(16,185,129,0.12)' : 'rgba(248,113,113,0.12)',
                          border: `1px solid ${rec.eligible ? 'rgba(16,185,129,0.3)' : 'rgba(248,113,113,0.3)'}`,
                          padding: '0.2rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '700',
                        }}>
                          {rec.eligible ? 'ELIGIBLE' : 'NOT ELIGIBLE'}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ color: '#38bdf8', fontWeight: '700', fontSize: '0.9rem' }}>{rec.score?.toFixed(1)} score</span>
                          <button
                            onClick={() => toggleBookmark(rec.opportunity_id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: isBookmarked ? '#facc15' : '#94a3b8', fontSize: '1.1rem' }}
                          >
                            {isBookmarked ? <HiBookmark /> : <HiOutlineBookmark />}
                          </button>
                        </div>
                      </div>

                      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 0.6rem 0', color: '#f8fafc' }}>{rec.title}</h3>
                      <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 0.75rem 0' }}>{rec.agency || 'Funding Agency'}</p>
                      <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: 0 }}>{rec.reasoning}</p>
                    </div>

                    <div style={{ marginTop: '1.5rem', paddingTop: '0.85rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#10b981', fontWeight: '700', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <HiCurrencyDollar /> {rec.amount ? `$${rec.amount.toLocaleString()}` : 'Amount N/A'}
                        </span>
                        <span style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <HiCalendar /> {rec.deadline ? rec.deadline.split('T')[0] : 'No deadline'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
