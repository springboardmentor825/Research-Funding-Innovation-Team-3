from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from datetime import datetime

WEIGHTS = {
    "domain_fit": 0.45,
    "deadline": 0.15,
    "amount": 0.15,
    "success_rate": 0.25,
}

def domain_fit_score(profile_text: str, opportunity_text: str) -> float:
    if not profile_text.strip() or not opportunity_text.strip():
        return 0.0
    vectorizer = TfidfVectorizer()
    try:
        tfidf = vectorizer.fit_transform([profile_text, opportunity_text])
        sim = cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0]
        return round(float(sim), 4)
    except ValueError:
        return 0.0

def deadline_score(deadline: datetime, now: datetime = None) -> float:
    now = now or datetime.utcnow()
    days_left = (deadline - now).days
    if days_left < 0:
        return 0.0
    if days_left < 7:
        return 0.1
    if 7 <= days_left <= 90:
        return 1.0
    if 90 < days_left <= 180:
        return 0.7
    return 0.4

def amount_score(amount: float, min_amount: float, max_amount: float) -> float:
    if max_amount == min_amount:
        return 0.5
    return round((amount - min_amount) / (max_amount - min_amount), 4)

def build_reasoning(d_score, dl_score, amt_score, sr_score) -> str:
    parts = []
    parts.append("Strong domain fit" if d_score > 0.4 else "Weak domain fit" if d_score < 0.15 else "Moderate domain fit")
    parts.append("deadline gives enough prep time" if dl_score >= 0.7 else "deadline is tight or far off")
    parts.append("competitive funding amount" if amt_score > 0.6 else "modest funding amount")
    parts.append("historically good odds" if sr_score > 0.2 else "historically competitive odds")
    return ", ".join(parts).capitalize() + "."

def compute_score(profile_text: str, opportunity, min_amount: float, max_amount: float) -> dict:
    d_score = domain_fit_score(profile_text, f"{opportunity.domains} {opportunity.keywords}")
    dl_score = deadline_score(opportunity.deadline)
    amt_score = amount_score(opportunity.amount, min_amount, max_amount)
    sr_score = round(opportunity.past_success_rate or 0.0, 4)

    final = (
        d_score * WEIGHTS["domain_fit"]
        + dl_score * WEIGHTS["deadline"]
        + amt_score * WEIGHTS["amount"]
        + sr_score * WEIGHTS["success_rate"]
    ) * 100

    return {
        "domain_fit_score": d_score,
        "deadline_score": dl_score,
        "amount_score": amt_score,
        "success_rate_score": sr_score,
        "score": round(final, 2),
        "reasoning": build_reasoning(d_score, dl_score, amt_score, sr_score),
    }

def build_profile_text(profile) -> str:
    parts = [
        profile.research_domains or "",
        profile.keywords or "",
        profile.technology_areas or "",
    ]
    return " ".join(parts)