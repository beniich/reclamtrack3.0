"""Structured logging configuration using structlog."""
import os
import sys
import logging
import structlog
from structlog import stdlib as structlog_stdlib

LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()

logging.basicConfig(
    level=LOG_LEVEL,
    format="%(message)s",
    stream=sys.stdout,
)

structlog.configure(
    processors=[
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.JSONRenderer(),
    ],
    logger_factory=structlog_stdlib.LoggerFactory(),
    wrapper_class=structlog_stdlib.BoundLogger,
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger()
