# Améliorations Recommandées ReclamTrack

> **Analyse des Fonctionnalités Avancées**  
> **Date**: 9 Février 2026  
> **Priorité**: Guide d'implémentation progressive

---

## 🎯 Vision d'Amélioration

Cette documentation détaille les 5 améliorations majeures recommandées pour faire passer ReclamTrack d'une solution basique à une **plateforme intelligente de nouvelle génération**.

---

## 1. 📱 Notifications Push Mobile (FCM)

### 🎯 Objectif
Permettre aux équipes de terrain de recevoir des alertes même quand l'application est en arrière-plan.

### 📊 Impact Estimé
- **Temps de réponse**: -40% (notifications instantanées)
- **Satisfaction équipes**: +50% (alertes fiables)
- **Taux de résolution urgences**: +35%

### 🛠️ Stack Technique
- **Firebase Cloud Messaging** (FCM)
- **Service Worker** pour notifications web
- **Push API** native iOS/Android

### 📋 Plan d'Implémentation

#### Phase 1: Configuration Firebase (1 jour)
```bash
# Installation
npm install firebase
npm install firebase-admin  # Backend

# Configuration
firebase init
```

**Configuration Frontend** (`frontend/src/lib/firebase.ts`):
```typescript
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
      });
      
      // Envoyer le token au backend
      await fetch('/api/users/fcm-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      
      return token;
    }
  } catch (error) {
    console.error('Erreur FCM:', error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
```

#### Phase 2: Service Worker (1 jour)
**Fichier** `public/firebase-messaging-sw.js`:
```javascript
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Background message:', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/notification-icon.png',
    badge: '/icons/badge-icon.png',
    data: payload.data,
    actions: [
      { action: 'open', title: 'Voir détails' },
      { action: 'dismiss', title: 'Fermer' }
    ]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
```

#### Phase 3: Backend Integration (2 jours)
**Fichier** `backend/src/services/pushNotificationService.ts`:
```typescript
import admin from 'firebase-admin';
import serviceAccount from '../../config/firebase-service-account.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

export class PushNotificationService {
  static async sendToUser(userId: string, notification: {
    title: string;
    body: string;
    data?: any;
  }) {
    try {
      const user = await User.findById(userId);
      if (!user?.fcmToken) {
        console.log(`Utilisateur ${userId} n'a pas de FCM token`);
        return null;
      }

      const message = {
        notification: {
          title: notification.title,
          body: notification.body
        },
        data: notification.data || {},
        token: user.fcmToken
      };

      const response = await admin.messaging().send(message);
      console.log('Notification envoyée:', response);
      return response;
    } catch (error) {
      console.error('Erreur envoi notification:', error);
      throw error;
    }
  }

  static async sendToTeam(teamId: string, notification: any) {
    const team = await Team.findById(teamId).populate('members.userId');
    const tokens = team.members
      .map(m => m.userId.fcmToken)
      .filter(Boolean);

    if (tokens.length === 0) {
      console.log(`Aucun token pour l'équipe ${teamId}`);
      return;
    }

    const message = {
      notification: {
        title: notification.title,
        body: notification.body
      },
      data: notification.data || {},
      tokens
    };

    const response = await admin.messaging().sendMulticast(message);
    console.log(`${response.successCount} notifications envoyées à l'équipe`);
    return response;
  }

  static async sendToRole(role: string, notification: any) {
    const users = await User.find({ role, fcmToken: { $exists: true } });
    const tokens = users.map(u => u.fcmToken).filter(Boolean);

    if (tokens.length === 0) return;

    const message = {
      notification: {
        title: notification.title,
        body: notification.body
      },
      tokens
    };

    return await admin.messaging().sendMulticast(message);
  }
}
```

#### Phase 4: Intégration Événements (1 jour)
```typescript
// Quand une réclamation urgente est créée
await PushNotificationService.sendToRole('dispatcher', {
  title: '🚨 Réclamation Urgente',
  body: `${complaint.category} - ${complaint.location.address}`,
  data: { complaintId: complaint.id, type: 'urgent_complaint' }
});

