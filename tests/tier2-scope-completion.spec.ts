import { test, expect } from '@playwright/test'
import { stubReducedMotion, bypassSplashIntro } from './utils'

test.describe('mobile command palette access', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })

  test('mobile menu has a Search trigger that opens the palette', async ({ page }) => {
    await bypassSplashIntro(page)
    await page.goto('/')
    await page.getByRole('button', { name: 'Toggle menu' }).click()
    await page.getByRole('button', { name: 'Search', exact: true }).click()
    await expect(page.getByRole('dialog', { name: 'Command palette' })).toBeVisible()
  })
})

test.describe('technology constellation', () => {
  test('hovering a node on the About page reveals its description', async ({ page }) => {
    await page.goto('/about')
    const node = page.getByRole('button', { name: /Next\.js:/i })
    await expect(node).toBeAttached()
    await node.scrollIntoViewIfNeeded()
    await node.hover()
    await expect(page.getByText('High-performance web applications')).toBeVisible()
  })
})

test.describe('page transitions', () => {
  test('client-side navigation still lands on the right page with no console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })

    await bypassSplashIntro(page)
    await page.goto('/')
    await page.getByRole('navigation').getByRole('link', { name: 'About', exact: true }).click()
    await expect(page).toHaveURL(/\/about$/)
    await expect(page.getByRole('heading', { name: /We Are/i })).toBeVisible()
    expect(errors, `console/page errors: ${errors.join('; ')}`).toEqual([])
  })
})

test.describe('splash intro', () => {
  test('shows once on first homepage visit, not again within the same session', async ({ page }) => {
    await page.goto('/')
    // It's brief (800ms) and may already be gone by the time we check — the
    // sessionStorage flag it sets is the reliable signal that it *did* run.
    await expect.poll(
      () => page.evaluate(() => sessionStorage.getItem('aiventra-intro-seen')),
      { timeout: 5_000 }
    ).toBe('1')

    await page.reload()
    // Give its mount effect a real chance to (incorrectly) fire again before
    // asserting the negative.
    await page.waitForTimeout(1_000)
    await expect(page.getByTestId('splash-intro')).toHaveCount(0)
  })

  test('never shows under reduced motion', async ({ page }) => {
    await stubReducedMotion(page)
    await page.goto('/')
    await page.waitForTimeout(500)
    const seen = await page.evaluate(() => sessionStorage.getItem('aiventra-intro-seen'))
    expect(seen).toBeNull()
  })
})

test.describe('process storyteller', () => {
  test('sticky visual updates as you scroll through the steps', async ({ page }) => {
    await page.goto('/services')
    const heading = page.locator('.sticky h3').first()
    await expect(heading).toHaveText('Discovery Call')

    await page.getByText('Launch & Grow', { exact: true }).scrollIntoViewIfNeeded()
    await expect.poll(() => heading.textContent(), { timeout: 10_000 }).toBe('Launch & Grow')
  })
})
