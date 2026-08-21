import { test, expect } from '@playwright/test'
import { bypassSplashIntro } from './utils'

test.describe('capabilities showcase', () => {
  test.beforeEach(async ({ page }) => bypassSplashIntro(page))

  test('hovering a different capability swaps the detail panel', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'SEO Optimization', exact: true })).toBeVisible()

    await page.getByRole('button', { name: 'AI Chatbots', exact: true }).hover()
    await expect(page.getByRole('heading', { name: 'AI Chatbots', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: /Explore AI Chatbots/i })).toHaveAttribute('href', '/services/ai-chatbots')
  })

  test('tapping works too, for touch devices', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Digital Marketing', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Digital Marketing', exact: true })).toBeVisible()
  })
})

test.describe('glow card', () => {
  test.beforeEach(async ({ page }) => bypassSplashIntro(page))

  test('tracks cursor position via CSS custom properties on hover', async ({ page }) => {
    await page.goto('/services')
    const card = page.locator('.glow-card').first()
    await expect(card).toBeVisible()
    await card.scrollIntoViewIfNeeded()
    const box = await card.boundingBox()
    if (!box) throw new Error('no bounding box')
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 5 })
    await expect.poll(
      () => card.evaluate((el) => (el as HTMLElement).style.getPropertyValue('--mx')),
      { timeout: 5_000 }
    ).not.toBe('')
  })
})

test.describe('service detail feature reveal', () => {
  test.beforeEach(async ({ page }) => bypassSplashIntro(page))

  test('feature list renders with no console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })

    await page.goto('/services/ai-development')
    await expect(page.getByText('Custom Workflow Automation')).toBeVisible()
    await expect(page.getByText('Tool & API Integrations')).toBeVisible()
    expect(errors, `console/page errors: ${errors.join('; ')}`).toEqual([])
  })
})

test.describe('mobile pass', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })
  test.beforeEach(async ({ page }) => bypassSplashIntro(page))

  for (const path of ['/', '/about', '/services', '/services/seo']) {
    test(`${path} has no console errors and no horizontal overflow on mobile`, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (err) => errors.push(err.message))
      page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })

      await page.goto(path)
      await expect(page.locator('h1').first()).toBeVisible()

      const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)
      expect(hasOverflow, `${path} has horizontal overflow on mobile`).toBe(false)
      expect(errors, `console/page errors on ${path}: ${errors.join('; ')}`).toEqual([])
    })
  }

  test('capabilities showcase tabs are tappable on mobile', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Web Development', exact: true }).tap()
    await expect(page.getByRole('heading', { name: 'Web Development', exact: true })).toBeVisible()
  })
})
