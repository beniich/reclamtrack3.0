# 🤖 Guide de Démarrage - IA de Classification ReclamTrack

> **Implémentation Complète de l'Assistant IA**  
> **Date**: 9 Février 2026  
> **Statut**: ✅ PRÊT À TESTER

---

## 📋 Résumé de l'Implémentation

### ✅ Fichiers Créés (Backend)
- `backend/src/config/openai.ts` - Configuration OpenAI
- `backend/src/services/aiService.ts` - Service IA complet
- `backend/src/controllers/aiController.ts` - Controller API
- `backend/src/routes/ai.ts` - Routes API
- `backend/.env.example` - Variables d'environnement

### ✅ Fichiers Créés (Frontend)
- `frontend/src/hooks/useAI.ts` - Hook React pour IA
- `frontend/src/components/AI/ClassificationBadge.tsx` - Badge de classification
- `frontend/src/components/AI/SuggestedActions.tsx` - Actions suggérées
- `frontend/src/components/AIClassificationIndicator.tsx` - Indicateur complet (déjà existant)

### ✅ Modifications
- `backend/src/index.ts` - Ajout route `/api/ai`
- `backend/.env.example` - Ajout config OpenAI

---

## 🚀 ÉTAPE 1: Configuration OpenAI

### 1.1 Obtenir une Clé API OpenAI

