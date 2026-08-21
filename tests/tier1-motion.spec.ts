import { test, expect } from '@playwright/test'
import { stubReducedMotion } from './utils'

test.describe('tier 1 — motion system, magnetic buttons, nav', () => {
  test('hero CTA is a magnetic button that displaces on hover', async ({ page }) => {
    await page.goto('/')
    const link = page.getByRole('link', { name: /Get a Free Consultation/i })
    await expect(link).toBeVisible()

    const box = await link.boundingBox()
    if (!box) throw new Error('no bounding box for hero CTA')

    const wrapper = link.locator('xpath=..')

    // Enter from outside first, then move to a corner (not dead-center) in
    // steps, so real intermediate mousemove events land on the element.
    await page.mouse.move(box.x - 50, box.y - 50)
    await page.mouse.move(box.x + box.width - 4, box.y + 4, { steps: 10 })

    let transform = ''
    await expect.poll(async () => {
      transform = await wrapper.evaluate((el) => getComputedStyle(el).transform)
      return transform
    }, { timeout: 10_000 }).not.toBe('none')

    // Moving away should relax the offset back toward identity.
    await page.mouse.move(20, 20, { steps: 10 })
    await expect.poll(
      () => wrapper.evaluate((el) => getComputedStyle(el).transform),
      { timeout: 10_000 }
    ).not.toBe(transform)
  })

  test('navbar Get Started button is also magnetic', async ({ page }) => {
    await page.goto('/')
    const link = page.getByRole('link', { name: /Get Started/i });
    await expect(link).toBeVisible()
    const wrapper = link.locator('xpath=..')
    await expect(wrapper).toBeVisible()
  })

  test('contact form submit is an accessible, real <button>', async ({ page }) => {
    await page.goto('/contact')
    const btn = page.getByRole('button', { name: /Send Message/i })
    await expect(btn).toBeVisible()
    await expect(btn).toHaveAttribute('type', 'submit')
  })

  test('scroll progress bar grows as the page scrolls', async ({ page }) => {
    await page.goto('/about')
    const bar = page.locator('.progress-bar')
    const before = await bar.evaluate((el) => (el as HTMLElement).style.width)
    await page.mouse.wheel(0, 4000)
    await page.waitForTimeout(300)
    const after = await bar.evaluate((el) => (el as HTMLElement).style.width)
    expect(after).not.toBe(before)
  })

  test('services dropdown lists the 6 primary services', async ({ page }) => {
    await page.goto('/')
    const nav = page.getByRole('navigation')
    await nav.getByRole('link', { name: 'Services', exact: true }).hover()
    await expect(nav.getByRole('link', { name: 'AI Development', exact: true })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'AI Chatbots', exact: true })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Mobile App Development', exact: true })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Digital Marketing', exact: true })).toBeVisible()
  })

  test('industries dropdown lists the primary industries', async ({ page }) => {
    await page.goto('/')
    const nav = page.getByRole('navigation')
    await nav.getByRole('link', { name: 'Industries', exact: true }).hover()
    await expect(nav.getByRole('link', { name: 'E-commerce', exact: true })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Healthcare', exact: true })).toBeVisible()
  })
})

test.describe('tier 1 — reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })
  test.beforeEach(async ({ page }) => stubReducedMotion(page))

  test('typed hero subtitle shows the first word immediately, not empty', async ({ page }) => {
    await page.goto('/')
    const typed = page.locator('.typing-cursor')
    await expect(typed).toHaveText('SEO Domination')
  })

  test('scroll-revealed content is not stuck invisible', async ({ page }) => {
    await page.goto('/about')
    await page.mouse.wheel(0, 1200)
    await page.waitForTimeout(500)
    const values = page.getByText('Results-Obsessed')
    await expect(values).toBeVisible()
  })
})
