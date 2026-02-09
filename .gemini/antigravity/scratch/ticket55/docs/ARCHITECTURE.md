# Architecture ReclamTrack

## Vue d'Ensemble

ReclamTrack est une plateforme complète de gestion des services municipaux développée avec Next.js 15 (App Router), TypeScript, et Tailwind CSS.

---

## Structure du Projet

```
ticket55/
├── backend/               # API Node.js + Express
│   ├── src/
│   │   ├── controllers/  # Logique métier
│   │   ├── models/       # Schémas MongoDB (Mongoose)
│   │   ├── routes/       # Routes API REST
│   │   ├── middleware/   # Auth, validation, logging
│   │   ├── services/     # Services métier
│   │   └── server.ts     # Point d'entrée
│   └── package.json
│
├── frontend/             # Application Next.js 15
│   ├── src/
│   │   ├── app/         # App Router (Next.js 15)
│   │   │   ├── (auth)/              # Groupe: Authentification
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── (app)/               # Groupe: Application principale
│   │   │   │   ├── dashboard/       # Tableau de bord
│   │   │   │   ├── complaints/      # Gestion réclamations
│   │   │   │   ├── teams/           # Gestion équipes
│   │   │   │   ├── planning/        # Planning interventions
│   │   │   │   ├── inventory/       # Parc véhicules
│   │   │   │   ├── settings/        # Configuration
│   │   │   │   ├── maps/            # Carte géospatiale
│   │   │   │   └── knowledge/       # Base de connaissances
│   │   │   ├── admin/               # Groupe: Administration
│   │   │   │   ├── roster/          # Planning équipes (Gantt)
│   │   │   │   ├── heatmap/         # Carte de chaleur incidents
│   │   │   │   ├── analytics/       # Analytics opérationnelles
│   │   │   │   └── teams/           # Annuaire équipes
│   │   │   ├── layout.tsx           # Layout racine
│   │   │   └── page.tsx             # Page d'accueil
│   │   │
│   │   ├── components/
│   │   │   ├── layout/              # Composants de structure
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── ui/                  # Composants UI réutilisables
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── KPICard.tsx
│   │   │   └── ClientLayout.tsx     # Layout conditionnel
│   │   │
│   │   ├── hooks/                   # React Hooks personnalisés
│   │   │   ├── useAuth.ts          # Authentification
│   │   │   └── useSocket.ts        # WebSocket temps réel
│   │   │
│   │   ├── lib/                     # Utilitaires
│   │   │   ├── api.ts              # Client Axios
│   │   │   └── utils.ts            # Fonctions helper
│   │   │
│   │   ├── store/                   # Gestion d'état (Zustand)
│   │   │   ├── authStore.ts        # État authentification
│   │   │   └── teamStore.ts        # État équipes
│   │   │
│   │   └── styles/
│   │       └── globals.css         # Styles globaux + Tailwind
│   │
│   ├── public/                      # Assets statiques
│   ├── tailwind.config.cjs         # Configuration Tailwind
│   ├── tsconfig.json               # Configuration TypeScript
│   └── package.json
│
└── docs/                            # Documentation
    ├── ARCHITECTURE.md             # Ce fichier
    ├── ROADMAP.md                  # Feuille de route
    └── API.md                      # Documentation API
```

---

## Stack Technique

### Frontend
- **Framework**: Next.js 15.1.6 (App Router)
- **Langage**: TypeScript
- **Styling**: Tailwind CSS 3.x
- **État Global**: Zustand (persist middleware)
- **HTTP Client**: Axios
- **Icons**: Lucide React + Material Symbols
- **Fonts**: Inter (Google Fonts)

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Base de données**: MongoDB + Mongoose
- **Auth**: JWT (jsonwebtoken)
- **Temps réel**: Socket.IO
- **Validation**: express-validator
- **Sécurité**: bcryptjs, helmet, cors

---

## Modèle de Données

### User (Utilisateur)
```typescript
interface User {
  id: string;
  email: string;
  password: string; // hashé avec bcrypt
  role: 'admin' | 'dispatcher' | 'staff';
  name?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Complaint (Réclamation)
```typescript
interface Complaint {
  id: string;
  ticketId: string;           // Format: CPL-XXXX
  category: string;           // Eau, Électricité, Routes...
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
  description: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  photos?: string[];          // URLs Firebase Storage
  assignedTo?: string;        // Team ID
  reportedBy: string;         // User ID
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}
```

### Team (Équipe)
```typescript
interface Team {
  id: string;
  name: string;
  department: 'water' | 'electricity' | 'gas' | 'roads' | 'hvac' | 'telecom';
  members: TeamMember[];
  manager: string;            // User ID
  status: 'active' | 'inactive';
  createdAt: Date;
}

