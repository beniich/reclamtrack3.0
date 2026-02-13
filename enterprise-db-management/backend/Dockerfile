# Builder image
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build   # (pas obligatoire, aucune étape de build, mais garde la couche)

# Runtime image
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src
RUN npm ci --production
EXPOSE 4000
CMD ["node", "src/server.js"]
