"""FastAPI application entry point for Debug Assistant."""
import os
from fastapi import FastAPI
from app.logger import logger

app = FastAPI(
    title="Debug‑Assistant (backend skeleton)",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

@app.get("/ping", tags=["health"])
async def ping() -> dict:
    """Endpoint de test rapide."""
    logger.info("ping received")
    return {"msg": "pong"}

@app.on_event("startup")
def startup_event():
    """Initialize database on startup (for dev)."""
    from app.db import init_db
    init_db()

@app.get("/error", tags=["debug"])
async def trigger_error():
    """Trigger a test exception to verify the debugger."""
    raise ValueError("This is a test error for the AI Debugger")

# Register routers
from app.router.debug import router as debug_router
app.include_router(debug_router)

from app.router.analytics import router as analytics_router
app.include_router(analytics_router)

# Add middleware at the end to wrap all routes
from app.middleware.error_capture import ErrorCaptureMiddleware
app.add_middleware(ErrorCaptureMiddleware)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True,
    )
