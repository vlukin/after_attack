import { test, expect } from '@playwright/test';

test.describe('Play Again Flow', () => {
  test('should return to login screen after play again', async ({ page }) => {
    await page.goto('/');
    
    await page.getByText('Play Now').click();
    
    await expect(page.locator('.waiting-message')).toBeVisible({ timeout: 10000 });
    
    await page.waitForTimeout(12000);
    
    await expect(page.getByText('Раунд 1')).toBeVisible({ timeout: 15000 });
    
    await expect(page.getByText('Итоговый счет')).toBeVisible({ timeout: 60000 });
    
    await page.getByText('Play Again').click();
    
    await expect(page.getByText('Play Now')).toBeVisible();
  });

  test('should be able to play again after game ends', async ({ page }) => {
    await page.goto('/');
    const input = page.getByRole('textbox');
    await input.fill('TestPlayer');
    
    await page.getByText('Play Now').click();
    
    await expect(page.locator('.waiting-message')).toBeVisible({ timeout: 10000 });
    
    await page.waitForTimeout(12000);
    
    await expect(page.getByText('Раунд 1')).toBeVisible({ timeout: 15000 });
    
    await page.waitForTimeout(60000);
    
    await page.getByText('Play Again').click();
    
    await expect(page.getByText('Play Now')).toBeVisible();
    
    await page.getByText('Play Now').click();
    
    await expect(page.locator('.waiting-message')).toBeVisible({ timeout: 10000 });
  });
});