// Quand une équipe est assignée
await PushNotificationService.sendToTeam(teamId, {
  title: '📋 Nouvelle Intervention',
  body: `Vous êtes assigné à ${complaint.ticketId}`,
  data: { complaintId: complaint.id, shiftId: shift.id }
});
```

### ✅ Livrables
- [ ] Configuration Firebase complète
- [ ] Service Worker fonctionnel
- [ ] Backend service notifications
- [ ] Tests iOS + Android
- [ ] Documentation utilisateur

### 💰 Coût / ROI
- **Coût**: Gratuit jusqu'à 10M messages/mois (Firebase)
- **Temps dev**: 5 jours
- **ROI**: Réduction 40% temps de réponse = 15k€/an économisés

---

## 2. 🤖 Assistant IA Classification Automatique

### 🎯 Objectif
Automatiser la catégorisation et priorisation des réclamations grâce à l'IA.

### 📊 Impact Estimé
- **Temps traitement initial**: -70%
- **Précision catégorisation**: 95%+
- **Satisfaction citoyens**: +25% (réponse rapide)

### 🛠️ Stack Technique
- **OpenAI GPT-3.5-turbo** (classification)
- **Function Calling** (extraction structurée)
- **Embedding** pour similarité

### 📋 Plan d'Implémentation

#### Phase 1: Configuration OpenAI (0.5 jour)
```bash
npm install openai
```

**Configuration** (`backend/src/config/openai.ts`):
```typescript
import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID
});
```

#### Phase 2: Service IA (2 jours)
**Fichier** `backend/src/services/aiService.ts`:
```typescript
import { openai } from '../config/openai';
import { Complaint } from '../models/Complaint';

interface ComplaintClassification {
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  urgencyScore: number;
  suggestedTeam?: string;
  estimatedDuration?: string;
  reasoning: string;
}

export class AIService {
  /**
   * Classifie automatiquement une réclamation
   */
  static async classifyComplaint(description: string, photos?: string[]): Promise<ComplaintClassification> {
    const systemPrompt = `Tu es un expert en services municipaux marocains. 
Classifie les réclamations citoyennes en catégories précises et détermine leur priorité.

Catégories valides:
- Eau (fuites, coupures, qualité)
- Électricité (pannes, câbles dangereux)
- Routes (nids de poule, chaussée endommagée)
- Éclairage Public (lampadaires cassés)
- Assainissement (égouts bouchés)
- Déchets (collecte, dépôts sauvages)
- Espaces Verts (arbres dangereux, entretien)

Priorités:
- urgent: Danger immédiat (fuite gaz, câble électrique exposé)
- high: Impact important (route bloquée, coupure eau quartier)
- medium: Gêne significative (lampadaire cassé, nid de poule)
- low: Entretien courant (bordure abîmée, herbe haute)

Réponds en JSON avec: category, priority, urgencyScore (0-100), suggestedTeam, estimatedDuration, reasoning.`;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: description }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      
      // Validation et normalisation
      return {
        category: this.normalizeCategory(result.category),
        priority: this.normalizePriority(result.priority),
        urgencyScore: result.urgencyScore || 50,
        suggestedTeam: result.suggestedTeam,
        estimatedDuration: result.estimatedDuration,
        reasoning: result.reasoning || 'Classification automatique'
      };
    } catch (error) {
      console.error('Erreur classification IA:', error);
      // Fallback: classification par défaut
      return {
        category: 'Autre',
        priority: 'medium',
        urgencyScore: 50,
        reasoning: 'Erreur IA - classification manuelle requise'
      };
    }
  }

  /**
   * Génère une réponse automatique au citoyen
   */
  static async generateCitizenResponse(complaint: any): Promise<string> {
    const prompt = `Génère une réponse professionnelle et empathique pour confirmer la réception d'une réclamation.

Réclamation: ${complaint.description}
Catégorie: ${complaint.category}
ID: ${complaint.ticketId}

La réponse doit:
- Remercier le citoyen
- Confirmer la prise en charge
- Donner un délai indicatif
- Être en français formel`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
      temperature: 0.7
    });

    return completion.choices[0].message.content || '';
  }

  /**
   * Détecte les réclamations similaires (éviter doublons)
   */
  static async findSimilarComplaints(description: string): Promise<any[]> {
    // Générer embedding du texte
    const embedding = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: description
    });

    const vector = embedding.data[0].embedding;

    // Recherche vectorielle dans MongoDB (nécessite Atlas Search)
    const similar = await Complaint.aggregate([
      {
        $vectorSearch: {
          queryVector: vector,
          path: "descriptionEmbedding",
          numCandidates: 100,
          limit: 5,
          index: "complaint_embeddings"
        }
      },
      {
        $project: {
          ticketId: 1,
          description: 1,
          status: 1,
          score: { $meta: "vectorSearchScore" }
        }
      }
    ]);

    return similar.filter(s => s.score > 0.85); // 85% similarité
  }

  /**
   * Extraction d'entités (adresses, dates, noms)
   */
  static async extractEntities(text: string) {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [{
        role: "user",
        content: `Extrais les informations suivantes de ce texte en JSON:
- address (adresse complète)
- landmark (point de repère proche)
- dateObserved (date d'observation si mentionnée)
- contactInfo (numéro de téléphone si présent)

Texte: ${text}`
      }],
      response_format: { type: "json_object" }
    });

    return JSON.parse(completion.choices[0].message.content || '{}');
  }

  // Helpers de normalisation
  private static normalizeCategory(category: string): string {
    const mapping: Record<string, string> = {
      'eau': 'Eau',
      'water': 'Eau',
      'electricité': 'Électricité',
      'electricity': 'Électricité',
      'routes': 'Routes',
      'road': 'Routes',
      // ... autres mappings
    };
    return mapping[category.toLowerCase()] || category;
  }

  private static normalizePriority(priority: string): 'low' | 'medium' | 'high' | 'urgent' {
    const mapping: Record<string, any> = {
      'low': 'low',
      'medium': 'medium',
      'high': 'high',
      'urgent': 'urgent',
      'faible': 'low',
      'moyenne': 'medium',
      'élevée': 'high',
      'urgence': 'urgent'
    };
    return mapping[priority.toLowerCase()] || 'medium';
  }
}
```

#### Phase 3: Intégration Controller (1 jour)
**Fichier** `backend/src/controllers/complaintController.ts`:
```typescript
import { AIService } from '../services/aiService';
import { PushNotificationService } from '../services/pushNotificationService';