interface TeamMember {
  userId: string;
  name: string;
  role: string;              // Ex: "Technicien II", "Ingénieur Senior"
  skills: string[];
  status: 'online' | 'offline' | 'break';
  avatar?: string;
}
```

### Shift (Intervention / Planning)
```typescript
interface Shift {
  id: string;
  teamId: string;
  complaintId?: string;
  title: string;
  description: string;
  type: 'routine' | 'emergency' | 'maintenance';
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  assignedStaff: string[];    // User IDs
  createdAt: Date;
  updatedAt: Date;
}
```

### Vehicle (Véhicule)
```typescript
interface Vehicle {
  id: string;
  vehicleId: string;         // Immatriculation
  type: 'truck' | 'van' | 'utility';
  department: string;
  status: 'available' | 'in_use' | 'maintenance' | 'out_of_service';
  fuelLevel: number;         // 0-100%
  mileage: number;           // km
  lastMaintenance: Date;
  nextMaintenance: Date;
  assignedTo?: string;       // Team ID
}
```

---

## Architecture de Composants

### Pages Principales

#### 1. Dashboard (`/dashboard`)
**Responsabilité**: Vue d'ensemble des métriques opérationnelles

**Composants**:
- `<KPIGrid />`: Cartes KPI (réclamations actives, taux de résolution, etc.)
- `<ComplaintChart />`: Graphique évolution réclamations
- `<RecentActivity />`: Timeline activités récentes
- `<MapPreview />`: Carte interactive des incidents

**Données requises**:
- Statistiques temps réel
- Liste des réclamations récentes
- Données géospatiales des incidents

---

#### 2. Complaints (`/complaints`)
**Responsabilité**: Gestion complète du cycle de vie des réclamations

**Routes**:
- `/complaints` - Liste toutes les réclamations
- `/complaints/new` - Formulaire création
- `/complaints/[id]` - Détails d'une réclamation

**Composants**:
- `<ComplaintList />`: Table avec filtres et pagination
- `<ComplaintForm />`: Formulaire multi-étapes
- `<ComplaintDetail />`: Vue détaillée avec timeline
- `<StatusBadge />`: Badge de statut coloré
- `<PriorityIndicator />`: Indicateur de priorité

**Fonctionnalités**:
- Création avec upload photos
- Assignation à une équipe
- Changement de statut avec commentaires
- Export PDF/Excel
- Recherche et filtres avancés

---

#### 3. Planning / Roster (`/admin/roster`)
**Responsabilité**: Planification des équipes (vue Gantt)

**Composants**:
- `<GanttChart />`: Timeline interactive
- `<ResourceSidebar />`: Liste personnel disponible
- `<ShiftBlock />`: Bloc d'intervention draggable
- `<ConflictDetector />`: Détection de conflits
- `<TimelineControls />`: Navigation temporelle (jour/semaine/mois)

**Fonctionnalités** (À implémenter):
- ✅ Affichage dynamique des shifts
- ⏳ Drag & Drop pour réaffecter
- ⏳ Détection automatique des conflits
- ⏳ Export planning PDF
- ⏳ Notifications temps réel

**État Local**:
```typescript
const [resources, setResources] = useState<Resource[]>([]);
const [shifts, setShifts] = useState<Shift[]>([]);
const [conflicts, setConflicts] = useState<Conflict[]>([]);
const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
```

---

#### 4. Carte Géospatiale (`/maps`)
**Responsabilité**: Visualisation géographique des opérations

**Composants**:
- `<MapContainer />`: Carte interactive (Leaflet/Mapbox)
- `<LayerToggle />`: Contrôle des couches (eau, électricité, gaz)
- `<ActiveUnits />`: Unités mobiles en temps réel
- `<IncidentMarker />`: Marqueurs incidents
- `<RouteOptimizer />`: Optimisation de trajets

**Données**:
- Positions GPS des équipes (Socket.IO)
- Incidents géolocalisés
- Infrastructures critiques

---

#### 5. Inventaire (`/inventory`)
**Responsabilité**: Gestion du parc de véhicules

**Composants**:
- `<VehicleTable />`: Table des véhicules
- `<VehicleCard />`: Carte véhicule avec statut
- `<FuelGauge />`: Jauge de carburant
- `<MaintenanceAlert />`: Alertes maintenance

**Fonctionnalités**:
- Suivi consommation carburant
- Planification maintenance préventive
- Assignation véhicule ↔ équipe
- Historique interventions

---

## Architecture des Services

### Frontend Services

#### `api.ts` - Client HTTP
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

#### `useAuth.ts` - Hook d'authentification
```typescript
export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, setToken, logout } = useAuthStore();

  const login = async (email: string, password: string) => {
    // Logique d'authentification
  };

  const register = async (email: string, password: string) => {
    // Logique d'inscription
  };

  return { login, register, logout, loading, error };
};
```

---

### Backend Services

#### `complaintService.js`
```javascript
class ComplaintService {
  async createComplaint(data) {
    // Validation
    // Génération ticketId (CPL-0001)
    // Sauvegarde MongoDB
    // Notification Socket.IO
  }

