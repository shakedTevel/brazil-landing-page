import { expect, test } from '@playwright/test'

test('submits the contact form through the live SMTP path', async ({ page }) => {
  const uniqueToken = `playwright-live-${Date.now()}`

  await page.goto('/')

  await page.getByLabel('Full Name *').fill('Ada Lovelace')
  await page.getByLabel('Email *').fill('ada@example.com')
  await page.getByLabel('Country *').selectOption('Brazil')
  await expect(page.getByLabel('Phone *')).toHaveValue('+55 ')
  await page.getByLabel('Phone *').fill('+55 11 99999 0000')
  await page
    .getByLabel('Notes')
    .fill(`Live SMTP Playwright check. Reference token: ${uniqueToken}`)
  await page.getByRole('button', { name: 'Send Message' }).click()

  await expect(page.getByRole('heading', { name: 'Message Sent!' })).toBeVisible({
    timeout: 30_000,
  })
  await expect(page.getByText("Thank you! We'll be in touch shortly.")).toBeVisible()
})