export const createComplaint = async (req: Request, res: Response) => {
  try {
    const { description, location, photos } = req.body;

    // 1. Classification IA automatique
    const classification = await AIService.classifyComplaint(description, photos);
    
    // 2. Vérifier doublons
    const similar = await AIService.findSimilarComplaints(description);
    if (similar.length > 0) {
      return res.status(409).json({
        error: 'Réclamation similaire existante',
        similar: similar.map(s => ({
          ticketId: s.ticketId,
          status: s.status
        }))
      });
    }

    // 3. Extraction entités (adresse, etc.)
    const entities = await AIService.extractEntities(description);

    // 4. Créer la réclamation
    const complaint = await Complaint.create({
      description,
      category: classification.category,
      priority: classification.priority,
      urgencyScore: classification.urgencyScore,
      location: {
        ...location,
        address: entities.address || location.address,
        landmark: entities.landmark
      },
      photos,
      reportedBy: req.user.id,
      aiClassified: true,
      aiReasoning: classification.reasoning
    });

    // 5. Générer réponse automatique
    const autoResponse = await AIService.generateCitizenResponse(complaint);
    
    // 6. Notifier dispatchers si urgence élevée
    if (classification.priority === 'urgent') {
      await PushNotificationService.sendToRole('dispatcher', {
        title: '🚨 Réclamation URGENTE',
        body: `${classification.category} - Score: ${classification.urgencyScore}`,
        data: { complaintId: complaint.id }
      });
    }

    res.status(201).json({
      complaint,
      classification,
      autoResponse,
      similar: similar.length > 0 ? similar : undefined
    });
  } catch (error) {
    console.error('Erreur création réclamation:', error);
    res.status(500).json({ error: error.message });
  }
};
```

#### Phase 4: Interface Utilisateur (1 jour)
**Composant** `frontend/src/components/AIClassificationIndicator.tsx`:
```typescript
'use client';

import { CheckCircle, Brain, AlertTriangle } from 'lucide-react';

interface Props {
  classification: {
    category: string;
    priority: string;
    urgencyScore: number;
    reasoning: string;
  };
  onOverride?: () => void;
}

