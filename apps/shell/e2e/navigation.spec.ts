import { expect, test } from '@playwright/test';

test('redirects to the dashboard MFE by default', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByText('Fleet overview')).toBeVisible();
  await expect(page.getByText('checkout-api')).toBeVisible();
});

test('navigates between the dashboard and alerts microfrontends', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByText('Fleet overview')).toBeVisible();

  await page.getByTestId('nav-alerts').click();
  await expect(page).toHaveURL(/\/alerts$/);
  await expect(page.getByText('Active alerts')).toBeVisible();
  await expect(page.getByText(/notification-worker has stopped processing/)).toBeVisible();

  await page.getByTestId('nav-dashboard').click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByText('Fleet overview')).toBeVisible();
});

test('acknowledging an alert updates its badge', async ({ page }) => {
  await page.goto('/alerts');
  const acknowledgeButtons = page.getByRole('button', { name: 'Acknowledge' });
  await expect(acknowledgeButtons.first()).toBeVisible();
  await acknowledgeButtons.first().click();
  await expect(page.getByText('acknowledged').first()).toBeVisible();
});
