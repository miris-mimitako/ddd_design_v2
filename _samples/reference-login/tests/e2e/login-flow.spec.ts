import { test, expect } from '@playwright/test';

test('login and logout flow', async ({ page }) => {
  await page.goto('http://localhost:4321');
  await page.fill('#login-email', 'sample.user@example.com');
  await page.fill('#login-password', 'password123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/\/mypage$/);
  await expect(page.getByText('Sample User')).toBeVisible();

  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page).toHaveURL(/\/$/);
});
