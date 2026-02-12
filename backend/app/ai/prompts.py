"""Prompt templates for Claude AI analysis."""

DEBUG_PROMPT_TEMPLATE = """
You are a senior software engineer. Analyse the following error context and, if possible, propose a minimal patch (unified diff) that fixes it.

**Error context**
```
{error_context}
```

{extra_context}

Return your answer **exactly** in the following markdown format:

```diagnostic
<short description of the cause, severity and reproduction steps>
```

```patch
<unified diff (or empty if you cannot suggest a fix)>
```

Never expose secrets, API keys or any PII. Do not hallucinate code you cannot infer.
"""
