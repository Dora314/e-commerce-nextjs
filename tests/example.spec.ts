import { test, expect } from '@playwright/test';

test('homepage has expected title and heading', async ({ page }) => {
    await page.goto('/');

    // Check for the title
    await expect(page).toHaveTitle(/E-Commerce Store/);

    // Check for the main heading in the hero section
    const heroHeading = page.getByRole('heading', { name: /Premium Quality/i });
    await expect(heroHeading).toBeVisible();

    // Check for the featured products heading
    const featuredProductsHeading = page.getByTestId('featured-products-heading');
    await expect(featuredProductsHeading).toBeVisible();
    await expect(featuredProductsHeading).toHaveText('Premium Picks');
});

test('homepage should have product cards', async ({ page }) => {
    await page.goto('/');

    // Wait for product cards to be visible
    await page.waitForSelector('[data-testid="product-card"]');

    // Check that there is at least one product card
    const productCards = page.getByTestId('product-card');
    expect(await productCards.count()).toBeGreaterThan(0);
});
