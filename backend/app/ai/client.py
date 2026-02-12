"""Anthropic Claude API client wrapper for error analysis."""
import os
import re
import asyncio
from anthropic import AsyncAnthropic
from anthropic.types import MessageParam
from .prompts import DEBUG_PROMPT_TEMPLATE
from ..logger import logger

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
if not ANTHROPIC_API_KEY:
    logger.warning("ANTHROPIC_API_KEY not set - AI features will be disabled")
    client = None
else:
    client = AsyncAnthropic(api_key=ANTHROPIC_API_KEY)


async def analyze_error(error_context: str, extra_context: str = "") -> dict:
    """
    Envoie le contexte d'erreur à Claude et renvoie un dict contenant :
        - diagnostic
        - suggested_patch
        - usage (input / output tokens)
    """
    if not client:
        return {
            "diagnostic": "AI analysis disabled (no API key)",
            "suggested_patch": "",
            "usage": {"input_tokens": 0, "output_tokens": 0},
        }
    
    prompt = DEBUG_PROMPT_TEMPLATE.format(
        error_context=error_context,
        extra_context=extra_context,
    )
    
    try:
        response = await client.messages.create(
            model="claude-3-5-sonnet-20240620",
            max_tokens=1000,
            temperature=0.0,
            system="You are a senior software engineer specialized in debugging.",
            messages=[MessageParam(role="user", content=prompt)],
        )
    except Exception as exc:
        logger.error("Claude request failed", error=str(exc))
        raise

    content = response.content[0].text
    # Découpage simple des blocs markdown
    diagnostic, patch = _extract_sections(content)
    
    return {
        "diagnostic": diagnostic.strip(),
        "suggested_patch": patch.strip(),
        "usage": {
            "input_tokens": response.usage.input_tokens,
            "output_tokens": response.usage.output_tokens,
        },
    }


def _extract_sections(text: str) -> tuple[str, str]:
    """Renvoie (diagnostic, patch) à partir du markdown produit."""
    diag = re.search(r"```diagnostic\s+(.*?)```", text, re.DOTALL)
    pat = re.search(r"```patch\s+(.*?)```", text, re.DOTALL)
    diagnostic = diag.group(1) if diag else text
    patch = pat.group(1) if pat else ""
    return diagnostic, patch