export const AIClassificationIndicator = ({ classification, onOverride }: Props) => {
  const confidenceColor = classification.urgencyScore > 80 ? 'text-red-600' : 
                          classification.urgencyScore > 50 ? 'text-orange-500' :
                          'text-green-600';

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-3">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
          <Brain className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            Classification Automatique par IA
            <CheckCircle className="w-4 h-4 text-green-600" />
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {classification.reasoning}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase">Catégorie</p>
          <p className="font-bold text-sm">{classification.category}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase">Priorité</p>
          <p className={`font-bold text-sm capitalize ${confidenceColor}`}>
            {classification.priority}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase">Confiance</p>
          <p className={`font-bold text-sm ${confidenceColor}`}>
            {classification.urgencyScore}%
          </p>
        </div>
      </div>

      {classification.urgencyScore < 70 && (
        <div className="flex items-center gap-2 text-xs text-orange-600 dark:text-orange-400">
          <AlertTriangle className="w-4 h-4" />
          <span>Confiance faible - Vérification manuelle recommandée</span>
        </div>
      )}

      {onOverride && (
        <button 
          onClick={onOverride}
          className="w-full text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          Modifier la classification
        </button>
      )}
    </div>
  );
};
```

### ✅ Livrables
- [x] Service IA complet
- [ ] Tests unitaires (95%+ précision)
- [ ] Interface UI avec indicateur confiance
- [ ] Documentation prompts
- [ ] Monitoring performance IA

### 💰 Coût / ROI
- **Coût OpenAI**: ~50€/mois (estimé 1000 réclamations/mois)
- **Temps dev**: 5 jours
- **ROI**: Économie 20h/semaine agent = 40k€/an

---

## 3. 📊 Système de Prédiction d'Incidents

### 🎯 Objectif
Anticiper les zones à risque pour déploiement proactif des équipes.

### 📋 Données Requises
- Historique incidents (3+ ans)
- Données météo (API OpenWeatherMap)
- Calendrier (saison, jours fériés)
- Topographie (pentes, zones inondables)

### 🛠️ Stack Technique
- **TensorFlow.js** (modèle prédictif)
- **Python** (entraînement modèle)
- **MongoDB Time Series** (stockage données)

### 📋 Plan d'Implémentation

#### Phase 1: Collecte de Données (1 semaine)
```typescript
// backend/src/services/dataCollectionService.ts
export class DataCollectionService {
  async collectHistoricalData(startDate: Date, endDate: Date) {
    const complaints = await Complaint.find({
      createdAt: { $gte: startDate, $lte: endDate }
    }).lean();

    return complaints.map(c => ({
      date: c.createdAt,
      category: c.category,
      location: c.location.coordinates,
      priority: c.priority,
      resolutionTime: this.calculateResolutionTime(c),
      weatherConditions: await this.getWeatherData(c.createdAt, c.location)
    }));
  }

