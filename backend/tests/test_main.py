"""Tests for main FastAPI application."""
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_ping():
    """Test health check endpoint."""
    r = client.get("/ping")
    assert r.status_code == 200
    assert r.json() == {"msg": "pong"}
