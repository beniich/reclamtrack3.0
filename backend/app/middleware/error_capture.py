"""Middleware for capturing unhandled exceptions and triggering AI analysis."""
import uuid
import json
import traceback
import asyncio
from datetime import datetime
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.responses import JSONResponse
from ..ai.client import analyze_error
from ..logger import logger
from ..db import get_db, ErrorEvent, SessionLocal

class ErrorCaptureMiddleware(BaseHTTPMiddleware):
    """
    - Capture toutes les exceptions non gérées.
    - Crée un UUID (`error_id`) et renvoie le header `X-Error-Id`.
    - Enregistre l'événement dans la DB.
    - Lance l'analyse IA de façon fire‑and‑forget.
    """

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        try:
            response = await call_next(request)
            return response
        except Exception as exc:
            # 1️⃣  Générer un ID unique et extraire le traceback complet
            error_id = str(uuid.uuid4())
            tb_str = "".join(traceback.format_exception(type(exc), exc, exc.__traceback__))

            # 2️⃣  Récupérer le payload (sans PII) – on scrub les clés sensibles
            raw_body = await request.body()
            try:
                if raw_body:
                    payload = json.loads(raw_body)
                else:
                    payload = {}
            except Exception:
                payload = {"raw": raw_body.decode(errors="replace")}
            
            payload = _scrub_payload(payload)

            # 3️⃣  Log interne (structured)
            client_host = request.client.host if request.client else "unknown"
            logger.error(
                "Unhandled exception captured",
                error_id=error_id,
                path=request.url.path,
                method=request.method,
                client=client_host,
                exception=str(exc),
            )

            # 4️⃣  Persist dans DB
            await self._persist_error(
                error_id=error_id,
                traceback=tb_str,
                payload=payload,
                endpoint=request.url.path,
                method=request.method,
                client=client_host,
            )

            # 5️⃣  Lancer l'analyse IA de façon asynchrone (fire‑and‑forget)
            asyncio.create_task(self._run_ai_analysis(error_id, tb_str, json.dumps(payload)))

            # 6️⃣  Retourner une réponse JSON générique + header X-Error-Id
            response = JSONResponse(
                content={"error_id": error_id, "detail": "Internal Server Error"},
                status_code=500,
            )
            response.headers["X-Error-Id"] = error_id
            return response

    async def _persist_error(
        self,
        *,
        error_id: str,
        traceback: str,
        payload: dict,
        endpoint: str,
        method: str,
        client: str,
    ) -> None:
        """
        Persistance dans la base.
        """
        try:
            # On utilise SessionLocal direct car on est hors du contexte de dépendance FastAPI normal parfois
            db = SessionLocal()
            try:
                err = ErrorEvent(
                    error_id=error_id,
                    traceback=traceback,
                    payload=payload,
                    endpoint=endpoint,
                    method=method,
                    client_ip=client,
                    created_at=datetime.utcnow(),
                )
                db.add(err)
                db.commit()
            finally:
                db.close()
        except Exception as db_exc:
            logger.error(
                "DB persist failed",
                db_error=str(db_exc),
                error_id=error_id,
            )

    async def _run_ai_analysis(self, error_id: str, tb: str, extra: str) -> None:
        """
        Appelle le wrapper Anthropic puis met à jour l'enregistrement DB.
        """
        try:
            result = await analyze_error(error_context=tb, extra_context=extra)
            
            db = SessionLocal()
            try:
                err = db.query(ErrorEvent).filter_by(error_id=error_id).first()
                if err:
                    err.diagnostic = result["diagnostic"]
                    err.patch = result["suggested_patch"]
                    err.usage = result["usage"]
                    db.commit()
            finally:
                db.close()
                
        except Exception as e:
            logger.error("AI analysis failed", error_id=error_id, reason=str(e))


def _scrub_payload(payload: dict) -> dict:
    """Remplace les valeurs suspectes (password, token, api_key…) par ***."""
    sensitive = {"password", "token", "api_key", "authorization", "secret", "cookie"}
    
    def recurse(obj):
        if isinstance(obj, dict):
            return {
                k: ("***" if k.lower() in sensitive else recurse(v))
                for k, v in obj.items()
            }
        if isinstance(obj, list):
            return [recurse(i) for i in obj]
        return obj
        
    return recurse(payload)
