"""API Endpoints for Debugger information and actions."""
import json
import asyncio
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..db import get_db, ErrorEvent

router = APIRouter(prefix="/debug", tags=["debug"])

@router.get("/info/{error_id}", response_model=dict)
def get_error_info(error_id: str, db: Session = Depends(get_db)):
    """
    Retourne le diagnostic, le patch et les métriques d'usage.
    Si l'analyse n'est pas encore prête, renvoie 202 (Accepted).
    """
    err = db.query(ErrorEvent).filter_by(error_id=error_id).first()
    if not err:
        raise HTTPException(status_code=404, detail="Error ID not found")

    if not err.diagnostic:
        # IA n'a pas terminé – on indique que le résultat arrivera bientôt
        # On peut vérifier s'il y a un traceback, ce qui signifie que l'erreur est bien capturée
        # mais pas encore analysée.
        raise HTTPException(status_code=202, detail="Analysis in progress")

    return {
        "error_id": error_id,
        "diagnostic": err.diagnostic,
        "suggested_patch": err.patch,
        "usage": err.usage,
        "created_at": err.created_at,
    }

@router.post(
    "/patch/{error_id}",
    response_model=dict,
    status_code=status.HTTP_202_ACCEPTED,
    summary="Force a re‑analysis / patch generation",
)
def force_patch(error_id: str, db: Session = Depends(get_db)):
    """
    Point d'API qui permet à un développeur d'invoquer manuellement
    une (re‑)analyse d'une erreur déjà enregistrée.
    """
    err = db.query(ErrorEvent).filter_by(error_id=error_id).first()
    if not err:
        raise HTTPException(status_code=404, detail="Error ID not found")

    # Re‑lancer l'analyse IA en background
    from ..middleware.error_capture import ErrorCaptureMiddleware
    
    # On simule l'appel méthode interne du middleware
    middleware = ErrorCaptureMiddleware(app=None) # type: ignore
    asyncio.create_task(
        middleware._run_ai_analysis(
            error_id=error_id,
            tb=err.traceback,
            extra=json.dumps(err.payload or {}),
        )
    )
    return {"msg": "Re‑analysis launched", "error_id": error_id}
