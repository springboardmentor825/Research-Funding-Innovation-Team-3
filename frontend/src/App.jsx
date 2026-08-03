import { useEffect, useMemo, useState } from 'react'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const emptyProfile = {
  research_domains: '',
  keywords: '',
  publications: '',
  patents: '',
  technology_areas: '',
}

const roles = [
  ['researcher', 'Researcher'],
  ['startup_founder', 'Startup founder'],
  ['innovation_manager', 'Innovation manager'],
  ['administrator', 'Administrator'],
]

async function apiRequest(path, { token, headers, ...options } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  })
  const body = response.status === 204 ? null : await response.json().catch(() => null)
  if (!response.ok) throw new Error(body?.detail || 'Something went wrong. Please try again.')
  return body
}

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('innovaFundToken') || '')
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(emptyProfile)
  const [authMode, setAuthMode] = useState('login')
  const [authStatus, setAuthStatus] = useState('')
  const [profileStatus, setProfileStatus] = useState('')
  const [isWorking, setIsWorking] = useState(false)
  const [query, setQuery] = useState('artificial intelligence for healthcare')
  const [publicationResults, setPublicationResults] = useState([])
  const [datasetStatus, setDatasetStatus] = useState('')

  useEffect(() => {
    if (!token) return

    let cancelled = false
    async function restoreSession() {
      try {
        const [currentUser, currentProfile] = await Promise.all([
          apiRequest('/me', { token }),
          apiRequest('/profile', { token }).catch((error) => {
            if (error.message.includes('Research profile not found')) return null
            throw error
          }),
        ])
        if (!cancelled) {
          setUser(currentUser)
          if (currentProfile) setProfile(currentProfile)
        }
      } catch {
        if (!cancelled) {
          localStorage.removeItem('innovaFundToken')
          setToken('')
          setAuthStatus('Your session expired. Please sign in again.')
        }
      }
    }

    restoreSession()
    return () => {
      cancelled = true
    }
  }, [token])

  const profileProgress = useMemo(
    () => Math.round((Object.values(profile).filter((value) => value.trim()).length / 5) * 100),
    [profile],
  )

  function signOut() {
    localStorage.removeItem('innovaFundToken')
    setToken('')
    setUser(null)
    setProfile(emptyProfile)
    setPublicationResults([])
    setAuthStatus('You have been signed out.')
  }

  async function handleAuth(event) {
    event.preventDefault()
    const values = Object.fromEntries(new FormData(event.currentTarget))
    setIsWorking(true)
    setAuthStatus('')

    try {
      if (authMode === 'register') {
        await apiRequest('/register', {
          method: 'POST',
          body: JSON.stringify({
            full_name: values.full_name,
            email: values.email,
            password: values.password,
            role: values.role,
            organization: values.organization || null,
          }),
        })
      }
      const session = await apiRequest('/login', {
        method: 'POST',
        body: JSON.stringify({ email: values.email, password: values.password }),
      })
      localStorage.setItem('innovaFundToken', session.access_token)
      setToken(session.access_token)
      setAuthStatus('')
    } catch (error) {
      setAuthStatus(error.message)
    } finally {
      setIsWorking(false)
    }
  }

  async function saveProfile(event) {
    event.preventDefault()
    setIsWorking(true)
    setProfileStatus('')
    try {
      const saved = await apiRequest('/profile', {
        method: 'POST',
        token,
        body: JSON.stringify(profile),
      })
      setProfile(saved)
      setProfileStatus('Profile saved. Your recommendations will use these interests.')
    } catch (error) {
      setProfileStatus(error.message)
    } finally {
      setIsWorking(false)
    }
  }

  async function searchPublications(event) {
    event.preventDefault()
    if (query.trim().length < 2) {
      setDatasetStatus('Enter at least two characters to search.')
      return
    }
    setIsWorking(true)
    setDatasetStatus('Searching the OpenAlex research dataset…')
    try {
      const data = await apiRequest(`/publications/search?query=${encodeURIComponent(query)}&limit=6`)
      setPublicationResults(data.results)
      setDatasetStatus(`${data.count} publications found from ${data.source}.`)
    } catch (error) {
      setPublicationResults([])
      setDatasetStatus(error.message)
    } finally {
      setIsWorking(false)
    }
  }

  return (
    <main className="app-shell">
      <nav className="topbar" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="InnovaFund home">
          <span className="brand-mark">IF</span>
          <span>Innova<span>Fund</span></span>
        </a>
        <div className="nav-meta">
          <span className="environment"><i /> Milestone 1 foundation</span>
          {user ? (
            <button className="text-button" type="button" onClick={signOut}>Sign out</button>
          ) : (
            <a className="text-button" href="#access">Access platform</a>
          )}
        </div>
      </nav>

      {user ? (
        <section className="workspace" id="top">
          <header className="dashboard-heading">
            <div>
              <p className="eyebrow">{user.role.replaceAll('_', ' ')}</p>
              <h1>Good to see you, {user.full_name.split(' ')[0]}.</h1>
              <p>Build your research signal today; funding and innovation intelligence comes next.</p>
            </div>
            <div className="identity-chip" title={user.email}>
              <strong>{user.full_name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</strong>
              <span>{user.organization || 'Independent innovator'}</span>
            </div>
          </header>

          <section className="metric-grid" aria-label="Milestone 1 overview">
            <article className="metric-card highlight">
              <span>Profile readiness</span>
              <strong>{profileProgress}%</strong>
              <div className="progress-track"><span style={{ width: `${profileProgress}%` }} /></div>
              <small>{profileProgress === 100 ? 'Ready for matching' : 'Complete your profile to improve future matching'}</small>
            </article>
            <article className="metric-card">
              <span>Research source</span>
              <strong>OpenAlex</strong>
              <small>Live publication discovery</small>
            </article>
            <article className="metric-card">
              <span>Patent source</span>
              <strong>PatentsView</strong>
              <small>Available after API key setup</small>
            </article>
            <article className="metric-card">
              <span>Account security</span>
              <strong>JWT</strong>
              <small>Role-aware platform access</small>
            </article>
          </section>

          <section className="work-grid">
            <article className="panel profile-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Your intelligence profile</p>
                  <h2>Map your research focus</h2>
                </div>
                <span className="step-badge">01 / 02</span>
              </div>
              <form className="profile-form" onSubmit={saveProfile}>
                <label>
                  Research domains
                  <textarea value={profile.research_domains} onChange={(event) => setProfile({ ...profile, research_domains: event.target.value })} placeholder="e.g. Health AI, climate technology, digital health" rows="2" />
                </label>
                <label>
                  Keywords
                  <textarea value={profile.keywords} onChange={(event) => setProfile({ ...profile, keywords: event.target.value })} placeholder="e.g. machine learning, diagnostics, public health" rows="2" />
                </label>
                <label>
                  Publications
                  <textarea value={profile.publications} onChange={(event) => setProfile({ ...profile, publications: event.target.value })} placeholder="Add titles, DOI links, or a short publication history" rows="2" />
                </label>
                <label>
                  Patents
                  <textarea value={profile.patents} onChange={(event) => setProfile({ ...profile, patents: event.target.value })} placeholder="Add patent IDs, titles, or invention summaries" rows="2" />
                </label>
                <label>
                  Technology areas
                  <textarea value={profile.technology_areas} onChange={(event) => setProfile({ ...profile, technology_areas: event.target.value })} placeholder="e.g. predictive analytics, medical devices, data platforms" rows="2" />
                </label>
                <div className="form-footer">
                  <p className={profileStatus.includes('saved') ? 'success-message' : 'form-message'}>{profileStatus}</p>
                  <button className="primary-button" disabled={isWorking} type="submit">{isWorking ? 'Saving…' : 'Save profile'}</button>
                </div>
              </form>
            </article>

            <article className="panel discovery-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Connected dataset</p>
                  <h2>Explore research signals</h2>
                </div>
                <span className="source-badge">OpenAlex live</span>
              </div>
              <p className="panel-copy">Search current scholarly records to validate the topics your profile should follow.</p>
              <form className="search-row" onSubmit={searchPublications}>
                <label className="sr-only" htmlFor="research-search">Search publications</label>
                <input id="research-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a research topic" />
                <button className="primary-button" disabled={isWorking} type="submit">Search</button>
              </form>
              <p className="form-message dataset-status">{datasetStatus}</p>
              <div className="result-list" aria-live="polite">
                {publicationResults.length === 0 ? (
                  <div className="empty-results">
                    <span className="search-glyph">⌕</span>
                    <p>Search OpenAlex to bring publications and citation signals into your workspace.</p>
                  </div>
                ) : publicationResults.map((publication) => (
                  <article className="publication" key={`${publication.doi || publication.title}-${publication.publication_year}`}>
                    <div>
                      <a href={publication.doi || '#'} target={publication.doi ? '_blank' : undefined} rel="noreferrer">{publication.title || 'Untitled publication'}</a>
                      <p>{publication.authors.slice(0, 3).join(', ') || 'Author information unavailable'}</p>
                    </div>
                    <dl>
                      <div><dt>Year</dt><dd>{publication.publication_year || '—'}</dd></div>
                      <div><dt>Citations</dt><dd>{publication.cited_by_count}</dd></div>
                    </dl>
                  </article>
                ))}
              </div>
            </article>
          </section>
        </section>
      ) : (
        <>
          <section className="hero-section" id="top">
            <div className="hero-copy">
              <p className="eyebrow">Research funding & innovation intelligence</p>
              <h1>Turn promising research into a clearer next move.</h1>
              <p className="hero-description">InnovaFund brings research profiles, scholarly signals, patent context, and future funding opportunities into one trusted workspace.</p>
              <div className="hero-actions">
                <a className="primary-button" href="#access">Create your workspace</a>
                <a className="secondary-button" href="#milestone">See Milestone 1 scope <span>→</span></a>
              </div>
              <div className="trust-row"><span>Built for</span><b>Researchers</b><b>Startups</b><b>Innovation teams</b></div>
            </div>
            <aside className="signal-card" aria-label="Example intelligence signal">
              <div className="signal-top"><span className="live-dot" /> Research signal <span>Live dataset</span></div>
              <div className="signal-body">
                <p>Emerging topic</p>
                <h2>AI-enabled diagnostics</h2>
                <div className="signal-chart" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
                <div className="signal-stat"><strong>+42%</strong><span>publication activity<br />over 12 months</span></div>
              </div>
              <div className="signal-footer"><span>Source</span><strong>OpenAlex</strong><span className="arrow">↗</span></div>
            </aside>
          </section>

          <section className="capability-strip" aria-label="Platform capabilities">
            <article><span className="capability-number">01</span><h2>Secure access</h2><p>JWT sessions and role-based controls from day one.</p></article>
            <article><span className="capability-number">02</span><h2>Research profile</h2><p>Capture the work, technology, and goals that matter.</p></article>
            <article><span className="capability-number">03</span><h2>Dataset discovery</h2><p>Explore live publication data from OpenAlex.</p></article>
          </section>

          <section className="access-section" id="access">
            <div className="access-copy">
              <p className="eyebrow">Start with your profile</p>
              <h2>Give your research a strategic home.</h2>
              <p>Establish your research context now. The same profile will power funding discovery, patent intelligence, and commercialization recommendations in the next milestones.</p>
              <ul className="check-list"><li>Choose the role that matches your work</li><li>Own and update your research profile</li><li>Search live scholarly records immediately</li></ul>
            </div>
            <div className="auth-card">
              <div className="auth-tabs" role="tablist">
                <button className={authMode === 'login' ? 'active' : ''} onClick={() => { setAuthMode('login'); setAuthStatus('') }} type="button" role="tab">Sign in</button>
                <button className={authMode === 'register' ? 'active' : ''} onClick={() => { setAuthMode('register'); setAuthStatus('') }} type="button" role="tab">Create account</button>
              </div>
              <form onSubmit={handleAuth}>
                {authMode === 'register' && <>
                  <label>Full name<input name="full_name" minLength="2" required placeholder="Your name" /></label>
                  <label>Organization <input name="organization" placeholder="University, startup, or team" /></label>
                </>}
                <label>Email address <input name="email" type="email" required placeholder="you@example.com" /></label>
                <label>Password <input name="password" type="password" minLength="8" required placeholder="At least 8 characters" /></label>
                {authMode === 'register' && <label>Primary role<select name="role" defaultValue="researcher">{roles.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>}
                <p className="form-message" aria-live="polite">{authStatus}</p>
                <button className="primary-button full-width" disabled={isWorking} type="submit">{isWorking ? 'Please wait…' : authMode === 'login' ? 'Sign in to InnovaFund' : 'Create secure account'}</button>
              </form>
              <p className="auth-note">Milestone 1 uses password-based JWT authentication. OAuth can be added as the platform grows.</p>
            </div>
          </section>

          <section className="milestone-section" id="milestone">
            <div><p className="eyebrow">Project roadmap</p><h2>Milestone 1 is the intelligence foundation.</h2></div>
            <ol>
              <li><span>✓</span><div><strong>Project environment</strong><p>FastAPI, React, PostgreSQL, MongoDB, and Docker Compose are scaffolded.</p></div></li>
              <li><span>✓</span><div><strong>Secure user workflows</strong><p>Registration, login, JWT sessions, roles, and protected profile APIs are ready.</p></div></li>
              <li><span>✓</span><div><strong>Research data connection</strong><p>OpenAlex publication search is integrated; PatentsView is ready for its project API key.</p></div></li>
            </ol>
          </section>
        </>
      )}

      <footer><span>InnovaFund AI</span><span>Research Funding & Innovation Intelligence Platform</span><span>Milestone 1 · 2026</span></footer>
    </main>
  )
}

export default App