1. **Créer un compte** sur [platform.openai.com](https://platform.openai.com)
2. **Générer une clé API** :
   - Aller dans `API Keys` → `Create new secret key`
   - Copier la clé (commence par `sk-proj-...`)
   - ⚠️ **IMPORTANT**: Sauvegarder immédiatement, elle ne sera plus affichée

### 1.2 Configurer les Variables d'Environnement

**Fichier**: `backend/.env`

Ajouter ces lignes :
```env
# OpenAI Configuration
OPENAI_API_KEY=sk-proj-VOTRE_CLEF_API_ICI
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_TEMPERATURE=0.3

# IA Settings
AI_AUTO_CLASSIFY=true
AI_FALLBACK_ENABLED=true
```

**Remplacer** `sk-proj-VOTRE_CLEF_API_ICI` par votre vraie clé.

---

## 🧪 ÉTAPE 2: Test de Connexion à l'IA

### 2.1 Démarrer le Backend

```bash
cd backend
npm run dev
```

Le serveur devrait démarrer sur `http://localhost:5001` (ou le port défini).

### 2.2 Tester le Health Check

**Avec curl** :
```bash
curl http://localhost:5001/api/ai/health
```

**Avec PowerShell** :
```powershell
Invoke-WebRequest -Uri "http://localhost:5001/api/ai/health" | Select-Object -ExpandProperty Content
```

**Réponse attendue** :
```json
{
  "success": true,
  "message": "Service IA opérationnel",
  "testResult": {
    "category": "Eau",
    "subcategory": "Fuite",
    "priority": "urgent",
    "urgencyScore": 95,
    "confidence": 90,
    "suggestedActions": [
      "Envoyer technicien d'urgence",
      "Couper l'alimentation en eau si nécessaire"
    ],
    "estimatedResolutionTime": 2,
    "departmentsInvolved": ["Eau", "Sécurité"]
  }
}
```

✅ **Si vous voyez cette réponse** → L'IA fonctionne parfaitement !

❌ **Si erreur** → Vérifier :
- La clé API est correcte
- Le fichier `.env` est bien dans `backend/`
- Le serveur backend est démarré

---

## 🔬 ÉTAPE 3: Test de Classification

### 3.1 Tester la Classification Manuelle

**Avec curl** :
```bash
curl -X POST http://localhost:5001/api/ai/classify \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Le lampadaire devant l'école primaire est cassé et dangereux pour les enfants",
    "location": "Rue de l'École, Quartier Scolaire"
  }'
```

**Avec PowerShell** :
```powershell
$body = @{
    description = "Le lampadaire devant l'école primaire est cassé et dangereux pour les enfants"
    location = "Rue de l'École, Quartier Scolaire"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5001/api/ai/classify" `
  -Method Post `
  -Body $body `
  -ContentType "application/json"
```

**Réponse attendue** :
```json
{
  "success": true,
  "classification": {
    "category": "Éclairage public",
    "subcategory": "Lampadaire cassé",
    "priority": "high",
    "urgencyScore": 75,
    "confidence": 92,
    "suggestedActions": [
      "Envoyer équipe d'électricité",
      "Sécuriser la zone si nécessaire",
      "Remplacer le lampadaire défectueux"
    ],
    "estimatedResolutionTime": 8,
    "departmentsInvolved": ["Éclairage public", "Sécurité"]
  }
}
```

### 3.2 Tester Différents Scénarios

**Scénario 1: Urgence élevée** (Fuite de gaz)
```json
{
  "description": "URGENCE ! Odeur de gaz très forte dans l'immeuble, danger d'explosion !",
  "location": "Immeuble Résidence Palmiers, Rue Hassan II"
}
```
→ Devrait classifier `priority: "urgent"`, `urgencyScore > 90`

**Scénario 2: Priorité moyenne** (Déchet)
```json
{
  "description": "La poubelle déborde depuis 3 jours dans la rue",
  "location": "Avenue Mohammed V"
}
```
→ Devrait classifier `priority: "medium"`, `category: "Collecte déchets"`

**Scénario 3: Faible priorité** (Cosmétique)
```json
{
  "description": "L'herbe de la pelouse municipale est un peu haute",
  "location": "Parc Municipal"
}
```
→ Devrait classifier `priority: "low"`, `category: "Espaces verts"`

---

## 🎨 ÉTAPE 4: Intégration Frontend

### 4.1 Utiliser dans une Page

**Exemple**: `frontend/src/app/test-ai/page.tsx`

```typescript
'use client';

import React, { useState } from 'react';
import { useAI } from '@/hooks/useAI';
import { ClassificationBadge } from '@/components/AI/ClassificationBadge';
import { SuggestedActions } from '@/components/AI/SuggestedActions';

export default function TestAIPage() {
  const [description, setDescription] = useState('');
  const [classification, setClassification] = useState<any>(null);
  const { classifyComplaint, loading, error } = useAI();

  const handleClassify = async () => {
    try {
      const result = await classifyComplaint(description);
      setClassification(result);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Test IA de Classification</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Description de la réclamation
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Décrivez le problème en détail..."
          />
        </div>

        <button
          onClick={handleClassify}
          disabled={loading || !description.trim()}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {loading ? 'Classification en cours...' : 'Classifier avec l\'IA'}
        </button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {classification && (
          <div className="space-y-4">
            <ClassificationBadge
              category={classification.category}
              subcategory={classification.subcategory}
              priority={classification.priority}
              confidence={classification.confidence}
            />

            <SuggestedActions
              actions={classification.suggestedActions}
              estimatedTime={classification.estimatedResolutionTime}
              departments={classification.departmentsInvolved}
            />

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Détails de la classification</h3>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(classification, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

### 4.2 Créer la Route

Créer le fichier : `frontend/src/app/test-ai/page.tsx` avec le code ci-dessus.

### 4.3 Tester dans le Navigateur

1. Démarrer le frontend : `npm run dev`
2. Ouvrir : `http://localhost:3000/test-ai`
3. Saisir une description
4. Cliquer sur "Classifier avec l'IA"
5. Observer les résultats !

---

## 📊 ÉTAPE 5: Métriques et Monitoring

### 5.1 Surveiller les Coûts OpenAI

**Dashboard OpenAI** : [platform.openai.com/usage](https://platform.openai.com/usage)

**Coûts estimés** (avec GPT-3.5-turbo) :
- **Classification** : ~0.002$ par réclamation
- **1000 réclamations/mois** : ~2$ USD
- **10000 réclamations/mois** : ~20$ USD

💡 **Astuce** : Définir un budget mensuel dans OpenAI Dashboard.

### 5.2 Logs à Surveiller

Dans le backend, les logs affichent :
```
Erreur classification IA: [détails]
```

Surveiller ces erreurs pour identifier :
- Problèmes de quota API
- Erreurs de parsing JSON
- Timeouts

---

## 🎯 ÉTAPE 6: Activation de la Classification Automatique

### 6.1 Modifier le Controller des Réclamations

Déjà inclus dans `WEEK1_IMPLEMENTATION.md`, section "INTEGRATION DANS LE WORKFLOW".

### 6.2 Activer dans .env

```env
AI_AUTO_CLASSIFY=true
```

Avec cette configuration, **chaque nouvelle réclamation** sera automatiquement classifiée par l'IA avant d'être enregistrée.

---

## 🧪 TESTS RECOMMANDÉS

### ✅ Checklist de Test

- [ ] Health check répond avec succès
- [ ] Classification fonctionne pour différentes catégories
- [ ] Priorités correctement assignées (urgent pour "danger")
- [ ] Confiance > 80% pour descriptions claires
- [ ] Fallback fonctionne si OpenAI est down
- [ ] Frontend affiche correctement la classification
- [ ] Actions suggérées pertinentes

### 📝 Exemples de Descriptions à Tester

1. **Eau** : "Fuite d'eau dans ma rue, ça coule depuis hier"
2. **Électricité** : "Câble électrique arraché qui pend dangereusement"
3. **Routes** : "Nid-de-poule énorme sur la route principale"
4. **Déchets** : "Dépôt d'ordures sauvage près du parc"
5. **Éclairage** : "Tous les lampadaires de ma rue sont éteints"

---

## 🚀 PROCHAINES ÉTAPES

1. **Analyse de Tendances** - Utiliser `/api/ai/trends` pour détecter les hotspots
2. **Génération de Réponses** - Auto-répondre aux citoyens
3. **Fine-tuning** - Améliorer le modèle avec vos données réelles
4. **Dashboard Analytics** - Visualiser les métriques IA

---

## 📚 Documentation API

### `POST /api/ai/classify`
Classifie une réclamation.

**Body** :
```json
{
  "description": "Description de la réclamation",
  "location": "Adresse (optionnel)"
}
```

**Response** :
```json
{
  "success": true,
  "classification": {
    "category": "Eau",
    "subcategory": "Fuite",
    "priority": "high",
    "urgencyScore": 80,
    "confidence": 92,
    "suggestedActions": ["..."],
    "estimatedResolutionTime": 4,
    "departmentsInvolved": ["Eau"]
  }
}
```

### `POST /api/ai/response`
Génère une réponse automatique au citoyen.

**Body** :
```json
{
  "classification": { /* objet classification */ }
}
```

**Response** :
```json
{
  "success": true,
  "response": "Merci pour votre signalement. Nos équipes..."
}
```

### `POST /api/ai/trends`
Analyse les tendances.

**Body** :
```json
{
  "complaints": [/* array de réclamations */]
}
```

**Response** :
```json
{
  "success": true,
  "trends": {
    "hotspots": [...],
    "frequentCategories": [...],
    "recommendations": [...]
  }
}
```

### `GET /api/ai/health`
Test de santé du service IA.

**Response** :
```json
{
  "success": true,
  "message": "Service IA opérationnel",
  "testResult": { /* classification test */ }
}
```

---

## ❓ FAQ et Dépannage

### Q: "Service IA indisponible"
**R**: Vérifier :
1. Clé API OpenAI valide
2. Quota OpenAI non épuisé
3. Variables d'environnement chargées
4. Connexion internet OK

### Q: "Classification pas assez précise"
**R**: Ajuster :
1. `OPENAI_TEMPERATURE` (diminuer = plus déterministe)
2. Ajouter plus de contexte dans la description
3. Modifier les prompts dans `aiService.ts`

### Q: "Trop lent (>5 secondes)"
**R**: Optimiser :
1. Utiliser `gpt-3.5-turbo` au lieu de `gpt-4`
2. Réduire `max_tokens`
3. Implémenter du caching

### Q: "Coûts trop élevés"
**R**: Réduire :
1. Limiter classification aux réclamations importantes
2. Utiliser le fallback local quand possible
3. Batch processing (traiter plusieurs en une fois)

---

**Créé le**: 9 Février 2026  
**Auteur**: Équipe Dev ReclamTrack  
**Version**: 1.0.0

🎉 **Félicitations ! Votre IA de Classification est opérationnelle !**
