import React from 'react';
import { Link } from 'react-router-dom';
import { HiSparkles, HiAcademicCap, HiLightBulb, HiChartBar, HiShieldCheck } from 'react-icons/hi';

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: '#f8fafc', paddingBottom: '4rem' }}>
      {/* Header / Navbar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 4rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', fontWeight: 'bold' }}>RS</div>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '-0.5px' }}>ResearchSphere <span style={{ color: '#6366f1' }}>AI</span></span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/login" className="btn-outline" style={{ textDecoration: 'none' }}>Sign In</Link>
          <Link to="/register" className="btn-gradient" style={{ textDecoration: 'none' }}>Get Started</Link>
        </div>
      </header>

      {/* Hero Banner */}
      <section style={{ textAlign: 'center', padding: '5rem 2rem 3rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.4)', padding: '0.35rem 1rem', borderRadius: '2rem', fontSize: '0.875rem', color: '#a5b4fc', marginBottom: '1.5rem' }}>
          <HiSparkles /> Enterprise AI Innovation Intelligence & Grant Funding Platform
        </div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: '1.15', marginBottom: '1.5rem', background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Accelerate Research Commercialization & Strategic Funding Discovery
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2.5rem', lineHeight: '1.6' }}>
          Connect academic research publications (OpenAlex, CrossRef, Semantic Scholar), global patent records (USPTO, Google Patents, The Lens), and innovation metrics into a unified intelligence ecosystem.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/register" className="btn-gradient" style={{ textDecoration: 'none', padding: '0.85rem 2rem', fontSize: '1.1rem' }}>Get Started Free</Link>
          <Link to="/login" className="btn-outline" style={{ textDecoration: 'none', padding: '0.85rem 2rem', fontSize: '1.1rem' }}>Explore Datasets</Link>
        </div>
      </section>

      {/* Metric Counters */}
      <section style={{ maxWidth: '1100px', margin: '2rem auto 4rem auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', padding: '0 2rem' }}>
        <div className="glass-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#6366f1', margin: 0 }}>250M+</h3>
          <p style={{ color: '#94a3b8', margin: '0.5rem 0 0 0' }}>Research Publications</p>
        </div>
        <div className="glass-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#8b5cf6', margin: 0 }}>140M+</h3>
          <p style={{ color: '#94a3b8', margin: '0.5rem 0 0 0' }}>Global Patents Cataloged</p>
        </div>
        <div className="glass-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#06b6d4', margin: 0 }}>$15B+</h3>
          <p style={{ color: '#94a3b8', margin: '0.5rem 0 0 0' }}>Grant Opportunities</p>
        </div>
        <div className="glass-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#10b981', margin: 0 }}>99.9%</h3>
          <p style={{ color: '#94a3b8', margin: '0.5rem 0 0 0' }}>Uptime & API Health</p>
        </div>
      </section>

      {/* Core Pillars */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2.5rem' }}>Platform Innovation Pillars</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '2rem', color: '#6366f1', marginBottom: '1rem' }}><HiAcademicCap /></div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Research Profile Management</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5' }}>
              Automated sync of researcher domain interests, publications, patents, citations, and technology tags across academic institutions.
            </p>
          </div>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '2rem', color: '#8b5cf6', marginBottom: '1rem' }}><HiLightBulb /></div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Patent Landscape Analytics</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5' }}>
              Deep search across USPTO, Google Patents, and The Lens for patent trends, assignee portfolios, and commercialization readiness.
            </p>
          </div>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '2rem', color: '#06b6d4', marginBottom: '1rem' }}><HiChartBar /></div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Multi-Source Dataset API</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5' }}>
              Unified query engine connecting OpenAlex, CrossRef, Semantic Scholar, and USPTO with MongoDB raw payload caching.
            </p>
          </div>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '2rem', color: '#10b981', marginBottom: '1rem' }}><HiShieldCheck /></div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Enterprise RBAC & Security</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5' }}>
              Role-Based Access Control for Researchers, Startup Founders, Innovation Managers, and Admins with dual-database audit logging.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
