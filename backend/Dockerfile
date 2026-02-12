# ---------- 1️⃣  Build stage ----------
FROM python:3.12-slim AS builder
WORKDIR /app

# Installe Poetry
RUN pip install poetry==1.7.1

# Copie le pyproject & lock puis installe
COPY pyproject.toml ./
RUN poetry config virtualenvs.create false \
    && poetry install --no-root --no-interaction --no-ansi

# Copie le code source
COPY . .

# ---------- 2️⃣  Runtime ----------
FROM python:3.12-slim AS runtime
WORKDIR /app

# Copie les dépendances depuis builder
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Copie le code applicatif
COPY . .

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
