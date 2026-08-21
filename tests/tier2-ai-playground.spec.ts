import { test, expect } from '@playwright/test'
import { stubReducedMotion } from './utils'

test.describe('tier 2 — AI playground', () => {
  test('is present on the homepage with an honest demo disclaimer', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Ask Aiventra' })).toBeVisible()
    await expect(page.getByText(/curated preview, not a live AI connection/i)).toBeVisible()
  })

  test('clicking a suggestion chip produces a matching, linked answer', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Do I need SEO or GEO?' }).click()
    const answerLink = page.getByRole('link', { name: /See our SEO approach/i })
    await expect(answerLink).toBeVisible({ timeout: 10_000 })
    await expect(answerLink).toHaveAttribute('href', '/services/seo')
  })

  test('typing a custom query routes to the right service', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('Ask Aiventra').fill('How do I get an AI chatbot on WhatsApp?')
    await page.getByRole('button', { name: 'Ask' }).click()
    const answerLink = page.getByRole('link', { name: /See our AI chatbot approach/i })
    await expect(answerLink).toBeVisible({ timeout: 10_000 })
    await expect(answerLink).toHaveAttribute('href', '/services/ai-chatbots')
  })

  test('falls back to a general answer for an unmatched query', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('Ask Aiventra').fill('something totally unrelated to any service keyword')
    await page.getByRole('button', { name: 'Ask' }).click()
    const answerLink = page.getByRole('link', { name: /Explore all services/i })
    await expect(answerLink).toBeVisible({ timeout: 10_000 })
    await expect(answerLink).toHaveAttribute('href', '/services')
  })

  test('Ask button is disabled for an empty query', async ({ page }) => {
    await page.goto('/')
    const askButton = page.getByRole('button', { name: 'Ask' })
    await expect(askButton).toBeDisabled()
  })

  test('shows instantly under reduced motion, no console errors', async ({ page }) => {
    await stubReducedMotion(page)
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })

    await page.goto('/')
    await page.getByRole('button', { name: 'Should I build a mobile app?' }).click()
    await expect(page.getByRole('link', { name: /See our app development approach/i })).toBeVisible({ timeout: 10_000 })
    expect(errors, `console/page errors: ${errors.join('; ')}`).toEqual([])
  })
})
