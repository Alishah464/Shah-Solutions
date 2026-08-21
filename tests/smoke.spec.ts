import { test, expect } from '@playwright/test'

const pages = [
  '/', '/about', '/services', '/services/seo', '/services/ai-development',
  '/services/ai-chatbots', '/services/mobile-app-development', '/industries',
  '/industries/ecommerce', '/portfolio', '/blog', '/contact', '/book',
  '/locations', '/privacy-policy', '/terms',
]

for (const path of pages) {
  test(`${path} loads with no console errors`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })

    const response = await page.goto(path)
    expect(response?.status(), `${path} should return 2xx`).toBeLessThan(400)
    await expect(page.locator('h1').first()).toBeVisible()
    expect(errors, `console/page errors on ${path}: ${errors.join('; ')}`).toEqual([])
  })
}

test('sitemap.xml is served', async ({ page }) => {
  const response = await page.goto('/sitemap.xml')
  expect(response?.status()).toBe(200)
})

test('robots.txt is served', async ({ page }) => {
  const response = await page.goto('/robots.txt')
  expect(response?.status()).toBe(200)
})

test('homepage title and brand are correct', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Aiventra Labs/)
  await expect(page.locator('body')).not.toContainText('Nexora')
  await expect(page.locator('body')).not.toContainText('Shah Solutions')
})
