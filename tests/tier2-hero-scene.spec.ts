import { test, expect } from '@playwright/test'
import { stubReducedMotion } from './utils'

test.describe('tier 2 — 3D hero scene', () => {
  test('mounts a canvas on desktop without console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })

    await page.goto('/')
    const scene = page.getByTestId('hero-scene')
    await expect(scene).toBeAttached({ timeout: 10_000 })
    await expect(scene.locator('canvas')).toBeVisible({ timeout: 10_000 })

    expect(errors, `console/page errors: ${errors.join('; ')}`).toEqual([])
  })

  test('reduced motion: scene still mounts, no crash', async ({ page }) => {
    await stubReducedMotion(page)
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })

    await page.goto('/')
    await expect(page.getByTestId('hero-scene').locator('canvas')).toBeVisible({ timeout: 10_000 })
    expect(errors, `console/page errors: ${errors.join('; ')}`).toEqual([])
  })

  test.describe('mobile viewport', () => {
    // Just the viewport, not a full device preset — spreading
    // devices['iPhone 13'] includes defaultBrowserType, which Playwright
    // refuses inside a nested describe's test.use().
    test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })

    test('never mounts the scene', async ({ page }) => {
      // This checks the actual React-level gating (app/page.tsx only
      // renders <HeroScene /> — and so only triggers its dynamic import —
      // once it's confirmed a desktop viewport). A byte-size assertion on
      // fetched scripts was tried here too, but `next dev` doesn't
      // code-split the way a production build does, so it wasn't a valid
      // signal in this environment; the DOM check is what actually proves
      // the gate works, independent of dev-vs-prod bundling behavior.
      await page.goto('/')
      await page.waitForTimeout(1500) // let any deferred/dynamic imports have a chance to fire
      await expect(page.getByTestId('hero-scene')).toHaveCount(0)
    })
  })
})
