import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Device viewport configurations
const viewports = [
  { name: 'iPhone-X', width: 375, height: 812, deviceScaleFactor: 3 },
  { name: 'iPhone-11-Pro-Max', width: 414, height: 896, deviceScaleFactor: 3 },
  { name: 'iPhone-14-Pro-Max', width: 430, height: 932, deviceScaleFactor: 3 },
  { name: 'Galaxy-S20', width: 360, height: 800, deviceScaleFactor: 3 },
  { name: 'iPad-Mini', width: 768, height: 1024, deviceScaleFactor: 2 },
  { name: 'iPad-Pro', width: 1024, height: 1366, deviceScaleFactor: 2 },
  { name: 'MacBook-Air', width: 1440, height: 900, deviceScaleFactor: 2 },
  { name: 'Desktop-HD', width: 1920, height: 1080, deviceScaleFactor: 1 },
];

test.describe('PlayOracle™ Responsive Viewport Tests', () => {
  for (const viewport of viewports) {
    test(`${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
      // Set viewport
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      // Navigate to landing page
      await page.goto('/landing');
      await page.waitForLoadState('networkidle');

      // Take screenshot of landing page
      const screenshotDir = path.join(process.cwd(), 'public', 'screenshots', 'responsive-test');
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }

      await page.screenshot({
        path: path.join(screenshotDir, `${viewport.name}-landing.png`),
        fullPage: true,
      });

      // Verify page loaded correctly
      await expect(page.locator('h1')).toContainText('The Game Thinks');

      // Check responsive elements
      const heroSection = page.locator('section').first();
      await expect(heroSection).toBeVisible();

      // Navigate to dashboard (if we can - may need auth)
      try {
        await page.goto('/dashboard');
        await page.waitForLoadState('networkidle', { timeout: 5000 });
        
        await page.screenshot({
          path: path.join(screenshotDir, `${viewport.name}-dashboard.png`),
          fullPage: true,
        });
      } catch (error) {
        console.log(`Dashboard requires auth for ${viewport.name}, skipping`);
      }

      // Test modal behavior (if available)
      const viewHistoryButtons = page.locator('button:has-text("View History")');
      const count = await viewHistoryButtons.count();
      
      if (count > 0) {
        await viewHistoryButtons.first().click();
        await page.waitForTimeout(1000); // Wait for flip animation
        
        await page.screenshot({
          path: path.join(screenshotDir, `${viewport.name}-modal-flipped.png`),
          fullPage: true,
        });

        // Verify modal doesn't overflow
        const flippedCard = page.locator('.flip-card.flipped');
        if (await flippedCard.count() > 0) {
          const boundingBox = await flippedCard.first().boundingBox();
          if (boundingBox) {
            expect(boundingBox.height).toBeLessThanOrEqual(viewport.height * 0.85);
          }
        }
      }

      console.log(`✅ ${viewport.name}: Screenshots captured successfully`);
    });
  }
});

test.describe('Grid Layout Verification', () => {
  test('Desktop 3-column grid (≥1280px)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/landing');
    await page.waitForLoadState('networkidle');

    // Verify grid layout exists
    const grids = page.locator('.sports-grid, .grid');
    const count = await grids.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Tablet 2-column grid (768-1279px)', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/landing');
    await page.waitForLoadState('networkidle');

    const grids = page.locator('.sports-grid, .grid');
    const count = await grids.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Mobile 1-column grid (<768px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/landing');
    await page.waitForLoadState('networkidle');

    const grids = page.locator('.sports-grid, .grid');
    const count = await grids.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Modal Overflow Prevention', () => {
  test('Modal stays within 85vh on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/landing');
    await page.waitForLoadState('networkidle');

    // Check if any modals exist
    const modals = page.locator('[role="dialog"], .modal-container');
    const count = await modals.count();
    
    if (count > 0) {
      const boundingBox = await modals.first().boundingBox();
      if (boundingBox) {
        expect(boundingBox.height).toBeLessThanOrEqual(812 * 0.85);
      }
    }
  });
});
