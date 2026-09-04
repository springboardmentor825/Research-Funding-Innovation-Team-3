import client from './client';

// ---------------------------------------------------------------------------
// Member 7 — Innovation Manager Dashboard & Commercialization UI
//
// This module talks to Member 4 (Innovation Scoring Engine) and Member 5
// (Commercialization Recommendation Module). Their endpoints aren't live yet,
// so USE_MOCK stays true and every function returns data shaped exactly like
// the agreed API contract below. Once Member 4 / 5 deploy their routers,
// flip USE_MOCK to false (or set VITE_USE_MOCK_INNOVATION=false) and nothing
// else in the UI needs to change.
// ---------------------------------------------------------------------------

const USE_MOCK = (import.meta.env?.VITE_USE_MOCK_INNOVATION ?? 'true') !== 'false';

const delay = (ms = 450) => new Promise((res) => setTimeout(res, ms));

// Weighted scoring model from the spec:
// Research Novelty 30% | Patent Strength 20% | Technology Maturity 15%
// | Market Potential 20% | Funding Relevance 15%
const SCORE_WEIGHTS = {
  research_novelty: 0.30,
  patent_strength: 0.20,
  technology_maturity: 0.15,
  market_potential: 0.20,
  funding_relevance: 0.15,
};

const MOCK_PORTFOLIO = [
  {
    project_id: 'proj_001',
    title: 'Adaptive Battery Thermal Management System',
    domain: 'Energy / DeepTech',
    stage: 'evaluation',
    overall_score: 87,
    components: { research_novelty: 92, patent_strength: 78, technology_maturity: 65, market_potential: 95, funding_relevance: 88 },
    updated_at: '2026-08-24',
  },
  {
    project_id: 'proj_002',
    title: 'Federated Learning Framework for Clinical Trials',
    domain: 'HealthTech / AI',
    stage: 'productization',
    overall_score: 81,
    components: { research_novelty: 85, patent_strength: 70, technology_maturity: 80, market_potential: 82, funding_relevance: 79 },
    updated_at: '2026-08-27',
  },
  {
    project_id: 'proj_003',
    title: 'Low-Cost Quantum Sensor Array',
    domain: 'Quantum / Hardware',
    stage: 'ideation',
    overall_score: 64,
    components: { research_novelty: 88, patent_strength: 40, technology_maturity: 30, market_potential: 68, funding_relevance: 72 },
    updated_at: '2026-08-20',
  },
  {
    project_id: 'proj_004',
    title: 'CRISPR-Based Crop Resilience Platform',
    domain: 'AgriBio',
    stage: 'licensing',
    overall_score: 90,
    components: { research_novelty: 90, patent_strength: 95, technology_maturity: 85, market_potential: 88, funding_relevance: 90 },
    updated_at: '2026-08-29',
  },
  {
    project_id: 'proj_005',
    title: 'Edge-AI Predictive Maintenance Chip',
    domain: 'Semiconductors',
    stage: 'evaluation',
    overall_score: 73,
    components: { research_novelty: 70, patent_strength: 65, technology_maturity: 75, market_potential: 80, funding_relevance: 74 },
    updated_at: '2026-08-18',
  },
  {
    project_id: 'proj_006',
    title: 'Synthetic Data Generator for Rare Diseases',
    domain: 'HealthTech / AI',
    stage: 'startup',
    overall_score: 84,
    components: { research_novelty: 82, patent_strength: 60, technology_maturity: 78, market_potential: 92, funding_relevance: 86 },
    updated_at: '2026-08-30',
  },
];

const PIPELINE_STAGES = ['ideation', 'evaluation', 'productization', 'licensing', 'startup'];

