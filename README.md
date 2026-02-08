# ReclamTrack - Municipal Services Management

Cette application permet la gestion des réclamations pour les services municipaux avec un backend Express/MongoDB et un frontend Next.js.

## 🚀 Installation

### Option 1 : Lancement automatique
```bash
# À la racine du projet
.\LANCER.cmd
```

### Option 2 : Installation manuelle

#### Backend
```bash
cd backend
cp .env.example .env
# Éditer .env avec vos valeurs (MongoDB URI, JWT_SECRET, SMTP)
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
cp .env.example .env
# Éditer .env si nécessaire
npm install
npm run dev
```

## 📋 Prérequis

- **Node.js** 18+ et npm
- **MongoDB** (local ou Atlas)
- **SMTP** pour les emails (Mailtrap, Gmail, etc.)

## 🌐 URLs

- Frontend : http://localhost:3000
- Backend API : http://localhost:5001
- Socket.IO : http://localhost:5001

## 🔐 Variables d'environnement

### Backend (.env)
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/reclamtrack
JWT_SECRET=votre-secret-key-tres-securise
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_user
SMTP_PASSWORD=your_password
```

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:5001/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5001
```

## 📦 Structure

```
reclamtrack/
├── backend/           # API Express + Socket.IO
│   ├── src/
│   │   ├── config/    # DB, env validation
│   │   ├── models/    # Mongoose schemas
│   │   ├── routes/    # API endpoints
│   │   ├── middleware/# Auth, validation
│   │   ├── services/  # Email, Socket, scheduling
│   │   └── index.ts   # Entry point
│   └── package.json
│
├── frontend/          # Next.js 15 + React 19
│   ├── src/
│   │   ├── app/       # Pages (App Router)
│   │   ├── components/# UI components
│   │   ├── hooks/     # useAuth, useSocket
│   │   ├── lib/       # Axios, utils
│   │   ├── store/     # Zustand stores
│   │   └── types/     # TypeScript types
│   └── package.json
│
└── package.json       # Root workspace
```

## 🔧 Scripts racine

```bash
npm run install:all    # Installe toutes les dépendances
npm run dev            # Lance front + back en parallèle
npm run build          # Build production
```

## 🎯 Fonctionnalités

- ✅ Authentification JWT
- ✅ Gestion des réclamations (CRUD)
- ✅ Affectation des équipes
- ✅ Planning mensuel
- ✅ Notifications en temps réel (Socket.IO)
- ✅ Dashboard avec statistiques
- ✅ Envoi d'emails (nodemailer)

## 📝 Routes API

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | /api/auth/register | Inscription |
| POST | /api/auth/login | Connexion |
| GET | /api/complaints | Liste réclamations |
| POST | /api/complaints | Créer réclamation |
| PATCH | /api/complaints/:id | Modifier statut |
| GET | /api/teams | Liste équipes |
| POST | /api/teams | Créer équipe (admin) |
| PATCH | /api/teams/:id | Modifier équipe (admin) |
| POST | /api/assignments | Affecter équipe |
| PATCH | /api/assignments/:id | Modifier affectation |
| GET | /api/planning/slots | Créneaux planning |
| POST | /api/planning/slots | Créer créneau (admin) |
| DELETE | /api/planning/slots/:id | Supprimer créneau (admin) |
| GET | /api/dashboard | Statistiques dashboard |

## 👤 Rôles utilisateurs

- **admin** : Accès complet
- **dispatcher** : Gestion réclamations et affectations
- **staff** : Consultation uniquement

## 🐛 Dépannage

### MongoDB ne se connecte pas
- Vérifiez que MongoDB est démarré : `mongod`
- Vérifiez `MONGODB_URI` dans `.env`

### Frontend ne charge pas
- Vérifiez que le backend tourne sur le port 5001
- Vérifiez les URLs dans `frontend/.env`

### Socket.IO ne fonctionne pas
- Vérifiez les CORS dans `backend/src/index.ts`
- Vérifiez `NEXT_PUBLIC_SOCKET_URL`

## 📄 License

MIT