  async getWeatherData(date: Date, location: { lat: number, lng: number }) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${location.lat}&lon=${location.lng}&dt=${Math.floor(date.getTime() / 1000)}&appid=${process.env.OPENWEATHER_API_KEY}`
    );
    return response.json();
  }
}
```

#### Phase 2: Entraînement Modèle (2 semaines)
**Script Python** `ml/train_prediction_model.py`:
```python
import tensorflow as tf
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

# Charger données
data = pd.read_csv('historical_complaints.csv')

# Features engineering
features = pd.DataFrame({
    'temperature': data['temperature'],
    'humidity': data['humidity'],
    'day_of_week': data['date'].dt.dayofweek,
    'month': data['date'].dt.month,
    'hour': data['date'].dt.hour,
    'zone_history': data['zone_incident_count_30d'],
    'season': data['season'].map({'winter': 0, 'spring': 1, 'summer': 2, 'fall': 3})
})

target = data['incident_occurred']

X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2)

# Modèle
model = tf.keras.Sequential([
    tf.keras.layers.Dense(64, activation='relu', input_shape=(features.shape[1],)),
    tf.keras.layers.Dropout(0.3),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(16, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy', 'precision', 'recall']
)

history = model.fit(
    X_train, y_train,
    validation_data=(X_test, y_test),
    epochs=50,
    batch_size=32
)

# Sauvegarder modèle
model.save('models/incident_prediction_model.h5')
```

#### Phase 3: Intégration Backend (1 semaine)
```typescript
import * as tf from '@tensorflow/tfjs-node';

export class PredictionService {
  private model: tf.LayersModel | null = null;

  async initialize() {
    this.model = await tf.loadLayersModel('file://./models/incident-prediction/model.json');
  }

  async predictHotspots(date: Date): Promise<HotspotPrediction[]> {
    const weather = await this.getWeatherForecast(date);
    const zones = await Zone.find();

    const predictions = await Promise.all(
      zones.map(async (zone) => {
        const historical = await this.getZoneHistory(zone.id, 30);
        
        const features = tf.tensor2d([[
          weather.temperature,
          weather.humidity,
          date.getDay(),
          date.getMonth() + 1,
          date.getHours(),
          historical.incidentCount,
          this.getSeason(date)
        ]]);

        const prediction = this.model!.predict(features) as tf.Tensor;
        const probability = (await prediction.data())[0];

        return {
          zoneId: zone.id,
          zoneName: zone.name,
          riskProbability: probability,
          riskLevel: this.getRiskLevel(probability),
          recommendedAction: this.getRecommendation(probability),
          factors: {
            weather: weather.description,
            historicalIncidents: historical.incidentCount,
            season: this.getSeason(date)
          }
        };
      })
    );

    return predictions.sort((a, b) => b.riskProbability - a.riskProbability);
  }

  private getRiskLevel(prob: number): 'low' | 'medium' | 'high' | 'critical' {
    if (prob > 0.8) return 'critical';
    if (prob > 0.6) return 'high';
    if (prob > 0.4) return 'medium';
    return 'low';
  }

  private getRecommendation(prob: number): string {
    if (prob > 0.8) return 'Déploiement équipe en prévention recommandé';
    if (prob > 0.6) return 'Surveillance accrue nécessaire';
    if (prob > 0.4) return 'Préparer équipe en standby';
    return 'Aucune action particulière';
  }
}
```

### ✅ Livrables
- [ ] Modèle entraîné (accuracy > 75%)
- [ ] Service de prédiction temps réel
- [ ] Dashboard analytics prédictifs
- [ ] Alertes automatiques dispatchers

### 💰 Coût / ROI
- **Temps dev**: 4 semaines (incluant ML)
- **ROI**: Réduction incidents 20% = 60k€/an

---

## 4. 📱 Application Mobile React Native

### 🎯 Objectif
App native iOS/Android pour techniciens terrain.

### 📋 Fonctionnalités Mobiles Spécifiques
- Géolocalisation GPS continue
- Mode hors ligne avec sync
- Capture photo/vidéo native
- Appels téléphoniques directs
- Navigation GPS vers intervention

### 📋 Plan d'Implémentation

#### Phase 1: Setup Projet (3 jours)
```bash
npx react-native init ReclamTrackMobile --template react-native-template-typescript
cd ReclamTrackMobile
npm install @react-navigation/native @react-navigation/stack
npm install react-native-maps react-native-geolocation-service
npm install @react-native-async-storage/async-storage
npm install axios react-query
```

#### Phase 2: Code Partagé (1 semaine)
**Structure**:
```
shared/
├── types/
│   └── complaint.types.ts
├── services/
│   ├── api.ts           # Client API réutilisé
│   └── storage.ts       # Abstraction storage
└── utils/
    └── validation.ts
```

#### Phase 3: Screens Mobile (2 semaines)
**Exemple** `screens/ComplaintDetailScreen.tsx`:
```typescript
import React from 'react';
import { View, Text, Image, Button, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useComplaint } from '@/hooks/useComplaint';

export const ComplaintDetailScreen = ({ route }) => {
  const { complaintId } = route.params;
  const { data: complaint, isLoading } = useComplaint(complaintId);

  const handleNavigate = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${complaint.location.coordinates.lat},${complaint.location.coordinates.lng}`;
    Linking.openURL(url);
  };

  const handleCallCitizen = () => {
    Linking.openURL(`tel:${complaint.reportedBy.phone}`);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.ticketId}>{complaint.ticketId}</Text>
        <StatusBadge status={complaint.status} />
      </View>

      <MapView 
        style={styles.map}
        initialRegion={{
          latitude: complaint.location.coordinates.lat,
          longitude: complaint.location.coordinates.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        <Marker coordinate={complaint.location.coordinates} />
      </MapView>

      <View style={styles.actions}>
        <Button title="Naviguer" onPress={handleNavigate} />
        <Button title="Appeler citoyen" onPress={handleCallCitizen} />
        <Button title="Commencer intervention" onPress={handleStart} />
      </View>

      <PhotoGallery photos={complaint.photos} />
    </ScrollView>
  );
};
```

### ✅ Livrables
- [ ] App iOS build (TestFlight)
- [ ] App Android build (Play Store Beta)
- [ ] Documentation installation
- [ ] Formation utilisateurs

### 💰 Coût / ROI
- **Temps dev**: 6 semaines
- **ROI**: +30% productivité terrain = 50k€/an

---

## 5. 🎯 Gamification pour Équipes

### 🎯 Objectif
Motiver les techniciens par système de points et badges.

### 📋 Système de Points
| Action | Points |
|--------|--------|
| Résolution réclamation | 10-50 (selon priorité) |
| Feedback positif citoyen | 20 |
| Résolution < délai prévu | +25% bonus |
| Innovation/suggestion | 100 |
| Formation collègue | 30 |

### 📋 Plan d'Implémentation

#### Phase 1: Modèle de Données (1 jour)
```typescript
// backend/src/models/Achievement.ts
interface Achievement {
  id: string;
  userId: string;
  type: 'fast_resolution' | 'quality_work' | 'team_player' | 'innovation';
  points: number;
  badge: BadgeType;
  earnedAt: Date;
  description: string;
  metadata?: any;
}