const MOCK_RECOMMENDATIONS = {
  proj_001: [
    { type: 'productization', title: 'In-house Product Line', confidence: 82, summary: 'Strong market potential (95) and research novelty support a direct product launch within an existing energy storage line.', signals: ['High market potential', 'Moderate patent coverage'] },
    { type: 'partnership', title: 'OEM Battery Manufacturer Partnership', confidence: 74, summary: 'Technology maturity is still mid-stage, so co-development with an established manufacturer reduces time-to-market risk.', signals: ['Fills maturity gap', '3 manufacturers matched'] },
  ],
  proj_002: [
    { type: 'licensing', title: 'License to Clinical Data Platforms', confidence: 77, summary: 'High funding relevance and moderate patent strength make licensing to existing clinical trial software vendors attractive.', signals: ['2 licensing leads identified'] },
    { type: 'productization', title: 'Standalone Compliance Module', confidence: 69, summary: 'Could ship as an add-on module for HIPAA-compliant federated training.', signals: ['Regulatory fit'] },
  ],
  proj_003: [
    { type: 'partnership', title: 'University-Industry Co-Lab', confidence: 58, summary: 'Low technology maturity (30) makes a standalone venture premature; a joint lab keeps IP moving toward commercial readiness.', signals: ['Maturity below threshold'] },
  ],
  proj_004: [
    { type: 'startup', title: 'Spin-out AgriBio Venture', confidence: 91, summary: 'Excellent scores across every factor, especially patent strength (95) and market potential (88), support forming a new venture.', signals: ['Top-decile innovation score', 'Strong IP moat'] },
    { type: 'licensing', title: 'Non-exclusive License to AgTech Majors', confidence: 71, summary: 'Parallel non-exclusive licensing can generate near-term revenue while the spin-out ramps up.', signals: ['4 licensees matched'] },
  ],
  proj_005: [
    { type: 'partnership', title: 'Foundry Co-Development Agreement', confidence: 66, summary: 'Balanced scores suggest a partnership to share fabrication costs before committing to a full product line.', signals: ['Cost-sharing opportunity'] },
  ],
  proj_006: [
    { type: 'startup', title: 'Rare Disease Data-as-a-Service Startup', confidence: 79, summary: 'High market potential (92) and funding relevance (86) support an independent venture targeting orphan drug research.', signals: ['Underserved market', 'Grant-eligible'] },
  ],
};

function computeOverallScore(components) {
  return Math.round(
    Object.entries(SCORE_WEIGHTS).reduce((sum, [key, weight]) => sum + (components[key] || 0) * weight, 0)
  );
}

// GET /scoring/portfolio — Member 4 contract
export async function getInnovationPortfolio() {
  if (USE_MOCK) {
    await delay();
    return {
      weights: SCORE_WEIGHTS,
      projects: MOCK_PORTFOLIO,
      portfolio_average: Math.round(MOCK_PORTFOLIO.reduce((s, p) => s + p.overall_score, 0) / MOCK_PORTFOLIO.length),
    };
  }
  const response = await client.get('/scoring/portfolio');
  return response.data;
}

// GET /scoring/pipeline — Member 4 contract (projects grouped by stage)
export async function getInnovationPipeline() {
  if (USE_MOCK) {
    await delay();
    const grouped = PIPELINE_STAGES.reduce((acc, stage) => {
      acc[stage] = MOCK_PORTFOLIO.filter((p) => p.stage === stage);
      return acc;
    }, {});
    return { stages: PIPELINE_STAGES, grouped };
  }
  const response = await client.get('/scoring/pipeline');
  return response.data;
}

// GET /scoring/project/{id} — Member 4 contract (single score breakdown)
export async function getInnovationScoreDetail(projectId) {
  if (USE_MOCK) {
    await delay(300);
    const project = MOCK_PORTFOLIO.find((p) => p.project_id === projectId);
    if (!project) throw new Error('Project not found');
    return { ...project, weights: SCORE_WEIGHTS, computed_overall: computeOverallScore(project.components) };
  }
  const response = await client.get(`/scoring/project/${projectId}`);
  return response.data;
}

// GET /commercialization/recommendations?project_id= — Member 5 contract
export async function getCommercializationRecommendations(projectId) {
  if (USE_MOCK) {
    await delay(350);
    return { project_id: projectId, recommendations: MOCK_RECOMMENDATIONS[projectId] || [] };
  }
  const response = await client.get('/commercialization/recommendations', { params: { project_id: projectId } });
  return response.data;
}

// GET /commercialization/recommendations/all — Member 5 contract (dashboard-wide feed)
export async function getAllCommercializationRecommendations() {
  if (USE_MOCK) {
    await delay(400);
    const flattened = Object.entries(MOCK_RECOMMENDATIONS).flatMap(([projectId, recs]) =>
      recs.map((r) => ({ ...r, project_id: projectId, project_title: MOCK_PORTFOLIO.find((p) => p.project_id === projectId)?.title }))
    );
    return { recommendations: flattened.sort((a, b) => b.confidence - a.confidence) };
  }
  const response = await client.get('/commercialization/recommendations/all');
  return response.data;
}

export { SCORE_WEIGHTS, PIPELINE_STAGES, USE_MOCK };
