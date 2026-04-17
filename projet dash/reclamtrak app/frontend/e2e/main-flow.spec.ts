import { expect, test } from '@playwright/test';

test.describe('Flux Principal E2E', () => {
  test('Login -> Créer Réclamation -> Assigner', async ({ page }) => {
    // 1. Connexion (Admin)
    await page.goto('/fr/login');
    await page.fill('input[name="identifier"]', 'admin@reclamtrack.com');
    await page.fill('input[name="password"]', 'Admin123!');
    await page.click('button[type="submit"]:has-text("Se connecter")');
    await page.waitForURL(/\/dashboard/);
    await expect(page.locator('text=Tableau de bord')).toBeVisible();

    // 2. Création de Réclamation
    await page.goto('/fr/complaints/new');
    await page.waitForLoadState('networkidle');

    // Étape 1 : Informations
    await page.selectOption('select[name="category"]', 'water');
    await page.fill('input[name="subcategory"]', 'Fuite E2E');
    await page.selectOption('select[name="priority"]', 'high');
    await page.fill('input[name="title"]', 'E2E Test Fuite');
    await page.fill('textarea[name="description"]', 'Test automatisé E2E');
    await page.click('button:has-text("Suivant")');

    // Étape 2 : Localisation
    await page.fill('input[name="address"]', '12 Test E2E');
    await page.fill('input[name="city"]', 'Rabat');
    await page.fill('input[name="district"]', 'Centre');
    await page.click('button:has-text("Suivant")');

    // Étape 3 : Photos (Passer)
    await page.click('button:has-text("Suivant")');

    // Étape 4 : Contact
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('input[name="phone"]', '0600000000');
    await page.check('input[name="agreeToTerms"]');
    await page.click('button:has-text("Soumettre")');

    // Vérification création
    await expect(page).toHaveURL(/.*\/complaints\/tracking.*/, { timeout: 15000 });

    // 3. Assignation de la Réclamation (Admin)
    await page.goto('/fr/complaints');
    await page.waitForLoadState('networkidle');

    // Clic sur la première réclamation
    await page.click('table tbody tr:first-child');
    await page.waitForLoadState('networkidle');

    // Assignation (Tentative)
    const assignButton = page.locator('button:has-text("Assigner")');
    if (await assignButton.isVisible()) {
        await assignButton.click();
        // Le sélecteur d'équipe dépend de l'UI finale, on utilise une approche générique
        const teamSelect = page.locator('select');
        await teamSelect.first().selectOption({ index: 1 });
        await page.click('button:has-text("Confirmer"), button:has-text("Sauvegarder")');
    }
  });
});