interface UserStats {
  userId: string;
  totalPoints: number;
  level: number;
  badges: BadgeType[];
  streak: number; // jours consécutifs actifs
  ranking: number;
  monthlyPoints: number;
}

enum BadgeType {
  LIGHTNING = 'lightning',         // Résolution rapide
  STAR = 'star',                   // Excellente qualité
  HEART = 'heart',                 // Feedback citoyen positif
  FLAME = 'flame',                 // Série de 7 jours
  TROPHY = 'trophy',               // Top 3 mensuel
  DIAMOND = 'diamond'              // 1000+ points
}
```

#### Phase 2: Service Gamification (2 jours)
```typescript
export class GamificationService {
  static async awardPoints(userId: string, action: string, metadata?: any) {
    const points = this.calculatePoints(action, metadata);
    const badge = await this.checkBadgeEligibility(userId, action, points);

    const achievement = await Achievement.create({
      userId,
      type: this.getActionType(action),
      points,
      badge,
      description: this.getDescription(action, metadata),
      metadata,
      earnedAt: new Date()
    });

    await UserStats.updateOne(
      { userId },
      { 
        $inc: { totalPoints: points, monthlyPoints: points },
        $addToSet: { badges: badge }
      },
      { upsert: true }
    );

    // Vérifier level up
    await this.checkLevelUp(userId);

    // Notification badge
    if (badge) {
      await PushNotificationService.sendToUser(userId, {
        title: '🏆 Nouveau Badge !',
        body: `Vous avez débloqué le badge ${badge}!`,
        data: { achievementId: achievement.id }
      });
    }

    return achievement;
  }

  static async getLeaderboard(period: 'daily' | 'weekly' | 'monthly' | 'allTime', limit = 10) {
    const match = period === 'allTime' ? {} : {
      earnedAt: { 
        $gte: this.getPeriodStart(period) 
      }
    };

    const leaderboard = await Achievement.aggregate([
      { $match: match },
      { 
        $group: {
          _id: '$userId',
          totalPoints: { $sum: '$points' },
          badgesCount: { $sum: 1 }
        }
      },
      { $sort: { totalPoints: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          userId: '$_id',
          name: '$user.name',
          avatar: '$user.avatar',
          team: '$user.team',
          totalPoints: 1,
          badgesCount: 1
        }
      }
    ]);

    return leaderboard.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
  }

  private static calculatePoints(action: string, metadata?: any): number {
    const basePoints: Record<string, number> = {
      'resolve_complaint': 10,
      'positive_feedback': 20,
      'help_colleague': 15,
      'innovation': 100
    };

    let points = basePoints[action] || 10;

    // Bonus multiplicateurs
    if (metadata?.priority === 'urgent') points *= 5;
    if (metadata?.priority === 'high') points *= 3;
    if (metadata?.underEstimate) points *= 1.25; // Terminé avant délai

    return Math.floor(points);
  }

