import sys
import os
import pytest
from datetime import date, timedelta
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Ensure backend directory is in sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import Base
from models import FundingOpportunity, FundingSource, User, ResearchProfile, ResearchInterest

from schemas import GrantMatchRequest, MatchingRulesConfig
from services.grant_matching_service import GrantMatchingRulesEngine

# In-memory SQLite DB for testing
SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(SQLALCHEMY_TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(autouse=True)
def setup_database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

@pytest.fixture
def db_session():
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()

def create_sample_opportunities(db):
    source = FundingSource(name="Test Source", source_type="Government Grants")
    db.add(source)
    db.flush()

    today = date.today()

    opp1 = FundingOpportunity(
        source_id=source.id,
        title="AI Commercialization Grant",
        agency="NSF",
        grant_amount=1000000,
        deadline=today + timedelta(days=60),
        status="Open",
        research_domain="Artificial Intelligence",
        career_stage="Early-Career",
        eligible_geography="US",
        funding_type="Grant"
    )

    opp2 = FundingOpportunity(
        source_id=source.id,
        title="BioTech Research Fellowship",
        agency="NIH",
        grant_amount=500000,
        deadline=today + timedelta(days=90),
        status="Open",
        research_domain="Biotechnology",
        career_stage="Mid-Career",
        eligible_geography="Global",
        funding_type="Fellowship"
    )

    opp3 = FundingOpportunity(
        source_id=source.id,
        title="Expired Energy Innovation Grant",
        agency="DOE",
        grant_amount=750000,
        deadline=today - timedelta(days=30), # EXPIRED
        status="Expired",
        research_domain="Climate",
        career_stage="Any",
        eligible_geography="Global",
        funding_type="Grant"
    )

    db.add_all([opp1, opp2, opp3])
    db.commit()
    return [opp1, opp2, opp3]


def test_full_grant_match(db_session):
    opps = create_sample_opportunities(db_session)
    engine = GrantMatchingRulesEngine()

    request = GrantMatchRequest(
        research_domains=["Artificial Intelligence"],
        career_stage="Early-Career",
        geography="US",
        funding_types=["Grant"],
        include_expired=False
    )

    res = engine.evaluate_opportunity(opps[0], request)

    assert res.is_eligible is True
    assert res.eligibility_status == "ELIGIBLE"
    assert res.overall_eligibility_score == 100.0
    assert len(res.rejection_reasons) == 0


def test_expired_grant_edge_case(db_session):
    opps = create_sample_opportunities(db_session)
    engine = GrantMatchingRulesEngine()

    request = GrantMatchRequest(
        research_domains=["Climate"],
        career_stage="Any",
        geography="Global",
        funding_types=["Grant"],
        include_expired=False
    )

    res = engine.evaluate_opportunity(opps[2], request)

    assert res.is_eligible is False
    assert res.eligibility_status == "EXPIRED"
    assert "Grant deadline expired" in res.rejection_reasons[0]


def test_geography_mismatch_edge_case(db_session):
    opps = create_sample_opportunities(db_session)
    engine = GrantMatchingRulesEngine()

    # Researcher in India applying for US-only grant
    request = GrantMatchRequest(
        research_domains=["Artificial Intelligence"],
        career_stage="Early-Career",
        geography="India",
        funding_types=["Grant"],
        include_expired=False
    )

    res = engine.evaluate_opportunity(opps[0], request)

    assert res.is_eligible is False
    assert res.eligibility_status == "INELIGIBLE"
    assert any("Geographical restriction" in r for r in res.rejection_reasons)


def test_partial_match_edge_case(db_session):
    opps = create_sample_opportunities(db_session)
    engine = GrantMatchingRulesEngine()

    # Domain matches BioTech, but career stage is Early-Career instead of Mid-Career
    request = GrantMatchRequest(
        research_domains=["Biotechnology"],
        career_stage="Early-Career",
        geography="Global",
        funding_types=["Fellowship"],
        include_expired=False
    )

    res = engine.evaluate_opportunity(opps[1], request)

    assert res.is_eligible is True # Partial match is still eligible
    assert res.eligibility_status in ["PARTIAL_MATCH", "ELIGIBLE"]
    assert res.overall_eligibility_score > 50.0


def test_rule_weight_tuning_without_code_changes(db_session):
    opps = create_sample_opportunities(db_session)
    engine = GrantMatchingRulesEngine()

    # Tune config: Increase domain weight to 80%, reduce geography weight
    new_config = MatchingRulesConfig(
        domain_weight=80.0,
        career_stage_weight=10.0,
        geography_weight=5.0,
        funding_type_weight=5.0,
        strict_geography_check=False
    )
    engine.update_config(new_config)

    request = GrantMatchRequest(
        research_domains=["Artificial Intelligence"],
        career_stage="Mid-Career",
        geography="EU",
        funding_types=["Accelerator"],
        include_expired=False
    )

    res = engine.evaluate_opportunity(opps[0], request)

    # Because domain weight is 80%, domain match boosts score heavily
    assert res.overall_eligibility_score >= 80.0
