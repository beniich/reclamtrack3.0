# 🚀 ReclamTrack - Mono-Application

> Application de gestion des réclamations avec modules Roster et Audit Logs intégrés

## 📦 Structure

```
reclamtrack/
├── frontend/           # Next.js 15 (App Router)
│   ├── /dashboard     # Tableau de bord
│   ├── /complaints    # Gestion des réclamations
│   ├── /roster        # Planning d'équipe
│   └── /audit-logs    # Logs d'audit
├── backend/           # Express + MongoDB
│   ├── /routes        # API routes
│   └── /models        # Mongoose models
└── docker-compose.yml # Orchestration
```

## 🚀 Démarrage Rapide

### Installation
```bash
npm run install:all
```

### Développement
```bash
# Lancer Frontend + Backend
npm run dev

# Ou séparément
npm run dev:frontend
npm run dev:backend
```

### URLs
- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:5001
- **Roster** : http://localhost:3000/roster
- **Audit Logs** : http://localhost:3000/audit-logs

## 🛠️ Scripts Disponibles

| Script | Description |
|--------|-------------|
| `npm run install:all` | Installation des dépendances |
| `npm run dev` | Lancement en dev (Frontend + Backend) |
| `npm run build` | Build production |
| `npm run lint` | Vérification ESLint |
| `npm test` | Tests automatisés |

## 🐳 Docker

```bash
# Lancer avec Docker Compose
docker-compose up

# Build images
docker-compose build

# Arrêter
docker-compose down
```

## 📚 Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - Architecture détaillée
- [INTEGRATION_COMPLETE.md](INTEGRATION_COMPLETE.md) - Guide d'intégration
- [QUICKSTART.md](QUICKSTART.md) - Guide de démarrage

## ⚙️ Configuration

### Variables d'environnement

#### Backend (.env)
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/reclamtrack
JWT_SECRET=your_secret_key
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

## 🔧 Maintenance

### Harmonisation
```bash
# Script d'harmonisation automatique
.\HARMONIZE.ps1
```

### Tests
```bash
# Suite de tests complète
.\TEST.ps1
```

## 📝 Changelog

### v1.0.0 - 2026-02-12
- ✅ Intégration AuditGuard dans `/audit-logs`
- ✅ Intégration RosterFlow dans `/roster`
- ✅ Harmonisation ESLint et TypeScript
- ✅ Docker-compose mis à jour
- ✅ Scripts d'automatisation

## 🤝 Contribution

Voir [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 Licence

Propriétaire