  private static async checkBadgeEligibility(userId: string, action: string, points: number): Promise<BadgeType | null> {
    const stats = await UserStats.findOne({ userId });
    
    // Badge série 7 jours
    if (stats.streak >= 7 && !stats.badges.includes(BadgeType.FLAME)) {
      return BadgeType.FLAME;
    }

    // Badge 1000 points
    if (stats.totalPoints + points >= 1000 && !stats.badges.includes(BadgeType.DIAMOND)) {
      return BadgeType.DIAMOND;
    }

    // Badge top 3 mensuel
    const leaderboard = await this.getLeaderboard('monthly', 3);
    if (leaderboard.find(l => l.userId === userId) && !stats.badges.includes(BadgeType.TROPHY)) {
      return BadgeType.TROPHY;
    }

    return null;
  }
}
```

#### Phase 3: Interface Leaderboard (2 jours)
```typescript
// frontend/src/app/leaderboard/page.tsx
'use client';

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'allTime'>('monthly');
  const { data: leaderboard, isLoading } = useLeaderboard(period);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">🏆 Classement</h1>
        <PeriodSelector value={period} onChange={setPeriod} />
      </div>

      {leaderboard?.map((entry, index) => (
        <div 
          key={entry.userId}
          className={cn(
            "flex items-center gap-4 p-4 rounded-lg",
            index < 3 ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300" : "bg-white border border-gray-200"
          )}
        >
          <div className="text-2xl font-bold w-12 text-center">
            {index === 0 && '🥇'}
            {index === 1 && '🥈'}
            {index === 2 && '🥉'}
            {index > 2 && `#${index + 1}`}
          </div>

          <img 
            src={entry.avatar || '/default-avatar.png'}
            alt={entry.name}
            className="w-12 h-12 rounded-full"
          />

          <div className="flex-1">
            <h3 className="font-semibold">{entry.name}</h3>
            <p className="text-sm text-gray-500">{entry.team}</p>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">{entry.totalPoints}</p>
            <p className="text-xs text-gray-500">{entry.badgesCount} badges</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### ✅ Livrables
- [ ] Système de points opérationnel
- [ ] 10+ badges définis
- [ ] Leaderboard temps réel
- [ ] Notifications badges
- [ ] Widget dashboard personnel

### 💰 Coût / ROI
- **Temps dev**: 1 semaine
- **ROI**: +25% engagement = meilleure rétention

---

## 📅 PLAN DE DÉPLOIEMENT PROGRESSIF

### 🗓️ Semaines 1-2: Base IA
- [x] Configuration OpenAI
- [ ] Service classification IA
- [ ] Tests précision
- [ ] Interface UI
- **MVP**: Classification auto 80%+ précision

### 🗓️ Semaines 3-4: Notifications Push
- [ ] Configuration Firebase
- [ ] Service Worker
- [ ] Backend integration
- [ ] Tests iOS/Android
- **MVP**: Push notifications fonctionnelles

### 🗓️ Semaines 5-8: Prédiction & Mobile
- [ ] Collecte données historiques
- [ ] Entraînement modèle ML
- [ ] Service prédiction
- [ ] Setup React Native
- **MVP**: Prédictions zones à risque + App mobile beta

### 🗓️ Semaines 9-10: Gamification
- [ ] Modèles données
- [ ] Service gamification
- [ ] Leaderboard UI
- [ ] Badges système
- **MVP**: Gamification complète

---

## 🎯 PRIORISATION RECOMMANDÉE

1. **🤖 IA Classification** (Semaines 1-2) - Impact immédiat
2. **📱 Push Notifications** (Semaines 3-4) - Amélioration UX critique
3. **🎯 Gamification** (Semaines 5-6) - Motivation équipes
4. **📊 Prédiction** (Semaines 7-10) - Innovation long terme
5. **📱 Mobile Native** (Semaines 11-16) - Extension plateforme

---

## 💡 MÉTRIQUES DE SUCCÈS

### IA Classification
- ✅ Précision > 90%
- ✅ Temps traitement < 2s
- ✅ Adoption > 95% (pas de override manuel)

### Push Notifications
- ✅ Delivery rate > 98%
- ✅ Temps réponse moyen -40%
- ✅ Engagement +50%

### Prédiction
- ✅ Accuracy > 75%
- ✅ False positives < 15%
- ✅ Incidents prévenus: 20%+

### Mobile
- ✅ App Store rating > 4.5/5
- ✅ Daily Active Users > 80%
- ✅ Crash rate < 1%

### Gamification
- ✅ Participation > 90%
- ✅ Retention +25%
- ✅ Performance +20%

---

**Document créé**: 9 Février 2026  
**Prochaine révision**: 1 Mars 2026  
**Owner**: Équipe Produit ReclamTrack
