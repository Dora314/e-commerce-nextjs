import { test, expect } from '@playwright/test';

test.describe('E-commerce Site E2E Tests', () => {
    test('should load the homepage and display key elements', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/E-Commerce Store/i);
        await expect(page.getByTestId('featured-products-heading')).toBeVisible();
        await expect(page.getByTestId('hero-section').getByRole('link', { name: /shop now/i })).toBeVisible();
    });

    test('should navigate to the categories page from the header', async ({ page }) => {
        await page.goto('/');
        await page.locator('header').getByRole('link', { name: /categories/i }).click();
        await expect(page).toHaveURL(/.*\/categories/);
        await expect(page.getByRole('heading', { name: /categories/i })).toBeVisible();
    });

    test('should navigate to a product page and see details', async ({ page }) => {
        await page.goto('/');
        await page.getByTestId('product-card').first().click();

        await expect(page).toHaveURL(/.*\/products\/.+/);
        await expect(page.getByTestId('add-to-cart-button')).toBeVisible();
    });

    test('should display the login page', async ({ page }) => {
        await page.goto('/login');
        await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
        await expect(page.getByLabel(/Email Address/i)).toBeVisible();
        await expect(page.getByLabel(/Password/i)).toBeVisible();
        await expect(page.getByTestId('login-button')).toBeVisible();
    });

    test('should allow a user to search for a product', async ({ page }) => {
        await page.goto('/');
        const searchInput = page.getByPlaceholder(/search/i);
        await searchInput.fill('Jeans'); // Use a term that exists in mock data
        await page.waitForSelector('[data-testid="search-result-item"]', { timeout: 10000 });

        const firstResult = page.getByTestId('search-result-item').first();
        await expect(firstResult).toBeVisible();
        await firstResult.click();
        await expect(page.getByTestId('product-details-main')).toBeVisible();
    });

    test('should add a product to the cart and verify', async ({ page }) => {
        test.setTimeout(60000); // Increase timeout for this specific test

        // Login first
        await page.goto('/login');

        // Wait for the login form to be ready
        await page.waitForSelector('input[placeholder="john@example.com"]');
        await page.waitForSelector('input[placeholder="password"]');

        await page.getByPlaceholder('john@example.com').fill('john@example.com');
        await page.getByPlaceholder('password').fill('password123');
        await page.getByRole('button', { name: /login/i }).click();

        // Wait for navigation to the homepage to complete
        await page.waitForURL('**/', { timeout: 15000 });

        // Wait for the main page to load fully after login by checking for a known element
        await expect(page.getByTestId('featured-products-heading')).toBeVisible({ timeout: 15000 });

        // Now add to cart
        await page.getByTestId('product-card').first().click();
        await expect(page.getByTestId('product-details-main')).toBeVisible();

        await page.getByTestId('add-to-cart-button').click();

        // Check for toast message
        const toast = page.locator('[data-testid="toast"]');
        await expect(toast).toBeVisible({ timeout: 10000 });
        await expect(toast).toContainText('Added to cart');

        // Go to cart and verify
        await page.getByTestId('cart-link').click();
        await expect(page.getByTestId('cart-item')).toHaveCount(1);
        await expect(page.getByTestId('checkout-button')).toBeVisible();
    });
});
