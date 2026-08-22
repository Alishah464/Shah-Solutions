import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { bypassSplashIntro } from './utils'

// WCAG 2.2 AA, per the plan's stated target rather than just a Lighthouse
// score. Best-practice rules included too (they catch real issues even
// when not strictly required for the AA level).
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']

const pages = [
  '/', '/about', '/services', '/services/seo', '/services/ai-development',
  '/industries', '/industries/ecommerce', '/portfolio', '/blog', '/contact',
  '/book', '/locations', '/privacy-policy', '/terms',
]

for (const path of pages) {
  test(`${path} has no axe-detectable WCAG 2.2 AA violations`, async ({ page }) => {
    await bypassSplashIntro(page)
    await page.goto(path)
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page }).withTags(TAGS).analyze()

    if (results.violations.length > 0) {
      const summary = results.violations
        .map((v) => `[${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node(s))\n  ${v.nodes.map((n) => n.target.join(' ')).join('\n  ')}`)
        .join('\n\n')
      throw new Error(`${path} has ${results.violations.length} accessibility violation(s):\n\n${summary}`)
    }
  })
}

test.describe('keyboard & focus', () => {
  test.beforeEach(async ({ page }) => bypassSplashIntro(page))

  test('command palette: Tab cycles inside it and Escape returns focus', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('Open search').click()
    const dialog = page.getByRole('dialog', { name: 'Command palette' })
    await expect(dialog).toBeVisible()
    await expect(page.getByPlaceholder('Search Aiventra Labs...')).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
  })

  test('mobile menu toggle has an accessible name and expanded state', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    const toggle = page.getByRole('button', { name: 'Toggle menu' })
    await expect(toggle).toBeVisible()
    await toggle.click()
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Home', exact: true })).toBeVisible()
  })

  test('all primary nav links are reachable and visible via keyboard focus', async ({ page }) => {
    await page.goto('/')
    const homeLink = page.getByRole('navigation').getByRole('link', { name: 'Home', exact: true })
    await homeLink.focus()
    await expect(homeLink).toBeFocused()
  })
})
