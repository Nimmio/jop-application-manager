import { test, expect } from '@playwright/test'

test('user can register and sees the authenticated dashboard', async ({ page }) => {
  await page.goto('/auth')
  await page.getByRole('button', { name: /register/i }).first().click()
  await page.getByPlaceholder('Name').fill(`E2E ${Date.now()}`)
  await page.getByPlaceholder('Email').fill(`e2e-${Date.now()}@example.com`)
  await page.getByPlaceholder(/password/i).fill('correct-horse-battery-staple')
  await page.getByRole('button', { name: /register/i }).last().click()
  await expect(page).toHaveURL('/')
})

test('unauthenticated users cannot access applications', async ({ page }) => {
  await page.goto('/applications/new')
  await expect(page.getByText(/authentication required/i)).toBeVisible()
})
