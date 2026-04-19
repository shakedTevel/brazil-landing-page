import { expect, test } from '@playwright/test'
import { readFile, rm } from 'node:fs/promises'
import path from 'node:path'

const contactSubmissionFile = path.join(process.cwd(), 'test-results', 'contact-submission.json')

test('submits the contact form and records the sent message', async ({ page }) => {
  await rm(contactSubmissionFile, { force: true })

  await page.goto('/')
  await page.locator('form').evaluate((form, capturePath) => {
    const existing = form.querySelector('input[name="__testCapturePath"]')

    if (existing instanceof HTMLInputElement) {
      existing.value = capturePath
      return
    }

    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = '__testCapturePath'
    input.value = capturePath
    form.appendChild(input)
  }, contactSubmissionFile)

  await page.getByLabel('Full Name *').fill('Ada Lovelace')
  await page.getByLabel('Email *').fill('ada@example.com')
  await page.getByLabel('Country *').selectOption('Brazil')
  await expect(page.getByLabel('Phone *')).toHaveValue('+55 ')
  await page.getByLabel('Phone *').fill('+55 11 99999 0000')
  await page.getByLabel('Notes').fill('Looking for a harvesting demo in Sao Paulo.')
  await page.getByRole('button', { name: 'Send Message' }).click()

  await expect(page.getByRole('heading', { name: 'Message Sent!' })).toBeVisible()
  await expect(page.getByText("Thank you! We'll be in touch shortly.")).toBeVisible()

  await expect
    .poll(async () => {
      try {
        const content = await readFile(contactSubmissionFile, 'utf8')
        return JSON.parse(content) as {
          fullName: string
          email: string
          country: string
          phone: string
          notes?: string
        }
      } catch {
        return null
      }
    })
    .toMatchObject({
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
      country: 'Brazil',
      phone: '+55 11 99999 0000',
      notes: 'Looking for a harvesting demo in Sao Paulo.',
    })
})
