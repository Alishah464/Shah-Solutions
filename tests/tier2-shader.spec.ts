import { test, expect } from '@playwright/test'
import { stubReducedMotion } from './utils'

test.describe('tier 2 — shader background', () => {
  test('renders behind the hero and does not block the CTA', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })

    await page.goto('/')
    const canvas = page.getByTestId('shader-background')
    await expect(canvas).toBeAttached()

    // pointer-events-none means clicks pass through to whatever's under it.
    const pointerEvents = await canvas.evaluate((el) => getComputedStyle(el).pointerEvents)
    expect(pointerEvents).toBe('none')

    const cta = page.getByRole('link', { name: /Get a Free Consultation/i })
    await expect(cta).toBeVisible()
    await cta.click({ trial: true }) // verifies it's actually clickable, not covered

    expect(errors, `console/page errors: ${errors.join('; ')}`).toEqual([])
  })

  test('canvas is present but inert under reduced motion (no crash)', async ({ page }) => {
    await stubReducedMotion(page)
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })

    await page.goto('/')
    await expect(page.getByTestId('shader-background')).toBeAttached()
    expect(errors, `console/page errors: ${errors.join('; ')}`).toEqual([])
  })

  test('canvas gets non-zero pixel dimensions once WebGL initializes', async ({ page }) => {
    await page.goto('/')
    await expect.poll(
      () => page.getByTestId('shader-background').evaluate((el: HTMLCanvasElement) => el.width),
      { timeout: 10_000 }
    ).toBeGreaterThan(0)
  })
})
