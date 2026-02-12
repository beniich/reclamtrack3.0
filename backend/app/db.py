"""Database configuration and models."""
import os
from datetime import datetime
from typing import Generator, Any

from sqlalchemy import (
    Column,
    String,
    Text,
    JSON,
    DateTime,
    create_engine,
)
from sqlalchemy.orm import sessionmaker, Session, DeclarativeBase

# -------------------------------------------------------------------------
#   Configuration DB (PostgreSQL en prod, SQLite en dev)
# -------------------------------------------------------------------------
DB_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./debugger.db?check_same_thread=False",  # fallback dev
)

engine = create_engine(
    DB_URL,
    connect_args={"check_same_thread": False} if DB_URL.startswith("sqlite") else {},
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(DeclarativeBase):
    pass

# -------------------------------------------------------------------------
#   Fonction d'injection (FastAPI dépendance)
# -------------------------------------------------------------------------
def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -------------------------------------------------------------------------
#   Table `error_events`
# -------------------------------------------------------------------------
class ErrorEvent(Base):
    __tablename__ = "error_events"

    # Primary key
    error_id = Column(String, primary_key=True, index=True)

    # Payload / trace
    traceback = Column(Text, nullable=False)
    payload = Column(JSON, nullable=True)
    endpoint = Column(String, nullable=False)
    method = Column(String, nullable=False)
    client_ip = Column(String, nullable=True)

    # IA results (nullable : renseignés après analyse)
    diagnostic = Column(Text, nullable=True)
    patch = Column(Text, nullable=True)          # diff unifié
    usage = Column(JSON, nullable=True)          # tokens, coût, durée

    # Méta
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

# -------------------------------------------------------------------------
#   Crée les tables à l'import (ou utilisez Alembic)
# -------------------------------------------------------------------------
def init_db():
    Base.metadata.create_all(bind=engine)
