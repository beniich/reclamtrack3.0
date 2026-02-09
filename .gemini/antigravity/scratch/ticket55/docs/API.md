# Documentation API ReclamTrack

> **Base URL**: `http://localhost:5000/api`  
> **Version**: 1.0.0  
> **Format**: JSON  
> **Authentification**: JWT Bearer Token

---

## 📋 Table des Matières

1. [Authentification](#authentification)
2. [Réclamations (Complaints)](#réclamations)
3. [Équipes (Teams)](#équipes)
4. [Planification (Shifts)](#planification)
5. [Véhicules (Vehicles)](#véhicules)
6. [Utilisateurs (Users)](#utilisateurs)
7. [Stats & Analytics](#stats--analytics)
8. [Codes d'Erreur](#codes-derreur)

---

## 🔐 Authentification

### POST `/auth/register`
**Description**: Créer un nouveau compte utilisateur

**Body**:
```json
{
  "email": "admin@reclamtrack.ma",
  "password": "SecurePass123!",
  "name": "Mohammed Alami",
  "role": "dispatcher"
}
```

**Réponse 201**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f5d3e2a1b2c3d4e5f6g7h8",
    "email": "admin@reclamtrack.ma",
    "name": "Mohammed Alami",
    "role": "dispatcher",
    "createdAt": "2026-02-09T22:00:00.000Z"
  }
}
```

**Erreurs**:
- `400`: Email déjà existant
- `422`: Validation échouée

---

### POST `/auth/login`
**Description**: Connexion utilisateur

**Body**:
```json
{
  "email": "admin@reclamtrack.ma",
  "password": "SecurePass123!"
}
```

**Réponse 200**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f5d3e2a1b2c3d4e5f6g7h8",
    "email": "admin@reclamtrack.ma",
    "role": "dispatcher"
  }
}
```

**Erreurs**:
- `401`: Email ou mot de passe incorrect

---

### POST `/auth/refresh`
**Description**: Rafraîchir le token JWT

**Headers**:
```
Authorization: Bearer <refresh_token>
```

**Réponse 200**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 📝 Réclamations

### GET `/complaints`
**Description**: Liste toutes les réclamations avec pagination

**Query Parameters**:
| Paramètre | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `page` | number | 1 | Numéro de page |
| `limit` | number | 20 | Résultats par page |
| `status` | string | - | Filtrer par statut |
| `priority` | string | - | Filtrer par priorité |
| `category` | string | - | Filtrer par catégorie |
| `search` | string | - | Recherche textuelle |
| `sortBy` | string | createdAt | Champ de tri |
| `order` | string | desc | asc ou desc |

**Exemple**:
```
GET /complaints?page=1&limit=20&status=pending&priority=high
```

**Réponse 200**:
```json
{
  "success": true,
  "data": [
    {
      "id": "64f5d3e2a1b2c3d4e5f6g7h8",
      "ticketId": "CPL-0042",
      "category": "Eau",
      "priority": "high",
      "status": "pending",
      "description": "Fuite d'eau importante Rue Hassan II",
      "location": {
        "address": "Avenue Hassan II, Rabat",
        "coordinates": {
          "lat": 34.0209,
          "lng": -6.8416
        }
      },
      "photos": [
        "https://storage.reclamtrack.ma/photos/abc123.jpg"
      ],
      "reportedBy": {
        "id": "64f5d3e2a1b2c3d4e5f6g7h9",
        "name": "Fatima Zahra",
        "email": "fzahra@email.com"
      },
      "assignedTo": null,
      "createdAt": "2026-02-09T10:30:00.000Z",
      "updatedAt": "2026-02-09T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "pages": 8
  }
}
```

---

### GET `/complaints/:id`
**Description**: Récupérer une réclamation par ID

**Réponse 200**:
```json
{
  "success": true,
  "data": {
    "id": "64f5d3e2a1b2c3d4e5f6g7h8",
    "ticketId": "CPL-0042",
    "category": "Eau",
    "priority": "high",
    "status": "pending",
    "description": "Fuite d'eau importante Rue Hassan II",
    "location": {
      "address": "Avenue Hassan II, Rabat",
      "coordinates": {
        "lat": 34.0209,
        "lng": -6.8416
      }
    },
    "photos": [
      "https://storage.reclamtrack.ma/photos/abc123.jpg"
    ],
    "reportedBy": {
      "id": "64f5d3e2a1b2c3d4e5f6g7h9",
      "name": "Fatima Zahra",
      "email": "fzahra@email.com"
    },
    "assignedTo": null,
    "timeline": [
      {
        "action": "created",
        "timestamp": "2026-02-09T10:30:00.000Z",
        "user": {
          "id": "64f5d3e2a1b2c3d4e5f6g7h9",
          "name": "Fatima Zahra"
        }
      }
    ],
    "createdAt": "2026-02-09T10:30:00.000Z",
    "updatedAt": "2026-02-09T10:30:00.000Z"
  }
}
```

**Erreurs**:
- `404`: Réclamation non trouvée

---

### POST `/complaints`
**Description**: Créer une nouvelle réclamation

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body**:
```json
{
  "category": "Eau",
  "priority": "high",
  "description": "Fuite d'eau importante Rue Hassan II",
  "location": {
    "address": "Avenue Hassan II, Rabat",
    "coordinates": {
      "lat": 34.0209,
      "lng": -6.8416
    }
  },
  "photos": [
    "https://storage.reclamtrack.ma/photos/abc123.jpg"
  ]
}
```

**Réponse 201**:
```json
{
  "success": true,
  "data": {
    "id": "64f5d3e2a1b2c3d4e5f6g7h8",
    "ticketId": "CPL-0042",
    "category": "Eau",
    "priority": "high",
    "status": "pending",
    "description": "Fuite d'eau importante Rue Hassan II",
    "location": {
      "address": "Avenue Hassan II, Rabat",
      "coordinates": {
        "lat": 34.0209,
        "lng": -6.8416
      }
    },
    "photos": [
      "https://storage.reclamtrack.ma/photos/abc123.jpg"
    ],
    "reportedBy": "64f5d3e2a1b2c3d4e5f6g7h9",
    "createdAt": "2026-02-09T10:30:00.000Z"
  }
}
```

**Erreurs**:
- `400`: Données invalides
- `401`: Non authentifié

---

### PATCH `/complaints/:id`
**Description**: Mettre à jour une réclamation

**Body (partiel)**:
```json
{
  "status": "in_progress",
  "priority": "urgent",
  "assignedTo": "64f5d3e2a1b2c3d4e5f6g7h0"
}
```

**Réponse 200**:
```json
{
  "success": true,
  "data": {
    "id": "64f5d3e2a1b2c3d4e5f6g7h8",
    "status": "in_progress",
    "updatedAt": "2026-02-09T11:00:00.000Z"
  }
}
```

**Erreurs**:
- `403`: Permission refusée
- `404`: Réclamation non trouvée

---

### POST `/complaints/:id/assign`
**Description**: Assigner une réclamation à une équipe

**Body**:
```json
{
  "teamId": "64f5d3e2a1b2c3d4e5f6g7h0",
  "priority": "high",
  "notes": "Intervention urgente requise"
}
```

**Réponse 200**:
```json
{
  "success": true,
  "data": {
    "complaint": {
      "id": "64f5d3e2a1b2c3d4e5f6g7h8",
      "status": "assigned",
      "assignedTo": "64f5d3e2a1b2c3d4e5f6g7h0"
    },
    "shift": {
      "id": "64f5d3e2a1b2c3d4e5f6g7h1",
      "complaintId": "64f5d3e2a1b2c3d4e5f6g7h8",
      "teamId": "64f5d3e2a1b2c3d4e5f6g7h0",
      "scheduledAt": "2026-02-09T14:00:00.000Z"
    }
  }
}
```

---

### POST `/complaints/:id/comments`
**Description**: Ajouter un commentaire à une réclamation

**Body**:
```json
{
  "text": "Équipe dépêchée sur site. Réparation en cours.",
  "internal": false
}
```

**Réponse 201**:
```json
{
  "success": true,
  "data": {
    "id": "64f5d3e2a1b2c3d4e5f6g7h2",
    "complaintId": "64f5d3e2a1b2c3d4e5f6g7h8",
    "text": "Équipe dépêchée sur site. Réparation en cours.",
    "author": {
      "id": "64f5d3e2a1b2c3d4e5f6g7h9",
      "name": "Ahmed Bennani"
    },
    "internal": false,
    "createdAt": "2026-02-09T15:00:00.000Z"
  }
}
```

---

### DELETE `/complaints/:id`
**Description**: Supprimer une réclamation (admin uniquement)

**Réponse 200**:
```json
{
  "success": true,
  "message": "Réclamation supprimée avec succès"
}
```

**Erreurs**:
- `403`: Permission refusée (rôle insuffisant)

---

## 👥 Équipes

### GET `/teams`
**Description**: Liste toutes les équipes

**Query Parameters**:
| Paramètre | Type | Description |
|-----------|------|-------------|
| `department` | string | Filtrer par département |
| `status` | string | Filtrer par statut |

**Réponse 200**:
```json
{
  "success": true,
  "data": [
    {
      "id": "64f5d3e2a1b2c3d4e5f6g7h0",
      "name": "Équipe Eau Alpha",
      "department": "water",
      "status": "active",
      "members": [
        {
          "userId": "64f5d3e2a1b2c3d4e5f6g7h3",
          "name": "Youssef Amrani",
          "role": "Technicien Senior",
          "skills": ["plomberie", "détection_fuites"],
          "status": "online"
        },
        {
          "userId": "64f5d3e2a1b2c3d4e5f6g7h4",
          "name": "Khalid Benjelloun",
          "role": "Technicien Junior",
          "skills": ["plomberie"],
          "status": "online"
        }
      ],
      "manager": {
        "id": "64f5d3e2a1b2c3d4e5f6g7h5",
        "name": "Hassan Idrissi"
      },
      "stats": {
        "activeInterventions": 3,
        "completedToday": 7,
        "avgResponseTime": "45min"
      },
      "createdAt": "2025-12-01T00:00:00.000Z"
    }
  ]
}
```

---

### GET `/teams/:id`
**Description**: Détails d'une équipe

**Réponse 200**:
```json
{
  "success": true,
  "data": {
    "id": "64f5d3e2a1b2c3d4e5f6g7h0",
    "name": "Équipe Eau Alpha",
    "department": "water",
    "status": "active",
    "members": [...],
    "manager": {...},
    "equipment": [
      {
        "vehicleId": "VEH-001",
        "type": "truck",
        "status": "in_use"
      }
    ],
    "currentLocation": {
      "lat": 34.0209,
      "lng": -6.8416,
      "lastUpdate": "2026-02-09T16:00:00.000Z"
    },
    "stats": {...}
  }
}
```

---

### POST `/teams`
**Description**: Créer une nouvelle équipe (admin)

**Body**:
```json
{
  "name": "Équipe Électricité Beta",
  "department": "electricity",
  "managerId": "64f5d3e2a1b2c3d4e5f6g7h5",
  "members": [
    {
      "userId": "64f5d3e2a1b2c3d4e5f6g7h6",
      "role": "Électricien Senior",
      "skills": ["haute_tension", "transformateurs"]
    }
  ]
}
```

**Réponse 201**:
```json
{
  "success": true,
  "data": {
    "id": "64f5d3e2a1b2c3d4e5f6g7h7",
    "name": "Équipe Électricité Beta",
    "department": "electricity",
    "members": [...],
    "createdAt": "2026-02-09T16:30:00.000Z"
  }
}
```

---

### PATCH `/teams/:id/members`
**Description**: Ajouter/Retirer des membres

**Body**:
```json
{
  "action": "add",
  "members": [
    {
      "userId": "64f5d3e2a1b2c3d4e5f6g7h8",
      "role": "Technicien",
      "skills": ["réparation_urgence"]
    }
  ]
}
```

**Réponse 200**:
```json
{
  "success": true,
  "data": {
    "id": "64f5d3e2a1b2c3d4e5f6g7h0",
    "members": [...]
  }
}
```

---

## 📅 Planification

### GET `/shifts`
**Description**: Liste des interventions planifiées

**Query Parameters**:
| Paramètre | Type | Description |
|-----------|------|-------------|
| `teamId` | string | Filtrer par équipe |
| `startDate` | ISO Date | Date de début |
| `endDate` | ISO Date | Date de fin |
| `status` | string | Statut du shift |

**Exemple**:
```
GET /shifts?teamId=64f5d3e2a1b2c3d4e5f6g7h0&startDate=2026-02-09T00:00:00Z&endDate=2026-02-09T23:59:59Z
```

**Réponse 200**:
```json
{
  "success": true,
  "data": [
    {
      "id": "64f5d3e2a1b2c3d4e5f6g7h1",
      "teamId": "64f5d3e2a1b2c3d4e5f6g7h0",
      "complaintId": "64f5d3e2a1b2c3d4e5f6g7h8",
      "title": "Réparation Vanne Principale #122",
      "description": "Intervention urgente suite à fuite",
      "type": "emergency",
      "startTime": "2026-02-09T08:30:00.000Z",
      "endTime": "2026-02-09T10:00:00.000Z",
      "status": "completed",
      "assignedStaff": [
        "64f5d3e2a1b2c3d4e5f6g7h3",
        "64f5d3e2a1b2c3d4e5f6g7h4"
      ],
      "createdAt": "2026-02-08T18:00:00.000Z"
    }
  ]
}
```

---

### POST `/shifts`
**Description**: Créer une nouvelle intervention

**Body**:
```json
{
  "teamId": "64f5d3e2a1b2c3d4e5f6g7h0",
  "complaintId": "64f5d3e2a1b2c3d4e5f6g7h8",
  "title": "Inspection Transformateur",
  "type": "maintenance",
  "startTime": "2026-02-10T09:00:00.000Z",
  "endTime": "2026-02-10T11:00:00.000Z",
  "assignedStaff": [
    "64f5d3e2a1b2c3d4e5f6g7h3"
  ]
}
```

**Réponse 201**:
```json
{
  "success": true,
  "data": {
    "id": "64f5d3e2a1b2c3d4e5f6g7h9",
    "teamId": "64f5d3e2a1b2c3d4e5f6g7h0",
    "title": "Inspection Transformateur",
    "status": "scheduled",
    "conflicts": []
  }
}
```

**Erreurs**:
- `409`: Conflit de planning détecté (membre déjà assigné)

---

### PATCH `/shifts/:id`
**Description**: Modifier un shift (déplacer, réassigner)

**Body**:
```json
{
  "startTime": "2026-02-10T10:00:00.000Z",
  "endTime": "2026-02-10T12:00:00.000Z",
  "teamId": "64f5d3e2a1b2c3d4e5f6g7h1"
}
```

**Réponse 200**:
```json
{
  "success": true,
  "data": {
    "id": "64f5d3e2a1b2c3d4e5f6g7h9",
    "startTime": "2026-02-10T10:00:00.000Z",
    "conflicts": [
      {
        "type": "staff_overlap",
        "userId": "64f5d3e2a1b2c3d4e5f6g7h3",
        "message": "Youssef Amrani déjà assigné à shift#123"
      }
    ]
  }
}
```

---

## 🚗 Véhicules

### GET `/vehicles`
**Description**: Liste des véhicules

**Réponse 200**:
```json
{
  "success": true,
  "data": [
    {
      "id": "64f5d3e2a1b2c3d4e5f6g7h10",
      "vehicleId": "VEH-001",
      "type": "truck",
      "department": "water",
      "status": "in_use",
      "fuelLevel": 75,
      "mileage": 45230,
      "lastMaintenance": "2026-01-15T00:00:00.000Z",
      "nextMaintenance": "2026-04-15T00:00:00.000Z",
      "assignedTo": {
        "teamId": "64f5d3e2a1b2c3d4e5f6g7h0",
        "teamName": "Équipe Eau Alpha"
      }
    }
  ]
}
```

---

## 📊 Stats & Analytics

### GET `/stats/dashboard`
**Description**: Statistiques pour le dashboard

**Réponse 200**:
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalComplaints": 1247,
      "activeComplaints": 156,
      "resolvedToday": 42,
      "avgResolutionTime": "2.3 jours"
    },
    "byPriority": {
      "urgent": 12,
      "high": 45,
      "medium": 67,
      "low": 32
    },
    "byCategory": {
      "Eau": 85,
      "Électricité": 34,
      "Routes": 23,
      "Éclairage": 14
    },
    "trends": {
      "last7Days": [
        { "date": "2026-02-03", "count": 18 },
        { "date": "2026-02-04", "count": 22 },
        { "date": "2026-02-05", "count": 19 },
        { "date": "2026-02-06", "count": 25 },
        { "date": "2026-02-07", "count": 21 },
        { "date": "2026-02-08", "count": 24 },
        { "date": "2026-02-09", "count": 27 }
      ]
    },
    "teamPerformance": [
      {
        "teamId": "64f5d3e2a1b2c3d4e5f6g7h0",
        "name": "Équipe Eau Alpha",
        "resolved": 67,
        "avgTime": "1.8 jours",
        "rating": 4.7
      }
    ]
  }
}
```

---

## ❌ Codes d'Erreur

| Code | Message | Description |
|------|---------|-------------|
| 200 | OK | Succès |
| 201 | Created | Ressource créée |
| 400 | Bad Request | Requête invalide |
| 401 | Unauthorized | Non authentifié |
| 403 | Forbidden | Permission refusée |
| 404 | Not Found | Ressource non trouvée |
| 409 | Conflict | Conflit (ex: doublon) |
| 422 | Unprocessable Entity | Validation échouée |
| 429 | Too Many Requests | Rate limit dépassé |
| 500 | Internal Server Error | Erreur serveur |
| 503 | Service Unavailable | Service temporairement indisponible |

---

## 🔒 Authentification

Toutes les routes (sauf `/auth/*`) nécessitent un token JWT dans le header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📌 Rate Limiting

- **Limite générale**: 100 requêtes / 15 min par IP
- **Auth endpoint**: 5 requêtes / 15 min
- **Upload endpoint**: 10 requêtes / 15 min

---

## 🌐 CORS

Origines autorisées:
- `http://localhost:3000`
- `http://localhost:3001`
- `https://reclamtrack.ma`

---

## 📝 Webhooks (Future)

Les événements suivants pourront déclencher des webhooks:

- `complaint.created`
- `complaint.assigned`
- `complaint.resolved`
- `shift.conflict_detected`

---

**Dernière mise à jour**: 9 Février 2026  
**Contact**: support@reclamtrack.ma
