import { test, expect } from '@playwright/test'
import { stubReducedMotion, bypassSplashIntro } from './utils'

test.describe('tier 2 — custom cursor', () => {
  test('activates on a fine-pointer desktop device', async ({ page }) => {
    await page.goto('/')
    await page.mouse.move(300, 300)
    await expect.poll(
      () => page.evaluate(() => document.body.classList.contains('custom-cursor-active')),
      { timeout: 10_000 }
    ).toBe(true)
  })

  test('shows a text label when hovering a portfolio card', async ({ page }) => {
    await page.goto('/portfolio')
    await expect.poll(
      () => page.evaluate(() => document.body.classList.contains('custom-cursor-active')),
      { timeout: 10_000 }
    ).toBe(true)

    const card = page.locator('[data-cursor-text="EXPLORE"]').first()
    await expect(card).toBeVisible()
    const box = await card.boundingBox()
    if (!box) throw new Error('no bounding box for portfolio card')
    // Enter from outside the card first, then move onto it in steps, so the
    // browser actually dispatches intermediate mousemove events over it.
    await page.mouse.move(box.x - 50, box.y - 50)
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 })
    await expect(page.getByText('EXPLORE', { exact: true })).toBeVisible({ timeout: 10_000 })
  })

  test.describe('reduced motion', () => {
    test.use({ reducedMotion: 'reduce' })
    test.beforeEach(async ({ page }) => stubReducedMotion(page))
    test('is disabled when reduced motion is requested', async ({ page }) => {
      await page.goto('/')
      await page.mouse.move(300, 300)
      // Give it a real chance to activate (it shouldn't) before asserting the negative.
      await page.waitForTimeout(1000)
      const active = await page.evaluate(() => document.body.classList.contains('custom-cursor-active'))
      expect(active).toBe(false)
    })
  })
})

test.describe('tier 2 — command palette', () => {
  // These use the navbar's ⌘K button to open the palette — Playwright/CDP's
  // synthetic Ctrl+K key event races against Chromium's own reserved
  // "focus omnibox" shortcut and is flaky as a *trigger* in automation (this
  // does not reflect real keyboard input, where our keydown handler's
  // preventDefault() reliably wins). The dedicated test below covers the
  // shortcut itself with retries; these cover the palette's actual behavior.
  test.beforeEach(async ({ page }) => bypassSplashIntro(page))

  test('opens via the navbar ⌘K button and navigates to a filtered result', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('Open search').click()
    const dialog = page.getByRole('dialog', { name: 'Command palette' })
    await expect(dialog).toBeVisible()

    await page.getByPlaceholder('Search Aiventra Labs...').fill('AI Chatbots')
    await page.getByRole('button', { name: /AI Chatbots/i }).click()
    await expect(page).toHaveURL(/\/services\/ai-chatbots$/, { timeout: 15_000 })
    await expect(dialog).toBeHidden()
  })

  test('closes on Escape', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('Open search').click()
    const dialog = page.getByRole('dialog', { name: 'Command palette' })
    await expect(dialog).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
  })

  test('keyboard arrows move selection and Enter navigates', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('Open search').click()
    await page.getByPlaceholder('Search Aiventra Labs...').fill('Services')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await expect(page).not.toHaveURL('http://localhost:3000/', { timeout: 15_000 })
  })

  test('shows an empty state for a nonsense query', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('Open search').click()
    const input = page.getByPlaceholder('Search Aiventra Labs...')
    await input.fill('zzzznotarealresultzzzz')
    await expect(page.getByText(/No results for/i)).toBeVisible()
  })

  test('Ctrl+K shortcut opens the palette', async ({ page }) => {
    await page.goto('/')
    await page.locator('body').click({ position: { x: 5, y: 5 } })
    const dialog = page.getByRole('dialog', { name: 'Command palette' })

    // Real hardware input doesn't race a browser chrome shortcut the way a
    // single synthetic CDP key event can; a couple of retries here compensate
    // for that automation-only race rather than masking an app defect.
    for (let attempt = 0; attempt < 3; attempt++) {
      await page.keyboard.press('Control+k')
      const opened = await dialog
        .waitFor({ state: 'visible', timeout: 3_000 })
        .then(() => true)
        .catch(() => false)
      if (opened) break
    }
    await expect(dialog).toBeVisible()
  })
})
