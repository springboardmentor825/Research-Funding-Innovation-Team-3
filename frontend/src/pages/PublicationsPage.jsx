import React, { useState } from 'react';
import { searchPublications } from '../api/research';
import LoadingSpinner from '../components/LoadingSpinner';
import { HiSearch, HiExternalLink, HiBookOpen } from 'react-icons/hi';

export default function PublicationsPage() {
  const [query, setQuery] = useState('artificial intelligence');
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
      const data = await searchPublications(query, source, limit);
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
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Publication Dataset Explorer</h1>
        <p style={{ color: '#94a3b8', margin: 0 }}>Search across OpenAlex, CrossRef, and Semantic Scholar academic repositories.</p>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'grid', gridTemplateColumns: '1fr 180px 100px 140px', gap: '1rem', alignItems: 'center' }}>
          <input
            type="text"
            className="glass-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search publications by keyword, author, or DOI..."
            required
          />
          <select
            className="glass-input"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option value="all" style={{ background: '#0f172a' }}>All Sources</option>
            <option value="openalex" style={{ background: '#0f172a' }}>OpenAlex</option>
            <option value="crossref" style={{ background: '#0f172a' }}>CrossRef</option>
            <option value="semantic_scholar" style={{ background: '#0f172a' }}>Semantic Scholar</option>
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
            Displaying {results.length} scientific publications for query "<strong style={{ color: '#f8fafc' }}>{query}</strong>"
          </div>
          {results.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
              {results.map((pub, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        {pub.external_source}
                      </span>
                      {pub.publication_year && (
                        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{pub.publication_year}</span>
                      )}
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', lineHeight: '1.4' }}>
                      {pub.title}
                    </h3>
                    <p style={{ color: '#cbd5e1', fontSize: '0.875rem', margin: '0 0 0.75rem 0' }}>
                      <strong>Authors:</strong> {pub.authors || 'Unknown'}
                    </p>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
                      <strong>Venue:</strong> {pub.journal_or_venue || 'N/A'}
                    </p>
                  </div>

                  <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', color: '#06b6d4', fontWeight: '600' }}>
                      Citations: {pub.citation_count || 0}
                    </span>
                    {pub.doi ? (
                      <a href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`} target="_blank" rel="noreferrer" style={{ color: '#a5b4fc', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        View DOI <HiExternalLink />
                      </a>
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>No DOI</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
              No publication records matched your search parameters.
            </div>
          )}
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
          Enter keywords above and click Search to query OpenAlex, CrossRef, and Semantic Scholar datasets.
        </div>
      )}
    </div>
  );
}
