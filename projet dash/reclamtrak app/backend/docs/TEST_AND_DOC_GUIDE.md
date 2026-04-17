# 📚 Documentation & Testing Guide

Ce guide explique comment utiliser la documentation OpenAPI et exécuter les tests pour le backend de ReclamTrack.

## 📖 Documentation API (OpenAPI 3.0)

La définition complète de l'API se trouve dans `backend/docs/openapi.yaml`.

### Comment visualiser la documentation ?

Pour voir une interface interactive (Swagger UI), vous pouvez :

1.  **Utiliser une extension VSCode** :
    - Installez l'extension "OpenAPI (Swagger) Editor".
    - Ouvrez `backend/docs/openapi.yaml`.
    - Cliquez sur l'icône de prévisualisation.

2.  **Intégrer Swagger UI dans l'application (Recommandé)** :
    - Installez les dépendances :
      ```bash
      npm install swagger-ui-express yamljs
      npm install --save-dev @types/swagger-ui-express @types/yamljs
      ```
    - Ajoutez ceci à votre `backend/src/index.ts` :

      ```typescript
      import swaggerUi from 'swagger-ui-express';
      import YAML from 'yamljs';

      const swaggerDocument = YAML.load('./docs/openapi.yaml');
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
      ```

    - Accédez à `http://localhost:5000/api-docs`.

## 🧪 Tests Unitaires

Des tests unitaires préliminaires ont été créés dans `backend/tests/` :

- `apiResponse.test.ts` : Teste les utilitaires de réponse (succès, erreurs, codes).
- `security.test.ts` : Teste le middleware d'authentification (JWT, headers).

### Pré-requis

Pour exécuter ces tests, vous devez installer Jest et ses types :

```bash
npm install --save-dev jest ts-jest @types/jest supertest @types/supertest
```

### Configuration

Créez un fichier `jest.config.js` à la racine de `backend/` :

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
```

Ajoutez le script suivant à votre `package.json` :

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch"
}
```

### Exécution

Lancez les tests avec :

```bash
npm test
```

## 🔍 Couverture des Routes Documentées

Le fichier `openapi.yaml` couvre 100% des routes harmonisées :

### Authentication (/api/auth)

- POST `/register`
- POST `/login`
- GET `/me`
- POST `/refresh`
- POST `/logout`

### Security (/api/security)

- GET `/audit/passwords`
- GET `/sessions/rdp`
- GET `/secrets`
- POST `/secrets`
- GET `/secrets/{id}/reveal`

### Complaints (/api/complaints)

- GET `/complaints` (avec pagination)
- POST `/complaints` (avec upload photos)
- GET `/complaints/{id}`
- PUT `/complaints/{id}`
- POST `/complaints/{id}/approve`
- POST `/complaints/{id}/reject`

---

**Date de création** : 2026-02-17
**Auteur** : Antigravity Assistant
