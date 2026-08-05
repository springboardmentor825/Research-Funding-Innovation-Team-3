import React, { useState } from 'react';
import { searchPatents } from '../api/research';
import LoadingSpinner from '../components/LoadingSpinner';
import { HiSearch, HiLightBulb, HiShieldCheck } from 'react-icons/hi';

export default function PatentsPage() {
  const [query, setQuery] = useState('quantum computing');
  const [source, setSource] = useState('all');
  const [limit, setLimit] = useState(10);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const data = await searchPatents(query, source, limit);
      setResults(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Patent Intelligence & IP Landscape</h1>
        <p style={{ color: '#94a3b8', margin: 0 }}>Search global patent records across USPTO, Google Patents, and The Lens.</p>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'grid', gridTemplateColumns: '1fr 180px 100px 140px', gap: '1rem', alignItems: 'center' }}>
          <input
            type="text"
            className="glass-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patents by technology area, title, or assignee..."
            required
          />
          <select
            className="glass-input"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option value="all" style={{ background: '#0f172a' }}>All Sources</option>
            <option value="uspto" style={{ background: '#0f172a' }}>USPTO Public Data</option>
            <option value="google_patents" style={{ background: '#0f172a' }}>Google Patents</option>
            <option value="the_lens" style={{ background: '#0f172a' }}>The Lens</option>
          </select>
          <select
            className="glass-input"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <option value={5} style={{ background: '#0f172a' }}>5 Items</option>
            <option value={10} style={{ background: '#0f172a' }}>10 Items</option>
            <option value={25} style={{ background: '#0f172a' }}>25 Items</option>
          </select>
          <button type="submit" className="btn-gradient" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.65rem' }}>
            <HiSearch /> Search
          </button>
        </form>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : searched ? (
        <div>
          <div style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.95rem' }}>
            Found {results.length} patent records for query "<strong style={{ color: '#f8fafc' }}>{query}</strong>"
          </div>
          {results.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
              {results.map((pat, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.4)', color: '#c084fc', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        {pat.external_source}
                      </span>
                      <span style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        background: pat.status === 'Granted' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)',
                        color: pat.status === 'Granted' ? '#6ee7b7' : '#fcd34d'
                      }}>
                        {pat.status}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', lineHeight: '1.4' }}>
                      {pat.title}
                    </h3>
                    <p style={{ color: '#cbd5e1', fontSize: '0.875rem', margin: '0 0 0.5rem 0' }}>
                      <strong>Patent Number:</strong> <code style={{ color: '#a5b4fc' }}>{pat.patent_number}</code>
                    </p>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
                      <strong>Assignee:</strong> {pat.assignee || 'Global Assignee'}
                    </p>
                  </div>

                  <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#94a3b8' }}>
                    <span>Source: {pat.external_source}</span>
                    <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <HiShieldCheck /> Valid Patent
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
              No patent records matched your search parameters.
            </div>
          )}
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
          Enter search terms above to query USPTO, Google Patents, and The Lens IP datasets.
        </div>
      )}
    </div>
  );
}
