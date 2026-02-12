"""Analytics API for Debug Assistant."""
# backend/app/router/analytics.py
from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session
from ..db import get_db, ErrorEvent
from datetime import datetime, timedelta

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/overview")
def overview(db: Session = Depends(get_db)):
    """
    Retourne un sommaire :
    - total_errors
    - errors_last_24h
    - average_tokens (input & output)
    - top_5_endpoints (par nombre d'erreurs)
    """
    total = db.query(func.count(ErrorEvent.error_id)).scalar()
    last_24h = (
        db.query(func.count(ErrorEvent.error_id))
        .filter(ErrorEvent.created_at >= datetime.utcnow() - timedelta(hours=24))
        .scalar()
    )
    
    # SQLite doesn't support JSON extraction easily in generic SQLAlchemy, 
    # so we might need a more robust way for prod (Postgres) vs dev (SQLite).
    # For now, let's keep it simple or use a try/except block if JSON functions fail.
    try:
        avg_tokens = db.query(
            func.avg(func.json_extract(ErrorEvent.usage, '$.input_tokens')),
            func.avg(func.json_extract(ErrorEvent.usage, '$.output_tokens')),
        ).first()
    except Exception:
        # Fallback if json_extract is not available or fails
        avg_tokens = (0, 0)

    top_endpoints = (
        db.query(ErrorEvent.endpoint, func.count(ErrorEvent.error_id).label("cnt"))
        .group_by(ErrorEvent.endpoint)
        .order_by(func.count(ErrorEvent.error_id).desc())
        .limit(5)
        .all()
    )

    return {
        "total_errors": total,
        "errors_last_24h": last_24h,
        "avg_input_tokens": round(avg_tokens[0] or 0, 2) if avg_tokens and avg_tokens[0] else 0,
        "avg_output_tokens": round(avg_tokens[1] or 0, 2) if avg_tokens and avg_tokens[1] else 0,
        "top_5_endpoints": [{"endpoint": e, "count": c} for e, c in top_endpoints],
    }

@router.get("/trends")
def trends(days: int = 30, db: Session = Depends(get_db)):
    """
    Retourne le nombre d'erreurs par jour sur les `days` derniers jours.
    """
    start = datetime.utcnow() - timedelta(days=days)
    
    # SQLite date function usage might differ from Postgres
    # Using a generic approach that works for typical setups
    rows = (
        db.query(
            func.date(ErrorEvent.created_at).label("day"),
            func.count(ErrorEvent.error_id).label("cnt"),
        )
        .filter(ErrorEvent.created_at >= start)
        .group_by(func.date(ErrorEvent.created_at))
        .order_by(func.date(ErrorEvent.created_at))
        .all()
    )
    
    data = {r[0]: r[1] for r in rows}
    
    out = []
    for i in range(days + 1):
        d = (datetime.utcnow() - timedelta(days=i)).date().isoformat()
        # Ensure we match the string format from DB
        out.append({"date": d, "count": data.get(d, 0)})
    out.reverse()
    return out