  async assignToTeam(complaintId, teamId) {
    // Vérification disponibilité équipe
    // Mise à jour statut
    // Notification équipe
  }

  async updateStatus(complaintId, newStatus, comment) {
    // Validation transition de statut
    // MAJ MongoDB
    // Log historique
  }
}
```

#### `teamService.js`
```javascript
class TeamService {
  async getAvailableTeams(department, skills) {
    // Filtre par département
    // Vérification compétences requises
    // Calcul de disponibilité
  }

  async createShift(shiftData) {
    // Détection de conflits
    // Validation horaires
    // Création shift
  }
}
```

---

## Flux de Données

### 1. Création d'une Réclamation

```
[User] 
  → Remplit formulaire /complaints/new
  → useAuth.ts vérifie authentification
  → api.post('/complaints', data)
  
[Backend]
  → complaintController.create()
  → complaintService.validate(data)
  → complaintModel.save()
  → Socket.IO emit 'new_complaint'
  
[Frontend]
  → useSocket.ts reçoit événement
  → Notification toast
  → Refresh liste réclamations
```

### 2. Assignation d'Intervention

```
[Dispatcher]
  → Sélectionne complaint dans /complaints
  → Clique "Assigner à équipe"
  → Modal → Sélection équipe
  → api.patch('/complaints/:id/assign', { teamId })
  
[Backend]
  → Vérifie disponibilité équipe
  → Créé shift automatiquement
  → MAJ statut → 'assigned'
  → Notification push équipe
  
[Frontend Équipe]
  → Reçoit notification
  → Update liste tâches /planning
```

---

## Sécurité

### Authentification JWT
- Token stocké dans localStorage
- Expiration: 7 jours
- Refresh token: 30 jours
- Middleware `authenticate` vérifie chaque requête

### Autorisation par Rôle
```javascript
// Middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès refusé' });
    }
    next();
  };
};

// Usage
router.delete('/complaints/:id', authenticate, authorize('admin'), deleteComplaint);
```

### Protection CSRF
- Tokens CSRF pour mutations importantes
- SameSite cookies

---

## Performance & Optimisation

### Frontend
- **Code Splitting**: Routes chargées à la demande (Next.js automatique)
- **Image Optimization**: `next/image` pour les photos
- **Lazy Loading**: Composants lourds (carte, charts)
- **Memoization**: `React.memo()` pour composants réutilisés
- **Virtualization**: Tables longues (react-window)

### Backend
- **Indexation MongoDB**: Index sur `ticketId`, `status`, `createdAt`
- **Pagination**: Limite 50 résultats par page
- **Caching**: Redis pour données fréquentes (stats dashboard)
- **Compression**: gzip pour réponses JSON

---

## Déploiement

### Frontend (Vercel)
```bash
npm run build
vercel --prod
```

### Backend (Railway / Render)
```bash
docker build -t reclamtrack-api .
docker push registry/reclamtrack-api
```

### Base de Données
- MongoDB Atlas (Production)
- Backups quotidiens automatiques
- Réplication 3 nœuds

---

## Monitoring & Logs

### Frontend
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics 4
- **Performance**: Vercel Analytics

### Backend
- **Logs**: Winston (console + fichiers)
- **APM**: New Relic / Datadog
- **Uptime**: UptimeRobot

---

## Tests (À implémenter)

### Frontend
- **Unit**: Jest + React Testing Library
- **E2E**: Playwright
- **Visual Regression**: Chromatic

### Backend
- **Unit**: Jest
- **Integration**: Supertest
- **Load Testing**: Artillery

---

## Variables d'Environnement

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxxxx
```

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/reclamtrack
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3001
```

---

## Prochaines Étapes

Voir `ROADMAP.md` pour la feuille de route détaillée des fonctionnalités à implémenter.
