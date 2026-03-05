import { test, expect } from '@playwright/test';

test.describe('Multiplayer Game Flow', () => {
  test('should handle 2 human players + 1 bot', async ({ browser }) => {
    const contexts = await Promise.all([
      browser.newContext(),
      browser.newContext()
    ]);
    
    const pages = await Promise.all(contexts.map(c => c.newPage()));
    
    await Promise.all(pages.map(p => p.goto('/')));
    
    await pages[0].getByRole('textbox').fill('Player1');
    await pages[1].getByRole('textbox').fill('Player2');
    
    await pages[0].getByText('Play Now').click();
    await pages[1].getByText('Play Now').click();
    
    await pages[0].waitForTimeout(3000);
    
    await expect(pages[0].getByText(/Раунд 1/i)).toBeVisible({ timeout: 15000 });
    await expect(pages[0].locator('.player-card')).toHaveCount(3);
    
    await Promise.all(contexts.map(c => c.close()));
  });

  test('should show (you) label for current player', async ({ browser }) => {
    const contexts = await Promise.all([
      browser.newContext(),
      browser.newContext()
    ]);
    
    const pages = await Promise.all(contexts.map(c => c.newPage()));
    
    await Promise.all(pages.map(p => p.goto('/')));
    
    await pages[0].getByRole('textbox').fill('Player1');
    await pages[1].getByRole('textbox').fill('Player2');
    
    await pages[0].getByText('Play Now').click();
    await pages[1].getByText('Play Now').click();
    
    await pages[0].waitForTimeout(3000);
    
    await expect(pages[0].getByText(/\(you\)/)).toHaveCount(1);
    await expect(pages[1].getByText(/\(you\)/)).toHaveCount(1);
    
    await Promise.all(contexts.map(c => c.close()));
  });

  test('should display 5 score points on end screen', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('/');
    await page.getByRole('textbox').fill('TestPlayer');
    await page.getByText('Play Now').click();
    
    await page.waitForTimeout(3000);
    
    await expect(page.locator('.score-dot')).toHaveCount(5);
    
    await context.close();
  });
});
