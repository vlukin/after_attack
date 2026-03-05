import { test, expect } from '@playwright/test';

test.describe('Login Screen', () => {
  test('should load login screen', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('After Attack')).toBeVisible();
    await expect(page.getByText('Play Now')).toBeVisible();
  });

  test('should show random username on load', async ({ page }) => {
    await page.goto('/');
    const input = page.getByRole('textbox');
    const value = await input.inputValue();
    expect(value).toMatch(/^[А-Яа-яёЁA-Za-z]+ [А-Яа-яёЁA-Za-z]+$/);
  });

  test('should allow username editing', async ({ page }) => {
    await page.goto('/');
    const input = page.getByRole('textbox');
    await input.fill('Custom Name');
    await expect(input).toHaveValue('Custom Name');
  });

  test('should generate new random name on dice click', async ({ page }) => {
    await page.goto('/');
    const input = page.getByRole('textbox');
    const firstName = await input.inputValue();
    await page.getByTitle('Generate new name').click();
    const secondName = await input.inputValue();
    expect(secondName).not.toBe(firstName);
  });

  test('should show Technical Support button', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Technical Support')).toBeVisible();
  });

  test('should open Technical Support modal with QR code', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Technical Support').click();
    await expect(page.getByText('https://t.me/+AQgpJzP4t4thMzdi')).toBeVisible();
    await expect(page.locator('svg')).toBeVisible();
  });
});
