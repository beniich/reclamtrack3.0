# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.setup.ts >> authenticate
- Location: e2e\auth.setup.ts:6:6

# Error details

```
Test timeout of 300000ms exceeded.
```

```
Error: page.waitForURL: Test timeout of 300000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - img "ReclamTrack Logo" [ref=e4]
      - generic [ref=e5]:
        - heading "ReclamTrack" [level=1] [ref=e6]
        - paragraph [ref=e7]: Intervention Management System
    - generic [ref=e8]:
      - generic [ref=e9]:
        - generic [ref=e10]: Authentification Sécurisée
        - heading "Connexion" [level=2] [ref=e12]
        - paragraph [ref=e13]: Accès Autorisé Requis
      - generic [ref=e14]:
        - generic [ref=e17]:
          - button "Se connecter avec Google. S'ouvre dans un nouvel onglet." [ref=e19] [cursor=pointer]:
            - generic [ref=e21]:
              - img [ref=e24]
              - generic [ref=e31]: Se connecter avec Google
          - iframe
        - generic [ref=e36]: Ou continuer avec
        - generic [ref=e37]:
          - generic [ref=e38]:
            - generic [ref=e39]: Identifiant ou Email
            - generic [ref=e40]:
              - generic [ref=e41]: mail
              - textbox "Identifiant ou Email" [ref=e42]:
                - /placeholder: Entrez votre email
                - text: mario@reclamtrack.com
          - generic [ref=e43]:
            - generic [ref=e44]:
              - generic [ref=e45]: Mot de passe
              - link "Mot de passe oublié ?" [ref=e46] [cursor=pointer]:
                - /url: /fr/forgot-password
            - generic [ref=e47]:
              - generic [ref=e48]: lock
              - textbox "Mot de passe" [ref=e49]:
                - /placeholder: Entrez votre mot de passe
                - text: password123
              - button "visibility" [ref=e50] [cursor=pointer]:
                - generic [ref=e51]: visibility
          - generic [ref=e52]:
            - checkbox "Rester connecté" [ref=e53]
            - generic [ref=e54]: Rester connecté
          - button "Se connecter login" [ref=e55] [cursor=pointer]:
            - generic [ref=e56]: Se connecter
            - generic [ref=e57]: login
          - generic [ref=e58]:
            - button "shield_person Admin Demo" [ref=e59] [cursor=pointer]:
              - generic [ref=e60]: shield_person
              - text: Admin Demo
            - button "monitoring SuperAdmin" [ref=e61] [cursor=pointer]:
              - generic [ref=e62]: monitoring
              - text: SuperAdmin
        - generic [ref=e63]:
          - generic [ref=e64]: encrypted
          - generic [ref=e65]: Connexion chiffrée de bout en bout
    - generic [ref=e66]:
      - link "Politique de sécurité" [ref=e67] [cursor=pointer]:
        - /url: "#"
      - link "Support" [ref=e68] [cursor=pointer]:
        - /url: "#"
      - link "Confidentialité" [ref=e69] [cursor=pointer]:
        - /url: "#"
    - generic [ref=e70]:
      - text: Pas encore de compte ?
      - link "Créer un compte" [ref=e71] [cursor=pointer]:
        - /url: /fr/register
    - paragraph [ref=e72]: © 2024 ReclamTrack Solutions. Tous droits réservés.
  - region "Notifications alt+T"
  - generic [ref=e75] [cursor=pointer]:
    - img [ref=e76]
    - generic [ref=e78]: 3 errors
    - button "Hide Errors" [ref=e79]:
      - img [ref=e80]
  - alert [ref=e83]
```

# Test source

```ts
  1  | import { test as setup, expect } from '@playwright/test';
  2  | import path from 'path';
  3  | 
  4  | const authFile = path.join(__dirname, '../playwright/.auth/user.json');
  5  | 
  6  | setup('authenticate', async ({ page }) => {
  7  |     // Listen for console messages
  8  |     page.on('console', msg => console.log(`BROWSER [${msg.type()}]: ${msg.text()}`));
  9  |     page.on('pageerror', err => console.log(`BROWSER ERROR: ${err.message}`));
  10 | 
  11 |     // Navigate to login page
  12 |     await page.goto('/fr/login');
  13 | 
  14 |     // Fill in credentials (using credentials from seedE2E)
  15 |     await page.fill('input[name="identifier"]', 'mario@reclamtrack.com');
  16 |     await page.fill('input[name="password"]', 'password123');
  17 | 
  18 |     // Click login button
  19 |     await page.click('button[type="submit"]:has-text("Se connecter")');
  20 | 
  21 |     // Check for error toasts or messages if login fails
  22 |     // Check for error toasts or messages if login fails
  23 |     // Only look for visible error alerts to avoid false positives
  24 |     const errorMessage = page.locator('.toast-error:visible, [role="alert"][data-type="error"]:visible');
  25 | 
  26 |     // Short wait to see if error appears
  27 |     try {
  28 |         await expect(errorMessage).toBeVisible({ timeout: 2000 });
  29 |         console.log('Login failed with error:', await errorMessage.first().textContent());
  30 |     } catch {
  31 |         // No error visible, proceed
  32 |     }
  33 | 
  34 |     // Wait for navigation and load
> 35 |     await page.waitForURL(/\/dashboard/);
     |                ^ Error: page.waitForURL: Test timeout of 300000ms exceeded.
  36 |     await page.waitForLoadState('networkidle');
  37 | 
  38 |     // Inspect localStorage to see if token exists
  39 |     const authStorage = await page.evaluate(() => localStorage.getItem('reclamtrack-auth-storage'));
  40 |     console.log('AUTH STORAGE:', authStorage);
  41 | 
  42 |     // Verify we're logged in
  43 |     // 1. Check if the store has a user
  44 |     const hasUser = await page.evaluate(() => {
  45 |         try {
  46 |             const data = JSON.parse(localStorage.getItem('reclamtrack-auth-storage') || '{}');
  47 |             return !!data.state?.user;
  48 |         } catch { return false; }
  49 |     });
  50 | 
  51 |     if (!hasUser) {
  52 |         console.log('VERIFICATION FAILED: user not found in localStorage');
  53 |         // Take a screenshot of the current page to debug
  54 |         await page.screenshot({ path: 'test-results/login-failed.png' });
  55 |     }
  56 | 
  57 |     expect(hasUser).toBe(true);
  58 | 
  59 |     // Save authentication state
  60 |     await page.context().storageState({ path: authFile });
  61 | });
  62 | 
```